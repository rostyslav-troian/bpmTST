define("EmailItemSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ViewModuleUrl: "ViewModule.aspx#",
		RunProcessMenuSeparator: "Run process",
		Delete: "Delete",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected items?",
		DependencyWarningMessage: "Selected items cannot be deleted because they are used in other objects.",
		RightLevelWarningMessage: "You do not have permission to delete these items.",
		MarkAsProcessed: "Mark as processed",
		Today: "Today",
		ConnectTo: "Connect to {0}",
		Yesterday: "Yesterday",
		ReadRightLevelWarningMessage: "You do not have permissions to read this contact.",
		AddRelationColumnCollectionCaption: "Add new",
		LinkRelationColumnCollectionCaption: "Link email to",
		ShowRelatedEmails: "Show related"
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
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
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