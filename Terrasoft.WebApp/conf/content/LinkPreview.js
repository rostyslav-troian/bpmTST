Terrasoft.configuration.Structures["LinkPreview"] = {innerHierarchyStack: ["LinkPreview"]};
define("LinkPreview", ["css!LinkPreview"],
	function() {
		/**
		 * @class Terrasoft.controls.LinkPreview
		 * Link preview control.
		 */
		Ext.define("Terrasoft.controls.LinkPreview", {
			alternateClassName: "Terrasoft.LinkPreview",
			extend: "Terrasoft.Component",

			// region Properties: Protected

			/**
			 * @inheritdoc Terrasoft.Component#tpl
			 * @override
			 */
			tpl: [
				/* jshint ignore:start */
				/* jscs:disable */
				'<div id="{id}-wrap" class="link-preview-wrap">' +
					'<tpl if="image">' +
						'<div id="{id}-image" class="link-preview-image" style="background-image:url({image})"></div>' +
					'</tpl>' +
					'<div id="{id}-right-wrap" class="link-preview-right-wrap">' +
						'<tpl if="title">' +
							'<div id="{id}-title" class="link-preview-title">{title}</div>' +
						'</tpl>' +
						'<tpl if="description">' +
							'<div id="{id}-description" class="link-preview-description">{description}</div>' +
						'</tpl>' +
						'<div id="{id}-host" class="link-preview-host"><a href={url} target="_blank">{host}</a></div>' +
					'</div>' +
				'</div>'
				/* jscs:enable */
				/* jshint ignore:end */
			],

			/**
			 * Url.
			 * @protected
			 * @type {String}
			 */
			url: null,

			/**
			 * Link preview info.
			 * @protected
			 * @type {Object}
			 */
			linkPreviewInfo: null,

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.Component#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.selectors = {
					wrapEl: "",
					imageEl: "",
					titleEl: "",
					descriptionEl: "",
					host: ""
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseProgressBarIndicator#getTplData
			 * @override
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				this.selectors.wrapEl = "#" + this.id + "-wrap";
				this.selectors.imageEl = "#" + this.id + "-image";
				this.selectors.titleEl = "#" + this.id + "-title";
				this.selectors.descriptionEl = "#" + this.id + "-description";
				this.selectors.host = "#" + this.id + "-host";
				var linkPreviewInfo = this.linkPreviewInfo;
				if (!Ext.isEmpty(linkPreviewInfo)) {
					Ext.apply(tplData, linkPreviewInfo);
				}
				return tplData;
			},

			/**
			 * @inheritdoc Terrasoft.BaseProgressBarIndicator#getBindConfig
			 * @override
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var completenessIndicatorBindConfig = {
					linkPreviewInfo: {
						changeEvent: "changeLinkPreviewInfo",
						changeMethod: "setLinkPreviewInfo"
					},
					url: {
						changeEvent: "changeUrl",
						changeMethod: "setUrl"
					}
				};
				Ext.apply(completenessIndicatorBindConfig, bindConfig);
				return completenessIndicatorBindConfig;
			},

			/**
			 * Calls service for search webpage link preview.
			 * @protected
			 * @param {String} url Url.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @return {Object} The request object.
			 */
			loadWebPageLinkPreview: function(url, callback, scope) {
				if (!Terrasoft.Features.getIsEnabled("LinkPreview") || Ext.isEmpty(url) || !Terrasoft.isUrl(url)) {
					Ext.callback(callback, scope);
					return;
				}
				var config = {
					serviceName: "LinkPreviewService",
					methodName: "GetWebPageLinkPreview",
					data: {
						url: url
					}
				};
				return Terrasoft.ConfigurationServiceProvider.callService.call(this, config, callback, scope);
			},

			/**
			 * Callback with link preview service result.
			 * @protected
			 * @param {Object} response Service response.
			 */
			loadWebPageLinkPreviewCallback: function(response) {
				response = response && response.result;
				if (!Ext.isEmpty(response) && response.success && !Ext.isEmpty(response.linkPreviewInfo)) {
					this.linkPreviewInfo = {
						image: response.linkPreviewInfo.image,
						title: response.linkPreviewInfo.title,
						description: response.linkPreviewInfo.description,
						host: response.linkPreviewInfo.host,
						url: response.linkPreviewInfo.url
					};
				} else {
					this.linkPreviewInfo = null;
				}
				this.fireEvent("changeLinkPreviewInfo", this.linkPreviewInfo, this);
				if (this.allowRerender()) {
					this.reRender();
				}
			},

			// endregion

			// region Methods: Public

			/**
			 * Sets url value.
			 * @param {String} url Url.
			 */
			setUrl: function(url) {
				if (this.url === url) {
					return;
				}
				this.url = url;
				this.linkPreviewInfo = null;
				this.loadWebPageLinkPreview(url, this.loadWebPageLinkPreviewCallback, this);
			},

			/**
			 * Sets link preview info value.
			 * @param {Object} linkPreviewInfo Link preview info.
			 */
			setLinkPreviewInfo: function(linkPreviewInfo) {
				linkPreviewInfo = Terrasoft.isJsonObject(linkPreviewInfo) ? Ext.decode(linkPreviewInfo) : linkPreviewInfo;
				linkPreviewInfo = !Ext.isEmpty(linkPreviewInfo) ? linkPreviewInfo : null;
				if (Terrasoft.isEqual(this.linkPreviewInfo, linkPreviewInfo)) {
					return;
				}
				this.url = !Ext.isEmpty(linkPreviewInfo) ? linkPreviewInfo.url : null;
				this.fireEvent("changeUrl", this.url, this);
				this.linkPreviewInfo = linkPreviewInfo;
				if (this.allowRerender()) {
					this.reRender();
				}
			}

			// endregion

		});
		return Terrasoft.LinkPreview;
	});


