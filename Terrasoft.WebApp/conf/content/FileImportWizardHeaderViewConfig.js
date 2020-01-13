Terrasoft.configuration.Structures["FileImportWizardHeaderViewConfig"] = {innerHierarchyStack: ["FileImportWizardHeaderViewConfig"]};
define("FileImportWizardHeaderViewConfig", ["WizardHeaderModule"], function() {
	Ext.define("Terrasoft.configuration.FileImportWizardHeaderViewConfig", {
		extend: "Terrasoft.WizardHeaderViewConfig",
		alternateClassName: "Terrasoft.FileImportWizardHeaderViewConfig",

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getWizardContainerViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				generateId: false,
				markerValue: {
					bindTo: "getWizardHeaderContainerMakerValue"
				}
			});
			return config;
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getHeaderCaptionContainerViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				generateId: false
			});
			return config;
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getUtilsContainerViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				generateId: false
			});
			return config;
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getUtilsLeftContainerViewConfig: function() {
			return {
				"generateId": false,
				"name": "utilsLeftContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["utils-left"],
				"items": [
					{
						generateId: false,
						itemType: Terrasoft.ViewItemType.BUTTON,
						name: "CloseButton",
						caption: {bindTo: "Resources.Strings.CloseButtonCaption"},
						classes: {
							textClass: ["utils-button"],
							wrapperClass: ["utils-button"]
						},
						click: {bindTo: "closeButtonClick"},
						markerValue: "CloseButton"
					},
					{
						generateId: false,
						itemType: Terrasoft.ViewItemType.BUTTON,
						name: "PreviousStepButton",
						caption: {bindTo: "Resources.Strings.PreviousStepButton"},
						classes: {
							textClass: ["utils-button"],
							wrapperClass: ["utils-button"]
						},
						click: {bindTo: "previousStepButtonClick"},
						markerValue: "PreviousButton"
					},
					{
						generateId: false,
						itemType: Terrasoft.ViewItemType.BUTTON,
						name: "NextStepButton",
						caption: {bindTo: "Resources.Strings.NextStepButtonCaption"},
						classes: {
							textClass: ["utils-button"],
							wrapperClass: ["utils-button"]
						},
						click: {bindTo: "nextStepButtonClick"},
						markerValue: "NextButton"
					}
				]
			};
		},

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getUtilsRightContainerViewConfig: function() {
			return {
				"name": "utilsRightContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["utils-right"],
				"items": []
			};
		}
	});
});


