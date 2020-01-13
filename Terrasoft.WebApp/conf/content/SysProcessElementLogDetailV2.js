Terrasoft.configuration.Structures["SysProcessElementLogDetailV2"] = {innerHierarchyStack: ["SysProcessElementLogDetailV2"], structureParent: "BaseGridDetailV2"};
define('SysProcessElementLogDetailV2Structure', ['SysProcessElementLogDetailV2Resources'], function(resources) {return {schemaUId:'40d1dc01-c5be-4882-9e55-0da4c9a6bc2d',schemaCaption: "SysProcessElementLogDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'SysProcessElementLogDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysProcessElementLogDetailV2", ["ProcessModule", "ConfigurationConstants", "MaskHelper",
		"ProcessModuleUtilities", "SysProcessElementLogDetailV2Resources", "ProcessElementTraceDataPage",
		"SimpleSourceCodeEditPage"],
function(ProcessModule, ConfigurationConstants, MaskHelper, ProcessModuleUtilities) {
	return {
		entitySchemaName: "VwSysProcessElementLog",
		attributes: {

			/**
			 * Indicates if "Run Element" button is visible
			 */
			"IsRunElementButtonVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Indicates if "Download error description" button is visible
			 */
			"IsErrorButtonsVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Process element type.
			 */
			"ElementType": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": null
			}
		},
		messages: {

			/**
			 * Get parent process's status
			 */
			"GetProcessStatus": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetModuleInfo.
			 */
			"GetModuleInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			// region Methods: private

			/**
			 * Saves data into the file on the client.
			 * @private
			 * @param {String} blobData Error description.
			 * @param {String} fileName File name.
			 */
			_saveBlob: function(blobData, fileName) {
				var blobObject = new Blob([blobData], {
					type: "text/plain;charset=UTF-8"
				});
				// BrowserSupport: IE saves the File or Blob to disk
				if (window.navigator.msSaveBlob) {
					window.navigator.msSaveBlob(blobObject, fileName);
					return;
				}
				var txtFile = document.createElement("a");
				txtFile.href = URL.createObjectURL(blobObject);
				txtFile.download = fileName;
				document.body.appendChild(txtFile);
				txtFile.click();
				URL.revokeObjectURL(txtFile.href);
				document.body.removeChild(txtFile);
			},

			/**
			 * @return {string}
			 * @private
			 */
			_getProcessElementTraceDataPageModuleId: function() {
				return this.sandbox.id + "_ProcessElementTraceDataPage";
			},

			/**
			 * @private
			 */
			_getTraceDataTransformerType: function() {
				return this.$ElementType === "ReadDataUserTask"
					? "Terrasoft.ReadDataUserTaskTraceDataTransformer"
					: null;
			},

			/**
			 * @return {{schemaName: String, processElementLog: String}}
			 * @private
			 */
			_getProcessElementTraceDataPageModuleInfo: function() {
				var activeRow = this.getActiveRow();
				var processElementLog = activeRow.get("Id");
				return {
					schemaName: "ProcessElementTraceDataPage",
					processElementLog: processElementLog
				};
			},

			/**
			 * @private
			 */
			_initElementType: function(callback, scope) {
				var activeRow = this.getActiveRow();
				ProcessModuleUtilities.getProcessInstanceByUId(
				activeRow.get("SysProcess.SysSchema.UId"),
					function(instance) {
						var element = instance.flowElements.findByPath("uId",
							activeRow.get("SchemaElementUId"));
						if (element && element.schema) {
							this.$ElementType = element.schema.name;
						}
						Ext.callback(callback, scope);
					}, this);
			},

			/**
			 * @private
			 */
			_getProcessElementErrorDescriptionModuleInfo: function() {
				var activeRow = this.getActiveRow();
				var errorDescription = activeRow.get("ErrorDescription");
				return {
					schemaName: "SimpleSourceCodeEditPage",
					content: errorDescription
				};
			},

			// endregion

			/**
			 * Indicates if active row has trace data
			 * @return {boolean}
			 */
			getActiveRowHasTraceData: function() {
				var activeRow = this.getActiveRow();
				var activeRowHasTrace = Boolean(activeRow && activeRow.get("HasTraceData"));
				return activeRowHasTrace;
			},

			// region Methods: protected

			/**
			 * @inheritdoc BaseGridDetailV2#addRecordOperationsMenuItems
			 * @overridden
			 */
			addRecordOperationsMenuItems: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc BaseGridDetailV2#addDetailWizardMenuItems
			 * @overridden
			 */
			addDetailWizardMenuItems: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc BaseGridDetailV2#getSwitchGridModeMenuItem
			 * @overridden
			 */
			getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

			/**
			 * @protected
			 */
			initDetailOptions: function() {
				this.set("IsDetailCollapsed", true);
				this.callParent();
			},


			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#initQueryColumns
			 * @overridden
			 */
			initQueryColumns: function(esq) {
				this.callParent(arguments);
				esq.addColumn("SysProcess.SysSchema.UId");
				esq.addColumn("SchemaElementUId");
			},

			/**
			 * @protected
			 */
			getGridDataColumns: function() {
				var gridDataColumns = this.callParent(arguments);
				var columnsConfig = ["ErrorDescription", "SysProcess", "Status", "HasTraceData"];
				Terrasoft.each(columnsConfig, function(columnName) {
					if (!gridDataColumns[columnName]) {
						gridDataColumns[columnName] = {
							path: columnName
						};
					}
				}, this);
				return gridDataColumns;
			},

			/**
			 * @protected
			 */
			runElement: function(recordId) {
				if (!recordId && this.isSingleSelected()) {
					var activeRow = this.getActiveRow();
					recordId = activeRow.get(this.primaryColumnName);
				}
				var data = {
					procElUId: recordId
				};
				MaskHelper.ShowBodyMask();
				var responseCallback = function() {
					MaskHelper.HideBodyMask();
				};
				ProcessModule.services.callConfigurationServiceMethod(
					"ProcessEngineService/ExecuteProcessElement", data, responseCallback);
			},

			/**
			 * @inheritdoc GridUtilitiesV2#onGridDataLoaded
			 * @overridden
			 */
			onGridDataLoaded: function() {
				this.callParent(arguments);
				this.set("IsRunElementButtonVisible", this.runElementButtonVisible());
				this.set("IsErrorButtonsVisible", this.getErrorButtonsVisible());
			},

			/*
			 * Row selection handler.
			 * @protected
			 * @param {String} rowId Row identifier.
			 */
			selectRow: function(rowId) {
				this.set("IsRunElementButtonVisible", this.runElementButtonVisible(rowId));
				this.set("IsErrorButtonsVisible", this.getErrorButtonsVisible(rowId));
			},

			/**
			 * Returns if "Run Element" button is visible
			 * @return {boolean}
			 */
			runElementButtonVisible: function(rowId) {
				var gridData = this.getGridData();
				if (this.get("IsDetailCollapsed") || gridData.getCount() === 0) {
					return false;
				}
				var activeRow = rowId ? gridData.get(rowId) : this.getActiveRow();
				if (!activeRow) {
					return false;
				}
				var status = ConfigurationConstants.SysProcess.Status;
				var elementStatus = activeRow.get("Status");
				if (elementStatus.value === status.Running) {
					return true;
				} else if (elementStatus.value === status.Error) {
					var processStatus = this.sandbox.publish("GetProcessStatus");
					return processStatus.value !== status.Canceled;
				}
			},

			/**
			 * Returns if "Download error description" button is visible
			 * @return {boolean}
			 */
			getErrorButtonsVisible: function(rowId) {
				var gridData = this.getGridData();
				if (this.get("IsDetailCollapsed") || gridData.getCount() === 0) {
					return false;
				}
				var activeRow = rowId ? gridData.get(rowId) : this.getActiveRow();
				if (activeRow) {
					var status = activeRow.get("Status");
					return status.value === ConfigurationConstants.SysProcess.Status.Error;
				}
				return false;
			},

			/**
			 * Generates "download Error" menu item.
			 * @return {Terrasoft.BaseViewModel}
			 */
			getDownloadErrorMenuItem: function() {
				return this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.DownloadErrorCaption"},
					Click: {"bindTo": "downloadError"},
					Visible: {bindTo: "IsErrorButtonsVisible"}
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#initToolsButtonMenu
			 * @overridden
			 */
			initToolsButtonMenu: function() {
				this.callParent(arguments);
				var toolsButtonMenu = this.get("ToolsButtonMenu");
				var downloadError = this.getDownloadErrorMenuItem();
				toolsButtonMenu.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				toolsButtonMenu.addItem(downloadError);
			},

			/**
			 * Takes description of the error, which is saved into the file on the client.
			 * @protected
			 */
			downloadError: function() {
				var activeRow = this.getActiveRow();
				var processName = activeRow.get("SysProcess").displayValue;
				var fileName = processName + "_Error";
				var errorDescription = activeRow.get("ErrorDescription");
				this._saveBlob(errorDescription, fileName);
			},

			/**
			 * Takes description of the error, which is saved into the file on the client.
			 * @protected
			 */
			takeError: function() {
				this.downloadError();
			},

			// endregion

			// region Methods: public

			/**
			 * Opens trace data window
			 * @public
			 */
			openTrace: function() {
				this._initElementType(function() {
					this.sandbox.loadModule("ModalBoxSchemaModule", {
						id: this._getProcessElementTraceDataPageModuleId(),
						instanceConfig: {
							moduleInfo: this._getProcessElementTraceDataPageModuleInfo(),
							parameters: {
								viewModelConfig: {
									TransformerType: this._getTraceDataTransformerType()
								}
							},
							initialSize: { width: 800, height: 800 }
						}
					});
				}, this);
			},

			/**
			 * Shows description of the error.
			 * @public
			 */
			showError: function() {
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					id: this._getProcessElementTraceDataPageModuleId(),
					instanceConfig: {
						moduleInfo: this._getProcessElementErrorDescriptionModuleInfo(),
						initialSize: { width: "80%", height: 800 }
					}
				});
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"type": "listed",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [
							{
								"name": "CaptionListedGridColumn",
								"bindTo": "Caption",
								"position": {
									"column": 1,
									"colSpan": 10
								}
							},
							{
								"name": "StatusListedGridColumn",
								"bindTo": "Status",
								"position": {
									"column": 11,
									"colSpan": 4
								}
							},
							{
								"name": "StartDateListedGridColumn",
								"bindTo": "StartDate",
								"position": {
									"column": 15,
									"colSpan": 5
								}
							},
							{
								"name": "CompleteDateListedGridColumn",
								"bindTo": "CompleteDate",
								"position": {
									"column": 20,
									"colSpan": 5
								}
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {
							"columns": 24,
							"rows": 3
						},
						"items": [
							{
								"name": "CaptionTiledGridColumn",
								"bindTo": "Caption",
								"position": {
									"row": 1,
									"column": 1,
									"colSpan": 10
								}
							},
							{
								"name": "StatusTiledGridColumn",
								"bindTo": "Status",
								"position": {
									"row": 1,
									"column": 11,
									"colSpan": 4
								}
							},
							{
								"name": "StartDateTiledGridColumn",
								"bindTo": "StartDate",
								"position": {
									"row": 1,
									"column": 15,
									"colSpan": 5
								}
							},
							{
								"name": "CompleteDateTiledGridColumn",
								"bindTo": "CompleteDate",
								"position": {
									"row": 1,
									"column": 20,
									"colSpan": 5
								}
							}
						]
					},
					"selectRow": {"bindTo": "selectRow"}
				}
			},
			{
				"operation": "insert",
				"name": "RunElementButton",
				"parentName": "Detail",
				"index": 2,
				"propertyName": "tools",
				"values":
				{
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.ExecuteElementCaption"},
					"click": {
						"bindTo": "runElement"
					},
					"visible": {
						"bindTo": "IsRunElementButtonVisible"
					}
				}
			}, {
				"operation": "insert",
				"name": "OpenTrace",
				"parentName": "Detail",
				"index": 3,
				"propertyName": "tools",
				"values":
				{
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": { "bindTo": "Resources.Strings.OpenTraceButtonCaption" },
					"click": { "bindTo": "openTrace" },
					"visible": { "bindTo": "getActiveRowHasTraceData" }
				}
			}, {
				"operation": "insert",
				"name": "ShowErrorButton",
				"parentName": "Detail",
				"index": 3,
				"propertyName": "tools",
				"values":
				{
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.TakeErrorCaption"},
					"click": {
						"bindTo": "showError"
					},
					"visible": {
						"bindTo": "IsErrorButtonsVisible"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


