define("CtiNotificationUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IncomingCallCaption: "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0432\u044B\u0437\u043E\u0432",
		MissedCallCaption: "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0439 \u0432\u044B\u0437\u043E\u0432",
		OutgoingCallCaption: "\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0432\u044B\u0437\u043E\u0432",
		DefaultCallCaption: ""
	};
	var localizableImages = {
		IncomingCall: {
			source: 3,
			params: {
				schemaName: "CtiNotificationUtilities",
				resourceItemName: "IncomingCall",
				hash: "f41b1223f5361269d94c9a6409d7732d",
				resourceItemExtension: ".png"
			}
		},
		MissedCall: {
			source: 3,
			params: {
				schemaName: "CtiNotificationUtilities",
				resourceItemName: "MissedCall",
				hash: "1af6becb53c01ae812ae42fc9cc45309",
				resourceItemExtension: ".png"
			}
		},
		OutgoingCall: {
			source: 3,
			params: {
				schemaName: "CtiNotificationUtilities",
				resourceItemName: "OutgoingCall",
				hash: "f41b1223f5361269d94c9a6409d7732d",
				resourceItemExtension: ".png"
			}
		},
		DefaultCall: {
			source: 3,
			params: {
				schemaName: "CtiNotificationUtilities",
				resourceItemName: "DefaultCall",
				hash: "f41b1223f5361269d94c9a6409d7732d",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});