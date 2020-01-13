Ext.ns("Terrasoft.router");

/**
 * Class of the basic provider for working with the history of the browser.
 * @abstract
 */
Ext.define("Terrasoft.router.BaseNavigationProvider", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BaseNavigationProvider",

	hashRe: null,

	hashStorage: null,

	/**
	 * The context of the window in which Router works.
	 * @protected
	 * @type {Object}
	 */
	context: null,

	/**
	 * Creates and initializes an object {@link Terrasoft.BaseNavigationProvider}
	 */
	constructor: function() {
		this.callParent(arguments);
		/**
		 * @event providerStateChanged
		 * The event that the provider generates when the client address is changed.
		 */
		this.addEvents("providerStateChanged");
		this.hashRe = /-state\d*/;
		this.hashStorage = {};
		this.init();
	},

	/**
	 * The HTML5 event handler for the History API.
	 * @protected
	 */
	doStateChanged: function() {
		this.fireEvent("providerStateChanged", this.getHash());
	},

	/**
	 * Initializes the provider.
	 * @protected
	 */
	init: function() {
		this.subscribe(this.context, "popstate", this.onPopState, this);
	},

	/**
	 * The method subscribes to browser window events. Implemented because of a bug in ExtJs.
	 * (http://www.sencha.com/forum/showthread.php?260374-EventManager.addListener-does-not-seem-to-work-properly-in-IE10)
	 * @protected
	 */
	subscribe: function(object, event, handler, scope) {
		function listener() {
			handler.apply(scope, arguments);
		}
		if (object.addEventListener) {
			object.addEventListener(event, listener);
		} else {
			object.attachEvent("on" + event, listener);
		}
	},

	/**
	 * Handler of the popstate window event.
	 * @protected
	 * @abstract
	 */
	onPopState: Terrasoft.emptyFn,

	/**
	 * Returns the current client part of the address (hash).
	 * @private
	 * @return {String} Client part of the address.
	 */
	getHash: function() {
		var href = this.context.location.href;
		href = href.replace(this.hashRe, "");
		var pos = href.indexOf("#");
		return (pos >= 0) ? href.substr(pos + 1) : "";
	},

	/**
	 * Returns the full address to the client address.
	 * @protected
	 * @param {String} hash Client hash.
	 * @return {String} Full address.
	 */
	getFullUrl: function(hash) {
		if (_.contains(hash, "#")) {
			return hash;
		}
		var href = this.context.location.href;
		var pos = href.indexOf("#");
		if (hash !== "") {
			hash = "#" + hash;
		}
		var serverUrl = (pos >= 0) ? href.substr(0, pos) : href;
		return serverUrl + hash;
	},

	/**
	 * Goes back on the history of the browser - you need to redefine for a specific provider.
	 * @abstract
	 */
	back: function() {
	},

	/**
	 * Moves forward in browser history.
	 * @abstract
	 */
	forward: function() {
	},

	/**
	 * Goes to the delta steps of the browser history. If the value of delta is negative - then go to delta
	 * steps backwards, otherwise forward.
	 * @abstract
	 * @param {Number} delta Number of steps.
	 */
	go: function() {
	}

});
