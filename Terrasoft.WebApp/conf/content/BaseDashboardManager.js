Terrasoft.configuration.Structures["BaseDashboardManager"] = {innerHierarchyStack: ["BaseDashboardManager"]};
define("BaseDashboardManager", ["DashboardManagerItem"], function() {

	/**
	 * @class Terrasoft.BaseDashboardManager
	 * @public
	 * Base dashboard manager class.
	 */
	Ext.define("Terrasoft.BaseDashboardManager", {
		extend: "Terrasoft.ObjectManager",
		alternateClassName: "Terrasoft.BaseDashboardManager",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.DashboardManagerItem",

		// endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#createItem
		 * @overridden
		 */
		createItem: function(config, callback, scope) {
			scope = scope || this;
			if (config && config.dataManagerItem) {
				var dashboardManagerItem = this.createManagerItem(config);
				callback.call(scope, dashboardManagerItem);
			} else {
				var createConfig = {
					entitySchemaName: this.entitySchemaName
				};
				if (config && config.sectionId) {
					Ext.apply(createConfig, {
						columnValues: {Section: {value: config.sectionId}}
					});
				}
				var createCallback = function(dataManagerItem) {
					var managerItem = this.createManagerItem({dataManagerItem: dataManagerItem});
					var propertyValues = config && config.propertyValues;
					Terrasoft.each(propertyValues, function(propertyValue, propertyName) {
						managerItem.setPropertyValue(propertyName, propertyValue);
					}, this);
					callback.call(scope, managerItem);
				};
				Terrasoft.DataManager.createItem(createConfig, createCallback, this);
			}
		}

		//endregion

	});
	return Terrasoft.BaseDashboardManager;
});


