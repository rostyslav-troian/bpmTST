define("BulkEmailContentBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UnsubscribeLinkBlock: "",
		ApplyUnsubscribeLinkMessage: "There is no unsubscribe link in the current email template. Email service providers will block emails without an unsubscribe link.\nDo you wish to insert an unsubscribe link automatically?",
		PreHeaderCaption: "Pre-header",
		PreHeaderTooltip: "The visible text of preheader is different for each email client. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221875\u0022 \u003ELearn more\u003C\/a\u003E",
		ValidationHelpButtonCaption: "Learn more",
		ExitMessage: "All unsaved changes will be lost. Continue?",
		SendTestEmailButtonCaption: "Test email",
		NoDefaultContentMessage: "Email template contains dynamic content blocks without any default content. All recipients that do not meet dynamic content rules will receive email templates without these content blocks",
		RulesWithEmptyFilterMessage: "The following dynamic content rules do not have any filters configured: {0}. The content configured for these rules will be sent to all recipients",
		ApplyUnsubscribeLinkWithDynamicBlockMessage: "One or several of the dynamic content variations of email template have no unsubscribe link. Email service providers will block emails without an unsubscribe link.\nDo you wish to insert an unsubscribe link automatically?"
	};
	var localizableImages = {
		DefaultBlockImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentBuilder",
				resourceItemName: "DefaultBlockImage",
				hash: "6c304675aa81e38fa1b9ea8a1834b4f4",
				resourceItemExtension: ".png"
			}
		},
		SheetSettingsButton: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentBuilder",
				resourceItemName: "SheetSettingsButton",
				hash: "339995a317aa2591e4d2909b009a2f99",
				resourceItemExtension: ".png"
			}
		},
		SettingsButtonIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentBuilder",
				resourceItemName: "SettingsButtonIcon",
				hash: "778171cce61f3693d0a8ea3f3b33f645",
				resourceItemExtension: ".png"
			}
		},
		SearchIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentBuilder",
				resourceItemName: "SearchIcon",
				hash: "c0960e5d98faf61a2a5532aba9a8ccd0",
				resourceItemExtension: ".svg"
			}
		},
		SearchUserBlockIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentBuilder",
				resourceItemName: "SearchUserBlockIcon",
				hash: "ef96400dd632c3b0ed257d5c577f05b2",
				resourceItemExtension: ".svg"
			}
		},
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentBuilder",
				resourceItemName: "PropertiesPageIcon",
				hash: "738d5d03e8b8231882e0338b44d66fbc",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});