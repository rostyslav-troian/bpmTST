define("TimezoneGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TimezoneSaveButton: "Save",
		TimezoneCancelButton: "Cancel",
		DefaultTimeZoneCaption: "?",
		TimezoneHeader: "It is easy to plan activities for employees and customers in different time zones. Specify the local time and time zone of the activity and the system will schedule it on the calendar taking into account your local time.",
		TimezoneLabel: "Time zone",
		StartDateLabel: "Start",
		DueDateLabel: "Due"
	};
	var localizableImages = {
		TimeZoneImage: {
			source: 3,
			params: {
				schemaName: "TimezoneGenerator",
				resourceItemName: "TimeZoneImage",
				hash: "393b9f21f924bc6d79fc1ed1c7cc174d",
				resourceItemExtension: ".svg"
			}
		},
		TimezoneButtonIcon: {
			source: 3,
			params: {
				schemaName: "TimezoneGenerator",
				resourceItemName: "TimezoneButtonIcon",
				hash: "6c288d14762e6034e9ab2ff3f4e1a893",
				resourceItemExtension: ".svg"
			}
		},
		TimezoneSaveButtonIcon: {
			source: 3,
			params: {
				schemaName: "TimezoneGenerator",
				resourceItemName: "TimezoneSaveButtonIcon",
				hash: "9d83c749eceae73dbe461501d5b8df55",
				resourceItemExtension: ".svg"
			}
		},
		TimezoneCancelButtonIcon: {
			source: 3,
			params: {
				schemaName: "TimezoneGenerator",
				resourceItemName: "TimezoneCancelButtonIcon",
				hash: "84b6270935b18aa084d202b7f50696b6",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});