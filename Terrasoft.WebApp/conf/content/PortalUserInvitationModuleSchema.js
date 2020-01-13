Terrasoft.configuration.Structures["PortalUserInvitationModuleSchema"] = {innerHierarchyStack: ["PortalUserInvitationModuleSchema"]};
define('PortalUserInvitationModuleSchemaStructure', ['PortalUserInvitationModuleSchemaResources'], function(resources) {return {schemaUId:'350b424b-5dcb-4dd5-af95-dad21a915c10',schemaCaption: "PortalUserInvitationModuleSchema", parentSchemaName: "", schemaName:'PortalUserInvitationModuleSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalUserInvitationModuleSchema", ["PortalUserInvitationModuleSchemaResources", "ModalBox", "EmailHelper",
		"ViewUtilities", "MaskHelper", "MultipleInput", "PortalUserInvitationMixin",
		"css!PortalUserInvitationModuleSchemaCSS"],
	function(resources, ModalBox, EmailHelper, ViewUtilities, MaskHelper) {
		return {
			properties: {

				/**
				 * @property {Boolean} Flag, indicates that invalid email has entered.
				 */
				isInvalidEmailEntered: false
			},
			mixins: {
				portalUserInvitationMixin: "Terrasoft.PortalUserInvitationMixin"
			},
			attributes: {
				/**
				 * Future user emails separated by commas.
				 */
				"Emails": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Stores portal account identifier, which is used when creating a contact.
				 */
				"PortalAccountId": {
					"dataValueType": Terrasoft.DataValueType.GUID,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Stores available functional roles for the portal account.
				 */
				"OptionalFuncRolesCollection": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * Flag which indicates that any role exists.
				 */
				"IsFuncRoleExist": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			messages: {

				/**
				 * Informs that the modal box has been closed.
				 */
				"OnInvitePortalUserFormClosed": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * Informs that need to set container visibility.
				 */
				"SetInviteContainerVisibility": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig.
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("Emails", this.errorEmailEnteredValidator);
				},

				/**
				 * Validator, that observes invalid emails in control.
				 * @returns {Object}
				 */
				errorEmailEnteredValidator: function() {
					const invalidEmailEntered = this.get("Resources.Strings.InvalidEmailEntered");
					return {
						invalidMessage: this.isInvalidEmailEntered ? invalidEmailEntered : ""
					};
				},

				/**
				 * Event handler clicking on the "Invite" button.
				 * @protected
				 */
				onOkButtonClick: function() {
					if (this.isInvalidEmailEntered) {
						this.showInformationDialog(this.get("Resources.Strings.InvalidEmailEntered"));
					} else if (Ext.isEmpty(this.$Emails)) {
						this.showInformationDialog(this.get("Resources.Strings.EmptyEmailsErrorMessage"));
					} else {
						var config = this.getSspUserManagementServiceConfig();
						this._showBodyMask();
						this.sandbox.publish("SetInviteContainerVisibility", false, [this.getModuleSandboxId()]);
						this.callService(config, this.onCreateUsersResponse, this);
					}
				},

				/**
				 * Event handler clicking on the "Cancel" button.
				 * @protected
				 */
				onCancelClick: function() {
					this.sandbox.publish("OnInvitePortalUserFormClosed", null, [this.getModuleSandboxId()]);
				},

				/**
				 * Returns module sandbox identifier.
				 * @returns {String} Module sandbox identifier.
				 */
				getModuleSandboxId: function() {
					return this.sandbox.id.replace("_" + this.sandbox.moduleName, "");
				},

				/**
				 * Handles response from the SspUserManagementService.
				 * @protected
				 * @param {Object} response Service response.
				 */
				onCreateUsersResponse: function (response) {
					if (response) {
						const result = response.CreateUsersResult;
						if (result.success) {
							if (_.any(result.contactInvites, function(invite) {return invite.success === true;}, this)) {
								this.inviteCreatedUsers(result.contactInvites, function() {
									this._hideBodyMask();
									this.sandbox.publish("OnInvitePortalUserFormClosed", null,
											[this.getModuleSandboxId()]);
								}, this);
							} else {
								const message = this.getCreateUsersMessage(result.contactInvites);
								this.showInformationDialog(message);
								this._hideBodyMask();
								this.sandbox.publish("OnInvitePortalUserFormClosed", null, [this.getModuleSandboxId()]);
							}
						} else {
							this._hideBodyMask();
							this.showInformationDialog(result.errorInfo.message);
						}
					}
				},

				/**
				 * Returns SSP user management service config.
				 * @protected
				 * @returns {Object} Service config.
				 */
				getSspUserManagementServiceConfig: function() {
					return {
						serviceName: "SspUserManagementService",
						methodName: "CreateUsers",
						data: {
							request: {
								emails: this.getEmails(),
								accountId: this.$PortalAccountId,
								userRoles: this.getSelectedFunctionalRoles()
							}
						}
					};
				},

				/**
				 * Gets unique emails from Emails attribute.
				 * @protected
				 * @returns {Array}
				 */
				getEmails: function() {
					const emails = this.splitString(this.$Emails);
					return _.uniq(emails).join(",");
				},

				/**
				 * Split string by separators.
				 * @protected
				 * @param rawString
				 */
				splitString: function(rawString) {
					const itemsArray = rawString.toLowerCase().split(/[ ,;]+/g);
					return this.Ext.Array.filter(itemsArray, function(item) {
						if (!this.Ext.isEmpty(item)) {
							return item;
						}
					}).sort();
				},

				/**
				 * Adds isValid marker for emails using EmailHelper.
				 * @protected
				 * @param {Array} inputArray Array of emails.
				 */
				mapArrayByValidationMarker: function(inputArray) {
					return inputArray.map(function(item) {
						return {
							itemId: this.Terrasoft.generateGUID(),
							isValid: EmailHelper.isEmailAddress(item),
							value: item
						};
					}, this);
				},

				/**
				 * Handler for "handleValue" event in EmailInput control.
				 * @protected
				 * @param {Object} config Config object from control
				 * @param {String} config.rawString String, that was entered in control.
				 */
				onHandleValue: function(config) {
					if (config && config.rawString) {
						const itemsArray = this.splitString(config.rawString);
						config.itemsArray = itemsArray;
						config.proccededString = itemsArray.join(",");
					}
				},

				/**
				 * Handler for "validateItems" event in EmailInput control.
				 * @protected
				 * @param {Object} config Config object from control
				 * @param {String} config.rawString String, that was entered in control.
				 */
				onValidateItems: function(config) {
					const itemsArray = this.splitString(config.rawString);
					const itemsWithValidationMarker = this.mapArrayByValidationMarker(itemsArray);
					config.items = itemsWithValidationMarker;
				},

				/**
				 * Handler for "renderedItemsCollectionChanged" event in EmailInput control.
				 * @protected
				 * @param renderedItemsCollection {Terrasoft.Collection} Collection of rendered items.
				 */
				onRenderedItemsCollectionChanged: function(renderedItemsCollection) {
					const invalidEmailEntered = renderedItemsCollection.any(function(item) {
						return !item.isValid;
					}, this);
					this.isInvalidEmailEntered = invalidEmailEntered;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initFuncRoles(callback, scope);
					}, this]);
				},

				/**
				 * Initializes optional functional optional roles for the portal account.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				initFuncRoles: function(callback, scope) {
					var config = this.getOptionalFuncRolesServiceConfig();
					this.callService(config, function(response) {
						this.onOptionalRolesLoaded(response, callback, scope);
					}, this);
				},

				/**
				 * Returns optional functional role service config.
				 * @protected
				 * @virtual
				 * @returns {Object} Service config.
				 */
				getOptionalFuncRolesServiceConfig: function() {
					return {
						serviceName: "SspUserManagementService",
						methodName: "GetOptionalFuncRolesList",
						data: {
							sspAccountId: this.$PortalAccountId
						}
					};
				},

				/**
				 * Handles response with list of functional roles.
				 * @param {Object} response Service response
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				onOptionalRolesLoaded: function(response, callback, scope) {
					var result = response && response.GetOptionalFuncRolesListResult;
					if (result) {
						var collection = this.getCollection("OptionalFuncRolesCollection");
						Terrasoft.each(result.RolesCollection, function(role) {
							var containerItem = this.createFuncRolesViewModel(role);
							containerItem.set("Id", role.Key);
							collection.add(containerItem.get("Id"), containerItem);
						}, this);
						this.$IsFuncRoleExist = collection.getCount() > 0;
					}
					callback.call(scope || this);
				},

				/**
				 * Returns selected function roles.
				 * @protected
				 * @virtual
				 * @returns {Array} Selected roles.
				 */
				getSelectedFunctionalRoles: function() {
					return this.$OptionalFuncRolesCollection.getItems()
						.filter(function(item) {
							return item.get("IsChecked");
						})
						.map(function(item) {
							return item.get("Id");
						});
				},

				/**
				 * Gets or creates collection by name.
				 * @protected
				 * @virtual
				 * @param {String} collectionName Collection name.
				 * @return {Terrasoft.BaseViewModelCollection} Collection.
				 */
				getCollection: function(collectionName) {
					var collection = this.get(collectionName);
					if (!collection) {
						collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
						this.set(collectionName, collection);
					}
					return collection;
				},

				/**
				 * Creates optional roles view model.
				 * @protected
				 * @virtual
				 * @param {String} role Functional role.
				 * @return Optional roles view model.
				 */
				createFuncRolesViewModel: function(role) {
					var viewModel = Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: role.Key,
							RoleName: role.Value,
							IsChecked: false
						},
						methods: {
							onOptionalRoleLabelClick: function() {
								this.$IsChecked = !this.$IsChecked;
							}
						}
					});
					viewModel.sandbox = this.sandbox;
					viewModel.Terrasoft = this.Terrasoft;
					return viewModel;
				},

				/**
				 * Gets checkbox label config for the role.
				 * @protected
				 * @virtual
				 * @param {Object} role Optional functional role.
				 * @return {Object} Label config.
				 */
				getRolesLabelConfig: function(role) {
					var name = role.get("RoleName");
					var id = role.get("Id");
					var labelContainerConfig = ViewUtilities.getContainerConfig(
						id + "-roles-label-container", ["func-roles-label-wrap", "label-wrap"]);
					var labelConfig = {
						"className": "Terrasoft.Label",
						"caption": name,
						"classes": {"wrapClass": ["t-label"]},
						"markerValue": name + "-invite",
						"click": {"bindTo": "onOptionalRoleLabelClick"}
					};
					labelContainerConfig.items.push(labelConfig);
					return labelContainerConfig;
				},

				/**
				 * Gets checkbox control config for the role.
				 * @protected
				 * @virtual
				 * @param {Object} role Optional functional role.
				 * @return {Object} Control config.
				 */
				getRolesLabelControlConfig: function(role) {
					var name = role.get("RoleName");
					var id = role.get("Id");
					var controlContainerConfig = ViewUtilities.getContainerConfig(
						id + "-roles-control-container", ["func-roles-control-wrap"]);
					var controlConfig = {
						"className": "Terrasoft.CheckBoxEdit",
						"id": id + "-control",
						"markerValue": name + "-invite",
						"checked": {"bindTo": "IsChecked"}
					};
					controlContainerConfig.items.push(controlConfig);
					return controlContainerConfig;
				},

				/**
				 * Creates and sets item config for the role.
				 * @protected
				 * @virtual
				 * @param {Object} itemConfig Item config.
				 * @param {Object} item Optional role.
				 */
				createOptionalFuncRolesItemConfig: function(itemConfig, item) {
					var config = ViewUtilities.getContainerConfig(
						"optional-roles-item-container", ["optional-roles-item-container"]);
					itemConfig.config = config;
					var optionalRolesLabelContainerConfig = this.getRolesLabelConfig(item);
					var optionalRolesTimeContainerConfig = this.getRolesLabelControlConfig(item);
					config.items.push(optionalRolesTimeContainerConfig, optionalRolesLabelContainerConfig);
				},

				/**
				 * Shows a mask on the tag content container.
				 * @private
				 */
				_showBodyMask: function() {
					this._maskId = MaskHelper.showBodyMask();
				},

				/**
				 * Hides a mask on the tag content container.
				 * @private
				 */
				_hideBodyMask: function() {
					MaskHelper.hideBodyMask({ maskId: this._maskId});
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "PortalUserInvitationCaption",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.PortalUserInvitationCaption"
						},
						"classes": {
							"labelClass": ["portal-user-invitation-form-control-caption"]
						},
						"markerValue": "portal-user-invitation-form-control-caption-value"
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "PortalUserInvitationMessage",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.PortalUserInvitationModalBoxMessage"
						},
						"classes": {
							"labelClass": ["portal-user-invitation-form-control-caption-message"]
						},
						"markerValue": "portal-user-invitation-form-control-caption-message-value"
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "PortalUserInvitationEmailLabelContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["portal-user-invitation-form-email-label-container"]
						},
						"items": []
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "PortalUserInvitationEmailLabel",
					"parentName": "PortalUserInvitationEmailLabelContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.TIP_LABEL,
						"caption": "$Resources.Strings.PortalUserInvitationLabelText",
						"tip": {
							"content": "$Resources.Strings.PortalUserInvitationEmailToolTipText"
						},
						"classes": {
							"labelClass": ["portal-user-invitation-form-email-label"]
						},
						"markerValue": "portal-user-invitation-form-email-label-value"
					}
				},
				{
					"operation": "insert",
					"name": "Emails",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "emailInput",
								"className": "Terrasoft.MultipleInput",
								"classes": {
									"wrapClass": ["portal-user-invitation-emails-wrap"],
									"inputWrapClass": ["portal-user-invitation-emails-input"]
								},
								"handleValue": {"bindTo": "onHandleValue"},
								"validateItems": {"bindTo": "onValidateItems"},
								"renderedItemsCollectionChanged": {"bindTo": "onRenderedItemsCollectionChanged"},
								"value": {"bindTo": "Emails"},
								"markerValue": "portal-user-invitation-form-emails-value"
							};
						}
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "PortalUserOptionalFuncRolesMessage",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.PortalUserOptionalFuncRolesMessage"
						},
						"classes": {
							"labelClass": ["portal-user-invitation-form-control-caption-message"]
						},
						"visible": {"bindTo": "IsFuncRoleExist"},
						"markerValue": "portal-user-invitation-form-control-caption-message-value"
					},
					"index": 4
				},
				{
					"operation": "insert",
					"name": "OptionalFuncRolesContainer",
					"propertyName": "items",
					"values": {
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"classes": {
							"wrapClassName": ["optional-func-roles-container"]
						},
						"idProperty": "Id",
						"collection": "OptionalFuncRolesCollection",
						"onGetItemConfig": "createOptionalFuncRolesItemConfig"
					},
					index: 5
				},
				{
					"operation": "insert",
					"name": "PortalUserInvitationButtonContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["portal-user-invitation-form-button-container"]
						},
						"items": []
					},
					"index": 6
				},
				{
					"operation": "insert",
					"name": "InviteButton",
					"parentName": "PortalUserInvitationButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.InviteButtonCaption"
						},
						"click": {"bindTo": "onOkButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"classes": {"textClass": "portal-invitation-button-group"}
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "PortalUserInvitationButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.CancelButtonCaption"
						},
						"click": {"bindTo": "onCancelClick"},
						"style": Terrasoft.controls.ButtonEnums.style.GRAY,
						"classes": {"textClass": "portal-invitation-button-group"}
					}
				}
			]
		};
	});


