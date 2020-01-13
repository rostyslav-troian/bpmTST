define("BulkEmailSplitSegment", ["terrasoft", "ext-base", "BulkEmailSplitSegmentResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.BulkEmailSplitSegment", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.BulkEmailSplitSegment",
			singleton: true,
			uId: "39954c7a-d9c6-4ea9-8929-ace9416393af",
			name: "BulkEmailSplitSegment",
			caption: resources.localizableStrings.BulkEmailSplitSegmentCaption,
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
				Segment: {
					uId: "0c038939-e426-414c-8681-606b2f85a337",
					name: "Segment",
					caption: resources.localizableStrings.SegmentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "ContactFolder",
					referenceSchema: {
						name: "ContactFolder",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				BulkEmailSplit: {
					uId: "4f4e7cf5-30a7-40d9-b073-baa2ab01d2e2",
					name: "BulkEmailSplit",
					caption: resources.localizableStrings.BulkEmailSplitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "BulkEmailSplit",
					referenceSchema: {
						name: "BulkEmailSplit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				State: {
					uId: "830e3ee2-840b-4dab-8907-73aff4dd060c",
					name: "State",
					caption: resources.localizableStrings.StateCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: false,
					isLookup: true,
					referenceSchemaName: "SegmentStatus",
					referenceSchema: {
						name: "SegmentStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.BulkEmailSplitSegment;
	});