define("CampaignDiagramValidatorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DiagramCommunicationElementsLinkedMessage: "Unable to start the campaign. Campaign workflow must contain either \u0022Audience\u0022 or \u0022Landing page\u0022 start step.\n\nAdd a start step to the campaign (either \u0022Audience\u0022 or \u0022Landing page\u0022) and restart the campaign.",
		DiagramElementsFilledMessage: "Unable to start the campaign. Some of the steps on the campaign workflow are missing required information.\n\nMake sure that all \u0022Email\u0022, \u0022Event\u0022 and \u0022Landing page\u0022 steps are connected to the corresponding section records.",
		DiagramContainsCommunicationElementsMessage: "Unable to start campaign. The campaign workflow contains only start and end steps.\n\nAdd \u0022Bulk email\u0022 and\/or \u0022Event\u0022 steps to the workflow, specify transitions, and restart the campaign.",
		DiagramAudienceLinkedMessage: "Unable to start the campaign. The \u0022Audience\u0022 step is not connected to the next step.\n\nConnect the the steps on the workflow diagram and restart the campaign.",
		DiagramLandingLinkedMessage: "Unable to start the campaign. The \u0022Landing page\u0022 step is not connected to the next step.\n\nConnect the the steps on the workflow diagram and restart the campaign.",
		DiagramContainsStartElementMessage: "Unable to start the campaign. Start step is missing.\n\nAdd a start step (either \u0022Campaign audience\u0022 or \u0022Landing page\u0022) and restart the campaign.",
		DiagramTargetLinkedMessage: "Unable to start the campaign. The \u0022Reached the target\u0022 step is not connected to the previous step.\n\nConnect the steps on the campaign workflow and restart the campaign.",
		EmptyTemplateExistMessage: "Unable to start the campaign. No template selected for one or more bulk emails. Make sure that all bulk emails have templates selected and restart the campaign.",
		DiagramLandingValidMessage: "Unable to start the campaign. You can only use Landing element with \u0022Event participant\u0022 or \u0022Lead\u0022 type in the middle of the campaign workflow. Please change the selected landing page and try to start campaign again."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});