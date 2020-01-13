Terrasoft.configuration.Structures["ProjectPageV2"] = {innerHierarchyStack: ["ProjectPageV2Project", "ProjectPageV2InvoiceInProject", "ProjectPageV2"], structureParent: "BaseProjectPageV2"};
define('ProjectPageV2ProjectStructure', ['ProjectPageV2ProjectResources'], function(resources) {return {schemaUId:'64ff4a0a-0e11-4884-afe3-e25c95fff2f4',schemaCaption: "Project edit page", parentSchemaName: "BaseProjectPageV2", schemaName:'ProjectPageV2Project',parentSchemaUId:'d681419c-2c25-421b-826e-d7a48c49bdbb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProjectPageV2InvoiceInProjectStructure', ['ProjectPageV2InvoiceInProjectResources'], function(resources) {return {schemaUId:'dda42f00-dbee-4c00-ac5f-26806a064274',schemaCaption: "Project edit page", parentSchemaName: "ProjectPageV2Project", schemaName:'ProjectPageV2InvoiceInProject',parentSchemaUId:'64ff4a0a-0e11-4884-afe3-e25c95fff2f4',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProjectPageV2Project",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProjectPageV2Structure', ['ProjectPageV2Resources'], function(resources) {return {schemaUId:'c9be1db5-8da6-4102-beb2-a345fcae7734',schemaCaption: "Project edit page", parentSchemaName: "ProjectPageV2InvoiceInProject", schemaName:'ProjectPageV2',parentSchemaUId:'dda42f00-dbee-4c00-ac5f-26806a064274',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProjectPageV2InvoiceInProject",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProjectPageV2ProjectResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProjectPageV2Project", ["terrasoft", "XRMConstants", "ConfigurationConstants", "BusinessRuleModule"],
	function(Terrasoft, XRMConstants, ConfigurationConstants) {
		return {
			entitySchemaName: "Project",
			attributes: {
				"Opportunity": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						filter: function() {
							var filterGroup = this.Terrasoft.createFilterGroup();
							filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
							if (this.get("Contact")) {
								filterGroup.add("ContactFilter", this.Terrasoft.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL,
										"Contact", this.get("Contact").value));
							}
							if (this.get("Account")) {
								filterGroup.add("AccountFilter", this.Terrasoft.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL,
										"Account", this.get("Account").value));
							}
							return filterGroup;
						},
						columns: ["Account", "Contact"]
					},
					dependencies: [
						{
							columns: ["Opportunity"],
							methodName: "onOpportunityChanged"
						},
						{
							columns: ["Contact", "Account"],
							methodName: "onReferenceEntityChanged"
						}
					]
				}
			},
			messages: {
				"UpdateDetailResource": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			details: /**SCHEMA_DETAILS*/{
				"ProjectResourceElement": {
					"schemaName": "ProjectResourceElementDetailV2",
					"filter": {
						"detailColumn": "Project",
						"masterColumn": "Id"
					}
				},
				"Cashflow": {
					"schemaName": "CashflowDetailV2",
					"filter": {
						"detailColumn": "Project",
						"masterColumn": "Id"
					}
				},
				"Finance": {
					"schemaName": "ProjectFinanceDetailV2",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Id"
					}
				},
				"Activities": {
					"schemaName": "ActivityDetailV2",
					"filter": {
						"detailColumn": "Project",
						"masterColumn": "Id"
					},
					defaultValues: {
						Account: {masterColumn: "Account"},
						Contact: {masterColumn: "Contact"}
					},
					subscriber: function() {
						this.updateDetail({"detail": "ProjectResourceElement"});
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Project"
					},
					filterMethod: "emailDetailFilter"
				}
			}, /**SCHEMA_DETAILS*/
			methods: {
				/**
				 * @inheritdoc BasePageV2#onRender
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					this.updateDetail({"detail": "ProjectResourceElement"});
				},

				/**
				 * @inheritdoc BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.sandbox.subscribe("UpdateDetailResource", function() {
						this.updateDetail({
							detail: "ProjectResourceElement"
						});
					}, this);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					if ((this.isAddMode() || this.isCopyMode()) && !this.get("ProjectEntryType")) {
						{
							this.loadLookupDisplayValue("ProjectEntryType", XRMConstants.Project.EntryType.Project);
						}
					}
					this.callParent(arguments);
				},

				/**
				 * Refresh detail "ProjectResourceElement".
				 * @protected
				 * @overridden
				 */
				onProjectLaborPlanCalculated: function() {
					this.callParent(arguments);
					this.updateDetail({"detail": "ProjectResourceElement"});
				},

				/**
				 * Refresh detail "ProjectResourceElement".
				 * @protected
				 * @overridden
				 */
				onProjectCollectionActualWorkCalculated: function() {
					this.callParent(arguments);
					this.updateDetail({"detail": "ProjectResourceElement"});
				},

				/**
				 * Creates filter for detail Email.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Group filters.
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("ProjectNotNull", this.Terrasoft.createColumnIsNotNullFilter("Project"));
					filterGroup.add("ProjectConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Project", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				},

				/**
				 * On opportunity changed event handler.
				 */
				onOpportunityChanged: function() {
					var opportunity = this.get("Opportunity");
					if (!opportunity) {
						return;
					}
					var account = this.get("Account");
					var contact = this.get("Contact");
					var refAccount = opportunity && opportunity.Account || null;
					var refContact = opportunity && opportunity.Contact || null;
					if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
						if (refAccount) {
							this.set("Account", refAccount);
						}
						if (refContact) {
							this.set("Contact", refContact);
						}
					}
				},

				/**
				 * On reference entity changed event handler.
				 */
				onReferenceEntityChanged: function(argument, attribute) {
					var attributeValue = this.get(attribute);
					if (this.Ext.isEmpty(attributeValue)) {
						return;
					}
					var opportunity = this.get("Opportunity");
					var refValue = opportunity && opportunity[attribute] || null;
					if (!this.Ext.isEmpty(refValue) && refValue !== attributeValue.value) {
						this.set("Opportunity", null);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "FinanceTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2,
					"values": {
						"caption": {"bindTo": "Resources.Strings.FinanceTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "LinksControlBlock",
					"propertyName": "items",
					"name": "Opportunity",
					"values": {
						"layout": {"column": 0, "row": 0},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OpportunityTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"name": "ProjectResourceElement",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "Type",
					"values": {
						"layout": {"column": 12, "row": 1},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "move",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "IsAutoCalcCompletion",
					"values": {
						"layout": {"column": 0, "row": 2},
						"tip": {
							"content": {"bindTo": "Resources.Strings.IsAutoCalcCompletionTip"}
						}
					}
				},
				{
					"operation": "move",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "StartDate",
					"values": {
						"layout": {"column": 0, "row": 3}
					}
				},
				{
					"operation": "move",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "getDurationByMask",
					"values": {
						"caption": {"bindTo": "Resources.Strings.DurationByMask"},
						"enabled": false,
						"layout": {"column": 12, "row": 3},
						"tip": {
							"content": {"bindTo": "Resources.Strings.getDurationByMaskTip"}
						}
					}
				},
				{
					"operation": "move",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "EndDate",
					"values": {
						"layout": {"column": 0, "row": 4}
					}
				},
				{
					"operation": "move",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"name": "Deadline",
					"values": {
						"layout": {"column": 12, "row": 4}
					}
				},
				{
					"operation": "insert",
					"parentName": "FinanceTab",
					"propertyName": "items",
					"name": "Finance",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "FinanceTab",
					"propertyName": "items",
					"name": "Cashflow",
					"values": {
						itemType: Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "Activities",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "EmailDetailV2",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('ProjectPageV2InvoiceInProjectResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProjectPageV2InvoiceInProject", [],
		function() {
			return {
				entitySchemaName: "Project",
				details: /**SCHEMA_DETAILS*/{
					"Invoice": {
						"schemaName": "InvoiceDetailV2",
						"filter": {
							"detailColumn": "Project",
							"masterColumn": "Id"
						},
						"defaultValues": {
							"ParentProject": {
								"masterColumn": "Id"
							},
							"Account": {
								"masterColumn": "Account"
							},
							"Contact": {
								"masterColumn": "Contact"
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
						}
					}
				]/**SCHEMA_DIFF*/,
				methods: {}
			};
		});

define("ProjectPageV2", [],
		function() {
			return {
				entitySchemaName: "Project",
				details: /**SCHEMA_DETAILS*/{
					Documents: {
						schemaName: "DocumentDetailV2",
						entitySchemaName: "Document",
						filter: {
							masterColumn: "Id",
							detailColumn: "Project"
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
						"name": "Documents",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					}
				]/**SCHEMA_DIFF*/,
				methods: {}
			};
		});


