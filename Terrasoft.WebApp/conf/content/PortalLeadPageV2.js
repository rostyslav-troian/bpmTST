Terrasoft.configuration.Structures["PortalLeadPageV2"] = {innerHierarchyStack: ["PortalLeadPageV2"], structureParent: "BaseLeadPage"};
define('PortalLeadPageV2Structure', ['PortalLeadPageV2Resources'], function(resources) {return {schemaUId:'03b718eb-6f35-4fcc-a0e3-36ec177283f8',schemaCaption: "PortalLeadPageV2", parentSchemaName: "BaseLeadPage", schemaName:'PortalLeadPageV2',parentSchemaUId:'cf9a9556-5840-42c8-803a-32be0512075d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("PortalLeadPageV2",["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Lead",
			attributes: {
				"OpportunityOrOrder": {
					"caption": {"bindTo": "Resources.Strings.OpportunityOrOrderCaption"},
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"multiLookupColumns": ["Opportunity", "Order"]
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					if (this.isNewMode()) {
						this.setSalesChannelInNewMode();
						const valuesInNewMode = this.getValuesInNewMode();
						this.setModelAttributesInNewMode(valuesInNewMode);
					}
				},

				/**
				 * Sets default sales channel if card is open in new mode
				 * @protected
				 */
				setSalesChannelInNewMode: function () {
					this.$SalesChannel = {
						value: ConfigurationConstants.Opportunity.Type.PartnerSale
					};
				},

				/**
				 * Creates array of model values in new mode.
				 * @protected
				 * @returns {Array}
				 */
				getValuesInNewMode: function() { 
					const valuesInNewMode = [
						{"name": "Owner", "value": this.Terrasoft.SysValue.CURRENT_USER_CONTACT}
					];
					if (!Terrasoft.isEmptyGUID(this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT.value)) {
						valuesInNewMode.push({
							"name": "Partner",
							"value": this.Terrasoft.SysValue.CURRENT_USER_ACCOUNT
						});
					}
					return valuesInNewMode;
				},

				/**
				 * Set model attributes when card is in new mode
				 * @protected
				 * @param {Array} valuesInNewMode
				 */
				setModelAttributesInNewMode: function(valuesInNewMode) {
					valuesInNewMode.forEach(this.setModelAttribute, this);
				},

				/**
				 * Set model attribute
				 * @protected
				 * @param {Object} attribute 
				 * @param {string} attribute.name Name of attribute
				 * @param {*} attribute.value Value of attribute
				 */
				setModelAttribute: function(attribute) {
					if (Ext.isEmpty(this.get(attribute.name))) {
						this.set(attribute.name, attribute.value);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "merge",
					"name": "Contact",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 11
						}
					}
				},
				{
					"operation": "merge",
					"name": "Account",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 11
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadPageDealInformationBlock",
					"propertyName": "items",
					"name": "OpportunityOrOrder",
					"values": {
						"markerValue": {"bindTo": "Resources.Strings.OpportunityOrOrderCaption"},
						"caption": {"bindTo": "Resources.Strings.OpportunityOrOrderCaption"},
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						},
						"contentType": Terrasoft.ContentType.LOOKUP,
						"enabled": false,
						"bindTo": "OpportunityOrOrder"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


