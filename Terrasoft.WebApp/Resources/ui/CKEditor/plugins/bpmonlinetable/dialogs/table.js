/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( function() {
	var defaultToPixel = CKEDITOR.tools.cssLength;

	var commitValue = function( data ) {
			var id = this.id;
			if ( !data.info )
				data.info = {};
			data.info[ id ] = this.getValue();
		};

	function tableColumns( table ) {
		var cols = 0,
			maxCols = 0;
		for ( var i = 0, row, rows = table.$.rows.length; i < rows; i++ ) {
			row = table.$.rows[ i ], cols = 0;
			for ( var j = 0, cell, cells = row.cells.length; j < cells; j++ ) {
				cell = row.cells[ j ];
				cols += cell.colSpan;
			}

			cols > maxCols && ( maxCols = cols );
		}

		return maxCols;
	}


	// Whole-positive-integer validator.
	function validatorNum( msg ) {
		return function() {
			var value = this.getValue(),
				pass = !!( CKEDITOR.dialog.validate.integer()( value ) && value > 0 );

			if ( !pass ) {
				alert( msg ); // jshint ignore:line
				this.select();
			}

			return pass;
		};
	}

	function tableDialog( editor, command ) {
		var makeElement = function( name ) {
				return new CKEDITOR.dom.element( name, editor.document );
			};

		var editable = editor.editable();

		var dialogadvtab = editor.plugins.dialogadvtab;

		function addCssClass(className, elementDomId) {
			var element = Ext.get(elementDomId);
			element.addCls(className);
		}

		return {
			title: editor.lang.table.title,
			minWidth: 100,
			minHeight: CKEDITOR.env.ie ? 150 : 120,
			resizable: CKEDITOR.DIALOG_RESIZE_NONE,
			onLoad: function() {
				var dialog = this;

				var styles = dialog.getContentElement( 'advanced', 'advStyles' );

				if ( styles ) {
					styles.on( 'change', function() {
						// Synchronize width value.
						var width = this.getStyle( 'width', '' ),
							txtWidth = dialog.getContentElement( 'info', 'txtWidth' );

						txtWidth && txtWidth.setValue( width, true );

						// Synchronize height value.
						var height = this.getStyle( 'height', '' ),
							txtHeight = dialog.getContentElement( 'info', 'txtHeight' );

						txtHeight && txtHeight.setValue( height, true );
					} );
				}
			},
			onShow: function() {
				// Detect if there's a selected table.
				var selection = editor.getSelection(),
					ranges = selection.getRanges(),
					table;

				var rowsInput = this.getContentElement( 'info', 'txtRows' ),
					colsInput = this.getContentElement( 'info', 'txtCols' ),
					widthInput = this.getContentElement( 'info', 'txtWidth' ),
					heightInput = this.getContentElement( 'info', 'txtHeight' );
				addCssClass("cke_table_" + rowsInput.id, rowsInput.domId);
				addCssClass("cke_table_" + colsInput.id, colsInput.domId);
				addCssClass("cke_table_" + widthInput.id, widthInput.domId);
				addCssClass("cke_table_" + heightInput.id, heightInput.domId);

				if ( command == 'tableProperties' ) {
					var selected = selection.getSelectedElement();
					if ( selected && selected.is( 'table' ) )
						table = selected;
					else if ( ranges.length > 0 ) {
						// Webkit could report the following range on cell selection (https://dev.ckeditor.com/ticket/4948):
						// <table><tr><td>[&nbsp;</td></tr></table>]
						if ( CKEDITOR.env.webkit )
							ranges[ 0 ].shrink( CKEDITOR.NODE_ELEMENT );

						table = editor.elementPath( ranges[ 0 ].getCommonAncestor( true ) ).contains( 'table', 1 );
					}

					// Save a reference to the selected table, and push a new set of default values.
					this._.selectedElement = table;
				}

				// Enable or disable the row, cols, width fields.
				if ( table ) {
					this.setupContent( table );
					rowsInput && rowsInput.disable();
					colsInput && colsInput.disable();
				} else {
					rowsInput && rowsInput.enable();
					colsInput && colsInput.enable();
				}

				// Call the onChange method for the widht and height fields so
				// they get reflected into the Advanced tab.
				widthInput && widthInput.onChange();
				heightInput && heightInput.onChange();
			},
			onOk: function() {
				var selection = editor.getSelection(),
					bms = this._.selectedElement && selection.createBookmarks();

				var table = this._.selectedElement || makeElement( 'table' ),
					data = {};

				this.commitContent( data, table );
				table.setAttribute( 'border', 1 );
				if ( data.info ) {
					var info = data.info;

					// Generate the rows and cols.
					if ( !this._.selectedElement ) {
						var tbody = table.append( makeElement( 'tbody' ) ),
							rows = parseInt( info.txtRows, 10 ) || 0,
							cols = parseInt( info.txtCols, 10 ) || 0;

						for ( var i = 0; i < rows; i++ ) {
							var row = tbody.append( makeElement( 'tr' ) );
							for ( var j = 0; j < cols; j++ ) {
								var cell = row.append( makeElement( 'td' ) );
								cell.appendBogus();
							}
						}
					}

					// Modify the table headers. Depends on having rows and cols generated
					// correctly so it can't be done in commit functions.

					// Should we make a <thead>?
					var headers = info.selHeaders;
					if ( !table.$.tHead && ( headers == 'row' || headers == 'both' ) ) {
						var thead = table.getElementsByTag( 'thead' ).getItem( 0 );
						tbody = table.getElementsByTag( 'tbody' ).getItem( 0 );
						var theRow = tbody.getElementsByTag( 'tr' ).getItem( 0 );

						if ( !thead ) {
							thead = new CKEDITOR.dom.element( 'thead' );
							thead.insertBefore( tbody );
						}

						// Change TD to TH:
						for ( i = 0; i < theRow.getChildCount(); i++ ) {
							var th = theRow.getChild( i );
							// Skip bookmark nodes. (https://dev.ckeditor.com/ticket/6155)
							if ( th.type == CKEDITOR.NODE_ELEMENT && !th.data( 'cke-bookmark' ) ) {
								th.renameNode( 'th' );
								th.setAttribute( 'scope', 'col' );
							}
						}
						thead.append( theRow.remove() );
					}

					if ( table.$.tHead !== null && !( headers == 'row' || headers == 'both' ) ) {
						// Move the row out of the THead and put it in the TBody:
						thead = new CKEDITOR.dom.element( table.$.tHead );
						tbody = table.getElementsByTag( 'tbody' ).getItem( 0 );

						var previousFirstRow = tbody.getFirst();
						while ( thead.getChildCount() > 0 ) {
							theRow = thead.getFirst();
							for ( i = 0; i < theRow.getChildCount(); i++ ) {
								var newCell = theRow.getChild( i );
								if ( newCell.type == CKEDITOR.NODE_ELEMENT ) {
									newCell.renameNode( 'td' );
									newCell.removeAttribute( 'scope' );
								}
							}
							theRow.insertBefore( previousFirstRow );
						}
						thead.remove();
					}

					// Should we make all first cells in a row TH?
					if ( !this.hasColumnHeaders && ( headers == 'col' || headers == 'both' ) ) {
						for ( row = 0; row < table.$.rows.length; row++ ) {
							newCell = new CKEDITOR.dom.element( table.$.rows[ row ].cells[ 0 ] );
							newCell.renameNode( 'th' );
							newCell.setAttribute( 'scope', 'row' );
						}
					}

					// Should we make all first TH-cells in a row make TD? If 'yes' we do it the other way round :-)
					if ( ( this.hasColumnHeaders ) && !( headers == 'col' || headers == 'both' ) ) {
						for ( i = 0; i < table.$.rows.length; i++ ) {
							row = new CKEDITOR.dom.element( table.$.rows[ i ] );
							if ( row.getParent().getName() == 'tbody' ) {
								newCell = new CKEDITOR.dom.element( row.$.cells[ 0 ] );
								newCell.renameNode( 'td' );
								newCell.removeAttribute( 'scope' );
							}
						}
					}

					// Set the width and height.
					info.txtHeight ? table.setStyle( 'height', info.txtHeight ) : table.removeStyle( 'height' );
					info.txtWidth ? table.setStyle( 'width', info.txtWidth ) : table.removeStyle( 'width' );
					table.setStyle( 'border-spacing', 'initial' );
					table.setStyle( 'border-collapse', 'collapse' );

					if ( !table.getAttribute( 'style' ) )
						table.removeAttribute( 'style' );
				}

				// Insert the table element if we're creating one.
				if ( !this._.selectedElement ) {
					editor.insertElement( table );
					// Override the default cursor position after insertElement to place
					// cursor inside the first cell (https://dev.ckeditor.com/ticket/7959), IE needs a while.
					setTimeout( function() {
						var firstCell = new CKEDITOR.dom.element( table.$.rows[ 0 ].cells[ 0 ] );
						var range = editor.createRange();
						range.moveToPosition( firstCell, CKEDITOR.POSITION_AFTER_START );
						range.select();
					}, 0 );
				}
				// Properly restore the selection, (https://dev.ckeditor.com/ticket/4822) but don't break
				// because of this, e.g. updated table caption.
				else {
					try {
						selection.selectBookmarks( bms );
					} catch ( er ) {
					}
				}
			},
			contents: [ {
				id: 'info',
				label: editor.lang.table.title,
				elements: [ {
					type: 'hbox',
					styles: [ 'vertical-align:top' ],
					children: [{
						type: 'vbox',
						padding: 0,
						children: [ {
							type: 'text',
							id: 'txtRows',
							'default': 3,
							label: editor.lang.table.rows,
							required: true,
							controlStyle: 'width:6em;margin-right:3em',
							validate: validatorNum( editor.lang.table.invalidRows ),
							setup: function( selectedElement ) {
								this.setValue( selectedElement.$.rows.length );
							},
							commit: commitValue
						},
						{
							type: 'text',
							id: 'txtCols',
							'default': 2,
							label: editor.lang.table.columns,
							required: true,
							controlStyle: 'width:6em;margin-right:3em',
							validate: validatorNum( editor.lang.table.invalidCols ),
							setup: function( selectedTable ) {
								this.setValue( tableColumns( selectedTable ) );
							},
							commit: commitValue
						}]
					},
					{
						type: 'vbox',
						padding: 0,
						children: [ {
							type: 'hbox',
							widths: [ '6em' ],
							children: [ {
								type: 'text',
								id: 'txtWidth',
								requiredContent: 'table{width}',
								controlStyle: 'width:6em',
								label: editor.lang.common.width,
								title: editor.lang.common.cssLengthTooltip,
								// Smarter default table width. (https://dev.ckeditor.com/ticket/9600)
								'default': editor.filter.check( 'table{width}' ) ? ( editable.getSize( 'width' ) < 500 ? '100%' : 500 ) : 0,
								getValue: defaultToPixel,
								validate: CKEDITOR.dialog.validate.cssLength( editor.lang.common.invalidCssLength.replace( '%1', editor.lang.common.width ) ),
								onChange: function() {
									var styles = this.getDialog().getContentElement( 'advanced', 'advStyles' );
									styles && styles.updateStyle( 'width', this.getValue() );
								},
								setup: function( selectedTable ) {
									var val = selectedTable.getStyle( 'width' );
									this.setValue( val );
								},
								commit: commitValue
							} ]
						},
						{
							type: 'hbox',
							widths: [ '6em' ],
							children: [ {
								type: 'text',
								id: 'txtHeight',
								requiredContent: 'table{height}',
								controlStyle: 'width:6em',
								label: editor.lang.common.height,
								title: editor.lang.common.cssLengthTooltip,
								'default': '',
								getValue: defaultToPixel,
								validate: CKEDITOR.dialog.validate.cssLength( editor.lang.common.invalidCssLength.replace( '%1', editor.lang.common.height ) ),
								onChange: function() {
									var styles = this.getDialog().getContentElement( 'advanced', 'advStyles' );
									styles && styles.updateStyle( 'height', this.getValue() );
								},

								setup: function( selectedTable ) {
									var val = selectedTable.getStyle( 'height' );
									val && this.setValue( val );
								},
								commit: commitValue
							} ]
						}]
					} ]
				} ]
			}
		] };
	}

	CKEDITOR.on("dialogDefinition", function(event) {
		var dialogName = event.data.name;
		var dialogDefinition = event.data.definition;
		if ( dialogName === 'bpmonlinetable' ) {
			var scope = this;
			dialogDefinition.onFocus = function() {
				var dialog = this.parts.dialog.$;
				var dialogWrapEl = Ext.get(dialog);
				dialogWrapEl.addCls("cke_no_min_size");
			};
		}
	});
	CKEDITOR.dialog.add( 'bpmonlinetable', function( editor ) {
		return tableDialog( editor, 'table' );
	} );
	CKEDITOR.dialog.add( 'bpmonlinetableProperties', function( editor ) {
		return tableDialog( editor, 'tableProperties' );
	} );
} )();