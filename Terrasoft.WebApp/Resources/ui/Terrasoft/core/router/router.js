Ext.ns("Terrasoft.router");

/**
 * Navigator class.
 */
Ext.define("Terrasoft.router.Router", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.Router",
	singleton: true,

	/**
	 * A flag that overrides the launch of a state change event.
	 * Used in methods {@link #replaceState}, {@link #pushState}
	 * @private
	 * @type {Boolean}
	 */
	silentMode: false,

	/**
	 * A reference to the provider's object to work with the history of the browser.
	 * Depending on the browser, the {@link Terrasoft.HistoryNavigationProvider} -
	 * if the browser is not IE family otherwise - {@link Terrasoft.HashNavigationProvider}.
	 * @private
	 * @type {Terrasoft.BaseNavigationProvider}
	 */
	provider: null,

	/**
	 * Context of the router.
	 * @private
	 * @type {Object}
	 */
	context: window,

	/**
	 * Default navigation provider.
	 * @private
	 */
	_defaultProviderClassName: "Terrasoft.HistoryNavigationProvider",

	/**
	 * Navigation provider for ie or edge.
	 * @private
	 */
	_ieFamilyProviderClassName: "Terrasoft.IeFamilyHistoryNavigationProvider",

	/**
	 * Creates and initializes an object {@link Terrasoft.Router}.
	 */
	constructor: function() {
		this.callParent(arguments);
		/**
		 * @event stateChanged
		 * @param {String} hash Client hash of the page address.
		 * @param {Terrasoft.Router} Link to the router.
		 * The event is triggered when the client address is changed.
		 */
		this.addEvents("stateChanged");
		this.initProvider();
	},

	/**
	 * Creates and initializes the required provider to work with the history of the browser.
	 * @private
	 */
	initProvider: function() {
		var providerClassName = this._getProviderClassName();
		var provider = Ext.create(providerClassName, {
			context: this.context
		});
		provider.on("providerStateChanged", this.onProviderStateChanged, this);
		this.provider = provider;
	},

	/**
	 * Gets class name of the navigation provider.
	 * @private
	 * @return {string} Navigation provider class name.
	 */
	_getProviderClassName: function() {
		return Ext.isIEOrEdge ? this._ieFamilyProviderClassName : this._defaultProviderClassName;
	},

	/**
	 * Handler of the provider state change.
	 * @private
	 * @param {String} hash Client hash part of the address.
	 */
	onProviderStateChanged: function(hash) {
		if (Ext.isEmpty(hash)) {
			this.warning("router: Empty navigation token");
		}
		if (this.silentMode === true) {
			this.silentMode = false;
			return;
		}
		this.fireEvent("stateChanged", hash, this);
	},

	/**
	 * Returns the current hash of the URL.
	 * @return {String} The current hash of the URL.
	 */
	getHash: function() {
		return this.provider.getHash();
	},

	/**
	 * Adds a new state to the browser history and changes the client part of the address in the browser.
	 * @param {Object} stateObj (optional) Any JSON object that can reflect the state.
	 * @param {String} pageTitle (optional) The title of the browser page for the specified state.
	 * @param {String} hash Client hash part of the address.
	 * @param {String} silent A flag indicating that the router does not start state change events.
	 */
	pushState: function(stateObj, pageTitle, hash, silent) {
		if (pageTitle) {
			throw new Terrasoft.NotImplementedException({
				message: Terrasoft.Resources.Router.PageTitleNotImplementedMessage
			});
		}
		// BrowserSupport: IE8, IE9 Explicit null transfer to pushState because the method pushState

		// of the history.js library does not change the state when the first parameter is passed undefined

		if (stateObj === undefined) {
			stateObj = {};
		}
		this.silentMode = (silent === true);
		this.provider.pushState(stateObj, pageTitle, hash);
	},

	/**
	 * Updates the current state and changes the client part of the address in the browser.
	 * @param {Object} stateObj (optional) Any JSON object that can reflect the state.
	 * @param {String} pageTitle (optional) The title of the browser page for the specified state.
	 * @param {String} hash Client hash part of the address.
	 * @param {Boolean} silent A flag indicating that the router does not start state change events.
	 */
	replaceState: function(stateObj, pageTitle, hash, silent) {
		if (pageTitle) {
			throw new Terrasoft.NotImplementedException({
				message: Terrasoft.Resources.Router.PageTitleNotImplementedMessage
			});
		}
		// BrowserSupport: IE8, IE9 Explicit null transfer to pushState because the method pushState

		// of the history.js library does not change the state when the first parameter is passed undefined

		if (stateObj === undefined) {
			stateObj = {};
		}
		this.silentMode = (silent === true);
		this.provider.replaceState(stateObj, pageTitle, hash);
	},

	/**
	 * Sets a link to the window in the context of which Router should work.
	 * @deprecated
	 * @param {Object} context Window of the context.
	 */
	setContext: function(context) {
		if (this.context !== context) {
			var provider = this.provider;
			if ("onpopstate" in context) {
				provider.un("popstate", provider.doStateChanged, provider);
				provider.subscribe(context, "popstate", provider.doStateChanged, provider);
			} else if ("onhashchange" in context) {
				provider.un("hashchange", provider.doStateChanged, provider);
				provider.subscribe(context, "hashchange", provider.doStateChanged, provider);
			}
			this.context = provider.context = context;
		}
	},

	/**
	 * Goes back on the history of the browser - you need to redefine for a specific provider.
	 */
	back: function() {
		this.provider.back();
	},

	/**
	 * Moves forward in browser history.
	 */
	forward: function() {
		this.provider.go(1);
	},

	/**
  * Goes to the delta steps of the browser history. If the value of delta is negative - then go to delta
  * steps backwards, otherwise forward.
  * @param {Number} delta Number of steps
  */
	go: function(delta) {
		this.provider.go(delta);
	},

	/**
	 * Returns the current state.
	 * @return {Object} Current state.
	 */
	getState: function() {
		return this.context.history.state;
	}

});
