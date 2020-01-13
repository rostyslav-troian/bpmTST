Terrasoft.configuration.Structures["AccountsSearchResultDetailV2"] = {innerHierarchyStack: ["AccountsSearchResultDetailV2"], structureParent: "SimilarSearchResultDetailV2"};
define('AccountsSearchResultDetailV2Structure', ['AccountsSearchResultDetailV2Resources'], function(resources) {return {schemaUId:'5de2c4af-97c2-4f9b-98f7-9e3aea46e665',schemaCaption: "Similar accounts search result", parentSchemaName: "SimilarSearchResultDetailV2", schemaName:'AccountsSearchResultDetailV2',parentSchemaUId:'01bdebca-4b1f-450b-a66a-5ac016897646',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountsSearchResultDetailV2", ["AccountsSearchResultDetailV2Resources", "ConfigurationEnums",
	"LookupUtilities", "GridUtilitiesV2"],
		function() {
			return {
				entitySchemaName: "Account",
				messages: {
					"GetSearchButtonEnabled": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {

					/**
					 * ############## ######### ######## ######.
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.setSearchButtonEnabled();
					},

					/**
					 * ##### ######## ######## ########## ######.
					 */
					setSearchButtonEnabled: function() {
						var result = this.sandbox.publish("GetSearchButtonEnabled", null, [this.sandbox.id]);
						if (Ext.isEmpty(result.value)) {
							this.set("IsSearchButtonEnabled", false);
						}
					}

				}
			};
		}
);


