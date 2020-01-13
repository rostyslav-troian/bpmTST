Terrasoft.configuration.Structures["SiteEventAttributePageV2"] = {innerHierarchyStack: ["SiteEventAttributePageV2"], structureParent: "BasePageV2"};
define('SiteEventAttributePageV2Structure', ['SiteEventAttributePageV2Resources'], function(resources) {return {schemaUId:'747088a0-3e50-40c0-87f3-b353b3bba374',schemaCaption: "Attribute card - Website event", parentSchemaName: "BasePageV2", schemaName:'SiteEventAttributePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SiteEventAttributePageV2", ["SiteEventConstants", "SiteEventAttributeDetailV2"],
	function(SiteEventConstants) {
		return {
			entitySchemaName: "SiteEventAttribute",
			methods: {
				/**
				 * ########## ######### ###### "###### ########" ## #### ######## ########
				 * @returns {boolean} ########## true,
				 * #### ###### #### ###### ###### "###### ########".
				 */
				isValuesListVisible: function() {
					var attributeType = this.get("Type");
					return (!!attributeType &&
						attributeType.value === SiteEventConstants.AttributeTypes.ListType);
				},

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
				},

				/**
				 * ############## ######## ##############.
				 * @protected
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("CanUserEditType", this.isNewMode());
				}
			},
			details: /**SCHEMA_DETAILS*/{
				AttributeListItemDetail: {
					schemaName: "AttributeListItemDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "SiteEventAttribute"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "ViewOptionsButton"
				},
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
					"name": "Name",
					"values": {
						"layout": { "column": 0, "row": 0, "colSpan": 18 }
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Type",
					"values": {
						"bindTo": "Type",
						"enabled": {"bindTo" : "CanUserEditType"},
						"layout": { "column": 0, "row": 1, "colSpan": 18 },
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Description",
					"values": {
						"bindTo": "Description",
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": { "column": 0, "row": 2, "colSpan": 18 }
					}
				},
				{
					"operation": "insert",
					"name": "DetailControlGroup",
					"parentName": "Headers",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"controlConfig": {
							"collapsed": false,
							"visible": {"bindTo" : "isValuesListVisible"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "DetailControlGroup",
					"propertyName": "items",
					"name": "AttributeListItemDetail",
					"values": {
						"layout": { "column": 0, "row": 4, "colSpan": 24 },
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


