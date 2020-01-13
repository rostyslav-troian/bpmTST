Terrasoft.configuration.Structures["SectionProcessExecutingDetail"] = {innerHierarchyStack: ["SectionProcessExecutingDetail"], structureParent: "BaseProcessExecutingDetail"};
define('SectionProcessExecutingDetailStructure', ['SectionProcessExecutingDetailResources'], function(resources) {return {schemaUId:'f6206119-26be-492e-8781-64485e0d458b',schemaCaption: "Section process executing detail", parentSchemaName: "BaseProcessExecutingDetail", schemaName:'SectionProcessExecutingDetail',parentSchemaUId:'71054c1c-6f53-429a-8f1b-46c434111db8',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class Terrasoft.SectionProcessExecutingDetail
 * @extends Terrasoft.BaseProcessExecutingDetail
 */
define("SectionProcessExecutingDetail", ["SectionProcessSettingsManager"], function() {
	return {
		methods: {
			/**
			 * @inheritdoc DataManagerGridUtilities#getEntitySchemaName
			 * @override
			 */
			getEntitySchemaName: function() {
				return "ProcessInModules";
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getProcessRunnerManager
			 * @override
			 */
			getProcessRunnerManager: function() {
				return Terrasoft.SectionManager;
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getManagerName
			 * @override
			 */
			getManagerName: function() {
				return "SectionProcessSettingsManager";
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getManagerItemName
			 * @override
			 */
			getManagerItemName: function() {
				return "SectionProcessSettingsManagerItem";
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getIsParameterRequired
			 * @override
			 */
			getIsParameterRequired: function() {
				return false;
			}
		}
	};
});


