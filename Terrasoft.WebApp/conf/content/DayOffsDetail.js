Terrasoft.configuration.Structures["DayOffsDetail"] = {innerHierarchyStack: ["DayOffsDetail"], structureParent: "BaseGridDetailV2"};
define('DayOffsDetailStructure', ['DayOffsDetailResources'], function(resources) {return {schemaUId:'759e07a7-2de6-4859-b783-534579a50f48',schemaCaption: "DayOffsDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'DayOffsDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DayOffsDetail", ["DayOffsDetailResources", "BusinessRulesApplierV2", "TimezoneUtils", "ConfigurationGrid",
			"ConfigurationGridGenerator", "ConfigurationGridUtilities", "CalendarWorkingTimeUtility"],
		function(resources, BusinessRulesApplier, TimezoneUtils) {
			return {
				entitySchemaName: "DayOff",
				mixins: {
					"ConfigurationGridUtilities": "Terrasoft.ConfigurationGridUtilities",
					"MiniPageUtilities": "Terrasoft.MiniPageUtilities",
					"CalendarWorkingTimeUtility": "Terrasoft.CalendarWorkingTimeUtility"
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"className": "Terrasoft.ConfigurationGrid",
							"primaryColumnName": "Id",
							"primaryDisplayColumnName": "DayOff",
							"itemType": this.Terrasoft.ViewItemType.GRID,
							"type": "listed",
							"generator": "ConfigurationGridGenerator.generatePartial",
							"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
							"selectedRows": {"bindTo": "SelectedRows"},
							"activeRow": {"bindTo": "ActiveRow"},
							"changeRow": {"bindTo": "changeRow"},
							"unSelectRow": {"bindTo": "unSelectRow"},
							"isEmpty": {"bindTo": "IsGridEmpty"},
							"isLoading": {"bindTo": "IsGridLoading"},
							"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
							"activeRowAction": {"bindTo": "onAction"},
							"activeRowActions": [
								{
									"className": "Terrasoft.Button",
									"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									"tag": "save",
									"markerValue": "save",
									"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
								},
								{
									"className": "Terrasoft.Button",
									"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									"tag": "cancel",
									"markerValue": "cancel",
									"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
								},
								{
									"className": "Terrasoft.Button",
									"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									"tag": "card",
									"markerValue": "card",
									"imageConfig": {"bindTo": "Resources.Images.CardIcon"}
								},
								{
									"className": "Terrasoft.Button",
									"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									"tag": "remove",
									"markerValue": "remove",
									"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
								}
							],
							"columnsConfig": [
								{
									"cols": 4,
									"key": [{
										"name": {
											"bindTo": "Date"
										}
									}]
								},
								{
									"cols": 4,
									"key": [{
										"name": {
											"bindTo": "DayType"
										}
									}]
								},
								{
									"cols": 16,
									"key": [{
										"name": {
											"bindTo": "WorkingIntervals"
										}
									}]
								}
							],
							"captionsConfig": [
								{
									"cols": 4,
									"name": resources.localizableStrings.DateCaption
								},
								{
									"cols": 4,
									"name": resources.localizableStrings.DayTypeCaption
								},
								{
									"cols": 4,
									"name": resources.localizableStrings.WorkingIntervalsCaption
								}
							]
						}
					}
				]/**SCHEMA_DIFF*/,
				attributes: {
					"IsEditable": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": true
					},
					"IntervalsConfig": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
					},
					"UseGeneratedProfile": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					}
				},
				messages: {
					"OnCardClosingResetFlag": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},

				properties: {
					startDefaultWorkingInterval: 9,
					finishDefaultWorkingInterval: 18
				},

				methods: {

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSettingsMenuItem
					 * @overridden
					 */
					getGridSettingsMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
					 * @overridden
					 */
					getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#deleteRecords
					 * @overridden
					 * */
					deleteRecords: function() {
						if(this.isPreviousDate(this.getActiveRow())){
							this.showInformationDialog(this.get("Resources.Strings.ErrorOnRemove"));
							return;
						}
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtilites#getCellControlsConfig
					 * @overridden
					 */
					getCellControlsConfig: function(entitySchemaColumn) {
						if (!entitySchemaColumn) {
							return;
						}
						var columnName = entitySchemaColumn.name;
						var activeRowEnabledConfig = this.get("ActiveRowEnable");
						var enabled;
						if (activeRowEnabledConfig && activeRowEnabledConfig.rowId) {
							enabled = activeRowEnabledConfig.enable;
						} else {
							enabled = (entitySchemaColumn.usageType !== this.Terrasoft.EntitySchemaColumnUsageType.None) &&
									!this.Ext.Array.contains(this.systemColumns, columnName);
						}
						var config = {
							itemType: this.Terrasoft.ViewItemType.MODEL_ITEM,
							name: columnName,
							labelConfig: {visible: false},
							caption: entitySchemaColumn.caption,
							enabled: enabled
						};
						if (entitySchemaColumn.dataValueType === this.Terrasoft.DataValueType.LOOKUP) {
							config.showValueAsLink = false;
						}
						if (entitySchemaColumn.dataValueType !== this.Terrasoft.DataValueType.DATE_TIME &&
								entitySchemaColumn.dataValueType !== this.Terrasoft.DataValueType.BOOLEAN) {
							config.focused = {"bindTo": "Is" + columnName + "Focused"};
						}
						return config;
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtiliteso#generateActiveRowControlsConfig
					 * @overridden
					 */
					generateActiveRowControlsConfig: function(id, columnsConfig, rowConfig) {
						this.columnsConfig = columnsConfig;
						var gridLayoutItems = [];
						var currentColumnIndex = 0;
						this.Terrasoft.each(columnsConfig, function(columnConfig) {
							var columnName = columnConfig.key[0].name.bindTo;
							var column = this.getColumnByColumnName(columnName);
							var cellConfig = this.getCellControlsConfig(column);
							cellConfig = this.Ext.apply({
								layout: {
									colSpan: columnConfig.cols,
									column: currentColumnIndex,
									row: 0,
									rowSpan: 1
								}
							}, cellConfig);
							if (!column) {
								this.applyVirtualColumnsConfig(columnName, cellConfig);
							}
							gridLayoutItems.push(cellConfig);
							currentColumnIndex += columnConfig.cols;
						}, this);
						var gridData = this.getGridData();
						var activeRow = gridData.get(id);
						var rowClass = {prototype: activeRow};
						BusinessRulesApplier.applyRules(rowClass, gridLayoutItems);
						var viewGenerator = this.Ext.create("Terrasoft.ViewGenerator");
						viewGenerator.viewModelClass = {prototype: this};
						var gridLayoutConfig = viewGenerator.generateGridLayout({
							name: this.name,
							items: gridLayoutItems
						});
						rowConfig.push(gridLayoutConfig);
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtilites#onCurrentRowChange
					 * @overridden
					 */
					onCurrentRowChange: function(config) {
						this.changeRow(config);
						this.setIsEnabled(config);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#onGridDataLoaded
					 * @overridden
					 */
					onGridDataLoaded: function() {
						if (this.get("CallGridDataParent")) {
							this.callParent((arguments.length > 0) && arguments || this.get("GridDataParentArguments"));
						} else {
							this.set("GridDataParentArguments", arguments);
							var esq = this.getWorkingIntervalsQuery();
							esq.getEntityCollection(function(result) {
								if (result.success) {
									this.performIntervals(result.collection);
								}
								this.set("CallGridDataParent", true);
								this.onGridDataLoaded();
							}, this);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#init
					 * @overridden
					 */
					init: function() {
						this.sandbox.subscribe("OnCardClosingResetFlag", this.onCardClosingResetFlag, this);
						this.set("IntervalsConfig", {});
						this.getContactTimeAsync(this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
								function(response) {
									if (response && response.time) {
										this.set("CurrentUserDate", response.time);
									}});
						this.callParent(arguments);
					},

					/**
					 * Get sorting columns
					 * @private
					 * @returns {Object} sorting columns
					 */
					getSortingValues: function() {
						return [
							{name: "Date"},
							{name: "DayType"}
						];
					},

					/**
					 * Get Current User Time
					 * @protected
					 * @param {Guid} contactId contact id
					 * @param {Function} callback function that use CurrentTime
					 */
					getContactTimeAsync: function(contactId, callback) {
						TimezoneUtils.getContactCurrentTime(contactId, callback, this);
					},

					/**
					 * Remove the flag of openness mini card
					 * @private
					 */
					onCardClosingResetFlag: function() {
						this.set("MiniCardAlreadyOpen", false);
					},

					/**
					 * Sets is current row editing enabled.
					 * If there is a date less than current, can edit on IsRepeated column.
					 * @param {Object} config Row config
					 */
					setIsEnabled: function(config) {
						var gridData = this.getGridData();
						if (!gridData || !gridData.contains(config.newId)) {
							return;
						}
						var activeRow = gridData.get(config.newId);
						if (!activeRow) {
							return;
						}
						var date = activeRow.get("Date");
						var currentDate = new Date();
						if (date < currentDate) {
							var rowConfig = {
								"rowId": config.newId,
								"enable": false
							};
							this.set("ActiveRowEnable", rowConfig);
						} else {
							this.set("ActiveRowEnable", null);
						}
					},

					/**
					 * On active row action handler.
					 * @param {String} buttonTag Clicked button tag.
					 */
					onAction: function(buttonTag) {
						switch (buttonTag) {
							case "remove":
								if (!this.isPreviousDate(this.getActiveRow())) {
									this.onActiveRowAction.apply(this, arguments);
								} else {
									this.showInformationDialog(this.get("Resources.Strings.ErrorOnRemove"));
								}
								break;
							case "save":
								if (!this.isPreviousDate(this.getActiveRow())) {
									this.onActiveRowAction.apply(this, arguments);
								} else {
									this.showInformationDialog(this.get("Resources.Strings.ErrorOnSave"),
											this.informationDialogButtonHandler);
								}
								break;
							case "card":
								var activeRow = this.getActiveRow();
								this.openWorkingIntervalMiniPage(activeRow);
								break;
							default:
								this.onActiveRowAction.apply(this, arguments);
						}
					},

					openWorkingIntervalMiniPage: function(activeRow) {
						var config = this.getWorkingIntervalMiniPageConfig(this.getDayCaption());
						if (!config) {
							return;
						}
						if(!this.validateEmptyDateType(activeRow) || !this.validateEmptyDate(activeRow)){
							Terrasoft.utils.showInformation(
									this.get("Resources.Strings.EmptyDateOrDateTypeErrorMessage"));
							return;
						}
						this.saveCardActiveRow(activeRow);
						this.openMiniPage(config);
					},

					/**
					 * Save active row
					 * @private
					 * @param row
					 */
					saveCardActiveRow: function(row) {
						this.set("CardActiveRow", row.get("Id"));
					},

					/**
					 * @inheritdoc Terrasoft.CalendarWorkingTimeUtility#getMiniPageSchemaName
					 * @overridden
					 */
					getMiniPageSchemaName: function() {
						return "DayOffMiniPage";
					},

					/**
					 * Returns is active row has a date than less than current.
					 * @param {Object} activeRow Active row config
					 */
					isPreviousDate: function(activeRow) {
						if (!activeRow) {
							return false;
						}
						var date = activeRow.get("Date");
						var currentDate = this.get("CurrentUserDate") || new Date();
						return date < currentDate;
					},

					/**
					 * Information dialog button handler in save action.
					 * @param {String} returnCode Code of clicked button.
					 */
					informationDialogButtonHandler: function(returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.OK.returnCode) {
							this.clearDateField(this.getActiveRow());
						}
					},

					/**
					 * Clear date field value in active row.
					 * @param {Object} activeRow Active row config
					 */
					clearDateField: function(activeRow) {
						if (!activeRow) {
							return;
						}
						activeRow.set("Date", null);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#initQueryColumns
					 * @overridden
					 */
					initQueryColumns: function(esq) {
						this.callParent(arguments);
						esq.addColumn("DayType.NonWorking");
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#prepareResponseCollectionItem:
					 * @overridden
					 */
					prepareResponseCollectionItem: function(item) {
						this.callParent(arguments);
						this.mixins.CalendarWorkingTimeUtility.prepareResponseCollectionItem.call(this, item,
								resources.localizableStrings.SetWorkingHourCaption);
					},

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtiliteso#loadGridDataRecord
					 * @overridden
					 */
					loadGridDataRecord: function(primaryColumnValue, callback, scope) {
						this.mixins.CalendarWorkingTimeUtility.loadGridDataRecord.call(this,
								primaryColumnValue, function() {
									var gridData = this.getGridData();
									var activeRow = gridData.get(this.get("CardActiveRow"));
									this.prepareResponseCollectionItem(activeRow);
								}, scope);
					},

					/**
					 * Returns entity schema query for working time intervals.
					 * @protected
					 * @returns {EntitySchemaQuery}
					 */
					getWorkingIntervalsQuery: function() {
						var calendarId = this.get("MasterRecordId");
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "WorkingTimeInterval"
						});
						esq.addColumn("From");
						esq.addColumn("To");
						esq.addColumn("DayOff");
						var sortByDay = esq.addColumn("DayOff.Date");
						sortByDay.orderPosition = 0;
						sortByDay.orderDirection = this.Terrasoft.OrderDirection.ASC;
						esq.filters.add("calendarFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "DayOff.Calendar", calendarId));
						return esq;
					},

					/**
					 * Generate caption for mini card
					 * @private
					 * @returns {String} caption
					 */
					getDayCaption: function() {
						var activeRow = this.getActiveRow();
						var dateFormat = Terrasoft.Resources.CultureSettings.dateFormat;
						var rowDate = Ext.Date.format(activeRow.get("Date"), dateFormat);
						return rowDate;
					},

					/**
					 * @inheritdoc ConfigurationGridUtilitiesV2#saveRowChanges
					 * @overriden
					 */
					saveRowChanges: function(row) {
						var args = arguments;
						if (!Ext.isObject(row)) {
							this.mixins.ConfigurationGridUtilities.saveRowChanges.apply(this, arguments);
							return;
						}
						else {
							this.prepareResponseCollectionItem(row);
							if(this.isPreviousDate(row)){
								Terrasoft.utils.showInformation(this.get("Resources.Strings.ErrorOnSave"));
								return;
							}
							if(!this.validateEmptyDateType(row) || !this.validateEmptyDate(row)){
								Terrasoft.utils.showInformation(this.get("Resources.Strings.EmptyDateOrDateTypeErrorMessage"));
								return;
							}
							this.validateDuplicateDate(row, args, this.duplicateDateCallback);
						}
					},

					/**
					 * Validate duplicate dates
					 * @private
					 * @param {Object} activeRow
					 * @param {Array} args
					 * @param {Object} callback
					 */
					validateDuplicateDate: function(activeRow, args, callback) {
						var id = activeRow.get("Id");
						var date = activeRow.get("Date");
						var calendar = activeRow.get("Calendar") && activeRow.get("Calendar").value;
						var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "DayOff"
						});
						query.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
						var filterGroup = this.getDuplicateFilter(id, date, calendar);
						query.filters.addItem(filterGroup);
						query.getEntityCollection(function(resultQuery) {
							callback.call(this, args, resultQuery);
						}, this);
					},

					/**
					 * Get filter for duplicate in date.
					 * @private
					 * @param {Guid} id Active row id
					 * @param {Date} date Active row date
					 * @param {Guid} calendar Current calendar id
					 */
					getDuplicateFilter: function(id, date, calendar) {
						var duplicatesFilter = Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Date", date);
						var notSelfFilter = Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.NOT_EQUAL, "Id", id);
						var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
						filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						filterGroup.addItem(notSelfFilter);
						filterGroup.addItem(duplicatesFilter);
						if (calendar) {
							var duplicatesCalendarFilter = Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Calendar", calendar);
							filterGroup.addItem(duplicatesCalendarFilter);
						}
						return filterGroup;
					},

					/**
					 * Validate duplicate dates callback
					 * @private
					 * @param {Array} args
					 * @param {Object} resultQuery
					 */
					duplicateDateCallback: function(args, resultQuery) {
						var row = args[0];
						var scope = args[2];
						if (resultQuery.success && resultQuery.collection.getItems()[0].get("Count") > 0) {
							this.Terrasoft.utils.showInformation(this.get("Resources.Strings.DuplicateDateErrorMessage"));
						} else {
							if (!this.validateWorkingDayType(row)) {
								this.mixins.ConfigurationGridUtilities.saveRowChanges.apply(this, [row, function() {
									this.insertDefaultWorkingInterval(row);
								}, scope]);
							} else {
								this.mixins.ConfigurationGridUtilities.saveRowChanges.apply(this, args);
							}
						}
					},

					/**
					 * Callback of saveRowChanges method. Insert default interval to db. Then open mini page
					 * @private
					 * @param row {Object} Active row
					 */
					insertDefaultWorkingInterval: function(row) {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "WorkingTimeInterval"
						});
						var defaultInterval = this.getDefaultWorkingInterval();
						var newIntervalId = this.Terrasoft.generateGUID();
						insert.setParameterValue("Id", newIntervalId, this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("DayOff", row.get("Id"), this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("From", defaultInterval.from, this.Terrasoft.DataValueType.DATE_TIME);
						insert.setParameterValue("To", defaultInterval.to, this.Terrasoft.DataValueType.DATE_TIME);
						insert.execute( function() {
							this.createDefaultInterval(row, defaultInterval, newIntervalId);
						}, this);
					},

					/**
					 * Callback of execute. Create default working interval.
					 * @private
					 * @param {Object} row
					 * @param {Object} defaultInterval
					 * @param {Guid} intervalId
					 */
					createDefaultInterval: function(row, defaultInterval, intervalId) {
						var item = {
							id: intervalId,
							from: defaultInterval.from,
							to: defaultInterval.to
						};
						var intervalsConfig = this.get("IntervalsConfig");
						intervalsConfig[row.get("Id")] = {
							intervals: [item]
						};
						var config = this.getWorkingIntervalMiniPageConfig(this.getDayCaption());
						if (config) {
							this.saveCardActiveRow(this.getActiveRow());
							if(!this.get("MiniCardAlreadyOpen")) {
								this.openMiniPage(config);
								this.set("MiniCardAlreadyOpen", true);
							}
						}
					},

					/**
					 * Get default working interval
					 * @private
					 * @returns {Object} default working interval
					 */
					getDefaultWorkingInterval: function() {
						var fromValue = Ext.Date.clearTime(new Date());
						fromValue.setHours(this.startDefaultWorkingInterval);
						var toValue = Ext.Date.clearTime(new Date());
						toValue.setHours(this.finishDefaultWorkingInterval);
						return {
							from: fromValue,
							to: toValue
						};
					},

					/**
					 * Validate empty date type
					 * @private
					 * @param {Object} row Active row
					 * @returns {Boolean} row is valid
					 */
					validateEmptyDateType: function(row) {
						var activeRow = row || this.getActiveRow();
						if (!activeRow.get("DayType")){
							return false;
						}
						return true;
					},

					/**
					 * Validate empty date
					 * @private
					 * @param {Object} row Active row
					 * @returns Boolean} row is valid
					 */
					validateEmptyDate: function(row) {
						var activeRow = row || this.getActiveRow();
						if (!activeRow.get("Date")){
							return false;
						}
						return true;
					},

					/**
					 * Validate if day type is working
					 * @private
					 * @param {Object} row Active row
					 * @returns {Boolean} row is valid
					 */
					validateWorkingDayType: function(row) {
						var isValid;
						var activeRow = row || this.getActiveRow();
						isValid = (activeRow.get("DayType.NonWorking") ||
						this.get("IntervalsConfig")[this.get("ActiveRow")]);
						return isValid;
					},


					/**
					 * @inheritdoc Terrasoft.GridUtilities#changeSorting
					 * @overridden
					 */
					changeSorting: function(config) {
						var gridData = this.getGridData();
						var index = config.index;
						var orderedColumnName = this.getOrderColumnName(config, index);
						var sortDirection = this.getColumnSortDirection(gridData.sortDirection);
						gridData.sortDirection = sortDirection;
						gridData.sort(null, sortDirection, this.sortHandler.bind(this, orderedColumnName));
						gridData.each(function(item, key) {
							gridData.collection.keys[key] = item.get("Id");
						});
						this.setSortingDirection(sortDirection, orderedColumnName);
					},

					/**
					 * Return column name for order
					 * @private
					 * @param {Object} config
					 * @param {Integer} index
					 * @returns {String} column name
					 */
					getOrderColumnName: function(config, index) {
						var columns = this.getSortingValues();
						if (this.Ext.isEmpty(config.tag)) {
							switch (index) {
								case "0":
									return columns[0].name;
								case "1":
									return columns[1].name;
								default:
									return columns[0].name;
							}
						}
					},

					/**
					 * Compare items
					 * @private
					 * @param {String} orderedColumnName
					 * @param {Object} item1
					 * @param {Object} item2
					 * @returns {Integer}
					 */
					sortHandler: function(orderedColumnName, item1, item2) {
						var comparer = 0;
						var value1 = item1.get(orderedColumnName).displayValue || item1.get(orderedColumnName);
						var value2 = item2.get(orderedColumnName).displayValue || item2.get(orderedColumnName);
						if (value1 < value2) {
							comparer = -1;
						}
						if (value1 > value2) {
							comparer = 1;
						}
						return comparer;
					},

					/**
					 * Set direction for sorting
					 * @private
					 * @param {Object} sortDirection
					 * @param {String} orderedColumnName
					 */
					setSortingDirection: function(sortDirection, orderedColumnName) {
						var columns = this.getSortingValues();
						for (var i = 0; i < columns.length; i++) {
							var column = columns[i];
							var columnName = column.name;
							if (orderedColumnName === columnName) {
								column.orderDirection = sortDirection;
								column.orderPosition = 1;
								this.set("SortColumnIndex", i);
								this.set("GridSortDirection", column.orderDirection);
							} else {
								column.orderDirection = "";
								column.orderPosition = "";
							}
							var caption = this.getColumnCaption(caption, column.orderDirection);
							this.set(this.name + columnName + "_SortedColumnCaption", caption);
						}
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilities#sortGrid
					 * @overridden
					 */
					sortGrid: function(tag) {
						this.changeSorting.call(this, {
							tag: tag
						});
						this.deselectRows();
						this.sortGridData();
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilities#sortColumn
					 * @overridden
					 */
					sortColumn: function(index) {
						this.changeSorting.call(this, {
							index: index
						});
						this.deselectRows();
						this.sortGridData();
					},

					/**
					 * Sorting grid data
					 * @protected
					 */
					sortGridData: function() {
						var tempGridDataCollection = new this.Terrasoft.Collection();
						var gridData = this.getGridData();
						tempGridDataCollection.loadAll(gridData);
						tempGridDataCollection.sortDirection = gridData.sortDirection;
						gridData.clear();
						gridData.loadAll(tempGridDataCollection);
						gridData.sortDirection = tempGridDataCollection.sortDirection;
					},
					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
					 * @overridden
					 */
					getFilterDefaultColumnName: function() {
						return "Date";
					},
					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getCopyRecordMenuItem
					 * @overridden
					 */
					getCopyRecordMenuItem: this.Terrasoft.emptyFn,
					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getEditRecordMenuItem
					 * @overridden
					 */
					getEditRecordMenuItem: this.Terrasoft.emptyFn,
					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#addDetailWizardMenuItems
					 * @overridden
					 */
					addDetailWizardMenuItems: this.Terrasoft.emptyFn,
					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridSortMenuItem
					 * @overridden
					 */
					getGridSortMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritDoc Terrasoft.MiniPageContainerViewModel#closeMiniPage
					 * @override
					 */
					closeMiniPage: this.Terrasoft.emptyFn,
					
					/**
					 * @inheritdoc Terrasoft.BaseGridDetails#getExportToExcelFileMenuItem
					 * @overridden
					 */
					getExportToExcelFileMenuItem: Terrasoft.emptyFn
				}
			};
		});


