/**
 * A control for working with the parameter mapping.
 */
Ext.define("Terrasoft.controls.MappingEdit", {
	extend: "Terrasoft.controls.BaseEdit",
	alternateClassName: "Terrasoft.MappingEdit",

	mixins: {
		menuMixin: "Terrasoft.MenuMixin",
		rightIcon: "Terrasoft.RightIcon"
	},

	/**
	 * @inheritdoc Terrasoft.RightIcon#enableRightIcon
	 * @override
	 */
	enableRightIcon: true,

	/**
	 * @inheritdoc Terrasoft.RightIcon#rightIconClasses
	 * @override
	 */
	rightIconClasses: ["mapping-edit-right-icon"],

	/**
	 * @inheritdoc Terrasoft.ClearIcon#hasClearIcon
	 * @override
	 */
	hasClearIcon: true,

	/**
	 * Allows inline editing and mapping at the same time.
	 * @private
	 * @type {Boolean}
	 */
	allowInlineEditing: false,

	/**
	 * @inheritdoc Terrasoft.BaseEdit#value
	 * @override
	 * @property {Object} value
	 * @property {String} value.value Value.
	 * @property {String} value.displayValue Display value.
	 * @property {Terrasoft.ProcessSchemaParameterValueSource} value.source Parameter value source.
	 * @property {String} value.referenceSchemaUId Reference schema UId.
	 * @property {Terrasoft.DataValueType} value.dataValueType Data value type.
	 */
	value: null,

	/**
	 * Handles a click action on the element.
	 * @private
	 */
	onClick: function() {
		if (!this.enabled) {
			return;
		}
		var editingNotAllowed = !this.getAllowInlineEditing();
		if (editingNotAllowed) {
			if (this.menu) {
				this.showMenu(this.rightIconWrapperEl);
			} else {
				this.openEditWindow();
			}
		}
	},

	/**
	 * @inheritdoc Terrasoft.RightIcon#onRightIconClick
	 * @override
	 */
	onRightIconClick: function() {
		if (!this.enabled) {
			return;
		}
		if (this.menu) {
			this.showMenu(this.rightIconWrapperEl);
		} else {
			this.openEditWindow();
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
				/**
				 * @event openEditWindow
				 * Fires by click on input or right icon.
				 * @param {string} attributeName Model attribute name.
				 * @param {Object} value Control value.
				 * @param {String} [value.value] Control value.
				 * @param {String} [value.displayValue] Control display value.
				 */
				"openEditWindow"
		);
		this.mixins.menuMixin.init.call(this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#combineClasses
	 * @override
	 */
	combineClasses: function() {
		var classes = this.callParent(arguments);
		classes.wrapClass.push("mapping-edit");
		return classes;
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.on("rightIconClick", this.onRightIconClick, this);
		var el = this.getEl();
		el.on("click", this.onClick, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		this.mixins.menuMixin.bindMenu.call(this, this.model);
	},

	/**
	 * @override
	 */
	onDestroy: function() {
		this.removeMenu(true);
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.MenuMixin#onMenuItemsChange
	 * @override
	 */
	onMenuItemsChange: Terrasoft.emptyFn,

	/**
	 * @inheritdoc Terrasoft.BaseEdit#changeValue
	 * @override
	 */
	changeValue: function(item) {
		var value = this.value;
		var isChanged = !Ext.Object.equals(value, item);
		if (isChanged) {
			this.value = item;
			var returnValue = Terrasoft.deepClone(item);
			this.fireEvent("change", returnValue, this);
		}
		var readonly = !this.getAllowInlineEditing();
		this.setReadonly(readonly);
		this.setClearIconVisibility();
		return isChanged;
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#setValue
	 * @override
	 */
	setValue: function(value) {
		var isChanged = this.changeValue(value);
		if (isChanged && this.rendered) {
			var domValue = value ? value.displayValue : "";
			this.restoreWrongReference();
			this.setDomValue(domValue);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#getInitValue
	 * @override
	 */
	getInitValue: function() {
		var value = this.value;
		var displayValue = value ? value.displayValue : "";
		return displayValue ? Terrasoft.encodeHtml(displayValue) : "";
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onBlur
	 * @override
	 */
	onBlur: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		if (!this.readonly && Ext.isObject(this.value)) {
			this.setConstValue();
		}
		this.focused = false;
		this.fireEvent("blur", this);
		this.fireEvent("focusChanged", this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onEnterKeyPressed
	 * @override
	 */
	onEnterKeyPressed: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		var hasChanges = false;
		if (!this.readonly && Ext.isObject(this.value)) {
			hasChanges = this.setConstValue();
		}
		this.fireEvent("enterkeypressed", this);
		if (!hasChanges) {
			this.fireEvent("editenterkeypressed", this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onFocus
	 * @override
	 */
	onFocus: function() {
		this.callParent(arguments);
		if (!this.enabled || !this.rendered || !this.getAllowInlineEditing()) {
			return;
		}
		var el = this.getEl();
		if (el && el.dom && el.dom.value) {
			el.dom.select();
		}
	},

	/**
	 * @inheritdoc Terrasoft.ClearIcon#getIsHidden
	 * @override
	 */
	getIsHidden: function() {
		var initValue = this.getInitValue();
		return Ext.isEmpty(initValue) || !this.enabled;
	},

	/**
	 * Sets constant mapping value.
	 * @private
	 * @return {Boolean} True if value changed, false otherwise.
	 */
	setConstValue: function() {
		var value = Ext.clone(this.value);
		var typedValue = this.getTypedValue() || null;
		value.value = value.displayValue = typedValue;
		value.source = (typedValue == null)
				? Terrasoft.ProcessSchemaParameterValueSource.None
				: Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
		return this.changeValue(value);
	},

	/**
	 * Fires openEditWindow event.
	 */
	openEditWindow: function() {
		this.fireEvent("openEditWindow", this.tag, this.value);
	},

	/**
	 * Returns display value for value.
	 * @private
	 * @param {Object} value Value.
	 * @return {String}
	 */
	getDisplayValue: function(value) {
		var displayValue = value ? value.displayValue : "";
		return displayValue ? Terrasoft.encodeHtml(displayValue) : "";
	},

	/**
	 * Returns whether value can be inline edited.
	 * @private
	 * @return {Boolean}
	 */
	getAllowInlineEditing: function() {
		var parameterValue = this.value;
		var result = false;
		if (parameterValue) {
			if (Ext.isEmpty(parameterValue.value) && this.allowInlineEditing) {
				result = true;
			} else {
				result = this.isConstSourceValue(parameterValue)
					? this.isAllowInlineEditDataValueType(parameterValue.dataValueType)
					: false;
			}
		}
		return result;
	},

	/**
	 * Returns whether source value is constant.
	 * @private
	 * @return {Boolean}
	 */
	isConstSourceValue: function (parameterValue){
		var source = parameterValue.source;
		var consts = Terrasoft.ProcessSchemaParameterValueSource;
		return source === consts.None || source === consts.ConstValue;
	},

	/**
	 * Returns whether DataValueType support inline edited.
	 * @private
	 * @return {Boolean}
	 */
	isAllowInlineEditDataValueType: function(type){
		return Terrasoft.isNumberDataValueType(type) || Terrasoft.isTextDataValueType(type) ||
			type === Terrasoft.DataValueType.METADATA_TEXT;
	},

	/**
	 * Restore wrong reference.
	 * @private
	 */
	restoreWrongReference: function() {
		if (!this.el) {
			return;
		}
		var el = document.getElementById(this.id + "-el");
		if (el !== this.el.dom) {
			this.el = Ext.get(this.id + "-el");
		}
	},

	/**
	 * @inheritdoc Terrasoft.ClearIcon#onClearIconClick
	 * @override
	 */
	onClearIconClick: function() {
		if (!this.enabled) {
			return;
		}
		var value = {
			value: null,
			displayValue: null,
			source: Terrasoft.ProcessSchemaParameterValueSource.None,
			dataValueType: this.value.dataValueType,
			referenceSchemaUId: this.value.referenceSchemaUId || null
		};
		this.setValue(value);
		this.fireEvent("cleariconclick", this);
	}
});
