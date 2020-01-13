/**
 * Class of the logical field control element
 */
Ext.define("Terrasoft.controls.CheckBoxEdit", {
	extend: "Terrasoft.controls.Component",
	alternateClassName: "Terrasoft.CheckBoxEdit",

	/**
	 * Focus
	 * @protected
	 * @type {Boolean}
	 */
	focused: false,

	/**
	 * CSS class of inactive logical field
	 * @protected
	 * @override
	 * @type {String}
	 */
	disabledClass: "t-checkboxedit-disabled",

	/**
	 * CSS class of the set logical field
	 * @protected
	 * @type {String}
	 */
	checkedClass: "t-checkboxedit-checked",

	/**
	 * CSS class of the focused logical field
	 * @protected
	 * @type {String}
	 */
	focusedClass: "t-checkboxedit-focus",

	/**
	 * Default wrap element class name.
	 * @protected
	 * @type {String}
	 */
	defaultWrapClassName: "t-checkboxedit-wrap",

	/**
	 * Hidden input element class name.
	 * @protected
	 * @type {String}
	 */
	hiddenInputClassName: "t-checkboxedit",

	/**
	 * The value of the logical field
	 * @type {Boolean}
	 */
	checked: false,

	/**
	 * The value of the control
	 * @type {String}
	 */
	value: "",

	/**
	 * General control template
	 * @private
	 * @override
	 * @type {String[]}
	 */
	tpl: [
		"<span id=\"{id}-wrapEl\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
		"<input id=\"{id}-el\" value=\"{value}\" class=\"{hiddenInputClass}\" style=\"{hiddenInputStyle}\"",
		"type=\"{hiddenInputType}\" tabindex=\"{tabIndex}\"",
		"<tpl if=\"name\">",
		" name=\"{name}\"",
		"</tpl>",
		"<tpl if=\"!enabled\">",
		" disabled=\"disabled\"",
		"</tpl>",
		">",
		"</span>"
	],

	/**
	 * An object for specifying the inline-classes of the component specified in the template.
	 * If the {@link #tpl template} specifies the class name, then the class object must have a
	 * property with the same name.
	 * If a property with classes is not found, only standard classes will be added to the class attribute.
	 * @override
	 * @type {Object}
	 */
	classes: {
		wrapClass: null,
		hiddenInputClass: null
	},

	/**
	 * The object for specifying the inline styles of the component specified in the template.
	 * If the {@link #tpl template} specifies the name of the style, then the style object must have a property
	 * with the same name.
	 * If a property with styles is not found, the attribute with styles will be removed from the template.
	 * component styles can be specified in either of the two methods {@link #getTpl getTpl ()}
	 * and {@link #getTplData getTplData ()}.
	 * @override
	 * @type {Object}
	 */
	styles: {
		wrapStyle: null,
		hiddenInputStyle: null
	},

	/**
	 * Initializing the logical field component
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Getting the focus
			 * @param {Terrasoft.CheckBoxEdit} this
			 */
			"focus",
			/**
			 * @event
			 * Loss of focus
			 * @param {Terrasoft.CheckBoxEdit} this
			 */
			"blur",
			/**
			 * @event
			 * Mouse click
			 * @param {Terrasoft.CheckBoxEdit} this
			 */
			"click",
			/**
			 * @event
			 * The logical property has changed
			 * @param {Terrasoft.CheckBoxEdit} this
			 * @param {Number} newValue new property of the checked value
			 */
			"checkedchanged",
			/**
			 * @event keypress
			 * Triggers when a keystroke occurs.
			 */
			"keypress",
			/**
			 * @event keydown
			 * Triggers when a keystroke occurs.
			 */
			"keydown",
			/**
			 * @event keyup
			 * Triggers when it occurs when the key is released.
			 */
			"keyup"
		);
		this.on("focus", this.onFocus, this);
		this.on("blur", this.onBlur, this);
		this.on("click", this.onClick, this);
		this.on("checkedchanged", this.onCheckedChanged, this);
	},

	/**
	 * Handling DOM events
	 * @private
	 * @param  {Ext.EventObjectImpl} event event object
	 */
	onDomEvent: function(event) {
		var eventName = event.type;
		if (eventName === "click") {
			event.stopPropagation();
			event.preventDefault();
		}
		if (this.enabled && this.rendered && this.visible) {
			this.fireEvent(eventName, this, event);
		}
	},

	/**
	 * Initializing DOM Events
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		if (!this.rendered) {
			return;
		}
		var el = this.el;
		var wrapEl = this.getWrapEl();
		el.on("focus", this.onDomEvent, this);
		el.on("blur", this.onDomEvent, this);
		el.on("click", this.onDomEvent, this);
		wrapEl.on("click", this.onDomEvent, this);
		el.on("keypress", this.onDomEvent, this);
		el.on("keydown", this.onDomEvent, this);
		el.on("keyup", this.onDomEvent, this);
	},

	/**
	 * Returns the configuration of the classes for the component's build pattern.
	 * @protected
	 * @return {Object} The configuration of the classes for the component build pattern.
	 */
	prepareTplClasses: function() {
		var classes = this.classes;
		var resultClasses = {
			wrapClass: [this.defaultWrapClassName],
			hiddenInputClass: [this.hiddenInputClassName]
		};
		if (this.checked) {
			resultClasses.wrapClass.push(this.checkedClass);
		}
		if (!this.enabled) {
			resultClasses.wrapClass.push(this.disabledClass);
		}
		if (classes && classes.wrapClass) {
			if (Ext.isArray(classes.wrapClass)) {
				resultClasses.wrapClass = resultClasses.wrapClass.concat(classes.wrapClass);
			} else {
				resultClasses.wrapClass.push(classes.wrapClass);
			}
		}
		if (classes && classes.hiddenInputClass) {
			if (Ext.isArray(classes.hiddenInputClass)) {
				resultClasses.hiddenInputClass = resultClasses.hiddenInputClass.concat(classes.hiddenInputClass);
			} else {
				resultClasses.hiddenInputClass.push(classes.hiddenInputClass);
			}
		}
		return resultClasses;
	},

	/**
	 * Calculate the data for the template and update the selectors
	 * @protected
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.hiddenInputType = "checkbox";
		tplData.enabled = this.enabled;
		tplData.value = this.value;
		Ext.apply(tplData, this.prepareTplClasses());
		this.updateSelectors(tplData);
		return tplData;
	},

	/**
	 * Update selectors based on the data generated to create the markup
	 * @protected
	 */
	updateSelectors: function() {
		var selectors = this.selectors = this.selectors || {};
		selectors.wrapEl = "#" + this.id + "-wrapEl";
		selectors.el = "#" + this.id + "-el";
		return selectors;
	},

	/**
	 * Handler for obtaining focus
	 * @protected
	 */
	onFocus: function() {
		this.focused = true;
		this.wrapEl.addCls(this.focusedClass);
	},

	/**
	 * Focus loss handler
	 * @protected
	 */
	onBlur: function() {
		this.focused = false;
		this.wrapEl.removeCls(this.focusedClass);
	},

	/**
	 * Mouse click handler
	 * @protected
	 */
	onClick: function() {
		if (!this.enabled) {
			return;
		}
		this.focus();
		this.setChecked(!this.checked);
	},

	/**
	 * The handler of the flag checked property change
	 * @param {Boolean} newValue new value of the checked flag
	 * @protected
	 */
	onCheckedChanged: function(newValue) {
		if (!this.visible || !this.rendered) {
			return;
		}
		var checkedClass = this.checkedClass;
		if (newValue === true) {
			this.wrapEl.addCls(checkedClass);
		} else {
			this.wrapEl.removeCls(checkedClass);
		}
	},

	/**
	 * Focus
	 */
	focus: function() {
		if (this.rendered && !this.focused) {
			this.el.focus();
		}
	},

	/**
	 * Assign activity
	 * @param {Boolean} enabled new value
	 */
	setEnabled: function(enabled) {
		if (this.enabled === enabled) {
			return;
		}
		this.callParent(arguments);
		if (!this.rendered) {
			return;
		}
		var el = this.el;
		if (Ext.isEmpty(el)) {
			return;
		}
		if (enabled === true) {
			el.dom.removeAttribute("disabled");
		} else {
			el.dom.setAttribute("disabled", "disabled");
		}
	},

	/**
	 * Set the flag value
	 * @param {Boolean} checked new value of flag
	 */
	setChecked: function(checked) {
		if (this.checked === checked) {
			return;
		}
		this.checked = checked;
		this.fireEvent("checkedchanged", checked, this);
	},

	/**
	 * Returns the value of the flag
	 * @return {Boolean} checked checked value of flag
	 */

	getValue: function() {
		return this.checked;
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var checkBoxBindConfig = {
			checked: {
				changeEvent: "checkedchanged",
				changeMethod: "setChecked"
			}
		};
		Ext.apply(checkBoxBindConfig, bindConfig);
		return checkBoxBindConfig;
	}

});
