Terrasoft.configuration.Structures["FileImportDuplicateManagementPage"] = {innerHierarchyStack: ["FileImportDuplicateManagementPage"], structureParent: "FileImportWizardStepPage"};
define('FileImportDuplicateManagementPageStructure', ['FileImportDuplicateManagementPageResources'], function(resources) {return {schemaUId:'0f3a039a-d4a7-4538-9d15-8765411ad8d9',schemaCaption: "FileImportDuplicateManagementPage", parentSchemaName: "FileImportWizardStepPage", schemaName:'FileImportDuplicateManagementPage',parentSchemaUId:'c28ed8d9-a852-43ed-ad8d-f594bb3a094f',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FileImportDuplicateManagementPage", [], function() {
	return {
		attributes: {
			SelectedRows: {dataValueType: Terrasoft.DataValueType.COLLECTION},
			NextStepPageName: {
				value: "FileImportProcessingPage"
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Adds root schema columns to grid.
			 * @private
			 * @param {Array} columns Import columns.
			 */
			addRootSchemaColumns: function(columns) {
				var rootSchema = this.get("RootSchema");
				var collection = this.get("GridData");
				this.set("Columns", columns);
				this.Terrasoft.each(columns, function(column) {
					var destinations = column.destinations;
					this.Terrasoft.each(destinations, function(destination) {
						if (destination.schemaUId !== rootSchema.uId) {
							return;
						}
						var rootSchemaColumn = rootSchema.getColumnByName(destination.columnName);
						var columnMappingItem = this.createColumn(rootSchemaColumn);
						var id = columnMappingItem.get("Id");
						collection.add(id, columnMappingItem);
						if (destination.isKey) {
							var selectedRowIds = this.get("SelectedRows");
							selectedRowIds.push(id);
							this.set("SelectedRows", this.Terrasoft.deepClone(selectedRowIds));
						}
					}, this);
				}, this);
			},

			/**
			 * Initializes import parameters.
			 * @private
			 * @param {Object} response Server response.
			 * @param {Array} response.Columns Import columns.
			 * @param {String} response.RootSchemaName Root schema name.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Callback execution scope.
			 */
			initImportParameters: function(response, callback, scope) {
				this.Terrasoft.require([response.RootSchemaName], function(schema) {
					this.set("RootSchema", schema);
					this.addRootSchemaColumns(response.Columns);
					callback.call(scope);
				}, this);
			},

			/**
			 * Initialize key columns.
			 * @private
			 */
			initKeyColumns: function() {
				var gridData = this.get("GridData");
				var selectedRows = this.get("SelectedRows");
				gridData.each(function(row) {
					var destinationColumnName = row.get("ColumnName");
					var destination = this.findDestinationByName(destinationColumnName);
					var rowId = row.get("Id");
					destination.isKey = (selectedRows.indexOf(rowId) !== -1);
				}, this);
			},

			/**
			 * Finds destination by name.
			 * @private
			 * @param {String} destinationColumnName Destination column name.
			 * @return {Object} Found destination.
			 */
			findDestinationByName: function(destinationColumnName) {
				var columns = this.get("Columns");
				var foundDestination = null;
				this.Terrasoft.each(columns, function(column) {
					this.Terrasoft.each(column.destinations, function(destination) {
						if (destination.columnName === destinationColumnName) {
							foundDestination = destination;
						}
						return this.Ext.isEmpty(foundDestination);
					}, this);
					return this.Ext.isEmpty(foundDestination);
				}, this);
				return foundDestination;
			},

			/**
			 * Starts import of the uploaded file.
			 * @private
			 * @param {Function} [callback] Callback.
			 * @param {Object} [scope] Callback execution scope.
			 */
			startImport: function(callback, scope) {
				var config = {
					contractName: "Import",
					importSessionId: this.get("ImportSessionId")
				};
				this.sendRequest(config, function(response) {
					if (!response.success) {
						this.logRequestError(response.errorInfo);
						return;
					}
					if (callback) {
						callback.call(scope || this, response);
					}
				}, this);
			},

			_validateImportParameters: function(callback, scope) {
				var config = {
					contractName: "Validate",
					serviceName: "FileImportValidationService",
					importSessionId: this.get("ImportSessionId")
				};
				this.sendRequest(config, function(response) {
					if (!response.success && this.isNotEmpty(response.errorInfo)) {
						this.logRequestError(response.errorInfo);
						return;
					}
					Ext.callback(callback, scope || this, [response.CanUseImportEntitiesStorage]);
				}, this);
			},

			/**
			 * @private
			 */
			_isNeedLookDuplicates: function() {
				return this.isNotEmpty(this.get("SelectedRows"));
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepPage#getSavingResult
			 * @overridden
			 */
			getSavingResult: function(wizardInfo) {
				this.initKeyColumns();
				var columns = this.get("Columns");
				this.setColumnsMappingParameters(columns, function(response) {
					if (!response.success) {
						this.logRequestError(response.errorInfo);
						return;
					}
					if (wizardInfo.newStepIndex < wizardInfo.currentStepIndex) {
						this.sandbox.publish("SavingResult", true, [this.sandbox.id]);
						return;
					}
					if (this.getIsFeatureEnabled("HighestSpeedFileImport")) {
						this.validate(this.onValidationSuccess, this.onValidationFailed, this);
					} else {
						this.startImport(this.onImportStarted, this);
					}
				}, this);
				return false;
			},

			/**
			 * Executed when import started.
			 * @protected
			 */
			onImportStarted: function() {
				this.sandbox.publish("SavingResult", true, [this.sandbox.id]);
			},

			/**
			 * Executed when successful validation.
			 * @protected
			 * @param {Object} [scope] Callback execution scope.
			 */
			onValidationSuccess: function(scope) {
				this.startImport(this.onImportStarted, scope || this);
			},

			/**
			 * Executed when failed validation.
			 * @protected
			 * @param {Object} [scope] Callback execution scope.
			 */
			onValidationFailed: function(scope) {
				var buttonsConfig = this._getValidationFailedButtons();
				var caption = this.getCaptionConfirmationDialog();
				this.showConfirmationDialog(caption, function(result) {
					if (result === "ProceedToImportSlow") {
						this.onValidationSuccess(scope || this);
					}
				}, buttonsConfig);
			},

			/**
			 * Validate key columns settings.
			 * @param {Function} [successCallback] Executed when successful validation callback.
			 * @param {Function} [failedCallback]  Executed when failed validation callback.
			 * @param {Object} [scope] Callback execution scope.
			 */
			validate: function(successCallback, failedCallback, scope) {
				this._validateImportParameters(function(canUseImportEntitiesStorage) {
					var isNeedLookDuplicates = this._isNeedLookDuplicates();
					if (!isNeedLookDuplicates || canUseImportEntitiesStorage) {
						Ext.callback(successCallback, scope);
					} else {
						Ext.callback(failedCallback, scope);
					}
				}, this);
			},

			/**
			 * Get caption for confirmation import dialog.
			 * @protected
			 * @return {String} Caption for confirmation import dialog.
			 */
			getCaptionConfirmationDialog: function() {
				var caption = this.get("Resources.Strings.KeyColumnValidationFailedMessage");
				caption = Ext.String.format(caption, this.$SelectedRows.length);
				return caption;
			},

			_getValidationFailedButtons: function() {
				const buttons = [];
				var backButton = Terrasoft.getBlueButtonConfig("cancel",
						this.get("Resources.Strings.BackToColumnSettingsButtonCaption"));
				const changeSettingButton = Terrasoft.getButtonConfig("ProceedToImportSlow",
						this.get("Resources.Strings.NextButtonCaption"));
				buttons.push(backButton, changeSettingButton);
				return buttons;
			},

			/**
			 * Creates viewModel of schema column for duplicates search.
			 * @protected
			 * @param {Object} rootSchemaColumn Root schema column configuration.
			 * @param {String} rootSchemaColumn.name Column name.
			 * @param {String} rootSchemaColumn.caption Column caption.
			 * @return {Terrasoft.BaseViewModel}
			 */
			createColumn: function(rootSchemaColumn) {
				return this.Ext.create("Terrasoft.BaseViewModel", {
					columns: {
						"Id": {
							dataValueType: Terrasoft.DataValueType.GUID
						},
						"ColumnName": {
							dataValueType: Terrasoft.DataValueType.TEXT
						},
						"ColumnCaption": {
							dataValueType: Terrasoft.DataValueType.TEXT
						}
					},
					values: {
						"Id": this.Terrasoft.generateGUID(),
						"ColumnName": rootSchemaColumn.name,
						"ColumnCaption": rootSchemaColumn.caption
					}
				});
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc
			 * @overridden
			 */
			init: function(callback, scope) {
				this.set("GridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				this.set("SelectedRows", []);
				this.showBodyMask();
				this.callParent([
					function() {
						this.getImportParameters(function(response) {
							this.initImportParameters(response, function() {
								this.hideBodyMask();
								Ext.callback(callback, scope);
							}, this);
						}, this);
					}, this
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
			 * @overridden
			 */
			destroy: function() {
				this.callParent(arguments);
			}

			//endregion
		},
		diff: [
			{
				"operation": "merge",
				"name": "HeaderContainer",
				"values": {
					"classes": {
						"wrapClassName": ["header-container", "duplicates"]
					}
				}
			},
			{
				"operation": "merge",
				"name": "CenterContainer",
				"values": {
					"classes": {
						"wrapClassName": ["center-container", "duplicates"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "DuplicateColumnsControlGroup",
				"parentName": "CenterContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {"bindTo": "Resources.Strings.DuplicateColumnsGroupHeader"},
					"items": [],
					"tools": [],
					"classes": {
						"wrapClass": ["duplicate-columns-group-wrap", "detail"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "DuplicateColumnsGrid",
				"parentName": "DuplicateColumnsControlGroup",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"listedZebra": true,
					"itemType": this.Terrasoft.ViewItemType.GRID,
					"type": "listed",
					"primaryDisplayColumnName": "ColumnCaption",
					"activeRow": {bindTo: "ActiveRow"},
					"selectedRows": {bindTo: "SelectedRows"},
					"multiSelect": true,
					"columnsConfig": [
						{
							cols: 8,
							key: {
								name: "ColumnCaption",
								bindTo: "ColumnCaption",
								type: "text"
							}
						}
					],
					"captionsConfig": [
						{
							cols: 8,
							name: "EmptyCaption"
						}
					],
					"isEmpty": {"bindTo": "IsGridEmpty"},
					"isLoading": {"bindTo": "IsGridLoading"},
					"collection": {"bindTo": "GridData"}
				}
			}
		]
	};
});


