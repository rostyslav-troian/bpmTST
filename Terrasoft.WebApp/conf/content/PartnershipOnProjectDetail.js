Terrasoft.configuration.Structures["PartnershipOnProjectDetail"] = {innerHierarchyStack: ["PartnershipOnProjectDetailPRMBase", "PartnershipOnProjectDetail"], structureParent: "BaseGridDetailV2"};
define('PartnershipOnProjectDetailPRMBaseStructure', ['PartnershipOnProjectDetailPRMBaseResources'], function(resources) {return {schemaUId:'bb389668-ad04-4d3f-bf60-45dcc10a004f',schemaCaption: "Partner Projects", parentSchemaName: "BaseGridDetailV2", schemaName:'PartnershipOnProjectDetailPRMBase',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PartnershipOnProjectDetailStructure', ['PartnershipOnProjectDetailResources'], function(resources) {return {schemaUId:'bdf6005c-6f9c-4ee8-afce-50bb3b2e9955',schemaCaption: "Partner Projects", parentSchemaName: "PartnershipOnProjectDetailPRMBase", schemaName:'PartnershipOnProjectDetail',parentSchemaUId:'bb389668-ad04-4d3f-bf60-45dcc10a004f',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"PartnershipOnProjectDetailPRMBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('PartnershipOnProjectDetailPRMBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("PartnershipOnProjectDetailPRMBase", [], function() {
	return {
		entitySchemaName: "Project",
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {}
	};
});

define("PartnershipOnProjectDetail", [], function() {
	return {
		entitySchemaName: "Project",
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
			/**
			 * Checks if current user is Ssp user.
			 * //TODO SD-6008 replace to !Terrasoft.utils.common.isSspCurrentUser() after release 7.14.2
			 * @private
			 * @return {Boolean} True if type of current user is ssp, otherwise - false.
			 */
			_isSspCurrentUser: function() {
				return Terrasoft.CurrentUser.userType === Terrasoft.UserType.SSP;
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


