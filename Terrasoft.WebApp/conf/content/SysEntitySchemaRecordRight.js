define("SysEntitySchemaRecordRight", ["terrasoft", "ext-base", "SysEntitySchemaRecordRightResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysEntitySchemaRecordRight", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysEntitySchemaRecordRight",
			singleton: true,
			uId: "509cef8b-8cdf-48e4-a41c-c0159f1e0bf7",
			name: "SysEntitySchemaRecordRight",
			caption: resources.localizableStrings.SysEntitySchemaRecordRightCaption,
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
				RecordId: {
					uId: "1dc808dc-d1fb-499f-bb7f-3d5f3114e3a4",
					name: "RecordId",
					caption: resources.localizableStrings.RecordIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysAdminUnit: {
					uId: "3d68cb45-def6-4b0e-9c5f-89e871d87454",
					name: "SysAdminUnit",
					caption: resources.localizableStrings.SysAdminUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Operation: {
					uId: "ea741da6-982c-4724-b77f-9dd39edaf88f",
					name: "Operation",
					caption: resources.localizableStrings.OperationCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "EntitySchemaRecRightOperation",
					referenceSchema: {
						name: "EntitySchemaRecRightOperation",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Column4: {
					uId: "190b9412-9fbe-4030-874e-8b5bc3e4829e",
					name: "Column4",
					caption: resources.localizableStrings.Column4Caption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysEntitySchemaRecOprRightLvl",
					referenceSchema: {
						name: "SysEntitySchemaRecOprRightLvl",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Source: {
					uId: "d56c9154-4e56-4f2f-a365-b115dd8d4d1d",
					name: "Source",
					caption: resources.localizableStrings.SourceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysEntitySchemaRecRightSource",
					referenceSchema: {
						name: "SysEntitySchemaRecRightSource",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Position: {
					uId: "e46f5f2d-4622-4524-bf7d-7ea1a86e66c5",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
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
		return Terrasoft.SysEntitySchemaRecordRight;
	});