Terrasoft.configuration.Structures["GoogleTagManagerMeasurementsUtilities"] = {innerHierarchyStack: ["GoogleTagManagerMeasurementsUtilities"]};
define("GoogleTagManagerMeasurementsUtilities", ["GoogleTagManagerUtilities", "performancecountermanager"
], function(GoogleTagManagerUtilities, performanceManager) {

	/**
	 * Mixin for conducting measurements for sending this data to Google tag manager.
	 */
	Ext.define("Terrasoft.configuration.mixins.GoogleTagManagerMeasurementsUtilities", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.GoogleTagManagerMeasurementsUtilities",

		//region Properties: Private

		/**
		 * Page load mark name.
		 * @private
		 * @type {String}
		 */
		loadTimeMarkName: "LoadTime",

		//endregion

		//region Methods: Private

		/**
		 * Sent measurements to Google tag manager.
		 * @private
		 */
		sendGoogleTagManagerMeasurements: function() {
			var loadTimeMarkName = this.loadTimeMarkName;
			var data;
			var config = {
				filterFn: function(mark) {
					return mark.name === loadTimeMarkName;
				},
				namespaceSeparator: "_"
			};
			var performanceManagerData = performanceManager.getMarksHierarchy(config) || {hierarchy: {}};
			var loadTimeData = performanceManagerData.hierarchy[loadTimeMarkName];
			if (!loadTimeData || !loadTimeData.mark) {
				data = this.getGoogleTagManagerMeasurements(undefined);
				GoogleTagManagerUtilities.actionModule(data);
				return;
			}
			var mark = loadTimeData.mark;
			var measurements = mark.measurements;
			if (!measurements || measurements.length === 0) {
				return;
			}
			var lastMeasurement = measurements[measurements.length - 1];
			data = this.getGoogleTagManagerMeasurements(lastMeasurement.duration);
			GoogleTagManagerUtilities.actionModule(data);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Start conducting measurements for sending this data to Google tag manager.
		 * @protected
		 */
		startGoogleTagManagerMeasurements: function() {
			if (Terrasoft.CurrentUser.userType !== Terrasoft.UserType.SSP) {
				Terrasoft.SysSettings.querySysSettingsItem("UseGoogleTagManager", function(value) {
					if (value) {
						performanceManager.start(this.loadTimeMarkName);
					}
				}, this);
			}
		},

		/**
		 * Stop conducting measurements for sending this data to Google tag manager.
		 * @protected
		 */
		stopGoogleTagManagerMeasurements: function() {
			if (Terrasoft.CurrentUser.userType !== Terrasoft.UserType.SSP) {
				Terrasoft.SysSettings.querySysSettingsItem("UseGoogleTagManager", function(value) {
					if (value) {
						performanceManager.stop(this.loadTimeMarkName);
						this.sendGoogleTagManagerMeasurements();
					}
				}, this);
			}
		},

		/**
		 * Returns data with measurements for Google tag manager.
		 * @protected
		 * @param {Number|undefined} duration Mark time duration in milliseconds.
		 * @return {Object} Data with measurements for Google tag manager.
		 */
		getGoogleTagManagerMeasurements: function(duration) {
			var googleTagManagerData = this.getGoogleTagManagerData();
			Ext.apply(googleTagManagerData, {loadTime: duration});
			return googleTagManagerData;
		}

		//endregion

	});
});


