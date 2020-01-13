Terrasoft.configuration.Structures["EmailUserTaskPropertiesPage"] = {innerHierarchyStack: ["EmailUserTaskPropertiesPage"], structureParent: "BaseActivityUserTaskPropertiesPage"};
define('EmailUserTaskPropertiesPageStructure', ['EmailUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'c49aac50-3e6f-4601-923e-f8aed83bf969',schemaCaption: "Properties page of email user task", parentSchemaName: "BaseActivityUserTaskPropertiesPage", schemaName:'EmailUserTaskPropertiesPage',parentSchemaUId:'29d2ae27-fd0e-4847-acbc-58d964011393',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseActivityUserTaskPropertiesPage
 */
define("EmailUserTaskPropertiesPage", ["terrasoft", "ProcessSchemaUserTaskUtilities", "Contact", "HtmlEditModule",
		"HtmlEditMappingValueMixin"],
	function(Terrasoft, processSchemaUserTaskUtilities, Contact) {
		return {
			messages: {},
			mixins: {
				HtmlEditMappingValueMixin: "Terrasoft.HtmlEditMappingValueMixin"
			},
			attributes: {
				"Recepient": {
					dataValueType: Terrasoft.DataValueType.MAPPING,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					initMethod: "initPropertySilent",
					isRequired: true,
					doAutoSave: true
				},
				"CopyRecepient": {
					dataValueType: Terrasoft.DataValueType.MAPPING,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					initMethod: "initProperty",
					doAutoSave: true
				},
				"BlindCopyRecepient": {
					dataValueType: Terrasoft.DataValueType.MAPPING,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					initMethod: "initProperty",
					doAutoSave: true
				},
				"Body": {
					dataValueType: Terrasoft.DataValueType.MAPPING,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					initMethod: "initProperty",
					doAutoSave: true
				},
				"HtmlBody": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				"IsBodyEnabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
				 * @override
				 */
				getParameterReferenceSchemaUId: function() {
					return Contact.uId;
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					var validateMappingValue = processSchemaUserTaskUtilities.validateMappingValue;
					this.addColumnValidator("Recepient", validateMappingValue);
					this.addColumnValidator("Recommendation", validateMappingValue);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.mixins.HtmlEditMappingValueMixin.init.call(this);
					this.callParent([function() {
						callback.call(scope || this);
					}], this);
				},

				/**
				 * @inheritdoc Terrasoft.configuration.mixins.HtmlEditMappingValueMixin#getAttributesConfig
				 * @overridden
				 */
				getAttributesConfig: function() {
					return {
						Body: {
							displayAttributeName: "HtmlBody",
							enabledAttributeName: "IsBodyEnabled"
						}
					};
				}
			},
			diff: [
				{
					"operation": "remove",
					"name": "Recommendation"
				},
				{
					"operation": "remove",
					"name": "BaseActivityTaskContainer"
				},
				{
					"operation": "remove",
					"name": "RecommendationLabel"
				},
				{
					"operation": "insert",
					"name": "RecepientRegionContainer",
					"parentName": "TitleTaskContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"items": [],
						"wrapClass": ["label-info-button-container-wrapClass"]
					}
				},
				{
					"operation": "insert",
					"name": "RecommendationLabel",
					"parentName": "RecepientRegionContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.RecommendationCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "InfoRecepientButton",
					"parentName": "RecepientRegionContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.RecepientTip"},
						"behaviour": {
							"displayEvent": Terrasoft.controls.TipEnums.displayEvent.CLICK
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "TitleTaskContainer",
					"propertyName": "items",
					"name": "Recepient",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"caption": {"bindTo": "Resources.Strings.RecepientCaption"},
						"wrapClass": ["top-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "CopyRecepient",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"caption": {"bindTo": "Resources.Strings.CopyRecepientCaption"},
						"wrapClass": ["top-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "BlindCopyRecepient",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"caption": {"bindTo": "Resources.Strings.BlindCopyRecepientCaption"},
						"wrapClass": ["top-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "WhatMessageSendRegionLabel",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.WhatMessageSendRegionCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "Recommendation",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"caption": {"bindTo": "Resources.Strings.SubjectCaption"},
						"wrapClass": ["top-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"name": "HtmlBody",
					"values": {
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						},
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"enabled": {
								"bindTo": "IsBodyEnabled"
							}
						},
						"wrapClass": ["email-body-control"]
					}
				},
				{
					"operation": "insert",
					"name": "WhoMessageSendRegionLabel",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24
						},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.OwnerRegionCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "OwnerId",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24
						},
						"labelConfig": {"visible": false},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "InformationOnStep",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 24
						},
						"caption": {"bindTo": "Resources.Strings.InformationOnStepCaption"},
						"wrapClass": ["top-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "ShowExecutionPage",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 9,
							"colSpan": 24
						},
						"caption": {"bindTo": "Resources.Strings.ShowExecutionPageCaption"},
						"wrapClass": ["t-checkbox-control"]
					}
				},
				{
					"operation": "insert",
					"name": "useBackgroundMode",
					"parentName": "UserTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 10,
							"colSpan": 24
						},
						"visible": {
							"bindTo": "canUseBackgroundProcessMode"
						},
						"wrapClass": ["t-checkbox-control"]
					}
				}
			]
		};
	}
);


