define("ChartProperty", ["terrasoft", "ext-base", "ChartPropertyResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ChartProperty", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ChartProperty",
			singleton: true,
			uId: "cfa2a0e4-8dcc-49ab-8c7a-267dba88aa22",
			name: "ChartProperty",
			caption: resources.localizableStrings.ChartPropertyCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
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
				Name: {
					uId: "736c30a7-c0ec-4fa9-b034-2552b319b633",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Description: {
					uId: "9e53fd7c-dde4-4502-a64c-b9e34148108b",
					name: "Description",
					caption: resources.localizableStrings.DescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
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
				EntityId: {
					uId: "16ad592f-9c14-4edd-87c4-65eb59564fd3",
					name: "EntityId",
					caption: resources.localizableStrings.EntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ChartAggregationType: {
					uId: "dd90d17d-f735-4191-9783-74720cdbd816",
					name: "ChartAggregationType",
					caption: resources.localizableStrings.ChartAggregationTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ChartAggregationType",
					referenceSchema: {
						name: "ChartAggregationType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ChartEntityColumn: {
					uId: "f13f4d9b-0463-493e-9a8b-67ba02c960b5",
					name: "ChartEntityColumn",
					caption: resources.localizableStrings.ChartEntityColumnCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				GroupByField: {
					uId: "9ab76bfc-de7a-403d-a3a5-5babd8f8f4d6",
					name: "GroupByField",
					caption: resources.localizableStrings.GroupByFieldCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				XAxisCaption: {
					uId: "fbc6b8ae-1adb-464f-abb2-24072e86068c",
					name: "XAxisCaption",
					caption: resources.localizableStrings.XAxisCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				YAxisCaption: {
					uId: "f42b116e-b9a0-4bcd-88dc-1a07a0800901",
					name: "YAxisCaption",
					caption: resources.localizableStrings.YAxisCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Filter: {
					uId: "4bc38758-6980-4a92-b5a1-16f045996237",
					name: "Filter",
					caption: resources.localizableStrings.FilterCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				OrderDirection: {
					uId: "d3a6ecf3-16ec-482f-ab76-ee95c329fdce",
					name: "OrderDirection",
					caption: resources.localizableStrings.OrderDirectionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				OrderByChartPropertyColumn: {
					uId: "6e2daddb-e9a2-4433-b35d-07ee0de0b71d",
					name: "OrderByChartPropertyColumn",
					caption: resources.localizableStrings.OrderByChartPropertyColumnCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				ModuleObjAccessField: {
					uId: "eb5d1c87-4434-4940-8fd6-c640c4b5f99a",
					name: "ModuleObjAccessField",
					caption: resources.localizableStrings.ModuleObjAccessFieldCaption,
					dataValueType: Terrasoft.DataValueType.BLOB,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ChartSeriesKind: {
					uId: "37fc2cf9-c2cd-48e0-b258-2fa504d475d7",
					name: "ChartSeriesKind",
					caption: resources.localizableStrings.ChartSeriesKindCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				GroupByTypeDateTime: {
					uId: "c0da6e4d-11b3-4a2c-975f-fb8a1c16a21e",
					name: "GroupByTypeDateTime",
					caption: resources.localizableStrings.GroupByTypeDateTimeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "GroupByTypeDateTime",
					referenceSchema: {
						name: "GroupByTypeDateTime",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ModuleEntityId: {
					uId: "69a2ad03-f043-4d85-8464-950e113168a5",
					name: "ModuleEntityId",
					caption: resources.localizableStrings.ModuleEntityIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.ChartProperty;
	});