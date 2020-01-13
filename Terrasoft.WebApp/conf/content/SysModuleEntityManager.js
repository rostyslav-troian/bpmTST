Terrasoft.configuration.Structures["SysModuleEntityManager"] = {innerHierarchyStack: ["SysModuleEntityManager"]};
define("SysModuleEntityManager", ["SysModuleEntityManagerItem"], function() {
	/**
	 * @class Terrasoft.SysModuleEntityManager
	 * ##### ######### ##### #######.
	 */

	Ext.define("Terrasoft.SysModuleEntityManager", {
		extend: "Terrasoft.ObjectManager",
		alternateClassName: "Terrasoft.SysModuleEntityManager",
		singleton: true,

		//region Properties: Private

		/**
		 * ######## ###### ######## #########.
		 * @private
		 * {String}
		 */
		itemClassName: "Terrasoft.SysModuleEntityManagerItem",

		/**
		 * ######## #####.
		 * @private
		 * {String}
		 */
		entitySchemaName: "SysModuleEntity",

		/**
		 * ###### ############ ####### ########.
		 * @private
		 * @type {Object}
		 */
		propertyColumnNames: {
			entitySchemaUId: "SysEntitySchemaUId",
			typeColumnUId: "TypeColumnUId"
		},

		// endregion

		// region Methods: Public

		/**
		 * ########## ######### ######### ######### #### ####### ### entity-#####.
		 * @param {String} entitySchemaUId entity-#####.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### callback-#######.
		 * @return {Terrasoft.SysModuleEntityManagerItem} ######### ######### ######### #### #######
		 * entity-##### ######.
		 */
		findItemsByEntitySchemaUId: function(entitySchemaUId, callback, scope) {
			Terrasoft.chain(
				function(next) {
					this.initialize(null, next, this);
				},
				function() {
					var filteredItems = this.items.filterByFn(function(item) {
						return (item.getEntitySchemaUId() === entitySchemaUId);
					});
					callback.call(scope, filteredItems);
				},
				this
			);
		}

		// endregion

	});

	return Terrasoft.SysModuleEntityManager;

});


