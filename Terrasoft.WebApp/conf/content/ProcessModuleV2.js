Terrasoft.configuration.Structures["ProcessModuleV2"] = {innerHierarchyStack: ["ProcessModuleV2"]};
define("ProcessModuleV2", ["ext-base", "terrasoft", "sandbox"],
	function(Ext, Terrasoft, sandbox) {

		var injectedExt = Ext;
		var injectedTerrasoft = Terrasoft;
		var injectedSandbox = sandbox;

		function initContext(callback, scope) {
			if (injectedSandbox && !Ext.isFunction(injectedSandbox)) {
				if (callback) {
					callback.call(scope);
				}
				return;
			}
			var core = require("core-base");
			var id = "ProcessModuleV2_injected";
			core.createContext("ProcessModuleV2", {"id": id, "moduleName": "ProcessModuleV2"});
			injectedExt = require(["ext_" + id, "terrasoft_" + id, "sandbox_" + id], function(Ext, Terrasoft, sandbox) {
				injectedExt = Ext;
				injectedTerrasoft = Terrasoft;
				injectedSandbox = sandbox;
				if (callback) {
					callback.call(scope);
				}
			});
		}

		/**
		 * @depreceted
		 */
		function init() {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteModule,
				"ProcessModuleV2", "ProcessListenerV2"));
			initContext(function() {
				injectedSandbox.loadModule("ProcessListenerV2");
			}, this);
		}

		/**
		 * @depreceted
		 */
		function replaceHistoryState(currentState, newState) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"replaceHistoryState", "sandbox.publish(\"ReplaceHistoryState\",...}"));
			initContext(function() {
				injectedSandbox.publish("ReplaceHistoryState", {
					stateObj: newState,
					pageTitle: null,
					hash: currentState.hash.historyState,
					silent: true
				});
			}, this);
		}

		/**
		 * @depreceted
		 */
		function changeNextProcExecDataHistoryState(nextProcessExecData) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"changeNextProcExecDataHistoryState",
				"sandbox.publish(\"ChangeNextProcExecDataHistoryState\",...}"));
			initContext(function() {
				injectedSandbox.publish("ChangeNextProcExecDataHistoryState", nextProcessExecData);
			}, this);
		}

		/**
		 * @depreceted
		 */
		function changeCurrentProcExecItemInHistoryState(processExecDataItem) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"changeCurrentProcExecItemInHistoryState",
				"sandbox.publish(\"ChangeCurrentProcExecItemInHistoryState\",...}"));
			initContext(function() {
				injectedSandbox.publish("ChangeCurrentProcExecItemInHistoryState", processExecDataItem);
			}, this);
		}

		/**
		 * @depreceted
		 */
		function onCardModuleSaved(config) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"onCardModuleSaved",
				"sandbox.publish(\"OnCardModuleSaved\",...}"));
			return injectedSandbox.publish("OnCardModuleSaved", config);
		}

		/**
		 * @depreceted
		 */
		function postponeProcessExecution() {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"postponeProcessExecution",
				"sandbox.publish(\"PostponeProcessExecution\",...}"));
			initContext(function() {
				injectedSandbox.publish("PostponeProcessExecution");
			}, this);
		}

		/**
		 * @depreceted
		 */
		function completeExecution(scope, procElUId, params, callback) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"completeExecution",
				"sandbox.publish(\"CompleteProcessExecution\",...}"));
			initContext(function() {
				var tag = injectedSandbox.id + Terrasoft.generateGUID();
				if (callback) {
					injectedSandbox.subscribe("ProcessExecutionCompleted", function(result) {
						callback.call(scope, result.success, result.completeExecutionData);
					}, this, [tag]);
				}
				injectedSandbox.publish("CompleteProcessExecution", {
					params: params,
					procElUId: procElUId,
					resultMessageTags: [tag]
				});
			}, this);
		}

		/**
		 * @depreceted
		 */
		function cancelExecution(scope, data, callback) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"cancelExecution",
				"sandbox.publish(\"CancelProcessExecution\",...}"));
			initContext(function() {
				var tag = injectedSandbox.id + Terrasoft.generateGUID();
				if (callback) {
					injectedSandbox.subscribe("ProcessExecutionCanceled", function(result) {
						callback.call(scope, result.request, result.success, result.response);
					}, this, [tag]);
				}
				injectedSandbox.publish("CancelProcessExecution", {
					data: data,
					resultMessageTags: [tag]
				});
			}, this);
		}

		/**
		 * @depreceted
		 */
		function callConfigurationServiceMethod(serviceMethodName, dataSend, callback, scope) {
			window.console.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"callConfigurationServiceMethod",
				"sandbox.publish(\"CallProcessServiceMethod\",...}"));
			initContext(function() {
				var tag = injectedSandbox.id + Terrasoft.generateGUID();
				if (callback) {
					injectedSandbox.subscribe("ProcessServiceMethodCalled", function(responseObject) {
						callback.call(scope || this, responseObject);
					}, this, [tag]);
				}
				injectedSandbox.publish("CallProcessServiceMethod", {
					serviceMethodName: serviceMethodName,
					data: dataSend,
					resultMessageTags: [tag]
				});
			}, this);
		}

		initContext();

		return {
			init: init,
			replaceHistoryState: replaceHistoryState,
			changeNextProcExecDataHistoryState: changeNextProcExecDataHistoryState,
			changeCurrentProcExecItemInHistoryState: changeCurrentProcExecItemInHistoryState,
			onCardModuleSaved: onCardModuleSaved,
			services: {
				completeExecution: completeExecution,
				cancelExecution: cancelExecution,
				callConfigurationServiceMethod: callConfigurationServiceMethod
			},
			postponeProcessExecution: postponeProcessExecution
		};
	});


