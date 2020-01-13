(function(global) {

	function prepareCoreModulePath(path) {
		var coreModulesPath = global.Terrasoft && global.Terrasoft.coreModulesPath;
		if (coreModulesPath) {
			path = coreModulesPath + path;
		}
		return path;
	}

	var requirejsMapConfig = {
		"css": prepareCoreModulePath("requirejs/css"),
		"less-rtl": prepareCoreModulePath("requirejs/less-rtl"),
		"less": prepareCoreModulePath("requirejs/less-loader"),
		"less-parser": prepareCoreModulePath("requirejs/less-parser"),
		"text": prepareCoreModulePath("requirejs/text")
	};

	function mapResourcesToPath(resources, modulePath, loader) {
		return resources.map(function(item) {
			/**
			 * TODO CRM-34171
			 * When UseStaticFileContent is enabled, module path is not defined in descriptors.
			 * Therefore we need to set it to a default directory.
			 */
			if (!modulePath && Terrasoft.useStaticFileContent) {
				modulePath = "conf/content";
			}
			return [loader, "!", modulePath, "/", item].join("");
		});
	}

	function prepareConfig(coreModules) {
		var shim = {};
		var paths = {
			profile: prepareCoreModulePath("requirejs/profile"),
			async: prepareCoreModulePath("requirejs/async")
		};
		var terrasoftDeps = [];
		var fakeModules = [];
		for (var propertyName in coreModules) {
			if (coreModules.hasOwnProperty(propertyName)) {
				var module = coreModules[propertyName];
				var moduleName = propertyName;
				var nameParts = moduleName.split("!");
				if (nameParts.length > 1) {
					var loaderName = nameParts[0];
					if (requirejsMapConfig.hasOwnProperty(loaderName)) {
						nameParts[0] = requirejsMapConfig[loaderName];
					}
					moduleName = nameParts.join("!");
				}
				var moduleDeps = module.deps || [];
				var modulePath = prepareCoreModulePath(module.path);
				if (module.css) {
					moduleDeps = moduleDeps.concat(mapResourcesToPath(module.css, modulePath, "css"));
				}
				if (module.less) {
					moduleDeps = moduleDeps.concat(mapResourcesToPath(module.less, modulePath, "less"));
				}
				var fileName = module.file || moduleName;
				if (global.Terrasoft && global.Terrasoft.scriptVersionPath && global.Terrasoft.scriptVersionPath[propertyName]) {
					fileName = Terrasoft.scriptVersionPath[propertyName];
				}
				if (fileName === "-") {
					fakeModules.push({
						name: moduleName,
						deps: moduleDeps
					});
				} else {
					paths[moduleName] = [modulePath, fileName].join("/");
				}
				if (module.requireDefine !== false) {
					var moduleShim = shim[moduleName] = {
						deps: moduleDeps
					};
					if (module.exports) {
						moduleShim.exports = module.exports;
					}
				}
				if (module.external) {
					continue;
				}
				terrasoftDeps.push(moduleName);
			}
		}
		fakeModules.push({
			name: "terrasoft",
			deps: terrasoftDeps,
			factory: function() {
				return Terrasoft;
			}
		});
		return {
			shim: shim,
			paths: paths,
			fakeModules: fakeModules
		};
	}

	function init(coreModules, baseUrl) {
		var define = global.define;
		var config = prepareConfig(coreModules);
		var urlArgs;
		try {
			if (Terrasoft && Terrasoft.hasOwnProperty("clientCoreUrl") && Terrasoft.hasOwnProperty("clientCoreHash")) {
				urlArgs = "hash=" + Terrasoft.clientCoreHash;
			}
		} catch (e) {

		}
		var requireJsConfig = {
			baseUrl: baseUrl,
			paths: config.paths,
			shim: config.shim,
			map: {
				"*": requirejsMapConfig
			}
		};
		if (urlArgs) {
			requireJsConfig[urlArgs] = urlArgs;
		}
		requirejs.config(requireJsConfig);
		var fakeModules = config.fakeModules;
		for (var i = fakeModules.length; i--;) {
			var definition = fakeModules[i];
			define(definition.name, definition.deps, definition.factory || {});
		}
		define("sandbox", ["ext-base", "core-base"], function(Ext, core) {
			var ptpEvents = core.ptpEvents;
			var observable = core.observable;
			var getFormattedString = core.getFormattedString;
			var subscribers = core.subscribers;
			var sandboxConstructor = function() {};
			var dynamicMessages = {};
			var systemMessages = [
				"CanBeDestroyed",
				"BeforeDestroying",
			];
			var prepareRequireModuleDescriptorsConfig = function(core, moduleNames) {
				var getModuleDescriptorRequestConfig = function(moduleName) {
					var config = {};
					var params = moduleName.split("!");
					config.name = params.pop();
					config.mode = params.pop() || "get";
					return config;
				};
				moduleNames = moduleNames || [];
				var descriptorsRequestBody = [];
				var descriptorsConfigForLoad = {};
				var requestedDescriptors = {};
				for (var index in moduleNames) {
					if (!moduleNames.hasOwnProperty(index)) {
						continue;
					}
					var requestConfig = getModuleDescriptorRequestConfig(moduleNames[index]);
					if (requestConfig.mode === "force") {
						core.setModuleDescriptor(requestConfig.name, null);
					}
					var moduleDescriptor = core.getModuleDescriptor(requestConfig.name);
					if (moduleDescriptor === null) {
						descriptorsConfigForLoad[requestConfig.name] = requestConfig;
						requestedDescriptors[requestConfig.name] = null;
						descriptorsRequestBody.push(requestConfig.name);
					} else {
						requestedDescriptors[requestConfig.name] = moduleDescriptor;
					}
				}
				return {
					descriptorsRequestBody: descriptorsRequestBody,
					descriptorsConfigForLoad: descriptorsConfigForLoad,
					requestedDescriptors: requestedDescriptors
				};
			};

			/**
			 * Internal handler of the broadcast message. Used to filter messages by tags.
			 * If at least one of the tags specified in the publication and subscription of the message matches,
			 * the registered handler is called. If the tags were not specified at either the subscription
			 * or the publication, the handler is also called.
			 * @param eventArgs {Object} Message publisher parameters
			 * - **eventName** {Object}: The name of the message
			 * - **eventArguments** {Object}: Message options
			 * - **tags** {String[]}: Message filtering tags
			 * @private
			 */
			function innerEventHandler(eventArgs) {
				var eventName = eventArgs.eventName;
				var publisherTags = eventArgs.tags;
				var publisherTagsLength = publisherTags.length;
				for (var moduleId in subscribers) {
					if (!subscribers.hasOwnProperty(moduleId)) {
						continue;
					}
					var moduleSubscribers = subscribers[moduleId];
					var eventListeners = moduleSubscribers[eventName];
					if (eventListeners) {
						for (var i = 0, listenersLength = eventListeners.length; i < listenersLength; i++) {
							var listener = eventListeners[i];
							var subscriberTags = listener.tags;
							var executeConfig = {
								fn: listener.handler,
								scope: listener.scope || observable,
								args: [eventArgs.eventArguments],
								errorInfo: {
									moduleId: moduleId,
									eventName: eventName
								}
							};
							if (publisherTagsLength === 0 && subscriberTags.length === 0) {
								core.safeExecute(executeConfig);
								continue;
							}
							for (var j = 0; j < publisherTagsLength; j++) {
								var publishTag = publisherTags[j];
								if (subscriberTags.indexOf(publishTag) >= 0) {
									core.safeExecute(executeConfig);
									break;
								}
							}
						}
					}
				}
			}

			function emptyModuleDefinition() {
				return null;
			}

			/**
			 * Calls the ptp message handler.
			 * If a non-function is sent as a handler on the message, the call does not occur.
			 * @param cfg {Object} Calling parameters
			 * - **eventName** {String}: The name of the message
			 * - **handler** {Function}: The message handler
			 * - **eventArguments** {Object}: Message options
			 * - **scope** {Object}: Context for the execution of the handler
			 * @return {*} The result of the execution of the message handler.
			 * If the handler was not called, null will be returned.
			 * @private
			 */
			function firePtpEvent(cfg) {
				var result = null;
				var ptpHandler = cfg.handler;
				if (typeof ptpHandler === "function") {
					result = core.safeExecute({
						fn: ptpHandler,
						scope: cfg.scope,
						args: [cfg.eventArguments],
						errorInfo: {
							moduleName: this.moduleName,
							moduleId: this.id,
							eventName: cfg.eventName
						}
					});
				}
				return result;
			}

			/**
			 * Filters ptp messages and starts the message.
			 * @param cfg {Object} Parameters of the handler
			 * - **moduleId** String: Modile Id
			 * - **eventName** String: Name of the ptp message
			 * - **tags** String[]: Filtering tags
			 * @return {*} The result returned by the handler, if no handler was found,
			 * returns null.
			 * @private
			 */
			function publishPtpMessage(cfg) {
				var publishTags = cfg.tags;
				var eventName = cfg.eventName;
				var ptpEvent = ptpEvents[eventName];
				for (var moduleId in ptpEvent) {
					if (!ptpEvent.hasOwnProperty(moduleId)) {
						continue;
					}
					var ptpEventListeners = ptpEvent[moduleId];
					for (var i = 0, listenersLength = ptpEventListeners.length; i < listenersLength; i++) {
						var ptpEventListener = ptpEventListeners[i];
						var subscriberTags = ptpEventListener.tags;
						var firePtpEventConfig = {
							eventName: eventName,
							handler: ptpEventListener.handler,
							eventArguments: cfg.eventArguments,
							scope: ptpEventListener.scope || observable
						};
						if (publishTags.length === 0 && subscriberTags.length === 0) {
							return firePtpEvent(firePtpEventConfig);
						}
						for (var j = 0, len = publishTags.length; j < len; j++) {
							var publishTag = publishTags[j];
							if (subscriberTags.indexOf(publishTag) >= 0) {
								return firePtpEvent(firePtpEventConfig);
							}
						}
					}
				}
				return null;
			}

			/**
			 * Checks the descriptor of the module message and the feasibility of the operation.
			 * @private
			 * @param {Object} config Parameters for performing the operation.
			 * @param {Terrasoft.MessageDirectionType} config.messageDirection The direction of the message.
			 * @param {String} config.eventName The name of the message
			 * @param {Object} config.eventDescriptor The message descriptor of the module.
			 * @param {Object} config.moduleId Module Id
			 * @param {Object} config.moduleName Module name.
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * throws an exception if the message descriptor is null.
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * Throws an exception if an invalid operation is performed - the publication of a message for which a subscription
			 * is installed in the descriptor. Or the subscription to the message for which the descriptor has
			 * a publishing operation
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * Throws an exception if the message descriptor is not set to valid mode ('ptp' or 'broadcast').
			 */
			function checkEventDescriptor(config) {
				var messageDirection = config.messageDirection;
				var eventName = config.eventName;
				var eventDescriptor = config.eventDescriptor;
				var moduleId = config.moduleId;
				var moduleName = config.moduleName;
				var messageTemplate = "";
				var messageParams = {};
				var throwException = false;
				if (systemMessages.indexOf(eventName) !== -1) {
					return;
				}
				if (!eventDescriptor) {
					throwException = true;
					messageTemplate = "Message {messageName} is not defined in {moduleName} ({moduleId}) module";
					messageParams = {
						messageName: eventName,
						moduleId: moduleId,
						moduleName: moduleName
					};
				} else if (eventDescriptor.direction !== messageDirection &&
					eventDescriptor.direction !== Terrasoft.MessageDirectionType.BIDIRECTIONAL) {
					throwException = true;
					messageTemplate = "Message {messageName} cannot be {operation} in {moduleName} ({moduleId}), " +
						"message direction set as {messageDirection}";
					messageParams = {
						messageName: eventName,
						operation: messageDirection,
						moduleId: moduleId,
						moduleName: moduleName,
						messageDirection: eventDescriptor.direction
					};
				} else if (eventDescriptor.mode !== "ptp" && eventDescriptor.mode !== "broadcast") {
					throwException = true;
					messageTemplate = "{eventMode} is not supported type of message in {moduleName} ({moduleId}) module";
					messageParams = {
						eventMode: eventDescriptor.mode,
						moduleId: moduleId,
						moduleName: moduleName
					};
				}
				if (throwException) {
					var message = getFormattedString(messageTemplate, messageParams);
					throw new Terrasoft.UnsupportedTypeException({
						message: message
					});
				}
			}

			/**
			 * Removes the ptp message handler.
			 * @param {Object} cfg Parameters of the handler.
			 * @param {String} cfg.moduleId The identifier of the module.
			 * @param {String} cfg.eventName The name of the ptp message.
			 * @param {String[]} cfg.tags Filtering tags
			 * @return {Boolean} True if the duplicate was found and deleted, otherwise false.
			 * @private
			 */
			function removePtpMessageHandler(cfg) {
				const moduleId = cfg.moduleId;
				const eventName = cfg.eventName;
				const tags = cfg.tags;
				const ptpEvent = ptpEvents[eventName];
				if (!ptpEvent) {
					return false;
				}
				const ptpEventListeners = ptpEvent[moduleId];
				let listener;
				let handlerRemoved = false;
				for (let i = 0, listenersLength = ptpEventListeners.length; i < listenersLength; i++) {
					const ptpEventListener = ptpEventListeners[i];
					const listenerTags = ptpEventListener.tags;
					if (listenerTags.join("") === tags.join("")) {
						ptpEventListeners.splice(i, 1);
						listener = ptpEventListener.listener;
						handlerRemoved = true;
						break;
					}
				}
				if (handlerRemoved) {
					const listeners = subscribers[moduleId];
					const eventListeners = listeners[eventName];
					const listenerIndex = eventListeners.indexOf(listener);
					eventListeners.splice(listenerIndex, 1);
				}
				return handlerRemoved;
			}

			/**
			 * Registers a message handler in the system.
			 * @private
			 * @param cfg {Object} Parameters of the handler.
			 * @param cfg.moduleId {String} Module Id.
			 * @param cfg.eventName {String} Message name
			 * @param cfg.tags {String[]} Filter tags.
			 * @param cfg.handler {Function} Message handler.
			 * @param cfg.scope {Object} The context of the call to the handler.
			 * @return {Object} The configuration of the handler.
			 * @return {Function} return.handler The message handler.
			 * @return {Object} return.scope The call context of the handler.
			 * @return {String[]} return.tags Filtering tags.
			 */
			function addListener(cfg) {
				var moduleId = cfg.moduleId;
				var eventName = cfg.eventName;
				var tags = cfg.tags;
				var listeners = subscribers[moduleId];
				if (!listeners) {
					listeners = subscribers[moduleId] = {};
				}
				var eventListeners = listeners[eventName];
				if (!eventListeners) {
					eventListeners = listeners[eventName] = [];
				}
				var listener = {
					handler: cfg.handler,
					scope: cfg.scope,
					tags: tags
				};
				eventListeners.push(listener);
				return listener;
			}

			/**
			 * Registers a ptp message handler in the system.
			 * If a handler of the same message with the same filtering tags has already been registered for the module,
			 * it will be deleted, and a new handler will be registered instead.
			 * @param cfg {Object} Parameters of the handler
			 * - **moduleId** String: Module ID
			 * - **eventName** String: The name of the ptp message
			 * - **tags** String[]: Filtering tags
			 * - **handler** Function: The message handler
			 * - **listener** Object: Reference to the registered message (see addListener ())
			 * @private
			 */
			function addPtpListener(cfg) {
				var moduleId = cfg.moduleId;
				var eventName = cfg.eventName;
				var tags = cfg.tags;
				var ptpEvent = ptpEvents[eventName];
				if (!ptpEvent) {
					ptpEvent = ptpEvents[eventName] = {};
				}
				var ptpEventListeners = ptpEvent[moduleId];
				if (!ptpEventListeners) {
					ptpEventListeners = ptpEvent[moduleId] = [];
				} else {
					removePtpMessageHandler({
						moduleId: moduleId,
						eventName: eventName,
						tags: tags
					});
				}
				ptpEventListeners.push({
					handler: cfg.handler,
					scope: cfg.scope,
					tags: tags,
					listener: cfg.listener
				});
			}

			/**
			 * Checks the tags. If the tag object is null, it returns an empty array.
			 *  If the tag object is not an array, prints a message to the console and returns an array
			 * from one transferred item to the string.
			 * @param tags {Object} The object of the filtering tags
			 * @return {String[]} Array of filtering tags
			 * @private
			 */
			function processTags(tags) {
				var processedTags = tags || [];
				if (processedTags.constructor !== Array) {
					core.writeErrorMessage(Terrasoft.Resources.Core.unsupportedTagsTypeError);
					processedTags = [tags.toString()];
				}
				return processedTags;
			}

			var exports = {
				/**
				 * Subscribes the module to the message.
				 * If filtering tags are specified, control in the handler will be sent if at least one of the subscription tags
				 * has been set when the message was posted.
				 * @param {String} eventName Message name
				 * @param {Function} eventHandler Message handler
				 * @param {Object} scope The execution context of the handler function
				 * @param {String[]} tags - Tags for filtering messages
				 */
				subscribe: function(eventName, eventHandler, scope, tags) {
					if (scope && !Ext.isObject(scope)) {
						tags = scope;
					}
					var eventDescriptor = this.getEventDescriptor(eventName);
					var moduleId = this.id;
					checkEventDescriptor({
						messageDirection: Terrasoft.MessageDirectionType.SUBSCRIBE,
						eventName: eventName,
						eventDescriptor: eventDescriptor,
						moduleId: moduleId,
						moduleName: this.moduleName
					});
					var listenerTags = processTags(tags);
					var listener = addListener({
						moduleId: moduleId,
						eventName: eventName,
						tags: listenerTags,
						handler: eventHandler,
						scope: scope
					});
					if (eventDescriptor && eventDescriptor.mode === "ptp") {
						addPtpListener({
							moduleId: moduleId,
							eventName: eventName,
							tags: listenerTags,
							handler: eventHandler,
							scope: scope,
							listener: listener
						});
					} else {
						if (!observable.hasListener(eventName)) {
							observable.on(eventName, innerEventHandler);
						}
					}
				},

				/**
				 * Unsubscribes from ptp message event.
				 * @param {String} eventName Message name.
				 * @param {String[]} tags Tags for message filtering.
				 */
				unsubscribePtp: function(eventName, tags) {
					var listenerTags = processTags(tags);
					removePtpMessageHandler({
						moduleId: this.id,
						eventName: eventName,
						tags: listenerTags
					});
				},

				/**
				 * Publishes a message to the module. If the filtering tags are specified, then the handler
				 * will receive the control, at the subscription of which at least one of the transmitted tags was installed.
				 * @param {String} eventName Name of the message
				 * @param {Object} eventArguments Message options
				 * @param {String[]} tags - Tags for filtering messages
				 * @return {*}
				 */
				publish: function(eventName, eventArguments, tags) {
					var eventDescriptor = this.getEventDescriptor(eventName);
					var result = null;
					var publishTags = processTags(tags);
					checkEventDescriptor({
						messageDirection: Terrasoft.MessageDirectionType.PUBLISH,
						eventName: eventName,
						eventDescriptor: eventDescriptor,
						moduleId: this.id,
						moduleName: this.moduleName
					});
					if (eventDescriptor && eventDescriptor.mode === "ptp") {
						result = publishPtpMessage({
							eventName: eventName,
							eventArguments: eventArguments,
							tags: publishTags
						});
					} else {
						var args = {
							eventName: eventName,
							eventArguments: eventArguments,
							tags: publishTags
						};
						result = observable.fireEvent(eventName, args);
					}
					return result;
				},

				clearListeners: function() {
					core.removeModuleListeners(this.moduleName, this.id);
				},

				getCurrentModuleDynamicMessages: function() {
					if (!dynamicMessages[this.id]) {
						dynamicMessages[this.id] = {};
					}
					return dynamicMessages[this.id];
				},
				/**
				 * Gets the configuration of the event from the module descriptor or the list of dynamically added messages
				 * @param {String} eventName Name of the message
				 * @return {Object} An object that contains the direction of the message and its type
				 */
				getEventDescriptor: function(eventName) {
					var moduleDynamicMessages = this.getCurrentModuleDynamicMessages();
					if (moduleDynamicMessages[eventName]) {
						return moduleDynamicMessages[eventName];
					}
					var moduleDescriptor = core.getModuleDescriptor(this.moduleName);
					return moduleDescriptor && moduleDescriptor.messages && moduleDescriptor.messages[eventName] || null;
				},

				/**
				 * Loads module descriptors whose names are passed by the first parameter
				 * @param {Array} moduleNames an array containing a collection of module names
				 * @param {Function} callback he function that will be called when a response from the server is received
				 * @param {Object} scope The context in which the callback function is called
				 */
				//TODO: #CRM-33247 remove calls from configuration modules
				requireModuleDescriptors: function(moduleNames, callback, scope) {
					var self = this;
					var config = prepareRequireModuleDescriptorsConfig(core, moduleNames);
					if (config.descriptorsRequestBody.length > 0) {
						var jsonData = config.descriptorsRequestBody;
						Terrasoft.ServiceProvider.executeRequest("QueryModuleDescriptors", jsonData, function(result) {
							if (result.success) {
								var moduleDescriptors = result;
								var descriptorsConfigForLoad = config.descriptorsConfigForLoad;
								var requestedDescriptors = config.requestedDescriptors;
								for (var moduleName in moduleDescriptors) {
									if (!moduleDescriptors.hasOwnProperty(moduleName)) {
										continue;
									}
									var moduleDescriptor = moduleDescriptors[moduleName];
									var moduleConfig = descriptorsConfigForLoad[moduleName];
									if (moduleDescriptor !== null) {
										core.setModuleDescriptor(moduleName, moduleDescriptor);
										requestedDescriptors[moduleName] = moduleDescriptor;
									} else if (moduleConfig.mode === "find") {
										core.setModuleDescriptor(moduleName, {
											path: null
										});
										define(moduleConfig.name, emptyModuleDefinition);
									} else {
										throw new Terrasoft.exceptions.ItemNotFoundException();
									}
								}
								if (callback) {
									core.safeExecute({
										fn: callback,
										scope: scope || this,
										args: [requestedDescriptors],
										errorInfo: {
											moduleName: self.moduleName,
											moduleId: self.id
										}
									});
								}
							}
						}, this);
					} else {
						if (callback) {
							core.safeExecute({
								fn: callback,
								scope: scope || this,
								args: [config.requestedDescriptors],
								errorInfo: {
									moduleName: self.moduleName,
									moduleId: self.id
								}
							});
						}
					}
				},
				loadModule: core.loadModule,
				unloadModule: core.unloadModule,

				/**
				 * Expands the set of messages processed by the module. The extension must be generated before the call of
				 * publish and subscribe methods
				 * @param {Object} messageConfig An object containing the message configuration
				 */
				registerMessages: function(messageConfig) {
					var moduleDynamicMessages = this.getCurrentModuleDynamicMessages();
					for (var msgName in messageConfig) {
						if (messageConfig.hasOwnProperty(msgName)) {
							var config = messageConfig[msgName];
							if (!this.getEventDescriptor(msgName) ||
								(config && config.direction === Terrasoft.MessageDirectionType.BIDIRECTIONAL)) {
								moduleDynamicMessages[msgName] = config;
							}
						}
					}
				},

				/**
				 * Deletes dynamically registered messages
				 * @param {Array} messages (optional) - an array of message names to clear the registration. If empty
				 * all are cleared
				 */
				unRegisterMessages: function(messages) {
					var moduleId = this.id;
					var listeners = subscribers[moduleId];
					var moduleDynamicMessages = this.getCurrentModuleDynamicMessages();
					var removeAllMessages = true;
					var key;
					if (!messages) {
						messages = [];
						for (key in moduleDynamicMessages) {
							if (moduleDynamicMessages.hasOwnProperty(key)) {
								messages.push(key);
							}
						}
					}
					for (var i = 0, messagesLength = messages.length; i < messagesLength; i++) {
						var msgName = messages[i];
						if (moduleDynamicMessages.hasOwnProperty(msgName)) {
							if (moduleDynamicMessages[msgName].mode === "ptp") {
								var ptpEvent = ptpEvents[msgName];
								if (ptpEvent) {
									ptpEvent[moduleId] = null;
									delete ptpEvent[moduleId];
								}
							}
							moduleDynamicMessages[msgName] = null;
							delete moduleDynamicMessages[msgName];
						}
						if (listeners && listeners.hasOwnProperty(msgName)) {
							listeners[msgName] = null;
							delete listeners[msgName];
						}
					}
					for (key in moduleDynamicMessages) {
						if (moduleDynamicMessages.hasOwnProperty(key)) {
							removeAllMessages = false;
							break;
						}
					}
					if (removeAllMessages) {
						dynamicMessages[moduleId] = null;
						delete dynamicMessages[moduleId];
					}
				}

			};
			sandboxConstructor.prototype = exports;
			sandboxConstructor.constructor = sandboxConstructor;
			return sandboxConstructor;
		});
		// require(["less"]);
	}

	var bootstrap = {
		init: init,
		"mapResourcesToPath": mapResourcesToPath
	};
	global.Bootstrap = bootstrap;
})(this);


(function(global) {
	requirejs.config({
		paths: {
			"ext-base": "ExtJs/extjs-base-debug",
			"json-applier-differ-mock": "Terrasoft/utils/common/tests/json-applier-differ-mock",
			"data-manager-item-mock": "Terrasoft/manager/data-manager/tests/data-manager-item-mock",
			"schema-manager-data-provider-mock": "Terrasoft/manager/tests/schema-manager-data-provider-mock",
			"data-manager-methods-mock": "Terrasoft/manager/data-manager/tests/data-manager-methods-mock",
			"service-provider-mock": "Terrasoft/core/service-provider-mock",
			"process-module-utilities-mock": "Terrasoft/designers/process-schema-designer/tests/process-module-utilities-mock",
			"sys-settings-mock": "Terrasoft/core/tests/sys-settings-mock",
			"ajax-provider-mock": "Terrasoft/core/tests/ajax-provider-mock",
			"require-url-config": "Terrasoft/amd/require-url-config",
			"xmlhttprequest-mock": "Terrasoft/core/tests/xmlhttprequest-mock"
		},
		shim: {
			"ext-base": {
				exports: "Ext"
			},
			"data-manager-item-mock": {
				"deps": ["json", "base-view-model", "data-manager-item"]
			},
			"schema-manager-data-provider-mock": {
				"deps": ["schema-manager-data-provider", "entity-schema", "entity-schema-request"]
			},
			"data-manager-methods-mock": {
				"deps": ["data-manager-item-mock", "core-resources"]
			},
			"service-provider-mock": {
				"deps": ["service-provider"]
			},
			"process-module-utilities-mock": {
				"deps": ["ext-base"]
			},
			"requirejs/less-loader!Terrasoft/controls/sidebar/sidebar": {
				"deps": ["core-resources"]
			},
			"sys-settings-mock": {
				"deps": ["sys-settings"]
			},
			"ajax-provider-mock": {
				"deps": ["ajax-provider"]
			}
		}
	});
	global.Bootstrap.init(global.coreModules, "/base");
	const allTestFiles = [];
	const testType = window.__karma__.config.args[1] || "ui|unit";
	const TEST_REGEXP = new RegExp(`(${testType})\.spec\.js$`)//i;
	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			const normalizedTestModule = file.replace(/^\/base\/|\.js$/g, "");
			allTestFiles.push(normalizedTestModule);
		}
	});
	require(["ext-base", "baseobject"], function() {
		const testDataMap = {};
		global.getRootTest = function(key) {
			if (!testDataMap.hasOwnProperty(key)) {
				testDataMap[key] = {
					data: {}
				};
			}
			return testDataMap[key];
		};
		require.config({
			baseUrl: "/base",
			deps: allTestFiles,
			callback: window.__karma__.start
		});
	});
})(this);
