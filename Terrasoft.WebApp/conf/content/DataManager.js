Terrasoft.configuration.Structures["DataManager"] = {innerHierarchyStack: ["DataManager"]};
define("DataManager", ["ext-base", "terrasoft", "sandbox"],
		function() {

	var DataManager = Ext.define("Terrasoft.configuration.DataManager", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.DataManager",

		/**
		 * #### ########## ######### ######
		 * @private
		 * {String}
		 */
		storageKey: "DataManager",

		/**
		 * ######### ######### ######
		 * @private
		 * {Terrasoft.MemoryStore}
		 */
		storage: Terrasoft.DomainCache,

		/**
		 * ###### #########
		 * @private
		 * {Terrasoft.Collection}
		 */
		data: null,

		getEntitySchemaData: function(entitySchemaName) {
			var entitySchemaData = this.data.find(entitySchemaName);
			if (!entitySchemaData) {
				entitySchemaData = new Terrasoft.Collection();
				this.data.add(entitySchemaName, entitySchemaData);
			}
			return entitySchemaData;
		},

		getEntitySchemaColumnInfo: function(entitySchemaName, callback, scope) {
			this.getEntitySchemaInfo(entitySchemaName, function(schema) {
				callback.call(scope, schema.columns);
			}, this);
		},

		getEntitySchemaInfo: function(entitySchemaName, callback, scope) {
			var entitySchema = Terrasoft[entitySchemaName];
			if (entitySchema) {
				callback.call(scope, entitySchema);
			} else {
				Terrasoft.require([entitySchemaName], function(schema) {
					callback.call(scope, schema);
				}, this);
			}
		},

		/**
		 * ####### ######### #######
		 * @param {Object} config ################ ######
		 */
		constructor: function(config) {
			this.callParent(config);
			this.loadDataFromStorage();
			DM = this;
		},

		/**
		 * ######### ###### # ########## #########
		 * @private
		 */
		loadDataFromStorage: function() {
			this.data = this.storage.getItem(this.storageKey) || new Terrasoft.Collection();
		},

		/**
		 * ######### ###### # ######### #########
		 * @private
		 */
		saveDataToStorage: function() {
			this.data = this.storage.setItem(this.storageKey, this.data);
		},

		getEntity: function(entitySchemaName, primaryColumnValue, callback, scope) {
			var entitySchemaData = this.getEntitySchemaData(entitySchemaName);
			var entity = entitySchemaData.find(primaryColumnValue);
			if (entity) {
				callback.call(scope, entity);
			} else {
				this.getEntitySchemaColumnInfo(entitySchemaName, function(entitySchemaColumnInfo) {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: entitySchemaName
					});
					Terrasoft.each(entitySchemaColumnInfo, function(column, columnName) {
						select.addColumn(columnName);
					});
					var primaryDisplayColumnName = Terrasoft[entitySchemaName].primaryColumnName;
					select.filters.add("primaryColumnValue", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, primaryDisplayColumnName, primaryColumnValue));
					select.getEntityCollection(function(responce) {
						var responceArray = [];
						responce.collection.each(function(item) {
							entitySchemaData.add(item.values.get(primaryDisplayColumnName), item.values);
						});
						callback(schemaData);
					});
				}, this);
			}
		}

	});

	return Ext.create(DataManager);

});


