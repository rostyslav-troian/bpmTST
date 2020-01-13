Terrasoft.configuration.Structures["IndicatorModule"] = {innerHierarchyStack: ["IndicatorModule"]};
define("IndicatorModule", ["IndicatorModuleResources", "BaseWidgetModule", "BaseWidgetViewModel"],
	function() {

		/**
		 * @class Terrasoft.configuration.IndicatorViewConfig
		 * Class generates configuration of Indicator module view.
		 */
		Ext.define("Terrasoft.configuration.IndicatorViewConfig", {
			extend: "Terrasoft.BaseModel",
			alternateClassName: "Terrasoft.IndicatorViewConfig",

			/**
			 * Generates configuration of Indicator module view.
			 * @protected
			 * @virtual
			 * @param {Object} config Configuration object.
			 * @param {Terrasoft.BaseEntitySchema} config.entitySchema Object schema.
			 * @param {String} config.style View style.
			 * @return {Object[]} Returns configuration of indicator module view.
			 */
			generate: function(config) {
				var style = config.style || "";
				var fontStyle = config.fontStyle || "";
				var wrapClassName = Ext.String.format("{0}", style);
				var id = Terrasoft.Component.generateId();
				var result = {
					"name": id,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: [wrapClassName, "indicator-module-wraper"]},
					"styles": {
						"display": "table",
						"width": "100%",
						"height": "100%"
					},
					"items": [
						{
							"name": id + "-wrap",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"styles": {
								"display": "table-cell",
								"vertical-align": "middle"
							},
							"classes": {wrapClassName: ["indicator-wrap"]},
							"items": [
								{
									"name": "indicator-caption" + id,
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": {"bindTo": "caption"},
									"classes": {"labelClass": ["indicator-caption"]}
								},
								{
									"name": "indicator-value" + id,
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": {
										"bindTo": "value",
										"bindConfig": {"converter": "valueConverter"}
									},
									"classes": {"labelClass": ["indicator-value " + fontStyle]}
								}
							]
						}
					]
				};
				return result;
			}
		});

		/**
		 * @class Terrasoft.configuration.IndicatorViewModel
		 * Class of Indicator view model.
		 */
		Ext.define("Terrasoft.configuration.IndicatorViewModel", {
			extend: "Terrasoft.configuration.BaseWidgetViewModel",
			alternateClassName: "Terrasoft.IndicatorViewModel",

			/**
			 * Default format of data view.
			 * {Object}
			 */
			defaultFormat: {
				textDecorator: "{0}",
				thousandSeparator: Terrasoft.Resources.CultureSettings.thousandSeparator,
				dateFormat: Terrasoft.Resources.CultureSettings.dateFormat
			},

			/*
			 * Column is used for adding aggregation column to select query
			 * @protected
			 * @virtual
			 * @type {String}.
			 */
			aggregationColumnName: "columnName",

			/**
			 * Converts value to given format according to value type.
			 * @protected
			 * @virtual
			 * @param {String/Date/Number} value Value to be converted.
			 * @return {String} Returns formatted string.
			 */
			valueConverter: function(value) {
				var result = "";
				var formatConfig = this.get("format") || this.defaultFormat;
				if (Ext.isNumber(value)) {
					formatConfig.decimalPrecision = (Ext.isEmpty(formatConfig.decimalPrecision)) ?
						((formatConfig.type === Terrasoft.DataValueType.INTEGER) ? 0 : 2) :
						formatConfig.decimalPrecision;
					if (formatConfig.decimalPrecision === 0) {
						value = Math.round(value);
					}
					result = Terrasoft.getFormattedNumberValue(value, formatConfig);
				} else if (Ext.isDate(value)) {
					var dateFormat = formatConfig.dateFormat || Terrasoft.Resources.CultureSettings.dateFormat;
					result = Ext.Date.format(value, dateFormat);
				}
				var textDecorator = formatConfig.textDecorator;
				if (textDecorator) {
					result = Ext.String.format(textDecorator, result);
				}
				return result;
			},

			/**
			 * Prepares indicator parameters
			 * @protected
			 * @virtual
			 * @param {Function} callback The function that will be called upon completion.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			prepareIndicator: function(callback, scope) {
				this.prepareWidget(callback, scope);
			},

			/**
			 * Perfoms data selection
			 * @protected
			 * @virtual
			 * @return {Terrasoft.EntitySchemaQuery} select Contains selected and filtered data
			 */
			createSelect: function() {
				var selectParameters = {
					queryKind: Terrasoft.QueryKind.LIMITED,
					isBatchable: Terrasoft.Features.getIsEnabled("BatchableDashboardQueryFeature")
				};
				return this.callParent([selectParameters]);
			}
		});

		Ext.define("Terrasoft.configuration.IndicatorModule", {
			extend: "Terrasoft.BaseWidgetModule",
			alternateClassName: "Terrasoft.IndicatorModule",

			/**
			 * Class name of the Indicator module view model.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.IndicatorViewModel",

			/**
			 * Class name of the Indicator module view configuration.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.IndicatorViewConfig",

			/**
			 * Initializes module configuration.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				this.callParent(["GetIndicatorConfig", this.sandbox]);
			},

			/**
			 * Subscribes to the parent module posts.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				this.callParent(arguments);
				this.subscribeMessagesInternal("GenerateIndicator");
			},

			/**
			 * Returns model messages. If messages property is null, returns empty object.
			 * @virtual
			 * @protected
			 * @return {Object} Messages columns.
			 */
			getModuleMessages: function() {
				var baseMessages = this.callParent(arguments);
				return this.Ext.apply(baseMessages, {
					/**
					 * @message GetSectionFilterModuleId
					 * For subscription on UpdateFilter
					 */
					"GetSectionFilterModuleId": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				});
			},

			/**
			 * Handles Indicator generation.
			 * @protected
			 * @virtual
			 */
			onGenerateIndicator: function() {
				this.onGenerateWidget();
			}
		});

		return Terrasoft.IndicatorModule;

	});


