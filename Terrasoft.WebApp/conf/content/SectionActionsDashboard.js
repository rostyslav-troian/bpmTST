Terrasoft.configuration.Structures["SectionActionsDashboard"] = {innerHierarchyStack: ["SectionActionsDashboardActionsDashboard", "SectionActionsDashboardMessagePublisher", "SectionActionsDashboardTaskMessagePublisher", "SectionActionsDashboardSocialMessagePublisher", "SectionActionsDashboardSSP", "SectionActionsDashboardEmailMessagePublisher", "SectionActionsDashboardCallMessagePublisher", "SectionActionsDashboard"], structureParent: "BaseActionsDashboard"};
define('SectionActionsDashboardActionsDashboardStructure', ['SectionActionsDashboardActionsDashboardResources'], function(resources) {return {schemaUId:'d2bb0841-0efc-4750-92b4-9dca1072e886',schemaCaption: "SectionActionsDashboard", parentSchemaName: "BaseActionsDashboard", schemaName:'SectionActionsDashboardActionsDashboard',parentSchemaUId:'cf375134-1ef1-4343-97f3-72c5197419a5',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardMessagePublisherStructure', ['SectionActionsDashboardMessagePublisherResources'], function(resources) {return {schemaUId:'2e417119-eaa1-498c-a10e-f59916d66a34',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardActionsDashboard", schemaName:'SectionActionsDashboardMessagePublisher',parentSchemaUId:'d2bb0841-0efc-4750-92b4-9dca1072e886',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardActionsDashboard",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardTaskMessagePublisherStructure', ['SectionActionsDashboardTaskMessagePublisherResources'], function(resources) {return {schemaUId:'c70c0775-36ed-446d-9977-d58db7c627f3',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardMessagePublisher", schemaName:'SectionActionsDashboardTaskMessagePublisher',parentSchemaUId:'2e417119-eaa1-498c-a10e-f59916d66a34',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardMessagePublisher",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardSocialMessagePublisherStructure', ['SectionActionsDashboardSocialMessagePublisherResources'], function(resources) {return {schemaUId:'d7792425-6013-425b-a611-da731c32fa22',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardTaskMessagePublisher", schemaName:'SectionActionsDashboardSocialMessagePublisher',parentSchemaUId:'c70c0775-36ed-446d-9977-d58db7c627f3',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardTaskMessagePublisher",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardSSPStructure', ['SectionActionsDashboardSSPResources'], function(resources) {return {schemaUId:'36503dfe-2f7a-4770-b8bd-94545832e435',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardSocialMessagePublisher", schemaName:'SectionActionsDashboardSSP',parentSchemaUId:'d7792425-6013-425b-a611-da731c32fa22',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardSocialMessagePublisher",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardEmailMessagePublisherStructure', ['SectionActionsDashboardEmailMessagePublisherResources'], function(resources) {return {schemaUId:'003e08f2-b98a-406d-88f0-64ad40e63851',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardSSP", schemaName:'SectionActionsDashboardEmailMessagePublisher',parentSchemaUId:'36503dfe-2f7a-4770-b8bd-94545832e435',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardSSP",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardCallMessagePublisherStructure', ['SectionActionsDashboardCallMessagePublisherResources'], function(resources) {return {schemaUId:'16e67433-7b26-4172-b98d-62da5b24658b',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardEmailMessagePublisher", schemaName:'SectionActionsDashboardCallMessagePublisher',parentSchemaUId:'003e08f2-b98a-406d-88f0-64ad40e63851',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardEmailMessagePublisher",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardStructure', ['SectionActionsDashboardResources'], function(resources) {return {schemaUId:'2f5a9e37-e476-47f0-a618-0e8b7b7d6be0',schemaCaption: "SectionActionsDashboard", parentSchemaName: "SectionActionsDashboardCallMessagePublisher", schemaName:'SectionActionsDashboard',parentSchemaUId:'16e67433-7b26-4172-b98d-62da5b24658b',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SectionActionsDashboardCallMessagePublisher",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SectionActionsDashboardActionsDashboardResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
/*
 * Parent: BaseActionsDashboard
 */
define("SectionActionsDashboardActionsDashboard", ["ConfigurationConstants", "Activity", "VwProcessDashboard", "BaseStageControl",
	"ActivityDashboardItemViewModel", "ProcessDashboardItemViewModel", "DcmSectionActionsDashboardMixin",
	"DcmExecutionDataRequest", "DcmConstants", "SysModuleVisaManager", "ApprovalDashboardItemViewModel",
	"ApprovalDashboardItemViewConfig", "ActionsDashboardUtils"
], function(ConfigurationConstants) {
	return {
		attributes: {
			/**
			 * EntitySchema of the ViewModel.
			 */
			"EntitySchema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Entity schema name.
			 */
			"EntitySchemaName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Name of actions entity schema.
			 */
			"ActionsSchemaName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Name of column of entitySchema column that references to entity schema of actions.
			 */
			"ActionsColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Name of the primary column of actions
			 */
			"ActionsPrimaryColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Primary display column of action entity schema.
			 */
			"ActionsPrimaryDisplayColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Config of action decoupling table.
			 */
			"DecouplingConfig": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Name of color column of actions.
			 */
			"ActionsColorColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Name of column for action filtering.
			 */
			"ActionsFilterColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Name of column for action ordering.
			 */
			"ActionsOrderColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Name of column for inner action ordering in menu.
			 */
			"ActionsInnerOrderColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Identifier of current action.
			 */
			"ActiveActionId": {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Is master entity initialized flag.
			 */
			"IsMasterEntityInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * DcmSchema.
			 */
			"DcmSchema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Flag that indicates whether current dcm schema is actual or not.
			 */
			"IsActualDcmSchema": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Section actions dashboard initialized flag.
			 */
			"IsSectionActionsDashboardInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Name of approval schema.
			 */
			"ApprovalSchemaName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Name of approval reference column.
			 */
			"ApprovalReferenceColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Dashboard items query batch size.
			 */
			"QueryItemsBatchSize": {
				dataValueType: Terrasoft.DataValueType.Number,
				value: 100
			}
		},
		messages: {
			/**
			 * @message ReloadCard
			 * Notify about the card is reload.
			 */
			"ReloadCard": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message DashboardRealoaded
			 * Notify about the dashboard is reload.
			 */
			"DashboardRealoaded": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message ProcessExecDataChanged
			 * Specifies that you have to transfer the data of a process.
			 */
			"ProcessExecDataChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message ProcessExecDataChanged
			 * Specifies that you have to transfer the data of a process.
			 */
			"SaveRecord": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message PushHistoryState
			 * Notify about changes in the chain.
			 */
			"PushHistoryState": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetColumnsValues
			 * Returns requested column values.
			 */
			"GetColumnsValues": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message UpdateCardProperty
			 * Changes the value of the card model.
			 */
			"UpdateCardProperty": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetEntityColumnChanges
			 * Processes changes of entity column.
			 */
			"GetEntityColumnChanges": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message EntityInitialized
			 * Master's entity initialized event.
			 */
			"EntityInitialized": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message RerenderPublisherModule
			 * Informs publisher its need to be rendered
			 */
			"RerenderPublisherModule": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetPropertiesByName
			 * Returns values of target columns.
			 */
			"GetPropertiesByName": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message ReInitializeActionsDashboard
			 * Process reinitialize actions dashboard.
			 */
			"ReInitializeActionsDashboard": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message UpdateDcmActionsDashboardConfig
			 * Update DcmActionsDashboard config.
			 */
			"UpdateDcmActionsDashboardConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message IsEntityChanged
			 * Returns is entity changed.
			 */
			"IsEntityChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message IsDcmFilterColumnChanged
			 * Returns true if DCM filtered columns changed.
			 */
			"IsDcmFilterColumnChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetPublisherPageState
			 * Return publisher page state.
			 */
			"GetPublisherPageState": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {
			"DcmSectionActionsDashboardMixin": "Terrasoft.DcmSectionActionsDashboardMixin"
		},
		methods: {

			/**
			 * Returns additional action dashboard tabs visibility.
			 * @protected
			 * @return {Boolean} Additional action dashboard tabs visibility.
			 */
			getExtraActionDashboadTabVisible: function() {
				return true;
			},

			/**
			 * Returns extended config for tabs.
			 * @return {Object} config Extended tab config
			 */
			getExtendedConfig: function() {
				const config = {};
				config.DashboardTab = {
					"Align": Terrasoft.Align.LEFT
				};
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#initTabsConfig
			 * @override
			 */
			initTabsConfig: function() {
				this.callParent(arguments);
				const tabsConfig = this.get("TabsConfig");
				const extendedConfig = this.getExtendedConfig();
				Ext.merge(tabsConfig, extendedConfig);
				this.set("TabsConfig", tabsConfig);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#getProfileKey
			 * @override
			 */
			getProfileKey: function() {
				const entitySchemaName = this.get("EntitySchemaName");
				return Terrasoft.ActionsDashboardUtils.getProfileKeyByEntity(entitySchemaName);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#getPropertiesTranslator
			 * @override
			 */
			getPropertiesTranslator: function() {
				const properties = this.callParent(arguments);
				properties.EntitySchemaName = "entitySchemaName";
				return properties;
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#initDashboardConfig
			 * @override
			 */
			initDashboardConfig: function() {
				this.callParent(arguments);
				const dashboardConfig = this.get("DashboardConfig");
				const processItemsConfig = {
					"VwProcessDashboard": {
						masterColumnName: "Id",
						referenceColumnName: "EntityId",
						viewModelClassName: "Terrasoft.ProcessDashboardItemViewModel",
						viewConfigClassName: "Terrasoft.BaseDashboardItemViewConfig"
					}
				};
				const activityItemsConfig = {
					"Activity": {
						viewModelClassName: "Terrasoft.ActivityDashboardItemViewModel",
						viewConfigClassName: "Terrasoft.BaseDashboardItemViewConfig"
					}
				};
				const approvalItemsConfig = this._getApprovalItemsConfig();
				const extendedConfig = this.values.dashboardConfig || {};
				Ext.merge(dashboardConfig, processItemsConfig);
				Ext.merge(dashboardConfig, activityItemsConfig);
				Ext.merge(dashboardConfig, extendedConfig);
				Ext.merge(dashboardConfig, approvalItemsConfig);
				this.set("DashboardConfig", dashboardConfig);
			},

			/**
			 * Init approval dashboard.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			initApprovalActionsDashboard: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						const managers = [
							Terrasoft.SectionManager,
							Terrasoft.SysModuleVisaManager,
							Terrasoft.EntitySchemaManager
						];
						Terrasoft.eachAsyncAll(managers, function(manager, nextAsync) {
							manager.initialize(nextAsync, this);
						}, next, this);
					},
					function(next) {
						const visaManagerItem = this._findVisaManagerItem();
						if (visaManagerItem) {
							const visaEntityItem = this._findVisaEntityItem(visaManagerItem);
							const approvalSchemaName = visaEntityItem.getName();
							this.set("ApprovalSchemaName", approvalSchemaName);
							this._findVisaReferenceColumnName(visaManagerItem, next, this);
						} else {
							callback.call(scope);
						}
					},
					function(next, approvalReferenceColumnName) {
						this.set("ApprovalReferenceColumnName", approvalReferenceColumnName);
						callback.call(scope);
					},
					this
				);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#init
			 * @override
			 */
			init: function(callback, scope) {
				const parentMethod = this.getParentMethod();
				Terrasoft.chain(
					function(next) {
						this.initDcmConfig();
						this.initEntitySchema();
						this.initDcmActionsDashboard(next, this);
					},
					function(next) {
						this.initDefaultValues(next, this);
					},
					function(next) {
						this.initApprovalActionsDashboard(next, this);
					},
					function(next) {
						parentMethod.call(this, next, this);
					},
					function(next) {
						Ext.callback(callback, scope);
						if (this.get("DcmSchema")) {
							this.initDcmActions();
							this.set("HeaderVisible", true);
						} else {
							next();
						}
					},
					function(next) {
						const hasAnyDcm = this.getMasterEntityParameterValue("HasAnyDcm");
						if (hasAnyDcm) {
							this.set("HeaderVisible", false);
						} else {
							this.initActionsSchema(next, this);
						}
					},
					function(next) {
						this.initActionsControl(next, this);
					},
					function() {
						this.set("IsSectionActionsDashboardInitialized", true);
					}, this
				);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#initProperties
			 * @override
			 */
			initProperties: function() {
				this.callParent(arguments);
				this.initIsMasterEntityInitialized();
			},

			/**
			 * Returns section id by EntitySchema Name parameter.
			 * @protected
			 * @return {GUID} section id.
			 */
			getSectionId: function() {
				const entitySchema = this.get("EntitySchema");
				if (!entitySchema) {
					return;
				}
				const sectionInfo = Terrasoft.configuration.ModuleStructure[entitySchema.name];
				return sectionInfo ? sectionInfo.moduleId : null;
			},

			/**
			 * Reloads module.
			 */
			reload: function() {
				this.setActiveActionId();
				this.handleActiveActionChange();
				const hasAnyDcm = this.getMasterEntityParameterValue("HasAnyDcm");
				if (!hasAnyDcm) {
					this.initActionsControl();
				}
				this.initDashboard();
				this.sandbox.publish("DashboardRealoaded", null);
			},

			/**
			 * Returns name of the primary column of EntitySchema.
			 * @return {String} Name of the column.
			 */
			getEntitySchemaPrimaryColumnName: function() {
				const entitySchema = this.get("EntitySchema");
				return entitySchema.primaryColumnName;
			},

			/**
			 * Returns value of primary column of EntitySchema.
			 * @return {Object} Value of columns,
			 */
			getEntitySchemaPrimaryColumnValue: function() {
				const primaryColumnName = this.getEntitySchemaPrimaryColumnName();
				return this.getMasterEntityParameterValue(primaryColumnName);
			},

			/**
			 * Gets actual action value of ActionColumn from DB and reloads ActionsControl.
			 * @protected
			 */
			reloadActionControl: function() {
				const esq = this.getActionsColumnValueQuery();
				const primaryColumnValue = this.getEntitySchemaPrimaryColumnValue();
				esq.getEntity(primaryColumnValue, this.getActionsColumnValueCallback, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#onReloadDashboardItems
			 * @override
			 */
			onReloadDashboardItems: function() {
				this.callParent(arguments);
				this.reloadActionControl();
			},

			/**
			 * Master's entity initialized event.
			 * @protected
			 */
			onEntityInitialized: function() {
				this.set("IsMasterEntityInitialized", true);
				this.reload();
			},

			/**
			 * Master's entity column change event.
			 * @protected
			 * @param {Object} changedColumn Master's changed column.
			 * @param {String} changedColumn.columnValue Column value.
			 * @param {String} changedColumn.columnName Column name.
			 */
			onCardColumnChanged: function(changedColumn) {
				if (this.get("ActionsColumnName") === changedColumn.columnName) {
					this.setActiveActionId();
					this.handleActiveActionChange();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				const sandbox = this.sandbox;
				const tags = [sandbox.id];
				sandbox.subscribe("EntityInitialized", this.onEntityInitialized, this, tags);
				sandbox.subscribe("GetEntityColumnChanges", this.onCardColumnChanged, this, tags);
				sandbox.subscribe("ReInitializeActionsDashboard", this.reInitializeActionsDashboard, this, tags);
				this.sandbox.subscribe("CanBeDestroyed", this.onCanBeDestroyedQuery, this);
			},

			/**
			 * Adds columns to actions entitySchemaQuery.
			 * @protected
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Actions entitySchemaQuery.
			 */
			addActionsColumns: function(esq) {
				const primaryColumnName = this.get("ActionsPrimaryColumnName");
				const primaryDisplayColumnName = this.get("ActionsPrimaryDisplayColumnName");
				const colorColumn = this.get("ActionsColorColumnName");
				esq.addColumn(primaryColumnName, "PrimaryColumn");
				esq.addColumn(primaryDisplayColumnName, "PrimaryDisplayColumn");
				if (colorColumn) {
					esq.addColumn(colorColumn, "Color");
				}
			},

			/**
			 * Adds sorting to actions entitySchemaQuery.
			 * @protected
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Actions entitySchemaQuery.
			 */
			addActionsSorting: function(esq) {
				let orderColumn = this.get("ActionsOrderColumnName");
				if (orderColumn) {
					orderColumn = esq.addColumn(orderColumn, "SortColumn");
					orderColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				} else {
					const columns = esq.columns;
					const primaryDisplayColumn = columns.get("PrimaryDisplayColumn");
					primaryDisplayColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				}
				const innerOrderColumnName = this.get("ActionsInnerOrderColumnName");
				if (innerOrderColumnName) {
					const innerOrderColumn = esq.addColumn(innerOrderColumnName, "InnerSortColumn");
					innerOrderColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				}
			},

			/**
			 * Adds filters to actions entitySchemaQuery.
			 * @protected
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Actions entitySchemaQuery.
			 */
			addActionsFilters: function(esq) {
				const filterColumn = this.get("ActionsFilterColumnName");
				if (filterColumn) {
					esq.filters.add("displayFilter", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, filterColumn, true));
				}
			},

			/**
			 * Creates entitySchemaQuery that selects actions.
			 * @protected
			 * @return {Terrasoft.data.queries.EntitySchemaQuery} Query to EntitySchema of actions.
			 */
			getActionsQuery: function() {
				const schemaName = this.get("ActionsSchemaName");
				if (!schemaName) {
					return null;
				}
				const esq = this.createEntitySchemaQuery(schemaName);
				this.addActionsColumns(esq);
				this.addActionsSorting(esq);
				this.addActionsFilters(esq);
				return esq;
			},

			/**
			 * Returns entitySchemaQuery that selects decoupling items for actions.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery|*} Decoupling items select query.
			 */
			getDecouplingQuery: function() {
				let esq = null;
				const config = this.get("DecouplingConfig");
				if (config && config.name && config.masterColumnName && config.referenceColumnName) {
					esq = this.createEntitySchemaQuery(config.name);
					esq.addColumn(config.masterColumnName, "Master");
					esq.addColumn(config.referenceColumnName, "Reference");
				}
				return esq;
			},

			/**
			 * Initializes actionControl.
			 * @protected
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Execution context.
			 */
			initActionsControl: function(callback, scope) {
				const actionEsq = this.getActionsQuery();
				if (!actionEsq) {
					Ext.callback(callback, scope || this);
					return;
				}
				const batchQuery = Ext.create("Terrasoft.BatchQuery");
				batchQuery.add(actionEsq);
				const decouplingEsq = this.getDecouplingQuery();
				if (decouplingEsq) {
					batchQuery.add(decouplingEsq);
				}
				batchQuery.execute(function(response) {
					this.initActions(response);
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Sets availableStages property for action object.
			 * @protected
			 * @param {Object} action Action object.
			 */
			setAvailableActions: function(action) {
				const decouplingItems = this.get("DecouplingItems");
				if (decouplingItems) {
					const availableStages = Ext.Array.filter(decouplingItems, function(item) {
						const master = item.Master;
						return master.value === action.get("Id");
					});
					const availableStagesReferences = [];
					Terrasoft.each(availableStages, function(availableAction) {
						const reference = availableAction.Reference;
						availableStagesReferences.push(reference.value);
					}, this);
					action.set("AvailableStages", availableStagesReferences);
				}
			},

			/**
			 * Creates item for actions collection.
			 * @protected
			 * @virtual
			 * @param {Object} itemData Data for single item, contains values for columns defined in
			 * {@link #getActionsQuery} query.
			 */
			createActionsItem: function(itemData) {
				const id = itemData.PrimaryColumn;
				const caption = itemData.PrimaryDisplayColumn;
				const item = this.createActionItemModel();
				item.set("Id", id);
				item.set("Caption", caption);
				let color = itemData.Color;
				if (this.isEmpty(color)) {
					const defaultColor = this.get("DefaultActionsDashboardStageItemColor");
					if (!this.isEmpty(defaultColor)) {
						color = defaultColor;
					}
				}
				item.set("Color", color);
				item.set("Order", itemData.SortColumn);
				item.set("InnerOrder", itemData.InnerSortColumn);
				this.setAvailableActions(item);
				return item;
			},

			/**
			 * Sets DecouplingItems property.
			 * @protected
			 * @param {Object} decouplingQueryResults Results of entity schema query to decoupling table.
			 */
			setDecouplingItems: function(decouplingQueryResults) {
				if (decouplingQueryResults) {
					this.set("DecouplingItems", decouplingQueryResults.rows);
				}
			},

			/**
			 * Iterates collection through actions and theirs menu items.
			 * @protected
			 * @param {Terrasoft.data.model.BaseViewModelCollection} actions Actions collection.
			 * @param {Function} callback Callback.
			 */
			iterateActions: function(actions, callback, scope) {
				if (!actions) {
					return;
				}
				let index = 0;
				actions.each(function(item) {
					Ext.callback(callback, scope, [item, index++]);
					const menu = item.get("Menu");
					if (menu) {
						menu.each(function(menuItem) {
							Ext.callback(callback, scope, [menuItem, index++]);
						}, this);
					}
				}, this);
			},

			/**
			 * Sets displayColor and hoverColor properties for all actions.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} actions Collection of stage control items.
			 */
			setActionsColor: function(actions) {
				const currentAction = this.get("ActiveAction");
				if (this.isEmpty(currentAction)) {
					return;
				}
				const currentActionColor = currentAction.get("Color");
				const currentActionIndex = this.getActionIndex(currentAction, actions);
				this.iterateActions(actions, function(item, index) {
					if (index <= currentActionIndex) {
						item.set("DisplayColor", currentActionColor);
					} else {
						item.set("DisplayColor", "");
					}
					const hoverColor = Terrasoft.shadeColor(currentActionColor, 0.5);
					item.set("HoverColor", hoverColor);
				});
			},

			/**
			 * Loads actions collection.
			 * @param {Terrasoft.BaseViewModelCollection} actions Actions collection.
			 */
			loadActionsCollection: function(actions) {
				const viewModelCollection = this.get("ActionsCollection");
				viewModelCollection.clear();
				viewModelCollection.loadAll(actions);
			},

			/**
			 * Returns array of stages available for transition.
			 * @protected
			 * @return {Array} Array of stages available for transition.
			 */
			getAvailableStages: function(actions) {
				actions = actions || this.get("ActionsCollection");
				const currentAction = this.get("ActiveAction");
				const isActiveActionExists = this.checkIfActiveActionExists(actions);
				let availableStages = [];
				if (!isActiveActionExists) {
					this.iterateActions(actions, function(action) {
						availableStages.push(action.get("Id"));
					});
				} else if (currentAction) {
					availableStages = currentAction.get("AvailableStages");
				} else {
					return null;
				}
				return availableStages;
			},

			/**
			 * Sets isEnabled property for all actions.
			 * @protected
			 */
			setActionsEnabled: function(actions) {
				const availableStages = this.getAvailableStages(actions);
				if (!availableStages) {
					return;
				}
				this.iterateActions(actions, function(action) {
					const id = action.get("Id");
					const isEnabled = this.getCanUseAction(action) && Terrasoft.contains(availableStages, id);
					action.set("Enabled", isEnabled);
					const parentAction = action.parentAction;
					if (parentAction) {
						parentAction.set("Enabled", parentAction.get("Enabled") || isEnabled);
					}
				}, this);
			},

			/**
			 * Sets isActive property for all actions.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} actions Collection of stage control items.
			 */
			setActionsIsActive: function(actions) {
				const currentAction = this.get("ActiveAction");
				if (this.isEmpty(currentAction)) {
					return;
				}
				const currentActionIndex = this.getActionIndex(currentAction, actions);
				this.iterateActions(actions, function(action, index) {
					action.set("IsActive", index === currentActionIndex);
					action.set("IsPassed", index <= currentActionIndex);
					const parentAction = action.parentAction;
					if (parentAction) {
						parentAction.set("IsActive", parentAction.get("IsActive") || action.get("IsActive"));
					}
				}, this);
			},

			/**
			 * Performs change of ActiveAction, actions color and isEnabled properties.
			 * @protected
			 * @param {Terrasoft.data.model.BaseViewModelCollection} [actions] Collection of stage control items.
			 */
			handleActiveActionChange: function(actions) {
				actions = actions || this.get("ActionsCollection");
				if (!actions) {
					return;
				}
				this.setActiveAction(actions);
				this.setActionsColor(actions);
				this.setActionsEnabled(actions);
				this.setActionsIsActive(actions);
				this.loadActionsCollection(actions.clone());
			},

			/**
			 * Sets ActionsCollection property.
			 * @protected
			 * @param {Object} response EntitySchemaQuery response.
			 */
			initActions: function(response) {
				if (!response.success) {
					return;
				}
				const queryResults = response.queryResults;
				const items = queryResults[0].rows;
				const decouplingQueryResults = queryResults[1];
				this.setDecouplingItems(decouplingQueryResults);
				let innerCollection = this.createActionsCollection(items);
				innerCollection = this.createActionsMenu(innerCollection);
				this.handleActiveActionChange(innerCollection);
			},

			/**
			 * Creates collection of actions.
			 * @protected
			 * @param {Array} items Array of items from which action collection is created.
			 * @return {Terrasoft.BaseViewModelCollection} Collection of actions.
			 */
			createActionsCollection: function(items) {
				const innerCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(items, function(itemData) {
					const actionsItem = this.createActionsItem(itemData);
					innerCollection.add(itemData.PrimaryColumn, actionsItem);
				}, this);
				return innerCollection;
			},

			/**
			 * Creates menus for actions.
			 * @protected
			 * @param {Terrasoft.data.model.BaseViewModelCollection} items Actions.
			 * @return {Terrasoft.data.model.BaseViewModelCollection} Collection of items with formed menus.
			 */
			createActionsMenu: function(items) {
				let previousItem;
				const sourceCollection = items.clone();
				items.clear();
				sourceCollection.each(function(item) {
					if (this.isMenuItem(item, previousItem)) {
						this.addMenuItem(previousItem, item);
						item.parentAction = previousItem;
					} else {
						previousItem = item;
						items.addItem(item);
					}
				}, this);
				return items;
			},

			/**
			 * Determines whether the item is the menu item to the previous item.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.model.BaseViewModel} item
			 * @param {Terrasoft.model.BaseViewModel} previousItem
			 * @return {Boolean} The check result.
			 */
			isMenuItem: function(item, previousItem) {
				if (this.get("DcmSchema")) {
					return this.isDcmMenuItem(item, previousItem);
				} else {
					const order = previousItem && previousItem.get("Order");
					return item.get("Order") === order;
				}
			},

			/**
			 * Adds menu item to root action item.
			 * @param {Terrasoft.model.BaseViewModel} item Root action item.
			 * @param {Terrasoft.model.BaseViewModel} menuItem Action menu item.
			 */
			addMenuItem: function(item, menuItem) {
				let menu = item.get("Menu");
				if (!menu) {
					menu = Ext.create("Terrasoft.BaseViewModelCollection");
					item.set("Menu", menu);
				}
				if (menu.getCount() === 0) {
					const clone = this.createActionItemModel(item.changedValues);
					menu.add(clone.get("Id"), clone);
					clone.parentAction = item;
				}
				menu.add(menuItem.get("Id"), menuItem);
			},

			/**
			 * Created view model object.
			 * @protected
			 * @param {Object} [values] View model values.
			 * @return {Terrasoft.BaseViewModel} Created object.
			 */
			createActionItemModel: function(values) {
				values = values || {};
				return Ext.create("Terrasoft.BaseViewModel", {
					values: values
				});
			},

			/**
			 * Set process execution data for every collection item.
			 * @protected
			 * @param {Terrasoft.data.model.BaseViewModelCollection} collection Items collection.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			loadExecutionData: function(collection, callback, scope) {
				if (collection.isEmpty()) {
					callback.call(scope);
					return;
				}
				const elementUIds = this.getElementUIds(collection);
				const request = Ext.create("Terrasoft.DcmExecutionDataRequest", {elementUIds: elementUIds});
				request.execute(function(response) {
					if (response.success) {
						Terrasoft.each(response.batch, function(responseItem) {
							if (responseItem.success) {
								this.setItemExecutionData(responseItem, collection);
								this.setItemRequiredType(responseItem, collection);
							} else {
								this.error(responseItem.errorInfo.message);
							}
						}, this);
					} else {
						this.error(response.errorInfo.toString());
					}
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#loadDashboardItems
			 * @override
			 */
			loadDashboardItems: function(callback, scope) {
				if (!this.get("IsMasterEntityInitialized")) {
					this.clearDashboardItems();
					Terrasoft.ActionsDashboardUtils.hideMask();
					this.set("IsDashboardItemsLoading", false);
					Ext.callback(callback, scope);
					return;
				}
				const dashboardItems = this.get("DashboardItems");
				const collection = Ext.create("Terrasoft.BaseViewModelCollection");
				const batchQuery = this.getItemsQuery();
				const activityQuery = batchQuery.queries[0].query;
				activityQuery.on("createviewmodel", this.createDashboardItemViewModel, this);
				Terrasoft.chain(
					function(next) {
						batchQuery.execute(next, this);
					},
					function(next, batchQueryResult) {
						Terrasoft.each(batchQueryResult.queryResults, function(result) {
							this.addDashBoardItemViewModel(result, collection, activityQuery);
						}, this);
						next();
					},
					function (next) {
						if (Terrasoft.Features.getIsEnabled("ProcessDashboardRequest")) {
							return this._processDashboardRequest(next, this);
						}
						next();
					},
					function(next, result) {
						if (Terrasoft.Features.getIsEnabled("ProcessDashboardRequest")) {
							this.addDashBoardItemViewModel(result, collection, activityQuery);
						}
						next();
					},
					function(next) {
						collection.sortByFn(this.sortItemsByDateAsc);
						dashboardItems.clear();
						dashboardItems.loadAll(collection);
						next();
					},
					function(next) {
						this.loadExecutionData(dashboardItems, next, this);
					},
					function() {
						Terrasoft.ActionsDashboardUtils.hideMask();
						this.set("IsDashboardItemsLoading", false);
						Ext.callback(callback, scope);
					},
					this
				);
			},

			/**
			 * Create ViewModel for item of dashboard.
			 * @return {Terrasoft.BaseDashboardItemViewModel} Instance of ViewModel.
			 */
			createDashboardItemViewModel: function(config) {
				const values = config.rawData;
				const viewModelClassName = this.getDashboardItemViewModelClassName(values.EntitySchemaName);
				const viewModel = Ext.create(viewModelClassName, {
					Ext: Ext,
					sandbox: this.sandbox,
					Terrasoft: Terrasoft
				});
				Terrasoft.each(values, function(column, columnName) {
					viewModel.setColumnValue(columnName, column);
				}, this);
				viewModel.init();
				config.viewModel = viewModel;
				return viewModel;
			},

			/**
			 * Returns name of the ViewModel class for items of dashboard.
			 * @protected
			 * @param {String} entitySchemaName Name of the EntitySchema.
			 * @return {String} Name of the ViewModel class.
			 */
			getDashboardItemViewModelClassName: function(entitySchemaName) {
				const config = this.getDashboardItemsConfig(entitySchemaName);
				return config && config.viewModelClassName;
			},

			/**
			 * Function for sorting items of dashboard by date.
			 * @param {Terrasoft.model.BaseViewModel} itemA Comparable item.
			 * @param {Terrasoft.model.BaseViewModel} itemB Comparable item.
			 * @return {Number} Result.
			 */
			sortItemsByDateAsc: function(itemA, itemB) {
				let dateA = itemA && itemA.get("Date");
				let dateB = itemB && itemB.get("Date");
				dateA = new Date(dateA).getTime();
				dateB = new Date(dateB).getTime();
				if (dateA === dateB) {
					return 0;
				}
				return (dateA < dateB) ? -1 : 1;
			},

			/**
			 * Sets ActionsPrimaryColumnName and ActionsPrimaryDisplayColumnName
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Executions context.
			 */
			setActionsPrimaryColumnNames: function(callback, scope) {
				const actionsSchemaName = this.get("ActionsSchemaName");
				Terrasoft.require([actionsSchemaName], function(response) {
					if (response) {
						this.set("ActionsPrimaryColumnName", response.primaryColumnName);
						this.set("ActionsPrimaryDisplayColumnName", response.primaryDisplayColumnName);
					}
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Sets names of action columns.
			 * @protected
			 * @param {Object} actionsConfig Configuration object containing names of columns.
			 */
			setActionsColumns: function(actionsConfig) {
				if (!actionsConfig) {
					return;
				}
				const actionsSchemaName = actionsConfig.schemaName;
				this.set("ActionsSchemaName", actionsSchemaName);
				const actionColumnName = actionsConfig.columnName;
				this.set("ActionsColumnName", actionColumnName);
				const colorColumnName = actionsConfig.colorColumnName;
				this.set("ActionsColorColumnName", colorColumnName);
				const filterColumnName = actionsConfig.filterColumnName;
				this.set("ActionsFilterColumnName", filterColumnName);
				const orderColumnName = actionsConfig.orderColumnName;
				this.set("ActionsOrderColumnName", orderColumnName);
				const innerOrderColumnName = actionsConfig.innerOrderColumnName;
				this.set("ActionsInnerOrderColumnName", innerOrderColumnName);
				const decouplingConfig = actionsConfig.decouplingConfig;
				this.set("DecouplingConfig", decouplingConfig);
				this.setActiveActionId(actionsSchemaName);
			},

			/**
			 * Sets identifier of active action.
			 * @protected
			 */
			setActiveActionId: function() {
				const columnName = this.get("ActionsColumnName");
				const currentAction = this.getMasterEntityParameterValue(columnName);
				const activeActionId = currentAction ? currentAction.value : null;
				this.set("ActiveActionId", activeActionId);
			},

			/**
			 * Initializes default values.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			initDefaultValues: function(callback, scope) {
				const sysSettingsNames = this.getSysSettingsCodes();
				Terrasoft.SysSettings.querySysSettings(sysSettingsNames, function(values) {
					Terrasoft.each(values, function(settingValue, settingName) {
						this.set(settingName, settingValue);
					}, this);
					callback.call(scope);
				}, this);
			},

			/**
			 * Returns codes for system settings which values are need to be initialized.
			 * @protected
			 */
			getSysSettingsCodes: function() {
				return ["DefaultActionsDashboardStageItemColor", "ShowChangeStageConfirmDialog"];
			},

			/**
			 * Sets actionsSchema properties.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			initActionsSchema: function(callback, scope) {
				const actionsConfig = this.values.actionsConfig;
				this.set("HeaderVisible", !Ext.isEmpty(actionsConfig));
				this.setActionsColumns(actionsConfig);
				this.setActionsPrimaryColumnNames(callback, scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActionsDashboard#getDashboardTabCaption
			 * @override
			 */
			getDashboardTabCaption: function(value) {
				value = value || 0;
				const captionPattern = this.get("Resources.Strings.DashboardTabCaptionPattern");
				const queryItemsBatchSize = this.get("QueryItemsBatchSize");
				if (value >= queryItemsBatchSize) {
					value = Ext.String.format("{0}+", queryItemsBatchSize);
				}
				const caption = Ext.String.format(captionPattern, value);
				return caption;
			},

			/**
			 * Returns set of the queries for loading of dashboard.
			 * @protected
			 * @return {Terrasoft.BatchQuery} Set of the queries.
			 */
			getItemsQuery: function() {
				const bq = Ext.create("Terrasoft.BatchQuery");
				const activityItemsQuery = this.getActivityItemsQuery();
				const processItemsQuery = this.getProcessItemsQuery();
				const visaItemsQuery = this._getVisaItemsQuery();
				const queryItemsBatchSize = this.get("QueryItemsBatchSize");
				activityItemsQuery.rowCount = queryItemsBatchSize;
				processItemsQuery.rowCount = queryItemsBatchSize;
				if (visaItemsQuery) {
					bq.add(visaItemsQuery);
					visaItemsQuery.rowCount = queryItemsBatchSize;
				}
				bq.add(activityItemsQuery);
				if (!Terrasoft.Features.getIsEnabled("ProcessDashboardRequest")) {
					bq.add(processItemsQuery);
				}
				return bq;
			},

			/**
			 * Returns name of the ViewConfig class for items of dashboard.
			 * @protected
			 * @param {String} entitySchemaName Name of the EntitySchema.
			 * @return {String} Name of the ViewConfig class.
			 */
			getDashboardItemViewConfigClassName: function(entitySchemaName) {
				const config = this.getDashboardItemsConfig(entitySchemaName);
				return config && config.viewConfigClassName;
			},

			/**
			 * Action change event handler.
			 * @protected
			 * @param {*} value New action value.
			 */
			onActionChanged: function(value) {
				const activeActionId = value.value;
				this.set("ActiveActionId", activeActionId);
				const key = this.get("ActionsColumnName");
				this.setMasterEntityParameterValue(key, value);
				this._setIsInActionChangedMode(true);
				this.saveMasterEntity({
					callback: this._setIsInActionChangedMode.bind(this, false),
					scope: this
				}, this);
			},

			/**
			 * @private
			 */
			_setIsInActionChangedMode: function(value) {
				this.set("IsInActionChangedMode", value);
			},

			/**
			 * Publishes the SaveRecord message.
			 * @protected
			 * @param {Object} config for SaveRecord message.
			 * @param {Object} scope Execution context.
			 */
			saveMasterEntity: function(config, scope) {
				const sandbox = this.sandbox;
				let callback = Ext.emptyFn;
				let contextForCallback = scope;
				if (config) {
					callback = config.callback || callback;
					contextForCallback = config.scope || contextForCallback;
					delete config.callback;
					delete config.scope;
				}
				const saveMasterEntityConfig = this.getSaveMasterEntityConfig(callback, contextForCallback);
				Ext.apply(saveMasterEntityConfig, config);
				this._updateStateObject();
				sandbox.publish("SaveRecord", saveMasterEntityConfig, [sandbox.id]);
			},

			/**
			 * Returns config for the "SaveRecord" message.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @return {Object} Config.
			 */
			getSaveMasterEntityConfig: function(callback, scope) {
				return {
					isSilent: true,
					callback: this.onMasterEntitySaved.bind(this, callback, scope),
					callBaseSilentSavedActions: true,
					scope: this,
					canShowProcessCardOnSilentSave: true
				};
			},

			/**
			 * The callback function of the SaveRecord message.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			onMasterEntitySaved: function(callback, scope) {
				this.set("IsMasterEntityInitialized", true);
				Ext.callback(callback, scope || this);
				this.reloadMasterEntityCard();
			},

			/**
			 * Reloads master entity record from database.
			 * @protected
			 */
			reloadMasterEntityCard: function() {
				const sandbox = this.sandbox;
				const operation = this.getMasterEntityParameterValue("Operation");
				if (operation === Terrasoft.ConfigurationEnums.CardOperation.EDIT) {
					sandbox.publish("ReloadCard", null, [sandbox.id]);
				} else {
					this.loadDashboardItems();
				}
			},

			/**
			 * Returns message type of module to be loaded to the tab container
			 * @return {String} Message type
			 */
			getMessageType: function() {
				const activeTabName = this.get("ActiveTabName");
				const tab = this.getTabByName(activeTabName);
				return tab.get("Tag");
			},

			/**
			 * Renders the message module.
			 */
			onMessageModuleRendered: function() {
				const messageType = this.getMessageType();
				if (!messageType) {
					return;
				}
				const messagePublisherModule = messageType + "MessagePublisherModule";
				const moduleId = this.sandbox.id + "_" + messagePublisherModule;
				const moduleContainerId = messageType + "MessageModule";
				const rendered = this.sandbox.publish("RerenderPublisherModule", {
					renderTo: moduleContainerId
				}, [moduleId]);
				if (!rendered) {
					this.subscribePublisher(moduleId);
					const messagePublishersModuleConfig = {
						renderTo: moduleContainerId
					};
					this.sandbox.loadModule(messagePublisherModule, messagePublishersModuleConfig);
				}
			},

			/**
			 * Execute subscribe for messages for all publishers.
			 * @protected
			 * @param {String} moduleId Id of module.
			 */
			subscribePublisher: function(moduleId) {
				this.sandbox.subscribe("GetPropertiesByName", this.onGetPropertiesByName, this, [moduleId]);
			},

			/**
			 * Handler event GetPropertiesByName. Returns columns value of object.
			 * @param {String[]} columnNames Array identifiers columns.
			 * @protected
			 * @return {Object} Column value.
			 */
			onGetPropertiesByName: function(columnNames) {
				const columnValues = {};
				Terrasoft.each(columnNames, function(columnName) {
					columnValues[columnName] = this.get(columnName);
				}, this);
				return columnValues;
			},

			/**
			 * Handles active stage click event.
			 * @protected
			 * @param {GUID} oldValue Old action stage id.
			 * @param {GUID} value New action stage id.
			 * @return {Boolean} Event result.
			 */
			onActiveStageClick: function(oldValue, value) {
				if (this.get("ShowChangeStageConfirmDialog")) {
					this.showStageChangeDialog(function() {
						this.onActionChanged({
							value: value
						});
					}, this);
				} else {
					return true;
				}
				return false;
			},

			/**
			 * Set module destroying ability dependent on child modules.
			 * @param {String} cacheKey Identifier of the current cache.
			 */
			onCanBeDestroyedQuery: function(cacheKey) {
				this.sandbox.publish("GetPublisherPageState", cacheKey);
				const cacheItem = Terrasoft.ClientPageSessionCache.getItem(cacheKey);
				Ext.Array.each(cacheItem.childModules, function(module) {
					if (module.canBeDestroyed === false) {
						cacheItem.canBeDestroyed = false;
						cacheItem.errorInfo = {message: module.message};
					}
				});
			},

			/**
			 * Shows stage change confirmation dialog window.
			 * @protected
			 * @param {Function} callback Callback.
			 * @param {Object} scope Scope.
			 */
			showStageChangeDialog: function(callback, scope) {
				this.showConfirmationDialog(this.get("Resources.Strings.StageChangeDialogText"),
					function(returnCode) {
						if (returnCode !== Terrasoft.MessageBoxButtons.YES.returnCode) {
							return;
						}
						Ext.callback(callback, scope);
					},
					[Terrasoft.MessageBoxButtons.YES.returnCode,
						Terrasoft.MessageBoxButtons.NO.returnCode],
					null);
			},

			// region Methods: Private

			/**
			 * Returns task page entity structure.
			 * @private
			 * @return {Object|null} Task page entity structure.
			 */
			getTaskEntityStructure: function() {
				var taskTypeUId = ConfigurationConstants.Activity.Type.Task;
				var activityEntityStructure = this.Terrasoft.configuration.EntityStructure.Activity;
				return activityEntityStructure && activityEntityStructure.pages
					? this.Terrasoft.findWhere(activityEntityStructure.pages, {UId: taskTypeUId})
					: null;
			},

			/**
			 * Initialize IsMasterEntityInitialized attribute.
			 * @private
			 */
			initIsMasterEntityInitialized: function() {
				const masterColumnValue = this.getEntitySchemaPrimaryColumnValue();
				const isEntityInitialized = !Ext.isEmpty(masterColumnValue);
				this.set("IsMasterEntityInitialized", isEntityInitialized);
			},

			/**
			 * Generates ViewModel and sets ActiveAction property.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} actions Collection of stage control items.
			 */
			setActiveAction: function(actions) {
				const activeActionId = this.get("ActiveActionId");
				actions = actions || this.get("ActionsCollection");
				let activeAction = {};
				this.iterateActions(actions, function(item) {
					if (item.get("Id") === activeActionId) {
						activeAction = item;
					}
				});
				const actionParent = activeAction && activeAction.parentAction;
				if (actionParent) {
					actionParent.set("Caption", activeAction.get("Caption"));
				}
				this.set("ActiveAction", activeAction);
			},

			/**
			 * Returns action index including actions in menus.
			 * @private
			 * @param {Terrasoft.model.BaseViewModel} action Action item.
			 * @param {Terrasoft.data.model.BaseViewModelCollection} actions Collection of stage control items.
			 * @return {number} Action index.
			 */
			getActionIndex: function(action, actions) {
				actions = actions || this.get("ActionsCollection");
				let index = -1;
				this.iterateActions(actions, function(item, itemIndex) {
					if (item.get("Id") === action.get("Id")) {
						index = itemIndex;
					}
				});
				return index;
			},

			/**
			 * Checks whether actions collection contains element with key that is equal to active action id.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} actions Collection of stage control items.
			 * @return {Boolean} Returns true if actions collection contains activeAction.
			 */
			checkIfActiveActionExists: function(actions) {
				actions = actions || this.get("ActionsCollection");
				const activeActionId = this.get("ActiveActionId");
				let exist = false;
				this.iterateActions(actions, function(action) {
					exist = exist || action.get("Id") === activeActionId;
				});
				return exist;
			},

			/**
			 * Clears dashboard items.
			 * @private
			 */
			clearDashboardItems: function() {
				const dashboardItems = this.get("DashboardItems");
				dashboardItems.clear();
				dashboardItems.loadAll();
			},

			/**
			 * Set process execution data for collection item by server response data item.
			 * @private
			 * @param {Object} responseItem Server response data item.
			 * @param {Terrasoft.data.model.BaseViewModelCollection} collection Items collection.
			 */
			setItemExecutionData: function(responseItem, collection) {
				const elementUId = responseItem.elementUId;
				const executionData = Ext.decode(responseItem.message);
				const filteredCollection = collection.filterByFn(function(item) {
					return item.getProcessElementUId() === elementUId;
				});
				const firstItem = filteredCollection.first();
				firstItem.setExecutionData(executionData);
			},

			/**
			 * Set process element required type for collection item by server response data item.
			 * @private
			 * @param {Object} responseItem Server response data item.
			 * @param {Terrasoft.BaseViewModelCollection} collection Items collection.
			 */
			setItemRequiredType: function(responseItem, collection) {
				const elementUId = responseItem.elementUId;
				const filteredCollection = collection.filterByFn(function(item) {
					return item.getProcessElementUId() === elementUId;
				});
				const firstItem = filteredCollection.first();
				const isRequired = responseItem.requiredType ===
					Terrasoft.DcmConstants.ElementRequiredType.REQUIRED.value;
				firstItem.set("IsRequired", isRequired);
			},

			/**
			 * Returns process element uIds array from view model collection items.
			 * @private
			 * @param {Terrasoft.data.model.BaseViewModelCollection} collection Items collection.
			 * @return {String[]}
			 */
			getElementUIds: function(collection) {
				const elementUIds = [];
				collection.each(function(item) {
					const elementUId = item.getProcessElementUId();
					if (elementUId) {
						elementUIds.push(elementUId);
					}
				});
				return elementUIds;
			},

			/**
			 * Adds dashboard item view model from esq result.
			 * @private
			 * @param {Object} result Query result.
			 * @param {Terrasoft.core.collections.Collection} collection Dashboard items collection.
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq Esq.
			 */
			addDashBoardItemViewModel: function(result, collection, esq) {
				Terrasoft.each(result.rows, function(row) {
					const id = row.Id = this.getDashboardItemId(row);
					row.EntitySchemaName = this.getDashboardItemEntitySchemaName(row);
					if (!collection.contains(id)) {
						const item = esq.getViewModelByQueryResult(row, result.rowConfig);
						collection.add(id, item);
					}
				}, this);
			},

			/**
			 * Returns identifier value of the item.
			 * @private
			 * @param {Object} item Item of the dashboard.
			 */
			getDashboardItemId: function(item) {
				return item.EntityId || (item.ProcessElement && item.ProcessElement.value) || item.Id;
			},

			/**
			 * Returns name of the EntitySchema of the item.
			 * @private
			 * @param {Object} item Item of the dashboard.
			 */
			getDashboardItemEntitySchemaName: function(item) {
				const entitySchemaUId = item.EntitySchemaUId;
				const entitySchema = entitySchemaUId && Terrasoft.EntitySchemaManager.getItem(entitySchemaUId);
				return entitySchema ? entitySchema.name : item.EntitySchemaName;
			},

			/**
			 * Initialize "EntitySchema" parameter.
			 * @private
			 */
			initEntitySchema: function() {
				const entitySchemaName = this.values.entitySchemaName;
				const entitySchema = Terrasoft[entitySchemaName];
				this.set("EntitySchema", entitySchema);
			},

			/**
			 * Adds filter by master column to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addMasterColumnFilter: function(esq) {
				const config = this.getDashboardItemsConfig(esq.rootSchemaName);
				if (config) {
					const masterColumnValue = this.getMasterEntityParameterValue(config.masterColumnName);
					const filter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						config.referenceColumnName, masterColumnValue);
					esq.filters.add("MasterColumnFilter", filter);
				}
			},

			/**
			 * Creates query to EntitySchema.
			 * @private
			 * @param {String} schemaName Name of the EntitySchema.
			 * @return {Terrasoft.data.queries.EntitySchemaQuery} The Query to EntitySchema.
			 */
			createEntitySchemaQuery: function(schemaName) {
				return new Terrasoft.EntitySchemaQuery(schemaName);
			},

			/**
			 * Sets value of the  ViewModel parameter.
			 * @private
			 * @param {String} parameterName Name of the ViewModel parameter.
			 * @param {Object} parameterValue Value of the ViewModel parameter.
			 * @param {Object} [options] Options.
			 */
			setMasterEntityParameterValue: function(parameterName, parameterValue, options) {
				const sandbox = this.sandbox;
				const config = {
					key: parameterName,
					value: parameterValue,
					options: options
				};
				sandbox.publish("UpdateCardProperty", config, [sandbox.id]);
			},

			/**
			 * Returns config for items of dashboard.
			 * @private
			 * @param {String} itemsSchemaName Name of the EntitySchema.
			 * @return {Object|null} Config.
			 */
			getDashboardItemsConfig: function(itemsSchemaName) {
				const dashboardConfig = this.get("DashboardConfig");
				if (this.isEmpty(dashboardConfig)) {
					return null;
				}
				return dashboardConfig[itemsSchemaName];
			},

			/**
			 * Returns the query to the "Activity" items of dashboard.
			 * @private
			 * @return {Terrasoft.data.queries.EntitySchemaQuery} The Query to EntitySchema.
			 */
			getActivityItemsQuery: function() {
				const esq = this.createEntitySchemaQuery("Activity");
				this.addActivityColumns(esq);
				this.addActivityFilters(esq);
				return esq;
			},

			/**
			 * Returns the query to the "Approval" items of dashboard.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery|null} The Query to EntitySchema.
			 */
			_getVisaItemsQuery: function() {
				let esq = null;
				const approvalSchemaName = this.get("ApprovalSchemaName");
				if (approvalSchemaName) {
					esq = this.createEntitySchemaQuery(approvalSchemaName);
					this._addVisaColumns(esq);
					this._addVisaFilters(esq);
				}
				return esq;
			},

			/**
			 * Returns the query to the "Process" items of dashboard.
			 * @private
			 * @return {Terrasoft.data.queries.EntitySchemaQuery} The Query to EntitySchema.
			 */
			getProcessItemsQuery: function() {
				const esq = this.createEntitySchemaQuery("VwProcessDashboard");
				this.addProcessColumns(esq);
				this.addProcessFilters(esq);
				return esq;
			},

			/**
			 * @private
			 */
			_processDashboardRequest: function(next, scope) {
				const queryItemsBatchSize = this.get("QueryItemsBatchSize");
				const entitySchema = this.get("EntitySchema");
				const config = this.getDashboardItemsConfig("VwProcessDashboard");
				const masterColumnValue = this.getMasterEntityParameterValue(config.masterColumnName);
				const request = new Terrasoft.ParametrizedRequest({
					contractName: "ProcessDashboardRequest",
					config: {
						uId: entitySchema.uId,
						referenceColumnName: config.referenceColumnName,
						masterColumnValue: masterColumnValue,
						rowSize: queryItemsBatchSize
					}
				});
				request.execute(function (result) {
					Terrasoft.each(result.rows, function (row) {
						const date = row["Date"];
						if (date) {
							row["Date"] = Terrasoft.parseDate(date);
						}
					});
					Ext.callback(next, scope, [result]);
				});
			},

			/**
			 * Adds columns of "Activity" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addActivityColumns: function(esq) {
				esq.addColumn("Id");
				esq.addColumn("Title", "Caption");
				esq.addColumn("Type");
				esq.addColumn("ProcessElementId");
				esq.addColumn("StartDate", "Date");
				esq.addColumn("Owner.Name", "Owner");
				esq.addParameterColumn("Activity", Terrasoft.DataValueType.TEXT, "EntitySchemaName");
				esq.addParameterColumn(this.getDashboardItemViewConfigClassName(esq.rootSchemaName),
					Terrasoft.DataValueType.TEXT, "ViewConfigClassName");
				esq.addParameterColumn(true, Terrasoft.DataValueType.BOOLEAN, "EntityInitialized");
				esq.addParameterColumn(false, Terrasoft.DataValueType.BOOLEAN, "IsRequired");
			},

			/**
			 * Adds columns of "SysModuleVisa" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			_addVisaColumns: function(esq) {
				esq.addColumn("Id");
				esq.addColumn("Objective", "Caption");
				esq.addColumn("CreatedOn", "Date");
				esq.addColumn("VisaOwner.Name", "Owner");
				esq.addColumn("IsAllowedToDelegate", "IsAllowedToDelegate");
				const approvalSchemaName = this.get("ApprovalSchemaName");
				esq.addParameterColumn(approvalSchemaName, Terrasoft.DataValueType.TEXT, "EntitySchemaName");
				esq.addParameterColumn(this.getDashboardItemViewConfigClassName(esq.rootSchemaName),
					Terrasoft.DataValueType.TEXT, "ViewConfigClassName");
			},

			/**
			 * Adds columns of "Process" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addProcessColumns: function(esq) {
				esq.addColumn("Id");
				esq.addColumn("ProcessElementEntityId", "EntityId");
				esq.addColumn("ProcessElementEntitySchemaUId", "EntitySchemaUId");
				esq.addColumn("ProcessElement");
				esq.addColumn("ProcessElement.Id", "ProcessElementId");
				esq.addColumn("ProcessData");
				esq.addColumn("ProcessName", "Description");
				esq.addColumn("ElementCaption");
				esq.addColumn("CreatedOn", "Date");
				esq.addColumn("Owner.Name", "Owner");
				esq.addParameterColumn("VwProcessDashboard", Terrasoft.DataValueType.TEXT, "EntitySchemaName");
				esq.addParameterColumn(this.getDashboardItemViewConfigClassName(esq.rootSchemaName),
					Terrasoft.DataValueType.TEXT, "ViewConfigClassName");
			},

			/**
			 * Adds filters of "Activity" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addActivityFilters: function(esq) {
				esq.filters = Terrasoft.createFilterGroup();
				this.addMasterColumnFilter(esq);
				this.addActivityDefaultFilters(esq);
			},

			/**
			 * Adds filters of "Approval" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			_addVisaFilters: function(esq) {
				esq.filters = Terrasoft.createFilterGroup();
				this.addMasterColumnFilter(esq);
				const filters = esq.filters;
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[SysAdminUnitInRole:SysAdminUnitRoleId:VisaOwner].SysAdminUnit",
					Terrasoft.SysValue.CURRENT_USER.value));
				filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"IsCanceled", false));
				const filterGroup = esq.createFilterGroup();
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				const isNullFilterExpression = Ext.create("Terrasoft.ColumnExpression", {
					columnPath: "Status"
				});
				filterGroup.addItem(esq.createIsNullFilter(isNullFilterExpression));
				filterGroup.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"Status.IsFinal", false));
				filters.addItem(filterGroup);
			},

			/**
			 * Adds filters of "Process" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addProcessFilters: function(esq) {
				esq.filters = Terrasoft.createFilterGroup();
				this.addMasterColumnFilter(esq);
				this.addProcessDefaultFilters(esq);
			},

			/**
			 * Adds default filters of "Activity" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addActivityDefaultFilters: function(esq) {
				const filters = esq.filters;
				filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"Status.Finish", false));
				const activityConstants = ConfigurationConstants.Activity;
				const emailActivityTypeId = activityConstants.Type.Email;
				const emailSendStatusId = activityConstants.EmailSendStatus.NotSended;
				const incomingMessageTypeId = activityConstants.MessageType.Incoming;
				const isNullFilterExpression = Ext.create("Terrasoft.ColumnExpression", {
					columnPath: "MessageType"
				});
				const filterGroup = esq.createFilterGroup();
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				filterGroup.addItem(esq.createIsNullFilter(isNullFilterExpression));
				filterGroup.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"MessageType", incomingMessageTypeId));
				const emailFilterGroup = esq.createFilterGroup();
				emailFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				emailFilterGroup.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"Type", emailActivityTypeId));
				emailFilterGroup.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"EmailSendStatus", emailSendStatusId));
				filterGroup.add(emailFilterGroup);
				filters.addItem(filterGroup);
			},

			/**
			 * Adds default filters of "Process" items of dashboard to the query.
			 * @private
			 * @param {Terrasoft.data.queries.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addProcessDefaultFilters: function(esq) {
				const filters = esq.filters;
				const entitySchema = this.get("EntitySchema");
				filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"EntitySchemaUId", entitySchema.uId));
			},

			/**
			 * Returns query that obtains actual value of ActionsColumn property from DB.
			 * @private
			 * @return {Terrasoft.data.queries.EntitySchemaQuery} ActionsColumn query.
			 */
			getActionsColumnValueQuery: function() {
				const entitySchemaName = this.get("EntitySchemaName");
				const esq = this.createEntitySchemaQuery(entitySchemaName);
				const actionsColumnName = this.get("ActionsColumnName");
				esq.addColumn(actionsColumnName, "ActionsColumn");
				return esq;
			},

			/**
			 * ActionsColumn query execution callback.
			 * @private
			 * @param {Object} response ActionsColumn query response.
			 */
			getActionsColumnValueCallback: function(response) {
				if (response && response.success) {
					const entity = response.entity;
					const actionsColumn = entity && entity.get("ActionsColumn");
					if (actionsColumn && actionsColumn.value) {
						const columnValue = actionsColumn.value;
						const columnName = this.get("ActionsColumnName");
						this.set("ActiveActionId", columnValue);
						this.setMasterEntityParameterValue(columnName, {value: columnValue}, {silent: true});
						this.handleActiveActionChange();
					}
				}
			},

			/**
			 * Returns whether the page is opened in append mode.
			 * @private
			 * @return {Boolean} Returns whether the page is opened in append mode.
			 */
			isAddMode: function() {
				const operation = this.getMasterEntityParameterValue("Operation");
				return operation === Terrasoft.ConfigurationEnums.CardOperation.ADD;
			},

			/**
			 * Returns whether the page is opened in edit mode.
			 * @private
			 * @return {Boolean} Returns whether the page is opened in edit mode.
			 */
			isEditMode: function() {
				const operation = this.getMasterEntityParameterValue("Operation");
				return operation === Terrasoft.ConfigurationEnums.CardOperation.EDIT;
			},

			/**
			 * Returns whether the page is opened in copy mode.
			 * @private
			 * @return {Boolean} Returns whether the page is opened in copy mode.
			 */
			isCopyMode: function() {
				const operation = this.getMasterEntityParameterValue("Operation");
				return operation === Terrasoft.ConfigurationEnums.CardOperation.COPY;
			},

			/**
			 * Returns whether the page is opened in append or copy mode.
			 * @private
			 * @return {Boolean} Returns whether the page is opened in append or copy mode.
			 */
			isNewMode: function() {
				return this.isAddMode() || this.isCopyMode();
			},

			/**
			 * Finds approval reference column name.
			 * @private
			 * @param {Terrasoft.SysModuleVisaManagerItem} visaManagerItem Visa Manager Item.
			 * @return {Terrasoft.EntitySchemaManagerItem|null}
			 */
			_findVisaEntityItem: function(visaManagerItem) {
				const visaSchemaUId = visaManagerItem.getVisaSchemaUId();
				return Terrasoft.EntitySchemaManager.findItem(visaSchemaUId);
			},

			/**
			 * Finds visa manager item.
			 * @private
			 * @return {Terrasoft.SysModuleVisaManagerItem|null}
			 */
			_findVisaManagerItem: function() {
				const entitySchema = this.get("EntitySchema");
				const moduleStructure = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchema.name);
				const sectionItem = Terrasoft.SectionManager.findItem(moduleStructure.moduleId);
				const sysModuleVisaId = sectionItem.getSysModuleVisaId();
				return Terrasoft.SysModuleVisaManager.findItem(sysModuleVisaId);
			},

			/**
			 * Finds approval reference column name.
			 * @private
			 * @param {Terrasoft.SysModuleVisaManagerItem} visaManagerItem Visa Manager Item.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			_findVisaReferenceColumnName: function(visaManagerItem, callback, scope) {
				const masterColumnUId = visaManagerItem.getMasterColumnUId();
				const entitySchemaManagerItem = this._findVisaEntityItem(visaManagerItem);
				entitySchemaManagerItem.getInstance(function(instance) {
					const column = instance.findColumnByUId(masterColumnUId);
					callback.call(scope, column.name);
				}, this);
			},

			/**
			 * Returns approval items config.
			 * @private
			 * @return {Object}
			 */
			_getApprovalItemsConfig: function() {
				const config = {};
				const approvalSchemaName = this.get("ApprovalSchemaName");
				if (approvalSchemaName) {
					config[approvalSchemaName] = {
						masterColumnName: "Id",
						referenceColumnName: this.get("ApprovalReferenceColumnName"),
						viewModelClassName: "Terrasoft.ApprovalDashboardItemViewModel",
						viewConfigClassName: "Terrasoft.ApprovalDashboardItemViewConfig"
					};
				}
				return config;
			},

			/**
			 * @private
			 */
			_updateStateObject: function() {
				const currentState = this.sandbox.publish("GetHistoryState");
				const state = currentState && currentState.state;
				if (state && state.operation === "add") {
					state.primaryColumnValue = this.getEntitySchemaPrimaryColumnValue();
					state.entitySchemaName = this.get("EntitySchemaName");
					this.sandbox.publish("ReplaceHistoryState", {
						stateObj: state,
						pageTitle: null,
						hash: currentState.hash.historyState,
						silent: true
					});
				}
			}

			// endregion
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ActionsControl",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.BaseStageControl",
					"activeStageId": {
						"bindTo": "ActiveActionId"
					},
					"stages": {
						"bindTo": "ActionsCollection"
					},
					"activeStageChanged": {
						"bindTo": "onActionChanged"
					},
					"activeStageClick": {
						"bindTo": "onActiveStageClick"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "ActualDcmSchemaInformationButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"controlConfig": {
						"classes": {
							"wrapperClass": ["new-dcm-schema-available-info-btn"]
						},
						"visible": {
							"bindTo": "IsActualDcmSchema"
						},
						"caption": {
							"bindTo": "Resources.Strings.ChangeCaseButtonCaption"
						}
					},
					"linkClicked": {
						"bindTo": "onActualDcmSchemaInformationButtonLinkClick"
					},
					"content": {
						"bindTo": "Resources.Strings.ActualDcmSchemaInformationButtonCaption"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('SectionActionsDashboardMessagePublisherResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SectionActionsDashboardMessagePublisher", ["SectionActionsDashboardResources"],
	function() {
		return {
			attributes: {},
			messages: {
				/**
				 * @message SaveMasterEntity
				 * Message of saving the listener card.
				 */
				"SaveMasterEntity": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetListenerRecordInfo
				 * Message of getting the listener record information.
				 */
				"GetListenerRecordInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {
				/**
				 * Returns array of publishers by section identifier.
				 * @protected
				 * @return {Array} Section's publishers
				 */
				getSectionPublishers: function() {
					var publishers = [];
					return publishers;
				},

				/**
				 * Returns tab name using publisher name.
				 * @protected
				 * @param {String} name Publisher name.
				 * @return {String} Tab's name.
				 */
				getPublisherNameByTabName: function(name) {
					if (!name) {
						return;
					}
					return name.replace("MessageTab", "");
				},

				/**
				 * Returns true if tab name is publisher type tab.
				 * @protected
				 * @param {String} name Tab's name
				 * @return {Boolean} Is publisher tab
				 */
				isPublisherTab: function(name) {
					return this.Ext.String.endsWith(name, "MessageTab");
				},

				/**
				 * Returns identifier of message publisher module.
				 * @protected
				 * @virtual
				 * @return {Array} Identifiers of message publishers module.
				 */
				getMessagePublishersModuleIds: function() {
					var publishers = this.getSectionPublishers();
					var messagePublishersSandboxIds = [];
					var sandboxId = this.sandbox.id;
					this.Terrasoft.each(publishers, function(item) {
						messagePublishersSandboxIds.push(sandboxId + "_" + item + "MessagePublisherModule");
					}, this);
					return messagePublishersSandboxIds;
				},

				/**
				 * @inheritdoc Terrasoft.BaseActionsDashboard#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("GetListenerRecordInfo", this.onGetRecordInfoForPublisher, this, [this.sandbox.id]);
					this.sandbox.subscribe("SaveMasterEntity", this.saveMasterEntity, this, this.getMessagePublishersModuleIds());
				},

				/**
				 * Returns information about record for subscriber message module.
				 * @protected
				 * @virtual
				 * @return {Object} Record information.
				 */
				onGetRecordInfoForPublisher: function() {
					var activityConfig = this.getDashboardItemsConfig("Activity");
					var relationColumnName = activityConfig.referenceColumnName;
					var relationSchemaName = activityConfig.referenceColumnSchemaName || relationColumnName;
					var relationSchemaUId = this.Terrasoft.configuration.ModuleStructure[relationSchemaName].entitySchemaUId;
					var relationSchemaRecordId = this.getMasterEntityParameterValue(activityConfig.masterColumnName);
					var relationSchemaOperation = this.getMasterEntityParameterValue("Operation");
					return {
						relationColumnName: relationColumnName,
						relationSchemaName: relationSchemaName,
						relationSchemaUId: relationSchemaUId,
						relationSchemaRecordId: relationSchemaRecordId,
						relationSchemaOperation: relationSchemaOperation,
						additionalInfo: {}
					};
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);

define('SectionActionsDashboardTaskMessagePublisherResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SectionActionsDashboardTaskMessagePublisher", ["SectionActionsDashboardResources", "ConfigurationConstants",
			"SocialMessagePublisherModule"],
	function(resources, ConfigurationConstants) {
		return {
			attributes: {},
			messages: {},
			methods: {

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#getExtendedConfig
				 * @overridden
				 */
				getExtendedConfig: function() {
					var config = this.callParent(arguments);
					var lczImages = resources.localizableImages;
					config.TaskMessageTab = {
						"ImageSrc": this.Terrasoft.ImageUrlBuilder.getUrl(lczImages.TaskMessageTabImage),
						"MarkerValue": "task-message-tab",
						"Align": this.Terrasoft.Align.RIGHT,
						"Tag": "Task"
					};
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#onActiveTabChange
				 * @overridden
				 */
				onActiveTabChange: function(activeTab) {
					var messageType = activeTab.get("Name");
					if (messageType === "TaskMessageTab") {
						var operation = this.getMasterEntityParameterValue("Operation");
						var cardOperations = this.Terrasoft.ConfigurationEnums.CardOperation;
						if (operation === cardOperations.ADD || operation === cardOperations.COPY) {
							var config = {
								callback: this.openTask
							};
							this.saveMasterEntity(config, this);
						} else {
							this.openTask();
						}
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * Opens task card.
				 * @private
				 */
				openTask: function() {
					var task = this.getTaskEntityStructure();
					if (task && task.hasAddMiniPage) {
						this.openTaskMiniPage();
					} else {
						this.openTaskPage();
					}
				},

				/**
				 * Opens task page with default values.
				 * @private
				 */
				openTaskPage: function() {
					var defaultValues = this.getDefaultValues();
					this.openCardInChain({
						"schemaName": "ActivityPageV2",
						"operation": this.Terrasoft.ConfigurationEnums.CardOperation.ADD,
						"moduleId": this.sandbox.id + "ActivityPageV2",
						"renderTo": "centerPanel",
						"defaultValues": defaultValues
					});
				},

				/**
				 * Opens task MiniPage with default values.
				 * @private
				 */
				openTaskMiniPage: function() {
					var defaultValues = this.getDefaultValues();
					this.openMiniPage({
						"entitySchemaName": "Activity",
						"operation": this.Terrasoft.ConfigurationEnums.CardOperation.ADD,
						"valuePairs": defaultValues,
						"isFixed": true,
						"showDelay": 0
					});
				},

				/**
				 * Returns default values for the task page.
				 * @protected
				 * @return {Object} DefaultValues.
				 */
				getDefaultValues: function() {
					var defaultValues = [];
					var activityId = this.Terrasoft.generateGUID();
					defaultValues.push({
						name: "Id",
						value: activityId
					});
					var activityConfig = this.getDashboardItemsConfig("Activity");
					if (activityConfig && activityConfig.referenceColumnName) {
						defaultValues.push({
							name: activityConfig.referenceColumnName,
							value: this.getMasterEntityParameterValue("Id")
						});
					}
					var contact = this.getMasterEntityParameterValue("Contact");
					if (this.Ext.isObject(contact) && contact.value) {
						defaultValues.push({
							name: "Contact",
							value: contact.value
						});
					}
					var account = this.getMasterEntityParameterValue("Account");
					if (this.Ext.isObject(account) && account.value) {
						defaultValues.push({
							name: "Account",
							value: account.value
						});
					}
					var activityType = ConfigurationConstants.Activity.Type.Task;
					defaultValues.push({
						name: "Type",
						value: activityType
					});
					return defaultValues;
				},
				/**
				 * @inheritdoc Terrasoft.MessagePublisher.SectionActionsDashboard#getSectionPublishers
				 * @overridden
				 */
				getSectionPublishers: function() {
					var publishers = this.callParent(arguments);
					publishers.push("Task");
					return publishers;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "TaskMessageTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"items": []
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define('SectionActionsDashboardSocialMessagePublisherResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SectionActionsDashboardSocialMessagePublisher", ["SectionActionsDashboardResources", "SocialMessagePublisherModule"],
	function(resources) {
		return {
			attributes: {},
			messages: {},
			methods: {

				//region methods: protected

				/**
				 * Returns ESN channel button visibility.
				 * @protected
				 * @return {Boolean} ESN channel button visibility.
				 */
				getEsnChannelVisible: function() {
					return this.getExtraActionDashboadTabVisible();
				},

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#getExtendedConfig
				 * @overridden
				 */
				getExtendedConfig: function() {
					var config = this.callParent(arguments);
					var lczImages = resources.localizableImages;
					config.SocialMessageTab = {
						"ImageSrc": this.Terrasoft.ImageUrlBuilder.getUrl(lczImages.SocialMessageTabImage),
						"MarkerValue": "social-message-tab",
						"Align": this.Terrasoft.Align.RIGHT,
						"Visible": this.getEsnChannelVisible(),
						"Tag": "Social"
					};
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.MessagePublisher.SectionActionsDashboard#getSectionPublishers
				 * @overridden
				 */
				getSectionPublishers: function() {
					var publishers = this.callParent(arguments);
					publishers.push("Social");
					return publishers;
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "SocialMessageTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SocialMessageTabContainer",
					"parentName": "SocialMessageTab",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["social-message-content"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SocialMessageModule",
					"parentName": "SocialMessageTab",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["social-message-module", "message-module"]
						},
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"moduleName": "SocialMessagePublisherModule",
						"afterrender": {
							"bindTo": "onMessageModuleRendered"
						},
						"afterrerender": {
							"bindTo": "onMessageModuleRendered"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define('SectionActionsDashboardSSPResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SectionActionsDashboardSSP", ["SspMiniPageUtilities", "SspActivityDashboardItemViewModel"],
	function() {
		return {
			mixins: {
				/**
				 * @class SspMiniPageUtilitiesMixin Provides methods for SSP users minipage usage.
				 */
				SspMiniPageUtilitiesMixin: "Terrasoft.SspMiniPageUtilities"
			},
			methods: {

				//region Methods: Private

				/**
				 * Checks is current user type SSP.
				 * @private
				 * @return {Boolean} True if current user type SSP. Returns false othervise.
				 */
				_isCurrentUserSSP: function() {
					return Terrasoft.isCurrentUserSsp();
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#getExtraActionDashboadTabVisible
				 * @overridden
				 */
				getExtraActionDashboadTabVisible: function() {
					return !this._isCurrentUserSSP();
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#getEsnChannelVisible
				 * @overridden
				 */
				getEsnChannelVisible: function() {
					return this.getIsFeatureEnabled("ShowESNOnSSP") || this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#initDashboardConfig
				 * @override
				 */
				initDashboardConfig: function() {
					this.callParent(arguments);
					const dashboardConfig = this.$DashboardConfig;
					const activityItemsConfig = {
						"Activity": {
							viewModelClassName: "Terrasoft.SspActivityDashboardItemViewModel"
						}
					};
					Ext.merge(dashboardConfig, activityItemsConfig);
					this.$DashboardConfig = dashboardConfig;
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#getTaskEntityStructure
				 * @override
				 */
				getTaskEntityStructure: function() {
					var config = this.callParent(arguments) || {};
					config.hasAddMiniPage = config.hasAddMiniPage || this._isCurrentUserSSP();
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.MiniPageUtilities#getMiniPages
				 * @override
				 */
				getMiniPages: function(entityName) {
					var result = this.callParent(arguments);
					if (Ext.isEmpty(result)) {
						const sspMiniPage = this.getSspMiniPageSchemaName(entityName);
						if (!Ext.isEmpty(sspMiniPage)) {
							result.push(sspMiniPage);
						}
					}
					return result;
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);
 
define('SectionActionsDashboardEmailMessagePublisherResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SectionActionsDashboardEmailMessagePublisher", ["SectionActionsDashboardResources", "EmailMessagePublisherModule"],
	function(resources) {
		return {
			attributes: {},
			messages: {
				/**
				 * @message EmailTemplateLoaded
				 * Informs action dashboard that loaded EmailTemplate from history page
				 */
				"EmailTemplateLoaded": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message EmailMessagePageLoaded
				 * Informs section that tab was loaded
				 */
				"EmailMessagePageLoaded": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SendMacrosData
				 * Informs publisher that loaded EmailTemplate from history page
				 */
				"SendMacrosData": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseActionsDashboard#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var historyModule = this.getHistoryModuleId();
					this.sandbox.subscribe("EmailTemplateLoaded", this.setActiveTabAndSendData, this, [historyModule]);
				},

				/**
				 * Set active tab and send email data.
				 * @param {object} data from email template.
				 */
				setActiveTabAndSendData: function(args) {
					var activeTabName = "EmailMessageTab";
					this.set("ActiveTabName", activeTabName);
					this.hideTabs();
					this.setTabVisible(activeTabName, true);
					this.set("TabPanelCollapsed", false);
					this.sandbox.subscribe("EmailMessagePageLoaded", function() {
						this.sandbox.publish("SendMacrosData", args, [this.sandbox.id]);
					}, this, [this.getEmailMessagePublisherModuleId()]);
					this.sandbox.publish("SendMacrosData", args, [this.sandbox.id]);
				},

				/**
				 * Get history module id.
				 * @return {String} module id.
				 */
				getHistoryModuleId: function() {
					var moduleId = this.sandbox.id;
					return moduleId.replace("_module_DcmActionsDashboardModule", "") + "_MessageHistoryModule";
				},

				/**
				 * Get EmailMessagePublisher module id.
				 * @return {String} module id.
				 */
				getEmailMessagePublisherModuleId: function() {
					return this.sandbox.id + "_EmailMessagePublisherModule";
				},

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#getExtendedConfig
				 * @overridden
				 */
				getExtendedConfig: function() {
					var config = this.callParent(arguments);
					var lczImages = resources.localizableImages;
					config.EmailMessageTab = {
						"ImageSrc": this.Terrasoft.ImageUrlBuilder.getUrl(lczImages.EmailMessageTabImage),
						"MarkerValue": "email-message-tab",
						"Align": this.Terrasoft.Align.RIGHT,
						"Visible": this.getExtraActionDashboadTabVisible(),
						"Tag": "Email"
					};
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#onGetRecordInfoForPublisher
				 * @overridden
				 */
				onGetRecordInfoForPublisher: function() {
					var info = this.callParent(arguments);
					if (info && info.relationSchemaName === "Case") {
						info.additionalInfo.title = this.getEmailTitle();
					}
					if (info && info.relationSchemaName === "Contact") {
						var recepientTemplate = "{0} <{1}>; ";
						var contact;
						if (this.get("EntitySchemaName") !== info.relationSchemaName) {
							contact = this.getMasterEntityParameterValue("Contact");
						}
						var name = contact && contact.displayValue || this.getMasterEntityParameterValue("Name");
						var email = this.getMasterEntityParameterValue("Email");
						if (name && email) {
							info.additionalInfo.recepient = this.Ext.String.format(recepientTemplate, name, email);
						} else {
							info.additionalInfo.recepient = this.Ext.emptyString.toString();
						}
					}
					return info;
				},

				/**
				 * Returns title for an email to be sent from Case section.
				 * @return {String} Email title
				 */
				getEmailTitle: function() {
					var emailTitleMessage = this.get("Resources.Strings.EmailTitleCaption");
					var title = this.getMasterEntityParameterValue("Subject");
					var number = this.getMasterEntityParameterValue("Number");
					return this.Ext.String.format(emailTitleMessage, number, title);
				},

				/**
				 * @inheritdoc Terrasoft.MessagePublisher.SectionActionsDashboard#getSectionPublishers
				 * @overridden
				 */
				getSectionPublishers: function() {
					var publishers = this.callParent(arguments);
					publishers.push("Email");
					return publishers;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "EmailMessageTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "EmailMessageTabContainer",
					"parentName": "EmailMessageTab",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["email-message-content"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "EmailMessageModule",
					"parentName": "EmailMessageTab",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["email-message-module", "message-module"]
						},
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"moduleName": "EmailMessagePublisherModule",
						"afterrender": {
							"bindTo": "onMessageModuleRendered"
						},
						"afterrerender": {
							"bindTo": "onMessageModuleRendered"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define('SectionActionsDashboardCallMessagePublisherResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SectionActionsDashboardCallMessagePublisher", ["SectionActionsDashboardResources", "CallMessagePublisherModule"],
	function(resources) {
		return {
			attributes: {},
			messages: {},
			methods: {

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#getExtendedConfig
				 * @overridden
				 */
				getExtendedConfig: function() {
					var config = this.callParent(arguments);
					var lczImages = resources.localizableImages;
					config.CallMessageTab = {
						"ImageSrc": this.Terrasoft.ImageUrlBuilder.getUrl(lczImages.CallMessageTabImage),
						"MarkerValue": "call-message-tab",
						"Align": this.Terrasoft.Align.RIGHT,
						"Visible": this.getExtraActionDashboadTabVisible(),
						"Tag": "Call"
					};
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#onGetRecordInfoForPublisher
				 * @overridden
				 */
				onGetRecordInfoForPublisher: function() {
					var info = this.callParent(arguments);
					info.additionalInfo.contact = this.getContactEntityParameterValue(info.relationSchemaName);
					return info;
				},

				/**
				 * Returns entity parameter value for contact.
				 * @return {String} Contact
				 */
				getContactEntityParameterValue: function(relationSchemaName) {
					var contact;
					if (relationSchemaName === "Contact" && this.get("EntitySchemaName") === relationSchemaName) {
						var id = this.getMasterEntityParameterValue("Id");
						var name = this.getMasterEntityParameterValue("Name");
						if (id && name) {
							contact = {value: id, displayValue: name};
						}
					} else {
						contact = this.getMasterEntityParameterValue("Contact");
					}
					return contact;
				},

				/**
				 * @inheritdoc Terrasoft.MessagePublisher.SectionActionsDashboard#getSectionPublishers
				 * @overridden
				 */
				getSectionPublishers: function() {
					var publishers = this.callParent(arguments);
					publishers.push("Call");
					return publishers;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "CallMessageTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CallMessageTabContainer",
					"parentName": "CallMessageTab",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["call-message-content"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CallMessageModule",
					"parentName": "CallMessageTab",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["call-message-module", "message-module"]
						},
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"moduleName": "callMessagePublisherModule",
						"afterrender": {
							"bindTo": "onMessageModuleRendered"
						},
						"afterrerender": {
							"bindTo": "onMessageModuleRendered"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("SectionActionsDashboard", [], function() {
	return {
		attributes: {},
		methods: {},
		diff: /**SCHEMA_DIFF*/[
		{
			"operation": "move",
			"name": "DashboardTab",
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 0
		},
		{
			"operation": "move",
			"name": "CallMessageTab",
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 1
		},
		{
			"operation": "move",
			"name": "EmailMessageTab",
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 2
		},
		{
			"operation": "move",
			"name": "SocialMessageTab",
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 3
		},
		{
			"operation": "move",
			"name": "TaskMessageTab",
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 4
		}
		]/**SCHEMA_DIFF*/
	};
}
);


