Terrasoft.configuration.Structures["ControlGridLayoutEditItemModel"] = {innerHierarchyStack: ["ControlGridLayoutEditItemModel"]};
define("ControlGridLayoutEditItemModel", ["GridLayoutEditItemModel"], function() {

	/**
	 * Class of ControlGridLayoutEditItemModel
	 */
	Ext.define("Terrasoft.configuration.ControlGridLayoutEditItemModel", {
		extend: "Terrasoft.configuration.GridLayoutEditItemModel",
		alternateClassName: "Terrasoft.ControlGridLayoutEditItemModel",

		/**
		 * The code for the available drag and drop operations.
		 * @type {Number}
		 */
		dragActionsCode: 511,

		/**
		 * Flag than indicates whether can remove item or not.
		 * @type {Boolean}
		 */
		canRemove: true,

		/**
		 * Flag than indicates whether can edit item or not.
		 * @type {Boolean}
		 */
		canEdit: false,

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getImageConfig
		 * @override
		 */
		getImageConfig: function() {
			return this.get("Resources.Images.ControlImage");
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getDragActionCode
		 * @override
		 */
		getDragActionCode: function() {
			return this.dragActionsCode;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getCaption
		 * @override
		 */
		getCaption: function() {
			return this.itemConfig.name;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getConfigurationButtonVisible
		 * @override
		 */
		getConfigurationButtonVisible: function() {
			return this.canEdit;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#getConfigurationButtonVisible
		 * @override
		 */
		getRemoveButtonVisible: function() {
			return this.canRemove;
		}

		// endregion

	});

	return Terrasoft.ControlGridLayoutEditItemModel;
});


