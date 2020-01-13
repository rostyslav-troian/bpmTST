define("EmailItemSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ViewModuleUrl: "ViewModule.aspx#",
		RunProcessMenuSeparator: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441",
		Delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		DeleteConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B?",
		DependencyWarningMessage: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u043E\u043D\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u043E\u0431\u044A\u0435\u043A\u0442\u0430\u0445.",
		RightLevelWarningMessage: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u0443 \u0412\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u044D\u0442\u0438\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432.",
		MarkAsProcessed: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C",
		Today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
		ConnectTo: "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043A {0}",
		Yesterday: "\u0412\u0447\u0435\u0440\u0430",
		ReadRightLevelWarningMessage: "\u0423 \u0412\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0447\u0442\u0435\u043D\u0438\u0435 \u044D\u0442\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430.",
		AddRelationColumnCollectionCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439",
		LinkRelationColumnCollectionCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0438\u0441\u044C\u043C\u043E \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C",
		ShowRelatedEmails: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435"
	};
	var localizableImages = {
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "DefaultPhoto",
				hash: "b2f272c14dcf6738d8f57e99db37dcda",
				resourceItemExtension: ".png"
			}
		},
		ActionsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "ActionsButtonImage",
				hash: "8624d21271ed2ce65aeda243033f3670",
				resourceItemExtension: ".png"
			}
		},
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "ApplyButtonImage",
				hash: "990c2489baa1946eb4c3f44b827803df",
				resourceItemExtension: ".png"
			}
		},
		AccountDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "AccountDefaultIcon",
				hash: "f3b9bd028ea7ea58df9e35edbad652a1",
				resourceItemExtension: ".png"
			}
		},
		ContactDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "ContactDefaultIcon",
				hash: "105dddb6ec1558d80507602dd3597953",
				resourceItemExtension: ".png"
			}
		},
		OpportunityDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "OpportunityDefaultIcon",
				hash: "486223dd415376bf19b03b4c5d24d8bd",
				resourceItemExtension: ".png"
			}
		},
		DocumentDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "DocumentDefaultIcon",
				hash: "8a3d81611b1f3b03dfa39267b33cf2d9",
				resourceItemExtension: ".png"
			}
		},
		LeadDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "LeadDefaultIcon",
				hash: "8048115ad25fa00af78dc09b2522c3a7",
				resourceItemExtension: ".png"
			}
		},
		OrderDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "OrderDefaultIcon",
				hash: "8189da2f8ff43c62269f35838588aa0d",
				resourceItemExtension: ".png"
			}
		},
		ContractDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "ContractDefaultIcon"
			}
		},
		ActivityConnectionDefaultIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "ActivityConnectionDefaultIcon",
				hash: "e954e564c84b3e8dd4eacb7ca500ea9d",
				resourceItemExtension: ".png"
			}
		},
		RelationsImage: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "RelationsImage",
				hash: "3cd2e39c03c3eed8573af20616a74e49",
				resourceItemExtension: ".png"
			}
		},
		DeleteEmailButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "DeleteEmailButtonImage",
				hash: "d7a5d23a1e59fcebb40ae9fdb1b06f31",
				resourceItemExtension: ".png"
			}
		},
		ContactEnrichmentIcon: {
			source: 3,
			params: {
				schemaName: "EmailItemSchema",
				resourceItemName: "ContactEnrichmentIcon",
				hash: "588f9021245791159b6a98d86790d502",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});