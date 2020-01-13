define("VwRecentCall", ["terrasoft", "ext-base", "VwRecentCallResources"],
	function(Terrasoft, Ext, resources) {
		Ext.define("Terrasoft.data.models.VwRecentCall", {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft.VwRecentCall",
			singleton: true,
			uId: "50a06370-1d10-4f4a-802f-8691d5e16e73",
			name: "VwRecentCall",
			caption: resources.localizableStrings.VwRecentCallCaption,
			administratedByRecords: false,
			administratedByOperations: false,
			isTrackChangesInDB: false,
			useMasterRecordRights: false,
			masterRecordSchemaName: "",
			primaryColumnName: "Id",
			columns: {
				Id: {
					uId: "b4a29e1d-155b-46bd-b664-145f43ab9e18",
					name: "Id",
					caption: resources.localizableStrings.IdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: false
				},
				Call: {
					uId: "961b2687-014d-4bbe-a937-699060c2d7c3",
					name: "Call",
					caption: resources.localizableStrings.CallCaption,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true,
					isLookup: true,
					referenceSchemaName: "Call",
					referenceSchema: {
						name: "Call",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Caption"
					}
				},
				CreatedById: {
					uId: "b0671192-e314-47c6-a10b-57739a46ea41",
					name: "CreatedById",
					caption: resources.localizableStrings.CreatedByIdCaption,
					dataValueType: Terrasoft.DataValueType.GUID,
					usageType: 0,
					isInherited: false,
					isValueCloneable: true
				}
			}
		});
		return Terrasoft.VwRecentCall;
	});