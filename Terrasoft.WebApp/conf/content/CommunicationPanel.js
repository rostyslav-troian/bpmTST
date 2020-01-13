Terrasoft.configuration.Structures["CommunicationPanel"] = {innerHierarchyStack: ["CommunicationPanelUIv2", "CommunicationPanelESN", "CommunicationPanelCTIBase", "CommunicationPanel"]};
define('CommunicationPanelUIv2Structure', ['CommunicationPanelUIv2Resources'], function(resources) {return {schemaUId:'3431e29c-09d8-4c7c-a1d5-4f76de040039',schemaCaption: "Communication panel schema", parentSchemaName: "", schemaName:'CommunicationPanelUIv2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CommunicationPanelESNStructure', ['CommunicationPanelESNResources'], function(resources) {return {schemaUId:'4e9b84e4-c21d-4531-bef3-8c936a11763c',schemaCaption: "Communication panel schema", parentSchemaName: "CommunicationPanelUIv2", schemaName:'CommunicationPanelESN',parentSchemaUId:'3431e29c-09d8-4c7c-a1d5-4f76de040039',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CommunicationPanelUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CommunicationPanelCTIBaseStructure', ['CommunicationPanelCTIBaseResources'], function(resources) {return {schemaUId:'73d02d4f-825c-44a9-9265-ceb23711e411',schemaCaption: "Communication panel schema", parentSchemaName: "CommunicationPanelESN", schemaName:'CommunicationPanelCTIBase',parentSchemaUId:'4e9b84e4-c21d-4531-bef3-8c936a11763c',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CommunicationPanelESN",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CommunicationPanelStructure', ['CommunicationPanelResources'], function(resources) {return {schemaUId:'c6347b72-d2f4-4f93-8049-99fab2cd23e1',schemaCaption: "Communication panel schema", parentSchemaName: "CommunicationPanelCTIBase", schemaName:'CommunicationPanel',parentSchemaUId:'73d02d4f-825c-44a9-9265-ceb23711e411',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CommunicationPanelCTIBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CommunicationPanelUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CommunicationPanelUIv2", ["terrasoft", "RemindingsUtilities", "GoogleTagManagerUtilities",
		"CommunicationPanelHelper", "CredentialsSyncSettingsMixin", "css!SyncSettingsErrorsCSS"],
	function(Terrasoft, RemindingsUtilities, GoogleTagManagerUtilities) {
		return {
			messages: {

				/**
				 * @message ShowHideRightSidePanel
				 * Notify about change visibility of the right side panel.
				 * @param {Number} Number of the notifications.
				 */
				"ShowHideRightSidePanel": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message CommunicationPanelItemSelected
				 * Notify about change selected item.
				 * @param {Number} Number of the notifications.
				 */
				"CommunicationPanelItemSelected": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message CenterCounterChanged
				 * Notify about changes in the center notifications counter.
				 * @param {Number} Number of the notifications.
				 */
				"CenterCounterChanged": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message IsCommunicationPanelItemSelect
				 * Returns state of the communication panel item visible.
				 */
				"IsCommunicationPanelItemSelect": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateNewEmailsCounter
				 * Updates "New email counter" in expand email communication panel.
				 */
				"UpdateNewEmailsCounter": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateNewNotProcessedIncomingEmailsCounter
				 * Updates "New incoming and not processed email counter" in collapsed email communication panel.
				 */
				"UpdateNewNotProcessedIncomingEmailsCounter": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ReloadNotProcessedIncomingEmails
				 * Reloads incoming and need processing emails in communication panel.
				 */
				"ReloadNotProcessedIncomingEmails": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message HideErrorTip
				 * Hides synchronization errors tip.
				 */
				"HideErrorTip": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message OpenSyncSettingsEdit
				 * Handles SyncSettingsEdit page opening.
				 */
				"OpenSyncSettingsEdit": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ProcessDashboardCounterChanged
				 * Updates new items count in process panel.
				 */
				"ProcessDashboardCounterChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}

			},
			mixins: {
				/**
				 * @class CredentialsSyncSettingsMixin provides methods for synchronization settings window.
				 */
				CredentialsSyncSettingsMixin: "Terrasoft.CredentialsSyncSettingsMixin"
			},
			attributes: {

				/**
				 * The currently selected menu item.
				 * @type {String}
				 */
				"SelectedMenuItem": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * The configuration of the previously selected panel menu item.
				 * @type {String}
				 */
				"PreviousItemConfig": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				 * Flag of the active "ESN" menu item state, true on active.
				 * @type {Boolean}
				 */
				"ESNFeedActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * Counter of unread notifications menu "ESN".
				 * @type {String}
				 */
				"ESNFeedCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Flag of the active "Notification" menu item state, true on active.
				 * @type {Boolean}
				 */
				"NotificationsActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * Counter of unread notifications menu "Notification".
				 * @type {String}
				 */
				"NotificationsCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Flag for active state of the menu item.
				 * @type {Boolean}
				 */
				"CenterNotificationActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * Counter of unread notifications menu item "General notifications".
				 * @type {String}
				 */
				"CenterNotificationCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * True, if feature "UseProcessRemindings" is enabled.
				 * @type {Boolean}
				 */
				"ProcessDashboardVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": Terrasoft.Features.getIsEnabled("UseProcessRemindings")
				},

				/**
				 * Counter of unread notifications menu item "Business processes".
				 * @type {String}
				 */
				"ProcessDashboardCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Flag of the active "Visa" menu item state, true on active.
				 * @type {Boolean}
				 */
				"VisaActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * Counter of the visa notification.
				 * @type {String}
				 */
				"VisaCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Flag of the active "Email" menu item state, true on active.
				 * @type {Boolean}
				 */
				"EmailActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * The number of unprocessed mail.
				 * @type {String}
				 */
				"EmailCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * The maximum length of text notifications counter.
				 * @type {Number}
				 */
				"MaxCounterLength": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 2
				},

				/**
				 * True, if visible menu item "Visa"
				 * @type {Boolean}
				 */
				"VisaVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * Menu item button icon name template.
				 * @type {Boolean}
				 */
				"MenuItemIconNameTemplate": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": "{0}Menu{1}{2}Icon"
				},

				/**
				 * Communication panel marker value.
				 * @type {Number}
				 */
				"CommunicationPanelMarkerValue": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"value": 0
				},

				/**
				 * The number of new unprocessed incoming emails.
				 * @type {Number}
				 */
				"NewNotProcessedIncomingEmailsCount": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 0
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @protected
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initUserCounters();
						this.checkHasSyncErrors();
						this.on("change:SelectedMenuItem", this.onSelectedMenuItemChanged, this);
						this.initSelectedMenuItem(function(selectedMenuItemTag) {
							this.set("SelectedMenuItem", selectedMenuItemTag);
							this.subscribeEmailTabToggle();
							this.Ext.callback(callback, scope || this);
							this._loadHiddenModule("CenterNotificationModule");
							this._loadHiddenModule("ProcessDashboardModule");
							this.tryProcessSettingsAddAction();
						}.bind(this));
					}, this]);
					this.subscribeSandboxEvents();
					this.subscribeServerChannelEvents();
				},

				/**
				 * Loads hidden panel item module.
				 * @private
				 * @param {String} moduleName Module name.
				 */
				_loadHiddenModule: function(moduleName) {
					var itemConfig = this.getPanelItemConfig(moduleName);
					itemConfig.loadHidden = true;
					this.sandbox.publish("CommunicationPanelItemSelected", itemConfig);
				},

				/**
				 * Subscribes to sandbox events.
				 * @protected
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("CenterCounterChanged", this.updateCenterCounter, this);
					this.sandbox.subscribe("IsCommunicationPanelItemSelect", this.isCommunicationPanelItemSelect, this);
					this.sandbox.subscribe("UpdateNewNotProcessedIncomingEmailsCounter",
						this.updateNewNotProcessedIncomingEmailsCounter, this);
					this.sandbox.subscribe("HideErrorTip", this.onHideErrorTip, this);
					this.sandbox.subscribe("OpenSyncSettingsEdit", this.hideErrorTip, this, ["SyncSettingsErrorItem"]);
					this.sandbox.subscribe("ProcessDashboardCounterChanged", this._updateProcessCounter, this);
				},

				/**
				 * Subscribes to email tab visibility change.
				 * @protected
				 */
				subscribeEmailTabToggle: function() {
					this.on("change:EmailActive", this.onEmailPanelToggle, this);
				},

				/**
				 * Subscribes viewmodel to server messages.
				 * @protected
				 */
				subscribeServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessage, this);
				},

				/**
				 * Server message handler. If sender NewEmail, increments new message counter.
				 * @protected
				 * @param {Object} scope Message scope.
				 * @param {Object} message Server messsage.
				 */
				onServerChannelMessage: function(scope, message) {
					if (this.isEmpty(message) || this.isEmpty(message.Header)) {
						return;
					}
					this.processNewEmailMessage(message);
					this.processSynchronizationErrorMesage(message);
				},

				/**
				 * Updates new messages counter on server message.
				 * @protected
				 * @param {Object} message Server channel message.
				 */
				processNewEmailMessage: function(message) {
					if (message.Header.Sender === "NewEmail") {
						var receivedMessage = this.Ext.decode(message.Body);
						var isNeedProcess = receivedMessage.IsNeedProcess;
						var messageIncoming = receivedMessage.IsMessageIncoming;
						this.sendUpdateNewEmailsCounterMessage(receivedMessage);
						this.incrementNewIncomingNeedProcessMessageCounter(messageIncoming, isNeedProcess);
					}
				},

				/**
				 * Updates synchronization errors tip visibility on server message.
				 * @protected
				 * @param {Object} message Server channel message.
				 */
				processSynchronizationErrorMesage: function(message) {
					if (message.Header.Sender === "SynchronizationError") {
						var errorsVisible = this.get("ErrorsTipVisible");
						var emailPanelActive = this.get("EmailActive");
						if (!errorsVisible) {
							this.checkHasSyncErrors(function() {
								var hasErrors = this.get("HasEmailErrors");
								this.set("ErrorsTipVisible", hasErrors && !emailPanelActive);
							}, this);
						}
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
				 * @overridden
				 */
				destroy: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessage, this);
					this.callParent(arguments);
				},

				/**
				 * Publish message to email panel for increasing new emails counter.
				 * @protected
				 * @param {Object} messageProperties New email message properties object.
				 * @param {Boolean} messageProperties.IsMessageIncoming Is new message incoming flag.
				 * @param {Boolean} messageProperties.IsMessageDraft Is new message draft flag.
				 * @param {Boolean} messageProperties.IsNeedProcess Is new message processed flag.
				 * @param {Guid} [messageProperties.MailboxSyncSettings] New message mailbox identifier.
				 */
				sendUpdateNewEmailsCounterMessage: function(messageProperties) {
					this.sandbox.publish("UpdateNewEmailsCounter", this.Terrasoft.deepClone(messageProperties));
				},

				/**
				 * Increments new unprocessed incoming emails counter.
				 * @protected
				 * @param {Boolean} isMessageIncoming Is new message incoming flag.
				 * @param {Boolean} isNeedProcess Is new message processed flag.
				 */
				incrementNewIncomingNeedProcessMessageCounter: function(isMessageIncoming, isNeedProcess) {
					if (isMessageIncoming && isNeedProcess) {
						var counter = this.get("NewNotProcessedIncomingEmailsCount");
						this.set("NewNotProcessedIncomingEmailsCount", ++counter);
						if (!this.get("EmailActive")) {
							this.set("EmailCounter", counter);
						}
					}
				},

				/**
				 * Returns state of the communication item state.
				 * @param {String} itemName Name of the item.
				 * @return {Boolean} State value.
				 */
				isCommunicationPanelItemSelect: function(itemName) {
					return this.get(itemName + "Active");
				},

				/**
				 * Visa button visibility initialization.
				 * @protected
				 * @virtual
				 */
				initVisaVisible: function() {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "NotificationProvider"
					});
					var visaType = "0";
					select.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "VisaProviderCount");
					select.filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Type", visaType));
					select.getEntityCollection(function(response) {
						if (response.success) {
							var result = response.collection.getByIndex(0);
							var visaProviderCount = result.get("VisaProviderCount");
							var visaVisible = visaProviderCount > 0;
							this.set("VisaVisible", visaVisible);
						}
					}, this);
				},

				/**
				 * Selected on load button initialization.
				 * @protected
				 * @virtual
				 * @param {function} callback Callback function. Recived selected button tag as first parameter.
				 */
				initSelectedMenuItem: function(callback) {
					var profile = this.get("Profile");
					var selectedMenuItemTag = !Ext.isEmpty((profile || {}).selectedItemTag)
						? profile.selectedItemTag
						: "";
					callback(selectedMenuItemTag);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
				 * @overridden
				 */
				getProfileKey: function() {
					return "CommunicationPanelProfileData";
				},

				/**
				 * Starts periodical remindings counters update job.
				 * @private
				 */
				initUserCounters: function() {
					var config = {
						serviceName: "RemindingService",
						methodName: "UpdateRemindingsCountersStart"
					};
					this.callService(config, Terrasoft.emptyFn, this);
				},

				/**
				 * Updates visas and notifications counters.
				 * @protected
				 * @param {Number} countersData.notificationsCount Number of notifications.
				 * @param {Number} countersData.visaCount Number of visas.
				 */
				updateUserCounters: function(countersData) {
					var notificationsCounterValue = String(countersData.remindingsCount || "");
					var visasCounterValue = String(countersData.visaCount || "");
					this.set("NotificationsCounter", notificationsCounterValue);
					this.set("VisaCounter", visasCounterValue);
				},

				/**
				 * Returns configuration object of the selected menu item.
				 * @virtual
				 * @param {String} moduleName Module name.
				 * @return {Object} Configuration object of the selected menu item.
				 */
				getPanelItemConfig: function(moduleName) {
					return {
						moduleName: moduleName,
						keepAlive: true
					};
				},

				/**
				 * Loads selected tab module.
				 * @private
				 * @param {String} itemTag Module name.
				 */
				loadModule: function(itemTag) {
					if (this.Ext.isObject(itemTag)) {
						this.callParent(arguments);
						return;
					}
					var moduleName = itemTag + "Module";
					var itemConfig = this.getPanelItemConfig(moduleName);
					if (Ext.isEmpty(itemConfig)) {
						return;
					}
					var previousItemConfig = this.get("PreviousItemConfig");
					this.set("PreviousItemConfig", itemConfig);
					itemConfig.previousItemConfig = previousItemConfig;
					this.sandbox.publish("CommunicationPanelItemSelected", itemConfig);
				},

				/**
				 * Menu button click handler. Button tag passed as 4-th argument.
				 * @private
				 */
				onMenuItemClick: function() {
					var selectedItemTag = arguments[3];
					var oldItemTag = this.get("SelectedMenuItem");
					if (selectedItemTag === oldItemTag) {
						selectedItemTag = "";
					}
					this.set("SelectedMenuItem", selectedItemTag);

					GoogleTagManagerUtilities.actionModule({
						virtualUrl: this.Terrasoft.workspaceBaseUrl + "/" + this.sandbox.id,
						moduleName: selectedItemTag,
						typeModule: selectedItemTag
					});
				},

				/**
				 * Hides right panel.
				 * @private
				 */
				closeRightPanel: function() {
					this.set("SelectedMenuItem", "");
				},

				/**
				 * Sets "Hide panel" button visibility.
				 * @private
				 */
				isRightPanelCloseButtonVisible: function() {
					return !Ext.isEmpty(this.get("SelectedMenuItem"));
				},

				/**
				 * Handles right panel active element changed.
				 * @private
				 * @param {Backbone.Model} model Model instance.
				 * @param {String} newItemTag Selected menu item tag.
				 */
				onSelectedMenuItemChanged: function(model, newItemTag) {
					var oldItemTag = model.previous("SelectedMenuItem");
					var isOldItemNotEmpty = !Ext.isEmpty(oldItemTag);
					var isNewItemNotEmpty = !Ext.isEmpty(newItemTag);
					this.saveProfileData(function() {
						this.sandbox.publish("ShowHideRightSidePanel", {
							forceShow: isNewItemNotEmpty
						});
						if (isNewItemNotEmpty) {
							this.loadModule(newItemTag);
						}
					}.bind(this));
					if (isOldItemNotEmpty) {
						this.set(oldItemTag + "Active", false);
					}
					if (isNewItemNotEmpty) {
						this.set(newItemTag + "Active", true);
					}
					this.updateEmailCommunicationPanel();
				},

				/**
				 * Updates email counters and reloads emails in email communication panel.
				 * @private
				 */
				updateEmailCommunicationPanel: function() {
					var incomingNeedProcessEmailCount = this.get("NewNotProcessedIncomingEmailsCount");
					if (incomingNeedProcessEmailCount === 0) {
						return;
					}
					if (this.get("EmailActive")) {
						this.set("NewNotProcessedIncomingEmailsCount", 0);
						this.set("EmailCounter", "");
						this.sandbox.publish("ReloadNotProcessedIncomingEmails");
					} else {
						this.set("EmailCounter", incomingNeedProcessEmailCount);
					}
				},

				/**
				 * Saves options of the communication panel into profile.
				 * @private
				 * @param {Function} callback (optional) Callback function.
				 */
				saveProfileData: function(callback) {
					var selectedMenuItemTag = this.get("SelectedMenuItem");
					var profileData = Ext.Object.merge(this.ProfileData || {},
						{selectedItemTag: selectedMenuItemTag});
					Terrasoft.utils.saveUserProfile(this.getProfileKey(), profileData, false, function() {
						this.set("Profile", profileData);
						if (callback) {
							callback();
						}
					}.bind(this));
				},

				/**
				 * Creates remindings counters update config object.
				 * @param {Object} counters New reminding counters values config.
				 * @return {Object} Remindings counters update config object.
				 */
				getCountersConfig: function(counters) {
					return {
						remindingsCount: counters.RemindingsCount,
						visaCount: counters.VisaCount
					};
				},

				/**
				 * Creates menu icon image for current menu item state.
				 * @private
				 * @param {String} itemTag Menu item tag.
				 * @return {Object} Menu item icon config.
				 */
				getItemImageConfig: function(itemTag) {
					var resourceName = "";
					var menuItemIconNameTemplate = this.get("MenuItemIconNameTemplate");
					if (!this.getIsFeatureEnabled("OldUI")) {
						resourceName = this.Ext.String.format(menuItemIconNameTemplate, itemTag, "", "");
						return this.get("Resources.Images." + resourceName + "SVG");
					}
					var isItemPressed = (this.get("SelectedMenuItem") === itemTag);
					var isItemCounter = this.get(itemTag + "Counter");
					var pressedSuffix = isItemPressed ? "Pressed" : Ext.emptyString;
					var counterSuffix = isItemCounter ? "Counter" : Ext.emptyString;
					resourceName = Ext.String.format(menuItemIconNameTemplate, itemTag, pressedSuffix, counterSuffix);
					return this.get("Resources.Images." + resourceName);
				},

				/**
				 * Returns tool tip for communication panel item.
				 * @private
				 * @param {String} tag Communication panel item tag.
				 * @return {String} Tool tip text.
				 */
				getHint: function(tag) {
					return this.get("Resources.Strings." + tag + "MenuHint");
				},

				/**
				 * Creates "Hide communication panel" button image config.
				 * @private
				 * @return {Object} "Hide communication panel" button image config.
				 */
				getCloseRightSidePanelButtonImageConfig: function() {
					return this.get("Resources.Images.ImageCloseRightSidePanelButton");
				},

				/**
				 * Returns tool tip for "Hide communication panel" button.
				 * @private
				 * @return {String} Tool tip text.
				 */
				getCloseRightSidePanelButtonHint: function() {
					return this.get("Resources.Strings.CloseRightSidePanel");
				},

				/**
				 * Updates the number of notifications on general counter.
				 * @private
				 * @param {String} value Number of the center notifications.
				 */
				updateCenterCounter: function(value) {
					this.set("CenterNotificationCounter", value);
					this.set("CommunicationPanelMarkerValue", value || 0);
				},

				/**
				 * Updates the number of process notifications.
				 * @private
				 * @param {String} value Number of the center notifications.
				 */
				_updateProcessCounter: function(value) {
					this.set("ProcessDashboardCounter", value);
				},

				/**
				 * Updates "New incoming and not processed email counter" in collapsed communication panel.
				 * @private
				 * @param {String} value Number of new incoming and not processed emails.
				 */
				updateNewNotProcessedIncomingEmailsCounter: function(value) {
					this.set("NewNotProcessedIncomingEmailsCount", value);
				},

				/**
				 * Before error tip visibility changed event handler.
				 * @param {String} visibilityChangeEvent Visibility change event type.
				 * @return {Boolean} False, when hide event recived, true othervise.
				 */
				onBeforeTipVisibilityChange: function(visibilityChangeEvent) {
					var hideEvent = this.Terrasoft.controls.TipEnums.visibilityChangeEvent.HIDE_ON_DOCUMENT_MOUSE_DOWN;
					return visibilityChangeEvent !== hideEvent;
				},

				/**
				 * Returns synchronization errors tip visibility.
				 * @return {Boolean} Synchronization errors tip visibility.
				 */
				getErrorsTipVisible: function() {
					var errorsVisible = this.get("ErrorsTipVisible");
					var emailPanelActive = this.get("EmailActive");
					return (errorsVisible && !emailPanelActive);
				},

				/**
				 * Closes synchronization errors tip.
				 */
				hideErrorTip: function() {
					this.set("ErrorsTipVisible", false);
				},

				/**
				 * Hide errors tip message handler.
				 * @protected
				 */
				onHideErrorTip: function() {
					this.set("HasEmailErrors", false);
					this.hideErrorTip();
				},

				/**
				 * Creates email button marker value.
				 * @protected
				 * @returns {String} Email button marker value.
				 */
				getEmailBtnMarker: function() {
					var hasEmailErrors = this.get("HasEmailErrors");
					var isEmailActive = this.get("EmailActive");
					return hasEmailErrors && !isEmailActive ? "email errors" : "email";
				},

				/**
				 * Hides error tip on email panel open event.
				 * @protected
				 */
				onEmailPanelToggle: function() {
					if (this.get("EmailActive")) {
						this.hideErrorTip();
					}
				},

				/**
				 * Checks current user mailboxes has error codes.
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Callback function scope.
				 */
				checkHasSyncErrors: function(callback, scope) {
					var settingsEsq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					settingsEsq.addColumn("Id");
					var userFilters = settingsEsq.createFilterGroup();
					userFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					userFilters.add("userMailboxFilter", settingsEsq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
						this.Terrasoft.SysValue.CURRENT_USER.value));
					userFilters.add("IsSharedFilter", settingsEsq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "IsShared", true));
					settingsEsq.filters.add("ErrorNotNull", settingsEsq.createColumnIsNotNullFilter("ErrorCode"));
					settingsEsq.filters.add("UserFilters", userFilters);
					settingsEsq.getEntityCollection(function(result) {
						var hasErrors = result.success && !result.collection.isEmpty();
						this.set("HasEmailErrors", hasErrors);
						this.Ext.callback(callback, scope);
					}, this);
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "communicationPanelAll",
					"propertyName": "items",
					"values": {
						"id": "communicationPanelAll",
						"selectors": {"wrapEl": "#communicationPanelAll"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["all"],
						"items": [],
						"tips": [],
						"markerValue": {"bindTo": "CommunicationPanelMarkerValue"}
					}
				},
				{
					"operation": "insert",
					"name": "communicationPanelTip",
					"parentName": "communicationPanelAll",
					"propertyName": "tips",
					"values": {
						"content": {"bindTo": "Resources.Strings.CommunicationPanelTip"},
						"contextIdList": ["0", "IntroPage"],
						"behaviour": {
							"displayEvent": Terrasoft.controls.TipEnums.displayEvent.NONE
						}
					}
				},
				{
					"operation": "insert",
					"name": "communicationPanelContent",
					"parentName": "communicationPanelAll",
					"propertyName": "items",
					"values": {
						"id": "communicationPanelContent",
						"selectors": {"wrapEl": "#communicationPanelContent"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["content"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "communicationPanelContent",
					"propertyName": "items",
					"name": "email",
					"values": {
						"tag": "Email",
						"generator": "CommunicationPanelHelper.generateMenuItem",
						"markerValue": {"bindTo": "getEmailBtnMarker"},
						"tips": []
					}
				},
				{
					"operation": "insert",
					"parentName": "email",
					"propertyName": "tips",
					"name": "SyncErrorsTipContainer",
					"values": {
						"style": Terrasoft.TipStyle.RED,
						"markerValue": "SyncErrorsTip",
						"visible": {"bindTo": "getErrorsTipVisible"},
						"restrictAlignType": Terrasoft.AlignType.LEFT,
						"beforeVisibilityChange": {"bindTo": "onBeforeTipVisibilityChange"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.NONE
						},
						"closeButtonConfig": {
							"click": {"bindTo": "hideErrorTip"},
							"markerValue": "SyncErrorsTipCloseBtn"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SyncErrorsTips",
					"propertyName": "items",
					"parentName": "SyncErrorsTipContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {"wrapClassName": ["sync-settings-errors", "sync-settings-errors-tip"]},
						"moduleName": "BaseSchemaModuleV2",
						"instanceConfig": {
							"isSchemaConfigInitialized": true,
							"schemaName": "SyncSettingsErrors",
							"useHistoryState": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "communicationPanelContent",
					"propertyName": "items",
					"name": "esnFeed",
					"values": {
						"tag": "ESNFeed",
						"generator": "CommunicationPanelHelper.generateMenuItem"
					}
				},
				{
					"operation": "insert",
					"parentName": "communicationPanelContent",
					"propertyName": "items",
					"name": "centerNotification",
					"values": {
						"tag": "CenterNotification",
						"generator": "CommunicationPanelHelper.generateMenuItem"
					}
				},
				{
					"operation": "insert",
					"parentName": "communicationPanelContent",
					"propertyName": "items",
					"name": "processDashboard",
					"values": {
						"tag": "ProcessDashboard",
						"caption": {"bindTo": "ProcessDashboardCounter"},
						"visible": {"bindTo": "ProcessDashboardVisible"},
						"generator": "CommunicationPanelHelper.generateMenuItem"
					}
				}
			]
		};
	});

define('CommunicationPanelESNResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CommunicationPanelESN", ["terrasoft", "RemindingsUtilities", "ESNConstants", "CommunicationPanelHelper"],
	function(Terrasoft, RemindingsUtilities, ESNConstants) {
		return {
			messages: {
				/**
				 * Update counters message.
				 */
				"UpdateCounters": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Determines if "social feed notifications" menu item is active.
				 * @type {Boolean}
				 */
				"ESNNotificationActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * "Social feed notifications" menu item image configuration.
				 * @type {Object}
				 */
				"ESNNotificationImageConfig": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				 * ####### ##### ###########.
				 * @type {String}
				 */
				"ESNNotificationCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ###### ### popup ###########.
				 * @type {String}
				 */
				"ESNNotification": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.CommunicationPanel#updateUserCounters
				 * @overridden
				 */
				updateUserCounters: function(countersData) {
					this.callParent(arguments);
					var esnNotificationsCounterValue = "";
					var esnNotificationsValue = "";
					if (countersData.hasOwnProperty("esnNotificationsCount") &&
							(countersData.esnNotificationsCount > 0)) {
						esnNotificationsCounterValue = countersData.esnNotificationsCount;
					}
					if (countersData.hasOwnProperty("esnNotifications") &&
							(countersData.esnNotifications > 0)) {
						esnNotificationsValue = countersData.esnNotifications;
					}
					this.set("ESNNotificationCounter", esnNotificationsCounterValue);
					this.set("ESNNotification", esnNotificationsValue);
				},

				/**
				 * ######### ############### ###### ### ########## ######## #########.
				 * @overridden
				 * @param {Object} counters ######, ####### # #### ######## ######## #########
				 * ########## ###########.
				 * @return {Object} ############### ###### ### ########## ######## #########.
				 */
				getCountersConfig: function(counters) {
					var result = this.callParent(arguments);
					result.esnNotificationsCount = counters.ESNNotificationsCount;
					return result;
				},

				/**
				 * Handles counters change event.
				 * @private
				 * @param {Object} scope Callback-function execution context.
				 * @param {Function} response Server response object.
				 */
				onSocialMessageReceived: function(scope, response) {
					if (!response) {
						return;
					}
					if (response.Header.Sender === ESNConstants.WebSocketMessageHeader.ESNNotification) {
						this.sandbox.publish("UpdateCounters");
					}
				},

				/**
				 * ############## ######### ######## ######.
				 * @protected
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
							this.onSocialMessageReceived, this);
						if (callback) {
							callback.call(scope || this);
						}
					}, this]);
				},

				/**
				 * ####### ### ######## ## #######.
				 * @virtual
				 */
				destroy: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE, this.onSocialMessageReceived,
						this);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.CommunicationPanel#getPanelItemConfig
				 * @overridden
				 */
				getPanelItemConfig: function(moduleName) {
					var config = this.callParent(arguments);
					if (moduleName !== "ESNFeedModule") {
						return config;
					}
					return this.Ext.apply(config, {
						keepAlive: true
					});
				}

			},
			diff: []
		};
	});

define('CommunicationPanelCTIBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CommunicationPanelCTIBase", ["terrasoft", "CommunicationPanelHelper", "CtiBaseHelper"],
	function(Terrasoft, CommunicationPanelHelper, CtiBaseHelper) {
		return {
			messages: {

				/**
				 * @message SelectCommunicationPanelItem
				 * ######## ##### # ################ ######.
				 * @param {Object} ########## # ######### ###### ################ ######.
				 */
				"SelectCommunicationPanelItem": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message CallDurationChanged
				 * ######## ###### # ############# ################ ######.
				 * @param {String} ############ ######.
				 */
				"CallDurationChanged": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				/**
				 * #######, ############ ####### ## ##### #### «CTI ######».
				 * @type {Boolean}
				 */
				"CtiPanelActive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * ####### ########### #######.
				 * @type {String}
				 */
				"CtiPanelCounter": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ##### ######### # ####### mm:ss.
				 * @type {String}
				 */
				"CallDuration": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				 * #######, ############ ##### ## ##### #### «CTI ######».
				 * @type {Boolean}
				 */
				"CtiPanelVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * #######, ############ ############# ######## cti-###### ### ########### ########.
				 * @type {Boolean}
				 */
				"CtiPanelModuleKeepAlive": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				}
			},
			methods: {

				/**
				 * ############## ######### ########## ##### ####.
				 * @protected
				 * @overridden
				 * @param {function} callback ####### ######### ######. ########## # ####### ########## ### ##########
				 * ###### ####.
				 */
				initSelectedMenuItem: function(callback) {
					this.sandbox.subscribe("SelectCommunicationPanelItem", this.selectItem.bind(this));
					this.sandbox.subscribe("CallDurationChanged", this.onCallDurationChanged.bind(this));
					if (Terrasoft.isCurrentUserSsp()) {
						this.callParent(arguments);
					} else {
						this.callParent([function(selectedMenuItemTag) {
							CtiBaseHelper.GetIsTelephonyEnabled(function(isEnabled) {
								this.set("CtiPanelVisible", isEnabled);
								if (!isEnabled && (selectedMenuItemTag === "CtiPanel")) {
									selectedMenuItemTag = "";
								}
								if (isEnabled && (selectedMenuItemTag !== "CtiPanel")) {
									var itemConfig = this.getPanelItemConfig("CtiPanelModule");
									itemConfig.loadHidden = true;
									this.sandbox.publish("CommunicationPanelItemSelected", itemConfig);
								}
								callback(selectedMenuItemTag);
							}.bind(this));
						}.bind(this)]);
					}
				},

				/**
				 * ############ ######### # ###, ### ############ ######## ###### ##########.
				 * @param {String} callDuration ############ ###### # ####### mm:ss.
				 */
				onCallDurationChanged: function(callDuration) {
					this.set("CallDuration", callDuration);
				},

				/**
				 * @inheritDoc Terrasoft.CommunicationPanel#getPanelItemConfig
				 * @overridden
				 */
				getPanelItemConfig: function(moduleName) {
					var config = this.callParent(arguments);
					if (moduleName !== "CtiPanelModule") {
						return config;
					}
					return Ext.apply(config, {
						keepAlive: true
					});
				},

				/**
				 * ############# ######### ##### ####.
				 * @private
				 * @param {Object} config ################ ###### ########## ###### ####.
				 */
				selectItem: function(config) {
					this.set("SelectedMenuItem", config.selectedItem);
				},

				/**
				 * ########## ############ ########### ######## #### CtiPanel ## ### #########.
				 * @private
				 * @param {String} itemTag ############# ######## ####.
				 * @returns {Object} ############ ###########.
				 */
				getCtiPanelImageConfig: function(itemTag) {
					var resourceName = "";
					var menuItemIconNameTemplate = this.get("MenuItemIconNameTemplate");
					if (!this.getIsFeatureEnabled("OldUI")) {
						resourceName = this.Ext.String.format(menuItemIconNameTemplate, itemTag, "", "");
						return this.get("Resources.Images." + resourceName + "SVG");
					}
					var isItemPressed = this.get("SelectedMenuItem") === itemTag;
					var ctiPanelCounter = this.get(itemTag + "Counter");
					var pressedSuffix = isItemPressed ? "Pressed" : Ext.emptyString;
					var counterSuffix = !Ext.isEmpty(ctiPanelCounter) ? "Counter" : Ext.emptyString;
					var callDuration = this.get("CallDuration");
					if (!isItemPressed) {
						counterSuffix = !Ext.isEmpty(callDuration) ? "CallDuration" : counterSuffix;
					}
					resourceName = Ext.String.format(menuItemIconNameTemplate, itemTag, pressedSuffix, counterSuffix);
					return this.get("Resources.Images." + resourceName);
				},

				/**
				 * ########## ##### ######## #### CtiPanel ## ### #########.
				 * @private
				 * @param {String} itemTag ############# ######## ####.
				 * @returns {String} ##### ###########.
				 */
				getCtiPanelStyle: function(itemTag) {
					var isItemPressed = this.get("SelectedMenuItem") === itemTag;
					var callDuration = this.get("CallDuration");
					var itemWithCallDuration = (!isItemPressed && !Ext.isEmpty(callDuration));
					return itemWithCallDuration ? "with-call-duration" : "without-call-duration";
				},

				/**
				 * ########## ####### ###### #### "Cti ######". ##### ####### #### ########## ########## #######,
				 * ####, ### ####### ###### # ######### ###### - ############ ######.
				 * @private
				 * @returns {String} ####### ###### #### "Cti ######".
				 */
				getCtiPanelCaption: function(itemTag) {
					var isItemPressed = this.get("SelectedMenuItem") === itemTag;
					var ctiPanelCounter = this.get(itemTag + "Counter");
					var callDuration = this.get("CallDuration");
					if (!isItemPressed) {
						return !Ext.isEmpty(callDuration) ? callDuration : ctiPanelCounter;
					}
					return ctiPanelCounter;
				}
			},
			diff: [
				{
					"operation": "insert",
					"index": 0,
					"parentName": "communicationPanelContent",
					"propertyName": "items",
					"name": "ctiPanel",
					"values": {
						"tag": "CtiPanel",
						"visible": {"bindTo": "CtiPanelVisible"},
						"imageConfig": {"bindTo": "getCtiPanelImageConfig"},
						"caption": {"bindTo": "getCtiPanelCaption"},
						"style": {"bindTo": "getCtiPanelStyle"},
						"generator": "CommunicationPanelHelper.generateMenuItem"
					}
				}
			]
		};
	});

define("CommunicationPanel", ["terrasoft"],
	function(Terrasoft) {
		return {
			messages: {},
			attributes: {},
			methods: {
				/**
				 * Defines whether current user is portal or not.
				 * @private
				 * @return {boolean} true - if current user is not portal user
				 */
				getIsNotPortalUser: function() {
					return !Terrasoft.isCurrentUserSsp();
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "email",
					"values": {
						"visible": {
							"bindTo": "getIsNotPortalUser"
						}
					}
				},
				{
					"operation": "merge",
					"name": "remindings",
					"values": {
						"visible": {
							"bindTo": "getIsNotPortalUser"
						}
					}
				},
				{
					"operation": "merge",
					"name": "esnFeed",
					"values": {
						"visible": {
							"bindTo": "getIsNotPortalUser"
						}
					}
				},
				{
					"operation": "merge",
					"name": "centerNotification",
					"values": {
						"visible": {
							"bindTo": "getIsNotPortalUser"
						}
					}
				}
			]
		};
	});


