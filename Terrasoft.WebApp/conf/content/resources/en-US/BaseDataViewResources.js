define("BaseDataViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectedFolderButtonCaption: "Folders",
		SectionQuickFilterButtonCaption: "Quick filter",
		AddFolderButtonCaption: "New folder",
		ActionsButtonCaption: "Actions",
		PrintButtonCaption: "Print",
		ViewOptionsButtonCaption: "View",
		GridDataViewCaption: "Open records list",
		AnalyticsDataViewCaption: "Open dashboards",
		SortButtonCaption: "Sort by",
		ShowRightPanelButtonCaption: "Show notification panel",
		HideLeftPanelButtonCaption: "Hide section panel",
		ShowAllFoldersButtonCaption: "Show all folders",
		AddStaticFolderButtonCaption: "Static",
		AddDynamicFolderButtonCaption: "Dynamic",
		AddQuickFilter: "Add filter",
		ExportListToFileButtonCaption: "Export list to file",
		SortMenuCaption: "Sort by",
		OpenGridSettingsCaption: "Select fields to display",
		AddRecordButtonCaption: "New",
		SelectMultipleRecordsButtonCaption: "Select multiple records",
		SelectOneRecordButtonCaption: "Cancel multiple selection",
		UnselectAllButtonCaption: "Deselect all",
		IncludeInFolderButtonCaption: "Add to folder",
		ExcludeFromFolderButtonCaption: "Exclude from folder",
		FindDuplicatesButtonCaption: "Find duplicates",
		DeleteRecordButtonCaption: "Delete",
		OpenSummarySettingsModuleButtonCaption: "Set up summaries",
		OpenAnalyticsViewButtonCaption: "Analytics",
		OpenSectionDesignerButtonCaption: "Open section wizard",
		SaveRecordButtonCaption: "Save",
		DiscardChangesButtonCaption: "Cancel",
		DeleteChart: "Are you sure that you want to delete the selected items?",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected record?",
		FiltersCaption: "Filter",
		GroupMenuItemCaption: "Group",
		UnGroupMenuItemCaption: "Ungroup",
		MoveUpMenuItemCaption: "Up",
		MoveDownMenuItemCaption: "Down",
		EditRightsCaption: "Set up access rights",
		AddChartButtonCaption: "New chart",
		ChartListHeaderCaption: "Charts",
		ReportListHeaderCaption: "Reports",
		EditChartButtonCaption: "Edit",
		DeleteChartButtonCaption: "Delete",
		ProcessEntryPointButtonCaption: "Move down the process",
		CloseButtonCaption: "Close",
		SubscribeCaption: "Follow the feed",
		UnsubscribeCaption: "Unfollow the feed",
		ScrollTopCaption: "Up",
		OpenPageDesignerButtonCaption: "Open page designer",
		OpenListSettingsCaption: "List setup",
		ReportsButtonCaption: "Reports",
		PrintFormButtonCaption: "Printables",
		ProsessButtonCaption: "Run process",
		RunProsessButtonCaption: "Run process",
		BeginProcessButtonMenuItemCaption: "Start process",
		ContinueProcessButtonMenuItemCaption: "Continue process",
		EmptyInfoTitle: "This section has no records.",
		EmptyInfoDescription: "Add a new record to make it look prettier.",
		EmptyInfoRecommendation: "Learn more about this section from the {0}Academy{1}.",
		EmptyFilterTitle: "There are no records matching the filter criteria.",
		EmptyFilterDescription: "Clear the filter or change its conditions.",
		EmptyFilterRecommendation: "",
		EmptyGroupTitle: "The selected static folder is empty.",
		EmptyGroupDescription: "Add records to the group.",
		EmptyGroupRecommendation: "Learn more about this feature from the {0}Academy{1}.",
		EmptyDynamicGroupTitle: "There are no records matching the group settings.",
		EmptyDynamicGroupDescription: "Clear the filter or change its conditions.",
		EmptyDynamicGroupRecommendation: "",
		QuickAddButtonHint: "Add related activity",
		ListDataViewHint: "List",
		DashboardsDataViewHint: "Dashboards",
		CombinedModeTagsButtonHint: "Tags",
		HideVerticalViewButtonHint: "Hide vertical view",
		BackButtonHint: "Show vertical view",
		MultiDeleteConfirmationMessage: "Are you sure that you want to delete the selected records?",
		OpenNewSectionDesignerButtonCaption: "Open new section wizard",
		SelectAllButtonCaption: "Select all",
		CanCustomizeWarning: "Define {0} attribute instead of overriding function {1} to empty",
		ExportListToExcelFileButtonCaption: "Export to Excel",
		OperationAccessDenied: "Current user does not have sufficient permissions to run \u0022{0}\u0022",
		ReExecuteMessage: "We are doing our best to optimize your filter. This will not take long.",
		QueryOptimizationFailedTitle: "Unfortunately, your filter could not be processed within the time allotted.",
		QueryOptimizationFailedRecommendation: "Please try changing the filter parameters or contact technical support.",
		MultiTagButtonCaption: "Add tag",
		DuplicatesActionCaptionPattern: "Show duplicate \u0027{0}\u0027",
		OpenChangeLogMenuCaption: "View change log",
		OpenObjectChangeLogSettingsCaption: "Change log setup"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "GridDataViewIcon",
				hash: "12f77829d9767e323f3647457abf613a",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataViewIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "AnalyticsDataViewIcon",
				hash: "58d3027ef6c189ae1dd2c620dd8fd5aa",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		SettingsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "SettingsButtonImage",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		scrollTopImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "scrollTopImage",
				hash: "2e74084b2581060d190bc92231e7bc12",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		EmptyFilterImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "EmptyFilterImage",
				hash: "7bf68ba9d5b686f7e46b0e23e89821bb",
				resourceItemExtension: ".png"
			}
		},
		EmptyGroupImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "EmptyGroupImage",
				hash: "be776f867efb6ad7e233612d77f19c12",
				resourceItemExtension: ".png"
			}
		},
		EmptyDynamicGroupImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "EmptyDynamicGroupImage",
				hash: "3d0048d99789c16848dbee2239555758",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ToggleSectionButton: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "ToggleSectionButton",
				hash: "7e47411934e85e6cf9834ebc72cff3e6",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "SortIcon",
				hash: "c0d8dfe7b1416f4c916f1d82523355ae",
				resourceItemExtension: ".svg"
			}
		},
		SummariesIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "SummariesIcon",
				hash: "f1f5f60ee306afca15aa461aac0fdad8",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		DataLoadFailedImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "DataLoadFailedImage",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		},
		AddTagsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "AddTagsButtonImage",
				hash: "c4683cf6e3fd3e28b391ff180a9c9c3d",
				resourceItemExtension: ".svg"
			}
		},
		ShowDuplicatesBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "ShowDuplicatesBtnImage",
				hash: "fa120a8db42142879bc508b69c6a5993",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseDataView",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});