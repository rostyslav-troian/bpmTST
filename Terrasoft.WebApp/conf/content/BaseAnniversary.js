﻿define("BaseAnniversary", ["terrasoft", "ext-base", "BaseAnniversaryResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BaseAnniversary", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BaseAnniversary",
			singleton: true,
			uId: "c3d34c7a-3acf-4394-a9fe-50e48f92ca9f",
			name: "BaseAnniversary",
			caption: resources.localizableStrings.BaseAnniversaryCaption,
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
					isValueCloneable: false
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
					}
				},
				Date: {
					uId: "ce66aa7d-8443-4b5a-a7fe-a90ae4e809de",
					name: "Date",
					caption: resources.localizableStrings.DateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				AnniversaryType: {
					uId: "93c29696-307b-45f3-a799-b51670bdfcb6",
					name: "AnniversaryType",
					caption: resources.localizableStrings.AnniversaryTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "AnniversaryType",
					referenceSchema: {
						name: "AnniversaryType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Description: {
					uId: "fac11c8a-b9a5-4059-b704-d5d1d2b55d88",
					name: "Description",
					caption: resources.localizableStrings.DescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.BaseAnniversary;
	});