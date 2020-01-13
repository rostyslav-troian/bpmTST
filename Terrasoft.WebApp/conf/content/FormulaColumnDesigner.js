Terrasoft.configuration.Structures["FormulaColumnDesigner"] = {innerHierarchyStack: ["FormulaColumnDesigner"]};
define('FormulaColumnDesignerStructure', ['FormulaColumnDesignerResources'], function(resources) {return {schemaUId:'81439099-88ae-4aef-868d-9e3435ca8ae3',schemaCaption: "Formula column designer schema", parentSchemaName: "", schemaName:'FormulaColumnDesigner',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FormulaColumnDesigner", ["css!FormulaColumnDesigner"], function() {
	return {
		attributes: {
			/**
			 * Column settings.
			 */
			"ColumnSettings": {
				"dataValueType": Terrasoft.DataValueType.OBJECT,
				"value": ""
			},

			/**
			 * Formula value.
			 */
			"FormulaValue": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},
			/**
			 * Use in summary.
			 */
			"UseInSummary": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			}
		},
		messages: {
			/**
			 * @message GetColumnConfig
			 * Returns column config from loaded module.
			 */
			"GetColumnConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {
			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this._subscribeMessages();
				this.callParent([function() {
					this._initFormulaValue();
					this.Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @overridden
			 */
			onRender: function() {
				this._addFormulaComponent();
			},

			/**
			 * @private
			 */
			_addFormulaComponent: function() {
				const element = document.createElement("bpm-forecast-column-formula");
				element.forecastId = this.$ForecastSheetId;
				element.baseUrl = this.Terrasoft.workspaceBaseUrl;
				element.formulaData = this.$FormulaValue;
				element.addEventListener("formulaChanged", this.handleFormulaChanged.bind(this));
				document.querySelector("#FormulaContainer").appendChild(element);
			},

			/**
			 * Handles formula changed.
			 * @param {Object} event Event information.
			 */
			handleFormulaChanged: function(event) {
				this.$FormulaValue = event.detail;
			},

			/**
			 * @private
			 */
			_subscribeMessages: function() {
				this.sandbox.subscribe("GetColumnConfig", this.getFormulaValue, this,
					[this.sandbox.id]);
			},

			/**
			 * @private
			 */
			_initFormulaValue: function() {
				const settings = this.$ColumnSettings;
				if (settings) {
					this.$FormulaValue = settings.value;
					this.$UseInSummary = settings.useInSummary;
				}
			},

			/**
			 * Returns formula value.
			 * @return {Object} Formula value.
			 */
			getFormulaValue: function() {
				return {
					value: this.$FormulaValue,
					useInSummary: this.$UseInSummary
				};
			},

			/**
			 * Return state of "CalcTotalByFormula" enabled state.
			 * @return {Boolean} Feature enabled state.
			 */
			getCalcTotalByFormulaFeatureEnabled: function() {
				return this.getIsFeatureEnabled("CalcTotalByFormula");
			}
		},
		diff: [
			{
				"name": "ColumnDesigner",
				"operation": "insert",
				"values": {
					"items": [],
					"classes": {"wrapClassName": ["column-designer-container"]},
					"itemType": Terrasoft.ViewItemType.CONTAINER
				}
			},
			{
				"operation": "insert",
				"parentName": "ColumnDesigner",
				"propertyName": "items",
				"name": "FormulaContainer",
				"values": {
					"id": "FormulaContainer",
					"labelConfig": {"visible": false},
					"itemType": Terrasoft.ViewItemType.CONTAINER
				}
			},
			{
				"operation": "insert",
				"name": "UseInSummaryContainer",
				"parentName": "ColumnDesigner",
				"propertyName": "items",
				"values": {
					"items": [],
					"classes": {"wrapClassName": ["use-in-summary-container"]},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"visible": {
						"bindTo": "getCalcTotalByFormulaFeatureEnabled"
					}
				}
			},
			{
				"operation": "insert",
				"name": "UseInSummaryCaption",
				"parentName": "UseInSummaryContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TIP_LABEL,
					"caption": {
						"bindTo": "Resources.Strings.UseInSummaryCaption"
					},
					"classes": {
						"labelClass": ["use-in-summary-label"]
					},
					"tip": {
						"content": {"bindTo": "Resources.Strings.UseInSummaryTipCaption"}
					},
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 22
					}
				}
			},
			{
				"operation": "insert",
				"name": "ToggleUseInSummary",
				"parentName": "UseInSummaryContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "UseInSummary",
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["toggle-use-in-summary-state"],
					"controlConfig": {
						"className": "Terrasoft.ToggleEdit",
						"checked": {
							"bindTo": "UseInSummary"
						},
					},
					"layout": {
						"column": 22,
						"row": 0,
						"colSpan": 2
					}
				}
			}
		]
	};
});


