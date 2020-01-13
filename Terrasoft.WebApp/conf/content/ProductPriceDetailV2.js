Terrasoft.configuration.Structures["ProductPriceDetailV2"] = {innerHierarchyStack: ["ProductPriceDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProductPriceDetailV2Structure', ['ProductPriceDetailV2Resources'], function(resources) {return {schemaUId:'af712d74-dd34-44d2-8686-1d5b7c638768',schemaCaption: "Product price detail", parentSchemaName: "BaseGridDetailV2", schemaName:'ProductPriceDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductPriceDetailV2", ["BusinessRuleModule", "RightUtilities"], function(BusinessRuleModule, RightUtilities) {
	return {
		entitySchemaName: "ProductPrice",
		attributes: {
			/**
			 * ####### #####-#### ## ######### #########
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			BasePriceList: {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * ####### ####### # ######### ####### ######## #####-#####
			 * @type {Terrasoft.DataValueType.BOOLEAN}
			 */
			HasBaseItem: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN
			}
		},
		methods: {
			/**
			 * ############## ######### ######## ######
			 * @protected
			 * @virtual
			 * @overriden
			 */
			init: function() {
				Terrasoft.SysSettings.querySysSettingsItem("BasePriceList",
					function(value) {
						this.set("BasePriceList", value);
					}, this);
				this.callParent(arguments);
			},

			/**
			 * ######### ####### ##### ######### "########" #####-##### (############# # ######### #########)
			 * @protected
			 * @param {Terrasoft.Collection} items
			 * @returns {boolean}
			 */
			checkAndSetHasIsBaseInDeleteItems: function(items) {
				var hasIsBaseItem = false;
				var gridData = this.getGridData();
				if (gridData) {
					this.Terrasoft.each(items, function(itemKey) {
						var item = gridData.get(itemKey);
						var basePriceList = this.get("BasePriceList");
						var priceList = item.get("PriceList");
						hasIsBaseItem =
							(hasIsBaseItem || (basePriceList && priceList && (basePriceList.value === priceList.value)));
					}, this);
				}
				this.set("HasBaseItem", hasIsBaseItem);
			},

			/**
			 * ####### ########## ######
			 * @protected
			 * @overriden
			 */
			deleteRecords: function() {
				var items = this.getSelectedItems();
				if (!items || !items.length) {
					return;
				}
				this.checkAndSetHasIsBaseInDeleteItems(items);
				if (items.length === 1) {
					RightUtilities.checkCanDelete({
						schemaName: this.entitySchema.name,
						primaryColumnValue: items[0]
					}, this.deleteCallback, this);
				} else {
					RightUtilities.checkMultiCanDelete({
						schemaName: this.entitySchema.name,
						primaryColumnValues: items
					}, this.deleteCallback, this);
				}
			},

			/**
			 * ####### ######### ###### ######## #######
			 * @param {String} result
			 */
			deleteCallback: function(result) {
				if (result) {
					this.showInformationDialog(this.get("Resources.Strings." + result), function() {
					}, {
						style: this.Terrasoft.MessageBoxStyles.BLUE
					});
				} else {
					if (!this.get("HasBaseItem")) {
						this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
							function(returnCode) {
								if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.onDeleteAccept();
								}
							},
							[this.Terrasoft.MessageBoxButtons.YES.returnCode,
								this.Terrasoft.MessageBoxButtons.NO.returnCode],
							null);
					} else {
						this.showInformationDialog(this.get("Resources.Strings.DeleteHasIsBaseItemMessage"),
							function() {}, {style: this.Terrasoft.MessageBoxStyles.BLUE});
					}
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
			 * @overridden
			 */
			getFilterDefaultColumnName: function() {
				return "PriceList";
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"primaryDisplayColumnName": "PriceList"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


