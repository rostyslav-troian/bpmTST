/**
 * Represents a CompleteExecutingRequest's response.
 */
Ext.define("Terrasoft.process.CompleteExecutingResponse", {
	alternateClassName: "Terrasoft.CompleteExecutingResponse",
	extend: "Terrasoft.BaseProcessResponse",

	//region Properties: Public

	/**
	 * Returns count of pending user task pages.
	 */
	waitingUserTaskCount: 0

	//endregion

});
