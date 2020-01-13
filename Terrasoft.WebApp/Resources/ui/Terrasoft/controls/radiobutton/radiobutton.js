/**
 * Switch control class
 */
Ext.define('Terrasoft.controls.RadioButton', {
	extend: 'Terrasoft.CheckBoxEdit',
	alternateClassName: 'Terrasoft.RadioButton',

	/**
  * CSS class of the inactive switch
  * @protected
  * @type {String}
  */
	disabledClass: 't-radio-disabled',

	/**
  * CSS class of the installed switch
  * @protected
  * @type {String}
  */
	checkedClass: 't-radio-checked',

	/**
  * CSS class of the focused switch
  * @protected
  * @type {String}
  */
	focusedClass: 't-radio-focus',

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		if (this.checked) {
			this.setChecked(true);
		}
	},

	/**
	 * @inheritdoc Terrasoft.CheckBoxEdit#onClick
	 * @override
	 */
	onClick: function() {
		if (this.checked) {
			return;
		}
		this.callParent(arguments);
	},

	/**
  * Calculate the data for the template
  * @protected
  */
	prepareTplClasses: function() {
		var classes = {
			wrapClass: ['t-radio-wrap'],
			hiddenInputClass: ['t-radio']
		};
		var wrapClass = classes.wrapClass;
		if (this.checked) {
			wrapClass.push(this.checkedClass);
		}
		if (!this.enabled) {
			wrapClass.push(this.disabledClass);
		}
		if (Ext.isIE) {
			wrapClass.push('ie');
		}
		return classes;
	},

	/**
  * Calculate the data for the template and update the selectors
  * @protected
  * @override
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.hiddenInputType = 'radio';
		Ext.apply(tplData, this.prepareTplClasses());
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#setControlPropertyValue
	 * @protected
	 * @override
	 */
	setControlPropertyValue: function(binding, value, model) {
		var changeEvent = binding.config.changeEvent;
		if (changeEvent === 'checkedchanged') {
			var mappedValue = this.tag;
			var match = (mappedValue === value);
			this.callParent([binding, match, model]);
		} else {
			this.callParent(arguments);
		}
	},

	/**
  * Subscribes to the events of the model and, if necessary, subscribes to the change of the bound property
  * of control for Property type
  * @protected
  * @override
  * @param {Object} binding An object that describes the binding parameters of a control's property to a model
  * @param {String} property Name of the property of the control to be bound
  * @param {Terrasoft.data.modules.BaseViewModel} model The data model to which the control is bound
  */
	subscribeForPropertyChangeEvent: function(binding, property, model) {
		var changeEvent = binding.config.changeEvent;
		if (changeEvent === 'checkedchanged') {
			var modelProperty = binding.modelItem;
			var mappedValue = this.tag;
			var onControlPropertyChange = function(value) {
				if (value) {
					model.set(modelProperty, mappedValue);
				}
			};
			this.on(changeEvent, onControlPropertyChange);
			var dependentProperties = [modelProperty];
			// The handler for changing one property in the model
			var handler = function(viewModel, value) {
				this.setControlPropertyValue(binding, value, model);
			};
			this.toggleSubscriptionForModelEvents(model, null, dependentProperties, handler, this);
		} else {
			this.callParent(arguments);
		}
	},

	/**
  * Set the flag value
  * @param {Boolean} checked new value of flag
  */
	setChecked: function(checked) {
		if (checked === this.checked) {
			return;
		}
		this.checked = checked;
		this.fireEvent('checkedchanged', checked, this);
	}

});