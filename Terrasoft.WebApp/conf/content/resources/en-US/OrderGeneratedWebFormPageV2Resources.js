define("OrderGeneratedWebFormPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OrderScriptTemplate: "\u003Cdiv style=\u0022font-family: \u0026quot;Courier New\u0026quot;, monospace; font-size: 10pt;\u0022\u003E\u0026lt;script\u0026nbsp;src=\u0026quot;http:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.11.2\/jquery.min.js\u0026quot;\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026nbsp;src=\u0026quot;https:\/\/webtracking-v01.bpmonline.com\/JS\/track-cookies.js\u0026quot;\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026nbsp;src=##apiUrl##\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026gt;\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;Replace\u0026nbsp;the\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;\u0026nbsp;placeholders\u0026nbsp;in\u0026nbsp;the\u0026nbsp;code\u0026nbsp;below\u0026nbsp;with\u0026nbsp;the\u0026nbsp;element\u0026nbsp;selectors\u0026nbsp;on\u0026nbsp;your\u0026nbsp;landing\u0026nbsp;page.\u003Cbr\u003E*\u0026nbsp;You\u0026nbsp;can\u0026nbsp;use\u0026nbsp;#id\u0026nbsp;or\u0026nbsp;any\u0026nbsp;other\u0026nbsp;CSS\u0026nbsp;selector\u0026nbsp;that\u0026nbsp;will\u0026nbsp;define\u0026nbsp;the\u0026nbsp;input\u0026nbsp;field\u0026nbsp;explicitly.\u003Cbr\u003E*\u0026nbsp;Example:\u0026nbsp;\u0026quot;Email\u0026quot;:\u0026nbsp;\u0026quot;#MyEmailField\u0026quot;.\u003Cbr\u003E*\u0026nbsp;If\u0026nbsp;you\u0026nbsp;don\u0027t\u0026nbsp;have\u0026nbsp;a\u0026nbsp;field\u0026nbsp;from\u0026nbsp;the\u0026nbsp;list\u0026nbsp;below\u0026nbsp;placed\u0026nbsp;on\u0026nbsp;your\u0026nbsp;landing,\u0026nbsp;leave\u0026nbsp;the\u0026nbsp;placeholder\u0026nbsp;or\u0026nbsp;remove\u0026nbsp;the\u0026nbsp;line.\u003Cbr\u003E*\/\u003Cbr\u003Evar\u0026nbsp;config\u0026nbsp;=\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;fields:\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Contact\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Name\u0026nbsp;of\u0026nbsp;a\u0026nbsp;contact\u0026nbsp;that\u0026nbsp;makes\u0026nbsp;an\u0026nbsp;order\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Account\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Name\u0026nbsp;of\u0026nbsp;an\u0026nbsp;account\u0026nbsp;that\u0026nbsp;makes\u0026nbsp;an\u0026nbsp;order\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;ContactNumber\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Contact\u0027s\u0026nbsp;mobile\u0026nbsp;phone\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;ReceiverName\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Name\u0026nbsp;of\u0026nbsp;an\u0026nbsp;order\u0026nbsp;recipient\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Description\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Comments\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;DeliveryType\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Order\u0026nbsp;delivery\u0026nbsp;type\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;PaymentType\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Order\u0026nbsp;payment\u0026nbsp;type\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;DeliveryAddress\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;##customColumnsComma##\u0026nbsp;\/\/\u0026nbsp;Order\u0026nbsp;delivery\u0026nbsp;address##customColumns##\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;},\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landingId:\u0026nbsp;##landingId##,\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;serviceUrl:\u0026nbsp;##serviceUrl##,\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;redirectUrl:\u0026nbsp;##redirectUrl##\u003Cbr\u003E};\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;The\u0026nbsp;function\u0026nbsp;below\u0026nbsp;creates\u0026nbsp;a\u0026nbsp;object\u0026nbsp;from\u0026nbsp;the\u0026nbsp;submitted\u0026nbsp;data.\u003Cbr\u003E*\u0026nbsp;Bind\u0026nbsp;this\u0026nbsp;function\u0026nbsp;call\u0026nbsp;to\u0026nbsp;the\u0026nbsp;\u0026quot;onSubmit\u0026quot;\u0026nbsp;event\u0026nbsp;of\u0026nbsp;the\u0026nbsp;form\u0026nbsp;or\u0026nbsp;any\u0026nbsp;other\u0026nbsp;elements\u0026nbsp;events.\u003Cbr\u003E*\u0026nbsp;Example:\u0026nbsp;\u0026lt;form\u0026nbsp;class=\u0026quot;mainForm\u0026quot;\u0026nbsp;name=\u0026quot;landingForm\u0026quot;\u0026nbsp;onSubmit=\u0026quot;createObject();\u0026nbsp;return\u0026nbsp;false\u0026quot;\u0026gt;\u003Cbr\u003E*\/\u003Cbr\u003Efunction\u0026nbsp;createObject()\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landing.createObjectFromLanding(config)\u003Cbr\u003E}\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;The\u0026nbsp;function\u0026nbsp;below\u0026nbsp;inits\u0026nbsp;landing\u0026nbsp;page\u0026nbsp;using\u0026nbsp;URL\u0026nbsp;parameters.\u003Cbr\u003E*\/\u003Cbr\u003Efunction\u0026nbsp;initLanding()\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landing.initLanding(config)\u003Cbr\u003E}\u003Cbr\u003EjQuery(document).ready(initLanding)\u003Cbr\u003E\u0026lt;\/script\u0026gt;\u003C\/div\u003E"
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