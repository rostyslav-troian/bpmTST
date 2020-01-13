/**
 * ComboBoxEdit class
 */
Ext.define("Terrasoft.controls.ComboBoxEdit", {
	extend: "Terrasoft.controls.BaseEdit",
	alternateClassName: "Terrasoft.ComboBoxEdit",

	mixins: {
		expandableList: "Terrasoft.ExpandableList",
		rightIcon: "Terrasoft.RightIcon",
		leftIcon: "Terrasoft.LeftIcon"
	},

	/**
	 * inheritdoc Terrasoft.BaseEdit#disableInputDrop
	 * @override
	 */
	disableInputDrop: true,

	/**
	 * Is images from PrimaryImageColumn visible.
	 * @protected
	 */
	iconsVisible: false,

	/**
	 * Is right icon enabled.
	 * @type {Boolean}
	 * @override
	 * @protected
	 */
	enableRightIcon: true,

	/**
	 * Is left icon enabled.
	 * @type {Boolean}
	 * @override
	 * @protected
	 */
	enableLeftIcon: true,

	/**
	 * Right icon classes array.
	 * @type {Array}
	 * @override
	 * @protected
	 */
	rightIconClasses: ["combobox-edit-right-icon"],

	/**
	 * Minimal chars count for starting filtration.
	 * @type {Number}
	 * @override
	 */
	minSearchCharsCount: 0,

	/**
	 * Delay before filtration starting.
	 * @type {Number}
	 * @override
	 */
	searchDelay: 100,

	/**
	 * Delay before loader mask showing.
	 * @type {Number}
	 * @override
	 */
	maskDelay: 0,

	/**
	 * The value of the control.
	 * Object structure
	 * {
	 *   value: {String}
	 *   displayValue: {String}
	 * }
	 * @type {Object}
	 */
	value: null,

	// region Methods: Private

	/**
	 * Returns icon element by control element.
	 * @private
	 */
	_getIconElement: function(el) {
		if (el) {
			var leftIconContainer = el.parent();
			var icon = leftIconContainer.select(".combobox-edit-left-icon");
			return icon.first();
		} else {
			return this.leftIconEl;
		}
	},

	// endregion

	/**
	 * Init DOM events.
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.on("rightIconClick", this.onMarkerWrapClick, this);
		var el = this.getEl();
		el.on("click", this.onClick, this);
		var doc = Ext.getDoc();
		doc.on("mousedown", this.onMouseDownCollapse, this);
	},

	/**
	 * Handles list element selected event.
	 * @protected
	 * @param {Object} item Selected element property.
	 */
	onListElementSelected: function(item) {
		this.mixins.expandableList.onListElementSelected.call(this, item);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onFocus
	 * @override
	 */
	onFocus: function() {
		this.callParent(arguments);
		this.mixins.expandableList.onFocus.call(this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onBlur
	 * @override
	 */
	onBlur: function() {
		this.mixins.expandableList.onBlur.call(this);
	},

	/**
	 * Hide the menu if the click occurred outside of the control and the drop-down list
	 * @protected
	 * @param {Event} e Mouse down event
	 */
	onMouseDownCollapse: function(e) {
		var isInComboWrap = e.within(this.getWrapEl());
		var listView = this.listView;
		var isInListWrap = (listView === null) || e.within(listView.getWrapEl());
		if (!isInComboWrap && !isInListWrap) {
			listView.hide();
			if (!this.value) {
				var el = this.getEl();
				if (el) {
					var domEl = el.dom;
					if (domEl) {
						domEl.value = "";
					}
				}
			}
		}
	},

	/**
	 * inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		if (this.iconsVisible) {
			this.leftIconClasses = ["combobox-edit-left-icon"];
		}
		this.callParent(arguments);
		this.mixins.expandableList.init.call(this);
		this.addEvents(
			/**
			 * @event click
			 * Triggers when a click on an entry occurs.
			 */
			"click"
		);
	},

	/**
	 * The click event handler for the arrow
	 * If the list is hidden - it displays it, if the list is displayed - hides it.
	 * @protected
	 */
	onMarkerWrapClick: function() {
		if (!this.enabled || this.readonly) {
			return;
		}
		var listView = this.listView;
		if (listView !== null) {
			if (listView.visible) {
				listView.hide();
			} else {
				this.setShowAllList();
				this.expandList();
			}
		} else {
			this.setShowAllList();
			this.expandList();
		}
	},

	/**
	 * The click event handler for the arrow
	 * If the list is hidden - it displays it, if the list is displayed - hides it.
	 * @protected
	 */
	onClick: function() {
		this.fireEvent("click");
		this.onMarkerWrapClick();
	},

	/**
	 * Key event handler. Navigate through the drop-down menu.
	 * @param  {Ext.EventObjectImpl} e event object
	 * @override
	 */
	onKeyDown: function(e) {
		if (!this.enabled || this.readonly) {
			return;
		}
		var isListElementSelected = false;
		this.mixins.expandableList.onKeyDown.call(this, e, true);
		var key = e.getKey();
		var listView = this.listView;
		switch (key) {
			case e.DOWN:
				if (listView === null || !listView.visible) {
					this.setShowAllList();
					this.expandList();
				}
				break;
			case e.ENTER:
				if (listView !== null && listView.visible) {
					isListElementSelected = listView.fireEvent("listPressEnter");
				}
				break;
			default:
				break;
		}
		this.isListElementSelected = isListElementSelected;
		if (!isListElementSelected) {
			this.fireEvent("keyDown", e, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#changeValue
	 * @override
	 * @param {Object} item New item.
	 */
	changeValue: function(item) {
		var value = this.value;
		var isChanged;
		if (value !== null && item !== null) {
			isChanged = (value.value !== item.value) || (value.displayValue !== item.displayValue);
		} else {
			isChanged = value !== item;
		}
		if (isChanged) {
			this.value = item;
			this.fireEvent("change", this.value, this);
			this.setClearIconVisibility();
		}
		return isChanged;
	},

	/**
	 * The event handler is depressed. When the user input sets the control to null,
	 * calls a function to retrieve data based on the results of user input.
	 * @param {Ext.EventObjectImpl} e event object
	 * @override
	 */
	onKeyUp: function(e) {
		this.clearTimer("timerId");
		if (!this.enabled || this.readonly) {
			return;
		}
		var typedValue = this.getTypedValue();
		var key = e.getKey();
		if ((key === e.DELETE || key === e.BACKSPACE) && (typedValue === "")) {
			this.setValue(null);
			this.collapseList();
		}
		if (!e.isNavKeyPress()) {
			if (typedValue !== this.typedValue) {
				this.typedValue = typedValue;
				this.changeValue(null);
				this.removeIcon();
			}
			if (typedValue.length >= this.minSearchCharsCount && typedValue !== "") {
				this.timerId = Ext.defer(function() {
					this.expandList(typedValue);
				}, this.searchDelay, this);
			}
		}
		if (!this.isListElementSelected) {
			this.fireEvent("keyUp", e, this);
		}
	},

	/**
	 * Gets the values of the input field of the control that is stored in the class
	 * @override
	 * @return {String}
	 */
	getInitValue: function() {
		var value = this.value;
		var displayValue = value ? Terrasoft.getTypedStringValue(value, Terrasoft.DataValueType.LOOKUP) : "";
		return displayValue ? Terrasoft.encodeHtml(displayValue) : "";
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var expandableBindConfig = this.mixins.expandableList.getBindConfig();
		var leftIconBindConfig = this.mixins.leftIcon.getBindConfig();
		Ext.apply(bindConfig, expandableBindConfig);
		Ext.apply(bindConfig, leftIconBindConfig);
		return bindConfig;
	},

	/**
	 * Extends the binding mechanism of {@link Terrasoft.Bindable} mixin events  by working with a column
	 * of the type directory.
	 * @override
	 */
	subscribeForEvents: function(binding, property, model) {
		this.callParent(arguments);
		this.mixins.expandableList.subscribeForEvents.call(this, binding, property, model);
	},

	/**
	 * Extends the binding mechanism of the {@link Terrasoft.Bindable} mixin properties by working with a column
	 * of the type directory.
	 * @override
	 */
	initBinding: function(configItem, bindingRule, bindConfig) {
		var binding = this.callParent(arguments);
		var comboBoxBinding = this.mixins.expandableList.initBinding.call(this, configItem, bindingRule, bindConfig);
		return Ext.apply(binding, comboBoxBinding);
	},

	/**
	 * Returns the model method from the binding parameter
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound
	 * @return {Function} Returns the method of the model
	 */
	getModelMethod: function(binding, model) {
		return this.mixins.expandableList.getModelMethod.call(this, binding, model);
	},

	/**
	 * Sets the value of the control
	 * @param {Object} value object containing values for installation
	 * @override
	 */
	setValue: function(value) {
		this.mixins.predictableIcon.valueChanged.call(this, value);
		var isChanged = this.changeValue(value);
		this.setSelectedItem(value);
		if (this.allowRerender() && isChanged) {
			var el = this.getEl();
			const domValue = (value) ? value.displayValue : "";
			el.dom.value = domValue;
			this.setElementDirection(el, domValue);
			if (this.iconsVisible) {
				if (value) {
					this.addIcon(value, el);
				} else {
					this.removeIcon();
				}
			}
		}
	},

	/**
	 * Add icon to element.
	 * @param {Object} value List item
	 * @param {Object} el Ext element
	 * @protected
	 */
	addIcon: function(value, el) {
		if (!value) {
			return;
		}
		if (!value.imageUrl) {
			this.setImageConfig(value);
		}
		var iconElement = this._getIconElement(el);
		if (!iconElement) {
			return;
		}
		iconElement.dom.style["background-image"] = "url(" + value.imageUrl + ")";
		iconElement.addCls("combobox-edit-left-icon");
	},

	/**
	 * Removes icon.
	 * @protected
	 */
	removeIcon: function() {
		if (this.leftIconEl) {
			this.leftIconEl.dom.style["background-image"] = null;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.addIcon(this.value);
	},

	/**
	 * Sets imageConfig on control init.
	 * @param {Object} item List item
	 * @protected
	 */
	setImageConfig: function(item) {
		if (!item.primaryImageValue) {
			return;
		}
		item.imageConfig = {
			"source": Terrasoft.ImageSources.SYS_IMAGE,
			"params": {
				"primaryColumnValue": item.primaryImageValue
			}
		};
		item.imageUrl = Terrasoft.ImageUrlBuilder.getUrl(item.imageConfig);
	},

	/**
	 * @inheritdoc Terrasoft.controls.component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		var el = this.getEl();
		if (el) {
			el.un("click", this.onClick, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.component#isEventWithin.
	 * @override
	 */
	isEventWithin: function(event) {
		var isWithin = this.callParent(arguments);
		if (!isWithin) {
			isWithin = this.isEventWithinList(event);
		}
		return isWithin;
	},

	/**
	 * @inheritdoc Terrasoft.core.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.expandableList.destroy.call(this);
		this.callParent(arguments);
	}

});
