Terrasoft.configuration.Structures["ProcessSchemaLocalizableStringViewModel"] = {innerHierarchyStack: ["ProcessSchemaLocalizableStringViewModel"]};
define("ProcessSchemaLocalizableStringViewModel", ["ProcessSchemaLocalizableStringViewModelResources",
	"ProcessMiniEditPageMixin"
], function() {

	/**
	 * Model 'Using' for the settings page of process.
	 */
	Ext.define("Terrasoft.model.ProcessSchemaLocalizableStringViewModel", {
		extend: "Terrasoft.model.BaseModel",
		alternateClassName: "Terrasoft.ProcessSchemaLocalizableStringViewModel",

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
			"Caption": {
				"dataValueType": this.Terrasoft.DataValueType.LOCALIZABLE_STRING
			},
			"Value": {
				"dataValueType": this.Terrasoft.DataValueType.LOCALIZABLE_STRING
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
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT
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
			return "ProcessSchemaLocalizableStringMiniEditPage";
		},

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getActiveItemEditName
		 * @override
		 */
		getActiveItemEditName: function() {
			return "ProcessLocalizableStringEditName";
		},

		/**
		 * @inheritdoc Terrasoft.ProcessMiniEditPageMixin#getProcessMiniEditPageId
		 * @override
		 */
		getProcessMiniEditPageId: function() {
			return this.sandbox.id + "localizablestringedit";
		},

		/**
		 * @inheritdoc ProcessMiniEditPageMixin#getActiveItemId
		 * @overridden
		 * @returns {string}
		 */
		getActiveItemId: function () {
			return "ActiveLocalizableStringItemId";
		},

		/**
		 * @inheritdoc ProcessMiniEditPageMixin#getAddButtonEnabledProperyName
		 * @overridden
		 * @returns {string} Enabled property name.
		 */
		getAddButtonEnabledProperyName: function() {
			return "IsAddLocalizableStringButtonEnabled";
		}

		// endregion

	});

	return Terrasoft.ProcessSchemaLocalizableStringViewModel;
});


