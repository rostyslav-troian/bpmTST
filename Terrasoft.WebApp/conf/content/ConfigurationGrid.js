Terrasoft.configuration.Structures["ConfigurationGrid"] = {innerHierarchyStack: ["ConfigurationGrid"]};
define("ConfigurationGrid", ["css!ConfigurationGrid"], function() {

	Ext.define("Terrasoft.controls.ConfigurationGrid", {
		extend: "Terrasoft.Grid",
		alternateClassName: "Terrasoft.ConfigurationGrid",

		/**
		 * @inheritdoc Terrasoft.Grid#activeRowCss
		 * @override
		 */
		activeRowCss: "configuration-grid-row-active",

		/**
		 * ######## ########## ######## ######.
		 * @private
		 * @type {Array}
		 */
		activeRowControls: null,

		/**
		 * @inheritdoc Terrasoft.Grid#actionsRowTpl
		 * @override
		 */
		actionsRowTpl: new Ext.Template("<div id=\"{id}\" class=\"configuration-grid-row-actions\"></div>"),

		/**
		 * ####### ####### DOM-######## ###### ######### ############## ######## ######.
		 * @protected
		 */
		controlsRowTpl: new Ext.Template("<div id=\"{id}\" class=\"grid-row-controls\"></div>"),

		/**
		 * ####### ############## DOM-######## ###### ######### ############## ######## ######.
		 * @protected
		 */
		controlsRowPrefix: "-controls-item-",

		/**
		 * .
		 * @private
		 */
		columnNameAttribute: "column-name",

		/**
		 * @inheritdoc Terrasoft.Grid#selectedRowCss
		 * @override
		 */
		selectedRowCss: "configuration-grid-row-selected",

		/**
		 * ######### ###### Ext.KeyMap ### ######### ####### ###### # ######## ######.
		 * @private
		 * @type {Ext.KeyMap}
		 */
		keyMap: null,

		/**
		 * ####### ############# ######### ####### ###### # ######## ######.
		 * @private
		 * @type {Boolean}
		 */
		keyMapEnabled: true,

		/**
		 * ####### ############# ####### ########## # ####### # #######.
		 * @type {Boolean}
		 */
		useLinks: false,

		/**
		 * @inheritdoc Terrasoft.Grid#activateRow
		 * @override
		 */
		activateRow: function(id) {
			this.callParent(arguments);
			this.addRowControls(id);
		},

		/**
		 * ######### ######## ############## ######## ######.
		 * @private
		 * @param {String} id ############# ######## ######.
		 */
		addRowControls: function(id) {
			var renderTo = this.createControlsRow(id);
			if (renderTo) {
				this.initKeyMap(renderTo);
				this.renderRowControls(renderTo, id);
			}
		},

		/**
		 * ######### ######## ######### ############## ######## ######.
		 * @private
		 * @param {String} oldId
		 * @param {String} newId
		 * @return {Object} True, #### ######## ######### ########## #########.
		 */
		changeRow: function(oldId, newId) {
			var config = {
				success: true,
				oldId: oldId,
				newId: newId
			};
			this.fireEvent("changeRow", config);
			return config.success;
		},

		/**
		 * ####### # ######### ######### ### ######### ######### ############## ######## ######.
		 * @private
		 * @param {String} id ############# ######.
		 * @return {Object} ######### ### ######### ######### ############## ######## ######.
		 */
		createControlsRow: function(id) {
			var item = Ext.get(this.id + this.collectionItemPrefix + id);
			if (!item || !item.dom) {
				return;
			}
			var html = this.controlsRowTpl.apply({
				id: this.id + this.controlsRowPrefix + id
			});
			var renderToNode = Ext.DomHelper.insertHtml("beforeEnd", item.dom, html);
			var controlsRow = Ext.get(renderToNode);
			controlsRow.on("click", this.onControlsContainerClick, this);
			return controlsRow;
		},

		/**
		 * @inheritdoc Terrasoft.Grid#createActionsRow
		 * @override
		 */
		createActionsRow: function(id) {
			var item = Ext.get(this.id + this.collectionItemPrefix + id);
			if (!item) {
				return;
			}
			var renderTo;
			var where = "beforeEnd";
			var el = item.dom;
			var html = this.actionsRowTpl.apply({
				id: this.id + this.actionsRowPrefix + id
			});
			var renderToNode = Ext.DomHelper.insertHtml(where, el, html);
			renderTo = Ext.get(renderToNode);
			return renderTo;
		},

		/**
		 * @inheritdoc Terrasoft.Grid#deactivateRow
		 * @override
		 */
		deactivateRow: function(id) {
			this.callParent(arguments);
			this.removeRowControls(id);
		},

		/**
		 *
		 */
		deactivateRows: function() {
			this.setActiveRow(null);
		},

		/**
		 * ########## ######## ## ####### body.
		 * @private
		 */
		destroyActiveRowControls: function() {
			Terrasoft.each(this.activeRowControls, function(activeRowControl) {
				activeRowControl.destroy();
			}, this);
			this.activeRowControls = [];
		},

		/**
		 * ########## ######## ## ####### body.
		 * @private
		 */
		destroyBodyEvents: function() {
			var body = Ext.getBody();
			body.un("click", this.deactivateRows, this);
		},

		/**
		 * ####### ########### ####### ###### # ######## ######.
		 * @private
		 */
		destroyKeyMap: function() {
			if (this.keyMap) {
				this.keyMap.destroy();
				this.keyMap = null;
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#formatCellContent
		 * @override
		 */
		formatCellContent: function(htmlConfig, data, column) {
			htmlConfig[this.columnNameAttribute] = column.name.bindTo;
			return this.callParent(arguments);
		},

		/**
		 * ########## ######## ####### ## ####### ### ########## #### ### ###### ######.
		 * @param {Object} target
		 * @return {String} ######## ####### ## ####### ### ########## #### ### ###### ######.
		 */
		getActiveColumnName: function(target) {
			var targetEl = Ext.get(target);
			var column = targetEl.findParent("[" + this.columnNameAttribute + "]", this.getWrapEl().dom);
			return column ? column.getAttribute(this.columnNameAttribute) : "";
		},

		/**
		 * ########## ###### ############# ######.
		 * @private
		 * @param {String} id ############# ######.
		 * @return {Terrasoft.BaseViewModel} ###### ############# ######.
		 */
		getActiveRowViewModel: function(id) {
			if (this.collection) {
				return this.collection.get(id);
			}
		},

		/**
		 * ########## ############ ######## # ######. ######### ######### ####### {@link Terrasoft.Bindable}.
		 * @protected
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var gridBindConfig = {
				keyMapEnabled: {
					changeMethod: "setKeyMapEnabled"
				}
			};
			Ext.apply(gridBindConfig, bindConfig);
			return gridBindConfig;
		},

		/**
		 * ########## ############ ######### ############## ######## ######.
		 * @private
		 * @param {String} id ############# ######.
		 * @return {Array} ############ ######### ##############.
		 */
		getRowControls: function(id) {
			var rowControls = [];
			this.fireEvent("generateControlsConfig", id, this.columnsConfig, rowControls);
			return rowControls;
		},

		/**
		 * ########## ######## #######.
		 * @private
		 * @param {String} id ############# ######.
		 * @return {Object} ######## #######.
		 */
		getDomRowColumns: function(id) {
			var root = this.getWrapEl();
			if (!this.rendered || !id || !root) {
				return null;
			}
			var row = this.getDomRow(id);
			return row.select("[class*=\"grid-cols-\"]");
		},

		/**
		 * @inheritdoc Terrasoft.Grid#init
		 * @override
		 */
		init: function() {
			this.activeRowControls = [];
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * ######### ############ ######### ############## ######## ######.
				 */
				"generateControlsConfig",
				/**
				 * @event
				 * ######### ######## ######### ############## ######## ######.
				 */
				"validateRow",
				/**
				 * @event
				 * ####### ####### ###### # ######## ######.
				 */
				"initActiveRowKeyMap",
				/**
				 * @event
				 *
				 */
				"onGridClick",
				/**
				 * @event
				 *
				 */
				"changeRow"
			);
			this.classes.wrapEl.push("configuration-grid");
			this.initBodyEvents();
		},

		/**
		 * ############## ######## ## ####### body.
		 * @private
		 */
		initBodyEvents: function() {
			var body = Ext.getBody();
			body.on("click", this.deactivateRows, this);
		},

		/**
		 * ############## ######## ## ####### ####### ###### # ######## ######.
		 * @private
		 */
		initKeyMap: function(target) {
			var keyMap = [];
			this.fireEvent("initActiveRowKeyMap", keyMap);
			if (keyMap.length) {
				this.keyMap = new Ext.util.KeyMap({
					target: target,
					binding: keyMap
				});
			}
		},

		/**
		 * ############## ######## ############## ######## ######.
		 * @private
		 */
		initControlsRow: function() {
			let rows;
			if (this.multiSelect) {
				rows = this.selectedRows;
			} else {
				rows = this.activeRow ? [this.activeRow] : [];
			}
			rows.forEach(function(id) {
				this.addRowControls(id);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.Grid#initColumnBindings
		 * @override
		 */
		initColumnBindings: function(columnsConfig) {
			if (this.useLinks) {
				this.callParent(arguments);
				return;
			}
			var bindings = this.columnBindings;
			Terrasoft.each(columnsConfig, function(configItem) {
				if (Ext.isArray(configItem)) {
					this.initColumnBindings(configItem);
				} else {
					for (var propertyName in configItem) {
						if (propertyName === "link") {
							continue;
						}
						var item = configItem[propertyName];
						if (Ext.isArray(item)) {
							this.initColumnBindings(item);
						} else if (Ext.isObject(item) && item.bindTo) {
							var binding = this.initBinding(propertyName, item);
							if (binding) {
								binding.config.isColumnConfig = true;
								var GridKeyType = Terrasoft.GridKeyType;
								if (propertyName.type === GridKeyType.ICON16 ||
									propertyName.type === GridKeyType.ICON22 ||
									propertyName.type === GridKeyType.ICON32 ||
									propertyName.type === GridKeyType.ICON16LISTED ||
									propertyName.type === GridKeyType.ICON22LISTED ||
									propertyName.type === GridKeyType.ICON32LISTED) {
									binding.imageSize = this.getIconSize(propertyName.type);
								}
								bindings[item.bindTo] = binding;
							}
						}
					}
				}
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.Grid#initActionItems
		 * @override
		 */
		initActionItems: function() {
			var activeRow = this.activeRow;
			if (activeRow) {
				this.addRowActions(activeRow);
			}
		},

		/**
		 * @inheritdoc
		 * @override
		 */
		selectRow: function(id) {
			if (this.rendered) {
				this.setCheckboxChecked(id, true);
			}
			this.fireEvent("selectRow", id);
		},

		/**
		 * @inheritdoc
		 * @override
		 */
		unselectRow: function(id) {
			if (this.rendered) {
				this.setCheckboxChecked(id, false);
			}
			this.fireEvent("unSelectRow", id);
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onUpdateItem
		 * @override
		 */
		onUpdateItem: function(item) {
			if (item.get(this.primaryColumnName) === this.activeRow) {
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
				this.renderColumns(columns, options);
				var domRowColumns = this.getDomRowColumns(id);
				domRowColumns.each(function(domRowColumn, instance, index) {
					var columnHtml = Ext.DomHelper.createHtml(columns[index]);
					var domRowColumnSibling = domRowColumn.insertSibling(columnHtml, "after");
					domRowColumn.replaceWith(domRowColumnSibling);
				}, this);
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onAfterReRender
		 * @protected
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.initControlsRow();
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onAfterRender
		 * @protected
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.initControlsRow();
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onDestroy
		 * @override
		 */
		onDestroy: function(clear) {
			let rows;
			if (this.multiSelect) {
				rows = this.selectedRows;
			} else {
				rows = this.activeRow ? [this.activeRow] : [];
			}
			rows.forEach(function(id) {
				this.removeRowControls(id);
			}, this);
			this.destroyKeyMap();
			if (!clear) {
				this.destroyBodyEvents();
			}
			this.callParent(arguments);
		},

		/**
		 * ########## ####### ##### ## ########## ######### ########## ######## ######.
		 * @param {Ext.EventObject} event
		 */
		onControlsContainerClick: function(event) {
			event.stopEvent();
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onGridClick
		 * @override
		 */
		onGridClick: function(event, target) {
			if (this.multiSelect) {
				var targetEl = Ext.get(target);
				var root = this.getWrapEl().dom;
				var row = targetEl.findParent("[class*=\"" + this.theoreticallyActiveRowCss + "\"]", root, true);
				var rowId;
				if (row) {
					rowId = row.id.replace(this.id + this.collectionItemPrefix, "");
					event.stopEvent();
					this.setActiveRow(rowId);
				}
			} else {
				this.callParent(arguments);
				var columnName = this.getActiveColumnName(target);
				this.fireEvent("onGridClick", {columnName: columnName});
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onCheckboxClick
		 * @override
		 */
		onCheckboxClick: function(checkbox) {
			if (this.multiSelect) {
				var value = checkbox.value;
				var checked = checkbox.checked;
				this.setRowSelected(value, checked);
				if (checked) {
					this.fireEvent("selectRow", value);
				} else {
					this.fireEvent("unSelectRow", value);
				}
				this.fireEvent("rowsSelectionChanged");
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#renderRowActions
		 * @override
		 */
		renderRowActions: function(renderTo, id) {
			var rowActions = Ext.clone(this.activeRowActions);
			var self = this;
			var isGridEnabled = this.model.get("IsEnabled");

			function actionHandler() {
				self.onActionItemClick(this.tag, id);
			}

			for (var i = 0, c = rowActions.length; i < c; i += 1) {
				var action = rowActions[i];
				if (isGridEnabled === false && action.tag !== "card") {
					continue;
				}
				action = Ext.apply({}, action, {
					renderTo: renderTo,
					handler: actionHandler,
					classes: {
						wrapperClass: ["configuration-grid-action-button"]
					}
				});
				var actionItem = Ext.create(action.className, action);
				var selectedViewModel = this.getActiveRowViewModel(id);
				actionItem.bind(selectedViewModel);
				actionItem.setEnabled(this.enabled);
				this.actionItems.push(actionItem);
			}
		},

		/**
		 * ########## ######### # ########## ############## ######## ######.
		 * @private
		 * @param {String} id ############# ######.
		 */
		removeRowControls: function(id) {
			var controlsRow = Ext.get(this.id + this.controlsRowPrefix + id);
			if (controlsRow) {
				this.destroyKeyMap();
				this.destroyActiveRowControls();
				controlsRow.un("click", this.onControlsContainerClick, this);
				controlsRow.destroy();
			}
		},

		/**
		 * ######### ######### ######### ############## ######## ######.
		 * @private
		 * @param {Object} renderTo
		 * @param {String} id ############# ######.
		 */
		renderRowControls: function(renderTo, id) {
			var rowControls = this.getRowControls(id);
			Terrasoft.each(rowControls, function(controlConfig) {
				var control = Ext.create(controlConfig.className, Ext.apply({}, controlConfig, {
					renderTo: renderTo
				}));
				var viewModel = this.getActiveRowViewModel(id);
				control.bind(viewModel);
				this.activeRowControls.push(control);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.Grid#setActiveRow
		 * @override
		 */
		setActiveRow: function(newRowConfig) {
			var newId = Ext.isObject(newRowConfig) ? newRowConfig.value : newRowConfig;
			var oldId = this.activeRow;
			if (!oldId && !newId) {
				return;
			}
			if (oldId && !this.collection.contains(oldId)) {
				oldId = this.activeRow = null;
			}
			if (newId !== oldId) {
				var changeRow = this.changeRow(oldId, newId);
				if (changeRow) {
					this.deactivateRow(oldId);
					this.fireEvent("unSelectRow", oldId);
					this.activateRow(newId);
					this.activeRow = newId;
					this.scrollPageToActiveRow(newRowConfig);
					this.fireEvent("selectRow", newId);
				}
			}
		},

		/**
		 * ##### ######## ############# ######### ####### ###### # ######## ######.
		 * @param {Boolean} value
		 */
		setKeyMapEnabled: function(value) {
			var keyMapEnabled = this.keyMapEnabled;
			if (keyMapEnabled === value || !Ext.isBoolean(value)) {
				return;
			}
			var keyMap = this.keyMap;
			if (keyMap) {
				keyMap.setDisabled(!value);
			}
			this.keyMapEnabled = value;
		},

		/**
		 * ######### ######## ######### ############## ######## ######.
		 * @private
		 * @param {String} id ############# ######.
		 * @return {Object} True, #### ######## ######### ########## #########.
		 */
		validateRow: function(id) {
			var result = {success: true};
			this.fireEvent("validateRow", id, result);
			return result.success;
		},

		/**
		 * @inheritdoc Terrasoft.Grid#selectMultiRows
		 * @override
		 */
		selectMultiRows: function(event, targetRow) {
			if (this.multiSelect) {
				this.callParent(arguments);
			} else {
				this.setActiveRow(targetRow);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onEnterPressed
		 * @override
		 */
		onEnterPressed: function(event) {
			if (!event.hasModifier()) {
				this.fireEvent("onGridClick");
				return true;
			}
		},

		/**
		 * @inheritdoc Terrasoft.Grid#onGridDoubleClick
		 * @override
		 */
		onGridDoubleClick: Terrasoft.emptyFn

	});

	return Terrasoft.ConfigurationGrid;
});


