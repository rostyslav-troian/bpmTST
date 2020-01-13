Terrasoft.configuration.Structures["ContactsSearchResultDetailV2"] = {innerHierarchyStack: ["ContactsSearchResultDetailV2"], structureParent: "SimilarSearchResultDetailV2"};
define('ContactsSearchResultDetailV2Structure', ['ContactsSearchResultDetailV2Resources'], function(resources) {return {schemaUId:'1ef44fa2-f013-4435-b425-a2ef029e1638',schemaCaption: "Similar contacts search result", parentSchemaName: "SimilarSearchResultDetailV2", schemaName:'ContactsSearchResultDetailV2',parentSchemaUId:'01bdebca-4b1f-450b-a66a-5ac016897646',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactsSearchResultDetailV2", ["ContactsSearchResultDetailV2Resources", "ConfigurationEnums",
	"LookupUtilities", "GridUtilitiesV2"],
	function() {
		return {
			entitySchemaName: "Contact"
		};
	}
);


