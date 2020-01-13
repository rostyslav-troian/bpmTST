define("EmployeeProfileSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MobilePhoneCaption: "Mobile phone",
		PhoneCaption: "Work phone"
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