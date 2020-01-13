Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");
Ext.ns("Terrasoft.integration.telephony.finesse");

//region Enum: Finesse Dialog States

/**
   * @enum
   * Call statuses.
   */
Terrasoft.integration.telephony.finesse.FinesseDialogState = {
	/** The phone initiates the call. */
	INITIATING: "INITIATING",
	/** The phone has initiated a call. */
	INITIATED: "INITIATED",
	/** The phone is ringing. */
	ALERTING: "ALERTING",
	/** The phone has an active call. */
	ACTIVE: "ACTIVE",
	/** The call failed. */
	FAILED: "FAILED",
	/** The call has no active participants. */
	DROPPED: "DROPPED",
	/** The user accepted the call with a preview. */
	ACCEPTED: "ACCEPTED",
	/** Call on hold. */
	HELD: "HELD",
	/** Call in postprocessing. */
	WRAP_UP: "WRAP_UP"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseDialogState}.
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseDialogState
 */
Terrasoft.FinesseDialogState = Terrasoft.integration.telephony.finesse.FinesseDialogState;

/**
   * @enum
   * Causes of call states.
   */
Terrasoft.integration.telephony.finesse.FinesseDialogStateCause = {
	/** The subscriber is busy. */
	BUSY: "BUSY",
	/** Invalid dialed number. */
	BAD_DESTINATION: "BAD_DESTINATION",
	/** Other. */
	OTHER: "OTHER"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseDialogStateCause}.
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseDialogStateCause.
 */
Terrasoft.FinesseDialogStateCause = Terrasoft.integration.telephony.finesse.FinesseDialogStateCause;

/**
   * @enum
   Types of dialogs.
   */
Terrasoft.integration.telephony.finesse.FinesseDialogMediaType = {
	/**Call.*/
	VOICE: "Voice",
	/** Email.*/
	EMAIL: "Email",
	/** Chat.*/
	CHAT: "Chat"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseDialogMediaType}.
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseDialogMediaType
 */
Terrasoft.FinesseDialogMediaType = Terrasoft.integration.telephony.finesse.FinesseDialogMediaType;

/** @enum
	  * Types of actions.
   */
Terrasoft.integration.telephony.finesse.FinesseDialogAction = {
	/** Call. */
	MAKE_CALL: "MAKE_CALL",
	/** Reply.*/
	ANSWER: "ANSWER",
	/** Hold. */
	HOLD: "HOLD",
	/** Take from hold. */
	RETRIEVE: "RETRIEVE",
	/** Reset.*/
	DROP: "DROP",
	/** Update. */
	UPDATE_CALL_DATA: "UPDATE_CALL_DATA",
	/** Send DTMF. */
	SEND_DTMF: "SEND_DTMF",
	/** Start a consulting call. */
	CONSULT_CALL: "CONSULT_CALL",
	/** Start the conference. */
	CONFERENCE: "CONFERENCE",
	/** Transfer.*/
	TRANSFER: "TRANSFER",
	/** Make unconditional transfer*/
	TRANSFER_SST: "TRANSFER_SST",
	/** Overhear.*/
	SILENT_MONITOR: "SILENT_MONITOR",
	/** Intercept. */
	BARGE_CALL: "BARGE_CALL",
	/** To accept.*/
	ACCEPT: "ACCEPT",
	/** Throw away. */
	CLOSE: "CLOSE",
	/** Cancel. */
	REJECT: "REJECT"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseDialogAction}
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseDialogAction
 */
Terrasoft.FinesseDialogAction = Terrasoft.integration.telephony.finesse.FinesseDialogAction;

/**
   * @enum
   User/agent statuses.
   */
Terrasoft.integration.telephony.finesse.FinesseAgentState = {
	/** To enter Finesse, the agent sets the LOGIN state.
	 * LOGIN is a transition status and automatically goes to NOT_READY. */
	LOGIN: "LOGIN",
	/** To exit Finesse, the agent sets the LOGOUT state.
	 * The agent can set the LOGOUT status only when it is in the NOT_READY state. */
	LOGOUT: "LOGOUT",
	/** Not ready. */
	NOT_READY: "NOT_READY",
	/** In order to become available for incoming or outgoing calls, the agent sets the READY state. */
	READY: "READY",
	/** An incoming call arrives at the agent. */
	RESERVED: "RESERVED",
	/** The outgoing agent becomes reserved for processing the outgoing Option Progressive call
	 or Predictive call. */
	RESERVED_OUTBOUND: "RESERVED_OUTBOUND",
	/** The outgoing agent becomes reserved for processing the outgoing Option Preview call. */
	RESERVED_OUTBOUND_PREVIEW: "RESERVED_OUTBOUND_PREVIEW",
	/** Speaks. */
	TALKING: "TALKING",
	/** If the wrap-up is enabled and the agent wants to go to NOT_READY during a call,
	 * it goes into the WORK state after the call is dropped. */
	WORK: "WORK",
	/** If post-processing (wrap-up) is enabled, it goes to the WORK_READY state after the call is reset. */
	WORK_READY: "WORK_READY",
	/** Call hold. */
	HOLD: "HOLD",
	/** If the status of the agent is unknown. This scenario is unlikely. */
	UNKNOWN: "UNKNOWN",
	/** It is set when an attempt is made to reach the subscriber who is busy. */
	BUSY: "BUSY",
	/** Set when an attempt is made to call a non-existent number. */
	BAD_DESTINATION: "BAD_DESTINATION"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseAgentState}
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseAgentState
 */
Terrasoft.FinesseAgentState = Terrasoft.integration.telephony.finesse.FinesseAgentState;

/**
   * @enum
   * BOSH connection statuses.
   */
Terrasoft.integration.telephony.finesse.BoshConnectionStatus = {
	/** Loaded. */
	LOADED: 0,
	/** Connecting. */
	CONNECTING: 1,
	/** Connected. */
	CONNECTED: 2,
	/** Disconnected. */
	DISCONNECTED: 3,
	/** Disconnecting. */
	DISCONNECTING: 4,
	/** Reconnecting. */
	RECONNECTING: 5,
	/** Unloaded. */
	UNLOADING: 6
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.BoshConnectionStatus}
 * @inheritdoc Terrasoft.integration.telephony.finesse.BoshConnectionStatus
 */
Terrasoft.BoshConnectionStatus = Terrasoft.integration.telephony.finesse.BoshConnectionStatus;

/**
   * @enum
   * Types of Finesse errors.
   */
Terrasoft.integration.telephony.finesse.FinesseErrorType = {
	/** The user line is busy. */
	DEVICE_BUSY: "Device Busy",
	/** Invalid extension number specified. */
	INVALID_DEVICE: "Invalid Device"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseErrorType}
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseErrorType
 */
Terrasoft.FinesseErrorType = Terrasoft.integration.telephony.finesse.FinesseErrorType;

/**
   * @enum
   * Types of Finesse calls.
   */
Terrasoft.integration.telephony.finesse.FinesseCallType = {
	/** Incoming call, distributed through an automatic call distribution (ACD). */
	ACD_IN: "ACD_IN",
	/** Transferred incoming call, distributed through ACD. */
	PREROUTE_ACD_IN: "PREROUTE_ACD_IN",
	/** An incoming call to the agent. */
	PREROUTE_DIRECT_AGENT: "PREROUTE_DIRECT_AGENT",
	/** Transferred call */
	TRANSFER: "TRANSFER",
	/** Incoming call.*/
	OTHER_IN: "OTHER_IN",
	/** Outgoing call.*/
	OUT: "OUT",
	/** Internal agent call. */
	AGENT_INSIDE: "AGENT_INSIDE",
	/** Consultation call. */
	CONSULT: "CONSULT",
	/** Translated consultation call. */
	CONSULT_OFFERED: "CONSULT_OFFERED",
	/** Conference call. */
	CONFERENCE: "CONFERENCE",
	/**  supervisor connection call. */
	SUPERVISOR_MONITOR: "SUPERVISOR_MONITOR",
	/** Outgoing call.*/
	OUTBOUND: "OUTBOUND",
	/** Outgoing call with a preview. */
	OUTBOUND_PREVIEW: "OUTBOUND_PREVIEW"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseCallType}
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseCallType
 */
Terrasoft.FinesseCallType = Terrasoft.integration.telephony.finesse.FinesseCallType;

/**
 * @enum
 * Reasons of Finesse agent statuses.
 */
Terrasoft.integration.telephony.finesse.FinesseAgentStateReason = {
	UNKNOWN: "-1",
	ONBREAK: "7"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.finesse.FinesseAgentStateReason}
 * @inheritdoc Terrasoft.integration.telephony.finesse.FinesseAgentStateReason
 */
Terrasoft.FinesseAgentStateReason = Terrasoft.integration.telephony.finesse.FinesseAgentStateReason;
