Terrasoft.configuration.Structures["ProcessSchemaUsingViewModel"] = {innerHierarchyStack: ["ProcessSchemaUsingViewModel"]};
define("ProcessSchemaUsingViewModel", ["ProcessSchemaUsingViewModelResources", "ProcessMiniEditPageMixin"
], function() {

	/**
	 * Model 'Using' for the settings page of process.
	 */
	Ext.define("Terrasoft.model.ProcessSchemaUsingViewModel", {
		extend: "Terrasoft.model.BaseModel",
		alternateClassName: "Terrasoft.ProcessSchemaUsingViewModel",

		Ext: null,
		Terrasoft: null,

		mixins: {
			processMiniEditPageMixin: "Terrasoft.ProcessMiniEditPageMixin"
		},

		columns: {
			"Id": {
				"dataValueType": this.Terrasoft.DataValueType.GUID
			},
			"Name": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			},
			"Alias": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			},
			"ParameterEditToolsButtonMenu": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"value": Ext.create("Terrasoft.BaseViewModelCollection")
			},
			"Visible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": true
			},
			"MarkerValue": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			},
			/**
			 * Parent module instance.
			 */
			"ParentModule": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Indicates whether current item is editable or not.
			 */
			"IsEditable": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": true
			}
		},

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getProcessMiniEditPageName
		 * @override
		 */
		getProcessMiniEditPageName: function() {
			return "ProcessSchemaUsingMiniEditPage";
		},

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getActiveItemEditName
		 * @override
		 */
		getActiveItemEditName: function() {
			return "ProcessUsingEditName";
		},

		/**
		 * @inheritdoc ProcessMiniEditPageMixin#getActiveItemId
		 * @overridden
		 * @returns {string}
		 */
		getActiveItemId: function () {
			return "ActiveUsingItemId";
		},

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getProcessMiniEditPageId
		 * @override
		 */
		getProcessMiniEditPageId: function() {
			return this.sandbox.id + "usingedit";
		},

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getAddButtonEnabledProperyName
		 * @override
		 */
		getAddButtonEnabledProperyName: function() {
			return "IsAddUsingsButtonEnabled";
		}

		// endregion

	});

	return Terrasoft.ProcessSchemaUsingViewModel;
});


