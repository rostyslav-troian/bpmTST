Terrasoft.configuration.Structures["ConditionalSequenceFlowPropertiesPage"] = {innerHierarchyStack: ["ConditionalSequenceFlowPropertiesPage"], structureParent: "SequenceFlowPropertiesPage"};
define('ConditionalSequenceFlowPropertiesPageStructure', ['ConditionalSequenceFlowPropertiesPageResources'], function(resources) {return {schemaUId:'105babd3-2923-44c1-9000-b7ce647bbdca',schemaCaption: "ConditionalSequenceFlow properties page", parentSchemaName: "SequenceFlowPropertiesPage", schemaName:'ConditionalSequenceFlowPropertiesPage',parentSchemaUId:'4bb13517-bffd-4f21-8ac3-a05ca406cd5e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ConditionalSequenceFlow edit page schema.
 * Parent: SequenceFlowPropertiesPage.
 */
define("ConditionalSequenceFlowPropertiesPage", ["terrasoft", "ProcessSchemaUserTaskUtilities",
	"ConditionalSequenceFlowPropertiesPageResources", "SchemaBuilderV2", "MappingEditMixin"
], function(Terrasoft, processSchemaUserTaskUtilities) {
	return {
		mixins: {
			mappingEdit: "Terrasoft.MappingEditMixin"
		},
		messages: {
			/**
			 * @message GetParametersInfo
			 * Pass parameter values.
			 */
			"GetParametersInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SetParametersInfo
			 * Specifies parameter values.
			 */
			"SetParametersInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SaveParameterInfo
			 * Save parameter info message.
			 */
			"SaveParameterInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message DiscardParameterInfoChanges
			 * Close and unloads parameter edit page message.
			 */
			"DiscardParameterInfoChanges": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetParameterEditInfo
			 * Sends parameter info to parameter edit page message.
			 */
			"GetParameterEditInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ProcessActivitiesSelectedResultsChanged
			 * Receive selected results of ConditionalSequenceFlow element.
			 */
			"ProcessActivitiesSelectedResultsChanged": {
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
				"mode": Terrasoft.MessageMode.PTP
			},
			/**
			 * @message GetConditionalSequenceFlowData
			 * Returns data for conditional sequence flow. Data contains previous ProcessActivity element, its
			 * result parameter possible values and conditions designed before.
			 */
			"GetConditionalSequenceFlowData": {
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
				"mode": Terrasoft.MessageMode.PTP
			}
		},
		attributes: {
			/**
			 * Selected results of ConditionalSequenceFlow element.
			 */
			"ProcessActivitiesSelectedResults": {
				dataValueType: Terrasoft.DataValueType.OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Previous ProcessActivity of ConditionalSequenceFlow element.
			 */
			"SourceProcessActivityElement": {
				dataValueType: Terrasoft.DataValueType.OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Previous ProcessActivity element result parameter all possible values.
			 */
			"SourceProcessActivityResultParameterAllValues": {
				dataValueType: Terrasoft.DataValueType.OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Sequence flow condition expression formula.
			 */
			"Formula": {
				dataValueType: Terrasoft.DataValueType.MAPPING,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Sequence flow condition expression.
			 */
			"ConditionExpression": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Edit page schema name for editing conditions if previous element is ProcessActivity.
			 */
			"ProcessActivityConditionalSequenceFlowEditPageName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "ActivityConditionalSequenceFlowEditPage"
			},

			/**
			 * Flag that indicates whether formula is initialized.
			 */
			"IsFormulaInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Initializes Sequence flow condition expression.
			 * @private
			 * @param {Terrasoft.ProcessConditionalSequenceFlowSchema} sequenceFlow Conditional sequence flow.
			 */
			initConditionExpression: function(sequenceFlow) {
				var formulaValue = sequenceFlow.conditionExpression;
				if (!formulaValue || (formulaValue === "null")) {
					formulaValue = "";
				}
				this.$ConditionExpression = formulaValue;
				this.setFormulaValue("");
			},

			/**
			 * Shows formula edit control.
			 * @private
			 */
			showFormulaEdit: function() {
				this.convertFormulaBodyToDisplayCode(this.$ConditionExpression, function(displayValue) {
					this.setFormulaValue(displayValue);
					this.onFormulaInitialized();
				});
			},

			/**
			 * Sets formula expression value.
			 * @private
			 * @param {String} displayValue Formula display value.
			 */
			setFormulaValue: function(displayValue) {
				var formula = {
					isValid: true,
					value: this.$ConditionExpression,
					displayValue: displayValue,
					source: Terrasoft.ProcessSchemaParameterValueSource.Mapping,
					referenceSchemaUId: null,
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				};
				this.set("Formula", formula);
			},

			/**
			 * Convert formula body to display code.
			 * @private
			 * @param {String} formulaBody Formula body.
			 * @param {Function} callback Callback function.
			 */
			convertFormulaBodyToDisplayCode: function(formulaBody, callback) {
				var parentSchema = this.get("ProcessElement").parentSchema;
				Terrasoft.FormulaParserUtils.getFormulaDisplayValue(formulaBody, parentSchema, callback, this);
			},

			/**
			 * Callback function for getting ProcessActivity element edit page schema name.
			 * Build ProcessActivityViewModel by received schema and request result parameter all available
			 * values.
			 * @private
			 * @param {String} editPageSchemaName Name of ProcessActivity element edit page schema.
			 */
			onGetProcessActivityEditPageSchemaName: function(editPageSchemaName) {
				var viewModel;
				var schemaBuilder = this.getSchemaBuilder();
				Terrasoft.chain(
					function(next) {
						schemaBuilder.build({schemaName: editPageSchemaName}, next, this);
					},
					function(next, viewModelClass) {
						viewModel = this.createProcessActivityViewModel(viewModelClass);
						this.processActivityViewModel = viewModel;
						viewModel.init(next, this);
					},
					function(next) {
						schemaBuilder.destroy({});
						viewModel.getResultParameterAllValues(next, this);
					},
					function(next, resultParameterValues) {
						const values = Terrasoft.sortObj(resultParameterValues);
						this.onResultParameterValuesLoaded(values);
					}, this);
			},

			/**
			 * Validates Formula value.
			 * @private
			 * @param  {Object} value Mapping value.
			 * @return {Object} Validation info
			 * @return {Object} return.isValid Validation result.
			 * @return {Object} return.invalidMessage Validation message.
			 */
			validateFormula: function(value) {
				var validationInfo = {
					invalidMessage: ""
				};
				if (this.$IsFormulaInitialized) {
					validationInfo = processSchemaUserTaskUtilities.validateMappingValue(value);
				}
				return validationInfo;
			},

			/**
			 * @private
			 */
			_actualizeProcessActivitiesSelectedResults: function(resultParameterValues) {
				var values = _.keys(resultParameterValues);
				_.each(this.$ProcessActivitiesSelectedResults, function(results, key) {
					this.$ProcessActivitiesSelectedResults[key] = _.intersection(values, results);
				}, this);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
			 * @override
			 */
			onElementDataLoad: function(sequenceFlow, callback, scope) {
				this.callParent([sequenceFlow, function() {
					this.$ProcessActivitiesSelectedResults = sequenceFlow.processActivitiesSelectedResults;
					this.initConditionExpression(sequenceFlow);
					var sandbox = this.sandbox;
					var messagesTags = [sandbox.id + "-edit-module"];
					sandbox.subscribe("ProcessActivitiesSelectedResultsChanged",
						this.onProcessActivitiesSelectedResultsChanged, this, messagesTags);
					sandbox.subscribe("GetConditionalSequenceFlowData", this.onGetConditionalSequenceFlowData,
						this, messagesTags);
					callback.call(scope);
				}, this]);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#onPageModeClick
			 * @override
			 */
			onPageModeClick: function() {
				this.callParent(arguments);
				if (!this.$IsExtendedMode && !this.$IsFormulaInitialized) {
					this.loadEditPage(this.$ProcessActivityConditionalSequenceFlowEditPageName);
				}
			},

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent();
				this.loadEditModule(this.$ProcessElement);
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#saveValues
			 * @override
			 */
			saveValues: function() {
				this.callParent(arguments);
				const results = Terrasoft.deleteEmptyItems(this.$ProcessActivitiesSelectedResults);
				const formula = this.$Formula ? this.$Formula.value : "";
				this.$ProcessElement.setPropertyValue("processActivitiesSelectedResults", results);
				this.$ProcessElement.setPropertyValue("conditionExpression", formula);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.mixins.editable.onDestroy.call(this);
				Terrasoft.safeDestroy(this.processActivityViewModel);
				this.callParent(arguments);
				this.sandbox.unloadModule(this.sandbox.id + "-edit-module");
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#customValidator
			 * @override
			 */
			customValidator: function() {
				var validationInfo = this.validateProcessActivitiesSelectedResult();
				return validationInfo;
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Formula", this.validateFormula);
			},

			/**
			 * Calls after schema initialized.
			 * @protected
			 */
			onFormulaInitialized: function() {
				this.$IsFormulaInitialized = true;
				this.validateAfterDataLoaded();
			},

			/**
			 * Validates ProcessActivitiesSelectedResult attribute.
			 * @protected
			 * @return {Object} Validation info
			 * @return {Object} return.isValid Validation result.
			 * @return {Object} return.invalidMessage Validation message.
			 */
			validateProcessActivitiesSelectedResult: function() {
				var invalidMessage = this.get("Resources.Strings.ConditionalSequenceFlowInvalidMessage");
				var isValid = false;
				if (this.$IsFormulaInitialized) {
					return {
						invalidMessage: ""
					};
				}
				var results = this.$ProcessActivitiesSelectedResults;
				if (!Terrasoft.isEmptyObject(results)) {
					Terrasoft.each(results, function(result) {
						if (result.length > 0) {
							isValid = true;
							return true;
						}
					}, this);
				}
				var validationInfo = {
					isValid: isValid,
					invalidMessage: isValid ? "" : invalidMessage
				};
				this.addCustomValidationResult(validationInfo);
				return validationInfo;
			},

			// endregion

			// region Methods: Public

			/**
			 * Returns data for conditional sequence flow. Data contains previous ProcessActivity element, its
			 * result parameter possible values and conditions designed before.
			 * @return {Object} Conditional sequence flow data.
			 * @return {Terrasoft.ProcessUserTaskSchema} return.processActivityElement Previous ProcessActivity
			 * element.
			 * @return {Object} return.resultParameterValues  Object of key-value pairs of possible previous
			 * ProcessActivity element result parameter values. Key - is result UId, value - is result caption.
			 * @return {Object} return.selectedResults Conditions designed before. Key - ProcessActivity uId,
			 * value - object of key-value pairs conditions.
			 */
			onGetConditionalSequenceFlowData: function() {
				Terrasoft.Mask.hide(this.maskId);
				this.maskId = null;
				var sequenceFlow = this.get("ProcessElement");
				return {
					processActivityElement: this.$SourceProcessActivityElement,
					resultParameterValues: this.$SourceProcessActivityResultParameterAllValues,
					selectedResults: sequenceFlow.processActivitiesSelectedResults || {}
				};
			},

			/**
			 * ProcessActivitiesSelectedResultsChanged message handler. Save selected results conditions
			 * into ProcessActivitiesSelectedResults attribute.
			 * @param {Object} results Selected results and captions.
			 * @param {String[]} results.resultsCaptions Captions of the selected conditions.
			 * @param {Object} results.selectedResults Selected results. Key - ProcessActivity uId, value -
			 * object of key-value pairs conditions.
			 */
			onProcessActivitiesSelectedResultsChanged: function(results) {
				var selectedResults = results.selectedResults;
				var resultsCaptions = results.resultsCaptions;
				var sequenceFlowCaption = resultsCaptions.join(", ");
				this.set("caption", sequenceFlowCaption);
				this.$ProcessActivitiesSelectedResults = selectedResults;
			},

			/**
			 * Loads module for conditionals edit. If previous element is ProcessActivity,
			 * load ActivityConditionalSequenceFlowEditPage.
			 * @param {Terrasoft.ProcessConditionalSequenceFlowSchema} sequenceFlow Conditional sequence flow.
			 */
			loadEditModule: function(sequenceFlow) {
				var sourceProcessActivityElement = null;
				var previousElements = this.getProcessActivities(sequenceFlow);
				var resultActivities = previousElements.filter(function(element) {
					var resultParameter = element.getResultParameter();
					return resultParameter != null;
				});
				if (resultActivities.length === 1) {
					this.maskId = Terrasoft.Mask.show({
						selector: "#EditorsContainer",
						clearMasks: true
					});
					sourceProcessActivityElement = resultActivities[0];
					this.$SourceProcessActivityElement = sourceProcessActivityElement;
					sourceProcessActivityElement.getEditPageSchemaName(
						this.onGetProcessActivityEditPageSchemaName, this);
				} else {
					this.showFormulaEdit();
				}
			},

			/**
			 * Returns SchemaBuilder class instance.
			 * @return {Terrasoft.SchemaBuilder} SchemaBuilder.
			 */
			getSchemaBuilder: function() {
				return Ext.create("Terrasoft.SchemaBuilder");
			},

			/**
			 * Returns config for previous ProcessActivity element edit page view model.
			 * @return {Object} ProcessActivity element viewModel config.
			 */
			getProcessActivityViewModelConfig: function() {
				return {
					Ext: Ext,
					sandbox: this.sandbox,
					Terrasoft: Terrasoft,
					tag: this.$SourceProcessActivityElement.name,
					isReadonly: true,
					useNotification: false
				};
			},

			/**
			 * Creates ProcessActivityViewModel by passed viewModel class.
			 * @param {Object} processActivityViewModelClass ViewModel class.
			 * @return {Terrasoft.BaseViewModel} ProcessActivity element viewModel.
			 */
			createProcessActivityViewModel: function(processActivityViewModelClass) {
				var viewModelConfig = this.getProcessActivityViewModelConfig();
				return Ext.create(processActivityViewModelClass, viewModelConfig);
			},

			/**
			 * Callback function for getResultParameterAllValues method invocation.
			 * @param {Object} values Object of key-value pairs for possible sequence flow
			 * conditions. Key - is result UId, value - is result caption. If result is not empty, load
			 * ProcessActivityConditionalSequenceFlowEditPage, else load formula edit.
			 */
			onResultParameterValuesLoaded: function(values) {
				this._actualizeProcessActivitiesSelectedResults(values);
				if (Terrasoft.isEmptyObject(values)) {
					this.showFormulaEdit();
					Terrasoft.Mask.hide(this.maskId);
					this.maskId = null;
				} else {
					this.$ConditionExpression = "";
					this.$SourceProcessActivityResultParameterAllValues = this.filterResultParameterValues(values);
					this.loadEditPage(this.$ProcessActivityConditionalSequenceFlowEditPageName);
				}
			},

			/**
			 * Loads edit page by BaseSchemaModuleV2.
			 * @param {String} editPageName Edit page name.
			 */
			loadEditPage: function(editPageName) {
				this.sandbox.loadModule("BaseSchemaModuleV2", {
					id: this.sandbox.id + "-edit-module",
					renderTo: "EditorsContainer",
					instanceConfig: {
						schemaName: editPageName,
						isSchemaConfigInitialized: true,
						useHistoryState: false,
						autoGeneratedContainerSuffix: "-prSchElPropCt",
						showMask: true
					}
				});
			},

			/**
			 * Filter possible previous ProcessActivity result parameter values by already designed conditions
			 * in other conditional sequence flow.
			 * @param {Object} resultParameterValues Object of key-value pairs for possible sequence flow
			 * conditions. Key - is result UId, value - is result caption.
			 * @return {Object} Filtered possible parameter values.
			 */
			filterResultParameterValues: function(resultParameterValues) {
				var filteredResultParameterValues = Terrasoft.deepClone(resultParameterValues);
				var sequenceFlow = this.get("ProcessElement");
				var sequenceFlowSourceElement = sequenceFlow.findSourceElement();
				var outgoingsSequenceFlows = sequenceFlowSourceElement.getOutgoingsSequenceFlows();
				outgoingsSequenceFlows.forEach(function(outgoingSequenceFlow) {
					var isConditionalSequenceFlow =
						outgoingSequenceFlow instanceof Terrasoft.ProcessConditionalSequenceFlowSchema;
					if (isConditionalSequenceFlow && outgoingSequenceFlow.uId !== sequenceFlow.uId) {
						var activitiesSelectedResults = outgoingSequenceFlow.processActivitiesSelectedResults;
						var selectedResults = activitiesSelectedResults[this.$SourceProcessActivityElement.uId];
						if (selectedResults != null) {
							Terrasoft.each(selectedResults, function(resultUId) {
								delete filteredResultParameterValues[resultUId];
							}, this);
						}
					}
				}, this);
				return filteredResultParameterValues;
			},

			/**
			 * Returns ProcessActivities from which conditional sequence flow starts. If sequence flow has
			 * selected results designed before, returns ProcessActivities for designer results.
			 * Otherwise returns every ProcessActivity even it is before gateway.
			 * @param {Terrasoft.ProcessConditionalSequenceFlowSchema} sequenceFlow Conditional sequence flow.
			 * @return {Terrasoft.ProcessActivitySchema[]} Process activities.
			 */
			getProcessActivities: function(sequenceFlow) {
				var previousProcessActivities = this.getProcessActivityBySelectedResults(sequenceFlow);
				if (Ext.isEmpty(previousProcessActivities)) {
					previousProcessActivities = this.getPreviousProcessActivities(sequenceFlow);
				}
				return previousProcessActivities;
			},

			/**
			 * Returns previous ProcessActivity by conditional sequence flow selected results.
			 * If ProcessActivity was deleted from schema after saving results, returns empty collection.
			 * @param {Terrasoft.ProcessConditionalSequenceFlowSchema} sequenceFlow Conditional sequence flow.
			 * @return {Terrasoft.ProcessActivitySchema[]} Previous process activity.
			 */
			getProcessActivityBySelectedResults: function(sequenceFlow) {
				var previousProcessActivities = [];
				var processActivitiesSelectedResults = sequenceFlow.processActivitiesSelectedResults;
				Terrasoft.each(processActivitiesSelectedResults, function(activityResults, elementUId) {
					if (!Ext.Object.isEmpty(activityResults)) {
						var previousActivity = sequenceFlow.findItemByUId(elementUId);
						if (previousActivity != null) {
							previousProcessActivities.push(previousActivity);
						}
					}
					return (previousProcessActivities.length === 0);
				});
				return previousProcessActivities;
			},

			/**
			 * Returns ProcessActivities from which conditional sequence flow starts even it is before gateway.
			 * @param {Terrasoft.ProcessConditionalSequenceFlowSchema} sequenceFlow Conditional sequence flow.
			 * @return {Terrasoft.ProcessActivitySchema[]} Previous process activities.
			 */
			getPreviousProcessActivities: function(sequenceFlow) {
				var result = [];
				var sourceElement = sequenceFlow.findSourceElement();
				if (sourceElement instanceof Terrasoft.ProcessUserTaskSchema) {
					result.push(sourceElement);
				}
				if (sourceElement instanceof Terrasoft.ProcessBaseGatewaySchema) {
					var gatewayIncomingSequenceFlows = sourceElement.getIncomingSequenceFlows();
					gatewayIncomingSequenceFlows.forEach(function(flow) {
						if (flow instanceof Terrasoft.ProcessConditionalSequenceFlowSchema) {
							return;
						}
						var processElement = flow.findSourceElement();
						if (processElement instanceof Terrasoft.ProcessUserTaskSchema) {
							result.push(processElement);
						}
					}, this);
				}
				return result;
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "EditorsContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "EditorsContainer",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FormulaContainer",
				"propertyName": "items",
				"parentName": "EditorsContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "IsFormulaInitialized"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FormulaLabel",
				"parentName": "FormulaContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.FormulaCaption"},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"styles": {
						"labelStyle": {
							"color": "#839DC3"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "Formula",
				"parentName": "FormulaContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"wrapClass": ["no-caption-control"],
					"menu": null
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


