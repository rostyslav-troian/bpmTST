Terrasoft.configuration.Structures["BulkEmailAnalytics"] = {innerHierarchyStack: ["BulkEmailAnalytics"]};
define("BulkEmailAnalytics", ["MarketingEnums", "SimpleIndicatorModule", "HighchartsWrapper"],
	function(MarketingEnums) {
		var BulkEmailAnalyticsClass = Ext.define("Terrasoft.configuration.mixins.BulkEmailAnalytics", {

			alternateClassName: "Terrasoft.BulkEmailAnalytics",

			/**
			 * Creates chart indicators.
			 * @private
			 */
			_createPieces: function(allIndicators) {
				var result = [];
				Terrasoft.each(allIndicators, function(item) {
					var currentIndicator = {
						name:  this.get("Resources.Strings.IndicatorCaptionFor" + item.name),
						y: this.get(item.name + "Count") || this.get(item.name),
						color: item.color
					};
					if (currentIndicator.y > 0) {
						result.push(currentIndicator);
					}
				}, this);
				return result;
			},

			/**
			 * Indicates if pie chart with canceled responses empty.
			 * @returns {Boolean} Returns true, when chart is empty, otherwise false.
			 */
			isCanceledChartEmpty: function() {
				var config = this._getCanceledChartConfig();
				var pieces = this._createPieces(config);
				return pieces.length === 0;
			},

			/**
			 * Indicates if pie chart with not delivered responses empty.
			 * @returns {Boolean} Returns true, when chart is empty, otherwise false.
			 */
			isNotDeliveredChartEmpty: function() {
				var config = this._getNotDeliveredChartConfig();
				var pieces = this._createPieces(config);
				return pieces.length === 0;
			},

			/**
			 * Config provider for not delivered chart.
			 * @private
			 */
			_getNotDeliveredChartConfig : function() {
				var config = [
					{
						name: "SoftBounce",
						color: "#ffc107"
					},
					{
						name: "HardBounce",
						color: "#ff9800"
					},
					{
						name: "Rejected",
						color: "#ff7043"
					},
					{
						name: "DeliveryError",
						color: "#9575cd"
					}
				];
				return config;
			},

			/**
			 * Config provider for canceled chart.
			 * @private
			 */
			_getCanceledChartConfig : function() {
				var config = [
					{
						name: "BlankEmail",
						color: "#ffc107"
					},
					{
						name: "IncorrectEmail",
						color: "#ff9800"
					},
					{
						name: "UnreachableEmail",
						color: "#ff7043"
					},
					{
						name: "CommunicationLimit",
						color: "#0091EA"
					},
					{
						name: "DoNotUseEmail",
						color: "#9575cd"
					},
					{
						name: "DuplicateEmail",
						color: "#03a9f4"
					},
					{
						name: "TemplateNotFound",
						color: "#009688"
					},
					{
						name: "SendersDomainNotVerified",
						color: "#f29446"
					},
					{
						name: "SendersNameNotValid",
						color: "#00bfa5"
					}
				];
				return config;
			},

			/**
			 * Returns formatter for pie series config.
			 * @private
			 */
			_getPieChartSeriesConfig: function(name, pieces) {
				var config = [
					{
						type: "pie",
						name: name,
						data: pieces
					}
				];
				return config;
			},

			/**
			 * Returns based pie chart config.
			 * @private
			 */
			_getPieChartConfig: function(titleText, seriesConfig) {
				var chartConfig = {
					chart: {
						type: "pie"
					},
					tooltip: {
						formatter: function() {
							var percentage = Math.round(this.percentage * 100) / 100;
							return this.series.name + "<br><b>" + this.point.name + "</b>: " + percentage + " %";
						},
						useHTML: Terrasoft.getIsRtlMode()
					},
					title: {
						text: titleText
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: "pointer",
							dataLabels: {
								enabled: true,
								color: "#999999",
								connectorColor: "#999999",
								useHTML: Terrasoft.getIsRtlMode()
							}
						}
					},
					credits: {
						enabled: false
					},
					series: seriesConfig
				};
				return chartConfig;
			},

			/**
			 * Event handler of delivery errors module rendering rendering.
			 * @private
			 */
			_loadNotDeliveredChart: function() {
				if (this.get("ActiveTabName") !== "AnalyticsTab") {
					return;
				}
				var config = this._getNotDeliveredChartConfig();
				var pieces = this._createPieces(config);
				if (this.notDeliveredChart && !this.notDeliveredChart.destroyed) {
					this.notDeliveredChart.destroy();
				}
				if (pieces.length === 0) {
					return;
				}
				var seriesName = this.get("Resources.Strings.NotDeliveredChartGroupCaption");
				var seriesConfig = this._getPieChartSeriesConfig(seriesName, pieces);
				var title = this.get("Resources.Strings.NotDeliveredChartTitle");
				var chartConfig = this._getPieChartConfig(title, seriesConfig);
				this.notDeliveredChart = this.Ext.create("Terrasoft.Chart", {
					renderTo: Ext.get("BulkEmailNotDeliveredChartContainer"),
					chartConfig: chartConfig
				});
			},

			/**
			 * Event handler of delivery errors module rendering rendering.
			 * @private
			 */
			_loadCanceledChart: function() {
				if (this.get("ActiveTabName") !== "AnalyticsTab") {
					return;
				}
				var config = this._getCanceledChartConfig();
				var pieces = this._createPieces(config);
				if (this.canceledChart && !this.canceledChart.destroyed) {
					this.canceledChart.destroy();
				}
				if (pieces.length === 0) {
					return;
				}
				var seriesName = this.get("Resources.Strings.NotDeliveredChartGroupCaption");
				var seriesConfig = this._getPieChartSeriesConfig(seriesName, pieces);
				var title = this.get("Resources.Strings.CanceledChartTitle");
				var chartConfig = this._getPieChartConfig(title, seriesConfig);
				this.canceledChart = this.Ext.create("Terrasoft.Chart", {
					renderTo: Ext.get("BulkEmailCanceledChartContainer"),
					chartConfig: chartConfig
				});
			},

			/**
			 * Event handler of indicators modules rendering.
			 * @private
			 */
			_getIndicatorsConfig: function() {
				var indicators = {
					Delivered: {style: "widget-green", textDecorator: "{0}", showBottomLabel : false },
					Opens: {style: "widget-violet", textDecorator: "{0}%", showBottomLabel : true },
					Clicks: {style: "widget-blue", textDecorator: "{0}%", showBottomLabel : true},
					Unsubscribe: {style: "widget-orange", textDecorator: "{0}%", showBottomLabel : true },
					Spam: {style: "widget-coral", textDecorator: "{0}%", showBottomLabel : true}
				};
				return indicators;
			},

			/**
			 * Event handler of indicators modules rendering.
			 * @private
			 */
			loadIndicatorsModules: function() {
				if (this.get("ActiveTabName") !== "AnalyticsTab") {
					return;
				}
				var indicators = this._getIndicatorsConfig();
				Terrasoft.each(indicators, function(item, key) {
					var moduleId = this.sandbox.id + "_IndicatorModule_" + key;
					this.sandbox.loadModule("SimpleIndicatorModule", {
						renderTo: "BulkEmailIndicator" + key,
						id: moduleId
					});
					this.sandbox.subscribe("GetIndicatorConfig", function() {
						var box = {
							caption: this.get("Resources.Strings.IndicatorCaptionFor" + key),
							fontStyle: "default-indicator-font-size",
							format: {
								textDecorator: item.textDecorator,
								thousandSeparator: Terrasoft.Resources.CultureSettings.thousandSeparator,
								dateFormat: Terrasoft.Resources.CultureSettings.dateFormat
							},
							bottomLabelFormat: {
								decimalPrecision: 0,
								thousandSeparator: Terrasoft.Resources.CultureSettings.thousandSeparator,
								type: Terrasoft.DataValueType.INTEGER
							},
							hint: this.get("Resources.Strings.IndicatorHintFor" + key)
						};
						if (item.showBottomLabel) {
							box.value = this.get(key) || 0;
							box.totalAmount = this.get(key + "Count") || 0;
						} else {
							box.value = this.get(key + "Count") || 0;
							box.format.type = Terrasoft.DataValueType.INTEGER;
						}
						return this.Ext.apply(item, box);
					}, this, [moduleId]);
					this.sandbox.publish("GenerateIndicator", null, [moduleId]);
				}, this);
			},

			/**
			 * Loads click map.
			 * @private
			 */
			loadClicksMap: function() {
				if (this.get("ActiveTabName") !== "ClicksAnalysisTab" ||
					this.Terrasoft.Features.getIsEnabled("DynamicContentClickHeatmap")) {
					return;
				}
				var linksData = [];
				this.getHyperlinksClicksData(function(collection) {
					var linkDto = {};
					this.Terrasoft.each(collection, function (item) {
						linkDto.Url = item.get("Url");
						linkDto.ClicksCount = item.get("ClicksCount");
						linksData.push(this.Terrasoft.deepClone(linkDto));
					}, this);
					var unsubscribeCount = this.get("UnsubscribeCount");
					linkDto.Url = this.get("Resources.Strings.UnsubscribeLinkMacros");
					linkDto.ClicksCount = unsubscribeCount;
					linksData.push(this.Terrasoft.deepClone(linkDto));
					linkDto.Url = this.get("Resources.Strings.UnsubscribeUrlMacros");
					linksData.push(this.Terrasoft.deepClone(linkDto));
					var clicksMapModuleId = this.sandbox.id + "_ClicksMapModule";
					this.sandbox.subscribe("GetClicksMapConfig", function() {
						return {
							htmlText: this.get("TemplateBody"),
							linksData: linksData
						};
					}, this, [clicksMapModuleId]);
					this.sandbox.loadModule("BulkEmailClicksMap", {
						renderTo: "BulkEmailClicksMapModule",
						id: clicksMapModuleId
					});
				}, this);
			},

			/**
			 * Gets the data from the BulkEmailHyperlink table and then calls the callback function.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			getHyperlinksClicksData: function(callback, scope) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "BulkEmailHyperlink"
				});
				esq.addColumn("Caption");
				esq.addColumn("Url");
				var clicksCountColumn = esq.addColumn("ClicksCount");
				clicksCountColumn.orderPosition = 1;
				clicksCountColumn.orderDirection = Terrasoft.OrderDirection.DESC;
				esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "BulkEmail",
					this.get("Id")));
				esq.getEntityCollection(function(response) {
					callback.call(scope, response.collection);
				});
			},

			/**
			 * Initiates the download and display of the hyperlinks clicks chart.
			 * @private
			 */
			loadHyperlinksClicksChart: function() {
				if (this.get("ActiveTabName") !== "ClicksAnalysisTab" ||
					this.get("HyperlinksClicksGroupCollapsed") === true) {
					return;
				}
				this.getHyperlinksClicksData(function(collection) {
					this.showHyperlinksClicksChart(collection);
				}, this);
			},

			/**
			 * Shows the hyperlinks clicks chart.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} collection Collection of data for the chart.
			 */
			showHyperlinksClicksChart: function(collection) {
				if (this.hyperlinksClicksChart && !this.hyperlinksClicksChart.destroyed) {
					this.hyperlinksClicksChart.destroy();
				}
				var chartConfig = this.getHyperlinksClicksChartConfig(collection);
				this.hyperlinksClicksChart = this.Ext.create("Terrasoft.Chart", {
					renderTo: Ext.get("BulkEmailHyperlinkClicksChartContainer"),
					chartConfig: chartConfig
				});
			},

			/**
			 * Returns the configuration for the hyperlinks clicks chart.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} collection Collection of data for the chart.
			 * @return {Object} Chart configuration.
			 */
			getHyperlinksClicksChartConfig: function(collection) {
				var clicksCounts = [];
				var hyperlinkCaptions = [];
				var fullHyperlinkCaptions = [];
				var hyperlinkUrls = [];
				var linksCount = collection.getCount();
				var maxVisibleCaptionsCount = 7;
				var maxVisibleCharactersDecrement = 2;
				var maxUnwrappedStringLength = Math.floor(100 / linksCount) - maxVisibleCharactersDecrement;
				var ellipsis = "...";
				var linkLabel = this.get("Resources.Strings.HyperlinksClicksChartLinkLabel");
				collection.each(function(item) {
					clicksCounts.push(item.get("ClicksCount"));
					var caption = item.get("Caption");
					fullHyperlinkCaptions.push(caption);
					if (caption.length > maxUnwrappedStringLength) {
						caption = caption.substring(0, maxUnwrappedStringLength) + ellipsis;
					}
					hyperlinkCaptions.push(caption);
					hyperlinkUrls.push(item.get("Url"));
				}, this);
				return {
					chart: {
						type: "column",
						reflow: true,
						zoomType: "xy",
						resetZoomButton: {
							theme: {
								fill: "white",
								stroke: "silver",
								r: 0,
								states: {
									hover: {
										fill: "#41739D",
										style: {
											color: "white"
										}
									}
								}
							}
						}
					},
					credits: {
						enabled: false
					},
					tooltip: {
						useHTML: true,
						formatter: function(tooltip) {
							var index = this.point.x;
							var hyperlink = hyperlinkUrls[index];
							var url = "<a href=\"" + hyperlink + "\" target=\"_blank\">" + hyperlink + "</a>";
							return Ext.String.format("<span style=\"font-size: 10px\">{0}</span><br/>" +
									"<span style=\"color:{1}\">{2}</span>: <b>{3}</b><br/>" +
									"<span style=\"color:{1}\">{4}</span>: {5}<br/>",
									fullHyperlinkCaptions[index],
									this.series.color,
									this.series.name,
									this.point.y,
									linkLabel,
									url);
						}
					},
					title: {
						text: null
					},
					yAxis: {
						min: 0
					},
					xAxis: {
						categories: hyperlinkCaptions,
						labels: {
							enabled: (linksCount <= maxVisibleCaptionsCount)
						}
					},
					series: [{
						name: this.get("Resources.Strings.HyperlinksClicksChartClicksLabel"),
						data: clicksCounts,
						color: "#64b8df"
					}]
				};
			},

			/**
			 * Updates the SendProcessDiagram of sending a mailing.
			 * @protected
			 */
			updateSendProcessDiagram: function() {
				this.updateSendProcessCounters(function() {
					this.loadSendProcessDiagram();
				}, this);
			},

			/**
			 * Loads the SendProcessDiagram.
			 * @protected
			 */
			loadSendProcessDiagram: function() {
				if (this.sendProcessDiagram && !this.sendProcessDiagram.destroyed) {
					this.sendProcessDiagram.destroy();
				}
				var chartConfig = this.getSendProcessDiagramConfig();
				this.sendProcessDiagram = this.Ext.create("Terrasoft.Chart", {
					renderTo: Ext.get("SendProcessDiagramContainer"),
					chartConfig: chartConfig
				});
			},

			/**
			 * Returns count of delivered messages.
			 * @private
			 * @returns {number} Count of delivered messages.
			 */
			getDeliveredCount: function() {
				return this.get("DeliveredCount");
			},

			/**
			 * Returns count of sending messages.
			 * @private
			 * @returns {number} Count of sending messages.
			 */
			getSendingCount: function(delivered, bounce, deliveryError, canceledCount) {
				return this.get("RecipientCount") -
					delivered - bounce - deliveryError - canceledCount;
			},

			/**
			 * Returns count of bounce messages.
			 * @private
			 * @returns {number} Count of bounce messages.
			 */
			getBounceCount: function() {
				return this.get("HardBounceCount") +
				this.get("SoftBounceCount");
			},

			/**
			 * Returns count of canceled messages.
			 * @private
			 * @returns {number} Count of canceled messages.
			 */
			getDeliveryErrorCount: function() {
				return this.get("DeliveryError") +
					this.get("RejectedCount");
			},

			/**
			 * Returns count of canceled messages.
			 * @private
			 * @returns {number} Count of canceled messages.
			 */
			getCanceledCount: function() {
				return this.get("BlankEmailCount") +
					this.get("UnreachableEmailCount") +
					this.get("IncorrectEmailCount") +
					this.get("DoNotUseEmailCount") +
					this.get("DuplicateEmailCount") +
					this.get("CommunicationLimitCount") +
					this.get("TemplateNotFoundCount") +
					this.get("SendersDomainNotVerifiedCount") +
					this.get("SendersNameNotValidCount");
			},

			/**
			 * Generates the config for SendProcessDiagram chart depending on the status of the mailing.
			 * @protected
			 * @return {Object} Returns the configuration of SendProcessDiagram chart.
			 */
			getSendProcessDiagramConfig: function() {
				var status = this.get("Status");
				var bulkEmailStatus = !this.Ext.isEmpty(status) ? status.value : null;
				var showSendProcessDiagram = false;
				var delivered = this.getDeliveredCount();
				var bounce = this.getBounceCount();
				var deliveryError = this.getDeliveryErrorCount();
				var canceledCount = this.getCanceledCount();
				var sending = this.getSendingCount(delivered, bounce, deliveryError, canceledCount);
				if (bulkEmailStatus !== MarketingEnums.BulkEmailStatus.PLANNED &&
					bulkEmailStatus !== MarketingEnums.BulkEmailStatus.STARTING) {
					showSendProcessDiagram = true;
				}
				return {
					chart: {
						animation: showSendProcessDiagram,
						type: "bar",
						height: Terrasoft.Features.getIsEnabled("UseHighCharts") ? 86 : 36,
						style: {
							width: "100%"
						},
						marginLeft: 28,
						marginTop: 0,
						marginRight: 2,
						marginBottom: 0,
						spacing: [0, 0, 0, 0]
					},
					credits: {
						enabled: false
					},
					subtitle: {
						floating: true
					},
					tooltip: {
						enabled: showSendProcessDiagram,
						useHTML: Terrasoft.getIsRtlMode(),
						followPointer: true,
						formatter: function() {
							var tooltipTemplate = "{0}: <b>{1}</b> ({2}%)";
							var valueNumber = Terrasoft.getFormattedNumberValue(this.y,
								{type: Terrasoft.DataValueType.INTEGER});
							var percentNumber = Terrasoft.getFormattedNumberValue(this.percentage,
								{type: Terrasoft.DataValueType.FLOAT, decimalPrecision: 2});
							return Ext.String.format(tooltipTemplate,
								this.series.name, valueNumber, percentNumber);
						}
					},
					xAxis: {
						type: "category",
						labels: {
							enabled: false
						},
						lineWidth: 0,
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						lineColor: "transparent",
						minorTickLength: 0,
						tickLength: 0
					},
					yAxis: {
						min: 0,
						title: {
							text: null
						},
						labels: {
							enabled: false
						},
						lineWidth: 0,
						gridLineWidth: 0,
						minorGridLineWidth: 0,
						lineColor: "transparent",
						minorTickLength: 0,
						tickLength: 0
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						bar: {
							animation: false,
							enableMouseTracking: showSendProcessDiagram,
							events: {
								legendItemClick: function() {
									return showSendProcessDiagram;
								}
							}
						},
						series: {
							stacking: "percent",
							pointWidth: 30,
							dataLabels: {
								enabled: false
							},
							states: {
								hover: {
									brightness: -0.1
								}
							}
						}
					},
					series: [ {
						name: this.get("Resources.Strings.DeliveredDiagramLabel"),
						color: showSendProcessDiagram ? "#20c964" : "#f0f0f0",
						legendIndex: 6,
						index: 6,
						data: [(showSendProcessDiagram) ? delivered : 0]
					}, {
						name: this.get("Resources.Strings.SendingDiagramLabel"),
						color: showSendProcessDiagram ?  "#c0c0c0" : "#f0f0f0",
						legendIndex: 5,
						index: 5,
						data: [(showSendProcessDiagram) ? sending : 0]
					}, {
						name: this.get("Resources.Strings.BounceDiagramLabel"),
						color: showSendProcessDiagram ? "#ffc107" : "#f0f0f0",
						legendIndex: 4,
						index: 4,
						data: [(showSendProcessDiagram) ? bounce : 0]
					}, {
						name: this.get("Resources.Strings.DeliveryErrorDiagramLabel"),
						color: showSendProcessDiagram ? "#ff9800" : "#f0f0f0",
						legendIndex: 3,
						index: 3,
						data: [(showSendProcessDiagram) ? deliveryError : 0]
					}, {
						name: this.get("Resources.Strings.CanceledDiagramLabel"),
						color: showSendProcessDiagram ? "#ff7043" : "#f0f0f0",
						legendIndex: 2,
						index: 2,
						data: [(showSendProcessDiagram) ? canceledCount : 0]
					}, {
						name: this.get("Resources.Strings.QueuedDiagramLabel"),
						color: showSendProcessDiagram ? "#f0f0f0" : "#f0f0f0",
						legendIndex: 1,
						index: 1,
						data: [(showSendProcessDiagram) ? 0 : 10]
					}]
				};
			},

			/**
			 * Initiates the loading and displaying of the Opens/Clicks chart.
			 * @private
			 */
			loadOpensClicksChart: function() {
				if (this.get("ActiveTabName") !== "AnalyticsTab" || this.get("OpenClicksGroupCollapsed") === true) {
					return;
				}
				this.showOpensClicksChart();
			},

			/**
			 * Loads data and displays the chart of Opens/Clicks.
			 * @private
			 */
			showOpensClicksChart: function() {
				this.loadClicksOpensChartData(function(clicks, opens) {
					if (this.opensClicksChart && !this.opensClicksChart.destroyed) {
						this.opensClicksChart.destroy();
					}
					Terrasoft.SysSettings.querySysSettingsItem("BulkEmailHourlyStatisticPeriod",
						function(hours) {
							var chartConfig = this.getOpensClicksChartConfig(clicks, opens, hours);
							this.opensClicksChart = this.Ext.create("Terrasoft.Chart", {
								renderTo: Ext.get("BulkEmailOpensClicksChartContainer"),
								chartConfig: chartConfig
							});
						}, this);
				}, this);
			},

			/**
			 * Loads data for the Opens/Clicks chart, after receiving the data, calls the callback function.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			loadClicksOpensChartData: function(callback, scope) {
				var clicksEsq = this.getClicksOpensEsq("Clicks");
				var opensEsq = this.getClicksOpensEsq("Opens");
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				var clicksCollection;
				var opensCollection;
				batchQuery.add(clicksEsq, function(response) {
					clicksCollection = response.collection;
				}, this);
				batchQuery.add(opensEsq, function(response) {
					opensCollection = response.collection;
					callback.call(scope, clicksCollection, opensCollection);
				}, this);
				batchQuery.execute();
			},

			/**
			 * Gets query for recive data for Opens/Clicks chart.
			 * @private
			 * @param {String} indicatorName The name of indicator (clicks | opens).
			 * @return {Terrasoft.EntitySchemaQuery} Returns query.
			 */
			getClicksOpensEsq: function(indicatorName) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "BulkEmailHourly" + indicatorName
				});
				var dateMarkColumn = esq.addColumn("DateMark");
				dateMarkColumn.orderPosition = 1;
				dateMarkColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				esq.addColumn("EventsCount");
				esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"BulkEmailId", this.get("Id")));
				return esq;
			},

			/**
			 * Generates the config for Opens/Clicks chart.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} clicks Clicks collection.
			 * @param {Terrasoft.BaseViewModelCollection} opens Opens collection.
			 * @param {Number} hoursToShow Number of hours to display on the chart.
			 * @return {Object} Returns the configuration of Opens/Clicks chart.
			 */
			getOpensClicksChartConfig: function(clicks, opens, hoursToShow) {
				var chartData = this.getDateMarks(clicks, opens, hoursToShow);
				return {
					chart: {
						type: "line",
						reflow: true,
						zoomType: "xy",
						resetZoomButton: {
							theme: {
								fill: "white",
								stroke: "silver",
								r: 0,
								states: {
									hover: {
										fill: "#41739D",
										style: {
											color: "white"
										}
									}
								}
							}
						}
					},
					credits: {
						enabled: false
					},
					title: {
						text: null
					},
					legend: {
						layout: "horizontal",
						align: "center",
						verticalAlign: "bottom",
						borderWidth: 0,
						enabled: true,
						useHTML: Terrasoft.getIsRtlMode()
					},
					yAxis: {
						title: {
							text: this.get("Resources.Strings.OpensClicksChartCountLabel")
						},
						min: 0
					},
					xAxis: {
						categories: chartData.dateMarks,
						labels: {
							align: "right",
							rotation: -45,
							y: 10,
							step: 2,
							style: {
								fontWeight: "bold"
							}
						}
					},
					series: [{
						name: this.get("Resources.Strings.OpensClicksChartClicksLabel"),
						data: chartData.clicks,
						color: "#64b8df"
					}, {
						name: this.get("Resources.Strings.OpensClicksChartOpensLabel"),
						data: chartData.opens,
						color: "#8ecb60"
					}]
				};
			},

			/**
			 * Formats the date in the correct format.
			 * @private
			 * @param {Date} dateMark Date for formatting.
			 * @return {String} Returns formatted date string.
			 */
			formatDateMark: function(dateMark) {
				return Ext.Date.format(dateMark, "d.m H:i");
			},

			/**
			 * Creates and populates an array of values over an array of timestamps.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} events Collection of data for the chart.
			 * @param {Array} dateMarks Collection of timestamps.
			 * @return {Array} Returns collection of timestamps.
			 */
			getEventsDataArray: function(events, dateMarks) {
				var eventsData = Array.apply(null, new Array(dateMarks.length));
				eventsData = eventsData.map(Number.prototype.valueOf, 0);
				events.each(function(entity) {
					var dateMark = this.formatDateMark(entity.get("DateMark"));
					var index = dateMarks.indexOf(dateMark);
					eventsData[index] = entity.get("EventsCount");
				}, this);
				return eventsData;
			},

			/**
			 * Generates the config for Opens/Clicks chart.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} clicks Clicks collection.
			 * @param {Terrasoft.BaseViewModelCollection} opens Opens collection.
			 * @param {Number} hoursToShow Number of hours to display on the chart.
			 * @return {Object} Returns the minimum date of analysis.
			 */
			getDateMarks: function(clicks, opens, hoursToShow) {
				var dateMarks = [];
				if (!clicks.isEmpty() || !opens.isEmpty()) {
					var maxPossibleDate = new Date(25000, 1, 1);
					var clicksFirstEvent = (!clicks.isEmpty()) ?
						clicks.getByIndex(0).get("DateMark") : maxPossibleDate;
					var opensFirstEvent = (!opens.isEmpty()) ?
						opens.getByIndex(0).get("DateMark") : maxPossibleDate;
					var startDate = (clicksFirstEvent < opensFirstEvent) ? clicksFirstEvent : opensFirstEvent;
					dateMarks.push(startDate);
					for (var i = 1; i < hoursToShow; i++) {
						dateMarks[i] = Ext.Date.add(dateMarks[i - 1], Ext.Date.HOUR, 1);
					}
					Terrasoft.each(dateMarks, function(item, index) {
						dateMarks[index] = this.formatDateMark(item);
					}, this);
				}
				return {
					dateMarks: dateMarks,
					clicks: this.getEventsDataArray(clicks, dateMarks),
					opens: this.getEventsDataArray(opens, dateMarks)
				};
			},

			/**
			 * Returns query to counters of send process.
			 * @private
			 * @returns {Terrasoft.EntitySchemaQuery} Query to counters of send process.
			 */
			getSendProcessCountersQuery: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.entitySchemaName
				});
				esq.addColumn("SendCount");
				esq.addColumn("SoftBounceCount");
				esq.addColumn("DeliveryError");
				esq.addColumn("HardBounceCount");
				esq.addColumn("RejectedCount");
				esq.addColumn("NotDeliveredCount");
				esq.addColumn("InQueueCount");
				esq.addColumn("Status");
				return esq;
			},

			/**
			 * Updates indicators of send message state and calls callback function.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			updateSendProcessCounters: function(callback, scope) {
				var esq = this.getSendProcessCountersQuery();
				esq.getEntity(this.get("Id"), function(result) {
					if (result.success) {
						var bulkEmail = result.entity;
						this.set("SendCount", bulkEmail.get("SendCount"));
						this.set("SoftBounceCount", bulkEmail.get("SoftBounceCount"));
						this.set("DeliveryError", bulkEmail.get("DeliveryError"));
						this.set("HardBounceCount", bulkEmail.get("HardBounceCount"));
						this.set("RejectedCount", bulkEmail.get("RejectedCount"));
						this.set("NotDeliveredCount", bulkEmail.get("NotDeliveredCount"));
						this.set("InQueueCount", bulkEmail.get("InQueueCount"));
						this.set("Status", bulkEmail.get("Status"));
					}
					callback.call(scope);
				}, this);
			},

			/**
			 * Loads content of tab "Click analytics".
			 * @private
			 */
			loadClicksAnalysisTabContent: function() {
				this.loadClicksMap();
			},

			/**
			 * Loads the contents of the "Analyte" tab.
			 * @private
			 */
			loadAnalyticsTabContent: function() {
				this.loadIndicatorsModules();
				this._loadNotDeliveredChart();
				this._loadCanceledChart();
				this.loadOpensClicksChart();
				this.loadHyperlinksClicksChart();
			},

			/**
			 * The event handler folding \ unfolding of the "Opens/Clicks chart".
			 * @param {Boolean} collapsed Indication whether a group of fields is collapsed.
			 * @private
			 */
			openClicksGroupCollapsedChanged: function(collapsed) {
				this.set("OpenClicksGroupCollapsed", collapsed);
				if (collapsed === false) {
					this.loadOpensClicksChart();
				}
			},

			/**
			 * The event handler folding \ unfolding of the "Hyperlinks clicks chart".
			 * @param {Boolean} collapsed Indication whether a group of fields is collapsed.
			 * @private
			 */
			hyperlinksClicksGroupCollapsedChanged: function(collapsed) {
				this.set("HyperlinksClicksGroupCollapsed", collapsed);
				if (collapsed === false) {
					this.loadHyperlinksClicksChart();
				}
			},

			/**
			 * The event handler folding \ unfolding of the "Clicks map chart".
			 * @param {Boolean} collapsed Indication whether a group of fields is collapsed.
			 * @private
			 */
			clicksMapControlGroupCollapsedChanged: function(collapsed) {
				this.set("MapControlGroupCollapsed", collapsed);
				if (collapsed === false) {
					this.loadClicksMap();
				}
			},

			/**
			 * The event handler folding \ unfolding of the "NotDelivered chart".
			 * @param {Boolean} collapsed Indication whether a group of fields is collapsed.
			 * @private
			 */
			notDeliveredChartGroupCollapsedChanged: function(collapsed) {
				this.set("NotDeliveredChartControlGroupCollapsed", collapsed);
				if (collapsed === false) {
					this._loadNotDeliveredChart();
					this._loadCanceledChart();
				}
			}

		});
		return BulkEmailAnalyticsClass;
	});


