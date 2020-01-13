Terrasoft.configuration.Structures["ElementDataSourceViewModel"] = {innerHierarchyStack: ["ElementDataSourceViewModel"], structureParent: "DataSourceViewModel"};
define("ElementDataSourceViewModel", [
	"ElementDataSourceViewModelResources",
	"DataSourceViewModel"
], function(resources) {
	/**
	 */
	Ext.define("Terrasoft.configuration.ElementDataSourceViewModel", {
		extend: "Terrasoft.configuration.DataSourceViewModel",
		alternateClassName: "Terrasoft.ElementDataSourceViewModel",

		resources: resources,

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.DataSourceViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.set("UId", this.get("Schema").uId);
			this.set("IsNewPageSchema", this.get("Schema").isNew());
		},

		/**
		 * @inheritdoc Terrasoft.DataSourceViewModel#getModelColumns
		 * @override
		 */
		getModelColumns: function() {
			var baseColumns = this.callParent(arguments);
			return Ext.apply(baseColumns, {
				/**
				 * @override
				 */
				Name: {value: "Elements"},
				/**
				 * @override
				 */
				IsPageElementsVisible: {value: true},
				Caption: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: resources.localizableStrings.Caption
				}
			});
		}

		// endregion

	});

	return Terrasoft.ElementDataSourceViewModel;
});


