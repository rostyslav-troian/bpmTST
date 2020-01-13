/**
 * Representation of the list grid.
 */
Ext.define("Terrasoft.controls.ListedGridHtmlGenerator", {
	extend: "Terrasoft.GridHtmlGenerator",
	alternateClassName: "Terrasoft.ListedGridHtmlGenerator",

	/**
	 * Grid listed row css class prefix.
	 * @protected
	 */
	listedRowsCss: "grid-listed-row",

	//region Methods: Protected

	/**
	 * Returns default caption cell html config.
	 * @protected
	 * @param {Object} captionConfig Config of the caption.
	 * @param {String} sortIndicator Sort indicator.
	 * @param {Number} index Cell index.
	 * @return {Object} Default caption cell html config.
	 */
	getDefaultCaptionCellHtmlConfig: function(captionConfig, sortIndicator, index) {
		const captionClasses = [
			this.colsCss + "-" + captionConfig.cols
		];
		const captionHtmlConfig = {
			tag: "div",
			cls: captionClasses.join(" "),
			html: "<label>" + captionConfig.name + "</label>" + sortIndicator,
			id: this.gridId + this.captionPrefix + index,
			"data-item-marker": captionConfig.name
		};
		return captionHtmlConfig;
	},

	/**
	 * Method for render listed grid captions.
	 * @protected
	 * @param {Object} renderOptions Render options.
	 * @param {Number} renderOptions.sortColumnIndex Column index of the sort column.
	 * @param {Terrasoft.core.enums.OrderDirection} renderOptions.sortColumnDirection Direction of the sort column.
	 * @param {String} renderOptions.sortIndicatorDown Down indicator of the sort column.
	 * @param {String} renderOptions.sortIndicatorUp Up indicator of the sort column.
	 * @param {Object} renderOptions.columnBindings Column bindings.
	 * @param {Object} renderOptions.cellsClasses Classes config of the cell.
	 * @return {Object} Html configuration information for rendering captions.
	 */
	renderCaptionsRow: function(renderOptions) {
		const captions = this.getCaptionsConfig();
		const columns = this.getColumnsConfig();
		const orderDirectionAsc = Terrasoft.core.enums.OrderDirection.ASC;
		const orderDirectionDesc = Terrasoft.core.enums.OrderDirection.DESC;
		const htmlConfig = {
			tag: "div",
			cls: this.captionsCss,
			children: []
		};
		Terrasoft.each(captions, function(captionConfig, columnIndex) {
			let sortIndicator = "";
			if (renderOptions.sortColumnIndex === columnIndex || captionConfig.sortColumnDirection) {
				if (renderOptions.sortColumnDirection === orderDirectionAsc) {
					sortIndicator = renderOptions.sortIndicatorUp;
				}
				if (renderOptions.sortColumnDirection === orderDirectionDesc) {
					sortIndicator = renderOptions.sortIndicatorDown;
				}
			}
			const caption = this.getDefaultCaptionCellHtmlConfig(captionConfig, sortIndicator, columnIndex, renderOptions);
			const column = columns[columnIndex];
			this.appendCaptionRow(column, caption, renderOptions, htmlConfig);
		}, this);
		return htmlConfig;
	},

	/**
	 * Render caption row. Appending row in htmlConfig.
	 * @protected
	 * @param {Object} [column] Column config.
	 * @param {String} [column.key] Key of the column config.
	 * @param {Object} caption Caption config.
	 * @param {Object} renderOptions Render options.
	 * @param {Object} renderOptions.columnBindings Column bindings.
	 * @param {Object} renderOptions.cellsClasses Classes config of the cell.
	 * @param {Object} htmlConfig Html configuration information for rendering row.
	 */
	appendCaptionRow: function(column, caption, renderOptions, htmlConfig) {
		if (column) {
			const key = column.key;
			let columnName;
			if (Ext.isArray(key)) {
				columnName = this.getDataKey(key[0].name, renderOptions.columnBindings);
			}
			if (Ext.isObject(key)) {
				columnName = this.getDataKey(key.name, renderOptions.columnBindings);
			}
			const cellClass = renderOptions.cellsClasses[columnName];
			if (cellClass && cellClass.typeClass) {
				caption["grid-caption-type"] = cellClass.typeClass;
			}
		}
		htmlConfig.children.push(caption);
	},

	/**
	 * Method for render listed grid content.
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 * @param {Object} renderOptions Render options.
	 */
	renderContent: function(result, options, renderOptions) {
		const rows = options.rows || renderOptions.rows;
		for (let index = 0, length = rows.length; index < length; index += 1) {
			const row = rows[index];
			options.row = row;
			const id = (row[this.primaryColumnName] || index).toString();
			const rowStyles = this.rowsStyles[id];
			const htmlConfig = this.getDefaultRowHtmlConfig(row);
			Ext.apply(htmlConfig, {
				tag: "div",
				cls: this.listedRowsCss + " " + this.theoreticallyActiveRowCss,
				style: Ext.DomHelper.generateStyles(rowStyles),
				id: this.gridId + this.collectionItemPrefix + id,
				children: []
			});
			this.renderColumns(htmlConfig.children, options, renderOptions);
			if (renderOptions.multiSelect) {
				this.appendCheckboxes(htmlConfig, id, renderOptions);
			} else {
				if (renderOptions.activeRow === id) {
					htmlConfig.cls += " " + this.activeRowCss;
				}
			}
			result.push(htmlConfig);
		}
	},

	/**
	 * Appends checkboxes to result html config.
	 * @protected
	 * @param {Object} htmlConfig Html configuration information for rendering row.
	 * @param {String} rowId Id of the row.
	 * @param {Object} renderOptions Render options.
	 */
	appendCheckboxes: function(htmlConfig, rowId, renderOptions) {
		htmlConfig.children.unshift({
			tag: "div",
			cls: "grid-fixed-col",
			html: ""
		});
		const fixedCol = htmlConfig.children[0];
		const checkbox = this.createCheckbox({
			classes: {
				wrapClass: ["grid-listed-row-control"]
			},
			value: rowId
		});
		if (Terrasoft.contains(renderOptions.selectedRows, rowId)) {
			htmlConfig.cls += " " + this.selectedRowCss;
			checkbox.setChecked(true);
		}
		fixedCol.html = checkbox.generateHtml() + htmlConfig.children[0].html;
		renderOptions.checkboxes.push(checkbox);
	},

	//endregion

	//region Methods: Public

	/**
	 * Method for append listed grid content html.
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 * @param {Object} renderOptions Render options.
	 */
	appendGridContent: function(result, options, renderOptions) {
		result.push(this.renderCaptionsRow(renderOptions));
		this.renderContent(result, options, renderOptions);
	},

	/**
	 * Method for render listed grid.
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
