Terrasoft.configuration.Structures["CampaignSchemaManagerItem"] = {innerHierarchyStack: ["CampaignSchemaManagerItem"]};
define("CampaignSchemaManagerItem", ["CampaignSchema",
		"CampaignSchemaUpdateRequest", "CampaignSchemaRemoveRequest", "CampaignSchemaRequest",
		"CampaignValidateRequest"],
	function() {
	/**
	 * @class Terrasoft.manager.CampaignSchemaManagerItem
	 */
	Ext.define("Terrasoft.manager.CampaignSchemaManagerItem", {
		extend: "Terrasoft.ProcessSchemaManagerItem",
		alternateClassName: "Terrasoft.CampaignSchemaManagerItem",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#instanceClassName
		 * @overridden
		 */
		instanceClassName: "Terrasoft.CampaignSchema",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#requestClassName
		 * @overridden
		 */
		requestClassName: "Terrasoft.CampaignSchemaRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#removeRequestClassName
		 * @overridden
		 */
		removeRequestClassName: "Terrasoft.CampaignSchemaRemoveRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#updateRequestClassName
		 * @overridden
		 */
		updateRequestClassName: "Terrasoft.CampaignSchemaUpdateRequest",
		
		/**
		 * The class name for the campaign validation.
		 * @type {String}
		 */
		validateRequestClassName: "Terrasoft.CampaignValidateRequest",

		/**
		 * Creates an object of the schema validate request.
		 * @return {Terrasoft.BaseSchemaRequest} The request object for the schema instance.
		 */
		getValidateRequest: function() {
			if (!this.instance) {
				throw new Terrasoft.exceptions.InvalidObjectState();
			}
			return Ext.create(this.validateRequestClassName, {schema: this.instance});
		},

		/**
		 * Makes validation request for campaign schema.
		 * @param {Function} callback Callback function to call when response will be received.
		 * @param {Object} scope Context.
		 */
		validate: function(callback, scope) {
			var safeCallback = this.getSafeCallback(callback, scope);
			var validateRequest = this.getValidateRequest();
			validateRequest.execute(function(response) {
				safeCallback.call(scope, response);
			}, this);
		}

	});
	return Terrasoft.CampaignSchemaManagerItem;
});


