Terrasoft.configuration.Structures["BaseServiceParameterGrid"] = {innerHierarchyStack: ["BaseServiceParameterGrid"]};
define('BaseServiceParameterGridStructure', ['BaseServiceParameterGridResources'], function(resources) {return {schemaUId:'f490e67e-05d5-4f48-a374-299e1f1e8232',schemaCaption: "BaseServiceParameterGrid", parentSchemaName: "", schemaName:'BaseServiceParameterGrid',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseServiceParameterGrid", ["BaseServiceParameterGridResources",
			"ServiceMetaItemViewModelMixin", "ServiceParameterViewModel", "GridUtilitiesV2",
			"css!ServiceDesignerStyles", "ServiceDesignerUtilities", "SortableGridViewModelMixin"],
		function(resources) {
	return {
		mixins: {
			serviceMetaItemViewModelMixin: "Terrasoft.ServiceMetaItemViewModelMixin",
			sortableGrid: "Terrasoft.SortableGridViewModelMixin"
		},
		messages: {

			/**
			 * @message ServiceMethodBuilt
			 * Subscription for ServiceMethodBuilder save event.
			 * @return {Object}
			 */
			ServiceMethodBuilt: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}

		},
		attributes: {

			/**
			 * List of element displayed in grid.
			 */
			GridData: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * List of parameters.
			 */
			Parameters: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Value of primary column of selected row in grid.
			 */
			ActiveRow: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Indicates is the grid empty.
			 */
			IsGridDataEmpty: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Stores selected rows.
			 */
			SelectedRows: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Stores expanded hierarchy levels.
			 */
			ExpandHierarchyLevels: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Sort direction.
			 */
			GridSortDirection: {
				dataValueType: Terrasoft.DataValueType.INTEGER
			},

			/**
			 * Sort column.
			 */
			SortColumnIndex: {
				dataValueType: Terrasoft.DataValueType.INTEGER
			},

			/**
			 * Multi selection flag.
			 */
			MultiSelect: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}

		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_executeSelection: function(id, selectedRows, select) {
				if (select) {
					Ext.Array.include(selectedRows, id);
				} else {
					Ext.Array.remove(selectedRows, id);
				}
			},

			/**
			 * @private
			 */
			_selectChildren: function(id, selectedRows, select) {
				const children = this.$GridData.filterByFn(function(item) {
					return item.$ParentId === id;
				}, this);
				children.each(function(child) {
					this._executeSelection(child.$Id, selectedRows, select);
					this._selectChildren(child.$Id, selectedRows, select);
				}, this);
			},

			/**
			 * Calls the function to convert ServiceParameterViewModel on each element in parameters collection.
			 * @param {Terrasoft.Collection} target Array to push new element.
			 * @param {Terrasoft.ObjectCollection} parameters Collection of parameters to convert.
			 * @param {Guid} parentId UId of parent parameter.
			 * @private
			 */
			_prepareViewModel: function(target, parameters, parentId) {
				if (parameters) {
					parameters.each(function(parameter) {
						this.convertParameterToViewModel(target, parameter, parentId);
					}, this);
				}
			},

			/**
			 * Initializes initial state of grid and sets event of it.
			 * @private
			 */
			_initGridData: function() {
				this.$GridData = new Terrasoft.BaseViewModelCollection({
					getKey: function(item) {
						return item.$Id;
					}
				});
				this.$GridData.on("add", this._onGridDataChange, this);
				this.$GridData.on("remove", this._onGridDataChange, this);
				this.$GridData.on("dataLoaded", this._onGridDataChange, this);
			},

			/**
			 * Fires when adds or remove item from grid data collection.
			 * @private
			 */
			_onGridDataChange: function() {
				this.$IsGridDataEmpty = this.$GridData.isEmpty();
				if (!this.$IsGridDataEmpty && !this.$MultiSelect) {
					var parameter = this.$GridData.firstOrDefault(function(item) {
						return item.$Id === this.$ActiveRow;
					}, this);
					var activeParameterUId = parameter && parameter.$Id;
					if (!activeParameterUId) {
						activeParameterUId = this.$GridData.firstOrDefault(function(activeParameter) {
							return !activeParameter.$ParentId;
						});
						activeParameterUId = activeParameterUId && activeParameterUId.$Id;
					}
					this.$ActiveRow = activeParameterUId;
				} else {
					this.$ActiveRow = null;
				}
			},

			/**
			 * Updates ExpandHierarchyLevels when ServiceMethodBuilder exits.
			 * @param methodData
			 * @private
			 */
			_onServiceMethodBuilt: function(methodData) {
				const parsedMethod = this.Ext.create("Terrasoft.ServiceMethod", JSON.parse(methodData));
				const parsedParameters = this.getMethodParameters(parsedMethod);
				const viewModels = new Terrasoft.Collection();
				this._prepareViewModel(viewModels, parsedParameters);
				const newLevels = this.getHierarchicalNodesUIds(viewModels);
				[].push.apply(newLevels, this.$ExpandHierarchyLevels);
				this.$ExpandHierarchyLevels = newLevels;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Creates new instance of ServiceParameterViewModel using parameter instance.
			 * @param {Terrasoft.Collection} target Array to push new element.
			 * @param {Terrasoft.ObjectCollection} parameters Collection of parameters to convert.
			 * @param {Guid} parentId UId of parent parameter.
			 * @protected
			 */
			convertParameterToViewModel: function(target, parameter, parentId) {
				var viewModelParameter = this.Ext.create("Terrasoft.ServiceParameterViewModel", {
					values: {
						Id: parameter.uId,
						Name: parameter.name,
						ParentId: parentId,
						DataValueTypeName: parameter.dataValueTypeName,
						IsArray: parameter.isArray,
						ServiceParameter: parameter
					}
				});
				viewModelParameter.init();
				viewModelParameter.on("change", this._setCanAddNested, this);
				target.add(viewModelParameter.$Id, viewModelParameter);
				if (parameter.itemProperties) {
					this._prepareViewModel(target, parameter.itemProperties, parameter.uId);
				}
			},

			/**
			 * @protected
			 */
			getServiceBuilderTags: function() {
				return [];
			},

			/**
			 * @protected
			 */
			getGridData: function() {
				return this.$GridData;
			},

			/**
			 * Returns parameters collection from method fetched from ServiceSchemaManager.
			 * @param {Terrasoft.ServiceMethod} method Method which contains parameters collection.
			 * @returns {Terrasoft.ObjectCollection}
			 * @protected
			 */
			getMethodParameters: function() {
				return null;
			},

			/**
			 * Provides settings for sorting.
			 * @protected
			 */
			getSortSettingsConfig: function() {
				var profileKey = Ext.String.format("ServiceParameterGrid_GridSortConfig_{0}",
					this.sandbox && this.sandbox.id);
				return {
					columnsToSort: ["", "Caption", "TypeCaption", "DisplayDefValue"],
					profileKey: profileKey
				};
			},

			/**
			 * Returns array of parameters with nested parameters.
			 * @param parameters
			 * @return {Array}
			 * @protected
			 */
			getHierarchicalNodesUIds: function(parameters, parentUId) {
				let result = [];
				if (parentUId) {
					const nestedCollection = parameters.filterByPath("$ParentId", parentUId);
					if (!nestedCollection.isEmpty()) {
						result.push(parentUId);
						nestedCollection.each(function(nestedItem) {
							const parents = this.getHierarchicalNodesUIds(parameters, nestedItem.$Id);
							parents.forEach(function(parent) {
								if (parent && !Terrasoft.contains(result, parent)) {
									result.push(parent);
								}
							});
						}, this);
					}
				} else {
					result = parameters.getItems().map(function(parameter) {
						return parameter.$ParentId;
					});
					result = _.compact(result);
				}
				return _.uniq(result);
			},

			/**
			 * @inheritDoc Terrasoft.BaseObject#onDestroy.
			 * @overridden
			 */
			onDestroy: function() {
				if (this.$Parameters) {
					this.$Parameters.un("changed", this.updateGridViewModel, this);
				}
				this.callParent(arguments);
			},

			/**
			 * Initializes parameters.
			 * @protected
			 */
			initParameters: function(callback, scope) {
				this.$Parameters = new Terrasoft.Collection();
				Ext.callback(callback, scope);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#onRender.
			 * @overridden
			 */
			onRender: function() {
				this.initSortingSettings(this.getSortSettingsConfig());
			},

			/**
			 * Returns selection info.
			 * @param previous Previous value.
			 * @param current Current value.
			 * @result {Object} result Selection info.
			 * @result {Object} result.selected Indicates if record was slected or deselected.
			 * @result {Object} result.ids Selected/Deselected ids.
			 * @protected
			 */
			getSelectionInfo: function (previous, current) {
				var selected = previous.length < current.length;
				var ids = selected
					? Ext.Array.difference(current, previous)
					: Ext.Array.difference(previous, current);
				return {
					selected: selected,
					ids: ids
				};
			},

			/**
			 * Handles SelectedRows attribute changing.
			 * @param previous Previous value.
			 * @param current Current value.
			 * @protected
			 */
			onSelectedRowsChange: function (previous, current) {
				var selectionInfo = this.getSelectionInfo(previous, current);
				var ids = selectionInfo.ids;
				var selected = selectionInfo.selected;
				Terrasoft.each(ids, function(i) {
					this._selectChildren(i, current, selected);
				}, this);
			},

			/**
			 * Starts converting of all parameters to ServiceParameterViewModel instances and create reload all grid
			 * data.
			 * @protected
			 */
			updateGridViewModel: function() {
				Terrasoft.each(this.$GridData, function(item) {
					item.destroy();
				}, this);
				var viewModels = new Terrasoft.Collection();
				this._prepareViewModel(viewModels, this.$Parameters);
				this.$GridData.reloadAll(viewModels);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseModel#set
			 * @override
			 */
			set: function(attibute, value, options) {
				if (this.$MultiSelect && attibute === "SelectedRows" && !options.skipHandling) {
					var previous = this.$SelectedRows || [];
					var current = Terrasoft.deepClone(value) || [];
					this.onSelectedRowsChange(previous, current);
					this.set("SelectedRows", current, { skipHandling: true });
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * Returns is selected row isn't empty.
			 * @public
			 * @returns {Boolean}
			 */
			activeRowIsNotEmpty: function() {
				return Boolean(this.$ActiveRow) && !this.$MultiSelect;
			},

			/**
			 * Perform initialize and subscribe on messages from ServiceParameterPage.
			 * @public
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						Terrasoft.chain(
							function(next) {
								Terrasoft.ServiceDesignerUtilities.initSysSettings(next, Terrasoft.ServiceDesignerUtilities);
							},
							function(next) {
								this.initParameters(next, this);
							},
							function() {
								this.updateGridViewModel();
								this.$ExpandHierarchyLevels = this.getHierarchicalNodesUIds(this.$GridData);
								this.initSortingSettings(this.getSortSettingsConfig(), callback, scope);
							},
							this
						);
					}, this
				]);
			},

			/**
			 * Enables multi select in grid.
			 * @public
			 */
			enableMultiSelect: function() {
				this.$ActiveRow = null;
				this.set("MultiSelect", true);
			},

			/**
			 * Disables multi select in grid.
			 * @public
			 */
			disableMultiSelect: function() {
				this.set("MultiSelect", false);
				this.$SelectedRows = [];
				var firstRow = this.$GridData.first();
				if (firstRow) {
					this.$ActiveRow = firstRow.$Id;
				}
			},

			/**
			 * Marks all rows in grid as selected.
			 */
			selectAll: function() {
				if (!this.$MultiSelect) {
					this.enableMultiSelect();
				}
				this.$SelectedRows = this.$GridData.getKeys();
				this.$ExpandHierarchyLevels = this.getHierarchicalNodesUIds(this.$GridData);
			},

			/**
			 * Marks all rows in grid as unselected.
			 */
			deselectAll: function() {
				this.$SelectedRows = [];
			},

			/**
			 * Is selected rows isn't empty.
			 * @public
			 */
			selectedRowsIsNotEmpty: function() {
				return this.$SelectedRows && this.$SelectedRows.length > 0;
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initGridData();
				this.sandbox.subscribe("ServiceMethodBuilt", this._onServiceMethodBuilt, this,
						this.getServiceBuilderTags());
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				operation: "insert",
				name: "ToolbarContainer",
				values: {
					itemType: Terrasoft.ViewItemType.CONTAINER,
					items: []
				}
			},
			{
				operation: "insert",
				name: "CombinedModeCustomActionsButton",
				parentName: "ToolbarContainer",
				propertyName: "items",
				values: {
					itemType: this.Terrasoft.ViewItemType.BUTTON,
					imageConfig: resources.localizableImages.ToolsButtonImage,
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					classes: {
						wrapperClass: ["detail-tools-button-wrapper"],
						menuClass: ["detail-tools-button-menu"]
					},
					menu: [
						{
							caption: resources.localizableStrings.SelectAllButtonCaption,
							click: {
								bindTo: "selectAll"
							},
							enabled: {
								bindTo: "IsGridDataEmpty",
								bindConfig: {
									converter: "invertBooleanValue"
								}
							}
						},
						{
							caption: resources.localizableStrings.UnselectAllButtonCaption,
							click: {
								bindTo: "deselectAll"
							},
							visible: "$MultiSelect",
							enabled: {
								bindTo: "selectedRowsIsNotEmpty"
							}
						}
					]
				}
			},
			{
				operation: "insert",
				name: "EnableMultiSelect",
				parentName: "CombinedModeCustomActionsButton",
				propertyName: "menu",
				index: 0,
				values: {
					caption: resources.localizableStrings.MultiModeMenuCaption,
					click: {
						bindTo: "enableMultiSelect"
					},
					visible: {
						bindTo: "MultiSelect",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					},
					enabled: {
						bindTo: "IsGridDataEmpty",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					}
				}
			},
			{
				operation: "insert",
				name: "DisableMultiSelect",
				parentName: "CombinedModeCustomActionsButton",
				propertyName: "menu",
				index: 1,
				values: {
					caption: resources.localizableStrings.SingleModeMenuCaption,
					click: {
						bindTo: "disableMultiSelect"
					},
					visible: "$MultiSelect"
				}
			},
			{
				operation: "insert",
				name: "MainContainer",
				values: {
					itemType: Terrasoft.ViewItemType.CONTAINER,
					classes: {wrapClassName: ["service-parameter-grid-main-container"]},
					items: []
				}
			},
			{
				operation: "insert",
				name: "DataGridControl",
				parentName: "MainContainer",
				propertyName: "items",
				values: {
					itemType: Terrasoft.ViewItemType.GRID,
					collection: "$GridData",
					useListedLookupImages: true,
					type: "listed",
					activeRow: "$ActiveRow",
					scrollParent: true,
					selectedRows: "$SelectedRows",
					expandHierarchyLevels: "$ExpandHierarchyLevels",
					allowScrollToActiveRow: true,
					isEmpty: "$IsGridDataEmpty",
					rowDataItemMarkerColumnName: "Caption",
					multiSelect: "$MultiSelect",
					sortColumn: {"bindTo": "sortByColumn"},
					sortColumnDirection: {"bindTo": "GridSortDirection"},
					sortColumnIndex: {"bindTo": "SortColumnIndex"},
					columnsConfig: [
						{
							classes: ["parameter-grid-column-with-icon"],
							cols: 10,
							key: [
								{
									name: {bindTo: "TypeIcon"},
									type: this.Terrasoft.GridIconType.ICON22LISTED,
									caption: " "
								},
								{
									name: {bindTo: "Caption"},
									type: Terrasoft.GridCellType.TEXT
								}
							]
						},
						{
							cols: 6,
							key: [{
								name: {bindTo: "TypeCaption"},
								type: Terrasoft.GridCellType.TEXT
							}]
						},
						{
							cols: 8,
							key: [{
								name: {
									bindTo: "DisplayDefValue"
								},
								type: Terrasoft.GridCellType.TEXT
							}]
						}
					],
					captionsConfig: [
						{
							cols: 1,
							name: " "
						},
						{
							cols: 9,
							name: resources.localizableStrings.CaptionColumn
						},
						{
							cols: 6,
							name: resources.localizableStrings.DataValueTypeNameColumn
						},
						{
							cols: 8,
							name: resources.localizableStrings.DefaultValueColumn
						}
					],
					hierarchical: true,
					hierarchicalColumnName: "ParentId",
					listedZebra: true,
					autoExpandHierarchyLevels: true,
					forceUpdateExpandHierarchyLevels: true
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


