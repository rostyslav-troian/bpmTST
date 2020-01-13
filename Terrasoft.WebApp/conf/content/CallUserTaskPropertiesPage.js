Terrasoft.configuration.Structures["CallUserTaskPropertiesPage"] = {innerHierarchyStack: ["CallUserTaskPropertiesPage"], structureParent: "BaseActivityUserTaskPropertiesPage"};
define('CallUserTaskPropertiesPageStructure', ['CallUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'886b457b-80ec-4df0-9d0a-60747a925335',schemaCaption: "CallUserTaskPropertiesPage", parentSchemaName: "BaseActivityUserTaskPropertiesPage", schemaName:'CallUserTaskPropertiesPage',parentSchemaUId:'29d2ae27-fd0e-4847-acbc-58d964011393',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Edit page schema of process element Call user task.
 * Parent: BaseActivityUserTaskPropertiesPage
 */
define("CallUserTaskPropertiesPage", [], function() {
	return {
		methods: {
			/**
			 * @inheritDoc ProcessFlowElementPropertiesPage#getResultParameterAllValues
			 * @overridden
			 */
			getResultParameterAllValues: function(callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ActivityCategoryResultEntry"
				});
				esq.addColumn("ActivityResult.Id", "ActivityResultId");
				esq.addColumn("ActivityResult.Name", "ActivityResultName");
				var filter = esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"ActivityCategory.ActivityType.Code", "Call", this.Terrasoft.DataValueType.TEXT);
				esq.filters.add("CodeFilter", filter);
				esq.execute(function(result) {
					var resultParameterValues = {};
					if (result.success === true) {
						result.collection.each(function(item) {
							var id = item.get("ActivityResultId");
							var name = item.get("ActivityResultName");
							resultParameterValues[id] = name;
						});
					}
					callback.call(scope, resultParameterValues);
				});
			}
		},
		diff: []
	};
});


