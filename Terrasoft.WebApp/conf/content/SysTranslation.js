define("SysTranslation", ["terrasoft", "ext-base", "SysTranslationResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysTranslation", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysTranslation",
			singleton: true,
			uId: "4a564759-cf96-48d9-ae57-97bbb9c0b951",
			name: "SysTranslation",
			caption: resources.localizableStrings.SysTranslationCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Key",
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
				Key: {
					uId: "4e54682a-31c5-4ec3-b1e9-d291901bfc9e",
					name: "Key",
					caption: resources.localizableStrings.KeyCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					size: 250
				},
				Language0: {
					uId: "2ec7a8e1-bda1-45f1-8038-8c9d6ee310ed",
					name: "Language0",
					caption: resources.localizableStrings.Language0Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language1: {
					uId: "d6083d73-a1ce-4f49-8cb8-01de8db77af6",
					name: "Language1",
					caption: resources.localizableStrings.Language1Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language2: {
					uId: "113fb377-47d2-444b-b8d4-0847dbb63ca3",
					name: "Language2",
					caption: resources.localizableStrings.Language2Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language3: {
					uId: "7a63c135-6350-4e15-af20-ae7553afd1e9",
					name: "Language3",
					caption: resources.localizableStrings.Language3Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language4: {
					uId: "db708816-23d4-43bd-8eb7-5f46a021f2c3",
					name: "Language4",
					caption: resources.localizableStrings.Language4Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language5: {
					uId: "a1deada4-b1d5-4d72-b92b-5ee7a9dcf808",
					name: "Language5",
					caption: resources.localizableStrings.Language5Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language6: {
					uId: "e02df9b3-41a3-48f2-ada7-f646b4e6cf46",
					name: "Language6",
					caption: resources.localizableStrings.Language6Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language7: {
					uId: "7a28646b-7a1d-46fd-a095-638905442eaf",
					name: "Language7",
					caption: resources.localizableStrings.Language7Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language8: {
					uId: "312972d9-b3a7-4647-9e3f-ef1dd53867bf",
					name: "Language8",
					caption: resources.localizableStrings.Language8Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language9: {
					uId: "a159185b-84dd-4fe8-a21b-e27b7f1ae509",
					name: "Language9",
					caption: resources.localizableStrings.Language9Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified0: {
					uId: "5551a508-bb63-4e92-abcc-459226c10967",
					name: "IsVerified0",
					caption: resources.localizableStrings.IsVerified0Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified1: {
					uId: "f9fd8b05-9437-499a-bd61-4fb757c5e93a",
					name: "IsVerified1",
					caption: resources.localizableStrings.IsVerified1Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified2: {
					uId: "70ebca63-31fd-4660-aca0-f121d8364f8d",
					name: "IsVerified2",
					caption: resources.localizableStrings.IsVerified2Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified3: {
					uId: "8ba15eda-adf6-40cd-a328-5486b63e7e83",
					name: "IsVerified3",
					caption: resources.localizableStrings.IsVerified3Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified4: {
					uId: "67ad9d20-ff6c-4be5-bdcd-c88425f2b88c",
					name: "IsVerified4",
					caption: resources.localizableStrings.IsVerified4Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified5: {
					uId: "127a8bf4-4468-4cab-b3ff-7c2337e9c0ec",
					name: "IsVerified5",
					caption: resources.localizableStrings.IsVerified5Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified6: {
					uId: "4bf92d3a-9799-4ae3-9540-13a4ae135ce2",
					name: "IsVerified6",
					caption: resources.localizableStrings.IsVerified6Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified7: {
					uId: "5052c476-9f8e-4220-95fa-c75d1042b7d0",
					name: "IsVerified7",
					caption: resources.localizableStrings.IsVerified7Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified8: {
					uId: "c0297e29-a2e8-43a8-8537-d8a92a358fb9",
					name: "IsVerified8",
					caption: resources.localizableStrings.IsVerified8Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified9: {
					uId: "cf773afc-033f-48db-99de-d52c78c848cf",
					name: "IsVerified9",
					caption: resources.localizableStrings.IsVerified9Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged0: {
					uId: "8cb78c5b-b362-4c6d-ae55-665a29ebbec0",
					name: "IsChanged0",
					caption: resources.localizableStrings.IsChanged0Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged1: {
					uId: "db362f56-b1ec-4efc-b1a6-f25ac4e66c9c",
					name: "IsChanged1",
					caption: resources.localizableStrings.IsChanged1Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged2: {
					uId: "249f0a0e-5b79-445d-ae09-62c431e62802",
					name: "IsChanged2",
					caption: resources.localizableStrings.IsChanged2Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged3: {
					uId: "1f10ced2-9735-498e-a313-5c798e0c48e2",
					name: "IsChanged3",
					caption: resources.localizableStrings.IsChanged3Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged4: {
					uId: "f3a685ec-f704-4e02-bff9-5d7b62a99548",
					name: "IsChanged4",
					caption: resources.localizableStrings.IsChanged4Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged5: {
					uId: "90f169b1-6f0a-498f-8f6e-a8c1d429e39c",
					name: "IsChanged5",
					caption: resources.localizableStrings.IsChanged5Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged6: {
					uId: "472f1dc3-eac2-4f2c-8831-366cc3eaf84c",
					name: "IsChanged6",
					caption: resources.localizableStrings.IsChanged6Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged7: {
					uId: "2cb95690-896f-486c-8be4-5dff742fffec",
					name: "IsChanged7",
					caption: resources.localizableStrings.IsChanged7Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged8: {
					uId: "88a18436-7505-4c77-9bef-a44e2dbea4b6",
					name: "IsChanged8",
					caption: resources.localizableStrings.IsChanged8Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged9: {
					uId: "584d8f47-54e4-44dd-882b-01c6ed74c2ef",
					name: "IsChanged9",
					caption: resources.localizableStrings.IsChanged9Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language10: {
					uId: "b660805a-93ce-4205-8c07-5ea919badfb0",
					name: "Language10",
					caption: resources.localizableStrings.Language10Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language11: {
					uId: "2895cab7-493e-4fa0-b4c8-feccfeab8d16",
					name: "Language11",
					caption: resources.localizableStrings.Language11Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language12: {
					uId: "25f36736-1938-4fa4-996d-bb17f6933fc3",
					name: "Language12",
					caption: resources.localizableStrings.Language12Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language13: {
					uId: "60838d5f-7537-44fd-ad1f-4bdb50a54541",
					name: "Language13",
					caption: resources.localizableStrings.Language13Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language14: {
					uId: "b3ee34f3-ce8d-436f-b675-cd8c9c224df8",
					name: "Language14",
					caption: resources.localizableStrings.Language14Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language15: {
					uId: "7a937094-5dc2-4a32-95da-06e00f1139e0",
					name: "Language15",
					caption: resources.localizableStrings.Language15Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language16: {
					uId: "35d10ee8-41dc-48bf-8659-568cdef39c0a",
					name: "Language16",
					caption: resources.localizableStrings.Language16Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language17: {
					uId: "8c82395d-354d-451d-aad9-ec3ebf5de014",
					name: "Language17",
					caption: resources.localizableStrings.Language17Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language18: {
					uId: "e9ed5185-278f-4a43-a061-29e948852e32",
					name: "Language18",
					caption: resources.localizableStrings.Language18Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language19: {
					uId: "31388a0e-8db5-4496-aa7a-04303f7fe5fd",
					name: "Language19",
					caption: resources.localizableStrings.Language19Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language20: {
					uId: "d416a27a-0a72-4638-813e-9feff82b71cc",
					name: "Language20",
					caption: resources.localizableStrings.Language20Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language21: {
					uId: "bf358b7e-6e84-43d1-9150-d65f579aea87",
					name: "Language21",
					caption: resources.localizableStrings.Language21Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language22: {
					uId: "ff995c89-7283-44bd-b06e-a5c402b02988",
					name: "Language22",
					caption: resources.localizableStrings.Language22Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language23: {
					uId: "e0eef4f9-5d80-42c3-a213-d9b2316819a7",
					name: "Language23",
					caption: resources.localizableStrings.Language23Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language24: {
					uId: "c97d0e51-e6e4-459f-ab83-de017c36ab2f",
					name: "Language24",
					caption: resources.localizableStrings.Language24Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language25: {
					uId: "99ff77a8-b873-4ce0-bb20-64696be2c627",
					name: "Language25",
					caption: resources.localizableStrings.Language25Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language26: {
					uId: "3b872cdb-cd76-4891-992d-da4b5337ded6",
					name: "Language26",
					caption: resources.localizableStrings.Language26Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language27: {
					uId: "bfdd9315-a491-4272-b9c2-e1dc49b85ba5",
					name: "Language27",
					caption: resources.localizableStrings.Language27Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language28: {
					uId: "d7f3dd56-94fe-4922-9974-37db8bdf932b",
					name: "Language28",
					caption: resources.localizableStrings.Language28Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language29: {
					uId: "7fba7ad8-cb09-46b7-aa22-4fced486e021",
					name: "Language29",
					caption: resources.localizableStrings.Language29Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language30: {
					uId: "e14a9e9b-cc27-42f5-bbda-5bba8348a5ca",
					name: "Language30",
					caption: resources.localizableStrings.Language30Caption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified10: {
					uId: "363ce737-e745-4c50-ab60-75214785f4d8",
					name: "IsVerified10",
					caption: resources.localizableStrings.IsVerified10Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified11: {
					uId: "a9555a78-3734-4fb7-b5b9-ea000313d4a1",
					name: "IsVerified11",
					caption: resources.localizableStrings.IsVerified11Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified12: {
					uId: "72f0c330-fd85-4c81-bf09-e846eaf0e01c",
					name: "IsVerified12",
					caption: resources.localizableStrings.IsVerified12Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified13: {
					uId: "1a8e092e-4f69-4adb-8318-e06815073178",
					name: "IsVerified13",
					caption: resources.localizableStrings.IsVerified13Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified14: {
					uId: "c8601f44-b46c-4080-8ed9-d388be1e9a43",
					name: "IsVerified14",
					caption: resources.localizableStrings.IsVerified14Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified15: {
					uId: "5f701f56-4cae-460d-a8f0-08f3e4255e77",
					name: "IsVerified15",
					caption: resources.localizableStrings.IsVerified15Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified16: {
					uId: "5ee1b637-4766-40da-98a0-a3a8dd6a3df3",
					name: "IsVerified16",
					caption: resources.localizableStrings.IsVerified16Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified17: {
					uId: "8c14177f-643c-4f56-ac50-edfdc50b74ff",
					name: "IsVerified17",
					caption: resources.localizableStrings.IsVerified17Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified18: {
					uId: "6f35fc91-a078-461f-b7a2-65d79fad86e3",
					name: "IsVerified18",
					caption: resources.localizableStrings.IsVerified18Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified19: {
					uId: "84f672ab-d268-4084-a96d-721b7cbacd2a",
					name: "IsVerified19",
					caption: resources.localizableStrings.IsVerified19Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified20: {
					uId: "dd2f9d93-1cef-4e0f-ac70-c0f0bf2f8d42",
					name: "IsVerified20",
					caption: resources.localizableStrings.IsVerified20Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified21: {
					uId: "6ff14239-5454-4450-a00f-86eabb7ec06a",
					name: "IsVerified21",
					caption: resources.localizableStrings.IsVerified21Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified22: {
					uId: "6a9c8d59-6e76-4b5f-8bfc-a4a659827f86",
					name: "IsVerified22",
					caption: resources.localizableStrings.IsVerified22Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified23: {
					uId: "eddc2538-c371-499d-99fb-134827bba9b7",
					name: "IsVerified23",
					caption: resources.localizableStrings.IsVerified23Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified24: {
					uId: "0b79d6b3-6d1a-429e-a12a-179ce5828a2a",
					name: "IsVerified24",
					caption: resources.localizableStrings.IsVerified24Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified25: {
					uId: "6772bde1-06b6-49a9-a306-94b3daf6bbc7",
					name: "IsVerified25",
					caption: resources.localizableStrings.IsVerified25Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified26: {
					uId: "c3ca9919-eed4-4bcd-86a7-defc66b0e397",
					name: "IsVerified26",
					caption: resources.localizableStrings.IsVerified26Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified27: {
					uId: "7fe2dae2-708d-4b86-914c-4fad61c5da5d",
					name: "IsVerified27",
					caption: resources.localizableStrings.IsVerified27Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified28: {
					uId: "e5716d37-153d-4385-bcaa-8c0da867bee9",
					name: "IsVerified28",
					caption: resources.localizableStrings.IsVerified28Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified29: {
					uId: "23d06938-2239-4c15-b8a1-b39ee6b05eb0",
					name: "IsVerified29",
					caption: resources.localizableStrings.IsVerified29Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsVerified30: {
					uId: "8892f5ee-d627-41cc-afec-de4355272014",
					name: "IsVerified30",
					caption: resources.localizableStrings.IsVerified30Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged10: {
					uId: "98449d55-0dce-4e49-ba6f-373c599f4e57",
					name: "IsChanged10",
					caption: resources.localizableStrings.IsChanged10Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged11: {
					uId: "241dd570-e9cf-4b72-8c30-5f76e58c8c2b",
					name: "IsChanged11",
					caption: resources.localizableStrings.IsChanged11Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged12: {
					uId: "3e757d67-38d3-4842-a9f7-3312efb6b411",
					name: "IsChanged12",
					caption: resources.localizableStrings.IsChanged12Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged13: {
					uId: "163c3906-00dd-4c20-8c82-785ad579ede7",
					name: "IsChanged13",
					caption: resources.localizableStrings.IsChanged13Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged14: {
					uId: "d7eb9557-486f-405d-ac92-4294c352628e",
					name: "IsChanged14",
					caption: resources.localizableStrings.IsChanged14Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged15: {
					uId: "f0841c66-af84-49c4-ab03-e9f7a349facf",
					name: "IsChanged15",
					caption: resources.localizableStrings.IsChanged15Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged16: {
					uId: "722faacd-d97d-4b64-8661-c07472086a25",
					name: "IsChanged16",
					caption: resources.localizableStrings.IsChanged16Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged17: {
					uId: "af96d99c-ec23-4043-bde8-f97e7db3ed8e",
					name: "IsChanged17",
					caption: resources.localizableStrings.IsChanged17Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged18: {
					uId: "5c0e60f4-b9ba-496f-b56a-50dbdebb898c",
					name: "IsChanged18",
					caption: resources.localizableStrings.IsChanged18Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged19: {
					uId: "96d13aa6-c170-4694-ae0d-d0463651e41d",
					name: "IsChanged19",
					caption: resources.localizableStrings.IsChanged19Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged20: {
					uId: "49d434fa-e9e7-4cba-9fd9-5a0306d3d2b7",
					name: "IsChanged20",
					caption: resources.localizableStrings.IsChanged20Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged21: {
					uId: "0df6886f-97eb-4752-82a8-0da5dee6249c",
					name: "IsChanged21",
					caption: resources.localizableStrings.IsChanged21Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged22: {
					uId: "39ef4e05-1810-4cb6-a977-23f681dd659d",
					name: "IsChanged22",
					caption: resources.localizableStrings.IsChanged22Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged23: {
					uId: "26a7838b-a83d-43c6-a396-a17936c07a17",
					name: "IsChanged23",
					caption: resources.localizableStrings.IsChanged23Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged24: {
					uId: "0cdd4104-cdc1-4b57-8483-01a43244859e",
					name: "IsChanged24",
					caption: resources.localizableStrings.IsChanged24Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged25: {
					uId: "9f1041fe-571e-4a58-b68e-9f728f488f9c",
					name: "IsChanged25",
					caption: resources.localizableStrings.IsChanged25Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged26: {
					uId: "d4fe99db-e84c-49c2-a768-f6652ee1acfe",
					name: "IsChanged26",
					caption: resources.localizableStrings.IsChanged26Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged27: {
					uId: "419266c3-e19b-4b2c-83ef-9d2a9b936187",
					name: "IsChanged27",
					caption: resources.localizableStrings.IsChanged27Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged28: {
					uId: "02036514-fbb6-463d-9e07-cd89369e00f8",
					name: "IsChanged28",
					caption: resources.localizableStrings.IsChanged28Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged29: {
					uId: "aa124d6e-753c-45eb-939c-d61fc83d0fce",
					name: "IsChanged29",
					caption: resources.localizableStrings.IsChanged29Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				IsChanged30: {
					uId: "addfc1e0-c1e6-4561-b00b-74f7c123da75",
					name: "IsChanged30",
					caption: resources.localizableStrings.IsChanged30Caption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Language0Short: {
					uId: "ead9f0f9-8b1b-4b01-9909-c0c388bc3d87",
					name: "Language0Short",
					caption: resources.localizableStrings.Language0ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language1Short: {
					uId: "ce3656a3-ad7d-4a5d-bb9e-3ee49ff631de",
					name: "Language1Short",
					caption: resources.localizableStrings.Language1ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language2Short: {
					uId: "cc6140b8-79de-44ea-8c87-bbdb8b119be3",
					name: "Language2Short",
					caption: resources.localizableStrings.Language2ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language3Short: {
					uId: "aad4b88c-e4b5-441b-abbd-1178462e7eb2",
					name: "Language3Short",
					caption: resources.localizableStrings.Language3ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language4Short: {
					uId: "42a45adf-2690-4271-9578-c786a4695796",
					name: "Language4Short",
					caption: resources.localizableStrings.Language4ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language5Short: {
					uId: "993dc791-47a4-4b76-a58e-df13a575d462",
					name: "Language5Short",
					caption: resources.localizableStrings.Language5ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language6Short: {
					uId: "44ea85a1-46a7-40df-a981-9bd9898f80b9",
					name: "Language6Short",
					caption: resources.localizableStrings.Language6ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language7Short: {
					uId: "f587e1f0-cd1a-497e-9817-09bc3a381b48",
					name: "Language7Short",
					caption: resources.localizableStrings.Language7ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language8Short: {
					uId: "0f3b754a-2b40-4a80-934b-97c8e9a09772",
					name: "Language8Short",
					caption: resources.localizableStrings.Language8ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language9Short: {
					uId: "5056540b-d232-4b74-a299-4225acdb1847",
					name: "Language9Short",
					caption: resources.localizableStrings.Language9ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language10Short: {
					uId: "0cf89ab4-26e0-4f23-a0d7-f721d39eaaa0",
					name: "Language10Short",
					caption: resources.localizableStrings.Language10ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language11Short: {
					uId: "40a049ca-a293-43c5-9304-661202c1d86a",
					name: "Language11Short",
					caption: resources.localizableStrings.Language11ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language12Short: {
					uId: "4ddf08b2-2767-4afd-8bc3-4229e0ccd8d3",
					name: "Language12Short",
					caption: resources.localizableStrings.Language12ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language13Short: {
					uId: "41e6bdee-287e-4caa-82e2-4ddc5092ca49",
					name: "Language13Short",
					caption: resources.localizableStrings.Language13ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language14Short: {
					uId: "fddf606f-3c8f-433f-b9a4-bffbad5cec20",
					name: "Language14Short",
					caption: resources.localizableStrings.Language14ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language15Short: {
					uId: "4b682718-9aa5-4834-af36-f2af4a5e68ad",
					name: "Language15Short",
					caption: resources.localizableStrings.Language15ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language16Short: {
					uId: "ec08203f-22a8-472b-b6f7-2ac332fc5f85",
					name: "Language16Short",
					caption: resources.localizableStrings.Language16ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language17Short: {
					uId: "78788498-e85a-4f3b-8f48-7ed04f1de4b9",
					name: "Language17Short",
					caption: resources.localizableStrings.Language17ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language18Short: {
					uId: "a14c9923-c42f-412c-a77a-8db648f1a96f",
					name: "Language18Short",
					caption: resources.localizableStrings.Language18ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language19Short: {
					uId: "7180df09-88b4-4a6c-9377-d5ca0c5033f3",
					name: "Language19Short",
					caption: resources.localizableStrings.Language19ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language20Short: {
					uId: "d9456e2d-9f91-4e35-8119-76a2f5fcd12e",
					name: "Language20Short",
					caption: resources.localizableStrings.Language20ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language21Short: {
					uId: "c8d1375f-4386-49e4-a525-bffee6457acd",
					name: "Language21Short",
					caption: resources.localizableStrings.Language21ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language22Short: {
					uId: "a778af48-7eb9-40f0-844d-26a4789dc26e",
					name: "Language22Short",
					caption: resources.localizableStrings.Language22ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language23Short: {
					uId: "449f9fee-6e85-4338-9f6c-b5920fa3cf9f",
					name: "Language23Short",
					caption: resources.localizableStrings.Language23ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language24Short: {
					uId: "d39f10b9-8ccd-49f6-8515-75d4209d0064",
					name: "Language24Short",
					caption: resources.localizableStrings.Language24ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language25Short: {
					uId: "b94e98db-e7bc-4030-8acc-1b422110676b",
					name: "Language25Short",
					caption: resources.localizableStrings.Language25ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language26Short: {
					uId: "17f99c85-5618-4649-9189-609b170b9b88",
					name: "Language26Short",
					caption: resources.localizableStrings.Language26ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language27Short: {
					uId: "53d7cb24-7e6b-4331-aa8a-146c0600e750",
					name: "Language27Short",
					caption: resources.localizableStrings.Language27ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language28Short: {
					uId: "f75e0b47-7c3a-4059-8c94-26609978b6f7",
					name: "Language28Short",
					caption: resources.localizableStrings.Language28ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language29Short: {
					uId: "bfc8fa4c-293e-4f23-8366-a262a3c0b1ad",
					name: "Language29Short",
					caption: resources.localizableStrings.Language29ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Language30Short: {
					uId: "cd1f2eb5-91f5-4588-851b-1b39ff76782e",
					name: "Language30Short",
					caption: resources.localizableStrings.Language30ShortCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ErrorMessage: {
					uId: "57b0e5bd-8222-4e20-8e5c-85b88c2f21b8",
					name: "ErrorMessage",
					caption: resources.localizableStrings.ErrorMessageCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 450
				}
			}
		});
		return Terrasoft.SysTranslation;
	});