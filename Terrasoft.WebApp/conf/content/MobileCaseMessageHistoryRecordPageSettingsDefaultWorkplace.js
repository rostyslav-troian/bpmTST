Terrasoft.configuration.Structures["MobileCaseMessageHistoryRecordPageSettingsDefaultWorkplace"] = {innerHierarchyStack: ["MobileCaseMessageHistoryRecordPageSettingsDefaultWorkplace"]};

[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "VwMobileCaseMessageHistory",
			"details": [],
			"columnSets": [],
			"localizableStrings": {
				"primaryColumnSetCaseMessageHistory_caption": "General information"
			},
			"settingsType": "RecordPage",
			"operation": "insert"
		}
	},
	{
		"operation": "insert",
		"name": "primaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "VwMobileCaseMessageHistory",
			"caption": "primaryColumnSetCaseMessageHistory_caption",
			"position": 0,
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "Message",
		"values": {
			"row": 0,
			"content": "Message",
			"columnName": "Message",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	}
]

