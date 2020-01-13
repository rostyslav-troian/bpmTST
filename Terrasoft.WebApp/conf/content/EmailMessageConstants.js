Terrasoft.configuration.Structures["EmailMessageConstants"] = {innerHierarchyStack: ["EmailMessageConstants"]};
define("EmailMessageConstants", [], function() {
	var activity = {
		EmailSendStatus: {
			NotSend: "20c0c460-6107-e011-a646-16d83cab0980",
			InProgress: "603ba6af-6107-e011-a646-16d83cab0980",
			Sended: "8074ffc0-6107-e011-a646-16d83cab0980",
			ErrorOnSend: "8077e9ce-6107-e011-a646-16d83cab0980",
			Opened: "7459545a-9229-4ee7-b501-03b8a50e2b39",
			Unsubscribed: "b329e575-0b45-4d32-9b88-aaea6755120f",
			Awaiting: "603ba6af-6107-e011-a646-16d83cab0980"
		}
	};

	var messageNotifier = {
		Email: "d6650c53-bbe4-4ac2-9df8-a1fd23938e83"
	};

	return {
		Activity: activity,
		MessageNotifier: messageNotifier
	};
});


