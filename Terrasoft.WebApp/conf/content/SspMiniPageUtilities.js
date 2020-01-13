Terrasoft.configuration.Structures["SspMiniPageUtilities"] = {innerHierarchyStack: ["SspMiniPageUtilities"]};
define("SspMiniPageUtilities", [], function() {

	/**
	 * Contains utility methods used by mini pages for ssp users.
	 * @class Terrasoft.SspMiniPageUtilities
	 */
	Ext.define("Terrasoft.configuration.mixins.SspMiniPageUtilities", {
		alternateClassName: "Terrasoft.SspMiniPageUtilities",

		//region Properties: Private

		/**
		 * Additional minipages, that avaliable for SSP users array.
		 * @type {Array}
		 * @private
		 */
		_entitiesWithAvaliableMiniPages: null,

		//endregion

		//region Methods: Private

		/**
		 * Initializes _entitiesWithAvaliableMiniPages array.
		 * @private
		 */
		_initAvaliableMiniPages: function() {
			this._entitiesWithAvaliableMiniPages = [{
				"entityName": "Activity",
				"miniPageSchema": "ActivityMiniPage"
			}];
		},

		//endregion

		//region Methods: Protected

		/**
		 * Returns avaliable for entity minipage config.
		 * @protected
		 * @param {String} entityName Entity name.
		 * @return {Object} Avaliable for entity minipage config.
		 */
		getEntityConfig: function(entityName) {
			if (Ext.isEmpty(this._entitiesWithAvaliableMiniPages)) {
				this._initAvaliableMiniPages();
			}
			return Ext.Array.findBy(this._entitiesWithAvaliableMiniPages, function(item) {
				return item.entityName === entityName;
			}, this)
		},

		//endregion

		//region Methods: Public

		/**
		 * Returns avaliable for SSP users entity minipage schema name.
		 * @param {String} entityName Entity name.
		 * @return {String|null} Minipage schema name.
		 */
		getSspMiniPageSchemaName: function(entityName) {
			var config = this.getEntityConfig(entityName);
			if (Terrasoft.isCurrentUserSsp() && !Ext.isEmpty(config)) {
				return config.miniPageSchema;
			}
			return null;
		}

		//endregion

	});

	return Terrasoft.SspMiniPageUtilities;
}); 

