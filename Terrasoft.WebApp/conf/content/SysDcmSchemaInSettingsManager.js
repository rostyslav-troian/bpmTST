Terrasoft.configuration.Structures["SysDcmSchemaInSettingsManager"] = {innerHierarchyStack: ["SysDcmSchemaInSettingsManager"]};
define("SysDcmSchemaInSettingsManager", ["SysDcmSchemaInSettingsManagerResources", "SysDcmSchemaInSettingsManagerItem"],
	function() {
		/**
		 * @class Terrasoft.SysDcmSchemaInSettingsManager
		 * Class of DCM schema in settings.
		 */
		Ext.define("Terrasoft.manager.SysDcmSchemaInSettingsManager", {
			extend: "Terrasoft.manager.ObjectManager",
			alternateClassName: "Terrasoft.SysDcmSchemaInSettingsManager",
			singleton: true,

			//region Properties: Private

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#itemClassName
			 * @overridden
			 */
			itemClassName: "Terrasoft.SysDcmSchemaInSettingsManagerItem",

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#entitySchemaName
			 * @overridden
			 */
			entitySchemaName: "SysDcmSchemaInSettings",

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#propertyColumnNames
			 * @overridden
			 */
			propertyColumnNames: {
				sysDcmSettings: "SysDcmSettings",
				sysDcmSchemaUId: "SysDcmSchemaUId"
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc Terrasoft.manager.ObjectManager#getPackageSchemaDataName
			 * @overridden
			 */
			getPackageSchemaDataName: function(item) {
				var itemId = item.getPropertyValue("id");
				var dataName = Ext.String.format("{0}_{1}", this.entitySchemaName, itemId.replace(/-/g, ""));
				return dataName;
			},

			/**
			 * Returns sysDcmSchemaInSettings manager item by sysDcmSchema UId.
			 * @param {String} sysDcmSchemaUId SysDcmSchema UId.
			 * @return {Terrasoft.manager.SysDcmSchemaInSettingsManagerItem} Requested manager item.
			 */
			findItemBySysDcmSchemaUId: function(sysDcmSchemaUId) {
				this.checkIsInitialized();
				var filteredItems = this.items.filterByFn(function(item) {
					return item.getSysDcmSchemaUId() === sysDcmSchemaUId;
				});
				return filteredItems.first();
			},

			/**
			 * Returns sysDcmSchemaInSettings manager items by sysDcmSchema identifier.
			 * @param {String} sysDcmSettingId SysDcmSettings identifier.
			 * @return {Terrasoft.data.model.BaseViewModelCollection} Requested manager items.
			 */
			filterItemsBySysDcmSettingsId: function(sysDcmSettingsId) {
				this.checkIsInitialized();
				var filteredItems = this.items.filterByFn(function(item) {
					return item.getSysDcmSettings() === sysDcmSettingsId;
				});
				return filteredItems;
			},

			/**
			 * Creates item and adds it to manager.
			 * @param {String} schemaUId Dcm schema identifier.
			 * @param {String} settingsId Dcm settings manager item identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function call context.
			 */
			createSysDcmSchemaInSettingsItem: function(schemaUId, settingsId, callback, scope) {
				var config = {
					propertyValues: {
						sysDcmSettings: {
							value: settingsId
						},
						sysDcmSchemaUId: schemaUId
					}
				};
				this.createItem(config, function(item) {
					this.addItem(item);
					callback.call(scope);
				}, this);
			}

			// endregion

		});
		return Terrasoft.manager.SysDcmSchemaInSettingsManager;
	}
);


