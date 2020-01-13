define("LeadContactProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SimilarButtonNotFoundHintText: "We didn\u2019t find any contacts that can be linked to this lead.",
		SimilarButtonFoundHintText: "We have found several contacts that can be linked to this lead. Click here to choose one from the list.",
		SimilarButtonCaption: "Select from {0} similar"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "LeadContactProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "ca1ce7681de14eb36954a0e83a2a550c",
				resourceItemExtension: ".svg"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "LeadContactProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "LeadContactProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "ca1ce7681de14eb36954a0e83a2a550c",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});