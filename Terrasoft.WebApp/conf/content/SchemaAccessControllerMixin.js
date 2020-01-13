Terrasoft.configuration.Structures["SchemaAccessControllerMixin"] = {innerHierarchyStack: ["SchemaAccessControllerMixin"]};
define("SchemaAccessControllerMixin", ["ConfigurationConstants"], function(ConfigurationConstants) {
	/**
	 * @class Terrasoft.configuration.mixins.SchemaAccessControllerMixin
	 */
	Ext.define("Terrasoft.configuration.mixins.SchemaAccessControllerMixin", {
		alternateClassName: "Terrasoft.SchemaAccessControllerMixin",

		/**
		 * Redirect if has no access.
		 * @param {String} modulePropertyName Name of module property.
		 * @param {String} hashTemplate Template of hash.
		 * @return {Boolean} true - if successfully redirected.
		 */
		redirectIfDenied: function(modulePropertyName, hashTemplate) {
			const module = this.Terrasoft.ModuleUtils.getModuleStructureByName(this.entitySchemaName);
			const schema = module && module[modulePropertyName];
			let hash = "";
			if (this.isEmpty(schema)) {
				hash = ConfigurationConstants.DefaultPortalHomeModule;
			}
			if (schema && schema !== this.name) {
				hash = hashTemplate.replace(modulePropertyName, schema);
			}
			if (this.isNotEmpty(hash)) {
				this.sandbox.publish("ReplaceHistoryState", {hash: hash});
				return true;
			}
			return false;
		}
	});
});


