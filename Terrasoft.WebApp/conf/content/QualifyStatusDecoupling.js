define("QualifyStatusDecoupling", ["terrasoft", "ext-base", "QualifyStatusDecouplingResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.QualifyStatusDecoupling", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.QualifyStatusDecoupling",
			singleton: true,
			uId: "496464c1-5536-4ad6-8f76-3fbfd5afcf14",
			name: "QualifyStatusDecoupling",
			caption: resources.localizableStrings.QualifyStatusDecouplingCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "ebfd6fcb-7e83-4ad2-a143-3a6a744514f6",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "AutoGuid"
					}
				},
				CurrentStatus: {
					uId: "5c371f91-9b0b-40d8-a00c-19f97f5e1907",
					name: "CurrentStatus",
					caption: resources.localizableStrings.CurrentStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "QualifyStatus",
					referenceSchema: {
						name: "QualifyStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				AvailableStatus: {
					uId: "2ab8861e-dd23-476c-ba05-a46b1c174bcb",
					name: "AvailableStatus",
					caption: resources.localizableStrings.AvailableStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "QualifyStatus",
					referenceSchema: {
						name: "QualifyStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.QualifyStatusDecoupling;
	});