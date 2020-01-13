Ext.ns("Terrasoft.DeferredExecution");

/**
 * @enum {String} Terrasoft.DeferredExecution.FunctionStatus.
 * Determines the status of deferred function.
 */
Terrasoft.DeferredExecution.FunctionStatus = {
	Canceled: "canceled",
	Pending: "pending",
	Completed: "completed"
};

/**
 * Used to defer function executing with specified scope and arguments.
 */
Ext.define("Terrasoft.DeferredExecution.Function", {

	mixins: {
		observable: "Ext.util.Observable"
	},

	// Region Fields: Private

	_callback: null,
	_scope: null,
	_arguments: null,
	_canceled: false,
	_status: Terrasoft.DeferredExecution.FunctionStatus.Pending,

	// endregion

	// Region Constructors: Public

	/**
	 *
	 * @param options
	 */
	constructor: function(options) {
		if (!Ext.isFunction(options.callback)) {
			throw new Terrasoft.UnsupportedTypeException({
				argumentName: "callback"
			});
		}
		this.callParent([]);
		this._scope = options.scope;
		this._arguments = options.arguments;
		this._callback = options.callback;
		this.mixins.observable.constructor.call(this);
		this.addEvents(
			/**
			 * @event canceled
			 * Fired when {@link #cancel} method called.
			 */
			"canceled"
		);
	},

	// endregion

	// Region Methods: Public

	/**
	 * Marks current instance as canceled so original function will not be invoked during {@link #invoke} method call.
	 */
	cancel: function() {
		if (this._status !== Terrasoft.DeferredExecution.FunctionStatus.Pending) {
			return;
		}
		this._status = Terrasoft.DeferredExecution.FunctionStatus.Canceled;
		this._canceled = true;
		this.fireEvent("canceled");
	},

	/**
	 * Invokes original function if current instance is not canceled.
	 */
	invoke: function () {
		if (this._status !== Terrasoft.DeferredExecution.FunctionStatus.Pending) {
			return;
		}
		try {
			this._callback.apply(this._scope, this._arguments);
		} finally {
			this._status = Terrasoft.DeferredExecution.FunctionStatus.Completed;
		}
	}

	// endregion

});
