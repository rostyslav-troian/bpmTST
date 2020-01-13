define("WorkResourceElementDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HasChildMessage: "Unable to delete the resource. Project tasks in the subordinate items are planned for this resource.",
		HasActivityMessage: "Unable to delete the resource.  Activities in the system are connected to the current item with this resource. ",
		DefaultWarning: "Unable to delete the resource",
		CalculateMenuItemCaption: "Calculate actual working time",
		Caption: "Resources"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});