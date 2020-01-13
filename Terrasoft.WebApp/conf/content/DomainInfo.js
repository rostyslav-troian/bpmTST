define("DomainInfo", ["terrasoft", "ext-base", "DomainInfoResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.DomainInfo", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.DomainInfo",
			singleton: true,
			uId: "abb2448c-6f83-4363-b02e-0afa5e052a89",
			name: "DomainInfo",
			caption: resources.localizableStrings.DomainInfoCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "bc7b7713-7483-402f-a98b-ff77ead465d2",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Domain: {
					uId: "5c1aae21-3f84-4e6b-af38-538e4e43644c",
					name: "Domain",
					caption: resources.localizableStrings.DomainCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 500
				},
				DKIMVerified: {
					uId: "7183eb9d-7615-4195-b4a4-77b24819f843",
					name: "DKIMVerified",
					caption: resources.localizableStrings.DKIMVerifiedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsNew: {
					uId: "e3af0e3e-3bc3-446c-aa03-de0e1e93f5a1",
					name: "IsNew",
					caption: resources.localizableStrings.IsNewCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				}
			}
		});
		return Terrasoft.DomainInfo;
	});