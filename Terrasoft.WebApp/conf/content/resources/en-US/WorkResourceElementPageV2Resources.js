define("WorkResourceElementPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PlaningWorkIsLessMessage: "{0} hours are planned for the subordinate items. The working time of the current item cannot be less than this amount.",
		HasChildWorkMessage: "Unable to modify the resource. Project tasks in the subordinate items are planned for this resource.",
		ResourceExists: "This resources is already allocated for the project task",
		HasChildActivityMessage: "Unable to modify the resource. Activities in the system are connected to the current item with this resource.",
		WorkCaption: "Project task",
		PlanningWorkCaption: "Expected working time, h",
		ActualWorkCaption: "Actual working time, h"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});