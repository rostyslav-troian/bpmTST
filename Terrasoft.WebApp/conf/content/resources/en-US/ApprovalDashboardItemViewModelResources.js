define("ApprovalDashboardItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApproveButtonCaption: "Approve",
		RejectButtonCaption: "Reject",
		ChangeApproverButtonCaption: "Change approver",
		DefaultCaption: "Approval required"
	};
	var localizableImages = {
		ApproveButtonIcon: {
			source: 3,
			params: {
				schemaName: "ApprovalDashboardItemViewModel",
				resourceItemName: "ApproveButtonIcon",
				hash: "29b0c82e28239867a4873ade01d25f51",
				resourceItemExtension: ".svg"
			}
		},
		IconImage: {
			source: 3,
			params: {
				schemaName: "ApprovalDashboardItemViewModel",
				resourceItemName: "IconImage",
				hash: "5cf1ab8ab81f5dcc3bde261c89d45273",
				resourceItemExtension: ".svg"
			}
		},
		RejectButtonIcon: {
			source: 3,
			params: {
				schemaName: "ApprovalDashboardItemViewModel",
				resourceItemName: "RejectButtonIcon",
				hash: "7aad762aa0fc721fe39690d24f48e5c7",
				resourceItemExtension: ".svg"
			}
		},
		ChangeApproverButtonIcon: {
			source: 3,
			params: {
				schemaName: "ApprovalDashboardItemViewModel",
				resourceItemName: "ChangeApproverButtonIcon",
				hash: "861d0846e6d31a724d0ba0b9aa7f06a1",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});