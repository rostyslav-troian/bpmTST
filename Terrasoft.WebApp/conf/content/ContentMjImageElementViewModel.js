Terrasoft.configuration.Structures["ContentMjImageElementViewModel"] = {innerHierarchyStack: ["ContentMjImageElementViewModel"]};
define("ContentMjImageElementViewModel", ["ContentMjImageElementViewModelResources", "ContentImageElementViewModel"],
	function(resources) {

	Ext.define("Terrasoft.ContentBuilder.ContentMjImageElementViewModel", {
		extend: "Terrasoft.ContentImageElementViewModel",
		alternateClassName: "Terrasoft.ContentMjImageElementViewModel",

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#className
		 * @override
		 */
		className: "Terrasoft.ContentMjImage",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Link", "ImageConfig",
			"Styles", "ImageTitle", "Alt", "Align", "Width", "Height"],

		/**
		 * Returns config object to init and open an edit page.
		 * @override
		 * @param {Boolean} withElementInfo Defines if config is extended with properties page info.
		 * @returns {Object} Full edit page config.
		 */
		getEditConfig: function(withElementInfo) {
			var config = this.callParent(arguments);
			if (withElementInfo) {
				config.ElementInfo = {
					Type: config.ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentMjmlImagePropertiesPage",
						isStylesVisible: true,
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
					}
				};
			}
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
		}

	});

});


