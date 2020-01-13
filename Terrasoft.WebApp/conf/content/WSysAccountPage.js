Terrasoft.configuration.Structures["WSysAccountPage"] = {innerHierarchyStack: ["WSysAccountPage"], structureParent: "BasePageV2"};
define('WSysAccountPageStructure', ['WSysAccountPageResources'], function(resources) {return {schemaUId:'8f466c17-6a8d-4d2d-8104-704f574d5ee6',schemaCaption: "Lookup edit page schema - Webitel accounts", parentSchemaName: "BasePageV2", schemaName:'WSysAccountPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WSysAccountPage", ["WSysAccountPageResources", "WebitelModuleHelper",
		"WebitelConfigurationConstants"],
	function(resources, WebitelModuleHelper, WebitelConfigurationConstants) {
		return {
			entitySchemaName: "WSysAccount",
			attributes: {
				/**
				 * ####### ########### ######### Webitel.
				 * @type {Boolean}
				 */
				"WebitelServerConnectEnabled" : {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"visible": false
				},

				/**
				 * #### ############.
				 * @type {Object}
				 */
				"Role": {
					"lookupListConfig": {
						"columns": ["Code"]
					}
				},

				/**
				 * ##### ############.
				 * @type {String}
				 */
				"Login": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"keyup": {"bindTo": "validateLogin"}
				},

				/**
				 * ####### ############.
				 * @type {Object}
				 */
				"Contact": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {
						filter: function() {
							var filtersCollection = this.Terrasoft.createFilterGroup();
							filtersCollection.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
							filtersCollection.add("SysAdminUnit",
								this.Terrasoft.createExistsFilter("[SysAdminUnit:Contact].Id"));
							filtersCollection.add("WSysAccount",
								this.Terrasoft.createNotExistsFilter("[WSysAccount:Contact].Id"));
							return filtersCollection;
						}
					}
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc BasePageV2#initEntity
				 * @overridden
				 */
				initEntity: function() {
					this.callParent(arguments);
					var ctiModel = this.Terrasoft.CtiModel;
					this.set("WebitelServerConnectEnabled", Ext.global.webitel &&
						ctiModel && ctiModel.get("IsConnected"));
				},

				/**
				 * ########## ########### ### ##### ###### Webitel.
				 * @protected
				 * @return {Boolean}
				 */
				isLoginEnabled: function() {
					return this.isNewMode() && this.get("WebitelServerConnectEnabled");
				},

				/**
				 * ######### #### ####### ###### Webitel.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object[]} errors ###### ###### ## #######.
				 */
				updateRole: function(callback, errors) {
					var login = this.get("Login");
					var role = this.get("Role").Code;
					if (this.changedValues.Role) {
						Ext.global.webitel.userUpdate(login, WebitelModuleHelper.getHostName(),
							Ext.global.WebitelUserParamType.Role, role, function(result) {
								if (result.status !== Ext.global.WebitelCommandResponseTypes.Success) {
									errors.push(result.response);
								}
								callback(errors);
							});
					} else {
						callback(errors);
					}
				},

				/**
				 * ######### ###### ####### ###### Webitel.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object[]} errors ###### ###### ## #######.
				 */
				updatePassword: function(callback, errors) {
					if (this.changedValues.Password || this.changedValues.Password === "") {
						var login = this.get("Login");
						var password = this.get("Password");
						Ext.global.webitel.userUpdate(login, WebitelModuleHelper.getHostName(),
							Ext.global.WebitelUserParamType.Password, password, function(result) {
								if (result.status !== Ext.global.WebitelCommandResponseTypes.Success) {
									errors.push(result.response);
								}
								callback(errors);
							});
					} else {
						callback(errors);
					}
				},

				/**
				 * ####### ####### ###### ## ####### Webitel.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} callback.result ######### #######.
				 * @param {Boolean} callback.result.success ####### ######### ##########.
				 * @param {String} [callback.result.error] ######### ## ######.
				 */
				createUser: function(callback) {
					var role = this.get("Role");
					var login = this.get("Login");
					var password = this.get("Password");
					Ext.global.webitel.userCreate((role) ? role.Code : "", login, password,
						WebitelModuleHelper.getHostName(), function(result) {
							if (result.status !== Ext.global.WebitelCommandResponseTypes.Success) {
								var response = result.response;
								this.error(response);
								if (!response || (response.response !==
									WebitelConfigurationConstants.WebitelErrorCode.UserAlreadyExists)) {
									callback({
										success: false,
										error: resources.localizableStrings.WebitelUserErrorCreationMessage
									});
									return;
								}
							}
							callback({
								success: true
							});
						}.bind(this));
				},

				/**
				 * @inheritdoc BasePageV2#checkCanEditRight
				 * @overridden
				 */
				checkCanEditRight: function(callback, scope) {
					var validLogin = this.validateLogin();
					if (!this.validate() || !validLogin) {
						var msg = (validLogin)
							? resources.localizableStrings.FillRequiredFieldsMessage
							: resources.localizableStrings.LoginValidationMessage;
						var resultObject = {
							success: false,
							message: msg
						};
						callback.call(scope, resultObject);
						return;
					}
					var isNew = this.isNewMode();
					if (isNew) {
						var password = this.get("Password");
						this.set("Password", (Ext.isEmpty(password)) ? this.get("Login") : password);
						this.createUser(function(result) {
							callback.call(scope, result);
						});
					} else {
						this.Terrasoft.chain(
							function(next) {
								var errors = [];
								next(errors);
							},
							this.updateRole,
							this.updatePassword,
							function(next, errors) {
								var resultObject = {
									success: (errors.length === 0),
									message: this.getCombineErrorMessage(errors)
								};
								callback.call(scope, resultObject);
							},
						this);
					}
				},

				/**
				 * ########## ######### ## #######.
				 * @protected
				 * @param {Object[]} errors ###### ###### ## #######.
				 * @returns {String} C######## ## #######.
				 */
				getCombineErrorMessage: function(errors) {
					var msg = "";
					errors.forEach(function(error, index) {
						if (index > 0) {
							msg += ", ";
						}
						msg += error.response;
					});
					return msg;
				},

				/**
				 * ######### ############ ########## ###### ############.
				 * @protected
				 * @returns {Boolean} #### ##### ######### - true, ##### - false.
				 */
				validateLogin: function() {
					var str = this.get("Login") || "";
					return !str.match(/\D/g);
				},

				/**
				 * ########## ######### ###### ######### ########## ### ##### ####### ###### Webitel.
				 * @protected
				 * @return {string}
				 */
				getAuthControlGroupCaption: function() {
					var caption = this.get("Resources.Strings.AuthControlGroupCapton");
					var webitelServerConnectEnabled = this.get("WebitelServerConnectEnabled");
					if (!webitelServerConnectEnabled) {
						caption +=
							this.Ext.String.format(" [{0}]", this.get("Resources.Strings.ServerNotConnectedCaption"));
					}
					return caption;
				}

				//endregion

			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
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
					"name": "Contact",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"colSpan": 24,
							"row": 0
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"name": "AuthControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "getAuthControlGroupCaption"},
						"items": [],
						"layout": {
							"column": 0,
							"colSpan": 24,
							"row": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthControlGroup",
					"propertyName": "items",
					"name": "Login",
					"values": {
						"enabled": {"bindTo": "isLoginEnabled"},
						"layout": {
							"column": 0,
							"colSpan": 24,
							"row": 2
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthControlGroup",
					"propertyName": "items",
					"name": "Password",
					"values": {
						"enabled": {"bindTo": "WebitelServerConnectEnabled"},
						"controlConfig": {
							"protect": true
						},
						"layout": {
							"column": 0,
							"colSpan": 24,
							"row": 3
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthControlGroup",
					"propertyName": "items",
					"name": "Role",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": {"bindTo": "WebitelServerConnectEnabled"},
						"layout": {
							"column": 0,
							"colSpan": 24,
							"row": 4
						}
					}
				}
			]/**SCHEMA_DIFF*/
			};
	});


