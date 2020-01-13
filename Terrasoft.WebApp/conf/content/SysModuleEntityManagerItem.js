Terrasoft.configuration.Structures["SysModuleEntityManagerItem"] = {innerHierarchyStack: ["SysModuleEntityManagerItem"]};
define("SysModuleEntityManagerItem", ["SysModuleEntityManagerItemResources"], function() {

	/**
	 * @class Terrasoft.SysModuleEntityManagerItem
	 * ##### ######## ######### ##### #######.
	 */

	Ext.define("Terrasoft.SysModuleEntityManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.SysModuleEntityManagerItem",

		// region Properties: Private

		/**
		 * ############# ####### ####.
		 * @private
		 * @type {String}
		 */
		typeColumnUId: null,

		/**
		 * ############# entity #####.
		 * @private
		 * @type {String}
		 */
		entitySchemaUId: null,

		// endregion

		// region Methods: Public

		/**
		 * ##### ########## ######## ############## entity #####.
		 * @return {String} ########## ######## ############## entity #####.
		 */
		getEntitySchemaUId: function() {
			return this.getPropertyValue("entitySchemaUId");
		},

		/**
		 * ##### ############# ######## ############## entity #####.
		 * @param {String} value ############## entity #####.
		 */
		setEntitySchemaUId: function(value) {
			this.setPropertyValue("entitySchemaUId", value);
		},

		/**
		 * ########## ######### ######### ######### ####### #### ####### ### ##### #######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### callback-#######.
		 * @return {Terrasoft.Collection} ######### ######### ######### ####### #### ####### ### ##### #######.
		 */
		getSysModuleEditManagerItems: function(callback, scope) {
			Terrasoft.chain(
				function(next) {
					Terrasoft.SysModuleEditManager.initialize(next, this);
				},
				function() {
					var sysModuleEntityId = this.id;
					var sysModuleEditItems = Terrasoft.SysModuleEditManager.getItems();
					var sysModuleEditManagerItems = sysModuleEditItems.filterByFn(function(item) {
						return (item.getSysModuleEntityId() === sysModuleEntityId);
					});
					Ext.callback(callback, scope, [sysModuleEditManagerItems]);
				}, this
			);
		},

		/**
		 * ##### ########## ######## ############## ####### ####.
		 * @return {String} ########## ######## ############## ####### ####.
		 */
		getTypeColumnUId: function() {
			return this.getPropertyValue("typeColumnUId");
		},

		/**
		 * ##### ############# ######## ############## ####### ####.
		 * @param {String} value ######## ############## ####### ####.
		 */
		setTypeColumnUId: function(value) {
			this.setPropertyValue("typeColumnUId", value);
		}

		// endregion

	});

	return Terrasoft.SysModuleEntityManagerItem;

});


