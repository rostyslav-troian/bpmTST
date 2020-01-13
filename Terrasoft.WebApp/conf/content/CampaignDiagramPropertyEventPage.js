Terrasoft.configuration.Structures["CampaignDiagramPropertyEventPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyEventPage"], structureParent: "CampaignDiagramPropertyEntityPage"};
define('CampaignDiagramPropertyEventPageStructure', ['CampaignDiagramPropertyEventPageResources'], function(resources) {return {schemaUId:'8e3f9a10-4f04-484f-a630-8201a35ebe96',schemaCaption: "CampaignDiagramPropertyEventPage", parentSchemaName: "CampaignDiagramPropertyEntityPage", schemaName:'CampaignDiagramPropertyEventPage',parentSchemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyEventPage", ["CampaignDiagramPropertyEventPageResources", "terrasoft"],
		function() {
			return {
				entitySchemaName: "Event",
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
							"StartDate",
							"EndDate",
							"Type",
							"Owner"
						];
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
						"name": "StartDate",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false
							}
						}
					},
					{
						"operation": "insert",
						"name": "EndDate",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false
							},
							"isRequired": false
						}
					},
					{
						"operation": "insert",
						"name": "Type",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
							"controlConfig": {
								"enabled": false,
								"setValidationInfo": Terrasoft.emptyFn
							},
							"isRequired": false
						}
					},
					{
						"operation": "insert",
						"name": "Owner",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values":  {
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


