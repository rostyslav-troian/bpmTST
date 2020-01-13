define("TimelineSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrderDirectionCaption: "Date",
		EmptyInfoTitle: "There are no records in history.",
		EmptyInfoDescription: "Unfortunately, there is no history of work on this record in Creatio.",
		EmptyFilterTitle: "There are no records matching the filter criteria in history.",
		EmptyFilterDescription: "Clear the filter or change its conditions."
	};
	var localizableImages = {
		OrderDirectionDescIcon: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "OrderDirectionDescIcon",
				hash: "15d9b96d6eaa3c810de24a9f53861694",
				resourceItemExtension: ".svg"
			}
		},
		OrderDirectionAscIcon: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "OrderDirectionAscIcon",
				hash: "ce0d4bd2e6d7cb7dbc0c3a984ed86197",
				resourceItemExtension: ".svg"
			}
		},
		DefaultIcon: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "DefaultIcon",
				hash: "58c935fb0f9bff590454c247ae7006e8",
				resourceItemExtension: ".svg"
			}
		},
		EmptyFilterImage: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "EmptyFilterImage",
				hash: "7bf68ba9d5b686f7e46b0e23e89821bb",
				resourceItemExtension: ".png"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "TimelineSchema",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});