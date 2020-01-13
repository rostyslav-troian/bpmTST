define("SupplyPaymentTemplateItem", ["terrasoft", "ext-base", "SupplyPaymentTemplateItemResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.SupplyPaymentTemplateItem", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.SupplyPaymentTemplateItem",
			singleton: true,
			uId: "e526a71f-add3-459d-9c56-b9ad9d88547d",
			name: "SupplyPaymentTemplateItem",
			caption: resources.localizableStrings.SupplyPaymentTemplateItemCaption,
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
					usageType: 0,
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
							value: "b664126f-211f-44a1-acd8-6d9d8a1601c7"
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
					isValueCloneable: true
				},
				Percentage: {
					uId: "c28a0bba-c826-48dd-8a58-0b80b4f55dee",
					name: "Percentage",
					caption: resources.localizableStrings.PercentageCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				Name: {
					uId: "874f79e7-3065-426d-af73-7db36c904b2f",
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
					uId: "a475fc53-6351-463d-955a-da01d88603a1",
					name: "PreviousElement",
					caption: resources.localizableStrings.PreviousElementCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentTemplateItem",
					referenceSchema: {
						name: "SupplyPaymentTemplateItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SupplyPaymentTemplate: {
					uId: "3952ea59-baa1-477e-accf-77267f1ba3c2",
					name: "SupplyPaymentTemplate",
					caption: resources.localizableStrings.SupplyPaymentTemplateCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentTemplate",
					referenceSchema: {
						name: "SupplyPaymentTemplate",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.SupplyPaymentTemplateItem;
	});