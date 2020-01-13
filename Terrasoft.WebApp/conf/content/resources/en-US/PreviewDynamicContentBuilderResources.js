define("PreviewDynamicContentBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SegmentLabelCaption: "Select segments for preview",
		ApplyButtonCaption: "Apply",
		DefaultBlockCaption: "Default",
		DefaultBlockInfoButtonTip: "This content block will be skipped for any recipients who do not meet dynamic rule conditions",
		BlockGroupCaptionTemplate: "Dynamic block {0}",
		EmptyReplicaWarning: "Email template does not contain default rule for any dynamic content block.\u003Cbr\u003E\u0022Canceled (template not found)\u0022 response will be set for not segmented recipients.\u003Cbr\u003E\u003Cbr\u003EThe validation was set in order to prevent sending blank emails.",
		NoDefaultContentHint: "Email template does not contain default rule for any dynamic content block. \u0022Canceled (template not found)\u0022 response will be set for not segmented recipients",
		SelectReplicaToPreviewContent: "\u003Cdiv style=\u0022text-align:center;color:#a2a2a2;padding:20px\u0022\u003EPlease select template variant\u003C\/div\u003E"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "PreviewDynamicContentBuilder",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		ExpandIcon: {
			source: 3,
			params: {
				schemaName: "PreviewDynamicContentBuilder",
				resourceItemName: "ExpandIcon",
				hash: "d12ba2dcc89318c4b1647a1942c45b0e",
				resourceItemExtension: ".svg"
			}
		},
		DefaultBlockInfoButtonImage: {
			source: 3,
			params: {
				schemaName: "PreviewDynamicContentBuilder",
				resourceItemName: "DefaultBlockInfoButtonImage",
				hash: "33d44fbb5a791276ddbae2f046e70b8b",
				resourceItemExtension: ".png"
			}
		},
		BackIcon: {
			source: 3,
			params: {
				schemaName: "PreviewDynamicContentBuilder",
				resourceItemName: "BackIcon",
				hash: "6143f8f0bd6c2b027dc3ae5c825c9e2a",
				resourceItemExtension: ".svg"
			}
		},
		EmptyReplicaIcon: {
			source: 3,
			params: {
				schemaName: "PreviewDynamicContentBuilder",
				resourceItemName: "EmptyReplicaIcon",
				hash: "25e896cdece5a8acfc34cc4ee540b441",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});