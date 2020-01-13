Terrasoft.configuration.Structures["MktgActivitySection"] = {innerHierarchyStack: ["MktgActivitySection"], structureParent: "BaseMarketingCalendarSection"};
define('MktgActivitySectionStructure', ['MktgActivitySectionResources'], function(resources) {return {schemaUId:'fc4c9f22-eca4-4e14-bb73-f49bed078ce2',schemaCaption: "MktgActivitySection", parentSchemaName: "BaseMarketingCalendarSection", schemaName:'MktgActivitySection',parentSchemaUId:'739873f7-d055-4a3e-8962-c7d2d7f6394a',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
	define("MktgActivitySection", ["terrasoft", "GridUtilitiesV2", "MarketingCalendar", "MarketingCalendarGrid"],
	function(Terrasoft) {
		return {
			entitySchemaName: "MktgActivity",
			messages: {
				"SectionFiltersUpdated": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"OpenCalendarGridSettings": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"SetCalendarScale": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"ToggleCalendar": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"SortGrid": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"CalendarYearChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"SortColumn": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"GetEmptyMessageConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				IsRightGridContainerVisible: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},
			methods: {
				/**
				 * Gets the default data view
				 * @overridden
				 * @protected
				 * @return {Object}
				 */
				getDefaultDataViews: function() {
					var defaultDataViews = {};
					var navigateToSectionPrefix = "NavigateToMarketingCampaigns";
					var gridDataView = "GridDataView";
					var navigateToSectionGridDataViewName = navigateToSectionPrefix + gridDataView;
					var navigateToSectionAnalyticsViewName = navigateToSectionPrefix + "AnalyticsDataView";
					defaultDataViews[navigateToSectionGridDataViewName] = {
						name: navigateToSectionGridDataViewName,
						caption: this.get("Resources.Strings.CampaignsViewHeader"),
						icon: this.get("Resources.Images.CalendarViewIcon")
					};
					defaultDataViews[gridDataView] = {
						name: gridDataView,
						caption: this.get("Resources.Strings.MarketingActivitiesViewHeader"),
						icon: this.get("Resources.Images.ActivitiesViewIcon")
					};
					defaultDataViews[navigateToSectionAnalyticsViewName] = {
						name: navigateToSectionAnalyticsViewName,
						caption: this.get("Resources.Strings.MarketingCampaignsAnalyticsDataViewCaption"),
						icon: this.getDefaultAnalyticsDataViewIcon()
					};
					return defaultDataViews;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#updateSectionContainerStyle
				 * @overridden
				 * @param {String} viewName Active view.
				 */
				updateSectionContainerStyle1: function(viewName) {
					var schema = this.Ext.get(this.name + "Container");
					if (!schema) {
						return;
					}
					if (viewName === "AnalyticsDataView" || viewName === "MarketingCalendarMktgActivitiesDataView") {
						schema.addCls("dashboard-container");
					} else {
						schema.removeCls("dashboard-container");
					}
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#afterFiltersUpdated
				 * @overridden
				 */
				afterFiltersUpdated: function() {
					this.sandbox.publish("SectionFiltersUpdated", this.get("SectionFilters"), [this.sandbox.id]);
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("GetSectionFilters", function() {
						return this.get("SectionFilters");
					}, this, [this.sandbox.id + "_QuickFilterModuleV2"]);
					var gridSettingsId = "MarketingCalendarMktgActivitiesModuleId_GridSettingsV2";
					this.sandbox.subscribe("GridSettingsChanged", function(args) {
						if (args && args.newProfileData) {
							this.setColumnsProfile(args.newProfileData, true);
						}
						this.set("GridSettingsChanged", true);
						this.initSortActionItems();
					}, this, [gridSettingsId]);
					this.sandbox.subscribe("SortColumn", function(index) {
						this.sortColumn(index);
					}, this, ["MarketingCalendarMktgActivitiesModuleId"]);
					this.sandbox.subscribe("GetEmptyMessageConfig", this.prepareEmptyGridMessageConfig,
						this, ["MarketingCalendarMktgActivitiesModuleId"]);
				},

				/**
				 * Gets "view" menu items.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.BaseViewModelCollection} Returns "view" menu items.
				 */
				getViewOptions: function() {
					var viewOptions = this.Ext.create("Terrasoft.BaseViewModelCollection");
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.SortMenuCaption"},
						"Items": {"bindTo": "SortColumns"},
						"Visible": {"bindTo": "IsSortMenuVisible"}
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.OpenGridSettingsCaption"},
						"Click": {"bindTo": "openCalendarGridSettings"},
						"Visible": {"bindTo": "IsGridSettingsMenuVisible"}
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ViewButtonWeekScaleCaption"},
						"Click": {"bindTo": "setCalendarScale"},
						"Tag": "Week"
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ViewButtonMonthScaleCaption"},
						"Click": {"bindTo": "setCalendarScale"},
						"Tag": "Month"
					}));
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ViewButtonQuarterScaleCaption"},
						"Click": {"bindTo": "setCalendarScale"},
						"Tag": "Quarter"
					}));
					return viewOptions;
				},

				/**
				 * Opens calendar grid settings.
				 * @protected
				 * @virtual
				 */
				openCalendarGridSettings: function() {
					this.sandbox.publish("OpenCalendarGridSettings", null, ["MarketingCalendarMktgActivitiesModuleId"]);
				},

				/**
				 * Sets calendar scale.
				 * @protected
				 * @virtual
				 * @param {String} scaleName Scale name.
				 */
				setCalendarScale: function(scaleName) {
					this.sandbox.publish("SetCalendarScale", {
						tag: scaleName
					}, ["MarketingCalendarMktgActivitiesModuleId"]);
				},

				getDataGridName: function() {
					return "CalendarLeftGrid";
				},

				sortGrid: function(tag) {
					this.mixins.GridUtilities.sortGrid.call(this, tag);
					this.sandbox.publish("SortGrid", tag, ["MarketingCalendarMktgActivitiesModuleId"]);
				},

				changeDataView: function(viewConfig) {
					if ((typeof viewConfig !== "string") && viewConfig.moduleName !== this.name) {
						return;
					}
					var viewName = (typeof viewConfig === "string") ? viewConfig : viewConfig.tag;
					if (viewName.indexOf("NavigateToMarketingCampaigns") > -1) {
						this.showBodyMask();
						var entityName = "CampaignPlanner";
						var activeViewProfileKey = entityName + "SectionActiveViewSettingsProfile";
						this.Terrasoft.require(["profile!" + activeViewProfileKey], function(activeViewProfile) {
							activeViewProfile.activeViewName = viewName.replace("NavigateToMarketingCampaigns", "");
							Terrasoft.utils.saveUserProfile(activeViewProfileKey, activeViewProfile, false, function() {
								var moduleStructure = this.getModuleStructure(entityName);
								var hash = this.Terrasoft.combinePath(moduleStructure.sectionModule,
									moduleStructure.sectionSchema);
								this.sandbox.publish("PushHistoryState", {
									hash: hash
								});
							}, this);
						}, this);
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#changeSelectedSideBarMenu
				 * @overridden
				 */
				changeSelectedSideBarMenu: function() {
					var moduleStructure = this.getModuleStructure("CampaignPlanner");
					if (moduleStructure) {
						var hash = moduleStructure.sectionModule + "/";
						if (moduleStructure.sectionSchema) {
							hash += moduleStructure.sectionSchema + "/";
						}
						this.sandbox.publish("SelectedSideBarItemChanged", hash, ["sectionMenuModule"]);
					} else {
						this.callParent(arguments);
					}
				},

				toggleCalendar: function() {
					var isRightGridContainerVisible = !this.get("IsRightGridContainerVisible");
					this.set("IsRightGridContainerVisible", isRightGridContainerVisible);
					this.sandbox.publish("ToggleCalendar", isRightGridContainerVisible,
						["MarketingCalendarMktgActivitiesModuleId"]);
				},

				getToggleCalendarButtonMarkerValue: function() {
					var isRightGridContainerVisible = this.get("IsRightGridContainerVisible");
					return isRightGridContainerVisible ? "RightGridContainerVisible" : "RightGridContainerNotVisible";
				},

				initContextHelp: function() {
					this.set("ContextHelpId", 1623);
					this.callParent(arguments);
				},

				loadGridData: Terrasoft.emptyFn,

				/**
				 * @override Terrasoft.BaseMarketingCalendarSection#getStartDateRecordsRangeEsq
				 */
				getStartDateRecordsRangeEsq: function(minStartDateColumnAlias, maxStartDateColumnAlias) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "MktgActivity"
					});
					esq.addAggregationSchemaColumn("StartDate",  this.Terrasoft.AggregationType.MIN,
						minStartDateColumnAlias);
					esq.addAggregationSchemaColumn("StartDate",  this.Terrasoft.AggregationType.MAX,
						maxStartDateColumnAlias);
					return esq;
				},

				/**
				 * @override Terrasoft.BaseMarketingCalendarSection#calendarYearChanged
				 */
				calendarYearChanged: function (newValue) {
					this.sandbox.publish("CalendarYearChanged", newValue, ["MarketingCalendarMktgActivitiesModuleId"]);
				}

			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "remove",
					"name": "DataGridContainer"
				},
				{
					"operation": "merge",
					"name": "SeparateModeActionsButton",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "insert",
					"name": "ToggleCalendarButton",
					"parentName": "SeparateModeActionButtonsRightContainer",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {
							bindTo: "toggleCalendar"
						},
						"markerValue": {
							bindTo: "getToggleCalendarButtonMarkerValue"
						},
						"controlConfig": {
							"imageConfig": {
								"bindTo": "Resources.Images.ToggleCalendarIcon"
							}
						},
						"classes": {
							"wrapperClass": ["toggle-calendar-wrapper"],
							"imageClass": ["toggle-calendar-image"]
						},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"parentName": "GridDataView",
					"propertyName": "items",
					"name": "MarketingCalendarMktgActivitiesModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "MarketingCalendarMktgActivitiesModule",
						"moduleId": "MarketingCalendarMktgActivitiesModuleId"
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


