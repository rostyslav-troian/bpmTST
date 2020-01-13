Terrasoft.configuration.Structures["EmailFileDetailV2"] = {innerHierarchyStack: ["EmailFileDetailV2"], structureParent: "FileDetailV2"};
define('EmailFileDetailV2Structure', ['EmailFileDetailV2Resources'], function(resources) {return {schemaUId:'b9956976-1ff5-4352-9534-ad87ca7eea04',schemaCaption: "Files detail for Email page", parentSchemaName: "FileDetailV2", schemaName:'EmailFileDetailV2',parentSchemaUId:'0c43958a-a409-47bc-a3cb-9bc32451a45a',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmailFileDetailV2", [], function() {
	return {
		methods: {

			/**
			 * @inheritdoc Terrasoft.FileDetailV2#getAddLinkMenuItem
			 * @overridden
			 */
			getAddLinkMenuItem: Terrasoft.emptyFn

		},
		diff: /**SCHEMA_DIFF*/[
		]/**SCHEMA_DIFF*/
	};
});


