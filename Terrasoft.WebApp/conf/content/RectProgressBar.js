Terrasoft.configuration.Structures["RectProgressBar"] = {innerHierarchyStack: ["RectProgressBar"]};
define("RectProgressBar", ["ext-base", "css!RectProgressBar", "BaseProgressBarIndicator"],
		function(Ext) {

			/**
			 * @class Terrasoft.controls.RectProgressBar
			 * Rectangle progress bar component class.
			 */
			Ext.define("Terrasoft.controls.RectProgressBar", {
				alternateClassName: "Terrasoft.RectProgressBar",
				extend: "Terrasoft.BaseProgressBarIndicator",

				//region Fields: Public

				/**
				 * Horizontal rectangle progress bar flag.
				 * @type {Boolean}
				 */
				horizontal: false,

				//endregion

				//region Fields: Protected

				/**
				 * Horizontal progress bar css class.
				 * @protected
				 * @type {String}
				 */
				horizontalClass: "horizontal-progress-bar",

				/**
				 * Fill value css attribute name.
				 * @protected
				 * @type {String}
				 */
				valueCssAttibute: "height",

				/**
				 * Align caption css attribute name.
				 * @protected
				 * @type {String}
				 */
				captionAlignCssAttibute: "bottom",

				/**
				 * @inheritdoc Terrasoft.Component#tpl
				 * @overridden
				 */
				tpl: [
					/* jshint ignore:start */
					/* jscs:disable */
					'<div id="{id}-wrap" class="{wrapClass} ts-rect-progress-bar-wrap completeness-indicator-wrap {horizontalClass}" progress-data="{value}">',
					'<div id="{id}-rect" class="rect" style="{rectElStyle}"></div>',
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

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.Component#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.setDefaultCssAttributes();
					this.selectors = {
						wrapEl: "#" + this.id + "-wrap",
						rectEl: "#" + this.id + "-rect",
						overlayEl: "#" + this.id + "-overlay"
					};
				},

				/**
				 * Sets default css attributes.
				 * @protected
				 */
				setDefaultCssAttributes: function() {
					if (this.horizontal) {
						this.valueCssAttibute = "width";
						this.captionAlignCssAttibute = Terrasoft.getIsRtlMode() ? "right" : "left";
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseProgressBarIndicator#getTplData
				 * @overridden
				 */
				getTplData: function() {
					var tplData = this.callParent(arguments);
					tplData.horizontalClass = this.horizontal ? this.horizontalClass : "";
					this.setSectorsProgressColor();
					return tplData;
				},

				/**
				 * @inheritdoc Terrasoft.Component#onAfterRender
				 * @overridden
				 */
				onAfterRender: function() {
					this.callParent(arguments);
					this.setWrapClasses();
				},

				/**
				 * @inheritdoc Terrasoft.Component#onAfterReRender
				 * @overridden
				 */
				onAfterReRender: function() {
					this.callParent(arguments);
					this.setWrapClasses();
				},

				/**
				 * Set indicator's style.
				 * @protected
				 */
				setWrapClasses: function() {
					if (this.rectEl) {
						var valueStyle = {
							"background-color": this.progressColor
						};
						valueStyle[this.valueCssAttibute] = this.value + "%";
						this.rectEl.setStyle(valueStyle);
					}
					if (this.overlayEl) {
						var captionStyle = {
							"color": this.progressColor
						};
						var captionOffset = this.horizontal ?
								(this.overlayEl.dom.clientWidth / 2) :
								(this.overlayEl.dom.clientHeight / 2);
						captionStyle[this.captionAlignCssAttibute] =
								"calc(" + this.value + "% - " + captionOffset + "px)";
						this.overlayEl.setStyle(captionStyle);
					}
				}

				//endregion
			});
			return Terrasoft.RectProgressBar;
		}
);


