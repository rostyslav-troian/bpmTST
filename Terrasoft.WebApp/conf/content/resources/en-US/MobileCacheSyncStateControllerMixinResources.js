define("MobileCacheSyncStateControllerMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GridPageLastSyncDateMessage: "Updated at",
		GridPageInformationPanelRefreshButtonText: "Refresh",
		GridPageExportErrorMessage: "There are some issues with synchronization that need your attention",
		GridPageExportErrorMoreButtonText: "More details",
		GridPageDataLoadingMessage: "Synchronizing data...",
		GridPageDataLoadedMessage: "Your data is up-to-date",
		GridPageNoConnectionStateMessage: "You\u0027re offline. Please, check your internet connection and try to refresh data"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});