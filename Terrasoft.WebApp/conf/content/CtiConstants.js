Terrasoft.configuration.Structures["CtiConstants"] = {innerHierarchyStack: ["CtiConstants"]};
define("CtiConstants", ["ext-base", "terrasoft", "CtiConstantsResources"],
	function(Ext, Terrasoft, resources) {

		/**
		 * #### ############.
		 * @type {String}
		 */
		var communicationCodes = {
			/**
			 * #######.
			 */
			Phone: "Phone"
		};

		var callDirection = {
			Incoming: "1d96a65f-2131-4916-8825-2d142b1000b2",
			Outgoing: "53f71b5f-7e17-4cf5-bf14-6a59212db422",
			NotDefined: "c072be2c-3d82-4468-9d4a-6db47d1f4cca"
		};

		/**
		 * ######## ############## #######.
		 * @type {Object}
		 */
		var timeScale = {
			/** ########## ########### # #######.*/
			MillisecondsInSecond: 1000,
			/** ########## ###### # ######.*/
			SecondsInMinute: 60,
			/** ########### ########### ##### # ##### #######.*/
			MinTwoDigitNumber: 10
		};

		/**
		 * ######## ############## ############ #########.
		 * @type {Object}
		 */
		var talkDuration = {
			/** ####### ########## ############ #########.*/
			RefreshRate: 500
		};

		/** @enum
		 * #### ################## ######### #########.
		 */
		var subscriberTypes = {
			/** ####### */
			Contact: "Contact",
			/** ########## */
			Account: "Account",
			/** ######### */
			Employee: "Employee"
		};

		/**
		 * ########## #######, ####### ####### ####### ## ###### ####### ##### ### ############# ########.
		 * @type {Number}
		 */
		var identificationMaxRowCount = 20;

		/**
		 * ########## ######## # #### ##### ######, ####### # ####### ##### ################ ############# ## ######.
		 * @type {Number}
		 */
		var identificationMinSymbolCount = 3;

		/**
		 * ########## ######### ########, ######### ##### DTMF #####, ####### ##### ##########.
		 * @type {Number}
		 */
		var dtmfMaxDisplayedDigits = 20;

		/**
		 * ############# ######### ######### ####### ####### ##########.
		 * @type {String}
		 */
		var callRecordsContextMessageId = "CallSectionGridRowCallRecords";

		/**
		 * @enum
		 * ### ######.
		 */
		var callType = {
			/** ## #########. */
			DEFAULT: "default",
			/** ########. */
			INCOMING: "incoming",
			/** #########. */
			OUTGOING: "outgoing",
			/** ###########. */
			MISSED: "missed"
		};

		/**
		 * ############# ###### ######### ############ ## #########.
		 * @type {String}
		 */
		var defaultSysMsgUserStateIconId = "CED32969-C1CB-4BF6-9AA6-5401F2404AA9";

		return {
			CallType: callType,
			TalkDuration: talkDuration,
			TimeScale: timeScale,
			CommunicationCodes: communicationCodes,
			CallDirection: callDirection,
			SubscriberTypes: subscriberTypes,
			LocalizableStrings: resources.localizableStrings,
			IdentificationMaxRowCount: identificationMaxRowCount,
			IdentificationMinSymbolCount: identificationMinSymbolCount,
			DtmfMaxDisplayedDigits: dtmfMaxDisplayedDigits,
			CallRecordsContextMessageId: callRecordsContextMessageId,
			DefaultSysMsgUserStateIconId: defaultSysMsgUserStateIconId
		};
	});


