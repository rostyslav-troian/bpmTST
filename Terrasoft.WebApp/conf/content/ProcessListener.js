Terrasoft.configuration.Structures["ProcessListener"] = {innerHierarchyStack: ["ProcessListener"]};
define("ProcessListener", [
		"ProcessListenerV2Resources",
		"ProcessModuleUtilities",
		"MaskHelper",
		"BaseModule",
		"MiniPageUtilities",
		"ProcessExecutionQueue",
		"ConfigurationEnums"
	],
	function(resources, ProcessModuleUtilities, MaskHelper) {
		const PageOpeningMode = {

			/** Page is not opened. */
			NONE: 0,

			/** Page is opened. */
			OPEN: 1,

			/** Page is opened in chain. */
			IN_CHAIN: 2
		};

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
			_defPageOpeningMode: PageOpeningMode.IN_CHAIN,
			_needRemoveCompletedProcessPage: true,

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
			 * Process data handler.
			 * @private
			 */
			_showPageOnProcessExecutionDataReady: null,

			/**
			 * Pending handle of _showPageOnQueueItemReceived invocation.
			 * @private
			 */
			_showPageOnQueueItemReceivedTask: null,

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
					},

					/**
					 * @message ShowProcessPage
					 * Used to show process page.
					 */
					"ShowProcessPage": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				};
			},

			/**
			 * Initializes module.
			 */
			init: function() {
				this.executionQueue.on("enqueued", this._onQueueItemReceived, this);
				Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onNextProcessElementReady, this);
				this._subscribeSandboxEvents();
				Terrasoft.ProcessExecutionDataCollector.on("executionDataReady", this._onExecutionDataReady, this);
				Terrasoft.defer(function() {
					Terrasoft.ProcessExecutionDataCollector.flushBufferedItems();
				});
			},

			/**
			 * @private
			 */
			_onExecutionDataReady: function(item) {
				this.onProcessExecutionDataReady(item.executionData);
			},

			/**
			 * @private
			 */
			_subscribeSandboxEvents: function() {
				const sandbox = this.sandbox;
				sandbox.registerMessages(this._getMessages());
				sandbox.subscribe("ProcessExecDataChanged", this.getProcessExecData, this);
				sandbox.subscribe("GetProcessExecData", this.onGetProcessExecData, this);
				sandbox.subscribe("GetProcessEntryPointsData", this.onGetProcessEntryPointsData, this);
				sandbox.subscribe("ChangeNextProcExecDataHistoryState", this.changeNextProcExecDataHistoryState, this);
				sandbox.subscribe("ChangeCurrentProcExecItemInHistoryState",
					this.changeCurrentProcExecItemInHistoryState, this);
				sandbox.subscribe("CompleteProcessExecution", this.completeExecution, this);
				sandbox.subscribe("CancelProcessExecution", this.cancelExecution, this);
				sandbox.subscribe("PostponeProcessExecution", this.postponeProcessExecution, this);
				sandbox.subscribe("OnCardModuleSaved", this.onCardModuleSaved, this);
				sandbox.subscribe("ShowProcessPage", this._onShowProcessPage, this, ["ProcessListenerModule"]);
			},

			/**
			 * @private
			 * @return {Boolean}
			 */
			_getCanChangeHistoryState: function() {
				const args = {
					result: true
				};
				this.sandbox.publish("CanChangeHistoryState", args);
				return !!args.result;
			},

			/**
			 * Returns True when process page can be opened after websocket message received; otherwise - False.
			 * @private
			 * @return {Boolean}
			 */
			_getCanShowPageOnQueueItemReceived: function(item) {
				const canChangeState = this._getCanChangeHistoryState();
				if (!canChangeState) {
					return false;
				}
				return this._getCanShowPage(item);
			},

			/**
			 * @private
			 * @return {Boolean}
			 */
			_getCanShowPage: function(item) {
				const clonedItem = Terrasoft.deepClone(item);
				const data = this._prepareNextProcExecData(clonedItem);
				return this._getCanShowNextPrcEl(data.nextElementExecutionData, data.newState.executionData,
					data.currentHistory);
			},

			_getOpenProcessPageTaskToken: function() {
				const historyState = this.sandbox.publish("GetHistoryState");
				if (historyState && historyState.state) {
					return historyState.state.openProcessPageTaskToken;
				}
			},

			_setOpenProcessPageTaskToken: function() {
				const token = this.Terrasoft.generateGUID();
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const updatedState = Terrasoft.deepClone(currentHistory.state);
				updatedState.openProcessPageTaskToken = token;
				this._silentUpdateHistoryState(currentHistory, updatedState);
				return token;
			},

			/**
			 * @private
			 */
			_tryShowNextQueueItemPage: function() {
				this._tryUpdateEditPageOperationInHistoryState(function() {
					const token = this._getOpenProcessPageTaskToken();
					const dequeuePredicate = function(itemCandidate) {
						return token === itemCandidate.openProcessPageTaskToken;
					};
					const item = this.executionQueue.dequeue(dequeuePredicate);
					if (item) {
						const config = this._prepareNextProcExecData(item);
						this._openProcessPage(config.nextElementExecutionData, config.currentHistory,
							config.newState);
					}
				}, this);
			},

			/**
			 * @private
			 */
			_cancelShowPageOnQueueItemReceivedTask: function() {
				if (this._showPageOnQueueItemReceivedTask) {
					this._showPageOnQueueItemReceivedTask.cancel();
					this._showPageOnQueueItemReceivedTask = null;
				}
			},

			/**
			 * @private
			 */
			_delayedShowPage: function() {
				if (Terrasoft.Features.getIsDisabled("WaitAllRequestsBeforeOpenProcessPage")) {
					this._tryShowNextQueueItemPage();
					return;
				}
				this._cancelShowPageOnQueueItemReceivedTask();
				const dispatcher = this.Terrasoft.AjaxProvider.getDeferredExecutionDispatcher();
				this._showPageOnQueueItemReceivedTask = dispatcher.register(this._tryShowNextQueueItemPage,
					this);
			},

			/**
			 * Handler for itemReceived event of {@link #executionQueue}.
			 * @private
			 */
			_onQueueItemReceived: function(item) {
				if (this._getCanShowPageOnQueueItemReceived(item)) {
					this._delayedShowPage();
				}
			},

			/**
			 * @private
			 */
			_prepareNextProcExecData: function(executionData) {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const nextElementExecutionData = this._findNextElementExecutionData(executionData);
				const newState = this.Terrasoft.deepClone(this._getCurrentHistoryState(currentHistory));
				newState.executionData = executionData;
				return {
					currentHistory: currentHistory,
					newState: newState,
					nextElementExecutionData: nextElementExecutionData
				};
			},

			/**
			 * @private
			 */
			_prepareElementHistoryState: function(elementExecutionData, currentHistory, executionData) {
				const cardInfo = this._getCardInfo(elementExecutionData, currentHistory);
				if (!cardInfo) {
					return null;
				}
				const stateObj = {
					executionData: executionData,
					moduleName: this.processCardModuleName,
					moduleId: cardInfo.moduleId,
					isSeparateMode: false,
					isInChain: true,
					schemaName: cardInfo.schemaName,
					entitySchemaName: cardInfo.entitySchemaName,
					primaryColumnValue: cardInfo.recordId,
					operation: cardInfo.operation,
					isProcessCardInChain: true,
					keepAlive: true
				};
				if (cardInfo.defValues) {
					stateObj.valuePairs = cardInfo.defValues;
				}
				return stateObj;
			},

			/**
			 * @private
			 */
			_openProcessPage: function(elementExecutionData, currentHistory, newHistoryState, options) {
				const navigationEventName = this.getNavigationEventName(elementExecutionData, currentHistory,
					newHistoryState, options);
				if (this._defPageOpeningMode === PageOpeningMode.IN_CHAIN ||
						currentHistory.state && currentHistory.state.isInChain) {
					const newHistoryStateObj = this._prepareElementHistoryState(elementExecutionData, currentHistory,
						newHistoryState.executionData);
					if (newHistoryStateObj) {
						this._lastProcessId = elementExecutionData.processId;
						this._callBeforePublishHistoryStateCallback(currentHistory, navigationEventName, options);
						this._openProcessCardInChain(currentHistory.hash.historyState, newHistoryStateObj,
							navigationEventName);
						return PageOpeningMode.IN_CHAIN;
					} else {
						return PageOpeningMode.NONE;
					}
				}
				const navigationEventArguments = this.getNavigationEventArguments(elementExecutionData, currentHistory,
					newHistoryState);
				if (!navigationEventArguments) {
					return PageOpeningMode.NONE;
				}
				this._lastProcessId = elementExecutionData.processId;
				this._callBeforePublishHistoryStateCallback(currentHistory, navigationEventName, options);
				this.sandbox.publish(navigationEventName, navigationEventArguments);
				return PageOpeningMode.OPEN;
			},

			/**
			 * @private
			 */
			_tryExecuteQueueItemOnEntitySaved: function(primaryColumnValue, forceReplaceHistoryState) {
				const result = {
					isQueueItemProceed: false,
					pageOpeningMode: PageOpeningMode.NONE
				};
				const item = this.executionQueue.dequeue();
				if (!item) {
					return result;
				}
				result.isQueueItemProceed = true;
				result.pageOpeningMode = this.changeNextProcExecDataHistoryState(item, {
					forceReplaceHistoryState: forceReplaceHistoryState,
					beforePublishHistoryStateConfig: {
						recordPrimaryColumnValue: primaryColumnValue,
						callback: this._actualizeCardModuleHistoryState,
						scope: this
					}
				});
				return result;
			},

			/**
			 * Replaces the history state.
			 * @private
			 * @param {Object} currentHistory Current history state.
			 * @param {Object} newState New history state.
			 */
			_silentReplaceHistoryState: function(currentHistory, newState) {
				this.sandbox.publish("ReplaceHistoryState", {
					stateObj: newState,
					pageTitle: null,
					hash: currentHistory.hash.historyState,
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
				const isRunAnotherProcess = this.Terrasoft.isGUID(executionData.processId) &&
					!Ext.isEmpty(currentExecutionData) &&
					this.Terrasoft.isGUID(currentExecutionData.processId) &&
					executionData.processId !== currentExecutionData.processId;
				return isRunAnotherProcess;
			},

			/**
			 * @private
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} executionData New execution data.
			 * @param {Object} historyState History state.
			 * @return {Boolean}
			 */
			_isAddDetailRecord: function(processExecDataItem, executionData, historyState) {
				const isAddDetailRecord = processExecDataItem.isProcessExecutedBySignal &&
					executionData.isNew === true && historyState.operation === "add";
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
			_updateEditPageOperationInHistoryState: function(currentHistory, primaryColumnValue) {
				const stateObject = Terrasoft.deepClone(this._getCurrentHistoryState(currentHistory));
				stateObject.operation = "edit";
				if (primaryColumnValue) {
					stateObject.primaryColumnValue = primaryColumnValue;
				}
				this._silentReplaceHistoryState(currentHistory, stateObject);
			},

			/**
			 * @private
			 */
			_getIsRecordInfoChangedInHistoryState: function(initialStateObject, currentHistory) {
				const currentState = this._getCurrentHistoryState(currentHistory);
				return initialStateObject.entitySchemaName !== currentState.entitySchemaName ||
					initialStateObject.primaryColumnValue !== currentState.primaryColumnValue;
			},

			/**
			 * @private
			 */
			_getIsNonProcessInContext: function(currentHistory) {
				return Ext.isEmpty(currentHistory.hash.historyState.match(this.isProcessModeRegExp)) &&
					!Ext.isDefined(currentHistory.state.isProcessCardInChain);
			},

			/**
			 * @private
			 */
			_tryUpdateEditPageOperationInHistoryState: function(callback, scope) {
				const initialHistoryState = this.sandbox.publish("GetHistoryState");
				const initialStateObject = initialHistoryState.state;
				const isAddInChainMode = this._getIsAddInChainMode(initialStateObject);
				const primaryColumnValue = initialStateObject.primaryColumnValue;
				if (isAddInChainMode && !Ext.isEmpty(primaryColumnValue)) {
					const schemaName = initialStateObject.entitySchemaName;
					this._getIsRecordExist(schemaName, primaryColumnValue, function(result) {
						if (result) {
							const currentHistory = this.sandbox.publish("GetHistoryState");
							if (this._getIsRecordInfoChangedInHistoryState(initialStateObject, currentHistory)) {
								this.log("Entity info in the history state has changed while check record exist in DB. " +
									"The history state has not been updated.", Terrasoft.LogMessageType.WARNING);
							} else {
								this._updateEditPageOperationInHistoryState(currentHistory);
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
				const nextElementExecutionData = this._findElementExecutionData(executionData);
				if (nextElementExecutionData) {
					executionData.currentProcElUId = nextElementExecutionData.procElUId;
				}
				return nextElementExecutionData;
			},

			/**
			 * @private
			 */
			_findElementExecutionData: function(executionData) {
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
			 * @private
			 */
			_assignNewState: function(newState, cardInfo) {
				if (cardInfo.defValues) {
					newState.valuePairs = cardInfo.defValues;
				}
				newState.operation = cardInfo.operation;
				newState.moduleId = cardInfo.moduleId;
			},

			/**
			 * @private
			 */
			_getCardSchemaInfo: function(processExecDataItem, recordId) {
				const config = {};
				if (!this._getConfig(processExecDataItem.entitySchemaName, config)) {
					return null;
				}
				const cardSchemaInfo = {
					schemaName: config.cardSchema
				};
				if (config.attribute) {
					cardSchemaInfo.typeColumnName = config.attribute;
				}
				Terrasoft.each(config.pages, function (page) {
					if (processExecDataItem.pageTypeId === page.UId && page.cardSchema) {
						cardSchemaInfo.schemaName = page.cardSchema;
					}
				}, this);
				cardSchemaInfo.operation = processExecDataItem.action || "edit";
				cardSchemaInfo.token = this.processCardModuleName + "/" + cardSchemaInfo.schemaName + "/" +
					cardSchemaInfo.operation + "/" + recordId;
				return cardSchemaInfo;
			},

			/**
			 * @private
			 */
			_getCustomCardInfo: function(processExecDataItem) {
				const cardInfo = {
					token: processExecDataItem.urlToken,
					schemaName: processExecDataItem.urlToken.split('/')[1]
				};
				if (processExecDataItem.action) {
					cardInfo.operation = processExecDataItem.action;
				}
				return cardInfo;
			},

			/**
			 * @private
			 */
			_getCardInfo: function(processExecDataItem) {
				const cardInfo = {
					recordId: processExecDataItem.recordId || processExecDataItem.activityRecordId
				};
				const cardSchemaInfo = processExecDataItem.urlToken
					? this._getCustomCardInfo(processExecDataItem)
					: this._getCardSchemaInfo(processExecDataItem, cardInfo.recordId);
				if (Ext.isEmpty(cardSchemaInfo)) {
					return null;
				}
				Ext.apply(cardInfo, cardSchemaInfo);
				if (processExecDataItem.action === "add") {
					cardInfo.defValues = this.getDefaultValues(processExecDataItem);
				}
				cardInfo.moduleId = this._getModuleId(processExecDataItem.procElUId, cardInfo.schemaName);
				if (processExecDataItem.entitySchemaName) {
					cardInfo.entitySchemaName = processExecDataItem.entitySchemaName;
				}
				cardInfo.token = cardInfo.token + "/" + processExecDataItem.procElUId;
				return cardInfo;
			},

			/**
			 * @private
			 */
			_callBeforePublishHistoryStateCallback: function(currentHistory, navigationEventName, options) {
				if (!Ext.isEmpty(options) && !Ext.isEmpty(options.beforePublishHistoryStateConfig)) {
					const beforePublishHistoryStateConfig = options.beforePublishHistoryStateConfig;
					Ext.callback(beforePublishHistoryStateConfig.callback, beforePublishHistoryStateConfig.scope,
						[beforePublishHistoryStateConfig, currentHistory, navigationEventName]);
				}
			},

			/**
			 * @private
			 */
			_getModuleId: function(id, cardSchemaName) {
				return [this.processCardModuleName, id, cardSchemaName, this.Terrasoft.generateGUID()].join("_");
			},

			/**
			 * @private
			 */
			_openProcessCardInChain: function(currentHash, stateObj, navigationEventName) {
				stateObj.executionData.isOpened = true;
				this.sandbox.publish(navigationEventName, {
					silent: true,
					pageTitle: null,
					hash: currentHash,
					stateObj: stateObj
				});
				const moduleConfig = {
					renderTo: "centerPanel",
					id: stateObj.moduleId,
					keepAlive: true,
					replaceLastModuleInChain: navigationEventName === "ReplaceHistoryState"
				};
				this.sandbox.loadModule("ProcessCardModuleV2", moduleConfig);
			},

			/**
			 * Handler for Terrasoft.ServerChannel. Processes message from ProcessEngine.
			 * @protected
			 * @param {Object} scope Message scope.
			 * @param {Object} message Server message.
			 */
			onNextProcessElementReady: function(scope, message) {
				if (!this._isProcessEngineSender(message)) {
					return;
				}
				const nextProcessData = Ext.decode(message.Body);
				const nextProcessId = nextProcessData.processId;
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const isNonProcessInContext = this._getIsNonProcessInContext(currentHistory);
				if (isNonProcessInContext) {
					this._lastProcessId = null;
				}
				if (!this._canEqueueExecutionData(isNonProcessInContext, nextProcessId)) {
					return;
				}
				if (!this._enqueueExecutionData(currentHistory, isNonProcessInContext, nextProcessId,
						nextProcessData)) {
					MaskHelper.HideBodyMask();
				}
			},

			/**
			 * @private
			 */
			_canEqueueExecutionData: function(isNonProcessInContext, nextProcessId) {
				return (!isNonProcessInContext && this._lastProcessId === nextProcessId) || document.hasFocus();
			},

			/**
			 * @private
			 */
			_getExecutionData: function(currentHistory) {
				return (currentHistory.state && currentHistory.state.executionData) || {};
			},

			/**
			 * @private
			 */
			_getCurrentHistoryState: function(currentHistory) {
				return currentHistory.state || {};
			},

			/**
			 * Tries to add item to the end of the execution queue.
			 * @private
			 */
			_enqueueExecutionData: function(currentHistory, isNonProcessInContext, nextProcessId, nextProcessData) {
				let processData = this._getExecutionData(currentHistory);
				if (isNonProcessInContext === true || Ext.isEmpty(processData.processId) ||
						processData.processId === nextProcessId) {
					if (isNonProcessInContext === true) {
						processData = {};
					}
					processData = Ext.apply({}, processData, nextProcessData);
					processData.isNew = isNonProcessInContext;
					processData.openProcessPageTaskToken = this._setOpenProcessPageTaskToken();
					this.executionQueue.enqueue(processData);
					return true;
				}
				return false;
			},

			/**
			 * @private
			 */
			_getCurrentProcessElementData: function() {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const data = this._getExecutionData(currentHistory);
				return {
					processId: data.processId,
					elementId: data.currentProcElUId
				};
			},

			/**
			 * @private
			 */
			_replaceCurrentProcessElementState: function(processExecutionData) {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const elementExecutionData = this._findNextElementExecutionData(processExecutionData);
				const newHistoryStateObj = this._prepareElementHistoryState(elementExecutionData, currentHistory,
					processExecutionData);
				this._silentUpdateHistoryState(currentHistory, newHistoryStateObj);
			},

			/**
			 * @private
			 */
			_getNextPage: function(executionData) {
				const currentElementData = this._getCurrentProcessElementData();
				const nextElementData = Terrasoft.ProcessExecutionDataUtils
					.getNextElementData(executionData, currentElementData.processId, currentElementData.elementId);
				const nextPage = nextElementData.nextPage;
				let forceReplaceHistoryState = null;
				if (nextElementData.isCurrentElementCompleted) {
					if (nextElementData.currentProcessPage) {
						this._replaceCurrentProcessElementState(nextElementData.currentProcessPage);
						forceReplaceHistoryState = false;
					} else if (nextPage) {
						forceReplaceHistoryState = true;
					}
				} else {
					forceReplaceHistoryState = false;
				}
				if (nextPage) {
					nextPage._forceReplaceHistoryState = forceReplaceHistoryState;
				}
				return nextPage;
			},

			/**
			 * @private
			 */
			_handleProcessExecutionData: function(executionData) {
				return this._needRemoveCompletedProcessPage
					? this._getNextPage(executionData)
					: executionData.filter(function(item) {
						return !Ext.isDefined(item.type);
					}).pop();
			},

			/**
			 * Handler for the ProcessExecutionDataReady message.
			 * @protected
			 */
			onProcessExecutionDataReady: function(executionData) {
				if (!Ext.isArray(executionData)) {
					this.error("Unsupported execution data format");
					this.error(executionData);
					return;
				}
				const item = this._handleProcessExecutionData(executionData);
				if (!item) {
					return;
				}
				item.showNextPrcEl = true;
				item.openProcessPageTaskToken = this._setOpenProcessPageTaskToken();
				this.executionQueue.enqueue(item, { silent: true });
				if (Terrasoft.Features.getIsEnabled("WaitAllRequestsBeforeOpenProcessPage")){
					this._delayedShowPage();
					return;
				}
				this._cancelShowPageOnEvent();
				this._showPageOnProcessExecutionDataReady = Terrasoft.defer(function() {
					this._delayedShowPage();
				}, this);
			},

			/**
			 * Handler for the ChangeCurrentProcExecItemInHistoryState message.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 */
			changeCurrentProcExecItemInHistoryState: function(processExecDataItem) {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const newState = this.Terrasoft.deepClone(this._getCurrentHistoryState(currentHistory));
				newState.executionData.currentProcElUId = processExecDataItem.procElUId;
				this.changeHistoryState(processExecDataItem, currentHistory, newState);
			},

			/**
			 * Handler for ChangeNextProcExecDataHistoryState message.
			 * @protected
			 * @param {Object} executionData Process execution data object.
			 * @param [options]
			 * @return {PageOpeningMode} Page opening mode.
			 */
			changeNextProcExecDataHistoryState: function(executionData, options) {
				const config = this._prepareNextProcExecData(executionData);
				return this.changeHistoryState(config.nextElementExecutionData, config.currentHistory, config.newState,
					options);
			},

			/**
			 * Changes current history state.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} currentHistory Current history state.
			 * @param {Object} newState New history state.
			 * @param [options]
			 * @return {PageOpeningMode} Page opening mode.
			 */
			changeHistoryState: function(processExecDataItem, currentHistory, newState, options) {
				if (Ext.isEmpty(processExecDataItem)) {
					this.sandbox.publish("BackHistoryState");
					MaskHelper.HideBodyMask();
					return PageOpeningMode.NONE;
				}
				return this._openProcessPage(processExecDataItem, currentHistory, newState, options);
			},

			/**
			 * Returns navigation event name.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} currentHistory Current history state.
			 * @param {Object} newState New history state.
			 * @param {Object} options Determines additional data to get navigation event name.
			 * @return {String} Navigation event name.
			 */
			getNavigationEventName: function(processExecDataItem, currentHistory, newState, options) {
				const eventNameFactory = function(isReplaceHistoryState) {
					return isReplaceHistoryState ? "ReplaceHistoryState" : "PushHistoryState";
				};
				const needReplaceHistoryState = newState.executionData._forceReplaceHistoryState;
				if (Ext.isDefined(needReplaceHistoryState)) {
					return eventNameFactory(needReplaceHistoryState ||
						options && options.forceReplaceHistoryState);
				}
				if (options && !Ext.isEmpty(options.forceReplaceHistoryState)) {
					return eventNameFactory(options.forceReplaceHistoryState);
				}
				const navigationEventName = this._getNavigationEventName(processExecDataItem, currentHistory, newState);
				return navigationEventName;
			},

			/**
			 * @private
			 */
			_getNavigationEventName: function(processExecDataItem, currentHistory, newState) {
				const replaceHistoryStateNavigationEventName = "ReplaceHistoryState";
				const executionData = newState.executionData;
				if (executionData.forceReplaceHistoryState) {
					return replaceHistoryStateNavigationEventName;
				}
				const state = currentHistory.state || {};
				const currentExecutionData = state.executionData || {};
				const isRunAnotherProcess = this._isRunAnotherProcess(currentExecutionData, executionData);
				const isProcessMode = !this._getIsNonProcessInContext(currentHistory);
				const isCurrentStateAddAction = currentHistory.hash.operationType === "add";
				if (isProcessMode && (!isRunAnotherProcess || isCurrentStateAddAction)) {
					return replaceHistoryStateNavigationEventName;
				}
				const isAddDetailRecord = this._isAddDetailRecord(processExecDataItem, executionData, state);
				if ((executionData.showNextPrcEl === false) || isAddDetailRecord) {
					return replaceHistoryStateNavigationEventName;
				}
				return "PushHistoryState";
			},

			/**
			 * @private
			 */
			_getCanShowNextPrcEl: function(processExecDataItem, executionData, currentHistory) {
				const showNextPrcEl = executionData.showNextPrcEl ||
					!this._getIsPageIsOpenedOnEditNotInChain(currentHistory.state) ||
					(executionData.isNew === true && !processExecDataItem.isProcessExecutedBySignal);
				return showNextPrcEl;
			},

			/**
			 * Returns navigation event arguments.
			 * @protected
			 * @param {Object} processExecDataItem Process execution data object.
			 * @param {Object} currentHistory Current history state.
			 * @param {Object} newState New state.
			 * @return {Object} Navigation event arguments object.
			 */
			getNavigationEventArguments: function(processExecDataItem, currentHistory, newState) {
				const executionData = newState.executionData;
				const showNextPrcEl = this._getCanShowNextPrcEl(processExecDataItem, executionData, currentHistory);
				let token = currentHistory.hash.historyState;
				if (showNextPrcEl) {
					const cardInfo = this._getCardInfo(processExecDataItem, currentHistory);
					if (!cardInfo) {
						return;
					}
					token = cardInfo.token;
					if (cardInfo.typeColumnName) {
						processExecDataItem.typeColumnName = cardInfo.typeColumnName;
					}
					this._assignNewState(newState, cardInfo);
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

			/**
			 * @private
			 */
			_getConfig: function(entitySchemaName, config) {
				const tempConfig = Terrasoft.configuration.ModuleStructure[entitySchemaName];
				const result = tempConfig !== undefined;
				if (!result) {
					const moduleNotFoundMessage = Ext.String.format(
						resources.localizableStrings.ModuleStructureNotFoundByNameMessage,
						entitySchemaName);
					this.warning(moduleNotFoundMessage);
				}
				Ext.apply(config, tempConfig);
				return result;
			},

			/**
			 * Checks if current state is edit mode.
			 * @private
			 * @param {Object} state History state object.
			 * @return {Boolean} True when page is opened not in chain mode and current state is edit mode.
			 */
			_getIsPageIsOpenedOnEditNotInChain: function(state) {
				return Boolean(state && state.operation);
			},

			getDefaultValues: function(processExecDataItem) {
				const valuePairs = [];
				const recordId = processExecDataItem.recordId || processExecDataItem.activityRecordId;
				if (recordId) {
					valuePairs.push({
						name: "Id",
						value: recordId
					});
				}
				this._fillDefValues(valuePairs, processExecDataItem);
				return valuePairs;
			},

			/**
			 * @private
			 */
			_fillDefValues: function(valuePairs, processExecDataItem) {
				if (processExecDataItem.pageTypeId) {
					valuePairs.push({
						name: processExecDataItem.typeColumnName,
						value: processExecDataItem.pageTypeId
					});
				}
				const defaultValues = processExecDataItem.defaultValues;
				for (let propertyName in defaultValues) {
					if (defaultValues.hasOwnProperty(propertyName)) {
						this._addDefValue(valuePairs, defaultValues, propertyName);
					}
				}
			},

			/**
			 * @private
			 */
			_addDefValue: function(valuePairs, defaultValues, propertyName) {
				let propertyValue = defaultValues[propertyName];
				const defValue = this._getDefValue(propertyValue);
				valuePairs.push({
					name: propertyName,
					value: defValue
				});
			},

			/**
			 * @private
			 */
			_getDefValue: function(propertyValue) {
				if (!propertyValue) {
					return propertyValue;
				}
				const dataValueType = propertyValue.dataValueType;
				if (dataValueType && Terrasoft.isDateDataValueType(dataValueType)) {
					return Terrasoft.parseDate(propertyValue.value);
				}
				if (propertyValue.value) {
					return propertyValue.value;
				}
				return propertyValue;
			},

			/**
			 * @private
			 */
			_cancelShowPageOnEvent: function() {
				if (this._showPageOnProcessExecutionDataReady) {
					clearTimeout(this._showPageOnProcessExecutionDataReady);
					this._showPageOnProcessExecutionDataReady = null;
				}
				this._cancelShowPageOnQueueItemReceivedTask();
			},

			_tryExecuteQueueItem: function(config) {
				this._cancelShowPageOnEvent();
				return this._tryExecuteQueueItemOnEntitySaved(config.primaryColumnValue,
					config.forceReplaceHistoryState);
			},

			_onShowProcessPage: function(config) {
				config = config || {};
				const result = this._tryExecuteQueueItem(config);
				if (config.entitySaved) {
					return this._onCardModuleSaved(config, result);
				}
				return result.isQueueItemProceed;
			},

			/**
			 * Handler for OnCardModuleSaved message.
			 * @param {Object} config Message data.
			 * @return {Boolean} True if page for next process element was opened, otherwise false.
			 */
			onCardModuleSaved: function(config) {
				const result = this._tryExecuteQueueItem(config);
				return this._onCardModuleSaved(config, result);
			},

			_onCardModuleSaved: function(config, showPageResult) {
				if (showPageResult.pageOpeningMode === PageOpeningMode.IN_CHAIN) {
					return showPageResult.isQueueItemProceed;
				}
				const nextPrcElReady = config.nextPrcElReady || showPageResult.isQueueItemProceed;
				const showNextPrcEl = config.showNextPrcEl;
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const state = this._getCurrentHistoryState(currentHistory);
				const newState = Terrasoft.deepClone(state);
				if (Ext.isEmpty(state.executionData) || state.executionData.isOpened) {
					newState.executionData = newState.executionData || {};
					newState.executionData.showNextPrcEl = showNextPrcEl;
					this._silentUpdateHistoryState(currentHistory, newState);
					return showPageResult.isQueueItemProceed;
				}
				newState.showNextPrcEl = showNextPrcEl;
				const executionData = newState.executionData;
				executionData.showNextPrcEl = showNextPrcEl;
				if (nextPrcElReady === false && this._tryOpenProcessCardAsync(executionData, showNextPrcEl)) {
					return true;
				}
				if (nextPrcElReady === true) {
					this.changeHistoryState(executionData[executionData.currentProcElUId], currentHistory, newState);
					return true;
				}
				return false;
			},

			/**
			 * @private
			 */
			_silentUpdateHistoryState : function(currentHistory, newState) {
				this.sandbox.publish("ReplaceHistoryState", {
					stateObj: newState,
					pageTitle: null,
					hash: currentHistory.hash.historyState,
					silent: true
				});
			},

			/**
			 * @private
			 */
			_tryOpenProcessCardAsync : function(executionData, showNextPrcEl) {
				if (!this._findElementExecutionData(executionData)) {
					return false;
				}
				const select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysProcessData"
				});
				select.addColumn("Id");
				select.getEntity(executionData.processId, function(result) {
					const entity = result.entity;
					const currentHistory = this.sandbox.publish("GetHistoryState");
					const state = this._getCurrentHistoryState(currentHistory);
					const currentExecutionData = state.executionData;
					currentExecutionData.showNextPrcEl = showNextPrcEl;
					if (entity && this._findElementExecutionData(currentExecutionData)) {
						this.changeNextProcExecDataHistoryState(currentExecutionData);
					} else {
						this.sandbox.publish("BackHistoryState");
					}
				}, this);
				return true;
			},

			/**
			 * Handler for the GetProcessEntryPointsData message.
			 * @protected
			 */
			onGetProcessEntryPointsData: function(dataSend) {
				const entityId = dataSend.recordId;
				const entitySchemaUId = dataSend.entitySchemaUId;
				if (!entityId) {
					throw new Terrasoft.exceptions.ArgumentNullOrEmptyException({
						argumentName: "recordId"
					});
				}
				const config = {
					entitySchemaUId: entitySchemaUId,
					entityId: entityId
				};
				const methodName = "ProcessEngineService/GetProcessEntryPointsData";
				this.callConfigurationServiceMethod(methodName, config, function(response) {
					dataSend.callback.call(dataSend.scope, response.GetProcessEntryPointsDataResult);
				}, this);
			},

			/**
			 * Handler for the GetProcessExecData message.
			 * @protected
			 */
			onGetProcessExecData: function() {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const processExecData = this._getExecutionData(currentHistory);
				return processExecData[processExecData.currentProcElUId];
			},

			/**
			 * @private
			 */
			_handleGetProcessExecutionDataResponse: function(statusCode, nextProcessExecData, config) {
				if (statusCode === "404") {
					this.Terrasoft.showInformation(nextProcessExecData.message);
					return;
				}
				if (window.console && window.console.log) {
					const elementNotFoundMessage = resources.localizableStrings
						.ElementNotFoundByUIdExceptionMessage.replace("{0}", config.procElUId);
					window.console.log(elementNotFoundMessage);
				}
				if (config.parentMethod) {
					config.parentMethod.apply(config.scope, config.parentMethodArguments);
				}
			},

			/**
			 * @private
			 */
			_getProcessExecutionDataRequestUrl: function(processElementUId, recordId) {
				return "../ServiceModel/ProcessEngineService.svc/GetExecutionData?ProcElUId=" +
					processElementUId + "&RecordId=" + recordId;
			},

			/**
			 * @private
			 */
			_openProcessPageAfterGetExecutionDataRequest: function(nextProcessExecData, config) {
				const processExecData = {
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
				this.Terrasoft.AjaxProvider.request({
					url: this._getProcessExecutionDataRequestUrl(config.procElUId, config.recordId),
					method: "POST",
					scope: this,
					callback: function(request, success, response) {
						if (!success) {
							return;
						}
						const nextProcessExecData = Ext.decode(Ext.decode(response.responseText));
						const statusCode = nextProcessExecData.status;
						if (statusCode) {
							this._handleGetProcessExecutionDataResponse(statusCode, nextProcessExecData, config);
							return;
						}
						this._openProcessPageAfterGetExecutionDataRequest(nextProcessExecData, config);
					}
				});
			},

			/**
			 * Handler for the PostponeProcessExecution message.
			 * @protected
			 */
			postponeProcessExecution: function() {
				const currentHistory = this.sandbox.publish("GetHistoryState");
				const newState = Terrasoft.deepClone(currentHistory.state || {});
				const executionData = newState.executionData;
				delete executionData[executionData.currentProcElUId];
				delete executionData.currentProcElUId;
				this._silentReplaceHistoryState(currentHistory, newState);
				if (ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
					this.changeNextProcExecDataHistoryState(executionData);
				} else {
					this.sandbox.publish("BackHistoryState");
				}
			},

			callConfigurationServiceMethod: function(serviceMethodName, dataSend, callback, scope) {
				const data = dataSend || {};
				const workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
				const requestUrl = workspaceBaseUrl + "/rest/" + serviceMethodName;
				const request = Terrasoft.AjaxProvider.request({
					url: requestUrl,
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					method: "POST",
					jsonData: data,
					scope: this,
					callback: function (request, success, response) {
						if (callback) {
							const responseObject = success ? Terrasoft.decode(response.responseText) : {};
							callback.call(scope, responseObject);
						}
					}
				});
				return request;
			},

			completeExecution: function(config) {
				const params = config.params;
				const procElUId = config.procElUId;
				const resultMessageTags = config.resultMessageTags || [];
				MaskHelper.ShowBodyMask();
				Terrasoft.AjaxProvider.request({
					url: "../ServiceModel/ProcessEngineService.svc/" + procElUId + "/CompleteExecution" +
						(params || ""),
					method: "POST",
					scope: this,
					callback: function(request, success, response) {
						MaskHelper.HideBodyMask();
						const completeExecutionData = Ext.decode(Ext.decode(response.responseText));
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
				const data = config.data;
				const resultMessageTags = config.resultMessageTags || [];
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
			}
		});

		return Terrasoft.ProcessListener;
	});


