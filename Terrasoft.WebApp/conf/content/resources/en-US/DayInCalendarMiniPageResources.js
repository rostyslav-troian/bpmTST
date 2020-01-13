define("DayInCalendarMiniPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WorkingHoursCaption: "Set working hours for {0}",
		ValidationErrorFullMessage: "Please validate the selected working intervals.",
		ValidationErrorMessage: "Please validate the intervals.",
		FromCaption: "from",
		ToCaption: "to",
		StartFinishErrorMessage: "In the \u201C{0}-{1}\u201D period a start time should be less than an end time. Please change the values",
		EmptyIntervalErrorMessage: "There are unfilled parameters in the period. Please add the values",
		IntersectIntervalErrorMessage: "Time intervals \u201C{0}-{1}\u201D and \u201C{2}-{3}\u201D are intersected. Please change the values"
	};
	var localizableImages = {
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "AddButtonImage",
				hash: "c15d635407f524f3bbe4f1810b82d315",
				resourceItemExtension: ".png"
			}
		},
		OpenCurrentEntityPageImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "OpenCurrentEntityPageImage",
				hash: "857178d6a8f045a025f4455df129833c",
				resourceItemExtension: ".svg"
			}
		},
		OpenEditModeImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "OpenEditModeImage",
				hash: "f4851d37a323f17fc7a7036b77314b24",
				resourceItemExtension: ".svg"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "CloseButtonImage",
				hash: "240cebbe345223f2c270c01be7949519",
				resourceItemExtension: ".svg"
			}
		},
		SaveButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "SaveButtonImage",
				hash: "9d83c749eceae73dbe461501d5b8df55",
				resourceItemExtension: ".svg"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "CancelButtonImage",
				hash: "84b6270935b18aa084d202b7f50696b6",
				resourceItemExtension: ".svg"
			}
		},
		ConnectionsImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "ConnectionsImage",
				hash: "82a2caf9022ddbf42fc6455f36c3df03",
				resourceItemExtension: ".svg"
			}
		},
		AddConnectionIcon: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "AddConnectionIcon",
				hash: "dd20561c78ee86d5e1c4f3befac5cb48",
				resourceItemExtension: ".svg"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "DayInCalendarMiniPage",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});