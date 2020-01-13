/**
 * Class for item of filter edit control.
 * @abstract
 */
Ext.define("Terrasoft.controls.FilterEditItem", {
	alternateClassName: "Terrasoft.FilterEdit.Item",

	translate: Terrasoft.Resources.FilterEdit,

	/**
	 * Reference to the filter manager.
	 * @type {Object}
	 */
	filterManager: null,

	/**
	 * Reference to the filter edit.
	 * @type {Object}
	 */
	filterEdit: null,

	/**
	 * Item identifier.
	 * @type {String}
	 */
	id: null,

	/**
	 * Reference to the filter item.
	 * @type {Object}
	 */
	instance: null,

	/**
	 * Flag that enables or disables filter.
	 * @type {Boolean}
	 */
	enabled: true,

	/**
	 * Control identifier prefixes.
	 * @abstract
	 * @type {Object}
	 */
	idPrefix: null,

	/**
	 * Controls classes.
	 * @abstract
	 * @type {Object}
	 */
	cssClass: {
		enableWrapper: "t-checkboxedit-wrap",
		enable: "t-checkboxedit",
		disable: "filteredit-disabled",
		checked: "t-checkboxedit-checked",
		del: "filteredit-item-delete"
	},

	/**
	 * Reference to the wrapper element.
	 * @type {Ext.dom.Element}
	 */
	wrapEl: null,

	/**
	 * Reference to the delete element.
	 * @type {Ext.dom.Element}
	 */
	deleteEl: null,

	/**
	 * Filter item allowed operations.
	 * @protected
	 * @type {Object}
	 */
	allowedManageOperations: null,

	/**
	 * Constructor for FilterEdit.Item class.
	 * @param  {Object} config Constructor configuration information.
	 * @return {Object} Control instance.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.filterManager = config.filterManager;
		this.filterEdit = config.filterEdit;
		this.init(config);
		this.allowedManageOperations = this.getAllowedManageOperations();
	},

	/**
	 * Returns allowed filter item operations.
	 * @protected
	 * @return {Object}
	 */
	getAllowedManageOperations: function() {
		return {};
	},

	/**
	 * Initialize filter item.
	 * @protected
	 */
	init: Terrasoft.emptyFn,

	/**
	 * Generates checkbox html configuration.
	 * @protected
	 * @param {Object[]} viewItems Filter item view configs.
	 * @return {Object}
	 */
	generateCheckboxConfig: function(viewItems) {
		var htmlConfig = {
			tag: "span",
			cls: this.cssClass.enableWrapper,
			"data-item-marker": this.getCheckboxItemMarker(),
			children: [
				{
					tag: "input",
					cls: this.cssClass.enable,
					type: "checkbox"
				}
			]
		};
		if (this.enabled) {
			htmlConfig.cls += " " + this.cssClass.checked;
		}
		viewItems.push(htmlConfig);
		return Terrasoft.deepClone(htmlConfig);
	},

	/**
	 * Returns checkbox data item marker.
	 * @protected
	 * @abstract
	 * @return {String}
	 */
	getCheckboxItemMarker: Terrasoft.emptyFn,

	/**
	 * Generates delete html configuration.
	 * @protected
	 * @param {Object[]} viewItems Filter item view configs.
	 * @return {Object}
	 */
	generateDeleteConfig: function(viewItems) {
		var htmlConfig = {
			tag: "span",
			cls: this.cssClass.del
		};
		viewItems.push(htmlConfig);
		return Terrasoft.deepClone(htmlConfig);
	},

	/**
	 * Returns reference on item wrapper element.
	 * @return {Ext.dom.Element}
	 */
	getWrapEl: function() {
		if (!this.wrapEl) {
			this.wrapEl = Ext.get(this.id);
		}
		return this.wrapEl;
	},

	/**
	 * Returns reference on checkbox wrapper element.
	 * @protected
	 * @return {Ext.dom.Element}
	 */
	getEnableWrapEl: function() {
		if (!this.enableWrapEl) {
			var wrapEl = this.getWrapEl();
			this.enableWrapEl = wrapEl.child("." + this.cssClass.enableWrapper);
		}
		return this.enableWrapEl;
	},

	/**
	 * Handles checkbox select.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onEnableElClick: function(event) {
		event.stopEvent();
		var enabled = this.enabled;
		this.setEnabled(!enabled);
	},

	/**
	 * Enables filter condition.
	 * @private
	 */
	enableFilter: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.removeCls(this.cssClass.disable);
		var enableWrapEl = this.getEnableWrapEl();
		enableWrapEl.addCls(this.cssClass.checked);
		this.filterManager.setEnableFilterValueByKey(this.instance.key, true);
	},

	/**
	 * Disables filter condition.
	 * @private
	 */
	disableFilter: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.addCls(this.cssClass.disable);
		var enableWrapEl = this.getEnableWrapEl();
		enableWrapEl.removeCls(this.cssClass.checked);
		this.filterManager.setEnableFilterValueByKey(this.instance.key, false);
	},

	/**
	 * Sets filter enabled or disabled.
	 * @private
	 * @param {Boolean} value Enables or disables filter.
	 */
	setEnabled: function(value) {
		if (this.enabled === value) {
			return;
		}
		this.enabled = value;
		if (value) {
			this.enableFilter();
		} else {
			this.disableFilter();
		}
	}
});
