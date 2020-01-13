define("BufferedImportEntity", ["terrasoft", "ext-base", "BufferedImportEntityResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BufferedImportEntity", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BufferedImportEntity",
			singleton: true,
			uId: "5f1f7cd2-97ec-4b87-913d-c9b2fc6561f3",
			name: "BufferedImportEntity",
			caption: resources.localizableStrings.BufferedImportEntityCaption,
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
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Column1: {
					uId: "6149dc4a-0845-4f34-953b-8d2d6cd2b2bf",
					name: "Column1",
					caption: resources.localizableStrings.Column1Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column2: {
					uId: "c1caf677-8c20-4d9b-ae1b-d530d80d9dda",
					name: "Column2",
					caption: resources.localizableStrings.Column2Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column3: {
					uId: "9b306515-52a1-4326-ac81-3e1fcd1259ef",
					name: "Column3",
					caption: resources.localizableStrings.Column3Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column4: {
					uId: "9c1aeb37-b5e1-4d88-b81e-8a73c987401a",
					name: "Column4",
					caption: resources.localizableStrings.Column4Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column5: {
					uId: "341a68ab-0028-47a2-b875-d5bd6f1f8e17",
					name: "Column5",
					caption: resources.localizableStrings.Column5Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column6: {
					uId: "945a5535-76fc-4361-b88f-20fb03a3d076",
					name: "Column6",
					caption: resources.localizableStrings.Column6Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column7: {
					uId: "97f7ae9f-4612-4b96-a281-d3810e63b017",
					name: "Column7",
					caption: resources.localizableStrings.Column7Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column8: {
					uId: "81dda907-db24-4528-96b8-50aa77718b4b",
					name: "Column8",
					caption: resources.localizableStrings.Column8Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column9: {
					uId: "27a24011-3332-4f58-b15d-0c4c66d0e94f",
					name: "Column9",
					caption: resources.localizableStrings.Column9Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column10: {
					uId: "afeb8b8b-a9ef-43df-8bde-769736564275",
					name: "Column10",
					caption: resources.localizableStrings.Column10Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column11: {
					uId: "29144d77-05b4-44f1-a831-58fa92c40e96",
					name: "Column11",
					caption: resources.localizableStrings.Column11Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column12: {
					uId: "f7eb5b8b-fa3a-47d4-a892-48e2833d5f56",
					name: "Column12",
					caption: resources.localizableStrings.Column12Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column13: {
					uId: "7480ccaa-a86e-431a-872c-04e5783a73ff",
					name: "Column13",
					caption: resources.localizableStrings.Column13Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column14: {
					uId: "404debdd-63e9-443e-ba68-79f1f9a6f618",
					name: "Column14",
					caption: resources.localizableStrings.Column14Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column15: {
					uId: "3e840f4e-d535-4de1-aefd-fb27de340351",
					name: "Column15",
					caption: resources.localizableStrings.Column15Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column16: {
					uId: "ca14eb42-8293-4cd8-bc1f-cca215d4e714",
					name: "Column16",
					caption: resources.localizableStrings.Column16Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column17: {
					uId: "1109c8f6-71eb-4ba2-9a55-44cd3b771362",
					name: "Column17",
					caption: resources.localizableStrings.Column17Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column18: {
					uId: "0fe0e83c-065b-4cae-8ab2-84b6ceaad46c",
					name: "Column18",
					caption: resources.localizableStrings.Column18Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column19: {
					uId: "4677c6f5-e7aa-49e0-8deb-45632210accf",
					name: "Column19",
					caption: resources.localizableStrings.Column19Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column20: {
					uId: "d736a88e-2dbf-49aa-8396-d294d4fd26f3",
					name: "Column20",
					caption: resources.localizableStrings.Column20Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column21: {
					uId: "6a9dee03-a868-4587-8354-adbf17016479",
					name: "Column21",
					caption: resources.localizableStrings.Column21Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column22: {
					uId: "d070955a-9438-437e-94f1-a78a6e0200d7",
					name: "Column22",
					caption: resources.localizableStrings.Column22Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column23: {
					uId: "6232e346-617d-4789-897b-25855150f4dd",
					name: "Column23",
					caption: resources.localizableStrings.Column23Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column24: {
					uId: "aa99a304-2fab-46e4-8814-4cb9921a2966",
					name: "Column24",
					caption: resources.localizableStrings.Column24Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column25: {
					uId: "0af5415a-2122-480d-b539-1f64c63f041d",
					name: "Column25",
					caption: resources.localizableStrings.Column25Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column26: {
					uId: "61fc2063-f068-49f3-ae52-f4bd3e3eb50d",
					name: "Column26",
					caption: resources.localizableStrings.Column26Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column27: {
					uId: "2e303ce3-5a20-490c-af5c-14859a174bd0",
					name: "Column27",
					caption: resources.localizableStrings.Column27Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column28: {
					uId: "88b73402-bb44-4139-ac1e-caa674458c6a",
					name: "Column28",
					caption: resources.localizableStrings.Column28Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column29: {
					uId: "345f4800-2617-4f3e-b89d-3df86fc8ba7e",
					name: "Column29",
					caption: resources.localizableStrings.Column29Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column30: {
					uId: "20750bc4-6d0c-4e08-8c63-d5aa7b2d7f60",
					name: "Column30",
					caption: resources.localizableStrings.Column30Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ImportSessionId: {
					uId: "3e3d4919-7fb7-46fb-b3cd-d8da39f241ee",
					name: "ImportSessionId",
					caption: resources.localizableStrings.ImportSessionIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column31: {
					uId: "e9305713-9ddc-41f8-a8c7-c8f46de4dcee",
					name: "Column31",
					caption: resources.localizableStrings.Column31Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column32: {
					uId: "a3fe5bee-395d-4269-9203-558334d3e3bd",
					name: "Column32",
					caption: resources.localizableStrings.Column32Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column33: {
					uId: "187e2f98-fb20-4ee2-8f84-449c4552c714",
					name: "Column33",
					caption: resources.localizableStrings.Column33Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column34: {
					uId: "ebb6fb5c-12bb-4831-8bf9-b8de6798692a",
					name: "Column34",
					caption: resources.localizableStrings.Column34Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column35: {
					uId: "a224199e-5bd1-4e6d-9527-3650d3e7575a",
					name: "Column35",
					caption: resources.localizableStrings.Column35Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column36: {
					uId: "eebec8ab-58f1-4ee8-b52f-315712a389f9",
					name: "Column36",
					caption: resources.localizableStrings.Column36Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column37: {
					uId: "c3b22dea-773f-4422-9282-9588b19146ea",
					name: "Column37",
					caption: resources.localizableStrings.Column37Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column38: {
					uId: "23041f9c-3792-44a4-9e03-52767c40e9c5",
					name: "Column38",
					caption: resources.localizableStrings.Column38Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column39: {
					uId: "a2f8630f-cfe6-4c3f-bb26-e1b4ac4d31b2",
					name: "Column39",
					caption: resources.localizableStrings.Column39Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column40: {
					uId: "26ec786c-bee1-4684-8d85-8c646b81b8b2",
					name: "Column40",
					caption: resources.localizableStrings.Column40Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column41: {
					uId: "7f22b64b-4a32-4941-9fab-549e7f25135e",
					name: "Column41",
					caption: resources.localizableStrings.Column41Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column42: {
					uId: "a92961e1-2df9-437f-be2b-da3afacbaa5d",
					name: "Column42",
					caption: resources.localizableStrings.Column42Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column43: {
					uId: "688d76b7-ffad-4ec1-9f06-e9379fe6969f",
					name: "Column43",
					caption: resources.localizableStrings.Column43Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column44: {
					uId: "5b41ae17-1aae-4984-9c03-df6ae655268e",
					name: "Column44",
					caption: resources.localizableStrings.Column44Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column45: {
					uId: "e40130a6-74c8-4a39-89d8-b4bb8e0ca78f",
					name: "Column45",
					caption: resources.localizableStrings.Column45Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column46: {
					uId: "c4bebcc1-df91-4906-9ab7-a496021e530f",
					name: "Column46",
					caption: resources.localizableStrings.Column46Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column47: {
					uId: "9b88e1ac-6e0e-472d-82d0-91e56c5cb460",
					name: "Column47",
					caption: resources.localizableStrings.Column47Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column48: {
					uId: "0573c7d3-277f-4886-9b68-e9ada0662661",
					name: "Column48",
					caption: resources.localizableStrings.Column48Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column49: {
					uId: "176ce0d6-266c-44c6-8e63-3d8dc199dc4c",
					name: "Column49",
					caption: resources.localizableStrings.Column49Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Column50: {
					uId: "d57e2c55-0e2a-4e1a-9a8a-2e007e4d50fb",
					name: "Column50",
					caption: resources.localizableStrings.Column50Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.BufferedImportEntity;
	});