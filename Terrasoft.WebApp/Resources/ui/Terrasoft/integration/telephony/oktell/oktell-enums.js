Ext.ns('Terrasoft.integration');
Ext.ns('Terrasoft.integration.telephony');
Ext.ns('Terrasoft.integration.telephony.oktell');

//region Enum: OktellLineState

/** @enum
	  * Call status */
Terrasoft.integration.telephony.oktell.OktellLineState = {
	/** The phone is missing or not registered. */
	DISCONNECTED: "disconnected",
	/** The phone is ready for calls. */
	READY: "ready",
	/** A dial up to the subscriber. */
	CALL: "call",
	/** An incoming call. The phone is ringing. */
	RING: "ring",
	/** Callback is in progress. The stage of dialing to the user. The phone is ringing. */
	BACKRING: "backring",
	/** The phone is in conversation. */
	TALK: "talk"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.oktell.OktellLineState}
 * @member Terrasoft.integration.telephony.oktell
 * @inheritdoc Terrasoft.integration.telephony.oktell.OktellLineState
 */
Terrasoft.OktellLineState = Terrasoft.integration.telephony.oktell.OktellLineState;

//endregion

//region Enum: OktellAgentState

/** @enum
	  * Operator status */
Terrasoft.integration.telephony.oktell.OktellAgentState = {
	/** Disconnected. */
	DISCONNECTED: 0,
	/** Ready. */
	READY: 1,
	/** Break. */
	BREAK: 2,
	/** Disabled. */
	OFF: 3,
	/** Busy. */
	BUSY: 5,
	/** Reserved. */
	RESERVED: 6,
	/** Without a phone. */
	NOPHONE: 7
};

/**
 * short notation for {@link Terrasoft.integration.telephony.oktell.OktellAgentState}
 * @member Terrasoft.integration.telephony.oktell
 * @inheritdoc Terrasoft.integration.telephony.oktell.OktellAgentState
 */
Terrasoft.OktellAgentState = Terrasoft.integration.telephony.oktell.OktellAgentState;

//endregion

//region Enum: OktellFlashType

/** @enum
	  * The type of transition from the hold status */
Terrasoft.integration.telephony.oktell.OktellFlashType = {
	/** Someone is put in the buffer */
	PUT: 1,
	/** Returned to someone in the buffer */
	RETURN: 2,
	/**  Broke the flash by putting the phone down or by other actions. The subscriber in the flash got busy */
	ABORT: 3,
	/** Subscriber being in the flash has left, or an error when trying to switch to it */
	LOST: 4,
	/** Switched the one in the buffer to someone else */
	SWITCH: 5,
	/** Together with the subscriber switched to the conference */
	INVITE: 6,
	/** Switched between two FLASH subscribers (without break) */
	BETWEEN: 7,
	/** Switched immediately to dial the number, disconnecting the second */
	NEXT: 8,
	/** Placed in someone's flash-buffer */
	FLASHED: 11,
	/** Returned from the flash (in the queue, when the commutation did not really start, otherwise on CommStarted we determine the return) */
	RESTORED: 12,
	/** Disconnected from flash */
	ABORTED: 13
};

/**
 * short notation for {@link Terrasoft.integration.telephony.oktell.OktellFlashType}
 * @member Terrasoft.integration.telephony.oktell
 * @inheritdoc Terrasoft.integration.telephony.oktell.OktellFlashType
 */
Terrasoft.OktellFlashType = Terrasoft.integration.telephony.oktell.OktellFlashType;

//endregion