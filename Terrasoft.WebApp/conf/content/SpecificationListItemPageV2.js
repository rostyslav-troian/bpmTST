Terrasoft.configuration.Structures["SpecificationListItemPageV2"] = {innerHierarchyStack: ["SpecificationListItemPageV2"], structureParent: "BasePageV2"};
define('SpecificationListItemPageV2Structure', ['SpecificationListItemPageV2Resources'], function(resources) {return {schemaUId:'e148c1c0-de75-4e5e-ac0d-9844c5ad398c',schemaCaption: "Card - Feature item in feature", parentSchemaName: "BasePageV2", schemaName:'SpecificationListItemPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
// D9 Team
define("SpecificationListItemPageV2", [],
	function() {
		return {
			entitySchemaName: "SpecificationListItem",
			methods: {
				/**
				 *  ########## ###### ######### ######## ########, #### ##### ## ################ ## #######
				 *  ####### ##### ######## # ####### ######
				 * @returns {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########
				 */
				getActions: function() {
					var parentActions = this.callParent(arguments);
					if (parentActions && !this.getSchemaAdministratedByRecords()) {
						parentActions.clear();
					}
					return parentActions;
				}
			},
			diff: /**SCHEMA_DIFF*/[
// Tabs
				{
					"operation": "merge",
					"name": "Tabs",
					"values": {
						"visible": false
					}
				},
// Columns
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Specification",
					"values": {
						"bindTo": "Specification",
						"layout": { "column": 0, "row": 0, "colSpan": 18 },
						"enabled": false,
						"controlConfig": {
							"enableRightIcon": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"caption": { "bindTo": "Resources.Strings.NameCaption" },
						"layout": { "column": 0, "row": 1, "colSpan": 18 },
						"bindTo": "Name"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


