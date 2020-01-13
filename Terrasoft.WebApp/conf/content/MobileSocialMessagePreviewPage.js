Terrasoft.configuration.Structures["MobileSocialMessagePreviewPage"] = {innerHierarchyStack: ["MobileSocialMessagePreviewPage"]};
/* globals SocialMessage: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "SocialMessagePreviewPage.Controller",
	viewXType: "socialmessagepreviewpageview"
};

Ext.define("Terrasoft.configuration.view.SocialMessagePreviewPage", {
	alternateClassName: "SocialMessagePreviewPage.View",
	extend: "Terrasoft.view.BaseConfigurationPage",

	xtype: "socialmessagepreviewpageview",

	config: {

		id: "SocialMessagePreviewPage",

		pageType: Terrasoft.PageTypes.Preview,

		layout: "fit",

		navigationPanel: {

			backButton: true,

			menuButton: true

		},

		feedCommentsList: {

			store: "SocialMessageGridPage.Store",

			htmlEncode: false,

			pullRefresh: true

		},

		commentPanel: true

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getQuickActions: function() {
		return [];
	},

	/**
	 * Applies feed list.
	 * @protected
	 * @virtual
	 * @cfg-applier
	 * @returns {Terrasoft.Configuration.FeedCommentsList} The list.
	 */
	applyFeedCommentsList: function(config) {
		config = Ext.merge({
			listeners: {
				scope: this,
				beforeinitialize: function(el) {
					this.fireEvent("beforeinitializelist", el);
				}
			}
		}, config);
		return Ext.factory(config, "Terrasoft.Configuration.FeedCommentsList");
	},

	/**
	 * Updates feed list.
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateFeedCommentsList: function(newList, oldList) {
		if (oldList && "destroy" in oldList) {
			oldList.destroy();
		}
		if (newList && newList instanceof Ext.Component) {
			this.add(newList);
		}
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyCommentPanel: function(newPanel) {
		if (!newPanel) {
			return false;
		}
		var config = {
			docked: "bottom",
			cls: "cf-social-message-comment-input-container",
			items: [
				{
					itemId: "ownerimage",
					xtype: "button",
					cls: "cf-social-message-preview-owner-image",
					iconCls: "",
					docked: "left"
				},
				{
					itemId: "input",
					xtype: "cfsocialmessagehtmlfield",
					cls: "cf-social-message-comment-input",
					placeHolder: Terrasoft.LocalizableStrings.CommentInputPlaceholder,
					clearIcon: false,
					markerValue: "social-message-preview-comment-input",
					tags: {
						"@": {
							modelName: "Contact",
							urlTpl: "Nui/ViewModule.aspx#CardModuleV2/ContactPageV2/edit/{0}"
						},
						"$": {
							modelName: "Account",
							urlTpl: "Nui/ViewModule.aspx#AccountModuleV2/AccountPageV2/edit/{0}"
						}
					}
				},
				{
					itemId: "savebutton",
					xtype: "button",
					docked: "right",
					cls: "cf-social-message-save-comment-button",
					iconCls: "cf-social-message-save-comment-button-icon",
					disabled: true,
					markerValue: "social-message-preview-save-comment-button"
				}
			]
		};
		return Ext.factory(config, "Ext.Container", this.getCommentPanel());
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateCommentPanel: function(newPanel, oldPanel) {
		if (oldPanel && "destroy" in oldPanel) {
			oldPanel.destroy();
		}
		if (newPanel) {
			this.add(newPanel);
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getScroller: function() {
		var list = this.getFeedCommentsList();
		var scrollable = list.getScrollable();
		if (scrollable) {
			return scrollable.getScroller();
		}
		return null;
	},

	/**
	 * Returns comment panel item associated with the passed key.
	 * @param {String} key The id of the item.
	 * @returns {Ext.Component} The item associated with the passed key.
	 */
	getCommentPanelItem: function(key) {
		var commentPanelContainer = this.getCommentPanel();
		var panelItems = commentPanelContainer.getItems();
		return panelItems.getByKey(key);
	},

	setUserImage: function(image) {
		var userImage = this.getCommentPanelItem("ownerimage");
		var defaultImageCls = "cf-social-message-owner-default-image";
		if (image) {
			userImage.removeCls(defaultImageCls);
		} else {
			userImage.addCls(defaultImageCls);
			image = Terrasoft.Configuration.getDefaultOwnerImage();
		}
		userImage.setIcon(image);
	},
	
	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	showActionsPicker: function(actions) {
		actions = actions || this.getQuickActions();
		var picker = this.getActionsPicker(true, actions);
		var parent = this.getParent();
		if (!picker.getParent() && parent) {
			parent.add(picker);
		}
		picker.show();
	}

});

Ext.define("Terrasoft.configuration.controller.SocialMessagePreviewPage", {
	alternateClassName: "SocialMessagePreviewPage.Controller",
	extend: "Terrasoft.controller.BaseConfigurationPage",

	statics: {
		Model: SocialMessage
	},

	config: {
		refs: {
			view: "#SocialMessagePreviewPage"
		},
		control: {
			view: {
				beforeinitializelist: "onListBeforeInitialize"
			}
		}
	},

	/**
	 * Id of the record.
	 * @private
	 */
	recordId: null,

	/**
	 * Loads data.
	 * @private
	 */
	loadStore: function() {
		var view = this.getView();
		view.setMasked({
			transparent: true
		});
		var store = this.getStore();
		store.loadPage(1, {
			isCancelable: true,
			asyncQueueId: this.getAsyncQueueId(),
			cancellationId: this.getCancellationId(),
			callback: function() {
				view.setMasked(false);
			},
			scope: this
		});
	},

	/**
	 * Returns the store.
	 * @private
	 * @returns {Terrasoft.store.BaseStore} Store.
	 */
	getStore: function() {
		var view = this.getView();
		var list = view.getFeedCommentsList();
		return list.getStore();
	},

	/**
	 * Initializes owner's image.
	 * @private
	 */
	initializeOwnerImage: function() {
		Terrasoft.Configuration.getCurrentUserImage({
			cancellationId: this.getCancellationId("initializeOwnerImage"),
			callback: function(image) {
				var view = this.getView();
				var imageUrl = Terrasoft.util.formatUrlForBackgroundImage(image);
				view.setUserImage(imageUrl);
			},
			scope: this
		});
	},

	/**
	 * Initializes button for saving.
	 * @private
	 */
	initializeSaveButton: function() {
		var view = this.getView();
		var saveCommentButton = view.getCommentPanelItem("savebutton");
		saveCommentButton.on("tap", this.onSaveCommentButtonTap, this);
	},

	/**
	 * Initializes input element for adding comment.
	 * @private
	 */
	initializeCommentInput: function() {
		var view = this.getView();
		var commentInput = view.getCommentPanelItem("input");
		commentInput.element.on("keyup", this.onCommentInputKeyUp, this);
		commentInput.element.on("paste", this.onCommentInputPaste, this);
		var pageHistoryItem = this.getPageHistoryItem();
		var rawConfig = pageHistoryItem.getRawConfig();
		if (rawConfig.focusCommentInput && !Terrasoft.util.isWindowsPlatform()) {
			setTimeout(function() {
				if (!commentInput.isDestroyed) {
					commentInput.focus(true);
				}
			}, 500);
		}
	},

	/**
	 * Returns the record.
	 * @private
	 * @returns {Object} The record.
	 */
	getRecord: function() {
		var store = this.getStore();
		return store.getById(this.recordId);
	},

	/**
	 * Returns true if parent social message is delivered.
	 * @private
	 * @param {SocialMessage} parentRecord Parent social message record.
	 * @returns {Boolean} True if parent social message is delivered.
	 */
	isParentRecordDelivered: function(parentRecord) {
		var store = this.getStore();
		var parentRecordId = parentRecord.getId();
		var modifiedRecordIds = store.socialMessageModifiedRecordIds || [];
		return !Ext.Array.contains(modifiedRecordIds, parentRecordId);
	},

	/**
	 * Completes saving of the comment.
	 * @private
	 * @param {SocialMessage} commentRecord Commentary record.
	 */
	completeCommentDataSaving: function(commentRecord) {
		commentRecord.commit();
		var store = this.getStore();
		var parentRecord = this.getRecord();
		var parentRecordIsDelivered = this.isParentRecordDelivered(parentRecord);
		if (!Terrasoft.Configuration.isFeedInHybridMode() || !parentRecordIsDelivered) {
			Terrasoft.Array.pushUnique(store.socialMessageModifiedRecordIds, commentRecord.get("Id"));
		}
		Terrasoft.Configuration.setCreatedByForCurrentUser({
			cancellationId: this.getCancellationId("setCreatedByForCurrentUser"),
			record: commentRecord,
			callback: function() {
				store.add(commentRecord);
				Terrasoft.Mask.hide();
			},
			scope: this
		});
	},

	/**
	 * Saves social message record depending on the 'hybrid' mode of 'Feed'.
	 * @private
	 * @param {Object} config Configuration object:
	 * @param {SocialMessage} config.record Record.
	 * @param {Array} config.queryConfig Query config for save.
	 * @param {Function} config.afterRequest After request function.
	 * @param {Function} config.success Called on success.
	 * @param {Object} config.scope Scope of calback functions.
	 */
	saveSocialMessageRecord: function(config) {
		var record = config.record;
		var queryConfigForSave = config.queryConfig;
		var saveConfig = {
			isCancelable: false,
			queryConfig: queryConfigForSave,
			failure: function(exception) {
				Terrasoft.MessageBox.showException(exception);
			}
		};
		var saveConfigAfterRequest = config.afterRequest || Ext.emptyFn;
		var saveConfigSuccess = config.success || Ext.emptyFn;
		var parentRecordIsDelivered = this.isParentRecordDelivered(this.getRecord());
		if (Terrasoft.Configuration.isFeedInHybridMode() && parentRecordIsDelivered) {
			queryConfigForSave.setAutoSetProxy(false);
			saveConfig.success = function() {
				record.setProxy("tssql");
				queryConfigForSave.setIsLogged(false);
				saveConfig.afterRequest = saveConfigAfterRequest;
				saveConfig.success = saveConfigSuccess;
				record.save(saveConfig, this);
			};
			record.setProxy("odata");
		} else {
			saveConfig.afterRequest = saveConfigAfterRequest;
			saveConfig.success = saveConfigSuccess;
		}
		record.save(saveConfig, this);
	},

	/**
	 * Adds the comment.
	 * @private
	 * @param {Object} config Configuration object:
	 * @param {String} config.commentText Text of the comment.
	 * @param {String} config.mentions Mentions of objects.
	 * @param {Function} config.success Called on success.
	 * @param {Object} config.scope Scope of calback functions.
	 */
	addComment: function(config) {
		Terrasoft.Mask.show();
		var commentText = config.commentText;
		var parentRecord = this.getRecord();
		var queryConfigForSave = Ext.create("Terrasoft.QueryConfig", {
			modelName: "SocialMessage",
			columns: ["Parent", "Message"]
		});
		var commentRecord = SocialMessage.create({
			Parent: parentRecord,
			Message: commentText
		});
		if (!Terrasoft.Features.getIsEnabled("UseHybridModeInMobileFeed")) {
			commentRecord.setProxyType(this.getProxyType());
		}
		var mentions = config.mentions;
		var mentionsCount = Ext.isArray(mentions) ? mentions.length : 0;
		if (mentionsCount > 0) {
			queryConfigForSave.setIsBatch(true);
			var associationsConfig = queryConfigForSave.getAssociationsConfig();
			var assocQueryConfig = Ext.create("Terrasoft.QueryConfig");
			assocQueryConfig.setModelName("SocialMention");
			assocQueryConfig.addColumn("SocialMessage");
			assocQueryConfig.addColumn("Contact");
			associationsConfig.add("SocialMentionAssociation", assocQueryConfig);
			commentRecord.SocialMentionAssociation.call(commentRecord);
			var socialMentionStore = commentRecord.SocialMentionAssocStore;
			for (var i = 0; i < mentionsCount; i++) {
				var mention = mentions[i];
				if (mention.modelName === "Contact") {
					socialMentionStore.add({Contact: mention.recordId});
				}
			}
		}
		var useOptimisticEditing = Terrasoft.ApplicationUtils.useOptimisticEditing();
		var saveConfigAfterRequest = function() {
			if (useOptimisticEditing) {
				this.completeCommentDataSaving(commentRecord);
			}
		};
		var saveConfigSuccess = function() {
			Ext.callback(config.success, config.scope);
			if (!useOptimisticEditing) {
				this.completeCommentDataSaving(commentRecord);
			}
		};
		if (Terrasoft.Features.getIsEnabled("UseHybridModeInMobileFeed")) {
			this.saveSocialMessageRecord({
				record: commentRecord,
				queryConfig: queryConfigForSave,
				afterRequest: saveConfigAfterRequest,
				success: saveConfigSuccess
			});
		} else {
			commentRecord.save({
				isCancelable: !useOptimisticEditing,
				queryConfig: queryConfigForSave,
				success: saveConfigSuccess,
				afterRequest: saveConfigAfterRequest,
				failure: function(exception) {
					Terrasoft.MessageBox.showException(exception);
				}
			}, this);
		}
	},

	/**
	 * Updates parent record delivery icon state.
	 * @private
	 * @param {Boolean} isIncremented If true, increments the number of comments.
	 */
	updateModifiedRecordInList: function(record) {
		var store = this.getStore();
		var recordId = record.get("Id");
		var view = this.getView();
		var list = view.getFeedCommentsList();
		Terrasoft.Array.pushUnique(store.socialMessageModifiedRecordIds, recordId);
		if (store.getById(recordId)) {
			list.updateListItemByRecord(record);
		}
	},

	/**
	 * Increments or decrements the number of comments.
	 * @private
	 * @param {Boolean} isIncremented If true, increments the number of comments.
	 */
	updateCommentsCount: function(isIncremented) {
		var parentRecord = this.getRecord();
		var commentCountColumnName = "CommentCount";
		var commentCount = parentRecord.get(commentCountColumnName);
		if (isIncremented) {
			commentCount++;
		} else {
			commentCount--;
		}
		if (commentCount < 0) {
			commentCount = 0;
		}
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: "SocialMessage",
			columns: [commentCountColumnName]
		});
		parentRecord.set(commentCountColumnName, commentCount);
		if (!Terrasoft.Features.getIsEnabled("UseHybridModeInMobileFeed")) {
			parentRecord.save({
				isCancelable: false,
				queryConfig: queryConfig,
				success: function() {
					parentRecord.commit();
				},
				scope: this
			}, this);
			this.refreshPreviousPages();
		} else {
			var successFn = function() {
				parentRecord.commit();
				var operationConfig;
				if (!Terrasoft.Configuration.isFeedInHybridMode()) {
					this.updateModifiedRecordInList(parentRecord);
					operationConfig = {
						isModified: true
					};
				}
				this.refreshPreviousPages(operationConfig);
			};
			this.saveSocialMessageRecord({
				record: parentRecord,
				queryConfig: queryConfig,
				success: successFn
			});
		}
	},

	/**
	 * Refreshes previous pages.
	 * @private
	 * @param {Object} operationConfig Config of the operation.
	 */
	refreshPreviousPages: function(operationConfig) {
		var record = this.getRecord();
		var config = {
			action: "update",
			record: record.clone(),
			modifiedColumns: null
		};
		Ext.apply(config, operationConfig);
		var pageHistoryItem = this.getPageHistoryItem();
		Terrasoft.PageNavigator.refreshPreviousPages(config, pageHistoryItem);
	},

	/**
	 * @private
	 */
	eraseLocalRecord: function(config) {
		var record = config.record;
		if (Terrasoft.Configuration.isFeedInHybridMode()) {
			var queryConfig = Ext.create("Terrasoft.QueryConfig", {
				isLogged: false,
				modelName: record.modelName,
				autoSetProxy: false
			});
			record.setProxy("tssql");
			record.erase({
				isCancelable: false,
				queryConfig: queryConfig,
				success: config.callback,
				failure: function(exception) {
					Terrasoft.Logger.logException(Terrasoft.LogSeverityLevel.Error, exception);
				},
				scope: this
			}, this);
		} else {
			Ext.callback(config.callback, this);
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function() {
		this.callParent(arguments);
		this.initializeNavigationTitle();
		this.initializeOwnerImage();
		this.initializeCommentInput();
		this.initializeSaveButton();
		if (!Ext.os.is.Phone) {
			var mainPageView = Terrasoft.util.getMainController().getView();
			mainPageView.on("modechange", this.onMainPageViewModeChange, this);
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initNavigationButtons: function() {
		var mainController = Terrasoft.util.getMainController();
		var mainView = mainController.getView();
		var mainViewMode = mainView.mode;
		this.initBackButton(mainViewMode);
		this.initMenuButton(mainViewMode);
	},

	/**
	 * @protected
	 * @virtual
	 */
	initBackButton: function(viewMode) {
		var view = this.getView();
		var navigationPanel = view.getNavigationPanel();
		var pageHistoryItem = this.getPageHistoryItem();
		var parentPageHistoryItem = pageHistoryItem.getParent();
		if (viewMode === Terrasoft.ViewModes.StaticGrid && parentPageHistoryItem &&
			parentPageHistoryItem.getDetailConfig()) {
			navigationPanel.setBackButton(false);
		} else {
			navigationPanel.setBackButton(true);
		}
	},

	/**
	 * @protected
	 * @virtual
	 */
	initMenuButton: function(viewMode) {
		var view = this.getView();
		var navigationPanel = view.getNavigationPanel();
		if (viewMode === Terrasoft.ViewModes.StaticGrid) {
			navigationPanel.setMenuButton(false);
		} else {
			navigationPanel.setMenuButton(true);
		}
	},

	/**
	 * @protected
	 * @virtual
	 */
	onMainPageViewModeChange: function(viewMode) {
		this.initBackButton(viewMode);
		this.initMenuButton(viewMode);
	},

	/**
	 * Calls before initializing of the list.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.Configuration.FeedCommentsList} list List.
	 */
	onListBeforeInitialize: function(list) {
		var model = this.self.Model;
		var gridConfig = Terrasoft.sdk.GridPage.getConfig(model);
		list.setPrimaryColumn(gridConfig.primaryColumn);
		list.setGroupColumns(gridConfig.groupColumns);
		list.setImageColumn(gridConfig.imageColumn);
		list.setDefaultImage(gridConfig.defaultImage);
		var listStore = list.getStore();
		listStore.on("beforeload", this.onBeforeLoadStore, this);
		listStore.on("load", this.onStoreLoad, this);
		list.on("likesinfotap", this.onFeedCommentsListLikeInfoTap, this);
		list.on("itemactionstap", this.onFeedCommentsListItemActionsTap, this);
		list.on("liketap", this.onFeedCommentsListItemLikeTap, this);
		list.on("linktap", this.onFeedCommentsListLinkTap, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeQueryConfig: function() {
		var modelConfig = Terrasoft.ApplicationConfig.getModelConfig(this.self.Model);
		var gridQueryConfig = modelConfig.gridQueryConfig;
		var columns = Ext.clone(gridQueryConfig.getColumns());
		columns.push("Parent");
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: gridQueryConfig.getModelName(),
			columns: columns,
			orderByColumns: ["Parent", "CreatedOn"]
		});
		this.setQueryConfig(queryConfig);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	computeUseCache: function() {
		var cacheManager = this.getDataCacheManager();
		if (!cacheManager || !this.recordId) {
			this.setUseCache(false);
			return Promise.resolve();
		}
		return cacheManager.getIsRecordCached(this.recordId).then(function(isCached) {
			this.setUseCache(isCached);
		}.bind(this));
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	loadData: function() {
		var pageHistoryItem = this.getPageHistoryItem();
		this.recordId = pageHistoryItem.getRecordId();
		return Terrasoft.configuration.controller.SocialMessagePreviewPage.superclass.loadData.call(this).then(function() {
			this.loadStore();
		}.bind(this));
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getActionManagerDefaultCondition: function() {
		return "isVisibleInGrid";
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionSelected: function(actionConfig) {
		var record = this.actionSelectedRecord;
		if (record) {
			var executionConfig = {
				pageType: Terrasoft.PageTypes.Grid,
				asyncQueueId: this.getAsyncQueueId()
			};
			var actionClassName = actionConfig.actionClassName;
			if (actionClassName === "Terrasoft.ActionEdit" || actionConfig.name === "add") {
				var view = this.getView();
				view.stopActiveAnimation();
			} else if (actionClassName === "Terrasoft.ActionDelete" && Terrasoft.Configuration.isFeedInHybridMode()) {
				var parentRecordIsDelivered = this.isParentRecordDelivered(this.getRecord());
				if (parentRecordIsDelivered) {
					executionConfig.queryConfig = {
						autoSetProxy: false,
						isLogged: false
					};
					executionConfig.proxy = "odata";
				}
			}
			var actionManager = this.getActionManager();
			actionManager.execute(actionConfig.name, record, executionConfig);
		}
		this.actionSelectedRecord = null;
	},

	/**
	 * Calls before loading store.
	 * @protected
	 * @virtual
	 * @param {Object} store Data store.
	 * @param {Object} operation Operation.
	 */
	onBeforeLoadStore: function(store, operation) {
		var idFilter = Ext.create("Terrasoft.Filter", {
			property: "Id",
			value: this.recordId
		});
		var parentFilter = Ext.create("Terrasoft.Filter", {
			property: "Parent",
			value: this.recordId
		});
		var filters = Ext.create("Terrasoft.Filter", {
			type: Terrasoft.FilterTypes.Group,
			logicalOperation: Terrasoft.FilterLogicalOperations.Or,
			subfilters: [idFilter, parentFilter]
		});
		store.setFilters(filters);
		var proxyType = this.getProxyType();
		store.setProxyType(proxyType);
		operation.setFilters(filters);
		operation.config.queryConfig = this.getQueryConfig();
	},

	/**
	 * Calls after store loaded.
	 * @protected
	 * @virtual
	 * @param {Object} store Data store
	 * @param {Object[]} records List of records.
	 * @param {Boolean} success true, if operation was successfull.
	 * @param {Object} operation Operation.
	 */
	onStoreLoad: function(store, records, success, operation) {
		if (success !== true) {
			Terrasoft.MessageBox.showException(operation.getError());
		}
	},

	/**
	 * Shows picker with contacts.
	 * @protected
	 * @virtual
	 * @param {Object} list List component.
	 * @param {Object} record Instance of model.
	 */
	onFeedCommentsListLikeInfoTap: function(list, record) {
		this.showLikesContactPicker(record.getId());
	},

	/**
	 * Handles selecting of the contact.
	 * @protected
	 * @virtual
	 * @param {Object} list List component.
	 * @param {Object} record Instance of model.
	 */
	onLikesContactPickerSelect: function(list, record) {
		var contact = record.get("CreatedBy");
		Terrasoft.util.openPreviewPage("Contact", {
			recordId: contact.getId()
		});
	},

	/**
	 * Handles tap on the action's icon.
	 * @protected
	 * @virtual
	 * @param {Object} list List component.
	 * @param {Object} record Instance of model.
	 */
	onFeedCommentsListItemActionsTap: function(list, record) {
		this.actionSelectedRecord = record;
		var allActions = this.getActions();
		var actions = [];
		var isComment = (this.getRecord() !== record);
		for (var i = 0, ln = allActions.length; i < ln; i++) {
			var action = allActions[i];
			if (isComment === Boolean(action.useInComment)) {
				actions.push(action);
			}
		}
		var view = this.getView();
		view.showActionsPicker(actions);
	},

	/**
	 * Handles tap on the link.
	 * @protected
	 * @virtual
	 * @param {Object} list List component.
	 * @param {Object} config The config object for the link.
	 */
	onFeedCommentsListLinkTap: function(list, config) {
		Terrasoft.Configuration.openLink(config);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionExecutionEnd: function(action, success) {
		this.callParent(arguments);
		var actionRecord = action.getRecord();
		if (action.config.name === "DeleteComment" && success) {
			var callbackFn = function() {
				var store = this.getStore();
				store.remove(actionRecord);
				this.updateCommentsCount(false);
			}.bind(this);
			this.eraseLocalRecord({
				record: actionRecord,
				callback: callbackFn
			});
		} else if (action.config.name === "Delete" && success) {
			this.eraseLocalRecord({
				record: actionRecord,
				callback: function() {
					Terrasoft.Router.back();
				}
			});
		}
	},

	/**
	 * Handles tap on the like's button.
	 * @protected
	 * @virtual
	 * @param {Object} list List component.
	 * @param {Object} record Instance of model.
	 */
	onFeedCommentsListItemLikeTap: function(list, record) {
		var store = list.getStore();
		var operationConfig = {
			record: record,
			isLiked: Ext.Array.contains(store.socialMessageLikedRecordIds, record.getId())
		};
		this.refreshPreviousPages(operationConfig);
	},

	/**
	 * Handles when user types comment in comment input.
	 * @protected
	 * @virtual
	 */
	onCommentInputKeyUp: function() {
		var view = this.getView();
		var commentInput = view.getCommentPanelItem("input");
		var saveCommentButton = view.getCommentPanelItem("savebutton");
		var commentText = commentInput.getInnerValue();
		if (commentText && commentText.length > 0) {
			saveCommentButton.setDisabled(false);
		} else {
			saveCommentButton.setDisabled(true);
		}
	},

	/**
	 * Handles when user pastes text in comment input.
	 * @protected
	 * @virtual
	 */
	onCommentInputPaste: function() {
		var view = this.getView();
		var saveCommentButton = view.getCommentPanelItem("savebutton");
		saveCommentButton.setDisabled(false);
	},

	/**
	 * Creates picker if not exist.
	 * @protected
	 * @virtual
	 * @returns {Terrasoft.ComboBoxPicker} Component.
	 */
	getLikesContactPicker: function() {
		if (this.likesContactPicker) {
			return this.likesContactPicker;
		}
		var likesContactStore = Ext.create("Terrasoft.store.BaseStore", {
			model: "SocialLike"
		});
		var base64str = Terrasoft.IconsConfiguration.get("MobileImageListDefaultContactPhoto");
		var defaultImageUrl = Terrasoft.util.getBase64ImageUrl(base64str);
		var likesContactPicker = this.likesContactPicker = Ext.create("Terrasoft.ComboBoxPicker", {
			component: {
				store: likesContactStore,
				primaryColumn: "CreatedBy",
				secondaryColumn: "CreatedBy.Account",
				imageColumn: "CreatedBy.Photo.PreviewData",
				defaultImage: defaultImageUrl,
				listeners: {
					scope: this,
					select: this.onLikesContactPickerSelect
				}
			},
			toolbar: {
				clearButton: false
			},
			hideOnItemTap: false,
			title: Terrasoft.LocalizableStrings.SocialMessagePreviewPageLikesContactPickerTitle,
			popup: true
		});
		return likesContactPicker;
	},

	/**
	 * Shows picker with contacts.
	 * @protected
	 * @virtual
	 * @param {String} socialMessageId Id of message.
	 */
	showLikesContactPicker: function(socialMessageId) {
		var likesContactPicker = this.getLikesContactPicker();
		var likesContactPickerList = likesContactPicker.getComponent();
		var likesContactStore = likesContactPickerList.getStore();
		var filter = Ext.create("Terrasoft.Filter", {
			property: "SocialMessage",
			value: socialMessageId
		});
		likesContactStore.loadPage(1, {
			queryConfig: Ext.create("Terrasoft.QueryConfig", {
				modelName: "SocialLike",
				columns: ["CreatedBy", "CreatedBy.Photo.PreviewData", "CreatedBy.Account"]
			}),
			callback: function() {
				if (!likesContactPicker.getParent()) {
					Ext.Viewport.add(likesContactPicker);
				}
				likesContactPicker.show();
			},
			filters: filter,
			scope: this
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getDefaultTitle: function() {
		return Terrasoft.LocalizableStrings.SocialMessagePreviewPageTitle;
	},

	/**
	 * Handles tap on the saving button.
	 * @protected
	 * @virtual
	 */
	onSaveCommentButtonTap: function() {
		var view = this.getView();
		var commentInput = view.getCommentPanelItem("input");
		var commentText = commentInput.getValue();
		if (Ext.isEmpty(commentText)) {
			return;
		}
		this.addComment({
			mentions: commentInput.getMentions(),
			commentText: commentText,
			success: function() {
				var scroller = view.getScroller();
				if (scroller) {
					scroller.scrollToEnd(true);
				}
			},
			scope: this
		});
		commentInput.setValue("");
		var saveCommentButton = view.getCommentPanelItem("savebutton");
		saveCommentButton.setDisabled(true);
		this.updateCommentsCount(true);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	refreshDirtyDataByOperationConfig: function(operationConfig) {
		if ("isLiked" in operationConfig) {
			var record = operationConfig.record;
			var isLiked = operationConfig.isLiked;
			var view = this.getView();
			var list = view.getFeedCommentsList();
			var store = list.getStore();
			if (store.getById(record.getId())) {
				store.updateSocialMessageLikedRecordIds(record, isLiked);
				list.updateListItemByRecord(record);
			}
		} else {
			this.callParent(arguments);
		}
	}
});


