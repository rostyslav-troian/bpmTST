Terrasoft.configuration.Structures["MobileInvoiceGridPage"] = {innerHierarchyStack: ["MobileInvoiceGridPage"]};
/* globals Invoice: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "Terrasoft.configuration.InvoiceGridPageController",
	viewXClass: "Terrasoft.configuration.InvoiceGridPageView"
};

Ext.define("Terrasoft.configuration.store.InvoiceGridPage", {
	extend: "Terrasoft.store.BaseStore",
	alternateClassName: "Terrasoft.configuration.InvoiceGridPageStore",

	config: {
		model: "Invoice",
		controller: "Terrasoft.configuration.InvoiceGridPageController"
	}
});

if (Terrasoft.Features.getIsEnabled("UseMobileInvoiceCacheManager") && Terrasoft.ModelCache.isEnabled()) {
	Ext.define("Terrasoft.configuration.view.InvoiceGridPage", {
		extend: "Terrasoft.view.BaseGridPage.View",
		alternateClassName: "Terrasoft.configuration.InvoiceGridPageView",

		config: {
			id: "InvoiceGridPage",
			grid: {
				store: "Terrasoft.configuration.InvoiceGridPageStore"
			}
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		isStateButtonDisabled: function() {
			return false;
		}

	});

	Ext.define("Terrasoft.configuration.controller.InvoiceGridPage", {
		extend: "Terrasoft.controller.BaseGridPage",
		alternateClassName: "Terrasoft.configuration.InvoiceGridPageController",

		mixins: {
			cacheSyncStateMixin: "Terrasoft.CacheSyncStateControllerMixin"
		},

		statics: {
			Model: Invoice
		},

		config: {
			refs: {
				view: "#InvoiceGridPage"
			}
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		initializeGrid: function(gridView) {
			this.callParent(arguments);
			if (this.canUseCache()) {
				this.mixins.cacheSyncStateMixin.initializePageState.apply(this);
				Terrasoft.Application.on("resume", this.onApplicationResume, this);
			}
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		onInformationPanelRefreshButtonTap: function() {
			this.mixins.cacheSyncStateMixin.onInformationPanelRefreshButtonTap.apply(this, arguments);
			if (!Terrasoft.SyncManager.hasSyncOperations()) {
				this.synchronizeToCacheIfAvailable();
			}
		},

		/**
		 * Called when app is resumed.
		 * @protected
		 * @virtual
		 */
		onApplicationResume: function() {
			this.synchronizeToCacheIfAvailable();
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		setState: function(state, stateData) {
			this.callParent(arguments);
			this.mixins.cacheSyncStateMixin.setState.apply(this, [state, stateData]);
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		synchronizeToCacheIfAvailable: function() {
			this.callParent(arguments);
			this.mixins.cacheSyncStateMixin.setDataLoadingState.apply(this);
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		onStateButtonTap: function(view, state) {
			this.mixins.cacheSyncStateMixin.onStateButtonTap.apply(this, arguments);
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		onMainModelSynchronized: function(hasChanges) {
			this.callParent(arguments);
			this.mixins.cacheSyncStateMixin.onMainModelSynchronized.apply(this, arguments);
		}

	});
} else {
	Ext.define("Terrasoft.configuration.view.InvoiceGridPage", {
		extend: "Terrasoft.view.BaseGridPage.View",
		alternateClassName: "Terrasoft.configuration.InvoiceGridPageView",

		config: {
			id: "InvoiceGridPage",
			grid: {
				store: "Terrasoft.configuration.InvoiceGridPageStore"
			}
		}

	});

	Ext.define("Terrasoft.configuration.controller.InvoiceGridPage", {
		extend: "Terrasoft.controller.BaseGridPage",
		alternateClassName: "Terrasoft.configuration.InvoiceGridPageController",

		statics: {
			Model: Invoice
		},

		config: {
			refs: {
				view: "#InvoiceGridPage"
			}
		}

	});
}


