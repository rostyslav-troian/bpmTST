Terrasoft.configuration.Structures["CurrencySection"] = {innerHierarchyStack: ["CurrencySection"], structureParent: "BaseLookupConfigurationSection"};
define('CurrencySectionStructure', ['CurrencySectionResources'], function(resources) {return {schemaUId:'88c64055-b570-41bc-a74b-e13f727023ca',schemaCaption: "CurrencySection", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'CurrencySection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CurrencySection", ["ConfigurationEnums", "CurrencySectionResources",  "ConfigurationGrid",
			"ConfigurationGridGenerator", "ConfigurationGridUtilities", "CurrencyRateServiceRequest", "MoneyUtilsMixin"],
		function(ConfigurationEnums) {
			return {
				entitySchemaName: "Currency",
				attributes: {
					/**
					 * Collection of currency rates.
					 */
					"CurrencyRates": {
						"dataValueType": Terrasoft.DataValueType.COLLECTION,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * RateSortTip visibility attribute.
					 */
					"RateSortTipVisible": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"value": false
					}
				},
				mixins: {
					MoneyUtilsMixin: "Terrasoft.MoneyUtilsMixin"
				},
				messages: {
					/**
					 * @message EditPageClosed
					 * Edit page is closed.
					 */
					"EditPageClosed": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#init
					 * @overriden
					 */
					init: function() {
						this.callParent(arguments);
						this.activateRateColumn();
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#initSectionViewOptionsButtonMenu
					 * @overriden
					 */
					initSectionViewOptionsButtonMenu: function() {
						this.callParent(arguments);
						this.disableRateSortColumn();
					},

					/**
					 * Disables rate column to sort.
					 * @protected
					 */
					disableRateSortColumn: function() {
						var sortColumns = this.get("SortColumns");
						var result = sortColumns.filter(function(column) {
							var tag = column.get("Tag");
							return (tag === "Rate");
						});
						var rateColumn = result.getByIndex(0);
						rateColumn.set("Enabled", false);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#init
					 * @overriden
					 */
					destroy: function() {
						this.callParent(arguments);
						this.deactivateRateColumn();
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
					 * @overriden
					 */
					subscribeSandboxEvents: function() {
						this.callParent(arguments);
						this.sandbox.subscribe("EditPageClosed", this.loadGridDataRecordRate, this);
					},

					/**
					 * Activates rate column for usage.
					 * @private
					 */
					activateRateColumn: function() {
						var column = this.entitySchema.columns.Rate;
						column.usageType = this.Terrasoft.EntitySchemaColumnUsageType.General;
					},

					/**
					 * Deactivates rate column from usage.
					 * @private
					 */
					deactivateRateColumn: function() {
						var column = this.entitySchema.columns.Rate;
						column.usageType = this.Terrasoft.EntitySchemaColumnUsageType.None;
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#beforeLoadGridData
					 * @overriden
					 */
					beforeLoadGridData: function() {
						this.callParent(arguments);
						this.loadCurrencyRates();
					},

					/**
					 * Loads currency rates.
					 * @protected
					 */
					loadCurrencyRates: function() {
						var request = this.getCurrencyRateServiceRequest();
						request.getActualCurrencyRates(function(result) {
							this.set("CurrencyRates", result);
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#onGridDataLoaded
					 * @overriden
					 */
					onGridDataLoaded: function() {
						this.callParent(arguments);
						this.fillGridDataWithRates();
					},

					/**
					 * Fills grid rows with currency's rates.
					 * @protected
					 */
					fillGridDataWithRates: function() {
						var rates = this.get("CurrencyRates") || [];
						var rows = this.getGridData();
						this.Terrasoft.each(rates, function(rate) {
							var currencyId = rate.CurrencyId;
							if (!currencyId) {
								return;
							}
							var row = rows.find(currencyId);
							if (!row) {
								return;
							}
							row.set("Rate", rate.Rate);
							row.set("RateMantissa", rate.RateMantissa);
							this.recalcRowRate(row);
						}, this);
					},

					/**
					 * Returns initialized CurrencyRateServiceRequest object.
					 * @protected
					 * @return {Terrasoft.CurrencyRateServiceRequest} returns initialized CurrencyRateServiceRequest object.
					 */
					getCurrencyRateServiceRequest: function(config) {
						return this.Ext.create("Terrasoft.CurrencyRateServiceRequest", config);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#addProfileColumns
					 * @overriden
					 */
					addProfileColumns: function(esq) {
						this.callParent(arguments);
						esq.columns.removeByKey("Rate");
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#onDataChanged
					 * @overriden
					 */
					onDataChanged: function() {
						this.callParent(arguments);
						this.loadGridDataRecordRate();
					},

					/**
					 * Loads selected currency's rate.
					 * @protected
					 */
					loadGridDataRecordRate: function() {
						var gridData = this.getGridData();
						var activeRowId = this.get("ActiveRow");
						if (activeRowId && gridData.contains(activeRowId)) {
							var activeRow = gridData.get(activeRowId);
							var requestConfig = {currencyId: activeRow.get("Id")};
							var request = this.getCurrencyRateServiceRequest(requestConfig);
							request.getActualCurrencyRates(function(result) {
								if (result) {
									activeRow.set("Rate", result.Rate);
									activeRow.set("RateMantissa", result.RateMantissa);
									this.recalcRowRate(activeRow);
								}
							}, this);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#addRecord
					 * @overriden
					 */
					addRecord: function(typeColumnValue) {
						if (!typeColumnValue) {
							if (this.get("EditPages").getCount() > 1) {
								return false;
							}
							var tag = this.get("AddRecordButtonTag");
							typeColumnValue = tag || this.Terrasoft.GUID_EMPTY;
						}
						var schemaName = this.getEditPageSchemaName(typeColumnValue);
						if (!schemaName) {
							return;
						}
						this.openCardInChain({
							schemaName: schemaName,
							operation: ConfigurationEnums.CardStateV2.ADD,
							moduleId: this.getChainCardModuleSandboxId(typeColumnValue)
						});
					},

					/**
					 * Recalculates row's currency rate.
					 * @protected
					 * @param {Terrasoft.BaseViewModel] row Currency grid row.
					 */
					recalcRowRate: function(row) {
						const rate = row.get("Rate");
						const division = row.get("Division");
						const mantissa = row.get("RateMantissa");
						const precision = this.getColumnPrecision("Rate");
						row.set("Rate", this.calculateRate(division, rate, mantissa, precision));
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#sortColumn
					 * @overriden
					 */
					sortColumn: function(index) {
						var sortColumns = this.get("SortColumns");
						var column = sortColumns.getByIndex(index);
						if (column.get("Tag") !== "Rate") {
							this.callParent(arguments);
						} else {
							this.set("RateSortTipVisible", true);
						}
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollectionItem
					 * @overriden
					 */
					prepareResponseCollectionItem: function(item) {
						this.callParent(arguments);
						item.setValidationConfig();
					}
				},

				diff: /**SCHEMA_DIFF*/ [
					{
						"operation": "merge",
						"name": "SeparateModeViewOptionsButton",
						"values": {
							"tips": []
						}
					},
					{
						"operation": "insert",
						"parentName": "SeparateModeViewOptionsButton",
						"propertyName": "tips",
						"name": "RateSortTip",
						"values": {
							"content": {"bindTo": "Resources.Strings.RateSortTipText"},
							"visible": {"bindTo": "RateSortTipVisible"},
							"style": this.Terrasoft.TipStyle.YELLOW,
							"behaviour": {
								"displayEvent": this.Terrasoft.TipDisplayEvent.NONE
							}
						}
					}
				] /**SCHEMA_DIFF*/
			};
		});


