Terrasoft.configuration.Structures["SimpleIndicatorModule"] = {innerHierarchyStack: ["SimpleIndicatorModule"]};
define("SimpleIndicatorModule", ["SimpleIndicatorModuleResources", "SimpleIndicatorModuleResources", "IndicatorModule"],
		function(resources) {

			/**
			 * @class Terrasoft.configuration.SimpleIndicatorViewConfig
			 * ##### ############ ############ ############# ###### ##########.
			 */
			Ext.define("Terrasoft.configuration.SimpleIndicatorViewConfig", {
				extend: "Terrasoft.IndicatorViewConfig",
				alternateClassName: "Terrasoft.SimpleIndicatorViewConfig",

				/**
				 * ########## ############ ############# ###### ##########.
				 * @protected
				 * @overridden
				 * @param {Object} config ###### ############.
				 * @return {Object[]} ########## ############ ############# ###### ##########.
				 */
				generate: function(config) {
					var result = this.callParent(arguments);
					if (config.hint) {
						result.hint = config.hint;
					}
					var imageConfig = config.imageConfig;
					if ((imageConfig !== "") && (typeof imageConfig !== "undefined")) {
						result = this.generateIndicatorWithPicture(result, config);
					} else {
						result = this.generateIndicatorWithOutPicture(result, config);
					}
					return result;
				},

				/**
				 * ########## ############ ############# ###### ########## # #########.
				 * @private
				 * @param {Object} result ###### ############# ###### ########## ## #########.
				 * @return {Object[]} ########## ############ ############# ###### ##########.
				 */
				generateIndicatorWithPicture: function(result) {
					var internalContainer = result.items[0].items;
					var id = Terrasoft.Component.generateId();
					internalContainer[1] = {
						"name": "indicator-image" + id,
						"onPhotoChange": Terrasoft.emptyFn,
						"getSrcMethod": "getSrcMethod",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {"wrapClass": ["indicator-image-container"]},
						"items": []
					};
					return result;
				},

				/**
				 * ########## ############ ############# ###### ########## ### ########.
				 * @private
				 * @param {Object} result ###### ############# ###### ########## ## #########.
				 * @param {Object} config ###### ############
				 * @return {Object[]} ########## ############ ############# ###### ##########.
				 */
				generateIndicatorWithOutPicture: function(result, config) {
					var internalContainer = result.items[0].items;
					var hideTotalAmount = (config.displayTotalAmount === false);
					if (hideTotalAmount) {
						return result;
					}
					var id = Terrasoft.Component.generateId();
					internalContainer[2] = {
						"name": "indicator-total-amount" + id,
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "totalAmount",
							"bindConfig": {"converter": "totalAmountConverter"}
						},
						"classes": {"labelClass": ["indicator-caption"]}
					};
					return result;
				}
			});

			/**
			 * ##### ###### ############# ### ###### ##########
			 */
			Ext.define("Terrasoft.configuration.SimpleIndicatorViewModel", {
				extend: "Terrasoft.IndicatorViewModel",
				alternateClassName: "Terrasoft.SimpleIndicatorViewModel",

				/**
				 * ############ ######## ######## # ############ ###### # ########### ## #### ########.
				 * @protected
				 * @virtual
				 * @param {Number} value ######## ####### ########## ##############.
				 * @return {String} ########## ################# ######.
				 */
				totalAmountConverter: function(value) {
					var result = "";
					var formatConfig = this.get("bottomLabelFormat") || this.defaultFormat;
					if (Ext.isNumber(value)) {
						if (Ext.isEmpty(formatConfig.decimalPrecision)) {
							formatConfig.decimalPrecision =
									(formatConfig.type === Terrasoft.DataValueType.INTEGER) ? 0 : 2;
						}
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
				 * ########## ######## ## ########.
				 * @return {String}
				 */
				getSrcMethod: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.IndicatorTargetAchievedImage);
				}

			});

			Ext.define("Terrasoft.configuration.SimpleIndicatorModule", {
				extend: "Terrasoft.IndicatorModule",
				alternateClassName: "Terrasoft.SimpleIndicatorModule",

				/**
				 * ### ###### ###### ############# ### ###### ##########.
				 * @type {String}
				 */
				viewModelClassName: "Terrasoft.SimpleIndicatorViewModel",

				/**
				 * ### ###### ########## ############ ############# ###### ##########.
				 * @type {String}
				 */
				viewConfigClassName: "Terrasoft.SimpleIndicatorViewConfig"

			});

			return Terrasoft.SimpleIndicatorModule;
		});


