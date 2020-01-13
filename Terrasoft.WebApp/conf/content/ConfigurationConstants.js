Terrasoft.configuration.Structures["ConfigurationConstants"] = {innerHierarchyStack: ["ConfigurationConstants"]};
define("ConfigurationConstants", ["ConfigurationConstantsResources"], function(resources) {
	var localizableStrings = resources.localizableStrings;
	var activity = {
		ActivitySchemaUId: "c449d832-a4cc-4b01-b9d5-8a12c42a9f89",
		ActivityResult: {
			Completed: "632AFDD2-F616-4EA6-87D2-8ED38EED8AFF",
			Canceled: "FC7D2E5E-F36B-1410-6698-00155D043204"
		},
		Type: {
			Task: "fbe0acdc-cfc0-df11-b00f-001d60e938c6",
			Email: "e2831dec-cfc0-df11-b00f-001d60e938c6",
			Call: "e1831dec-cfc0-df11-b00f-001d60e938c6",
			Visit: "e3831dec-cfc0-df11-b00f-001d60e938c6"
		},
		ActivityCategory: {
			DoIt: "f51c4643-58e6-df11-971b-001d60e938c6",
			Email: "8038a396-7825-e011-8165-00155d043204",
			Call: "e52bd583-7825-e011-8165-00155d043204",
			CallAsCategory: "03df85bf-6b19-4dea-8463-d5d49b80bb28", //obsolete constant
			CallAsTask: "03df85bf-6b19-4dea-8463-d5d49b80bb28",
			Meeting: "42c74c49-58e6-df11-971b-001d60e938c6",
			PaperWork: "2365ae4f-58e6-df11-971b-001d60e938c6"
		},
		ActivityCallDirection: {
			Incoming: "1d96a65f-2131-4916-8825-2d142b1000b2",
			Outgoing: "53f71b5f-7e17-4cf5-bf14-6a59212db422"
		},
		ResultCategory: {
			Neutral: "4fd40914-23a7-415d-bb56-14fed5092551",
			Fail: "4db33cbc-ba7c-4103-9887-6b39b8d36b77"
		},
		Status: {
			NotStarted: "384d4b84-58e6-df11-971b-001d60e938c6",
			Cancel: "201cfba8-58e6-df11-971b-001d60e938c6",
			Done: "4bdbb88f-58e6-df11-971b-001d60e938c6",
			InProgress: "394d4b84-58e6-df11-971b-001d60e938c6"
		},
		EmailSendStatus: {
			NotSended: "20c0c460-6107-e011-a646-16d83cab0980",
			Sended: "8074ffc0-6107-e011-a646-16d83cab0980"
		},
		MessageType: {
			Incoming: "7f9d1f86-f36b-1410-068c-20cf30b39373",
			Outgoing: "7f6d3f94-f36b-1410-068c-20cf30b39373"
		},
		ParticipantRole: {
			From: "6a6390c4-a6e1-df11-971b-001d60e938c6",
			To: "3a6893ce-a6e1-df11-971b-001d60e938c6",
			CC: "3c6893ce-a6e1-df11-971b-001d60e938c6",
			BCC: "ba1a7add-a6e1-df11-971b-001d60e938c6",
			Participant: "1a8324e8-a6e1-df11-971b-001d60e938c6",
			Responsible: "53fc4a92-b0ea-e111-96c4-00165d094c12",
			DraftFrom: "81ab75e9-133b-4c12-8878-8bf9ae555992"
		},
		ParticipantInviteResponse: {
			Confirmed: "7098c892-34e3-4a3e-af08-c1a139f63220",
			Declined: "cc256758-4051-4021-9c51-216e37635c46",
			InDoubt: "50e89724-522d-446e-be91-12548b8c834d"
		}
	};

	var opportunity = {
		CloseReason: {
			DefeatedRival: "e45a0188-5be6-df11-971b-001d60e938c6"
		},
		Stage: {
			DeterminationOfPotential: "c2067b11-0ee0-df11-971b-001d60e938c6",
			PreparingQuotation: "241ade6b-4256-4947-ba8a-7d96988a97b6",
			PresentationQuotation: "423774cb-5ae6-df11-971b-001d60e938c6",
			RejectedByUs: "736f54fd-e240-46f8-8c7c-9066c30aff59",
			TranslationIntoAnotherProcess: "9abf243c-fc00-45cf-8E28-cdb66c9208b0",
			FinishedWithLoss: "a9aafdfe-2242-4f42-8cd5-2ae3b9556d79"
		},
		Type: {
			PartnerSale: "c4505efc-6cf5-4b0c-b984-55076bc235f0"
		}
	};

	var adresses = {
		ForContact: [{
			value: "4f8b2d67-71d0-45fb-897e-cd4a308a97c0",
			displayValue: localizableStrings.HomeAddress
		}, {
			value: "760bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.ShippingAddress
		}],
		ForAccount: [{
			value: "760bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.ShippingAddress
		}, {
			value: "770bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.LegalAddress
		}, {
			value: "780bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.ActualAddress
		}]
	};

	var addressTypes = {
		Delivery: {
			value: "760bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.ShippingAddress
		},
		Home: {
			value: "4f8b2d67-71d0-45fb-897e-cd4a308a97c0",
			displayValue: localizableStrings.ContactPhone
		},
		Legal: {
			value: "770bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.LegalAddress
		},
		Actual: {
			value: "780bf68c-4b6e-df11-b988-001d60e938c6",
			displayValue: localizableStrings.ActualAddress
		}
	};

	var communicationTypes = {
		Facebook: "2795dd03-bacf-e011-92c3-00155d04c01d",
		LinkedIn: "ea0f3b0a-bacf-e011-92c3-00155d04c01d",
		Google: "efe5d7a2-5f38-e111-851e-00155d04c01d",
		Twitter: "e7139487-bad3-e011-92c3-00155d04c01d",
		Phone: "3dddb3cc-53ee-49c4-a71f-e9e257f59e49",
		MainPhone: "6a3fb10c-67cc-df11-9b2a-001d60e938c6",
		AdditionalPhone: "2b387201-67cc-df11-9b2a-001d60e938c6",
		MobilePhone: "d4a2dc80-30ca-df11-9b2a-001d60e938c6",
		HomePhone: "0da6a26b-d7bc-df11-b00f-001d60e938c6",
		InnerPhone: "e9d91e45-8d92-4e38-95a0-ef8aa28c9e7a",
		Fax: "9a7ab41b-67cc-df11-9b2a-001d60e938c6",
		Web: "6a8ba927-67cc-df11-9b2a-001d60e938c6",
		Email: "ee1c85c3-cfcb-df11-9b2a-001d60e938c6",
		Skype: "09e4bda6-cfcb-df11-9b2a-001d60e938c6"
	};

	var socialNetworksCommunicationTypes = [
		communicationTypes.Facebook,
		communicationTypes.LinkedIn,
		communicationTypes.Google,
		communicationTypes.Twitter
	];
	var phonesCommunicationTypes = [
		communicationTypes.Phone,
		communicationTypes.MobilePhone,
		communicationTypes.HomePhone,
		communicationTypes.MainPhone,
		communicationTypes.AdditionalPhone,
		communicationTypes.Fax
	];

	var communications = {
		UseForContacts: {
			Predefined: {
				Phone: {
					displayValue: localizableStrings.ContactPhone,
					value: "3dddb3cc-53ee-49c4-a71f-e9e257f59e49"
				},
				MobilePhone: {
					displayValue: localizableStrings.MobilePhone,
					value: "d4a2dc80-30ca-df11-9b2a-001d60e938c6"
				},
				HomePhone: {
					displayValue: localizableStrings.HomePhone,
					value: "0da6a26b-d7bc-df11-b00f-001d60e938c6"
				},
				Skype: {
					displayValue: localizableStrings.Skype,
					value: "09e4bda6-cfcb-df11-9b2a-001d60e938c6"
				},
				Email: {
					displayValue: localizableStrings.Email,
					value: "ee1c85c3-cfcb-df11-9b2a-001d60e938c6"
				}
			},
			Socials: {
				Facebook: {
					displayValue: localizableStrings.Facebook,
					value: "2795dd03-bacf-e011-92c3-00155d04c01d"
				},
				LinkedIn: {
					displayValue: localizableStrings.LinkedIn,
					value: "ea0f3b0a-bacf-e011-92c3-00155d04c01d"
				},
				Twitter: {
					displayValue: localizableStrings.Twitter,
					value: "e7139487-bad3-e011-92c3-00155d04c01d"
				}
			},
			Other: {
				Web: {
					displayValue: localizableStrings.Web,
					value: "6a8ba927-67cc-df11-9b2a-001d60e938c6"
				},
				Fax: {
					displayValue: localizableStrings.Fax,
					value: "9a7ab41b-67cc-df11-9b2a-001d60e938c6"
				}
			}
		},
		UseForAccounts: {
			Predefined: {
				Phone: {
					displayValue: localizableStrings.AccountPhone,
					value: "6a3fb10c-67cc-df11-9b2a-001d60e938c6"
				},
				AdditionalPhone: {
					displayValue: localizableStrings.AdditionalPhone,
					value: "2b387201-67cc-df11-9b2a-001d60e938c6"
				},
				Fax: {
					displayValue: localizableStrings.Fax,
					value: "9a7ab41b-67cc-df11-9b2a-001d60e938c6"
				},
				Web: {
					displayValue: localizableStrings.Web,
					value: "6a8ba927-67cc-df11-9b2a-001d60e938c6"
				}
			},
			Socials: {
				Facebook: {
					displayValue: localizableStrings.Facebook,
					value: "2795dd03-bacf-e011-92c3-00155d04c01d"
				},
				LinkedIn: {
					displayValue: localizableStrings.LinkedIn,
					value: "ea0f3b0a-bacf-e011-92c3-00155d04c01d"
				},
				Twitter: {
					displayValue: localizableStrings.Twitter,
					value: "e7139487-bad3-e011-92c3-00155d04c01d"
				}
			},
			Other: {
				Email: {
					displayValue: localizableStrings.Email,
					value: "ee1c85c3-cfcb-df11-9b2a-001d60e938c6"
				},
				Web: {
					displayValue: localizableStrings.Web,
					value: "6a8ba927-67cc-df11-9b2a-001d60e938c6"
				},
				Fax: {
					displayValue: localizableStrings.Fax,
					value: "9a7ab41b-67cc-df11-9b2a-001d60e938c6"
				},
				Phone: {
					displayValue: localizableStrings.AccountPhone,
					value: "6a3fb10c-67cc-df11-9b2a-001d60e938c6"
				},
				AdditionalPhone: {
					displayValue: localizableStrings.AdditionalPhone,
					value: "2b387201-67cc-df11-9b2a-001d60e938c6"
				}
			}
		}
	};

	var communication = {
		"Email": "ea350dd6-66cc-df11-9b2a-001d60e938c6",
		"Phone": "e037f25a-d7bc-df11-b00f-001d60e938c6",
		"Skype": "cae7d7c9-66cc-df11-9b2a-001d60e938c6",
		"SMS": "a09511b4-13f0-e011-a86b-00155d04c01d",
		"SocialNetwork": "ba75f995-aebe-e011-bc15-00155d04c01b",
		"Web": "cadd142e-4b2d-e011-ac0a-00155d043205"
	};

	var contactType = {
		Contact: "806732ee-f36b-1410-a883-16d83cab0980",
		Client: "00783ef6-f36b-1410-a883-16d83cab0980",
		Employee: "60733efc-f36b-1410-a883-16d83cab0980"
	};

	var document = {
		Type: {
			Contract: "39b28624-98e6-df11-971b-001d60e938c6",
			Act: "61f7a573-52e6-df11-971b-001d60e938c6",
			Correspondence: "2cb5cac1-1523-e011-a94a-00155d043204"
		},
		Status: {
			Plans: "0226b053-52e6-df11-971b-001d60e938c6",
			Underway: "09ee1344-52e6-df11-971b-001d60e938c6",
			Registred: "7e7f1202-f46b-1410-c686-0026185bfcd3"
		}
	};

	var lead = {
		Status: {
			New: "bd3511f8-f36b-1410-4493-1c6f65e16a07",
			QualifiedAsNew: "7d372f02-f46b-1410-4593-1c6f65e16a07",
			QualifiedAsExisting: "7d3f3116-f46b-1410-4693-1c6f65e16a07",
			QualifiedAsLost: "fd3d301e-f46b-1410-4693-1c6f65e16a07",
			QualifiedAsNoConnection: "7d3d1124-f46b-1410-4693-1c6f65e16a07",
			QualifiedAsNotInterested: "3db90f2a-f46b-1410-4693-1c6f65e16a07"
		}
	};

	var fileType = {
		File: "529bc2f8-0ee0-df11-971b-001d60e938c6",
		Link: "539bc2f8-0ee0-df11-971b-001d60e938c6",
		EntityLink: "549bc2f8-0ee0-df11-971b-001d60e938c6"
	};

	var folder = {
		Type: {
			Search: "65ca0946-0084-4874-b117-c13199af3b95",
			General: "9dc5f6e6-2a61-4de8-a059-de30f4e74f24",
			Recent: "c01ffb44-7407-e011-a646-16d83cab0980",
			RootEmail: "6e23fa26-5bee-e011-a86b-00155d04c01d",
			Duplicates: "10794494-d2dd-e011-92c3-00155d04c01d",
			SubEmail: "b97a5836-1cd0-e111-90c6-00155d054c03",
			MailBox: "99c2351c-f0f8-e111-9dba-00155d051801",
			Favorite: "80c0c97d-51a7-4e32-a89e-d5f827705be4"
		}
	};

	var dashboard = {
		Type: {
			OpportunityByCategory: "06586cdc-8e74-4732-a58a-89764054676c",
			AwaitingPayment: "317c0b3b-8874-4b0c-acc0-02792f24b8db",
			ActivityByOpportunityStage: "e29c6a10-405a-4e1e-9813-972a06e05986",
			OverdueActivities: "e29c6a10-405a-4e1e-9813-962a06e05986"
		}
	};

	var sysAdminUnit = {
		Id: {
			SysAdministrators: "83a43ebc-f36b-1410-298d-001e8c82bcad",
			AllEmployees: "a29a3ba5-4b0d-de11-9a51-005056c00008",
			PortalUsers: "720b771c-e7a7-4f31-9cfb-52cd21c3739f",
			PRMPortalUsers: "9827231b-d14a-4a41-b6bd-876ae68b7381"
		},
		Type: {
			Organisation: 0,
			Department: 1,
			Manager: 2,
			Team: 3,
			User: 4,
			SSPUser: 5,
			FuncRole: 6
		},
		TypeGuid: {
			Organisation: "df93dcb9-6bd7-df11-9b2a-001d60e938c6",
			Department: "b659f1c0-6bd7-df11-9b2a-001d60e938c6",
			Manager: "b759f1c0-6bd7-df11-9b2a-001d60e938c6",
			Team: "462e97c7-6bd7-df11-9b2a-001d60e938c6",
			User: "472e97c7-6bd7-df11-9b2a-001d60e938c6",
			SSPUser: "f4044c41-df2b-e111-851e-00155d04c01d",
			FuncRole: "625aca96-0293-4ab4-b7b1-37c9a6a42fed"
		},
		ConnectionType: {
			AllEmployees: 0,
			PortalUsers: 1
		},
		ConnectionTypeGuid: {
			AllEmployees: "df8ff7a2-c9bf-4f28-80b1-ed16fa77818d",
			PortalUsers: "4ad0e44a-6502-4499-984c-f626d12c6301",
			Virtual: "e96a0adf-3e4f-47f9-81c3-e8628eab55f0"
		},
		SysLicType: {
			Personal: 0,
			Competitive: 1,
			Server: 2
		}
	};

	var userType = {
		GENERAL: 0,
		SSP: 1,
		VIRTUAL: 2
	};

	var sysProcess = {
		Status: {
			Inactive: "67700d9c-28ac-46ef-9037-b81a53b7b330",
			Running: "ed2ae277-b6e2-df11-971b-001d60e938c6",
			Performed: "ed2ae277-b6e2-df11-971b-001d60e938c6",
			Completed: "815c9586-b6e2-df11-971b-001d60e938c6",
			Error: "f942c08d-b6e2-df11-971b-001d60e938c6",
			Canceled: "1be78f3e-234d-4d6a-869a-dc07253fd2f3"
		},
		Status2: {
			Inactive: {value: "67700d9c-28ac-46ef-9037-b81a53b7b330"},
			Running: {value:"ed2ae277-b6e2-df11-971b-001d60e938c6"},
			Performed: {value: "ed2ae277-b6e2-df11-971b-001d60e938c6"},
			Completed: {value: "815c9586-b6e2-df11-971b-001d60e938c6"},
			Error: {value: "f942c08d-b6e2-df11-971b-001d60e938c6"},
			Canceled: {
				value: "1be78f3e-234d-4d6a-869a-dc07253fd2f3",
				displayValue: localizableStrings.SysProcessStatusCanceled
			}
		},
		BusinessProcessTag: "Business Process"
	};

	var sysProcessStatus = {
		Error: 3
	};

	var communicationType = {
		Email: "EE1C85C3-CFCB-DF11-9B2A-001D60E938C6",
		Google: "efe5d7a2-5f38-e111-851e-00155d04c01d"
	};

	var contactFolder = {
		All: "F35A1295-DCA5-DF11-831A-001D60E938C6"
	};

	var emailFolder = {
		Root: "181F9D34-5DEE-E011-A86B-00155D04C01D"
	};

	var entitySchemaQuery = {
		ColumnKeySplitter: "#"
	};

	var aggregationType = {
		sum: "9baf22e6-f36b-1410-3890-00059a3c7800",
		count: "de9f12a4-f36b-1410-3590-00059a3c7800"
	};

	var processLog = {
		sysProcessLogViewPageId: "fc771f06-fa62-4782-9b01-b858e86266f3"
	};

	var visaStatus = {
		positive: {
			displayValue: localizableStrings.PositiveVisaStatus,
			value: "e79facb3-3c32-43e7-a59e-12ba125e6132"
		},
		negative: {
			displayValue: localizableStrings.NegativeVisaStatus,
			value: "a93ab0b9-ca36-4b95-9b23-e01aa169c338"
		}
	};

	var PackageUId = {
		Platform: "3218E5EC-25C1-472B-9DE0-1673E071A79F"
	};

	var ESN = {
		SocialChannelSchemaUId: "dd74c060-eb4b-4f15-b381-db91ca5ac483"
	};

	var sysSchema = {
		EmailTemplate: "93030575-f70f-4041-902e-c4badaf62c63",
		EmailTemplateFile: "564F83F0-60F1-4DA5-9D44-97FA61B3FBAF",
		ActivityFile: "080C9917-7EC9-42E5-86FF-75A683D4F124",
		Account: "25d7c1ab-1de0-4501-b402-02e0e5a72d6e",
		Contact: "16be3651-8fe2-4159-8dd0-a803d4683dd3",
		AddressType: "50837bfc-43ff-466b-94bb-de0847eecd1b",
		CommunicationType: "d846cb4f-f18d-469e-83ff-e961f3fba873"
	};

	var sysCulture = {
		RUS: "1A778E3F-0A8E-E111-84A3-00155D054C03",
		ENU: "A5420246-0A8E-E111-84A3-00155D054C03"
	};

	var buildType = {
		Public: "e45eb864-59cc-4325-8276-d85e1ba90c95",
		Internal: "D2FB88FB-4AB5-47F6-9F9C-07BA15D95436"
	};

	var fileSystemTypes = {
		Temporary: "temporary",
		Persistent: "persistent"
	};

	var supplyPayment = {
		FromPlan: "6fc58059-9c4a-4481-8775-bbadf4a4ad51",
		FromFact: "eeada309-2ce7-413c-8b66-e984242a4d22",
		Fixed: "b664126f-211f-44a1-acd8-6d9d8a1601c7",
		StateFinished: "e9eb323c-b1ed-4b4b-8dd9-414ad95075d3",
		TypeSupply: "e6d0464d-ef2d-467e-bd73-816b8fab764f"
	};

	var accountType = {
		Client: "03A75490-53E6-DF11-971B-001D60E938C6",
		Partner: "F2C0CE97-53E6-DF11-971B-001D60E938C6",
		Contractor: "F3C0CE97-53E6-DF11-971B-001D60E938C6",
		Provider: "D34B9DA2-53E6-DF11-971B-001D60E938C6",
		Competitor: "D44B9DA2-53E6-DF11-971B-001D60E938C6",
		OurCompany: "57412FAD-53E6-DF11-971B-001D60E938C6"
	};

	var contractType = {
		Contract: "42B49A15-1D6C-4FA3-B24A-45711BA90CB3",
		SubAgreement: "4AD8D1D2-8D39-4B54-8017-AFEC75DCD9C3",
		Act: "392753BA-CF2C-4BF8-B679-8F9AEF4B1C14"
	};

	var contextHelp = {
		StaticFolderHelpPageId: 1066,
		StaticFolderHelpPageCode: "StaticFolder"
	};

	var defaultHomeModule = "IntroPage";

	var defaultPortalHomeModule = "PortalMainPageModule/";

	var relationType = {
		HeadCompany: "1ed655f3-5fe6-df11-971b-001d60e938c6",
		Subsidiary: "fb3a75d3-5fe6-df11-971b-001d60e938c6"
	};

	var columnImage = {
		Contact: "880a6888-1b05-4b56-b665-f6bd9385cfbe",
		Account: "b5cbd10f-32ce-4ac3-bb01-7a9eef7b66e4"
	};

	var anniversaryType = {
		"Birthday": "173d56d2-fdca-df11-9b2a-001d60e938c6"
	};

	var reminding = {
		Reminding: "9EE66ABE-EC9D-4667-8995-29E8765DE2D5",
		Notification: "685E7149-C015-4A4D-B4A6-2E5625A6314C",
		Anniversary: "5D4B76F0-953C-4F91-A8A4-B85DF935074F",
		Visa: "F52CEADC-026C-4955-893B-CC0F5621C1DA"
	};

	var notificationGroup = {
		All: "",
		Reminding: "Reminding",
		Notification: "Notification",
		Anniversary: "Anniversary",
		Visa: "Visa",
		EsnNotification: "ESNNotification"
	};

	var forecast = {
		SchemaName: "Forecast"
	};

	var multiDeleteDeniedType = {
		"Exception": "fef4ae85-b169-400e-bdec-0e364d99f2ef",
		"DbOperationException": "65a865a0-bd76-494e-98af-9f85461b1032",
		"SecurityException": "21f32b26-3e01-44eb-a792-42911ae83b2b",
		"EntityUsedByProcessException": "e2525e1a-4f13-4ccf-b122-0c587949e11a"
	};

	var applicationPage = {
		ExcelImport: "/ViewPage.aspx?Id=c2af7f54-07df-4670-9c2b-af2497d3231f",
		ObjectRightsManagement: "/ViewPage.aspx?Id=5e5f9a9e-aa7d-407d-9e1e-1c24c3f9b59a&" +
		"ActiveTabId=PageContainer_34d8ed7df8e8e011837600155d04c01d_fe571096f36b14102781485b39b2edcc_" +
		"99ea5ea6447249a39dfa660296bb4674"
	};

	var multiDelete = {
		"MultiDeleteLocalStorageKey": "MultiDeleteOperationId",
		"MultiDeleteWebsocketSender": "MultiDelete",
		"MultiDeleteSandboxMessageName": "MultiDeleteStateChange",
		RecordState: {
			WAIT: 1,
			PROGRESS: 2,
			ERROR: 3,
			DONE: 4,
			CANCELED: 5
		}
	};

	var commandLineHintType = {
		Macros: 1,
		Command: 2,
		Synonym: 3
	};

	var moduleStructure = {
		DefaultSectionModule: "SectionModuleV2",
		DefaultSectionSchemaSuffix: "SectionV2"
	};

	var summaryModule = {
		ProfileKeyTemplate: "Section-{0}-MainGrid-Summary"
	};

	return {
		AccountType: accountType,
		Activity: activity,
		Addresses: adresses,
		AddressTypes: addressTypes,
		AggregationType: aggregationType,
		CommunicationTypes: communicationTypes,
		SocialNetworksCommunicationTypes: socialNetworksCommunicationTypes,
		PhonesCommunicationTypes: phonesCommunicationTypes,
		CommunicationType: communicationType,
		Communications: communications,
		Communication: communication,
		ContactFolder: contactFolder,
		ContactType: contactType,
		Dashboard: dashboard,
		Document: document,
		EmailFolder: emailFolder,
		EntitySchemaQuery: entitySchemaQuery,
		FileType: fileType,
		Folder: folder,
		Lead: lead,
		Opportunity: opportunity,
		ProcessLog: processLog,
		UserType: userType,
		SysAdminUnit: sysAdminUnit,
		SysProcess: sysProcess,
		SysProcessStatus: sysProcessStatus,
		VisaStatus: visaStatus,
		PackageUId: PackageUId,
		ESN: ESN,
		SysSchema: sysSchema,
		SysCulture: sysCulture,
		BuildType: buildType,
		FileSystemTypes: fileSystemTypes,
		SupplyPayment: supplyPayment,
		ContractType: contractType,
		ContextHelp: contextHelp,
		DefaultHomeModule: defaultHomeModule,
		DefaultPortalHomeModule: defaultPortalHomeModule,
		RelationType: relationType,
		ColumnImage: columnImage,
		AnniversaryType: anniversaryType,
		Reminding: reminding,
		Forecast: forecast,
		MultiDeleteDeniedType: multiDeleteDeniedType,
		MultiDelete: multiDelete,
		ApplicationPage: applicationPage,
		NotificationGroup: notificationGroup,
		CommandLineHintType: commandLineHintType,
		ModuleStructure: moduleStructure,
		SummaryModule: summaryModule
	};
});


