Terrasoft.configuration.Structures["DocumentPageV2"] = {innerHierarchyStack: ["DocumentPageV2Document", "DocumentPageV2DocumentInOrder", "DocumentPageV2DocumentInContract", "DocumentPageV2DocumentInProject", "DocumentPageV2"], structureParent: "BaseModulePageV2"};
define('DocumentPageV2DocumentStructure', ['DocumentPageV2DocumentResources'], function(resources) {return {schemaUId:'12ba33bc-d12c-4ec6-b552-7b739b7b5193',schemaCaption: "Section edit page schema - \"Documents\"", parentSchemaName: "BaseModulePageV2", schemaName:'DocumentPageV2Document',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('DocumentPageV2DocumentInOrderStructure', ['DocumentPageV2DocumentInOrderResources'], function(resources) {return {schemaUId:'968f2e64-2b69-4dec-a5ab-015f54269d92',schemaCaption: "Section edit page schema - \"Documents\"", parentSchemaName: "DocumentPageV2Document", schemaName:'DocumentPageV2DocumentInOrder',parentSchemaUId:'12ba33bc-d12c-4ec6-b552-7b739b7b5193',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"DocumentPageV2Document",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('DocumentPageV2DocumentInContractStructure', ['DocumentPageV2DocumentInContractResources'], function(resources) {return {schemaUId:'28b92cf5-426b-4b81-a4f7-143949386df0',schemaCaption: "Section edit page schema - \"Documents\"", parentSchemaName: "DocumentPageV2DocumentInOrder", schemaName:'DocumentPageV2DocumentInContract',parentSchemaUId:'968f2e64-2b69-4dec-a5ab-015f54269d92',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"DocumentPageV2DocumentInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('DocumentPageV2DocumentInProjectStructure', ['DocumentPageV2DocumentInProjectResources'], function(resources) {return {schemaUId:'dc42e4d3-ccfd-4468-a7df-dbb13c3a7718',schemaCaption: "Section edit page schema - \"Documents\"", parentSchemaName: "DocumentPageV2DocumentInContract", schemaName:'DocumentPageV2DocumentInProject',parentSchemaUId:'28b92cf5-426b-4b81-a4f7-143949386df0',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"DocumentPageV2DocumentInContract",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('DocumentPageV2Structure', ['DocumentPageV2Resources'], function(resources) {return {schemaUId:'ff3b329a-b5cd-4ce2-b6bd-0e1171445a24',schemaCaption: "Section edit page schema - \"Documents\"", parentSchemaName: "DocumentPageV2DocumentInProject", schemaName:'DocumentPageV2',parentSchemaUId:'dc42e4d3-ccfd-4468-a7df-dbb13c3a7718',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"DocumentPageV2DocumentInProject",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('DocumentPageV2DocumentResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("DocumentPageV2Document", ["BaseFiltersGenerateModule", "VisaHelper", "BusinessRuleModule", "ConfigurationConstants"],
	function(BaseFiltersGenerateModule, VisaHelper, BusinessRuleModule, ConfigurationConstants) {
		return {
			entitySchemaName: "Document",
			attributes: {
				"Owner": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {"filter": BaseFiltersGenerateModule.OwnerFilter}
				},
				"State": {
					"lookupListConfig": {
						"orders": [{"columnPath": "Position"}]
					}
				}
			},
			details: /**SCHEMA_DETAILS*/{
				"Activities": {
					"schemaName": "ActivityDetailV2",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Document"
					},
					defaultValues: {
						"Document": {"masterColumn": "Id"},
						"Account": {"masterColumn": "Account"},
						"Contact": {"masterColumn": "Contact"}
					}
				},
				Documents: {
					"schemaName": "DocumentRelationshipDetailV2",
					"filterMethod": "relationshipDetailFilter",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Document"
					},
					"entitySchemaName": "Document",
					"defaultValues": {
						"Document": {"masterColumn": "Id"},
						"Account": {"masterColumn": "Account"},
						"Contact": {"masterColumn": "Contact"}
					},
					subscriber: function(cfg) {
						if (cfg && cfg.rows && (cfg.action !== "delete")) {
							this.connectedDocuments(cfg.rows[0], this, function() {
								this.sandbox.publish("UpdateDetail", {
									reloadAll: true
								}, [this.getDetailId("Documents")]);
							}, this);
						}
					}
				},
				"Files": {
					"schemaName": "FileDetailV2",
					"entitySchemaName": "DocumentFile",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Document"
					}
				},
				"EntityConnections": {
					"schemaName": "EntityConnectionsDetailV2",
					"entitySchemaName": "EntityConnection",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "SysModuleEntity"
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Document"
					},
					filterMethod: "emailDetailFilter"
				}
			}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onGetPageTips
				 * @overridden
				 */
				onGetPageTips: function() {
					return {
						"Contract": this.get("Resources.Strings.ContractTip"),
						"Opportunity": this.get("Resources.Strings.OpportunityTip"),
						"Order": this.get("Resources.Strings.OrderTip"),
						"Project": this.get("Resources.Strings.ProjectTip")
					};
				},

				/**
				 * ####### ######## ######## ###### relationship.
				 * @protected
				 * @returns {createFilterGroup}
				 */
				relationshipDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
					filterGroup.add("DocumentAFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "[DocumentRelationship:DocumentA].DocumentB", recordId));
					filterGroup.add("DocumentBFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"[DocumentRelationship:DocumentB].DocumentA", recordId));
					return filterGroup;
				},
				/**
				 * ############# #### #####.
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
				 * ########## ######## ###### #############.
				 * #### ############ ############ ########, ####### ######### # ############# ########## #######.
				 * ##### ########## callback-#######.
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
								this.validateAccountOrContactFilling(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
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
				 * ######### ######### ## ###### #### ## ##### "#######" ### "##########".
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ##########.
				 */
				validateAccountOrContactFilling: function(callback, scope) {
					var account = this.get("Account");
					var contact = this.get("Contact");
					var result = {
						success: true
					};
					if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
						var accountColumnCaption = this.getColumnByName("Account").caption;
						var contactColumnCaption = this.getColumnByName("Contact").caption;
						result.message = this.Ext.String.format(
								this.get("Resources.Strings.WarningAccountContactRequire"),
								accountColumnCaption, contactColumnCaption);
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * ######### ######## ## ######### ##### ##########.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ##########.
				 */
				validateUniqueNumber: function(callback, scope) {
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Number)) {
						callback.call(scope, {success: true});
					}
					var id = this.get("Id");
					var number = this.get("Number");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Document"});
					esq.filters.addItem(
						this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", id));
					esq.filters.addItem(
						this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Number", number));
					esq.getEntityCollection(function(response) {
						var result = {success: true};
						if (response.success && response.collection.getCount() > 0) {
							result.message = this.get("Resources.Strings.NumberMustBeUnique");
							result.success = false;
						}
						callback.call(scope || this, result);
					}, this);
				},
				/**
				 * ####### ######### ###### # ####### ######## ##########, #### ##### ##### ### ###.
				 * @param {Guid} recordId ############# ########### ######
				 * @param {Object} scope ######## ##########
				 * @param {Function} callback #######, ####### ##### ####### ##### ####### ######
				 */
				connectedDocuments: function(recordId, scope, callback) {
					if (!recordId) {
						return;
					}
					var currentId = scope.get(scope.primaryColumnName) || scope.get("MasterRecordId");
					var esq = scope.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "DocumentRelationship"
					});
					esq.addColumn("Id");
					esq.filters.addItem(esq.createColumnFilterWithParameter(scope.Terrasoft.ComparisonType.EQUAL,
						"DocumentA", currentId));
					esq.filters.addItem(esq.createColumnFilterWithParameter(scope.Terrasoft.ComparisonType.EQUAL,
						"DocumentB", recordId));
					esq.getEntityCollection(function(response) {
						if (response.success) {
							if (response.collection.getCount() > 0) {
								if (callback) {
									callback.call(scope);
								}
								return;
							}
							var insert = Ext.create("Terrasoft.InsertQuery", {
								rootSchemaName: "DocumentRelationship"
							});
							insert.setParameterValue("DocumentB", recordId, Terrasoft.DataValueType.GUID);
							insert.setParameterValue("DocumentA", currentId, Terrasoft.DataValueType.GUID);
							insert.execute(callback || scope.Ext.emptyFn, scope);
						}
					}, scope);
				},

				/**
				 * Creates filter for detail Email.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Group filters.
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("DocumentNotNull", this.Terrasoft.createColumnIsNotNullFilter("Document"));
					filterGroup.add("DocumentConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Document", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				}
			},
			rules: {
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Number",
					"values": {
						"bindTo": "Number",
						"layout": {"column": 0, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Date",
					"values": {
						"bindTo": "Date",
						"layout": {"column": 12, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Type",
					"values": {
						"bindTo": "Type",
						"layout": {"column": 0, "row": 1},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Owner",
					"values": {
						"bindTo": "Owner",
						"layout": {"column": 12, "row": 1, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OwnerTip"}
						}
					},
					"filter": BaseFiltersGenerateModule.OwnerFilter
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "State",
					"values": {
						"bindTo": "State",
						"layout": {"column": 0, "row": 2},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"name": "GeneralInfoTabContainer",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTabContainer",
					"name": "GeneralInfoGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"wrapClass": "contract-general-info-group-wrap"
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoGroup",
					"propertyName": "items",
					"name": "GeneralInfoBlock",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "Account",
					"values": {
						"bindTo": "Account",
						"layout": {"column": 0, "row": 0}
					}
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"bindTo": "Contact",
						"layout": {"column": 12, "row": 0}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTabContainer",
					"propertyName": "items",
					"name": "EntityConnections",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "HistoryTabContainer",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.HistoryTabCaption"},
						"items": []
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
					"parentName": "HistoryTabContainer",
					"propertyName": "items",
					"name": "Documents",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "NotesAndFilesTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.NotesFilesTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "NotesAndFilesTab",
					"propertyName": "items",
					"name": "Files",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "NotesControlGroup",
					"parentName": "NotesAndFilesTab",
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
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('DocumentPageV2DocumentInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("DocumentPageV2DocumentInOrder", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Document",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			rules: {
				"Order": {
					"FiltrationOrderByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});



define('DocumentPageV2DocumentInContractResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("DocumentPageV2DocumentInContract", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Document",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			rules: {
				"Contract": {
					"FiltrationContractByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});



define('DocumentPageV2DocumentInProjectResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("DocumentPageV2DocumentInProject", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Document",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			rules: {
				"Project": {
					"FiltrationProjectByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});



define("DocumentPageV2", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Document",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			rules: {
				"Opportunity": {
					"FiltrationOpportunityByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"FiltrationOpportunityByContact": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Contact",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Contact"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


