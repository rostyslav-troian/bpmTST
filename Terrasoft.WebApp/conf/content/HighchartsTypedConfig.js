Terrasoft.configuration.Structures["HighchartsTypedConfig"] = {innerHierarchyStack: ["HighchartsTypedConfig"]};
/**
 * Default setting module for chart types in API High#hart format
 * http://api.highcharts.com/highcharts.
 */
define("HighchartsTypedConfig", ["ext-base", "terrasoft"], function() {
	/**
	 * Is old UI feature enabled. Used for switching fonts.
	 * @type {Boolean}
	 */
	var oldUIFeature = Terrasoft.Features.getIsEnabled("OldUI");

	/**
	 * Default label style.
	 * @type {Object}
	 */
	var defaultLabelStyle = {
		font: oldUIFeature ? "13px ' SegoeUI'" : "13px 'Bpmonline Open Sans'",
		color: "#999999"
	};

	/**
	 * Default title style.
	 * @type {Object}
	 */
	var defaultTitleStyle = {
		font: oldUIFeature ? "13px 'Segoe UI Light', Verdana, sans-serif" : "13px 'Bpmonline Open Sans Light'",
		color: "#444444"
	};

	/**
	 * Default data label style.
	 * @type {Object}
	 */
	var defaultDataLabelsStyle = {
		font: oldUIFeature ? "14px 'Segoe UI'" : "14px 'Bpmonline Open Sans'",
		color: "#444444"
	};

	/**
	 * Default title margin.
	 * @type {Number}
	 */
	var defaultTitleMargin = 24;

	/**
	 * Default grid line colour.
	 * @type {String}
	 */
	var defaultGridLineColor = "#c3c3c3";

	/**
	 * Default line colour.
	 * @type {String}
	 */
	var defaultLineColor = "#c8c8c8";

	/**
	 * Default bar settings.
	 * @type {Object}
	 */
	var bar = {
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
					x: 5,
					style: defaultDataLabelsStyle,
					useHTML: Terrasoft.getIsRtlMode()
				}
			}
		},
		xAxis: {
			title: {
				enabled: false
			},
			labels: {
				enabled: true,
				x: -10,
				style: defaultLabelStyle,
				useHTML: Terrasoft.getIsRtlMode()
			},
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: false
			},
			labels: {
				enabled: false
			},
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 0,
			lineColor: "transparent",
			tickLength: 0,
			gridLineColor: "transparent",
			gridLineWidth: 0,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default column settings.
	 * @type {Object}
	 */
	var column = {
		plotOptions: {
			column: {
				dataLabels: {
					enabled: true,
					y: -5,
					style: defaultDataLabelsStyle
				}
			}
		},
		title: {
			margin: 25
		},
		xAxis: {
			title: {
				enabled: false
			},
			labels: {
				enabled: true,
				y: 20,
				x: 0,
				style: defaultLabelStyle,
				useHTML: Terrasoft.getIsRtlMode()
			},
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: false
			},
			labels: {
				enabled: false
			},
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 0,
			lineColor: "transparent",
			tickLength: 0,
			gridLineColor: "transparent",
			gridLineWidth: 0,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default spline settings.
	 * @type {Object}
	 */
	var spline = {
		plotOptions: {
			spline: {
				dataLabels: {
					enabled: false
				}
			},
			series: {
				marker: {
					enabled: false
				}
			}
		},
		xAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 20,
				x: 0,
				style: defaultLabelStyle
			},
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 5,
				x: -10,
				style: defaultLabelStyle
			},
			offset: 0,
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			tickLength: 0,
			gridLineColor: defaultGridLineColor,
			gridLineWidth: 1,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default line settings.
	 * @type {Object}
	 */
	var line = {
		plotOptions: {
			line: {
				dataLabels: {
					enabled: false
				}
			},
			series: {
				marker: {
					enabled: true,
					radius: 3.5,
					symbol: "circle"
				}
			}
		},
		xAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 20,
				x: 0,
				style: defaultLabelStyle
			},
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 5,
				x: -10,
				style: defaultLabelStyle
			},
			offset: 0,
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			tickLength: 0,
			gridLineColor: defaultGridLineColor,
			gridLineWidth: 1,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default scatter settings.
	 * @type {Object}
	 */
	var scatter = {
		plotOptions: {
			scatter: {
				dataLabels: {
					enabled: false
				}
			},
			series: {
				marker: {
					enabled: true,
					radius: 3.5,
					symbol: "circle"
				}
			}
		},
		xAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 20,
				x: 0,
				style: defaultLabelStyle
			},
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 5,
				x: -10,
				style: defaultLabelStyle
			},
			offset: 0,
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			tickLength: 0,
			gridLineColor: defaultGridLineColor,
			gridLineWidth: 1,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default areaspline settings.
	 * @type {Object}
	 */
	var areaspline = {
		plotOptions: {
			areaspline: {
				dataLabels: {
					enabled: false
				}
			},
			series: {
				marker: {
					enabled: false
				}
			}
		},
		xAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin,
				useHTML: Terrasoft.getIsRtlMode()
			},
			labels: {
				enabled: true,
				y: 20,
				x: 0,
				style: defaultLabelStyle
			},
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 5,
				x: -10,
				style: defaultLabelStyle
			},
			offset: 0,
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			gridLineWidth: 1,
			gridLineColor: defaultGridLineColor,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default pie settings.
	 * @type {Object}
	 */
	var pie = {
		plotOptions: {
			pie: {
				dataLabels: {
					enabled: true,
					format: "{point.name} ({point.y})",
					style: {
						width: "100%",
						margin: "20px"
					},
					useHTML: Terrasoft.getIsRtlMode(),
					connectorWidth: 0.3,
					connectorColor: "#999999"
				},
				showInLegend: false,
				innerSize: "0%"
			},
			series: {
				marker: {
					enabled: true
				}
			}
		},
		xAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 20,
				x: 0,
				style: {
					fontFamily: oldUIFeature ? "Segoe UI" : "Bpmonline Open Sans",
					fontSize: "16px",
					color: "#444"
				}
			},
			showEmpty: false,
			offset: 0,
			lineWidth: 1,
			lineColor: defaultLineColor,
			minorGridLineWidth: 0,
			minorTickLength: 0,
			tickLength: 0
		},
		yAxis: {
			title: {
				enabled: true,
				style: defaultTitleStyle,
				margin: defaultTitleMargin
			},
			labels: {
				enabled: true,
				y: 5,
				x: 0,
				style: {
					fontFamily: oldUIFeature ? "Segoe UI" : "Bpmonline Open Sans",
					fontSize: "16px",
					color: "#444"
				}
			},
			offset: 4,
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 0,
			lineColor: "transparent",
			tickLength: 0,
			gridLineColor: defaultGridLineColor,
			gridLineWidth: 1,
			tickInterval: null,
			tickColor: "#C0D0E0"
		},
		legend: {
			useHTML: Terrasoft.getIsRtlMode(),
			enabled: true,
			borderWidth: 0,
			backgroundColor: "transparent",
			itemStyle: {
				fontFamily: oldUIFeature ? "Segoe UI Light" : "Bpmonline Open Sans Light",
				fontSize: "13px",
				color: "#777777",
				borderRadius: 0
			}
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default gauge settings.
	 * @type {Object}
	 */
	var gauge = {
		pane: {
			background: null,
			startAngle: -120,
			endAngle: 120
		},
		yAxis: {
			labels: {
				enabled: true,
				style: {
					fontSize: "18",
					fontFamily: oldUIFeature ? "Segoe UI Light" : "Bpmonline Open Sans Light"
				}
			},
			offset: 40,
			minorTickLength: 0,
			minorGridLineWidth: 0,
			lineWidth: 0,
			lineColor: "transparent",
			tickLength: 0,
			gridLineColor: "transparent",
			gridLineWidth: 0,
			tickInterval: 1,
			tickColor: "#666"
		},
		legend: {
			enabled: false,
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	/**
	 * Default funnel settings.
	 * @type {Object}
	 */
	var funnel = {
		chart: {
			marginRight: 120
		},
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					format: "{point.name} ({point.y})",
					style: {
						width: "100%"
					},
					useHTML: Terrasoft.getIsRtlMode()
				},
				neckWidth: "35%",
				neckHeight: "0%",
				width: "70%",
				height: "95%"
			}
		},
		legend: {
			useHTML: Terrasoft.getIsRtlMode()
		},
		tooltip: {
			useHTML: Terrasoft.getIsRtlMode()
		}
	};

	return {
		bar: bar,
		spline: spline,
		pie: pie,
		line: line,
		areaspline: areaspline,
		column: column,
		scatter: scatter,
		gauge: gauge,
		funnel: funnel
	};
});


