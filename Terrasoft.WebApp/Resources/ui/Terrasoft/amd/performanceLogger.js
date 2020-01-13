(function(global) {
	function performanceLogger(global) {
		var Terrasoft = global.Terrasoft || {};
		var performance = global.performance || {};
		var _resourceTimingBufferSize = 3000;
		var _maxLoadedModulesCount = 100;
		var _maxSentEventsCount = 100;
		var _pendingTime = 1500;
		var _addEventActionName = "AddClientEvent";
		var _performanceLoggerServiceUrl = Terrasoft.clientPerformanceLoggerServiceUri || "";
		var _geolocationServiceUrl = "http://extreme-ip-lookup.com/json/";
		var _configurationVersion = "";
		var _geolocationDataFieldNames = {
			countryCode: "countryCode",
			city: "city",
			ip: "query"
		};
		var _sessionId;
		var _countryCode;
		var _city;
		var _clientIp;
		var _eventCounter = 0;
		var _timeStamp;
		var _eventStartTime;
		var _eventEndTime;
		var _lastChangeTime = performance.now();
		var _executingModules = [];
		var _modules = [];
		var _ajaxRequests = [];
		var _isNeedSetup = true;
		var _started = true;
		var _startHash = _getHash();
		var _isLastRemovePending = false;
		var _isLocked = false;
		var _wasTabInBackground = document.hidden;

		/**
		 * Handles response from geolocation service.
		 * @private
		 * @param {Object} data Service data.
		 */
		function _processGeolocationData(data) {
			if (data) {
				_countryCode = data[_geolocationDataFieldNames.countryCode];
				_city = data[_geolocationDataFieldNames.city];
				_clientIp = data[_geolocationDataFieldNames.ip];
			}
		}

		function _initGeolocation(callback) {
			var safeCallback = function() {
				if (typeof callback === "function") {
					callback();
				}
			};
			var xhr = new XMLHttpRequest();
			xhr.open("GET", _geolocationServiceUrl, true);
			xhr.setRequestHeader("Content-Type", "text/plain");
			xhr.send();
			xhr.onload = function() {
				var data = xhr.responseText && JSON.parse(xhr.responseText);
				_processGeolocationData(data);
				safeCallback();
			};
			xhr.onerror = function() {
				global.console.info("Geolocation service responded with error %d.", this.status);
				safeCallback();
			};
		}

		function _initServiceUrls() {
			var protocol = global.location.protocol;
			var delimiterChar = "/";
			var regExp = /^https:/;
			if (protocol === "https:") {
				regExp = /^http:/;
			}
			_performanceLoggerServiceUrl =
				_performanceLoggerServiceUrl.replace(regExp, protocol);
			_geolocationServiceUrl =
				_geolocationServiceUrl.replace(regExp, protocol);
			var urlLength = _performanceLoggerServiceUrl.length;
			if (urlLength > 0 && _performanceLoggerServiceUrl[urlLength - 1] !== delimiterChar) {
				_performanceLoggerServiceUrl += delimiterChar;
			}
		}

		function _isPerformanceMethodSupported(method) {
			return typeof method === "function";
		}

		function _getHash() {
			return global.location.hash.replace("#", "");
		}

		function _clearResourceEntries() {
			if (_isPerformanceMethodSupported(performance.clearResourceTimings)) {
				performance.clearResourceTimings();
			}
		}

		function _getSessionId() {
			var sessionId = Terrasoft.sessionId;
			if (!sessionId) {
				var strCookies = document.cookie;
				var cookiearray = strCookies.split(";");
				for (var i = 0; i < cookiearray.length; i++) {
					var cookieNameValue = cookiearray[i].split("=");
					if (cookieNameValue && cookieNameValue[0] && cookieNameValue[1]) {
						var name = cookieNameValue[0].trim();
						if (name === "BPMSESSIONID" || name === "BPMCSRF") {
							sessionId = cookieNameValue[1].trim();
							break;
						}
					}
				}
			}
			return sessionId;
		}

		function _initConfigurationVersion(callback) {
			var safeCallback = function() {
				if (typeof callback === "function") {
					callback();
				}
			};
			if (!Terrasoft.SysSettings) {
				safeCallback();
			}
			Terrasoft.SysSettings.querySysSettingsItem("ConfigurationVersion", function(value) {
				_configurationVersion = value;
				safeCallback();
			});
		}

		function _setup(callback) {
			if (!_isNeedSetup) {
				if (typeof callback === "function") {
					callback();
				}
				return;
			}
			_isNeedSetup = false;
			_initServiceUrls();
			_sessionId = _getSessionId();
			_initConfigurationVersion(function() {
				_initGeolocation(callback);
			});
		}

		function _sendData(logData, methodName) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", _performanceLoggerServiceUrl + methodName, true);
			xhr.setRequestHeader("Content-Type", "text/plain");
			xhr.onerror = function() {
				global.console.info("Client performance logger service responded with error %d.", this.status);
			};
			xhr.send(JSON.stringify(logData));
		}

		function _getRequestResourceEntryData(startTime) {
			var requestData = _ajaxRequests.filter(function(request) {
				return request.startTime === startTime;
			})[0] || {};
			requestData = requestData.data;
			if (requestData && typeof requestData !== "string") {
				try {
					requestData = JSON.stringify(requestData);
				} catch (e) {
					requestData = undefined;
				}
			}
			return requestData;
		}

		function _getResourceEntryInfo(entry) {
			var info = {
				name: entry.name,
				duration: entry.duration,
				initiatorType: entry.initiatorType,
				startTime: entry.startTime,
				transferSize: entry.transferSize,
				responseDuration: entry.responseEnd - entry.responseStart,
				encodedBodySize: entry.encodedBodySize
			};
			if (info.initiatorType === "xmlhttprequest") {
				info.requestData = _getRequestResourceEntryData(info.startTime);
			}
			return info;
		}

		function _getPerformanceEntries(isFirstEvent) {
			var isGetEntriesByTypeSupported = _isPerformanceMethodSupported(performance.getEntriesByType);
			var isGetEntriesSupported = _isPerformanceMethodSupported(performance.getEntries);
			if (!isFirstEvent && isGetEntriesByTypeSupported) {
				return performance.getEntriesByType("resource");
			} else if (isGetEntriesSupported) {
				return performance.getEntries();
			} else {
				return [];
			}
		}

		function _sendEvent(isFirstEvent) {
			var duration = isFirstEvent ? _eventEndTime : (_eventEndTime - _eventStartTime);
			if (!duration) {
				global.console.info("Duration can't be uncertain");
				return;
			}
			var resources = _getPerformanceEntries(isFirstEvent);
			var data = {
				startTime: isFirstEvent ? Date.now() - performance.now() : _timeStamp,
				duration: duration,
				urlHash: _getHash(),
				modules: _modules,
				entries: resources.map(_getResourceEntryInfo),
				userName: Terrasoft.SysValue.CURRENT_USER.displayValue,
				userId: Terrasoft.SysValue.CURRENT_USER.value,
				sessionId: _sessionId,
				hostName: Terrasoft.loaderBaseUrl,
				countryCode: _countryCode,
				city: _city,
				clientIp: _clientIp,
				version: _configurationVersion
			};
			_sendData(data, _addEventActionName);
		}

		function _setResourceTimingBufferSize(bufferSize) {
			if (_isPerformanceMethodSupported(performance.setResourceTimingBufferSize)) {
				performance.setResourceTimingBufferSize(bufferSize);
			}
		}

		function _checkToDisable() {
			var resources = _getPerformanceEntries(true);
			return _eventCounter >= _maxSentEventsCount || resources.length > _resourceTimingBufferSize ||
				_modules.length > _maxLoadedModulesCount;
		}

		function _disableLogging() {
			_isLocked = true;
			_executingModules = null;
			_modules = null;
			_ajaxRequests = null;
			_clearResourceEntries();
			_setResourceTimingBufferSize(0);
		}

		function _clear() {
			_clearResourceEntries();
			_executingModules = [];
			_modules = [];
			_ajaxRequests = [];
			_started = false;
			_startHash = null;
			_wasTabInBackground = false;
		}

		function _onAllModuleLoaded() {
			var hash = _getHash();
			if (!_wasTabInBackground && hash && (!_startHash || _startHash === hash)) {
				var isFirstEvent = _eventCounter === 0;
				_eventCounter++;
				_isLocked = true;
				_setup(function() {
					_sendEvent(isFirstEvent);
					_clear();
					_isLocked = false;
				});
			} else {
				_clear();
			}
		}

		function _getModuleById(id) {
			var module = _modules.filter(function(item) {
				return item.moduleId === id;
			})[0];
			return module;
		}

		function _initVisibilityChangeEvent() {
			document.addEventListener("visibilitychange", function() {
				_wasTabInBackground = _wasTabInBackground || (_started && document.hidden);
			});
		}

		function _findPerfEntryByXhr(xhrResponseLength, xhrRequestStartTime) {
			var entries = _getPerformanceEntries();
			var maxLookBack = 5;
			var entriesLength = entries.length;
			var minIndex = entriesLength > maxLookBack
				? entriesLength - maxLookBack
				: 0;
			for (var i = entriesLength - 1; i >= minIndex; i--) {
				var entry = entries[i];
				if (entry) {
					var entryStartTime = Math.floor(entry.startTime);
					var requestDataStartTime = Math.floor(xhrRequestStartTime);
					if (xhrResponseLength === entry.encodedBodySize &&
						(entryStartTime === requestDataStartTime ||
							Math.abs(entryStartTime - requestDataStartTime) === 1)) {
						return entry;
					}
				}
			}
			return null;
		}

		function _initAjax() {
			if (!XMLHttpRequest) {
				return;
			}
			var originalSend = XMLHttpRequest.prototype.send;
			var currentHost = global.location.origin || '';
			XMLHttpRequest.prototype.send = function(data) {
				this.addEventListener("loadstart", function() {
					if (_isLocked) {
						return;
					}
					var requestData = this.requestData;
					if (requestData.data) {
						requestData.startTime = performance.now();
					}
				}, false);
				this.addEventListener("loadend", function() {
					if (_isLocked) {
						return;
					}
					var requestData = this.requestData || {};
					var responseURL = this.responseURL || "";
					var isNotCors = responseURL.indexOf(currentHost) > -1;
					if (requestData.data && isNotCors) {
						var contentLength = this.getResponseHeader("Content-Length");
						contentLength = Number.parseInt(contentLength) || this.responseText.length;
						var entry = _findPerfEntryByXhr(contentLength, requestData.startTime);
						if (entry) {
							requestData.startTime = entry.startTime;
							_ajaxRequests.push(requestData);
						}
					}
				}, false);
				var requestData = this.requestData = {};
				requestData.data = data;
				return originalSend.apply(this, arguments);
			};
		}

		/**
		 * Initializes performance logger.
		 */
		function init() {
			_initAjax();
			_initVisibilityChangeEvent();
			_setResourceTimingBufferSize(_resourceTimingBufferSize);
		}

		/**
		 * Resets performance logger to initial state.
		 */
		function reset() {
			_clear();
			_setResourceTimingBufferSize(_resourceTimingBufferSize);
			_isLocked = false;
			_started = false;
			_startHash = _getHash();
			_wasTabInBackground = false;
			_eventCounter = 0;
		}

		/**
		 * Adds module to execution history buffer.
		 * @param {String} moduleId Module identifier.
		 * @param {String} moduleName Module name.
		 */
		function addModule(moduleId, moduleName) {
			if (_isLocked) {
				return;
			}
			if (_checkToDisable()) {
				_disableLogging();
				return;
			}
			var hash = _getHash();
			if (_started && _startHash !== hash) {
				if (_startHash) {
					_eventCounter++;
					_clear();
				} else {
					_startHash = hash;
				}
			}
			var now = performance.now();
			if (!_started) {
				_timeStamp = Date.now();
				_eventStartTime = now;
				_started = true;
				_startHash = hash;
			}
			if (_executingModules.indexOf(moduleId) === -1) {
				_modules.push({
					moduleId: moduleId,
					name: moduleName,
					startLoading: now
				});
				_executingModules.push(moduleId);
				_lastChangeTime = now;
			} else {
				global.console.info("Module %s should not be loaded twice.", moduleId);
			}
		}

		/**
		 * Removes module from execution history buffer.
		 * @param {String} moduleId Module identifier.
		 */
		function removeModule(moduleId) {
			if (_isLocked) {
				return;
			}
			var now = performance.now();
			var startIndex = _executingModules.indexOf(moduleId);
			if (startIndex !== -1) {
				var module = _getModuleById(moduleId);
				module.endLoading = now;
				_executingModules.splice(startIndex, 1);
				_lastChangeTime = now;
			}

			if (_executingModules.length === 0 && !_isLastRemovePending) {
				if (_lastChangeTime + _pendingTime <= now) {
					try {
						_eventEndTime = _lastChangeTime;
						_onAllModuleLoaded();
					} catch (e) {
						global.console.info(e);
						_clear();
					}
				} else {
					_isLastRemovePending = true;
					setTimeout(function() {
						_isLastRemovePending = false;
						removeModule(moduleId);
					}, _pendingTime);
				}
			}
		}

		/**
		 * Sets module start init mark.
		 * @param {String} moduleId Module identifier.
		 */
		function startInitModule(moduleId) {
			if (_isLocked) {
				return;
			}
			var module = _getModuleById(moduleId);
			if (module) {
				module.startInit = performance.now();
			}
		}

		/**
		 * Sets module end init mark.
		 * @param {String} moduleId Module identifier.
		 */
		function endInitModule(moduleId) {
			if (_isLocked) {
				return;
			}
			var module = _getModuleById(moduleId);
			if (module) {
				module.endInit = performance.now();
			}
		}

		/**
		 * Sets module start render mark.
		 * @param {String} moduleId Module identifier.
		 */
		function startRenderModule(moduleId) {
			if (_isLocked) {
				return;
			}
			var module = _getModuleById(moduleId);
			if (module) {
				module.startRender = performance.now();
			}
		}

		/**
		 * Sets module end render mark.
		 * @param {String} moduleId Module identifier.
		 */
		function endRenderModule(moduleId) {
			if (_isLocked) {
				return;
			}
			var module = _getModuleById(moduleId);
			if (module) {
				module.endRender = performance.now();
			}
		}

		/**
		 * Returns current executing modules.
		 * @return {Array} Executing modules.
		 */
		function getCurrentExecutingModules() {
			return _executingModules;
		}

		var exports;
		if (!performance) {
			var emptyFn = function() { };
			exports = {
				init: emptyFn,
				reset: emptyFn,
				addModule: emptyFn,
				removeModule: emptyFn,
				startInitModule: emptyFn,
				endInitModule: emptyFn,
				startRenderModule: emptyFn,
				endRenderModule: emptyFn,
				getCurrentExecutingModules: emptyFn
			};
		} else {
			exports = {
				init: init,
				reset: reset,
				addModule: addModule,
				removeModule: removeModule,
				startInitModule: startInitModule,
				endInitModule: endInitModule,
				startRenderModule: startRenderModule,
				endRenderModule: endRenderModule,
				getCurrentExecutingModules: getCurrentExecutingModules
			};
		}
		return exports;
	}

	var logger = performanceLogger(global);
	logger.init();
	global.performanceLogger = logger;
})(window);

define("performanceLogger", [], function() {
	return window.performanceLogger;
});
