define("AccountPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "Account info",
		ContactsAndStructureTabCaption: "Contacts and structure",
		NotesTabCaption: "Attachments and notes",
		HistoryTabCaption: "History",
		CategoriesGroupCaption: "Segmentation",
		AddPrimaryContact: "Add contact for the created account?",
		SetAccountPrimaryCareer: "Set \u0022{0}\u0022 as the primary employment of the contact \u0022{1}\u0022?",
		ReplacePrimaryCareerWithAccount: "Change current employment of the contact \u0022{1}\u0022 to \u0022{0}\u0022?",
		RelationshipTabCaption: "Connected to",
		CompletenessLabel: "Profile complete",
		OwnerTip: "Full name of the record owner. Select the owner from the contacts registered as users in the system.",
		CompletenessHint: "Percentage of profile completion. Click on the indicator to view which data you need to complete the profile.",
		RelationshipButtonHint_ActivityDetailV2: "Show activities of subordinate accounts",
		RelationshipButtonHint_ContractDetailV2: "Show contracts of subordinate accounts",
		RelationshipButtonHint_DocumentDetailV2: "Show documents of subordinate accounts",
		RelationshipButtonHint_LeadDetailV2: "Show leads of subordinate accounts",
		RelationshipButtonHint_OrderDetailV2: "Show orders of subordinate accounts",
		RelationshipButtonHint_InvoiceDetailV2: "Show invoices of subordinate accounts",
		RelationshipButtonHint_OpportunityDetailV2: "Show opportunities of subordinate accounts",
		CompletenessCaption: "Profile completion",
		RelationshipButtonHint_ProjectDetailV2: "Show projects of subordinate accounts",
		EnrichmentDefaultButtonCaption: "Enrich data",
		EnrichedDefaultButtonCaption: "New data found ({0})",
		RightsErrorMessage: "Insufficient rights to perform this action. Contact your system administrator.",
		EnrichmentDefaultButtonHint: "Search new data for account enrichment",
		EnrichedDefaultButtonHint: "Show new data for account profile enrichment",
		FillAccountWithSocialNetworksDataActionCaption: "Update with social networks data",
		OpenAccountCardQuestion: "At least one social network profile must be specified for the account in order to run this action",
		FillAccountQuestion: "At least one social network profile must be specified for the account in order to run this action."
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		DefaultLogo: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "DefaultLogo",
				hash: "9e87369446a2c6eeb7c62d4126b8024e",
				resourceItemExtension: ".svg"
			}
		},
		EnrichmentDefaultIcon: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "EnrichmentDefaultIcon",
				hash: "a31d4564868caf43ad522e628f6927f7",
				resourceItemExtension: ".svg"
			}
		},
		EnrichedDefaultIcon: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "EnrichedDefaultIcon",
				hash: "2e1dea92810961beafefe8d5b9a706e4",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "AccountPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
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