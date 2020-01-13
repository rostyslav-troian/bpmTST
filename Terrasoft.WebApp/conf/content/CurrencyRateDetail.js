Terrasoft.configuration.Structures["CurrencyRateDetail"] = {innerHierarchyStack: ["CurrencyRateDetail"], structureParent: "BaseGridDetailV2"};
define('CurrencyRateDetailStructure', ['CurrencyRateDetailResources'], function(resources) {return {schemaUId:'ca52870a-2592-4a7c-bf64-720bdfa79a61',schemaCaption: "CurrencyRateDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'CurrencyRateDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CurrencyRateDetail", ["ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities",
	"MoneyUtilsMixin", "CurrencyRatePage"],
	function() {
		return {
			entitySchemaName: "CurrencyRate",
			attributes: {
				/**
				 * IsEditable flag.
				 */
				"IsEditable": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				},

				/**
				 * MultiSelect flag.
				 */
				"MultiSelect": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				"Division": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 1
				}
			},

			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities",
				MoneyUtilsMixin: "Terrasoft.MoneyUtilsMixin"
			},

			messages: {
				"GetCurrencyDivision": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			methods: {

				/**
				 * @inheritDoc Terrasoft.mixins.BaseGridDetailV2#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.set("Precision", this.getColumnPrecision("Rate"));
				},

				/**
				 * Sets sorting order for columns.
				 * @overriden
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					gridDataColumns.StartDate = {
						path: "StartDate",
						orderPosition: 0,
						orderDirection: this.Terrasoft.OrderDirection.DESC
					};
					gridDataColumns.CreatedOn = {
						path: "CreatedOn",
						orderPosition: 1,
						orderDirection: this.Terrasoft.OrderDirection.DESC
					};
					return gridDataColumns;
				},

				/**
				 * @inheritDoc Terrasoft.mixins.ConfigurationGridUtilites#saveRowChanges
				 * @overridden
				 */
				saveRowChanges: function(row, callback, scope) {
					this.mixins.ConfigurationGridUtilites.saveRowChanges.call(this, row, function() {
						if (row && this.getIsRowChanged(row)) {
							this.fireDetailChanged(null);
						}
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollection
				 * @overriden
				 */
				prepareResponseCollection: function() {
					var division = this.sandbox.publish("GetCurrencyDivision", null);
					this.set("Division", division);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollectionItem
				 * @overriden
				 */
				prepareResponseCollectionItem: function(item) {
					this.callParent(arguments);
					var rate = item.get("Rate") || 0;
					if (rate) {
						const division = this.get("Division");
						const rateMantissa = item.get("RateMantissa") || 0;
						const precision = this.get("Precision");
						item.set("Rate", this.calculateRate(division, rate, rateMantissa, precision));
					}
					item.setValidationConfig();
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#setGridRowValueFromEntity
				 * @overriden
				 */
				setGridRowValueFromEntity: function (row, entity, columnName) {
					if (columnName === "Rate") {
						const division = this.get("Division");
						const rateMantissa = entity.get("RateMantissa") || 0;
						const precision = this.get("Precision");
						row.set("Rate", this.calculateRate(division, entity.get("Rate"), rateMantissa, precision));
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#sortColumn
				 * @overriden
				 */
				sortColumn: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
				 * @overriden
				 */
				getGridSortMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return true;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
				 * @overridden
				 */
				getDeleteRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
				 * @overridden
				 */
				getSwitchGridModeMenuItem: Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"className": "Terrasoft.ConfigurationGrid",
						"generator": "ConfigurationGridGenerator.generatePartial",
						"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
						"changeRow": {"bindTo": "changeRow"},
						"unSelectRow": {"bindTo": "unSelectRow"},
						"onGridClick": {"bindTo": "onGridClick"},
						"activeRowActions": [
							{
								"className": "Terrasoft.Button",
								"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"tag": "save",
								"markerValue": "save",
								"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
							},
							{
								"className": "Terrasoft.Button",
								"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"tag": "cancel",
								"markerValue": "cancel",
								"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
							},
							{
								"className": "Terrasoft.Button",
								"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"tag": "remove",
								"markerValue": "remove",
								"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
							}
						],
						"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"multiSelect": false,
						"type": "listed"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


