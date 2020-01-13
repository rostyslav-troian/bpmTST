Terrasoft.configuration.Structures["BaseProgressBarIndicator"] = {innerHierarchyStack: ["BaseProgressBarIndicator"]};
define("BaseProgressBarIndicator", ["ext-base", "CompletenessMenu", "CompletenessMenuItem"],
		function(Ext) {

			/**
			 * @class Terrasoft.controls.BaseProgressBarIndicator
			 * Progress bar component base class.
			 */
			Ext.define("Terrasoft.controls.BaseProgressBarIndicator", {
				alternateClassName: "Terrasoft.BaseProgressBarIndicator",
				extend: "Terrasoft.Component",

				mixins: {
					menuMixin: "Terrasoft.MenuMixin"
				},

				//region Fields: Protected

				/**
				 * Progress bar value.
				 * @protected
				 * @type {Number}
				 */
				value: 0,

				/**
				 * Max progress bar value.
				 * @protected
				 * @type {Number}
				 */
				maxValue: 100,

				/**
				 * Indicator color.
				 * @protected
				 * @type {String}
				 */
				progressColor: "#3BAD00",

				/**
				 * Indicator used colors.
				 * @protected
				 * @type {String[]}
				 */
				sectorsColors: ["#FF4800", "#FFAE00", "#3BAD00"],

				/**
				 * Array of sectors bounds.
				 * @protected
				 * @type {Number[]}
				 */
				sectorsBounds: [0, 25, 75, 100],

				/**
				 * @inheritdoc Terrasoft.MenuMixin#menuClass
				 * @overridden
				 */
				menuClass: "Terrasoft.CompletenessMenu",

				//endregion

				//region Fields: Public

				/**
				 * Caption, if not defined value will be used.
				 * @type {String}
				 */
				caption: null,

				/**
				 * Suffix for caption.
				 * @virtual
				 * @type {String}
				 */
				captionSuffix: "%",

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.Component#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.mixins.menuMixin.init.call(this);
				},

				/**
				 * @inheritdoc Terrasoft.Component#initDomEvents
				 * @overridden
				 */
				initDomEvents: function() {
					this.callParent(arguments);
					var wrapEl = this.getWrapEl();
					if (wrapEl) {
						wrapEl.on({
							click: {
								fn: this.onClick,
								scope: this
							}
						});
					}
				},

				/**
				 * Click event on progress bar control.
				 * @param {Ext.EventObjectImpl} e Event object.
				 * @protected
				 */
				onClick: function(e) {
					e.stopEvent();
					if (!this.enabled) {
						return;
					}
					var showMenu = this.menu && this.menu.items && this.menu.items.getCount() > 0;
					if (this.handler || this.hasListener("click")) {
						if (this.handler) {
							var obsoleteMessage = Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage;
							this.log(Ext.String.format(obsoleteMessage, "handler", "click event"));
							this.handler();
						}
						showMenu = (this.fireEvent("click", this, null, null, null) === false) && showMenu;
					}
					if (showMenu) {
						this.showMenu();
					}
				},

				/**
				 * Bind menu items to model.
				 * @overridden
				 */
				bind: function() {
					this.callParent(arguments);
					this.mixins.menuMixin.bindMenu.call(this, this.model);
				},

				/**
				 * @inheritdoc Terrasoft.Component#clearDomListeners
				 * @overridden
				 */
				clearDomListeners: function() {
					this.callParent(arguments);
					this.unsubscribeWindowScroll();
				},

				/**
				 * Returns the binding configuration to the model. Implements mixin interface {@link Terrasoft.Bindable}.
				 * @overridden
				 */
				getBindConfig: function() {
					var bindConfig = this.callParent(arguments);
					var completenessIndicatorBindConfig = {
						caption: {
							changeMethod: "setCaption"
						},
						value: {
							changeMethod: "setValue"
						},
						maxValue: {
							changeMethod: "setMaxValue"
						},
						progressColor: {
							changeMethod: "setProgressColor"
						},
						sectorsBounds: {
							changeMethod: "setSectorsBounds"
						},
						sectorsColors: {
							changeMethod: "setSectorsColors"
						}
					};
					Ext.apply(completenessIndicatorBindConfig, bindConfig);
					return completenessIndicatorBindConfig;
				},

				/**
				 * Validate sectors bounds.
				 * @protected
				 * @param {Number[]} sectorsBounds Array of sectors bounds.
				 * @return {Boolean} Validation result.
				 */
				validateSectorsBounds: function(sectorsBounds) {
					return (Ext.isArray(sectorsBounds) && sectorsBounds.length - 1 === this.sectorsColors.length);
				},

				/**
				 * Validate sectors colors.
				 * @protected
				 * @param {String[]} sectorsColors Array of sectors colors.
				 * @return {Boolean} Validation result.
				 */
				validateSectorsColors: function(sectorsColors) {
					return (Ext.isArray(sectorsColors) && sectorsColors.length + 1 === this.sectorsBounds.length);
				},

				/**
				 * Set indicator's color.
				 * @protected
				 */
				setSectorsProgressColor: function() {
					var sectorsColors = this.sectorsColors;
					var sectorsBounds = this.sectorsBounds;
					if (this.validateSectorsBounds(sectorsBounds) && this.validateSectorsColors(sectorsColors)) {
						for (var i = sectorsBounds.length - 1; i >= 0; i--) {
							var bound = sectorsBounds[i];
							if ((this.value <= bound) && (i !== 0)) {
								continue;
							}
							var colorIndex = (i === sectorsBounds.length - 1) ? sectorsColors.length - 1 : i;
							this.progressColor = sectorsColors[colorIndex];
							return;
						}
					}
				},

				/**
				 * Returns caption DOM value.
				 * @protected
				 * @return {String}
				 */
				getCaptionValue: function() {
					var caption = this.caption;
					if (caption === null || caption === undefined) {
						caption = this.value;
					}
					return caption;
				},

				/**
				 * @inheritdoc Terrasoft.Component#getTplData
				 * @overridden
				 */
				getTplData: function() {
					var tplData = this.callParent(arguments);
					tplData.caption = this.getCaptionValue();
					tplData.captionSuffix = this.captionSuffix;
					return tplData;
				},

				//endregion

				//region Methods: Public

				/**
				 * Set indicator's value.
				 * @param {Number} value Indicator value.
				 */
				setValue: function(value) {
					value = Ext.isEmpty(value) ? 0 : value;
					value = value > this.maxValue ? this.maxValue : value;
					if (this.value === value) {
						return;
					}
					this.value = value;
					this.safeRerender();
				},

				/**
				 * Set indicator's max value.
				 * @param {Number} maxValue Indicator max value.
				 */
				setMaxValue: function(maxValue) {
					this.maxValue = maxValue;
					this.safeRerender();
				},

				/**
				 * Set indicator's caption.
				 * @param {String} caption Indicator caption.
				 */
				setCaption: function(caption) {
					if (this.caption === caption) {
						return;
					}
					this.caption = caption;
					this.safeRerender();
				},

				/**
				 * Set current indicator's color.
				 * @param {String} progressColor Indicator color.
				 */
				setProgressColor: function(progressColor) {
					if (Ext.isEmpty(progressColor) || this.progressColor === progressColor) {
						return;
					}
					this.progressColor = progressColor;
					this.safeRerender();
				},

				/**
				 * Set indicator's sectors.
				 * @param {Number[]} sectorsBounds Array of bound's values.
				 */
				setSectorsBounds: function(sectorsBounds) {
					this.sectorsBounds = this.validateSectorsBounds(sectorsBounds) ? sectorsBounds : [];
					this.safeRerender();
				},

				/**
				 * Set indicator's colors.
				 * @param {String[]} sectorsColors Array of colors values.
				 */
				setSectorsColors: function(sectorsColors) {
					this.sectorsColors = this.validateSectorsColors(sectorsColors) ? sectorsColors : [];
					this.safeRerender();
				}

				//endregion
			});
			return Terrasoft.BaseProgressBarIndicator;
		}
);


