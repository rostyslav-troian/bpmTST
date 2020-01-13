Terrasoft.configuration.Structures["ContainerListGenerator"] = {innerHierarchyStack: ["ContainerListGenerator"]};
define("ContainerListGenerator", ["ext-base", "terrasoft", "DesignViewGeneratorV2", "ContainerList"],
	function(Ext, Terrasoft) {
		Ext.define("Terrasoft.configuration.ContainerListGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.ContainerListGenerator",

			/**
			 * Class name of the generate items.
			 * @type {String}
			 */
			itemClassName: "Terrasoft.ContainerList",

			/**
			 * Generates view configuration for {@link Terrasoft.ContainerList}.
			 * @protected
			 * @virtual
			 * @param {Object} config Component description.
			 * @return {Object} The generated view configuration.
			 */
			generateGrid: function(config) {
				var id = this.getControlId(config, "Terrasoft.Grid");
				var itemConfig = {
					itemType: Terrasoft.ViewItemType.CONTAINER,
					name: "row-container",
					items: config.itemConfig
				};
				var item = this.generateItem(itemConfig);
				var result = {
					className: this.itemClassName,
					defaultItemConfig: item,
					itemFadeOutDuration: config.itemFadeOutDuration || 0
				};
				if (!config.skipId) {
					result.id = id;
					result.selectors = {wrapEl: "#" + id};
				}
				Ext.apply(result, this.getConfigWithoutServiceProperties(config, ["itemConfig", "generator", "skipId"]));
				this.applyControlConfig(result, config);
				return result;
			}
		});
		return Ext.create("Terrasoft.ContainerListGenerator");
	});


