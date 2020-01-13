CKEDITOR.plugins.add("bpmonlinetextcolor", {
	icons: "bpmonlinetextcolor",
	init: function(editor) {
		var localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
		editor.addCommand("BpmonlineTextColor_SelectColor", {
			exec: function(editor) {
				var menuItemId = this.uiItems[0]._.id;
				editor.fire("BpmonlineTextColorClick", menuItemId);
			}
		});
		editor.ui.addButton("TextColor", {
			icon: this.path + "icons/bpmonlinetextcolor.svg",
			title: localizableStrings.BpmonlineTextColorTitle,
			modes: {wysiwyg: 1},
			command: "BpmonlineTextColor_SelectColor"
		});
	}
});
