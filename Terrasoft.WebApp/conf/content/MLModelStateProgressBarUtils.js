Terrasoft.configuration.Structures["MLModelStateProgressBarUtils"] = {innerHierarchyStack: ["MLModelStateProgressBarUtils"]};
define("MLModelStateProgressBarUtils", ["MLConfigurationConsts", "BaseProgressBarModule", "css!BaseProgressBarModule"],
	function(MLConfigurationConsts) {
		/**
		 * @class Terrasoft.MLModelStateProgressBarUtils
		 * Methods for working with Terrasoft.BaseProgressBar for ML model state field.
		 */
		Ext.define("Terrasoft.MLModelStateProgressBarUtils", {
			extend: "Terrasoft.BaseObject",
			singleton: true,

			/**
			 * Returns value config for Terrasoft.BaseProgressBar.
			 * @param {Object} stateConfig Current MLModelState lookup attribute value.
			 * @return {null|{value: Number, displayValue: String}} Value config for Terrasoft.BaseProgressBar.
			 */
			getStateProgressBarValue: function(stateConfig) {
				if (!stateConfig) {
					return null;
				}
				const state = Terrasoft.findWhere(MLConfigurationConsts.ModelStates, {id: stateConfig.value});
				if (!state) {
					return null;
				}
				return {
					value: state.stageNumber,
					displayValue: stateConfig.displayValue
				};
			}
		});
		return Terrasoft.MLModelStateProgressBarUtils;
	});


