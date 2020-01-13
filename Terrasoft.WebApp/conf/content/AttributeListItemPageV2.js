Terrasoft.configuration.Structures["AttributeListItemPageV2"] = {innerHierarchyStack: ["AttributeListItemPageV2"], structureParent: "BasePageV2"};
define('AttributeListItemPageV2Structure', ['AttributeListItemPageV2Resources'], function(resources) {return {schemaUId:'8cf8735b-4106-4c27-a326-2e82ffd01a7e',schemaCaption: "Attributes list - Item card", parentSchemaName: "BasePageV2", schemaName:'AttributeListItemPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AttributeListItemPageV2", [],
	function() {
		return {
			entitySchemaName: "SiteEventAttrListItem",
			methods: {
				/**
				 *  ########## ###### ######### ######## ########, #### ##### ## ################ ## #######.
				 *  ####### ##### ######## # ####### ######!
				 * @returns {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########.
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
				{
					"operation": "merge",
					"name": "Tabs",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "SiteEventAttribute",
					"values": {
						"bindTo": "SiteEventAttribute",
						"layout": {"column": 0, "row": 0, "colSpan": 18},
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
						"caption": {"bindTo": "Resources.Strings.NameCaption"},
						"layout": {"column": 0, "row": 1, "colSpan": 18},
						"bindTo": "Name"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


