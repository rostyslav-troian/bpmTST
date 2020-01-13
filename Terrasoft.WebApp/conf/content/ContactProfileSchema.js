Terrasoft.configuration.Structures["ContactProfileSchema"] = {innerHierarchyStack: ["ContactProfileSchema"], structureParent: "BaseProfileSchema"};
define('ContactProfileSchemaStructure', ['ContactProfileSchemaResources'], function(resources) {return {schemaUId:'f79ed96a-7483-4e04-8bce-4f763be2a520',schemaCaption: "Contact profile", parentSchemaName: "BaseProfileSchema", schemaName:'ContactProfileSchema',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Contact profile class.
 * @class Terrasoft.ContactProfileSchema
 */
define("ContactProfileSchema", ["ProfileSchemaMixin", "CommunicationOptionsMixin"],
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
					}
				},
				mixins: {
					/**
					 * @class ProfileSchemaMixin Mixin.
					 */
					ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin",
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
						return this.callContact(number, this.$Id);
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


