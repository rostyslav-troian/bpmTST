Terrasoft.configuration.Structures["PanelEmptyListMixin"] = {innerHierarchyStack: ["PanelEmptyListMixin"]};
define("PanelEmptyListMixin", ["AcademyUtilities", "ImageCustomGeneratorV2"],
	function(AcademyUtilities, ImageCustomGeneratorV2) {

		/**
		 * @class Terrasoft.configuration.mixins.PanelEmptyListMixin
		 * Mixin to display a message for an empty list.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.PanelEmptyListMixin", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.PanelEmptyListMixin",

			/**
			 * Configuration of the empty panel message.
			 * @property {String} emptyMessageConfig.title Title of message.
			 * @property {String} emptyMessageConfig.description Description of message.
			 * @property {Object} emptyMessageConfig.image Image for panel.
			 * @private
			 */
			emptyMessageConfig: null,

			/**
			 * A link to an article in the Academy.
			 * @private
			 * @type {String}
			 */
			helpUrl: null,

			/**
			 * Initializes academy help link.
			 * @param {String} contextHelpCode Code of Academy page.
			 * @param {Number} contextHelpId Id of Academy page.
			 * @param {Function} callback Function to be called after processed academy url.
			 * @param {Object} scope Scope of callback function.
			 */
			initHelpUrl: function(contextHelpCode, contextHelpId, callback, scope) {
				var helpConfig = {
					callback: this.getAcademyUrlCallback(callback, scope),
					scope: this,
					contextHelpId: contextHelpId,
					contextHelpCode: contextHelpCode
				};
				AcademyUtilities.getUrl(helpConfig);
			},

			/**
			 * Returns callback function for the academy url builder.
			 * @param {Function} callback Function to be called after processed academy url.
			 * @param {Object} scope Scope of callback function.
			 * @returns {Function} Callback function for the academy url builder.
			 * @private
			 */
			getAcademyUrlCallback: function(callback, scope) {
				callback = callback || this.Terrasoft.emptyFn;
				return function(url) {
					this.setHelpLink(url);
					callback.call(scope || this);
				};
			},

			/**
			 * Sets received a link to an article in the Academy.
			 * @param {String} url Link.
			 */
			setHelpLink: function(url) {
				this.helpUrl = url;
			},

			/**
			 * Creates a configuration element that will be shown if there are no elements in the list.
			 * @param {Object} config Preconfigured options.
			 * @return {Object} A complete set of element.
			 * @protected
			 */
			prepareEmptyGridMessageConfig: function(config) {
				var emptyGridMessageProperties = this.emptyMessageConfig;
				var emptyGridMessageViewConfig = this.getEmptyGridMessageViewConfig(emptyGridMessageProperties);
				this.Ext.apply(config, emptyGridMessageViewConfig);
			},

			/**
			 * Returns the configuration of view message of an empty list.
			 * @protected
			 * @param {Object} emptyGridMessageProperties Parameters a message of an empty list.
			 * @return {Object} Configuration of view message of an empty list.
			 */
			getEmptyGridMessageViewConfig: function(emptyGridMessageProperties) {
				var config = {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["empty-grid-message"]
					},
					items: []
				};
				var imgConfig = ImageCustomGeneratorV2.generateSimpleCustomImage({
					"onPhotoChange": this.Terrasoft.emptyFn,
					"classes": {
						"wrapClass": ["image-container"]
					},
					"items": [],
					"name": "emptyHistory"
				});
				imgConfig.imageSrc = this.Ext.isFunction(this.getEmptySearchResultImageUrl)
					? this.getEmptySearchResultImageUrl()
					: this.Terrasoft.ImageUrlBuilder.getUrl(emptyGridMessageProperties.image);
				config.items.push(imgConfig);
				config.items.push({
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["title"]
					},
					items: [
						{
							className: "Terrasoft.Label",
							caption: emptyGridMessageProperties.title,
							markerValue: "EmptyHistoryLabel"
						}
					]
				});
				var description = emptyGridMessageProperties.description;
				if (!this.Ext.isEmpty(description)) {
					config.items.push(this.prepareAcademyLink(emptyGridMessageProperties));
				}
				return config;
			},

			/**
			 * Returns the configuration of view message with academy link.
			 * @private
			 * @param {Object} emptyGridMessageProperties Parameters a message of an empty list.
			 * @param {Object} config Configuration of view message of an empty list.
			 * @return {Object} Configuration of view message with academy link.
			 */
			prepareAcademyLink: function(emptyGridMessageProperties) {
				var description = emptyGridMessageProperties.description;
				var useStaticFolderHelpUrl = emptyGridMessageProperties.useStaticFolderHelpUrl;
				var helpUrl = (useStaticFolderHelpUrl) ? this.get("StaticFolderHelpUrl") : this.helpUrl;
				var startTagPart = "";
				var endTagPart = "";
				var config;
				if (!this.Ext.isEmpty(helpUrl)) {
					startTagPart = "<a target=\"_blank\" href=\"" + helpUrl + "\">";
					endTagPart = "</a>";
				}
				description = this.Ext.String.format(description, startTagPart, endTagPart);
				config = {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["description t-label"]
					},
					items: [
						{
							selectors: {
								wrapEl: ".description"
							},
							className: "Terrasoft.HtmlControl",
							html: description
						}
					]
				};
				return config;
			}
		});
	});


