/**
 */
Ext.define("Terrasoft.controls.GridLayoutTableEdit", {
	alternateClassName: "Terrasoft.GridLayoutTableEdit",
	extend: "Terrasoft.GridLayoutEdit",

	/**
	 * Regular expression pattern analysis of HTML-markup component to parameterize selector suffixes.
	 * @private
	 * @type {String}
	 */
	/*jshint quotmark:false */
	selectorSuffixRegexTemplate: '{(\\w*)}',
	/*jshint quotmark:double */

	/**
	 * Array with columns captions configuration.
	 * Example:
	 * [
	 *  {caption: "Column 1"},
	 *  {caption: "Column 2"},
	 *  {caption: "Column 3"}
	 * ]
	 * @type {Array}
	 */
	columnsCaptionsConfig: null,

	/**
	 * Array with rows captions configuration.
	 * Example:
	 * [
	 *  {caption: "Row 1"},
	 *  {caption: "Row 2"},
	 *  {caption: "Row 3"}
	 * ]
	 * @type {Object}
	 */
	rowsCaptionsConfig: null,

	/**
	 * Object with rows captions header configuration.
	 * Example:
	 *      {caption: "Month / Activity"}
	 * @type {Object}
	 */
	rowsCaptionsHeaderConfig: null,

	/**
	 * @inheritdoc Terrasoft.GridLayoutEdit#fixedCellWidth
	 * @override
	 */
	fixedCellWidth: true,

	/**
	 * @inheritdoc Terrasoft.GridLayoutEdit#cellWidth
	 * @override
	 */
	cellWidth: 3.4,

	/**
	 * @inheritdoc Terrasoft.GridLayoutEdit#cellHeingt
	 * @override
	 */
	cellHeight: 3.5,

	/**
	 * @inheritdoc Terrasoft.GridLayoutEdit#itemClassName
	 * @override
	 */
	itemClassName: "Terrasoft.GridLayoutTableEditItem",

	/**
	 * Control template parameters object.
	 * @protected
	 * @type {Object}
	 */
	tplConfig: {
		classes: {
			controlWrapClasses: ["grid-layout-table-edit-wrap"],
			/* Rows captions */
			rowsCaptionsWrapClasses: ["grid-layout-table-edit-rows-captions-wrap"],
			rowsCaptionsHeaderClasses: ["grid-layout-table-edit-rows-captions-header"],
			rowsCaptionsHeaderCellClasses: ["grid-layout-table-edit-rows-captions-header-cell"],
			rowsCaptionsClasses: ["grid-layout-table-edit-rows-captions"],
			rowsCaptionsRowClasses: ["grid-layout-table-edit-rows-captions-row"],
			rowsCaptionsCellClasses: ["grid-layout-table-edit-rows-captions-cell"],
			/* Right part */
			rightWrapClasses: ["grid-layout-table-edit-right-wrap"],
			columnsHeaderClasses: ["grid-layout-table-edit-columns-header"],
			columnsHeaderRowClasses: ["grid-layout-table-edit-columns-header-row"],
			columnsHeaderCellClasses: ["grid-layout-table-edit-columns-header-cell"],
			gridClasses: ["grid-layout-table-edit-grid"],
			gridRowClasses: ["grid-layout-table-edit-grid-row"],
			gridCellClasses: ["grid-layout-table-edit-grid-cell"],
			selectionBorderClasses: {
				top: "grid-layout-table-edit-selection-border-top",
				bottom: "grid-layout-table-edit-selection-border-bottom",
				left: "grid-layout-table-edit-selection-border-left",
				right: "grid-layout-table-edit-selection-border-right"
			}
		},
		/* DOM elements suffixes*/
		selectorSuffixes: {
			wrap: "grid-layout-table-edit-wrapper",
			table: "grid-layout-table-edit-grid",
			row: "grid-layout-table-edit-grid-row",
			cell: "grid-layout-table-edit-grid-cell",
			rightWrap: "grid-layout-table-edit-right-wrap",
			columnsHeader: "grid-layout-table-edit-columns-header",
			columnsHeaderRow: "grid-layout-table-edit-columns-header-row",
			columnsHeaderCell: "grid-layout-table-edit-columns-header-cell",
			rowsCaptionsWrap: "grid-layout-table-edit-rows-captions-wrap",
			rowsCaptionsHeader: "grid-layout-table-edit-rows-captions-header",
			rowsCaptionsHeaderCell: "grid-layout-table-edit-rows-captions-header-cell",
			rowsCaptions: "grid-layout-table-edit-rows-captions",
			rowsCaptionsRow: "grid-layout-table-edit-rows-captions-row",
			rowsCaptionsCell: "grid-layout-table-edit-rows-captions-cell"
		},
		styles: {},
		rowsCaptionsHeaderCellTpl: [
			"<div id=\"{id}-{rowsCaptionsHeaderCell}-{colIndex}\" " +
			"class=\"{rowsCaptionsHeaderCellClasses}\">{caption}</div>"
		],
		rowsCaptionsRowTpl: [
			"<div id=\"{id}-{rowsCaptionsRow}-{rowIndex}\" class=\"{rowsCaptionsRowClasses}\">{rowCell}</div>"
		],
		rowsCaptionsCellTpl: [
			"<div id=\"{id}-{rowsCaptionsCell}-{rowIndex}-{colIndex}\" class=\"{rowsCaptionsCellClasses}\">",
			"{caption}</div>"
		],
		columnsHeaderRowTpl: [
			"<div id=\"{id}-{columnsHeaderRow}\" class=\"{columnsHeaderRowClasses}\" ",
			"style=\"width:calc({rowWidth} + {scrollbarSize}px);\">{rowCells}</div>"
		],
		columnsHeaderCellTpl: [
			"<div id=\"{id}-{columnsHeaderCell}-{columnIndex}\" ",
			"class=\"{columnsHeaderCellClasses}\" style=\"{cellStyle}\">{caption}</div>"
		],
		gridTpl: [
			"<div id=\"{id}-{table}\" class=\"{gridClasses}\">{rows}</div>"
		],
		gridRowTpl: [
			"<div id=\"{id}-{row}-{rowIndex}\" data-row-index=\"{rowIndex}\" ",
			"has-columns-captions=\"{isHasColumnsCaptions}\" has-rows-captions=\"{isHasRowsCaptions}\" " +
			"category=\"{isCategory}\"",
			"class=\"{gridRowClasses}\" style=\"width:{rowWidth};\">{rowCells}</div>"
		],
		gridCellTpl: [
			"<div id=\"{id}-{cell}-{rowIndex}-{colIndex}\" data-row-index=\"{rowIndex}\" ",
			"data-column-index=\"{colIndex}\" data-selected=\"0\" class=\"{gridCellClasses}\" ",
			"style=\"{cellStyle}\"></div>"
		]
	},

	/**
	 * @inheritdoc Terrasoft.component#tpl
	 * @override
	 */
	tpl: [
		/*jshint white: false */
		"<div id=\"{id}-{wrap}\" class=\"{controlWrapClasses}\">",
		"<tpl if=\"isHasRowsCaptions\">",
		"<div id=\"{id}-{rowsCaptionsWrap}\" class=\"{rowsCaptionsWrapClasses}\">",
		"<div id=\"{id}-{rowsCaptionsHeader}\" class=\"{rowsCaptionsHeaderClasses}\">",
		"{%this.prepareRowsCaptionsHeaderTplData(out, values)%}",
		"</div>",
		"<div id=\"{id}-{rowsCaptions}\" class=\"{rowsCaptionsClasses}\">",
		"{%this.prepareRowsCaptionsTplData(out, values)%}",
		"</div>",
		"</div>",
		"</tpl>",
		"<div id=\"{id}-{rightWrap}\" class=\"{rightWrapClasses}\">",
		"<tpl if=\"isHasColumnsCaptions\">",
		"<div id=\"{id}-{columnsHeader}\" class=\"{columnsHeaderClasses}\">",
		"{%this.prepareColumnsHeaderTplData(out, values)%}",
		"</div>",
		"</tpl>",
		"{%this.prepareGridTplData(out, values)%}",
		"</div>"
		/*jshint white: true */
	],

	/**
	 * Templates cache.
	 * @protected
	 * type {Object}
	 */
	templatesCache: null,

	/**
	 * Current vertical scroll position.
	 * @private
	 * type {Number}
	 */
	currentScrollTop: 0,

	/**
	 * Current horizontal scroll position.
	 * @private
	 * type {Number}
	 */
	currentScrollLeft: 0,

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var selectors = this.selectors;
		var selectorSuffixes = this.tplConfig.selectorSuffixes;
		var elementsIdPrefix = Ext.String.format("#{0}-", this.id);
		selectors.rowsCaptionsWrapEl = elementsIdPrefix + selectorSuffixes.rowsCaptions;
		selectors.columnsCaptionsWrapEl = elementsIdPrefix + selectorSuffixes.columnsHeader;
		selectors.gridEl = elementsIdPrefix + selectorSuffixes.table;
		this.applyTplConfigProperties(tplData, "selectorSuffixes");
		tplData.isHasRowsCaptions = this.hasRowsCaptions();
		tplData.isHasColumnsCaptions = this.hasColumnsCaptions();
		tplData.prepareColumnsHeaderTplData = this.prepareColumnsHeaderTplData;
		tplData.prepareGridTplData = this.prepareGridTplData;
		tplData.prepareRowsCaptionsHeaderTplData = this.prepareRowsCaptionsHeaderTplData;
		tplData.prepareRowsCaptionsTplData = this.prepareRowsCaptionsTplData;
		return tplData;
	},

	/**
	 * Generates grid header HTML.
	 * @protected
	 * @param {Array} out An array of element markup.
	 * @param {Object} value Properties object.
	 */
	prepareColumnsHeaderTplData: function(out, value) {
		var self = value.self;
		var cellStyle = self.getCellStyle();
		var rowCells = [], cellHtml, columnCaption;
		var cellTemplate = self.getTemplateByHtmlTpl("columnsHeaderCellTpl", value);
		for (var column = 0; column < self.columns; column++) {
			columnCaption = self.columnsCaptionsConfig[column] ? self.columnsCaptionsConfig[column].caption : "";
			cellHtml = cellTemplate.apply({
				id: self.id,
				columnIndex: column,
				cellStyle: cellStyle,
				caption: columnCaption
			});
			rowCells.push(cellHtml);
		}
		var rowTemplate = self.getTemplateByHtmlTpl("columnsHeaderRowTpl", value);
		out.push(rowTemplate.apply({
			id: self.id,
			rowWidth: self.getRowWidth.call(self),
			scrollbarSize: Ext.getScrollbarSize().width,
			rowCells: rowCells.join("")
		}));
	},

	/**
	 * Generates rows captoion header HTML.
	 * @protected
	 * @param {Array} out An array of element markup.
	 * @param {Object} value Properties object.
	 */
	prepareRowsCaptionsHeaderTplData: function(out, value) {
		var self = value.self;
		if (!self.hasRowsCaptions()) {
			return;
		}
		var caption = self.rowsCaptionsHeaderConfig ? self.rowsCaptionsHeaderConfig.caption : "";
		var headerTemplate = self.getTemplateByHtmlTpl("rowsCaptionsHeaderCellTpl", value);
		out.push(headerTemplate.apply({
			id: self.id,
			colIndex: 0,
			caption: caption
		}));
	},

	/**
	 * Generates rows captoions HTML.
	 * @protected
	 * @param {Array} out An array of element markup.
	 * @param {Object} value Properties object.
	 */
	prepareRowsCaptionsTplData: function(out, value) {
		var self = value.self;
		var rows = [], rowHtml, cellHtml, rowCaption;
		if (!self.hasRowsCaptions()) {
			return;
		}
		var cellTemplate = self.getTemplateByHtmlTpl("rowsCaptionsCellTpl", value);
		var rowTemplate = self.getTemplateByHtmlTpl("rowsCaptionsRowTpl", value);
		for (var row = 0; row < self.rows; row++) {
			rowCaption = self.rowsCaptionsConfig[row] ? self.rowsCaptionsConfig[row].caption : "";
			cellHtml = cellTemplate.apply({
				id: self.id,
				rowIndex: row,
				colIndex: 0,
				caption: rowCaption
			});
			rowHtml = rowTemplate.apply({
				id: self.id,
				rowIndex: row,
				rowCell: cellHtml
			});
			rows.push(rowHtml);
		}
		out.push(rows.join(""));
	},

	/**
	 * Generates grid content HTML.
	 * @protected
	 * @param {Array} out An array of element markup.
	 * @param {Object} value Properties object.
	 */
	prepareGridTplData: function(out, value) {
		var self = value.self;
		out.push(self.generateGrid.call(self, value));
	},

	/**
	 * Generates row cells HTML.
	 * @protected
	 * @param {Number} rowIndex Row number.
	 * @param {Object} tplData Template data.
	 * @param config {Object}
	 * Properties:
	 *		{
	 *			isHasColumnsCaptions,
	 *			isHasRowsCaptions
	 *			rowTemplate,
	 *			rowWidth,
	 *			cellTemplate,
	 *			cellStyle
	 *		}
	 * @return {Array}
	 */
	generateRowCells: function(rowIndex, tplData, config) {
		var rowCells = [];
		for (var column = 0; column < this.columns; column++) {
			var cellHtml = config.cellTemplate.apply({
				id: this.id,
				rowIndex: rowIndex,
				colIndex: column,
				cellStyle: config.cellStyle
			});
			rowCells.push(cellHtml);
		}
		return rowCells;
	},

	/**
	 * Generates row HTML.
	 * @protected
	 * @param {Number} rowIndex Row number.
	 * @param {Object} tplData Template data.
	 * @param config {Object}
	 * Properties:
	 *		{
	 *			isHasColumnsCaptions,
	 *			isHasRowsCaptions
	 *			rowTemplate,
	 *			rowWidth,
	 *			cellTemplate,
	 *			cellStyle
	 *		}
	 * @return {String} Row html markup.
	 */
	generateRow: function(rowIndex, tplData, config) {
		var rowCells = this.generateRowCells(rowIndex, tplData, config);
		return config.rowTemplate.apply({
			id: this.id,
			rowIndex: rowIndex,
			rowWidth: config.rowWidth,
			isHasRowsCaptions: config.isHasRowsCaptions,
			isHasColumnsCaptions: config.isHasColumnsCaptions,
			rowCells: rowCells.join("")
		});
	},

	/**
	 * Generates grid HTML.
	 * @protected
	 * @param {Object} tplData Template data.
	 * @return {String} Grid html markup.
	 */
	generateGrid: function(tplData) {
		var gridTemplate = this.getTemplateByHtmlTpl("gridTpl", tplData);
		var config = {};
		config.isHasColumnsCaptions = this.hasColumnsCaptions() ? "1" : "0";
		config.isHasRowsCaptions = this.hasRowsCaptions() ? "1" : "0";
		config.rowTemplate = this.getTemplateByHtmlTpl("gridRowTpl", tplData);
		config.rowWidth = this.getRowWidth();
		config.cellTemplate = this.getTemplateByHtmlTpl("gridCellTpl", tplData);
		config.cellStyle = this.getCellStyle();
		var rows = [];
		for (var row = 0; row < this.rows; row++) {
			rows.push(this.generateRow(row, tplData, config));
		}
		return gridTemplate.apply({
			id: this.id,
			rows: rows.join("")
		});
	},

	/**
	 * Creates and returns template object by HTML fragment template with applied tplData values.
	 * @protected
	 * @param {String} tplConfigHtmlTemplateName HTML fragment template name.
	 * @param {Object} tplData Template data.
	 * @return {Ext.Template} Fragment template.
	 */
	getTemplateByHtmlTpl: function(tplConfigHtmlTemplateName, tplData) {
		var cachedValue = this.templatesCache[tplConfigHtmlTemplateName];
		if (!Ext.isEmpty(cachedValue)) {
			return cachedValue;
		}
		var template = this.tplConfig[tplConfigHtmlTemplateName];
		if (Ext.isArray(template)) {
			template = template.join("");
		}
		template = this.processTpl(this.cssRegexTemplate, template, tplData, function(cssClass) {
			var classString = Ext.isArray(cssClass) ? cssClass.join(" ") : cssClass;
			return "class=\"" + classString + "\"";
		});
		var regex = new RegExp(this.selectorSuffixRegexTemplate, "gm");
		template = template.replace(regex, function(matchedString, groupValue) {
			if (Ext.isEmpty(groupValue)) {
				return "";
			}
			var tplDataValue = tplData[groupValue];
			if (Ext.isEmpty(tplDataValue)) {
				return matchedString;
			}
			return tplDataValue;
		});
		template = template.replace(/\s+/g, " ");
		var resultTemplate = new Ext.Template(template);
		this.templatesCache[tplConfigHtmlTemplateName] = resultTemplate;
		return resultTemplate;
	},

	/**
	 * Handles grid scrolling.
	 * @protected
	 */
	onGridScroll: function() {
		var gridEl = this.gridEl;
		if (this.hasColumnsCaptions()) {
			var columnsHeaderEl = Ext.get(this.id + "-" + this.tplConfig.selectorSuffixes.columnsHeader);
			columnsHeaderEl.setScrollLeft(gridEl.getScrollLeft());
		}
		if (this.hasRowsCaptions()) {
			this.rowsCaptionsWrapEl.setScrollTop(gridEl.getScrollTop());
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.templatesCache = {};
	},

	/**
	 * Handles mouse wheel scrolling on the rows captions.
	 * @protected
	 * @param {Ext.EventObjectImpl} event Mouse wheel event.
	 */
	onRowCaptionsMouseWheel: function(event) {
		if (event) {
			event.stopEvent();
		}
		var gridEl = this.gridEl;
		var browserEvent = event.browserEvent;
		var wheelDelta = browserEvent.wheelDelta || -20 * browserEvent.detail;
		gridEl.setScrollTop(gridEl.getScrollTop() - wheelDelta);
	},

	/**
	 * Returns row width.
	 * @protected
	 * @return {String} Row width string.
	 */
	getRowWidth: function() {
		return (this.columns * this.cellWidth) + this.getCellWidthType();
	},

	/**
	 * @inheritdoc Terrasoft.component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		return Ext.apply(this.callParent(arguments), {
			columnsCaptionsConfig: {
				changeMethod: "setColumnsCaptionsConfig"
			},
			rowsCaptionsConfig: {
				changeMethod: "setRowsCaptionsConfig"
			}
		});
	},

	/**
	 * Columns captions config changing handler.
	 * @protected
	 * @param {Object} config New columns captions config.
	 */
	setColumnsCaptionsConfig: function(config) {
		this.columnsCaptionsConfig = config || {};
	},

	/**
	 * Rows captions config changing handler.
	 * @param {Object} config New rows captions config.
	 */
	setRowsCaptionsConfig: function(config) {
		this.rowsCaptionsConfig = config || {};
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var hasColumnsCaptions = this.hasColumnsCaptions();
		var hasRowsCaptions = this.hasRowsCaptions();
		if (hasColumnsCaptions || hasRowsCaptions) {
			var gridEl = this.gridEl;
			Ext.EventManager.addListener(gridEl.dom, "scroll", this.onGridScroll, this);
		}
		if (hasRowsCaptions) {
			var rowsCaptionsWrapEl = this.rowsCaptionsWrapEl;
			Ext.EventManager.addListener(rowsCaptionsWrapEl.dom, "mousewheel", this.onRowCaptionsMouseWheel, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#clearDomListeners
	 * @override
	 */
	clearDomListeners: function() {
		this.callParent(arguments);
		if (this.rendered) {
			var hasColumnsCaptions = this.hasColumnsCaptions();
			var hasRowsCaptions = this.hasRowsCaptions();
			if (hasColumnsCaptions || hasRowsCaptions) {
				var gridEl = this.gridEl;
				Ext.EventManager.removeListener(gridEl.dom, "scroll", this.onGridScroll, this);
			}
			if (hasRowsCaptions) {
				var rowsCaptionsWrapEl = this.rowsCaptionsWrapEl;
				Ext.EventManager.removeListener(rowsCaptionsWrapEl.dom, "mousewheel", this.onRowCaptionsMouseWheel, this);
			}
		}
	},

	/**
	 * Returns is component has rows captions.
	 * @protected
	 * @return {Boolean} Is element has rows captions.
	 */
	hasRowsCaptions: function() {
		return !Ext.isEmpty(this.rowsCaptionsConfig);
	},

	/**
	 * Returns true if component has columns captions.
	 * @protected
	 * @return {Boolean} True if element has columns captions.
	 */
	hasColumnsCaptions: function() {
		return !Ext.isEmpty(this.columnsCaptionsConfig);
	},

	/**
	 * @inheritdoc Terrasoft.GridLayoutEdit#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.restoreScrollPosition();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onBeforeReRender
	 * @override
	 */
	onBeforeReRender: function() {
		this.callParent(arguments);
		this.saveScrollPosition();
	},

	/**
	 * Save grid scroll position.
	 * @protected
	 */
	saveScrollPosition: function() {
		var gridEl = this.gridEl;
		this.currentScrollTop = gridEl.getScrollTop();
		this.currentScrollLeft = gridEl.getScrollLeft();
	},

	/**
	 * Restore grid scroll position.
	 * For example when next page of data is loaded and grid is re-rendered.
	 * @protected
	 */
	restoreScrollPosition: function() {
		var gridEl = this.gridEl;
		gridEl.setScrollTop(this.currentScrollTop);
		gridEl.setScrollLeft(this.currentScrollLeft);
	}

});
