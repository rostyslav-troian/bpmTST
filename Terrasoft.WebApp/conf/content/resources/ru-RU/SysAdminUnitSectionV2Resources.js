define("SysAdminUnitSectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrganizationalRolesHeader: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u043E\u043B\u0438",
		FunctionalRolesHeader: "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u043E\u043B\u0438",
		ActualizeOrgStructureButtonCaption: "\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u043E\u043B\u0438",
		ActionButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		AddOrganisationButtonCaption: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044E",
		AddDepartmentButtonCaption: "\u041F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435",
		AddCommandButtonCaption: "\u041A\u043E\u043C\u0430\u043D\u0434\u0443",
		AddUserButtonCaption: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
		ChangeButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		AddFuncRoleButtonCaption: "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0443\u044E \u0440\u043E\u043B\u044C",
		RemoveButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		SyncProcessFail: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441 LDAP. \u041E\u0448\u0438\u0431\u043A\u0430: {0}",
		SuccessActionMessage: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E.",
		ErrorActionMessage: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439.",
		SyncronizeWithLDAPButtonCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 LDAP",
		SyncProcessIsInBackground: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0438\u043C\u043F\u043E\u0440\u0442\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0432 \u0444\u043E\u043D\u043E\u0432\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435",
		ActionButtonHint: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		UsersHeader: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438",
		RunLDAPSuccessMessage: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441 LDAP \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0438 \u043C\u0438\u043D\u0443\u0442\u044B. \u041F\u043E \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0432\u0430\u043C \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0441\u043B\u0430\u043D\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435.",
		NeedActualizeRolesTooltip: "\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0440\u043E\u043B\u0438",
		UsersDataViewHint: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438",
		OrganizationalStructureDataViewHint: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u043E\u043B\u0438",
		FunctionalRolesDataViewHint: "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u043E\u043B\u0438"
	};
	var localizableImages = {
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "ToolsButtonImage",
				hash: "8624d21271ed2ce65aeda243033f3670",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		OrgRolesIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "OrgRolesIcon",
				hash: "525748f204b95e469de1461e885125f0",
				resourceItemExtension: ".png"
			}
		},
		FuncRolesIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "FuncRolesIcon",
				hash: "1683efb638aaa32072b0b61b98c2c221",
				resourceItemExtension: ".png"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		UsersDataViewIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "UsersDataViewIcon",
				hash: "c3212e0d5b44f90364831ec6af8542b7",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ToggleSectionButton: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "ToggleSectionButton",
				hash: "7e47411934e85e6cf9834ebc72cff3e6",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "SortIcon",
				hash: "c0d8dfe7b1416f4c916f1d82523355ae",
				resourceItemExtension: ".svg"
			}
		},
		SummariesIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "SummariesIcon",
				hash: "f1f5f60ee306afca15aa461aac0fdad8",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		DataLoadFailedImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "DataLoadFailedImage",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		},
		AddTagsButtonImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "AddTagsButtonImage",
				hash: "c4683cf6e3fd3e28b391ff180a9c9c3d",
				resourceItemExtension: ".svg"
			}
		},
		ShowDuplicatesBtnImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "ShowDuplicatesBtnImage",
				hash: "fa120a8db42142879bc508b69c6a5993",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "SysAdminUnitSectionV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});