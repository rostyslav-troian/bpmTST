Terrasoft.configuration.Structures["DcmUserTaskSchemaManager"] = {innerHierarchyStack: ["DcmUserTaskSchemaManager"]};
define("DcmUserTaskSchemaManager", ["ext-base", "terrasoft", "DcmUserTaskSchema",
	"DcmUserTaskSchemaManagerItem"], function(Ext, Terrasoft) {

	/**
	 * @class Terrasoft.manager.DcmUserTaskSchemaManager
	 */
	Ext.define("Terrasoft.manager.DcmUserTaskSchemaManager", {

		extend: "Terrasoft.BaseUserTaskSchemaManager",

		alternateClassName: "Terrasoft.DcmUserTaskSchemaManager",

		singleton: true,

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseUserTaskSchemaManager#schemaClassName
		 * @overridden
		 */
		schemaClassName: "Terrasoft.DcmUserTaskSchema",

		/**
		 * @inheritdoc Terrasoft.BaseUserTaskSchemaManager#itemClassName
		 * @overridden
		 */
		itemClassName: "Terrasoft.DcmUserTaskSchemaManagerItem",

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManager#getSelectQuery
		 * @overridden
		 */
		getSelectQuery: function() {
			var itemsQuery = this.callParent(arguments);
			var itemsQueryFilter = Terrasoft.createExistsFilter("[SysDcmUserTask:SchemaUId:UId].Id");
			itemsQuery.filters.addItem(itemsQueryFilter);
			return itemsQuery;
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchemaManager#queryItems
		 * @override
		 */
		queryItems: function(callback, scope) {
			if (Terrasoft.Features.getIsEnabled('UseDcmServerEndPoint')) {
				const request = new Terrasoft.BaseRequest({
					contractName: 'DcmUserTaskManagerRequest'
				});
				return request.execute(callback, scope);
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchemaManager#initItems
		 * @override
		 */
		initItems: function(items) {
			if (Terrasoft.Features.getIsEnabled('UseDcmServerEndPoint')) {
				this.initServiceItems(items);
			} else {
				this.callParent(arguments);
			}
		}

		//endregion

	});

	return Terrasoft.DcmUserTaskSchemaManager;

});


