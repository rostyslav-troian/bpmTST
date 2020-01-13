Terrasoft.configuration.Structures["BaseSearchEdit"] = {innerHierarchyStack: ["BaseSearchEdit"]};
define("BaseSearchEdit", ["BaseSearchEditResources"], function(resources) {

	/**
	 * @class Terrasoft.controls.BaseSearchEdit
	 * Single-line search control class based on text edit control.
	 */
	Ext.define("Terrasoft.controls.BaseSearchEdit", {
		extend: "Terrasoft.TextEdit",
		alternateClassName: "Terrasoft.BaseSearchEdit",

		/**
		 * Parameter which contains css-classes for right icon.
		 * @type {Array}
		 */
		rightIconClasses: ["custom-right-item"],

		/**
		 * Right icon configuration object parameter.
		 * @type {Object}
		 */
		rightIconConfig: {
			source: Terrasoft.ImageSources.URL,
			url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.LookupImage)
		},

		/**
		 * Parameter which indicates whether control has clear icon.
		 * @type {Boolean}
		 */
		hasClearIcon: false,

		/**
		 * Executes additional logic before firing events.
		 * @abstract
		 * @protected
		 * @return {Boolean}
		 */
		beforeFiringEvents: Terrasoft.emptyFn,

		/**
		 * Initializes control.
		 * @protected
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
					/**
					 * @event searchValueDeleted
					 * Triggers on search value deleted.
					 */
					"searchValueDeleted",
					/**
					 * @event searchValueChanged
					 * Triggers on search value changed.
					 */
					"searchValueChanged"
			);
		},

		/**
		 * Key up handler. Generates searchValueDeleted event {@link Terrasoft.BaseSearchEdit#searchValueDeleted}.
		 * @param {Ext.EventObjectImpl} e Event object.
		 * @protected
		 * @overridden
		 */
		onKeyUp: function(e) {
			this.callParent(arguments);
			this.beforeFiringEvents();
			if (!this.enabled || this.readonly) {
				return;
			}
			var fieldValue = this.getTypedValue();
			this.fireOnKeyUpEvents(e, fieldValue);
		},

		/**
		 * Fires events on key up.
		 * @protected
		 * @param {Ext.EventObjectImpl} e Event object.
		 * @param {String} fieldValue Text edit value.
		 */
		fireOnKeyUpEvents: function(e, fieldValue) {
			if (Ext.isEmpty(fieldValue)) {
				this.fireEvent("searchValueDeleted");
			}
		},

		/**
		 * @inheritdoc RightIcon#combineRightIconStyles
		 * @overriden
		 */
		combineRightIconStyles: function() {
			var rightIconStyles = {};
			if (!Ext.isEmpty(this.rightIconConfig)) {
				var rightIconUrl = Terrasoft.ImageUrlBuilder.getUrl(this.rightIconConfig);
				rightIconStyles.background = this.getBackgroundResourceStyle(rightIconUrl);
			}
			return Ext.DomHelper.generateStyles(rightIconStyles);
		},

		/**
		 * Gets proper resource string for right icon.
		 * @protected
		 * @param {String} url Resource url.
		 * @returns {string}
		 */
		getBackgroundResourceStyle: function(url) {
			return "url('" + url + "') -9px -9px";
		}

	});

});


