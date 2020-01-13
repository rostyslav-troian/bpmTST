define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.TestViewModel", {
		extend: "Terrasoft.BaseViewModel",
		primaryColumnName: "Id",
		columns: {
			Id: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},
			Name: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},
			Status: {
				dataValueType: Terrasoft.core.enums.DataValueType.INTEGER
			},
			ParentId: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},
			StatusCaption: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},
			Message: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},
			StackTrace: {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			}
		}
	});
	return Terrasoft.TestViewModel;
});

