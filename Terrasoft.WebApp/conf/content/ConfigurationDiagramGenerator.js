Terrasoft.configuration.Structures["ConfigurationDiagramGenerator"] = {innerHierarchyStack: ["ConfigurationDiagramGenerator"]};
define("ConfigurationDiagramGenerator", ["ViewGeneratorV2"], function() {

	/**
	 * @class Terrasoft.configuration.ConfigurationDiagramGenerator
	 * ##### ########## #########.
	 */
	Ext.define("Terrasoft.configuration.ConfigurationDiagramGenerator", {
		alternateClassName: "Terrasoft.ConfigurationDiagramGenerator",
		extend: "Terrasoft.ViewGenerator",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * ########## ############ ########## diagram.
		 * @protected
		 * @param {Object} config ############, ####### ######## ######## ### ######### diagram.
		 * @return {Object} ############ ########## diagram.
		 */
		generateDiagram: function(config) {
			var diagramConfig = {
				className: config.className || "Terrasoft.Diagram",
				items: {bindTo: config.items}
			};
			if (config.generateId !== false) {
				Ext.apply(diagramConfig, {
					id: config.name,
					selectors: {wrapEl: "#" + config.name}
				});
			}
			var serviceProperties = ["generator"];
			var configWithoutServiceProperties = this.getConfigWithoutServiceProperties(config, serviceProperties);
			Ext.apply(diagramConfig, configWithoutServiceProperties);
			return diagramConfig;
		}
	});

	return Ext.create("Terrasoft.ConfigurationDiagramGenerator");
});


