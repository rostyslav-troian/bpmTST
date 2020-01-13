define("VwVisa", ["terrasoft", "ext-base", "VwVisaResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwVisa", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwVisa",
			singleton: true,
			uId: "38d05501-e527-4220-b74d-68d71a2aa835",
			name: "VwVisa",
			caption: resources.localizableStrings.VwVisaCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Title",
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
				Objective: {
					uId: "c282c824-7aa1-44b4-b8f0-dca0fe3d8b4b",
					name: "Objective",
					caption: resources.localizableStrings.ObjectiveCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 500
				},
				VisaOwner: {
					uId: "f33a75e0-7ed4-4b06-a410-b9e9323645b1",
					name: "VisaOwner",
					caption: resources.localizableStrings.VisaOwnerCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				IsAllowedToDelegate: {
					uId: "7d4534be-4800-4793-b848-6771da492076",
					name: "IsAllowedToDelegate",
					caption: resources.localizableStrings.IsAllowedToDelegateCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				DelegatedFrom: {
					uId: "2800e792-e676-4b25-b8a0-aa7f0e714056",
					name: "DelegatedFrom",
					caption: resources.localizableStrings.DelegatedFromCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SysAdminUnit",
					referenceSchema: {
						name: "SysAdminUnit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Status: {
					uId: "58ebe36e-7384-4abd-b09c-407c6f508a4d",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "VisaStatus",
					referenceSchema: {
						name: "VisaStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "3462594d-77a7-4b0a-874a-6d8b54b293bc"
						}
					}
				},
				SetBy: {
					uId: "1a4e2821-3b74-460c-8877-c06f743702c5",
					name: "SetBy",
					caption: resources.localizableStrings.SetByCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SetDate: {
					uId: "b4fedd4a-ca45-4ade-960a-c0f4417fe442",
					name: "SetDate",
					caption: resources.localizableStrings.SetDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				IsCanceled: {
					uId: "c7d206aa-401c-4095-ba43-757c8f1914e9",
					name: "IsCanceled",
					caption: resources.localizableStrings.IsCanceledCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Comment: {
					uId: "9b44ad39-b9e1-489e-a2c5-6090c3522434",
					name: "Comment",
					caption: resources.localizableStrings.CommentCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 500
				},
				Title: {
					uId: "10e1449d-8e66-412c-8fc2-eeaae319bc17",
					name: "Title",
					caption: resources.localizableStrings.TitleCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				VisaSchemaName: {
					uId: "a1efb5d2-50f1-440a-ad35-0ab5a8892a72",
					name: "VisaSchemaName",
					caption: resources.localizableStrings.VisaSchemaNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				VisaObjectId: {
					uId: "6835dd49-a180-4735-8b33-527842610bd2",
					name: "VisaObjectId",
					caption: resources.localizableStrings.VisaObjectIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				VisaSchemaTypeId: {
					uId: "94fdf3b7-f403-42e2-8e07-f64175027223",
					name: "VisaSchemaTypeId",
					caption: resources.localizableStrings.VisaSchemaTypeIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				VisaTypeName: {
					uId: "05e15d73-c1a8-4e0b-9164-91d78dd3e4d5",
					name: "VisaTypeName",
					caption: resources.localizableStrings.VisaTypeNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				VisaSchemaCaption: {
					uId: "5d865518-09a7-4e5e-8903-83f34255b02e",
					name: "VisaSchemaCaption",
					caption: resources.localizableStrings.VisaSchemaCaptionCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				IsRequiredDigitalSignature: {
					uId: "453a7c65-0418-4684-be8f-641427eb6837",
					name: "IsRequiredDigitalSignature",
					caption: resources.localizableStrings.IsRequiredDigitalSignatureCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwVisa;
	});