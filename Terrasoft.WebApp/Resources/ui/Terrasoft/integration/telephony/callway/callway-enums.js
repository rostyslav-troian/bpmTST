Ext.ns('Terrasoft.integration');
Ext.ns('Terrasoft.integration.telephony');
Ext.ns('Terrasoft.integration.telephony.callway');

//region Enum: CallwayEventType

/** @enum
  * Call statuses. */
Terrasoft.integration.telephony.callway.CallwayEventType = {
	/** The call was distributed to the operator. */
	NEW_CALL: "NewCall",
	/** The call changed the status. */
	CALL_STATE_CHANGED: "CallStateChanged",
	/** The operator has changed status. */
	OPERATOR_STATE: "OperatorState",
	/** The user has been authorized on the Callway server. */
	AUTHORIZED: "AuthorizationResponse"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.callway.CallwayEventType}.
 * @member Terrasoft.integration.telephony.callway
 * @inheritdoc Terrasoft.integration.telephony.callway.CallwayEventType
 */
Terrasoft.CallwayEventType = Terrasoft.integration.telephony.callway.CallwayEventType;

//endregion

//region Enum: CallwayCallDirection

/** @enum
  * Direction of the call. */
Terrasoft.integration.telephony.callway.CallwayCallDirection = {
	/** Incoming. */
	INCOMING: "Incoming",
	/** Outgoing. */
	OUTGOING: "Outgoing",
	/** Internal. */
	LOCAL: "Internal"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.callway.CallwayCallDirection}.
 * @member Terrasoft.integration.telephony.callway
 * @inheritdoc Terrasoft.integration.telephony.callway.CallwayCallDirection
 */
Terrasoft.CallwayCallDirection = Terrasoft.integration.telephony.callway.CallwayCallDirection;

//endregion

//region Enum: CallwayCallState

/** @enum
  * Direction of the call. */
Terrasoft.integration.telephony.callway.CallwayCallState = {
	/** A connection has occurred. */
	BRIDGE: "Bridge",
	/** End of the call. */
	HANGUP: "Hangup",
	/** Calling on hold. */
	HOLD: "Hold",
	/** Removing the call from hold. */
	UNHOLD: "Unhold",
	/** Transfer of the call by the operator. */
	TRANSFER: "Transfer"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.callway.CallwayCallState}.
 * @member Terrasoft.integration.telephony.callway
 * @inheritdoc Terrasoft.integration.telephony.callway.CallwayCallState
 */
Terrasoft.CallwayCallState = Terrasoft.integration.telephony.callway.CallwayCallState;

/** @enum
  * The result of authorization on the Callway server. */
Terrasoft.integration.telephony.callway.CallwayAuthorizationResult = {
	/** Successfully. */
	SUCCESS: "Success",
	/** Failed. */
	FAILED: "Failed"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.callway.CallwayAuthorizationResult}.
 * @member Terrasoft.integration.telephony.callway
 * @inheritdoc Terrasoft.integration.telephony.callway.CallwayAuthorizationResult
 */
Terrasoft.CallwayAuthorizationResult = Terrasoft.integration.telephony.callway.CallwayAuthorizationResult;

//endregion