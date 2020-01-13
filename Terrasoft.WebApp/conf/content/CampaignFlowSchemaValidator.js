Terrasoft.configuration.Structures["CampaignFlowSchemaValidator"] = {innerHierarchyStack: ["CampaignFlowSchemaValidator"]};
define("CampaignFlowSchemaValidator", ["CampaignFlowSchemaValidatorResources"],
	function() {
		/**
		 * class Terrasoft.CampaignFlowSchemaValidator to validate campaign flow schema.
		 */
		Ext.define("Terrasoft.CampaignFlowSchemaValidator", {

			/**
			 * Information about campaign flow schema validation result.
			 * @type {Terrasoft.Collection}
			 */
			validationInfo: null,

			/**
			 * Creates CampaignFlowSchemaValidator instance.
			 */
			constructor: function() {
				this.validationInfo = Ext.create("Terrasoft.Collection");
			},

			/**
			 * Validates campaign's flow schema.
			 * @param  {Terrasoft.CampaignSchema} schema Campaign schema to validate.
			 * @private
			 */
			_validateFlowSchema: function(schema) {
				schema.validate();
				if (schema.validationResult && !schema.validationResult.isEmpty()) {
					this.validationInfo.add(schema.name, schema.validationResult);
				}
			},

			/**
			 * Validates each element of current campaign flow schema.
			 * @param  {Terrasoft.CampaignSchema} schema Campaign schema to validate.
			 * @private
			 */
			_validateElements: function(schema) {
				var elements = schema.flowElements;
				elements.each(function(el) {
					var validationResult = el.validate();
					if (validationResult && !validationResult.isEmpty()) {
						this.validationInfo.add(el.name, validationResult);
					}
				}, this);
			},

			/**
			 * Validates campaign flow schema with elements.
			 * @param  {Terrasoft.CampaignSchema} schema Campaign schema to validate.
			 * @protected
			 * @return {Terrasoft.Collection} Validation result.
			 */
			validate: function(schema) {
				this.validationInfo.clear();
				this._validateFlowSchema(schema);
				this._validateElements(schema);
				return this.validationInfo;
			}
		});
		return Ext.create("Terrasoft.CampaignFlowSchemaValidator");
	}
);


