define("SysModuleReport", ["terrasoft", "ext-base", "SysModuleReportResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SysModuleReport", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SysModuleReport",
			singleton: true,
			uId: "0a62cd3d-6541-4c5c-903f-e5b0fc665297",
			name: "SysModuleReport",
			caption: resources.localizableStrings.SysModuleReportCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Caption",
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
				Caption: {
					uId: "3fb83606-040e-4fdb-aeb6-a9357886dcb3",
					name: "Caption",
					caption: resources.localizableStrings.CaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 50
				},
				SysModule: {
					uId: "b6607c22-ca01-41f0-8637-610221a869b6",
					name: "SysModule",
					caption: resources.localizableStrings.SysModuleCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SysModule",
					referenceSchema: {
						name: "SysModule",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				AutoPreview: {
					uId: "b99f16cb-925d-48f2-94e9-98f9eb249048",
					name: "AutoPreview",
					caption: resources.localizableStrings.AutoPreviewCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				HelpContextId: {
					uId: "5c6855ee-1bce-4a62-901b-50482def049b",
					name: "HelpContextId",
					caption: resources.localizableStrings.HelpContextIdCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
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
				MacrosList: {
					uId: "aba36b7e-96c2-4005-a9b9-64ceee36aaac",
					name: "MacrosList",
					caption: resources.localizableStrings.MacrosListCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Type: {
					uId: "94f2a9f7-55c7-4ecf-9b64-17583ddc058b",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SysModuleReportType",
					referenceSchema: {
						name: "SysModuleReportType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				File: {
					uId: "cb6b495c-384d-4a40-9f93-35c6dfb79a3b",
					name: "File",
					caption: resources.localizableStrings.FileCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				FileName: {
					uId: "362bb0b0-d3da-4b01-abe6-a617e1b1257f",
					name: "FileName",
					caption: resources.localizableStrings.FileNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				SysReportSchemaUId: {
					uId: "8e01622f-e04b-480a-859a-01df55c30729",
					name: "SysReportSchemaUId",
					caption: resources.localizableStrings.SysReportSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SysOptionsPageSchemaUId: {
					uId: "1f17f6cb-8a86-408c-9207-d2f8b22ae1b7",
					name: "SysOptionsPageSchemaUId",
					caption: resources.localizableStrings.SysOptionsPageSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ShowInSection: {
					uId: "3b976c18-5bfe-482a-8ac1-a9377075a627",
					name: "ShowInSection",
					caption: resources.localizableStrings.ShowInSectionCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ShowInCard: {
					uId: "9a75dacc-e0b6-456c-af91-1a1a369eaa3b",
					name: "ShowInCard",
					caption: resources.localizableStrings.ShowInCardCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ConvertInPDF: {
					uId: "025ae038-8c4b-46b8-8d94-239ef3ac7911",
					name: "ConvertInPDF",
					caption: resources.localizableStrings.ConvertInPDFCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TypeColumnValue: {
					uId: "e6df7487-eab8-49eb-8f5b-e8a222db5de3",
					name: "TypeColumnValue",
					caption: resources.localizableStrings.TypeColumnValueCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				}
			}
		});
		return Terrasoft.SysModuleReport;
	});