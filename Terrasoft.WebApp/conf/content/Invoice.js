define("Invoice", ["terrasoft", "ext-base", "InvoiceResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Invoice", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Invoice",
			singleton: true,
			uId: "bfb313dd-bb55-4e1b-8e42-3d346e0da7c5",
			name: "Invoice",
			caption: resources.localizableStrings.InvoiceCaption,
			administratedByRecords: true,
			administratedByOperations: true,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Number",
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
				Number: {
					uId: "fdd77a82-fa25-4c0f-94d6-56cf0254521f",
					name: "Number",
					caption: resources.localizableStrings.NumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 250
				},
				StartDate: {
					uId: "60364b7c-e7c4-43e3-81bf-5899e49a01aa",
					name: "StartDate",
					caption: resources.localizableStrings.StartDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDate"
					}
				},
				PrimaryAmount: {
					uId: "420f8d90-f6b1-4140-81b8-53e1f39d1379",
					name: "PrimaryAmount",
					caption: resources.localizableStrings.PrimaryAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryPaymentAmount: {
					uId: "76ec81f5-b0ea-4a33-a4bc-eddd91d0dcca",
					name: "PrimaryPaymentAmount",
					caption: resources.localizableStrings.PrimaryPaymentAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PaymentStatus: {
					uId: "77ce961a-530c-49f1-a1f9-981cda246cb9",
					name: "PaymentStatus",
					caption: resources.localizableStrings.PaymentStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "InvoicePaymentStatus",
					referenceSchema: {
						name: "InvoicePaymentStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "InvoicePaymentStatusDef"
					}
				},
				Owner: {
					uId: "c3d2e53a-5062-4930-adac-7cbcd9d3f58c",
					name: "Owner",
					caption: resources.localizableStrings.OwnerCaption,
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
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentUserContact"
					}
				},
				SupplierBillingInfo: {
					uId: "dcf334e9-8a73-430b-ab97-17d9b9de64a3",
					name: "SupplierBillingInfo",
					caption: resources.localizableStrings.SupplierBillingInfoCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountBillingInfo",
					referenceSchema: {
						name: "AccountBillingInfo",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				RemindToOwner: {
					uId: "2a25b353-2d85-4ce6-b26e-894b514369ff",
					name: "RemindToOwner",
					caption: resources.localizableStrings.RemindToOwnerCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				RemindToOwnerDate: {
					uId: "e96ea96f-dc5d-4164-b182-e227978ac6e2",
					name: "RemindToOwnerDate",
					caption: resources.localizableStrings.RemindToOwnerDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				CustomerBillingInfo: {
					uId: "8c7dd99b-d5c2-4cb5-ab16-84e1d0332ed6",
					name: "CustomerBillingInfo",
					caption: resources.localizableStrings.CustomerBillingInfoCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "AccountBillingInfo",
					referenceSchema: {
						name: "AccountBillingInfo",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Currency: {
					uId: "d7d9c859-18ad-408d-96ef-5a9f3090c168",
					name: "Currency",
					caption: resources.localizableStrings.CurrencyCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Currency",
					referenceSchema: {
						name: "Currency",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "PrimaryCurrency"
					}
				},
				CurrencyRate: {
					uId: "734583ef-459f-45f5-9e5e-a1808e435fcf",
					name: "CurrencyRate",
					caption: resources.localizableStrings.CurrencyRateCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 24,
					precision: 8
				},
				Amount: {
					uId: "ec9d2333-9e2d-4f70-b831-5be130a4b4ac",
					name: "Amount",
					caption: resources.localizableStrings.AmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				DueDate: {
					uId: "0d587626-2ccb-45e2-b582-27815c74f835",
					name: "DueDate",
					caption: resources.localizableStrings.DueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				PaymentAmount: {
					uId: "07547348-9989-4367-9325-b1fa3281bf78",
					name: "PaymentAmount",
					caption: resources.localizableStrings.PaymentAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Notes: {
					uId: "7c5a1586-bac8-433c-adda-30e45d8a71a4",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				Account: {
					uId: "b52f52a0-c983-4477-a4c3-6127cb052db4",
					name: "Account",
					caption: resources.localizableStrings.AccountCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Contact: {
					uId: "8cf3941e-8061-42b9-80fa-d7936b228e84",
					name: "Contact",
					caption: resources.localizableStrings.ContactCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contact",
					referenceSchema: {
						name: "Contact",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Supplier: {
					uId: "2d36486c-1e97-434d-82f8-aed0e3162d8f",
					name: "Supplier",
					caption: resources.localizableStrings.SupplierCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Account",
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "e308b781-3c5b-4ecb-89ef-5c1ed4da488e"
						}
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
				Project: {
					uId: "85d0da72-7b6d-43fc-9279-bb96431481e2",
					name: "Project",
					caption: resources.localizableStrings.ProjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Project",
					referenceSchema: {
						name: "Project",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Name"
					}
				},
				Opportunity: {
					uId: "4566ed19-07f2-4836-9fda-eb24b2112208",
					name: "Opportunity",
					caption: resources.localizableStrings.OpportunityCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Opportunity",
					referenceSchema: {
						name: "Opportunity",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Title"
					}
				},
				Order: {
					uId: "4e473dd6-40a8-463b-8ae4-9af8afe2599e",
					name: "Order",
					caption: resources.localizableStrings.OrderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Order",
					referenceSchema: {
						name: "Order",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Contract: {
					uId: "2467a848-5e0b-4891-8657-0a5776eb4ab9",
					name: "Contract",
					caption: resources.localizableStrings.ContractCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contract",
					referenceSchema: {
						name: "Contract",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				AmountWithoutTax: {
					uId: "b419c3b3-22c7-44ad-8fc8-c02618d362dc",
					name: "AmountWithoutTax",
					caption: resources.localizableStrings.AmountWithoutTaxCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryAmountWithoutTax: {
					uId: "08be4ee9-724d-45ee-b01a-1906f7e9670c",
					name: "PrimaryAmountWithoutTax",
					caption: resources.localizableStrings.PrimaryAmountWithoutTaxCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PaymentAmountWithoutTax: {
					uId: "a7a263e8-7fc8-409c-9ada-14d2d38ba1d1",
					name: "PaymentAmountWithoutTax",
					caption: resources.localizableStrings.PaymentAmountWithoutTaxCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryPaymentAmountWithoutTax: {
					uId: "f6182f6b-cf24-4858-b9e2-5377f59fa07a",
					name: "PrimaryPaymentAmountWithoutTax",
					caption: resources.localizableStrings.PrimaryPaymentAmountWithoutTaxCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 2
				}
			}
		});
		return Terrasoft.Invoice;
	});