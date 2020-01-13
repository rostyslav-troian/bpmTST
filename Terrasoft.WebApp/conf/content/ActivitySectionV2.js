Terrasoft.configuration.Structures["ActivitySectionV2"] = {innerHierarchyStack: ["ActivitySectionV2NUI", "ActivitySectionV2"], structureParent: "BaseSectionV2"};
define('ActivitySectionV2NUIStructure', ['ActivitySectionV2NUIResources'], function(resources) {return {schemaUId:'569aaf1a-5943-4f87-ab47-948d941e4920',schemaCaption: "Activities section", parentSchemaName: "BaseSectionV2", schemaName:'ActivitySectionV2NUI',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivitySectionV2Structure', ['ActivitySectionV2Resources'], function(resources) {return {schemaUId:'2c887791-3cc6-4db4-b1b1-eba4aa7cf1ea',schemaCaption: "Activities section", parentSchemaName: "ActivitySectionV2NUI", schemaName:'ActivitySectionV2',parentSchemaUId:'569aaf1a-5943-4f87-ab47-948d941e4920',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivitySectionV2NUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivitySectionV2NUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivitySectionV2NUI", ["BaseFiltersGenerateModule", "ConfigurationConstants", "ConfigurationEnums",
			"ProcessModuleUtilities", "GoogleIntegrationUtilitiesV2",
			"ActivitySectionGridRowViewModel", "css!ActivitySectionCSS"],
	function(BaseFiltersGenerateModule, ConfigurationConstants, ConfigurationEnums,
			ProcessModuleUtilities) {
		return {
			/**
			 *
			 */
			entitySchemaName: "Activity",
			mixins: {
				GoogleIntegrationUtils: "Terrasoft.GoogleIntegrationUtilities"
			},
			attributes: {
				/**
				 * ######### ####### #### ########## ####### ##########.
				 */
				IntervalMenuItems: {dataValueType: this.Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######### ######### ##########.
				 */
				ScheduleGridData: {dataValueType: this.Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######## ############# "##########".
				 */
				"SchedulerDataViewName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					value: "SchedulerDataView"
				},

				/**
				 * ######, ########## ######## ######### # ######## #### ######### #######.
				 */
				SchedulerSelection: {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					value: null
				},

				/**
				 * ######### ####### ########### #### ##########.
				 */
				SchedulerFloatItemsCollection: {dataValueType: this.Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######## ############# #######.
				 */
				GetSchedulerSelectionPressedKeys: {
					dataValue: this.Terrasoft.DataValueType.TEXT,
					value: ""
				},

				/**
				 * ########## ########### ####### # ##########.
				 */
				"SchedulePageCount": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					value: 0
				},

				/**
				 * ########## ####### ## ######## # ##########. ############ ######### ##########.
				 */
				"SchedulerItemsAmountPerPage": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER
				},
				"canUseSyncFeaturesByBuildType": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			messages: {
				/**
				 * @message GetIsVisibleEmailPageButtons
				 * ########## ######### ###### ######## ######## Email.
				 * @param {Object} ######## ########, ####### ######## ## ######### ######.
				 */
				"GetIsVisibleEmailPageButtons": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				"OpenItem": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ProcessExecDataChanged
				 * ########## ### ##### ######## ###### ########## ########.
				 * @param {Object}
				 * procElUId: ############# ######## ########,
				 * recordId: ############# ######,
				 * scope: ########,
				 * parentMethodArguments: ######## ### ############# ######,
				 * parentMethod: ############ #####.
				 */
				"ProcessExecDataChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetFixedFilter
				 * ######## ######## FixedFilter.
				 * @param {String} ######## #######.
				 * @return {Object} ######.
				 */
				"GetFixedFilter": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetSimpleTaskAddViewModel
				 * ########### ############ ###### #### ######## ########## ######.
				 */
				"GetSimpleTaskAddViewModel": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SimpleTaskViewModelCreated
				 * ######## ############## ###### #### ######## ########## ######.
				 */
				"SimpleTaskViewModelCreated": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message RenderSimpleTaskAddView
				 * ########## ######### #### ######## ########## ######.
				 * @param {Object}
				 * renderTo: ############# ########## ### #########,
				 * viewModel: ###### #### ######## ########## ######.
				 */
				"RenderSimpleTaskAddView": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message RemoveViewModel
				 * ####### ######### ## ######## ###### #### ######## ########## ###### ## ######### ##########.
				 */
				"RemoveViewModel": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetEnteredKeys
				 * ########## ######### ############# ####### ### ####### ########## ###### ##### #########.
				 * @return {String} ###### ######### ########.
				 */
				"GetSchedulerSelectionPressedKeys": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ReloadGridAfterAdd
				 * ######### ###### ### ########### ######.
				 */
				"ReloadGridAfterAdd": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {
				/**
				 * Initialize defaults values of the section.
				 * @overridden
				 */
				init: function(callback, scope) {
					this.set("SelectedRows", []);
					this.initFiltersUpdateDelay();
					this.registerGetIsVisibleEmailPageButtonsHandler();
					this.initScheduleGridData();
					this.initSchedulerFloatItemsCollection();
					this.initSchedulerTimeScaleLookupValue();
					this.initMailBoxSyncSettings();
					this.initFixedFiltersConfig();
					this.initIntervalMenuItems();
					this.initRowCount();
					var parentInitFn = this.getParentMethod(this, [function() {
						this._updateSchedulerDates();
						Ext.callback(callback, scope);
					}, this]);
					this.initSchedulerItemsAmountPerPage(parentInitFn);
					var sysSettings = ["BuildType"];
					Terrasoft.SysSettings.querySysSettings(sysSettings, function() {
						var cachedSettings = Terrasoft.SysSettings.cachedSettings;
						var buildType = cachedSettings.BuildType && cachedSettings.BuildType.value;
						var isNotPublic = buildType !== ConfigurationConstants.BuildType.Public;
						this.set("canUseSyncFeaturesByBuildType", isNotPublic);
					}, this);
					this.mixins.GoogleIntegrationUtils.init.call(this);
					this.initGoogleCalendarLog();
				},

				/**
				 * Initializes the value of the number of records on the page in the schedule.
				 */
				initSchedulerItemsAmountPerPage: function(callback) {
					this.Terrasoft.SysSettings.querySysSettingsItem("SchedulerItemsAmountPerPage", function(value) {
						var rowCount = this.get("RowCount");
						var schedulerItemsAmountPerPage = value || rowCount || 0;
						this.set("SchedulerItemsAmountPerPage", schedulerItemsAmountPerPage);
						Ext.callback(callback);
					}, this);
				},

				/**
				 * ############## ######### ###### ############# ########.
				 * @protected
				 */
				initScheduleGridData: function() {
					this.set("ScheduleGridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				},

				/**
				 * ############## ######### ###### ############# ########.
				 * @protected
				 */
				initSchedulerFloatItemsCollection: function() {
					this.set("SchedulerFloatItemsCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				},

				/**
				 * ############## ######## ########## ######### # ##########.
				 * @protected
				 */
				initSchedulerTimeScaleLookupValue: function() {
					var profile = this.get("Profile");
					this.set("SchedulerTimeScaleLookupValue", {
						value: (profile && profile.schedulerTimeScaleLookupValue) ||
						this.Terrasoft.TimeScale.THIRTY_MINUTES
					});
				},

				/**
				 * ######## ######### #######.
				 * @override
				 * @protected
				 * @return {Collection}
				 */
				getGridData: function() {
					if (this.isNotSchedulerDataView()) {
						return this.get("GridData");
					} else {
						return this.get("ScheduleGridData");
					}
				},

				/**
				 * ############# ############# ########### #######.
				 * @protected
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1010);
					this.callParent(arguments);
				},

				/**
				 * ########## #######, ####### ###### ########## ########.
				 * @protected
				 * @overridden
				 * @return {Object} ########## ###### ########-############ #######.
				 */
				getGridDataColumns: function() {
					var baseGridDataColumns = this.callParent(arguments);
					var gridDataColumns = {
						"Account": {path: "Account"},
						"StartDate": {path: "StartDate"},
						"DueDate": {path: "DueDate"},
						"ShowInScheduler": {path: "ShowInScheduler"},
						"Status": {path: "Status"},
						"Status.Finish": {path: "Status.Finish"},
						"ProcessElementId": {
							path: "ProcessElementId",
							dataValueType: 0
						}
					};
					return Ext.apply(baseGridDataColumns, gridDataColumns);
				},

				/**
				 * ########## ######## ######### ### ######## ############# #####.
				 * @overridden
				 * @return {boolean} ######### ###### ####.
				 */
				isMultiSelectVisible: function() {
					return (!this.get("MultiSelect") && this.isNotSchedulerDataView());
				},

				/**
				 * ########## ######## ######### ### ######## ######## ############# #####.
				 * @return {boolean} ######### ###### ####.
				 */
				isSingleSelectVisible: function() {
					return this.get("MultiSelect") && this.isNotSchedulerDataView();
				},

				/**
				 * ########## ######## ######### ### ######## ##### ### #########.
				 * @return {boolean} ######### ###### ####.
				 */
				isUnSelectVisible: function() {
					return this.isAnySelected() && this.isNotSchedulerDataView();
				},

				/**
				 * ############# ######## ######### ### ######## ######### # ######.
				 */
				setAddFolderActionVisible: function() {
					this.set("IsIncludeInFolderButtonVisible", this.isNotSchedulerDataView());
				},

				/**
				 * #########, ###### ## ###### ######### ## ###### # #### ###### ########.
				 * @protected
				 * @return {Boolean} ######### ########.
				 */
				isExcludeFromFolderButtonVisible: function() {
					var currentFolder = this.get("CurrentFolder");
					var visible = currentFolder ?
						(currentFolder.folderType.value === ConfigurationConstants.Folder.Type.General) :
						false;
					return visible && this.isNotSchedulerDataView();
				},

				/**
				 * Synchronizes with Google calendar and activities.
				 * @protected
				 */
				synchronizeNow: function() {
					if (this.get("canUseSyncFeaturesByBuildType")) {
						this.synchronizeWithGoogleCalendar();
					} else {
						if (!this.get("IsExchangeSyncExist")) {
							this.showConfirmationDialog(this.get("Resources.Strings.SettingsNotSet"), function(result) {
								if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.showSyncDialog();
								}
							}, ["yes", "no"]);
						}
					}
				},

				/**
				 * ######### ####### ######## ############# # ######### #######
				 * # ############# ############### ######## ######.
				 * @protected
				 */
				initMailBoxSyncSettings: function() {
					this.set("isMailboxSyncExist", false);
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					esq.addColumn("Id");
					var filter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"SysAdminUnit", this.Terrasoft.SysValue.CURRENT_USER.value);
					esq.filters.addItem(filter);
					esq.getEntityCollection(function(response) {
						if (response.success) {
							this.set("isMailboxSyncExist", (response.collection.getCount() > 0));
						}
					}, this);
				},

				/**
				 * ###### ######## ######### #############. ########## ### ########.
				 * ### ######### ############# ##########.
				 * @protected
				 * @overridden
				 */
				setActiveView: function() {
					this.set("IsGridEmpty", false);
					this.callParent(arguments);
					this.setAddFolderActionVisible();
					if (this.isSchedulerDataView()) {
						this.showBodyMask();
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#loadGridDataView
				 * @overridden
				 */
				loadGridDataView: function(loadData) {
					var refreshData = loadData;
					loadData = false;
					this.callParent(arguments);
					if (refreshData === true) {
						this.refreshGridData();
					}
				},

				/**
				 * ############## ############# #######.
				 * @protected
				 */
				initFixedFiltersConfig: function() {
					var fixedFilterConfig = {
						entitySchema: this.entitySchema,
						filters: [
							{
								name: "PeriodFilter",
								caption: this.get("Resources.Strings.PeriodFilterCaption"),
								dataValueType: this.Terrasoft.DataValueType.DATE,
								startDate: {
									columnName: "StartDate",
									defValue: this.Terrasoft.startOfWeek(new Date())
								},
								dueDate: {
									columnName: "DueDate",
									defValue: this.Terrasoft.endOfWeek(new Date())
								}
							},
							{
								name: "Owner",
								caption: this.get("Resources.Strings.OwnerFilterCaption"),
								addOwnerCaption: this.get("Resources.Strings.AddEmployeeFilterCaption"),
								hint: this.get("Resources.Strings.SelectEmployeeFilterHint"),
								columnName: "Owner",
								defValue: this.Terrasoft.SysValue.CURRENT_USER_CONTACT,
								dataValueType: this.Terrasoft.DataValueType.LOOKUP,
								filter: BaseFiltersGenerateModule.OwnerFilter,
								appendFilter: function(filterInfo) {
									var confirmedFilter;
									if (filterInfo.value && filterInfo.value.length > 0) {
										var inviteResponse = ConfigurationConstants.Activity.ParticipantInviteResponse;
										confirmedFilter = new Terrasoft.createFilterGroup();
										confirmedFilter.add("InviteResponseFilter", Terrasoft.createColumnFilterWithParameter(
												Terrasoft.ComparisonType.NOT_EQUAL,
												"[ActivityParticipant:Activity].InviteResponse",
												inviteResponse.Declined,
												Terrasoft.DataValueType.GUID));
										confirmedFilter.add("ActivityParticipantFilter", Terrasoft.createColumnInFilterWithParameters(
												"[ActivityParticipant:Activity].Participant",
												filterInfo.value));
									}
									return confirmedFilter;
								}
							}
						]
					};
					this.set("FixedFilterConfig", fixedFilterConfig);
				},

				/**
				 * ############ ###########.
				 * @protected
				 */
				registerGetIsVisibleEmailPageButtonsHandler: function() {
					this.sandbox.subscribe("GetIsVisibleEmailPageButtons", function(config) {
						this.set(config.key, config.value);
					}, this);
				},

				/**
				 * ######## ############# ## #########.
				 * @protected
				 * @return {Object}
				 */
				getDefaultDataViews: function() {
					var baseDataViews = this.callParent();
					baseDataViews.SchedulerDataView = {
						index: 0,
						name: "SchedulerDataView",
						caption: this.get("Resources.Strings.SchedulerHeader"),
						hint: this.get("Resources.Strings.CalendarDataViewHint"),
						icon: this.get("Resources.Images.SchedulerDataViewIcon")
					};
					baseDataViews.GridDataView.index = 1;
					baseDataViews.AnalyticsDataView.index = 2;
					return baseDataViews;
				},

				/**
				 * Handler of the update filters in section.
				 * @overridden
				 */
				onFilterUpdate: function() {
					this.callParent(arguments);
					this._updateSchedulerDates();
				},

				/**
				 * Updates scheduler start and due dates.
				 * @private
				 */
				_updateSchedulerDates: function() {
					if (this.isSchedulerDataView()) {
						this.set("SchedulePageCount", 0);
					}
					var periodFilter = this._getPeriodFilterFromFixedFilter() || this._getProfilePeriodFilter();
					this.set("SchedulerStartDate", periodFilter.startDate);
					this.set("SchedulerDueDate", periodFilter.dueDate);
				},

				/**
				 * Gets period filter of the profile.
				 * @private
				 * @return {Object} {startDate: Date, dueDate: Date} Period filter of the profile or new date.
				 */
				_getProfilePeriodFilter: function() {
					var profileFilters = Terrasoft.deepClone(this.getProfileFilters());
					var fixedFilters = profileFilters && profileFilters.FixedFilters;
					var fixedFilter = fixedFilters && fixedFilters.Fixed;
					var periodFilter = fixedFilter && fixedFilter.PeriodFilter || {};
					if (!periodFilter.startDate || !periodFilter.dueDate) {
						periodFilter.startDate = new Date();
						periodFilter.dueDate = new Date();
					}
					var startDate = new Date(periodFilter.startDate);
					var dueDate = new Date(periodFilter.dueDate);
					return {
						startDate: startDate,
						dueDate: dueDate
					};
				},

				/**
				 * Gets period filter from the fixed filter.
				 * @private
				 * @return {Object|null} {startDate: Date, dueDate: Date} Period filter of the profile or new date.
				 */
				_getPeriodFilterFromFixedFilter: function() {
					var quickFilterModuleId = this.getQuickFilterModuleId();
					var filters = this.sandbox.publish("GetFixedFilter", {filterName: "PeriodFilter"},
						[quickFilterModuleId]);
					return Terrasoft.isEmptyObject(filters) ? null : filters;
				},

				/**
				 * Load scheduler data view.
				 * @protected
				 * @param {Boolean} loadData Data loading flag.
				 */
				loadSchedulerDataView: function(loadData) {
					this.initSchedulerTimeScaleLookupValue();
					this.set("IsActionButtonsContainerVisible", true);
					this.set("IsAnalyticsActionButtonsContainerVisible", false);
					this.set("IsClearGridData", true);
					this.set("ActiveRow", null);
					this.set("SelectedRows", []);
					this.set("SchedulePageCount", 0);
					if (loadData === false) {
						return;
					}
					this.loadGridData();
				},

				/**
				 * Returns section filters list.
				 * @protected
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					var fixedFilters = filters.contains("FixedFilters")	? filters.get("FixedFilters") : null;
					if (!this.Ext.isEmpty(fixedFilters) && fixedFilters.contains("Owner")) {
						var ownerFilters = fixedFilters.get("Owner");
						if (ownerFilters.contains("OwnerDefaultFilter")) {
							ownerFilters.removeByKey("OwnerDefaultFilter");
						}
					}
					if (this.isSchedulerDataView()) {
						if (!filters.contains("ShowInSchedulerFilter")) {
							filters.add("ShowInSchedulerFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "ShowInScheduler", true));
						}
						if (!fixedFilters) {
							fixedFilters = this.Terrasoft.createFilterGroup();
							fixedFilters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
							filters.add("FixedFilters", fixedFilters);
						}
						var hasPeriodFilters = fixedFilters.contains("PeriodFilter");
						var periodFilter = hasPeriodFilters ? fixedFilters.get("PeriodFilter") : null;
						if (!hasPeriodFilters || (periodFilter && !(periodFilter instanceof Terrasoft.Collection))) {
							this.setDateFiltersCurrentDate(fixedFilters);
						}
					}
					if (this.isNotSchedulerDataView() &&
						filters.contains("ShowInSchedulerFilter")) {
						filters.removeByKey("ShowInSchedulerFilter");
					}

					filters.add("NotEmailFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.NOT_EQUAL, "Type", ConfigurationConstants.Activity.Type.Email
					));

					return filters;
				},

				/**
				 * ############# ############ ####### ## ####### ### ########## ## ####### ####.
				 * @private
				 * @param {Object} fixedFilters ###### ############ ########.
				 */
				setDateFiltersCurrentDate: function(fixedFilters) {
					var now = new Date();
					var periodFilter = this.Terrasoft.createFilterGroup();
					periodFilter.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					periodFilter.add("DueDate", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, "DueDate",
						this.Terrasoft.startOfDay(now)));
					periodFilter.add("StartDate", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.LESS_OR_EQUAL, "StartDate",
						this.Terrasoft.endOfDay(now)));
					if (fixedFilters.contains("PeriodFilter")) {
						fixedFilters.removeByKey("PeriodFilter");
					}
					fixedFilters.add("PeriodFilter", periodFilter);
				},

				/**
				 * ############## ######### ######### ### ###### # ########### ######### ##########.
				 * @protected
				 */
				initIntervalMenuItems: function() {
					this.set("IntervalMenuItems", this.Ext.create("Terrasoft.BaseViewModelCollection"));
					var intervalMenuItems = this.get("IntervalMenuItems");
					var timeScaleFormat = this.get("Resources.Strings.IntervalFormat");
					var intervals = this.getSchedulerIntervals();
					this.Terrasoft.each(intervals, function(interval) {
						intervalMenuItems.addItem(this.getButtonMenuItem({
							"Caption": this.Ext.String.format(timeScaleFormat, interval),
							"Click": {bindTo: "changeInterval"},
							"Tag": interval
						}));
					}, this);
				},

				/**
				 * Returns intervals for scheduler.
				 * @protected
				 * @virtual
				 */
				getSchedulerIntervals: function() {
					var intervals = [];
					this.Terrasoft.each(this.Terrasoft.TimeScale, function(value) {
						intervals.push(value);
					});
					var excludedIntervals = this.getExcludedIntervals();
					intervals = this.Terrasoft.difference(intervals, excludedIntervals);
					return intervals;
				},

				/**
				 * Returns excluded intervals.
				 * @protected
				 * @virtual
				 * @return {Array} Excluded intervals.
				 */
				getExcludedIntervals: function() {
					return [this.Terrasoft.TimeScale.ONE_MINUTE];
				},

				/**
				 * ######## ######## ##### ####### ######## ########## ##########.
				 * @protected
				 * @param {Terrasoft.TimeScale} value ######## ##### #######.
				 */
				changeInterval: function(value) {
					var profile = this.get("Profile");
					if (profile) {
						profile.schedulerTimeScaleLookupValue = value;
						this.Terrasoft.utils.saveUserProfile(this.getProfileKey(), profile, false);
					}
					this.set("SchedulerTimeScaleLookupValue", {value: value});
				},

				/**
				 * ######## ######## ##### ####### ######## ########## ##########.
				 * @protected
				 * @return {Object} ####### ######## ##### #######.
				 */
				getTimeScale: function() {
					var schedulerTimeScaleLookupValue = this.get("SchedulerTimeScaleLookupValue");
					return (schedulerTimeScaleLookupValue && schedulerTimeScaleLookupValue.value);
				},

				/**
				 * ######## ###### ######## ########## ##########.
				 * @protected
				 * @return {Object} ######## ########## ##########.
				 */
				getSchedulerPeriod: function() {
					var startDate = this.get("SchedulerStartDate") || new Date();
					var dueDate = this.get("SchedulerDueDate") || new Date();
					var clearDueDate = this.Ext.Date.clearTime(dueDate);
					var clearStartDate = this.Ext.Date.clearTime(startDate);
					var selectedPeriod = clearDueDate - clearStartDate;
					if (selectedPeriod < 0) {
						startDate = dueDate;
					}
					return {
						startDate: startDate,
						dueDate: dueDate
					};
				},

				/**
				 * ############ ####### ######### ######## ##########.
				 * @protected
				 */
				changeScheduleItem: Terrasoft.emptyFn,

				/**
				 * ######## #######, ######## ## ###### ##########.
				 * @protected
				 * @return {Boolean} ########## ###### ##########.
				 */
				getSchedulerButtonsEnabled: function() {
					var selectedValues = this.get("SelectedRows");
					return selectedValues && (selectedValues.length > 0);
				},

				/**
				 * ######### ######.
				 * @protected
				 */
				refreshGridData: function() {
					var gridData = this.getGridData();
					if (gridData) {
						gridData.clear();
						this.loadGridData();
					}
				},

				/**
				 * Execute synchronization with Google Calendars.
				 * @protected
				 */
				synchronizeWithGoogleCalendar: function() {
					this.showBodyMask();
					if (!this.get("GoogleSyncExists") && !this.get("IsExchangeSyncExist")) {
						this.showConfirmationDialog(this.get("Resources.Strings.SettingsNotSet"),
							function(result) {
								if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.showSyncDialog();
								}
							}, ["yes", "no"]);
						this.hideBodyMask();
						return;
					}
					if (!this.get("GoogleSyncExists") && this.get("IsExchangeSyncExist")) {
						this.hideBodyMask();
						return;
					}
					this.startGoogleSynchronization();
				},

				/**
				 * ######### email #########.
				 * @obsolete
				 * @protected
				 */
				loadImapEmails: function() {
					window.console.warn(this.Ext.String.format(
						this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
						"loadImapEmails", "loadEmails"));
					this.loadEmails();
				},

				/**
				 * ######### email #########.
				 * @protected
				 */
				loadEmails: function() {
					if (!this.get("isMailboxSyncExist")) {
						var buttonsConfig = {
							buttons: [this.Terrasoft.MessageBoxButtons.OK.returnCode],
							defaultButton: 0
						};
						this.Terrasoft.showInformation(this.get("Resources.Strings.MailboxSettingsEmpty"),
							this.Terrasoft.emptyFn, this, buttonsConfig);
						return;
					}
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ActivityFolder"
					});
					select.addColumn("Id");
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"[MailboxSyncSettings:MailboxName:Name].SysAdminUnit", this.Terrasoft.SysValue.CURRENT_USER.value));
					select.getEntityCollection(function(response) {
						if (response.success) {
							this.Terrasoft.each(response.collection.getItems(), function(item) {
								var requestUrl = this.Terrasoft.workspaceBaseUrl +
									"/ServiceModel/ProcessEngineService.svc/LoadImapEmailsProcess/" +
									"Execute?ResultParameterName=LoadResult" +
									"&MailBoxFolderId=" + item.get("Id");
								this.showBodyMask();
								this.Ext.Ajax.request({
									url: requestUrl,
									headers: {
										"Content-Type": "application/json",
										"Accept": "application/json"
									},
									method: "POST",
									scope: this,
									callback: function(request, success, response) {
										this.hideBodyMask();
										var responseData;
										if (success) {
											var responseValue = response.responseXML.firstChild.textContent;
											responseData = this.Ext.decode(this.Ext.decode(responseValue));
											this.refreshGridData();
											this.Terrasoft.utils.showInformation(
												this.get("Resources.Strings.LoadImapEmailsResult"), null, null,
												{buttons: ["ok"]});
										}
										if (responseData && responseData.Messages.length > 0) {
											this.Terrasoft.each(responseData.Messages, function(element) {
												this.Terrasoft.utils.showInformation(element.message, null, null,
													{buttons: ["ok"]});
											}, this);
										}
									}
								});
							}, this);
						}
					}, this);
				},

				/**
				 * Opens page for editing entity of the activity.
				 * @protected
				 */
				openItem: function() {
					var gridData = this.getGridData();
					var selectedRows = this.get("SelectedRows");
					var activeRow = gridData.get(selectedRows);
					var typeColumnValue = this.getTypeColumnValue(activeRow);
					var schemaName = this.getEditPageSchemaName(typeColumnValue);
					this.openCard(schemaName, "edit", selectedRows);
				},

				/**
				 * ############# ######### ######## # ############ ############# # ########### ## ######.
				 */
				setFiltersVisibleInCombinedMode: function() {
					var schema = this.Ext.get(this.name + "Container");
					if (schema) {
						if (this.isSchedulerDataView()) {
							this.setGridOffsetClass();
							if (!schema.hasCls("filters-hidden")) {
								schema.addCls("filters-hidden");
							}
						} else {
							schema.removeCls("filters-hidden");
							this.setGridOffsetClass(this.get("GridOffsetLinesCount"));
						}
					}
				},

				/*
				 * ######### ########### ####### ######## ####### NotEmailFilter.
				 * @inheritdoc Terrasoft.BaseSectionV2#getVerticalGridOffset
				 * @overridden
				 */
				getVerticalGridOffset: function(filters) {
					var linesCount = this.callParent(arguments);
					var notEmailFilter = filters.collection.findBy(
						function(item, key) {
							return (key === "NotEmailFilter");
						});
					if (notEmailFilter) {
						linesCount--;
					}
					return linesCount;
				},

				/**
				 * ######### ############# ######### ###### ########## #######.
				 * @overridden
				 * @param {Integer|*} linesCount ########## #####.
				 * @return {boolean} ############# ######### ####### ########## #######.
				 */
				needToSetOffset: function(linesCount) {
					return (linesCount != null && !this.isSchedulerDataView());
				},

				/**
				 * ######## ########## ######.
				 * @protected
				 */
				copyItem: function() {
					var selectedItem = this.get("SelectedRows");
					var gridData = this.getGridData();
					var activeRow = gridData.get(selectedItem);
					var primaryColumnValue = activeRow.get(activeRow.primaryColumnName);
					this.copyRecord(primaryColumnValue);
				},

				/**
				 * ####### ##########.
				 * @protected
				 */
				deleteItem: function() {
					this.deleteRecords();
				},

				/**
				 * ########## ######### ###### # ##########.
				 * @protected
				 * @overridden
				 * @return {Array|null} ###### #######.
				 */
				getSelectedItems: function() {
					if (this.isSchedulerDataView()) {
						return this.get("SelectedRows");
					} else {
						return this.callParent(arguments);
					}
				},

				/**
				 * ######## #### ######## ########## ###### ##### ######## ######.
				 * @overridden
				 * @param {object} response ##### ## #######.
				 */
				onDeleted: function(response) {
					this.callParent(arguments);
					if (response.Success) {
						var schedulerFloatItemsCollection = this.get("SchedulerFloatItemsCollection");
						if (schedulerFloatItemsCollection) {
							schedulerFloatItemsCollection.clear();
						}
					}
				},

				/**
				 * Opens page for editing entity of the activity.
				 * @overridden
				 */
				openCard: function() {
					this.setFiltersVisibleInCombinedMode();
					var gridData = this.getGridData();
					var activeRow = this.get("ActiveRow");
					var prcElId = Terrasoft.GUID_EMPTY;
					var recordId = Terrasoft.GUID_EMPTY;
					if (activeRow && gridData && gridData.contains(activeRow)) {
						var activeRecord = gridData.get(activeRow);
						if (activeRecord) {
							prcElId = activeRecord.get("ProcessElementId");
							recordId = activeRecord.get(this.primaryColumnName);
						}
					}
					var config = {
						procElUId: prcElId,
						recordId: recordId,
						scope: this,
						parentMethodArguments: arguments,
						parentMethod: this.getParentMethod()
					};
					if (ProcessModuleUtilities.tryShowProcessCard.call(this, config)) {
						return;
					}
					this.callParent(arguments);
				},

				/**
				 * Opens activity card in chain.
				 * @overridden
				 */
				openCardInChain: function(config) {
					if (this.isSchedulerDataView() && (config.operation === ConfigurationEnums.CardStateV2.ADD)) {
						var historyStateInfo = this.getHistoryStateInfo();
						if (historyStateInfo.workAreaMode === ConfigurationEnums.WorkAreaMode.COMBINED) {
							this.closeCard();
						}
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#showCard
				 * @overridden
				 */
				showCard: function() {
					if (this.isSchedulerDataView()) {
						var selectedRows = this.get("SelectedRows");
						if (selectedRows.length) {
							var scheduleGridData = this.get("ScheduleGridData");
							var selectedRow = scheduleGridData.get(selectedRows[0]);
							var startDate = selectedRow.get("StartDate");
							this.saveSeparateModeSchedulerProperties();
							this.setVerticalSchedulerPeriodToOneDay(startDate);
						}
					}
					this.callParent(arguments);
				},

				/**
				 * ############# ###### ### ############# ####### ###### ###### ###.
				 * @param {Object} date #### ###### ####### ######.
				 */
				setVerticalSchedulerPeriodToOneDay: function(date) {
					if(Ext.isEmpty(this.get("SchedulerStartDate")) || Ext.isEmpty(!this.get("SchedulerDueDate"))){
						return;
					}
					var startDate = this.get("SchedulerStartDate").toDateString("dd.MM.yyyy");
					var endDate = this.get("SchedulerDueDate").toDateString("dd.MM.yyyy");
					if (startDate !== endDate || startDate !== date.toDateString("dd.MM.yyyy")) {
						this.set("SchedulerStartDate", this.Terrasoft.deepClone(date));
						this.set("SchedulerDueDate", this.Terrasoft.deepClone(date));
					}
				},

				/**
				 * ########## ######## ## ######### ### ############# ##########.
				 * @overridden
				 */
				isNewRowSelected: function() {
					if (this.isSchedulerDataView()) {
						return true;
					} else {
						return this.callParent(arguments);
					}
				},

				/**
				 * ######## #######, ### ######## ############# ### ############# ##########.
				 * @protected
				 * @return {boolean}
				 */
				isSchedulerDataView: function() {
					return (this.get("ActiveViewName") === "SchedulerDataView");
				},

				/**
				 * ######## #######, ### ######## ############# ## ############# ##########.
				 * @protected
				 * @return {boolean}
				 */
				isNotSchedulerDataView: function() {
					return !this.isSchedulerDataView();
				},

				/**
				 * ########## ######### ###### "######### ######" # #### ###### "###".
				 * @protected
				 * @return {Boolean} ######### ###### "######### ######".
				 */
				getListSettingsOptionVisible: function() {
					return (this.get("IsSectionVisible") && this.isNotSchedulerDataView());
				},

				/**
				 * ########## ######### ###### "####### # ##########" # #### ###### "###".
				 * @protected
				 * @return {Boolean} ######### ###### "####### # ##########".
				 */
				getSchedulerDataViewOptionVisible: function() {
					return (this.get("IsSectionVisible") && this.isNotSchedulerDataView());
				},

				/**
				 * ########## ######### ###### "####### # ###### #######" # #### ###### "###".
				 * @protected
				 * @return {Boolean} ######### ###### "####### # ###### #######".
				 */
				getGridDataViewOptionVisible: function() {
					return (this.get("IsSectionVisible") && this.isSchedulerDataView());
				},

				/**
				 * ######## ####### ##### ## ### Email ######## ######.
				 * @protected
				 * @return {boolean}
				 */
				isActiveRowEmail: function() {
					var activeRowId = this.get("ActiveRow");
					if (activeRowId) {
						var gridData = this.getGridData();
						if (gridData.contains(activeRowId)) {
							var activeRow = gridData.get(activeRowId);
							var type = activeRow.get("Type").value;
							return type === ConfigurationConstants.Activity.Type.Email;
						}
						return false;
					}
					return false;
				},

				/**
				 * ######## #######, ###### ## ###### #########.
				 * @protected
				 * @return {Boolean}
				 */
				getIsSendButtonVisible: function() {
					var visible = this.get("IsSendButtonVisible") || false;
					return visible && this.isActiveRowEmail();
				},

				/**
				 * ######## #######, ###### ## ###### ########.
				 * @protected
				 * @return {Boolean}
				 */
				getIsReplyButtonVisible: function() {
					var visible = this.get("IsReplyButtonVisible") || false;
					return visible && this.isActiveRowEmail();
				},

				/**
				 * ######## #######, ###### ## ###### #########.
				 * @protected
				 * @return {Boolean}
				 */
				getIsForwardButtonVisible: function() {
					var visible = this.get("IsForwardButtonVisible") || false;
					return visible && this.isActiveRowEmail();
				},

				/**
				 * ######## #######, ###### ## ###### #########.
				 * @protected
				 * @return {Boolean}
				 */
				getIsForwardOUTButtonVisible: function() {
					var visible = this.get("IsForwardOUTButtonVisible") || false;
					return visible && this.isActiveRowEmail();
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#linkClicked
				 * @overridden
				 */
				linkClicked: function(href, columnName) {
					if (columnName === this.primaryDisplayColumnName) {
						var linkParams = href.split("/");
						var recordId = linkParams[linkParams.length - 1];
						var gridData = this.getGridData();
						var row = gridData.get(recordId);
						var prcElId = row.get("ProcessElementId");
						var config = {
							procElUId: prcElId,
							recordId: recordId,
							scope: this,
							parentMethodArguments: arguments,
							parentMethod: this.getParentMethod()
						};
						if (ProcessModuleUtilities.tryShowProcessCard.call(this, config)) {
							return false;
						}
					}
					return this.callParent(arguments) || false;
				},

				/**
				 * Restores separate mode scheduler properties.
				 * @private
				 */
				restoreSeparateModeSchedulerProperties: function() {
					var sectionSchedulerStartDate = this.get("SectionSchedulerStartDate");
					if (sectionSchedulerStartDate) {
						this.set("SchedulerStartDate", sectionSchedulerStartDate);
						this.set("SectionSchedulerStartDate", null);
					}
					var sectionSchedulerDueDate = this.get("SectionSchedulerDueDate");
					if (sectionSchedulerDueDate) {
						this.set("SchedulerDueDate", sectionSchedulerDueDate);
						this.set("SectionSchedulerDueDate", null);
					}
				},

				/**
				 * Saves separate mode scheduler properties.
				 * @private
				 */
				saveSeparateModeSchedulerProperties: function() {
					if (!this.get("SectionSchedulerStartDate") && !this.get("SectionSchedulerDueDate")) {
						this.set("SectionSchedulerStartDate", this.get("SchedulerStartDate"));
						this.set("SectionSchedulerDueDate", this.get("SchedulerDueDate"));
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#closeCard
				 * @protected
				 * @overridden
				 */
				closeCard: function() {
					this.callParent(arguments);
					var isSchedulerDataView = this.isSchedulerDataView();
					var isSectionVisible = this.get("IsSectionVisible");
					if (isSchedulerDataView && isSectionVisible) {
						this.restoreSeparateModeSchedulerProperties();
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#showSection
				 * @protected
				 * @overridden
				 */
				showSection: function() {
					this.callParent(arguments);
					var schedulerDataView = this.isSchedulerDataView();
					var isCardVisible = this.get("IsCardVisible");
					if (schedulerDataView && !isCardVisible) {
						this.restoreSeparateModeSchedulerProperties();
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#addChangeDataViewOptions
				 * @overridden
				 */
				addChangeDataViewOptions: function(viewOptions) {
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.SchedulerDataViewCaption"},
						"Click": {"bindTo": "changeDataView"},
						"Tag": this.get("SchedulerDataViewName")
					}));
					this.callParent(arguments);
				},

				/**
				 * ########## ############# ## ############# #######, ##### ######## ############.
				 * @private
				 */
				getParticipants: function() {
					var quickFilterModuleId = this.getQuickFilterModuleId();
					var owners = this.sandbox.publish("GetFixedFilter", {filterName: "Owner"},
						[quickFilterModuleId]);
					var participants = [];
					owners.forEach(function(item) {
						if (item.value !== this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value) {
							participants.push(item);
						}
					});
					return participants;
				},

				/**
				 * Returns configuration information about card default values and parameters.
				 * @overridden
				 */
				getCardInfoConfig: function(typeColumnName, typeColumnValue) {
					var cardInfo = {
						typeColumnName: typeColumnName,
						typeUId: typeColumnValue
					};
					cardInfo.valuePairs = this.getCardInfoDefaultValues();
					this.set("SchedulerSelection", null);
					return cardInfo;
				},

				/**
				 * Returns activity section default values.
				 * Sends StartDate and DueDate if scheduler has selected interval.
				 * @protected
				 */
				getCardInfoDefaultValues: function() {
					var defaultValues = [];
					var selection = this.get("SchedulerSelection");
					if (selection) {
						defaultValues.push({
							name: "DueDate",
							value: selection.dueDate
						});
						defaultValues.push({
							name: "StartDate",
							value: selection.startDate
						});
					}
					defaultValues.push({
						name: "Participants",
						value: this.getParticipants()
					});
					return defaultValues;
				},

				/**
				 * Loads SimpleTaskAddModule.
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					this.sandbox.loadModule("SimpleTaskAddModule", {
						id: this.getSimpleAddTaskModuleId(),
						keepAlive: true
					});
					this.setFiltersVisibleInCombinedMode();
				},

				/**
				 * ########## ######## ###### #### ######## ########## ######.
				 * @private
				 * @param {Object} config ###### ######## ######
				 */
				getSimpleAddTaskViewModel: function(config) {
					this.sandbox.publish("GetSimpleTaskAddViewModel", config);
				},

				/**
				 * ######### ###### #### ######## ########## ###### # ######### ##########.
				 * @private
				 * @param {Object} viewModel ###### #### ######## ########## ######.
				 */
				onSimpleTaskViewModelCreated: function(viewModel) {
					var collection = this.get("SchedulerFloatItemsCollection");
					collection.add(viewModel);
				},

				/**
				 * ####### ###### #### ######## ########## ###### # ######### ##########.
				 * @private
				 * @param {Object} config ######### ### ########## ######,
				 * # ###### #### #### ########### ## ###### #########.
				 */
				onRemoveViewModel: function(config) {
					var viewModel = config.viewModel;
					var collection = this.get("SchedulerFloatItemsCollection");
					collection.remove(viewModel);
					var recordId = config.recordId;
					if (recordId) {
						this.set("SchedulerSelection", null);
						this.loadGridDataRecord(recordId);
					}
				},

				/**
				 * ########## ######, ####### ######## ######### ############# #######.
				 * @return {String} ###### # ########## #########.
				 */
				getSchedulerSelectionPressedKeys: function() {
					var symbols = this.get("SchedulerSelectionPressedKeys") || "";
					this.set("SchedulerSelectionPressedKeys", "");
					return symbols;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * Subscribes on simple task module model creating/removing, on simple task module opening,
				 * on scheduler selection key pressed.
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("SimpleTaskViewModelCreated", this.onSimpleTaskViewModelCreated, this);
					this.sandbox.subscribe("RemoveViewModel", this.onRemoveViewModel, this);
					this.sandbox.subscribe("GetSchedulerSelectionPressedKeys", this.getSchedulerSelectionPressedKeys,
						this, this.getSelectionPressedKeysSubscribers());
					this.sandbox.subscribe("OpenItem", this.openItem, this, [this.getSimpleAddTaskModuleId()]);
					this.sandbox.subscribe("ReloadGridAfterAdd", this.onReloadGridAfterAdd, this);
				},

				/**
				 * ########## ######### # ###### ######### #### ######## ########## ######.
				 * @private
				 * @param {Object} config ################ ######.
				 */
				onFloatingItemReady: function(config) {
					var collection = this.get("SchedulerFloatItemsCollection");
					var viewModel = collection.getByIndex(0);
					this.sandbox.publish("RenderSimpleTaskAddView", {
						renderTo: config.renderTo,
						input: config.input,
						viewModel: viewModel
					});
				},

				/**
				 * Returns selection pressed keys subscribers.
				 * @private
				 * @return {Array} Subscribers.
				 */
				getSelectionPressedKeysSubscribers: function() {
					var subscribers = [];
					subscribers.push(this.getMiniPageSandboxId(this.entitySchemaName), this.getSimpleAddTaskModuleId());
					return subscribers;
				},

				/**
				 * Returns simple task module id.
				 * @private
				 * @return {String} Simple task module identifier.
				 */
				getSimpleAddTaskModuleId: function() {
					return this.sandbox.id + "_SimpleAddTaskModule";
				},

				/**
				 * ############# ######## ## ######### ######### ########## ######## #
				 * ######## ## ######### ### ###### ######## ########## ######.
				 * @overridden
				 */
				initGetCardInfoSubscription: function(typeColumnValue) {
					var typeColumnName = this.get("TypeColumnName");
					if (typeColumnName && typeColumnValue) {
						this.sandbox.subscribe("getCardInfo", function() {
							return this.getCardInfoConfig(typeColumnName, typeColumnValue);
						}, this, [
							this.getChainCardModuleSandboxId(typeColumnValue),
							this.getSimpleAddTaskModuleId()
						]);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#getCardModuleResponseTags
				 * @overridden
				 */
				getCardModuleResponseTags: function() {
					var editCardsSandboxIds = this.callParent(arguments);
					editCardsSandboxIds.push(this.getSimpleAddTaskModuleId() + "_CardModule");
					return editCardsSandboxIds;
				},

				/**
				 * ########## ########## ####### ## ######## # ##########.
				 * @overridden
				 * @return {Integer|*} ########## #######.
				 */
				getRowCount: function() {
					var rowCount = this.callParent(arguments);
					if (this.isSchedulerDataView()) {
						rowCount = this.get("SchedulerItemsAmountPerPage") || rowCount;
					}
					return rowCount;
				},

				/**
				 * Returns current active row in scheduler or grid.
				 * @overridden
				 * @return {Object|null} Current active record.
				 */
				getActiveRow: function() {
					var activeRow = null;
					var primaryColumnValue = this.isSchedulerDataView()
						? this.get("SelectedRows")[0]
						: this.get("ActiveRow");
					if (primaryColumnValue) {
						var gridData = this.getGridData();
						activeRow = gridData.contains(primaryColumnValue) ? gridData.get(primaryColumnValue) : null;
					}
					return activeRow;
				},

				/**
				 * Returns grid data view or scheduler data view.
				 * @overridden
				 * @return {*|Component}
				 */
				getCurrentGrid: function() {
					return this.isSchedulerDataView()
						? this.Ext.getCmp("ActivitySectionV2Scheduler")
						: this.Ext.getCmp(this.name + "DataGridGrid");
				},

				/**
				 * Opens activity page by double click.
				 * @private
				 */
				onScheduleItemDoubleClick: function() {
					var isCardVisible = this.get("IsCardVisible");
					if (isCardVisible === true) {
						return;
					}
					var collection = this.get("SchedulerFloatItemsCollection");
					if (!collection.isEmpty()) {
						return;
					}
					Terrasoft.MiniPageListener.close();
					this.openItem();
				},

				/**
				 * Reloaded grid data record if needed.
				 * @private
				 */
				onReloadGridAfterAdd: function(config) {
					if (config && config.entitySchemaName === this.entitySchemaName) {
						this.set("IsCardInChain", config.isInChain || false);
						this.loadGridDataRecord(config.primaryColumnValue, function() {
							this.set("IsCardInChain", false);
						}, this);
					}
				},

				/**
				 * Clears scheduler pop-up windows.
				 * @private
				 */
				onChangeSelectedItems: function() {
					var collection = this.get("SchedulerFloatItemsCollection");
					if (collection && !collection.isEmpty()) {
						collection.clear();
					}
				},

				/**
				 * Opens activity mini page in add mode or simple task window.
				 * @private
				 */
				onSelectionKeyPress: function() {
					var addPageTypeUId = ConfigurationConstants.Activity.Type.Task;
					if (this.hasAddMiniPage(addPageTypeUId)) {
						this.openAddMiniPage({
							entitySchemaName: this.entitySchemaName,
							valuePairs: this.getAddMiniPageDefaultValues(addPageTypeUId)
						});
					} else {
						this.getSimpleAddTaskViewModel({
							mode: (!this.get("IsCardVisible")) ? "normal" : "small"
						});
					}
				},

				/**
				 * ######## ############# ####### # ############ # ##### ############# ####### # #######.
				 * # ###### # ###########, ########### ## #####.
				 * @inheritdoc Terrasoft.BaseSectionV2#reloadGridColumnsConfig
				 * @overridden
				 */
				reloadGridColumnsConfig: function(doReRender) {
					var isNotSchedulerDataView = this.isNotSchedulerDataView();
					this.callParent([(doReRender && isNotSchedulerDataView)]);
				},

				/**
				 * ### ######## ###### ## ########## ######### ####### ####### # ######## ######.
				 * @inheritdoc Terrasoft.BaseSectionV2#reloadGridColumnsConfig
				 * @overridden
				 */
				ensureActiveRowVisible: function() {
					if (this.isSchedulerDataView()) {
						return;
					}
					this.callParent(arguments);
				},

				/**
				 * ############ ######### ######, # ####### ######### # ########### #########
				 * ### #### ######## ###### # ##########.
				 * @overridden
				 * @param {Object} response ##### #######.
				 */
				onGridDataLoaded: function(response) {
					this.callParent(arguments);
					if (!response.success || this.isNotSchedulerDataView()) {
						return;
					}
					var scheduleCollection = this.getGridData();
					var pageCount = this.get("SchedulePageCount") || 1;
					var canLoadMoreData = this.get("CanLoadMoreData");
					var rowCount = this.get("SchedulerItemsAmountPerPage");
					if (scheduleCollection.getCount() < pageCount * rowCount && canLoadMoreData) {
						this.needLoadData();
					} else {
						if (canLoadMoreData) {
							this.set("CanLoadMoreData", false);
							var message = this.get("Resources.Strings.LoadMoreDataTemplate");
							this.showConfirmationDialog(this.Ext.String.format(message, rowCount), function(result) {
								if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.set("SchedulePageCount", pageCount + 1);
									this.set("CanLoadMoreData", true);
									this.needLoadData();
								}
							}, ["yes", "no"]);
						}
					}
				},

				/**
				 * Displays mask on scheduler while loading grid data records.
				 * @inheritdoc Terrasoft.GridUtilities#beforeLoadGridData
				 * @overridden
				 */
				beforeLoadGridData: function() {
					if (this.isSchedulerDataView()) {
						this.showBodyMask({timeout: 0});
					}
					this.callParent(arguments);
				},

				/**
				 * ########## # ########## ##### ######## ###### ### ########## ######.
				 * @inheritdoc Terrasoft.GridUtilities#beforeLoadGridDataRecord
				 * @overridden
				 */
				beforeLoadGridDataRecord: function() {
					if (this.isSchedulerDataView()) {
						this.showBodyMask({timeout: 0});
					}
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#addItemsToGridData
				 * @overridden
				 */
				addItemsToGridData: function() {
					this.callParent(arguments);
					if (this.isSchedulerDataView()) {
						this.hideBodyMask();
					}
				},

				/**
				 * ############# ########## ## #### ###### ### ############# ##########.
				 * @overridden
				 * @param {Object} esq ###### ## ####### ######.
				 */
				initQuerySorting: function(esq) {
					if (this.isSchedulerDataView()) {
						var sortedColumn = esq.columns.collection.get("StartDate");
						if (sortedColumn) {
							sortedColumn.orderPosition = 1;
							sortedColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
						}
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#afterLoadGridDataUserFunction
				 * @overridden
				 */
				afterLoadGridDataUserFunction: function(primaryColumnValue) {
					this.callParent(arguments);
					if (this.isSchedulerDataView()) {
						this.set("SelectedRows", [primaryColumnValue]);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#needSetActiveRow
				 * @overridden
				 */
				needSetActiveRow: function() {
					return this.isNotSchedulerDataView() && this.getCurrentGrid() && !this.get("IsCardVisible");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#rowSelected
				 * @overridden
				 * @protected
				 */
				rowSelected: function(primaryColumnValue) {
					if (this.isSchedulerDataView()) {
						this.set("ActiveRow", primaryColumnValue);
					}
					this.callParent(arguments);
				},

				/**
				 * Loads data in schedule.
				 * @overridden
				 */
				loadActiveViewData: function() {
					var activeViewName = this.getActiveViewName();
					if (activeViewName === this.get("GridDataViewName") || this.isSchedulerDataView()) {
						this.loadGridData();
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#getGridRowViewModelClassName
				 */
				getGridRowViewModelClassName: function() {
					return this.isSchedulerDataView()
						? "Terrasoft.ActivitySectionGridRowViewModel"
						: this.callParent(arguments);
				},

				/**
				 * ########### ## ####### ######, ### ######### ######### ######## ############# # Google-##########.
				 * @private
				 */
				initGoogleCalendarLog: function() {
					this.Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onGoogleCalendarMessage, this);
				},

				/**
				 * ######### ######### ######## ############# # Google-##########.
				 * @param {Object} scope ########.
				 * @param {Object} message ######### ######## ############# # Google-##########.
				 */
				onGoogleCalendarMessage: function(scope, message) {
					switch (message.Header.Sender) {
						case "GoogleCalendar":
							this.log(message.Body, this.Terrasoft.LogMessageType.INFORMATION);
							break;
						default:
							break;
					}
				},

				/**
				 * Sets delay before filtration.
				 * @private
				 */
				initFiltersUpdateDelay: function() {
					this.filtersUpdateDelay = 300;
				},

				/**
				 * ############## ######### ####### ############## ########.
				 * ####### ## ######### ######## ### #### Email # ######
				 * @inheritdoc Terrasoft.BaseSection#initEditPages
				 * @override
				 */
				initEditPages: function() {
					var enabledEditPages = new this.Terrasoft.Collection();
					this.callParent(arguments);
					var editPages = this.get("EditPages");
					this.Terrasoft.each(editPages.getItems(), function(item) {
						if (item.get("Id") !== ConfigurationConstants.Activity.Type.Email &&
							item.get("Id") !== ConfigurationConstants.Activity.Type.Call) {
							enabledEditPages.add(item);
						}
					});
					this.set("EnabledEditPages", enabledEditPages);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#checkEditPagesCount
				 * @override
				 */
				checkEditPagesCount: function() {
					return this.get("EnabledEditPages").getCount() > 1;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#getAddMiniPageDefaultValues
				 * @override
				 */
				getAddMiniPageDefaultValues: function() {
					var defaultValues = this.callParent(arguments);
					defaultValues = this.Ext.Array.merge(defaultValues, this.getCardInfoDefaultValues());
					return defaultValues;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#initAddRecordButtonParameters
				 * @overriden
				 */
				initAddRecordButtonParameters: function() {
					var caption = this.get("Resources.Strings.AddRecordButtonCaption");
					var tag = this.Terrasoft.GUID_EMPTY;
					var editPages = this.get("EnabledEditPages");
					var editPagesCount = editPages.getCount();
					if (editPagesCount === 1) {
						var editPage = editPages.getByIndex(0);
						caption = editPage.get("Caption");
						tag = editPage.get("Tag");
					}
					this.set("AddRecordButtonCaption", caption);
					this.set("AddRecordButtonTag", tag);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#getExportToFileActionVisibility
				 * @overriden
				 */
				getExportToFileActionVisibility: function() {
					var visibility = this.callParent(arguments);
					return (visibility && this.isNotSchedulerDataView());
				},

				/**
				 * Schedule item title mouse click event handler.
				 * @private
				 * @param {Object} options Event handler options.
				 */
				scheduleItemTitleClick: function(options) {
					var historyStateInfo = this.getHistoryStateInfo();
					if (historyStateInfo.workAreaMode === ConfigurationEnums.WorkAreaMode.COMBINED) {
						return;
					}
					var activeRow = this.get("ActiveRow");
					if (activeRow) {
						var pageOptions = this.Terrasoft.deepClone(options);
						this.Ext.apply(pageOptions, {
							rowId: activeRow,
							columnName: this.primaryDisplayColumnName,
							isFixed: true,
							showDelay: 0
						});
						this.prepareMiniPageOpenParameters(pageOptions, {
							referenceSchemaName: this.entitySchemaName
						});
					}
				},

				/**
				 * Mouse over event handler.
				 * @private
				 * @param {Object} options Event handler options.
				 * @param {Object} entityInfo Entity column name or entity attribute with entitySchemaName.
				 */
				scheduleItemTitleMouseOver: function(options, entityInfo) {
					if (this.Terrasoft.Features.getIsEnabled("ShowMiniPageOnScheduleItemTitleMouseOver")) {
						entityInfo.referenceSchemaName = this.entitySchemaName;
						this.prepareMiniPageOpenParameters(options, entityInfo);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "OpenButton",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.OpenButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"]
						},
						"visible": {
							"bindTo": "isSchedulerDataView"
						},
						"enabled": {"bindTo": "getSchedulerButtonsEnabled"},
						"click": {"bindTo": "openItem"}
					}
				},
				{
					"operation": "insert",
					"name": "CopyButton",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CopyButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"]
						},
						"visible": {
							"bindTo": "isSchedulerDataView"
						},
						"click": {
							"bindTo": "copyItem"
						},
						"enabled": {
							"bindTo": "getSchedulerButtonsEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "DeleteButton",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.DeleteButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"]
						},
						"visible": {
							"bindTo": "isSchedulerDataView"
						},
						"click": {
							"bindTo": "deleteItem"
						},
						"enabled": {
							"bindTo": "getSchedulerButtonsEnabled"
						}
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModePrintButton",
					"values": {
						"visible": {
							"bindTo": "ActiveViewName",
							"bindConfig": {
								"converter": function(value) {
									var sectionPrintMenuItems = this.get("SectionPrintMenuItems");
									return ((value !== "SchedulerDataView") &&
									(sectionPrintMenuItems && sectionPrintMenuItems.getCount() > 0));
								}
							}
						}
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModeViewOptionsButton",
					"values": {
						"visible": {"bindTo": "isNotSchedulerDataView"}
					}
				},
				{
					"operation": "merge",
					"name": "SelectMultipleRecordsMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "merge",
					"name": "SelectOneRecordMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "merge",
					"name": "UnselectAllRecordsMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "merge",
					"name": "ExportListToFileMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "merge",
					"name": "IncludeInFolderMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "merge",
					"name": "ExcludeFromFolderMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "merge",
					"name": "DeleteRecordMenuItem",
					"values": {
						"visible": {
							"bindTo": "isNotSchedulerDataView"
						}
					}
				},
				{
					"operation": "insert",
					"name": "SeparateModeIntervalButton",
					"parentName": "SeparateModeActionButtonsRightContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"controlConfig": {"menu": {"items": {"bindTo": "IntervalMenuItems"}}},
						"visible": {
							"bindTo": "isSchedulerDataView"
						},
						"caption": {"bindTo": "Resources.Strings.ViewOptionsButtonCaption"}
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"name": "send",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"caption": {"bindTo": "Resources.Strings.SendEmailAction"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"click": {"bindTo": "onCardAction"},
						"tag": "checkSenderBeforeSend",
						"visible": {
							"bindTo": "getIsSendButtonVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"name": "reply",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ReplyActionCaption"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"click": {"bindTo": "onCardAction"},
						"tag": "replyEmail",
						"visible": {
							"bindTo": "getIsReplyButtonVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"name": "replyAll",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ReplyAllActionCaption"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"click": {"bindTo": "onCardAction"},
						"tag": "replyAllEmail",
						"visible": {
							"bindTo": "getIsReplyButtonVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"name": "forward",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ForwardActionCaption"},
						"layout": {"column": 12, "row": 0, "colSpan": 2},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"click": {"bindTo": "onCardAction"},
						"tag": "forwardEmail",
						"visible": {
							"bindTo": "getIsForwardButtonVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"name": "forwardOUT",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.ForwardActionCaption"},
						"layout": {"column": 14, "row": 0, "colSpan": 2},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"click": {"bindTo": "onCardAction"},
						"tag": "forwardEmail",
						"visible": {
							"bindTo": "getIsForwardOUTButtonVisible"
						}
					}
				},
				{
					"operation": "insert",
					"name": "Schedule",
					"parentName": "DataViewsContainer",
					"propertyName": "items",
					"values": {
						"id": "ActivitySectionV2Scheduler",
						"selectors": {"wrapEl": "#ActivitySectionV2Scheduler"},
						"itemType": Terrasoft.ViewItemType.SCHEDULE_EDIT,
						"visible": {"bindTo": "isSchedulerDataView"},
						"startHour": Terrasoft.SysSettings.cachedSettings.SchedulerTimingStart,
						"displayStartHour": Terrasoft.SysSettings.cachedSettings.SchedulerDisplayTimingStart + "-00",
						"dueHour": Terrasoft.SysSettings.cachedSettings.SchedulerTimingEnd,
						"timeScale": {"bindTo": "getTimeScale"},
						"period": {"bindTo": "getSchedulerPeriod"},
						"timezone": [{}],
						"startDate": null,
						"dueDate": null,
						"activityCollection": {"bindTo": "ScheduleGridData"},
						"selectedItems": {"bindTo": "SelectedRows"},
						"changeSelectedItems": {"bindTo": "onChangeSelectedItems"},
						"scheduleItemDoubleClick": {"bindTo": "onScheduleItemDoubleClick"},
						"scheduleItemTitleMouseOver": {"bindTo": "scheduleItemTitleMouseOver"},
						"scheduleItemTitleClick": {"bindTo": "scheduleItemTitleClick"},
						"change": {"bindTo": "changeScheduleItem"},
						"selection": {"bindTo": "SchedulerSelection"},
						"floatingItemsCollection": {"bindTo": "SchedulerFloatItemsCollection"},
						"selectionKeyPress": {bindTo: "onSelectionKeyPress"},
						"floatingItemReady": {"bindTo": "onFloatingItemReady"},
						"selectionKeyPressSymbols": {"bindTo": "SchedulerSelectionPressedKeys"},
						"itemBindingConfig": {
							"itemId": {"bindTo": "Id"},
							"title": {"bindTo": "getScheduleItemTitle"},
							"changeTitle": {"bindTo": "onTitleChanged"},
							"startDate": {"bindTo": "StartDate"},
							"changeStartDate": {"bindTo": "onStartDateChanged"},
							"dueDate": {"bindTo": "DueDate"},
							"changeDueDate": {"bindTo": "onDueDateChanged"},
							"status": {"bindTo": "getScheduleItemStatus"},
							"changeStatus": {"bindTo": "onStatusChanged"},
							"background": {"bindTo": "Background"},
							"fontColor": {"bindTo": "FontColor"},
							"isBold": {"bindTo": "IsBold"},
							"isItalic": {"bindTo": "IsItalic"},
							"isUnderline": {"bindTo": "IsUnderline"},
							"markerValue": {"bindTo": "getScheduleItemHint"}
						},
						"floatingItemBindingConfig": {
							"caption": {"bindTo": "getSimpleModuleCaption"},
							"width": {"bindTo": "getSimpleModuleWidth"}
						},
						"canExecute": {"bindTo": "canBeDestroyed"}
					}
				},
				{
					"operation": "insert",
					"index": 0,
					"name": "OpenSchedulerDataViewOptionsMenuItem",
					"parentName": "AnalyticsModeViewOptionsButton",
					"propertyName": "menu",
					"values": {
						"itemType": Terrasoft.ViewItemType.MENU_ITEM,
						"caption": {"bindTo": "Resources.Strings.SchedulerDataViewCaption"},
						"markerValue": {"bindTo": "Resources.Strings.SchedulerDataViewCaption"},
						"click": {"bindTo": "changeDataView"},
						"tag": "SchedulerDataView"
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModeAddRecordButton",
					"parentName": "SeparateModeActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"controlConfig": {
							"menu": {
								"items": {
									"bindTo": "EnabledEditPages",
									"bindConfig": {
										"converter": function(editPages) {
											if (editPages.getCount() > 1) {
												return editPages;
											} else {
												return null;
											}
										}
									}
								}
							}
						}

					}
				},
				{
					"operation": "merge",
					"name": "CombinedModeAddRecordButton",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"values": {
						"controlConfig": {
							"menu": {
								"items": {
									"bindTo": "EnabledEditPages",
									"bindConfig": {
										"converter": function(editPages) {
											if (editPages.getCount() > 1) {
												return editPages;
											} else {
												return null;
											}
										}
									}
								}
							}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("ActivitySectionV2", ["ExchangeNUIConstants", "ConfigurationConstants", "SyncSettingsMixin"],
	function(ExchangeNUIConstants, ConfigurationConstants) {
		return {
			entitySchemaName: "Activity",
			messages: {
				/**
				 * @message ShowSyncSettingsSetTip
				 * Notify to show tip about completed set sync settings.
				 */
				"ShowSyncSettingsSetTip": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				/**
				 * Activity synchronization mixin.
				 */
				"SyncSettinsMixin": "Terrasoft.SyncSettingsMixin"
			},
			attributes: {
				/**
				 * Flag for visibility of the completed synchronization.
				 */
				"IsSyncSettingsSetTipVisible": {dataValueType: Terrasoft.DataValueType.BOOLEAN}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("ShowSyncSettingsSetTip", this.updateSyncSettingsSetAndShowTip, this);
				},

				/**
				 * ######### email #########.
				 * @protected
				 * @overridden
				 */
				loadEmails: function() {
					if (!this.get("isMailboxSyncExist")) {
						this.Terrasoft.showInformation(this.get("Resources.Strings.MailboxSettingsEmpty"));
						return;
					}
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					select.addColumn("[ActivityFolder:Name:MailboxName].Id", "ActivityFolderId");
					select.addColumn("SenderEmailAddress", "SenderEmailAddress");
					select.addColumn("MailServer.Id", "MailServerId");
					select.addColumn("MailServer.Type.Id", "MailServerTypeId");
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"SysAdminUnit", this.Terrasoft.SysValue.CURRENT_USER.value));
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"EnableMailSynhronization", true));
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"[ActivityFolder:Name:MailboxName].FolderType", ConfigurationConstants.Folder.Type.MailBox));
					select.getEntityCollection(function(response) {
						if (response.success) {
							this.downloadMessages(response.collection);
						}
					}, this);
				},

				/**
				 * ######### email #########.
				 * @private
				 * @param {Terrasoft.Collection} collection ######### ########### #########.
				 */
				downloadMessages: function(collection) {
					var requestsCount = 0;
					var messageArray = [];
					collection.each(function(item) {
						var requestUrl;
						var data = {};
						if (item.get("MailServerTypeId") === ExchangeNUIConstants.MailServer.Type.Exchange) {
							data = {
								create: true,
								interval: 0,
								serverId: item.get("MailServerId"),
								senderEmailAddress: item.get("SenderEmailAddress")
							};
							requestUrl = this.Terrasoft.workspaceBaseUrl +
								"/rest/MailboxSettingsService/CreateDeleteSyncJob";
						} else {
							requestUrl = this.Terrasoft.workspaceBaseUrl +
								"/ServiceModel/ProcessEngineService.svc/LoadImapEmailsProcess/" +
								"Execute?ResultParameterName=LoadResult" +
								"&MailBoxFolderId=" + item.get("ActivityFolderId");
						}
						this.showBodyMask();
						requestsCount++;
						this.Ext.Ajax.request({
							url: requestUrl,
							timeout: 180000,
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json"
							},
							method: "POST",
							scope: this,
							callback: function(request, success, response) {
								var responseData;
								if (success) {
									if (response.responseXML === null) {
										var result = this.Ext.decode(response.responseText);
										responseData = {
											Messages: []
										};
										if (result.CreateDeleteSyncJobResult) {
											responseData.Messages.push(result.CreateDeleteSyncJobResult);
										}
									} else {
										var responseValue = response.responseXML.firstChild.textContent;
										responseData = this.Ext.decode(this.Ext.decode(responseValue));
									}
									if (responseData && responseData.Messages.length > 0) {
										messageArray = messageArray.concat(responseData.Messages);
									}
								}
								if (--requestsCount <= 0) {
									this.refreshGridData();
									var message = this.get("Resources.Strings.LoadingMessagesComplete");
									if (messageArray.length > 0) {
										message = "";
										this.Terrasoft.each(messageArray, function(element) {
											message = message.concat(this.Ext.String.format("[{0}]: {1} ", element.key,
												element.message));
										}, this);
									}
									this.hideBodyMask();
									this.Terrasoft.utils.showInformation(message);
								}
							},
							jsonData: data || {}
						});
					}, this);
				},

				/**
				 * Synchronizes with Google and Exchange calendar and activities.
				 * @overridden
				 * @protected
				 */
				synchronizeNow: function() {
					this.callParent(arguments);
					if (this.get("IsExchangeSyncExist")) {
						this.synchronizeWithExchange();
					}
				},

				/**
				 * ######### ####### ######## ############# # ######### #######
				 * # ############# ############### ######## ######.
				 * @protected
				 * @overridden
				 */
				initMailBoxSyncSettings: function() {
					this.set("isMailboxSyncExist", false);
					this.set("IsExchangeSyncExist", false);
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MailboxSyncSettings"
					});
					esq.clientESQCacheParameters = {cacheItemName: "ActivitySection_MailboxSyncSettings"};
					esq.addColumn("Id");
					esq.addColumn("EnableMailSynhronization");
					esq.addColumn("[ActivitySyncSettings:MailboxSyncSettings:Id].ImportTasks", "ImportTasks");
					esq.addColumn(
						"[ActivitySyncSettings:MailboxSyncSettings:Id].ImportAppointments", "ImportAppointments");
					esq.addColumn("[ActivitySyncSettings:MailboxSyncSettings:Id].ExportActivities", "ExportActivities");
					var filter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"SysAdminUnit", this.Terrasoft.SysValue.CURRENT_USER.value);
					esq.filters.addItem(filter);
					esq.getEntityCollection(function(response) {
						if (response.success) {
							if (response.collection.getCount() > 0) {
								this.set("isMailboxSyncExist",
									response.collection.getItems().some(function(entity) {
										return entity.get("EnableMailSynhronization") === true;
									}));
								this.set("IsExchangeSyncExist",
									response.collection.getItems().some(function(entity) {
										return entity.get("ImportTasks") === true ||
											entity.get("ImportAppointments") === true ||
											entity.get("ExportActivities") === true;
									}));
							}
						}
					}, this);
				},

				/**
				 * ######### ####### ############# # Exchange.
				 * @protected
				 */
				synchronizeWithExchange: function() {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ActivitySyncSettings"
					});
					esq.addColumn("Id");
					esq.addColumn("[MailboxSyncSettings:Id:MailboxSyncSettings].SenderEmailAddress",
						"SenderEmailAddress");
					esq.filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"[MailboxSyncSettings:Id:MailboxSyncSettings].SysAdminUnit",
						this.Terrasoft.SysValue.CURRENT_USER.value));
					esq.filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"[MailboxSyncSettings:Id:MailboxSyncSettings].MailServer.Type",
						ExchangeNUIConstants.MailServer.Type.Exchange));
					var filterGroup = esq.createFilterGroup();
					filterGroup.name = "SynActivitiesFilterGroup";
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filterGroup.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ImportTasks", true));
					filterGroup.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ImportAppointments", true));
					filterGroup.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ExportActivities", true));
					esq.filters.addItem(filterGroup);
					esq.getEntityCollection(function(response) {
						if (response.success) {
							this.createExchangeSyncJobs.call(this, response.collection);
						}
					}, this);
				},

				/**
				 * ####### # ########## ############ ###### ## ############# ########### # Exchange.
				 * @protected
				 */
				createExchangeSyncJobs: function(exchangeSettings) {
					var requestsCount = 0;
					var messageArray = [];
					var requestUrl = Terrasoft.workspaceBaseUrl + "/rest/MailboxSettingsService/CreateActivitySyncJob";
					exchangeSettings.each(function(item) {
						requestsCount++;
						this.showBodyMask();
						var data = {
							interval: 0,
							senderEmailAddress: item.get("SenderEmailAddress")
						};
						this.Terrasoft.AjaxProvider.request({
							url: requestUrl,
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json"
							},
							method: "POST",
							jsonData: data,
							scope: this,
							callback: function(request, success, response) {
								if (success) {
									var responseData = this.Ext.decode(response.responseText);
									if (!this.Ext.isEmpty(responseData.CreateActivitySyncJob)) {
										messageArray = messageArray.concat(responseData.CreateActivitySyncJob);
									}
								}
								if (--requestsCount <= 0) {
									var message = this.get("Resources.Strings.SynchronizeWithExchangeStart");
									if (messageArray.length > 0) {
										message = "";
										this.Terrasoft.each(messageArray, function(element) {
											message = message.concat(this.Ext.String.format("[{0}]: {1} ", element.key,
												element.message));
										}, this);
									}
									this.hideBodyMask();
									this.Terrasoft.utils.showInformation(message);
								}
							}
						});
					}, this);
				},

				/**
				 * @inheritDoc Terrasoft.BaseSection#getSectionActions
				 * @overridden
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					if (this.get("canUseSyncFeaturesByBuildType")) {
						this.setSyncSectionActions(actionMenuItems);
					}
					return actionMenuItems;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSection#isSeparateModeActionsButtonVisible
				 * @overridden
				 */
				isSeparateModeActionsButtonVisible: function() {
					return (!this.isSchedulerDataView() || this.get("canUseSyncFeaturesByBuildType"));
				},

				/**
				 * Returns set sync settings section action caption.
				 * @overridden
				 * @return {String} Caption.
				 */
				getSetSyncSettingsCaption: function() {
					return this.get("Resources.Strings.SetUpSynchronization");
				},

				/**
				 * Start synchronization with google account.
				 */
				synchronizeGoogle: function() {
					this.synchronizeWithGoogleCalendar();
				},

				/**
				 * Start synchronization with exchange account.
				 */
				synchronizeExchange: function() {
					this.synchronizeWithExchange();
				},

				/**
				 * @inheritDoc Terrasoft.SyncSettinsMixin#updateSyncSettingsSetAndShowTip
				 * @overridden
				 */
				updateSyncSettingsSetAndShowTip: function(itemId) {
					if (itemId) {
						this.set("IsExchangeSyncExist", true);
					} else {
						this.set("GoogleSyncExists", true);
					}
					this.mixins.SyncSettinsMixin.updateSyncSettingsSetAndShowTip.call(this, itemId);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "SeparateModeActionsButton",
					"values": {
						"tips": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SeparateModeActionsButton",
					"propertyName": "tips",
					"name": "SyncSettingsSetTip",
					"values": {
						"content": {"bindTo": "Resources.Strings.SyncSettingsSetTipCaption"},
						"visible": {"bindTo": "IsSyncSettingsSetTipVisible"},
						"style": Terrasoft.TipStyle.GREEN,
						"linkClicked": {bindTo: "navigateToSyncSettingsWithSyncSettingsUpdate"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.NONE
						}
					}
				},
				{
					"operation": "move",
					"index": 1,
					"parentName": "DataViewsContainer",
					"propertyName": "items",
					"name": "GridUtilsContainerWrapper"
				},	
				{
					"operation": "insert",
					"name": "CalendarSyncErrors",
					"propertyName": "items",
					"parentName": "DataViewsContainer",
					"index": 2,
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {"wrapClassName": ["sync-settings-errors","calendar-sync-errors"]},
						"moduleName": "BaseSchemaModuleV2",
						"instanceConfig": {
							"isSchemaConfigInitialized": true,
							"schemaName": "CalendarSyncSettingsErrors",
							"useHistoryState": false
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


