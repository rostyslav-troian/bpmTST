Terrasoft.configuration.Structures["EducationAndCertificateDetail"] = {innerHierarchyStack: ["EducationAndCertificateDetailPRMBase", "EducationAndCertificateDetail"], structureParent: "BaseGridDetailV2"};
define('EducationAndCertificateDetailPRMBaseStructure', ['EducationAndCertificateDetailPRMBaseResources'], function(resources) {return {schemaUId:'81fa5e7d-da72-4281-b635-c5798945c0c4',schemaCaption: "Detail schema: \"Education and certificate\"", parentSchemaName: "BaseGridDetailV2", schemaName:'EducationAndCertificateDetailPRMBase',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EducationAndCertificateDetailStructure', ['EducationAndCertificateDetailResources'], function(resources) {return {schemaUId:'57bbd308-e593-431a-9df3-7d0f2fd2a5df',schemaCaption: "Detail schema: \"Education and certificate\"", parentSchemaName: "EducationAndCertificateDetailPRMBase", schemaName:'EducationAndCertificateDetail',parentSchemaUId:'81fa5e7d-da72-4281-b635-c5798945c0c4',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EducationAndCertificateDetailPRMBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EducationAndCertificateDetailPRMBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EducationAndCertificateDetailPRMBase", [], function() {
	return {
		entitySchemaName: "EducationActivity",
		attributes: {
			/**
			 * Flag pressing buttons filtration.
			 */
			IsFiltrationButtonPressed: {dataValueType: Terrasoft.DataValueType.BOOLEAN}
		},
		diff: /**SCHEMA_DIFF*/[
			// Add filter button FiltrationButton for filtration by EducationAndCertificate
			{
				"operation": "insert",
				"name": "FiltrationButton",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": {"bindTo": "Resources.Strings.FiltrationButtonCaption"},
					"pressed": {"bindTo": "IsFiltrationButtonPressed"},
					"click": {"bindTo": "onFiltrationButtonClick"},
					"hint": {"bindTo": "getFiltrationButtonHint"}
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			/**
			 * Returns filtration button hint text.
			 * @protected
			 * @return {String} Hint text.
			 */
			getFiltrationButtonHint: function() {
				return this.get("Resources.Strings.FiltrationButtonHint");
			},

			/**
			 * Handler on click filtration button.
			 * Sets attribute that filtration button pressed, save current value to the profile
			 * and reload detail data.
			 * @protected
			 */
			onFiltrationButtonClick: function() {
				var isFiltrationButtonPressed = !this.get("IsFiltrationButtonPressed");
				var profile = this.getProfile();
				var key = this.getProfileKey();
				if (this.isNotEmpty(profile) && this.isNotEmpty(key)) {
					profile.IsFiltrationButtonPressed = isFiltrationButtonPressed;
					this.set(this.getProfileColumnName(), profile);
					this.Terrasoft.utils.saveUserProfile(key, profile, false);
				}
				this.set("IsFiltrationButtonPressed", isFiltrationButtonPressed);
				this.reloadGridData();
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilters
			 * @overridden
			 */
			getFilters: function() {
				var filterGroup = this.callParent(arguments);
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
				var isFiltrationButtonPressed = this.get("IsFiltrationButtonPressed");
				if (isFiltrationButtonPressed) {
					filterGroup.add("IssueDateFilter",
						Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.LESS_OR_EQUAL, "=[Certificate:EducationActivity:Id].IssueDate",
							new Date()));
					filterGroup.add("ExpireDateFilter",
						Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.GREATER_OR_EQUAL, "=[Certificate:EducationActivity:Id].ExpireDate",
							new Date()));
				}
				return filterGroup;
			}
		}
	};
});

define("EducationAndCertificateDetail", [], function() {
	return {
		entitySchemaName: "EducationActivity",
		attributes: {},
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
			}
		}
	};
});


