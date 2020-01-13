define("SegmentContainerListItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SegmentDeleteWarning: "Content of dynamic block for the rule \u201C{0}\u201D will be deleted"
	};
	var localizableImages = {
		PriorityUpIcon: {
			source: 3,
			params: {
				schemaName: "SegmentContainerListItemViewModel",
				resourceItemName: "PriorityUpIcon",
				hash: "ea1c8920661c231d3d0bf715759fd886",
				resourceItemExtension: ".svg"
			}
		},
		PriorityDownIcon: {
			source: 3,
			params: {
				schemaName: "SegmentContainerListItemViewModel",
				resourceItemName: "PriorityDownIcon",
				hash: "2eade3b00a9d8cc898926e109b98380b",
				resourceItemExtension: ".svg"
			}
		},
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "SegmentContainerListItemViewModel",
				resourceItemName: "DeleteIcon",
				hash: "91236d2465874e8e2cece2164d8e6bf2",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});