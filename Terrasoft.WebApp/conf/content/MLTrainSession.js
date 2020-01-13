define("MLTrainSession", ["terrasoft", "ext-base", "MLTrainSessionResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.MLTrainSession", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.MLTrainSession",
			singleton: true,
			uId: "9e22a1b5-8cc6-4b5a-abc8-19e2b5b06841",
			name: "MLTrainSession",
			caption: resources.localizableStrings.MLTrainSessionCaption,
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
				MLModel: {
					uId: "ab69353e-097f-4ae5-8487-d2b8dea7e6e3",
					name: "MLModel",
					caption: resources.localizableStrings.MLModelCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MLModel",
					referenceSchema: {
						name: "MLModel",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				State: {
					uId: "024b70b5-aae8-4fd6-8b58-06724a1ef3d0",
					name: "State",
					caption: resources.localizableStrings.StateCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "MLModelState",
					referenceSchema: {
						name: "MLModelState",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				InUse: {
					uId: "24cfe166-850a-4015-9a53-b98641ebce11",
					name: "InUse",
					caption: resources.localizableStrings.InUseCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Error: {
					uId: "915e3530-e76d-4689-9ec7-6b895411bce4",
					name: "Error",
					caption: resources.localizableStrings.ErrorCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TrainedOn: {
					uId: "2110c3a1-3066-4622-a8d5-19ec57eb34dd",
					name: "TrainedOn",
					caption: resources.localizableStrings.TrainedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				TrainSetSize: {
					uId: "b9515ea5-ae59-4bc2-b680-2af2306db31f",
					name: "TrainSetSize",
					caption: resources.localizableStrings.TrainSetSizeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				InstanceMetric: {
					uId: "8dc69e3b-d749-4458-89ea-aa431194f98e",
					name: "InstanceMetric",
					caption: resources.localizableStrings.InstanceMetricCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				TrainingTimeMinutes: {
					uId: "fdbedcd2-4e1f-4b69-bec2-dfa4e3075597",
					name: "TrainingTimeMinutes",
					caption: resources.localizableStrings.TrainingTimeMinutesCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IgnoreMetricThreshold: {
					uId: "2c68f9b3-b19e-48cd-bc2f-0648f8f8154c",
					name: "IgnoreMetricThreshold",
					caption: resources.localizableStrings.IgnoreMetricThresholdCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				FeatureImportances: {
					uId: "0892c988-7771-46b6-bdc4-159597eb3869",
					name: "FeatureImportances",
					caption: resources.localizableStrings.FeatureImportancesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: "{ }"
					}
				}
			}
		});
		return Terrasoft.MLTrainSession;
	});