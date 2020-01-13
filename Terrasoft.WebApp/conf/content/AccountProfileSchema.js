Terrasoft.configuration.Structures["AccountProfileSchema"] = {innerHierarchyStack: ["AccountProfileSchema"], structureParent: "BaseProfileSchema"};
define('AccountProfileSchemaStructure', ['AccountProfileSchemaResources'], function(resources) {return {schemaUId:'e2ef070e-eb17-4c57-bfef-a826fb3d6d26',schemaCaption: "Account profile", parentSchemaName: "BaseProfileSchema", schemaName:'AccountProfileSchema',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Account profile class.
 * @class Terrasoft.AccountProfileSchema
 */
define("AccountProfileSchema", ["CommunicationOptionsMixin"],
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
					}
				},
				mixins: {
					/**
					 * @class CommunicationOptionsMixin Mixin, implements communication options usage methods.
					 */
					CommunicationOptionsMixin: "Terrasoft.CommunicationOptionsMixin"
				},
				methods: {

					//Region Methods: Public

					init: function(callback, scope) {
						this.callParent([function() {
							this.initSyncMailboxCount(callback, scope);
						}, this]);
					},

					/**
					 * Starts call in CTI panel.
					 * @param {String} number Phone number to call.
					 * @return {Boolean} False, to stop click event propagation.
					 */
					onCallClick: function(number) {
						return this.callAccount(number, this.$Id);
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


