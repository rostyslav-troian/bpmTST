define("ProjectProduct", ["terrasoft", "ext-base", "ProjectProductResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.ProjectProduct", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.ProjectProduct",
			singleton: true,
			uId: "4d57a5cd-c540-4eb1-b90e-db10a046c336",
			name: "ProjectProduct",
			caption: resources.localizableStrings.ProjectProductCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "Name",
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
				Name: {
					uId: "037591ee-fc21-4788-9b2e-a005dd21882d",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				Notes: {
					uId: "369b4363-6804-473b-92a5-4ee233772082",
					name: "Notes",
					caption: resources.localizableStrings.NotesCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Product: {
					uId: "a977122d-8f0c-49be-a0ce-bb9faf81bdc6",
					name: "Product",
					caption: resources.localizableStrings.ProductCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Product",
					referenceSchema: {
						name: "Product",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				CustomProduct: {
					uId: "237ca70c-b45e-46e8-a8eb-67e30584af32",
					name: "CustomProduct",
					caption: resources.localizableStrings.CustomProductCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 250
				},
				DeliveryDate: {
					uId: "5db18b1c-a7b8-4bd2-bb00-60e6f3663da3",
					name: "DeliveryDate",
					caption: resources.localizableStrings.DeliveryDateCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true
				},
				Quantity: {
					uId: "c4e45448-ad41-4fc8-9c8b-904790d003ff",
					name: "Quantity",
					caption: resources.localizableStrings.QuantityCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 3
				},
				Unit: {
					uId: "d7fe119a-a831-4c2a-ba74-bdab58857363",
					name: "Unit",
					caption: resources.localizableStrings.UnitCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Unit",
					referenceSchema: {
						name: "Unit",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PrimaryPrice: {
					uId: "39182ce0-41eb-4f71-bf55-1deb88489688",
					name: "PrimaryPrice",
					caption: resources.localizableStrings.PrimaryPriceCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Price: {
					uId: "1835d8c5-7687-4bad-a4a7-b6a4fbf45948",
					name: "Price",
					caption: resources.localizableStrings.PriceCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryAmount: {
					uId: "7ad56546-758e-4f32-bfe4-b96ac8b48d1f",
					name: "PrimaryAmount",
					caption: resources.localizableStrings.PrimaryAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Amount: {
					uId: "fcc86ad4-073f-4450-baab-abfa226b9e0a",
					name: "Amount",
					caption: resources.localizableStrings.AmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryDiscountAmount: {
					uId: "08d936ff-1b7e-4a67-af92-2a870180ac9d",
					name: "PrimaryDiscountAmount",
					caption: resources.localizableStrings.PrimaryDiscountAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				DiscountAmount: {
					uId: "68ea19d8-502b-4732-83a6-a959bcf3eea7",
					name: "DiscountAmount",
					caption: resources.localizableStrings.DiscountAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				DiscountPercent: {
					uId: "17e259cd-0063-46df-8cee-20bb4e2aad8b",
					name: "DiscountPercent",
					caption: resources.localizableStrings.DiscountPercentCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Tax: {
					uId: "d833bc97-8f18-416f-aef1-f7218abb2e0d",
					name: "Tax",
					caption: resources.localizableStrings.TaxCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Tax",
					referenceSchema: {
						name: "Tax",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				PrimaryTaxAmount: {
					uId: "04a9e624-8638-48b3-ad41-100a8fd583f9",
					name: "PrimaryTaxAmount",
					caption: resources.localizableStrings.PrimaryTaxAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				TaxAmount: {
					uId: "adb28cb7-3d76-4c93-a54f-97a4c6089946",
					name: "TaxAmount",
					caption: resources.localizableStrings.TaxAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryTotalAmount: {
					uId: "16c14cc8-459b-408d-bcc1-8b6c29efb26f",
					name: "PrimaryTotalAmount",
					caption: resources.localizableStrings.PrimaryTotalAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				TotalAmount: {
					uId: "c97c6457-a800-472d-908b-991e63b65b05",
					name: "TotalAmount",
					caption: resources.localizableStrings.TotalAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				DiscountTax: {
					uId: "9db15d13-6c10-4818-8e1f-fcb55974c83e",
					name: "DiscountTax",
					caption: resources.localizableStrings.DiscountTaxCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 2
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
					uId: "888eeaa9-213e-4ec1-8efd-9c689ef5ed86",
					name: "Project",
					caption: resources.localizableStrings.ProjectCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "Project",
					referenceSchema: {
						name: "Project",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "Name"
					}
				},
				Cost: {
					uId: "cd01ea82-5717-4020-9340-fb67bbb6e221",
					name: "Cost",
					caption: resources.localizableStrings.CostCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PriceList: {
					uId: "e71dceda-9b0f-4509-aa10-f479aa69a9eb",
					name: "PriceList",
					caption: resources.localizableStrings.PriceListCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Pricelist",
					referenceSchema: {
						name: "Pricelist",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				BaseQuantity: {
					uId: "f6e0a8f0-6eb4-4496-a092-b229cf31a6d6",
					name: "BaseQuantity",
					caption: resources.localizableStrings.BaseQuantityCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 3
				}
			}
		});
		return Terrasoft.ProjectProduct;
	});