Terrasoft.configuration.Structures["ClientContactProfileSchema"] = {innerHierarchyStack: ["ClientContactProfileSchemaNUI", "ClientContactProfileSchema"], structureParent: "BaseRelatedProfileSchema"};
define('ClientContactProfileSchemaNUIStructure', ['ClientContactProfileSchemaNUIResources'], function(resources) {return {schemaUId:'cef7c5a8-2bae-4a4c-8b90-b78389f70077',schemaCaption: "ClientContactProfileSchema", parentSchemaName: "BaseRelatedProfileSchema", schemaName:'ClientContactProfileSchemaNUI',parentSchemaUId:'afa47510-d914-49f0-a9b1-549d70ad643d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ClientContactProfileSchemaStructure', ['ClientContactProfileSchemaResources'], function(resources) {return {schemaUId:'c13ed547-6271-4a67-866f-9e57fbf46bcc',schemaCaption: "ClientContactProfileSchema", parentSchemaName: "ClientContactProfileSchemaNUI", schemaName:'ClientContactProfileSchema',parentSchemaUId:'cef7c5a8-2bae-4a4c-8b90-b78389f70077',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ClientContactProfileSchemaNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ClientContactProfileSchemaNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
/**
 * Client contact profile class.
 * @class Terrasoft.ClientContactProfileSchema
 */
define("ClientContactProfileSchemaNUI", ["ProfileSchemaMixin", "CommunicationOptionsMixin"],
		function() {
			return {
				entitySchemaName: "Contact",
				messages: {
					/**
					 * @message CallCustomer
					 * Starts phone call in CTI panel.
					 */
					"CallCustomer": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetEntityInfo
					 * Returns information about master entity for minipage.
					 */
					"GetMiniPageMasterEntityInfo": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					/**
					 * Related page column name.
					 * @type {String}
					 */
					"RelatedPageRecordColumn": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: "Opportunity"
					}
				},
				mixins: {
					ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin",
					/**
					 * @class CommunicationOptionsMixin Mixin, implements communication options usage methods.
					 */
					CommunicationOptionsMixin: "Terrasoft.CommunicationOptionsMixin"
				},
				methods: {
					
					//Region Methods: Public

					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#getProfileHeaderCaption
					 * @overridden
					 */
					getProfileHeaderCaption: function() {
						return this.get("Resources.Strings.ProfileHeaderCaption");
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							this.initSyncMailboxCount(callback, scope);
						}, this]);
					},

					/**
					 * Returns parent module sandbox id for passed module sandbox id.
					 * @protected
					 * @param {String} moduleSandboxId Module sandbox id.
					 * @return {String} Parent module sandbox id.
					 */
					getParentModuleSandboxId:function(moduleSandboxId) {
						var parentModileId = this.mixins.CommunicationOptionsMixin.getParentModuleSandboxId(moduleSandboxId);
						return this.mixins.CommunicationOptionsMixin.getParentModuleSandboxId(parentModileId);
					},

					/**
					 * Starts call in CTI panel.
					 * @param {String} number Phone number to call.
					 * @return {Boolean} False, to stop click event propagation.
					 */
					onCallClick: function(number) {
						return this.callContactWithRelations(number, this.$Id, this.getProfileRelationFields());
					}

					//endregion
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
						"name": "Job",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "JobTitle",
							"enabled": false,
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
							"className": "Terrasoft.PhoneEdit",
							"bindTo": "MobilePhone",
							"showValueAsLink": {"bindTo": "isTelephonyEnabled"},
							"href":  {
								"bindTo": "MobilePhone",
								"bindConfig": {converter: "getLinkValue"}
							},
							"linkclick": {
								"bindTo": "onCallClick"
							},
							"enabled": false,
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
							"enabled": false,
							"layout": {
								"column": 4,
								"row": 3,
								"colSpan": 20
							}
						}
					},
					{
						"operation": "insert",
						"name": "Email",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Email",
							"showValueAsLink": true,
							"href":  {
								"bindTo": "Email",
								"bindConfig": {converter: "getLinkValue"}
							},
							"linkclick": {
								"bindTo": "sendEmail"
							},
							"enabled": false,
							"layout": {
								"column": 4,
								"row": 4,
								"colSpan": 20
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);

define("ClientContactProfileSchema", ["ProfileSchemaMixin", "CommunicationOptionsMixin"],
	function() {
		return {
			entitySchemaName: "Contact",
			messages: {
				"ContactSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {},
			mixins: {},
			methods: {
				/**
				 * @inheritDoc BaseProfileSchema#getMiniPageConfig
				 * @override
				 */
				getMiniPageConfig: function() {
					const parentConfig = this.callParent(arguments);
					if (Terrasoft.isCurrentUserSsp()) {
						parentConfig.miniPageSchemaName="PortalContactMiniPage";
						parentConfig.operation = Terrasoft.ConfigurationEnums.CardOperation.EDIT;
					}
					return parentConfig;
				},

				/**
				 * @inheritDoc BaseProfileSchema#onProfileHeaderClick
				 * @override
				 */
				onProfileHeaderClick: function(options) {
					if (Terrasoft.isCurrentUserSsp()) {
						var config = this.getMiniPageConfig(options);
						this.openMiniPage(config);
						return false;
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritDoc BaseProfileSchema#onProfileLinkMouseOver
				 * @override
				 */
				onProfileLinkMouseOver: function() {
					if (Terrasoft.isCurrentUserSsp()) {
						return;
					}
					this.callParent(arguments);
				},

				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.subscribeUpdateProfile();
				},

				subscribeUpdateProfile: function() {
					this.sandbox.subscribe("ContactSaved", this.updateProfile, this, [this.sandbox.id]);
				},

				updateProfile: function() {
					this.initEntity();
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


