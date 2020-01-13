define("VwSysAdminUnitHierarchy", ["terrasoft", "ext-base", "VwSysAdminUnitHierarchyResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSysAdminUnitHierarchy", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSysAdminUnitHierarchy",
			singleton: true,
			uId: "0390aba6-ca67-4e53-9479-e0867c41eb28",
			name: "VwSysAdminUnitHierarchy",
			caption: resources.localizableStrings.VwSysAdminUnitHierarchyCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "90d96804-4e57-4940-982e-3a5164e29f6a",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Name: {
					uId: "b31766a4-96b7-4991-b612-90571fbfed5c",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwSysAdminUnitHierarchy;
	});