Terrasoft.configuration.Structures["DashboardEnums"] = {innerHierarchyStack: ["DashboardEnums"]};
define("DashboardEnums", ["DashboardEnumsResources"], function(resources) {

	Ext.ns("Terrasoft.DashboardEnums");

	Terrasoft.DashboardEnums.WidgetType = {
		"Chart": {
			"view": {
				"moduleName": "ChartModule",
				"configurationMessage": "GetChartConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "ChartDesigner"
					}
				}
			}
		},
		"Indicator": {
			"view": {
				"moduleName": "IndicatorModule",
				"configurationMessage": "GetIndicatorConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "IndicatorDesigner"
					}
				}
			}
		},
		"Gauge": {
			"view": {
				"moduleName": "GaugeModule",
				"configurationMessage": "GetGaugeConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "GaugeDesigner"
					}
				}
			}
		},
		"DashboardGrid": {
			"view": {
				"moduleName": "DashboardGridModule",
				"configurationMessage": "GetDashboardGridConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "DashboardGridDesigner"
					}
				}
			}
		},
		"Module": {
			"view": {},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "ModuleConfigEdit"
					}
				}
			}
		},
		"WebPage": {
			"view": {
				"moduleName": "WebPageModule",
				"configurationMessage": "GetWebPageConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "WebPageDesigner"
					}
				}
			}
		}
	};

	if (Terrasoft.Features.getIsEnabled("FullPipeline")) {
		Terrasoft.DashboardEnums.WidgetType.FullPipeline = {
			"view": {
				"moduleName": "FullPipelineModule",
				"configurationMessage": "GetChartConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "FullPipelineDesigner"
					}
				}
			}
		};
	}

	/** @enum
	 *  Pipeline slice types enumeration. */
	Terrasoft.DashboardEnums.PipelineSliceType = {
		/** Pipeline by count */
		BY_COUNT: 0,
		/** To first stage pipeline conversion */
		TO_FIRST_STAGE: 1,
		/** Stages pipeline conversion */
		STAGE_CONVERSION: 2
	};

	/** @enum
	 *  ############ ####### ############# # ###### ######## */
	Terrasoft.DashboardEnums.ChartDisplayMode = {
		/** ##### ####### */
		CHART: 0,
		/** ##### ###### */
		GRID: 1
	};

	/** @enum
	 *  ############ ####### ########### ####### ### #######
	 **/
	Terrasoft.DashboardEnums.ChartAxisPosition = {
		/** ## ########## */
		NONE: 0,
		/** ##### */
		LEFT: 1,
		/** ###### */
		RIGHT: 2
	};

	/** @enum
	 *  Chart sort types enum
	 **/
	Terrasoft.DashboardEnums.ChartOrderBy = {
		/** By group field */
		GROUP_BY_FIELD: "GroupByField",
		/** By selection result */
		CHART_ENTITY_COLUMN: "ChartEntityColumn",
		/*By custom column*/
		CUSTOM_COLUMN: "CustomColumn"
	};

	/** @enum
	 *  ############ ########### ######### #######
	 **/
	Terrasoft.DashboardEnums.ChartOrderDirection = {
		/** ## ########### */
		ASCENDING: "Ascending",
		/** ## ######## */
		DESCENDING: "Descending"
	};

	/** @enum
	 * ##### ###### ########.
	 */
	Terrasoft.DashboardEnums.WidgetColorSet = [
	/** 0: ####### */
		"#03a9f4",
	/** 1: ####### */
		"#20c964",
	/** 2: ######### */
		"#ffc107",
	/** 3: ######### */
		"#ff9800",
	/** 4: ########## */
		"#ff7043",
	/** 5: ########## */
		"#9575cd",
	/** 6: ##### */
		"#0091ea",
	/** 7: ######### */
		"#00bfa5",
	/** 8: #####-######### */
		"#009688"
	];

	/** @enum
	 * ###### ########### ###### # ###### #####.
	 */
	Terrasoft.DashboardEnums.StyleColors = {
		/** ####### */
		"widget-green": Terrasoft.DashboardEnums.WidgetColorSet[1],
		/** ######### */
		"widget-mustard": Terrasoft.DashboardEnums.WidgetColorSet[2],
		/** ######### */
		"widget-orange": Terrasoft.DashboardEnums.WidgetColorSet[3],
		/** ########## */
		"widget-coral": Terrasoft.DashboardEnums.WidgetColorSet[4],
		/** ########## */
		"widget-violet": Terrasoft.DashboardEnums.WidgetColorSet[5],
		/** ##### */
		"widget-navy": Terrasoft.DashboardEnums.WidgetColorSet[6],
		/** ####### */
		"widget-blue": Terrasoft.DashboardEnums.WidgetColorSet[0],
		/** ######### */
		"widget-turquoise": Terrasoft.DashboardEnums.WidgetColorSet[7],
		/** #####-######### */
		"widget-dark-turquoise": Terrasoft.DashboardEnums.WidgetColorSet[8]
	};

	/** @enum
	 * ############ ###### ######## ###### # ## ########### # #############.
	 */
	Terrasoft.DashboardEnums.WidgetColor = {
		/** ####### */
		"widget-green": {
			value: "widget-green",
			displayValue: resources.localizableStrings.StyleGreen,
			imageConfig: resources.localizableImages.ImageGreen
		},
		/** ######### */
		"widget-mustard": {
			value: "widget-mustard",
			displayValue: resources.localizableStrings.StyleMustard,
			imageConfig: resources.localizableImages.ImageMustard
		},
		/** ######### */
		"widget-orange": {
			value: "widget-orange",
			displayValue: resources.localizableStrings.StyleOrange,
			imageConfig: resources.localizableImages.ImageOrange
		},
		/** ########## */
		"widget-coral": {
			value: "widget-coral",
			displayValue: resources.localizableStrings.StyleCoral,
			imageConfig: resources.localizableImages.ImageCoral
		},
		/** ########## */
		"widget-violet": {
			value: "widget-violet",
			displayValue: resources.localizableStrings.StyleViolet,
			imageConfig: resources.localizableImages.ImageViolet
		},
		/** ##### */
		"widget-navy": {
			value: "widget-navy",
			displayValue: resources.localizableStrings.StyleNavy,
			imageConfig: resources.localizableImages.ImageNavy
		},
		/** ####### */
		"widget-blue": {
			value: "widget-blue",
			displayValue: resources.localizableStrings.StyleBlue,
			imageConfig: resources.localizableImages.ImageBlue
		},
		/** #####-######### */
		"widget-dark-turquoise": {
			value: "widget-dark-turquoise",
			displayValue: resources.localizableStrings.StyleDarkTurquoise,
			imageConfig: resources.localizableImages.ImageDarkTurquoise
		},
		/** ######### */
		"widget-turquoise": {
			value: "widget-turquoise",
			displayValue: resources.localizableStrings.StyleTurquoise,
			imageConfig: resources.localizableImages.ImageTurquoise
		}
	};
});


