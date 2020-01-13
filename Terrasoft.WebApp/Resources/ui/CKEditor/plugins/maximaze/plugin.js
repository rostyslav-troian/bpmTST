CKEDITOR.plugins.add("maximaze", {
	icons: "maximaze",
	init: function(editor) {
		editor.addCommand("maximaze_click", {
			exec: function(editor) {
				editor.focusManager.blur(editor.element);
				var btn = editor.ui.get("maximaze");
				var state = btn.getState();
				var newState = state === CKEDITOR.TRISTATE_ON ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON;
				btn.setState(newState);
				editor.fire("maximazeclick");
				
			}
		});
	editor.ui.add("maximaze", CKEDITOR.UI_BUTTON, {
			label: "",
			icon: "maximaze",
			command: "maximaze_click",
			modes: {wysiwyg: 1}
		});
	}
});
