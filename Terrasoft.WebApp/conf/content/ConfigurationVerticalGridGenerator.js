Terrasoft.configuration.Structures["ConfigurationVerticalGridGenerator"] = {innerHierarchyStack: ["ConfigurationVerticalGridGenerator"]};
define("ConfigurationVerticalGridGenerator", ["ext-base", "ViewGeneratorV2"],
	function(Ext) {

		/**
		 * @class Terrasoft.configuration.ConfigurationVerticalGridGenerator
		 * ##### ########## ############# #######.
		 */
		Ext.define("Terrasoft.configuration.ConfigurationVerticalGridGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.ConfigurationVerticalGridGenerator",

			/**
			 * @inheritdoc Terrasoft.ViewGeneratorV2#generateGrid
			 * @overridden
			 */
			generateGrid: function() {
				var baseConfig = this.callParent(arguments);
				baseConfig = this.getConfigWithoutServiceProperties(baseConfig, ["isVertical"]);
				return baseConfig;
			},

			/**
			 * @inheritdoc Terrasoft.ViewGeneratorV2#actualizeTiledGridConfig
			 * @overridden
			 */
			actualizeTiledGridConfig: function(gridConfig) {
				this.callParent(arguments);
				this.addLinks(gridConfig.tiledConfig, true);
			}

		});

		return Ext.create("Terrasoft.ConfigurationVerticalGridGenerator");
	});


