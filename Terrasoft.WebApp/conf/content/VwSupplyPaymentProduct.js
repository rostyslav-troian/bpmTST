define("VwSupplyPaymentProduct", ["terrasoft", "ext-base", "VwSupplyPaymentProductResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwSupplyPaymentProduct", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwSupplyPaymentProduct",
			singleton: true,
			uId: "69fe7c6b-e6cf-4f60-af51-5dede58906cb",
			name: "VwSupplyPaymentProduct",
			caption: resources.localizableStrings.VwSupplyPaymentProductCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
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
				SupplyPaymentElement: {
					uId: "485aad79-d61d-41d3-b43a-702c4d517eb8",
					name: "SupplyPaymentElement",
					caption: resources.localizableStrings.SupplyPaymentElementCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentElement",
					referenceSchema: {
						name: "SupplyPaymentElement",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name",
						primaryOrderColumnName: "DatePlan"
					}
				},
				SupplyPaymentProduct: {
					uId: "35d1dcfa-9043-4353-af77-eb122f227453",
					name: "SupplyPaymentProduct",
					caption: resources.localizableStrings.SupplyPaymentProductCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentProduct",
					referenceSchema: {
						name: "SupplyPaymentProduct",
						primaryColumnName: "Id",
						primaryDisplayColumnName: null
					}
				},
				OrderProduct: {
					uId: "2a863b50-214c-41f0-8d20-bb9042a7571b",
					name: "OrderProduct",
					caption: resources.localizableStrings.OrderProductCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "OrderProduct",
					referenceSchema: {
						name: "OrderProduct",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				UsedQuantity: {
					uId: "b1141a69-1c47-4263-af95-ba3ca3e54d8b",
					name: "UsedQuantity",
					caption: resources.localizableStrings.UsedQuantityCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				UsedAmount: {
					uId: "1333adb9-3cef-450c-8d98-7bca3090571b",
					name: "UsedAmount",
					caption: resources.localizableStrings.UsedAmountCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				MaxQuantity: {
					uId: "98b768be-0360-481e-b3e6-9ca26ddf6769",
					name: "MaxQuantity",
					caption: resources.localizableStrings.MaxQuantityCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				IsDistributed: {
					uId: "3444fc14-c107-4926-a893-90913f9028f1",
					name: "IsDistributed",
					caption: resources.localizableStrings.IsDistributedCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				Price: {
					uId: "a5fcdcaa-1f34-4030-aa1e-08f2cf5b5237",
					name: "Price",
					caption: resources.localizableStrings.PriceCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				DiscountPercent: {
					uId: "92d9c377-2a35-494f-b44c-c7406cb6c795",
					name: "DiscountPercent",
					caption: resources.localizableStrings.DiscountPercentCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				}
			}
		});
		return Terrasoft.VwSupplyPaymentProduct;
	});