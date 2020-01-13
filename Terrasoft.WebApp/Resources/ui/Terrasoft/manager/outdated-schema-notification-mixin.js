/**
 */
Ext.define("Terrasoft.core.mixins.OutdatedSchemaNotificationMixin", {
	alternateClassName: "Terrasoft.OutdatedSchemaNotificationMixin",

	//region Properties: Protected

	/**
	 * Use notification of change in the state of an object.
	 * @protected
	 * @type {Boolean}
	 */
	useNotification: false,

	/**
	 * Flag that indicates this manager is outdated.
	 * @protected
	 * @type {Boolean}
	 */
	isOutdated: false,

	/**
	 * Outdated event name.
	 * @protected
	 * @type {String}
	 */
	outdatedEventName: null,

	/**
	 * Outdated properties.
	 * @protected
	 * @type {Array}
	 */
	outdatedProperties: [],

	//endregion

	//region Methods: Protected

	/**
	 * Subscribe on notification.
	 * @throws {Terrasoft.NullOrEmptyException} Throws exception if outdatedEventName is empty.
	 * @protected
	 */
	subscribeOnServerChannelMessage: function() {
		if (this.useNotification) {
			if (this.outdatedEventName) {
				Terrasoft.ServerChannel.on(Terrasoft.ServerChannelSender.BROADCAST_MESSAGE,
					this.onBroadcastServerMessage, this);
			} else {
				throw new Terrasoft.NullOrEmptyException();
			}
		}
	},

	/**
	 * Returns sign of outdated manager.
	 * @protected
	 * @param {Object} message
	 * @return {Boolean}
	 */
	getIsOutdated: function(message) {
		return message.event === this.outdatedEventName && message.senderInstanceId !== this.instanceId;
	},

	/**
	 * Handles the message for manager when outdated.
	 * @protected
	 * @param {Object} broadcastMessage Broadcast message.
	 */
	onOutdated: function(broadcastMessage) {
		this.isOutdated = true;
		this.fireEvent("outdated", broadcastMessage, this);
	},

	/**
	 * Handles the broadcast server message.
	 * @protected
	 * @param {Terrasoft.ServerChannel} channel Channel messaging server BPMonline.
	 * @param {Object} broadcastMessage Broadcast message.
	 */
	onBroadcastServerMessage: function(channel, broadcastMessage) {
		if (broadcastMessage && this.getIsOutdated(broadcastMessage)) {
			this.onOutdated(broadcastMessage);
		}
	},

	/**
	 * Returns message for notifies.
	 * @protected
	 * @param {String} event Event name.
	 * @param {Object} content Content object.
	 * @return {String}
	 */
	getNotifyMessage: function(event, content) {
		content = content || {};
		Ext.apply(content, {
			senderInstanceId: this.instanceId,
			event: event
		});
		return content;
	},

	//endregion

	//region Methods: Public

	/**
	 * Notifies of change in the state of an object.
	 * @protected
	 * @param {String} event Event name.
	 * @param {Object} content Content object.
	 */
	notify: function(event, content) {
		if (this.useNotification) {
			var message = this.getNotifyMessage(event, content);
			if (Terrasoft.ServerChannel.isOpened) {
				Terrasoft.ServerChannel.broadcastMessage(message);
			} else {
				this.error("Outdated schema notification error. Websoсket is not opened");
			}
		}
	}

	//endregion

});
