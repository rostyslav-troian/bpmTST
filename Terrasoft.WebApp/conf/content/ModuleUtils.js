Terrasoft.configuration.Structures["ModuleUtils"] = {innerHierarchyStack: ["ModuleUtils"]};
define("ModuleUtils", function() {

	/**
	 * @class Terrasoft.manager.ModuleUtils
	 * Class of the manager structure for modules and objects.
	 */
	Ext.define("Terrasoft.manager.ModuleUtils", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ModuleUtils",
		singleton: true,

		entityStructure: Terrasoft.configuration.EntityStructure,

		moduleStructure: Terrasoft.configuration.ModuleStructure,

		/**
		 * Default card module.
		 * @private
		 * @type {String}
		 */
		defaultCardModule: "CardModuleV2",

		/**
		 * Return module tag.
		 * @param {string} module Module name.
		 * @returns {string} Module tag.
		 */
		getModuleTag: function(module) {
			var tag = "";
			switch (module) {
				case "Process":
					tag = "ProcessExecute/";
					break;
				default:
					var moduleStructure = this.getModuleStructureByName(module);
					if (Ext.isEmpty(moduleStructure)) {
						break;
					}
					if (moduleStructure.sectionModule) {
						tag = moduleStructure.sectionModule + "/";
					}
					if (moduleStructure.sectionSchema) {
						tag += moduleStructure.sectionSchema + "/";
					}
					break;
			}
			return tag;
		},

		/**
		 * Returns default card module.
		 * @return {String} Card module name.
		 */
		getDefaultCardModule: function() {
			return this.defaultCardModule;
		},

		/**
		 * Returns entity structure by  name.
		 * @param {String} entitySchemaName Entity schema name.
		 * @return {Object} Entity structure.
		 */
		getEntityStructureByName: function(entitySchemaName) {
			var entityStructure = this.entityStructure || {};
			return entityStructure[entitySchemaName];
		},

		/**
		 * Returns module structure.
		 * @param {String} moduleName Module name.
		 * @return {Object} Module structure.
		 */
		getModuleStructureByName: function(moduleName) {
			var moduleStructure = this.moduleStructure || {};
			return moduleStructure[moduleName];
		},

		/**
		 * Returns name of the entity schema by UId, if it was registered.
		 * @param {String} entitySchemaUId Entity schema UId.
		 * @return {String} Entity schema name.
		 */
		getEntitySchemaNameByUId: function(entitySchemaUId) {
			if (Ext.isEmpty(entitySchemaUId)) {
				return null;
			}
			var filterExpression = {"entitySchemaUId": entitySchemaUId};
			var structure = Terrasoft.where(this.moduleStructure, filterExpression);
			if (Ext.isEmpty(structure)) {
				structure = Terrasoft.where(this.entityStructure, filterExpression);
			}
			if (Ext.isEmpty(structure)) {
				return null;
			}
			return structure[0].entitySchemaName || null;
		},

		/**
		 * Returns entity name from module structure.
		 * @param {String} schemaName Schema name.
		 * @return {String} Entity name.
		 */
		getEntityNameBySchemaName: function(schemaName) {
			var entityName = "";
			if (Ext.isEmpty(schemaName)) {
				return entityName;
			}
			Terrasoft.each(this.moduleStructure, function(item) {
				if (item.cardSchema === schemaName || item.sectionSchema === schemaName) {
					entityName = item.entitySchemaName;
					return false;
				}
				Terrasoft.each(item.pages || [], function(page) {
					if (page.cardSchema === schemaName) {
						entityName = item.entitySchemaName;
						return false;
					}
				});
				if (!Ext.isEmpty(entityName)) {
					return false;
				}
			});
			return entityName;
		},

		/**
		 * Returns available pages.
		 * @param {Object} entityStructure Entity structure.
		 * @return {Object}
		 */
		getPages: function(entityStructure) {
			const pages = _.filter(entityStructure.pages, function(page) {
				return page.UId;
			});
			if (Ext.isEmpty(pages)) {
				pages.push(entityStructure.pages[0]);
			}
			return pages;
		}

	});

	return Terrasoft.ModuleUtils;

});


