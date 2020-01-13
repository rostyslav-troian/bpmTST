Terrasoft.configuration.Structures["TimelineManager"] = {innerHierarchyStack: ["TimelineManager"]};
define("TimelineManager", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * Timeline manager.
	 */
	Ext.define("Terrasoft.manager.TimelineManager", {
		alternateClassName: "Terrasoft.TimelineManager",

		singleton: true,

		// region Properties: Private

		/**
		 * Initialization property.
		 * @private
		 * @property {Boolean} _initialized.
		 */
		_initialized: false,

		/**
		 * Indicates whether manager is in initialization process.
		 * @private
		 * @property {Boolean} _initializing.
		 */
		_initializing: false,

		/**
		 * Page setting entity schema name.
		 * @private
		 * @property {String} _pageSettingsEntitySchemaName.
		 */
		_pageSettingsEntitySchemaName: "TimelinePageSetting",

		/**
		 * Tile setting entity schema name.
		 * @private
		 * @property {String} _tileSettingsEntitySchemaName.
		 */
		_tileSettingsEntitySchemaName: "TimelineTileSetting",

		/**
		 * Tile setting entity schema name.
		 * @private
		 * @property {String} _tileSettingsKey.
		 */
		_tileSettingsKey: "TimelineTileSettings",

		/**
		 * Tile settings config.
		 * @private
		 * @property {Array} _tileConfig.
		 */
		_tileConfig: null,

		/**
		 * Timeline pages settings config.
		 * @private
		 * @property {Object} _timelinePageConfig.
		 */
		_timelinePageConfig: null,

		// endregion

		// region Methods: Private

		/**
		 * Returns tile image Url.
		 * @private
		 * @param {String} recordId Record id.
		 * @return {String} Tile mage Url.
		 */
		_getTileImageUrl: function(recordId) {
			return Terrasoft.ImageUrlBuilder.getUrl({
				source: Terrasoft.ImageSources.ENTITY_COLUMN,
				params: {
					schemaName: this._tileSettingsEntitySchemaName,
					columnName: "Image",
					primaryColumnValue: recordId
				}
			});
		},

		/**
		 * Removes link tile from page config.
		 * @private
		 * @param {Object} pageConfig Pages config.
		 */
		_removeLinkTile: function(pageConfig) {
			Terrasoft.each(pageConfig, function(pageTiles) {
				var findedTileConfig = Terrasoft.findItem(pageTiles, {
					"entityConfigKey": "09a6dad5-036b-4075-a813-e8278a5360ea"
				});
				if (findedTileConfig && findedTileConfig.item) {
					pageTiles.splice(findedTileConfig.index, 1);
				}
			}, this);
		},

		// endregion

		// region Methods: Protected

		/**
		 * Processes timeline tile esq result, and sets into tile settings property.
		 * @protected
		 * @param {Object} result Result.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback context.
		 */
		initTilesConfigCallback: function(result, callback, scope) {
			var timelineTileConfig = [];
			if (result && result.success) {
				var collection = result.collection;
				Terrasoft.each(collection, function(item) {
					var tileConfig = item.get("Data");
					var id = item.get("Id");
					if (Terrasoft.isJsonObject(tileConfig)) {
						tileConfig = Ext.decode(tileConfig);
						tileConfig.caption = item.get("Name");
						tileConfig.iconUrl = this._getTileImageUrl(id);
						tileConfig.entityConfigKey = id;
						timelineTileConfig.push(tileConfig);
					}
				}, this);
			}
			this._tileConfig = timelineTileConfig;
			Ext.callback(callback, scope);
		},

		/**
		 * Processes timeline page esq result, and sets into page settings property.
		 * @protected
		 * @param {Object} result Result.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback context.
		 */
		initPagesConfigCallback: function(result, callback, scope) {
			var timelineConfig = {};
			if (result && result.success) {
				var collection = result.collection;
				Terrasoft.each(collection, function(item) {
					var key = item.get("Key");
					var pageConfig = item.get("Data");
					if (Terrasoft.isJsonObject(pageConfig) && key) {
						pageConfig = Ext.decode(pageConfig);
						timelineConfig[key] = pageConfig;
					}
				}, this);
			}
			if (!Terrasoft.Features.getIsEnabled("LinkPreview")) {
				this._removeLinkTile(timelineConfig);
			}
			this._timelinePageConfig = timelineConfig;
			Ext.callback(callback, scope);
		},

		// endregion

		// region Methods: Public

		/**
		 * Initializes timeline configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback context.
		 */
		initPagesConfig: function(callback, scope) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: this._pageSettingsEntitySchemaName
			});
			esq.addColumn("Key");
			esq.addColumn("Data");
			esq.getEntityCollection(function(response) {
				this.initPagesConfigCallback(response, callback, scope);
			}, this);
		},

		/**
		 * Initializes timeline tile configuration.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback context.
		 */
		initTilesConfig: function(callback, scope) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: this._tileSettingsEntitySchemaName,
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
					cacheGroup: "Timeline",
					cacheItemName: this._tileSettingsKey
				}
			});
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
			esq.addColumn("Data");
			esq.getEntityCollection(function(result) {
				this.initTilesConfigCallback(result, callback, scope);
			}, this);
		},

		/**
		 * Returns tile config.
		 * @return {Array}
		 */
		getTileConfig: function() {
			return this._tileConfig;
		},

		/**
		 * Returns page config.
		 * @param {String} key Key of config.
		 * @return {Array} Timeline page config.
		 */
		getTimelinePageConfig: function(key) {
			return this._timelinePageConfig && this._timelinePageConfig[key];
		},

		/**
		 * Initializes manager.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		initialize: function(callback, scope) {
			if (this._initialized) {
				Ext.callback(callback, scope);
				return;
			}
			if (this._initializing) {
				return;
			}
			this._initializing = true;
			Terrasoft.chain(
				this.initTilesConfig,
				this.initPagesConfig,
				function() {
					this._initialized = true;
					this._initializing = false;
					Ext.callback(callback, scope);
				},
				this);
		}

		// endregion

	});

	return Terrasoft.manager.TimelineManager;
});


