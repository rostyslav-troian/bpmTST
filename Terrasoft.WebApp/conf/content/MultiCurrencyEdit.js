Terrasoft.configuration.Structures["MultiCurrencyEdit"] = {innerHierarchyStack: ["MultiCurrencyEdit"]};
define("MultiCurrencyEdit", ["terrasoft", "MultiCurrencyEditResources", "css!MultiCurrencyEdit", "MoneyEdit"],
	function(Terrasoft, resources) {
		/**
		 * @class Terrasoft.controls.MultiCurrencyEdit
		 * #####, ########### ############## ####### ##########.
		 */
		Ext.define("Terrasoft.controls.MultiCurrencyEdit", {
			extend: "Terrasoft.MoneyEdit",
			alternateClassName: "Terrasoft.MultiCurrencyEdit",

			mixins: {
				/**
				 * ###### ###### ######.
				 */
				rightIcon: "Terrasoft.RightIcon",

				/**
				 * ###### ########### ##########.
				 */
				expandable: "Terrasoft.Expandable"
			},

			//region Fields: Private

			/**
			 * @inheritdoc Terrasoft.BaseEdit#disabledClass
			 * @overridden
			 */
			disabledClass: "multi-currency-edit-disabled",

			/**
			 * ###### ## #######-####### ########## ############# ####.
			 * @private
			 * @type {Ext.Element}
			 */
			editWrapEl: null,

			/**
			 * ###### ## #######-####### ######## ########## ########.
			 * @private
			 * @type {Ext.Element}
			 */
			currencyButtonWrapEl: null,

			/**
			 * #########.
			 * @private
			 * @type {String}
			 */
			caption: "",

			/**
			 * ###### ## ####### ########### ####### ##### # ####### ###### # ########## ##########.
			 * @private
			 * @type {Terrasoft.Label}
			 */
			primaryAmountLabel: null,

			/**
			 * ###### ## ####### ########## ###### # ####### ###### # ########## ##########.
			 * @private
			 * @type {Terrasoft.MoneyEdit}
			 */
			primaryAmountEdit: null,

			/**
			 * ###### ## ####### ########## ####### # ########## ##########.
			 * @private
			 * @type {Terrasoft.ComboBoxEdit}
			 */
			currencyEdit: null,

			/**
			 * ###### ## ####### ########## ###### # ########## ##########.
			 * @private
			 * @type {Terrasoft.MoneyEdit}
			 */
			rateEdit: null,

			/**
			 * ###### ## ####### ########### ############## ########## # ##### # ########## ##########.
			 * @private
			 * @type {Terrasoft.Label}
			 */
			rateCurrencyInfoLabel: null,

			/**
			 * ###### ## ####### ########## ########## ######### ######## # ########## ##########.
			 * @private
			 * @type {Terrasoft.Button}
			 */
			applyButton: null,

			/**
			 * ###### ## ####### ########## ###### ######### ######## # ########## ##########.
			 * @private
			 * @type {Terrasoft.Button}
			 */
			cancelButton: null,

			//endregion

			//region Fields: Protected

			/**
			 * ###### ######### ######## ####### value, primaryAmount, currency, rate.
			 * @protected
			 * @type {Object}
			 */
			initValues: null,

			/**
			 * @inheritdoc Terrasoft.RightIcon#enableRightIcon
			 * @overridden
			 */
			enableRightIcon: false,

			/**
			 * @inheritdoc Terrasoft.Expandable#useAutoWidth
			 * @overridden
			 */
			useAutoWidth: true,

			/**
			 * Container template.
			 * @protected
			 * @type {String[]}
			 */
			containerTpl: [
				/*jscs: disable*/
				/* jshint quotmark: false */
				'<div id="{id}-multiCurrencyWrap" class="{controlWrapClass}">',
				'<div id="{id}-currencyButtonWrap" class="{currencyButtonWrapClass}">',
				'</div>',
				'{edit_placeholder}',
				'</div>'
				/* jshint quotmark: true */
				/*jscs: enable*/
			],

			//endregion

			//region Fields: Public

			/**
			 * Amount in base currency.
			 * @type {Number}
			 */
			primaryAmount: 0,

			/**
			 * @property {Object} currency Currency information.
			 * @property {String} currency.value Record identifier.
			 * @property {String} currency.displayValue Display value.
			 * @property {String} currency.ShortName Short name.
			 * @property {String} currency.Symbol Currency symbol.
			 * @property {Number} currency.Rate Currency rate.
			 * @property {Number} currency.Division Currency division.
			 * @type {Object}
			 */
			currency: null,

			/**
			 * Base currency.
			 * @type {Object}
			 */
			primaryCurrency: null,

			/**
			 * Collection of the currency and currency rate.
			 * @type {Terrasoft.Collection}
			 */
			currencyRateList: null,

			/**
			 * Currency rate.
			 * @type {Number}
			 */
			rate: 0,

			/**
			 * ####### ######### ## ## ### ####### ########## ###### # ####### ###### ########### ########## #######.
			 * @type {Boolean}
			 */
			primaryAmountEnabled: true,

			/**
			 * ####### ######### ## ## ### ####### ########## ####### # ########## ########## #######.
			 * @type {Boolean}
			 */
			currencyEnabled: true,

			/**
			 * ####### ######### ## ## ### ####### ########## ###### # ########## ########## #######.
			 * @type {Boolean}
			 */
			rateEnabled: true,

			/**
			 * Decimal precision part of the number for rate (the number of digits after the decimal point)
			 * @type {Number}
			 */
			rateDecimalPrecision: 4,

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.MoneyEdit#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				if (this.rateDecimalPrecision === null) {
					this.rateDecimalPrecision = this.decimalPrecision;
				}
			},

			/**
			 * ############## #########.
			 * @protected
			 */
			initEvents: function() {
				this.on("show", this.onShowContainer, this);
				this.on("hide", this.onHideContainer, this);
				this.addEvents(
					/**
					 * ######### ######### ##### # ####### ######.
					 * @event
					 */
					"primaryAmountChange",

					/**
					 * ######### ######### ######.
					 * @event
					 */
					"currencyChange",

					/**
					 * ######### ######### #####.
					 * @event
					 */
					"rateChange"
				);
			},

			/**
			 * @inheritdoc Terrasoft.RightIcon#onRightIconClick
			 * @overridden
			 */
			onRightIconClick: function() {
				if (!this.rendered) {
					return;
				}
				this.fireEvent("rightIconClick", this);
			},

			/**
			 * ############# ###### ###### ######## ##########.
			 * @protected
			 */
			initRightIcon: function() {
				this.rightIconConfig = {
					"source": Terrasoft.ImageSources.URL,
					"url": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.EditIcon)
				};
			},

			/**
			 * @inheritdoc Terrasoft.Component#initDomEvents
			 * @overridden
			 */
			initDomEvents: function() {
				this.callParent(arguments);
				this.on("rightIconClick", this.onMarkerWrapClick, this);
			},

			/**
			 * @inheritdoc Terrasoft.Component#clearDomListeners
			 * @overridden
			 */
			clearDomListeners: function() {
				this.callParent(arguments);
				this.un("rightIconClick", this.onMarkerWrapClick, this);
				var doc = Ext.getDoc();
				doc.un("mousedown", this.onMouseDownCollapse, this);
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTpl
			 * @overriden
			 */
			getTpl: function() {
				var tpl = this.callParent(arguments);
				//TODO: #CC-827 ########### ###### ####### ### ############### ######## ## ###### Ext.Template
				tpl = this.containerTpl.join("").replace("{edit_placeholder}", tpl.join(""));
				return [tpl];
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overriden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				Ext.apply(tplData, this.combineCurrencyButtonClasses(), {});
				return tplData;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEdit#combineSelectors
			 * @overriden
			 */
			combineSelectors: function() {
				var selectors = this.callParent(arguments);
				selectors = Ext.apply(selectors, {
					wrapEl: "#" + this.id + "-multiCurrencyWrap",
					editWrapEl: "#" + this.id + "-wrap",
					currencyButtonWrapEl: "#" + this.id + "-currencyButtonWrap"
				});
				return selectors;
			},

			/**
			 * ######### ##### ### ######## ########## ######## ## ######### ############.
			 * @protected
			 * @return {Object} ######, ########## CSS ######.
			 */
			combineCurrencyButtonClasses: function() {
				var currencyButtonWrapClass = {
					currencyButtonWrapClass: ["multi-currency-button-wrap"]
				};
				var classes = this.classes || {};
				if (!Ext.isEmpty(classes.currencyButtonWrapClass)) {
					currencyButtonWrapClass.currencyButtonWrapClass =
						Ext.Array.merge(classes.currencyButtonWrapClass,
							currencyButtonWrapClass.currencyButtonWrapClass);
				}
				return currencyButtonWrapClass;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEdit#applyHighlight
			 * @overriden
			 */
			applyHighlight: function() {
				if (!this.rendered) {
					return;
				}
				this.editWrapEl.addCls("base-edit-focus");
			},

			/**
			 * @inheritdoc Terrasoft.BaseEdit#removeHighlight
			 * @overriden
			 */
			removeHighlight: function() {
				this.editWrapEl.removeCls("base-edit-focus");
			},

			/**
			 * ######### ######### ###### #####.
			 * @protected
			 */
			applyCurrencyRateListChanged: function() {
				var currencyRateList = this.currencyRateList;
				if (!currencyRateList) {
					return;
				}
				var currenciesCount = currencyRateList.getCount();
				if (currenciesCount <= 1) {
					this.setEnableRightIcon(false);
					this.destroyContainerItems();
				} else {
					this.setEnableRightIcon(true);
				}
			},

			/**
			 * Creates components for expandable part of current control.
			 * @protected
			 */
			createContainerControls: function() {
				this.primaryAmountLabel = Ext.create("Terrasoft.Label");
				this.primaryAmountEdit = Ext.create("Terrasoft.MoneyEdit", {
					id: this.id + "-primaryAmountEdit",
					markerValue: "PrimaryAmountEdit",
					decimalPrecision: this.decimalPrecision,
					tips: [
						{
							tip: {
								content: resources.localizableStrings.FieldLockHint,
								displayMode: Terrasoft.TipDisplayMode.NARROW
							},
							settings: {
								alignEl: "disabledElIconEl"
							}
						}
					]
				});
				this.currencyEdit = Ext.create("Terrasoft.ComboBoxEdit", {
					id: this.id + "-currency",
					markerValue: "Currency"
				});
				this.rateEdit = Ext.create("Terrasoft.MoneyEdit", {
					id: this.id + "-rate",
					markerValue: "Rate",
					decimalPrecision: this.rateDecimalPrecision,
					tips: [
						{
							tip: {
								content: resources.localizableStrings.FieldLockHint,
								displayMode: Terrasoft.TipDisplayMode.NARROW
							},
							settings: {
								alignEl: "disabledElIconEl"
							}
						}
					]
				});
				this.rateCurrencyInfoLabel = Ext.create("Terrasoft.Label");
				this.applyButton = Ext.create("Terrasoft.Button", {
					markerValue: resources.localizableStrings.ApplyButtonCaption,
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					caption: resources.localizableStrings.ApplyButtonCaption
				});
				this.cancelButton = Ext.create("Terrasoft.Button", {
					markerValue: resources.localizableStrings.CancelButtonCaption,
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					caption: resources.localizableStrings.CancelButtonCaption
				});
			},

			/**
			 * ############## #### ###### ##### ### ######## ########## ########.
			 * @protected
			 */
			prepareCurrencyMenu: function() {
				var menu = this.currencyMenu;
				var currencyRateList = this.currencyRateList;
				if (!menu || !currencyRateList) {
					return;
				}
				menu.clearItems();
				if (currencyRateList.getCount() <= 1) {
					return;
				}
				currencyRateList.each(function(item) {
					var menuItem = Ext.create("Terrasoft.MenuItem", {
						caption: item.displayValue,
						markerValue: item.displayValue,
						tag: item.value
					});
					menuItem.on("click", this.onCurrencyMenuItemClick, this);
					menuItem.on("destroy", this.onCurrencyMenuItemDestroy, this);
					menu.addItem(menuItem);
				}, this);
			},

			/**
			 * ############# ## ####### ######### ########## ########### ##########.
			 * @protected
			 */
			subscribeForContainerControlsEvents: function() {
				this.currencyEdit.on("prepareList", this.onPrepareList, this);
				this.currencyEdit.on("change", this.onCurrencyEditChanged, this);
				this.rateEdit.on("change", this.onRateEditChanged, this);
				this.primaryAmountEdit.on("change", this.onPrimaryAmountEditChanged, this);
				this.applyButton.on("click", this.hide, this);
				this.cancelButton.on("click", this.onCancelClick, this);
			},

			/**
			 * ########## ### ######.
			 * @protected
			 * @param {Object} currency ######.
			 * @return {String} ### ######.
			 *
			 */
			getCurrencyCode: function(currency) {
				if (!currency) {
					return "";
				}
				return currency.Symbol || currency.ShortName;
			},

			/**
			 * ######### ###### ######### ########## # ########## ##########.
			 * @protected
			 */
			updateContainerControls: function() {
				var expandableContainer = this.getContainer();
				if (!(expandableContainer && expandableContainer.visible)) {
					return;
				}
				var currencyRateList = this.currencyRateList;
				var currency = this.currency ? currencyRateList.find(this.currency.value) : null;
				var primaryCurrency = this.primaryCurrency ? currencyRateList.find(this.primaryCurrency.value) : null;
				var primaryCurrencyCaption = resources.localizableStrings.PrimaryAmountCaption;
				var primaryCurrencyDisplayValue = primaryCurrency ? this.getCurrencyCode(primaryCurrency) : "";
				if (!Ext.isEmpty(primaryCurrencyDisplayValue)) {
					primaryCurrencyCaption = primaryCurrencyCaption.concat(", ", primaryCurrencyDisplayValue);
				}
				this.primaryAmountLabel.markerValue = primaryCurrencyCaption;
				this.primaryAmountLabel.setCaption(primaryCurrencyCaption);
				var rateInfoCaption = resources.localizableStrings.RateInfoCaption;
				var currencyDisplayValue = currency ? (currency.ShortName || currency.Symbol) : "";
				var currencyDivision = currency ? currency.Division : "";
				var rateCurrencyInfoCaption = Ext.String.format(rateInfoCaption,
					currencyDisplayValue, currencyDivision, primaryCurrencyDisplayValue);
				this.rateCurrencyInfoLabel.markerValue = rateCurrencyInfoCaption;
				this.rateCurrencyInfoLabel.setCaption(rateCurrencyInfoCaption);
				this.primaryAmountEdit.setEnabled(this.primaryAmountEnabled);
				this.currencyEdit.setEnabled(this.currencyEnabled);
				this.rateEdit.setEnabled(this.rateEnabled && (currency.value !== primaryCurrency.value));
			},

			/**
			 * ########## ######## ############### ######## ##########.
			 * @protected
			 */
			destroyContainerItems: function() {
				var container = this.getContainer();
				if (!container) {
					return;
				}
				this.primaryAmountLabel.destroy();
				this.primaryAmountEdit.destroy();
				this.currencyEdit.destroy();
				this.rateEdit.destroy();
				this.rateCurrencyInfoLabel.destroy();
				this.applyButton.destroy();
				this.cancelButton.destroy();
			},

			/**
			 * @inheritdoc Terrasoft.Expandable#getOffset
			 * @overridden
			 */
			getOffset: function() {
				var margin = this.currencyButtonWrapEl.getMargin();
				var width = this.currencyButtonWrapEl.getWidth();
				var offsetX = margin.left + width + margin.right + 1;
				return [offsetX, 1];
			},

			/**
			 * @inheritdoc Terrasoft.Expandable#getContainerConfig
			 * @overridden
			 */
			getContainerConfig: function() {
				this.createContainerControls();
				this.subscribeForContainerControlsEvents();
				return {
					"classes": {
						"wrapClassName": ["multi-currency-edit-expandable"]
					},
					"items": [
						{
							"className": "Terrasoft.Container",
							"id": "dataContainer",
							"classes": {
								"wrapClassName": ["data-container"]
							},
							"items": [
								{
									"className": "Terrasoft.Container",
									"id": "primaryAmountContainer",
									"items": [
										{
											"className": "Terrasoft.Container",
											"id": "primaryAmountLabelContainer",
											"classes": {"wrapClassName": ["item-label"]},
											"items": [
												this.primaryAmountLabel
											]
										},
										{
											"className": "Terrasoft.Container",
											"id": "primaryAmountControlContainer",
											"classes": {"wrapClassName": ["item-control"]},
											"items": [
												this.primaryAmountEdit
											]
										}
									]
								},
								{
									"className": "Terrasoft.Container",
									"id": "CurrencyContainer",
									"items": [
										{
											"className": "Terrasoft.Container",
											"id": "CurrencyLabelContainer",
											"classes": {"wrapClassName": ["item-label"]},
											"items": [
												{
													"className": "Terrasoft.Label",
													"caption": resources.localizableStrings.CurrencyCaption
												}
											]
										},
										{
											"className": "Terrasoft.Container",
											"id": "CurrencyControlContainer",
											"classes": {"wrapClassName": ["item-control"]},
											"items": [
												this.currencyEdit
											]
										}
									]
								},
								{
									"className": "Terrasoft.Container",
									"id": "RateContainer",
									"items": [
										{
											"className": "Terrasoft.Container",
											"id": "RateLabelContainer",
											"classes": {"wrapClassName": ["item-label"]},
											"items": [
												{
													"className": "Terrasoft.Label",
													"caption": resources.localizableStrings.RateCaption
												}
											]
										},
										{
											"className": "Terrasoft.Container",
											"id": "RateControlContainer",
											"classes": {"wrapClassName": ["item-control-rate"]},
											"items": [
												{
													"className": "Terrasoft.Container",
													"id": "RateControlWrapper",
													"classes": {"wrapClassName": ["item-control"]},
													"items": [
														this.rateEdit
													]
												},
												{
													"className": "Terrasoft.Container",
													"id": "rateInfoLabelContainer",
													"classes": {"wrapClassName": ["item-label"]},
													"items": [
														this.rateCurrencyInfoLabel
													]
												}
											]
										}
									]
								}
							]
						},
						{
							"className": "Terrasoft.Container",
							"id": "footerContainer",
							"classes": {
								"wrapClassName": ["footer-container"]
							},
							"items": [
								this.applyButton,
								this.cancelButton
							]
						}
					]
				};
			},

			/**
			 * ########## ############ ######## # ###### ### ########## ####### {@link Terrasoft.Bindable}.
			 * @protected
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var expandableBindConfig = this.mixins.expandable.getBindConfig(arguments);
				Ext.apply(bindConfig, expandableBindConfig);
				var buttonBindConfig = {
					primaryAmount: {
						changeMethod: "setPrimaryAmount",
						changeEvent: "primaryAmountChange"
					},
					currency: {
						changeMethod: "setCurrency",
						changeEvent: "currencyChange"
					},
					primaryCurrency: {
						changeMethod: "setPrimaryCurrency"
					},
					rate: {
						changeMethod: "setRate",
						changeEvent: "rateChange"
					},
					currencyRateList: {
						changeMethod: "setCurrencyRateList"
					},
					primaryAmountEnabled: {
						changeMethod: "setPrimaryAmountEnabled"
					},
					currencyEnabled: {
						changeMethod: "setCurrencyEnabled"
					},
					rateEnabled: {
						changeMethod: "setRateEnabled"
					}
				};
				Ext.apply(bindConfig, buttonBindConfig);
				return bindConfig;
			},

			/**
			 * ############# ######## ####, ## ########## ### #######.
			 * @protected
			 * @param {Terrasoft.BaseEdit} edit ####.
			 * @param {Object} value ######## ####.
			 */
			setSilentEditValue: function(edit, value) {
				var container = this.getContainer();
				if (container && container.visible && edit) {
					edit.suspendEvents();
					edit.setValue(value);
					edit.resumeEvents();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseEdit#setEnabled
			 * @overridden
			 */
			setEnabled: function(enabled) {
				this.callParent(arguments);
				if (!this.rendered) {
					return;
				}
				var wrapEl = this.getWrapEl();
				if (!Ext.isEmpty(wrapEl)) {
					wrapEl.removeCls(this.disabledClass);
				}
				if (enabled) {
					this.editWrapEl.removeCls(this.disabledClass);
				} else {
					this.editWrapEl.addCls(this.disabledClass);
				}
			},

			/**
			 * ######### ###### ###### ########### ## c##### ##### # ######.
			 * @protected
			 */
			updateCurrencyFromCurrencyList: function() {
				var currency = this.currency;
				if (!Ext.isEmpty(currency)) {
					var currencyValue = currency.value;
					if (!currency.displayValue && !Ext.isEmpty(currencyValue)) {
						currency = this.currencyRateList.find(currencyValue);
						if (!Ext.isEmpty(currency)) {
							this.setCurrency(currency);
						}
					}
				}
			},

			/**
			 * ########## ####### ####### ####, ############# ## ######### ######## ########## # ########### ####.
			 * @protected
			 * @param {Event} e ####### mousedown.
			 */
			onMouseDownCollapse: function(e) {
				var isInEditWrap = e.within(this.editWrapEl);
				var expandableContainer = this.getContainer();
				var isInContainerWrap = !expandableContainer || e.within(expandableContainer.getWrapEl());
				var currencyRateListView = this.currencyEdit.listView;
				var isInCurrencyRateListView = currencyRateListView ? e.within(currencyRateListView.getWrapEl()) : false;
				if (!isInEditWrap && !isInContainerWrap && !isInCurrencyRateListView) {
					this.hide();
				}
			},

			/**
			 * ########## ####### ####### ## ###### ###### ########.
			 * @protected
			 */
			onMarkerWrapClick: function() {
				var expandableContainer = this.getContainer();
				if (expandableContainer && expandableContainer.visible) {
					this.hide();
				} else {
					this.show();
				}
				var el = this.getEl();
				if (el) {
					el.focus();
				}
			},

			/**
			 * ############ ####### ####### ## ###### "######" # ########## ##########.
			 * @protected
			 */
			onCancelClick: function() {
				var initValues = this.initValues;
				if (initValues) {
					this.setCurrency(initValues.currency);
					this.setRate(initValues.rate);
					this.setPrimaryAmount(initValues.primaryAmount);
					this.setValue(initValues.amount);
				}
				this.hide();
			},

			/**
			 * ############ ####### ######### ######## #### ######.
			 * @protected
			 * @param {Object} value ######## ######.
			 */
			onCurrencyEditChanged: function(value) {
				this.setCurrency(value);
			},

			/**
			 * ############ ####### ######### ######## #### ##### ######.
			 * @protected
			 * @param {Number} value ######## ##### ######.
			 */
			onRateEditChanged: function(value) {
				this.setRate(value);
			},

			/**
			 * ############ ####### ######### ######## #### ##### #.#.
			 * @protected
			 * @param {Number} value ######## ##### #.#.
			 */
			onPrimaryAmountEditChanged: function(value) {
				this.setPrimaryAmount(value);
			},

			/**
			 * ############ ####### ###### ############ ##########.
			 * @protected
			 */
			onShowContainer: function() {
				var doc = Ext.getDoc();
				doc.on("mousedown", this.onMouseDownCollapse, this);
				this.initValues = {
					amount: this.getValue(),
					primaryAmount: this.primaryAmount,
					currency: this.currency,
					rate: this.rate
				};
				this.setSilentEditValue(this.primaryAmountEdit, this.primaryAmount);
				this.setSilentEditValue(this.currencyEdit, this.currency);
				this.setSilentEditValue(this.rateEdit, this.rate);
				this.updateContainerControls();
			},

			/**
			 * ############ ####### ####### ############ ##########.
			 * @protected
			 */
			onHideContainer: function() {
				this.initValues = null;
				var doc = Ext.getDoc();
				doc.un("mousedown", this.onMouseDownCollapse, this);
			},

			/**
			 * ############ ####### ###### ###### ## #### #####.
			 * @protected
			 * @param {Terrasoft.MenuItem} menuItem ####### ########## ####.
			 */
			onCurrencyMenuItemClick: function(menuItem) {
				var currency = this.currencyRateList.find(menuItem.tag);
				this.setCurrency(currency);
			},

			/**
			 * ############ ####### ########### ######## #### #####.
			 * @protected
			 * @param {Terrasoft.MenuItem} menuItem ####### ########## ####.
			 */
			onCurrencyMenuItemDestroy: function(menuItem) {
				menuItem.un("click", this.onCurrencyMenuItemClick, this);
				menuItem.un("destroy", this.onCurrencyMenuItemDestroy, this);
			},

			/**
			 * ############ ####### ########## ###### #####.
			 * @protected
			 */
			onPrepareList: function() {
				this.currencyEdit.loadList(this.currencyRateList);
			},

			/**
			 * @inheritDoc Terrasoft.BaseEdit#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.destroyContainerItems();
				this.mixins.expandable.destroy();
				this.callParent(arguments);
			},

			//endregion

			//region Methods: Public

			/**
			 * inheritdoc Terrasoft.Component#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.mixins.expandable.init.call(this);
				this.initEvents();
				this.initRightIcon();
			},

			/**
			 * ############# ######## ##### # ####### ######.
			 * @param {Number} value ######## ##### # ####### ######.
			 */
			setPrimaryAmount: function(value) {
				if (!value) {
					return;
				}
				var numericValue = this.parseNumber(value);
				var currentValue = this.primaryAmount;
				if (currentValue === numericValue) {
					return;
				}
				this.primaryAmount = numericValue;
				this.fireEvent("primaryAmountChange", numericValue);
				this.setSilentEditValue(this.primaryAmountEdit, numericValue);
			},

			/**
			 * ############# ######## ######.
			 * @param {Object} currency ######## ######.
			 */
			setCurrency: function(currency) {
				if (!currency) {
					return;
				}
				var currencyId = currency.value;
				var isNeedToUpdateCurrency = (this.currency && this.currency.value !== currencyId);
				if (this.currency && this.currency.displayValue && isNeedToUpdateCurrency === false) {
					return;
				}
				var currencyRateList = this.currencyRateList;
				if (!(currencyRateList && currencyRateList.getCount() > 0)) {
					this.currency = {value: currencyId};
					return;
				}
				var listCurrency = currencyRateList.find(currencyId);
				if (!listCurrency) {
					return;
				}
				this.currency = Ext.apply(currency, listCurrency);
				if (isNeedToUpdateCurrency) {
					this.fireEvent("currencyChange", currency);
				}
				if ((Ext.isEmpty(this.rate) || this.rate === 0) && currency.Rate) {
					this.setRate(currency.Rate);
				}
				this.setSilentEditValue(this.currencyEdit, currency);
				this.updateContainerControls();
			},

			/**
			 * ############# ######## #####.
			 * @param {Number} value ######## #####.
			 */
			setRate: function(value) {
				if (!value) {
					return;
				}
				var numericValue = this.parseNumber(value);
				var currentValue = this.rate;
				if (currentValue === value) {
					return;
				}
				this.rate = numericValue;
				this.fireEvent("rateChange", numericValue);
				this.setSilentEditValue(this.rateEdit, numericValue);
			},

			/**
			 * ############# ######## ####### ######.
			 * @param {Object} value ######## ####### ######.
			 */
			setPrimaryCurrency: function(value) {
				var currentValue = this.primaryCurrency;
				if (currentValue === value) {
					return;
				}
				this.primaryCurrency = value;
			},

			/**
			 * ############# ###### #####.
			 * @param {Terrasoft.Collection} value ###### #####.
			 */
			setCurrencyRateList: function(value) {
				this.currencyRateList = value;
				this.updateCurrencyFromCurrencyList();
				this.applyCurrencyRateListChanged();
			},

			/**
			 * ##### ######## #### ######### ####### ########## ###### # ####### ###### ########### ##########.
			 * @param {Boolean} value ####### ############.
			 */
			setPrimaryAmountEnabled: function(value) {
				var currentValue = this.primaryAmountEnabled;
				if (currentValue === value) {
					return;
				}
				this.primaryAmountEnabled = value;
			},

			/**
			 * ##### ######## #### ######### ####### ########## ####### # ########## ##########.
			 * @param {Boolean} value ####### ############.
			 */
			setCurrencyEnabled: function(value) {
				var currentValue = this.currencyEnabled;
				if (currentValue === value) {
					return;
				}
				this.currencyEnabled = value;
			},

			/**
			 * ##### ######## #### ######### ####### ########## ###### # ########## ##########.
			 * @param {Boolean} value ####### ############.
			 */
			setRateEnabled: function(value) {
				var currentValue = this.rateEnabled;
				if (currentValue === value) {
					return;
				}
				this.rateEnabled = value;
			}

			//endregion

		});

	}
);


