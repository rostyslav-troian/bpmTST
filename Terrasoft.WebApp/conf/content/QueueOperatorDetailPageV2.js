Terrasoft.configuration.Structures["QueueOperatorDetailPageV2"] = {innerHierarchyStack: ["QueueOperatorDetailPageV2"], structureParent: "BasePageV2"};
define('QueueOperatorDetailPageV2Structure', ['QueueOperatorDetailPageV2Resources'], function(resources) {return {schemaUId:'706176bf-a0ad-4703-b905-4f908020f829',schemaCaption: "Detail card schema - Queue agent", parentSchemaName: "BasePageV2", schemaName:'QueueOperatorDetailPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("QueueOperatorDetailPageV2", [], function() {
	return {
		entitySchemaName: "QueueOperator",
		methods: {
			/**
			 * @inheritdoc Terrasoft.BasePageV2#getDefaultValues
			 * @overridden
			 */
			getDefaultValues: function() {
				var defValues = this.callParent(arguments);
				defValues.push({
						name: "Active",
						value: true
					});
				return defValues;
			},

			/**
			 * @inheritdoc BasePageV2#initActionButtonMenu
			 * @overridden
			 */
			initActionButtonMenu: this.Terrasoft.emptyFn
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Operator",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Operator",
					"enabled": false,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "Active",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Active",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


