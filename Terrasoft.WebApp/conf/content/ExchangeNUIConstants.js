Terrasoft.configuration.Structures["ExchangeNUIConstants"] = {innerHierarchyStack: ["ExchangeNUIConstants"]};
define("ExchangeNUIConstants", ["terrasoft", "ExchangeNUIConstantsResources", "ConfigurationConstants"],
	function(Terrasoft, resources, ConfigurationConstants) {
		var mailSyncPeriod = {
			Week: "2D480351-94B7-4CAD-B02F-885730C7EB3E"
		};

		var mailServer = {
			Type: {
				Imap: "844f0837-eaa0-4f40-b965-71f5db9eae6e",
				Exchange: "3490bd45-4f4d-4613-aa06-454546f3342a"
			},
			Gmail: "1b424a93-dee9-e011-8376-00155d04c01d"
		};
		var exchangeFolder = {
			NoteClass: {
				Name: "IPF.Note"
			},
			AppointmentClass: {
				Name: "IPF.Appointment"
			},
			ContactClass: {
				Name: "IPF.Contact"
			},
			TaskClass: {
				Name: "IPF.Task"
			},
			BPMContact: {
				Name: "BPM.ContactFolder",
				SchemaName: "ContactFolder",
				SchemaFilters: [
					Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "FolderType",
						ConfigurationConstants.Folder.Type.Search)
				]
			},
			BPMActivity: {
				Name: "BPM.ActivityFolder",
				SchemaName: "ActivityFolder",
				SchemaFilters: [
					Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "FolderType",
						ConfigurationConstants.Folder.Type.Search)
				]
			}
		};

		return {
			MailServer: mailServer,
			ExchangeFolder: exchangeFolder,
			MailSyncPeriod: mailSyncPeriod
		};
	});


