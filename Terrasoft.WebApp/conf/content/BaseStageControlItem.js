Terrasoft.configuration.Structures["BaseStageControlItem"] = {innerHierarchyStack: ["BaseStageControlItem"]};
define("BaseStageControlItem", ["ext-base"], function(Ext) {
	Ext.define("Terrasoft.controls.BaseStageControlItem", {
		extend: "Terrasoft.Button",
		alternateClassName: "Terrasoft.BaseStageControlItem",

		tpl: [
			// jscs:disable validateQuoteMarks
			/*jshint quotmark: false */
			'<div id="{id}-wrapperEl" class="{%this.generateItemClasses(out, values)%}" style="{style}">',
			'<span id="{id}-textEl" class="t-stage-text" title="{caption}">{caption}</span>',
			'<tpl if="menu">',
			'<span id="{id}-menuWrapEl" class="{menuWrapClass}">&nbsp;</span>',
			'<span id="{id}-menuEl" class="{menuClass}" style="{menuStyle}" {menuAttribute}>',
			'<span id="{id}-markerEl" class="{markerClass}" style="{markerStyle}"></span>',
			'</span>',
			'</tpl>',
			'</div>'
			/*jshint quotmark: true */
			// jscs:enable validateQuoteMarks
		],

		/**
		 * Caption of stage.
		 * @type {String}
		 */
		caption: null,

		/**
		 * Color of stage which is displayed in progress bar.
		 * @type {String}
		 */
		displayColor: null,

		/**
		 * Color of stage that is fetched from database.
		 * @type {String}
		 */
		color: null,

		/**
		 * Color of stage when hover behaviour is applied.
		 * @type {String}
		 */
		hoverColor: null,

		/**
		 * Returns true if stage is active.
		 * @type {Boolean}
		 */
		isActive: null,

		/**
		 * Returns true if stage is passed.
		 * @type {Boolean}
		 */
		isPassed: null,

		/**
		 * CSS class for stage.
		 * @type {String}
		 */
		stageClass: "stage-item",

		/**
		 * CSS class for enabled stage.
		 * @type {String}
		 */
		stageEnabledClass: "stage-enabled",

		/**
		 * CSS class for passed stage.
		 * @type {String}
		 */
		stagePassedClass: "stage-passed",

		/**
		 * CSS class for not passed stage.
		 * @type {String}
		 */
		stageNotPassedClass: "stage-not-passed",

		/**
		 * CSS class for current stage.
		 * @type {String}
		 */
		activeStageClass: "stage-current",

		/**
		 * CSS class for stage with menu.
		 * @type {String}
		 */
		stageWithMenuClass: "stage-with-menu",

		/**
		 * Generates CSS for stage item.
		 * @protected
		 * @param {Array} buffer Array of item CSS classes.
		 * @param {Object} data Object that contains parameters of control template.
		 */
		generateItemClasses: function(buffer, data) {
			var controlTplData = data.self.tplData;
			var controlScope = controlTplData.scope;
			var html = controlScope.stageClass;
			if (controlScope.isActive) {
				html +=  " " + controlScope.activeStageClass;
			}
			if (controlScope.isPassed) {
				html += " " + controlScope.stagePassedClass;
			} else {
				html += " " + controlScope.stageNotPassedClass;
			}
			if (controlScope.enabled) {
				html += " " + controlScope.stageEnabledClass;
			}
			var hasMenu = controlScope.hasMenu();
			if (hasMenu) {
				html += " " + controlScope.stageWithMenuClass;
			}
			buffer.push(html);
		},

		/**
		 * Generates inline style for stage item.
		 * @protected
		 * @return {string} Inline style of item.
		 */
		generateItemStyle: function() {
			var style = "";
			if (this.displayColor) {
				style =  Ext.String.format("background-color:{0}; border-color:{0}", this.displayColor);
			}
			return style;
		},

		/**
		 * @inheritdoc Terrasoft.Button#getTplData
		 * @overriden
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			Ext.apply(tplData, {
				caption: this.caption,
				scope: this,
				style: this.generateItemStyle(),
				generateItemClasses: this.generateItemClasses
			});
			this.tplData = tplData;
			return tplData;
		},

		/**
		 * @inheritdoc Terrasoft.Button#updateSelectors
		 * @overridden
		 */
		updateSelectors: function() {
			this.selectors = {
				wrapEl: Ext.String.format("#{0}-wrapperEl", this.id)
			};
		},

		/**
		 * Sets stages behaviour on hover.
		 * @param {String} wrapClass CSS wrapper class of stageControl.
		 */
		setItemHoverStyles: function(wrapClass) {
			var hoverColor = this.hoverColor;
			var stageNotPassedSelector
				= Ext.String.format(".{0}:hover div:not(.{1})", wrapClass, this.stagePassedClass);
			var stageNotPassedAfterSelector
				= Ext.String.format(".{0}:hover div:not(.{1})", wrapClass, this.stagePassedClass);
			var stagePassedSelector
				= Ext.String.format(".{0}:hover ~ .{1}", this.stageClass, this.stagePassedClass);
			var stagePassedAfterSelector
				= Ext.String.format(".{0}:hover ~ .{1}:after", this.stageClass, this.stagePassedClass);
			var borderColorCSS = Terrasoft.getIsRtlMode() ? "border-right-color": "border-left-color";
			Terrasoft.reCreateStyleSheet(stageNotPassedSelector, "background-color", hoverColor, "notPassedStyle");
			Terrasoft.reCreateStyleSheet(stageNotPassedAfterSelector, borderColorCSS, hoverColor,
				"notPassedAfterStyle");
			Terrasoft.reCreateStyleSheet(stagePassedSelector, "background-color", hoverColor + "!important",
				"passedStyle");
			Terrasoft.reCreateStyleSheet(stagePassedAfterSelector, borderColorCSS, hoverColor, "pasedAfterStyle");
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @overriden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var buttonBindConfig = {
				caption: {
					changeMethod: "setCaption"
				},
				color: {
					changeMethod: "setColor"
				},
				displayColor: {
					changeMethod: "setDisplayColor"
				},
				hoverColor: {
					changeMethod: "setHoverColor"
				},
				isActive: {
					changeMethod: "setIsActive"
				},
				isPassed: {
					changeMethod: "setIsPassed"
				}
			};
			Ext.apply(buttonBindConfig, bindConfig);
			return buttonBindConfig;
		},

		/**
		 * Caption property setter.
		 * @protected
		 * @param {String} value.
		 */
		setCaption: function(value) {
			this.caption = value;
		},

		/**
		 * Color property setter.
		 * @protected
		 * @param {String} value.
		 */
		setColor: function(value) {
			this.color = value;
		},

		/**
		 * DisplayColor property setter.
		 * @protected
		 * @param {String} value.
		 */
		setDisplayColor: function(value) {
			this.displayColor = value;
		},

		/**
		 * HoverColor property setter.
		 * @protected
		 * @param {String} value.
		 */
		setHoverColor: function(value) {
			this.hoverColor = value;
		},

		/**
		 * IsActive property setter.
		 * @protected
		 * @param {Boolean} value.
		 */
		setIsActive: function(value) {
			this.isActive = value;
		},

		/**
		 * IsPassed property setter.
		 * @protected
		 * @param {Boolean} value.
		 */
		setIsPassed: function(value) {
			this.isPassed = value;
		}
	});
});


