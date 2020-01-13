Terrasoft.configuration.Structures["OpportunityProductDetailV2"] = {innerHierarchyStack: ["OpportunityProductDetailV2"], structureParent: "BaseGridDetailV2"};
define('OpportunityProductDetailV2Structure', ['OpportunityProductDetailV2Resources'], function(resources) {return {schemaUId:'8567b9b8-fee5-4cdf-b7c8-6229f4682222',schemaCaption: "OpportunityProductDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'OpportunityProductDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunityProductDetailV2", [],
	function() {
		return {
			entitySchemaName: "OpportunityProductInterest",
			attributes: {},
			methods: {
				/**
				 * ############# ######## ## ######### ### ######### # ##### ######.
				 * @overridden
				 */
				addRecord: function() {
					var defValues = this.get("DefaultValues") || [];
					defValues.push({
						name: "Quantity",
						value: 1
					});
					defValues.push({
						name: "OfferDate",
						value: new Date()
					});
					this.set("DefaultValues", defValues);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Product";
				},

				getGridDataColumns: function() {
					return {
						"Product.Name": {path:  "Product.Name"}
					};
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"primaryDisplayColumnName": "Product.Name",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "ProductListedGridColumn",
									"bindTo": "Product",
									"position": {
										"column": 1,
										"colSpan": 12
									}
								},
								{
									"name": "QuantityListedGridColumn",
									"bindTo": "Quantity",
									"position": {
										"column": 13,
										"colSpan": 4
									}
								},
								{
									"name": "OfferResultListedGridColumn",
									"bindTo": "OfferResult",
									"position": {
										"column": 17,
										"colSpan": 6
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 3
							},
							"items": [
								{
									"name": "ProductTiledGridColumn",
									"bindTo": "Product",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 16
									}
								},
								{
									"name": "QuantityTiledGridColumn",
									"bindTo": "Quantity",
									"position": {
										"row": 1,
										"column": 17,
										"colSpan": 8
									}
								},
								{
									"name": "OfferDateTiledGridColumn",
									"bindTo": "OfferDate",
									"position": {
										"row": 2,
										"column": 1,
										"colSpan": 12
									}
								},
								{
									"name": "OfferResultTiledGridColumn",
									"bindTo": "OfferResult",
									"position": {
										"row": 2,
										"column": 13,
										"colSpan": 12
									}
								},
								{
									"name": "CommentTiledGridColumn",
									"bindTo": "Comment",
									"position": {
										"row": 3,
										"column": 1,
										"colSpan": 24
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


