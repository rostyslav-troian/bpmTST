Terrasoft.configuration.Structures["AccountAnniversaryDetailV2"] = {innerHierarchyStack: ["AccountAnniversaryDetailV2"], structureParent: "BaseAnniversaryDetailV2"};
define('AccountAnniversaryDetailV2Structure', ['AccountAnniversaryDetailV2Resources'], function(resources) {return {schemaUId:'db1a680c-dc79-4e0f-b51e-1c89d5c934b2',schemaCaption: "Account noteworthy event detail", parentSchemaName: "BaseAnniversaryDetailV2", schemaName:'AccountAnniversaryDetailV2',parentSchemaUId:'16c044af-7997-4644-a186-c00904d66f11',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountAnniversaryDetailV2", [], function() {
	return {
		entitySchemaName: "AccountAnniversary",
		methods: {

			/**
			 * ########## ### ####### ### ########## ## #########.
			 * @overridden
			 * @return {String} ### #######.
			 */
			getFilterDefaultColumnName: function() {
				return "AnniversaryType";
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


