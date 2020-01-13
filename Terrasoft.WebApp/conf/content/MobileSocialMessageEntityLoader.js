Terrasoft.configuration.Structures["MobileSocialMessageEntityLoader"] = {innerHierarchyStack: ["MobileSocialMessageEntityLoader"]};
/* globals SocialChannel: false */
/* globals VwMobileSysSchema: false */
Terrasoft.Configuration.SysSchemasUIds = Terrasoft.Configuration.SysSchemasUIds || {};
Terrasoft.Configuration.SysSchemasUIds.SocialChannel = "dd74c060-eb4b-4f15-b381-db91ca5ac483";

/**
 * @class Terrasoft.Configuration.SocialMessageEntityLoader
 * Provides loading records for entities.
 */
Ext.define("Terrasoft.configuration.SocialMessageEntityLoader", {

	/**
	 * @private
	 */
	records: null,

	/**
	 * @private
	 */
	entitiesRecords: null,

	/**
	 * @private
	 */
	loadingEntities: null,

	/**
	 * @private
	 */
	loadedEntities: null,

	/**
	 * @private
	 */
	initialConfig: null,

	constructor: function() {
		this.callParent(arguments);
		this.entitiesRecords = {};
	},

	/**
	 * @private
	 */
	callFailure: function(error) {
		var config = this.initialConfig;
		Ext.callback(config.failure, config.scope, [error]);
	},

	/**
	 * @private
	 */
	loadEntitiesRecords: function() {
		var records = this.records;
		this.loadingEntities = 0;
		this.loadedEntities = 0;
		var entitiesRecordIds = {};
		for (var i = 0, ln = records.length; i < ln; i++) {
			var record = records[i];
			var entityRecordId = record.get("EntityId");
			var entitySchemaUId = record.get("EntitySchemaUId");
			if (!entitySchemaUId || entitySchemaUId === Terrasoft.GUID_EMPTY ||
				!Ext.isEmpty(this.entitiesRecords[entityRecordId])) {
				continue;
			}
			if (!entitiesRecordIds[entitySchemaUId]) {
				entitiesRecordIds[entitySchemaUId] = [];
				this.loadingEntities++;
			}
			var entityRecordIds = entitiesRecordIds[entitySchemaUId];
			if (!Ext.Array.contains(entityRecordIds, entityRecordId)) {
				entitiesRecordIds[entitySchemaUId].push(entityRecordId);
			}
		}
		if (this.loadingEntities === 0) {
			var config = this.initialConfig;
			Ext.callback(config.success, config.scope, [this.entitiesRecords]);
			return;
		}
		for (var j in entitiesRecordIds) {
			if (entitiesRecordIds.hasOwnProperty(j)) {
				this.loadEntityRecords(j, entitiesRecordIds[j]);
			}
		}
	},

	/**
	 * @private
	 */
	loadEntityRecords: function(entitySchemaUId, entityRecordIds) {
		var sysSchemaStore = VwMobileSysSchema.Store;
		var store;
		if (entitySchemaUId === Terrasoft.Configuration.SysSchemasUIds.SocialChannel) {
			store = SocialChannel.Store;
			store.each(function(record) {
				var recordId = record.getId();
				this.entitiesRecords[recordId] = record;
			}, this);
			this.processLoadedEntityRecords();
		} else {
			var sysSchema = sysSchemaStore.getById(entitySchemaUId);
			var modelName;
			if (sysSchema) {
				modelName = sysSchema.get("Name");
			}
			var model = Ext.data.ModelManager.getModel(modelName);
			if (!model) {
				this.processLoadedEntityRecords();
				return;
			}
			store = Ext.create("Terrasoft.store.BaseStore", {
				model: modelName,
				proxyType: this.initialConfig.proxyType
			});
			var primaryDisplayColumnName = model.prototype.self.PrimaryDisplayColumnName;
			var queryConfig = Ext.create("Terrasoft.QueryConfig", {
				modelName: modelName,
				isBatch: Terrasoft.ApplicationUtils.isOnlineMode(),
				columns: [primaryDisplayColumnName]
			});
			var filters = Ext.create("Terrasoft.Filter", {
				property: model.PrimaryColumnName,
				funcType: Terrasoft.FilterFunctions.In,
				funcArgs: entityRecordIds
			});
			store.setPageSize(Terrasoft.AllRecords);
			store.load({
				isCancelable: true,
				queryConfig: queryConfig,
				filters: filters,
				callback: function(records, operation, successful) {
					if (successful === true) {
						for (var i = 0, ln = records.length; i < ln; i++) {
							var record = records[i];
							this.entitiesRecords[record.getPrimaryColumnValue()] = record;
						}
						this.processLoadedEntityRecords();
					} else {
						this.callFailure(operation.getError());
					}
				},
				scope: this
			}, this);
		}
	},

	/**
	 * @private
	 */
	processLoadedEntityRecords: function() {
		this.loadedEntities++;
		if (this.loadingEntities === this.loadedEntities) {
			var config = this.initialConfig;
			Ext.callback(config.success, config.scope, [this.entitiesRecords]);
		}
	},

	load: function(config) {
		this.initialConfig = config;
		this.records = config.records;
		var sysSchemaUIds = [];
		var records = this.records;
		for (var i = 0, ln = records.length; i < ln; i++) {
			var record = records[i];
			var entitySchemaUId = record.get("EntitySchemaUId");
			if (entitySchemaUId !== Terrasoft.GUID_EMPTY && !Ext.Array.contains(sysSchemaUIds, entitySchemaUId) &&
					entitySchemaUId !== Terrasoft.Configuration.SysSchemasUIds.SocialChannel) {
				sysSchemaUIds.push(entitySchemaUId);
			}
		}
		this.loadEntitiesRecords();
	},

	/**
	 * @inheritdoc
	 */
	destroy: function() {
		this.callParent(arguments);
		this.records = null;
		this.entitiesRecords = null;
		this.loadingEntities = null;
		this.loadedEntities = null;
		this.initialConfig = null;
	}
});


