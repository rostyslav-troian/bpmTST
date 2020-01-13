define("VwProjectHierarchy", ["terrasoft", "ext-base", "VwProjectHierarchyResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwProjectHierarchy", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwProjectHierarchy",
			singleton: true,
			uId: "6ab03512-d9aa-4747-a342-75d7975342f0",
			name: "VwProjectHierarchy",
			caption: resources.localizableStrings.VwProjectHierarchyCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Project: {
					uId: "0baf3f21-9d78-444f-ba02-a8eae918796b",
					name: "Project",
					caption: resources.localizableStrings.ProjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Project",
					referenceSchema: {
						name: "Project",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Name"
					}
				},
				BaseProject: {
					uId: "f6e62ef6-2a8d-4375-adbe-f37a1cbdac47",
					name: "BaseProject",
					caption: resources.localizableStrings.BaseProjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Project",
					referenceSchema: {
						name: "Project",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Name"
					}
				},
				IsFirst: {
					uId: "eb7ed1d6-2290-4727-b990-739d5bfe8e46",
					name: "IsFirst",
					caption: resources.localizableStrings.IsFirstCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Id: {
					uId: "7e488c16-15dd-410d-b053-d4aab26b4db6",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Account: {
					uId: "d3e8eb30-5d7d-4c18-8b88-ffe4441549ee",
					name: "Account",
					caption: resources.localizableStrings.AccountCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.VwProjectHierarchy;
	});