﻿define("ClientProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Client: "Customer",
		WarningMessage: "Customer field has contact and account"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "ClientProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "369d63a19da2554e643df227d9995539",
				resourceItemExtension: ".svg"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "ClientProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		WarningIcon: {
			source: 3,
			params: {
				schemaName: "ClientProfileSchema",
				resourceItemName: "WarningIcon",
				hash: "7c30d18f62d3b30b5a104a216dd36f26",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "ClientProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "369d63a19da2554e643df227d9995539",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});