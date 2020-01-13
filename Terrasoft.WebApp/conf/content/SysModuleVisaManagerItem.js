Terrasoft.configuration.Structures["SysModuleVisaManagerItem"] = {innerHierarchyStack: ["SysModuleVisaManagerItem"]};
define("SysModuleVisaManagerItem", ["SysModuleVisaManagerItemResources", "SysModuleVisaManager"], function() {
	/**
	 * @class Terrasoft.SysModuleVisaManagerItem
	 * Class of section visa settings.
	 */
	Ext.define("Terrasoft.manager.SysModuleVisaManagerItem", {
		extend: "Terrasoft.manager.ObjectManagerItem",
		alternateClassName: "Terrasoft.SysModuleVisaManagerItem",

		// region Properties: Private

		/**
		 * Visa schema identifier.
		 * @private
		 * @type {Object}
		 */
		visaSchemaUId: null,

		/**
		 * Master column identifier.
		 * @private
		 * @type {Object}
		 */
		masterColumnUId: null,

		/**
		 * Flag that indicates which provider to use.
		 * @private
		 * @type {Boolean}
		 */
		useCustomNotificationProvider: false,

		// endregion

		// region Properties: Public

		/**
		 * Sets visa schema identifier.
		 * @param {String} visaSchemaUId visa schema identifier.
		 */
		setVisaSchemaUId: function(visaSchemaUId) {
			this.setPropertyValue("visaSchemaUId", visaSchemaUId);
		},

		/**
		 * Returns visa schema identifier.
		 * @return {String} Returns visa schema identifier.
		 */
		getVisaSchemaUId: function() {
			return this.getPropertyValue("visaSchemaUId");
		},

		/**
		 * Sets master column identifier.
		 * @param {String} masterColumnUId visa column identifier.
		 */
		setMasterColumnUId: function(masterColumnUId) {
			this.setPropertyValue("masterColumnUId", masterColumnUId);
		},

		/**
		 * Returns master column identifier.
		 * @return {String} Returns master column identifier.
		 */
		getMasterColumnUId: function() {
			return this.getPropertyValue("masterColumnUId");
		}

		// endregion

	});
	return Terrasoft.SysModuleVisaManagerItem;
});


