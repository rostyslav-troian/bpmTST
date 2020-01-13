define("LeadQualificationSearchSimilarPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		QualifyButtonCaption: "Qualify",
		DisqualifyButtonCaption: "Disqualify",
		QualificationPageCaption: "Lead qualification",
		ContactSearchConditionsGroupCaption: "Select contact",
		AccountSearchConditionsGroupCaption: "Select account",
		SearchSimilarTabCaption: "Similar records search",
		ContactDataTabCaption: "Contact info",
		AccountDataTabCaption: "Account info",
		CommunicationsGroupCaption: "Contact details",
		DataGroupCaption: "General information",
		AddressGroupCaption: "Address",
		LeadTabCaption: "Needs",
		ContactLeadDetailCaption: "Contact needs",
		AccountNameRequiredMessage: "Unable to qualify lead: required data not specified for the new account.\n\nSpecify the data on the \u0022Account details\u0022 tab.",
		AccountRequiredMessage: "Unable to qualify the lead because the linked account is not specified.\n\nSearch for an account or select one of the following options: \u0022Create new\u0022 or \u0022Do not link\u0022.",
		QualificationInfoTip: "Qualify the lead if there is even the smallest possibility of cooperation or sale (now or in the future) and hand over the lead to distribution. Save the lead if you want to postpone the qualification. If you disqualify the lead, all communications with it will stop.",
		SimilarContactsCountLabelText: "Contacts found:",
		SimilarAccountsCountLabelText: "Accounts found:",
		SearchContactNameCaption: "Contact name",
		SearchAccountNameCaption: "Account name",
		SearchEmailCaption: "Email",
		SearchPhoneCaption: "Phone",
		SearchWebCaption: "Web",
		AccountRelationshipNew: "Create new",
		AccountRelationshipExist: "Connect to existing",
		AccountRelationshipBreak: "Do not link",
		ContactSearchButton: "Find contacts",
		AccountSearchButton: "Find accounts",
		LeadContactCaption: "Contact",
		LeadAccountCaption: "Account",
		ContactAdressInfoMessage: "The address field group displays the lead\u0027s initial address data specified during the lead registration. After qualification, the corresponding address will be added to the Address detail of the contact.",
		ContactCommunicationsInfoMessage: "The communications options field group displays the lead\u0027s initial communication options or, if they are not specified, the contact\u0027s main communication options. After qualification, the contact\u0027s communication options will be updated.",
		AccountAdressInfoMessage: "The address field group displays the lead\u0027s initial address data specified during the lead registration. After qualification, the corresponding address will be added to the Address detail of the account.",
		AccountCommunicationsInfoMessage: "The communications options field group displays the lead\u0027s initial communication options or, if they are not specified, the account\u0027s main communication options. After qualification, the account\u0027s communication options will be updated."
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationSearchSimilarPageV2",
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