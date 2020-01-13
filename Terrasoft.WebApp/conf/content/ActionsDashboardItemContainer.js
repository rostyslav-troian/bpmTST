Terrasoft.configuration.Structures["ActionsDashboardItemContainer"] = {innerHierarchyStack: ["ActionsDashboardItemContainer"]};
define("ActionsDashboardItemContainer", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.controls.ActionsDashboardItemContainer", {
		alternateClassName: "Terrasoft.ActionsDashboardItemContainer",
		extend: "Terrasoft.Container",

		// region Properties: Protected

		/**
		 * Buttons without text CSS class name.
		 * @protected
		 * @type {String}
		 */
		buttonsWithoutTextClassName: "buttons-without-text",

		/**
		 * Flag that indicate whether button text visibility toggled depends on container width.
		 * @protected
		 * @type {Boolean}
		 */
		toggleButtonsTextVisibility: true,

		// endregion

		// region Methods: Private

		/**
		 * Returns whether dashboard item actions has button with text overflow.
		 * @private
		 * @return {Boolean}
		 */
		_getIsButtonsTextOverflow: function() {
			var dashboardItem = Ext.get(this.id);
			var buttonTextElements = dashboardItem.query(".dashboard-item-actions .t-btn-text");
			var isTextOverflow = buttonTextElements.some(function(item) {
				var element = Ext.get(item);
				var textWidth = element.getTextWidth();
				var width = Math.round(element.getWidth(0, true));
				var padding = element.getPadding("lr");
				return textWidth > width - padding;
			}, this);
			return isTextOverflow;
		},

		/**
		 * Toggle button text visibility depends on dashboard item container width.
		 * @private
		 */
		_toggleButtonsText: function() {
			var dashboardItem = Ext.get(this.id);
			dashboardItem.removeCls(this.buttonsWithoutTextClassName);
			var isTextOverflow = this._getIsButtonsTextOverflow();
			if (isTextOverflow) {
				dashboardItem.addCls(this.buttonsWithoutTextClassName);
			}
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			this.wrapEl.on("mouseenter", this.onMouseEnter, this);
		},

		/**
		 * Handler for 'mouseenter' event on container element.
		 * @protected
		 */
		onMouseEnter: function() {
			if (this.toggleButtonsTextVisibility) {
				this._toggleButtonsText();
			}
		}

		// endregion

	});

	return Terrasoft.controls.ActionsDashboardItemContainer;
});


