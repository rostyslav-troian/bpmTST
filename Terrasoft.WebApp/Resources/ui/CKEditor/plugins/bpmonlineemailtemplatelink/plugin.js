CKEDITOR.plugins.add("bpmonlineemailtemplatelink", {
	icons: "bpmonlineemailtemplatelink",
	init: function(editor) {
		if (!editor.config.showEmailTemplateLinkButton) {
			return;
		}
		const localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
		editor.addCommand("addWebLink", {
			exec: function(editor) {
				editor.focusManager.blur(editor.element);
				editor.openDialog("link");
			}
		});
		editor.addCommand("addObjectLink", {
			exec: function(editor) {
				editor.focusManager.blur(editor.element);
				editor.fire("bpmonlineemailtemplatelinkclick", "objectlink");
			}
		});
		let items = {
			web: {
				label: localizableStrings.BpmonlineemailtemplatelinkAddWebLink,
				group: "bpmonlineemailtemplatelink_group",
				command: "addWebLink",
				order: 1
			},
			object: {
				label: localizableStrings.BpmonlineEmailTemplateLinkAddObjectLink,
				group: "bpmonlineemailtemplatelink_group",
				command: "addObjectLink",
				order: 2
			}
		};
		editor.addMenuGroup("bpmonlineemailtemplatelink_group");
		editor.addMenuItems(items);
		editor.ui.add("bpmonlineemailtemplatelink", CKEDITOR.UI_MENUBUTTON, {
			label: "",
			icon: "link",
			title: localizableStrings.BpmonlineEmailTemplateLink,
			modes: {wysiwyg: 1},
			onMenu: function() {
				let active = {};
				for (let p in items) {
					active[p] = CKEDITOR.TRISTATE_OFF;
				}
				return active;
			}
		});
	}
});
