Terrasoft.configuration.Structures["EntityConnectionManager"] = {innerHierarchyStack: ["EntityConnectionManager"]};
define("EntityConnectionManager", ["EntityConnectionManagerItem"], function() {
	Ext.define("Terrasoft.EntityConnectionManager", {
		extend: "Terrasoft.ObjectManager",
		alternateClassName: "Terrasoft.EntityConnectionManager",
		singleton: true,

		//region Properties: Private

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.EntityConnectionManagerItem",

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#entitySchemaName
		 * @overridden
		 */
		entitySchemaName: "EntityConnection",

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			sysEntitySchemaUId: "SysEntitySchemaUId",
			columnUId: "ColumnUId"
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManager#getPackageSchemaDataName
		 * @overridden
		 */
		getPackageSchemaDataName: function(item) {
			var itemId = item.getPropertyValue("id");
			var dataName = Ext.String.format("{0}_{1}", this.entitySchemaName, itemId.replace(/-/g, ""));
			return dataName;
		}

		// endregion

	});

	return Terrasoft.EntityConnectionManager;
});


