Terrasoft.configuration.Structures["QueueClientNotificationUtilities"] = {innerHierarchyStack: ["QueueClientNotificationUtilities"]};
define("QueueClientNotificationUtilities", ["terrasoft", "ServiceHelper"], function(Terrasoft, ServiceHelper) {
	Ext.define("Terrasoft.configuration.QueueClientNotificationUtilities", {
		alternateClassName: "Terrasoft.QueueClientNotificationUtilities",
		extend: "Terrasoft.core.BaseObject",
		singleton: true,

		//region Properties: Private

		/**
		 * Indicates queues notification has been initialized.
		 * @type {Boolean}
		 * @private
		 */
		isNotificationInitialized: false,

		//endregion

		//region Methods: Private

		/**
		 * Handles queues notification messages.
		 * @private
		 * @param {Object} scope Method execution context.
		 * @param {Object} response Response from the server.
		 */
		onQueuesNotification: function(scope, response) {
			if (!response || !response.Header || response.Header.Sender !== "QueuesNotification") {
				return;
			}
			var message = "QueuesNotification: " + response.Body;
			var logMessage = response.Header.BodyTypeName;
			var logMessageType;
			switch (logMessage) {
				case "Warn":
					logMessageType = Terrasoft.LogMessageType.WARNING;
					break;
				case "Error":
					logMessageType = Terrasoft.LogMessageType.ERROR;
					break;
				case "Info":
					logMessageType = Terrasoft.LogMessageType.INFORMATION;
					break;
				default:
					break;
			}
			this.log(message, logMessageType);
		},

		//endregion

		//region Methods: Public

		/**
		 * Subscribes on queues notifications.
		 */
		subscribeForQueuesNotifications: function() {
			if (this.isNotificationInitialized) {
				return;
			}
			ServiceHelper.callService("QueuesService", "SubscribeForQueuesNotifications");
			Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this.onQueuesNotification, this);
			Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onQueuesNotification, this);
			this.isNotificationInitialized = true;
		}

		//endregion

	});
	return Terrasoft.configuration.QueueClientNotificationUtilities;
});


