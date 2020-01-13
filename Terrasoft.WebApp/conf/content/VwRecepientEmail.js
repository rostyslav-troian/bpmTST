define("VwRecepientEmail", ["terrasoft", "ext-base", "VwRecepientEmailResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwRecepientEmail", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwRecepientEmail",
			singleton: true,
			uId: "7f331863-eb75-41aa-985a-b10e46816ff1",
			name: "VwRecepientEmail",
			caption: resources.localizableStrings.VwRecepientEmailCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Email",
			columns: {
				Id: {
					uId: "25081e50-6a41-4795-90b0-f2c5f28c0a42",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Email: {
					uId: "cca0c9f5-fc2b-4af2-8e43-324ca65ef9f4",
					name: "Email",
					caption: resources.localizableStrings.EmailCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				UseEmail: {
					uId: "1db938f3-2f12-443e-b910-7413a5b181fd",
					name: "UseEmail",
					caption: resources.localizableStrings.UseEmailCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ContactId: {
					uId: "7854e7eb-ca7f-440b-85e1-fa127ad32ad0",
					name: "ContactId",
					caption: resources.localizableStrings.ContactIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Number: {
					uId: "16715b3e-14a3-4765-99ee-672af06912e9",
					name: "Number",
					caption: resources.localizableStrings.NumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				}
			}
		});
		return Terrasoft.VwRecepientEmail;
	});