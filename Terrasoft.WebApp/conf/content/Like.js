define("Like", ["terrasoft", "ext-base", "LikeResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Like", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Like",
			singleton: true,
			uId: "19798138-68cb-45df-abc7-b1e7ffbe8a90",
			name: "Like",
			caption: resources.localizableStrings.LikeCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "b60697a9-8c22-4657-b0e4-85bb341bdd94",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				Contact: {
					uId: "268b15c2-da98-494f-82d8-ca3a5f39251e",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
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
				KnowledgeBase: {
					uId: "8612c47d-7980-4d77-93ca-8cc8f1c8c8aa",
					name: "KnowledgeBase",
					caption: resources.localizableStrings.KnowledgeBaseCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "KnowledgeBase",
					referenceSchema: {
						name: "KnowledgeBase",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				LikeIt: {
					uId: "4775d5fc-f847-4145-8472-960c2ebc7628",
					name: "LikeIt",
					caption: resources.localizableStrings.LikeItCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.Like;
	});