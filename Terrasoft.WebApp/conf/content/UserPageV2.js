Terrasoft.configuration.Structures["UserPageV2"] = {innerHierarchyStack: ["UserPageV2UIv2", "UserPageV2Translation", "UserPageV2LDAP", "UserPageV2WebitelCollaborations", "UserPageV2"], structureParent: "BaseModulePageV2"};
define('UserPageV2UIv2Structure', ['UserPageV2UIv2Resources'], function(resources) {return {schemaUId:'e39f556f-de8b-49a7-8845-9458541a5b1f',schemaCaption: "Edit page - User", parentSchemaName: "BaseModulePageV2", schemaName:'UserPageV2UIv2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserPageV2TranslationStructure', ['UserPageV2TranslationResources'], function(resources) {return {schemaUId:'e95c91a5-690f-453c-940a-bd8125787dba',schemaCaption: "Edit page - User", parentSchemaName: "UserPageV2UIv2", schemaName:'UserPageV2Translation',parentSchemaUId:'e39f556f-de8b-49a7-8845-9458541a5b1f',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserPageV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserPageV2LDAPStructure', ['UserPageV2LDAPResources'], function(resources) {return {schemaUId:'502394d4-9713-47e7-b050-34ea186f3839',schemaCaption: "Edit page - User", parentSchemaName: "UserPageV2Translation", schemaName:'UserPageV2LDAP',parentSchemaUId:'e95c91a5-690f-453c-940a-bd8125787dba',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserPageV2Translation",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserPageV2WebitelCollaborationsStructure', ['UserPageV2WebitelCollaborationsResources'], function(resources) {return {schemaUId:'80ad2968-077f-478e-b60b-648d0c2f9db9',schemaCaption: "Edit page - User", parentSchemaName: "UserPageV2LDAP", schemaName:'UserPageV2WebitelCollaborations',parentSchemaUId:'502394d4-9713-47e7-b050-34ea186f3839',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserPageV2LDAP",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserPageV2Structure', ['UserPageV2Resources'], function(resources) {return {schemaUId:'e5651372-94cd-43f4-a246-138fd90c99ff',schemaCaption: "Edit page - User", parentSchemaName: "UserPageV2WebitelCollaborations", schemaName:'UserPageV2',parentSchemaUId:'80ad2968-077f-478e-b60b-648d0c2f9db9',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserPageV2WebitelCollaborations",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserPageV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserPageV2UIv2", ["UserPageV2Resources", "BusinessRuleModule", "ConfigurationConstants", "ViewUtilities",
		"RightUtilities", "css!AdministrationCSSV2"],
	function(resources, BusinessRuleModule, ConfigurationConstants, ViewUtilities, RightUtilities) {
		return {
			entitySchemaName: "VwSysAdminUnit",
			messages: {

				/**
				 * ######## ####### # ############# ###### ######### ## ############ #####.
				 */
				"NeedActualizeRoles": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetChiefId
				 * ############ ### ######## ############## ####### #### ############.
				 */
				"GetChiefId": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SetRecordInformation
				 * ########## ######, ######### ## ####### ######### # ############ ####### ###### #
				 * #### ########### ######.
				 */
				"SetRecordInformation": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateSectionGrid
				 * ######## ####### # ############# ############# ######, ##### ######## ########.
				 * ############## ####### #######
				 */
				"UpdateSectionGrid": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			details: /**SCHEMA_DETAILS*/{
				SysAdminUnitIPRangeDetailV2: {
					schemaName: "SysAdminUnitIPRangeDetailV2",
					filter: {
						masterColumn: "Id"
					}
				},
				SessionDetailV2: {
					schemaName: "SessionDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "SysUser"
					}
				},
				SysFuncRoleInUserDetailV2: {
					schemaName: "SysFuncRoleInUserDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "SysUser"
					}
				},
				SysOrgRoleInUserDetailV2: {
					schemaName: "SysOrgRoleInUserDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "SysUser"
					}
				},
				SysAdminUnitGrantedRightDetailV2: {
					schemaName: "SysAdminUnitGrantedRightDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "GrantorSysAdminUnit"
					},
					filterMethod: "getSysAdminUnitGrantedRightDetailV2Filters"
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "CardContentContainer",
					"values": {
						"wrapClass": ["UserPageV2", "center-main-container"]
					}
				},
				{
					"operation": "remove",
					"name": "ESNTab"
				},
				{
					"operation": "remove",
					"name": "actions"
				},
				{
					"operation": "remove",
					"name": "ViewOptionsButton"
				},
				{
					"operation": "insert",
					"name": "DeleteButton",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.DeleteButtonCaption"},
						"classes": {"textClass": "actions-button-margin-right"},
						"click": {"bindTo": "onDeleteClick"}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PhotoContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["image-edit-container"],
						"layout": {"column": 0, "row": 0, "rowSpan": 3, "colSpan": 1},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "PhotoContainer",
					"propertyName": "items",
					"name": "Photo",
					"values": {
						"getSrcMethod": "getSrcMethod",
						"onPhotoChange": "onPhotoChange",
						"beforeFileSelected": "beforeFileSelected",
						"readonly": true,
						"defaultImage": this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPhoto),
						"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
					}
				},
				{
					"operation": "insert",
					"name": "GeneralInfoTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0,
					"values": {
						"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1,
					"name": "RolesTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.RolesTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "RolesTab",
					"propertyName": "items",
					"name": "SysOrgRoleInUserDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "RolesTab",
					"propertyName": "items",
					"name": "SysFuncRoleInUserDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2,
					"name": "LicenseTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SysLicUserTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 3,
					"name": "GrantedRightsTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.GrantedRightsTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GrantedRightsTab",
					"propertyName": "items",
					"name": "SysAdminUnitGrantedRightDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 4,
					"name": "AccessRulesTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AccessRulesTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AccessRulesTab",
					"propertyName": "items",
					"name": "SysAdminUnitIPRangeDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "SessionSettingsGroup",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.SessionGroupCaption"
						}
					},
					"parentName": "AccessRulesTab",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SessionTimeout",
					"parentName": "SessionSettingsGroup",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"caption": {
							"bindTo": "Resources.Strings.SessionTimeoutTitle"
						},
						"value": {"bindTo": "SessionTimeout"}
					}
				},
				{
					"operation": "insert",
					"parentName": "AccessRulesTab",
					"propertyName": "items",
					"name": "SessionDetailV2",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"value": {"bindTo": "Contact"},
						"layout": {"column": 1, "row": 0, "colSpan": 11}
					}
				},
				{
					"operation": "insert",
					"name": "SysCulture",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.ENUM,
						"value": {"bindTo": "SysCulture"},
						"layout": {"column": 13, "row": 0, "colSpan": 8}
					}
				},
				{
					"operation": "insert",
					"name": "UserConnectionType",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.ENUM,
						"caption": {"bindTo": "Resources.Strings.TypeCaption"},
						"value": {"bindTo": "UserConnectionType"},
						"enabled": { "bindTo": "ActiveAllPortalUsersGroup" },
						"layout": {"column": 1, "row": 1, "colSpan": 11}
					}
				},
				{
					"operation": "insert",
					"name": "HomePage",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"value": {"bindTo": "HomePage"},
						"layout": {"column": 13, "row": 1, "colSpan": 8}
					}
				},
				{
					"operation": "insert",
					"name": "Active",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {"column": 1, "row": 2, "colSpan": 11}
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeFormat",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"value": {"bindTo": "DateTimeFormat"},
						"layout": {"column": 13, "row": 2, "colSpan": 8}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"name": "AuthControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.AuthControlGroupCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "LicenseTab",
					"name": "LicenseControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.SysLicUserTabCaption"},
						"items": [],
						"tools": [],
						"controlConfig": {
							"collapsed": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "ToolsButton",
					"parentName": "LicenseControlGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.ToolsButtonImage"},
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"wrapperClass": ["license-tools-button-wrapper", "license-t-btn-wrapper"],
							"menuClass": ["license-tools-button-menu"]
						},
						"menu": []
					}
				},
				{
					"operation": "insert",
					"name": "CheckAllLicenses",
					"parentName": "ToolsButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.CheckLicensesCaption"},
						"click": {"bindTo": "onCheckAllLicenses"},
						"enabled": {"bindTo": "Active"}
					}
				},
				{
					"operation": "insert",
					"name": "UncheckAllLicenses",
					"parentName": "ToolsButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.UncheckLicensesCaption"},
						"click": {"bindTo": "onUncheckAllLicenses"},
						"enabled": {"bindTo": "Active"}
					}
				},
				{
					"operation": "insert",
					"name": "LicenseList",
					"parentName": "LicenseControlGroup",
					"propertyName": "items",
					"values": {
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "LicenseCollection",
						"observableRowNumber": 15,
						"onGetItemConfig": "getItemViewConfig",
						"dataItemIdPrefix": "lic-item"
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthControlGroup",
					"name": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Name",
					"parentName": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"caption": {"bindTo": "Resources.Strings.UserNameCaption"},
						"value": {"bindTo": "Name"},
						"layout": {"column": 0, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"name": "UserPassword",
					"parentName": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"id": "new-password",
						"selectors": {"wrapEl": "#new-password"},
						"caption": {"bindTo": "Resources.Strings.PasswordCaption"},
						"value": {"bindTo": "UserPassword"},
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"controlConfig": {
							"protect": true,
							"keyup": {
								"bindTo": "onNewPasswordKeypress"
							}
						},
						"isRequired": {bindTo: "isRequiredFieldsVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "PasswordConfirmation",
					"parentName": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"id": "new-password-confirmation",
						"selectors": {"wrapEl": "#new-password-confirmation"},
						"value": {"bindTo": "PasswordConfirmation"},
						"caption": {"bindTo": "Resources.Strings.PasswordConfirmationCaption"},
						"layout": {"column": 0, "row": 2, "colSpan": 12},
						"controlConfig": {
							"protect": true,
							"keyup": {
								"bindTo": "onNewPasswordConfirmationKeypress"
							}
						},
						"isRequired": {bindTo: "isRequiredFieldsVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "PasswordExpireDate",
					"parentName": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.DATE,
						"value": {"bindTo": "PasswordExpireDate"},
						"layout": {"column": 0, "row": 3, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"name": "ForceChangePassword",
					"parentName": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 12}
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				/**
				 * User password.
				 */
				"UserPassword": {
					dataValueType: this.Terrasoft.DataValueType.TEXT
				},
				/**
				 * Password confirmation.
				 */
				"PasswordConfirmation": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.PasswordConfirmationCaption
				},
				/**
				 * Stores value of system setting "MaxPasswordAge".
				 */
				"PasswordDuration": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Current user contact.
				 */
				"Contact": {
					lookupListConfig: {
						columns: ["Photo"],
						orders: [{columnPath: "Name"}],
						filter: function() {
							var filterGroup = this.Terrasoft.createFilterGroup();
							var notExistsFilter = this.Terrasoft.createNotExistsFilter("[SysAdminUnit:Contact].Id");
							filterGroup.addItem(notExistsFilter);
							return filterGroup;
						}
					},
					isRequired: true
				},
				/**
				 * Home page.
				 */
				"HomePage": {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				/**
				 * Password expire date.
				 */
				"PasswordExpireDate": {
					dependencies: [{
						columns: ["PasswordConfirmation"],
						methodName: "onPasswordConfirmationChanged"
					}]
				},
				/**
				 * User connection type.
				 */
				"UserConnectionType": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						filter: function() {
							var filterGroup = this.Terrasoft.createFilterGroup();
							filterGroup.add("UserValue",
								Terrasoft.createColumnInFilterWithParameters(
									"Value", [
									ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees,
									ConfigurationConstants.SysAdminUnit.ConnectionType.PortalUsers
								]));
							return filterGroup;
						}
					},
					dependencies: [{
						columns: ["UserConnectionType"],
						methodName: "onUserConnectionTypeChanged"
					}],
					isRequired: true
				},
				/**
				 * Value of connection type.
				 */
				"ConnectionType": {
					dependencies: [{
						columns: ["UserConnectionType"],
						methodName: "setConnectionTypeFromUserConnectionType"
					}]
				},
				/**
				 * User culture.
				 */
				"SysCulture": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					isRequired: true
				},
				/**
				 * Date time format.
				 */
				"DateTimeFormat": {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				/**
				 * License collection.
				 */
				"LicenseCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION
				},
				/**
				 * Determines if user is active.
				 */
				"Active": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Determines if user has license managing right.
				 */
				"CanManageLicUsers": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Determines if licenses were loaded.
				 */
				"IsLicenseDataLoaded": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Current vertical grid record connectionType.
				 */
				"CurrentFolderConnectionType": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Determines if `All Portal Users` role is active.
				 */
				"ActiveAllPortalUsersGroup": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Previous value of user connection type.
				 */
				"PrevUserConnectionType": {
					dataValueType: this.Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			rules: {
				"Contact": {
					"BindParameterEnabledContact": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"logical": this.Terrasoft.LogicalOperatorType.OR,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Operation"
								},
								"comparisonType": this.Terrasoft.core.enums.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": this.Terrasoft.ConfigurationEnums.CardOperation.ADD
								}
							},
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "CurrentFolderConnectionType"
								},
								"comparisonType": this.Terrasoft.core.enums.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.UserType.SSP
								}
							}
						]
					}
				},
				"PasswordExpireDate": {
					"BindParameterEnabledPasswordExpireDate": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "PasswordDuration"
								},
								"comparisonType": this.Terrasoft.ComparisonType.GREATER,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": 0
								}
							}
						]
					}
				}
			},
			methods: {

				/**
				 * Set ConnectionType from UserConnectionType.
				 */
				setConnectionTypeFromUserConnectionType: function() {
					this.$ConnectionType =
						this.$UserConnectionType.value === ConfigurationConstants.SysAdminUnit.ConnectionTypeGuid.AllEmployees
							? ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees
							: ConfigurationConstants.SysAdminUnit.ConnectionType.PortalUsers;
				},

				/**
				 * Return true if previous value of UserConnectionType equals value of UserConnectionType.
				 * @returns {bool} true, if previous value of UserConnectionType equals UserConnectionType,
				 * else - false.
				 */
				isPrevUserConnectionTypeEqualUserConnectionType: function() {
					return this.$UserConnectionType && this.$PrevUserConnectionType &&
						this.$PrevUserConnectionType.value === this.$UserConnectionType.value;
				},

				/**
				 * Raises the onchange event for UserConnectionType.
				 */
				onUserConnectionTypeChanged: function() {
					if (this.isAddMode() || this.isPrevUserConnectionTypeEqualUserConnectionType()) {
						return {};
					}
					this.showConfirmationDialog(this.get("Resources.Strings.ChangeUserConnectionTypeMessage"),
						function(returnCode) {
							if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
								this.setUserConnectionType(this.$PrevUserConnectionType);
								return;
							}
							this.setPrevUserConnectionType();
							this.showBodyMask();
							this.changeUserConnectionType();
						},
						[
							this.Terrasoft.MessageBoxButtons.NO.returnCode,
							this.Terrasoft.MessageBoxButtons.YES.returnCode
						],
						null
					);
				},

				/**
				 * Send query of change UserConnectionType to server.
				 */
				changeUserConnectionType: function() {
					var dataSend = {
						userId: this.$Id,
						connectionType: this.$ConnectionType
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: this.getChangeUserConnectionTypeMethodName(),
						data: dataSend
					};
					this.callService(config, this.onChangeUserConnectionType, this);
				},

				/**
				 * Callback-function on query of changing UserConnectionType.
				 * @param {} response ##### #######.
				 */
				onChangeUserConnectionType: function(response) {
					var result = this.Ext.decode(response[this.getChangeUserConnectionTypeMethodName() + "Result"]);
					response.message = result.ExceptionMessage;
					response.success = result.Success;
					this.reloadEntity();
					this.validateResponse(response);
					this.hideBodyMask();
				},

				/**
				 * Get name of method of changing UserConnectionType.
				 * @returns {string} ######## ######.
				 */
				getChangeUserConnectionTypeMethodName: function() {
					return "ChangeUserConnectionType";
				},

				/**
				 * Filter for detail SysAdminUnitGrantedRightDetailV2.
				 * @protected
				 * @return {Terrasoft.FilterGroup} ########## ###### ########.
				 */
				getSysAdminUnitGrantedRightDetailV2Filters: function() {
					var filters = this.Terrasoft.createFilterGroup();
					filters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "GrantorSysAdminUnit.Id", this.get("Id")));
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "GranteeSysAdminUnit.Id", this.get("Id")));
					return filters;
				},

				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * @protected
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.setUserDefaultValues();
					this.changeColumnCaption("Name", this.get("Resources.Strings.UserNameCaption"));
					this.callParent(arguments);
				},

				/**
				 * ############# ### ####### ##### ######## #########.
				 * @param {String} columnName ######## ####### #######.
				 * @param {String} columnCaption ######### ####### #######.
				 */
				changeColumnCaption: function(columnName, columnCaption) {
					var column = this.getColumnByName(columnName);
					column.caption = columnCaption;
				},

				/**
				 * Set specified value of UserConnectionType.
				 * @protected
				 */
				setUserConnectionType: function(value) {
					value = value || ConfigurationConstants.SysAdminUnit.ConnectionTypeGuid.AllEmployees;
					this.$UserConnectionType = value;
				},

				/**
				 * Initialize attributes of activity for `All Portal Users` role.
				 */
				initializeActivityAllPortalUsers: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "SysAdminUnit"});
					esq.addColumn("Active");
					esq.getEntity(ConfigurationConstants.SysAdminUnit.Id.PortalUsers, function(data) {
						if (data && data.success && data.entity) {
							this.$ActiveAllPortalUsersGroup = data.entity.values.Active;
						}
					}, this);
				},

				/**
				 * Return true if connection type equals General.
				 * @returns {bool} true, if connection type equals General else - false.
				 */
				isGeneralConnection: function(connectionType) {
					return connectionType === 0;
				},

				/**
				 * Set UserConnectionType to PrevUserConnectionType.
				 */
				setPrevUserConnectionType: function() {
					this.$PrevUserConnectionType = this.$UserConnectionType;
				},

				/**
				 * ############# ######## ## ######### ### ##### viewModel.
				 * @protected
				 */
				setUserDefaultValues: function() {
					this.$ActiveAllPortalUsersGroup = false;
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "SysAdminUnit"});
					esq.addColumn("Active");
					var currentConnectionType = this.$ConnectionType;
					var connectionType = this.Ext.isEmpty(currentConnectionType)
						? this.$CurrentFolderConnectionType
						: currentConnectionType;
					if (this.isAddMode()) {
						var userConnectionType;
						if (this.isGeneralConnection(connectionType)) {
							userConnectionType = this.createLookupValue(
								ConfigurationConstants.SysAdminUnit.ConnectionTypeGuid.AllEmployees,
								this.get("Resources.Strings.OurCompanyUserCaption"));
						}
						else {
							userConnectionType = this.createLookupValue(
								ConfigurationConstants.SysAdminUnit.ConnectionTypeGuid.PortalUsers,
								this.get("Resources.Strings.PortalUserCaption"));
						}
						this.setUserConnectionType(userConnectionType);
						this.$SysAdminUnitType = ConfigurationConstants.SysAdminUnit.TypeGuid.User;
					} else {
						var passwordMask = this.get("Resources.Strings.PasswordMask");
						this.set("UserPassword", passwordMask);
						this.set("PasswordConfirmation", passwordMask);
						this.setPrevUserConnectionType();
						this.changedValues = {};
						esq.getEntity(ConfigurationConstants.SysAdminUnit.Id.PortalUsers, function(data) {
							if (data && data.success && data.entity) {
								this.$ActiveAllPortalUsersGroup = data.entity.values.Active;
							}
						}, this);
					}
				},

				/**
				 * Create value of lookup.
				 * @param value Value of lookup.
				 * @param displayValue Display value of lookup.
				 * @returns {{value: *, displayValue: *}} value of lookup.
				 */
				createLookupValue: function(value, displayValue) {
					return {
						value: value,
						displayValue: displayValue
					};
				},

				/**
				 * ####### ####### ######### ######### ##############.
				 * @protected
				 * @param {Object} config ###### ###### ######## ##############.
				 * @return {Terrasoft.BaseViewModel} ####### ######### ######### ##############.
				 */
				getLicenseCollectionItem: function(config) {
					var licText;
					if (config.Type === ConfigurationConstants.SysAdminUnit.SysLicType.Server) {
						licText = this.Ext.String.format(
								this.get("Resources.Strings.ServerLicAvailableCountCaption"), config.UsedCount);
					} else {
						licText = this.Ext.String.format(
								this.get("Resources.Strings.LicAvailableCountCaption"),
								config.AvailableCount, config.PaidCount);
					}
					var collectionItem = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: config.Id,
							Name: config.Caption,
							Checked: config.Checked,
							Enabled: config.Enabled,
							AvailableCount: config.AvailableCount,
							PaidCount: config.PaidCount,
							AvailableCountCaption: licText
						}
					});
					collectionItem.sandbox = this.sandbox;
					return collectionItem;
				},

				/**
				 * ########## ######### ######## ######## # ###### ########.
				 * @private
				 */
				onCheckChange: function() {
					if (this.get("IsLicenseDataLoaded")) {
						if (this.get("ModifyAllLicenses")) {
							this.updateButtonsVisibility(true);
							this.set("IsChanged", true, {silent: true});
							this.set("Restored", true, {silent: true});
						} else if (this.isEditMode()) {
							this.save({isSilent: true});
						}
					}
				},

				/**
				 * ######## ### ########.
				 * @protected
				 */
				onCheckAllLicenses: function() {
					this.modifyAllLicenses(true);
				},

				/**
				 * ####### ### ########.
				 * @protected
				 */
				onUncheckAllLicenses: function() {
					this.modifyAllLicenses(false);
				},

				/**
				 * ############### ######### ######### ##############.
				 * @private
				 */
				initCollection: function() {
					var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					collection.on("itemChanged", this.onCheckChange, this);
					this.set("LicenseCollection", collection);
				},

				/**
				 * ######## ######## ######### ######### LicenseCollection.
				 * @param {Boolean} checked ####### ######.
				 * @param {Boolean=} enabled ####### ########### ######## ##########.
				 */
				modifyAllLicenses: function(checked, enabled) {
					var collection = this.get("LicenseCollection");
					this.set("ModifyAllLicenses", true);
					collection.each(function(model) {
						model.set("Checked", checked);
						if (!this.Ext.isEmpty(enabled)) {
							model.set("Enabled", enabled);
						}
					}, this);
					this.set("ModifyAllLicenses", false);
				},

				/**
				 * ######## ###### ######### ##############, ############## ## #######.
				 * @protected
				 * @param {Function=} callback ####### ######### ######.
				 * @param {Object=} scope ######## ####### ######### ######.
				 */
				getAvailableLicenses: function(callback, scope) {
					var userId = this.isAddMode()
						? this.Terrasoft.GUID_EMPTY
						: (this.get("PrimaryColumnValue") || this.get(this.entitySchema.primaryColumnName));
					var dataSend = {
						userId: userId
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "GetAvailableLicPackages",
						data: dataSend
					};
					this.set("IsLicenseDataLoaded", false);
					this.showMaskOnLicenses();
					this.callService(config, function(response) {
						this.onGetAvailableLicenses(response, callback, scope);
					}, this);
				},

				/**
				 * ######### ######### ######### ##############.
				 * @protected
				 * @param {Object} response ##### #######.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Terrasoft.BaseViewModel} scope ######## ####### ######### ######.
				 */
				onGetAvailableLicenses: function(response, callback, scope) {
					var collection = this.get("LicenseCollection");
					collection.clear();
					if (response && response.GetAvailableLicPackagesResult) {
						var items = this.Ext.decode(response.GetAvailableLicPackagesResult);
						this.Terrasoft.each(items, function(item) {
							var licenseItem = this.getLicenseCollectionItem(item);
							collection.add(item.Id, licenseItem);
						}, this);
					}
					this.set("IsLicenseDataLoaded", true);
					this.hideMaskOnLicenses();
					if (this.Ext.isFunction(callback)) {
						callback.call(scope);
					}
				},

				/**
				 * ########## ##### ### ###### ########.
				 * @private
				 */
				showMaskOnLicenses: function() {
					var maskConfig = {
						selector: "#LicenseListContainerList",
						timeout: 0
					};
					var elements = this.Ext.select(maskConfig.selector);
					if (elements.item(0)) {
						this.licenseListMaskId = this.Terrasoft.Mask.show(maskConfig);
					}
				},

				/**
				 * ######## ##### ### ###### ########.
				 * @private
				 */
				hideMaskOnLicenses: function() {
					this.Terrasoft.Mask.hide(this.licenseListMaskId);
				},

				/**
				 * ######### viewConfig ### ######## ###### ######### ##############.
				 * @param {Object} itemConfig viewConfig ######## ##########.
				 * @param {Terrasoft.BaseViewModel} item ####### ###### ######### ##############.
				 */
				getItemViewConfig: function(itemConfig, item) {
					var labelClass = ["license-label"];
					if (!item.get("Enabled")) {
						labelClass.push("disabled-label");
					}
					var config = ViewUtilities.getContainerConfig("license-view");
					var labelConfig = {
						className: "Terrasoft.Label",
						caption: {bindTo: "Name"},
						classes: {labelClass: labelClass},
						inputId: item.get("Id") + "-el"
					};
					var editConfig = {
						className: "Terrasoft.CheckBoxEdit",
						id: item.get("Id"),
						checked: {bindTo: "Checked"},
						enabled: {bindTo: "Enabled"}
					};
					var countConfig = {
						className: "Terrasoft.Label",
						caption: {bindTo: "AvailableCountCaption"},
						classes: {labelClass: labelClass.concat(["count-label"])}
					};
					config.items.push(labelConfig, editConfig, countConfig);
					itemConfig.config = config;
				},

				/**
				 * @inheritDoc BasePageV2#getHeader
				 * @protected
				 * @overridden
				 */
				getHeader: function() {
					return this.get("Resources.Strings.UserPageHeader");
				},

				/**
				 * ########## ######### # ######## ###########.
				 * @protected
				 */
				onPhotoChange: this.Terrasoft.emptyFn,

				/**
				 * ########## ##### ####### ########### #### ###### #####.
				 * @protected
				 */
				beforeFileSelected: this.Terrasoft.emptyFn,

				/**
				 * ######## ###### ## ###########.
				 * @protected
				 * @return {String|*} Url ###########.
				 */
				getSrcMethod: function() {
					var contact = this.get("Contact");
					if (contact && contact.Photo) {
						var imageConfig = {
							source: this.Terrasoft.ImageSources.SYS_IMAGE,
							params: {
								primaryColumnValue: contact.Photo.value
							}
						};
						return this.Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
					}
					return this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPhoto);
				},

				/**
				 * ########## ######### #### "############# ######".
				 * #### ###### ######### ######### "#### ######## ######", ########## #### "#### #########
				 * ######## ######" ########, ###### ####### #### + ########## ####, ######### # #########
				 * #########.
				 * @protected
				 */
				onPasswordConfirmationChanged: function() {
					var password = this.get("UserPassword");
					var passwordDuration = this.get("PasswordDuration");
					if (!this.Ext.isEmpty(password) && password === this.get("PasswordConfirmation") &&
						passwordDuration > 0) {
						var passwordExpireDate = this.Ext.Date.add(new Date(), this.Ext.Date.DAY, passwordDuration);
						passwordExpireDate = this.Ext.Date.clearTime(passwordExpireDate);
						this.set("PasswordExpireDate", passwordExpireDate);
					}
				},

				/**
				 * ############## ################ ######### ### #### "############# ######".
				 * @inheritDoc BaseSchemaViewModel#setValidationConfig
				 * @protected
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("PasswordConfirmation", function(newPasswordConfirmation) {
						var password = this.get("UserPassword");
						var invalidMessage = "";
						if (!this.Ext.isEmpty(password) && !this.get("SynchronizeWithLDAP")) {
							if (password !== newPasswordConfirmation) {
								invalidMessage = this.get("Resources.Strings.PasswordMissMatchMessageCaption");
							}
						}
						return {
							fullInvalidMessage: invalidMessage,
							invalidMessage: invalidMessage
						};
					});
					this.addColumnValidator("UserPassword", function() {
						var password = this.get("UserPassword");
						var invalidMessage = "";
						if (this.Ext.isEmpty(password) && !this.get("SynchronizeWithLDAP")) {
							invalidMessage = this.get("Resources.Strings.SpecifyPasswordMessage");
						}
						return {
							fullInvalidMessage: invalidMessage,
							invalidMessage: invalidMessage
						};
					});
				},

				/**
				 * ######## ######## ######### ######### PasswordDuration.
				 * @protected
				 * @param {String} settingCode ### ######### #########.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				initSysSettingsValue: function(settingCode, callback, scope) {
					this.Terrasoft.SysSettings.querySysSettingsItem(settingCode,
						function(value) {
							this.set(settingCode, value);
							if (this.Ext.isFunction(callback)) {
								callback.call(scope);
							}
						},
						this);
				},

				/**
				 * ######### ######## ## ####### GetChiefId # SetRecordInformation.
				 * @protected
				 */
				publishMessages: function() {
					var result = this.sandbox.publish("GetChiefId", {}, [this.sandbox.id]);
					if (this.Ext.isEmpty(result)) {
						result = this.sandbox.publish("SetRecordInformation", {}, [this.sandbox.id]);
					}
					if (!this.Ext.isEmpty(result)) {
						this.set("Parent", result.parent);
						var connectionType = this.getConnectionType(result.defaultValues);
						this.set("CurrentFolderConnectionType", this.Ext.isEmpty(connectionType)
							? null
							: connectionType.value);
					}
				},

				/**
				 * ## ####### ######## ## ######### ########## ######## # ###### "ConnectionType" ### null.
				 * @param {Array} defaultValues ######### ######## ## ######### ###### "############".
				 * @return {Object} ### ############ ### null, #### ### ############ ## ###### ##### ########
				 * ## #########.
				 */
				getConnectionType: function(defaultValues) {
					var result = null;
					this.Terrasoft.each(defaultValues, function(value) {
						if (value.name === "ConnectionType") {
							result = value;
						}
					});
					return result;
				},

				/**
				 * ######### ######### # ############# ######## ########### ###### #######.
				 * @protected
				 */
				publishUpdateSectionGrid: function() {
					if (this.isAddMode()) {
						this.sandbox.publish("UpdateSectionGrid");
					}
				},

				/**
				 * #########, #### ## # ############ ##### ## ########## ########## ########
				 * ######## CanManageLicUsers.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				checkCanManageLicUsers: function(callback, scope) {
					RightUtilities.checkCanExecuteOperation({
						operation: "CanManageLicUsers"
					}, function(result) {
						this.set("CanManageLicUsers", result);
						if (this.Ext.isFunction(callback)) {
							callback.call(scope);
						}
					}, this);
				},

				/**
				 * @inheritDoc BasePageV2#init
				 * @protected
				 * @overridden
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				init: function(callback, scope) {
					this.callParent([
						function() {
							this.publishMessages();
							this.initCollection();
							this.Terrasoft.chain(
								function(next) {
									this.getAvailableLicenses(function() {
										next();
									}, this);
								},
								function(next) {
									this.initSysSettingsValue("PasswordDuration", function() {
										next();
									}, this);
								},
								function(next) {
									this.initSysSettingsValue("AccountTypeForOurCompany", function() {
										next();
									}, this);
								},
								function(next) {
									this.checkCanManageLicUsers(function() {
										next();
									}, this);
								},
								function(next) {
									callback.call(scope);
									next();
								},
								this);
						}, this
					]);
				},

				/**
				 * @inheritDoc BasePageV2#updateDetails
				 * @overridden
				 */
				updateDetails: function() {
					this.callParent(arguments);
					this.getAvailableLicenses();
				},

				/**
				 * @inheritDoc BasePageV2#fireDiscardChangesEvent
				 * @protected
				 * @overridden
				 */
				fireDiscardChangesEvent: function() {
					var entityInfo = this.onGetEntityInfo();
					this.sandbox.publish("DiscardChanges", entityInfo);
				},

				/**
				 * @inheritDoc BasePageV2#onDiscardChangesClick
				 * @protected
				 * @overridden
				 */
				onDiscardChangesClick: function() {
					if (this.isNew) {
						this.sandbox.publish("BackHistoryState");
						return;
					}

					this.set("IsEntityInitialized", false);
					this.loadEntity(this.get("Id"), function() {
						this.discardPasswordChanges();
						this.resetLicensesCollection();
						this.updateButtonsVisibility(false, {
							force: true
						});
						this.set("IsEntityInitialized", true);
						this.discardDetailChange();
					}, this);
					if (this.get("ForceUpdate")) {
						this.set("ForceUpdate", false);
					}
				},

				/**
				 * ########## #### "######" # "############# ######" # ## ######### ##-#########.
				 */
				discardPasswordChanges: function() {
					var info = {
						invalidMessage: "",
						isValid: true
					};
					this.set("UserPassword", this.get("Resources.Strings.PasswordMask"),
						{preventValidation: true});
					this.set("PasswordConfirmation", this.get("UserPassword"),
						{preventValidation: true});
					this.validationInfo.set("UserPassword", info);
					this.validationInfo.set("PasswordConfirmation", info);
					this.changedValues = {};
				},

				/**
				 * ############### ######## ## ######### ### ######### ########.
				 * @private
				 */
				resetLicensesCollection: function() {
					var collection = this.get("LicenseCollection");
					this.set("ModifyAllLicenses", true);
					collection.each(function(model) {
						if (model.getIsChanged()) {
							model.set("Checked", model.values.Checked);
							model.set("Enabled", model.values.Enabled);
						}
					}, this);
					this.set("ModifyAllLicenses", false);
				},

				/**
				 * #########, ########## ## #### ####### ########, ####### ########### #### "############# ######".
				 * ####### ########## ###### ## ######### ########### ####.
				 * @protected
				 * @overridden
				 * @return {Boolean} ########## true #### #### ######### # ######### ####### ##### ########,
				 * false - # ######## ######
				 */
				isChanged: function() {
					var result = this.callParent(arguments);
					return result || !this.Ext.isEmpty(this.changedValues.PasswordConfirmation);
				},

				/**
				 * #### ### ####### ######, ##### ######### ######### ###### ## ####### ##### #####
				 * ###### ValidatePassword # Terrasoft.Core.PasswordUtilities.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				validatePassword: function(callback, scope) {
					var result = {
						success: true
					};
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.UserPassword)) {
						callback.call(scope || this, result);
					} else {
						var dataSend = {
							userName: this.get("Name"),
							password: this.get("UserPassword")
						};
						var config = {
							serviceName: "AdministrationService",
							methodName: "ValidatePassword",
							data: dataSend
						};
						this.callService(config, function(response) {
							if (response) {
								if (!this.Ext.isEmpty(response.ValidatePasswordResult)) {
									result.message = response.ValidatePasswordResult;
									result.success = false;
								}
								callback.call(scope || this, result);
							}
						});
					}
				},

				/**
				 * ######## ################ ###### AdministrationService
				 * ### ########## ################ ########.
				 * @param {Function} next
				 */
				saveLicenses: function(next) {
					var licenseItems = {};
					var collection = this.get("LicenseCollection");
					collection.each(function(model) {
						if (this.isAddMode() || model.getIsChanged()) {
							licenseItems[model.get("Id")] = model.get("Checked");
						}
					}, this);
					if (this.Terrasoft.isEmptyObject(licenseItems)) {
						this.cardSaveResponse = {success: true};
						next();
					} else {
						var dataSend = {
							userId: this.get("Id"),
							licenseItems: this.Ext.encode(licenseItems)
						};
						var config = {
							serviceName: "AdministrationService",
							methodName: this.getSaveLicensesMethodName(),
							data: dataSend
						};
						this.callService(config, function(response) {
							this.onSaveLicenses(response, next);
						}, this);
					}
				},

				/**
				 * Returns save license method name
				 * @protected
				 * @return {String} Method name.
				 */
				getSaveLicensesMethodName: function() {
					return "UpdateLicenseInfo";
				},

				/**
				 * ######### ############# ########## ######## ############.
				 * @param {Object} response ##### #######.
				 * @param {Function} next ######### ##### # #######.
				 */
				onSaveLicenses: function(response, next) {
					if (response) {
						response.message = response[this.getSaveLicensesMethodName() + "Result"];
						response.success = this.Ext.isEmpty(response.message);
						if (this.validateResponse(response)) {
							this.cardSaveResponse = response;
							next();
						} else {
							this.getAvailableLicenses();
						}
					}
				},

				/**
				 * Call configuration service AdministrtionService for save user..
				 * @param {Function} next
				 */
				saveUser: function(next) {
					var changedColumns = {};
					this.Terrasoft.each(this.entitySchema.columns,
						function(column) {
							if (this.changedValues.hasOwnProperty(column.name)) {
								var columnValue = this.get(column.name);
								if (columnValue) {
									columnValue = columnValue.value || columnValue;
								}
								changedColumns[column.name] = columnValue;
							}
						}, this);
					if (this.Terrasoft.isEmptyObject(changedColumns)) {
						this.cardSaveResponse = {success: true};
						next();
					} else {
						if (this.Ext.isEmpty(changedColumns.Id)) {
							changedColumns.Id = this.get("Id");
						}
						var dataSend = {
							jsonObject: this.Ext.encode(changedColumns),
							roleId: this.get("Parent")
						};
						var config = {
							serviceName: "AdministrationService",
							methodName: this.getSaveUserMethodName(),
							data: dataSend
						};
						this.callService(config, function(response) {
							this.onSaveUser(response, next);
						}, this);
					}
				},

				/**
				 * Returns save user method name
				 * @protected
				 * @return {String} Method name.
				 */
				getSaveUserMethodName: function() {
					return "UpdateOrCreateUser";
				},

				/**
				 * ######### ############# ##########.
				 * @param {Object} response ##### #######.
				 * @param {Function} next ######### ##### # #######.
				 */
				onSaveUser: function(response, next) {
					if (response) {
						response.message = response[this.getSaveUserMethodName() + "Result"];
						response.success = this.Ext.isEmpty(response.message);
						if (this.validateResponse(response)) {
							this.isNew = false;
							this.changedValues = null;
							this.cardSaveResponse = response;
							next();
						}
					}
				},

				/**
				 * ######### ########## ############.
				 * @overridden
				 * @param {Object} config
				 */
				save: function(config) {
					this.showBodyMask();
					this.Terrasoft.chain(
						this.saveCheckCanEditRight,
						this.saveAsyncValidate,
						this.saveUser,
						this.saveLicenses,
						function(next) {
							this.saveDetails(function(response) {
								if (this.validateResponse(response)) {
									next();
								}
							}, this);
						},
						function() {
							this.onSaved(this.cardSaveResponse, config);
							this.cardSaveResponse = null;
							delete this.cardSaveResponse;
						},
						this);
				},

				/**
				 * @inheritDoc BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					if (this.isEditMode()) {
						this.getAvailableLicenses();
					}
				},

				/**
				 * ######### ######### # ############# ######### ############ #####.
				 */
				publishNeedActualizeRolesMessage: function() {
					this.sandbox.publish("NeedActualizeRoles");
				},

				/**
				 * ######### ######## ##### ############ ## ############.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				validateUniqueUserName: function(callback, scope) {
					var result = {
						success: true
					};
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Name)) {
						callback.call(scope || this, result);
					} else {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: this.entitySchemaName
						});
						esq.addColumn("Id");
						var primaryColumnValue = this.get("PrimaryColumnValue");
						if (!Ext.isEmpty(primaryColumnValue)) {
							esq.filters.add("primaryColumnFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", primaryColumnValue));
						}
						esq.filters.add("nameFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Name", this.get("Name")));
						esq.getEntityCollection(function(response) {
							if (response && response.success) {
								if (response.collection.getCount() > 0) {
									result.message = this.get("Resources.Strings.UserNameNotUnique");
									result.success = false;
								}
								callback.call(scope || this, result);
							}
						}, this);
					}
				},

				/**
				 * @inhericDoc BasePageV2#asyncValidate
				 * @protected
				 * @overridden
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						this.Terrasoft.chain(
							function(next) {
								this.validatePassword(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
							function(next) {
								this.validateUniqueUserName(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
							function(next) {
								callback.call(scope, response);
								next();
							}, this);
					}, this]);
				},

				/**
				 * ########## ##### # #### "######".
				 * ######### ######## ##### ## ############ # ########## UserPassword.
				 * ### ########## ### ####, ##### ######### ###### ########### ###########,
				 * # ## ###### ### ###### ######.
				 * @private
				 */
				onNewPasswordKeypress: function() {
					var newPasswordTextEdit = this.Ext.getCmp("new-password");
					var newPasswordInputValue = newPasswordTextEdit.getTypedValue();
					this.set("UserPassword", newPasswordInputValue);
					this.validate();
				},

				/**
				 * ##########, ##### #### "######" ######## #####.
				 * ####### ######## # ##### "######" # "############# ######".
				 * @private
				 */
				onPasswordGetFocus: function() {
					this.set("UserPassword", null, {preventValidation: true});
					this.set("PasswordConfirmation", null, {preventValidation: true});
				},

				/**
				 * ########## ##### # #### "############# ######".
				 * ######### ######## ##### ## ############ # ########## PasswordConfirmation.
				 * ### ########## ### ####, ##### ######### ###### ########### ###########,
				 * # ## ###### ### ###### ######.
				 * @private
				 */
				onNewPasswordConfirmationKeypress: function() {
					var newPasswordConfirmationTextEdit = this.Ext.getCmp("new-password-confirmation");
					var newPasswordConfirmationInputValue = newPasswordConfirmationTextEdit.getTypedValue();
					this.set("PasswordConfirmation", newPasswordConfirmationInputValue);
				},

				/**
				 * ############ ######## ######## isRequired.
				 * @protected
				 * @virtual
				 */
				isRequiredFieldsVisible: function() {
					return true;
				},

				/**
				 * ######### ###### # ############# ######## ##########.
				 * @protected
				 * @param {Object} args ########## ## ########### ######### ###### {action: "", rows: []}
				 */
				fireUpdateDetail: function(args) {
					this.sandbox.publish("UpdateDetail", args, [this.sandbox.id]);
				},

				/**
				 * @inheritDoc BasePageV2#onCloseCardButtonClick
				 * @protected
				 * @overridden
				 */
				onCloseCardButtonClick: function() {
					this.callParent(arguments);
					this.publishUpdateSectionGrid();
				},

				/**
				 * ######### ##### ####### # ######### ############ # ###### ####### ######.
				 * @protected
				 * @param {String} response ############ ##### #######
				 * @param {String} message ######### # ###### ######
				 * @param {Function} callback ####### ######### ###### # ###### ########## #######.
				 * @param {Object} scope  ######## ####### ######### ######.
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
				 * ######## ########### ##### ######## ############.
				 * @protected
				 */
				afterUserDeleted: function() {
					this.publishNeedActualizeRolesMessage();
					this.fireUpdateDetail({reloadAll: true});
					this.onCloseCardButtonClick();
				},

				/**
				 * ######### # ########## ######## ############ # ###### ######,
				 * ######### ###### "############" # ############# ########## #######
				 * # ######### ######## ### ######## ########.
				 * @param {Object} response ##### #######.
				 * @protected
				 */
				onDeleteUserResponseHandler: function(response) {
					var message = this.get("Resources.Strings.DeleteErrorMessage");
					var responseResult = response[this.getOnDeleteCurrentUserClickMethodName() + "Result"];
					this.validateServiceResponse(responseResult, message, this.afterUserDeleted, this);
				},

				/**
				 * ######## ###### ######## ############# # ######### ######## ### ######## ########.
				 * @protected
				 * @virtual
				 */
				onDeleteCurrentUserClick: function() {
					this.showConfirmationDialog(this.get("Resources.Strings.DeleteUserMessage"),
						function(returnCode) {
							if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
								return;
							}
							var dataSend = {userId: this.get("Id")};
							var config = {
								serviceName: "AdministrationService",
								methodName: this.getOnDeleteCurrentUserClickMethodName(),
								data: dataSend
							};
							this.showBodyMask();
							this.callService(config, this.onDeleteUserResponseHandler, this);
						},
						[
							this.Terrasoft.MessageBoxButtons.YES.returnCode,
							this.Terrasoft.MessageBoxButtons.NO.returnCode
						],
						null
					);
				},

				/**
				 * Returns delete user method name
				 * @protected
				 * @return {String} Method name.
				 */
				getOnDeleteCurrentUserClickMethodName: function() {
					return "DeleteUser";
				},

				/**
				 * ########## ###### "DeleteButton".
				 * @protected
				 * @virtual
				 */
				onDeleteClick: function() {
					this.onDeleteCurrentUserClick();
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

define('UserPageV2TranslationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserPageV2Translation", [],
	function() {
		return {
			entitySchemaName: "VwSysAdminUnit",
			messages: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "SysCulture",
					"values": {
						"controlConfig": {
							"prepareList": {"bindTo": "onPrepareSysCultureList"}
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				/**
				 * Culture list.
				 */
				"SysCultureList": {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				}
			},
			rules: {},
			methods: {

				/**
				 * @inheritDoc BasePageV2#init
				 * @protected
				 * @overridden
				 * @param {Function} callback Callback method.
				 * @param {Object} scope Callback method context.
				 */
				init: function(callback, scope) {
					this.callParent([
						function() {
							this.set("SysCultureList", this.Ext.create(Terrasoft.Collection));
							this.loadDefaultSysCultureValue(callback, scope);
						}, this
					]);
				},

				/**
				 * Load default culture if need.
				 * @protected
				 * @param {Function} callback Callback method.
				 * @param {Object} callback Callback method context.
				 */
				loadDefaultSysCultureValue: function(callback, scope) {
					var sysCulture = this.get("SysCulture");
					if (!this.Ext.isEmpty(sysCulture)) {
						this.Ext.callback(callback, scope);
						return;
					}
					this.Terrasoft.chain(
						function(next) {
							this.callService({
								"serviceName": "SysCultureService",
								"methodName": "GetDefaultCulture",
								"data": {}
							}, next, this);
						},
						function(next, response) {
							var recordId = response && response.GetDefaultCultureResult;
							if (this.Terrasoft.isGUID(recordId) && !this.Terrasoft.isEmptyGUID(recordId)) {
								this.loadLookupDisplayValue("SysCulture", recordId, next, this);
							} else {
								next();
							}
						},
						function() {
							this.Ext.callback(callback, scope);
						},
						this);
				},

				/**
				 * Creates culture entity schema query.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				createSysCultureQuery: function() {
					var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {rootSchemaName: "SysCulture"});
					this.initSysCultureQueryColumns(esq);
					this.initSysCultureQueryFilters(esq);
					return esq;
				},

				/**
				 * Initializes system culture query columns.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
				 */
				initSysCultureQueryColumns: function(esq) {
					esq.addColumn("Id");
					esq.addColumn("Name", "Code");
				},

				/**
				 * Initializes system culture query filters.
				 * @protected
				 * @virtual
				 */
				initSysCultureQueryFilters: function(esq) {
					esq.filters.add("ActiveLanguageFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Active", true));
				},

				/**
				 * Prepares culture list item.
				 * @protected
				 * @virtual
				 * @param {Object} item Culture list item.
				 * @return {Object}
				 */
				prepareSysCultureListItem: function(item) {
					return {
						value: item.get("Id"),
						displayValue: this.getSysCultureDisplayValue(item)
					};
				},

				/**
				 * Gets system culture display value.
				 * @protected
				 * @virtual
				 * @param {Object} item System culture.
				 * @return {String}
				 */
				getSysCultureDisplayValue: function(item) {
					return item.get("Code");
				},

				/**
				 * Event handler for prepare list event of system culture lookup.
				 */
				onPrepareSysCultureList: function() {
					var esq = this.createSysCultureQuery();
					esq.getEntityCollection(function(response) {
						if (!response || !response.success) {
							return;
						}
						var list = this.get("SysCultureList");
						var columnList = {};
						response.collection.each(function(item) {
							columnList[item.get("Id")] = this.prepareSysCultureListItem(item);
						}, this);
						list.clear();
						list.loadAll(columnList);
					}, this);
				}

			}
		};
	});

define('UserPageV2LDAPResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserPageV2LDAP", ["UserPageV2Resources"],
	function() {
		return {
			entitySchemaName: "VwSysAdminUnit",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"parentName": "GeneralInfoTab",
					"name": "AuthControlGroup",
					"propertyName": "items",
					"values": {},
					index: 1
				},
				{
					"operation": "merge",
					"parentName": "AuthControlGroup",
					"name": "FormAuthGridLayout",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "SynchronizeWithLDAP",
							"bindConfig": {
								"converter": "invertValue"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthControlGroup",
					"name": "LDAPUserBindingLayout",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": {
							"bindTo": "SynchronizeWithLDAP"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthControlGroup",
					"name": "RadioGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.RADIO_GROUP,
						"value": {
							"bindTo": "SynchronizeWithLDAP"
						},
						"items": [],
						"layout": {"column": 0, "row": 0, "colSpan": 12}
					},
					index: 0
				},
				{
					"operation": "insert",
					"parentName": "RadioGroup",
					"propertyName": "items",
					"name": "AuthForm",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.AuthUseForm"
						},
						"value": false
					}
				},
				{
					"operation": "insert",
					"parentName": "RadioGroup",
					"propertyName": "items",
					"name": "AuthLDAP",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.AuthUseLdap"
						},
						"value": true
					}
				},
				{
					"operation": "insert",
					"parentName": "LDAPUserBindingLayout",
					"name": "LDAPElement",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.LOOKUP,
						"caption": {"bindTo": "Resources.Strings.UserNameCaption"},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"isRequired": {
							"bindTo": "SynchronizeWithLDAP"
						},
						"value": {
							"bindTo": "LDAPElement"
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				"LDAPElement": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						filter: function() {
							var filterGroup = new this.Terrasoft.createFilterGroup();
							filterGroup.add("UserFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"Type", 4));
							filterGroup.add(
								"NotExists", this.Terrasoft.createNotExistsFilter("[SysAdminUnit:LDAPElement].Id"));
							return filterGroup;
						}
					}
				},
				"Synchronization": {
					dependencies: [{
						columns: ["SynchronizeWithLDAP"],
						methodName: "onRadioButtonSwitch"
					}]
				},
				"Name": {
					dependencies: [
						{
							columns: ["LDAPElement"],
							methodName: "onSelectedName"
						}
					]
				}
			},
			methods: {
				/**
				 * ########### ########
				 * @protected
				 * @virtual
				 * @param {boolean} value ######## ##########
				 * @return {boolean} ############### ######## ##########
				 */
				invertValue: function(value) {
						return !value;

					},
				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * ############# ######## ############## # ###### ########## ###### ############.
				 * (## ######### ########## BPMOnline)
				 * @protected
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					if (this.isAddMode()) {
						this.set("SynchronizeWithLDAP", false);
					}
				},

				/**
				 * ####### ######## ##### ### ############ ##### ###### ############## # ###### ############
				 * #### ###############
				 * @private
				 */
				onRadioButtonSwitch: function() {
					if (this.get("SynchronizeWithLDAP")) {
						this.set("Name", null);
						this.set("UserPassword", "");
						this.set("PasswordConfirmation", null);
						this.set("PasswordExpireDate", null);
						this.set("ForceChangePassword", null);
					} else {
						this.set("LDAPElement", null);
						this.set("Name", null);
					}
				},
				/**
				 * #c########### ######## ######## isRequired.
				 * @protected
				 * @overridden
				 */
				isRequiredFieldsVisible: function() {
					return !this.get("SynchronizeWithLDAP");
				},
				/**
				 * ######### ############ #### Name ### ########## LDAPElement.
				 * @protected
				 * @virtual
				 */
				onSelectedName: function() {
					var value = this.get("LDAPElement");
					if (value) {
						this.set("Name", value.displayValue);
					}
				}
			}
		};
	});

define('UserPageV2WebitelCollaborationsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserPageV2WebitelCollaborations", ["UserPageV2Resources", "ConfigurationConstants", "WebitelConfigurationConstants",
		"WebitelModuleHelper"],
	function(resources, ConfigurationConstants, WebitelConfigurationConstants, WebitelModuleHelper) {
		return {
			attributes: {
				/**
				 * ##### ############ Webitel.
				 * @type {String}
				 */
				"WebitelNumber": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ####### ########## ############ Webitel.
				 * @type {Boolean}
				 */
				"IsWebitelUserCreated": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {

				/**
				 * ######### ############# ########## ######.
				 * @overridden
				 * @param {Object} response ######### ############## ###### #######.
				 * @param {Object} config ################ ######.
				 * @param {Boolean} callParentOnSaved ####### ########## ############# ########## ######
				 * ###### # ############ ########.
				 */
				onSaved: function(response, config, callParentOnSaved) {
					var connectionType = this.get("ConnectionType");
					var isConnected = Terrasoft.CtiModel.get("IsConnected");
					if (!this.isNewMode() || Ext.isEmpty(Ext.global.webitel) || callParentOnSaved || !isConnected ||
							connectionType !== ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees) {
						this.callParent(arguments);
						return;
					}
					this.setWebitelNumber(this.onSaved.bind(this, response, config, true));
				},

				/**
				 * ######### ##### ####### ###### Webitel.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				setWebitelNumber: function(callback) {
					var query = this.getContactInnerPhoneQuery();
					query.getEntityCollection(function(response) {
						if (!response.success) {
							callback();
							return;
						}
						if (!response.collection.isEmpty()) {
							var contactCommunication = response.collection.getByIndex(0);
							this.set("WebitelNumber", contactCommunication.get("Number"));
							this.createWebitelAccount(callback);
						} else {
							this.setLastWebitelNumber(callback);
						}
					}, this);
				},

				/**
				 * ######### ###### ### ####### ###### ######## ##### ######## # ##### "########## #######".
				 * @private
				 * @returns {Terrasoft.EntitySchemaQuery} ########## ######### EntitySchemaQuery.
				 */
				getContactInnerPhoneQuery: function() {
					var query = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "ContactCommunication"});
					query.addColumn("Number");
					query.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Contact", this.get("Contact").value));
					query.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"CommunicationType", ConfigurationConstants.CommunicationTypes.InnerPhone));
					return query;
				},

				/**
				 * ####### ####### ###### Webitel.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				createWebitelAccount: function(callback) {
					var webitelNumber = this.get("WebitelNumber");
					Ext.global.webitel.userCreate("admin", webitelNumber, webitelNumber,
						WebitelModuleHelper.getHostName(), this.onWebitelAccountCreated.bind(this, callback));
				},

				/**
				 * ####### ######## ##### ### ########## ########.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				createContactCommunication: function(callback) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactCommunication"
					});
					insert.setParameterValue("Contact", this.get("Contact").value, Terrasoft.DataValueType.GUID);
					var webitelNumber = this.get("WebitelNumber");
					insert.setParameterValue("Number", webitelNumber, Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("CommunicationType", ConfigurationConstants.CommunicationTypes.InnerPhone,
						Terrasoft.DataValueType.GUID);
					insert.execute(callback, this);
				},

				/**
				 * ######### ##### ##### ####### ###### Webitel.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				setLastWebitelNumber: function(callback) {
					var requestConfig = {
						serviceName: "SysSettingsService",
						methodName: "GetIncrementValueVsMask",
						data: {
							sysSettingName: "WSysAccountLastNumber",
							sysSettingMaskName: "WSysAccountCodeMask"
						}
					};
					this.callService(requestConfig, function(response) {
						this.set("WebitelNumber", response.GetIncrementValueVsMaskResult);
						this.createContactCommunication(this.createWebitelAccount.bind(this, callback));
					}, this);
				},

				/**
				 * ######### ######### ########## ####### ###### Webitel.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} result ######### ########## ####### ###### Webitel.
				 */
				onWebitelAccountCreated: function(callback, result) {
					if (result.status !== Ext.global.WebitelCommandResponseTypes.Success) {
						var response = result.response;
						this.error(response);
						if (!response || (response.response !==
								WebitelConfigurationConstants.WebitelErrorCode.UserAlreadyExists)) {
							Terrasoft.utils.showInformation(resources.localizableStrings
								.WebitelUserErrorCreationMessage, callback);
							return;
						}
					}
					this.createWebitelUser(callback);
				},

				/**
				 * ####### # bpmonline ############ Webitel.
				 * @param {Function} callback ####### ######### ######.
				 * @private
				 */
				createWebitelUser: function(callback) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "WSysAccount"
					});
					insert.setParameterValue("Contact", this.get("Contact").value, Terrasoft.DataValueType.GUID);
					var webitelNumber = this.get("WebitelNumber");
					insert.setParameterValue("Login", webitelNumber, Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("Password", webitelNumber, Terrasoft.DataValueType.TEXT);
					insert.setParameterValue("Role", WebitelConfigurationConstants.WSysAccountRole.Administrator,
						Terrasoft.DataValueType.GUID);
					insert.execute(callback, this);
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});

define("UserPageV2", ["PortalUsersAdministrationUtilities"],
	function() {
		return {
			entitySchemaName: "VwSysAdminUnit",
			attributes: {
				/**
				 * Provide information about organization of portal user.
				 */
				"Organization": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"referenceSchemaName": "VwSspAdminUnit",
					"caption": "Organization",
					"lookupListConfig": {
						"hideActions": true,
						"filter": function () {
							return this.getOrganizationFilter();
						}
					}
				}
			},
			properties: {
				"sspConnectionType": 1
			},
			mixins: {
				portalUsersAdministrationUtilities: "Terrasoft.PortalUsersAdministrationUtilities"
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PhotoContainer",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"rowSpan": 4,
							"colSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Organization",
					"values": {
						"bindTo": "Organization",
						"layout": {
							"column": 13,
							"row": 3,
							"colSpan": 8
						},
						"enabled": false,
						"visible": {"bindTo": "getIsOrganizationFieldVisible"}
					}
				}
			],
			methods: {

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
				 * @inheritDoc UserPageV2#getSaveLicensesMethodName
				 * @overridden
				 * @return {String} Method name.
				 */
				getSaveLicensesMethodName: function() {
					if (!this.get("CanManageUsers") && this.get("CanAdministratePortalUsers")) {
						return "UpdatePortalLicenseInfo";
					} else {
						return this.callParent();
					}
				},

				/**
				 * @inheritDoc UserPageV2#getSaveUserMethodName
				 * @overridden
				 * @return {String} Method name.
				 */
				getSaveUserMethodName: function() {
					if (!this.get("CanManageUsers") && this.get("CanAdministratePortalUsers")) {
						return "UpdateOrCreatePortalUser";
					} else {
						return this.callParent();
					}
				},

				/**
				 * @inheritDoc UserPageV2#getOnDeleteCurrentUserClickMethodName
				 * @overridden
				 * @return {String} Method name.
				 */
				getOnDeleteCurrentUserClickMethodName: function() {
					if (!this.get("CanManageUsers") && this.get("CanAdministratePortalUsers")) {
						return "DeletePortalUser";
					} else {
						return this.callParent();
					}
				},

				/**
				* @inheritdoc Terrasoft.BaseViewModel#getEntitySchemaQuery
				* @override
				*/
				getEntitySchemaQuery: function() {
					const esq = this.callParent(arguments);
 					esq.addColumn("[VwSspAdminUnit:Id:Id].PortalAccount", "Organization");
 					return esq;
				},

				/**
				* @inheritdoc BaseViewModel#setColumnValues
				* @override
				*/
				setColumnValues: function(entity) {
					this.callParent(arguments);
					this.set("Organization", entity.get("Organization"));
				},

				/**
				 * Returns filter by portal organization.
				 * @protected
				 */
				getOrganizationFilter: function() {
					const organizationFilter = Terrasoft.createFilterGroup();
					organizationFilter.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					organizationFilter.add("PortalAccountFilter",
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"[VwSspAdminUnit:Id:Id].PortalAccount", this.$Organization.value));
					organizationFilter.add("SelfExcludeFilter",
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
						"[VwSspAdminUnit:Id:Id].Id", this.$Id));
					return organizationFilter;
				},

				/**
				 * Obtains visibility for portal organization field.
				 * @protected
				 */
				getIsOrganizationFieldVisible: function() {
					return this.$ConnectionType === this.sspConnectionType;
				}
			}
		};
	});


