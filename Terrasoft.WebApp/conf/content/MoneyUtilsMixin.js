Terrasoft.configuration.Structures["MoneyUtilsMixin"] = {innerHierarchyStack: ["MoneyUtilsMixin"]};
define("MoneyUtilsMixin", ["ext-base", "terrasoft", "DecimalUtils"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.configuration.mixins.MoneyUtilsMixin
	 * Mixin class designed to work with money calculations.
	 */
	Ext.define("Terrasoft.configuration.mixins.MoneyUtilsMixin", {
		alternateClassName: "Terrasoft.MoneyUtilsMixin",

		/**
		 * Used for backward compatibility with MoneyModule.
		 * @private
		 */
		modelInstance: null,

		/**
		 * Used for concat PrimaryValueAttribute.
		 */
		primaryValuePrefix: "Primary",

		/**
		 * Default value for currency rate attribute.
		 */
		cuurencyRateAttributeName: "CurrencyRate",

		/**
		 * Default value for currency attribute.
		 */
		cuurencyAttributeName: "Currency",

		/**
		 * Default value for division attribute.
		 */
		divisionAttributeName: "Division",

		/**
		 * Initializes view model instance if config consists it
		 * @private
		 * @param {Object} config Configuration object.
		 */
		initViewModelInstance: function(config) {
			if (config && config.modelInstance) {
				this.modelInstance = config.modelInstance;
			} else {
				this.modelInstance = this;
			}
		},

		/**
		 * ViewModel.get() wrapper.
		 * @private
		 * @param {String} attribute View model attribute name.
		 * @return {String/Number/Date/Boolean/Object}
		 */
		getViewModelValue: function(attribute) {
			return this.modelInstance.get(attribute);
		},

		/**
		 * ViewModel.set() wrapper.
		 * @private
		 * @param {String} attribute View model attribute name.
		 * @param {String/Number/Date/Boolean/Object} value Value to set.
		 */
		setViewModelValue: function(attribute, value) {
			this.modelInstance.set(attribute, value);
		},

		/**
		 * Returns {@link Terrasoft.DecimalUtils} instance used to perform numeric computations.
		 * @private
		 * @return {Terrasoft.DecimalUtils}
		 */
		getDecimalUtils: function(config) {
			config = config || {};
			if (!this.decimalUtils) {
				this.decimalUtils = Ext.create("Terrasoft.DecimalUtils");
			}
			this.decimalUtils.decimalPlaces = config.precision || Terrasoft.data.constants.MONEY_PRECISION;
			return this.decimalUtils;
		},

		/**
		 * Returns attribute name which contain primary value.
		 * @param {String} valueAttribute View model attribute name.
		 * @param {Object} [config] Configuration object.
		 * @return {String}
		 */
		getPrimaryValueAttribute: function(valueAttribute, config) {
			return (config && config.primaryValueAttribute) || this.primaryValuePrefix + valueAttribute;
		},

		/**
		 * Returns attribute name which contain currency rate.
		 * @private
		 * @param config Configuration object.
		 * @return {String}
		 */
		getCurrencyRate: function(config) {
			var attribute = (config && config.currencyRateAttribute) || this.cuurencyRateAttributeName;
			return this.getViewModelValue(attribute);
		},

		/**
		 * Returns current currency division value, can be defined in target class.
		 * @protected
		 * @param {Object} [config] Configuration object.
		 * @return {Number}
		 */
		getCurrencyDivision: function(config) {
			var value;
			config = config || {};
			if (config.currencyDivision) {
				value = config.currencyDivision;
			} else {
				var currency = this.getViewModelValue(config.currencyAttribute || this.cuurencyAttributeName);
				var divisionProp = config.currencyDivisionProp || this.divisionAttributeName;
				value = currency && currency[divisionProp];
			}
			return Boolean(value) ? value : 1;
		},

		/**
		 * Recalculate primary amount value using value in current currency and currency rate.
		 * Usage:
		 *    this.recalculatePrimaryValue("Amount")
		 * or
		 *    this.recalculatePrimaryValue("Amount", {
		 *        primaryValueAttribute: "PrimaryAmount",
		 *        currencyAttribute: "Currency"
		 *    })
		 * @param attribute View model attribute name.
		 * @param config Configuration object.
		 */
		recalculatePrimaryValue: function(attribute, config) {
			this.initViewModelInstance(config);
			var currencyValue = this.getViewModelValue(attribute);
			var primaryValueAttribute = this.getPrimaryValueAttribute(attribute, config);
			var baseValue;
			if (Ext.isEmpty(currencyValue)) {
				baseValue = currencyValue;
			} else {
				var currencyRate = this.getCurrencyRate(config);
				if (Ext.isEmpty(currencyRate) || currencyRate <= 0) {
					return;
				}
				var division = this.getCurrencyDivision(config);
				var decimalUtils = this.getDecimalUtils();
				baseValue = decimalUtils.evaluate({
					divide: [{multiply: [currencyValue, division]}, currencyRate]
				});
			}
			if (this.getViewModelValue(primaryValueAttribute) !== baseValue) {
				this.setViewModelValue(primaryValueAttribute, baseValue);
			}
		},

		/**
		 * Recalculate current currency value using primary amount value and currency rate.
		 * Usage:
		 *    this.recalculateValue("Amount")
		 * or
		 *    this.recalculateValue("Amount", {
		 *        primaryValueAttribute: "PrimaryAmount",
		 *        currencyAttribute: "Currency"
		 *    })
		 * @param attribute View model attribute name.
		 * @param config Configuration object.
		 */
		recalculateValue: function(attribute, config) {
			this.initViewModelInstance(config);
			var primaryValueAttribute = this.getPrimaryValueAttribute(attribute, config);
			var baseValue = this.getViewModelValue(primaryValueAttribute);
			var currencyValue;
			if (Ext.isEmpty(baseValue)) {
				currencyValue = baseValue;
			} else {
				var currencyRate = this.getCurrencyRate(config);
				if (Ext.isEmpty(currencyRate) || currencyRate <= 0) {
					return;
				}
				var division = this.getCurrencyDivision(config);
				var decimalUtils = this.getDecimalUtils();
				currencyValue = decimalUtils.evaluate({
					divide: [{multiply: [baseValue, currencyRate]}, division]
				});
			}
			if (this.getViewModelValue(attribute) !== currencyValue) {
				this.setViewModelValue(attribute, currencyValue);
			}
		},

		/**
		 * Calculates percent by part of whole value
		 * example:
		 * amount = 10, part = 2, result = 20 (2 is 20% of 100).
		 * @param {Number} amount Total value.
		 * @param {Number} part Partial value.
		 * @returns {Number}
		 */
		getPercentage: function(amount, part) {
			var decimalUtils = this.getDecimalUtils();
			return decimalUtils.evaluate({
				multiply: [{divide: [part, amount]}, 100]
			});
		},

		/**
		 * Calculates percent part of whole value by given percent.
		 * example:
		 * amount = 10, percent = 20, result = 2 (2 is 20% of 10).
		 * @param {Number} amount Total value.
		 * @param {Number} percent Partial percent .
		 * @returns {Number}
		 */
		getPercentagePart: function(amount, percent) {
			var decimalUtils = this.getDecimalUtils();
			return decimalUtils.evaluate({
				multiply: [{divide: [percent, 100]}, amount]
			});
		},

		/**
		 * Splits given value in two parts by percentage, returns part which corresponds to given percent value.
		 * example:
		 * amount = 12, percent = 20, result = 2 (2 is 20% of 10, and 2 is included to amount, 10 + 2 = 12).
		 * @param {Number} amount Total value.
		 * @param {Number} percent Inclusive percent.
		 * @returns {Number}
		 */
		getIncludedPercentagePart: function(amount, percent) {
			var decimalUtils = this.getDecimalUtils();
			return decimalUtils.evaluate({
				divide: [{multiply: [amount, percent]}, {add: [percent, 100]}]
			});
		},

		/**
		 * Rounds value to {@link Terrasoft.DecimalUtils#decimalPlaces}.
		 * @param {Number} value Value to round.
		 * @return {Number}
		 */
		roundMoney: function(value) {
			var decimalUtils = this.getDecimalUtils();
			return decimalUtils.roundValue(value);
		},

		/**
		 * Rounds value to given in config values or {@link Terrasoft.DecimalUtils#decimalPlaces}.
		 * @param {Number} value Value to round.
		 * @param {Object} [config] Configuration object.
		 * @param {String} [config.targetColumnName] ViewModel column name,
		 * description for other params {@link Terrasoft.DecimalUtils#roundValue}.
		 * @return {Number}
		 */
		roundValue: function(value, config) {
			config = Ext.clone(config || {});
			if ("targetColumnName" in config) {
				var column = this.getColumnByName(config.targetColumnName);
				if (!column) {
					throw new Terrasoft.exceptions.ItemNotFoundException({
						message: "Column with name " + config.targetColumnName + " not found"
					});
				}
				config.decimalPlaces = column.precision;
				delete config.targetColumnName;
			}
			var decimalUtils = this.getDecimalUtils();
			return decimalUtils.roundValue(value, config);
		},

		/**
		 * Converts rate for another currency's primary rate.
		 * Example:
		 * RUB is base currency and has division 1 and rate 1.
		 * USD has division 1 and rate 65 (65 rubles for 1 USD).
		 * 1 / 65 = 0.0153 USD for 1 RUB
		 * @param {Number} division Currency's division.
		 * @param {Number} rate Currency's rate.
		 * @param {Number} rateMantissa Rate's mantissa.
		 * @param {Number} [precision] Result precision.
		 * @return {Number} Converted rate.
		 */
		calculateRate: function(division, rate, rateMantissa, precision) {
			precision = precision || 4;
			var decimalUtils = this.getDecimalUtils({precision : precision});
			rate = this.applyMantissaConversion(rate, rateMantissa);
			return decimalUtils.evaluate({
				multiply: [{divide: [division, rate]}, division]
			});
		},

		/**
		 * Returns precision of entity schema column.
		 * @param {String} columnName Column name.
		 * @return {Number} Precision.
		 */
		getColumnPrecision: function(columnName) {
			const column = this.entitySchema.columns[columnName] || {};
			return column.precision || 2;
		},

		/**
		 * Restores correct rate by mantissa value.
		 * @param {Number} rate - current rate.
		 * @param {Number} mantissa - mantissa value.
		 * @returns {Number} - restored rate.
		 */
		applyMantissaConversion: function(rate, mantissa) {
			if (mantissa > 0) {
				rate = Math.floor(rate);
				rate += mantissa / Math.pow(10, mantissa.toString().length);
			}
			return rate;
		},
		
		/**
		 * Forms save query for currency rate object.
		 * @param {Object} config Parameters config.
		 * @param {Terrasoft.BaseQuery} config.query Save query.
		 * @param {Number} config.rate Currency rate.
		 * @param {Number} config.division Currency division.
		 * @return {Terrasoft.BaseQuery} Formed query.
		 */
		formCurrencyRateSaveQuery: function(config) {
			var query = config.query;
			var columnValues = query.columnValues;
			var rateValue = config.rate || 0;
			var rateColumnConfig = this.columns.Rate;
			var division = config.division;
			if (rateValue && division) {
				rateValue = division * division / rateValue;
				columnValues.removeByKey("Rate");
				columnValues.setParameterValue(rateColumnConfig.columnPath, rateValue,
						this.getColumnDataType("Rate"));
			}
			return query;
		},

		
		/**
		 * Returns object for custom money calculations.
		 * @protected
		 * @return {Terrasoft.DecimalUtils}
		 */
		getMoneyCalculator: function() {
			return this.getDecimalUtils();
		}

	});

	return Terrasoft.MoneyUtilsMixin;

});


