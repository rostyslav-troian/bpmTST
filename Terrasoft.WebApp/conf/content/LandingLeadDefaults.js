define("LandingLeadDefaults", ["terrasoft", "ext-base", "LandingLeadDefaultsResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.LandingLeadDefaults", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.LandingLeadDefaults",
			singleton: true,
			uId: "ffb1d52b-8389-47ce-b239-0e3cb713c56a",
			name: "LandingLeadDefaults",
			caption: resources.localizableStrings.LandingLeadDefaultsCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "DisplayValue",
			columns: {
				Id: {
					uId: "ae0e45ca-c495-4fe7-a39d-3ab7278e1617",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				CreatedOn: {
					uId: "e80190a5-03b2-4095-90f7-a193a960adee",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				CreatedBy: {
					uId: "ebf6bb93-8aa6-4a01-900d-c6ea67affe21",
					name: "CreatedBy",
					caption: resources.localizableStrings.CreatedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				ModifiedOn: {
					uId: "9928edec-4272-425a-93bb-48743fee4b04",
					name: "ModifiedOn",
					caption: resources.localizableStrings.ModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				ModifiedBy: {
					uId: "3015559e-cbc6-406a-88af-07f7930be832",
					name: "ModifiedBy",
					caption: resources.localizableStrings.ModifiedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 1,
					isInherited: true,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Landing: {
					uId: "fcf2f5a1-d285-4f07-812e-1d2fb20d0388",
					name: "Landing",
					caption: resources.localizableStrings.LandingCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "GeneratedWebForm",
					referenceSchema: {
						name: "GeneratedWebForm",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DisplayValue: {
					uId: "3fc79c7c-ddd6-4839-9ed4-c791481a2f02",
					name: "DisplayValue",
					caption: resources.localizableStrings.DisplayValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ColumnUId: {
					uId: "60e8a89c-c7d6-471c-bd11-0404c42b77d5",
					name: "ColumnUId",
					caption: resources.localizableStrings.ColumnUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ColumnCaption: {
					uId: "f7263c94-1955-4e73-970b-6a202e3111c6",
					name: "ColumnCaption",
					caption: resources.localizableStrings.ColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				GuidValue: {
					uId: "2a8720f7-f29e-41ac-b88e-7e09663d0eaf",
					name: "GuidValue",
					caption: resources.localizableStrings.GuidValueCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				TextValue: {
					uId: "7ab20ae8-54c3-41b4-97f1-cdc62b1a0b79",
					name: "TextValue",
					caption: resources.localizableStrings.TextValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IntegerValue: {
					uId: "93abdf96-9e69-4c5e-acf7-e0dcf4c06a63",
					name: "IntegerValue",
					caption: resources.localizableStrings.IntegerValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				FloatValue: {
					uId: "4d3ff9f8-4304-4016-8e8f-45e204121ae8",
					name: "FloatValue",
					caption: resources.localizableStrings.FloatValueCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				BooleanValue: {
					uId: "873b4167-30f1-4bac-806a-fe8aa9ba0950",
					name: "BooleanValue",
					caption: resources.localizableStrings.BooleanValueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				DateTimeValue: {
					uId: "5498d00f-8fb9-48e5-b9fe-d8d149012763",
					name: "DateTimeValue",
					caption: resources.localizableStrings.DateTimeValueCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.LandingLeadDefaults;
	});