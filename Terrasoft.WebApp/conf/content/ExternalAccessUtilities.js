Terrasoft.configuration.Structures["ExternalAccessUtilities"] = {innerHierarchyStack: ["ExternalAccessUtilities"]};
define("ExternalAccessUtilities", [
	"ExternalAccessServiceWrapper",
	"ExternalAccessUtilitiesResources"
], function(ExternalAccessServiceWrapper, resources) {

	/**
	 * Utility functions for external access.
	 */
	Ext.define("Terrasoft.configuration.mixins.ExternalAccessUtilities", {
		alternateClassName: "Terrasoft.ExternalAccessUtilities",

		/**
		 * @param {Object} responseObject Response of service that deactivates external accesses.
		 * @private
		 */
		_processServiceResponse: function(responseObject) {
			if (Terrasoft.isEmptyObject(responseObject)) {
				const errorMessage = resources.localizableStrings.ExternalAccessDeactivationErrorMessage;
				Terrasoft.showErrorMessage(errorMessage);
			} else {
				const successMessage = resources.localizableStrings.ExternalAccessDeactivationSuccessMessage;
				Terrasoft.showInformation(successMessage);
			}
		},

		/**
		 * Returns caption for deactivation action.
		 * @returns {String} Caption for deactivation action.
		 */
		getDeactivationActionCaption: function() {
			return resources.localizableStrings.DeactivateExternalAccessMenuCaption;
		},

		/**
		 * Deactivates specified external accesses.
		 * @param {String[]} accessIds Accesses to deactivate.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		deactivateAccesses: function(accessIds, callback, scope) {
			ExternalAccessServiceWrapper.deactivateAccesses(accessIds, function(responseObject) {
				this._processServiceResponse(responseObject);
				callback.call(scope, responseObject);
			}, this);
		}

	});

	return Ext.create("Terrasoft.ExternalAccessUtilities");
});


