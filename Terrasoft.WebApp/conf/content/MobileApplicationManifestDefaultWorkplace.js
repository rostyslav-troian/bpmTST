Terrasoft.configuration.Structures["MobileApplicationManifestDefaultWorkplace"] = {innerHierarchyStack: ["MobileApplicationManifestDefaultWorkplaceMobile", "MobileApplicationManifestDefaultWorkplaceESN", "MobileApplicationManifestDefaultWorkplaceLead", "MobileApplicationManifestDefaultWorkplaceOpportunity", "MobileApplicationManifestDefaultWorkplaceCoreLeadOpportunity", "MobileApplicationManifestDefaultWorkplaceMarketingCampaignMobile", "MobileApplicationManifestDefaultWorkplace"]};



define('MobileApplicationManifestDefaultWorkplaceMobileResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
{
	"CustomSchemas": [
		"MobileActivityActionsUtilities",
		"MobileActivityCacheManager",
		"MobileSysAdminUnitCacheManager"
	],
	"SyncOptions": {
		"ModelDataImportConfig": [
			{
				"Name": "Activity",
				"SyncFilter": {
					"property": "Participant",
					"modelName": "ActivityParticipant",
					"assocProperty": "Activity",
					"operation": "Terrasoft.FilterOperations.Any",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUserContact"
				},
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "Activity",
					"items": {
						"ActivityParticipant": {
							"filterType": 5,
							"subFilters": {
								"logicalOperation": 0,
								"filterType": 6,
								"rootSchemaName": "ActivityParticipant",
								"items": {
									"detailedFilter": {
										"filterType": 1,
										"rightExpression": {
											"expressionType": 1,
											"functionType": 1,
											"macrosType": 2
										},
										"leftExpression": {
											"expressionType": 0,
											"columnPath": "Participant"
										},
										"comparisonType": 3
									}
								}
							},
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "[ActivityParticipant:Activity].Id"
							}
						}
					}
				},
				"ExpandLookups": true,
				"SyncColumns": [
					"Title",
					"StartDate",
					"DueDate",
					"Status",
					"Result",
					"DetailedResult",
					"ActivityCategory",
					"Priority",
					"Owner",
					"Account",
					"Contact",
					"ShowInScheduler",
					"Author",
					"Type",
					"AllowedResult",
					"ProcessElementId"
				]
			},
			{
				"Name": "ActivityParticipant",
				"SyncByParentObjectWithRights": "Activity",
				"HistoricalColumns": ["Activity.ModifiedOn"],
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "ActivityParticipant",
					"items": {
						"ActivityFilter": {
							"filterType": 5,
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "Activity.[ActivityParticipant:Activity].Id"
							},
							"subFilters": {
								"logicalOperation": 0,
								"filterType": 6,
								"rootSchemaName": "ActivityParticipant",
								"items": {
									"ParticipantFilter": {
										"filterType": 1,
										"comparisonType": 3,
										"leftExpression": {
											"expressionType": 0,
											"columnPath": "Participant"
										},
										"rightExpression": {
											"expressionType": 1,
											"functionType": 1,
											"macrosType": 2
										}
									}
								}
							}
						}
					}
				},
				"ExpandLookups": ["Participant"],
				"SyncColumns": [
					"Activity",
					"Participant",
					"Participant.Photo"
				]
			},
			{
				"Name": "ActivityCategoryResultEntry",
				"SyncColumns": [
					"ActivityResult",
					"ActivityCategory"
				]
			},
			{
				"Name": "ActivityCorrespondence",
				"SyncColumns": [
					"Activity",
					"IsDeleted",
					"SourceActivityId",
					"SourceAccount",
					"CreatedInBPMonline"
				]
			},
			{
				"Name": "Contact",
				"ExpandLookups": true,
				"RequiredDataFilter": {
					"filterType": 6,
					"rootSchemaName": "Contact",
					"logicalOperation": 0,
					"items": {
						"CurrentContact": {
							"filterType": 1,
							"comparisonType": 3,
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "Id"
							},
							"rightExpression": {
								"expressionType": 1,
								"functionType": 1,
								"macrosType": 2
							}
						}
					}
				},
				"SyncColumns": [
					"Name",
					"Account",
					"Department",
					"JobTitle",
					"Photo",
					"Job"
				]
			},
			{
				"Name": "ContactAddress",
				"SyncByParentObjectWithRights": "Contact",
				"SyncColumns": [
					"AddressType",
					"Country",
					"Region",
					"City",
					"Address",
					"Zip",
					"Contact",
					"Primary"
				]
			},
			{
				"Name": "ContactAnniversary",
				"SyncByParentObjectWithRights": "Contact",
				"SyncColumns": [
					"Date",
					"AnniversaryType",
					"Contact"
				]
			},
			{
				"Name": "ContactCommunication",
				"SyncByParentObjectWithRights": "Contact",
				"SyncColumns": [
					"Number",
					"CommunicationType",
					"Contact",
					"SearchNumber"
				]
			},
			{
				"Name": "Account",
				"ExpandLookups": true,
				"SyncColumns": [
					"Name",
					"PrimaryContact",
					"Industry",
					"GPSN",
					"GPSE",
					"Address",
					"Type",
					"AccountCategory"
				]
			},
			{
				"Name": "AccountAddress",
				"SyncByParentObjectWithRights": "Account",
				"SyncColumns": [
					"AddressType",
					"Country",
					"Region",
					"City",
					"Address",
					"Zip",
					"Account",
					"Primary"
				]
			},
			{
				"Name": "AccountAnniversary",
				"SyncByParentObjectWithRights": "Account",
				"SyncColumns": [
					"Date",
					"AnniversaryType",
					"Account"
				]
			},
			{
				"Name": "AccountCommunication",
				"SyncByParentObjectWithRights": "Account",
				"SyncColumns": [
					"Number",
					"CommunicationType",
					"Account"
				]
			},
			{
				"Name": "SysImage",
				"SyncFilter": {
					"property": "HasRef",
					"value": true
				},
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "SysImage",
					"items": {
						"ExistContactPhoto": {
							"filterType": 5,
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "[Contact:Photo].Id"
							},
							"subFilters": {
								"items": {},
								"logicalOperation": 0,
								"filterType": 6,
								"rootSchemaName": "Contact"
							}
						}
					}
				},
				"RequiredDataFilter": {
					"filterType": 6,
					"rootSchemaName": "SysImage",
					"logicalOperation": 0,
					"items": {
						"CurrentContact": {
							"filterType": 1,
							"comparisonType": 3,
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "[Contact:Photo].Id"
							},
							"rightExpression": {
								"expressionType": 1,
								"functionType": 1,
								"macrosType": 2
							}
						}
					}
				},
				"SyncColumns": [
					"Name",
					"HasRef",
					{
						"Name": "PreviewData",
						"UseRecordIdAsFileName": true,
						"ImportBinaryData": true
					}
				]
			},
			"FileType",
			{
				"Name": "Department",
				"SyncColumns": []
			},
			{
				"Name": "ActivityPriority",
				"SyncColumns": []
			},
			{
				"Name": "ActivityType",
				"SyncColumns": []
			},
			{
				"Name": "ActivityCategory",
				"SyncColumns": [
					"ActivityType"
				]
			},
			{
				"Name": "ActivityStatus",
				"SyncColumns": [
					"Finish"
				]
			},
			{
				"Name": "CommunicationType",
				"SyncColumns": [
					"UseforContacts",
					"UseforAccounts"
				]
			},
			{
				"Name": "AddressType",
				"SyncColumns": [
					"ForAccount",
					"ForContact"
				]
			},
			{
				"Name": "Country",
				"SyncColumns": []
			},
			{
				"Name": "Region",
				"SyncColumns": [
					"Country"
				]
			},
			{
				"Name": "City",
				"SyncColumns": [
					"Country",
					"Region"
				]
			},
			{
				"Name": "AnniversaryType",
				"SyncColumns": []
			},
			{
				"Name": "AccountIndustry",
				"SyncColumns": []
			},
			{
				"Name": "ActivityResult",
				"SyncColumns": [
					"Category"
				]
			},
			{
				"Name": "ActivityParticipantRole",
				"SyncColumns": [
					"Code"
				]
			},
			{
				"Name": "KnowledgeBase",
				"SyncColumns": [
					"Code",
					"Type"
				]
			},
			{
				"Name": "KnowledgeBaseType",
				"SyncColumns": [
					"Description"
				]
			},
			{
				"Name": "KnowledgeBaseFile",
				"SyncColumns": [
					"Notes",
					{
						"Name": "Data",
						"UseRecordIdAsFileName": false,
						"ImportBinaryData": true
					},
					"Type",
					"KnowledgeBase"
				]
			},
			{
				"Name": "Job",
				"SyncColumns": []
			},
			{
				"Name": "AccountType",
				"SyncColumns": []
			},
			{
				"Name": "AccountCategory",
				"SyncColumns": []
			}
		]
	},
	"Models": {
		"Activity": {
			"Grid": "MobileActivityGridPage",
			"Preview": "MobileActivityPreviewPage",
			"Edit": "MobileActivityEditPage",
			"RequireLookupColumnsModels": true,
			"RequiredModels": [
				"Activity",
				"Account",
				"ActivityCategory",
				"ActivityCategoryResultEntry",
				"ActivityPriority",
				"ActivityParticipant",
				"ActivityParticipantRole",
				"ParticipantResponse",
				"ActivityResult",
				"ActivityStatus",
				"ActivityType",
				"Contact",
				"SysImage",
				"SysAdminUnit",
				"ActivityCorrespondence",
				"FileType",
				"EmailSendStatus",
				"EmailType",
				"KnowledgeBase",
				"KnowledgeBaseType",
				"KnowledgeBaseFile",
				"CallDirection"
			],
			"ModelExtensions": [
				"MobileActivityModelConfig"
			],
			"PagesExtensions": [
				"MobileActivityRecordPageSettingsDefaultWorkplace",
				"MobileActivityGridPageSettingsDefaultWorkplace",
				"MobileActivityActionsSettingsDefaultWorkplace",
				"MobileActivityModuleConfig",
				"MobileActivityImportHelper",
				"MobileActivityGridPageDataV2",
				"MobileActivityGridPageViewV2",
				"MobileActivityGridPageControllerV2"
			]
		},
		"Contact": {
			"Preview": "MobileContactPreviewPage",
			"RequiredModels": [
				"Account",
				"Contact",
				"ContactCommunication",
				"CommunicationType",
				"Department",
				"ContactAddress",
				"AddressType",
				"Country",
				"Region",
				"City",
				"ContactAnniversary",
				"AnniversaryType",
				"Activity",
				"SysImage",
				"FileType",
				"ActivityPriority",
				"ActivityType",
				"ActivityCategory",
				"ActivityStatus",
				"Job"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"MobileContactRecordPageSettingsDefaultWorkplace",
				"MobileContactGridPageSettingsDefaultWorkplace",
				"MobileContactActionsSettingsDefaultWorkplace",
				"MobileContactModuleConfig"
			]
		},
		"Account": {
			"Preview": "MobileAccountPreviewPage",
			"RequiredModels": [
				"Account",
				"Contact",
				"AccountIndustry",
				"Activity",
				"AccountCommunication",
				"CommunicationType",
				"AccountAddress",
				"AccountAnniversary",
				"ActivityResult",
				"ActivityCategory",
				"ActivityPriority",
				"ActivityType",
				"ActivityStatus",
				"ActivityCategoryResultEntry",
				"AddressType",
				"AnniversaryType",
				"City",
				"Country",
				"Region",
				"SysImage",
				"FileType",
				"AccountType",
				"AccountCategory"
			],
			"ModelExtensions": [
				"MobileAccountModelConfig"
			],
			"PagesExtensions": [
				"MobileAccountRecordPageSettingsDefaultWorkplace",
				"MobileAccountGridPageSettingsDefaultWorkplace",
				"MobileAccountActionsSettingsDefaultWorkplace",
				"MobileAccountModuleConfig"
			]
		},
		"SysDashboard": {
			"CacheConfig": {
				"Disable": true
			},
			"RequiredModels": [
				"SysDashboard",
				"SysModule"
			]
		},
		"ContactAddress": {
			"ModelExtensions": [
				"MobileContactAddressModelConfig"
			]
		},
		"AccountAddress": {
			"ModelExtensions": [
				"MobileAccountAddressModelConfig"
			]
		},
		"ContactCommunication": {
			"ModelExtensions": [
				"MobileContactCommunicationModelConfig"
			]
		},
		"ContactAnniversary": {
			"ModelExtensions": [
				"MobileContactAnniversaryModelConfig"
			]
		},
		"AccountCommunication": {
			"ModelExtensions": [
				"MobileAccountCommunicationModelConfig"
			]
		},
		"AccountAnniversary": {
			"ModelExtensions": [
				"MobileAccountAnniversaryModelConfig"
			]
		},
		"ActivityParticipant": {
			"Grid": "MobileActivityParticipantGridPage",
			"ModelExtensions": [
				"MobileActivityParticipantModelConfig"
			],
			"PagesExtensions": [
				"MobileActivityParticipantGridPageView",
				"MobileActivityParticipantGridPageController",
				"MobileActivityParticipantModuleConfig"
			]
		},
		"KnowledgeBase": {
			"RequiredModels": [
				"KnowledgeBase",
				"KnowledgeBaseType",
				"FileType",
				"KnowledgeBaseFile"
			],
			"PagesExtensions": [
				"MobileKnowledgeBaseModuleConfig"
			]
		},
		"KnowledgeBaseType": {
			"RequiredModels": [
				"KnowledgeBaseType"
			]
		},
		"KnowledgeBaseFile": {
			"RequiredModels": [
				"KnowledgeBaseFile",
				"KnowledgeBaseType"
			],
			"ModelExtensions": [
				"MobileKnowledgeBaseFileModelConfig"
			]
		}
	}
}
define('MobileApplicationManifestDefaultWorkplaceESNResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
{
	"Modules": {
		"SocialMessage": {
			"Position": 4,
			"Hidden": false,
			"HiddenUIV1": true
		}
	}
}

define('MobileApplicationManifestDefaultWorkplaceLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
{
	"SyncOptions": {
		"ModelDataImportConfig": [
			{
				"Name": "Lead",
				"SyncColumns": [
					"Account",
					"Contact",
					"LeadName",
					"FullJobTitle",
					"Industry",
					"BusinesPhone",
					"MobilePhone",
					"Email",
					"Fax",
					"Website",
					"Address",
					"City",
					"Region",
					"Country",
					"Zip",
					"AddressType",
					"InformationSource",
					"Commentary",
					"Status",
					"LeadType",
					"Owner",
					"LeadMedium",
					"QualifyStatus",
					"CreatedOn"
				]
			},
			{
				"Name": "Contact",
				"SyncColumns": []
			},
			{
				"Name": "Account",
				"SyncColumns": []
			},
			{
				"Name": "LeadStatus",
				"SyncColumns": [
					"Active"
				]
			},
			{
				"Name": "Activity",
				"SyncColumns": [
					"Lead"
				]
			},
			{
				"Name": "ActivityParticipant",
				"SyncColumns": [
					"Activity",
					"Participant"
				]
			},
			{
				"Name": "ActivityParticipantRole",
				"SyncColumns": []
			},
			{
				"Name": "InformationSource",
				"SyncColumns": []
			},
			{
				"Name": "AccountIndustry",
				"SyncColumns": []
			},
			{
				"Name": "AddressType",
				"SyncColumns": []
			},
			{
				"Name": "Country",
				"SyncColumns": []
			},
			{
				"Name": "Region",
				"SyncColumns": []
			},
			{
				"Name": "City",
				"SyncColumns": []
			},
			{
				"Name": "LeadTypeStatus",
				"SyncColumns": []
			},
			{
				"Name": "QualifyStatus",
				"SyncColumns": []
			},
			{
				"Name": "ActivityPriority",
				"SyncColumns": []
			},
			{
				"Name": "ActivityType",
				"SyncColumns": []
			},
			{
				"Name": "ActivityCategory",
				"SyncColumns": []
			},
			{
				"Name": "ActivityStatus",
				"SyncColumns": []
			},
			{
				"Name": "LeadRegisterMethod",
				"SyncColumns": []
			},
			{
				"Name": "LeadType",
				"SyncColumns": []
			},
			{
				"Name": "LeadMedium",
				"SyncColumns": []
			}
		],
		"SysSettingsImportConfig": []
	},
	"Modules": {
		"Lead": {
			"Position": 3,
			"Hidden": false
		}
	},
	"Models": {
		"Account": {
			"RequiredModels": [
				"Lead"
			]
		},
		"Activity": {
			"PagesExtensions": [
				"MobileActivityRecordPageSettingsDefaultWorkplace",
				"MobileActivityLeadModuleConfig"
			],
			"ModelExtensions": []
		},
		"Lead": {
			"Preview": "MobileLeadPreviewPage",
			"ModelExtensions": [
				"MobileLeadModelConfig"
			],
			"PagesExtensions": [
				"MobileLeadRecordPageSettingsDefaultWorkplace",
				"MobileLeadGridPageSettingsDefaultWorkplace",
				"MobileLeadActionsSettingsDefaultWorkplace",
				"MobileLeadModuleConfig"
			],
			"RequiredModels": [
				"Lead",
				"LeadMedium",
				"QualifyStatus",
				"LeadTypeStatus",
				"LeadRegisterMethod"
			]
		}
	}
}
define('MobileApplicationManifestDefaultWorkplaceOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
{
	"CustomSchemas": [
		"MobileLookupGridOpportunityPageConfig",
		"MobileOpportunityUtilities"
	],
	"SyncOptions": {
		"SysSettingsImportConfig": [],
		"ModelDataImportConfig": [
			{
				"Name": "Account",
				"SyncColumns": []
			},
			{
				"Name": "Opportunity",
				"SyncFilter": {
					"property": "Owner",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUserContact"
				},
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "Opportunity",
					"items": {
						"OwnerCurrentUser": {
							"filterType": 1,
							"rightExpression": {
								"expressionType": 1,
								"functionType": 1,
								"macrosType": 2
							},
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "Owner"
							},
							"comparisonType": 3
						}
					}
				},
				"SyncColumns": [
					"Title",
					"Type",
					"Stage",
					"Account",
					"Amount",
					"Probability",
					"Budget",
					"Owner",
					"Contact",
					"Mood",
					"DueDate",
					"LeadType"
				]
			},
			{
				"Name": "OpportunityType",
				"SyncColumns": []
			},
			{
				"Name": "OpportunityStage",
				"SyncColumns": [
					"End",
					"MaxProbability",
					"Number"
				]
			},
			{
				"Name": "Activity",
				"SyncColumns": [
					"Opportunity"
				]
			},
			{
				"Name": "OpportunityContact",
				"SyncByParentObjectWithRights": "Opportunity",
				"SyncFilter": {
					"property": "Opportunity.Owner",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUserContact"
				},
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "OpportunityContact",
					"items": {
						"OpportunityOwnerCurrentUser": {
							"filterType": 1,
							"rightExpression": {
								"expressionType": 1,
								"functionType": 1,
								"macrosType": 2
							},
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "Opportunity.Owner"
							},
							"comparisonType": 3
						}
					}
				},
				"SyncColumns": [
					"Opportunity",
					"Contact",
					"IsMainContact",
					"Role",
					"Influence",
					"ContactMotivator",
					"ContactLoyality"
				]
			},
			{
				"Name": "Contact",
				"SyncColumns": []
			},
			{
				"Name": "OppContactRole",
				"SyncColumns": []
			},
			{
				"Name": "OppContactInfluence",
				"SyncColumns": []
			},
			{
				"Name": "OppContactLoyality",
				"SyncColumns": [
					"Position"
				]
			},
			{
				"Name": "OpportunityProductInterest",
				"SyncByParentObjectWithRights": "Opportunity",
				"SyncColumns": [
					"Opportunity",
					"Product",
					"OfferResult",
					"Quantity",
					"OfferDate",
					"Comment"
				]
			},
			{
				"Name": "Product",
				"SyncColumns": []
			},
			{
				"Name": "PropositionResult",
				"SyncColumns": []
			},
			{
				"Name": "FileType",
				"SyncColumns": []
			},
			{
				"Name": "OpportunityFile",
				"SyncByParentObjectWithRights": "Opportunity",
				"SyncColumns": [
					"Opportunity",
					"Type",
					"Data",
					"Size",
					"Name"
				],
				"SyncFilter": {
					"property": "Opportunity.Owner",
					"valueIsMacros": true,
					"value": "Terrasoft.ValueMacros.CurrentUserContact"
				},
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "OpportunityFile",
					"items": {
						"OpportunityOwnerCurrentUser": {
							"filterType": 1,
							"rightExpression": {
								"expressionType": 1,
								"functionType": 1,
								"macrosType": 2
							},
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "Opportunity.Owner"
							},
							"comparisonType": 3
						}
					}
				}
			},
			{
				"Name": "OpportunityOfferResult",
				"SyncColumns": []
			},
			{
				"Name": "OpportunityProbability",
				"SyncColumns": []
			},
			{
				"Name": "ActivityPriority",
				"SyncColumns": []
			},
			{
				"Name": "ActivityType",
				"SyncColumns": []
			},
			{
				"Name": "ActivityCategory",
				"SyncColumns": []
			},
			{
				"Name": "ActivityStatus",
				"SyncColumns": [
					"Finish"
				]
			},
			{
				"Name": "ActivityParticipant",
				"SyncColumns": [
					"Activity",
					"Participant"
				]
			},
			{
				"Name": "ActivityParticipantRole",
				"SyncColumns": []
			},
			{
				"Name": "AccountCommunication",
				"SyncColumns": []
			},
			{
				"Name": "CommunicationType",
				"SyncColumns": []
			},
			{
				"Name": "AccountAddress",
				"SyncColumns": []
			},
			{
				"Name": "AddressType",
				"SyncColumns": []
			},
			{
				"Name": "Country",
				"SyncColumns": []
			},
			{
				"Name": "Region",
				"SyncColumns": []
			},
			{
				"Name": "City",
				"SyncColumns": []
			},
			{
				"Name": "AccountAnniversary",
				"SyncColumns": []
			},
			{
				"Name": "AnniversaryType",
				"SyncColumns": []
			},
			{
				"Name": "OpportunityMood",
				"SyncColumns": []
			},
			{
				"Name": "LeadType",
				"SyncColumns": []
			}
		]
	},
	"Modules": {
		"Opportunity": {
			"Position": 5,
			"Hidden": false
		}
	},
	"Models": {
		"Account": {
			"PagesExtensions": [
				"MobileAccountRecordPageSettingsDefaultWorkplace"
			]
		},
		"Activity": {
			"ModelExtensions": [
				"MobileActivityOpportunityModelConfig"
			],
			"PagesExtensions": [
				"MobileActivityRecordPageSettingsDefaultWorkplace",
				"MobileActivityOpportunityModuleConfig"
			]
		},
		"Opportunity": {
			"Preview": "MobileOpportunityPreviewPage",
			"Edit": "MobileOpportunityEditPage",
			"ModelExtensions": [
				"MobileOpportunityModelConfig"
			],
			"PagesExtensions": [
				"MobileOpportunityRecordPageSettingsDefaultWorkplace",
				"MobileOpportunityGridPageSettingsDefaultWorkplace",
				"MobileOpportunityActionsSettingsDefaultWorkplace",
				"MobileOpportunityModuleConfig"
			],
			"RequiredModels": [
				"Opportunity",
				"Account",
				"Contact",
				"OpportunityStage",
				"OpportunityMood",
				"OpportunityType",
				"LeadType",
				"OpportunityContact",
				"OppContactRole",
				"OppContactInfluence",
				"OppContactLoyality",
				"OpportunityProductInterest",
				"Product",
				"PropositionResult",
				"OpportunityFile"
			]
		},
		"OpportunityContact": {
			"ModelExtensions": [
				"MobileOpportunityContactModelConfig"
			],
			"RequiredModels": [
				"OpportunityContact",
				"Opportunity",
				"Contact",
				"OpportunityType",
				"OpportunityStage",
				"OpportunityProbability"
			]
		},
		"OpportunityProductInterest": {
			"ModelExtensions": [
				"MobileOpportunityProductInterestModelConfig"
			]
		},
		"SysDashboard": {
			"PagesExtensions": [
				"MobileDashboardPageConfig"
			]
		}
	}
}
define('MobileApplicationManifestDefaultWorkplaceCoreLeadOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
{
	"SyncOptions": {
		"ModelDataImportConfig": [
			{
				"Name": "LeadType",
				"SyncColumns": []
			}
		]
	},
	"Modules": {},
	"Models": {
		"Opportunity": {
			"RequiredModels": [
				"LeadType"
			]
		}
	}
}
define('MobileApplicationManifestDefaultWorkplaceMarketingCampaignMobileResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
{
	"SyncOptions": {
		"SysSettingsImportConfig": [],
		"ModelDataImportConfig": [
			{
				"Name": "ContactCommunication",
				"SyncColumns": [
					"NonActual"
				]
			}
		]
	},
	"Modules": {},
	"Models": {
		"Contact": {
			"PagesExtensions": [
				"MarketingCampaignMobileContactModuleConfig"
			]
		}
	}
}
{
	"CustomSchemas": [
		"MobileCaseCss",
		"MobileCaseUtilities"
	],
	"SyncOptions": {
		"SysSettingsImportConfig": [
			"CaseStatusDef",
			"CasePriorityDef",
			"CaseOriginDef",
			"CaseServiceLevelDef",
			"MobileDefaultCaseOrigin"
		],
		"ModelDataImportConfig": [
			{
				"Name": "Case",
				"ExpandLookups": true,
				"SyncColumns": [
					"Number",
					"RegisteredOn",
					"Subject",
					"Status",
					"Symptoms",
					"Owner",
					"Priority",
					"Account",
					"Contact",
					"Category",
					"Group"
				],
				"SyncFilter": {
					"type": "Terrasoft.FilterTypes.Group",
					"logicalOperation": "Terrasoft.FilterLogicalOperations.And",
					"subfilters": [
						{
							"compareType": "Terrasoft.ComparisonTypes.GreaterOrEqual",
							"property": "RegisteredOn",
							"valueIsMacros": true,
							"value": "Terrasoft.ValueMacros.CurrentDate",
							"macrosParams": {
								"datePart": "d",
								"value": -30
							}
						},
						{
							"type": "Terrasoft.FilterTypes.Group",
							"logicalOperation": "Terrasoft.FilterLogicalOperations.Or",
							"subfilters": [
								{
									"property": "Owner",
									"compareType": "Terrasoft.ComparisonTypes.Equal",
									"valueIsMacros": true,
									"value": "Terrasoft.ValueMacros.CurrentUserContact"
								},
								{
									"property": "Owner",
									"compareType": "Terrasoft.ComparisonTypes.NotEqual",
									"isNot": true,
									"value": null
								}
							]
						},
						{
							"type": "Terrasoft.FilterTypes.Group",
							"logicalOperation": "Terrasoft.FilterLogicalOperations.Or",
							"subfilters": [
								{
									"compareType": "Terrasoft.ComparisonTypes.GreaterOrEqual",
									"property": "RegisteredOn",
									"valueIsMacros": true,
									"value": "Terrasoft.ValueMacros.CurrentDate",
									"macrosParams": {
										"datePart": "d",
										"value": -7
									}
								},
								{
									"property": "Status.IsFinal",
									"value": false
								}
							]
						}
					]
				},
				"QueryFilter": {
					"logicalOperation": 0,
					"filterType": 6,
					"rootSchemaName": "Case",
					"items": {
						"RegistredOnPrevious30Days": {
							"filterType": 1,
							"rightExpression": {
								"expressionType": 1,
								"functionType": 1,
								"macrosType": 25,
								"functionArgument": {
									"expressionType": 2,
									"parameter": {
										"dataValueType": 4,
										"value": 30
									}
								}
							},
							"leftExpression": {
								"expressionType": 0,
								"columnPath": "RegisteredOn"
							},
							"comparisonType": 8,
							"trimDateTimeParameterToDate": true
						},
						"OwnerFilter": {
							"logicalOperation": 1,
							"filterType": 6,
							"rootSchemaName": "Case",
							"items": {
								"OwnerCurrentUser": {
									"filterType": 1,
									"rightExpression": {
										"expressionType": 1,
										"functionType": 1,
										"macrosType": 2
									},
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "Owner"
									},
									"comparisonType": 3
								},
								"OwnerEmpty": {
									"filterType": 2,
									"isNull": true,
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "Owner"
									}
								}
							}
						},
						"ActualStateFilter": {
							"logicalOperation": 1,
							"filterType": 6,
							"rootSchemaName": "Case",
							"items": {
								"RegistredOnPrevious7Days": {
									"filterType": 1,
									"rightExpression": {
										"expressionType": 1,
										"functionType": 1,
										"macrosType": 25,
										"functionArgument": {
											"expressionType": 2,
											"parameter": {
												"dataValueType": 4,
												"value": 7
											}
										}
									},
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "RegisteredOn"
									},
									"comparisonType": 8,
									"trimDateTimeParameterToDate": true
								},
								"StatusNotFinal": {
									"filterType": 1,
									"rightExpression": {
										"expressionType": 2,
										"parameter": {
											"dataValueType": 12,
											"value": false
										}
									},
									"leftExpression": {
										"expressionType": 0,
										"columnPath": "Status.IsFinal"
									},
									"comparisonType": 3
								}
							}
						}
					}
				}
			},
			{
				"Name": "CaseStatus",
				"SyncColumns": [
					"Name",
					"IsFinal"
				]
			},
			{
				"Name": "CasePriority",
				"SyncColumns": []
			},
			{
				"Name": "CaseOrigin",
				"SyncColumns": []
			},
			{
				"Name": "CaseFile",
				"SyncByParentObjectWithRights": "Case",
				"SyncColumns": [
					"Case",
					"Type",
					"Data",
					"Size"
				]
			},
			{
				"Name": "VwMobileCaseMessageHistory",
				"SyncByParentObjectWithRights": "Case",
				"SyncColumns": [
					"OwnerName",
					"OwnerPhoto",
					"Message",
					"MessageNotifier",
					"RecordId",
					"HasAttachment",
					"Case",
					"Id",
					"Recepient"
				]
			},
			{
				"Name": "MessageNotifier",
				"SyncColumns": [
					"Name",
					"Description"
				]
			},
			{
				"Name": "Activity",
				"SyncColumns": [
					"Case"
				]
			},
			{
				"Name": "CaseCategory",
				"SyncColumns": []
			}
		]
	},
	"Modules": {
		"Case": {
			"Group": "main",
			"Model": "Case",
			"Position": 3,
			"isStartPage": false,
			"Title": "CaseSectionTitle",
			"Hidden": false
		}
	},
	"Models": {
		"Case": {
			"Grid": "MobileCaseGridPage",
			"Preview": "MobileCasePreviewPage",
			"Edit": "MobileCaseEditPage",
			"CacheConfig": {
				"AssociatedModels": [
					"VwMobileCaseMessageHistory"
				]
			},
			"RequiredModels": [
				"Case",
				"CaseStatus",
				"CasePriority",
				"CaseOrigin",
				"SocialMessage",
				"Contact",
				"Account",
				"CaseFile",
				"FileType",
				"KnowledgeBase",
				"KnowledgeBaseFile",
				"VwMobileCaseMessageHistory",
				"Activity",
				"CaseCategory"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"MobileCaseActionsSettingsDefaultWorkplace",
				"MobileCaseGridPageSettingsDefaultWorkplace",
				"MobileCaseRecordPageSettingsDefaultWorkplace",
				"MobileCaseModuleConfig",
				"MobileCaseModelConfig",
				"MobileCaseGridPageView",
				"MobileCaseGridPageController",
				"MobileCasePreviewPageView",
				"MobileCasePreviewPageController",
				"MobileCaseEditPageView",
				"MobileCaseEditPageController"
			]
		},
		"VwMobileCaseMessageHistory": {
			"Grid": "MobileCaseMessageHistoryGridPage",
			"Preview": "MobileCaseMessageHistoryPreviewPage",
			"RequiredModels": [
				"Case",
				"MessageNotifier",
				"VwMobileCaseMessageHistory"
			],
			"ModelExtensions": [],
			"PagesExtensions": [
				"MobileCaseMessageHistoryActionsSettingsDefaultWorkplace",
				"MobileCaseMessageHistoryGridPageSettingsDefaultWorkplace",
				"MobileCaseMessageHistoryRecordPageSettingsDefaultWorkplace",
				"MobileCaseMessageHistoryModuleConfig",
				"MobileCaseMessageHistoryGridPageView",
				"MobileCaseMessageHistoryGridPageController"
			]
		}
	}
}

