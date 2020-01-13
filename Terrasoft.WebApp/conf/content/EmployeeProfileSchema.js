Terrasoft.configuration.Structures["EmployeeProfileSchema"] = {innerHierarchyStack: ["EmployeeProfileSchema"], structureParent: "BaseProfileSchema"};
define('EmployeeProfileSchemaStructure', ['EmployeeProfileSchemaResources'], function(resources) {return {schemaUId:'8e717c21-5e22-4f64-a68e-df483e052b99',schemaCaption: "Employee profile schema", parentSchemaName: "BaseProfileSchema", schemaName:'EmployeeProfileSchema',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmployeeProfileSchema", ["ProfileSchemaMixin"], function() {
			return {
				entitySchemaName: "Employee",
				attributes: {
					/**
					 * Contact photo.
					 */
					"ContactPhoto": {
						"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						"columnPath": "Contact.Photo"
					},
					/**
					 * Mobile phone.
					 */
					"MobilePhone": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						"columnPath": "Contact.MobilePhone",
						"caption": {bindTo: "Resources.Strings.MobilePhoneCaption"}
					},
					/**
					 * Work phone.
					 */
					"Phone": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						"columnPath": "Contact.Phone",
						"caption": {bindTo: "Resources.Strings.PhoneCaption"}
					}
				},
				mixins: {
					ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin"
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([
							function() {
								this.primaryImageColumnName = "ContactPhoto";
								this.Ext.callback(callback, scope || this);
							}, this
						]);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "ProfileModuleContainer",
						"values": {
							"wrapClass": ["profile-module-container", "contact-profile"]
						}
					},
					{
						"operation": "insert",
						"name": "FullJobTitle",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 4,
								"row": 1,
								"colSpan": 20
							}
						}
					},
					{
						"operation": "insert",
						"name": "MobilePhone",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 4,
								"row": 2,
								"colSpan": 20
							}
						}
					},
					{
						"operation": "insert",
						"name": "Phone",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 4,
								"row": 3,
								"colSpan": 20
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


