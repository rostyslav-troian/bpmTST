define("BaseActionsDashboardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DashboardTabCaptionPattern: "Next steps ({0})",
		HideItemsCaption: "hide",
		ShowAllItemsCaption: "show all",
		BlankSlateDescription: "You don\u0027t have any tasks yet\u003Cp\u003EPress \u003Cimg src=\u0022{0}\u0022 \u003E above to add a task"
	};
	var localizableImages = {
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		LoadLessIcon: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "LoadLessIcon",
				hash: "0cc781465d0612a537eb2861edf18706",
				resourceItemExtension: ".png"
			}
		},
		BlankSlateImage: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "BlankSlateImage",
				hash: "71ca1e06fc6c5119c41da0b69a1d3196",
				resourceItemExtension: ".svg"
			}
		},
		FlagGreyImage: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "FlagGreyImage",
				hash: "de5ec586cf912d75ae03e3a3071b3252",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});