Terrasoft.configuration.Structures["MarketingCalendarGrid"] = {innerHierarchyStack: ["MarketingCalendarGrid"]};
define("MarketingCalendarGrid", ["css!MarketingCalendarGrid"], function() {
	Ext.define("Terrasoft.controls.MarketingCalendarGrid", {
		alternateClassName: "Terrasoft.MarketingCalendarGrid",
		extend: "Terrasoft.Grid",

		/**
		 * @overridden
		 */
		type: "listed",

		/**
		 * @overridden
		 */
		captionsCss: "marketing-calendar-grid-captions",

		categoryCss: "marketing-calendar-grid-listed-row-category",
		notCategoryCss: "marketing-calendar-grid-listed-row-notcategory",
		notCategorySubLevelCss: "marketing-calendar-grid-listed-row-notcategorysublevel",
		/**
		 * @overridden
		 */
		listedRowsCss: "marketing-calendar-grid-listed-row",

		/**
		 * @overridden
		 */
		colsCss: "marketing-calendar-grid-cols",

		/**
		 * Data grid rows wraper CSS class
		 */
		dataGridRowsWrapCss: "marketing-calendar-grid-rows-wrap",

		/**
		 * Data grid rows wraper DOM Id sufix
		 */
		dataGridRowsWrapDomIdSufix: "marketing-calendar-grid-rows-wrap",

		/**
		 * Vertical Scroll
		 * @protected
		 */
		scrollTop: null,

		/**
		 * @inheritDoc Terrasoft.Component#initDomEvents
		 * @overridden
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var tableEl = this.getTableEl();
			if (tableEl) {
				Ext.EventManager.addListener(tableEl, "scroll", this.onGridScroll, this);
			}
		},

		/**
		 * ########### ####### # ### ###########.
		 * @protected
		 * @param {Boolean} clear
		 */
		onDestroy: function() {
			if (this.rendered) {
				var tableEl = this.getTableEl();
				if (tableEl) {
					Ext.EventManager.removeListener(tableEl, "scroll", this.onGridScroll, this);
				}
			}
			this.callParent(arguments);
		},

		getTableEl: function() {
			return Ext.get(this.id + "-" + this.dataGridRowsWrapDomIdSufix);
		},

		/**
		 * Handles scroll of the right grid
		 * @protected
		 */
		onGridScroll: function() {
			var tableEl = this.getTableEl();
			this.scrollTop = tableEl.getScrollTop();
		},

		/**
		 * @inheritdoc Terrasoft.component#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			return Ext.apply(this.callParent(arguments), {
				scrollTop: {
					changeMethod: "setScrollTop"
				}
			});
		},

		/**
		 * Sets vertical scroll
		 * @param {Object} config
		 */
		setScrollTop: function(config) {
			var tableEl = this.getTableEl();
			if (tableEl) {
				tableEl.setScrollTop(config);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#renderListedGrid
		 * @overridden
		 * ##### ######## ################ ####### ### ########## ####### ########### ## ######### #####.
		 * @protected
		 * @param {Array} result
		 * @param {Object} options
		 */
		renderListedGrid: function(result, options) {
			var rows = options.rows || this.rows;
			var isRenderRows = (options.rows) ? true : false;
			var rowsWrapHtmlConfig = {
				tab: "div",
				cls: this.dataGridRowsWrapCss,
				id: this.id + "-" + this.dataGridRowsWrapDomIdSufix,
				children: []
			};
			for (var index = 0, length = rows.length; index < length; index += 1) {
				var row = rows[index];
				options.row = row;
				var id = (row[this.primaryColumnName] || index).toString();
				var rowStyles = this.rowsStyles[id];
				var htmlConfig = this.getDefaultRowHtmlConfig(row);
				var categoryStyle = "";
				var item = this.collection.get(row.Id);
				if (item) {
					if (item.get("IsCategory") === true) {
						categoryStyle = " " + this.categoryCss;
					} else if (item.get("IsCategory") === false) {
						if (item.get("SubLevel") === true) {
							categoryStyle = " " + this.notCategorySubLevelCss;
						} else {
							categoryStyle = " " + this.notCategoryCss;
						}
					}
				}

				Ext.apply(htmlConfig, {
					tag: "div",
					cls: this.listedRowsCss + " " + this.theoreticallyActiveRowCss + categoryStyle,
					style: Ext.DomHelper.generateStyles(rowStyles),
					id: this.id + this.collectionItemPrefix + id,
					children: []
				});
				if (item.get("IsCategory") === true || item.get("IsSubCategory") === true) {
					this.renderColumn(htmlConfig.children, options);
				} else {
					this.renderColumns(htmlConfig.children, options);
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
						htmlConfig.cls += " " + this.selectedRowCss;
						checkbox.setChecked(true);
					}
					fixedCol.html = checkbox.generateHtml() + htmlConfig.children[0].html;
					this.checkboxes.push(checkbox);
				} else {
					if (this.activeRow === id) {
						htmlConfig.cls += " " + this.activeRowCss;
					}
				}
				if (isRenderRows) {
					result.push(htmlConfig);
				} else {
					rowsWrapHtmlConfig.children.push(htmlConfig);
				}
			}
			/*jshint quotmark: false */
			var bottomSpinnerSpaceTpl = new Ext.Template(
					'<span class="marketing-calendar-grid-bottom-spinner-space"></span>');
			/*jshint quotmark: true */
			rowsWrapHtmlConfig.children.push(bottomSpinnerSpaceTpl.apply());
			if (isRenderRows === false) {
				result.push(rowsWrapHtmlConfig);
			}
		},

		/**
		 * ##### ###### ########## ####### ## ### ###### ##### (24).
		 * @protected
		 * @param {Array} result
		 * @param {Object} options
		 */
		renderColumn: function(result, options) {
			var columns = this.getColumnsConfig();
			var column = columns[0];
			if (Ext.isArray(column)) {
				options.column = column;
				this.renderRow(result, options);
			} else if (Ext.isObject(column)) {
				options.cell = column;
				var oldCols = options.cell.cols;
				options.cell.cols = 24;
				this.renderCell(result, options);
				options.cell.cols = oldCols;
			}
		},

		addRowsBottom: function(rows, options) {
			var wrapEl = this.getWrapEl();
			var element = wrapEl.select("[class*=\"grid-bottom-spinner-space\"]").item(0);
			var where = "beforeBegin";
			if (options.hasOwnProperty("spinner") && options.spinner) {
				where = "afterBegin";
			}
			Ext.DomHelper.insertHtml(where, element.dom, rows);
		}
	});
});


