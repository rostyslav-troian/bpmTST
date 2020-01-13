define("VwSysDcmLib", ["terrasoft", "ext-base", "VwSysDcmLibResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSysDcmLib", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSysDcmLib",
			singleton: true,
			uId: "ab972a77-ca14-4dd4-9d90-eaaae8b1197a",
			name: "VwSysDcmLib",
			caption: resources.localizableStrings.VwSysDcmLibCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Caption",
			columns: {
				Id: {
					uId: "f24251f7-35a6-420b-9b87-5a17bb96ba31",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CreatedOn: {
					uId: "89505988-362b-49bd-9952-526a02ad2157",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CreatedBy: {
					uId: "5240a6f9-3c2b-4c9d-8d8d-50689743d3ab",
					name: "CreatedBy",
					caption: resources.localizableStrings.CreatedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ModifiedOn: {
					uId: "465e6579-2f28-4741-a3d6-8d8161f63c7d",
					name: "ModifiedOn",
					caption: resources.localizableStrings.ModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ModifiedBy: {
					uId: "74a3f96e-a94e-4149-87aa-73273168bc02",
					name: "ModifiedBy",
					caption: resources.localizableStrings.ModifiedByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Name: {
					uId: "2eab78fa-7ebd-4ac7-9b2d-e96d92503851",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Caption: {
					uId: "e8054d3e-0a4c-47e8-bf03-b42abc17088b",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				PackageUId: {
					uId: "938c231c-de1c-447c-95bf-5c135976a55b",
					name: "PackageUId",
					caption: resources.localizableStrings.PackageUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				SysWorkspace: {
					uId: "e2292273-d7a1-4e76-8afb-46467e8942d1",
					name: "SysWorkspace",
					caption: resources.localizableStrings.SysWorkspaceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysWorkspace",
					referenceSchema: {
						name: "SysWorkspace",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				StageColumnUId: {
					uId: "b52da5b4-8de9-442c-b55b-9db6504c0ade",
					name: "StageColumnUId",
					caption: resources.localizableStrings.StageColumnUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EntitySchemaUId: {
					uId: "c613316d-3d42-4f0d-b7d8-719da3b6f92b",
					name: "EntitySchemaUId",
					caption: resources.localizableStrings.EntitySchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsActive: {
					uId: "5d7148b1-326c-4b54-bda3-f287d6ce2b23",
					name: "IsActive",
					caption: resources.localizableStrings.IsActiveCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				UId: {
					uId: "f0a960e9-6853-4e63-b137-40afbc665f2c",
					name: "UId",
					caption: resources.localizableStrings.UIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Filters: {
					uId: "482fd914-b97f-4310-9a19-fb81d82fd581",
					name: "Filters",
					caption: resources.localizableStrings.FiltersCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Parent: {
					uId: "40084b18-2ec4-4192-8f7c-d79c8cc2f07e",
					name: "Parent",
					caption: resources.localizableStrings.ParentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysSchema",
					referenceSchema: {
						name: "SysSchema",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				IsLocked: {
					uId: "fe987912-1849-4c69-b2ab-0333c8af8524",
					name: "IsLocked",
					caption: resources.localizableStrings.IsLockedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExtendParent: {
					uId: "47ae9c04-c735-4cb0-bb3b-e6bb66b46163",
					name: "ExtendParent",
					caption: resources.localizableStrings.ExtendParentCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Package: {
					uId: "20534757-35e6-4d40-9974-279ffe36668f",
					name: "Package",
					caption: resources.localizableStrings.PackageCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysPackage",
					referenceSchema: {
						name: "SysPackage",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.VwSysDcmLib;
	});