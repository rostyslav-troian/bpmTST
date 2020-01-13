Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");
Ext.ns("Terrasoft.integration.telephony.enums");

/** @enum
  * Directions of the call. */
Terrasoft.integration.telephony.enums.CallDirection = {
	/** Undefined. */
	UNKNOWN: "c072be2c-3d82-4468-9d4a-6db47d1f4cca",
	/** Outgoing. */
	OUT: "53f71b5f-7e17-4cf5-bf14-6a59212db422",
	/** Incoming. */
	IN: "1d96a65f-2131-4916-8825-2d142b1000b2"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.CallDirection}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.CallDirection
 */
Terrasoft.CallDirection = Terrasoft.integration.telephony.enums.CallDirection;

/** @enum
  * Available operations with the call. */
Terrasoft.integration.telephony.enums.CallFeaturesSet = {
	/** Nothing. */
	CAN_NOTHING: 0,
	/** Call back. */
	CAN_RECALL: 0x1,
	/** Dial the number. */
	CAN_DIAL: 0x2,
	/** Reply. */
	CAN_ANSWER: 0x4,
	/** Finish. */
	CAN_DROP: 0x8,
	/** Put on hold. */
	CAN_HOLD: 0x10,
	/** Take from hold. */
	CAN_UNHOLD: 0x20,
	/** To prepare for transfer. */
	CAN_SETUP_TRANSFER: 0x40,
	/** End call transfer. */
	CAN_COMPLETE_TRANSFER: 0x80,
	/** Make an unconditional (blind) transfer. */
	CAN_BLIND_TRANSFER: 0x100,
	/** Make a consultation call. */
	CAN_MAKE_CONSULT_CALL: 0x200,
	/** Send DTMF signal. */
	CAN_DTMF: 0x400,
	/** Transfer video. */
	CAN_VIDEO: 0x800,
	/** Mute. */
	CAN_MUTE: 0x1000
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.CallFeaturesSet}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.CallFeaturesSet
 */
Terrasoft.CallFeaturesSet = Terrasoft.integration.telephony.enums.CallFeaturesSet;

/** @enum
  * Available operations with the telephony agent. */
Terrasoft.integration.telephony.enums.AgentFeaturesSet = {
	/** Nothing. */
	CAN_NOTHING: 0,
	/** Set the state of postprocessing. */
	CAN_WRAP_UP: 0x1,
	/** Change and display the status of the user in the Call Center. */
	HAS_CALL_CENTRE_MODE: 0x2,
	/** Receive call records. */
	CAN_GET_CALL_RECORDS: 0x4
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.AgentFeaturesSet}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.AgentFeaturesSet
 */
Terrasoft.AgentFeaturesSet = Terrasoft.integration.telephony.enums.AgentFeaturesSet;

/** @enum
  * Call statuses. */
Terrasoft.integration.telephony.enums.GeneralizedCallState = {
	/** Inactive. */
	NONE: 0,
	/** Incoming/outgoing call. */
	ALERTING: 1,
	/** Connected. */
	CONNECTED: 2,
	/** On hold. */
	HOLDED: 3,
	/** Conference. */
	CONFERENCED: 4,
	/** Unknown. */
	UNKNOWN: 5,
	/** Busy. */
	BUSY: 6
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.GeneralizedCallState}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.GeneralizedCallState
 */
Terrasoft.GeneralizedCallState = Terrasoft.integration.telephony.enums.GeneralizedCallState;

/** @enum
  * Telephony commands. */
Terrasoft.integration.telephony.enums.CtiCommand = {
	/** Load the message library. */
	LOAD_LIBRARY: "LoadLibrary",
	/** Open the connection. */
	OPEN_CONNECTION: "OpenConnection",
	/** Create a client connection. */
	REGISTER_CONNECTION_SESSION: "RegisterConnectionSession",
	/** Close the connection. */
	CLOSE_CONNECTION: "CloseConnection",
	/** Call. */
	MAKE_CALL: "MakeCall",
	/** To pick up the phone. */
	HOOKUP: "Hookup",
	/** Answer the call. */
	ANSWER_CALL: "AnswerCall",
	/** Put the call on hold or take it off. */
	HOLD_CALL: "HoldCall",
	/** End the call. */
	DROP_CALL: "DropCall",
	/** Prepare the call for translation. */
	SETUP_TRANSFER_CALL: "SetupTransferCall",
	/** Make a consultation call. */
	MAKE_CONSULT_CALL: "MakeConsultCall",
	/** Transfer the call (conditionally). */
	TRANSFER_CALL: "TransferCall",
	/** Cancel conditional call transfer. */
	CANCEL_TRANSFER: "CancelTransfer",
	/** Translate the call (unconditionally). */
	BLIND_TRANSFER_CALL: "BlindTransferCall",
	/** Set Do Not Disturb. */
	SET_DND: "SetDnd",
	/** Request line status. */
	QUERY_LINE_STATE: "QueryLineState",
	/** Request a collection of active calls. */
	QUERY_ACTIVE_CALL_SNAPSHOT: "QueryActiveCallSnapshot",
	/** Set the state to the operator. */
	SET_MSG_USER_STATE: "SetMsgUserState",
	/** Request the status of the operator. */
	QUERY_MSG_USER_STATE: "QueryMsgUserState",
	/** Execute a specific message library command. */
	LIBRARY_SPECIFIC_SERVICE: "LibrarySpecificService",
	/** Send a low-level message. */
	POST_RAW_DATA: "PostRawData",
	/** Send the signal to Dtmf. */
	SEND_DTMF: "SendDtmf",
	/** Set the state of postprocessing. */
	SET_WRAP_UP_USER_STATE: "SetWrapUpUserState"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.CtiCommand}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.CtiCommand
 */
Terrasoft.CtiCommand = Terrasoft.integration.telephony.enums.CtiCommand;

/** @enum
  * The executor type of the message service command. */
Terrasoft.integration.telephony.enums.MessagingCommandExecutorType = {
	/** No. */
	NONE: "",
	/** Call. */
	CALL: "Terrasoft.Messaging.Common.Call, Terrasoft.Messaging.Common"
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.MessagingCommandExecutorType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.MessagingCommandExecutorType
 */
Terrasoft.MessagingCommandExecutorType = Terrasoft.integration.telephony.enums.MessagingCommandExecutorType;

/** @enum
  * Event codes of the telephony message service. */
Terrasoft.integration.telephony.enums.MsgEventType = {
	/** The type of the event is not defined. */
	NONE: 0,
	/** The message library is initialized. */
	LIBRARY_INITIALIZED: 1,
	/** Connection to the telephone line is created. */
	CONNECTION_CREATED: 2,
	/** Message server level error. */
	ERROR: 3,
	/** The message with the result of the command execution. */
	COMMAND_INFO: 4,
	/** A new incoming call. */
	RING_STARTED: 5,
	/** The call ended. */
	RING_FINISHED: 6,
	/** Commutation started. */
	COMMUTATION_STARTED: 7,
	/** The call is put on hold. */
	PUT_HOLD_ACTION: 8,
	/** The call is no longer on hold. */
	END_HOLD_ACTION: 9,
	/** Updating the list of active calls. */
	ACTIVE_CALL_SNAPSHOT: 10,
	/** Change the status of the line. */
	LINE_STATE_CHANGED: 11,
	/** Change the status of the agent. */
	AGENT_STATE_CHANGED: 12,
	/** The subscriber is busy. */
	ABONENT_BUSY: 13,
	/** Disconnected. */
	DISCONNECTED: 14,
	/** The call is saved in the database. */
	CALL_SAVED_IN_DB: 15,
	/** Low-level message. */
	RAW_DATA: 16,
	/** The call data has changed (correspondence to the old call is made by databaseUId). */
	CALL_INFO_CHANGED: 17,
	/** Dtmf characters sent. */
	DTMF_ENTERED: 18
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.MsgEventType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.MsgEventType
 */
Terrasoft.MsgEventType = Terrasoft.integration.telephony.enums.MsgEventType;

/** @enum
  * Codes for the types of telephony errors. */
Terrasoft.integration.telephony.enums.MsgErrorType = {
	/** The general error. */
	GENERAL_ERROR: 0,
	/** Loading the integration library error . */
	LOAD_LIBRARY_ERROR: 1,
	/** Opening connection error. */
	OPEN_CONNECTION_ERROR: 2,
	/** Error while executing the command. */
	COMMAND_ERROR: 3,
	/** The command is not supported. */
	COMMAND_NOT_IMPLEMENTED_ERROR: 4,
	/** Call center is unavailable. */
	CALL_CENTRE_NOT_AVAILABLE_ERROR: 5,
	/** Authentication failed. */
	AUTHENTICATION_ERROR: 6,
	/** Error saving call to database. */
	CALL_SAVING_ERROR: 7,
	/** Event subscriber error. */
	EVENT_HANDLER_ERROR: 8,
	/** Connection parameter error. */
	CONNECTION_CONFIG_ERROR: 9
};

/**
 * short notation for {@link Terrasoft.integration.telephony.enums.MsgErrorType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.integration.telephony.enums.MsgErrorType
 */
Terrasoft.MsgErrorType = Terrasoft.integration.telephony.enums.MsgErrorType;