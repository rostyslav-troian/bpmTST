( function() {
	CKEDITOR.plugins.add( 'linkmodalwindow', {
		init: function( editor ) {
			editor.addCommand("openlinkmodalwindow", {
				exec: function(editor) {
					editor.fire("openlinkmodalwindow");
				}
			});
		}
	});
} )();
