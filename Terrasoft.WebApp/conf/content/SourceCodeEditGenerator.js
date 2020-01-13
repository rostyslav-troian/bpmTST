Terrasoft.configuration.Structures["SourceCodeEditGenerator"] = {innerHierarchyStack: ["SourceCodeEditGenerator"]};
define("SourceCodeEditGenerator", ["ViewGeneratorV2", "SourceCodeEdit"], function() {
	/**
	 * @class Terrasoft.configuration.SourceCodeEditGenerator
	 * Custom view generator for SourceCodeEditor control. Extends Terrasoft.ViewGenerator.
	 */
	Ext.define("Terrasoft.configuration.SourceCodeEditGenerator", {
		extend: "Terrasoft.ViewGenerator",
		alternateClassName: "Terrasoft.SourceCodeEditGenerator",

		/**
		 * Class name of SourceCodeEdit control.
		 * @type {String}
		 */
		sourceCodeEditClassName: "Terrasoft.SourceCodeEdit",

		/**
		 * Generates view config for SourceCodeEditor control.
		 * @param {Object} config Schema item configuration.
		 * @param {Object} generatorConfig Configuration for view generator.
		 * @param {Object} generatorConfig.schema Reference to schema for which generate view.
		 * @param {String} generatorConfig.schemaName Schema name.
		 * @param {String} generatorConfig.schemaType Schema type.
		 * @param {String} generatorConfig.viewModelClass Link to generated view model class for schema.
		 * @return {Object} view config.
		 */
		generate: function(config, generatorConfig) {
			var schema = generatorConfig.schema;
			this.generateConfig = generatorConfig;
			this.schemaName = generatorConfig.schemaName || (schema && schema.schemaName) || "";
			this.schemaType = generatorConfig.schemaType || (schema && schema.type);
			this.schemaProfile = schema.profile || [];
			this.viewModelClass = generatorConfig.viewModelClass;
			this.customGenerators = generatorConfig.customGenerators;
			var sourceCodeEditClassName = this.sourceCodeEditClassName;
			var id = this.getControlId(config, sourceCodeEditClassName);
			var sourceCodeEditConfig = {
				className: sourceCodeEditClassName
			};
			this.applyControlId(sourceCodeEditConfig, config, id);
			var defaultBindings = this.getAutoBindings(config);
			this.applyEditControlHint(sourceCodeEditConfig);
			Ext.apply(sourceCodeEditConfig, defaultBindings);
			Ext.apply(sourceCodeEditConfig, this.getConfigWithoutServiceProperties(config,
				["itemConfig", "generator"]));
			this.applyControlConfig(sourceCodeEditConfig, config);
			return sourceCodeEditConfig;
		}
	});

	return Ext.create("Terrasoft.SourceCodeEditGenerator");
});


