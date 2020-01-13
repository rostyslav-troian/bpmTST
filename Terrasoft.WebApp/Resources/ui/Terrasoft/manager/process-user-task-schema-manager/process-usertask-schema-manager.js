/**
 */
Ext.define("Terrasoft.manager.ProcessUserTaskSchemaManager", {

	extend: "Terrasoft.BaseUserTaskSchemaManager",

	alternateClassName: "Terrasoft.ProcessUserTaskSchemaManager",

	singleton: true,

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseUserTaskSchemaManager#schemaClassName
	 * @override
	 */
	schemaClassName: "Terrasoft.UserTaskSchema",

	//endregion

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#getSelectQuery
	 * @override
	 */
	getSelectQuery: function() {
		var itemsQuery = this.callParent(arguments);
		var itemsQueryFilter = Terrasoft.createExistsFilter("[SysProcessUserTask:SysUserTaskSchemaUId:UId].Id");
		itemsQuery.filters.addItem(itemsQueryFilter);
		return itemsQuery;
	}
});
