Terrasoft.configuration.Structures["CampaignStartSignalPage"] = {innerHierarchyStack: ["CampaignStartSignalPage"], structureParent: "BaseSignalEventPropertiesPage"};
define('CampaignStartSignalPageStructure', ['CampaignStartSignalPageResources'], function(resources) {return {schemaUId:'08ebca61-654f-40fe-aabc-aa0f2cf6bdae',schemaCaption: "Campaign start signal page", parentSchemaName: "BaseSignalEventPropertiesPage", schemaName:'CampaignStartSignalPage',parentSchemaUId:'4a540667-df85-4512-b845-55dadd9ed1c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignStartSignalPage", ["MultilineLabel", "css!MultilineLabel"], function() {
	return {
		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
		},
		attributes: {
			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#RecordId
			 * @overridden
			 */
			"RecordId": {
				"dataValueType": this.Terrasoft.DataValueType.MAPPING,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"doAutoSave": true,
				"initMethod": null
			},

			/**
			 * Returns is entity columns info button visible.
			 * @private
			 * @type {Boolean}
			 */
			"EntityColumnsInfoButtonVisible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": false
			}
		},
		methods: {

			/**
			 * Initializes information text.
			 * @private
			 */
			_initInfoText: function() {
				var academyUrl = this.get("AcademyUrl");
				var informationText = this.get("Resources.Strings.ProcessInformationText");
				informationText = this.Ext.String.format(informationText, academyUrl);
				this.set("Resources.Strings.ProcessInformationText", informationText);
			},

			/**
			 * Returns a caption of entity schema.
			 * @private
			 * @param {Guid} schemaUId Unique identifier of entity schema.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The callback execution context.
			 * @return {String} The caption of entity schema.
			 */
			_getSchemaCaptionByUId: function(schemaUId, callback, scope) {
				Terrasoft.EntitySchemaManager.findItemByUId(schemaUId, function(item) {
					callback.call(scope, item.getCaption());
				}, this);
			},

			/**
			 * Creates ESQ for signal entities.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} The info of signal entity.
			 */
			_createSignalESQ: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "CampaignSignalEntity"
				});
				esq.addColumn("Id");
				esq.addColumn("EntitySchemaUId");
				esq.addColumn("Caption");
				return esq;
			},

			/**
			 * Returns info of signal entity.
			 * @private
			 * @param {Guid} signalEntityId Unique identifier of signal entity.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The callback execution context.
			 * @return {String} The info of signal entity.
			 */
			_getSignalEntityInfo: function(signalEntityId, callback, scope) {
				var esq = this._createSignalESQ();
				esq.getEntity(signalEntityId, function(response) {
					var entity = response.entity;
					var schemaUId = entity.get("EntitySchemaUId");
					var caption = entity.get("Caption");
					var signalEntityInfo = {
						value: signalEntityId,
						displayValue: caption,
						schemaUId: schemaUId
					};
					if (Ext.isEmpty(caption)) {
						this._getSchemaCaptionByUId(schemaUId, function(schemaCaption) {
							signalEntityInfo.displayValue = schemaCaption;
							callback.call(scope, signalEntityInfo);
						}, this);
					} else {
						callback.call(scope, signalEntityInfo);
					}
				}, scope);
			},

			/**
			 * Creates a list of entity schemas for drop-down.
			 * @param {Terrasoft.Collection} schemaItems The data for the drop-down list.
			 * @return {Object} The list of entity schemas.
			 */
			_createEntitySelectList: function(schemaItems) {
				var resultList = {};
				schemaItems.each(function(schemaItem) {
					var id = schemaItem.get("Id");
					resultList[id] = {
						value: id,
						displayValue: schemaItem.get("Caption"),
						schemaUId: schemaItem.get("EntitySchemaUId")
					};
				}, this);
				return resultList;
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.initAcademyUrl(this._initInfoText, this);
			},

			/**
			 * Initializes url to the academy.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The callback execution context.
			 * @protected
			 */
			initAcademyUrl: function(callback, scope) {
				Terrasoft.AcademyUtilities.getUrl({
					contextHelpCode: this.getContextHelpCode(),
					callback: function(academyUrl) {
						this.set("AcademyUrl", academyUrl);
						this.Ext.callback(callback, scope);
					},
					scope: this
				});
			},

			/**
			 * Returns code of the context help.
			 * @protected
			 * @return {String}
			 */
			getContextHelpCode: function() {
				return "CampaignSignalElement";
			},

			/**
			 * Returns a list of signal entities.
			 * @return {Terrasoft.Collection} The signal entities.
			 */
			getSignalEntityList: function(callback, scope) {
				var esq = this._createSignalESQ();
				esq.getEntityCollection(function(response) {
					callback.call(scope, response.collection);
				}, scope);
			},

			/**
			 * Fills signal entity caption when it is empty.
			 * @param {Terrasoft.Collection} signalEntities The list of signal entities.
			 */
			fillSignalEntityCaption: function(signalEntities) {
				var self = this;
				signalEntities.getItems().map(function(entity) {
					var caption = entity.get("Caption");
					if (Ext.isEmpty(caption)) {
						self._getSchemaCaptionByUId(entity.get("EntitySchemaUId"), function(schemaCaption) {
							entity.set("Caption", schemaCaption);
						}, self);
					}
				});
			},

			/**
			 * The event handler for preparing of the data drop-down Entity.
			 * @param {Object} filter Filters for data preparation.
			 * @param {Terrasoft.Collection} list The data for the drop-down list.
			 */
			prepareSignalEntityList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				this.getSignalEntityList(function(signalEntities) {
					this.fillSignalEntityCaption(signalEntities);
					signalEntities.sort("$Caption", this.Terrasoft.OrderDirection.ASC);
					var resultList = this._createEntitySelectList(signalEntities);
					list.loadAll(resultList);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.ProcessFlowElementPropertiesPage#saveParameters
			 * @overridden
			 */
			saveParameters: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#initSignalTypeList
			 * @override
			 */
			initSignalTypeList: function() {
				this.set("WaitingRandomSignal", false);
				this.set("WaitingEntitySignal", true);
				var objectSignalType = {
					value: Terrasoft.process.constants.SignalType.ObjectSignal,
					displayValue: this.get("Resources.Strings.ObjectSignalCaption")
				};
				this.set("SignalType", objectSignalType);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#getEntityChangeTypeList
			 * @override
			 */
			getEntityChangeTypeList: function() {
				var list = this.callParent(arguments);
				delete list[this.Terrasoft.EntityChangeType.Deleted];
				return list;
			},

			/**
			 * Handles change of entity schema columns controls list.
			 * @private
			 */
			_onEntitySchemaColumnsControlsSelectChanged: function() {
				var entityChangeType = this.$EntityChangeType;
				if (entityChangeType === Terrasoft.EntityChangeType.Updated) {
					var controlList = this.$EntitySchemaColumnsControlsSelect;
					this.set("EntityColumnsInfoButtonVisible", controlList.collection.length === 0);
				}
			},

			/**
			 * @inheritdoc Terrasoft.EntitySchemaSelectMixin#initEntitySchemaColumnsSelect
			 * @override
			 */
			initEntitySchemaColumnsSelect: function(entityColumns, callback, scope) {
				var controlList = this.$EntitySchemaColumnsControlsSelect;
				var entityChangeType = this.get("EntityChangeType");
				entityChangeType = Ext.isObject(entityChangeType) ? entityChangeType.value : entityChangeType;
				this.set("EntityColumnsInfoButtonVisible", entityChangeType === Terrasoft.EntityChangeType.Updated);
				controlList.on("changed", this._onEntitySchemaColumnsControlsSelectChanged.bind(this), this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.FilterModuleMixin#getFilterModuleConfig
			 * @overridden
			 */
			getFilterModuleConfig: function(entitySchemaName) {
				var baseConfig = this.callParent(arguments);
				var config = {
					rightExpressionMenuAligned: true
				};
				return Ext.apply(baseConfig, config);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#onExpectChangesChanged
			 * @override
			 */
			onExpectChangesChanged: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#onEntityChangeTypeChanged
			 * @override
			 */
			onEntityChangeTypeChanged: function() {
				var entityChangeType = this.get("EntityChangeType");
				if (Ext.isEmpty(entityChangeType)) {
					this.unloadFilterUnitModule();
				}
				entityChangeType = Ext.isObject(entityChangeType) ? entityChangeType.value : entityChangeType;
				if (entityChangeType === Terrasoft.EntityChangeType.Updated) {
					var expectChanges = {
						value: Terrasoft.process.constants.SignalExpectChanges.AnySelectedField,
						displayValue: this.get("Resources.Strings.AnySelectedFieldCaption")
					};
					this.set("ExpectChanges", expectChanges, {
						silent: true
					});
					this.set("EntityColumnsInfoButtonVisible", true);
				} else {
					this.clearAttributes(["ExpectChanges"]);
					this.validAttributes(["ExpectChanges"]);
					this.clearEntitySchemaColumns();
					this.set("EntityColumnsInfoButtonVisible", false);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#initSignalEntity
			 * @override
			 */
			initSignalEntity: function(element) {
				this.set("EntitySchemaSelect", element.signalEntityId, {silent: true});
				this.set("ReferenceSchemaUId", element.entitySchemaUId);
				this.set("EntitySignal", element.entitySignal);
				this.set("HasEntityColumnChange", element.hasEntityColumnChange);
				this.set("NewEntityChangedColumns", element.newEntityChangedColumns);
				this.set("HasEntityFilters", element.hasEntityFilters);
				this.set("EntityFilters", element.entityFilters);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#onEntitySchemaSelectChanged
			 * @override
			 */
			onEntitySchemaSelectChanged: function() {
				this.callParent(arguments);
				var entity = this.get("EntitySchemaSelect");
				var entitySchemaUId = Ext.isObject(entity) ? entity.schemaUId : entity;
				this.set("EntitySchemaUId", entitySchemaUId);
			},

			/**
			 * @inheritdoc Terrasoft.EntitySchemaSelectMixin#getEntitySchemaColumnsSelect
			 * @override
			 */
			getEntitySchemaColumnsSelect: function(callback, scope) {
				scope = scope || this;
				var entitySchemaColumns = this.get("EntitySchemaColumnsSelect");
				if (!entitySchemaColumns) {
					entitySchemaColumns = this.Ext.create("Terrasoft.Collection");
					this.set("EntitySchemaColumnsSelect", entitySchemaColumns);
				}
				var schemaUId = this.get("ReferenceSchemaUId");
				if (!schemaUId || !entitySchemaColumns.isEmpty()) {
					if (this.Ext.isFunction(callback)) {
						callback.call(scope, entitySchemaColumns);
					}
					return;
				}
				this.getEntitySchemaColumns(schemaUId, callback, scope);
			},

			/**
			 * @inheritdoc Terrasoft.EntitySchemaSelectMixin#initEntitySchemaSelect
			 * @override
			 */
			initEntitySchemaSelect: function(callback, scope) {
				var signalEntityId = this.get("EntitySchemaSelect");
				if (!this.Ext.isEmpty(signalEntityId)) {
					this._getSignalEntityInfo(signalEntityId, function(item) {
						this.set("EntitySchemaSelect", item);
						this.on("change:EntitySchemaSelect", this.onEntitySchemaSelectChanged, this);
						callback.call(scope);
					}, this);
				} else {
					this.on("change:EntitySchemaSelect", this.onEntitySchemaSelectChanged, this);
					callback.call(scope);
				}
			},

			/**
			 * @inheritdoc Terrasoft.FilterModuleMixin#initReferenceSchemaUId
			 * @override
			 */
			initReferenceSchemaUId: function() {
				var entity = this.get("EntitySchemaSelect");
				entity = Ext.isObject(entity) ? entity.schemaUId : entity;
				this.set("ReferenceSchemaUId", entity);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#saveEntity
			 * @override
			 */
			saveEntity: function(element) {
				var entity = this.get("EntitySchemaSelect");
				var entityId = Ext.isObject(entity) ? entity.value : entity;
				var entitySchemaUId = Ext.isObject(entity) ? entity.schemaUId : entity;
				element.signalEntityId = entityId;
				element.entitySchemaUId = entitySchemaUId;
				this.set("EntitySchemaUId", entitySchemaUId);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSignalEventPropertiesPage#saveEntityColumns
			 * @override
			 */
			saveEntityColumns: function(element) {
				var controlList = this.$EntitySchemaColumnsControlsSelect;
				var changedColumns = controlList.mapArray(function(control) {
						return control.get("Id");
					}, this);
				this.$NewEntityChangedColumns = changedColumns;
				element.newEntityChangedColumns = changedColumns;
				var anySelectedField = Terrasoft.process.constants.SignalExpectChanges.AnySelectedField;
				var anyField = Terrasoft.process.constants.SignalExpectChanges.AnyField;
				var expectChanges = changedColumns.length === 0 ? anyField : anySelectedField;
				var expectChangesList = this.getExpectChangesList();
				this.$ExpectChanges = expectChangesList[expectChanges];
				element.hasEntityColumnChange = expectChanges === anySelectedField;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "RecommendationLabel"
			},
			{
				"operation": "remove",
				"name": "SignalType"
			},
			{
				"operation": "remove",
				"name": "EntitySchemaSelect"
			},
			{
				"operation": "insert",
				"name": "InformationLabel",
				"parentName": "MainControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"className": "Terrasoft.MultilineLabel",
					"contentVisible": true,
					"showReadMoreButton": false,
					"caption": {"bindTo": "Resources.Strings.ProcessInformationText"},
					"classes": {
						"labelClass": ["label-small"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ObjectSignalEntityControlGroup",
				"parentName": "MainControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"row": 2,
						"column": 0,
						"rowSpan": 1,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EntityTextLabel",
				"parentName": "ObjectSignalEntityControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.ObjectEntityCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "EntitySchemaSelect",
				"parentName": "ObjectSignalEntityControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"rowSpan": 1,
						"colSpan": 24
					},
					"contentType": this.Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": "$prepareSignalEntityList",
						"filterComparisonType": this.Terrasoft.StringFilterType.CONTAIN
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "remove",
				"name": "ExpectChanges",
				"values": {
				}
			},
			{
				"operation": "remove",
				"name": "useBackgroundMode"
			},
			{
				"operation": "insert",
				"name": "EntityColumnsLabel",
				"parentName": "ObjectSignalPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 23
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ExpectChangesCaption"},
					"visible": "$getExpectChangesVisible",
					"classes": {
						"labelClass": ["label-small"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "EntityColumnsInfoButtonContainer",
				"parentName": "ObjectSignalPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 23,
						"row": 2,
						"colSpan": 1
					},
					"visible": {
						"bindTo": "EntityColumnsInfoButtonVisible"
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"markerValue": "EntityColumnsInfoButtonContainer",
					"wrapClass": ["filter-info-button-container"]
				}
			},
			{
				"operation": "insert",
				"name": "EntityColumnsInfoButton",
				"parentName": "EntityColumnsInfoButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {
						"bindTo": "Resources.Strings.EntityColumnsInformationText"
					}
				}
			},
			{
				"operation": "merge",
				"name": "EntityColumnsContainer",
				"values": {
					"visible": "$getExpectChangesVisible"
				}
			},
			{
				"operation": "remove",
				"parentName": "ToolsContainer",
				"name": "ToolsButton"
			}
		]/**SCHEMA_DIFF*/
	};
});


