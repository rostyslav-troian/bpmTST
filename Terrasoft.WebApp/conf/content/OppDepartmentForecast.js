define("OppDepartmentForecast", ["terrasoft", "ext-base", "OppDepartmentForecastResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.OppDepartmentForecast", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.OppDepartmentForecast",
			singleton: true,
			uId: "c88d3cda-460f-4c2c-a194-d7857df830af",
			name: "OppDepartmentForecast",
			caption: resources.localizableStrings.OppDepartmentForecastCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: true,
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
				Period: {
					uId: "13a9c898-7ab7-4784-9ba0-607934f8868a",
					name: "Period",
					caption: resources.localizableStrings.PeriodCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Period",
					referenceSchema: {
						name: "Period",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "StartDate"
					}
				},
				Sheet: {
					uId: "c74827b5-2f09-40cb-9461-d327016a4dc1",
					name: "Sheet",
					caption: resources.localizableStrings.SheetCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ForecastSheet",
					referenceSchema: {
						name: "ForecastSheet",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Indicator: {
					uId: "154f4031-1e3d-40fb-b9bb-6105f0bd369b",
					name: "Indicator",
					caption: resources.localizableStrings.IndicatorCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ForecastIndicator",
					referenceSchema: {
						name: "ForecastIndicator",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Amount: {
					uId: "0a3fb99b-1aff-4b2f-a21a-4a00e81891ca",
					name: "Amount",
					caption: resources.localizableStrings.AmountCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				PrimaryAmount: {
					uId: "bc25e330-e553-424f-9893-395bd4905e23",
					name: "PrimaryAmount",
					caption: resources.localizableStrings.PrimaryAmountCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				Currency: {
					uId: "86994e3d-15be-4347-b059-33142ce79636",
					name: "Currency",
					caption: resources.localizableStrings.CurrencyCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Currency",
					referenceSchema: {
						name: "Currency",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Value: {
					uId: "21795fb2-399d-4456-9678-1a2703ea8b74",
					name: "Value",
					caption: resources.localizableStrings.ValueCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				OpportunityDepartment: {
					uId: "2f575a08-3870-413f-a2a0-8c6014b18dcc",
					name: "OpportunityDepartment",
					caption: resources.localizableStrings.OpportunityDepartmentCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OpportunityDepartment",
					referenceSchema: {
						name: "OpportunityDepartment",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Row: {
					uId: "3d9e1aa4-a486-4d06-ba84-1541c00327d5",
					name: "Row",
					caption: resources.localizableStrings.RowCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ForecastRow",
					referenceSchema: {
						name: "ForecastRow",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				ForecastColumn: {
					uId: "4f7afe87-8872-46c7-bd31-d6a74ec15319",
					name: "ForecastColumn",
					caption: resources.localizableStrings.ForecastColumnCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ForecastColumn",
					referenceSchema: {
						name: "ForecastColumn",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				}
			}
		});
		return Terrasoft.OppDepartmentForecast;
	});