Terrasoft.configuration.Structures["SearchEdit"] = {innerHierarchyStack: ["SearchEdit"]};
define("SearchEdit", ["BaseSearchEdit"], function() {

	/**
	 * @class Terrasoft.controls.SearchEdit
	 * Single-line search control class with search delay.
	 */
	Ext.define("Terrasoft.controls.SearchEdit", {
		extend: "Terrasoft.BaseSearchEdit",
		alternateClassName: "Terrasoft.SearchEdit",

		/**
		 * Search delay timer id.
		 * @private
		 * @type {Number}
		 */
		timerId: 0,

		/**
		 * Search delay.
		 * Ms between field input and filtration.
		 * @type {Number}
		 */
		searchDelay: 1000,

		/**
		 * @inheritdoc BaseSearchEdit#beforeFiringEvents
		 * @overridden
		 */
		beforeFiringEvents: function() {
			this.clearTimer("timerId");
		},

		/**
		 * @inheritdoc BaseSearchEdit#fireOnKeyUpEvents
		 * @overridden
		 */
		fireOnKeyUpEvents: function(e, fieldValue) {
			if (!e.isNavKeyPress()) {
				this.timerId = Ext.defer(function() {
					this.fireEvent("searchValueChanged", fieldValue, this);
				}, this.searchDelay, this);
			}
		},

		/**
		 * Destroys timer by name.
		 * @private
		 */
		clearTimer: function() {
			if (!Ext.isEmpty(this.timerId)) {
				clearTimeout(this.timerId);
				this.timerId = null;
			}
		},

		/**
		 * @inheritdoc BaseSearchEdit#getBackgroundResourceStyle
		 * @overridden
		 */
		getBackgroundResourceStyle: function(url) {
			return "url('" + url + "')";
		}

	});

});


