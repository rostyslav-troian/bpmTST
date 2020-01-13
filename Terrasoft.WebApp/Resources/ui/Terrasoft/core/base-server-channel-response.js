/**
 */
Ext.define("Terrasoft.core.BaseServerChannelResponse", {
	alternateClassName: "Terrasoft.BaseServerChannelResponse",
	extend: "Terrasoft.BaseObject",

	//region Properties: Private

	/**
	 * Message sender.
	 * @private
	 * @type {String}
	 */
	sender: "",

	//endregion

	//region Properties: Protected

	/**
	 * Decoded source message.
	 * @protected
	 * @type {Object}
	 */
	message: null,

	//endregion

	//region Methods: Private

	/**
	 * Prepares message.
	 * @private
	 * @param {Object} messageObject Message object.
	 * @return {Object}
	 */
	prepareMessage: function(messageObject) {
		var messageBody = messageObject.Body;
		try {
			return Terrasoft.decode(messageBody);
		} catch (e) {
			return messageBody;
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		var message = config.message;
		this.message = this.prepareMessage(message);
		this.sender = message.Header.Sender;
	},

	/**
	 * Gets message.
	 * @return {String}
	 */
	getMessage: function() {
		return this.message;
	},

	/**
	 * Returns message sender.
	 * @return {String} Message sender.
	 */
	getSender: function() {
		return this.sender;
	},

	/**
	 * Validates message sender.
	 * @param {String} expectedSender Expected sender.
	 * @return {Boolean} Validation result.
	 */
	validateSender: function(expectedSender) {
		return (this.getSender() === expectedSender);
	}

	//endregion

});
