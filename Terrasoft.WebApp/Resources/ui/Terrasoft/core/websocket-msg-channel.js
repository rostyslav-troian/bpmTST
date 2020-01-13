/**
 * The transport layer of the asynchronous receive and send data to a server on the WebSocket transport.
 */
Ext.define("Terrasoft.core.WebSocketChannel", {
	extend: "Terrasoft.core.MsgChannel",
	alternateClassName: "Terrasoft.WebSocketChannel",

	/**
	 * WebSocket instance.
	 * @private
	 * @type {Object}
	 */
	webSocketConnection: null,

	/**
	 * Address of the WebSocket service.
	 * @type {String}
	 */
	serviceUrl: "",

	/**
	 * It creates and initializes the object {@link Terrasoft.WebSocketChannel}.
	 * @param {Object} config Configuration object.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event Terrasoft.EventName.ON_CONNECTION_INITIALIZED
			 * Triggered when open WebSocket connection.
			 */
			Terrasoft.EventName.ON_CONNECTION_INITIALIZED,
			/**
			 * @event Terrasoft.EventName.ON_ERROR
			 * Triggered when error WebSocket connection.
			 */
			Terrasoft.EventName.ON_ERROR
		);
		if (config.serviceUrl) {
			this.serviceUrl = config.serviceUrl;
			this.init();
		}
	},

	/**
	 * Sets inner handlers for WebSocket chanel.
	 * @private
	 */
	setupWebSocketHandlers: function() {
		this.webSocketConnection.onopen = this.webSocketOpen.bind(this);
		this.webSocketConnection.onmessage = function(args) {
			this.channelMsgHandler(args.data);
		}.bind(this);
		this.webSocketConnection.onclose = this.channelClosedHandler.bind(this);
		this.webSocketConnection.onerror = this.webSocketError.bind(this);
	},

	/**
	 * Inner handler for opening websocket connection event.
	 * @private
	 */
	webSocketOpen: function() {
		this.log("WebSocket-connection opened for url:" + this.serviceUrl);
		this.fireEvent(Terrasoft.EventName.ON_CONNECTION_INITIALIZED, this);
	},

	/**
	 * Inner handler for error websocket connection event.
	 * @private
	 */
	webSocketError: function() {
		this.fireEvent(Terrasoft.EventName.ON_ERROR, this);
	},

	/**
	 * Returns connection state.
	 * @return {Terrasoft.SocketConnectionState}
	 */
	getConnectionState: function() {
		if (!this.webSocketConnection) {
			return Terrasoft.SocketConnectionState.NOT_INITIALIZED;
		}
		return this.webSocketConnection.readyState;
	},

	/**
	 * Initializes WebSocket connection.
	 */
	init: function() {
		if (!this.webSocketConnection || this.webSocketConnection.readyState !== Terrasoft.SocketConnectionState.OPEN) {
			this.webSocketConnection = new WebSocket(this.serviceUrl);
			if (Ext.isIE && this.webSocketConnection) {
				window.onbeforeunload = function() {
					this.webSocketConnection = null;
				}.bind(this);
			}
			this.setupWebSocketHandlers();
		}
	},

	/**
	 * Closes WebSocket connection.
	 */
	close: function() {
		if (this.webSocketConnection) {
			this.webSocketConnection.close();
		}
	},

	/**
	 * Sends the ping command.
	 */
	ping: function() {
		const msg = {
			Id: Terrasoft.generateGUID(),
			Header: {
				Sender: Terrasoft.ServerChannelSender.CONSOLE_COMMAND,
				BodyTypeName: "System.String"
			},
			Body: "ping"
		};
		const encodedMsg = Terrasoft.encode(msg);
		this.postMessage(encodedMsg);
	},

	/**
	 * Sends message to WebSocket channel in OneWay mode.
	 * @param {Object} msg Message.
	 */
	postMessage: function(msg) {
		this.webSocketConnection.send(msg);
	}
});

/**
 * Returns channel state.
 * @return {Boolean}
 */
Object.defineProperty(Terrasoft.core.WebSocketChannel.prototype, "isOpened", {
	get: function() {
		return this.getConnectionState() === Terrasoft.SocketConnectionState.OPEN;
	}
});
