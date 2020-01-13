define("LeadQualificationPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		LeadQualificationPageCaption: "Lead qualification",
		AddressCaption: "Address",
		QualifyButtonCaption: "Qualify",
		AssociateWithContactCaption: "Connect to contact",
		AssociateWithAccountCaption: "Connect to account",
		ShouldCreateOpportunityCaption: "Create opportunity",
		AssignOneOfTheFoundCaption: "Connect to one of the following",
		CreateNewCaption: "Create new",
		AssignExistingCaption: "Associate with",
		LeadNameCaption: "Contact name",
		NoAssociateWarning: "Qualification requires that the lead is connected to an account or contact",
		ShowMoreButtonCaption: "Show more",
		ContactNameColumnCaption: "Contact name",
		AccountNameColumnCaption: "Account name",
		AccountColumnCaption: "Account",
		EMailColumnCaption: "Email",
		PhoneColumnCaption: "Primary phone",
		CityColumnCaption: "City",
		NoContactWarning: "Contact not selected for qualification",
		NoAccountWarning: "Account not selected for qualification",
		ContactCreatedMessage: "Created contact {0}",
		AccountCreatedMessage: "Created account {0}"
	};
	var localizableImages = {
		ShowMoreIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "ShowMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
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