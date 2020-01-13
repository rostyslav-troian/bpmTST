Terrasoft.configuration.Structures["PackageMarketModule"] = {innerHierarchyStack: ["PackageMarketModule"]};
define("PackageMarketModule", ["ext-base", "terrasoft", "BaseViewModule"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.configuration.PackageMarketModule
	 * Class represents package market module. Uses to display market module.
	 * @private
	 */
	var packageMarketModule = Ext.define("Terrasoft.configuration.PackageMarketModule", {
		extend: "Terrasoft.BaseViewModule",
		alternateClassName: "Terrasoft.PackageMarketModule",

		marketModule: null,

		diff: [
			{
				"operation": "insert",
				"name": "ContentContainer",
				"values": {
					"id": "marketContentContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			}
		],

		/**
		 * Initializes market module.
		 * @protected
		 */
		initMarketModule: function() {
			this.marketModule = Ext.create("Terrasoft.PackageMarket", {
				sandbox: this.sandbox
			});
		},

		/**
		 * Loads market module.
		 * @protected
		 */
		loadMarketModule: function() {
			this.initMarketModule();
			if (!this.marketModule) {
				return;
			}
			this.marketModule.render({
				renderTo: "marketContentContainer",
				id: "package-market"
			});
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#render
		 * @overridden
		 */
		render: function() {
			this.callParent(arguments);
			this.loadMarketModule();
		}
	});
	return packageMarketModule;
});


