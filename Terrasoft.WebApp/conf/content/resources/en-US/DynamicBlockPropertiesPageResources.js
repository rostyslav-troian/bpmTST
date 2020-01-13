define("DynamicBlockPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SegmentSettingsLabel: "Set up segments for dynamic block",
		AddSegmentButtonCaption: "Add segment",
		AddDefaultSegmentButtonCaption: "Add default content",
		DefaultSegmentHint: "If no default content is added, Creatio will skip this block for any recipients who do not meet the filter conditions of any of the segments",
		DefaultSegmentCaption: "Default",
		AddRuleBeforeCreateSegment: "Please set up dynamic content rules on the \u201CRules\u201D tab before creating a dynamic content block",
		NoAvailableRuleMessage: "All dynamic content rules are already being used for the current template. Please set up a new dynamic content rule on the \u201CRules\u201D tab and try again",
		MaxReplicasCountLimitReached: "The maximum number of dynamic content variations in a single template is {0}. The {1}st variation cannot be added",
		NotGroupItemSelectedCaption: "Selected item is not supported dynamic content. Please select content block to work with dynamic content"
	};
	var localizableImages = {
		AddButtonIcon: {
			source: 3,
			params: {
				schemaName: "DynamicBlockPropertiesPage",
				resourceItemName: "AddButtonIcon",
				hash: "82ee0c659590cd80a000af35c1f14d59",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});