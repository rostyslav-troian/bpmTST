define("ApprovalDashboardItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApproveButtonCaption: "\u0423\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		RejectButtonCaption: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C",
		ChangeApproverButtonCaption: "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0435\u0433\u043E",
		DefaultCaption: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435"
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