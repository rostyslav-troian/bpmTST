Terrasoft.configuration.Structures["ContentSmartHtmlElementViewModel"] = {innerHierarchyStack: ["ContentSmartHtmlElementViewModel"]};
define("ContentSmartHtmlElementViewModel", ["ContentSmartHtmlElementViewModelResources", "ContentElementBaseViewModel"],
		function(resources) {

	/**
	 * @class Terrasoft.ContentBuilder.ContentSmartHtmlElementViewModel
	 * Smart HTML element view model class.
	 */
	Ext.define("Terrasoft.ContentBuilder.ContentSmartHtmlElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentSmartHtmlElementViewModel",

		/**
		 * Name of view class.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentMjRawElement",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Content", "HtmlSrc", "Macros"],

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
		},

		/**
		 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = this.callParent(arguments);
			changedConfig.Macros = config.Macros || [];
			return changedConfig;
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"content": "$Content",
				"placeholder": "$Resources.Strings.Placeholder"
			});
			return config;
		},

		/**
		 * Returns config object for element edit page.
		 * @protected
		 * @returns {Object} Element edit page config.
		 */
		getEditConfig: function() {
			var config = {
				ItemType: this.$ItemType,
				HtmlSrc: this.$HtmlSrc,
				Macros: this.$Macros,
				ElementInfo: {
					Type: this.ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentSmartHtmlPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
					}
				}
			};
			return config;
		}
	});
});


