define("Certificate", ["terrasoft", "ext-base", "CertificateResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Certificate", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Certificate",
			singleton: true,
			uId: "36558ee5-03f9-4ffd-8272-c648af79e097",
			name: "Certificate",
			caption: resources.localizableStrings.CertificateCaption,
			administratedByRecords: false,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: true,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "CertificateNumber",
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
				Contact: {
					uId: "0f4104c8-9581-4af6-901a-28bb15e5b42f",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				EducationActivity: {
					uId: "8e0dae65-fe30-4c60-b66c-26ecd6bb5ca1",
					name: "EducationActivity",
					caption: resources.localizableStrings.EducationActivityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "EducationActivity",
					referenceSchema: {
						name: "EducationActivity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				IssueDate: {
					uId: "6e7732f6-6737-4771-b851-a89c614ccc04",
					name: "IssueDate",
					caption: resources.localizableStrings.IssueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				ExpireDate: {
					uId: "8d14b73c-a593-4d44-9611-afac9ae65422",
					name: "ExpireDate",
					caption: resources.localizableStrings.ExpireDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true
				},
				CompetenceLevel: {
					uId: "9c060e50-0cc7-4718-ad10-96f18625f3c4",
					name: "CompetenceLevel",
					caption: resources.localizableStrings.CompetenceLevelCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "CompetenceLevel",
					referenceSchema: {
						name: "CompetenceLevel",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ResultScore: {
					uId: "070a13af-37f3-465d-92cd-eae0f6ad659d",
					name: "ResultScore",
					caption: resources.localizableStrings.ResultScoreCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 18,
					precision: 2
				},
				CertificateNumber: {
					uId: "46f778b8-2e42-4f45-91c4-65a9c75d2e3d",
					name: "CertificateNumber",
					caption: resources.localizableStrings.CertificateNumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 250
				},
				Comments: {
					uId: "6ea2e256-0605-4c1d-b070-5b4356917abb",
					name: "Comments",
					caption: resources.localizableStrings.CommentsCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				NotificationSent: {
					uId: "45e54b8a-af02-42ea-a8b9-09f40f868885",
					name: "NotificationSent",
					caption: resources.localizableStrings.NotificationSentCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				DateOfNotification: {
					uId: "df63e6cc-2afa-46b5-aafc-07b48e9adb12",
					name: "DateOfNotification",
					caption: resources.localizableStrings.DateOfNotificationCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.Certificate;
	});