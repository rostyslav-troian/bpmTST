define("SysSettingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DefaultValueCaption: "Default value",
		ReferenceSchemaCaption: "Lookup",
		TypeCaption: "Type",
		IsCacheableInfoTip: "Used for system settings whose value is being read frequently. The value of the system setting will be saved in memory for quick access.",
		IsPersonalInfoTip: "If a user modifies the value of system setting, the modification will be applied only for this user. The system setting value will be unmodified for all other employees.",
		FileSelectCaption: "Select file",
		ClearBinaryValueCaption: "Clear value",
		DuplicateCodeMessage: "The entered code is already in use. Please enter another system setting code.",
		SaveToFileCaption: "Save to file",
		IsCacheableCaption: "Cached",
		ReadRightsGroupCaption: "Access for reading for internal users",
		WriteRightsGroupCaption: "Access for modification for internal users",
		IsSSPAvailableGroupCaption: "Access for portal users",
		AllowAllButtonCaption: "Allow for all",
		RestrictAllButtonCaption: "Restrict for all",
		AllowByOperationButtonCaption: "Allow by operation",
		SysAdminOperationLookupPlaceholder: "Select operation",
		IsSSPAvailableCaption: "Allow reading for portal users",
		IsPersonalCaption: "Save value for current user",
		ReadRightsGroupInfoButtonCaption: "Users with permission to the \u003Ca href={0} target=\u0022_blank\u0022\u003E\u0022Access to \u0022System settings\u0022 section\u0022\u003C\/a\u003E operation always have a full access.",
		ReadWriteRightsGroupInfoButtonCaption: "Users with permission to the \u003Ca href={0} target=\u0022_blank\u0022\u003E\u0022Access to \u0022System settings\u0022 section\u0022\u003C\/a\u003E operation always have a full access. Access for modification by operation also means a reading access.",
		CodeInfoTip: "Used by developers for interacting with the system setting in Creatio source code.",
		SysSettingTypeInfoButtonTipMessage: "System settings with the \u0022Secured text\u0022 type are not being transmitted to the client (browser). This process is controlled by the \u0022UseSecureSettingsOnClient\u0022 flag in the Web.config configuration file of the Creatio application. Their values can still be set from the client (browser)."
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		ClearBinaryValueImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "ClearBinaryValueImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "SysSettingPage",
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