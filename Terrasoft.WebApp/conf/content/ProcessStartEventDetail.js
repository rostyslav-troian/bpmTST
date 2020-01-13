Terrasoft.configuration.Structures["ProcessStartEventDetail"] = {innerHierarchyStack: ["ProcessStartEventDetail"], structureParent: "BaseProcessSettingDetailV2"};
define('ProcessStartEventDetailStructure', ['ProcessStartEventDetailResources'], function(resources) {return {schemaUId:'b8de263a-d4a7-44e8-b86c-c3b73d2815b0',schemaCaption: "ProcessStartEventDetail", parentSchemaName: "BaseProcessSettingDetailV2", schemaName:'ProcessStartEventDetail',parentSchemaUId:'550e7a82-2e5e-442a-90d2-0008616e822e',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessStartEventDetail", function() {
	return {
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseProcessSettingDetailV2#getProcessElementCaptionColumnsConfig
			 * @override
			 */
			getProcessElementCaptionColumnsConfig: function() {
				return {
					detailColumn: "ElementName",
					processElementUIdColumn: "ProcessElementUId"
				};
			}
		}
	};
});

