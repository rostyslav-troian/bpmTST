define("LeadPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrderCaption: "Order",
		NeedInfoTabCaption: "Customer need details",
		ContactCaption: "Contact name",
		DearCaption: "Recipient\u0027s name",
		GenderCaption: "Gender",
		TitleCaption: "Title",
		JobCaption: "Job title",
		FullJobTitleCaption: "Full job title",
		DepartmentCaption: "Department",
		DecisionRoleCaption: "Role",
		AccountCategoryCaption: "Category",
		IndustryCaption: "Industry",
		EmployeesNumberCaption: "No. of employees",
		AnnualRevenueCaption: "Annual revenue",
		AccountOwnershipCaption: "Business entity",
		EmailCaption: "Email",
		WebsiteCaption: "Web",
		MobilePhoneCaption: "Mobile phone",
		BusinesPhoneCaption: "Business phone",
		FaxCaption: "Fax",
		CountryCaption: "Country",
		AddressCaption: "Address",
		CityCaption: "City",
		AddressTypeCaption: "Address type",
		RegionCaption: "State\/province",
		ZipCaption: "ZIP\/postal code",
		GeneralInfoTabCaption: "Lead info",
		HistoryTabCaption: "History",
		FeedTabCaption: "Feed",
		LeadPageCategorizationBlockCaption: "Segmentation",
		LeadPageCommunicationBlockCaption: "Contact details",
		LeadPageAddressBlockCaption: "Address",
		CreatedContactMessage: " Contact record created: {0}.",
		RequiredFieldsMessage: "Please, fill in either the \u0022Contact\u0022 or \u0022Account\u0022 field",
		DisqualifyLeadActionMessage: "Disqualify this lead?",
		CreatedAccountMessage: "Account record created: {0}.",
		QualifyLeadCaption: "Qualify",
		DisqualifyGroupCaption: "Disqualify",
		DisqualifyLeadLost: "Lost",
		DisqualifyLeadNoConnection: "Unable to connect",
		DisqualifyLeadNotInterested: "No longer interested",
		LeadPageContactInfoCaption: "Contact info",
		LeadPageAccountInfoCaption: "Account info",
		LeadPageGeneralTabContainerCaption: "Lead info",
		QualifiedContactCaption: "Contact",
		QualifiedAccountCaption: "Account",
		AccountNameCaption: "Account name",
		QualifyStatusQualificationCaption: "Qualify",
		QualifyStatusDistributionCaption: "Distribute",
		QualifyStatusTranslationForSaleCaption: "Proceed to handoff",
		LeadPageTransferToSaleInfoCaption: "Handoff to sales",
		LeadPageDistributionInfoCaption: "Lead distribution",
		DisqualificationButtonCaption: "Disqualify",
		SimilarContactsButtonNotFoundHintText: "We didn\u2019t find any contacts that can be linked to this lead.",
		SimilarAccountsButtonNotFoundHintText: "We didn\u2019t find any accounts that can be linked to this lead.",
		SimilarAccountsButtonFoundHintText: "We have found several accounts that can be linked to this lead. Click here to choose one from the list.",
		SimilarContactsButtonFoundHintText: "We have found several contacts that can be linked to this lead. Click here to choose one from the list.",
		LeadEngagementTabCaption: "Lead engagement",
		DealSpecificsTabCaption: "Opportunity info",
		DealInformationCaption: "Opportunity information",
		LeadPageNeedValidationBlockCaption: "Verification required",
		SourceGroupCaption: "Lead engagement",
		CityStrCaption: "City",
		RegionStrCaption: "State\/province",
		CountryStrCaption: "Country",
		LeadPageNeedValidationInfo: "Perhaps, some of the landing page fields were filled in incorrectly.Correct the lead address entry error or add new values to the lookup.",
		OpportunityOrOrderCaption: "Opportunity\/Order",
		DealOwnerCaption: "Deal owner",
		SearchGoogle: "Search in Google",
		SearchContactInLinkedInNotEnoughInfoMessage: "To search on LinkedIn you should fill in at least one of the fields \u0022Contact name\u0022, \u0022Account name\u0022",
		SearchContactInFacebookNotEnoughInfoMessage: "To search on Facebook you should specify Email",
		SearchAccountInGoogleNotEnoughInfoMessage: "To search on Google you should fill in the field \u0022Account name\u0022",
		SearchAccountInLinkedInNotEnoughInfoMessage: "To search on LinkedIn you should fill in the field \u0022Account name\u0022",
		PredictiveScoreNotEvaluatedCaption: "not evaluated",
		PredictiveScoreTip: "Lead conversion probability based on historical patterns and real-time data of the lead. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221863\u0022 \u003EDetails...\u003C\/a\u003E",
		SearchFacebook: "Search in Facebook",
		SearchLinkedIn: "Search in LinkedIn"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "BackButtonImage",
				hash: "96d05bdc934e78ab86fd88b37ba48fe9",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		QualificationProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "QualificationProcessButtonImage",
				hash: "26887aba2ff694652d0458946db6083b",
				resourceItemExtension: ".png"
			}
		},
		SimilarContactsButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "SimilarContactsButtonImage",
				hash: "6144c645b6a5ae888e37b60a53e29efa",
				resourceItemExtension: ".png"
			}
		},
		SimilarAccountsButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "SimilarAccountsButtonImage",
				hash: "09560fa82b1f17523c908f1b7d1d9ec6",
				resourceItemExtension: ".png"
			}
		},
		SearchInternetButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "SearchInternetButtonImage",
				hash: "73096457057ad78a7d6efaec73f116ff",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadPageV2",
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