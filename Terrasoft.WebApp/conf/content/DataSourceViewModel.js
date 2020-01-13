Terrasoft.configuration.Structures["DataSourceViewModel"] = {innerHierarchyStack: ["DataSourceViewModel"]};
define("DataSourceViewModel", ["DataSourceViewModelResources"], function(resources) {
	/**
	 */
	Ext.define("Terrasoft.configuration.DataSourceViewModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.DataSourceViewModel",

		resources: resources,

		columns: {
			EntitySchemaUId: {dataValueType: Terrasoft.DataValueType.LOOKUP},
			Name: {dataValueType: Terrasoft.DataValueType.TEXT},
			Schema: {dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT},
			CanAddNewColumn: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				valse: false
			},
			IsPrimary: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			Collapsed: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				valueList: true
			},
			IsPageElementsVisible: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			NewColumnCaptionVisible: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},

		/**
		 * Returns data model column path.
		 * @param {String} columnName Column name.
		 * @return {String} Column path.
		 */
		getColumnPath: function(columnName) {
			return this.get("IsPrimary") ? columnName : this.get("Name") + "." + columnName;
		}

	});

	return Terrasoft.DataSourceViewModel;
});


