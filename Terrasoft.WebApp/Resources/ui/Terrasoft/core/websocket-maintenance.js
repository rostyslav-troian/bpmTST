Ext.define("Terrasoft.core.WebSocketMaintenance", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.WebSocketMaintenance",
	singleton: true,

	constructor: function() {
		this.callParent(arguments);
		this._trySchedulePingWebSocketConnection();
	},

	_trySchedulePingWebSocketConnection: function() {
		if (!Terrasoft || Terrasoft.useWebSocketKeepAlive === undefined) {
			setTimeout(this._trySchedulePingWebSocketConnection.bind(this), 5 * 1000);
			return;
		}
		if (!Terrasoft.useWebSocketKeepAlive) {
			return;
		}
		var timeoutSec = 30;
		setInterval(this._pingWebSocketConnection, timeoutSec * 1000);
		console.info("WebSocketMaintenance: WebSocket connection ping scheduled for every [" + timeoutSec + "] sec");
	},

	_pingWebSocketConnection: function() {
		if (!Terrasoft.ServerChannel.isOpened) {
			console.warn("WebSocketMaintenance: ServerChannel is not opened");
			return;
		}
		Terrasoft.ServerChannel.ping();
	}
});
