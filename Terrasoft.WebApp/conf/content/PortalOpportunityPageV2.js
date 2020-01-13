Terrasoft.configuration.Structures["PortalOpportunityPageV2"] = {innerHierarchyStack: ["PortalOpportunityPageV2"], structureParent: "BaseOpportunityPage"};
define('PortalOpportunityPageV2Structure', ['PortalOpportunityPageV2Resources'], function(resources) {return {schemaUId:'12c43a07-ce3b-4768-b902-b3717b7f69a5',schemaCaption: "Opportunity page on portal V2", parentSchemaName: "BaseOpportunityPage", schemaName:'PortalOpportunityPageV2',parentSchemaUId:'2f227a1c-1a21-4b67-ae9f-52152d7f903c',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
  define("PortalOpportunityPageV2", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Opportunity",
			details: /**SCHEMA_DETAILS*/ {
				Lead: {
					schemaName: "LeadDetailV2",
					entitySchemaName: "Lead",
					filter: {
						detailColumn: "Opportunity",
						masterColumn: "Id"
					},
					defaultValues: {
						QualifiedAccount: {
							masterColumn: "Account"
						},
						Budget: {
							masterColumn: "Budget"
						},
						SalesOwner: {
							masterColumn: "Owner"
						},
						LeadType: {
							masterColumn: "LeadType"
						}
					}
				}
			} /**SCHEMA_DETAILS*/,
			modules: /**SCHEMA_MODULES*/{
				"ClientProfile": {
					"config": {
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"schemaName": "PortalClientProfileSchema",
						"parameters": {
							"viewModelConfig": {
								"masterColumnName": "Client"
							}
						}
					}
				}
			}/**SCHEMA_MODULES*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this._initializePartnerSale();
					this._initializePartner();
				},

				/**
				 * @private
				 */
				_initializePartnerSale: function () {
					if (this.isEmpty(this.$Type)) {
						this.$Type = {
							value: ConfigurationConstants.Opportunity.Type.PartnerSale
						};
					}
				},

				/**
				 * @private
				 */
				_initializePartner: function () {
					if (this.isEmpty(this.$Owner)) {
						this.$Owner = this.Terrasoft.SysValue.CURRENT_USER_CONTACT;
					}
					if (this.isEmpty(this.$Partner) &&
						!this.Terrasoft.isEmptyGUID(this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT.value)) {
							this.$Partner = this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT;
					}
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "insert",
					"name": "LeadTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.LeadTabCaption"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Lead",
					"values": {
						"itemType": 2
					},
					"parentName": "LeadTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "remove",
					"name": "Partner"
				}
			]/**SCHEMA_DIFF*/
		};
	});


