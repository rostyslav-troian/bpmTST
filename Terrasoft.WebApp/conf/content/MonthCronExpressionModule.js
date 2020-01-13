Terrasoft.configuration.Structures["MonthCronExpressionModule"] = {innerHierarchyStack: ["MonthCronExpressionModule"], structureParent: "MonthlyCronExpressionPage"};
define('MonthCronExpressionModuleStructure', ['MonthCronExpressionModuleResources'], function(resources) {return {schemaUId:'6777f954-f085-4cb6-a943-8e1636d19148',schemaCaption: "MonthCronExpressionModule", parentSchemaName: "MonthlyCronExpressionPage", schemaName:'MonthCronExpressionModule',parentSchemaUId:'720e4f30-51c2-439e-a91e-c75af04289fd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MonthCronExpressionModule", ["MonthCronExpressionModuleResources"], function() {
	return {
		attributes: {
		},
		methods: {
		},
		diff: [
			{
				"operation": "remove",
				"name": "MonthSectionTriggerTimerLabel"
			},
			{
				"operation": "remove",
				"name": "MonthPeriodTriggerTime"
			}
		]
	};
});


