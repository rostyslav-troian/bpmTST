/**
 * The object for rendering the left icon.
 */
Ext.define("Terrasoft.controls.mixins.LeftIcon", {
	alternateClassName: "Terrasoft.LeftIcon",

	/**
	 * Parameter indicating that you need to use the left icon
	 * @protected
	 * @property {Boolean} enableLeftIcon
	 */
	enableLeftIcon: false,

	/**
	 * Classes of CSS styles for the left icon
	 * @protected
	 */
	leftIconClasses: [],

	/**
	 * The CSS class of the style of the control with the left icon.
	 */
	editWithLeftIconClass: "base-edit-with-left-icon",

	/**
	 * Image configuration for left icon
	 * @protected
	 */
	leftIconConfig: null,

	/**
	 * Left icon template
	 * @protected
	 */
	leftIconTpl: "<div id=\"{id}-left-icon\" class=\"{leftIconClasses}\" style=\"{leftIconStyles}\"></div>",

	/**
	 * The method that starts the icon rendering. Called by default from the Terrasoft.Baseedit template
	 * @protected
	 * @param buffer
	 * @param renderData
	 */
	renderLeftIcon: function(buffer, renderData) {
		var self = renderData.self;
		if (!self.useLeftIcon()) {
			return;
		}
		var template = new Ext.Template(self.leftIconTpl);
		var tpl = template.apply({
			id: self.id,
			leftIconClasses: self.combineLeftIconClasses(),
			leftIconStyles: self.combineLeftIconStyles()
		});
		buffer.push(tpl);
	},

	/**
	 * Method for collecting CSS classes of the left icon depending on the conditions
	 * @protected
	 * @return {string}
	 */
	combineLeftIconClasses: function() {
		var leftIconClasses = ["base-edit-left-icon"];
		if (!Ext.isEmpty(this.leftIconClasses)) {
			leftIconClasses = Ext.Array.merge(leftIconClasses, this.leftIconClasses);
		}
		return leftIconClasses.join(" ");
	},

	/**
	 * Method for collecting CSS styles of the left icon depending on the conditions
	 * @protected
	 * @return {*|String|String[]}
	 */
	combineLeftIconStyles: function() {
		var leftIconStyles = {};
		if (!Ext.isEmpty(this.leftIconConfig)) {
			var leftIconUrl = Terrasoft.ImageUrlBuilder.getUrl(this.leftIconConfig);
			leftIconStyles.background = "url('" + leftIconUrl + "') no-repeat center center";
		}
		return Ext.DomHelper.generateStyles(leftIconStyles);
	},

	/**
	 * The method returns the convention of using the left icon for external settings.
	 * @return {boolean}
	 */
	useLeftIcon: function() {
		return this.enableLeftIcon && (!Ext.isEmpty(this.leftIconClasses) || !Ext.isEmpty(this.leftIconConfig));
	},

	/**
	 * The method that initializes the events of the left icon
	 * @protected
	 */
	initLeftIconEvents: Terrasoft.emptyFn,

	/**
	 * Sets LeftIcon.
	 * @param {String} leftIconConfig image config.
	 */
	setImage: function(leftIconConfig) {
		if (this.leftIconConfig === leftIconConfig) {
			return;
		}
		this.leftIconConfig = leftIconConfig;
		if (!this.rendered) {
			return;
		}
		var useLeftIcon = this.useLeftIcon();
		var leftIconWrapEl = this.leftIconEl;
		if (leftIconWrapEl && leftIconWrapEl.dom) {
			var wrapEl = this.getWrapEl();
			if (useLeftIcon) {
				wrapEl.addCls(this.editWithLeftIconClass);
				var combinedLeftIconStyles = this.combineLeftIconStyles();
				leftIconWrapEl.dom.setAttribute("style", combinedLeftIconStyles);
			} else {
				leftIconWrapEl.destroy();
				wrapEl.removeCls(this.editWithLeftIconClass);
			}
		} else if (useLeftIcon) {
			this.reRender();
		}
	},

	/**
	 * Returns the binding configuration to the model for the mixin interface {@link Terrasoft.Bindable}.
	 * @protected
	 */
	getBindConfig: function() {
		var leftIconBindConfig = {
			leftIconConfig: {
				changeMethod: "setImage"
			}
		};
		return leftIconBindConfig;
	}

});