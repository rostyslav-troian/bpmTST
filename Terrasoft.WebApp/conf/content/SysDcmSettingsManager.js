Terrasoft.configuration.Structures["SysDcmSettingsManager"] = {innerHierarchyStack: ["SysDcmSettingsManager"]};
define("SysDcmSettingsManager", [
		"SysDcmSettingsManagerResources",
		"SysDcmSettingsManagerItem"
	],
	function() {
		/**
		 * @class Terrasoft.SysDcmSettingsManager
		 * Class of DCM settings.
		 */
		Ext.define("Terrasoft.manager.SysDcmSettingsManager", {
			extend: "Terrasoft.ObjectManager",
			alternateClassName: "Terrasoft.SysDcmSettingsManager",
			singleton: true,

			/**
			 * @inheritdoc Terrasoft.BaseManager#useNotification
			 * @overridden
			 */
			useNotification: true,

			/**
			 * @inheritdoc Terrasoft.BaseManager#outdatedEventName
			 * @overridden
			 */
			outdatedEventName: "SysDcmSettingsManagerOutdated",

			//region Properties: Private

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#itemClassName
			 * @overridden
			 */
			itemClassName: "Terrasoft.SysDcmSettingsManagerItem",

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#entitySchemaName
			 * @overridden
			 */
			entitySchemaName: "SysDcmSettings",

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#propertyColumnNames
			 * @overridden
			 */
			propertyColumnNames: {
				sysModuleEntity: "SysModuleEntity",
				stageColumnUId: "StageColumnUId",
				filters: "Filters",
				defaultSchemaUId: "DefaultSchemaUId"
			},

			// endregion

			//region Methods: Public

			/**
			 * Returns sysDcmSettings manager item by sysModuleEntity id.
			 * @param {String} sysModuleEntityId SysModuleEntity id.
			 * @return {Terrasoft.manager.SysDcmSettingsManagerItem} Requested manager item.
			 */
			findBySysModuleEntityId: function(sysModuleEntityId) {
				this.checkIsInitialized();
				var filteredItems = this.items.filterByFn(function(item) {
					return item.getSysModuleEntity() === sysModuleEntityId;
				});
				return filteredItems.first();
			},

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
		return Terrasoft.SysDcmSettingsManager;
	}
);


