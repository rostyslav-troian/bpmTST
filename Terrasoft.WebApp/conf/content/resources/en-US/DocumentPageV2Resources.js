define("DocumentPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WarningAccountContactRequire: "Please, fill in either the \u0022{0}\u0022 or \u0022{1}\u0022 field",
		NumberExistsQuestion: "Record with same number already exists. Save record with duplicate number?",
		NumberCaption: "Number",
		DateCaption: "Date",
		TypeCaption: "Type",
		OwnerCaption: "Owner",
		GeneralInfoTabCaption: "General information",
		groupCaption: "Group",
		AccountCaption: "Account",
		ContactCaption: "Contact",
		StatusCaption: "Status",
		RemindToOwnerCaption: "Remind",
		HistoryTabCaption: "History",
		NotesFilesTabCaption: "Attachments and notes",
		ConnectionsGroupCaption: "Connected to",
		NumberMustBeUnique: "The entered number is already in use. Please enter another document number.",
		OwnerTip: "Full name of the record owner. Select the owner from the contacts registered as users in the system.",
		ContractTip: "A contract connected to a document. The lookups are filtered by the account specified in the document",
		OpportunityTip: "An opportunity for which the document was prepared. The lookups are filtered by the contact and account specified in the document",
		OrderTip: "An order connected to the document. The lookups are filtered by the account specified in the document",
		ProjectTip: "The project for which the document was prepared. The lookups are filtered by the account specified in the document"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "BackButtonImage",
				hash: "96d05bdc934e78ab86fd88b37ba48fe9",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "DocumentPageV2",
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