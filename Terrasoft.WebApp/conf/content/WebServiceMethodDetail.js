Terrasoft.configuration.Structures["WebServiceMethodDetail"] = {innerHierarchyStack: ["WebServiceMethodDetail"], structureParent: "BaseGridDetailV2"};
define('WebServiceMethodDetailStructure', ['WebServiceMethodDetailResources'], function(resources) {return {schemaUId:'93ae1d9c-3eea-4247-b62f-788002ea74ff',schemaCaption: "WebServiceMethodDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'WebServiceMethodDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseGridDetailV2
 */
define("WebServiceMethodDetail", ["ConfigurationEnums", "WebServiceMethodDetailResources",
	"css!ServiceDesignerStyles", "ServiceDesignerUtilities", "SortableGridViewModelMixin"
], function(ConfigurationEnums, resources) {
	return {
		messages: {
			/**
			 * Closed method page.
			 */
			"CloseMethodPage": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		mixins: {
			sortableGrid: "Terrasoft.SortableGridViewModelMixin"
		},
		attributes: {
			/**
			 * Service schema UId.
			 */
			"ServiceSchemaUId": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Service schema.
			 */
			"ServiceSchema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Is allow edit fields.
			 */
			"CanEditSchema": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is method page showed.
			 */
			"ShowMethodPage": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getIsLinkColumn
			 * @override
			 */
			initEditPages: function() {
				var typeUId = "09cfe46e-ba2d-4bba-9f0d-d9decef0e4ac";
				this.$EditPages = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.$EditPages.add(typeUId, Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: typeUId,
						Click: {bindTo: "addRecord"},
						Tag: typeUId,
						MiniPage: {
							hasAddMiniPage: false
						},
						SchemaName: "WebServiceMethodPage"
					}
				}));
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getIsLinkColumn
			 * @override
			 */
			getIsLinkColumn: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.GridUtilities#sortColumn
			 * @override
			 */
			sortColumn: function(index) {
				this.sortByColumn(index);
			},

			/**
			 * @inheritdoc Terrasoft.SortableGridViewModelMixin#getDataCollection
			 * @override
			 */
			getColumnGetter: function(column) {
				if (column === "Type") {
					return function(item) {
						return item.request.httpMethodType;
					};
				} else {
					return function(item) {
						var value = item.caption.getValue();
						if (value) {
							value = value.toLowerCase();
						}
						return value;
					};
				}
			},

			/**
			 * @inheritdoc Terrasoft.SortableGridViewModelMixin#getDataCollection
			 * @override
			 */
			getDataCollection: function() {
				return this.$ServiceSchema.methods;
			},

			//endregion

			//region Methods: Private

			/**
			 * @private
			 */
			_deleteMethods: function(methods) {
				methods.forEach(function(methodUId) {
					this.$ServiceSchema.methods.remove(
						this.$ServiceSchema.methods.firstOrDefault(function(method) {
							return method.uId === methodUId;
						})
					);
				}, this);
				this.reloadGridData();
			},

			/**
			 * @private
			 */
			_getRowViewModelColumns: function() {
				return {
					Caption: {
						dataValueType: Terrasoft.DataValueType.TEXT
					},
					Type: {
						dataValueType: Terrasoft.DataValueType.TEXT
					}
				};
			},

			/**
			 * @private
			 */
			_getRowViewModelValues: function(rowObject) {
				return {
					Id: rowObject.uId,
					Caption: rowObject.caption.getValue(),
					Type: rowObject.request.findHttpMethodTypeName()
				};
			},

			/**
			 * @private
			 */
			_getRowViewModel: function(rowObject) {
				return this.Ext.create("Terrasoft.BaseViewModel", {
					columns: this._getRowViewModelColumns(),
					values: this._getRowViewModelValues(rowObject)
				});
			},

			/**
			 * @private
			 */
			_getRowViewModelId: function(rowObject) {
				return rowObject.getPropertyValue("uId");
			},

			/**
			 * @private
			 */
			_getEnumerableObject: function() {
				return this.$ServiceSchema.methods;
			},

			/**
			 * @private
			 */
			_canLoadGridData: function() {
				return this.$ServiceSchema;
			},

			/**
			 * @private
			 */
			_findSchemaInstance: function(callback, scope) {
				var items = Terrasoft.ServiceSchemaManager.getItems();
				var item = items.findByPath("uId", this.$MasterRecordId);
				if (item) {
					item.getInstance(callback, scope);
				} else {
					callback.call(scope);
				}
			},

			/**
			 * @private
			 */
			_closeMethodPage: function() {
				this.$ShowMethodPage = false;
				this.reloadGridData();
			},

			/**
			 * @private
			 */
			_subscribeCloseMethodPageSandboxEvent: function() {
				this.sandbox.subscribe("CloseMethodPage", this._closeMethodPage, this);
			},

			/**
			 * Provides settings for sorting.
			 * @private
			 */
			_getSortSettingsConfig: function() {
				return {
					columnsToSort: ["Caption", "Type"],
					profileKey: "WebServiceMethodDetail_GridSortConfig"
				};
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
			 * @override
			 */
			addDetailWizardMenuItems: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSettingsMenuItem
			 * @override
			 */
			getGridSettingsMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
			 * @override
			 */
			getGridSortMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getShowQuickFilterButton
			 * @override
			 */
			getShowQuickFilterButton: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getHideQuickFilterButton
			 * @override
			 */
			getHideQuickFilterButton: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#deleteRecords
			 * @override
			 */
			deleteRecords: function() {
				if (this.$CanEditSchema) {
					var items = this.getSelectedItems();
					if (items && items.length > 0) {
						this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
							function(result) {
								if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									this._deleteMethods(items);
								}
							}, [this.Terrasoft.MessageBoxButtons.NO.returnCode,
								this.Terrasoft.MessageBoxButtons.YES.returnCode], null);
					}
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecord
			 * @override
			 */
			addRecord: function(editPageUId) {
				if (this.$CanEditSchema) {
					editPageUId = editPageUId || this.getFirstEditPageUId();
					this.set("CardState", ConfigurationEnums.CardStateV2.ADD);
					this.set("EditPageUId", editPageUId);
					this.set("PrimaryValueUId", null);
					this.openCardByMode();
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#openCard
			 * @override
			 */
			openCard: function(operation) {
				var viewModelConfig = {
					ServiceUId: this.$ServiceSchema.uId,
					Operation: operation
				};
				if (operation !== ConfigurationEnums.CardStateV2.ADD) {
					viewModelConfig.MethodUId = this.getActiveRow() && this.getActiveRow().$Id;
				}
				var moduleId = Ext.String.format("{0}{1}{2}", this.sandbox.id, "_WebServiceMethodModule_",
					this.$ServiceSchema.uId);
				this.$ShowMethodPage = true;
				this.sandbox.loadModule("WebServiceMethodModule", {
					renderTo: Ext.get("MethodPageContainer"),
					id: moduleId,
					instanceConfig: {
						parameters: {
							viewModelConfig: viewModelConfig
						}
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getExportToExcelMenuVisibility
			 * @override
			 */
			getExportToExcelMenuVisibility: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#loadGridData
			 * @override
			 */
			loadGridData: function() {
				if (this._canLoadGridData()) {
					var result = new Terrasoft.Collection();
					this._getEnumerableObject().each(function(method) {
						result.add(this._getRowViewModelId(method), this._getRowViewModel(method));
					}, this);
					this.onGridDataLoaded({success: true, collection: result});
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#linkClicked
			 * @override
			 */
			linkClicked: function(recordId) {
				this.$ActiveRow = recordId;
				this.editRecord();
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this._subscribeCloseMethodPageSandboxEvent();
				this.set("EditPages", new Terrasoft.Collection());
				this.callParent([function() {
					Terrasoft.chain(
						function(next) {
							Terrasoft.ServiceSchemaManager.initialize(next, this);
						},
						function(next) {
							this._findSchemaInstance(next, this);
						},
						function(next, schema) {
							this.$ServiceSchema = schema;
							this.$ServiceSchema.on("changed", this.reloadGridData, this);
							Terrasoft.ServiceDesignerUtilities.canEditSchema(schema, function(result) {
								this.$CanEditSchema = result;
								this.$IsDetailCollapsed = false;
								this.$ServiceSchema.methods.suspendEvents();
								this.initSortingSettings(this._getSortSettingsConfig(), function() {
									this.$ServiceSchema.methods.resumeEvents();
									this.loadGridData();
									Ext.callback(callback, scope);
								}, this);
							}, this);
						},
						this
					);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getActiveRow
			 * @override
			 */
			getActiveRow: function() {
				if (this.$ActiveRow) {
					var gridData = this.getGridData();
					return gridData.findByFn(function(item) {
						return item.$Id === this.$ActiveRow;
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#editRecord
			 * @override
			 */
			editRecord: function(record) {
				var activeRow = record || this.getActiveRow();
				if (!activeRow) {
					return;
				}
				var primaryColumnValue = activeRow.get(activeRow.primaryColumnName);
				var typeColumnValue = this.getTypeColumnValue(activeRow);
				this.setLastActiveRow(primaryColumnValue);
				this.openCard(ConfigurationEnums.CardStateV2.EDIT, typeColumnValue, primaryColumnValue);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#copyRecord
			 * @override
			 */
			copyRecord: function(editPageUId) {
				if (this.$CanEditSchema) {
					if (!this.isAnySelected() || !this.getIsCardValid()) {
						return;
					}
					var activeRow = this.getActiveRow();
					var typeColumnValue = this.getTypeColumnValue(activeRow);
					editPageUId = editPageUId || typeColumnValue === this.Terrasoft.GUID_EMPTY
						? this.getFirstEditPageUId()
						: typeColumnValue;
					var selectedItems = this.getSelectedItems();
					var copiedRecordId = selectedItems[0];
					this.setLastActiveRow(copiedRecordId);
					this.openCard(ConfigurationEnums.CardStateV2.COPY, editPageUId, copiedRecordId);
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
			 * @override
			 */
			getSwitchGridModeMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc GridUtilitiesV2#addColumnLink
			 * @override
			 */
			addColumnLink: function(item) {
				var onColumnLinkClickHandler = "onCaptionLinkClick";
				var scope = this;
				item[onColumnLinkClickHandler] = function() {
					return scope.createLink("VwWebServiceV2", "Caption", item.get("Caption"),
						scope.$MasterRecordId, item.$Id);
				};
			},

			/**
			 * @inheritdoc GridUtilitiesV2#createLink
			 * @override
			 */
			createLink: function(entitySchemaName, columnPath, displayValue) {
				return {
					caption: displayValue,
					target: "_self",
					title: displayValue,
					url: window.location.hash
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				if (this.$ServiceSchema) {
					this.$ServiceSchema.un("changed", this.reloadGridData, this);
				}
				this.callParent(arguments);
			}

			//endregion

		},
		diff: [
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"type": "listed",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [
							{
								"name": "Caption",
								"bindTo": "Caption",
								"caption": resources.localizableStrings.MethodNameColumnCaption,
								"position": {"column": 0, "colSpan": 12}
							},
							{
								"name": "Type",
								"bindTo": "Type",
								"caption": resources.localizableStrings.HttpMethodTypeColumnCaption,
								"position": {"column": 12, "colSpan": 12}
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {},
						"items": []
					},
					"isEmptyCaption": resources.localizableStrings.EmptyGrid
				}
			},
			{
				"operation": "insert",
				"name": "MethodPageContainer",
				"values": {
					"id": "MethodPageContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["method-page-container"]},
					"items": [],
					"visible": {"bindTo": "ShowMethodPage"}
				}
			},
			{
				"operation": "merge",
				"name": "loadMore",
				"values": {
					"visible": {"bindTo": false}
				}
			}
		]
	};
});


