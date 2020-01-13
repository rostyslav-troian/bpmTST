Terrasoft.configuration.Structures["UserQuestionProcessPageV2Utilities"] = {innerHierarchyStack: ["UserQuestionProcessPageV2Utilities"]};
define("UserQuestionProcessPageV2Utilities", ["terrasoft", "UserQuestionProcessPageV2UtilitiesResources"],
	function(Terrasoft) {
		/**
		 * ########## ############### ############# ######### ########## (###### ##############).
		 * @private
		 * @param {Object} executionData ###### ########## ######## ##.
		 * @return {Object} ############### ############# ######### ########## (###### ##############).
		 */
		function getRadioGroupCustomDiff(executionData) {
			var customDiff = [];
			customDiff.push({
				"operation": "insert",
				"parentName": "UserQuestionContentBlock",
				"name": "UserQuestionRadioGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"items": [],
					"value": {
						"bindTo": "radioButtonsGroup"
					},
					"layout": {"column": 0, "row": 0, "colSpan": 12}
				}
			});
			var i = 0;
			var decisionOptions = executionData.decisionOptions;
			Terrasoft.each(decisionOptions, function(decisionOption) {
				customDiff.push({
					"operation": "insert",
					"parentName": "UserQuestionRadioGroup",
					"propertyName": "items",
					"name": "RadioButton" + i,
					"values": {
						"caption": decisionOption.Caption,
						"value": decisionOption.Name,
						"markerValue": decisionOption.Caption
					}
				});
				i++;
			});
			return customDiff;
		}
		/**
		 * ########## ############### ############# ######### ########## (#######).
		 * @private
		 * @param {Object} executionData ###### ########## ######## ##.
		 * @return {Object} ############### ############# ######### ########## (#######).
		 */
		function getCheckBoxesCustomDiff(executionData) {
			var customDiff = [];
			var i = 0;
			var decisionOptions = executionData.decisionOptions;
			Terrasoft.each(decisionOptions, function(decisionOption) {
				customDiff.push({
					"operation": "insert",
					"parentName": "UserQuestionContentBlock",
					"propertyName": "items",
					"name": "UserQuestionCheckBox" + i,
					"values": {
						"bindTo": decisionOption.Name.toString(),
						"caption": decisionOption.Caption,
						"layout": {"column": 0, "row": i, "colSpan": 12}
					}
				});
				i++;
			});
			return customDiff;
		}
		return {
			/**
			 * ########## ###### ############### ######## ######.
			 * @public
			 * @param {Object} executionData ###### ########## ######## ##.
			 * @return {Object} ###### ############### ######## ######.
			 */
			getCustomValues: function(executionData) {
				var decisionOptions = executionData.decisionOptions;
				var decisionMode = executionData.decisionMode;
				var customValues = {
					QuestionText: executionData.questionText,
					isDecisionRequired: executionData.isDecisionRequired,
					radioButtonsGroup: null,
					processElementUId: executionData.procElUId,
					decisionMode: decisionMode,
					decisionOptions: decisionOptions
				};
				if (decisionMode === 0) {
					Terrasoft.each(decisionOptions, function(decisionOption) {
						if (decisionOption.DefChecked === true || decisionOption.DefChecked === "True") {
							customValues.radioButtonsGroup = decisionOption.Name;
						}
					});
				} else {
					Terrasoft.each(decisionOptions, function(decisionOption) {
						customValues[decisionOption.Name.toString()] = decisionOption.DefChecked === true ||
							decisionOption.DefChecked === "True";
					});
				}
				return customValues;
			},
			/**
			 * ########## ###### ############### ########## ######.
			 * @public
			 * @param {Object} executionData ###### ########## ######## ##.
			 * @return {Object} ###### ############### ########## ######.
			 */
			getCustomAttributes: function(executionData) {
				var decisionOptions = executionData.decisionOptions;
				var decisionMode = executionData.decisionMode;
				var customAttributes = {};
				if (decisionMode !== 0) {
					Terrasoft.each(decisionOptions, function(decisionOption) {
						customAttributes[decisionOption.Name.toString()] = {
							dataValueType: Terrasoft.DataValueType.BOOLEAN
						};
					});
				}
				customAttributes.QuestionText = {
					dataValueType: Terrasoft.DataValueType.TEXT
				};
				return customAttributes;
			},
			/**
			 * ########## ############### ############# ######### ########## ########.
			 * @public
			 * @param {Object} executionData ###### ########## ######## ##.
			 * @return {Object} ############### ############# ######### ########## ########.
			 */
			getCustomDiff: function(executionData) {
				return executionData.decisionMode === 0 ?
					getRadioGroupCustomDiff(executionData) : getCheckBoxesCustomDiff(executionData);
			}
		};
	});


