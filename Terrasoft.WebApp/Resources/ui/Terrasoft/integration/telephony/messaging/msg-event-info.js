Ext.ns('Terrasoft.integration');
Ext.ns('Terrasoft.integration.telephony');
Ext.ns('Terrasoft.integration.telephony.messaging');

/**
 * The telephony event message class.
 */

Ext.define('Terrasoft.integration.telephony.messaging.MsgEventInfo', {
	extend: 'Terrasoft.BaseObject',
	alternateClassName: 'Terrasoft.MsgEventInfo',
	mixins: {
		serializable: 'Terrasoft.Serializable'
	},

	/**
  * Array of serializable properties.
  * @private
  * @type {String[]}
  */
	serializableSimplePropertiesList: ['connectionUId', 'commandUId', 'eventType', 'content', 'contentType'],

	/**
  * Connection Id.
  * @type {String}
  */
	connectionUId: null,

	/**
  * The identifier of the command that spawned the event.
  * @type {String}
  */
	commandUId: '',

	/**
  * Event type.
  * @type {Terrasoft.MsgEventType}
  */
	eventType: Terrasoft.MsgEventType.NONE,

	/**
  * The contents of the event.
  * @type {Object}
  */
	content: '',

	/**
  * Ttype of the content of the event.
  * @type {String}
  */
	contentType: '',

	/**
  * Additional event parameters.
  * @type {Object}
  */
	privateData: null,

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface.
  * {@link Terrasoft.Serializable}
  * @protected
  * @param {Object} serializableObject Serializable object.
  */
	getSerializableObject: function(serializableObject) {
		Terrasoft.each(this.serializableSimplePropertiesList, function(property) {
			serializableObject[property] = this[property];
		}, this);
	}

});