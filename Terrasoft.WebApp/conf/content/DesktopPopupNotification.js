Terrasoft.configuration.Structures["DesktopPopupNotification"] = {innerHierarchyStack: ["DesktopPopupNotification"]};
define("DesktopPopupNotification", ["ext-base", "terrasoft"],
	function(Ext) {
		/**
		 * Collection of unclosed notifications.
		 * @type {Terrasoft.Collection}
		 */
		var notifications = Ext.create("Terrasoft.Collection");

		/**
		 * @enum
		 * Permission type.
		 */
		var PermissionType = {
			DEFAULT: "default",
			GRANTED: "granted",
			DENIED: "denied"
		};

		/**
		 * Indicate whether window is focused.
		 * @type {Boolean}
		 */
		var isWindowFocused = true;

		/**
		 * Default timeout onShow notification event.
		 * @type {Number}
		 */
		var timeout = 5000;

		/**
		 * Close notification.
		 * @param {Object} notification Notification object.
		 */
		var close = function(notification) {
			if (!notification) {
				return;
			}
			var notifyItem = notifications.removeByKey(notification.tag);
			if (!notifyItem) {
				return;
			}
			if (notifyItem.notification.close) {
				notifyItem.notification.close();
			}
		};

		/**
		 * Event handler function clicking on the notification window.
		 * @private
		 * @param {Object} sender Object sender events.
		 */
		var defOnClick = function(sender) {
			close(sender.target);
		};

		/**
		 * Event handler function window closing notification.
		 * @param {Object} sender Object sender events.
		 */
		var defOnClose = function(sender) {
			close(sender.target);
		};

		/**
		 * Checks the visibility of the window.
		 * @private
		 * @return {Boolean} true if the window is hidden, else - false.
		 */
		function getIsWindowHidden() {
			return !isWindowFocused;
		}

		/**
		 * Checks notification supports.
		 * @return {Boolean} true if support, else - false.
		 */
		var getIsSupported = function() {
			return Boolean(window.Notification);
		};

		/**
		 * Returns permission level.
		 * @private
		 * @return {String} Level (default, granted, denied).
		 */
		var getPermissionLevel = function() {
			if (getIsSupported()) {
				return window.Notification.permission;
			} else {
				return PermissionType.DEFAULT;
			}
		};

		/**
		 * Request permission to show Notifications.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The callback execution context.
		 */
		var requestPermission = function(callback, scope) {
			callback = Ext.isFunction(callback)
				? callback.bind(scope || this)
				: Terrasoft.emptyFn;
			if (!getIsSupported()) {
				callback();
				return;
			}
			if (getPermissionLevel() === PermissionType.GRANTED) {
				callback();
				return;
			}
			window.Notification.requestPermission(callback);
		};

		/**
		 * Return profile key.
		 * @private
		 * @return {String} Profile key.
		 */
		var _getProfileKey = function() {
			return "DesktopPopupNotification";
		};

		/**
		 * Sets the notifications state.
		 * @param {Boolean} enabled Value to set.
		 * @param {Function} callback Callback-function.
		 */
		var setNotificationsState = function(enabled, callback) {
			Terrasoft.utils.saveUserProfile(_getProfileKey(), {
				Enabled: enabled
			}, false, callback);
		};

		/**
		 * Gets the notifications state.
		 * @param {Function} callback Callback-function.
		 * @param {Object} scope Context.
		 */
		var getNotificationsState = function(callback, scope) {
			var key = _getProfileKey();
			Terrasoft.require(["profile!" + key], function(profile) {
				callback.apply(scope, [profile.Enabled]);
			}, scope);
		};

		/**
		 * Create default notification config.
		 * @return {Object} Notification config.
		 */
		var createConfig = function() {
			return {
				id: Ext.emptyString,
				title: Ext.emptyString,
				body: Ext.emptyString,
				icon: {},
				ignorePageVisibility: true,
				onClick: defOnClick,
				onClose: defOnClose,
				onError: Ext.emptyFn,
				onShow: Ext.emptyFn,
				timeout: timeout,
				scope: null
			};
		};

		/**
		 * Return notification object by id.
		 * @param {String} id Identifier notification.
		 * @return {Object} Notification object.
		 */
		var get = function(id) {
			var notifyItem = notifications.find(id);
			if (!notifyItem) {
				return null;
			}
			return notifyItem.notification;
		};

		/**
		 * Return notification config by id.
		 * @param {String} id Identifier notification.
		 * @return {Object} Notification config.
		 */
		var getConfig = function(id) {
			var notifyItem = notifications.find(id);
			if (!notifyItem) {
				return null;
			}
			return notifyItem.config;
		};

		/**
		 * @private
		 */
		var _prepareNofiticationHandlers = function(notification, config) {
			var scope = config.scope || this;
			notification.onclick = function(sender) {
				if (config.onClick === defOnClick) {
					Ext.callback(defOnClick, this, [sender]);
				} else {
					Ext.callback(config.onClick, scope, [sender]);
					Ext.callback(defOnClick, this, [sender]);
				}
			};
			notification.onshow = function(sender) {
				Ext.callback(config.onShow, scope, [sender]);
			};
			notification.onerror = function(sender) {
				Ext.callback(config.onError, scope, [sender]);
			};
			notification.onclose = function(sender) {
				if (config.onclose === defOnClose) {
					Ext.callback(defOnClose, this, [sender]);
				} else {
					Ext.callback(config.onClose, scope, [sender]);
					Ext.callback(defOnClose, this, [sender]);
				}
			};
		};

		/**
		 * @private
		 */
		var _deferCloseNotification = function(notification, config) {
			var defTimeout = 7000;
			var closeTimeout = config.timeout || defTimeout;
			setTimeout(function() {
				notification.close();
			}, closeTimeout);
		};

		/**
		 * Create notification.
		 * @param {Object} config Notification config.
		 * @return {Object} Notification.
		 */
		var create = function(config) {
			var notification = null;
			var notifyItem = notifications.find(config.id);
			if (notifyItem) {
				notification = notifyItem.notification;
			} else {
				var icon = Ext.isString(config.icon) ? config.icon : config.icon.x32;
				notification = new window.Notification(config.title, {
					icon: icon,
					body: config.body || "",
					tag: config.id
				});
				notifications.add(config.id, {
					notification: notification,
					config: config
				});
			}
			_prepareNofiticationHandlers(notification, config);
			_deferCloseNotification(notification, config);
			return notification;
		};

		/**
		 * @private
		 */
		var _canShowNotification = function(config) {
			var result;
			if (!getIsSupported()) {
				result = "Notifications not supported.";
			} else if ((getPermissionLevel() !== PermissionType.GRANTED)) {
				result = "Notifications permision not granted.";
			} else if (!getIsWindowHidden() && !config.ignorePageVisibility) {
				result = "Window is not hidden, use config.ignorePageVisibility to force show notification.";
			} else if (!Ext.isString(config.title)) {
				result = "Argument config.title is empty.";
			} else if (!Ext.isString(config.icon) && !Ext.isObject(config.icon)) {
				result = "Argument config.icon is empty.";
			} else {
				result = "";
			}
			if (Ext.isEmpty(result)) {
				return true;
			}
			if (Terrasoft.isDebug) {
				result = "Can't show notification. " + result;
				window.console.warn(result);
			}
			return false;
		};

		/**
		 * Show notification.
		 * @param {Object} config Notification config.
		 * @return {Object} Notification or null.
		 */
		var show = function(config) {
			if (_canShowNotification(config)) {
				var notification = create(config);
				return notification;
			} else {
				return null;
			}
		};

		window.addEventListener("focus", function() {
			isWindowFocused = true;
		});

		window.addEventListener("blur", function() {
			isWindowFocused = false;
		});

		return {

			// region Methods: Deprecated

			/**
			 * @deprecated Use {@link #getConfig} instead.
			 */
			getNotificationConfig: getConfig,

			/**
			 * @deprecated Use {@link #show} instead.
			 */
			showNotification: show,

			/**
			 * @deprecated Use {@link #close} instead.
			 */
			closeNotification: close,

			/**
			 * @deprecated
			 */
			defaultDisplayTimeout: timeout,

			/**
			 * @deprecated Use {@link #get} instead.
			 */
			getNotification: get,

			/**
			 * @deprecated Use {@link #createConfig} instead.
			 */
			createNotificationConfig: createConfig,

			/**
			 * @deprecated Use {@link #getIsSupported} instead.
			 */
			getIsNotificationSupported: getIsSupported,

			// endregion

			PermissionType: PermissionType,
			getIsSupported: getIsSupported,
			getPermissionLevel: getPermissionLevel,
			requestPermission: requestPermission,
			setNotificationsState: setNotificationsState,
			getNotificationsState: getNotificationsState,
			get: get,
			show: show,
			close: close,
			getConfig: getConfig,
			createConfig: createConfig
		};
	}
);


