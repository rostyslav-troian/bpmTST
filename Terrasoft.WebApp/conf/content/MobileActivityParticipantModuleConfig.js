Terrasoft.configuration.Structures["MobileActivityParticipantModuleConfig"] = {innerHierarchyStack: ["MobileActivityParticipantModuleConfig"]};
Terrasoft.sdk.GridPage.setTitle("ActivityParticipant", "MobileActivityParticipantGridPageTitle");

Terrasoft.sdk.GridPage.setPrimaryColumn("ActivityParticipant", "Participant");

Terrasoft.sdk.GridPage.setSubtitleColumns("ActivityParticipant", [
	{
		name: "Participant.Account"
	}
]);

Terrasoft.sdk.GridPage.setImageColumn("ActivityParticipant", "Participant.Photo.PreviewData",
	"MobileImageListDefaultContactPhoto");

Terrasoft.sdk.RecordPage.addColumn("ActivityParticipant", {
	name: "Participant"
}, "primaryColumnSet");

Terrasoft.sdk.Actions.add("ActivityParticipant", {
	name: "DeleteAction",
	isVisibleInGrid: true,
	isRecordAction: true,
	isVisibleInPreview: false,
	isDisplayTitle: true,
	actionClassName: "Terrasoft.ActionDelete"
});


