/**
 * Asynchronous message exchange channel.
 */
Ext.define("Terrasoft.core.MsgChannel", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.MsgChannel",

	/**
	 * Message source object and message provider.
	 * @private
	 * @type {Terrasoft.MsgChannel}
	 */
	msgProvider: null,

	/**
	 * The name of the channel to identify.
	 * @private
	 * @type {String}
	 */
	name: "",

	/**
	 * If true then channel serialize/deserialize all in/out messages itself,
	 * else - message needs to be decoded/encoded from JSON.
	 * @type {Boolean}
	 */
	hasOwnSerializer: false,

	constructor: function(config) {
		/**
		 * Creates and initializes an object {@link Terrasoft.MsgChannel}.
		 * @param {Object} config Configuration object.
		 */
		this.callParent(arguments);
		this.addEvents(
				Terrasoft.EventName.ON_MESSAGE,
				/**
				 * @event Terrasoft.EventName.ON_MESSAGE
				 * This is triggered when a message comes from the server.
				 */
				/**
				 * @event Terrasoft.EventName.ON_CHANNEL_CLOSED
				 * This is triggered when the connection to the server is closed.
				 */
				Terrasoft.EventName.ON_CHANNEL_CLOSED
		);
		if (config.msgProvider) {
			this.msgProvider = config.msgProvider;
			this.msgProvider.on(Terrasoft.EventName.ON_MESSAGE, this.providerChannelMsgEventHandler, this);
			this.msgProvider.on(Terrasoft.EventName.ON_CHANNEL_CLOSED, this.channelClosedHandler, this);
		}
	},

	/**
	 * Internal message handler from source.
	 * @param {Object} msg The object that contains the server message.
	 * @protected
	 */
	channelMsgHandler: function(msg) {
		this.fireEvent(Terrasoft.EventName.ON_MESSAGE, this, msg);
	},

	/**
	 * Provider message event handler.
	 * @param {Object} scope The scope.
	 * @param {Object} msg The object that contains the server message.
	 * @protected
	 */
	providerChannelMsgEventHandler: Terrasoft.emptyFn,

	/**
	 * Internal handler for closing source channel.
	 * @protected
	 */
	channelClosedHandler: function() {
		this.fireEvent(Terrasoft.EventName.ON_CHANNEL_CLOSED, this);
	},

	/**
	 * Sends a message to the provider in OneWay mode.
	 * @param {String} msg Message.
	 */
	postMessage: function(msg) {
		this.msgProvider.postMessage(msg);
	}

});

/**
 * Returns channel state.
 * @return {Boolean}
 */
Object.defineProperty(Terrasoft.core.MsgChannel.prototype, "isOpened", {
	get: function() {
		if (this.msgProvider) {
			return this.msgProvider.isOpened;
		}
		return false;
	}
});
