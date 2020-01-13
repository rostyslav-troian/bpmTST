Terrasoft.configuration.Structures["ConfigurationItemGenerator"] = {innerHierarchyStack: ["ConfigurationItemGenerator"]};
define("ConfigurationItemGenerator", ["ContainerList", "ViewGeneratorV2"], function() {
	/**
	 * @class Terrasoft.configuration.ConfigurationItemGenerator
	 * Configuration item view generator class.
	 */
	Ext.define("Terrasoft.configuration.ConfigurationItemGenerator", {
		alternateClassName: "Terrasoft.ConfigurationItemGenerator",
		extend: "Terrasoft.ViewGenerator",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * Generates container list unique identifier.
		 * {Object} config Item configuration.
		 * {String} schemaName Schema name.
		 */
		getContainerListId: function(config, schemaName) {
			return (schemaName + config.name + "ContainerList");
		},

		/**
		 * Generates ContainerList view config by schema item config.
		 * @param {Object} config Schema item configuration.
		 * @param {Object} schema Reference to schema for which generate view.
		 * @return {Object} ContainerList view config.
		 */
		getContainerListConfig: function(config, schema) {
			var containerListConfig = {
				className: "Terrasoft.ContainerList",
				idProperty: config.idProperty,
				collection: {
					bindTo: config.collection
				},
				observableRowNumber: config.observableRowNumber
			};
			if (config.onGetItemConfig) {
				containerListConfig.onGetItemConfig = {
					bindTo: config.onGetItemConfig
				};
			}
			if (config.generateId !== false) {
				var schemaName = schema.schemaName || "";
				var id = this.getContainerListId(config, schemaName);
				Ext.apply(containerListConfig, {
					id: id,
					selectors: {
						wrapEl: "#" + id
					}
				});
				delete config.id;
				delete config.selectors;
			}
			return containerListConfig;
		},

		/**
		 * Generates view config for ContainerList control.
		 * @protected
		 * @param {Object} config Schema item configuration to generate ContainerList control config.
		 * @param {Object} generatorConfig Configuration for view generator.
		 * @param {Object} generatorConfig.schema Reference to schema for which generate view.
		 * @param {String} generatorConfig.schemaName Schema name.
		 * @param {String} generatorConfig.schemaType Schema type.
		 * @param {String} generatorConfig.viewModelClass Link to generated view model class for schema.
		 * @param {String} generatorConfig.customGenerators Custom view generators.
		 * @return {Object} ContainerList view config.
		 */
		generateContainerList: function(config, generatorConfig) {
			this.customGenerators = generatorConfig.customGenerators;
			var containerListConfig = this.getContainerListConfig(config, generatorConfig.schema);
			if (!Ext.isEmpty(config.defaultItemConfig)) {
				containerListConfig.defaultItemConfig = this.generateItem(config.defaultItemConfig);
			}
			var serviceProperties = ["onGetItemConfig", "generator", "collection", "defaultItemConfig"];
			var configWithoutServiceProperties = this.getConfigWithoutServiceProperties(config, serviceProperties);
			Ext.apply(containerListConfig, configWithoutServiceProperties);
			return containerListConfig;
		},

		/**
		 * Generates view config for HierarchicalContainerList control.
		 * @protected
		 * @param {Object} config Schema item configuration to generate ContainerList control config.
		 * @param {Object} generatorConfig Configuration for view generator.
		 * @param {Object} generatorConfig.schema Reference to schema for which generate view.
		 * @param {String} generatorConfig.schemaName Schema name.
		 * @param {String} generatorConfig.schemaType Schema type.
		 * @param {String} generatorConfig.viewModelClass Link to generated view model class for schema.
		 * @param {String} generatorConfig.customGenerators Custom view generators.
		 * @return {Object} ContainerList view config.
		 */
		generateHierarchicalContainerList: function(config, generatorConfig) {
			var containerListConfig = this.generateContainerList(config, generatorConfig);
			containerListConfig.className = "Terrasoft.HierarchicalContainerList";
			Ext.merge(containerListConfig, {
				nestedItemsAttributeName: config.nestedItemsAttributeName,
				nestedItemsContainerId: config.nestedItemsContainerId
			});
			return containerListConfig;
		}
	});

	return Ext.create("Terrasoft.ConfigurationItemGenerator");
});


