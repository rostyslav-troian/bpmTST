define("VwProcessLib", ["terrasoft", "ext-base", "VwProcessLibResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwProcessLib", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwProcessLib",
			singleton: true,
			uId: "e6e68ac1-495d-4727-a7a7-9b531ab9f849",
			name: "VwProcessLib",
			caption: resources.localizableStrings.VwProcessLibCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Caption",
			primaryImageColumnName: "StartOptionsImage",
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
				UId: {
					uId: "461026e1-dfef-4930-8932-3abfec366e3a",
					name: "UId",
					caption: resources.localizableStrings.UIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true
				},
				Name: {
					uId: "5480f92c-1fb9-4b5d-b746-bf7ebb287bd2",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				Caption: {
					uId: "c97f8e06-d4ec-418a-9a9e-819c86536812",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				ManagerName: {
					uId: "da117639-d176-4cc9-b5a9-d7e02d010d12",
					name: "ManagerName",
					caption: resources.localizableStrings.ManagerNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				Parent: {
					uId: "2af92d75-c620-4ba9-8e4e-1313822aa857",
					name: "Parent",
					caption: resources.localizableStrings.ParentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysSchema",
					referenceSchema: {
						name: "SysSchema",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ExtendParent: {
					uId: "fa7aa79d-b5d3-4731-a0c8-e3297eb20044",
					name: "ExtendParent",
					caption: resources.localizableStrings.ExtendParentCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				IsChanged: {
					uId: "3f3236b1-ee2b-4f7f-a1bb-8ae954cc9b89",
					name: "IsChanged",
					caption: resources.localizableStrings.IsChangedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				IsLocked: {
					uId: "9bd6738c-8e5c-4919-bc71-bc7ee7da7101",
					name: "IsLocked",
					caption: resources.localizableStrings.IsLockedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				MetaData: {
					uId: "750fa50e-a1eb-4364-8543-75a84cd97d4c",
					name: "MetaData",
					caption: resources.localizableStrings.MetaDataCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				MetaDataModifiedOn: {
					uId: "214ef9e1-8cf7-4c8c-aedc-03fd21654fb2",
					name: "MetaDataModifiedOn",
					caption: resources.localizableStrings.MetaDataModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SysPackage: {
					uId: "6780620a-8dd4-45f4-97c7-9bf42140ead7",
					name: "SysPackage",
					caption: resources.localizableStrings.SysPackageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysPackage",
					referenceSchema: {
						name: "SysPackage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PackageUId: {
					uId: "ee673217-e64e-4049-91ff-d3d8e10cbf27",
					name: "PackageUId",
					caption: resources.localizableStrings.PackageUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				SysWorkspace: {
					uId: "eba0017c-e0bb-4bb3-89e6-e71572081dd7",
					name: "SysWorkspace",
					caption: resources.localizableStrings.SysWorkspaceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysWorkspace",
					referenceSchema: {
						name: "SysWorkspace",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Description: {
					uId: "1ae1e084-b27a-4812-acd7-500e96a84786",
					name: "Description",
					caption: resources.localizableStrings.DescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: true,
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
				},
				NeedUpdateSourceCode: {
					uId: "bd21a4d8-389f-45dd-99cf-5607e1bba2b8",
					name: "NeedUpdateSourceCode",
					caption: resources.localizableStrings.NeedUpdateSourceCodeCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				NeedUpdateStructure: {
					uId: "23f7d4b5-c8d9-4d64-9cf9-f4215ebbb511",
					name: "NeedUpdateStructure",
					caption: resources.localizableStrings.NeedUpdateStructureCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				NeedInstall: {
					uId: "3d9641c0-06f6-4c10-8f30-8ccd9dce7fbe",
					name: "NeedInstall",
					caption: resources.localizableStrings.NeedInstallCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				IsMaxVersion: {
					uId: "aa39f4a2-89f4-4fe5-9a93-34ca63594986",
					name: "IsMaxVersion",
					caption: resources.localizableStrings.IsMaxVersionCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TagProperty: {
					uId: "933c568b-9be3-4f9a-b432-58bb827cb866",
					name: "TagProperty",
					caption: resources.localizableStrings.TagPropertyCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				Enabled: {
					uId: "33b69b02-abd8-4e5e-897d-f44eae93144b",
					name: "Enabled",
					caption: resources.localizableStrings.EnabledCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Version: {
					uId: "dc026ddc-b2c5-4078-a4b0-a73007ade51b",
					name: "Version",
					caption: resources.localizableStrings.VersionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ProcessSchemaType: {
					uId: "ac63ff57-c186-4a21-95f2-669953549c65",
					name: "ProcessSchemaType",
					caption: resources.localizableStrings.ProcessSchemaTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ProcessSchemaType",
					referenceSchema: {
						name: "ProcessSchemaType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SysSchemaId: {
					uId: "f2c5391b-d8f4-4974-92cb-3802ae67c7a3",
					name: "SysSchemaId",
					caption: resources.localizableStrings.SysSchemaIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				AddToRunButton: {
					uId: "81b88400-4e0e-4530-8f6f-67fcb721878a",
					name: "AddToRunButton",
					caption: resources.localizableStrings.AddToRunButtonCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				IsActiveVersion: {
					uId: "d49ae0f5-e9fd-40c4-b919-47ab597125bd",
					name: "IsActiveVersion",
					caption: resources.localizableStrings.IsActiveVersionCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				VersionParentId: {
					uId: "1de3b2f1-3a47-4041-a535-0efa77fe51f2",
					name: "VersionParentId",
					caption: resources.localizableStrings.VersionParentIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: false,
					isValueCloneable: true
				},
				HasStartEvent: {
					uId: "9e279d32-36c3-4eed-ad11-2b23d7ab8bc5",
					name: "HasStartEvent",
					caption: resources.localizableStrings.HasStartEventCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				VersionParentUId: {
					uId: "a4fa3c3e-bec2-4d8e-a821-26495d1c0163",
					name: "VersionParentUId",
					caption: resources.localizableStrings.VersionParentUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StartOptionsImage: {
					uId: "5df842bd-a53f-45f0-818f-34c114280de0",
					name: "StartOptionsImage",
					caption: resources.localizableStrings.StartOptionsImageCaption,
					dataValueType: Terrasoft.DataValueType.IMAGELOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SysImage",
					referenceSchema: {
						name: "SysImage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				IsProcessTracing: {
					uId: "99d80984-5fbb-4cf2-8584-8213d093659f",
					name: "IsProcessTracing",
					caption: resources.localizableStrings.IsProcessTracingCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwProcessLib;
	});