Terrasoft.configuration.Structures["SetupTrackingViewConfigV2"] = {innerHierarchyStack: ["SetupTrackingViewConfigV2"]};
define("SetupTrackingViewConfigV2", ["SetupTrackingViewConfigV2Resources", "MultilineLabel", "css!MultilineLabel",
		"css!SetupTrackingViewConfigV2"],
	function(resources) {
		Ext.define("Terrasoft.configuration.SetupTrackingViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.SetupTrackingViewConfig",
			viewModelClass: null,

			/**
			 * Returns the view configuration of the module.
			 * @returns {Object} The view configuration of the module.
			 */
			generate: function() {
				return [
					{
						"name": "ModuleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {wrapClassName: ["setuptracking-merge-container"]},
						"items": [
							{
								"name": "HeaderContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["header"],
								"items": [
									{
										"name": "HeaderLabel",
										"itemType": Terrasoft.ViewItemType.LABEL,
										"classes": {"labelClass": ["header-label"]},
										"caption": resources.localizableStrings.SetupTrackingModuleCaption
									},
									{
										"name": "CloseButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
										"imageConfig": resources.localizableImages.CloseIcon,
										"classes": {"wrapperClass": ["close-btn"]},
										"click": {"bindTo": "onCancelButtonClick"}
									},
									{
										"name": "DescriptionLabel",
										"itemType": Terrasoft.ViewItemType.LABEL,
										"className": "Terrasoft.MultilineLabel",
										"contentVisible": true,
										"classes": {"labelClass": ["description-label"]},
										"caption": resources.localizableStrings.SetupTrackingLabelCaption
									}
								]
							},
							{
								"name": "ContentContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["content"],
								"items": [
									{
										"name": "LabelContainer",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"wrapClass": ["label-wrap"],
										"items": [
											{
												"name": "ApiKeyLabel",
												"itemType": Terrasoft.ViewItemType.LABEL,
												"className": "Terrasoft.Label",
												"caption": resources.localizableStrings.ApiKeyCaption
											}
										]
									},
									{
										"name": "ControlContainer",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"wrapClass": ["control-wrap"],
										"items": [
											{
												"name": "ApiKeyEdit",
												"dataValueType": Terrasoft.DataValueType.TEXT,
												"className": "Terrasoft.TextEdit",
												"labelConfig": {
													"visible": false
												},
												"value": {
													"bindTo": "ApiKey"
												}
											}
										]
									}
								]
							},
							{
								"name": "FooterContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["footer"],
								"items": [
									{
										"name": "CancelButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
										"caption": resources.localizableStrings.CancelButtonCaption,
										"click": {"bindTo": "onCancelButtonClick"}
									},
									{
										"name": "StartButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": Terrasoft.controls.ButtonEnums.style.GREEN,
										"caption": resources.localizableStrings.StartButtonCaption,
										"click": {"bindTo": "onStartButtonClick"}
									}
								]
							}
						]
					}
				];
			}
		});
	});


