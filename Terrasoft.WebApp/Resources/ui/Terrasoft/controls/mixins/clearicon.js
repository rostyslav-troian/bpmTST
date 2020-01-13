/**
 * The object of rendering the text clearing icon for.
 */
Ext.define("Terrasoft.controls.mixins.ClearIcon", {
	alternateClassName: "Terrasoft.ClearIcon",

	/**
	 * Flag indicating that you need to use the text clearing icon.
	 * @protected
	 * @property {Boolean} hasClearIcon
	 */
	hasClearIcon: false,

	/**
	 * Classes of CSS styles for the icon of text clearing.
	 * @protected
	 */
	clearIconClasses: null,

	/**
	 * A CSS style class for hiding the text clearing icon.
	 * @protected
	 */
	clearIconNotVisibleClass: "clear-icon-not-visible",

	/**
	 * A CSS style class for hiding the text clearing icon.
	 * @protected
	 */
	clearIconWrapClass: "base-edit-with-clear-icon",

	/**
	 * The image configuration for the text clearing icon.
	 * @protected
	 */
	clearIconConfig: null,

	/**
	 * Template for text clearing icon.
	 * @protected
	 */
	clearIconTpl: [
		"<div id=\"{id}-clear-icon\" class=\"{clearIconClasses}\"></div>"
	],

	/**
	 * The method of initializing the mixin.
	 */
	init: function() {
		this.clearIconClasses = this.clearIconClasses || [];
		this.addEvents(
			/**
			 * @event
			 * he event generated when you click on the clear text icon.
			 */
			"cleariconclick"
		);
	},

	/**
	 * The method that starts the rendering of the icon. It is called by default from the Terrasoft.BaseEdit template.
	 * @protected
	 * @param buffer
	 * @param renderData
	 */
	renderClearIcon: function(buffer, renderData) {
		var self = renderData.self;
		if (!self.hasClearIcon) {
			return;
		}
		var template = new Ext.Template(self.clearIconTpl);
		var tpl = template.apply({
			id: self.id,
			clearIconClasses: self.combineClearIconClasses(),
			clearIconStyles: self.combineClearIconStyles()
		});
		buffer.push(tpl);
	},

	/**
	 * The method gets the selectors of the control.
	 * @param {Object} selectors Selector object.
	 * @protected
	 * @return {Object} Selector object.
	 */
	combineSelectors: function(selectors) {
		selectors.clearIconEl = "#" + this.id + "-clear-icon";
		return selectors;
	},

	/**
	 * Method of collecting CSS classes for clearing text icons depending on the conditions.
	 * @protected
	 * @return {string} Returns the icons for clearing text.
	 */
	combineClearIconClasses: function() {
		var clearIconClasses = ["base-edit-clear-icon"];
		if (!Ext.isEmpty(this.clearIconClasses)) {
			clearIconClasses = Ext.Array.merge(clearIconClasses, this.clearIconClasses);
		}
		return clearIconClasses.join(" ");
	},

	/**
	 * Adds a CSS class to the external element class collection.
	 * @param classes class object.
	 */
	combineWrapClasses: function(classes) {
		var wrapClass = classes.wrapClass || {};
		wrapClass.push(this.clearIconWrapClass);
		if (this.getIsHidden()) {
			wrapClass.push(this.clearIconNotVisibleClass);
		}
	},

	/**
	 * Method for collecting CSS styles of text clearing icons depending on conditions.
	 * @protected
	 * @return {String} Returns the styles of the text clear icon.
	 */
	combineClearIconStyles: function() {
		var clearIconStyles = {};
		if (!Ext.isEmpty(this.clearIconConfig)) {
			var clearIconUrl = Terrasoft.ImageUrlBuilder.getUrl(this.clearIconConfig);
			clearIconStyles.background = "url(\"" + clearIconUrl + "\") no-repeat center center";
		}
		return Ext.DomHelper.generateStyles(clearIconStyles);
	},

	/**
	 *The method that initializes the events of the text clearing icon.
	 * @protected
	 */
	initDomEvents: function() {
		if (!this.hasClearIcon) {
			return;
		}
		var clearIconEl = this.getClearIconEl();
		clearIconEl.on("click", this.onClearIconClick, this);
	},

	/**
	 * Returns the DOM element of the text cleaning icon.
	 * @return {Object}
	 */
	getClearIconEl: function() {
		return this.clearIconEl;
	},

	/**
	 * The event handler for the click event on the text clear icon.
	 * @protected
	 */
	onClearIconClick: function() {
		if (!this.enabled || this.readonly) {
			return;
		}
		this.setValue(null);
		this.fireEvent("cleariconclick", this);
	},

	/**
	 * Displays a button when the input field is not empty, otherwise it hides it.
	 * @protected
	 */
	setClearIconVisibility: function() {
		if (!this.hasClearIcon || !this.rendered) {
			return;
		}
		var clearIconNotVisibleClass = this.clearIconNotVisibleClass;
		var wrapEl = this.getWrapEl();
		if (this.getIsHidden()) {
			wrapEl.addCls(clearIconNotVisibleClass);
		} else {
			wrapEl.removeCls(clearIconNotVisibleClass);
		}
	},

	/**
	 * Determines whether the icon should be visible or not.
	 * @protected
	 * @return {*|Boolean}
	 */
	getIsHidden: function() {
		var initValue = this.getInitValue();
		return Ext.isEmpty(initValue) || !this.enabled || this.readonly;
	},

	/**
	 * Performs an unsubscribe from the DOM messages of the elements.
	 * @protected
	 */
	clearDomListeners: function() {
		var clearIconEl = this.getClearIconEl();
		if (clearIconEl) {
			clearIconEl.un("cleariconmouseover", this.onClearIconMouseOver, this);
		}
	}

});
