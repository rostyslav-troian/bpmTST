Terrasoft.configuration.Structures["AccountLookupMiniPageMixin"] = {innerHierarchyStack: ["AccountLookupMiniPageMixin"]};
define("AccountLookupMiniPageMixin", [], function() {
	Ext.define("Terrasoft.configuration.mixins.AccountLookupMiniPageMixin", {
		alternateClassName: "Terrasoft.AccountLookupMiniPageMixin",

		//region Methods: Private

		/**
		 * Returns id of current module.
		 * @param {String} columnName Name of lookup column.
		 * @returns {String} Module id.
		 * @private
		 */
		_getModuleId: function(columnName) {
			return Ext.String.format("{0}_LookupPage_{1}_CardModule", this.sandbox.id, columnName);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Opens mini page of account.
		 * @protected
		 * @param {String} columnName Name of account's lookup column which opens.
		 */
		openAccountMiniPage: function(columnName) {
			const config = this.getCustomMiniPageConfig(columnName);
			this.openMiniPage(config);
		},

		/**
		 * Returns config of account mini page.
		 * @protected
		 * @param {String} lookupInfo Information about opened lookup.
		 * @returns {Object} Mini page config.
		 */
		getCustomMiniPageConfig: function(lookupInfo) {
			return {
				entitySchemaName: "Account",
				operation: this.Terrasoft.ConfigurationEnums.CardOperation.ADD,
				miniPageSchemaName: "PortalAccountMiniPage",
				moduleId : this._getModuleId(lookupInfo.columnName),
				valuePairs: lookupInfo.miniPageDefValues
			};
		},

		//endregion

		//region Methods: Public

		/**
		 * Binds mini card opening to lookup page.
		 * @param {Object} lookupInfo Lookup information.
		 * @param {Object} scope Lookup scope.
		 */
		bindAccountMiniPage: function(lookupInfo, scope) {
			scope.actionButtonClick = function() {
				Terrasoft.LookupUtilities.HideModalBox();
				lookupInfo.openAccountMiniPage(lookupInfo);
			}.bind(scope);
		},

		/**
		 * Applies custom lookup config to the given config.
		 * @param {Object} config Lookup config.
		 * @returns {Object} Custom lookup config.
		 */
		applyLookupCustomConfig: function(config) {
			config.canAddWithoutPages = true;
			this.Ext.apply(config, {bindAccountMiniPage: this.bindAccountMiniPage.bind(this)});
			this.Ext.apply(config, {openAccountMiniPage: this.openAccountMiniPage.bind(this)});
			return config;
		},

		/**
		 * Checks if the given column is reference to account.
		 * @param {String} columnName Name of lookup account column.
		 * @returns {Boolean} Is account lookup column.
		 */
		isAccountLookupColumn: function (columnName) {
			const column = this.columns[columnName];
			return column && column.referenceSchemaName === "Account";
		}

		//endregion

	});
});


