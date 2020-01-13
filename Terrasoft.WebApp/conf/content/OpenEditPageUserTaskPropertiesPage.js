Terrasoft.configuration.Structures["OpenEditPageUserTaskPropertiesPage"] = {innerHierarchyStack: ["OpenEditPageUserTaskPropertiesPage"], structureParent: "BaseUserTaskPropertiesPage"};
define('OpenEditPageUserTaskPropertiesPageStructure', ['OpenEditPageUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'a1cc99f2-4831-40c3-b891-64712e652679',schemaCaption: "OpenEditPageUserTaskPropertiesPage", parentSchemaName: "BaseUserTaskPropertiesPage", schemaName:'OpenEditPageUserTaskPropertiesPage',parentSchemaUId:'824a1fba-a081-4d8a-940c-6c258c298687',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseUserTaskPropertiesPage
 */
define("OpenEditPageUserTaskPropertiesPage", ["terrasoft", "OpenEditPageUserTaskPropertiesPageResources",
		"BusinessRuleModule", "Contact", "ConfigurationItemGenerator", "FilterModuleMixin", "EntityColumnMappingMixin",
		"SectionEntitySelectMixin"],
	function(Terrasoft, resources, BusinessRuleModule, Contact) {
		return {
			messages: {},

			mixins: {
				filterModuleMixin: "Terrasoft.FilterModuleMixin",
				entityColumnMappingMixin: "Terrasoft.EntityColumnMappingMixin",
				sectionEntitySelectMixin: "Terrasoft.SectionEntitySelectMixin"
			},

			attributes: {
				/**
				 * Selected page schema identifier.
				 */
				"PageSchemaId": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},
				/**
				 * Open edit page mode.
				 */
				"EditMode": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},
				/**
				 * Record identifier.
				 */
				"RecordId": {
					dataValueType: Terrasoft.DataValueType.MAPPING,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true
				},
				/**
				 * Generate decisions from column.
				 */
				"GenerateDecisionsFromColumn": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					doAutoSave: true
				},
				/**
				 * Decisional column meta path.
				 */
				"DecisionalColumn": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Page schema list.
				 */
				"PageSchemaList": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true
				},
				/**
				 * Index value for AddNewRecord container.
				 */
				"AddNewRecordIndex": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 0
				},
				/**
				 * Index value for EditExistingRecord container.
				 */
				"EditExistingRecordIndex": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 1
				},
				/**
				 * Consider element executed.
				 */
				"ConsiderElementExecuted": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Index value for ExecutedAfterRecordSaved.
				 */
				"ExecutedAfterRecordSavedIndex": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 0
				},
				/**
				 * Index value for ExecutedIfMatchConditions.
				 */
				"ExecutedIfMatchConditionsIndex": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 1
				},
				/**
				 * Page type identifier.
				 */
				"PageTypeUId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				"Recommendation": {
					isRequired: false
				},
				"StartInPeriod": {
					isRequired: false
				},
				"DurationPeriod": {
					isRequired: false
				},
				"RemindBeforePeriod": {
					isRequired: false
				}
			},

			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseObject#onDestroy
				 * @overridden
				 */
				onDestroy: function() {
					this.destroyFilterModuleMixin();
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#onFiltersChanged
				 * @overridden
				 */
				onFiltersChanged: function() {
					this.mixins.filterModuleMixin.onFiltersChanged.apply(this, arguments);
					this.setFilterInfoButtonVisible();
				},

				/**
				 * Sets the value of visibility for filter info button.
				 * @protected
				 */
				setFilterInfoButtonVisible: function() {
					var filterEditData = this.get("FilterEditData");
					var considerElementExecuted = this.get("ConsiderElementExecuted");
					var considerElementExecutedValue = Ext.isObject(considerElementExecuted) ? considerElementExecuted.value
						: null;
					var isMatchConditions = considerElementExecutedValue === this.get("ExecutedIfMatchConditionsIndex");
					var visible = (Ext.isEmpty(filterEditData) || filterEditData.isEmpty()) && isMatchConditions;
					this.set("FilterInfoButtonVisible", visible);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#onRender
				 * Calls for loading of the filter unit module.
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					var isFilterVisible = this.getIsFilterModuleVisible();
					if (isFilterVisible) {
						this.updateFilterModule();
					}
				},

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(element, callback, scope) {
					var parentMethod = this.getParentMethod();
					Terrasoft.chain(
						function(next) {
							parentMethod.call(this, element, next, this);
						},
						function(next) {
							this.initPageSchemaId(element, next, this);
						},
						function(next) {
							this.initEditMode(element);
							this.initRecordId(element);
							this.initEntityColumnMappingMixin(element, next, this);
						},
						function(next, entityColumns) {
							this.initConsiderElementExecuted(element);
							this.initGenerateDecisionsFromColumn(element);
							this.initDecisionalColumn(element, entityColumns);
							var filterConfig = {
								element: element,
								referenceSchemaParameterName: "ObjectSchemaId"
							};
							this.initFilterModuleMixin(filterConfig, next, this);
						},
						function() {
							callback.call(scope);
						}, this);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveParameters
				 * @overridden
				 */
				saveParameters: function(element) {
					this.callParent(arguments);
					this.savePageSchemaId(element);
					this.savePageTypeUId(element);
					this.saveEditMode(element);
					this.saveEntityColumnMappings(element);
					this.saveReferenceSchemaUId(element, "ObjectSchemaId");
					this.saveDataSourceFilters(element);
					this.saveDecisionalColumn(element);
					this.saveConsiderElementExecuted(element);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#customValidator
				 * @overridden
				 */
				customValidator: function() {
					this.validateFilterData();
					this.validateRecordId();
					return {
						invalidMessage: ""
					};
				},

				/**
				 * Validates FilterData attribute.
				 * @protected
				 * @return {Object} Validation info
				 * @return {Object} return.isValid Validation result.
				 * @return {Object} return.invalidMessage Validation message.
				 */
				validateFilterData: function() {
					var isValid = true;
					var message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					var considerElementExecuted = this.get("ConsiderElementExecuted");
					var considerElementExecutedValue = Ext.isObject(considerElementExecuted)
						? considerElementExecuted.value
						: null;
					if (considerElementExecutedValue === this.get("ExecutedIfMatchConditionsIndex")) {
						var filterEditData = this.get("FilterEditData");
						isValid = !Ext.isEmpty(filterEditData) && !filterEditData.isEmpty();
					}
					var invalidMessage = isValid ? "" : message;
					var validationInfo = {
						isValid: isValid,
						invalidMessage: invalidMessage
					};
					this.setValidationInfo("FilterEditData", isValid, invalidMessage);
					return validationInfo;
				},

				/**
				 * Validates RecordId attribute.
				 * @protected
				 * @return {Object} Validation info
				 * @return {Object} return.isValid Validation result.
				 * @return {Object} return.invalidMessage Validation message.
				 */
				validateRecordId: function() {
					var isValid = true;
					var message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					var editMode = this.get("EditMode");
					var editModeValue = Ext.isObject(editMode) ? editMode.value : null;
					if (editModeValue === this.get("EditExistingRecordIndex")) {
						var recordId = this.get("RecordId");
						isValid = !Terrasoft.isEmptyObject(recordId) && !Ext.isEmpty(recordId.value);
					}
					var invalidMessage = isValid ? "" : message;
					var validationInfo = {
						isValid: isValid,
						invalidMessage: invalidMessage
					};
					this.setValidationInfo("RecordId", isValid, invalidMessage);
					return validationInfo;
				},

				/**
				 * Returns lookup entity schema query.
				 * @param  {String} schemaName Entity schema name.
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				getLookupSchemaEsq: function(schemaName) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: schemaName
					});
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
					return esq;
				},

				/**
				 * @inheritdoc ProcessFlowElementPropertiesPage#getResultParameterAllValues
				 * @overridden
				 */
				getResultParameterAllValues: function(callback, scope) {
					var generateDecisionsFromColumn = this.get("GenerateDecisionsFromColumn");
					var decisionalColumn = this.get("DecisionalColumn");
					var entitySchemaUId = Ext.isObject(decisionalColumn)
						? decisionalColumn.referenceSchemaUId
						: null;
					if (!generateDecisionsFromColumn || !entitySchemaUId) {
						callback.call(scope);
						return;
					}
					Terrasoft.EntitySchemaManager.getItemByUId(entitySchemaUId, function(entitySchemaItem) {
						var esq = this.getLookupSchemaEsq(entitySchemaItem.name);
						esq.getEntityCollection(function(response) {
							var resultParameterValues = {};
							if (response.success) {
								response.collection.each(function(item) {
									var id = item.get("Id");
									var name = item.get("Name");
									resultParameterValues[id] = name;
								}, this);
							}
							callback.call(scope, resultParameterValues);
						}, this);
					}, this);
				},

				//region PageSchemaId

				/**
				 * Sets attribute "PageSchemaId".
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				initPageSchemaId: function(element, callback, scope) {
					this.initPageSchemaList(function() {
						var pageSchema = this.findPageSchema(element);
						if (pageSchema) {
							this.set("PageSchemaId", pageSchema);
							this.set("ReferenceSchemaUId", pageSchema.entitySchemaUId);
							this.set("PageTypeUId", pageSchema.typeColumnUId);
						}
						this.on("change:PageSchemaId", this.onPageSchemaChange, this);
						callback.call(scope);
					}, this);
				},

				/**
				 * Returns page schema info.
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @return {Object|null}
				 */
				findPageSchema: function(element) {
					var parameter = element.findParameterByName("PageSchemaId");
					var pageSchemaId = parameter.getValue();
					if (!pageSchemaId) {
						return null;
					}
					var pageSchemaList = this.get("PageSchemaList");
					var pageSchema = pageSchemaList.find(pageSchemaId);
					if (pageSchema == null) {
						pageSchema = this.findPageSchemaByOldPageSchemaUId(pageSchemaId);
					}
					return pageSchema;
				},

				/**
				 * Search pageSchema by obsolete CardSchemaUId field in SysModule entity.
				 * @param {String} pageSchemaId Edit page schema id.
				 * @return {Object|null}
				 */
				findPageSchemaByOldPageSchemaUId: function(pageSchemaId) {
					var pageSchemaList = this.get("PageSchemaList");
					var filteredPageSchemaList = pageSchemaList.filter("obsoleteCardSchemaUId", pageSchemaId);
					return filteredPageSchemaList.first();
				},

				/**
				 * Returns query for select page schema list.
				 * @private
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				getPageSchemaListEsq: function() {
					var esq = new Terrasoft.EntitySchemaQuery({
						rootSchemaName: "SysModule",
						isDistinct: true
					});
					var entitySchemaPath = "[SysModuleEntity:Id:SysModuleEntity].SysEntitySchemaUId";
					esq.addColumn("Caption", "caption");
					esq.addColumn("CardSchemaUId", "obsoleteCardSchemaUId");
					esq.addColumn("[SysModuleEdit:SysModuleEntity:SysModuleEntity].TypeColumnValue", "typeColumnUId");
					esq.addColumn("[SysModuleEdit:SysModuleEntity:SysModuleEntity].CardSchemaUId", "pageSchemaUId");
					esq.addColumn(entitySchemaPath, "entitySchemaUId");
					var positionColumn = esq.addColumn("[SysModuleEdit:SysModuleEntity:SysModuleEntity].Position",
						"Position");
					positionColumn.orderDirection = Terrasoft.OrderDirection.ASC;
					positionColumn.orderPosition = 0;
					var filters = new Terrasoft.FilterGroup();
					var pageSchemaLeftExpression = new Terrasoft.ColumnExpression({
						columnPath: "[SysModuleEdit:SysModuleEntity:SysModuleEntity].CardSchemaUId"
					});
					var entitySchemaLeftExpression = new Terrasoft.ColumnExpression({
						columnPath: entitySchemaPath
					});
					filters.addItem(Terrasoft.createIsNotNullFilter(pageSchemaLeftExpression));
					filters.addItem(Terrasoft.createIsNotNullFilter(entitySchemaLeftExpression));
					filters.addItem(Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL,
						"IsSystem", true));
					esq.filters.addItem(filters);
					return esq;
				},

				/**
				 * Returns display value for page by entity schema and type column.
				 * @param {Terrasoft.EntitySchemaManagerItem} schemaItem Entity schema.
				 * @param {String} typeColumnUId Page type column unique identifier.
				 * @return {String}
				 */
				getPageDisplayValue: function(schemaItem, typeColumnUId) {
					var typeCaption = "";
					if (typeColumnUId) {
						var entityItem = Terrasoft.configuration.EntityStructure[schemaItem.getName()];
						var page = entityItem && Terrasoft.findWhere(entityItem.pages, {UId: typeColumnUId});
						typeCaption = page ? " (" + page.captionLcz + ")" : "";
					}
					var caption = schemaItem.getCaption();
					return caption + typeCaption;
				},

				/**
				 * @private
				 */
				_uniquePageSchemaListDisplayValues: function() {
					var pageSchemaList = this.get("PageSchemaList");
					pageSchemaList.each(function(pageSchema) {
						var sameCaptionItems = pageSchemaList.filterByPath("displayValue", pageSchema.displayValue);
						if (sameCaptionItems.getCount() > 1) {
							sameCaptionItems.each(function(item) {
								const moduleCaption = item.pageInfo.caption;
								if (moduleCaption) {
									item.displayValue += " (" + moduleCaption + ")";
								}
							}, this);
						}
					}, this);
				},

				/**
				 * @private
				 */
				_sortPageSchemaList: function() {
					var pageSchemaList = this.get("PageSchemaList");
					pageSchemaList.sort("displayValue", Terrasoft.OrderDirection.ASC);
				},

				/**
				 * Fills page schema list by response collection.
				 * @private
				 * @param {Array} pageSchemaItems Items of query response collection.
				 * @param {Terrasoft.Collection} entitySchemaItems Section entity schema list.
				 */
				fillPageSchemaList: function(pageSchemaItems, entitySchemaItems) {
					var pageSchemaList = this.get("PageSchemaList");
					Terrasoft.each(pageSchemaItems, function(pageSchemaItem) {
						var pageInfo = pageSchemaItem.values;
						var item = pageSchemaList.find(pageInfo.pageSchemaUId);
						if (item) {
							item.obsoleteCardSchemaUId = item.obsoleteCardSchemaUId || pageInfo.obsoleteCardSchemaUId;
						} else {
							var entitySchema = entitySchemaItems.find(pageInfo.entitySchemaUId);
							if (entitySchema) {
								const entityName = entitySchema.getName();
								const pageDisplayValue = this.getPageDisplayValue(entitySchema, pageInfo.typeColumnUId);
								pageSchemaList.add(pageInfo.pageSchemaUId, {
									value: pageInfo.pageSchemaUId,
									name: entityName,
									displayValue: pageDisplayValue,
									entitySchemaUId: pageInfo.entitySchemaUId,
									typeColumnUId: pageInfo.typeColumnUId,
									obsoleteCardSchemaUId: pageInfo.obsoleteCardSchemaUId,
									pageInfo: pageInfo
								});
							}
						}
					}, this);
					this._uniquePageSchemaListDisplayValues();
					this._sortPageSchemaList();
				},

				/**
				 * Sets attribute "PageSchemaList".
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				initPageSchemaList: function(callback, scope) {
					this.set("PageSchemaList", Ext.create("Terrasoft.Collection"));
					var pageSchemaItems;
					Terrasoft.chain(
						function(next) {
							var pageSchemaListQuery = this.getPageSchemaListEsq();
							pageSchemaListQuery.getEntityCollection(next, this);
						},
						function(next, response) {
							if (!response.success || response.collection.isEmpty()) {
								callback.call(scope);
								return;
							}
							pageSchemaItems = response.collection.getItems();
							this.getEntitySchemaList(next, this);
						},
						function(next, entitySchemaItems) {
							this.fillPageSchemaList(pageSchemaItems, entitySchemaItems);
							callback.call(scope);
						}, this
					);
				},

				/**
				 * The event handler for preparing of the data drop-down PageSchema.
				 * @private
				 * @param {Object} filter Filters for data preparation.
				 * @param {Terrasoft.Collection} list The data for the drop-down list.
				 */
				preparePageSchemaList: function(filter, list) {
					if (list === null) {
						return;
					}
					list.clear();
					var pageSchemaList = this.get("PageSchemaList");
					list.loadAll(pageSchemaList);
				},

				/**
				 * The event handler for change of the PageSchema attribute.
				 * @private
				 * @param {Terrasoft.BaseViewModel} model View model.
				 * @param {Object} newPageSchemaId New value of PageSchemaId attribute.
				 * @param {Object} options Additional settings.
				 */
				onPageSchemaChange: function(model, newPageSchemaId, options) {
					if (options.showConfirmation === false) {
						return;
					}
					var newPageSchemaIdValue = newPageSchemaId ? newPageSchemaId.value : "";
					if (!newPageSchemaIdValue) {
						return;
					}
					var element = this.get("ProcessElement");
					var oldPageSchema = this.findPageSchema(element);
					var oldPageSchemaValue = oldPageSchema ? oldPageSchema.value : "";
					if (oldPageSchemaValue && (oldPageSchemaValue !== newPageSchemaIdValue)) {
						var message = this.get("Resources.Strings.ChangePageSchemaWarningMessage");
						var buttonCaption = this.get("Resources.Strings.ChangePageSchemaButtonCaption");
						var changeButton = Terrasoft.getButtonConfig("change", buttonCaption);
						this.showConfirmationDialog(message, function(returnCode) {
							if (returnCode === "change") {
								this.onPageSchemaChanged(newPageSchemaId);
							} else {
								this.set("PageSchemaId", oldPageSchema, {showConfirmation: false});
							}
						}, [changeButton, Terrasoft.MessageBoxButtons.CANCEL.returnCode], {defaultButton: 0});
					} else {
						this.onPageSchemaChanged(newPageSchemaId);
					}
				},

				/**
				 * Page schema attributes changed handler.
				 * @private
				 * @param {Object} newPageSchemaId New value of PageSchemaId attribute.
				 */
				onPageSchemaChanged: function(newPageSchemaId) {
					var pageSchemaId = this.get("PageSchemaId");
					var entitySchemaUId = "";
					var pageTypeUId = "";
					if (pageSchemaId) {
						var pageSchemaList = this.get("PageSchemaList");
						var pageSchema = pageSchemaList.get(pageSchemaId.value);
						entitySchemaUId = pageSchema.entitySchemaUId;
						pageTypeUId = pageSchema.typeColumnUId;
					} else {
						this.set("EditMode", null);
					}
					this.set("ReferenceSchemaUId", entitySchemaUId);
					this.set("PageTypeUId", pageTypeUId);
					var afterRecordSavedIndex = this.get("ExecutedAfterRecordSavedIndex");
					var considerElementExecutedLis = this.getConsiderElementExecutedList();
					var afterRecordSaved = considerElementExecutedLis[afterRecordSavedIndex];
					this.set("ConsiderElementExecuted", afterRecordSaved);
					this.set("FilterEditData", null);
					var element = this.get("ProcessElement");
					this.reInitEntityColumnMapping(element, Ext.emptyFn);
					this.set("DecisionalColumn", null);
					this.set("GenerateDecisionsFromColumn", false);
					this.savePageSchemaId(element, newPageSchemaId);
					this.clearRecordId();
					const parameter = element.findParameterByName("RecordId");
					parameter.referenceSchemaUId = entitySchemaUId;
				},

				/**
				 * Saves page schema identifier value.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Object} [newPageSchemaId] New value of PageSchemaId attribute.
				 */
				savePageSchemaId: function(element, newPageSchemaId) {
					if (this.changedValues && this.Ext.isDefined(this.changedValues.PageSchemaId) || newPageSchemaId) {
						var pageSchemaId = newPageSchemaId || this.get("PageSchemaId");
						if (pageSchemaId) {
							var sourceValue = {
								value: String(pageSchemaId.value),
								source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
							};
							var parameter = element.findParameterByName("PageSchemaId");
							parameter.setMappingValue(sourceValue);
						} else {
							var pageSchema = this.findPageSchema(element);
							this.set("PageSchemaId", pageSchema, {showConfirmation: false});
						}
					}
				},

				/**
				 * Saves page type identifier value.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				savePageTypeUId: function(element) {
					var parameter = element.findParameterByName("PageTypeUId");
					var pageTypeUId = this.get("PageTypeUId");
					var sourceValue = {};
					if (pageTypeUId) {
						sourceValue = {
							value: pageTypeUId,
							source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
						};
					}
					parameter.setMappingValue(sourceValue);
				},

				// endregion

				// region EditMode

				/**
				 * Initialization EditMode parameter value.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				initEditMode: function(element) {
					var parameter = element.findParameterByName("EditMode");
					var editModeValue = null;
					var pageSchemaIdParameter = element.findParameterByName("PageSchemaId");
					var pageSchemaId = pageSchemaIdParameter.getValue();
					if (pageSchemaId) {
						var editMode = parameter.getValue();
						var editModeList = this.getEditModeList();
						editModeValue = editModeList[editMode];
					}
					this.set("EditMode", editModeValue);
					this.setValidationInfo("EditMode", true, null);
				},

				/**
				 * Returns EditMode list.
				 * @private
				 * @return {Object}
				 */
				getEditModeList: function() {
					return {
						"0": {
							value: this.get("AddNewRecordIndex"),
							displayValue: resources.localizableStrings.AddNewRecordCaption
						},
						"1": {
							value: this.get("EditExistingRecordIndex"),
							displayValue: resources.localizableStrings.EditExistingRecordCaption
						}
					};
				},

				/**
				 * The event handler for preparing of the data drop-down EditMode.
				 * @private
				 * @param {Object} filter Filters for data preparation.
				 * @param {Terrasoft.Collection} list The data for the drop-down list.
				 */
				prepareEditModeList: function(filter, list) {
					if (list === null) {
						return;
					}
					list.clear();
					list.loadAll(this.getEditModeList());
				},

				/**
				 * Saves edit mode setting.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				saveEditMode: function(element) {
					var changes = this.changedValues;
					if (changes && changes.hasOwnProperty("EditMode")) {
						var parameter = element.findParameterByName("EditMode");
						var sourceValue = {};
						var editMode = this.get("EditMode");
						if (!Ext.isEmpty(editMode)) {
							var value = String(editMode.value);
							sourceValue = {
								value: value,
								source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
							};
						}
						parameter.setMappingValue(sourceValue);
					}
				},

				/**
				 * Returns whether AddNewRecordContainer is visible.
				 * @private
				 * @return {boolean}
				 */
				isAddNewRecordContainerVisible: function() {
					var editMode = this.get("EditMode");
					if (editMode) {
						var editModeValue = editMode.value;
						var addNewRecordIndex = this.get("AddNewRecordIndex");
						return editModeValue === addNewRecordIndex;
					} else {
						return false;
					}
				},

				/**
				 * Returns whether EditExistingRecordContainer is visible.
				 * @private
				 * @return {boolean}
				 */
				isEditExistingRecordContainerVisible: function() {
					var editMode = this.get("EditMode");
					if (editMode) {
						var editModeValue = editMode.value;
						var addNewRecordIndex = this.get("EditExistingRecordIndex");
						return editModeValue === addNewRecordIndex;
					} else {
						return false;
					}
				},

				/**
				 * Returns whether EditMode is visible.
				 * @private
				 * @return {boolean}
				 */
				isEditModeVisible: function() {
					var pageSchemaId = this.get("PageSchemaId");
					return Boolean(pageSchemaId);
				},

				/**
				 * Returns whether BottomContainer is visible.
				 * @private
				 * @return {boolean}
				 */
				isBottomContainerVisible: function() {
					var editMode = this.get("EditMode");
					return Boolean(editMode);
				},

				// endregion

				// region RecordId

				/**
				 * Initialization RecordId parameter value.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				initRecordId: function(element) {
					var parameter = element.findParameterByName("RecordId");
					this.initProperty(parameter);
					var recordId = this.get("RecordId");
					recordId.referenceSchemaUId = this.get("ReferenceSchemaUId");
				},

				/**
				 * Clears value for attribute RecordId.
				 * @private
				 */
				clearRecordId: function() {
					var recordId = {
						value: null,
						displayValue: null,
						source: Terrasoft.ProcessSchemaParameterValueSource.None,
						referenceSchemaUId: this.get("ReferenceSchemaUId")
					};
					this.set("RecordId", recordId);
				},

				// endregion

				// region RecordColumnValues

				/**
				 * @inheritdoc EntityColumnMappingMixin#getEntityColumnMappingSchemaUId
				 * @overridden
				 */
				getEntityColumnMappingSchemaUId: function() {
					var pageSchemaId = this.get("PageSchemaId");
					if (!pageSchemaId) {
						return null;
					}
					return pageSchemaId.entitySchemaUId;
				},

				// endregion

				// region GenerateDecisionsFromColumn

				/**
				 * Initialization "GenerateDecisionsFromColumn" attribute.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				initGenerateDecisionsFromColumn: function(element) {
					var parameter = element.findParameterByName("GenerateDecisionsFromColumn");
					var generateDecisionsFromColumn = parameter.getValue();
					this.set("GenerateDecisionsFromColumn", Boolean(generateDecisionsFromColumn));
				},

				// endregion

				// region DecisionalColumnMetaPath

				/**
				 * Initialization "DecisionalColumn" attribute.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Terrasoft.Collection} entityColumns Entity columns collection.
				 */
				initDecisionalColumn: function(element, entityColumns) {
					var parameter = element.findParameterByName("DecisionalColumnMetaPath");
					var decisionalColumnMetaPath = parameter.getValue();
					if (decisionalColumnMetaPath) {
						var column = entityColumns.find(decisionalColumnMetaPath);
						var item = this.getDecisionalColumnItem(column);
						this.set("DecisionalColumn", item);
					}
				},

				/**
				 * Saves DecisionalColumnMetaPath parameter value.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				saveDecisionalColumn: function(element) {
					if (this.changedValues &&
						(this.changedValues.DecisionalColumn || this.changedValues.GenerateDecisionsFromColumn)) {
						var parameter = element.findParameterByName("DecisionalColumnMetaPath");
						var value = "null";
						var generateDecisionsFromColumn = this.get("GenerateDecisionsFromColumn");
						var decisionalColumn = this.get("DecisionalColumn");
						if (generateDecisionsFromColumn && decisionalColumn) {
							value = decisionalColumn.value;
						}
						var sourceValue = {
							value: value,
							source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
						};
						parameter.setMappingValue(sourceValue);
					}
				},

				/**
				 * The event handler for preparing of the data drop-down DecisionalColumn.
				 * @private
				 * @param {Object} filter Filters for data preparation.
				 * @param {Terrasoft.Collection} list The data for the drop-down list.
				 */
				prepareDecisionalColumnList: function(filter, list) {
					if (!list) {
						return;
					}
					var entityColumns = this.get("EntityColumns");
					var collection = new Terrasoft.Collection();
					entityColumns.each(function(column) {
						if (column.schemaColumn.dataValueType === Terrasoft.DataValueType.LOOKUP) {
							var item = this.getDecisionalColumnItem(column);
							collection.add(item.value, item);
						}
					}, this);
					list.clear();
					list.loadAll(collection);
				},

				/**
				 * Returns decisional column drop-down list item.
				 * @private
				 * @param {Object} column Entity schema column.
				 * @param {String} column.id Column identifier.
				 * @param {String} column.caption Column caption.
				 * @return {Object} Decisional column drop-down list item
				 * @return {String} return.value List item value.
				 * @return {String} return.displayValue List item display value.
				 * @return {String} return.referenceSchemaUId Column entity schema UId.
				 */
				getDecisionalColumnItem: function(column) {
					var item = null;
					if (column) {
						var schemaColumn = column.schemaColumn;
						var referenceSchemaUId = Ext.isObject(schemaColumn) ? schemaColumn.referenceSchemaUId : null;
						item = {
							value: column.id,
							displayValue: column.caption,
							referenceSchemaUId: referenceSchemaUId
						};
					}
					return item;
				},

				/**
				 * Returns whether DecisionalColumn is visible.
				 * @private
				 * @return {Boolean}
				 */
				isDecisionalColumnVisible: function() {
					var editMode = this.get("EditMode");
					var generateDecisionsFromColumn = this.get("GenerateDecisionsFromColumn");
					var decisionalColumnVisible = (editMode != null) && generateDecisionsFromColumn;
					return Boolean(decisionalColumnVisible);
				},

				// endregion

				// region ConsiderElementExecuted

				/**
				 * Initialization "ConsiderElementExecuted" attribute.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				initConsiderElementExecuted: function(element) {
					var parameter = element.findParameterByName("IsMatchConditions");
					var isMatchConditions = parameter.getValue();
					var afterRecordSavedIndex = this.get("ExecutedAfterRecordSavedIndex");
					var ifMatchConditionsIndex = this.get("ExecutedIfMatchConditionsIndex");
					var index = isMatchConditions ? ifMatchConditionsIndex : afterRecordSavedIndex;
					var list = this.getConsiderElementExecutedList();
					var value = list[index];
					this.set("ConsiderElementExecuted", value);
					this.on("change:ConsiderElementExecuted", this.onConsiderElementExecuted, this);
				},

				/**
				 * Returns ConsiderElementExecuted list.
				 * @private
				 * @return {Object}
				 */
				getConsiderElementExecutedList: function() {
					return {
						"0": {
							value: this.get("ExecutedAfterRecordSavedIndex"),
							displayValue: resources.localizableStrings.ExecutedAfterRecordSavedCaption
						},
						"1": {
							value: this.get("ExecutedIfMatchConditionsIndex"),
							displayValue: resources.localizableStrings.ExecutedIfMatchConditionsCaption
						}
					};
				},

				/**
				 * The event handler for preparing of the data drop-down ConsiderElementExecuted.
				 * @private
				 * @param {Object} filter Filters for data preparation.
				 * @param {Terrasoft.Collection} list The data for the drop-down list.
				 */
				prepareConsiderElementExecutedList: function(filter, list) {
					if (list === null) {
						return;
					}
					list.clear();
					list.loadAll(this.getConsiderElementExecutedList());
				},

				/**
				 * Flag that indicates whether FilterModule is visible.
				 * @return {Boolean}
				 */
				getIsFilterModuleVisible: function() {
					var considerElementExecuted = this.get("ConsiderElementExecuted");
					var ifMatchConditionsIndex = this.get("ExecutedIfMatchConditionsIndex");
					var isFilterVisible = considerElementExecuted &&
						(considerElementExecuted.value === ifMatchConditionsIndex);
					return isFilterVisible;
				},

				/**
				 * The event handler for change of the PageSchema attribute.
				 * @private
				 */
				onConsiderElementExecuted: function() {
					var isFilterVisible = this.getIsFilterModuleVisible();
					if (isFilterVisible) {
						this.updateFilterModule();
					} else {
						this.unloadFilterUnitModule();
					}
					this.setFilterInfoButtonVisible();
				},

				/**
				 * Saves ConsiderElementExecuted setting.
				 * @private
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				saveConsiderElementExecuted: function(element) {
					var changes = this.changedValues;
					if (changes && changes.hasOwnProperty("ConsiderElementExecuted")) {
						var parameter = element.findParameterByName("IsMatchConditions");
						var sourceValue = {};
						var considerElementExecuted = this.get("ConsiderElementExecuted");
						if (!Ext.isEmpty(considerElementExecuted)) {
							var ifMatchConditionsIndex = this.get("ExecutedIfMatchConditionsIndex");
							var value = considerElementExecuted.value === ifMatchConditionsIndex;
							sourceValue = {
								value: value,
								source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
							};
						}
						parameter.setMappingValue(sourceValue);
					}
				},

				/**
				 * Select edit mode event handler.
				 * @private
				 * @param {Object} editMode Selected mode.
				 */
				onChangeEditMode: function(editMode) {
					if (editMode && editMode.value === this.get("EditExistingRecordIndex")) {
						this.clearEntityColumnMapping();
					} else {
						this.clearRecordId();
					}
				}

				// endregion
			},

			diff: [
				{
					"operation": "insert",
					"parentName": "TitleTaskContainer",
					"propertyName": "items",
					"name": "PageSchemaId",
					"values": {
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"labelConfig": {"visible": false},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {"bindTo": "preparePageSchemaList"},
							"filterComparisonType": Terrasoft.StringFilterType.CONTAIN
						},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "TitleTaskContainer",
					"propertyName": "items",
					"name": "EditMode",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"caption": {"bindTo": "Resources.Strings.EditModeCaption"},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {"bindTo": "prepareEditModeList"},
							"change": {
								"bindTo": "onChangeEditMode"
							}
						},
						"wrapClass": ["top-caption-control"],
						"visible": {"bindTo": "isEditModeVisible"}
					}
				},

				// region AddNewRecordContainer

				{
					"operation": "insert",
					"parentName": "EditorsContainer",
					"propertyName": "items",
					"name": "AddNewRecordContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": {"bindTo": "isAddNewRecordContainerVisible"}
					}
				},
				{
					"operation": "insert",
					"parentName": "AddNewRecordContainer",
					"propertyName": "items",
					"name": "DefaultValuesLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.DefaultValuesLabelCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AddNewRecordContainer",
					"propertyName": "items",
					"name": "RecordColumnValuesContainer",
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
					"parentName": "AddNewRecordContainer",
					"propertyName": "items",
					"name": "AddRecordColumnValuesButton",
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
				},

				// endregion

				// region EditExistingRecordContainer

				{
					"operation": "insert",
					"parentName": "EditorsContainer",
					"propertyName": "items",
					"name": "EditExistingRecordContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": {"bindTo": "isEditExistingRecordContainerVisible"}
					}
				},
				{
					"operation": "insert",
					"parentName": "EditExistingRecordContainer",
					"propertyName": "items",
					"name": "RecordId",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"caption": {"bindTo": "Resources.Strings.RecordIdCaption"},
						"wrapClass": ["top-caption-control"],
						"isRequired": {"bindTo": "isEditExistingRecordContainerVisible"}
					}
				},

				// endregion

				// region BottomContainer

				{
					"operation": "insert",
					"parentName": "EditorsContainer",
					"propertyName": "items",
					"name": "BottomContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": {"bindTo": "isBottomContainerVisible"}
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "WhoFillPageLabel",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.WhoFillPageLabelCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "OwnerId",
					"values": {
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"labelConfig": {"visible": false},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "Recommendation",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"caption": {"bindTo": "Resources.Strings.RecommendationForFillPageCaption"},
						"wrapClass": ["top-caption-control"],
						"isRequired": true
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "InformationOnStep",
					"values": {
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"caption": {"bindTo": "Resources.Strings.InformationOnStepCaption"},
						"wrapClass": ["top-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "ConsiderElementExecutedLabel",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.ConsiderElementExecutedCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "ConsiderElementExecuted",
					"values": {
						"layout": {"column": 0, "row": 5, "colSpan": 24},
						"labelConfig": {"visible": false},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {"bindTo": "prepareConsiderElementExecutedList"}
						},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "ExtendedFiltersContainer",
					"values": {
						"layout": {"column": 0, "row": 6, "colSpan": 23},
						"id": "ExtendedFiltersContainer",
						"selectors": {"wrapEl": "#ExtendedFiltersContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["extended-filters-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "FilterInfoButtonContainer",
					"values": {
						"layout": {
							"column": 23,
							"row": 6,
							"colSpan": 1
						},
						"visible": {
							"bindTo": "FilterInfoButtonVisible"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": "FilterInfoButtonContainer",
						"wrapClass": ["filter-info-button-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "FilterInfoButtonContainer",
					"propertyName": "items",
					"name": "FilterInfoButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {
							"bindTo": "Resources.Strings.FilterInformationText"
						}
					}
				},
				{
					"operation": "insert",
					"name": "GenerateDecisionsFromColumnContainer",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 0, "row": 7, "colSpan": 24},
						"items": [],
						"wrapClass": ["label-info-button-container-wrapClass"]
					}
				},
				{
					"operation": "insert",
					"parentName": "GenerateDecisionsFromColumnContainer",
					"propertyName": "items",
					"name": "GenerateDecisionsFromColumn",
					"values": {
						"caption": {"bindTo": "Resources.Strings.GenerateDecisionsFromColumnCaption"},
						"wrapClass": ["t-checkbox-control"]
					}
				},
				{
					"operation": "insert",
					"name": "HowElementPerformedButton",
					"parentName": "GenerateDecisionsFromColumnContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.HowElementPerformedLabelCaption"},
						"behaviour": {
							"displayEvent": Terrasoft.controls.TipEnums.displayEvent.CLICK
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "BottomContainer",
					"propertyName": "items",
					"name": "DecisionalColumn",
					"values": {
						"layout": {"column": 0, "row": 8, "colSpan": 24},
						"caption": {"bindTo": "Resources.Strings.DecisionalColumnMetaPathCaption"},
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						},
						"controlConfig": {
							"prepareList": {"bindTo": "prepareDecisionalColumnList"}
						},
						"wrapClass": ["top-caption-control"],
						"visible": {"bindTo": "isDecisionalColumnVisible"},
						"isRequired": {"bindTo": "isDecisionalColumnVisible"}
					}
				},

				// endregion

				// region BackgroundProcessMode

				{
					"operation": "insert",
					"name": "BackgroundProcessMode",
					"parentName": "EditorsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "BackgroundProcessMode",
					"propertyName": "items",
					"name": "useBackgroundMode",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "canUseBackgroundProcessMode"
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						}
					}
				}

				// endregion

			],

			rules: {
				"DecisionalColumn": {
					"RequireDecisionalColumnOnGenerateDecisionsFromColumn": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "GenerateDecisionsFromColumn"
							},
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": true
							}
						}]
					}
				}
			}

		};
	}
);


