define("TagModuleSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddNewPrivateTagCaption: "New private tag {0}",
		AddNewCorporateTagCaption: "New corporate tag {0}",
		AddNewPublicTagCaption: "New public tag {0}",
		TagsHeaderLabelCaption: "Tags",
		PlaceholderText: "Enter tag name",
		EntityTagSchemaIsEmptyMessage: "Tags object schema name not entered.",
		NoRightsToAdd: "Insufficient rights to add record to the \u0022{0}\u0022 object"
	};
	var localizableImages = {
		CreateNewPrivateTagIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "CreateNewPrivateTagIcon",
				hash: "3b72fa3e94cfbf0b152feae11daac670",
				resourceItemExtension: ".png"
			}
		},
		CreateNewCorporateTagIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "CreateNewCorporateTagIcon",
				hash: "d49a70992bcc488ff526375ed44d54d2",
				resourceItemExtension: ".png"
			}
		},
		CreateNewPublicTagIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "CreateNewPublicTagIcon",
				hash: "ab6411b39117eda89c2241631f5ba74e",
				resourceItemExtension: ".png"
			}
		},
		ExistsPrivateTagIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "ExistsPrivateTagIcon",
				hash: "a8d84995bd2a30d7079831d5318c84e0",
				resourceItemExtension: ".png"
			}
		},
		ExistsCorporateTagIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "ExistsCorporateTagIcon",
				hash: "1cd2de3522bb1eef0f01862b57bbb22a",
				resourceItemExtension: ".png"
			}
		},
		ExistsPublicTagIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "ExistsPublicTagIcon",
				hash: "86b46f81c75bbe6a8d1d4262eff00c5a",
				resourceItemExtension: ".png"
			}
		},
		RemoveTagFromEntityIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "RemoveTagFromEntityIcon",
				hash: "14c33af24687168afcef944b238904fa",
				resourceItemExtension: ".png"
			}
		},
		LookupRightIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "LookupRightIcon",
				hash: "6bb0903bf98be0d4922f4fbaca3d19de",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "TagModuleSchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});