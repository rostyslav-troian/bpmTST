Terrasoft.configuration.Structures["SysAdminUnitPageV2"] = {innerHierarchyStack: ["SysAdminUnitPageV2UIv2", "SysAdminUnitPageV2LDAP", "SysAdminUnitPageV2"], structureParent: "SysAdminUnitRoleBasePageV2"};
define('SysAdminUnitPageV2UIv2Structure', ['SysAdminUnitPageV2UIv2Resources'], function(resources) {return {schemaUId:'e05db6f4-f0f0-4ab8-942a-030694d8669d',schemaCaption: "Section edit page schema - Organizational roles", parentSchemaName: "SysAdminUnitRoleBasePageV2", schemaName:'SysAdminUnitPageV2UIv2',parentSchemaUId:'c98b8faa-d678-4c2c-a043-efe41d5e1ddf',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysAdminUnitPageV2LDAPStructure', ['SysAdminUnitPageV2LDAPResources'], function(resources) {return {schemaUId:'af51f03f-e8df-4b11-ac23-dba4c48cf096',schemaCaption: "Section edit page schema - Organizational roles", parentSchemaName: "SysAdminUnitPageV2UIv2", schemaName:'SysAdminUnitPageV2LDAP',parentSchemaUId:'e05db6f4-f0f0-4ab8-942a-030694d8669d',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SysAdminUnitPageV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysAdminUnitPageV2Structure', ['SysAdminUnitPageV2Resources'], function(resources) {return {schemaUId:'8efbb8ef-829e-418f-8bfa-4e5761fb36f7',schemaCaption: "Section edit page schema - Organizational roles", parentSchemaName: "SysAdminUnitPageV2LDAP", schemaName:'SysAdminUnitPageV2',parentSchemaUId:'af51f03f-e8df-4b11-ac23-dba4c48cf096',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SysAdminUnitPageV2LDAP",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SysAdminUnitPageV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SysAdminUnitPageV2UIv2", ["SysAdminUnitPageV2Resources", "ConfigurationConstants", "css!AdministrationCSSV2"],
		function() {
	return {
		details: /**SCHEMA_DETAILS*/{
			ChiefsDetailV2: {
				schemaName: "ChiefsDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Id"
				},
				defaultValues: {
					ConnectionType: {
						masterColumn: "ConnectionType"
					},
					IsParentRoleExist: {
						masterColumn: "IsParentRoleExist"
					}
				}
			},
			SysFuncRoleInOrgRoleDetailV2: {
				filter: {
					detailColumn: "OrgRole"
				}
			},
			SysAdminUnitChiefIPRangeDetailV2: {
				schemaName: "SysAdminUnitChiefIPRangeDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "SysAdminUnit"
				}
			},
			SysFuncRoleChiefInOrgRoleDetailV2: {
				schemaName: "SysFuncRoleChiefInOrgRoleDetailV2",
				filter: {
					masterColumn: "Id",
					detailColumn: "OrgRole"
				}
			}
		}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "ViewOptionsButton"
			},
			{
				"operation": "remove",
				"name": "PrintButton"
			},
			{
				"operation": "insert",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0,
				"name": "UsersTab",
				"values": {
					"caption": {"bindTo": "Resources.Strings.UsersTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "UsersTab",
				"propertyName": "items",
				"name": "UsersDetailV2",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1,
				"name": "ChiefsTab",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ChiefsTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ChiefsTab",
				"name": "ChiefsControlGroup",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ChiefsControlGroup",
				"propertyName": "items",
				"name": "ChiefExist",
				"values": {
					"bindTo": "IsChiefRoleExist",
					"contentType": this.Terrasoft.ContentType.BOOLEAN,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 10
					},
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.ExistChiefsRoleCaption"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "GroupName",
				"parentName": "ChiefsControlGroup",
				"propertyName": "items",
				"values": {
					"visible": true,
					"enabled": {"bindTo": "IsGroupNameEnable"},
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"caption": {"bindTo": "Resources.Strings.NameChiefRolesCaption"},
					"value": {"bindTo": "GroupName"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ChiefsTab",
				"propertyName": "items",
				"name": "ChiefsDetailV2",
				"values": {"itemType": this.Terrasoft.ViewItemType.DETAIL}
			},
			{
				"operation": "insert",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2,
				"name": "FuncRolesTab",
				"values": {
					"caption": {"bindTo": "Resources.Strings.RolesTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "FuncRolesTab",
				"propertyName": "items",
				"name": "SysFuncRoleInOrgRoleDetailV2",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "FuncRolesTab",
				"propertyName": "items",
				"name": "SysFuncRoleChiefInOrgRoleDetailV2",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 3,
				"name": "IPRangeTab",
				"values": {
					"caption": {"bindTo": "Resources.Strings.IPRangeTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "IPRangeTab",
				"propertyName": "items",
				"name": "SysAdminUnitIPRangeDetailV2",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "IPRangeTab",
				"propertyName": "items",
				"name": "SysAdminUnitChiefIPRangeDetailV2",
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
				"parentName": "IPRangeTab",
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
			}
		]/**SCHEMA_DIFF*/,
		attributes: {
			/**
			 * ####, ############ ####### #### ############# ### ####### ############### ####.
			 */
			"IsChiefRoleExist": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				dependencies: [
					{
						columns: ["IsChiefRoleExist"],
						methodName: "onIsChiefRoleExistChange"
					}
				]
			},
			/**
			 * ####, ############ ### ########### ####, ### ######## ######### IsChiefRoleExist, #### true - ##
			 * ############, #### false - ########### #########.
			 */
			"IsUserClickCheckbox": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN
			},
			"GroupName": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			},
			/**
			 * ####, ############ ##### ## ######## ### ############## #### # ######### ###### #############.
			 */
			"IsGroupNameEnable": {"dataValueType": this.Terrasoft.DataValueType.BOOLEAN}
		},
		methods: {
			/**
			 * @inheritdoc BasePageV2#reloadEntity
			 * @overridden
			 */
			reloadEntity: function() {
				this.set("IsUserClickCheckbox", false);
				this.set("IsChiefRoleExist", null);
				this.callParent(arguments);
			},

			/**
			 * ############ ####### ######### ######### checkbox, ########### ## ########/######## ####
			 * ############. ########### ## IsUserClickCheckbox ##########, ### ######## ######### #########
			 * ########, #### true - ## ############, # ######### ###### ######### ############# ######## #
			 * ######### #####-#### ######## ## #####.
			 * @protected
			 */
			onIsChiefRoleExistChange: function() {
				if (!this.get("IsUserClickCheckbox")) {
					this.set("IsUserClickCheckbox", true);
					return;
				}
				if (this.isNewMode()) {
					this.save({
						isSilent: true,
						callback: this.updateChiefDetail,
						callBaseSilentSavedActions: true
					});
					return;
				}
				if (this.get("IsChiefRoleExist")) {
					this.addChiefsRole();
				} else {
					this.checkCanRemoveChiefsRole();
				}
			},

			/**
			 * ######### ########## ###### ############# ##### ####, ### #### ######### ##### ############### ####.
			 * @protected
			 */
			updateChiefDetail: function() {
				this.sandbox.publish("UpdateChiefDetail", null, [this.getDetailId("ChiefsDetailV2")]);
			},

			/**
			 * ######### ######### # ####### ### ######### ########## ############# # ####### ###### #############.
			 * @protected
			 */
			checkCanRemoveChiefsRole: function() {
				var chiefData = this.get("ChiefData");
				var dataSend = {
					roleId: chiefData.Id
				};
				var config = {
					serviceName: "AdministrationService",
					methodName: "GetUsersCount",
					data: dataSend
				};
				this.callService(config, this.onCheckCanRemoveChiefsRoleResponse, this);
			},

			/**
			 * ############ ######### ####### ### ######### ########## ############# # ####### ######. #### #
			 * ###### #### ############, ## ## ####### ######### # ############# ####### ###### # ########## #
			 * ########### ######### checkbox. #### ## # ###### ############# ### #############, ## #########
			 * ##### ########### #### ### ############# ########.
			 * @param {Object} response ##### ## #######.
			 * @protected
			 */
			onCheckCanRemoveChiefsRoleResponse: function(response) {
				if (response && !this.Ext.isEmpty(response.GetUsersCountResult)) {
					if (response.GetUsersCountResult === 0) {
						this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
							this.handleDialogResponse,
							[
								this.Terrasoft.MessageBoxButtons.YES.returnCode,
								this.Terrasoft.MessageBoxButtons.NO.returnCode
							],
							null);

					} else {
						this.showInformationDialog(this.get("Resources.Strings.DeletionErrorMessage"));
						this.setCheckboxState(true);
					}
					this.set("ServiceDataLoaded", true);
				}
			},

			/**
			 * ############ ##### ############ # ########## #### ### ############# ######## ###### #############.
			 * #### ############ ########## ########, ## ######### ########, #### ### - ## ########## checkbox #
			 * ######### 'checked'.
			 * @param {String} returnCode Tag ######, ####### ###### ############.
			 * @protected
			 */
			handleDialogResponse: function(returnCode) {
				if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.removeChiefsRole();
				} else {
					this.setCheckboxState(true);
				}
			},

			/**
			 * ############# ######## ### ######## IsChiefRoleExist ###, ##### ### ######### ######### #########
			 * ## ########### ##########/######## ###### #############.
			 * @param {Boolean} value ########, ####### ##### ########### # ####### IsChiefRoleExist.
			 * @protected
			 */
			setCheckboxState: function(value) {
				if (this.get("IsChiefRoleExist") !== value) {
					this.set("IsUserClickCheckbox", false);
					this.set("IsChiefRoleExist", value);
				}
			},

			/**
			 * ####### ####### ###### #############.
			 * @protected
			 */
			removeChiefsRole: function() {
				var chiefData = this.get("ChiefData");
				this.callService({
					serviceName: "GridUtilitiesService",
					methodName: "DeleteRecords",
					data: {
						primaryColumnValues: [chiefData.Id],
						rootSchema: this.entitySchema.name
					}
				}, this.onRemoveChiefsRole, this);
			},

			/**
			 * ######### ######### ###### ####### ##### ######## ######.
			 * @param {Object} responseObject ##### #######.
			 * @protected
			 */
			onRemoveChiefsRole: function(responseObject) {
				var result = this.Ext.decode(responseObject.DeleteRecordsResult);
				var success = result.Success;
				this.hideBodyMask();
				if (!success) {
					this.showInformationDialog(this.get("Resources.Strings.DependencyWarningMessage"));
				}
				this.publishUpdateChiefDetailAndSave();
			},

			/**
			 * ######### ########## #### ############ ### ####### ############### ####.
			 * @protected
			 */
			addChiefsRole: function() {
				var dataSend = {
					id: this.get("Id"),
					name: this.get("Name")
				};
				var config = {
					serviceName: "AdministrationService",
					methodName: "SaveChiefsRole",
					data: dataSend
				};
				this.callService(config, this.onAddChiefsRole, this);
			},

			/**
			 * ############ ##### ####### ##### ########## ###### #############.
			 * @param {Object} response ##### ## #######.
			 * @protected
			 */
			onAddChiefsRole: function(response) {
				response = this.Ext.decode(response.SaveChiefsRoleResult);
				this.validateServiceResponse(response, response.message, this.publishUpdateChiefDetailAndSave,
					this);
			},

			/**
			 * ######### ####### ### ####, ##### ######## ###### ### ###### ############# # ######### ########.
			 * @protected
			 */
			publishUpdateChiefDetailAndSave: function() {
				this.updateChiefDetail();
				this.save({isSilent: true});
			},

			/**
			 * @inheritdoc SysAdminUnitRoleBasePageV2#saveEntity
			 * @overridden
			 */
			saveEntity: function() {
				if (this.changedValues.GroupName) {
					this.onGroupNameChange();
				}
				this.callParent(arguments);
			},

			/**
			 * ######### ##### ####### # ######### ############ # ###### ####### ######.
			 * @protected
			 * @param {string} response ############ ##### #######.
			 * @param {string} message ######### # ###### ######.
			 * @param {Function} callback ####### ######### ###### # ###### ########## #######.
			 * @param {Object} scope  ######## ####### ######### ######.
			 */
			validateServiceResponse: function(response, message, callback, scope) {
				this.hideBodyMask();
				if (response.success) {
					callback.call(scope);
				} else {
					this.showInformationDialog(message);
				}
			},

			/**
			 * ############ ######### ######## ##### ############# #############. ######### ########## #####
			 * # ####.
			 * @protected
			 */
			onGroupNameChange: function() {
				var chiefData = this.get("ChiefData");
				if (chiefData) {
					chiefData.Name = this.get("GroupName");
					var dataSend = {
						jsonObject: this.Ext.encode(chiefData)
					};
					var config = {
						serviceName: "AdministrationService",
						methodName: "SaveRole",
						data: dataSend
					};
					this.callService(config, this.onGroupNameSave, this);
				}
			},

			/**
			 * ############ ######### ########## ###### ##### ### ###### #############. ####### #########, # ######
			 * ## ######### ##########.
			 * @param {Object} response ##### ## #######.
			 */
			onGroupNameSave: function(response) {
				if (response && response.SaveRoleResult) {
					var result = this.Ext.decode(response.SaveRoleResult);
					if (!result.success) {
						this.showInformationDialog(result.message);
					}
				}
			},

			/**
			 * @inheritdoc GridUtilitiesV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.selectChiefsUnits();
			},

			/**
			 * ######### ########## ### #######, ####### ##### ######### ######## # ###### ############# ###
			 * ######## #############.
			 * @protected
			 */
			selectChiefsUnits: function() {
				this.sandbox.subscribe("GetChiefsSysAdminUnits", function(result) {
					this.set("updatedFromDetail", true);
					this.set("ChiefData", result);
					this.set("GroupName", result ? result.Name : "");
					var chiefRoleExist = !this.Ext.isEmpty(result);
					this.setCheckboxState(chiefRoleExist);
					this.set("IsGroupNameEnable", chiefRoleExist);
					delete this.changedValues.GroupName;
				}, this, [this.getDetailId("ChiefsDetailV2")]);
			},

			/**
			 * ########## ######### ########
			 * @protected
			 * @virtual
			 */
			getHeader: function() {
				return this.get("Resources.Strings.HeaderCaption");
			}
		},
		messages: {
			"GetChiefsSysAdminUnits": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"UpdateChiefDetail": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		}
	};
});

define('SysAdminUnitPageV2LDAPResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SysAdminUnitPageV2LDAP", ["BusinessRuleModule", "SysAdminUnitPageV2Resources"],
	function(BusinessRuleModule) {
		return {
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "UsersTab",
					"name": "LDAPControlGroup",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "LDAPGroupBindingContainer",
					"parentName": "LDAPControlGroup",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 16
						}
					}
				},
				{
					"operation": "insert",
					"name": "LDAPElement",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 14
						},
						"isRequired": {
							"bindTo": "SynchronizeWithLDAP",
							"bindConfig": {
								"converter": "clearLdapField"
							}
						},
						"bindTo": "LDAPElement",
						"caption": {
							"bindTo": "Resources.Strings.LDAPElementCaption"
						},
						"contentType": this.Terrasoft.ContentType.LOOKUP,
						"labelConfig": {
							"visible": true
						},
						"enabled": {"bindTo": "SynchronizeWithLDAP"}
					},
					"parentName": "LDAPGroupBindingContainer",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "LDAPGroupBindingContainer",
					"propertyName": "items",
					"name": "SynchronizeWithLDAP",
					"values": {
						"value": "passGroupId",
						"bindTo": "SynchronizeWithLDAP",
						"contentType": this.Terrasoft.ContentType.BOOLEAN,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 10
						},
						"labelConfig": {
							"caption": { bindTo: "Resources.Strings.SynchronizeWithLDAPCaption"}
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				"LDAPElement": {
					lookupListConfig: {
						filter: function() {
							var filterGroup = new this.Terrasoft.createFilterGroup();
							filterGroup.add("GroupFilter", Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL,
								"Type", 3));
							filterGroup.add("NotExists", Terrasoft.createNotExistsFilter("[SysAdminUnit:LDAPElement].Id"));
							return filterGroup;
						}
					},
					dependencies: [
						{
							columns: ["LDAPElement"],
							methodName: "passGroupId"
						}
					]
				},
				"ClearLdapLookUp": {
					dependencies: [
						{
							columns: ["SynchronizeWithLDAP"],
							methodName: "clearLDAPField"
						}
					]
				}
			},
			methods: {
				init: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("DetailLoaded", function() {
						this.passGroupId();
					}, this, [this.sandbox.id + "_detail_UsersDetailV2"]);
				},
				onDataChange: function() {
					this.callParent(arguments);
						this.passGroupId();
				},
				/**
				 * ######## id ###### LDAP # ########## ######## ############# ############# LDAP
				 * @protected
				 * @param {Object} config
				 * @param {String} config.id ############# ###### LDAP
				 * @param {Object} config.isEnabled #### ######### ###### #### ############# ############# LDAP
				 */
				passGroupId: function() {
					var isImportEnabled = false;
					var detailAdress = "_detail_UsersDetailV2";
					var ldapElement = this.get("LDAPElement")
					if (ldapElement) {
						var ldapGroupID = ldapElement.value;
						if (ldapGroupID) {
							isImportEnabled = true;
							this.sandbox.publish("IsImportEnabled", {
								id: ldapGroupID,
								isEnabled: isImportEnabled
							}, [this.sandbox.id + detailAdress]);
						}
					}
					else {
						this.sandbox.publish("IsImportEnabled", {
							id: null,
							isEnabled: isImportEnabled
						}, [this.sandbox.id + detailAdress]);
					}
					return ldapElement;

				},
				/**
				 * ####### ######## #### ### ###### ######## ############# # LDAP
				 * @protected
				 */
				clearLDAPField: function() {
					var isRequired = this.get("SynchronizeWithLDAP");
					if (!isRequired && this.get("LDAPElement")) {
						this.set("LDAPElement", null);
						return !isRequired;
					}
					else {
						return isRequired;
					}
				}
			},
			messages: {
				"IsImportEnabled": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				"DetailLoaded": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			rules: {
				"LDAPElement": {
					"RequireLDAPElementOnSynchronizeWithLDAP": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.REQUIRED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "SynchronizeWithLDAP"
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					},
					"EnableLDAPElementOnSynchronizeWithLDAP": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "SynchronizeWithLDAP"
								},
								comparisonType: this.Terrasoft.ComparisonType.EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: true
								}
							}
						]
					}
				}
			}
		};
	});

define("SysAdminUnitPageV2", [],
	function() {
		return {
			entitySchemaName: "VwSysAdminUnit",
			details: /**SCHEMA_DETAILS*/{
				"OrganizationDetail": {
					"schemaName": "OrganizationDetail",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "ParentRole"
					}
				},
				"OptionalFuncSspRolesDetail": {
					"schemaName": "OptionalFuncSspRolesDetail",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "OrgRole"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "UsersTab",
					"propertyName": "items",
					"name": "OrganizationDetail",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "OrganizationDetailVisible"}
					}
				},
				{
					"operation": "insert",
					"parentName": "FuncRolesTab",
					"propertyName": "items",
					"name": "OptionalFuncSspRolesDetail",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "OrganizationDetailVisible"}
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				/**
				 * PortalAccount detail visibility flag.
				 */
				"OrganizationDetailVisible": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {

				/**
				 * Checks if AdminUnit connection type is SSP.
				 * @returns {boolean}
				 * @private
				 */
				_getIsSspConnectionType: function() {
					var connectionType = this.get("ConnectionType");
					return connectionType === 1 && this.getIsFeatureEnabled("PortalUserManagementV2");
				},

				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.$OrganizationDetailVisible = this._getIsSspConnectionType();
				}
			}
		};
	});


