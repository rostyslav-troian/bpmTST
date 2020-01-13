define("LeadAccountProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SimilarButtonFoundHintText: "We have found several accounts that can be linked to this lead. Click here to choose one from the list.",
		SimilarButtonNotFoundHintText: "We didn\u2019t find any accounts that can be linked to this lead.",
		SimilarButtonCaption: "Select from {0} similar"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "LeadAccountProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "1d9a0f56594f86dfe103ac4fec80c534",
				resourceItemExtension: ".svg"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "LeadAccountProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "LeadAccountProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "1d9a0f56594f86dfe103ac4fec80c534",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});