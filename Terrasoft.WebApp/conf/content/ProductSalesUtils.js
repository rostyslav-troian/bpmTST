Terrasoft.configuration.Structures["ProductSalesUtils"] = {innerHierarchyStack: ["ProductSalesUtils"]};
define("ProductSalesUtils", ["ext-base", "terrasoft", "ProductSalesUtilsResources", "MaskHelper"],
	function(Ext, Terrasoft, resources, MaskHelper) {
		var openProductSelectionModuleInChain = function(config, sandbox) {
			var newCatalogueEnabled = Terrasoft.Features.getIsEnabled("NewProductSelectionCatalogue");
			var productSelectionModuleName = newCatalogueEnabled ? "ProductSelectionModuleV2" : "ProductSelectionModule";
			MaskHelper.ShowBodyMask();
			var params = sandbox.publish("GetHistoryState");
			sandbox.publish("PushHistoryState", {
				hash: params.hash.historyState,
				silent: true
			});
			sandbox.loadModule(productSelectionModuleName, {
				renderTo: "centerPanel",
				id: config.moduleId + "_ProductSelectionModule",
				keepAlive: true
			});
			return true;
		};

		return {
			openProductSelectionModuleInChain: openProductSelectionModuleInChain
		};
	});


