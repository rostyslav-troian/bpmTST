Terrasoft.configuration.Structures["ProcessListenerV2"] = {innerHierarchyStack: ["ProcessListenerV2"]};
define("ProcessListenerV2", [
		"ProcessListenerV2Resources",
		"ProcessModuleUtilities",
		"MaskHelper",
		"BaseModule",
		"MiniPageUtilities",
		"ProcessExecutionQueue",
		"ConfigurationEnums"
	],
	function(resources, ProcessModuleUtilities, MaskHelper) {
		Ext.define("Terrasoft.configuration.ProcessListener", {
			extend: "Terrasoft.BaseModule",
			alternateClassName: "Terrasoft.ProcessListener",

			mixins: {
				MiniPageUtilities: "Terrasoft.MiniPageUtilities"
			},

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			processCardModuleName: "ProcessCardModuleV2",

			isProcessModeRegExp: "ProcessCardModuleV2/?",

			/**
			 * Queue contains data of current executing process elements.
			 * @private
			 * @type {Terrasoft.ProcessExecutionQueue}
			 */
			executionQueue: null,

			/**
			 * Last running process identifier.
			 * @private
			 * @type {String}
			 */
			_lastProcessId: null,

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.executionQueue = Ext.create("Terrasoft.ProcessExecutionQueue");
			},

			/**
			 * Returns messages configuration.
			 * @private
			 * @return {Object}
			 */
			_getMessages: function() {
				return {

					/**
					 * @message CanChangeHistoryState
					 * Used to check if any active module forbid change of current history state.
					 * @param {Boolean} result Flag that indicates whether the state can be changed.
					 */
					"CanChangeHistoryState": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message BackHistoryState
					 * Used to change current history state.
					 */
					"BackHistoryState": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				};
			},

			/**
			 * Initializes module.
			 */
			init: function() {
				this.executionQueue.on("enqueued", this._onQueueItemReceived, this);
				var sandbox = this.sandbox;
				sandbox.registerMessages(this._getMessages());
				sandbox.subscribe("ProcessExecDataChanged", this.getProcessExecData, this);
				sandbox.subscribe("GetProcessExecData", this.onGetProcessExecData, this);
				sandbox.subscribe("GetProcessEntryPointsData", this.onGetProcessEntryPointsData, this);
				sandbox.subscribe("OnCardModuleSaved", this.onCardModuleSaved, this);
				sandbox.subscribe("ChangeNextProcExecDataHistoryState", this.changeNextProcExecDataHistoryState, this);
				sandbox.subscribe("ChangeCurrentProcExecItemInHistoryState",
					this.changeCurrentProcExecItemInHistoryState, this);
				sandbox.subscribe("PostponeProcessExecution", this.postponeProcessExecution, this);
				sandbox.subscribe("CompleteProcessExecution", this.completeExecution, this);
				sandbox.subscribe("CancelProcessExecution", this.cancelExecution, this);
				sandbox.subscribe("CallProcessServiceMethod", this.onCallConfigurationServiceMethod, this);
				Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onNextProcessElementReady, this);
			},

			/**
			 * Returns true if loaded modules allow change of history state, otherwise false.
			 * @private
			 * @return {Boolean}
			 */
			_getCanChangeHistoryState: function() {
				var args = {result: true};
				this.sandbox.publish("CanChangeHistoryState", args);
				return !!args.result;
			},

			/**
			 * Handler for itemReceived event of {@ink #executionQueue}.
			 * @private
			 */
			_onQueueItemReceived: function() {
				const canChangeState = this._getCanChangeHistoryState();
				if (!canChangeState) {
					return;
				}
				const item = this.executionQueue.dequeue();
				this._tryUpdateEditPageOperationInHistoryState(function() {
					this.changeNextProcExecDataHistoryState(item);
				}, this);
			},

			/**
			 * Opens page for next item in {@ink #executionQueue} if it exists.
			 * @private
			 * @param {Boolean} [forceChangeHistoryState] If defined as true the check of permission to change
			 * history state will be skipped.
			 * @param recordPrimaryColumnValue
			 * @return {Boolean} True if queue item was processed, otherwise false.
			 */
			_tryExecuteQueueItemOnEntitySaved: function(forceChangeHistoryState, recordPrimaryColumnValue) {
				const canChangeState = forceChangeHistoryState || this._getCanChangeHistoryState();
				if (!canChangeState) {
					return false;
				}
				const item = this.executionQueue.dequeue();
				if (item) {
					this.changeNextProcExecDataHistoryState(item, {
						beforePublishHistoryStateConfig: {
							recordPrimaryColumnValue: recordPrimaryColumnValue,
							callback: this._actualizeCardModuleHistoryState,
							scope: this
						}
					});
					return true;
				}
				return false;
			},

			/**
			 * Replaces the history state.
			 * @private
			 * @param {Object} currentState Current history state.
			 * @param {Object} newState New history state.
			 */
			_silentReplaceHistoryState: function(currentState, newState) {
				this.sandbox.publish("ReplaceHistoryState", {
					stateObj: newState,
					pageTitle: null,
					hash: currentState.hash.historyState,
					silent: true
				});
			},

			/**
			 * @private
			 * @param {Object} message Server message.
			 * @return {Boolean}
			 */
			_isProcessEngineSender: function(message) {
				return message.Header.Sender === "ProcessEngine";
			},

			/**
			 * @private
			 * @param {Object} currentExecutionData Current execution data.
			 * @param {Object} executionData New execution data.
			 * @return {Boolean}
			 */
			_isRunAnotherProcess: function(currentExecutionData, executionData) {
				var isRunAnotherProcess = this.Terrasoft.isGUID(executionData.processId) &&
					!Ext.isEmpty(currentExecutionData) &&
					this.Terrasoft.isGUID(currentExecutionData.processId) &&
					executionData.processId !== currentExecutionData.processId;
				return isRunAnotherProcess;
			},

			/**
			 * @private
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} executionData New execution data.
			 * @param {Object} newState New history state.
			 * @return {Boolean}
			 */
			_isAddDetailRecord: function(processExecDataItem, executionData, newState) {
				var isAddDetailRecord = processExecDataItem.isProcessExecutedBySignal && executionData.isNew === true &&
					newState.operation === "add";
				return isAddDetailRecord;
			},

			/**
			 * @private
			 */
			_getIsAddInChainMode: function(state) {
				return state.operation === "add" && state.isInChain;
			},

			/**
			 * @private
			 */
			_updateEditPageOperationInHistoryState: function(currentState, primaryColumnValue) {
				const stateObject = Terrasoft.deepClone(currentState.state || {});
				stateObject.operation = "edit";
				if (primaryColumnValue) {
					stateObject.primaryColumnValue = primaryColumnValue;
				}
				this._silentReplaceHistoryState(currentState, stateObject);
			},

			/**
			 * @private
			 */
			_getIsRecordInfoChangedInHistoryState: function(initialStateObject, newState) {
				let currentState = newState.state || {};
				return initialStateObject.entitySchemaName !== currentState.entitySchemaName ||
					initialStateObject.primaryColumnValue !== currentState.primaryColumnValue;
			},

			/**
			 * @private
			 */
			_tryUpdateEditPageOperationInHistoryState: function(callback, scope) {
				const initialHistoryState = this.sandbox.publish("GetHistoryState");
				const initialStateObject = initialHistoryState.state;
				const isAddInChainMode = this._getIsAddInChainMode(initialStateObject);
				let primaryColumnValue = initialStateObject.primaryColumnValue;
				if (isAddInChainMode && !Ext.isEmpty(primaryColumnValue)) {
					let schemaName = initialStateObject.entitySchemaName;
					this._getIsRecordExist(schemaName, primaryColumnValue, function(result) {
						if (result) {
							const currentState = this.sandbox.publish("GetHistoryState");
							if (this._getIsRecordInfoChangedInHistoryState(initialStateObject, currentState)) {
								this.log("Entity info in the history state has changed while check record exist in DB. " +
									"The history state has not been updated.", Terrasoft.LogMessageType.WARNING);
							} else {
								this._updateEditPageOperationInHistoryState(currentState);
							}
						}
						Ext.callback(callback, scope);
					}, this);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * @private
			 */
			_getIsRecordExist: function(schemaName, primaryColumnValue, callback, scope) {
				const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: schemaName
				});
				esq.getEntity(primaryColumnValue, function(result) {
					callback.call(scope, Boolean(result.entity));
				}, this);
			},

			/**
			 * @private
			 */
			_findNextElementExecutionData: function(executionData) {
				delete executionData[executionData.currentProcElUId];
				let nextElementExecutionData = null;
				this.Terrasoft.each(executionData, function(elementExecutionData) {
					if (nextElementExecutionData) {
						return false;
					}
					if (elementExecutionData && !Ext.isFunction(elementExecutionData) &&
						!Ext.isEmpty(elementExecutionData.procElUId)) {
						nextElementExecutionData = elementExecutionData;
					}
				}, this);
				return nextElementExecutionData;
			},

			/**
			 * @private
			 */
			_actualizeCardModuleHistoryState: function(options, currentHistory, navigationEventName) {
				if (navigationEventName !== "PushHistoryState") {
					return;
				}
				if (currentHistory.state &&
						currentHistory.state.operation === Terrasoft.ConfigurationEnums.CardOperation.ADD &&
						Terrasoft.isGUID(options.recordPrimaryColumnValue)) {
					this._updateEditPageOperationInHistoryState(currentHistory, options.recordPrimaryColumnValue);
				}
			},

			/**
			 * Handler for Terrasoft.ServerChannel. Processes message from ProcessEngine.
			 * @protected
			 * @param {Object} scope Message scope.
			 * @param {Object} message Server message.
			 */
			onNextProcessElementReady: function(scope, message) {
				if (this._isProcessEngineSender(message)) {
					var nextProcessData = Ext.decode(message.Body);
					var nextProcessId = nextProcessData.processId;
					var currentState = this.sandbox.publish("GetHistoryState");
					var isNew = Ext.isEmpty(currentState.hash.historyState.match(this.isProcessModeRegExp));
					if (isNew) {
						this._lastProcessId = null;
					}
					if ((!isNew && this._lastProcessId === nextProcessId) || document.hasFocus()) {
						var processData = (currentState.state && currentState.state.executionData) || {};
						if (isNew === true || Ext.isEmpty(processData.processId) || processData.processId === nextProcessId) {
							if (isNew === true) {
								processData = {};
							}
							processData = Ext.apply({}, processData, nextProcessData);
							processData.isNew = isNew;
						} else {
							MaskHelper.HideBodyMask();
							return;
						}
						this.executionQueue.enqueue(processData);
						return;
					}
				}
				if (message.Header.Sender === "ProcessEngineBackHistoryState") {
					this.sandbox.publish("BackHistoryState");
				}
			},

			/**
			 * Handler for ChangeCurrentProcExecItemInHistoryState message.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 */
			changeCurrentProcExecItemInHistoryState: function(processExecDataItem) {
				const currentState = this.sandbox.publish("GetHistoryState");
				const newState = this.Terrasoft.deepClone(currentState.state || {});
				newState.executionData.currentProcElUId = processExecDataItem.procElUId;
				this.changeHistoryState(processExecDataItem, currentState, newState);
			},

			/**
			 * Handler for ChangeNextProcExecDataHistoryState message.
			 * @protected
			 * @param {Object} executionData Process execution data object.
			 * @param [options]
			 */
			changeNextProcExecDataHistoryState: function(executionData, options) {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				let nextElementExecutionData = this._findNextElementExecutionData(executionData);
				if (nextElementExecutionData) {
					executionData.currentProcElUId = nextElementExecutionData.procElUId;
				}
				const newHistoryState = this.Terrasoft.deepClone(currentHistory.state || {});
				newHistoryState.executionData = executionData;
				this.changeHistoryState(nextElementExecutionData, currentHistory, newHistoryState, options);
			},

			/**
			 * Changes current history state.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} currentHistory Current history state.
			 * @param {Object} newState New history state.
			 * @param [options]
			 */
			changeHistoryState: function(processExecDataItem, currentHistory, newState, options) {
				if (Ext.isEmpty(processExecDataItem)) {
					this.sandbox.publish("BackHistoryState");
					MaskHelper.HideBodyMask();
					return;
				}
				const navigationEventName = this.getNavigationEventName(processExecDataItem, currentHistory, newState);
				const newHistoryState = this.getNavigationEventArguments(processExecDataItem, currentHistory, newState);
				if (newHistoryState) {
					this._lastProcessId = processExecDataItem.processId;
					if (!Ext.isEmpty(options) && !Ext.isEmpty(options.beforePublishHistoryStateConfig) ) {
						const beforePublishHistoryStateConfig = options.beforePublishHistoryStateConfig;
						Ext.callback(beforePublishHistoryStateConfig.callback, beforePublishHistoryStateConfig.scope,
							[beforePublishHistoryStateConfig, currentHistory, navigationEventName, newHistoryState]);
					}
					this.sandbox.publish(navigationEventName, newHistoryState);
				}
			},

			/**
			 * Returns navigation event name.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} currentState Current history state.
			 * @param {Object} newState New history state.
			 * @return {String} Navigation event name.
			 */
			getNavigationEventName: function(processExecDataItem, currentState, newState) {
				let navigationEventName = "PushHistoryState";
				const executionData = newState.executionData;
				const currentExecutionData = currentState.state ? currentState.state.executionData : {};
				const isRunAnotherProcess = this._isRunAnotherProcess(currentExecutionData, executionData);
				const isProcessMode = !Ext.isEmpty(currentState.hash.historyState.match(this.isProcessModeRegExp));
				const isAddDetailRecord = this._isAddDetailRecord(processExecDataItem, executionData, newState);
				const isCurrentStateAddAction = currentState.hash.operationType === "add";
				if (executionData.forceReplaceHistoryState ||
						(isProcessMode && (!isRunAnotherProcess || isCurrentStateAddAction)) ||
						(executionData.showNextPrcEl === false) || isAddDetailRecord) {
					navigationEventName = "ReplaceHistoryState";
				}
				return navigationEventName;
			},

			/**
			 * @private
			 */
			_getCanShowNextPrcEl: function(processExecDataItem, executionData, currentState) {
				var showNextPrcEl = executionData.showNextPrcEl || !this._isInCardMode(currentState.state) ||
					((executionData.isNew === true) && (!processExecDataItem.isProcessExecutedBySignal));
				return showNextPrcEl;
			},

			/**
			 * Returns navigation event arguments.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} currentState Current history state.
			 * @param {Object} newState New history state.
			 * @return {Object} Navigation event arguments object.
			 */
			getNavigationEventArguments: function(processExecDataItem, currentState, newState) {
				var executionData = newState.executionData;
				var showNextPrcEl = this._getCanShowNextPrcEl(processExecDataItem, executionData, currentState);
				var token = currentState.hash.historyState;
				if (showNextPrcEl) {
					if (processExecDataItem.urlToken) {
						token = processExecDataItem.urlToken;
					} else {
						let config = {};
						if (!this._getConfig(processExecDataItem.entitySchemaName, config)) {
							return;
						}
						var cardSchemaName = config.cardSchema;
						if (config.attribute) {
							processExecDataItem.typeColumnName = config.attribute;
						}
						Terrasoft.each(config.pages, function(page) {
							if (processExecDataItem.pageTypeId === page.UId && page.cardSchema) {
								cardSchemaName = page.cardSchema;
							}
						}, this);
						if (processExecDataItem.action === "add") {
							newState.valuePairs = this.getDefaultValues(processExecDataItem);
						}
						var recordId = processExecDataItem.recordId || processExecDataItem.activityRecordId;
						var action = processExecDataItem.action || "edit";
						token = this.processCardModuleName + "/" + cardSchemaName + "/" + action + "/" + recordId;
						newState.operation = action;
						newState.moduleId = [
							this.processCardModuleName,
							recordId,
							cardSchemaName
						].join("_");
					}
					token = token + "/" + processExecDataItem.procElUId;
				}
				executionData.showNextPrcEl = false;
				executionData.isOpened = showNextPrcEl;
				return {
					stateObj: newState,
					pageTitle: null,
					hash: token,
					silent: !showNextPrcEl
				};
			},

			/*
			 * Acquires ModuleStructure config for provided entitySchemaName.
			 * @private
			 * @param {String} entity schema name.
			 * @param {Object} ModuleStructure config. Acts as an output parameter.
			*/
			_getConfig: function(entitySchemaName, config) {
				const tempConfig = Terrasoft.configuration.ModuleStructure[entitySchemaName];
				let result = tempConfig !== undefined;
				if (!result) {
					var moduleNotFoundMessage = Ext.String.format(
						resources.localizableStrings.ModuleStructureNotFoundByNameMessage,
						entitySchemaName);
					this.warning(moduleNotFoundMessage);
				}
				Ext.apply(config, tempConfig);
				return result;
			},

			/**
			 * Checks if current state in edit card mode.
			 * @private
			 * @param {Object} state History state object.
			 * @return {Boolean} True if current state in edit card mode.
			 */
			_isInCardMode: function(state) {
				return Boolean(state && state.operation);
			},

			getDefaultValues: function(processExecDataItem) {
				var valuePairs = [];
				var recordId = processExecDataItem.recordId || processExecDataItem.activityRecordId;
				if (recordId) {
					valuePairs.push({
						name: "Id",
						value: recordId
					});
				}
				if (processExecDataItem.pageTypeId) {
					valuePairs.push({
						name: processExecDataItem.typeColumnName,
						value: processExecDataItem.pageTypeId
					});
				}
				var defaultValues = processExecDataItem.defaultValues;
				for (var propertyName in defaultValues) {
					if (!defaultValues.hasOwnProperty(propertyName)) {
						continue;
					}
					var propertyValue = defaultValues[propertyName];
					if (propertyValue) {
						var dataValueType = propertyValue.dataValueType;
						if (dataValueType && Terrasoft.isDateDataValueType(dataValueType)) {
							propertyValue = Terrasoft.parseDate(propertyValue.value);
						} else if (propertyValue.value) {
							propertyValue = propertyValue.value;
						}
					}
					valuePairs.push({
						name: propertyName,
						value: propertyValue
					});
				}
				return valuePairs;
			},

			/**
			 * Handler for OnCardModuleSaved message.
			 * @param {Object} config Message data.
			 * @return {Boolean} True if page for next process element was opened, otherwise false.
			 */
			onCardModuleSaved: function(config) {
				var queueItemExecuted = this._tryExecuteQueueItemOnEntitySaved(config.forceShowNextPrcElCard, config.primaryColumnValue);
				var nextPrcElReady = config.nextPrcElReady || queueItemExecuted;
				var showNextPrcEl = config.showNextPrcEl;
				var currentState = this.sandbox.publish("GetHistoryState");
				var state = currentState.state || {};
				var newState = Terrasoft.deepClone(state);
				if (Ext.isEmpty(state.executionData) || state.executionData.isOpened) {
					newState.executionData = newState.executionData || {};
					newState.executionData.showNextPrcEl = showNextPrcEl;
					this.sandbox.publish("ReplaceHistoryState", {
						stateObj: newState,
						pageTitle: null,
						hash: currentState.hash.historyState,
						silent: true
					});
					return queueItemExecuted;
				}
				newState.showNextPrcEl = showNextPrcEl;
				var executionData = newState.executionData;
				executionData.showNextPrcEl = showNextPrcEl;
				if (nextPrcElReady === false &&
						ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysProcessData"
					});
					select.addColumn("Id");
					select.getEntity(executionData.processId, function(result) {
						var entity = result.entity;
						var currentState = this.sandbox.publish("GetHistoryState");
						var state = currentState.state || {};
						var executionData = state.executionData;
						executionData.showNextPrcEl = showNextPrcEl;
						if (entity && ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
							this.changeNextProcExecDataHistoryState(executionData);
						} else {
							this.sandbox.publish("BackHistoryState");
						}
					}, this);
				} else if (nextPrcElReady === true) {
					this.changeHistoryState(executionData[executionData.currentProcElUId], currentState, newState);
				} else {
					return false;
				}
				return true;
			},

			onGetProcessEntryPointsData: function(dataSend) {
				var entityId = dataSend.recordId;
				var entitySchemaUId = dataSend.entitySchemaUId;
				if (!entityId) {
					throw new Terrasoft.exceptions.ArgumentNullOrEmptyException({
						argumentName: "recordId"
					});
				}
				var methodName = "ProcessEngineService/GetProcessEntryPointsData";
				var config = {
					entitySchemaUId: entitySchemaUId,
					entityId: entityId
				};
				this.callConfigurationServiceMethod(methodName, config, function(response) {
					dataSend.callback.call(dataSend.scope, response.GetProcessEntryPointsDataResult);
				}, this);
			},

			onGetProcessExecData: function() {
				var currentState = this.sandbox.publish("GetHistoryState");
				var processExecData = (currentState.state && currentState.state.executionData) || {};
				return processExecData[processExecData.currentProcElUId];
			},

			/**
			 * Gets additional data for the opening page.
			 * @param {Object} config Config.
			 * @param {String} config.procElUId Identifier of the process element.
			 * @param {String} config.recordId Identifier of the entity.
			 * @param {Function} config.parentMethod Parent method.
			 * @param {Object|Array} config.parentMethodArguments Arguments of the parent method.
			 * @param {Function} config.callbackMethod Callback method.
			 * @param {Object} config.scope Scope for the calling method.
			 */
			getProcessExecData: function(config) {
				// TODO Rename service method GetExecutionData
				this.Terrasoft.AjaxProvider.request({
					url: "../ServiceModel/ProcessEngineService.svc/" +
						"GetExecutionData?ProcElUId=" + config.procElUId + "&RecordId=" + config.recordId,
					method: "POST",
					scope: this,
					callback: function(request, success, response) {
						if (!success) {
							return;
						}
						var nextProcessExecData = Ext.decode(Ext.decode(response.responseText));
						var statusCode = nextProcessExecData.status;
						if (statusCode) {
							if (statusCode === "404") {
								this.Terrasoft.showInformation(nextProcessExecData.message);
								return;
							}
							if (window.console && window.console.log) {
								var elementNotFoundMessage = resources.localizableStrings
									.ElementNotFoundByUIdExceptionMessage.replace("{0}", config.procElUId);
								window.console.log(elementNotFoundMessage);
							}
							var parentMethod = config.parentMethod;
							if (!parentMethod) {
								return;
							}
							parentMethod.apply(config.scope, config.parentMethodArguments);
							return;
						}
						var processExecData = {
							processId: nextProcessExecData.processId,
							isNew: true,
							showInPage: (config && config.showInPage) ? config.showInPage : false,
							forceReplaceHistoryState: config.forceReplaceHistoryState || false
						};
						processExecData[config.procElUId] = nextProcessExecData;
						this.changeNextProcExecDataHistoryState(processExecData);
						if (config.callbackMethod) {
							config.callbackMethod.call(config.scope);
						}
					}
				});
			},

			callConfigurationServiceMethod: function(serviceMethodName, dataSend, callback, scope) {
				var data = dataSend || {};
				var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
				var requestUrl = workspaceBaseUrl + "/rest/" + serviceMethodName;
				var request = Terrasoft.AjaxProvider.request({
					url: requestUrl,
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					method: "POST",
					jsonData: data,
					scope: this,
					callback: function(request, success, response) {
						if (callback) {
							var responseObject = success ? Terrasoft.decode(response.responseText) : {};
							callback.call(scope, responseObject);
						}
					}
				});
				return request;
			},

			onCallConfigurationServiceMethod: function(config) {
				var serviceMethodName = config.serviceMethodName;
				var data = config.data;
				var resultMessageTags = config.resultMessageTags || [];
				return this.callConfigurationServiceMethod(serviceMethodName, data, function(responseObject) {
					this.sandbox.publish("ProcessServiceMethodCalled", responseObject, resultMessageTags);
				}, this);
			},

			completeExecution: function(config) {
				var params = config.params;
				var procElUId = config.procElUId;
				var resultMessageTags = config.resultMessageTags || [];
				MaskHelper.ShowBodyMask();
				Terrasoft.AjaxProvider.request({
					url: "../ServiceModel/ProcessEngineService.svc/" + procElUId +
					"/CompleteExecution" + (params || ""),
					method: "POST",
					scope: this,
					callback: function(request, success, response) {
						MaskHelper.HideBodyMask();
						var completeExecutionData = Ext.decode(Ext.decode(response.responseText));
						this.sandbox.publish("ProcessExecutionCompleted", {
							request: request,
							response: response,
							success: success,
							completeExecutionData: completeExecutionData
						}, resultMessageTags);
					}
				});
			},

			cancelExecution: function(config) {
				var data = config.data;
				var resultMessageTags = config.resultMessageTags || [];
				Terrasoft.AjaxProvider.request({
					url: "../ServiceModel/ProcessEngineService.svc/CancelExecution",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					method: "POST",
					scope: this,
					jsonData: data,
					callback: function(request, success, response) {
						this.sandbox.publish("ProcessExecutionCanceled", {
							request: request,
							response: response,
							success: success
						}, resultMessageTags);
					}
				});
			},

			postponeProcessExecution: function() {
				var currentState = this.sandbox.publish("GetHistoryState");
				var newState = Terrasoft.deepClone(currentState.state || {});
				var executionData = newState.executionData;
				delete executionData[executionData.currentProcElUId];
				delete executionData.currentProcElUId;
				this._silentReplaceHistoryState(currentState, newState);
				if (ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
					this.changeNextProcExecDataHistoryState(executionData);
				} else {
					this.sandbox.publish("BackHistoryState");
				}
			}
		});

		return Terrasoft.ProcessListener;
	});


