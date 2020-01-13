Terrasoft.configuration.Structures["SocialAccountPage"] = {innerHierarchyStack: ["SocialAccountPageSocialNetworkIntegration", "SocialAccountPage"], structureParent: "BaseSocialPage"};
define('SocialAccountPageSocialNetworkIntegrationStructure', ['SocialAccountPageSocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'d5908906-b872-4dc8-976e-719ff9d4dbc8',schemaCaption: "Base schema - Account population page", parentSchemaName: "BaseSocialPage", schemaName:'SocialAccountPageSocialNetworkIntegration',parentSchemaUId:'0adaeb38-7bc0-45fa-b4dd-2c675479bc12',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialAccountPageStructure', ['SocialAccountPageResources'], function(resources) {return {schemaUId:'16b2ce27-e6de-4806-81ab-ff5b291ecfce',schemaCaption: "Base schema - Account population page", parentSchemaName: "SocialAccountPageSocialNetworkIntegration", schemaName:'SocialAccountPage',parentSchemaUId:'d5908906-b872-4dc8-976e-719ff9d4dbc8',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SocialAccountPageSocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialAccountPageSocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SocialAccountPageSocialNetworkIntegration", [], function() {
	return {
		entitySchemaName: "Account",
		attributes: {
			Name: {
				isRequired: false
			}
		},
		details: /**SCHEMA_DETAILS*/{
			AccountSocialCommunication: {
				schemaName: "AccountSocialCommunicationDetail",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				}
			},
			AccountSocialAddress: {
				schemaName: "AccountSocialAddressDetail",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				}
			},
			AccountSocialAnniversary: {
				schemaName: "AccountSocialAnniversaryDetail",
				filter: {
					masterColumn: "Id",
					detailColumn: "Account"
				}
			}
		},/**SCHEMA_DETAILS*/
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"bindTo": "Name",
					"caption": {"bindTo": "CaptionName"},
					"enabled": false,
					"layout": {"column": 0, "row": 0, "colSpan": 10}
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"name": "AccountSocialCommunication",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL,
					"classes": {
						wrapClassName: ["social-communication-detail-container"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"name": "AccountSocialAddress",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL,
					"classes": {
						wrapClassName: ["social-address-detail-container"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"name": "AccountSocialAnniversary",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL,
					"classes": {
						wrapClassName: ["social-Anniversary-detail-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": {"bindTo": "Resources.Strings.NotesControlGroupCaption"}
				}
			},
			{
				"operation": "insert",
				"name": "Notes",
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"values": {
					"contentType": Terrasoft.ContentType.RICH_TEXT,
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"labelConfig": {
						"visible": false
					},
					markerValue: "Notes"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("SocialAccountPage", ["AccountCommunication"], function(AccountCommunication) {
	return {
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseSocialPage#getFacebookProfilesESQ
			 * @overridden
			 */
			getFacebookProfilesESQ: function() {
				return this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: AccountCommunication
				});
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


