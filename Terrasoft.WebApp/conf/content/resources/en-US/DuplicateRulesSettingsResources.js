define("DuplicateRulesSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GridColumnCaption: "Attribute",
		DeleteMenuCaption: "Delete",
		GridCaption: "Attributes",
		RuleCaptionTemplate: "{0} duplicates. {1}",
		AttributeInformationText: "Attributes of these deduplication rules are used for searching contacts and accounts that are similar to leads. These attributes cannot be modified"
	};
	var localizableImages = {
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "DuplicateRulesSettings",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "DuplicateRulesSettings",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});