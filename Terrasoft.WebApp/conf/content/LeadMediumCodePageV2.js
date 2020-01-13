Terrasoft.configuration.Structures["LeadMediumCodePageV2"] = {innerHierarchyStack: ["LeadMediumCodePageV2"], structureParent: "BasePageV2"};
define('LeadMediumCodePageV2Structure', ['LeadMediumCodePageV2Resources'], function(resources) {return {schemaUId:'a188eb31-517d-47f4-b5dd-ab08d2b04107',schemaCaption: "Schema card: \"Lead channel code\"", parentSchemaName: "BasePageV2", schemaName:'LeadMediumCodePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadMediumCodePageV2", function() {
	return {
		entitySchemaName: "LeadMediumCode",
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


