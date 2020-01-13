Terrasoft.configuration.Structures["FileImportConstants"] = {innerHierarchyStack: ["FileImportConstants"]};
define("FileImportConstants", ["FileImportConstantsResources"], function(resources) {
	/**
	 * @class Terrasoft.configuration.FileImportConstants
	 * FileImportConstants class contains configuration constants for FileImport.
	 */
	Ext.define("Terrasoft.configuration.FileImportConstants", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.FileImportConstants",
		singleton: true,

		Exceptions: {
			FileFormatException: {
				message: resources.localizableStrings.FileFormatExceptionMessage
			},
			ArgumentOutOfRangeException: {
				message: resources.localizableStrings.ArgumentOutOfRangeExceptionMessage
			},
			UriFormatException: {
				message: resources.localizableStrings.UriFormatExceptionMessage,
				link: {
					academyId: 1587,
					caption: resources.localizableStrings.UriFormatExceptionLinkCaption
				}
			},
			OpenXmlPackageException: {
				message: resources.localizableStrings.UriFormatExceptionMessage,
				link: {
					academyId: 1587,
					caption: resources.localizableStrings.UriFormatExceptionLinkCaption
				}
			},
			OutOfMemoryException: {
				message: resources.localizableStrings.OutOfMemoryExceptionMessage
			},
			EmptyHeaderException: {
				message: resources.localizableStrings.EmptyHeaderExceptionMessage
			}
		}
	});
});


