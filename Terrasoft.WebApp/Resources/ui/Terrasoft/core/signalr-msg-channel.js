/**
 * The transport layer of the asynchronous receive and send data to a server with SignalR abstraction.
 */
Ext.define("Terrasoft.core.SignalRChannel", {
	extend: "Terrasoft.core.MsgChannel",
	alternateClassName: "Terrasoft.SignalRChannel",

	/**
	 * SignalR hub connection instance.
	 * @type {Object}
	 */
	connection: null,

	/**
	 * Address of the SignalR hub service.
	 * @type {String}
	 */
	serviceUrl: null,

	/**
	 * Flag shows that SignalR automatically encode/decode messages.
	 * @override
	 * @type {Boolean}
	 */
	hasOwnSerializer: true,

	/**
	 * Known connection state of SignalR channel.
	 * @type {Terrasoft.SocketConnectionState}
	 */
	state: Terrasoft.SocketConnectionState.NOT_INITIALIZED,

	/**
	 * It creates and initializes the object {@link Terrasoft.SignalRChannel}.
	 * @param {Object} config Configuration object.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event Terrasoft.EventName.ON_CONNECTION_INITIALIZED
			 * Triggered when SignalR hub connected.
			 */
			Terrasoft.EventName.ON_CONNECTION_INITIALIZED,
			/**
			 * @event Terrasoft.EventName.ON_ERROR
			 * Triggered when error connect to hub failed.
			 */
			Terrasoft.EventName.ON_ERROR
		);
		if (config.serviceUrl) {
			this.serviceUrl = config.serviceUrl;
			this.init();
		}
	},

	/**
	 * Sets inner handlers for SignalR hub.
	 * @private
	 */
	_setupSignalRHandlers: function() {
		this.connection.on("ServerMessage", this.channelMsgHandler.bind(this));
		this.connection.start().then(this.onConnectionStarted.bind(this)).catch(this.onConnectionError.bind(this));
		this.connection.onclose(this.channelClosedHandler.bind(this));
	},

	/**
	 * Internal handler for closing source channel.
	 * @override
	 * @protected
	 */
	channelClosedHandler: function() {
		this.state = Terrasoft.SocketConnectionState.CLOSED;
		this.connection.off();
		this.callParent();
	},

	/**
	 * Inner handler for hub connection started event.
	 * @protected
	 */
	onConnectionStarted: function() {
		this.log("SignalR hub connected for url:" + this.serviceUrl);
		this.state = Terrasoft.SocketConnectionState.OPEN;
		this.fireEvent(Terrasoft.EventName.ON_CONNECTION_INITIALIZED, this);
	},

	/**
	 * Inner handler for error websocket connection event.
	 * @protected
	 */
	onConnectionError: function() {
		this.state = Terrasoft.SocketConnectionState.CLOSED;
		this.fireEvent(Terrasoft.EventName.ON_ERROR, this);
	},

	/**
	 * Returns connection state.
	 * @return {Terrasoft.SocketConnectionState}
	 */
	getConnectionState: function() {
		return this.state;
	},

	/**
	 * Initializes connection.
	 */
	init: function() {
		if (!this.connection) {
			this.connection = new signalR.HubConnectionBuilder().withUrl(this.serviceUrl).build();
		}
		this.state = Terrasoft.SocketConnectionState.CONNECTING;
		this._setupSignalRHandlers();
	},

	/**
	 * Stops hub connection.
	 */
	close: function() {
		if (this.connection) {
			this.connection.stop();
			this.connection.off();
		}
	},

	/**
	 * Sends the ping command.
	 */
	ping: function() {
		this.connection.invoke("Ping");
	},

	/**
	 * Sends message to the server hub in OneWay mode.
	 * @param {Object} msg Message.
	 */
	postMessage: function(msg) {
		this.connection.invoke("SendMessage", msg);
	}
});

/**
 * Returns channel state.
 * @return {Boolean}
 */
Object.defineProperty(Terrasoft.core.SignalRChannel.prototype, "isOpened", {
	get: function() {
		return this.getConnectionState() === Terrasoft.SocketConnectionState.OPEN;
	}
});
