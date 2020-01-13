var Terrasoft = Terrasoft || {};
Terrasoft.configuration = Terrasoft.configuration || {};
Terrasoft.configuration.RootSchemaDescriptors = {
	AccountMiniPageCSS: {
		css: ["AccountMiniPageCSS"]
	},
	AccountRelationshipDetailCss: {
		css: ["AccountRelationshipDetailCss"]
	},
	ActionButtonHelper: {
		css: ["ActionButtonHelper"]
	},
	ActionsDashboardCSS: {
		css: ["ActionsDashboardCSS"]
	},
	ActivityDashboardSection: {
		messages: {
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GenerateChart": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetChartFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetChartParameters": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ActivityMiniPageCSS: {
		css: ["ActivityMiniPageCSS"]
	},
	ActivityTimezoneMixin: {
		css: ["ActivityTimezoneMixin"]
	},
	AddTagModule: {
		css: ["AddTagModule"], 
		messages: {
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"SaveTags": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetTagFilters": { "direction": "subscribe", "mode": "ptp" },
			"GetTagsSaved": { "direction": "publish", "mode": "ptp" },
			"ReRenderTagModule": { "direction": "subscribe", "mode": "ptp" },
			"ChangeTags": { "direction": "publish", "mode": "ptp" },
			"AddTagModuleDataReload": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	AddTagViewModule: {
		messages: {
			"ChangeTags": { "direction": "publish", "mode": "ptp" }
		}
	},
	AdministrationCSSV2: {
		css: ["AdministrationCSSV2"]
	},
	AlignableContainer: {
		css: ["AlignableContainer"]
	},
	AnalyticsModule: {
		css: ["AnalyticsModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"PushHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"GenerateChart": { "direction": "publish", "mode": "ptp" }
		}
	},
	ApplicationStructureItemWizard: {
		css: ["ApplicationStructureItemWizard"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetPageDesignerConfig": { "direction": "subscribe", "mode": "ptp" },
			"PostPageDesignerConfig": { "direction": "publish", "mode": "broadcast" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	AutosizeModule: {
		css: ["AutosizeModule"]
	},
	AwaitingOpportunitiesDashboardSection: {
		messages: {
			"GenerateChart": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetChartFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetChartParameters": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	BaseBulkEmailPageV2Styles: {
		css: ["BaseBulkEmailPageV2Styles"]
	},
	BaseContentItemStructurePageCSS: {
		css: ["BaseContentItemStructurePageCSS"]
	},
	BaseEnrichmentSchemaCSS: {
		css: ["BaseEnrichmentSchemaCSS"]
	},
	BaseFolderManager: {
		css: ["BaseFolderManager"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"FolderInfo": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilter": { "direction": "subscribe", "mode": "ptp" },
			"ResultExtendedFilter": { "direction": "publish", "mode": "broadcast" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedFolders": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"HideFolderTree": { "direction": "publish", "mode": "broadcast" },
			"ResultFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"QuickFilterChanged": { "direction": "publish", "mode": "broadcast" },
			"GetFolderFilter": { "direction": "publish", "mode": "ptp" },
			"AddFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"ClearFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"UpdateFilter": { "direction": "publish", "mode": "broadcast" },
			"UpdateCustomFilterMenu": { "direction": "publish", "mode": "broadcast" },
			"AddFolderActionFired": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateFavoritesMenu": { "direction": "publish", "mode": "broadcast" },
			"CustomFilterExtendedMode": { "direction": "publish", "mode": "broadcast" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" }
		}
	},
	BaseFontsCSS: {
		css: ["BaseFontsCSS"]
	},
	BaseGeneratedWebFormPageV2CSS: {
		css: ["BaseGeneratedWebFormPageV2CSS"]
	},
	BaseLookupSectionCSS: {
		css: ["BaseLookupSectionCSS"]
	},
	BaseMarketingCalendarSectionCSS: {
		css: ["BaseMarketingCalendarSectionCSS"]
	},
	BaseMessagePublisherModule: {
		css: ["BaseMessagePublisherModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"RerenderPublisherModule": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	BaseMiniPageCSS: {
		css: ["BaseMiniPageCSS"]
	},
	BaseModalBoxPageCss: {
		css: ["BaseModalBoxPageCss"]
	},
	BaseModulePageWithRightDetailContainerCSS: {
		css: ["BaseModulePageWithRightDetailContainerCSS"]
	},
	BaseMultilingualEntityLookupPageStyles: {
		css: ["BaseMultilingualEntityLookupPageStyles"]
	},
	BaseNotificationTargetLoader: {
		messages: {
			"GetNotificationInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	BasePageRightContainerProcessTemplateCSS: {
		css: ["BasePageRightContainerProcessTemplateCSS"]
	},
	BasePageV2CSS: {
		css: ["BasePageV2CSS"]
	},
	BaseProcessExecutingDetailCSS: {
		css: ["BaseProcessExecutingDetailCSS"]
	},
	BaseProcessLibSectionCSS: {
		css: ["BaseProcessLibSectionCSS"]
	},
	BaseProcessLogSectionCSS: {
		css: ["BaseProcessLogSectionCSS"]
	},
	BaseProcessParametersEditModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	BaseProcessSettingsCSS: {
		css: ["BaseProcessSettingsCSS"]
	},
	BaseProfileSchemaCSS: {
		css: ["BaseProfileSchemaCSS"]
	},
	BaseProgressBarModule: {
		css: ["BaseProgressBarModule"]
	},
	BaseSchemaModuleV2: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	BaseSectionV2CSS: {
		css: ["BaseSectionV2CSS"]
	},
	BaseStageControl: {
		css: ["BaseStageControl"]
	},
	BaseStageControlItem: {
		css: ["BaseStageControlItem"]
	},
	BaseViewModule: {
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	BaseVwProcessLibPageV2CSS: {
		css: ["BaseVwProcessLibPageV2CSS"]
	},
	BaseWidgetDesignerCSS: {
		css: ["BaseWidgetDesignerCSS"]
	},
	BaseWizardModule: {
		css: ["BaseWizardModule"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"HeaderStepClicked": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeaderStep": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" },
			"GetModuleConfigResult": { "direction": "publish", "mode": "ptp" },
			"Validate": { "direction": "publish", "mode": "ptp" },
			"ValidationResult": { "direction": "subscribe", "mode": "ptp" },
			"Save": { "direction": "publish", "mode": "ptp" },
			"SavingResult": { "direction": "subscribe", "mode": "ptp" },
			"SaveWizard": { "direction": "subscribe", "mode": "ptp" },
			"GetPackageUId": { "direction": "subscribe", "mode": "ptp" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	BaseWorkplaceLoader: {
		messages: {
			"PostSectionMenuConfig": { "direction": "publish", "mode": "ptp" },
			"GetWorkplaceInfo": { "direction": "publish", "mode": "ptp" },
			"GetSectionMenuInfo": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	BpmonlineCloudIntegrationPageV2CSS: {
		css: ["BpmonlineCloudIntegrationPageV2CSS"]
	},
	BulkEmailClicksMap: {
		css: ["BulkEmailClicksMap"], 
		messages: {
			"GetClicksMapConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	BulkEmailContentBuilderCSS: {
		css: ["BulkEmailContentBuilderCSS"]
	},
	BulkEmailContentWizardCSS: {
		css: ["BulkEmailContentWizardCSS"]
	},
	BulkEmailContentWizardHeadersCSS: {
		css: ["BulkEmailContentWizardHeadersCSS"]
	},
	BulkEmailContentWizardPreviewCSS: {
		css: ["BulkEmailContentWizardPreviewCSS"]
	},
	BulkEmailHyperlinkDetailV2CSS: {
		css: ["BulkEmailHyperlinkDetailV2CSS"]
	},
	BulkEmailHyperlinkLookupPageCSS: {
		css: ["BulkEmailHyperlinkLookupPageCSS"]
	},
	BulkEmailSplitPageV2CSS: {
		css: ["BulkEmailSplitPageV2CSS"]
	},
	BusinessRuleActionDesignerContainer: {
		css: ["BusinessRuleActionDesignerContainer"]
	},
	BusinessRuleBindParameterActionDesignerContainer: {
		css: ["BusinessRuleBindParameterActionDesignerContainer"]
	},
	BusinessRuleConditionGroupDesignerContainer: {
		css: ["BusinessRuleConditionGroupDesignerContainer"]
	},
	BusinessRuleFilterActionConditionDesignerViewModel: {
		css: ["BusinessRuleFilterActionConditionDesignerViewModel"]
	},
	BusinessRuleFilterActionDesignerContainer: {
		css: ["BusinessRuleFilterActionDesignerContainer"]
	},
	BusinessRuleSchemaDesignerCSS: {
		css: ["BusinessRuleSchemaDesignerCSS"]
	},
	BusinessRuleSectionCSS: {
		css: ["BusinessRuleSectionCSS"]
	},
	CallMessagePublisherModule: {
		css: ["CallMessagePublisherModule"], 
		messages: {
			"RerenderPublisherModule": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	CallSectionGridRowViewModel: {
		css: ["CallSectionGridRowViewModel"]
	},
	CampaignDesigner: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"ReRenderElement": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	CampaignDesignerCSS: {
		css: ["CampaignDesignerCSS"]
	},
	CampaignDetailV2CSS: {
		css: ["CampaignDetailV2CSS"]
	},
	CampaignDiagramModuleCSS: {
		css: ["CampaignDiagramModuleCSS"]
	},
	CampaignDiagramPropertyConnectorPageCSS: {
		css: ["CampaignDiagramPropertyConnectorPageCSS"]
	},
	CampaignDiagramPropertyModule: {
		css: ["CampaignDiagramPropertyModule"], 
		messages: {
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"DiagramElementChanged": { "direction": "subscribe", "mode": "ptp" },
			"FindConnectorTargetNode": { "direction": "publish", "mode": "ptp" },
			"CardChanged": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	CampaignDiagramToolsModule: {
		css: ["CampaignDiagramToolsModule"], 
		messages: {
			"ToolIconDropped": { "direction": "publish", "mode": "ptp" }
		}
	},
	CampaignPageCSS: {
		css: ["CampaignPageCSS"]
	},
	CampaignPageV2CSS: {
		css: ["CampaignPageV2CSS"]
	},
	CampaignSchemaDesignerViewModel: {
		messages: {
			"SetDefaultValuesApproved": { "direction": "publish", "mode": "broadcast" }
		}
	},
	CampaignSchemaElementPropertiesEdit: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSchema": { "direction": "publish", "mode": "ptp" }
		}
	},
	CampaignSchemaElementPropertiesEditCSS: {
		css: ["CampaignSchemaElementPropertiesEditCSS"]
	},
	CampaignSchemaViewerFiltersCSS: {
		css: ["CampaignSchemaViewerFiltersCSS"]
	},
	CampaignSchemaViewerModule: {
		messages: {
			"GetSchemaViewerConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	CampaignTimerPageCSS: {
		css: ["CampaignTimerPageCSS"]
	},
	CardModule: {
		css: ["CardModule"], 
		messages: {
			"LoadData": { "direction": "publish", "mode": "broadcast" },
			"DetailInfo": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"SaveDetails": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"GetCardSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"SaveRecord": { "direction": "subscribe", "mode": "broadcast" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"RequestDetailItems": { "direction": "publish", "mode": "ptp" },
			"GetDetailItems": { "direction": "subscribe", "mode": "ptp" },
			"FindDuplicatesResult": { "direction": "subscribe", "mode": "broadcast" },
			"GetPredefinedRecords": { "direction": "subscribe", "mode": "ptp" },
			"ChangeRemindingsCounts": { "direction": "publish", "mode": "broadcast" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"LookupPageInfo": { "direction": "publish", "mode": "ptp" },
			"DoNotUseCommunication": { "direction": "subscribe", "mode": "ptp" },
			"ShowLookupPage": { "direction": "subscribe", "mode": "ptp" },
			"LookupResultSelected": { "direction": "publish", "mode": "ptp" },
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"GetProcessExecDataCollection": { "direction": "publish", "mode": "ptp" },
			"GetEntityName": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "publish", "mode": "ptp" },
			"OpenCardModule": { "direction": "subscribe", "mode": "ptp" },
			"UpdateDetail": { "direction": "publish", "mode": "ptp" },
			"OpenGridSettings": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleResponse": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" },
			"DetailChanged": { "direction": "subscribe", "mode": "broadcast" },
			"LoadCustomModule": { "direction": "subscribe", "mode": "ptp" },
			"UpdateCommentCounter": { "direction": "subscribe", "mode": "ptp" },
			"GetAdditionalFilterValue": { "direction": "subscribe", "mode": "ptp" },
			"DestroyCommentModule": { "direction": "publish", "mode": "ptp" },
			"GetParentContainer": { "direction": "publish", "mode": "ptp" },
			"IncomingPtp": { "direction": "subscribe", "mode": "ptp" },
			"IncomingBroadcast": { "direction": "subscribe", "mode": "broadcast" },
			"OutcomingPtp": { "direction": "publish", "mode": "ptp" },
			"OutcomingBroadcast": { "direction": "publish", "mode": "broadcast" },
			"GetEntityColumnValues": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDetail": { "direction": "publish", "mode": "ptp" },
			"SetDetailReadOnly": { "direction": "publish", "mode": "ptp" },
			"GetProcessEntryPointsData": { "direction": "publish", "mode": "ptp" },
			"GetMapsConfig": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetIsDetailReadonly": { "direction": "subscribe", "mode": "ptp" },
			"GetCardModuleSandboxId": { "direction": "subscribe", "mode": "ptp" },
			"DetailSaved": { "direction": "subscribe", "mode": "ptp" },
			"RefreshFiles": { "direction": "publish", "mode": "broadcast" },
			"DestroyFilesModule": { "direction": "publish", "mode": "ptp" },
			"FileDeleted": { "direction": "subscribe", "mode": "ptp" },
			"RefreshWorkplace": { "direction": "publish", "mode": "ptp" },
			"GetWidgetParameters": { "direction": "publish", "mode": "ptp" },
			"PushWidgetParameters": { "direction": "publish", "mode": "ptp" },
			"CardProccessModuleInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	CardModuleV2: {
		css: ["CardModuleV2"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetDetailInfo": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"getCardInfo": { "direction": "publish", "mode": "ptp" },
			"RerenderDetail": { "direction": "publish", "mode": "ptp" },
			"CardModuleResponse": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	CardProcessModule: {
		css: ["CardProcessModule"], 
		messages: {
			"LoadData": { "direction": "publish", "mode": "broadcast" },
			"DetailInfo": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"SaveDetails": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"GetCardSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"SaveRecord": { "direction": "subscribe", "mode": "broadcast" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"RequestDetailItems": { "direction": "publish", "mode": "ptp" },
			"GetDetailItems": { "direction": "subscribe", "mode": "ptp" },
			"FindDuplicatesResult": { "direction": "subscribe", "mode": "broadcast" },
			"GetPredefinedRecords": { "direction": "subscribe", "mode": "ptp" },
			"ChangeRemindingsCounts": { "direction": "publish", "mode": "broadcast" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"LookupPageInfo": { "direction": "publish", "mode": "ptp" },
			"DoNotUseCommunication": { "direction": "subscribe", "mode": "ptp" },
			"ShowLookupPage": { "direction": "subscribe", "mode": "ptp" },
			"LookupResultSelected": { "direction": "publish", "mode": "ptp" },
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"GetProcessExecDataCollection": { "direction": "publish", "mode": "ptp" },
			"GetEntityName": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "publish", "mode": "ptp" },
			"OpenCardModule": { "direction": "subscribe", "mode": "ptp" },
			"UpdateDetail": { "direction": "publish", "mode": "ptp" },
			"OpenGridSettings": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleResponse": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" },
			"DetailChanged": { "direction": "subscribe", "mode": "broadcast" },
			"LoadCustomModule": { "direction": "subscribe", "mode": "ptp" },
			"UpdateCommentCounter": { "direction": "subscribe", "mode": "ptp" },
			"GetAdditionalFilterValue": { "direction": "subscribe", "mode": "ptp" },
			"DestroyCommentModule": { "direction": "publish", "mode": "ptp" },
			"GetParentContainer": { "direction": "publish", "mode": "ptp" },
			"IncomingPtp": { "direction": "subscribe", "mode": "ptp" },
			"IncomingBroadcast": { "direction": "subscribe", "mode": "broadcast" },
			"OutcomingPtp": { "direction": "publish", "mode": "ptp" },
			"OutcomingBroadcast": { "direction": "publish", "mode": "broadcast" },
			"GetEntityColumnValues": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDetail": { "direction": "publish", "mode": "ptp" },
			"SetDetailReadOnly": { "direction": "publish", "mode": "ptp" },
			"GetProcessEntryPointsData": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "publish", "mode": "ptp" },
			"SideBarLoadModule": { "direction": "publish", "mode": "ptp" },
			"SideBarBack": { "direction": "publish", "mode": "ptp" },
			"GetSideBarCurrentConfig": { "direction": "publish", "mode": "ptp" },
			"CustomSideBarInfo": { "direction": "publish", "mode": "ptp" },
			"CustomSideBarDefInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetWidgetParameters": { "direction": "publish", "mode": "ptp" },
			"PushWidgetParameters": { "direction": "publish", "mode": "ptp" }
		}
	},
	CardProcessViewModelGenerator: {
		messages: {
			"OpenDelayExecutionModule": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateCardModule": { "direction": "publish", "mode": "ptp" }
		}
	},
	CardViewModelGenerator: {
		messages: {
			"OpenDelayExecutionModule": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateCardModule": { "direction": "publish", "mode": "ptp" }
		}
	},
	CardWidgetModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"EntityInitialized": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	CasePageCSS: {
		css: ["CasePageCSS"]
	},
	CasePageTimeZoneModule: {
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	CasePageTimeZoneModuleSchemaCSS: {
		css: ["CasePageTimeZoneModuleSchemaCSS"]
	},
	CasePageV2CSS: {
		css: ["CasePageV2CSS"]
	},
	CaseProcessingCSS: {
		css: ["CaseProcessingCSS"]
	},
	CasesEstimateLabel: {
		css: ["CasesEstimateLabel"]
	},
	CaseTimelineItemView: {
		css: ["CaseTimelineItemView"]
	},
	CenterNotificationModule: {
		css: ["CenterNotificationModule"], 
		messages: {
			"GetNotificationInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ChangePasswordModule: {
		css: ["ChangePasswordModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ChangeProjectDates: {
		css: ["ChangeProjectDates"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "publish", "mode": "ptp" },
			"UpdateDetail": { "direction": "publish", "mode": "ptp" }
		}
	},
	ChartDashboardSection: {
		messages: {
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	ChartDesignerLess: {
		css: ["ChartDesignerLess"]
	},
	ChartjsProvider: {
		css: ["ChartjsProvider"]
	},
	ChartModule: {
		css: ["ChartModule"], 
		messages: {
			"GenerateChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "publish", "mode": "ptp" },
			"GetChartFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"DestroyCurrentChart": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"FiltersChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetChartConfig": { "direction": "publish", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"SectionUpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ChartModuleEx: {
		css: ["ChartModuleEx"], 
		messages: {
			"GenerateChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "publish", "mode": "ptp" },
			"GetChartFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"DestroyCurrentChart": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"FiltersChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetChartConfig": { "direction": "publish", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	CheckBoxDateBlockGeneratorV2: {
		css: ["CheckBoxDateBlockGeneratorV2"]
	},
	CheckBoxFixedFilterStyle: {
		css: ["CheckBoxFixedFilterStyle"]
	},
	ckeditor: {
		css: ["ckeditor"]
	},
	CollapsibleContainer: {
		css: ["CollapsibleContainer"]
	},
	ColumnPage: {
		css: ["ColumnPage"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"GetColumnInfo": { "direction": "publish", "mode": "ptp" },
			"PushColumnInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	ColumnSettings: {
		css: ["ColumnSettings"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ColumnSettingsInfo": { "direction": "publish", "mode": "ptp" },
			"ColumnSetuped": { "direction": "publish", "mode": "ptp" },
			"GetExtendedFilter": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	ColumnSettingsUtilities: {
		messages: {
			"ColumnSettingsInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	CommandLineModule: {
		css: ["CommandLineModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetCardSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ChangeCommandList": { "direction": "subscribe", "mode": "broadcast" },
			"FilterCurrentSection": { "direction": "publish", "mode": "ptp" },
			"GlobalSearch": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"SetCommandLineValue": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	CommentsModule: {
		messages: {
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"GetDetailItems": { "direction": "publish", "mode": "ptp" },
			"DestroyCommentModule": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"SaveRecord": { "direction": "publish", "mode": "broadcast" },
			"UpdateDetail": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	CommentsWithFilesModulesHelper: {
		css: ["CommentsWithFilesModulesHelper"]
	},
	CommonCSSV2: {
		css: ["CommonCSSV2"]
	},
	CommonFilterUtils: {
		css: ["CommonFilterUtils"]
	},
	CommunicationPanelModule: {
		css: ["CommunicationPanelModule"], 
		messages: {
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"CommunicationPanelItemSelected": { "direction": "publish", "mode": "broadcast" },
			"ShowHideRightSidePanel": { "direction": "publish", "mode": "broadcast" }
		}
	},
	CompaniesListCSS: {
		css: ["CompaniesListCSS"]
	},
	CompletenessCSSV2: {
		css: ["CompletenessCSSV2"]
	},
	CompletenessIndicator: {
		css: ["CompletenessIndicator"]
	},
	CompletenessMenuItem: {
		css: ["CompletenessMenuItem"]
	},
	ConfigurationGrid: {
		css: ["ConfigurationGrid"]
	},
	ConfigurationModuleV2: {
		css: ["ConfigurationModuleV2"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	ConfigurationViewModule: {
		css: ["ConfigurationViewModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"SideBarVisibilityChanged": { "direction": "subscribe", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"SideBarModuleDefInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushSideBarModuleDefInfo": { "direction": "publish", "mode": "ptp" },
			"GetSideBarConfig": { "direction": "publish", "mode": "ptp" },
			"CardProccessModuleInfo": { "direction": "subscribe", "mode": "ptp" },
			"ShowHideRightSidePanel": { "direction": "subscribe", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeGridUtilitiesContainerSize": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ContactEnrichmentSchemaCSS: {
		css: ["ContactEnrichmentSchemaCSS"]
	},
	ContactMiniPageCSS: {
		css: ["ContactMiniPageCSS"]
	},
	ContactPageV2CSS: {
		css: ["ContactPageV2CSS"]
	},
	ContactSectionV2CSS: {
		css: ["ContactSectionV2CSS"]
	},
	ContentBlockCSS: {
		css: ["ContentBlockCSS"]
	},
	ContentBlockDesignerCSS: {
		css: ["ContentBlockDesignerCSS"]
	},
	ContentBuilderCSS: {
		css: ["ContentBuilderCSS"]
	},
	ContentBuilderElement: {
		css: ["ContentBuilderElement"]
	},
	ContentBuilderUserBlock: {
		css: ["ContentBuilderUserBlock"]
	},
	ContentItemPropertiesPageCSS: {
		css: ["ContentItemPropertiesPageCSS"]
	},
	ContentItemStylesPageCSS: {
		css: ["ContentItemStylesPageCSS"]
	},
	ContentMjButtonPropertiesPageCSS: {
		css: ["ContentMjButtonPropertiesPageCSS"]
	},
	ContentMjDividerPropertiesPageCSS: {
		css: ["ContentMjDividerPropertiesPageCSS"]
	},
	ContentMjHeroPropertiesPageCSS: {
		css: ["ContentMjHeroPropertiesPageCSS"]
	},
	ContentMjmlImagePropertiesPageCSS: {
		css: ["ContentMjmlImagePropertiesPageCSS"]
	},
	ContentMjRawPropertiesPageCSS: {
		css: ["ContentMjRawPropertiesPageCSS"]
	},
	ContentNavbarLinkPropertiesPageCSS: {
		css: ["ContentNavbarLinkPropertiesPageCSS"]
	},
	ContentNavbarPropertiesPageCSS: {
		css: ["ContentNavbarPropertiesPageCSS"]
	},
	ContentPreviewBlock: {
		css: ["ContentPreviewBlock"]
	},
	ContentSmartHtmlPropertiesPageCSS: {
		css: ["ContentSmartHtmlPropertiesPageCSS"]
	},
	ContentSpacerPropertiesPageCSS: {
		css: ["ContentSpacerPropertiesPageCSS"]
	},
	ContentUserBlockEditPageCSS: {
		css: ["ContentUserBlockEditPageCSS"]
	},
	ContextHelpModule: {
		css: ["ContextHelpModule"], 
		messages: {
			"GetContextHelpId": { "direction": "publish", "mode": "ptp" },
			"ChangeContextHelpId": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ContextHelpProfileSchemaCSS: {
		css: ["ContextHelpProfileSchemaCSS"]
	},
	ContextTipManager: {
		css: ["ContextTipManager"]
	},
	CredentialsSyncSettingsEdit: {
		css: ["CredentialsSyncSettingsEdit"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	CtiPanelModule: {
		css: ["CtiPanelModule"]
	},
	CTIProcessActionsCSS: {
		css: ["CTIProcessActionsCSS"]
	},
	CurrencyCommonCSS: {
		css: ["CurrencyCommonCSS"]
	},
	CustomerAccessLookupPageCSS: {
		css: ["CustomerAccessLookupPageCSS"]
	},
	CustomFilterViewModelV2: {
		messages: {
			"UpdateFavoritesMenu": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	DashboardDesigner: {
		css: ["DashboardDesigner"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetDashboardInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"SetDesignerResult": { "direction": "publish", "mode": "ptp" }
		}
	},
	DashboardDesignerV2CSS: {
		css: ["DashboardDesignerV2CSS"]
	},
	DashboardGridDesignerCSS: {
		css: ["DashboardGridDesignerCSS"]
	},
	DashboardGridModule: {
		css: ["DashboardGridModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetDashboardGridConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateDashboardGrid": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" }
		}
	},
	DashboardManagerItem: {
		css: ["DashboardManagerItem"]
	},
	DashboardModule: {
		css: ["DashboardModule"], 
		messages: {
			"GetDashboardInfo": { "direction": "publish", "mode": "ptp" },
			"ReloadDashboard": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DashboardSection: {
		css: ["DashboardSection"], 
		messages: {
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GenerateChart": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetChartFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DashboardSectionV2: {
		css: ["DashboardSectionV2"], 
		messages: {
			"GenerateChart": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetChartFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	DashboardsModule: {
		css: ["DashboardsModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetDashboardInfo": { "direction": "subscribe", "mode": "ptp" },
			"SetDesignerResult": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDashboard": { "direction": "publish", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DashboardsSectionModule: {
		css: ["DashboardsSectionModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetDashboardInfo": { "direction": "subscribe", "mode": "ptp" },
			"SetDesignerResult": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDashboard": { "direction": "publish", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DataSourcePropertiesPageCss: {
		css: ["DataSourcePropertiesPageCss"]
	},
	DateTimeMacroConstructorPageCSS: {
		css: ["DateTimeMacroConstructorPageCSS"]
	},
	DateTimeMappingModule: {
		css: ["DateTimeMappingModule"], 
		messages: {
			"GetParametersInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DayInCalendarMiniPageCSS: {
		css: ["DayInCalendarMiniPageCSS"]
	},
	DCClickHeatmapCSS: {
		css: ["DCClickHeatmapCSS"]
	},
	DcmDesigner: {
		css: ["DcmDesigner"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	DcmElementParametersMappingModule: {
		messages: {
			"GetProcessSchema": { "direction": "publish", "mode": "ptp" },
			"GetSelectedData": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"GetSelectedProcessParameter": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DcmMappingModule: {
		messages: {
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	DcmSchemaDesigner: {
		css: ["DcmSchemaDesigner"]
	},
	DcmSchemaStagePropertiesPageCSS: {
		css: ["DcmSchemaStagePropertiesPageCSS"]
	},
	DcmStage: {
		css: ["DcmStage"]
	},
	DcmStageElement: {
		css: ["DcmStageElement"]
	},
	DCTemplateViewerCSS: {
		css: ["DCTemplateViewerCSS"]
	},
	DCTemplateViewerModule: {
		messages: {
			"GetColumnsValues": { "direction": "publish", "mode": "ptp" }
		}
	},
	DeduplicationModuleCSS: {
		css: ["DeduplicationModuleCSS"]
	},
	DefaultValueWebLeadFormModule: {
		css: ["DefaultValueWebLeadFormModule"], 
		messages: {
			"LookupResultSelected": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	DelayExecutionModule: {
		css: ["DelayExecutionModule"], 
		messages: {
			"OpenDelayExecutionModule": { "direction": "subscribe", "mode": "broadcast" },
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ShowLookupPage": { "direction": "publish", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DelayExecutionModuleV2: {
		css: ["DelayExecutionModuleV2"], 
		messages: {
			"OpenDelayExecutionModuleV2": { "direction": "subscribe", "mode": "broadcast" },
			"OpenDelayExecutionModule": { "direction": "subscribe", "mode": "broadcast" },
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ShowLookupPage": { "direction": "publish", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" },
			"CloseDelayExecutionModule": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeNextProcExecDataHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	DesignerGridLayoutItem: {
		css: ["DesignerGridLayoutItem"]
	},
	DesignerToolsCSS: {
		css: ["DesignerToolsCSS"]
	},
	DesignTimeTabPanel: {
		css: ["DesignTimeTabPanel"]
	},
	DetailModule: {
		css: ["DetailModule"], 
		messages: {
			"DetailInfo": { "direction": "publish", "mode": "broadcast" },
			"LoadData": { "direction": "subscribe", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"SaveDetails": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"OpenLookupPage": { "direction": "publish", "mode": "broadcast" },
			"SaveRecord": { "direction": "publish", "mode": "broadcast" },
			"RequestDetailItems": { "direction": "subscribe", "mode": "ptp" },
			"GetPredefinedRecords": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" },
			"DoNotUseCommunication": { "direction": "publish", "mode": "ptp" },
			"GetEntityName": { "direction": "publish", "mode": "ptp" },
			"OpenGridSettings": { "direction": "publish", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"UpdateDetail": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenCardModule": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ShowLookupPage": { "direction": "publish", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" },
			"DetailChanged": { "direction": "publish", "mode": "broadcast" },
			"GetAdditionalFilterValue": { "direction": "publish", "mode": "ptp" },
			"GetCustomModuleInfo": { "direction": "subscribe", "mode": "ptp" },
			"LoadCustomModule": { "direction": "publish", "mode": "ptp" },
			"ReloadDetail": { "direction": "subscribe", "mode": "ptp" },
			"SetDetailReadOnly": { "direction": "subscribe", "mode": "ptp" },
			"GetIsDetailReadonly": { "direction": "publish", "mode": "ptp" },
			"DetailSaved": { "direction": "publish", "mode": "ptp" }
		}
	},
	DetailModuleV2: {
		css: ["DetailModuleV2"], 
		messages: {
			"GetDetailInfo": { "direction": "publish", "mode": "ptp" },
			"LoadData": { "direction": "subscribe", "mode": "broadcast" },
			"RerenderDetail": { "direction": "subscribe", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DetailViewModelGenerator: {
		messages: {
			"SaveRecord": { "direction": "publish", "mode": "broadcast" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenCardModule": { "direction": "publish", "mode": "ptp" },
			"UpdateDetail": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DetailWizard: {
		css: ["DetailWizard"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetPageDesignerConfig": { "direction": "subscribe", "mode": "ptp" },
			"PostPageDesignerConfig": { "direction": "publish", "mode": "broadcast" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	DuplicateRulesSettingsCSS: {
		css: ["DuplicateRulesSettingsCSS"]
	},
	DuplicatesDetailModuleV2: {
		messages: {
			"GetGridData": { "direction": "publish", "mode": "ptp" },
			"GetConfig": { "direction": "publish", "mode": "ptp" },
			"CallCustomer": { "direction": "publish", "mode": "ptp" },
			"Merge": { "direction": "subscribe", "mode": "ptp" },
			"HideDetail": { "direction": "publish", "mode": "ptp" }
		}
	},
	DuplicatesMergeModuleV2: {
		messages: {
			"Merge": { "direction": "publish", "mode": "ptp" }
		}
	},
	DuplicatesMergeViewConfigV2: {
		css: ["DuplicatesMergeViewConfigV2"]
	},
	DuplicatesModule: {
		css: ["DuplicatesModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	DuplicatesSearchNotificationTargetLoader: {
		messages: {
			"GetNotificationInfo": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetLoaderMethod": { "direction": "subscribe", "mode": "broadcast" },
			"ReloadCard": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	DynamicContentBlockGroupViewModelCSS: {
		css: ["DynamicContentBlockGroupViewModelCSS"]
	},
	DynamicContentBuilderCSS: {
		css: ["DynamicContentBuilderCSS"]
	},
	EditPageDesigner: {
		css: ["EditPageDesigner"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetCardSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetGroupConfig": { "direction": "subscribe", "mode": "ptp" },
			"GroupEdited": { "direction": "subscribe", "mode": "ptp" },
			"GetColumnInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushColumnInfo": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	EditPageDesignerGroupEdit: {
		css: ["EditPageDesignerGroupEdit"], 
		messages: {
			"GetGroupConfig": { "direction": "publish", "mode": "ptp" },
			"GroupEdited": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	ElementPropertiesModule: {
		css: ["ElementPropertiesModule"]
	},
	EmailItemSchemaCSS: {
		css: ["EmailItemSchemaCSS"]
	},
	EmailMessageEnrichmentHistoryItemStyle: {
		css: ["EmailMessageEnrichmentHistoryItemStyle"]
	},
	EmailMessageHistoryItemPageCSS: {
		css: ["EmailMessageHistoryItemPageCSS"]
	},
	EmailMessageHistoryItemPageV2CSS: {
		css: ["EmailMessageHistoryItemPageV2CSS"]
	},
	EmailMessageHistoryItemStyle: {
		css: ["EmailMessageHistoryItemStyle"]
	},
	EmailMessageHistoryItemStyleV2: {
		css: ["EmailMessageHistoryItemStyleV2"]
	},
	EmailMessagePublisherModule: {
		css: ["EmailMessagePublisherModule"], 
		messages: {
			"RerenderPublisherModule": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	EmailMLangContentEditSchemaStyles: {
		css: ["EmailMLangContentEditSchemaStyles"]
	},
	EmailModule: {
		css: ["EmailModule"]
	},
	EmailTemplateLookupGallerySchemaCSS: {
		css: ["EmailTemplateLookupGallerySchemaCSS"]
	},
	EmailTemplatePageV2V2Styles: {
		css: ["EmailTemplatePageV2V2Styles"]
	},
	EmailUtilities: {
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	EmailUtilitiesV2: {
		css: ["EmailUtilitiesV2"]
	},
	EmailWithSubjectContentBuilderCSS: {
		css: ["EmailWithSubjectContentBuilderCSS"]
	},
	EmployeeMiniPageCSS: {
		css: ["EmployeeMiniPageCSS"]
	},
	EmployeeSectionCSS: {
		css: ["EmployeeSectionCSS"]
	},
	EmptyGridMessageConfigBuilder: {
		css: ["EmptyGridMessageConfigBuilder"]
	},
	EntityColumnLookupPageCSS: {
		css: ["EntityColumnLookupPageCSS"]
	},
	EntityColumnsModule: {
		messages: {
			"GetColumnsLookupInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	EntityConnectionLinksUtilities: {
		css: ["EntityConnectionLinksUtilities"]
	},
	EntityStructureHelper: {
		messages: {
			"getItems": { "direction": "subscribe", "mode": "ptp" },
			"getChildren": { "direction": "subscribe", "mode": "ptp" },
			"getItemCaption": { "direction": "subscribe", "mode": "ptp" },
			"setOperationType": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ESNFeedModule: {
		messages: {
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ShowHideRightSidePanel": { "direction": "publish", "mode": "broadcast" },
			"RerenderModule": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"SaveRecord": { "direction": "publish", "mode": "ptp" },
			"GetCardState": { "direction": "publish", "mode": "ptp" },
			"CardSaved": { "direction": "subscribe", "mode": "broadcast" },
			"InitModuleViewModel": { "direction": "subscribe", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"ChangeDataView": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"GetActiveViewName": { "direction": "subscribe", "mode": "ptp" },
			"UpdateSubscribeAction": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	ESNFeedStyle: {
		css: ["ESNFeedStyle"]
	},
	ESNNotificationModule: {
		css: ["ESNNotificationModule"], 
		messages: {
			"UpdateCounters": { "direction": "publish", "mode": "broadcast" },
			"ReloadCard": { "direction": "publish", "mode": "ptp" }
		}
	},
	ESNNotificationSchemaCSS: {
		css: ["ESNNotificationSchemaCSS"]
	},
	EventsDashboardSection: {
		css: ["EventsDashboardSection"], 
		messages: {
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	ExpressionEdit: {
		css: ["ExpressionEdit"]
	},
	ExpressionEditDemo: {
		css: ["ExpressionEditDemo"]
	},
	ExtendedFilterEditModule: {
		css: ["ExtendedFilterEditModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultExtendedFilter": { "direction": "publish", "mode": "broadcast" },
			"GetExtendedFilter": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetModuleSchema": { "direction": "publish", "mode": "ptp" }
		}
	},
	ExtendedFilterEditModuleV2: {
		css: ["ExtendedFilterEditModuleV2"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ApplyResultExtendedFilter": { "direction": "publish", "mode": "broadcast" },
			"GetExtendedFilter": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetModuleSchema": { "direction": "publish", "mode": "ptp" },
			"CustomFilterExtendedModeClose": { "direction": "publish", "mode": "broadcast" },
			"UpdateFilter": { "direction": "publish", "mode": "broadcast" },
			"FilterActionsFired": { "direction": "subscribe", "mode": "broadcast" },
			"FilterActionsEnabledChanged": { "direction": "publish", "mode": "broadcast" },
			"ShowFolderTree": { "direction": "publish", "mode": "ptp" },
			"UpdateCustomFilterMenu": { "direction": "publish", "mode": "broadcast" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetSectionFiltersInfo": { "direction": "publish", "mode": "ptp" },
			"ChangeGridUtilitiesContainerSize": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ExtendedGrid: {
		css: ["ExtendedGrid"]
	},
	ExtendedGridDemoModule: {
		messages: {
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ExtendedHtmlEditModule: {
		css: ["ExtendedHtmlEditModule"]
	},
	ExternalAccessMiniPageCSS: {
		css: ["ExternalAccessMiniPageCSS"]
	},
	FacebookSearch: {
		css: ["FacebookSearch"]
	},
	FeaturesPageCSS: {
		css: ["FeaturesPageCSS"]
	},
	FeedbackModule: {
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "broadcast" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "broadcast" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	FileDetailCssModule: {
		css: ["FileDetailCssModule"]
	},
	FileHelper: {
		css: ["FileHelper"]
	},
	FileImportModule: {
		css: ["FileImportModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	FileImportWizard: {
		css: ["FileImportWizard"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"HeaderStepClicked": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeaderStep": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" },
			"GetModuleConfigResult": { "direction": "publish", "mode": "ptp" },
			"Validate": { "direction": "publish", "mode": "ptp" },
			"ValidationResult": { "direction": "subscribe", "mode": "ptp" },
			"Save": { "direction": "publish", "mode": "ptp" },
			"SavingResult": { "direction": "subscribe", "mode": "ptp" },
			"SaveWizard": { "direction": "subscribe", "mode": "ptp" },
			"GetPackageUId": { "direction": "subscribe", "mode": "ptp" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	FileListModule: {
		messages: {
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"DestroyFilesModule": { "direction": "subscribe", "mode": "ptp" },
			"RefreshFiles": { "direction": "subscribe", "mode": "broadcast" },
			"FileDeleted": { "direction": "publish", "mode": "ptp" }
		}
	},
	FillContactWithSocialAccountDataModule: {
		css: ["FillContactWithSocialAccountDataModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"OpenLookupPage": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	FilterEditModule: {
		messages: {
			"GetFilterModuleConfig": { "direction": "publish", "mode": "ptp" },
			"SetFilterModuleConfig": { "direction": "subscribe", "mode": "broadcast" },
			"GetFilters": { "direction": "subscribe", "mode": "ptp" },
			"OnFiltersChanged": { "direction": "publish", "mode": "broadcast" },
			"FilterActionFired": { "direction": "subscribe", "mode": "broadcast" },
			"FilterActionsEnabledChanged": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"OpenMappingEditWindow": { "direction": "publish", "mode": "ptp" },
			"OpenMacrosPage": { "direction": "publish", "mode": "ptp" }
		}
	},
	FindContactsInSocialNetworksModule: {
		css: ["FindContactsInSocialNetworksModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "publish", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" },
			"SetInitialisationData": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	FolderLookupPage: {
		css: ["FolderLookupPage"], 
		messages: {
			"ResultSelectedFolders": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"FolderInfo": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	FolderManager: {
		css: ["FolderManager"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"FolderInfo": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilter": { "direction": "subscribe", "mode": "ptp" },
			"ResultExtendedFilter": { "direction": "publish", "mode": "broadcast" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedFolders": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"HideFolderTree": { "direction": "publish", "mode": "broadcast" },
			"ResultFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"QuickFilterChanged": { "direction": "publish", "mode": "broadcast" },
			"GetFolderFilter": { "direction": "publish", "mode": "ptp" },
			"AddFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"ClearFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"UpdateFilter": { "direction": "publish", "mode": "broadcast" },
			"UpdateCustomFilterMenu": { "direction": "publish", "mode": "broadcast" },
			"AddFolderActionFired": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateFavoritesMenu": { "direction": "publish", "mode": "broadcast" },
			"CustomFilterExtendedMode": { "direction": "publish", "mode": "broadcast" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" }
		}
	},
	FolderManagerModule: {
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"FolderInfo": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilter": { "direction": "subscribe", "mode": "ptp" },
			"ResultExtendedFilter": { "direction": "publish", "mode": "broadcast" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedFolders": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"HideFolderTree": { "direction": "publish", "mode": "broadcast" },
			"ResultFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"QuickFilterChanged": { "direction": "publish", "mode": "broadcast" },
			"GetFolderFilter": { "direction": "publish", "mode": "ptp" },
			"AddFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"ClearFolderFilter": { "direction": "publish", "mode": "broadcast" },
			"UpdateFilter": { "direction": "publish", "mode": "broadcast" },
			"UpdateCustomFilterMenu": { "direction": "publish", "mode": "broadcast" },
			"AddFolderActionFired": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateFavoritesMenu": { "direction": "publish", "mode": "broadcast" },
			"CustomFilterExtendedMode": { "direction": "publish", "mode": "broadcast" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" }
		}
	},
	FolderManagerViewModel: {
		messages: {
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" }
		}
	},
	ForecastAngularModule: {
		css: ["ForecastAngularModule"]
	},
	ForecastEntityLookupMixin: {
		css: ["ForecastEntityLookupMixin"]
	},
	ForecastMiniPageCSS: {
		css: ["ForecastMiniPageCSS"]
	},
	ForecastModule: {
		css: ["ForecastModule"], 
		messages: {
			"GetForecastInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	ForecastsModule: {
		css: ["ForecastsModule"], 
		messages: {
			"GetForecastInfo": { "direction": "subscribe", "mode": "ptp" },
			"ReloadForecast": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"SetForecastResult": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleResponse": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ForLookupPage: {
		messages: {
			"getLookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"resultSelectedRows": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	FullPipelineModule: {
		messages: {
			"GenerateChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "publish", "mode": "ptp" },
			"GetChartFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"DestroyCurrentChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"FiltersChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetChartConfig": { "direction": "publish", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	FullPipelinePropertiesItemModule: {
		css: ["FullPipelinePropertiesItemModule"]
	},
	FullPipelineViewConfig: {
		css: ["FullPipelineViewConfig"]
	},
	FullWidthLabelViewGenerator: {
		css: ["FullWidthLabelViewGenerator"]
	},
	GaugeModule: {
		messages: {
			"GetGaugeConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateGauge": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" }
		}
	},
	GeneralDetails: {
		css: ["GeneralDetails"]
	},
	GeneratedWebFormModule: {
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"CardModuleResponse": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	GeneratedWebFormUtilities: {
		messages: {
			"IncomingPtp": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	GlobalDuplicateModule: {
		css: ["GlobalDuplicateModule"]
	},
	GlobalSearchModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"SetCommandLineValue": { "direction": "publish", "mode": "broadcast" }
		}
	},
	GlobalSearchResultPageCSS: {
		css: ["GlobalSearchResultPageCSS"]
	},
	GoogleIntegrationSettingsModule: {
		css: ["GoogleIntegrationSettingsModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	GoogleMapWidgetPage: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	GridSettings: {
		css: ["GridSettings"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ColumnSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSetuped": { "direction": "subscribe", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "publish", "mode": "ptp" },
			"UpdateDetail": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetProfileData": { "direction": "subscribe", "mode": "ptp" },
			"GetEntitySchema": { "direction": "publish", "mode": "ptp" },
			"OpenStructureExplorer": { "direction": "publish", "mode": "broadcast" },
			"OpenColumnSettings": { "direction": "publish", "mode": "broadcast" }
		}
	},
	GridSettingsPageCSS: {
		css: ["GridSettingsPageCSS"]
	},
	GridSettingsV2: {
		css: ["GridSettingsV2"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ColumnSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSetuped": { "direction": "subscribe", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "publish", "mode": "ptp" },
			"UpdateDetail": { "direction": "publish", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetProfileData": { "direction": "subscribe", "mode": "ptp" },
			"GetEntitySchema": { "direction": "publish", "mode": "ptp" },
			"OpenStructureExplorer": { "direction": "publish", "mode": "broadcast" },
			"OpenColumnSettings": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"GridSettingsChanged": { "direction": "publish", "mode": "ptp" },
			"SaveGridSettings": { "direction": "publish", "mode": "ptp" }
		}
	},
	GridUtilities: {
		css: ["GridUtilities"]
	},
	HistoryMessageFilesDetailCSS: {
		css: ["HistoryMessageFilesDetailCSS"]
	},
	HistoryStateUtilities: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	HotkeyItemsModule: {
		messages: {
			"GetEventsConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	HotkeysModule: {
		messages: {
			"GetEventsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	HTMLCodeEditModalBoxCss: {
		css: ["HTMLCodeEditModalBoxCss"]
	},
	HtmlEditModule: {
		css: ["HtmlEditModule"]
	},
	IconizedProgressBar: {
		css: ["IconizedProgressBar"]
	},
	ImageList: {
		css: ["ImageList"]
	},
	ImageListViewModel: {
		messages: {
			"ItemSelected": { "direction": "publish", "mode": "ptp" },
			"GetKnowledgeBaseLink": { "direction": "publish", "mode": "ptp" }
		}
	},
	ImportNotifierClientModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	IndicatorModule: {
		css: ["IndicatorModule"], 
		messages: {
			"GetIndicatorConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateIndicator": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" }
		}
	},
	InfoButtonCSS: {
		css: ["InfoButtonCSS"]
	},
	InfoButtonStyles: {
		css: ["InfoButtonStyles"]
	},
	InformationButton: {
		css: ["InformationButton"]
	},
	InlineTextEditViewGenerator: {
		css: ["InlineTextEditViewGenerator"]
	},
	InnerListedGridHtmlGeneratorCSS: {
		css: ["InnerListedGridHtmlGeneratorCSS"]
	},
	IntroPage: {
		css: ["IntroPage"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	IntroPageCSS: {
		css: ["IntroPageCSS"]
	},
	IssueViewerCSS: {
		css: ["IssueViewerCSS"]
	},
	KnowledgeBaseArticleViewModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	KnowledgeBaseSearchModule: {
		css: ["KnowledgeBaseSearchModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"FilterCurrentSection": { "direction": "publish", "mode": "ptp" }
		}
	},
	KnowledgeBaseSectionCssModule: {
		css: ["KnowledgeBaseSectionCssModule"]
	},
	LeadDetailModule: {
		css: ["LeadDetailModule"]
	},
	LeadEditPageDesigner: {
		css: ["LeadEditPageDesigner"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetStructureExplorerSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetColumnInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushColumnInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"IncomingPtp": { "direction": "publish", "mode": "ptp" },
			"CardModuleResponse": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	LeadMiniPageCSS: {
		css: ["LeadMiniPageCSS"]
	},
	LeadPageV2CSS: {
		css: ["LeadPageV2CSS"]
	},
	LeadPageV2MLCss: {
		css: ["LeadPageV2MLCss"]
	},
	LeadQualificationModuleStyles: {
		css: ["LeadQualificationModuleStyles"]
	},
	LeadQualificationPageV2Styles: {
		css: ["LeadQualificationPageV2Styles"]
	},
	Leaflet: {
		css: ["Leaflet"]
	},
	LeftPanelClientWorkplaceMenu: {
		css: ["LeftPanelClientWorkplaceMenu"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"RefreshWorkplace": { "direction": "subscribe", "mode": "ptp" },
			"GetWorkplaceInfo": { "direction": "subscribe", "mode": "ptp" },
			"ChangeSideBarCollapsed": { "direction": "subscribe", "mode": "broadcast" },
			"ChangeCurrentWorkplace": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	LeftPanelCSS: {
		css: ["LeftPanelCSS"]
	},
	LeftPanelTopMenuModule: {
		css: ["LeftPanelTopMenuModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"UpdateRemindingsCount": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ChangeSideBarCollapsed": { "direction": "publish", "mode": "broadcast" },
			"ShowHideRightSidePanel": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"CardProccessModuleInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetWorkplaceInfo": { "direction": "subscribe", "mode": "ptp" },
			"ChangeCurrentWorkplace": { "direction": "publish", "mode": "ptp" },
			"getCardInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResetStartProcessMenuItems": { "direction": "subscribe", "mode": "broadcast" },
			"LoadedItemsStartProcessMenu": { "direction": "publish", "mode": "broadcast" },
			"ChangeGridUtilitiesContainerSize": { "direction": "publish", "mode": "broadcast" }
		}
	},
	LicConditionCountIndicatorModule: {
		messages: {
			"GetIndicatorConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateIndicator": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	LicPackageDashboardIndicatorModule: {
		css: ["LicPackageDashboardIndicatorModule"], 
		messages: {
			"GetIndicatorConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateIndicator": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	LinkPreview: {
		css: ["LinkPreview"]
	},
	LoadProcessModules: {
		messages: {
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" }
		}
	},
	LocalDuplicateSearchPage: {
		css: ["LocalDuplicateSearchPage"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"FindDuplicatesResult": { "direction": "publish", "mode": "broadcast" },
			"GetDuplicateSearchConfig": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" }
		}
	},
	LocalDuplicateSearchPageV2CSS: {
		css: ["LocalDuplicateSearchPageV2CSS"]
	},
	LocalMessageHistoryItemStyle: {
		css: ["LocalMessageHistoryItemStyle"]
	},
	LocalMessageHistoryItemStyleV2: {
		css: ["LocalMessageHistoryItemStyleV2"]
	},
	LocalMessageHistoryPageCSS: {
		css: ["LocalMessageHistoryPageCSS"]
	},
	LookupPageCSS: {
		css: ["LookupPageCSS"]
	},
	LookupPageV2: {
		css: ["LookupPageV2"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "publish", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	LookupPageViewModelGenerator: {
		messages: {
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	LookupSectionModule: {
		css: ["LookupSectionModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ChangeDataView": { "direction": "subscribe", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetSectionEntitySchema": { "direction": "subscribe", "mode": "ptp" },
			"ShowFolderTree": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetFolderFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetReportId": { "direction": "subscribe", "mode": "ptp" },
			"GetReportConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilterModuleId": { "direction": "subscribe", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "subscribe", "mode": "ptp" },
			"HideFolderTree": { "direction": "subscribe", "mode": "broadcast" },
			"FolderInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultExtendedFilter": { "direction": "subscribe", "mode": "broadcast" },
			"FilterCurrentSection": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionModuleId": { "direction": "subscribe", "mode": "ptp" },
			"GetActiveViewName": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "subscribe", "mode": "ptp" },
			"UpdatePageHeaderCaption": { "direction": "publish", "mode": "ptp" }
		}
	},
	LookupUtilities: {
		messages: {
			"OpenLookupPage": { "direction": "publish", "mode": "broadcast" },
			"OpenFolderPage": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MacrosModule: {
		css: ["MacrosModule"]
	},
	MacrosPageModule: {
		css: ["MacrosPageModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"MacrosInfo": { "direction": "publish", "mode": "ptp" },
			"ChangeCommandList": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	MailboxFolderSyncSettingsModule: {
		css: ["MailboxFolderSyncSettingsModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetParams": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	MailboxSynchronizationSettingsModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"LoadModule": { "direction": "publish", "mode": "ptp" },
			"MultiDeleteStateChange": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	MailboxSynchronizationSettingsPageModule: {
		css: ["MailboxSynchronizationSettingsPageModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetParams": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	MainHeaderCSS: {
		css: ["MainHeaderCSS"]
	},
	MainHeaderExtensions: {
		css: ["MainHeaderExtensions"], 
		messages: {
			"AgentStateChanged": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MainHeaderModule: {
		css: ["MainHeaderModule"], 
		messages: {
			"SectionChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "subscribe", "mode": "ptp" },
			"ChangeDataView": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeRemindingsCounts": { "direction": "subscribe", "mode": "broadcast" },
			"InitContextHelp": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeContextHelpId": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "subscribe", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "publish", "mode": "broadcast" },
			"ResetSection": { "direction": "publish", "mode": "ptp" },
			"UpdateSection": { "direction": "publish", "mode": "ptp" },
			"AgentStateChanged": { "direction": "subscribe", "mode": "ptp" },
			"CtiPanelConnected": { "direction": "subscribe", "mode": "ptp" },
			"UpdatePageHeaderCaption": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MainMenu: {
		css: ["MainMenu"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	MapsModule: {
		css: ["MapsModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetMapsConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	MapsUtilities: {
		messages: {
			"GetMapsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MarketingCalendar: {
		css: ["MarketingCalendar"]
	},
	MarketingCalendarCampaignsModule: {
		css: ["MarketingCalendarCampaignsModule"]
	},
	MarketingCalendarGrid: {
		css: ["MarketingCalendarGrid"]
	},
	MarketingCalendarItem: {
		css: ["MarketingCalendarItem"]
	},
	MarketingCalendarMktgActivitiesModule: {
		css: ["MarketingCalendarMktgActivitiesModule"]
	},
	MenuItemsMappingMixin: {
		css: ["MenuItemsMappingMixin"]
	},
	MergeDuplicatesPage: {
		css: ["MergeDuplicatesPage"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"DetailInfo": { "direction": "subscribe", "mode": "broadcast" },
			"LoadData": { "direction": "publish", "mode": "broadcast" },
			"RequestDetailItems": { "direction": "publish", "mode": "ptp" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	MessageHistoryModule: {
		messages: {
			"RerenderModule": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"SaveRecord": { "direction": "publish", "mode": "ptp" },
			"GetCardState": { "direction": "publish", "mode": "ptp" },
			"InitModuleViewModel": { "direction": "subscribe", "mode": "ptp" },
			"UpdatePageHeaderCaption": { "direction": "publish", "mode": "ptp" }
		}
	},
	MessageHistoryMultilineLabel: {
		css: ["MessageHistoryMultilineLabel"]
	},
	MessageHistoryPageCSS: {
		css: ["MessageHistoryPageCSS"]
	},
	MessageHistorySelectionHandler: {
		css: ["MessageHistorySelectionHandler"]
	},
	MessageHistoryStyle: {
		css: ["MessageHistoryStyle"]
	},
	MessagePublishersModule: {
		css: ["MessagePublishersModule"], 
		messages: {
			"RerenderModule": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"GetCardState": { "direction": "publish", "mode": "ptp" },
			"InitModuleViewModel": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"RerenderPublisherModule": { "direction": "publish", "mode": "ptp" }
		}
	},
	MiniPageDatePeriodGenerator: {
		css: ["MiniPageDatePeriodGenerator"]
	},
	MiniPageDesignerModule: {
		css: ["MiniPageDesignerModule"]
	},
	MiniPageViewGeneratorCSS: {
		css: ["MiniPageViewGeneratorCSS"]
	},
	MLModelPageCSS: {
		css: ["MLModelPageCSS"]
	},
	MLModelStateProgressBarUtils: {
		css: ["MLModelStateProgressBarUtils"]
	},
	MLPredictionExplanationCSS: {
		css: ["MLPredictionExplanationCSS"]
	},
	MobileActivityGridPageViewV2: {
		css: ["MobileActivityGridPageViewV2"]
	},
	MobileBaseDashboardItem: {
		css: ["MobileBaseDashboardItem"]
	},
	MobileBaseDesignerModule: {
		css: ["MobileBaseDesignerModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetDesignerSettings": { "direction": "publish", "mode": "ptp" },
			"PostDesignerSettings": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MobileCacheSyncStateControllerMixin: {
		css: ["MobileCacheSyncStateControllerMixin"]
	},
	MobileCaseCss: {
		css: ["MobileCaseCss"]
	},
	MobileChartDashboardItem: {
		css: ["MobileChartDashboardItem"]
	},
	MobileCss: {
		css: ["MobileCss"]
	},
	MobileDashboardContainer: {
		css: ["MobileDashboardContainer"]
	},
	MobileDashboardItemPageView: {
		css: ["MobileDashboardItemPageView"]
	},
	MobileDashboardPageController: {
		css: ["MobileDashboardPageController"]
	},
	MobileDashboardPageView: {
		css: ["MobileDashboardPageView"]
	},
	MobileDashboardViewGenerator: {
		css: ["MobileDashboardViewGenerator"]
	},
	MobileDesignerModule: {
		css: ["MobileDesignerModule"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" }
		}
	},
	MobileDesignerUtils: {
		css: ["MobileDesignerUtils"]
	},
	MobileDetailDesignerModule: {
		css: ["MobileDetailDesignerModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetDesignerSettings": { "direction": "publish", "mode": "ptp" },
			"PostDesignerSettings": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MobileFeedCommentsList: {
		css: ["MobileFeedCommentsList"]
	},
	MobileFeedList: {
		css: ["MobileFeedList"]
	},
	MobileGridDashboardItem: {
		css: ["MobileGridDashboardItem"]
	},
	MobileGridDesignerModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetDesignerSettings": { "direction": "publish", "mode": "ptp" },
			"PostDesignerSettings": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MobileIndicatorDashboardComponent: {
		css: ["MobileIndicatorDashboardComponent"]
	},
	MobileIndicatorDashboardItem: {
		css: ["MobileIndicatorDashboardItem"]
	},
	MobileIndicatorDashboardItemPageView: {
		css: ["MobileIndicatorDashboardItemPageView"]
	},
	MobileInvoiceGridPage: {
		css: ["MobileInvoiceGridPage"]
	},
	MobileOpportunityModuleConfig: {
		css: ["MobileOpportunityModuleConfig"]
	},
	MobilePageDesignerModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetDesignerSettings": { "direction": "publish", "mode": "ptp" },
			"PostDesignerSettings": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	MobilePhoneCallLogPage: {
		css: ["MobilePhoneCallLogPage"]
	},
	MobilePortalMessagePublisherPage: {
		css: ["MobilePortalMessagePublisherPage"]
	},
	MobileSectionDesignerSchemaModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	MobileSocialMessageEditPage: {
		css: ["MobileSocialMessageEditPage"]
	},
	MobileSocialMessageGridPageView: {
		css: ["MobileSocialMessageGridPageView"]
	},
	MobileSocialMessageHtmlField: {
		css: ["MobileSocialMessageHtmlField"]
	},
	MobileSocialMessagePreviewPage: {
		css: ["MobileSocialMessagePreviewPage"]
	},
	MobileSocialMessageUtilities: {
		css: ["MobileSocialMessageUtilities"]
	},
	MobileWorkplaceSectionsModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"RerenderModule": { "direction": "subscribe", "mode": "ptp" },
			"GetWorkplace": { "direction": "publish", "mode": "ptp" }
		}
	},
	ModalBox: {
		css: ["ModalBox"]
	},
	ModalBoxSchemaModule: {
		css: ["ModalBoxSchemaModule"], 
		messages: {
			"GetModuleInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	MultiCurrencyEdit: {
		css: ["MultiCurrencyEdit"]
	},
	MultiDeleteDetailModuleV2: {
		messages: {
			"GetConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	MultiDeleteResultHelper: {
		css: ["MultiDeleteResultHelper"]
	},
	MultilineFileLabel: {
		css: ["MultilineFileLabel"]
	},
	MultilineLabel: {
		css: ["MultilineLabel"]
	},
	MultiLookupModule: {
		css: ["MultiLookupModule"]
	},
	MultipleInput: {
		css: ["MultipleInput"]
	},
	NavigationModule: {
		messages: {
			"HistoryStateChanged": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"ForwardHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"BeforeHistoryChanging": { "direction": "publish", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "publish", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "publish", "mode": "ptp" }
		}
	},
	NotificationsSettingsModule: {
		css: ["NotificationsSettingsModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	NUIBaseLookupEditPage: {
		css: ["NUIBaseLookupEditPage"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"CardModuleEntityInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	OAuth20AppModule: {
		css: ["OAuth20AppModule"]
	},
	OAuth20AppStyles: {
		css: ["OAuth20AppStyles"]
	},
	OperatorSingleWindowCSS: {
		css: ["OperatorSingleWindowCSS"]
	},
	OperatorSingleWindowModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	OperatorSingleWindowWidgetModule: {
		messages: {
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" }
		}
	},
	OppManagementUtils: {
		css: ["OppManagementUtils"]
	},
	OpportunityCommonCSS: {
		css: ["OpportunityCommonCSS"]
	},
	OpportunityFunnelModule: {
		css: ["OpportunityFunnelModule"], 
		messages: {
			"GenerateChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "publish", "mode": "ptp" },
			"GetChartFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"DestroyCurrentChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"FiltersChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetChartConfig": { "direction": "publish", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"SectionUpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	OpportunityFunnelModuleV2: {
		messages: {
			"GenerateChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "publish", "mode": "ptp" },
			"GetChartFilter": { "direction": "publish", "mode": "ptp" },
			"GetChartParameters": { "direction": "publish", "mode": "ptp" },
			"DestroyCurrentChart": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"FiltersChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetChartConfig": { "direction": "publish", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"SectionUpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	OpportunityFunnelViewConfig: {
		css: ["OpportunityFunnelViewConfig"]
	},
	OpportunityMiniPageCSS: {
		css: ["OpportunityMiniPageCSS"]
	},
	OrderPageV2Styles: {
		css: ["OrderPageV2Styles"]
	},
	OsmMapsModule: {
		css: ["OsmMapsModule"], 
		messages: {
			"GetMapsConfig": { "direction": "publish", "mode": "ptp" },
			"SetMapsConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetCoordinates": { "direction": "publish", "mode": "ptp" },
			"AfterRenderMap": { "direction": "publish", "mode": "ptp" }
		}
	},
	OverdueActivitiesDashboardSection: {
		messages: {
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GenerateChart": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetChartFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetChartParameters": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	PackageMarketModule: {
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	PageDesigner: {
		css: ["PageDesigner"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetStepConfig": { "direction": "publish", "mode": "ptp" },
			"SetPageHeaderInfo": { "direction": "publish", "mode": "broadcast" },
			"GoToStep": { "direction": "subscribe", "mode": "ptp" },
			"IsStepReady": { "direction": "subscribe", "mode": "ptp" },
			"ModuleLoaded": { "direction": "publish", "mode": "ptp" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	PageDesignerButtonsContainer: {
		css: ["PageDesignerButtonsContainer"]
	},
	PageDesignerModule: {
		css: ["PageDesignerModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	PageDesignerUtilities: {
		css: ["PageDesignerUtilities"]
	},
	PageTemplateModule: {
		css: ["PageTemplateModule"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	PageTemplatePageCSS: {
		css: ["PageTemplatePageCSS"]
	},
	PageTypeSettingsPageCss: {
		css: ["PageTypeSettingsPageCss"]
	},
	PageWizard: {
		css: ["PageWizard"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"HeaderStepClicked": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeaderStep": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" },
			"GetModuleConfigResult": { "direction": "publish", "mode": "ptp" },
			"Validate": { "direction": "publish", "mode": "ptp" },
			"ValidationResult": { "direction": "subscribe", "mode": "ptp" },
			"Save": { "direction": "publish", "mode": "ptp" },
			"SavingResult": { "direction": "subscribe", "mode": "ptp" },
			"SaveWizard": { "direction": "subscribe", "mode": "ptp" },
			"GetPackageUId": { "direction": "subscribe", "mode": "ptp" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	PartnershipAttachmentsDetailCSS: {
		css: ["PartnershipAttachmentsDetailCSS"]
	},
	PartnershipCommonCSS: {
		css: ["PartnershipCommonCSS"]
	},
	PartnershipLeadDetailCss: {
		css: ["PartnershipLeadDetailCss"]
	},
	PercentageIndicatorModule: {
		css: ["PercentageIndicatorModule"], 
		messages: {
			"GetIndicatorConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateIndicator": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" }
		}
	},
	PivotGrid: {
		css: ["PivotGrid"]
	},
	PopularKnowledgeBaseArticlesListModule: {
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetDashboardGridConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateDashboardGrid": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	PortalContactMiniPageCSS: {
		css: ["PortalContactMiniPageCSS"]
	},
	PortalMainPageModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetDashboardInfo": { "direction": "subscribe", "mode": "ptp" },
			"SetDesignerResult": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDashboard": { "direction": "publish", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	PortalMessageHistoryItemStyle: {
		css: ["PortalMessageHistoryItemStyle"]
	},
	PortalMessageModalBoxModule: {
		messages: {
			"PublishMessage": { "direction": "publish", "mode": "ptp" }
		}
	},
	PortalMessageModalBoxModuleSchemaCSS: {
		css: ["PortalMessageModalBoxModuleSchemaCSS"]
	},
	PortalMessagePublisherModule: {
		css: ["PortalMessagePublisherModule"], 
		messages: {
			"RerenderPublisherModule": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	PortalModulesCSS: {
		css: ["PortalModulesCSS"]
	},
	PortalUserInvitationModuleSchemaCSS: {
		css: ["PortalUserInvitationModuleSchemaCSS"]
	},
	PredefinedFilterViewModel: {
		css: ["PredefinedFilterViewModel"]
	},
	PreviewableGridLayoutEditItem: {
		css: ["PreviewableGridLayoutEditItem"]
	},
	PrintableProcessModule: {
		css: ["PrintableProcessModule"], 
		messages: {
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" }
		}
	},
	PRMPartnerManagerModule: {
		css: ["PRMPartnerManagerModule"]
	},
	PRMportalLevelModule: {
		css: ["PRMportalLevelModule"]
	},
	ProcessCardModuleV2: {
		css: ["ProcessCardModuleV2"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetDetailInfo": { "direction": "subscribe", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"getCardInfo": { "direction": "publish", "mode": "ptp" },
			"RerenderDetail": { "direction": "publish", "mode": "ptp" },
			"CardModuleResponse": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" },
			"UpdatePageHeaderCaption": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessDashboardModule: {
		css: ["ProcessDashboardModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessDateTimeMappingModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ProcessElementParametersMappingModule: {
		messages: {
			"GetProcessSchema": { "direction": "publish", "mode": "ptp" },
			"GetSelectedData": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"GetSelectedProcessParameter": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ProcessElementParametersMappingPageCSS: {
		css: ["ProcessElementParametersMappingPageCSS"]
	},
	ProcessElementTraceDataPageCSS: {
		css: ["ProcessElementTraceDataPageCSS"]
	},
	ProcessEntryPointModule: {
		css: ["ProcessEntryPointModule"], 
		messages: {
			"GetProcessEntryPointInfo": { "direction": "publish", "mode": "ptp" },
			"GetProcessEntryPointsData": { "direction": "publish", "mode": "ptp" },
			"CloseProcessEntryPointModule": { "direction": "publish", "mode": "ptp" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessEntryPointUtilities: {
		messages: {
			"GetProcessEntryPointInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessExecutionContextModule: {
		messages: {
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"DetailInfo": { "direction": "subscribe", "mode": "broadcast" },
			"LoadData": { "direction": "publish", "mode": "broadcast" },
			"GetCardModuleSandboxId": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessFunctionsMappingModule: {
		messages: {
			"GetSelectedData": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "publish", "mode": "ptp" },
			"GetSelectedProcessParameter": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ProcessListener: {
		messages: {
			"ProcessExecDataChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessExecData": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetProcessEntryPointsData": { "direction": "subscribe", "mode": "ptp" },
			"OnCardModuleSaved": { "direction": "subscribe", "mode": "ptp" },
			"ChangeNextProcExecDataHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"PostponeProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"ChangeCurrentProcExecItemInHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"CompleteProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"CancelProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"CallProcessServiceMethod": { "direction": "subscribe", "mode": "ptp" },
			"ProcessExecutionCompleted": { "direction": "publish", "mode": "broadcast" },
			"ProcessExecutionCanceled": { "direction": "publish", "mode": "broadcast" },
			"ProcessServiceMethodCalled": { "direction": "publish", "mode": "broadcast" },
			"ShowMiniPage": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessListenerV2: {
		messages: {
			"ProcessExecDataChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessExecData": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetProcessEntryPointsData": { "direction": "subscribe", "mode": "ptp" },
			"OnCardModuleSaved": { "direction": "subscribe", "mode": "ptp" },
			"ChangeNextProcExecDataHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"PostponeProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"ChangeCurrentProcExecItemInHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"CompleteProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"CancelProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"CallProcessServiceMethod": { "direction": "subscribe", "mode": "ptp" },
			"ProcessExecutionCompleted": { "direction": "publish", "mode": "broadcast" },
			"ProcessExecutionCanceled": { "direction": "publish", "mode": "broadcast" },
			"ProcessServiceMethodCalled": { "direction": "publish", "mode": "broadcast" },
			"ShowMiniPage": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessLookupMappingModule: {
		css: ["ProcessLookupMappingModule"]
	},
	ProcessLookupModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ProcessLookupModuleStyles: {
		css: ["ProcessLookupModuleStyles"]
	},
	ProcessLookupPageCSS: {
		css: ["ProcessLookupPageCSS"]
	},
	ProcessMappingModalBoxStyles: {
		css: ["ProcessMappingModalBoxStyles"]
	},
	ProcessMappingModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ProcessMiniEditPageModule: {
		messages: {
			"GetProcessSchema": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessModule: {
		messages: {
			"ProcessExecDataChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessExecData": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetProcessExecDataCollection": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessEntryPointsData": { "direction": "subscribe", "mode": "ptp" },
			"SaveDetails": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessModuleV2: {
		messages: {
			"ProcessExecDataChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessExecData": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetProcessExecDataCollection": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessEntryPointsData": { "direction": "subscribe", "mode": "ptp" },
			"SaveDetails": { "direction": "publish", "mode": "ptp" },
			"OnCardModuleSaved": { "direction": "publish", "mode": "ptp" },
			"ChangeNextProcExecDataHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PostponeProcessExecution": { "direction": "subscribe", "mode": "ptp" },
			"ChangeCurrentProcExecItemInHistoryState": { "direction": "publish", "mode": "broadcast" },
			"CompleteProcessExecution": { "direction": "publish", "mode": "ptp" },
			"CancelProcessExecution": { "direction": "publish", "mode": "ptp" },
			"CallProcessServiceMethod": { "direction": "publish", "mode": "ptp" },
			"ProcessExecutionCompleted": { "direction": "subscribe", "mode": "broadcast" },
			"ProcessExecutionCanceled": { "direction": "subscribe", "mode": "broadcast" },
			"ProcessServiceMethodCalled": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ProcessParameterSelectionModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSelectedProcessParameter": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessParametersMappingModule: {
		css: ["ProcessParametersMappingModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSelectedProcessParameter": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ProcessRemindModule: {
		css: ["ProcessRemindModule"], 
		messages: {
			"GetProcessExecDataCollection": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessSchemaElementPropertiesEdit: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessSchemaElementPropertiesEditCSS: {
		css: ["ProcessSchemaElementPropertiesEditCSS"]
	},
	ProcessSchemaParameterEditModule: {
		css: ["ProcessSchemaParameterEditModule"], 
		messages: {
			"GetParameterEditInfo": { "direction": "publish", "mode": "ptp" },
			"GetProcessSchema": { "direction": "publish", "mode": "ptp" }
		}
	},
	ProcessSchemaParameterViewConfig: {
		css: ["ProcessSchemaParameterViewConfig"]
	},
	ProcessSettingsModule: {
		css: ["ProcessSettingsModule"]
	},
	ProcessSystemVariablesMappingModule: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetParametersInfo": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	ProcessTimerStartEventPropertiesPageCSS: {
		css: ["ProcessTimerStartEventPropertiesPageCSS"]
	},
	ProductManagementBaseCss: {
		css: ["ProductManagementBaseCss"]
	},
	ProductManagementDistributionConstants: {
		css: ["ProductManagementDistributionConstants"]
	},
	ProductSelectionModule: {
		css: ["ProductSelectionModule"], 
		messages: {
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ProductSelectionModuleV2: {
		css: ["ProductSelectionModuleV2"]
	},
	ProfileModule: {
		css: ["ProfileModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"ChangeCommandList": { "direction": "publish", "mode": "broadcast" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ProjectCSSModule: {
		css: ["ProjectCSSModule"]
	},
	ProjectServiceHelper: {
		css: ["ProjectServiceHelper"]
	},
	QueueItemEditPageCSS: {
		css: ["QueueItemEditPageCSS"]
	},
	QueueModule: {
		css: ["QueueModule"]
	},
	QueueSectionStyle: {
		css: ["QueueSectionStyle"]
	},
	QuickFilterModule: {
		css: ["QuickFilterModule"], 
		messages: {
			"QuickFilterChanged": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilterConfig": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionEntitySchema": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetFolderFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetCustomFilter": { "direction": "subscribe", "mode": "ptp" },
			"AddFixedFilter": { "direction": "subscribe", "mode": "broadcast" },
			"AddFolderFilter": { "direction": "subscribe", "mode": "broadcast" },
			"AddCustomFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"CustomFilterExtendedMode": { "direction": "publish", "mode": "broadcast" },
			"FolderSelecting": { "direction": "publish", "mode": "broadcast" },
			"OpenFolderPage": { "direction": "publish", "mode": "broadcast" },
			"OpenLookupPage": { "direction": "publish", "mode": "broadcast" },
			"GetModuleSchema": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilterParams": { "direction": "publish", "mode": "ptp" },
			"GetFolderFilterConfig": { "direction": "publish", "mode": "ptp" },
			"GetExtendedFilterConfig": { "direction": "publish", "mode": "ptp" },
			"AddTagFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetTagFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetTagFilterConfig": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilterInfo": { "direction": "publish", "mode": "ptp" }
		}
	},
	QuickFilterModuleV2: {
		css: ["QuickFilterModuleV2"], 
		messages: {
			"UpdateFilter": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilterConfig": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionEntitySchema": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetFolderFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetCustomFilter": { "direction": "subscribe", "mode": "ptp" },
			"AddFixedFilter": { "direction": "subscribe", "mode": "broadcast" },
			"AddFolderFilter": { "direction": "subscribe", "mode": "broadcast" },
			"AddCustomFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"CustomFilterExtendedMode": { "direction": "publish", "mode": "broadcast" },
			"FolderSelecting": { "direction": "publish", "mode": "broadcast" },
			"OpenFolderPage": { "direction": "publish", "mode": "broadcast" },
			"OpenLookupPage": { "direction": "publish", "mode": "broadcast" },
			"GetModuleSchema": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilterParams": { "direction": "publish", "mode": "ptp" },
			"GetFolderFilterConfig": { "direction": "publish", "mode": "ptp" },
			"GetExtendedFilterConfig": { "direction": "publish", "mode": "ptp" },
			"AddTagFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetTagFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetTagFilterConfig": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilterInfo": { "direction": "publish", "mode": "ptp" },
			"ShowFolderTree": { "direction": "publish", "mode": "ptp" },
			"ResultSelectedFolders": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"UpdateExtendedFilter": { "direction": "subscribe", "mode": "ptp" },
			"ClearExtendedFilter": { "direction": "publish", "mode": "ptp" },
			"CustomFilterExtendedModeClose": { "direction": "subscribe", "mode": "broadcast" },
			"HideFolderTree": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateCustomFilterMenu": { "direction": "subscribe", "mode": "broadcast" },
			"SaveFolderGroupFilter": { "direction": "subscribe", "mode": "broadcast" },
			"UpdateFolderFilter": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFavoritesMenu": { "direction": "subscribe", "mode": "broadcast" },
			"GetSectionFiltersInfo": { "direction": "publish", "mode": "ptp" },
			"SetCustomFilters": { "direction": "subscribe", "mode": "ptp" },
			"IsSeparateMode": { "direction": "subscribe", "mode": "ptp" },
			"SetTagFilter": { "direction": "subscribe", "mode": "ptp" },
			"ChangeGridUtilitiesContainerSize": { "direction": "publish", "mode": "broadcast" },
			"CloseCard": { "direction": "publish", "mode": "ptp" }
		}
	},
	QuickSearchModule: {
		css: ["QuickSearchModule"]
	},
	RecommendationModule: {
		css: ["RecommendationModule"], 
		messages: {
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" }
		}
	},
	RectProgressBar: {
		css: ["RectProgressBar"]
	},
	Registration: {
		css: ["Registration"], 
		messages: {
			"GetUserManagementToken": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	RelationshipDiagram: {
		css: ["RelationshipDiagram"]
	},
	RelationshipDiagramModule: {
		messages: {
			"GetRelationshipDiagramInfo": { "direction": "publish", "mode": "ptp" },
			"ReloadRelationshipDiagram": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	RemindingsModule: {
		css: ["RemindingsModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeRemindingsCounts": { "direction": "publish", "mode": "broadcast" },
			"RemindingsCountsChanged": { "direction": "subscribe", "mode": "ptp" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenCardModule": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	RemindPassword: {
		css: ["RemindPassword"]
	},
	ReportFilterModule: {
		css: ["ReportFilterModule"], 
		messages: {
			"GetReportConfig": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetReportFilterCollection": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionEntitySchema": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ShowLookupPage": { "direction": "publish", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" }
		}
	},
	ReportModule: {
		css: ["ReportModule"], 
		messages: {
			"GenerateReport": { "direction": "subscribe", "mode": "ptp" },
			"GetReportId": { "direction": "publish", "mode": "ptp" },
			"GetReportConfig": { "direction": "publish", "mode": "ptp" },
			"GetReportFilterCollection": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	Rights: {
		css: ["Rights"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetRecordInfo": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"UpdatePageHeaderCaption": { "direction": "publish", "mode": "ptp" }
		}
	},
	RightSideBarModule: {
		css: ["RightSideBarModule"], 
		messages: {
			"UpdateRemindingsCount": { "direction": "subscribe", "mode": "broadcast" },
			"ShowHideRightSidePanel": { "direction": "publish", "mode": "broadcast" },
			"UpdateRemindingMenuItemCaption": { "direction": "publish", "mode": "ptp" },
			"CommunicationPanelItemSelected": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	RoundProgressBar: {
		css: ["RoundProgressBar"]
	},
	RtlCSS: {
		css: ["RtlCSS"]
	},
	ScheduledDuplicatesSearchSettingsPageCSS: {
		css: ["ScheduledDuplicatesSearchSettingsPageCSS"]
	},
	SchemaDesigner: {
		css: ["SchemaDesigner"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	SchemaDesignerModule: {
		css: ["SchemaDesignerModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetColumnInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushColumnInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SchemaModelItemDesignerCss: {
		css: ["SchemaModelItemDesignerCss"]
	},
	ScoringModuleCSS: {
		css: ["ScoringModuleCSS"]
	},
	SearchDuplicatesSettingsPage: {
		css: ["SearchDuplicatesSettingsPage"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	SectionDashboardsModule: {
		css: ["SectionDashboardsModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetDashboardInfo": { "direction": "subscribe", "mode": "ptp" },
			"SetDesignerResult": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDashboard": { "direction": "publish", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SectionDesignerFinishPageModule: {
		messages: {
			"GoToStep": { "direction": "publish", "mode": "broadcast" },
			"SectionChanged": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SectionDesignerGridSettingsModule: {
		css: ["SectionDesignerGridSettingsModule"], 
		messages: {
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetStepConfig": { "direction": "publish", "mode": "ptp" },
			"GetProfileData": { "direction": "publish", "mode": "ptp" },
			"GoToStep": { "direction": "publish", "mode": "broadcast" },
			"GetEntitySchema": { "direction": "subscribe", "mode": "ptp" },
			"SectionChanged": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"SetPageHeaderInfo": { "direction": "publish", "mode": "broadcast" },
			"IsStepReady": { "direction": "subscribe", "mode": "ptp" },
			"ModuleLoaded": { "direction": "publish", "mode": "ptp" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionDesignerHeaderModule: {
		messages: {
			"GetDesignerStructureConfig": { "direction": "publish", "mode": "ptp" },
			"RefreshSteps": { "direction": "subscribe", "mode": "ptp" },
			"GoToStep": { "direction": "publish", "mode": "broadcast" },
			"PostDesignerStructureSelectedItem": { "direction": "publish", "mode": "broadcast" },
			"GetSectionDesignerStructureItemKey": { "direction": "publish", "mode": "ptp" },
			"SetPageHeaderInfo": { "direction": "subscribe", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	SectionDesignerLogModule: {
		css: ["SectionDesignerLogModule"], 
		messages: {
			"GetErrorsConfig": { "direction": "publish", "mode": "ptp" }
		}
	},
	SectionDesignerMenuModule: {
		messages: {
			"PostSectionMenuConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionMenuInfo": { "direction": "publish", "mode": "broadcast" },
			"GetDesignerStructureConfig": { "direction": "publish", "mode": "ptp" },
			"PostDesignerStructureSelectedItem": { "direction": "publish", "mode": "broadcast" },
			"SetDesignerStructureSelectedItem": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"GetSectionDesignerStructureItemKey": { "direction": "publish", "mode": "ptp" },
			"SectionChanged": { "direction": "publish", "mode": "broadcast" },
			"RefreshMenuPages": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionDesignerPageTypeModule: {
		css: ["SectionDesignerPageTypeModule"], 
		messages: {
			"OnSectionSchemaChanged": { "direction": "subscribe", "mode": "broadcast" },
			"OnMultiPageChanged": { "direction": "subscribe", "mode": "broadcast" },
			"ValidateTypes": { "direction": "subscribe", "mode": "ptp" },
			"RefreshPagesConfig": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SectionDesignerStartPageModule: {
		css: ["SectionDesignerStartPageModule"], 
		messages: {
			"GoToStep": { "direction": "publish", "mode": "broadcast" },
			"OnMultiPageChanged": { "direction": "publish", "mode": "broadcast" },
			"OnSectionSchemaChanged": { "direction": "publish", "mode": "broadcast" },
			"OnSectionCodeChanged": { "direction": "publish", "mode": "broadcast" },
			"ValidateTypes": { "direction": "publish", "mode": "ptp" },
			"IsStepReady": { "direction": "subscribe", "mode": "ptp" },
			"SectionChanged": { "direction": "publish", "mode": "broadcast" },
			"SetPageHeaderInfo": { "direction": "publish", "mode": "broadcast" },
			"ModuleLoaded": { "direction": "publish", "mode": "ptp" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionDesignerUtils: {
		css: ["SectionDesignerUtils"]
	},
	SectionDesignerViewModule: {
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"SelectedSideBarItemChanged": { "direction": "publish", "mode": "ptp" },
			"ChangeRemindingsCounts": { "direction": "subscribe", "mode": "broadcast" },
			"RemindingsCountsChanged": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"FocusCorrectSideBar": { "direction": "subscribe", "mode": "broadcast" },
			"SideBarVisibilityChanged": { "direction": "subscribe", "mode": "ptp" },
			"SideBarVisibilityInfo": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"UpdateSideBarRemindings": { "direction": "publish", "mode": "ptp" },
			"SidebarItemUpdated": { "direction": "publish", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"SideBarModuleDefInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushSideBarModuleDefInfo": { "direction": "publish", "mode": "ptp" },
			"GetSideBarConfig": { "direction": "publish", "mode": "ptp" },
			"CardProccessModuleInfo": { "direction": "subscribe", "mode": "ptp" },
			"ShowHideRightSidePanel": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	SectionInWorkplaceGridViewModel: {
		css: ["SectionInWorkplaceGridViewModel"]
	},
	SectionMenuModule: {
		css: ["SectionMenuModule"], 
		messages: {
			"UpdateSideBarRemindings": { "direction": "subscribe", "mode": "ptp" },
			"SidebarItemUpdated": { "direction": "subscribe", "mode": "ptp" },
			"SelectedSideBarItemChanged": { "direction": "subscribe", "mode": "ptp" },
			"FocusCorrectSideBar": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSectionMenuInfo": { "direction": "publish", "mode": "broadcast" },
			"PostSectionMenuConfig": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"ChangeRemindingsCounts": { "direction": "subscribe", "mode": "broadcast" },
			"ChangeSideBarCollapsed": { "direction": "subscribe", "mode": "broadcast" },
			"SectionChanged": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SectionMiniPageWizard: {
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"HeaderStepClicked": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeaderStep": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" },
			"GetModuleConfigResult": { "direction": "publish", "mode": "ptp" },
			"Validate": { "direction": "publish", "mode": "ptp" },
			"ValidationResult": { "direction": "subscribe", "mode": "ptp" },
			"Save": { "direction": "publish", "mode": "ptp" },
			"SavingResult": { "direction": "subscribe", "mode": "ptp" },
			"SaveWizard": { "direction": "subscribe", "mode": "ptp" },
			"GetPackageUId": { "direction": "subscribe", "mode": "ptp" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionModule: {
		css: ["SectionModule"], 
		messages: {
			"ShowHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetFixedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"QuickFilterChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetSectionEntitySchema": { "direction": "subscribe", "mode": "ptp" },
			"GetFixedFilter": { "direction": "publish", "mode": "ptp" },
			"CustomFilterExtendedMode": { "direction": "subscribe", "mode": "broadcast" },
			"GetExtendedFilter": { "direction": "subscribe", "mode": "ptp" },
			"ResultExtendedFilter": { "direction": "subscribe", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ProcessExecDataChanged": { "direction": "publish", "mode": "ptp" },
			"GenerateChart": { "direction": "publish", "mode": "ptp" },
			"OpenFolderPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedFolders": { "direction": "subscribe", "mode": "broadcast" },
			"FolderInfo": { "direction": "subscribe", "mode": "ptp" },
			"GenerateReport": { "direction": "publish", "mode": "ptp" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetReportId": { "direction": "subscribe", "mode": "ptp" },
			"GetReportConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetContextHelpId": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ShowLookupPage": { "direction": "subscribe", "mode": "ptp" },
			"LookupResultSelected": { "direction": "publish", "mode": "ptp" },
			"GetFolderFilter": { "direction": "publish", "mode": "ptp" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"UpdateDetail": { "direction": "subscribe", "mode": "ptp" },
			"CardModuleResponse": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"SectionInfo": { "direction": "publish", "mode": "ptp" },
			"UpdateClientInformation": { "direction": "publish", "mode": "ptp" },
			"AgentDesktopClientInformation": { "direction": "subscribe", "mode": "ptp" },
			"GetMapsConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilterModuleId": { "direction": "subscribe", "mode": "ptp" },
			"GetFolderFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetExtendedFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"DestroyCommentModule": { "direction": "publish", "mode": "ptp" },
			"GetTagFilter": { "direction": "publish", "mode": "ptp" },
			"DestroyFilesModule": { "direction": "publish", "mode": "ptp" },
			"GetDetailItems": { "direction": "subscribe", "mode": "ptp" },
			"GetTagFilterConfig": { "direction": "subscribe", "mode": "ptp" },
			"FileDeleted": { "direction": "subscribe", "mode": "ptp" },
			"RefreshFiles": { "direction": "publish", "mode": "broadcast" },
			"RefreshWorkplace": { "direction": "publish", "mode": "ptp" },
			"GetNumberInfo": { "direction": "subscribe", "mode": "ptp" },
			"CallCustomer": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilterInfo": { "direction": "subscribe", "mode": "ptp" },
			"SetCallCampaignTarget": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ChangeDataView": { "direction": "subscribe", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	SectionModuleV2: {
		css: ["SectionModuleV2"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"ChangeDataView": { "direction": "subscribe", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" },
			"GetSectionEntitySchema": { "direction": "subscribe", "mode": "ptp" },
			"ShowFolderTree": { "direction": "subscribe", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"GetFolderFilter": { "direction": "subscribe", "mode": "ptp" },
			"GetGridSettingsInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GridSettingsChanged": { "direction": "subscribe", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetChartId": { "direction": "subscribe", "mode": "ptp" },
			"GetReportId": { "direction": "subscribe", "mode": "ptp" },
			"GetReportConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionSchemaName": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "subscribe", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "subscribe", "mode": "ptp" },
			"HideFolderTree": { "direction": "subscribe", "mode": "broadcast" },
			"FolderInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultExtendedFilter": { "direction": "subscribe", "mode": "broadcast" },
			"FilterCurrentSection": { "direction": "subscribe", "mode": "ptp" },
			"GetSectionModuleId": { "direction": "subscribe", "mode": "ptp" },
			"GetActiveViewName": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionPageDesignerModule: {
		css: ["SectionPageDesignerModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SectionPageWizard: {
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"HeaderStepClicked": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeaderStep": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" },
			"GetModuleConfigResult": { "direction": "publish", "mode": "ptp" },
			"Validate": { "direction": "publish", "mode": "ptp" },
			"ValidationResult": { "direction": "subscribe", "mode": "ptp" },
			"Save": { "direction": "publish", "mode": "ptp" },
			"SavingResult": { "direction": "subscribe", "mode": "ptp" },
			"SaveWizard": { "direction": "subscribe", "mode": "ptp" },
			"GetPackageUId": { "direction": "subscribe", "mode": "ptp" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionViewGenerator: {
		css: ["SectionViewGenerator"]
	},
	SectionViewModelGenerator: {
		messages: {
			"PushHistoryState": { "direction": "subscribe", "mode": "broadcast" },
			"CardModuleEntityInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionWizard: {
		css: ["SectionWizard"], 
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"GetPageDesignerConfig": { "direction": "subscribe", "mode": "ptp" },
			"PostPageDesignerConfig": { "direction": "publish", "mode": "broadcast" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SectionWizardCasesSettingsStyles: {
		css: ["SectionWizardCasesSettingsStyles"]
	},
	SelectionHandlerMultilineLabel: {
		css: ["SelectionHandlerMultilineLabel"]
	},
	SendTestEmailContentSchemaCSS: {
		css: ["SendTestEmailContentSchemaCSS"]
	},
	ServiceDesignerStyles: {
		css: ["ServiceDesignerStyles"]
	},
	SetupTelephonyParametersPageModule: {
		css: ["SetupTelephonyParametersPageModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	SetupTrackingViewConfigV2: {
		css: ["SetupTrackingViewConfigV2"]
	},
	SideBarModule: {
		css: ["SideBarModule"], 
		messages: {
			"UpdateSideBarRemindings": { "direction": "subscribe", "mode": "ptp" },
			"SidebarItemUpdated": { "direction": "subscribe", "mode": "ptp" },
			"SelectedSideBarItemChanged": { "direction": "subscribe", "mode": "ptp" },
			"FocusCorrectSideBar": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PostSectionMenuConfig": { "direction": "publish", "mode": "ptp" },
			"SideBarModuleDefInfo": { "direction": "publish", "mode": "ptp" },
			"SideBarLoadModule": { "direction": "subscribe", "mode": "ptp" },
			"SideBarBack": { "direction": "subscribe", "mode": "ptp" },
			"GetSideBarCurrentConfig": { "direction": "subscribe", "mode": "ptp" },
			"PushSideBarModuleDefInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SimpleIndicatorModule: {
		css: ["SimpleIndicatorModule"], 
		messages: {
			"GetIndicatorConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateIndicator": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	SimpleTaskAddModule: {
		css: ["SimpleTaskAddModule"], 
		messages: {
			"GetSimpleTaskAddViewModel": { "direction": "subscribe", "mode": "ptp" },
			"SimpleTaskViewModelCreated": { "direction": "publish", "mode": "ptp" },
			"RenderSimpleTaskAddView": { "direction": "subscribe", "mode": "ptp" },
			"getCardInfo": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"RemoveViewModel": { "direction": "publish", "mode": "ptp" },
			"GetSchedulerSelectionPressedKeys": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetScheduleItemTitle": { "direction": "subscribe", "mode": "ptp" },
			"OpenItem": { "direction": "publish", "mode": "ptp" },
			"UpdatePageHeaderCaption": { "direction": "publish", "mode": "ptp" }
		}
	},
	SocialAccountAuthModule: {
		css: ["SocialAccountAuthModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SocialAccountModule: {
		css: ["SocialAccountModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	SocialFeedUtilities: {
		css: ["SocialFeedUtilities"]
	},
	SocialMessageHistoryCommentItemPageViewConfig: {
		css: ["SocialMessageHistoryCommentItemPageViewConfig"]
	},
	SocialMessageHistoryItemPageV2CSS: {
		css: ["SocialMessageHistoryItemPageV2CSS"]
	},
	SocialMessageHistoryItemStyle: {
		css: ["SocialMessageHistoryItemStyle"]
	},
	SocialMessagePublisherModule: {
		css: ["SocialMessagePublisherModule"], 
		messages: {
			"RerenderPublisherModule": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SocialSearch: {
		css: ["SocialSearch"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SourceCodeDesignerCSS: {
		css: ["SourceCodeDesignerCSS"]
	},
	SourceCodeEdit: {
		css: ["SourceCodeEdit"]
	},
	SourceCodeEditMixin: {
		css: ["SourceCodeEditMixin"]
	},
	SpecificationFilterModule: {
		css: ["SpecificationFilterModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SspAdminUnitSectionCSS: {
		css: ["SspAdminUnitSectionCSS"]
	},
	SspPageWizard: {
		messages: {
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetModuleConfig": { "direction": "subscribe", "mode": "ptp" },
			"HeaderStepClicked": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeaderStep": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHeaderConfig": { "direction": "subscribe", "mode": "ptp" },
			"UpdateHeader": { "direction": "publish", "mode": "ptp" },
			"GetModuleConfigResult": { "direction": "publish", "mode": "ptp" },
			"Validate": { "direction": "publish", "mode": "ptp" },
			"ValidationResult": { "direction": "subscribe", "mode": "ptp" },
			"Save": { "direction": "publish", "mode": "ptp" },
			"SavingResult": { "direction": "subscribe", "mode": "ptp" },
			"SaveWizard": { "direction": "subscribe", "mode": "ptp" },
			"GetPackageUId": { "direction": "subscribe", "mode": "ptp" },
			"UpdateStepsConfig": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SspReadOnlyModeModuleCSS: {
		css: ["SspReadOnlyModeModuleCSS"]
	},
	StructureExploreModule: {
		css: ["StructureExploreModule"], 
		messages: {
			"ColumnSelected": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"setOperationType": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetEntitySchema": { "direction": "publish", "mode": "ptp" },
			"StructureExploreOpening": { "direction": "publish", "mode": "ptp" }
		}
	},
	StructureExploreModuleV2: {
		css: ["StructureExploreModuleV2"], 
		messages: {
			"ColumnSelected": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"setOperationType": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetStructureExplorerSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetEntitySchema": { "direction": "publish", "mode": "ptp" },
			"StructureExploreOpening": { "direction": "publish", "mode": "ptp" }
		}
	},
	StructureExplorerUtilities: {
		messages: {
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	SummaryModule: {
		css: ["SummaryModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"QuickFilterChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetQuickFilterModuleId": { "direction": "publish", "mode": "ptp" }
		}
	},
	SummaryModuleV2: {
		css: ["SummaryModuleV2"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetSectionSchemaName": { "direction": "publish", "mode": "ptp" },
			"GetQuickFilter": { "direction": "publish", "mode": "ptp" },
			"QuickFilterChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetQuickFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"FiltersChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetSectionModuleId": { "direction": "publish", "mode": "ptp" },
			"SummaryItemsUpdate": { "direction": "publish", "mode": "ptp" },
			"ChangeGridUtilitiesContainerSize": { "direction": "publish", "mode": "broadcast" },
			"ReloadSummaryModule": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	SummarySettingsModule: {
		css: ["SummarySettingsModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ColumnSelected": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"StructureExplorerInfo": { "direction": "subscribe", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" }
		}
	},
	SupplyPaymentGridButtonsUtility: {
		css: ["SupplyPaymentGridButtonsUtility"]
	},
	SyncSettingsErrorsCSS: {
		css: ["SyncSettingsErrorsCSS"]
	},
	SyncSettingsTabModule: {
		css: ["SyncSettingsTabModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" }
		}
	},
	SysLogoSettingsModule: {
		css: ["SysLogoSettingsModule"], 
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	SysMobileWorkplaceSectionStyles: {
		css: ["SysMobileWorkplaceSectionStyles"]
	},
	SysModuleEntitySelectSinglePageModalBoxCSS: {
		css: ["SysModuleEntitySelectSinglePageModalBoxCSS"]
	},
	SysOperationAuditMovingToArchiveModule: {
		css: ["SysOperationAuditMovingToArchiveModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ShowLookupPage": { "direction": "publish", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	SysSectionPanelSettingsModule: {
		css: ["SysSectionPanelSettingsModule"], 
		messages: {
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "ptp" },
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	SysSettingPageCSS: {
		css: ["SysSettingPageCSS"]
	},
	SystemDesignerDashboardsModule: {
		css: ["SystemDesignerDashboardsModule"], 
		messages: {
			"GetDashboardInfo": { "direction": "subscribe", "mode": "ptp" },
			"ReloadDashboard": { "direction": "publish", "mode": "ptp" },
			"SetDesignerResult": { "direction": "subscribe", "mode": "ptp" },
			"GetRecordInfo": { "direction": "subscribe", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	SystemDesignerTileModule: {
		css: ["SystemDesignerTileModule"], 
		messages: {
			"GetSystemDesignerTileConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateSystemDesignerTile": { "direction": "subscribe", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	SystemNotificationsSchemaCSS: {
		css: ["SystemNotificationsSchemaCSS"]
	},
	SysWorkplaceHelper: {
		css: ["SysWorkplaceHelper"]
	},
	SysWorkplaceSettingsModule: {
		css: ["SysWorkplaceSettingsModule"]
	},
	SysWorkplaceUtilitiesModuleV2: {
		css: ["SysWorkplaceUtilitiesModuleV2"]
	},
	TagModule: {
		messages: {
			"DeleteItem": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	TagModuleSchemaStyles: {
		css: ["TagModuleSchemaStyles"]
	},
	TestBulkEmailModule: {
		css: ["TestBulkEmailModule"], 
		messages: {
			"BackHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitDataViews": { "direction": "publish", "mode": "ptp" },
			"NeedHeaderCaption": { "direction": "subscribe", "mode": "broadcast" },
			"ChangeHeaderCaption": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"LookupResultSelected": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetBulkEmail": { "direction": "publish", "mode": "ptp" }
		}
	},
	TimelineCSS: {
		css: ["TimelineCSS"]
	},
	TimelineFilterMenu: {
		css: ["TimelineFilterMenu"]
	},
	TimelineFilterMenuItem: {
		css: ["TimelineFilterMenuItem"]
	},
	TimezoneGenerator: {
		css: ["TimezoneGenerator"]
	},
	TooltipUtilities: {
		css: ["TooltipUtilities"]
	},
	TrackingCodeViewConfigV2: {
		css: ["TrackingCodeViewConfigV2"]
	},
	TranslationCSS: {
		css: ["TranslationCSS"]
	},
	TranslationPageCss: {
		css: ["TranslationPageCss"]
	},
	UserCasesListModule: {
		css: ["UserCasesListModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetDashboardGridConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateDashboardGrid": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	UserCertificateListModule: {
		css: ["UserCertificateListModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"GetDashboardGridConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateDashboardGrid": { "direction": "subscribe", "mode": "ptp" },
			"UpdateFilter": { "direction": "subscribe", "mode": "broadcast" },
			"GetFiltersCollection": { "direction": "publish", "mode": "ptp" },
			"GetSectionFilterModuleId": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" }
		}
	},
	UserProfile: {
		messages: {
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"InitContextHelp": { "direction": "publish", "mode": "ptp" }
		}
	},
	UserProfileCSS: {
		css: ["UserProfileCSS"]
	},
	UserQuestionProcessElementPage: {
		css: ["UserQuestionProcessElementPage"], 
		messages: {
			"GetProcessExecData": { "direction": "publish", "mode": "ptp" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"ReplaceHistoryState": { "direction": "publish", "mode": "broadcast" },
			"ShowLookupPage": { "direction": "subscribe", "mode": "ptp" },
			"LookupResultSelected": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"GetProcessExecDataCollection": { "direction": "publish", "mode": "ptp" },
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"OpenCardModule": { "direction": "subscribe", "mode": "ptp" },
			"GetCardModuleSandboxId": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ViewModelCollectionGridSchemaV2CSS: {
		css: ["ViewModelCollectionGridSchemaV2CSS"]
	},
	ViewModelSchemaDesignerControlGroupModalBoxCss: {
		css: ["ViewModelSchemaDesignerControlGroupModalBoxCss"]
	},
	ViewModelSchemaDesignerDetailModalBoxCss: {
		css: ["ViewModelSchemaDesignerDetailModalBoxCss"]
	},
	ViewModelSchemaDesignerItem: {
		css: ["ViewModelSchemaDesignerItem"]
	},
	ViewModelSchemaDesignerModule: {
		css: ["ViewModelSchemaDesignerModule"]
	},
	ViewModelSchemaDesignerTabItem: {
		css: ["ViewModelSchemaDesignerTabItem"]
	},
	ViewModelSchemaDesignerTabModalBoxCss: {
		css: ["ViewModelSchemaDesignerTabModalBoxCss"]
	},
	ViewModelSchemaDesignerViewGenerator: {
		css: ["ViewModelSchemaDesignerViewGenerator"]
	},
	ViewModelWithMixins: {
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	ViewModule: {
		css: ["ViewModule"], 
		messages: {
			"PushHistoryState": { "direction": "publish", "mode": "broadcast" },
			"HistoryStateChanged": { "direction": "subscribe", "mode": "broadcast" },
			"GetHistoryState": { "direction": "publish", "mode": "ptp" },
			"SelectedSideBarItemChanged": { "direction": "publish", "mode": "ptp" },
			"ChangeRemindingsCounts": { "direction": "subscribe", "mode": "broadcast" },
			"RemindingsCountsChanged": { "direction": "publish", "mode": "ptp" },
			"LookupInfo": { "direction": "subscribe", "mode": "ptp" },
			"OpenLookupPage": { "direction": "subscribe", "mode": "broadcast" },
			"ResultSelectedRows": { "direction": "subscribe", "mode": "ptp" },
			"RefreshCacheHash": { "direction": "subscribe", "mode": "ptp" },
			"FocusCorrectSideBar": { "direction": "subscribe", "mode": "broadcast" },
			"SideBarVisibilityChanged": { "direction": "subscribe", "mode": "ptp" },
			"SideBarVisibilityInfo": { "direction": "publish", "mode": "ptp" },
			"LoadModule": { "direction": "subscribe", "mode": "ptp" },
			"UpdateSideBarRemindings": { "direction": "publish", "mode": "ptp" },
			"SidebarItemUpdated": { "direction": "publish", "mode": "ptp" },
			"NavigationModuleLoaded": { "direction": "subscribe", "mode": "broadcast" },
			"SideBarModuleDefInfo": { "direction": "subscribe", "mode": "ptp" },
			"PushSideBarModuleDefInfo": { "direction": "publish", "mode": "ptp" },
			"GetSideBarConfig": { "direction": "publish", "mode": "ptp" },
			"CardProccessModuleInfo": { "direction": "subscribe", "mode": "ptp" },
			"ShowHideRightSidePanel": { "direction": "subscribe", "mode": "broadcast" }
		}
	},
	ViewModuleWrapper: {
		css: ["ViewModuleWrapper"], 
		messages: {
			"ReloadViewModule": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	VisaHelper: {
		css: ["VisaHelper"]
	},
	VwMandrillRecipientDetailV2CSS: {
		css: ["VwMandrillRecipientDetailV2CSS"]
	},
	WebPageModule: {
		css: ["WebPageModule"], 
		messages: {
			"GetWebPageConfig": { "direction": "publish", "mode": "ptp" },
			"GenerateWebPage": { "direction": "subscribe", "mode": "ptp" }
		}
	},
	WebServiceMethodModule: {
		css: ["WebServiceMethodModule"]
	},
	WelcomeScreenModule: {
		css: ["WelcomeScreenModule"]
	},
	WizardErrorModalBoxPageCss: {
		css: ["WizardErrorModalBoxPageCss"]
	},
	WizardHeaderModule: {
		css: ["WizardHeaderModule"]
	},
	WizardStepsControl: {
		css: ["WizardStepsControl"]
	},
	WizardWarningModalBoxPageCss: {
		css: ["WizardWarningModalBoxPageCss"]
	},
	WVideoModule: {
		css: ["WVideoModule"]
	}
};
