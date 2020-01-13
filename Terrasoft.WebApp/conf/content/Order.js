define("Order", ["terrasoft", "ext-base", "OrderResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.Order", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.Order",
			singleton: true,
			uId: "80294582-06b5-4faa-a85f-3323e5536b71",
			name: "Order",
			caption: resources.localizableStrings.OrderCaption,
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
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Number: {
					uId: "df2849fa-59d7-44cf-bbd3-43d665480846",
					name: "Number",
					caption: resources.localizableStrings.NumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 250
				},
				Account: {
					uId: "c7000dc3-98ae-4f74-a43e-78e959604c29",
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
				Date: {
					uId: "0fd688be-10f3-4c9b-a9ce-3eab4a4eaaf5",
					name: "Date",
					caption: resources.localizableStrings.DateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDateTime"
					}
				},
				Owner: {
					uId: "81c8e318-76ac-4895-9a9b-9760b27c55ea",
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
				Status: {
					uId: "b3fc6240-4ba6-4d99-808c-c090d13862f7",
					name: "Status",
					caption: resources.localizableStrings.StatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OrderStatus",
					referenceSchema: {
						name: "OrderStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "OrderStatusDef"
					}
				},
				PaymentStatus: {
					uId: "f0989427-15ec-454f-9895-3ecd431d0959",
					name: "PaymentStatus",
					caption: resources.localizableStrings.PaymentStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OrderPaymentStatus",
					referenceSchema: {
						name: "OrderPaymentStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "OrderPaymentStatusDef"
					}
				},
				DeliveryStatus: {
					uId: "66bfb36b-300e-4dc1-8693-df090fde2d30",
					name: "DeliveryStatus",
					caption: resources.localizableStrings.DeliveryStatusCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OrderDeliveryStatus",
					referenceSchema: {
						name: "OrderDeliveryStatus",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SETTINGS,
						value: "OrderDeliveryStatusDef"
					}
				},
				Contact: {
					uId: "8e8985ca-8d3e-4cc0-9cba-246633902169",
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
				DueDate: {
					uId: "4a418844-a3ec-4ef2-8d9a-aa333a5139a1",
					name: "DueDate",
					caption: resources.localizableStrings.DueDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				ActualDate: {
					uId: "62de58be-fb36-493d-a499-ea71d7ae2be4",
					name: "ActualDate",
					caption: resources.localizableStrings.ActualDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Currency: {
					uId: "e8baae01-73b8-43c4-b4ca-f653c1c4bb94",
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
					uId: "1b70c1f1-6805-49dd-a73c-b00e46c6ff63",
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
					uId: "f397997e-a5b6-474d-a12f-9a1449c29e96",
					name: "Amount",
					caption: resources.localizableStrings.AmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 20,
					precision: 2
				},
				PaymentAmount: {
					uId: "13efad8a-9522-412b-9f0e-2e43df125406",
					name: "PaymentAmount",
					caption: resources.localizableStrings.PaymentAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 20,
					precision: 2
				},
				PrimaryAmount: {
					uId: "b275e869-f951-4f7b-9392-7457f4bf625e",
					name: "PrimaryAmount",
					caption: resources.localizableStrings.PrimaryAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 20,
					precision: 2
				},
				PrimaryPaymentAmount: {
					uId: "8007a0cc-f7b8-4a7c-a0c5-3bf80805c813",
					name: "PrimaryPaymentAmount",
					caption: resources.localizableStrings.PrimaryPaymentAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 20,
					precision: 2
				},
				SourceOrder: {
					uId: "fd306048-13d8-4ad4-a640-fda378a74693",
					name: "SourceOrder",
					caption: resources.localizableStrings.SourceOrderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SourceOrder",
					referenceSchema: {
						name: "SourceOrder",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				Notes: {
					uId: "d56f1b6b-3d46-4a42-ac08-3014c569f314",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Opportunity: {
					uId: "7fe04af6-f7c7-4bb2-8413-b65da9e4f33c",
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
				DeliveryAddress: {
					uId: "673e7526-3356-4a7b-aa14-78592983118e",
					name: "DeliveryAddress",
					caption: resources.localizableStrings.DeliveryAddressCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				DeliveryType: {
					uId: "3a54989b-8245-4321-a561-e683f4348bd0",
					name: "DeliveryType",
					caption: resources.localizableStrings.DeliveryTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "DeliveryType",
					referenceSchema: {
						name: "DeliveryType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "50df77d0-7b1f-4dbc-a02d-7b6ebb95dfd0"
						}
					}
				},
				PaymentType: {
					uId: "c55f4de9-a44b-4665-bb42-cfa8f66454f3",
					name: "PaymentType",
					caption: resources.localizableStrings.PaymentTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "PaymentType",
					referenceSchema: {
						name: "PaymentType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "c2d88243-685d-4e8b-a533-73f4cb8e869b"
						}
					}
				},
				ReceiverName: {
					uId: "6d877814-c8af-40be-9532-770586e78936",
					name: "ReceiverName",
					caption: resources.localizableStrings.ReceiverNameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				},
				Comment: {
					uId: "3d670e44-d54a-4d61-a087-e6ebbecbb208",
					name: "Comment",
					caption: resources.localizableStrings.CommentCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				ContactNumber: {
					uId: "4e5c0375-c940-49b0-9859-424b89e5cbcd",
					name: "ContactNumber",
					caption: resources.localizableStrings.ContactNumberCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 50
				}
			}
		});
		return Terrasoft.Order;
	});