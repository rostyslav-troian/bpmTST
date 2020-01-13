define("Macros", ["terrasoft", "ext-base", "MacrosResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Macros", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Macros",
			singleton: true,
			uId: "d58c84bf-23c6-462c-a99a-d46acf8b91a1",
			name: "Macros",
			caption: resources.localizableStrings.MacrosCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
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
				Command: {
					uId: "916da6c3-c20d-4b62-833b-bad07832beed",
					name: "Command",
					caption: resources.localizableStrings.CommandCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Command",
					referenceSchema: {
						name: "Command",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Name: {
					uId: "867eb790-be19-4cbb-8807-a36ceaca7b67",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 500
				},
				MainParam: {
					uId: "56f88702-f845-4a06-b282-836e2fcc9689",
					name: "MainParam",
					caption: resources.localizableStrings.MainParamCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MainParam",
					referenceSchema: {
						name: "MainParam",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AdditionalParam: {
					uId: "09a029f7-4063-4850-ae8a-783f32fcb677",
					name: "AdditionalParam",
					caption: resources.localizableStrings.AdditionalParamCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AdditionalParam",
					referenceSchema: {
						name: "AdditionalParam",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "ColumnCaption"
					}
				},
				AdditionalParamValue: {
					uId: "ad30cc8e-0fcb-4b21-9f3e-334d3d8055e7",
					name: "AdditionalParamValue",
					caption: resources.localizableStrings.AdditionalParamValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				MainParamType: {
					uId: "d21e1f43-8478-477a-9b15-6811f48b0753",
					name: "MainParamType",
					caption: resources.localizableStrings.MainParamTypeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				IsShared: {
					uId: "9d018884-31bf-4ff3-98e9-a865348fbcc7",
					name: "IsShared",
					caption: resources.localizableStrings.IsSharedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: false
					}
				}
			}
		});
		return Terrasoft.Macros;
	});