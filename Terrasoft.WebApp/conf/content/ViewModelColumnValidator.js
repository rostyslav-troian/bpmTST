Terrasoft.configuration.Structures["ViewModelColumnValidator"] = {innerHierarchyStack: ["ViewModelColumnValidator"]};
define("ViewModelColumnValidator", [], function() {

	/**
	 * Validates view model columns.
	 */
	Ext.define("Terrasoft.configuration.ViewModelColumnValidator", {
		alternateClassName: "Terrasoft.ViewModelColumnValidator",
		extend: "Terrasoft.BaseObject",

		//region Methods: Public

		/**
		 * Validates two dates. If changed date is less than base date returns error message.
		 * @param {Object} viewModel View model.
		 * @param {String} changedDateColumnName Changed cate column name.
		 * @param {String} baseDateColumnName Base date column name.
		 * @param {String} errorMessageTemplate Error message template.
		 * @return {Object} Validation information.
		 */
		validateDates: function(viewModel, changedDateColumnName, baseDateColumnName, errorMessageTemplate) {
			var invalidMessage = null;
			var changedDate = viewModel.get(changedDateColumnName);
			var baseDate = viewModel.get(baseDateColumnName);
			if (changedDate && changedDate < baseDate) {
				invalidMessage = Ext.String.format(errorMessageTemplate,
					viewModel.getColumnByName(changedDateColumnName).caption,
					viewModel.getColumnByName(baseDateColumnName).caption);
			}
			return {
				invalidMessage: invalidMessage
			};
		}

		//endregion

	});
});


