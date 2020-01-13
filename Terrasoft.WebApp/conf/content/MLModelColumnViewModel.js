Terrasoft.configuration.Structures["MLModelColumnViewModel"] = {innerHierarchyStack: ["MLModelColumnViewModel"]};
define("MLModelColumnViewModel", ["ColumnSettingsUtilities"], function(ColumnSettingsUtilities) {
	/**
	 * @class Terrasoft.configuration.MLModelColumnViewModel
	 * Ml model column view model.
	 */
	Ext.define("Terrasoft.configuration.MLModelColumnViewModel", {
		alternateClassName: "Terrasoft.MLModelColumnViewModel",
		extend: "Terrasoft.BaseViewModel",
		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * @inheritdoc Terrasoft.BaseModel#columns
		 * @override
		 */
		columns: {
			UId: {
				dataValueType: Terrasoft.DataValueType.GUID
			},
			ColumnPath: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			Caption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			SchemaCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			DataValueType: {
				dataValueType: Terrasoft.DataValueType.INTEGER
			},
			ReferenceSchemaName: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			SubFilters: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			IsBackward: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},

		/**
		 * Column settings window close handler.
		 * @param {Object} config Edited column config.
		 * @private
		 */
		_onColumnSettingsClosed: function(config) {
			if (this.$Caption !== config.title) {
				this.$Caption = config.title || this.$SchemaCaption;
			}
			this.$AggregationType = config.aggregationType;
			this.$SubFilters = config.serializedFilter;
		},

		/**
		 * Opens column settings.
		 * @return {Boolean}
		 */
		onColumnHyperlinkClick: function() {
			ColumnSettingsUtilities.Open(this.sandbox, {
				aggregationType: this.$AggregationType,
				isCaptionHidden: false,
				leftExpressionCaption: this.$Caption,
				metaCaptionPath: this.$SchemaCaption,
				isColumnTypeVisible: false,
				dataValueType: this.$DataValueType,
				isBackward: this.$IsBackward,
				referenceSchemaName: this.$ReferenceSchemaName,
				serializedFilter: this.$SubFilters || null,
				loadModuleConfig: {
					hidePageCaption: true
				}
			}, this._onColumnSettingsClosed, "centerPanel", this);
			return false;
		},

		/**
		 * Removes element from collection.
		 */
		onRemoveColumnClick: function() {
			this.parentCollection.remove(this);
		}
	});
});


