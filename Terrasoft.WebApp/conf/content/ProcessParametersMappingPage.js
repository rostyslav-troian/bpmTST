Terrasoft.configuration.Structures["ProcessParametersMappingPage"] = {innerHierarchyStack: ["ProcessParametersMappingPage"], structureParent: "BaseParametersMappingPage"};
define('ProcessParametersMappingPageStructure', ['ProcessParametersMappingPageResources'], function(resources) {return {schemaUId:'22fa92a8-3e7a-4d7f-af96-2603eacf22b0',schemaCaption: "Process Parameters Mapping Page", parentSchemaName: "BaseParametersMappingPage", schemaName:'ProcessParametersMappingPage',parentSchemaUId:'b49f79d7-be81-4680-8c25-22b67aa6689b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseParametersMappingPage
 */
define("ProcessParametersMappingPage", ["ProcessParametersMappingPageResources"], function(resources) {

	/**
	 * Entity schema columns config.
	 */
	var entitySchemaColumnsConfig = {
		Id: {
			dataValueType: Terrasoft.DataValueType.GUID,
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
		},
		Caption: {
			dataValueType: Terrasoft.DataValueType.TEXT,
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
		},
		Icon: {
			dataValueType: Terrasoft.DataValueType.TEXT,
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
		},
		Value: {
			dataValueType: Terrasoft.DataValueType.TEXT,
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
		}
	};
	return {
		attributes: {
			/**
			 * Entity schema view columns.
			 */
			"Id": entitySchemaColumnsConfig.Id,
			"Caption": entitySchemaColumnsConfig.Caption,
			"Icon": entitySchemaColumnsConfig.Icon,
			"Value": entitySchemaColumnsConfig.Value
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback) {
				this.initProcessSchema();
				this.initGridData();
				this.callParent([function() {
					this.initGridRowViewModel(function() {
						this.getMainCollection(function(collection) {
							this.loadMainGridCollection(collection);
							this.initActiveRow();
							this.initGetSelectedParameterSubscription();
							callback.call(this);
						});
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#setParametersActiveRow
			 * @overridden
			 */
			getActiveRow: function() {
				var primaryColumnValue = this.get("ParametersGridActiveRow");
				if (primaryColumnValue) {
					var gridData = this.get("ParametersGridData");
					return gridData.find(primaryColumnValue) ? gridData.get(primaryColumnValue) : null;
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#initActiveRow
			 * @overridden
			 */
			initActiveRow: function() {
				var mappingInfo = this.sandbox.publish("GetParameterMappingInfo", null, [this.sandbox.id]);
				if (mappingInfo && mappingInfo.parameterUId && !mappingInfo.schemaElementUId) {
					this.set("ParametersGridActiveRow", mappingInfo.parameterUId);
				}
				this.on("change:ParametersGridActiveRow", this.onChangeActiveRow, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#getSelectedData
			 * @overridden
			 */
			getSelectedData: function() {
				var activeRow = this.getActiveRow();
				if (!activeRow) {
					return;
				}
				var value = Terrasoft.FormulaMacros.prepareProcessParameterValue(activeRow.get("Id"));
				var displayValue = activeRow.get("Caption");
				return {
					value: value.getBody(),
					displayValue: displayValue
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#loadMainGridCollection
			 * @overridden
			 */
			loadMainGridCollection: function(dataCollection) {
				var collection = this.get("ParametersGridData");
				collection.clear();
				this.$IsElementsGridHierarchical = false;
				var gridRowCollection = this.getMainRowCollection(dataCollection);
				if (Terrasoft.isEmptyObject(gridRowCollection)) {
					this.set("IsParametersGridEmpty", true);
				}
				var filteredCollection = this.useGridItemsFilter()
					? this.getFilteredGridItems(gridRowCollection)
					: gridRowCollection;
				var sortedCollection = this.sortParametersByCaption(filteredCollection);
				collection.loadAll(sortedCollection);
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#getMainCollection
			 * @overridden
			 */
			getMainCollection: function(callback) {
				var processSchema = this.sandbox.publish("GetProcessSchema");
				var parameters = processSchema.parameters;
				this.set("HasParameters", !parameters.isEmpty());
				var excludeSelfMappingsParameters = this.excludeSelfFromMapping(parameters);
				var filteredParameters = this.applyFilters(excludeSelfMappingsParameters);
				callback.call(this, filteredParameters);
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#getMainRowCollection
			 * @overridden
			 */
			getMainRowCollection: function(parameters) {
				var collection = {};
				var gridRowViewModelName = this.getGridRowViewModelClassName();
				parameters.each(function(parameter) {
					var imageName = Terrasoft.getImageNameByDataValueType(parameter.dataValueType);
					var value = parameter.sourceValue.value;
					var valueText = value instanceof Terrasoft.LocalizableString ? value.getValue() : value;
					var parentParameter = parameter.getParent();
					var parameterDisplayValue = this.getParameterDisplayValue(parameter);
					collection[parameter.uId] = this.Ext.create(gridRowViewModelName, {
						rowConfig: entitySchemaColumnsConfig,
						values: {
							Id: parameter.uId,
							Parameter: parameter,
							Caption: parameterDisplayValue,
							ParentUId: parentParameter && parentParameter.uId,
							Icon: this.getImageUrl(imageName),
							Value: valueText
						}
					});
					if ((this.getIsFeatureEnabled("ProcessParameterCollections") || Terrasoft.isDebug) &&
						parameter.itemProperties && !parameter.itemProperties.isEmpty()) {
						this.$IsElementsGridHierarchical = true;
						collection = Ext.merge(collection, this.getMainRowCollection(parameter.itemProperties));
					}
				}, this);
				return collection;
			},

			/**
			 * @inheritdoc Terrasoft.BaseParametersMappingPage#applyEmptyParametersGridMessageConfig
			 * @overridden
			 */
			applyEmptyParametersGridMessageConfig: function(config) {
				var title = this.get("HasParameters")
					? this.get("Resources.Strings.ProcessParametersNoRequiredParameters")
					: this.get("Resources.Strings.EmptyInfoTitle");
				var messageProperties = {
					title: title,
					wrapClasses: ["empty-grid-message"]
				};
				var emptyGridMessageViewConfig = this.getEmptyGridMessageViewConfig(messageProperties);
				this.Ext.apply(config, emptyGridMessageViewConfig);
			},

			/**
			 * Returns parameter display value for grid.
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Process schema parameter.
			 * @return {String} Parameter display value.
			 */
			getParameterDisplayValue: function(parameter) {
				var result = parameter.name;
				var parameterCaption = parameter.caption;
				if (parameterCaption && parameterCaption.hasValue()) {
					result = parameterCaption.getValue();
				}
				return result;
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "ParametersGrid",
				"propertyName": "items",
				"values": {
					"primaryDisplayColumnName": "Caption",
					"primaryColumnName": "Id",
					"itemType": Terrasoft.ViewItemType.GRID,
					"listedZebra": true,
					"hierarchical": "$IsElementsGridHierarchical",
					"hierarchicalColumnName": "ParentUId",
					"collection": {"bindTo": "ParametersGridData"},
					"type": "listed",
					"openRecord": {"bindTo": "onGridDoubleClick"},
					"getEmptyMessageConfig": {"bindTo": "applyEmptyParametersGridMessageConfig"},
					"isEmpty": {"bindTo": "IsParametersGridEmpty"},
					"activeRow": {"bindTo": "ParametersGridActiveRow"},
					"columnsConfig": [{
						cols: 24,
						key: [
							{
								name: {bindTo: "Icon"},
								type: Terrasoft.GridIconType.ICON16LISTED
							},
							{
								name: {bindTo: "Caption"}
							}
						]
					}],
					"captionsConfig": [
						{
							cols: 24,
							name: resources.localizableStrings.ProcessParametersGridCaption
						}
					]
				}
			}
		]
	};

});


