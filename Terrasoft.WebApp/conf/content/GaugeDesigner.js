Terrasoft.configuration.Structures["GaugeDesigner"] = {innerHierarchyStack: ["GaugeDesigner"], structureParent: "BaseAggregationWidgetDesigner"};
define('GaugeDesignerStructure', ['GaugeDesignerResources'], function(resources) {return {schemaUId:'4345e456-502c-44f1-92e9-29267ece597d',schemaCaption: "Gauge designer", parentSchemaName: "BaseAggregationWidgetDesigner", schemaName:'GaugeDesigner',parentSchemaUId:'546df09a-8caa-4348-8b0d-ecbbc99f3e1e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GaugeDesigner", ["terrasoft", "GaugeDesignerResources", "css!DesignerToolsCSS"],
	function(Terrasoft, resources) {
		const localizableStrings = resources.localizableStrings;
		return {
			messages: {
				/**
				 * @message GetGaugeConfig
				 * Notify about receiving gauge display module initialization parameters.
				 */
				"GetGaugeConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GenerateGauge
				 * Notification that gauge was generated.
				 */
				"GenerateGauge": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Gauge caption.
				 * @private
				 * @type {String}
				 */
				caption: {
					value: localizableStrings.NewWidget
				},

				/**
				 * Gauge style.
				 * @private
				 * @type {Object}
				 */
				style: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					value: Terrasoft.DashboardEnums.WidgetColor["widget-blue"]
				},

				/**
				 * Gauge display order.
				 * @private
				 * @type {Object}
				 */
				orderDirection: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					value: {
						value: Terrasoft.OrderDirection.DESC,
						displayValue: localizableStrings.DescendingOrder
					}
				},

				/**
				 * Gauge scale minimum value.
				 * @private
				 * @type {Number}
				 */
				min: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					allowZeroValue: true
				},

				/**
				 * The "Average from" value of the gauge scale.
				 * @private
				 * @type {Number}
				 */
				middleFrom: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					allowZeroValue: true
				},

				/**
				 * The "Average to" value of the gauge scale.
				 * @private
				 * @type {Number}
				 */
				middleTo: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					allowZeroValue: true
				},

				/**
				 * The "Maximum" value of the gauge scale.
				 * @private
				 * @type {Number}
				 */
				max: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					allowZeroValue: true
				},

				/**
				 * Gauge display order enumeration.
				 * @private
				 * @type {Object}
				 */
				orderDirections: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						"1": {
							value: Terrasoft.OrderDirection.ASC,
							displayValue: localizableStrings.AscendingOrder
						},
						"2": {
							value: Terrasoft.OrderDirection.DESC,
							displayValue: localizableStrings.DescendingOrder
						}
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseAggregationWidgetDesigner#aggregationColumn
				 * @override
				 */
				aggregationColumn: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isLookup: true,
					entityStructureConfig: {
						useBackwards: false,
						excludeDataValueTypes: [
							Terrasoft.DataValueType.DATE_TIME,
							Terrasoft.DataValueType.DATE,
							Terrasoft.DataValueType.TIME
						],
						schemaColumnName: "entitySchemaName",
						aggregationTypeParameterName: "aggregationType"
					},
					dependencies: [
						{
							columns: ["aggregationType"],
							methodName: "onAggregationTypeChange"
						}
					]
				}
			},
			methods: {

				/**
				 * Returns the message name of getting widget module configuration.
				 * @protected
				 * @virtual
				 * @return {String} The message name of getting gauge module configuration.
				 */
				getWidgetConfigMessage: function() {
					return "GetGaugeConfig";
				},

				/**
				 * Returns the message name of widget refreshing.
				 * @protected
				 * @virtual
				 * @return {String} The message name of gauge refreshing.
				 */
				getWidgetRefreshMessage: function() {
					return "GenerateGauge";
				},

				/**
				 * Returns the object of gauge module properties and gauge settings module relation.
				 * @protected
				 * @virtual
				 * @return {Object} Object of gauge module properties and gauge settings module relation.
				 */
				getWidgetModulePropertiesTranslator: function() {
					const gaugeProperties = {
						"style": "style",
						"orderDirection": "orderDirection",
						"min": "min",
						"middleFrom": "middleFrom",
						"middleTo": "middleTo",
						"max": "max"
					};
					return Ext.apply(this.callParent(arguments), gaugeProperties);
				},

				/**
				 * Returns the widget module name.
				 * @protected
				 * @virtual
				 * @return {String} The widget module name.
				 */
				getWidgetModuleName: function() {
					return "GaugeModule";
				},

				/**
				 * Returns the widget style object.
				 * @protected
				 * @virtual
				 * @return {Object} Style object.
				 */
				getStyleDefaultConfig: function() {
					return Terrasoft.DashboardEnums.WidgetColor;
				},

				/**
				 * Fills the widget list style.
				 * @protected
				 * @virtual
				 * @param {String} filter Filter string.
				 * @param {Terrasoft.Collection} list Collection.
				 */
				prepareStyleList: function(filter, list) {
					if (!list) {
						return;
					}
					list.clear();
					list.loadAll(this.getStyleDefaultConfig());
				},

				/**
				 * Fills the widget direction list.
				 * @protected
				 * @virtual
				 * @param {String} filter Filter string.
				 * @param {Terrasoft.Collection} list Collection.
				 */
				prepareOrderDirectionList: function(filter, list) {
					if (!list) {
						return;
					}
					list.clear();
					list.loadAll(this.getOrderDirectionConfig());
				},

				/**
				 * Returns the object of widget order direction.
				 * @protected
				 * @virtual
				 * @return {Object} The object of widget order direction.
				 */
				getOrderDirectionConfig: function() {
					return this.get("orderDirections");
				},

				/**
				 * @inheritdoc Terrasoft.BaseWidgetDesigner#setAttributeDisplayValue
				 * @override
				 */
				setAttributeDisplayValue: function(propertyName, propertyValue) {
					switch (propertyName) {
						case "style":
							propertyValue = this.getStyle(propertyValue);
							break;
						case "orderDirection":
							propertyValue = this.getOrderDirection(propertyValue);
							break;
						default:
							this.callParent(arguments);
							return;
					}
					this.set(propertyName, propertyValue);
				},

				/**
				 * Returns the widget style.
				 * @private
				 * @param {String} styleName Name of the style.
				 * @return {Object} Widget style.
				 */
				getStyle: function(styleName) {
					const styleConfig = this.getStyleDefaultConfig();
					return styleConfig[styleName];
				},

				/**
				 * Returns the widget order direction.
				 * @private
				 * @param {String} orderDirectionName Order direction name.
				 * @return {Object} The widget order direction.
				 */
				getOrderDirection: function(orderDirectionName) {
					const orderDirectionConfig = this.get("orderDirections");
					return orderDirectionConfig[orderDirectionName];
				},

				/**
				 * Returns configuration image for the icon of the order direction of widget.
				 * @protected
				 * @return {Object} Image configuration.
				 */
				getScaleOrderDirectionImageConfig: function() {
					const orderDirection = this.get("orderDirection");
					if (!orderDirection) {
						return null;
					}
					const iconName = (orderDirection.value === Terrasoft.OrderDirection.ASC)
						? "ScaleUpIcon"
						: "ScaleDownIcon";
					const icon = this.get("Resources.Images." + iconName);
					return icon;
				},

				/**
				 * Returns the markerValue name of widget order direction icon.
				 * @protected
				 * @return {Object} The markerValue name of widget order direction icon.
				 */
				getScaleOrderDirectionIconMarkerValueName: function() {
					const orderDirection = this.get("orderDirection");
					if (!orderDirection) {
						return null;
					}
					const markerValueName = (orderDirection.value === Terrasoft.OrderDirection.ASC)
						? "ScaleOrderDirectionIconAsc"
						: "ScaleOrderDirectionIconDesc";
					return markerValueName;
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "OrderDirection",
					"parentName": "FormatProperties",
					"propertyName": "items",
					"index": 0,
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"bindTo": "orderDirection",
						"labelConfig": {
							"caption": {
								"bindTo": "Resources.Strings.OrderDirectionCaption"
							}
						},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {
								"bindTo": "prepareOrderDirectionList"
							},
							"list": {
								"bindTo": "orderDirectionList"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ScaleContainer",
					"parentName": "FormatProperties",
					"propertyName": "items",
					"index": 1,
					"values": {
						"id": "ScaleContainer",
						"selectors": {"wrapEl": "#ScaleContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["scale-container", "control-width-15"],
						"markerValue": "ScaleContainer",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Style",
					"parentName": "FormatProperties",
					"propertyName": "items",
					"index": 2,
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"bindTo": "style",
						"labelConfig": {
							"caption": {
								"bindTo": "Resources.Strings.StyleCaption"
							}
						},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {
								"bindTo": "prepareStyleList"
							},
							"list": {
								"bindTo": "styleList"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ScaleLabelContainer",
					"parentName": "ScaleContainer",
					"propertyName": "items",
					"values": {
						"id": "ScaleLabelContainer",
						"selectors": {"wrapEl": "#ScaleLabelContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["label-wrap"],
						"markerValue": "ScaleLabelContainer",
						"items": []
					}
				},

				{
					"operation": "insert",
					"name": "ScaleControlContainer",
					"parentName": "ScaleContainer",
					"propertyName": "items",
					"values": {
						"id": "ScaleControlContainer",
						"selectors": {"wrapEl": "#ScaleControlContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["control-wrap"],
						"markerValue": "ScaleControlContainer",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScaleIndicatorContainer",
					"parentName": "ScaleControlContainer",
					"propertyName": "items",
					"index": 0,
					"values": {
						"id": "ScaleIndicatorContainer",
						"selectors": {"wrapEl": "#ScaleIndicatorContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["scale-indicator-container"],
						"markerValue": "ScaleIndicatorContainer",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScaleLabel",
					"parentName": "ScaleLabelContainer",
					"propertyName": "items",
					"values": {
						classes: {
							"labelClass": ["scale-caption", "t-label-is-required"]
						},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.ScaleCaption"}
					}
				},
				{
					"operation": "insert",
					"name": "Min",
					"parentName": "ScaleIndicatorContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.INTEGER,
						"bindTo": "min",
						"labelConfig": {
							"visible": false
						},
						"useThousandSeparator": false
					}
				},
				{
					"operation": "insert",
					"name": "MiddleFrom",
					"parentName": "ScaleIndicatorContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.INTEGER,
						"bindTo": "middleFrom",
						"labelConfig": {
							"visible": false
						},
						"useThousandSeparator": false
					}
				},
				{
					"operation": "insert",
					"name": "MiddleToLabel",
					"parentName": "ScaleIndicatorContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.INTEGER,
						"bindTo": "middleTo",
						"labelConfig": {
							"visible": false
						},
						"useThousandSeparator": false
					}
				},
				{
					"operation": "insert",
					"name": "Max",
					"parentName": "ScaleIndicatorContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.INTEGER,
						"bindTo": "max",
						"labelConfig": {
							"visible": false
						},
						"useThousandSeparator": false
					}
				},
				{
					"operation": "insert",
					"index": 1,
					"name": "ScaleOrderDirectionIcon",
					"parentName": "ScaleControlContainer",
					"propertyName": "items",
					"values": {
						"id": "ScaleOrderDirectionIcon",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "getScaleOrderDirectionImageConfig"},
						"classes": {"wrapperClass": ["scale-order-direction-icon"]},
						"markerValue": {"bindTo": "getScaleOrderDirectionIconMarkerValueName"},
						"selectors": {"wrapEl": "#ScaleOrderDirectionIcon"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				}
			]
		};
	}
);


