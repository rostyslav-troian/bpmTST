Terrasoft.configuration.Structures["EntityDataSourceViewModel"] = {innerHierarchyStack: ["EntityDataSourceViewModel"], structureParent: "DataSourceViewModel"};
define("EntityDataSourceViewModel", [
	"EntityDataSourceViewModelResources",
	"DataSourceViewModel"
], function(resources) {
	/**
	 */
	Ext.define("Terrasoft.configuration.EntityDataSourceViewModel", {
		extend: "Terrasoft.configuration.DataSourceViewModel",
		alternateClassName: "Terrasoft.EntityDataSourceViewModel",

		resources: resources,

		// region Methods: Protected

		/**
		 * @protected
		 */
		onEditDataSourceClick: function() {
			var designer = this.get("Designer");
			designer.onEditDataSource(this.get("Name"));
		},

		/**
		 * @protected
		 */
		onRemoveDataSourceClick: function() {
			var designer = this.get("Designer");
			var dataModelName = this.get("Name");
			var template = designer.get("Resources.Strings.DataModelRemoveConfirmation");
			var message = Ext.String.format(template, dataModelName);
			Terrasoft.showConfirmation(message, function(returnCode) {
				if (returnCode === "yes") {
					designer.onRemoveDataSource(this.get("Name"));
				}
			}, ["no", "yes"], this);
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
				NewColumnCaptionVisible: {value: true},
				DataModelMenu: {dataValueType: Terrasoft.DataValueType.COLLECTION},
				Designer: {dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT}
			});
		}

		// endregion

	});

	return Terrasoft.EntityDataSourceViewModel;
});


