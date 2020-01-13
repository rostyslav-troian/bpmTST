define("CtiNotificationUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IncomingCallCaption: "Incoming call",
		MissedCallCaption: "Missed call",
		OutgoingCallCaption: "Outgoing call",
		DefaultCallCaption: ""
	};
	var localizableImages = {
		IncomingCall: {
			source: 3,
			params: {
				schemaName: "CtiNotificationUtilities",
				resourceItemName: "IncomingCall",
				hash: "c6fe2999c39516c05bebe3afdba4c52b",
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