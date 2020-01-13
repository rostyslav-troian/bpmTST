define("CtiBaseHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SysMsgLibSettingsEmptyMessage: "The \u0022Message exchange library\u0022 system setting is not set up"
	};
	var localizableImages = {
		ReadyStatusIcon: {
			source: 3,
			params: {
				schemaName: "CtiBaseHelper",
				resourceItemName: "ReadyStatusIcon",
				hash: "7d17c328707068255246bc6975998f3f",
				resourceItemExtension: ".png"
			}
		},
		BusyStatusIcon: {
			source: 3,
			params: {
				schemaName: "CtiBaseHelper",
				resourceItemName: "BusyStatusIcon",
				hash: "9b170e5514eb27351124f2c074a7b2e1",
				resourceItemExtension: ".png"
			}
		},
		AwayStatusIcon: {
			source: 3,
			params: {
				schemaName: "CtiBaseHelper",
				resourceItemName: "AwayStatusIcon",
				hash: "ba6a4659aa22601adf4487724c30a5ce",
				resourceItemExtension: ".png"
			}
		},
		ReadyStatusProfileMenuItemIcon: {
			source: 3,
			params: {
				schemaName: "CtiBaseHelper",
				resourceItemName: "ReadyStatusProfileMenuItemIcon",
				hash: "ba67c9ba7db46668ccc9312569a3ecca",
				resourceItemExtension: ".png"
			}
		},
		BusyStatusProfileMenuItemIcon: {
			source: 3,
			params: {
				schemaName: "CtiBaseHelper",
				resourceItemName: "BusyStatusProfileMenuItemIcon",
				hash: "f44e13e87724575acae12d6ddd052b46",
				resourceItemExtension: ".png"
			}
		},
		AwayStatusProfileMenuItemIcon: {
			source: 3,
			params: {
				schemaName: "CtiBaseHelper",
				resourceItemName: "AwayStatusProfileMenuItemIcon",
				hash: "f66f6873059e32f03237b5a432f07649",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});