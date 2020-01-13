Terrasoft.configuration.Structures["DetailProcessExecutingDetail"] = {innerHierarchyStack: ["DetailProcessExecutingDetail"], structureParent: "BaseProcessExecutingDetail"};
define('DetailProcessExecutingDetailStructure', ['DetailProcessExecutingDetailResources'], function(resources) {return {schemaUId:'3c432631-368b-4903-8b46-a872cbe3f702',schemaCaption: "DetailProcessExecutingDetail", parentSchemaName: "BaseProcessExecutingDetail", schemaName:'DetailProcessExecutingDetail',parentSchemaUId:'71054c1c-6f53-429a-8f1b-46c434111db8',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DetailProcessExecutingDetail", ["DetailProcessSettingsManager"], function() {
	return {
		methods: {
			/**
			 * @inheritdoc DataManagerGridUtilities#getEntitySchemaName
			 * @protected
			 * @overridden
			 */
			getEntitySchemaName: function() {
				return "ProcessInDetails";
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getProcessRunnerManager
			 * @protected
			 * @overridden
			 */
			getProcessRunnerManager: function() {
				return Terrasoft.DetailManager;
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getManagerName
			 * @protected
			 * @overridden
			 */
			getManagerName: function() {
				return "DetailProcessSettingsManager";
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getManagerItemName
			 * @protected
			 * @overridden
			 */
			getManagerItemName: function() {
				return "DetailProcessSettingsManagerItem";
			},

			/**
			 * @inheritdoc BaseProcessExecutingDetail#getIsParameterRequired
			 * @protected
			 * @overridden
			 */
			getIsParameterRequired: function() {
				return true;
			}
		}
	};
});


