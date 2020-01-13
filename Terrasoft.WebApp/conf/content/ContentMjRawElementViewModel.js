Terrasoft.configuration.Structures["ContentMjRawElementViewModel"] = {innerHierarchyStack: ["ContentMjRawElementViewModel"]};
define("ContentMjRawElementViewModel", ["ContentMjRawElementViewModelResources", "ContentElementBaseViewModel"],
		function(resources) {

	/**
	 * @class Terrasoft.ContentBuilder.ContentMjRawElementViewModel
	 * Raw HTML element view model class.
	 */
	Ext.define("Terrasoft.ContentBuilder.ContentMjRawElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentMjRawElementViewModel",

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
		serializableSlicePropertiesCollection: ["ItemType", "Content"],

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
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
				Content: this.$Content,
				ElementInfo: {
					Type: this.ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentMjRawPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
					}
				}
			};
			return config;
		}
	});
});


