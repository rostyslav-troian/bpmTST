define("GeneratedWebFormPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveFormCodeToFileCaption: "Generate landing page code",
		CustomizeLeadColumnsFormCaption: "Set up landing page view",
		CustomizeDefaultValuesFormCaption: "Set up filling in default values",
		ConfigureFormFields: "The landing page view is not set up. Set up it now?",
		IntegrationFormTabCaption: "Landing setup",
		AfterFormFillControlGroupCaption: "STEP 1. Set up a redirection URL (optional)",
		HowToPlaceFormControlGroupCaption: "STEP 2. Copy the code and configure and map the fields",
		NotesTabCaption: "Attachments and notes",
		TemplateGuideText: "To capture the lead data from the landing page to Creatio, place the code below at any location in landing page code. Visit our Academy to learn more about {0}connecting your landing page to Creatio{1} and to {2}set up the lead tracking{3}.",
		GenerateScriptCaption: "Generate",
		CopyScriptToClipboardCaption: "Copy",
		LeadDefaultsCaption: "Default values",
		CreateContactToolTipText: "Turn on to create both lead and contact on form submission. ",
		RedirectionUrlTipCaption: "User will be redirected to this page after submitting the form.",
		PlaceFormTipCaption: "Visit our Academy to learn more \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022LandingFieldsRelation\u0022 \u003Eabout field mapping\u003C\/a\u003E",
		SubmitScriptControlGroupCaption: "STEP 3. Insert the customized code into the landing page source code. Set up a function to create a lead on form submit",
		SubmitScriptTipCaption: "Visit our Academy \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022LandingSubmitScript\u0022 \u003Eto learn how to insert html-code into your landing page\u003C\/a\u003E",
		SubmitScriptHelpText: "Place the edited code on your landing page. Insert the following code into the \u0026ltform\u0026gt tag of your form.",
		ExternalURLTipCaption: "Enter the landing page address, for example, www.example.com\/landing.\nEnter \u201Cwww.example*\u201D to set up a single landing page for several domains.",
		ScriptTemplate: "\u003Cdiv style=\u0022font-family: \u0026quot;Courier New\u0026quot;, monospace; font-size: 10pt;\u0022\u003E\u0026lt;script\u0026nbsp;src=\u0026quot;http:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.11.2\/jquery.min.js\u0026quot;\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026nbsp;src=\u0026quot;https:\/\/webtracking-v01.bpmonline.com\/JS\/track-cookies.js\u0026quot;\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026nbsp;src=##apiUrl##\u0026gt;\u0026lt;\/script\u0026gt;\u003Cbr\u003E\u0026lt;script\u0026gt;\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;Replace\u0026nbsp;the\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;\u0026nbsp;placeholders\u0026nbsp;in\u0026nbsp;the\u0026nbsp;code\u0026nbsp;below\u0026nbsp;with\u0026nbsp;the\u0026nbsp;element\u0026nbsp;selectors\u0026nbsp;on\u0026nbsp;your\u0026nbsp;landing\u0026nbsp;page.\u003Cbr\u003E*\u0026nbsp;You\u0026nbsp;can\u0026nbsp;use\u0026nbsp;#id\u0026nbsp;or\u0026nbsp;any\u0026nbsp;other\u0026nbsp;CSS\u0026nbsp;selector\u0026nbsp;that\u0026nbsp;will\u0026nbsp;define\u0026nbsp;the\u0026nbsp;input\u0026nbsp;field\u0026nbsp;explicitly.\u003Cbr\u003E*\u0026nbsp;Example:\u0026nbsp;\u0026quot;Email\u0026quot;:\u0026nbsp;\u0026quot;#MyEmailField\u0026quot;.\u003Cbr\u003E*\u0026nbsp;If\u0026nbsp;you\u0026nbsp;don\u0027t\u0026nbsp;have\u0026nbsp;a\u0026nbsp;field\u0026nbsp;from\u0026nbsp;the\u0026nbsp;list\u0026nbsp;below\u0026nbsp;placed\u0026nbsp;on\u0026nbsp;your\u0026nbsp;landing,\u0026nbsp;leave\u0026nbsp;the\u0026nbsp;placeholder\u0026nbsp;or\u0026nbsp;remove\u0026nbsp;the\u0026nbsp;line.\u003Cbr\u003E*\/\u003Cbr\u003Evar\u0026nbsp;config\u0026nbsp;=\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;fields:\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Name\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Name\u0026nbsp;of\u0026nbsp;a\u0026nbsp;visitor,\u0026nbsp;submitting\u0026nbsp;the\u0026nbsp;page\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Email\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Visitor\u0027s\u0026nbsp;email\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Zip\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Visitor\u0027s\u0026nbsp;ZIP\u0026nbsp;code\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;MobilePhone\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Visitor\u0027s\u0026nbsp;phone\u0026nbsp;number\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Company\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Name\u0026nbsp;of\u0026nbsp;a\u0026nbsp;company\u0026nbsp;(for\u0026nbsp;business\u0026nbsp;landing\u0026nbsp;pages)\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Industry\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Company\u0026nbsp;industry\u0026nbsp;(for\u0026nbsp;business\u0026nbsp;landing\u0026nbsp;pages)\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;FullJobTitle\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Visitor\u0027s\u0026nbsp;job\u0026nbsp;title\u0026nbsp;(for\u0026nbsp;business\u0026nbsp;landing\u0026nbsp;pages)\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;UseEmail\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Logical\u0026nbsp;value:\u0026nbsp;\u0027true\u0027\u0026nbsp;equals\u0026nbsp;to\u0026nbsp;visitor\u0027s\u0026nbsp;opt-in\u0026nbsp;to\u0026nbsp;receive\u0026nbsp;emails\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;City\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;City\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Country\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;,\u0026nbsp;\/\/\u0026nbsp;Country\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026quot;Commentary\u0026quot;:\u0026nbsp;\u0026quot;\u003Cspan style=\u0022color: #0c0cec;\u0022\u003Ecss-selector\u003C\/span\u003E\u0026quot;##customColumnsComma##\u0026nbsp;\/\/\u0026nbsp;Notes##customColumns##\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;},\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landingId:\u0026nbsp;##landingId##,\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;serviceUrl:\u0026nbsp;##serviceUrl##,\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;redirectUrl:\u0026nbsp;##redirectUrl##\u003Cbr\u003E};\u003Cbr\u003E\/**\u003Cbr\u003E*\u0026nbsp;The\u0026nbsp;function\u0026nbsp;below\u0026nbsp;creates\u0026nbsp;a\u0026nbsp;lead\u0026nbsp;from\u0026nbsp;the\u0026nbsp;submitted\u0026nbsp;data.\u003Cbr\u003E*\u0026nbsp;Bind\u0026nbsp;this\u0026nbsp;function\u0026nbsp;call\u0026nbsp;to\u0026nbsp;the\u0026nbsp;\u0026quot;onSubmit\u0026quot;\u0026nbsp;event\u0026nbsp;of\u0026nbsp;the\u0026nbsp;form\u0026nbsp;or\u0026nbsp;any\u0026nbsp;other\u0026nbsp;elements\u0026nbsp;events.\u003Cbr\u003E*\u0026nbsp;Example:\u0026nbsp;\u0026lt;form\u0026nbsp;class=\u0026quot;mainForm\u0026quot;\u0026nbsp;name=\u0026quot;landingForm\u0026quot;\u0026nbsp;onSubmit=\u0026quot;createLead();\u0026nbsp;return\u0026nbsp;false\u0026quot;\u0026gt;\u003Cbr\u003E*\/\u003Cbr\u003Efunction\u0026nbsp;createLead()\u0026nbsp;{\u003Cbr\u003E\u0026nbsp;\u0026nbsp;\u0026nbsp;\u0026nbsp;landing.createLeadFromLanding(config)\u003Cbr\u003E}\u003Cbr\u003E\u0026lt;\/script\u0026gt;\u003C\/div\u003E",
		EventTrackingSetupAcademyUrl: "How to set up the website events tracking",
		LeadSourceTrackingAcademyUrl: "How to set up lead source tracking"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "7b8874b63082d57a3c1afd1367fe9233",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		FAQIcon: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "FAQIcon",
				hash: "898f30139a1507ab891cddc467938206",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "GeneratedWebFormPageV2",
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