Terrasoft.configuration.Structures["AddressSelectionResultDetailV2"] = {innerHierarchyStack: ["AddressSelectionResultDetailV2"], structureParent: "AddressSelectionDetailV2"};
define('AddressSelectionResultDetailV2Structure', ['AddressSelectionResultDetailV2Resources'], function(resources) {return {schemaUId:'d8032c62-6f7c-4a62-979e-073aea7b9de1',schemaCaption: "Addres selection detail on the dashboards tab", parentSchemaName: "AddressSelectionDetailV2", schemaName:'AddressSelectionResultDetailV2',parentSchemaUId:'d467715d-e1a1-4922-9f85-0132ca90ebfb',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AddressSelectionResultDetailV2", [],
	function() {
		return {
			entitySchemaName: "VwClientAddress",
			methods: {
				/**
				 * @inheritdoc Terrasoft.AddressSelectionDetailV2#getContainerListEl
				 * @overridden
				 */
				getContainerListEl: function() {
					return this.Ext.get("ResultsAddressContainerContainerList");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "AddressContainer",
					"values": {"id": "ResultsAddressContainerContainerList"}
				}
			]/**SCHEMA_DIFF*/
		};
	});


