Terrasoft.configuration.Structures["PivotGrid"] = {innerHierarchyStack: ["PivotGrid"]};
define("PivotGrid", ["ConfigurationGrid", "ConfigurationGridGenerator", "css!PivotGrid",
	"ConfigurationGridUtilities"], function() {
	Ext.define("Terrasoft.controls.PivotGrid", {
		extend: "Terrasoft.ConfigurationGrid",
		alternateClassName: "Terrasoft.PivotGrid",

		/**
		 * ######## ######.
		 * @type {Object}
		 */
		activeCell: null,

		/**
		 * ############ ###### #### ##### ############.
		 * @type {Object}
		 */
		activeRowCaptionActions: "",

		/**
		 * ############# ####### ######## ######.
		 * @type {Object}
		 */
		activeCellColumnName: "",

		/**
		 * CSS ##### ######## ######.
		 * @type {String}
		 */
		activeCellCss: "grid-cell-selected",

		/**
		 * CSS ##### ########## ######## #######.
		 * @type {String}
		 */
		columnsCaptionsWrapperCss: "columns-captions-wrap",

		/**
		 * CSS ##### ### ######## ####### ########## ##### ######.
		 * @type {String}
		 */
		contentRowsWrapperCss: "content-row-wrap",

		/**
		 * CSS ##### ### ########## ##### ######.
		 * @type {String}
		 */
		contentRowsCss: "content-row-data",

		/**
		 * CSS ##### ########## ######## #####.
		 * @type {String}
		 */
		rowsCaptionsWrapperCss: "rows-captions-wrap",

		/**
		 * #########, # ####### ##### ######### Grid.
		 * @type {String}
		 */
		container: Ext.emptyString,

		/**
		 * @inheritDoc Terrasoft.Grid#activeRowCss
		 * @overridden
		 * @type {String}
		 */
		activeRowCss: "forecast-grid-row-selected",

		/*
		 * ############ ####### ######## ##### #######.
		 * @type {Array}
		 */
		rowsCaptionsColumnsConfig: [],

		/*
		 * ###### ####### ##### ############ # ##### #######.
		 * @type {String}
		 */
		firstBlockWidth: "334px",

		/*
		 * ###### ##### ######.
		 * @type {String}
		 */
		contentBlockWidth: "initial",

		/*
		 * ###### ##########.
		 * @type {Number}
		 */
		scrollOffset: 10,

		/*
		 * ###### ###### ######## #######.
		 * @type {Number}
		 */
		columnsCaptionsRowHeight: 36.5,

		/**
		 * ########## ############ ######## # ######. ######### ######### ####### {@link Terrasoft.Bindable}.
		 * @protected
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var gridBindConfig = {
				activeCellColumnName: {
					changeEvent: "selectCell"
				}
			};
			Ext.apply(gridBindConfig, bindConfig);
			return gridBindConfig;
		},

		/**
		 * @inheritDoc Terrasoft.Component#init
		 * @ovverride
		 */
		init: function() {
			this.callParent(arguments);

			this.addEvents(
				/**
				 * @event
				 * ####### ### ######### ######## ######.
				 */
				"cellValueChanged"
			);
		},

		/**
		 * ########## ########## ############ ####### ######.
		 * @protected
		 * @return {Array}
		 */
		getContentColumnsConfig: function() {
			var columnsConfig = this.getColumnsConfig();
			var rowsCaptionsColumns = [];
			Terrasoft.each(this.rowsCaptionsColumnsConfig, function(rowsCaptionsColumn) {
				rowsCaptionsColumns.push(this.getColumnName(rowsCaptionsColumn));
			}, this);
			var contentColumnsConfig = Ext.Array.filter(columnsConfig, function(column) {
				return !Terrasoft.contains(rowsCaptionsColumns, this.getColumnName(column));
			}, this);
			return contentColumnsConfig;
		},

		/**
		 * ######## ###### ###### ####### ## ##### ######## ####### ### ## ##### ####### ######## #####.
		 * # ############ ######## ####### ###### ####### ########### ###### ### ####### ######.
		 * @private
		 * @param {Object} node ####### ###### ############.
		 * @return {Number}
		 */
		getNodeWidth: function(node) {
			var sum = 0;
			if (node.children) {
				Terrasoft.each(node.children, function(element) {
					sum += this.getNodeWidth(element);
				}, this);
			} else {
				sum += node.cols || 0;
			}
			return sum;
		},

		/**
		 * ######### dataItemMarker ### ########## #### ####### #### ####### ####### ############ ##### ######## #######
		 * @private
		 * @param {Object} node ####### ###### ############.
		 * @return {Number}
		 */
		addColumnsCaptionRowsDataItemMarkerValue: function(node) {
			if (node.children) {
				Terrasoft.each(node.children, function(element) {
					this.addColumnsCaptionRowsDataItemMarkerValue(element);
					if (!Ext.isEmpty(node.name)) {
						element.dataItemMarker = node.name + element.name;
					}
				}, this);
			}
		},

		/**
		 * @inheritDoc Terrasoft.Grid#onAfterReRender
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			var columnsCaptionsWrapper = Ext.get(this.id + "columnsCaptionsWrapper");
			var contentRowsWrapper = Ext.get(this.id + "contentRowsWrapper");
			var rowsCaptionsWrapper = Ext.get(this.id + "rowsCaptionsWrapper");
			if (!columnsCaptionsWrapper && !contentRowsWrapper && !rowsCaptionsWrapper) {
				return;
			}
			contentRowsWrapper.on("scroll", function() {
				var scrollTop = contentRowsWrapper.getScrollTop();
				var scrollLeft = contentRowsWrapper.getScrollLeft();
				rowsCaptionsWrapper.scrollTo("top", scrollTop, false);
				columnsCaptionsWrapper.scrollTo("left", scrollLeft, false);
			});
		},

		/**
		 * ##### ######### ######### ######.
		 * @overriden
		 * @param {Array} result ######### ######## ############ ### ############ HTML #### ##### #######.
		 * @param {Object} options ######, ########## ######### ###### # ######## ############ ##### ####### ######.
		 */
		renderCell: function(result, options) {
			var cellReadyState = 0;
			var cell = options.cell;
			var data = options.row;
			var link = this.getDataKey(options.cell.link);
			var styles = {};
			var htmlConfig = {
				tag: "div",
				cls: "grid-cols-" + cell.cols,
				html: "",
				children: [],
				"grid-cell-type": []
			};
			if (!cell.cols) {
				styles.width = "100%";
			} else {
				styles.width = cell.cols + "px";
			}
			if (Ext.isEmpty(cell.minHeight)) {
				styles["min-height"] = cell.minHeight;
			}
			if (Ext.isEmpty(cell.maxHeight)) {
				styles["max-height"] = cell.maxHeight;
				styles.overflow = "hidden";
			}
			htmlConfig.style = Ext.DomHelper.generateStyles(styles);
			var key = cell.key;
			if (Ext.isArray(key)) {
				Terrasoft.each(key, function(column) {
					cellReadyState += this.formatCellContent(htmlConfig, data, column, link);
				}, this);
			} else if (Ext.isObject(key)) {
				cellReadyState += this.formatCellContent(htmlConfig, data, key, link);
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
		 * ########## ###### ############ ##### ######## ####### # ####### ####.
		 * @param {Array} captions ###### ############ ######## ###### (############).
		 * @return {Array} ###### ############ ##### ######## #######.
		 */
		getColumnsCaptionRows: function(captions) {
			var captionRows = [];
			var rootNode = {
				children: captions,
				level: 0
			};
			var queue = [rootNode];
			this.addColumnsCaptionRowsDataItemMarkerValue(rootNode);
			function setChildSettings(child) {
				child.level = currentNode.level + 1;
				currentNode.cols = this.getNodeWidth(currentNode);
				queue.push(child);
			}
			while (queue.length > 0) {
				var currentNode = queue.shift();
				if (captionRows[currentNode.level]) {
					captionRows[currentNode.level].push(currentNode);
				} else {
					captionRows[currentNode.level] = [currentNode];
				}
				var children = currentNode.children;
				Terrasoft.each(children, setChildSettings, this);
			}
			captionRows.shift();
			return captionRows;
		},

		/**
		 * ########## ###### ######## ### ########## ##### ######## #######.
		 * @param {Array} captionRows ###### ######## #######.
		 * @return {Array} ###### ######## ### ########## ##### ######## #######.
		 */
		getColumnsCaptionRowsHtmlConfig: function(captionRows) {
			var captionRowsHtmlConfig = [];
			Terrasoft.each(captionRows, function(element, row) {
				var captionRowConfig = captionRows[row];
				var captionRow =  {
					tag: "div",
					children: [],
					cls: "grid-listed-caption-row ForecastGridId-row-" + row
				};
				if (row === 0) {
					captionRow.style = "text-align: center";
				}
				Terrasoft.each(captionRowConfig, function(element, column) {
					var captionConfig = captionRowConfig[column];
					var caption = {
						tag: "div",
						cls: "grid-cols-" + captionConfig.cols,
						html: "<label>" + captionConfig.name + "</label>",
						id: this.id + this.captionPrefix + row + "-" + column,
						"data-item-marker": captionConfig.dataItemMarker,
						index: column,
						style: Ext.DomHelper.generateStyles({width: captionConfig.cols + "px"})
					};
					captionRow.children.push(caption);
				}, this);
				captionRowsHtmlConfig.push(captionRow);
			}, this);
			return captionRowsHtmlConfig;
		},

		/**
		 * ####### ###### ### ########## ######## ####### ########## #######.
		 * @overriden
		 * @return {Object}
		 */
		renderCaptionsRow: function() {
			var captions = this.getCaptionsConfig();
			var captionRows = this.getColumnsCaptionRows(captions);
			var heightLevel = captionRows.length;
			var height = this.columnsCaptionsRowHeight * heightLevel;
			var captionRowsHtmlConfig = {
				tag: "div",
				cls: "captions-wrapper-block",
				children: [{
					tag: "div",
					cls: "captions-empty",
					style: Ext.DomHelper.generateStyles({
						height: height + "px",
						display: "inline-block",
						width: this.firstBlockWidth
					})
				}, {
					tag: "div",
					id: this.id + "columnsCaptionsWrapper",
					cls: this.columnsCaptionsWrapperCss + " border-left",
					style: Ext.DomHelper.generateStyles({
						width: this.contentBlockWidth
					}),
					children: [{
						tag: "div",
						cls: "columnsCaptions",
						style: Ext.DomHelper.generateStyles({
							width: this.getCenterBlockWidth() + Ext.getScrollbarSize().width + "px"

						}),
						children: this.getColumnsCaptionRowsHtmlConfig(captionRows)
					}]
				}]
			};
			return captionRowsHtmlConfig;
		},

		/**
		 * ########## ############ ######### ############## ######## ###### # ######## ######.
		 * @inheritDoc Terrasoft.ConfigurationGrid#getRowControls
		 * @overridden
		 * @param {String} id ############# ######.
		 * @return {Array} ############ ######### ##############.
		 */
		getRowControls: function(id) {
			var rowControls = [];
			var currentColumnConfig = [this.getColumnConfigByName(this.activeCellColumnName, this.getContentColumnsConfig())];
			if (this.activeCellColumnName && !Ext.isEmpty(currentColumnConfig[0])) {
				this.fireEvent("generateControlsConfig", id, currentColumnConfig, rowControls);
			}
			return rowControls;
		},

		/**
		 * ########## ############ ####### ## ## #####.
		 * @param {String} name ### #######.
		 * @param {Array} columnsConfig ###### ############ #######.
		 * @return {Array} ############ ######### ##############.
		 */
		getColumnConfigByName: function(name, columnsConfig) {
			var columnConfig = Ext.Array.filter(columnsConfig, function(column) {
				return this.getColumnName(column) === name;
			}, this)[0];
			return columnConfig;
		},

		/**
		 * ######## ############# ###### ######### ########.
		 * @param {target} target HTMLElement.
		 * @return {GUID} ############# ######.
		 */
		getRowIdByCellTarget: function(target) {
			var targetEl = Ext.get(target);
			var root = this.getWrapEl().dom;
			/* jscs:disable */
			/*jshint quotmark: false */
			var row = targetEl.findParent('[class*="' + this.theoreticallyActiveRowCss + '"]', root, true);
			/*jshint quotmark: true */
			/* jscs:enable */
			var rowId = null;
			if (row) {
				rowId = row.id.replace(this.id + this.collectionItemPrefix, "");
				rowId = rowId.replace("-caption", "");
			}
			return rowId;
		},

		/**
		 * ########## ###### #### ### ##### ## ###### ####### ############.
		 * @param {event} event.
		 * @param {target} target.
		 */
		renderMenuRow: function(event, target) {
			var rowId = this.getRowIdByCellTarget(target);
			if (rowId) {
				this.activeRow = rowId;
				var renderTo = this.createControlsCaptionRow(target, rowId);
				this.renderRowCaptionActions(renderTo, this.activeRow);
			}
		},

		/**
		 * @inheritDoc Terrasoft.Grid#renderRowCaptionActions
		 * @overridden
		 */
		renderRowCaptionActions: function(renderTo, id) {
			var rowActions = Ext.clone(this.activeRowCaptionActions);
			var self = this;
			function actionHandler(menu, menuItem) {
				var tag = menuItem ? menuItem.tag : this.tag;
				self.onActionItemClick(tag, id);
			}
			function setActionHandler(item) {
				item.handler = actionHandler;
			}
			for (var i = 0, c = rowActions.length; i < c; i += 1) {
				var action = rowActions[i];
				action = Ext.apply({}, action, {
					renderTo: renderTo,
					classes: {
						wrapperClass: ["configuration-grid-action-button"]
					}
				});
				var actionItem = Ext.create(action.className, action);
				var menu = actionItem.menu;
				if (menu && menu.items) {
					var collection = menu.items.getItems();
					collection.forEach(setActionHandler);
				}
				var selectedViewModel = this.getActiveRowViewModel(id);
				actionItem.bind(selectedViewModel);
			}
		},

		/**
		 * ########## ######### # ########## ###### #### ####### #########.
		 * @private
		 * @param {String} id ############# ######.
		 */
		removeRowCaptionControls: function(id) {
			var controlsRow = Ext.get(this.id + this.controlsRowPrefix + id);
			if (controlsRow) {
				controlsRow.destroy();
			}
		},

		/**
		 * ####### # ######### ######### ### ######### ######### ###### #### ####### #########.
		 * @private
		 * @param {Object} target HTMLElement
		 * @param {String} id ############# ######.
		 * @return {Object} ######### ### ######### ######### ###### #### ####### #########.
		 */
		createControlsCaptionRow: function(target, id) {
			var targEl = target.nodeName === "DIV" ? target : target.parentElement;
			var item = Ext.get(targEl);
			if (!item || !item.dom) {
				return;
			}
			var html = this.controlsRowTpl.apply({
				id: this.id + this.controlsRowPrefix + id
			});
			var renderToNode = Ext.DomHelper.insertHtml("beforeend", item.dom, html);
			return Ext.get(renderToNode);
		},

		/**
		 * #########, ######### ## ####### # ####### ############.
		 * @param {String} columnName ### #######.
		 * @Return {Boolean}
		 */
		isRowCaptionsColumn: function(columnName) {
			var isCaptionColumn = false;
			Terrasoft.each(this.rowsCaptionsColumnsConfig, function(rowsCaptionsColumn) {
				if (columnName === this.getColumnName(rowsCaptionsColumn)) {
					isCaptionColumn = true;
				}
			}, this);
			return isCaptionColumn;
		},

		/**
		 * #########, ######## ## ###### ######### ### ##############.
		 * @param {GUID} rowId ############# ######.
		 * @return {Boolean}
		 */
		getRowEnabled: function(rowId) {
			var currentRow = this.collection.get(rowId);
			return currentRow.get("Enabled");
		},

		/**
		 * @inheritDoc Terrasoft.Grid#onGridClick
		 * @overridden
		 */
		onGridClick: function(event, target) {
			if (this.activeRow) {
				this.removeRowCaptionControls(this.activeRow);
			}
			var columnName = this.getActiveColumnName(target);
			var columnsConfig = this.getColumnsConfig();
			var columnConfig = this.getColumnConfigByName(columnName, columnsConfig);
			var rowId = this.getRowIdByCellTarget(target);
			if (columnConfig && (columnConfig.readOnly || !this.getRowEnabled(rowId))) {
				this.deactivateActiveCell();
				if (this.isRowCaptionsColumn(columnName)) {
					this.renderMenuRow(event, target);
				}
				this.activeCell = target;
				this.activeCellColumnName = columnName;
				event.stopEvent();
				return;
			}
			this.setActiveCell(target);
			this.callParent(arguments);
		},

		/**
		 * ####### ######### ######## ######.
		 */
		deactivateActiveCell: function() {
			if (this.activeRow && this.activeCell) {
				var item = this.collection.find(this.activeRow);
				if (item) {
					this.fireEvent("cellValueChanged");
					this.onUpdateItem(item);
				}
				var oldCell = Ext.get(this.activeCell);
				oldCell.removeCls(this.activeCellCss);
			}
			this.activeCell = null;
		},
		/**
		 * ############# ######## ######.
		 * @param {Object} target HTMLElement
		 */
		setActiveCell: function(target) {
			if (target === this.activeCell) {
				return;
			}
			var targetCell = target;
			if (target.className.indexOf("grid-cols") === -1) {
				targetCell = target.parentElement;
			}
			this.deactivateActiveCell();
			var cell = Ext.get(targetCell);
			if (cell) {
				cell.addCls(this.activeCellCss);
				this.activeCellColumnName = this.getActiveColumnName(targetCell);
				this.fireEvent("selectCell");
				Ext.EventManager.addListener(cell, "keydown", this.onKeyDown, this);
			}
			this.activeCell = target;
		},

		/**
		 * ####### # ######### ######### ### ######### ######### ############## ######## ######.
		 * @overriden
		 * @param {String} id ############# ######.
		 * @return {Object} ######### ### ######### ######### ############## ######## ######.
		 */
		createControlsRow: function(id) {
			var activeCell = this.activeCell;
			if (!activeCell) {
				return;
			}
			var item = Ext.get(activeCell.parentElement);
			if (!item || !item.dom) {
				return;
			}
			var html = this.controlsRowTpl.apply({
				id: this.id + this.controlsRowPrefix + id
			});
			var renderToNode = Ext.DomHelper.insertHtml("beforeend", item.dom, html);
			var controlsRow = Ext.get(renderToNode);
			controlsRow.on("click", this.onControlsContainerClick, this);
			return controlsRow;
		},

		/**
		 * @inheritDoc Terrasoft.Grid#createActionsRow
		 * @overridden
		 */
		createActionsRow: function(id) {
			var activeCell = this.activeCell;
			var oldActionCell = Ext.get(this.id + this.actionsRowPrefix + id);
			if (oldActionCell) {
				oldActionCell.remove();
			}
			if (!activeCell) {
				return;
			}
			var item = Ext.get(activeCell.parentElement);
			if (!item) {
				return;
			}
			var renderTo;
			var where = "beforeEnd";
			var el = item.dom;
			var html =  this.actionsRowTpl.apply({
				id: this.id + this.actionsRowPrefix + id
			});
			var renderToNode = Ext.DomHelper.insertHtml(where, el, html);
			renderTo = Ext.get(renderToNode);
			return renderTo;
		},

		/**
		 * ## ############# ######### ### ########## ##### # "##########" ### ######## ###### #######.
		 * # ######## ######### ######### ############# ###### ######.
		 * @overriden
		 * @param {String|Number} id
		 */
		addRowActions: function(id) {
			var renderTo = this.createActionsRow(id);
			if (renderTo) {
				this.renderRowActions(renderTo, id);
			}
		},

		/**
		 * ##### ####### ##### ############## ### ##### ## Body.
		 * @protected
		 */
		deactivateRows: function() {
			this.setActiveRow(null);
		},

		/**
		 * ##### ############# ######## ###### #######.
		 * @param {String} newId
		 */
		setActiveRow: function(newId) {
			var oldId = this.activeRow;
			if (!newId) {
				this.deactivateActiveCell();
				return;
			}
			this.deactivateRow(oldId);
			if (newId) {
				this.activateRow(newId);
			}
			this.activeRow = newId;
			this.fireEvent("selectRow",  newId);
		},

		/**
		 * @inheritDoc Terrasoft.ConfigurationGrid#onUpdateItem
		 * @overridden
		 */
		onUpdateItem: function(item) {
			if (item.get(this.primaryColumnName) !== this.activeRow) {
				this.callParent(arguments);
			} else {
				var id = item.get(this.primaryColumnName);
				if (!this.rendered || !this.collection.contains(id)) {
					return;
				}
				this.theoreticallyActiveRows = null;
				var row = this.getRow(item);
				var options = {
					rows: [row],
					row: row
				};
				var columns = [];
				this.renderRowsCaptionColumns(columns, options, this.getContentColumnsConfig());
				var domRowColumns = this.getDomRowColumns(id);
				domRowColumns.each(function(domRowColumn, instance, index) {
					if (columns.length > index && columns[index]["column-name"] === this.activeCellColumnName) {
						var columnHtml = Ext.DomHelper.createHtml(columns[index]);
						var domRowColumnSibling = domRowColumn.insertSibling(columnHtml, "after");
						domRowColumn.replaceWith(domRowColumnSibling);
					}
				}, this);
			}
		},

		/**
		 * @inheritDoc Terrasoft.Component#initDomEvents
		 * @ovveriden
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			this.debounceWindowResize = Terrasoft.debounce(this.updateSize, 250);
			Ext.EventManager.addListener(window, "resize", this.debounceWindowResize, this);
		},

		/**
		 * ############ ####### ####### ####### # #### ##### ######## ##########.
		 * @protected
		 */
		onKeyDown: function(e) {
			var extEl = Ext.get(e.target);
			if (!extEl) {
				return;
			}
			var cellDom = extEl.dom;
			if ((e.keyCode === e.LEFT && cellDom.selectionStart === 0) ||
				(e.keyCode === e.RIGHT && cellDom.selectionStart === cellDom.value.length)) {
				e.stopEvent();
			}
		},

		/**
		 * ######### ###### ####### ## ####### ##########.
		 * @protected
		 * @virtual
		 */
		updateSize: function() {
			if (!this.rendered) {
				return;
			}
			var scrollbarSize = Ext.getScrollbarSize();
			var rowsWrapperHeight = this.getRowsWrapperHeight();
			var contentRowsWrapper = Ext.get(this.id + "contentRowsWrapper");
			var rowsCaptionsWrapper = Ext.get(this.id + "rowsCaptionsWrapper");
			contentRowsWrapper.setHeight(rowsWrapperHeight);
			rowsCaptionsWrapper.setHeight(rowsWrapperHeight - scrollbarSize.height);
		},

		/**
		 * ##### ######## ############ #######.
		 * @protected
		 * @param {Object} column
		 * @return {String}
		 */
		getColumnName: function(column) {
			if (!column) {
				return;
			}
			var key = column.key;
			var columnName;
			if (Ext.isArray(key)) {
				columnName = this.getDataKey(key[0].name);
			} else if (Ext.isObject(key)) {
				columnName = this.getDataKey(key.name);
			}
			return columnName;
		},

		/**
		 * ##### ######### ###### ############ ##### ## #####.
		 * @private
		 * @return {Number} ###### # ######## ############ #####.
		 */
		getCenterBlockWidth: function() {
			var captions = this.getCaptionsConfig();
			var rootNode = {children: captions};
			return this.getNodeWidth(rootNode) + Ext.getScrollbarSize().height;
		},

		/**
		 * ########## ###### ##### #####.
		 * @private
		 * @return {Number} ###### ##### #####.
		 */
		getRowsWrapperHeight: function() {
			var topOffset = 0;
			var bottomOffset = 120;
			var container = Ext.getCmp(this.container);
			if (container && container.rendered) {
				var el = container.getWrapEl();
				topOffset = el.getY();
			}
			var body = Ext.getBody();
			return body.getHeight() - topOffset - bottomOffset;
		},

		/**
		 * ##### ######## ###### ########## # ########### ## ######### #### ####### ########## ## ######### #####.
		 * @overriden
		 * @param {Array} result
		 * @param {Object} options
		 */
		renderGrid: function(result, options) {
			var captionRows = this.getRows(this.rows, true);
			var contentRows = this.getRows(this.rows, false);
			var rowsCaptionsWrapperHtmlConfig = {
				cls: this.rowsCaptionsWrapperCss,
				tag: "div",
				id: this.id + "rowsCaptionsWrapper",
				style: Ext.DomHelper.generateStyles({
					width: this.firstBlockWidth,
					"margin-bottom": Ext.getScrollbarSize().height + "px",
					height: (this.getRowsWrapperHeight() - Ext.getScrollbarSize().height) + "px"
				}),
				children: []
			};
			var contentRowsWrapperHtmlConfig  = {
				tag: "div",
				id: this.id + "contentRowsWrapper",
				cls: this.contentRowsWrapperCss + " border-left",
				style: Ext.DomHelper.generateStyles({
					width: this.contentBlockWidth,
					height: this.getRowsWrapperHeight() + "px"
				}),
				children: [
					{
						style: Ext.DomHelper.generateStyles({
							width: this.getCenterBlockWidth() + "px"
						}),
						cls: this.contentRowsCss,
						tag: "div",
						children: []
					}
				]
			};
			var hierarchical = this.hierarchical;
			var type = this.type;
			if (hierarchical) {
				if (type === "listed") {
					this.renderListedHierarchicalGrid(rowsCaptionsWrapperHtmlConfig.children, {
						rows: captionRows
					}, this.rowsCaptionsColumnsConfig);
					result.push(rowsCaptionsWrapperHtmlConfig);
					this.renderListedHierarchicalGrid(contentRowsWrapperHtmlConfig.children[0].children, {
						rows: contentRows,
						content: true
					}, this.getContentColumnsConfig());
					result.push(contentRowsWrapperHtmlConfig);
				} else if (type === "tiled") {
					this.renderTiledHierarchicalGrid(result, options);
				}
			} else {
				if (type === "listed") {
					this.renderListedGrid(rowsCaptionsWrapperHtmlConfig.children, {
						rows: captionRows
					}, this.rowsCaptionsColumnsConfig);
					result.push(rowsCaptionsWrapperHtmlConfig);
					this.renderListedGrid(contentRowsWrapperHtmlConfig.children[0].children, {
						rows: contentRows,
						content: true
					}, this.getContentColumnsConfig());
					result.push(contentRowsWrapperHtmlConfig);
				} else if (type === "tiled") {
					this.renderTiledGrid(result, options);
				}
			}
		},
		/**
		 * ##### ######### Html config ###### ### ########## ##### ######.
		 * @overriden
		 * @param {Object} options
		 * @return {Object}
		 */
		getRowHtmlConfig: function(options) {
			var result = {};
			var captionRows = this.getRows(options.rows, true);
			var contentRows = this.getRows(options.rows, false);
			var rowsCaptionsWrapperHtmlConfig = [];
			var contentRowsWrapperHtmlConfig  = [];
			this.renderListedHierarchicalGrid(rowsCaptionsWrapperHtmlConfig, {
				rows: captionRows
			}, this.rowsCaptionsColumnsConfig);
			result.rowsCaptions = rowsCaptionsWrapperHtmlConfig;
			this.renderListedHierarchicalGrid(contentRowsWrapperHtmlConfig, {
				rows: contentRows,
				content: true
			}, this.getContentColumnsConfig());
			result.contentRows = contentRowsWrapperHtmlConfig;
			return result;
		},
		/**
		 * ########## ####### "add" ######### Terrasoft.Collection
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item ####### #########
		 */
		onAddItem: function(item) {
			var rows = this.getRow(item);
			var rowHTMLConfig = this.getRowHtmlConfig({rows: [rows]});
			var captionsHtml = Ext.DomHelper.createHtml(rowHTMLConfig.rowsCaptions);
			var contentHtml = Ext.DomHelper.createHtml(rowHTMLConfig.contentRows);
			this.addRowsTop(captionsHtml, "captions");
			this.addRowsTop(contentHtml, "content");
		},

		/**
		 * ##### ######### ###### rows # ######### # ########### ## ######### destBlock.
		 * @protected
		 * @param {String} rows
		 * @param {String} destBlock
		 */
		addRowsTop: function(rows, destBlock) {
			var wrapEl = this.getWrapEl();
			var insertPlace = "afterBegin";
			var cssGoalContainer = destBlock === "captions" ? this.rowsCaptionsWrapperCss : this.contentRowsCss;
			var insertAfterBegin = wrapEl.select("." + cssGoalContainer);
			var afterBegin = insertAfterBegin.first();
			if (afterBegin) {
				Ext.DomHelper.insertHtml(insertPlace, afterBegin.dom, rows);
			}
		},

		/**
		 * ##### ####### ################ ####### ### ########## ####### ########### ## ######### #####.
		 * @protected
		 * @param {Array} result
		 * @param {Object} options
		 * @param {Object} contentColumnsConfig
		 */
		renderListedGrid: function(result, options, contentColumnsConfig) {
			var rows = options.rows || this.rows;
			for (var index = 0, length = rows.length; index < length; index += 1) {
				var row = rows[index];
				options.row = row;
				var id = (row[this.primaryColumnName] || index).toString();
				var rowStyles = this.rowsStyles[id];
				var htmlConfig = this.getDefaultRowHtmlConfig(row);
				var rowCaptionPrefix = Ext.emptyString;
				if (!contentColumnsConfig) {
					rowCaptionPrefix = "rowCaption";
				}
				Ext.apply(htmlConfig, {
					tag: "div",
					cls: "grid-listed-row " + this.theoreticallyActiveRowCss,
					style: Ext.DomHelper.generateStyles(rowStyles),
					id: rowCaptionPrefix + this.id + this.collectionItemPrefix + id,
					children: []
				});
				if (contentColumnsConfig) {
					this.renderRowsCaptionColumns(htmlConfig.children, options, contentColumnsConfig);
				} else {
					this.renderColumns(htmlConfig.children, options);
				}
				if (!options.content) {
					htmlConfig.id = this.id + this.collectionItemPrefix + id + "-caption";
				}
				if (this.multiSelect) {
					htmlConfig.children.unshift({
						tag: "div",
						cls: "grid-fixed-col",
						html: ""
					});
					var fixedCol = htmlConfig.children[0];
					var checkbox = this.createCheckbox({
						classes: {
							wrapClass: ["grid-listed-row-control"]
						},
						value: id
					});
					if (Terrasoft.contains(this.selectedRows, id)) {

						checkbox.setChecked(true);
					}
					fixedCol.html = checkbox.generateHtml() + htmlConfig.children[0].html;
					this.checkboxes.push(checkbox);
				}
				result.push(htmlConfig);
			}
		},

		/**
		 * ##### ########## ###### ####### # ########### ## ######## #########.
		 * @protected
		 * @param {Array} rows
		 * @param {Boolean} isRowsCaptions
		 * @return {Array}
		 */
		getRows: function(rows, isRowsCaptions) {
			var newRows = [];
			var rowsCaptionsColumns = [];
			Terrasoft.each(this.rowsCaptionsColumnsConfig, function(rowsCaptionsColumn) {
				rowsCaptionsColumns.push(this.getColumnName(rowsCaptionsColumn));
			}, this);
			for (var i = 0; i < rows.length; i++) {
				newRows.push({});
				for (var propertyName in rows[i]) {
					if (!rows[i].hasOwnProperty(propertyName)) {
						continue;
					}
					if ((Ext.Array.contains(rowsCaptionsColumns, propertyName) ||
						propertyName === this.primaryColumnName || propertyName === "Parent") && isRowsCaptions) {
						newRows[i][propertyName] = rows[i][propertyName];
					} else if (!(Ext.Array.contains(rowsCaptionsColumns, propertyName) || isRowsCaptions)) {
						newRows[i][propertyName] = rows[i][propertyName];
					}
				}
			}
			return newRows;
		},

		/**
		 * ##### ####### ################ ############# ####### ### ########## ####### ########### ## ######### #####.
		 * @overriden
		 * @param {Array} result
		 * @param {Object} options
		 * @param {Array} contentColumnsConfig
		 * @return {Number} ########## ########, ####### #### ######### ## ########.
		 */
		renderListedHierarchicalGrid: function(result, options, contentColumnsConfig) {
			var level = options.rowLevel || 0;
			var rows = options.rows || this.rows;
			var startResultLength = result.length;
			var parent = options[this.hierarchicalColumnName];
			for (var index = 0, length = rows.length; index < length; index++) {
				var row = rows[index];
				options.row = row;
				options[this.hierarchicalColumnName] = row[this.primaryColumnName];
				var id = (row[this.primaryColumnName] || index).toString();
				var rowStyles = this.rowsStyles[id];
				if ((!row.hasOwnProperty(this.hierarchicalColumnName) && !parent) ||
					(row[this.hierarchicalColumnName] === parent)) {
					var htmlConfig = this.getDefaultRowHtmlConfig(row);
					var rowCaptionPrefix = Ext.emptyString;
					if (!contentColumnsConfig) {
						rowCaptionPrefix = "rowCaption";
					}
					Ext.apply(htmlConfig, {
						tag: "div",
						cls: "grid-listed-row " + this.theoreticallyActiveRowCss,
						style: Ext.DomHelper.generateStyles(rowStyles),
						id: rowCaptionPrefix + this.id + this.collectionItemPrefix + id,
						children: [],
						level: level
					});
					if (contentColumnsConfig) {
						this.renderRowsCaptionColumns(htmlConfig.children, options, contentColumnsConfig);
					} else {
						this.renderColumns(htmlConfig.children, options);
					}
					result.push(htmlConfig);
					options.rowLevel = level + 1;
					var subRows = this.renderListedHierarchicalGrid(result, options, contentColumnsConfig);
					var rowHasNesting = row[this.hasNestingColumnName];
					if (!options.content) {
						htmlConfig.children.unshift({
							tag: "div",
							cls: "grid-fixed-col",
							html: ""
						});
						htmlConfig.id = this.id + this.collectionItemPrefix + id + "-caption";
					}
					var fixedCol = htmlConfig.children[0];
					var firstCell = htmlConfig.children[1];
					var baseOffset = 32;
					var contentOffset = 32;
					if (this.multiSelect) {
						baseOffset = 64;
						fixedCol.cls = "grid-fixed-col-2";
						var checkbox = this.createCheckbox({
							classes: {
								wrapClass: ["grid-listed-row-control"]
							},
							value: id
						});
						if (Terrasoft.contains(this.selectedRows, id)) {
							checkbox.setChecked(true);
						}
						fixedCol.html = checkbox.generateHtml() + fixedCol.html;
						this.checkboxes.push(checkbox);
					}
					var toggleCss = this.hierarchicalEmptyCss;
					if ((subRows > 0 || rowHasNesting) && !options.content) {
						toggleCss = this.hierarchicalPlusCss;
					}
					if (Terrasoft.contains(this.expandHierarchyLevels, id.toString())) {
						toggleCss = this.hierarchicalMinusCss;
					}
					if (!options.content) {
						fixedCol.html = this.hierarchicalPlus.apply({
							id: this.id + this.hierarchicalTogglePrefix + row[this.primaryColumnName],
							cls: toggleCss + " grid-listed-row-control"
						}) + fixedCol.html;
						fixedCol.style = "margin-left: " + ((contentOffset * level) + 6) + "px";
						firstCell.style += ";padding-left: " + (baseOffset + (contentOffset * level)) + "px";
					}
					if (level > 0) {
						var childrenClass = this.id + this.hierarchicalChildrenPrefix + row[this.hierarchicalColumnName];
						htmlConfig.cls += " " + childrenClass;
						if (!Terrasoft.contains(this.expandHierarchyLevels, parent.toString())) {
							htmlConfig.cls += " " + this.hiddenCss;
						}
					}
				}
			}
			return result.length - startResultLength;
		},

		/**
		 * ##### ###### ########## ###### ## ##### ######## #####.
		 * @overriden
		 * @param {Array} result
		 * @param {Object} options
		 * @param {Object} columnsConfig
		 */
		renderRowsCaptionColumns: function(result, options, columnsConfig) {
			var columns = columnsConfig;
			for (var i = 0, length = columns.length; i < length; i++) {
				var column = columns[i];
				if (Ext.isArray(column)) {
					options.column = column;
					this.renderRow(result, options);
				} else if (Ext.isObject(column)) {
					options.cell = column;
					this.renderCell(result, options);
				}
			}
		},

		/**
		 * ######## ######## ######## ############# ######.
		 * @private
		 * @param {event} event
		 */
		getInputCellValue: function(event) {
			var targetEl = Ext.get(event.target);
			var inputValue = null;
			if (targetEl && targetEl.dom) {
				inputValue = targetEl.dom.value;
			}
			return inputValue;
		}
	});
	return Terrasoft.PivotGrid;
});


