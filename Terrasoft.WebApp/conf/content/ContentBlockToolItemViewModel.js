Terrasoft.configuration.Structures["ContentBlockToolItemViewModel"] = {innerHierarchyStack: ["ContentBlockToolItemViewModel"]};
define("ContentBlockToolItemViewModel", [], function() {

	/**
	 * Class for ContentBlockToolItemViewModel.
	 */
	Ext.define("Terrasoft.configuration.ContentBlockToolItemViewModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.ContentBlockToolItemViewModel",

		sandbox: null,

		columns: {
			Id: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			Caption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			Icon: {
				dataValueType: Terrasoft.DataValueType.IMAGE
			},
			Size: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			DragActionsCode: {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},

		/**
		 * Default item config.
		 * @type {Object}
		 */
		DefaultConfig: null,

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"toolDragOver",
				"toolDragDrop"
			);
		},

		/**
		 * Handler for onDragDrop event.
		 */
		onDragDrop: function() {
			this.fireEvent("toolDragDrop", this);
		},

		/**
		 * Generates event of block group drag.
		 */
		onDragOver: function(intersection) {
			const size = this.$Size;
			const position = {
				rowSpan: size.RowSpan,
				colSpan: size.ColSpan,
				row: intersection.row,
				column: intersection.column
			};
			this.fireEvent("toolDragOver", this, position);
		}

		// endregion

	});

	return Terrasoft.ContentBlockToolItemViewModel;
});


