/**
 * Class text labels with tip.
 */
Ext.define("Terrasoft.controls.TipLabel", {
	extend: "Terrasoft.Label",
	alternateClassName: "Terrasoft.TipLabel",

	/**
	 * @inheritdoc Terrasoft.Label#tpl
	 * @override
	 */
	/*jshint quotmark: false */
	tpl: [
		'<div id="{id}-wrap" class="{wrapClass}">',
		'<span id="{id}-tip-wrap" class="{tipWrapClass}">',
		'<span id="{id}-tip" class="{tipClass}"></span>',
		'</span>',
		'<label id="{id}" class="{labelClass}">{caption}</label>',
		'</div>'
	],
	/*jshint quotmark: true */

	/**
	 * Css-class for tip element.
	 * @private
	 * @type {String}
	 */
	tipClass: "t-label-tip",

	/**
	 * Css-class for tip element.
	 * @private
	 * @type {String}
	 */
	tipWrapClass: "t-label-tip-wrap",

	/**
	 * Css-class for label wrapper.
	 * @private
	 * @type {String}
	 */
	wrapClass: "tip-label-wrap",

	/**
	 * @inheritdoc Terrasoft.Label#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var tipTplData = {
			tipClass: [this.tipClass],
			wrapClass: [this.wrapClass],
			tipWrapClass: [this.tipWrapClass]
		};
		Ext.apply(tipTplData, tplData, {});
		return tipTplData;
	},

	/**
	 * @inheritdoc Terrasoft.Label#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var id = this.id;
		var selectors = this.callParent(arguments);
		Ext.apply(selectors, {
			el: "#" + id,
			wrapEl: "#" + id + "-wrap",
			tipEl: "#" + id + "-tip"
		});
		return selectors;
	},

	/**
	 * @inheritdoc Terrasoft.Label#onClick
	 * @override
	 */
	onClick: function(e) {
		if (this.fireEvent("click", this) === false) {
			e.stopEvent();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Label#setCaption
	 * @override
	 */
	setCaption: function(caption) {
		if (this.caption === caption) {
			return;
		}
		this.caption = caption;
		this.safeRerender();
	},

	/**
	 * @inheritdoc Terrasoft.Component#addWrapAttr
	 * @protected
	 * @override
	 */
	addWrapAttr: function() {
		var markerValue = this.markerValue;
		if (Ext.isEmpty(markerValue)) {
			return;
		}
		markerValue = Terrasoft.encodeHtml(markerValue);
		var element = this.el;
		if (element) {
			element.dom.setAttribute("data-item-marker", markerValue);
		}
		var tipEl = this.tipEl;
		if (tipEl) {
			tipEl.dom.setAttribute("data-tip-marker", markerValue);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Label#setRequired
	 * @override
	 */
	setRequired: function(isRequired) {
		this.callParent(arguments);
		if (!this.rendered || !this.el) {
			return;
		}
		if (isRequired) {
			this.el.addCls(this.requiredClass);
		} else {
			this.el.removeCls(this.requiredClass);
		}
	}

});