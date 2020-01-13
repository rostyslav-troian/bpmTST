Terrasoft.configuration.Structures["UserProfilePage"] = {innerHierarchyStack: ["UserProfilePageNUI", "UserProfilePageTranslation", "UserProfilePageCTIBase", "UserProfilePage"]};
define('UserProfilePageNUIStructure', ['UserProfilePageNUIResources'], function(resources) {return {schemaUId:'ee38148c-0d77-478c-a000-e0f85cada35a',schemaCaption: "UserProfilePage", parentSchemaName: "", schemaName:'UserProfilePageNUI',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserProfilePageTranslationStructure', ['UserProfilePageTranslationResources'], function(resources) {return {schemaUId:'817463c9-7bea-4733-b916-9c18c521a166',schemaCaption: "UserProfilePage", parentSchemaName: "UserProfilePageNUI", schemaName:'UserProfilePageTranslation',parentSchemaUId:'ee38148c-0d77-478c-a000-e0f85cada35a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserProfilePageNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserProfilePageCTIBaseStructure', ['UserProfilePageCTIBaseResources'], function(resources) {return {schemaUId:'1794196a-3832-469e-bf3e-32db86c44dbb',schemaCaption: "UserProfilePage", parentSchemaName: "UserProfilePageTranslation", schemaName:'UserProfilePageCTIBase',parentSchemaUId:'817463c9-7bea-4733-b916-9c18c521a166',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserProfilePageTranslation",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserProfilePageStructure', ['UserProfilePageResources'], function(resources) {return {schemaUId:'72f711ec-221a-4392-8ea8-b94128290334',schemaCaption: "UserProfilePage", parentSchemaName: "UserProfilePageCTIBase", schemaName:'UserProfilePage',parentSchemaUId:'1794196a-3832-469e-bf3e-32db86c44dbb',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"UserProfilePageCTIBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('UserProfilePageNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserProfilePageNUI", ["SysAdminUnit", "DesktopPopupNotification", "StorageUtilities", "LookupUtilities",
		"BaseSchemaModuleV2", "ContextHelpMixin", "css!ProfileModule", "css!UserProfileCSS", "MainMenuUtilities"],
	function(SysAdminUnit, DesktopPopupNotification, StorageUtilities, LookupUtilities) {
		return {
			mixins: {
				ContextHelpMixin: "Terrasoft.ContextHelpMixin"
			},
			messages: {
				"BackHistoryState": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"NeedHeaderCaption": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"InitDataViews": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"ChangeCommandList": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				Culture: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isRequired: true
				},
				DefCulture: {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				DateTimeFormat: {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				DefDateTimeFormat: {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				TimeZone: {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				TimeZoneId: {
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				DefTimeZoneId: {
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				VisibleByBuildType: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				IsSSP: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				},
				SysCultureList: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				DateTimeFormatList: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				TimeZoneList: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				HeaderCaption: {
					dataValueType: Terrasoft.DataValueType.TEXT
				}
			},
			methods: {
				//region Methods: Private

				/**
				 * Initializes culture.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				initCulture: function(callback, scope) {
					this.callService({
						serviceName: "CurrentUserService",
						methodName: "GetCurrentUserCulture"
					}, function onCultureInitialized(response, success) {
							if (!success || !response || !response.cultureInfo) {
								callback.call(scope);
								return;
							}
							const cultureInfo = response.cultureInfo;
							this.onCurrentUserCultureInfoLoaded(cultureInfo);
							callback.call(scope);
					}, this);
				},

				/**
				 * Handles the GetCurrentUserCulture request finished.
				 * @private
				 * @param {Object} cultureInfo Current user's culture info.
				 */
				onCurrentUserCultureInfoLoaded: function(cultureInfo) {
					this.initSysCultureInfo(cultureInfo);
					this.initDateTimeFormatInfo(cultureInfo);
					this.initTimeZoneInfo(cultureInfo);
				},

				/**
				 * Initializes system culture info.
				 * @private
				 * @param {Object} cultureInfo Current user's culture info.
				 */
				initSysCultureInfo: function(cultureInfo) {
					const culture = {
						value: cultureInfo.cultureId,
						displayValue: cultureInfo.cultureLanguage
					};
					this.set("Culture", culture);
					this.set("DefCulture", culture);
				},

				/**
				 * Initializes system date and time format info.
				 * @private
				 * @param {Object} cultureInfo Current user's culture info.
				 */
				initDateTimeFormatInfo: function(cultureInfo) {
					const dateTimeFormat = {
						value: cultureInfo.dateTimeFormatId,
						displayValue: cultureInfo.dateTimeFormatName
					};
					this.set("DateTimeFormat", dateTimeFormat);
					this.set("DefDateTimeFormat", dateTimeFormat);
				},

				/**
				 * Initializes time zone info.
				 * @private
				 * @param {Object} cultureInfo Current user's culture info.
				 */
				initTimeZoneInfo: function(cultureInfo) {
					const timeZoneCode = cultureInfo.timeZoneCode;
					const timeZoneId = cultureInfo.timeZoneId;
					const timeZoneName = cultureInfo.timeZoneName;
					this.set("DefTimeZoneId", timeZoneCode);
					this.set("TimeZone", {
						value: timeZoneId,
						displayValue: timeZoneName,
						code: timeZoneCode
					});
					this.set("TimeZoneId", timeZoneCode);
				},

				/**
				 * Calls CommandLineService web-method.
				 * @private
				 * @param {String} methodName Method name.
				 * @param {Function} callback Callback function.
				 * @param {Object} data Method data.
				 */
				callCommandLineServiceMethod: function(methodName, callback, data) {
					const config = {
						serviceName: "CommandLineService",
						methodName: methodName,
						data: data || {}
					};
					this.callService(config, callback, this);
				},

				/**
				 * Checks if culture is changed.
				 * @private
				 * @param {Object} culture Culture.
				 * @return {Boolean}
				 */
				isCultureChanged: function(culture) {
					var defCulture = this.get("DefCulture");
					var defCultureValue = defCulture && defCulture.value;
					var cultureValue = culture && culture.value;
					return (cultureValue !== defCultureValue);
				},

				/**
				 * Checks if date and time format is changed.
				 * @private
				 * @param {Object} dateTimeFormat Date and time format.
				 * @return {Boolean}
				 */
				isDateTimeFormatChanged: function(dateTimeFormat) {
					var defDateTimeFormat = this.get("DefDateTimeFormat");
					var defDateTimeFormatValue = defDateTimeFormat && defDateTimeFormat.value;
					var dateTimeFormatValue = dateTimeFormat && dateTimeFormat.value;
					return (dateTimeFormatValue !== defDateTimeFormatValue);
				},

				/**
				 * Checks if time zone is changed.
				 * @private
				 * @param {Object} timeZone Time zone.
				 * @return {Boolean}
				 */
				isTimeZoneChanged: function(timeZone) {
					var currentTimeZoneCode = timeZone && timeZone.code;
					return (currentTimeZoneCode !== this.get("DefTimeZoneId"));
				},

				/**
				 * Create data views.
				 * @private
				 * @return {Terrasoft.Collection}
				 */
				createDataViews: function() {
					return this.Ext.create(Terrasoft.Collection);
				},

				/**
				 * Handles successful flush of system profile data.
				 * @private
				 * @param {String} returnCode Message box buttons return code.
				 */
				onProfileFlushed: function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.CLOSE.returnCode) {
						this.reloadPage();
					}
				},

				/**
				 * Reloads page.
				 * @private
				 */
				reloadPage: function() {
					window.location.reload();
				},

				/**
				 * Prepares configuration for update user profile.
				 * @private
				 * @param {Object} changedColumns Changed columns.
				 * @return {Object}
				 */
				prepareUpdateUserProfileConfig: function(changedColumns) {
					return {
						serviceName: "UserProfileEditService",
						methodName: "UpdateUserProfile",
						scope: this,
						data: {
							jsonObject: this.Ext.encode(changedColumns)
						}
					};
				},

				/**
				 * @private
				 */
				_requestLogout: function(callback, scope) {
					const message = this.get("Resources.Strings.NeedRestartMessage");
					const logoutButtonCaption = this.get("Resources.Strings.LogoutButtonCaption");
					const logoutButton = {
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						caption: logoutButtonCaption,
						markerValue: logoutButtonCaption,
						returnCode: "logout"
					};
					const closeButtonCaption = Terrasoft.Resources.Controls.MessageBox.ButtonCaptionClose;
					const closeButton = {
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
						caption: closeButtonCaption,
						markerValue: closeButtonCaption,
						returnCode: Terrasoft.MessageBoxButtons.CLOSE.returnCode
					};
					this.showConfirmationDialog(message, function(returnCode) {
						callback.call(scope, returnCode === logoutButton.returnCode);
					}, [logoutButton, closeButton], {defaultButton: 0});
				},

				/**
				 * Save callback.
				 * @private
				 * @param {Object} response Response.
				 */
				saveCallback: function(response) {
					response.message = response.UpdateUserProfileResult || response.UpdateOrCreateUserResult;
					response.success = this.Ext.isEmpty(response.message);
					if (response.success) {
						this._requestLogout(function(result) {
							if (result) {
								Terrasoft.MainMenuUtilities.logout();
							} else {
								this.onCancelClick();
							}
						}, this);
					} else {
						this.showInformationDialog(this.get("Resources.Strings.SaveExceptionMessage"));
						throw new Terrasoft.InvalidOperationException({message: response.message});
					}
				},

				/**
				 * Handles flush confirmation dialog callback.
				 * @private
				 * @param {String} returnCode Message box buttons return code.
				 */
				flushConfirmationDialogCallback: function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						var query = this.createSysProfileDataDeleteQuery();
						query.execute(this.processFlushResponse, this);
					}
				},

				/**
				 * Prepares config for macros modal box.
				 * @private
				 * @return {Object}
				 */
				prepareMacrosModalBoxConfig: function() {
					var scope = this;
					return {
						entitySchemaName: "Macros",
						mode: "editMode",
						multiSelect: false,
						columnName: "Name",
						filters: this.createContactFilter(),
						cardCustomConfig: {
							cardSchema: "MacrosPageModule"
						},
						methods: {
							onDeleted: function() {
								scope.callCommandLineServiceMethod("ClearCache", function() {
										StorageUtilities.clearStorage(
											StorageUtilities.ClearStorageModes.GROUP, "CommandLineStorage");
										scope.sandbox.publish("ChangeCommandList");
									},
									{
										"cacheArray": ["VwCommandActionCache", "CommandParamsCache"]
									});
							}
						}
					};
				},

				/**
				 * Creates filter group for current contact.
				 * @private
				 * @return {Terrasoft.FilterGroup}
				 */
				createContactFilter: function() {
					var contactFilter = Terrasoft.createFilterGroup();
					contactFilter.name = "contactFilter";
					var filter = Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "CreatedBy",
						Terrasoft.SysValue.CURRENT_USER_CONTACT.value);
					contactFilter.addItem(filter);
					return contactFilter;
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initContextHelp();
						this.subscribeSandboxEvents();
						this.set("TimeZone", null);
						this.set("TimeZoneId", null);
						this.set("HeaderCaption", this.getHeader());
						this.set("SysCultureList", this.Ext.create(Terrasoft.Collection));
						this.set("DateTimeFormatList", this.Ext.create(Terrasoft.Collection));
						this.set("TimeZoneList", this.Ext.create(Terrasoft.Collection));
						this.set("isNotificationsSupported", DesktopPopupNotification.getIsNotificationSupported());
						this.set("IsSSP", Terrasoft.isCurrentUserSsp());
						this.initCulture(function() {
							this.initSysSettings();
							callback.call(scope);
						}, this);
					}, this]);
				},

				/**
				 * Initializes system settings.
				 * @protected
				 * @virtual
				 */
				initSysSettings: function() {
					Terrasoft.SysSettings.querySysSettingsItem("ShowDemoLinks", function(value) {
						this.set("VisibleByBuildType", !value);
					}, this);
				},

				/**
				 * Subscribes to sandbox events.
				 * @protected
				 * @virtual
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("NeedHeaderCaption", this.onNeedHeaderCaption, this);
				},

				/**
				 * Handles "NeedHeaderCaption" event.
				 * @protected
				 * @virtual
				 */
				onNeedHeaderCaption: function() {
					this.sandbox.publish("InitDataViews", {caption: this.get("HeaderCaption")});
				},

				/**
				 * Gets header caption.
				 * @protected
				 * @virtual
				 * @return {String}
				 */
				getHeader: function() {
					return this.Ext.String.format(this.get("Resources.Strings.HeaderCaption"),
						Terrasoft.SysValue.CURRENT_USER_CONTACT.displayValue);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					this.hideBodyMask();
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: this.get("HeaderCaption"),
						dataViews: this.createDataViews()
					});
				},

				/**
				 * Processes system profile data flush response.
				 * @param {Object} response Response.
				 */
				processFlushResponse: function(response) {
					var callback;
					var message;
					if (response && response.success) {
						message = this.get("Resources.Strings.FlushSuccessful");
						callback = this.onProfileFlushed;
					} else {
						message = this.get("Resources.Strings.OnFlushError");
						callback = Terrasoft.emptyFn;
					}
					this.showConfirmationDialog(message, callback);
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
				 * @inheritdoc Terrasoft.ContextHelpMixin#getContextHelpId
				 * @overridden
				 */
				getContextHelpId: function() {
					return "1012";
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
				 * Prepares date and time format list item.
				 * @protected
				 * @virtual
				 * @param {Object} item Date and time format list item.
				 * @return {Object}
				 */
				prepareDateTimeFormatListItem: function(item) {
					return {
						value: item.get("Id"),
						displayValue: item.get("Name")
					};
				},

				/**
				 * Prepares time zone list item.
				 * @protected
				 * @virtual
				 * @param {Object} item Time zone list item.
				 * @return {Object}
				 */
				prepareTimeZoneListItem: function(item) {
					return {
						value: item.get("Id"),
						displayValue: item.get("Name"),
						code: item.get("Code")
					};
				},

				/**
				 * Initializes system culture query filters.
				 * @protected
				 * @virtual
				 */
				initSysCultureQueryFilters: Terrasoft.emptyFn,

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
				 * Initializes date and time format query columns.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
				 */
				initDateTimeFormatQueryColumns: function(esq) {
					esq.addColumn("Id");
					var nameColumn = esq.addColumn("Name");
					nameColumn.orderPosition = 0;
					nameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				},

				/**
				 * Initializes time zone query columns.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
				 */
				initTimeZoneQueryColumns: function(esq) {
					esq.addColumn("Id");
					esq.addColumn("Name");
					esq.addColumn("Code");
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
				 * Creates date and time format info entity schema query.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				createDateTimeFormatQuery: function() {
					var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {rootSchemaName: "SysLanguage"});
					this.initDateTimeFormatQueryColumns(esq);
					return esq;
				},

				/**
				 * Creates TimeZone entity schema query.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				createTimeZoneQuery: function() {
					var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {rootSchemaName: "TimeZone"});
					this.initTimeZoneQueryColumns(esq);
					return esq;
				},

				/**
				 * Creates SysProfileData delete query.
				 * @protected
				 * @return {Terrasoft.DeleteQuery}
				 */
				createSysProfileDataDeleteQuery: function() {
					var query = this.Ext.create(Terrasoft.DeleteQuery, {
						rootSchemaName: "SysProfileData"
					});
					var currentUserContactId = Terrasoft.SysValue.CURRENT_USER_CONTACT.value;
					var filter = Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Contact", currentUserContactId);
					query.filters.addItem(filter);
					return query;
				},

				//endregion

				//region Methods: Public

				/**
				 * Handles save button click.
				 */
				onSaveClick: function() {
					if (!this.validate()) {
						return;
					}
					var culture = this.get("Culture");
					var cultureChanged = this.isCultureChanged(culture);
					var dateTimeFormat = this.get("DateTimeFormat");
					var dateTimeFormatChanged = this.isDateTimeFormatChanged(dateTimeFormat);
					var timeZone = this.get("TimeZone");
					var timeZoneChanged = this.isTimeZoneChanged(timeZone);
					var changedColumns = {};
					if (cultureChanged) {
						changedColumns.SysCulture = culture.value;
					}
					if (dateTimeFormatChanged) {
						changedColumns.DateTimeFormat = dateTimeFormat && dateTimeFormat.value;
					}
					if (timeZoneChanged) {
						changedColumns.TimeZone = timeZone && timeZone.value;
					}
					if (Terrasoft.isEmptyObject(changedColumns)) {
						this.onCancelClick();
					} else {
						changedColumns.Id = Terrasoft.SysValue.CURRENT_USER.value;
						var config = this.prepareUpdateUserProfileConfig(changedColumns);
						this.callService(config, this.saveCallback, this);
					}
				},

				/**
				 * Handles cancel button click.
				 */
				onCancelClick: function() {
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * Handles password settings button click.
				 */
				onPasswordSettingsClick: function() {
					this.sandbox.publish("PushHistoryState", {hash: "ChangePasswordModule"});
				},

				/**
				 * Handles mail settings button click.
				 */
				onMailSettingsClick: function() {
					var mailModule = "MailboxSynchronizationSettingsModule";
					this.sandbox.publish("PushHistoryState", {hash: mailModule});
				},

				/**
				 * Handles social accounts button click.
				 */
				onSocialAccountsClick: function() {
					var socialModule = "SocialAccountModule";
					this.sandbox.publish("PushHistoryState", {hash: socialModule});
				},

				/**
				 * Handles notification settings button click.
				 */
				onNotificationsSettingsClick: function() {
					var notificationsSettingsModule = "NotificationsSettingsModule";
					this.sandbox.publish("PushHistoryState", {hash: notificationsSettingsModule});
				},

				/**
				 * Checks if default settings button visible.
				 * @return {Boolean}
				 */
				isDefaultSettingsButtonVisible: function() {
					return !this.get("IsSSP");
				},

				/**
				 * Checks if command line settings visible.
				 * @return {Boolean}
				 */
				isCommandLineSettingsVisible: function() {
					return !this.get("IsSSP");
				},

				/**
				 * Checks if sync settings visible.
				 * @return {Boolean}
				 */
				isSyncSettingsVisible: function() {
					return (this.get("VisibleByBuildType") && !this.get("IsSSP"));
				},

				/**
				 * Checks if notifications settings visible.
				 * @return {Boolean}
				 */
				isNotificationsSettingsVisible: function() {
					return (this.get("isNotificationsSupported") && !this.get("IsSSP"));
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
				},

				/**
				 * Event handler for prepare list event of date and time format lookup.
				 */
				onPrepareDateTimeFormatList: function() {
					var esq = this.createDateTimeFormatQuery();
					esq.getEntityCollection(function(response) {
						if (!response || !response.success) {
							return;
						}
						var list = this.get("DateTimeFormatList");
						var columnList = {};
						response.collection.each(function(item) {
							columnList[item.get("Id")] = this.prepareDateTimeFormatListItem(item);
						}, this);
						list.clear();
						list.loadAll(columnList);
					}, this);
				},

				/**
				 * Event handler for prepare list event of time zone lookup.
				 */
				onPrepareTimeZoneList: function() {
					var esq = this.createTimeZoneQuery();
					esq.getEntityCollection(function(response) {
						if (!response || !response.success) {
							return;
						}
						var list = this.get("TimeZoneList");
						var columnList = {};
						response.collection.each(function(item) {
							columnList[item.get("Id")] = this.prepareTimeZoneListItem(item);
						}, this);
						list.clear();
						list.loadAll(columnList);
					}, this);
				},

				/**
				 * Flushes system profile data to default.
				 */
				flushToDefault: function() {
					this.showConfirmationDialog(this.get("Resources.Strings.OnFlushWarning"),
						this.flushConfirmationDialogCallback, ["yes", "no"]);
				},

				/**
				 * Opens command line settings.
				 */
				openCommandsGrid: function() {
					LookupUtilities.Open(this.sandbox, this.prepareMacrosModalBoxConfig(), Terrasoft.emptyFn, this);
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "profileModuleTopContainer",
					"values": {
						"id": "profileModuleTopContainer",
						"selectors": {wrapEl: "#profileModuleTopContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-module"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "buttonsMenu",
					"parentName": "profileModuleTopContainer",
					"propertyName": "items",
					"values": {
						"id": "buttonsMenu",
						"selectors": {wrapEl: "#buttonsMenu"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["buttons-menu-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SaveButton",
					"parentName": "buttonsMenu",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"click": {"bindTo": "onSaveClick"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"classes": {"textClass": "profile-save-button"}
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "buttonsMenu",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
						"click": {"bindTo": "onCancelClick"}
					}
				},
				{
					"operation": "insert",
					"name": "leftContainer",
					"parentName": "profileModuleTopContainer",
					"propertyName": "items",
					"values": {
						"id": "left-container",
						"selectors": {wrapEl: "#left-container"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["left-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "leftTopGroupContainer",
					"parentName": "leftContainer",
					"propertyName": "items",
					"values": {
						"id": "leftTopGroupContainer",
						"selectors": {wrapEl: "#leftTopGroupContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-module-left-container-bottom-border"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "password",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ChangePasswordCaption"},
						"click": {"bindTo": "onPasswordSettingsClick"},
						"classes": {"textClass": "profile-button"},
						"tag": "password"
					}
				},
				{
					"operation": "insert",
					"name": "LanguageCaption",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.LanguageCaption"},
						"classes": {
							"labelClass": ["controlCaption"]
						},
						"markerValue": "culture-value"
					}
				},
				{
					"operation": "insert",
					"name": "Culture",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "Culture",
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {"visible": false},
						"controlConfig": {
							"prepareList": {"bindTo": "onPrepareSysCultureList"},
							"list": {"bindTo": "SysCultureList"},
							"classes": ["combo-box-edit-wrap"]
						},
						"markerValue": "Culture"
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeFormatCaption",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.DateTimeFormatCaption"},
						"classes": {
							"labelClass": ["controlCaption"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeFormat",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "DateTimeFormat",
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {"visible": false},
						"controlConfig": {
							"prepareList": {"bindTo": "onPrepareDateTimeFormatList"},
							"list": {"bindTo": "DateTimeFormatList"},
							"classes": ["combo-box-edit-wrap"]
						},
						"markerValue": "DateTimeFormat"
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneCaption",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": SysAdminUnit.columns.TimeZoneId.caption,
						"classes": {
							"labelClass": ["controlCaption"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "TimeZone",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "TimeZone",
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {"visible": false},
						"controlConfig": {
							"filterComparisonType": Terrasoft.StringFilterType.CONTAIN,
							"prepareList": {"bindTo": "onPrepareTimeZoneList"},
							"list": {"bindTo": "TimeZoneList"},
							"classes": ["combo-box-edit-wrap"]
						},
						"markerValue": "time-zone-value"
					}
				},
				{
					"operation": "insert",
					"name": "myCommands",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.MyCommandsCaption"},
						"click": {"bindTo": "openCommandsGrid"},
						"classes": {"textClass": "profile-button"},
						"tag": "myCommands",
						"visible": {"bindTo": "isCommandLineSettingsVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "leftMiddleGroupContainer",
					"parentName": "leftContainer",
					"propertyName": "items",
					"values": {
						"id": "leftMiddleGroupContainer",
						"selectors": {wrapEl: "#leftMiddleGroupContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-module-left-container-bottom-border"],
						"visible": {"bindTo": "isSyncSettingsVisible"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Mailboxes",
					"parentName": "leftMiddleGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.MailboxesCaption"},
						"click": {"bindTo": "onMailSettingsClick"},
						"classes": {"textClass": "profile-button"}
					}
				},
				{
					"operation": "insert",
					"name": "SocialNetworkAccounts",
					"parentName": "leftMiddleGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SocialNetworkAccountsCaption"},
						"click": {"bindTo": "onSocialAccountsClick"},
						"classes": {"textClass": "profile-button"},
						"markerValue": "SocialAccountsButton"
					}
				},
				{
					"operation": "insert",
					"name": "notificationGroupContainer",
					"parentName": "leftContainer",
					"propertyName": "items",
					"values": {
						"id": "notificationGroupContainer",
						"selectors": {wrapEl: "#notificationGroupContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-module-left-container-bottom-border"],
						"visible": {"bindTo": "isNotificationsSettingsVisible"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationButton",
					"parentName": "notificationGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.NotificationsSettingsCaption"},
						"click": {"bindTo": "onNotificationsSettingsClick"},
						"classes": {"textClass": "profile-button"}
					}
				},
				{
					"operation": "insert",
					"name": "DefaultSettings",
					"parentName": "leftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.DefaultSettingsCaption"},
						"click": {"bindTo": "flushToDefault"},
						"classes": {"textClass": "profile-button"},
						"tag": "default",
						"visible": {"bindTo": "isDefaultSettingsButtonVisible"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define('UserProfilePageTranslationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserProfilePageTranslation", [],
	function() {
		return {
			methods: {
				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.UserProfilePage#getSysCultureDisplayValue
				 * @overridden
				 */
				getSysCultureDisplayValue: function(item) {
					var language = item.get("Language");
					return language.displayValue;
				},

				/**
				 * @inheritdoc Terrasoft.UserProfilePage#initSysAdminUnitQueryColumns
				 * @overridden
				 */
				initSysAdminUnitQueryColumns: function(esq) {
					this.callParent(arguments);
					esq.addColumn("[SysCulture:Id:SysCulture].Language", "Language");
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.UserProfilePage#initSysCultureQueryFilters
				 * @overridden
				 */
				initSysCultureQueryFilters: function(esq) {
					this.callParent(arguments);
					esq.filters.add("ActiveLanguageFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Active", true));
				},

				/**
				 * @inheritdoc Terrasoft.UserProfilePage#initSysCultureQueryColumns
				 * @overridden
				 */
				initSysCultureQueryColumns: function(esq) {
					this.callParent(arguments);
					esq.addColumn("Language");
				}

				//endregion
			}
		};
	}
);

define('UserProfilePageCTIBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("UserProfilePageCTIBase", [],
	function() {
		return {
			methods: {
				//region Methods: Public

				/**
				 * Opens setup call centre parameters page.
				 */
				setupCallCentreParameters: function() {
					var callCentreParametersModule = "SetupTelephonyParametersPageModule";
					this.sandbox.publish("PushHistoryState", {hash: callCentreParametersModule});
				},

				/**
				 * Determines if call centre settings button is visible.
				 * @return {Boolean}
				 */
				isCallCentreSettingsVisible: function() {
					return !this.get("IsSSP");
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "callCentreSetup",
					"parentName": "leftTopGroupContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SetupCallCentreParameters"},
						"click": {"bindTo": "setupCallCentreParameters"},
						"classes": {"textClass": "profile-button"},
						"tag": "callCentreSetup",
						"visible": {"bindTo": "isCallCentreSettingsVisible"},
						"markerValue": "callCentreSetup"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("UserProfilePage", ["RightUtilities", "UserCalendarMixin"], function(RightUtilities) {
	return {
		attributes: {
			/**
			 * Sign of personal calendar feature.
			 * @type {Boolean}
			 */
			IsUserCalendarFeature: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * Identifier of the personal calendar.
			 * @type {Guid}
			 */
			UserCalendarId: {
				dataValueType: this.Terrasoft.DataValueType.GUID,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Identifier of the default personal calendar.
			 * @type {Guid}
			 */
			BaseUserCalendarId: {
				dataValueType: this.Terrasoft.DataValueType.GUID,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Default personal calendar.
			 * @type {Object}
			 */
			LoadedBaseUserCalendar: {
				dataValueType: this.Terrasoft.DataValueType.ENTITY,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			/**
			 * Sign of rights for administration.
			 * @type {Boolean}
			 */
			CanManageAdministration: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * Sing of personal calendar feature.
			 * @type {Boolean}
			 */
			IsVisibleCalendarButton: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		mixins: {
			UserCalendarMixin: "Terrasoft.UserCalendarMixin"
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.UserProfilePage#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.set("IsUserCalendarFeature", this.Terrasoft.Features.getIsEnabled("UserCalendar"));
				if (this.get("IsUserCalendarFeature")) {
					this.callParent([function() {
								this.initCalendar(callback, scope);
							}, this
					]);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * Initialize calendar.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			initCalendar: function(callback, scope) {
				this.Terrasoft.chain(
						this.checkRightOperation,
						this.initUserCalendar,
						this.setVisibleCalendarButton,
						function() {
							this.Ext.callback(callback, scope || this);
						}, this
				);
			},

			/**
			 * Checking administration rights.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			checkRightOperation: function(callback, scope) {
				RightUtilities.checkCanExecuteOperation({
					operation: this.getOperationRight()
				}, function(result) {
					this.set("CanManageCalendar", result);
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Returns operation right name.
			 * @protected
			 * @return {String} Operation name.
			 */
			getOperationRight: function() {
				return "CanManageAdministration";
			},

			/**
			 * Sets visible calendar button.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			setVisibleCalendarButton: function(callback, scope) {
				var canManaged = this.get("CanManageCalendar");
				var feature = this.get("IsUserCalendarFeature");
				this.set("IsVisibleCalendarButton", canManaged && feature);
				this.Ext.callback(callback, scope || this);
			},

			/**
			 * @inheritdoc Terrasoft.UserProfilePage#initSysSettings
			 * @overridden
			 */
			initSysSettings: function() {
				this.initSysSettingBaseUserCalendar();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.UserCalendarMixin#initUserCalendarQueryFilters
			 * @overridden
			 */
			initUserCalendarQueryFilters: function(esq) {
				var filter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"User",
						this.Terrasoft.SysValue.CURRENT_USER.value);
				esq.filters.addItem(filter);
			},

			/**
			 * @inheritdoc Terrasoft.UserCalendarMixin#setUserCalendarParameterValues
			 * @overridden
			 */
			setUserCalendarParameterValues: function(update) {
				update.setParameterValue("User",
						this.Terrasoft.SysValue.CURRENT_USER.value,
						this.Terrasoft.DataValueType.GUID);
				update.setParameterValue("Name",
						this.getUserCalendarName(),
						this.Terrasoft.DataValueType.TEXT);
			},

			/**
			 * @inheritdoc Terrasoft.UserCalendarMixin#getUserCalendarName
			 * @overridden
			 */
			getUserCalendarName: function() {
				var template = this.getUserCalendarNameTemplate();
				return this.Ext.String.format(template, this.Terrasoft.SysValue.CURRENT_USER.displayValue);
			},

			/**
			 * @inheritdoc Terrasoft.UserCalendarMixin#openCalendarCard
			 * @overridden
			 */
			openCalendarCard: function() {
				var recordId = this.getUserCalendarId();
				this.openCardInChain({
					schemaName: "CalendarPage",
					id: recordId,
					operation: this.Terrasoft.ConfigurationEnums.CardOperation.EDIT,
					renderTo: "centerPanel"
				});
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "CalendarContainer",
				"parentName": "leftTopGroupContainer",
				"propertyName": "items",
				"values": {
					"id": "CalendarContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["profile-module-left-container-bottom-border"],
					"visible": {"bindTo": "IsVisibleCalendarButton"},
					"items": []
				},
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Calendar",
				"parentName": "CalendarContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CalendarCaption"},
					"click": {"bindTo": "onCalendarClick"},
					"classes": {"textClass": "profile-button"},
					"markerValue": "CalendarButton"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


