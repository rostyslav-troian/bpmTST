Terrasoft.configuration.Structures["BaseDashboardItemViewConfig"] = {innerHierarchyStack: ["BaseDashboardItemViewConfig"]};
define("BaseDashboardItemViewConfig", ["ImageCustomGeneratorV2", "ViewGeneratorV2", "DcmConstants",
	"ActionsDashboardItemContainer"
], function(ImageCustomGeneratorV2) {
	Ext.define("Terrasoft.configuration.BaseDashboardItemViewConfig", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.BaseDashboardItemViewConfig",
		viewGeneratorClass: "Terrasoft.ViewGenerator",
		Ext: null,

		/**
		 * Creates instance of Terrasoft.ViewGenerator class.
		 * @return {Terrasoft.ViewGenerator} Returns object Terrasoft.ViewGenerator.
		 */
		createViewGenerator: function() {
			var viewGenerator = this.Ext.create(this.viewGeneratorClass, {
				customGenerators: {
					"IconContainer": "ImageCustomGeneratorV2.generateSimpleCustomImage"
				}
			});
			viewGenerator.setGeneratorsByModule("ImageCustomGeneratorV2", ImageCustomGeneratorV2);
			return viewGenerator;
		},

		/**
		 * Returns the view configuration of the module.
		 * @return {Object} The view configuration of the module.
		 */
		generate: function() {
			var viewConfig = this.getViewConfig();
			var viewGenerator = this.createViewGenerator();
			var view = viewGenerator.generateView(viewConfig);
			return view[0];
		},

		/**
		 * Returns config for the view.
		 * @return {Array} Config.
		 */
		getViewConfig: function() {
			return [
				{
					"name": "Item",
					"className": "Terrasoft.ActionsDashboardItemContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [
						this.getContainerViewConfig(),
						this.getFooterViewConfig(),
						this.getActionsViewConfig()
					]
				}
			];
		},

			// region Methods: Protected

		/**
		 * Returns actions config for the view.
		 * @protected
		 * @return {Object} Config.
		 */
		getActionsViewConfig: function() {
			return {
				"name": "Actions",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {wrapClassName: ["dashboard-item-actions on-hover-visible"]},
				"items": [
					{
						"name": "Cancel",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": {"bindTo": "CancelButtonCaption"},
						"click": {"bindTo": "onCancelButtonClick"},
						"classes": {
							"textClass": "dashboard-item-right"
						},
						"visible": {"bindTo": "CancelButtonVisible"}
					},
					{
						"name": "Execute",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "ExecuteButtonCaption"},
						"click": {"bindTo": "onExecuteButtonClick"},
						"classes": {
							"textClass": "dashboard-item-right"
						},
						"visible": {"bindTo": "ExecuteButtonVisible"}
					}
				]
			};
		},

		/**
		 * Returns container config for the view.
		 * @protected
		 * @return {Object} Config.
		 */
		getContainerViewConfig: function() {
			return {
				"name": "Content",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {wrapClassName: ["dashboard-item-content"]},
				"items": [
					{
						"name": "Caption",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Caption"},
						"markerValue": {"bindTo": "Caption"},
						"click": {"bindTo": "onCaptionClick"},
						"isRequired": {"bindTo": "IsRequired"},
						"classes": {
							"labelClass": ["dashboard-item", "dashboard-item-clickable"]
						},
						"tips": [{
							"content": {"bindTo": "Caption"},
							"markerValue": {"bindTo": "Caption"}
						}]
					}
				]
			};
		},

		/**
		 * Returns footer config for the view.
		 * @protected
		 * @return {Object} Config.
		 */
		getFooterViewConfig: function() {
			return {
				"name": "Footer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {wrapClassName: ["dashboard-item-footer"]},
				"items": [
					{
						"name": "Date",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "DateText"}
					},
					{
						"name": "Owner",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Owner"},
						"classes": {
							"labelClass": ["dashboard-footer-item-border-left"]
						}
					},
					{
						"name": "IconContainer",
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["dashboard-item-icon dashboard-item-right on-hover-hidden"]
						},
						"onPhotoChange": Terrasoft.emptyFn,
						"getSrcMethod": "getIconSrc",
						"items": []
					}
				]
			};
		}

		// endregion

	});
});


