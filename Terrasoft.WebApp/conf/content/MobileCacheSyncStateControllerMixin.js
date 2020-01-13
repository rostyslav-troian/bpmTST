Terrasoft.configuration.Structures["MobileCacheSyncStateControllerMixin"] = {innerHierarchyStack: ["MobileCacheSyncStateControllerMixin"]};
/**
 * @class Terrasoft.configuration.CacheSyncStateControllerMixin
 * Mixin that adds state of cache sync functionalilty in grid page.
 */
Ext.define("Terrasoft.configuration.CacheSyncStateControllerMixin", {
	alternateClassName: "Terrasoft.CacheSyncStateControllerMixin",

	/**
	 * @private
	 */
	hasExportConflicts: false,

	/**
	 * @private
	 */
	autoShowNoConnectionStatusPanel: null,

	/**
	 * @private
	 */
	stateData: null,

	/**
	 * @private
	 */
	isMainModelSynchronized: false,

	/**
	 * @private
	 */
	subscribeSyncManagerEvents: function() {
		Terrasoft.SyncManager.on("syncstart", this.onSynchronizationStarted, this);
		Terrasoft.SyncManager.on("syncfinish", this.onSynchronizationFinished, this);
		Terrasoft.SyncManager.on("syncfailed", this.onSynchronizationFailed, this);
	},

	/**
	 * @private
	 */
	unsubscribeSyncManagerEvents: function() {
		Terrasoft.SyncManager.un("syncstart", this.onSynchronizationStarted, this);
		Terrasoft.SyncManager.un("syncfinish", this.onSynchronizationFinished, this);
		Terrasoft.SyncManager.un("syncfailed", this.onSynchronizationFailed, this);
	},

	/**
	 * @private
	 */
	getImportLastSyncDateKey: function() {
		return this.getModelName() + "ImportLastSyncDate";
	},

	/**
	 * @private
	 */
	loadImportLastSyncDate: function() {
		var manager = this.getDataCacheManager();
		if (manager && manager instanceof Terrasoft.SynchronizableCacheManager) {
			return manager.getMainModelLastSyncDate();
		} else {
			return Promise.resolve();
		}
	},

	/**
	 * @private
	 */
	formatLastSyncDateMessage: function(lastSyncDate) {
		if (Terrasoft.util.isEmptyDate(lastSyncDate)) {
			return "";
		}
		var lastSyncDateFormatted = Ext.Date.format(lastSyncDate, Terrasoft.Date.getDateTimeFormat());
		return Ext.String.format("{0} {1}", Terrasoft.LS.GridPageLastSyncDateMessage, lastSyncDateFormatted);
	},

	/**
	 * @private
	 */
	getInformationPanelRefreshButtonConfig: function() {
		return {
			text: Terrasoft.LS.GridPageInformationPanelRefreshButtonText,
			cls: "cf-information-panel-refresh-button",
			iconCls: "ts-refresh-blue-icon",
			listeners: {
				tap: this.onInformationPanelRefreshButtonTap,
				scope: this
			}
		};
	},

	/**
	 * Initializes state of page.
	 * @protected
	 * @virtual
	 */
	initializePageState: function() {
		var isDetail = this.isDetail();
		if (!isDetail) {
			this.subscribeSyncManagerEvents();
			var view = this.getView();
			view.setState(Terrasoft.PageState.Default);
		}
	},

	/**
	 * Checks if main synchronization is finished.
	 * @protected
	 * @virtual
	 * @return {Boolean} True, if finished.
	 */
	isMainSyncFinished: function() {
		return !Terrasoft.SyncManager.hasActiveSyncOperations(Terrasoft.SyncRunType.Export) &&
			this.isMainModelSynchronized;
	},

	/**
	 * Sets page default state.
	 * @protected
	 * @virtual
	 */
	setDefaultState: function() {
		this.setState(Terrasoft.PageState.Default);
	},

	/**
	 * Sets page state for loading data action.
	 * @protected
	 * @virtual
	 */
	setDataLoadingState: function() {
		this.isMainModelSynchronized = false;
		this.setState(Terrasoft.PageState.DataLoading);
	},

	/**
	 * Handles state change.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.PageState} state State of page.
	 * @param {Object} stateData State properties.
	 */
	setState: function(state, stateData) {
		if (this.hasExportConflicts && state === Terrasoft.PageState.Default) {
			state = Terrasoft.PageState.DataLoadingError;
		} else {
			this.stateData = stateData;
		}
		if (state !== Terrasoft.PageState.DataLoading && state !== Terrasoft.PageState.NoConnection) {
			this.autoShowNoConnectionStatusPanel = false;
		}
		if (state === Terrasoft.PageState.NoConnection && this.autoShowNoConnectionStatusPanel) {
			this.showNoConnectionStateInformationPanel();
		}
	},

	/**
	 * Calls when cache model is synchronized.
	 * @protected
	 * @virtual
	 */
	onMainModelSynchronized: function() {
		this.isMainModelSynchronized = true;
		if (this.isMainSyncFinished()) {
			this.setDefaultState();
		}
	},

	/**
	 * Shows information panel for state "NoConnection".
	 * @protected
	 * @virtual
	 */
	showNoConnectionStateInformationPanel: function() {
		this.loadImportLastSyncDate().then(function(lastSyncDate) {
			var view = this.getView();
			var lastSyncDateMessage = lastSyncDate ? this.formatLastSyncDateMessage(lastSyncDate) : "";
			var panel = view.createStateInformationPanel(Terrasoft.PageState.NoConnection, {
				message: Terrasoft.LS.GridPageNoConnectionStateMessage,
				additionalMessage: lastSyncDateMessage,
				buttons: [this.getInformationPanelRefreshButtonConfig()]
			});
			var closeButton = panel.getCloseButton();
			closeButton.on("tap", this.onNoConnectionPanelCloseButtonTap, this);
			view.showStateInformationPanel(panel);
		}.bind(this));
	},

	/**
	 * Shows information panel for state "ServiceUnavailable".
	 * @protected
	 * @virtual
	 */
	showServiceUnavailableStateInformationPanel: function() {
		this.loadImportLastSyncDate().then(function(lastSyncDate) {
			var view = this.getView();
			var lastSyncDateMessage = lastSyncDate ? this.formatLastSyncDateMessage(lastSyncDate) : "";
			var panel = view.createStateInformationPanel(Terrasoft.PageState.ServiceUnavailable, {
				message: this.stateData.exception.getMessage(),
				additionalMessage: lastSyncDateMessage,
				buttons: [this.getInformationPanelRefreshButtonConfig()]
			});
			view.showStateInformationPanel(panel);
		}.bind(this));
	},

	/**
	 * Shows information panel for state "DataLoadingError", if error occurs while exporting.
	 * @protected
	 * @virtual
	 */
	showExportErrorInformationPanel: function() {
		var view = this.getView();
		var panel = view.createStateInformationPanel(Terrasoft.PageState.DataLoadingError, {
			message: Terrasoft.LS.GridPageExportErrorMessage,
			buttons: [
				{
					text: Terrasoft.LS.GridPageExportErrorMoreButtonText,
					cls: "cf-export-error-details-button",
					iconCls: "ts-info-blue-icon",
					listeners: {
						tap: this.onExportErrorDetailsButtonTap,
						scope: this
					}
				}
			]
		});
		view.showStateInformationPanel(panel);
	},

	/**
	 * Shows information panel for state "DataLoading".
	 * @protected
	 * @virtual
	 */
	showDataLoadingInformationPanel: function() {
		var view = this.getView();
		var panel = view.createStateInformationPanel(Terrasoft.PageState.DataLoading, {
			message: Terrasoft.LS.GridPageDataLoadingMessage
		});
		view.showStateInformationPanel(panel);
	},

	/**
	 * Shows information panel for state "Default".
	 * @protected
	 * @virtual
	 */
	showDataLoadedInformationPanel: function() {
		this.loadImportLastSyncDate().then(function(lastSyncDate) {
			var view = this.getView();
			var lastSyncDateMessage = lastSyncDate ? this.formatLastSyncDateMessage(lastSyncDate) : "";
			var panel = view.createStateInformationPanel(Terrasoft.PageState.Default, {
				message: Terrasoft.LS.GridPageDataLoadedMessage,
				additionalMessage: lastSyncDateMessage
			});
			view.showStateInformationPanel(panel);
		}.bind(this));
	},

	/**
	 * Called when synchronization started.
	 * @protected
	 * @virtual
	 */
	onSynchronizationStarted: function(syncManager, queueItem) {
		if (queueItem.getRunType() === Terrasoft.SyncRunType.Export) {
			this.setState(Terrasoft.PageState.DataLoading);
		}
	},

	/**
	 * Called when synchronization finished.
	 * @protected
	 * @virtual
	 */
	onSynchronizationFinished: function(syncManager, syncQueueItem) {
		if (syncQueueItem && syncQueueItem.getRunType() === Terrasoft.SyncRunType.Export) {
			this.hasExportConflicts = false;
		}
		if (this.isMainSyncFinished()) {
			this.setDefaultState();
		}
	},

	/**
	 * Called when synchronization failed.
	 * @protected
	 * @virtual
	 */
	onSynchronizationFailed: function(syncManager, syncQueueItem, exception) {
		if (exception instanceof Terrasoft.NoInternetConnectionException) {
			this.setState(Terrasoft.PageState.NoConnection);
		} else if (exception instanceof Terrasoft.ServiceUnavailableException) {
			this.setState(Terrasoft.PageState.ServiceUnavailable, {
				exception: exception
			});
		} else {
			this.hasExportConflicts = exception instanceof Terrasoft.DataExportException;
			this.setState(Terrasoft.PageState.DataLoadingError, {
				exception: exception
			});
		}
	},

	/**
	 * Called when state button has been tapped.
	 * @protected
	 * @virtual
	 */
	onStateButtonTap: function(view, state) {
		switch (state) {
			case Terrasoft.PageState.NoConnection:
				this.showNoConnectionStateInformationPanel();
				break;
			case Terrasoft.PageState.ServiceUnavailable:
				this.showServiceUnavailableStateInformationPanel();
				break;
			case Terrasoft.PageState.DataLoadingError:
				if (this.hasExportConflicts) {
					this.showExportErrorInformationPanel();
				} else {
					Terrasoft.MessageBox.showException(this.stateData.exception);
				}
				break;
			case Terrasoft.PageState.DataLoading:
				this.showDataLoadingInformationPanel();
				break;
			case Terrasoft.PageState.Default:
				this.showDataLoadedInformationPanel();
				break;
			default:
				break;
		}
	},

	/**
	 * Called when refresh data button of information panel has been tapped.
	 * @protected
	 * @virtual
	 */
	onInformationPanelRefreshButtonTap: function() {
		this.autoShowNoConnectionStatusPanel = true;
		var view = this.getView();
		view.hideStateInformationPanel();
		if (Terrasoft.SyncManager.hasSyncOperations()) {
			Terrasoft.SyncManager.reRunSync();
		}
	},

	/**
	 * Called when close button of "NoConnection" state panel has been tapped.
	 * @protected
	 * @virtual
	 */
	onNoConnectionPanelCloseButtonTap: function() {
		this.autoShowNoConnectionStatusPanel = false;
	},

	/**
	 * Called when export conflicts detail button of state panel has been tapped.
	 * @protected
	 * @virtual
	 */
	onExportErrorDetailsButtonTap: function() {
		var view = this.getView();
		view.hideStateInformationPanel(false);
		Terrasoft.util.openPage({
			controllerName: "Terrasoft.controller.MobileSyncLogPage",
			viewXClass: "Terrasoft.view.MobileSyncLogPage"
		});
	}

});


