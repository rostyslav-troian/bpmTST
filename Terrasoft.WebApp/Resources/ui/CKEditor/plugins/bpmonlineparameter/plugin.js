CKEDITOR.plugins.add("bpmonlineparameter", {
	icons: "bpmonlineparameter",
	init: function(editor) {
		var localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
		editor.addCommand("bpmonlineparameter_showsource", {
			exec: function(editor) {
				editor.fire("bpmonlineparameterclick");
			}
		});
		editor.ui.add("bpmonlineparameter", CKEDITOR.UI_BUTTON, {
			label: "",
			icon: this.path + "icons/bpmonlineparameter.svg",
			command: "bpmonlineparameter_showsource",
			title: localizableStrings.BpmonlineparameterTitle,
			modes: {wysiwyg: 1}
		});
	}
});
