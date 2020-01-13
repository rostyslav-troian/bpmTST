/**
 */
Ext.define("Terrasoft.Designers.PackageDependenciesDiagramViewModel", {
	extend: "Terrasoft.Designers.ProcessSchemaDesignerViewModel",
	alternateClassName: "Terrasoft.PackageDependenciesDiagramViewModel",

	//region Methods: Private

	/**
	 * Handler for event message.
	 * @private
	 * @param {Object} event Event data.
	 */
	onMessageReceived: function(event) {
		var response = Terrasoft.decode(event.browserEvent.data);
		if (response.message === "ReadMetaData") {
			this.loadProcessSchema(response);
		}
	},

	/**
	 * Loads process schema.
	 * @private
	 * @param {Object} response Server response.
	 */
	loadProcessSchema: function(response) {
		var metaData = response.metaData;
		var schema = Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
			metaData: metaData,
			schemaClassName: "Terrasoft.ProcessSchema",
			resources: response.resources
		});
		this.onSchemaLoaded(schema);
	},

	/**
	 * Returns location origin. IE fix.
	 * @private
	 * @return {String}
	 */
	getLocationOrigin: function() {
		var origin = window.location.origin;
		if (!origin) {
			origin = window.location.protocol + "//" + window.location.hostname +
				(window.location.port ? ":" + window.location.port : "");
		}
		return origin;
	},

	/**
	 * Sends to server message of process schema changes.
	 * @param {Object} requestJson Request JSON object.
	 */
	sendMessage: function(requestJson) {
		var message = Terrasoft.encode(requestJson);
		var locationOrigin = this.getLocationOrigin();
		window.parent.postMessage(message, locationOrigin);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#init
	 * @override
	 */
	init: function() {
		Ext.EventManager.addListener(window, "message", this.onMessageReceived, this);
		this.sendMessage({
			message: "GetMetaData"
		});
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onSchemaLoaded
	 * @override
	 */
	onSchemaLoaded: function(schema) {
		this.loadItems(schema);
		this.fireEvent("initialized", this);
	}

	//endregion

});
