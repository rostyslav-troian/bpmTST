CKEDITOR.plugins.add("bpmonlinesource", {
	icons: "bpmonlinesource",
	init: function(editor) {
		var localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
		editor.addCommand("bpmonlinesource_showsource", {
			exec: function(editor) {
				editor.fire("bpmonlinesourceclick");
			}
		});
		editor.ui.add("bpmonlinesource", CKEDITOR.UI_BUTTON, {
			label: "",
			icon: this.path + "icons/bpmonlinesource.svg",
			command: "bpmonlinesource_showsource",
			title: localizableStrings.BpmonlinesourceTitle,
			modes: {wysiwyg: 1}
		});
	}
});
