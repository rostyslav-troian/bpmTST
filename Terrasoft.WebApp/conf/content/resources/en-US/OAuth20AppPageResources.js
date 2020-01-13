define("OAuth20AppPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TagButtonHint: "Tags",
		TabControlScrollLeftHint: "Scroll left",
		TabControlScrollRightHint: "Scroll right",
		FieldsGroupCollapseButtonHint: "Collapse\/expand",
		FieldLockHint: "Non-editable field",
		ClearButtonHint: "Clear value",
		PageHeaderTemplate: "{0} \/ {1}",
		OpenNewSectionDesignerButtonCaption: "Open new page designer",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		ColumnFilterInvalidFormatException: "Filtering by the {0} column is configured incorrectly",
		RequiredFieldIsEmptyCaption: "Fill in the required {0} field to save the record",
		NewRecordPageCaptionSuffix: ": New record",
		IncrementNumberSuffix: "LastNumber",
		IncrementMaskSuffix: "CodeMask",
		DelayExecutionButtonCaption: "Perform later",
		ProcessEntryPointButtonCaption: "Move down the process",
		CloseButtonCaption: "Close",
		ViewOptionsButtonCaption: "View",
		OpenSectionDesignerButtonCaption: "Open page designer",
		FieldValidationError: "Field \u0022{0}\u0022: {1}",
		PrintButtonCaption: "Print",
		OpenListSettingsCaption: "List setup",
		ProsessButtonCaption: "Run process",
		BeginProcessButtonMenuItemCaption: "Start process",
		ContinueProcessButtonMenuItemCaption: "Continue process",
		QuickAddButtonHint: "Add related activity",
		HeaderTipCaption: "Page appearance has been improved in Creatio 7.8",
		HeaderTipContent: "The page field layout has changed. Only the fields that you configured for the previous version are displayed here. For your convenience, you can move these fields to the record profile (on the left) or to the tab array using the Page Designer.",
		HeaderTipDesignerBtnCaption: "Set up now",
		HeaderTipAcademyBtnCaption: "Learn more at the Academy",
		AcademyDesignerUrl: "http:\/\/academy.bpmonline.com\/documents\/docs\/product\/bpm\u0027online%20sales\/enterprise\/7.8.0\/BPMonlineHelp\/chapter_section_wizard\/section_wizard_page_fields_setup.htm#XREF_49522",
		HeaderTipNotShowBtnCaption: "Do not show this message again",
		PageContainsUnsavedChanges: "This page contains unsaved changes. Do you still wish to leave the page?",
		CanCustomizeWarning: "Define {0} attribute instead of overriding function {1} to empty",
		Tabe9ae4951TabLabelTabCaption: "Oauth settings",
		Schema1Detail28a4d31fDetailCaptionOnPage: "Scopes",
		Schema2Detaila82ca02cDetailCaptionOnPage: "Users",
		ClientIdf10c9178a2cf45abb99c16e863fdd780LabelCaption: "Client ID",
		SecretKey4853fd5d43cc4fc39f51b5303d2f481aLabelCaption: "Client secret",
		CannotReadClientSecret: "Error loading Client Secret",
		Tabe9ae4951TabLabelGroup9c0d9295GroupCaption: "",
		ClientIdfd8147359bc641c2b33fb403d4f60656LabelCaption: "Client ID",
		SecretKey75a66b3121af46e28c55818e6d8c5054LabelCaption: "Client secret",
		UsersTabCaption: "Users",
		UseSharedUserCaption: "Use shared user",
		RedirectUrlInfoLabelLabelCaption: "",
		UseSharedUserTip: "All API requests will be executed on behalf of sigle external application user.",
		ClientIdTip: "Also known as \u0022Application ID\u0022 or \u0022Consumer ID\u0022, or \u0022Public key\u0022.",
		SecretKeyTip: "Also known as \u0022Application secret\u0022 or \u0022Consumer secret\u0022, or \u0022Secret key\u0022.",
		TokenUrlTip: "Often contains ...\/token or ...\/access_token.\nUses auth code, Client ID and secret to return access token.",
		AuthorizeUrlTip: "Often contains ...\/authorize. Goes first in the OAuth 2.0 flow.\nUses Client ID and scopes, and will return authorization code after user grants access.",
		RevokeTokenUrlTip: "Often contains ...\/revoke.\nThis field is optional. Although if empty, there are may be issues if user:\n1. Authorises in this application.\n2. Deletes his token in Creatio.\n3. Authorises in this application again.",
		RedirectUrlHelpLine1: "Request\u00A0will\u00A0contain\u00A0redirect\u00A0URL\u00A0=\u00A0",
		RedirectUrlHelpLine2: "Make sure that it is allowed redirect URL in the settings of your external app",
		TokenUrlPlaceholder: "https:\/\/example.com\/oauth2\/token",
		AuthUrlPlaceholder: "https:\/\/example.com\/oauth2\/authorize",
		RevokeUrlPlaceholder: "https:\/\/example.com\/oauth2\/revoke",
		UsePersonalAccountsCaption: "Use each user\u0027s personal account",
		LoginSharedUserCaption: "Log in",
		LoginCallbackFailed: "Error loading OAuth Authorization service",
		RadioGroupCaption: "Which account to use",
		FaqSettingUpOauthUrlText: "Setting up an OAuth 2.0 application",
		FaqTypicalIssuesUrlText: "Auth application typical issues",
		FaqHeaderText: "Frequently asked questions",
		CredentialsLocationCaption: "Send client credentials in token request",
		CredentialsLocationTip: "Determines how access token and refresh token request will be formed. Usually the right way is specified in the documentation about authentication in external system."
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		InfoImage: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "InfoImage",
				hash: "3b85678707bfb489696f19e09a33acca",
				resourceItemExtension: ".png"
			}
		},
		DefaultAppIcon: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "DefaultAppIcon",
				hash: "74d0bd728776773ffe8aec1eefd77457",
				resourceItemExtension: ".svg"
			}
		},
		FAQIcon: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "FAQIcon",
				hash: "33b69a203f6e15eecb7c3e02b1a77920",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "OAuth20AppPage",
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