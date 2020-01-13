CKEDITOR.plugins.add('indentpanel', {
	requires: "panelbutton,floatpanel",
	icons: 'indentpanel',
	init: function(editor) {
		let panelBlock;
		const pluginDirectory = this.path;
		const $list = CKEDITOR.dtd.$list;
		const panelCaption = Terrasoft.Resources.ExternalLibraries.CKEditor.IndentPanelCaption;
		const hint = Terrasoft.Resources.ExternalLibraries.CKEditor.IndentPanelHint;
		const applyCaption = Terrasoft.Resources.Controls.Button.ButtonCaptionApply;
		const cancelCaption = Terrasoft.Resources.Controls.Button.ButtonCaptionCancel;
		const autoCaption = Terrasoft.Resources.ExternalLibraries.CKEditor.AutoCaption;
		const indentCssProperty = "margin-left";
		editor.ui.add("indentpanel", CKEDITOR.UI_PANELBUTTON, {
			label: hint,
			title: hint,
			icon: this.path + "icons/icon.svg",
			modes: {
				wysiwyg: 1
			},
			editorFocus: 1,
			panel: {
				css: pluginDirectory + 'styles/styles.css',
				attributes: {
					role: 'listbox',
					'aria-label': hint
				}
			},
			onBlock: function(panel, block) {
				panelBlock = block;
				block.autoSize = true;
				const cancelFn = CKEDITOR.tools.addFunction(function() {
					editor.focus();
				});
				const clickFn = CKEDITOR.tools.addFunction(function() {
					const selection = editor.getSelection(),
							range = selection && selection.getRanges()[0];
					const nearestListBlock = editor.elementPath().contains($list);
					const val = this.getInput(panelBlock).value;
					if (nearestListBlock) {
						this.setIndent(nearestListBlock, val);
					} else {
						const iterator = range.createIterator();
						const enterMode = editor.config.enterMode;
						let paragraphBlock;
						iterator.enforceRealBlocks = true;
						iterator.enlargeBr = enterMode !== CKEDITOR.ENTER_BR;
						while ((paragraphBlock = iterator.getNextParagraph(enterMode === CKEDITOR.ENTER_P ? 'p' : 'div'))) {
							if (!paragraphBlock.isReadOnly()) {
								this.setIndent(paragraphBlock, val);
							}
						}
					}

					editor.focus();
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
				const range = selection && selection.getRanges()[0];
				const nearestListBlock = editor.elementPath().contains($list);
				const input = this.getInput(panelBlock);
				if (nearestListBlock) {
					const indent = this.getIndent(nearestListBlock);
					input.value = parseFloat(indent);
				} else {
					const iterator = range.createIterator();
					const enterMode = editor.config.enterMode;
					let paragraphBlock;
					iterator.enforceRealBlocks = true;
					iterator.enlargeBr = enterMode !== CKEDITOR.ENTER_BR;
					while ((paragraphBlock = iterator.getNextParagraph(enterMode === CKEDITOR.ENTER_P ? 'p' : 'div'))) {
						if (!paragraphBlock.isReadOnly()) {
							input.value = this.getIndent(paragraphBlock);
						}
					}
				}
				Terrasoft.delay(function() {
					input.focus();
					input.select();
				}, this, 100);
			},
			getIndent: function(element) {
				if (element.getCustomData('indent_processed')) {
					return;
				}
				return parseInt(element.getStyle(indentCssProperty), 10);
			},
			setIndent: function(element, indent) {
				if (element.getCustomData('indent_processed')) {
					return;
				}
				const currentOffset = indent;
				element.setStyle(
						indentCssProperty,
						currentOffset ? currentOffset + 'px' : ''
				);
				if (element.getAttribute('style') === '') {
					element.removeAttribute('style');
				}
			},
			getInput: function(block) {
				return block.element.$.querySelector(".text-input");
			}
		});
	}
});
