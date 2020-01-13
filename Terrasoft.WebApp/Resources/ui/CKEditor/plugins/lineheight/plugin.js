( function() {
	function addCombo( editor, comboName, styleType, entries, defaultLabel, styleDefinition, order ) {
		var config = editor.config,style = new CKEDITOR.style( styleDefinition );
		var names = entries.split( ';' ),values = [];
		var styles = {};
		for ( var i = 0; i < names.length; i++ ) {
			var parts = names[ i ];
			if ( parts ) {
				parts = parts.split( '/' );
				var vars = {},name = names[ i ] = parts[ 0 ];
				vars[ styleType ] = values[ i ] = parts[ 1 ] || name;
				styles[ name ] = new CKEDITOR.style( styleDefinition, vars );
				styles[ name ]._.definition.name = name;
			} else {
				names.splice(i--, 1);
			}
		}
		editor.ui.addRichCombo( comboName, {
			label: Terrasoft.Resources.ExternalLibraries.CKEditor.LineHeightCaption,
			title: Terrasoft.Resources.ExternalLibraries.CKEditor.LineHeightCaption,
			toolbar: 'styles,' + order,
			allowedContent: style,
			requiredContent: style,
			panel: {
				css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
				multiSelect: false,
				attributes: { 'aria-label': Terrasoft.Resources.ExternalLibraries.CKEditor.LineHeightCaption }
			},
			init: function() {
				var localizableStrings = Terrasoft.Resources.ExternalLibraries.CKEditor;
				this.startGroup(localizableStrings.LineHeightCaption);
				for ( var i = 0; i < names.length; i++ ) {
					var name = names[ i ];
					this.add(name, name, name);
				}
			},
			onClick: function( value ) {
				editor.focus();
				var selectedHtml = editor.getSelectedHtml();
				if(selectedHtml.getHtml()) {
					editor.fire( 'saveSnapshot' );
					var style = styles[ value ];
					editor[ this.getValue() == value ? 'removeStyle' : 'applyStyle' ]( style );
					editor.fire( 'saveSnapshot' );
				}
			},
			onRender: function() {
				editor.on( 'selectionChange', function( ev ) {
					var currentValue = this.getValue();
					var elementPath = ev.data.path,elements = elementPath.elements;
					for ( var i = 0, element; i < elements.length; i++ ) {
						element = elements[ i ];
						for ( var value in styles ) {
							if ( styles[ value ].checkElementMatch( element, true, editor ) ) {
								if ( value != currentValue )
									this.setValue( value );
								return;
							}
						}
					}
					this.setValue( '', defaultLabel );
				}, this );
			},
			refresh: function() {
				if ( !editor.activeFilter.check( style ) )
					this.setState( CKEDITOR.TRISTATE_DISABLED );
			}
		} );
	}
	CKEDITOR.plugins.add( 'lineheight', {
		requires: 'richcombo',
		init: function( editor ) {
			var config = editor.config;
			addCombo(editor, 'lineheight', 'size',
				config.line_height, Terrasoft.Resources.ExternalLibraries.CKEditor.LineHeightCaption,
				config.lineHeight_style, 40);
		}
	} );
} )();
const lineHeightVariants = [];
for(let lineHeight=1;lineHeight<=200;lineHeight++) {
	lineHeightVariants.push(lineHeight+"px");
}
CKEDITOR.config.line_height = lineHeightVariants.join(";");
CKEDITOR.config.lineHeight_style = {
	element: 'span',
	styles: { 'line-height': '#(size)', 'display': 'inline-block'},
	overrides: [ {
		element: 'line-height', attributes: { 'size': null }
	} ]
};
