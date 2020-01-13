define("BulkEmailContentWizardPreviewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectReplicaToPreviewContent: "\u003Cdiv style=\u0022text-align:center;color:#a2a2a2;padding:20px\u0022\u003EPlease select template variant\u003C\/div\u003E",
		ReplicasContainerCaption: "Inbox preview",
		EmptyReplicaWarning: "Preview of email template is not available in this mode. Use the \u0027Default Headers\u0027 menu to add or change default header values, or set custom dynamic headers for each replica.",
		InboxPreviewInfoButtonCaption: "Creatio displays content and headers for the currently selected replica. Switch to a different replica to view its content and headers",
		DownloadHtmlButtonCaption: "Download .html",
		SendTestEmailButtonCaption: "Test email"
	};
	var localizableImages = {
		EmptyReplicaIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardPreview",
				resourceItemName: "EmptyReplicaIcon",
				hash: "b43586dd04d4b1821bd1908e105e57f5",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});