Terrasoft.configuration.Structures["ApprovalDashboardItemViewConfig"] = {innerHierarchyStack: ["ApprovalDashboardItemViewConfig"]};
define("ApprovalDashboardItemViewConfig", ["BaseDashboardItemViewConfig"], function() {
	Ext.define("Terrasoft.configuration.ApprovalDashboardItemViewConfig", {
		extend: "Terrasoft.BaseDashboardItemViewConfig",
		alternateClassName: "Terrasoft.ApprovalDashboardItemViewConfig",

		/**
		 * @inheritdoc Terrasoft.BaseDashboardItemViewConfig#getActionsViewConfig
		 * @overridden
		 */
		getActionsViewConfig: function() {
			return {
				"name": "Actions",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["dashboard-item-actions on-hover-visible", "approval-dashboard-item-actions"]
				},
				"items": [
					{
						"name": "Approve",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "ApproveButtonCaption"},
						"click": {"bindTo": "onApproveButtonClick"},
						"visible": true,
						"tag": {
							"imageName": "ApproveButtonIcon"
						},
						"imageConfig": {"bindTo": "getButtonImageConfig"},
						"hint": {"bindTo": "ApproveButtonCaption"}
					},
					{
						"name": "Reject",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "RejectButtonCaption"},
						"click": {"bindTo": "onRejectButtonClick"},
						"visible": true,
						"tag": {
							"imageName": "RejectButtonIcon"
						},
						"imageConfig": {"bindTo": "getButtonImageConfig"},
						"hint": {"bindTo": "RejectButtonCaption"}
					},
					{
						"name": "ChangeApprover",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "ChangeApproverButtonCaption"},
						"click": {"bindTo": "onChangeApproverButtonClick"},
						"visible": {"bindTo": "IsAllowedToDelegate"},
						"tag": {
							"imageName": "ChangeApproverButtonIcon"
						},
						"imageConfig": {"bindTo": "getButtonImageConfig"},
						"hint": {"bindTo": "ChangeApproverButtonCaption"}
					}
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseDashboardItemViewConfig#getContainerViewConfig
		 * @overridden
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
						"caption": {"bindTo": "getCaption"},
						"markerValue": {"bindTo": "Caption"},
						"isRequired": {"bindTo": "IsRequired"},
						"classes": {
							"labelClass": ["dashboard-item"]
						},
						"tips": [{
							"content": {"bindTo": "Caption"},
							"markerValue": {"bindTo": "Caption"}
						}]
					}
				]
			};
		}
	});
});


