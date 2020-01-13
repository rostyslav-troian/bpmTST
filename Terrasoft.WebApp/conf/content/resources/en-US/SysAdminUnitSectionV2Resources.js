define("SysAdminUnitSectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrganizationalRolesHeader: "Organizational roles",
		FunctionalRolesHeader: "Functional roles",
		ActualizeOrgStructureButtonCaption: "Update roles",
		ActionButtonCaption: "New",
		AddOrganisationButtonCaption: "Organization",
		AddDepartmentButtonCaption: "Division",
		AddCommandButtonCaption: "Team",
		AddUserButtonCaption: "User",
		ChangeButtonCaption: "Edit",
		AddFuncRoleButtonCaption: "Functional role",
		RemoveButtonCaption: "Delete",
		SyncProcessFail: "Unable to run LDAP synchronization process. Error: {0}",
		SuccessActionMessage: "Action completed successfully.",
		ErrorActionMessage: "Error while performing action.",
		SyncronizeWithLDAPButtonCaption: "Synchronize with LDAP",
		SyncProcessIsInBackground: "Users import process started in the background mode",
		ActionButtonHint: "Actions",
		UsersHeader: "Users",
		RunLDAPSuccessMessage: "The LDAP synchronization process will start in a minute. You will receive a notification upon completion.",
		NeedActualizeRolesTooltip: "Please update roles",
		UsersDataViewHint: "Users",
		OrganizationalStructureDataViewHint: "Organizational roles",
		FunctionalRolesDataViewHint: "Functional roles"
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