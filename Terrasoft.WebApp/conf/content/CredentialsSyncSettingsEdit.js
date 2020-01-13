Terrasoft.configuration.Structures["CredentialsSyncSettingsEdit"] = {innerHierarchyStack: ["CredentialsSyncSettingsEdit"], structureParent: "BaseSchemaModuleV2"};
define("CredentialsSyncSettingsEdit", ["BaseSchemaModuleV2"], function() {

	/**
	 * @class Terrasoft.configuration.CredentialsSyncSettingsEdit
	 * Sync settings tab mobule.
	 */
	Ext.define("Terrasoft.configuration.CredentialsSyncSettingsEdit", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.CredentialsSyncSettingsEdit",

		/**
		 * Value pairs fow view model default values.
		 */
		defaultValues: null,

		/**
		 * @inheritdoc Terrasoft.BaseSyncSettingsEdit#init
		 * @overridden
		 */
		init: function(callback, scope) {
			this.callParent([function() {
				this.setDefaultValues();
				callback.call(scope);
			}, this]);
		},

		/**
		 *  Set default values in view model.
		 */
		setDefaultValues: function() {
			this.Terrasoft.each(this.defaultValues, function(item) {
				this.viewModel.set(item.name, item.value);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSyncSettingsEdit#getViewConfig
		 * @overriddem
		 */
		getViewConfig: function() {
			var viewConfig = this.callParent(arguments);
			viewConfig.classes.wrapClassName = ["credantials-modal-box"];
			return viewConfig;
		}
	});

	return Terrasoft.CredentialsSyncSettingsEdit;
});


