Terrasoft.configuration.Structures["ProcessExecutionQueue"] = {innerHierarchyStack: ["ProcessExecutionQueue"]};
define("ProcessExecutionQueue", ["ext-base"], function(Ext) {
	Ext.define("Terrasoft.configuration.ProcessExecutionQueue", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ProcessExecutionQueue",

		/**
		 * Element execution states array.
		 * @private
		 * @type {Array}
		 */
		queue: null,

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event enqueued
				 * Fires when item was added to queue.
				 */
				"enqueued",

				/**
				 * @event dequeued
				 * Fires when item was removed from queue.
				 */
				"dequeued"
			);
			this.queue = [];
		},

		/**
		 * Adds item to the end of the queue.
		 * @param {Object} item Process element execution data.
		 * @param [options] Options.
		 * @param [options.silent] Do not trigger enqueued event.
		 */
		enqueue: function(item, options) {
			if (!Ext.isDefined(item)) {
				return;
			}
			this.queue.push(item);
			const isSilent = options ? options.silent : false;
			if (!isSilent) {
				this.fireEvent("enqueued", item);
			}
		},

		_pop: function(predicate) {
			const queueLength = this.queue.length;
			for (let i = queueLength - 1; i >= 0; i --) {
				const item = this.queue[i];
				if (predicate(item)) {
					this.queue.splice(i, queueLength - i);
					return item;
				}
			}
			return null;
		},

		/**
		 * Removes the last item from queue and returns that item.
		 * @param {Function} predicate Item predicate. If set, returns matching item and removes
		 * all next items from queue. Does not modify queue if no matches found.
		 * @return {Object} Process element execution data.
		 */
		dequeue: function(predicate) {
			const item = Ext.isFunction(predicate)
				? this._pop(predicate)
				: this.queue.pop();
			if (item) {
				this.fireEvent("dequeued", item);
				return item;
			}
			return null;
		}
	});

	return {};
});


