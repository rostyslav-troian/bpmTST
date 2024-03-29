﻿define("ChartDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ChartTypeCaption: "Chart type",
		AggregationTypeCaption: "Function",
		DateFormatCaption: "Format",
		SortCaption: "Sort by",
		YAxisPropertiesCaption: "What to display",
		XAxisPropertiesCaption: "How to group",
		SeriesPropertiesCaption: "How to design?",
		EntitySchemaNameCaption: "Object",
		YAxisColumnCaption: "Column",
		FilterCaption: "Filter",
		XAxisColumnCaption: "Grouping field",
		NameCaption: "Name",
		EntitySchemaNamePlaceholder: "From which object take the data?",
		AggregationTypePlaceholder: "How to aggregate data?",
		YAxisColumnPlaceholder: "From which column take the data?",
		XAxisColumnPlaceholder: "Select grouping field",
		DateFormatPlaceHolder: "Specify date format",
		AggregationTypeCountCaption: "Quantity",
		AggregationTypeMaxCaption: "Max value",
		AggregationTypeMinCaption: "Min value",
		AggregationTypeAvgCaption: "Average value",
		AggregationTypeSumCaption: "Valuated amount",
		YAxisCaption: "Y-Axis label of series",
		XAxisCaption: "X-Axis label of series",
		NewChartCaption: "New chart",
		ChartDesignerCaption: "Chart setup",
		DateTimeFormatYear: "Year",
		DateTimeFormatDay: "Day",
		DateTimeFormatDayMonth: "Day \u0026 month",
		DateTimeFormatMonth: "Month",
		DateTimeFormatMonthYear: "Month \u0026 year",
		DateTimeFormatWeek: "Week",
		IsPercentageModeCaption: "Values, %",
		OrderByGroupByField: "By grouping field",
		OrderByChartEntityColumn: "By resulting data",
		OrderDirectionASC: "Ascending",
		OrderDirectionDESC: "Descending",
		OrderDirectionCaption: "Sorting order",
		FilterPropertiesCaption: "How to filter",
		ShowPropertiesCaption: "How to display",
		YAxisCaption2: "Index number caption",
		StyleLabel: "Style",
		WidgetDesignerCaption: "Chart setup",
		QueryPropertiesLabel: "What to display",
		FilterPropertiesLabel: "How to filter",
		FormatPropertiesLabel: "How to display",
		SectionBindingColumnFormat: "Connect \u0022{0}\u0022 object with \u0022{1}\u0022 section by field",
		SectionBindingGroupCaption: "How to associate with section data",
		OrderPropertiesGroupLabel: "How to sort",
		AddSeriesButtonCaption: "Add series",
		DeleteSeriesButtonCaption: "Delete series",
		SeriesTabCaption: "Series {0}",
		YAxisMinValueLabel: "Min value",
		YAxisMaxValueLabel: "Max value",
		UpdatedXAxisColumns: "You need to specify query grouping field for certain series",
		ChartAxisPositionNone: "Do not display",
		ChartAxisPositionLeft: "Left",
		ChartAxisPositionRight: "Right",
		InvalidSeriesConfig: "Required parameters are not filled in in the \u0022{0}\u0022 series",
		DateTimeFormatDayMonthYear: "Day, month, and year",
		DateTimeFormatHour: "Hour",
		OrderByChartEntityColumnSeries: "By selection result of {0} series",
		YAxisPositionLabel: "Axis side",
		XAxisDefaultCaption: "X-Axis label",
		YAxisDefaultCaption: "Y-Axis label",
		XAxisDefaultCaptionTip: "If this field is empty label for the X-axis will be set from the value for the first series",
		YAxisDefaultCaptionTip: "If this field is empty label for the Y-axis will be set from the value for the first series",
		UseEmptyValueCaption: "Use empty value",
		UnsupportedTypesMessage: "Incompatible chart types"
	};
	var localizableImages = {
		Settings: {
			source: 3,
			params: {
				schemaName: "ChartDesigner",
				resourceItemName: "Settings",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});