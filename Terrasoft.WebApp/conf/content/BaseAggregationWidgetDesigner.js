Terrasoft.configuration.Structures["BaseAggregationWidgetDesigner"] = {innerHierarchyStack: ["BaseAggregationWidgetDesigner"], structureParent: "BaseWidgetDesigner"};
define('BaseAggregationWidgetDesignerStructure', ['BaseAggregationWidgetDesignerResources'], function(resources) {return {schemaUId:'546df09a-8caa-4348-8b0d-ecbbc99f3e1e',schemaCaption: "Base designer of widgets with aggregation", parentSchemaName: "BaseWidgetDesigner", schemaName:'BaseAggregationWidgetDesigner',parentSchemaUId:'8c9456fa-46da-4100-94f9-8653274ab717',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseAggregationWidgetDesigner", ["terrasoft"],
function(Terrasoft) {
	return {
		messages: {
			/**
			 * ######## ## ######### StructureExplorer.
			 */
			"StructureExplorerInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * ######## ## ######### ###### ####### # StructureExplorer.
			 */
			"ColumnSelected": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {

			/**
			 * ####### #### #########.
			 */
			aggregationType: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				value: {
					value: Terrasoft.AggregationType.COUNT,
					displayValue: Terrasoft.Resources.AggregationType.COUNT
				}
			},

			/**
			 * ####### # ######## #########.
			 */
			aggregationColumn: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isLookup: true,
				entityStructureConfig: {
					useBackwards: false,
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
			 * ########## ###### ########### ####### ###### ####### # ###### ######### #######.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ########### ####### ###### ####### # ###### ######### #######.
			 */
			getWidgetModulePropertiesTranslator: function() {
				var aggregationProperties = {
					aggregationType: "aggregationType",
					aggregationColumn: "aggregationColumn"
				};
				return Ext.apply(this.callParent(arguments), aggregationProperties);
			},

			/**
			 * ##### ####### ######### ############ #######.
			 * @protected
			 * @virtual
			 */
			clearColumn: function() {
				this.set("aggregationColumn", null);
			},

			/**
			 * ##### ######### ####### ######### ######## #####.
			 * @protected
			 * @virtual
			 */
			onEntitySchemaNameChange: function() {
				if (this.get("moduleLoaded")) {
					this.clearColumn();
				}
				this.callParent(arguments);
			},

			/**
			 * ##### ######### ####### ######### ####### #########.
			 * @protected
			 * @virtual
			 */
			onAggregationTypeChange: function() {
				if (this.get("moduleLoaded")) {
					this.clearColumn();
				}
			},

			/**
			 * ##### ########### ######### ############ #######.
			 * @private
			 * @param {Object} value ########.
			 * @return {Boolean} ####### ######### ############ #######.
			 */
			aggregationColumnVisibilityConverter: function(value) {
				var entitySchema = this.get("entitySchemaName");
				var allowedAggregationTypes = [
					Terrasoft.AggregationType.SUM,
					Terrasoft.AggregationType.MAX,
					Terrasoft.AggregationType.MIN,
					Terrasoft.AggregationType.AVG
				];
				return entitySchema && value && value.value &&
					Terrasoft.contains(allowedAggregationTypes, value.value);
			},

			/**
			 * ##### ######### ######## #########.
			 * @protected
			 * @virtual
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("aggregationColumn", function(value) {
					var invalidMessage = "";
					var isVisible = this.aggregationColumnVisibilityConverter(this.get("aggregationType"));
					if (isVisible && !value) {
						invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				});
			},

			/**
			 * ########## ###### ##### #########.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ##### #########.
			 */
			getAggregationTypeDefaultConfig: function() {
				var aggregationTypeDefaultConfig = {};
				Terrasoft.each(Terrasoft.AggregationType, function(typeValue, typeName) {
					if (typeValue === Terrasoft.AggregationType.NONE) {
						return;
					}
					aggregationTypeDefaultConfig[typeValue] = {
						value: typeValue,
						displayValue: Terrasoft.Resources.AggregationType[typeName]
					};
				}, this);
				return aggregationTypeDefaultConfig;
			},

			/**
			 * ######### ######### ##### ####### #########.
			 * @protected
			 * @virtual
			 * @param {String} filter ###### ##########.
			 * @param {Terrasoft.Collection} list ######.
			 */
			prepareAggregationTypesList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getAggregationTypeDefaultConfig());
			},

			/**
			 * ########## ###### ######## ####### #########.
			 * @protected
			 * @virtual
			 * @param {Number} aggregationTypeValue ### #########.
			 * @return {Object} ########## ###### ######## ####### #########.
			 */
			getAggregationTypeLookupValue: function(aggregationTypeValue) {
				var aggregationTypeDefaultConfig = this.getAggregationTypeDefaultConfig();
				aggregationTypeValue = (Ext.isNumber(aggregationTypeValue) || aggregationTypeValue.match(/\d+/g))
					? aggregationTypeValue
					: Terrasoft.AggregationType[aggregationTypeValue.toUpperCase()];
				return aggregationTypeDefaultConfig[aggregationTypeValue];
			},

			/**
			 * @inheritdoc Terrasoft.BaseWidgetDesigner#setAttributeDisplayValue
			 * ############ ######## ### ####### #### #########.
			 * @protected
			 * @overridden
			 */
			setAttributeDisplayValue: function(propertyName, propertyValue) {
				if (propertyName === "aggregationType") {
					var aggregationTypeLookupValue =
						this.getAggregationTypeLookupValue(propertyValue);
					this.set(propertyName, aggregationTypeLookupValue);
				} else {
					this.callParent(arguments);
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "AggregationType",
				"parentName": "QueryProperties",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"bindTo": "aggregationType",
					"labelConfig": {
						"caption": { "bindTo": "Resources.Strings.AggregationTypeLabel" }
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": { "bindTo": "prepareAggregationTypesList" },
						"list": { "bindTo": "aggregationTypeList" }
					}
				}
			},
			{
				"operation": "insert",
				"name": "aggregationColumn",
				"parentName": "QueryProperties",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
					"generator": "ColumnEditGenerator.generatePartial",
					"labelConfig": {
						"caption": { "bindTo": "Resources.Strings.AggregationColumnLabel" },
						"isRequired": true
					},
					"visible": {
						"bindTo": "aggregationType",
						"bindConfig": { "converter": "aggregationColumnVisibilityConverter"}
					}
				}
			}
		]
	};
});


