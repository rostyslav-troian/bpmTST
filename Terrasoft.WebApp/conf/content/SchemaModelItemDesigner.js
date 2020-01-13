Terrasoft.configuration.Structures["SchemaModelItemDesigner"] = {innerHierarchyStack: ["SchemaModelItemDesigner"], structureParent: "EntitySchemaColumnDesigner"};
define('SchemaModelItemDesignerStructure', ['SchemaModelItemDesignerResources'], function(resources) {return {schemaUId:'52f23ebc-4ed7-496a-847e-3b33ecb3fb4a',schemaCaption: "SchemaModelItemDesigner", parentSchemaName: "EntitySchemaColumnDesigner", schemaName:'SchemaModelItemDesigner',parentSchemaUId:'efc4724d-a390-4899-af9d-849cb70b3f19',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: EntitySchemaColumnDesigner
 */
define("SchemaModelItemDesigner", [
	"BusinessRuleModule",
	"css!SchemaModelItemDesignerCss",
	"PageDesignerSchema"
], function(BusinessRuleModule) {
	return {
		attributes: {
			HideLabel: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			LabelCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			TextSize: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			EnabledProperty: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			IsMultilineText: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			IsRequiredOnPage: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		rules: {
			"IsRequiredOnPage": {
				"VisibleIfDataValueTypeAndNotRequiredInDb": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.VISIBLE,
					logical: Terrasoft.LogicalOperatorType.AND,
					conditions: [
						{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "IsRequired"
							},
							comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}, {
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "DataValueType"
							},
							comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: Terrasoft.DataValueType.INTEGER
							}
						}, {
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "DataValueType"
							},
							comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: Terrasoft.DataValueType.FLOAT
							}
						}, {
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "DataValueType"
							},
							comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: Terrasoft.DataValueType.BOOLEAN
							}
						}]
				}
			}
		},
		methods: {

			/**
			 * Set designer module header.
			 * @override
			 */
			changeDesignerCaption: Terrasoft.emptyFn,

			/**
			 * Initializes default module property.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.loadFromModelItem();
					callback.call(scope);
				}, this]);
			},

			/**
			 * Initializes model by schema element.
			 * @protected
			 */
			loadFromModelItem: function() {
				const modelItem = this.get("ModelItem");
				const dataValueType = this.get("DataValueType");
				const itemConfig = modelItem.itemConfig;
				this.set("EnabledProperty", itemConfig.enabled === false);
				const textSizeList = this.get("TextSizeList");
				const textSizeValue = itemConfig.textSize || null;
				const selectedTextSize = textSizeList.filterByFn(function(textSize) {
					return textSize.value === textSizeValue;
				}, this);
				this.set("TextSize", selectedTextSize.first());
				if (itemConfig.labelConfig && (itemConfig.labelConfig.visible === false)) {
					this.set("HideLabel", true);
				}
				this.set("LabelCaption", itemConfig.labelConfig && itemConfig.labelConfig.captionValue);
				this.set("IsRequiredOnPage", itemConfig.isRequired);
				this.set("IsMultilineText", itemConfig.contentType === Terrasoft.ContentType.LONG_TEXT);
				if (dataValueType.value === Terrasoft.DataValueType.LOOKUP) {
					this.set("IsSimpleLookup", (itemConfig.contentType === Terrasoft.ContentType.ENUM));
				}
			},

			/**
			 * Update schema element by model.
			 * @protected
			 */
			updateModelItem: function() {
				const modelItem = this.get("ModelItem");
				const itemConfig = modelItem.itemConfig;
				this.updateLabelConfig(itemConfig);
				itemConfig.enabled = !this.get("EnabledProperty");
				this.updateTextSizeConfig(itemConfig);
				this.updateLookupConfig(itemConfig);
				this.updateNameConfig(itemConfig);
				this._updateIsRequiredConfig(itemConfig);
				this.updateMultilineTextConfig(itemConfig);
			},

			/**
			 * @inheritdoc EntitySchemaColumnDesigner#updateColumn
			 * @override
			 */
			updateColumn: function() {
				this.updateModelItem();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc EntitySchemaColumnDesigner#onSaved
			 * @override
			 */
			onSaved: function() {
				const config = this.get("ModelItem");
				this.sandbox.publish("OnDesignerSaved", config, [this.sandbox.id]);
				this.destroyModule();
			},

			/**
			 * @inheritdoc EntitySchemaColumnDesigner#getColumnConfig
			 * @override
			 * @return {Object} Column config.
			 */
			getColumnConfig: function() {
				const modelItem = this.sandbox.publish("GetColumnConfig", null, [this.sandbox.id]);
				this.set("ModelItem", modelItem);
				return modelItem;
			},

			/**
			 * Returned MultilineText field visible.
			 * @protected
			 * @param {Object} dataValueType Data value type.
			 * @return {Boolean} MultilineText field visible flag. true - visible, false - not visible.
			 */
			isMultilineTextFieldVisible: function(dataValueType) {
				dataValueType = dataValueType && dataValueType.value;
				return dataValueType === Terrasoft.DataValueType.TEXT;
			},

			/**
			 * Cancel save column property handler.
			 * @protected
			 */
			cancel: function() {
				this.sandbox.publish("OnDesignerCanceled", null, [this.sandbox.id]);
				this.destroyModule();
			},

			/**
			 * Gets schema model item label config.
			 * @private
			 * @param {Object} itemConfig Item config.
			 * @return {Object}
			 */
			_getLabelConfig: function(itemConfig) {
				const labelCaption = this.get("LabelCaption");
				const columnCaption = this.get("Caption");
				if (labelCaption === columnCaption) {
					return null;
				}
				const labelConfig = Ext.clone(itemConfig.labelConfig) || {};
				labelConfig.captionValue = labelCaption;
				if (this.get("HideLabel")) {
					labelConfig.visible = false;
				} else {
					delete labelConfig.visible;
				}
				return labelConfig;
			},

			/**
			 * Updates label config.
			 * @private
			 * @param {Object} itemConfig Item config.
			 */
			updateLabelConfig: function(itemConfig) {
				const labelConfig = this._getLabelConfig(itemConfig);
				if (!Terrasoft.isEmptyObject(labelConfig)) {
					itemConfig.labelConfig = labelConfig;
				} else {
					delete itemConfig.labelConfig;
				}
			},

			/**
			 * Updates text size config.
			 * @private
			 * @param {Object} itemConfig Item config.
			 */
			updateTextSizeConfig: function(itemConfig) {
				const textSize = this.get("TextSize");
				if (Ext.isEmpty(textSize) || Ext.isEmpty(textSize.value)) {
					delete itemConfig.textSize;
				} else {
					itemConfig.textSize = textSize.value;
				}
			},

			/**
			 * Updates multiline text config.
			 * @private
			 * @param {Object} itemConfig Item config.
			 */
			updateMultilineTextConfig: function(itemConfig) {
				const dataValueType = this.get("DataValueType");
				if (this.isMultilineTextFieldVisible(dataValueType)) {
					if (this.get("IsMultilineText")) {
						itemConfig.contentType = Terrasoft.ContentType.LONG_TEXT;
					} else {
						delete itemConfig.contentType;
						const modelItem = this.get("ModelItem");
						modelItem.set("rowSpan", 1);
					}
				}
			},

			/**
			 * Updates lookup config.
			 * @private
			 * @param {Object} itemConfig Item config.
			 */
			updateLookupConfig: function(itemConfig) {
				const dataValueType = this.get("DataValueType");
				if (dataValueType.value === Terrasoft.DataValueType.LOOKUP) {
					if (this.get("IsSimpleLookup")) {
						itemConfig.contentType = Terrasoft.ContentType.ENUM;
					} else {
						itemConfig.contentType = Terrasoft.ContentType.LOOKUP;
					}
				}
			},

			/**
			 * Updates name config.
			 * @private
			 * @param {Object} itemConfig Item config.
			 */
			updateNameConfig: function(itemConfig) {
				const columnName = this.get("Name");
				if (itemConfig.bindTo) {
					const dataViewModel = this.$ModelItem.parentViewModel;
					itemConfig.bindTo = dataViewModel.getColumnPath(columnName);
				} else {
					itemConfig.name = columnName;
				}
			},

			/**
			 * @private
			 */
			_updateIsRequiredConfig: function(itemConfig) {
				if (this.$IsRequiredOnPage) {
					itemConfig.isRequired = true;
					this.$ModelItem.$IsRequired = true;
				} else {
					delete itemConfig.isRequired;
					if (!this.$IsRequired) {
						this.$ModelItem.$IsRequired = false;
					}
				}
			},

			/**
			 * @private
			 */
			_getIsPageDesigner: function() {
				const designer = this.$ModelItem.designSchema;
				return designer.$SupportParametersDataModel === true;
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["card-content-container", "designer"],
					"items": []
				}
			},
			{
				"operation": "move",
				"name": "BaseDesignerHeaderContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "Title",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {bindTo: "getDesignerCaption"},
					"labelConfig": {
						"classes": ["modal-box-title"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "LabelCaption",
				"parentName": "MainPropertiesContainer",
				"propertyName": "items",
				"index": 2,
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.LabelCaption"}
					},
					"classes": {
						"wrapClassName": ["label-caption"]
					},
					"tip": {
						"content": {"bindTo": "Resources.Strings.LabelCaptionHint"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsRequiredOnPageContainer",
				"parentName": "MainPropertiesContainer",
				"propertyName": "items",
				"index": 3,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["field-container"],
					"items": [],
					"visible": {
						"bindTo": "_getIsPageDesigner"
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsRequiredOnPage",
				"parentName": "IsRequiredOnPageContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.IsRequiredOnPageLabel"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "EnabledProperty",
				"parentName": "AdditionalPropertiesControlGroup",
				"propertyName": "items",
				"index": 1,
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					},
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.EnabledPropetyCaption"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "HideLabel",
				"parentName": "AdditionalPropertiesControlGroup",
				"propertyName": "items",
				"index": 4,
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.HideLabelCaption"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsMultilineText",
				"parentName": "AdditionalPropertiesControlGroup",
				"propertyName": "items",
				"index": 2,
				"values": {
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12
					},
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.isMultilineTextLabel"}
					},
					"visible": {
						"bindTo": "DataValueType",
						"bindConfig": {converter: "isMultilineTextFieldVisible"}
					}
				}
			},
			{
				"operation": "merge",
				"name": "DataValueType",
				"values": {"enabled": false}
			}
		]
	};
});


