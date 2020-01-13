Terrasoft.configuration.Structures["CampaignBaseCrudObjectPage"] = {innerHierarchyStack: ["CampaignBaseCrudObjectPage"], structureParent: "BaseCampaignSchemaElementPage"};
define('CampaignBaseCrudObjectPageStructure', ['CampaignBaseCrudObjectPageResources'], function(resources) {return {schemaUId:'79082aef-7c22-4089-ba3e-9ac18b396240',schemaCaption: "Campaign base CRUD object page", parentSchemaName: "BaseCampaignSchemaElementPage", schemaName:'CampaignBaseCrudObjectPage',parentSchemaUId:'13b73e23-fb4d-41fb-850b-0f4ae4c3e9f1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignBaseCrudObjectPage", ["CampaignBaseCrudObjectPageResources", "BaseParameterListItemViewModel",
		"StringParameterListItemViewModel", "BooleanParameterListItemViewModel", "DateTimeParameterListItemViewModel",
		"LookupParameterListItemViewModel", "EntityColumnLookupMixin", "ParameterListMixin"], function(resources) {
	return {
		mixins: {
			entityColumnLookupMixin: Terrasoft.EntityColumnLookupMixin,
			parameterListMixin: Terrasoft.ParameterListMixin
		},
		messages: {
			/**
			 * @message GetColumnsLookupInfo
			 * Gets selected columns for lookup page.
			 */
			"GetColumnsLookupInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SetColumnsLookupInfo
			 * Sets selected columns from lookup page.
			 */
			"SetColumnsLookupInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * Collection of allowed entity schema models to select.
			 * @protected
			 * @type {Terrasoft.Collection}
			 */
			"EntitySchemaList": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Selected entity lookup item.
			 * @protected
			 * @type {{value: String, displayValue: String}}
			 */
			"SelectedEntity": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			/**
			 * Selected entity columns values.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			"EntityColumnValues": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Ext.create("Terrasoft.BaseViewModelCollection")
			},

			/**
			 * Collection of allowed entity columns.
			 * @type {Terrasoft.Collection}
			 */
			"EntityColumns": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Flag that indicates columns container visibility.
			 * @type {Boolean}
			 */
			"EntityColumnsVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		methods: {

			/**
			 * Subscribes on page attribute events.
			 * @private
			 */
			_subscribeOnEvents: function() {
				this.on("change:SelectedEntity", this.onSelectedEntityChanged, this);
				this.on("removeparameter", this.onColumnRemove, this);
			},

			/**
			 * Async method to load allowed entities collection.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			_getAllowedEntitySchemas: function(callback, scope) {
				var esq = this.getAllowedObjectsESQ();
				esq.getEntityCollection(function(response) {
					if (response.success) {
						callback.call(scope, response.collection);
					}
				}, this);
			},

			/**
			 * Returns item for lookup collection.
			 * @private
			 * @param {Terrasoft.BaseModel} entity Model of allowed entity schema.
			 * @returns {Object} Lookup item model.
			 */
			_createEntitySchemaLookupItem: function(entity) {
				return {
					value: entity.$EntityName,
					displayValue: entity.$Caption,
					columns: entity.$Columns,
					restrictedColumns: entity.$RestrictedColumns,
					contactColumn: entity.$ContactColumnPath
				};
			},

			/**
			 * Inits SelectedEntity attribute.
			 * @private
			 * @param {String} name Name of selected entity.
			 */
			_initSelectedEntity: function(name) {
				this.$SelectedEntity = this.$EntitySchemaList.find(name);
			},

			/**
			 * Returns selected entity name.
			 * @private
			 */
			_getSelectedEntityName: function() {
				return this.$SelectedEntity && this.$SelectedEntity.value;
			},

			/**
			 * Gets list of entity schema columns.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			_getEntitySchemaColumns: function(callback, scope) {
				Terrasoft.PackageManager.getCustomPackageUId(function(packageUId) {
					var entityName = this._getSelectedEntityName();
					var item = Terrasoft.EntitySchemaManager.findItemByName(entityName);
					var config = {
						schemaUId: item.uId,
						packageUId: packageUId
					};
					Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(instance) {
						callback.call(scope, instance.columns);
					}, scope);
				}, scope);
			},

			/**
			 * Inits selected columns values.
			 * @private
			 * @param {String} columnValuesJson Configured column values json.
			 */
			_initColumnValues: function(columnValuesJson) {
				var values = new Terrasoft.BaseViewModelCollection();
				var columnValues = Terrasoft.decode(columnValuesJson);
				Terrasoft.each(columnValues, function(columnValue) {
					var columnId = columnValue.columnUId;
					var column = this.$EntityColumns.find(columnId);
					if (column) {
						column.value = columnValue.value;
						column.hasMacrosValue = columnValue.hasMacrosValue;
						var listItem = this.createParameterListItemViewModel(column);
						values.add(columnId, listItem);
						column.selected = true;
					}
				}, this);
				this.$EntityColumnValues.clear();
				this.$EntityColumnValues.loadAll(values);
			},

			/**
			 * Returns true for columns that are allowed to be selected.
			 * @private
			 * @param {String} name Column name to check.
			 * @returns {Boolean} Check result. True when column allowed.
			 */
			_isColumnAllowed: function(name) {
				if (this.$SelectedEntity.contactColumn === name) {
					return false;
				}
				var allowedColumns = this.$SelectedEntity.columns.split(",").map(function(value) {
					return Ext.String.trim(value);
				});
				var notAllowedColumns = this.$SelectedEntity.restrictedColumns
					&& this.$SelectedEntity.restrictedColumns.split(",").map(function(value) {
						return Ext.String.trim(value);
					})
					|| [];
				return (Ext.Array.contains(allowedColumns, "*") || Ext.Array.contains(allowedColumns, name))
					&& !Ext.Array.contains(notAllowedColumns, name);
			},

			/**
			 * Reloads initialized collection of allowed entity columns.
			 * @private
			 */
			_reloadEntityColumns: function() {
				this.$EntityColumnValues.clear();
				if (this.$EntityColumns) {
					this.$EntityColumnsVisible = false;
					this.initEntityColumns(Terrasoft.emptyFn, this);
				}
			},

			/**
			 * Reloads column values list for selected columns by column UId.
			 * @private
			 * @param {Array} columnUIds Selected column unique identifier.
			 */
			_reloadEntityColumnValues: function(columnUIds) {
				var entityColumnValues = new Terrasoft.BaseViewModelCollection();
				Terrasoft.each(columnUIds, function(columnUId) {
					var entityColumnValue = this._getColumnValueViewModel(columnUId);
					entityColumnValues.add(columnUId, entityColumnValue);
				}, this);
				this.$EntityColumnValues.clear();
				this.$EntityColumnValues.loadAll(entityColumnValues);
			},

			/**
			 * Returns column value view model for selected column by column UId.
			 * @private
			 * @param {String} columnUId Selected column unique identifier.
			 * @returns {Terrasoft.BaseParameterListItemViewModel} Column value view model.
			 */
			_getColumnValueViewModel: function(columnUId) {
				var existingColumnValue = this.$EntityColumnValues.find(columnUId);
				if (existingColumnValue) {
					return existingColumnValue;
				}
				return this._createEntityColumnValueViewModel(columnUId);
			},

			/**
			 * Sets entity columns selected by column UId.
			 * @private
			 * @param {Array} columnUIds Selected column unique identifier.
			 */
			_setSelectedEntityColumns: function(columnUIds) {
				Terrasoft.each(this.$EntityColumns, function(column) {
					column.selected = columnUIds.indexOf(column.id) !== -1;
				}, this);
			},

			/**
			 * Creates column value view model with empty value for column by UId.
			 * @private
			 * @param {String} columnUId Column unique identifier.
			 * @returns {Terrasoft.BaseParameterListItemViewModel} Column value view model.
			 */
			_createEntityColumnValueViewModel: function(columnUId) {
				var column = this.$EntityColumns.get(columnUId);
				return this.createParameterListItemViewModel(column);
			},

			/**
			 * Subscribes on SetColumnsLookupInfo lookup page sandbox message.
			 * @private
			 */
			_subscribeOnColumnsSelected: function() {
				var schemaName = "EntityColumnLookupPage";
				var pageId = this.sandbox.id + schemaName;
				this.sandbox.subscribe("SetColumnsLookupInfo", this.onColumnsSelected, this, [pageId]);
			},

			/**
			 * Shows message box.
			 * @private
			 * @param {String} caption Message box caption.
			 * @param {String} message Text of the message.
			 * @param {Function} resolve Resolve function.
			 * @param {Function} reject Reject function.
			 * @param {Object} scope Context.
			 */
			_showWarningMessage: function(caption, message, resolve, reject, scope) {
				var buttons = [Terrasoft.MessageBoxButtons.YES, Terrasoft.MessageBoxButtons.CANCEL];
				var handler = function(returnCode) {
					if (returnCode === "yes") {
						resolve.call(scope);
					}
					if (returnCode === "cancel") {
						reject.call(scope);
					}
				};
				this.showMessageBox(caption, message, buttons, handler, scope);
			},

			/**
			 * Shows message box with warning for changing entity.
			 * @private
			 * @param {Object} value Current SelectedEntity object.
			 */
			_showChangeEntityWarning: function(value) {
				this.isEntitySelectLocked = true;
				var caption = resources.localizableStrings.ChangeObjectQuestion;
				var message = resources.localizableStrings.ChangeObjectMessage;
				this._showWarningMessage(caption, message, function() {
					this.isEntitySelectLocked = false;
					this._reloadEntityColumns();
				}, function() {
					this.$SelectedEntity = value;
				}, this);
			},

			/**
			 * Returns True if there is selected entity and entity columns are loaded.
			 * @private
			 * @returns {Boolean} Visibility state.
			 */
			isColumnValuesVisible: function() {
				return Boolean(this.$SelectedEntity && this.$EntityColumnsVisible);
			},

			/**
			 * Validates SelectedEntity column.
			 * If entity is not selected returns result with invalid validation message.
			 * @protected
			 * @param {Object} entity Entity lookup object.
			 * @return {Object} Validation info.
			 */
			validateSelectedEntity: function(entity) {
				var result = { invalidMessage: "" };
				if (Ext.isEmpty(entity)) {
					var message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					result.invalidMessage = message;
				}
				return result;
			},

			/**
			 * Validates EntityColumnValues column.
			 * If column values are not valid returns result with invalid validation message.
			 * @protected
			 * @param {Object} columnValues Selected column values.
			 * @return {Object} Validation info.
			 */
			validateColumnValues: function(columnValues) {
				var result = { invalidMessage: "" };
				var invalidValue = columnValues.findByFn(function(column) {
					var values = column.validationInfo.values();
					return values.find(function(item){
						return item.isValid === false;
					});
				});
				if (invalidValue) {
					var message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					result.invalidMessage = message;
				}
				return result;
			},

			/**
			 * Returns name of lookup entity for allowed objects.
			 * @protected
			 * @returns {String}
			 */
			getEntitySchemaLookupName: Terrasoft.emptyFn,

			/**
			 * Returns esq to select allowed objects.
			 * @protected
			 * @returns {Terrasoft.EntitySchemaQuery} ESQ.
			 */
			getAllowedObjectsESQ: function() {
				var esq = new Terrasoft.EntitySchemaQuery({
					rootSchemaName: this.getEntitySchemaLookupName()
				});
				esq.addColumn("Caption");
				esq.addColumn("EntityName");
				esq.addColumn("Columns");
				esq.addColumn("RestrictedColumns");
				esq.addColumn("ContactColumnPath");
				return esq;
			},

			/**
			 * Handler to prepare list of allowed entities.
			 * @protected
			 * @param {String} filter Filter condition.
			 * @param {Terrasoft.Collection} list Current collection.
			 */
			onPrepareEntitySchemaList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.$EntitySchemaList);
			},

			/**
			 * Handler on SelectedEntity attribute change.
			 * @protected
			 * @param {Object} model Current SelectedEntity object.
			 * @param {String} value New selected value.
			 */
			onSelectedEntityChanged: function(model) {
				var selectedColumnsCount = this.$EntityColumnValues.getCount();
				if (!selectedColumnsCount) {
					this._reloadEntityColumns();
					return;
				}
				var prevValue = model._previousAttributes.SelectedEntity;
				if (prevValue && !this.isEntitySelectLocked) {
					this._showChangeEntityWarning(prevValue);
				} else {
					this.isEntitySelectLocked = false;
				}
			},

			/**
			 * Handler on lookup columns selected event.
			 * Merges EntityColumnValues with selected columns.
			 * @protected
			 * @param {Object} selectedItemsInfo Selected lookup items info.
			 */
			onColumnsSelected: function(selectedItemsInfo) {
				var columnUIds = selectedItemsInfo && selectedItemsInfo.selectedRows || [];
				this._setSelectedEntityColumns(columnUIds);
				this._reloadEntityColumnValues(columnUIds);
				this.closeSchemaColumnSelectPage();
			},

			/**
			 * Handler for column remove event.
			 * @protected
			 * @param {String} columnUId Identifier of column to remove.
			 */
			onColumnRemove: function(columnUId) {
				this.$EntityColumnValues.removeByKey(columnUId);
				var column = this.$EntityColumns.get(columnUId);
				column.selected = false;
			},

			/**
			 * Handler for add entity column click.
			 * @protected
			 */
			onAddEntityColumn: function() {
				this.mixins.entityColumnLookupMixin.showEntitySchemaColumnSelectPage.call(this, this.$EntityColumns);
			},

			/**
			 * Generates configuration view of the element.
			 * @protected
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 * @param {Terrasoft.BaseParameterListItemViewModel} item Parameter list item.
			 * @returns {Object} Configuration of entity column in ContainerList.
			 */
			getEntityColumnViewConfig: function(itemConfig, item) {
				if (Ext.isFunction(item.getViewConfig)) {
					itemConfig.config = item.getViewConfig();
				}
				return itemConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents(
					/**
					 * @event removeparameter
					 * Event for remove parameter click.
					 */
					"removeparameter"
				);
				this._subscribeOnEvents();
				this._subscribeOnColumnsSelected();
			},

			/**
			 * Inits collection of allowed entity schemas.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			initEntitySchemaList: function(callback, scope) {
				this._getAllowedEntitySchemas(function(entities) {
					var collection = new Terrasoft.Collection();
					Terrasoft.each(entities.sort("$Caption", Terrasoft.OrderDirection.ASC), function(entity) {
						var schema = this._createEntitySchemaLookupItem(entity);
						collection.add(schema.value, schema);
					}, this);
					this.$EntitySchemaList = collection;
					callback.call(scope);
				}, this);
			},

			/**
			 * Inits collection of configured column values.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			initEntityColumns: function(callback, scope) {
				var collection = new Terrasoft.Collection();
				this.$EntityColumns = collection;
				if (this.$SelectedEntity && this.$SelectedEntity.columns) {
					this.loadPropertiesPageMask();
					this._getEntitySchemaColumns(function(columns) {
						Terrasoft.each(columns, function(column) {
							if (column.usageType === Terrasoft.EntitySchemaColumnUsageType.General
									&& this._isColumnAllowed(column.name)) {
								var entityColumn = {
									id: column.uId,
									name: column.name,
									caption: column.caption.getValue(),
									dataValueType: column.dataValueType,
									isRequired: column.isRequired,
									referenceSchemaUId: column.referenceSchemaUId,
									selected: false
								};
								collection.add(column.uId, entityColumn);
							}
						}, this);
						collection.sort("caption");
						this.$EntityColumnsVisible = true;
						this.hideBodyMask();
						callback.call(scope);
					}, scope);
				}
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters
			 * @override
			 */
			initParameters: function(element) {
				Terrasoft.chain(
					function(next) {
						this.initEntitySchemaList(next, this);
					},
					function(next) {
						this.$EntityColumnValues && this.$EntityColumnValues.clear();
						this._initSelectedEntity(element.entityName);
						this.initEntityColumns(next, this);
					},
					function() {
						this._initColumnValues(element.columnValues);
					},
					this
				);
			},

			/**
			 * Returns serialized collection of selected column values.
			 * @protected
			 * @returns {String} Serialized selected column values.
			 */
			getSelectedColumnValues: function() {
				var columnValues = [];
				if (this.$EntityColumnValues) {
					columnValues = this.$EntityColumnValues.getItems().map(function(item) {
						return {
							columnUId: item.$Id,
							value: item.getParameterValue(),
							hasMacrosValue: item.$HasMacrosValue
						};
					});
				}
				return Terrasoft.encode(columnValues);
			},

			/**
			 * @inheritdoc ProcessBaseEventPropertiesPage#setValidationConfig
			 * @overriden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("SelectedEntity", this.validateSelectedEntity);
				this.addColumnValidator("EntityColumnValues", this.validateColumnValues);
			},

			/**
			 * @inheritdoc BaseCampaignSchemaElementPage#saveValues
			 * @override
			 */
			saveValues: function() {
				var element = this.$ProcessElement;
				element.entityName = this._getSelectedEntityName();
				element.columnValues = this.getSelectedColumnValues();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.un("change:SelectedEntity", this.onSelectedEntityChanged, this);
				this.sandbox.unRegisterMessages();
				this.callParent(arguments);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ContentContainer",
				"propertyName": "items",
				"parentName": "EditorsContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EntitySchemaTextLabel",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 22
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.EntitySchemaLabelText",
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"name": "EntitySchemaInformationButton",
				"values": {
					"layout": {"column": 22, "row": 0, "colSpan": 1},
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": "$Resources.Strings.EntitySchemaHintMessage",
					"controlConfig": {
						"classes": {
							"wrapperClass": "t-checkbox-information-button"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SelectedEntity",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"values": {
					"contentType": this.Terrasoft.ContentType.ENUM,
					"isRequired": true,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"],
					"visible": true,
					"controlConfig": {
						"prepareList": "$onPrepareEntitySchemaList"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ColumnValuesContainer",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": "$isColumnValuesVisible"
				}
			},
			{
				"operation": "insert",
				"name": "ColumnValuesLabel",
				"parentName": "ColumnValuesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.ColumnValuesLabelText",
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AddEntityColumnButton",
				"parentName": "ColumnValuesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "$Resources.Strings.AddEntityColumnButtonCaption",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": "$Resources.Images.AddButtonImage",
					"classes": {
						"wrapperClass": ["add-entity-column-button"]
					},
					"click": "$onAddEntityColumn"
				}
			},
			{
				"operation": "insert",
				"name": "ObjectColumnValuesContainer",
				"parentName": "ColumnValuesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ContainerList",
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "EntityColumnValues",
					"onGetItemConfig": "getEntityColumnViewConfig",
					"itemPrefix": "CampaignBaseCrudObjectElement",
					"classes": {
						"wrapClassName": ["entity-column-values-container"]
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


