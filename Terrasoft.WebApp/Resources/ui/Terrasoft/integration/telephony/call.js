Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");

/**
 * Call class of telephony.
 */

Ext.define("Terrasoft.integration.telephony.Call", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.Telephony.Call",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	/**
  * Array of serializable properties.
  * @private
  * @type {String[]}
  */
	serializablePropertiesList: ["id", "databaseUId", "userContactUId", "deviceId", "callerId", "calledId", "direction",
		"callContext", "callContextType", "state", "redirectingId", "redirectionId"],

	/**
  * Caller Id.
  * @type {String}
  */
	id: "",

	/**
  * The identifier of the call in the database.
  * @type {String}
  */
	databaseUId: "",

	/**
  * Contact of the user who created the call.
  * @type {String}
  */
	userContactUId: "",

	/**
  * A set of available operations over the call. The set of bitwise enumeration flags.
  * {@link Terrasoft.CallFeaturesSet}
  * @type {Number}
  */
	callFeaturesSet: 0,

	/**
  * Parental (initial) call.
  * @type {Terrasoft.integration.telephony.Call}
  */
	parentCall: null,

	/**
  * The identifier of the device (line) that the caller serves.
  * @type {String}
  */
	deviceId: "",

	/**
  * Number of the caller.
  * @type {String}
  */
	callerId: "",

	/**
  * Number of the subscriber receiving the call.
  * @type {String}
  */
	calledId: "",

	/**
  * Direction of the call.
  * @type {Terrasoft.CallDirection}
  */
	direction: Terrasoft.CallDirection.UNKNOWN,

	/**
  * Additional information about the call.
  * @type {String}
  */
	callContext: "",

	/**
  * Type of additional information about the call.
  * @type {String}
  */
	callContextType: "",

	/**
  * Date / Time of call start.
  * @type {Date}
  */
	startTime: null,

	/**
  * Date / Time of call completion.
  * @type {Date}
  */
	endTime: null,

	/**
  * Call status.
  * @type {Terrasoft.GeneralizedCallState}
  */
	state: Terrasoft.GeneralizedCallState.NONE,

	/**
  * The previous state of the call.
  * @type {Terrasoft.GeneralizedCallState}
  */
	oldState: Terrasoft.GeneralizedCallState.NONE,

	/**
  * The reason for the call status.
  * @type {String}
  */
	stateCause: "",

	/**
  * Previous values of the properties of the call.
  * It is necessary to detect the need to save the call again in the database.
  * Contains the previous property values {@link serializablePropertiesList}.
  */
	oldData: null,

	/**
  * Collection of data of call identification fields.
  * @type {Terrasoft.Collection}
  */
	identificationFieldsData: null,

	/**
  * A sign of the need to update the call record with identification data.
  * @type {Boolean}
  */
	needSaveIdentificationData: false,

	/**
  * A sign that the call was saved in the database.
  * Set on the event {@link Terrasoft.BaseCtiProvider # callSaved}.
  * @type {Boolean}
  */
	isSavedInDB: false,

	/**
  * The time of the last call on hold.
  * @type {Date}
  */
	currentHoldStartTime: null,

	/**
  * The duration of the call on hold (in seconds).
  * @type {Number}
  */
	totalHoldDuration: 0,

	/**
  * Time to establish a call connection.
  * @type {Date}
  */
	connectionStartTime: null,

	/**
  * Time of the last resumption of the conversation.
  * @type {Date}
  */
	currentTalkStartTime: null,

	/**
  * The duration of the call (in seconds).
  * @type {Number}
  */
	totalTalkDuration: 0,

	/**
  * The number of the transferee (subscriber B).
  * @type {String}
  */
	redirectingId: "",

	/**
  * Number of the translated (subscriber C).
  * @type {String}
  */
	redirectionId: "",

	/**
  * The time of the last event that occurred.
  * @type {Date}
  */
	timeStamp: null,

	/**
	 * Telephony provider.
	 * @type {Terrasoft.BaseCtiProvider}
	 */
	ctiProvider: null,

	/**
  * Returns the subscriber's number.
  */
	getAbonentNumber: function() {
		if (this.deviceId === this.callerId) {
			return this.calledId;
		}
		return this.callerId;
	},

	/**
  * Responds to the current call.
  */
	answer: function() {
		this.ctiProvider.answerCall(this);
	},

	/**
  * Terminates the current call.
  */
	drop: function() {
		this.ctiProvider.dropCall(this);
	},

	/**
  * Puts or removes the current call on hold.
  */
	hold: function() {
		this.ctiProvider.holdCall(this);
	},

	/**
  * Makes a consultation call for transferring the call.
  * @param {String} targetAddress Number for which the consultation call is made.
  */
	makeConsultCall: function(targetAddress) {
		this.ctiProvider.makeConsultCall(this, targetAddress);
	},

	/**
  * Terminates the (conditional) transfer of the call.
  * @param {Terrasoft.integration.telephony.Call} consultationCall Consultation call.
  */
	transfer: function(consultationCall) {
		this.ctiProvider.transferCall(this, consultationCall);

	},

	/**
  * Prepare a call for a conditional transfer (consulting call).
  */
	setupTransfer: function() {
		this.ctiProvider.setupTransferCall(this);
	},

	/**
  * Performs an unconditional (blind) transfer of the current call.
  * @param {String} targetAddress Phone number on which the transfer is made.
  */
	blindTransfer: function(targetAddress) {
		this.ctiProvider.blindTransferCall(this, targetAddress);
	},

	/**
  * Sends the Dtmf signal by a call.
  * @param {String} digit Signal symbol.
  */
	sendDtmf: function(digit) {
		this.ctiProvider.sendDtmf(this, digit);
	},

	/**
  * Updates the previous values of the call properties {@link oldData}.
  * @return {boolean} If the values have changed - true, else - false.
  */
	updateOldData: function() {
		var oldData = this.oldData || {};
		var isDataModified = false;
		Terrasoft.each(this.serializablePropertiesList, function(propertyName) {
			var oldValue = oldData[propertyName];
			var newValue = this[propertyName];
			if (oldValue !== newValue) {
				oldData[propertyName] = newValue;
				isDataModified = true;
			}
		}, this);
		if (isDataModified) {
			this.oldData = oldData;
		}
		return isDataModified;
	},

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface
  * {@link Terrasoft.Serializable}.
  * @protected
  * @param {Object} serializableObject A serializable object.
  */
	getSerializableObject: function(serializableObject) {
		Terrasoft.each(this.serializablePropertiesList, function(property) {
			var propertyValue = this[property];
			if (!Ext.isEmpty(propertyValue)) {
				serializableObject[property] = propertyValue;
			}
		}, this);
	}
});
