Terrasoft.configuration.Structures["SysDcmSettingsManagerItem"] = {innerHierarchyStack: ["SysDcmSettingsManagerItem"]};
define("SysDcmSettingsManagerItem", ["SysDcmSettingsManagerItemResources", "SysModuleEntityManager"], function() {
	/**
	 * @class Terrasoft.SysDcmSettingsManagerItem
	 * Class of DCM settings item.
	 */
	Ext.define("Terrasoft.manager.SysDcmSettingsManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.SysDcmSettingsManagerItem",

		// region Properties: Private

		/**
		 * Section sysModuleEntity.
		 * @private
		 * @type {Object}
		 */
		sysModuleEntity: null,

		/**
		 * Section dcm stage column uId.
		 * @private
		 * @type {String}
		 */
		stageColumnUId: null,

		/**
		 * Section dcm filters columns.
		 * @private
		 * @type {String}
		 */
		filters: null,

		/**
		 * Section default dcm schema uId.
		 * @private
		 * @type {String}
		 */
		defaultSchemaUId: null,

		// endregion

		// region Methods: Public

		/**
		 * Returns SysModuleEntity identifier.
		 * @return {String}.
		 */
		getSysModuleEntity: function() {
			var sysModuleEntity = this.getPropertyValue("sysModuleEntity");
			return sysModuleEntity && sysModuleEntity.value;
		},

		/**
		 * Sets SysModuleEntity identifier.
		 * @param {String} value SysModuleEntity identifier.
		 */
		setSysModuleEntity: function(value) {
			this.setPropertyValue("sysModuleEntity", {
				value: value,
				displayValue: ""
			});
		},

		/**
		 * Returns section stage column identifier for dcm.
		 * @return {String}
		 */
		getStageColumnUId: function() {
			return this.getPropertyValue("stageColumnUId");
		},

		/**
		 * Sets section stage column identifier for dcm.
		 * @param {String} value StageColumn identifier.
		 */
		setStageColumnUId: function(value) {
			this.setPropertyValue("stageColumnUId", value);
		},

		/**
		 * Returns section filters for dcm.
		 * @return {Object[]}
		 */
		getFilters: function() {
			var filtersString = this.getPropertyValue("filters");
			var filters = Ext.JSON.decode(filtersString, true);
			if (!filters) {
				filters = [];
			}
			return filters;
		},

		/**
		 * Sets section filters for dcm.
		 * @param {Object[]} filters Filter object.
		 */
		setFilters: function(filters) {
			var filtersString = Ext.JSON.encode(filters);
			this.setPropertyValue("filters", filtersString);
		},

		/**
		 * Returns default section dcm schema identifier.
		 * @return {String}
		 */
		getDefaultSchemaUId: function() {
			return this.getPropertyValue("defaultSchemaUId");
		},

		/**
		 * Sets default section dcm schema identifier.
		 * @param {String} value
		 */
		setDefaultSchemaUId: function(value) {
			this.setPropertyValue("defaultSchemaUId", value);
		},

		/**
		 * Returns section entity schema identifier.
		 * @return {String}
		 */
		getEntitySchemaUId: function() {
			var sysModuleEntityId = this.getSysModuleEntity();
			var sysModuleEntityManagerItem = Terrasoft.SysModuleEntityManager.getItem(sysModuleEntityId);
			var entitySchemaUId = sysModuleEntityManagerItem.getEntitySchemaUId();
			return entitySchemaUId;
		},

		/**
		 * Returns section entity schema.
		 * @param {String} packageUId Package in which section is designing.
		 * @param {Function} callback Callback function.
		 * @param {Terrasoft.manager.EntitySchema} callback.entitySchema Requested entity schema.
		 * @param {Object} scope Callback function call context.
		 */
		getEntitySchema: function(packageUId, callback, scope) {
			var entitySchemaUId = this.getEntitySchemaUId();
			var getPackageSchemaConfig = {
				packageUId: packageUId,
				schemaUId: entitySchemaUId
			};
			Terrasoft.EntitySchemaManager.forceGetPackageSchema(getPackageSchemaConfig, callback, scope);
		}

		// endregion

	});
	return Terrasoft.SysDcmSettingsManagerItem;
});


