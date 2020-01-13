Terrasoft.configuration.Structures["AccountEnrichmentSchema"] = {innerHierarchyStack: ["AccountEnrichmentSchema"], structureParent: "BaseEnrichmentSchema"};
define('AccountEnrichmentSchemaStructure', ['AccountEnrichmentSchemaResources'], function(resources) {return {schemaUId:'d07ce2fd-e0f9-4b9a-9d36-ef8208a5c176',schemaCaption: "AccountEnrichmentSchema", parentSchemaName: "BaseEnrichmentSchema", schemaName:'AccountEnrichmentSchema',parentSchemaUId:'61c53d44-313f-4fa8-8af7-452489201eef',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountEnrichmentSchema", ["BaseEnrichmentSchema", "AccountEnrichmentViewModel"], function() {
	return {
		entitySchemaName: "AccountEnrichedData",
		attributes: {
			/**
			 * Communication detail name for sync.
			 * @type {String}
			 */
			"CommunicationDetailName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: "Communications"
			}
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#getEntitySchemaQuery
			 * @overridden
			 */
			getEntitySchemaQuery: function() {
				var rowClassName = this.getRowViewModelClassName();
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.entitySchemaName,
					rowViewModelClassName: rowClassName
				});
				esq.addColumn("Id");
				esq.addColumn("SearchDate");
				esq.addColumn("CategoryTag");
				esq.addColumn("Value");
				var primaryColumnValue = this.get("PrimaryColumnValue");
				var primaryColumnFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Account",
					primaryColumnValue);
				esq.filters.addItem(primaryColumnFilter);
				var notExistsFilter = this.Terrasoft.createNotExistsFilter("[AccountCommunication:Number:Value].Id");
				var subFilter = esq.createFilter(Terrasoft.ComparisonType.EQUAL,
					"[AccountCommunication:Account:Account].Account", "Account");
				notExistsFilter.subFilters.addItem(subFilter);
				esq.filters.addItem(notExistsFilter);
				return esq;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#executeEnrichmentDataService
			 * @overridden
			 */
			executeEnrichmentDataService: function(callback, scope) {
				this.set("LastEnrichmentRequestFailReason", "");
				this.callService({
					serviceName: "EnrichmentService",
					methodName: "SearchAccountInfo",
					data: {
						accountId: this.get("PrimaryColumnValue")
					},
					timeout: this.get("ServiceRequestTimeOut")
				}, function(response) {
					this.onExecuteEnrichmentDataService(response, callback, scope);
				}, scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#onExecuteEnrichmentDataService
			 * @overridden
			 */
			onExecuteEnrichmentDataService: function(response, callback, scope) {
				this.callParent(arguments);
				if (Terrasoft.isEmptyObject(response)) {
					return;
				}
				var searchAccountInfoResult = response.SearchAccountInfoResult;
				if (searchAccountInfoResult.isSuccessSearch) {
					var callbackFunc = function() {
						if (Ext.isFunction(callback)) {
							callback.apply(scope || this, arguments);
						}
						if (!this.getIsNotEmptyCollection()) {
							this.set("LastEnrichmentRequestFailReason", this.get("Resources.Strings.NoNewData"));
						}
					};
					this.selectExistingEnrichedData(callbackFunc, scope);
					return;
				} else if (!searchAccountInfoResult.isEnoughDataForEnrichment) {
					var notEnoughInfoTemplateMessage = this.get("Resources.Strings.NotEnoughInfo");
					var failReason = Ext.String.format(notEnoughInfoTemplateMessage, this.get("AcademyHelpUrl"));
					this.set("LastEnrichmentRequestFailReason", failReason);
				}
				this.Ext.callback(callback, scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#loadCommunicationTypes
			 * @overridden
			 */
			loadCommunicationTypes: function(callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "CommunicationType"
				});
				esq.addColumn("Name");
				var filter = this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"UseforAccounts", true);
				esq.filters.addItem(filter);
				esq.execute(function(response) {
					this.onLoadCommunicationTypes(response);
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Adds filter to delete query instance.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.DeleteQuery} deleteQuery Delete query instance.
			 */
			addDeleteQueryFilters: function(deleteQuery) {
				deleteQuery.filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Account", this.get("PrimaryColumnValue")));
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
			 * @protected
			 * @overridden
			 */
			getGoogleTagManagerData: function() {
				var data = this.callParent(arguments);
				var action = this.get("LastAction");
				if (!this.Ext.isEmpty(action)) {
					this.Ext.apply(data, {
						primaryColumnValue: this.get("PrimaryColumnValue"),
						moduleName: "DataEnrichment",
						schemaName: "AccountDataEnrichment",
						source: "AccountPageV2",
						action: action
					});
				}
				return data;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#getItemCaption
			 * @protected
			 * @overridden
			 */
			getItemCaption: function(item) {
				var categoryTag = Ext.isString(item) ? item : item.get("CategoryTag");
				var communicationTypesCollection = this.get("CommunicationTypesCollection");
				var communicationId = this.getCommunicationTypeId(categoryTag);
				var communicationType = communicationTypesCollection.get(communicationId);
				return communicationType.get("Name");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
			 * @protected
			 * @overridden
			 */
			saveDataToDatabase: function() {
				var insertBatchQuery = this.getInsertBatchQuery();
				if (insertBatchQuery.queries.length) {
					insertBatchQuery.execute(this.onSaveDataToDatabase, this);
				}
			},

			/**
			 * Returns batch query for insert enriched data.
			 * @protected
			 * @return {Terrasoft.BatchQuery} Batch query for insert enriched data.
			 */
			getInsertBatchQuery: function() {
				var syncedCollection = this.getSelectedItemsCollection();
				var insertBatchQuery = this.Ext.create("Terrasoft.BatchQuery");
				syncedCollection.each(function(item) {
					var insert = this.getInsertQuery(item);
					insertBatchQuery.add(insert);
				}, this);
				return insertBatchQuery;
			},

			/**
			 * Returns insert query for enriched item.
			 * @param {Terrasoft.BaseEnrichmentViewModel} item Base enrichment view model item.
			 * @return {Terrasoft.InsertQuery} Insert query for enriched item.
			 */
			getInsertQuery: function(item) {
				var communicationTypeId = this.getCommunicationTypeId(item.get("CategoryTag"));
				var insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "AccountCommunication"
				});
				insert.setParameterValue("Number", item.get("Value"), Terrasoft.DataValueType.TEXT);
				insert.setParameterValue("Account", this.get("PrimaryColumnValue"), Terrasoft.DataValueType.GUID);
				insert.setParameterValue("CommunicationType", communicationTypeId, Terrasoft.DataValueType.GUID);
				return insert;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#clearEnrichedData
			 * @protected
			 * @overridden
			 */
			clearEnrichedData: function() {
				var parentMethod = this.getParentMethod(this, arguments);
				var deleteQuery = this.getDeleteQuery();
				this.addDeleteQueryFilters(deleteQuery);
				deleteQuery.execute(function() {
					parentMethod();
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#getRowViewModelClassName
			 * @protected
			 * @overridden
			 */
			getRowViewModelClassName: function() {
				return "Terrasoft.configuration.AccountEnrichmentViewModel";
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


