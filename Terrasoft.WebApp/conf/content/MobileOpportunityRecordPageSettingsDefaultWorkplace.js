Terrasoft.configuration.Structures["MobileOpportunityRecordPageSettingsDefaultWorkplace"] = {innerHierarchyStack: ["MobileOpportunityRecordPageSettingsDefaultWorkplace"]};
[
	{
		"operation": "insert",
		"name": "settings",
		"values": {
			"entitySchemaName": "Opportunity",
			"settingsType": "RecordPage",
			"localizableStrings": {
				"primaryColumnSetOpportunity_caption": "General information",
				"OpportunityContactDetailV2EmbeddedDetailOpportunity_caption": "Contact in opportunity",
				"OpportunityProductDetailV2EmbeddedDetailOpportunity_caption": "Products in opportunity",
				"ActivityDetailV2StandartDetailOpportunity_caption": "Activities",
				"SocialMessageDetailCaptionContact_caption": "Feed",
				"OpportunityFilesDetail_caption": "Attachments"
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
			"entitySchemaName": "Opportunity",
			"caption": "primaryColumnSetOpportunity_caption",
			"operation": "insert",
			"position": 0
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "8fd9f972-1f28-4e6c-85aa-c39577c4feed",
		"values": {
			"row": 0,
			"content": "Name",
			"columnName": "Title",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "b4cd4085-4bcd-48ba-b3a5-a872f2793618",
		"values": {
			"row": 5,
			"content": "Stage",
			"columnName": "Stage",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "a59acd35-36db-4aaa-a5e3-bf1dae5caf3a",
		"values": {
			"row": 3,
			"content": "Account",
			"columnName": "Account",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "26b511b5-d89c-40b5-8597-a4323fb64037",
		"values": {
			"row": 2,
			"content": "Type",
			"columnName": "Type",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "d666c758-35a7-4950-be33-33868a8711cf",
		"values": {
			"row": 6,
			"content": "Budget",
			"columnName": "Budget",
			"dataValueType": 5,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "0b12c775-304b-4680-9579-c987de143b3d",
		"values": {
			"row": 7,
			"content": "Probability, %",
			"columnName": "Probability",
			"dataValueType": 4,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 5
	},
	{
		"operation": "insert",
		"name": "31b26701-9e5a-4541-a937-78b256faf292",
		"values": {
			"row": 8,
			"content": "Opportunity amount",
			"columnName": "Amount",
			"dataValueType": 5,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 6
	},
	{
		"operation": "insert",
		"name": "1851abdc-44ca-4ba2-93b9-bc19b3c2e70f",
		"values": {
			"row": 4,
			"content": "Contact",
			"columnName": "Contact",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 7
	},
	{
		"operation": "insert",
		"name": "8b6dccfd-ea9c-4535-8bdf-5c1e47a11cde",
		"values": {
			"row": 1,
			"content": "Customer need",
			"columnName": "LeadType",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "primaryColumnSet",
		"propertyName": "items",
		"index": 8
	},
	{
		"operation": "insert",
		"name": "OpportunityContactDetailV2EmbeddedDetail",
		"values": {
			"items": [],
			"rows": 1,
			"isDetail": true,
			"filter": {
				"detailColumn": "Opportunity",
				"masterColumn": "Id"
			},
			"detailSchemaName": "OpportunityContactDetailV2",
			"entitySchemaName": "OpportunityContact",
			"caption": "OpportunityContactDetailV2EmbeddedDetailOpportunity_caption",
			"operation": "insert",
			"position": 1
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "cf7a4666-284c-4b1c-95cb-e0477f9999a0",
		"values": {
			"row": 0,
			"content": "Contact",
			"columnName": "Contact",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "OpportunityContactDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "c9618733-23c7-4517-b21d-66e99e25fd49",
		"values": {
			"row": 1,
			"content": "Role",
			"columnName": "Role",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "OpportunityContactDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "d7b2eeea-ac81-444a-875b-9e9a2185e51b",
		"values": {
			"row": 2,
			"content": "Influence",
			"columnName": "Influence",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "OpportunityContactDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "9ab8f512-a02a-4e74-b31a-e400c442dcf3",
		"values": {
			"row": 3,
			"content": "Decision-making factors",
			"columnName": "ContactMotivator",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "OpportunityContactDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "19239235-5ea5-4556-9270-5db9fec93484",
		"values": {
			"row": 4,
			"content": "Loyalty",
			"columnName": "ContactLoyality",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "OpportunityContactDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "76b9fde2-9914-4558-8ae6-2570c648eb63",
		"values": {
			"row": 5,
			"content": "Primary contact",
			"columnName": "IsMainContact",
			"dataValueType": 12,
			"operation": "insert"
		},
		"parentName": "OpportunityContactDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 5
	},
	{
		"operation": "insert",
		"name": "OpportunityProductDetailV2EmbeddedDetail",
		"values": {
			"items": [],
			"rows": 1,
			"isDetail": true,
			"filter": {
				"detailColumn": "Opportunity",
				"masterColumn": "Id"
			},
			"detailSchemaName": "OpportunityProductDetailV2",
			"entitySchemaName": "OpportunityProductInterest",
			"caption": "OpportunityProductDetailV2EmbeddedDetailOpportunity_caption",
			"operation": "insert",
			"position": 2
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "106af797-1974-4dc3-901e-de7629fc2d66",
		"values": {
			"row": 0,
			"content": "Product",
			"columnName": "Product",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "OpportunityProductDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "74205444-93e1-4034-a7ef-7e1ba831358a",
		"values": {
			"row": 1,
			"content": "Quantity",
			"columnName": "Quantity",
			"dataValueType": 5,
			"operation": "insert"
		},
		"parentName": "OpportunityProductDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "31dcc0dd-0c5a-4284-89ab-e52563dc3a53",
		"values": {
			"row": 2,
			"content": "Quoted on",
			"columnName": "OfferDate",
			"dataValueType": 8,
			"operation": "insert"
		},
		"parentName": "OpportunityProductDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "5ddcc9d1-c79f-4bb2-ab04-8b34b77a5155",
		"values": {
			"row": 3,
			"content": "Interest",
			"columnName": "OfferResult",
			"dataValueType": 10,
			"operation": "insert"
		},
		"parentName": "OpportunityProductDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "a66b41b3-3d71-4e49-99f5-932adc973e88",
		"values": {
			"row": 4,
			"content": "Notes",
			"columnName": "Comment",
			"dataValueType": 1,
			"operation": "insert"
		},
		"parentName": "OpportunityProductDetailV2EmbeddedDetail",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "opportunityFilesDetail",
		"values": {
			"items": [],
			"rows": 1,
			"isDetail": true,
			"filter": {
				"detailColumn": "Opportunity",
				"masterColumn": "Id"
			},
			"detailSchemaName": "FileDetailV2",
			"entitySchemaName": "OpportunityFile",
			"caption": "OpportunityFilesDetail_caption",
			"detailType": "File",
			"generator": {
				"xclass": "Terrasoft.FileAndLinksEmbeddedDetailGenerator"
			},
			"maxRows": 3,
			"businessRules": [],
			"position": 3,
			"operation": "insert",
			"displaySeparator": false
		},
		"parentName": "settings",
		"propertyName": "columnSets",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "32ec511a-02cb-4d3f-ba34-7695cc935846",
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
		"parentName": "opportunityFilesDetail",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "36f10314-65d7-4347-b8d5-bd86f00145c3",
		"values": {
			"row": 1,
			"content": "Type",
			"columnName": "Type",
			"dataValueType": 10,
			"hidden": true,
			"operation": "insert"
		},
		"parentName": "opportunityFilesDetail",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "5af6caf5-7609-4fc1-bc10-17ef1472b15a",
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
		"parentName": "opportunityFilesDetail",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "OpportunityFileFileAndLinksEditPageVisibilityRule",
		"values": {
			"ruleType": "Terrasoft.FileAndLinksBusinessRule",
			"operation": "insert"
		},
		"parentName": "opportunityFilesDetail",
		"propertyName": "businessRules",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "ActivityDetailV2StandartDetail",
		"values": {
			"caption": "ActivityDetailV2StandartDetailOpportunity_caption",
			"entitySchemaName": "Activity",
			"filter": {
				"detailColumn": "Opportunity",
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

