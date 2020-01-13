Terrasoft.configuration.Structures["BaseLeadPage"] = {innerHierarchyStack: ["BaseLeadPageLead", "BaseLeadPage"], structureParent: "BaseModulePageV2"};
define('BaseLeadPageLeadStructure', ['BaseLeadPageLeadResources'], function(resources) {return {schemaUId:'cf9a9556-5840-42c8-803a-32be0512075d',schemaCaption: "Base Lead edit page", parentSchemaName: "BaseModulePageV2", schemaName:'BaseLeadPageLead',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseLeadPageStructure', ['BaseLeadPageResources'], function(resources) {return {schemaUId:'086cc0cb-8186-423e-805a-d0816844bc41',schemaCaption: "Base Lead edit page", parentSchemaName: "BaseLeadPageLead", schemaName:'BaseLeadPage',parentSchemaUId:'cf9a9556-5840-42c8-803a-32be0512075d',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseLeadPageLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseLeadPageLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseLeadPageLead", ["BusinessRuleModule", "ConfigurationConstants", "PartnersOwnerMixin"],
	function(BusinessRuleModule, ConfigurationConstants) {
	return {
		entitySchemaName: "Lead",
		details: /**SCHEMA_DETAILS*/{
			Files: {
				schemaName: "FileDetailV2",
				entitySchemaName: "FileLead",
				filter: {
					detailColumn: "Lead"
				}
			},
			QualifyStatusInLead: {
				schemaName: "QualifyStatusInLeadDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "Lead"
				}
			}
		}/**SCHEMA_DETAILS*/,
		attributes: {
			"EmployeesNumber": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				lookupListConfig: {
					orders: [{columnPath: "Position"}]
				}
			},
			"Owner": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				lookupListConfig: {
					filter: function () {
						return this.getOwnerFilter("SalesChannel");
					}
				}
			}
		},
		mixins: {
			PartnersOwnerMixin: "Terrasoft.PartnersOwnerMixin"
		},
		methods: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
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
				"name": "DealSpecificsTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1,
				"values": {
					"caption": {"bindTo": "Resources.Strings.DealSpecificsTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HistoryTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2,
				"values": {
					"caption": {"bindTo": "Resources.Strings.HistoryTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageGeneralInfoTabContainer",
				"propertyName": "items",
				"name": "LeadPageGeneralTabContentGroup",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"controlConfig": {"collapsed": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageGeneralTabContentGroup",
				"propertyName": "items",
				"name": "LeadPageGeneralBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"name": "LeadPageGeneralInfoTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "DealSpecificsTab",
				"name": "DealSpecificsTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "DealSpecificsTabContainer",
				"propertyName": "items",
				"name": "LeadPageDealInformation",
				"values": {
					"caption": {bindTo: "Resources.Strings.DealInformationCaption"},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "LeadPageDealInformation",
				"propertyName": "items",
				"name": "LeadPageDealInformationBlock",
				"alias": {
					"name": "LeadPageTransferToSaleInfoBlock"
				},
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},

			{
				"operation": "insert",
				"parentName": "LeadPageDealInformationBlock",
				"propertyName": "items",
				"name": "Budget",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageDealInformationBlock",
				"propertyName": "items",
				"name": "SalesOwner",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					},
					"contentType": Terrasoft.ContentType.LOOKUP,
					"bindTo": "SalesOwner"
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageDealInformationBlock",
				"propertyName": "items",
				"name": "NextActualizationDate",
				"values": {
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "HistoryTab",
				"propertyName": "items",
				"name": "QualifyStatusInLead",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"name": "NotesTab",
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
				"parentName": "NotesTab",
				"propertyName": "items",
				"name": "Files",
				"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
			},
			{
				"operation": "insert",
				"parentName": "NotesTab",
				"name": "LeadNotesTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadNotesTabContainer",
				"propertyName": "items",
				"name": "LeadNotesControlGroup",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
					"controlConfig": {"collapsed": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadNotesTabContainer",
				"propertyName": "items",
				"name": "LeadNotesTabBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadNotesControlGroup",
				"propertyName": "items",
				"name": "Notes",
				"values": {
					"contentType": Terrasoft.ContentType.RICH_TEXT,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {"visible": false},
					"controlConfig": {
						"imageLoaded": {"bindTo": "insertImagesToNotes"},
						"images": {"bindTo": "NotesImagesCollection"}
					}
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {
			"Contact": {
				"EnabledContact": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			},
			"Account": {
				"EnabledAccount": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			},
			"MobilePhone": {
				"EnabledMobilePhone": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			},
			"Email": {
				"EnabledEmail": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			},
			"EmployeesNumber": {
				"EnabledEmployeesNumber": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			},
			"Country": {
				"EnabledCountry": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			},
			"Website": {
				"EnabledWebsite": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "Status"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: ConfigurationConstants.Lead.Status.New
						}
					}]
				}
			}
		}
	};
});

define("BaseLeadPage", ["BusinessRuleModule", "LeadSectionActionsDashboard", "LeadManagementUtilities"],
		function(BusinessRuleModule) {
	return {
		entitySchemaName: "Lead",
		mixins: {
			LeadManagementUtilities: "Terrasoft.LeadManagementUtilities"
		},
		details: /**SCHEMA_DETAILS*/{
			LeadProduct: {
				schemaName: "LeadProductDetailV2",
				entitySchemaName: "LeadProduct",
				filter: {
					masterColumn: "Id",
					detailColumn: "Lead"
				}
			}
		}/**SCHEMA_DETAILS*/,
		messages: {

			/**
			 * @message LaunchLeadManagement
			 * Launches LeadManagement process.
			 */
			"LaunchLeadManagement": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.set("SourceDataEditable", true);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				const modulesIds = this.getModuleIds();
				this.sandbox.subscribe("LaunchLeadManagement", this.executeLeadManagementProcess, this,
					modulesIds);
				this.callParent(arguments);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "NewLeadType",
				"values": {
					"bindTo": "LeadType",
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM
				},
				"alias": {
					"name": "LeadType",
					"excludeProperties": ["layout"],
					"excludeOperations": ["remove", "move"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "LeadRegisterMethodInProfile",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"bindTo": "RegisterMethod"
				},
				"alias": {
					"name": "RegisterMethodInProfile",
					"excludeProperties": ["layout"],
					"excludeOperations": ["remove", "move"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "LeadBudget",
				"values": {
					"bindTo": "Budget",
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "LeadCreatedOn",
				"values": {
					"bindTo": "CreatedOn",
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 24
					},
					"enabled": false
				},
				"alias": {
					"name": "CreatedOn",
					"excludeProperties": ["layout"],
					"excludeOperations": ["remove", "move"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "LeadOwner",
				"values": {
					"bindTo": "Owner",
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 24
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
				"parentName": "LeadPageGeneralInfoTabContainer",
				"propertyName": "items",
				"index": 0,
				"name": "LeadPageRegisterInfo",
				"values": {
					"caption": {bindTo: "Resources.Strings.LeadPageRegisterInfoCaption"},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"controlConfig": {"collapsed": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfo",
				"propertyName": "items",
				"name": "LeadPageRegisterInfoBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"enabled": {"bindTo": "SourceDataEditable"},
					"collapseEmptyRow": false
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "Contact",
				"values": {
					"markerValue": {"bindTo": "Resources.Strings.ContactCaption"},
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 10
					},
					"isRequired": false
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "MobilePhone",
				"values": {
					"className": "Terrasoft.PhoneEdit",
					"markerValue": {"bindTo": "Resources.Strings.MobilePhoneCaption"},
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 11
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "Job",
				"values": {
					"markerValue": {"bindTo": "Resources.Strings.JobCaption"},
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 11
					},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "Email",
				"values": {
					"markerValue": {"bindTo": "Resources.Strings.EmailCaption"},
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 11
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "Account",
				"values": {
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 10
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "EmployeesNumber",
				"values": {
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 11
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "Country",
				"values": {
					"markerValue": {"bindTo": "Resources.Strings.CountryCaption"},
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 12,
						"row": 2,
						"colSpan": 11
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfoBlock",
				"propertyName": "items",
				"name": "Website",
				"values": {
					"enabled": {"bindTo": "SourceDataEditable"},
					"layout": {
						"column": 12,
						"row": 3,
						"colSpan": 11
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeadPageRegisterInfo",
				"propertyName": "items",
				"name": "LeadProduct",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
		],/**SCHEMA_DIFF*/
		modules: /**SCHEMA_MODULES*/{
			ActionsDashboardModule: {
				"config": {
					"isSchemaConfigInitialized": true,
					"schemaName": "LeadSectionActionsDashboard",
					"useHistoryState": false,
					"parameters": {
						"viewModelConfig": {
							"entitySchemaName": "Lead",
							"actionsConfig": {
								"schemaName": "QualifyStatus",
								"columnName": "QualifyStatus",
								"colorColumnName": "Color",
								"filterColumnName": "IsDisplayed",
								"orderColumnName": "StageOrder",
								"innerOrderColumnName": "StageInnerOrder",
								"decouplingConfig": {
									"name": "QualifyStatusDecoupling",
									"masterColumnName": "CurrentStatus",
									"referenceColumnName": "AvailableStatus"
								}
							},
							"dashboardConfig": {
								"Activity": {
									"masterColumnName": "Id",
									"referenceColumnName": "Lead"
								}
							}
						}
					}
				}
			}
		}, /**SCHEMA_MODULES*/
		rules: {
			"LeadType": {
				"LeadTypeRequired": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.REQUIRED,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}
					]
				}
			},
			"Contact": {
				"EnabledContact": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"Account": {
				"EnabledAccount": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"MobilePhone": {
				"EnabledMobilePhone": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"Email": {
				"EnabledEmail": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"EmployeesNumber": {
				"EnabledEmployeesNumber": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"Country": {
				"EnabledCountry": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"Website": {
				"EnabledWebsite": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.ENABLED,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "SourceDataEditable"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			}
		}
	};
});


