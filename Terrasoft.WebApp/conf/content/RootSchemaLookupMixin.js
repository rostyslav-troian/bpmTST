Terrasoft.configuration.Structures["RootSchemaLookupMixin"] = {innerHierarchyStack: ["RootSchemaLookupMixin"]};
define("RootSchemaLookupMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.RootSchemaLookupMixin
	 * Profile mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.RootSchemaLookupMixin", {

		alternateClassName: "Terrasoft.RootSchemaLookupMixin",

		/**
		 * Gets schema list for target schema lookup.
		 */
		getRootSchemaList: function() {
			const schemaItems = Terrasoft.EntitySchemaManager.getItems();
			schemaItems.sort("caption", Terrasoft.OrderDirection.ASC);
			const resultConfig = {};
			schemaItems.each(function(schemaItem) {
				if (schemaItem.getExtendParent()) {
					return;
				}
				const schemaUId = schemaItem.getUId();
				resultConfig[schemaUId] = {
					value: schemaUId,
					displayValue: schemaItem.getCaption(),
					name: schemaItem.name
				};
			}, this);
			return resultConfig;
		},

		/**
		 * Setup root schema lookup.
		 */
		initializeRootSchema: function() {
			const rootSchemaUId = this.get("RootSchemaUId");
			const rootSchemaList = this.getRootSchemaList();
			const rootSchema = rootSchemaList[rootSchemaUId];
			this.set("RootSchema", rootSchema);
		},

		/**
		 * Handles changing target entity schema and sets appropriate schema UId.
		 */
		onRootSchemaChanged: function() {
			const oldRootSchemaUId = this.get("RootSchemaUId");
			const newRootSchemaUId = this.getLookupValue("RootSchema");
			if (oldRootSchemaUId !== newRootSchemaUId &&
					(!this.Ext.isEmpty(oldRootSchemaUId) || !this.Ext.isEmpty(newRootSchemaUId))) {
				this.set("RootSchemaUId", newRootSchemaUId);
			}
		},

		/**
		 * Prepares list for 'RootSchema' lookup.
		 * @param {String} filter Filter value.
		 * @param {Terrasoft.core.collections.Collection} list Lookup list.
		 */
		prepareRootSchemaList: function(filter, list) {
			if (!list) {
				return;
			}
			list.clear();
			list.loadAll(this.getRootSchemaList());
		},

		/**
		 * Returns target entity schema caption.
		 * @return {String} Target entity schema caption.
		 */
		getRootSchemaCaption: function() {
			return this.entitySchema.getColumnByName("RootSchemaUId").caption;
		}
	});

	return Terrasoft.RootSchemaLookupMixin;
});


