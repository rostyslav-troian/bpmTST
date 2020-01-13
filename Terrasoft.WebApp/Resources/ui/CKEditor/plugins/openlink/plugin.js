CKEDITOR.plugins.add("openlink", {
		init: function(editor) {
			editor.on("contentDom", function() {
				var editable = editor.editable();
				editable.attachListener(editable, "click", function(evt) {
					var target = evt.data.getTarget();
					var clickedAnchor = (new CKEDITOR.dom.elementPath(target, editor.editable())).contains("a");
					var href = clickedAnchor && clickedAnchor.getAttribute("href");
					var config = editor.config;
					var modifierCode = typeof config.openlinkModifier !== "undefined"
						? config.openlinkModifier
						: CKEDITOR.CTRL;
					var modifierPressed = !modifierCode || evt.data.getKeystroke() & modifierCode;
					if (editor.readOnly && !config.openlinkEnableReadOnly) {
						return;
					}
					if (href && modifierPressed) {
						window.open(href, "_blank");
					}
				});
			});
		}
	});

