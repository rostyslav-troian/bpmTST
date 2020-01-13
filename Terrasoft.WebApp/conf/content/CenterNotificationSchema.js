Terrasoft.configuration.Structures["CenterNotificationSchema"] = {innerHierarchyStack: ["CenterNotificationSchemaUIv2", "CenterNotificationSchema"]};
define('CenterNotificationSchemaUIv2Structure', ['CenterNotificationSchemaUIv2Resources'], function(resources) {return {schemaUId:'f847371a-18c7-423a-90d4-6861a0ff94ed',schemaCaption: "CenterNotificationSchema", parentSchemaName: "", schemaName:'CenterNotificationSchemaUIv2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CenterNotificationSchemaStructure', ['CenterNotificationSchemaResources'], function(resources) {return {schemaUId:'5b9c43ed-4577-4e96-89f3-25461fabea67',schemaCaption: "CenterNotificationSchema", parentSchemaName: "CenterNotificationSchemaUIv2", schemaName:'CenterNotificationSchema',parentSchemaUId:'f847371a-18c7-423a-90d4-6861a0ff94ed',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CenterNotificationSchemaUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CenterNotificationSchemaUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CenterNotificationSchemaUIv2", ["CenterNotificationSchemaResources", "RemindingsUtilities",
			"DesktopPopupNotification", "NetworkUtilities", "TitleNotificationUtilities", "ESNConstants",
			"ConfigurationConstants", "ProcessModuleUtilities", "ViewGeneratorV2", "NotificationCountersServiceRequest"],
		function(resources, RemindingsUtilities, DesktopPopupNotification, NetworkUtilities,
				TitleNotificationUtilities, ESNConstants, ConfigurationConstants, ProcessModuleUtilities,
				ViewGenerator) {
			return {
				mixins: {
					TitleNotificationUtilities: "Terrasoft.TitleNotificationUtilities"
				},
				messages: {
					/**
					 * @message CommunicationPanelItemSelected
					 * Notify about change selected item.
					 */
					"CommunicationPanelItemSelected": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message NotificationInfo
					 * Notification that has been received information about notifications.
					 */
					"NotificationInfo": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message UpdateReminding
					 * Notification that has been changed count of the notifications.
					 */
					"UpdateReminding": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetRemindingCounters
					 * Notification that has been received information about notification counters.
					 */
					"GetRemindingCounters": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message CenterCounterChanged
					 * Notify about changes in the center notifications counter.
					 * @param {Number} Number of the notifications.
					 */
					"CenterCounterChanged": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message UpdateCounters
					 * Notify about changes in the some notification counter.
					 */
					"UpdateCounters": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message UpdateCounterValues
					 * Notify about changes in the some notification counter group.
					 */
					"UpdateCounterValues": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message PushHistoryState
					 * Notify about changes in the chain.
					 */
					"PushHistoryState": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message ProcessExecDataChanged
					 * Reports that changed the current element of the process.
					 */
					"ProcessExecDataChanged": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message UpdateNotifications
					 * Notify about changes in notifications items.
					 */
					"UpdateNotifications": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message IsCommunicationPanelItemSelect
					 * Returns state of the communication panel item select.
					 */
					"IsCommunicationPanelItemSelect": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message MarkNewNotificationsAsRead
					 * Publication about the need to update notifications.
					 */
					"MarkNewNotificationsAsRead": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message ReloadCard
					 * Rediscovers card.
					 */
					"ReloadCard": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message ProcessExecDataChanged
					 * Notify about the removing notification counters.
					 */
					"RemoveNotificationCounters": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetActiveTabName
					 * Returns active tab name.
					 */
					"GetActiveTabName": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetLastRemindTime
					 * Returns last reminding's date.
					 */
					"GetLastRemindTime": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				attributes: {
					/**
					 * Count of all notifications.
					 * @public
					 */
					AllNotificationsCount: {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						value: 0
					},

					/**
					 * Collection of the tabs.
					 * @private
					 */
					TabsCollection: {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						value: new Terrasoft.BaseViewModelCollection()
					},

					/**
					 * Name of the active tab.
					 * @private
					 */
					ActiveTabName: {
						ataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Flag for scroll visibility.
					 * @private
					 */
					IsScrollVisible: {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Configuration object for tab images.
					 * @private
					 */
					TabsImages: {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: []
					},

					/**
					 * Notification channels name with tab name.
					 * @private
					 */
					NotificationChannelConfigs: {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: []
					},

					/**
					 * Name of the loaded module.
					 * @private
					 */
					LoadedModuleName: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Container template for modules.
					 * @private
					 */
					WrapContainerNamePattern: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: "ts-{0}-container"
					},

					/**
					 * Names of the notification senders.
					 * @private
					 */
					NotificationSenders: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: [ "ESNNotification", "UpdateSocialMessage", "GetRemindingCounters", "UpdateReminding" ]
					},

					/**
					 * Default url-image for popup.
					 * @private
					 */
					DefaultPopupImage: {
						dataValueType: Terrasoft.DataValueType.IMAGE,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPopupIcon)
					},

					/**
					 * Counter url-image for popup.
					 * @private
					 */
					PopupImageCounter: {
						dataValueType: Terrasoft.DataValueType.IMAGE,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Reminding)
					},

					/**
					 * Time display notifications. Default 7 seconds.
					 * @private
					 */
					TimeDisplayPopup: {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: 7
					},

					/**
					 * Shows notifications or not.
					 * @private
					 */
					IsNotificationsEnable: {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Keeps last notifications response.
					 * @private
					 */
					LastNotificationsResponse: {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * The maximum value of the counter to display.
					 * @type {Number}
					 */
					MaxCounter: {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: 99
					},

					/**
					 * Mapping object between new and old counters properties names.
					 * @type {Object}
					 * @private
					 */
					NotificationCountersMap: {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Notification info sender name.
					 * @type {String}
					 * @private
					 */
					NotificationInfoSender: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: "NotificationInfo"
					},

					/**
					 * Counters value.
					 * @type {Object}
					 * @private
					 */
					CountersValue: {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: {}
					},

					/**
					 * Default value of sender for notification counter.
					 * @type {String}
					 * @private
					 */
					DefaultNotificationCounterSender: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: "DefaultSender"
					},

					/**
					 * Use notification on one class job.
					 * @type {Boolean}
					 * @private
					 */
					UseNotificationsOnOneClassJob: {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Name for the local storage.
					 */
					LocalStoreName: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: "Popups"
					},

					/**
					 * Instance of the Terrasoft.LocalStore.
					 */
					LocalStore: {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Maximum number of the same time displayed popup notifications.
					 */
					MaxDisplayedPopupsNumber: {
						dataValueType: Terrasoft.DataValueType.NUMBER,
						value: 3
					}

				},
				properties: {
					/**
					 * Use date for notifications query
					 */
					useDateForNotificationsQuery: false,

					/**
					 * Contains last reminding's date
					 */
					lastRemindTime: null
				},
				methods: {
					/**
					 * @inheritDoc Terrasoft.BaseViewModel#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.generateView(scope);
						var useNotificationsOnOneClassJob = this.getIsFeatureEnabled("NotificationsOnOneClassJob");
						var isNotificationV2FeatureEnabled = this.getIsFeatureEnabled("NotificationV2");
						this.set("NotificationV2Enabled", isNotificationV2FeatureEnabled);
						this.set("UseNotificationsOnOneClassJob", useNotificationsOnOneClassJob);
						if (useNotificationsOnOneClassJob || isNotificationV2FeatureEnabled) {
							this.addNewNotificationInfoSender();
							this.setNotificationCountersMap();
						}
						this.callParent(arguments);
						this._initLastRemindTime();
						this.prepareTabsCollection();
						this.subscribeEvents();
						this.mixins.TitleNotificationUtilities.init.call(this);
						this.initPopups();
						if (isNotificationV2FeatureEnabled
								&& this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.GENERAL) {
							this._loadCounters();
						} else {
							this.initLocalStore();
							if (!this._getIsPanelActive()) {
								this.onUpdateCounters({
									groupName: ConfigurationConstants.NotificationGroup.All
								});
							}
						}
						this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_CONNECTION_INITIALIZED,
							this._loadCounters, this);
					},

					/**
					 * Gets NotificationCountersServiceRequest instance.
					 * @protected
					 * @virtual
					 * @returns {Terrasoft.NotificationCountersServiceRequest} Request instance.
					 */
					getNotificationCountersServiceRequest: function() {
						return this.Ext.create("Terrasoft.NotificationCountersServiceRequest");
					},

					/**
					 * Init attributes UseDateForNotificationsQuery.
					 * @protected
					 */
					setUseDateForNotificationsQuery: function() {
						this.useDateForNotificationsQuery = this.getIsFeatureEnabled("UseDateForNotificationsQuery");
					},

					/**
					 * Returns is UseDateForNotificationsQuery enabled.
					 * @returns {Boolean}
					 * @private
					 */
					_getUseDateForNotificationsQuery: function() {
						return this.useDateForNotificationsQuery;
					},
					/**
					 * Init attributes UseDateForNotificationsQuery and LastRemindTime.
					 * @private
					 */
					_initLastRemindTime: function() {
						this.setUseDateForNotificationsQuery();
						if (this._getUseDateForNotificationsQuery()) {
							this._setLastRemindTime(new Date(this.Ext.Date.now()));
						}
					},

					/**
					 * Loads all counters values.
					 * @private
					 */
					_loadCounters: function() {
						var request = this.getNotificationCountersServiceRequest();
						request.getCounters(this.updateCountersValue, this);
					},

					/**
					 * Initializes local store.
					 * @protected
					 */
					initLocalStore: function() {
						var localStore = Terrasoft.StoreManager.registerStore({
							levelName: this.get("LocalStoreName"),
							type: "Terrasoft.LocalStore",
							isCache: false
						});
						if (!localStore.getItem("CenterNotification")) {
							localStore.clear();
							localStore.setItem("CenterNotification", []);
						}
						this.set("LocalStore", localStore);
					},

					/**
					 * Sets mapping object between new and old counters properties names.
					 * @private
					 */
					setNotificationCountersMap: function() {
						this.set("NotificationCountersMap", {
							notification: "notificationsCount",
							reminding: "remindingsCount",
							visa: "visaCount",
							anniversary: "anniversariesCount",
							esnnotification: "esnNotificationsCount"
						});
					},

					/**
					 * Adds new notification sender.
					 * @private
					 */
					addNewNotificationInfoSender: function() {
						var notificationSenders = this.get("NotificationSenders");
						var notificationInfoSender = this.get("NotificationInfoSender");
						notificationSenders.push(notificationInfoSender);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#onRender
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						this.activatePanel();
					},

					/**
					 * Generates view for tabs.
					 * @private
					 * @param {Object} scope Scope of schema.
					 */
					generateView: function(scope) {
						var config = this.Terrasoft.findItem(scope.viewConfig, {tag: "ModuleContainer"});
						var tabs = this.getTabsConfig();
						var modulesConfig = this.getGeneratedModulesConfig(tabs);
						var initConfig = this.getInitConfig({});
						var modulesContainer = config.item;
						modulesContainer.items = [];
						this.Terrasoft.each(modulesConfig, function(moduleConfig) {
							var generatedView = ViewGenerator.generatePartial(moduleConfig, initConfig)[0];
							modulesContainer.items.push(generatedView);
						});
					},

					/**
					 * Returns current generator initialization config, applies custom config to the default values.
					 * @private
					 * @param {Object} config Custom config.
					 * @return {Object} Custom config with default values.
					 */
					getInitConfig: function(config) {
						return this.Ext.apply({
							schema: {},
							schemaType: this.Terrasoft.SchemaType.MODULE,
							viewModelClass: this.Ext.ClassManager.get("Terrasoft.BaseViewModel")
						}, config);
					},

					/**
					 * Returns tabs config.
					 * @private
					 * @return {Array} Config for tabs.
					 */
					getTabsConfig: function() {
						return [
							this.getReminderTabConfig(),
							this.getESNTabConfig(),
							this.getVisaTabConfig(),
							this.getAnniversaryTabConfig(),
							this.getSystemTabConfig()
						];
					},

					/**
					 * Returns visas tab config.
					 * @return {Object} Tab config.
					 */
					getVisaTabConfig: function() {
						return {
							Name: "Visa",
							IsRequired: true,
							ModuleName: "VisaModule",
							NotificationType: ConfigurationConstants.Reminding.Visa,
							NotificationGroup: ConfigurationConstants.NotificationGroup.Visa,
							TabImageName: "VisaNotification",
							ActiveTabImageName: "VisaNotificationActive",
							MarkerValue: "Visa",
							VisibleAttribute: "VisaVisible",
							ChannelConfig: {
								name: "visaCount",
								readOnOpen: false,
								typeId: null
							},
							Module: {
								moduleId: "VisaNotificationsTabModule",
								schemaName: "VisaNotificationsSchema",
								wrapClassName: ["ts-visamodule-container"]
							}
						};
					},

					/**
					 * Returns reminder tab config.
					 * @return {Object} Tab config.
					 */
					getReminderTabConfig: function() {
						return {
							Name: "Reminder",
							IsRequired: true,
							TabImageName: "NotificationsNotification",
							ActiveTabImageName: "NotificationsNotificationActive",
							MarkerValue: "Reminder",
							NotificationType: ConfigurationConstants.Reminding.Reminding,
							NotificationGroup: ConfigurationConstants.NotificationGroup.Reminding,
							VisibleAttribute: "ReminderVisible",
							ChannelConfig: {
								name: "remindingsCount",
								readOnOpen: false,
								typeId: null
							},
							Module: {
								moduleId: "ReminderTabModule",
								schemaName: "ReminderNotificationsSchema",
								wrapClassName: ["ts-notifications-container"]
							}
						};
					},

					/**
					 * Returns ESN tab config.
					 * @return {Object} Tab config.
					 */
					getESNTabConfig: function() {
						return {
							Name: "Esn",
							IsRequired: true,
							TabImageName: "ESNNotification",
							ActiveTabImageName: "ESNNotificationActive",
							NotificationGroup: ConfigurationConstants.NotificationGroup.EsnNotification,
							MarkerValue: "Esn",
							VisibleAttribute: "ESNNotificationVisible",
							ChannelConfig: {
								name: "esnNotificationsCount",
								readOnOpen: true,
								typeId: ESNConstants.ESN.SocialChannelSchemaUId
							},
							Module: {
								moduleId: "ESNNotificationTabModule",
								schemaName: "ESNNotificationSchema",
								wrapClassName: [
									"esn-notifications-main-container",
									".default-esn-notification-items-container-class"
								]
							}
						};
					},

					/**
					 * Returns anniversary tab config.
					 * @return {Object} Tab config.
					 */
					getAnniversaryTabConfig: function() {
						return {
							Name: "Anniversary",
							IsRequired: true,
							TabImageName: "AnniversaryNotification",
							ActiveTabImageName: "AnniversaryNotificationActive",
							MarkerValue: "Anniversary",
							NotificationType: ConfigurationConstants.Reminding.Anniversary,
							NotificationGroup: ConfigurationConstants.NotificationGroup.Anniversary,
							VisibleAttribute: "AnniversaryNotificationsVisible",
							ChannelConfig: {
								name: "anniversariesCount",
								readOnOpen: true,
								typeId: ConfigurationConstants.Reminding.Anniversary
							},
							Module: {
								moduleId: "AnniversaryNotificationsTabModule",
								schemaName: "AnniversaryNotificationsSchema",
								wrapClassName: ["ts-anniversarynotificationsmodule-container"]
							}
						};
					},

					/**
					 * Returns system tab config.
					 * @return {Object} Tab config.
					 */
					getSystemTabConfig: function() {
						return {
							Name: "System",
							IsRequired: true,
							TabImageName: "SystemNotification",
							ActiveTabImageName: "SystemNotificationActive",
							MarkerValue: "System",
							NotificationType: ConfigurationConstants.Reminding.Notification,
							NotificationGroup: ConfigurationConstants.NotificationGroup.Notification,
							VisibleAttribute: "SystemNotificationsVisible",
							ChannelConfig: {
								name: "notificationsCount",
								readOnOpen: true,
								typeId: ConfigurationConstants.Reminding.Notification
							},
							Module: {
								moduleId: "SystemNotificationsTabModule",
								schemaName: "SystemNotificationsSchema",
								wrapClassName: ["ts-system-notifications-container"]
							}
						};
					},

					/**
					 * Prepares tabs collection based on the tabs config.
					 * @private
					 */
					prepareTabsCollection: function() {
						var tabsConfig = this.getTabsConfig();
						var tabsCollection = this.get("TabsCollection");
						this.Terrasoft.each(tabsConfig, function(tab) {
							var channelConfig = tab.ChannelConfig;
							this.setTabImageConfig(tab);
							this.setNewNotificationChannel({
								channelName: channelConfig.name,
								tabName: tab.Name,
								moduleName: tab.ModuleName,
								groupName: tab.NotificationGroup,
								readOnOpen: channelConfig.readOnOpen,
								typeId: channelConfig.typeId || tab.NotificationType
							});
							var tabImage = this.getTabImage(tab.Name);
							tab.DefaultTabImage = tabImage;
							tab.ActiveTabImage = tabImage;
							var item = {
								values: tab
							};
							tabsCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", item));
						}, this);
						this.set("TabsCollection", tabsCollection);
					},

					/**
					 * Returns generated config for modules.
					 * @param {Array} tabs List of tabs configuration.
					 * @return {Array} List of generated config for modules.
					 */
					getGeneratedModulesConfig: function(tabs) {
						var modulesConfig = [];
						this.Terrasoft.each(tabs, function(tabConfig) {
							var moduleConfig = tabConfig.Module || {};
							var config = {
								"itemType": this.Terrasoft.ViewItemType.MODULE,
								"moduleName": moduleConfig.moduleName || "BaseSchemaModuleV2",
								"moduleId": moduleConfig.moduleId,
								"name": tabConfig.Name,
								"visible": {"bindTo": tabConfig.VisibleAttribute},
								"classes": {
									"wrapClassName": moduleConfig.wrapClassName
								}
							};
							var instanceConfig = {
								"useHistoryState": false,
								"schemaName": moduleConfig.schemaName,
								"isSchemaConfigInitialized": true
							};
							config.instanceConfig = moduleConfig.moduleName ? {} : instanceConfig;
							modulesConfig.push(config);
						}, this);
						return modulesConfig;
					},

					/**
					 * Returns the first value that matches all of the key-value pairs listed in properties.
					 * @protected
					 * @param {Terrasoft.BaseViewModelCollection} items Collection of view model.
					 * @param {Object} properties Key-value pairs to filter.
					 * @return {Terrasoft.BaseViewModel} Found item.
					 */
					findWhereInViewModelCollection: function(items, properties) {
						var foundItem;
						this.Terrasoft.each(items, function(viewModel) {
							var values = viewModel.values || viewModel.changedValues;
							this.Terrasoft.each(values, function(value, name) {
								var isFoundItem = this.Terrasoft.isEqual(value, properties[name]);
								if (isFoundItem) {
									foundItem = viewModel;
									return false;
								}
							}, this);
							if (foundItem) {
								return false;
							}
						}, this);
						return foundItem;
					},

					/**
					 * Subscribes on events of model.
					 * @protected
					 */
					subscribeEvents: function() {
						if (!this.get("NotificationV2Enabled")) {
							this.sandbox.subscribe("GetRemindingCounters", this.onNotificationReceived, this);
							this.sandbox.subscribe("UpdateCounters", this.onUpdateCounters, this);
						}
						this.sandbox.subscribe("UpdateCounterValues", this.onUpdateCounterValues, this);
						this.sandbox.subscribe("CommunicationPanelItemSelected", this.activatePanel, this);
						this.sandbox.subscribe("RemoveNotificationCounters", this.removeNotificationCounters, this);
						this.sandbox.subscribe("NotificationInfo", this.onNotificationReceived, this);
						this.sandbox.subscribe("UpdateReminding", this.onNotificationReceived, this);
						this.sandbox.subscribe("GetActiveTabName", this.getActiveTabName, this, this.getTabModulesIds());
						if (this._getUseDateForNotificationsQuery()) {
							this._subscribeOnGetLastRemindTime();
						}
					},

					/**
					 * Returns active tab name.
					 * @private
					 * @return {String}
					 */
					getActiveTabName: function() {
						return this.get("ActiveTabName");
					},

					/**
					 * Returns array of tab modules identifiers.
					 * @private
					 * @return {Array}
					 */
					getTabModulesIds: function() {
						return this.get("TabsCollection").getItems().map(function(tab) {
							return tab.get("Module").moduleId;
						});
					},

					/**
					 * @private
					*/
					_getLastRemindTime: function() {
						return this.lastRemindTime;
					},

					/**
					 * Removes notification counters.
					 * @param config Object of the configuration.
					 * @param [config.groupName] Removes notification counters by group name.
					 * If value not established - remove all.
					 */
					removeNotificationCounters: function(config) {
						var groupName = config && config.groupName;
						var store = this.get("CountersValue");
						var countersMap = this.get("NotificationCountersMap");
						var sender = this.get("NotificationInfoSender");
						if (this.Ext.isEmpty(groupName)) {
							delete store[sender];
						} else {
							if (this.Ext.isEmpty(countersMap)) {
								return;
							}
							var typeName = countersMap[groupName.toLowerCase()];
							this._deleteCounterByType(typeName);
						}
						this.set("CountersValue", store);
					},

					/**
					 * Deletes counter value by counter type.
					 * @param {String} typeName Counter type name.
					 * @private
					 */
					_deleteCounterByType: function(typeName) {
						if (this.get("NotificationV2Enabled")) {
							var counters = this.get("Counters");
							counters[typeName] = 0;
							return;
						}
						var store = this.get("CountersValue");
						var sender = this.get("NotificationInfoSender");
						var counter = store[sender];
						if (counter && counter[typeName]) {
							delete counter[typeName];
						}
					},

					/**
					 * Determines if communication panel is activated.
					 * @private
					 * @return {Boolean} Panel activeness flag.
					 */
					_getIsPanelActive: function() {
						return this.sandbox.publish("IsCommunicationPanelItemSelect",
							"CenterNotification");
					},

					/**
					 * Activates notifications panel.
					 * @private
					 */
					activatePanel: function() {
						var isPanelActive = this._getIsPanelActive();
						if (isPanelActive) {
							var tab = this.getTabToShow();
							this.setActiveTab(tab.get("Name"));
							if (tab.get("ChannelConfig").readOnOpen) {
								this.readNewNotification();
							}
						}
					},

					/**
					 * Publishes message to read new notifications.
					 */
					readNewNotification: function() {
						var tab = this.getTabToShow();
						var notificationType = tab.get("NotificationType");
						if (notificationType) {
							this.sandbox.publish("MarkNewNotificationsAsRead", null, [notificationType]);
						}
					},

					/**
					 * Initializes popups permissions.
					 * @private
					 */
					initPopups: function() {
						if (DesktopPopupNotification.getPermissionLevel() !==
								DesktopPopupNotification.PermissionType.GRANTED) {
							DesktopPopupNotification.requestPermission(function() {
								this.setNotificationsState();
							}, this);
						} else {
							DesktopPopupNotification.getNotificationsState(function(value) {
								if (value === undefined) {
									this.setNotificationsState();
								} else {
									this.set("IsNotificationsEnable", value);
								}
							}, this);
						}
					},

					/**
					 * Sets the notifications state.
					 * @private
					 */
					setNotificationsState: function() {
						DesktopPopupNotification.setNotificationsState(true, function() {
							this.set("IsNotificationsEnable", true);
						}.bind(this));
					},

					/**
					 * Opens tab on load.
					 */
					openTab: function() {
						var tab = this.getTabToShow();
						this.setActiveTab(tab.get("Name"));
					},

					/**
					 * Returns the tab to show.
					 * @return {Object} Tab.
					 */
					getTabToShow: function() {
						var tabs = this.get("TabsCollection");
						var items = tabs.getItems();
						var tab = items[0];
						var lastActiveTab = this.get("ActiveTabName");
						if (lastActiveTab) {
							return this.findWhereInViewModelCollection(items, {Name: lastActiveTab});
						}
						tabs.each(function(item) {
							if (item.get("Caption")) {
								tab = item;
								return false;
							}
						}, this);
						return tab;
					},

					/**
					 * Sets or updates tab into the tabs images object.
					 * @param {Array} tab Configs for tab.
					 */
					setTabImageConfig: function(tab) {
						var tabsImages = this.get("TabsImages");
						var name = tab.Name;
						tabsImages[name.toLowerCase()] =
								this.getImagesUrlConfig(tab.TabImageName, tab.ActiveTabImageName);
					},

					/**
					 * Sets new notification channel.
					 * @param {Array} item Config.
					 */
					setNewNotificationChannel: function(item) {
						var notificationChannelConfigs = this.get("NotificationChannelConfigs");
						notificationChannelConfigs.push(item);
					},

					/**
					 * Returns tab images config with urls.
					 * @param {String} notActiveName Not active tab image name.
					 * @param {String} activeName Active tab image name.
					 * @return {Object} Tab images config.
					 */
					getImagesUrlConfig: function(notActiveName, activeName) {
						var imageUrlBuilder = this.Terrasoft.ImageUrlBuilder;
						var notActive = this.get("Resources.Images." + notActiveName);
						var active = this.get("Resources.Images." + activeName);
						return {
							notActive: imageUrlBuilder.getUrl(notActive),
							active: imageUrlBuilder.getUrl(active)
						};
					},

					/**
					 * Sets active tab by name.
					 * @param {String} name Tab name.
					 */
					setActiveTab: function(name) {
						this.set("ActiveTabName", name);
					},

					/**
					 * Changes active tab.
					 * @param {Terrasoft.BaseViewModel} tab Tab configuration object.
					 * @param {Number} tabIndex Index of selected tab.
					 * @param {Terrasoft.BaseViewModelCollection} tabs Collection of tabs.
					 */
					activeTabChange: function(tab, tabIndex, tabs) {
						var moduleName = tab.get("Name");
						var visibleAttribute = tab.get("VisibleAttribute");
						var loadedModuleName = this.get("LoadedModuleName");
						var items = tabs.getItems();
						var loadedModuleTab = this.findWhereInViewModelCollection(items, {Name: loadedModuleName});
						if (moduleName && moduleName !== loadedModuleName) {
							if (!this.Ext.isEmpty(loadedModuleTab)) {
								var visibleLoadedModuleAttribute = loadedModuleTab.get("VisibleAttribute");
								this.set(visibleLoadedModuleAttribute, false);
							}
							this.set(visibleAttribute, true);
							this.set("LoadedModuleName", moduleName);
						}
					},

					/**
					 * Changes the module visible state.
					 * @param {String} moduleName Module name.
					 * @param {Boolean} visible New visible state.
					 * @deprecated
					 */
					setModuleVisible: function(moduleName, visible) {
						this.set(moduleName.replace("Module", "Visible"), visible);
					},

					/**
					 * Returns url of the image.
					 * @param {String} name Name of the notification.
					 * @param {Boolean} isActive Flag of the notification image type.
					 * @return {String|null} Url of the image.
					 */
					getTabImage: function(name, isActive) {
						var tabsImages = this.get("TabsImages");
						var propertyName = name.toLocaleLowerCase();
						if (tabsImages.hasOwnProperty(propertyName)) {
							return isActive ? tabsImages[propertyName].active : tabsImages[propertyName].notActive;
						}
						return null;
					},

					/**
					 * Sets the number of notification into tab.
					 * @param {String} name Name of tabs collection item.
					 * @param {Number} value New counter value.
					 */
					setTabCounter: function(name, value) {
						var tabsCollection = this.get("TabsCollection").getItems();
						var item = this.findWhereInViewModelCollection(tabsCollection, {Name: name});
						if (!this.Ext.isEmpty(item)) {
							var isNotEmpty = value > 0;
							var tabImage = this.getTabImage(name, isNotEmpty);
							var caption = isNotEmpty ? value : "";
							caption = this.getModifiedCounter(caption);
							item.set("Caption", caption);
							item.set("DefaultTabImage", tabImage);
							item.set("ActiveTabImage", tabImage);
						}
					},

					/**
					 * Returns modified counter. Replace value if it more then MaxCounter.
					 * @param {Number} counter Value of counter.
					 * @return {String} New value.
					 */
					getModifiedCounter: function(counter) {
						var newValue = counter;
						var maxValue = this.get("MaxCounter");
						var modifiableValue = this.get("Resources.Strings.MaxCounterToDisplay");
						if (counter > maxValue) {
							newValue = modifiableValue;
						}
						return newValue;
					},

					/**
					 * Handles changes number of notification.
					 * @param {Object} response Server response.
					 */
					onNotificationReceived: function(response) {
						var sender = response.Header.Sender;
						var lastNotificationsResponse = this.getLastNotificationsResponse(sender);
						var isResponseNotChanged =
							this.Terrasoft.isEqual(lastNotificationsResponse, response);
						var isNotificationV2FeatureEnabled = this.get("NotificationV2Enabled");
						if (!isNotificationV2FeatureEnabled) {
							if (this.Ext.isEmpty(response) || isResponseNotChanged) {
								return;
							}
						}
						var notificationSenders = this.get("NotificationSenders");
						if (!this.Terrasoft.contains(notificationSenders, sender)) {
							return;
						}
						this.setLastNotificationsResponse(response);
						if (this._getUseDateForNotificationsQuery()) {
							this._updateLastRemindTimeFromResponse(response);
						}
						var notificationInfoSender = this.get("NotificationInfoSender");
						var config;
						if ((this.get("UseNotificationsOnOneClassJob") || isNotificationV2FeatureEnabled) &&
								notificationInfoSender === sender) {
							config = this.getNotificationInfoConfig(response);
							this.handleResponse(config);
						} else {
							if (isNotificationV2FeatureEnabled) {
								config = this.formCountersDataFromResponse(response);
								this.prepareHandleResponseConfig(response, config);
							} else {
								RemindingsUtilities.getRemindings(this,
									this.prepareHandleResponseConfig.bind(this, response));
							}
						}
					},

					/**
					 * Forms counters data config from server response.
					 * @protected
					 * @param {Object} response Server response config.
					 * @param {Object} response.notificationGroup Notification group name.
					 * @param {Object} response.operation Server operation.
					 * @param {Object} response.markAsRead Mark notification as read.
					 * @return {Object} Counters data config.
					 */
					formCountersDataFromResponse: function(response) {
						var notificationGroup = response.notificationGroup;
						var channelConfig = this._getChannelByGroupName(notificationGroup);
						var countersConfig = {};
						if (channelConfig) {
							var operation = response.operation;
							var counterValue = 0;
							if (operation === "delete" || (operation === "update" && response.markAsRead === true)) {
								counterValue = -1;
							}
							countersConfig[channelConfig.channelName] = counterValue;
						}
						return countersConfig;
					},

					/**
					 * Sets last notification response.
					 * @param {Object} response Server response.
					 */
					setLastNotificationsResponse: function(response) {
						if (this.Ext.isEmpty(response)) {
							return;
						}
						var responses = this.get("LastNotificationsResponse");
						var sender = response.Header.Sender;
						if (this.Ext.isEmpty(responses)) {
							responses = {};
						}
						responses[sender] = response;
						this.set("LastNotificationsResponse", responses);
					},

					/**
					 * Returns last notification response.
					 * @param {String} sender Sender name.
					 * @return {Object|null} Last notification response.
					 */
					getLastNotificationsResponse: function(sender) {
						var responses = this.get("LastNotificationsResponse");
						if (responses && responses.hasOwnProperty(sender)) {
							return responses[sender];
						}
						return null;
					},

					/**
					 * Prepares config for handler response.
					 * @param {Object} response Server response.
					 * @param {Object} config Object configuration.
					 */
					prepareHandleResponseConfig: function(response, config) {
						config.notificationResponse = response;
						this.handleResponse(config);
					},

					/**
					 * Handles changes number of the notification.
					 * @param {Object} [config.groupName] Group of the notifications.
					 * @protected
					 */
					onUpdateCounters: function(config) {
						RemindingsUtilities.getRemindings(this, function(countersData) {
							this.updateCountersValue(countersData);
						}, config);
					},

					/**
					 * Merges data of the notification from varied senders.
					 * @private
					 * @param {Object} config Data of the notification.
					 * @param {String} sender Names of the notification senders.
					 */
					mergeNotificationCounter: function(config, sender) {
						this.setCountersValue(config, sender);
						var counters = this.getCombinedCounters();
						this.changeCounters(config, counters);
					},

					/**
					 * Sets counters values.
					 * @private
					 * @param {Object} config Data of the notification.
					 * @param {String} sender Names of the notification senders.
					 */
					setCountersValue: function(config, sender) {
						var countersValue = this.getCountersValue(config);
						var store = this.get("CountersValue");
						var bodyTypeName = config.bodyTypeName;
						if (!this.Ext.isEmpty(bodyTypeName)) {
							var counter = store[sender];
							this.Ext.apply(countersValue, counter);
						}
						store[sender] = countersValue;
						this.set("CountersValue", store);
					},

					/**
					 * Returns counters value.
					 * @private
					 * @param {Object} config Data of the notification.
					 * @return {Object} Counters value.
					 */
					getCountersValue: function(config) {
						var counters = {};
						var bodyTypeName = config.bodyTypeName;
						var countersMap = this.get("NotificationCountersMap");
						if (!this.Ext.isEmpty(bodyTypeName)) {
							var typeName = countersMap[bodyTypeName.toLowerCase()];
							counters[typeName] = config[typeName];
							return counters;
						}
						this.Terrasoft.each(countersMap, function(item) {
							var value = config[item];
							if (value) {
								counters[item] = value;
							}
						});
						return counters;
					},

					/**
					 * Returns combined counters value.
					 * @private
					 * @return {Object} Combined counters value.
					 */
					getCombinedCounters: function() {
						var result = {};
						var counterValue = this.get("CountersValue");
						this.Terrasoft.each(counterValue, function(counters) {
							for (var property in counters) {
								if (!result[property]) {
									result[property] = 0;
								}
								result[property] += counters[property];
							}
						}, this);
						return result;
					},

					/**
					 * Changed counters value in data of the notification.
					 * @private
					 * @param config Data of the notification.
					 * @param counters Counters value.
					 */
					changeCounters: function(config, counters) {
						for (var property in counters) {
							config[property] = counters[property];
						}
					},

					/**
					 * Returns prepared notification info configuration object for response.
					 * @param {Object} response Server response.
					 * @return {Object} Prepared notification info configuration object.
					 * @private
					 */
					getNotificationInfoConfig: function(response) {
						var header = response.Header;
						var config = {
							reminders: {},
							sender: header.Sender
						};
						if (header.BodyTypeName) {
							config.bodyTypeName = header.BodyTypeName;
						}
						config.notificationResponse = response;
						this.setNotificationInfoGroupPopupsConfig(config.reminders, response.Notifications);
						this.setNotificationInfoConfigCounters(config, response.Counters);

						return config;
					},

					/**
					 * Sets to the notification info configuration object counters values.
					 * @param {Object} config Notification info configuration object.
					 * @param {Object} counters Counters values for notifications.
					 * @private
					 */
					setNotificationInfoConfigCounters: function(config, counters) {
						var notificationCountersMap = this.get("NotificationCountersMap");
						this.Terrasoft.each(counters, function(value, key) {
							key = key.toLowerCase();
							var countKey = notificationCountersMap[key];
							config[countKey] = value;
						}, this);
					},

					/**
					 * Sets to the notification info popups configuration object popups from the group.
					 * @param {Object} popupsConfig Notification info popups configuration object.
					 * @param {Array} notifications Popup notifications.
					 * @private
					 */
					setNotificationInfoGroupPopupsConfig: function(popupsConfig, notifications) {
						if (notifications) {
							this.Terrasoft.each(notifications, function(value) {
								var id = value.MessageId;
								popupsConfig[id] = value;
							}, this);
						}
					},

					/**
					 * Update last reminding's date from response
					 * @param {Object} response
					 * @private
					 */
					_updateLastRemindTimeFromResponse: function(response) {
						if (!response.LastRemindTime) {
							return;
						}
						this._setLastRemindTime(new Date(response.LastRemindTime));
					},
					/**
					 * Sets LastRemindTime
					 * @param {Date} lastRemindTime
					 * @private
					 */
					_setLastRemindTime: function(lastRemindTime) {
						this.lastRemindTime = lastRemindTime;
					},

					/**
					 * Gets channel config by notification group name.
					 * @private
					 * @param {String} groupName Group name.
					 * @return {Object} Channel config.
					 */
					_getChannelByGroupName: function(groupName) {
						var notificationChannelConfigs = this.get("NotificationChannelConfigs");
						var channelConfig = this.Terrasoft.findWhere(notificationChannelConfigs,
							{ groupName: groupName });
						return channelConfig;
					},

					/**
					 * Subscribe on GetLastRemindTime for each tab
					 * @private
					 */
					_subscribeOnGetLastRemindTime: function() {
						var notificationChannelConfigs = this.get("NotificationChannelConfigs");
						this.Terrasoft.each(notificationChannelConfigs, function(channelConfig) {
							this.sandbox.subscribe("GetLastRemindTime", this._getLastRemindTime, this, [channelConfig.typeId]);
						}, this);
					},
					/**
					 * Handles counter values update for specified group.
					 * @protected
					 * @param {Object} config Parameters config.
					 * @param {String} config.groupName Counters group name.
					 * @param {String} config.counterValue Counter value to add.
					 */
					onUpdateCounterValues: function(config) {
						var channelConfig = this._getChannelByGroupName(config.groupName);
						if (!channelConfig) {
							return;
						}
						var updateCountersConfig = {};
						updateCountersConfig[channelConfig.channelName] = config.counterValue || 0;
						this.updateCountersValue(updateCountersConfig);
					},

					/**
					 * Update the number of notifications.
					 * @private
					 * @param {Object} countersData Counters data config.
					 * @param {Number} [countersData.notificationsCount] The number of new system notifications.
					 * @param {Number} [countersData.visaCount] The number of new visas.
					 * @param {Number} [countersData.esnNotificationsCount] The number of new ESN notifications.
					 * @param {Number} [countersData.anniversariesCount] The number of new anniversaries.
					 * @param {Number} [countersData.remindingsCount] The number of new remindings.
					 * @param {String} [sender] Sender name.
					 * @param {Object} [notificationResponse] Server web-socket response.
					 */
					updateCountersValue: function(countersData) {
						countersData = countersData || {};
						var notificationChannelConfigs = this.get("NotificationChannelConfigs");
						var defaultNotificationCounterSender = this.get("DefaultNotificationCounterSender");
						if (this.get("UseNotificationsOnOneClassJob")) {
							var sender = countersData.sender;
							if (this.Ext.isEmpty(sender)) {
								sender = defaultNotificationCounterSender;
							}
							this.mergeNotificationCounter(countersData, sender);
						} else  {
							if (this.get("NotificationV2Enabled")) {
								this.mergeCounters(countersData);
							}
						}
						this.set("AllNotificationsCount", 0);
						this.Terrasoft.each(notificationChannelConfigs, function(channelConfig) {
							var channelName = channelConfig.channelName;
							if (countersData.hasOwnProperty(channelName)) {
								var counterValue = countersData[channelName];
								this.updateTabItemsAndCounterValues({
									counterValue: counterValue,
									channelConfig: channelConfig,
									notificationResponse: countersData.notificationResponse
								});
							}
						}, this);
						var allNotificationsCount = String(this.get("AllNotificationsCount") || "");
						allNotificationsCount = this.getModifiedCounter(allNotificationsCount);
						this.sandbox.publish("CenterCounterChanged", allNotificationsCount);
						this.onChangeNumberOfNotification(Number(allNotificationsCount));
						this.startBlink();
					},

					/**
					 * Merge counter values.
					 * @protected
					 * @param {Object} countersData Counters data config.
					 * @param {Number} [countersData.notificationsCount] The number of new system notifications.
					 * @param {Number} [countersData.visaCount] The number of new visas.
					 * @param {Number} [countersData.esnNotificationsCount] The number of new ESN notifications.
					 * @param {Number} [countersData.anniversariesCount] The number of new anniversaries.
					 * @param {Number} [countersData.remindingsCount] The number of new remindings.
					 */
					mergeCounters: function(countersData) {
						var counters = this.get("Counters");
						if (counters && !countersData.resetCounters) {
							var countersMap = this.get("NotificationCountersMap");
							this.Terrasoft.each(countersMap, function(counterName) {
								var counterValue = (countersData[counterName] || 0);
								counterValue +=  counters[counterName];
								countersData[counterName] = Math.max(counterValue, 0);
							});
						}
						this.set("Counters", countersData);
					},

					/**
					 * Updates items and tab counter.
					 * @param {Object} config Configuration object.
					 * @param {Number} config.counterValue Counter value.
					 * @param {Object} config.channelConfig Channel configuration object.
					 */
					updateTabItemsAndCounterValues: function(config) {
						var counterValue = config.counterValue;
						var channelConfig = config.channelConfig;
						var tabName = channelConfig.tabName;
						var typeId = channelConfig.typeId;
						var isTabActive = this.isTabActive(tabName);
						var isPanelActive = this._getIsPanelActive();
						var actualCounterValue = this.getActualTabCounterValue({
							isTabActive: isTabActive,
							isPanelActive: isPanelActive,
							readOnOpen: channelConfig.readOnOpen,
							counterValue: counterValue
						});
						if (this.Ext.isNumber(counterValue) && isTabActive) {
							this.sandbox.publish("UpdateNotifications", config.notificationResponse, [typeId]);

							if (!actualCounterValue && isPanelActive && (counterValue > 0)) {
								this.sandbox.publish("MarkNewNotificationsAsRead", true, [typeId]);
							}
						}
						this.setTabCounter(tabName, actualCounterValue);
						this.addToAllNotificationsCount(actualCounterValue);
					},

					/**
					 * Add into all notification counter number.
					 * @param {Number} count Number.
					 */
					addToAllNotificationsCount: function(count) {
						var allNotificationsCount = this.get("AllNotificationsCount");
						this.set("AllNotificationsCount", allNotificationsCount + count);
					},

					/**
					 * Returns number of tab notification take into consideration tab auto reading.
					 * @param {Object} config Configuration object.
					 * @param {Boolean} config.isTabActive Is updating tab active.
					 * @param {Boolean} config.isPanelActive Is notification panel active.
					 * @param {Boolean} config.readOnOpen Read automatically new notifications.
					 * @param {Number} config.counterValue Number of notifications.
					 * @return {Number} Number of notification.
					 */
					getActualTabCounterValue: function(config) {
						return (config.isTabActive && config.isPanelActive && config.readOnOpen)
								? 0
								: config.counterValue;
					},

					/**
					 * Returns the tab visible state.
					 * @param {String} name Tab name.
					 * @return {Boolean|null} Visible state or null if tab not
					 */
					isTabActive: function(name) {
						var tabsCollection = this.get("TabsCollection");
						var items = tabsCollection ? tabsCollection.getItems() : [];
						var isActive = null;
						var tab = this.findWhereInViewModelCollection(items, {Name: name});
						if (!this.Ext.isEmpty(tab)) {
							var visibleAttribute = tab.get("VisibleAttribute");
							isActive = this.get(visibleAttribute);
						}
						return isActive;
					},

					/**
					 * Handles the response.
					 * @param {Object} remindersConfig Contains data reminders with counts.
					 */
					handleResponse: function(remindersConfig) {
						this.updateCountersValue(remindersConfig);
						if (this.get("IsNotificationsEnable") === true) {
							this.showAllPopups(remindersConfig);
						}
					},

					/**
					 * Returns new popups that not displayed before.
					 * @private
					 * @return {*}
					 */
					_getNewPopups: function(reminders) {
						var localStore = this.get("LocalStore");
						var storedPopups = localStore.getItem("CenterNotification");
						return Terrasoft.filter(reminders, function(notify, key) {
							return !this.Ext.Array.contains(storedPopups, key);
						}, this);
					},

					/**
					 * Sets remider identifier into the remider config.
					 * @private
					 * @param {Object} reminders Reminders.
					 */
					_setRemindersNotificationId: function(reminders) {
						Terrasoft.each(reminders, function(item, key) {
							item.notificationId = key;
						}, this);
					},

					/**
					 * Saves all displayed remiders into local store.
					 * @private
					 */
					_storeAllPopups: function(reminders) {
						var storedPopups = Terrasoft.map(reminders, function(notify, key) {
							return key;
						});
						var localStore = this.get("LocalStore");
						localStore.setItem("CenterNotification", storedPopups);
					},

					/**
					 * Shows all received popups.
					 * @param {Object} remindersConfig Contains data reminders with counts.
					 */
					showAllPopups: function(remindersConfig) {
						var reminders = remindersConfig.reminders;
						this._setRemindersNotificationId(reminders);
						var newPopups = reminders || [];
						if (!this.get("NotificationV2Enabled")) {
							newPopups = this._getNewPopups(reminders);
							this._storeAllPopups(reminders);
						}
						if (newPopups.length > this.get("MaxDisplayedPopupsNumber")) {
							this._showCounterPopup(newPopups.length);
						} else {
							this._showAllPopups(newPopups);
						}
					},

					/**
					 * Returns flag that indicates esn notification.
					 * @private
					 * @param {Object} notify Notification config.
					 * @param {Object} config Popup config.
					 * @return {Boolean}
					 */
					_getIsEsnNotitification: function(notify, config) {
						var socialChannel = ESNConstants.SchemaName.SocialChannel;
						var defaultPopupImage = this.get("DefaultPopupImage");
						return notify.EntitySchemaName === socialChannel && config.icon !== defaultPopupImage;
					},

					/**
					 * Shows all popups.
					 * @private
					 * @param {Object} notifications Recived notifications.
					 */
					_showAllPopups: function(notifications) {
						Terrasoft.each(notifications, function(notify) {
							var config = this.createPopupConfig(notify);
							if (this._getIsEsnNotitification(notify, config)) {
								this.showPopupWithDecorationIcon(notify, config);
							} else {
								this.showPopup(config);
							}
						}, this);
					},

					/**
					 * Shows counter popup.
					 * @private
					 * @param {Number} counter Number of unprocessed notifications.
					 */
					_showCounterPopup: function(counter) {
						var config = this._createCounterPopupConfig(counter);
						this.showPopup(config);
					},

					/**
					 * Returns notification icon.
					 * @param {Object} notify Notification config
					 * @return {String} Url of icon.
					 */
					getNotifyIcon: function(notify) {
						var icon;
						var imageId = notify.ImageId;
						if (!this.Terrasoft.isGUID(imageId) || this.Terrasoft.isEmptyGUID(imageId)) {
							icon = this.get("DefaultPopupImage");
						} else {
							icon = this.Terrasoft.ImageUrlBuilder.getUrl({
								source: this.Terrasoft.ImageSources.SYS_IMAGE,
								params: {
									primaryColumnValue: imageId
								}
							});
						}
						return icon;
					},

					/**
					 * Returns notification identifier.
					 * @param {Object} notify Notification config.
					 * @return {String} Identifier of Notification.
					 */
					generateNotifyId: function(notify) {
						var id = notify.EntitySchemaName + "_" + notify.EntityId +
								"_" + notify.notificationId.replace("_", "");
						if (!this.Ext.isEmpty(notify.MessageId)) {
							id += "_" + notify.MessageId;
						}
						if (!this.Ext.isEmpty(notify.RemindTime)) {
							id += "_" + notify.RemindTime;
						}
						return id;
					},

					/**
					 * Creates config for counter popup.
					 * @private
					 * @param {Number} counter Notifications count.
					 * @return {Object} Config for popup.
					 */
					_createCounterPopupConfig: function(counter) {
						var config = {
							id: Terrasoft.generateGUID(),
							title: this.get("Resources.Strings.CounterPopupTitle"),
							body: this.get("Resources.Strings.CounterPopupBody") + counter,
							icon: this.get("PopupImageCounter"),
							onShow: this.onShowPopup
						};
						return config;
					},

					/**
					 * Create config for popup.
					 * @param {Object} notify Notification config from server.
					 * @return {Object} Config for popup.
					 */
					createPopupConfig: function(notify) {
						var icon = this.getNotifyIcon(notify);
						var id = this.generateNotifyId(notify);
						var config = {
							id: id,
							title: notify.Title,
							body: notify.Body,
							icon: icon,
							onClick: this.onPopupClick,
							onShow: this.onShowPopup,
							groupName: notify.GroupName
						};
						if (!this.Ext.isEmpty(notify.LoaderName)) {
							config.LoaderName = notify.LoaderName;
							config.onClick = this.startLoader;
						}
						return config;
					},

					/**
					 * Displays a notification based on the config.
					 * @param {Object} config Config for popup.
					 */
					showPopup: function(config) {
						config = this.Ext.apply(config || {}, {
							ignorePageVisibility: true,
							scope: this
						});
						DesktopPopupNotification.showNotification(config);
					},

					/**
					 * Displays a notification based on the config with round icon.
					 * @param {Object} notify Config for notify.
					 * @param {Object} config Config for popup.
					 */
					showPopupWithDecorationIcon: function(notify, config) {
						var callback = function(binaryUrl) {
							config.icon = binaryUrl;
							this.showPopup(config);
						}.bind(this);
						var resourceConfig = {
							callback: callback,
							source: this.Terrasoft.ImageSources.SYS_IMAGE,
							params: {
								primaryColumnValue: notify.ImageId
							},
							filter: {
								round: {radius: 40}
							}
						};
						this.Terrasoft.ResourceUtility.getDataUrl(resourceConfig);
					},

					/**
					 * Returns notification config.
					 * @param {Event} event Event click
					 * @return {Object} Notification config.
					 */
					getNotificationConfig: function(event) {
						var notify = event.target;
						var notificationConfig = DesktopPopupNotification.getNotificationConfig(notify.tag);
						var parts = notificationConfig.id.split("_");
						var entitySchemaName = parts[0];
						var id = parts[1];
						var messageId = parts[3];
						return {
							entitySchemaName: entitySchemaName,
							id: id,
							messageId: messageId,
							groupName: notificationConfig.groupName
						};
					},

					/**
					 * Generates entity schema query for entity of process.
					 * @param {String} entitySchemaName Entity schema name.
					 * @param {String} attribute Attribute of entity.
					 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
					 */
					getEntityProcessElementESQ: function(entitySchemaName, attribute) {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: entitySchemaName
						});
						esq.addColumn(attribute);
						esq.addColumn("ProcessElementId");
						return esq;
					},

					/**
					 * Opens the edit page entity of the process.
					 * @param {Object} openPageConfig Object of configuration.
					 * @param {Object} openPageConfig.entity Entity.
					 * @param {String} openPageConfig.entityId Entity identifier.
					 * @param {String} openPageConfig.entitySchemaName Schema name of entity.
					 * @param {Object} openPageConfig.sandbox Sandbox module.
					 * @param {Object} openPageConfig.valuePairs Value pairs for state object.
					 * @param {Object} openPageConfig.attribute Entity attribute.
					 */
					openEntityPageOfProcess: function(openPageConfig) {
						var attribute = openPageConfig.attribute,
								entity = openPageConfig.entity,
								entityId = openPageConfig.entityId,
								entitySchemaName = openPageConfig.entitySchemaName,
								sandbox = openPageConfig.sandbox,
								entityAttribute = entity.get(attribute);
						if (entityAttribute) {
							var prcElId = entity.get("ProcessElementId");
							if (ProcessModuleUtilities.tryShowProcessCard.call(this, prcElId, entityId)) {
								return;
							}
							var hash = NetworkUtilities.getEntityUrl(entitySchemaName, entityId,
								entityAttribute.value);
							sandbox.publish("PushHistoryState", {hash: hash});
						}
					},

					/**
					 * Opens the edit page entity of the process.
					 * @param {Object} openPageConfig Object of configuration.
					 * @param {String} openPageConfig.entityId Entity identifier.
					 * @param {String} openPageConfig.entitySchemaName Schema name of entity.
					 * @param {Object} openPageConfig.sandbox Sandbox module.
					 * @param {Object} openPageConfig.valuePairs Value pairs for state object.
					 * @param {Object} openPageConfig.attribute Entity attribute.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function context.
					 */
					loadProcessElement: function(openPageConfig, callback, scope) {
						var attribute = openPageConfig.attribute,
								entitySchemaName = openPageConfig.entitySchemaName,
								entityId = openPageConfig.entityId,
								select = this.getEntityProcessElementESQ(entitySchemaName, attribute);
						select.getEntity(entityId, function(response) {
							if (response && response.success) {
								var config = {
									entity: response.entity,
									attribute: attribute,
									entityId: entityId,
									entitySchemaName: entitySchemaName,
									sandbox: openPageConfig.sandbox
								};
								if (callback) {
									callback.call(scope || this, config);
								}
							} else {
								throw new this.Terrasoft.UnknownException({
									message: response.errorInfo.message
								});
							}
						}, this);
					},

					/**
					 * Opens the edit page entity.
					 * @param {Object} openPageConfig Object of configuration.
					 * @param {String} openPageConfig.entityId Entity identifier.
					 * @param {String} openPageConfig.entitySchemaName Schema name of entity.
					 * @param {Object} openPageConfig.sandbox Sandbox module.
					 * @param {Object} openPageConfig.valuePairs Value pairs for state object.
					 */
					openEntityPage: function(openPageConfig) {
						const entitySchemaName = openPageConfig.entitySchemaName;
						const moduleStructure = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchemaName);
						const attribute = moduleStructure.attribute;
						if (Ext.isEmpty(attribute)) {
							NetworkUtilities.openEntityPage(openPageConfig);
						} else {
							openPageConfig.attribute = attribute;
							this.loadProcessElement(openPageConfig, this.openEntityPageOfProcess, this);
						}
					},

					/**
					 * Handles popup click event.
					 * @param {Event} event Event click.
					 */
					onPopupClick: function(event) {
						var notificationConfig = this.getNotificationConfig(event);
						if (this.Ext.isEmpty(notificationConfig.id)) {
							window.focus();
							NetworkUtilities.openEntitySection({
								entitySchemaName: notificationConfig.entitySchemaName,
								sandbox: this.sandbox
							});
							return;
						}
						this.openCard(event);
					},

					/**
					 * Open card entity notification.
					 * @param {Event} event Event click.
					 */
					openCard: function(event) {
						window.focus();
						var notificationConfig = this.getNotificationConfig(event),
								messageId = notificationConfig.messageId,
								id = notificationConfig.id,
								entitySchemaName = notificationConfig.entitySchemaName,
								valuePairs;
						var openPageConfig = {
							entityId: id,
							entitySchemaName: entitySchemaName,
							sandbox: this.sandbox
						};
						if (entitySchemaName === "Forecast") {
							this.sandbox.publish("PushHistoryState", {hash: "ForecastsModule"});
							return;
						}
						const EsnNotification = ConfigurationConstants.NotificationGroup.EsnNotification;
						if (!this.Ext.isEmpty(messageId) && notificationConfig.groupName === EsnNotification) {
							valuePairs = this.getValuePairsConfig(messageId);
							openPageConfig.stateObj = {valuePairs: valuePairs};
						}
						var handled = this.sandbox.publish("ReloadCard", valuePairs, [id]);
						if (!handled) {
							this.openEntityPage(openPageConfig);
						}
					},

					/**
					 * Loads notification loader to provide custom action onClick.
					 * @param {Event} event Event click.
					 */
					startLoader: function(event) {
						window.focus();
						var target = event.target;
						var notificationConfig = DesktopPopupNotification.getNotificationConfig(target.tag);
						var loaderModuleId = this.sandbox.id + "_" + notificationConfig.LoaderName;
						this.sandbox.subscribe("GetNotificationInfo", function() {
							return notificationConfig;
						}, this, [loaderModuleId]);
						this.sandbox.loadModule(notificationConfig.LoaderName, {id: loaderModuleId});
					},

					/**
					 * Returns value pairs for state object.
					 * @param {Guid} messageId [description]
					 * @return {Object} Config for value pairs.
					 */
					getValuePairsConfig: function(messageId) {
						var valuePairs = [
							{
								name: "DefaultTabName",
								value: "ESNTab"
							},
							{
								name: "ActiveSocialMessageId",
								value: messageId
							}
						];
						return valuePairs;
					},

					/**
					 * Handling popup after display.
					 * @param {Event} event Event show.
					 */
					onShowPopup: function(event) {
						window.setTimeout(function() {
							DesktopPopupNotification.closeNotification(event.target);
						}, this.get("TimeDisplayPopup") * 1000);
					}
				},
				diff: [
					{
						"operation": "insert",
						"name": "ImageTabPanel",
						"values": {
							"itemType": Terrasoft.ViewItemType.IMAGE_TAB_PANEL,
							"collection": {bindTo: "TabsCollection"},
							"tabs": [],
							"activeTabName": {bindTo: "ActiveTabName"},
							"isScrollVisible": {bindTo: "IsScrollVisible"},
							"activeTabChange": {bindTo: "activeTabChange"},
							"backgroundImage": {bindTo: "BackgroundImage"}
						}
					},
					{
						"operation": "insert",
						"name": "ModuleContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"tag": "ModuleContainer",
							"classes": {
								wrapClassName: [
									"ts-notifications-container", "ts-notificationsmodule-container"
								]
							},
							"items": []
						}
					}
				]
			};
		});

define("CenterNotificationSchema", [],
	function() {
		return {
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseViewModel#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					var isPortalUser = this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP;
					if (isPortalUser) {
						this.mixins.TitleNotificationUtilities.blinkIterator = 0;
						this.mixins.TitleNotificationUtilities.blinkInterval = 0;
					}
				},
				/**
				 * @inheritDoc Terrasoft.CenterNotificationSchema#initializeNotifications
				 * @overridden
				 */
				initializeNotifications: function() {
					var isPortalUser = this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP;
					if (isPortalUser) {
						return;
					}
					this.callParent(arguments);
				}
			}
		};
	});


