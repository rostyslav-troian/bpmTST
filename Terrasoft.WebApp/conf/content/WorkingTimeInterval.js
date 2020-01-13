define("WorkingTimeInterval", ["terrasoft", "ext-base", "WorkingTimeIntervalResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.WorkingTimeInterval", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.WorkingTimeInterval",
			singleton: true,
			uId: "3c971b13-45b1-49f4-af05-db8566668def",
			name: "WorkingTimeInterval",
			caption: resources.localizableStrings.WorkingTimeIntervalCaption,
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
				DayInCalendar: {
					uId: "1cca11f5-a9a8-4121-948c-9440212c73d5",
					name: "DayInCalendar",
					caption: resources.localizableStrings.DayInCalendarCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "DayInCalendar",
					referenceSchema: {
						name: "DayInCalendar",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				From: {
					uId: "d5043099-3e07-4aaf-9cf4-3faad2243c72",
					name: "From",
					caption: resources.localizableStrings.FromCaption,
					dataValueType: Terrasoft.DataValueType.TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				To: {
					uId: "45d1db09-15c2-47f6-b437-2ed41d7c1e61",
					name: "To",
					caption: resources.localizableStrings.ToCaption,
					dataValueType: Terrasoft.DataValueType.TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Index: {
					uId: "1649e728-2418-4a49-b71d-556593140c7e",
					name: "Index",
					caption: resources.localizableStrings.IndexCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DayOff: {
					uId: "e669ecc9-ac38-4001-a477-92777c072f08",
					name: "DayOff",
					caption: resources.localizableStrings.DayOffCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "DayOff",
					referenceSchema: {
						name: "DayOff",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				}
			}
		});
		return Terrasoft.WorkingTimeInterval;
	});