define("DynamicContentAttributesPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddSegmentButtonCaption: "Add rule",
		AttributesCollectionLabel: "Dynamic content rules",
		MaximumRrulesCountHint: "Maximum allowed 7 rules"
	};
	var localizableImages = {
		AddButtonIcon: {
			source: 3,
			params: {
				schemaName: "DynamicContentAttributesPropertiesPage",
				resourceItemName: "AddButtonIcon",
				hash: "82ee0c659590cd80a000af35c1f14d59",
				resourceItemExtension: ".svg"
			}
		},
		RuleInfoButtonImage: {
			source: 3,
			params: {
				schemaName: "DynamicContentAttributesPropertiesPage",
				resourceItemName: "RuleInfoButtonImage",
				hash: "33d44fbb5a791276ddbae2f046e70b8b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});