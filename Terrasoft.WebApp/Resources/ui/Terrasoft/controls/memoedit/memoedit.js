/**
 * The control input in the multiline text field.
 */
Ext.define("Terrasoft.controls.MemoEdit", {
	extend: "Terrasoft.controls.BaseEdit",
	alternateClassName: "Terrasoft.MemoEdit",

	/**
	 * Symptom responsible for the activation of browser spell checking.
	 * @type {Boolean}
	 */
	spellcheck: true,

	/**
	 * Max text length.
	 * @type {Number}
	 */
	maxlength: 0,

	/**
	 * Css-classes control.
	 * @private
	 */
	memoEditClasses: " memo-edit-core ",
	memoEditClassesIE: " is-ie ",
	memoEditScrollClasses: " memo-edit-scroll memo-edit-height ",
	memoEditTextareaClasses: " memo-edit-height base-edit-input memo-edit-area ",

	/**
	 * Symptom responsible for the ability to change the size of the control manually.
	 * Not support for IE.
	 * @type {Boolean}
	*/
	resize: false,

	/**
	 * The main template.
	 * @protected
	 */
	// TODO: Consider rejecting the wrapper after fixing the Firefox error: bugzilla.mozilla.org/show_bug.cgi?id=157846
	tpl: [
		/*jshint quotmark:false */
		//jscs: disable
		'<div id="{id}-wrap" class="{wrapClass}" data-resize="{resize}" style="{wrapStyle}">',
		'<div id="{id}-scroll" class="{scrollClass}">',
		'<textarea id="{id}-virtual" class="{textareaClasses} virtual" style="{inputStyle}">{value}</textarea>',
		'<textarea id="{id}-el" class="{textareaClasses}" style="{inputStyle}" tabindex="{tabIndex}" ',
		'placeholder="{placeholder}" {spellcheck} {disabled} {readonly} {maxlength}>{value}</textarea>',
		'<div id="{id}-disabled-el-icon" class="{disabledElIconClass}"></div>',
		'</div>',
		'<span id="{id}-validation" class="{validationClass}" style="{validationStyle}">' +
		'{validationText}</span>',
		'</div>'
		/*jshint quotmark:double */
		//jscs: enable
	],

	/**
	 * Returns data to populate a template.
	 * @protected
	 * @return {Object}
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.spellcheck = this.spellcheck ? "" : "spellcheck=\"false\"";
		tplData.maxlength = this.maxlength > 0 ? ("maxlength=\"" + this.maxlength + "\"") : "";
		this.selectors.scrollEl = "#" + this.id + "-scroll";
		tplData.wrapClass.push(this.memoEditClasses);
		tplData.scrollClass = [this.memoEditScrollClasses];
		tplData.textareaClasses = [this.memoEditTextareaClasses];
		tplData.resize = this.resize && !Ext.isIE;
		if (Ext.isIE) {
			tplData.wrapClass.push(this.memoEditClassesIE);
		}
		return tplData;
	},

	/**
	 * Returns link in hidden virtual textarea.
	 * @protected
	 * @return {Ext.dom.Element}
	**/
	getVirtualEl: function() {
		return Ext.get(this.id + "-virtual");
	},

	/**
	 * Returns styles for the control pattern.
	 * @return {Object}
	 */
	combineStyles: function() {
		var styles = this.callParent(arguments);
		styles.inputStyle.resize = this.resize ? "" : "none";
		styles.wrapStyle.padding = "0px";
		return styles;
	},

	initDomEvents: function() {
		this.callParent(arguments);
		var el = this.getEl();
		el.on("input", this.onInput, this);
	},

	onAfterRender: function() {
		this.callParent(arguments);
		this.initHeightWrap();
		this.initScroll();
		this.updateScrollHeight();
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.initHeightWrap();
		this.initScroll();
		this.updateScrollHeight();
	},

	onInput: function() {
		this.updateScrollHeight();
	},

	/**
	 * Init height for wrap element.
	 * Convert percent to pixels.
	 */
	initHeightWrap: function() {
		var wrap = this.getWrapEl();
		var heightStyle = String(this.height);
		var isPercent = Ext.String.endsWith(heightStyle, "%");
		if (isPercent) {
			var parentNodeEl = Ext.get(wrap.dom.parentNode);
			var parentNodeElBox = parentNodeEl.getBox();
			wrap.setHeight(parentNodeElBox.height);
		}
	},

	/**
	 * Init scroll if need.
	 **/
	initScroll: function() {
		var wrap = this.getWrapEl();
		var textarea = this.getEl();
		var scroll = this.scrollEl;
		var wrapHeightStyle = parseInt(wrap.dom.style.height, 10);
		wrapHeightStyle = isNaN(wrapHeightStyle) ? 0 : wrapHeightStyle;
		if (wrapHeightStyle) {
			this.enableScroll();
			scroll.setHeight(wrapHeightStyle);
			textarea.setHeight(wrapHeightStyle);
		}
	},

	/**
	 * Calculate max height for scroll element.
	 * @return {Number}
	 */
	getCalculatedMaxHeight: function() {
		var wrap = this.getWrapEl();
		var virtual = this.getVirtualEl();
		var area = this.getEl();
		virtual.dom.value = area.dom.value;
		var areaMinHeightCss = parseInt(virtual.getStyle("min-height"), 10);
		var areaMinHeight = isNaN(areaMinHeightCss) ? 0 : areaMinHeightCss;
		var wrapHeightStyle = parseInt(wrap.dom.style.height, 10);
		wrapHeightStyle = isNaN(wrapHeightStyle) ? 0 : wrapHeightStyle;
		var contentHeight = virtual.dom.scrollHeight;
		return Math.max(contentHeight, areaMinHeight, wrapHeightStyle);
	},

	/**
	 * Added or remooved scrolling class for wrap element.
	 * @param {Boolean} isScrolling Passing true will added scroll class.
	 */
	enableScroll: function(isScrolling) {
		var wrap = this.getWrapEl();
		if (isScrolling !== false) {
			wrap.addCls("is-scrolling");
			return;
		}
		wrap.removeCls("is-scrolling");
	},

	/**
	 * Update height for wrap, scroll and textarea.
	 */
	updateScrollHeight: function() {
		var needUpdate = !this.height && (!this.resize || Ext.isIE);
		if (needUpdate) {
			this.enableScroll(false);
			var textarea = this.getEl();
			var wrap = this.getWrapEl();
			var scroll = this.scrollEl;
			if (wrap.getHeight() === 0) {
				return;
			}
			var height = this.getCalculatedMaxHeight();
			scroll.setHeight(height);
			textarea.setHeight(height);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#setValue
	 * @override
	 */
	setValue: function() {
		var isChanged = this.callParent(arguments);
		if (isChanged && this.allowRerender()) {
			this.updateScrollHeight();
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.BaseEdit#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		Ext.apply(bindConfig, {
			maxlength: {
				changeMethod: "setMaxlength"
			}
		});
		return bindConfig;
	},

	/**
	 * Sets the maxlength attribute for the control.
	 * @param {Number} maxlength New value of maxlength attribute.
	 */
	setMaxlength: function(maxlength) {
		if (this.maxlength === maxlength) {
			return;
		}
		this.maxlength = maxlength;
		if (!this.rendered) {
			return;
		}
		var el = this.getEl();
		el.set({maxlength: this.maxlength});
	}

});
