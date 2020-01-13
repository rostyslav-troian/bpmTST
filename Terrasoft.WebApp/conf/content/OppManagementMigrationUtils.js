Terrasoft.configuration.Structures["OppManagementMigrationUtils"] = {innerHierarchyStack: ["OppManagementMigrationUtils"]};
define("OppManagementMigrationUtils", ["ext-base", "terrasoft", "FeatureServiceRequest"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.configuration.mixins.OppManagementMigrationUtils", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.OppManagementMigrationUtils",

		/**
		 * Sets value of old opportunity management process usage state to opposite of current value.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} [scope] Callback scope.
		 */
		toggleOldProcessUsageState: function(callback, scope) {
			var request = this.createFeatureRequest();
			var state = this.isOldProcessEnabled() ?
				Terrasoft.FeatureState.DISABLED :
				Terrasoft.FeatureState.ENABLED;
			request.updateFeatureState({state: state, forAllUsers: true}, callback, scope || this);
		},

		/**
		 * Returns feature service request.
		 * @private
		 * @return {Terrasoft.FeatureServiceRequest}
		 */
		createFeatureRequest: function() {
			return Ext.create("Terrasoft.FeatureServiceRequest", {
				code: "UseOldOpportunityManagementProcess"
			});
		},

		/**
		 * Returns old opportunity management process usage state.
		 * @protected
		 * @return {Boolean} True if opportunity management process is enabled.
		 */
		isOldProcessEnabled: function() {
			return this.get("OldOpportunityManagementEnabled");
		},

		/**
		 * Initializes old opportunity management process usage state.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} [scope] Callback scope.
		 */
		initOldProcessUsageState: function(callback, scope) {
			var request = this.createFeatureRequest();
			request.getFeatureState(function(state) {
				var oldProcessEnabled = Terrasoft.FeatureState.ENABLED === state;
				this.set("OldOpportunityManagementEnabled", oldProcessEnabled);
				callback.call(scope || this);
			}, this);
		}

	});
});


