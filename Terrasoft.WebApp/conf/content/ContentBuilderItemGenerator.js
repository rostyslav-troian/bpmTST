Terrasoft.configuration.Structures["ContentBuilderItemGenerator"] = {innerHierarchyStack: ["ContentBuilderItemGenerator"]};
define("ContentBuilderItemGenerator", ["ViewGeneratorV2"], function() {

	/**
	 * @class Terrasoft.configuration.ContentBuilderItemGenerator
	 * ##### ########## ######### ContentBuilder.
	 */
	Ext.define("Terrasoft.configuration.ContentBuilderItemGenerator", {
		alternateClassName: "Terrasoft.ContentBuilderItemGenerator",
		extend: "Terrasoft.ViewGenerator",

		/**
		 * ########## ############ ########## ContentBlock.
		 * @protected
		 * @param {Object} config ############, ####### ######## ######## ### ######### ContentBlock.
		 * @return {Object} ############ ########## ContentBlock.
		 */
		generateContentBlock: function(config) {
			var contentBlockConfig = {
				className: "Terrasoft.controls.ContentBlock",
				items: {bindTo: config.items}
			};
			if (config.generateId !== false) {
				Ext.apply(contentBlockConfig, {
					id: config.name + "ContentBlock"
				});
			}
			var serviceProperties = ["generator"];
			var configWithoutServiceProperties = this.getConfigWithoutServiceProperties(config, serviceProperties);
			Ext.apply(contentBlockConfig, configWithoutServiceProperties);
			return contentBlockConfig;
		}
	});

	return Ext.create("Terrasoft.ContentBuilderItemGenerator");
});


