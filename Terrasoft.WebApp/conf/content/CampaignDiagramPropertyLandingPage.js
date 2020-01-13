Terrasoft.configuration.Structures["CampaignDiagramPropertyLandingPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyLandingPage"], structureParent: "CampaignDiagramPropertyEntityPage"};
define('CampaignDiagramPropertyLandingPageStructure', ['CampaignDiagramPropertyLandingPageResources'], function(resources) {return {schemaUId:'bc34b348-f5d8-4c98-8613-76a3b223c6f6',schemaCaption: "CampaignDiagramPropertyLandingPage", parentSchemaName: "CampaignDiagramPropertyEntityPage", schemaName:'CampaignDiagramPropertyLandingPage',parentSchemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyLandingPage", ["CampaignDiagramPropertyLandingPageResources", "terrasoft"],
	function() {
		return {
			entitySchemaName: "GeneratedWebForm",
			methods: {
				/**
				 * ########## ######### ##### ############ ### ######### ########.
				 * @protected
				 * @overridden
				 * @return {Array} ######### #####.
				 */
				getUsedColumns: function() {
					return [
						"Id",
						"Name",
						"ExternalURL",
						"State",
						"Type"
					];
				},

				/**
				 * Returns link object for site url.
				 * @return {Object}
				 */
				getExternalURLLink: function() {
					return this.getLink(this.get("ExternalURL"));
				},

				/**
				 * Site url link click handler.
				 * @return {Boolean} True if uses default handler.
				 */
				onExternalLinkClick: function() {
					var value = this.get("ExternalURL");
					return (!Ext.isEmpty(value) && window.open(value, "_blank"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#CampaignDiagramPropertyEntityPage
				 */
				formLookupConfig: function(entity) {
					var config = this.callParent(arguments);
					return this.Ext.apply(config, {
						Type: entity.get("Type")
					});
				},

				/**
				 * Returns link object.
				 * @return {Object}
				 */
				getLink: function(value) {
					if (Terrasoft.isUrl(value)) {
						return {
							url: value,
							caption: value
						};
					}
				},

				/**
				 * @inheritdoc Terrasoft.CampaignDiagramPropertyEntityPage#getCustomLookupFilters
				 * @overridden
				 */
				getCustomLookupFilters: function() {
					if (this.getIsFeatureEnabled("OutboundCampaign")) {
						var diagramElementInEdges = this.get("DiagramElementInEdges");
						if (!Ext.isEmpty(diagramElementInEdges)) {
							var filterGroup = this.Terrasoft.createFilterGroup();
							filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
							filterGroup.addItem(this.Terrasoft.createColumnInFilterWithParameters(
								"Type.SchemaUid.Name", [
									"EventTarget",
									"Lead"
								]));
							return filterGroup;
						}
					}
					return this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "CampaignDiagramPropertyDescriptionContainer"
				},
				{
					"operation": "merge",
					"name": "CampaignDiagramPropertyEntityMainContainer",
					"values": {
						"wrapClass": ["main", "fields-container"]
					}
				},
				{
					"operation": "insert",
					"name": "ExternalURL",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values": {
						"isRequired": false,
						"showValueAsLink": true,
						"controlConfig": {
							"enabled": false,
							"setValidationInfo": Terrasoft.emptyFn,
							"href": {"bindTo": "getExternalURLLink"},
							"linkclick": {"bindTo": "onExternalLinkClick"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "State",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values": {
						"controlConfig": {
							"enabled": false,
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


