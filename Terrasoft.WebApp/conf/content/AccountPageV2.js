Terrasoft.configuration.Structures["AccountPageV2"] = {innerHierarchyStack: ["AccountPageV2UIv2", "AccountPageV2SocialNetworkIntegration", "AccountPageV2Enrichment", "AccountPageV2Lead", "AccountPageV2Invoice", "AccountPageV2Order", "AccountPageV2Document", "AccountPageV2CTIBase", "AccountPageV2CoreContracts", "AccountPageV2Completeness", "AccountPageV2SSP", "AccountPageV2Opportunity", "AccountPageV2Project", "AccountPageV2PRMBase", "AccountPageV2SalesEnterprise", "AccountPageV2"], structureParent: "BaseModulePageV2"};
define('AccountPageV2UIv2Structure', ['AccountPageV2UIv2Resources'], function(resources) {return {schemaUId:'f5edc79d-8d39-4e51-a255-57ccf3f1349e',schemaCaption: "Account edit page", parentSchemaName: "BaseModulePageV2", schemaName:'AccountPageV2UIv2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2SocialNetworkIntegrationStructure', ['AccountPageV2SocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'62463cff-299a-4af6-a948-46295eebfa95',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2UIv2", schemaName:'AccountPageV2SocialNetworkIntegration',parentSchemaUId:'f5edc79d-8d39-4e51-a255-57ccf3f1349e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2EnrichmentStructure', ['AccountPageV2EnrichmentResources'], function(resources) {return {schemaUId:'6c51ec94-993b-4f35-80fa-3e7c80e6fb24',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2SocialNetworkIntegration", schemaName:'AccountPageV2Enrichment',parentSchemaUId:'62463cff-299a-4af6-a948-46295eebfa95',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2SocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2LeadStructure', ['AccountPageV2LeadResources'], function(resources) {return {schemaUId:'6184630d-f55a-4caf-a0ec-8a0efdb11ca3',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Enrichment", schemaName:'AccountPageV2Lead',parentSchemaUId:'6c51ec94-993b-4f35-80fa-3e7c80e6fb24',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Enrichment",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2InvoiceStructure', ['AccountPageV2InvoiceResources'], function(resources) {return {schemaUId:'b4f07f14-8f14-4d21-9d38-34a181037e15',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Lead", schemaName:'AccountPageV2Invoice',parentSchemaUId:'6184630d-f55a-4caf-a0ec-8a0efdb11ca3',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Lead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2OrderStructure', ['AccountPageV2OrderResources'], function(resources) {return {schemaUId:'f0c12eb8-9174-4654-87e7-378f686e3133',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Invoice", schemaName:'AccountPageV2Order',parentSchemaUId:'b4f07f14-8f14-4d21-9d38-34a181037e15',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Invoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2DocumentStructure', ['AccountPageV2DocumentResources'], function(resources) {return {schemaUId:'78c509c5-0564-486f-a876-f25cd69ef7b1',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Order", schemaName:'AccountPageV2Document',parentSchemaUId:'f0c12eb8-9174-4654-87e7-378f686e3133',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2CTIBaseStructure', ['AccountPageV2CTIBaseResources'], function(resources) {return {schemaUId:'5480f273-d5c3-4cc4-9477-1dba7aeedc09',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Document", schemaName:'AccountPageV2CTIBase',parentSchemaUId:'78c509c5-0564-486f-a876-f25cd69ef7b1',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Document",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2CoreContractsStructure', ['AccountPageV2CoreContractsResources'], function(resources) {return {schemaUId:'15194287-8a72-475e-9bc1-5ec7ab636a73',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2CTIBase", schemaName:'AccountPageV2CoreContracts',parentSchemaUId:'5480f273-d5c3-4cc4-9477-1dba7aeedc09',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2CTIBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2CompletenessStructure', ['AccountPageV2CompletenessResources'], function(resources) {return {schemaUId:'28d73a9b-5fd1-4e9a-8b2e-a2fdf1555d68',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2CoreContracts", schemaName:'AccountPageV2Completeness',parentSchemaUId:'15194287-8a72-475e-9bc1-5ec7ab636a73',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2CoreContracts",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2SSPStructure', ['AccountPageV2SSPResources'], function(resources) {return {schemaUId:'cfc160bf-9b7e-4b7c-8aac-e5becdfc79d5',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Completeness", schemaName:'AccountPageV2SSP',parentSchemaUId:'28d73a9b-5fd1-4e9a-8b2e-a2fdf1555d68',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Completeness",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2OpportunityStructure', ['AccountPageV2OpportunityResources'], function(resources) {return {schemaUId:'9052576b-eb23-4f7a-aa97-0d21961f247a',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2SSP", schemaName:'AccountPageV2Opportunity',parentSchemaUId:'cfc160bf-9b7e-4b7c-8aac-e5becdfc79d5',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2SSP",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2ProjectStructure', ['AccountPageV2ProjectResources'], function(resources) {return {schemaUId:'7360e68d-24e0-4f30-b4fb-5c099feedf29',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Opportunity", schemaName:'AccountPageV2Project',parentSchemaUId:'9052576b-eb23-4f7a-aa97-0d21961f247a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2PRMBaseStructure', ['AccountPageV2PRMBaseResources'], function(resources) {return {schemaUId:'3afd6a0e-987c-41df-83f2-99a440e9486c',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2Project", schemaName:'AccountPageV2PRMBase',parentSchemaUId:'7360e68d-24e0-4f30-b4fb-5c099feedf29',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2Project",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2SalesEnterpriseStructure', ['AccountPageV2SalesEnterpriseResources'], function(resources) {return {schemaUId:'0396f898-6e40-4169-946c-964caa2e1dd8',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2PRMBase", schemaName:'AccountPageV2SalesEnterprise',parentSchemaUId:'3afd6a0e-987c-41df-83f2-99a440e9486c',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2PRMBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2Structure', ['AccountPageV2Resources'], function(resources) {return {schemaUId:'e1092f9a-468a-407d-a583-b6a88f99d938',schemaCaption: "Account edit page", parentSchemaName: "AccountPageV2SalesEnterprise", schemaName:'AccountPageV2',parentSchemaUId:'0396f898-6e40-4169-946c-964caa2e1dd8',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountPageV2SalesEnterprise",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountPageV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2UIv2", ["BaseFiltersGenerateModule", "ConfigurationEnums", "ConfigurationConstants",
			"AccountPageV2Resources", "CommunicationSynchronizerMixin", "AccountPageMixin", "CommunicationOptionsMixin"],
		function(BaseFiltersGenerateModule, Enums, ConfigurationConstants) {
			return {
				entitySchemaName: "Account",
				messages: {
					/**
					 * @message UpdateRelationshipDiagram
					 * Reloads relationship diagram.
					 */
					"UpdateRelationshipDiagram": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message SetInitialisationData
					 * Sets initial values for search in social networks.
					 */
					"SetInitialisationData": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message ResultSelectedRows
					 * Returs selected rows in reference.
					 */
					"ResultSelectedRows": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetCommunicationsList
					 * Requests communications list.
					 */
					"GetCommunicationsList": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message SyncCommunication
					 * Synchronizes communications.
					 */
					"SyncCommunication": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetCommunicationsSynchronizedByDetail
					 * Requests communications synchronized by detail.
					 */
					"GetCommunicationsSynchronizedByDetail": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message CallCustomer
					 * Starts phone call in CTI panel.
					 */
					"CallCustomer": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					"Owner": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter}
					},
					"AnnualRevenue": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {
							orders: [{columnPath: "FromBaseCurrency"}]
						}
					},
					"EmployeesNumber": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {
							orders: [{columnPath: "Position"}]
						}
					},
					"canUseSocialFeaturesByBuildType": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * Account communication detail name.
					 */
					"CommunicationDetailName": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: "Communications"
					},
					/**
					 * Account phone.
					 */
					"Phone": {
						"dependencies": [
							{
								"columns": ["Phone"],
								"methodName": "syncEntityWithCommunicationDetail"
							}
						]
					},
					/**
					 * Account additional phone.
					 */
					"AdditionalPhone": {
						"dependencies": [
							{
								"columns": ["AdditionalPhone"],
								"methodName": "syncEntityWithCommunicationDetail"
							}
						]
					},
					/**
					 * Account fax.
					 */
					"Fax": {
						"dependencies": [
							{
								"columns": ["Fax"],
								"methodName": "syncEntityWithCommunicationDetail"
							}
						]
					},
					/**
					 * Account web.
					 */
					"Web": {
						"dependencies": [
							{
								"columns": ["Web"],
								"methodName": "syncEntityWithCommunicationDetail"
							}
						]
					}
				},
				details: /**SCHEMA_DETAILS*/{
					Communications: {
						schemaName: "AccountCommunicationDetail",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						}
					},
					Activities: {
						schemaName: "ActivityDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						},
						useRelationship: true

					},
					AccountBillingInfo: {
						schemaName: "AccountBillingInfoDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						}
					},
					AccountOrganizationChart: {
						schemaName: "AccountOrganizationChartDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						}
					},
					AccountContacts: {
						schemaName: "AccountContactsDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						},
						useRelationship: true,
						filterMethod: "_getContactCareerFilter"
					},
					Files: {
						schemaName: "FileDetailV2",
						entitySchemaName: "AccountFile",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						}
					},
					AccountAddress: {
						schemaName: "AccountAddressDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						}
					},
					AccountAnniversary: {
						schemaName: "AccountAnniversaryDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						}
					},
					Relationships: {
						schemaName: "AccountRelationshipDetailV2",
						filterMethod: "relationshipDetailFilter",
						defaultValues: {
							AccountA: {
								masterColumn: "Id"
							}
						}
					},
					EmailDetailV2: {
						schemaName: "EmailDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						},
						filterMethod: "emailDetailFilter"
					}
				}/**SCHEMA_DETAILS*/,
				modules: /**SCHEMA_MODULES*/{
					"ContactProfile": {
						"config": {
							"schemaName": "ContactProfileSchema",
							"isSchemaConfigInitialized": true,
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									"masterColumnName": "PrimaryContact",
									"profileColumnName": "Account"
								}
							}
						}
					},
					"ActionsDashboardModule": {
						"config": {
							"isSchemaConfigInitialized": true,
							"schemaName": "SectionActionsDashboard",
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									"entitySchemaName": "Account",
									"dashboardConfig": {
										"Activity": {
											"masterColumnName": "Id",
											"referenceColumnName": "Account"
										}
									}
								}
							}
						}
					}
				}/**SCHEMA_MODULES*/,
				/**
				 * Current schema mixins
				 */
				mixins: {
					/**
					 * @class CommunicationSynchronizerMixin Mixin, used for sync communications.
					 */
					CommunicationSynchronizerMixin: "Terrasoft.CommunicationSynchronizerMixin",
					/**
					 * @class AccountPageMixin Mixin, implements common business logic for Account.
					 */
					AccountPageMixin: "Terrasoft.AccountPageMixin",
					/**
					 * @class CommunicationOptionsMixin Mixin, implements communication options usage methods.
					 */
					CommunicationOptionsMixin: "Terrasoft.CommunicationOptionsMixin"
				},
				methods: {

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.initSyncMailboxCount();
						var sysSettings = ["BuildType"];
						Terrasoft.SysSettings.querySysSettings(sysSettings, function() {
							var buildType = Terrasoft.SysSettings.cachedSettings.BuildType &&
									Terrasoft.SysSettings.cachedSettings.BuildType.value;
							this.set("canUseSocialFeaturesByBuildType", buildType !==
									ConfigurationConstants.BuildType.Public);
						}, this);
					},

					/**
					 * @obsolete
					 */
					findContactsInSocialNetworks: function() {
						var activeRowId = this.get("Id");
						if (activeRowId !== undefined) {
							var recordName = this.get("Name");
							var config = {
								entitySchemaName: "Account",
								mode: "search",
								recordId: activeRowId,
								recordName: recordName
							};
							var historyState = this.sandbox.publish("GetHistoryState");
							this.sandbox.publish("PushHistoryState", {
								hash: historyState.hash.historyState,
								silent: true
							}, this);
							this.sandbox.loadModule("FindContactsInSocialNetworksModule", {
								renderTo: "centerPanel",
								id: this.sandbox.id + "_FindContactsInSocialNetworksModule",
								keepAlive: true
							});
							this.sandbox.subscribe("ResultSelectedRows", function(args) {
								this.set("Number", args.name);
								this.set("SocialMediaId", args.id);
							}, this, [this.sandbox.id + "_FindContactsInSocialNetworksModule"]);
							this.sandbox.subscribe("SetInitialisationData", function() {
								return config;
							}, [this.sandbox.id + "_FindContactsInSocialNetworksModule"]);
						}
					},

					/**
					 * Returns filters for relationship detail.
					 * @protected
					 * @return {Terrasoft.FilterGroup} Filters for detail.
					 */
					relationshipDetailFilter: function() {
						var recordId = this.get("Id");
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
						filterGroup.add("AccountAFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Account", recordId));
						return filterGroup;
					},

					/**
					 * Returns filters for email detail.
					 * @protected
					 * @return {Terrasoft.FilterGroup} Filters for detail.
					 */
					emailDetailFilter: function() {
						var recordId = this.get("Id");
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.add("AccountNotNull", this.Terrasoft.createColumnIsNotNullFilter("Account"));
						filterGroup.add("AccountConnection", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Account", recordId));
						filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
						return filterGroup;
					},

					/**
					 * Creates filters for History detail.
					 * @protected
					 * @return {Terrasoft.FilterGroup} Filters for detail.
					 */
					historyDetailFilter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.add("AccountFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"Account", this.get("Id")));
						filterGroup.add("sysWorkspacedetailFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"SysEntity.SysWorkspace", this.Terrasoft.SysValue.CURRENT_WORKSPACE.value));
						return filterGroup;
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
					 * @overridden
					 */
					asyncValidate: function() {
						if (this.changedValues && this.changedValues.PrimaryContact) {
							this.set("PrimaryContactChanged", true);
						}
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#save
					 * @overridden
					 */
					save: function() {
						this.clearChangedValuesSynchronizedByDetail();
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#onSaved
					 * @overridden
					 */
					onSaved: function(response, config) {
						if ((config && config.isSilent) || this.get("PrimaryContactAdded") ||
								(!this.isAddMode() && Ext.isEmpty(this.get("PrimaryContact"))) ||
								(config && config.callParent === true)) {
							if (this.get("PrimaryContactChanged")) {
								this.onUpdateContactAccount(function () {
									config = config || {};
									config.callParent = true;
									this.onSaved(response, config);
								}, this);
								return;
							}
							this.callParent(arguments);
							if (!this.get("IsInChain")) {
								this.updateDetail({detail: "Relationships"});
							} else {
								this.sandbox.publish("UpdateRelationshipDiagram", null, [this.sandbox.id]);
							}
						} else if (this.isAddMode() && Ext.isEmpty(this.get("PrimaryContact"))) {
							this.showConfirmationDialog(this.get("Resources.Strings.AddPrimaryContact"), function(result) {
								if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.addPrimaryContact();
									this.set("Operation", Enums.CardStateV2.EDIT);
									this.set("IsChanged", this.isChanged());
									this.updateButtonsVisibility(false);
								} else {
									config = config || {};
									config.callParent = true;
									this.onSaved(response, config);
								}
							}, ["yes", "no"]);
						} else {
							this.onUpdateContactAccount(function () {
								config = config || {};
								config.callParent = true;
								this.onSaved(response, config);
							}, this);
						}
					},

					/**
					 * Executes when view was rendered.
					 * @overridden
					 * @protected
					 */
					onRender: function() {
						this.callParent(arguments);
						if (this.get("Restored") && this.get("PrimaryContactAdded")) {
							this.onSaved({
								success: true
							});
						}
					},

					/**
					 * @private
					 */
					_getCurrentContactCareerEsq: function(primaryContactId) {
						var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {
							rootSchemaName: "ContactCareer"
						});
						esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
						esq.addColumn("Account");
						esq.addColumn("Primary");
						esq.addColumn("Current");
						var filters = this.Ext.create("Terrasoft.FilterGroup");
						filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Contact",
							primaryContactId));
						filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Current",
							1));
						esq.filters = filters;
						return esq;
					},

					/**
					 * Updates primary contact career.
					 * @protected
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					onUpdateContactAccount: function(callback, scope) {
						this.getPrimaryContactAccount(function(account) {
							var recordId = this.get("Id");
							var primaryContact = this.get("PrimaryContact");
							var primaryContactId = primaryContact.value;
							var primaryContactAccountId = account ? account.value : null;
							var isPrimaryContactChanged = this.get("PrimaryContactChanged");
							this.set("PrimaryContactChanged", false);
							if (!isPrimaryContactChanged || recordId === primaryContactAccountId) {
								callback.call(scope);
								return;
							}
							var accountName = this.get("Name");
							var careerConfig = {
								contactId: primaryContactId,
								isPrimary: true,
								isCurrent: true
							};
							var esq = this._getCurrentContactCareerEsq(primaryContactId);
							esq.execute(function(response) {
								if (response.success) {
									if (response.collection.getCount() > 0) {
										var isPrimary = false;
										response.collection.each(function(career) {
											if (career.get("Account") === recordId) {
												callback.call(scope, response);
												return;
											}
											if (career.get("Primary")) {
												isPrimary = true;
											}
										});
										var setMsg = this.Ext.String.format(
											this.get("Resources.Strings.SetAccountPrimaryCareer"),
											accountName, primaryContact.displayValue);
										this.showConfirmationDialog(setMsg, function(result) {
											if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
												if (isPrimary) {
													var updateCareerConfig = {
														contactId: primaryContact.value,
														isPrimary: false,
														dueDate: new Date()
													};
													this.updateContactCareer(function() {
														this.addContactCareer(callback, careerConfig, this);
													}, updateCareerConfig);
												} else {
													this.addContactCareer(callback, careerConfig, this);
												}
											} else {
												careerConfig.isPrimary = false;
												this.addContactCareer(callback, careerConfig, this);
											}
										}, ["yes", "no"]);
									} else {
										this.updateContactAccount(function() {
											this.addContactCareer(callback, careerConfig, this);
										}, primaryContact.value);
									}
								}
							}, this);
						}, this);
					},

					/**
					 * Creates filters for contact career.
					 * @private
					 * @return {Terrasoft.FilterGroup} Filter group for contact career.
					 */
					_getContactCareerFilter: function() {
						var primaryColumnValue = this.get(this.primaryColumnName);
						var careerFilterGroup = this.Terrasoft.createFilterGroup();
						careerFilterGroup.add("ByAccount", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "[ContactCareer:Contact:Id].Account",
							primaryColumnValue));
						careerFilterGroup.add("CurrentIsTrue", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "[ContactCareer:Contact:Id].Current", 1));
						var contactAccountAndCareerFilter = this.Terrasoft.createFilterGroup();
						contactAccountAndCareerFilter.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
						contactAccountAndCareerFilter.add("ContactAccount",
							this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Account", primaryColumnValue));
						contactAccountAndCareerFilter.add("ContactCareer", careerFilterGroup);
						return contactAccountAndCareerFilter;
					},

					/**
					 * Sets value for contact career list.
					 * @protected
					 * @param {Function} [callback] Callback function.
					 * @param {Object} data Update data.
					 */
					updateContactCareer: function(callback, data) {
						var update = Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "ContactCareer"
						});
						var filters = update.filters;
						var contactIdFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Contact", data.contactId);
						var isCurrentFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Current", true);
						var isPrimaryFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Primary", true);
						filters.add("contactIdFilter", contactIdFilter);
						filters.add("isCurrentFilter", isCurrentFilter);
						filters.add("isPrimaryFilter", isPrimaryFilter);
						if (data.hasOwnProperty("isPrimary")) {
							update.setParameterValue("Primary", data.isPrimary, Terrasoft.DataValueType.BOOLEAN);
						}
						if (data.hasOwnProperty("isCurrent")) {
							update.setParameterValue("Current", data.isPrimary, Terrasoft.DataValueType.BOOLEAN);
						}
						if (data.hasOwnProperty("dueDate")) {
							update.setParameterValue("DueDate", data.dueDate, Terrasoft.DataValueType.DATE);
						}
						update.execute(function(result) {
							callback.call(this, result);
						}, this);
					},

					/**
					 * Updates account id for contact.
					 * @protected
					 * @param {Function} [callback] Callback function.
					 * @param {Guid} [contactId] Contact id.
					 */
					updateContactAccount: function(callback, contactId) {
						var recordId = this.get("Id");
						var update = Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "Contact"
						});
						var filters = update.filters;
						var contactIdFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Id", contactId);
						filters.add("contactIdFilter", contactIdFilter);
						update.setParameterValue("Account", recordId, Terrasoft.DataValueType.GUID);
						update.execute(function(result) {
							callback.call(this, result);
						}, this);
					},

					/**
					 * Adds main contact for account.
					 * @protected
					 */
					addPrimaryContact: function() {
						var recordId = this.get("Id");
						this.set("PrimaryContactAdded", true);
						var config = Terrasoft.configuration.ModuleStructure.Contact;
						this.openCardInChain({
							schemaName: config.cardSchema,
							operation: "add",
							primaryColumnValue: null,
							moduleId: this.sandbox.id + "_AddPrimaryContact",
							defaultValues: [{
								name: ["Account", "PrimaryContactAdd"],
								value: [recordId, true]
							}]
						});
					},

					/**
					 * Returns default values, that will be sent into new record of lookup column
					 * @overridden
					 * @param {String} columnName Column name.
					 * @return {Array} Array of default values.
					 */
					getLookupValuePairs: function(columnName) {
						var valuePairs = [];
						var column = this.getColumnByName(columnName);
						if (!this.Ext.isEmpty(column) && !this.Ext.isEmpty(column.referenceSchemaName) &&
								column.referenceSchemaName === "Contact") {
							var accountId = this.get("Id");
							if (this.isEditMode()) {
								valuePairs.push({
									name: "Account",
									value: accountId
								});
							}
						}
						return valuePairs;
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#subscribeDetailEvents
					 */
					subscribeDetailEvents: function(detailConfig, detailName) {
						this.callParent(arguments);
						var detailId = this.getDetailId(detailName);
						this.sandbox.subscribe("GetLookupValuePairs", this.getLookupValuePairs, this, [detailId]);
					},

					/**
					 * Returns account logo url.
					 * @private
					 * @return {String} Account logo url.
					 */
					getAccountLogo: function() {
						var primaryImageColumnValue = this.get(this.primaryImageColumnName);
						if (primaryImageColumnValue) {
							return this.getSchemaImageUrl(primaryImageColumnValue);
						}
						return this.getAccountDefaultLogo();
					},

					/**
					 * Returns default account logo url.
					 * @private
					 * @return {String} Default account logo url.
					 */
					getAccountDefaultLogo: function() {
						return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultLogo"));
					},

					/**
					 * Image-edit control image changed handler.
					 * @private
					 * @param {File} photo Logo file.
					 */
					onLogoChange: function(photo) {
						if (!photo) {
							this.set(this.primaryImageColumnName, null);
							return;
						}
						this.Terrasoft.ImageApi.upload({
							file: photo,
							onComplete: this.onLogoUploaded,
							onError: this.onLogoUploadError,
							scope: this
						});
					},

					onLogoUploadError: function(imageId, error, xhr) {
						if (xhr.response) {
							var response = Terrasoft.decode(xhr.response);
							if (response.error) {
								Terrasoft.showMessage(response.error);
							}
						}
					},

					/**
					 * Starts call in CTI panel.
					 * @param {String} number Phone number to call.
					 * @return {Boolean} False, to stop click event propagation.
					 */
					onCallClick: function(number) {
						return this.callAccount(number, this.$Id, this.$PrimaryContact);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "ActionsDashboardModule",
						"parentName": "ActionDashboardContainer",
						"propertyName": "items",
						"values": {
							"classes": {wrapClassName: ["actions-dashboard-module"]},
							"itemType": Terrasoft.ViewItemType.MODULE
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftModulesContainer",
						"propertyName": "items",
						"name": "ContactProfile",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE
						}
					},
					{
						"operation": "insert",
						"name": "AccountPageGeneralTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 0,
						"values": {
							"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ContactsAndStructureTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 1,
						"values": {
							"caption": {"bindTo": "Resources.Strings.ContactsAndStructureTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "RelationshipTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 2,
						"values": {
							"caption": {"bindTo": "Resources.Strings.RelationshipTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "HistoryTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 3,
						"values": {
							"caption": {"bindTo": "Resources.Strings.HistoryTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "NotesTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 4,
						"values": {
							"caption": {"bindTo": "Resources.Strings.NotesTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "CommonControlGroup",
						"parentName": "AccountPageGeneralTabContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "AccountPageGeneralInfoBlock",
						"parentName": "CommonControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": [],
							"collapseEmptyRow": true
						}
					},
					{
						"operation": "insert",
						"name": "AccountPhotoContainer",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["image-edit-container"],
							"items": [],
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "AccountPhotoContainer",
						"propertyName": "items",
						"name": "Photo",
						"values": {
							"getSrcMethod": "getAccountLogo",
							"onPhotoChange": "onLogoChange",
							"readonly": false,
							"defaultImage": {
								"bindTo": "getAccountDefaultLogo"
							},
							"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
						}
					},
					{
						"operation": "insert",
						"name": "AccountName",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Name",
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24
							}
						},
						"alias": {
							"name": "Name",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "AccountType",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Type",
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 24
							},
							"contentType": Terrasoft.ContentType.ENUM
						},
						"alias": {
							"name": "Type",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "AccountOwner",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Owner",
							"layout": {
								"column": 0,
								"row": 3,
								"colSpan": 24
							},
							"tip": {
								"content": {"bindTo": "Resources.Strings.OwnerTip"}
							}
						},
						"alias": {
							"name": "Owner",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "AccountWeb",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Web",
							"showValueAsLink": true,
							"href":  {
								"bindTo": "Web",
								"bindConfig": {converter: "getLinkValue"}
							},
							"linkclick": {
								"bindTo": "openNewTab"
							},
							"layout": {
								"column": 0,
								"row": 4,
								"colSpan": 24
							}
						},
						"alias": {
							"name": "Web",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "AccountPhone",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.PhoneEdit",
							"bindTo": "Phone",
							"showValueAsLink": {"bindTo": "isTelephonyEnabled"},
							"href":  {
								"bindTo": "Phone",
								"bindConfig": {converter: "getLinkValue"}
							},
							"linkclick": {
								"bindTo": "onCallClick"
							},
							"layout": {
								"column": 0,
								"row": 5,
								"colSpan": 24
							}
						},
						"alias": {
							"name": "Phone",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "NewAccountCategory",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "AccountCategory",
							"layout": {
								"column": 0,
								"row": 6,
								"colSpan": 24
							},
							"contentType": Terrasoft.ContentType.ENUM
						},
						"alias": {
							"name": "AccountCategory",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "AccountIndustry",
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Industry",
							"layout": {
								"column": 0,
								"row": 7,
								"colSpan": 24
							}
						},
						"alias": {
							"name": "Industry",
							"excludeProperties": ["layout"],
							"excludeOperations": ["remove", "move"]
						}
					},
					{
						"operation": "insert",
						"name": "AlternativeName",
						"parentName": "AccountPageGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "AlternativeName",
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12
							}
						}
					},
					{
						"operation": "insert",
						"name": "Code",
						"parentName": "AccountPageGeneralInfoBlock",
						"propertyName": "items",
						"values": {
							"bindTo": "Code",
							"layout": {
								"column": 12,
								"row": 0,
								"colSpan": 12
							}
						}
					},
					{
						"operation": "insert",
						"name": "CategoriesControlGroup",
						"parentName": "AccountPageGeneralTabContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.CategoriesGroupCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "AccountPageGeneralTabContainer",
						"propertyName": "items",
						"name": "Communications",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "AccountPageGeneralTabContainer",
						"propertyName": "items",
						"name": "AccountAddress",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "RelationshipTabContainer",
						"propertyName": "items",
						"name": "Relationships",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"name": "CategoriesControlGroupContainer",
						"parentName": "CategoriesControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "EmployeesNumber",
						"parentName": "CategoriesControlGroupContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "EmployeesNumber",
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12
							},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"name": "Ownership",
						"parentName": "CategoriesControlGroupContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Ownership",
							"layout": {
								"column": 12,
								"row": 0,
								"colSpan": 12
							},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"name": "AnnualRevenue",
						"parentName": "CategoriesControlGroupContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "AnnualRevenue",
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12
							},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"parentName": "HistoryTabContainer",
						"propertyName": "items",
						"name": "Activities",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "HistoryTabContainer",
						"propertyName": "items",
						"name": "EmailDetailV2",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "AccountPageGeneralTabContainer",
						"propertyName": "items",
						"name": "AccountBillingInfo",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "AccountPageGeneralTabContainer",
						"propertyName": "items",
						"name": "AccountAnniversary",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "ContactsAndStructureTabContainer",
						"propertyName": "items",
						"name": "AccountOrganizationChart",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "ContactsAndStructureTabContainer",
						"propertyName": "items",
						"name": "AccountContacts",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesTabContainer",
						"propertyName": "items",
						"name": "Files",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"name": "NotesControlGroup",
						"parentName": "NotesTabContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"items": [],
							"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"}
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesControlGroup",
						"propertyName": "items",
						"name": "Notes",
						"values": {
							"contentType": Terrasoft.ContentType.RICH_TEXT,
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"labelConfig": {
								"visible": false
							},
							"controlConfig": {
								"imageLoaded": {
									"bindTo": "insertImagesToNotes"
								},
								"images": {
									"bindTo": "NotesImagesCollection"
								}
							}
						}
					},
					{
						"operation": "move",
						"name": "Header",
						"parentName": "LeftModulesContainer",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "merge",
						"name": "Header",
						"parentName": "LeftModulesContainer",
						"values": {
							"classes": {
								"wrapClassName": ["profile-container", "autofill-layout"]
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});

define('AccountPageV2SocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2SocialNetworkIntegration", ["AccountCommunication", "ConfigurationConstants"], function(AccountCommunication,
		ConfigurationConstants) {
	return {
		messages: {
			/**
			 * @message SearchResultBySocialNetworks
			 * ######## ######### ###### ## ########## #####.
			 */
			"SearchResultBySocialNetworks": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("SearchResultBySocialNetworks", this.onSearchResultBySocialNetworks, this);
			},

			/*
			 * ############ ######## ######## ######## ####### ##### ## ###. #####.
			 * @param {Object} config.selectedItems ###### ####### ####### ####### ##### ## ###. #####.
			 */
			onSearchResultBySocialNetworks: function(config) {
				var collection = config.selectedItems;
				if (collection.isEmpty()) {
					return;
				}
				var socialContact = collection.getByIndex(0);
				this.setNameFromSocialNetworks(socialContact);
			},

			/*
			 * #### # ######## ###### #### "###" ## ############# ### ########
			 * ## ######### ###### ###### ########## ########## ######## ## ###. ####.
			 * @param {Object} socialContact ###### ########## ########## ######## ## ###. ####.
			 */
			setNameFromSocialNetworks: function(socialContact) {
				if (!this.Ext.isEmpty(this.get("Name")) || this.Ext.isEmpty(socialContact)) {
					return;
				}
				var name = socialContact.get("Name");
				if (name) {
					this.set("Name", name);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @overridden
			 */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "openSocialAccountPage",
					"Caption": {"bindTo": "Resources.Strings.FillAccountWithSocialNetworksDataActionCaption"}
				}));
				return actionMenuItems;
			},

			/**
			 * ########## ####### ###### #### "######### ####### ## ###. #####" ###### "########".
			 */
			openSocialAccountPage: function() {
				this.save({
					callback: function() {
						this.checkCanOpenSocialPage(function() {
							this.loadSocialAccountPage();
						}, this);
					},
					callBaseSilentSavedActions: true,
					isSilent: true
				});
			},

			/**
			 * #########, ######## ## ####### ## ######## ########## ######## ## ######## #######.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			checkCanOpenSocialPage: function(callback, scope) {
				this.checkHasSocialCommunications(function() {
					callback.call(scope);
				}, this);
			},

			/**
			 * #########, ########## ## ######## #####.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			checkHasSocialCommunications: function(callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: AccountCommunication
				});
				esq.addAggregationSchemaColumn(
						AccountCommunication.primaryColumnName, this.Terrasoft.AggregationType.COUNT, "Count");
				var contactFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Account", this.get("Id"));
				esq.filters.addItem(contactFilter);
				var socialTypeFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"[ComTypebyCommunication:CommunicationType:CommunicationType].Communication",
						ConfigurationConstants.Communication.SocialNetwork);
				esq.filters.addItem(socialTypeFilter);
				esq.getEntityCollection(function(response) {
					if (!response.success) {
						throw new Terrasoft.UnknownException();
					}
					var queryResult = response.collection.getByIndex(0);
					var socialCommunicationsCount = queryResult.get("Count");
					if (socialCommunicationsCount === 0) {
						var message = this.get("Resources.Strings.FillAccountQuestion");
						return this.showInformationDialog(message);
					}
					callback.call(scope);
				}, this);
			},

			/**
			 * ######### ###### ###### # ########## #####.
			 * @protected
			 */
			loadSocialAccountPage: function() {
				var schemaName = "SocialAccountPage";
				var primaryColumnValue = this.get("PrimaryColumnValue") || this.get(this.primaryColumnName);
				this.sandbox.publish("PushHistoryState", {
					hash: this.Terrasoft.combinePath("CardModuleV2", schemaName, "edit", primaryColumnValue)
				});
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define('AccountPageV2EnrichmentResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Enrichment", ["CompaniesListHelper", "EnrichmentDataModuleMixin", "css!BaseEnrichmentSchemaCSS"],
	function() {
	return {
		entitySchemaName: "Account",
		messages: {
			/**
			 * Hides enrichment data module.
			 * @message HideEnrichmentDataModule
			 */
			"HideEnrichmentDataModule": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * Returns detail id by name.
			 * @message GetDetailId
			 * @param {String} detailName Detail name.
			 */
			"GetDetailId": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * Shows enrichment data module.
			 * @message ShowEnrichmentDataModule
			 */
			"ShowEnrichmentDataModule": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {
			CompaniesListHelper: "Terrasoft.CompaniesListHelper",
			EnrichmentDataModuleMixin: "Terrasoft.EnrichmentDataModuleMixin"
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function() {
				this.mixins.CompaniesListHelper.init.call(this);
				this.mixins.EnrichmentDataModuleMixin.init.call(this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.getEnrichedDataCount(this.onGetEnrichedDataCount, this);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @overridden
			 */
			onSaved: function() {
				this.callParent(arguments);
				this.getEnrichedDataCount(this.onGetEnrichedDataCount, this);
			},

			/**
			 * Handler of the getEnrichedDataCount.
			 * @private
			 * @param {Object} response Enrichment data count response.
			 */
			onGetEnrichedDataCount: function(response) {
				if (response.success) {
					var selectResult = response.collection.getByIndex(0);
					var rowsCount = selectResult.get("Count");
					this.set("EnrichedDataCount", rowsCount);
				}
			},

			/**
			 * Gets enrichment button icon.
			 * @protected
			 * @return {Object} Icon config.
			 */
			getEnrichmentButtonIcon: function() {
				var enrichedDataCount = this.get("EnrichedDataCount");
				var buttonIcon = this.get("Resources.Images.EnrichmentDefaultIcon");
				if (enrichedDataCount) {
					buttonIcon = this.get("Resources.Images.EnrichedDefaultIcon");
				}
				return buttonIcon;
			},

			/**
			 * Gets enrichment button caption.
			 * @protected
			 * @return {String} Button caption.
			 */
			getEnrichmentButtonCaption: function() {
				var enrichedDataCount = this.get("EnrichedDataCount");
				var buttonCaption = this.get("Resources.Strings.EnrichmentDefaultButtonCaption");
				if (enrichedDataCount) {
					var buttonCaptionTemplate = this.get("Resources.Strings.EnrichedDefaultButtonCaption");
					buttonCaption = this.Ext.String.format(buttonCaptionTemplate, enrichedDataCount);
				}
				return buttonCaption;
			},

			/**
			 * Gets enrichment button hint.
			 * @protected
			 * @return {String} Button hint
			 */
			getEnrichmentButtonHint: function() {
				var enrichedDataCount = this.get("EnrichedDataCount");
				var buttonHint = this.get("Resources.Strings.EnrichmentDefaultButtonHint");
				if (enrichedDataCount) {
					buttonHint = this.get("Resources.Strings.EnrichedDefaultButtonHint");
				}
				return buttonHint;
			},

			/**
			 * @inheritdoc Terrasoft.EnrichmentDataModuleMixin#getEnrichedDataCountEsq
			 * @overridden
			 */
			getEnrichedDataCountEsq: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "AccountEnrichedData"
				});
				esq.addAggregationSchemaColumn("Id",
						this.Terrasoft.AggregationType.COUNT, "Count");
				esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Account", this.get(this.primaryColumnName)));
				var notExistsFilter = this.Terrasoft.createNotExistsFilter(
						"[AccountCommunication:Number:Value].Id");
				var subFilter = esq.createFilter(Terrasoft.ComparisonType.EQUAL,
						"[AccountCommunication:Account:Account].Account", "Account");
				notExistsFilter.subFilters.addItem(subFilter);
				esq.filters.addItem(notExistsFilter);
				return esq;
			}
		},
		attributes: {
			"Name": {
				"contentType": this.Terrasoft.ContentType.SEARCHABLE_TEXT,
				"searchableTextConfig": {
					"listAttribute": "CompaniesList",
					"prepareListMethod": "prepareCompaniesExpandableList",
					"listViewItemRenderMethod": "onCompaniesListViewItemRender",
					"itemSelectedMethod": "onCompanyItemSelected"
				}
			},
			/**
			 * Enrichment data count.
			 * @type {Integer}
			 */
			"EnrichedDataCount": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				value: 0
			},
			/**
			 * Enrichment operation code.
			 * @type {String}
			 */
			"EnrichmentOperationCode": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: "CanEnrichAccountData"
			}
		},
		modules: {
			"EnrichmentModule": {
				"config": {
					"schemaName": "AccountEnrichmentSchema",
					"isSchemaConfigInitialized": true,
					"useHistoryState": false,
					"parameters": {
						"viewModelConfig": {
							"AlignToElId": "EnrichmentButtonContainer",
							"PrimaryColumnName": "Id"
						}
					}
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "EnrichmentModuleContainer",
				"parentName": "AccountPhotoContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {
						"bindTo": "IsEnrichmentModuleVisible"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EnrichmentModule",
				"parentName": "EnrichmentModuleContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"name": "EnrichmentButtonContainer",
				"parentName": "AccountPhotoContainer",
				"propertyName": "items",
				"values": {
					"id": "EnrichmentButtonContainer",
					"selectors": {
						"wrapEl": "#EnrichmentButtonContainer"
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["enrichment-button-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "EnrichmentButtonContainer",
				"name": "EnrichmentActionButton",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {"bindTo": "getEnrichmentButtonIcon"},
					"caption": {"bindTo": "getEnrichmentButtonCaption"},
					"hint": {"bindTo": "getEnrichmentButtonHint"},
					"classes": {
						"wrapperClass": ["enrichment-action-button"]
					},
					"click": {"bindTo": "loadEnrichmentModule"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('AccountPageV2LeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Lead", [],
	function() {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/{
				Leads: {
					schemaName: "LeadDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "QualifiedAccount"
					},
					useRelationship: true
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HistoryTabContainer",
					"propertyName": "items",
					"name": "Leads",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('AccountPageV2InvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Invoice", ["BaseFiltersGenerateModule", "ConfigurationEnums", "DuplicatesSearchUtilitiesV2"],
	function(BaseFiltersGenerateModule, Enums) {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/{
				Invoice: {
					schemaName: "InvoiceDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					useRelationship: true
				}
			}/**SCHEMA_DETAILS*/,
			methods: {
				/**
				 * ############## ######### ######## ######
				 * @protected
				 * @virtual
				 */
				init: function() {
					this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HistoryTabContainer",
					"propertyName": "items",
					"name": "Invoice",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('AccountPageV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Order", [],
	function() {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/{
				Order: {
					schemaName: "OrderDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					useRelationship: true
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HistoryTabContainer",
					"propertyName": "items",
					"name": "Order",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('AccountPageV2DocumentResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Document", [],
	function() {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/{
				Documents: {
					schemaName: "DocumentDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					useRelationship: true
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HistoryTabContainer",
					"propertyName": "items",
					"name": "Documents",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('AccountPageV2CTIBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2CTIBase", [],
function() {
	return {
		entitySchemaName: "Account",
		messages: {
			/**
			 * @message HistoryTabDeactivated
			 * ######## # ########### ####### "#######".
			 * @param {String} tabName ######## #######.
			 */
			"HistoryTabDeactivated": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BasePageV2#activeTabChange
			 * @overridden
			 */
			activeTabChange: function() {
				var tabName = this.get("ActiveTabName");
				if (tabName === "HistoryTabContainer") {
					var detailId = this.getDetailId("Calls");
					this.sandbox.publish("HistoryTabDeactivated", null, [detailId]);
				}
				this.callParent(arguments);
			}
		},
		details: /**SCHEMA_DETAILS*/{
			Calls: {
				schemaName: "CallDetail",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "HistoryTabContainer",
				"index": 1,
				"propertyName": "items",
				"name": "Calls",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('AccountPageV2CoreContractsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2CoreContracts", [],
		function() {
			return {
				entitySchemaName: "Account",
				details: /**SCHEMA_DETAILS*/{
					Contract: {
						schemaName: "ContractDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Account"
						},
						useRelationship: true
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "HistoryTabContainer",
						"propertyName": "items",
						"name": "Contract",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});

define('AccountPageV2CompletenessResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Completeness", ["ConfigurationConstants", "CompletenessMixin",
		"ConfigurationRectProgressBarGenerator", "CompletenessIndicator", "css!CompletenessCSSV2", "TooltipUtilities"
	],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Account",
			attributes: {
				CompletenessValue: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0
				},
				MissingParametersCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				}
			},
			mixins: {
				CompletenessMixin: "Terrasoft.CompletenessMixin",
				TooltipUtilitiesMixin: "Terrasoft.TooltipUtilities"
			},
			details: {
				Communications: {
					schemaName: "AccountCommunicationDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					completeness: {
						isTyped: true,
						typeColumn: "CommunicationType",
						typeSchemaName: "CommunicationType"
					}
				},
				AccountAddress: {
					schemaName: "AccountAddressDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					completeness: {
						isTyped: true,
						typeColumn: "AddressType",
						typeSchemaName: "AddressType"
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					completeness: {
						isTyped: false,
						typeColumn: "Type",
						typeValue: ConfigurationConstants.Activity.Type.Email
					}
				},
				Activities: {
					schemaName: "ActivityDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					},
					completeness: {
						isTyped: false,
						typeColumn: "Type",
						typeValue: ConfigurationConstants.Activity.Type.Task
					}
				}
			},
			diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"parentName": "AccountPhotoContainer",
				"propertyName": "items",
				"name": "AccountCompletenessContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["completeness-container"]},
					"items": []
				},
				"alias": {
					"name": "CompletenessContainer",
					"excludeProperties": ["layout"],
					"excludeOperations": ["remove", "move"]
				}
			},
			{
				"operation": "insert",
				"parentName": "AccountCompletenessContainer",
				"propertyName": "items",
				"name": "CompletenessValue",
				"values": {
					"generator": "ConfigurationRectProgressBarGenerator.generateProgressBar",
					"controlConfig": {
						"value": {
							"bindTo": "CompletenessValue"
						},
						"menu": {
							"items": {
								"bindTo": "MissingParametersCollection"
							}
						},
						"sectorsBounds": {
							"bindTo": "CompletenessSectorsBounds"
						}
					},
					"tips": []
				}
			},
			{
				"operation": "insert",
				"parentName": "CompletenessValue",
				"propertyName": "tips",
				"name": "CompletenessTip",
				"values": {
					"content": {"bindTo": "Resources.Strings.CompletenessHint"}
				}
			}] /**SCHEMA_DIFF*/,
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 */
				init: function() {
					this.set("MissingParametersCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onDetailChanged
				 */
				onDetailChanged: function() {
					this.callParent(arguments);
					this.calculateCompleteness();
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					if (this.isEditMode()) {
						var collection = this.get("MissingParametersCollection");
						collection.clear();
						this.set("CompletenessValue", 0);
						this.calculateCompleteness();
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 */
				onSaved: function() {
					this.callParent(arguments);
					if (!this.isNewMode() && !this.get("IsProcessMode")) {
						this.calculateCompleteness();
					}
				},

				/**
				 * Starts calculation of the completeness of the data content.
				 * @protected
				 */
				calculateCompleteness: function() {
					var config = {
						recordId: this.get("Id"),
						schemaName: this.entitySchemaName
					};
					this.mixins.CompletenessMixin.getCompleteness.call(this, config, this.calculateCompletenessResponce, this);
				},

				/**
				 * Handles the response from mixin calculation completeness.
				 * @protected
				 * @param {Object} completenessResponce Response from mixin calculation completeness.
				 */
				calculateCompletenessResponce: function(completenessResponce) {
					if (this.Ext.isEmpty(completenessResponce)) {
						return;
					}
					var missingParametersCollection = completenessResponce.missingParametersCollection;
					var completeness = completenessResponce.completenessValue;
					var scale = completenessResponce.scale;
					if (!this.Ext.isEmpty(missingParametersCollection)) {
						var collection = this.get("MissingParametersCollection");
						collection.clear();
						collection.loadAll(missingParametersCollection);
					}
					if (this.Ext.isObject(scale) && this.Ext.isArray(scale.sectorsBounds)) {
						this.set("CompletenessSectorsBounds", scale.sectorsBounds);
					}
					if (this.Ext.isNumber(completeness)) {
						this.set("CompletenessValue", completeness);
					}
				}
			}
		};
	}
);

define('AccountPageV2SSPResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2SSP", [],
	function() {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/{
				"PortalUserInOrganization": {
					"schemaName": "PortalUserInOrganizationDetail",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "PortalAccount"
					}
				}
			}/**SCHEMA_DETAILS*/,
			methods: {

				_getIsPortalUserManagementV2Enabled: function() {
					return this.getIsFeatureEnabled("PortalUserManagementV2");
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onDetailChanged
				 * @overridden
				 */
				onDetailChanged: function(config) {
					this.callParent(arguments);
					if (!this.Ext.isEmpty(config)) {
						switch (config.schemaName){
							case "AccountContactsDetailV2":
								this.updatePortalUserInOrganizationDetail(config);
								break;
							case "PortalUserInOrganizationDetail":
								this.updateAccountContactsDetail(config);
								break;
						}
					}
				},

				/**
				 * Updates PortalUserInOrganization detail.
				 */
				updatePortalUserInOrganizationDetail: function() {
					const detailName = "PortalUserInOrganization";
					const detail = this.details[detailName];
					detail.detail = detail.detail || detailName;
					this.updateDetail(detail);
				},

				/**
				 * Updates AccountContacts detail.
				 */
				updateAccountContactsDetail: function() {
					const detailName = "AccountContacts";
					const detail = this.details[detailName];
					detail.detail = detail.detail || detailName;
					this.updateDetail(detail);
				},

				//TODO remove after closed SD-5844
				updateDetail: function(detailConfig) {
					this.callParent([detailConfig]);
					if (detailConfig && detailConfig.detail === "PortalUserInOrganization") {
						if (detailConfig.containerId) {
							let view = this.Ext.get(detailConfig.containerId);
							if (view) {
								view = this.Ext.get(view.getAttribute("data-item-marker"));
								if (view) {
									view.destroy();
								}
							}
							this.sandbox.loadModule("DetailModuleV2", {
								renderTo: detailConfig.containerId,
								id: this.getDetailId(detailConfig.detailName)
							});
						}
					}
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "PortalUserInOrganization",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "_getIsPortalUserManagementV2Enabled"}
					},
					"parentName": "ContactsAndStructureTabContainer",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('AccountPageV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Opportunity", [], function() {
	return {
		entitySchemaName: "Account",
		details: /**SCHEMA_DETAILS*/{
			Opportunities: {
				schemaName: "OpportunityDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				},
				useRelationship: true
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "HistoryTabContainer",
				"propertyName": "items",
				"name": "Opportunities",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('AccountPageV2ProjectResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2Project", function() {
	return {
		entitySchemaName: "Account",
		details: /**SCHEMA_DETAILS*/{
			Project: {
				schemaName: "ProjectDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				},
				useRelationship: true
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"index": 7,
				"parentName": "HistoryTabContainer",
				"propertyName": "items",
				"name": "Project",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('AccountPageV2PRMBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2PRMBase", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/ {
				Partnerships: {
					schemaName: "PartnershipDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Account"
					}
				}
			} /**SCHEMA_DETAILS*/ ,
			methods: {

				/**
				 * Indicates visibility of Partnership detail.
				 * @returns {boolean} True if detail visible.
				 */
				isPartnershipsDetailVisible: function () {
					const type = this.$Type && this.$Type.value;
					return type === ConfigurationConstants.AccountType.Partner.toLowerCase();
				}
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"parentName": "HistoryTabContainer",
				"index": 0,
				"propertyName": "items",
				"name": "Partnerships",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL,
					"visible": { "bindTo": "isPartnershipsDetailVisible" }
				}
			}] /**SCHEMA_DIFF*/ ,
			rules: {}
		};
	});

define('AccountPageV2SalesEnterpriseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountPageV2SalesEnterprise", [], function() {
	return {
		entitySchemaName: "Account",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "Campaigns"
			},
			{
				"operation": "move",
				"parentName": "HistoryTabContainer",
				"propertyName": "items",
				"name": "Activities",
				"index": 0
			},
			{
				"operation": "move",
				"parentName": "HistoryTabContainer",
				"propertyName": "items",
				"name": "Contract",
				"index": 1
			},
			{
				"operation": "move",
				"parentName": "HistoryTabContainer",
				"propertyName": "items",
				"name": "Documents",
				"index": 7
			}
		]/**SCHEMA_DIFF*/
	};
});

define("AccountPageV2", [],
function() {
	return {
		entitySchemaName: "Account",
		details: /**SCHEMA_DETAILS*/{
			Cases: {
				schemaName: "CaseDetail",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "HistoryTabContainer",
				"index": 0,
				"propertyName": "items",
				"name": "Cases",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/,
		attributes: {},
		methods: {},
		rules: {},
		userCode: {}
	};
});


