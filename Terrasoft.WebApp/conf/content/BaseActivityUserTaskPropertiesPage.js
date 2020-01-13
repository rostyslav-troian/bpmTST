Terrasoft.configuration.Structures["BaseActivityUserTaskPropertiesPage"] = {innerHierarchyStack: ["BaseActivityUserTaskPropertiesPage"], structureParent: "BaseUserTaskPropertiesPage"};
define('BaseActivityUserTaskPropertiesPageStructure', ['BaseActivityUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'29d2ae27-fd0e-4847-acbc-58d964011393',schemaCaption: "Base properties page of activity user task", parentSchemaName: "BaseUserTaskPropertiesPage", schemaName:'BaseActivityUserTaskPropertiesPage',parentSchemaUId:'824a1fba-a081-4d8a-940c-6c258c298687',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseUserTaskPropertiesPage
 */
define("BaseActivityUserTaskPropertiesPage", [
	"terrasoft", "BaseActivityUserTaskPropertiesPageResources", "Activity", "ext-base", "ProcessLookupPageMixin"
], function(Terrasoft, resources, activityEntitySchema, Ext) {
	return {
		messages: {},
		mixins: {
			processLookupPageMixin: "Terrasoft.ProcessLookupPageMixin"
		},
		attributes: {
			/**
			 * Activity connection view models.
			 */
			"ActivityConnectionViewModels": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true,
				value: this.Ext.create("Terrasoft.ObjectCollection")
			},
			/**
			 * Entity connections.
			 */
			"EntityConnections": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#initParameters
			 * @overridden
			 */
			initParameters: function() {
				this.callParent(arguments);
				var viewModels = this.get("ActivityConnectionViewModels");
				viewModels.clear();
				this.initActivityUserTaskStore();
				this.onInitActivityConnection();
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#onElementDataLoad
			 * @overridden
			 */
			onElementDataLoad: function() {
				var parentArguments = arguments;
				var parentMethod = this.getParentMethod();
				Terrasoft.EntitySchemaManager.initialize(function() {
					this.loadEntityConnectionColumns(function(entityConnections) {
						this.set("EntityConnections", entityConnections);
						parentMethod.apply(this, parentArguments);
					}, this);
				}, this);
			},

			/**
			 * @inheritDoc BaseProcessSchemaElementPropertiesPage#saveParameters
			 * @protected
			 * @overridden
			 */
			saveParameters: function(element) {
				this.callParent(arguments);
				this.saveActivityConnectionParameters(element);
			},

			//endregion

			//region Methods: Private

			/**
			 * @private
			 */
			_cretateDynamicParameter: function(connection, column, element) {
				const parameter = new Terrasoft.DynamicProcessSchemaParameter({
					uId: connection.id,
					caption: new Terrasoft.LocalizableString(connection.caption),
					createdInSchemaUId: element.parentSchema.uId,
					modifiedInSchemaUId: element.parentSchema.uId,
					name: connection.name,
					dataValueType: column.dataValueType,
					sourceValue: {source: Terrasoft.ProcessSchemaParameterValueSource.None}
				});
				if (column.isLookup) {
					const managerItem =
						Terrasoft.EntitySchemaManager.findRootSchemaItemByName(column.referenceSchemaName);
					parameter.referenceSchemaUId = managerItem.uId;
					parameter.sourceValue.referenceSchemaUId = managerItem.uId;
				}
				parameter.processFlowElementSchema = element;
				return parameter;
			},

			/**
			 * @private
			 */
			_findActivityConnectionParameter: function(element, connection) {
				let parameter = element.findParameterByName(connection.name) ||
					element.findParameterByUId(connection.id);
				if (parameter) {
					return parameter;
				}
				const column = this.findActivityColumnByUId(connection.id);
				if (column) {
					parameter = this._cretateDynamicParameter(connection, column, element);
					element.parameters.add(parameter.uId, parameter);
					return parameter;
				}
				return null;
			},

			/**
			 * Creates controls for editing connections parameter.
			 * @protected
			 */
			onInitActivityConnection: function() {
				const entityConnections = this.get("EntityConnections");
				const processElement = this.get("ProcessElement");
				let shownCount = 0;
				entityConnections.each(function(item) {
					let parameter = this._findActivityConnectionParameter(processElement, item);
					if (parameter) {
						var visible = this.getShowConnectionControl(parameter, processElement.uId);
						if (visible) {
							shownCount++;
						}
						this.addConnectionParameterViewModel(parameter, visible);
					}
				}, this);
				const visibleControls = this.getActivityConnectionsFromStore(processElement.uId);
				if (shownCount === 0 && !visibleControls) {
					this.showDefaultConnectionControls();
				}
			},

			/**
			 * Save connection parameters.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			saveActivityConnectionParameters: function(element) {
				var viewModels = this.get("ActivityConnectionViewModels");
				var elementParameters = element.parameters;
				var visibleControls = [];
				viewModels.each(function(viewModel) {
					var uId = viewModel.get("UId");
					var parameter = elementParameters.get(uId);
					var parameterValue = viewModel.get("Value");
					if (viewModel.get("Visible")) {
						visibleControls.push(parameter.name);
					}
					parameter.setMappingValue(parameterValue);
				}, this);
				this.setActivityConnectionsToStore(element.uId, visibleControls);
			},

			/**
			 * Adds view model for editing connections parameter.
			 * @private
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
			 * @param {Boolean} visible If 'true' is visible control.
			 */
			addConnectionParameterViewModel: function(parameter, visible) {
				var viewModels = this.get("ActivityConnectionViewModels");
				var viewModel = this.createConnectionParameterViewModel(parameter, visible);
				viewModels.add(parameter.name, viewModel);
			},

			/**
			 * Shows default controls for editing connections parameter.
			 * @private
			 */
			showDefaultConnectionControls: function() {
				this.showConnectionControl("Account");
				this.showConnectionControl("Contact");
			},

			/**
			 * Shows control for editing connections parameter.
			 * @private
			 */
			showConnectionControl: function(name) {
				var viewModels = this.get("ActivityConnectionViewModels");
				var viewModel = viewModels.get(name);
				viewModel.set("Visible", true);
			},

			/**
			 * Checks whether to show control for editing connection parameter.
			 * @private
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
			 * @param {Guid} processElementUId Unique identifier of the process element.
			 * @return {Boolean} If showed - true, otherwise - false.
			 */
			getShowConnectionControl: function(parameter, processElementUId) {
				var value = parameter.getValue();
				var show = !Ext.isEmpty(value);
				var visibleControls = this.getActivityConnectionsFromStore(processElementUId) || [];
				show = show || (visibleControls.indexOf(parameter.name) > -1);
				return show;
			},

			/**
			 * Returns EntitySchemaQuery for schema EntityConnection.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getEntityConnectionSchemaQuery: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "EntityConnection",
					clientESQCacheParameters: {
						cacheItemName: activityEntitySchema.uId + "_" + this.name
					}
				});
				esq.addColumn("ColumnUId");
				esq.addColumn("Position");
				esq.filters.addItem(esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysEntitySchemaUId", activityEntitySchema.uId));
				return esq;
			},

			/**
			 * Loads entity connection columns.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			loadEntityConnectionColumns: function(callback, scope) {
				var entityConnectionColumns = Ext.create("Terrasoft.Collection");
				var esq = this.getEntityConnectionSchemaQuery();
				esq.getEntityCollection(function(result) {
					if (result.success) {
						var entities = result.collection;
						entities.each(function(item) {
							var columnUId = item.get("ColumnUId");
							var entityColumn = this.findActivityColumnByUId(columnUId);
							if (!entityColumn || entityConnectionColumns.contains(entityColumn.name)) {
								return true;
							}
							var position = item.get("Position");
							entityConnectionColumns.add(entityColumn.name,
								{
									id: entityColumn.uId,
									name: entityColumn.name,
									caption: entityColumn.caption,
									position: position
								});
						}, this);
						this.sortEntityConnections(entityConnectionColumns);
						this.addProjectConnection(entityConnectionColumns);
					}
					callback.call(scope, entityConnectionColumns);
				}, this);
			},

			/**
			 * Finds column by unique identifier in Activity.
			 * @private
			 * @param {String} columnUId Unique identifier.
			 * @return {*|Terrasoft.EntitySchemaColumn}
			 */
			findActivityColumnByUId: function(columnUId) {
				return activityEntitySchema.findColumnByUId(columnUId);
			},

			/**
			 * Adds project connection if entity connections does not contains project and Activity has project.
			 * @private
			 * @param {Terrasoft.Collection} entityConnections Entity connections.
			 */
			addProjectConnection: function(entityConnections) {
				var project = activityEntitySchema.columns.Project;
				if (project && !entityConnections.contains(project.name)) {
					entityConnections.add(project.name, {
						id: project.uId,
						name: project.name,
						caption: project.caption,
						position: 0
					});
				}
			},

			/**
			 * Sorts entity connections.
			 * @private
			 * @param {Terrasoft.Collection} entityConnectionColumns Entity connections.
			 * @return {Boolean}
			 */
			sortEntityConnections: function(entityConnectionColumns) {
				entityConnectionColumns.sort(null, null, function(item1, item2) {
					var position1 = item1.position;
					var position2 = item2.position;
					if (position1 === position2) {
						var caption1 = item1.caption;
						var caption2 = item2.caption;
						return caption1.localeCompare(caption2);
					}
					return (position1 > position2);
				});
			},

			/**
			 * Open lookup activity connection window handler.
			 * @private
			 */
			openLookupActivityConnectionWindow: function() {
				var entityColumns = this.getDataConnections();
				this.addSubscriptionsToParametersInfo();
				this.showEntitySchemaColumnSelectPage(entityColumns);
			},

			/**
			 * Adds subscriptions  on SetParametersInfo.
			 * @private
			 */
			addSubscriptionsToParametersInfo: function() {
				var schemaName = "ProcessLookupPage";
				var pageId = this.sandbox.id + schemaName;
				this.sandbox.subscribe("SetParametersInfo", function(parametersInfo) {
					if (parametersInfo) {
						this.showActivityConnectionControls(parametersInfo.selectedRows);
					}
					this.closeSchemaColumnSelectPage();
				}, this, [pageId]);
			},

			/**
			 * Returns ModalBox  captions .
			 * @protected
			 */
			getModalBoxCaption: function() {
				return this.get("Resources.Strings.ProcessLookupPageCaption");
			},

			/**
			 * Returns data connections for ProcessLookupPage.
			 * @private
			 * @return {Terrasoft.Collection} Data connections.
			 */
			getDataConnections: function() {
				var entityConnections = Ext.create("Terrasoft.Collection");
				var viewModels = this.get("ActivityConnectionViewModels");
				viewModels.each(function(viewModel) {
					var id = viewModel.get("Id");
					var caption = viewModel.get("Caption");
					var selected = viewModel.get("Visible");
					entityConnections.add(id, {
						id: id,
						caption: caption,
						selected: selected
					});
				}, this);
				return entityConnections;
			},

			/**
			 * Creates connection parameter ViewModel.
			 * @private
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
			 * @param {Boolean} visible If 'true' is visible control.
			 * @return {Terrasoft.ProcessSchemaParameterViewModel}
			 */
			createConnectionParameterViewModel: function(parameter, visible) {
				var viewModel = this.createParameterViewModel(parameter);
				var toolsButtonMenu = viewModel.get("ParameterEditToolsButtonMenu");
				toolsButtonMenu.clear();
				var deleteMenuItem = this.getParameterEditToolsButtonDeleteMenuItem(parameter.name);
				toolsButtonMenu.add(deleteMenuItem);
				viewModel.set("Visible", visible);
				var elementId = Ext.String.format("{0}-{1}", viewModel.get("Name"), Terrasoft.generateGUID());
				viewModel.set("ElementId", elementId);
				viewModel.onParameterDeleteClick = this.onHideParameter;
				viewModel.validate();
				return viewModel;
			},

			/**
			 * Hides connection parameter view.
			 * @private
			 */
			onHideParameter: function() {
				this.set("Visible", false);
				this.clearParameterValue();
			},

			/**
			 * Shows or hides the controls for editing connections parameter.
			 * @private
			 * @param {Array} items Array identifiers selected connections.
			 */
			showActivityConnectionControls: function(items) {
				var viewModels = this.get("ActivityConnectionViewModels");
				viewModels.each(function(viewModel) {
					var id = viewModel.get("Id");
					var visible = items.indexOf(id) > -1;
					if (!visible) {
						viewModel.clearParameterValue();
					}
					viewModel.set("Visible", visible);
				}, this);
			},

			/**
			 * Generates a configuration connection parameter representation element.
			 * @private
			 * @param {Object} parameterConfig Link to the configuration element in the Container List.
			 */
			getConnectionParameterViewConfig: function(parameterConfig) {
				var parameterViewConfig = this.get("connectionParameterViewConfig");
				if (parameterViewConfig) {
					parameterConfig.config = parameterViewConfig;
					return;
				}
				parameterConfig.config = this.getContainerConfig("item", [], [
						this.getContainerConfig("item-view", ["parameter-ct"], [
							this.getContainerConfig("ParameterValueContainer", ["parameter-value-ct"], [
								this.getContainerConfig("ToolsContainer", ["tools-container-wrapClass"], [
									this.getContainerConfig("LabelWrap", ["label-container-wrapClass"], [
										this.getConnectionParameterLabelConfig()
									]),
									this.getContainerConfig("ToolsButtonWrap", ["tools-button-container-wrapClass"],
										[this.getParameterToolsButtonConfig("ConnectionParameterEditToolsButton")])
								]),
								this.getParameterMappingEditConfig()
							])
						], {bindTo: "Visible"})
					]
				);
				this.set("connectionParameterViewConfig", parameterConfig.config);
			},

			/**
			 * Returns label configuration for connection parameter.
			 * @private
			 */
			getConnectionParameterLabelConfig: function() {
				var config = {
					id: "Caption",
					className: "Terrasoft.Label",
					caption: {bindTo: "Caption"},
					isRequired: {bindTo: "IsRequired"},
					classes: {labelClass: ["t-label-proc", "t-label-proc-param"]}
				};
				return config;
			},

			/**
			 * Initializes storage of activity user task.
			 * @private
			 */
			initActivityUserTaskStore: function() {
				var storeConfig = {
					"levelName": "ActivityConnections",
					"type": "Terrasoft.MemoryStore",
					"isCache": false
				};
				if (Ext.isEmpty(Terrasoft.ActivityConnectionsStore)) {
					Terrasoft.StoreManager.registerStore(storeConfig);
				}
			},

			/**
			 * Returns array activity connections from storage.
			 * @private
			 * @param {Guid} processElementUId Unique identifier of the process element.
			 * @return {Array}
			 */
			getActivityConnectionsFromStore: function(processElementUId) {
				return Terrasoft.ActivityConnectionsStore.getItem(processElementUId);
			},

			/**
			 * Saves activity connections to storage.
			 * @private
			 * @param {Guid} processElementUId Unique identifier of the process element.
			 * @param {Array} activityConnections Activity connections.
			 */
			setActivityConnectionsToStore: function(processElementUId, activityConnections) {
				Terrasoft.ActivityConnectionsStore.setItem(processElementUId, activityConnections);
			},

			/**
			 * Returns flag that indicates if activity task is visible.
			 * @protected
			 * @return {boolean}
			 */
			getIsActivityTaskVisible: function() {
				return true;
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"name": "Recommendation",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "BaseActivityTaskContainer",
				"propertyName": "items",
				"parentName": "UserTaskContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "StartInLabel",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.StartInCaption"},
					"classes": {
						"labelClass": ["t-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "StartIn",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 14},
					"labelConfig": {
						"visible": false
					}
				}
			},
			{
				"operation": "insert",
				"name": "StartInPeriod",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 16, "row": 1, "colSpan": 8},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPreparePeriodList"
						}
					},
					"labelConfig": {
						"visible": false
					}
				}
			},
			{
				"operation": "insert",
				"name": "DurationLabel",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.DurationCaption"},
					"classes": {
						"labelClass": ["t-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "Duration",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 3, "colSpan": 14},
					"labelConfig": {
						"visible": false
					},
					"classes": {
						"labelClass": ["t-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "DurationPeriod",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 16, "row": 3, "colSpan": 8},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPreparePeriodList"
						}
					},
					"labelConfig": {
						"visible": false
					}
				}
			},
			{
				"operation": "insert",
				"name": "ShowInScheduler",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 4, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.ShowInSchedulerCaption"},
					"wrapClass": ["t-checkbox-control"]
				}
			},
			{
				"operation": "insert",
				"name": "ShowExecutionPage",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 5, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.ShowExecutionPageCaption"},
					"wrapClass": ["t-checkbox-control"]
				}
			},
			{
				"operation": "insert",
				"name": "useBackgroundMode",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 6, "colSpan": 24},
					"visible": {
						"bindTo": "canUseBackgroundProcessMode"
					},
					"wrapClass": ["t-checkbox-control"]
				}
			},
			{
				"operation": "insert",
				"name": "OwnerRegionLabel",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 7, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.OwnerRegionCaption"},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "OwnerId",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 8, "colSpan": 24},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "InformationOnStep",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 9, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.InformationOnStepCaption"},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "RemindBeforeLabel",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 10, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.RemindBeforeCaption"},
					"classes": {
						"labelClass": ["t-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "RemindBefore",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 11, "colSpan": 14},
					"labelConfig": {
						"visible": false
					},
					"classes": {
						"labelClass": ["t-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "RemindBeforePeriod",
				"parentName": "BaseActivityTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 16, "row": 11, "colSpan": 8},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPreparePeriodList"
						}
					},
					"labelConfig": {
						"visible": false
					}
				}
			},
			{
				"operation": "insert",
				"name": "ActivityConnectionTitleContainer",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["container-list-header"],
					"items": [],
					"visible": {
						"bindTo": "getIsActivityTaskVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ActivityConnectionLabel",
				"parentName": "ActivityConnectionTitleContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ActivityLinksCaption"},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AddActivityConnectionRecordButton",
				"parentName": "ActivityConnectionTitleContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
					"click": {"bindTo": "openLookupActivityConnectionWindow"}
				}
			},
			{
				"operation": "insert",
				"name": "ActivityConnection",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "ElementId",
					"onItemClick": {"bindTo": "onItemClick"},
					"collection": "ActivityConnectionViewModels",
					"onGetItemConfig": "getConnectionParameterViewConfig",
					"rowCssSelector": ".paramContainer",
					"classes": {"wrapClassName": ["activity-connection"]},
					"visible": {
						"bindTo": "getIsActivityTaskVisible"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


