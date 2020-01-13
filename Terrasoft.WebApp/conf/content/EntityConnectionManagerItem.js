Terrasoft.configuration.Structures["EntityConnectionManagerItem"] = {innerHierarchyStack: ["EntityConnectionManagerItem"]};
define("EntityConnectionManagerItem", [], function() {
	Ext.define("Terrasoft.EntityConnectionManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.EntityConnectionManagerItem",

		// region Properties: Private

		/**
		 * Entity schema unique identifier.
		 * @private
		 * @type {String}
		 */
		sysEntitySchemaUId: null,

		/**
		 * Column unique identifier.
		 * @private
		 * @type {String}
		 */
		columnUId: null,

		// endregion

		// region Methods: Public

		/**
		 * Returns entity schema unique identifier.
		 * @return {String}
		 */
		getSysEntitySchemaUId: function() {
			return this.getPropertyValue("sysEntitySchemaUId");
		},

		/**
		 * Sets entity schema unique identifier.
		 * @param {String} value Value of entity schema unique identifier.
		 */
		setSysEntitySchemaUId: function(value) {
			this.setPropertyValue("sysEntitySchemaUId", value);
		},

		/**
		 * Returns column unique identifier.
		 * @return {String}
		 */
		getColumnUId: function() {
			return this.getPropertyValue("columnUId");
		},

		/**
		 * Sets column unique identifier.
		 * @param {String} value Value of column unique identifier.
		 */
		setColumnUId: function(value) {
			this.setPropertyValue("columnUId", value);
		}

		// endregion

	});

	return Terrasoft.EntityConnectionManagerItem;
});


