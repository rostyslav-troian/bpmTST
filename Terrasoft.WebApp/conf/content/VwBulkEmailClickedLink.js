define("VwBulkEmailClickedLink", ["terrasoft", "ext-base", "VwBulkEmailClickedLinkResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwBulkEmailClickedLink", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwBulkEmailClickedLink",
			singleton: true,
			uId: "5a80a107-e592-4efe-aaf5-db82d22703d5",
			name: "VwBulkEmailClickedLink",
			caption: resources.localizableStrings.VwBulkEmailClickedLinkCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Contact: {
					uId: "0104f8ed-b1fa-4f9e-8d19-9435001b0cd5",
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
				BulkEmailHyperlink: {
					uId: "57245380-5179-4489-81b6-b614a789fa97",
					name: "BulkEmailHyperlink",
					caption: resources.localizableStrings.BulkEmailHyperlinkCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "BulkEmailHyperlink",
					referenceSchema: {
						name: "BulkEmailHyperlink",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				Id: {
					uId: "015774f0-9515-40a6-a68d-2f27a827cc10",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwBulkEmailClickedLink;
	});