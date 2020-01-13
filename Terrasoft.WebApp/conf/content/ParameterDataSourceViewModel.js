Terrasoft.configuration.Structures["ParameterDataSourceViewModel"] = {innerHierarchyStack: ["ParameterDataSourceViewModel"], structureParent: "DataSourceViewModel"};
define("ParameterDataSourceViewModel", ["ParameterDataSourceViewModelResources", "DataSourceViewModel"], function(resources) {
	/**
	 */
	Ext.define("Terrasoft.configuration.ParameterDataSourceViewModel", {
		extend: "Terrasoft.configuration.DataSourceViewModel",
		alternateClassName: "Terrasoft.ParameterDataSourceViewModel",

		resources: resources,

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.DataSourceViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.set("UId", this.get("Schema").uId);
			this.set("CanAddNewColumn", this.get("Schema").canDesignSchema());
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
				Name: {value: "Parameters"},
				/**
				 * @override
				 */
				IsPrimary: {value: true},
				/**
				 * @override
				 */
				NewColumnCaptionVisible: {value: true},
				Caption: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: resources.localizableStrings.Caption
				}
			});
		}

		// endregion

	});

	return Terrasoft.ParameterDataSourceViewModel;
});


