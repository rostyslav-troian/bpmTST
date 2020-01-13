Terrasoft.configuration.Structures["BaseLocalNotificationManager"] = {innerHierarchyStack: ["BaseLocalNotificationManager"]};
/**
 * @class Terrasoft.BaseLocalNotificationManager
 * ####### ##### ######### ## ###### # ########## #############.
 */
Ext.define("Terrasoft.Configuration.BaseLocalNotificationManager", {
	alternateClassName: "Terrasoft.BaseLocalNotificationManager",

	/**
	 * @private
	 */
	initFlag: false,

	/**
	 * @private
	 */
	getToProcessNotifications: function() {
		return Terrasoft.SysSettingsValue.getBooleanValue("ShowMobileLocalNotifications") &&
			(Terrasoft.core.Platform !== Terrasoft.ExecutionPlatforms.WebKit) &&
			!Terrasoft.util.isWindowsPlatform();
	},

	/**
	 * @private
	 */
	initializeLocalNotificationEvents: function(callback) {
		var me = this;
		Terrasoft.LocalNotification.onClick(function(notification) {
			Ext.callback(me.onNotificationClick, me, [notification]);
		});
		Terrasoft.LocalNotification.onClear(function(notification) {
			Ext.callback(me.onNotificationClear, me, [notification]);
		});
		if (Terrasoft.ApplicationUtils.isOnlineMode()) {
			var onResumeBinded = Ext.bind(this.onResume, this);
			Terrasoft.DocumentEventManager.subscribe("resume", onResumeBinded, false);
		}
		Ext.callback(callback, this);
	},

	/**
	 * @private
	 */
	setLocalNotificationPermission: function(callback) {
		Terrasoft.LocalNotification.promptForPermission({
			callback: function(granted) {
				if (granted) {
					this.initializeLocalNotificationEvents(callback);
				}
			},
			scope: this
		});
	},

	/**
	 * ############# #########.
	 * @protected
	 * @virtual
	 */
	initialize: function(callback) {
		if (this.initFlag) {
			Ext.callback(callback, this);
			return;
		}
		this.initFlag = true;
		Terrasoft.LocalNotification.hasPermission({
			callback: function(hasPermission) {
				if (!hasPermission) {
					this.setLocalNotificationPermission(callback);
				} else {
					this.initializeLocalNotificationEvents(callback);
				}
			},
			scope: this
		});
	},

	/**
	 * ########## ########### ##########, ##### ## ####### ######.
	 * @protected
	 * @virtual
	 */
	onResume: function() {
		var toProcessNotifications = this.getToProcessNotifications();
		if (!toProcessNotifications) {
			return;
		}
		Terrasoft.AsyncManager.callInOrder([
			this.getNotifications,
			this.createNotifications
		], this);
	},

	/**
	 * ######### ###### ########### #######.
	 * @protected
	 * @virtual
	 */
	loadModels: function(callback) {
		Terrasoft.StructureLoader.loadModels({
			modelNames: ["VwRemindings", "Activity"],
			success: function() {
				Ext.callback(callback, this);
			},
			scope: this
		});
	},

	/**
	 * ######## ###### ####### ###########.
	 * @protected
	 * @virtual
	 */
	getNotifications: function(callback) {
	},

	/**
	 * ####### ########### ## ###### ###### ####### ###########.
	 * @protected
	 * @virtual
	 */
	createNotifications: function(callback) {
	},

	/**
	 * ########## ####### ## ###########.
	 * @protected
	 * @virtual
	 */
	onNotificationClick: function(notification) {
	},

	/**
	 * ########## ###### ###########.
	 * @protected
	 * @virtual
	 */
	onNotificationClear: function(notification) {
	},

	/**
	 * ######### ###########.
	 */
	processNotifications: function() {
		var toProcessNotifications = this.getToProcessNotifications();
		if (!toProcessNotifications) {
			return;
		}
		Terrasoft.AsyncManager.callInOrder([
			this.loadModels,
			this.initialize,
			this.getNotifications,
			this.createNotifications
		], this);
	}

});


