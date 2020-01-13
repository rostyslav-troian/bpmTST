define("VwSubProcessInProcess", ["terrasoft", "ext-base", "VwSubProcessInProcessResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSubProcessInProcess", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSubProcessInProcess",
			singleton: true,
			uId: "a10f252b-6909-4b86-ae7f-5eae28c78e12",
			name: "VwSubProcessInProcess",
			caption: resources.localizableStrings.VwSubProcessInProcessCaption,
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
				HostProcess: {
					uId: "462ab5a4-d59d-41f7-9e05-ca80a935cf00",
					name: "HostProcess",
					caption: resources.localizableStrings.HostProcessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwProcessLib",
					referenceSchema: {
						name: "VwProcessLib",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ParentProcess: {
					uId: "cc877183-d49f-4b8b-82a4-4eeab7ed525a",
					name: "ParentProcess",
					caption: resources.localizableStrings.ParentProcessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwProcessLib",
					referenceSchema: {
						name: "VwProcessLib",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				SubProcess: {
					uId: "a3aced01-18cf-43bb-ab73-dca82a7cfa3e",
					name: "SubProcess",
					caption: resources.localizableStrings.SubProcessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwProcessLib",
					referenceSchema: {
						name: "VwProcessLib",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ParentSubProcess: {
					uId: "92ca3bc9-2ed6-4388-b826-697e1d1c7fa0",
					name: "ParentSubProcess",
					caption: resources.localizableStrings.ParentSubProcessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwProcessLib",
					referenceSchema: {
						name: "VwProcessLib",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				ActiveSubProcess: {
					uId: "1a783861-0266-486a-b584-e68d40e9a48b",
					name: "ActiveSubProcess",
					caption: resources.localizableStrings.ActiveSubProcessCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VwProcessLib",
					referenceSchema: {
						name: "VwProcessLib",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				}
			}
		});
		return Terrasoft.VwSubProcessInProcess;
	});