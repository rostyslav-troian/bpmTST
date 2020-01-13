define("EmployeeProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MobilePhoneCaption: "\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
		PhoneCaption: "\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "EmployeeProfileSchema",
				resourceItemName: "BlankSlateIcon",
				hash: "ef9d41ccd0910f06a10d5d9674319faa",
				resourceItemExtension: ".svg"
			}
		},
		ClearButton: {
			source: 3,
			params: {
				schemaName: "EmployeeProfileSchema",
				resourceItemName: "ClearButton",
				hash: "e469377aa2358c21942fe57d0e1fef21",
				resourceItemExtension: ".png"
			}
		},
		ProfileIcon: {
			source: 3,
			params: {
				schemaName: "EmployeeProfileSchema",
				resourceItemName: "ProfileIcon",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});