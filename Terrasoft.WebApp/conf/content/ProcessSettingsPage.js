Terrasoft.configuration.Structures["ProcessSettingsPage"] = {innerHierarchyStack: ["ProcessSettingsPage"]};
define('ProcessSettingsPageStructure', ['ProcessSettingsPageResources'], function(resources) {return {schemaUId:'5e43f121-4ef3-4a00-9b0a-e0b6d13bd25c',schemaCaption: "ProcessSettingsPage", parentSchemaName: "", schemaName:'ProcessSettingsPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessSettingsPage", [
	"ProcessSettingsPageResources", "ModalBox", "GridUtilitiesV2"
], function(resources, ModalBox) {
	return {
		attributes: {
			/**
			 * Attribute for process select control.
			 */
			"ProcessRecord": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onProcessRecordChange",
				isRequired: true
			},

			/**
			 * Attribute for parameter select control.
			 */
			"ParameterRecord": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Run by selected record attribute.
			 */
			"IsRunByRecord": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Process settings page invoker id.
			 */
			"InvokerId": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.CUSTOM
			},

			/**
			 * Manager item instance.
			 */
			"ManagerItem": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.CUSTOM
			},

			/**
			 * Selected process instance.
			 */
			"ProcessInstance": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.CUSTOM
			},

			/**
			 * Object manager name.
			 */
			"ManagerName": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Flag for page initialization state.
			 */
			"IsInitialized": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Flag for required parameter.
			 */
			"IsParameterRequired": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Process filter config.
			 */
			"FilterConfig": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.CUSTOM
			},

			/**
			 * Last process esq Id.
			 * @private
			 */
			//// TODO CRM-34283 Research delay request execution when typed.
			"LastProcessEsqId": {
 				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		},
		methods: {

			/**
			 * Cancels previous process esq request.
			 * @private
			 */
			//// TODO CRM-34283 Research delay request execution when typed.
			_abortPreviousProcessEsq: function() {
				var lastEsqId = this.get("LastProcessEsqId");
				if (lastEsqId) {
					Terrasoft.AjaxProvider.abortRequestByInstanceId(lastEsqId);
				}
			},
			/**
			 * Validates parameter record value.
			 * @private
			 * @param mappingValue {Object} Changing mapping value.
			 * @returns {Object} Validation config.
			 */
			_parameterRecordValidator: function(mappingValue) {
				var validationInfo = {
					invalidMessage: ""
				};
				if (this.get("IsRunByRecord") && Ext.isEmpty(mappingValue)) {
					validationInfo.invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
				}
				return validationInfo;
			},

			/**
			 * Initializes data managers.
			 * @private
			 * @param callback {Function} Callback.
			 * @param scope {Object} Scope.
			 */
			_initManagers: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						Terrasoft.ProcessFlowElementSchemaManager.initialize(next, this);
					},
					function(next) {
						Terrasoft.ProcessSchemaManager.initialize(next, this);
					},
					function() {
						this._initRecords(callback, scope);
					},
					this
				);
			},

			/**
			 * Returns oject manager instance.
			 * @private
			 * @returns {Object} Object manager instance.
			 */
			_getObjectManager: function() {
				var managerName = this.get("ManagerName");
				return Terrasoft[managerName];
			},

			/**
			 * Initializes records default values.
			 * @private
			 * @param callback {Function} Callback.
			 * @param scope {Object} Scope.
			 */
			_initRecords: function(callback, scope) {
				var invokerId = this.get("InvokerId");
				if (invokerId) {
					this._initializeFromInvoker(invokerId, callback, scope);
				} else {
					this._initializeNewRecord(callback, scope);
				}
			},

			/**
			 * Returns process active version uId.
			 * @private
			 * @param {String} parentUId Process parent uId.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			_getProcessActiveVersionUId: function(parentUId, callback, scope) {
				Terrasoft.ProcessSchemaManager.getActualVersionUId(parentUId, function(actualVersionInfo) {
					callback.call(scope, actualVersionInfo.actualVersionSchemaUId);
				}, scope);
			},

			/**
			 * Initializes default values from passed invoker id.
			 * @private
			 * @param invokerId {String} Process page invoker id.
			 * @param callback {Function} Callback.
			 * @param scope {Object} Scope.
			 */
			_initializeFromInvoker: function(invokerId, callback, scope) {
				var manager = this._getObjectManager();
				var managerItem = manager.findItem(invokerId);
				this.set("ManagerItem", managerItem);
				var processParentUId = managerItem.getProcessUId();
				Terrasoft.chain(
					function(next) {
						this._getProcessActiveVersionUId(processParentUId, next, this);
					},
					function(next, actualProcessUId) {
						var actualProcessUIdFilter = Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL,	"Id", actualProcessUId);
						this._getFilteredProcessCollection(actualProcessUIdFilter, next, this);
					},
					function(next, list) {
						var item = list.first();
						if (!Ext.isEmpty(item)) {
							this.set("ProcessRecord", this._toProcessRecord(item));
							this._initProcessInfo(callback, scope);
						} else {
							callback.call(scope);
						}
					},
					this
				);
			},

			/**
			 * Initializes new record when no invokerId passed.
			 * @private
			 * @param callback {Function} Callback.
			 * @param scope {Object} Scope.
			 */
			_initializeNewRecord: function(callback, scope) {
				var config = {
					position: Number.MAX_SAFE_INTEGER
				};
				var manager = this._getObjectManager();
				manager.createItem(config, function(item) {
					this.set("ManagerItem", item);
					callback.call(scope);
				}, this);
			},

			/**
			 * Updates process instance.
			 * @private
			 * @param callback {Function} Callback function.
			 * @param scope {Object} Callback scope.
			 */
			_updateProcessInstance: function(callback, scope) {
				this._getProcessInstance(function(process) {
					this.set("ProcessInstance", process);
					callback.call(scope, process);
				}, this);
			},

			/**
			 * Returns process instance.
			 * @private
			 * @param callback {Function} Process instance.
			 * @param scope {Object} Callback scope.
			 */
			_getProcessInstance: function(callback, scope) {
				var processRecord = this.get("ProcessRecord");
				var processUId = processRecord.value;
				Terrasoft.ProcessSchemaManager.forceGetInstanceByUId(processUId, function(process) {
					callback.call(scope, process);
				}, this);
			},

			/**
			 * Initializes process info.
			 * @private
			 * @param callback {Function} Callback.
			 * @param scope {Object} Scope.
			 */
			_initProcessInfo: function(callback, scope) {
				this._updateProcessInstance(function(process) {
					var managerItem = this.get("ManagerItem");
					var parameterUId = managerItem.getParameterUId();
					if (parameterUId) {
						var parameters = process.parameters;
						var parameter = parameters.get(parameterUId);
						this.set("ParameterRecord", this._toParameterRecord(parameter));
						this.set("IsRunByRecord", true);
					}
					callback.call(scope);
				}, this);
			},

			/**
			 * Prepares manager result item.
			 * @private
			 * @returns {Object} Result manager item.
			 */
			_prepareResultManagerItem: function(callback, scope) {
				var managerItem = this.get("ManagerItem");
				var processInstance = this.get("ProcessInstance");
				var processUId = processInstance.uId;
				Terrasoft.ProcessModuleUtilities.getProcessSchemaParentUIdByUId(processUId, function(parentUId) {
					managerItem.setProcessUId(parentUId);
					managerItem.setParameterUId(this._prepareParameterUId());
					managerItem.setProcessCaption(processInstance.getCaption() || processInstance.name);
					callback.call(scope, managerItem);
				}, this);
			},

			/**
			 * Returns selected parameter uId.
			 * @private
			 * @returns {String} Parameter uId.
			 */
			_prepareParameterUId: function() {
				var parameter = this.get("ParameterRecord");
				var result;
				if (this.get("IsRunByRecord") && parameter) {
					result = parameter.value;
				} else {
					result = null;
				}
				return result;
			},

			/**
			 * Filters process collection from already added to module processes and selects it into
			 * process records collection.
			 * @private
			 * @param collection {Terrasoft.Collection} Process collection.
			 * @returns {Terrasoft.Collection} Process records collection.
			 */
			_prepareProcessCollection: function(collection) {
				var manager = this._getObjectManager();
				var managerItems = manager.getActiveItems();
				var filteredManagerItems = this._filterProcessManagerItems(managerItems);
				collection = collection.except(filteredManagerItems, function(process, managerItem) {
					return process.get("VersionParentUId") === managerItem.getProcessUId();
				}, this);
				collection = collection.select(this._toProcessRecord, this);
				return collection;
			},

			/**
			 * Filters manager items by filter config.
			 * @private
			 * @param {Terrasoft.Collection} collection Manager items collection.
			 * @returns {Terrasoft.Collection} Fitlered manager items collection.
			 */
			_filterProcessManagerItems: function(collection) {
				var filterConfig = this.get("FilterConfig") || {};
				var processRunnerId = filterConfig.processRunnerId;
				if (!Ext.isEmpty(processRunnerId)) {
					collection = collection.filterByFn(function(item) {
						var itemValue = item.getProcessRunnerId();
						return itemValue === processRunnerId;
					}, this);
				}
				return collection;
			},

			/**
			 * Transforms process manager item into control`s process record.
			 * @private
			 * @param processManagerItem {Object} Process manager item.
			 * @returns {Object} Control`s process record.
			 */
			_toProcessRecord: function(processManagerItem) {
				return {
					value: processManagerItem.get("Id"),
					displayValue: processManagerItem.get("Caption")
				};
			},

			/**
			 * Transforms process parameter item into control`s process parameter record.
			 * @private
			 * @param processParameter {Object} Process parameter item.
			 * @returns {Object} Control`s process parameter record.
			 */
			_toParameterRecord: function(processParameter) {
				return {
					value: processParameter.uId,
					displayValue: processParameter.getCaption()
				};
			},

			/**
			 * Returns filtered by lookup data value type process parameters collection.
			 * @private
			 * @returns {Terrasoft.Collection} Filtered process parameters collection.
			 */
			_getFilteredProcessParameters: function() {
				var filterConfig = this.get("FilterConfig");
				var referenceSchemaUId = filterConfig.referenceSchemaUId;
				var process = this.get("ProcessInstance");
				var parameters = process && process.parameters;
				if (process && parameters) {
					parameters = parameters.filterByFn(function(parameter) {
						var isValidGuid = parameter.dataValueType === Terrasoft.DataValueType.GUID;
						var isValidLookup = parameter.dataValueType === Terrasoft.DataValueType.LOOKUP;
						if (isValidLookup && referenceSchemaUId) {
							isValidLookup = parameter.referenceSchemaUId === referenceSchemaUId;
						}
						return isValidGuid || isValidLookup;
					}, this);
				} else {
					parameters = Ext.create("Terrasoft.Collection");
				}
				return parameters;
			},

			/**
			 * Returns filtered process collection.
			 * @private
			 * @param {String} filter String to contain in caption.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			_getFilteredProcessCollection: function(filter, callback, scope) {
				this._abortPreviousProcessEsq();
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwProcessLib"
				});
				esq.addColumn("Id");
				esq.addColumn("VersionParentUId");
				esq.addColumn("Caption");
				var hasStartEventFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"HasStartEvent", 1);
				esq.filters.addItem(hasStartEventFilter);
				var isActiveVersionFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"IsActiveVersion", 1);
				esq.filters.addItem(hasStartEventFilter);
				esq.filters.addItem(isActiveVersionFilter);
				esq.filters.addItem(filter);
				esq.getEntityCollection(function(response) {
					callback.call(scope, response.collection);
				}, scope);
				this.set("LastProcessEsqId", esq.instanceId);
			},

			/**
			 * Updates parameter record.
			 * @private
			 */
			_updateParameterRecord: function() {
				var parameterList = this._getFilteredProcessParameters();
				var parametersCount = parameterList.getCount();
				var newParameterRecordValue = parametersCount === 1
					? this._toParameterRecord(parameterList.first())
					: null;
				this.set("ParameterRecord", newParameterRecordValue);
			},

			/**
			 * Inits process page.
			 * @protected
			 * @param callback {Function} Callback.
			 * @param scope {Object} Scope.
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this._initManagers(function() {
						if (this.get("IsParameterRequired")) {
							this.set("IsRunByRecord", true);
						}
						var maskId = this.get("InitMaskId");
						Terrasoft.Mask.hide(maskId);
						this.set("IsInitialized", true);
						callback.call(scope);
					}, this);
				}, this]);
			},

			/**
			 * Closes modal box.
			 */
			onClose: function(managerItemId) {
				ModalBox.close(managerItemId);
			},

			/**
			 * Prepare parameter list.
			 * @param {String} filter Lookup filter.
			 * @param {Terrasoft.Collection} list Item collection.
			 */
			prepareParametersList: function(filter, list) {
				var controlList = this._getFilteredProcessParameters();
				controlList = controlList.select(this._toParameterRecord, this);
				if (controlList.isEmpty()) {
					this.set("ParameterRecord", null);
				} else {
					list.clear();
					list.loadAll(controlList);
				}
			},

			/**
			 * Handles a click on the "Save" button.
			 */
			onSaveClick: function() {
				var manager = this._getObjectManager();
				if (this.validate()) {
					var savingMaskId = Terrasoft.Mask.show({
						timeout: 0
					});
					this._prepareResultManagerItem(function(resultManagerItem) {
						var resultManagerItemId = resultManagerItem.id;
						if (!manager.findItem(resultManagerItemId)) {
							manager.addItem(resultManagerItem);
						}
						Terrasoft.Mask.hide(savingMaskId);
						this.onClose(resultManagerItemId);
					}, this);
				}
			},

			/**
			 * Returns placeholder for parameter selection control.
			 * @returns {String} Placeholder text.
			 */
			getParameterPlaceholder: function() {
				var result;
				var parameters = this._getFilteredProcessParameters();
				if (Ext.isEmpty(parameters)) {
					result = "";
				} else if (parameters.isEmpty()) {
					result = resources.localizableStrings.ParameterRecordNotFoundPlaceholder;
				} else {
					result = resources.localizableStrings.ParameterRecordPlaceholder;
				}
				return result;
			},

			/**
			 * Handles a click on the process designer button.
			 */
			onOpenProcessDesignerButtonClick: function() {
				var processRecord = this.get("ProcessRecord");
				var schemaUId = processRecord && processRecord.value;
				if (schemaUId) {
					this._getProcessActiveVersionUId(schemaUId, function(actualVerisonUId) {
						Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner(actualVerisonUId);
					}, this);
				} else {
					Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner();
				}
			},

			/**
			 * Prepares process list.
			 * @param {String} filter Lookup filter.
			 * @param {Terrasoft.Collection} list Item collection.
			 */
			prepareProcessList: function(filter, list) {
				var captionFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.CONTAIN,
					"Caption", filter);
				this._getFilteredProcessCollection(captionFilter, function(processCollection) {
					processCollection = this._prepareProcessCollection(processCollection);
					list.clear();
					list.loadAll(processCollection);
				}, this);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("ParameterRecord", this._parameterRecordValidator);
			},

			/**
			 * Returns run by record visibility.
			 * @returns {Boolean} Flag for run by record visiblity.
			 */
			getRunByRecordVisibility: function() {
				return !this.get("IsParameterRequired");
			},

			/**
			 * Process records change handler.
			 * @param model {Object} Backbone model.
			 * @param record {Object} New process record value.
			 */
			onProcessRecordChange: function(model, record) {
				var isInitialized = this.get("IsInitialized");
				if (!Ext.isEmpty(record) && isInitialized) {
					var maskId = Terrasoft.Mask.show({
						selector: Ext.String.format("#{0}", this.renderTo),
						timeout: 0
					});
					this._updateProcessInstance(function() {
						this._updateParameterRecord();
						Terrasoft.Mask.hide(maskId);
					}, this);
				}
			},

			/**
			 * Returns image config for open process designer button.
			 * @param {Object} processRecord Process record.
			 * @returns {Object} Image resource.
			 */
			getOpenProcessDesignerButtonImageConfig: function(processRecord) {
				return Ext.isEmpty(processRecord)
					? this.get("Resources.Images.AddButtonImage")
					: this.get("Resources.Images.OpenButtonImage");
			},

			/**
			 * Returns hint for open process designer button.
			 * @param {Object} processSchema Process schema.
			 * @return {Object} Hint caption.
			 */
			getOpenProcessDesignerButtonHint: function(processSchema) {
				return Ext.isEmpty(processSchema)
					? this.get("Resources.Strings.AddProcessButtonHintCaption")
					: this.get("Resources.Strings.OpenProcessButtonHintCaption");
			}
		},

		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "FixedAreaContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["modal-page-fixed-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "FixedAreaContainer",
				"propertyName": "items",
				"name": "HeadContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "HeadContainer",
				"propertyName": "items",
				"name": "HeaderNameContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-name-container", "header-name-container-full"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "HeaderNameContainer",
				"propertyName": "items",
				"name": "ModalBoxCaption",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ModalBoxCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "FixedAreaContainer",
				"propertyName": "items",
				"name": "CloseIcon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["close-btn-user-class"]},
					"click": {"bindTo": "onClose"}
				}
			},
			{
				"operation": "insert",
				"parentName": "FixedAreaContainer",
				"propertyName": "items",
				"name": "ControlContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["controls-container-modal-page"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ControlContainer",
				"propertyName": "items",
				"name": "ProcessContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["process-container-modal-page" ]
				}
			},
			{
				"operation": "insert",
				"parentName": "ProcessContainer",
				"propertyName": "items",
				"name": "ProcessSelectionLabel",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ProcessSelectionLabel"}
				}
			},
			{
				"operation": "insert",
				"name": "ProcessRecord",
				"parentName": "ProcessContainer",
				"propertyName": "items",
				"values": {
					"contentType": this.Terrasoft.ContentType.ENUM,
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareProcessList"
						},
						"enableLocalFilter": false
					},
					"wrapClass": ["no-caption-control", "process-selection" ]
				}
			},
			{
				"operation": "insert",
				"parentName": "ProcessContainer",
				"propertyName": "items",
				"name": "AddNewRecordButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {
						"bindTo": "ProcessRecord",
						"bindConfig": {
							"converter": "getOpenProcessDesignerButtonImageConfig"
						}
					},
					"hint": {
						"bindTo": "ProcessRecord",
						"bindConfig": {
							"converter": "getOpenProcessDesignerButtonHint"
						}
					},
					"classes": {
						"wrapperClass": ["open-designer-tool-button"]
					},
					"click": {
						"bindTo": "onOpenProcessDesignerButtonClick"
					}
				}
			},
			{
				"operation": "insert",
				"name": "RadioButtonsContainer",
				"parentName": "ControlContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "radio-buttons-container",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RadioButtonsContainerWrapper",
				"parentName": "RadioButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "getRunByRecordVisibility"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RunByRecordRadioGroup",
				"parentName": "RadioButtonsContainerWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": {"bindTo": "IsRunByRecord"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RunWithoutRecord",
				"parentName": "RunByRecordRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.RunWithoutRecordCaption"},
					"value": false
				}
			},
			{
				"operation": "insert",
				"name": "RunByRecord",
				"parentName": "RunByRecordRadioGroup",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.RunByRecordCaption"},
					"value": true
				}
			},
			{
				"operation": "insert",
				"parentName": "ControlContainer",
				"propertyName": "items",
				"name": "ParameterContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["process-container-modal-page" ,"parameter-container-modal-page"],
					"visible": {"bindTo": "IsRunByRecord"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterContainer",
				"propertyName": "items",
				"name": "ParameterSelectionLabel",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ParameterSelectionLabel"}
				}
			},
			{
				"operation": "insert",
				"name": "ParameterRecord",
				"parentName": "ParameterContainer",
				"propertyName": "items",
				"values": {
					"contentType": this.Terrasoft.ContentType.ENUM,
					"labelConfig": {
						"visible": false
					},
					"enabled": {
						"bindTo": "ProcessRecord"
					},
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareParametersList"
						},
						"placeholder": {
							"bindTo": "getParameterPlaceholder"
						}
					},
					"wrapClass": ["no-caption-control", "process-selection", "show-placeholder"]
				}
			},
			{
				"operation": "insert",
				"parentName": "FixedAreaContainer",
				"propertyName": "items",
				"name": "UtilsAreaEditPage",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["utils-container-modal-page"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "UtilsAreaEditPage",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"click": {"bindTo": "onSaveClick"},
					"classes": {"textClass": ["utils-buttons"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "UtilsAreaEditPage",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "onClose"},
					"classes": {"textClass": ["utils-buttons"]}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


