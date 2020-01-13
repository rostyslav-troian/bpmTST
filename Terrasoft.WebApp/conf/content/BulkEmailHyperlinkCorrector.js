Terrasoft.configuration.Structures["BulkEmailHyperlinkCorrector"] = {innerHierarchyStack: ["BulkEmailHyperlinkCorrector"]};
define("BulkEmailHyperlinkCorrector",
	function() {
		Ext.define("Terrasoft.BulkEmailHyperlinkCorrector", {
			/**
			 * Matches href attribute of "a" tag.
			 * Source: <a href="http://google.com">title</a>. Match: href="http://google.com".
			 */
			_hrefUrlRegexp: /(href\s*=\s*)(["'])((http|ftp|https):\/\/.*?)(["'])([\w[,@?^=%&:\/~+#-])?/g,

			/**
			 * Matches http url-like string.
			 * Source: <a href="http://google.com">title</a>. Match: http://google.com.
			 */
			_urlRegexp: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@^=%~+#-])?/g,

			/**
			 * Matches content of href attribute
			 * Source: href="http://google.com". Match: http://google.com.
			 */
			_hrefContentRegexp: /(["'])(.*?)(["'])/,

			/**
			 * Matches "a" tags in html with groups: url, caption.
			 * Source: <html><body><a href="http://google.com">title</a></body></html>. Match: http://google.com, title.
			 */
			/*jshint maxlen:131 */
			//jscs:disable maximumLineLength
			_fullUrlRegexp:
				/<a[^>]*?href\s*=\s*(?:(["'])((http|ftp|https):\/\/.*?)(["']))[^>]*>([^<]*(?:(?!<\/a)<[^<]*)*)<\/a>/g,
			//jscs:enable maximumLineLength
			/*jshint maxlen:120 */

			/**
			 * Matches anchor part from url
			 * Source: href="http://google.com?name=[#Somemacro#]&p=1#anchorPart". Match: #anchorPart.
			 */
			_urlAnchorPartRegexp: /(?!.*(\[#|#\]))#.+/,

			/**
			 * Name of the tracking identifier - unique index of url from template config.
			 */
			_trackIdParameterName: "bpmtrackid",

			/**
			 * Name of the replica index parameter.
			 */
			_replicaParameterName: "bpmreplica",

			/**
			 * Applies iterator function to all items from viewModel.
			 * @param {Object} viewModel Content block view model.
			 * @param {Function} iterator Function to be applied.
			 * @private
			 */
			_iterateViewModelItems: function (viewModel, iterator) {
				var items = viewModel.$Items;
				if (Ext.isEmpty(items)) {
					throw Ext.create("Terrasoft.NullOrEmptyException");
				}
				items.each(function (item) {
					this._iterateViewModel(item, iterator);
				}, this);
			},

			/**
			 * Applies iterator function to content of view model item.
			 * @param {Object} viewModel Content builder view model, or its block.
			 * @param {Function} iterator Function to be applied.
			 * @private
			 */
			_iterateViewModelItem: function (viewModel, iterator) {
				iterator.call(this, viewModel);
			},

			/**
			 * Applies iterator function to all content blocks from viewModel.
			 * @param {Object} viewModel Content builder view model.
			 * @param {Function} iterator Function to be applied.
			 * @private
			 */
			_iterateViewModel: function (viewModel, iterator) {
				var itemType = viewModel.$ItemType;
				if (Ext.isEmpty(itemType)) {
					throw Ext.create("Terrasoft.NullOrEmptyException");
				}
				if (viewModel.hasAttribute("Items")) {
					this._iterateViewModelItems(viewModel, iterator);
				} else {
					this._iterateViewModelItem(viewModel, iterator);
				}
			},

			/**
			 * Returns maximum bpmtrackid parameter value from all hyperlinks of content block.
			 * @param {string} content Content block html.
			 * @returns {number} Maximum bpmtrackid parameter.
			 * @private
			 */
			_getMaxBpmTrackIdFromContent: function (content) {
				if (!content) {
					return 0;
				}
				var bpmTrackId = 0;
				var hrefContentRegex = this._hrefContentRegexp;
				var hrefs = content.match(this._hrefUrlRegexp);
				Terrasoft.each(hrefs, function (href) {
					var url = hrefContentRegex.exec(href)[2];
					var id = this._getBpmTrackIdFromLink(url);
					bpmTrackId = bpmTrackId < id ? id: bpmTrackId;
				}, this);
				return bpmTrackId;
			},

			_removeParamFromUrl: function(paramName, url) {
				var resultUrl = url.split("?")[0],
					currentParam,
					paramsArr = [],
					queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
				if (queryString !== "") {
					paramsArr = queryString.split("&");
					for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
						currentParam = paramsArr[i].split("=")[0];
						if (currentParam === paramName) {
							paramsArr.splice(i, 1);
						}
					}
					if (typeof paramsArr !== 'undefined'
						&& paramsArr.length !== 0
						&& paramsArr[0]) {
						resultUrl = resultUrl + "?";
					}
					resultUrl = resultUrl + paramsArr.join("&");
				}
				return resultUrl;
			},

			/**
			 * Returns value of bpmtrackid parameter from url. If not exists returns 0.
			 * @param {string} url source url
			 * @returns {number} parameter value.
			 * @private
			 */
			_getBpmTrackIdFromLink: function (url) {
				var idText = Terrasoft.getQueryParameter(url, this._trackIdParameterName);
				return idText ? parseInt(idText, 10) : 0;
			},

			/**
			 * Adds bpmtrackid parameter to all hyperlinks from given html.
			 * @param {string} content Html content of the content builder block.
			 * @param {number} bpmTrackId Current value of bpmtrackid.
			 * @param {Function} callback Callback function.
			 * Will be called if content was modified. Retrieves new bpmtrackid value and modified content.
			 * @private
			 */
			_setBpmTrackIdToContent: function (content, bpmTrackId, callback) {
				var urlRegex = this._hrefContentRegexp;
				var scope = this;
				var contentChanged = false;
				content = content.replace(this._hrefUrlRegexp, function (href) {
					return href.replace(urlRegex, function (firstGroup, openQuote, url, closeQuote) {
						if (!Terrasoft.isUrl(url)) {
							return openQuote + url + closeQuote;
						}
						bpmTrackId++;
						var correctedUrl = scope._insertOrReplaceLinkParameter(url, scope._trackIdParameterName, bpmTrackId);
						contentChanged = true;
						return openQuote + correctedUrl + closeQuote;
					});
				});
				if (contentChanged) {
					callback.call(this, content, bpmTrackId);
				}
			},

			/**
			 * Adds bpmtrackid parameter to hyperlink from Link-property of content block.
			 * @param {string} url Http url string.
			 * @param {number} bpmTrackId Current value of bpmtrackid.
			 * @param {Function} callback Callback function.
			 * Will be called if content was modified. Retrieves new bpmtrackid value and modified content.
			 * @private
			 */
			_setBpmTrackIdToLink: function(url, bpmTrackId, callback) {
				var lowerCaseUrl = url.toLowerCase();
				var matchUrl = Terrasoft.isUrl(lowerCaseUrl);
				if (matchUrl) {
					bpmTrackId++;
					var correctedUrl = this._insertOrReplaceLinkParameter(url, this._trackIdParameterName, bpmTrackId);
					callback.call(this, correctedUrl, bpmTrackId);
				}
			},

			/**
			 * Gets anchor part from given url.
			 * @param {string} url Source url.
			 * @returns {string} Anchor part from url, like #anchorPart for http://google.com?name=[#Somemacro#]&p=1#anchorPart.
			 * @private
			 */
			_getAnchorPartFromUrl: function(url){
				var result = url.match(this._urlAnchorPartRegexp);
				return result ? result[0] : "";
			},

			/**
			 * Adds parameter to url.
			 * @param {string} link Url to modify.
			 * @param {string} parameterName Name of the new parameter.
			 * @param {string} parameterValue Value of the new parameter.
			 * @returns {string} Modified url.
			 * @private
			 */
			_insertParameterIntoLink: function (link, parameterName, parameterValue) {
				var delimiter = link.toLowerCase().indexOf("?") > -1 ? "&" : "?";
				var anchorPart = this._getAnchorPartFromUrl(link);
				link = link.replace(anchorPart, "");
				link =  link + delimiter + parameterName + "=" + parameterValue + anchorPart;
				return link;
			},

			/**
			 * Adds parameter to url.
			 * @param {string} link Url to modify.
			 * @param {string} parameterName Name of the new parameter.
			 * @param {string} parameterValue Value of the new parameter.
			 * @returns {string} Modified url.
			 * @private
			 */
			_insertOrReplaceLinkParameter: function (link, parameterName, parameterValue) {
				link = link.replace(/&amp;/g, '&');
				if (link.indexOf(this._trackIdParameterName) > -1) {
					link = this._removeParamFromUrl(parameterName, link);
				}
				var delimiter = link.toLowerCase().indexOf("?") > -1 ? "&" : "?";
				var anchorPart = this._getAnchorPartFromUrl(link);
				link = link.replace(anchorPart, "");
				link =  link + delimiter + parameterName + "=" + parameterValue + anchorPart;
				return link;
			},

			/**
			 * Number all hyperlinks from last value of bpmtrackid parameter by
			 * adding new bpmtrackid parameter to hyperlink if its not exists.
			 * @param {Object} viewModel viewModel Content builder view model.
			 * @param {number} maxBpmTrackId Last added value of bpmtrackid url parameter.
			 * @private
			 */
			_applyBpmTrackIdToHyperlinks: function (viewModel, maxBpmTrackId) {
				this._iterateViewModel(viewModel, function (itemViewModel) {
					if (itemViewModel.hasAttribute("Content")) {
						this._setBpmTrackIdToContent(itemViewModel.$Content, maxBpmTrackId, function (content, bpmTrackId) {
							itemViewModel.$Content = content;
							maxBpmTrackId = bpmTrackId;
						});
					}
					if (itemViewModel.hasAttribute("Link")){
						this._setBpmTrackIdToLink(itemViewModel.$Link, maxBpmTrackId,  function (url, bpmTrackId) {
							itemViewModel.$Link = url;
							maxBpmTrackId = bpmTrackId;
						});
					}
				});
			},

			/**
			 * Returns maximum bpmtrackid parameter value from all hyperlinks.
			 * @param {Object} viewModel Content builder view model.
			 * @returns {number} Maximum bpmtrackid parameter.
			 * @private
			 */
			_getMaxBpmTrackId: function (viewModel) {
				var bpmTrackId = 0;
				this._iterateViewModel(viewModel, function (itemViewModel) {
					var idFromItem = 0;
					if (itemViewModel.hasAttribute("Content")) {
						idFromItem = this._getMaxBpmTrackIdFromContent(itemViewModel.$Content);
					}
					if (itemViewModel.hasAttribute("Link")){
						idFromItem = this._getBpmTrackIdFromLink(itemViewModel.$Link);
					}
					bpmTrackId = bpmTrackId < idFromItem ? idFromItem: bpmTrackId;
				});
				return bpmTrackId;
			},

			/**
			 * Returns innr text from html-block.
			 * @param {string} html text.
			 * @returns {string} inner text.
			 * @private
			 */
			_getHtmlInnerText: function (html) {
				var domParser = new DOMParser();
				var hyperlinkDocument = domParser.parseFromString(html, "text/html");
				return hyperlinkDocument.body.textContent.trim();
			},

			/**
			 * Adds unique parameter BpmTrackId to each links in template.
			 * @public
			 * @param {Object} viewmodel of template.
			 * @return {Object} changed config.
			 */
			applyBpmTrackIdToHyperlinks: function (viewmodel) {
				this._applyBpmTrackIdToHyperlinks(viewmodel, 0);
			},

			/**
			 * Adds unique parameter BpmTrackId to each links in template.
			 * @public
			 * @param {String} config of template.
			 * @return {Object} changed config.
			 */
			applyBpmReplicaToHyperlinks: function (html, replicaIndex) {
				var scope = this;
				return html.replace(this._hrefUrlRegexp, function (href) {
					return href.replace(scope._hrefContentRegexp, function (firstGroup, openQuote, url, closeQuote) {
						if (url.toLowerCase().indexOf(scope._replicaParameterName) > -1
							|| !url.match(scope._urlRegexp) ) {
							return openQuote + url + closeQuote;
						}
						var correctedUrl = scope._insertParameterIntoLink(url, scope._replicaParameterName, replicaIndex);
						return openQuote + correctedUrl + closeQuote;
					});
				});
			},

			/**
			 * Returns all unique urls from HTML text.
			 * @public
			 * @param {String} html text.
			 * @returns {Array} Array of urls objects {Url:"...", Caption:"..."}.
			 */
			extractHyperlinks: function (html) {
				var allLinks = [];
				var regexResult;
				do {
					regexResult = this._fullUrlRegexp.exec(html);
					if (regexResult && regexResult.length === 6) {
						var url = regexResult[2];
						var hyperlinkInnerHtml = regexResult[5];
						var caption = this._getHtmlInnerText(hyperlinkInnerHtml);
						if (url) {
							allLinks.push({
								"Url": url,
								"Caption": caption || url
							});
						}
					}
				} while (regexResult);
				var result = this.getDistinctHyperlinks(allLinks);
				return result;
			},

			/**
			 * Removes all duplicating hyperlinks from array by Url property.
			 * @public
			 * @param {Array} allLinks Source array of hyperlinks.
			 * @returns {Array} distinct array of hyperlinks;
			 */
			getDistinctHyperlinks: function (allLinks) {
				var result = [];
				var map = new Map();
				Terrasoft.each(allLinks, function(item) {
					if (!map.has(item.Url)){
						map.set(item.Url, true);
						result.push({
							Url: item.Url,
							Caption: item.Caption
						});
					}
				}, this);
				return result;
			}

		});
		return Ext.create("Terrasoft.BulkEmailHyperlinkCorrector");
	}
);


