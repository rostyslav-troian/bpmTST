define("CallTimelineItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SecondsLabel: "s",
		DurationLabel: "Duration"
	};
	var localizableImages = {
		IncomingCallIcon: {
			source: 3,
			params: {
				schemaName: "CallTimelineItemViewModel",
				resourceItemName: "IncomingCallIcon",
				hash: "f438887a0630bbffa5ba7001a1e97a41",
				resourceItemExtension: ".svg"
			}
		},
		OutgoingCallIcon: {
			source: 3,
			params: {
				schemaName: "CallTimelineItemViewModel",
				resourceItemName: "OutgoingCallIcon",
				hash: "cefb5e55baedb5dce9c6ebc4cd2771f5",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});