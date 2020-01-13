Terrasoft.configuration.Structures["UsersSectionV2"] = {innerHierarchyStack: ["UsersSectionV2UIv2", "UsersSectionV2"], structureParent: "BaseSectionV2"};
define('UsersSectionV2UIv2Structure', ['UsersSectionV2UIv2Resources'], function(resources) {return {schemaUId:'2db64a17-3f13-4925-8764-c82689da5d79',schemaCaption: "Users section", parentSchemaName: "BaseSectionV2", schemaName:'UsersSectionV2UIv2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UsersSectionV2Structure', ['UsersSectionV2Resources'], function(resources) {return {schemaUId:'fc0fb15f-3721-4fd4-9ecf-f7c47e92bb54',schemaCaption: "Users section", parentSchemaName: "UsersSectionV2UIv2", schemaName:'UsersSectionV2',parentSchemaUId:'2db64a17-3f13-4925-8764-c82689da5d79',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UsersSectionV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UsersSectionV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UsersSectionV2UIv2", [
		"ConfigurationConstants", "ConfigurationEnums", "PortalRoleFilterUtilities", "UsersSectionV2Resources",
		"GridUtilitiesV2", "css!AdministrationCSSV2", "ActualizationUtilities"
	],
	function(ConfigurationConstants, ConfigurationEnums, PortalRoleFilterUtilities) {
		return {
			entitySchemaName: "SysAdminUnit",
			contextHelpId: "259",
			diff: [
				{
					"operation": "merge",
					"name": "SectionWrapContainer",
					"values": {
						"wrapClass": ["UsersSectionV2", "section-wrap"]
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"name": "CombinedModeAddOnlyEmployeeButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.AddRecordButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"visible": {"bindTo": "ShowAddOnlyEmployee"},
						"click": {"bindTo": "onAddOurCompanyUser"}
					}
				},
				{
					"operation": "merge",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"name": "CombinedModeAddRecordButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.AddRecordButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"menu": [],
						"controlConfig": {},
						"visible": {"bindTo": "ShowAddPortalUser"}
					}
				},
				{
					"operation": "insert",
					"name": "CombinedModeAddPortalUser",
					"parentName": "CombinedModeAddRecordButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddPortalUserButtonCaption"},
						"click": {"bindTo": "onAddPortalUser"}
					}
				},
				{
					"operation": "insert",
					"name": "CombinedModeAddOurCompanyUser",
					"parentName": "CombinedModeAddRecordButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddOurCompanyUserButtonCaption"},
						"click": {"bindTo": "onAddOurCompanyUser"}
					}
				},
				{
					"operation": "insert",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"name": "SeparateModeAddOnlyEmployeeButton",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.AddRecordButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"visible": {"bindTo": "ShowAddOnlyEmployee"},
						"click": {"bindTo": "onAddOurCompanyUser"}
					}
				},
				{
					"operation": "merge",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"name": "SeparateModeAddRecordButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.AddRecordButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"menu": [],
						"controlConfig": {},
						"visible": {"bindTo": "ShowAddPortalUser"}
					}
				},
				{
					"operation": "insert",
					"name": "SeparateModeAddPortalUser",
					"parentName": "SeparateModeAddRecordButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddPortalUserButtonCaption"},
						"click": {"bindTo": "onAddPortalUser"}
					}
				},
				{
					"operation": "insert",
					"name": "SeparateModeAddOurCompanyUser",
					"parentName": "SeparateModeAddRecordButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AddOurCompanyUserButtonCaption"},
						"click": {"bindTo": "onAddOurCompanyUser"}
					}
				},
				{
					"operation": "remove",
					"name": "DataGridActiveRowCopyAction"
				},
				{
					"operation": "remove",
					"name": "CombinedModeActionsButton"
				},
				{
					"operation": "remove",
					"name": "CombinedModeViewOptionsButton"
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"name": "ActionsButtonCombinedMode",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ActionsButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"menu": [],
						"controlConfig": {},
						"visible": {
							"bindTo": "CombinedModeActionsButtonVisible"
						}
					}
				},
				{
					"operation": "insert",
					"name": "CombinedModeActualize",
					"parentName": "ActionsButtonCombinedMode",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ActualizeOrgStructureButtonCaption"},
						"click": {"bindTo": "onActualizeAdminUnitInRole"}
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"name": "CombinedInformationTooltipButton",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.InfoSpriteImage"},
						"classes": {
							"wrapperClass": "info-button",
							"imageClass": "info-button-image"
						},
						"visible": {"bindTo": "ShowActualizeMessage"},
						"hint": {"bindTo": "Resources.Strings.NeedActualizeRolesTooltip"}
					}
				},
				{
					"operation": "insert",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"name": "SeparateInformationTooltipButton",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.InfoSpriteImage"},
						"classes": {
							"wrapperClass": "info-button",
							"imageClass": "info-button-image"
						},
						"visible": {"bindTo": "ShowActualizeMessage"},
						"hint": {"bindTo": "Resources.Strings.NeedActualizeRolesTooltip"}
					}
				}
			],
			attributes: {
				/**
				 * ####### ############# ###### ############ ###### # #### ### ########## #############.
				 */
				"ShowAddPortalUser": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * ####### ############# ###### ############ ###### ###### ### ########## ########### ########.
				 */
				"ShowAddOnlyEmployee": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * ####### ############# ###### ############ ######### ## ############ #####.
				 */
				"ShowActualizeMessage": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * ### sysOperation, ## ######## ##### ############# ######## #### ####### # #######
				 */
				"SecurityOperationName": {
					dataValueType: Terrasoft.DataValueType.STRING,
					value: "CanManageUsers"
				}
			},
			messages: {
				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ######## ########## # ######## # #### ### ######.
				 */
				"SetRecordInformation": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				ActualizationUtilities: "Terrasoft.ActualizationUtilities"
			},
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeEvents();
					this.updateAddButtonVisibility();
					this.initCustomUserProfileData(this.setShowActualizeMessageFromProfile, this);
				},

				/**
				 * ######### ######## ## ########## ###### ############ #######. #### ###### #######, ## #####
				 * ########## ###### ### ########## ############# ####### # ########### ########. #### ###, ## #####
				 * ######## ###### ###### ### ########## ########## ########.
				 * @protected
				 */
				updateAddButtonVisibility: function() {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "VwSysAdminUnit"
					});
					esq.addColumn("Id");
					esq.filters.add("PortalFilter", PortalRoleFilterUtilities.getPortalFilterGroup());
					esq.getEntityCollection(this.handleUpdateAddButtonVisibilityResponse, this);
				},

				/**
				 * ######### ######## ###### #######. #### ###### #### #######, ## ##### ########## ###### ###
				 * ########## ############# ####### # ########### ########. #### ###, ## ##### ######## ###### ######
				 * ### ########## ########## ########.
				 * @param {Object} response ######, ########## ##### #######.
				 * @protected
				 */
				handleUpdateAddButtonVisibilityResponse: function(response) {
					if (response && response.success) {
						var propertyName = response.collection.isEmpty() ? "ShowAddOnlyEmployee" : "ShowAddPortalUser";
						this.set(propertyName, true);
					}
				},

				/**
				 * @inheritdoc GridUtilitiesV2#getGridDataColumns
				 * @overridden
				 */
				getGridDataColumns: function() {
					var config = this.callParent(arguments);
					config.ConnectionType = {path: "ConnectionType"};
					return config;
				},

				/**
				 * Performs messages subscriptions.
				 * @private
				 */
				subscribeEvents: function() {
					this.sandbox.subscribe("SetRecordInformation", function() {
						var targetParent = this.get("TargetParent");
						if (this.Ext.isEmpty(targetParent)) {
							return;
						}
						return {
							parent: targetParent,
							defaultValues: this.get("defaultValues")
						};
					}, this, [
						this.getChainCardModuleSandboxId(this.Terrasoft.GUID_EMPTY),
						this.getCardModuleSandboxId()
					]);
					this.sandbox.subscribe("NeedActualizeRoles", function() {
						this.saveShowActualizeMessageInProfile(true);
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#addItemsToGridData
				 * @overridden
				 */
				addItemsToGridData: function() {
					this.callParent(arguments);
					this.setActiveRowsForViewFromHistoryState();
				},

				/**
				 * ######## ## ####### ######## ###### # ######## ############# # ########### ## ### ######## #######.
				 * @protected
				 */
				setActiveRowsForViewFromHistoryState: function() {
					var state = this.sandbox.publish("GetHistoryState").state;
					this.set("ActiveRow", state.UsersActiveRow);
					this.set("FuncRolesActiveRow", state.FuncRolesActiveRow);
					this.set("OrganizationalRolesActiveRow", state.OrgRolesActiveRow);
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @overridden
				 */
				getDefaultDataViews: function() {
					var baseDataViews = this.callParent(arguments);
					baseDataViews = {
						GridDataView: {
							index: 0,
							name: "GridDataView",
							caption: this.get("Resources.Strings.UsersHeader"),
							icon: this.get("Resources.Images.UsersDataViewIcon"),
							hint: this.get("Resources.Strings.UsersDataViewHint")
						},
						OrganizationalRolesDataView: {
							index: 1,
							name: "OrganizationalRolesDataView",
							caption: this.get("Resources.Strings.OrganizationalRolesHeader"),
							icon: this.get("Resources.Images.OrgRolesIcon"),
							hint: this.get("Resources.Strings.OrganizationalStructureDataViewHint")
						},
						FuncRolesDataView: {
							index: 2,
							name: "FuncRolesDataView",
							caption: this.get("Resources.Strings.FunctionalRolesHeader"),
							icon: this.get("Resources.Images.FuncRolesIcon"),
							hint: this.get("Resources.Strings.FunctionalRolesDataViewHint")
						}
					};
					return baseDataViews;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#changeDataView
				 * @overridden
				 */
				changeDataView: function(view) {
					if (view.tag !== "GridDataView") {
						this.moveToRolesSection(view.tag);
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * Performs move to functional or organizational roles section depending on selected view.
				 * @param {String} viewName ### #############.
				 * @protected
				 */
				moveToRolesSection: function(viewName) {
					var pageName = this.getPageNameForRoles(viewName);
					var primaryColumnValue = this.getPrimaryColumnValueForRoles(viewName);
					this.sandbox.publish("PushHistoryState", {
						hash: this.Terrasoft.combinePath("SectionModuleV2", "SysAdminUnitSectionV2",
							pageName, "edit", primaryColumnValue),
						stateObj: {
							module: "SectionModuleV2",
							operation: "edit",
							primaryColumnValue: primaryColumnValue,
							schemas: [
								"SysAdminUnitSectionV2",
								pageName
							],
							workAreaMode: ConfigurationEnums.WorkAreaMode.COMBINED,
							moduleId: this.sandbox.id,
							UsersActiveRow: this.get("ActiveRow"),
							FuncRolesActiveRow: this.get("FuncRolesActiveRow"),
							OrgRolesActiveRow: this.get("OrganizationalRolesActiveRow")
						}
					});
				},

				/**
				 * ########## ### ######## ############## ### ######### #############.
				 * @param {String} viewName ### #############.
				 * @return {String} ### ######## ##############.
				 * @protected
				 */
				getPageNameForRoles: function(viewName) {
					return viewName === "OrganizationalRolesDataView"
						? "SysAdminUnitPageV2"
						: "SysAdminUnitFuncRolePageV2";
				},

				/**
				 * ########## ############# ####, ####### #### ####### # ############# #####.
				 * @param {String} viewName ### #############.
				 * @return {String} ############# ######### ####. #### ##### ## #### ####### #####-#### ####, #####
				 * ## ######### ##### ####### #### "### ########## ########".
				 * @protected
				 */
				getPrimaryColumnValueForRoles: function(viewName) {
					var id;
					if (viewName === "OrganizationalRolesDataView") {
						id = this.get("OrganizationalRolesActiveRow");
					} else {
						id = this.get("FuncRolesActiveRow");
					}
					return id || ConfigurationConstants.SysAdminUnit.Id.AllEmployees;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					filters.add("UsersFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnitTypeValue", ConfigurationConstants.SysAdminUnit.Type.User));
					return filters;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getEditPageSchemaName
				 * @overridden
				 */
				getEditPageSchemaName: function() {
					return "UserPageV2";
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#addRecord
				 * @overridden
				 */
				addRecord: function() {
					return false;
				},

				/**
				 * ######### ######## ########## ###### ############ #######.
				 * @protected
				 */
				onAddPortalUser: function() {
					this.addNewRecord(ConfigurationConstants.SysAdminUnit.Id.PortalUsers,
						ConfigurationConstants.SysAdminUnit.ConnectionType.PortalUsers);
				},

				/**
				 * ######### ######## ########## ###### ########## ########.
				 * @protected
				 */
				onAddOurCompanyUser: function() {
					this.addNewRecord(ConfigurationConstants.SysAdminUnit.Id.AllEmployees,
						ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees);
				},

				/**
				 * ######### ######## ########## ###### ############.
				 * @param {String} parentId ############# ######, # ####### ## ##### ######### ############.
				 * @param {Number} connectionType ### ########### ############.
				 * @protected
				 */
				addNewRecord: function(parentId, connectionType) {
					this.set("TargetParent", parentId);
					var defaultValues = [{
						name: "ConnectionType",
						value: connectionType
					}];
					this.set("defaultValues", defaultValues);
					this.openCardInChain({
						schemaName: "UserPageV2",
						operation: ConfigurationEnums.CardStateV2.ADD,
						moduleId: this.getChainCardModuleSandboxId(this.Terrasoft.GUID_EMPTY),
						defaultValues: defaultValues
					});
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#onDeleteAccept
				 * @overridden
				 */
				onDeleteAccept: function() {
					var activeRow = this.get("ActiveRow");
					var dataSend = {userId: activeRow};
					var config = {
						serviceName: "AdministrationService",
						methodName: this.getOnDeleteAcceptMethodName(),
						data: dataSend
					};
					this.showBodyMask();
					this.callService(config, this.onDeleteUserResponseHandler.bind(this, activeRow), this);
				},

				/**
				 * Returns delete user method name
				 * @protected
				 * @return {String} Method name.
				 */
				getOnDeleteAcceptMethodName: function() {
					return "DeleteUser";
				},

				/**
				 * ######### # ########## ######## ############ # ###### ######, # ###### ######## ########## ########
				 * ####### ####### ## #######.
				 * @param {String} activeRow ############# #######, ### ######## ########### ########.
				 * @param {Object} response ##### #######.
				 * @protected
				 */
				onDeleteUserResponseHandler: function(activeRow, response) {
					var message = this.get("Resources.Strings.DeleteErrorMessage");
					var responseResult = response[this.getOnDeleteAcceptMethodName() + "Result"];
					this.validateServiceResponse(responseResult, message,
						this.afterUserDeleted.bind(this, activeRow), this);
				},

				/**
				 * ######### ##### ####### # ######### ############ # ###### ####### ######.
				 * @param {string} response ############ ##### #######.
				 * @param {string} message ######### # ###### ######.
				 * @param {Function} callback ####### ######### ###### # ###### ########## #######.
				 * @param {Object} scope  ######## ####### ######### ######.
				 * @protected
				 */
				validateServiceResponse: function(response, message, callback, scope) {
					this.hideBodyMask();
					var result = this.Ext.decode(response);
					var isSuccess = result && result.Success;
					if (isSuccess) {
						callback.call(scope);
					} else if (result.IsSecurityException) {
						this.showInformationDialog(result.ExceptionMessage);
					} else {
						this.showInformationDialog(message);
					}
				},

				/**
				 * ########, ########### ##### ######## ############.
				 * @param {String} activeRow ############# #######, ### ######## ########### ########.
				 * @protected
				 */
				afterUserDeleted: function(activeRow) {
					this.removeGridRecords([activeRow]);
					this.hideBodyMask();
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getSectionActions
				 * @overridden
				 */
				getSectionActions: function() {
					var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					actionMenuItems.addItem(this.getExportToFileMenuItem());
					actionMenuItems.addItem(this.getExportToExcelFileMenuItem());
					actionMenuItems.addItem(this.getActualizeAdminUnitInRoleButton());
					return actionMenuItems;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getViewOptions
				 * @overridden
				 */
				getViewOptions: function() {
					var viewOptions = this.Ext.create("Terrasoft.BaseViewModelCollection");
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.SortMenuCaption"},
						"Items": this.get("SortColumns")
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.OpenSummarySettingsModuleButtonCaption"},
						"Click": {"bindTo": "openSummarySettings"},
						"Visible": {"bindTo": "IsSummarySettingsVisible"}
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.OpenGridSettingsCaption"},
						"Click": {"bindTo": "openGridSettings"}
					}));
					return viewOptions;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getSectionCode
				 * @override
				 */
				getSectionCode: function() {
					return "SystemUsers";
				}
			}
		};
	});

define("UsersSectionV2", ["PortalUsersAdministrationUtilities"],
	function() {
		return {
			entitySchemaName: "SysAdminUnit",
			attributes: {
				"ShowAddOurCompanyUser": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": true
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "CombinedModeAddOurCompanyUser",
					"values": {
						"visible": {"bindTo": "ShowAddOurCompanyUser"}
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModeAddOurCompanyUser",
					"values": {
						"visible": {"bindTo": "ShowAddOurCompanyUser"}
					}
				}
			],
			mixins: {
				portalUsersAdministrationUtilities: "Terrasoft.PortalUsersAdministrationUtilities"
			},
			methods: {
				/**
				 * @inheritdoc BaseSectionV2#getDefaultDataViews
				 * @overridden
				 */
				getDefaultDataViews: function() {
					var baseDataViews = this.callParent(arguments);
					if (this.get("CanViewConfiguration")) {
						return baseDataViews;
					}
					if (!this.get("CanManageUsers") && this.get("CanAdministratePortalUsers")) {
						delete baseDataViews.OrganizationalRolesDataView;
						delete baseDataViews.FuncRolesDataView;
					}
					return baseDataViews;
				},

				/**
				 * Checks schema operation availability.
				 * @protected
				 * @param {Object} callback callback function.
				 * @param {Object} scope scope.
				 */
				checkSchemaOperationAvailability: function(callback, scope) {
					this.checkCanAdministratePortalUsers(callback, scope);
				},

				/**
				 * @inheritDoc UsersSectionV2#getOnDeleteAcceptMethodName
				 * @overridden
				 * @return {String} Method name.
				 */
				getOnDeleteAcceptMethodName: function() {
					if (!this.get("CanManageUsers") && this.get("CanAdministratePortalUsers")) {
						return "DeletePortalUser";
					} else {
						return this.callParent();
					}
				},

				/**
				 * @inheritdoc BaseSectionV2#initQueryFilters
				 * @overridden
				 */
				initQueryFilters: function(esq) {
					this.callParent(arguments);
					if (this.get("CanViewConfiguration")) {
						return;
					}
					if (!this.get("CanManageUsers") && this.get("CanAdministratePortalUsers")) {
						if (!esq.columns.collection.containsKey("ConnectionType")) {
							esq.addColumn("ConnectionType");
						}
						esq.filters.removeByKey("ConnectionType");
						esq.filters.add("ConnectionType", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "ConnectionType", 1));
						this.set("ShowAddOurCompanyUser", false);
					}
				}
			}
		};
	}
);


