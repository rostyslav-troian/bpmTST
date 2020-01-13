define("UserPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "General information",
		AuthControlGroupCaption: "Authentication",
		AuthUseForm: "Creatio authentication",
		AuthUseLdap: "LDAP authentication",
		PasswordCaption: "Password",
		PasswordConfirmationCaption: "Password confirmation",
		UserNameCaption: "Username",
		PasswordMissMatchMessageCaption: "Passwords do not match",
		UserPageHeader: "User",
		UserNameNotUnique: "Administration object with this name already exists.",
		AccessRulesTabCaption: "Access rules",
		RolesTabCaption: "Roles",
		SysLicUserTabCaption: "Licenses",
		GrantedRightsTabCaption: "Rights delegation",
		SysLicPackageCaption: "Name",
		ActiveCaption: "Active",
		PasswordMask: "123456789",
		LicAvailableCountCaption: "{0} of {1} available",
		CheckLicensesCaption: "Select all",
		UncheckLicensesCaption: "Clear all",
		DeleteButtonCaption: "Delete",
		DeleteUserMessage: "Are you sure you want to delete this user?",
		DeleteErrorMessage: "Unable to delete the selected user: the user is connected to other objects.",
		PortalUserCaption: "Portal user",
		OurCompanyUserCaption: "Company employee",
		TypeCaption: "Type",
		CreateWebitelUserQuestion: "Create a Webitel for this contact?",
		WebitelUserErrorCreationMessage: "Unable to create Webitel user for the added employee",
		ServerLicAvailableCountCaption: "Issued {0} of unlimited",
		SpecifyPasswordMessage: "Specify the value",
		ChangeUserConnectionTypeMessage: "All user roles will be deleted. Continue changing the type?",
		SessionGroupCaption: "Session settings",
		SessionTimeoutTitle: "User session timeout, min"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "DefaultPhoto",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "ToolsButtonImage",
				hash: "1e35a244fbf576117229fbd866db69ac",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "UserPageV2",
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