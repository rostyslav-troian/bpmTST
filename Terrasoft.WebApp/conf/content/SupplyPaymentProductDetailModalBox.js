Terrasoft.configuration.Structures["SupplyPaymentProductDetailModalBox"] = {innerHierarchyStack: ["SupplyPaymentProductDetailModalBox"]};
define('SupplyPaymentProductDetailModalBoxStructure', ['SupplyPaymentProductDetailModalBoxResources'], function(resources) {return {schemaUId:'dea00993-6141-49d6-bb3e-7262a644c267',schemaCaption: "Detail schema - Installment plan products in modal window ", parentSchemaName: "", schemaName:'SupplyPaymentProductDetailModalBox',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SupplyPaymentProductDetailModalBox", ["ConfigurationGrid", "ConfigurationGridGenerator",
		"ConfigurationGridUtilities", "css!SummaryModuleV2"], function() {
	return {
		entitySchemaName: "VwSupplyPaymentProduct",
		mixins: {
			ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities",
			GridUtilities: "Terrasoft.GridUtilities"
		},
		messages: {
			/**
			 * ############ ### ########## ####### ###### ####### ######## # #####.
			 */
			"ReloadSupplyPaymentGridData": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * ####### ############### #######.
			 */
			IsEditable: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * ########### ###### ####.
			 */
			MinWidth: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 820
			},

			/**
			 * ########### ###### ####.
			 */
			MinHeight: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 50
			},

			/**
			 * ############ ###### ########## #######.
			 */
			MaxGridHeight: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 450
			},

			/**
			 * ######## ######## #####.
			 */
			TotalAmount: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: ""
			}
		},
		methods: {
			/**
			 * ############## ######### ###### ############# #######.
			 * @protected
			 * @param {Function} callback #######, ####### ##### ####### ##### #############.
			 * @param {Object} scope ######## ##########.
			 */
			initData: function(callback, scope) {
				this.set("Collection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				this.initGridRowViewModel(function() {
					this.initGridData();
					this.mixins.GridUtilities.init.call(this);
					this.loadGridData();
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getCellControlsConfig
			 * @overridden
			 */
			getCellControlsConfig: function(entitySchemaColumn) {
				var config = this.mixins.ConfigurationGridUtilites.getCellControlsConfig.apply(this, arguments);
				if (entitySchemaColumn.name === "MaxQuantity") {
					this.Ext.apply(config, {
						controlConfig: {
							tips: [{
								tip: {
									content: this.get("Resources.Strings.AvailableFieldHint"),
									displayMode: this.Terrasoft.TipDisplayMode.NARROW
								},
								settings: {
									alignEl: "disabledElIconEl"
								}
							}]
						}
					});
				}
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getDefaultConfigurationGridItemSchemaName
			 * @overridden
			 */
			getDefaultConfigurationGridItemSchemaName: function() {
				return "SupplyPaymentProductPageV2";
			},

			/**
			 * ########## ######### #######.
			 * @protected
			 * @return {Object}
			 */
			getGridData: function() {
				return this.get("Collection");
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.initEditPages();
				this.callParent([function() {
					this.initData(function() {
						callback.call(scope);
					}, this);
				}, this]);
			},

			/**
			 * ######### ############# ######## ## ######### ### ###### ## #######.
			 * @protected
			 * @virtual
			 */
			initGridData: function() {
				this.set("ActiveRow", "");
				this.set("IsEditable", true);
				this.set("MultiSelect", false);
				this.set("IsPageable", false);
				this.set("IsClearGridData", false);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#loadGridData
			 * @overridden
			 */
			loadGridData: function() {
				if (!this.get("IsDetailCollapsed") && !this.get("IsGridLoading")) {
					this.set("IsGridLoading", true);
					this.mixins.GridUtilities.loadGridData.call(this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getFilters
			 * @overridden
			 */
			getFilters: function() {
				var filters = this.mixins.GridUtilities.getFilters.call(this);
				if (filters) {
					var moduleInfo = this.getModuleInfo();
					var supplyPaymentElementId = moduleInfo && moduleInfo.supplyPaymentElementId;
					if (supplyPaymentElementId) {
						filters.add("supplyPaymentElementFilter",
							this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "SupplyPaymentElement", supplyPaymentElementId
							)
						);
					}
					var notDistributedFiltersGroup = this.Ext.create("Terrasoft.FilterGroup");
					notDistributedFiltersGroup.logicalOperation =  Terrasoft.LogicalOperatorType.OR;
					notDistributedFiltersGroup.add("isNotDistributedFilter",
						this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "IsDistributed", 0
						)
					);
					notDistributedFiltersGroup.add("usedQuantityMoreZeroFilter",
						this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.GREATER, "UsedQuantity", 0
						)
					);
					filters.add(notDistributedFiltersGroup);
				}
				return filters;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getGridDataColumns
			 * @overridden
			 */
			getGridDataColumns: function() {
				var gridDataColumns = this.mixins.GridUtilities.getGridDataColumns(arguments);
				var requiredColumns = {
					OrderProduct: {path: "OrderProduct"}
				};
				return Ext.apply(gridDataColumns, requiredColumns);
			},

			/**
			 * ############## ###### ######### ######### #######.
			 * @protected
			 * @param {Function} callback callback-#######.
			 * @param {Object} scope ######## ##########.
			 */
			initGridRowViewModel: function(callback, scope) {
				this.initEditableGridRowViewModel(callback, scope);
			},

			/**
			 * ######## ##########, ########## ### ######## ######.
			 * @protected
			 * @return {Object} ######, ############ ####### ### ######## ###### ########## ####.
			 */
			getModuleInfo: function() {
				return this.get("moduleInfo");
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#getActiveRow
			 * @overridden
			 */
			getActiveRow: function() {
				var activeRow = null;
				var primaryColumnValue = this.get("ActiveRow");
				if (primaryColumnValue) {
					var gridData = this.getGridData();
					activeRow = gridData.find(primaryColumnValue) ? gridData.get(primaryColumnValue) : null;
				}
				return activeRow;
			},

			/**
			 * ######### ####### ########## #### ## ########### ###########.
			 * @private
			 * @return {Object} ######, ########## ########## # ###### # ###### ########## ####.
			 */
			getModalWindowSize: function() {
				var gridContainerEl = this.Ext.get("gridContainer");
				var fixedContainerEl = this.Ext.get("fixedAreaContainer");
				if (!gridContainerEl || !fixedContainerEl) {
					return null;
				}
				var totalHeight = fixedContainerEl.dom.clientHeight +
					Math.min(gridContainerEl.dom.clientHeight, this.get("MaxGridHeight")) + this.get("MinHeight");
				return {
					width: this.get("MinWidth"),
					height: totalHeight
				};
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onGridDataLoaded
			 * @overridden
			 */
			onGridDataLoaded: function() {
				this.mixins.GridUtilities.onGridDataLoaded.apply(this, arguments);
				this.recalculateTotalAmount();
				var modalWindowSize = this.getModalWindowSize();
				if (modalWindowSize) {
					this.updateSize(modalWindowSize.width, modalWindowSize.height);
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#prepareResponseCollectionItem
			 * @overridden
			 */
			prepareResponseCollectionItem: function(item) {
				this.mixins.GridUtilities.prepareResponseCollectionItem.apply(this, arguments);
				item.on("change:UsedAmount", this.recalculateTotalAmount, this);
			},

			/**
			 * ######## ######## #####.
			 * @private
			 */
			recalculateTotalAmount: function() {
				var totalAmount = 0;
				var gridData = this.getGridData();
				gridData.each(function(row) {
					totalAmount += row.get("UsedAmount") || 0;
				}, this);
				this.set("TotalAmount", this.Terrasoft.getFormattedNumberValue(totalAmount));
			},

			/**
			 * ########## ########## # ######### # ########## ###########.
			 * @protected
			 * @return {Object} ########## # ######### # ########## ###########.
			 */
			getChangedProductData: function() {
				var data = this.getGridData();
				var productsInfo = {};
				var isAnyRowChanged = false;
				data.each(function(row) {
					if (row.isChanged()) {
						var quantity = row.get("UsedQuantity");
						if (quantity !== 0 && !Boolean(quantity)) {
							quantity = 0;
							row.set("UsedQuantity", quantity);
						}
						isAnyRowChanged = true;
						var orderProduct = row.get("OrderProduct");
						if (orderProduct && orderProduct.value) {
							productsInfo[orderProduct.value] = quantity;
						}
					}
				}, this);
				return {
					productsInfo: productsInfo,
					isAnyRowChanged: isAnyRowChanged
				};
			},

			/**
			 * ######### ######### ########## #########.
			 * @protected
			 */
			saveChanges: function() {
				var moduleInfo = this.getModuleInfo();
				var supplyPaymentElementId = moduleInfo && moduleInfo.supplyPaymentElementId;
				var changedProductData = this.getChangedProductData();
				if (supplyPaymentElementId && changedProductData.isAnyRowChanged) {
					this.set("okButtonMaskVisible", true);
					this.saveChangesOnServer({
						supplyPaymentElementId: supplyPaymentElementId,
						productsInfo: changedProductData.productsInfo,
						callback: function() {
							this.sandbox.publish("ReloadSupplyPaymentGridData");
							this.closeWindow();
						},
						scope: this
					});
				} else {
					this.closeWindow();
				}
			},

			/**
			 * ######### ######### ########## ######### # ##.
			 * @protected
			 * @param {Object} config ###### ### ############ ####### ########## ########## ######### ## ######.
			 * ######## ######### #########:
			 * @param {GUID} config.supplyPaymentElementId
			 *   ############# ######## #### ####### ######## # #####.
			 * @param {Object} config.productsInfo
			 *   ######, ########## ########## ## ########## ######### # ## ##### ##########.
			 * @param {Function} config.callback
			 *   #######, ####### ##### ####### ##### ######### ###### ## #######.
			 * @param {Object} config.scope
			 *   ######## ##########.
			 */
			saveChangesOnServer: function(config) {
				this.callService({
					serviceName: "OrderPassportService",
					methodName: "UpdateSupplyPaymentProducts",
					data: {
						"updateRequest": {
							"supplyPaymentElementId": config.supplyPaymentElementId,
							"productsData": this.Terrasoft.encode(config.productsInfo)
						}
					}
				}, function(response) {
					this.set("okButtonMaskVisible", false);
					var result = response.UpdateSupplyPaymentProductsResult || {};
					if (!result.success) {
						this.showInformationDialog(result.errorInfo.message);
						this.reloadGridData();
					} else {
						config.callback.call(config.scope);
					}
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#onCtrlEnterKeyPressed
			 * @overridden
			 */
			onCtrlEnterKeyPressed: function() {
				var activeRow = this.getActiveRow();
				this.unfocusRowControls(activeRow);
				this.setActiveRow(null);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#onEnterKeyPressed
			 * @overridden
			 */
			onEnterKeyPressed: function() {
				var activeRow = this.getActiveRow();
				this.unfocusRowControls(activeRow);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#onTabKeyPressed
			 * @overridden
			 */
			onTabKeyPressed: function() {
				var activeRow = this.getActiveRow();
				this.currentActiveColumnName = this.getCurrentActiveColumnName(activeRow, this.columnsConfig);
				return true;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @overridden
			 */
			onRender: function() {
				var modalBoxInnerBoxEl = this.Ext.get(this.renderTo);
				if (modalBoxInnerBoxEl && this.Ext.isFunction(modalBoxInnerBoxEl.parent)) {
					var modalBoxEl = modalBoxInnerBoxEl.parent();
					if (modalBoxEl) {
						modalBoxEl.addCls("supply-payment-products-modal-box");
					}
				}
				this.updateSize(this.get("MinWidth"), this.get("MinHeight") + 50);
			},

			/**
			 * ########### ### ######## ########## ####.
			 * @protected
			 */
			closeWindow: function() {
				this.destroyModule();
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "gridContainer",
				"index": 0,
				"propertyName": "items",
				"values": {
					"id": "gridContainer",
					"selectors": {"wrapEl": "#gridContainer"},
					"wrapClass": ["grid-container"],
					"markerValue": "supplyPaymentGridContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DataGrid",
				"parentName": "gridContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
					"multiSelect": false,
					"rowDataItemMarkerColumnName": "OrderProduct",
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"listedZebra": true,
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"collection": {"bindTo": "Collection"},
					"activeRow": {"bindTo": "ActiveRow"},
					"primaryColumnName": "Id",
					"isEmpty": {"bindTo": "IsGridEmpty"},
					"isLoading": {"bindTo": "IsGridLoading"},
					"selectedRows": {"bindTo": "SelectedRows"},
					"type": "listed",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [
							{
								"name": "OrderProductListedGridColumn",
								"bindTo": "OrderProduct",
								"position": {"column": 1, "colSpan": 12}
							},
							{
								"name": "UsedQuantityListedGridColumn",
								"bindTo": "UsedQuantity",
								"position": {"column": 13, "colSpan": 4}
							},
							{
								"name": "MaxQuantityListedGridColumn",
								"bindTo": "MaxQuantity",
								"position": {"column": 17, "colSpan": 4}
							},
							{
								"name": "UsedAmountListedGridColumn",
								"bindTo": "UsedAmount",
								"position": {"column": 21, "colSpan": 4}
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {"columns": 24, "rows": 1},
						"items": [
							{
								"name": "OrderProductTiledGridColumn",
								"bindTo": "OrderProduct",
								"position": {"row": 1, "column": 1, "colSpan": 12}
							},
							{
								"name": "UsedQuantityTiledGridColumn",
								"bindTo": "UsedQuantity",
								"position": {"row": 1, "column": 13, "colSpan": 4}
							},
							{
								"name": "MaxQuantityTiledGridColumn",
								"bindTo": "MaxQuantity",
								"position": {"row": 1, "column": 17, "colSpan": 4}
							},
							{
								"name": "UsedAmountTiledGridColumn",
								"bindTo": "UsedAmount",
								"position": {"row": 1, "column": 21, "colSpan": 4}
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "fixedAreaContainer",
				"index": 1,
				"values": {
					"id": "fixedAreaContainer",
					"selectors": {"wrapEl": "#fixedAreaContainer"},
					"wrapClass": ["fixed-area-container"],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"name": "headContainer",
				"parentName": "fixedAreaContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "headContainer",
				"propertyName": "items",
				"name": "headerNameContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-name-container", "header-name-container-full"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "headContainer",
				"propertyName": "items",
				"name": "closeIconContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-name-container", "header-name-container-full"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "closeIconButton",
				"parentName": "closeIconContainer",
				"propertyName": "items",
				"values": {
					"click": {"bindTo": "closeWindow"},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"hint": {"bindTo": "Resources.Strings.CloseButtonHint"},
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"markerValue": "CloseIconButton",
					"classes": {"wrapperClass": ["close-btn-user-class"]},
					"selectors": {"wrapEl": "#headContainer"}
				}
			},
			{
				"operation": "insert",
				"parentName": "headerNameContainer",
				"propertyName": "items",
				"name": "HeaderLabel",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.HeaderCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "headerNameContainer",
				"propertyName": "items",
				"name": "HeaderLabelInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {"bindTo": "Resources.Strings.HeaderTip"}
				}
			},
			{
				"operation": "insert",
				"name": "buttonsContainer",
				"parentName": "fixedAreaContainer",
				"propertyName": "items",
				"values": {
					"id": "buttonsContainer",
					"selectors": {"wrapEl": "#buttonsContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "summaryItemContainer",
				"propertyName": "items",
				"parentName": "buttonsContainer",
				"values": {
					"id": "summaryItemContainer",
					"selectors": {"wrapEl": "#summaryItemContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["summary-item-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "okButton",
				"parentName": "buttonsContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.OKButtonCaption"},
					"click": {"bindTo": "saveChanges"},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"maskVisible": {"bindTo": "okButtonMaskVisible"},
					"markerValue": "ButtonOK"
				}
			},
			{
				"operation": "insert",
				"name": "cancelButton",
				"parentName": "buttonsContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "closeWindow"},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"markerValue": "ButtonCancel"
				}
			},
			{
				"operation": "insert",
				"name": "summaryItemCaption",
				"parentName": "summaryItemContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.TotalAmountCaption"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["summary-item-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "summaryItemValue",
				"parentName": "summaryItemContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "TotalAmount"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["summary-item-value"]
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


