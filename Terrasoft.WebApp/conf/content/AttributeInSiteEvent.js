define("AttributeInSiteEvent", ["terrasoft", "ext-base", "AttributeInSiteEventResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.AttributeInSiteEvent", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.AttributeInSiteEvent",
			singleton: true,
			uId: "6839c7b8-f847-4cef-81cd-6554e7502730",
			name: "AttributeInSiteEvent",
			caption: resources.localizableStrings.AttributeInSiteEventCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			primaryDisplayColumnName: "StringValue",
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
				SiteEventAttribute: {
					uId: "0090b19c-a4c7-4715-afb2-2fb6d716930a",
					name: "SiteEventAttribute",
					caption: resources.localizableStrings.SiteEventAttributeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SiteEventAttribute",
					referenceSchema: {
						name: "SiteEventAttribute",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ListItemValue: {
					uId: "dbab435f-266f-4e00-ba8b-ff4facac9f2a",
					name: "ListItemValue",
					caption: resources.localizableStrings.ListItemValueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SiteEventAttrListItem",
					referenceSchema: {
						name: "SiteEventAttrListItem",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				StringValue: {
					uId: "77e7695a-bacb-4e76-8308-8e6a04a9476c",
					name: "StringValue",
					caption: resources.localizableStrings.StringValueCaption,
					dataValueType: Terrasoft.DataValueType.TEXT,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					size: 500
				},
				IntValue: {
					uId: "4b78b2c5-72f6-4a34-ba9c-d4b0a2c61344",
					name: "IntValue",
					caption: resources.localizableStrings.IntValueCaption,
					dataValueType: Terrasoft.DataValueType.INTEGER,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				FloatValue: {
					uId: "c5411baa-4254-440c-9e1a-49a8d5ed1168",
					name: "FloatValue",
					caption: resources.localizableStrings.FloatValueCaption,
					dataValueType: Terrasoft.DataValueType.FLOAT,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true,
					size: 18,
					precision: 2
				},
				BooleanValue: {
					uId: "8beac038-2db4-4e2f-8355-626cd444bc4a",
					name: "BooleanValue",
					caption: resources.localizableStrings.BooleanValueCaption,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					usageType: 2,
					isInherited: false,
					isValueCloneable: true
				},
				ProductValue: {
					uId: "ee940c14-92c8-46b4-a4d5-7ff3fd0d2c58",
					name: "ProductValue",
					caption: resources.localizableStrings.ProductValueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Product",
					referenceSchema: {
						name: "Product",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				SiteEvent: {
					uId: "bd85be31-baf9-4352-8755-6a7f426898e2",
					name: "SiteEvent",
					caption: resources.localizableStrings.SiteEventCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isRequired: true,
					isLookup: true,
					referenceSchemaName: "SiteEvent",
					referenceSchema: {
						name: "SiteEvent",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Source"
					}
				},
				ProductTypeValue: {
					uId: "be1d261c-c90a-4a78-b454-1f72cad994d5",
					name: "ProductTypeValue",
					caption: resources.localizableStrings.ProductTypeValueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ProductType",
					referenceSchema: {
						name: "ProductType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ProductCategoryValue: {
					uId: "be3e38da-56de-4be6-8e1c-b38fff609cc9",
					name: "ProductCategoryValue",
					caption: resources.localizableStrings.ProductCategoryValueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "ProductCategory",
					referenceSchema: {
						name: "ProductCategory",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				},
				ProductTradeMarkValue: {
					uId: "1257872a-31e1-4602-8b78-671f31ae39be",
					name: "ProductTradeMarkValue",
					caption: resources.localizableStrings.ProductTradeMarkValueCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: true,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "TradeMark",
					referenceSchema: {
						name: "TradeMark",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.AttributeInSiteEvent;
	});