Terrasoft.configuration.Structures["SystemDesigner"] = {innerHierarchyStack: ["SystemDesignerUIv2", "SystemDesignerTranslation", "SystemDesignerServiceDesigner", "SystemDesignerLDAP", "SystemDesignerFileImport", "SystemDesignerExternalAccess", "SystemDesignerDeduplication", "SystemDesignerBaseScoring", "SystemDesignerML", "SystemDesignerSSP", "SystemDesignerWebLeadForm", "SystemDesignerOpportunityManagement", "SystemDesignerMarketingCampaign", "SystemDesigner"], structureParent: "BaseIntroPageSchema"};
define('SystemDesignerUIv2Structure', ['SystemDesignerUIv2Resources'], function(resources) {return {schemaUId:'30eb596d-9981-4116-ac6c-daf1060716f4',schemaCaption: "System designer", parentSchemaName: "BaseIntroPageSchema", schemaName:'SystemDesignerUIv2',parentSchemaUId:'965b3e29-c42b-456f-90e0-8733809d280d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerTranslationStructure', ['SystemDesignerTranslationResources'], function(resources) {return {schemaUId:'950c13aa-077b-4d1d-8b9f-47bd8e213723',schemaCaption: "System designer", parentSchemaName: "SystemDesignerUIv2", schemaName:'SystemDesignerTranslation',parentSchemaUId:'30eb596d-9981-4116-ac6c-daf1060716f4',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerServiceDesignerStructure', ['SystemDesignerServiceDesignerResources'], function(resources) {return {schemaUId:'d9634639-aca8-4351-a2a0-b3c4758bbcbf',schemaCaption: "System designer", parentSchemaName: "SystemDesignerTranslation", schemaName:'SystemDesignerServiceDesigner',parentSchemaUId:'950c13aa-077b-4d1d-8b9f-47bd8e213723',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerTranslation",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerLDAPStructure', ['SystemDesignerLDAPResources'], function(resources) {return {schemaUId:'1e694281-5b23-45c1-9422-c34faa885082',schemaCaption: "System designer", parentSchemaName: "SystemDesignerServiceDesigner", schemaName:'SystemDesignerLDAP',parentSchemaUId:'d9634639-aca8-4351-a2a0-b3c4758bbcbf',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerServiceDesigner",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerFileImportStructure', ['SystemDesignerFileImportResources'], function(resources) {return {schemaUId:'98667539-51d5-4c1e-80bb-098c4a8f7232',schemaCaption: "System designer", parentSchemaName: "SystemDesignerLDAP", schemaName:'SystemDesignerFileImport',parentSchemaUId:'1e694281-5b23-45c1-9422-c34faa885082',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerLDAP",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerExternalAccessStructure', ['SystemDesignerExternalAccessResources'], function(resources) {return {schemaUId:'bcb69f35-4041-4c1c-adf3-16b72b204bdb',schemaCaption: "System designer", parentSchemaName: "SystemDesignerFileImport", schemaName:'SystemDesignerExternalAccess',parentSchemaUId:'98667539-51d5-4c1e-80bb-098c4a8f7232',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerFileImport",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerDeduplicationStructure', ['SystemDesignerDeduplicationResources'], function(resources) {return {schemaUId:'2ec9dbf8-029c-4b47-8657-2d89ff515be5',schemaCaption: "System designer", parentSchemaName: "SystemDesignerExternalAccess", schemaName:'SystemDesignerDeduplication',parentSchemaUId:'bcb69f35-4041-4c1c-adf3-16b72b204bdb',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerExternalAccess",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerBaseScoringStructure', ['SystemDesignerBaseScoringResources'], function(resources) {return {schemaUId:'4eecdcfe-e5ee-4f79-b3ed-cece5b68f123',schemaCaption: "System designer", parentSchemaName: "SystemDesignerDeduplication", schemaName:'SystemDesignerBaseScoring',parentSchemaUId:'2ec9dbf8-029c-4b47-8657-2d89ff515be5',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerDeduplication",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerMLStructure', ['SystemDesignerMLResources'], function(resources) {return {schemaUId:'87338fbe-efa6-4636-a17a-2b97325737bd',schemaCaption: "System designer", parentSchemaName: "SystemDesignerBaseScoring", schemaName:'SystemDesignerML',parentSchemaUId:'4eecdcfe-e5ee-4f79-b3ed-cece5b68f123',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerBaseScoring",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerSSPStructure', ['SystemDesignerSSPResources'], function(resources) {return {schemaUId:'5d348ab7-7dfe-4928-80d5-ca4646095647',schemaCaption: "System designer", parentSchemaName: "SystemDesignerML", schemaName:'SystemDesignerSSP',parentSchemaUId:'87338fbe-efa6-4636-a17a-2b97325737bd',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerML",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerWebLeadFormStructure', ['SystemDesignerWebLeadFormResources'], function(resources) {return {schemaUId:'57eefddc-01c6-4825-bea3-0c2bbd5e636d',schemaCaption: "System designer", parentSchemaName: "SystemDesignerSSP", schemaName:'SystemDesignerWebLeadForm',parentSchemaUId:'5d348ab7-7dfe-4928-80d5-ca4646095647',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerSSP",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerOpportunityManagementStructure', ['SystemDesignerOpportunityManagementResources'], function(resources) {return {schemaUId:'fbf9fc1c-cfdf-4baa-97d5-ab2179b9f4c0',schemaCaption: "System designer", parentSchemaName: "SystemDesignerWebLeadForm", schemaName:'SystemDesignerOpportunityManagement',parentSchemaUId:'57eefddc-01c6-4825-bea3-0c2bbd5e636d',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerWebLeadForm",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerMarketingCampaignStructure', ['SystemDesignerMarketingCampaignResources'], function(resources) {return {schemaUId:'1891cb3f-37c1-4112-9651-3a82a86fcc9d',schemaCaption: "System designer", parentSchemaName: "SystemDesignerOpportunityManagement", schemaName:'SystemDesignerMarketingCampaign',parentSchemaUId:'fbf9fc1c-cfdf-4baa-97d5-ab2179b9f4c0',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerOpportunityManagement",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerStructure', ['SystemDesignerResources'], function(resources) {return {schemaUId:'bac5ed24-2404-448e-8a00-4e7f21012fad',schemaCaption: "System designer", parentSchemaName: "SystemDesignerMarketingCampaign", schemaName:'SystemDesigner',parentSchemaUId:'1891cb3f-37c1-4112-9651-3a82a86fcc9d',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SystemDesignerMarketingCampaign",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SystemDesignerUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerUIv2", ["SystemDesignerResources", "RightUtilities", "PackageHelper",
	"ConfigurationConstants", "ConfigurationEnums", "ServiceHelper", "ProcessModuleUtilities", "ChangeLogUtilities",
	"WizardUtilities", "SystemOperationsPermissionsMixin"
], function(resources, RightUtilities, PackageHelper, ConfigurationConstants, ConfigurationEnums, ServiceHelper,
		ProcessUtilities, ChangeLogUtilities) {
	return {
		mixins: {
			WizardUtilities: "Terrasoft.WizardUtilities",
			SystemOperationsPermissionsMixin: "Terrasoft.SystemOperationsPermissionsMixin"
		},
		attributes: {
			"CanManageProcessDesign": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanViewSysOperationAudit": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanImportFromExcel": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"WindowHeight": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 300
			},

			"WindowWidth": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 600
			},

			"IsSectionDesignerAvailable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanAccessConfigurationSettings": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanManageWorkplaces": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanManageLogo": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanManageSectionPanelColorSettings": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Parameter contains information about the availability of the partition directories to the current user.
			 */
			"CanManageChangeLog": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Parameter contains information about the availability change log management for the current user.
			 */
			"CanManageAdministration": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanManageReports": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanManageMobileApplication": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			"CanManageUsers": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * A sign to access the system configuration.
			 */
			"CanManageSolution": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * The parameter containing the information about the availability of the partition directories to the current user.
			 */
			"CanManageLookup": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Selected package name.
			 */
			"SelectedPackage": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: ""
			},

			/**
			 * Flag install extension visible.
			 */
			"IsInstallExtensionsVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * Flag that indicates usage feature "InstalledApp"
			 */
			"UseFeatureInstalledApp": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * @override
			 */
			"IsMobilePannerVisible": {
				value: false
			},

			/**
			 * @override
			 */
			"IsSdkPanelVisible": {
				value: true
			},

			/**
			 * @override
			 */
			"IsSocialAccountsPanelVisible": {
				value: false
			}

		},
		methods: {

			//region Methods: Private

			/**
			 * Returns features page visible flag.
			 * @private
			 * @return {Boolean}
			 */
			getIsFeaturesPageVisible: function() {
				return Terrasoft.isDebug && Terrasoft.SysValue.CURRENT_MAINTAINER.value === "Terrasoft";
			},

			/**
			 * Opens features page.
			 * @private
			 */
			openFeaturesPage: function() {
				const featuresPageUrl = Terrasoft.workspaceBaseUrl + "/Nui/ViewModule.aspx#Features";
				window.open(featuresPageUrl);
				return false;
			},

			/**
			 * Opens package market page.
			 * @private
			 */
			openPackageMarket: function() {
				const packageMarketUrl = Terrasoft.workspaceBaseUrl + "/NUI/ViewModule.aspx?vm=PackageMarketModule";
				window.open(packageMarketUrl);
				return false;
			},

			/**
			 * Returns package market visible flag.
			 * @private
			 * @return {Boolean} Package market visible flag.
			 */
			getPackageMarketVisible: function() {
				return this.getIsFeatureEnabled("PackageMarket");
			},

			/**
			 * @private
			 */
			getNewReportSetupVisible: function() {
				return this.getIsFeatureEnabled("NewReportUI");
			},

			/**
			 * Returns change log visible flag.
			 * @private
			 * @return {Boolean} Change log visible flag.
			 */
			getChangeLogVisible: function() {
				return this.getIsFeatureEnabled("NewChangeLogUI");
			},

			/**
			 * Initialize section designer rights.
			 * @private
			 */
			onStartSectionDesignerClick: function() {
				if (this.get("IsSectionDesignerAvailable") == null) {
					this.getIsSectionDesignerAvailable(function() {
						this.startSectionDesigner();
					}, this);
				} else {
					this.startSectionDesigner();
				}
				return false;
			},

			/**
			 * Initialize advanced settings rights.
			 * @private
			 */
			onNavigateToConfigurationSettingsClick: function() {
				if (this.get("CanAccessConfigurationSettings") == null) {
					ServiceHelper.callService("MainMenuService", "GetCanAccessConfigurationSettings", function(response) {
						if (response) {
							const result = response.GetCanAccessConfigurationSettingsResult;
							const value = result && Ext.isBoolean(result);
							this.set("CanAccessConfigurationSettings", Boolean(value));
							this.navigateToConfigurationSettings();
						}
					}, {}, this);
				} else {
					this.navigateToConfigurationSettings();
				}
				return false;
			},

			/**
			 * Checks the rights to change operation settings.
			 * @private
			 * @param {Object} options Check parameters right.
			 * @param {String} options.operationName Operation code whose rights we want to check.
			 * @param {Function} options.callback The callback function after getting the value right.
			 */
			checkRights: function(options) {
				const operation = options.operationName;
				const callback = options.callback;
				const currentRights = this.get(operation);
				if (currentRights != null) {
					callback.call(this, currentRights);
				}
				RightUtilities.checkCanExecuteOperation({operation: operation}, function(result) {
					this.set(operation, result);
					callback.call(this, result);
				}, this);
			},

			/**
			 * ######### ###### #########.
			 * @private
			 */
			navigateToSectionPanelSettingsSection: function() {
				this.sandbox.requireModuleDescriptors(["SysSectionPanelSettingsModule"], function() {
					this.sandbox.publish("PushHistoryState", {hash: "SysSectionPanelSettingsModule"});
				}, this);
			},

			/**
			 * ######### ###### "########## ########" ### ########## ######### # ######.
			 * @private
			 */
			navigateToProcessLibSection: function() {
				this.openSection("VwProcessLibSection");
			},

			/**
			 * ######### ###### "###### ########" ### ########## ######### # ######.
			 * @private
			 */
			navigateToProcessLogSection: function() {
				this.openSection("SysProcessLogSectionV2");
			},

			/**
			 * Opens process designer.
			 * @private
			 */
			navigateToProcessDesigner: function() {
				ProcessUtilities.showProcessSchemaDesigner();
			},

			/**
			 * Opens page wizard.
			 * @private
			 */
			navigateToPageWizard: function() {
				ProcessUtilities.showPageTemplateLookup();
			},

			/**
			 * ######### ###### "###### ######" ### ########## ######### # ######.
			 * @private
			 */
			navigateToSysOperationAuditSection: function() {
				this.openSection("SysOperationAuditSectionV2");
			},

			/**
			 * ######### #### ####### ###### ## Excel.
			 * @private
			 */
			navigateToImportFromExcel: function() {
				const url = Terrasoft.workspaceBaseUrl + ConfigurationConstants.ApplicationPage.ExcelImport;
				const windowFeatures = "height=" + this.get("WindowHeight") + ",width=" + this.get("WindowWidth");
				window.open(url, "_blank", windowFeatures);
			},

			/**
			 * ######### ######## ########## ##########.
			 * @private
			 */
			navigateToMobileAppDesignerSection: function() {
				Terrasoft.chain(
					function(next) {
						require(["SectionDesignerUtils"], next);
					},
					function(next, module) {
						module.getCurrentPackageUId(next);
					},
					function(next, result) {
						if (result) {
							this.showBodyMask();
							next();
						}
					},
					function() {
						const newHash = Terrasoft.combinePath("SectionModuleV2", "SysMobileWorkplaceSection");
						this.sandbox.publish("PushHistoryState", {hash: newHash});
					},
					this
				);
			},

			/**
			 * Check available and open section designer.
			 * @private
			 */
			startSectionDesigner: function() {
				if (this.getCanDesignWizard()) {
					this.openSectionWindow("New");
				} else {
					this.showPermissionsErrorMessage("CanManageSolution");
				}
			},

			/**
			 * ######### ###### ####### ### ########## ######### # ######.
			 * @private
			 */
			startDetailWizard: function() {
				this.mixins.WizardUtilities.openDetailWindow("New");
			},

			/**
			 * ######### ####### ###### Platform # ####### #### ### ####### # ####.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ########.
			 */
			getIsSectionDesignerAvailable: function(callback, scope) {
				PackageHelper.getIsPackageInstalled(ConfigurationConstants.PackageUId.Platform, function(isPackageInstalled) {
					if (isPackageInstalled) {
						require(["SectionDesignerUtils"], function(module) {
							module.getCanUseSectionDesigner(function(result) {
								this.set("IsSectionDesignerAvailable", result.canUseSectionDesigner);
								callback.call(scope);
							}.bind(this));
						}.bind(this));
					} else {
						this.set("IsSectionDesignerAvailable", false);
						callback.call(scope);
					}
				}, this);
			},

			/**
			 * ######### ########## ############# ### ########## ######### # ######.
			 * @private
			 */
			navigateToConfigurationSettings: function() {
				if (this.get("CanAccessConfigurationSettings") === true) {
					window.open("../ViewPage.aspx?Id=5e5f9a9e-aa7d-407d-9e1e-1c24c3f9b59a");
				} else {
					this.showPermissionsErrorMessage("CanManageSolution");
				}
			},

			/**
			 * ######### ###### ######### ####### #### ### ########## ######### # ######.
			 * @private
			 */
			navigateToSysWorkPlaceSection: function() {
				this.showBodyMask();
				this.openSection("SysWorkplaceSectionV2");
			},

			/**
			 * ######### ###### ######### ############# ######### ### ########## ######### ## ######.
			 * @private
			 */
			navigateToSysLogoSettings: function() {
				this.sandbox.publish("PushHistoryState", {
					hash: "SysLogoSettingsModule"
				});
			},

			/**
			 * @private
			 */
			navigateToReportSetup: function() {
				const url = Terrasoft.workspaceBaseUrl + "/ClientApp/#/Printables";
				window.open(url, "_blank");
			},

			/**
			 * ######### #### ################# #### ########.
			 * @private
			 */
			navigateToObjectRightsManagement: function() {
				let url = Terrasoft.workspaceBaseUrl;
				url += this.getIsFeatureEnabled("NewRightsManagementUI")
					? "/ClientApp/"
					: ConfigurationConstants.ApplicationPage.ObjectRightsManagement;
				window.open(url, "_blank");
			},

			/**
			 * Open change log managment window.
			 * @private
			 */
			navigateToChangeLogManagement: function() {
				if (this.getIsFeatureEnabled("NewChangeLogUI")) {
					ChangeLogUtilities.openChangeLogSettings();
				}
			},

			/**
			 * ######### ############# ############### #### # ####### ################# #############.
			 * @private
			 */
			navigateToOrgRoles: function() {
				this.goToSysAdminUnitSection("SysAdminUnitPageV2");
			},

			/**
			 * ######### ############# ############## #### # ####### ################# #############.
			 * @private
			 */
			navigateToFuncRoles: function() {
				this.goToSysAdminUnitSection("SysAdminUnitFuncRolePageV2");
			},

			/**
			 * ######### ####### # ###### SysAdminUnitSection.
			 * @private
			 * @param {String} pageName ######## ######## ##############, ####### ##### ####### ### ######## # ######.
			 */
			goToSysAdminUnitSection: function(pageName) {
				const primaryId = ConfigurationConstants.SysAdminUnit.Id.AllEmployees;
				this.sandbox.publish("PushHistoryState", {
					hash: Terrasoft.combinePath("SectionModuleV2", "SysAdminUnitSectionV2",
						pageName, ConfigurationEnums.CardState.Edit, primaryId),
					stateObj: {
						module: "SectionModuleV2",
						operation: ConfigurationEnums.CardState.Edit,
						primaryColumnValue: primaryId,
						schemas: [
							this.name,
							pageName
						],
						workAreaMode: ConfigurationEnums.WorkAreaMode.COMBINED,
						moduleId: this.sandbox.id,
						skipCardHistoryStateActualization: true
					}
				});
			},

			/**
			 * ######### ############# ############ # ####### ################# #############.
			 * @private
			 */
			navigateToUsers: function() {
				this.openSection("UsersSectionV2");
			},

			/**
			 * ######### ###### ########### ####### ########.
			 * @private
			 */
			navigateToSysAdminOperationSection: function() {
				this.openSection("SysAdminOperationSectionV2");
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initUserOperationsRights(function() {
						this.setPackageZipFileStorageFeatureParameter();
						this.setDefaultParameters();
						this.set("ProductEdition", "BPMS");
						Ext.callback(callback, scope);
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this.hideBodyMask();
			},

			/**
			 * @inheritdoc Terrasoft.configuration.mixins.WizardUtilities#getCanDesignWizard
			 * @override
			 */
			getCanDesignWizard: function() {
				return this.get("IsSectionDesignerAvailable");
			},

			/**
			 * ########## ###### ######## ######## # ######## ####.
			 * @protected
			 * @return {Object} ###### ########.
			 */
			getOperationRightsDecoupling: function() {
				let navigateToSysSettingsOperationName = "CanManageSysSettings";
				if (Terrasoft.Features.getIsEnabled("UseCanManageAdministrationForSysSettings") === true) {
					navigateToSysSettingsOperationName = "CanManageAdministration";
				}
				return {
					"navigateToProcessLibSection": "CanManageProcessDesign",
					"navigateToProcessLogSection": "CanManageProcessLogSection",
					"navigateToProcessDesigner": "CanManageProcessDesign",
					"navigateToPageWizard": "CanManageProcessDesign",
					"navigateToOrgRoles": "CanManageUsers",
					"navigateToFuncRoles": "CanManageUsers",
					"navigateToUsers": "CanManageUsers",
					"navigateToSysOperationAuditSection": "CanViewSysOperationAudit",
					"navigateToImportFromExcel": "CanImportFromExcel",
					"navigateToSysWorkPlaceSection": "CanManageWorkplaceSettings",
					"navigateToSysLogoSettings": "CanManageLogo",
					"startDetailWizard": "CanManageSolution",
					"navigateToObjectRightsManagement": "CanManageAdministration",
					"navigateToReportSetup": "CanManageReports",
					"navigateToSysAdminOperationSection": "CanManageAdministration",
					"navigateToMobileAppDesignerSection": "CanManageMobileApplication",
					"navigateToSectionPanelSettingsSection": "CanManageSectionPanelColorSettings",
					"navigateToSysSettings": navigateToSysSettingsOperationName,
					"navigateToLookupSection": "CanManageLookups",
					"navigateToInstalledApp": "CanManageSolution",
					"navigateToChangeLogManagement": "CanManageChangeLog"
				};
			},

			/**
			 * ############## ###### ########## ############ ## ### ############ ########.
			 * @protected
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ###### ######### ####### ######### ######.
			 */
			initUserOperationsRights: function(callback, scope) {
				const getOperationRightsDecoupling = this.getOperationRightsDecoupling();
				const operationRightsNames = Ext.Object.getValues(getOperationRightsDecoupling);
				const uniqueOperationNames = [];
				Terrasoft.each(operationRightsNames, function(operationName) {
					if (uniqueOperationNames.indexOf(operationName) < 0) {
						uniqueOperationNames.push(operationName);
					}
				}, this);
				if (uniqueOperationNames.indexOf("CanViewConfiguration") < 0) {
					uniqueOperationNames.push("CanViewConfiguration");
				}
				RightUtilities.checkCanExecuteOperations(uniqueOperationNames, function(result) {
					Terrasoft.each(result, function(operationRight, operationName) {
						this.set(operationName, operationRight);
					}, this);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * ######### ########## ######## # ######### #### ## ###. #### #### ###, ####### #########.
			 * @protected
			 * @return {boolean} ########## false ### ########### ######### ####### ####### ## ######.
			 */
			invokeOperation: function() {
				const operationName = arguments[1] || arguments[0];
				const operationRightsDecoupling = this.getOperationRightsDecoupling();
				const rightsName = operationRightsDecoupling[operationName];
				if (!Ext.isEmpty(rightsName) && !this.get(rightsName) && !this.get("CanViewConfiguration")) {
					this.showPermissionsErrorMessage(rightsName);
				} else {
					const operation = this[operationName];
					if (!Ext.isEmpty(operation) && Ext.isFunction(operation)) {
						operation.call(this);
					}
				}
				return false;
			},

			/**
			 * Opens section using section schema name.
			 * @protected
			 * @param {String} sectionSchemaName Section schema name.
			 */
			openSection: function(sectionSchemaName) {
				this.sandbox.publish("PushHistoryState", {
					hash: "SectionModuleV2/" + sectionSchemaName
				});
			},

			/**
			 * ######### ####### # ###### ############.
			 * @protected
			 */
			navigateToSysSettings: function() {
				this.openSection("SysSettingsSection");
			},

			/**
			 * ######### ####### # ###### ############.
			 * @protected
			 */
			navigateToLookupSection: function() {
				const lookupModuleStructure = Terrasoft.configuration.ModuleStructure.Lookup;
				if (lookupModuleStructure) {
					const newHash = Terrasoft.combinePath(lookupModuleStructure.sectionModule,
						lookupModuleStructure.sectionSchema);
					this.sandbox.publish("PushHistoryState", {hash: newHash});
				}
			},

			/**
			 * Sets value of the parameters.
			 * @protected
			 */
			setDefaultParameters: Terrasoft.emptyFn,

			/**
			 * Opens installed application page.
			 * @protected
			 */
			navigateToInstalledApp: function() {
				this.openSection("InstalledAppSection");
			},

			//endregion

			//region Methods: deprecated

			/**
			 * @deprecated
			 */
			defineExistentConfigurationPackage: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			initInstallPackages: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			getInstallPackages: function() {
				return [];
			},

			/**
			 * @deprecated
			 */
			getInstallPackagesConfig: function() {
				return {};
			},

			/**
			 * @deprecated
			 */
			setExistentConfigurationPackage: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			setPackageZipFileStorageFeatureParameter: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			loadExistentConfigurationPackage: function(installPackages, callback, scope) {
				callback.call(scope);
			},

			/**
			 * @deprecated
			 */
			updatePropertyExistentPackages: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			createExistentConfigurationPackageSelect: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			setExistentConfigurationPackageFilters: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			initParametersEvent: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			initLinkCaption: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			onInstallPackageClick: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			setSelectedPackage: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			onConfirm: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			installPackage: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			getSelectedPackage: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			responseInstallFromStorageHandler: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			responseServiceHandler: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			getSysSettingPackageUrlName: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			onFilesSelected: Terrasoft.emptyFn

			//endregion
		},
		diff: [
			{
				"operation": "merge",
				"name": "MainContainer",
				"values": {
					"markerValue": "system-designer-page"
				}
			},
			{
				"operation": "insert",
				"name": "ProcessTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.ProcessCaption"},
					"cls": ["process", "designer-tile"],
					"icon": resources.localizableImages.ProcessIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ProcessTile",
				"name": "ProcessDesigner",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ProcessDesignerLinkCaption"},
					"tag": "navigateToProcessDesigner",
					"click": {"bindTo": "invokeOperation"},
					"visible": Terrasoft.isDebug || Terrasoft.Features.getIsEnabled("GoToProcessDesigner")
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ProcessTile",
				"name": "PageWizard",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.PageWizardLinkCaption"},
					"tag": "navigateToPageWizard",
					"click": {"bindTo": "invokeOperation"},
					"visible": Terrasoft.isDebug || Terrasoft.Features.getIsEnabled("GoToProcessDesigner")
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ProcessTile",
				"name": "ProcessLibrary",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ProcessLibraryLinkCaption"},
					"tag": "navigateToProcessLibSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ProcessTile",
				"name": "ProcessLog",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ProcessLogLinkCaption"},
					"tag": "navigateToProcessLogSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"name": "UsersTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.UsersCaption"},
					"cls": ["sales-tile", "designer-tile"],
					"icon": resources.localizableImages.UsersIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "Users",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.UsersLinkCaption"},
					"tag": "navigateToUsers",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "OrgRoles",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.OrgRolesLinkCaption"},
					"tag": "navigateToOrgRoles",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "FuncRoles",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.FuncRolesLinkCaption"},
					"tag": "navigateToFuncRoles",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "ObjectRightsManagement",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ObjectRightsManagementLinkCaption"},
					"tag": "navigateToObjectRightsManagement",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "OperationRightsManagement",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.OperationRightsManagementLinkCaption"},
					"tag": "navigateToSysAdminOperationSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "AuditLog",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.AuditLogLinkCaption"},
					"tag": "navigateToSysOperationAuditSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "ChangeLog",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ChangeLogLinkCaption"},
					"tag": "navigateToChangeLogManagement",
					"click": {"bindTo": "invokeOperation"},
					"visible": {"bindTo": "getChangeLogVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "IntegrationTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.IntegrationCaption"},
					"cls": ["settings", "designer-tile"],
					"icon": resources.localizableImages.IntegrationIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "IntegrationTile",
				"name": "ExcelImport",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ExcelImportLinkCaption"},
					"tag": "navigateToImportFromExcel",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"name": "InstallExtensionsTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.ApplicationsCaption"},
					"cls": ["extensions", "designer-tile"],
					"icon": resources.localizableImages.InstallExtensionsIcon,
					"visible": {"bindTo": "IsInstallExtensionsVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "InstallExtensionsTile",
				"name": "InstalledAppLink",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.InstalledAppCaption"},
					"visible": {"bindTo": "UseFeatureInstalledApp"},
					"tag": "navigateToInstalledApp",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"name": "SystemSettingsTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.SystemSettingsCaption"},
					"cls": ["analytics", "designer-tile"],
					"icon": resources.localizableImages.SystemSettingsIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "Features",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.FeaturesPage"},
					"click": {"bindTo": "openFeaturesPage"},
					"visible": {"bindTo": "getIsFeaturesPageVisible"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "PackageMarket",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.PackageMarketCaption"},
					"click": {"bindTo": "openPackageMarket"},
					"visible": {"bindTo": "getPackageMarketVisible"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "LookupSection",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.LookupsLinkCaption"},
					"tag": "navigateToLookupSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "SysSettingsSection",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.SysSettingsLinkCaption"},
					"tag": "navigateToSysSettings",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "ReportSetup",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ReportSetupLinkCaption"},
					"tag": "navigateToReportSetup",
					"click": {"bindTo": "invokeOperation"},
					"visible": {"bindTo": "getNewReportSetupVisible"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "SectionDesigner",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.SectionDesignerLinkCaption"},
					"click": {"bindTo": "onStartSectionDesignerClick"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "DetailWizard",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.DetailWizardLinkCaption"},
					"tag": "startDetailWizard",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "MobileAppDesignerLink",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.MobileAppDesignerLinkCaption"},
					"tag": "navigateToMobileAppDesignerSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"name": "SystemViewTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.SystemViewCaption"},
					"cls": ["basis", "designer-tile"],
					"icon": resources.localizableImages.SystemViewIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemViewTile",
				"name": "SysWorkplace",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.SysWorkplaceLinkCaption"},
					"tag": "navigateToSysWorkPlaceSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemViewTile",
				"name": "SysLogoManagement",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.SysLogoManagementLinkCaption"},
					"tag": "navigateToSysLogoSettings",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemViewTile",
				"name": "SysColorManagement",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.SysColorManagementLinkCaption"},
					"tag": "navigateToSectionPanelSettingsSection",
					"click": {"bindTo": "invokeOperation"}
				}
			},
			{
				"operation": "insert",
				"name": "ConfigurationTile",
				"propertyName": "items",
				"parentName": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "MainMenuTileGenerator.generateMainMenuTile",
					"caption": {"bindTo": "Resources.Strings.ConfigurationCaption"},
					"cls": ["configuration", "designer-tile"],
					"icon": resources.localizableImages.ConfigurationIcon,
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ConfigurationTile",
				"name": "ConfigurationLink",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ConfigurationLinkCaption"},
					"click": {"bindTo": "onNavigateToConfigurationSettingsClick"}
				}
			},
			{
				"operation": "merge",
				"name": "AcademyPanel",
				"propertyName": "items",
				"parentName": "RightContainer",
				"values": {
					"bannerImage": resources.localizableImages.BPMSbanner,
					"wrapClassName": "bpms-banner"
				}
			},
			{
				"operation": "merge",
				"name": "TerrasoftAccountsLinksPanel",
				"values": {
					"wrapClassName": "system-designer"
				}
			}
		]
	};
});

define('SystemDesignerTranslationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerTranslation", [], function() {
	return {
		methods: {

			//region Methods: Private

			/**
			 * Opens translation section.
			 * @private
			 */
			navigateToTranslationSection: function() {
				this.openSection("TranslationSection");
			},

			/**
			 * Opens language section.
			 * @private
			 */
			navigateToLanguageSection: function() {
				this.openSection("LanguageSection");
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc SystemDesigner#getOperationRightsDecoupling
			 * @overridden
			 */
			getOperationRightsDecoupling: function() {
				var operationRights = this.callParent(arguments);
				operationRights.navigateToTranslationSection = "CanManageTranslationSection";
				operationRights.navigateToLanguageSection = "CanManageLanguageSection";
				return operationRights;
			},

			//endregion

			//region Methods: Public

			/**
			 * Gets "NavigateToLanguageSection" item visibility.
			 * @return {Boolean}
			 */
			getNavigateToLanguageSectionVisible: function() {
				return true;
			},

			/**
			 * Gets "NavigateToTranslationSection" item visibility.
			 * @return {Boolean}
			 */
			getNavigateToTranslationSectionVisible: function() {
				return true;
			}

			//endregion

		},
		diff: [
			{
				"operation": "insert",
				"index": 2,
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "LanguageSection",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.LanguageSectionCaption"},
					"tag": "navigateToLanguageSection",
					"click": {"bindTo": "invokeOperation"},
					"visible": {"bindTo": "getNavigateToLanguageSectionVisible"}
				}
			},
			{
				"operation": "insert",
				"index": 3,
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "TranslationSection",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.TranslationSectionCaption"},
					"tag": "navigateToTranslationSection",
					"click": {"bindTo": "invokeOperation"},
					"visible": {"bindTo": "getNavigateToTranslationSectionVisible"}
				}
			}
		]
	};
});

define('SystemDesignerServiceDesignerResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerServiceDesigner", [], function() {
	return {
		methods: {
			/**
			 * Opens Web services section.
			 * @public
			 */
			navigateToWebServiceV2Section: function() {
				var operationCode = "CanManageSolution";
				if (this.get(operationCode) === true) {
					this.openSection("WebServiceV2Section");
				} else {
					this.showPermissionsErrorMessage(operationCode);
				}
				
			}
		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "IntegrationTile",
				"name": "WebServiceV2Section",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": "$Resources.Strings.WebServicesCaption",
					"tag": "navigateToWebServiceV2Section",
					"click": {"bindTo": "invokeOperation"}
				}
			}
		]
	};
});

define('SystemDesignerLDAPResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerLDAP", ["RightUtilities"], function(RightUtilities) {
	return {
		methods: {
			onNavigateToLDAPServerSettingsClick: function() {
				var canManageAdministration = this.get("CanManageAdministration");
				if (!this.Ext.isEmpty(canManageAdministration)) {
					this.navigateToLDAPServerSettings();
				} else {
					RightUtilities.checkCanExecuteOperation({
						operation: "CanManageAdministration"
					}, function(result) {
						this.set("CanManageAdministration", result);
						this.navigateToLDAPServerSettings();
					}, this);
				}
				return false;
			},

			/**
			 * ######### ######## ######### LDAP.
			 * @private
			 */
			navigateToLDAPServerSettings: function() {
				if (this.get("CanManageAdministration") === true) {
					this.sandbox.publish("PushHistoryState", {
						hash: "ConfigurationModuleV2/LDAPServerSettings/"
					});
				} else {
					this.showPermissionsErrorMessage("CanManageAdministration");
				}
			}
		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "IntegrationTile",
				"name": "Ldap",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.LdapLinkCaption"},
					"click": {"bindTo": "onNavigateToLDAPServerSettingsClick"}
				}
			}
		]
	};
});

define('SystemDesignerFileImportResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerFileImport", [], function() {
	return {
		methods: {

			//region Methods: Private

			/**
			 * Opens a window to import data from file.
			 * @private
			 */
			navigateToFileImport: function() {
				var importSessionId = this.Terrasoft.generateGUID();
				var url = this.Terrasoft.combinePath(this.Terrasoft.workspaceBaseUrl, "Nui",
					"ViewModule.aspx?vm=FileImportWizard#FileImportModule/FileImportStartPage",
					importSessionId);
				setTimeout(function() {
					window.open(url, "_blank");
				}, 0);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc
			 * @overridden
			 */
			getOperationRightsDecoupling: function() {
				var operationRightsDecoupling = this.callParent(arguments);
				operationRightsDecoupling.navigateToFileImport = "CanImportFromExcel";
				return operationRightsDecoupling;
			}

			//endregion

		},
		diff: [
			{
				"operation": "remove",
				"name": "ExcelImport"
			},
			{
				"operation": "insert",
				"index": 0,
				"propertyName": "items",
				"parentName": "IntegrationTile",
				"name": "FileImport",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.FileImportLinkCaption"},
					"tag": "navigateToFileImport",
					"click": {"bindTo": "invokeOperation"}
				}
			}
		]
	};
});

define('SystemDesignerExternalAccessResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerExternalAccess", [], function() {
	return {
		methods: {
			/**
			 * Opens access section.
			 * @private
			 */
			navigateToExternalAccessSection: function() {
				this.openSection("ExternalAccessSection");
			},
			/**
			 * @return {Boolean} True if external access enabled.
			 * @private
			 */
			_isExternalAccessEnabled: function() {
				return !this.getIsFeatureEnabled("DisableExternalAccess");
			}
		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "UsersTile",
				"name": "ExternalAccessSection",
				"index": 7,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.ExtAccessSectionCaption"},
					"tag": "navigateToExternalAccessSection",
					"click": {"bindTo": "invokeOperation"},
					"visible": {"bindTo": "_isExternalAccessEnabled"}
				}
			}
		]
	};
});

define('SystemDesignerDeduplicationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerDeduplication", function() {
	return {
		attributes: {
			/**
			 * Flag that indicates feature "Deduplication" enabled.
			 */
			"IsDeduplicationEnable": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		methods: {
			/**
			 * @inheritodoc SystemDesigner#getOperationRightsDecoupling
			 * @overridden
			 */
			getOperationRightsDecoupling: function() {
				var operationRights = this.callParent(arguments);
				operationRights.navigateToDuplicatesSettings = "CanManageDuplicatesRules";
				return operationRights;
			},

			/**
			 * @inheritodoc SystemDesigner#setDefaultParameters
			 * @overridden
			 */
			setDefaultParameters: function() {
				this.callParent(arguments);
				var isElasticDeduplicationEnabled = this.getIsFeatureEnabled("ESDeduplication");
				var isDeduplicationEnabled = this.getIsFeatureEnabled("Deduplication");
				var isEnabled = isElasticDeduplicationEnabled || isDeduplicationEnabled;
				this.set("IsDeduplicationEnable", isEnabled);
			},

			/**
			 * ######### ####### # ###### Duplication rule.
			 * @private
			 */
			navigateToDuplicatesSettings: function() {
				var duplicationModuleStructure = Terrasoft.configuration.ModuleStructure.DuplicatesRule;
				if (duplicationModuleStructure) {
					var newHash = Terrasoft.combinePath(duplicationModuleStructure.sectionModule,
						duplicationModuleStructure.sectionSchema);
					this.sandbox.publish("PushHistoryState", {hash: newHash});
				}
			}

		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "DuplicatesSettingsSection",
				"index": 2,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.DuplicatesSettingsLinkCaption"},
					"tag": "navigateToDuplicatesSettings",
					"click": {"bindTo": "invokeOperation"},
					"visible": {"bindTo": "IsDeduplicationEnable"}
				}
			}
		]
	};
});

define('SystemDesignerBaseScoringResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerBaseScoring", [],
	function() {
		return {
			methods: {
				/**
				 * Checks whether scoring is enabled.
				 * @return {Boolean} Returns true if scoring is enabled.
				 */
				getScoringEnabled: function() {
					return Terrasoft.Features.getIsEnabled("Scoring");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "SystemSettingsTile",
					"name": "SiteEventTypeSetup",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.ScoringModelCaption"},
						"tag": "SectionModuleV2/ScoringModelSectionV2",
						"click": {"bindTo": "onNavigateTo"},
						"visible": {"bindTo": "getScoringEnabled"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('SystemDesignerMLResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerML", [], function() {
	return {
		methods: {
			/**
			 * Opens ML model section.
			 * @private
			 */
			navigateToMLModelSection: function() {
				this.openSection("MLModelSection");
			}
		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "MLModelSection",
				"index": 8,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.MLModelSectionCaption"},
					"tag": "navigateToMLModelSection",
					"click": {"bindTo": "invokeOperation"}
				}
			}
		]
	};
});

define('SystemDesignerSSPResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerSSP", ["SystemDesignerResources", "ConfigurationEnums", "ConfigurationConstants",
		"ProcessModuleUtilities", "PortalClientConstants"],
	function(resources, ConfigurationEnums, ConfigurationConstants, ProcessUtilities, PortalConstants) {
		return {
			properties: {
				/**
				 * @protected
				 */
				organizationPageSchemaUId: PortalConstants.DesignerPages.OrganizationPageSchemaUId,

				/**
				 * @protected
				 */
				profileContactPageSchemaUId: PortalConstants.DesignerPages.ProfileContactPageSchemaUId

			},
			attributes: {
				/**
				 * ########, ########## ########## # ########### ######
				 * ######### ####### ######## ####### ######## ############.
				 */
				"CanManagePortalMainPage": {dataValueType: Terrasoft.DataValueType.BOOLEAN}
			},
			methods: {

				/**
				 * ######### ###### "####### ######## #######" ### ########## ######### # ######.
				 * @private
				 */
				navigateToPortalMainPageModule: function() {
					this.sandbox.publish("PushHistoryState", {hash: "PortalMainPageModule/"});
				},

				/**
				 * Go to "Portal users" section.
				 * @protected
				 */
				navigateToPortalUsers: function() {
					this.openSection("SSPUsersSection");
				},

				/**
				 * @inheritDoc SystemDesigner#getOperationRightsDecoupling.
				 * @overriden
				 * @return {Object} OperationRights object.
				 */
				getOperationRightsDecoupling: function() {
					var baseOperationRights = this.callParent(arguments);
					baseOperationRights.navigateToPortalMainPageModule = "CanManagePortalMainPage";
					baseOperationRights.navigateToPortalUsers = "CanAdministratePortalUsers";
					baseOperationRights.navigateToPortalOrgRoles = "CanAdministratePortalUsers";
					baseOperationRights.navigateToPortalFuncRoles = "CanAdministratePortalUsers";
					baseOperationRights.navigateToPortalOrganizationSetup = "CanManageAdministration";
					baseOperationRights.navigateToSspProfileContactSetup = "CanManageAdministration";
					return baseOperationRights;
				},

				/**
				 * Open UserSection section if user have permission.
				 * @public
				 */
				tryOpenUserSection: function() {
					var operationName = arguments[1] || arguments[0];
					var operationRightsDecoupling = this.getOperationRightsDecoupling();
					var rightsName = operationRightsDecoupling[operationName];
					if (!Ext.isEmpty(rightsName) && !this.get(rightsName) && !this.get("CanViewConfiguration")) {
						var portalOperationName = "navigateToPortalUsers";
						var portalRightName = operationRightsDecoupling[portalOperationName];
						if (!Ext.isEmpty(portalRightName) && !this.get(portalRightName)) {
							this.showPermissionsErrorMessage(portalRightName);
							return false;
						}
					}
					var operation = this[operationName];
					if (!Ext.isEmpty(operation) && Ext.isFunction(operation)) {
						operation.call(this);
					}
					return false;
				},

				/**
				 *  Get PortalSetupInSystemDesigner feature value.
				 * @private
				 */
				_getPortalSetupVisibility: function() {
					return this.getIsFeatureEnabled("PortalSetupInSystemDesigner");
				},

				/**
				 *  Get PortalMainPageManagement link visibility.
				 * @private
				 */
				_getPortalMainPageManagement: function() {
					return !this._getPortalSetupVisibility();
				},

				/**
				 * ######### ############# ############### #### # ####### ################# #############.
				 * @private
				 */
				navigateToPortalOrgRoles: function() {
					this.goToSspSysAdminUnitSection("SspSysAdminUnitPage");
				},

				/**
				 * ######### ############# ############## #### # ####### ################# #############.
				 * @private
				 */
				navigateToPortalFuncRoles: function() {
					this.goToSspSysAdminUnitSection("SspSysAdminUnitFuncRolePage");
				},

				/**
				 * Opens page wizard.
				 * @protected
				 */
				openWizardSetupPage: function(schemaUId) {
					const config = {
						designer: "SspPageWizard",
						type: "PageDesigner",
						schemaUId: schemaUId
					};
					ProcessUtilities.showSchemaDesigner(config);
				},

				/**
				 * Opens organization page wizard.
				 * @protected
				 */
				navigateToPortalOrganizationSetup: function() {
					this.openWizardSetupPage(this.organizationPageSchemaUId);
				},

				/**
				 * Opens contact profile page wizard.
				 * @protected
				 */
				navigateToSspProfileContactSetup: function() {
					this.openWizardSetupPage(this.profileContactPageSchemaUId);
				},

				goToSspSysAdminUnitSection: function(pageName) {
					var primaryId = ConfigurationConstants.SysAdminUnit.Id.PortalUsers;
					this.sandbox.publish("PushHistoryState", {
						hash: Terrasoft.combinePath("SectionModuleV2", "SspSysAdminUnitSection",
							pageName, ConfigurationEnums.CardState.Edit, primaryId),
						stateObj: {
							module: "SectionModuleV2",
							operation: ConfigurationEnums.CardState.Edit,
							primaryColumnValue: primaryId,
							schemas: [
								this.name,
								pageName
							],
							workAreaMode: ConfigurationEnums.WorkAreaMode.COMBINED,
							moduleId: this.sandbox.id,
							skipCardHistoryStateActualization: true
						}
					});
				}

			},
			diff: [
				{
					"operation": "merge",
					"name": "Users",
					"values": {
						"click": {"bindTo": "tryOpenUserSection"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "SystemSettingsTile",
					"name": "PortalMainPageManagement",
					"index": 5,
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.PortalMainPageManagementLinkCaption"},
						"tag": "navigateToPortalMainPageModule",
						"click": {"bindTo": "invokeOperation"},
						"visible": {"bindTo": "_getPortalMainPageManagement"}
					}
				},
				{
					"operation": "insert",
					"name": "PortalAdministrationTile",
					"propertyName": "items",
					"parentName": "LeftContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"generator": "MainMenuTileGenerator.generateMainMenuTile",
						"caption": {"bindTo": "Resources.Strings.PortalSetupCaption"},
						"cls": ["midnight-blue-tile", "designer-tile"],
						"icon": resources.localizableImages.PortalIcon,
						"items": [],
						"visible": {"bindTo": "_getPortalSetupVisibility"}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "PortalAdministrationTile",
					"name": "PortalUsers",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.PortalUsersLinkCaption"},
						"tag": "navigateToPortalUsers",
						"click": {"bindTo": "invokeOperation"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "PortalAdministrationTile",
					"name": "PortalOrgRoles",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.PortalOrganizationalRolesLinkCaption"},
						"tag": "navigateToPortalOrgRoles",
						"click": {"bindTo": "invokeOperation"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "PortalAdministrationTile",
					"name": "PortalFuncRoles",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.PortalFunctionalRolesLinkCaption"},
						"tag": "navigateToPortalFuncRoles",
						"click": {"bindTo": "invokeOperation"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "PortalAdministrationTile",
					"name": "PortalMainPageManagementInPortalAdministrationTile",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.PortalMainPageManagementLinkCaption"},
						"tag": "navigateToPortalMainPageModule",
						"click": {"bindTo": "invokeOperation"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "PortalAdministrationTile",
					"name": "SspProfileContactSetup",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.SspProfileContactSetupLinkCaption"},
						"tag": "navigateToSspProfileContactSetup",
						"click": {"bindTo": "invokeOperation"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "PortalAdministrationTile",
					"name": "PortalOrganizationSetup",
					"values": {
						"itemType": Terrasoft.ViewItemType.LINK,
						"caption": {"bindTo": "Resources.Strings.PortalOrganizationSetupLinkCaption"},
						"tag": "navigateToPortalOrganizationSetup",
						"click": {"bindTo": "invokeOperation"}
					}
				}
			]
		};
	});

define('SystemDesignerWebLeadFormResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerWebLeadForm", function() {
	return {
		diff: []
	};
});

define('SystemDesignerOpportunityManagementResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerOpportunityManagement", ["ProcessModuleUtilities", "OppManagementMigrationUtils"], function(ProcessModuleUtilities) {
	return {
		mixins: {
			"OppManagementMigrationUtils": "Terrasoft.OppManagementMigrationUtils"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initOldProcessUsageState(callback, scope);
				}, this]);
			},

			/**
			 * Returns {@link Terrasoft.ProcessModuleUtilities} instance.
			 * @private
			 * @return {Terrasoft.ProcessModuleUtilities}
			 */
			getProcessModuleUtilities: function() {
				return ProcessModuleUtilities;
			},

			/**
			 * Starts OpportunityManagement actualization process.
			 * @private
			 */
			runActualizeOpportunityManagementProcess: function(callback) {
				var processUtils = this.getProcessModuleUtilities();
				this.showBodyMask();
				processUtils.executeProcess({
					sysProcessName: "ActualizeOpportunityManagement",
					callback: function() {
						this.hideBodyMask();
						callback.call(this);
					},
					scope: this
				});
			},

			/**
			 * Returns caption for changing opportunity management process link.
			 * @protected
			 * @return {String}
			 */
			getOpportunityManagementProcessLinkCaption: function() {
				var resourceCode = this.isOldProcessEnabled() ?
					"UseOpportunityManagementProcess780" :
					"UseOldOpportunityManagementProcess";
				return this.get("Resources.Strings." + resourceCode);
			},

			/**
			 * Changes current state of old opportunity management process usage.
			 * @protected
			 */
			changeOpportunityManagementProcessMode: function() {
				this.Terrasoft.chain(
					this.toggleOldProcessUsageState,
					this.runActualizeOpportunityManagementProcess,
					this.initOldProcessUsageState.bind(this, this.Ext.emptyFn),
					this
				);
				return false;
			}

		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "SystemSettingsTile",
				"name": "ChangeOpportunityManagementProcess",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "getOpportunityManagementProcessLinkCaption"},
					"click": {"bindTo": "changeOpportunityManagementProcessMode"},
					"visible": Terrasoft.Features.getIsEnabled("ChangeOpportunityManagementProcess")
				}
			}
		]
	};

});

define('SystemDesignerMarketingCampaignResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SystemDesignerMarketingCampaign", function() {
	return {
		methods: {
			/**
			 * Returns true if feature BulkEmailUXEnabled is enabled.
			 * @private
			 * @returns {Boolean} True if feature BulkEmailUXEnabled is enabled.
			 */
			getIsBulkEmailUXEnabled: function() {
				return this.Terrasoft.Features.getIsEnabled("BulkEmailUX");
			},

			/**
			 * Opens mailing log.
			 */
			openBulkEmailEventLog: function() {
				this.sandbox.publish("PushHistoryState", {hash: "SectionModuleV2/BulkEmailEventLogSectionV2"});
			}

		},
		diff: [
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "IntegrationTile",
				"name": "OpenBulkEmailEventLog",
				"index": 3,
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.OpenBulkEmailEventLogCaption"},
					"tag": "openBulkEmailEventLog",
					"click": {"bindTo": "invokeOperation"}
				}
			}
		]
	};
});

define("SystemDesigner", function() {
	return {
		methods: {
			/**
			 * @inheritodoc SystemDesigner#getOperationRightsDecoupling
			 * @overridden
			 */
			getOperationRightsDecoupling: function() {
				var operationRights = this.callParent(arguments);
				operationRights.navigateToEventTracking = "CanManageEventTracking";
				return operationRights;
			},

			/**
			 * Navigates to "EventTracking" section.
			 * @private
			 */
			navigateToEventTracking: function() {
				if (this.get("CanManageEventTracking") === true) {
					this.sandbox.publish("PushHistoryState", {hash: "SectionModuleV2/SiteEventTypeSection"});
				} else {
					this.showPermissionsErrorMessage("CanManageEventTracking");
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "IntegrationTile",
				"name": "EventTrackingSetup",
				"values": {
					"itemType": Terrasoft.ViewItemType.LINK,
					"caption": {"bindTo": "Resources.Strings.SiteEventTypeCaption"},
					"tag": "navigateToEventTracking",
					"click": {"bindTo": "invokeOperation"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


