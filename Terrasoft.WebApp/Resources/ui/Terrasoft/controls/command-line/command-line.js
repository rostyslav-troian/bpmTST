/**
 * CommandLine class
 */
Ext.define("Terrasoft.controls.CommandLine", {
	extend: "Terrasoft.BaseEdit",
	alternateClassName: "Terrasoft.CommandLine",

	mixins: {
		expandableList: "Terrasoft.ExpandableList",
		rightIcon: "Terrasoft.RightIcon",
		leftIcon: "Terrasoft.LeftIcon"
	},

	/**
  * Parameter indicating whether the right icon is used
  * @type {Boolean}
  * @override
  * @protected
  */
	enableRightIcon: true,

	enableLeftIcon: true,

	rightIconClasses: ["command-line-icon"],

	/**
  * The minimum number of characters to enter for filtering to begin
  * @type {Number}
  * @override
  */
	minSearchCharsCount: 0,

	/**
  * Delay before filtering.
  * The number of milliseconds that must elapse after the user entered the filter value in
  * the element and the beginning of the filtering.
  * @type {Number}
  * @override
  */
	searchDelay: 350,

	/**
  * Delay in ms before displaying the boot mask.
  * @type {Number}
  * @override
  */
	maskDelay: 0,

	/**
  * The value of the control.
  * Object structure
  * {
  *  value: {String}
  *  displayValue: {String}
  *}
  * @type {Object}
  */
	value: null,

	/**
  * Value for selection
  * @type {String}
  * @private
  */
	selectionText: "",

	/**
  * Symptom includes local filtering
  * @protected
  * @type {Boolean}
  */
	enableLocalFilter: false,

	/**
  * A parameter that indicates on the selection of the drop-down list element's highlighting.
  * @type {Boolean}
  */
	useDefSelection: false,

	/**
  * The parameter of the delayed task of the text input event
  * @protected
  * @type {Ext.util.DelayedTask}
  */
	changeTypedValueDelayedTask: null,

	/**
  * The {@link Terrasoft.controls.ListView # listElementSelected listElementSelected} event handler.
  * Sets the value of the element using the item value.
  * Hides the drop-down list.
  * @protected
  * @override
  * @param {Object} item properties of the selected element
  */


	onListElementSelected: function(item) {
		this.setValue(item);
		this.listView.hide();
	},


	/**
  * Initializes DOM events
  * @protected
  * @override
  */
	initDomEvents: function() {
		this.callParent(arguments);

		/**
   * @event click
   * Click on arrow event
   */
		this.on("rightIconClick", this.onMarkerWrapClick, this);

		/**
   * @event mousedown
   * Mouse click event in the document area
   */
		Ext.getDoc().on("mousedown", this.onMouseDownCollapse, this);
	},

	/**
  * Hide the menu if the click occurred outside of the control and the drop-down list
  * @protected
  * @param {Event} e mousedown event
  */
	onMouseDownCollapse: function(e) {
		var listView = this.listView;
		if (listView) {
			var isInListWrap = e.within(listView.getWrapEl());
			if (!isInListWrap) {
				listView.hide();
			}
		}
	},

	/**
	 * inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.mixins.expandableList.init.call(this);
		this.mixins.rightIcon.init.apply(this, arguments);
		this.addEvents(
				/**
     * @event selectSuggestion
     * Triggers when data loading is completed
     */
				"selectSuggestion",
				/**
     * @event commandLineExexute
     * CommandLine event
     */
				"commandLineExecute",
				/**
     * @event listViewItemRender
     * Triggers when occurs at drawing the listView element
     */
				"listViewItemRender",
				/**
				 *  @event keyUp
				 */
				"keyUp",
				/**
				 *  @event keyDown
				 */
				"keyDown",
				/*
				* @event changeTypedValue
				*/
				"changeTypedValue",
				/*
				 * @event changeTypedValue
				 */
				"typedValueChanged",
				/*
				 * @event changeValue
				 */
				"changeValue"
		);
		this.on("selectSuggestion", function() {
			if (this.listView === null) {
				this.createListView();
			}
			this.selectSuggestionDelayedTask.cancel();
			this.selectSuggestionDelayedTask.delay(this.searchDelay);
		}, this);
		this.changeTypedValueDelayedTask = new Ext.util.DelayedTask(this.initChangeTypedValueDelayedTask, this);
		this.selectSuggestionDelayedTask = new Ext.util.DelayedTask(this.initSelectSuggestionDelayedTask, this);
	},

	/**
  * The function of defining the delayed task of the text input event
  * @private
  */
	initChangeTypedValueDelayedTask: function() {
		this.fireEvent("typedValueChanged", this.typedValue);
	},

	/**
  * The function of defining the delayed task of the highlighting event
  * @private
  */
	initSelectSuggestionDelayedTask: function() {
		this.selectSuggestion();
	},

	/**
  * The click event handler for the arrow
  * If the list is hidden - it displays it, if the list is displayed - hides it.
  * @protected
  */
	onMarkerWrapClick: function() {
		this.typedValue = this.getInputedCommand();
		this.fireEvent("commandLineExecute", this, this.typedValue);
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
		if (this.listView) {
			this.listView.hide();
		}
	},

	/**
  * Key event handler. Navigate through the drop-down menu.
  * @param  {Ext.EventObjectImpl} e event object
  * @protected
  * @override
  */
	onKeyDown: function(e) {
		this.fireEvent("keyDown", e, this);
		this.mixins.expandableList.onKeyDown.call(this, e, false);
		var key = e.getKey();
		switch (key) {
			case e.ENTER:
				var typedValue = this.typedValue ||
					Terrasoft.Features.getIsEnabled("GlobalSearch") ? this.getTypedValue() : this.typedValue;
				if (typedValue.length > 0) {
					this.fireEvent("commandLineExecute", this, typedValue);
					this.collapseList();
				}
				break;
			default:
				break;
		}
	},

	/**
  * @inheritdoc Terrasoft.BaseEdit#changeValue
  * @override
  * @param {Object} item A new object.
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
			this.fireEvent("changeValue", value);
			var returnValue = Terrasoft.deepClone(item);
			this.fireEvent("change", returnValue, this);
			this.typedValue = returnValue ? returnValue.displayValue : "";
			this.fireEvent("changeTypedValue", this.typedValue);
		}
		return isChanged;
	},

	/**
  * The event handler is depressed. When the user input sets the control to null,
  * calls a function to retrieve data based on the results of user input.
  * @param {Ext.EventObjectImpl} e event object
  * @protected
  * @override
  */
	onKeyUp: function(e) {
		this.fireEvent("keyUp", e, this);
		var inputedValue = this.getTypedValue();
		this.typedValue = this.getInputedCommand();
		var key = e.getKey();
		if (key === e.SHIFT || key === e.HOME || key === e.CTRL) {
			return;
		} else if ((key === e.DELETE || key === e.BACKSPACE) && (inputedValue === "")) {
			this.collapseList();
		} else if ((key === e.DELETE || key === e.BACKSPACE) && (this.selectionText !== "")) {
			this.fireEvent("changeTypedValue", this.typedValue);
			return;
		} else if (key === e.UP || key === e.DOWN) {
			var listView = this.listView;
			if (!listView) {
				return;
			}
			this.onItemSelectByKey(listView);
		} else if (((this.getCaretPosition(this.getEl().dom) === this.typedValue.length)) &&
			(!e.isNavKeyPress() || (key === e.RIGHT || key === e.END))) {
			if (inputedValue.length >= this.minSearchCharsCount) {
				this.changeTypedValueDelayedTask.cancel();
				this.changeTypedValueDelayedTask.delay(this.searchDelay);
				this.fireEvent("changeTypedValue", this.typedValue);
			}
		}
	},

	/**
  * Activates when the active list item changes when the UP or DOWN buttons are pressed
  * @param  {Terrasoft.ListView} listView list
  * @private
  */
	onItemSelectByKey: function(listView) {
		var displayAttributeName = listView.map.displayValue;
		var listViewConfig = this.listViewConfig;
		if (listViewConfig && listViewConfig.map) {
			displayAttributeName = listViewConfig.map.displayValue;
		}
		var selectedItem = listView.selectedItem;
		var selectedItemDom = selectedItem.dom;
		var value = selectedItemDom.getAttribute("data-value");
		var itemValue = this.list.collection.get(value);
		if (!itemValue) {
			return;
		}
		var displayValue = itemValue[displayAttributeName];
		selectedItem = {
			value: value,
			displayValue: displayValue
		};
		this.setValue(selectedItem);
		this.typedValue = this.getInputedCommand();
		this.fireEvent("changeTypedValue", this.typedValue);
		this.el.dom.value = displayValue;
	},

	/**
	 * Returns cursor position inside the edit control.
	 * @param {Ext.dom.Element} element Current edit control.
	 * @private
	 */
	getCaretPosition: function(element) {
		var cursorPos = null;
		// BrowserSupport: IE Check the availability of the document.selection property
		if (document.selection) {
			var range = document.selection.createRange();
			range.moveStart("textedit", -1);
			cursorPos = range.text.length;
		} else {
			cursorPos = element.selectionStart;
		}
		return cursorPos;
	},

	/**
  * Returns the selected control text
  * @private
  */
	getUserSelection: function() {
		var selection = "";
		if (window.getSelection) {
			selection = window.getSelection();
			selection = selection.toString();
		}
		// BrowserSupport: IE No getSelection ()  method
		else {
			var range = document.selection.createRange();
			selection = range ? range.text : "";
		}
		return selection;
	},

	/**
  * Returns the text entered by the user
  * @private
  */
	getInputedCommand: function() {
		var selection = this.getUserSelection();
		var typedValue = this.getTypedValue();
		var result = typedValue.substr(0, typedValue.length - selection.length);
		return result;
	},

	/**
  * Adding and highlighting the supposed text
  * @private
  */
	selectSuggestion: function() {
		var typedValue = this.typedValue;
		if (typedValue.length >= this.minSearchCharsCount) {
			this.expandList();
		}
		var selectionText = this.selectionText;
		if (selectionText === "") {
			return;
		}
		var newValue = typedValue + selectionText;
		var clEl = this.el;
		if (!clEl) {
			return;
		}
		var clElDom = clEl.dom;
		clElDom.value = newValue;
		var startSelection = typedValue.length;
		var endSelection = newValue.length;
		if (clElDom.setSelectionRange) {
			clElDom.focus();
			clElDom.setSelectionRange(startSelection, endSelection);
		}
		// BrowserSupport: IE No setSelectionRange () method
		else {
			var range = clElDom.createTextRange();
			range.collapse(true);
			range.moveEnd("character", endSelection);
			range.moveStart("character", startSelection);
			range.select();
		}
	},

	/**
	 * Handles "onSelectionTextChange" event.
	 * @protected
	 * @param {String} value Selected text.
	 */
	onSelectionTextChange: function(value) {
		this.selectionText = value;
	},

	/**
	 * Handles "onChangeValue" event.
	 * @protected
	 * @param {Object} value New control value.
	 */
	onChangeValue: function(value) {
		this.setValue(value);
	},

	/**
  * Gets the values of the input field of the control that is stored in the class
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
		var comboboxBindConfig = {
			typedValue: {
				changeEvent: "changeTypedValue"
			},
			selectionText: {
				changeMethod: "onSelectionTextChange"
			},
			value: {
				changeEvent: "changeValue",
				changeMethod: "onChangeValue"
			}
		};
		Ext.apply(bindConfig, comboboxBindConfig);
		var expandableBindConfig = this.mixins.expandableList.getBindConfig();
		Ext.apply(bindConfig, expandableBindConfig);
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForEvents
	 * Extends mixin binding mechanizm {@link Terrasoft.Bindable} to work with lookups.
	 * @protected
	 */
	subscribeForEvents: function(binding, property, model) {
		this.callParent(arguments);
		this.mixins.expandableList.subscribeForEvents.call(this, binding, property, model);
	},

	/**
 t * Extends the binding mechanism of the {@link Terrasoft.Bindable} mixin properties by working with a column of the type directory.
 t * @protected
 t * @override
 t */
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
		var isChanged = this.changeValue(value);
		this.setSelectedItem(value);
		if (this.rendered && isChanged) {
			var el = this.getEl();
			el.dom.value = value ? value.displayValue : "";
		}
	},

	/**
	 * @inheritdoc Terrasoft.ExpandableList#createListView
	 * @override
	 */
	createListView: function() {
		var listview = this.mixins.expandableList.createListView.call(this);
		listview.useDefSelection = this.useDefSelection;
		return listview;
	},

	/**
  * Deletes created objects
  * @protected
  * @override
  */
	onDestroy: function() {
		this.mixins.expandableList.destroy.call(this);
		this.callParent(arguments);
	}

});
