Terrasoft.configuration.Structures["UriJsonConverter"] = {innerHierarchyStack: ["UriJsonConverter"]};
define("UriJsonConverter", ["ServiceJsonConverter"], function() {
	Ext.define("Terrasoft.services.UriJsonConverter", {
		alternateClassName: "Terrasoft.UriJsonConverter",
		extend: "Terrasoft.ServiceJsonConverter",

		// region Method: Private

		/**
		 * @private
		 */
		_normalizeUri: function(uri) {
			uri = uri.trim();
			const hash = Terrasoft.getUrlHash(uri);
			if (hash) {
				uri = uri.replace(hash, "");
			}
			return uri;
		},

		/**
		 * @private
		 */
		_removeEmptyBracket: function(string) {
			return string.replace(/{}/g, "");
		},

		/**
		 * @private
		 */
		_parseUriParameters: function(uri) {
			const parameters = {};
			var uriParts = uri.split("?");
			var addressPart = uriParts && uriParts[0];
			var brackets = addressPart.replace(/[^{|}]/g, "");
			var unPairedBrackets = this._removeEmptyBracket(brackets);
			if (unPairedBrackets.length === 0) {
				var preparedUri = this._removeEmptyBracket(addressPart);
				var matches = preparedUri.split("?")[0].match(/\{(.*?)\}/g);
				if (matches) {
					matches.forEach(function(parameter) {
						const name = parameter.replace("{", "").replace("}", "");
						parameters[name] = "";
					});
				}
			}
			return parameters;
		},

		/**
		 * @private
		 */
		_parseQueryParameters: function(uri) {
			const parameters = {};
			const matches = uri.match(/(\?|\&)([^=\&{]+)(\=?([^\&]+))?/g);
			if (matches) {
				matches.forEach(function(parameter) {
					const equalSignIndex = parameter.indexOf("=");
					const name = equalSignIndex === -1
						? parameter.substring(1)
						: parameter.substring(1, equalSignIndex);
					const value = parameter.substring(equalSignIndex + 1);
					parameters[name] = equalSignIndex === -1 ? "" : value;
				});
			}
			return parameters;
		},

		// endregion

		// region Methods: Public

		/**
		 * Converts uri to JSON with parameters.
		 * @param uri {String}
		 * @return {Object}
		 */
		convert: function(uri) {
			if (uri) {
				uri = this._normalizeUri(uri);
				const json = {};
				json[this.sectionRequest] = {};
				json[this.sectionRequest][this.sectionQuery] = this._parseQueryParameters(uri);
				json[this.sectionRequest][this.sectionUri] = this._parseUriParameters(uri);
				const parts = uri.split("?");
				json[this.sectionUrl] = parts && parts[0];
				return json;
			}
			return null;
		}

		// endregion

	});
	return Terrasoft.UriJsonConverter;
});


