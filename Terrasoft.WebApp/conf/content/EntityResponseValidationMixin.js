Terrasoft.configuration.Structures["EntityResponseValidationMixin"] = {innerHierarchyStack: ["EntityResponseValidationMixin"]};
define("EntityResponseValidationMixin", ["ext-base", "ResponseExceptionHelper"],
	function(Ext) {
	/**
	 * Entity response validation mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.EntityResponseValidationMixin", {
		alternateClassName: "Terrasoft.EntityResponseValidationMixin",

		/**
		 * Validates server response. Returns true or false depending on
		 * the server response, generates error message and fires dialog in case of an error.
		 * @protected
		 * @param {Object} response Server response object.
		 * @param {Boolean} response.success Server action result.
		 * @param {String} response.message Error message.
		 * @return {Boolean} Validation result.
		 */
		validateResponse: function(response) {
			var isSuccess = response && response.success;
			if (!isSuccess) {
				var responseExceptionHelper = Ext.create("Terrasoft.ResponseExceptionHelper");
				var errorMessage = (Ext.isEmpty(response.errorInfo)) ?
					response.message :
					responseExceptionHelper.GetExceptionMessage(response.errorInfo);
				if (errorMessage) {
					this.showInformationDialog(errorMessage);
				}
			}
			return isSuccess;
		}
	});
});


