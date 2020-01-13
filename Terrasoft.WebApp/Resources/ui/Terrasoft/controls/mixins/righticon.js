/**
 * The object of rendering the right icon.
 */
Ext.define("Terrasoft.controls.mixins.RightIcon", {
	alternateClassName: "Terrasoft.RightIcon",

	/**
	 * Parameter indicating that you want to use the right button
	 * @protected
	 * @property {Boolean} enableRightIcon
	 */
	enableRightIcon: false,

	/**
	 * Classes of CSS styles for the right icon
	 * @protected
	 */
	rightIconClasses: [],

	/**
	 * Image configuration for the right icon
	 * @protected
	 */
	rightIconConfig: null,

	/**
	 * Left icon template
	 * @protected
	 */
	rightIconTpl: [
		"<div id=\"{id}-right-icon-wrapper\" class=\"base-edit-right-icon-wrapper\">",
		"<div id=\"{id}-right-icon\" class=\"{rightIconClasses}\" style=\"{rightIconStyles}\"></div>",
		"</div>"
	],

	/**
	 * @inheritdoc Terrasoft.baseedit#init
	 * @override
	 */
	init: function() {
		this.addEvents(
			/**
			 * @event
			 * The event is generated when the right icon is clicked
			 */
			"rightIconClick",
			/**
			 * @event
			 * The event is generated when you hover the cursor on the right button
			 */
			"rightIconMouseOut",
			/**
			 * @event
			 * The event is generated when the cursor leaves the right button
			 */
			"rightIconMouseOver"
		);
	},

	/**
	 * The method that starts the icon rendering. Called by default from the template Terrasoft.Baseedit
	 * @protected
	 * @param buffer
	 * @param renderData
	 */
	renderRightIcon: function(buffer, renderData) {
		var self = renderData.self;
		if (!self.useRightIcon()) {
			return;
		}
		var template = new Ext.Template(self.rightIconTpl);
		var tpl = template.apply({
			id: self.id,
			rightIconClasses: self.combineRightIconClasses(),
			rightIconStyles: self.combineRightIconStyles()
		});
		buffer.push(tpl);
	},

	/**
	 * Method for collecting CSS classes of the right icon depending on the conditions
	 * @protected
	 * @return {string}
	 */
	combineRightIconClasses: function() {
		var rightIconClasses = ["base-edit-right-icon"];
		if (!Ext.isEmpty(this.rightIconClasses)) {
			rightIconClasses = Ext.Array.merge(rightIconClasses, this.rightIconClasses);
		}
		return rightIconClasses.join(" ");
	},

	/**
	 * Method for collecting CSS styles of the right icon depending on the conditions
	 * @protected
	 * @return {*|String|String[]}
	 */
	combineRightIconStyles: function() {
		var rightIconStyles = {};
		if (!Ext.isEmpty(this.rightIconConfig)) {
			var rightIconUrl = Terrasoft.ImageUrlBuilder.getUrl(this.rightIconConfig);
			rightIconStyles.background = "url('" + rightIconUrl + "') no-repeat center center";
		}
		return Ext.DomHelper.generateStyles(rightIconStyles);
	},

	/**
	 * The method returns the convention of using the right icon for external settings.
	 * @return {boolean}
	 */
	useRightIcon: function() {
		return this.enableRightIcon && (!Ext.isEmpty(this.rightIconClasses) || !Ext.isEmpty(this.rightIconConfig));
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var rightIconConfig = {
			enableRightIcon: {
				changeMethod: "setEnableRightIcon"
			}
		};
		return rightIconConfig;
	},

	/**
	 * The method that initializes the events of the right icon
	 * @protected
	 */
	initRightIconEvents: function() {
		/**
		 * @event click
		 * Click event on the right icon
		 */
		this.rightIconWrapperEl.on("click", this.onRightIconClick, this);
		/**
		 * @event mouseover
		 * Cursor pointing event to the right icon
		 */
		this.rightIconWrapperEl.on("mouseover", this.onRightIconMouseOver, this);
		/**
		 * @event mouseout
		 * Cursor escape event from the right icon
		 */
		this.rightIconWrapperEl.on("mouseout", this.onRightIconMouseOut, this);
	},

	/**
	 * The handler for the click event on the right icon
	 * @protected
	 */
	onRightIconClick: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		this.fireEvent("rightIconClick", this);
	},

	/**
	 * Handler of the cursor hover event to the right icon
	 * @protected
	 */
	onRightIconMouseOver: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		this.fireEvent("rightIconMouseOver", this);
	},

	/**
	 * Handler for the cursor escape event from the right icon
	 */
	onRightIconMouseOut: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		this.fireEvent("rightIconMouseOut", this);
	},

	setEnableRightIcon: function(enable) {
		if (this.enableRightIcon === enable) {
			return;
		}
		this.enableRightIcon = enable;
		this.safeRerender();
	}

});