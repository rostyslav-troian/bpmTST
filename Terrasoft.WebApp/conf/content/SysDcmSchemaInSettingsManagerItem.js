Terrasoft.configuration.Structures["SysDcmSchemaInSettingsManagerItem"] = {innerHierarchyStack: ["SysDcmSchemaInSettingsManagerItem"]};
define("SysDcmSchemaInSettingsManagerItem", ["SysDcmSchemaInSettingsManagerItemResources",
	"SysModuleEntityManager"], function() {
	/**
	 * @class Terrasoft.manager.SysDcmSchemaInSettingsManagerItem
	 * Class of DCM schema in settings item.
	 */
	Ext.define("Terrasoft.manager.SysDcmSchemaInSettingsManagerItem", {
		extend: "Terrasoft.manager.ObjectManagerItem",
		alternateClassName: "Terrasoft.SysDcmSchemaInSettingsManagerItem",

		// region Properties: Private

		/**
		 * Case schema identifier.
		 * @private
		 * @type {String}
		 */
		sysDcmSchemaUId: null,

		/**
		 * Case schema section settings.
		 * @private
		 * @type {Object}
		 */
		sysDcmSettings: null,

		// endregion

		// region Methods: Public

		/**
		 * Returns SysDcmSettings identifier.
		 * @return {String}.
		 */
		getSysDcmSettings: function() {
			var sysDcmSettings = this.getPropertyValue("sysDcmSettings");
			return sysDcmSettings && sysDcmSettings.value;
		},

		/**
		 * Sets SysDcmSettings identifier.
		 * @param {String} value SysDcmSettings identifier.
		 */
		setSysDcmSettings: function(value) {
			this.setPropertyValue("sysDcmSettings", {
				value: value,
				displayValue: ""
			});
		},

		/**
		 * Returns case schema identifier.
		 * @return {String}
		 */
		getSysDcmSchemaUId: function() {
			return this.getPropertyValue("sysDcmSchemaUId");
		},

		/**
		 * Sets case schema identifier.
		 * @param {String} value Case schema identifier.
		 */
		setSysDcmSchemaUId: function(value) {
			this.setPropertyValue("sysDcmSchemaUId", value);
		}

		// endregion

	});
	return Terrasoft.SysDcmSchemaInSettingsManagerItem;
});


