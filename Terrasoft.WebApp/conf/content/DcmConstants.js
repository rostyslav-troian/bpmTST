Terrasoft.configuration.Structures["DcmConstants"] = {innerHierarchyStack: ["DcmConstants"]};
define("DcmConstants", ["ext-base", "terrasoft", "DcmConstantsResources"], function(Ext, Terrasoft, resources) {
	/**
	 * @class Terrasoft.configuration.DcmConstants
	 * Class DcmConstants contains constants for dcm processes.
	 */
	Ext.define("Terrasoft.configuration.DcmConstants", {
		alternateClassName: "Terrasoft.DcmConstants",
		singleton: true,

		/**
		 * Dcm schema element required type.
		 * @enum
		 */
		ElementRequiredType: {
			NOT_REQUIRED: {
				value: 0,
				displayValue: resources.localizableStrings.NotRequiredTypeCaption
			},
			REQUIRED: {
				value: 1,
				displayValue: resources.localizableStrings.RequiredTypeCaption
			}
		},

		/**
		 * Dcm schema stage transition type.
		 * @enum
		 */
		StageTransitionType: {
			NONE: {
				value: 0,
				displayValue: resources.localizableStrings.NoneStageTransitionTypeCaption
			},
			AFTER_REQUIRED: {
				value: 1,
				displayValue: resources.localizableStrings.AfterRequiredStageTransitionTypeCaption
			},
			AFTER_ALL: {
				value: 2,
				displayValue: resources.localizableStrings.AfterAllStageTransitionTypeCaption
			}
		}
	});

	return Terrasoft.DcmConstants;
});


