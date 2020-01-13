Terrasoft.configuration.Structures["StructureExploreModule"] = {innerHierarchyStack: ["StructureExploreModule"]};
define("StructureExploreModule", ["StructureExploreModuleResources", "StructureExplorerView",
	"StructureExplorerViewModel", "EntityStructureHelper", "StructureExplorerUtilities", "MaskHelper",
			"ConfigurationEnums"],
	function(resources, StructureExplorerView, StructureExplorerViewModel, EntityStructureHelper,
			StructureExplorerUtilities, MaskHelper, ConfigurationEnums) {
		function createConstructor(context) {

			var Ext = context.Ext;
			var sandbox = context.sandbox;
			var Terrasoft = context.Terrasoft;
			var view, viewModel, rootItemIdentifier, params;
			var viewCollection;
			var viewModelCollection;

			function filtersHandler() {
				if (params.columnPath) {
					var filterPath = _getFilterPathArray(params);
					if (filterPath.length > 1) {
						showFilterTree(getLastViewModel(), filterPath, 0);
					} else if (filterPath.length === 1) {
						showFilterColumn(filterPath[0]);
					}
				}
			}

			function _getFilterPathArray(config) {
				var filterPath = params.columnPath.split(".");
				var primaryColumnIndex = filterPath.indexOf("Id", -1);
				if (primaryColumnIndex > -1) {
					filterPath.splice(primaryColumnIndex, 1);
				}
				if (config.isAggregative) {
					var aggregativeColumnName = _getAggregationColumnName(config);
					if (aggregativeColumnName) {
						filterPath.push(aggregativeColumnName);
					}
				}
				return filterPath;
			}

			function getRootItemIdentifier() {
				if (typeof rootItemIdentifier === "undefined" || rootItemIdentifier == null) {
					var schema = sandbox.publish("StructureExplorerInfo", null, [sandbox.id]);
					var indentifier = schema.schemaName;
					if (indentifier) {
						rootItemIdentifier = {referenceSchemaName: indentifier};
					} else {
						var historyState = sandbox.publish("GetHistoryState");
						rootItemIdentifier = {referenceSchemaName: historyState.hash.entityName};
					}
				}
				return rootItemIdentifier;
			}

			function hasBackwardElements() {
				var pathItems = viewModelCollection.getItems();
				for (var i = 0; i < pathItems.length; i++) {
					var pathItem = pathItems[i].get("EntitySchemaColumn");
					if (pathItem && pathItem.isBackward) {
						return true;
					}
				}
				return false;
			}

			function setSourceItems(identifier, callback, scope) {
				EntityStructureHelper.getItems(identifier, function(items) {
					var itemCollection = viewModel.get("EntitySchemaColumnList");
					itemCollection.clear();
					itemCollection.collection.addAll(items);
					if (callback) {
						callback.call(scope || this, items);
					}
				}, hasBackwardElements(), scope || this);
			}

			function setItemChildren(identifier, itemViewModel, callback, scope) {
				EntityStructureHelper.getChildren(identifier, function(items) {
					var itemCollection = itemViewModel.get("EntitySchemaColumnList");
					itemCollection.clear();
					itemCollection.collection.addAll(items);
					if (callback) {
						callback.call(scope || this, items);
					}
				}, scope || this);
			}

			function getLastSelectedShemaName() {
				var lastIndex = viewModelCollection.getCount() - 1;
				if (lastIndex === -1) {
					return getRootItemIdentifier();
				}
				return viewModelCollection.get(lastIndex).get("EntitySchemaColumn");
			}

			function getLastViewModel() {
				var lastIndex = viewModelCollection.getCount() - 1;
				if (lastIndex === -1) {
					return viewModel;
				}
				return viewModelCollection.get(lastIndex);
			}

			function updateAfterRemovingItem(itemViewModel) {
				itemViewModel.set("ExpandVisible", true);
				itemViewModel.set("RemoveVisible", false);
				itemViewModel.set("ComboBoxListEnabled", true);
				viewModel.set("ComboBoxListEnabled", true);
				viewModel.set("EntitySchemaColumn", null);
				var identifier;
				if (itemViewModel !== viewModel) {
					var comboBoxValue = itemViewModel.get("EntitySchemaColumn");
					identifier = comboBoxValue;
				} else {
					rootItemIdentifier = null;
					identifier = getRootItemIdentifier();
				}
				setSourceItems(identifier);
			}

			function expandBase() {
				this.set("ExpandVisible", false);
				this.set("RemoveVisible", true);
				this.set("ComboBoxListEnabled", false);
				viewModel.set("ComboBoxListEnabled", false);
				viewModel.set("EntitySchemaColumn", null);
				var itemViewModel = StructureExplorerViewModel.generateItem();
				itemViewModel.ComboBoxListChange = function(comboBoxValue) {
					if (viewModelCollection.getCount() === params.expandLevel) {
						this.set("ExpandVisible", false);
					}
					this.set("ExpandEnable", true);
					itemViewModel.set("EntitySchemaColumn", Terrasoft.deepClone(comboBoxValue));
					if (!comboBoxValue) {
						viewModel.set("ComboBoxListEnabled", false);
					} else {
						setSourceItems(comboBoxValue, function() {
							viewModel.set("ComboBoxListEnabled", true);
						});
					}
					viewModel.set("EntitySchemaColumn", null);
				};
				itemViewModel.expand = expandBase;
				itemViewModel.remove = function() {
					removeItemsByViewModel(this, 0);
					var itemViewModel = getLastViewModel();
					updateAfterRemovingItem(itemViewModel);
				};
				itemViewModel.close = function() {
					removeItemsByViewModel(this, 1);
					updateAfterRemovingItem(this);
				};
				var viewConfig = StructureExplorerView.generateItemView(itemViewModel, getIndex());
				var itemView = Ext.create(viewConfig.className || "Terrasoft.Container", viewConfig);
				setItemChildren(getLastSelectedShemaName(), itemViewModel,
					function() {
						addItems(itemView, itemViewModel);
						itemView.bind(itemViewModel);
						itemView.render(view.items.get("autoGeneratedMainContainer")
							.items.get(
								"autoGeneratedLeftContainer").getWrapEl());
					});
			}

			function showFilterColumn(columnName) {
				var col = viewModel.get("EntitySchemaColumnList").collection.items;
				for (var k = 0; k < col.length; k++) {
					if (col[k].columnName === columnName) {
						viewModel.set("EntitySchemaColumn", col[k]);
						break;
					}
				}
			}

			function showFilterTree(vModel, filterItems, position) {
				vModel.set("ExpandVisible", false);
				vModel.set("RemoveVisible", true);
				vModel.set("ComboBoxListEnabled", false);
				viewModel.set("ComboBoxListEnabled", false);
				viewModel.set("EntitySchemaColumn", null);
				var itemViewModel = StructureExplorerViewModel.generateItem();
				itemViewModel.ComboBoxListChange = function(comboBoxValue) {
					this.set("ExpandEnable", true);
					if (!comboBoxValue) {
						viewModel.set("ComboBoxListEnabled", false);
					} else {
						setSourceItems(comboBoxValue, function() {
							viewModel.set("ComboBoxListEnabled", true);
						});
					}
					viewModel.set("EntitySchemaColumn", null);
				};
				itemViewModel.expand = expandBase;
				itemViewModel.remove = function() {
					removeItemsByViewModel(this, 0);
					var itemViewModel = getLastViewModel();
					updateAfterRemovingItem(itemViewModel);
				};
				itemViewModel.close = function() {
					removeItemsByViewModel(this, 1);
					updateAfterRemovingItem(this);
				};
				var viewConfig = StructureExplorerView.generateItemView(itemViewModel, getIndex());
				var itemView = Ext.create(viewConfig.className || "Terrasoft.Container", viewConfig);
				var lastSelectedShemaName = getLastSelectedShemaName();
				setItemChildren(lastSelectedShemaName, itemViewModel,
					function() {
						addItems(itemView, itemViewModel);
						itemView.bind(itemViewModel);
						itemView.render(view.items.get("autoGeneratedMainContainer")
							.items.get(
								"autoGeneratedLeftContainer").getWrapEl());
						var obj = itemViewModel.get("EntitySchemaColumnList").collection.items;
						for (var j = 0; j < obj.length; j++) {
							if (obj[j].columnName === filterItems[position]) {
								itemViewModel.set("EntitySchemaColumn", obj[j]);
								rootItemIdentifier.referenceSchemaName = obj[j].referenceSchemaName;
								break;
							}
						}
						position++;
						var isLastColumn = position === filterItems.length - 1;
						if (isLastColumn) {
							var lastColumnName = filterItems[position];
							setSourceItems(getLastSelectedShemaName(), function() {
								showFilterColumn(lastColumnName);
							});
						} else {
							showFilterTree(itemViewModel, filterItems, position);
						}
					});
			}

			function _getAggregationColumnName(config) {
				var aggregationColumnName;
				var aggregationType = config.leftExpressionAggregationType;
				var filterType = config.leftExpressionFilterType;
				if (aggregationType && aggregationType === Terrasoft.AggregationType.COUNT) {
					aggregationColumnName = ConfigurationEnums.AggregationFunction.COUNT;
				} else if (filterType && filterType === Terrasoft.FilterType.EXISTS) {
					aggregationColumnName = ConfigurationEnums.AggregationFunction.EXISTS;
				}
				return aggregationColumnName;
			}

			function render(renderTo) {
				viewCollection = new Terrasoft.Collection();
				viewModelCollection = new Terrasoft.Collection();
				params = sandbox.publish("StructureExplorerInfo", null, [sandbox.id]);
				if (params === null) {
					params = {
						summaryColumnsOnly: false,
						useBackwards: true,
						firstColumnsOnly: false,
						expandLevel: -1
					};
				}
				if (typeof params.schemaName !== "undefined") {
					rootItemIdentifier = {referenceSchemaName: params.schemaName};
				}
				params.sa = sandbox;
				var defDisplayId = params.displayId || !params.firstColumnsOnly;
				params.displayId = params.summaryColumnsOnly
					? false
					: defDisplayId;
				EntityStructureHelper.init(params);
				var schemaName = getRootItemIdentifier();
				initViewModel.call(this);
				initView.call(this);
				var viewRenderTo = renderTo;
				EntityStructureHelper.getItemCaption(schemaName, function(name) {
					viewModel.set("caption", name);
					var paramSchemaName = params.schemaName;
					if (paramSchemaName && Terrasoft[paramSchemaName]) {
						viewModel.set("entitySchema", Terrasoft[paramSchemaName]);
					}
					setSourceItems(schemaName, function() {
						view.bind(viewModel);
						view.render(viewRenderTo);
					});
				}, this);
			}

			function getLastReferenceSchemaName(pathItems) {
				var lastPath = pathItems && pathItems.length && pathItems[pathItems.length - 1];
				var entitySchemaColumn = lastPath && lastPath.get("EntitySchemaColumn");
				return entitySchemaColumn && entitySchemaColumn.referenceSchemaName;
			}

			function initViewModel() {
				viewModel = this.viewModel = StructureExplorerViewModel.generate();
				viewModel.viewCollection = viewCollection;
				viewModel.viewModelCollection = viewModelCollection;
				viewModel.structureExplorerId = sandbox.id;
				if (params && params.firstColumnsOnly) {
					viewModel.set("ExpandVisible", false);
				}
				viewModel.select = function() {
					var pathItems = viewModelCollection.getItems();
					var response = {
						path: [],
						metaPath: [],
						caption: [],
						isBackward: false
					};

					var backwardReferenceSchemaName = "";
					for (var i = 0; i < pathItems.length; i++) {
						var isPathItemValid = pathItems[i].validate();
						if (!isPathItemValid) {
							MaskHelper.HideBodyMask();
							return;
						}
						var pathItem = pathItems[i].get("EntitySchemaColumn");
						response.metaPath[response.metaPath.length] = pathItem.value;
						response.path[response.path.length] = pathItem.columnName;
						response.caption[response.caption.length] = pathItem.displayValue;
						if (pathItem.isBackward) {
							response.isBackward = true;
							backwardReferenceSchemaName = pathItem.referenceSchemaName;
							if (pathItems.length > 1) {
								response.hideFilter = true;
							}
						}
					}
					var isValid = this.validate();
					if (!isValid) {
						MaskHelper.HideBodyMask();
						return;
					}
					var columnValue = viewModel.get("EntitySchemaColumn");
					if (columnValue.isAggregative) {
						response.aggregationFunction = columnValue.aggregationFunction;
						response.isAggregative = true;
						response.leftExpressionCaption = response.caption.join(".");
						var lastPathElement = response.path[response.path.length - 1];
						var columnIsNotSelectedRegExp = new RegExp("]$", "ig");
						if (columnIsNotSelectedRegExp.test(lastPathElement) || response.aggregationFunction === "count") {
							response.path.push("Id");
						}
					} else {
						response.metaPath[response.metaPath.length] = columnValue.value;
						response.path[response.path.length] = columnValue.columnName;
						response.caption[response.caption.length] = columnValue.displayValue;
						response.leftExpressionCaption = response.caption.join(".");
					}
					response.leftExpressionColumnPath = response.path.join(".");
					response.dataValueType = columnValue.dataValueType;
					if (columnValue.isLookup) {
						response.isLookup = columnValue.isLookup;
						response.referenceSchemaName = columnValue.referenceSchemaName;
					}
					if (!response.referenceSchemaName && backwardReferenceSchemaName) {
						response.referenceSchemaName = backwardReferenceSchemaName;
						response.lastReferenceSchemaName = getLastReferenceSchemaName(pathItems);
					}
					sandbox.publish("ColumnSelected", response, [sandbox.id]);
					StructureExplorerUtilities.Close();
				};
				viewModel.expand = expandBase;
				viewModel.close = function() {
					removeItemsByKey(0);
					var identifier = getRootItemIdentifier();
					setSourceItems(identifier, function() {
						this.set("ExpandVisible", true);
						this.set("RemoveVisible", false);
						this.set("EntitySchemaColumn", null);
						this.set("ComboBoxListEnabled", true);
					}, this);
				};
			}

			function initView() {
				var viewConfig = StructureExplorerView.generateMainView(viewModel);
				view = Ext.create(viewConfig.className || "Terrasoft.Container", viewConfig);
				var page = Ext.getCmp("autoGeneratedBottomContainer");
				page.on("afterrender", filtersHandler, this);
				page.on("afterrender", afterRender, this);
			}

			function addItems(view, viewModel) {
				var key = viewCollection.getCount();
				viewModel.set("elementKey", key);
				viewCollection.add(key, view);
				viewModelCollection.add(key, viewModel);
			}

			function getIndex() {
				return viewModelCollection.getCount();
			}

			function removeItemsByKey(index) {
				while (viewCollection.contains(index) || viewModelCollection.contains(index)) {
					viewCollection.removeByKey(index).destroy();
					viewModelCollection.removeByKey(index++).destroy();
				}
			}

			function removeItemsByViewModel(viewModel, offset) {
				var index = viewModel.get("elementKey") + offset;
				while (viewCollection.contains(index) || viewModelCollection.contains(index)) {
					viewModelCollection.removeByKey(index).destroy();
					viewCollection.removeByKey(index).destroy();
					index++;
				}
			}

			function afterRender() {
				var itemEdit = Ext.getCmp("itemComboBox");
				itemEdit.getEl().focus();
			}

			return Ext.define("StructureExploreModule", {
				render: render,
				getViewModel: function() {
					if (!viewModel) {
						initViewModel();
					}
					return viewModel;
				},
				getView: function() {
					if (!view) {
						initView();
					}
					return view;
				}
			});
		}
		return createConstructor;
	});


