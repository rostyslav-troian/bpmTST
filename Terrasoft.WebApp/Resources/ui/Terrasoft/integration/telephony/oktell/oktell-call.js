/**
 * The class of the telephony call of the oktell connector.
 */

Ext.define("Terrasoft.integration.telephony.OktellCall", {
	extend: "Terrasoft.integration.telephony.Call",
	alternateClassName: "Terrasoft.OktellCall",

	/**
  * The identifier of the chain of call commutations/sessions.
  * @type {String}
  */
	chainId: ""
});
