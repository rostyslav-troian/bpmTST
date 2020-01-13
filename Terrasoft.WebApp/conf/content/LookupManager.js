Terrasoft.configuration.Structures["LookupManager"] = {innerHierarchyStack: ["LookupManager"]};
define("LookupManager", ["RightUtilities", "LookupManagerItem", "AnalyticsManager"], function(RightUtilities) {
	/**
	 * @class Terrasoft.LookupManager
	 * Lookup manager class.
	 */
	Ext.define("Terrasoft.manager.LookupManager", {
		extend: "Terrasoft.AnalyticsManager",
		alternateClassName: "Terrasoft.LookupManager",
		singleton: true,

		//region Properties: Protected

		/**
		 * The name of the manager class element.
		 * @protected
		 * @type {String}
		 */
		itemClassName: "Terrasoft.LookupManagerItem",

		/**
		 * Name of scheme.
		 * @protected
		 * @type {String}
		 */
		entitySchemaName: "Lookup",

		/**
		 * Accessibility guides to edit the current user flag
		 * @protected
		 * @type {Boolean}
		 */
		canManageLookups: null,

		/**
		 * Object properties matching columns.
		 * @protected
		 * @type {Object}
		 */
		propertyColumnNames: {
			name: "Name",
			description: "Description",
			sysEntitySchemaUId: "SysEntitySchemaUId",
			sysPageSchemaUId: "SysPageSchemaUId",
			sysEntitySchemaName: "[SysSchema:UId:SysEntitySchemaUId].Name",
			sysLookup: "SysLookup"
		},

		//endregion

		//region Methods: Protected

		/**
		 * Checks authority rights for lookups editing, initialize inner parameter.
		 * @protected
		 * @virtual
		 * @param {Function} callback callback function.
		 * @param {Object} scope callback function context.
		 */
		initCanManageLookups: function(callback, scope) {
			RightUtilities.checkCanExecuteOperation({
				operation: "CanManageLookups"
			}, function(result) {
				this.canManageLookups = result;
				callback.call(scope);
			}, this);
		},

		/**
		 * Checks if manager is initialized.
		 * @protected
		 * @throws {Terrasoft.InvalidObjectState}
		 * @throws {Terrasoft.UnauthorizedException}
		 */
		checkIsInitialized: function() {
			this.callParent(arguments);
			if (!this.getCanManageLookups()) {
				throw new Terrasoft.UnauthorizedException();
			}
		},

		//endregion

		//region Methods: Public

		/**
		 * Finds item in manager by SysEntitySchemaUId.
		 * @param {Object} sysEntitySchemaUId entity schema uid.
		 * @return {Object} Lookup manager item.
		 */
		findItemBySysEntitySchemaUId: function(sysEntitySchemaUId) {
			var lookupManagerItems = this.getItems();
			var managerItem = null;
			lookupManagerItems.each(function(item) {
				if (item.sysEntitySchemaUId === sysEntitySchemaUId) {
					managerItem = item;
					return false;
				}
			});
			return managerItem;
		},

		/**
		 * Returns information about lookup editing possibility.
		 * @virtual
		 * @return {boolean} true - if current user can edit lookup,
		 * false - in other case.
		 */
		getCanManageLookups: function() {
			return this.canManageLookups === true;
		},

		/**
		 * Initialize manager items.
		 * @override
		 * @param {Object} config Configuration object.
		 * @param {Function} callback callback function.
		 * @param {Object} scope callback function context.
		 */
		initialize: function(config, callback, scope) {
			if (Ext.isEmpty(this.canManageLookups)) {
				this.initCanManageLookups(function() {
					if (this.getCanManageLookups()) {
						this.initialize(config, callback, scope);
					} else {
						this.initialized = true;
						callback.call(scope);
					}
				}, this);
			} else {
				this.callParent(arguments);
			}
		}

		//endregion

	});
	return Terrasoft.LookupManager;
});


