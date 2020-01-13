define("SupplyPaymentElement", ["terrasoft", "ext-base", "SupplyPaymentElementResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SupplyPaymentElement", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SupplyPaymentElement",
			singleton: true,
			uId: "28cc5afa-2b40-49e9-b516-ed35cbc4203e",
			name: "SupplyPaymentElement",
			caption: resources.localizableStrings.SupplyPaymentElementCaption,
			administratedByRecords: false,
			administratedByOperations: true,
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
				ProcessListeners: {
					uId: "3fabd836-6a53-4d8d-9069-6df88d9dae1e",
					name: "ProcessListeners",
					caption: resources.localizableStrings.ProcessListenersCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Position: {
					uId: "f5e69141-5900-4800-93b7-6c06ca1e991d",
					name: "Position",
					caption: resources.localizableStrings.PositionCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: true,
					isValueCloneable: true
				},
				Type: {
					uId: "dd703360-9b62-47fe-abb5-2f3ff6a57911",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isRequired: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentType",
					referenceSchema: {
						name: "SupplyPaymentType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				DelayType: {
					uId: "a3d987f5-d9a8-4016-b260-ee47be3c60b8",
					name: "DelayType",
					caption: resources.localizableStrings.DelayTypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isSimpleLookup: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentDelay",
					referenceSchema: {
						name: "SupplyPaymentDelay",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "6fc58059-9c4a-4481-8775-bbadf4a4ad51"
						}
					}
				},
				Delay: {
					uId: "e361f1d8-b6cb-47f5-9496-6347f6499848",
					name: "Delay",
					caption: resources.localizableStrings.DelayCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					}
				},
				Percentage: {
					uId: "c28a0bba-c826-48dd-8a58-0b80b4f55dee",
					name: "Percentage",
					caption: resources.localizableStrings.PercentageCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: 0
					},
					size: 18,
					precision: 2
				},
				DatePlan: {
					uId: "72478c19-2ca7-4043-849a-98b8a98379b8",
					name: "DatePlan",
					caption: resources.localizableStrings.DatePlanCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.SYSTEM_VALUE,
						value: "CurrentDate"
					}
				},
				DateFact: {
					uId: "eba7d360-42b7-462d-a77a-9a88bc0341eb",
					name: "DateFact",
					caption: resources.localizableStrings.DateFactCaption,
					dataValueType: Terrasoft.DataValueType.DATE,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				},
				State: {
					uId: "0a3324bb-55c8-4791-b51f-409cfedc6fe2",
					name: "State",
					caption: resources.localizableStrings.StateCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentState",
					referenceSchema: {
						name: "SupplyPaymentState",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					defaultValue: {
						source: Terrasoft.EntitySchemaColumnDefSource.CONST,
						value: {
							value: "b801edd0-33f8-45ed-aee8-2e26307b0456"
						}
					}
				},
				AmountPlan: {
					uId: "8db4ebad-d676-40ac-8794-e7595b45a380",
					name: "AmountPlan",
					caption: resources.localizableStrings.AmountPlanCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				AmountFact: {
					uId: "17e30b16-182b-49de-b2eb-f3e22b748da4",
					name: "AmountFact",
					caption: resources.localizableStrings.AmountFactCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Product: {
					uId: "bffa49c8-f12c-4d40-b2d0-872ff5affd26",
					name: "Product",
					caption: resources.localizableStrings.ProductCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
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
				Order: {
					uId: "b96f2cd9-fee2-4165-85da-7941232abaa8",
					name: "Order",
					caption: resources.localizableStrings.OrderCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Order",
					referenceSchema: {
						name: "Order",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Name: {
					uId: "34a51039-9d1e-4b9d-bbef-f6018add0691",
					name: "Name",
					caption: resources.localizableStrings.NameCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					size: 50
				},
				PreviousElement: {
					uId: "0466d76c-ac6c-4404-ab86-769840c37023",
					name: "PreviousElement",
					caption: resources.localizableStrings.PreviousElementCaption,
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
				Invoice: {
					uId: "e220d88e-6cd0-40c1-9b5a-4a2f460c48d2",
					name: "Invoice",
					caption: resources.localizableStrings.InvoiceCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Invoice",
					referenceSchema: {
						name: "Invoice",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				Contract: {
					uId: "66261c3c-a0a6-4a54-8e50-39752634604e",
					name: "Contract",
					caption: resources.localizableStrings.ContractCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Contract",
					referenceSchema: {
						name: "Contract",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Number"
					}
				},
				PrimaryAmountPlan: {
					uId: "d72b2f87-802a-4608-b41c-9d271ba1fd0b",
					name: "PrimaryAmountPlan",
					caption: resources.localizableStrings.PrimaryAmountPlanCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				PrimaryAmountFact: {
					uId: "9f4daaf1-654c-4f57-9200-73d27570bde0",
					name: "PrimaryAmountFact",
					caption: resources.localizableStrings.PrimaryAmountFactCaption,
					dataValueType: Terrasoft.DataValueType.MONEY,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 20,
					precision: 2
				},
				Products: {
					uId: "d0235de8-8f51-44ff-98f3-a8f701a34931",
					name: "Products",
					caption: resources.localizableStrings.ProductsCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false,
					size: 50
				}
			}
		});
		return Terrasoft.SupplyPaymentElement;
	});