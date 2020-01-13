Terrasoft.configuration.Structures["IconizedProgressBar"] = {innerHierarchyStack: ["IconizedProgressBar"]};
define("IconizedProgressBar", ["ext-base", "IconizedProgressBarResources", "css!IconizedProgressBar",
		"BaseProgressBarIndicator"], function(Ext, Resources) {
		/**
		 * @class Terrasoft.controls.IconizedProgressBar
		 * Rectangle progress bar component class.
		 */
		Ext.define("Terrasoft.controls.IconizedProgressBar", {
			alternateClassName: "Terrasoft.IconizedProgressBar",
			extend: "Terrasoft.BaseProgressBarIndicator",

			/**
			 * Array of progress points config.
			 * @type {Array}
			 */
			_icons: [],

			/**
			 * Point icon url.
			 * @type {String}
			 */
			pointIconUrl: Terrasoft.ImageUrlBuilder.getUrl(Resources.localizableImages.DefaultPointIcon),

			/**
			 * Empty point icon url.
			 * @type {String}
			 */
			emptyPointIconUrl: Terrasoft.ImageUrlBuilder.getUrl(Resources.localizableImages.EmptyPointIcon),

			/**
			 * @inheritdoc Terrasoft.Component#tpl
			 * @override
			 */
			tpl: [
				/* jshint ignore:start */
				/* jscs:disable */
				'<div id="{id}-wrap" class="{wrapClass} ts-iconized-progress-bar-wrap">',
				'<div id="{id}-iconized-progress-bar" class="iconized-progress-bar">',
				'<ul>',
				'<tpl for="icons">',
				'<li><img class="progress-point-icon" src={url} /></li>',
				'</tpl>',
				'</ul>',
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
			 * Setups progress icon url array.
			 * @protected
			 */
			fillProgressPoints: function() {
				this._icons = [];
				var sectorsBounds = this.sectorsBounds;
				var pointsRange = sectorsBounds.length;
				if (this.validateSectorsBounds(sectorsBounds)) {
					for (var i = 0; i < pointsRange - 1; i++) {
						var targetIcon = (this.value > 0 && this.value >= sectorsBounds[i])
							? this.pointIconUrl
							: this.emptyPointIconUrl;
						if (Ext.isEmpty(targetIcon)) {
							continue;
						}
						var icon = {
							url: targetIcon
						};
						this._icons.push(icon);
					}
				}
			},

			/**
			 * @inheritdoc Terrasoft.Component#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.selectors = {
					wrapEl: "#" + this.id + "-wrap",
					overlayEl: "#" + this.id + "-overlay"
				};
				this.addEvents(
					/**
					 * Progress bar click event
					 * @param {Terrasoft.IconizedProgressBar} this
					 */
					"click"
				);
			},

			/**
			 * Implements mixin interface {@link Terrasoft.Bindable}.
			 * @override
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var iconizedIndicatorBindConfig = {
					pointIconUrl: {
						changeMethod: "setPointIconUrl"
					},
					emptyPointIconUrl: {
						changeMethod: "setEmptyPointIconUrl"
					}
				};
				Ext.apply(iconizedIndicatorBindConfig, bindConfig);
				return iconizedIndicatorBindConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseProgressBarIndicator#getTplData
			 * @override
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				this.fillProgressPoints();
				tplData.icons = this._icons;
				this.setSectorsProgressColor();
				return tplData;
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterRender
			 * @override
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.setWrapClasses();
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterReRender
			 * @override
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
				if (this.overlayEl) {
					var captionStyle = {
						"color": this.progressColor
					};
					this.overlayEl.setStyle(captionStyle);
				}
			},

			/**
			 * Set point icon url.
			 * @param {String} iconUrl to custom icon for progress point.
			 */
			setPointIconUrl: function(iconUrl) {
				if (Ext.isEmpty(iconUrl) || this.pointIconUrl === iconUrl) {
					return;
				}
				this.pointIconUrl = iconUrl;
				this.safeRerender();
			},

			/**
			 * Set empty point icon url.
			 * @param {String} iconUrl to custom icon for "empty" progress point.
			 */
			setEmptyPointIconUrl: function(iconUrl) {
				if (Ext.isEmpty(iconUrl) || this.emptyPointIconUrl === iconUrl) {
					return;
				}
				this.emptyPointIconUrl = iconUrl;
				this.safeRerender();
			}
		});
		return Terrasoft.IconizedProgressBar;
	}
);


