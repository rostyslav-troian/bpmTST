/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.plugins.add( 'bpmonlinetable', {
	requires: 'dialog,bpmonlinetabletools',
	// jscs:disable maximumLineLength
	lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
	// jscs:enable maximumLineLength
	icons: 'bpmonlinetable', // %REMOVE_LINE_CORE%
	init: function( editor ) {
		if ( editor.blockless )
			return;
		var lang = editor.lang.table;

		editor.addCommand( 'table', new CKEDITOR.dialogCommand( 'bpmonlinetable', {
			context: 'table',
			allowedContent: 'table{width,height}[align,border,cellpadding,cellspacing,summary];' +
				'caption tbody thead tfoot;' +
				'th td tr[scope];' +
				( editor.plugins.dialogadvtab ? 'table' + editor.plugins.dialogadvtab.allowedContent() : '' ),
			requiredContent: 'table',
			contentTransformations: [
				[ 'table{width}: sizeToStyle', 'table[width]: sizeToAttribute' ],
				[ 'td: splitBorderShorthand' ],
				[ {
					element: 'table',
					right: function( element ) {
						if ( element.styles ) {
							var parsedStyle;
							if ( element.styles.border ) {
								parsedStyle = CKEDITOR.tools.style.parse.border( element.styles.border );
							} else if ( CKEDITOR.env.ie && CKEDITOR.env.version === 8 ) {
								var styleData = element.styles;
								// Workaround for IE8 browser. It transforms CSS border shorthand property
								// to the longer one, consisting of border-top, border-right, etc. We have to check
								// if all those properties exists and have the same value (#566).
								if ( styleData[ 'border-left' ] && styleData[ 'border-left' ] === styleData[ 'border-right' ] &&
									styleData[ 'border-right' ] === styleData[ 'border-top' ] &&
									styleData[ 'border-top' ] === styleData[ 'border-bottom' ] ) {

									parsedStyle = CKEDITOR.tools.style.parse.border( styleData[ 'border-top' ] );
								}
							}
							if ( parsedStyle && parsedStyle.style && parsedStyle.style === 'solid' &&
								parsedStyle.width && parseFloat( parsedStyle.width ) !== 0 ) {
								element.attributes.border = 1;
							}
							if ( element.styles[ 'border-collapse' ] == 'collapse' ) {
								element.attributes.cellspacing = 0;
							}
						}
					}
				} ]
			]
		} ) );

		function createDef( def ) {
			return CKEDITOR.tools.extend( def || {}, {
				contextSensitive: 1,
				refresh: function( editor, path ) {
					this.setState( path.contains( 'table', 1 ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );
				}
			} );
		}

		editor.addCommand( 'tableProperties', new CKEDITOR.dialogCommand( 'bpmonlinetableProperties', createDef() ) );
		editor.addCommand( 'tableDelete', createDef( {
			exec: function( editor ) {
				var path = editor.elementPath(),
					table = path.contains( 'table', 1 );

				if ( !table )
					return;

				// If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element)
				//(https://dev.ckeditor.com/ticket/5416, https://dev.ckeditor.com/ticket/6289, https://dev.ckeditor.com/ticket/12110)
				var parent = table.getParent(),
					editable = editor.editable();

				if ( parent.getChildCount() == 1 && !parent.is( 'td', 'th' ) && !parent.equals( editable ) )
					table = parent;

				var range = editor.createRange();
				range.moveToPosition( table, CKEDITOR.POSITION_BEFORE_START );
				table.remove();
				range.select();
			}
		} ) );

		CKEDITOR.dialog.add( 'bpmonlinetable', this.path + 'dialogs/table.js' );
		CKEDITOR.dialog.add( 'bpmonlinetableProperties', this.path + 'dialogs/table.js' );

		var bpmonlineLang = Terrasoft.Resources.ExternalLibraries.CKEditor || {};
		editor.addMenuGroup("bpmonlinetable_group");
		editor.addMenuItems({
			table: {
				label: bpmonlineLang.CreateTable || "Create table",
				icon: "tablecreate",
				group: "bpmonlinetable_group",
				command: "table",
				order: 1
			},
			split_row: {
				label: lang.cell.splitHorizontal,
				icon: "split_row",
				group: "bpmonlinetable_group",
				command: "cellHorizontalSplit",
				order: 3
			},
			split_column: {
				label: lang.cell.splitVertical,
				icon: "split_column",
				group: "bpmonlinetable_group",
				command: "cellVerticalSplit",
				order: 4
			},
			insert: {
				label: bpmonlineLang.Insert || "Insert",
				icon: "tableinsert",
				group: "bpmonlinetable_group",
				order: 5,
				getItems: function() {
					return {
						insert_row_before: CKEDITOR.TRISTATE_OFF,
						insert_row_after: CKEDITOR.TRISTATE_OFF,
						insert_column_before: CKEDITOR.TRISTATE_OFF,
						insert_column_after: CKEDITOR.TRISTATE_OFF
					}
				}
			},
			insert_row_before: {
				icon: "tableinsert_rowbefore",
				label: lang.row.insertBefore,
				command: 'rowInsertBefore',
				group: 'bpmonlinetable_group',
				order: 10
			},
			insert_row_after: {
				icon: "tableinsert_rowafter",
				label: lang.row.insertAfter,
				command: 'rowInsertAfter',
				group: 'bpmonlinetable_group',
				order: 11
			},
			insert_column_before: {
				label: lang.column.insertBefore,
				icon: "tableinsert_columnbefore",
				group: 'bpmonlinetable_group',
				command: 'columnInsertBefore',
				order: 12
			},
			insert_column_after: {
				label: lang.column.insertAfter,
				icon: "tableinsert_columnafter",
				group: 'bpmonlinetable_group',
				command: 'columnInsertAfter',
				order: 13
			},
			tabledelete_menu: {
				label: bpmonlineLang.Delete || "Delete",
				icon: "tabledelete_menu",
				group: "bpmonlinetable_group",
				order: 6,
				getItems: function() {
					return {
						tablecell_delete: CKEDITOR.TRISTATE_OFF,
						tablerow_delete: CKEDITOR.TRISTATE_OFF,
						tabledelete: CKEDITOR.TRISTATE_OFF
					}
				}
			},
			tablerow_delete: {
				label: lang.row.deleteRow,
				icon: "tabledelete_row",
				group: 'bpmonlinetable_group',
				command: 'rowDelete',
				order: 15
			},
			tablecell_delete: {
				label: lang.column.deleteColumn,
				icon: "tabledelete_cell",
				group: 'bpmonlinetable_group',
				command: 'columnDelete',
				order: 16
			},
			tabledelete: {
				label: lang.deleteTable,
				icon: "tabledelete",
				group: 'bpmonlinetable_group',
				command: 'tableDelete',
				order: 17
			}

		});
		
		editor.ui.add("bpmonlinetable", CKEDITOR.UI_MENUBUTTON, {
			label: "",
			icon: "table",
			modes: {wysiwyg: 1},
			onMenu: function() {
				return {
					table: CKEDITOR.TRISTATE_OFF,
					merge: CKEDITOR.TRISTATE_OFF,
					split_row: CKEDITOR.TRISTATE_OFF,
					split_column: CKEDITOR.TRISTATE_OFF,
					insert: CKEDITOR.TRISTATE_OFF,
					tabledelete_menu: CKEDITOR.TRISTATE_OFF
				};
			}
		});
	}

} );
