Terrasoft.configuration.Structures["ServiceDeskConstants"] = {innerHierarchyStack: ["ServiceDeskConstants"]};
define("ServiceDeskConstants", [], function() {

	var setSatisfactionTaskPeriod = 5;

	var sysAdminUnitType = {
		Organization: {
			Value: 0
		},
		Division: {
			Value: 1
		},
		Managers: {
			Value: 2
		},
		Team: {
			Value: 3
		},
		User: {
			Value: 4
		}
	};

	var serviceObjectType = {
		Contact: "b2aad5df-af5c-425b-ac2c-2f13d8810a71",
		Account: "350d6fd7-c84c-43c0-bec6-40116cbb9d2b",
		Department: "b6be1328-f7fd-48c5-9073-474a35876903"
	};

	var servicePactType = {
		UC: "37f8975c-c73b-4c70-b586-cef15b1f45cd",
		OLA: "a7704e71-0860-44aa-ae44-405d2bc24fc8",
		SLA: "f6822f7f-0c38-4d98-87d2-9cfd25bdaa60"
	};

	var caseState = {
		NewRequest: "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38",
		InProgress: "7e9f1204-f46b-1410-fb9a-0050ba5d6c38",
		Reopened: "f063ebbe-fdc6-4982-8431-d8cfa52fedcf",
		Resolved: "ae7f411e-f46b-1410-009b-0050ba5d6c38",
		Canceled: "6e5f4218-f46b-1410-fe9a-0050ba5d6c38",
		WaitingForResponse: "3859c6e7-cbcb-486b-ba53-77808fe6e593",
		Closed: "3e7f420c-f46b-1410-fc9a-0050ba5d6c38"
	};

	var caseCategory = {
		Incident: "1b0bc159-150a-e111-a31b-00155d04c01d",
		ServiceRequest: "1c0bc159-150a-e111-a31b-00155d04c01d"
	};

	var needToCalculateByPriorityStrategies = {
		StrategyByService: "3582e35b-11ee-4c33-930f-0c701737320c",
		StrategyByPriorityInSLALevel: "13212813-cacb-4907-b8c6-66cf56d2801d"
	};

	var closureCode = {
		CanceledAsDouble: "7ce9843e-6855-4412-9282-ec55edf6d05b"
	};

	var caseOrigin = {
		Email: "7f9e1f1e-f46b-1410-3492-0050ba5d6c38",
		Portal: "debf4124-f46b-1410-3592-0050ba5d6c38"
	};

	return {
		SetSatisfactionTaskPeriod: setSatisfactionTaskPeriod,
		SysAdminUnitType: sysAdminUnitType,
		ServiceObjectType: serviceObjectType,
		ServicePactType: servicePactType,
		CaseState: caseState,
		CaseCategory: caseCategory,
		NeedToCalculateByPriorityStrategies: needToCalculateByPriorityStrategies,
		ClosureCode: closureCode,
		CaseOrigin: caseOrigin
	};
});


