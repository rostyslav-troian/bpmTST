Terrasoft.configuration.Structures["SyncSettingsMixin"] = {innerHierarchyStack: ["SyncSettingsMixin"]};
define("SyncSettingsMixin", ["SyncSettingsMixinResources", "ModalBox", "ConfigurationConstants"],
	function(Resources, ModalBox, ConfigurationConstants) {
	Ext.define("Terrasoft.configuration.mixins.SyncSettingsMixin", {
		alternateClassName: "Terrasoft.SyncSettingsMixin",

		/**
		 * Modal dialog height.
		 * @type {Number}
		 */
		modalHeight: 300,

		/**
		 * Modal dialog width.
		 * @type {Number}
		 */
		modalWidth: 400,

		/**
		 * Submenu items, which provide actions to synchronize.
		 */
		"SynchronizeActivitiesSubmenu": {dataValueType: this.Terrasoft.DataValueType.COLLECTION},

		/**
		 * Update sync settings and than show tip.
		 */
		updateSyncSettingsSetAndShowTip: function(itemId) {
			this.getSectionActions();
			this.set("SyncSettingsId", itemId);
			this.set("IsSyncSettingsSetTipVisible", true);
		},

		/**
		 * Update sync settings collection.
		 * @param {Function} callback Callback function call after getting success response.
		 * @param {Object} scope Scope for callback function.
		 * @private
		 */
		updateSyncSettings: function(callback, scope) {
			var batchQuery = this.getSettingsBatchQuery();
			batchQuery.execute(function(response) {
				if (response && response.success) {
					var googleRows = response.queryResults[0].rows || [];
					var exchangeRows = response.queryResults[1].rows || [];
					var rows = googleRows.concat(exchangeRows);
					this.set("SyncSettings", rows);
					if (callback) {
						callback.call(scope || this);
					}
				} else {
					throw new Terrasoft.UnknownException({
						message: this.get("Resources.Strings.ErrorOnGettingSyncSettings") || Resources.localizableStrings.ErrorOnGettingSyncSettings
					});
				}
			}, this);
		},

		/**
		 * Returns batch query for getting settings.
		 * @return {Terrasoft.BatchQuery} Batch query.
		 */
		getSettingsBatchQuery: function() {
			var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
			var googleCommunicationEsq = this.getGoogleCommunicationEsq();
			var syncSettingsEsq = this.getSyncSettingsEsq();
			batchQuery.add(googleCommunicationEsq);
			batchQuery.add(syncSettingsEsq);
			return batchQuery;
		},

		/**
		 * Returns entity schema query for getting google communication.
		 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
		 */
		getGoogleCommunicationEsq: function() {
			var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SocialAccount"
			});
			this.addColumnsToGoogleCommunicationEsq(esq);
			this.addFiltersToGoogleCommunicationEsq(esq);
			return esq;
		},

		/**
		 * Add columns to google communication entity schema query.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
		 */
		addColumnsToGoogleCommunicationEsq: function(esq) {
			esq.addColumn("Login", "SenderEmailAddress");
		},

		/**
		 * Add filters to entity schema query for getting google communication for current user.
		 * @param {Terrasoft.EntitySchemaQuery} esq settings entity schema query.
		 */
		addFiltersToGoogleCommunicationEsq: function(esq) {
			esq.filters.add("typeFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.CommunicationTypes.Google));
			esq.filters.add("currentUserFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "User", this.Terrasoft.SysValue.CURRENT_USER.value));
		},

		/**
		 * Returns entity schema query for getting sync settings collection.
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
		 */
		getSyncSettingsEsq: function() {
			var schemaName = this.getSyncSettingsSchemaName();
			var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: schemaName
			});
			this.addColumnsToSyncSettings(esq);
			this.addFiltersToSyncSettingsEsq(esq);
			return esq;
		},

		/**
		 * Add filters to entity schema query for getting mailbox sync settings for current user.
		 * @param {Terrasoft.EntitySchemaQuery} esq settings entity schema query.
		 */
		addFiltersToSyncSettingsEsq: function(esq) {
			esq.filters.add("userFilter", this.Terrasoft.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.EQUAL, "MailboxSyncSettings.SysAdminUnit",
				this.Terrasoft.SysValue.CURRENT_USER.value));
		},

		/**
		 * Add columns to sync settings entity schema query.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Sync settings entity schema query.
		 */
		addColumnsToSyncSettings: function(esq) {
			esq.addColumn("Id");
			esq.addColumn("MailboxSyncSettings");
			esq.addColumn("MailboxSyncSettings.MailServer.Type", "MailServerType");
			esq.addColumn("MailboxSyncSettings.SenderEmailAddress", "SenderEmailAddress");
		},

		/**
		 * Returns sync settings entity schema name.
		 * @private
		 * @return {String} Schema name.
		 */
		getSyncSettingsSchemaName: function() {
			return this.entitySchemaName + "SyncSettings";
		},

		/**
		 * Shows sync settings dialog.
		 * @private
		 */
		showSyncDialog: function() {
			var modalBoxSize = {
				minHeight: "1",
				minWidth: "1",
				maxHeight: "100",
				maxWidth: "100"
			};
			var schemaName = this.getDialogSchemaName();
			var modalBoxContainer = ModalBox.show(modalBoxSize);
			this.sandbox.loadModule("CredentialsSyncSettingsEdit", {
				renderTo: modalBoxContainer,
				instanceConfig: {
					schemaName: schemaName,
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			});
			ModalBox.setSize(this.modalWidth, this.modalHeight);
		},

		/**
		 * Returns sync settings dialog schema name.
		 * @private
		 * @return {String} Schema name.
		 */
		getDialogSchemaName: function() {
			return this.entitySchemaName + "SyncSettingsEdit";
		},

		/**
		 * Add synchronization actions into section action item collection.
		 * @protected
		 * @param {Terrasoft.Collection} actionMenuItems Section action item collection.
		 * @param {Number} position Actions position in section actions list.
		 */
		setSyncSectionActions: function(actionMenuItems, position) {
			position = position || 0;
			this.set("SyncSettings", null);
			actionMenuItems.add(actionMenuItems.getUniqueKey(), this.getButtonMenuItem({
				"Caption": {"bindTo": "Resources.Strings.SynchronizeSubmenuCaption"},
				"Items": {"bindTo": "SynchronizeActivitiesSubmenu"}
			}), position);
			this.updateSyncSettings(function() {
				this.initSynchronizeSubmenuActionItems();
			}, this);
		},

		/**
		 * Fills the action items in the synchronize submenu.
		 * @protected
		 */
		initSynchronizeSubmenuActionItems: function() {
			var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
			collection.addItem(this.getButtonMenuItem({
				"Caption": {"bindTo": "Resources.Strings.SynchronizeNowCaption"},
				"Click": {"bindTo": "synchronizeNow"}
			}));
			collection.addItem(this.getButtonMenuItem({
				"Caption": {"bindTo": "Resources.Strings.AddNewSynchronizationAccountCaption"},
				"Click": {"bindTo": "showSyncDialog"}
			}));
			this.setExistsSyncSettingsActions(collection);
			this.set("SynchronizeActivitiesSubmenu", collection);
		},

		/**
		 * Add synchronization actions into section action item collection for exists sync settings.
		 * @private
		 * @param {Terrasoft.Collection} actionMenuItems Section action item collection.
		 * @param {Number} position Actions position in section actions list.
		 */
		setExistsSyncSettingsActions: function(actionMenuItems) {
			var settings = this.get("SyncSettings");
			actionMenuItems.addItem(this.getButtonMenuItem({
				"Type": "Terrasoft.MenuSeparator",
				"Caption": ""
			}));
			this.Terrasoft.each(settings, function(item) {
				var settingId = item.MailboxSyncSettings ? item.MailboxSyncSettings.value : null;
				var caption = this.getSetUpExistsSyncSettingsActionCaption(item.SenderEmailAddress);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {bindTo: "navigateToSyncSettings"},
					"Tag": settingId,
					"Caption": caption
				}));
			}, this);
		},

		/**
		 * Returns action caption for set up exists settings.
		 * @private
		 * @return {String} Action caption.
		 */
		getSetUpExistsSyncSettingsActionCaption: function(email) {
			return this.Ext.String.format(this.get("Resources.Strings.SetUpExistsSyncSettings") || 
				Resources.localizableStrings.SetUpExistsSyncSettings, email);
		},

		/**
		 * Navigate to set up sync settings page.
		 * @protected
		 * @param {Guid} mailboxSyncSettingsId Mailbox settings id.
		 */
		navigateToSyncSettings: function(mailboxSyncSettingsId) {
			if (mailboxSyncSettingsId) {
				this.openExchangeSettingsPage(mailboxSyncSettingsId);
			} else {
				this.openGoogleSettingsPage();
			}
			return false;
		},

		/**
		 * Open sync settings page for exchange synchronization.
		 * @param {Guid} mailboxSyncSettingsId Sync settings Id for exchange synchronization.
		 */
		openExchangeSettingsPage: function(mailboxSyncSettingsId) {
			var historyState = this.sandbox.publish("GetHistoryState");
			var prevHash = historyState.hash;
			var tabName = this.getSyncSettingsTabName();
			var newState = {
				recordId: mailboxSyncSettingsId,
				activeTabName: tabName
			};
			var hash = "BaseSchemaModuleV2/SyncSettings";
			if (prevHash && prevHash.historyState === hash) {
				this.sandbox.publish("ReloadSettings", newState);
			} else {
				this.sandbox.publish("PushHistoryState", {
					hash: hash,
					stateObj: newState
				});
			}
		},

		/**
		 * Navigate to set up sync settings page after updating sync settings data.
		 * @protected
		 */
		navigateToSyncSettingsWithSyncSettingsUpdate: function() {
			var itemId = this.get("SyncSettingsId");
			this.navigateToSyncSettings(itemId);
			return false;
		},

		/**
		 * Returns sync settings tab name.
		 * @return {String} Tab name.
		 */
		getSyncSettingsTabName: function() {
			return this.entitySchemaName + "SettingsTab";
		},

		/**
		 * Start synchronization with google account.
		 */
		synchronizeGoogle: this.Terrasoft.emptyFn,

		/**
		 * Start synchronization with exchange account.
		 */
		synchronizeExchange: this.Terrasoft.emptyFn,

		/**
		 * Returns set sync settings section action caption.
		 * @protected
		 * @return {String} Caption.
		 */
		getSetSyncSettingsCaption: this.Terrasoft.emptyFn
	});

	return Terrasoft.SyncSettingsMixin;
});


