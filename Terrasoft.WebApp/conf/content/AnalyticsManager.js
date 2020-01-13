Terrasoft.configuration.Structures["AnalyticsManager"] = {innerHierarchyStack: ["AnalyticsManager"]};
define("AnalyticsManager", ["GoogleTagManagerMixin"], function() {

	/**
	 * @class Terrasoft.AnalyticsManager
	 * @abstract
	 */
	Ext.define("Terrasoft.manager.AnalyticsManager", {
		extend: "Terrasoft.manager.ObjectManager",
		alternateClassName: "Terrasoft.AnalyticsManager",
		mixins: {
			/**
			 * @class GoogleTagManagerMixin Used to work with google analytics.
			 */
			GoogleTagManagerMixin: "Terrasoft.GoogleTagManagerMixin"
		},

		//region Methods: Private

		/**
		 * Gets modified items.
		 * @private
		 * @return {Terrasoft.ObjectManagerItem[]} Array items filtered by filterFn.
		 */
		_getModifiedItems: function() {
			return this.filterByFn(function(item) {
				return item.getIsNew() || item.getIsChanged() ||item.getIsDeleted();
			}, this);
		},

		/**
		 * Send GTM data to google analytics.
		 */
		_sendToGoogleAnalytics: function() {
			const modifiedItemsString = this.getModifiedItemsString();
			if (Terrasoft.isEmpty(modifiedItemsString)) {
				return;
			}
			const data = this.getGoogleTagManagerData({
				moduleName: "SectionPageWizard",
				description: modifiedItemsString,
				action: this.entitySchemaName
			});
			this.sendGoogleTagManagerData(data);
		},

		// endregion

		//region Methods: Protected

		/**
		 * Gets names of modified items for all groups.
		 * @protected
		 * @return {String} Formatted string with names of modified items for all groups.
		 */
		getModifiedItemsString: function() {
			const modifiedItems = this._getModifiedItems();
			const modifiedItemsArr = [];
			modifiedItems.each(function(item) {
				modifiedItemsArr.push(item.getModifiedString());
			}, this);
			return Terrasoft.isEmpty(modifiedItemsArr)
				? Terrasoft.emptyString
				: Ext.String.format("[{0}: {1}]", this.entitySchemaName, modifiedItemsArr.join(","));
		},

		// endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.ObjectManager#initializeManager
		 * @override
		 */
		initializeManager: function(callback, scope) {
			this.initGoogleTagManager();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ObjectManager#save
		 * @override
		 */
		save: function(callback, scope) {
			if (this.getGoogleTagManagerEnabled()) {
				this._sendToGoogleAnalytics();
			}
			this.callParent(arguments);
		}

		// endregion

	});

	return Terrasoft.PortalColumnAccessListManager;
});


