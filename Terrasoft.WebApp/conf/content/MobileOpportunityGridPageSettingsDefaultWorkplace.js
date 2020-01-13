Terrasoft.configuration.Structures["MobileOpportunityGridPageSettingsDefaultWorkplace"] = {innerHierarchyStack: ["MobileOpportunityGridPageSettingsDefaultWorkplaceOpportunity", "MobileOpportunityGridPageSettingsDefaultWorkplace"]};

define('MobileOpportunityGridPageSettingsDefaultWorkplaceOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "Opportunity",
			"gridType": 3,
			"items": [],
			"rows": 2,
			"columns": 1,
			"settingsType": "GridPage",
			"operation": "insert",
			"localizableStrings": {},
			"subtitleItems": [],
			"groupItems": []
		}
	},
	{
		"operation": "insert",
		"name": "e9cc4781-5521-45ad-85de-ae1575ca41d3",
		"values": {
			"row": 0,
			"content": "Name",
			"columnName": "Title",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "be602bfb-1dde-4a4a-814b-212c67646fb9",
		"values": {
			"row": 0,
			"content": "Account",
			"columnName": "Account",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "subtitleItems",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "2cce55f6-9ac7-4a49-870d-cb98a309083a",
		"values": {
			"row": 1,
			"content": "Contact",
			"columnName": "Contact",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "subtitleItems",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "37974cf4-9dd9-4670-bfd1-13e991f14f91",
		"values": {
			"row": 2,
			"content": "Stage",
			"columnName": "Stage",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "subtitleItems",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "0b556a05-2efc-4cfa-b00a-56444df3fab1",
		"values": {
			"row": 3,
			"content": "Mood",
			"columnName": "Mood",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "subtitleItems",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "257e2e65-15bd-48dd-b5c8-9fcb4b38af89",
		"values": {
			"row": 0,
			"content": "Opportunity amount",
			"columnName": "Amount",
			"dataValueType": 5,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "groupItems",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "3ec188fc-7196-4dc7-b746-a8a8e7467ec1",
		"values": {
			"row": 1,
			"content": "Closed on",
			"columnName": "DueDate",
			"dataValueType": 7,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "groupItems",
		"index": 1
	}
]
[
	{
		"operation": "merge",
		"name": "3ec188fc-7196-4dc7-b746-a8a8e7467ec1",
		"values": {
			"row": 2
		}
	},
	{
		"operation": "insert",
		"name": "3ee3a01f-8518-4118-9bfb-ee82c1207d11",
		"values": {
			"row": 1,
			"content": "Customer need",
			"columnName": "LeadType",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "groupItems",
		"index": 2
	}
]

