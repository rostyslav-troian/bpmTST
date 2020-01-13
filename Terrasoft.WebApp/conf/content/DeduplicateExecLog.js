define("DeduplicateExecLog", ["terrasoft", "ext-base", "DeduplicateExecLogResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.DeduplicateExecLog", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.DeduplicateExecLog",
			singleton: true,
			uId: "16ffbae1-539a-45e3-96d5-a65dd1f6e045",
			name: "DeduplicateExecLog",
			caption: resources.localizableStrings.DeduplicateExecLogCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "ProcedureName",
			columns: {
				Id: {
					uId: "6af4c558-3b8a-4a49-bafe-67b502c693f9",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 1,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true
				},
				ProcedureName: {
					uId: "dafe4c64-9854-4ebd-a4af-03688f8f8ff6",
					name: "ProcedureName",
					caption: resources.localizableStrings.ProcedureNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: " "
					},
					size: 250
				},
				CreatedOn: {
					uId: "6b8d804d-d8f8-4c10-9526-5e8cefe89ef5",
					name: "CreatedOn",
					caption: resources.localizableStrings.CreatedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				ExecutedOn: {
					uId: "d8fac40e-5368-41c7-bb8b-3ff3813e2da5",
					name: "ExecutedOn",
					caption: resources.localizableStrings.ExecutedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				CompletedOn: {
					uId: "83a6d26b-3551-4639-b2de-e991c61c029b",
					name: "CompletedOn",
					caption: resources.localizableStrings.CompletedOnCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				SqlErrorCode: {
					uId: "97ee3e20-54c9-4ab2-8fcf-20f179e167e4",
					name: "SqlErrorCode",
					caption: resources.localizableStrings.SqlErrorCodeCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				SqlErrorMessage: {
					uId: "da2f3240-7555-4e7f-9b5c-c2a3068c71d4",
					name: "SqlErrorMessage",
					caption: resources.localizableStrings.SqlErrorMessageCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: " "
					},
					size: 500
				}
			}
		});
		return Terrasoft.DeduplicateExecLog;
	});