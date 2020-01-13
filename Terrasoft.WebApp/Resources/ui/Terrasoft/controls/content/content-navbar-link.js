Ext.define("Terrasoft.controls.ContentNavbarLink", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.ContentNavbarLink",

	/**
	 * Indicates that the item is selected.
	 * @type {Boolean}
	 */
	selected: false,

	/**
	 * A collection of style classes for the control container.
	 * @type {String[]}
	 */
	contentWrapClasses: ["content-navbar-link-wrap"],

	/**
	 * The style class of the selected item.
	 * @type {String}
	 */
	selectedClass: "t-content-focus",

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-navbar-link" class="{wrapClassName}" style="{wrapStyle}">` +
			`{%this.renderItems(out, values)%}`,
		`</div>`
	],

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-content-navbar-link"
		};
		return selectors;
	},

	/**
	 * Returns wrap element classes.
	 * @protected
	 * @return {Array} Wrap classes.
	 */
	getWrapClasses: function() {
		var wrapClassName = [];
		if (this.contentWrapClasses) {
			wrapClassName.push(this.contentWrapClasses);
		}
		if (this.selected) {
			wrapClassName.push(this.selectedClass);
		}
		return wrapClassName;
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		Ext.apply(tplData, {
			wrapClassName: this.getWrapClasses()
		});
		return tplData;
	},

	/**
	 * Handles the mouse click.
	 * @protected
	 * @param {Ext.EventObjectImpl} event The event object.
	 */
	onClick: function(event) {
		this.setSelected(true);
		event.stopPropagation();
	},

	/**
	 * Initializes DOM events.
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.on({
				click: {
					fn: this.onClick,
					scope: this
				}
			});
		}
	},

	/**
	 * Sets the selection flag for the item.
	 * @param {Boolean} selected Indicates that the item is selected.
	 */
	setSelected: function(selected) {
		if (this.selected === selected) {
			return;
		}
		this.selected = selected;
		var selectedClass = this.selectedClass;
		var wrapEl = this.getWrapEl();
		if (wrapEl && selectedClass && this.rendered) {
			if (selected) {
				wrapEl.addCls(selectedClass);
			} else {
				wrapEl.removeCls(selectedClass);
			}
		}
		this.fireEvent("selectedChanged", selected, this);
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var elementConfig = {
			selected: {
				changeEvent: "selectedChanged",
				changeMethod: "setSelected"
			}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	}

});
