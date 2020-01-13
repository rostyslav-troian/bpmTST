/**
 * The channel for exchanging messages with the BPMonline server, the messages are encoded in the JSON format
 */
Ext.define("Terrasoft.core.ServerChannel", {
	extend: "Terrasoft.MsgChannel",
	alternateClassName: "Terrasoft.ServerChannel",
	singleton: true,

	/**
	 * Maximum number of re-connections.
	 * @type {Number}
	*/
	maxReconnectCount: 200,

	/**
	 * Current number of re-connections.
	 * @type {Number}
	*/
	reconnectCount: 0,

	/**
	 * Default class for msg provider.
	 * @private
	 * @type {String}
	 */
	_defaultMsgProviderClass: "Terrasoft.WebSocketChannel",

	/**
	* Handles command message.
	* @private
	* @param {Object} msg Server channel message.
	*/
	commandMsgHandler: function(msg) {
		try {
			this.log("Server said: " + msg.Body);
			this.fireEvent(Terrasoft.EventName.ON_MESSAGE, this, msg);
		} catch (catchedException) {
			this.log("Error in command handler:" + catchedException);
		}
	},

	/**
	 * Handles broadcast messages.
	 * @private
	 * @param {Object} channelMsg Server channel message.
	 */
	broadcastMsgHandler: function(channelMsg) {
		const broadcastMessage = Terrasoft.decode(channelMsg.Body);
		this.fireEvent(Terrasoft.ServerChannelSender.BROADCAST_MESSAGE, this, broadcastMessage);
	},

	/**
	 * Makes routing of received message.
	 * @private
	 * @param {Object} msg Server channel message.
	 */
	_translateDecodedMessage: function(msg) {
		const senderName = this.getSenderName(msg);
		switch (senderName) {
			case Terrasoft.ServerChannelSender.COMMAND_SERVICE:
				this.commandMsgHandler(msg);
				break;
			case Terrasoft.ServerChannelSender.BROADCAST_MESSAGE:
				this.broadcastMsgHandler(msg);
				break;
			default:
				this.fireEvent(Terrasoft.EventName.ON_MESSAGE, this, msg);
		}
	},

	/**
	 * Internal message handler called by messaging provider.
	 * @param {String/Object} msg A server message.
	 * @private
	 */
	_channelMsgHandler: function(msg) {
		if (this.msgProvider.hasOwnSerializer) {
			this._translateDecodedMessage(msg);
			return;
		}
		let jsonMsg;
		try {
			jsonMsg = Ext.decode(msg);
		} catch (caughtException) {
			this.log("Error on server msg decoding:" + caughtException);
		} finally {
			this._translateDecodedMessage(jsonMsg);
		}
	},

	/**
	 * Returns sender name.
	 * @param {Object} channelMessage Server channel message.
	 * @return {String|null}
	 */
	getSenderName: function(channelMessage) {
		return channelMessage && channelMessage.Header.Sender;
	},

	/**
	 * Creates server bi-directional communication channel.
	 */
	constructor: function() {
		const providerConfig = {
			serviceUrl: Terrasoft.serviceUrl
		};
		this.reconnectCount = 0;
		const msgProviderClass = Terrasoft.serverChannelMsgProviderClass || this._defaultMsgProviderClass;
		const msgProvider = Ext.create(msgProviderClass, providerConfig);
		const config = {
			msgProvider: msgProvider
		};
		this.callParent([config]);
		msgProvider.on(Terrasoft.EventName.ON_CHANNEL_CLOSED, this.providerChannelClosedHandler, this);
		msgProvider.on(Terrasoft.EventName.ON_CONNECTION_INITIALIZED, this.providerChannelOpenedHandler, this);
		msgProvider.on(Terrasoft.EventName.ON_MESSAGE, this.providerChannelMsgEventHandler, this);
	},

	/**
	 * Internal handler for closing the connection. Initializes an attempt to reconnect to the server.
	 * @protected
	 */
	providerChannelClosedHandler: function() {
		const currentMoment = new Date();
		this.log(currentMoment + " Channel closed. Reconnect..");
		if (this.reconnectCount < this.maxReconnectCount) {
			this.init();
			this.reconnectCount++;
		} else {
			this.log("Max reconnect count exceeded. Reload page after the server will be available");
		}
	},

	/**
	 * Channel opened event handler.
	 * @protected
	 */
	providerChannelOpenedHandler: function() {
		this.reconnectCount = 0;
	},

	/**
	 * Internal message handler called by messaging provider.
	 * @param {String/Object} msg A server message.
	 * @deprecated 7.14.2
	 * @protected
	 */
	channelMsgHandler: function(msg) {
		this._channelMsgHandler(msg);
	},

	/**
	 * Provider message event handler.
	 * @param {Object} scope The scope.
	 * @param {String|Object} msg The object that contains the server message.
	 * @protected
	 * @override
	 */
	providerChannelMsgEventHandler: function(scope, msg) {
		this._channelMsgHandler(msg);
	},

	/**
	 * Returns provider connection state.
	 * @return {Terrasoft.SocketConnectionState}
	 */
	getConnectionState: function() {
		return this.msgProvider.getConnectionState();
	},

	/**
	 * Creates a message object.
	 * @return {Object} The message object of the established basic format.
	 */
	createMessageObject: function() {
		return {
			Id: Terrasoft.generateGUID(),
			Header: {
				Sender: "",
				BodyTypeName: ""
			},
			Body: null
		};
	},

	/**
	 * Sends the ping command.
	 */
	ping: function() {
		this.msgProvider.ping();
	},

	/**
	 * Sends the channel message in OneWay mode.
	 * @param {Object} msg A message to send.
	  */
	postMessage: function(msg) {
		const encodedMsg = this.msgProvider.hasOwnSerializer ? msg : Terrasoft.encode(msg);
		this.callParent([encodedMsg]);
	},

	/**
	 * Sends broadcast message.
	 * @param {Object} msg Message config.
	 */
	broadcastMessage: function(msg) {
		const msgToSend = {
			Id: Terrasoft.generateGUID(),
			Header: {
				Sender: Terrasoft.ServerChannelSender.BROADCAST_MESSAGE,
				BodyTypeName: "System.String"
			},
			Body: Terrasoft.encode(msg)
		};
		this.postMessage(msgToSend);
	},

	/**
	 * Returns broadcast message.
	 * @param {String} channelMessage Server channel message.
	 * @return {Object|null}
	 * @deprecated
	 */
	getBroadcastMessage: function(channelMessage) {
		let message = null;
		const senderName = this.getSenderName(channelMessage);
		if (senderName === Terrasoft.ServerChannelSender.BROADCAST_MESSAGE) {
			const bodyObject = Terrasoft.decode(channelMessage.Body);
			if (!Terrasoft.isEmptyObject(bodyObject)) {
				message = bodyObject;
			}
		}
		return message;
	},

	/**
	 * Initializes server connection.
	 */
	init: function() {
		try {
			this.msgProvider.init();
		} catch (error) {
			this.log(error);
		}
	}

});
