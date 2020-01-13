if (!window.Terrasoft || !window.Terrasoft.useClientPerformanceLogger) {
	define("performanceLogger", [], function() {
		return {
			addModule: function() {},
			removeModule: function() {},
			startInitModule: function() {},
			endInitModule: function() {},
			startRenderModule: function() {},
			endRenderModule: function() {}
		};
	});
}

define("core-base", ["require", "bootstrap", "performancecountermanager", "ext-base", "performanceLogger"], function(
		require, bootstrap, performanceCounterManager, Ext, performanceLogger) {
	var configurationModulesDescriptor = {};
	var containersMap = {};
	var containersMapCache = {};
	var contexts = {};
	var ptpEvents = {};
	var subscribers = {};
	var chain = [];
	var observable = new Ext.util.Observable();
	var loadedModules = {};
	var loadingModules = {};
	var console = window.console;
	var scope;

	function removeModuleListeners(moduleName, moduleId) {
		var moduleSubscribers = subscribers[moduleId];
		for (var eventName in moduleSubscribers) {
			if (!moduleSubscribers.hasOwnProperty(eventName)) {
				continue;
			}
			var eventDescriptor = getEventDescriptor(eventName, moduleName);
			if (eventDescriptor && eventDescriptor.mode === "ptp") {
				var ptpEvent = ptpEvents[eventName];
				ptpEvent[moduleId] = null;
				delete ptpEvent[moduleId];
			}
			moduleSubscribers[eventName] = null;
			delete moduleSubscribers[eventName];
		}
	}

	function getEventDescriptor(eventName, moduleName) {
		var moduleDescriptor = getModuleDescriptor(moduleName);
		return moduleDescriptor && moduleDescriptor.messages && moduleDescriptor.messages[eventName] || null;
	}

	function setStyleSheetsDisabled(module, disabled) {
		function setDisabledAttribute(list, extension, applyRtl) {
			list.forEach(function(item) {
				if (applyRtl) {
					item = applyRtl(item);
				}
				var selector = "[href*=\"/" + item + extension;
				if (Terrasoft.hasOwnProperty("clientCoreUrl") && Terrasoft.hasOwnProperty("clientCoreHash")) {
					selector += "?hash=" + Terrasoft.clientCoreHash;
				}
				selector += "\"]";
				var node = Ext.DomQuery.selectNode(selector);
				if (!node) {
					writeErrorMessage("Node [" + selector + "] was not found");
					return;
				}
				node.disabled = disabled;
			});
		}

		if (module.css) {
			var isRightToLeft = Terrasoft.Resources && Terrasoft.Resources.CultureSettings
				&& Terrasoft.Resources.CultureSettings.isRightToLeft;
			if (Terrasoft.useStaticFileContent && isRightToLeft) {
				setDisabledAttribute(module.css, ".css", function(item) {
					return item + "-rtl";
				});
			} else {
				setDisabledAttribute(module.css, ".css");
			}
		}
		if (module.less) {
			setDisabledAttribute(module.less, ".less");
		}
	}

	function _isRenderToLastChainModuleContainer(renderTo) {
		if (!renderTo) {
			return false;
		}
		const lastChainModuleId = chain[chain.length - 1];
		const chainContainerId = getContainerByModuleId(lastChainModuleId);
		return (renderTo.id === chainContainerId);
	}

	function initModule(module, config, callback, scope) {
		if (module.init) {
			var endInitModuleLog = function() {
				performanceLogger.endInitModule(config.id);
				Ext.callback(callback, scope);
			};
			performanceLogger.startInitModule(config.id);
			module.renderToId = config.renderTo && config.renderTo.id;
			safeExecute({
				fn: function() {
					if (module.isAsync === true) {
						module.init(endInitModuleLog, scope);
					} else {
						module.init();
						endInitModuleLog();
					}
				},
				args: (callback) ? [callback, scope] : [],
				scope: module,
				errorInfo: {
					moduleId: config.id,
					moduleName: config.moduleName,
					keepAlive: config.keepAlive,
					chain: chain,
					contexts: contexts
				}
			});
		}
	}

	function renderModule(module, config) {
		var renderTo = module.renderTo || config.renderTo;
		if (renderTo) {
			var renderToId = renderTo.id;
			delete loadingModules[renderToId];
			containersMap[renderTo.id] = config.id;
			if (module.render) {
				performanceLogger.startRenderModule(config.id);
				safeExecute({
					fn: function() {
						module.render.apply(this, arguments);
						performanceLogger.endRenderModule(config.id);
						performanceLogger.removeModule(config.id);
					},
					args: [renderTo],
					scope: module,
					errorInfo: {
						moduleName: config.moduleName,
						moduleId: config.id,
						contexts: contexts,
						chain: chain,
						keepAlive: config.keepAlive
					}
				});
			}
			var moduleDescriptor = getModuleDescriptor(config.moduleName);
			if (moduleDescriptor) {
				setStyleSheetsDisabled(moduleDescriptor, false);
			}
		} else {
			performanceLogger.removeModule(config.id);
		}
		loadNestedModules(config.id);
	}

	function _rollbackChainAndActualizeContainersMap(chainIndex) {
		const result = rollbackChain(chainIndex);
		if (result && result.renderTo) {
			containersMap[result.renderTo.id] = chain[chainIndex];
		}
	}

	function unloadRequiredModulesInChain(isKeepAlive, currentModuleId, config) {
		if (!isKeepAlive) {
			let chainIndex = chain.lastIndexOf(currentModuleId);
			chainIndex = chainIndex < 0 ? 0 : chainIndex;
			_rollbackChainAndActualizeContainersMap(chainIndex);
			chain.pop();
		}
		if (isKeepAlive && config.replaceLastModuleInChain) {
			_rollbackChainAndActualizeContainersMap(chain.length - 2);
		}
	}

	function _processModule(exportedModule, config) {
		if (!getIsModuleActive(config)) {
			tryCancelModuleLoading(config, config.id);
			return;
		}
		const id = config.id;
		const keepAlive = config.keepAlive;
		if (_isRenderToLastChainModuleContainer(config.renderTo)) {
			unloadRequiredModulesInChain(keepAlive === true, id, config);
			chain.push(id);
		}
		var module = exportedModule || {};
		var renderTo = module.renderTo || config.renderTo;
		var renderChainModule = function() {
			if (renderTo) {
				var currentModuleId = containersMap[renderTo.id];
				if (currentModuleId !== id) {
					if (currentModuleId) {
						unloadModule(currentModuleId, renderTo, keepAlive);
					}
				}
			}
			renderModule(module, config);
			performanceCounterManager.stop(id + "_loadModule");
			Ext.callback(config.callback, config.scope);
		};
		if (module.isAsync === true) {
			initModule(module, config, renderChainModule, this);
		} else {
			initModule(module, config);
			renderChainModule();
		}
	}

	/**
	 * Loads async nested module.
	 * @param {Object} nestedModule Module which should be loaded.
	 * @param {Object} config Load options config.
	 * @param {Object} scope Module rendering function scope.
	 */
	function loadAsyncNestedModule(nestedModule, config, scope) {
		initModule(nestedModule, config, function() {
			renderModule(nestedModule, config);
		}, scope);
	}

	function loadNestedModules(moduleId) {
		var context = contexts[moduleId];
		var nestedModules = context.modules;
		for (var i = 0, len = nestedModules.length; i < len; i++) {
			var nestedModuleId = nestedModules[i];
			var nestedModuleContainerId = getContainerByModuleId(nestedModuleId);
			var nestedModuleRenderTo = Ext.get(nestedModuleContainerId);
			var nestedModule = loadedModules[nestedModuleId];
			if (!nestedModule) {
				continue;
			}
			var nestedModuleConfig = contexts[nestedModuleId];
			var nestedModuleName = nestedModuleConfig.name;
			var config = {
				id: nestedModuleId,
				moduleName: nestedModuleName,
				renderTo: nestedModuleRenderTo
			};
			if (nestedModule.isAsync === true) {
				loadAsyncNestedModule(nestedModule, config, this);
			} else {
				initModule(nestedModule, config);
				renderModule(nestedModule, config);
			}
		}
	}

	function createModuleInstance(modulesFactory, moduleName, config) {
		var moduleId = config.id;
		if (!requirejs.defined(moduleId)) {
			var factoryName = moduleName + "_factory";
			if (!(factoryName in contexts)) {
				contexts[factoryName] = contexts[moduleId];
			}
			delete contexts[moduleId];
			requirejs.undef("sandbox_" + moduleId);
			requirejs.undef("ext_" + moduleId);
			requirejs.undef("terrasoft_" + moduleId);
			createContext(moduleId, config);
			define(moduleId, ["ext-base", "terrasoft", "sandbox"], function(Ext, Terrasoft, sandbox) {
				var context = {};
				var instanceConfig = config.instanceConfig;
				if (instanceConfig && (typeof instanceConfig === "object")) {
					context = prepareParameters(instanceConfig);
				}
				if (config.parameters && (typeof config.parameters === "object")) {
					context.parameters = prepareParameters(config.parameters);
				}
				context.Ext = Ext;
				context.sandbox = sandbox;
				context.Terrasoft = Terrasoft;
				var Constructor;
				var moduleInstance;
				if (modulesFactory.$isClass === true) {
					Constructor = modulesFactory;
					moduleInstance = new Constructor(context);
				} else {
					Constructor = safeExecute({
						fn: modulesFactory,
						scope: modulesFactory,
						args: [context],
						errorInfo: {
							moduleName: moduleName,
							contexts: contexts,
							chain: chain,
							moduleId: moduleId
						}
					});
					moduleInstance = new Constructor();
				}
				moduleInstance.isDestroyed = false;
				loadedModules[moduleId] = moduleInstance;
				return moduleInstance;
			});
		}
		require([moduleId], function(module) {
			_processModule(module, config);
		});
	}

	/**
	 * Filters parameters from configuration object and clones them.
	 * @private
	 * @param {Object} sourceObject Configuration object with parameters.
	 * @return {Object} Clone configuration object with selected parameters.
	 */
	function prepareParameters(sourceObject) {
		if ((sourceObject === null) || (typeof sourceObject === "undefined") ||
			(typeof sourceObject === "function")) {
			return null;
		}
		if (typeof sourceObject !== "object") {
			return sourceObject;
		}
		if (sourceObject.constructor === Date) {
			var cloneDate = new Date();
			cloneDate.setTime(sourceObject.getTime());
			return cloneDate;
		}
		var isArray = (sourceObject.constructor === Array);
		var clone = isArray ? [] : {};
		for (var parameterName in sourceObject) {
			if (isArray && !sourceObject.hasOwnProperty(parameterName)) {
				continue;
			}
			var value = sourceObject[parameterName];
			var valueType = typeof value;
			if (valueType === "object" && (isHtmlElement(value) || isClassInstance(value))) {
				continue;
			}
			var acceptableTypes = ["number", "string", "boolean", "object"];
			if (acceptableTypes.indexOf(valueType) !== -1) {
				clone[parameterName] = prepareParameters(value);
			}
		}
		return clone;
	}

	/**
	 * Indicates whether object is Html element.
	 * @private
	 * @param {Object} element Configuration object.
	 * @return {Boolean}
	 */
	function isHtmlElement(element) {
		return element instanceof HTMLElement;
	}

	/**
	 * Indicates whether object is class instance.
	 * @private
	 * @param {Object} element Configuration object.
	 * @return {Boolean}
	 */
	function isClassInstance(element) {
		return Boolean(element && element.$className && element.superclass);
	}

	/**
	 * Loads module.
	 * @param {String} moduleName Module's name.
	 * @param {Object} config Load options config.
	 * @param {String} [config.id] Module identifier. If not set, #moduleName will be used.
	 * @param {Ext.dom.Element} [config.renderTo] Container, into which module will be loaded. If method #loadModule is
	 * called from sandbox, it's allowed to use name of the container for this parameter value.
	 * @param {Boolean} [config.keepAlive] Indicates that the previous loaded module shouldn't be unloaded after
	 * loading of this module.
	 * @param {Object} [config.parameters] Additional module parameters. Object will be accessible in property
	 * 'parameters' of module instance. Used only for instantiated modules.
	 * @param {Object} [config.instanceConfig] Module constructor arguments. Used only for instantiated modules.
	 * @param {Object} [config.replaceLastModuleInChain] If defined as true, current last module in chain will be
	 * unloaded before loading new module. Works only in case of keepAlive defined as true.
	 * @return {String} Module identifier.
	 */
	function loadModule(moduleName, config) {
		if (!config) {
			config = {};
		}
		if (!config.id) {
			config.id = moduleName;
		}
		var id = config.id;
		performanceCounterManager.start(id + "_loadModule");
		if (config.replaceLastModuleInChain && config.keepAlive) {
			const lastModuleId = chain[chain.length - 1];
			if (lastModuleId === id) {
				// when last module has same module id as new module, we should unload it first,
				// otherwise we will unload new module itself.
				config.replaceLastModuleInChain = false;
				_rollbackChainAndActualizeContainersMap(chain.length - 2);
			}
		}
		performanceLogger.addModule(id, moduleName);
		config.moduleName = moduleName;
		var module = getModuleDescriptor(moduleName) || {};
		var cssDependencies = module.css ? bootstrap.mapResourcesToPath(module.css, module.path, "css") : [];
		var lessDependencies = module.less ? bootstrap.mapResourcesToPath(module.less, module.path, "less") : [];
		createContext(moduleName, config);
		prepareModuleLoading(config);
		require(["ext-base"].concat(cssDependencies).concat(lessDependencies), function() {
			require([moduleName], function(exportedModule) {
				if (typeof exportedModule === "function") {
					createModuleInstance(exportedModule, moduleName, config);
				} else {
					exportedModule = exportedModule || {};
					_processModule(exportedModule, config);
					exportedModule.isDestroyed = false;
					exportedModule.instanceId = Terrasoft.generateGUID();
					loadedModules[config.id] = exportedModule;
				}
			});
		});
		return id;
	}

	function prepareModuleLoading(config) {
		var renderTo = config.renderTo;
		var useSafeLoad = false;
		if (renderTo) {
			var renderToId = renderTo.id;
			useSafeLoad = !config.keepAlive;
			var previousModule = loadingModules[renderToId];
			loadingModules[renderToId] = {
				id: config.id,
				keepAlive: config.keepAlive
			};
			if (useSafeLoad && previousModule) {
				tryCancelModuleLoading(config, previousModule.id);
			}
		}
		config.useSafeLoad = useSafeLoad;
	}

	function tryCancelModuleLoading(config, moduleId) {
		var renderToId = config.renderTo.id;
		if (loadedModules.hasOwnProperty(moduleId)) {
			unloadModule(moduleId, renderToId, false);
		} else {
			delete contexts[moduleId];
		}
	}

	function getIsModuleActive(config, moduleId) {
		if (!config.useSafeLoad) {
			return true;
		}
		var moduleToCheckId = moduleId || config.id;
		var renderToId = config.renderTo.id;
		var loadingModule = loadingModules[renderToId];
		return loadingModule && (loadingModule.keepAlive || (loadingModule.id === moduleToCheckId));
	}

	function isCurrentModuleClass(moduleName) {
		var defined = requirejs.defined(moduleName);
		if (defined === true) {
			var definedModule = require(moduleName);
			return definedModule != null && definedModule.$isClass === true;
		}
		return false;
	}

	function unloadModule(id, renderTo, keepAlive) {
		var i;
		var len;
		if (!renderTo) {
			var moduleContainerId = getContainerByModuleId(id);
			renderTo = Ext.get(moduleContainerId);
		}
		var context = contexts[id];
		if (context == null) {
			return;
		}
		var moduleName = context.name;
		var module = loadedModules[id];
		if (module) {
			if (module.destroy && !module.destroyed) {
				safeExecute({
					fn: module.destroy,
					scope: module,
					args: [{keepAlive: keepAlive}],
					errorInfo: {
						moduleName: moduleName,
						contexts: contexts,
						chain: chain,
						moduleId: id,
						keepAlive: keepAlive
					}
				});
			}
			if (keepAlive !== true) {
				module.isDestroyed = true;
				delete loadedModules[id];
				module = null;
			}
		}
		var nestedModules = context.modules;
		for (i = 0, len = nestedModules.length; i < len; i++) {
			var nestedModuleId = nestedModules[i];
			unloadModule(nestedModuleId, null, keepAlive);
		}
		if (keepAlive !== true) {
			var requests = context.requests;
			for (i = 0, len = requests.length; i < len; i++) {
				var request = requests[i];
				if (!request.completed) {
					Terrasoft.AjaxProvider.abortRequest(request);
				}
			}
			removeModuleListeners(moduleName, id);
			requirejs.undef("sandbox_" + id);
			requirejs.undef("ext_" + id);
			requirejs.undef("terrasoft_" + id);
			if (isCurrentModuleClass(moduleName) !== true) {
				requirejs.undef(moduleName);
			}
			requirejs.undef(id);
			delete contexts[id];
		}
		var components = context.components;
		var aliveComponents = [];
		for (var j = components.length; j--;) {
			var component = components.pop();
			if (component.isComponent !== true && keepAlive === true) {
				aliveComponents.push(component);
				continue;
			}
			if (component.destroyed !== true) {
				safeExecute({
					fn: component.destroy,
					scope: component,
					errorInfo: {
						moduleName: moduleName,
						contexts: contexts,
						chain: chain,
						moduleId: id,
						keepAlive: keepAlive
					}
				});
			}
		}
		context.components = aliveComponents;
		if (renderTo) {
			if (keepAlive === true) {
				containersMapCache[id] = renderTo.id;
			} else {
				delete containersMapCache[id];
			}
			delete containersMap[renderTo.id];
		}
		var moduleDescriptor = getModuleDescriptor(moduleName);
		if (moduleDescriptor) {
			setStyleSheetsDisabled(moduleDescriptor, true);
		}
	}

	function getContainerByModuleId(moduleId) {
		var moduleContainerId = null;
		for (var containerId in containersMap) {
			if (!containersMap.hasOwnProperty(containerId)) {
				continue;
			}
			if (containersMap[containerId] === moduleId) {
				moduleContainerId = containerId;
				break;
			}
		}
		if (!moduleContainerId) {
			moduleContainerId = containersMapCache[moduleId];
		}
		return moduleContainerId;
	}

	function rollbackChain(chainIndex) {
		var chainLength = chain.length;
		if (chainLength <= 1) {
			return null;
		}
		var lastChainModuleId = chain[chainLength - 1];
		var chainContainerId = getContainerByModuleId(lastChainModuleId);
		var modulesToUnload = chain.slice(chainIndex + 1);
		chain = chain.slice(0, chainIndex + 1);
		for (var i = modulesToUnload.length; i--;) {
			var moduleId = modulesToUnload.pop();
			unloadModule(moduleId);
		}
		lastChainModuleId = chain[chain.length - 1];
		var lastModuleContext = contexts[lastChainModuleId];
		return {
			loadModuleName: lastModuleContext.name,
			renderTo: Ext.get(chainContainerId || "")
		};
	}

	function extend(parent) {
		var F = function() {
		};
		var constructor = function() {
		};
		F.prototype = parent;
		constructor.prototype = new F();
		constructor.constructor = constructor;
		constructor.superclass = parent;
		return constructor;
	}

	function createSandbox(sandbox, config) {
		var moduleId = config.id;
		var InjectedSandbox = extend(sandbox.prototype);
		var injectedSandbox = new InjectedSandbox();
		injectedSandbox.id = moduleId;
		injectedSandbox.moduleName = config.moduleName;
		var profileKey = config.profileKey;
		if (profileKey) {
			injectedSandbox.profileKey = profileKey;
		}
		injectedSandbox.loadModule = function(moduleName, config) {
			config = config || {};
			var id = config.id;
			if (!id) {
				var prefix = this.id;
				id = config.id = prefix ? prefix + "_" + moduleName : moduleName;
			}
			var loadModuleName = moduleName;
			var chainIndex = chain.indexOf(id);
			var chainLength = chain.length;
			var renderTo = config.renderTo;
			if (typeof renderTo === "string") {
				var renderToId = renderTo;
				renderTo = config.renderTo = Ext.get(renderToId);
				if (!renderTo) {
					var notFoundMessageTemplate = Terrasoft.Resources.Core.RenderToElementNotFound;
					var notFoundMessage = Ext.String.format(notFoundMessageTemplate, renderToId);
					writeErrorMessage(notFoundMessage);
				}
			} else if (renderTo && renderTo.dom) {
				var messageTemplate = Terrasoft.Resources.ObsoleteMessages.ArgumentTypeObsoleteMessage;
				var message = Ext.String.format(messageTemplate, "object", "renderTo", "string");
				writeWarnMessage(message);
			}
			if (chainIndex > 0 || (chainIndex === 0 && chainLength > 1)) {
				var lastChainModuleId = chain[chain.length - 1];
				var chainContainerId = getContainerByModuleId(lastChainModuleId);
				if (renderTo && !_isRenderToLastChainModuleContainer(renderTo)) {
					writeErrorMessage(getFormattedString(Terrasoft.Resources.Core.chainModuleRenderError,
						[id, renderTo.id, chainContainerId]));
				}
				config.renderTo = Ext.get(chainContainerId);
				var chainContext = contexts[id];
				loadModuleName = chainContext.name;
			} else {
				if (config.keepAlive !== true) {
					var context = contexts[moduleId];
					var isModuleExist = (contexts[id] != null);
					if (config.reload !== false && isModuleExist === true) {
						unloadModule(id);
					}
					if (isModuleExist === false) {
						var nestedModules = context.modules;
						if (nestedModules.indexOf(id) < 0) {
							nestedModules.push(id);
						}
					}
				} else {
					var chainStartModuleId = renderTo ? containersMap[renderTo.id] : null;
					if (!chainStartModuleId) {
						chainStartModuleId = id;
					}
					chainIndex = chain.indexOf(chainStartModuleId);
					if (chainIndex < 0 && renderTo) {
						createNewChain(chainStartModuleId, renderTo.id);
					}
				}
			}
			var args = Array.prototype.slice.call(arguments);
			args[0] = loadModuleName;
			args[1] = config;
			return InjectedSandbox.superclass.loadModule.apply(this, args);
		};
		return injectedSandbox;
	}

	function createNewChain(chainStartModuleId, newContainerId) {
		if (chain.length <= 1) {
			chain = [chainStartModuleId];
		} else {
			var lastChainModuleId = chain[chain.length - 1];
			var currentContainerId = getContainerByModuleId(lastChainModuleId);
			writeErrorMessage(getFormattedString(Terrasoft.Resources.Core.chainContainerError,
				[newContainerId, currentContainerId]));
		}
	}

	/**
	 * Writes error message to the console.
	 * @param {String} message The message.
	 */
	function writeErrorMessage(message) {
		if (console && console.error) {
			console.error(message);
		}
	}

	/**
	 * Writes warning message to the console.
	 * @param {String} message The message.
	 */
	function writeWarnMessage(message) {
		if (console && console.warn) {
			console.warn(message);
		}
	}

	/**
	 * Formats string by the template.
	 * Using example:
	 *    getFormattedString('some {0} text {1}', ['good', 'allowed']) returns 'some good text allowed'.
	 *    getFormattedString('Module {moduleName} does not support event "{eventName}", modify module descriptor', {
	 *		moduleName: 'myModule',
	 *		eventName: 'getCurrentHash'
	 *	}) returns the string 'Module myModule does not support event "getCurrentHash", modify module descriptor'.
	 * @param {String} string String template.
	 * @param {Object|Array} params Formatting options.
	 * @return {String} Formatted string.
	 * The method makes parameterized replacement in the string.
	 */
	function getFormattedString(string, params) {
		var formattedString = string;
		for (var propertyName in params) {
			var re = new RegExp("\\{" + propertyName + "\\}", "gi");
			formattedString = formattedString.replace(re, params[propertyName]);
		}
		return formattedString;
	}

	function createExt(Ext, config) {
		var moduleId = config.id;
		var InjectedExt = extend(Ext);
		var injectedExt = new InjectedExt();
		injectedExt.id = config.id;
		injectedExt.moduleName = config.moduleName;
		injectedExt.create = function() {
			var context = contexts[moduleId];
			if (!context) {
				var warnMessage = getFormattedString(Terrasoft.Resources.Core.InstanceCreateErrorModuleContextNotFound,
					[moduleId]);
				writeWarnMessage(warnMessage);
				return null;
			}
			var component = Ext.create.apply(this, arguments);
			context.components.push(component);
			return component;
		};
		return injectedExt;
	}

	function createTerrasoft(Terrasoft, config) {
		var moduleId = config.id;
		var InjectedTerrasoft = extend(Terrasoft);
		var injectedTerrasoft = new InjectedTerrasoft();
		injectedTerrasoft.id = config.id;
		injectedTerrasoft.moduleName = config.moduleName;
		var ExtendedAjaxProvider = extend(Terrasoft.AjaxProvider);
		injectedTerrasoft.AjaxProvider = new ExtendedAjaxProvider();
		var baseRequest = Terrasoft.AjaxProvider.request;
		injectedTerrasoft.AjaxProvider.request = function(requestConfig) {
			var requestObj = baseRequest.call(Terrasoft.AjaxProvider, requestConfig);
			saveModuleRequest(moduleId, requestObj);
			return requestObj;
		};
		return injectedTerrasoft;
	}

	function saveModuleRequest(moduleId, requestObj) {
		var context = contexts[moduleId];
		context.requests.push(requestObj);
	}

	function createContext(moduleName, config) {
		var id = config.id;
		if (contexts[id]) {
			return;
		}
		contexts[id] = {
			requests: [],
			components: [],
			modules: [],
			name: config.moduleName
		};
		var sandboxName = "sandbox_" + id;
		define(sandboxName, ["sandbox"], function(sandbox) {
			return createSandbox(sandbox, config);
		});
		var extName = "ext_" + id;
		define(extName, ["ext-base"], function(Ext) {
			return createExt(Ext, config);
		});
		var terrasoftName = "terrasoft_" + id;
		define(terrasoftName, ["terrasoft"], function(Terrasoft) {
			return createTerrasoft(Terrasoft, config);
		});
		var map = {};
		map[moduleName] = {
			"sandbox": sandboxName,
			"ext-base": extName,
			"terrasoft": terrasoftName
		};
		requirejs.config({
			map: map
		});
	}

	function getModuleDescriptor(moduleName) {
		return configurationModulesDescriptor[moduleName] || null;
	}

	function setModuleDescriptor(moduleName, descriptor) {
		configurationModulesDescriptor[moduleName] = descriptor;
		if (descriptor == null) {
			return;
		}
		var paths = {};
		var path = descriptor.path;
		var moduleResourceName = moduleName + "Resources";
		if (path) {
			var moduleFullName = [path, moduleName].join("/");
			paths[moduleName] = moduleFullName;
			if (!descriptor.isResourceModule) {
				paths[moduleResourceName] = moduleFullName;
			}
		} else if (Terrasoft && Terrasoft.useStaticFileContent) {
			paths[moduleName] = Terrasoft.SchemaUrlBuilder.getUrl(moduleName);
			paths[moduleResourceName] = Terrasoft.ResourceUrlBuilder.getUrl(moduleResourceName);
		} else {
			return;
		}
		requirejs.config({
			paths: paths
		});
	}

	function setModuleDescriptors(moduleDescriptors, isForceInitialization) {
		if (isForceInitialization) {
			configurationModulesDescriptor = moduleDescriptors;
			return;
		}
		for (var moduleName in moduleDescriptors) {
			if (moduleDescriptors.hasOwnProperty(moduleName)) {
				var moduleDescriptor = moduleDescriptors[moduleName];
				setModuleDescriptor(moduleName, moduleDescriptor);
			}
		}
	}

	function errorHandler(errorEvent) {
		require(["terrasoft"], function(Terrasoft) {
			try {
				var currentUser = Terrasoft.SysValue.CURRENT_USER;
				var errorObject = {
					file: errorEvent.filename,
					line: errorEvent.lineno,
					column: errorEvent.colno,
					message: errorEvent.message,
					toString: function() {
						var errorInfo = errorEvent.errorInfo;
						var message = "user: " + currentUser.displayValue + "/" + currentUser.value + "\n file: " +
							this.file + "\n line: " + this.line + "\n column: " + this.column + "\n message: " +
							this.message + " \n date: " + new Date();
						if (errorInfo) {
							message += "\n moduleId: " + errorInfo.moduleId + "\n moduleName: " + errorInfo.moduleName;
						}
						var error = errorEvent.error;
						if (error) {
							message += "\n stack: " + error.stack;
						}
						return message;
					}
				};
				var errorMessage = errorObject.toString();
				writeErrorMessage(errorMessage);
				Terrasoft.Logger.error(errorMessage);
			} catch (e) {
				var handlerErrorMessage = "errorHandler execution error" + "\n message: " + e.message;
				writeErrorMessage(handlerErrorMessage);
			}
		});
	}

	function safeExecute(config) {
		var fn = config.fn;
		var args = config.args || [];
		var scope = config.scope || this;
		var errorInfo = config.errorInfo;
		if (Terrasoft && Terrasoft.isDebug) {
			return fn.apply(scope, args);
		}
		try {
			return fn.apply(scope, args);
		} catch (exception) {
			exception.errorInfo = errorInfo;
			errorHandler(exception);
		}
	}

	function addErrorHandler() {
		if (window.addEventListener) {
			window.addEventListener("error", errorHandler, false);
		} else {
			window.attachEvent("onerror", errorHandler);
		}
	}

	function reset() {
		for (var module in loadedModules) {
			if (!loadedModules.hasOwnProperty(module)) {
				return;
			}
			unloadModule(module);
		}
		configurationModulesDescriptor = {};
		containersMap = {};
		containersMapCache = {};
		contexts = {};
		chain = [];
		loadedModules = {};
	}

	function init(coreModules, configurationModules, baseUrl, objectConsole) {
		addErrorHandler();
		bootstrap.init(coreModules, baseUrl, scope);
		configurationModulesDescriptor = configurationModules;
		console = objectConsole || window.console;
	}

	function setScope(scopeName) {
		scope = scopeName;
	}

	loadModule._loadingModules = loadingModules;

	return {
		init: init,
		setScope: setScope,
		loadModule: loadModule,
		unloadModule: unloadModule,
		createContext: createContext,
		safeExecute: safeExecute,
		removeModuleListeners: removeModuleListeners,
		getModuleDescriptor: getModuleDescriptor,
		setModuleDescriptor: setModuleDescriptor,
		setModuleDescriptors: setModuleDescriptors,
		reset: reset,
		observable: observable,
		ptpEvents: ptpEvents,
		subscribers: subscribers,
		getFormattedString: getFormattedString,
		writeErrorMessage: writeErrorMessage
	};
});
