define("OAuthApplications", ["terrasoft", "ext-base", "OAuthApplicationsResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.OAuthApplications", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.OAuthApplications",
			singleton: true,
			uId: "2d30ef0a-87fb-474a-a348-a8cb46e23e6e",
			name: "OAuthApplications",
			caption: resources.localizableStrings.OAuthApplicationsCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			primaryImageColumnName: "Image",
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
				AppClassName: {
					uId: "ff56ff05-b1c4-4cca-bb1c-b1e88ce1fb36",
					name: "AppClassName",
					caption: resources.localizableStrings.AppClassNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ClientId: {
					uId: "25b81a92-15d8-43b3-a986-18007b5a2b9f",
					name: "ClientId",
					caption: resources.localizableStrings.ClientIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				SecretKey: {
					uId: "54753aca-e9e6-4efc-b67f-163fcedefdcb",
					name: "SecretKey",
					caption: resources.localizableStrings.SecretKeyCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ClientClassName: {
					uId: "636dcd5b-1bab-49e8-8f58-f1a3c9751525",
					name: "ClientClassName",
					caption: resources.localizableStrings.ClientClassNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				Name: {
					uId: "f7effb5b-0eb5-48c2-8357-7c0f833fbbbe",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				AuthorizeUrl: {
					uId: "114f5ac1-7326-48e5-a92f-c7cdccc873c1",
					name: "AuthorizeUrl",
					caption: resources.localizableStrings.AuthorizeUrlCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				TokenUrl: {
					uId: "32329b4a-92b9-4af5-9b45-d2813b24528f",
					name: "TokenUrl",
					caption: resources.localizableStrings.TokenUrlCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				RevokeTokenUrl: {
					uId: "42911b99-fe17-40a7-a9a2-c3e3331c76cf",
					name: "RevokeTokenUrl",
					caption: resources.localizableStrings.RevokeTokenUrlCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				UseSharedUser: {
					uId: "d849f752-56b3-483b-bc33-f51789c20a4c",
					name: "UseSharedUser",
					caption: resources.localizableStrings.UseSharedUserCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SharedUser: {
					uId: "bc1a953f-394c-4cda-9149-4c568c4143b4",
					name: "SharedUser",
					caption: resources.localizableStrings.SharedUserCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Image: {
					uId: "7765873b-eeb6-4764-833e-75aa88f9dfd5",
					name: "Image",
					caption: resources.localizableStrings.ImageCaption,
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
				CredentialsLocationInRequest: {
					uId: "3724e6cd-8fb6-42bb-b0f6-e77ebc33c7de",
					name: "CredentialsLocationInRequest",
					caption: resources.localizableStrings.CredentialsLocationInRequestCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.OAuthApplications;
	});