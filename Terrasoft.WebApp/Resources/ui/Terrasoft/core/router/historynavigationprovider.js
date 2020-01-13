Ext.ns("Terrasoft.router");

/**
 * A basic provider class for working with a browser history that supports the HTML5 History API.
 */
Ext.define("Terrasoft.router.HistoryNavigationProvider", {
	extend: "Terrasoft.BaseNavigationProvider",
	alternateClassName: "Terrasoft.HistoryNavigationProvider",

	/**
	 * Adds a new state to the browser history and changes the client part of the address in the browser.
	 * @param {Object} stateObj (optional) Any JSON object that can reflect the state.
	 * @param {String} pageTitle (optional) The title of the browser page for the specified state.
	 * @param {String} hash Client hash part of the address.
	 */
	pushState: function(stateObj, pageTitle, hash) {
		this.context.history.pushState(stateObj, pageTitle, this.getFullUrl(hash));
		this.doStateChanged();
	},

	/**
	 * Updates the current state and changes the client part of the address in the browser.
	 * @param {Object} stateObj (optional) Any JSON object that can reflect the state.
	 * @param {String} pageTitle (optional) The title of the browser page for the specified state.
	 * @param {String} hash Client hash part of the address.
	 */
	replaceState: function(stateObj, pageTitle, hash) {
		this.context.history.replaceState(stateObj, pageTitle, this.getFullUrl(hash));
		this.doStateChanged();
	},

	/**
	 * @override Terrasoft.BaseNavigationProvider#back
	 * @inheritdoc
	 */
	back: function() {
		this.go(-1);
	},

	/**
	 * @override Terrasoft.BaseNavigationProvider#forward
	 * @inheritdoc
	 */
	forward: function() {
		this.go(1);
	},

	/**
	 * @override Terrasoft.BaseNavigationProvider#go
	 * @inheritdoc
	 */
	go: function(delta) {
		this.context.history.go(delta);
	},

	/**
	 * @override Terrasoft.BaseNavigationProvider#onPopState
	 * @inheritdoc
	 */
	onPopState: function() {
		this.doStateChanged();
	}
});
