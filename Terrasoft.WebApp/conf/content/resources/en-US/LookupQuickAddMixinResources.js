define("LookupQuickAddMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TipMessageTemplate: "New {0}",
		NoRightsToAdd: "Insufficient rights to add record to the \u0022{0}\u0022 object",
		CantOpenPage: "This lookup does not contain a separate edit page. To add a record, go to the \u0022Lookups\u0022 section and open the lookup contents.",
		NotSysModuleNeitherLookup: "Object \u0022{0}\u0022 does not have registered section or is not a system lookup",
		ColumnFilterInvalidFormatException: "Filtering by the {0} column is configured incorrectly",
		CanNotManageLookups: "Insufficient rights to perform this action. Contact your system administrator."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});