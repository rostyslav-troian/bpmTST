define("BulkEmailContentWizardHeadersResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DefaultBlockCaption: "Default",
		DefaultBlockInfoButtonTip: "This content block will be skipped for any recipients who do not meet dynamic rule conditions",
		BlockGroupCaptionTemplate: "Dynamic block {0}",
		EmptyReplicaWarning: "Preview of email template is not available in this mode. Use the \u0027Default Headers\u0027 menu to add or change default header values, or set custom dynamic headers for each replica.",
		NoDefaultContentHint: "Email template does not contain default rule for any dynamic content block. \u0022Canceled (template not found)\u0022 response will be set for not segmented recipients",
		SelectReplicaToPreviewContent: "\u003Cdiv style=\u0022text-align:center;color:#a2a2a2;padding:20px\u0022\u003EPlease select template variant\u003C\/div\u003E",
		SenderNameColumnCaption: "Sender\u0027s name",
		SenderEmailColumnCaption: "Sender\u0027s email",
		PreHeaderColumnCaption: "Pre-header",
		SubjectColumnCaption: "Subject",
		DefaultReplicasContainerCaption: "Default headers",
		ReplicasContainerCaption: "Dynamic headers",
		DefaultReplicaInformationButtonTooltip: "Creatio will use default headers for any replicas where dynamic headers are disabled.",
		ReplicaInformationButtonTooltip: "Creatio will use corresponding dynamic headers for any replicas where the checkbox is selected. If the checkbox is cleared next to a replica, it will have default headers.",
		ReplicaValidationToolTip: "Errors in validation of header fields have been detected",
		MacroTemplate: "[#{0}#]",
		InvalidSenderDomainMessage: "The email domain is not confirmed, which might significantly affect email deliverability. Add domain and get settings to confirm it \u003Ca href=\u0022\u0022\u003Ehere\u003C\/a\u003E.",
		ValidSenderDomainMessage: "Sending domain was successfully verified for sending emails"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		ExpandIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "ExpandIcon",
				hash: "d12ba2dcc89318c4b1647a1942c45b0e",
				resourceItemExtension: ".svg"
			}
		},
		BackIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "BackIcon",
				hash: "6143f8f0bd6c2b027dc3ae5c825c9e2a",
				resourceItemExtension: ".svg"
			}
		},
		ToggleListButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "ToggleListButtonImage",
				hash: "a709c93089bdecb2738c4f87e3f72eec",
				resourceItemExtension: ".svg"
			}
		},
		EmptyReplicaIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "EmptyReplicaIcon",
				hash: "25e896cdece5a8acfc34cc4ee540b441",
				resourceItemExtension: ".svg"
			}
		},
		DefaultBlockInfoButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "DefaultBlockInfoButtonImage",
				hash: "33d44fbb5a791276ddbae2f046e70b8b",
				resourceItemExtension: ".png"
			}
		},
		BpmonlineMacrosIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizardHeaders",
				resourceItemName: "BpmonlineMacrosIcon",
				hash: "d294aa661f282450a25f9085195b3eae",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});