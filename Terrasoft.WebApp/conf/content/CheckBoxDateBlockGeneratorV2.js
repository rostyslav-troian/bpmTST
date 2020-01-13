Terrasoft.configuration.Structures["CheckBoxDateBlockGeneratorV2"] = {innerHierarchyStack: ["CheckBoxDateBlockGeneratorV2"]};
define("CheckBoxDateBlockGeneratorV2", ["css!CheckBoxDateBlockGeneratorV2"], function() {
	/**
	 * ########## ####### ##########
	 * @param {Object} controlConfig ############ ######## ##########
	 * @param {String} controlConfig.name ######## ######## ##########
	 * @param {Object} controlConfig.checkBoxCaption ######## # ########## ########
	 * @param {Object} controlConfig.enabledValue ######## # ######## ######## "#######"
	 * @param {String} controlConfig.checkBoxFocus ######## ####### ###### ## ########
	 * @param {Object} controlConfig.dateTimeValue ######## # ######## #### "####/#####"
	 * @param {String} controlConfig.dateFocus ######## ####### ###### ## ######## "####"
	 * @param {String} controlConfig.timeFocus ######## ####### ###### ## ######## "#####"
	 * @return {className: string, id: string, classes: {wrapClassName: string[]}, selectors: {wrapEl: string}, items* []}
	 * ########## ######## checkbox # datetime # ##### ##########
	 */
	function generateCheckBoxDateBlock(controlConfig) {
				var containerId = controlConfig.name + "CheckBoxDateBlock";
				var dateTimeСontainerId = controlConfig.name + "DateTimeContainer";
				var checkBoxId = controlConfig.name + "CheckBox";
				return {
					className: "Terrasoft.Container",
					id: containerId,
					classes: {wrapClassName: ["dateTimeContainerBlock", "control-width-15"]},
					selectors: {wrapEl: "#" + containerId},
					items: [{
						className: "Terrasoft.Label",
						classes: {labelClass: ["labelElement"]},
						caption: controlConfig.checkBoxCaption,
						inputId: checkBoxId + "-el"
					}, {
						className: "Terrasoft.CheckBoxEdit",
						id: checkBoxId,
						classes: {wrapClassName: ["checkBoxContainer"]},
						checked: controlConfig.enabledValue,
						focus: {bindTo: controlConfig.checkBoxFocus},
						markerValue: controlConfig.name
					}, {
						className: "Terrasoft.Container",
						id: dateTimeСontainerId,
						selectors: {wrapEl: "#" + dateTimeСontainerId},
						classes: {wrapClassName: ["dateTimeContainer"]},
						visible: controlConfig.enabledValue,
						items: [{
							className: "Terrasoft.DateEdit",
							id: controlConfig.name + "DateEdit",
							value: controlConfig.dateTimeValue,
							focus: {bindTo: controlConfig.dateFocus},
							markerValue: controlConfig.name,
							classes: {
								wrapClass: ["datetime-datecontrol"]
							}
						}, {
							className: "Terrasoft.TimeEdit",
							id: controlConfig.name + "TimeEdit",
							value: controlConfig.dateTimeValue,
							focus: {bindTo: controlConfig.timeFocus},
							markerValue: controlConfig.name,
							classes: {
								wrapClass: ["datetime-timecontrol"]
							}
						}]
					}]
				};
			}
	return {
		generateCheckBoxDateBlock: generateCheckBoxDateBlock
	};
});


