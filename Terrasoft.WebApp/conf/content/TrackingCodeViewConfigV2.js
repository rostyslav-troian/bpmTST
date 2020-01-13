Terrasoft.configuration.Structures["TrackingCodeViewConfigV2"] = {innerHierarchyStack: ["TrackingCodeViewConfigV2"]};
define("TrackingCodeViewConfigV2", ["TrackingCodeViewConfigV2Resources", "MultilineLabel", "css!MultilineLabel",
		"css!TrackingCodeViewConfigV2"],
	function(resources) {
		Ext.define("Terrasoft.configuration.TrackingCodeViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.TrackingCodeViewConfig",
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
						"classes": {wrapClassName: ["tracking-merge-container"]},
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
										"caption": resources.localizableStrings.TrackingCodeModuleCaption
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
										"caption": resources.localizableStrings.TrackingCodeLabelCaption
									}
								]
							},
							{
								"name": "ContentContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["content"],
								"items": [
									{
										"name": "TrackingCodeLabel",
										"contentType": Terrasoft.ContentType.LONG_TEXT,
										"dataValueType": Terrasoft.DataValueType.TEXT,
										"className": "Terrasoft.MemoEdit",
										"labelConfig": {
											"visible": false
										},
										"value": {
											"bindTo": "TrackingCode"
										},
										"readonly": true,
										"height": "200px"
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
										"caption": resources.localizableStrings.CloseButtonCaption,
										"click": {"bindTo": "onCancelButtonClick"}
									}
								]
							}
						]
					}
				];
			}
		});
	});


