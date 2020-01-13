define("SystemDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessCaption: "Processes",
		UsersCaption: "Users and administration",
		IntegrationCaption: "Import and integration",
		SystemSettingsCaption: "System setup",
		SystemViewCaption: "Set up view",
		ConfigurationCaption: "Admin area",
		ProcessLibraryLinkCaption: "Process library",
		ProcessLogLinkCaption: "Process log",
		ObjectRightsManagementLinkCaption: "Object permissions",
		OperationRightsManagementLinkCaption: "Operation permissions",
		AuditLogLinkCaption: "Audit log",
		ExcelImportLinkCaption: "Excel data import",
		LookupsLinkCaption: "Lookups",
		SectionDesignerLinkCaption: "Section wizard",
		MobileAppDesignerLinkCaption: "Mobile application wizard",
		ConfigurationLinkCaption: "Advanced settings",
		SysWorkplaceLinkCaption: "Workplace setup",
		SysLogoManagementLinkCaption: "Logo customization",
		SysColorManagementLinkCaption: "Color customization",
		RightsErrorMessage: "Insufficient rights to perform this action. Contact your system administrator.",
		WebFormsLinkCaption: "Landing page setup",
		LdapLinkCaption: "LDAP integration setup",
		BannerCaption: "BPMS documents",
		BannerHint: "business process management",
		DetailWizardLinkCaption: "Detail wizard",
		OrgRolesLinkCaption: "Organizational roles",
		FuncRolesLinkCaption: "Functional roles",
		UsersLinkCaption: "System users",
		SysSettingsLinkCaption: "System settings",
		MandrillSettingsLinkCaption: "Mandrill integration setup",
		DuplicatesSettingsLinkCaption: "Setup duplicates rules",
		FileImportLinkCaption: "Data import",
		TranslationSectionCaption: "Translation",
		LanguageSectionCaption: "Languages",
		PackageMarketCaption: "Creatio package market",
		ProcessDesignerLinkCaption: "Process designer",
		ScoringModelCaption: "Scoring models",
		SiteEventTypeCaption: "Website events tracking",
		OpenBulkEmailEventLogCaption: "Mailing log",
		ResourceTpl: "Resources.Strings.{0}",
		InstallConfirmationMessage: "This operation may take long. You will receive notification upon completion. Continue?",
		InstallPackageDenied: "You do not have permissions to perform this action",
		InstallPackageSuccess: "Package successfully installed",
		InstallPackageFailed: "Problems occurred while installation",
		InstallPackageEmptyUrl: "Repository path name cannot be empty",
		ApplicationsCaption: "Applications",
		InstallWebitelAnyVoipCaption: "\u0022Webitel AnyVoip\u0022 package installation",
		UpdateWebitelAnyVoipCaption: "\u0022Webitel AnyVoip\u0022 package update",
		FeaturesPage: "New features",
		PortalUsersLinkCaption: "Portal users",
		InstalledAppCaption: "Installed applications",
		PageWizardLinkCaption: "Page wizard",
		PortalMainPageManagementLinkCaption: "Set up portal main page",
		PortalSetupCaption: "Portal setup",
		PortalOrganizationalRolesLinkCaption: "Portal organizational roles",
		PortalFunctionalRolesLinkCaption: "Portal functional roles",
		WebServicesCaption: "Web services integration setup",
		MLModelSectionCaption: "ML models",
		UseOldOpportunityManagementProcess: "Do not use corporate sale process 7.8",
		UseOpportunityManagementProcess780: "Use corporate sale process 7.8",
		PortalOrganizationSetupLinkCaption: "Set up portal organization page",
		SspProfileContactSetupLinkCaption: "Set up portal user profile page",
		ReportSetupLinkCaption: "Report setup",
		ExtAccessSectionCaption: "External access",
		ChangeLogLinkCaption: "Change log"
	};
	var localizableImages = {
		ProcessIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "ProcessIcon",
				hash: "b870c39ce0673f575b49db8cf315a1b1",
				resourceItemExtension: ".png"
			}
		},
		UsersIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "UsersIcon",
				hash: "8d716f8ff873e6183b70e12acef52ed7",
				resourceItemExtension: ".png"
			}
		},
		IntegrationIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "IntegrationIcon",
				hash: "3a3f3e8dea075ec8a773ee93f89d8918",
				resourceItemExtension: ".png"
			}
		},
		SystemSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "SystemSettingsIcon",
				hash: "1b7a59b9bf01a6d7091db009024a69cc",
				resourceItemExtension: ".png"
			}
		},
		SystemViewIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "SystemViewIcon",
				hash: "587e3a468d4877f183b6f1d33155ee98",
				resourceItemExtension: ".png"
			}
		},
		ConfigurationIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "ConfigurationIcon",
				hash: "94c8818f373f68c97a69fb32bd19da6f",
				resourceItemExtension: ".png"
			}
		},
		TwitterIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "TwitterIcon",
				hash: "43ef41cba1450cadf1eb65f93a7b0d25",
				resourceItemExtension: ".svg"
			}
		},
		FacebookIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "FacebookIcon",
				hash: "27130fdf43a9e78bf3f36e626a3e1781",
				resourceItemExtension: ".svg"
			}
		},
		GoogleIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "GoogleIcon",
				hash: "b2c07233caac08d4f65769e921a4d232",
				resourceItemExtension: ".svg"
			}
		},
		YoutubeIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "YoutubeIcon",
				hash: "16f3900d772354c3ce0af6c68f0c5226",
				resourceItemExtension: ".svg"
			}
		},
		LinkedinIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "LinkedinIcon",
				hash: "76b4011e0b60d2e1c264706026ba938f",
				resourceItemExtension: ".svg"
			}
		},
		AcademyBanner: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "AcademyBanner",
				hash: "b34cc15228761c3274d07b3c4a906382",
				resourceItemExtension: ".svg"
			}
		},
		Arrow: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "Arrow",
				hash: "c23876260284897a31b25a1d37eeaf45",
				resourceItemExtension: ".png"
			}
		},
		BPMSbanner: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "BPMSbanner",
				hash: "df7ec875ea9036874b5d612fa331aabf",
				resourceItemExtension: ".jpg"
			}
		},
		playBtn: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "playBtn",
				hash: "d0b9ed0adb16bd51facb13c3bd92b555",
				resourceItemExtension: ".png"
			}
		},
		playBtnActive: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "playBtnActive",
				hash: "5225f87b6257a3dd4a411ebf44702bd9",
				resourceItemExtension: ".png"
			}
		},
		AndroidIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "AndroidIcon",
				hash: "385d1b4f9e6d5d385239801b140a8c09",
				resourceItemExtension: ".svg"
			}
		},
		IosIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "IosIcon",
				hash: "83443f1c07e583d16de6a799b8a8dd54",
				resourceItemExtension: ".svg"
			}
		},
		CommunityIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "CommunityIcon",
				hash: "d4e1e0d9b779b248a17771e7f80aa52c",
				resourceItemExtension: ".svg"
			}
		},
		WindowsIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "WindowsIcon",
				hash: "4df28b8cf5ad578d573eeeae1ba6c3a8",
				resourceItemExtension: ".svg"
			}
		},
		InstallExtensionsIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "InstallExtensionsIcon",
				hash: "12b99eabcdf7d342d149012ff0f0f550",
				resourceItemExtension: ".svg"
			}
		},
		MarketplaceIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "MarketplaceIcon",
				hash: "79bf31568c3cc50782a3860592d58825",
				resourceItemExtension: ".svg"
			}
		},
		GettingStartedIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "GettingStartedIcon",
				hash: "670d3ae90708491a0350e89d73bca20f",
				resourceItemExtension: ".svg"
			}
		},
		SdkIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "SdkIcon",
				hash: "25fb98ad79924e87ec09066cb96e7abe",
				resourceItemExtension: ".svg"
			}
		},
		PortalIcon: {
			source: 3,
			params: {
				schemaName: "SystemDesigner",
				resourceItemName: "PortalIcon",
				hash: "4a9215e8670b6191ef288a19577c53e3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});