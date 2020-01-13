define("CaseLifecycle", ["terrasoft", "ext-base", "CaseLifecycleResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.CaseLifecycle", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.CaseLifecycle",
			singleton: true,
			uId: "9e784f54-ca3c-4052-81da-c3eb95cabfaf",
			name: "CaseLifecycle",
			caption: resources.localizableStrings.CaseLifecycleCaption,
			administratedByRecords: false,
			administratedByOperations: true,
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
				Case: {
					uId: "364dbe81-f3a7-457e-852c-656d87a9f035",
					name: "Case",
					caption: resources.localizableStrings.CaseCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Case",
					referenceSchema: {
						name: "Case",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Status: {
					uId: "8cc3e833-3a00-4d76-b1a4-b387766aefc9",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CaseStatus",
					referenceSchema: {
						name: "CaseStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				StartDate: {
					uId: "4b0f983b-62bc-4312-b5c8-ef3f4777a648",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				EndDate: {
					uId: "7ab897fc-723d-4308-a5d5-7a14c468b68a",
					name: "EndDate",
					caption: resources.localizableStrings.EndDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StateDurationInMinutes: {
					uId: "9d844746-0912-4ddb-af41-8b9505156e58",
					name: "StateDurationInMinutes",
					caption: resources.localizableStrings.StateDurationInMinutesCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				StateDurationInHours: {
					uId: "4d5400f3-8d80-4143-997f-1c516a4b53e3",
					name: "StateDurationInHours",
					caption: resources.localizableStrings.StateDurationInHoursCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 1
				},
				StateDurationInDays: {
					uId: "73eab705-d1e4-41ab-8c47-8a67c2c2d17d",
					name: "StateDurationInDays",
					caption: resources.localizableStrings.StateDurationInDaysCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				Priority: {
					uId: "48111028-c4c6-4dba-9628-dcd94520bbc2",
					name: "Priority",
					caption: resources.localizableStrings.PriorityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "CasePriority",
					referenceSchema: {
						name: "CasePriority",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ServiceItem: {
					uId: "d63beda7-1095-4e44-8752-2e2510cb834f",
					name: "ServiceItem",
					caption: resources.localizableStrings.ServiceItemCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ServiceItem",
					referenceSchema: {
						name: "ServiceItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Owner: {
					uId: "a69f0071-b870-40ec-a586-91a9525b17e1",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
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
				ResponseOverdue: {
					uId: "8aad72d4-4c32-4a23-93e1-7644983e6227",
					name: "ResponseOverdue",
					caption: resources.localizableStrings.ResponseOverdueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SolutionOverdue: {
					uId: "d9fa88c9-2ebe-432c-80b1-c9fcef226169",
					name: "SolutionOverdue",
					caption: resources.localizableStrings.SolutionOverdueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Group: {
					uId: "a3b3d3dd-20d0-410f-9c3b-a2cc8033a2fc",
					name: "Group",
					caption: resources.localizableStrings.GroupCaption,
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
				SolutionProvidedOn: {
					uId: "a0518029-d0d8-4979-9b77-d911461da6d6",
					name: "SolutionProvidedOn",
					caption: resources.localizableStrings.SolutionProvidedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SolutionDate: {
					uId: "86da069d-cf8b-4226-8430-8e23d7469d08",
					name: "SolutionDate",
					caption: resources.localizableStrings.SolutionDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.CaseLifecycle;
	});