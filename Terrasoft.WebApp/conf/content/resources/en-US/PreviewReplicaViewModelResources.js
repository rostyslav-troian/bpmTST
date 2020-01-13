define("PreviewReplicaViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MacroTemplate: "[#{0}#]",
		FieldEmptyValidationMessage: "Enter a value",
		SenderMacroValidationMessage: "Could not save bulk email: the field value must be specified either as a string or as a macro.",
		SenderMacroInfoMessage: "Your sender is specified as a macro. Creatio will send emails only from verified sender domains. Any emails, whose sender domain is not verified will not be sent. The response for such emails will be \u201CCanceled (Sender\u0027s domain not verified)\u201D",
		IncorrectEmailMessage: "Could not save bulk email: incorrect sender\u0027s email specified.Enter a valid email.",
		ReplicaLabel: "Replica",
		SenderEmailTemplate: "\u003C{0}\u003E"
	};
	var localizableImages = {
		MacrosIcon: {
			source: 3,
			params: {
				schemaName: "PreviewReplicaViewModel",
				resourceItemName: "MacrosIcon",
				hash: "d294aa661f282450a25f9085195b3eae",
				resourceItemExtension: ".png"
			}
		},
		RightArrowIcon: {
			source: 3,
			params: {
				schemaName: "PreviewReplicaViewModel",
				resourceItemName: "RightArrowIcon",
				hash: "3574310abda235a6d7fcb1bdcde6209a",
				resourceItemExtension: ".svg"
			}
		},
		LetterIcon: {
			source: 3,
			params: {
				schemaName: "PreviewReplicaViewModel",
				resourceItemName: "LetterIcon",
				hash: "6331900a11532b70bd90a35d72bae4e4",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});