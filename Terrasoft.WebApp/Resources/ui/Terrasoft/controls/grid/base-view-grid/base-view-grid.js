/**
 * The class implements the display of data on a modular CSS grid.
 */
Ext.define("Terrasoft.controls.BaseViewGrid", {

	alternateClassName: "Terrasoft.BaseViewGrid",

	extend: "Terrasoft.Grid",

	//region Fields: Private

	/**
	 * Grid type. Use for getters and setters of the type property.
	 * @private
	 * @type {String}
	 */
	_type: null,

	/**
	 * Default grid type.
	 * @private
	 * @type {String}
	 */
	_defaultType: "listed",

	/**
	 * Grid HTML generator.
	 * @private
	 * @type {Terrasoft.GridHtmlGenerator}
	 */
	_gridHtmlGenerator: null,

	/**
	 * Horizontal scroll value
	 * @type {Number}
	 */
	_horizontalScrollValue: null,

	/**
	 * Grid cell view type.
	 * @type {Terrasoft.GridCellViewType}
	 */
	gridCellViewType: Terrasoft.GridCellViewType.ONELINE,

	/**
	 * Grid progress spinner height.
	 * @private
	 * @type {Number}
	 */
	_progressSpinnerHeight: 35,

	//endregion

	//region Fields: Public

	/**
	 * Count of columns that visible in same time.
	 * @type {Number}
	 */
	visibleColumns: 24,

	/**
	 * Listed grid HTML generator className
	 * @protected
	 * @type {String}
	 */
	listedGridHtmlGeneratorClassName: "Terrasoft.ListedGridHtmlGenerator",

	/**
	 * Listed grid HTML generator className
	 * @type {String}
	 */
	tiledGridHtmlGeneratorClassName: "Terrasoft.TiledGridHtmlGenerator",

	/**
	 * Load more button template.
	 * @protected
	 * @type {Ext.XTemplate}
	 */
	// jscs:disable
	/*jshint quotmark: false */
	loadMoreBtnTpl: new Ext.XTemplate('<div class="load-more-grid-btn-wrap" ' +
		'style="display:<tpl if="loadMoreBtnVisible">block<tpl else>none</tpl>;">',
		'<span class="{loadMoreBtnCssClass}"',
		' data-item-marker="load-more-grid-btn">{loadMoreBtnCaption}</span></div>'),
	/*jshint quotmark: true */
	// jscs:enable

	/**
	 * Load more button display value.
	 * @protected
	 * @type {Boolean}
	 */
	loadMoreBtnVisible: false,

	/**
	 * Load more button caption.
	 * @protected
	 * @type {String}
	 */
	loadMoreBtnCaption: "",

	/**
	 * Load more button css class name.
	 * @protected
	 * @type {String}
	 */
	loadMoreBtnCssClass: "load-more-grid-btn",

	//endregion

	//region Methods: Private

	/**
	 * Sets sortings state by captions config.
	 * @private
	 */
	_setSortingByCaptions: function() {
		var captions = this.getCaptionsConfig();
		for (var i = 0, c = captions.length; i < c; i += 1) {
			var captionConfig = captions[i];
			if ((this.sortColumnIndex === i || captionConfig.sortColumnDirection) &&
					this.captionsConfig[i].sortColumnDirection) {
				this.sortColumnIndex = i;
				this.sortColumnDirection = captionConfig.sortColumnDirection;
				delete this.captionsConfig[i].sortColumnDirection;
			}
		}
	},

	/**
	 * Returns proper grid html generator class name.
	 * @private
	 * @return {String} Grid html generator class name.
	 */
	_getGridHtmlGeneratorClassName: function() {
		if (this.type) {
			const gridHtmlGeneratorClassName = this.type === Terrasoft.GridType.TILED
				? this.tiledGridHtmlGeneratorClassName
				: this.listedGridHtmlGeneratorClassName;
			return gridHtmlGeneratorClassName;
		} else {
			return null;
		}
	},

	/**
	 * Destroys html generator.
	 * @private
	 */
	_destroyHtmlGenerator: function() {
		this._gridHtmlGenerator.destroy();
		this._gridHtmlGenerator = null;
	},

	/**
	 * Returns grid html generator config.
	 * @private
	 * @param {Terrasoft.Grid} config Config object for html generator.
	 * @returns {Object} Grid html generator config.
	 */
	_getGridHtmlGeneratorConfig: function(config) {
		const generatorConfig = {};
		generatorConfig.gridId = this.id;
		generatorConfig.columnsConfig = config.columnsConfig || this.columnsConfig;
		generatorConfig.captionsConfig = config.captionsConfig || this.captionsConfig;
		generatorConfig.internalColumns = this.internalColumns || [];
		generatorConfig.theoreticallyActiveRowCss = this.theoreticallyActiveRowCss;
		generatorConfig.rowActionsExternalCss = this.rowActionsExternalCss;
		generatorConfig.colsCss = this.colsCss;
		generatorConfig.collectionItemPrefix = this.collectionItemPrefix;
		generatorConfig._spanCellTemplate = this._spanCellTemplate;
		generatorConfig.primaryColumnName = config.primaryColumnName || this.primaryColumnName;
		generatorConfig.selectedRowCss = this.selectedRowCss;
		generatorConfig.activeRowCss = this.activeRowCss;
		generatorConfig.useRowActionsExternal = config.useRowActionsExternal;
		generatorConfig.rowsStyles = config.rowsStyles || this.rowsStyles;
		generatorConfig.rowDataItemMarkerColumnName = this.rowDataItemMarkerColumnName;
		generatorConfig.primaryDisplayColumnName = config.primaryDisplayColumnName
			|| this.primaryDisplayColumnName;
		generatorConfig.type = config.type || this.type;
		generatorConfig.listedConfig = config.listedConfig || this.listedConfig;
		generatorConfig.tiledConfig = config.tiledConfig || this.tiledConfig;
		generatorConfig.isEmptyRowVisible = config.isEmptyRowVisible;
		generatorConfig.isVertical = config.isVertical;
		generatorConfig.hierarchical = config.hierarchical;
		generatorConfig.rowActionsExternalPrefix = this.rowActionsExternalPrefix;
		generatorConfig.captionPrefix = this.captionPrefix;
		return generatorConfig;
	},

	/**
	 * Sets grid HTML generator according to grid type.
	 * @private
	 * @param {Terrasoft.Grid} config Config object for html generator.
	 */
	_setGridHtmlGenerator: function(config) {
		const generator = this._gridHtmlGenerator;
		const htmlGeneratorClassName = this._getGridHtmlGeneratorClassName();
		const isCreated = Boolean(generator);
		const generatorClassName = isCreated && (generator.alternateClassName || generator.$className);
		const classNameNotMatches = generatorClassName !== htmlGeneratorClassName;
		const shouldDestroy = generator && classNameNotMatches;
		if (shouldDestroy) {
			this._destroyHtmlGenerator();
		}
		if (!isCreated) {
			const gridHtmlGeneratorConfig = this._getGridHtmlGeneratorConfig(config);
			if (htmlGeneratorClassName) {
				this._gridHtmlGenerator = Ext.create(htmlGeneratorClassName, gridHtmlGeneratorConfig);
			}
		}
	},

	/**
	 * Returns content wrap config.
	 * @private
	 * @return {Object} Content wrap config.
	 */
	_getContentWrapConfig: function() {
		const gridConfig = {
			tag: "div",
			id: Ext.String.format("grid-{0}-content", this.id),
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

	/**
	 * Applies grid cell view type value to grid wrap element.
	 * @private
	 * @param {Terrasoft.GridCellViewType} value Grid cell view type.
	 */
	_applyGridCellViewTypeAttr: function(value) {
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			wrapEl.set({"cell-view-type": value});
		}
	},

	/**
	 * Applies empty grid html config.
	 * @private
	 * @param {Object} htmlConfig Wrap el html config.
	 */
	_applyEmptyGridHtmlConfig: function(htmlConfig) {
		var emptyMessageConfig = this.loadEmptyMessageConfig();
		if (Ext.Object.isEmpty(emptyMessageConfig)) {
			htmlConfig.children.push(this.isEmptyHtmlConfig);
		}
		htmlConfig.cls += Ext.String.format(" {0}", this.isEmptyCss);
		htmlConfig.children.push(this.bottomSpinnerSpaceTpl.apply(this));
	},

	/**
	 * Render hierarchical grid by type.
	 * @param {Object[]} result Elements html configuration information.
	 * @param {Object} options Options for rendering.
	 * @private
	 */
	_renderHierarchicalGrid: function(result, options) {
		var type = this.type;
		switch (type) {
			case "listed":
				this.renderListedHierarchicalGrid(result, options);
				break;
			case "tiled":
				this.renderTiledHierarchicalGrid(result, options);
				break;
			default:
				this.log(Ext.String.format("Rendering grid. Hierarchical grid type: {0} not supported.", type),
					Terrasoft.LogMessageType.WARNING);
				break;
		}
	},

	/**
	 * Gets render options of the html generator.
	 * @private
	 * @return {Object} Render options of the html generator.
	 */
	_gerRenderOptions: function() {
		const renderOptions = {
			rows: this.rows,
			columnBindings: this.columnBindings,
			checkboxes: this.checkboxes,
			multiSelect: this.multiSelect,
			selectedRows: this.selectedRows,
			activeRow: this.activeRow,
			cellsClasses: this.cellsClasses,
			sortColumnIndex: this.sortColumnIndex,
			sortColumnDirection: this.sortColumnDirection,
			sortIndicatorUp: this.sortIndicatorUp,
			sortIndicatorDown: this.sortIndicatorDown,
			visibleColumns: this.visibleColumns
		};
		return renderOptions;
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Grid#setIsLoading
	 * @overridden
	 */
	setIsLoading: function() {
		this.callParent(arguments);
		this._setGridHtmlGenerator(this);
		if (this.isLoading && this._gridHtmlGenerator) {
			const vertialScrollEl = this._gridHtmlGenerator.getVerticalScrollEl(this);
			if (vertialScrollEl) {
				const currentScrollTop = vertialScrollEl.getScrollTop();
				vertialScrollEl.setScrollTop(currentScrollTop + this._progressSpinnerHeight);
			}
		}
	},

	/**
	 * @inheritdoc Terrasoft.Grid#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Load more button click event.
			 */
			"loadMoreBtnClick");
		this.selectors.loadMoreEl = Ext.String.format(".{0}", this.loadMoreBtnCssClass);
		this.selectors.loadMoreWrapEl = Ext.String.format(".{0}-wrap", this.loadMoreBtnCssClass);
	},

	/**
	 * @inheritdoc Terrasoft.Grid#generateHtmlTpl
	 * @override
	 */
	generateHtmlTpl: function(wrapElClasses, type) {
		this._setGridHtmlGenerator(this);
		if (!this._gridHtmlGenerator) {
			return null;
		}
		const htmlConfig = this._gridHtmlGenerator.generateWrapHtmlConfig(wrapElClasses);
		if (this.isEmpty) {
			this._applyEmptyGridHtmlConfig(htmlConfig);
		} else {
			this.applyGridHtmlConfig(type, htmlConfig);
		}
		return htmlConfig;
	},

	/**
	 * Applies grid html config.
	 * @protected
	 * @param {String} type Grid type.
	 * @param {Object} htmlConfig Wrap el html config.
	 */
	applyGridHtmlConfig: function(type, htmlConfig) {
		if (type === "listed") {
			if (this.hierarchical) {
				htmlConfig.children.push(this.renderCaptionsRow());
			} else {
				this._setSortingByCaptions();
			}
		}
		this.appendRootContent(htmlConfig);
	},

	/**
	 * Appends root content to htmlConfig of the grid.
	 * @protected
	 * @param {Object} htmlConfig Wrap el html config.
	 */
	appendRootContent: function(htmlConfig) {
		if (this.hierarchical) {
			this.appendHierarchicalRootContent(htmlConfig);
		} else {
			this.appendDefaultRootContent(htmlConfig);
		}
	},

	/**
	 * Appends hierarchical root content to htmlConfig of the grid.
	 * @protected
	 * @param {Object} htmlConfig Wrap el html config.
	 */
	appendHierarchicalRootContent: function(htmlConfig) {
		this.appendGridContent(htmlConfig.children, {});
		htmlConfig.children.push(this.bottomSpinnerSpaceTpl.apply());
	},

	/**
	 * Appends default root content to htmlConfig of the grid.
	 * @protected
	 * @param {Object} htmlConfig Wrap el html config.
	 */
	appendDefaultRootContent: function(htmlConfig) {
		const contentWrapConfig = this.generateContentWrapConfig();
		const contentConfig = this.getGridContentConfig(contentWrapConfig);
		this.appendGridContent(contentConfig.children, {});
		contentConfig.children.push(this.bottomSpinnerSpaceTpl.apply(this));
		contentConfig.children.push(this.loadMoreBtnTpl.apply(this));
		htmlConfig.children.push(contentWrapConfig);
	},

	/**
	 * Gets html config of the grid content.
	 * @protected
	 * @param {Object} contentWrapConfig Wrap el html config.
	 */
	getGridContentConfig: function(contentWrapConfig) {
		this._setGridHtmlGenerator(this);
		if (!this._gridHtmlGenerator) {
			return null;
		}
		return this._gridHtmlGenerator.getGridContentConfig(contentWrapConfig);
	},

	/**
	 * @inheritdoc Terrasoft.Grid#initDomEvents
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		if (this.loadMoreEl) {
			this.loadMoreEl.on("click", this.onLoadMoreBtnClick, this);
		}
		this._setGridHtmlGenerator(this);
		if (this._gridHtmlGenerator) {
			this._gridHtmlGenerator.initDomEvents();
		}
	},

	/**
	 * On load more button click event handler.
	 * @param {Ext.EventObject} event Event object.
	 */
	onLoadMoreBtnClick: function(event) {
		this.fireEvent("loadMoreBtnClick", event);
	},

	/**
	 * Set watchRowInViewport value.
	 * @param {Number} value WatchRowInViewport value.
	 */
	setWatchRowInViewport: function(value) {
		this.watchRowInViewport = Ext.isNumber(value) ? value : 0;
		if (this.watchRowInViewport) {
			this.checkNeedLoadData();
		}
	},

	/**
	 * Sets load more button visibility.
	 * @protected
	 * @param {Boolean} value Load more button visibility.
	 */
	setLoadMoreBtnVisible: function(value) {
		this.loadMoreBtnVisible = Boolean(value);
		if (this.loadMoreWrapEl) {
			this.loadMoreWrapEl.setStyle({display: this.loadMoreBtnVisible ? "block" : "none"});
		}
	},

	/**
	 * Sets load more button caption.
	 * @protected
	 * @param {String} value Load more button caption.
	 */
	setLoadMoreBtnCaption: function(value) {
		if (this.loadMoreBtnCaption === value) {
			return;
		}
		this.loadMoreBtnCaption = value || "";
		if (this.loadMoreEl) {
			this.loadMoreEl.setHTML(this.loadMoreBtnCaption);
		}
	},

	/**
	 * Generates grid content html and append to result array.
	 * @deprecated
	 * @protected
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 */
	renderGrid: function(result, options) {
		this.appendGridContent(result, options);
	},

	/**
	 * Generates grid content html and append to result array.
	 * @protected
	 * @param {Array} result Html template to be added.
	 * @param {Object} options Render data options.
	 */
	appendGridContent: function(result, options) {
		const hierarchical = this.hierarchical;
		if (hierarchical) {
			this._renderHierarchicalGrid(result, options);
		} else {
			this._setGridHtmlGenerator(this);
			if (this._gridHtmlGenerator) {
				const renderOptions = this._gerRenderOptions();
				this._gridHtmlGenerator.appendGridContent(result, options, renderOptions);
			}
		}
	},

	/**
	 * Generates grid wrap html and append to result array.
	 * @protected
	 * @return {Object|null} Generated html config of the grid wrap.
	 */
	generateContentWrapConfig: function() {
		this._setGridHtmlGenerator(this);
		if (!this._gridHtmlGenerator) {
			return null;
		}
		const renderOptions = this._gerRenderOptions();
		return this._gridHtmlGenerator.generateContentWrapConfig(renderOptions);
	},

	/**
	 * @inheritdoc Terrasoft.Grid#onDestroy
	 * @override
	 */
	onDestroy: function() {
		const gridHtmlGenerator = this._gridHtmlGenerator;
		if (gridHtmlGenerator) {
			this._destroyHtmlGenerator();
		}
		this.callParent(arguments);
		if (this.loadMoreEl) {
			this.loadMoreEl.un("click", this.onLoadMoreBtnClick, this);
		}
	},

	/**
	 * Scrolls to scroll value.
	 * @protected
	 * @param {Number} value Scroll value.
	 */
	horizontalScrollTo: function(value) {
		this._setGridHtmlGenerator(this);
		if (!this._gridHtmlGenerator) {
			return;
		}
		const horizontalScrollEl = this._gridHtmlGenerator.getHorizontalScrollEl(this);
		if (horizontalScrollEl) {
			horizontalScrollEl.scrollTo("left", value);
		}
	},

	/**
	 * Scrolls element to the specified horizontal value.
	 * @protected
	 * @param {Number} Scroll value.
	 */
	setHorizontalScrollValue: function(value) {
		this._horizontalScrollValue = value;
		this.horizontalScrollTo(value);
	},

	/**
	 * Sets grid cell view type.
	 * @protected
	 * @param {Terrasoft.GridCellViewType} value Grid cell view type.
	 */
	setGridCellViewType: function(value) {
		if (!value || value === this.gridCellViewType) {
			return;
		}
		this.gridCellViewType = value;
		this._applyGridCellViewTypeAttr(value);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		const horizontalScrollValue = parseInt(this._horizontalScrollValue, 10);
		if (!isNaN(horizontalScrollValue)) {
			this.horizontalScrollTo(horizontalScrollValue);
		}
		this._applyGridCellViewTypeAttr(this.gridCellViewType);
	},

	/**
	 * @inheritdoc Terrasoft.Grid#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this._applyGridCellViewTypeAttr(this.gridCellViewType);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var baseViewGridBindConfig = {
			horizontalScrollValue: {
				changeMethod: "setHorizontalScrollValue"
			},
			gridCellViewType: {
				changeMethod: "setGridCellViewType"
			},
			loadMoreBtnVisible: {
				changeMethod: "setLoadMoreBtnVisible"
			},
			loadMoreBtnCaption: {
				changeMethod: "setLoadMoreBtnCaption"
			},
			watchRowInViewport: {
				changeMethod: "setWatchRowInViewport"
			}
		};
		Ext.apply(baseViewGridBindConfig, bindConfig);
		return baseViewGridBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Grid#getRow
	 * @override
	 */
	getRow: function(item) {
		var row = this.callParent(arguments);
		if (item && Ext.isFunction(item.getRowCellsHintConfig)) {
			row.cellsHintConfig = item.getRowCellsHintConfig();
		}
		return row;
	},

	/**
	 * Gets additions properties of the Object.defineProperties.
	 * @protected
	 * @return {Object} Additions properties config of the Object.defineProperties.
	 */
	getDefineProperties: function() {
		return {
			"type": {
				get: function() {
					return this._type || this._defaultType;
				},

				set: function(value) {
					this._type = value;
				}
			}
		};
	},

	//endregion

	// region Methods: Public

	constructor: function () {
		Object.defineProperties(this, this.getDefineProperties());
		this.callParent(arguments);
	}

	// endregion
});

