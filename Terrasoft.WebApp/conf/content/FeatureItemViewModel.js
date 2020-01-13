Terrasoft.configuration.Structures["FeatureItemViewModel"] = {innerHierarchyStack: ["FeatureItemViewModel"]};
define("FeatureItemViewModel", ["FeatureItemViewModelResources"], function(resources) {
	/**
	 * @class Terrasoft.configuration.FilterItemViewModel
	 * Feature item view model class.
	 */
	Ext.define("Terrasoft.configuration.FeatureItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.FeatureItemViewModel",

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * Initializes features view model class..
		 * @protected
		 */
		init: function() {
			this.addEvents(
				/**
				 * @event
				 * Change feature state event.
				 * @param {Terrasoft.FeatureItemViewModel} viewModel View model of feature item.
				 */
				"changeFeatureState"
			);
			this.initButtonCaption();
		},

		/**
		 * Initializes feature state button caption.
		 * @private
		 */
		initButtonCaption: function() {
			var featureState = this.get("FeatureState");
			if (featureState === Terrasoft.FeatureState.ENABLED) {
				this.set("SwitchStateButtonCaption", resources.localizableStrings.DisableFeatureCaption);
			} else {
				this.set("SwitchStateButtonCaption", resources.localizableStrings.EnableFeatureCaption);
			}
		},

		/**
		 * Handler for change feature state button click.
		 * @protected
		 */
		onChangeFeatureStateClick: function() {
			var featureCode = arguments[3] || this.get("Code");
			var featureEnabled = Terrasoft.Features.getIsEnabled(featureCode);
			this.set("FeatureState", featureEnabled ? Terrasoft.FeatureState.DISABLED : Terrasoft.FeatureState.ENABLED);
			this.initButtonCaption();
			this.fireEvent("changeFeatureState", this);
		}
	});

	return Terrasoft.FeatureItemViewModel;
});


