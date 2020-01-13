Terrasoft.configuration.Structures["DashboardFunnelEnums"] = {innerHierarchyStack: ["DashboardFunnelEnums"]};
define("DashboardFunnelEnums", ["DashboardFunnelEnumsResources", "DashboardEnums"],
	function() {

		/** @enum
		 *  ############ ##### ###### - ######## ####### ### ####### ###### */
		Terrasoft.DashboardEnums.WidgetType.OpportunityFunnel = {
			"view": {
				"moduleName": "OpportunityFunnelModuleV2",
				"configurationMessage": "GetChartConfig"
			},
			"design": {
				"moduleName": "ConfigurationModuleV2",
				"configurationMessage": "GetModuleConfig",
				"resultMessage": "PostModuleConfig",
				"stateConfig": {
					"stateObj": {
						"designerSchemaName": "OpportunityFunnelDesigner"
					}
				}
			}
		};

		Ext.ns("Terrasoft.DashboardFunnelEnums");

		/** @enum
		 *  ############ ##### ####### ###### */
		Terrasoft.DashboardFunnelEnums.FunnelType = {
			/** ####### ## ########## ###### */
			BY_NUMBER: 0,
			/** ######### # ###### ###### */
			TO_FIRST_STAGE: 1,
			/** ######### ###### */
			STAGE_CONVERSION: 2
		};
	});



