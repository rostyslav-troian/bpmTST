Terrasoft.configuration.Structures["MobileActivityParticipantGridPageView"] = {innerHierarchyStack: ["MobileActivityParticipantGridPageView"]};
Ext.define("Terrasoft.configuration.view.ActivityParticipantGridPage", {
	extend: "Terrasoft.view.BaseGridPage.View",
	alternateClassName: "Terrasoft.configuration.ActivityParticipantGridPageView",
	config: {
		id: "ActivityParticipantGridPage",
		grid: {
			store: "Terrasoft.configuration.ActivityParticipantGridPageStore"
		}
	}
});

Ext.define("Terrasoft.configuration.store.ActivityParticipantGridPage", {
	extend: "Terrasoft.store.BaseStore",
	alternateClassName: "Terrasoft.configuration.ActivityParticipantGridPageStore",
	config: {
		model: "ActivityParticipant",
		controller: "Terrasoft.configuration.ActivityParticipantGridPageController"
	}
});


