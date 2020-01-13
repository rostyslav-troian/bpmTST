/**
 * Control for working with lookups.
 */
Ext.define("Terrasoft.controls.LookupEdit", {
	extend: "Terrasoft.controls.BaseEdit",
	alternateClassName: "Terrasoft.LookupEdit",

	mixins: {
		/**
		 * Mixin is used by controls that should support work with drop-down lists.
		 */
		expandableList: "Terrasoft.ExpandableList",

		/**
		 * The rendering object of the left icon.
		 */
		leftIcon: "Terrasoft.LeftIcon",

		/**
		 * The rendering object of the right icon.
		 */
		rightIcon: "Terrasoft.RightIcon"
	},

	/**
	 * inheritdoc Terrasoft.BaseEdit#disableInputDrop
	 * @override
	 */
	disableInputDrop: true,

	/**
	 * Parameter indicating that it is necessary to use the left icon.
	 * @protected
	 * @property {Boolean} enableLeftIcon
	 */
	enableLeftIcon: false,

	/**
	 * Parameter indicating that you need to use the right icon.
	 * @protected
	 * @property {Boolean} enableRightIcon
	 */
	enableRightIcon: true,

	/**
	 * Css-class for the right icon of the control.
	 * @type {String[]}
	 */
	rightIconClasses: ["lookup-edit-right-icon"],

	/**
	 * The value of the control.
	 * @protected
	 * @type {String}
	 */
	value: null,

	/**
	 * The displayed value of the control.
	 * @protected
	 * @type {String}
	 */
	displayValue: null,

	/**
	 * The minimum number of characters to enter for filtering to begin.
	 * @type {Number}
	 * @override
	 */
	minSearchCharsCount: 3,

	/**
	 * Delay before filtering.
	 * The number of milliseconds that must elapse after the user enters the filter value
	 * into the element and the beginning of the filtering.
	 * @type {Number}
	 * @override
	 */
	searchDelay: 500,

	/**
	 * Parameter indicating the maximum visible number of menu items in the list.
	 * @override
	 */
	maxItemsInView: 0,

	/**
	 * The flag disables local filtering.
	 * @protected
	 * @type {Boolean}
	 */
	enableLocalFilter: false,

	/**
	 * @private
	 */
	_autoSelectElement: function() {
		const list = this.listView;
		const data = list && list.getListItemsData() || [];
		const availableItems = Terrasoft.filter(data, function(item) {
			return item.value && item.value !== Terrasoft.GUID_EMPTY;
		}, this);
		if (availableItems.length === 1) {
			list.selectElement();
			return true;
		}
		return false;
	},

	/**
	 * inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event loadVocabulary
			 * Triggers when the control needs to display the value selection window (click on the right icon).
			 * @param {Object} an object that contains the searchValue property - the entered text in the control.
			 */
			"loadVocabulary",
			/**
			 * @event paste
			 * Triggers when a selection has been pasted from the clipboard to lookup.
			 */
			"paste"
		);
		if (Terrasoft.ControlsSettings && Terrasoft.ControlsSettings.lookupMinSearchCharsCount >= 0) {
			this.minSearchCharsCount = Terrasoft.ControlsSettings.lookupMinSearchCharsCount;
		}
		this.mixins.expandableList.init.call(this);
	},

	/**
	 * Initializing DOM events.
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);

		/**
		 * Event of hovering over the button.
		 * @protected
		 * @event mouseover
		 */
		this.on("rightIconMouseOver", this.onRightIconMouseOver, this);

		/**
		 * Event of cursor escape from the button.
		 * @protected
		 * @event mouseout
		 */
		this.on("rightIconMouseOut", this.onRightIconMouseOut, this);

		/**
		 * The button click event.
		 * @protected
		 * @event click
		 */
		this.on("rightIconClick", this.onRightIconClick, this);

		/**
		 * A paste from clipboard event.
		 * @event paste
		 */
		var el = this.getEl();
		el.on("paste", this.onPaste, this);

		/**
		 * A click event outside the control.
		 * @event mousedown
		 */
		var doc = Ext.getDoc();
		doc.on("mousedown", this.onMouseDownCollapse, this);
	},

	/**
	 * Pasted from the clipboard event handler.
	 * @protected
	 * @param  {Object} e The event object
	 */
	onPaste: function(e) {
		this.onKeyUp(e);
	},

	/**
	 * Handler of the cursor hover event on the button.
	 * @protected
	 */
	onRightIconMouseOver: function() {
		if (this.rendered) {
			this.rightIconEl.addCls("lookup-edit-right-icon-hover");
		}
	},

	/**
	 * Cursor escape event handler from the button.
	 * @protected
	 */
	onRightIconMouseOut: function() {
		if (this.rendered) {
			this.rightIconEl.removeCls("lookup-edit-right-icon-hover");
		}
	},

	/**
	 * Click event handler for the button.
	 * @protected
	 */
	onRightIconClick: function() {
		if (!this.enabled || this.readonly) {
			return;
		}
		if (this.listView && this.listView.visible) {
			this.expandList();
		}
		var searchValue = this.getTypedValue();
		this.fireEvent("loadVocabulary", {searchValue: searchValue});
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
	 * @protected
	 * @override
	 */
	onFocus: function() {
		this.callParent(arguments);
		this.mixins.expandableList.onFocus.call(this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onBlur
	 * @protected
	 * @override
	 */
	onBlur: function() {
		this.mixins.expandableList.onBlur.call(this);
		this.collapseList();
	},

	/**
	 * Hide the menu if the click occurred outside of the control and drop-down list.
	 * @param  {Event} e The mousedown event.
	 * @protected
	 */
	onMouseDownCollapse: function(e) {
		var isInWrap = e.within(this.getWrapEl());
		var listView = this.listView;
		var isInList = Ext.isEmpty(listView) || e.within(listView.getWrapEl());
		if (!isInWrap && !isInList) {
			this.collapseList();
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
	 * Key press event handler.
	 * @protected
	 * @param  {Object} e The event object.
	 */
	onKeyDown: function(e) {
		if (!this.enabled) {
			return;
		}
		this.mixins.expandableList.onKeyDown.call(this, e, true);
		const keyUnicode = e.getKey();
		const searchValue = this.typedValue;
		const list = this.listView;
		switch (keyUnicode) {
			case e.DOWN:
				if (list === null) {
					this.expandList();
				} else {
					if (!list.visible) {
						this.expandList(searchValue);
					}
				}
				break;
			case e.ENTER:
				if (e.ctrlKey || e.altKey || e.shiftKey) {
					break;
				}
				if (list && list.visible && (list.selectedItem || this._autoSelectElement())) {
					list.fireEvent("listPressEnter");
				} else {
					this.collapseList();
					this.fireEvent("loadVocabulary", {searchValue: searchValue});
				}
				break;
		}
	},

	/**
	 * Key release event handler
	 * @protected
	 * @param  {Object} e The event object
	 */
	onKeyUp: function(e) {
		if (!this.enabled) {
			return;
		}
		this.clearTimer("timerId");
		var typedValue = this.getTypedValue();
		if (!e.isNavKeyPress() && e.getKey() !== e.ENTER && typedValue !== this.typedValue) {
			this.typedValue = typedValue;
			if (this.list) {
				this.list.clear();
			}
			this.changeValue(null);
		}
		if (!e.isNavKeyPress()) {
			if (typedValue.length > this.minSearchCharsCount) {
				this.timerId = Ext.defer(function() {
					this.expandList(typedValue);
				}, this.searchDelay, this);
			} else {
				this.collapseList();
			}
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#changeValue
	 * @override
	 * @param item A new object.
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
			var returnValue = Terrasoft.deepClone(item);
			this.fireEvent("change", returnValue, this);
			this.setClearIconVisibility();
		}
		return isChanged;
	},

	/**
	 * Sets the value of the control.
	 * @param {Object} value The object containing the values for the installation.
	 * @override
	 */
	setValue: function(value) {
		this.mixins.predictableIcon.valueChanged.call(this, value);
		var isChanged = this.changeValue(value);
		if (!isChanged || !this.rendered) {
			return;
		}
		var domValue = (value) ? value.displayValue : "";
		this.setDomValue(domValue);
		this.setElementDirection(this.getEl(), domValue);
		this.setElementDirection(this.getLinkEl(), domValue);
	},

	/**
	 * Gets the values of the input field of the control that was saved in the class.
	 * @protected
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
		Ext.apply(bindConfig, expandableBindConfig);
		var leftIconBindConfig = this.mixins.leftIcon.getBindConfig();
		Ext.apply(bindConfig, leftIconBindConfig);
		return bindConfig;
	},

	/**
	 * Extends the binding mechanism of the {@link Terrasoft.Bindable} mixin properties by working with a column
	 * of the type directory.
	 * @protected
	 * @override
	 */
	initBinding: function(configItem, bindingRule, bindConfig) {
		var binding = this.callParent(arguments);
		var lookupBinding = this.mixins.expandableList.initBinding.call(this, configItem, bindingRule, bindConfig);
		return Ext.apply(binding, lookupBinding);
	},

	/**
	 * Returns the model method from the binding parameter.
	 * @protected
	 * @param {Object} binding An object that describes the binding parameters of the control's property to the model.
	 * @param {Terrasoft.BaseViewModel} model The data model to which the control is bound.
	 * @return {Function} Returns the method of the model.
	 */
	getModelMethod: function(binding, model) {
		return this.mixins.expandableList.getModelMethod.call(this, binding, model);
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
	 * Deleting objects.
	 * @protected
	 * @override
	 */
	onDestroy: function() {
		this.mixins.expandableList.destroy.call(this);
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#setEnabled
	 * @override
	 */
	setEnabled: function() {
		this.callParent(arguments);
		this.setClearIconVisibility();
	}
});
