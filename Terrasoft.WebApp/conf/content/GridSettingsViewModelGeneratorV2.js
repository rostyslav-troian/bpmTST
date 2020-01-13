Terrasoft.configuration.Structures["GridSettingsViewModelGeneratorV2"] = {innerHierarchyStack: ["GridSettingsViewModelGeneratorV2"]};
define("GridSettingsViewModelGeneratorV2", ["ext-base", "terrasoft", "GridSettingsViewModelGeneratorV2Resources",
		"ConfigurationConstants", "ColumnSettingsUtilities", "MaskHelper"],
	function(Ext, Terrasoft, resources, ConfigurationConstants, ColumnSettingsUtilities, MaskHelper) {
		/**
		 * ########## ############ ###### #############
		 * @param {Object} config
		 * @return {Object}
		 */
		function generateViewModel(config) {
			var values = {
				defaultColumnCount: 24
			};
			Ext.apply(values, config);
			return {
				values: values,
				methods: {
					/**
					 * ######## ############ #######
					 * @protected
					 * @param {Object} cell
					 * @param {Object} metaPath
					 * @param {Object} row
					 * @param {Object} path
					 * @return {Object}
					 */
					getBaseColumnConfigV2: function(cell, metaPath, row, path) {
						return {
							bindTo: metaPath,
							caption: cell.caption,
							type: cell.columnType,
							position: {
								column: cell.column,
								colSpan: cell.width,
								row: row
							},
							orderDirection: cell.orderDirection,
							orderPosition: cell.orderPosition,
							dataValueType: cell.dataValueType,

							aggregationType: cell.aggregationType,
							isBackward: cell.isBackward,
							metaCaptionPath: cell.metaCaptionPath,
							metaPath: metaPath,
							path: path,
							referenceSchemaName: cell.referenceSchemaName,
							serializedFilter: cell.serializedFilter,
							hideFilter: cell.hideFilter
						};
					},

					/**
					 * ######## ######## ######### #####
					 * @protected
					 * @return {Array|dataCollection|*}
					 */
					getActiveDataCollection: function() {
						return this.currentObject.isTiled ?
							this.currentObject.dataCollection :
							this.currentObject.listedDataCollection;
					},

					/**
					 * ############ ####### ## ###### ######
					 * @protected
					 */
					cancelSettings: function() {
						this.sandbox.publish("BackHistoryState");
					},

					/**
					 * ######### ######### #######
					 * @protected
					 */
					saveSettings: function() {
						var profile = this.getNewProfileData();
						var saveConfig = this.sandbox.publish("SaveGridSettings", profile, [this.sandbox.id]);
						if (!saveConfig || Ext.isEmpty(saveConfig.saveProfile) || saveConfig.saveProfile) {
							var profileKey = this.currentObject.profileKey;
							Terrasoft.utils.saveUserProfile(profileKey, profile, false, function() {
								this.sandbox.publish("GridSettingsChanged",  {
									newProfileData: profile
								}, [this.sandbox.id]);
								var cache = Terrasoft.ClientPageSessionCache;
								if (cache) {
									var cacheKeys = Terrasoft.keys(cache.storage);
									Terrasoft.each(cacheKeys, function(key) {
										if (key.indexOf(profileKey) !== -1) {
											cache.removeItem(key);
										}
									});
								}
								this.sandbox.publish("BackHistoryState");
							}, this);
						} else {
							this.sandbox.publish("BackHistoryState");
						}
					},

					/**
					 * Save settings for all users.
					 * @protected
					 */
					saveSettingsForAllUsers: function() {
						var profileKey = this.currentObject.profileKey;
						var profile = this.getNewProfileData();
						this._checkUserSettings({
							profileKey: profileKey,
							profileCulture: Terrasoft.Resources.CultureSettings.currentCultureId
						}, function() {
							Terrasoft.utils.saveUserProfile(profileKey, profile, false);
							Terrasoft.utils.saveUserProfile(profileKey, profile, true, function() {
								this.sandbox.publish("GridSettingsChanged", {
									newProfileData: profile
								}, [this.sandbox.id]);
								MaskHelper.HideBodyMask();
								this.sandbox.publish("BackHistoryState");
							}, this);
						}, this);
					},

					/**
					 * Check personal user settings.
					 * @private
					 * @param {Object} filtersValue SysProfileData query filters values.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					_checkUserSettings: function(filtersValue, callback, scope) {
						MaskHelper.ShowBodyMask();
						var esq = this._getSysProfileDataSelectQuery(filtersValue);
						esq.getEntityCollection(function(response) {
							var collection = response && response.collection;
							var isNotEmptyCollection = collection && !collection.isEmpty();
							var firstItem = isNotEmptyCollection && collection.first();
							var count = firstItem && firstItem.get("Count");
							if (response && response.success && count > 0) {
								this.showConfirmationDialog(resources.localizableStrings.DeleteUserProfilesMessage, function(returnCode) {
									this._deleteConfirmationCallback(returnCode, filtersValue, callback, scope);
								}, [Terrasoft.MessageBoxButtons.NO.returnCode,
									Terrasoft.MessageBoxButtons.YES.returnCode], null);
							} else {
								Ext.callback(callback, scope || this);
							}
						}, this);
					},

					/**
					 * Applies SysProfileData query filters.
					 * @private
					 * @param {Terrasoft.BaseFilterableQuery} query SysProfileData query.
					 * @param {Object} filtersValue SysProfileData query filters values.
					 */
					_applyFilters: function(query, filtersValue) {
						query.filters.addItem(Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Key", filtersValue.profileKey));
						query.filters.addItem(Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "SysCulture", filtersValue.profileCulture));
						query.filters.addItem(Terrasoft.createIsNotNullFilter(
								Ext.create("Terrasoft.ColumnExpression", {columnPath: "Contact"})
						));
						query.filters.addItem(Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.NOT_EQUAL, "Contact",
								Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
					},

					/**
					 * Returns SysProfileData select query.
					 * @private
					 * @param {Object} filtersValue SysProfileData query filters values.
					 * @return {Terrasoft.EntitySchemaQuery} SysProfileData select query.
					 */
					_getSysProfileDataSelectQuery: function(filtersValue) {
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SysProfileData"
						});
						esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "Count");
						this._applyFilters(esq, filtersValue);
						return esq;
					},

					/**
					 * Returns SysProfileData delete query.
					 * @private
					 * @param {Object} filtersValue SysProfileData query filters values.
					 * @return {Terrasoft.DeleteQuery} SysProfileData delete query.
					 */
					_getSysProfileDataDeleteQuery: function(filtersValue) {
						var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
							rootSchemaName: "SysProfileData"
						});
						this._applyFilters(deleteQuery, filtersValue);
						return deleteQuery;
					},

					/**
					 * Delete confirmation callback.
					 * @private
					 * @param {String} returnCode Confirmation dialog return code.
					 * @param {Object} filtersValue SysProfileData query filters values.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					_deleteConfirmationCallback: function(returnCode, filtersValue, callback, scope) {
						if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							var deleteQuery = this._getSysProfileDataDeleteQuery(filtersValue);
							deleteQuery.execute(function(result) {
								if (!result.success) {
									this.error(result);
								}
								Ext.callback(callback, scope || this);
							}, this);
						} else {
							Ext.callback(callback, scope || this);
						}
					},

					/**
					 * ######## ##### #######
					 * @protected
					 * @return {profile|*|Function|profile|profile|profile}
					 */
					getNewProfileData: function() {
						var profileKey = this.currentObject.profileKey;
						var propertyName = this.currentObject.propertyName;
						var profile = propertyName ? this.currentObject.profile[propertyName] : this.currentObject.profile;
						if (!profile && propertyName) {
							this.currentObject.profile[propertyName] = {};
							profile = this.currentObject.profile[propertyName];
						}
						profile.tiledConfig = this.getTiledProfileConfigV2();
						profile.listedConfig = this.getListedProfileConfigV2();

						profile.key = profileKey;
						profile.isTiled = !!this.currentObject.isTiled;
						profile.type = profile.isTiled ? Terrasoft.GridType.TILED : Terrasoft.GridType.LISTED;
						this.currentObject.profile.key = this.currentObject.profile.key || profile.key;
						return this.currentObject.profile;
					},

					/**
					 * ######## ##### ############ ####### Tiled
					 * @protected
					 * @return {encode|*}
					 */
					getTiledProfileConfigV2: function() {
						var collection = this.currentObject.dataCollection;
						var tiledColumnsConfig = {
							grid: {
								rows: collection.length,
								columns: this.get("defaultColumnCount")
							},
							items: []
						};
						var addedColumns = [];
						var index = 0;
						var keySplitter = ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter;
						for (var i = 0; i < collection.length; i++) {
							var row = collection[i];
							if (row.cells.length === 0) {
								continue;
							}
							for (var j = 0; j < row.cells.length; j++) {
								var cell = row.cells[j];
								var columnKeySplittedArray = cell.metaPath.split(keySplitter);
								var metaPath = columnKeySplittedArray[0];
								var columnPath = metaPath;
								if (Terrasoft.contains(addedColumns, metaPath) && cell.aggregationType) {
									columnPath += keySplitter + i + j;
									addedColumns.push(columnPath);
								} else {
									addedColumns.push(metaPath);
								}
								var column = this.getBaseColumnConfigV2(cell, columnPath, i + 1, metaPath);
								column.captionConfig = {
									visible: !cell.isCaptionHidden
								};
								tiledColumnsConfig.items.push(column);
							}
							index++;
						}
						return Ext.encode(tiledColumnsConfig);
					},

					/**
					 * ######## ##### ############ ####### Listed
					 * @protected
					 * @return {encode|*}
					 */
					getListedProfileConfigV2: function() {
						var collection = this.currentObject.listedDataCollection;
						var keySplitter = ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter;
						var listedColumnsConfig = {
							items: []
						};
						var addedColumns = [];
						if (collection.length > 0) {
							var firstRow = collection[0];
							for (var k = 0; k < firstRow.cells.length; k++) {
								var listedCell = firstRow.cells[k];
								var columnKeySplittedArray = listedCell.metaPath.split(keySplitter);
								var metaPath = columnKeySplittedArray[0];
								var columnPath = metaPath;
								if (Terrasoft.contains(addedColumns, metaPath) && listedCell.aggregationType) {
									columnPath += keySplitter + 0 + k;
									addedColumns.push(columnPath);
								} else {
									addedColumns.push(metaPath);
								}
								var listedColumn = this.getBaseColumnConfigV2(listedCell, columnPath, 1, metaPath);
								listedColumnsConfig.items.push(listedColumn);
							}
						}
						return Ext.encode(listedColumnsConfig);
					},

					/**
					 * ######## ############ ####### #######
					 * @protected
					 * @param {Object} profileCell
					 * @return {Object}
					 */
					getBaseCellConfigV2: function(profileCell) {
						return {
							column: profileCell.position.column,
							caption: profileCell.caption,
							metaPath: profileCell.bindTo,
							isTitleText: profileCell.isTitleText,
							width: profileCell.position.colSpan,
							dataValueType: profileCell.dataValueType,

							aggregationType: profileCell.aggregationType,
							isBackward: profileCell.isBackward,
							metaCaptionPath: profileCell.metaCaptionPath,
							serializedFilter: profileCell.serializedFilter,
							referenceSchemaName: profileCell.referenceSchemaName,
							hideFilter: profileCell.hideFilter
						};
					},

					/**
					 * ########## ###### ##### ## #######
					 * @protected
					 * @param {Object} config
					 * @return {Array} ########## ###### #####
					 */
					generateTiledCollectionV2: function(config) {
						var previousCell = {};
						var collection = [];
						var rowsCount = config.grid.rows;
						var initialIndex = 1;
						for (var rowIndex = initialIndex; rowIndex < rowsCount + initialIndex; rowIndex++) {
							var columns = this.getGridRowColumns(config, rowIndex);
							var cells = [];
							for (var j = 0; j < columns.length; j++) {
								var cell = columns[j];
								var isTitleText = cell.type === Terrasoft.GridCellType.TITLE;
								var isURLType = cell.type === Terrasoft.GridCellType.LINK;
								var column = j;
								if (j > 0) {
									previousCell = cells[j - 1];
									column = previousCell.column + previousCell.width;
								}
								var dataTiledCell = this.getBaseCellConfigV2(cell);
								Ext.apply(dataTiledCell, {
									isCaptionHidden: !cell.captionConfig.visible,
									isTitleText: isTitleText,
									isURLType: isURLType
								});
								if (!Ext.isEmpty(cell.orderDirection)) {
									dataTiledCell.orderDirection = cell.orderDirection;
									dataTiledCell.orderPosition = cell.orderPosition;
								}
								if (!Ext.isEmpty(cell.type)) {
									dataTiledCell.columnType = cell.type;
								}
								cells.push(dataTiledCell);
							}
							collection.push({
								row: rowIndex,
								cells: cells
							});
						}
						return collection;
					},

					/**
					 * ########## ###### ##### ## #######
					 * @protected
					 * @param {Object} config
					 * @return {Array} ########## ###### #####
					 */
					generateListedCollectionV2: function(config) {
						var cells = [];
						for (var k = 0; k < config.items.length; k++) {
							var listedCell = config.items[k];
							var dataListedCell = this.getBaseCellConfigV2(listedCell);
							if (!Ext.isEmpty(listedCell.orderDirection)) {
								dataListedCell.orderDirection = listedCell.orderDirection;
								dataListedCell.orderPosition = listedCell.orderPosition;
							}
							if (!Ext.isEmpty(listedCell.type)) {
								dataListedCell.columnType = listedCell.type;
								dataListedCell.isTitleText = listedCell.type === Terrasoft.GridCellType.TITLE;
								dataListedCell.isURLType = listedCell.type === Terrasoft.GridCellType.LINK;
							}
							cells.push(dataListedCell);
						}
						return [{
							row: 0,
							cells: cells
						}];
					},

					/**
					 * ########## ###### ####### ## #######
					 * @protected
					 * @param {Object} profile
					 * @param {Boolean} isTiled
					 * @return {Array} ########## ###### #####
					 */
					getColumnsConfigFromProfileV2: function(profile, isTiled) {
						var dataCollection = [];
						profile = profile || {};
						if (!profile.tiledConfig && !profile.listedConfig) {
							profile.tiledConfig = "{}";
							profile.listedConfig = "{}";
							return dataCollection;
						}

						var gridsColumnsConfig = isTiled ? profile.tiledConfig : profile.listedConfig;
						if (gridsColumnsConfig) {
							var columnsConfig = Ext.decode(gridsColumnsConfig);
							if (isTiled) {
								dataCollection = this.generateTiledCollectionV2(columnsConfig);
							} else if (columnsConfig.items.length > 0) {
								dataCollection = this.generateListedCollectionV2(columnsConfig);
							}
						}
						return dataCollection;
					},

					/**
					 * ######## ############ #######
					 * @protected
					 * @param {Object} profileCell
					 * @return {Object}
					 */
					getBaseCellConfig: function(profileCell) {
						return {
							column: profileCell,
							aggregationType: profileCell.aggregationType,
							dataValueType: profileCell.dataValueType,
							isBackward: profileCell.isBackward,
							isTitleText: profileCell.isTitleText,
							metaCaptionPath: profileCell.metaCaptionPath,
							serializedFilter: profileCell.serializedFilter,
							referenceSchemaName: profileCell.referenceSchemaName,
							width: profileCell.cols,
							hideFilter: profileCell.hideFilter
						};
					},

					/**
					 * ########## ###### ##### ## ####### (### ####### ####### Tiled)
					 * @protected
					 * @param {Object} config
					 * @return {Array}
					 */
					generateTiledCollection: function(config) {
						var previousCell = {};
						var keySplitter = ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter;
						var collection = [];
						for (var i = 0; i < config.length; i++) {
							var row = config[i];
							var cells = [];
							for (var j = 0; j < row.length; j++) {
								var cell = row[j];
								var key = cell.key;
								var keysCount = key.length;
								var caption = key[keysCount - 1].caption;
								var bindTo = key[keysCount - 1].name.bindTo;
								var columnKeySplittedArray = bindTo.split(keySplitter);
								var metaPath = columnKeySplittedArray[0];
								var cellType = key[key.length - 1].type;
								var isTitleText = cellType === Terrasoft.GridCellType.TITLE;
								var isURLType = cellType === Terrasoft.GridCellType.LINK;
								var column = j;
								if (j > 0) {
									previousCell = cells[j - 1];
									column = previousCell.column + previousCell.width;
								}
								var dataTiledCell = this.getBaseCellConfig(cell);
								Ext.apply(dataTiledCell, {
									caption: caption,
									column: column,
									isCaptionHidden: keysCount === 1,
									metaPath: metaPath,
									isTitleText: isTitleText,
									isURLType: isURLType
								});
								if (!Ext.isEmpty(cell.orderDirection)) {
									dataTiledCell.orderDirection = cell.orderDirection;
									dataTiledCell.orderPosition = cell.orderPosition;
								}
								cells.push(dataTiledCell);
							}
							collection.push({
								row: i,
								cells: cells
							});
						}
						return collection;
					},

					/**
					 * Generate cells for old listed grid row.
					 * @protected
					 * @param {Object[]} config Config.
					 * @param {String} captionsConfig Captions config.
					 * @return {Object[]} Cells array for old listed grid row.
					 */
					generateListedCollection: function(config, captionsConfig) {
						var previousCell = {};
						var cells = [];
						for (var k = 0; k < config.length; k++) {
							var listedCell = config[k];
							var captionCell = Ext.decode(captionsConfig)[k];
							if (Ext.isEmpty(listedCell) || Ext.isEmpty(captionCell) || Ext.isEmpty(listedCell.key)) {
								continue;
							}
							var listedColumn = k;
							if (k > 0) {
								previousCell = cells[k - 1];
								listedColumn = previousCell.column + previousCell.width;
							}
							var dataListedCell = this.getBaseCellConfig(listedCell);
							var metaPath = this.getListedCellMetaPath(listedCell);
							Ext.apply(dataListedCell,  {
								caption: captionCell.name,
								metaPath: metaPath,
								column: listedColumn
							});
							if (!Ext.isEmpty(listedCell.orderDirection)) {
								dataListedCell.orderDirection = listedCell.orderDirection;
								dataListedCell.orderPosition = listedCell.orderPosition;
							}
							cells.push(dataListedCell);
						}
						return [{
							row: 0,
							cells: cells
						}];
					},

					/**
					 * Gets listed cell metapath.
					 * @private
					 * @param {Object} listedCell Listed cell config.
					 * @return {String} Listed cell metapath.
					 */
					getListedCellMetaPath: function(listedCell) {
						return listedCell.key[0].name.bindTo || listedCell.key[1].name.bindTo;
					},

					/**
					 * ########## ###### ####### ## ####### (### ####### #######)
					 * @protected
					 * @param {Object} profile
					 * @param {Boolean} isTiled
					 * @return {Array}
					 */
					getColumnsConfigFromProfile: function(profile, isTiled) {
						var dataCollection = [];
						if (!profile.tiledColumnsConfig && !profile.listedColumnsConfig) {
							profile.tiledColumnsConfig = "{}";
							profile.listedColumnsConfig = "{}";
							return dataCollection;
						}
						var gridsColumnsConfig = isTiled ? profile.tiledColumnsConfig : profile.listedColumnsConfig;
						if (gridsColumnsConfig) {
							var columnsConfig = Ext.decode(gridsColumnsConfig);
							if (isTiled) {
								dataCollection = this.generateTiledCollection(columnsConfig);
							} else if (columnsConfig.length > 0) {
								var captionsConfig = profile.captionsConfig;
								dataCollection = this.generateListedCollection(columnsConfig, captionsConfig);
							}
						}
						return dataCollection;
					},

					/**
					 * ####### #######
					 * @protected
					 */
					deleteElement: function() {
						var currentObject = this.currentObject;
						var collection = this.getActiveDataCollection();
						var columnsSettings = Ext.get("columnsSettings");
						var toggles = Ext.select("[class*=\"" + currentObject.selectedCellCss + "\"]",
							false, columnsSettings.dom);
						if (toggles.elements && !toggles.elements.length) {
							return;
						}
						var toggle = toggles.item(0);
						var toggleId = toggle.dom.id;
						var toggleIdParts = toggleId.split("-");
						var currentRowIndex = parseInt(toggleIdParts[2], 10);
						var currentColumnIndex = parseInt(toggleIdParts[3], 10);
						this.deactivateCells(collection);
						var row = collection[currentRowIndex];
						var cells = row.cells;
						for (var i = 0; i < cells.length; i++) {
							var cell = cells[i];
							var column = cell.column;
							var width = cell.width;
							if (column + width > currentColumnIndex) {
								if (toggle.dom.id === currentObject.selectedCellId) {
									currentObject.selectedCellId = "";
								}
								cells.splice(i, 1);
								var indx = row.row;
								if (row.cells.length === 0) {
									indx = ((indx - 1) > 0) ? indx - 1 : 0;
								}
								this.refreshRow(row, indx);
								break;
							}
						}
						if (row.cells && (row.cells.length === 0)) {
							Terrasoft.each(collection, function(item) {
								if (item.row > currentRowIndex) {
									this.deactivateCells(collection);
									var idx = item.row - 1;
									this.refreshRow(item, idx);
									item.row = idx;
								}
							}, this);
							var lastRowIdx = (collection.length === 1) ? 1 : collection.length;
							var currentRow = Ext.get("row-" + lastRowIdx);
							if (currentRow) {
								currentRow.remove();
							}
							collection.splice(currentRowIndex, 1);
							if (this.currentObject.isTiled) {
								var index = (lastRowIdx > 0) ? collection.length - 1 : null;
								var lastRow = (index >= 0) ? collection[collection.length - 1] : {};
								this.addRow(lastRow, index);
							}
						}
					},

					/**
					 * ######### #######
					 * @protected
					 */
					expandElement: function() {
						var currentObject = this.currentObject;
						var collection = this.getActiveDataCollection();

						var columnsSettings = Ext.get("columnsSettings");
						var toggles = Ext.select("[class*=\"" +
							currentObject.selectedCellCss +
							"\"]", false, columnsSettings.dom);
						if (toggles.getCount() === 0) {
							return;
						}
						var toggle = toggles.item(0);
						var toggleId = toggle.dom.id;
						var toggleIdParts = toggleId.split("-");
						var currentRowIndex = parseInt(toggleIdParts[2], 10);
						var currentColumnIndex = parseInt(toggleIdParts[3], 10);
						this.deactivateCells(collection);
						var row = collection[currentRowIndex];
						var cells = row.cells;
						for (var i = 0; i < cells.length; i++) {
							var cell = cells[i];
							var column = cell.column;
							var width = cell.width;
							if (column + width > currentColumnIndex) {
								var nextCellIndex = i < cells.length - 1 ? cells[i + 1].column : currentObject.rowSize;
								var newWidth = width + 1;
								if (column + newWidth > currentObject.rowSize || column + newWidth > nextCellIndex) {
									return;
								}
								cell.width = newWidth;
								cell.isCurrent = true;
								this.refreshRow(row);
								break;
							}
						}
					},

					/**
					 * ####### ########
					 * @protected
					 */
					narrowElement: function() {
						var currentObject = this.currentObject;
						var collection = this.getActiveDataCollection();
						var columnsSettings = Ext.get("columnsSettings");
						var toggles = Ext.select("[class*=\"" +
							currentObject.selectedCellCss +
							"\"]", false, columnsSettings.dom);
						if (toggles.getCount() === 0) {
							return;
						}
						var toggle = toggles.item(0);
						var toggleId = toggle.dom.id;
						var toggleIdParts = toggleId.split("-");
						var currentRowIndex = parseInt(toggleIdParts[2], 10);
						var currentColumnIndex = parseInt(toggleIdParts[3], 10);
						this.deactivateCells(collection);
						var row = collection[currentRowIndex];
						var cells = row.cells;
						for (var i = 0; i < cells.length; i++) {
							var cell = cells[i];
							var column = cell.column;
							var width = cell.width;
							if (column + width > currentColumnIndex) {
								var newWidth = width - 1;
								if (newWidth <= 0) {
									return;
								}
								cell.width = newWidth;
								cell.isCurrent = true;
								this.refreshRow(row);
								break;
							}
						}
					},

					/**
					 * ######### ###### ###### #######
					 * @protected
					 */
					setupElement: function() {
						var currentObject = this.currentObject;
						var collection = this.getActiveDataCollection();
						var columnsSettings = Ext.get("columnsSettings");
						var toggles = Ext.select("[class*=\"" + currentObject.selectedCellCss + "\"]",
							false, columnsSettings.dom);
						if (toggles.elements && !toggles.elements.length) {
							return;
						}
						var toggle = toggles.item(0);
						var toggleId = toggle.dom.id;
						var toggleIdParts = toggleId.split("-");
						var currentRowIndex = parseInt(toggleIdParts[2], 10);
						var currentColumnIndex = parseInt(toggleIdParts[3], 10);
						this.deactivateCells(collection);
						var row = collection[currentRowIndex];
						var cells = row.cells;
						for (var i = 0; i < cells.length; i++) {
							var cell = cells[i];
							var column = cell.column;
							var width = cell.width;
							if (column + width > currentColumnIndex) {
								var args = {};
								args.aggregationType = cell.aggregationType;
								args.column = cell.column;
								args.dataValueType = cell.dataValueType;
								args.isBackward = cell.isBackward;
								args.isCaptionHidden = cell.isCaptionHidden;
								args.isTiled = currentObject.isTiled;
								args.isTitleText = cell.isTitleText;
								args.isURLType = cell.isURLType;
								args.leftExpressionCaption = cell.caption;
								args.metaCaptionPath = cell.metaCaptionPath;
								args.serializedFilter = cell.serializedFilter;
								args.columnType = cell.columnType;
								args.referenceSchemaName = cell.referenceSchemaName;
								args.row = currentRowIndex;
								args.width = cell.width;
								args.hideFilter = cell.hideFilter;
								args.useLinkType = currentObject.isSingleTypeMode;
								currentObject.args = args;
								break;
							}
						}
						this.openColumnSettings();
					},

					/**
					 * ######### ###### ###### #######
					 * @protected
					 */
					openColumnSettings: function() {
						var currentObject = this.currentObject;
						var config = currentObject.args;
						var collection = this.getActiveDataCollection();

						var handler = function(args) {
							var rowNumber = args.row;
							while (!collection[rowNumber] && rowNumber > 0) {
								rowNumber--;
							}
							var cells = collection[rowNumber].cells;
							var currentColumnIndex = args.column;
							for (var i = 0; i < cells.length; i++) {
								var cell = cells[i];
								var column = cell.column;
								var width = cell.width;
								if (column + width > currentColumnIndex) {
									var columnType = args.columnType;
									var isTitleText = (columnType === "title" ||
										(!columnType &&
											currentObject.schema.primaryDisplayColumnName === cell.metaPath));
									var isURLType = args.columnType === Terrasoft.GridCellType.LINK;
									cell.aggregationType = args.aggregationType;
									cell.caption = args.title;
									cell.dataValueType = args.dataValueType;
									cell.isBackward = args.isBackward;
									cell.isCaptionHidden = args.isCaptionHidden;
									cell.isCurrent = true;
									cell.columnType = args.columnType;
									cell.isTitleText = isTitleText;
									cell.isURLType = isURLType;
									cell.metaCaptionPath = args.metaCaptionPath;
									cell.referenceSchemaName = args.referenceSchemaName;
									cell.serializedFilter = args.serializedFilter;
									cell.hideFilter = args.hideFilter;
									break;
								}
							}
						};
						ColumnSettingsUtilities.Open(this.sandbox, config, handler, this.renderTo, this);
					},

					/**
					 * ####### ############ ####### ########## +
					 * @protected
					 * @param {Number} index
					 * @returns {Object}
					 */
					createAddCellConfig: function(index) {
						return {
							caption: "+",
							metaPath: "+",
							column: index,
							width: 2,
							isNew: true
						};
					},

					/**
					 * ####### ############ ###### #######
					 * @protected
					 * @param {Number} index
					 * @returns {Object}
					 */
					createEmptyCellConfig: function(index) {
						return {
							caption: "",
							metaPath: "",
							column: index,
							width: 1,
							isEmpty: true
						};
					},

					/**
					 * ########## ############ ####### ##### ## ####### #######
					 * @protected
					 * @param {Object[]} dataCollection
					 * @param {Number} rowSize
					 * @returns {Array} ########## ###### #####
					 */
					generateViewCollection: function(dataCollection, rowSize) {
						var viewCollection = [];
						var rowCells = [];
						for (var i = 0; i < dataCollection.length; i++) {
							var currentRow = dataCollection[i];
							rowCells = [];
							var currentColumn = 0;
							for (var j = 0; j < currentRow.cells.length; j++) {
								var currentCell = currentRow.cells[j];
								if (currentCell.column !== currentColumn) {
									if (currentCell.column - currentColumn >= 2) {
										rowCells.push(this.createAddCellConfig(currentColumn));
										currentColumn += 2;
									}
									for (var k = currentColumn; k < currentCell.column; k++) {
										rowCells.push(this.createEmptyCellConfig(k));
									}
								}
								rowCells.push(currentCell);
								currentColumn = currentCell.column + currentCell.width;
							}
							if (currentColumn !== rowSize) {
								if (currentColumn <= rowSize - 2) {
									rowCells.push(this.createAddCellConfig(currentColumn));
									currentColumn += 2;
								}
								for (var y = currentColumn; y < rowSize; y++) {
									rowCells.push(this.createEmptyCellConfig(y));
								}
							}
							viewCollection.push({
								row: i,
								cells: rowCells
							});
						}
						rowCells = [];
						for (var z = 0; z < rowSize - 2; z++) {
							rowCells.push(this.createEmptyCellConfig(z + 2));
						}
						viewCollection.push({
							row: dataCollection.length,
							cells: rowCells
						});

						return viewCollection;
					},

					/**
					 * ######### ######
					 * @protected
					 * @param {Object} row
					 * @param {Number} newRowIndex
					 */
					refreshRow: function(row, newRowIndex) {
						var currentRowIndex = row.row || newRowIndex || 0;
						var cells = row.cells || [];
						var currentRow = Ext.get("row-" + currentRowIndex);
						if (newRowIndex >= 0) {
							currentRowIndex = newRowIndex;
						}
						var rowSize = this.currentObject.rowSize;
						var newRow = {};
						var newCell = {};
						if (cells.length > 0) {
							this.sortByKey(cells, "column");
							newRow = Ext.DomHelper.insertAfter(currentRow,
								"<div id=\"row-new\" class=\"grid-row grid-module\"></div>",
								true);
							var rowList = currentRow.select("> *");
							rowList.each(function(item) {
								var dDElement = Ext.dd.DragDropManager.getDDById(item.dom.id);
								if (dDElement) {
									dDElement.destroy();
								}
							});
							currentRow.remove();
							var currentCellIndex = 0;
							var emptiesCount = 0;
							for (var i = 0; i < cells.length; i++) {
								var cell = cells[i];
								var column = cell.column;
								var width = cell.width;
								var caption = cell.caption;
								var isCurrent = cell.isCurrent;
								var isTitleText = cell.isTitleText;
								var isURLType = cell.isURLType;
								if (currentCellIndex !== column) {
									emptiesCount = column - currentCellIndex;
									if (emptiesCount > 1) {
										newCell = Ext.DomHelper.append(newRow,
												"<div id=\"element-plus-" + currentRowIndex + "-" + currentCellIndex +
												"\" class=\"grid-cols-2\">" +
												"<div class=\"empty-inner-div\">" +
												"+" +
												"</div>" +
												"</div>",
											true);
										newCell.initDDTarget("empty", {}, this.currentObject.ddTargetEmptyOverride);
										currentCellIndex += 2;
									}
									for (var j = currentCellIndex; j < column; j++) {
										newCell = Ext.DomHelper.append(newRow,
												"<div id=\"element-empty-" + currentRowIndex + "-" + j +
												"\" class=\"grid-cols-1\">" +
												"<div class=\"empty-inner-div\">" +
												"" +
												"</div>" +
												"</div>",
											true);
										newCell.initDDTarget("empty", {}, this.currentObject.ddTargetEmptyOverride);
									}
								}
								var columnClasses = "grid-cols-";
								columnClasses += width;
								columnClasses += " ";
								if (isCurrent) {
									columnClasses += this.currentObject.selectedCellCss;
								} else {
									columnClasses += this.currentObject.unselectedCellCss;
								}
								var innerDivClassesClasses = "column-inner-div";

								if (isTitleText) {
									innerDivClassesClasses += " ";
									innerDivClassesClasses += this.currentObject.titleCellCss;
								}
								if (isURLType) {
									innerDivClassesClasses += " ";
									innerDivClassesClasses += this.currentObject.urlCellCss;
								}
								newCell = Ext.DomHelper.append(newRow,
										"<div id=\"element-column-" + currentRowIndex + "-" + column + "\"class=\"" +
										columnClasses +
										"\" data-item-marker=\"" +
										caption +
										"\">" +
										"<div class=\"" +
										innerDivClassesClasses +
										"\">" +
										caption +
										"</div>" +
										"</div>",
									true);
								this.currentObject.clearDDCache(newCell);
								newCell.initDD("empty", {isTarget: false}, this.currentObject.ddEmptyOverride);
								currentCellIndex = column + width;
							}
							if (currentCellIndex < rowSize) {
								emptiesCount = rowSize - currentCellIndex;
								if (emptiesCount > 1) {
									newCell = Ext.DomHelper.append(newRow,
											"<div id=\"element-plus-" + currentRowIndex + "-" + currentCellIndex +
											"\" class=\"grid-cols-2\">" +
											"<div class=\"empty-inner-div\">" +
											"+" +
											"</div>" +
											"</div>",
										true);
									newCell.initDDTarget("empty", {}, this.currentObject.ddTargetEmptyOverride);
									currentCellIndex += 2;
								}
								for (var k = currentCellIndex; k < rowSize; k++) {
									newCell = Ext.DomHelper.append(newRow,
											"<div id=\"element-empty-" + currentRowIndex + "-" + k +
											"\" class=\"grid-cols-1\">" +
											"<div class=\"empty-inner-div\">" +
											"" +
											"</div>" +
											"</div>",
										true);
									newCell.initDDTarget("empty", {}, this.currentObject.ddTargetEmptyOverride);
								}
							}
							newRow.dom.id = "row-" + currentRowIndex;
						} else {
							if (!this.currentObject.isTiled) {
								newRow = Ext.DomHelper.insertAfter(currentRow,
									"<div id=\"row-new\" class=\"grid-row grid-module\"></div>",
									true);
								newCell = Ext.DomHelper.append(newRow,
										"<div id=\"element-plus-0-0\" class=\"grid-cols-2\">" +
										"<div class=\"empty-inner-div\">" +
										"+" +
										"</div>" +
										"</div>",
									true);
								for (var y = 2; y < rowSize; y++) {
									newCell = Ext.DomHelper.append(newRow,
											"<div id=\"element-empty-0-" + y +
											"\" class=\"grid-cols-1\">" +
											"<div class=\"empty-inner-div\">" +
											"" +
											"</div>" +
											"</div>",
										true);
								}
								currentRow.remove();
								newRow.dom.id = "row-0";
							} else {
								currentRow.remove();
							}
						}
					},

					/**
					 * ######### ######
					 * @protected
					 * @param {Object} row
					 * @param {Number} newRowIndex
					 */
					addRow: function(row, newRowIndex) {
						var currentRowIndex = newRowIndex || row.row;
						var currentRow = (currentRowIndex >= 0) ?
							Ext.get("row-" + currentRowIndex) :
							Ext.get("columnsSettingsGrid");
						var nextRowIndex = (currentRowIndex >= 0) ? currentRowIndex + 1 : 0;
						var el = "<div id=\"row-" + nextRowIndex + "\" class=\"grid-row grid-module\"></div>";
						var newRow = (currentRowIndex >= 0) ?
							Ext.DomHelper.insertAfter(currentRow, el, true) :
							Ext.DomHelper.append(currentRow, el, true);
						var newCell = Ext.DomHelper.append(newRow,
								"<div id=\"element-plus-" + nextRowIndex + "\" class=\"grid-cols-2\">" +
								"<div class=\"empty-inner-div\">" +
								"+" +
								"</div>" +
								"</div>",
							true);

						for (var y = 2; y < this.currentObject.rowSize; y++) {
							newCell = Ext.DomHelper.append(newRow,
									"<div id=\"element-empty-" + nextRowIndex + "-" + y +
									"\" class=\"grid-cols-1\">" +
									"<div class=\"empty-inner-div\">" +
									"" +
									"</div>" +
									"</div>",
								true);
						}
					},

					/**
					 * ####### ######### # #######
					 * @protected
					 * @param {Object[]} collection
					 */
					deactivateCells: function(collection) {
						for (var i = 0; i < collection.length; i++) {
							var cells = collection[i].cells;
							for (var j = 0; j < cells.length; j++) {
								var cell = cells[j];
								cell.isCurrent = false;
							}
						}
					},

					/**
					 * ######### ###### ## #####
					 * @protected
					 * @param {Object[]} array
					 * @param {String} key
					 * @return {Array} ########## ###############  ######
					 */
					sortByKey: function(array, key) {
						return array.sort(function(a, b) {
							var x = a[key];
							var y = b[key];
							return ((x < y) ? -1 : ((x > y) ? 1 : 0));
						});
					},

					/**
					 * # ###### ####### ##### ###### #######, ######### ## ## ####### ############ ###### ####.
					 * # ############ ####### ####### ########## ####### ########## ######### ## #######
					 * @protected
					 * @param {Array} columns ########## ############### ###### ####### ######
					 */
					sortGridRowColumns: function(columns) {
						columns.sort(function(first, second) {
							var firstColumn = first.position.column;
							var secondColumn = second.position.column;
							if (firstColumn > secondColumn) {
								return 1;
							}
							if (firstColumn < secondColumn) {
								return -1;
							}
							return 0;
						});
					},

					/**
					 * ######## ####### ############### ######### ###### #######
					 * @protected
					 * @param {Object} config ############ #######
					 * @param {Number} rowIndex ########## ##### ######
					 * @return {Array} ########## ####### ############### ######### ###### #######
					 */
					getGridRowColumns: function(config, rowIndex) {
						return config.items.filter(function(column) {
							var position = column.position;
							return (position.row === rowIndex);
						});
					}
				}
			};
		}
		return {
			generate: generateViewModel
		};
	});


