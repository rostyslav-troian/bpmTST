Terrasoft.configuration.Structures["MLDataPredictionUserTaskPropertiesPage"] = {innerHierarchyStack: ["MLDataPredictionUserTaskPropertiesPage"], structureParent: "ProcessFlowElementPropertiesPage"};
define('MLDataPredictionUserTaskPropertiesPageStructure', ['MLDataPredictionUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'a5569491-2b7c-4033-8ed2-e09b6358bf85',schemaCaption: "MLDataPredictionUserTaskPropertiesPage", parentSchemaName: "ProcessFlowElementPropertiesPage", schemaName:'MLDataPredictionUserTaskPropertiesPage',parentSchemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MLDataPredictionUserTaskPropertiesPage", ["terrasoft", "MLDataPredictionUserTaskPropertiesPageResources",
			"FilterModuleMixin"], function(Terrasoft, resources) {
	return {
		mixins: {
			filterModuleMixin: "Terrasoft.FilterModuleMixin"
		},
		messages: {
			"GetFilterModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"OnFiltersChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {

			/**
			 * Machine learning model identifier.
			 * @protected
			 * @type {Object}
			 */
			"MLModelId": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "_initLookupProperty",
				referenceSchemaName: "MLModel",
				isLookup: true,
				isRequired: true,
				doAutoSave: true,
				caption: resources.localizableStrings.MLModelCaption
			},

			/**
			 * Selected model entity schema UId.
			 * @private
			 * @type {String}
			 */
			"ModelSchemaUId": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Predictable entity record identifier.
			 * @protected
			 * @type {Object}
			 */
			"RecordId": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initPropertySilent",
				doAutoSave: true,
				caption: resources.localizableStrings.EntityRecordCaption
			},

			/**
			 * Data prediction modes.
			 * @protected
			 * @type {Object}
			 */
			"DataPredictionModeEnum": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {
					PredictSingleItem: "0",
					PredictCollection: "1"
				}
			},

			/**
			 * Data prediction mode.
			 * @protected
			 * @type {Object}
			 */
			"DataPredictionMode": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isLookup: true,
				isRequired: true,
				onChange: "_onDataPredictionModeChanged"
			},

			/**
			 * Entity collection filter for prediction.
			 * @protected
			 * @type {Object}
			 */
			"PredictionFilterData": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Defines entity collection filter visibility.
			 * @protected
			 * @type {Boolean}
			 */
			IsCollectionFilterVisible: {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}

		},
		details: {},
		methods: {

			//region Methods: Private

			/**
			 * Inits lookup parameter value.
			 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Process parameter.
			 * @private
			 */
			_initLookupProperty: function(parameter) {
				const parameterName = parameter.getName();
				const value = parameter.getValue();
				if (!this.Ext.isEmpty(value)) {
					this.set(parameterName, {
						value: value,
						displayValue: parameter.getParameterDisplayValue()
					});
				}
			},

			/**
			 * Handles MLModelId change event.
			 * @private
			 */
			_onMLModelIdChange: function() {
				this.$PredictionFilterData = null;
				this.$RecordId = null;
				this.set("FilterEditData", null);
				this._updateModelSchemaUId(function() {
					this.updateFilterModule();
				}, this);
			},

			/**
			 * Sets data read mode value.
			 * @param {Terrasoft.manager.mixins.ParametrizedProcessSchemaElement} element Process element.
			 * @private
			 */
			_initDataPredictionMode: function(element) {
				const parameter = element.getParameterByName("IsBatchPrediction");
				const isBatchPrediction = parameter.getValue();
				const dataPredictionModeEnum = this.$DataPredictionModeEnum;
				const modeLookupValue = isBatchPrediction
						? dataPredictionModeEnum.PredictCollection
						: dataPredictionModeEnum.PredictSingleItem;
				const modes = this._getDataPredictionModes();
				this.$DataPredictionMode = modes[modeLookupValue];
			},

			/**
			 * Data prediction mode change handler.
			 * @private
			 */
			_onDataPredictionModeChanged: function() {
				this.unloadFilterUnitModule();
				this.$IsCollectionFilterVisible =
					(this.getLookupValue("DataPredictionMode") === this.$DataPredictionModeEnum.PredictCollection);
			},

			/**
			 * Saves IsBatchPrediction parameter value.
			 * @param {Terrasoft.manager.mixins.ParametrizedProcessSchemaElement} element Process element.
			 * @private
			 */
			_saveDataPredictionMode: function(element) {
				if (!this.isAttributeChanged("DataPredictionMode")) {
					return;
				}
				const parameter = element.getParameterByName("IsBatchPrediction");
				const isBatchPrediction =
					this.getLookupValue("DataPredictionMode") === this.$DataPredictionModeEnum.PredictCollection;
				const sourceValue = {
					value: isBatchPrediction,
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
				};
				parameter.setMappingValue(sourceValue);
			},

			/**
			 * Returns data prediction modes.
			 * @private
			 * @return {Object}
			 */
			_getDataPredictionModes: function() {
				const dataPredictionModeEnum = this.get("DataPredictionModeEnum");
				const dataPredictionModes = {};
				dataPredictionModes[dataPredictionModeEnum.PredictSingleItem] = {
					value: dataPredictionModeEnum.PredictSingleItem,
					displayValue: resources.localizableStrings.PredictSingleItemCaption
				};
				dataPredictionModes[dataPredictionModeEnum.PredictCollection] = {
					value: dataPredictionModeEnum.PredictCollection,
					displayValue: resources.localizableStrings.PredictCollectionCaption
				};
				return dataPredictionModes;
			},

			/**
			 * Updates current model entity schema UId due to selected model.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @private
			 */
			_updateModelSchemaUId: function(callback, scope) {
				const modelId = this.getLookupValue("MLModelId");
				if (this.Ext.isEmpty(modelId)) {
					this.$ModelSchemaUId = null;
					callback.call(scope || this);
					return;
				}
				const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MLModel"
				});
				esq.addColumn("RootSchemaUId");
				esq.getEntity(modelId, function(response) {
					const entity = response.entity;
					this.$ModelSchemaUId = entity.get("RootSchemaUId");
					callback.call(scope || this);
				}, this);
			},

			//endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.destroyFilterModuleMixin();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.FilterModuleMixin#initReferenceSchemaUId
			 * @override
			 */
			initReferenceSchemaUId: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.FilterModuleMixin#getFilterContainerId
			 * @override
			 */
			getFilterContainerId: function() {
				return "ExtendedFiltersContainer";
			},

			/**
			 * @inheritdoc Terrasoft.FilterModuleMixin#getFilterReferenceSchemaAttributeName
			 * @override
			 */
			getFilterReferenceSchemaAttributeName: function() {
				return "ModelSchemaUId";
			},

			//endregion

			//region Methods: Public

			/**
			 * Fills out the drop down list of data read modes.
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.core.collections.Collection} list The drop down list.
			 */
			prepareDataPredictionModes: function(filter, list) {
				if (!list) {
					return;
				}
				const dataPredictionModes = this._getDataPredictionModes();
				list.clear();
				list.loadAll(dataPredictionModes);
			},

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
			 * @override
			 */
			onElementDataLoad: function(element, callback, scope) {
				const parentMethod = this.getParentMethod();
				Terrasoft.chain(
					function(next) {
						parentMethod.call(this, element, next, this);
					},
					function(next) {
						this._initDataPredictionMode(element);
						this.subscribeOnColumnChange("MLModelId", this._onMLModelIdChange, this);
						next();
					},
					this._updateModelSchemaUId,
					function(next) {
						const filterConfig = {
							referenceSchemaParameterName: "ModelSchemaUId",
							dataSourceFiltersParameterName: "PredictionFilterData",
							element: element
						};
						this.mixins.filterModuleMixin.initFilterModuleMixin.call(this, filterConfig, next, this);
					},
					function() {
						callback.call(scope || this);
					},
				this);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
			 * @override
			 */
			saveValues: function() {
				const element = this.get("ProcessElement");
				this._saveDataPredictionMode(element);
				this.saveDataSourceFilters(element, "PredictionFilterData");
				this.callParent(arguments);
			},

			/**
			 * @return {Boolean} True if current mode is single record prediction.
			 */
			getIsRecordIdVisible: function() {
				return !this.Ext.isEmpty(this.getLookupValue("MLModelId")) &&
					(this.getLookupValue("DataPredictionMode") === this.$DataPredictionModeEnum.PredictSingleItem);
			}

			//endregion

		},
		modules: {},
		diff: /**SCHEMA_DIFF*/[
			{
				"name": "UserTaskContainer",
				"parentName": "EditorsContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"name": "MLModelContainer",
				"parentName": "UserTaskContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"name": "MLModelId",
				"parentName": "MLModelContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"wrapClass": ["top-caption-control"],
					"bindTo": "MLModelId",
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"filterComparisonType": Terrasoft.StringFilterType.CONTAIN
					}
				}
			},
			{
				"name": "DataPredictionModeContainer",
				"parentName": "UserTaskContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"name": "DataPredictionModeLabel",
				"parentName": "DataPredictionModeContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"classes": {"labelClass": ["t-title-label-proc"]},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.DataPredictModeCaption"
				}
			},
			{
				"name": "DataPredictionModeSelect",
				"parentName": "DataPredictionModeContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {"prepareList": {"bindTo": "prepareDataPredictionModes"}},
					"labelConfig": {"visible": false},
					"wrapClass": ["no-caption-control"],
					"bindTo": "DataPredictionMode"
				}
			},
			{
				"name": "RecordId",
				"parentName": "UserTaskContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"wrapClass": ["top-caption-control"],
					"classes": {"labelClass": ["t-title-label-proc"]},
					"bindTo": "RecordId",
					"visible": {"bindTo": "getIsRecordIdVisible"}
				}
			},
			{
				"name": "FiltersControlGroup",
				"parentName": "UserTaskContainer",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"visible": "$IsCollectionFilterVisible"
				}
			}, {
				"name": "FilterLabel",
				"parentName": "FiltersControlGroup",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.PredictFilterDataCaption",
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"name": "ExtendedFiltersContainer",
				"parentName": "FiltersControlGroup",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"id": "ExtendedFiltersContainer",
					"selectors": {"wrapEl": "#ExtendedFiltersContainer"},
					"beforererender": {
						"bindTo": "unloadFilterUnitModule"
					},
					"afterrender": {
						"bindTo": "updateFilterModule"
					},
					"afterrerender": {
						"bindTo": "updateFilterModule"
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"markerValue": "ExtendedFiltersContainer"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


