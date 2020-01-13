/**
 * Hierarchical mixin for {@link Terrasoft.Grid}.
 */
Ext.define("Terrasoft.controls.mixins.HierarchicalGridMixin", {
	alternateClassName: "Terrasoft.HierarchicalGridMixin",

	/**
	 * @private
	 */
	_toggleFoldingOnExpandHierarchyLevelChange: false,

	/**
	 * Index of hierarchical display of data in the list.
	 * @cfg {Boolean} [hierarchical="false"]
	 */
	hierarchical: false,

	/**
	 * @type {Array}
	 */
	expandHierarchyLevels: null,

	/**
	 * Indicates do automatically expand hierarchy levels.
	 * @type {Boolean}
	 */
	autoExpandHierarchyLevels: false,

	/**
	 * Indicates do automatically update expandHierarchyLevels.
	 * @type {Boolean}
	 */
	forceUpdateExpandHierarchyLevels: false,

	/**
	 * The template element used to label the minimized state of the hierarchy node.
	 * @protected
	 * @type {Ext.Template}
	 */
	// jscs:disable
	/*jshint quotmark: false */
	hierarchicalPlus: new Ext.Template("<div id=\"{id}\" class=\"{cls}\"></div>"),
	/*jshint quotmark: true */
	// jscs:enable

	/**
	 * The template element used to mark the expanded state of the hierarchy node.
	 * @protected
	 * @type {Ext.Template}
	 */
	// jscs:disable
	/*jshint quotmark: false */
	hierarchicalMinus: new Ext.Template("<div id=\"{id}\" class=\"{cls}\"></div>"),
	/*jshint quotmark: true */
	// jscs:enable

	/**
	 * CSS  switch class of expandingcollapsing the hierarchy branch to the 'collapsed' state.
	 * @protected
	 * @property {String} hierarchicalPlusCss
	 */
	hierarchicalPlusCss: "grid-toggle-plus",

	/**
	 *  CSS  switch class of expandingcollapsing the hierarchy branch to the 'expand' state.
	 * @protected
	 * @property {String} hierarchicalMinusCss
	 */
	hierarchicalMinusCss: "grid-toggle-minus",

	/**
	 *  CSS  switch class of expandingcollapsing the hierarchy branch to the state
	 * in which there is no need to display the switch.
	 * @property {String} hierarchicalEmptyCss
	 */
	hierarchicalEmptyCss: "grid-toggle-empty",

	/**
	 * The prefix of the DOM element identifier responsible for expanding/collapsing the hierarchy branch.
	 * @protected
	 * @property {String} hierarchicalTogglePrefix
	 */
	hierarchicalTogglePrefix: "-toggle-",

	/**
	 * The prefix of the DOM element class of the responder to display and hide the subordinate branches in the hierarchy.
	 * @protected
	 * @property {String} hierarchicalChildrenPrefix
	 */
	hierarchicalChildrenPrefix: "-children-",

	/**
	 * A value key in the data that serves as a pointer to the parent's identifier when building the data hierarchy.
	 * @type {String}
	 */
	hierarchicalColumnName: "Parent",

	/**
	 * Points to the need for using level rendering.
	 * @type {Boolean} [useLevelRendering="false"]
	 */
	useLevelRendering: false,

	/**
	 * A set of elements that track client events by expanding/collapsing hierarchy branches.
	 * @protected
	 * @type {Ext.CompositeElement}
	 */
	toggleRows: null,

	/**
	 * ndent the line in the list.
	 * @type {Number}
	 */
	baseOffset: 32,

	/**
	 * The indent of the expand/collapse button of the branch.
	 * @type {Number}
	 */
	contentOffset: 32,

	/**
	 * Indentation of the checkbox in the mode of multiple selection (width + margin-right).
	 * @type {Number}
	 */
	checkboxOffset: 32,

	/**
	 * Returns margin-right or margin-left style with offset, depending on RTL or LTR mode.
	 * @private
	 * @param {Object} offsetOptions Options for calculating margin offset.
	 * @return {String} Margin style with calculated offset.
	 */
	_getMarginOffset: function(offsetOptions) {
		var marginLeftOffset = (this.contentOffset * offsetOptions.level) + offsetOptions.marginLeftOffset;
		var direction = Terrasoft.getIsRtlMode() ? "right" : "left";
		return Ext.String.format("margin-{0}: {1}px", direction, marginLeftOffset);
	},

	/**
	 * Returns padding-right or padding-left style, depending on RTL or LTR mode.
	 * @private
	 * @param {Object} offsetOptions Options for calculating padding offset.
	 * @return {String} Padding style with calculated offset.
	 */
	_getPaddingOffset: function(offsetOptions) {
		var paddingLeftOffset = (this.contentOffset * offsetOptions.level) + offsetOptions.paddingLeftOffset;
		var direction = Terrasoft.getIsRtlMode() ? "right" : "left";
		var paddingOffset = Ext.String.format("padding-{0}:  {1}px", direction, paddingLeftOffset);
		return paddingOffset;
	},

	/**
	 * @private
	 */
	_getParentId: function(id) {
		var parent = this.collection.get(id).get(this.hierarchicalColumnName);
		return Ext.isObject(parent) ? parent.value : parent;
	},

	/**
	 * Filters grid rows by parent unique identifier.
	 * @private
	 * @param {String} parentId Parent unique identifier.
	 * @return {Array} Filtered rows.
	 */
	filterRowsByParent: function(parentId) {
		var hierarchicalColumnName = this.hierarchicalColumnName;
		return this.rows.filter(function(item) {
			return item.hasOwnProperty(hierarchicalColumnName) && item[hierarchicalColumnName] === parentId;
		}, this);
	},

	/**
	 * Adds the hierarchicalColumnName and rowLevel properties to the options for the hierarchical list.
	 * @param {BaseViewModel} item A collection item.
	 * @param {Object} options An object that contains an array of strings and additional parameters.
	 */
	addHierarchicalOptions: function(item, options) {
		var firstParentItem = item.get(this.hierarchicalColumnName);
		options[this.hierarchicalColumnName] = firstParentItem;
		if (this.type === "listed" && firstParentItem) {
			var firstParentItemDom = this.getDomRow(firstParentItem);
			var parentLevel = parseInt(firstParentItemDom.getAttribute("level"), 10);
			options.rowLevel = parentLevel + 1;
		}
	},

	/**
	 * Removes the hierarchicalTogglePrefix from the string and, if the list is hierarchical,
	 * deletes the hierarchicalTogglePrefix from the parent, if it no longer has child elements.
	 * @private
	 * @param {Terrasoft.BaseViewModel} item A collection item.
	 */
	deleteItemHierarchicalToggle: function(item) {
		var wrapEl = this.getWrapEl();
		var toggles = wrapEl.select("[id*=\"" + this.hierarchicalTogglePrefix + "\"]");
		var id = item.get(this.primaryColumnName);
		var toggleId = this.id + this.hierarchicalTogglePrefix + id;
		toggles.each(function(item) {
			if (toggleId === item.dom.id) {
				Ext.removeNode(item.dom);
				return false;
			}
		}, this);
		if (this.hierarchical) {
			var parentRowId = item.get(this.hierarchicalColumnName);
			var parentRow = this.collection.find(parentRowId);
			var children = [];
			this.getAllItemChildren(children, parentRowId);
			if (Ext.isEmpty(parentRowId) || Ext.isEmpty(parentRow) || children.length > 0) {
				return;
			}
			this.removeExpandHierarchyLevel(parentRowId);
			this.deleteItemHierarchicalToggle(parentRow);
		}
	},

	/**
	 * Handles hierarchy plus click.
	 * @param {String} rowId Row identifier.
	 * @param {Boolean} silent Identifies if event wont be fired.
	 */
	toggleHierarchyFolding: function(rowId, silent) {
		var root = this.getWrapEl();
		var toggle = Ext.get(this.id + this.hierarchicalTogglePrefix + rowId);
		var children = Ext.select("[class~=\"" + this.id + this.hierarchicalChildrenPrefix + rowId + "\"]", root);
		var status;
		if (toggle && toggle.hasCls(this.hierarchicalPlusCss)) {
			this.expandHierarchy(toggle, children, rowId);
			this.addExpandHierarchyLevel(rowId);
			status = true;
		} else if (toggle && toggle.hasCls(this.hierarchicalMinusCss)) {
			this.collapseHierarchy(toggle, children);
			this.removeExpandHierarchyLevel(rowId);
			status = false;
		}
		if (!silent) {
			this.fireEvent("updateExpandHierarchyLevels", rowId, status);
		}
	},

	/**
	 * Expands level of hierarchy.
	 * @param {Object} toggle Toggle element.
	 * @param {Array} children Hierarchy level elements.
	 * @param {String} rowId Row identifier.
	 */
	expandHierarchy: function(toggle, children, rowId) {
		toggle.removeCls(this.hierarchicalPlusCss);
		toggle.addCls(this.hierarchicalMinusCss);
		if (Ext.isEmpty(children)) {
			return;
		}
		if (rowId && Ext.isEmpty(children.elements) && this.useLevelRendering) {
			var rowItem = this.getDomRow(rowId);
			var childItems = [];
			var options = {};
			var rowLevelAtt = rowItem.getAttribute("level") || 0;
			options.rowLevel = parseInt(rowLevelAtt, 10) + 1;
			options.levelRows = this.filterRowsByParent(rowId);
			this.renderHierarchicalListedLevel(childItems, options);
			Ext.DomHelper.insertAfter(rowItem, Ext.DomHelper.markup([childItems]));
		}
		children.each(function(row) {
			row.removeCls(this.hiddenCss);
		}, this);
	},

	collapseHierarchy: function(toggle, children) {
		toggle.removeCls(this.hierarchicalMinusCss);
		toggle.addCls(this.hierarchicalPlusCss);
		children.each(function(row) {
			if (this.type === "listed") {
				var childToggleRows = Ext.dom.Query.selectNode("[class~=\"" + this.hierarchicalMinusCss + "\"]", row.dom);
				if (childToggleRows) {
					childToggleRows.click();
				}
			}
			row.addCls(this.hiddenCss);
		}, this);
	},

	addExpandHierarchyLevel: function(rowId) {
		var expandHierarchyLevels = Ext.Array.clone(this.expandHierarchyLevels);
		var id = rowId.toString();
		if (!Terrasoft.contains(expandHierarchyLevels, id)) {
			expandHierarchyLevels.push(id);
		}
		this.expandHierarchyLevels = expandHierarchyLevels;
	},

	removeExpandHierarchyLevel: function(rowId) {
		var expandHierarchyLevels = Ext.Array.clone(this.expandHierarchyLevels);
		var id = rowId.toString();
		if (Terrasoft.contains(expandHierarchyLevels, id)) {
			expandHierarchyLevels = Terrasoft.without(expandHierarchyLevels, id);
		}
		this.expandHierarchyLevels = expandHierarchyLevels;
	},

	setExpandHierarchyLevel: function(values) {
		if (!Terrasoft.areArraysEqual(this.expandHierarchyLevels, values)) {
			if (this._toggleFoldingOnExpandHierarchyLevelChange) {
				_.difference(this.expandHierarchyLevels, values).forEach((i) => this.toggleHierarchyFolding(i, true));
			}
			values.forEach(this.addExpandHierarchyLevel, this);
			this.safeRerender();
		}
	},

	/**
	 * Reset expandHierarchyLevels.
	 */
	resetExpandHierarchyLevel: function() {
		this.expandHierarchyLevels = [];
	},

	/**
	 * A method for creating a nested layout for a hierarchical method of displaying a modular grid.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 * @return {Number} The number of children that were added for the iteration.
	 */
	renderTiledHierarchicalGrid: function(result, options) {
		var rows = options.rows || this.rows;
		var startResultLength = result.length;
		var parent = options[this.hierarchicalColumnName];
		var multiSelect = this.multiSelect;
		for (var index = 0, length = rows.length; index < length; index += 1) {
			var row = rows[index];
			var rowHasNesting = row[this.hasNestingColumnName];
			options.row = row;
			options[this.hierarchicalColumnName] = row[this.primaryColumnName];
			var id = (row[this.primaryColumnName] || index).toString();
			var rowStyles = this.rowsStyles[id];
			var subRows;
			var toggleCss;
			var checkbox;
			var htmlConfig = this.getDefaultRowHtmlConfig(row);
			if (!row.hasOwnProperty(this.hierarchicalColumnName) && !parent) {
				Ext.apply(htmlConfig, {
					tag: "div",
					cls: "grid-row grid-pad " + this.theoreticallyActiveRowCss,
					style: Ext.DomHelper.generateStyles(rowStyles),
					id: this.id + this.collectionItemPrefix + id,
					children: [
						{
							tag: "div",
							cls: multiSelect ? "grid-fixed-col-2" : "grid-fixed-col",
							html: ""
						}
					]
				});
				this.renderColumns(htmlConfig.children, options);
				subRows = this.renderTiledHierarchicalGrid(htmlConfig.children, options);
				toggleCss = this.hierarchicalEmptyCss;
				if (subRows > 0 || rowHasNesting) {
					toggleCss = this.hierarchicalPlusCss;
				}
				if (Terrasoft.contains(this.expandHierarchyLevels, id.toString())) {
					toggleCss = this.hierarchicalMinusCss;
				}
				htmlConfig.children[0].html = this.hierarchicalPlus.apply({
					id: this.id + this.hierarchicalTogglePrefix + row[this.primaryColumnName],
					cls: toggleCss + " grid-listed-row-control"
				});
				if (multiSelect) {
					checkbox = this.createCheckbox({
						classes: {
							wrapClass: ["grid-listed-row-control"]
						},
						value: id
					});
					if (Terrasoft.contains(this.selectedRows, id)) {
						htmlConfig.cls += " " + this.selectedRowCss;
						checkbox.setChecked(true);
					}
					htmlConfig.children[0].html += checkbox.generateHtml();
					this.checkboxes.push(checkbox);
				} else if (this.activeRow === id) {
					htmlConfig.cls += " " + this.activeRowCss;
				}
				result.push(htmlConfig);
			} else if (row[this.hierarchicalColumnName] === parent) {
				var childrenClass = this.id + this.hierarchicalChildrenPrefix + row[this.hierarchicalColumnName];
				Ext.apply(htmlConfig, {
					tag: "div",
					cls: "grid-row " + childrenClass,
					children: [
						{
							tag: "div",
							cls: "grid-row grid-pad " + this.theoreticallyActiveRowCss,
							style: Ext.DomHelper.generateStyles(rowStyles),
							id: this.id + this.collectionItemPrefix + id,
							children: [
								{
									tag: "div",
									cls: multiSelect ? "grid-fixed-col-2" : "grid-fixed-col",
									html: ""
								}
							]
						}
					]
				});
				if (!Terrasoft.contains(this.expandHierarchyLevels, parent.toString())) {
					htmlConfig.cls += " " + this.hiddenCss;
				}
				this.renderColumns(htmlConfig.children[0].children, options);
				subRows = this.renderTiledHierarchicalGrid(htmlConfig.children[0].children, options);
				toggleCss = this.hierarchicalEmptyCss;
				if (subRows > 0 || rowHasNesting) {
					toggleCss = this.hierarchicalPlusCss;
				}
				if (Terrasoft.contains(this.expandHierarchyLevels, id.toString())) {
					toggleCss = this.hierarchicalMinusCss;
				}
				htmlConfig.children[0].children[0].html = this.hierarchicalPlus.apply({
					id: this.id + this.hierarchicalTogglePrefix + row[this.primaryColumnName],
					cls: toggleCss + " grid-listed-row-control"
				});
				if (multiSelect) {
					checkbox = this.createCheckbox({
						classes: {
							wrapClass: ["grid-listed-row-control"]
						},
						value: id
					});
					if (Terrasoft.contains(this.selectedRows, id)) {
						htmlConfig.children[0].cls += " " + this.selectedRowCss;
						checkbox.setChecked(true);
					}
					htmlConfig.children[0].children[0].html += checkbox.generateHtml();
					this.checkboxes.push(checkbox);
				} else if (this.activeRow === id) {
					htmlConfig.children[0].cls += " " + this.activeRowCss;
				}
				result.push(htmlConfig);
			}
			continue;
		}
		return result.length - startResultLength;
	},

	/**
	 * Renders listed hierarchical grid elements.
	 * @protected
	 * @param {Array} result Elements html configuration inforamtion.
	 * @param {Object} options Options for rendering.
	 * @return {Number} The number of children, that was added per iteration.
	 */
	renderListedHierarchicalGrid: function(result, options) {
		var level = options.rowLevel || 0;
		var rows = options.rows || this.rows;
		var startResultLength = result.length;
		var hierarchicalColumnName = this.hierarchicalColumnName;
		if (this.useLevelRendering && Terrasoft.isEmptyObject(options)) {
			var childItems = this.getHierarchicalListedTopLevelItems();
			this.renderHierarchicalChildItems(result, childItems, level);
			return (result.length - startResultLength);
		}
		var parent = options[hierarchicalColumnName];
		for (var index = 0, length = rows.length; index < length; index += 1) {
			var row = rows[index];
			options.row = row;
			options[hierarchicalColumnName] = row[this.primaryColumnName];
			var id = (row[this.primaryColumnName] || index).toString();
			if ((!row.hasOwnProperty(hierarchicalColumnName) && !parent) || (row[hierarchicalColumnName] === parent)) {
				var htmlConfig = this.getDefaultRowHtmlConfig(row);
				this.applyHierarchicalRowDefaultOptions(htmlConfig, {id: id, level: level});
				this.renderColumns(htmlConfig.children, options);
				result.push(htmlConfig);
				options.rowLevel = level + 1;
				var subRows = this.renderListedHierarchicalGrid(result, options);
				var rowHasNesting = row[this.hasNestingColumnName];
				htmlConfig.children.unshift({
					tag: "div",
					cls: "grid-fixed-col",
					html: ""
				});
				var baseOffset = this.baseOffset;
				if (this.multiSelect) {
					baseOffset = this.baseOffset + this.checkboxOffset;
					this.processListedHierarchicalMultiSelectGrid(htmlConfig, id);
				}
				if (!this.multiSelect && this.activeRow === id) {
					htmlConfig.cls += " " + this.activeRowCss;
				}
				var isHierarchicalMinusCss = Terrasoft.contains(this.expandHierarchyLevels, id);
				this.addToggleCssToListedHierarchicalGrid(htmlConfig, {
					isHierarchicalPlusCss: subRows > 0 || rowHasNesting,
					isHierarchicalMinusCss: isHierarchicalMinusCss,
					row: row
				});
				this.addOffsetToListedHierarchicalGridRow(htmlConfig, {
					level: level,
					marginLeftOffset: 6,
					paddingLeftOffset: baseOffset
				});
				if (level > 0) {
					var childrenClass = this.id + this.hierarchicalChildrenPrefix + row[this.hierarchicalColumnName];
					htmlConfig.cls += " " + childrenClass;
					if (!Terrasoft.contains(this.expandHierarchyLevels, parent.toString())) {
						htmlConfig.cls += " " + this.hiddenCss;
					}
				}
			}
		}
		return (result.length - startResultLength);
	},

	/**
	 * Renders child rows for hierarchical grid row.
	 * @private
	 * @param {Array} result Elements html configuration inforamtion.
	 * @param {Array} items Child items.
	 * @param {Number} level Child items level.
	 */
	renderHierarchicalChildItems: function(result, items, level) {
		var options = {};
		Terrasoft.each(items, function(levelItem) {
			var childItems = this.filterRowsByParent(levelItem.Id);
			options.rowLevel = level;
			options.levelRows = [levelItem];
			var childConfig = [];
			this.renderHierarchicalListedLevel(childConfig, options);
			if (Terrasoft.contains(this.expandHierarchyLevels, levelItem.Id)) {
				this.addToggleCssToListedHierarchicalGrid(childConfig[0], {
					isHierarchicalPlusCss: false,
					isHierarchicalMinusCss: true,
					row: levelItem
				});
				result.push(childConfig);
				this.renderHierarchicalChildItems(result, childItems, level + 1);
			} else {
				result.push(childConfig);
			}
		}, this);
	},

	/**
	 * Returns hierarchical top row items.
	 * @private
	 * @return {Array}
	 */
	getHierarchicalListedTopLevelItems: function() {
		var hierarchicalColumnName = this.hierarchicalColumnName;
		var topLevel = this.rows.filter(function(item) {
			return !item.hasOwnProperty(hierarchicalColumnName) && Ext.isEmpty(item[hierarchicalColumnName]);
		});
		return topLevel;
	},

	/**
	 * Renders hierarchical level items.
	 * @private
	 * @param {Array} levelItems Rendered items.
	 * @param {Object} options Rendering options.
	 */
	renderHierarchicalListedLevel: function(levelItems, options) {
		var levelRows = options.levelRows;
		var level = options.rowLevel || 0;
		var rows = this.rows;
		var hierarchicalColumnName = this.hierarchicalColumnName;
		Terrasoft.each(levelRows, function(row, index) {
			var rowId = row.Id;
			options.row = row;
			options[hierarchicalColumnName] = row[this.primaryColumnName];
			var id = (row[this.primaryColumnName] || index).toString();
			var htmlConfig = this.getDefaultRowHtmlConfig(row);
			this.applyHierarchicalRowDefaultOptions(htmlConfig, {id: id, level: level});
			this.renderColumns(htmlConfig.children, options);
			levelItems.push(htmlConfig);
			htmlConfig.children.unshift({
				tag: "div",
				cls: "grid-fixed-col",
				html: ""
			});
			var baseOffset = this.baseOffset;
			if (this.multiSelect) {
				baseOffset = this.baseOffset + this.checkboxOffset;
				this.processListedHierarchicalMultiSelectGrid(htmlConfig, id);
			}
			if (!this.multiSelect && this.activeRow === id) {
				htmlConfig.cls += " " + this.activeRowCss;
			}
			var nestedElement = {};
			nestedElement[hierarchicalColumnName] = rowId;
			var firstNestingElement = Terrasoft.findWhere(rows, nestedElement);
			var isRowHasNestingElements = row[this.hasNestingColumnName];
			this.addToggleCssToListedHierarchicalGrid(htmlConfig, {
				isHierarchicalPlusCss: !Ext.isEmpty(firstNestingElement) || isRowHasNestingElements,
				isHierarchicalMinusCss: false,
				row: row
			});
			this.addOffsetToListedHierarchicalGridRow(htmlConfig, {
				level: level,
				marginLeftOffset: 6,
				paddingLeftOffset: baseOffset
			});
			if (level > 0) {
				var childrenClass = this.id + this.hierarchicalChildrenPrefix + row[hierarchicalColumnName];
				htmlConfig.cls += " " + childrenClass;
			}
		}, this);
	},

	/**
	 * Adds offset to listed hierarchical grid..
	 * @private
	 * @param {Object} htmlConfig Html configuration information for rendering row.
	 * @param {Object} offsetOptions Offset options.
	 * @param {Number} offsetOptions.marginLeftOffset Left margin offset.
	 * @param {Number} offsetOptions.paddingLeftOffset Left padding offset.
	 * @param {Object} offsetOptions.level Hierarchical grid level.
	 */
	addOffsetToListedHierarchicalGridRow: function(htmlConfig, offsetOptions) {
		var children = htmlConfig && htmlConfig.children;
		if (children && children.length > 1) {
			var fixedCol = children[0];
			var firstCell = children[1];
			fixedCol.style = this._getMarginOffset(offsetOptions);
			firstCell.style = this._getPaddingOffset(offsetOptions);
		}
	},

	/**
	 * Adds toggle styles to listed hierarchical grid..
	 * @private
	 * @param {Object} htmlConfig Html configuration information for rendering row.
	 * @param {Object} options Toggle options.
	 * @param {Boolean} options.isHierarchicalPlusCss Says to set hierarchical plus css.
	 * @param {Boolean} options.isHierarchicalMinusCss Says to set hierarchical minus css.
	 * @param {Object} options.row Listed hierarchical row.
	 */
	addToggleCssToListedHierarchicalGrid: function(htmlConfig, options) {
		var children = htmlConfig && htmlConfig.children;
		if (children && children.length > 0) {
			var fixedCol = children[0];
			var toggleCss = this.hierarchicalEmptyCss;
			if (options.isHierarchicalPlusCss) {
				toggleCss = this.hierarchicalPlusCss;
			}
			if (options.isHierarchicalMinusCss) {
				toggleCss = this.hierarchicalMinusCss;
			}
			var togglerId = this.id + this.hierarchicalTogglePrefix + options.row[this.primaryColumnName];
			var togglerHtml = this.hierarchicalPlus.apply({
				id: togglerId,
				cls: Ext.String.format("{0} grid-listed-row-control", toggleCss)
			});
			fixedCol.html = fixedCol.html.indexOf(togglerId) === -1 ? togglerHtml + fixedCol.html : togglerHtml;
		}
	},

	/**
	 * Process listed hierarchical multi select grid.
	 * @private
	 * @param {Object} htmlConfig Html configuration information for rendering row.
	 * @param {String} rowId Dom row id.
	 */
	processListedHierarchicalMultiSelectGrid: function(htmlConfig, rowId) {
		var children = htmlConfig && htmlConfig.children;
		if (children && children.length > 0) {
			var fixedCol = children[0];
			fixedCol.cls = "grid-fixed-col-2";
			var checkbox = this.createCheckbox({
				classes: {
					wrapClass: ["grid-listed-row-control"]
				},
				value: rowId
			});
			if (Terrasoft.contains(this.selectedRows, rowId)) {
				htmlConfig.cls += " " + this.selectedRowCss;
				checkbox.setChecked(true);
			}
			fixedCol.html = checkbox.generateHtml() + fixedCol.html;
			this.checkboxes.push(checkbox);
		}
	},

	/**
	 * Applies hierarchical default options to row.
	 * @private
	 * @param {Object} htmlConfig Html configuration information for rendering row.
	 * @param {Object} rowConfig Row configuration information.
	 */
	applyHierarchicalRowDefaultOptions: function(htmlConfig, rowConfig) {
		var id = rowConfig.id;
		var rowStyles = this.rowsStyles[id];
		var rowClass = Ext.String.format("{0} {1}", this.listedRowsCss, this.theoreticallyActiveRowCss);
		var rowDomId = this.id + this.collectionItemPrefix + id;
		Ext.apply(htmlConfig, {
			tag: "div",
			cls: rowClass,
			style: Ext.DomHelper.generateStyles(rowStyles),
			id: rowDomId,
			children: [],
			level: rowConfig.level
		});
	},

	/**
	 * Expands hierarchical view to active row.
	 * @param activeRow
	 */
	expandHierarchyToActiveRow: function(activeRow) {
		var hasActiveRow = activeRow && this.collection && this.collection.contains(activeRow);
		var autoExpand = this.autoExpandHierarchyLevels && this.hierarchical && this.hierarchicalColumnName;
		if (hasActiveRow && autoExpand) {
			var parentId = this._getParentId(activeRow);
			while (parentId) {
				if (!Terrasoft.contains(this.expandHierarchyLevels, parentId)) {
					this.toggleHierarchyFolding(parentId);
				}
				parentId = this._getParentId(parentId);
			}
		}
	}

});
