define("CallTimelineItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SecondsLabel: "\u0441",
		DurationLabel: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C"
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