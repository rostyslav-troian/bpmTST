/**
 * Used to register process execution data created when processes started.
 * Registered process execution data used to open process pages etc.
 */
Ext.define("Terrasoft.Core.Process.ExecutionDataCollector", {
	alternateClassName: "Terrasoft.ProcessExecutionDataCollector",
	extend: "Terrasoft.BaseObject",
	singleton: true,

	// region Fields: Private

	_buffer: null,

	//endregion

	// region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents("executionDataReady");
		this._buffer = [];
	},

	//endregion

	// region Methods: Private

	/**
	 * @private
	 * @param item
	 * @private
	 */
	_addItem: function(item) {
		if (this.hasListener("executionDataReady")) {
			this.fireEvent("executionDataReady", item);
		} else {
			this._buffer.push(item);
		}
	},

	//endregion

	// region Methods: Private

	/**
	 * Used to register process execution data.
	 * @param {Array} executionData Process execution data
	 */
	add: function(executionData) {
		if (!executionData) {
			return;
		}
		const item = {executionData: executionData};
		this._addItem(item);
	},

	/**
	 * Used internally to get all published but not processed items.
	 */
	flushBufferedItems: function() {
		const items = this._buffer.splice(0);
		let item;
		while ((item = items.pop())) {
			this._addItem(item);
		}
	}

	//endregion

});
