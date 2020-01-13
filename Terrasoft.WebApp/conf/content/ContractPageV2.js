Terrasoft.configuration.Structures["ContractPageV2"] = {innerHierarchyStack: ["ContractPageV2CoreContracts", "ContractPageV2SalesContracts", "ContractPageV2DocumentInContract", "ContractPageV2ContractInOrder", "ContractPageV2"], structureParent: "BaseModulePageV2"};
define('ContractPageV2CoreContractsStructure', ['ContractPageV2CoreContractsResources'], function(resources) {return {schemaUId:'948080fc-031e-4d88-9239-47bcedaa92bc',schemaCaption: "Section edit page schema - \"Contracts\"", parentSchemaName: "BaseModulePageV2", schemaName:'ContractPageV2CoreContracts',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractPageV2SalesContractsStructure', ['ContractPageV2SalesContractsResources'], function(resources) {return {schemaUId:'025b9545-1576-4fbb-b987-9a108cc30581',schemaCaption: "Section edit page schema - \"Contracts\"", parentSchemaName: "ContractPageV2CoreContracts", schemaName:'ContractPageV2SalesContracts',parentSchemaUId:'948080fc-031e-4d88-9239-47bcedaa92bc',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContractPageV2CoreContracts",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractPageV2DocumentInContractStructure', ['ContractPageV2DocumentInContractResources'], function(resources) {return {schemaUId:'136507e4-4780-47cb-8f15-f3aae0672251',schemaCaption: "Section edit page schema - \"Contracts\"", parentSchemaName: "ContractPageV2SalesContracts", schemaName:'ContractPageV2DocumentInContract',parentSchemaUId:'025b9545-1576-4fbb-b987-9a108cc30581',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContractPageV2SalesContracts",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractPageV2ContractInOrderStructure', ['ContractPageV2ContractInOrderResources'], function(resources) {return {schemaUId:'545956d1-7e2a-4caa-bf17-a31e240325f4',schemaCaption: "Section edit page schema - \"Contracts\"", parentSchemaName: "ContractPageV2DocumentInContract", schemaName:'ContractPageV2ContractInOrder',parentSchemaUId:'136507e4-4780-47cb-8f15-f3aae0672251',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContractPageV2DocumentInContract",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractPageV2Structure', ['ContractPageV2Resources'], function(resources) {return {schemaUId:'7aca8fd1-ff4d-4d7b-a660-164557e10783',schemaCaption: "Section edit page schema - \"Contracts\"", parentSchemaName: "ContractPageV2ContractInOrder", schemaName:'ContractPageV2',parentSchemaUId:'545956d1-7e2a-4caa-bf17-a31e240325f4',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContractPageV2ContractInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractPageV2CoreContractsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContractPageV2CoreContracts", ["terrasoft", "GeneralDetails", "BusinessRuleModule", "ConfigurationConstants",
		"RightUtilities", "VisaHelper", "css!VisaHelper"],
	function(Terrasoft, GeneralDetails, BusinessRuleModule, ConfigurationConstants, RightUtilities, VisaHelper) {
		return {
			entitySchemaName: "Contract",
			details: /**SCHEMA_DETAILS*/{
				"Activities": {
					"schemaName": "ActivityDetailV2",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Contract"
					},
					"defaultValues": {
						Contract: {
							masterColumn: "Id"
						},
						Account: {
							masterColumn: "Account"
						},
						Contact: {
							masterColumn: "Contact"
						}
					}
				},
				"Files": {
					"schemaName": "FileDetailV2",
					"entitySchemaName": "ContractFile",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Contract"
					}
				},
				"SubordinateContracts": {
					"schemaName": "ContractDetailV2",
					"entitySchemaName": "Contract",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Parent"
					},
					defaultValues: {
						Account: {
							masterColumn: "Account"
						},
						Contact: {
							masterColumn: "Contact"
						},
						CustomerBillingInfo: {
							masterColumn: "CustomerBillingInfo"
						},
						OurCompany: {
							masterColumn: "OurCompany"
						},
						SupplierBillingInfo: {
							masterColumn: "SupplierBillingInfo"
						}
					}
				},
				Visa: {
					schemaName: "VisaDetailV2",
					entitySchemaName: "ContractVisa",
					filter: {
						masterColumn: "Id",
						detailColumn: "Contract"
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Contract"
					},
					filterMethod: "emailDetailFilter"
				}
			}/**SCHEMA_DETAILS*/,
			attributes: {
				"State": {
					lookupListConfig: {
						orders: [{columnPath: "Position"}]
					}
				},
				"Parent": {
					name: "Parent",
					dependencies: [
						{
							columns: ["Account", "OurCompany"],
							methodName: "clearParent"
						}
					]
				},

				/**
				 * ######### ######### #######
				 */
				"CustomerBillingInfo": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					dependencies: [
						{
							columns: ["Account"],
							methodName: "clearBillingInfo"
						}
					],
					lookupListConfig: {
						filter: function() {
							var account = this.get("Account");
							account = account && account.value;
							var filters = this.Terrasoft.createFilterGroup();
							filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
							filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, "Account", account));
							var filtersRelation = this.Terrasoft.createFilterGroup();
							filtersRelation.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"[VwAccountRelationship:RelatedAccount:Account].RelationType",
								ConfigurationConstants.RelationType.HeadCompany));
							filtersRelation.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"[VwAccountRelationship:RelatedAccount:Account].Account",
								account));
							filters.addItem(filtersRelation);
							return filters;
						}
					}
				},

				/**
				 * ######### ######### ##### ########
				 */
				"SupplierBillingInfo": {
					dependencies: [
						{
							columns: ["OurCompany"],
							methodName: "clearBillingInfo"
						}
					]
				}
			},
			methods: {
				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					if ((this.isAddMode() && this.Ext.isEmpty(this.get("Number"))) || this.isCopyMode()) {
						this.getIncrementCode(function(response) {
							this.set("Number", response);
						});
					}
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				getActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": VisaHelper.resources.localizableStrings.SendToVisaCaption,
						"Tag": VisaHelper.SendToVisaMenuItem.methodName,
						"Enabled": {"bindTo": "canEntityBeOperated"}
					}));
					return actionMenuItems;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getUpdateDetailOnSavedConfig
				 * @overridden
				 */
				getUpdateDetailOnSavedConfig: function() {
					var updateConfig = {};
					var parentAccountValue = this.getParentAccountValue();
					var currentAccount = this.get("Account");
					if (parentAccountValue && currentAccount &&
							parentAccountValue !== currentAccount.value) {
						updateConfig.reloadAll = true;
					} else {
						updateConfig.primaryColumnValue = this.get(this.primaryColumnName);
					}
					return updateConfig;
				},

				/**
				 * Returns parent account value.
				 * @private
				 * @return {Guid} Parent account value.
				 */
				getParentAccountValue: function() {
					var result = null;
					var defaultValues = this.get("DefaultValues");
					if (this.isNotEmpty(defaultValues)) {
						var parentAccount = this.Terrasoft.findItem(defaultValues, {name: "Account"});
						if (parentAccount && parentAccount.item) {
							var account = parentAccount.item;
							result = account.value;
						}
					}
					return result;
				},

				/**
				 * Sends current record to sighting.
				 */
				sendToVisa: VisaHelper.SendToVisaMethod,

				/**
				 * Validates number column value.
				 */
				validateUniqueNumber: function(callback, scope) {
					var number = this.get("Number");
					var result = {
						success: true
					};
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Number)) {
						callback.call(scope || this, result);
					} else {
						var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: this.entitySchemaName
						});
						select.addColumn("Number");
						select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Number", number));
						select.getEntityCollection(function(response, scope) {
							if (response.success) {
								if (response.collection.getCount() > 0) {
									result.message = this.get("Resources.Strings.NumberMustBeUnique");
									result.success = false;
								}
							} else {
								return;
							}
							callback.call(scope || this, result);
						}, scope);
					}
				},

				/**
				 * Validates end date column value.
				 * @param {Object} column End date column value.
				 */
				validateEndDate: function(column) {
					var invalidMessage = "";
					if (!this.Ext.isEmpty(column) && this.get("StartDate") > column) {
						invalidMessage = this.get("Resources.Strings.DueDateLowerStartDate");
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				},

				/**
				 * ######## ######### "#### ######" # "#### ##########".
				 * "#### ##########" ###### #### ######/##### "#### ######".
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("EndDate", this.validateEndDate);
				},

				/**
				 * ######### ######## ######## ###### #############.
				 * @protected
				 * @overridden
				 * @param {Function} callback callback-#######
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						Terrasoft.chain(
							function(next) {
								this.validateUniqueNumber(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
							function(next) {
								callback.call(scope, response);
								next();
							}, this);
					}, this]);
				},

				/**
				 * Cleanes field "Parent".
				 */
				clearParent: function() {
					this.set("Parent", "");
				},

				/**
				 * ######## ######## ######### ########## ##### ######## ### #######
				 * @protected
				 */
				clearBillingInfo: function(argument, field) {
					var changedValue = this.changedValues[field];
					var fieldValue = this.get(field) !== null ? this.get(field).value : {};
					if (changedValue && changedValue.value !== fieldValue) {
						if (field === "Account") {
							this.set("CustomerBillingInfo", null);
						}
						if (field === "OurCompany") {
							this.set("SupplierBillingInfo", null);
						}
					}
				},

				/**
				 * ### ######## Account ######### ######## (##### ##### ########) ########## ###### # ######
				 * ##### ############### ######## ####### ########## ## ############# ## ######### ########
				 * @inheritdoc Terrasoft.BaseViewModel#set
				 * @overriden
				 */
				set: function(key, value) {
					if (key === "Account") {
						var currentValue = this.get(key);
						var currentValueId = currentValue ? currentValue.value : "";
						var valueId = value ? value.value : "";
						if (currentValueId === valueId) {
							return;
						}
					}
					this.callParent(arguments);
				},

				/**
				 * Creates filter for detail Email.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Group filters.
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("ContractNotNull", this.Terrasoft.createColumnIsNotNullFilter("Contract"));
					filterGroup.add("ContractConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Contract", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "Number",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Number",
						"textSize": 0,
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Owner",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OwnerTip"}
						},
						"bindTo": "Owner",
						"enabled": true
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "StartDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "StartDate",
						"textSize": 0,
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "Type",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Type",
						"textSize": 0,
						"contentType": this.Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "EndDate",
					"values": {
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "EndDate",
						"textSize": 0,
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "State",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "State",
						"textSize": 0,
						"contentType": this.Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 5
				},
				{
					"operation": "insert",
					"name": "GeneralInfoTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.GeneralInfoTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "group",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.groupCaption"
						},
						"items": [],
						"controlConfig": {
							"collapsed": false
						}
					},
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "group_gridLayout",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "group",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Account",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Account",
						"enabled": true
					},
					"parentName": "group_gridLayout",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CustomerBillingInfo",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.CustomerBillingInfoTip"}
						},
						"bindTo": "CustomerBillingInfo",
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": true
					},
					"parentName": "group_gridLayout",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Contact",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Contact",
						"enabled": true
					},
					"parentName": "group_gridLayout",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "OurCompany",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "OurCompany",
						"textSize": "Default",
						"contentType": this.Terrasoft.ContentType.LOOKUP,
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"parentName": "group_gridLayout",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "SupplierBillingInfo",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.SupplierBillingInfoTip"}
						},
						"bindTo": "SupplierBillingInfo",
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": true
					},
					"parentName": "group_gridLayout",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "ContractConnectionsGroup",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.ContractConnectionsGroupCaption"
						},
						"controlConfig": {
							"collapsed": false
						}
					},
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "ContractConnectionsBlock",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "ContractConnectionsGroup",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Parent",
					"values": {
						"bindTo": "Parent",
						"layout": {
							"column": 0,
							"row": 0
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.ParentTip"}
						}
					},
					"parentName": "ContractConnectionsBlock",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "NotesAndFilesTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.NotesAndFilesTab"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "Files",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "NotesAndFilesTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ContractNotesControlGroup",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.NotesGroupCaption"
						},
						"controlConfig": {
							"collapsed": false
						}
					},
					"parentName": "NotesAndFilesTab",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Notes",
					"values": {
						"contentType": this.Terrasoft.ContentType.RICH_TEXT,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
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
					},
					"parentName": "ContractNotesControlGroup",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HistoryTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.HistoryTab"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Activities",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "HistoryTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "EmailDetailV2",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "SubordinateContracts",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "ContractVisaTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ContractVisaTabCaption"},
						"items": []
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "ContractVisaTab",
					"name": "ContractPageVisaTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ContractVisaTab",
					"propertyName": "items",
					"name": "Visa",
					"lableConfig": {"visible": false},
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "ContractPageVisaTabContainer",
					"propertyName": "items",
					"name": "ContractPageVisaBlock",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"OurCompany": {
					"FiltrationByType": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": false,
						"baseAttributePatch": "Type",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.CONSTANT,
						"value": ConfigurationConstants.AccountType.OurCompany
					}
				},
				"Parent": {
					"FiltrationParentByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "Account",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"FiltrationParentBySupplier": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "OurCompany",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "OurCompany"
					},
					"FiltrationParentByParent": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": false,
						"baseAttributePatch": "Id",
						"comparisonType": this.Terrasoft.ComparisonType.NOT_EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Id"
					}
				},
				"SupplierBillingInfo": {
					"FiltrationSupplierBillingByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"baseAttributePatch": "Account",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "OurCompany"
					},
					"BindParameterEnabledSupplierBillingInfoToSupplier": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "OurCompany"
								},
								"comparisonType": Terrasoft.ComparisonType.IS_NOT_NULL
							}
						]
					}
				},
				"CustomerBillingInfo": {
					"BindParameterEnabledCustomerBillingInfoToAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Account"
								},
								"comparisonType": Terrasoft.ComparisonType.IS_NOT_NULL
							}
						]
					}
				},
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			}
		};
	});

define('ContractPageV2SalesContractsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContractPageV2SalesContracts", ["MoneyModule", "BusinessRuleModule", "ConfigurationConstants", "ConfigurationEnums",
		"LookupUtilities", "MultiCurrencyEdit", "MultiCurrencyEditUtilities", "EntityProductCountMixin"],
	function(MoneyModule, BusinessRuleModule, ConfigurationConstants, enums, LookupUtilities) {
		return {
			entitySchemaName: "Contract",
			messages: {
				/**
				 * @message CalcAmount
				 * ######## ######## # ############# ######### #####.
				 */
				"CalcAmount": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {

				/**
				 * ###### ########## ################# # ######## ##############.
				 */
				MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities",

				/**
				 * Mixin for products count by entity.
				 */
				EntityProductCountMixin: "Terrasoft.EntityProductCountMixin"
			},
			details: /**SCHEMA_DETAILS*/{
				"SubordinateContracts": {
					"schemaName": "ContractDetailV2",
					"entitySchemaName": "Contract",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Parent"
					},
					defaultValues: {
						Account: {
							"masterColumn": "Account"
						},
						Contact: {
							"masterColumn": "Contact"
						},
						CustomerBillingInfo: {
							"masterColumn": "CustomerBillingInfo"
						},
						OurCompany: {
							"masterColumn": "OurCompany"
						},
						SupplierBillingInfo: {
							"masterColumn": "SupplierBillingInfo"
						},
						Type: {
							"masterColumn": "DefaultType"
						},
						Order: {
							"masterColumn": "Order"
						}
					}
				}
			}/**SCHEMA_DETAILS*/,
			attributes: {
				/**
				 * ### ## #########.
				 */
				"DefaultType": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.DataValueType.LOOKUP
				},
				/**
				 * ######.
				 */
				"Currency": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {
						"columns": ["Division"]
					}
				},
				/**
				 * ####.
				 */
				"CurrencyRate": {
					"dataValueType": this.Terrasoft.DataValueType.FLOAT,
					"dependencies": [
						{
							"columns": ["Currency"],
							"methodName": "setCurrencyRate"
						}
					]
				},
				/**
				 * Currency button menu list.
				 */
				"CurrencyButtonMenuList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: this.Ext.create("Terrasoft.BaseViewModelCollection")
				},
				/**
				 * Currency rate list.
				 */
				"CurrencyRateList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: this.Ext.create("Terrasoft.Collection")
				},
				/**
				 * #####.
				 */
				"Amount": {
					"dataValueType": this.Terrasoft.DataValueType.FLOAT,
					"dependencies": [
						{
							"columns": ["CurrencyRate", "Currency"],
							"methodName": "recalculateAmount"
						}
					]
				},
				/**
				 * ##### # #.#.
				 */
				"PrimaryAmount": {
					"dependencies": [
						{
							"columns": ["Amount"],
							"methodName": "recalculatePrimaryAmount"
						}
					]
				},
				/**
				 * ############ #######.
				 */
				"Parent": {
					"dependencies": [
						{
							"columns": ["Type"],
							"methodName": "parentChanged"
						}
					]
				},
				/**
				 * ###.
				 */
				"Type": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {
						"columns": ["IsSlave"]
					}
				},
				/**
				 * ###########.
				 */
				"CheckSlave": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * ########### ############## ####.
				 */
				"CanAmountEdit": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": true
				},
				/**
				 * ########## ######### # ####### ########.
				 */
				"ProductsCount": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.INTEGER
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "group",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.groupCaption"
						},
						"controlConfig": {
							"collapsed": false
						}
					},
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "merge",
					"name": "StartDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "StartDate",
						"labelConfig": {
							"visible": true
						},
						"enabled": true
					},
					"dependencies": [
						{
							"columns": ["StartDate"],
							"methodName": "onDataAttributeChange"
						}
					],
					"parentName": "Header",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"name": "ContractSumGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.ContractSumCaption"
						},
						"controlConfig": {
							"collapsed": false
						},
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "ContractSumGroup",
					"propertyName": "items",
					"name": "ContractSumBlock",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ContractSumBlock",
					"propertyName": "items",
					"name": "Amount",
					"values": {
						"bindTo": "Amount",
						"layout": {"column": 0, "row": 0},
						"primaryAmount": "PrimaryAmount",
						"currency": "Currency",
						"rate": "CurrencyRate",
						"primaryAmountEnabled": false,
						"enabled": {"bindTo": "CanAmountEdit"},
						"generator": "MultiCurrencyEditViewGenerator.generate",
						"tip": {
							"content": {"bindTo": "Resources.Strings.AmountTip"}
						}
					}
				},
				{
					"operation": "merge",
					"name": "Parent",
					"values": {
						"bindTo": "Parent",
						"layout": {
							"column": 0,
							"row": 0
						},
						"controlConfig": {
							"enabled": {"bindTo": "CheckSlave"}
						}
					},
					"parentName": "ContractConnectionsBlock",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "merge",
					"name": "SubordinateContracts",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "merge",
					"name": "Type",
					"values": {
						"enabled": {"bindTo": "canChange"}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 3
				}
			]/**SCHEMA_DIFF*/,
			properties: {
				moneyModule: null
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.sandbox.subscribe("CalcAmount", this.calcAmount, this);
					this.moneyModule = MoneyModule;
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.EntityProductCountMixin#getEntityProductSchemaName
				 * @overridden
				 */
				getEntityProductSchemaName: function() {
					return "OrderProduct";
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#loadEntity
				 * @overriden
				 */
				loadEntity: function(primaryColumnValue, callback, scope) {
					scope = scope || this;
					this.callParent([primaryColumnValue, function() {
						this.setProductCount(primaryColumnValue, callback, scope);
					}, scope]);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.setDefaultType();
					if (this.get("Amount") > 0 && this.get("ProductsCount") > 0) {
						this.set("CanAmountEdit", false);
					}
					this.recalculateAmount();
					this.callParent(arguments);
					this.mixins.MultiCurrencyEditUtilities.init.call(this);
				},

				/**
				 * Sets default contract type value.
				 */
				setDefaultType: function() {
					this.set("DefaultType",
						{
							value: ConfigurationConstants.ContractType.SubAgreement,
							displayValue: ""
						});
					this.parentChanged("", "Type");
				},

				/**
				 * ######### ######## ###### ## ###########.
				 * @override
				 * @param {Object} args #########.
				 * @param {Object} tag ###.
				 */
				loadVocabulary: function(args, tag) {
					var config = this.getLookupPageConfig(args, tag);
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					if (tag === "Parent") {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
						filterGroup.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL,
							"Parent", this.get("Id")));
						filterGroup.addItem(this.Terrasoft.createColumnIsNullFilter("Parent"));
						config.filters.addItem(filterGroup);
						config.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Type.IsSlave", false));
					}
					LookupUtilities.Open(this.sandbox, config, this.onLookupResult, this, null, false, false);
				},

				/**
				* ########## ########## ###### ######## ######## ####.
				* @private
				*/
				onDataAttributeChange: function() {
					var currency = this.get("Currency");
					this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", function(primaryCurrency) {
						if (currency) {
							if (currency.value !== primaryCurrency.value && !Ext.isEmpty(this.get("StartDate")) &&
									!Ext.isEmpty(currency.value)) {
								this.showConfirmationDialog(this.get("Resources.Strings.CurrencyRateDateQuestion"),
										function(returnCode) {
											if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
												this.setCurrencyRate();
											}
										}, ["yes", "no"]);
							} else {
								this.setCurrencyRate();
							}
						}
					}, this);
				},

				/**
				 * ######### ######### #### ### ######## ########.
				 * @private
				 */
				canChange: function() {
					var cardState = this.get("Operation");
					if (this.get("Type")) {
						var isSlave = this.get("Type").IsSlave;
						var edit = (cardState === enums.CardStateV2.EDIT);
						if (edit && !isSlave) {
							return false;
						} else {
							return true;
						}
					}
				},

				/**
				* ############# #### ######.
				* @private
				*/
				setCurrencyRate: function() {
					this.moneyModule.LoadCurrencyRate.call(this, "Currency", "CurrencyRate", this.get("StartDate"));
				},

				/**
				 * ############# #####.
				 * @private
				 */
				recalculateAmount: function() {
					var currency = this.get("Currency");
					var division = currency ? currency.Division : null;
					this.moneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
				},

				/**
				* ############# ##### #.#.
				* @private
				*/
				recalculatePrimaryAmount: function() {
					var currency = this.get("Currency");
					var division = currency ? currency.Division : null;
					this.moneyModule.RecalcBaseValue.call(this, "CurrencyRate", "Amount", "PrimaryAmount", division);
				},

				/**
				* ###### ######### "############# ########" # ########### ## ########## ####.
				* @private
				*/
				parentChanged: function() {
					var type = this.get("Type");
					var isSlave = type && type.IsSlave;
					if (isSlave === false || ((isSlave === undefined) && (this.get("IsEntityInitialized") === false))) {
						this.set("CheckSlave", false);
						this.clearParent();
					} else {
						this.set("CheckSlave", true);
					}
				},

				/**
				 * ############# ##### # ########### ## #########.
				 */
				calcAmount: function(callback, scope) {
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "OrderProduct"
					});
					select.addAggregationSchemaColumn("TotalAmount", Terrasoft.AggregationType.SUM, "TotalAmountSum");
					select.addAggregationSchemaColumn("TotalAmount", Terrasoft.AggregationType.COUNT, "TotalAmountCount");
					select.filters = this.orderFilter();
					select.getEntityCollection(function(response) {
						if (response.success && response.collection) {
							var items = response.collection.getItems();
							if (items.length > 0) {
								if (items[0].get("TotalAmountCount") > 0) {
									this.set("Amount", items[0].get("TotalAmountSum"));
									this.set("CanAmountEdit", false);
								} else {
									this.set("Amount", 0);
									this.set("CanAmountEdit", true);
								}
								this.saveEntity(this.Terrasoft.emptyFn);
							}
							if (typeof callback === "function") {
								callback.call(scope || this);
							}
						}
					}, this);
				}
			}
		};
	});

define('ContractPageV2DocumentInContractResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContractPageV2DocumentInContract", [],
		function() {
			return {
				entitySchemaName: "Contract",
				details: /**SCHEMA_DETAILS*/{
					Document: {
						schemaName: "DocumentDetailV2",
						entitySchemaName: "Document",
						filter: {
							masterColumn: "Id",
							detailColumn: "Contract"
						},
						defaultValues: {
							Account: { masterColumn: "Account" },
							Contact: { masterColumn: "Contact" }
						}
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "HistoryTab",
						"propertyName": "items",
						"name": "Document",
						"values": { "itemType": Terrasoft.ViewItemType.DETAIL },
						"index": 2
					}
				]/**SCHEMA_DIFF*/
			};
		});

define('ContractPageV2ContractInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContractPageV2ContractInOrder", ["BusinessRuleModule", "ConfigurationConstants", "ConfigurationEnums"],
	function(BusinessRuleModule, ConfigurationConstants, enums) {
		return {
				entitySchemaName: "Contract",
				attributes: {
					"Order": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {
							columns: ["Currency", "Account"],
							filter: function() {
								var account = this.get("Account");
								if (!this.Ext.isEmpty(account)) {
									var filters = this.Terrasoft.createFilterGroup();
									filters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
									filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
										"Account", account.value));
									filters.addItem(this.Terrasoft.createIsNullFilter(
										this.Ext.create("Terrasoft.ColumnExpression", {columnPath: "Account"})
									));
									return filters;
								}
							}
						}
					},
					"Currency": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {
							columns: ["Division", "Symbol"],
							filter: function() {
								var orderCurrency = this.get("Order");
								orderCurrency = orderCurrency && orderCurrency.Currency;
								var primaryCurrency = this.get("PrimaryCurrency");
								if (primaryCurrency && orderCurrency && orderCurrency.value !== primaryCurrency.value) {
									var filters = this.Terrasoft.createFilterGroup();
									filters.addItem(this.Terrasoft.createColumnInFilterWithParameters("Id",
											[orderCurrency.value, primaryCurrency.value]));
									return filters;
								}
							}
						},
						dependencies: [
							{
								columns: ["Order"],
								methodName: "orderChanged"
							}
						]
					}
				},
				messages: {
					/**
					 * @message GetPageInfo
					 * ########## ########## # ########.
					 * @param {Object} ########## # ########.
					 */
					"GetPageInfo": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				details: /**SCHEMA_DETAILS*/{
					"Product": {
						"schemaName": "ContractProductDetailV2",
						"entitySchemaName": "OrderProduct",
						"filterMethod": "orderFilter"
					}
				}/**SCHEMA_DETAILS*/,
				methods: {
					/**
					 * @inheritdoc Terrasoft.BasePageV2#init
					 * @protected
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.initPrimaryCurrency();
						this.sandbox.subscribe("GetPageInfo", function() {
							return this;
						}, this, [this.getDetailId("Product")]);
					},

					/**
					 * ############# ####### ######.
					 * @private
					 */
					initPrimaryCurrency: function() {
						this.Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", function(primaryCurrency) {
							this.set("PrimaryCurrency", primaryCurrency);
						}, this);
					},

					/**
					 * ######### ######### #### "#####".
					 */
					orderChanged: function() {
						var order = this.get("Order");
						this.set("OrderChanged", true);
						if (order && order.Currency) {
							this.set("Currency", order.Currency);
						}
					},

					/**
					 * ############# ##########.
					 */
					onSaved: function(response, config) {
						var isOrderChanged = this.get("OrderChanged");
						var isAdd = (this.get("Operation") === enums.CardStateV2.ADD);
						var isSilentSave = config && config.isSilent;
						var messageCaption = Ext.String.format(
								this.get("Resources.Strings.LinkProductCaption"),
								this.get("Number"));
						if ((config !== null) && (config !== undefined) && (config.recalc === true)) {
							this.callParent(arguments);
							this.set("OrderChanged", false);
							return;
						}
						if ((config !== null) && (config !== undefined) && (config.linked === true)) {
							this.calcAmount(function() {
								this.onSaved(response, Ext.apply(config || {}, {recalc: true}));
							}, this);
						} else {
							if (this.get("Order") && (isAdd || isOrderChanged) && !isSilentSave) {
								this.isOrderHasUnlinkedProducts(function(show) {
									if (!show) {
										this.onSaved(response, Ext.apply(config || {}, {linked: true}));
										return;
									}
									Terrasoft.utils.showMessage({
										caption: messageCaption,
										buttons: [{
											className: "Terrasoft.Button",
											returnCode: "ButtonAll",
											style: "blue",
											caption: this.get("Resources.Strings.QuestionAllCaption"),
											markerValue: this.get("Resources.Strings.QuestionAllCaption")
										}, {
											className: "Terrasoft.Button",
											returnCode: "ButtonChoice",
											style: Terrasoft.controls.ButtonEnums.style.GREY,
											caption: this.get("Resources.Strings.QuestionChoiceCaption"),
											markerValue: this.get("Resources.Strings.QuestionChoiceCaption")
										}, "cancel"],
										defaultButton: 0,
										style: Terrasoft.MessageBoxStyles.BLUE,
										handler: function(buttonCode) {
											if (buttonCode === "ButtonAll") {
												this.connectProducts(response, config);
											}
											if (buttonCode === "ButtonChoice") {
												this.openProductLookupToLink(response, config);
											}
											if (buttonCode === "cancel") {
												this.onSaved(response, Ext.apply(config || {}, {linked: true}));
											}
										},
										scope: this
									});
								}, this);
							} else {
								this.callParent(arguments);
							}
						}
					},

					/**
					 * ########## ######### ## ########## ######.
					 * @returns {Terrasoft.configuration.QuickSearchModule.getViewModel.methods.createFilterGroup}
					 */
					orderFilter: function() {
						var order =  this.get("Order");
						var id = this.get("Id");
						var orderId = this.Terrasoft.GUID_EMPTY;
						if (order && order.value) {
							orderId = order.value;
						}
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
						filterGroup.add("OrderFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Order", orderId));
						filterGroup.add("ContractFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Contract", id));
						return filterGroup;
					},

					/**
					 * ######### ########## ######### ###### ### ###### #######,
					 * ####### ########## ####### # ####### #########.
					 * @private
					 */
					openProductLookupToLink: function(responseOnSaved, configOnSaved) {
						var config = {
							entitySchemaName: "OrderProduct",
							multiSelect: true,
							columns: ["Name"]
						};
						var orderId = this.get("Order").value;
						var filters = this.Terrasoft.createFilterGroup();
						var idFilter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Order", orderId);
						var contractIsNull = this.Terrasoft.createColumnIsNullFilter("Contract");
						filters.addItem(idFilter);
						filters.addItem(contractIsNull);
						config.filters = filters;
						this.openLookup(config, function(response) {
							this.linkSelectedRecords(responseOnSaved, Ext.apply(response, configOnSaved));
						}, this);
					},

					/**
					 * ######### ##### ### ######### ######### # ####### #########.
					 * @param {Object} response ####### ## ###### onSaved
					 * @param {Object} args ###### #### {columnName: string, selectedRows: []}.
					 * ######## ###### ######### ####### ## ###########.
					 * @private
					 */
					linkSelectedRecords: function(response, args) {
						var selectedRows = args.selectedRows.getItems();
						var contractId = this.get(this.primaryColumnName) || this.get("MasterRecordId");
						var totalCount = selectedRows.length;
						var callsCount = 0;
						this.Terrasoft.each(selectedRows, function(item) {
							var update = this.Ext.create("Terrasoft.UpdateQuery", {
								rootSchemaName: "OrderProduct"
							});
							callsCount++;
							update.setParameterValue("Contract", contractId, this.Terrasoft.DataValueType.GUID);
							update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Id",  item.value));
							update.execute(function() {
								if (callsCount === totalCount) {
									this.onSaved(response, Ext.apply(args, {linked: true}));
								}
							}, this);
						}, this);
					},

					/**
					 * ########## ######## # ####### #########.
					 */
					connectProducts: function(response, config) {
						var contractId = this.get(this.primaryColumnName) || this.get("MasterRecordId");
						var orderId = this.get("Order");
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "OrderProduct"
						});
						update.setParameterValue("Contract", contractId, this.Terrasoft.DataValueType.GUID);
						update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Order",  orderId.value));
						update.filters.addItem(this.Terrasoft.createColumnIsNullFilter("Contract"));
						update.execute(function() {
							this.onSaved(response, Ext.apply(config || {}, {linked: true}));
						}, this);
					},

					/**
					 * ######### ####### ############# ######### # #########.
					 */
					isOrderHasUnlinkedProducts: function(callback) {
						var orderId = this.get("Order");
						var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "OrderProduct"
						});
						select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Order",  orderId.value));
						select.filters.addItem(this.Terrasoft.createColumnIsNullFilter("Contract"));
						select.execute(function(response) {
							if (response && response.success) {
								if (response.collection.getCount() > 0) {
									callback.call(this, true);
								} else {
									callback.call(this, false);
								}
							}
						}, this);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "Order",
						"values": {
							"bindTo": "Order",
							"layout": {
								"column": 12,
								"row": 0
							},
							"tip": {
								"content": {"bindTo": "Resources.Strings.OrderTip"}
							},
							enabled: true
						},
						"parentName": "ContractConnectionsBlock",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "ContractPassportTab",
						"values": {
							"items": [],
							"caption": {
								"bindTo": "Resources.Strings.ContractPassportTab"
							}
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "Product",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.DETAIL
						},
						"parentName": "ContractPassportTab",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "merge",
						"name": "HistoryTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.HistoryTab"
							}
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 2
					},
					{
						"operation": "merge",
						"name": "ContractVisaTab",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"caption": {"bindTo": "Resources.Strings.ContractVisaTabCaption"}
						},
						"index": 3
					},
					{
						"operation": "merge",
						"name": "NotesAndFilesTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.NotesAndFilesTab"
							}
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 4
					}
				]/**SCHEMA_DIFF*/,
				rules: {
					"CurrencyRate": {
						"EnabledCurrencyRateByCurrency": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.ENABLED,
							"conditions": [
								{
									"leftExpression": {
										"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										"attribute": "Currency"
									},
									"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
									"rightExpression": {
										"type": BusinessRuleModule.enums.ValueType.SYSSETTING,
										"value": "PrimaryCurrency"
									}
								}
							]
						}
					},
					"Account": {
						"FiltrationAccountByOrder": {
							"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
							"autocomplete": false,
							"autoClean": false,
							"baseAttributePatch": "Id",
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "Order",
							"attributePath": "Account"
						}
					}
				}
			};
	});

define("ContractPageV2", [],
		function() {
			return {
				entitySchemaName: "Contract",
				details: /**SCHEMA_DETAILS*/{
					Invoice: {
						schemaName: "InvoiceDetailV2",
						filter: {
							masterColumn: "Id",
							detailColumn: "Contract"
						},
						defaultValues: {
							Account: {
								masterColumn: "Account"
							},
							Contact: {
								masterColumn: "Contact"
							},
							CustomerBillingInfo: {
								masterColumn: "CustomerBillingInfo"
							},
							SupplierBillingInfo: {
								masterColumn: "SupplierBillingInfo"
							}
						}
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "HistoryTab",
						"propertyName": "items",
						"name": "Invoice",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						},
						"index": 2
					}
				]/**SCHEMA_DIFF*/
			};
		});


