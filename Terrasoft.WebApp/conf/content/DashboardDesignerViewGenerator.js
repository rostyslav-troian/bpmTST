Terrasoft.configuration.Structures["DashboardDesignerViewGenerator"] = {innerHierarchyStack: ["DashboardDesignerViewGenerator"]};
define("DashboardDesignerViewGenerator", ["ext-base", "terrasoft", "ViewGeneratorV2"],
	function() {
		var viewGenerator = Ext.define("Terrasoft.configuration.DashboardDesignerViewGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.DashboardDesignerViewGenerator",

			generateGridLayout: function(config) {
				var result = {
					className: "Terrasoft.GridLayoutEdit",
					items: config.items
				};
				Ext.apply(result, this.getConfigWithoutServiceProperties(config, []));
				delete result.generator;
				return result;
			}
		});
		return Ext.create(viewGenerator);
	});


