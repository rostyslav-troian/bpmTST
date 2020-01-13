Terrasoft.configuration.Structures["ButtonPropertiesPage"] = {innerHierarchyStack: ["ButtonPropertiesPage"], structureParent: "BaseElementPropertiesPage"};
define('ButtonPropertiesPageStructure', ['ButtonPropertiesPageResources'], function(resources) {return {schemaUId:'e4109e86-0580-4100-9cb3-fdd22789f782',schemaCaption: "ButtonPropertiesPage", parentSchemaName: "BaseElementPropertiesPage", schemaName:'ButtonPropertiesPage',parentSchemaUId:'6d5763fd-93ae-4f8b-8308-748e9f40d663',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseElementPropertiesPage
 */
define("ButtonPropertiesPage", ["ButtonPropertiesPageResources", "BusinessRuleModule"
], function(resources, BusinessRuleModule) {
	return {
		messages: {
			"SaveButtonConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			"Id": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Name": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				autoBind: true
			},
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				caption: resources.localizableStrings.CaptionCaption,
				autoBind: true,
				isRequired: true
			},
			"Style": {
				dataValueType: Terrasoft.DataValueType.ENUM,
				caption: resources.localizableStrings.StyleCaption,
				isRequired: true
			},
			"StyleCollection": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			"Tag": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				caption: resources.localizableStrings.TagCaption,
				autoBind: true,
				isRequired: true
			},
			"PerformClosePage": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				caption: resources.localizableStrings.PerformClosePage,
				autoBind: true
			},
			"PerformSaveData": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				caption: resources.localizableStrings.PerformSaveData,
				autoBind: true
			},
			"GenerateSignal": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				caption: resources.localizableStrings.GenerateSignalCaption,
				autoBind: true
			},
			"Enabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				caption: resources.localizableStrings.IsEnabledCaption,
				autoBind: true
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_initStyleCollection: function() {
				this.$StyleCollection = new Terrasoft.Collection();
				var buttonStyles = Terrasoft.controls.ButtonEnums.style;
				var exceptStyles = [buttonStyles.GREY, buttonStyles.TRANSPARENT];
				Terrasoft.each(buttonStyles, function(code) {
					if (Terrasoft.contains(exceptStyles, code)) {
						return;
					}
					this.$StyleCollection.add(code, {
						value: code,
						displayValue: Terrasoft.Button.getStyleCaption(code)
					});
				}, this);
			},

			/**
			 * @private
			 */
			_revertDisabledControlValues: function() {
				var showUserAutoChanges = false;
				if (this.$PerformClosePage === false) {
					showUserAutoChanges = this.$PerformSaveData !== false || this.$GenerateSignal !== "";
					this.$PerformSaveData = false;
					this.$GenerateSignal = "";
				}
				return showUserAutoChanges;
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function() {
				this._initStyleCollection();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseElementPropertiesPage#loadData
			 * @override
			 */
			loadData: function() {
				this.callParent(arguments);
				var item = this.getDesignSchemaItem();
				var style = item.$Style || Terrasoft.controls.ButtonEnums.style.DEFAULT;
				this.$Style = this.$StyleCollection.get(style);
			},

			/**
			 * @inheritdoc Terrasoft.BaseElementPropertiesPage#saveData
			 * @override
			 */
			saveData: function(callback, scope) {
				var showUserAutoChanges = this._revertDisabledControlValues();
				this.callParent([function() {
					var item = this.getDesignSchemaItem();
					item.$Style = this.$Style.value;
					this.sandbox.publish("SaveButtonConfig", null, [this.sandbox.id]);
					var closeTimeout = showUserAutoChanges ? 500 : 0;
					setTimeout(function() {
						Ext.callback(callback, scope);
					}, closeTimeout);
				}, this]);
			}

			// endregion

		},
		rules: {
			"PerformSaveData": {
				"BindPerformSaveDataEnabledToPerformClosePage": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "PerformClosePage"
						},
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						}
					}]
				}
			},
			"GenerateSignal": {
				"BindPerformSaveDataEnabledToPerformClosePage": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.ENABLED,
					"logical": Terrasoft.LogicalOperatorType.AND,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "PerformClosePage"
							},
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}
					]
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "Caption",
				"values": {
					"bindTo": "Caption",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"layout": {"column": 0, "row": 0, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "Tag",
				"values": {
					"bindTo": "Tag",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"layout": {"column": 0, "row": 1, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "Style",
				"values": {
					"bindTo": "Style",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"controlConfig": {
						"prepareList": {"bindTo": "onPrepareList"},
						"list": {"bindTo": "StyleCollection"}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "PerformClosePage",
				"values": {
					"bindTo": "PerformClosePage",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"classes": {"wrapClassName": ["checkbox-left-position"]},
					"layout": {"column": 0, "row": 3, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "PerformSaveData",
				"values": {
					"bindTo": "PerformSaveData",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"classes": {"wrapClassName": ["checkbox-left-position"]},
					"labelConfig": {
						"enabled": {"bindTo": "PerformClosePage"}
					},
					"layout": {"column": 0, "row": 4, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "GenerateSignal",
				"values": {
					"bindTo": "GenerateSignal",
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"labelConfig": {
						"enabled": {"bindTo": "PerformClosePage"}
					},
					"layout": {"column": 0, "row": 5, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"parentName": "MainGridContainer",
				"propertyName": "items",
				"name": "Enabled",
				"values": {
					"bindTo": "Enabled",
					"classes": {"wrapClassName": ["checkbox-left-position"]},
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"layout": {"column": 0, "row": 6, "colSpan": 24}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


