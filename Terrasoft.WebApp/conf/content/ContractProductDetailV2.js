Terrasoft.configuration.Structures["ContractProductDetailV2"] = {innerHierarchyStack: ["ContractProductDetailV2"], structureParent: "BaseGridDetailV2"};
define('ContractProductDetailV2Structure', ['ContractProductDetailV2Resources'], function(resources) {return {schemaUId:'efd6a229-77ca-47f5-a242-9d49d9e741f7',schemaCaption: "Product in contract", parentSchemaName: "BaseGridDetailV2", schemaName:'ContractProductDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContractProductDetailV2", ["terrasoft", "ProductInContractUtilitiesV2", "ConfigurationEnums"],
		function(Terrasoft, PICUtilities, ConfigurationEnums) {
			return {
				entitySchemaName: "OrderProduct",
				messages: {
					/**
					 * @message CalcAmount
					 * ######## ######## # ############# ######### #####.
					 */
					"CalcAmount": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetPageInfo
					 * ########## ########## # ########.
					 * @param {Object} ########## # ########.
					 */
					"GetPageInfo": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {},
				methods: {
					deleteLink: function() {
						this.showBodyMask();
						var selectedRows = this.getSelectedItems();
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "OrderProduct"
						});
						update.filters.add("ProductsFilter",
						Terrasoft.createColumnInFilterWithParameters("Id", selectedRows));
						update.setParameterValue("Contract", null, this.Terrasoft.DataValueType.GUID);
						this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
							function(returnCode) {
								if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									update.execute(function() {
										this.hideBodyMask();
										this.set("ActiveRow", null);
										this.set("SelectedRow", null);
										this.reloadGridData();
										this.sandbox.publish("CalcAmount");
									}, this);
								} else {
									this.hideBodyMask();
								}
							},
							[this.Terrasoft.MessageBoxButtons.YES.returnCode,
								this.Terrasoft.MessageBoxButtons.NO.returnCode]);
					},

					/**
					 * ######### ######## # ######### ########### ###### ############## ######.
					 * @protected
					 * @virtual
					 * @param {BaseViewModelCollection} toolsButtonMenu ######### ###########
					 * ###### ############## ######.
					 */
					addToolsButtonMenuItems: function(toolsButtonMenu) {
						toolsButtonMenu.addItem(this.getButtonMenuSeparator());
						toolsButtonMenu.addItem(this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
							Click: {"bindTo": "deleteLink"},
							Enabled: {"bindTo": "getSelectedItems"}
						}));
						this.addGridOperationsMenuItems(toolsButtonMenu);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecord
					 * @overridden
					 */
					addRecord: function() {
						var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
						var isNew = (cardState.state === ConfigurationEnums.CardStateV2.ADD ||
							cardState.state === ConfigurationEnums.CardStateV2.COPY);
						if (isNew) {
							this.sandbox.publish("SaveRecord", {
								isSilent: true,
								messageTags: [this.sandbox.id]
							}, [this.sandbox.id]);
						} else {
							this.openProductLookup();
						}
					},

					/**
					 * ######### ########## ######### ### ###### #######.
					 * @virtual
					 */
					openProductLookup: function() {
						var pageInfo = this.sandbox.publish("GetPageInfo", null, [this.sandbox.id]);
						var order = pageInfo.get("Order");
						var orderValue = this.Ext.isEmpty(order) ? this.Terrasoft.GUID_EMPTY : order.value;
						PICUtilities.openProductLookupToLink(orderValue, pageInfo.get("Id"),
							function() {
								this.updateDetail({detail: "Product", reloadAll: true});
								this.sandbox.publish("CalcAmount");
							}, this);
					},

					/**
					 * ########## ####### ######### ########## # ####### ######.
					 * @inheritdoc BaseGridDetailV2#onCardSaved
					 * @overridden
					 */
					onCardSaved: function() {
						this.openProductLookup();
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"type": "listed",
							"listedConfig": {
								"name": "DataGridListedConfig",
								"items": [
									{
										"name": "NameListedGridColumn",
										"bindTo": "Name",
										"position": {
											"column": 1,
											"colSpan": 12
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "QuantityListedGridColumn",
										"bindTo": "Quantity",
										"position": {
											"column": 13,
											"colSpan": 6
										}
									},
									{
										"name": "TotalAmountListedGridColumn",
										"bindTo": "TotalAmount",
										"position": {
											"column": 19,
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
										"name": "NameTiledGridColumn",
										"bindTo": "Name",
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 16
										},
										"type": Terrasoft.GridCellType.TITLE
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
										"name": "PriceTiledGridColumn",
										"bindTo": "Price",
										"position": {
											"row": 2,
											"column": 1,
											"colSpan": 8
										}
									},
									{
										"name": "DiscountPercentTiledGridColumn",
										"bindTo": "DiscountPercent",
										"position": {
											"row": 2,
											"column": 9,
											"colSpan": 8
										}
									},
									{
										"name": "TotalAmountTiledGridColumn",
										"bindTo": "TotalAmount",
										"position": {
											"row": 2,
											"column": 17,
											"colSpan": 8
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


