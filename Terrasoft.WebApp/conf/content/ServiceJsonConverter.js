Terrasoft.configuration.Structures["ServiceJsonConverter"] = {innerHierarchyStack: ["ServiceJsonConverter"]};
define("ServiceJsonConverter", [], function() {

	Ext.define("Terrasoft.services.ServiceJsonConverter", {
		alternateClassName: "Terrasoft.ServiceJsonConverter",

		// region Properties: Protected

		/**
		 * Authentication section name.
		 * @protected
		 * @type {String}
		 */
		sectionAuth: "authInfo",

		/**
		 * Cookies section name.
		 * @protected
		 * @type {String}
		 */
		sectionCookie: "cookie",

		/**
		 * Data section name.
		 * @protected
		 * @type {String}
		 */
		sectionData: "body",

		/**
		 * Headers section name.
		 * @protected
		 * @type {String}
		 */
		sectionHeader: "header",

		/**
		 * Query section name.
		 * @protected
		 * @type {String}
		 */
		sectionQuery: "query",

		/**
		 * Uri section name.
		 * @protected
		 * @type {String}
		 */
		sectionUri: "uri",

		/**
		 * Info section name.
		 * @protected
		 * @type {String}
		 */
		sectionInfo: "info",

		/**
		 * Method property name.
		 * @protected
		 * @type {String}
		 */
		sectionMethod: "method",

		/**
		 * Url property name.
		 * @protected
		 * @type {String}
		 */
		sectionUrl: "url",

		/**
		 * Request property name.
		 * @protected
		 * @type {String}
		 */
		sectionRequest: "request",

		/**
		 * Response property name.
		 * @protected
		 * @type {String}
		 */
		sectionResponse: "response",

		/**
		 * Apply UriJsonConverted while converting.
		 * @type {Boolean}
		 * @protected
		 */
		parseUriParameters: true,

		// endregion

		//region Constructors: Public

		constructor: function(config) {
			Ext.merge(this, config);
		},

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_setAuthType: function(json, type) {
			json[this.sectionAuth] = {
				authType: type
			};
		},

		// endregion

		// region Methods: Protected

		/**
		 * Returns true if string is enclosed in quotes.
		 * @param {String} value.
		 * @returns {Boolean}
		 * @protected
		 */
		isQuotesEnlosed: function(value) {
			return (value.slice(-1) === "'" && value[0] === "'") || (value.slice(-1) === "\"" && value[0] === "\"");
		},

		/**
		 * Trims quotes from string.
		 * @param {String} value.
		 * @returns {String} trimmed from quotes string.
		 * @protected
		 */
		trimQuotes: function(value) {
			return this.isQuotesEnlosed(value) ? value.slice(1, -1) : value;
		},

		// endregion

		// region Methods: Public

		convert: Terrasoft.emptyFn,

		/**
		 * Detects authentification type based on header.
		 * @param {Object} json Result object.
		 */
		detectAuthType: function(json) {
			this._setAuthType(json, Terrasoft.services.enums.AuthType.None);
			if (json[this.sectionRequest][this.sectionHeader] &&
					json[this.sectionRequest][this.sectionHeader].Authorization) {
				const authHeader = json[this.sectionRequest][this.sectionHeader].Authorization;
				if (authHeader.indexOf("Basic") === 0) {
					this._setAuthType(json, Terrasoft.services.enums.AuthType.Basic);
					delete json[this.sectionRequest][this.sectionHeader].Authorization;
					if (Ext.Object.isEmpty(json[this.sectionRequest][this.sectionHeader])) {
						delete json[this.sectionRequest][this.sectionHeader];
					}
				}
			}
		},

		/**
		 * Parses uri parameters if nessesary.
		 * @param {Object} json Result object.
		 */
		doParseUriParameters: function(json) {
			if (this.parseUriParameters) {
				const uriConverter = new Terrasoft.UriJsonConverter({
					sectionUrl: this.sectionUrl,
					sectionQuery: this.sectionQuery,
					sectionUri: this.sectionUri,
					sectionRequest: this.sectionRequest
				});
				const fromUri = uriConverter.convert(json[this.sectionUrl]);
				Ext.merge(json, fromUri);
			}
		}

		// endregion

	});

	return Terrasoft.ServiceJsonConverter;

});


