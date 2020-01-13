Terrasoft.configuration.Structures["DocumentProductPageV2"] = {innerHierarchyStack: ["DocumentProductPageV2"], structureParent: "BaseProductDetailPageV2"};
define('DocumentProductPageV2Structure', ['DocumentProductPageV2Resources'], function(resources) {return {schemaUId:'a6263d9d-c675-42e6-986f-15c415fbe809',schemaCaption: "DocumentProductPageV2", parentSchemaName: "BaseProductDetailPageV2", schemaName:'DocumentProductPageV2',parentSchemaUId:'b906bd19-865d-474e-a613-f0506ca21e4b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DocumentProductPageV2", [],
function() {
	return {
		entitySchemaName: "DocumentProduct",
		attributes: {
			"Document": {
				lookupListConfig: {
					columns: ["CurrencyRate", "Currency", "Currency.Division"]
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{
		}/**SCHEMA_DETAILS*/,
		methods: {
			/**
			 * ############# ######## ### ########## ########
			 * @protected
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.set("ProductEntryMasterRecord", this.get("Document"));
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Document",
				"parentName": "BaseGeneralInfoBlock",
				"propertyName": "items",
				"values": {
					"bindTo": "Document",
					"enabled": false,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


