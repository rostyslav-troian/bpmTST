define("SysSyncMetaData", ["terrasoft", "ext-base", "SysSyncMetaDataResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysSyncMetaData", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysSyncMetaData",
			singleton: true,
			uId: "909da302-de10-490e-8715-5b0f973f043d",
			name: "SysSyncMetaData",
			caption: resources.localizableStrings.SysSyncMetaDataCaption,
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
				SyncSchemaName: {
					uId: "f3c6cf6b-5815-47a6-a48d-774343fdef83",
					name: "SyncSchemaName",
					caption: resources.localizableStrings.SyncSchemaNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				RemoteId: {
					uId: "bcd96886-4612-4a3b-9b74-6008dbd384b3",
					name: "RemoteId",
					caption: resources.localizableStrings.RemoteIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				LocalId: {
					uId: "93e6cc9b-2a32-4f5c-9e0f-5d9a1070d34d",
					name: "LocalId",
					caption: resources.localizableStrings.LocalIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				RemoteStoreId: {
					uId: "90c3bf22-22fe-4577-8ed8-d42d2a8e56e2",
					name: "RemoteStoreId",
					caption: resources.localizableStrings.RemoteStoreIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsLocalDeleted: {
					uId: "f9469c93-e18b-447c-8d4b-0d896b579cc3",
					name: "IsLocalDeleted",
					caption: resources.localizableStrings.IsLocalDeletedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsRemoteDeleted: {
					uId: "d98fa6a2-363d-4fbd-bb9a-027e1f387a85",
					name: "IsRemoteDeleted",
					caption: resources.localizableStrings.IsRemoteDeletedCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ModifiedInStoreId: {
					uId: "316cb2bf-e649-445c-ade6-7ce06f164f6f",
					name: "ModifiedInStoreId",
					caption: resources.localizableStrings.ModifiedInStoreIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Version: {
					uId: "c4968e5f-1bb6-442f-b774-7c15df22dcb6",
					name: "Version",
					caption: resources.localizableStrings.VersionCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CreatedInStoreId: {
					uId: "cf5e7e4e-5aad-4eac-844f-fda4a99f4326",
					name: "CreatedInStoreId",
					caption: resources.localizableStrings.CreatedInStoreIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				RemoteItemName: {
					uId: "85b081ae-7f9b-4a1d-bcb1-5db026dc2ead",
					name: "RemoteItemName",
					caption: resources.localizableStrings.RemoteItemNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SchemaOrder: {
					uId: "bb14fdf8-18fd-4a5d-ac6d-96881269a559",
					name: "SchemaOrder",
					caption: resources.localizableStrings.SchemaOrderCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ExtraParameters: {
					uId: "7123d468-7547-4751-a390-ef476759fa6f",
					name: "ExtraParameters",
					caption: resources.localizableStrings.ExtraParametersCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				LocalState: {
					uId: "4fd42846-2b13-48e7-8c13-4b71b2b87b64",
					name: "LocalState",
					caption: resources.localizableStrings.LocalStateCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				RemoteState: {
					uId: "b45c1f89-096e-48b0-af51-cd3d2ee0f6fe",
					name: "RemoteState",
					caption: resources.localizableStrings.RemoteStateCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				}
			}
		});
		return Terrasoft.SysSyncMetaData;
	});