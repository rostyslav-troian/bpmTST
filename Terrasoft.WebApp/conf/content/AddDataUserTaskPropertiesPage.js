Terrasoft.configuration.Structures["AddDataUserTaskPropertiesPage"] = {innerHierarchyStack: ["AddDataUserTaskPropertiesPage"], structureParent: "BaseDataModificationUserTaskPropertiesPage"};
define('AddDataUserTaskPropertiesPageStructure', ['AddDataUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'ed565d7e-5e4b-41ef-a04d-531890719306',schemaCaption: "AddDataUserTaskPropertiesPage", parentSchemaName: "BaseDataModificationUserTaskPropertiesPage", schemaName:'AddDataUserTaskPropertiesPage',parentSchemaUId:'e8f0a1bf-7dcf-497c-bc81-53f264cc1bdb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDataModificationUserTaskPropertiesPage
 */
define("AddDataUserTaskPropertiesPage", ["terrasoft", "ProcessUserTaskConstants", "BusinessRuleModule",
	"AddDataUserTaskPropertiesPageResources", "EntityColumnMappingMixin"],
	function(Terrasoft, ProcessUserTaskConstants, businessRuleModule) {
		return {
			mixins: {
				entityColumnMappingMixin: "Terrasoft.EntityColumnMappingMixin"
			},
			attributes: {
				/**
				 * Selected add data mode enum item.
				 * @protected
				 * @type {{value: String, displayValue: String}}
				 */
				"AddDataModeEnumItem": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * Selected entity schema enum item for filter.
				 * @protected
				 * @type {{value: String, displayValue: String}}
				 */
				"FilterEntitySchemaSelect": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag that indicates whether filters are required.
				 * @protected
				 * @type {Boolean}
				 */
				"IsFiltersRequired": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				}
			},
			rules: {
				"FilterEntitySchemaSelect": {
					"BindFilterEntitySchemaSelectRequiredToAddDataModeEnumItem": {
						"ruleType": businessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": businessRuleModule.enums.Property.REQUIRED,
						"conditions": [{
							"leftExpression": {
								"type": businessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "AddDataModeEnumItem"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": businessRuleModule.enums.ValueType.CONSTANT,
								"value": ProcessUserTaskConstants.RECORD_ADD_MODE.RECORD_SET
							}
						}]
					}
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * Subscribes on the model events.
				 * @private
				 */
				subscribeEvents: function() {
					this.on("change:AddDataModeEnumItem", this.onAddDataModeEnumItemChanged, this);
				},

				/**
				 * Unsubscribes from the model events.
				 * @private
				 */
				destroyEvents: function() {
					this.un("change:AddDataModeEnumItem", this.onAddDataModeEnumItemChanged);
				},

				/**
				 * Saves the reference schema identifier for the filter module.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				saveFilterReferenceSchema: function(element) {
					var filterSchemaAttributeName = this.getFilterReferenceSchemaAttributeName();
					if (!this.getIsRecordSetAddMode()) {
						this.set(filterSchemaAttributeName, null);
					}
					var filterSchemaParameterName = this.getFilterReferenceSchemaParameterName();
					this.saveReferenceSchemaUId(element, filterSchemaParameterName, filterSchemaAttributeName);
				},

				/**
				 * Initializes reference schema select list for the filter module.
				 * @private
				 * @param {Function} callback Callback function.
				 */
				initFilterEntitySchemaSelect: function(callback) {
					var filterReferenceSchemaAttributeName = this.getFilterReferenceSchemaAttributeName();
					var entitySchemaUId = this.get(filterReferenceSchemaAttributeName);
					if (!this.Ext.isEmpty(entitySchemaUId)) {
						this.getEntitySchemaInfo(entitySchemaUId, function(item) {
							this.set("FilterEntitySchemaSelect", item);
							this.on("change:FilterEntitySchemaSelect", this.onFilterEntitySchemaSelectChanged, this);
							callback.call(this);
						}, this);
					} else {
						this.on("change:FilterEntitySchemaSelect", this.onFilterEntitySchemaSelectChanged, this);
						callback.call(this);
					}
				},

				/**
				 * Fills out the drop down list of add data modes.
				 * @private
				 * @param {String} filter Filter value.
				 * @param {Terrasoft.Collection} list The drop down list.
				 */
				prepareAddDataModes: function(filter, list) {
					if (list === null) {
						return;
					}
					var addDataModes = this.getAddDataModeEnumConfig();
					list.clear();
					list.loadAll(addDataModes);
				},

				/**
				 * Updates filters on reference schema item changed.
				 * @private
				 * @param {Backbone.Model} model Model.
				 * @param {{value: String, displayValue: String}} newReferenceSchema New reference schema item.
				 */
				onFilterEntitySchemaSelectChanged: function(model, newReferenceSchema) {
					var newReferenceSchemaUId = newReferenceSchema ? newReferenceSchema.value : null;
					if (this.Ext.isEmpty(newReferenceSchemaUId)) {
						return;
					}
					var filterSchemaAttributeName = this.getFilterReferenceSchemaAttributeName();
					this.set(filterSchemaAttributeName, newReferenceSchemaUId);
					this.clearFilters();
					var element = this.get("ProcessElement");
					var maskId = this.Terrasoft.Mask.show({
						selector: "#" + this.renderTo
					});
					this.updateMappingSourceSchemaColumns(element, function() {
						this.Terrasoft.Mask.hide(maskId);
					}, this);
				},

				/**
				 * Returns AddDataMode enum item.
				 * @private
				 * @return {{value: String, displayValue: String}}
				 */
				getAddDataModeEnumItem: function(addDataModeName) {
					return {
						value: ProcessUserTaskConstants.RECORD_ADD_MODE[addDataModeName],
						displayValue: this.get("Resources.Strings.AddDataMode_" + addDataModeName)
					};
				},

				/**
				 * Indicates that the current mode is
				 * {@link Terrasoft.configuration.ProcessUserTaskConstants#RECORD_ADD_MODE.RECORD_SET}.
				 * @private
				 * @return {Boolean}
				 */
				getIsRecordSetAddMode: function() {
					var enumItem = this.get("AddDataModeEnumItem");
					if (!enumItem) {
						return false;
					}
					var addDataMode = enumItem.value;
					return addDataMode === ProcessUserTaskConstants.RECORD_ADD_MODE.RECORD_SET;
				},

				/**
				 * Handles 'AddDataModeEnumItem' attribute change.
				 * @private
				 */
				onAddDataModeEnumItemChanged: function() {
					var element = this.get("ProcessElement");
					this.updateMappingSourceSchemaColumns(element, this.Ext.emptyFn);
				},

				/**
				 * Indicates that the add data mode is visible.
				 * @private
				 * @return {Boolean}
				 */
				getIsAddDataModeEnumItemVisible: function() {
					var entitySchema = this.get("EntitySchemaSelect");
					return this.Ext.isObject(entitySchema);
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(element, callback, scope) {
					this.callParent([element, function() {
						this.subscribeEvents();
						this.initAddDataModeEnum(element, function() {
							this.initFilterEntitySchemaSelect(function() {
								this.initEntityColumnMappingMixin(element, callback, scope);
							}.bind(this));
						}.bind(this));
					}, this]);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveParameters
				 * @overridden
				 */
				saveParameters: function(element) {
					this.callParent(arguments);
					this.saveAddDataMode(element);
					this.saveEntityColumnMappings(element);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveParameters
				 * @overridden
				 */
				saveReferenceSchemas: function(element) {
					this.callParent(arguments);
					this.saveFilterReferenceSchema(element);
				},

				/**
				 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#getReferenceSchemaUIdParameterName
				 * @overridden
				 */
				getReferenceSchemaUIdParameterName: function() {
					return "EntitySchemaId";
				},

				/**
				 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#getFilterReferenceSchemaParameterName
				 * @overridden
				 */
				getFilterReferenceSchemaParameterName: function() {
					return "FilterEntitySchemaId";
				},

				/**
				 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#onUpdatedEntitySchema
				 * @overridden
				 */
				onUpdatedEntitySchema: function() {
					this.callParent(arguments);
					var element = this.get("ProcessElement");
					this.reInitEntityColumnMapping(element, this.Ext.emptyFn);
				},

				/**
				 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#updateFiltersOnEntitySchemaSelectChanged
				 * @overridden
				 */
				updateFiltersOnEntitySchemaSelectChanged: Ext.emptyFn,

				/**
				 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#getIsFilterUnitVisible
				 * @overridden
				 */
				getIsFilterUnitVisible: function() {
					if (!this.getIsRecordSetAddMode()) {
						return false;
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc EntityColumnMappingMixin#getEntityColumnMappingSchemaUId
				 * @overridden
				 */
				getEntityColumnMappingSchemaUId: function() {
					return this.getEntitySchemaUId();
				},

				/**
				 * @inheritdoc EntityColumnMappingMixin#getEntityColumnMappingSchemaUId
				 * @overridden
				 */
				getEntityColumnMappingsParameterName: function() {
					return "RecordDefValues";
				},

				/**
				 * @inheritdoc EntityColumnMappingMixin#getMappingSourceSchemaUId
				 * @overridden
				 */
				getMappingSourceSchemaUId: function() {
					if (!this.getIsRecordSetAddMode()) {
						return null;
					}
					var attributeName = this.getFilterReferenceSchemaAttributeName();
					return this.get(attributeName);
				},

				/**
				 * @inheritdoc FilterModuleMixin#getFilterReferenceSchemaAttributeName
				 * @overridden
				 */
				getFilterReferenceSchemaAttributeName: function() {
					return "FilterEntitySchemaUId";
				},

				/**
				 * @inheritdoc BaseObject#onDestroy
				 * @overridden
				 */
				onDestroy: function() {
					this.destroyEvents();
					this.destroyEntityColumnMappings();
					this.callParent(arguments);
				},

				/**
				 * Initializes AddDataMode enum.
				 * @protected
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Function} callback The callback function.
				 */
				initAddDataModeEnum: function(element, callback) {
					var addDataMode = this.loadAddDataMode(element);
					var addDataModeEnumConfig = this.getAddDataModeEnumConfig();
					this.set("AddDataModeEnumItem", addDataModeEnumConfig[addDataMode], {silent: true});
					this.updateMappingSourceSchemaColumns(element, callback);
				},

				/**
				 * Loads AddDataMode parameter value.
				 * @protected
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @return {Terrasoft.ProcessUserTaskConstants.RECORD_ADD_MODE} Add data mode.
				 */
				loadAddDataMode: function(element) {
					var addDataModeParameter = element.getParameterByName("RecordAddMode");
					var addDataMode = addDataModeParameter.getValue();
					if (addDataMode) {
						return addDataMode;
					}
					var filterReferenceSchemaParameterName = this.getFilterReferenceSchemaParameterName();
					var filterEntitySchemaParameter = element.getParameterByName(filterReferenceSchemaParameterName);
					var addModes = ProcessUserTaskConstants.RECORD_ADD_MODE;
					return (filterEntitySchemaParameter.getValue()) ? addModes.RECORD_SET : addModes.ONE_RECORD;
				},

				/**
				 * Saves AddDataMode parameter value.
				 * @protected
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				saveAddDataMode: function(element) {
					var addDataModeEnumItem = this.get("AddDataModeEnumItem");
					if (!addDataModeEnumItem) {
						throw new Terrasoft.DataFieldIsRequiredException({fieldName: "AddDataModeEnumItem"});
					}
					var addDataMode = addDataModeEnumItem.value;
					var sourceValue = {
						value: addDataMode,
						source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
					};
					var parameter = element.getParameterByName("RecordAddMode");
					parameter.setMappingValue(sourceValue);
				},

				/**
				 * Returns the enum config of add data modes.
				 * @protected
				 * @return {Object.<string, {value: String, displayValue: String}>}
				 */
				getAddDataModeEnumConfig: function() {
					var recordAddModes = ProcessUserTaskConstants.RECORD_ADD_MODE;
					var enumConfig = {};
					for (var mode in recordAddModes) {
						if (!recordAddModes.hasOwnProperty(mode)) {
							continue;
						}
						var value = recordAddModes[mode];
						enumConfig[value] = this.getAddDataModeEnumItem(mode);
					}
					return enumConfig;
				}

				//endregion

			},
			diff: [
				{
					"operation": "merge",
					"name": "RecommendationLabel",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24}
					}
				},
				{
					"operation": "merge",
					"name": "EntitySchemaSelect",
					"values": {
						"layout": {"column": 0, "row": 1, "colSpan": 24}
					}
				},
				{
					"operation": "insert",
					"name": "AddDataModeLabel",
					"parentName": "BaseDataModificationLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.AddDataModeCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						},
						"visible": {"bindTo": "getIsAddDataModeEnumItemVisible"}
					}
				},
				{
					"operation": "insert",
					"name": "AddDataModeEnumItem",
					"parentName": "BaseDataModificationLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {"bindTo": "prepareAddDataModes"}
						},
						"labelConfig": {"visible": false},
						"wrapClass": ["no-caption-control"],
						"visible": {"bindTo": "getIsAddDataModeEnumItemVisible"}
					}
				},

				//region Selection from an object (with filter)

				{
					"operation": "insert",
					"name": "FilterEntityLabel",
					"parentName": "BaseDataModificationLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.FilterEntitySchemaSelectCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						},
						"visible": {"bindTo": "getIsRecordSetAddMode"}
					}
				},
				{
					"operation": "insert",
					"name": "FilterEntitySchemaSelect",
					"parentName": "BaseDataModificationLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 5, "colSpan": 24},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {"bindTo": "prepareEntityList"}
						},
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["no-caption-control"],
						"visible": {"bindTo": "getIsRecordSetAddMode"}
					}
				},
				{
					"operation": "merge",
					"name": "FilterUnitLabel",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 23
						}
					}
				},
				{
					"operation": "merge",
					"name": "FilterInfoButtonContainer",
					"values": {
						"layout": {
							"column": 23,
							"row": 6,
							"colSpan": 1
						}
					}
				},
				{
					"operation": "merge",
					"name": "ExtendedFiltersContainer",
					"values": {
						"layout": {"column": 0, "row": 7, "colSpan": 24}
					}
				},

				//endregion

				//region ColumnValues

				{
					"operation": "insert",
					"name": "ColumnValuesContainer",
					"parentName": "BaseDataModificationLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 8, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": {
							"bindTo": "ReferenceSchemaUId",
							"bindConfig": {
								"converter": function(value) {
									return !this.Ext.isEmpty(value);
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ColumnValuesLabel",
					"parentName": "ColumnValuesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.EntityColumnMapping_ColumnValuesLabelCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "RecordColumnValuesContainer",
					"parentName": "ColumnValuesContainer",
					"propertyName": "items",
					"values": {
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "EntityColumnMappingsControls",
						"onGetItemConfig": "getEntityColumnMappingsControlViewConfig",
						"classes": {
							"wrapClassName": ["record-column-values-container", "grid-layout"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "AddRecordColumnValuesButton",
					"parentName": "ColumnValuesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.EntityColumnMapping_AddRecordColumnValuesButtonCaption"
						},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"classes": {
							"wrapperClass": ["add-record-column-values-button"]
						},
						"click": {"bindTo": "onAddEntityColumnMappings"}
					}
				}

				//endregion

			]
		};
	}
);


