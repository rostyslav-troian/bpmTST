Terrasoft.configuration.Structures["CtiNotificationUtilities"] = {innerHierarchyStack: ["CtiNotificationUtilities"]};
define("CtiNotificationUtilities", ["ext-base", "terrasoft", "sandbox", "CtiNotificationUtilitiesResources",
		"DesktopPopupNotification", "CtiConstants"],
	function(Ext, Terrasoft, sandbox, resources, DesktopPopupNotification, CtiConstants) {
		/**
		 * Object of notification configurations cache.
		 * @type {Object}
		 */
		var callNotificationCache = Terrasoft.configuration.Storage.CallNotifications || (function() {
			var cache = {};

			Terrasoft.each(CtiConstants.CallType, function(item) {
				cache[item] = new Terrasoft.Collection();
			});

			/**
			 * Adds notification configuration object to cache.
			 * @private
			 * @param {CallType} callType Type of the call.
			 * @param {String} callId Identifier of the call.
			 * @param {Object} config Notification configuration object.
			 */
			cache.add = function(callType, callId, config) {
				if (!this[callType]) {
					return;
				}
				this[callType].removeByKey(callId);
				this[callType].add(callId, config);
			};

			/**
			 * Removes notification configuration object from cache.
			 * @private
			 * @param {CallType} callType Type of the call.
			 * @param {String} callId Identifier of the call.
			 * @returns {Object} Returns removed notification configuration object, otherwise - false.
			 */
			cache.remove = function(callType, callId) {
				if (!this[callType]) {
					return false;
				}
				return this[callType].removeByKey(callId);
			};

			/**
			 * Returns notification configuration object.
			 * @private
			 * @param {CallType} callType Call type.
			 * @param {String} callId Identifier of the call.
			 * @returns {Object} Returns notification configuration object.
			 */
			cache.find = function(callType, callId) {
				if (!this[callType]) {
					return null;
				}
				return this[callType].find(callId);
			};

			return cache;
		})();

		/**
		 * Handles click on the notification popup.
		 * @private
		 * @param {Object} sender Object, that sends event.
		 */
		function onCallNotificationClick(sender) {
			focus();
			var desktopNotification = sender.target;
			var callNotification = getCallNotificationConfig(desktopNotification.tag);
			if (!Ext.isEmpty(callNotification)) {
				callNotificationCache.remove(callNotification.callType, callNotification.callId);
			}
		}

		/**
		 * Returns configuration of the notification object by identifier.
		 * @public
		 * @param {String} callId Identifier of incoming/outgoing call.
		 * @returns {Object} Returns configuration of the notification object by identifier.
		 */
		var getCallNotificationConfig = function(callId) {
			return DesktopPopupNotification.getNotificationConfig(callId);
		};

		/**
		 * Returns cached configuration of the notification object by type and call identifier.
		 * @public
		 * @param {CallType} callType Type of the call.
		 * @param {String} callId Identifier of incoming/outgoing call.
		 * @returns {Object} Returns configuration of the notification object by identifier.
		 */
		var findCachedCallNotificationConfig = function(callType, callId) {
			return callNotificationCache.find(callType, callId);
		};

		/**
		 * Shows notification popup for call.
		 * @public
		 * @param {String} callId Identifier of incoming/outgoing call.
		 * @param {String} message Message, which will be displayed in notification popup.
		 * @param {CallType} callType Call type.
		 * @param {String} iconId Identifier of image, which will be displayed in notification popup.
		 */
		var showCallNotification = function(callId, message, callType, iconId) {
			if (Ext.isEmpty(message)) {
				return;
			}
			var iconUrl = Ext.emptyString;
			var title = Ext.emptyString;
			var imageConfig = {
				source: Terrasoft.ImageSources.SYS_IMAGE,
				params: {
					primaryColumnValue: iconId
				}
			};
			var callImage;
			switch (callType) {
				case CtiConstants.CallType.INCOMING:
					title = resources.localizableStrings.IncomingCallCaption;
					callImage = resources.localizableImages.IncomingCall;
					break;
				case CtiConstants.CallType.OUTGOING:
					title = resources.localizableStrings.OutgoingCallCaption;
					callImage = resources.localizableImages.OutgoingCall;
					break;
				case CtiConstants.CallType.MISSED:
					title = resources.localizableStrings.MissedCallCaption;
					callImage = resources.localizableImages.MissedCall;
					break;
				default:
					title = resources.localizableStrings.DefaultCallCaption;
					callImage = resources.localizableImages.DefaultCall;
					break;
			}
			imageConfig = Terrasoft.isGUID(iconId) ? imageConfig : callImage;
			if (Boolean(imageConfig)) {
				iconUrl = Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
			}
			var notifyConfig = DesktopPopupNotification.createNotificationConfig();
			notifyConfig.title = title;
			notifyConfig.body = message;
			notifyConfig.id = callId;
			notifyConfig.iconId = iconId;
			notifyConfig.ignorePageVisibility = false;
			notifyConfig.icon = iconUrl;
			notifyConfig.callType = callType;
			notifyConfig.onClick = onCallNotificationClick;
			callNotificationCache.add(callType, callId, notifyConfig);
			DesktopPopupNotification.closeNotification(notifyConfig);
			DesktopPopupNotification.showNotification(notifyConfig);
		};

		/**
		 * Closes call notification popup.
		 * @param {String} callId Identifier of incoming/outgoing call.
		 */
		var closeCallNotification = function(callId) {
			var callNotification = DesktopPopupNotification.getNotification(callId);
			DesktopPopupNotification.closeNotification(callNotification);
		};

		return {
			getCallNotificationConfig: getCallNotificationConfig,
			findCachedCallNotificationConfig: findCachedCallNotificationConfig,
			showCallNotification: showCallNotification,
			closeCallNotification: closeCallNotification
		};
	});


