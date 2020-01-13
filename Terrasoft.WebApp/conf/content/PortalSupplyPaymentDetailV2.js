Terrasoft.configuration.Structures["PortalSupplyPaymentDetailV2"] = {innerHierarchyStack: ["PortalSupplyPaymentDetailV2"], structureParent: "SupplyPaymentDetailV2"};
define('PortalSupplyPaymentDetailV2Structure', ['PortalSupplyPaymentDetailV2Resources'], function(resources) {return {schemaUId:'e2030a45-5402-479e-b7a1-0a39c70e007d',schemaCaption: "Installment plan portal detail", parentSchemaName: "SupplyPaymentDetailV2", schemaName:'PortalSupplyPaymentDetailV2',parentSchemaUId:'efa63fa5-d3d2-404a-840e-62b884827a87',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalSupplyPaymentDetailV2", [],
	function() {
		return {
			entitySchemaName: "SupplyPaymentElement",
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseGridDetail#getAddTypedRecordButtonVisible
				 */
				getAddTypedRecordButtonVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilites#getCellControlsConfig
				 * @overridden
				 */
				getCellControlsConfig: function() {
					const controlsConfig = this.callParent(arguments);
					this.Ext.apply(controlsConfig, {
						enabled: false
					});
					return controlsConfig;
				}
			},
			diff: [
				{
					"operation": "remove",
					"name": "activeRowActionSave"
				},
				{
					"operation": "remove",
					"name": "activeRowActionOpenCard"
				},
				{
					"operation": "remove",
					"name": "activeRowActionCancel"
				},
				{
					"operation": "remove",
					"name": "activeRowActionRemove"
				}
			]
		};
	}
);


