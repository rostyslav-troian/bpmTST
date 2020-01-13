Terrasoft.configuration.Structures["PredefinedFilterItemViewModel"] = {innerHierarchyStack: ["PredefinedFilterItemViewModel"]};
define("PredefinedFilterItemViewModel", [], function() {
	Ext.define("Terrasoft.configuration.PredefinedFilterItemViewModel", {
		alternateClassName: "Terrasoft.PredefinedFilterItemViewModel",
		extend: "Terrasoft.BaseViewModel",

		//region Properties: Protected

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		//endregion

		//region Properties: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		columns: {
			"ColumnPath": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
					/**
					 * @event
					 * Deleting event.
					 */
					"delete"
			);
		},

		/**
		 * Handles delete button click.
		 */
		onDeleteButtonClick: function() {
			this.fireEvent("delete", this);
		}

		//endregion
	});
});


