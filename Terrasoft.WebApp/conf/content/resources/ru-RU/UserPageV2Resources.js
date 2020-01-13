define("UserPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		AuthControlGroupCaption: "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F",
		AuthUseForm: "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430\u043C\u0438 Creatio",
		AuthUseLdap: "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430\u043C\u0438 LDAP",
		PasswordCaption: "\u041F\u0430\u0440\u043E\u043B\u044C",
		PasswordConfirmationCaption: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F",
		UserNameCaption: "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
		PasswordMissMatchMessageCaption: "\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442",
		UserPageHeader: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
		UserNameNotUnique: "\u041E\u0431\u044A\u0435\u043A\u0442 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",
		AccessRulesTabCaption: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430",
		RolesTabCaption: "\u0420\u043E\u043B\u0438",
		SysLicUserTabCaption: "\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u0438",
		GrantedRightsTabCaption: "\u0414\u0435\u043B\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0430\u0432",
		SysLicPackageCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		ActiveCaption: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430",
		PasswordMask: "123456789",
		LicAvailableCountCaption: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E {0} \u0438\u0437 {1}",
		CheckLicensesCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435",
		UncheckLicensesCaption: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0435",
		DeleteButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		DeleteUserMessage: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F?",
		DeleteErrorMessage: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u043E\u043D \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u043E\u0431\u044A\u0435\u043A\u0442\u0430\u0445.",
		PortalUserCaption: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u043E\u0440\u0442\u0430\u043B\u0430",
		OurCompanyUserCaption: "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438",
		TypeCaption: "\u0422\u0438\u043F",
		CreateWebitelUserQuestion: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F Webitel \u0434\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430?",
		WebitelUserErrorCreationMessage: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F Webitel \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
		ServerLicAvailableCountCaption: "\u0412\u044B\u0434\u0430\u043D\u043E {0} \u0438\u0437 \u043D\u0435\u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043E",
		SpecifyPasswordMessage: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		ChangeUserConnectionTypeMessage: "\u0412\u0441\u0435 \u0440\u043E\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0442\u0438\u043F\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F?",
		SessionGroupCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0435\u0441\u0441\u0438\u0438",
		SessionTimeoutTitle: "\u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0441\u0435\u0430\u043D\u0441\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u043C\u0438\u043D"
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