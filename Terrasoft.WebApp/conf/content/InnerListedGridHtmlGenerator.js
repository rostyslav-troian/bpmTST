Terrasoft.configuration.Structures["InnerListedGridHtmlGenerator"] = {innerHierarchyStack: ["InnerListedGridHtmlGenerator"]};
define("InnerListedGridHtmlGenerator", ["css!InnerListedGridHtmlGeneratorCSS"],
	function() {
		Ext.define("Terrasoft.controls.InnerListedGridHtmlGenerator", {
			alternateClassName: "Terrasoft.InnerListedGridHtmlGenerator",
			extend: "Terrasoft.ListedGridHtmlGenerator",

			//region Fields: Private

			/**
			 * Class name of the grid wrap element.
			 * @type {String}
			 * @private
			 */
			_wrapClassName: "inner",

			/**
			 * Count of columns that visible in same time.
			 * @private
			 */
			visibleColumns: 24,

			/**
			 * Indicates if cell width is fixed.
			 * @private
			 * @type {Boolean}
			 */
			fixedCellWidth: false,

			/**
			 * Styles sheets rules.
			 * @private
			 * @type {String}
			 */
			styleSheetId: null,

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#listedRowsCss
			 * @overridden
			 */
			listedRowsCss: "grid-listed-row listed-grid-line",

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#captionsCss
			 * @overridden
			 */
			captionsCss: "grid-captions listed-grid-line fixed-header",

			/**
			 * Is captions row rendered tag.
			 * @private
			 * @type {Boolean}
			 */
			_captionsRendered: false,

			/**
			 * Css class of the fixed captions wrap.
			 * @private
			 * @type {String}
			 */
			_fixedCaptionsWrapCls: "fixed-captions-wrap",

			/**
			 * Fixed captions selector pattern.
			 * @private
			 * @type {String}
			 */
			_fixedCaptionsSelectorPattern: "#grid-{0}-wrap .fixed-header",

			/**
			 * Scroll css selector pattern of the scroll element.
			 * @private
			 * @type {String}
			 */
			_scrollCssSelectorPattern: "#grid-{0}-wrap .grid-scroll",

			/**
			 * Link of the scroll element.
			 * @private
			 * @type {Ext.Element}
			 */
			_scrollEl: null,

			/**
			 * Link of the content element.
			 * @private
			 * @type {Ext.Element}
			 */
			_contentEl: null,

			/**
			 * Resize observer of the content dom element.
			 * @private
			 * @type {ResizeObserver}
			 */
			_contentElResizeObserver: null,

			//endregion

			//region Methods: Private

			/**
			 * Returns grid content id.
			 * @private
			 * @return {String} Grid content id.
			 */
			_getContentId: function() {
				return Ext.String.format("grid-{0}-wrap", this.gridId);
			},

			/**
			 * Clears style sheets list.
			 * @private
			 */
			_clearStyleSheet: function() {
				if (this.styleSheetId) {
					Terrasoft.removeStyleSheet(this.styleSheetId);
					this.styleSheetId = null;
				}
			},

			/**
			 * Returns columns width in percent or pixels.
			 * @private
			 * @return {Number} Columns width in percent or pixels.
			 */
			_getColumnsWidth: function() {
				var percentWidth = this._getPercentColumnsWidth();
				return this.fixedCellWidth
					? this._getFixedColumnsWidth()
					: Math.max(percentWidth, 100);
			},

			/**
			 * Gets total columns width in percent.
			 * @private
			 * @return {Number} Total columns width in percent.
			 */
			_getPercentColumnsWidth: function() {
				var percentWidth = this._getColumnsColsSum() / this.visibleColumns * 100;
				return percentWidth;
			},

			/**
			 * Returns fixed columns width in pixels.
			 * @private
			 * @return {Number} Columns width in pixels.
			 */
			_getFixedColumnsWidth: function() {
				var columnsConfig = this.getColumnsConfig();
				var columnsWidth = columnsConfig.reduce(function(previousValue, currentColumn) {
					previousValue += this._getColumnWidth(currentColumn);
					return previousValue;
				}.bind(this), 0);
				return columnsWidth;
			},

			/**
			 * Returns column width.
			 * @private
			 * @param {Object} columnConfig Column cell config.
			 * @return {Number} Column width.
			 */
			_getColumnWidth: function(columnConfig) {
				if (!columnConfig) {
					return 0;
				}
				var percentColumnsWidth = Math.min(this._getPercentColumnsWidth(), 100);
				var percentWidth = columnConfig.cols / this._getColumnsColsSum() * percentColumnsWidth;
				return this.fixedCellWidth
					? columnConfig.width
					: percentWidth;
			},

			/**
			 * Gets sum of the all columns cols.
			 * @private
			 * @return {Number} Sum of the all columns cols.
			 */
			_getColumnsColsSum: function() {
				var columnsConfig = this.getColumnsConfig();
				if (Ext.isEmpty(columnsConfig)) {
					return 0;
				}
				var cols = Ext.Array.pluck(columnsConfig, "cols");
				var colsCount = Ext.Array.sum(cols);
				return colsCount;
			},

			/**
			 * Gets column css rules.
			 * @private
			 * @param {String} ruleId Id of the css rule.
			 * @param {Number} index Index of the column.
			 * @param {Object} columnConfig Config of the column from profile.
			 * @return {String} Css rule of the column.
			 */
			_getColumnCssRules: function(ruleId, index, columnConfig) {
				const cellWidthType = this.getCellWidthType();
				const columnsWidth = this._getColumnWidth(columnConfig);
				const template = "#{2} .grid-column-{0} { flex-basis: {1}{3}; max-width: {1}{3}; }";
				return Ext.String.format(template, index, columnsWidth, ruleId, cellWidthType);
			},

			/**
			 * Scrolls fixed header.
			 * @private
			 * @param {HTMLElement} scrollDomEl Scroll element.
			 */
			_scrollFixedHeader: function(scrollDomEl) {
				const scrollEl = Ext.get(scrollDomEl);
				const scrollPosition = Terrasoft.getScrollPosition(scrollEl);
				const distance = -Math.abs(scrollPosition.left);
				const leftPx = Ext.String.format("{0}px", distance);
				const fixedCaptionsSelector = Ext.String.format(this._fixedCaptionsSelectorPattern, this.gridId);
				const fixedCaptionsEl = Ext.select(fixedCaptionsSelector).first();
				if (fixedCaptionsEl) {
					fixedCaptionsEl.setStyle("left", leftPx);
				}
			},

			/**
			 * Sets width of the fixed header.
			 * @private
			 * @param {Number} width New width value.
			 */
			_setFixedWrapHeaderWidth: function(width) {
				const fixedHeaderSelector = Ext.String.format("#grid-{0}-wrap .{1}",
					this.gridId, this._fixedCaptionsWrapCls);
				const fixedHeaderEl = Ext.select(fixedHeaderSelector).first();
				if (fixedHeaderEl) {
					fixedHeaderEl.setWidth(width);
				}
			},

			/**
			 * Destroy dom events.
			 * @private
			 */
			_destroyDomEvents: function() {
				if (this._scrollEl) {
					this._scrollEl.un("scroll", this.onScroll, this);
				}
				if (this._contentElResizeObserver) {
					this._contentElResizeObserver.disconnect();
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * Generates Css rules for listed grid.
			 * @protected
			 */
			generateCssRules: function() {
				const columnsConfig = this.getColumnsConfig();
				const columnsWidth = Math.max(this._getColumnsWidth(), 100);
				const contentId = this._getContentId();
				const styleSheetId = Ext.String.format("{0}-stylesheet", contentId);
				if (this.styleSheetId) {
					this._clearStyleSheet();
				}
				const configs = Ext.Object.getValues(columnsConfig);
				const rules = configs.map(function(columnConfig, index) {
					return this._getColumnCssRules(contentId, index, columnConfig);
				}.bind(this));
				const lineRulePattern = "#{0} .listed-grid-line { width: {1}{2}; }";
				const lineRule = Ext.String.format(lineRulePattern, contentId, columnsWidth, this.getCellWidthType());
				rules.push(lineRule);
				const gridRule = rules.join("");
				Terrasoft.createStyleSheet(gridRule, styleSheetId);
				this.styleSheetId = styleSheetId;
			},

			/**
			 * Returns the cell width type.
			 * @protected
			 * @return {String} The cell width type.
			 */
			getCellWidthType: function() {
				return this.fixedCellWidth ? "px" : "%";
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#getDefaultCellHtmlConfig
			 * @overridden
			 */
			getDefaultCellHtmlConfig: function(options) {
				const cell = options.cell;
				const cellClasses = [
					this.colsCss + "-" + cell.cols,
					"grid-column-" + options.columnIndex
				];
				const htmlConfig = {
					tag: "div",
					cls: cellClasses.join(" "),
					html: "",
					children: [],
					"grid-cell-type": []
				};
				return htmlConfig;
			},

			/**
			 * @inheritdoc Terrasoft.ListedGridHtmlGenerator#getDefaultCaptionCellHtmlConfig
			 * @overridden
			 */
			getDefaultCaptionCellHtmlConfig: function(captionConfig, sortIndicator, index) {
				const captionClasses = [
					this.colsCss + "-" + captionConfig.cols,
					"grid-column-" + index
				];
				const captionHtmlConfig = {
					tag: "div",
					cls: captionClasses.join(" "),
					html: Ext.String.format("<label title='{0}'>{0}</label>{1}", captionConfig.name, sortIndicator),
					id: this.gridId + this.captionPrefix + index,
					"data-item-marker": captionConfig.name
				};
				return captionHtmlConfig;
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#renderContent
			 * @overridden
			 */
			renderContent: function(result, options, renderOptions) {
				const body = [];
				const renderBodyArguments = [body, options, renderOptions];
				this.callParent(renderBodyArguments);
				result.push(body);
			},

			/**
			 * Handler of the scroll grid content.
			 * @protected
			 * @param {Ext.EventObject} e The Ext.EventObject encapsulating the DOM event.
			 * @param {HTMLElement} scrollDomEl Scroll element.
			 */
			onScroll: function(e, scrollDomEl) {
				this._scrollFixedHeader(scrollDomEl);
			},

			/**
			 * Handler of the resize content dom element.
			 * @protected
			 * @param {ResizeObserverEntry[]} entries Observer entries.
			 * @param {ResizeObserver} observer Observer of the content dom element.
			 */
			onResizeContentContainer: function(entries) {
				const entry = entries.pop();
				const contentRect = entry.contentRect;
				const contentWidth = contentRect.width;
				if (contentWidth) {
					this._setFixedWrapHeaderWidth(contentWidth);
					const horizontalScrollEl = this.getHorizontalScrollEl();
					this._scrollFixedHeader(horizontalScrollEl.dom);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this._clearStyleSheet();
				this._destroyDomEvents();
				this.callParent(arguments);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#generateWrapHtmlConfig
			 * @override
			 */
			generateWrapHtmlConfig: function(wrapClasses) {
				const classes = wrapClasses.concat(this._wrapClassName);
				return this.callParent([classes]);
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#generateGridWrapConfig
			 * @override
			 */
			generateContentWrapConfig: function(renderOptions) {
				const defaultConfig = this.generateDefaultContentWrapConfig();
				const captionsRow = this.renderCaptionsRow(renderOptions);
				const captionWrap = {
					tag: "div",
					cls: this._fixedCaptionsWrapCls,
					children: [captionsRow]
				};
				return [captionWrap, defaultConfig];
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#getGridContentConfig
			 * @override
			 */
			getGridContentConfig: function(contentWrapConfig) {
				return contentWrapConfig[1].children[0];
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#getHorizontalScrollEl
			 * @override
			 */
			getHorizontalScrollEl: function() {
				const scrollCssSelector = Ext.String.format(this._scrollCssSelectorPattern, this.gridId);
				return Ext.select(scrollCssSelector).first();
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#getVerticalScrollEl
			 * @override
			 */
			getVerticalScrollEl: function() {
				const scrollCssSelector = Ext.String.format(this._scrollCssSelectorPattern, this.gridId);
				return Ext.select(scrollCssSelector).first();
			},

			/**
			 * @inheritdoc Terrasoft.GridHtmlGenerator#appendGridContent
			 * @overridden
			 */
			appendGridContent: function(result, options, renderOptions) {
				this.visibleColumns = renderOptions.visibleColumns;
				this.generateCssRules();
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
			},

			/**
			 * @inheritdoc
			 * @override
			 */
			initDomEvents: function() {
				const scrollSelector = Ext.String.format(this._scrollCssSelectorPattern, this.gridId);
				this._scrollEl = Ext.select(scrollSelector).first();
				if (!this._scrollEl) {
					return;
				}
				this._scrollEl.on("scroll", this.onScroll, this);
				this._contentEl = this._scrollEl.select(".grid-content").first();
				if (this._contentEl) {
					this._contentElResizeObserver = new window.ResizeObserver(this.onResizeContentContainer.bind(this));
					this._contentElResizeObserver.observe(this._contentEl.dom);
				}
			}

			//endregion

		});
	});


