define("DcmSchemaStagePropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "Use the stage properties to connect case stages to lookup values, set up transitions between stages, group stages or change stage color. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022DcmSchemaStagePropertiesPage\u0022\u003ERead more...\u003C\/a\u003E",
		StageValueInLookupCaption: "Stage value in the lookup",
		StageValidToMoveCaption: "Possible next stages",
		WithStageValidMoveCaption: "Possible previous stages",
		AdditionalSettingsCaption: "Additional settings",
		IsGroupWithOtherStageCaption: "Group with another stage",
		StageColorCaption: "Stage color",
		AddConnectionButtonCaption: "Add stage",
		StageIsSuccessfulCaption: "Stage is successful",
		StageIsAlreadyInGroupTip: "Stage is already in the group",
		AddLookupRecordErrorMessage: "Error while adding new lookup record.\nField \u0022{0}\u0022: {1}",
		TransitionTypeCaption: "Automatic transition to next case stage",
		StagePermissions: "Restrict this stage to specific users or roles",
		AddPermissionsButton: "Add user or role",
		AddPermissionsButtonHint: "Only selected users and roles will be able to transition the case to this stage."
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "DcmSchemaStagePropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "DcmSchemaStagePropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "DcmSchemaStagePropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "DcmSchemaStagePropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});