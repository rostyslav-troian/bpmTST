define("FixedFilterViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		YesterdayCaption: "Yesterday",
		TodayCaption: "Today",
		TomorrowCaption: "Tomorrow",
		PastWeekCaption: "Previous week",
		CurrentWeekCaption: "Current week",
		NextWeekCaption: "Next week",
		PastMonthCaption: "Previous month",
		CurrentMonthCaption: "Current month",
		NextMonthCaption: "Next month",
		ClearCaption: "Clear",
		QuickListSettingsCaption: "Set up quick list",
		PeriodToLabelCaption: "till",
		EmptyDateDisplayValue: "unlimited",
		StartDatePlaceholder: "\u003CStart date\u003E",
		DueDatePlaceholder: "\u003CDue date\u003E"
	};
	var localizableImages = {
		PeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "FixedFilterView",
				resourceItemName: "PeriodButtonImage",
				hash: "62b7c35bd5ad896ab658d876780cff03",
				resourceItemExtension: ".png"
			}
		},
		LookupButtonImage: {
			source: 3,
			params: {
				schemaName: "FixedFilterView",
				resourceItemName: "LookupButtonImage",
				hash: "ff23a0ef40686f71f5d415ae07137b79",
				resourceItemExtension: ".png"
			}
		},
		RemoveButtonImage: {
			source: 3,
			params: {
				schemaName: "FixedFilterView",
				resourceItemName: "RemoveButtonImage",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "FixedFilterView",
				resourceItemName: "ApplyButtonImage",
				hash: "87fea5a995ec309ade9719e3aaab7c33",
				resourceItemExtension: ".png"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "FixedFilterView",
				resourceItemName: "CancelButtonImage",
				hash: "bc577de06132c42e584683b41f45878c",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});