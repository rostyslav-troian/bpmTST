define("VisaDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Approvals",
		Approve: "Approve",
		Reject: "Reject",
		ChangeVisaOwner: "Change approver",
		IsCanceled: "Action is not available as the approval is canceled",
		ApproveYet: "Action is not available as the approval is already granted",
		RejectingYet: "Action is not available as the approval has been already rejected",
		EditMenuCaption: "View",
		ShowAllCaption: "Show all approvals",
		ShowActualCaption: "Show active approvals",
		NoRightsToApproveOrReject: "Insufficient access rights to complete this operation.",
		ShowOnlyMyApprovalCaption: "Waiting for my approval"
	};
	var localizableImages = {
		ApproveImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "ApproveImage",
				hash: "68a244ea82056138e87f666fdc56c485",
				resourceItemExtension: ".svg"
			}
		},
		RejectImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "RejectImage",
				hash: "4f5a23412b1a4485e20808acc81a265e",
				resourceItemExtension: ".svg"
			}
		},
		ChangeVizierImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "ChangeVizierImage",
				hash: "df4c37b342bdc9330876e28c1ce214b4",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "OpenRecordChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});