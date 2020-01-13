Terrasoft.configuration.Structures["SysModuleVisaManager"] = {innerHierarchyStack: ["SysModuleVisaManager"]};
define("SysModuleVisaManager", ["SysModuleVisaManagerResources", "SysModuleVisaManagerItem"],
	function() {
		/**
		 * @class Terrasoft.SysModuleVisaManager
		 * Class of DCM settings.
		 */
		Ext.define("Terrasoft.manager.SysModuleVisaManager", {
			extend: "Terrasoft.ObjectManager",
			alternateClassName: "Terrasoft.SysModuleVisaManager",
			singleton: true,

			//region Properties: Private

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#itemClassName
			 * @overridden
			 */
			itemClassName: "Terrasoft.SysModuleVisaManagerItem",

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#entitySchemaName
			 * @overridden
			 */
			entitySchemaName: "SysModuleVisa",

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#propertyColumnNames
			 * @overridden
			 */
			propertyColumnNames: {
				visaSchemaUId: "VisaSchemaUId",
				masterColumnUId: "MasterColumnUId",
				useCustomNotificationProvider: "UseCustomNotificationProvider"
			},

			// endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#getPackageSchemaDataName
			 * @overridden
			 */
			getPackageSchemaDataName: function(item) {
				var itemId = item.getPropertyValue("id");
				return Ext.String.format("{0}_{1}", this.entitySchemaName, itemId.replace(/-/g, ""));
			}

			//endregion

		});
		return Terrasoft.SysModuleVisaManager;
	}
);


