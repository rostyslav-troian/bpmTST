Terrasoft.configuration.Structures["ConfigurationGridUtilities"] = {innerHierarchyStack: ["ConfigurationGridUtilities"]};
define("ConfigurationGridUtilities", ["BusinessRulesApplierV2", "ConfigurationEnums", "BusinessRuleModule"
], function(BusinessRulesApplier, ConfigurationEnums, BusinessRuleModule) {

	/**
	 * Mixin for configuration grid utilities.
	 */
	Ext.define("Terrasoft.configuration.mixins.ConfigurationGridUtilities", {
		alternateClassName: "Terrasoft.ConfigurationGridUtilities",

		mixins: {
			RelatedEntityColumnsMixin: "Terrasoft.RelatedEntityColumns"
		},

		/**
		 * Disable cashed active row
		 * @private
		 * @type {Boolean}
		 */
		disableCachedActiveRow: true,

		/**
		 * Current active column name.
		 * @protected
		 * @type {String}
		 */
		currentActiveColumnName: Terrasoft.emptyString,

		/**
		 * Columns config.
		 * @protected
		 * @type {String}
		 */
		columnsConfig: null,

		/**
		 * Collection of system columns names.
		 * @protected
		 * @type {Array}
		 */
		systemColumns: ["Id", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "ProcessListeners"],

		/**
		 * ############ ###### ###### ## ######. #### #### ########## #######, ## ######### ######.
		 * @private
		 * @param {String} id ############# ######.
		 */
		unSelectRow: function(id) {
			if (!id) {
				return;
			}
			var gridData = this.getGridData();
			if (!gridData.contains(id)) {
				return;
			}
			this.saveRowChanges(id);
		},

		/**
		 * #########, ########## ## ######## ####### ######.
		 * @private
		 * @param {Terrasoft.BaseViewModel} activeRow ###### #######.
		 * @return {Boolean} ######### ########.
		 */
		getIsRowChanged: function(activeRow) {
			var changed = activeRow.isNew;
			Terrasoft.each(activeRow.changedValues, function(changedValue, columnName) {
				var column = this.columns[columnName];
				var columnType = column && column.type;
				changed = changed || columnType === Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
				return !changed;
			}, activeRow);
			return changed;
		},

		/**
		 * ############ ####### "########" ######## ######.
		 * @param {String} buttonTag ### "########".
		 * @param {String} primaryColumnValue id ######## ######.
		 */
		onActiveRowAction: function(buttonTag, primaryColumnValue) {
			this.set("LastActiveRow", primaryColumnValue);
			switch (buttonTag) {
				case "card":
					this.editRecord(primaryColumnValue);
					break;
				case "remove":
					this.deleteRecords();
					break;
				case "cancel":
					this.discardChanges(primaryColumnValue);
					break;
				case "save":
					this.onActiveRowSave(primaryColumnValue);
					break;
				default:
					break;
			}
		},

		/**
		 * @obsolete
		 */
		onActivRowSave: function() {
			this.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"onActivRowSave", "onActiveRowSave"));
			this.onActiveRowSave();
		},

		/**
		 * Handles active row save action.
		 * @private
		 */
		onActiveRowSave: function() {
			var activeRow = this.getActiveRow();
			if (activeRow && activeRow.validate()) {
				Terrasoft.chain(function(next) {
					this.saveRowChanges(activeRow, next);
				}, function(next) {
					this.activeRowSaved(activeRow, next);
				}, function() {
					this.setActiveRow(null);
				}, this);
			}
		},

		/**
		 * ######### ######## ######## ######.
		 * @private
		 * @param {Boolean} config.success True, #### ######## ######### ########## #########.
		 * @param {Object} config
		 */
		changeRow: function(config) {
			var oldId = config.oldId;
			if (!oldId) {
				return;
			}
			var gridData = this.getGridData();
			if (!gridData.contains(oldId)) {
				return;
			}
			var activeRow = gridData.get(oldId);
			var activeRowChanged = this.getIsRowChanged(activeRow);
			if (activeRowChanged) {
				Terrasoft.chain(function(next) {
					this.saveRowChanges(activeRow, next);
				}, function() {
					this.set("ActiveRow", config.newId || null);
				}, this);
				config.success = false;
			}
		},

		/**
		 * Discards changes of row.
		 * @protected
		 * @param {String} id Record identifier.
		 */
		discardChanges: function(id) {
			if (!id) {
				return;
			}
			this.discardActiveRowChanges();
		},

		/**
		 * Discards changes of active row.
		 * @protected
		 * @param {String} [callback] Callback function.
		 * @param {Terrasoft.BaseViewModel} [scope] Callback scope.
		 */
		discardActiveRowChanges: function(callback, scope) {
			var activeRow = this.getActiveRow();
			if (activeRow.isNew) {
				this.removeGridRecords([activeRow.get("Id")]);
			} else {
				activeRow.onDiscardChangesClick(callback, scope);
			}
		},

		/**
		 * Saves detail row if changed.
		 * @protected
		 * @param {Object} row Detail row to save.
		 * @param {Function} callback Save callback function.
		 * @param {Object} scope Callback execution context.
		 */
		saveDataRow: function(row, callback, scope) {
			row.save({
				callback: callback,
				isSilent: true,
				scope: scope
			});
		},

		/**
		 * Handles active row save result.
		 * @protected
		 * @virtual
		 * @param {Object} row ###### #######.
		 * @param {Function} [callback] ####### ######### ######.
		 * @param {Object} [scope] ######## ###### ####### ######### ######.
		 */
		activeRowSaved: function(row, callback, scope) {
			scope = scope || this;
			callback = callback || Terrasoft.emptyFn;
			this.cachedActiveRow = null;
			callback.call(scope);
		},

		/**
		 * ############## ######## ## ####### ####### ###### # ######## ######.
		 * @protected
		 * @virtual
		 * @param {Array} keyMap ######## #######.
		 */
		initActiveRowKeyMap: function(keyMap) {
			keyMap.push({
				key: Ext.EventObject.ESC,
				defaultEventAction: "preventDefault",
				fn: this.onEscKeyPressed,
				scope: this
			});
			keyMap.push({
				key: Ext.EventObject.ENTER,
				ctrl: true,
				defaultEventAction: "preventDefault",
				fn: this.onCtrlEnterKeyPressed,
				scope: this
			});
			keyMap.push({
				key: Ext.EventObject.TAB,
				defaultEventAction: "preventDefault",
				fn: this.onTabKeyPressed,
				scope: this
			});
		},

		/**
		 * ########## ####### ####### ###### Esc # ######## ######.
		 * ######## #########.
		 * @private
		 */
		onEscKeyPressed: function() {
			var activeRow = this.getActiveRow();
			this.unfocusRowControls(activeRow);
			this.discardChanges(activeRow.get("Id"));
			this.setActiveRow(null);
		},

		/**
		 * ########## ####### ####### ####### Ctrl + Enter.
		 * ######### #########.
		 * @protected
		 */
		onCtrlEnterKeyPressed: function() {
			var activeRow = this.getActiveRow();
			this.unfocusRowControls(activeRow);
			Terrasoft.chain(function(next) {
				this.saveRowChanges(activeRow, next);
			}, function(next) {
				this.activeRowSaved(activeRow, next);
			}, function() {
				this.setActiveRow(null);
			}, this);
		},

		/**
		 * ########## ####### ####### ###### Tab.
		 * ####### ## #######
		 * @private
		 */
		onTabKeyPressed: function() {
			var activeRow = this.getActiveRow();
			if (this.currentActiveColumnName === this.getLastEnabledColumn(activeRow)) {
				this.unfocusRowControls(activeRow);
				var gridData = this.getGridData();
				var gridDataCount = gridData.getCount();
				var activeRowIndex = gridData.indexOf(activeRow);
				if (activeRowIndex === gridDataCount - 1) {
					this.addRow();
				} else {
					this.selectNextRow(activeRow, gridData, activeRowIndex);
				}
				return false;
			}
			this.currentActiveColumnName = this.getCurrentActiveColumnName(activeRow, this.columnsConfig);
			return true;
		},

		/**
		 * ############ ####### ## ######### ###### # #######, ######## #######.
		 * @private
		 * @param {Object} activeRow ####### ######## ######
		 * @param {Terrasoft.Collection} gridData ######### ###### #######.
		 * @param {Number} activeRowIndex ###### ####### ######## ###### #######.
		 */
		selectNextRow: function(activeRow, gridData, activeRowIndex) {
			Terrasoft.chain(function(next) {
				this.saveRowChanges(activeRow, next);
			}, function(next) {
				this.activeRowSaved(activeRow, next);
			}, function() {
				var newActiveRow = gridData.getByIndex(activeRowIndex + 1);
				this.setActiveRow(newActiveRow.get("Id"));
				this.setDefaultFocus(newActiveRow);
			}, this);
		},

		getCurrentActiveColumnName: function(activeRow, columnsConfig) {
			var columnConfigCount = columnsConfig.length;
			var currentIndex = 0;
			for (var i = 0; i < columnConfigCount; i++) {
				if (this.currentActiveColumnName === columnsConfig[i].key[0].name.bindTo) {
					currentIndex = i;
				}
			}
			for (var index = currentIndex + 1; index < columnConfigCount; index++) {
				var nextColumnName = this.columnsConfig[index].key[0].name.bindTo;
				var methodName = BusinessRulesApplier.getMethodName(BusinessRuleModule.enums.Property.ENABLED,
					nextColumnName);
				var enabledMethod = activeRow[methodName];
				if (!enabledMethod || enabledMethod.call(activeRow)) {
					return nextColumnName;
				}
			}
		},

		getLastEnabledColumn: function(activeRow) {
			var index = this.columnsConfig.length - 1;
			var lastEnabledColumnName = "";
			while (index !== 0) {
				var column = this.columnsConfig[index];
				var methodName = BusinessRulesApplier.getMethodName(BusinessRuleModule.enums.Property.ENABLED,
					column.key[0].name.bindTo);
				var enabledMethod = activeRow[methodName];
				if (!enabledMethod || enabledMethod.call(activeRow)) {
					lastEnabledColumnName = column.key[0].name.bindTo;
					break;
				}
				index--;
			}
			return lastEnabledColumnName;
		},

		getFirstEnabledColumnName: function(activeRow) {
			const columnsName = this.columnsConfig.map(function(config) {
				return config.key[0].name.bindTo;
			});
			const enabledProperty = BusinessRuleModule.enums.Property.ENABLED;
			const enabledColumn = _.find(columnsName, function(columnName) {
				const enabledMethodName = BusinessRulesApplier.getMethodName(enabledProperty, columnName);
				const method = activeRow[enabledMethodName];
				return !method || method.call(activeRow);
			}, this);
			return enabledColumn;
		},

		/**
		 * ########## ####### ##### ## #######.
		 * @param {Object} config ############ ####### ##### ## #######.
		 * @param {String} config.columnName ######## #######, ## ####### ### ########## ####.
		 */
		onGridClick: function(config) {
			let columnName;
			if (config) {
				columnName = config.columnName;
			} else if (this.currentActiveColumnName) {
				columnName = this.currentActiveColumnName;
			} else {
				const activeRow = this.getActiveRow();
				columnName = this.getFirstEnabledColumnName(activeRow);
			}
			this.focusActiveRowControl(columnName);
		},

		/**
		 * Sets the focus to the edit control.
		 * @protected
		 * @param {String} columnName The name of the column.
		 */
		focusActiveRowControl: function(columnName) {
			if (!columnName) {
				return;
			}
			var activeRow = this.getActiveRow();
			activeRow.set("Is" + columnName + "Focused", true);
			this.currentActiveColumnName = columnName;
		},

		/**
		 * ############# ##### # ######## ############## ######## ### ########### #######.
		 * @protected
		 * @param {Object} row ###### #######.
		 */
		setDefaultFocus: function(row) {
			var profileColumns = this.getProfileColumns();
			Terrasoft.each(profileColumns, function(column, name) {
				var methodName = BusinessRulesApplier.getMethodName(BusinessRuleModule.enums.Property.ENABLED,
					name);
				var enabledMethod = row[methodName];
				if (!enabledMethod || enabledMethod.call(row)) {
					this.focusActiveRowControl(name);
					return false;
				}
			}, this);
		},

		/**
		 * ####### ##### # ######### ############## ######## ######.
		 * @private
		 * @param {Terrasoft.BaseViewModel} activeRow ###### #######.
		 */
		unfocusRowControls: function(activeRow) {
			Terrasoft.each(activeRow.columns, function(changedValue, columnName) {
				var column = this.columns[columnName];
				if (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
					this.set("Is" + columnName + "Focused", false);
				}
			}, activeRow);
		},

		/**
		 * @obsolete
		 */
		generatActiveRowControlsConfig: function(id, columnsConfig, rowConfig) {
			this.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"generatActiveRowControlsConfig", "generateActiveRowControlsConfig"));
			this.generateActiveRowControlsConfig(id, columnsConfig, rowConfig);
		},

		/**
		 * Generates the edit elements configuration of active row.
		 * @param {String} id Row identifier.
		 * @param {Object} columnsConfig Configuration of columns.
		 * @param {Array} rowConfig Edit elements configuration.
		 */
		generateActiveRowControlsConfig: function(id, columnsConfig, rowConfig) {
			this.columnsConfig = columnsConfig;
			var gridLayoutItems = [];
			var currentColumnIndex = 0;
			Terrasoft.each(columnsConfig, function(columnConfig) {
				var cellConfig = this.getActiveRowCellConfig(columnConfig, currentColumnIndex);
				if (!cellConfig.hasOwnProperty("isNotFound")) {
					gridLayoutItems.push(cellConfig);
				}
				currentColumnIndex += cellConfig.layout.colSpan;
			}, this);
			this.applyBusinessRulesForActiveRow(id, gridLayoutItems);
			var viewGenerator = Ext.create(this.getRowViewGeneratorClassName());
			viewGenerator.viewModelClass = this;
			var gridLayoutConfig = viewGenerator.generateGridLayout({
				name: this.name,
				items: gridLayoutItems
			});
			rowConfig.push(gridLayoutConfig);
		},

		/**
		 * Returns active row cell config.
		 * @param {Object} columnConfig Configuration of columns.
		 * @param {Number} currentColumnIndex Current column index.
		 * @return {*|Object} Active row cell config.
		 */
		getActiveRowCellConfig: function(columnConfig, currentColumnIndex) {
			var columnName = columnConfig.key[0].name.bindTo;
			var column = this.getColumnByColumnName(columnName);
			var cellConfig = column
				? this.getCellControlsConfig(column)
				: this.getNotFoundCellControlsConfig(columnName);
			cellConfig = Ext.apply({
				layout: {
					colSpan: columnConfig.cols,
					column: currentColumnIndex,
					row: 0,
					rowSpan: 1
				}
			}, cellConfig);
			return cellConfig;
		},

		/**
		 * Applies business rules for active row.
		 * @param {String} id Row identifier.
		 * @param {Array} gridLayoutItems Grid layout items config.
		 */
		applyBusinessRulesForActiveRow: function(id, gridLayoutItems) {
			var gridData = this.getGridData();
			var activeRow = gridData.get(id);
			var rowClass = {prototype: activeRow};
			BusinessRulesApplier.applyRules(rowClass, gridLayoutItems);
		},

		/**
		 * Returns detail row view generator class name depending on detail accessability.
		 * @protected
		 * @return {String} Detail row view generator class name.
		 */
		getRowViewGeneratorClassName: function() {
			var isEnabled = this.get("IsEnabled");
			return isEnabled === false ? "Terrasoft.DisableControlsGenerator" : "Terrasoft.ViewGenerator";
		},

		/**
		 * Returns entity column or virtual column.
		 * @private
		 * @param {String} columnName Column name.
		 * @return {Object} Entity column or virtual column.
		 */
		getColumnByColumnName: function(columnName) {
			var column = this.entitySchema.getColumnByName(columnName);
			column = column || this.columns[columnName];
			return column;
		},

		/**
		 * Returns configuration of elements edit  of registry cell.
		 * @protected
		 * @param {Terrasoft.EntitySchemaColumn} entitySchemaColumn Registry cells column.
		 * @return {Object} configuration of elements edit  of registry cell.
		 */
		getCellControlsConfig: function(entitySchemaColumn) {
			var columnName = entitySchemaColumn.name;
			var enabled = (entitySchemaColumn.usageType !== Terrasoft.EntitySchemaColumnUsageType.None) &&
				!Ext.Array.contains(this.systemColumns, columnName);
			var config = this.getDefaultCellControlsConfig(columnName, {
				enabled: enabled,
				caption: entitySchemaColumn.caption
			});
			if (entitySchemaColumn.dataValueType === Terrasoft.DataValueType.LOOKUP) {
				config.showValueAsLink = false;
			}
			if (entitySchemaColumn.dataValueType !== Terrasoft.DataValueType.DATE_TIME &&
				entitySchemaColumn.dataValueType !== Terrasoft.DataValueType.BOOLEAN) {
				config.focused = {"bindTo": "Is" + columnName + "Focused"};
			}
			return config;
		},

		/**
		 * Returns config for not found column cell.
		 * @protected
		 * @param {String} columnName Name of not found column .
		 * @return {Object} controls config for not found column cell.
		 */
		getNotFoundCellControlsConfig: function(columnName) {
			var notAllowedSymbolName = /[~\!\@\$\%\^\&\*\(\)\+\=,\.\/';:"\?\>\<\[\]\\\{\}|`\#]/g;
			var dataValueType = this.activeRowConfig && this.activeRowConfig[columnName] &&
				this.activeRowConfig[columnName].dataValueType;
			if(dataValueType === undefined) {
				dataValueType = Terrasoft.DataValueType.TEXT;
			}
			var config = this.getDefaultCellControlsConfig(columnName.replace(notAllowedSymbolName, "_"));
			return Ext.apply(config, {
				enabled: false,
				dataValueType: dataValueType,
				bindTo: columnName
			});
		},

		/**
		 * Returns default cell config.
		 * @param {String} columnName Name of registry column.
		 * @param {Object} params Cell parameteres.
		 * @return {Object} default cell controls config.
		 */
		getDefaultCellControlsConfig: function(columnName, params) {
			var config = {
				itemType: Terrasoft.ViewItemType.MODEL_ITEM,
				name: columnName,
				labelConfig: {visible: false}
			};
			return Ext.apply(config, params);
		},

		/**
		 * Creates and initializes new row.
		 * @private
		 * @param {String} rowId Row id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		createRowCopy: function(rowId, callback, scope) {
			var gridData = this.getGridData();
			var sourceRow = gridData.get(rowId);
			var rawData = {};
			var typeColumn = this.getTypeColumn(this.entitySchemaName);
			var typeColumnValue = typeColumn && sourceRow.get(typeColumn.path);
			if (typeColumn && typeColumnValue) {
				typeColumnValue = (typeColumnValue && typeColumnValue.value) || typeColumnValue;
				rawData[typeColumn.path] = {value: typeColumnValue};
			}
			var config = {rawData: rawData};
			var className = this.getGridRowViewModelClassName(config);
			var gridRowViewModelConfig = this.getGridRowViewModelConfig(config);
			Ext.apply(gridRowViewModelConfig, {isNew: true});
			var row = Ext.create(className, gridRowViewModelConfig);
			BusinessRulesApplier.applyDependencies(row);
			row.set("Operation", ConfigurationEnums.CardStateV2.COPY);
			row.set("PrimaryColumnValue", rowId);
			row.set("DefaultValues", this.getRowDefaultValues(typeColumnValue));
			row.initEntity(function() {
				row.set("IsEntityInitialized", true);
				row.hideBodyMask();
				callback.call(scope, row);
			}, this);
		},

		/**
		 * ####### # ############## ##### ######.
		 * @private
		 * @param {String} id ############# ######.
		 * @param {String} typeColumnValue ######## ####### ####.
		 * @param {Function} callback ####### ######### ######.
		 */
		createNewRow: function(id, typeColumnValue, callback) {
			var typeColumn = this.getTypeColumn(this.entitySchemaName);
			var rawData = {};
			if (typeColumn && typeColumnValue) {
				rawData[typeColumn.path] = {
					value: typeColumnValue
				};
			}
			var config = {rawData: rawData};
			var className = this.getGridRowViewModelClassName(config);
			var gridRowViewModelConfig = this.getGridRowViewModelConfig(config);
			Ext.apply(gridRowViewModelConfig, {isNew: true});
			var row = Ext.create(className, gridRowViewModelConfig);
			BusinessRulesApplier.applyDependencies(row);
			row.set("Operation", ConfigurationEnums.CardStateV2.ADD);
			row.set("PrimaryColumnValue", id);
			row.set("DefaultValues", this.getRowDefaultValues(typeColumnValue));
			row.initEntity(function() {
				row.set("Id", id);
				row.set("IsEntityInitialized", true);
				row.hideBodyMask();
				callback.call(this, row);
			}, this);
		},

		/**
		 * Row selection handler.
		 * @param {String} selectedRowId Selected row identifier.
		 */
		createEditRow: function(selectedRowId) {
			if (!selectedRowId) {
				return;
			}
			const selectRow = this._getRow(selectedRowId);
			const typeColumn = this.getTypeColumn(this.entitySchemaName);
			const typeColumnValue = typeColumn && selectRow.get(typeColumn.path);
			selectRow.set("Operation", ConfigurationEnums.CardStateV2.EDIT);
			selectRow.set("DefaultValues", this.getRowDefaultValues(typeColumnValue));
			selectRow.set("PrimaryColumnValue", selectedRowId);
			selectRow.initEntity(function() {
				selectRow.set("IsEntityInitialized", true);
				selectRow.hideBodyMask();
			}, this);
		},

		/**
		 * Returns row.
		 * @param {String} rowId Row identifier.
		 * @private
		 * @return {Object} Row.
		 */
		_getRow: function(rowId) {
			const gridData = this.getGridData();
			return gridData.get(rowId);
		},

		/**
		 * ########## ######## ## ######### ### ######.
		 * @private
		 * @param {String} typeColumnValue ######## ####### ####.
		 * @return {Array} ######## ## ######### ### ######.
		 */
		getRowDefaultValues: function(typeColumnValue) {
			var detailInfo = {
				valuePairs: this.get("DefaultValues") || []
			};
			var defaultValues = [];
			var sourceDefaultValues = Terrasoft.deepClone(detailInfo.valuePairs);
			while (!Ext.isEmpty(sourceDefaultValues)) {
				var defaultValue = sourceDefaultValues.pop();
				var values = Ext.isArray(defaultValue.name)
					? Terrasoft.mapObjectToCollection(defaultValue)
					: [defaultValue];
				defaultValues = defaultValues.concat(values);
			}
			var typeColumnName = this.get("TypeColumnName");
			if (typeColumnName && typeColumnValue) {
				defaultValues.push({
					name: typeColumnName,
					value: typeColumnValue
				});
			}
			return Terrasoft.deepClone(defaultValues);
		},

		/**
		 * ########## ######### ####### ##### ###### # ######.
		 * @private
		 * @return {Object} ######### ####### ##### ###### # ######.
		 */
		getAddItemsToGridDataOptions: function() {
			var activeRow = this.findActiveRow();
			var options = null;
			var isEmpty = this.get("IsGridEmpty");
			if (isEmpty) {
				options = {
					mode: "bottom"
				};
			} else if (activeRow) {
				options = {
					mode: "after",
					target: activeRow.get("Id")
				};
			} else {
				options = {
					mode: "top"
				};
			}
			return options;
		},

		/**
		 * ######### ############# ######.
		 * @protected
		 * @virtual
		 * @param {String} recordId ########## ############# ########## ######.
		 */
		copyRow: function(recordId) {
			Terrasoft.chain(function(next) {
				var activeRow = this.findActiveRow();
				this.saveRowChanges(activeRow, next);
			}, function(next) {
				this.createRowCopy(recordId, next, this);
			}, function(next, newRow) {
				this.prepareResponseCollectionItem(newRow);
				this.addNewRowToCollection(newRow);
			}, this);
		},

		/**
		 * ######### ###### ######## ##### ######.
		 * @private
		 * @param {String} typeColumnValue ######## ####### ####.
		 */
		addRow: function(typeColumnValue) {
			var activeRow = this.findActiveRow();
			Terrasoft.chain(function(next) {
				this.saveRowChanges(activeRow, next);
			}, function(next) {
				this.activeRowSaved(activeRow, next);
			}, function(next) {
				var id = Terrasoft.generateGUID();
				this.createNewRow(id, typeColumnValue, next);
			}, function(next, newRow) {
				this.prepareResponseCollectionItem(newRow);
				this.addNewRowToCollection(newRow);
			}, this);
		},

		/**
		 * ######### ##### ############# ####### # #########.
		 * @protected
		 * @virtual
		 * @param {Object} newRow ###### #######.
		 */
		addNewRowToCollection: function(newRow) {
			var id = newRow.get("Id");
			var collection = Ext.create("Terrasoft.BaseViewModelCollection");
			collection.add(id, newRow);
			var options = this.getAddItemsToGridDataOptions();
			this.initIsGridEmpty(collection);
			this.addNewRowToGridData(collection, options);
			this.setActiveRow(id);
			this.setDefaultFocus(newRow);
		},

		/**
		 * ######### ##### ###### # ######.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseViewModelCollection} dataCollection ######### ##### #####.
		 * @param {Object} options ######### ########## ##### #####.
		 */
		addNewRowToGridData: function(dataCollection, options) {
			//TODO: #CRM-13446
			var gridData = this.getGridData();
			dataCollection = this.clearLoadedRecords(dataCollection);
			if (this.getIsCurrentGridRendered() && (options && options.mode === "after")) {
				this.addItemToGridDataCollection(gridData, dataCollection, this.getGridItemIndex(gridData) + 1);
			} else if (options && options.mode === "bottom") {
				this.addItemToGridDataCollection(gridData, dataCollection, gridData.getCount());
			} else {
				this.addItemToGridDataCollection(gridData, dataCollection, 0);
			}
		},

		/**
		 * ######### ##### ###### # ######### #####, # ############ ########.
		 * @private
		 * @param {Terrasoft.Collection} gridData ######### ###### #######.
		 * @param {Terrasoft.Collection} dataCollection ######### ##### ########### #####.
		 * @param {Number} index ####### ########### ###### # #########.
		 */
		addItemToGridDataCollection: function(gridData, dataCollection, index) {
			//TODO: #CRM-13446
			var tempGridDataCollection = new Terrasoft.Collection();
			tempGridDataCollection.loadAll(gridData);
			dataCollection.eachKey(function(key, item) {
				tempGridDataCollection.insert(index, key, item);
			}, this);
			gridData.clear();
			gridData.loadAll(tempGridDataCollection);
		},

		/**
		 * ######## ###### ####### ######## ###### ## ######### ###### #######.
		 * @private
		 * @param {Terrasoft.Collection} gridData ######### ###### #######.
		 * @return {Number} ###### ######## ###### # ######### ######.
		 */
		getGridItemIndex: function(gridData) {
			var activeRow = this.getActiveRow();
			if (activeRow) {
				return gridData.indexOf(activeRow);
			} else {
				return 0;
			}
		},

		/**
		 * ########## ######## ##### ## ######### ### ###### ############ ######## ############# #######.
		 * @protected
		 * @return {String} ######## ##### ###### #############.
		 */
		getDefaultConfigurationGridItemSchemaName: function() {
			return this.getDefaultGridItemSchemaName();
		},

		/**
		 * Returns default grid item schema name.
		 * @private
		 * @returns {string} Default grid item schema name.
		 */
		getDefaultGridItemSchemaName: function() {
			return "Page" + this.entitySchemaName;
		},

		/**
		 * Define default grid edit page.
		 * @private
		 */
		defineDefaultGridEditPage: function() {
			var cardSchemaName = this.getDefaultConfigurationGridItemSchemaName();
			if (this.getDefaultGridItemSchemaName() !== cardSchemaName) {
				return;
			}
			define(cardSchemaName + "Resources", [], function() {
				return {
					localizableStrings: {},
					localizableImages: {}
				};
			});
			define(cardSchemaName + "Structure", [cardSchemaName + "Resources"], function(resources) {
				return {
					schemaName: cardSchemaName,
					extendParent: false,
					parentSchemaName: "BaseModulePageV2",
					resources: resources
				};
			});
			define(cardSchemaName, [], function() {
				return {};
			});
		},

		/**
		 * @private
		 */
		_registerSaveDataOnCloseMessages: function(sandbox) {
			sandbox.registerMessages({
				"DataSavedOnClose": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
				},
				"SaveDataOnClose": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
				}
			});
		},

		/**
		 * Subscribes for SaveDetailOnClose message.
		 */
		subscribeSaveDataOnCloseEvent: function() {
			if (this.sandbox) {
				this._registerSaveDataOnCloseMessages(this.sandbox);
				this.sandbox.subscribe("SaveDataOnClose", this.saveDataOnCloseHandler, this, [this.sandbox.id]);
			}
		},

		/**
		 * Checks for unsaved data in active row. Saves active row if needed.
		 * @protected
		 * @return {Boolean} Save result.
		 */
		saveDataOnCloseHandler: function() {
			var row = this.getActiveRow();
			if (row && row.isChanged()) {
				this.set("SaveOnClosePage", true);
				this.saveDataRow(row, this.sendDataSavedResponse, this);
				return true;
			} else {
				return false;
			}
		},

		/**
		 * Sends detail saved on close confirmation.
		 * @protected
		 * @param {Object} [config] Config object to be sent.
		 */
		sendDataSavedResponse: function(config) {
			this.set("SaveOnClosePage", false);
			this.onEscKeyPressed();
			this.sandbox.publish("DataSavedOnClose", Ext.merge({success: true}, config || {}), [this.sandbox.id]);
		},

		/**
		 * Initializes classes for editable grid items.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function execution context.
		 */
		initEditableGridRowViewModel: function(callback, scope) {
			const entitySchemaName = this.entitySchemaName;
			const schemaBuilder = Ext.create("Terrasoft.SchemaBuilder");
			let config = {
				schemaName: "BaseConfigurationGridRow"
			};
			schemaBuilder.requireAllSchemaHierarchy(config, function(baseHierarchy) {
				const entityStructure = this.getEntityStructure(entitySchemaName);
				const chainArguments = [];
				let pages = [];
				if (entityStructure) {
					pages = entityStructure.pages;
				} else {
					this.defineDefaultGridEditPage();
					pages.push({
						cardSchema: this.getDefaultConfigurationGridItemSchemaName(),
						entitySchemaName: entitySchemaName
					});
				}
				Terrasoft.each(pages, function(page) {
					const chainedFunction = function(next) {
						config = {
							schemaName: page.cardSchema,
							entitySchemaName: page.entitySchemaName
						};
						schemaBuilder.requireAllSchemaHierarchy(config, function(hierarchy) {
							const editableGridPageSchema = baseHierarchy[baseHierarchy.length - 1];
							const pageSchema = hierarchy[hierarchy.length - 1];
							const schemaName = pageSchema.schemaName;
							editableGridPageSchema.schemaName = schemaName + "ConfigurationGridRow";
							editableGridPageSchema.entitySchemaName = pageSchema.entitySchemaName;
							editableGridPageSchema.entitySchema = pageSchema.entitySchema;
							const viewModelGenerator = schemaBuilder.createViewModelGenerator();
							viewModelGenerator.generate({
								hierarchy: hierarchy.concat(baseHierarchy),
								schema: editableGridPageSchema
							}, next, this);
						}, schemaBuilder);
					};
					chainArguments.push(chainedFunction);
				}, this);
				chainArguments.push(function(innerScope, viewModelClass) {
					this._addLookupColumns(viewModelClass);
					this.subscribeSaveDataOnCloseEvent();
					callback.call(scope);
				});
				chainArguments.push(this);
				Terrasoft.chain.apply(this, chainArguments);
			}, this);
		},

		/**
		 * @param {Object} viewModelClass
		 * @param {Object} viewModelClass.prototype
		 * @param {Object} viewModelClass.prototype
		 * @param {Object} viewModelClass.prototype.columns
		 * @private
		 */
		_addLookupColumns: function(viewModelClass) {
			BusinessRulesApplier.applyRules(viewModelClass, []);
			const rowColumns = viewModelClass.prototype.columns;
			this.mixins.RelatedEntityColumnsMixin.copyRelatedColumns(rowColumns, this.columns);
		},

		// region: Methods Public

		/**
		 * Saves row changes.
		 * @public
		 * @virtual
		 * @param {Object} row ###### #######.
		 * @param {Function} [callback] ####### ######### ######.
		 * @param {Object} [scope] ######## ###### ####### ######### ######.
		 */
		saveRowChanges: function(row, callback, scope) {
			scope = scope || this;
			callback = callback || Terrasoft.emptyFn;
			if (row && this.getIsRowChanged(row)) {
				this.saveDataRow(row, callback, scope);
			} else {
				callback.call(scope);
			}
		}

		// endregion

	});

	return Ext.create("Terrasoft.ConfigurationGridUtilities");
});


