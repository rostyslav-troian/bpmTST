Terrasoft.configuration.Structures["BusinessRuleSchemaManagerItem"] = {innerHierarchyStack: ["BusinessRuleSchemaManagerItem"]};
define("BusinessRuleSchemaManagerItem", ["BusinessRuleSchemaManagerItemResources"], function() {

	/**
	 * @class Terrasoft.manager.BusinessRuleSchemaManagerItem
	 * Business rule schema manager item class.
	 */
	Ext.define("Terrasoft.manager.BusinessRuleSchemaManagerItem", {
		extend: "Terrasoft.manager.BaseSchemaManagerItem",
		alternateClassName: "Terrasoft.BusinessRuleSchemaManagerItem",

		// region Properties: Protected

		/**
		 * Instance class name.
		 * @protected
		 * @property {String} instanceClassName
		 */
		instanceClassName: "Terrasoft.BusinessRuleSchema",

		/**
		 * Client unit schema uId.
		 * @protected
		 * @property {Guid} clientUnitSchemaUId
		 */
		clientUnitSchemaUId: null,

		//endregion

		// region Methods: Public

		/**
		 * Returns client unit schema uId.
		 * @return {GUID} Client unit schema uId.
		 */
		getClientUnitSchemaUId: function() {
			return this.clientUnitSchemaUId;
		},

		/**
		 * Returns client unit schema uId.
		 * @param {GUID} value Client unit schema uId.
		 */
		setClientUnitSchemaUId: function(value) {
			this.clientUnitSchemaUId = value;
		},

		/**
		 * @inheritdoc Terrasoft.BaseManagerItem#getCaption
		 * @overridden
		 */
		getCaption: function() {
			// TODO CRM-29752
			return this.instance !== null ? this.instance.getPropertyValue("caption") : null;
		},

		/**
		 * Returns business rule description.
		 * @return {Terrasoft.LocalizableString} Description.
		 */
		getDescription: function() {
			// TODO CRM-29752
			return this.instance !== null ? this.instance.getPropertyValue("description") : null;
		},

		/**
		 * Returns business rule entity schema uId.
		 * @return {GUID} Entity schema uId.
		 */
		getEntitySchemaUId: function() {
			// TODO CRM-29752
			return this.instance !== null ? this.instance.getPropertyValue("entitySchemaUId") : null;
		},

		/**
		 * Returns business rule enabled.
		 * @return {Boolean} Is business rule enabled.
		 */
		getEnabled: function() {
			// TODO CRM-29752
			return this.instance !== null ? this.instance.getPropertyValue("enabled") : null;
		},

		/**
		 * Returns business rule removed.
		 * @return {Boolean} Is business rule removed.
		 */
		getRemoved: function() {
			var instanceIsRemoved = this.instance !== null ? this.instance.getPropertyValue("removed") : null;
			return this.isDeleted || instanceIsRemoved;
		},

		/**
		 * Returns business rule invalid.
		 * @return {Boolean} Is business rule invalid.
		 */
		getInvalid: function() {
			return this.instance !== null ? this.instance.getPropertyValue("invalid") : null;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#setInstance
		 * @overridden
		 */
		setInstance: function(instance) {
			this.instance = instance;
		}

		// endregion

	});

	return Terrasoft.BusinessRuleSchemaManagerItem;

});


