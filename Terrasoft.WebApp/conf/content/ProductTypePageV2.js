Terrasoft.configuration.Structures["ProductTypePageV2"] = {innerHierarchyStack: ["ProductTypePageV2"], structureParent: "BasePageV2"};
define('ProductTypePageV2Structure', ['ProductTypePageV2Resources'], function(resources) {return {schemaUId:'6e7ef70e-e2fb-476c-a163-d7fa9038b681',schemaCaption: "Product type page", parentSchemaName: "BasePageV2", schemaName:'ProductTypePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductTypePageV2", [],
	function() {
		return {
			entitySchemaName: "ProductType",
			methods: {
				/**
				 *  ########## ###### ######### ######## ########, #### ##### ## ################ ## #######.
				 *  ####### ##### ######## # ####### ######
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
			details: /**SCHEMA_DETAILS*/{
				ProductFilterDetail: {
					schemaName: "ProductFilterDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "ProductType"
					}
				}
			}/**SCHEMA_DETAILS*/,
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
					"name": "Name",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Category",
					"values": {
						"bindTo": "Category",
						"layout": {"column": 0, "row": 1, "colSpan": 18},
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
						"layout": {"column": 0, "row": 2, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ProductFilterDetail",
					"values": {
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


