Terrasoft.configuration.Structures["MobileDashboardEnums"] = {innerHierarchyStack: ["MobileDashboardEnums"]};
Ext.ns("Terrasoft.configuration.consts");

Terrasoft.configuration.consts.DashboardRequestsGroupId = "dashboards";

Ext.ns("Terrasoft.configuration.enums");

/**
 * @enum
 * Dashboard item class names.
 */
Terrasoft.configuration.enums.DashboardItemClassName = {
	Indicator: "Terrasoft.IndicatorDashboardItem",
	Grid: "Terrasoft.GridDashboardItem",
	Chart: "Terrasoft.ChartDashboardItem"
};

Terrasoft.DashboardItemClassName = Terrasoft.configuration.enums.DashboardItemClassName;

/**
 * @enum
 * Dashboard item widget types.
 */
Terrasoft.configuration.enums.DashboardItemWidgetType = {
	Indicator: "Indicator",
	Chart: "Chart",
	DashboardGrid: "DashboardGrid",
	Gauge: "Gauge"
};

Terrasoft.DashboardItemWidgetType = Terrasoft.configuration.enums.DashboardItemWidgetType;

/**
 * @enum
 * Dashboard container items status.
 */
Terrasoft.configuration.enums.DashboardContainerItemsStatus = {
	NotLoaded: "notloaded",
	Loading: "loading",
	Loaded: "loaded"
};

Terrasoft.DashboardContainerItemsStatus = Terrasoft.configuration.enums.DashboardContainerItemsStatus;

/**
 * @enum
 * Dashboard style colors.
 */
Terrasoft.configuration.enums.DashboardStyleColor = {
	"widget-blue": "#03a9f4",
	"widget-green": "#20c964",
	"widget-mustard": "#ffc107",
	"widget-violet": "#9575cd",
	"widget-dark-turquoise": "#009688",
	"widget-orange": "#ff9800",
	"widget-turquoise": "#00bfa5",
	"widget-navy": "#0091ea",
	"widget-coral": "#ff7043"
};

Terrasoft.DashboardStyleColor = Terrasoft.configuration.enums.DashboardStyleColor;

/**
 * @enum
 * Dashboard gauge colors.
 */
Terrasoft.configuration.enums.DashboardGaugeScaleColor = {
	min: "#ff7143",
	middle: "#fd9704",
	max: "#0fdc63"
};

Terrasoft.DashboardGaugeScaleColor = Terrasoft.configuration.enums.DashboardGaugeScaleColor;

/**
 * @enum
 * Dashboard styles.
 */
Terrasoft.configuration.enums.DashboardStyle = {
	Blue: "widget-blue",
	Green: "widget-green",
	Mustard: "widget-mustard",
	Violet: "widget-violet",
	DarkTurquoise: "widget-dark-turquoise",
	Orange: "widget-orange",
	Turquoise: "widget-turquoise",
	Navy: "widget-navy",
	Coral: "widget-coral"
};

Terrasoft.DashboardStyle = Terrasoft.configuration.enums.DashboardStyle;

/**
 * @enum
 * Dashboard datetime format types.
 */
Terrasoft.configuration.enums.DashboardDateTimeFormatType = {
	Year: "Year",
	MonthYear: "Month;Year",
	Month: "Month",
	Week: "Week",
	DayMonthYear: "Day;Month;Year",
	DayMonth: "Day;Month",
	Day: "Day",
	Hour: "Hour"
};

Terrasoft.DashboardDateTimeFormatType = Terrasoft.configuration.enums.DashboardDateTimeFormatType;

/**
 * @enum
 * Dashboard data sort types.
 */
Terrasoft.configuration.enums.DashboardOrderBy = {
	GroupByField: "GroupByField",
	ChartEntityColumn: "ChartEntityColumn"
};

Terrasoft.DashboardOrderBy = Terrasoft.configuration.enums.DashboardOrderBy;

/**
 * @enum
 * Dashboard data order directions.
 */
Terrasoft.configuration.enums.DashboardOrderDirection = {
	Ascending: "Ascending",
	Descending: "Descending"
};

Terrasoft.DashboardOrderDirection = Terrasoft.configuration.enums.DashboardOrderDirection;

Terrasoft.configuration.consts.DefaultDashboardStyle = Terrasoft.DefaultDashboardStyle = Terrasoft.DashboardStyle.Blue;


