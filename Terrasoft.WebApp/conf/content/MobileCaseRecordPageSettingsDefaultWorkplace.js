Terrasoft.configuration.Structures["MobileCaseRecordPageSettingsDefaultWorkplace"] = {innerHierarchyStack: ["MobileCaseRecordPageSettingsDefaultWorkplace"]};

[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "Case",
			"details": [],
			"columnSets": [],
			"localizableStrings": {
				"SocialMessageDetailCaptionCase_caption": "Feed",
				"primaryColumnSetCase_caption": "General information",
				"DescriptionColumnSetCase_caption": "Description",
				"CaseProfileColumnSetCase_caption": "Case information",
				"CaseMessageHistoryDetailCaptionCase_caption": "Processing history",
				"ActivityDetailV2StandardDetailCase_caption": "Activities",
				"CaseRecordPageFilesDetailTitle": "Attachments"
			},
			"settingsType": "RecordPage",
			"operation": "insert"
		}
	},
	{
		"operation": "insert",
		"name": "SocialMessageDetailV2StandardDetail",
		"values": {
			"caption": "SocialMessageDetailCaptionCase_caption",
			"entitySchemaName": "SocialMessage",
			"showForVisibleModule": true,
			"filter": {
				"detailColumn": "EntityId",
				"masterColumn": "Id"
			},
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "CaseMessageHistoryStandardDetail",
		"values": {
			"caption": "CaseMessageHistoryDetailCaptionCase_caption",
			"entitySchemaName": "VwMobileCaseMessageHistory",
			"filter": {
				"detailColumn": "Case",
				"masterColumn": "Id"
			},
			"operation": "insert",
			"detailSchemaName": ""
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "ActivityDetailV2StandardDetail",
		"values": {
			"caption": "ActivityDetailV2StandardDetailCase_caption",
			"entitySchemaName": "Activity",
			"filter": {
				"detailColumn": "Case",
				"masterColumn": "Id"
			},
			"detailSchemaName": "ActivityDetailV2",
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "primaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Case",
			"caption": "primaryColumnSetCase_caption",
			"position": 0,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "6504b613-c2dc-462f-a5be-74a78da7aa5f",
		"values": {
			"row": 0,
			"content": "Number",
			"columnName": "Number",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "eb7aa2ba-48ab-40fc-afa0-7a5d2eb0214e",
		"values": {
			"row": 3,
			"content": "Registration date",
			"columnName": "RegisteredOn",
			"dataValueType": 7,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "effbcfdf-f36c-4934-a0f5-c092e502cf14",
		"values": {
			"row": 1,
			"content": "Subject",
			"columnName": "Subject",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "a80653b0-eb71-4aad-b289-a1915f8e4189",
		"values": {
			"row": 2,
			"content": "Status",
			"columnName": "Status",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "DescriptionColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Case",
			"caption": "DescriptionColumnSetCase_caption",
			"position": 1,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "7daed5a9-e977-4ae5-b227-17e0aa002d5e",
		"values": {
			"row": 0,
			"content": "Description",
			"columnName": "Symptoms",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "DescriptionColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "CaseProfileColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Case",
			"caption": "CaseProfileColumnSetCase_caption",
			"position": 2,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "37a0f3b0-28c4-4750-916d-242bd336c35a",
		"values": {
			"row": 0,
			"content": "Contact",
			"columnName": "Contact",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "CaseProfileColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "e8ee143c-629b-4f66-97b3-d1c04e82c687",
		"values": {
			"row": 1,
			"content": "Account",
			"columnName": "Account",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "CaseProfileColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "6ff9b56c-b3b8-40f0-b81f-13c9019b8683",
		"values": {
			"row": 2,
			"content": "Priority",
			"columnName": "Priority",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "CaseProfileColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "048019a0-3b80-42f2-ae24-c1bf6c9d7b5b",
		"values": {
			"row": 4,
			"content": "Assignee",
			"columnName": "Owner",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "CaseProfileColumnSet",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "eb9263d1-d752-444f-99a0-0ba01b018c73",
		"values": {
			"row": 3,
			"content": "Category",
			"columnName": "Category",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "CaseProfileColumnSet",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "CaseFilesDetail",
		"values": {
			"items": [],
			"rows": 1,
			"isDetail": true,
			"filter": {
				"detailColumn": "Case",
				"masterColumn": "Id"
			},
			"detailSchemaName": "FileDetailV2",
			"entitySchemaName": "CaseFile",
			"caption": "CaseRecordPageFilesDetailTitle",
			"detailType": "File",
			"generator": {
				"xclass": "Terrasoft.FileAndLinksEmbeddedDetailGenerator"
			},
			"displaySeparator": false,
			"businessRules": [],
			"maxRows": 3,
			"position": 3,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "51f4a138-4ace-404f-8650-bd6059f735dc",
		"values": {
			"row": 0,
			"content": "Data",
			"columnName": "Data",
			"dataValueType": 13,
			"displayColumn": "Name",
			"label": "MobileConstantsFileLabel",
			"placeHolder": "MobileConstantsFileLabel",
			"operation": "insert"
		},
		"parentName": "CaseFilesDetail",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "341bcbe0-772d-4f78-8549-c40882e54adb",
		"values": {
			"row": 1,
			"content": "Type",
			"columnName": "Type",
			"dataValueType": 10,
			"hidden": true,
			"operation": "insert"
		},
		"parentName": "CaseFilesDetail",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "d7829631-e4b7-4e31-ab9e-30a341066935",
		"values": {
			"row": 2,
			"content": "Name",
			"columnName": "Name",
			"dataValueType": 1,
			"label": "MobileConstantsLinkLabel",
			"placeHolder": "MobileConstantsLinkLabel",
			"viewType": "url",
			"operation": "insert"
		},
		"parentName": "CaseFilesDetail",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "OrderFileFileAndLinksEditPageVisibilityRule",
		"values": {
			"ruleType": "Terrasoft.FileAndLinksBusinessRule",
			"operation": "insert"
		},
		"parentName": "CaseFilesDetail",
		"propertyName": "businessRules",
		"index": 0
	}
]

