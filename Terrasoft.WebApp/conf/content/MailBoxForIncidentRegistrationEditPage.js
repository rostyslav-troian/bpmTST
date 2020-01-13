Terrasoft.configuration.Structures["MailBoxForIncidentRegistrationEditPage"] = {innerHierarchyStack: ["MailBoxForIncidentRegistrationEditPage"], structureParent: "BaseLookupPage"};
define('MailBoxForIncidentRegistrationEditPageStructure', ['MailBoxForIncidentRegistrationEditPageResources'], function(resources) {return {schemaUId:'bff14887-a435-4dc1-9698-a57b78186912',schemaCaption: "MailBoxForIncidentRegistrationEditPage", parentSchemaName: "BaseLookupPage", schemaName:'MailBoxForIncidentRegistrationEditPage',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MailBoxForIncidentRegistrationEditPage", ["BusinessRuleModule", "EmailHelper",
		"MailBoxForIncidentRegistrationEditPageResources"],
	function(BusinessRuleModule, EmailHelper) {
		return {
			entitySchemaName: "MailboxForIncidentRegistration",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "MailboxSyncSettings",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 12,
							"column": 0,
							"row": 0
						}
					}
				},
				{
					"operation": "insert",
					"name": "AliasAddress",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 12,
							"column": 0,
							"row": 1
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.AliasTip"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "Category",
					"parentName": "GeneralInfoBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 12,
							"column": 0,
							"row": 2
						}
					}
				},
				{
					"operation": "merge",
					"name": "Description",
					"values": {
						"layout": {
							"colSpan": 12,
							"column": 0,
							"row": 3
						}
					}
				},
				{
					"operation": "merge",
					"name": "Name",
					"values": {
						"layout": {
							"colSpan": 12,
							"column": 0,
							"row": 4
						},
						"visible": false
					}
				}
			]/**SCHEMA_DIFF*/,
			mixins: {},
			attributes: {
				"CategoryFromMailBox": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @protected
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					var featureEnabled = this.getIsFeatureEnabled("CategoryFromMailBox");
					this.set("CategoryFromMailBox", featureEnabled);
				},

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("AliasAddress", EmailHelper.getEmailValidator);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getActions
				 * @overridden
				 */
				getActions: function() {
					return Ext.create("Terrasoft.Collection");
				},

				/*
				 * Get mailbox name, that has been created from physical mailbox and its alias (if alias is exist).
				 * @private
				 * @return {String} Mailbox name.
				 */
				_getMailboxName: function() {
					var name = this.get("MailboxSyncSettings").displayValue + " ";
					if (this.get("AliasAddress")) {
						name = name + "(" + this.get("AliasAddress") + ")";
					}
					return name;
				},

				/**
				 * @inheritdoc Terrasoft.BaseEntityPage#save
				 * @overridden
				 */
				save: function() {
					var name = this._getMailboxName();
					this.set("Name", name);
					this.callParent(arguments);
				}
			},
			rules: {
				"Category": {
					"BindParameterRequiredCategory": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "CategoryFromMailBox"
							},
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				}
			}
		};
	});


