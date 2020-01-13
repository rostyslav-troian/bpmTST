define("DashboardBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Dashboards",
		ToolsCaption: "Actions",
		AddButtonCaption: "New",
		EditButtonCaption: "Edit",
		DeleteButtonCaption: "Delete",
		RightsButtonCaption: "Set up access rights",
		DeleteConfirmationMessage: "Are you sure that you want to delete the dashboard panel?",
		NotEnoughRightsMessage: "Insufficient rights to execute this operation",
		NoDashboardsAvailable: "No dashboards available",
		CopyButtonCaption: "Copy",
		SettingsButtonHint: "Actions",
		TabControlScrollLeftHint: "Scroll left",
		TabControlScrollRightHint: "Scroll right",
		ScreenshotButtonCaption: "Screenshot"
	};
	var localizableImages = {
		Settings: {
			source: 3,
			params: {
				schemaName: "DashboardBuilder",
				resourceItemName: "Settings",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});