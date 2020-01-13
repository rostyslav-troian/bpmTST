define("OrderGeneratedWebFormPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrderScriptTemplate: "\u003Cdiv style=\u0022font-family: \u0026quot;Courier New\u0026quot;, monospace; font-size: 10pt;\u0022\u003E\u0026lt;script\u0026nbsp;src=\u0026quot;http:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.11.2\/jquery.min.js\u0026quot;\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026nbsp;src=\u0026quot;https:\/\/webtracking-v01.bpmonline.com\/JS\/track-cookies.js\u0026quot;\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026nbsp;src=##apiUrl##\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026gt;\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u0435\u0026nbsp;\u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u0026nbsp;\u0432\u0026nbsp;\u043A\u0430\u0432\u044B\u0447\u043A\u0430\u0445\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;\u0026nbsp;\u0432\u0026nbsp;\u043A\u043E\u0434\u0435\u0026nbsp;\u043D\u0438\u0436\u0435\u0026nbsp;\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C\u0026nbsp;\u0441\u0435\u043B\u0435\u043A\u0442\u043E\u0440\u0430\u0026nbsp;\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u0026nbsp;\u043D\u0430\u0026nbsp;\u0412\u0430\u0448\u0435\u0439\u0026nbsp;\u043B\u0435\u043D\u0434\u0438\u043D\u0433\u043E\u0432\u043E\u0439\u0026nbsp;\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435.\u003Cbr\u003E*\u0026nbsp;\u0412\u044B\u0026nbsp;\u043C\u043E\u0436\u0435\u0442\u0435\u0026nbsp;\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0026nbsp;#id\u0026nbsp;\u0438\u043B\u0438\u0026nbsp;\u043B\u044E\u0431\u043E\u0439\u0026nbsp;\u0434\u0440\u0443\u0433\u043E\u0439\u0026nbsp;CSS\u0026nbsp;\u0441\u0435\u043B\u0435\u043A\u0442\u043E\u0440,\u0026nbsp;\u043A\u043E\u0442\u043E\u0440\u044B\u0439\u0026nbsp;\u0431\u0443\u0434\u0435\u0442\u0026nbsp;\u0442\u043E\u0447\u043D\u043E\u0026nbsp;\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C\u0026nbsp;\u043F\u043E\u043B\u0435\u0026nbsp;\u0432\u0432\u043E\u0434\u0430\u0026nbsp;\u043D\u0430\u0026nbsp;\u0412\u0430\u0448\u0435\u0439\u0026nbsp;\u043B\u0435\u043D\u0434\u0438\u043D\u0433\u043E\u0432\u043E\u0439\u0026nbsp;\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435.\u003Cbr\u003E*\u0026nbsp;\u041F\u0440\u0438\u043C\u0435\u0440:\u0026nbsp;\u0026quot;Email\u0026quot;:\u0026nbsp;\u0026quot;#MyEmailField\u0026quot;.\u003Cbr\u003E*\u0026nbsp;\u0415\u0441\u043B\u0438\u0026nbsp;\u0412\u0430\u0448\u0430\u0026nbsp;\u043B\u0435\u043D\u0434\u0438\u043D\u0433\u043E\u0432\u0430\u044F\u0026nbsp;\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0026nbsp;\u043D\u0435\u0026nbsp;\u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442\u0026nbsp;\u043E\u0434\u043D\u043E\u0433\u043E\u0026nbsp;\u0438\u043B\u0438\u0026nbsp;\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445\u0026nbsp;\u043F\u043E\u043B\u0435\u0439\u0026nbsp;\u0438\u0437\u0026nbsp;\u043F\u0440\u0438\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0445\u0026nbsp;\u043D\u0438\u0436\u0435\u0026nbsp;\u2013\u0026nbsp;\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435\u0026nbsp;\u0441\u0442\u0440\u043E\u043A\u0443\u0026nbsp;\u0431\u0435\u0437\u0026nbsp;\u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439\u0026nbsp;\u0438\u043B\u0438\u0026nbsp;\u0443\u0434\u0430\u043B\u0438\u0442\u0435\u0026nbsp;\u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E.\u003Cbr\u003E*\/\u003Cbr\u003Evar\u0026nbsp;config\u0026nbsp;=\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;fields:\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Contact\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u0424\u0418\u041E\u0026nbsp;\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430,\u0026nbsp;\u043A\u043E\u0442\u043E\u0440\u044B\u0439\u0026nbsp;\u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0026nbsp;\u0437\u0430\u043A\u0430\u0437\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Account\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u0026nbsp;\u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0430,\u0026nbsp;\u043A\u043E\u0442\u043E\u0440\u044B\u0439\u0026nbsp;\u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0026nbsp;\u0437\u0430\u043A\u0430\u0437\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;ContactNumber\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439\u0026nbsp;\u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0026nbsp;\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;ReceiverName\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u0424\u0418\u041E\u0026nbsp;\u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F\u0026nbsp;\u0437\u0430\u043A\u0430\u0437\u0430\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Description\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;DeliveryType\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u0421\u043F\u043E\u0441\u043E\u0431\u0026nbsp;\u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438\u0026nbsp;\u0437\u0430\u043A\u0430\u0437\u0430\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;PaymentType\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;\u0421\u043F\u043E\u0441\u043E\u0431\u0026nbsp;\u043E\u043F\u043B\u0430\u0442\u044B\u0026nbsp;\u0437\u0430\u043A\u0430\u0437\u0430\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;DeliveryAddress\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;##customColumnsComma##\u0026nbsp;\/\/\u0026nbsp;\u0410\u0434\u0440\u0435\u0441\u0026nbsp;\u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438\u0026nbsp;\u0437\u0430\u043A\u0430\u0437\u0430##customColumns##\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;},\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landingId:\u0026nbsp;##landingId##,\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;serviceUrl:\u0026nbsp;##serviceUrl##,\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;redirectUrl:\u0026nbsp;##redirectUrl##\u003Cbr\u003E};\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;\u0424\u0443\u043D\u043A\u0446\u0438\u044F\u0026nbsp;\u043D\u0438\u0436\u0435\u0026nbsp;\u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0026nbsp;\u043E\u0431\u044A\u0435\u043A\u0442\u0026nbsp;\u0438\u0437\u0026nbsp;\u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0445\u0026nbsp;\u0434\u0430\u043D\u043D\u044B\u0445.\u003Cbr\u003E*\u0026nbsp;\u041F\u0440\u0438\u0432\u044F\u0436\u0438\u0442\u0435\u0026nbsp;\u0432\u044B\u0437\u043E\u0432\u0026nbsp;\u044D\u0442\u043E\u0439\u0026nbsp;\u0444\u0443\u043D\u043A\u0446\u0438\u0438\u0026nbsp;\u043A\u0026nbsp;\u0441\u043E\u0431\u044B\u0442\u0438\u044E\u0026nbsp;\u0026quot;onSubmit\u0026quot;\u0026nbsp;\u0444\u043E\u0440\u043C\u044B\u0026nbsp;\u0438\u043B\u0438\u0026nbsp;\u043B\u044E\u0431\u043E\u043C\u0443\u0026nbsp;\u0434\u0440\u0443\u0433\u043E\u043C\u0443\u0026nbsp;\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0443\u0026nbsp;\u0441\u043E\u0431\u044B\u0442\u0438\u044F.\u003Cbr\u003E*\u0026nbsp;\u041F\u0440\u0438\u043C\u0435\u0440:\u0026nbsp;\u0026lt;form\u0026nbsp;class=\u0026quot;mainForm\u0026quot;\u0026nbsp;name=\u0026quot;landingForm\u0026quot;\u0026nbsp;onSubmit=\u0026quot;createObject();\u0026nbsp;return\u0026nbsp;false\u0026quot;\u0026gt;\u003Cbr\u003E*\/\u003Cbr\u003Efunction\u0026nbsp;createObject()\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landing.createObjectFromLanding(config)\u003Cbr\u003E}\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;\u0424\u0443\u043D\u043A\u0446\u0438\u044F\u0026nbsp;\u043D\u0438\u0436\u0435\u0026nbsp;\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442\u0026nbsp;\u043B\u0435\u043D\u0434\u0438\u043D\u0433\u0026nbsp;\u0438\u0437\u0026nbsp;\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432\u0026nbsp;URL.\u003Cbr\u003E*\/\u003Cbr\u003Efunction\u0026nbsp;initLanding()\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landing.initLanding(config)\u003Cbr\u003E}\u003Cbr\u003EjQuery(document).ready(initLanding)\u003Cbr\u003E\u0026lt;\/script\u0026gt;\u003C\/div\u003E"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		FAQIcon: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "FAQIcon",
				hash: "898f30139a1507ab891cddc467938206",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "OrderGeneratedWebFormPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});