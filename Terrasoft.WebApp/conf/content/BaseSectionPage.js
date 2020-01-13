Terrasoft.configuration.Structures["BaseSectionPage"] = {innerHierarchyStack: ["BaseSectionPageNUI", "BaseSectionPageESN", "BaseSectionPage"], structureParent: "BasePageV2"};
define('BaseSectionPageNUIStructure', ['BaseSectionPageNUIResources'], function(resources) {return {schemaUId:'d7862464-6710-4c5c-b896-e8187803dd6e',schemaCaption: "BaseSectionPage", parentSchemaName: "BasePageV2", schemaName:'BaseSectionPageNUI',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionPageESNStructure', ['BaseSectionPageESNResources'], function(resources) {return {schemaUId:'4aa091ea-fc53-4747-b5c4-1c9b5217d911',schemaCaption: "BaseSectionPage", parentSchemaName: "BaseSectionPageNUI", schemaName:'BaseSectionPageESN',parentSchemaUId:'d7862464-6710-4c5c-b896-e8187803dd6e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSectionPageNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionPageStructure', ['BaseSectionPageResources'], function(resources) {return {schemaUId:'c7199a02-9f3b-46d5-a30d-9ef86e2e56fe',schemaCaption: "BaseSectionPage", parentSchemaName: "BaseSectionPageESN", schemaName:'BaseSectionPage',parentSchemaUId:'4aa091ea-fc53-4747-b5c4-1c9b5217d911',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSectionPageESN",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionPageNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSectionPageNUI", ["NotesUtilities", "TagUtilitiesV2"], function() {
	return {
		attributes: {
			/**
			 * Notes image collection.
			 * @type {Terrasoft.Collection}
			 */
			"NotesImagesCollection": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Indicating tag accessibility.
			 * @type {Boolean}
			 */
			"UseTagModule": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},
		mixins: {
			/**
			 * @class TagUtilities implements work with the tag module.
			 */
			TagUtilities: "Terrasoft.TagUtilities",
			/**
			 * @class NotesUtilities implements work with the notes.
			 */
			NotesUtilities: "Terrasoft.NotesUtilities"
		},
		messages: {
			/**
			 * @message TagChanged
			 * Updates number of tags in the button.
			 */
			"TagChanged": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetRecordId
			 * Returns current edited record identifier.
			 */
			"GetRecordId": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Create tag module identifier.
			 * @private
			 * @return {string} Tag module identifier.
			 */
			getTagModuleSandboxId: function() {
				return this.sandbox.id + "_TagModule";
			},

			/**
			 * Updates "Attachments and notes" details.
			 * @private
			 */
			updateFileDetail: function() {
				this.updateDetail({detail: "Files"});
			},

			//endregion

			//region Methods: Protected

			/**
			 * Tag button handler.
			 * @protected
			 */
			onTagButtonClick: function() {
				if (this.isAddMode() || this.isEditMode() || this.isCopyMode()) {
					this.saveCardAndLoadTags();
				} else {
					this.showTagModule();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onPageInitialized
			 * @overridden
			 */
			onPageInitialized: function(callback, scope) {
				this.callParent([function() {
					this.initNotesImagesCollection();
					this.initTags(this.entitySchemaName);
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				if (this.get("IsSeparateMode")) {
					this.initTagButton();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("GetRecordId", this.getCurrentRecordId, this, [this.sandbox.id]);
				this.sandbox.subscribe("TagChanged", this.reloadTagCount, this, [this.getTagModuleSandboxId()]);
			},

			/**
			 * @inheritdoc Terrasoft.NotesUtilities#onNotesImagesUpload
			 * @overridden
			 */
			onNotesImagesUpload: function() {
				this.showBodyMask();
			},

			/**
			 * @inheritdoc Terrasoft.NotesUtilities#onNotesImagesUploadComplete
			 * @overridden
			 */
			onNotesImagesUploadComplete: function() {
				this.hideBodyMask();
				this.updateFileDetail();
			},

			/**
			 * @inheritdoc Terrasoft.NotesUtilities#getFileEntitySchemaName
			 * @overridden
			 */
			getFileEntitySchemaName: function() {
				return this.entitySchema.name + "File";
			},

			/**
			 * @inheritdoc Terrasoft.TagUtilities#getCurrentRecordId
			 * @overridden
			 */
			getCurrentRecordId: function() {
				return this.get("Id");
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initContainersVisibility
			 * @overridden
			 */
			initContainersVisibility: function() {
				this.callParent(arguments);
				if (this.getIsFeatureDisabled("OldUI")) {
					this.set("IsActionDashboardContainerVisible", true);
				}
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "TagButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "TagButtonCaption"},
					"hint": {"bindTo": "Resources.Strings.TagButtonHint"},
					"imageConfig": {"bindTo": "Resources.Images.TagButtonIcon"},
					"click": {"bindTo": "onTagButtonClick"},
					"classes": {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					"visible": {"bindTo": "TagButtonVisible"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
 
define('BaseSectionPageESNResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSectionPageESN", ["ServiceHelper", "EsnSubscriptionMixin"], function(ServiceHelper) {
	return {
		messages: {
			/**
			 * Checks is ESN module rendered.
			 * @message RerenderModule
			 */
			"RerenderModule": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Calls reload ESN module on main record changed.
			 * @message InitModuleViewModel
			 */
			"InitModuleViewModel": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Updates user channel subscription flag.
			 * @message UpdateSubscribeAction
			 */
			"UpdateSubscribeAction": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		properties: {
			/**
			 * Social subscription service name.
			 */
			socialSubscriptionServiceName: "SocialSubscriptionService"
		},
		mixins: {
			/**
			 * @class EsnSubscriptionMixin Mixin, implements common binding actions.
			 */
			EsnSubscriptionMixin: "Terrasoft.EsnSubscriptionMixin"
		},
		methods: {

			//region methods: private

			/**
			 * Updates user channel subscription flag.
			 * @private
			 * @param {Boolean} value IsSubscribed flag value.
			 */
			setIsSubscribed: function(value) {
				this.set("IsSubscribed", value);
				this.sandbox.publish("UpdateSubscribeAction", {
					isSubscribed: value
				}, [this.sandbox.id]);
			},

			/**
			 * Checks is current user subscribed to current record ESN feed.
			 * @private
			 */
			getIsSubscribed: function() {
				var entityId = this.get("Id");
				if (!entityId) {
					this.set("IsSubscribed", false);
					return;
				}
				ServiceHelper.callService(this.socialSubscriptionServiceName, "GetIsUserSubscribed", function(response) {
					var result = response.GetIsUserSubscribedResult;
					this.setIsSubscribed(result);
				}, {entityId: entityId}, this);
			},

			/**
			 * Returns owner column name.
			 * @private
			 * @return {String}
			 */
			getOwnerColumnName: function() {
				var ownerColumn = this.entitySchema.columns.Owner;
				var ownerColumnName;
				if (ownerColumn) {
					ownerColumnName = ownerColumn.name;
				}
				return ownerColumnName;
			},

			/**
			 * Returns owner column value.
			 * @private
			 * @return {String}
			 */
			getOwnerColumnValue: function() {
				var ownerColumnName = this.getOwnerColumnName();
				var ownerColumnValue;
				if (ownerColumnName) {
					ownerColumnValue = this.get(ownerColumnName);
				}
				return ownerColumnValue && ownerColumnValue.value;
			},

			/**
			 * Returns ESN feed module identifier.
			 * @private
			 * @return {String} ESN feed module identifier.
			 */
			getSocialFeedSandboxId: function() {
				return this.sandbox.id + "_ESNFeed";
			},

			/**
			 * Removes ESN tab from collection when tab not visible.
			 * @private
			 */
			_actualizeEsnTabVisibility: function() {
				if (this.getEsnTabVisible()) {
					return;
				}
				var tabsCollection = this.get("TabsCollection");
				tabsCollection.removeByKey("ESNTab");
			},

			//endregion

			//region methods: protected

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @overridden
			 */
			onSaved: function(cardSaveResponse, config) {
				this.callParent(arguments);
				this.subscribeOwner(config);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#save
			 * @overridden
			 */
			save: function() {
				this.callParent(arguments);
				this.scheduleOwnerSubscription();
			},

			/**
			 * Subscribes current channel owner to channel updates.
			 * @protected
			 * @virtual
			 * @param {Object} config Save record options.
			 * @param {Object} config.subscribeOwner Subscribe owner flag.
			 */
			subscribeOwner: function(config) {
				if (!this.get("OwnerSubscriptionScheduled")) {
					return;
				}
				if (config && (config.subscribeOwner === false)) {
					return;
				}
				this.set("OwnerSubscriptionScheduled", false);
				var entityId = this.get("Id");
				var serviceConfig = {
					serviceName: this.socialSubscriptionServiceName,
					methodName: "SubscribeContact",
					data: {
						contactId: this.getOwnerColumnValue(),
						entityId: entityId,
						entitySchemaUId: this.entitySchema.uId
					}
				};
				this.callService(serviceConfig, this.onOwnerSubscribed, this);
			},

			/**
			 * Owner subscribed handler.
			 * @protected
			 * @virtual
			 */
			onOwnerSubscribed: Terrasoft.emptyFn,

			/**
			 * Initiates record owner subscription to channel on owner change.
			 * @protected
			 * @virtual
			 */
			scheduleOwnerSubscription: function() {
				if (this.changedValues && this.changedValues[this.getOwnerColumnName()]) {
					this.set("OwnerSubscriptionScheduled", true);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#updateDetails
			 * @overridden
			 */
			updateDetails: function() {
				this.callParent(arguments);
				var config = {
					activeSocialMessageId: this.get("ActiveSocialMessageId")
				};
				this.sandbox.publish("InitModuleViewModel", config, [this.getSocialFeedSandboxId()]);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				var id = this.get("PrimaryColumnValue");
				var tags = id ? [id] : null;
				this.sandbox.subscribe("ReloadCard", this.onReloadCard, this, tags);
				this.sandbox.subscribe("GetRecordInfo", this.onGetRecordInfo, this, [this.getSocialFeedSandboxId()]);
				this.callParent(arguments);
			},

			/**
			 * Returns current record info object.
			 * @protected
			 * @return {Object} Current record info object.
			 */
			onGetRecordInfo: function() {
				var entitySchema = this.entitySchema;
				var primaryColumnValue = this.get("PrimaryColumnValue") || this.get(entitySchema.primaryColumnName);
				var channelName = this.get(entitySchema.primaryDisplayColumnName);
				var publisherRightKind = this.get("PublisherRightKind");
				return {
					channelId: primaryColumnValue,
					channelName: channelName,
					entitySchemaUId: entitySchema.uId,
					entitySchemaName: entitySchema.name,
					publisherRightKind: publisherRightKind
				};
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.setIsSubscribed(null);
				Terrasoft.delay(this.getIsSubscribed, this, 1000);
				this.callParent(arguments);
			},

			/**
			 * Returns Subscribe button visibility.
			 * @obsolete
			 * @protected
			 * @param {Boolean} value Is current user subscribed to record feed.
			 * @return {Boolean} Subscribe button visibility.
			 */
			getSubscribeButtonVisible: function() {
				return true;
			},

			/**
			 * Signs the user and updates the "Subscribers" detail.
			 * @protected
			 * @virtual
			 */
			subscribeUser: function() {
				var entitySchema = this.entitySchema;
				var serviceMethodName = "SubscribeUser";
				var config = {
					serviceName: this.socialSubscriptionServiceName,
					methodName: serviceMethodName,
					data: {
						entityId: this.get("Id"),
						entitySchemaUId: entitySchema.uId
					}
				};
				this.callService(config, function(response) {
					var result = response[serviceMethodName + "Result"];
					if (!result) {
						return;
					}
					var message = "";
					if (result.success) {
						this.setIsSubscribed(true);
						this.updateSubscribersDetail();
						message = this.Ext.String.format(this.get("Resources.Strings.SubscribedInformationDialog"),
							this.get(entitySchema.primaryDisplayColumnName));
					} else {
						var responseStatus = result.responseStatus;
						message = this.Ext.String.format("{0}: {1}", responseStatus.ErrorCode, responseStatus.Message);
					}
					this.showInformationDialog(message);
				}, this);
			},

			/**
			 * @public
			 * Make a query to change current user subscription.
			 */
			changeUserSubscription: function() {
				if (this.get("IsSubscribed")) {
					this.unsubscribeUser();
				} else {
					this.subscribeUser();
				}
			},

			/**
			 * Returns a collection of section actions in the vertical register and cards display mode.
			 * @protected
			 * @overridden
			 * @return {Terrasoft.BaseViewModelCollection} Returns a collection of section actions in the
			 * vertical register and cards display mode.
			 */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				if (!this.getEsnTabVisible()) {
					return actionMenuItems;
				}
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "getChangeUserSubscriptionCaption"},
					"Enabled": {"bindTo": "getChangeUserSubscriptionIsEnabled"},
					"Tag": "changeUserSubscription"
				}));
				return actionMenuItems;
			},

			/**
			 * Returns ESN tab visibility.
			 * @protected
			 * @return {Boolean} ESN tab visibility.
			 */
			getEsnTabVisible: function() {
				return true;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this._actualizeEsnTabVisibility();
				this.callParent(arguments);
			},

			//endregion

			//region methods: public

			/**
			 * Returns save record message publishers identifiers.
			 * @return {Array} Save record message publishers identifiers.
			 */
			getSaveRecordMessagePublishers: function() {
				var publishers = this.callParent(arguments);
				publishers.push(this.getSocialFeedSandboxId());
				return publishers;
			},

			/**
			 * Loads ESN feed module.
			 */
			loadESNFeed: function() {
				var moduleId = this.getSocialFeedSandboxId();
				var rendered = this.sandbox.publish("RerenderModule", {
					renderTo: "ESNFeed"
				}, [moduleId]);
				if (!rendered) {
					var esnFeedModuleConfig = {
						renderTo: "ESNFeed",
						id: moduleId
					};
					var activeSocialMessageId = this.get("ActiveSocialMessageId") ||
						this.getDefaultValueByName("ActiveSocialMessageId");
					if (!Ext.isEmpty(activeSocialMessageId)) {
						esnFeedModuleConfig.parameters = {activeSocialMessageId: activeSocialMessageId};
					}
					this.sandbox.loadModule("ESNFeedModule", esnFeedModuleConfig);
				}
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			getEntityInitializedSubscribers: function() {
				var subscribers = this.callParent(arguments);
				subscribers.push(this.getSocialFeedSandboxId());
				return subscribers;
			},

			/**
			 * Unsubscribe user and updates the "Subscribers" detail.
			 */
			unsubscribeUser: function() {
				var entityId = this.get("Id");
				ServiceHelper.callService(this.socialSubscriptionServiceName, "UnsubscribeUser", function(response) {
					var result = response.UnsubscribeUserResult;
					if (result) {
						this.showInformationDialog(result);
						return;
					}
					this.setIsSubscribed(false);
					this.updateSubscribersDetail();
					var channelTitle = Ext.String.format(this.get("Resources.Strings.UnsubscribedInformationDialog"),
						this.get(this.entitySchema.primaryDisplayColumnName));
					this.showInformationDialog(channelTitle);
				}, {entityId: entityId}, this);
			},

			/**
			 * Updates "Subscribers" detail.
			 * @virtual
			 */
			updateSubscribersDetail: Terrasoft.emptyFn

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"name": "ESNTab",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ESNTabCaption"},
					"items": [],
					"order": 1000
				}
			},
			{
				"operation": "insert",
				"parentName": "ESNTab",
				"propertyName": "items",
				"name": "ESNFeedContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ESNFeedContainer",
				"propertyName": "items",
				"name": "ESNFeed",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"moduleName": "ESNFeedModule",
					"afterrender": {"bindTo": "loadESNFeed"},
					"afterrerender": {"bindTo": "loadESNFeed"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("BaseSectionPage", ["SSPGridMixin"], function() {
	return {
		mixins: {
			/**
			 * Provides methods for grid handling in ssp sections.
			 */
			"SSPGridMixin": "Terrasoft.SSPGridMixin"
		},
		methods: {
			
			//region methods: protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionPage#getEsnTabVisible
			 * @overridden
			 */
			getEsnTabVisible: function() {
				return this.getIsFeatureEnabled("ShowESNOnSSP") || !this.Terrasoft.isCurrentUserSsp();
			}

			//endregion
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});
 

