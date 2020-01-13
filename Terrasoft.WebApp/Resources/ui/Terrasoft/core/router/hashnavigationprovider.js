Ext.ns("Terrasoft.router");

/**
 * @deprecated Will be deleted after 7.11.
 * A basic provider class for working with a browser history that does not support the HTML5 History API.
 */
Ext.define("Terrasoft.router.HashNavigationProvider", {
	extend: "Terrasoft.BaseNavigationProvider",
	alternateClassName: "Terrasoft.HashNavigationProvider",

	init: function() {
		this.callParent(arguments);
		this.processHash();
	},

	/**
  * Adds a new state to the browser history and changes the client part of the address in the browser.
  * For this provider, the stateObj and pageTitle parameters are ignored.
  * @param {Object} stateObj (optional) Any JSON object that can reflect the state
  * @param {String} pageTitle (optional) The title of the browser page for the specified state
  * @param {String} hash The client part of the address
  */
	pushState: function(stateObj, pageTitle, hash) {
		var hashIndex = this.hashStorage[hash];
		var nextIndex = hashIndex ? hashIndex + 1 : 1;
		this.hashStorage[hash] = nextIndex;
		var fullHash = "/" + hash + "-state" + nextIndex;
		this.context.history.pushState(stateObj, pageTitle, fullHash);
		this.doStateChanged();
	},

	/**
  * Updates the current state and changes the client part of the address in the browser.
  * For this provider, the stateObj and pageTitle parameters are ignored.
  * @param {Object} stateObj (optional) Any JSON object that can reflect the stat
  * @param {String} pageTitle (optional) The title of the browser page for the specified state
  * @param {String} hash The client part of the address
  */
	replaceState: function(stateObj, pageTitle, hash) {
		var hashIndex = this.hashStorage[hash];
		var nextIndex = hashIndex ? hashIndex : 1;
		var prefix = nextIndex ? "-state" + nextIndex : "";
		var fullHash = "/" + hash + prefix;
		this.context.history.replaceState(stateObj, pageTitle, fullHash);
		this.doStateChanged();
	},

	/**
  * The client part of the address
  * @private
  */
	processHash: function() {
		/*jshint regexp:false */
		var r = /(.*)-state(\d+)$/g;
		/*jshint regexp:true */
		var match = r.exec(this.context.location.hash);
		if (match && match[1] && match[2]) {
			var hash = match[1].replace("#", "");
			this.hashStorage[hash] = match[2] * 1;
		}
	},

	/**
  * Goes back in browser history - overridden for this provider
  * @override
  */
	back: function() {
		this.context.history.back();
	},

	/**
  * Moves forward in browser history
  * @override
  */
	forward: function() {
		this.go(1);
	},

	/**
  * Goes to "delta" of steps of the browser history. If the delta is negative, goes to delta steps
  * back; else goes forward.
  * @override
  * @param {Number} delta Number of steps
  */
	go: function(delta) {
		this.context.history.go(delta);
	}

});
