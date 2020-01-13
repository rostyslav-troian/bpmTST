Terrasoft.configuration.Structures["GridSettingsV2"] = {innerHierarchyStack: ["GridSettingsV2"]};
define("GridSettingsV2", ["GridSettingsV2Resources", "ConfigurationConstants",
			"MaskHelper", "StructureExplorerUtilities", "GridSettingsViewGeneratorV2",
			"GridSettingsViewModelGeneratorV2", "RightUtilities", "BaseSchemaModuleV2", "ColumnUtilities"],
		function(resources, ConfigurationConstants, MaskHelper, StructureExplorerUtilities, viewGenerator,
			viewModelGenerator, RightUtilities) {
			/**
			 * @class Terrasoft.configuration.GridSettings
			 * ##### GridSettings ############ ### ######### ######## ####### ########
			 */
			Ext.define("Terrasoft.configuration.GridSettings", {
				alternateClassName: "Terrasoft.GridSettings",
				extend: "Terrasoft.BaseSchemaModule",

				Ext: null,
				sandbox: null,
				Terrasoft: null,

				/**
				 * ###### ############# ###### ######### #######
				 * @private
				 * @type {Object}
				 */
				viewModel: null,

				/**
				 * ####, ####### ######### ################### ## ### ######
				 * @private
				 * @type {Boolean}
				 */
				inited: false,

				/**
				 * ####, ####### ######### ########### ## ### #####
				 * @private
				 * @type {Boolean}
				 */
				localEntitySchemaLoaded: false,

				/**
				 * ##### ## ###### ######## ######## ######### #######
				 * @private
				 * @type {Object}
				 */
				localEntitySchema: null,

				/**
				 * ### #####
				 * @private
				 * @type {String}
				 */
				schemaName: null,

				/**
				 * ####, ####### ######### ...
				 * @private
				 * @type {Boolean}
				 */
				isSingleTypeMode: false,

				/**
				 * ### ##### ## ######### {@link Terrasoft.core.enums.GridKeyType}
				 * @private
				 * @type {String}
				 */
				baseGridType: null,

				/**
				 * ########### #######
				 * @private
				 * @type {Object}
				 */
				profile: null,

				/**
				 * #### #######
				 * @private
				 * @type {String}
				 */
				profileKey: null,

				/**
				 * ######, ############ #####
				 * @private
				 * @type {String}
				 */
				propertyName: null,

				/**
				 * ####, ########## ######## ## ######## ##########
				 * @private
				 * @type {Boolean}
				 */
				hideButtons: false,

				/**
				 * ####, ########## ######## ## ######## ##########
				 * @private
				 * @type {Boolean}
				 */
				hideGridType: false,

				/**
				 * ####, ...
				 * @private
				 * @type {Boolean}
				 */
				isNested: false,

				/**
				 * ####### ######### ###### ####### ## ######## profile.
				 * @private
				 * @type {Boolean}
				 */
				useProfileField: false,

				/**
				 * ####### ########### ###### ########## ### #### #############.
				 * @private
				 * @type {Boolean}
				 */
				hideAllUsersSaveButton: false,

				/**
				 * #######, ########### ## ######### ######## ############## ########.
				 * @private
				 * @type {Boolean}
				 */
				isCardVisible: false,

				/**
				 * #######, ########### ## ########### ###### ####### ## ######## ###### ########.
				 * @private
				 * @type {Boolean}
				 */
				useBackwards: true,

				/**
				 * #######, ########### ## ########### ############## ###### ######### ########.
				 * @private
				 * @type {Boolean}
				 */
				firstColumnsOnly: false,

				/**
				 * ######### ####### ####### (### Tiled)
				 * @private
				 * @type {Array}
				 */
				dataCollection: [],

				/**
				 * ######### ####### ####### (### Listed)
				 * @private
				 * @type {Array}
				 */
				listedDataCollection: [],

				/**
				 * ############ ######### ####### ####### (### Tiled)
				 * @private
				 * @type {Array}
				 */
				viewCollection: [],

				/**
				 * ############ ######### ####### ####### (### Listed)
				 * @private
				 * @type {Array}
				 */
				listedViewCollection: [],

				/**
				 * DragAndDrop
				 * @private
				 * @type {Object}
				 */
				ddTargetEmptyOverride: {},

				/**
				 * ####### ###### ### ########
				 * @private
				 * @type {String}
				 */
				elementPrefix: "element",

				/**
				 * ####### ###### ### ######## # ######
				 * @private
				 * @type {String}
				 */
				plusPrefix: "plus",

				/**
				 * ####### ###### ### ######## #######
				 * @private
				 * @type {String}
				 */
				columnPrefix: "column",

				/**
				 * The class prefix for empty element.
				 * @private
				 * @type {String}
				 */
				emptyPrefix: "empty",

				/**
				 * The count column in the line. Default value.
				 * @private
				 * @type {Integer}
				 */
				rowSize: 24,

				/**
				 * Class for selected element.
				 * @private
				 * @type {String}
				 */
				selectedCellCss: "selected-column",

				/**
				 * Class for unselected element.
				 * @private
				 * @type {String}
				 */
				unselectedCellCss: "unchosen-column",

				/**
				 * Class for grid title.
				 * @private
				 * @type {String}
				 */
				titleCellCss: "grid-header",

				/**
				 * Class for columns with type LINK.
				 * @private
				 * @type {String}
				 */
				urlCellCss: "column-url",

				/**
				 * Selected column row id.
				 * @private
				 * @type {String}
				 */
				selectedCellId: "",

				/**
				 * Array of not found column paths.
				 * @protected
				 * @type {String[]}
				 */
				notFoundColumns: null,

				/**
				 * Initializes page title on top panel.
				 */
				initHeaderCaption: function() {
					this.sandbox.publish("InitDataViews", {
						caption: resources.localizableStrings.PageCaption,
						dataViews: false,
						hidePageCaption: true
					});
				},

				/**
				 * Sets grid settings module initial values.
				 * @param {Function} callback Callback function.
				 */
				init: function(callback) {
					this.initHeaderCaption();
					if (this.Ext.isEmpty(this.schemaName)) {
						var gridSettingsInfo = this.sandbox.publish("GetGridSettingsInfo", null, [this.sandbox.id]);
						this.schemaName = gridSettingsInfo.entitySchemaName;
						this.isSingleTypeMode = gridSettingsInfo.isSingleTypeMode;
						this.baseGridType = gridSettingsInfo.baseGridType;
						this.profileKey = gridSettingsInfo.profileKey;
						this.propertyName = gridSettingsInfo.propertyName;
						this.hideButtons = (gridSettingsInfo.hideButtons === true);
						this.hideGridType = (gridSettingsInfo.hideGridType === true);
						this.profile = gridSettingsInfo.profile || {};
						this.notFoundColumns = gridSettingsInfo.notFoundColumns;
						this.entityColumns = gridSettingsInfo.entityColumns;
						this.isNested = (gridSettingsInfo.isNested === true);
						this.useProfileField = (gridSettingsInfo.useProfileField === true);
						this.hideAllUsersSaveButton = (gridSettingsInfo.hideAllUsersSaveButton === true);
						this.isCardVisible = gridSettingsInfo.isCardVisible;
						if (Ext.isBoolean(gridSettingsInfo.useBackwards)) {
							this.useBackwards = gridSettingsInfo.useBackwards;
						}
						if (Ext.isBoolean(gridSettingsInfo.firstColumnsOnly)) {
							this.firstColumnsOnly = gridSettingsInfo.firstColumnsOnly;
						}
						if (!this.isNested) {
							var state = this.sandbox.publish("GetHistoryState");
							var currentHash = state.hash;
							var currentState = state.state || {};
							if (currentState.moduleId !== this.sandbox.id) {
								var newState = this.Terrasoft.deepClone(currentState);
								newState.moduleId = this.sandbox.id;
								this.sandbox.publish("ReplaceHistoryState", {
									stateObj: newState,
									pageTitle: null,
									hash: currentHash.historyState,
									silent: true
								});
							}
						}
					}
					this.sandbox.subscribe("GetProfileData", function() {
						return this.viewModel.getNewProfileData();
					}, this);
					if (callback) {
						callback.call(this);
					}
				},

				/**
				 * Renders view to target container.
				 * @param {Ext.Element} renderTo Target container for render view.
				 */
				render: function(renderTo) {
					Ext.dd.DragDropManager.mode = 0;
					this.getUserSaveRights(this.finalRender, renderTo);
				},

				/**
				 * Checks user rights to change column settings.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Ext.Element} renderTo Target container for render view.
				 */
				getUserSaveRights: function(callback, renderTo) {
					RightUtilities.checkCanExecuteOperation({
						operation: "CanCreateDefaultGridSettings"
					}, function(result) {
						callback.call(this, renderTo, result);
					}, this);
				},

				/**
				 * Loads schema.
				 * @private
				 * @param {String} entityName Entity schema name.
				 * @param {Function} callback Callback function.
				 */
				getEntitySchemaWithDescriptor: function(entityName, callback) {
					if (!this.localEntitySchemaLoaded) {
						this.localEntitySchema = this.sandbox.publish("GetEntitySchema", entityName);
						this.localEntitySchemaLoaded = true;
					}
					if (this.localEntitySchema) {
						callback.call(this, this.localEntitySchema);
					} else {
						this.sandbox.requireModuleDescriptors([entityName], function() {
							require([entityName], callback);
						}, this);
					}
				},

				/**
				 * Extra initialization after rendering.
				 * @private
				 */
				pageAfterRender: function() {
					var columnsSettings = this.Ext.get("columnsSettings");
					columnsSettings.on("click", this.columnsSettingsClick, this);
					this.initDd(this);
				},

				/**
				 * Initialize DragAndDrop element
				 * @private
				 * @param {Object} ddElement
				 */
				initDd: function(ddElement) {
					this.clearDDGroup("empty");
					this.Ext.dd.DragDropManager.notifyOccluded = true;
					var columnsSettings = this.Ext.get("columnsSettings");
					var empties = this.Ext.select("[id*=\"element-empty\"]", false, columnsSettings.dom);
					empties.each(function(element) {
						element.initDDTarget("empty", {}, this.ddTargetEmptyOverride);
					}, ddElement);
					var pluses = this.Ext.select("[id*=\"element-plus\"]", false, columnsSettings.dom);
					pluses.each(function(element) {
						element.initDDTarget("empty", {}, this.ddTargetEmptyOverride);
					}, ddElement);
					var columns = this.Ext.select("[id*=\"element-column\"]", false, columnsSettings.dom);
					var me = this;
					columns.each(function(element) {
						me.clearDDCache(element);
						element.initDD("empty", {isTarget: false}, this.ddEmptyOverride);
					}, ddElement);
				},

				/**
				 * Clears DragAndDrop group element
				 * @private
				 * @param {String} group
				 */
				clearDDGroup: function(group) {
					if (group && typeof group === "string") {
						this.Ext.dd.DragDropManager.ids[group] = {};
					}
				},

				/**
				 * Clears event cashe for DragAndDrop element
				 * @private
				 * @param {Object} el
				 */
				clearDDCache: function(el) {
					if (el && el.dom && el.dom.id) {
						try {
							this.Ext.cache[el.dom.id].events.mousedown = [];
						} catch (e) {
						}
					}
				},

				/**
				 * Handle mouse click on column
				 * @private
				 * @param {Object} event
				 */
				columnsSettingsClick: function(event) {
					var columnsSettings = this.Ext.get("columnsSettings");
					var root = columnsSettings.dom;
					var toggleRows = this.Ext.dom.Query.select("[id*=\"" + this.elementPrefix + "\"]", root);
					for (var i = 0, c = toggleRows.length; i < c; i += 1) {
						var toggle = toggleRows[i];
						if (!event.within(toggle)) {
							continue;
						}
						var toggleId = toggle.id;
						var toggleIdParts = toggleId.split("-");
						if (toggleIdParts[1] === this.plusPrefix) {
							if (toggleIdParts.length === 4) {
								this.createNewElement(toggleId);
							} else {
								this.createNewRow(toggleId);
							}
						} else if (toggleIdParts[1] === this.columnPrefix) {
							this.selectElement(toggleId);
						}
					}
				},

				/**
				 * @private
				 */
				_getStructureExplorerConfig: function () {
					return {
						schemaName: this.schemaName,
						excludeDataValueTypes: [
							this.Terrasoft.DataValueType.IMAGELOOKUP,
							this.Terrasoft.DataValueType.COLOR
						],
						useBackwards: this.useBackwards,
						firstColumnsOnly: this.firstColumnsOnly
					};
				},
				
				/**
				 * Creates new column
				 * @private
				 * @param {String} toggleId
				 */
				createNewElement: function(toggleId) {
					this.toggleId = toggleId;
					this.openStructureExplorer(this._getStructureExplorerConfig(), this.structureExplorerCallback, this.viewModel.renderTo);
				},

				/**
				 * Sets values for columns modified in column settings module
				 * @private
				 * @param {Object} args
				 */
				structureExplorerCallback: function(args) {
					var dataCollection = this.isTiled ? this.dataCollection : this.listedDataCollection;
					this.viewModel.deactivateCells(dataCollection);
					var toggleId = this.toggleId;
					var toggleIdParts = toggleId.split("-");
					var currentRowIndex = parseInt(toggleIdParts[2], 10);
					var currentColumnIndex = parseInt(toggleIdParts[3], 10);
					if (!dataCollection.length) {
						var newRow = {
							cells: [],
							row: 0
						};
						dataCollection.push(newRow);
					}
					var row = dataCollection[currentRowIndex];
					var cells = row.cells;
					var width = this.rowSize - currentColumnIndex;
					for (var i = 0; i < cells.length; i++) {
						var cell = cells[i];
						if (cell.column > currentColumnIndex) {
							width = cell.column - currentColumnIndex;
							break;
						}
					}
					if (width > 4) {
						width = 4;
					}
					var schema = this.schema;
					var primaryDisplayColumnName = schema.primaryDisplayColumnName;
					var newCell = {
						caption: args.caption.join("."),
						column: currentColumnIndex,
						dataValueType: args.dataValueType,
						isCaptionHidden: (primaryDisplayColumnName === args.leftExpressionColumnPath),
						isCurrent: true,
						isTitleText: (primaryDisplayColumnName === args.leftExpressionColumnPath),
						metaPath: args.leftExpressionColumnPath,
						referenceSchemaName: args.referenceSchemaName,
						width: width
					};
					var previousCell = this.Ext.get(this.selectedCellId);
					if (previousCell) {
						previousCell.removeCls(this.selectedCellCss);
						previousCell.addCls(this.unselectedCellCss);
					} else {
						this.selectedCellId = "";
					}
					cells.push(newCell);
					row.cells = cells;
					this.viewModel.refreshRow(row);
					this.selectedCellId = "element-column-" + currentRowIndex + "-" + currentColumnIndex;
					args.column = currentColumnIndex;
					args.isTiled = this.isTiled;
					args.metaCaptionPath = args.leftExpressionCaption;
					args.row = currentRowIndex;
					args.width = width;
					this.isObjectColumn = !(args.aggregationFunction || args.metaPath.length > 1);
					this.args = args;
					if (!this.isObjectColumn) {
						this.viewModel.openColumnSettings();
					}
				},

				/**
				 * Select element
				 * @private
				 * @param {String} toggleId
				 */
				selectElement: function(toggleId) {
					if (this.selectedCellId !== "") {
						var previousCell = this.Ext.get(this.selectedCellId);
						if (previousCell) {
							previousCell.removeCls(this.selectedCellCss);
							previousCell.addCls(this.unselectedCellCss);
						} else {
							this.selectedCellId = "";
						}
					}
					var toggleEl = this.Ext.get(toggleId);
					toggleEl.removeCls(this.unselectedCellCss);
					toggleEl.addCls(this.selectedCellCss);
					this.selectedCellId = toggleId;
				},

				/**
				 * Open column select module
				 * @private
				 * @param {Object} config
				 * @param {Function} callback
				 * @param {Object} renderTo
				 */
				openStructureExplorer: function(config, callback, renderTo) {
					StructureExplorerUtilities.Open(this.sandbox, config, callback, renderTo, this);
				},

				/**
				 * Create new row
				 * @private
				 * @param {String} toggleId
				 */
				createNewRow: function(toggleId) {
					this.toggleId = toggleId;
					this.openStructureExplorer(this._getStructureExplorerConfig(), this.createNewRowCallback, this.viewModel.renderTo);
				},

				/**
				 * Create new row and set column values changed in column settings module
				 * @private
				 * @param {Object} args
				 */
				createNewRowCallback: function(args) {
					var dataCollection = this.isTiled ? this.dataCollection : this.listedDataCollection;
					this.viewModel.deactivateCells(dataCollection);
					var toggleIdParts = this.toggleId.split("-");
					var currentRowIndex = parseInt(toggleIdParts[2], 10);
					var schema = this.schema;
					var primaryDisplayColumnName = schema.primaryDisplayColumnName;
					var newRow = {
						row: currentRowIndex,
						cells: [
							{
								caption: args.caption.join("."),
								column: 0,
								dataValueType: args.dataValueType,
								isCaptionHidden: (primaryDisplayColumnName === args.leftExpressionColumnPath),
								isCurrent: true,
								isTitleText: (primaryDisplayColumnName === args.leftExpressionColumnPath),
								metaPath: args.leftExpressionColumnPath,
								referenceSchemaName: args.referenceSchemaName,
								width: 4
							}
						]
					};
					var previousCell = this.Ext.get(this.selectedCellId);
					if (previousCell) {
						previousCell.removeCls(this.selectedCellCss);
						previousCell.addCls(this.unselectedCellCss);
					} else {
						this.selectedCellId = "";
					}
					dataCollection.push(newRow);
					this.viewModel.refreshRow(newRow);
					if (this.isTiled) {
						this.viewModel.addRow(newRow);
						this.initDd(this);
					}
					this.selectedCellId = "element-column-" + (dataCollection.length - 1) + "-0";
					this.isObjectColumn = (args.aggregationFunction || args.metaPath.length > 1) ? false : true;
					args.row = currentRowIndex;
					args.column = 0;
					args.width = 4;
					args.isTiled = this.isTiled;
					args.metaCaptionPath = args.leftExpressionCaption;
					this.args = args;
					if (!this.isObjectColumn) {
						this.viewModel.openColumnSettings();
					}
				},

				/**
				 * Delete empty rows from rows collection
				 * @private
				 * @param {Object} collection
				 */
				removeEmptyRows: function(collection) {
					for (var i = 0; i < collection.length; i++) {
						var row = collection[i];
						if (row.cells.length === 0) {
							collection.splice(i, 1);
							i--;
						} else {
							row.row = i;
						}
					}
				},

				/**
				 * Moving element
				 * @private
				 * @param {Object} collection
				 * @param {Object} el
				 * @param {Object} ddTarget
				 */
				dragElement: function(collection, el, ddTarget) {
					var targetIdParts = ddTarget.dom.id.split("-");
					var newRowIndex = parseInt(targetIdParts[2], 10);
					var newCellIndex = parseInt(targetIdParts[3], 10);
					if (!newCellIndex) {
						newCellIndex = 0;
					}
					var elIdParts = el.dom.id.split("-");
					var oldRowIndex = parseInt(elIdParts[2], 10);
					var oldCellIndex = parseInt(elIdParts[3], 10);

					if (newRowIndex >= collection.length) {
						var currentRowIndex = newRowIndex + 1;
						collection.push({
							row: collection.length,
							cells: []
						});
						var lastRow = this.Ext.get("row-" + newRowIndex);
						var lastPlus = this.Ext.get("element-plus-" + newRowIndex);
						lastPlus.dom.id = "element-plus-" + newRowIndex + "-0";
						this.Ext.DomHelper.insertAfter(lastRow,
								"<div id=\"row-" + currentRowIndex + "\" class=\"grid-row grid-module\">" +
								"<div id=\"element-plus-" + currentRowIndex +
								"\" class=\"grid-cols-2\">" +
								"<div class=\"empty-inner-div\">" +
								"+" +
								"</div>" +
								"</div>" +
								"</div>",
								true);
						var lastEl = this.Ext.get("element-plus-" + currentRowIndex);

						for (var p = 2; p < this.rowSize; p++) {
							lastEl = Ext.DomHelper.insertAfter(lastEl,
									"<div id=\"element-empty-" + currentRowIndex + "-" + p +
									"\" class=\"grid-cols-1\">" +
									"<div class=\"empty-inner-div\">" +
									"</div>" +
									"</div>",
									true);
							lastEl.initDDTarget("empty", {}, this.ddTargetEmptyOverride);
						}
						lastEl = this.Ext.get("element-plus-" + currentRowIndex);
						lastEl.initDDTarget("empty", {}, this.ddTargetEmptyOverride);
					}

					this.viewModel.deactivateCells(collection);
					var oldRow = collection[oldRowIndex];
					var newRow = {};
					if (newRowIndex >= collection.length) {
						newRow = collection[collection.length - 1];
					} else {
						newRow = collection[newRowIndex];
					}
					var oldCells = oldRow.cells;
					var newCells = newRow.cells;

					var width = 0;
					for (var i = 0; i < oldCells.length; i++) {
						var oldCell = oldCells[i];
						var oldColumn = oldCell.column;
						var oldWidth = oldCell.width;
						if (oldColumn + oldWidth > oldCellIndex) {
							width = oldWidth;
							var newCell;
							for (var j = 0; j < newCells.length; j++) {
								newCell = newCells[j];
								var newColumn = newCell.column;
								if (oldRow.row === newRow.row && oldColumn === newColumn) {
									continue;
								}
								if (newColumn > newCellIndex && (width > (newColumn - newCellIndex))) {
									width = newColumn - newCellIndex;
									break;
								}
							}
							oldCells.splice(i, 1);
							if (newCellIndex + width > this.rowSize) {
								width = this.rowSize - newCellIndex;
							}
							newCell = this.copyCellItem(oldCell, {
								width: width,
								isCurrent: true,
								column: newCellIndex
							});
							newCells.push(newCell);
							this.selectedCellId = "element-column-" +
									newRowIndex +
									"-" +
									newCellIndex;
							break;
						}
					}
					this.viewModel.sortByKey(oldCells, "column");
					this.viewModel.sortByKey(newCells, "column");
					this.viewModel.refreshRow(oldRow);
					if (oldRow.row !== newRow.row) {
						this.viewModel.refreshRow(newRow);
					}
				},

				/**
				 * Copy register element.
				 * @private
				 * @param {Object} sourceItem Element need to copy.
				 * @param {Object} defaultValues Default property values.
				 * @return {Object} Register element copy.
				 */
				copyCellItem: function(sourceItem, defaultValues) {
					return Ext.apply({}, defaultValues, sourceItem);
				},

				/**
				 * Generate and render view.
				 * @private
				 * @param {Object} renderTo
				 * @param {Boolean} isSysAdmin
				 */
				finalRender: function(renderTo, isSysAdmin) {
					var currentObject = this;
					currentObject.isSysAdmin = isSysAdmin;
					if (this.inited) {
						if (typeof this.isObjectColumn !== "undefined" && !this.isObjectColumn) {
							this.isObjectColumn = true;
						}
						var viewConfig = viewGenerator.generate.call(this.viewModel.currentObject);
						var newView = this.Ext.create(viewConfig.className, viewConfig);
						newView.bind(this.viewModel);
						newView.render(renderTo);
						this.changeGridType();
						this.pageAfterRender.call(this);
						return;
					}

					this.inited = true;

					if (!this.ddEmptyOverride) {
						this.ddEmptyOverride = {
							b4StartDrag: function() {
								if (!this.el) {
									this.el = currentObject.Ext.get(this.getEl());
									this.el.setStyle("z-index", "11");
								}
								this.el.setStyle("border-right-style", "hidden");
								if (currentObject.selectedCellId !== "") {
									var previousCell = currentObject.Ext.get(currentObject.selectedCellId);
									if (previousCell) {
										previousCell.removeCls(currentObject.selectedCellCss);
										previousCell.addCls(currentObject.unselectedCellCss);
									} else {
										currentObject.selectedCellId = "";
									}
								}
								this.el.removeCls(currentObject.unselectedCellCss);
								this.el.addCls(currentObject.selectedCellCss);
								currentObject.selectedCellId = this.el.dom.id;
							},
							onDrag: function(event) {
								var coords = [event.getX() - this.deltaX, event.getY() - this.deltaY];
								this.el.setXY(coords);
							},
							endDrag: function() {
								if (this.invalidDrop === true) {
									var coords = [this.startPageX, this.startPageY];
									this.el.setXY(coords);
									this.el.setStyle("z-index", "10");
									this.el.setStyle("border-right-style", "solid");
									delete this.invalidDrop;
								}
							},
							onDragDrop: function(event, target) {
								var ddTarget = currentObject.Ext.get(target);
								var collection = currentObject.viewModel.getActiveDataCollection();
								if (ddTarget) {
									currentObject.dragElement(collection, this.el, ddTarget);
									this.el.remove();
									ddTarget.remove();
								}
							},
							onInvalidDrop: function() {
								this.invalidDrop = true;
								this.el.removeCls(currentObject.selectedCellCss);
								this.el.addCls(currentObject.unselectedCellCss);
							}
						};
					}
					var self = this;
					this.getEntitySchemaWithDescriptor(this.schemaName, function(schema) {
						if (!self.schema) {
							self.schema = schema;
						}
					});

					this.renderContainer = renderTo;
					if (this.isNested || this.useProfileField) {
						this.loadProfile.call(this, this.profile);
					} else {
						this.Terrasoft.require(["profile!" + this.profileKey], function(profile) {
							this.loadProfile(this.Terrasoft.deepClone(profile));
						}, this);
					}

				},

				/**
				 * Load profile.
				 * @protected
				 * @param {Object} profile
				 */
				loadProfile: function(profile) {
					var gridProfile = this.propertyName ? profile[this.propertyName] : profile;
					var isTiled = true;
					var gridType = this.Terrasoft.GridType.TILED;
					var baseGridType = this.baseGridType;
					if (this.Ext.Object.isEmpty(gridProfile) && baseGridType) {
						isTiled = (baseGridType === this.Terrasoft.GridType.TILED);
						gridType = baseGridType;
					}
					this.isTiled = isTiled;
					this.gridType = gridType;
					this.profile = this.Terrasoft.ColumnUtilities.updateProfileColumnCaptions({
						profile: profile,
						entityColumns: this.entityColumns,
						notFoundColumns: this.notFoundColumns
					});
					var viewModelConfig = viewModelGenerator.generate({
						isSingleTypeMode: this.Ext.isEmpty(this.isSingleTypeMode) ? false : this.isSingleTypeMode,
						GridType: this.isTiled ? this.Terrasoft.GridType.TILED : this.Terrasoft.GridType.LISTED
					});
					this.viewModel = this.Ext.create("Terrasoft.BaseViewModel", viewModelConfig);
					this.viewModel.currentObject = this;
					this.viewModel.sandbox = this.sandbox;
					this.viewModel.renderTo = this.renderContainer;
					this.viewModel.on("change:GridType", this.changeGridType, this);
					if (gridProfile && gridProfile.listedConfig && gridProfile.tiledConfig) {
						this.dataCollection = this.viewModel.getColumnsConfigFromProfileV2(gridProfile, true);
						this.listedDataCollection = this.viewModel.getColumnsConfigFromProfileV2(gridProfile, false);
					} else {
						this.dataCollection = this.viewModel.getColumnsConfigFromProfile(profile, true);
						this.listedDataCollection = this.viewModel.getColumnsConfigFromProfile(profile, false);
					}
					if (gridProfile) {
						if (!this.Ext.isEmpty(gridProfile.isTiled)) {
							this.isTiled = gridProfile.isTiled;
						}
						this.gridType = gridProfile.type ||
								(this.isTiled ? this.Terrasoft.GridType.TILED : this.Terrasoft.GridType.LISTED);
					}
					this.updateItemsViewCollection();
					var viewConfig = viewGenerator.generate.call(this);
					var view = this.Ext.create(viewConfig.className, viewConfig);
					var page = this.Ext.getCmp("gridSettings");
					page.on("afterrender", this.pageAfterRender, this);
					view.bind(this.viewModel);
					view.render(this.renderContainer);
					this.viewModel.set("GridType", this.gridType);
					MaskHelper.HideBodyMask();
				},

				/**
				 * Refresh displayed collection
				 * @private
				 */
				updateItemsViewCollection: function() {
					this.removeEmptyRows(this.dataCollection);
					this.viewCollection =
							this.viewModel.generateViewCollection(this.dataCollection, this.rowSize);
					this.viewCollection.isTiled = this.isTiled;
					this.listedViewCollection =
							this.viewModel.generateViewCollection(this.listedDataCollection, this.rowSize);
				},

				/**
				 * Change register type
				 * @private
				 */
				changeGridType: function() {
					this.isTiled = (this.viewModel.get("GridType") === this.Terrasoft.GridType.TILED);
					var container = this.Ext.getCmp("columnsSettings");
					container.tpl = this.isTiled ? viewGenerator.tiledTpl : viewGenerator.listedTpl;
					this.updateItemsViewCollection();
					container.reRender();
					this.pageAfterRender();
				}
			});
			return Terrasoft.GridSettings;
		});


