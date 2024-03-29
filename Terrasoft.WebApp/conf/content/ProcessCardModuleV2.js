﻿Terrasoft.configuration.Structures["ProcessCardModuleV2"] = {innerHierarchyStack: ["ProcessCardModuleV2"]};
define("ProcessCardModuleV2", ["ProcessHelper", "UserQuestionProcessPageV2Utilities", "AutoGeneratedPageV2Utilities",
	"BusinessRulesApplierV2", "ActivityPageV2Utilities", "ProcessModuleUtilities", "CardModuleV2"
], function(ProcessHelper, UserQuestionProcessPageV2Utilities, AutoGeneratedPageV2Utilities, BusinessRulesApplier,
		ActivityPageV2Utilities) {
	const ConcreteSchemaUtilitiesMap = {
		"UserQuestionProcessPageV2": UserQuestionProcessPageV2Utilities,
		"AutoGeneratedPageV2": AutoGeneratedPageV2Utilities,
		"ActivityPageV2": ActivityPageV2Utilities,
		"EmailPageV2": ActivityPageV2Utilities
	};

	/**
	 * @class Terrasoft.configuration.ProcessCardModule
	 * Class using for create card module by process.
	 */
	Ext.define("Terrasoft.configuration.ProcessCardModule", {
		alternateClassName: "Terrasoft.ProcessCardModule",
		extend: "Terrasoft.CardModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @override
		 */
		init: function() {
			this.registerMessages();
			const parentInit = this.getParentMethod();
			const parentArguments = arguments;
			this.initPrcExecData(function() {
				parentInit.apply(this, parentArguments);
			});
			if (Terrasoft.Features.getIsEnabled("OpenProcessPagesInChain")) {
				this.sandbox.publish("ScheduleReloadEntityOnRestore");
			}
		},

		/**
		 * Registers sandbox messages.
		 * @protected
		 */
		registerMessages: function() {
			this.sandbox.registerMessages({
				"ScheduleReloadEntityOnRestore": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
				}
			});
		},

		/**
		 * Overrides custom methods from utilities mixin depends on schema by schemaName.
		 * @protected
		 */
		initCustomMethods: function(schemaName) {
			const concreteUtilities = ConcreteSchemaUtilitiesMap[schemaName];
			if (concreteUtilities) {
				this.setCustomMethods(concreteUtilities);
			}
		},

		/**
		 * Overrides custom methods from implementor.
		 * @protected
		 * @param {Object} implementor Source schema mixin with custom methods.
		 */
		setCustomMethods: function(implementor) {
			this.getCustomDiff = implementor.getCustomDiff;
			this.getCustomAttributes = implementor.getCustomAttributes;
			this.getCustomValues = implementor.getCustomValues;
		},

		/**
		 * @inheritdoc Terrasoft.CardModule#initSchemaName
		 * @override
		 */
		initSchemaName: function() {
			const historyState = this.sandbox.publish("GetHistoryState");
			const state = historyState.state;
			if (state && state.isProcessCardInChain) {
				this.schemaName = state.schemaName;
				this.operation = state.operation;
				this.entitySchemaName = state.entitySchemaName;
				this.primaryColumnValue = state.primaryColumnValue;
			} else {
				const hash = historyState.hash;
				this.schemaName = hash.entityName;
				this.operation = hash.operationType;
				this.primaryColumnValue = hash.recordId;
			}
			this.initCustomMethods(this.schemaName);
		},

		/**
		 * @private
		 */
		_initProcessCard: function(callback) {
			const historyState = this.sandbox.publish("GetHistoryState");
			const hash = historyState.hash;
			const config = {
				procElUId: hash.valuePairs[0].name,
				recordId: hash.recordId,
				callbackMethod: function() {
					this.prcExecData = ProcessHelper.getProcessElementData(this.sandbox);
					this.setPrcExecDataParameters();
					this.Ext.callback(callback, this);
				}
			};
			Terrasoft.ProcessModuleUtilities.tryShowProcessCard.call(this, config);
		},

		/**
		 * Set parameters from data by process.
		 * @private
		 */
		setPrcExecDataParameters: function() {
			if (!this.prcExecData || Ext.isEmpty(this.prcExecData.parameters)) {
				return;
			}
			this.Terrasoft.each(this.prcExecData.parameters, function(param, name) {
				if (param && !this.Ext.isEmpty(param.dataValueType)) {
					this.prcExecData.parameters[name] =
						ProcessHelper.getClientValueByDataValueType(param.value, param.dataValueType);
				}
			}, this);
		},

		/**
		 * Init data by process.
		 * @param {Function} callback The callback function.
		 * @protected
		 */
		initPrcExecData: function(callback) {
			this.prcExecData = this.sandbox.publish("GetProcessExecData");
			if (!this.prcExecData) {
				this._initProcessCard(callback);
				return;
			}
			if (Terrasoft.ProcessExecutionDataUtils.getIsElementCompleted(this.prcExecData.procElUId)) {
				this.sandbox.publish("BackHistoryState");
				return;
			}
			this.setPrcExecDataParameters();
			this.Ext.callback(callback, this);
		},

		/**
		 * @protected
		 */
		getCustomDiff: function() {
			return [{
				"operation": "remove",
				"name": "BackButton"
			}];
		},

		/**
		 * @protected
		 */
		getCustomValues: function() {
			return this.prcExecData.parameters;
		},

		/**
		 * @protected
		 */
		getCustomAttributes: function() {
			return this.prcExecData.attributes;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getSchemaBuilderConfig
		 * @override
		 */
		getSchemaBuilderConfig: function() {
			const result = this.callParent(arguments);
			return Ext.apply(result, {
				isProcessMode: true,
				customDiff: this.getCustomDiff(this.prcExecData),
				customAttributes: this.getCustomAttributes(this.prcExecData),
				useCache: false
			});
		},

		/**
		 * @inheritdoc Terrasoft.CardModule#getIsSeparateMode
		 * @override
		 */
		getIsSeparateMode: function() {
			return false;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#createViewModel
		 * @override
		 */
		createViewModel: function(viewModelClass) {
			const values = {
				IsSeparateMode: this.isSeparateMode,
				PrimaryColumnValue: this.primaryColumnValue,
				Operation: this.operation,
				IsInChain: this.isInChain,
				IsProcessMode: true,
				ProcessData: this.prcExecData
			};
			Ext.apply(values, this.getCustomValues(this.prcExecData));
			const viewModel = this.Ext.create(viewModelClass, {
				Ext: this.Ext,
				sandbox: this.sandbox,
				Terrasoft: this.Terrasoft,
				values: values
			});
			if (viewModel.type === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
				BusinessRulesApplier.applyDependencies(viewModel);
			}
			return viewModel;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getViewConfig
		 * @override
		 */
		getViewConfig: function() {
			const viewConfig = this.callParent(arguments);
			if (viewConfig && viewConfig.classes && viewConfig.classes.wrapClassName) {
				viewConfig.classes.wrapClassName.push("process-card-module");
			}
			return viewConfig;
		},

		/**
		 * @inheritdoc Terrasoft.ProcessCardModuleMixin#getCanTryShowProcessCard
		 * @override
		 */
		getCanTryShowProcessCard: function() {
			return false;
		}
	});

	return Terrasoft.ProcessCardModule;
});


