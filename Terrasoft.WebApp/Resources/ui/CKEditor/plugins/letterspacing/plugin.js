(function() {
	function addCombo(editor, comboName, styleType, entries, defaultLabel, styleDefinition, order) {
		var config = editor.config, style = new CKEDITOR.style(styleDefinition);
		var names = entries.split(';'), values = [];
		var styles = {};
		for (var i = 0; i < names.length; i++) {
			var parts = names[i];
			if (parts) {
				parts = parts.split('/');
				var vars = {}, name = names[i] = parts[0];
				vars[styleType] = values[i] = parts[1] || name;
				styles[name] = new CKEDITOR.style(styleDefinition, vars);
				styles[name]._.definition.name = name;
			} else {
				names.splice(i--, 1);
			}
		}
		editor.ui.addRichCombo(comboName, {
			label: Terrasoft.Resources.ExternalLibraries.CKEditor.LetterSpacingCaption,
			title: Terrasoft.Resources.ExternalLibraries.CKEditor.LetterSpacingCaption,
			toolbar: 'styles,' + order,
			allowedContent: style,
			requiredContent: style,
			panel: {
				css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
				multiSelect: false,
				attributes: {'aria-label': Terrasoft.Resources.ExternalLibraries.CKEditor.LetterSpacingCaption}
			},
			init: function() {
				var localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
				this.startGroup(localizableStrings.LetterSpacingCaption);
				for (var i = 0; i < names.length; i++) {
					var name = names[i];
					this.add(name, name, name);
				}
			},
			onClick: function(value) {
				editor.focus();
				editor.fire('saveSnapshot');
				var style = styles[value];
				editor[this.getValue() == value ? 'removeStyle' : 'applyStyle'](style);
				editor.fire('saveSnapshot');
			},
			onRender: function() {
				editor.on('selectionChange', function(ev) {
					var currentValue = this.getValue();
					var elementPath = ev.data.path, elements = elementPath.elements;
					for (var i = 0, element; i < elements.length; i++) {
						element = elements[i];
						for (var value in styles) {
							if (styles[value].checkElementMatch(element, true, editor)) {
								if (value != currentValue) {
									this.setValue(value);
								}
								return;
							}
						}
					}
					this.setValue('', defaultLabel);
				}, this);
			},
			refresh: function() {
				if (!editor.activeFilter.check(style)) {
					this.setState(CKEDITOR.TRISTATE_DISABLED);
				}
			}
		});
	}

	CKEDITOR.plugins.add('letterspacing', {
		requires: 'richcombo',
		init: function(editor) {
			var config = editor.config;
			addCombo(editor, 'letterspacing', 'size',
				config.letter_spacing, Terrasoft.Resources.ExternalLibraries.CKEditor.LetterSpacingCaption,
				config.letterSpacing_style, 40);
		}
	});
})();
const LetterSpacingVariants = [];
const minValue = 0.01;
for (let letterSpace = -5; letterSpace < 5; letterSpace += 0.1) {
	const actualLetterSpace = letterSpace < minValue && letterSpace > -minValue ? 0 : letterSpace.toPrecision(2);
	LetterSpacingVariants.push( actualLetterSpace + "px");
}
for (let letterSpace = 5; letterSpace <= 100; letterSpace += 1) {
	LetterSpacingVariants.push(letterSpace + "px");
}
CKEDITOR.config.letter_spacing = LetterSpacingVariants.join(";");
CKEDITOR.config.letterSpacing_style = {
	element: 'span',
	styles: {'letter-spacing': '#(size)'},
	overrides: [
		{
			element: 'letter-spacing', attributes: {'size': null}
		}
	]
};