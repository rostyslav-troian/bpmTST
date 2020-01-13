Terrasoft.configuration.Structures["MacrosMenuItemsMappingUtilities"] = {innerHierarchyStack: ["MacrosMenuItemsMappingUtilities"]};
define("MacrosMenuItemsMappingUtilities", ["MacrosMenuItemsMappingUtilitiesResources", "SysSchemaUIdEnums"],
		function(resources) {
	Ext.define("Terrasoft.configuration.MacrosMenuItemsMappingUtilities", {
		alternateClassName: "Terrasoft.MacrosMenuItemsMappingUtilities",

		/**
		 * Returns system variable macros menu item configuration object.
		 * @param {String} referenceSchemaUId Reference schema UId.
		 * @return {Object} System variable macros menu item configuration object.
		 */
		getSysVariableMacrosMenuItemConfig: function(referenceSchemaUId) {
			var value, displayValue, caption;
			var sysVariableDisplayValues = Terrasoft.Resources.SystemValueCaptions;
			var sysVariableItemsCaptions = resources.localizableStrings;
			var sysSchemaEnums = Terrasoft.SysSchemaUIdEnums.SysVariablesSchemaUIds;
			switch (referenceSchemaUId) {
				case sysSchemaEnums.CONTACT_SCHEMA_UID:
					caption = sysVariableItemsCaptions.CurrentUserContactCaption;
					value = Terrasoft.SystemValueType.CURRENT_USER_CONTACT;
					displayValue = sysVariableDisplayValues.CurrentUserContact;
					break;
				case sysSchemaEnums.ADMIN_UNIT_SCHEMA_UID:
					caption = sysVariableItemsCaptions.CurrentUserCaption;
					value = Terrasoft.SystemValueType.CURRENT_USER;
					displayValue = sysVariableDisplayValues.CurrentUser;
					break;
				case sysSchemaEnums.ACCOUNT_SCHEMA_UID:
					caption = sysVariableItemsCaptions.CurrentUserAccountCaption;
					value = Terrasoft.SystemValueType.CURRENT_USER_ACCOUNT;
					displayValue = sysVariableDisplayValues.CurrentUserAccount;
					break;
				default:
					return null;
			}
			return {
				caption: caption,
				value: value,
				displayValue: displayValue
			};
		},

		/**
		 * Adds macros brackets to mapping edit display value.
		 * @param {String} displayValue Mapping edit display value with macros brackets.
		 */
		addMacrosBrackets: function(displayValue) {
			var consts = Terrasoft.process.constants;
			return consts.LEFT_MACROS_BRACKET + displayValue + consts.RIGHT_MACROS_BRACKET;
		},

		/**
		 * Returns configuration object for Date Time macros menu items.
		 * @param {Terrasoft.ProcessSchemaParameter} elementParameter Process element parameter.
		 * @return {Object} Configuration object.
		 */
		getDateTimeMacrosMenuItemConfig: function(systemValueType) {
			var displayValue, caption;
			var sysVariableDisplayValues = Terrasoft.Resources.SystemValueCaptions;
			var strings = resources.localizableStrings;
			switch (systemValueType) {
				case Terrasoft.SystemValueType.CURRENT_DATE_TIME:
					caption = strings.CurrentTimeAndDateSubMenuItemCaption;
					displayValue = sysVariableDisplayValues.CurrentDateTime;
					break;
				case Terrasoft.SystemValueType.CURRENT_DATE:
					caption = strings.CurrentDateSubMenuItemCaption;
					displayValue = sysVariableDisplayValues.CurrentDate;
					break;
				case Terrasoft.SystemValueType.CURRENT_TIME:
					caption = strings.CurrentTimeSubMenuItemCaption;
					displayValue = sysVariableDisplayValues.CurrentTime;
					break;
				default:
					break;
			}
			var valueMacros = Terrasoft.FormulaMacros.prepareSysVariableValue(systemValueType);
			var displayValueMacros = Terrasoft.FormulaMacros.prepareSysVariableDisplayValue(displayValue);
			return {
				caption: caption,
				value: valueMacros.getBody(),
				displayValue: displayValueMacros.toString()
			};
		}
	});
	return Terrasoft.MacrosMenuItemsMappingUtilities;
});


