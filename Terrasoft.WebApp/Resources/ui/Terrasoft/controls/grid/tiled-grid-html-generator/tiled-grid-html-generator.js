/**
 * Representation of the tiled grid.
 */
Ext.define("Terrasoft.controls.TiledGridHtmlGenerator", {
	extend: "Terrasoft.GridHtmlGenerator",
	alternateClassName: "Terrasoft.TiledGridHtmlGenerator",

	//region Methods: Protected

	/**
	 * Appends multiSelect config to general html config.
	 * @protected
	 * @param {Object} renderOptions Render options.
	 * @param {Object} htmlConfig Html config.
	 * @param {String} rowId Id of the row.
	 */
	appendCheckboxes: function(renderOptions, htmlConfig, rowId) {
		const checkbox = this.createCheckbox({
			value: rowId
		});
		if (Terrasoft.contains(renderOptions.selectedRows, rowId)) {
			htmlConfig.cls += " " + this.selectedRowCss;
			checkbox.setChecked(true);
		}
		htmlConfig.children.push({
			tag: "div",
			cls: "grid-fixed-col",
			html: checkbox.generateHtml()
		});
		renderOptions.checkboxes.push(checkbox);
	},

	//endregion

	//region Methods: Public

	/**
	 * Method for append tiled grid content html.
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 * @param {Object} renderOptions Render options.
	 */
	appendGridContent: function(result, options, renderOptions) {
		const rows = options.rows || renderOptions.rows;
		for (let index = 0, length = rows.length; index < length; index += 1) {
			const row = rows[index];
			options.row = row;
			const rowId = (row[this.primaryColumnName] || index).toString();
			const rowStyles = this.rowsStyles[rowId];
			const htmlConfig = this.getDefaultRowHtmlConfig(row);
			Ext.apply(htmlConfig, {
				tag: "div",
				cls: "grid-row grid-pad " + this.theoreticallyActiveRowCss,
				style: Ext.DomHelper.generateStyles(rowStyles),
				id: this.gridId + this.collectionItemPrefix + rowId,
				children: []
			});
			if (renderOptions.multiSelect) {
				this.appendCheckboxes(renderOptions, htmlConfig, rowId);
			} else {
				if (renderOptions.activeRow === rowId) {
					htmlConfig.cls += " " + this.activeRowCss;
				}
			}
			this.renderColumns(htmlConfig.children, options, renderOptions);
			if (this.useRowActionsExternal) {
				htmlConfig.children.push({
					tag: "div",
					id: this.gridId + this.rowActionsExternalPrefix + rowId,
					cls: this.rowActionsExternalCss,
					children: [
						{
							tag: "div",
							cls: this.colsCss + "-24"
						}
					]
				});
			}
			result.push(htmlConfig);
		}
	},

	/**
	 * Method for render tiled grid.
	 * @deprecated
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 * @param {Object} renderOptions Render options.
	 */
	renderGrid: function(result, options, renderOptions) {
		this.appendGridContent(result, options, renderOptions);
	}

	//endregion

});
