Terrasoft.configuration.Structures["MobileAccountRecordPageSettingsDefaultWorkplace"] = {innerHierarchyStack: ["MobileAccountRecordPageSettingsDefaultWorkplace"]};
[
	{
		"operation": "merge",
		"name": "settings",
		"values": {
			"localizableStrings": {
				"primaryColumnSetAccount_caption": "Основная информация",
				"ActivityDetailV2StandartDetailAccount_caption": "Активности",
				"AccountCommunicationDetailEmbeddedDetailAccount_caption": "Средства связи Контрагента",
				"AccountAddressDetailV2EmbeddedDetailAccount_caption": "Адреса Контрагента",
				"AccountAnniversaryDetailV2EmbeddedDetailAccount_caption": "Знаменательные события Контрагента",
				"AccountContactsDetailV2StandartDetailAccount_caption": "Контакты",
				"OpportunityDetailV2StandartDetailAccount_caption": "Продажи"
			}
		}
	},
	{
		"operation": "insert",
		"name": "OpportunityDetailV2StandartDetail",
		"values": {
			"caption": "OpportunityDetailV2StandartDetailAccount_caption",
			"entitySchemaName": "Opportunity",
			"filter": {
				"detailColumn": "Account",
				"masterColumn": "Id"
			},
			"detailSchemaName": "OpportunityDetailV2",
			"operation": "insert"
		},
		"parentName": "settings",
		"propertyName": "details",
		"index": 2
	}
]


