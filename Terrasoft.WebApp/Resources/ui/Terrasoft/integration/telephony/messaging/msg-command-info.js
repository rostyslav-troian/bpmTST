Ext.ns('Terrasoft.integration');
Ext.ns('Terrasoft.integration.telephony');
Ext.ns('Terrasoft.integration.telephony.messaging');

/**
 * The telephony command message class
 */
Ext.define('Terrasoft.integration.telephony.messaging.MsgCommandInfo', {
	extend: 'Terrasoft.BaseObject',
	alternateClassName: 'Terrasoft.MsgCommandInfo',
	mixins: {
		serializable: 'Terrasoft.Serializable'
	},

	/**
	 * An array of serializable properties
	 * @private
	 * @type {String[]}
	 */
	serializableSimplePropertiesList: ['commandUId', 'command', 'libraryInstanceUId', 'connectionUId',
		'commandExecutorId', 'commandExecutorType', 'commandExecutorType'],

	/**
	 * Command Id
	 * @type {String}
	 */
	commandUId: '',

	/**
	 * Type of telephony command
	 * @type {Terrasoft.CtiCommand}
	 */
	command: '',

	/**
	 * Command options
	 * A key is a string, a value is a serialized object or a primitive type
	 * @type {Object}
	 */
	parameters: null,

	/**
	 * The identifier of the telephony library
	 * @type {String}
	 */
	libraryInstanceUId: '',

	/**
	 * Connection Id
	 * @type {String}
	 */
	connectionUId: '',

	/**
	 * Command executor ID
	 * For example, the call identifier
	 * @type {String}
	 */
	commandExecutorId: '',

	/**
	 * Type of the command executor
	 * @type {Terrasoft.MessagingCommandExecutorType}
	 */
	commandExecutorType: Terrasoft.MessagingCommandExecutorType.NONE,

	/**
	 * The object of the command executor
	 * For example, a call
	 * @type {Object}
	 */
	commandExecutor: null,

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @param {Object} serializableObject Serializable object
	 */
	getSerializableObject: function(serializableObject) {
		Terrasoft.each(this.serializableSimplePropertiesList, function(property) {
			serializableObject[property] = this[property];
		}, this);
		serializableObject.commandExecutor = this.getSerializableProperty(this.commandExecutor);
		serializableObject.parameters = this.getSerializableProperty(this.parameters);
	}

});