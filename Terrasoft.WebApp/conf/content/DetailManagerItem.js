Terrasoft.configuration.Structures["DetailManagerItem"] = {innerHierarchyStack: ["DetailManagerItem"]};
define("DetailManagerItem", ["DetailManagerItemResources"], function() {

	/**
	 * @class Terrasoft.DetailManagerItem
	 * ##### ######## ######### #######.
	 */

	Ext.define("Terrasoft.DetailManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.DetailManagerItem",

		// region Properties: Private

		/**
		 * #########.
		 * @private
		 * @type {String}
		 */
		caption: null,

		/**
		 * ############# ##### ######.
		 * @private
		 * @type {String}
		 */
		detailSchemaUId: null,

		/**
		 * ############# entity ##### ######.
		 * @private
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 * ######## ##### ######.
		 * @private
		 * @type {String}
		 */
		detailSchemaName: null,

		/**
		 * ######## entity ##### ######.
		 * @private
		 * @type {String}
		 */
		entitySchemaName: null,

		// endregion

		// region Methods: Public

		/**
		 * ##### ########## ######## ######### ########.
		 * @return {String} ########## ######## #########.
		 */
		getCaption: function() {
			return this.caption;
		},

		/**
		 * ##### ########## ######## UId ##### ######.
		 * @return {String} ########## ######## UId ##### ######.
		 */
		getDetailSchemaUId: function() {
			return this.getPropertyValue("detailSchemaUId");
		},

		/**
		 * ##### ########## ######## Name ##### ######.
		 * @return {String} ########## ######## Name ##### ######.
		 */
		getDetailSchemaName: function() {
			return this.detailSchemaName;
		},

		/**
		 * ##### ########## ######## UId entity #####.
		 * @return {String} ########## ######## UId entity ##### ######.
		 */
		getEntitySchemaUId: function() {
			return this.getPropertyValue("entitySchemaUId");
		},

		/**
		 * ##### ########## ######## Name entity #####.
		 * @return {String} ########## ######## Name entity ##### ######.
		 */
		getEntitySchemaName: function() {
			return this.entitySchemaName;
		},

		/**
		 * ##### ############# ######## ### ######### ########.
		 * @param {String} caption #########.
		 */
		setCaption: function(caption) {
			this.setPropertyValue("caption", caption);
		},

		/**
		 * ##### ############# ############# ###### ### #####.
		 * @param {String} schemaUId #########.
		 */
		setDetailSchemaUId: function(schemaUId) {
			this.setPropertyValue("detailSchemaUId", schemaUId);
		},

		/**
		 * ##### ############# ############# entity ##### ######.
		 * @param {String} schemaUId #########.
		 */
		setEntitySchemaUId: function(schemaUId) {
			this.setPropertyValue("entitySchemaUId", schemaUId);
		},

		/**
		 * ########## ####### ######### #### ####### ### ############# entity-##### ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### callback-#######.
		 * @return {Terrasoft.SysModuleEntityManagerItem} ####### ######### #### ####### ### #############
		 * entity-##### ######.
		 */
		getSysModuleEntityManagerItem: function(callback, scope) {
			Terrasoft.SysModuleEntityManager.findItemsByEntitySchemaUId(this.entitySchemaUId,
					function(sysModuleEntityManagerItems) {
				callback.call(scope, sysModuleEntityManagerItems.getByIndex(0));
			}, this);
		}

		// endregion

	});

	return Terrasoft.DetailManagerItem;

});


