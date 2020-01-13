define("VwSysSetting", ["terrasoft", "ext-base", "VwSysSettingResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSysSetting", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSysSetting",
			singleton: true,
			uId: "f884326b-abd5-47d6-8ade-59bbf1dfeccd",
			name: "VwSysSetting",
			caption: resources.localizableStrings.VwSysSettingCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
			columns: {
				Id: {
					uId: "3463ca37-7483-49e2-a526-c574581fa7f6",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				Name: {
					uId: "84247f72-6888-41a8-9eeb-5077d36f0b48",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Description: {
					uId: "723eed02-d25b-445e-8d1b-b10fbfef4e42",
					name: "Description",
					caption: resources.localizableStrings.DescriptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Code: {
					uId: "863bf97f-375b-43cc-a1a0-294cf1fb762f",
					name: "Code",
					caption: resources.localizableStrings.CodeCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 50
				},
				ValueTypeName: {
					uId: "f12f0733-d707-47d9-8dce-af20acf7186d",
					name: "ValueTypeName",
					caption: resources.localizableStrings.ValueTypeNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				ReferenceSchemaUId: {
					uId: "13a9aa83-6d7e-4578-b8f9-92dd771f87ee",
					name: "ReferenceSchemaUId",
					caption: resources.localizableStrings.ReferenceSchemaUIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsPersonal: {
					uId: "3fe15c05-fa45-4a4f-9b34-1da9a0372d8a",
					name: "IsPersonal",
					caption: resources.localizableStrings.IsPersonalCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				IsCacheable: {
					uId: "606e3428-786f-4fc3-8a70-796c5489e966",
					name: "IsCacheable",
					caption: resources.localizableStrings.IsCacheableCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: true
					}
				},
				IsSSPAvailable: {
					uId: "0f5e5f27-1146-48e5-8d2d-31021482c008",
					name: "IsSSPAvailable",
					caption: resources.localizableStrings.IsSSPAvailableCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwSysSetting;
	});