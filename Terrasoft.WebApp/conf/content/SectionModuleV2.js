Terrasoft.configuration.Structures["SectionModuleV2"] = {innerHierarchyStack: ["SectionModuleV2"]};
define("SectionModuleV2", ["BaseSchemaModuleV2", "AdditionalDiffUtilities"], function() {
	/**
	 * @class Terrasoft.configuration.SectionModule
	 * ##### SectionModule ############ ### ######## ########## #######
	 */
	Ext.define("Terrasoft.configuration.SectionModule", {
		alternateClassName: "Terrasoft.SectionModule",
		extend: "Terrasoft.BaseSchemaModule",

		mixins: {
			AdditionalDiffUtilities: "Terrasoft.AdditionalDiffUtilities"
		},

		/**
		 * ####, ########### ## ##, ### ###### ## ######## ####.
		 * #### ######## false, ## ## ######## ############ CardModule
		 * @protected
		 * @type {Boolean}
		 */
		isSeparateMode: true,

		/**
		 * ######## #### ####### # #######
		 * @return {String} ######### #### #######  # #######
		 */
		getProfileKey: function() {
			var parentKey = this.callParent(arguments);
			return parentKey + "GridSettingsGridDataView";
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#prepareHistoryState
		 * @overridden
		 */
		prepareHistoryState: function() {
			var newState = this.callParent(arguments);
			delete newState.isSeparateMode;
			delete newState.schemaName;
			delete newState.entitySchemaName;
			delete newState.operation;
			delete newState.primaryColumnValue;
			delete newState.isInChain;
			return newState;
		},

		/**
		 * ########## ###### ######## ###### #############.
		 * @return {Object} ########## ###### ######## ###### #############.
		 */
		getViewModelConfig: function() {
			var viewModelConfig = this.callParent(arguments);
			Ext.merge(viewModelConfig, {
				values: {
					IsSeparateMode: this.isSeparateMode
				}
			});
			return viewModelConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @overridden
		 */
		init: function(callback, scope) {
			this.callParent([function() {
				if (this._canUseEditPagesWarmUp()) {
					var editPages = this.viewModel.get("EditPages");
					editPages.each(function(editPage) {
						var pageSchemaName = editPage.get("SchemaName");
						var entitySchemaName = this.viewModel.entitySchemaName;
						this._warmUpEditPage(pageSchemaName, entitySchemaName);
					}, this);
				}
				callback.call(scope);
			}, this]);
		},

		/**
		 * Warms the edit page up.
		 * @private
		 * @returns {Boolean} Checks if section's edit pages can be warmed up.
		 */
		_canUseEditPagesWarmUp: function() {
			return Terrasoft.Features.getIsEnabled("WarmUpEditPages") && this.viewModel.get("CanUseEditPagesWarmUp");
		},

		/**
		 * Warms the edit page up.
		 * @private
		 */
		_warmUpEditPage: function(pageSchemaName, entitySchemaName) {
			const diff = this.mixins.AdditionalDiffUtilities.getAdditionalDiff.apply(this, arguments);
			this.schemaBuilder.build({
				schemaName: pageSchemaName,
				entitySchemaName: entitySchemaName,
				profileKey: pageSchemaName,
				////TODO: CRM-42247 Remove additionalDiff property
				additionalDiff: diff
			}, Terrasoft.emptyFn, this);
		}

	});
	return Terrasoft.SectionModule;
});


