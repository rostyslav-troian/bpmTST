Terrasoft.configuration.Structures["OAuth20AppSection"] = {innerHierarchyStack: ["OAuth20AppSection"], structureParent: "BaseSectionV2"};
define('OAuth20AppSectionStructure', ['OAuth20AppSectionResources'], function(resources) {return {schemaUId:'561b023a-7cc3-48b4-acd7-cf88870a3cd4',schemaCaption: "Section schema: \"OAuth 2.0 applications\"", parentSchemaName: "BaseSectionV2", schemaName:'OAuth20AppSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OAuth20AppSection", ["RightUtilities", "OAuth20Utilities"], function(RightUtilities) {
	return {
		entitySchemaName: "OAuthApplications",
		attributes: {},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_canManageSolution: function(callback, scope) {
				RightUtilities.checkCanExecuteOperation({operation: "CanManageSolution"}, function(result) {
					callback.call(scope, result);
				}, this);
			},

			/**
			 * @private
			 */
			_performDeleteApplications: function(ids) {
				Terrasoft.MaskHelper.showBodyMask();
				const promiseQueue = ids.map(function(id) {
					return new Promise(this._sendRemoveRequest.bind(this, id));
				}, this);
				Promise.all(promiseQueue).then(this._onAfterRemoveCompleted.bind(this));
			},

			/**
			 * @private
			 */
			_onAfterRemoveCompleted: function() {
				Terrasoft.MaskHelper.hideBodyMask();
				this.reloadGridData();
			},

			/**
			 * @private
			 */
			_sendRemoveRequest: function(id, callback) {
				Terrasoft.AjaxProvider.request({
					url: this._getRemoveApplicationUrl(id),
					method: "POST",
					scope: this,
					callback: callback
				});
			},

			/**
			 * @private
			 */
			_getRemoveApplicationUrl: function(item) {
				return this.Terrasoft.workspaceBaseUrl +
					"/ServiceModel/ServiceOAuthAuthenticatorEndpoint.svc/RemoveOAuthApplication/" + item;
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc GridUtilitiesV2#checkCanDelete
			 * @override
			 */
			checkCanDelete: function(items, callback, scope) {
				this._canManageSolution(function(result) {
					callback.call(scope, result ? null : "RightLevelWarningMessage");
				}, this);
			},

			/**
			 * @inheritodoc BaseSectionV2#getModuleCaption
			 * @override
			 */
			getModuleCaption: function() {
				var moduleStructure = this.getModuleStructure("OAuth20App");
				return moduleStructure && moduleStructure.moduleCaption;
			},

			/**
			 * @inheritodoc BaseSectionV2#getDefaultDataViews
			 * @override
			 */
			getDefaultDataViews: function() {
				var dataViews = this.callParent(arguments);
				delete dataViews.AnalyticsDataView;
				return dataViews;
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritodoc GridUtilitiesV2#onDelete
			 * @override
			 */
			onDelete: function(returnCode) {
				if (returnCode !== this.Terrasoft.MessageBoxButtons.YES.returnCode) {
					return;
				}
				const items = this.getSelectedItems();
				this._performDeleteApplications(items);
			},

			/**
			 * Initializes section filters.
			 * @protected
			 */
			initSectionFiltersCollection: function() {
				this.callParent(arguments);
				Terrasoft.OAuth20Utilities.addCustomApplicationFilters(this.$SectionFilters);
			}

			// endregion

		}
	};
});


