Terrasoft.configuration.Structures["PortalColumnAccessListManagerItem"] = {innerHierarchyStack: ["PortalColumnAccessListManagerItem"]};
define("PortalColumnAccessListManagerItem", ["AnalyticsManagerItem"], function() {

	/**
	 * @class Terrasoft.PortalColumnAccessListManagerItem
	 */

	Ext.define("Terrasoft.PortalColumnAccessListManagerItem", {
		extend: "Terrasoft.AnalyticsManagerItem",
		alternateClassName: "Terrasoft.PortalColumnAccessListManagerItem",

		// region Properties: Public

		/**
		 * Column entity schema instance.
		 * @type {Object}
		 */
		entitySchema: null,

		/**
		 * Entity schema column identifier.
		 * @type {String}
		 */
		columnUId: null,

		/**
		 * PortalSchemaAccessList lookup value.
		 * @type {Object}
		 */
		portalSchemaList: null,

		// endregion

		// region Methods: Public

		/**
		 * Returns related portalSchemaList identitfier.
		 * @return {String} portalSchemaList identitfier.
		 */
		getPortalSchemaListId: function() {
			var portalSchemaList = this.getPropertyValue("portalSchemaList");
			return portalSchemaList && portalSchemaList.value;
		},

		/**
		 * Sets portalSchemaList identifier.
		setPortalSchemaListId: function(portalSchemaListId) {
		 * @param {String} sysDetailId portalSchemaList identifier.
		 */
		setPortalSchemaListId: function(portalSchemaListId) {
			this.setPropertyValue("portalSchemaList", {
				value: portalSchemaListId,
				displayValue: ""
			});
		},

		/**
		 * @inheritdoc Terrasoft.AnalyticsManagerItem#getModifiedString
		 * @override
		 */
		getModifiedString: function() {
			const entitySchema = this.entitySchema;
			if (!entitySchema) {
				return Terrasoft.emptyString;
			}
			const column = entitySchema.findColumnByUId(this.columnUId);
			return (this.getIsDeleted() ? "-" : "+") + column.name;
		}

		// endregion

	});

	return Terrasoft.PortalColumnAccessListManagerItem;
});


