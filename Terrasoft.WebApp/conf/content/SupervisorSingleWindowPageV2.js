Terrasoft.configuration.Structures["SupervisorSingleWindowPageV2"] = {innerHierarchyStack: ["SupervisorSingleWindowPageV2"], structureParent: "BaseModulePageV2"};
define('SupervisorSingleWindowPageV2Structure', ['SupervisorSingleWindowPageV2Resources'], function(resources) {return {schemaUId:'93d989d4-73de-4df3-bc94-8d3d08ef0b47',schemaCaption: "SupervisorSingleWindowPageV2", parentSchemaName: "BaseSectionPage", schemaName:'SupervisorSingleWindowPageV2',parentSchemaUId:'d7862464-6710-4c5c-b896-e8187803dd6e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SupervisorSingleWindowPageV2", ["ServiceHelper", "SupervisorSingleWindowPageV2Resources",
		"ConfigurationConstants", "ProcessValidationHelper", "QueuePageProfileUtilities"],
	function(ServiceHelper, resources, ConfigurationConstants, ProcessValidationHelper) {
		return {
			entitySchemaName: "Queue",
			messages: {
				/**
				 * ########## ######### ######### ###### ########.
				 */
				"SetFilterModuleConfig": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ########## ######### # ######### #### ########## #######.
				 */
				"FillingKindChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * ######## ## ######### ################# ####### ###### ########.
				 */
				"GetFilterModuleConfig": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ######## ## ######### #######.
				 */
				"OnFiltersChanged": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ########## ######### ## ########## ###### ########## #######.
				 */
				"UpdateData": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				/**
				 * ###### ### ###### # ######## ## ######## #######.
				 */
				QueuePageProfileUtilities: this.Terrasoft.QueuePageProfileUtilities
			},
			attributes: {

				/**
				 * ### #######.
				 * @type {Object}
				 */
				"QueueEntitySchema": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {
						"filter": function() {
							var filterGroup = this.Terrasoft.createFilterGroup();
							var queueObjectFilter = this.Terrasoft.createExistsFilter(
								"[QueueObject:EntitySchemaUId].Id");
							filterGroup.addItem(queueObjectFilter);
							return filterGroup;
						},
						columns: ["Name"]
					}
				},

				/**
				 * #######, ####### ########### ### ###### ###### # ######### #######.
				 * @type {Object}
				 */
				"BusinessProcessSchema": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"lookupListConfig": {
						"filter": function() {
							return this.getBusinessProcessSchemaFilters();
						}
					}
				},

				/**
				 * ####### ######### ############# ###### ##########.
				 * @type {Boolean}
				 */
				"FilterModuleLoaded": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * ####### ######### ######## ###### ########## #######.
				 * @type {Boolean}
				 */
				"QueueModuleLoading": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * ####### ######### ############# ###### ########## #######.
				 * @type {Boolean}
				 */
				"QueueModuleLoaded": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * ############# ######.
				 * @type {String}
				 */
				"EmptyFilterEditData": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": this.Ext.create("Terrasoft.FilterGroup").serialize()
				},

				/**
				 * Queue update frequency.
				 * @type {Object}
				 */
				"QueueUpdateFrequency": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"isRequired": true
				}
			},
			methods: {

				//region Methods: Private

				/*
				 * @private
				 */
				_isInProgress: function() {
					var statusInProgress = "ec5828f6-b883-4ebc-afe3-c80792252adb";
					var status = this.get("Status");
					return status && status.value === statusInProgress;
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc BasePageV2#changeSelectedSideBarMenu
				 * @overridden
				 */
				changeSelectedSideBarMenu: Terrasoft.emptyFn,

				/**
				 * @inheritdoc BasePageV2#getLookupPageConfig
				 * @overridden
				 */
				getLookupPageConfig: function(args, columnName) {
					var config = this.callParent(arguments);
					var schemaColumn = this.getColumnByName(columnName);
					if (!schemaColumn) {
						return config;
					}
					var prefixCaption = resources.localizableStrings.LookupPrefixCaption;
					switch (columnName) {
						case "QueueEntitySchema":
						case "BusinessProcessSchema":
							config.captionLookup = prefixCaption + schemaColumn.caption;
							break;
						default:
							break;
					}
					return config;
				},

				/**
				 * ########## ############# ###### ##########.
				 * @protected
				 * @virtual
				 * @return {String} ############# ###### ##########.
				 */
				getFilterEditModuleId: function() {
					return this.sandbox.id + "_ExtendedFilterEditModule";
				},

				/**
				 * ########## ############# ###### ########## #######.
				 * @protected
				 * @virtual
				 * @return {String} ############# ###### ########## #######.
				 */
				getQueueModuleId: function() {
					return this.sandbox.id + "_QueueModule";
				},

				/**
				 * @inheritdoc BaseModulePageV2#getSaveRecordMessagePublishers
				 * @overridden
				 */
				getSaveRecordMessagePublishers: function() {
					var publishers = this.callParent(arguments);
					publishers.push(this.getQueueModuleId());
					return publishers;
				},

				/**
				 * ########## ###### # ########### ###### ########### ########## #######.
				 * @param {Function} callback ####### ######### ######.
				 * @param {String} callback.EntitySchemaUId ############# #####.
				 * @param {String} callback.EntitySchemaName ### #####.
				 * @param {String} callback.EntitySchemaCaption ######### #####.
				 * @param {Boolean} callback.IsClosedQueue ####### ########## #######.
				 * @param {Boolean} callback.IsSupervisorMode ####### ###### ###########.
				 * @param {Boolean} callback.IsDetailMode ####### ###### ######.
				 * @param {String} callback.QueueId ############# #######.
				 * @param {String} callback.ProfileKey #### #######.
				 * @param {Boolean} callback.IsManuallyFilling ####### ########## ####### #######.
				 */
				getQueueModuleParameters: function(callback) {
					var queueEntitySchema = this.get("QueueEntitySchema");
					var queueEntitySchemaUId = queueEntitySchema.value;
					var queueEntitySchemaName = queueEntitySchema.Name;
					var queueEntitySchemaCaption = queueEntitySchema.displayValue;
					var parameters = {
						EntitySchemaUId: queueEntitySchemaUId,
						EntitySchemaName: queueEntitySchemaName,
						EntitySchemaCaption: queueEntitySchemaCaption,
						IsClosedQueue: false,
						IsSupervisorMode: true,
						IsDetailMode: true,
						QueueId: this.get("Id"),
						ProfileKey: this.getDetailProfileKey(queueEntitySchemaName),
						IsManuallyFilling: this.get("IsManuallyFilling")
					};
					require([queueEntitySchemaName], function(entitySchema) {
						this.Ext.apply(parameters, {
							EntitySchemaPrimaryDisplayColumnName: entitySchema.primaryDisplayColumnName
						});
						callback.call(this, parameters);
					}.bind(this));
				},

				/**
				 * ######### ############ ########## ######-########.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Boolean} callback.isValid ####### ############ ##########.
				 */
				checkProcessParameters: function(callback) {
					var processSchema = this.get("BusinessProcessSchema");
					if (!processSchema) {
						callback(true);
						return;
					}
					var data = {
						processUId: processSchema.value,
						checkParameters: [
							{
								name: "queueItemId",
								dataValueTypes: ["Guid", "Lookup"]
							},
							{
								name: "entityRecordId",
								dataValueTypes: ["Guid", "Lookup"]
							}
						]
					};
					ProcessValidationHelper.checkProcessParameters(data, function(response) {
						this.onCheckProcessParameters(response, callback);
					}.bind(this));
				},

				/**
				 * Loads filtration module.
				 * @protected
				 */
				loadFilterModule: function() {
					if (this.get("IsManuallyFilling") !== false) {
						return;
					}
					var moduleId = this.getFilterEditModuleId();
					this.sandbox.subscribe("OnFiltersChanged", function(args) {
						if (this.get("EmptyFilterEditData") === args.serializedFilter) {
							return;
						}
						this.set("FilterEditData", args.serializedFilter);
					}, this, [moduleId]);
					this.sandbox.subscribe("GetFilterModuleConfig", function() {
						var queueEntitySchema = this.get("QueueEntitySchema");
						return {
							rootSchemaName: queueEntitySchema.Name,
							filters: this.get("FilterEditData")
						};
					}, this, [moduleId]);
					this.sandbox.loadModule("FilterEditModule", {
						renderTo: "FilterProperties",
						id: moduleId
					});
					this.set("FilterModuleLoaded", true);
				},

				/**
				 * ######### ###### ########### ########## #######.
				 * @protected
				 */
				loadQueueModule: function() {
					this.set("QueueModuleLoading", true);
					this.getQueueModuleParameters(function(parameters) {
						this.sandbox.loadModule("QueueModule", {
							renderTo: "QueueItems",
							parameters: parameters
						});
						this.set("QueueModuleLoaded", true);
						this.set("QueueModuleLoading", false);
					}.bind(this));
				},

				/**
				 * Checks queue process parameters, sets queue filters, calls parent method.
				 * @param {Object} config "onSaved" event parameters.
				 * @param {Boolean} needCallParent Sign that parent method needs to be called.
				 * @overridden
				 */
				save: function(config, needCallParent) {
					if (needCallParent) {
						this.callParent(arguments);
						return;
					}
					this.checkProcessParameters(function(isValid) {
						if (!isValid) {
							return;
						}
						var filterEditData = this.get("FilterEditData");
						var filters = !this.Ext.isEmpty(filterEditData)
							? this.Terrasoft.deserialize(filterEditData)
							: null;
						this.set("FilterData", filters && filters.serialize());
						this.save(config, true);
					}.bind(this));
				},

				/**
				 * Unloads filtration module.
				 * @protected
				 */
				unloadFilterModule: function() {
					var moduleId = this.getFilterEditModuleId();
					this.sandbox.unloadModule(moduleId);
					this.set("FilterModuleLoaded", false);
				},

				/**
				 * Unloads queue filling module.
				 * @protected
				 */
				unloadQueueModule: function() {
					var moduleId = this.getQueueModuleId();
					this.sandbox.unloadModule(moduleId);
					this.set("QueueModuleLoaded", false);
				},

				/**
				 * Updates the filtration module on container rendered.
				 * @protected
				 */
				updateFilterModuleOnRender: function() {
					this.$IsFiltersContainerLoaded = true;
					this.updateFilterModule();
				},
				
				/**
				 * Updates the filtration module.
				 * @protected
				 */
				updateFilterModule: function() {
					if (this.get("ActiveTabName") !== "FillingInfoTab" || !this.$IsEntityInitialized ||
						!this.$IsFiltersContainerLoaded) {
						return;
					}
					var queueEntitySchema = this.get("QueueEntitySchema");
					if (!queueEntitySchema) {
						return;
					}
					if (this.get("IsManuallyFilling") !== false) {
						return;
					}
					if (!this.get("FilterModuleLoaded")) {
						this.loadFilterModule();
						return;
					}
					var moduleId = this.getFilterEditModuleId();
					this.sandbox.publish("SetFilterModuleConfig", {
						rootSchemaName: queueEntitySchema.Name,
						filters: this.get("FilterEditData")
					}, [moduleId]);
				},
				
				/**
				 * Updates the queue items module on container rendered.
				 * @protected
				 */
				updateQueueModuleOnRender: function() {
					this.$IsQueuesContainerLoaded = true;
					this.updateQueueModule();
				},

				/**
				 * Updates the queue items module.
				 * @protected
				 */
				updateQueueModule: function() {
					if (this.get("ActiveTabName") !== "FillingInfoTab" || !this.$IsEntityInitialized ||
							!this.$IsQueuesContainerLoaded) {
						return;
					}
					var queueEntitySchema = this.get("QueueEntitySchema");
					if (!queueEntitySchema) {
						return;
					}
					if (!this.get("QueueModuleLoaded") && !this.get("QueueModuleLoading")) {
						this.loadQueueModule();
						return;
					}
					var moduleId = this.getQueueModuleId();
					this.getQueueModuleParameters(function(parameters) {
						this.sandbox.publish("UpdateData", parameters, [moduleId]);
					}.bind(this));
				},

				/**
				 * ############ ####### ######### ######## #######.
				 * @param {Backbone.Model} model ######.
				 * @param {String} activeTabName ### ######## #######.
				 */
				onActiveTabChanged: function(model, activeTabName) {
					if (activeTabName !== "FillingInfoTab") {
						this.unloadFilterModule();
						this.unloadQueueModule();
						return;
					}
					if (!this.get("IsEntityInitialized")) {
						return;
					}
					this.updateQueueModule();
					this.updateFilterModule();
				},

				/**
				 * ############ ######### ######## ############ ########## ######-########.
				 * @param {Object} response ###### ########## ######## ############ ##########.
				 * @param {Boolean} response.isValid ####### ############ ##########.
				 * @param {Object[]} response.invalidParameters ###### ############ ##########.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Boolean} callback.isValid ####### ############ ##########.
				 */
				onCheckProcessParameters: function(response, callback) {
					if (!response.isValid) {
						var parametersNames = [];
						Terrasoft.each(response.invalidParameters, function(parameter) {
							parametersNames.push(parameter.name);
						});
						var processSchema = this.get("BusinessProcessSchema");
						var message;
						if (parametersNames.length > 0) {
							message = this.Ext.String.format(resources.localizableStrings.InvalidParametersMessage,
								processSchema.displayValue, parametersNames.join(", "));
						} else if (response.errorText) {
							message = this.Ext.String.format(
								resources.localizableStrings.ExecuteCheckProcessErrorDetailMessage,
								processSchema.displayValue, response.errorText);
						} else {
							message = this.Ext.String.format(
								resources.localizableStrings.ExecuteCheckProcessErrorMessage,
								processSchema.displayValue);
						}
						Terrasoft.showInformation(message);
					}
					if (callback) {
						callback.call(this, response.isValid);
					}
				},

				/**
				 * ############ ####### ######### #### #######.
				 * @protected
				 * @param {Backbone.Model} model ######.
				 * @param {Object} entitySchema ###### ###### #### #######.
				 */
				onQueueEntitySchemaChanged: function(model, entitySchema) {
					var entitySchemaUId = entitySchema ? entitySchema.value : "";
					if (this.get("IsEntityInitialized")) {
						this.set("FilterEditData", null);
					}
					this.updateFilterModule();
					if ((this.isNewMode() || this.get("IsChanged")) && !this.isEmpty(entitySchemaUId)) {
						this.saveDefaultGridProfile(entitySchemaUId, this.updateQueueModule.bind(this));
					} else {
						this.updateQueueModule();
					}
				},

				/**
				 * @inheritdoc SupervisorSingleWindowPageV2#onQueueEntitySchemaChanged
				 * @deprecated
				 * @protected
				 */
				onEntitySchemaChanged: function(model, entitySchema) {
					this.onQueueEntitySchemaChanged(model, entitySchema);
				},

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.updateFilterModule();
					this.updateQueueModule();
					this.set("IsChanged", false);
					this.updateButtonsVisibility(false);
					this.on("change:IsManuallyFilling", this.onIsManuallyFillingChanged, this);
				},

				/**
				 * @inheritdoc BasePageV2#onSaved
				 * @overridden
				 * @param {Object} response ######### ############## ###### #######.
				 * @param {Object} config ################ ######.
				 */
				onSaved: function(response, config) {
					ServiceHelper.callService("QueuesService", "UpdateQueuesTrigger", function(response, success) {
						if (success) {
							return;
						}
						var errorMessage = this.Ext.String.format(
							this.get("Resources.Strings.UpdateQueuesTriggerError"), response.statusText);
						throw new Terrasoft.InvalidOperationException({
							message: errorMessage
						});
					}.bind(this));
					this.callParent([response, config]);
				},

				/**
				 * ############ ####### ######### ######## # #### ######## ############## #######.
				 * @protected
				 * @param {Backbone.Model} model ######.
				 * @param {Boolean} isManuallyFilling ####### ########## ####### #######.
				 */
				onIsManuallyFillingChanged: function(model, isManuallyFilling) {
					if (isManuallyFilling) {
						this.unloadFilterModule();
					} else {
						this.updateFilterModule();
					}
					this.sandbox.publish("FillingKindChanged", isManuallyFilling, [this.getQueueModuleId()]);
				},
				
				/**
				 * Get filters for BusinessProcessSchema attribute
				 * @protected
				 * @return {Object} filters for BusinessProcessSchema attributes
				 */
				getBusinessProcessSchemaFilters: function() {
					var filterGroup = this.Terrasoft.createFilterGroup();
					var isMaxVersionFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "IsMaxVersion", true);
					filterGroup.add("isMaxVersionFilter" ,isMaxVersionFilter);
					var tagPropertyFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "TagProperty",
						ConfigurationConstants.SysProcess.BusinessProcessTag);
					filterGroup.add("tagPropertyFilter", tagPropertyFilter);
					return filterGroup;
				},

				//endregion

				/**
				 * ######## ## #######.
				 */
				subscribeForEvents: function() {
					this.on("change:QueueEntitySchema", this.onQueueEntitySchemaChanged, this);
					this.on("change:ActiveTabName", this.onActiveTabChanged, this);
				},

				/**
				 * ############# ######.
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeForEvents();
				}
			},
			details: /**SCHEMA_DETAILS*/{
				OperatorsDetail: {
					"schemaName": "QueueOperatorDetailV2",
					"entitySchemaName": "QueueOperator",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Queue"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[

				//region PageHeader

				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"bindTo": "Name",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Priority",
					"values": {
						"bindTo": "Priority",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						},
						"contentType": this.Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Status",
					"values": {
						"bindTo": "Status",
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12
						},
						"contentType": this.Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "QueueEntitySchema",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12
						},
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": {
							"bindTo": "isNewMode"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "QueueUpdateFrequency",
					"values": {
						"bindTo": "QueueUpdateFrequency",
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 12
						},
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": {
							"bindTo": "_isInProgress"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "BusinessProcessSchema",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						},
						"contentType": this.Terrasoft.ContentType.LOOKUP
					}
				},

				//endregion

				//region PageTabs

				//region ParametersTab

				{
					"operation": "insert",
					"name": "FillingInfoTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.FillingTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FillingInfoControls",
					"parentName": "FillingInfoTab",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header-container-margin-bottom"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FillingParametersGroup",
					"parentName": "FillingInfoTab",
					"propertyName": "items",
					"values": {
						"id": "FilterParametersGroup",
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"controlConfig": {
							"collapsed": false,
							"caption": {"bindTo": "Resources.Strings.FillingParametersGroupCaption"}
						},
						"markerValue": "FilterParametersGroup",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FillingInfoTabGridLayout",
					"parentName": "FillingParametersGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "FillingInfoTabGridLayout",
					"name": "AutoFillingKind",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.RADIO_GROUP,
						"value": {
							"bindTo": "IsManuallyFilling"
						},
						"items": [],
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"enabled": {
							"bindTo": "isNewMode"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AutoFillingKind",
					"propertyName": "items",
					"name": "IsAutoFillingQueue",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.IsAutoFillingQueueCaption"
						},
						"markerValue": "IsAutoFillingQueue",
						"value": false,
						"enabled": {
							"bindTo": "isNewMode"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AutoFillingKind",
					"propertyName": "items",
					"name": "IsManuallyFillingQueue",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.IsManuallyFillingQueueCaption"
						},
						"markerValue": "IsManuallyFillingQueue",
						"value": true,
						"enabled": {
							"bindTo": "isNewMode"
						}
					}
				},
				{
					"operation": "insert",
					"name": "FilterProperties",
					"parentName": "FillingInfoTabGridLayout",
					"propertyName": "items",
					"values": {
						"id": "FilterProperties",
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "FilterEditModule",
						"afterrender": {bindTo: "updateFilterModuleOnRender"},
						"afterrerender": {bindTo: "updateFilterModuleOnRender"},
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"name": "QueueItems",
					"parentName": "FillingInfoTab",
					"propertyName": "items",
					"values": {
						"id": "QueueItems",
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "QueueModule",
						"afterrender": {bindTo: "updateQueueModuleOnRender"},
						"afterrerender": {bindTo: "updateQueueModuleOnRender"},
						"classes": {"wrapClassName": ["supervisor-single-window-page-queue-wrapper"]},
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						}
					}
				},

				//endregion

				//region ESNTab

				{
					"operation": "remove",
					"name": "ESNTab",
					"parentName": "Tabs",
					"propertyName": "tabs"
				},

				//endregion

				//region TeamTab
				{
					"operation": "insert",
					"name": "TeamTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.TeamTabCaption"},
						"items": []
					}
				},

				{
					"operation": "insert",
					"parentName": "TeamTab",
					"propertyName": "items",
					"name": "OperatorsDetail",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "merge",
					"name": "TabsContainer",
					"values": {
						"className": "Terrasoft.Container"
					}
				}

				//endregion

				//endregion

			]/**SCHEMA_DIFF*/
		};
	});

