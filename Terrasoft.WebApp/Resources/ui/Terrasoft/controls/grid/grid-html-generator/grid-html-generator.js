/**
 * Representation of the list grid.
 */
Ext.define("Terrasoft.controls.GridHtmlGenerator", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.GridHtmlGenerator",

	mixins: ["Terrasoft.GridCellFormatter"],

	//region Fields: Public

	/**
	 * Id of the grid.
	 * @type {String}
	 */
	gridId: null,

	/**
	 * Row styles object.
	 * @type {Object}
	 */
	rowsStyles: null,

	/**
	 * Primary column name.
	 * @type {String}
	 */
	primaryColumnName: null,

	/**
	 * Column name to be defined data item marker attribute.
	 * @type {String}
	 */
	rowDataItemMarkerColumnName: null,

	/**
	 *PrimaryDisplayColumnName from rows collection.
	 */
	primaryDisplayColumnName: null,

	/**
	 * Dom element prefix for one model from the collection.
	 * @property {String} collectionItemPrefix
	 */
	collectionItemPrefix: null,

	/**
	 * Grid type.
	 * @type {Terrasoft.GridType}
	 */
	type: null,

	/**
	 * Listed grid config.
	 * @type {Object}
	 */
	listedConfig: null,

	/**
	 * Tiled grid config.
	 * @type {Object}
	 */
	tiledConfig: null,

	/**
	 * Grid columns config.
	 * @type {Array}
	 */
	columnsConfig: null,

	/**
	 * Grid columns config.
	 * @type {Array}
	 */
	captionsConfig: null,

	/**
	 * Flag, shows that partly empty rows would be rendered.
	 * @type {Boolean}
	 */
	isEmptyRowVisible: false,

	/**
	 * Flag, shows that grid is vertical.
	 */
	isVertical: null,

	/**
	 * Grid column element css class prefix.
	 * @protected
	 */
	colsCss: null,

	/**
	 * List of #type describing "self-serving" (not subject to external processing,
	 * contain everything necessary for its full operation in the configuration object itself)
	 * types in the configuration of the #columnsConfig columns.
	 * @protected
	 * @property {String[]} internalColumns
	 */
	internalColumns: ["caption", "label"],

	/**
	 * Index of hierarchical display of data in the list.
	 * @cfg {Boolean} [hierarchical="false"]
	 */
	hierarchical: null,

	/**
	 * CSS class indicating that the DOM element can be selected.
	 * @protected
	 * @property {String} theoreticallyActiveRowCss
	 */
	theoreticallyActiveRowCss: null,

	/**
	 * Grid listed row css class prefix.
	 * @protected
	 */
	listedRowsCss: null,

	/**
	 * The CSS class used to highlight the row of the list.
	 * @protected
	 * @property {String} selectedRowCss
	 */
	selectedRowCss: null,

	/**
	 * Css class for the active row of the list.
	 * @protected
	 * @property {String} activeRowCss
	 */
	activeRowCss: null,

	/**
	 * Indicates the need to add external rows to the registry.
	 * @cfg {Boolean} [useRowActionsExternal=false]
	 */
	useRowActionsExternal: false,

	/**
	 * The prefix for the DOM of the Container ID of the external row action handlers.
	 * @protected
	 * @property {String} rowActionsExternalPrefix
	 */
	rowActionsExternalPrefix: "-external-actions-item-",

	/**
	 * CSS class to denote the container element of the external processing of row actions in the DOM.
	 * @protected
	 * @property {String} rowActionsExternalCss
	 */
	rowActionsExternalCss: "grid-row-actions-external",

	/**
	 * Span cell template
	 */
	_spanCellTemplate: null,

	/**
	 * The prefix of the DOM element identifier used to sign the columns of the list.
	 * @protected
	 * @property {String} captionPrefix
	 */
	captionPrefix: "-caption-",

	/**
	 * Grid class name
	 * @type {String}
	 */
	className: null,

	/**
	 * Listed grid captions row css class.
	 * @protected
	 */
	captionsCss: "grid-captions",

	//endregion

	//region Methods: Private

	/**
	 * Renders vertical grid cells.
	 * @private
	 * @param {Object} column Profile column.
	 * @param {Number} rowReadyState Current row state.
	 * @param {Object} renderRowOptions Render row options.
	 * @param {Object} htmlConfig Html config.
	 * @param {Object} renderOptions Render options.
	 * @return {Number} Current row state
	 */
	renderVerticalGridCells: function(column, rowReadyState, renderRowOptions, htmlConfig, renderOptions) {
		Terrasoft.each(column, function(col) {
			rowReadyState += this.renderRowCell(renderRowOptions, col, htmlConfig, renderOptions);
		}, this);
		return rowReadyState;
	},

	/**
	 * Prepares config and render cell.
	 * @private
	 * @param {Object} renderRowOptions Render row options.
	 * @param {Object} column Profile column.
	 * @param {Object} htmlConfig Html config.
	 * @return {Number} Cell ready state.
	 */
	renderRowCell: function(renderRowOptions, column, htmlConfig, renderOptions) {
		renderRowOptions.cell = column;
		if (htmlConfig.cls.indexOf("grid-module") < 0) {
			htmlConfig.cls += " grid-module";
		}
		return this.renderCell(htmlConfig.children, renderRowOptions, renderOptions);
	},

	/**
	 * Gets if not need append empty row.
	 * @private
	 * @param {Number} rowReadyState Row ready state.
	 * @param {Number} columnLength Column length.
	 * @param {Number} verticalCellElementLength Vertical cell element length.
	 * @return {Boolean} True if not need append empty row.
	 */
	_isNotNeedAppendEmptyRow: function(rowReadyState, columnLength, verticalCellElementLength) {
		const isVertical = this.isVertical;
		if (this.isEmptyRowVisible === false) {
			if (!isVertical && columnLength > rowReadyState) {
				return true;
			}
			if (isVertical && verticalCellElementLength > rowReadyState) {
				return true;
			}
		}
		return false;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Method for creating the Terrasoft.CheckBoxEdit element.
	 * @protected
	 * @param {Object} config
	 * @return {Terrasoft.CheckBoxEdit}
	 */
	createCheckbox: function(config) {
		return Ext.create("Terrasoft.CheckBoxEdit", config);
	},

	/**
	 * Returns default cell html config.
	 * @protected
	 * @param {Object} options Grid data render config.
	 * @return {Object} Default cell html config.
	 */
	getDefaultCellHtmlConfig: function(options) {
		var cell = options.cell;
		var cellClasses = [
			this.colsCss + "-" + cell.cols
		];
		var htmlConfig = {
			tag: "div",
			cls: cellClasses.join(" "),
			html: "",
			children: [],
			"grid-cell-type": []
		};
		return htmlConfig;
	},

	/**
	 * Render of the cell.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderCell: function(result, options, renderOptions) {
		var cellReadyState = 0;
		var cell = options.cell;
		var data = options.row;
		var link = this.getDataKey(options.cell.link, renderOptions.columnBindings);
		var styles = {};
		var htmlConfig = this.getDefaultCellHtmlConfig(options);
		if (cell.minHeight) {
			styles["min-height"] = cell.minHeight;
		}
		if (cell.maxHeight) {
			styles["max-height"] = cell.maxHeight;
			styles.overflow = "hidden";
		}
		htmlConfig.style = Ext.DomHelper.generateStyles(styles);
		var key = cell.key;
		if (Ext.isArray(key)) {
			for (var i = 0, length = key.length; i < length; i += 1) {
				var column = key[i];
				cellReadyState += this.formatCellContent(htmlConfig, data, column, link, renderOptions);
			}
		}
		if (Ext.isObject(key)) {
			cellReadyState += this.formatCellContent(htmlConfig, data, key, link, renderOptions);
		}
		htmlConfig["grid-cell-type"] = Ext.Array.intersect(htmlConfig["grid-cell-type"]);
		if (htmlConfig["grid-cell-type"].length > 0) {
			htmlConfig["grid-cell-type"] = htmlConfig["grid-cell-type"].join(" ");
		} else {
			delete htmlConfig["grid-cell-type"];
		}
		if (cellReadyState > 0) {
			result.push(htmlConfig);
			return 1;
		} else {
			htmlConfig.html = "";
			result.push(htmlConfig);
			return 0;
		}
	},

	/**
	 * Returns default html config for row.
	 * @protected
	 * @param {Object} row Row object.
	 * @return {Object} Default row html config.
	 */
	getDefaultRowHtmlConfig: function(row) {
		var htmlConfig = {};
		var rowDataItemMarkerColumnName = this.rowDataItemMarkerColumnName || this.primaryDisplayColumnName;
		if (rowDataItemMarkerColumnName) {
			var markerValue = row[rowDataItemMarkerColumnName];
			if (!Ext.isEmpty(markerValue)) {
				Ext.apply(htmlConfig, {
					"data-item-marker": this.encodeHtml(markerValue)
				});
			}
		}
		return htmlConfig;
	},

	/**
	 * The method for starting the data rendering on the row settings file.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderColumns: function(result, options, renderOptions) {
		var columns = this.getColumnsConfig();
		for (var level = 0, length = columns.length; level < length; level++) {
			options.columnIndex = level;
			var column = columns[level];
			if (Ext.isArray(column)) {
				options.column = column;
				this.renderRow(result, options, renderOptions);
			}
			if (Ext.isObject(column)) {
				options.cell = column;
				this.renderCell(result, options, renderOptions);
			}
		}
	},

	/**
	 * Depending on the type, returns the current configuration of the columns.
	 * @protected
	 * @return {Array}
	 */
	getColumnsConfig: function() {
		var type = this.type;
		var config = this[type + "Config"];
		return (config ? config.columnsConfig : this.columnsConfig);
	},

	/**
	 * Depending on the type, returns the current header configuration.
	 * @return {Array}
	 */
	getCaptionsConfig: function() {
		var type = this.type;
		var config = this[type + "Config"];
		return (config ? config.captionsConfig : this.captionsConfig);
	},

	/**
	 * Render row.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderRow: function(result, options, renderOptions) {
		let rowReadyState = 0;
		const htmlConfig = {
			tag: "div",
			cls: "grid-row",
			children: []
		};
		let verticalCellElementLength = 0;
		const columnLength = options.column.length;
		for (let level = 0; level < columnLength; level ++) {
			const column = options.column[level];
			const newRenderOptions = Terrasoft.deepClone(options);
			if (Ext.isArray(column)) {
				if (this.isVertical) {
					verticalCellElementLength = column.length;
					rowReadyState = this.renderVerticalGridCells(column, rowReadyState, newRenderOptions, htmlConfig,
						renderOptions);
				} else {
					newRenderOptions.column = column;
					this.renderRow(htmlConfig.children, newRenderOptions, renderOptions);
					rowReadyState += 1;
				}
			}
			if (Ext.isObject(column)) {
				rowReadyState += this.renderRowCell(newRenderOptions, column, htmlConfig, renderOptions);
			}
		}
		if (this._isNotNeedAppendEmptyRow(rowReadyState, columnLength, verticalCellElementLength)) {
			return;
		}
		if (rowReadyState > 0) {
			result.push(htmlConfig);
		}
	},

	/**
	 * Generates default grid wrap html config.
	 * @protected
	 * @param {Object} renderOptions Render options.
	 * @return {Object} Wrap html config of the grid.
	 */
	generateDefaultContentWrapConfig: function() {
		const gridConfig = {
			tag: "div",
			cls: "grid-content",
			children: []
		};
		const htmlConfig = {
			tag: "div",
			cls: "grid-scroll",
			children: [gridConfig]
		};
		return htmlConfig;
	},

	//endregion

	//region Methods: Public

	/**
	 * Gets html config of the wrap grid element.
	 * @param {String[]} wrapClasses Wrap classes list.
	 * @return {Object} Html config of the wrap grid element.
	 */
	generateWrapHtmlConfig: function(wrapClasses) {
		const htmlConfig = {
			tag: "div",
			id: Ext.String.format("grid-{0}-wrap", this.gridId),
			cls: wrapClasses.join(" "),
			children: []
		};
		return htmlConfig;
	},

	/**
	 * Method for generates grid wrap html config.
	 * @param {Object} renderOptions Render options.
	 * @return {Object} Wrap html config of the grid.
	 */
	generateContentWrapConfig: function(renderOptions) {
		return this.generateDefaultContentWrapConfig(renderOptions);
	},

	/**
	 * Gets html grid content config.
	 * @param {Object} contentWrapConfig Wrap el html config.
	 * @return {Object} Html grid content config.
	 */
	getGridContentConfig: function(contentWrapConfig) {
		return contentWrapConfig.children[0];
	},

	/**
	 * Gets link of the horizontal scroll container.
	 * @param {Terrasoft.BaseViewGrid} grid Link of the grid instance.
	 * @return {Ext.Element} Link of the horizontal scroll container.
	 */
	getHorizontalScrollEl: function(grid) {
		return grid.getWrapEl();
	},

	/**
	 * Gets link of the vertical scroll container.
	 * @param {Terrasoft.BaseViewGrid} grid Link of the grid instance.
	 * @return {Ext.Element} Link of the horizontal scroll container.
	 */
	getVerticalScrollEl: function(grid) {
		return grid.getWrapEl();
	},

	/**
	 * Method for append grid content html.
	 * @abstract
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 * @param {Object} renderOptions Render options.
	 */
	appendGridContent: Terrasoft.abstractFn,

	/**
	 * Method for render grid.
	 * @deprecated
	 * @abstract
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 * @param {Object} renderOptions Render options.
	 */
	renderGrid: Terrasoft.abstractFn,

	/**
	 * Method for init dom events of the specified grid type.
	 */
	initDomEvents: Terrasoft.emptyFn

	//endregion
});
