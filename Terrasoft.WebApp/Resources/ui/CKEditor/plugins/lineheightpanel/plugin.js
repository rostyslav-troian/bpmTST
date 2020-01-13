CKEDITOR.plugins.add('lineheightpanel', {
	requires: "panelbutton,floatpanel",
	icons: 'lineheightpanel',
	init: function(editor) {
		let panelBlock;
		const pluginDirectory = this.path;
		const panelCaption = Terrasoft.Resources.ExternalLibraries.CKEditor.LineHeightCaption;
		const applyCaption = Terrasoft.Resources.Controls.Button.ButtonCaptionApply;
		const cancelCaption = Terrasoft.Resources.Controls.Button.ButtonCaptionCancel;
		const autoCaption = Terrasoft.Resources.ExternalLibraries.CKEditor.AutoCaption;
		editor.ui.add("lineheightpanel", CKEDITOR.UI_PANELBUTTON, {
			label: panelCaption,
			title: panelCaption,
			icon: this.path + "icons/icon.svg",
			modes: {
				wysiwyg: 1
			},
			editorFocus: 1,
			panel: {
				css: pluginDirectory + 'styles/styles.css',
				attributes: {
					role: 'listbox',
					'aria-label': panelCaption
				}
			},
			onBlock: function(panel, block) {
				panelBlock = block;
				block.autoSize = true;
				const cancelFn = CKEDITOR.tools.addFunction(function() {
					editor.focus();
				});
				const clickFn = CKEDITOR.tools.addFunction(function() {
					var selectedHtml = editor.getSelectedHtml();
					if(selectedHtml.$.firstChild) {
						const val = this.getInput(block).value;
						editor.removeStyle(new CKEDITOR.style({
							element: 'span',
							styles: {'line-height': val + "px"},
							overrides: [
								{
									element: 'line-height', attributes: {'size': null}
								}
							]
						}));
						const hasValue = !Ext.isEmpty(val);
						editor.applyStyle(new CKEDITOR.style({
							element: 'span',
							styles: {
								'line-height': hasValue ? (val + "px") : "normal"
							},
							overrides: [
								{
									element: 'line-height', attributes: {'size': null}
								}
							]
						}));
						editor.fire('saveSnapshot');
						editor.focus();
					} else {
						editor.focus();
					}
				}, this);
				block.element.setHtml(
					'<div class="wrap">' +
						'<div class="label">' + panelCaption + ', px</div>' +
						'<input type="number" class="text-input" placeholder="' + autoCaption + '" ' +
							'onkeyup="if(arguments[0].keyCode===13){CKEDITOR.tools.callFunction(' + clickFn + ');return false;}">' +
						'<span class="button" onclick="CKEDITOR.tools.callFunction(' + clickFn + ');return false;">' +
							applyCaption +
						'</span>' +
						'<span class="button cancel-button" onclick="CKEDITOR.tools.callFunction(' + cancelFn + ');return false;">' +
							cancelCaption +
						'</span>' +
					'</div>'
				);
				CKEDITOR.ui.fire('ready', this);
			},
			onOpen: function() {
				const selection = editor.getSelection();
				const block = selection && selection.getStartElement();
				const path = editor.elementPath(block);
				if (!path) {
					return;
				}
				const range = selection && selection.getRanges()[0];
				const input = this.getInput(panelBlock);
				if (range) {
					const walker = new CKEDITOR.dom.walker(range);
					let element = range.collapsed ? range.startContainer : walker.next();
					let finalAttrValue = '';
					while (element) {
						if (element.type !== CKEDITOR.NODE_ELEMENT) {
							element = element.getParent();
						}
						const currentAttrValue = element.getComputedStyle('line-height');
						finalAttrValue = finalAttrValue || currentAttrValue;
						if (finalAttrValue) {
							break;
						}
						element = walker.next();
					}
					input.value = parseFloat(finalAttrValue);
				}
				Terrasoft.delay(function() {
					input.focus();
					input.select();
				}, this, 100);
			},
			getInput: function(block) {
				return block.element.$.querySelector(".text-input");
			}
		});
	}
});
