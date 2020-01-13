Terrasoft.configuration.Structures["ParameterListMixin"] = {innerHierarchyStack: ["ParameterListMixin"]};
Ext.define("Terrasoft.configuration.mixins.ParameterListMixin", {
	alternateClassName: "Terrasoft.ParameterListMixin",

	/**
	 * Returns instance of the list item view model.
	 * @public
	 * @param {Object} parameter Parameter object.
	 * @returns {Terrasoft.BaseParameterListItemViewModel} List item view model.
	 */
	createParameterListItemViewModel: function(parameter) {
		var listItemViewModel;
		parameter.parentViewModel = this;
		parameter.sandbox = this.sandbox;
		switch (parameter.dataValueType) {
			case Terrasoft.DataValueType.BOOLEAN:
				listItemViewModel = new Terrasoft.BooleanParameterListItemViewModel(null, parameter);
				break;
			case Terrasoft.DataValueType.LOOKUP:
				listItemViewModel = new Terrasoft.LookupParameterListItemViewModel(null, parameter);
				break;
			case Terrasoft.DataValueType.DATE_TIME:
			case Terrasoft.DataValueType.DATE:
			case Terrasoft.DataValueType.TIME:
				listItemViewModel = new Terrasoft.DateTimeParameterListItemViewModel(null, parameter);
				break;
			case Terrasoft.DataValueType.TEXT:
			case Terrasoft.DataValueType.SHORT_TEXT:
			case Terrasoft.DataValueType.MEDIUM_TEXT:
			case Terrasoft.DataValueType.MAXSIZE_TEXT:
			case Terrasoft.DataValueType.LONG_TEXT:
				listItemViewModel = new Terrasoft.StringParameterListItemViewModel(null, parameter);
				break;
			default:
				listItemViewModel = new Terrasoft.BaseParameterListItemViewModel(null, parameter);
		}
		return listItemViewModel;
	}

});


