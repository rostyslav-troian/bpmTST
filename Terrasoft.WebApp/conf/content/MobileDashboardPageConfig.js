Terrasoft.configuration.Structures["MobileDashboardPageConfig"] = {innerHierarchyStack: ["MobileDashboardPageConfig"]};
/* globals SysDashboard: false */
/* globals DashboardFilterModel: false */
if (!Terrasoft.Features.getIsEnabled("ShowMobileDashboards")) {
	Ext.define("DashboardFilterModel", {
		extend: "Terrasoft.model.BaseModel",
		statics: {
			ColumnConfigs: new Ext.util.MixedCollection(),
			PrimaryColumnName: "Id",
			PrimaryDisplayColumnName: "Name",
			Store: null,
			Rules: null
		},
		config: {
			fields: [
				{name: "Id"},
				{name: "Name"}
			]
		}
	}, function() {
		this.Store = Ext.create("Ext.data.Store", {model: "DashboardFilterModel"});
		this.ColumnConfigs.add("Id", {
			columnType: Terrasoft.ColumnTypes.integer
		});
		this.ColumnConfigs.add("Name", {
			columnType: Terrasoft.ColumnTypes.string
		});
		this.Store.add({
			Id: 1,
			Name: Terrasoft.LocalizableStrings.DashboardFilterModelOpportunity
		});
		this.Store.add({
			Id: 2,
			Name: Terrasoft.LocalizableStrings.DashboardFilterModelActivity
		});
	});
	
	Terrasoft.LastLoadedPageData = {
		controllerName: "DashboardPage.Controller",
		viewXType: "DashboardPage"
	};
	
	Ext.define("DashboardPage.View", {
		extend: "Terrasoft.view.BaseConfigurationPage",
		xtype: "DashboardPage",
		config: {
			id: "DashboardPage",
			pageType: Terrasoft.PageTypes.Grid,
			navigationPanel: {
				itemId: "DashboardPage_navigationPanel",
				showMenuOnSwipe: true
			},
			layout: "vbox",
			items: [
				{
					xtype: "container",
					layout: "fit",
					height: "100%",
					width: "100%",
					items: [
						{
							xtype: "tscombobox",
							id: "DashboardPage_filter",
							modelName: "DashboardFilterModel",
							columnsConfig: ["Id", "Name"],
							pickerTitle: Terrasoft.LocalizableStrings.DashboardPageFilterPickerTitle,
							defaultPickerConfig: {
								popup: true,
								toolbar: {
									clearButton: false
								}
							},
							style: {
								"min-height": "35px",
								"padding-top": "7px",
								"border-bottom": "solid 1px rgba(0, 0, 0, 0.12)"
							},
							docked: "top"
						},
						{
							xtype: "container",
							layout: "card",
							id: "DashboardPage_CardContainer",
							height: "100%",
							width: "100%"
						}
					]
				}
			]
		}
	
	});
	
	Terrasoft.util.writeStyles(
		"#DashboardPage_filter.x-field-select .x-component-outer::after {",
		"	margin-top: -2px;",
		"}"
	);
	
	Ext.define("DashboardPage.Controller", {
		extend: "Terrasoft.controller.BaseConfigurationPage",
	
		statics: {
			Model: SysDashboard
		},
	
		config: {
			pageId: "DashboardPage",
			refs: {
				view: "#DashboardPage",
				navigationPanel: "#DashboardPage_navigationPanel",
				activitiesByStatusesChart: "#DashboardPage_activitiesByStatusesChartPanel",
				activitiesByOpportunityStageChart: "#DashboardPage_activitiesByOpportunityStageChartPanel",
				salesChart: "#DashboardPage_salesFunnelPanel"
			},
			control: {
				view: {
					initialize: "initializeView"
				}
			}
		},
	
		/*
		* @private
		*/
		salesFunnelChartObject: null,
	
		/*
		* @private
		*/
		activitiesByStatusesChartObject: null,
	
		/*
		* @private
		*/
		activitiesByOpportunityStagesChartObject: null,
	
		initializeView: function() {
			this.callParent(arguments);
			var navigationPanel = this.getNavigationPanel();
			navigationPanel.setTitle(Terrasoft.LocalizableStrings.DashboardPageNavigationPanelTitle);
			navigationPanel.setMenuButton(true);
			var filterControl = Ext.getCmp("DashboardPage_filter");
			var picker = filterControl.getPicker();
			picker.on("itemtap", this.filterChanged, this);
			filterControl.setValue(DashboardFilterModel.Store.data.items[0]);
			Ext.Viewport.on("orientationchange", this.onOrientationChange, this, {delay: 1000});
			this.showOpportunityCharts();
			Terrasoft.Mask.hide();
		},
	
		pageLoadComplete: function() {
		},
	
		pageUnloadComplete: function() {
		},
	
		onViewSwipeRight: function(e) {
			var mainController = Terrasoft.util.getMainController();
			mainController.getView().toggleInDirection(e.direction);
		},
	
		onOrientationChange: function() {
			if (this.salesFunnelChartObject) {
				this.salesFunnelChartObject.reflow();
			}
			if (this.activitiesByStatusesChartObject) {
				this.activitiesByStatusesChartObject.reflow();
			}
			if (this.activitiesByOpportunityStagesChartObject) {
				this.activitiesByOpportunityStagesChartObject.reflow();
			}
		},
	
		buildActivitiesByStatusesChart: function() {
			var config = {
				chart: {
					renderTo: "DashboardPage_activitiesByStatusesChartPanel",
					height: 300,
					type: "column"
				},
				title: {
					text: Terrasoft.LocalizableStrings.DashboardPageActivitiesByStatusesChartTitle
				},
				yAxis: {
					title: {
						text: Terrasoft.LocalizableStrings.DashboardPageActivitiesByStatusesChartYAxis
					}
				},
				colors: [
					"#62b9e1"
				],
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false
				}
			};
			var categories = [];
			var serie = [];
			var sqlText =
				"select count(a.Id) as Count, ast.Name as StatusName " +
				"from Activity a " +
				"left outer join ActivityStatus ast on ast.Id = a.StatusId " +
				"where a.OwnerId = '" + Terrasoft.CurrentUserInfo.contactId + "' " +
				"group by ast.Name";
			var me = this;
			Terrasoft.Sql.DBExecutor.executeSql({
				sqls: [sqlText],
				success: function(data) {
					if (data.length > 0) {
						var records = data[0].rows;
						for (var i = 0, ln = records.length; i < ln; i++) {
							var sqlData = records.item(i);
							categories.push(sqlData.StatusName);
							serie.push(sqlData.Count);
						}
					}
					config.xAxis = {
						categories: categories
					};
					config.series = [{
						name: Terrasoft.LocalizableStrings.DashboardPageActivitiesByStatusesChartSerieLabel,
						data: serie
					}];
					me.activitiesByStatusesChartObject = Ext.create("Highcharts.Chart", config);
				}
			});
		},
	
		buildActivitiesByOpportunityStagesChart: function() {
			var config = {
				chart: {
					renderTo: "DashboardPage_activitiesByOpportunityStageChartPanel",
					height: 300,
					type: "column"
				},
				title: {
					text: Terrasoft.LocalizableStrings.DashboardPageActivitiesByOpportunityStagesChartTitle
				},
				yAxis: {
					title: {
						text: Terrasoft.LocalizableStrings.DashboardPageActivitiesByOpportunityStagesChartYAxis
					}
				},
				colors: [
					"#62b9e1"
				],
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false
				}
			};
			var categories = [];
			var serie = [];
			var sqlText =
				"select count(Activity.Id) as Count, OpportunityStage.Name as StageName " +
				"from Activity " +
				"inner join Opportunity on Opportunity.Id = Activity.OpportunityId " +
				"inner join OpportunityStage on OpportunityStage.Id = Opportunity.StageId " +
				"where Activity.OwnerId = '" + Terrasoft.CurrentUserInfo.contactId + "' " +
				"group by OpportunityStage.Name " +
				"order by OpportunityStage.Number asc";
			var me = this;
			Terrasoft.Sql.DBExecutor.executeSql({
				sqls: [sqlText],
				success: function(data) {
					if (data.length > 0) {
						var records = data[0].rows;
						for (var i = 0, ln = records.length; i < ln; i++) {
							var sqlData = records.item(i);
							categories.push(sqlData.StageName);
							serie.push(sqlData.Count);
						}
					}
					config.xAxis = {
						categories: categories
					};
					config.series = [{
						name: Terrasoft.LocalizableStrings.DashboardPageActivitiesByOpportunityStagesChartSerieLabel,
						data: serie
					}];
					me.activitiesByOpportunityStagesChartObject = Ext.create("Highcharts.Chart", config);
				}
			});
		},
	
		buildSalesFunnel: function() {
			var salesFunnelConfig = {
				chart: {
					type: "funnel",
					marginRight: 100,
					renderTo: "DashboardPage_salesFunnelPanel"
				},
				title: {
					text: Terrasoft.LocalizableStrings.DashboardPageSalesFunnelTitle,
					x: -50
				},
				plotOptions: {
					series: {
						dataLabels: {
							enabled: true,
							format: "<b>{point.name}</b> ({point.y:,.0f})",
							color: "black",
							softConnector: true,
							distance: 1,
							style: {
								width: "120px"
							}
						},
						neckWidth: "30%",
						neckHeight: "0%"
					}
				},
				legend: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				credits: {
					enabled: false
				}
			};
			var serie = [];
			var sqlText =
				"select count(os.Id) as Count, os.Name as StageName from Opportunity o " +
				"inner join OpportunityStage os on os.Id = o.StageId " +
				"group by os.Name, os.Number " +
				"order by os.Number asc";
			var me = this;
			Terrasoft.Sql.DBExecutor.executeSql({
				isCancelable: true,
				sqls: [sqlText],
				success: function(data) {
					if (data.length > 0) {
						var records = data[0].rows;
						for (var i = 0, ln = records.length; i < ln; i++) {
							var sqlData = records.item(i);
							serie.push([sqlData.StageName, sqlData.Count]);
						}
					}
					salesFunnelConfig.series = [{
						name: Terrasoft.LocalizableStrings.DashboardPageSalesFunnelSerieLabel,
						data: serie
					}];
					me.salesFunnelChartObject = Ext.create("Highcharts.Chart", salesFunnelConfig);
				}
			});
		},
	
		showActivityCharts: function() {
			var container = Ext.getCmp("DashboardPage_CardContainer");
			if (!this.activityChartsContainer) {
				this.activityChartsContainer = container.add({
					xtype: "container",
					scrollable: "vertical",
					items: [
						{
							id: "DashboardPage_activitiesByStatusesChartPanel",
							xtype: "container",
							style: "margin: 14px"
						},
						{
							id: "DashboardPage_activitiesByOpportunityStageChartPanel",
							xtype: "container",
							style: "margin: 14px"
						}
					]
				});
				var me = this;
				setTimeout(function() {
					me.activityChartsContainer.show();
					me.buildActivitiesByStatusesChart();
					me.buildActivitiesByOpportunityStagesChart();
					me.currentContainer = me.activityChartsContainer;
				}, 500);
			} else {
				this.activityChartsContainer.show();
				this.currentContainer = this.activityChartsContainer;
			}
		},
	
		showOpportunityCharts: function() {
			var container = Ext.getCmp("DashboardPage_CardContainer");
			if (!this.opportunityChartsContainer) {
				this.opportunityChartsContainer = container.add({
					xtype: "container",
					scrollable: "vertical",
					items: [
						{
							id: "DashboardPage_salesFunnelPanel",
							xtype: "container",
							style: "margin: 14px"
						}
					]
				});
				var me = this;
				setTimeout(function() {
					me.buildSalesFunnel();
					me.opportunityChartsContainer.show();
					me.currentContainer = me.opportunityChartsContainer;
				}, 500);
			} else {
				this.opportunityChartsContainer.show();
				this.currentContainer = this.opportunityChartsContainer;
			}
		},
	
		filterChanged: function(control, index) {
			this.currentContainer.hide();
			if (index === 1) {
				this.showActivityCharts();
			} else {
				this.showOpportunityCharts();
			}
		}
	
	});
}


