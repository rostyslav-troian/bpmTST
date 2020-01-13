Terrasoft.configuration.Structures["BaseProgressBarModule"] = {innerHierarchyStack: ["BaseProgressBarModule"]};
define("BaseProgressBarModule", ["terrasoft"], function(Terrasoft) {
	/**
	 *  @class Terrasoft.controls.BaseProgressBar
	 *  ##### ### ###### # ########### ######### ## #######.
	 */
	var baseProgressBarClass = Ext.define("Terrasoft.controls.BaseProgressBar", {
		alternateClassName: "Terrasoft.BaseProgressBar",
		extend: "Terrasoft.Component",

		/**
		 * @inheritdoc Terrasoft.component#tpl
		 * @overridden
		 */
		tpl: [
			/* jshint quotmark: false  */
			'<div id="{id}-wrap" class="{wrapClass} ts-progress-bar-wrap" style="{wrapStyle}" position="{position}">',
				'<div id="{id}-items-wrap" class="ts-progress-bar-items-wrap">',
					'<tpl if="isCaptionVisible">',
						'<div id="{id}-caption" class="ts-progress-bar-caption">',
							'{caption}',
						'</div>',
					'</tpl>',
					'<input id="{id}-el" type="hidden" value="{value}">',
					'<div id="{id}-items" class="ts-progress-bar-items">',
						'{%this.renderItems(out, values)%}',
					'</div>',
				'</div>',
			'</div>'
			/* jshint quotmark: double */
		],

		/**
		 * {@link Ext.XTemplate ######} ### ########## ######.
		 * @protected
		 * @type {String[]}
		 */
		itemTpl: [
			/* jshint quotmark: false */
			'<div data-item-index="{index}" class="ts-progress-bar-item {wrapClass}" style="width:{width};">',
			'</div>'
			/* jshint quotmark: double */
		],

		/**
		 * ########## ######### (######) ########## #########.
		 * @type {Number}
		 */
		maxValue: 5,

		/**
		 * ######## ########## ######### # ######### ## 1 ## {@link #maxValue maxValue}.
		 * @type {Object}
		 */
		value: null,

		/**
		 * ####### ######### ######### ####### ######.
		 * @type {Boolean}
		 */
		isCaptionVisible: false,

		/**
		 * ### ######, ####### ###### ##### ######### ######## (######).
		 * @type {String}
		 */
		activeClassName: "ts-progress-bar-item-active",

		/**
		 * ### ######, ####### ###### ##### ########### ######## (######).
		 * @type {String}
		 */
		inactiveClassName: "ts-progress-bar-item-inactive",

		/**
		 * ###### ######## ##########.
		 * @type {String}
		 */
		width: "",

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.selectors = {
				wrapEl: ""
			};
		},

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @overridden
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			tplData.renderItems = this.renderItems;
			tplData.wrapStyle = {
				width: this.width
			};
			tplData.isCaptionVisible = true;
			var caption = (Ext.isEmpty(this.value)) ? "" : this.value.displayValue;
			tplData.caption = caption;
			tplData.value = caption;
			if (this.value) {
				tplData.position = this.value.value;
			}
			this.selectors.wrapEl = "#" + this.id + "-wrap";
			this.selectors.itemsWrapEl = "#" + this.id + "-items-wrap";
			return tplData;
		},

		/**
		 * ##### ############ # ####### ##-######### ### ########## ######### (######) ##########.
		 * @protected
		 * @virtual
		 * @param {String[]} buffer ##### ### ######### HTML.
		 * @param {Object} renderData ###### ########## ### #######.
		 */
		renderItems: function(buffer, renderData) {
			var self = renderData.self;
			var itemsData = [];
			var maxValue = (self.value) ? self.maxValue + 1 : 0;
			for (var i = 1; i < maxValue; i++) {
				var itemTplData = self.getItemTpl(i);
				var itemHtml = self.generateItemHtml(itemTplData);
				itemsData.push(itemHtml);
			}
			Ext.DomHelper.generateMarkup(itemsData, buffer);
		},

		/**
		 * ##### ############ # ####### ##-######### ### ########## ######### (######) ##########.
		 * @protected
		 * @virtual
		 * @param {Number} index ##### ######## (######), ####### # 1.
		 * @return {Object} renderData ########## ###### ########## ### #######.
		 */
		getItemTpl: function(index) {
			var currentValue = (Ext.isEmpty(this.value)) ? 0 : this.value.value;
			return {
				wrapClass: (index <= currentValue) ? this.activeClassName : this.inactiveClassName,
				width: (100 / this.maxValue) + "%",
				index: index
			};
		},

		/**
		 * ########## HTML-######## ### ######### (######) ##########.
		 * @protected
		 * @virtual
		 * @param {Number} tplData ###### ########## ### #######.
		 * @return {Object} ########## ############### Html ######## (######).
		 */
		generateItemHtml: function(tplData) {
			var tpl = new Ext.XTemplate(this.itemTpl);
			return tpl.apply(tplData);
		},

		/**
		 * ########## ############ ######## # ######. ######### ######### ####### {@link Terrasoft.Bindable}.
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var progressBarBindConfig = {
				value: {
					changeMethod: "setValue"
				},
				maxValue: {
					changeMethod: "setMaxValue"
				}
			};
			Ext.apply(progressBarBindConfig, bindConfig);
			return progressBarBindConfig;
		},

		/**
		 * ############# ######## ######## ##########.
		 * @param {Object} value
		 */
		setValue: function(value) {
			var currentValue = this.value;
			if (!Ext.isEmpty(currentValue) && !Ext.isEmpty(value)) {
				if (currentValue === value ||
						(currentValue.value === value.value && currentValue.displayValue === value.displayValue)) {
					return;
				}
			}
			this.value = Terrasoft.deepClone(value);
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * ############# ########## ######### (######) ########## #########.
		 * @param {Object} value
		 */
		setMaxValue: function(value) {
			if (this.maxValue === value) {
				return;
			}
			this.maxValue = value;
			if (this.rendered) {
				this.reRender();
			}
		}
	});
	return baseProgressBarClass;
});


