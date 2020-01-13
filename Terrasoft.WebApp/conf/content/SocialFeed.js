Terrasoft.configuration.Structures["SocialFeed"] = {innerHierarchyStack: ["SocialFeedESN", "SocialFeed"]};
define('SocialFeedESNStructure', ['SocialFeedESNResources'], function(resources) {return {schemaUId:'162c1f6d-f269-41dc-8330-e137a115b840',schemaCaption: "SocialFeed", parentSchemaName: "", schemaName:'SocialFeedESN',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialFeedStructure', ['SocialFeedResources'], function(resources) {return {schemaUId:'6a87eee6-ffb6-48c1-8cf0-fb5d1ba6edca',schemaCaption: "SocialFeed", parentSchemaName: "SocialFeedESN", schemaName:'SocialFeed',parentSchemaUId:'162c1f6d-f269-41dc-8330-e137a115b840',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SocialFeedESN",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialFeedESNResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SocialFeedESN", ["SocialFeedResources", "ESNConstants", "RightUtilities", "ESNFeedConfig",
		"ConfigurationEnums", "performancecountermanager", "SocialMessageViewModel", "SocialFeedUtilities",
		"SocialMentionUtilities", "ESNHtmlEditModule", "MultilineLabel", "css!HtmlEditModule", "css!MultilineLabel"],
	function(resources, ESNConstants, RightUtilities, ESNFeedConfig, ConfigurationEnums,
			performanceManager) {
		return {
			mixins: {
				SocialFeedUtilities: "Terrasoft.SocialFeedUtilities",
				SocialMentionUtilities: "Terrasoft.SocialMentionUtilities"
			},
			messages: {
				/**
				 * @message ChannelSaved
				 * Notify module about channel save.
				 */
				"ChannelSaved": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message RemoveChannel
				 * Notify module about channel remove.
				 */
				"RemoveChannel": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message EntityInitialized
				 * ########### ##### ############# ####### # ########### ########### # ########## #############
				 * ########. # ######## ######### ######### ########## ########## # #######.
				 */
				"EntityInitialized": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {

				/**
				 *
				 */
				"maskVisible": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				* #########.
				*/
				posts: {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * True, #### ####### ########## ### ########### ######### ######## # ########### ######.
				 */
				"IsContainerListAsync": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				},

				/**
				 * ######## ####### ##########.
				 */
				sortColumnName: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": "CreatedOn"
				},

				/**
				 * ######## ####### ## ####### ########## ########## ### ############ ######.
				 */
				sortColumnLastValue: {
					"dataValueType": Terrasoft.DataValueType.DATE_TIME,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * ######## ############ #########.
				 */
				"SocialMessageText": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ###### ######### ### ##########.
				 */
				channels: {
					"dataValueType": Terrasoft.DataValueType.COLLECTION,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * ###### ######### ### ##########.
				 */
				entitiesList: {
					"dataValueType": Terrasoft.DataValueType.COLLECTION,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				channel: {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				* True, #### ######## ########## #########.
				*/
				isPosting: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				* True, #### ###### ########### ##### ######### ######.
				*/
				showNewSocialMessagesVisible: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				* ########## ##### #########.
				* @type {Number}
				*/
				newSocialMessagesCount: {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 0
				},

				/**
				 * True, #### ####### ########## ###### ###### #######.
				 * @type {Boolean}
				 */
				ChannelEditEnabled: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * True, #### ####### ########## ###### ###### #####.
				 * @type {Boolean}
				 */
				ChannelEditVisible: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * True, #### ####### ########## ###### ###### #######.
				 * @type {Boolean}
				 */
				ChannelEditFocused: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				* ############# ##### ########.
				*/
				entitySchemaUId: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ESNConstants.ESN.SocialChannelSchemaUId
				},

				/**
				* ######## ##### ########.
				* @type {String}
				*/
				entitySchemaName: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": "SocialChannel"
				},

				/**
				 *
				 */
				postPublishActionsVisible: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				* True, #### ######### ######### ##### ######### # ###### ###### #####.
				* @type {Boolean}
				*/
				ESNFeedHeaderVisible: {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				},

				/**
				* ############# ###### ############ # #######.
				* @type {String}
				*/
				ESNSectionSandboxId: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": "SectionModuleV2_ESNFeedSectionV2_ESNFeed"
				},

				/**
				* ############# ###### ############ # ################ ######.
				* @type {String}
				*/
				ESNRightPanelSandboxId: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": "ViewModule_RightSideBarModule_ESNFeedModule"
				},

				/**
				* ########## #########, ########### #####.
				* @private
				*/
				InitMessageCount: {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 15
				},

				/**
				* ########## #########, ########### ### #########.
				* @private
				*/
				NextMessageCount: {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 15
				},

				/**
				* ###### ####### # #########
				* "###### ############ # ###### ## ######### ##### ########### #########", ######### ############
				* ### ##########.
				* @type {Object}
				*/
				ColumnList: {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				* ###### ####### # ######### "### ############ ##### ########### #########",
				* ######### ############ ### ##########.
				* @type {Object}
				*/
				SharedColumnList: {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				* ###### ############### ####### # ######### "### ############ ##### ########### #########",
				* ######### ############ ### ##########.
				* @type {Array}
				*/
				SharedColumnIdList: {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				* ###### ############### # ######### "###### ############ # ###### ## ######### ##### ###########
				* #########", ######### ############ ### ##########.
				* @type {Array}
				*/
				ColumnIdList: {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				* ############# ######### (########) #########.
				* @type {String}
				*/
				ActiveSocialMessageId: {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				* ######## ########## #########.
				* @type {Array}
				* @private
				*/
				SocialMessageSortColumns: {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": [
						"CreatedOn",
						"LastActionOn"
					]
				},

				/**
				* Master record identifier.
				* @type {String}
				*/
				EntityId: {
					"dataValueType": Terrasoft.DataValueType.GUID,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},

			methods: {
				//region Methods: Private

				/**
				 * ############## ######### ###### #############.
				 * @private
				 */
				initCollections: function() {
					this.initCollection("SocialMessages");
					this.initCollection("channels");
					this.initCollection("entitiesList");
				},

				/**
				 * ############## ######### ###### #############.
				 * @private
				 * @param {String} collectionName ######## #########.
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
				 * ####### ########## ####### # #####.
				 * ###### ########### ## ######## ## ########.
				 * @private
				 * @param {Object} list ###### #######.
				 * @param {String} keyA ###### #### #### ### #########.
				 * @param {String} keyB ###### #### #### ### #########.
				 * @return {Number} ########## -1, #### ######## ## ####### ##### ######, ### ## #######;
				 * ########## 1, #### displayValue ## ####### ##### ######, ### ## #######;
				 * ########## 0, #### ######## #####.
				 */
				sortByDisplayValue: function(list, keyA, keyB) {
					var itemA = list[keyA];
					var itemB = list[keyB];
					if (itemA.displayValue > itemB.displayValue) {
						return -1;
					}
					if (itemA.displayValue < itemB.displayValue) {
						return 1;
					}
					return 0;
				},

				/**
				 * ###### ####### ############, ####### ###### ######### #####,
				 * # ######## ############# #########.
				 * @private
				 */
				clearUserProfile: function() {
					var profileKey = this.getProfileKey();
					this.Terrasoft.saveUserProfile(profileKey, undefined, false);
				},

				/**
				 * ######### ## #####, ####### #### ############ ## ###### #######.
				 * @private
				 * @param {Array} channels ###### #######.
				 * @param {Object} [channel] #####, ###### ######## ##########.
				 */
				updatePosts: function(channels, channel) {
					var posts = this.get("SocialMessages");
					var filterPosts = posts.filterByFn(this.postsFilterFn.bind(this, channels), this);
					if (channel) {
						filterPosts.each(function(post) {
							delete post.EntitiesCache[channel.channelId];
							var entity = this.Terrasoft.deepClone(post.get("Entity"));
							entity.displayValue = channel.channelName;
							if (channel.primaryImageValue) {
								entity.primaryImageValue = channel.primaryImageValue;
							}
							post.set("Entity", entity);
						}, this);
					} else {
						filterPosts.each(function(post) {
							post.set("Entity", undefined);
						}, this);
					}
				},

				/**
				 * ######### ##### ## ###### #######, ####### #### #######.
				 * @private
				 * @param {Array} channels ###### #######.
				 * @param {Terrasoft.SocialMessageViewModel} post #### # #####.
				 * @return {Boolean} True, #### #### ### ########### # ##### ##
				 * #######, ##### False.
				 */
				postsFilterFn: function(channels, post) {
					var channel = post.get("Entity");
					return !this.Ext.isEmpty(channel) && this.Ext.Array.contains(channels, channel.value);
				},

				/**
				 * ############ ####### ########## ######## ######, # ####### ######## ######.
				 * @private
				 */
				onCardSaved: function() {
					var recordInfo = this.getRecordInfo();
					this.initCurrentChannel(recordInfo);
					this.publishSocialMessage();
				},

				/**
				 * ############# ######## ## #########.
				 * @private
				 * @param {Object} recordInfo ######### # ######, ### ####### ############ #####.
				 */
				setDefaultValues: function(recordInfo) {
					this.set("ChannelEditVisible", false);
					this.set("ActiveSocialMessageId", "");
					if (!recordInfo) {
						return;
					}
					var channelId = recordInfo.channelId;
					this.$EntityId = channelId;
					var publisherRightKind = recordInfo.publisherRightKind;
					var channelFilter =
						this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL, "EntityId",
							channelId);
					this.set("channelFilter", channelFilter);
					this.set("entitySchemaUId", recordInfo.entitySchemaUId);
					this.set("entitySchemaName", recordInfo.entitySchemaName);
					this.set("sortColumnLastValue", null);
					if (!publisherRightKind && (recordInfo.entitySchemaName === "SocialChannel")) {
						RightUtilities.checkCanEdit({
							schemaName: recordInfo.entitySchemaName,
							primaryColumnValue: channelId,
							isNew: false
						}, function(result) {
							if (!this.Ext.isEmpty(result)) {
								this.setESNFeedHeaderVisible(false);
							} else {
								this.setESNFeedHeaderVisible(true);
							}
						}, this);
					} else {
						this.setESNFeedHeaderVisible(true);
					}
				},

				/**
				 * ############## ######## ######## "canDeleteAllMessageComment".
				 * @private
				 */
				initCanDeleteAllMessageComment: function() {
					var config = {
						operation: "CanDeleteAllMessageComment"
					};
					RightUtilities.checkCanExecuteOperation(config, function(result) {
						this.set("canDeleteAllMessageComment", result);
					}, this);
				},

				/**
				 * ############## ######## ######## ######.
				 * @private
				 * @param {Object} recordInfo ########## # ######.
				 * @param {Object} recordInfo.channelId ############# ######.
				 */
				initCurrentChannel: function(recordInfo) {
					var channelId = recordInfo ? recordInfo.channelId : null;
					if (!channelId) {
						this.loadProfile(function(profile) {
							if (!profile) {
								return;
							}
							this.set("SocialChannel", profile.channel);
						}, this);
					} else {
						this.setSocialChannel(recordInfo);
					}
				},

				/**
				 * ######### ####### ##### # #######.
				 * @private
				 */
				saveCurrentChannelToProfile: function() {
					var channel = this.get("SocialChannel");
					if (!channel) {
						return;
					}
					var recordInfo = this.getRecordInfo();
					if (recordInfo && recordInfo.channelId) {
						return;
					}
					var profileKey = this.getProfileKey();
					this.Terrasoft.saveUserProfile(profileKey, {
						channel: channel
					}, false);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
				 * @overridden
				 */
				getProfileKey: function() {
					var profileKey = this.callParent(arguments);
					if (profileKey) {
						profileKey += "_";
					}
					profileKey += this.name;
					return profileKey;
				},

				/**
				 * Deprecated method for profile loading.
				 * @deprecated
				 * @private
				 */
				loadProfile: function(callback, scope) {
					var obsoleteMessage = this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage;
					this.log(Ext.String.format(obsoleteMessage, "loadProfile", "getProfile"));
					if (Ext.isFunction(callback)) {
						callback.call(scope, this.getProfile());
					}
				},

				/**
				 * Initializes list of channels available for publication to the user.
				 * @private
				 */
				initChannelsList: function() {
					var esq = this.getSocialChannelSelectQuery();
					esq.getEntityCollection(function(response) {
						if (!response.success) {
							return;
						}
						var list = this.get("channels");
						list.clear();
						var columnIdList = [];
						var sharedColumnIdList = [];
						var columnList = {};
						var sharedColumnList = {};
						this.set("ColumnIdList", columnIdList);
						this.set("SharedColumnIdList", sharedColumnIdList);
						this.set("ColumnList", columnList);
						this.set("SharedColumnList", sharedColumnList);
						var items = response.collection.getItems();
						this.Terrasoft.each(items, function(item) {
							if (!item.get("PublisherRightKind")) {
								this.addChannelToChannelList(columnList, item);
								columnIdList.push(item.get("value"));
							} else {
								this.addChannelToChannelList(sharedColumnList, item);
								sharedColumnIdList.push(item.get("value"));
							}
						}, this);
						RightUtilities.checkCanReadRecords({
							schemaName: "SocialChannel",
							primaryColumnValues: sharedColumnIdList
						}, this.loadChannelListCallback.bind(this, true), this);
					}, this);
				},

				/**
				 * ######### ######, ######### ############.
				 * @private
				 * @param {Boolean} loadImmediately ######### ## ###### ####### #####.
				 * @param {Array} result ###### #######.
				 */
				loadChannelListCallback: function(loadImmediately, result) {
					var items = result;
					var list = this.get("channels");
					var sharedResultColumnList = {};
					var resultColumnList = {};
					this.Terrasoft.each(items, function(item) {
						var itemKey = item.Key;
						var sharedColumnList = this.get("SharedColumnList");
						if (item.Value && sharedColumnList[itemKey]) {
							sharedResultColumnList[itemKey] = sharedColumnList[itemKey];
						}
					}, this);
					RightUtilities.checkCanEditRecords({
						schemaName: "SocialChannel",
						primaryColumnValues: this.get("ColumnIdList")
					}, function(result) {
						items = result;
						this.Terrasoft.each(items, function(item) {
							var itemKey = item.Key;
							var columnList = this.get("ColumnList");
							if (item.Value && columnList[itemKey]) {
								resultColumnList[itemKey] = columnList[itemKey];
							}
						}, this);
						resultColumnList = this.mergeObjectProperties(resultColumnList, sharedResultColumnList);
						if (loadImmediately) {
							list.loadAll(resultColumnList);
						}
						this.set("resultChannelColumnList", resultColumnList);
						var esnRightPanelSandboxId = this.get("ESNRightPanelSandboxId");
						var esnSectionSandboxId = this.get("ESNSectionSandboxId");
						var sandboxId = this.sandbox.id;
						if (sandboxId === esnRightPanelSandboxId || sandboxId === esnSectionSandboxId) {
							this.set("ChannelEditEnabled", true);
						}
					}, this);
				},

				/**
				 * ######### ############# ########### ####### ########.
				 * @private
				 * @return {Object} ######, ########## #### ######## + ######## #### ######### ########## #
				 * ########## ########.
				 */
				mergeObjectProperties: function() {
					var objects = [].slice.call(arguments, 1);
					var resultObject = arguments[0];
					this.Terrasoft.each(objects, function(obj) {
						for (var prop in obj) {
							if (obj.hasOwnProperty(prop) && !resultObject[prop]) {
								resultObject[prop] = obj[prop];
							}
						}
					}, this);
					return resultObject;
				},

				/**
				 * Sets current channel.
				 * @private
				 * @param {Object} recordInfo.
				 */
				setSocialChannel: function(recordInfo) {
					this.set("SocialChannel", {
						value: recordInfo.channelId,
						displayValue: recordInfo.channelName
					});
				},

				/**
				 * Update social message handler.
				 * @private
				 * @param {Object} config Configuration object.
				 */
				onUpdateSocialMessageReceived: function(config) {
					var posts = this.get("SocialMessages");
					if (!posts.contains(config.response.Id)) {
						return;
					}
					this.loadSocialMessages(config.loadSocialMessagesConfig, config.loadSocialMessagesCallback, this);
				},

				/**
				 * Insert social message handler.
				 * @private
				 * @param {Object} config Configuration object.
				 * @param {Object} config.response Social message response.
				 * @param {Object} [config.receivedMessage] Received message.
				 */
				onInsertSocialMessageReceived: function(config) {
					var receivedMessage = config.receivedMessage || this.Ext.decode(config.response.Body);
					var channelFilter = this.get("channelFilter");
					if (!channelFilter || receivedMessage.channelId === channelFilter.rightExpression.parameterValue) {
						if (this.Terrasoft.SysValue.CURRENT_USER.value === receivedMessage.sysAdminUnitId) {
							this.loadSocialMessages(config.loadSocialMessagesConfig, config.loadSocialMessagesCallback,
								this);
						} else {
							this.showLoadNewMessageButton();
						}
					}
				},

				/**
				 * Shows "Show X new message" button.
				 * @private
				 */
				showLoadNewMessageButton: function() {
					var newSocialMessagesCount = this.get("newSocialMessagesCount");
					this.set("newSocialMessagesCount", newSocialMessagesCount + 1);
					this.set("showNewSocialMessagesVisible", true);
					var sandboxId = this.sandbox.id;
					var postContainer = this.Ext.get(sandboxId + "_postPublish-container");
					if (!postContainer) {
						return;
					}
					if (window.scrollY > postContainer.getHeight()) {
						var newMessageContainer = this.Ext.get(sandboxId + "_showNewMessage-container");
						newMessageContainer.addCls("showNewMessageContainer-scroll");
						var newMsgPaddingContainer = this.Ext.get(this.get("ESNSectionSandboxId") +
							"_showNewMessagePadding-container");
						newMsgPaddingContainer.addCls("showNewMessagePadding-scroll");
					} else if (this.getIsRightPanel()) {
						var postList = Ext.get(sandboxId + "_postList-container");
						postList.addCls("showNewMessageContainerTop");
						if (this.get("ChannelEditVisible")) {
							postList.addCls("headerWithChannelListAndMessageTop");
						}
					}
				},

				/**
				 * Ask the user to continue downloading messages.
				 * @private
				 * @param {Number} count Count.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 */
				promtLoadMoreMessages: function(count, callback, scope) {
					var template = this.get("Resources.Strings.MaxMessagesNumberPerSearchIterationReached");
					var message = this.Ext.String.format(template, count);
					this.showConfirmationDialog(message, function(result) {
						if (result !== this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							return;
						}
						callback.call(scope);
					}, ["yes", "no"]);
				},

				/**
				 * Handles social message insert.
				 * @private
				 * @param {Terrasoft.BaseViewModel} socialMessage Social message.
				 */
				socialMessageInserted: function(socialMessage) {
					this.clearSocialMessageText();
					var posts = this.get("SocialMessages");
					var insertedPostId = socialMessage.get("Id");
					if (!posts.contains(insertedPostId)) {
						posts.insert(0, insertedPostId, socialMessage);
					}
				},

				/**
				 * Handles social message load.
				 * @private
				 * @param {Terrasoft.BaseViewModel} socialMessage Social message.
				 */
				loadSocialMessagesCallback: function(socialMessage) {
					var posts = this.get("SocialMessages");
					var editedPostId = socialMessage.get("Id");
					if (!posts.contains(editedPostId)) {
						this.loadInitial();
						return;
					}
					var editedPost = posts.get(editedPostId);
					editedPost.setColumnValues(socialMessage);
				},

				/**
				 * Handles social message delete.
				 * ########## ########## ######## ######## #########.
				 * @private
				 */
				onDeleteRecordCallback: function() {
					var postToDeleteId = this.get("Id");
					if (this.Ext.isEmpty(this.get("Parent"))) {
						var posts = this.get("SocialMessages");
						posts.removeByKey(postToDeleteId);
					}
				},

				/**
				 * ############# ######## "focused" ######## ##### #########.
				 * @private
				 */
				initPostMessageFocusedState: function() {
					if (this.sandbox.id === this.get("ESNSectionSandboxId")) {
						var state = this.sandbox.publish("GetHistoryState");
						if (state && state.state && state.state.focusAddPost === true) {
							this.onSocialMessageEditFocus();
						}
					}
				},

				/**
				 * ####### ########## #########.
				 * @private
				 */
				onLoadNext: function() {
					setTimeout(function() {
						var channelFilter = this.get("channelFilter");
						var nextMessageCount = this.get("NextMessageCount");
						if (channelFilter) {
							this.loadPosts(nextMessageCount, channelFilter);
						} else {
							this.loadPosts(nextMessageCount);
						}
					}.bind(this), 10);
				},

				/**
				 * ########## ########### ########## ######.
				 * @private
				 * return {String}
				 */
				getChannelImage: function() {
					var channel = this.get("SocialChannel");
					return this.Ext.isEmpty(channel)
						? this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Strings.NoChannel"))
						: this.getImageValue(channel);
				},

				/**
				 * ######### ##### ############ ## ########/######### #######.
				 * @private
				 */
				onChannelPrepareList: function() {
					RightUtilities.getSchemaEditRights({schemaName: "SocialChannel"}, function(result) {
						if (!this.Ext.isEmpty(result)) {
							RightUtilities.getSchemaReadRights({
								schemaName: "SocialChannel"
							}, function(result) {
								if (this.Ext.isEmpty(result)) {
									var filter =
										this.Terrasoft.createColumnFilterWithParameter(
											Terrasoft.ComparisonType.EQUAL, "PublisherRightKind", 1);
									this.prepareChannels(this, filter);
								}
							}, this);
						} else {
							this.prepareChannels();
						}
					}, this);
				},

				/**
				 * ########## ######## ######.
				 * @private
				 * @return {String} ######## ######.
				 */
				getChannelText: function() {
					var channel = this.get("SocialChannel");
					return !this.Ext.isEmpty(channel)
						? channel.displayValue
						: this.get("Resources.Strings.SelectChannelHint");
				},

				/**
				 * ######### #########.
				 * @private
				 */
				publishSocialMessage: function() {
					if (!this.validateNewSocialMessageData()) {
						return;
					}
					var socialMessageData = this.getNewSocialMessageData();
					this.insertSocialMessage(socialMessageData, this.socialMessageInserted, this);
					this.updateSubscribeAction();
					this.saveCurrentChannelToProfile();
				},

				/**
				 * ########## ########## # ##### #########.
				 * @private
				 * @return {Object} ########## # ##### #########.
				 */
				getNewSocialMessageData: function() {
					var socialChannel = this.get("SocialChannel");
					return {
						entitySchemaId: this.get("entitySchemaUId"),
						entityId: socialChannel.value,
						message: this.get("SocialMessageText"),
						sandbox: this.sandbox
					};
				},

				/**
				 * ######### ########## # ######## ## ####### ###### ## ########, # ####### ######## ######.
				 * @private
				 */
				updateSubscribeAction: function() {
					this.sandbox.publish("UpdateSubscribeAction", {
						isSubscribed: true
					}, [this.sandbox.id.substring(0, this.sandbox.id.lastIndexOf("_"))]);
				},

				/**
				 * ####### ##### #########.
				 * @private
				 */
				clearSocialMessageText: function() {
					this.set("SocialMessageText", "");
				},

				/**
				 * ############ ####### ## ###### "############".
				 */
				onPostPublishClick: function() {
					var isNewRecord = this.getIsNewRecord();
					if (!isNewRecord) {
						this.publishSocialMessage();
					} else {
						var config = {
							scope: this,
							isSilent: true,
							subscribeOwner: false,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", config, [this.sandbox.id]);
					}
				},

				/**
				 * ############ ####### "focus" ######## ##########, ####### ###### ######## ############ #########.
				 * @private
				 */
				onSocialMessageEditFocus: function() {
					this.set("ChannelEditVisible", true);
					this.set("postPublishActionsVisible", true);
				},

				/**
				 * ############ ####### "blur" ######## ##########, ####### ###### ######## ############ #########.
				 * @private
				 */
				onSocialMessageEditBlur: function() {
					var setDataTask = new Ext.util.DelayedTask(function() {
						var postMessage = this.get("SocialMessageText");
						var channelEditFocused = this.get("ChannelEditFocused");
						var isValid = this.validate();
						if (postMessage || channelEditFocused || !isValid) {
							return;
						}
						this.set("ChannelEditVisible", false);
						this.set("postPublishActionsVisible", false);
					}, this);
					setDataTask.delay(300);
				},

				/**
				 * ############ ####### "blur" ######## ##########, ####### ###### ######## ######.
				 * @private
				 */
				onChannelEditBlur: function() {
					var postMessage = this.get("SocialMessageText");
					var channelEditFocused = this.get("ChannelEditFocused");
					var isValid = this.validate();
					if (postMessage || channelEditFocused || !isValid) {
						return;
					}
					this.set("ChannelEditVisible", false);
					this.set("postPublishActionsVisible", false);
				},

				/**
				 * ######### ########## #########.
				 * @private
				 */
				onSortClick: function() {
					this.set("sortColumnLastValue", null);
					this.get("SocialMessages").clear();
					var channelFilter = this.get("channelFilter");
					this.loadPosts(this.get("InitMessageCount"), channelFilter);
				},

				/**
				 * Gets new messages count.
				 * @private
				 */
				getShowNewMessageText: function() {
					var newSocialMessagesCount = this.get("newSocialMessagesCount");
					if (newSocialMessagesCount === 0) {
						this.set("showNewSocialMessagesVisible", false);
					} else if (newSocialMessagesCount > 1) {
						return this.Ext.String.format(this.get("Resources.Strings.ShowMoreThanOneNewSocialMessages"),
							newSocialMessagesCount);
					} else {
						return this.get("Resources.Strings.ShowNewSocialMessage");
					}
				},

				/**
				 * New messages button event handler.
				 * @private
				 */
				onShowNewMessageClick: function() {
					this.set("sortColumnName", this.get("SocialMessageSortColumns")[0]);
					this.set("sortColumnLastValue", null);
					this.set("newSocialMessagesCount", 0);
					this.set("showNewSocialMessagesVisible", false);
					this.get("SocialMessages").clear();
					var newMessageContainer = this.Ext.get(this.get("ESNRightPanelSandboxId") + "_postList-container");
					if (newMessageContainer && this.getIsRightPanel()) {
						newMessageContainer.removeCls("showNewMessageContainerTop");
						newMessageContainer.removeCls("headerWithChannelListAndMessageTop");
					}
					var channelFilter = this.get("channelFilter");
					var initMessageCount = this.get("InitMessageCount");
					if (channelFilter) {
						this.loadPosts(initMessageCount, channelFilter);
					} else {
						this.loadPosts(initMessageCount);
					}
					this.Ext.getBody().dom.scrollTop = 0;
					this.Ext.getDoc().dom.documentElement.scrollTop = 0;
				},

				/**
				 * ####### ESQ ###### ## ####### SocialChannel # ##### ######## ############# ## ######## ######.
				 * @private
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				getSocialChannelSelectQuery: function() {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SocialChannel"
					});
					esq.addColumn("PublisherRightKind");
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_IMAGE_COLUMN, "primaryImageValue");
					var displayColumn = esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN,
						"displayValue");
					displayColumn.orderPosition = 1;
					displayColumn.orderDirection = this.Terrasoft.OrderDirection.DESC;
					return esq;
				},

				/**
				 * Loads social messages.
				 * @private
				 * @param {Number} rowCount Messages count.
				 * @param {Terrasoft.BaseFilter} filter Messages filter.
				 */
				loadPosts: function(rowCount, filter) {
					var isSkipLoadPosts = this._getIsSkipLoadPosts();
					if (isSkipLoadPosts) {
						return;
					}
					performanceManager.start(this.sandbox.id + "_LoadPosts");
					var config = {
						rowCount: rowCount,
						filter: filter
					};
					this.set("maskVisible", true);
					this.getNextMessages(config, function(messages) {
						this.set("maskVisible", false);
						this.get("SocialMessages").loadAll(messages);
						this.hideBodyMask();
						performanceManager.stop(this.sandbox.id + "_LoadPosts");
					}, this);
				},

				/**
				 * ######### ########.
				 * @private
				 */
				loadInitialSocialMessages: function() {
					var activeSocialMessageId = this.activeSocialMessageId;
					if (!activeSocialMessageId) {
						this.loadInitial();
					} else {
						this.loadUntil(activeSocialMessageId);
					}
				},

				/**
				 * ######### ######### ########## #########.
				 * @private
				 */
				loadInitial: function() {
					var channelFilter = this.get("channelFilter");
					var initMessageCount = this.get("InitMessageCount");
					this.loadPosts(initMessageCount, channelFilter);
				},

				/**
				 * ######### ### ######### ## ##########.
				 * @private
				 * @param {String} messageId
				 */
				loadUntil: function(messageId) {
					var filter = this.get("channelFilter");
					var messagesNumberEverySearchIteration = this.get("MessagesNumberEverySearchIteration");
					var config = {
						rowCount: messagesNumberEverySearchIteration,
						filter: filter
					};
					this.set("IsContainerListAsync", false);
					this.showBodyMask();
					this.set("maskVisible", true);
					this.getNextMessages(config, function(messages) {
						this.set("maskVisible", false);
						var posts = this.get("SocialMessages");
						posts.loadAll(messages);
						this.set("IsContainerListAsync", true);
						this.hideBodyMask();
						if (posts.contains(messageId)) {
							this.set("ActiveSocialMessageId", messageId);
						} else {
							var messagesCount = messages.getCount();
							if (messagesCount > 0) {
								this.promtLoadMoreMessages(messagesCount, function() {
									this.loadUntil(messageId);
								}, this);
							}
						}
					}, this);
				},

				/**
				 * ############# ######## ######## "#########" ######## ##### #########.
				 * @private
				 */
				setESNFeedHeaderVisible: function(value) {
					this.set("ESNFeedHeaderVisible", value);
				},

				/**
				 * Gets role subscription filter.
				 * @private
				 * @param {String} userId User id.
				 * @return {Terrasoft.Filter}
				 */
				getRoleSubscriptionFilter: function(userId) {
					var path = "[SocialSubscription:EntityId:EntityId].[SysUserInRole:SysRole:SysAdminUnit].SysUser";
					return this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, path, userId);
				},

				/**
				 * Gets user subscription filter.
				 * @private
				 * @param {String} userId User id.
				 * @return {Terrasoft.Filter}
				 */
				getUserSubscriptionFilter: function(userId) {
					var path = "[SocialSubscription:EntityId:EntityId].[SysUserInRole:SysUser:SysAdminUnit].SysUser";
					return this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, path, userId);
				},

				/**
				 * Gets unsubscription filter.
				 * @private
				 * @param {String} userId User id.
				 * @return {Terrasoft.FilterGroup}
				 */
				getUserUnsubscriptionFilter: function(userId) {
					var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					var path = "[SocialUnsubscription:EntityId:EntityId].SysAdminUnit";
					var filter = this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, path,
						userId);
					filterGroup.addItem(filter);
					return this.Terrasoft.createNotExistsFilter(path, filterGroup);
				},

				/**
				 * ########## ###### ######## ######### #######, ## ####### ######## ####### ############ ### ######,
				 * # ####### ## ###### # ###### #######.
				 * @private
				 * @return {Terrasoft.FilterGroup} ###### ######## ######### #######.
				 */
				getCurrentUserPostsFilter: function() {
					var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					var currentUserId = this.Terrasoft.SysValue.CURRENT_USER.value;
					var subFilterGroup = this.Ext.create("Terrasoft.FilterGroup");
					subFilterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					var roleSubscriptionFilter = this.getRoleSubscriptionFilter(currentUserId);
					subFilterGroup.addItem(roleSubscriptionFilter);
					var userSubscriptionFilter = this.getUserSubscriptionFilter(currentUserId);
					subFilterGroup.addItem(userSubscriptionFilter);
					filterGroup.addItem(subFilterGroup);
					var unsubscriptionFilter = this.getUserUnsubscriptionFilter(currentUserId);
					filterGroup.addItem(unsubscriptionFilter);
					return filterGroup;
				},

				/**
				 * ########## ######## ####### "##### #########".
				 * @private
				 * @return {Object} ######### #########.
				 */
				validateSocialMessageText: function() {
					var result = {
						isValid: true,
						invalidMessage: ""
					};
					var messageText = this.get("SocialMessageText");
					if (messageText.length === 0) {
						result.isValid = false;
						result.invalidMessage = this.get("Resources.Strings.WritePostMessage");
					}
					return result;
				},

				/**
				 * ########## ######## ####### "#####".
				 * @private
				 * @return {Object} ######### #########.
				 */
				validateChannel: function() {
					var result = {
						isValid: true,
						invalidMessage: ""
					};
					var channel = this.get("SocialChannel");
					if (this.Ext.isEmpty(channel)) {
						result.isValid = false;
						result.invalidMessage = this.get("Resources.Strings.SelectChannelMessage");
					}
					return result;
				},

				/**
				 * ########## ######## DOM-######## data-item-marker ######## ########## ############## ######.
				 * @private
				 * @return {String} ######## DOM-######## data-item-marker ######## ########## ############## ######.
				 */
				getSocialMessageEditMarkerValue: function() {
					var caption = this.get("Resources.Strings.SelectChannelHint");
					return "SocialChannel " + caption;
				},

				/**
				 * Return is record new.
				 * @private
				 * @return {Boolean} True - current record is new.
				 */
				getIsNewRecord: function() {
					var cardState = this._getCardState();
					return this._getIsAddNewRecord(cardState);
				},

				/**
				 * Return card state.
				 * @private
				 * @return {Object} cart state.
				 */
				_getCardState: function() {
					return this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
				},

				/**
				 * Return is record new.
				 * @param {Object} cardState cart state.
				 * @private
				 * @return {Boolean} True - current record is new.
				 */
				_getIsAddNewRecord: function(cardState) {
					if (!cardState) {
						return false;
					}
					return cardState.state === ConfigurationEnums.CardStateV2.ADD ||
							cardState.state === ConfigurationEnums.CardStateV2.COPY;
				},

				/**
				 * Is need to skip to load posts.
				 * @private
				 * @return {Boolean} True - need to skip.
				 */
				_getIsSkipLoadPosts: function() {
					const cardState = this._getCardState();
					if (cardState) {
						const isNewRecord = this._getIsAddNewRecord(cardState);
						if (isNewRecord) {
							return true;
						}
						if (cardState.state === ConfigurationEnums.CardStateV2.EDIT) {
							const recordInfo = this.getRecordInfo();
							if (!recordInfo || !recordInfo.channelId) {
								return true;
							}
						}
					}
					return false;
				},

				/**
				 * ########## ########### ### #### ###### ######.
				 * @private
				 * @return {String} ########### ### #### ###### ######.
				 */
				getSocialChannelEditPlaceholder: function() {
					var isNewRecord = this.getIsNewRecord();
					var localizableStringName = isNewRecord ? "CurrentChannelHint" : "SelectChannelHint";
					return this.Ext.String.format(this.get("Resources.Strings." + localizableStringName));
				},

				//endregion

				//region Methods: Protected

				/**
				 * ############# ####### #####.
				 * @protected
				 * @param {Object} channelInfo ########## # ####### ######.
				 * @param {String} channelInfo.primaryColumnValue ############# ######## ######.
				 * @param {String} channelInfo.primaryDisplayColumnValue ######## ######## ######.
				 */
				onChannelInitialized: function(channelInfo) {
					var recordInfo = {
						channelId: channelInfo.primaryColumnValue,
						channelName: channelInfo.primaryDisplayColumnValue
					};
					this.setSocialChannel(recordInfo);
				},

				/**
				 * ######### ### ######### ##### # ###### ####### # #####.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} result #####, ####### ##### ######## ### ########.
				 */
				onChannelSaved: function(result) {
					var value = result.get("value");
					var columnList = this.get("ColumnList");
					var columnIdList = this.get("ColumnIdList");
					var sharedColumnList = this.get("SharedColumnList");
					var sharedColumnIdList = this.get("SharedColumnIdList");
					if (!result.get("isNew")) {
						delete columnList[value];
						this.Ext.Array.remove(columnIdList, value);
						delete sharedColumnList[value];
						this.Ext.Array.remove(sharedColumnIdList, value);
						this.updateChannel(result);
					}
					if (!result.get("PublisherRightKind")) {
						if (!this.Ext.Array.contains(columnIdList, value)) {
							this.addChannelToChannelList(columnList, result);
							columnIdList.push(value);
							columnIdList.sort(this.sortByDisplayValue.bind(this, columnList));
						}
					} else {
						if (!this.Ext.Array.contains(sharedColumnIdList, value)) {
							this.addChannelToChannelList(sharedColumnList, result);
							sharedColumnIdList.push(value);
							sharedColumnIdList.sort(this.sortByDisplayValue.bind(this, sharedColumnList));
						}
					}
					RightUtilities.checkCanReadRecords({
						schemaName: "SocialChannel",
						primaryColumnValues: sharedColumnIdList
					}, this.loadChannelListCallback.bind(this, false), this);
				},

				/**
				 * ######### #####.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} result #####, ####### ##### ########.
				 */
				updateChannel: function(result) {
					var value = result.get("value");
					var currentChannel = this.get("SocialChannel");
					var editChannel = {
						channelId: value,
						channelName: result.get("displayValue"),
						primaryImageValue: result.get("primaryImageValue")
					};
					if (currentChannel && currentChannel.value === value) {
						this.setSocialChannel(editChannel);
						this.saveCurrentChannelToProfile();
					}
					this.updatePosts([value], editChannel);
				},

				/**
				 * ####### ###### ## ###### ####### #####.
				 * @protected
				 * @param {Object} result
				 * @param {Array} result.deletedItems ###### ############### ######### #######.
				 */
				onRemoveChannel: function(result) {
					var channels = this.get("resultChannelColumnList");
					var columnList = this.get("ColumnList");
					var columnIdList = this.get("ColumnIdList");
					var sharedColumnList = this.get("SharedColumnList");
					var sharedColumnIdList = this.get("SharedColumnIdList");
					var currentChannel = this.get("SocialChannel");
					var deletedChannels = result.deletedItems;
					if (currentChannel && this.Ext.Array.contains(deletedChannels, currentChannel.value)) {
						this.set("SocialChannel", null);
						this.clearUserProfile();
					}
					deletedChannels.forEach(function(channelId) {
						delete columnList[channelId];
						this.Ext.Array.remove(columnIdList, channelId);
						delete sharedColumnList[channelId];
						this.Ext.Array.remove(sharedColumnIdList, channelId);
						delete channels[channelId];
					});
					this.updatePosts(deletedChannels);
				},

				/**
				 * ########## ################ ############ ######.
				 * @protected
				 * @param {Object} itemConfig ############ ########
				 * @param {Terrasoft.BaseViewModel} item ###### ####### #########
				 */
				getItemViewConfig: function(itemConfig, item) {
					var entitySchemaUId = item.get("EntitySchemaUId");
					var color = item.get("Color");
					var entityColor = this.getEntityColor(entitySchemaUId, color);
					var borderColorStyle = {
						wrapStyles: {
							"border-left-color": entityColor
						}
					};
					itemConfig.config = ESNFeedConfig.postConfig;
					var postWrapper = itemConfig.config.items[0];
					if (postWrapper.hasOwnProperty("styles")) {
						postWrapper.styles = Ext.Object.merge(postWrapper.styles, borderColorStyle);
					} else {
						postWrapper.styles = borderColorStyle;
					}
					var commentWrapper = itemConfig.config.items[1];
					if (commentWrapper.hasOwnProperty("styles")) {
						commentWrapper.styles = Ext.Object.merge(commentWrapper.styles, borderColorStyle);
					} else {
						commentWrapper.styles = borderColorStyle;
					}
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					performanceManager.start(this.sandbox.id + "_ESNInit");
					this.callParent([function() {
						this.mixins.SocialFeedUtilities.init.call(this);
						this.mixins.SocialMentionUtilities.init.call(this);
						this.initCollections();
						this.initChannelsList();
						this.subscribeSandboxEvents();
						this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
							this.onSocialMessageReceived, this);
						performanceManager.stop(this.sandbox.id + "_ESNInit");
						callback.call(scope);
					}, this]);
				},

				/**
				 * Gets record info.
				 * @return {Object}
				 */
				getRecordInfo: function() {
					return this.sandbox.publish("GetRecordInfo", null, [this.sandbox.id]);
				},

				/**
				 * ############## ###### ############# ### ######### ######## ######, # ####### ######## ######.
				 * @param {Object} config ######### ########.
				 * @param {Object} config.activeSocialMessageId ############# #########, ####### ########## #######
				 * ########.
				 */
				initModuleViewModel: function(config) {
					this.activeSocialMessageId = config.activeSocialMessageId;
					var recordInfo = this.getRecordInfo();
					this.setDefaultValues(recordInfo);
					this.initCurrentChannel(recordInfo);
					this.init(this.loadInitialSocialMessages, this);
				},

				/**
				 * @inheritdoc
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("InitModuleViewModel", this.initModuleViewModel, this, [this.sandbox.id]);
					this.sandbox.subscribe("CardSaved", this.onCardSaved, this, [this.sandbox.id]);
					this.sandbox.subscribe("EntityInitialized", this.onChannelInitialized, this, [this.sandbox.id]);
					this.sandbox.subscribe("RemoveChannel", this.onRemoveChannel, this);
					this.sandbox.subscribe("ChannelSaved", this.onChannelSaved, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					const recordInfo = this.getRecordInfo();
					this.setDefaultValues(recordInfo);
					this.initCanDeleteAllMessageComment();
					this.initCurrentChannel(recordInfo);
					this.initPostMessageFocusedState();
					const socialMessages = this.get("SocialMessages");
					if (!socialMessages.getCount()) {
						this.initMessagesNumberEverySearchIteration(this.loadInitialSocialMessages, this);
					}
				},

				/**
				 * ############## ########## ######### ### ######## ######.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ###### ####### ######### ######.
				 */
				initMessagesNumberEverySearchIteration: function(callback, scope) {
					this.Terrasoft.SysSettings.querySysSettingsItem("MessagesNumberEverySearchIteration",
						function(value) {
							this.set("MessagesNumberEverySearchIteration", value);
							callback.call(scope);
						}, this);
				},

				/**
				 * ######### ##### # ######.
				 * @param {Object} channelListObject
				 * @param {Terrasoft.BaseViewModel} channel
				 */
				addChannelToChannelList: function(channelListObject, channel) {
					channelListObject[channel.get("value")] = {
						value: channel.get("value"),
						displayValue: channel.get("displayValue"),
						primaryImageValue: channel.get("primaryImageValue")
					};
				},

				/**
				 * ########## ####### ######### ###### #########.
				 * @param {Object} scope
				 * @param {Object} response
				 */
				onSocialMessageReceived: function(scope, response) {
					if (response && response.Header.Sender !== "UpdateSocialMessage") {
						return;
					}
					var receivedMessage = this.Ext.decode(response.Body);
					var loadSocialMessagesConfig = {
						id: response.Id,
						sandbox: this.sandbox,
						canDeleteAllMessageComment: this.get("canDeleteAllMessageComment"),
						onDeleteRecordCallback: this.onDeleteRecordCallback
					};
					var config = {
						response: response,
						loadSocialMessagesConfig: loadSocialMessagesConfig,
						loadSocialMessagesCallback: this.loadSocialMessagesCallback
					};
					switch (receivedMessage.operation) {
						case "insert":
							config.receivedMessage = receivedMessage;
							this.onInsertSocialMessageReceived(config);
							break;
						case "update":
							this.onUpdateSocialMessageReceived(config);
							break;
						case "delete":
							var posts = this.get("SocialMessages");
							posts.removeByKey(response.Id);
							break;
					}
				},

				/**
				 * ######### ######.
				 */
				prepareChannels: function() {
					var list = this.get("channels");
					var resultChannelColumnList = this.get("resultChannelColumnList");
					list.clear();
					list.loadAll(resultChannelColumnList);
				},

				/**
				 * Handles key down event.
				 */
				onKeyDown: Terrasoft.emptyFn,

				/**
				 * Handles Enter key press event.
				 * @param {Ext.EventObjectImpl} e
				 */
				onEnterKeyPressed: function onKeyDown(e) {
					if (e.ctrlKey) {
						this.onPostPublishClick();
					}
				},

				/**
				 * Gets next messages.
				 * @param {Object} config #onfiguration object.
				 * @param {Function} callback Callback.
				 * @param {Object} scope Callback execution scope.
				 */
				getNextMessages: function(config, callback, scope) {
					var viewModel = this;
					var canDeleteAllMessageComment = this.get("canDeleteAllMessageComment");
					var sortColumnName = this.get("sortColumnName");
					this.loadSocialMessages({
						schemaUId: this.$entitySchemaUId,
						entityId: this.$EntityId,
						sortColumnName: sortColumnName,
						sandbox: this.sandbox,
						esqConfig: {
							rowCount: config.rowCount,
							filter: config.filter
						},
						canDeleteAllMessageComment: canDeleteAllMessageComment,
						onDeleteRecordCallback: function() {
							var posts = viewModel.get("SocialMessages");
							var postToDeleteId = this.get("Id");
							posts.removeByKey(postToDeleteId);
						}
					}, function(messages) {
						callback.call(scope || this, messages);
					}, this);
				},

				/**
				 * Gets sort button image configuration.
				 * @return {Object}
				 */
				getSortButtonImageConfig: function() {
					return this.getResourceImageConfig("Resources.Images.Sort");
				},

				/**
				 * Gets show new messages button image configuration.
				 * @return {Object}
				 */
				getShowNewMessagesButtonImageConfig: function() {
					return this.getResourceImageConfig("Resources.Images.More");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("SocialChannel", this.validateChannel);
				},

				/**
				 * ########## ########## # ##### #########.
				 * @return {Boolean} ######### #########.
				 */
				validateNewSocialMessageData: function() {
					var textValidationResult = this.validateSocialMessageText();
					var channelValidationResult = this.validateChannel();
					return (textValidationResult.isValid && channelValidationResult.isValid);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
				 * @overridden
				 */
				destroy: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE, this.onSocialMessageReceived,
						this);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeViewModelEvents
				 * @overridden
				 */
				subscribeViewModelEvents: function() {
					this.callParent(arguments);
				},

				/**
				 * ########## ####### ## ###### ########## ## #### ########## ########.
				 */
				onLastActionOnSortClick: function() {
					this.set("sortColumnName", this.get("SocialMessageSortColumns")[1]);
					this.onSortClick();
				},

				/**
				 * Sort button click handler. Sorts by creation date.
				 */
				onCreatedOnSortClick: function() {
					this.set("sortColumnName", this.get("SocialMessageSortColumns")[0]);
					this.onSortClick();
				}

				//endregion

			},
			diff: [
				//SocialFeed
				{
					"operation": "insert",
					"name": "SocialFeed",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["feedWidth", "social-feed"]
						},
						"maskVisible": {bindTo: "maskVisible"},
						"items": []
					}
				},
				//SocialFeedHeader
				{
					"operation": "insert",
					"name": "SocialFeedHeader",
					"parentName": "SocialFeed",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["font", "social-feed-header"]
						},
						visible: {bindTo: "ESNFeedHeaderVisible"},
						"items": []
					}
				},
				//SocialMessageContainer
				{
					"operation": "insert",
					"name": "SocialMessageContainer",
					"parentName": "SocialFeedHeader",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["wide", "postPublish-container-margin"]
						},
						"items": []
					}
				},
				//SocialMessageEditContainer
				{
					"operation": "insert",
					"name": "SocialMessageEditContainer",
					"parentName": "SocialMessageContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["social-message-edit-container"]
						},
						"items": []
					}
				},
				//SocialMessageEdit
				{
					"operation": "insert",
					"name": "SocialMessageEdit",
					"parentName": "SocialMessageEditContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"className": "Terrasoft.ESNHtmlEdit",
						"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"labelConfig": {
							"visible": false
						},
						"keydown": {bindTo: "onKeyDown"},
						"enterkeypressed": {bindTo: "onEnterKeyPressed"},
						"value": {bindTo: "SocialMessageText"},
						"placeholder": {bindTo: "Resources.Strings.WritePostHint"},
						"classes": {
							htmlEditClass: ["postMessage", "placeholderOpacity", "feedMaxWidth"]
						},
						"focus": {bindTo: "onSocialMessageEditFocus"},
						"focused": {bindTo: "SocialMessageEditFocused"},
						"blur": {bindTo: "onSocialMessageEditBlur"},
						"markerValue": "postMessageMemoEdit",
						"height": "26px",
						"prepareList": {bindTo: "prepareEntitiesExpandableList"},
						"list": {bindTo: "entitiesList"},
						"listViewItemRender": {bindTo: "onEntitiesListViewItemRender"},
						"autoGrow": true,
						"autoGrowMinHeight": 26,
						"customItemAttributes": {
							schema: {
								property: "schemaName",
								attribute: "data-schemaname"
							}
						}
					}
				},
				//SocialFeedSortButton
				{
					"operation": "insert",
					"parentName": "SocialMessageContainer",
					"name": "SocialFeedSortButton",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"markerValue": "sortButton",
						"imageConfig": {"bindTo": "getSortButtonImageConfig"},
						"hint": {"bindTo": "Resources.Strings.ConfigurationButtonHint"},
						"classes": {
							wrapperClass: ["social-feed-sort-button-wrapper"],
							markerClass: ["social-feed-sort-button-marker"],
							imageClass: ["social-feed-sort-button-image"]
						},
						"menu": {
							items: [{
								caption: {bindTo: "Resources.Strings.SortCreatedOn"},
								click: {bindTo: "onCreatedOnSortClick"}
							}, {
								caption: {bindTo: "Resources.Strings.SortLastActionOn"},
								click: {bindTo: "onLastActionOnSortClick"}
							}]
						}
					}
				},
				//SocialMessageActionsContainer
				{
					"operation": "insert",
					"name": "SocialMessageActionsContainer",
					"parentName": "SocialFeedHeader",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["postPublishActions", "feedMaxWidth", "postMessage", "relativePosition"]
						},
						"items": []
					}
				},
				//SocialChannelEditContainer
				{
					"operation": "insert",
					"name": "SocialChannelEditContainer",
					"parentName": "SocialMessageActionsContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["comboBoxWrap"]
						},
						"visible": {bindTo: "postPublishActionsVisible"},
						"items": []
					}
				},
				//PublishButtonContainer
				{
					"operation": "insert",
					"name": "PublishButtonContainer",
					"parentName": "SocialMessageActionsContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["publishButtonWrap"]
						},
						"visible": {bindTo: "postPublishActionsVisible"},
						"items": []
					}
				},
				//SocialChannelEdit
				{
					"operation": "insert",
					"parentName": "SocialChannelEditContainer",
					"name": "SocialChannelEdit",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"enabled": {bindTo: "ChannelEditEnabled"},
						"controlConfig": {
							"visible": {bindTo: "ChannelEditVisible"}
						},
						"value": {bindTo: "SocialChannel"},
						"list": {bindTo: "channels"},
						"prepareList": {bindTo: "prepareChannels"},
						"placeholder": {bindTo: "getSocialChannelEditPlaceholder"},
						"focused": {bindTo: "ChannelEditFocused"},
						"blur": {bindTo: "onChannelEditBlur"},
						"classes": {
							wrapClass: ["inlineBlock", "channel", "placeholderOpacity"]
						},
						"markerValue": {bindTo: "getSocialMessageEditMarkerValue"},
						"labelConfig": {"visible": false}
					}
				},
				//PublishButton
				{
					"operation": "insert",
					"parentName": "PublishButtonContainer",
					"name": "PublishButton",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"caption": {bindTo: "Resources.Strings.Publish"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"click": {bindTo: "onPostPublishClick"},
						"markerValue": "publishPostMessageButton",
						"classes": {
							textClass: ["floatRight"]
						},
						"clickDebounceTimeout": 1000
					}
				},
				//ShowNewMessagesContainer
				{
					"operation": "insert",
					"name": "ShowNewMessagesContainer",
					"parentName": "SocialFeed",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {bindTo: "showNewSocialMessagesVisible"},
						"classes": {
							wrapClassName: ["showNewMessagePadding", "showNewMessageContainer"]
						},
						"items": []
					}
				},
				//ShowNewMessagesButton
				{
					"operation": "insert",
					"name": "ShowNewMessagesButton",
					"parentName": "ShowNewMessagesContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {bindTo: "getShowNewMessageText"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
						"imageConfig": {"bindTo": "getShowNewMessagesButtonImageConfig"},
						"click": {bindTo: "onShowNewMessageClick"},
						"classes": {
							textClass: ["showNewMessageButton"]
						}
					}
				},
				//SocialFeedMessagesContainer
				{
					"operation": "insert",
					"name": "SocialFeedMessagesContainer",
					"parentName": "SocialFeed",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["social-feed-messages"]
						},
						"items": []
					}
				},
				//SocialFeedMessages
				{
					"operation": "insert",
					"name": "SocialFeedMessages",
					"parentName": "SocialFeedMessagesContainer",
					"propertyName": "items",
					"values": {
						"generateId": false,
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "SocialMessages",
						"observableRowNumber": 5,
						"observableRowVisible": {bindTo: "onLoadNext"},
						"onGetItemConfig": "getItemViewConfig",
						"classes": {
							wrapClassName: ["rightSideBarModulePostList", "feedMaxWidth", "showNewMessagePadding"]
						},
						"activeItem": {bindTo: "ActiveSocialMessageId"},
						"isAsync": {bindTo: "IsContainerListAsync"}
					}
				}
			]
		};
	});

define("SocialFeed", ["OperatorSingleWindowSocialMessageViewModel"], function() {
		return {
			methods: {

				/**
				 * @inheritdoc Terrasoft.SocialFeedUtilities#getSocialMessageViewModelName
				 */
				getSocialMessageViewModelName: function() {
					return "Terrasoft.OperatorSingleWindowSocialMessageViewModel";
				}

			}
		};
	});


