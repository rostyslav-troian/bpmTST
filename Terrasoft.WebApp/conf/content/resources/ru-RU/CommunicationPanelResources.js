define("CommunicationPanelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ESNFeedMenuHint: "\u041B\u0435\u043D\u0442\u0430",
		NotificationsMenuHint: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
		VisaMenuHint: "\u0412\u0438\u0437\u044B",
		MenuItemIconNameTemplate: "{0}Menu{1}{2}Icon",
		CloseRightSidePanel: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C",
		CtiPanelMenuHint: "\u0417\u0432\u043E\u043D\u043A\u0438",
		EmailMenuHint: "Email",
		CenterNotificationMenuHint: "\u0426\u0435\u043D\u0442\u0440 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439",
		CommunicationPanelTip: "\u003Cspan class=\u0022tip-header\u0022\u003E\u041A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C\u003C\/span\u003E\u003Cbr\u003E\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0439\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043D\u044B\u0435 \u0437\u0432\u043E\u043D\u043A\u0438, \u0440\u0430\u0431\u043E\u0442\u0430\u0439\u0442\u0435 \u0441 \u043F\u043E\u0447\u0442\u043E\u0439, \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0439\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0443\u044E \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u0435\u0442\u044C\u003Cbr\u003E\u003Ca href=\u0022#\u0022 data-context-help-id=\u00221011\u0022 \u003E\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435\u003C\/a\u003E",
		ESNNotificationMenuHint: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043B\u0435\u043D\u0442\u044B",
		ProcessDashboardMenuHint: "\u0417\u0430\u0434\u0430\u0447\u0438 \u043F\u043E \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u043C"
	};
	var localizableImages = {
		ESNFeedMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNFeedMenuIcon",
				hash: "b39c4f8bb64ba7695ada326e06822eb8",
				resourceItemExtension: ".png"
			}
		},
		ESNFeedMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNFeedMenuPressedIcon",
				hash: "c5bbc43cbfaa12542b7a86e7fa5fcd21",
				resourceItemExtension: ".png"
			}
		},
		ESNFeedMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNFeedMenuCounterIcon",
				hash: "799f7f1485880e670cb7c3c27718b205",
				resourceItemExtension: ".png"
			}
		},
		ESNFeedMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNFeedMenuPressedCounterIcon",
				hash: "b7e8144315e5889e2d1cf3ac0e91b4fb",
				resourceItemExtension: ".png"
			}
		},
		NotificationsMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "NotificationsMenuIcon",
				hash: "e68a99c63135621a6ef57c402bc3d51d",
				resourceItemExtension: ".png"
			}
		},
		NotificationsMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "NotificationsMenuPressedIcon",
				hash: "08b1824e869f35d055d69afe5f4489f7",
				resourceItemExtension: ".png"
			}
		},
		NotificationsMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "NotificationsMenuCounterIcon",
				hash: "aa37f5a5795b9e747b4dac9412b809ec",
				resourceItemExtension: ".png"
			}
		},
		NotificationsMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "NotificationsMenuPressedCounterIcon",
				hash: "fe8f98c0fe5fa4d52e60e4df320a4568",
				resourceItemExtension: ".png"
			}
		},
		VisaMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "VisaMenuIcon",
				hash: "0d65ffad9180362e433743361950b0c4",
				resourceItemExtension: ".png"
			}
		},
		VisaMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "VisaMenuPressedIcon",
				hash: "7e88418785a8dd250f9eabcb185289be",
				resourceItemExtension: ".png"
			}
		},
		VisaMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "VisaMenuCounterIcon",
				hash: "a792671d1884a86cee052c426d15758e",
				resourceItemExtension: ".png"
			}
		},
		VisaMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "VisaMenuPressedCounterIcon",
				hash: "851702c7bcb60295718f930e21d516db",
				resourceItemExtension: ".png"
			}
		},
		CtiPanelMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuIcon",
				hash: "989b99388d3b596eec130687bdc2edc2",
				resourceItemExtension: ".png"
			}
		},
		CtiPanelMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuPressedIcon",
				hash: "f4e24874f77c47068c52d6cc2ee72e69",
				resourceItemExtension: ".png"
			}
		},
		CtiPanelMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuCounterIcon",
				hash: "0af8df26f0b2e39ec2064e1e6367234f",
				resourceItemExtension: ".png"
			}
		},
		CtiPanelMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuPressedCounterIcon",
				hash: "3adcbafff129548c69871fc32ae02bc7",
				resourceItemExtension: ".png"
			}
		},
		ImageCloseRightSidePanelButton: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ImageCloseRightSidePanelButton",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		CtiPanelMenuCallDurationIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuCallDurationIcon",
				hash: "a277cc68292d51a13a9aa22e9c13a38e",
				resourceItemExtension: ".png"
			}
		},
		CtiPanelMenuCallDurationPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuCallDurationPressedIcon",
				hash: "19c3b485714b28d3c6fcbd7178fc2188",
				resourceItemExtension: ".png"
			}
		},
		EmailMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "EmailMenuIcon",
				hash: "bc124740d7383378dae738163de891df",
				resourceItemExtension: ".png"
			}
		},
		EmailMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "EmailMenuPressedIcon",
				hash: "4f44fda1120e64da8eea4f36f9126df4",
				resourceItemExtension: ".png"
			}
		},
		EmailMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "EmailMenuCounterIcon",
				hash: "799f7f1485880e670cb7c3c27718b205",
				resourceItemExtension: ".png"
			}
		},
		EmailMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "EmailMenuPressedCounterIcon",
				hash: "b7e8144315e5889e2d1cf3ac0e91b4fb",
				resourceItemExtension: ".png"
			}
		},
		CenterNotificationMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CenterNotificationMenuIcon",
				hash: "dc84c7c5c4966dd4d28972d100196821",
				resourceItemExtension: ".png"
			}
		},
		CenterNotificationMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CenterNotificationMenuPressedIcon",
				hash: "c85d4b26e9c2b7d0c9f1483d3b0a005a",
				resourceItemExtension: ".png"
			}
		},
		CenterNotificationMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CenterNotificationMenuCounterIcon",
				hash: "ecfa2e04c6269411c2eb8023f35952e2",
				resourceItemExtension: ".png"
			}
		},
		CenterNotificationMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CenterNotificationMenuPressedCounterIcon",
				hash: "1bff012f6aef4c6f2218a0520cfa985d",
				resourceItemExtension: ".png"
			}
		},
		ESNFeedMenuIconSVG: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNFeedMenuIconSVG",
				hash: "c08430f39d4395399647618cc38cf020",
				resourceItemExtension: ".svg"
			}
		},
		NotificationsMenuIconSVG: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "NotificationsMenuIconSVG",
				hash: "d0a350614ce1e3b2c3a6c661069674dd",
				resourceItemExtension: ".svg"
			}
		},
		EmailMenuIconSVG: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "EmailMenuIconSVG",
				hash: "717ca6940c20c7f5441e0fd282dc4981",
				resourceItemExtension: ".svg"
			}
		},
		CenterNotificationMenuIconSVG: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CenterNotificationMenuIconSVG",
				hash: "d0a350614ce1e3b2c3a6c661069674dd",
				resourceItemExtension: ".svg"
			}
		},
		CtiPanelMenuIconSVG: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "CtiPanelMenuIconSVG",
				hash: "657881e32cadf5e84f06ac208bc381fd",
				resourceItemExtension: ".svg"
			}
		},
		ESNNotificationMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNNotificationMenuIcon",
				hash: "dc84c7c5c4966dd4d28972d100196821",
				resourceItemExtension: ".png"
			}
		},
		ESNNotificationMenuPressedIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNNotificationMenuPressedIcon",
				hash: "c85d4b26e9c2b7d0c9f1483d3b0a005a",
				resourceItemExtension: ".png"
			}
		},
		ESNNotificationMenuCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNNotificationMenuCounterIcon",
				hash: "ecfa2e04c6269411c2eb8023f35952e2",
				resourceItemExtension: ".png"
			}
		},
		ESNNotificationMenuPressedCounterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ESNNotificationMenuPressedCounterIcon",
				hash: "1bff012f6aef4c6f2218a0520cfa985d",
				resourceItemExtension: ".png"
			}
		},
		ProcessDashboardMenuIconSVG: {
			source: 3,
			params: {
				schemaName: "CommunicationPanel",
				resourceItemName: "ProcessDashboardMenuIconSVG",
				hash: "934f8eafafd89571a6a37dd70db12542",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});