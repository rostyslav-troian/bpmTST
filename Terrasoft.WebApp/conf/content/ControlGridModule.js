Terrasoft.configuration.Structures["ControlGridModule"] = {innerHierarchyStack: ["ControlGridModule"]};
define("ControlGridModule", ["terrasoft", "ext-base"], function(Terrasoft, Ext) {
	/**
	 * @class Terrasoft.configuration.ControlGrid
	 * ##### ######### ###### ########### ######## # #######.
	 */
	Ext.define("Terrasoft.configuration.ControlGrid", {

		extend: "Terrasoft.Grid",

		alternateClassName: "Terrasoft.ControlGrid",

		/**
		 * ### ####### ############ ### ########### ########.
		 * @protected
		 */
		controlColumnName: null,

		/**
		 * Array of columns for apply control config.
		 * @protected
		 */
		applyColumnNames: [],

		/**
		 * Build many controls in row or not.
		 * @protected
		 */
		allowedManyControls: false,

		/**
		 * ######### ########, ########## ###### ## ######## ##########.
		 * @protected
		 */
		controlsCollection: null,

		/**
		 * Css ##### ###### ########.
		 * @protected
		 */
		controlCellClass: "control-cell",

		/**
		 * Css ##### ####### ########.
		 * @protected
		 */
		controlWrapClass: "control-wrap",

		_getColumnName: function(column) {
			return Ext.isString(column.name) ? column.name : column.name.bindTo;
		},

		_isControlColumn: function(columnName) {
			return this.allowedManyControls
				? Ext.Array.contains(this.applyColumnNames, columnName)
				: columnName === this.controlColumnName;
		},

		_getItemControlId: function(rowId, columnName) {
			return this.allowedManyControls ? rowId + columnName : rowId;
		},

		_getItemIdName: function() {
			return this.allowedManyControls ? "rowId" : "id";
		},

		/**
		 * @inheritDoc Terrasoft.Component#initDomEvents
		 * @protected
		 * @override
		 */
		init: function() {
			this.controlsCollection = [];
			this.callParent(arguments);
			this.addEvents(
				"applyControlConfig",
				"needUpdateRow"
			);
		},

		/**
		 * ######### ######.
		 * @protected
		 * @param {Array} result ######### ######## ############ ### ############ HTML #### ##### #######.
		 * @param {Object} options ###### # ########## ###### # ########## ############ ##### ####### ######.
		 */
		renderCell: function(result, options) {
			var isControlColumn = false;
			var cell = options.cell;
			var data = options.row;
			Terrasoft.each(cell.key, function(column) {
				if (column.name && Ext.isObject(column.name) &&
					this._isControlColumn(this._getColumnName(column))) {
						isControlColumn = true;
				}
			}, this);
			if (!isControlColumn) {
				return this.callParent(arguments);
			}
			var cellReadyState = 0;
			var styles = {};
			var htmlConfig = {
				tag: "div",
				cls: "grid-cols-" + cell.cols,
				html: "",
				children: []
			};
			htmlConfig.cls += " " + this.controlCellClass;
			if (cell.minHeight) {
				styles["min-height"] = cell.minHeight;
			}
			if (cell.maxHeight) {
				styles["max-height"] = cell.maxHeight;
				styles.overflow = "hidden";
			}
			var key = cell.key;
			if (Ext.isArray(key)) {
				Terrasoft.each(key, function(column) {
					cellReadyState += this.formatControlCellContent(htmlConfig, data, column);
				}, this);
			}
			htmlConfig.style = Ext.DomHelper.generateStyles(styles);
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
		 * ############## ###### ### ###### ########.
		 * @protected
		 * @param {Object} cell ###### ########### HTML ### ###### #######.
		 * @param {Object} data ############ #### # ########## ### ####### ###### #######.
		 * @param {Object} column ##### ###### ######### # ###### #######.
		 * @return {number} ########## ###### ######, ####### #### ######### ## ########.
		 */
		formatControlCellContent: function(cell, data, column) {
			var cellReadyState = 0;
			var name = this.getDataKey(column.name);
			var type = column.type || "text";
			var gridType = this.type;
			var cellData = data[name];
			var internalColumn = Ext.Array.contains(this.internalColumns, type);
			var controlId = this._getItemControlId(data.Id, this._getColumnName(column));
			if (!cellData && !internalColumn) {
				return cellReadyState;
			}
			if (type === "caption") {
				if (gridType === "tiled" && cell.html.length === 0 && (this.multiSelect || this.hierarchical)) {
					cell.style = "padding-top: 6px;";
				}
				/*jshint quotmark: false */
				cell.html += '<span class="grid-label">' + Terrasoft.utils.string.encodeHtml(name) + '</span>';
				/*jshint quotmark: true */
			} else if (type === "text" || type === "title") {
				var controlWrapId = Ext.String.format("{0}-{1}", this.controlWrapClass, controlId);
				cell.html += Ext.String.format("<div id=\'{0}\' class=\'{1}\'></div>", controlWrapId,
					this.controlWrapClass);
				var controlObject = {
					id: controlId,
					rowId: data.Id,
					domId: controlWrapId,
					control: null,
					columnName: column.name
				};
				var isControlExist = Terrasoft.some(this.controlsCollection, function(item) {
					return item.id === controlId;
				});
				if (!isControlExist) {
					this.controlsCollection.push(controlObject);
				}
				if (type === "title") {
					cell.cls += " grid-header";
				}
				cellReadyState += 1;
			}
			return cellReadyState;
		},

		/**
		 * ##### ######## ## ###### ###### ########.
		 * @param {Object} control ###### ########## ###### ########.
		 */
		applyControlConfig: function(control) {
			control.config = null;
		},

		/**
		 * ########## ####### "AfterRender".
		 * @override
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.renderControlsCollection();
		},

		/**
		 * ########## ####### "AfterReRender".
		 * @override
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.renderControlsCollection();
		},

		/**
		 * @inheritDoc Terrasoft.Grid#getBindConfig
		 * @protected
		 * @override
		 */
		getBindConfig: function() {
			let bindConfig = this.callParent(arguments);
			let gridBindConfig = {
				applyColumnNames: {
					changeMethod: "setApplyColumnNames"
				}
			};
			Ext.apply(gridBindConfig, bindConfig);
			return gridBindConfig;
		},

		/**
		 * ########## ####### "dataLoaded" ######### Terrasoft.Collection.
		 * @override
		 */
		onCollectionDataLoaded: function() {
			this.callParent(arguments);
			this.renderControlsCollection();
		},

		/**
		 * ##### ######### ######### ######## # ####### #######.
		 * @protected
		 */
		renderControlsCollection: function() {
			Terrasoft.each(this.controlsCollection, function(item) {
				var control = {};
				this.fireEvent("applyControlConfig", control, item);
				var controlConfig = control.config;
				var renderTo = Ext.get(item.domId);
				if (controlConfig && renderTo) {
					if (item.control === null) {
						item.control = Ext.create(controlConfig.className, controlConfig);
					}
					var itemControl = item.control;
					if (itemControl.value && itemControl.allowRerender()) {
						itemControl.reRender();
						return;
					}
					var viewModel = this.collection.find(item[this._getItemIdName()]);
					if (viewModel) {
						itemControl.bind(viewModel);
						if (!itemControl.rendered && !itemControl.rendering) {
							itemControl.render(renderTo);
						}
					}
				}
			}, this);
		},

		/**
		 * Creates and render control in item cell.
		 * @protected
		 * @param {Object} controlItem Control item element for rendering.
		 * Structure of control item:
		 * {
					id: Guid,
					rowId: Guid,
					domId: String,
					control: Object {Item of control},
					columnName: String
				}
		 */
		renderControl: function(controlItem) {
			var control = {};
			this.fireEvent("applyControlConfig", control, controlItem);
			if (controlItem && control.config) {
				var renderTo = Ext.get(controlItem.domId);
				var newControl = Ext.create(control.config.className, control.config);
				var viewModel = this.collection.find(controlItem[this._getItemIdName()]);
				if (viewModel) {
					newControl.bind(viewModel);
				}
				controlItem.control = newControl;
				if (renderTo) {
					newControl.render(renderTo);
				}
			}
		},

		/**
		 * ##### ######### ######### ######## ### ######### ###### #######.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item ####### #########.
		 */
		updateControlItem: function(item) {
			const itemId = item.get(this.primaryColumnName);
			Terrasoft.each(this.controlsCollection, function(collectionItem) {
				if (collectionItem[this._getItemIdName()] === itemId) {
					if (this.allowedManyControls) {
						this.renderControl(collectionItem);
					} else {
						this.renderControl(collectionItem);
						return false;
					}
				}
			}, this);
		},

		/**
		 * @inheritDoc Terrasoft.Grid#onUpdateItem
		 * @override
		 */
		onUpdateItem: function(item) {
			var itemId = item.get(this.primaryColumnName);
			if (this.fireEvent("needUpdateRow", this, itemId, item.changedValues) === false) {
				return;
			}
			this.callParent(arguments);
			this.updateControlItem(item);
		},

		/**
		 * ##### ####### #######. ######### ### DOM ######## ### #
		 * ###### ########### # #######, ## ## # #########.
		 * @override
		 */
		onDestroy: function() {
			this.callParent(arguments);
			Terrasoft.each(this.controlsCollection, function(item) {
				if (item.control) {
					item.control.destroy();
				}
				item.control = null;
			});
		},

		/**
		 * @inheritDoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @override
		 */
		onDeleteItem: function(item) {
			this.callParent(arguments);
			var idDeleting = item.get("Id");
			let whereCondition = {}[this._getItemIdName()] = idDeleting;
			var controlDeleting = Terrasoft.where(this.controlsCollection, whereCondition);
			if (controlDeleting.length > 0) {
				this.controlsCollection = Terrasoft.without(this.controlsCollection, controlDeleting[0]);
			}
		},

		/**
		 * Sets the values of the applyColumnNames. Checks for empty array.
		 * @param {Array} newColumnNames Array of the model column names for applying control config method.
		 */
		setApplyColumnNames: function(newColumnNames) {
			if (!Ext.isArray(newColumnNames)) {
				return;
			}
			this.applyColumnNames = Ext.Array.clone(newColumnNames);
		}

	});
	return Terrasoft.ControlGrid;
});


