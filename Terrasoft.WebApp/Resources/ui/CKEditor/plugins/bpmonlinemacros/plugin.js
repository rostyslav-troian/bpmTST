CKEDITOR.plugins.add("bpmonlinemacros", {
	icons: "bpmonlinemacros",
	init: function(editor) {
		var localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
		editor.addCommand("bpmonlinemacros_selectmacros", {
			exec: function(editor) {
				editor.focusManager.blur(editor.element);
				editor.fire("bpmonlinemacrosclick", "macros");
			}
		});
		editor.addCommand("bpmonlinemacros_selectcolumn", {
			exec: function(editor) {
				editor.focusManager.blur(editor.element);
				editor.fire("bpmonlinemacrosclick", "column");
			}
		});
		var items = {
			macros: {
				label: localizableStrings.BpmonlinemacrosSelectMacros,
				group: "bpmonlinemacros_group",
				command: "bpmonlinemacros_selectmacros",
				order: 1
			},
			column: {
				label: localizableStrings.BpmonlinemacrosSelectColumn,
				group: "bpmonlinemacros_group",
				command: "bpmonlinemacros_selectcolumn",
				order: 2
			}
		};
		editor.addMenuGroup("bpmonlinemacros_group");
		editor.addMenuItems(items);
		editor.ui.add("bpmonlinemacros", CKEDITOR.UI_MENUBUTTON, {
			label: "",
			icon: "bpmonlinemacros",
			title: localizableStrings.BpmonlinemacrosTitle,
			modes: {wysiwyg: 1},
			onMenu: function() {
				var active = {};
				for (var p in items) {
					active[p] = CKEDITOR.TRISTATE_OFF;
				}
				return active;
			}
		});
	}
});
