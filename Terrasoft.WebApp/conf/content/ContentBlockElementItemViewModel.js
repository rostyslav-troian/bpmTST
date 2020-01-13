Terrasoft.configuration.Structures["ContentBlockElementItemViewModel"] = {innerHierarchyStack: ["ContentBlockElementItemViewModel"]};
define("ContentBlockElementItemViewModel", ["ContentBlockElementItemViewModelResources"], function(resources) {

	/**
	 * Class for ContentBlockElementItemViewModel.
	 */
	Ext.define("Terrasoft.configuration.ContentBlockElementItemViewModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.ContentBlockElementItemViewModel",

		sandbox: null,

		columns: {
			Id: {
				dataValueType: Terrasoft.DataValueType.GUID
			},
			Type: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			Caption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			Icon: {
				dataValueType: Terrasoft.DataValueType.IMAGE
			},
			Row: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0
			},
			Column: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0
			},
			RowSpan: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0
			},
			ColSpan: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 0
			},
			GroupName: {
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},

		/**
		 * Initial config.
		 * @type {Object}
		 */
		InitialConfig: null,

		// region Methods: Public

		/**
		 * Returns remove button image.
		 * @return {Terrasoft.LocalizableImage}
		 */
		getRemoveButtonImage: function() {
			return resources.localizableImages.RemoveImage;
		},

		/**
		 * Returns actual block element config.
		 */
		getConfig: function() {
			return Ext.apply(this.InitialConfig, {
				ColSpan: this.$ColSpan,
				RowSpan: this.$RowSpan,
				Column: this.$Column,
				Row: this.$Row,
				ItemType: this.$Type,
				GroupName: this.$GroupName
			});
		}

		// endregion

	});

	return Terrasoft.ContentBlockElementItemViewModel;
});


