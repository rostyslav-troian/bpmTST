define("IndicatorDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StyleLabel: "Style",
		FormatLabel: "Format",
		NewIndicator: "New metric",
		FormatTextLabel: "Text",
		FormatDecimalPrecision: "Number of digits after decimal point",
		FormatThousandSeparator: "Thousands separator",
		FormatDecimalSeparator: "Decimal point",
		FormatNumberGroupSizes: "Number of symbols to separately display the places",
		FormatDateTime: "Display time",
		FormatShowOnlyDecimal: "Display fractional part",
		FontStyleDefault: "Default",
		FontStyleBig: "Large",
		FontStyleLabel: "Font size",
		WidgetDesignerCaption: "Metric setup",
		QueryPropertiesLabel: "What to display",
		FilterPropertiesLabel: "How to filter",
		FormatPropertiesLabel: "How to display",
		NewWidget: "New metric",
		FormatTextDescription: "Enter the text accompanying the metric. For example, \u0022{0} items\u0022 or \u0022$ {0}\u0022",
		FormatDecimalPrecisionDescription: "",
		FormatDateTimeDescription: "",
		SectionBindingColumnFormat: "Connect \u0022{0}\u0022 object with \u0022{1}\u0022 section by field",
		SectionBindingGroupCaption: "How to associate with section data"
	};
	var localizableImages = {
		FormatSettings: {
			source: 3,
			params: {
				schemaName: "IndicatorDesigner",
				resourceItemName: "FormatSettings",
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