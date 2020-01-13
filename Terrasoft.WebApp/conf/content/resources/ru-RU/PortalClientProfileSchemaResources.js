define("PortalClientProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewContactButtonCaption: "\u041D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
		NewAccountButtonCaption: "\u041D\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "PortalClientProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "369d63a19da2554e643df227d9995539",
				resourceItemExtension: ".svg"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "PortalClientProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		WarningIcon: {
			source: 3,
			params: {
				schemaName: "PortalClientProfileSchema",
				resourceItemName: "WarningIcon",
				hash: "7c30d18f62d3b30b5a104a216dd36f26",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "PortalClientProfileSchema",
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