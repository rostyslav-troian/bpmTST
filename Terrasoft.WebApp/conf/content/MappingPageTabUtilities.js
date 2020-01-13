Terrasoft.configuration.Structures["MappingPageTabUtilities"] = {innerHierarchyStack: ["MappingPageTabUtilities"]};
define("MappingPageTabUtilities", ["MappingPageTabUtilitiesResources", "MappingEnums"], function(resources) {

	var TabUtilitiesClass = Ext.define("Terrasoft.configuration.mixins.MappingPageTabUtilities", {
		alternateClassName: "Terrasoft.MappingPageTabUtilities",

		/**
		 * Returns a list of tabs.
		 * @protected
		 * @param {Terrasoft.MappingEnums.MappingType|number} requiredTabs Bitwise mask of tabs to open.
		 * @return {Array} A list of tabs.
		 */
		getTabs: function(requiredTabs) {
			var allTabsConfig = this.getAllTabsConfig();
			if (requiredTabs === Terrasoft.MappingEnums.MappingType.ALL) {
				return Ext.Object.getValues(allTabsConfig);
			} else {
				return this.getSpecificTabs(allTabsConfig, requiredTabs);
			}
		},

		/**
		 * Iterates tabs object's properties to pick desired tabs.
		 * @private
		 * @param {Object} allTabsConfig Tabs configuration object.
		 * @param {Terrasoft.MappingEnums.MappingType|number} requiredTabs Bitwise value of tabs to return.
		 * @return {Array}
		 */
		getSpecificTabs: function(allTabsConfig, requiredTabs) {
			var tabs = [];
			Terrasoft.each(Terrasoft.MappingEnums.MappingType, function(mappingType) {
				if (this.shouldIncludeTab(mappingType, requiredTabs)) {
					tabs.push(allTabsConfig[mappingType]);
				}
			}, this);
			return tabs;
		},

		/**
		 * Determines whether the tab should be returned.
		 * @private
		 * @param {Terrasoft.MappingEnums.MappingType|number} mappingType Current tab value.
		 * @param {Terrasoft.MappingEnums.MappingType|number} requiredTabs Required tabs value.
		 * @return {boolean}
		 */
		shouldIncludeTab: function(mappingType, requiredTabs) {
			var isNotAllTabs = mappingType !== Terrasoft.MappingEnums.MappingType.ALL;
			var isValueIncluded = (requiredTabs & mappingType) === mappingType;
			return isNotAllTabs && isValueIncluded;
		},

		/**
		 * Returns configuration object for all tabs.
		 * @protected
		 * @return {Object}
		 */
		getAllTabsConfig: function() {
			var strings = resources.localizableStrings;
			var config = {};
			config[Terrasoft.MappingEnums.MappingType.DATE_TIME] = {
				Name: "TabDateTimeMapping",
				Caption: strings.TabDateTimeMappingCaption,
				ModuleName: "ProcessDateTimeMappingModule"
			};
			config[Terrasoft.MappingEnums.MappingType.PROCESS_ELEMENT_PARAMETERS] = {
				Name: "TabElementsMapping",
				Caption: strings.TabElementsMappingCaption,
				ModuleName: "ProcessElementParametersMappingModule"
			};
			config[Terrasoft.MappingEnums.MappingType.PROCESS_PARAMETERS] = {
				Name: "TabParametersMapping",
				Caption: strings.TabParametersMappingCaption,
				ModuleName: "ProcessParametersMappingModule"
			};
			config[Terrasoft.MappingEnums.MappingType.LOOKUP] = {
				Name: "TabValueMapping",
				Caption: strings.TabValueMappingCaption,
				ModuleName: "ProcessLookupMappingModule",
				LookupInfoConfigMethod: "getConfigValueMapping"
			};
			config[Terrasoft.MappingEnums.MappingType.SYSTEM_SETTINGS] = {
				Name: "TabSysSettingsMapping",
				Caption: strings.TabSysSettingsMappingCaption,
				ModuleName: "ProcessLookupMappingModule",
				LookupInfoConfigMethod: "getConfigSysSettingsMapping"
			};
			config[Terrasoft.MappingEnums.MappingType.SYSTEM_VARIABLES] = {
				Name: "TabSystemVariablesMapping",
				Caption: strings.TabSystemVariablesMappingCaption,
				ModuleName: "ProcessSystemVariablesMappingModule"
			};
			config[Terrasoft.MappingEnums.MappingType.FUNCTIONS] = {
				Name: "TabFunctionsMapping",
				Caption: strings.TabFunctionsMappingCaption,
				ModuleName: "ProcessFunctionsMappingModule"
			};
			return config;
		}
	});
	return Ext.create(TabUtilitiesClass);

});


