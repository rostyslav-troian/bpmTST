define("QueuePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SortMenuCaption: "Sort by",
		SetupQueueGridMenuCaption: "Select fields to display",
		RunProcessButtonCaption: "Open",
		NextRecordButtonCaption: "Next record",
		QueuePageGroupCaption: "Queue population",
		AddEntityRecordCaption: "New",
		AddEntityFolderRecordCaption: "New folder",
		AddedEntitiesMessage: "{0} records added to the queue",
		DeleteMenuCaption: "Delete",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected items?"
	};
	var localizableImages = {
		PageToolsButton: {
			source: 3,
			params: {
				schemaName: "QueuePage",
				resourceItemName: "PageToolsButton",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		DetailToolsButton: {
			source: 3,
			params: {
				schemaName: "QueuePage",
				resourceItemName: "DetailToolsButton",
				hash: "8624d21271ed2ce65aeda243033f3670",
				resourceItemExtension: ".png"
			}
		},
		AddQueueItemButtonImage: {
			source: 3,
			params: {
				schemaName: "QueuePage",
				resourceItemName: "AddQueueItemButtonImage",
				hash: "6e4b403aef18ffd56bb550e455626d7e",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});