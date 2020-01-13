define("AddressSelectionDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Delivery address",
		AddAddress: "Add address",
		RequiredFieldsMessage: "Please fill in the \u0022Customer\u0022 field",
		NewAddressHint: "New address",
		FieldsGroupCollapseButtonHint: "Collapse\/expand"
	};
	var localizableImages = {
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "AddressSelectionDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "AddressSelectionDetailV2",
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