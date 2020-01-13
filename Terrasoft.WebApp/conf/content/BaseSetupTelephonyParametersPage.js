Terrasoft.configuration.Structures["BaseSetupTelephonyParametersPage"] = {innerHierarchyStack: ["BaseSetupTelephonyParametersPage"]};
define('BaseSetupTelephonyParametersPageStructure', ['BaseSetupTelephonyParametersPageResources'], function(resources) {return {schemaUId:'22849db5-f5d9-4326-8fbc-af1f1888a90e',schemaCaption: "Base page - Call center parameters setup", parentSchemaName: "", schemaName:'BaseSetupTelephonyParametersPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseSetupTelephonyParametersPage", ["terrasoft", "ServiceHelper", "SetupCallCenterUtilities"],
	function(Terrasoft, ServiceHelper) {
		return {
			messages: {
				"BackHistoryState": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * ###### ############ ########## #########.
				 * ##### - ######## ######### #####, ######## - ######### ###########.
				 * @protected
				 * @type {Object}
				 */
				"connectionParamsConfig": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				 * ########## ############# ####### ########## ###### ###########.
				 * @type {String}
				 */
				"sysMsgLibId": {
					"dataValueType": Terrasoft.DataValueType.GUID,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": Terrasoft.SysValue.CTI.sysMsgLibId
				},

				/**
				 * ########## ############# ####### ######## ############.
				 * @type {String}
				 */
				"sysMsgUserSettingsId": {
					"dataValueType": Terrasoft.DataValueType.GUID,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * #######, ############ ####### ## ##### #######.
				 * @type {Boolean}
				 */
				"DebugMode": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * #######, ############ ######### ## #########.
				 * @type {Boolean}
				 */
				"DisableCallCentre": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * #######, ############ ########## ## ######.
				 * @type {Boolean}
				 */
				"IsPasswordEncrypted": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				},

				/**
				 * ######## ####### ###### ######## ########### #########.
				 * @type {Boolean}
				 */
				"PasswordColumnName": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				}
			},
			methods: {

				/**
				 * ############## ######### ######## ######.
				 * @protected
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.set("connectionParamsConfig", this.getConnectionParamsConfig());
						this.loadConnectionParams(function() {
							this.subscribePasswordChanged();
							callback.call(scope || this);
						}.bind(this), this);
					}.bind(this), this]);
				},

				/**
				 * ############# ## ######### ###### ######## ########### #########.
				 * @private
				 */
				subscribePasswordChanged: function() {
					var passwordColumnName = this.get("PasswordColumnName");
					if (!Ext.isEmpty(passwordColumnName)) {
						this.on("change:" + passwordColumnName, function() {
							this.set("IsPasswordEncrypted", false);
							this.un("change:" + passwordColumnName, null, this);
						}, this);
					}
				},

				/**
				 * ####### ###### ########### ######### ############.
				 * @param {String} password ###### ########### ######### ############.
				 * @param {Function} callback ####### ######### ######.
				 * @private
				 */
				encryptPassword: function(password, callback) {
					var serviceOptions = {
						password: password
					};
					ServiceHelper.callService("CryptographicService", "GetConvertedPasswordValue", function(response) {
						callback.call(this, response.GetConvertedPasswordValueResult);
					}, serviceOptions);
				},

				/**
				 * ######### ######### ######### # ############### #### #####.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope (optional) ######## ###### ####### ######### ######.
				 * @private
				 */
				loadConnectionParams: function(callback, scope) {
					var sysMsgLibId = this.get("sysMsgLibId");
					if (Ext.isEmpty(sysMsgLibId)) {
						callback(scope || this);
						return;
					}
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "SysMsgUserSettings"});
					esq.addColumn("ConnectionParams");
					esq.filters.add("filterCurrentUserParams", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "User", Terrasoft.SysValue.CURRENT_USER.value));
					esq.filters.add("filterCurrentCallCentre", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "SysMsgLib", sysMsgLibId));
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							callback(scope || this);
							return;
						}
						var entities = result.collection;
						if (entities.isEmpty()) {
							callback(scope || this);
							return;
						}
						var entity = entities.getByIndex(0);
						this.set("sysMsgUserSettingsId", entity.get("Id"));
						var entityConnectionParams = entity.get("ConnectionParams");
						if (!Ext.isEmpty(entityConnectionParams)) {
							var connectionParams;
							try {
								connectionParams = Terrasoft.decode(entityConnectionParams);
							} catch (e) {
								this.error(e);
							}
							if (!Ext.isEmpty(connectionParams)) {
								var connectionParamsConfig = this.get("connectionParamsConfig");
								Terrasoft.each(connectionParamsConfig, function(paramName, attributeName) {
									var paramValue = connectionParams[paramName];
									if (Ext.isEmpty(paramValue)) {
										return;
									}
									this.set(attributeName, paramValue);
								}.bind(this));
							}
						}
						callback(scope || this);
					}.bind(this));
				},

				/**
				 * ########## ###### ############ ########## #########.
				 * ##### - ######## ######### #####, ######## - ######### ###########.
				 * @protected
				 * @returns {Object} ###### ############ ########## #########.
				 */
				getConnectionParamsConfig: function() {
					return {
						"DebugMode": "debugMode",
						"DisableCallCentre": "disableCallCentre"
					};
				},

				/**
				 * ############ ####### ## ###### "#########"
				 * @private
				 */
				saveButtonClick: function() {
					var isPasswordEncrypted = this.get("IsPasswordEncrypted");
					var passwordColumnName = this.get("PasswordColumnName");
					if (!isPasswordEncrypted && !Ext.isEmpty(passwordColumnName)) {
						var password = this.get(passwordColumnName);
						this.encryptPassword(password, function(encryptedPassword) {
							this.set(passwordColumnName, encryptedPassword);
							this.saveSysMsgUserSettings();
						}.bind(this));
					} else {
						this.saveSysMsgUserSettings();
					}
				},

				/**
				 * ######### ######### ########### ######### ############.
				 * @private
				 */
				saveSysMsgUserSettings: function() {
					if (!this.get("DisableCallCentre") && !this.validate()) {
						this.showInformationDialog(this.getValidationMessage());
						return;
					}
					var query;
					var settingsId = this.get("sysMsgUserSettingsId");
					var sysMsgLibId = this.get("sysMsgLibId");
					if (!Ext.isEmpty(settingsId)) {
						query = Ext.create("Terrasoft.UpdateQuery", {rootSchemaName: "SysMsgUserSettings"});
						query.enablePrimaryColumnFilter(settingsId);
					} else {
						query = Ext.create("Terrasoft.InsertQuery", {rootSchemaName: "SysMsgUserSettings"});
						query.setParameterValue("User", Terrasoft.SysValue.CURRENT_USER.value,
							Terrasoft.DataValueType.GUID);
					}
					query.setParameterValue("SysMsgLib", sysMsgLibId, Terrasoft.DataValueType.GUID);
					var connectionParams = {};
					var connectionParamsConfig = this.get("connectionParamsConfig");
					Terrasoft.each(connectionParamsConfig, function(paramName, attributeName) {
						var attributeValue = this.get(attributeName);
						connectionParams[paramName] = Ext.isEmpty(attributeValue) ? "" : attributeValue;
					}.bind(this));
					query.setParameterValue("ConnectionParams", Terrasoft.encode(connectionParams),
						Terrasoft.DataValueType.TEXT);
					query.execute(this.goBack, this);
				},

				/**
				 * ############ ####### ## ###### "######".
				 * @private
				 */
				cancelButtonClick: function() {
					this.goBack();
				},

				/**
				 * ########## ############ ## ########## ######.
				 * @private
				 */
				goBack: function() {
					this.sandbox.publish("BackHistoryState");
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "setupCallCentreParametersContainer",
					"propertyName": "items",
					"values": {
						"id": "setupCallCentreParametersContainer",
						"selectors": {
							"el": "#setupCallCentreParametersContainer",
							"wrapEl": "#setupCallCentreParametersContainer"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["setup-call-centre-parameters-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "topSettings",
					"parentName": "setupCallCentreParametersContainer",
					"propertyName": "items",
					"values": {
						"id": "topSettings",
						"selectors": {"wrapEl": "#topSettings"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["top-settings-container"],
						"items": [
							{
								"id": "SaveButton",
								"markerValue": "SaveButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"click": {"bindTo": "saveButtonClick"},
								"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
								"selectors": {"wrapEl": "#rightPanelCloseButton"},
								"style": Terrasoft.controls.ButtonEnums.style.GREEN,
								"tag": "save"
							},
							{
								"id": "CancelButton",
								"markerValue": "CancelButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"click": {"bindTo": "cancelButtonClick"},
								"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
								"classes": {"textClass": ["cancel-button"]},
								"selectors": {"wrapEl": "#rightPanelCloseButton"},
								"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
								"tag": "CancelButton"
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "controlsContainerTop",
					"parentName": "setupCallCentreParametersContainer",
					"propertyName": "items",
					"values": {
						"id": "controlsContainerTop",
						"selectors": {"wrapEl": "#controlsContainerTop"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["controls-container-top"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "controlsContainer",
					"parentName": "setupCallCentreParametersContainer",
					"propertyName": "items",
					"values": {
						"id": "controlsContainer",
						"selectors": {"wrapEl": "#controlsContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["controls-block-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "controlsContainerRight",
					"parentName": "setupCallCentreParametersContainer",
					"propertyName": "items",
					"values": {
						"id": "controlsContainerRight",
						"selectors": {"wrapEl": "#controlsContainerRight"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["controls-container-right"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "controlsContainerBottom",
					"parentName": "setupCallCentreParametersContainer",
					"propertyName": "items",
					"values": {
						"id": "controlsContainerBottom",
						"selectors": {"wrapEl": "#controlsContainerBottom"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["controls-container-bottom"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainerTop",
					"propertyName": "items",
					"name": "DisableCallCentre",
					"values": {
						"generator": "SetupCallCenterUtilities.generateBottomCheckBoxControl"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainerBottom",
					"propertyName": "items",
					"name": "DebugMode",
					"values": {
						"generator": "SetupCallCenterUtilities.generateBottomCheckBoxControl"
					}
				}
			]
		};
	});


