Terrasoft.configuration.Structures["ManyToManyRelationsDetail"] = {innerHierarchyStack: ["ManyToManyRelationsDetail"], structureParent: "BaseGridDetailV2"};
define('ManyToManyRelationsDetailStructure', ['ManyToManyRelationsDetailResources'], function(resources) {return {schemaUId:'cd7211de-18a9-4f6f-951c-e36055b849a2',schemaCaption: "ManyToManyRelationsDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'ManyToManyRelationsDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ManyToManyRelationsDetail", [], function() {
	return {
		entitySchemaName: "",

		attributes: {
			
			/**
			 * Master record value column name.
			 * @protected
			 * @type {String}
			 */
			"MasterDetailColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			
			/**
			 * Related record value column name.
			 * @protected
			 * @type {String}
			 */
			"RelatedDetailColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			
			/**
			 * Related lookup entity name.
			 * @protected
			 * @type {String}
			 */
			"LookupEntityName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			
			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#IsDetailCollapsed
			 * @overridden
			 */
			"IsDetailCollapsed": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},

		messages: {},

		methods: {
			
			//region Methods: Private
			
			/**
			 * @private
			 */
			_getInsertDataQueries: function(selectedRows) {
				const batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				selectedRows.getItems().forEach(function(item) {
					batchQuery.add(this.getInsertQuery(item));
				}, this);
				return batchQuery;
			},
			
			/**
			 * @private
			 **/
			_onLookupResult: function(lookupResult) {
				const query = this._getInsertDataQueries(lookupResult.selectedRows);
				this.showBodyMask();
				query.execute(this.onInsertComplete, this);
			},
			
			// endregion
			
			//region Methods: Protected
			
			/**
			 * @inheritDoc Terrasoft.BaseGridDetailV2#addRecord
			 * @overridden
			 **/
			addRecord: function() {
				this.getOpenLookupConfig(function(config) {
					this.openLookup(config, this._onLookupResult, this);
				}, this);
			},
			
			/**
			 * Prepares query for fetch existing records in detail.
			 * @returns {Terrasoft.EntitySchemaQuery} Query for fetch existing records in detail.
			 */
			getExistedItemsEsq: function() {
				const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.entitySchemaName
				});
				esq.addColumn(this.$RelatedDetailColumnName);
				esq.filters.add("masterRecordFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, this.$MasterDetailColumnName, this.$MasterRecordId));
				return esq;
			},
			
			/**
			 * Prepares filter for lookup data.
			 * @param existedCollection
			 * @returns {Terrasoft.BaseFilter} Esq filter for lookup data.
			 */
			getLookupFilters: function(existedCollection) {
				const existedLookupItems = existedCollection.getItems().map(function(item) {
					return item.get(this.$RelatedDetailColumnName).value;
				}, this);
				const existsFilter = Terrasoft.createColumnInFilterWithParameters("Id",
					existedLookupItems);
				existsFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
				existsFilter.Name = "existsFilter";
				return existsFilter;
			},
			
			/**
			 * Prepare open lookup config. Call callback with config.
			 * @param {Function} callback The callback function.
			 * @param {Object} [scope] The scope for the callback.
			 */
			getOpenLookupConfig: function(callback, scope) {
				const config = {
					entitySchemaName: this.$LookupEntityName,
					multiSelect: true
				};
				const esq = this.getExistedItemsEsq();
				esq.getEntityCollection(function(result) {
					if (result.success) {
						config.filters = this.getLookupFilters(result.collection);
					}
					Ext.callback(callback, scope, [config]);
				}, this);
			},
			
			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
			 * @overridden
			 */
			getCopyRecordMenuItem: Terrasoft.emptyFn,
			
			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
			 * @overridden
			 */
			getEditRecordMenuItem: Terrasoft.emptyFn,

			/**
			* Creates related data insert.
			* @param {Object} lookupItem Selected lookup item.
			* @protected
			**/
			getInsertQuery: function(lookupItem) {
				const insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: this.entitySchemaName
				});
				insert.setParameterValue(this.$MasterDetailColumnName, this.$MasterRecordId, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue(this.$RelatedDetailColumnName, lookupItem.value, this.Terrasoft.DataValueType.GUID);
				return insert;
			},
			
			/**
			 * Lookup data inserted callback.
			 * @protected
			 */
			onInsertComplete: function () {
				this.hideBodyMask();
				this.reloadGridData();
			}
			
			// endregion
			
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "AddRecordButton",
				"values": {
					"visible": {"bindTo": "getToolsVisible"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


