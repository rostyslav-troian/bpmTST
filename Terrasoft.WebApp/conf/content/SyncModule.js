Terrasoft.configuration.Structures["SyncModule"] = {innerHierarchyStack: ["SyncModule"]};
define("SyncModule", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	/**
	 * ############## ######.
	 */
	function init() {
		Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, onChannelMessage, this);
	}

	/**
	 * ############ ######### ########## ###### #########.
	 * @protected
	 * @param {Object} scope ######## ##########.
	 * @param {Object} message ###### #########.
	 */
	function onChannelMessage(scope, message) {
		if (Ext.isEmpty(message) || Ext.isEmpty(window.console)) {
			return;
		}
		var header = message.Header;
		if (Ext.isEmpty(header) || (header.Sender !== "SyncMsgLogger")) {
			return;
		}
		var body = message.Body;
		switch (header.BodyTypeName) {
			case "Info":
				window.console.log(body);
				break;
			case "Error":
				window.console.error(body);
				break;
			default:
				break;
		}
	}

	return {
		init: init
	};
});


