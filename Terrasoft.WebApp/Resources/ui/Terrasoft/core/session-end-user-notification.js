/**
 */
Ext.define("Terrasoft.core.SessionEndUserNotification", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.SessionEndUserNotification",
	singleton: true,

	constructor: function() {
		this.callParent(arguments);
		this._trySubsribeOnServerChannelMessage();
	},

	_trySubsribeOnServerChannelMessage: function() {
		if (!Terrasoft || Terrasoft.showSessionEndNotification === undefined) {
			window.setTimeout(this._trySubsribeOnServerChannelMessage.bind(this), 5 * 1000);
			return;
		}
		if (!Terrasoft.showSessionEndNotification) {
			return;
		}
		Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this._handleServerChannelMessage, this);
	},

	_handleServerChannelMessage: function(channel, message) {
		if (!message || message.Header.Sender !== "WebApp" || message.Header.BodyTypeName !== "SessionEnd") {
			return;
		}
		var body;
		try {
			body = JSON.parse(message.Body);
		} catch (exception) {
			this.error("[SessionEnd]. Error occured. Message = [" + message.Body + "]");
			return;
		}
		var currentSessionId = Terrasoft.sessionId;
		var sessionIdPropertyName = "SessionId";
		var receivedSessionId = body[sessionIdPropertyName];
		this.log("[SessionEnd]. Current = [" + currentSessionId + "]. Received = [" + receivedSessionId + "]");
		if (currentSessionId && receivedSessionId !== currentSessionId) {
			return;
		}
		Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this._handleServerChannelMessage, this);
		this._logout();
	},

	_logout: function() {
		var config = {
			buttons: [
				{
					className: "Terrasoft.Button",
					caption: Terrasoft.Resources.SessionEndUserNotification.ConfirmationButtonCaption
				}
			]
		};
		Terrasoft.showInformation(Terrasoft.Resources.SessionEndUserNotification.Message, function() {
			location.replace(Terrasoft.loaderBaseUrl);
		}, this, config);
	}
});
