Terrasoft.configuration.Structures["FundDetail"] = {innerHierarchyStack: ["FundDetailPRMBase", "FundDetail"], structureParent: "BaseGridDetailV2"};
define('FundDetailPRMBaseStructure', ['FundDetailPRMBaseResources'], function(resources) {return {schemaUId:'d3ab18c6-400c-464b-8df7-daddeff31339',schemaCaption: "FundDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'FundDetailPRMBase',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('FundDetailStructure', ['FundDetailResources'], function(resources) {return {schemaUId:'9f70f657-fea7-427a-bb35-dfb8da7795bd',schemaCaption: "FundDetail", parentSchemaName: "FundDetailPRMBase", schemaName:'FundDetail',parentSchemaUId:'d3ab18c6-400c-464b-8df7-daddeff31339',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"FundDetailPRMBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('FundDetailPRMBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("FundDetailPRMBase", [],
		function() {
	return {
		entitySchemaName: "Fund",
		methods: {}
	};
});

define("FundDetail", [],
		function() {
	return {
		entitySchemaName: "Fund",
		methods: {
			/**
			 * Checks if current user is Ssp user.
			 * TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
			 * @private
			 * @return {Boolean} True if type of current user is ssp, otherwise - false.
			 */
			_isSspCurrentUser: function() {
				return Terrasoft.CurrentUser.userType === Terrasoft.UserType.SSP;
			},

			/**
			 * @inheritDoc BaseGridDetailV2#getAddRecordButtonVisible
			 * @protected
			 */
			getAddRecordButtonVisible: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return !this._isSspCurrentUser();
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetail#getQuickFilterButton
			 * @overridden
			 */
			getShowQuickFilterButton: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},
			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
			 * @overridden
			 */
			getCopyRecordMenuItem: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
			 * @overridden
			 */
			getEditRecordMenuItem: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
			 * @overridden
			 */
			getGridSortMenuItem: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
			 * @overridden
			 */
			getDeleteRecordMenuItem: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
			 * @overridden
			 */
			getSwitchGridModeMenuItem: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
			 * @overridden
			 */
			addDetailWizardMenuItems: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getExportToExcelFileMenuItem
			 * @overridden
			 */
			getExportToExcelFileMenuItem: function() {
				//TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
				return this._isSspCurrentUser() ? null : this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getRecordRightsSetupMenuItemVisible
			 * @overridden
			 */
			getRecordRightsSetupMenuItemVisible: function() {
				return this._isSspCurrentUser() ? false : this.callParent(arguments);
			}
		}
	};
});


