Terrasoft.configuration.Structures["BulkEmailClicksMap"] = {innerHierarchyStack: ["BulkEmailClicksMap"]};
define("BulkEmailClicksMap", ["BaseNestedModule"], function() {
	Ext.define("Terrasoft.configuration.BulkEmailClicksMapModule", {
		extend: "Terrasoft.BaseNestedModule",
		alternateClassName: "Terrasoft.BulkEmailClicksMapModule",
		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * View.
		 * @protected
		 * @type {Object}
		 */
		view: null,

		/**
		 * Module config.
		 * @protected
		 * @type {Object}
		 */
		moduleConfig: null,

		/**
		 * Number of stages.
		 * @protected
		 * @type {Number}
		 */
		stagesCount: 5,

		/**
		 * Max number of clicks among links.
		 * @protected
		 * @type {Number}
		 */
		maxClicksCount: 0,

		/**
		 * Extra parameters of the query of the link.
		 */
		queryExtraParameters: ["utm_source", "utm_campaign", "utm_term", "utm_content", "utm_medium"],

		/**
		 * Link tracking parameter name.
		 */
		bpmTrackId: 'bpmtrackid',

		/**
		 * Returns links which should be displayed on click map.
		 * @private
		 * @return {Array} Filtered links.
		 */
		_extractWebLinksFromTemplate: function() {
			var correctLinks = [];
			var allLinks = this.Ext.DomQuery.select("#BulkEmailClicksMapModuleHtml a");
			this.Terrasoft.each(allLinks, function(linkEl) {
				var link = linkEl.href;
				if (!link.startsWith("mailto:")) {
					correctLinks.push(linkEl);
				}
			}, this);
			return correctLinks;
		},

		/**
		 * Returns decoded link without extra parameters.
		 * @private
		 * @param {String} link Link which should be normalized.
		 * @return {String} Normalized link.
		 */
		_normalizeLink: function(link) {
			var url = this.getUrlWithoutExtraParameters(link);
			var decodeUrl = decodeURIComponent(url);
			return decodeUrl;
		},

		/**
		 * Returns normalized links from moduleConfig.
		 * @private
		 * @return {Object} Normalized links.
		 */
		_getNormalizedLinksData: function() {
			var normalizedLinks = {};
			var currentLinks = Object.values(this.moduleConfig.linksData);
			this.Terrasoft.each(currentLinks, function(linkData) {
				var normalLink = this._normalizeLink(linkData.Url);
				normalizedLinks[normalLink] = linkData.ClicksCount;
			}, this);
			return normalizedLinks;
		},

		/**
		 * Returns tracking id from link.
		 * @private
		 * @param {String} url Link to process.
		 * @return {Number} Link tracking id.
		 */
		_getBpmTrackIdFromLink: function (url) {
			var paramValue = Terrasoft.getQueryParameter(url, this.bpmTrackId);
			return parseInt(paramValue, 10) || 0;
		},

		/**
		 * Appends info about clicks to dynamic content template.
		 * @private
		 * @param {Object} linksFromHtml Links from current template.
		 */
		_processForDCTemplate: function(linksFromHtml) {
			this.Terrasoft.each(linksFromHtml, function(templateLink) {
				var linkCountInfo = this.getLinkCountInfoByTrackId(templateLink.href);
				this.showBubbleForLink(templateLink, linkCountInfo);
			}, this);
		},

		/**
		 * Appends info about clicks to static template.
		 * @private
		 * @param {Object} linksFromHtml Links from current template.
		 */
		_processForStaticTemplate: function(linksFromHtml) {
			var linksData = this._getNormalizedLinksData();
			this.Terrasoft.each(linksFromHtml, function(templateLink) {
				var link = this._normalizeLink(templateLink);
				var linkCountInfo = this.getLinkCountInfo(link, linksData);
				this.showBubbleForLink(templateLink, linkCountInfo);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseNestedModule#init
		 * @overridden
		 */
		init: function(callback, scope) {
			var sandbox = this.sandbox;
			this.moduleConfig = sandbox.publish("GetClicksMapConfig", null, [sandbox.id]);
			this.initMaxClicksCount();
			callback.call(scope);
		},

		/**
		 * Initializes the "maxClicksCount" property.
		 * @protected
		 */
		initMaxClicksCount: function() {
			var maxClicksCount = 0;
			this.Terrasoft.each(this.moduleConfig.linksData, function(linkData) {
				maxClicksCount = (linkData.ClicksCount > maxClicksCount) ? linkData.ClicksCount : maxClicksCount;
			});
			this.maxClicksCount = maxClicksCount;
		},

		/**
		 * Shows bubble with clicks count for specified link.
		 * @protected
		 * @param {Object} templateLink Link to show bubble for.
		 * @param {Object} linkCountInfo Links from current template.
		 */
		showBubbleForLink: function(templateLink, linkCountInfo){
			var linkImage = templateLink.querySelector("a > img");
			var newLinkClasses = ["bubble", "bubble-stage-" + linkCountInfo.stageNumber];
			var positionClass = this.Ext.isEmpty(linkImage)
				? "bubble-text-position"
				: "bubble-image-position";
			newLinkClasses.push(positionClass);
			var linkEl = this.Ext.get(templateLink);
			linkEl.set({
				"data-clicks-count": linkCountInfo.clicksCount,
				"target": "_blank"
			});
			linkEl.addCls(newLinkClasses);
		},

		/**
		 * Returns the link statistics info.
		 * @protected
		 * @param {String} linkUrl Url of the link.
		 * @param {Object} linkClicksData Clicks data of the link.
		 * @return {Object} Statistics info of the link.
		 */
		getLinkCountInfo: function(linkUrl, linkClicksData) {
			var clicksCount = linkClicksData[linkUrl.toLowerCase()] || 0;
			return {
				clicksCount: Terrasoft.getFormattedNumberValue(clicksCount, {type: Terrasoft.DataValueType.INTEGER}),
				stageNumber: this.getStageNumber(clicksCount) || 1
			};
		},

		/**
		 * Returns the link statistics info for specified TrackId.
		 * @protected
		 * @param {String} linkUrl Url of the link.
		 * @return {Object} Statistics info of the link.
		 */
		getLinkCountInfoByTrackId: function(linkUrl) {
			var linksData = this.moduleConfig.linksData;
			var templateLinkTrackId = this._getBpmTrackIdFromLink(linkUrl);
			var linkDataItem = linksData.find( function(x) { 
				return x.TrackId === templateLinkTrackId;
			});
			var clicksCount = linkDataItem ? linkDataItem.ClicksCount : 0;
			return {
				clicksCount: Terrasoft.getFormattedNumberValue(clicksCount, {type: Terrasoft.DataValueType.INTEGER}),
				stageNumber: this.getStageNumber(clicksCount) || 1
			};
		},

		/**
		 * Returns the number of the stage of the link.
		 * @protected
		 * @param {Number} clicksCount Number of the clicks of the link.
		 * @return {Number} Number of the stage of the link.
		 */
		getStageNumber: function(clicksCount) {
			var result = -1;
			if (clicksCount === 0) {
				result = 1;
			} else if (clicksCount === this.maxClicksCount) {
				result = this.stagesCount;
			} else {
				var stageLength = this.maxClicksCount / this.stagesCount;
				result = Math.ceil(clicksCount / stageLength);
				if (result === 0) {
					result = 1;
				}
			}
			return result;
		},

		/**
		 * Returns the query extra parameters.
		 * @private
		 * @return {Array}.
		 */
		getQueryExtraParameters: function() {
			return this.queryExtraParameters;
		},

		/**
		 * Returns url of the link without extra parameters.
		 * @private
		 * @param {HTMLAnchorElement} link Anchor link element.
		 * @return {String}.
		 */
		getUrlWithoutExtraParameters: function(link) {
			var extraParameters = this.getQueryExtraParameters();
			return this.Terrasoft.removeQueryParameters(link, extraParameters);
		},

		/**
		 * Appends info about clicks to the links.
		 * @protected
		 */
		processLinks: function() {
			var linksData = this.moduleConfig.linksData;
			if (Ext.isEmpty(linksData)) {
				return;
			}
			var templateLinks = this._extractWebLinksFromTemplate();
			if (linksData.some(function(x) {
					return x.TrackId !== undefined;
				})
			) {
				this._processForDCTemplate(templateLinks);
			} else {
				this._processForStaticTemplate(templateLinks);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseNestedModule#render
		 * @override
		 */
		render: function(renderTo) {
			var content = this.moduleConfig.htmlText || "";
			this.view = this.Ext.create("Terrasoft.HtmlControl", {
				renderTo: renderTo,
				html: "<div id=\"BulkEmailClicksMapModuleHtml\">" +
				"<div id=\"BulkEmailClicksMapModuleHtmlMask\"></div>" +
				"<div>" + content + "</div>" +
				"</div>",
				selectors: {
					wrapEl: "#BulkEmailClicksMapModuleHtml"
				}
			});
			this.processLinks();
		}
	});

	return Terrasoft.BulkEmailClicksMapModule;
});


