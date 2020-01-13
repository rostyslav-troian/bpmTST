Ext.ns("Terrasoft.utils.sso");

/**
 * Single sign on utilities class.
 * Provides methods for single sign on sessions initialization.
 * @alias Terrasoft.SsoUtils
 */
Ext.define("Terrasoft.utils.SsoUtils", {
	alternateClassName: "Terrasoft.SsoUtils",
	singleton: true,

	/**
	 * Avaliable single sign on logout reasons.
	 * @private
	 * @type {Array}
	 */
	_logoutReasons: [{
			"code": "unauthorized",
			"isError": true
		}, {
			"code": "logout"
		}, {
			"code": "samlprovidererror",
			"isError": true
		}],

	/**
	 * Use single sign on request parameter name.
	 * @private
	 * @type {String}
	 */
	_useSsoParameterName: "use_sso",

	/**
	 * Start single sign on request parameter name.
	 * @private
	 * @type {String}
	 */
	_startSsoParameterName: "start_sso",

	/**
	 * Return url hash part request parameter name.
	 * @private
	 * @type {String}
	 */
	_returnUrlHashParameterName: "ReturnUrlHash",

	/**
	 * Single sign out reason cookie name.
	 * @private
	 * @type {String}
	 */
	_ssoLogoutCookieName: "SsoLogout",

	/**
	 * Single sign on requested cookie name.
	 * @private
	 * @type {String}
	 */
	_ssoLoginCookieName: "SsoRequested",

	/**
	 * Single sign on session id cookie name.
	 * @private
	 * @type {String}
	 */
	_ssoSessionCookieName: "SsoSessionId",

	/**
	 * Checks that request query has parameter.
	 * @private
	 * @param {String} paramName Search parameter name.
	 * @return {Boolean} True if request query has parameter, false otherwise.
	 */
	_hasRequestParam: function(paramName) {
		var location = this.getWindowLocation();
		return Terrasoft.includes(location.search, paramName);
	},

	/**
	 * Returns window location object.
	 * @return {Object} Window location object.
	 */
	getWindowLocation: function() {
		var document = Ext.getDoc();
		return document.dom.location;
	},

	/**
	 * Starts single sign on session.
	 */
	initiateSsoLogin: function() {
		Ext.util.Cookies.clear(this._ssoSessionCookieName);
		var location = this.getWindowLocation();
		if (this.isSsoUnauthorized()) {
			if (location.search != "") {
				location.search = "";
			}
			return;
		}
		if (this.getNeedStartSso()) {
			var hash = location.hash.replace("#", "");
			location.search += Ext.String.format("&{0}=true&{1}={2}", this._startSsoParameterName,
				this._returnUrlHashParameterName, hash);
		}
	},

	/**
	 * Checks is login page was loaded due to single sign out reasons.
	 * @param {Object} [errorInfo] Error infrmation object.
	 * @return {Boolean} True if login page was loaded due to single sign out reasons, false otherwise.
	 */
	isSsoUnauthorized: function(errorInfo) {
		var rawCookie = Ext.util.Cookies.get(this._ssoLogoutCookieName);
		if (!rawCookie) {
			return false;
		}
		var cookie = JSON.parse(rawCookie);
		var reason = Ext.Array.findBy(this._logoutReasons, function(item) {
			return item.code === cookie.reason;
		}, this);
		var result = !Ext.isEmpty(reason);
		if (result && errorInfo && !Ext.isEmpty(reason.isError)) {
			errorInfo.message = cookie.message;
		}
		return result;
	},

	/**
	 * Checks is single sign on session need to be started.
	 * @return {Boolean} True if single sign on session need to be started, false otherwise.
	 */
	getNeedStartSso: function() {
		var hasErrorCodeParam = this._hasRequestParam("ErrorCode");
		if (hasErrorCodeParam) {
			return false;
		}
		var cookie = Ext.util.Cookies.get(this._ssoLoginCookieName);
		var hasUseSsoRequestParam = this._hasRequestParam(this._useSsoParameterName);
		var hasReturnHashRequestParam = this._hasRequestParam(this._returnUrlHashParameterName);
		var hasUseSsoCookie = !Ext.isEmpty(cookie);
		return ((hasUseSsoRequestParam || hasUseSsoCookie) && !hasReturnHashRequestParam);
	},

	/**
	 * @obsolete
	 */
	getNeedShowLogin: function() {
		return this.getNeedShowSsoLogin();
	},
	
	/**
	 * Checks is single sign on provider login page need to be shown.
	 * @return {Boolean} True if single sign on provider login page need to be shown, false otherwise.
	 */
	getNeedShowSsoLogin: function() {
		var needStartSso = this.getNeedStartSso();
		var errorInfo = {};
		var isSsoUnauthorized = this.isSsoUnauthorized(errorInfo);
		if (isSsoUnauthorized && errorInfo.message) {
			Terrasoft.authenticationException = {
				"message": errorInfo.message
			};
		}
		return (needStartSso && !isSsoUnauthorized);
	}

});
