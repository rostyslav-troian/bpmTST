define("VwProcessDashboard", ["terrasoft", "ext-base", "VwProcessDashboardResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwProcessDashboard", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwProcessDashboard",
			singleton: true,
			uId: "ef3a3dcb-5f88-4af4-9894-1e36c4876085",
			name: "VwProcessDashboard",
			caption: resources.localizableStrings.VwProcessDashboardCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "387f81b2-4ba1-49e0-b1c5-c0ac200fc5d8",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				ProcessElement: {
					uId: "f7f3371d-3442-40e8-84ca-d9c2f37e41cf",
					name: "ProcessElement",
					caption: resources.localizableStrings.ProcessElementCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysProcessElementData",
					referenceSchema: {
						name: "SysProcessElementData",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				ProcessData: {
					uId: "cf4bf9f4-8ac1-4d6b-95e0-25eedcaa5c05",
					name: "ProcessData",
					caption: resources.localizableStrings.ProcessDataCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysProcessData",
					referenceSchema: {
						name: "SysProcessData",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				ModifiedOn: {
					uId: "6ee49b37-00b3-4940-88c3-e3df4d7888bc",
					name: "ModifiedOn",
					caption: resources.localizableStrings.ModifiedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ProcessName: {
					uId: "65fb81f6-c83f-424f-be6d-dadc1ee7c1c1",
					name: "ProcessName",
					caption: resources.localizableStrings.ProcessNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ElementCaption: {
					uId: "7baa874f-9839-4eb2-aace-b0b627b7f833",
					name: "ElementCaption",
					caption: resources.localizableStrings.ElementCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				EntitySchemaUId: {
					uId: "76d716cb-b632-42a4-bf97-ac3b75533431",
					name: "EntitySchemaUId",
					caption: resources.localizableStrings.EntitySchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				EntityId: {
					uId: "64a5b76a-24ba-4ba8-aee0-d44eff8c182f",
					name: "EntityId",
					caption: resources.localizableStrings.EntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ProcessElementEntitySchemaUId: {
					uId: "0134e51e-7061-45ed-9e7d-e5a1a45d0e7d",
					name: "ProcessElementEntitySchemaUId",
					caption: resources.localizableStrings.ProcessElementEntitySchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ProcessElementEntityId: {
					uId: "6bac1f40-4c25-4c60-8b85-8df9a2713ba7",
					name: "ProcessElementEntityId",
					caption: resources.localizableStrings.ProcessElementEntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ProcessElementSchemaUId: {
					uId: "9e239a34-ae34-4ff8-af4c-8c4144a8f382",
					name: "ProcessElementSchemaUId",
					caption: resources.localizableStrings.ProcessElementSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				CreatedOn: {
					uId: "f7096cca-92da-45ff-98ba-43acb394db93",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Owner: {
					uId: "c796a73d-17b2-433d-bb33-86b337ba5907",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
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
				ElementOwner: {
					uId: "7950eb41-b9d8-4290-b804-4963eee5d1a4",
					name: "ElementOwner",
					caption: resources.localizableStrings.ElementOwnerCaption,
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
				ProcessOwner: {
					uId: "9d55cbd4-17b6-4838-9dd0-a14a0d3c34c3",
					name: "ProcessOwner",
					caption: resources.localizableStrings.ProcessOwnerCaption,
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
				ProcessSchemaElementUId: {
					uId: "b567f361-5f18-4ed6-8c0d-65be2acd3bd8",
					name: "ProcessSchemaElementUId",
					caption: resources.localizableStrings.ProcessSchemaElementUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwProcessDashboard;
	});