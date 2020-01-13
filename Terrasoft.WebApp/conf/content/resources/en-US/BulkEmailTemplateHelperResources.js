define("BulkEmailTemplateHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UnsubscribeLinkMacros: "[#Unsubscribe.URL#]",
		TemplateIsTooBigMessage: "The template can not be added to the bulk email, it\u2019s ({0} MB) more than maximum allowed size ({1} MB). Edit the template or select the other one.",
		UnsubscribeTemplate: "\u003Cp\u003E\u003Cspan style=\u0022color:rgb(102, 102, 102); font-family:verdana,geneva,sans-serif; font-size:11px\u0022\u003EIf you don\u0027t want to receive it anymore, \u003C\/span\u003E\u003Ca href=\u0022[#Unsubscribe.URL#]\u0022 style=\u0022font-family: verdana, geneva, sans-serif; font-size: 11px; line-height: 16.7999992370605px;\u0022\u003E\u003Cu\u003E\u003Cspan style=\u0022color:rgb(46, 108, 184)\u0022\u003Eunsubscribe\u003C\/span\u003E\u003C\/u\u003E\u003C\/a\u003E\u003Cspan style=\u0022color:rgb(102, 102, 102); font-family:verdana,geneva,sans-serif; font-size:11px\u0022\u003E.\u003C\/span\u003E\u003C\/p\u003E",
		TemplateContractIsTooBigMessage: "The resulting dynamic template can not be added to the bulk email, it\u2019s ({0} MB) more than maximum allowed size ({1} MB). Edit the template or select the other one."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});