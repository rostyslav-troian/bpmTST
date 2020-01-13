define("EmptyEmailPanelSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NoEmailsInFolder: "This folder does not contain any emails",
		EmptyMessagePart1: "Add",
		EmptyMessagePart2: "new mailbox.",
		EmptyMessagePart3: "Learn more about working with emails in the",
		NoMailboxes: "No mailboxes available",
		EmptyMessagePart4: "Academy."
	};
	var localizableImages = {
		EmailBubble: {
			source: 3,
			params: {
				schemaName: "EmptyEmailPanelSchema",
				resourceItemName: "EmailBubble",
				hash: "0b06bc6aa058b00b922fdcd5e8e631d3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});