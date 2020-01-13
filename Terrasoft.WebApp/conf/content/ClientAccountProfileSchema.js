Terrasoft.configuration.Structures["ClientAccountProfileSchema"] = {innerHierarchyStack: ["ClientAccountProfileSchema"], structureParent: "BaseRelatedProfileSchema"};
define('ClientAccountProfileSchemaStructure', ['ClientAccountProfileSchemaResources'], function(resources) {return {schemaUId:'55a794f0-d752-48a6-b387-6f362fadc3d7',schemaCaption: "ClientAccountProfileSchema", parentSchemaName: "BaseRelatedProfileSchema", schemaName:'ClientAccountProfileSchema',parentSchemaUId:'afa47510-d914-49f0-a9b1-549d70ad643d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Client account profile class.
 * @class Terrasoft.ClientAccountProfileSchema
 */
define("ClientAccountProfileSchema", ["CommunicationOptionsMixin"],
		function() {
			return {
				entitySchemaName: "Account",
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
				mixins: {
					ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin",
					/**
					 * @class CommunicationOptionsMixin Mixin, implements communication options usage methods.
					 */
					CommunicationOptionsMixin: "Terrasoft.CommunicationOptionsMixin"
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
						return this.callAccountWithRelations(number, this.$Id, this.getProfileRelationFields());
					}

					//endregion
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "ProfileModuleContainer",
						"values": {
							"wrapClass": ["profile-module-container", "account-profile"]
						}
					},
					{
						"operation": "insert",
						"name": "Type",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Type",
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
						"name": "Owner",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Owner",
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
						"name": "Web",
						"parentName": "ProfileContentContainer",
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
								"row": 4,
								"colSpan": 20
							}
						}
					},
					{
						"operation": "insert",
						"name": "AccountCategory",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "AccountCategory",
							"enabled": false,
							"layout": {
								"column": 4,
								"row": 5,
								"colSpan": 20
							},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"name": "Industry",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "Industry",
							"enabled": false,
							"layout": {
								"column": 4,
								"row": 6,
								"colSpan": 20
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


