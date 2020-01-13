Terrasoft.configuration.Structures["MobileSocialMessageGridPageController"] = {innerHierarchyStack: ["MobileSocialMessageGridPageController"]};
/* globals SocialMessage: false */
Ext.define("Terrasoft.configuration.controller.SocialMessageGridPage", {
	alternateClassName: "SocialMessageGridPage.Controller",
	extend: "Terrasoft.controller.BaseGridPage",

	statics: {
		Model: SocialMessage
	},

	config: {
		refs: {
			view: "#SocialMessageGridPage"
		}
	},

	/**
	 * @private
	 */
	selectedRecordId: null,

	/**
	 * @private
	 */
	actionSelectedRecord: null,

	/**
	 * Sets current user image for view's owner button.
	 * @private
	 */
	setViewOwnerButtonImage: function() {
		Terrasoft.Configuration.getCurrentUserImage({
			cancellationId: this.getCancellationId("setViewOwnerImage"),
			callback: function(image) {
				var view = this.getView();
				var imageUrl = Terrasoft.util.formatUrlForBackgroundImage(image);
				view.setOwnerButtonImage(imageUrl);
			},
			scope: this
		});
	},

	/**
	 * Opens page for preview.
	 * @private
	 * @param {Object} record Instance of model.
	 * @param {Object} focusCommentInput If true, focusing the input for comment .
	 */
	openRecordPage: function(record, focusCommentInput) {
		var recordId = record.getId();
		var selectedRecordId = this.selectedRecordId;
		var openPreviewPage = (selectedRecordId !== recordId);
		if (openPreviewPage) {
			this.openPreviewPage(recordId, focusCommentInput);
			this.selectedRecordId = recordId;
		}
	},

	/**
	 * @private
	 */
	shouldOpenPageOnItemTap: function(targetElement) {
		var parentElement = targetElement.parentElement;
		var parentElementClassName = parentElement ? parentElement.className : "";
		var className = targetElement.className + " " + parentElementClassName;
		var shouldOpenPageOnItemTap = !Terrasoft.String.contains(className, "cf-feed-list-item-buttons-container");
		return shouldOpenPageOnItemTap;
	},

	/**
	 * Returns true if parent social message is delivered.
	 * @private
	 * @param {SocialMessage} parentRecord Parent social message record.
	 * @returns {Boolean} True if parent social message is delivered.
	 */
	isRecordDelivered: function(record) {
		var view = this.getView();
		var grid = view.getGrid();
		var store = grid.getStore();
		var recordId = record.getId();
		var modifiedRecordIds = store.socialMessageModifiedRecordIds || [];
		return !Ext.Array.contains(modifiedRecordIds, recordId);
	},

	/**
	 * @protected
	 * @virtual
	 */
	onFeedListLinkTap: function(feedList, config) {
		Terrasoft.Configuration.openLink(config);
	},

	/**
	 * @protected
	 * @virtual
	 */
	onFeedListItemActionsTap: function(feedList, record) {
		this.actionSelectedRecord = record;
		var allActions = this.getActions();
		var actions = [];
		for (var i = 0, ln = allActions.length; i < ln; i++) {
			var action = allActions[i];
			if (action.name !== "add") {
				actions.push(action);
			}
		}
		var view = this.getView();
		view.showActionsPicker(actions);
	},

	/**
	 * @protected
	 * @virtual
	 */
	onFeedListCommentButtonTap: function(list, record) {
		this.openRecordPage(record, true);
		this.selectedRecordId = null;
	},

	/**
	 * @protected
	 * @virtual
	 */
	onFeedListLikeButtonTap: function(list, record) {
		var store = list.getStore();
		var operationConfig = {
			action: "update",
			record: record,
			modifiedColumns: null,
			isLiked: Ext.Array.contains(store.socialMessageLikedRecordIds, record.getId())
		};
		var pageHistoryItem = this.getPageHistoryItem();
		Terrasoft.PageNavigator.refreshAllPages(operationConfig, pageHistoryItem);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	launch: function() {
		var args = arguments;
		var requiredModels = [];
		var modules = Terrasoft.ApplicationConfig.manifest.Modules;
		for (var moduleName in modules) {
			var module = modules[moduleName];
			var modelName = module.Model;
			if (Terrasoft.StructureLoader.getPathBySchemaName(modelName)) {
				requiredModels.push(modelName);
			}
		}
		Terrasoft.StructureLoader.loadModels({
			modelNames: requiredModels,
			success: function() {
				this.superclass.launch.apply(this, args);
			},
			scope: this
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	openPreviewPage: function(recordId, focusCommentInput) {
		if (!focusCommentInput) {
			this.callParent(arguments);
		} else {
			var view = this.getView();
			view.setActionsHidden(true);
			Terrasoft.util.openPreviewPage(this.self.Model, {
				recordId: recordId,
				isStartRecord: true,
				focusCommentInput: true
			});
		}
	},

	/**
	 * @protected
	 * @overridden
	 */
	onItemTap: function(el, index, target, record, event) {
		var eventTarget = event.target;
		if (eventTarget && this.shouldOpenPageOnItemTap(eventTarget)) {
			this.openRecordPage(record);
			return;
		}
		this.selectedRecordId = null;
	},

	/**
	 * @protected
	 * @overridden
	 */
	initializeFilterPanel: function() {
		this.callParent(arguments);
		this.initializeOwnerButton();
		this.initializeSearchField();
	},

	/**
	 * @protected
	 * @virtual
	 */
	initializeOwnerButton: function() {
		var view = this.getView();
		view.setOwnerButton(true);
		this.setViewOwnerButtonImage();
	},

	/**
	 * @protected
	 * @virtual
	 */
	initializeSearchField: function() {
		/* HACK: Implement simple container instead of filter panel (CRM-20279) */
		var view = this.getView();
		var filterPanel = view.getFilterPanel();
		var searchFilterModule = filterPanel.getModuleByName("Search");
		var searchField = searchFilterModule.getComponent();
		searchField.setDisabled(true);
		filterPanel.element.on("tap", this.onFilterPanelTap, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeGrid: function(gridView) {
		this.callParent(arguments);
		var gridViewStore = gridView.getStore();
		var detailConfig = this.getDetailConfig();
		if (detailConfig) {
			var data = {};
			var recordId = detailConfig.parentRecord.getId();
			data[recordId] = detailConfig.parentRecord;
			gridViewStore.socialMessageEntitiesRecords = data;
			gridViewStore.setShouldLoadEntitiesRecords(false);
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @virtual
	 */
	getFilters: function() {
		var filters = this.callParent(arguments);
		var detailConfig = this.getDetailConfig();
		if (detailConfig) {
			var parentIsNullFilter = Ext.create("Terrasoft.Filter", {
				property: "Parent",
				isNot: true,
				compareType: Terrasoft.ComparisonTypes.NotEqual,
				value: null
			});
			filters.addFilter(parentIsNullFilter);
		}
		return filters;
	},

	/**
	 * @protected
	 * @virtual
	 */
	onFilterPanelTap: function() {
		var lastPageController = Terrasoft.PageNavigator.getLastPageController();
		if (lastPageController instanceof Terrasoft.controller.BaseEditPage) {
			return;
		}
		this.openEditPage();
	},

	/**
	 * @protected
	 * @virtual
	 */
	onFeedListSelectionChange: function(list) {
		if (list.getSelectionCount() === 0) {
			this.selectedRecordId = null;
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function() {
		this.callParent(arguments);
		var view = this.getView();
		var grid = view.getGrid();
		grid.on("itemactionstap", this.onFeedListItemActionsTap, this);
		grid.on("linktap", this.onFeedListLinkTap, this);
		grid.on("commenttap", this.onFeedListCommentButtonTap, this);
		grid.on("liketap", this.onFeedListLikeButtonTap, this);
		grid.on("selectionchange", this.onFeedListSelectionChange, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getActionManagerDefaultCondition: function() {
		return function(action) {
			return action.useInComment !== true;
		};
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionSelected: function(actionConfig) {
		var record = this.actionSelectedRecord;
		var actionClassName = actionConfig.actionClassName;
		if (actionClassName === "Terrasoft.ActionDelete" && Terrasoft.Configuration.isFeedInHybridMode()) {
			var executionConfig = {
				pageType: Terrasoft.PageTypes.Grid,
				asyncQueueId: this.getAsyncQueueId(),
				cancellationId: this.getCancellationId("actionDelete")
			};
			var isDelivered = this.isRecordDelivered(record);
			if (isDelivered) {
				executionConfig.queryConfig = {
					autoSetProxy: false,
					isLogged: false
				};
				executionConfig.proxy = "odata";
			}
			var actionManager = this.getActionManager();
			actionManager.execute(actionConfig.name, record || null, executionConfig);
		} else if (record || actionConfig.name === "add") {
			if (actionClassName === "Terrasoft.ActionEdit" || actionConfig.name === "add") {
				var view = this.getView();
				view.stopActiveAnimation();
			}
			this.callParent([actionConfig, record]);
		}
		this.actionSelectedRecord = null;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionExecutionEnd: function(action, success) {
		this.callParent(arguments);
		var actionRecord = action.getRecord();
		if (action.config.name === "Delete" && success && Terrasoft.Configuration.isFeedInHybridMode()) {
			var queryConfig = Ext.create("Terrasoft.QueryConfig", {
				isLogged: false,
				modelName: actionRecord.modelName,
				autoSetProxy: false
			});
			actionRecord.setProxy("tssql");
			actionRecord.erase({
				isCancelable: false,
				queryConfig: queryConfig,
				failure: function(exception) {
					Terrasoft.Logger.logException(Terrasoft.LogSeverityLevel.Error, exception);
				},
				scope: this
			}, this);
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	refreshDirtyDataByOperationConfig: function(operationConfig) {
		var record = operationConfig.record;
		var recordId = record.getId();
		var view = this.getView();
		var grid = view.getGrid();
		var store = grid.getStore();
		if ("isLiked" in operationConfig) {
			var storeRecord = store.getById(recordId);
			if (storeRecord) {
				store.updateSocialMessageLikedRecordIds(record, operationConfig.isLiked);
				var updater = Ext.create("Terrasoft.RecordUpdater");
				updater.update(storeRecord, record, ["LikeCount"]);
			}
			return;
		}
		if (operationConfig.isModified) {
			store.socialMessageModifiedRecordIds = Ext.Array.merge(store.socialMessageModifiedRecordIds, recordId);
		}
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getIsExtendedFiltersEnabled: function() {
		return false;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	shouldUseFolderFilters: function() {
		return false;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	shouldUseSummaries: function() {
		return false;
	}

});


