define("ExternalAccessMiniPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptySettingsMessage: "Populate the following system settings to provide remote access: {0}",
		InfoLabelCaption: "You are about to grant the Creatio support team access to your application. This will speed up your case resolution and technical maintenance. Please specify your access parameters. \u003Ca target=\u0022_blank\u0022 rel=\u0022noopener noreferrer\u0022 href=\u0022{0}\u0022\u003ERead more...\u003C\/a\u003E",
		IsDataIsolationEnabledTip: "If you select the checkbox, the support specialist will not be able to see your section records.",
		IsSystemOperationsRestrictedTip: "If you select the checkbox, the support specialist will not be able to modify your system configuration, manage users or roles, set up access permissions, change system settings, configure business processes, etc.",
		DueDateCaption: "Access closed (specify date)",
		DueDateTip: "The access to your application will be closed at 11:59 pm of the specified date."
	};
	var localizableImages = {
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "AddButtonImage",
				hash: "c15d635407f524f3bbe4f1810b82d315",
				resourceItemExtension: ".png"
			}
		},
		OpenCurrentEntityPageImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "OpenCurrentEntityPageImage",
				hash: "857178d6a8f045a025f4455df129833c",
				resourceItemExtension: ".svg"
			}
		},
		OpenEditModeImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "OpenEditModeImage",
				hash: "f4851d37a323f17fc7a7036b77314b24",
				resourceItemExtension: ".svg"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "CloseButtonImage",
				hash: "240cebbe345223f2c270c01be7949519",
				resourceItemExtension: ".svg"
			}
		},
		SaveButtonImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "SaveButtonImage",
				hash: "9d83c749eceae73dbe461501d5b8df55",
				resourceItemExtension: ".svg"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "CancelButtonImage",
				hash: "84b6270935b18aa084d202b7f50696b6",
				resourceItemExtension: ".svg"
			}
		},
		ConnectionsImage: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "ConnectionsImage",
				hash: "82a2caf9022ddbf42fc6455f36c3df03",
				resourceItemExtension: ".svg"
			}
		},
		AddConnectionIcon: {
			source: 3,
			params: {
				schemaName: "ExternalAccessMiniPage",
				resourceItemName: "AddConnectionIcon",
				hash: "dd20561c78ee86d5e1c4f3befac5cb48",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});