Terrasoft.configuration.Structures["EmailUtilitiesV2"] = {innerHierarchyStack: ["EmailUtilitiesV2"]};
define("EmailUtilitiesV2", ["ext-base", "terrasoft", "EmailUtilitiesV2Resources", "ConfigurationServiceProvider"],
	function(Ext, Terrasoft, resources) {

		//region Methods: Private

		/**
		 * Function-constructor for regular expression object.
		 * @private
		 * @param {Object} regex Regular expression.
		 * @param {String} replace The string, which will be replaced on result of regular expression.
		 */
		function _regexItem(regex, replace) {
			this.regex = regex;
			this.replace = replace;
		}

		/**
		 * Creates array of regular expressions.
		 * @private
		 * @param {Object} RegexItem Function-constructor for regular expression object.
		 * @return {Array} regexArray Array of regular expressions.
		 */
		function _getRegexArray(RegexItem) {
			var regexArray = [];
			//jscs:disable
			/*jshint quotmark: false */
			regexArray.push(new RegexItem(/<!--[\s\S]*?-->/g, ""), new RegexItem(/\t/gi, ""),
					new RegexItem(/>\s+</gi, "><"));
			/*jshint quotmark: true */
			//jscs:enable
			if (Ext.isWebKit) {
				regexArray.push(new RegexItem(/<div>(<div>)+/gi, "<div>"),
						new RegexItem(/<\/div>(<\/div>)+/gi, "<\/div>"));
			}
			//jscs:disable
			/*jshint quotmark:false */
			regexArray.push(new RegexItem(/<style[\S\s]+?<\/style>/gi, ""),
					new RegexItem(/<head>[\s\S]*?<\/head>/gi, ""),
					new RegexItem(/<div>\n/gi, ""), new RegexItem(/<div><br[\s\/]*>/gi, ""),
					new RegexItem(/<p>\n/gi, ""), new RegexItem(/<div>\n <\/div>/gi, "\n"),
					new RegexItem(/<br[\s\/]*>\n?|<\/p>|<\/div>/gi, "\n"), new RegexItem(/<[^>]+>|<\/\w+>/gi, ""),
					new RegexItem(/ /gi, " "), new RegexItem(/&/gi, "&"), new RegexItem(/•/gi, " * "),
					new RegexItem(/–/gi, "-"), new RegexItem(/"/gi, "\""), new RegexItem(/«/gi, "\""),
					new RegexItem(/»/gi, "\""), new RegexItem(/‹/gi, "<"), new RegexItem(/›/gi, ">"),
					new RegexItem(/™/gi, "(tm)"), new RegexItem(/</gi, "<"), new RegexItem(/>/gi, ">"),
					new RegexItem(/©/gi, "(c)"), new RegexItem(/®/gi, "(r)"), new RegexItem(/\n*$/, ""),
					new RegexItem(/&nbsp;/g, " "), new RegexItem(/(\n)( )+/, "\n"), new RegexItem(/(\n)+$/, ""),
					new RegexItem(/&quot;/gi, "\""), new RegexItem(/&rdquo;/gi, "\""), new RegexItem(/&amp;/gi, "&"),
					new RegexItem(/&rsquo;/gi, "\'"), new RegexItem(/&lt;/gi, "<"), new RegexItem(/&raquo;/gi, "»"),
					new RegexItem(/&gt;/gi, ">"), new RegexItem(/&#8220;/gi, "\""), new RegexItem(/&#43;/gi, "+"));
			/*jshint quotmark:true */
			//jscs:enable
			return regexArray;
		}

		function callEmailSendService(callback, dataSend) {
			var config = {
				data: dataSend,
				encodeData: false,
				serviceName: "EmailSendService",
				methodName: "Send"
			};
			Terrasoft.ConfigurationServiceProvider.callService(config, callback, this);
		}

		//endregion

		//region Methods: Public

		/**
		 * Remove html tags from the string.
		 * @public
		 * @param {String} value String with html tags.
		 * @return {String} String without html tags.
		 */
		function removeHtmlTags(value) {
			var RegexItem = _regexItem;
			var regexArray = _getRegexArray(RegexItem);
			Terrasoft.each(regexArray, function(item) {
				value = value.replace(item.regex, item.replace);
			}, this);
			return value;
		}


		function send(activityId, callback) {
			var dataSend = {
				ActivityId: activityId
			};
			var maskId = Terrasoft.Mask.show({
				caption: resources.localizableStrings.Sending
			});
			callEmailSendService.call(this, function(response) {
				Terrasoft.Mask.hide(maskId);
				var responseArray = response.SendResult;
				var gridData = this.getGridData ? this.getGridData() : null;
				var isEmptyResponseData = Ext.isEmpty(responseArray) || responseArray.length <= 0;
				if (isEmptyResponseData || responseArray[0].Code === "ErrorOnSend") {
					Terrasoft.utils.showConfirmation(resources.localizableStrings.SendEmailError);
				} else if (gridData && responseArray[0].Code === "Sended") {
					Terrasoft.utils.showConfirmation(resources.localizableStrings.Success);
				}
				if (isEmptyResponseData) {
					return;
				}
				var emailEntity = this;
				if (gridData) {
					this.loadGridDataRecord(activityId);
					emailEntity = gridData.get(activityId);
				}
				var result = responseArray[0];
				emailEntity.set("EmailSendStatus", {
					displayValue: result.DisplayValue,
					value: result.Value
				});
				if (!callback) {
					return;
				}
				if (result.HasFollowingProcessElement) {
					response.nextPrcElReady = result.HasFollowingProcessElement;
					response.success = true;
				}
				callback.call(this, response);
			}, dataSend);
		}

		//endregion

		Ext.define("Terrasoft.EmailUtilities", {
			extend: "Terrasoft.BaseObject",
			send: send,
			removeHtmlTags: removeHtmlTags
		});
		return Ext.create("Terrasoft.EmailUtilities");
	});


