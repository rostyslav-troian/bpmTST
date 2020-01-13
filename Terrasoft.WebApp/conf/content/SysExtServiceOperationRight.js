define("SysExtServiceOperationRight", ["terrasoft", "ext-base", "SysExtServiceOperationRightResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysExtServiceOperationRight", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysExtServiceOperationRight",
			singleton: true,
			uId: "1eecc3f6-0c95-4e15-a18f-7c1400d7bc51",
			name: "SysExtServiceOperationRight",
			caption: resources.localizableStrings.SysExtServiceOperationRightCaption,
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
				SysAdminUnit: {
					uId: "d27e9964-a7a6-46dd-9f9a-7cb470c33b98",
					name: "SysAdminUnit",
					caption: resources.localizableStrings.SysAdminUnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "VwSysAdminUnit",
					referenceSchema: {
						name: "VwSysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CanRead: {
					uId: "a3dc68d6-f74e-4a57-8411-77a88dfe0bbb",
					name: "CanRead",
					caption: resources.localizableStrings.CanReadCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				CanAppend: {
					uId: "21a61238-45dc-4089-9882-cc1be097cbf8",
					name: "CanAppend",
					caption: resources.localizableStrings.CanAppendCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				CanEdit: {
					uId: "379b41a2-dfb5-4069-a267-88ec0653e391",
					name: "CanEdit",
					caption: resources.localizableStrings.CanEditCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				CanDelete: {
					uId: "2cda2c20-d48a-44d0-b266-5542730b1ad9",
					name: "CanDelete",
					caption: resources.localizableStrings.CanDeleteCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Position: {
					uId: "a72532ba-4755-4b2f-8079-c382ae6d0e9a",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
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
				},
				SubjectSchemaUId: {
					uId: "134c280f-f7a7-4ac5-beeb-4ab1ed9e4ff5",
					name: "SubjectSchemaUId",
					caption: resources.localizableStrings.SubjectSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.SysExtServiceOperationRight;
	});