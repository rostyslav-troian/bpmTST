Ext.ns("Terrasoft.DeferredExecution");

/**
 * Used to defer functions invocation to moment when condition, specified in {@link #allowExecutionPredicate}, will be
 * fulfilled.
 */
Ext.define("Terrasoft.DeferredExecution.Dispatcher", {

	extend: "Terrasoft.BaseObject",

	// Region Fields: Private

	_waitingContexts: null,
	_deferredInvokeHandle: null,

	// endregion

	// Region Fields: Protected

	/**
	 * @protected
	 */
	allowExecutionPredicate: null,

	// endregion

	// Region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 */
	constructor: function() {
		this.callParent(arguments);
		this._waitingContexts = [];
		if (!this.allowExecutionPredicate){
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "allowExecutionPredicate"
			});
		}
	},

	// endregion

	// Region Methods: Private

	_tryInvoke: function() {
		this._deferredInvokeHandle = null;
		let deferredFunction;
		while(this.allowExecutionPredicate() && (deferredFunction = this._waitingContexts.shift())) {
			try {
				deferredFunction.invoke();
			} catch (e) {
				this.error(e);
			}
		}
	},

	_cancel: function(deferredFunction) {
		const index = this._waitingContexts.indexOf(deferredFunction);
		if (index > -1) {
			this._waitingContexts.splice(index, 1);
		}
	},

	// endregion

	// Region Methods: Public

	/**
	 * Registers function to deferred execution. Its will be invoked right after current method call or after
	 * next {@link #notify} method call when condition, provided during creation of current dispatcher instance,
	 * will be satisfied.
	 * @param {Function} callback Function to invoke.
	 * @param {Object} scope Scope.
	 * @param {Array} args Invocation arguments.
	 * @returns {Terrasoft.DeferredExecution.Function} Created deferred function instance.
	 */
	register: function(callback, scope, ...args) {
		const deferredFunction = Ext.create("Terrasoft.DeferredExecution.Function", {
			scope: scope,
			arguments: args,
			callback: callback
		});
		deferredFunction.on("canceled", () => this._cancel(deferredFunction));
		this._waitingContexts.push(deferredFunction);
		this.notify();
		return deferredFunction;
	},

	/**
	 * Creates deferred task for invocation of all registered functions.
	 */
	notify: function() {
		if (this._waitingContexts.length < 1) {
			return;
		}
		if (!this._deferredInvokeHandle) {
			this._deferredInvokeHandle = Terrasoft.defer(() => this._tryInvoke());
		}
	}

	// endregion

});
