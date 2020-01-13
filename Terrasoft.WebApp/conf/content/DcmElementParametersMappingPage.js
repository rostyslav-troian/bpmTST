Terrasoft.configuration.Structures["DcmElementParametersMappingPage"] = {innerHierarchyStack: ["DcmElementParametersMappingPage"], structureParent: "ProcessElementParametersMappingPage"};
define('DcmElementParametersMappingPageStructure', ['DcmElementParametersMappingPageResources'], function(resources) {return {schemaUId:'0351161e-e2ea-4da4-96f4-be1cf3a38619',schemaCaption: "DcmElementParametersMappingPage", parentSchemaName: "ProcessElementParametersMappingPage", schemaName:'DcmElementParametersMappingPage',parentSchemaUId:'bc4a6161-c85c-4690-9d1a-bd7639384cf4',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ProcessElementParametersMappingPage
 */
define("DcmElementParametersMappingPage", ["DcmElementParametersMappingPageResources",
	"ProcessSchemaUserTaskUtilities"],
		function() {

		return {
			methods: {
				/**
				 * @inheritdoc Terrasoft.ProcessElementParametersMappingPage#addItemsToFlowElementsGridRowCollection
				 * @overridden
				 */
				addItemsToFlowElementsGridRowCollection: function(collection, flowElement, item) {
					collection[flowElement.uId] = item;
				},

				/**
				 * @inheritdoc Terrasoft.ProcessElementParametersMappingPage#setFirstCollectionRowActive
				 * @overridden
				 */
				setFirstCollectionRowActive: function(collection) {
					var keys = collection.getKeys();
					this.set("ElementsGridActiveRow", keys[0]);
				},

				/**
				 * @inheritdoc Terrasoft.ProcessElementParametersMappingPage#loadActiveRowParametersCollection
				 * @overridden
				 */
				loadActiveRowParametersCollection: function(elementRow) {
					var elementId = elementRow.get("Id");
					this.getParametersGridRowCollection(elementId, function(collection) {
						this.loadParametersGrid(collection);
					}, this);
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "ProcessElementsGrid",
					"values": {
						"primaryColumnName": "Id"
					}
				}
			]
		};
	});


