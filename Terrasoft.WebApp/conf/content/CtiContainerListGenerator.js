Terrasoft.configuration.Structures["CtiContainerListGenerator"] = {innerHierarchyStack: ["CtiContainerListGenerator"]};
define("CtiContainerListGenerator", ["ext-base", "terrasoft", "DesignViewGeneratorV2", "CtiContainerList"],
	function(Ext, Terrasoft) {
		var viewGenerator = Ext.define("Terrasoft.configuration.CtiContainerListGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.CtiContainerListGenerator",

			/**
			 * ########## ############ ############# ### {Terrasoft.CtiContainerList}.
			 * @protected
			 * @virtual
			 * @param {Object} config ######## ######## #############.
			 * @return {Object} ########## ############### ############# CtiContainerList.
			 */
			generateGrid: function(config) {
				var id = this.getControlId(config, "Terrasoft.Grid");
				var itemConfig = {
					itemType: Terrasoft.ViewItemType.CONTAINER,
					name: "row-container",
					items: config.itemConfig
				};
				this.generateItem(itemConfig);
				var result = {
					className: "Terrasoft.CtiContainerList",
					id: id,
					selectors: { wrapEl: "#" + id }
				};
				Ext.apply(result, this.getConfigWithoutServiceProperties(config, ["itemConfig"]));
				this.applyControlConfig(result, config);
				return result;
			}
		});

		return Ext.create(viewGenerator);
	});


