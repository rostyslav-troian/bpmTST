define("BaseIntroPageSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ButtonCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438",
		BannerCaption: "\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u044F",
		BannerHint: "\u0432\u0438\u0434\u0435\u043E, \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F, \u0442\u0435\u0441\u0442\u044B \u043F\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u0435",
		MobileAppCaption: "\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F",
		AndroidUrl: "https:\/\/play.google.com\/store\/apps\/details?id=com.bpmonline.mobile70",
		IosUrl: "https:\/\/itunes.apple.com\/us\/app\/bpmonline-mobile-7\/id708432450?mt=8",
		LinkedInUrl: "https:\/\/linkedin.bpmonline.com",
		GoogleUrl: "https:\/\/plus.google.com\/u\/0\/116164135679912261451\/posts",
		TwitterUrl: "https:\/\/twitter.bpmonline.com",
		FacebookUrl: "https:\/\/facebook.bpmonline.com",
		YoutubeUrl: "https:\/\/youtube.bpmonline.com",
		SdkCaption: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043F\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 Creatio",
		CommunityCaption: "\u041D\u0430\u0439\u0442\u0438 \u043E\u0442\u0432\u0435\u0442\u044B",
		CommunityUrl: "http:\/\/www.community.terrasoft.ru\/",
		CommunityLabel: "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E",
		WindowsUrl: "http:\/\/www.windowsphone.com\/ru-ru\/store\/app\/bpm-online-mobile-7\/759b1001-6e8d-42a4-a668-031ee6a23b81",
		SocialAccountsCaption: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438",
		AndroidLabel: "Google play",
		IosLabel: "App Store",
		WindowsLabel: "Windows store",
		AcademyCaption: "\u0412\u0438\u0434\u0435\u043E\u043A\u0443\u0440\u0441\u044B. \u0422\u0440\u0435\u043D\u0438\u043D\u0433\u0438. \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		MarketplaceCaption: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0439 \u0438 \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432",
		MarketplaceUrl: "https:\/\/marketplace.terrasoft.ru\/",
		MarketplaceLabel: "Marketplace",
		GettingStartedCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443",
		GettingStartedLabel: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0441\u0442\u0430\u0440\u0442",
		GettingStartedUrl: "https:\/\/academy.terrasoft.ru\/getting-started"
	};
	var localizableImages = {
		TwitterIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "TwitterIcon",
				hash: "43ef41cba1450cadf1eb65f93a7b0d25",
				resourceItemExtension: ".svg"
			}
		},
		FacebookIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "FacebookIcon",
				hash: "27130fdf43a9e78bf3f36e626a3e1781",
				resourceItemExtension: ".svg"
			}
		},
		GoogleIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "GoogleIcon",
				hash: "b2c07233caac08d4f65769e921a4d232",
				resourceItemExtension: ".svg"
			}
		},
		YoutubeIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "YoutubeIcon",
				hash: "16f3900d772354c3ce0af6c68f0c5226",
				resourceItemExtension: ".svg"
			}
		},
		LinkedinIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "LinkedinIcon",
				hash: "76b4011e0b60d2e1c264706026ba938f",
				resourceItemExtension: ".svg"
			}
		},
		AcademyBanner: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "AcademyBanner",
				hash: "b34cc15228761c3274d07b3c4a906382",
				resourceItemExtension: ".svg"
			}
		},
		Arrow: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "Arrow",
				hash: "c23876260284897a31b25a1d37eeaf45",
				resourceItemExtension: ".png"
			}
		},
		playBtn: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "playBtn",
				hash: "d0b9ed0adb16bd51facb13c3bd92b555",
				resourceItemExtension: ".png"
			}
		},
		playBtnActive: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "playBtnActive",
				hash: "5225f87b6257a3dd4a411ebf44702bd9",
				resourceItemExtension: ".png"
			}
		},
		AndroidIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "AndroidIcon",
				hash: "385d1b4f9e6d5d385239801b140a8c09",
				resourceItemExtension: ".svg"
			}
		},
		IosIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "IosIcon",
				hash: "83443f1c07e583d16de6a799b8a8dd54",
				resourceItemExtension: ".svg"
			}
		},
		CommunityIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "CommunityIcon",
				hash: "d4e1e0d9b779b248a17771e7f80aa52c",
				resourceItemExtension: ".svg"
			}
		},
		WindowsIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "WindowsIcon",
				hash: "4df28b8cf5ad578d573eeeae1ba6c3a8",
				resourceItemExtension: ".svg"
			}
		},
		MarketplaceIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "MarketplaceIcon",
				hash: "79bf31568c3cc50782a3860592d58825",
				resourceItemExtension: ".svg"
			}
		},
		GettingStartedIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "GettingStartedIcon",
				hash: "670d3ae90708491a0350e89d73bca20f",
				resourceItemExtension: ".svg"
			}
		},
		SdkIcon: {
			source: 3,
			params: {
				schemaName: "BaseIntroPageSchema",
				resourceItemName: "SdkIcon",
				hash: "25fb98ad79924e87ec09066cb96e7abe",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});