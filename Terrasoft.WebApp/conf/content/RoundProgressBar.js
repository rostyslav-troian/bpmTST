Terrasoft.configuration.Structures["RoundProgressBar"] = {innerHierarchyStack: ["RoundProgressBar"]};
define("RoundProgressBar", ["ext-base", "css!RoundProgressBar", "BaseProgressBarIndicator"],
	function(Ext) {

		/**
		 * @class Terrasoft.controls.CompletenessIndicator
		 * Cirlce progress bar component class.
		 */
		Ext.define("Terrasoft.controls.RoundProgressBar", {
			alternateClassName: "Terrasoft.RoundProgressBar",
			extend: "Terrasoft.BaseProgressBarIndicator",

			//region Fields: Protected

			/**
			 * @inheritdoc Terrasoft.Component#tpl
			 * @overridden
			 */
			tpl: [
				/* jshint ignore:start */
				/* jscs:disable */
				'<div id="{id}-wrap" class="{wrapClass} ts-round-progress-bar-wrap" style="{wrapStyle}" progress-data="{value}">',
					'<div id="{id}-circle" class="circle" style="{circleElStyle}">',
						'<div id="{id}-firstHalf" class="half" style="{firstHalfElStyle}"></div>',
						'<div id="{id}-secondHalf" class="half" style="{secondHalfElStyle}"></div>',
					'</div>',
					'<div id="{id}-overlay" class="overlay" style="{overlayElStyle}" data-item-marker="{id}">',
					'<span class="caption">{caption}',
						'<tpl if="captionSuffix">',
							'<span class="caption-suffix">{captionSuffix}</span>',
						'</tpl>',
					'</span>',
					'</div>',
					'<tpl if="menu">',
						'<span id="{id}-menuWrapEl" class="{menuWrapClass}"></span>',
					'</tpl>',
				'</div>'
				/* jscs:enable */
				/* jshint ignore:end */
			],

			/**
			 * Indicator size (px).
			 * @protected
			 * @type {Number}
			 */
			size: 32,

			/**
			 * Indicator border width (px).
			 * @protected
			 * @type {Number}
			 */
			borderWidth: 3,

			/**
			 * Clockwise's tag.
			 * @protected
			 * @type {Boolean}
			 */
			clockwise: false,

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.Component#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.selectors = {
					wrapEl: "",
					circleEl: "",
					firstHalfEl: "",
					secondHalfEl: "",
					overlayEl: ""
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseProgressBarIndicator#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				this.setSectorsProgressColor();
				this.selectors.wrapEl = "#" + this.id + "-wrap";
				this.selectors.circleEl = "#" + this.id + "-circle";
				this.selectors.firstHalfEl = "#" + this.id + "-firstHalf";
				this.selectors.secondHalfEl = "#" + this.id + "-secondHalf";
				this.selectors.overlayEl = "#" + this.id + "-overlay";
				this.setWrapClasses(tplData);
				return tplData;
			},

			/**
			 * @inheritdoc Terrasoft.BaseProgressBarIndicator#getBindConfig
			 * @overridden
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var completenessIndicatorBindConfig = {
					size: {
						changeMethod: "setSize"
					},
					clockwise: {
						changeMethod: "setClockwise"
					},
					borderWidth: {
						changeMethod: "setBorderWidth"
					}
				};
				Ext.apply(completenessIndicatorBindConfig, bindConfig);
				return completenessIndicatorBindConfig;
			},

			/**
			 * Set indicator's style.
			 * @protected
			 * @param {Object} tplData Component template parameters.
			 */
			setWrapClasses: function(tplData) {
				var value = this.value;
				var size = this.size;
				var borderWidth = this.borderWidth;
				var radius = size / 2;
				var overlaySize = size - (this.borderWidth * 2);
				var degree = 0;
				if (value > 0) {
					degree = 360 * (value / this.maxValue);
				}
				var firstHalfRotate = degree > 180 ? 180 : degree;
				var secondHalfRotate = degree;
				var progressColor = this.progressColor;
				var defaultHalfStyle = {
					"border-color": progressColor,
					"border-radius": radius + "px",
					"border-width": borderWidth + "px",
					"clip": "rect(0px, " + radius + "px, " + size + "px, 0px)"
				};
				tplData.wrapStyle = {
					"width": size + "px",
					"height": size + "px"
				};
				tplData.circleElStyle = {
					"clip": "rect(0px, " + size + "px, " + size + "px, " + radius + "px)"
				};
				tplData.firstHalfElStyle = Ext.apply({
					"transform": "rotate(" + firstHalfRotate + "deg)"
				}, defaultHalfStyle);
				tplData.secondHalfElStyle = Ext.apply({
					"transform": "rotate(" + secondHalfRotate + "deg)",
					"display": degree > 180 ? "block" : "none"
				}, defaultHalfStyle);
				tplData.overlayElStyle = {
					"width": overlaySize + "px",
					"height": overlaySize + "px",
					"line-height": overlaySize + "px",
					"margin-left": borderWidth + "px",
					"margin-top": borderWidth + "px",
					"color": progressColor
				};
				if (degree > 180) {
					this.applyDegreeStyle(tplData.circleElStyle);
				}
				if (this.clockwise) {
					this.applyDirectionStyle(tplData.circleElStyle);
				}
			},

			/**
			 * Append style when {@link #value value} more {@link #maxValue maxValue}.
			 * @protected
			 * @param  {Object} elStyle Element style.
			 */
			applyDegreeStyle: function(elStyle) {
				Ext.apply(elStyle, {
					"clip": "rect(auto, auto, auto, auto)"
				});
			},

			/**
			 * Append style when {@link #clockwise clockwise} equal true.
			 * @protected
			 * @param  {Object} elStyle Element style.
			 */
			applyDirectionStyle: function(elStyle) {
				Ext.apply(elStyle, {
					"transform": "scaleX(1)"
				});
			},

			//endregion

			//region Methods: Public

			/**
			 * Set indicator size.
			 * @param {Number} size Indicator size.
			 */
			setSize: function(size) {
				size = Ext.isEmpty(size) ? 0 : size;
				if (this.size === size) {
					return;
				}
				this.size = size;
				if (this.rendered) {
					this.reRender();
				}
			},

			/**
			 * Set clockwise tag.
			 * @param {Boolean} clockwise clockwise tag.
			 */
			setClockwise: function(clockwise) {
				clockwise = Ext.isEmpty(clockwise) ? false : clockwise;
				if (this.clockwise === clockwise) {
					return;
				}
				this.clockwise = clockwise;
				if (this.rendered) {
					this.reRender();
				}
			},

			/**
			 * Set indicator border width.
			 * @param {Number} borderWidth Indicator width.
			 */
			setBorderWidth: function(borderWidth) {
				borderWidth = Ext.isEmpty(borderWidth) ? 0 : borderWidth;
				if (this.borderWidth === borderWidth) {
					return;
				}
				this.borderWidth = borderWidth;
				if (this.rendered) {
					this.reRender();
				}
			}

			//endregion
		});
		return Terrasoft.RoundProgressBar;
	}
);


