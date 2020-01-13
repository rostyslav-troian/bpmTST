/**
 * The class of the checkbox menu item
 */
Ext.define('Terrasoft.controls.CheckMenuItem', {
	extend: 'Terrasoft.BaseMenuItem',
	alternateClassName: 'Terrasoft.CheckMenuItem',

	/**
  * CSS class of the checked menu item.
  * @private
  * @type {String}
  */
	checkedClass: "menu-check-item-checked",

	/**
  * The checkbox is enabled.
  * @type {Boolean}
  */
	checked: false,

	menu: null,

	/**
  * Initializing the component.
  * @protected
  * @override
  */
	init: function() {
		this.callParent(arguments);
		this.imageConfig = Terrasoft.CheckMenuItem.checkedImage;
		this.addEvents(
			/**
    * @event
    * checkbox enabling event
    * @param {Terrasoft.CheckMenuItem} this link to a control
    */
			"checked",
			/**
    * @event
    * checkbox disabling event
    * @param {Terrasoft.CheckMenuItem} this link to a control
    */
			"unchecked",
			/**
    * @event
    *  chackbox Change Event
    * @param (Boolean) checked checkbox status
    * @param {Terrasoft.CheckMenuItem} this link to a control element
    */
			"checkedChanged"
		);
		this.on("checked", this.onChecked, this);
		this.on("unchecked", this.onUnchecked, this);
	},

	/**
  * Calculate styles and classes for the template.
  * @protected
  * @override
  */
	prepareTplDataStylesAndClasses: function(tplData) {
		this.callParent(arguments);
		if (this.checked) {
			tplData.itemClass.push(this.checkedClass);
		}
		tplData.hasImage = true;
		tplData.imageConfig = this.checked;
	},

	/**
  * Calculate the data for the template and update the selectors.
  * @protected
  * @override
  */
	/*getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.hasImage = true;
		tplData.image = this.checked;
		this.updateSelectors(tplData);
		return tplData;
	},*/

	/**
  * Change the status of the control after enabling the checkbox
  * @protected
  */
	onChecked: function() {
		this.wrapEl.addCls(this.checkedClass);
	},

	/**
  * Change the status of the control after disabling the checkbox
  * @protected
  */
	onUnchecked: function() {
		this.wrapEl.removeCls(this.checkedClass);
	},

	/**
  * Set the new checkbox value
  * @param {Boolean} checked new checkbox value
  */
	setChecked: function(checked) {
		if (this.checked === checked) {
			return;
		}
		this.checked = checked;
		this.fireEvent(checked ? "checked" : "unchecked", this);
		this.fireEvent("checkedChanged", checked, this);
	},

	/**
  * Start the action logic of the menu item, and make it selected in the menu if the item has a parent menu.
  */
	process: function() {
		this.callParent(arguments);
		this.setChecked(!this.checked);
	}

});