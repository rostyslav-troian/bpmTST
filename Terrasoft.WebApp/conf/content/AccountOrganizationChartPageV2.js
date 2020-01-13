Terrasoft.configuration.Structures["AccountOrganizationChartPageV2"] = {innerHierarchyStack: ["AccountOrganizationChartPageV2"], structureParent: "BasePageV2"};
define('AccountOrganizationChartPageV2Structure', ['AccountOrganizationChartPageV2Resources'], function(resources) {return {schemaUId:'c2c92beb-5de2-4f50-a057-e1bb7e19dd81',schemaCaption: "AccountOrganizationChartPageV2", parentSchemaName: "BasePageV2", schemaName:'AccountOrganizationChartPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountOrganizationChartPageV2", [],
function() {
	return {
		entitySchemaName: "AccountOrganizationChart",
		attributes: {
			"Manager": {
				lookupListConfig: {
					columns: ["Name", "Account"],
					filter: function() {
						return  Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL,
							"[ContactCareer:Contact].Account", this.get("Account").value);
					}
				}
			},
			"CustomDepartmentName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				dependencies: [
					{
						columns: ["Department"],
						methodName: "onDepartmentChange"
					}
				]
			}
		},
		details: /**SCHEMA_DETAILS*/{
		}/**SCHEMA_DETAILS*/,
		methods: {
			/** ########## ############# ########## ############ ####### ###########
			 * @private
			 * @return {bool} ######### true, #### ############ ####### Parent #########
			 */
			isParentVisible: function() {
				return !this.Ext.isEmpty(this.get("Parent"));
			},

			/**
			 * ############# ### ############# ######### ############
			 * @private
			 */
			onDepartmentChange: function() {
				var department = this.get("Department");
				var departmentValue = this.Ext.isEmpty(department) ? null : department.displayValue;
				this.set("CustomDepartmentName", departmentValue);
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
				"values": {
					"name": "AccountOrganizationChartPageGeneralBlock",
					"itemType": 0,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"name": "Account",
					"bindTo": "Account",
					"enabled": false,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"name": "Parent",
					"bindTo": "Parent",
					"enabled": false,
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12
					},
					"visible": { "bindTo": "isParentVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"name": "CustomDepartmentName",
					"bindTo": "CustomDepartmentName",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"name": "Department",
					"bindTo": "Department",
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"name": "Manager",
					"bindTo": "Manager",
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"name": "Description",
					"bindTo": "Description",
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 24,
						"rowSpan": 5
					},
					"contentType": Terrasoft.ContentType.LONG_TEXT
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


