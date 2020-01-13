Terrasoft.configuration.Structures["FileImportMixin"] = {innerHierarchyStack: ["FileImportMixin"]};
define("FileImportMixin", [
	"FileImportMixinResources", "RightUtilities", "GoogleTagManagerUtilities", "SystemOperationsPermissionsMixin"
], function(res, RightUtilities) {
	/**
	 * FileImport mixin class.
	 * Provides methods for opening file import wizard from everywhere.
	 * @class Terrasoft.FileImportMixin
	 */
	Ext.define("Terrasoft.FileImportMixin", {
		alternateClassName: "Terrasoft.configuration.mixins.FileImportMixin",
		mixins: {
			SystemOperationsPermissionsMixin: "Terrasoft.SystemOperationsPermissionsMixin"
		},

		// region Fields: Private

		/**
		 * @private
		 */
		_resources: res,

		/**
		 * @private
		 */
		_waitOpenWindowTimeout: 1000,

		/**
		 * @private
		 */
		_excludedSysEntities: [
			"SysAdminUnit", "SysAdminUnitInRole", "SysUserInRole", "SysTranslation"
		],

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_initMixinResources: function() {
			Terrasoft.each(this._resources.localizableStrings, function(item, key) {
				this.set("Resources.Strings." + key, item);
			}, this);
		},

		/**
		 * @private
		 */
		_initCanImportFromExcel: function() {
			RightUtilities.checkCanExecuteOperation({
				operation: "CanImportFromExcel"
			}, this._onCanImportFromExcelComplete, this);
		},

		/**
		 * @private
		 */
		_onCanImportFromExcelComplete: function(result) {
			this.set("CanImportFromExcel", result);
		},

		/**
		 * @private
		 */
		_getImportWizardUrl: function(schemaName) {
			const importSessionId = this.getUniqueImportSessionId();
			return Terrasoft.combinePath(Terrasoft.workspaceBaseUrl, "Nui",
					"ViewModule.aspx?vm=FileImportWizard#FileImportModule/FileImportStartPage",
					importSessionId, schemaName);
		},

		/**
		 * @private
		 */
		_getResources: function() {
			return this._resources;
		},

		/**
		 * @private
		 */
		_getSysEntityFilters: function() {
			const comparisonTypeNotStartWith = Terrasoft.ComparisonType.NOT_START_WITH;
			const sysFilters = Terrasoft.createFilterGroup();
			sysFilters.name = "sysFilters";
			sysFilters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			sysFilters.add("NotSysFilter", Terrasoft.createColumnFilterWithParameter(
					comparisonTypeNotStartWith, "Name", "Sys", Terrasoft.DataValueType.TEXT
			));
			const notInFilter = Terrasoft.createColumnInFilterWithParameters("Name", this._excludedSysEntities);
			notInFilter.comparisonType = Terrasoft.ComparisonType.EQUAL;
			sysFilters.add("SysFilter", notInFilter);
			return sysFilters;
		},

		// endregion

		// region Methods: Protected

		/**
		 * Forms import session identifier.
		 * @protected
		 * @return {String} Unique identifier of the import session.
		 */
		getUniqueImportSessionId: function() {
			return Terrasoft.generateGUID();
		},

		/**
		 * Applies entity Name column filters for entities select.
		 * @protected
		 * @param {Terrasoft.FilterGroup} filters Filters for apply naming conditions.
		 */
		applyEntityNameFilters: function(filters) {
			const comparisonTypeNotStartWith = Terrasoft.ComparisonType.NOT_START_WITH;
			const comparisonTypeNotEndWith = Terrasoft.ComparisonType.NOT_END_WITH;
			const textValueType = Terrasoft.DataValueType.TEXT;
			filters.add("NameVwFilter", Terrasoft.createColumnFilterWithParameter(
					comparisonTypeNotStartWith, "Name", "Vw", textValueType
			));
			filters.add("NameBaseFilter", Terrasoft.createColumnFilterWithParameter(
					comparisonTypeNotStartWith, "Name", "Base", textValueType
			));
			filters.add("NameLczFilter", Terrasoft.createColumnFilterWithParameter(
					comparisonTypeNotEndWith, "Name", "Lcz", textValueType
			));
			filters.add("NameSettingsFilter", Terrasoft.createColumnFilterWithParameter(
					comparisonTypeNotEndWith, "Name", "Settings", textValueType
			));
			filters.add("NameLookupFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.NOT_EQUAL, "Name", "Lookup", textValueType
			));
		},

		/**
		 * Returns mixins localizable images.
		 * @protected
		 * @virtual
		 * @return {Object} Localizable images object.
		 */
		getLocalizableImages: function() {
			const resources = this._getResources();
			return resources && resources.localizableImages;
		},

		/**
		 * Opens url in a new window. If it is blocked, shows message about it.
		 * @protected
		 * @param {String} url Url to open.
		 */
		navigateToUrl: function(url) {
			const popup = window.open(url, "_blank");
			setTimeout(function() {
				if (!popup || popup.outerHeight === 0) {
					Terrasoft.showInformation(this.get("Resources.Strings.DataImportPopupBlockedMessage"));
				}
			}, this._waitOpenWindowTimeout);
		},

		/**
		 * Initializes data import availability for current schema entity.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		initDataImportAvailability: function(callback, scope) {
			if (Ext.isEmpty(this.entitySchemaName)) {
				this.$IsImportAvailable = false;
				Ext.callback(callback, scope || this);
				return;
			}
			const esq = this.getEntitySchemaEsq();
			const filters = Terrasoft.createFilterGroup();
			filters.name = "vwFilters";
			filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			filters.add("CurrentSchemaFilter",
					esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Name", this.entitySchemaName));
			esq.filters.add("SchemaFilter", filters);
			esq.getEntityCollection(function(response) {
				if (response && response.success) {
					this.$IsImportAvailable = response.collection.getCount() === 1;
				} else {
					this.$IsImportAvailable = false;
				}
				Ext.callback(callback, scope || this);
			}, this);
		},

		/**
		 * Forms query for getting entities which are allowed for data import.
		 * @protected
		 * @return {Terrasoft.EntitySchemaQuery} Select query for entities.
		 */
		getEntitySchemaEsq: function() {
			const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "VwSysSchemaInWorkspace",
				rowCount: 1,
				clientESQCacheParameters: {
					cacheItemName: this.getFileImportCacheItemName()
				},
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
					cacheGroup: "FileImportAvailability",
					cacheItemName: this.getFileImportCacheItemName()
				}
			});
			esq.addColumn("UId");
			esq.filters.add("excludedFilters", this.getEntitySchemaFilters());
			return esq;
		},

		// endregion

		// region Methods: Public

		/**
		 * Sends Google tag manager data.
		 */
		sendGoogleTagManagerImportData: function() {
			const isGoogleTagManagerEnabled = this.get("IsGoogleTagManagerEnabled");
			if (!isGoogleTagManagerEnabled) {
				return;
			}
			const data = Ext.isFunction(this.getGoogleTagManagerData) ? this.getGoogleTagManagerData() : {};
			Ext.apply(data, {
				schemaName: this.entitySchemaName,
				moduleName: this.getFileImportCacheItemName()
			});
			Terrasoft.GoogleTagManagerUtilities.actionModule(data);
		},

		/**
		 * Get file import cache name for current entity schema.
		 * @return {String} Cache name for current entity schema.
		 */
		getFileImportCacheItemName: function() {
			return Ext.String.format("FileImport_{0}", this.entitySchemaName);
		},

		/**
		 * Initializes mixin state.
		 * Initializes resources and Import rights.
		 */
		init: function() {
			this.set("IsImportAvailable", false);
			this._initMixinResources();
			this.initDataImportAvailability(function() {
				this._initCanImportFromExcel();
			}, this);
		},

		/**
		 * Opens file import wizard for current entity schema.
		 */
		openFileImportWizard: function() {
			if (this.$CanImportFromExcel) {
				const url = this._getImportWizardUrl(this.entitySchemaName);
				this.sendGoogleTagManagerImportData();
				this.navigateToUrl(url);
			} else {
				this.showPermissionsErrorMessage("CanImportFromExcel");
			}
		},

		/**
		 * Checks menu item visibility.
		 * @return {Boolean} Import menu item visibility sign.
		 */
		getDataImportMenuItemVisible: function() {
			if (!this.$IsImportDisabled) {
				return this.$IsImportAvailable && !this.$MultiSelect && !this.$SelectAllMode;
			} else {
				return false;
			}
		},

		/**
		 * Returns config of the data import menu item for sections and details.
		 * @return {Object} Config of the menu item.
		 */
		getFileImportMenuItemCfg: function() {
			if (this.$IsImportDisabled) {
				return null;
			}
			const localizableImages = this.getLocalizableImages();
			return {
				"Caption": {"bindTo": "Resources.Strings.ImportFromFileButtonCaption"},
				"Click": {"bindTo": "openFileImportWizard"},
				"ImageConfig": localizableImages.ImportFromFileButtonImage,
				"Visible": {"bindTo": "getDataImportMenuItemVisible"}
			};
		},

		/**
		 * Creates data import menu item for section actions.
		 * @virtual
		 * @return {Object} Data import menu item.
		 */
		getDataImportMenuItem: function() {
			const config = this.getFileImportMenuItemCfg();
			return Ext.isEmpty(config) ? null : this.getButtonMenuItem(config);
		},

		/**
		 * Gets import object query filters.
		 * @return {Terrasoft.data.filters.FilterGroup} Filters for entities select.
		 */
		getEntitySchemaFilters: function() {
			const filters = Terrasoft.createFilterGroup();
			filters.name = "vwFilters";
			filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			const sysFilters = this._getSysEntityFilters();
			filters.add("NameSysFilter", sysFilters);
			filters.add("SysWorkspaceNameFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace.Id", Terrasoft.SysValue.CURRENT_WORKSPACE.value,
					Terrasoft.DataValueType.TEXT
			));
			filters.add("ManagerNameFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "ManagerName", "EntitySchemaManager", Terrasoft.DataValueType.TEXT
			));
			filters.add("ExtendParentFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "ExtendParent", false, Terrasoft.DataValueType.BOOLEAN
			));
			this.applyEntityNameFilters(filters);
			return filters;
		}

		// endregion

	});
});


