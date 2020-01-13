Terrasoft.configuration.Structures["MultiCurrencyEditViewGenerator"] = {innerHierarchyStack: ["MultiCurrencyEditViewGenerator"]};
define("MultiCurrencyEditViewGenerator", ["ext-base", "MultiCurrencyEditViewGeneratorResources", "terrasoft",
		"DesignViewGeneratorV2", "CtiContainerList"],
	function(Ext, resources, Terrasoft) {
		Ext.define("Terrasoft.configuration.MultiCurrencyEditViewGenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.MultiCurrencyEditViewGenerator",

			//region Methods: Private

			/**
			 * Gets column name for label.
			 * @private
			 * @param {Object} config Label configuration.
			 * @return {String}
			 */
			getLabelColumnName: function(config) {
				var caption = config.caption;
				var labelConfig = config.labelConfig;
				var captionBindTo = caption && caption.bindTo;
				var labelConfigBindTo = labelConfig && labelConfig.caption && labelConfig.caption.bindTo;
				var configBindTo = config.bindTo;
				return captionBindTo || labelConfigBindTo || configBindTo;
			},

			/**
			 * Gets converter method for label.
			 * @private
			 * @param {Object} config Label configuration.
			 * @return {Function}
			 */
			getLabelConverter: function(config) {
				var columnName = this.getLabelColumnName(config);
				var converter = ((config.labelConfig && config.labelConfig.caption) || config.caption)
					? function(value) {
						var columnCaption = this.get(columnName);
						return this.multiCurrencyCaptionConverter(columnCaption, value);
					}
					: function(value) {
						var column = this.entitySchema.getColumnByName(columnName);
						return this.multiCurrencyCaptionConverter(column.caption, value);
					};
				return converter;
			},

			/**
			 * Deletes properties from configuration object.
			 * @private
			 * @param {Object} config Configuration object.
			 * @param {String[]} properties Array of properties names.
			 */
			deleteConfigProperties: function(config, properties) {
				if (Ext.isEmpty(properties)) {
					return;
				}
				properties.forEach(function(property) {
					delete config[property];
				});
			},

			/**
			 * Returns decimal precision by column name.
			 * @private
			 * @param {String} columnName Column name.
			 * @return {Number} Decimal precision.
			 */
			_getDecimalPrecision: function(columnName) {
				var viewModel = this.getViewModel();
				var column = viewModel.columns[columnName];
				var precision = column.precision || Terrasoft.SysValue.CURRENT_MONEY_DISPLAY_PRECISION;
				return precision;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Gets configuration object for binding of multi currency control with model method or property.
			 * @protected
			 * @param {Object} viewConfig Control config.
			 * @param {String} propertyName Property name.
			 */
			getPropertyBindingConfig: function(viewConfig, propertyName) {
				var property = viewConfig[propertyName];
				if (Ext.isEmpty(property)) {
					return null;
				}
				return property.bindTo || {"bindTo": property};
			},

			/**
			 * Generates multi currency label config.
			 * @protected
			 * @param {Object} viewConfig Control config.
			 * @return {Object} Multi currency label config.
			 */
			generateCurrencyLabel: function(viewConfig) {
				var labelConfig = Terrasoft.deepClone(viewConfig);
				this.deleteConfigProperties(labelConfig, ["primaryAmount", "rate",
					"primaryAmountEnabled", "currencyEnabled", "rateEnabled", "ruleConfig", "generator", "menu"]);
				var label = this.generateControlLabel(labelConfig);
				var labelWrap = this.generateControlLabelWrap(labelConfig);
				labelWrap.items.push(label);
				return labelWrap;
			},

			/**
			 * @inheritdoc Terrasoft.ViewGeneratorV2#getMarkerValue
			 * @overridden
			 */
			getMarkerValue: function(config) {
				return config.markerValue || config.name + " MultiCurrencyLabel";
			},

			/**
			 * @inheritdoc Terrasoft.ViewGeneratorV2#getLabelCaption
			 * @overridden
			 */
			getLabelCaption: function(config) {
				var result = {
					bindTo: config.currency,
					bindConfig: {
						converter: this.getLabelConverter(config)
					}
				};
				delete config.caption;
				delete config.labelConfig;
				delete config.currency;
				return result;
			},

			/**
			 * Generates multi currency button config.
			 * @protected
			 * @param {Object} config Control config.
			 * @return {Object} Multi currency button config.
			 */
			generateCurrencyButton: function(config) {
				var buttonConfig = {
					id: "multiCurrencyButton-currency" + config.name,
					className: "Terrasoft.Button",
					classes: {
						wrapperClass: ["currency-button"]
					},
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					menu: {
						items: {bindTo: "CurrencyButtonMenuList"}
					},
					enabled: true,
                    markerValue: config.name + " MultiCurrencyButton"
				};
				return this.generateButton(buttonConfig);
			},

			/**
			 * Generates multi currency edit config.
			 * @protected
			 * @param {Object} viewConfig Control config.
			 * @return {Object} Multi currency edit config.
			 */
			generateMultiCurrencyEdit: function(viewConfig) {
				var defaultMarkerValue = viewConfig.name + " MultiCurrencyEdit";
				var fieldLockHint = this.getHintConfig({
					content: resources.localizableStrings.FieldLockHint,
					alignEl: "disabledElIconEl"
				});
				var editButtonHint = this.getHintConfig({
					content: resources.localizableStrings.MulticurrencyEditButtonHint,
					alignEl: "rightIconWrapperEl"
				});
				var name = viewConfig.bindTo || viewConfig.name;
				var decimalPrecision = this._getDecimalPrecision(name);
				var controlConfig = {
					"value": {"bindTo": name},
					"decimalPrecision": viewConfig.decimalPrecision || decimalPrecision,
					"id": name + "Edit",
					"markerValue": viewConfig.markerValue || defaultMarkerValue,
					"className": "Terrasoft.MultiCurrencyEdit",
					"primaryAmount": this.getPropertyBindingConfig(viewConfig, "primaryAmount"),
					"rate": this.getPropertyBindingConfig(viewConfig, "rate"),
					"currency": this.getPropertyBindingConfig(viewConfig, "currency"),
					"primaryCurrency": {"bindTo": "PrimaryCurrency"},
					"currencyRateList": {"bindTo": "CurrencyRateList"},
					"tips": [fieldLockHint, editButtonHint],
					"classes": {
						"controlWrapClass": ["control-wrap"]
					},
					"primaryAmountEnabled": !Ext.isEmpty(viewConfig.primaryAmountEnabled)
						? (viewConfig.primaryAmountEnabled.bindTo || viewConfig.primaryAmountEnabled)
						: true,
					"currencyEnabled": !Ext.isEmpty(viewConfig.currencyEnabled)
						? (viewConfig.currencyEnabled.bindTo || viewConfig.currencyEnabled)
						: true,
					"rateEnabled": !Ext.isEmpty(viewConfig.rateEnabled)
						? (viewConfig.rateEnabled.bindTo || viewConfig.rateEnabled)
						: true
				};
				this.deleteConfigProperties(viewConfig, ["id", "value", "caption", "primaryAmount", "rate", "currency",
					"primaryAmountEnabled", "currencyEnabled", "rateEnabled", "ruleConfig", "generator", "menu",
					"decimalPrecision"]);
				Ext.apply(controlConfig, this.getConfigWithoutServiceProperties(viewConfig,
					["labelConfig", "labelWrapConfig", "caption", "textSize", "tip"]));
				this.applyControlConfig(controlConfig, viewConfig);
				return controlConfig;
			},

			/**
			 * Generates config for {Terrasoft.MultiCurrencyEdit}.
			 * @protected
			 * @param {Object} viewConfig Control config.
			 * @param {Object} config Internal control config.
			 * @return {Object} Generated config for MultiCurrencyEdit.
			 */
			generate: function(viewConfig, config) {
				this.init(config);
				var modelItemWrapId = this.getControlId(viewConfig, "Terrasoft.Container");
				var modelItemWrap = this.getDefaultContainerConfig(modelItemWrapId, viewConfig);
				var defaultClasses = this.getModelItemContainerClasses(viewConfig);
				this.addClasses(modelItemWrap, "wrapClassName", defaultClasses);
				var labelWrap = this.generateCurrencyLabel(viewConfig);
				var button = this.generateCurrencyButton(viewConfig);
				var multiCurrencyEdit = this.generateMultiCurrencyEdit(viewConfig);
				labelWrap.items.push(button);
				modelItemWrap.items.push(labelWrap, multiCurrencyEdit);
				return modelItemWrap;
			}

			//endregion

		});

		return Ext.create(Terrasoft.MultiCurrencyEditViewGenerator);
	});


