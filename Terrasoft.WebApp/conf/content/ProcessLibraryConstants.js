Terrasoft.configuration.Structures["ProcessLibraryConstants"] = {innerHierarchyStack: ["ProcessLibraryConstants"]};
define("ProcessLibraryConstants", ["ProcessLibraryConstantsResources"], function(resources) {
	var FlowElementTypeDefValue = {
		value: "0f6596ba-4263-488b-a217-b31ab26d8920"
	};
	var FlowElementOwnerDefValue = {
		value: "a29a3ba5-4b0d-de11-9a51-005056c00008"
	};
	var FlowElementOwnerEmpty = {
		value: "d0614cbd-034b-4251-8299-c17cfc52f0b8"
	};
	var EndElementStepValue = {
		value: "caf33ce3-fad1-4581-ab17-f40239d6044b",
		displayValue: resources.localizableStrings.EndElementStepCaption
	};
	var GatewayStepValue = {
		value: "a2cee9f0-5c17-4376-94c6-97766db845d0",
		displayValue: resources.localizableStrings.GatewayStepCaption
	};
	var SequenceFlowType = {
		SequenceFlow: 0,
		ConditionalFlow: 1,
		DefaultFlow: 2
	};
	var FlowElementTypeIcons = {
		"0f6596ba-4263-488b-a217-b31ab26d8920": "TaskIcon",
		"170fa525-3d71-4c51-a0eb-b7e3e7c3010e": "CallIcon",
		"6e44433a-714b-4002-9426-a489af9e9aa6": "EmailIcon"
	};
	var VwProcessLib = {
		Type: {
			BusinessProcess: "865f58bd-a06f-4046-bd61-3ccd96ecf498",
			NewBusinessProcess: "70252e65-a458-46e7-ae4c-379262c5db2d"
		},
		BusinessProcessTag: "Business Process"
	};
	return {
		/**
		 * ######## ## ######### ### ####### ### ########
		 * @type {{value: string} ######## Id "######" ## ########### SysProcessUserTask}
		 */
		FlowElementTypeDefValue: FlowElementTypeDefValue,
		/**
		 * ######## ## ######### ### ####### #############
		 * @type {{value: string} ######## Id "### ########## ########" ## ########### SysProcessUserTask}
		 */
		FlowElementOwnerDefValue: FlowElementOwnerDefValue,
		/**
		 * ######## ############, ##### ####### ############# ## #########
		 * @type {{value: string}}
		 */
		FlowElementOwnerEmpty: FlowElementOwnerEmpty,
		/**
		 * ########## ######## #### ########## ########
		 */
		EndElementStepValue: EndElementStepValue,
		/**
		 * ########## ######## #### #####
		 */
		GatewayStepValue: GatewayStepValue,
		/**
		 * ############# ##### #######
		 */
		SequenceFlowType: SequenceFlowType,
		/**
		 * ###### ###### ### ####### ### ########
		 */
		FlowElementTypeIcons: FlowElementTypeIcons,
		/**
		 * ########## ######## ####### ########## #########
		 */
		VwProcessLib: VwProcessLib
	};
});


