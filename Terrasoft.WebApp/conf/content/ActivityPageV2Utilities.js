Terrasoft.configuration.Structures["ActivityPageV2Utilities"] = {innerHierarchyStack: ["ActivityPageV2Utilities"]};
define("ActivityPageV2Utilities", ["terrasoft", "ext-base", "ConfigurationConstants",
		"ActivityPageV2UtilitiesResources", "TooltipUtilities"],
	function(Terrasoft, Ext, ConfigurationConstants, resources) {
		var customDiff = null;

		function generateResultButtonCustomDiff(control) {
			var statusId = control.categoryColor === "red"
				? ConfigurationConstants.Activity.Status.Cancel
				: ConfigurationConstants.Activity.Status.Done;
			return {
				"operation": "insert",
				"name": control.name,
				"parentName": "CustomResultControlBlock",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": control.caption,
					"markerValue": "ActivityResultButton_" + control.caption,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
					"imageConfig": resources.localizableImages[control.color + "ResultIcon"],
					"visible": {
						"bindTo": "Result",
						"bindConfig": {
							"converter": function(result) {
								if (this.get("Result")) {
									return result.value === control.resultId;
								}
								return true;
							}
						}
					},
					"click": {
						"bindTo": "resultButtonClick"
					},
					"tag": {
						"result": {
							"value": control.resultId
						},
						"status": {
							"value": statusId,
							"Finish": true
						}
					}
				}
			};
		}
		return {
			getCustomValues: function () {
				if (this.prcExecData.informationOnStep) {
					return {
						InformationOnStep: this.prcExecData.informationOnStep
					};
				}
				return {};
			},
			getCustomAttributes: function() {
				return {};
			},
			getCustomDiff: function() {
				customDiff = [{
					"operation": "remove",
					"name": "BackButton"
				}];
				if (this.prcExecData.informationOnStep) {
					var informationOnStepButton = {
						"operation": "insert",
						"parentName": "InformationOnStepButtonContainer",
						"propertyName": "items",
						"name": "InformationOnStepButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
							"content": {"bindTo": "InformationOnStep"},
							"tools": []
						}
					};
					customDiff.push(informationOnStepButton);
				}
				if (!this.prcExecData.allowedResults) {
					return customDiff;
				}
				var allowedResults = Ext.decode(this.prcExecData.allowedResults);
				if (!allowedResults || allowedResults.length === 0) {
					return customDiff;
				}
				customDiff.push(
					{
						"operation": "remove",
						"name": "Status"
					},
					{
						"operation": "remove",
						"name": "Result"
					},
					{
						"operation": "remove",
						"name": "DetailedResult"
					},
					{
						"operation": "merge",
						"name": "ShowInScheduler",
						"values": {
							"layout": {"column": 0, "row": 3, "colSpan": 12}
						}
					});
				var neutralCategory = ConfigurationConstants.Activity.ResultCategory.Neutral.toLowerCase();
				var failCategory = ConfigurationConstants.Activity.ResultCategory.Fail.toLowerCase();
				var resultButtonConfig = [];
				Terrasoft.each(allowedResults, function(control) {
					control.color = "green";
					control.category = 0;
					var resultCategory = control.categoryId.toLowerCase();
					if (resultCategory === failCategory) {
						control.color = "red";
						control.category = 2;
					} else if (resultCategory === neutralCategory) {
						control.color = "grey";
						control.category = 1;
					}
					resultButtonConfig.push(control);
				});
				resultButtonConfig.sort(function(a, b) {
					if (a.category < b.category) {
						return -1;
					}
					if (a.category > b.category) {
						return 1;
					}
					if (a.caption < b.caption) {
						return -1;
					}
					if (a.caption > b.caption) {
						return 1;
					}
					return 0;
				});
				var i = 0;
				Terrasoft.each(resultButtonConfig, function(control) {
					control.name = "CustomResultItem" + i;
					customDiff.push(generateResultButtonCustomDiff(control));
					i++;
				});
				customDiff.push(
					{
						"operation": "merge",
						"name": "DetailedResult",
						"values": {
							"layout": {"row": i}
						}
					});
				return customDiff;
			}
		};
	});


