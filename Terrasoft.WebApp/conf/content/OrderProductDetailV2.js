Terrasoft.configuration.Structures["OrderProductDetailV2"] = {innerHierarchyStack: ["OrderProductDetailV2Order", "OrderProductDetailV2ProductCatalogueInOrder", "OrderProductDetailV2"], structureParent: "ProductDetailV2"};
define('OrderProductDetailV2OrderStructure', ['OrderProductDetailV2OrderResources'], function(resources) {return {schemaUId:'18095247-3838-4c7b-bb72-a5603c5be74c',schemaCaption: "Products in order", parentSchemaName: "ProductDetailV2", schemaName:'OrderProductDetailV2Order',parentSchemaUId:'956729e3-33ef-4895-9d70-9e252958b63c',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderProductDetailV2ProductCatalogueInOrderStructure', ['OrderProductDetailV2ProductCatalogueInOrderResources'], function(resources) {return {schemaUId:'a07743ab-82ce-4cbf-80b0-e0da0d9ee4a7',schemaCaption: "Products in order", parentSchemaName: "OrderProductDetailV2Order", schemaName:'OrderProductDetailV2ProductCatalogueInOrder',parentSchemaUId:'18095247-3838-4c7b-bb72-a5603c5be74c',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderProductDetailV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderProductDetailV2Structure', ['OrderProductDetailV2Resources'], function(resources) {return {schemaUId:'a2447445-5dca-4a35-8d58-25f21da6ac15',schemaCaption: "Products in order", parentSchemaName: "OrderProductDetailV2ProductCatalogueInOrder", schemaName:'OrderProductDetailV2',parentSchemaUId:'a07743ab-82ce-4cbf-80b0-e0da0d9ee4a7',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderProductDetailV2ProductCatalogueInOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderProductDetailV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderProductDetailV2Order", ["MoneyModule", "css!OrderPageV2Styles", "css!SummaryModuleV2"], function(MoneyModule) {
	return {
		entitySchemaName: "OrderProduct",
		messages: {
			/**
			 * @message GetOrderProductSummary
			 * Returns information of product summary.
			 */
			"GetOrderProductSummary": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateOrderProductSummary
			 * Update product summary.
			 */
			"UpdateOrderProductSummary": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message DiscardChanges
			 * Occurs when changes in the target object were canceled. Is used to update data items.
			 */
			"DiscardChanges": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message OnCurrencyChanged
			 * Message on order card currency changed.
			 */
			"OnCurrencyChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			"IsCurrencyChanged": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"RefreshAfterPageSavedConfig": {
				"dataValueType": this.Terrasoft.DataValueType.OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.set("MultiSelect", true);
				this.set("isCollapsed", false);
				this.set("SummaryLoaded", false);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#addGridDataColumns
			 * @overridden
			 */
			addGridDataColumns: function(esq) {
				this.callParent(arguments);
				esq.addColumn("Currency.Division");
			},

			/**
			 * Recount grid amounts.
			 * @protected
			 */
			recountGridData: function() {
				var gridData = this.getGridData();
				var columns = ["Price", "Amount", "DiscountAmount", "TaxAmount", "TotalAmount"];
				this.Terrasoft.each(gridData.getItems(), function(row) {
					this.Terrasoft.each(columns, function(column) {
						MoneyModule.RecalcBaseValue.call(row, "CurrencyRate", column, "Primary" + column,
							row.get("Currency.Division"));
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#loadGridData
			 * @overridden
			 */
			loadGridData: function() {
				this.callParent(arguments);
				this.updateSummary();
			},

			/**
			 * Update summaries.
			 */
			updateSummary: function() {
				var summary = this.sandbox.publish("GetOrderProductSummary", null, [this.sandbox.id]);
				this.set("TotalCount", summary.count || 0);
				this.set("CurrencySymbol", summary.currency);
				this.set("TotalAmount", summary.amount);
				this.set("SummaryLoaded", Boolean(summary.currency));
			},

			/**
			 * Returns summary visibility.
			 * @return {Boolean} Summary visibility.
			 */
			getSummaryVisible: function() {
				return this.getToolsVisible() && this.get("SummaryLoaded");
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("UpdateOrderProductSummary", this.updateSummary, this, [this.sandbox.id]);
				this.sandbox.subscribe("DiscardChanges", this.updateSummary, this, [this.sandbox.id]);
				this.sandbox.subscribe("OnCurrencyChanged", this.onCurrencyChanged, this);
				this.sandbox.subscribe("RerenderDetail", function(config) {
					if (this.viewModel) {
						var renderTo = this.Ext.get(config.renderTo);
						if (renderTo) {
							if (this.view) {
								this.view.destroyed = true;
							}
							this.render(renderTo);
							return true;
						}
					}
				}, this, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#onDataChanged
			 * @overridden
			 */
			onDataChanged: function() {
				this.callParent(arguments);
				this.updateSummary();
				this.set("IsCurrencyChanged", false);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#saveRowChanges
			 * @overridden
			 */
			saveRowChanges: function(row) {
				if (row && this.getIsRowChanged(row)) {
					this.fireDetailChanged(null);
					this.updateSummary();
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#updateDetail
			 * @overridden
			 */
			updateDetail: function(config) {
				if (!config.reloadAll) {
					this.fireDetailChanged({action: "reloadAll", rows: []});
					config.reloadAll = true;
				}
				this.callParent([config]);
			},

			/**
			 * Handles on card currency changed.
			 * @protected
			 */
			onCurrencyChanged: function() {
				var activeRow = this.getActiveRow();
				if (activeRow) {
					this.discardActiveRowChanges(function() {
						this.setActiveRow(null);
					}, this);
				}
				this.set("IsCurrencyChanged", true);
			},

			/**
			 * Handles grid row selection.
			 * @param {Terrasoft.BaseViewModel} row Selected row.
			 */
			onRowSelected: function(row) {
				this.applyCardCurrencyChanges(row);
			},

			/**
			 * Applies changes on card if currency was changed.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} row Selected row.
			 */
			applyCardCurrencyChanges: function(row) {
				if (row === null) {
					return;
				}
				var isCurrencyChanged = this.get("IsCurrencyChanged");
				if (!isCurrencyChanged) {
					return;
				}
				var args = {
					messageTags: [this.sandbox.id]
				};
				this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
				this.setActiveRow(null);
			},

			/**
			 * @inheritDoc Terrasoft.BaseDetailV2#onCardSaved
			 * @override
			 */
			onCardSaved: function() {
				var currencyChanged = this.get("IsCurrencyChanged");
				if (currencyChanged) {
					this.set("IsCurrencyChanged", false);
					this.set("RefreshAfterPageSavedConfig", {callback: this.onCardSaved, scope: this});
					this.reloadGridData();
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseDetailV2#onGridDataLoaded
			 * @override
			 */
			onGridDataLoaded: function() {
				this.callParent(arguments);
				this.recountGridData();
				var conf = this.get("RefreshAfterPageSavedConfig");
				if (conf) {
					this.set("RefreshAfterPageSavedConfig", null);
					if (this.Ext.isFunction(conf.callback)) {
						conf.callback.call(conf.scope || this);
					}
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Detail",
				"values": {"classes": {"wrapClass": ["detail", "grid-detail", "order-product-detail"]}}
			},
			{
				"operation": "insert",
				"name": "summaryItemsContainer",
				"propertyName": "tools",
				"parentName": "Detail",
				"values": {
					"id": "summaryItemContainer",
					"selectors": {"wrapEl": "#summaryItemContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["summary-item-container"],
					"visible": {"bindTo": "getSummaryVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "summaryCountCaption",
				"parentName": "summaryItemsContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.TotalCountCaption"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {"labelClass": ["summary-item-caption"]}
				}
			},
			{
				"operation": "insert",
				"name": "summaryCountValue",
				"parentName": "summaryItemsContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "TotalCount"},
					"markerValue": {"bindTo": "Resources.Strings.TotalCountCaption"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {"labelClass": ["summary-item-value"]}
				}
			},
			{
				"operation": "insert",
				"name": "summaryAmountCaption",
				"parentName": "summaryItemsContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.TotalAmountCaption"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {"labelClass": ["summary-item-caption"]}
				}
			},
			{
				"operation": "insert",
				"name": "summaryAmountCurrencySymbol",
				"parentName": "summaryItemsContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "CurrencySymbol"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {"labelClass": ["summary-item-value"]}
				}
			},
			{
				"operation": "insert",
				"name": "summaryAmountValue",
				"parentName": "summaryItemsContainer",
				"propertyName": "items",
				"values": {
					"caption": {
						bindTo: "TotalAmount",
						bindConfig: {converter: Terrasoft.getFormattedMoneyValue}
					},
					"markerValue": {"bindTo": "Resources.Strings.TotalAmountCaption"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {"labelClass": ["summary-item-value"]}
				}
			},
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"selectRow": {"bindTo": "onRowSelected"}
				}
			},
			{
				"operation": "merge",
				"name": "ToolsButton",
				"values": {
					"generateId": false
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('OrderProductDetailV2ProductCatalogueInOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderProductDetailV2ProductCatalogueInOrder", [], function() {
	return {
		entitySchemaName: "OrderProduct",
		methods: {
			init: function() {
				this.callParent(arguments);
				this.set("MultiSelect", false);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define("OrderProductDetailV2", ["OrderUtilities"],
	function() {
		return {
			entitySchemaName: "OrderProduct",
			mixins: {
				OrderUtilities: "Terrasoft.OrderUtilities"
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initValidateActions();
				},

				/**
				 * ############# #######.
				 * @protected
				 */
				initValidateActions: function() {
					var config = {
						getId: function() {
							var activeRow = this.get("ActiveRow");
							if (!activeRow) {
								return null;
							}
							var collection = this.getGridData();
							var item = collection.get(activeRow);
							return item.get("Order") && item.get("Order").value;
						},
						name: "Order"
					};
					this.deleteRecords = this.needToChangeInvoice(config, this.deleteRecords, this);
					this.editRecord = this.needToChangeInvoice(config, this.editRecord, this);
					this.addRecord = this.needToChangeInvoice(config, this.addRecord, this);
					this.copyRecord = this.needToChangeInvoice(config, this.copyRecord, this);
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


