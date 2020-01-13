Terrasoft.configuration.Structures["ActivityCategoryResultEntryDetailV2"] = {innerHierarchyStack: ["ActivityCategoryResultEntryDetailV2"], structureParent: "ManyToManyRelationsDetail"};
define('ActivityCategoryResultEntryDetailV2Structure', ['ActivityCategoryResultEntryDetailV2Resources'], function(resources) {return {schemaUId:'5191ac44-de3a-4944-bada-5c6918b3d373',schemaCaption: "ActivityCategoryResultEntryDetailV2", parentSchemaName: "ManyToManyRelationsDetail", schemaName:'ActivityCategoryResultEntryDetailV2',parentSchemaUId:'cd7211de-18a9-4f6f-951c-e36055b849a2',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ActivityCategoryResultEntryDetailV2", [],
	function() {
		return {
			entitySchemaName: "ActivityCategoryResultEntry",

			attributes: {
				"MasterDetailColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "ActivityResult"
				},
				
				"RelatedDetailColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "ActivityCategory"
				},
				
				"LookupEntityName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "ActivityCategory"
				}
			},

			messages: {},
			methods: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


