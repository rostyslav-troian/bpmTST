/**
 */
Ext.define('Terrasoft.controls.RadioMenuItem', {
	extend: 'Terrasoft.BaseMenuItem',
	alternateClassName: 'Terrasoft.RadioMenuItem',
	mixins: {
		groupable: Terrasoft.Groupable
	},

	/**
  * CSS class of the not unactivated menu item.
  * @private
  * @type {String}
  */
	enabledClass: "menu-item-enabled",

	/**
  * CSS class of deactivated menu item.
  * @private
  * @type {String}
  */
	disabledClass: "menu-item-disabled",

	/**
  * CSS class of the selected menu item.
  * @private
  * @type {String}
  */
	selectedClass: "menu-item-selected",

	/**
  * CSS class of the selected item in the group.
  * @private
  * @type {String}
  */
	radioGroupSelectedClass: "menu-radio-selected",

	/**
  * Is the menu item selected in the group.
  * @type {Boolean}
  */
	selected: false,

	/**
  * The name of the group of menu items
  * @type {String}
  */
	groupName: "",

	/**
  * Initializing the component
  * @protected
  * @override
  * @throws Terrasoft.NullOrEmptyException
  * If an initialization of the control, when this method is invoked, the groupName property is not set, an error is generated.
  */
	init: function() {
		this.callParent(arguments);
		if (Ext.isEmpty(this.groupName)) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.RadioControlShouldHaveGroupName
			});
		}
		this.mixins.groupable.constructor.call(this);
		if (this.selected) {
			this.setActive(true);
		}
		this.addEvents(
			/**
    * @event
    * Event of changing the selection in the group
    * @param {Terrasoft.RadioMenuItem} this
    * @param {Boolean} newSelectedValue new selection value
    */
			'selectedchanged'
		);
		this.on('selectedchanged', this.onSelectedChanged, this);
	},

	/**
  * Calculate styles and classes for the template.
  * @protected
  * @override
  */
	prepareTplDataStylesAndClasses: function(tplData) {
		this.callParent(arguments);
		tplData.itemClass.push("menu-radio");
		tplData.itemClass.push("menu-item-" + (this.enabled ? "enabled" : "disabled"));
		if (this.selected) {
			tplData.itemClass.push(this.radioGroupSelectedClass);
		}
		tplData.hasImage = true;
	},

	/**
  * The handler of change in selection in the group
  * @protected
  * @param  {Terrasoft.RadioMenuItem} control
  * @param  {Boolean} newValue new value of selection in the group
  */
	onSelectedChanged: function(newValue) {
		if (!this.enabled || !this.rendered) {
			return;
		}
		var radioGroupSelectedClass = this.radioGroupSelectedClass;
		if (newValue === true) {
			this.wrapEl.addCls(radioGroupSelectedClass);
		} else {
			this.wrapEl.removeCls(radioGroupSelectedClass);
		}
	},

	/**
  * Assign a new activity value to the group
  * @protected
  * @param {Boolean} active The new activity value in the group
  * @override
  */
	setActive: function(active) {
		this.mixins.groupable.setActive.call(this, active);
		this.selected = active;
		this.fireEvent('selectedchanged', active, this);
	},


	/**
  * Assign a selection to a group
  * @param {Boolean} selected the new select value in the group
  */
	setSelected: function(selected) {
		if (selected === this.selected) {
			return;
		}
		this.setActive(selected);
	},

	/**
  * Start the action logic of the menu item, and make it selected in the menu if the item has a parent menu.
  * @override
  */
	process: function() {
		this.callParent(arguments);
		this.setSelected(!this.selected);
	},

	/**
  * Activate/deactivate control
  * @param {Boolean} enabled new activation value
  */
	setEnabled: function(enabled) {
		if (this.enabled === enabled) {
			return;
		}
		this.enabled = enabled;
		var disabledClass = this.disabledClass;
		var enabledClass = this.enabledClass;
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			if (enabled) {
				wrapEl.removeCls(disabledClass);
				wrapEl.addCls(enabledClass);
			} else {
				wrapEl.addCls(disabledClass);
				wrapEl.removeCls(enabledClass);
			}
		}
		this.fireEvent('enabledchanged', enabled, this);
	}

});