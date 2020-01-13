define("KnowledgeBaseTagDecoupling", ["terrasoft", "ext-base", "KnowledgeBaseTagDecouplingResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.KnowledgeBaseTagDecoupling", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.KnowledgeBaseTagDecoupling",
			singleton: true,
			uId: "a9330870-42a9-43ed-9138-3ef56cfded77",
			name: "KnowledgeBaseTagDecoupling",
			caption: resources.localizableStrings.KnowledgeBaseTagDecouplingCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "8b1a4d36-6231-43a8-b2a3-3143b570f710",
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
				Tag: {
					uId: "65eb5ae3-5843-4713-afa8-c3d47696c309",
					name: "Tag",
					caption: resources.localizableStrings.TagCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "KnowledgeBaseTag",
					referenceSchema: {
						name: "KnowledgeBaseTag",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				KnowledgeBase: {
					uId: "d4a60dbd-6440-46ad-8cbe-7975e1bf0ccb",
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
				}
			}
		});
		return Terrasoft.KnowledgeBaseTagDecoupling;
	});