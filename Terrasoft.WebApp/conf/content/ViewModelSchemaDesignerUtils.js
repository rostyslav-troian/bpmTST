Terrasoft.configuration.Structures["ViewModelSchemaDesignerUtils"] = {innerHierarchyStack: ["ViewModelSchemaDesignerUtils"]};
define("ViewModelSchemaDesignerUtils", ["terrasoft"], function(Terrasoft) {

	Ext.define("Terrasoft.configuration.ViewModelSchemaDesignerUtils", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ViewModelSchemaDesignerUtils",
		singleton: true,

		/**
		 * Generates the name for the tab caption of the resource.
		 * @param {String} tabName Name of the tab.
		 * @return {String} Name of resource of tab caption.
		 */
		generateTabCaptionResourcesName: function(tabName) {
			return tabName + "TabCaption";
		},

		/**
		 * Generates the name for the detail caption of the resource.
		 * @param {String} detailKeyName generated unique detail name
		 * @return {String} Name of resource of detail caption.
		 */
		generateDetailCaptionResourcesName: function(detailKeyName) {
			return detailKeyName + "DetailCaptionOnPage";
		},

		/**
		 * Generates the name for the data model caption of the resource.
		 * @param {String} key generated unique name
		 * @return {String} Name of resource.
		 */
		generateDataModelCaptionResourcesName: function(key) {
			return key + "DataModelCaption";
		},

		/**
		 * Generates the name parameter of model from the name of resource of string.
		 * @param {String} resourceName Name of resource.
		 * @return {String} The name of parameter of model.
		 */
		getModelStringResourceName: function(resourceName) {
			return Ext.String.format("Resources.Strings.{0}", resourceName);
		},

		/**
		 * Generates the unique name.
		 * @param {String} prefix Prefix of the name.
		 * @return {String} Unique name.
		 */
		getUniqueItemName: function(prefix) {
			var guid = Terrasoft.generateGUID();
			return prefix + guid.substring(0, 8);
		}
	});
	return Terrasoft.ViewModelSchemaDesignerUtils;
});


