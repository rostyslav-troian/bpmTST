define("LandingObjectDefaults", ["terrasoft", "ext-base", "LandingObjectDefaultsResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.LandingObjectDefaults", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.LandingObjectDefaults",
			singleton: true,
			uId: "53c5ad19-3faf-4a01-97bc-17c9c817fcbc",
			name: "LandingObjectDefaults",
			caption: resources.localizableStrings.LandingObjectDefaultsCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
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
					uId: "bc8ea26d-108b-457e-ad6c-a8e44f21774c",
					name: "Landing",
					caption: resources.localizableStrings.LandingCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "GeneratedWebForm",
					referenceSchema: {
						name: "GeneratedWebForm",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DisplayValue: {
					uId: "42085559-ac54-4061-b0dd-8886f63a1320",
					name: "DisplayValue",
					caption: resources.localizableStrings.DisplayValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ColumnUId: {
					uId: "51c012a4-8568-4775-9682-3781d5d608c7",
					name: "ColumnUId",
					caption: resources.localizableStrings.ColumnUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ColumnCaption: {
					uId: "3ba9355c-1ab5-44f9-bd07-5b20c8327a31",
					name: "ColumnCaption",
					caption: resources.localizableStrings.ColumnCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				GuidValue: {
					uId: "62da44b9-376d-4bfe-8a85-b0e89bb20cd6",
					name: "GuidValue",
					caption: resources.localizableStrings.GuidValueCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				TextValue: {
					uId: "8a9768bb-65c0-4282-8d51-425e472ceae6",
					name: "TextValue",
					caption: resources.localizableStrings.TextValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IntegerValue: {
					uId: "ea572b49-ed6a-43db-a2be-d65d046726ae",
					name: "IntegerValue",
					caption: resources.localizableStrings.IntegerValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				FloatValue: {
					uId: "366a8e23-807a-4093-9be6-732e51191f7f",
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
					uId: "8867f237-62d1-4645-a513-6b896810ebd8",
					name: "BooleanValue",
					caption: resources.localizableStrings.BooleanValueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				DateTimeValue: {
					uId: "72963087-d24c-4812-9923-16ee8536bcfb",
					name: "DateTimeValue",
					caption: resources.localizableStrings.DateTimeValueCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.LandingObjectDefaults;
	});