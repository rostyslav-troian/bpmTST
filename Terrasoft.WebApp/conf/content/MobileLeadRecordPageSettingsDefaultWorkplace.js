Terrasoft.configuration.Structures["MobileLeadRecordPageSettingsDefaultWorkplace"] = {innerHierarchyStack: ["MobileLeadRecordPageSettingsDefaultWorkplace"]};
[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "Lead",
			"settingsType": "RecordPage",
			"localizableStrings": {
				"primaryColumnSetLead_caption": "General information",
				"communicationColumnSetLead_caption": "Communication options",
				"addressColumnSetLead_caption": "Address",
				"secondaryColumnSetLead_caption": "Additional",
				"ActivityDetailV2StandartDetailLead_caption": "Activities",
				"SocialMessageDetailCaptionContact_caption": "Feed"
			},
			"columnSets": [],
			"operation": "insert",
			"details": []
		}
	},
	{
		"operation": "insert",
		"name": "primaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Lead",
			"caption": "primaryColumnSetLead_caption",
			"operation": "insert",
			"position": 0
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "6264ce02-9ee1-413c-8475-3902d24a167e",
		"values": {
			"row": 2,
			"content": "Account name",
			"columnName": "Account",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "2df7b7a9-f8f2-4141-8ecd-915e1a5c7794",
		"values": {
			"row": 1,
			"content": "Contact name",
			"columnName": "Contact",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "afcc9902-2e96-4076-85a7-d1da98dc51f8",
		"values": {
			"row": 0,
			"content": "Customer need",
			"columnName": "LeadType",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "communicationColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Lead",
			"caption": "communicationColumnSetLead_caption",
			"operation": "insert",
			"position": 1
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "ddceaf42-523e-4404-90e7-44ed11f39680",
		"values": {
			"row": 0,
			"content": "Business phone",
			"columnName": "BusinesPhone",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "communicationColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "0e056565-8dfd-4f8c-9096-faa627e631e5",
		"values": {
			"row": 1,
			"content": "Mobile phone",
			"columnName": "MobilePhone",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "communicationColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "eb894ec2-7b2f-4832-93ef-f8597cde6e4c",
		"values": {
			"row": 2,
			"content": "Email",
			"columnName": "Email",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "communicationColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "514eaa97-a2d2-4a8e-bfb2-ca231218b3fd",
		"values": {
			"row": 3,
			"content": "Fax",
			"columnName": "Fax",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "communicationColumnSet",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "d86bf5a0-e08f-4d7b-889f-975bec7eb96b",
		"values": {
			"row": 4,
			"content": "Web",
			"columnName": "Website",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "communicationColumnSet",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "addressColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Lead",
			"caption": "addressColumnSetLead_caption",
			"operation": "insert",
			"position": 2
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "bc9a884b-96e9-46ca-b0f1-e6a716b1be82",
		"values": {
			"row": 0,
			"content": "Street",
			"columnName": "Address",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "addressColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "655ed28c-52a1-499b-9095-6f8252e3f66c",
		"values": {
			"row": 1,
			"content": "City",
			"columnName": "City",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "addressColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "59943a3f-4bd1-413e-8a7e-51d260de4131",
		"values": {
			"row": 2,
			"content": "State/province",
			"columnName": "Region",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "addressColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "ff700554-5fc9-4fb9-9a98-7a791ed0435e",
		"values": {
			"row": 3,
			"content": "Country",
			"columnName": "Country",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "addressColumnSet",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "f4d2f981-93ff-427e-9b8c-8984ddab8761",
		"values": {
			"row": 4,
			"content": "ZIP/postal code",
			"columnName": "Zip",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "addressColumnSet",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "b5174eda-b28f-4215-91ee-7c3f90400fc6",
		"values": {
			"row": 5,
			"content": "Address type",
			"columnName": "AddressType",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "addressColumnSet",
		"propertyName": "items",
		"index": 5
	},
	{
		"operation": "insert",
		"name": "secondaryColumnSet",
		"values": {
			"items": [],
			"rows": 1,
			"entitySchemaName": "Lead",
			"caption": "secondaryColumnSetLead_caption",
			"operation": "insert",
			"position": 3
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "f8131da8-5f48-47f7-acdf-d48a95df8068",
		"values": {
			"row": 0,
			"content": "Information source",
			"columnName": "InformationSource",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "secondaryColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "28aacb4c-9a83-4c78-a389-ccddde1b7332",
		"values": {
			"row": 2,
			"content": "Notes",
			"columnName": "Commentary",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "secondaryColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "97bea8dc-a90e-447c-8adf-e4f0a33780b5",
		"values": {
			"row": 1,
			"content": "Industry",
			"columnName": "Industry",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "secondaryColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "ActivityDetailV2StandartDetail",
		"values": {
			"caption": "ActivityDetailV2StandartDetailLead_caption",
			"entitySchemaName": "Activity",
			"filter": {
				"detailColumn": "Lead",
				"masterColumn": "Id"
			},
			"detailSchemaName": "ActivityDetailV2",
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "SocialMessageDetailV2StandartDetail",
		"values": {
			"caption": "SocialMessageDetailCaptionContact_caption",
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
		"index": 1
	}
]


