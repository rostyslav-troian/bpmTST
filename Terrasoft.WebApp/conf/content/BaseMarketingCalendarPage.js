Terrasoft.configuration.Structures["BaseMarketingCalendarPage"] = {innerHierarchyStack: ["BaseMarketingCalendarPage"]};
define('BaseMarketingCalendarPageStructure', ['BaseMarketingCalendarPageResources'], function(resources) {return {schemaUId:'1c6cdb56-f417-440e-b836-d07b69e8b8a3',schemaCaption: "BaseMarketingCalendarPage", parentSchemaName: "", schemaName:'BaseMarketingCalendarPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMarketingCalendarPage", ["terrasoft", "ConfigurationEnums", "MarketingCalendar",
		"MarketingCalendarViewGenerator", "GridUtilitiesV2"],
	function(Terrasoft, ConfigurationEnums) {
		return {
			messages: {
				/**
				 * @message GetHistoryState
				 * Publish messages to receive state.
				 */
				"GetHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message PushHistoryState
				 * Post changes in the chain of states.
				 */
				"PushHistoryState": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetGridSettingsInfo
				 * Gets grid settings information
				 */
				"GetGridSettingsInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message OpenCalendarGridSettings
				 * Open calendar grid settings.
				 */
				"OpenCalendarGridSettings": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message SetCalendarScale
				 *  Set calendar scale.
				 */
				"SetCalendarScale": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"ToggleCalendar": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetGridSettingsInfo
				 * Subscribe on the grid settings changing
				 */
				"GridSettingsChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message OpenCardInChain
				 * The message on the card opening
				 * @param {Object} Config of the opened card
				 */
				"OpenCardInChain": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message SectionFiltersUpdated
				 * Subscribe on the grid settings changing
				 */
				"SectionFiltersUpdated": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetSectionFilters
				 * Gets section filters
				 */
				"GetSectionFilters": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"SortGrid": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"CalendarYearChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"SortColumn": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetEmptyMessageConfig
				 */
				"GetEmptyMessageConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				GridUtilities: "Terrasoft.GridUtilities"
			},
			attributes: {
				"Columns": {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.NUMBER,
					value: 24
				},
				"Rows": {
					type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
					dataValueType: Terrasoft.DataValueType.NUMBER,
					value: 8
				},
				"Selection": {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN
				},
				"SelectedItems": {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN
				},
				"GridData": {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				"ColumnsCaptionsConfig": [],
				"ScrollTop": {
					dataValueType: Terrasoft.DataValueType.INTEGER
				},
				"Scale": {
					dataValueType: Terrasoft.DataValueType.STRING
				},
				"IsReRendering": {dataValueType: Terrasoft.DataValueType.BOOLEAN},
				"IsPageable": {dataValueType: Terrasoft.DataValueType.BOOLEAN},
				IsRightGridContainerVisible: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},
				"CalendarYear": {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {
				/*
				 * Initializes the initial data for planning, initiating reception of all necessary data from the
				 * server.
				 * @protected
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initFilters();
						this.initIsPageable();
						this.initCalendarGridData();
						this.initColumnCaption();
						this.initGridViewModel();
						this.initEditPages();
						this.subscribeSandboxEvents();
						this.initViewOptionsButtonMenu(this.getViewOptions());
						this.mixins.GridUtilities.init.call(this);
						callback.call(scope);
					}, this
					]);
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					var resolvedClickSubscriberId = this.sandbox.id;
					this.sandbox.subscribe("OpenCalendarGridSettings", function() {
						this.openGridSettings();
					}, this, [resolvedClickSubscriberId]);
					this.sandbox.subscribe("SetCalendarScale", function(config) {
						this.setScale(config.tag);
					}, this, [resolvedClickSubscriberId]);
					this.sandbox.subscribe("ToggleCalendar", function(value) {
						this.set("IsRightGridContainerVisible", value);
					}, this, [resolvedClickSubscriberId]);
					this.sandbox.subscribe("SortGrid", function(tag) {
						this.sortGrid(tag);
					}, this, [resolvedClickSubscriberId]);
					this.sandbox.subscribe("CalendarYearChanged", function(value) {
						this.$CalendarYear = value;
						this.reloadGridData();
					}, this, [resolvedClickSubscriberId]);
				},

				/**
				 * Initializes a right part of the marketing calendar
				 * @protected
				 */
				initCalendarGridData: function() {
					this.set("GridData", this.Ext.create(Terrasoft.Collection));
					var profile = this.get("Profile");
					var scale = profile.Calendar ? profile.Calendar.scale : "Week";
					this.set("Scale", scale);
				},

				/**
				 * Sets calendar columns captions
				 * @protected
				 */
				initColumnCaption: function() {
					var columnsCaptionsConfig = [];
					var scale = this.get("Scale") || "Week";
					var prefix = this.get("Resources.Strings." + scale + "ScaleCaption");
					for (var i = 1; i <= this.getColumnsCount(); i++) {
						var period = this.convertScaleToPeriod(i);
						columnsCaptionsConfig.push({caption: prefix + " " + i + "<br><nobr>" + period + "</nobr>"});
					}
					this.set("ColumnsCaptionsConfig", columnsCaptionsConfig);
				},

				/**
				 * Initializes a grid view model
				 * @protected
				 * @virtual
				 */
				initGridViewModel: function() {
					this.set("DataGridViewModel", this.Ext.create("Terrasoft.Collection"));
				},

				/**
				 * Initializes the menu items "View" button calendar
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModelCollection} viewOptions Menu item
				 */
				initViewOptionsButtonMenu: function(viewOptions) {
					this.initOptionsButtonMenu("ViewOptionsButtonMenuItems", viewOptions);
				},

				/**
				 * Initializes the options button menu
				 * @protected
				 * @virtual
				 * @param {String} collectionName Initialized collection name
				 * @param {Terrasoft.BaseViewModelCollection} viewOptions Menu item
				 */
				initOptionsButtonMenu: function(collectionName, viewOptions) {
					var collection = this.get(collectionName);
					var newCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					viewOptions.each(function(item) {
						var newItem = this.cloneBaseViewModel(item);
						newCollection.addItem(newItem);
					}, this);
					if (collection) {
						collection.clear();
						collection.loadAll(newCollection);
					} else {
						this.set(collectionName, newCollection);
					}
				},

				/**
				 * Clones all values of the view model, handles nested collection.
				 * @param {Terrasoft.BaseViewModel} originalItem View model
				 * @return {Terrasoft.BaseViewModel|*} New view model
				 */
				cloneBaseViewModel: function(originalItem) {
					var newItem = this.Ext.create("Terrasoft.BaseViewModel");
					this.Terrasoft.each(originalItem.values, function(itemValue, valueName) {
						if (!(itemValue instanceof Terrasoft.Collection)) {
							newItem.set(valueName, this.Terrasoft.deepClone(itemValue));
						} else {
							var newItemsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
							itemValue.each(function(item) {
								newItemsCollection.add(this.cloneBaseViewModel(item));
							}, this);
							newItem.set(valueName, newItemsCollection);
						}
					}, this);
					return newItem;
				},

				/**
				 * Gets button menu items "View"
				 * @protected
				 * @virtual
				 * @return {Terrasoft.BaseViewModelCollection} Gets button menu items "View"
				 */
				getViewOptions: function() {
					var viewOptions = this.Ext.create("Terrasoft.BaseViewModelCollection");
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ViewButtonWeekScaleCaption"},
						"Click": {"bindTo": "setScale"},
						"Tag": "Week"
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ViewButtonMonthScaleCaption"},
						"Click": {"bindTo": "setScale"},
						"Tag": "Month"
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ViewButtonQuarterScaleCaption"},
						"Click": {"bindTo": "setScale"},
						"Tag": "Quarter"
					}));
					viewOptions.addItem(this.getButtonMenuSeparator());
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.OpenGridSettingsCaption"},
						"Click": {"bindTo": "openGridSettings"}
					}));
					return viewOptions;
				},

				/**
				 * Sets calendar scale.
				 * @param scale {String} Scale code.
				 */
				setScale: function(scale) {
					this.set("Scale", scale);
					this.set("IsReRendering", true);
					this.reCalcColumnRow();
					this.initColumnCaption();
					var calendar = this.getCalendar();
					calendar.reRender();
					this.set("IsReRendering", false);
					this.saveScaleToProfile(scale);
				},

				saveScaleToProfile: function(scale) {
					var profileKey = this.getProfileKey();
					var profile = this.get("Profile");
					var calendarProfile = profile.Calendar = profile.Calendar || {};
					calendarProfile.scale = scale;
					Terrasoft.utils.saveUserProfile(profileKey, profile, false);
				},

				/**
				 * Returns calendar grid
				 * @protected
				 * @return {Component}
				 */
				getCalendar: function() {
					return this.Ext.getCmp("MarketingCalendarId");
				},

				/**
				 * It returns information about the current state of the browser history.
				 * @protected
				 * @return {Object} Information
				 */
				getHistoryStateInfo: function() {
					return {
						workAreaMode: ConfigurationEnums.WorkAreaMode.SECTION
					};
				},

				/**
				 * Returns data grid name
				 * @protected
				 * @return {String}
				 */
				getDataGridName: function() {
					return "CalendarLeftGrid";
				},

				/**
				 * Performs actions required after page display
				 * @protected
				 * @virtual
				 */
				onRender: function() {
					this.callParent(arguments);
					this.loadGridData();
				},

				loadGridData: function() {
					this.showBodyMask({timeout: 0});
					this.mixins.GridUtilities.loadGridData.call(this);
				},

				onGridDataLoaded: function(response) {
					this.mixins.GridUtilities.onGridDataLoaded.call(this, response);
					this.hideBodyMask();
				},

				/**
				 * Gets the grid data rows collection
				 * @protected
				 * @return {Terrasoft.Collection}
				 */
				getGridData: function() {
					return this.get("GridData");
				},

				/**
				 * Converts date to the column number according to the calendar time scale
				 * @param date {Date} - Some date
				 * @returns {Number} - Column number
				 */
				convertDateToColumn: function(date) {
					var scale = this.get("Scale");
					return (scale === "Month") ? this.convertDateToMonth(date) :
						(scale === "Quarter") ? this.convertDateToQuarter(date) :
							this.convertDateToWeek(date);
				},

				/**
				 * Converts date to the column number when calendar is switched to the week time scale.
				 * Actually, returns the week number
				 * @param date {Date} - Some date
				 * @returns {Number} - Column number
				 */
				convertDateToWeek: function(date) {
					if (!date) {
						date = new Date();
					}

					var startWeek = Terrasoft.startOfWeek(date);
					if (startWeek.getYear() === date.getYear()) {
						var startYear = Terrasoft.startOfYear(date);
						var countDayToStartWeek = (startWeek - startYear) / 1000 / 60 / 60 / 24;
						var offset = countDayToStartWeek % 7;
						var week = (countDayToStartWeek - offset) / 7 + ((offset > 0) ? 1 : 0) + 1;
						return week;
					} else {
						return 1;
					}
				},

				/**
				 * Converts date to the column number when calendar is switched to the month time scale.
				 * Actually, returns the month number
				 * @param date {Date} - Some date
				 * @returns {Number} - Column number
				 */
				convertDateToMonth: function(date) {
					if (!date) {
						date = new Date();
					}
					return date.getMonth() + 1;
				},

				/**
				 * Converts date to the column number when calendar is switched to the quarter time scale.
				 * Actually, returns the quarter number
				 * @param date {Date} - Some date
				 * @returns {Number} - Column number
				 */
				convertDateToQuarter: function(date) {
					return Math.floor(date.getMonth() / 3) + 1;
				},

				/**
				 * Returns the columns count between two dates in the calendar
				 * @param startDate {Date}
				 * @param dueDate {Date}
				 * @returns {Number} Columns count
				 */
				convertDatesToDuration: function(startDate, dueDate) {
					var duration;
					if (dueDate) {
						duration = this.convertDateToColumn(dueDate) - this.convertDateToColumn(startDate) + 1;
					} else {
						duration = this.getCountWeekInCurrentYear() - this.convertDateToColumn(startDate) + 1;
					}
					return (duration > 1) ? duration : 1;
				},

				/**
				 * Returns the periods string according to the calendar time scale.
				 * String format: (mm/dd - mm/dd)
				 * Where:
				 *		mm - month number;
				 *		dd - date;
				 * Example:
				 *		Time scale is "Week" and current year is 2016
				 *		convertScaleToPeriod(1) --> returns (12/28-1/3)
				 * @param value {Number} Column number
				 * @returns {String} Period string
				 */
				convertScaleToPeriod: function(value) {
					var scale = this.get("Scale");
					return (scale === "Month") ? this.convertMonthToPeriod(value) :
						(scale === "Quarter") ? this.convertQuarterToPeriod(value) :
							this.convertWeekToPeriod(value);
				},

				/**
				 * Returns the periods string when calendar time scale is "Week"
				 * @param week {Number}
				 * @returns {String}
				 */
				convertWeekToPeriod: function(week) {
					var result = "";
					var curWeek = Terrasoft.startOfWeek(Terrasoft.startOfYear(new Date()));
					curWeek.setDate(curWeek.getDate() + (week - 1) * 7);
					result = "(" + (curWeek.getMonth() + 1) + "/" + curWeek.getDate() + "-";
					curWeek.setDate(curWeek.getDate() + 6);
					result += (curWeek.getMonth() + 1) + "/" + curWeek.getDate() + ")";
					return result;
				},

				/**
				 * Returns the periods string when calendar time scale is "Month"
				 * @param month {Number}
				 * @returns {String}
				 */
				convertMonthToPeriod: function(month) {
					var curMonth = new Date();
					curMonth.setMonth(month - 1);
					var startMonth = Terrasoft.startOfMonth(curMonth);
					var endMonth = Terrasoft.endOfMonth(curMonth);
					return "(" + (startMonth.getMonth() + 1) + "/" + startMonth.getDate() + "-" +
						(endMonth.getMonth() + 1) + "/" + endMonth.getDate() + ")";
				},

				/**
				 * Returns the periods string when calendar time scale is "Quarter"
				 * @param quarter {Number}
				 * @returns {String}
				 */
				convertQuarterToPeriod: function(quarter) {
					var curMonth = new Date();
					curMonth.setMonth((quarter - 1) * 3);
					var startQuarter = Terrasoft.startOfQuarter(curMonth);
					var endQuarter = Terrasoft.endOfQuarter(curMonth);
					return "(" + (startQuarter.getMonth() + 1) + "/" + startQuarter.getDate() + "-" +
						(endQuarter.getMonth() + 1) + "/" + endQuarter.getDate() + ")";
				},

				/**
				 * Returns a columns count in the calendar
				 * @returns {Number}
				 */
				getColumnsCount: function() {
					var scale = this.get("Scale");
					return (scale === "Month") ? 12 :
						(scale === "Quarter") ? 4 : this.getCountWeekInCurrentYear();
				},

				/**
				 * A weeks count in the current year
				 * @returns {Number}
				 */
				getCountWeekInCurrentYear: function() {
					return this.convertDateToWeek(Terrasoft.endOfYear(new Date()));
				},

				/**
				 * Returns the grid item color. If color is not set returns default color
				 * @param color {String}
				 * @returns {String}
				 */
				getGridItemColor: function(color) {
					return (!this.Ext.isEmpty(color)) ? color : "#c6f0ff";
				},

				/**
				 * Calendar vertical scroll change events handler
				 * @param value {Number} Vertial scroll position
				 */
				onScrollTopChanged: function(value) {
					this.set("ScrollTop", value);
				},

				/**
				 * Calendar item double click events handler
				 * @param itemId
				 */
				onItemDblClick: function(itemId) {
					var config = {
						moduleId: this.sandbox.id + this.getSchemaName(),
						schemaName: this.getSchemaName(),
						operation: "edit",
						id: itemId
					};
					this.sandbox.publish("OpenCardInChain", config);
				},

				/*
				 * Returns the name of the edit page when double-click on the calendar item.
				 * @protected
				 * @virtual
				 */
				getSchemaName: function() {
					return "BasePageV2";
				},

				/**
				 * Returns the number of records per page
				 * @overridden
				 * @inheritdoc Terrasoft.GridUtilities#getRowCount
				 * @return {Number}
				 */
				getRowCount: function() {
					return 50;
				},

				/**
				 * Returns columns settings page parameters
				 * @protected
				 * @return {Object}
				 */
				getGridSettingsInfo: function() {
					return Ext.apply(this.mixins.GridUtilities.getGridSettingsInfo.apply(this, arguments), {
						baseGridType: this.Terrasoft.GridType.LISTED,
						isSingleTypeMode: true
					});
				},

				/**
				 * Returns profile key
				 * @returns {String}
				 */
				getProfileKey: function() {
					return "MarketingCalendar" + this.entitySchema.name + "_GridSettings";
				},

				/**
				 * Prompts confirmation dialog to change the position / size of the calendar item.
				 * If the answer is 'Yes', changes StartDate / DueDate and stores in the database.
				 * If the answer is 'No' don't save element and move it to the previous position.
				 * @protected
				 */
				getPermissionChangeItem: function(values, callback) {
					if (this.get("IsReRendering")) {
						callback.call(this, true);
						return;
					}
					if (!this.isCanChangeItem(values.itemId)) {
						callback.call(this, false);
						return;
					}
					var message = this.get("Resources.Strings.ItemChangeConfirmationMessage");
					this.showConfirmationDialog(message, function(returnCode) {
						if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							var collection = this.get("GridData");
							var item = collection.get(values.itemId);
							var isNeedSave = false;
							if (values.column !== values.oldColumn) {
								var startDate = this.recalcStartDateByWeek(values.column);
								item.set("StartDate", startDate);
								isNeedSave = true;
							}
							if (values.column + values.colSpan !== values.oldColumn + values.oldColSpan) {
								var dueDate = this.recalcDueDateByWeek(values.column + values.colSpan - 1);
								item.set("DueDate", dueDate);
								isNeedSave = true;
							}
							var scope = this;
							item.saveEntity(function() {
								scope.updateProject(item);
							});
							callback.call(this, true);
						} else {
							callback.call(this, false);
						}
					}, ["yes", "cancel"]);
				},

				/**
				 * Returns is can drag calendar items
				 * @returns {Boolean}
				 */
				isCanChangeItem: function() {
					return this.get("Scale") === "Week";
				},

				/**
				 * Returns a start date of the week
				 * @param week {Number}
				 * @returns {Date}
				 */
				recalcStartDateByWeek: function(week) {
					if (week < 0 || week > this.getCountWeekInCurrentYear()) {
						return;
					}
					if (week === 0) {
						return Terrasoft.startOfYear(new Date());
					}
					var date = Terrasoft.startOfWeek(Terrasoft.startOfYear(new Date()));
					date.setDate(date.getDate() + (week) * 7);
					return date;
				},

				/**
				 * Returns a last date of the week
				 * @param week
				 * @returns {*}
				 */
				recalcDueDateByWeek: function(week) {
					if (week < 0 || week > this.getCountWeekInCurrentYear()) {
						return;
					}
					if (week === this.getCountWeekInCurrentYear() - 1) {
						return Terrasoft.endOfYear(new Date());
					}
					var date = Terrasoft.startOfWeek(Terrasoft.startOfYear(new Date()));
					date.setDate(date.getDate() + (week) * 7 + 6);
					return date;
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#getFilters
				 * @returns {Terrasoft.FilterGroup}
				 */
				getFilters: function() {
					var sectionFilters = this.get("SectionFilters");
					if (Ext.isEmpty(sectionFilters)) {
						return this.mixins.GridUtilities.getFilters.call(this);
					}
					var selectedYear = new Date().getFullYear();
					if (!Terrasoft.isEmpty(this.$CalendarYear) && !Terrasoft.isEmpty(this.$CalendarYear.value)) {
						selectedYear = this.$CalendarYear.value;
					}
					var serializationInfo = sectionFilters.getDefSerializationInfo();
					serializationInfo.serializeFilterManagerInfo = true;
					var deserializedFilters = Terrasoft.deserialize(sectionFilters.serialize(serializationInfo));
					deserializedFilters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.GREATER_OR_EQUAL,
						"StartDate", Terrasoft.startOfYear(new Date(Date.UTC(selectedYear, 0))),
						Terrasoft.DataValueType.DATE));
					deserializedFilters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.LESS_OR_EQUAL,
						"StartDate", Terrasoft.endOfYear(new Date(Date.UTC(selectedYear, 0))),
						Terrasoft.DataValueType.DATE));
					return deserializedFilters;
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilities#prepareResponseCollection
				 */
				prepareResponseCollection: function(collection) {
					this.mixins.GridUtilities.prepareResponseCollection.apply(this, arguments);
					var rowNumber = 0;
					collection.each(function(item) {
						item.set("Row", rowNumber++);
						item.set("Column", this.convertDateToColumn(item.get("StartDate")) - 1);
						item.set("Duration", this.convertDatesToDuration(item.get("StartDate"), item.get("DueDate")));
						item.set("Color", this.getGridItemColor(null));
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#getGridDataColumns
				 * @protected
				 */
				getGridDataColumns: function() {
					return this.mixins.GridUtilities.getGridDataColumns.call(this);
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#onFilterUpdate
				 * @overridden
				 */
				onFiltersUpdate: function(sectionFilters) {
					this.set("SectionFilters", sectionFilters);
					this.reloadGridData();
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#subscribeFiltersChanged
				 * @overridden
				 */
				subscribeSectionFiltersChanged: function() {
					var sectionModuleId = this.getSectionModuleId();
					this.sandbox.subscribe("SectionFiltersUpdated", function(sectionFilters) {
						this.onFiltersUpdate(sectionFilters);
					}, this, [sectionModuleId]);
				},

				/**
				 * Returns section module id
				 * @returns {String}
				 */
				getSectionModuleId: function() {
					return "SectionModuleV2_CampaignPlannerSection";
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#initFilters
				 */
				initFilters: function() {
					var quickFilterModuleId = this.getQuickFilterModuleId();
					var sectionFilters = this.sandbox.publish("GetSectionFilters", null, [quickFilterModuleId]) ||
						this.Ext.create("Terrasoft.FilterGroup");
					this.set("SectionFilters", sectionFilters);
					this.subscribeSectionFiltersChanged();
				},

				/**
				 * Generates quick filter module id.
				 * @protected
				 * @return {String}
				 */
				getQuickFilterModuleId: function() {
					return "SectionModuleV2_CampaignPlannerSection_QuickFilterModuleV2";
				},

				/**
				 * It initializes the initial value of the property used to page-loading
				 * @protected
				 */
				initIsPageable: function() {
					this.set("IsPageable", true);
				},

				/**
				 * Process loading data request
				 * @protected
				 */
				needLoadData: function() {
					if (!this.get("CanLoadMoreData")) {
						return;
					}
					this.mixins.GridUtilities.loadGridData.call(this);
				},

				onGetEmptyMessageConfig: function(config) {
					return this.sandbox.publish("GetEmptyMessageConfig", config, [this.sandbox.id]);
				},

				reCalcColumnRow: Terrasoft.emptyFn,

				sortColumn: function(index) {
					var profile = this.get("Profile");
					var profileClone = this.Terrasoft.deepClone(profile);
					this.set("Profile", profileClone);
					this.mixins.GridUtilities.sortColumn.call(this, index);
					this.sandbox.publish("SortColumn", index, [this.sandbox.id]);
				},

				isRightGridContainerVisible: function() {
					return this.get("IsRightGridContainerVisible") && !this.get("IsGridEmpty");
				},

				getCalendarContainerMarkerValue: function() {
					return this.get("IsRightGridContainerVisible")
						? "RightGridContainerVisible"
						: "RightGridContainerNotVisible";
				},

				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					switch (buttonTag) {
						case "open":
							this.editRecord(primaryColumnValue);
							break;
						case "delete":
							this.deleteRecords();
							break;
					}
				},

				editRecord: function(primaryColumnValue) {
					var activeRow = this.getActiveRow();
					var typeColumnValue = this.getTypeColumnValue(activeRow);
					var schemaName = this.getEditPageSchemaName(typeColumnValue);
					var hash = this.Terrasoft.combinePath("CardModuleV2", schemaName,
						ConfigurationEnums.CardStateV2.EDIT, primaryColumnValue);
					this.sandbox.publish("PushHistoryState", {
						hash: hash
					});
				},

				getActiveRow: function() {
					var activeRow = null;
					var primaryColumnValue = this.get("ActiveRow");
					if (primaryColumnValue) {
						activeRow = this.getGridDataRow(primaryColumnValue);
					}
					return activeRow;
				},

				getGridDataRow: function(primaryColumnValue) {
					var gridData = this.getGridData();
					return gridData.find(primaryColumnValue);
				},

				getGridRowViewModelClassName: function() {
					return "Terrasoft.BaseSectionGridRowViewModel";
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "CalendarContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["calendar-container"],
						"markerValue": {
							"bindTo": "getCalendarContainerMarkerValue"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CalendarLeftGridContainer",
					"parentName": "CalendarContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["calendar-left-grid-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CalendarLeftGrid",
					"parentName": "CalendarLeftGridContainer",
					"propertyName": "items",
					"values": {
						"id": "CalendarLeftGridId",
						"itemType": Terrasoft.ViewItemType.GRID,
						"className": "Terrasoft.MarketingCalendarGrid",
						"listedZebra": false,
						"collection": {"bindTo": "GridData"},
						"activeRow": {"bindTo": "ActiveRow"},
						"primaryColumnName": "Id",
						"isEmpty": {"bindTo": "IsGridEmpty"},
						"multiSelect": {"bindTo": "MultiSelect"},
						"selectedRows": {"bindTo": "SelectedRows"},
						"sortColumn": {"bindTo": "sortColumn"},
						"needLoadData": {"bindTo": "needLoadData"},
						"sortColumnDirection": {"bindTo": "GridSortDirection"},
						"sortColumnIndex": {"bindTo": "SortColumnIndex"},
						"linkClick": {"bindTo": "linkClicked"},
						"scrollTop": {bindTo: "ScrollTop"},
						"getEmptyMessageConfig": {"bindTo": "onGetEmptyMessageConfig"},
						"type": "listed",
						"activeRowAction": {
							"bindTo": "onActiveRowAction"
						},
						"activeRowActions": []
					}
				},
				{
					"operation": "insert",
					"name": "DataGridActiveRowOpenAction",
					"parentName": "CalendarLeftGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": {"bindTo": "Resources.Strings.OpenRecordGridRowButtonCaption"},
						"tag": "open"
					}
				},
				{
					"operation": "insert",
					"name": "DataGridActiveRowDeleteAction",
					"parentName": "CalendarLeftGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						"caption": {"bindTo": "Resources.Strings.DeleteRecordGridRowButtonCaption"},
						"tag": "delete"
					}
				},
				{
					"operation": "insert",
					"name": "CalendarRightGridContainer",
					"parentName": "CalendarContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["calendar-right-grid-container"],
						"visible": {
							"bindTo":"isRightGridContainerVisible"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "MarketingCalendar",
					"parentName": "CalendarRightGridContainer",
					"propertyName": "items",
					"values": {
						"generator": "MarketingCalendarViewGenerator.generate",
						"id": "MarketingCalendarId",
						"items": {bindTo: "GridData"},
						"selection": {bindTo: "Selection"},
						"selectedItems": {bindTo: "SelectedItems"},
						"columnsCaptionsConfig": {bindTo: "ColumnsCaptionsConfig"},
						"scrollTop": {bindTo: "ScrollTop"},
						"scrollTopChanged": {bindTo: "onScrollTopChanged"},
						"itemDblClick": {bindTo: "onItemDblClick"},
						"columns": {bindTo: "getColumnsCount"},
						"getPermissionChangeItem": {bindTo: "getPermissionChangeItem"}
					}
				}
			]
		};
	}
);


