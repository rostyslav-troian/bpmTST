Terrasoft.configuration.Structures["MessageHistoryPage"] = {innerHierarchyStack: ["MessageHistoryPageMessage", "MessageHistoryPage"]};
define('MessageHistoryPageMessageStructure', ['MessageHistoryPageMessageResources'], function(resources) {return {schemaUId:'c15388c5-08a9-4cba-b737-c0cf124426ca',schemaCaption: "Message history page", parentSchemaName: "", schemaName:'MessageHistoryPageMessage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('MessageHistoryPageStructure', ['MessageHistoryPageResources'], function(resources) {return {schemaUId:'05b33741-f158-4366-8597-191fa7f1ee18',schemaCaption: "Message history page", parentSchemaName: "MessageHistoryPageMessage", schemaName:'MessageHistoryPage',parentSchemaUId:'c15388c5-08a9-4cba-b737-c0cf124426ca',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"MessageHistoryPageMessage",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('MessageHistoryPageMessageResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("MessageHistoryPageMessage", ["ConfigurationEnums", "MessageHistoryUtilities", "css!MessageHistoryPageCSS"],
	function(ConfigurationEnums) {
		return {
			mixins: {
				MessageHistoryUtilities: "Terrasoft.MessageHistoryUtilities"
			},
			properties: {
				/**
				 * Property key for new version of the history.
				 */
				"enabledMessageHistoryV2PropertyName": "isMessageHistoryV2Enabled"
			},
			messages: {
				/**
				 * @message EntityInitialized
				 * Inform subscribes about the completion of initialization of the entity.
				 * Messages transmitted information about the object.
				 */
				"EntityInitialized": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DeleteMessageFromHistory
				 * Informs that need to delete message from the loaded history.
				 */
				"DeleteMessageFromHistory": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
				}
			},
			attributes: {

				/**
				 * True, if the messages container runs asynchronously.
				 */
				"IsContainerListAsync": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},
				/**
				 * The value of the column on which the sorting occurs when paged view.
				 */
				"SortColumnLastValue": {
					"dataValueType": this.Terrasoft.DataValueType.DATE_TIME,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * The number of messages that are loaded on start.
				 */
				"InitMessageCount": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 15
				},
				/**
				 * The number of messages reloaded when scrolling.
				 */
				"NextMessageCount": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 15
				},
				/**
				 * The number of messages to be skip.
				 */
				"MessagesOffsetCount": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 0
				},
				/**
				 * True, if new history of messages enabled.
				 */
				"IsMessageHistoryV2Enabled": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				},
				/**
				 * Container for custom history of messages profile.
				 */
				"MessageHistoryCustomProfile": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					value: null
				},

				/**
				 * Notifiers are initialized flag.
				 */
				"AreNotifiersInitialized": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			methods: {

				/**
				 * Adds custom values to the profile.
				 * @param {String} propertyName Property name.
				 * @param {Object} propertyValue Property value.
				 * @private
				 */
				_addPropertyToProfile: function(propertyName, propertyValue) {
					var key = this.getCustomProfileKey();
					var profile = this.$MessageHistoryCustomProfile;
					if (!this.Ext.isEmpty(profile)) {
						profile[propertyName] = propertyValue;
						this.Terrasoft.utils.saveUserProfile(key, profile, false);
						this.$MessageHistoryCustomProfile = profile;
					}
				},

				/**
				 * Checks if new history of messages enabled.
				 * @protected
				 * @virtual
				 */
				getIsMessageHistoryV2FeatureEnabled: function() {
					return this.getIsFeatureEnabled("MessageHistoryV2");
				},

				/**
				 * Publish message for reload notifiers and message history.
				 * @param {Boolean} isMessageHistoryV2Enabled Is new history of messages enabled.
				 * @private
				 */
				_switchToMessageHistoryV2: function (isMessageHistoryV2Enabled) {
					this.set("IsNeedShowMessageHistoryV2", isMessageHistoryV2Enabled);
					this._addPropertyToProfile(this.enabledMessageHistoryV2PropertyName, isMessageHistoryV2Enabled);
					this.reInitMessagesNotifiers({isMessageHistoryV2Enabled: isMessageHistoryV2Enabled});
				},

				/**
				 * Returns custom profile key for the history schema name.
				 * @protected
				 * @virtual
				 * @returns {string} Profile key for the history.
				 */
				getCustomProfileKey: function() {
					var historySchemaName = this.get("historySchemaName") || this.getRecordInfo().historySchemaName;
					return historySchemaName + "CustomMessageHistoryV2Data";
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#initializeProfile
				 * @overridden
				 */
				initializeProfile: function(callback, scope) {
					this.callParent([function() {
						if (this.getIsMessageHistoryV2FeatureEnabled()) {
							this.requireCustomProfile(callback, scope);
						} else {
							this.Ext.callback(callback, scope);
						}
					}, scope || this]);
				},

				/**
				 * Loads MessageHistory custom profile.
				 * @public
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 */
				requireCustomProfile: function(callback, scope) {
					var key = this.getCustomProfileKey();
					this.requireProfile(function(profile) {
						if (profile) {
							this.$MessageHistoryCustomProfile = profile;
							if (!this.Ext.isEmpty(profile[this.enabledMessageHistoryV2PropertyName])) {
								this.set("IsMessageHistoryV2Enabled",
									profile[this.enabledMessageHistoryV2PropertyName]);
							}
						}
						this.Ext.callback(callback, scope);
					}, scope || this, key);
				},

				/**
				 * Returns visibility of ShowMessageHistoryV2 button.
				 * @public
				 * @return {Boolean} Visibility of ShowMessageHistoryV2 button.
				 */
				isShowMessageHistoryV2LabelVisible: function() {
					return !this.get("IsMessageHistoryV2Enabled") && this.getIsMessageHistoryV2FeatureEnabled();
				},

				/**
				 * Returns visibility of HideMessageHistoryV2 button.
				 * @public
				 * @return {Boolean} Visibility of HideMessageHistoryV2 button.
				 */
				isHideMessageHistoryV2LabelVisible: function() {
					return this.get("IsMessageHistoryV2Enabled") && this.getIsMessageHistoryV2FeatureEnabled();
				},

				/**
				 * Loads old version of the message history.
				 * @public
				 */
				onHideMessageHistoryV2Click: function() {
					this._switchToMessageHistoryV2(false);
				},

				/**
				 * Loads new version of the message history.
				 * @public
				 */
				onShowMessageHistoryV2Click: function() {
					this._switchToMessageHistoryV2(true);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.mixins.MessageHistoryUtilities.init.call(this);
						this.setDefaultValues(this.getRecordInfo());
						this.initCollection("HistoryMessages");
						this.subscribeSandboxEvents();
						this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
								this.onMessageHistoryReceived, this);
						callback.call(scope);
					}, this]);
					if (this.getIsFeatureEnabled("UseMessageHistoryPagination")) {
						this.$MessagesOffsetCount = 0;
					}
				},

				/**
				 * Initializes a collection.
				 * @private
				 * @param {String} collectionName Collection name.
				 */
				initCollection: function(collectionName) {
					var collection = this.get(collectionName);
					if (!collection) {
						collection = this.Ext.create("Terrasoft.Collection");
						this.set(collectionName, collection);
					} else {
						collection.clear();
					}
				},

				/**
				 * Returns the information about the current record.
				 * @protected
				 * @virtual
				 * @return {Object} Information about the current record.
				 */
				getRecordInfo: function() {
					return this.sandbox.publish("GetRecordInfo", null, [this.sandbox.id]);
				},

				/**
				 * Initializes view model when record page changed.
				 * @protected
				 * @virtual
				 */
				initModuleViewModel: function() {
					this.init(this.loadInitialHistoryMessages, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("InitModuleViewModel", this.initModuleViewModel, this, [this.sandbox.id]);
					this.sandbox.subscribe("DeleteMessageFromHistory", this.deleteMessageFromCollection, this);
				},

				/**
				 * Deletes message from the loaded history collection.
				 * @param {Guid} messageId Message identifier.
				 */
				deleteMessageFromCollection: function(messageId) {
					var messages = this.get("HistoryMessages");
					var messageIndex = messages.indexOfKey(messageId);
					messages.removeByIndex(messageIndex);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					var recordInfo = this.getRecordInfo();
					this.setDefaultValues(recordInfo);
					var isNewRecord = this.getIsNewRecord();
					if (isNewRecord) {
						return;
					}
					var socialMessages = this.get("HistoryMessages");
					if (!socialMessages.getCount()) {
						this.initMessagesNumberEverySearchIteration(this.loadInitialHistoryMessages, this);
					}
				},

				/**
				 * Initializes a number of posts to search iteration.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The context of the callback function.
				 * @protected
				 * @virtual
				 */
				initMessagesNumberEverySearchIteration: function(callback, scope) {
					this.set("MessagesNumberEverySearchIteration", 50);
					if (Object.keys(this.Notifiers).length === 0) {
						var sectionId = this.get("sectionId");
						this.initNotifiers(sectionId, callback, scope);
					} else {
						scope.set("AreNotifiersInitialized", true);
						callback.call(scope);
					}
				},

				/**
				 * ReInitializes message notifiers.
				 * @param {Object} additionalProperties Additional properties.
				 * @protected
				 * @virtual
				 */
				reInitMessagesNotifiers: function (additionalProperties) {
					var sectionId = this.get("sectionId");
					this.$IsMessageHistoryV2Enabled = additionalProperties &&
						additionalProperties.isMessageHistoryV2Enabled;
					this._resetHistoryMessages();
					this.initNotifiers(sectionId, this.loadInitialHistoryMessages, this);
				},

				/**
				 * Resets loaded history of messages.
				 * @private
				 */
				_resetHistoryMessages: function() {
					this.$MessagesOffsetCount = 0;
					var history = this.get("HistoryMessages");
					history.clear();
				},

				/**
				 * Sets defaults values.
				 * @private
				 * @param {Object} recordInfo Record information for displaying the message history.
				 */
				setDefaultValues: function(recordInfo) {
					if (!recordInfo) {
						return;
					}
					var relationEntityId = recordInfo.relationEntityId;
					var historyRelationColumn = recordInfo.historyRelationColumn;
					var historyBySectionFilter =
						this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							historyRelationColumn, relationEntityId);
					this.set("historyBySectionFilter", historyBySectionFilter);
					this.set("historySchemaName", recordInfo.historySchemaName);
					this.set("relationEntityId", relationEntityId);
					this.set("SortColumnLastValue", null);
					this.set("sectionId", recordInfo.sectionId);
				},

				/**
				 * Handles the completion of the loading posts.
				 * @private
				 * @param {Terrasoft.BaseViewModel} item Item view model.
				 */
				loadHistoryMessagesCallback: function(item) {
					var messages = this.get("HistoryMessages");
					var messageId = item.get("Id");
					if (!messages.contains(messageId)) {
						messages.insert(0, messageId, item);
					} else if (this.getIsFeatureEnabled("CanUpdateHistoryMessage")) {
						var messageIndex = messages.indexOfKey(messageId);
						messages.removeByIndex(messageIndex);
						messages.insert(messageIndex, messageId, item);
					}
				},

				/**
				 * Handles the event of adding new post.
				 * @protected
				 * @virtual
				 * @param {Object} scope Context.
				 * @param {Object} response Web socket message.
				 */
				onMessageHistoryReceived: function(scope, response) {
					if (response && response.Header.Sender !== "UpdateMessageHistory") {
						return;
					}
					var receivedMessage = this.Ext.decode(response.Body);
					var relationEntityId = this.get("relationEntityId");
					if (receivedMessage.entityId !== relationEntityId) {
						return;
					}
					var filter = this.get("historyBySectionFilter");
					var entitySchemaName = this.get("historySchemaName");
					var sectionId = this.get("sectionId");
					var loadHistoryMessagesConfig = {
						messageId: receivedMessage.messageHistoryId,
						sandbox: this.sandbox,
						esqConfig: {
							filter: filter,
							entitySchemaName: entitySchemaName,
							sectionId: sectionId
						}
					};
					var config = {
						response: response,
						loadHistoryMessagesConfig: loadHistoryMessagesConfig,
						loadHistoryMessagesCallback: this.loadHistoryMessagesCallback
					};
					this.loadHistoryMessages(config.loadHistoryMessagesConfig,
						config.loadHistoryMessagesCallback, this);
				},

				/**
				 * Additional loading messages.
				 * @private
				 */
				onLoadNext: function() {
					setTimeout(function() {
						var historyBySectionFilter = this.get("historyBySectionFilter");
						var nextMessageCount = this.get("NextMessageCount");
						if (historyBySectionFilter) {
							this.loadMessages(nextMessageCount, historyBySectionFilter);
						} else {
							this.loadMessages(nextMessageCount);
						}
					}.bind(this), 10);
				},

				/**
				 * Returns message view config.
				 * @protected
				 * @virtual
				 * @param {Object} itemConfig Message config.
				 * @param {Terrasoft.BaseViewModel} item Message view model.
				 */
				getItemViewConfig: function(itemConfig, item) {
					var fullViewConfig = item.get("viewConfig");
					if (fullViewConfig.length > 0) {
						var messageWrapContainerIndex = 0;
						for (var i = 0; i < fullViewConfig.length; i++) {
							if (fullViewConfig[i].id === (this.getIsMessageHistoryV2FeatureEnabled() &&
								this.get("IsMessageHistoryV2Enabled") ? "HistoryV2Container" : "HistoryV1Container")) {
								messageWrapContainerIndex = i;
								break;
							}
						}
						itemConfig.config = item.get("viewConfig")[messageWrapContainerIndex];
					}
				},

				/**
				 * Load messages.
				 * @private
				 * @param {Number} rowCount The number of loading messages.
				 * @param {Terrasoft.BaseFilter} filter Messages filter.
				 */
				loadMessages: function(rowCount, filter) {
					var config = {
						rowCount: rowCount,
						filter: filter,
						entitySchemaName: this.get("historySchemaName"),
						sectionId: this.get("sectionId")
					};
					this.getNextMessages(config, function(messages) {
						var historyMessages = this.get("HistoryMessages");
						historyMessages.loadAll(this.filterDuplicatedRecords(historyMessages, messages));
						this.hideBodyMask();
					}, this);
				},

				/**
				 * Prevent loading messages with duplicated Id.
				 * @param existingMessages Collection of existing messages.
				 * @param newMessages Collection to load.
				 * @returns {*} Filtered collection to load.
				 */
				filterDuplicatedRecords: function(existingMessages, newMessages) {
					newMessages = newMessages.except(existingMessages,
							function(currentItem, value) { return currentItem.get("Id") === value.get("Id"); });
					var resultCollection = Ext.create("Terrasoft.Collection");
					newMessages.eachKey(function(key, item) {
						if (!resultCollection.findByAttr("Id", item.get("Id"))) {
							resultCollection.add(key, item);
						}
					});
					return resultCollection;
				},

				/**
				 * Get next messages.
				 * @private
				 * @param {Object} config Config to fetch messages from the base.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The context of the callback function.
				 */
				getNextMessages: function(config, callback, scope) {
					if (this.Ext.isEmpty(this.get("relationEntityId"))) {
						return;
					}
					var sortColumnName = this.getSortColumnName();
					this.loadHistoryMessages({
						sortColumnName: sortColumnName,
						sandbox: this.sandbox,
						esqConfig: {
							rowCount: config.rowCount,
							filter: config.filter,
							entitySchemaName: config.entitySchemaName,
							sectionId: config.sectionId
						}
					}, function(messages) {
						callback.call(scope || this, messages);
					}, this);
				},

				/**
				 * Returns the name of the column to sort messages history.
				 * @protected
				 * @virtual
				 * @return {String} The name of the column sorting.
				 */
				getSortColumnName: function() {
					return "CreatedOn";
				},

				/**
				 * Loads the initial number of messages.
				 * @private
				 */
				loadInitialHistoryMessages: function() {
					var historyBySectionFilter = this.get("historyBySectionFilter");
					var initMessageCount = this.get("InitMessageCount");
					this.loadMessages(initMessageCount, historyBySectionFilter);
				},

				/**
				 * Clears all event subscriptions.
				 * @protected
				 * @virtual
				 */
				destroy: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE, this.onMessageHistoryReceived,
							this);
					this.callParent(arguments);
				},

				/**
				 * Returns the status of the card.
				 * @private
				 * @return {Boolean} True - new record.
				 */
				getIsNewRecord: function() {
					var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					if (cardState) {
						return (cardState.state === ConfigurationEnums.CardStateV2.ADD ||
								cardState.state === ConfigurationEnums.CardStateV2.COPY);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeViewModelEvents
				 * @overridden
				 */
				subscribeViewModelEvents: function() {
					this.callParent(arguments);
				}
			},
			diff: [
				//MessageHistory
				{
					"operation": "insert",
					"name": "MessageHistory",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["historyWidth", "message-history"]
						},
						"items": []
					}
				},
				//MessageHistoryContainer
				{
					"operation": "insert",
					"name": "MessageHistoryContainer",
					"parentName": "MessageHistory",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["message-history-items"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ShowMessageHistoryV2Label",
					"parentName": "MessageHistoryContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ShowNewHistory"
						},
						"labelClass": ["messageHistoryV2-button-label"],
						"visible": {
							"bindTo": "isShowMessageHistoryV2LabelVisible"
						},
						"click": {
							"bindTo": "onShowMessageHistoryV2Click"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HideMessageHistoryV2Label",
					"parentName": "MessageHistoryContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.HideNewHistory"
						},
						"labelClass": ["messageHistoryV2-button-label"],
						"visible": {
							"bindTo": "isHideMessageHistoryV2LabelVisible"
						},
						"click": {
							"bindTo": "onHideMessageHistoryV2Click"
						}
					},
					"index": 1
				},
				//HistoryMessages
				{
					"operation": "insert",
					"name": "HistoryMessages",
					"parentName": "MessageHistoryContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "HistoryMessages",
						"observableRowNumber": 1,
						"observableRowVisible": {
							"bindTo": "onLoadNext"
						},
						"onGetItemConfig": "getItemViewConfig",
						"isAsync": {
							"bindTo": "IsContainerListAsync"
						}
					}
				}
			]
		};
	}
);

define("MessageHistoryPage", ["LocalMessageConstants", "css!LocalMessageHistoryPageCSS"],
	function(LocalMessageConstants) {
		return {
			messages: {
				/**
				 * @message ShowSystemMessages
				 * Message of informing history its need show system messages.
				 */
				"ShowSystemMessages": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message HideSystemMessages
				 * Message of informing history its need hide system messages.
				 */
				"HideSystemMessages": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				/**
				 * True, if need show system messages.
				 */
				"NeedShowSystemMessages": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.MessageHistoryPage#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("ShowSystemMessages", this.showSystemMessages, this, [this.sandbox.id]);
					this.sandbox.subscribe("HideSystemMessages", this.hideSystemMessages, this, [this.sandbox.id]);
				},

				/**
				 * Hides system message.
				 * @private
				 */
				hideSystemMessages: function() {
					this.set("NeedShowSystemMessages", false);
					this.reloadHistory();
				},

				/**
				 * Shows system message.
				 * @private
				 */
				showSystemMessages: function() {
					this.set("NeedShowSystemMessages", true);
					this.reloadHistory();
				},

				/**
				 * Reloads history.
				 * @private
				 */
				reloadHistory: function() {
					if (this.getIsFeatureEnabled("UseMessageHistoryPagination")) {
						this.$MessagesOffsetCount = 0;
					}
					var history = this.get("HistoryMessages");
					history.clear();
					this.set("SortColumnLastValue", null);
					var historyBySectionFilter = this.get("historyBySectionFilter");
					var initMessageCount = this.get("InitMessageCount");
					this.loadMessages(initMessageCount, historyBySectionFilter);
				},

				/**
				 * @inheritDoc Terrasoft.MessageHistoryUtilities#getHistoryMessageEsq
				 * @overridden
				 */
				getHistoryMessageEsq: function() {
					var esq = this.callParent(arguments);
					if (!this.get("NeedShowSystemMessages")) {
						esq.filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL,
							"MessageNotifier", LocalMessageConstants.MessageNotifier.Local));
					}
					return esq;
				},
				/**
				 * Returns visibility of show system message button.
				 * @return {Boolean} Visibility of hide system message button.
				 */
				getShowSystemMessagesLabelVisible: function() {
					return !this.get("NeedShowSystemMessages") && this.getIsMessageHistoryV2FeatureEnabled() &&
						this.get("AreNotifiersInitialized");
				},

				/**
				 * Returns visibility of hide system message button.
				 * @return {Boolean} Visibility of hide system message button.
				 */
				getHideSystemMessagesLabelVisible: function() {
					return this.get("NeedShowSystemMessages") && this.getIsMessageHistoryV2FeatureEnabled() &&
						this.get("AreNotifiersInitialized");
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "ShowSystemMessagesLabel",
					"parentName": "MessageHistoryContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ShowSystemMessagesString"
						},
						"labelClass": ["systemMessage-button-label"],
						"visible": {
							"bindTo": "getShowSystemMessagesLabelVisible"
						},
						"click": {
							"bindTo": "showSystemMessages"
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "HideSystemMessagesLabel",
					"parentName": "MessageHistoryContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.HideSystemMessagesString"
						},
						"labelClass": ["systemMessage-button-label"],
						"visible": {
							"bindTo": "getHideSystemMessagesLabelVisible"
						},
						"click": {
							"bindTo": "hideSystemMessages"
						}
					},
					"index": 1
				}
			]
		};
	}
);


