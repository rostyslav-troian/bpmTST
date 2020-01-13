define("VwOrderProductFilter", ["terrasoft", "ext-base", "VwOrderProductFilterResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwOrderProductFilter", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwOrderProductFilter",
			singleton: true,
			uId: "0ef424fb-1604-477c-86e2-bd3e6309669a",
			name: "VwOrderProductFilter",
			caption: resources.localizableStrings.VwOrderProductFilterCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "e575698b-4d10-49d5-84c5-2a69caebd2e5",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				Product: {
					uId: "185c417d-51bb-41f5-9562-e0dbfcc1773b",
					name: "Product",
					caption: resources.localizableStrings.ProductCaption,
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
				Type: {
					uId: "dce8b022-0c27-4dd4-a4ff-a666ec9813c4",
					name: "Type",
					caption: resources.localizableStrings.TypeCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "SupplyPaymentType",
					referenceSchema: {
						name: "SupplyPaymentType",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					}
				}
			}
		});
		return Terrasoft.VwOrderProductFilter;
	});