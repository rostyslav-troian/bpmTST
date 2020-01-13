Terrasoft.configuration.Structures["ProcessModule"] = {innerHierarchyStack: ["ProcessModule"]};
define("ProcessModule", ["ext-base", "terrasoft", "sandbox", "ProcessModuleResources", "ProcessModuleUtilities",
	"MaskHelper"
], function(Ext, Terrasoft, sandbox, resources, ProcessModuleUtilities, MaskHelper) {

	let processExecData = {};

	function init() {
		sandbox.subscribe("ProcessExecDataChanged", onProcessExecDataChanged);
		sandbox.subscribe("GetProcessExecData", onGetProcessExecData);
		sandbox.subscribe("GetProcessExecDataCollection", onGetProcessExecDataCollection);
		sandbox.subscribe("GetProcessEntryPointsData", onGetProcessEntryPointsData);
		Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, onNextProcessElementReady, this);
		const currentState = sandbox.publish("GetHistoryState");
		if (currentState && currentState.state && currentState.state.executionData) {
			processExecData = currentState.state.executionData;
		}
	}

	function replaceHistoryState(currentState, newState) {
		processExecData = newState.executionData;
		sandbox.publish("ReplaceHistoryState", {
			stateObj: newState,
			pageTitle: null,
			hash: currentState.hash.historyState,
			silent: true
		});
	}

	function onNextProcessElementReady(scope, procExecDataMessage) {
		MaskHelper.HideBodyMask();
		if (procExecDataMessage.Header.Sender === "ProcessEngine") {
			const currentState = sandbox.publish("GetHistoryState");
			const isProcessMode = !Ext.isEmpty(currentState.hash.historyState.match("/prc$"));
			const nextProcExecData = Ext.decode(procExecDataMessage.Body);
			const nextProcessId = nextProcExecData.processId;
			if (isProcessMode === false ||
				Ext.isEmpty(processExecData.processId) || processExecData.processId === nextProcessId) {
				if (isProcessMode === false) {
					processExecData = {};
				}
				processExecData = Ext.apply({}, processExecData, nextProcExecData);
			} else {
				return;
			}
			changeNextProcExecDataHistoryState(processExecData);
		} else if (procExecDataMessage.Header.Sender === "ProcessEngineBackHistoryState") {
			Terrasoft.Router.back();
		}
	}

	function changeCurrentProcExecItemInHistoryState(processExecDataItem) {
		const navigationEventName = "PushHistoryState";
		const currentState = sandbox.publish("GetHistoryState");
		const newState = Terrasoft.deepClone(currentState.state || {});
		newState.executionData.currentProcElUId = processExecDataItem.procElUId;
		processExecData = newState.executionData;
		changeHistoryState(processExecDataItem, currentState, newState);
	}

	function changeNextProcExecDataHistoryState(nextProcessExecData) {
		const currentState = sandbox.publish("GetHistoryState");
		const newState = Terrasoft.deepClone(currentState.state || {});
		const previousProcElUId = nextProcessExecData.currentProcElUId;
		let currentProcElUId;
		Terrasoft.each(nextProcessExecData, function(procExecDataItem) {
			if (currentProcElUId) {
				return;
			}
			if (procExecDataItem &&
				(typeof procExecDataItem !== "function") &&
				procExecDataItem.procElUId !== previousProcElUId) {
				currentProcElUId = procExecDataItem.procElUId;
			}
		}, this);
		nextProcessExecData.currentProcElUId = currentProcElUId;
		nextProcessExecData.previousProcElUId = nextProcessExecData[previousProcElUId];
		delete nextProcessExecData[previousProcElUId];
		newState.executionData = nextProcessExecData;
		processExecData = nextProcessExecData;
		const processExecDataItem = nextProcessExecData[nextProcessExecData.currentProcElUId];
		changeHistoryState(processExecDataItem, currentState, newState);
	}

	function changeHistoryState(processExecDataItem, currentState, newState) {
		if (Ext.isEmpty(processExecDataItem)) {
			Terrasoft.Router.back();
			return;
		}
		let navigationEventName = "PushHistoryState";
		let token = "";
		if (currentState && currentState.hash &&
			currentState.hash.historyState.match("/prc/?") ||
			processExecDataItem.isProcessExecutedBySignal === true) {
			navigationEventName = "ReplaceHistoryState";
		}
		if (processExecDataItem.urlToken) {
			token = processExecDataItem.urlToken;
		} else {
			const config = Terrasoft.configuration.ModuleStructure[processExecDataItem.entitySchemaName];
			let cardSchemaName = config.cardSchema;
			if (config.pages) {
				Terrasoft.each(config.pages, function(page) {
					if (processExecDataItem.pageTypeId === page.UId && page.cardSchema) {
						cardSchemaName = page.cardSchema;
					}
				}, this);
			}
			const recordId = processExecDataItem.recordId || processExecDataItem.activityRecordId;
			if (processExecDataItem.action === "add") {
				newState.defaultValues = processExecDataItem.defaultValues || {};
				newState.defaultValues["Id"] = recordId;
				if (!Ext.isEmpty(processExecDataItem.pageTypeId)) {
					token = config.cardModule + "/" + cardSchemaName + "/add/Type/" +
						processExecDataItem.pageTypeId;
				}
			}
			if (Ext.isEmpty(token)) {
				const action = processExecDataItem.action || "edit";
				token = config.cardModule + "/" + cardSchemaName + "/" + action + "/" +
					recordId;
			}
			token = token + "/prc";
		}
		sandbox.publish(navigationEventName, {
			stateObj: newState,
			pageTitle: null,
			hash: token
		});
	}

	function getDetailInstanceId(cardModuleSandbox, detailItemName, entitySchemaName) {
		return cardModuleSandbox.id + "_" + entitySchemaName + "_detail_" + detailItemName;
	}

	function saveExecutionContext(executionContext, cardModuleSandbox) {
		const details = Ext.decode(executionContext);
		Terrasoft.each(details, function(detail) {
			if (!detail.collapsed) {
				const detailInstanceId = getDetailInstanceId(cardModuleSandbox, detail.name, detail.filterPath);
				cardModuleSandbox.publish("SaveDetails", null, [detailInstanceId]);
			}
		});
	}

	function onCardModuleSaved(item, cardModuleSandbox) {
		const currentState = sandbox.publish("GetHistoryState");
		const state = currentState.state || {};
		const newState = Terrasoft.deepClone(state);
		const executionData = newState.executionData;
		let currentExecDataItem = executionData.previousProcElUId;
		if (Ext.isEmpty(currentExecDataItem)) {
			currentExecDataItem = executionData[executionData.currentProcElUId];
			delete executionData[executionData.currentProcElUId];
			delete executionData.currentProcElUId;
		} else {
			delete executionData.previousProcElUId;
		}
		if (!Ext.isEmpty(currentExecDataItem.executionContext)) {
			saveExecutionContext(currentExecDataItem.executionContext, cardModuleSandbox);
		}
		replaceHistoryState(currentState, newState);
		if (currentExecDataItem && currentExecDataItem.completeExecution === true) {
			item.nextPrcElReady = true;
			completeExecution(this, currentExecDataItem.procElUId, null,
				function(success, completeExecutionData) {
					if (completeExecutionData &&
						!completeExecutionData.nextPrcElReady) {
						const currentState = sandbox.publish("GetHistoryState");
						const state = currentState.state || {};
						const executionData = state.executionData;
						if (ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
							changeNextProcExecDataHistoryState(executionData);
						} else {
							Terrasoft.Router.back();
						}
					}
				});
		} else if (item && item.nextPrcElReady === false &&
			ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
			item.nextPrcElReady = true;
			const select = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SysProcessData"
			});
			select.addColumn("Id");
			select.getEntity(executionData.processId, function(result) {
				const entity = result.entity;
				const currentState = sandbox.publish("GetHistoryState");
				const state = currentState.state || {};
				const executionData = state.executionData;
				if (entity && ProcessModuleUtilities.getProcExecDataCollectionCount(executionData) > 0) {
					changeNextProcExecDataHistoryState(executionData);
				} else {
					Terrasoft.Router.back();
				}
			}, this);
		}
	}

	function removeProcExecDataItem(procElUId) {
		delete processExecData[procElUId];
	}

	function onProcessExecDataChanged(data) {
		getProcessExecData(this, data);
	}

	function onGetProcessEntryPointsData(dataSend) {
		callConfigurationServiceMethod("ProcessEngineService/GetProcessEntryPointsData",
			{
				entitySchemaUId: dataSend.entitySchemaUId,
				entityId: dataSend.recordId
			},
			function(response) {
				dataSend.callback.call(dataSend.scope, response["GetProcessEntryPointsDataResult"]);
			});
	}

	function onGetProcessExecData() {
		return processExecData[processExecData.currentProcElUId];
	}

	function onGetProcessExecDataCollection() {
		return processExecData;
	}

	function getProcessExecData(scope, data) {

		Terrasoft.AjaxProvider.request({
			url: "../ServiceModel/ProcessEngineService.svc/" +
				"GetExecutionData?ProcElUId=" + data.procElUId + "&RecordId=" + data.recordId,
			method: "POST",
			scope: scope,
			callback: function(request, success, response) {
				if (success) {
					const nextProcessExecData = Ext.decode(Ext.decode(response.responseText));
					if (nextProcessExecData.status) {
						if (nextProcessExecData.status === "404") {
							data.scope.showInformationDialog.call(data.scope, nextProcessExecData.message);
							return;
						}
						if (window.console && window.console.log) {
							const elementNotFoundMessage = resources.localizableStrings
								.ElementNotFoundByUIdExceptionMessage.replace("{0}", data.procElUId);
							window.console.log(elementNotFoundMessage);
						}
						if (data.parentMethod) {
							data.parentMethod.call(data.scope, data.parentMethodArguments);
						}
					} else {
						processExecData = {
							processId: nextProcessExecData.processId
						};
						processExecData[data.procElUId] = nextProcessExecData;
						changeNextProcExecDataHistoryState(processExecData);
					}
				}
			}
		});
	}

	function callConfigurationServiceMethod(serviceMethodName, dataSend, callback) {
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
			callback: function(request, success, response) {
				if (!callback) {
					return;
				}
				let responseObject = {};
				if (success) {
					responseObject = Terrasoft.decode(response.responseText);
				}
				callback.call(this, responseObject);
			}
		});
		return request;
	}

	function completeExecution(scope, procElUId, params, callback) {
		MaskHelper.ShowBodyMask();
		let responseCallback = function() {
			MaskHelper.HideBodyMask();
		};
		if (callback) {
			responseCallback = function(request, success, response) {
				MaskHelper.HideBodyMask();
				const completeExecutionData = Ext.decode(Ext.decode(response.responseText));
				callback.call(scope || this, success, completeExecutionData);
			};
		}
		Terrasoft.AjaxProvider.request({
			url: "../ServiceModel/ProcessEngineService.svc/" + procElUId +
				"/CompleteExecution" + (params || ""),
			method: "POST",
			scope: this,
			callback: responseCallback
		});
	}

	function cancelExecution(scope, data, callback) {
		scope = scope || this;
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
				if (!callback) {
					return;
				}
				callback.call(scope, request, success, response);
			}
		});
	}

	const services = {
		completeExecution: completeExecution,
		cancelExecution: cancelExecution,
		callConfigurationServiceMethod: callConfigurationServiceMethod
	};

	return {
		"init": init,
		replaceHistoryState: replaceHistoryState,
		changeNextProcExecDataHistoryState: changeNextProcExecDataHistoryState,
		changeCurrentProcExecItemInHistoryState: changeCurrentProcExecItemInHistoryState,
		removeProcExecDataItem: removeProcExecDataItem,
		onCardModuleSaved: onCardModuleSaved,
		services: services
	};
});


