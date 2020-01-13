Terrasoft.configuration.Structures["OperatorSingleWindowWidgetModule"] = {innerHierarchyStack: ["OperatorSingleWindowWidgetModule"]};
define("OperatorSingleWindowWidgetModule", ["OperatorSingleWindowWidgetModuleResources", "BaseWidgetModule",
		"BaseWidgetViewModel"],
		function() {

			/**
			 * @class Terrasoft.configuration.OperatorSingleWindowWidgetViewConfig
			 * Class generates configuration of OperatorSingleWindow module view.
			 */
			Ext.define("Terrasoft.configuration.OperatorSingleWindowWidgetViewConfig", {
				extend: "Terrasoft.BaseModel",
				alternateClassName: "Terrasoft.OperatorSingleWindowWidgetViewConfig",

				/**
				 * Class generates configuration of OperatorSingleWindow module view.
				 * @protected
				 * @virtual
				 * @param {Object} config Configuratoin object.
				 * @param {Terrasoft.BaseEntitySchema} config.entitySchema Object schema.
				 * @param {String} config.style View style.
				 * @return {Object[]} Returns configuration of OperatorSingleWindow module view..
				 */
				generate: function(config) {
					var style = config.style || "";
					var fontStyle = config.fontStyle || "";
					var wrapClassName = Ext.String.format("{0}", style);
					var id = Terrasoft.Component.generateId();
					var result = {
						"name": id,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {wrapClassName: [wrapClassName, "operator-single-window-widget-module-wraper"]},
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
								"classes": {wrapClassName: ["operator-single-window-widget-wrap"]},
								"items": [
									{
										"name": "operator-single-window-widget-caption" + id,
										"itemType": Terrasoft.ViewItemType.LABEL,
										"caption": {"bindTo": "caption"},
										"classes": {"labelClass": ["operator-single-window-widget-caption"]}
									},
									{
										"name": "operator-single-window-widget-value" + id,
										"itemType": Terrasoft.ViewItemType.LABEL,
										"caption": {
											"bindTo": "value",
											"bindConfig": {"converter": "valueConverter"}
										},
										"classes": {"labelClass": ["operator-single-window-widget-value " + fontStyle]}
									}
								]
							}
						]
					};
					return result;
				}
			});

			Ext.define("Terrasoft.configuration.OperatorSingleWindowWidgetViewModel", {
				extend: "Terrasoft.configuration.BaseWidgetViewModel",
				alternateClassName: "Terrasoft.OperatorSingleWindowWidgetViewModel",

				/**
				 * Prepares indicator parameters
				 * @protected
				 * @virtual
				 * @param {Function} callback The function that will be called upon completion.
				 * @param {Object} scope The context in which the callback function will be called.
				 */
				prepareOperatorSingleWindowWidget: function(callback, scope) {
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
						rowCount: 1
					};
					return this.callParent([selectParameters]);
				}
			});

			Ext.define("Terrasoft.configuration.OperatorSingleWindowWidgetModule", {
				extend: "Terrasoft.BaseWidgetModule",
				alternateClassName: "Terrasoft.OperatorSingleWindowWidgetModule",

				/**
				 * Class name of the OperatorSingleWindowWidget module view model.
				 * @type {String}
				 */
				viewModelClassName: "Terrasoft.OperatorSingleWindowWidgetViewModel",

				/**
				 * Class name of the OperatorSingleWindow module view configuration.
				 * @type {String}
				 */
				viewConfigClassName: "Terrasoft.OperatorSingleWindowWidgetViewConfig",

				/**
				 * Initializes module configuration.
				 * @protected
				 * @virtual
				 */
				initConfig: function() {
					this.callParent(["GenerateOperatorSingleWindowWidget", this.sandbox]);
				},

				/**
				 * Subscribes to the parent module posts.
				 * @protected
				 * @virtual
				 */
				subscribeMessages: function() {
					this.subscribeMessagesInternal("GenerateOperatorSingleWindowWidget");
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
						},

						/**
						 * Subscription on messages for receiving OperatorSingleWindow module initialize parameters
						 */
						"GetOperatorSingleWindowWidgetConfig": {
							mode: Terrasoft.MessageMode.PTP,
							direction: Terrasoft.MessageDirectionType.PUBLISH
						},

						/**
						 * Publishing message for OperatorSingleWindow widget generation
						 */
						"GenerateOperatorSingleWindowWidget": {
							mode: Terrasoft.MessageMode.PTP,
							direction: Terrasoft.MessageDirectionType.SUBSCRIBE
						}
					});
				},

				/**
				 * Handles Single operator window generation.
				 * @protected
				 * @virtual
				 */
				onGenerateOperatorSingleWindowWidget: function() {
					this.onGenerateWidget();
				}
			});

			return Terrasoft.OperatorSingleWindowWidgetModule;

		});


