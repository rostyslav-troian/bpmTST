/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

function getBpmonlineAppUserCultureLanguage() {
	var result = "en";
	if (typeof(Terrasoft) !== "undefined" && Terrasoft.SysValue && Terrasoft.SysValue.CURRENT_USER_CULTURE) {
		var culture = Terrasoft.SysValue.CURRENT_USER_CULTURE;
		var userCulture = culture.displayValue.substr(0, 2);
		if (CKEDITOR && CKEDITOR.lang && CKEDITOR.lang[userCulture]) {
			result = userCulture;
		}
	}
	return result;
}

CKEDITOR.config.title = false;
CKEDITOR.config.disableNativeSpellChecker = false;
CKEDITOR.editorConfig = function(config) {
	config.language = getBpmonlineAppUserCultureLanguage();
	config.defaultLanguage = getBpmonlineAppUserCultureLanguage();
	config.fontSize_defaultLabel = "13";
	config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;13/13px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";
	config.font_defaultLabel = Terrasoft.SysSettings.cachedSettings.CKEditorDefaultFont || "Open Sans";
	config.font_names = Terrasoft.SysSettings.cachedSettings.CKEditorFontsList || "";
	//http://ckeditor.com/latest/samples/plugins/toolbar/toolbar.html
	var toolbar = [
		{
			name: "undo",
			items: ["Undo", "Redo"]
		},
		{
			name: "styles",
			items: ["Font", "FontSize"]
		},
		{
			name: "basicstyles",
			groups: ["basicstyles"],
			items: ["Bold", "Italic", "Underline"]
		},
		{
			name: "colors",
			items: ["TextColor"]
		},
		{
			name: "lineheight",
			items: ["lineheight"]
		},
		{
			name: "lineheightpanel",
			items: ["lineheightpanel"]
		},
		{
			name: "letterspacing",
			items: ["letterspacing"]
		},
		{
			name: "letterspacingpanel",
			items: ["letterspacingpanel"]
		},
		{
			name: "paragraph",
			groups: ["list", "align"],
			items: ["NumberedList", "BulletedList", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"]
		},
		{
			name: "indent",
			items: ["Outdent", "Indent", "indentpanel"]
		},
		{
			name: "links",
			items: ["Link"]
		},
		{
			name: "tools",
			groups: ["tools"],
			items: ["Maximize"]
		}
	];
	config.toolbar = toolbar.concat(config.toolbar);

	var toolbarGroups = [
		{
			name: "basicstyles",
			groups: ["basicstyles"]
		},
		{
			name: "paragraph",
			groups: ["list", "align"]
		},
		{
			name: "links"
		},
		{
			name: "styles"
		},
		{
			name: "colors"
		},
		{
			name: "tools",
			groups: ["tools"]
		}
	];
	config.toolbarGroups = toolbarGroups.concat(config.toolbarGroups);

	config.skin = "bpmonline";
	config.removePlugins = "scayt,tableselection,magicline,liststyle,tabletools,contextmenu,table";
	config.extraPlugins = "openlink,language,linkmodalwindow,bpmonlinetable," +
		"bpmonlinetabletools,tableresize" + config.extraPlugins;
	if (!Ext.isEdge) {
		config.extraPlugins += ",dragresize";
	}
	if (Terrasoft.Features.getIsDisabled("CKEditorColorPicker")) {
		config.extraPlugins += ",bpmonlinetextcolor";
	}
	if (Terrasoft.Features.getIsEnabled("CKEditorLineHeightPanel")) {
		config.extraPlugins += ",lineheightpanel";
	} else {
		config.extraPlugins += ",lineheight";
	}
	if (Terrasoft.Features.getIsEnabled("CKEditorLetterSpacingPanel")) {
		config.extraPlugins += ",letterspacingpanel";
	} else {
		config.extraPlugins += ",letterspacing";
	}
	if (Terrasoft.Features.getIsEnabled("CKEditorIndentPanel")) {
		config.extraPlugins += ",indentpanel";
	}
	config.openlinkModifier = 0;
	config.openlinkEnableReadOnly = true;
	config.pasteFromWordRemoveFontStyles = false;
	config.pasteFromWordRemoveStyles = false;
	config.basicEntities = true;
	config.fillEmptyBlocks = false;
	config.enterMode = CKEDITOR.ENTER_BR;
	config.startupShowBorders = false;
	config.entities_latin = false;
};
