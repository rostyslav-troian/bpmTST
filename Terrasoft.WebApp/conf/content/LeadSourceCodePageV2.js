Terrasoft.configuration.Structures["LeadSourceCodePageV2"] = {innerHierarchyStack: ["LeadSourceCodePageV2"], structureParent: "BasePageV2"};
define('LeadSourceCodePageV2Structure', ['LeadSourceCodePageV2Resources'], function(resources) {return {schemaUId:'e19cc4bf-19ea-4ba5-b11e-78ff98cfdb2a',schemaCaption: "Schema card: \"Lead source code\"", parentSchemaName: "BasePageV2", schemaName:'LeadSourceCodePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadSourceCodePageV2", [], function() {
	return {
		entitySchemaName: "LeadSourceCode",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Code",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1,
						"layoutName": "Header"
					}
				},
				"parentName": "Header",
				"propertyName": "items"
			}
		]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {}
	};
});


