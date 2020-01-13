Terrasoft.configuration.Structures["EmailConstants"] = {innerHierarchyStack: ["EmailConstants"]};
define("EmailConstants", ["ConfigurationConstants"], function(ConfigurationConstants) {
	/**
	 * @class Terrasoft.configuration.EmailConstants
	 * EmailConstants class provides configuration constants specific to email messages.
	 */
	Ext.define("Terrasoft.configuration.EmailConstants", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.EmailConstants",

		/**
		 * Email message entity schema name.
		 */
		entitySchemaName: "Activity",

		/**
		 * Maximum body string length for display message in communication panel.
		 */
		NumberBodySymbols: 100,

		/**
		 * Email message types.
		 * @enum
		 */
		emailType: {
			/** Incoming. */
			INCOMING: ConfigurationConstants.Activity.MessageType.Incoming,
			/** Outgoing. */
			OUTGOING: ConfigurationConstants.Activity.MessageType.Outgoing,
			/** Draft. */
			DRAFT: Terrasoft.GUID_EMPTY
		},

		/**
		 * Email message actions.
		 * @enum
		 */
		emailAction: {
			/**
			 * Forward action name.
			 * @type {String}
			 */
			Forward: "Forward",
			/**
			 * Reply action name.
			 * @type {String}
			 */
			Reply: "Reply",
			/**
			 * ReplyAll action name.
			 * @type {String}
			 */
			ReplyAll: "ReplyAll"
		},

		/**
		 * Email panel display states.
		 * @enum
		 */
		emailPanelDisplayState: {
			/**
			 * Email panel displays folders content.
			 * @type {Integer}
			 */
			Folders: 0,

			/**
			 * Email panel displays related emails.
			 * @type {Integer}
			 */
			RelatedEmails: 1
		}
	});
	return Ext.create("Terrasoft.EmailConstants");
});


