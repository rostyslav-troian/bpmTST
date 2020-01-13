Terrasoft.configuration.Structures["XRMConstants"] = {innerHierarchyStack: ["XRMConstants"]};
define("XRMConstants", ['ext-base', 'terrasoft', 'XRMConstantsResources'], function(Ext, Terrasoft, resources) {
	var project = {
		EntryType: {
			Project: '6b4928d7-456a-4acd-a863-3361d46b7649',
			Work: '772874ae-4265-4a9a-9393-5bdc12f670f7'
		}
	};

	var cashflow = {
		Type: {
			Inflow: '34a47bed-5cc6-4cf7-b81b-719f2915d263',
			Outflow: 'd566f91a-fb87-4bfe-aa8f-0de66f392ace'
		}
	};

	return {
		Project: project,
		Cashflow: cashflow
	};
});


