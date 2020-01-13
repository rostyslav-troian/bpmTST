Terrasoft.configuration.Structures["RawJsonConverter"] = {innerHierarchyStack: ["RawJsonConverter"]};
define("RawJsonConverter", ["RawConverter", "RawBuffer", "ServiceJsonConverter", "UriJsonConverter"],
	function(RawConverter, Buffer) {
	Ext.define("Terrasoft.services.RawJsonConverter", {
		alternateClassName: "Terrasoft.RawJsonConverter",
		extend: "Terrasoft.ServiceJsonConverter",

		// region Attributes: Protected

		rawType: RawConverter.REQUEST,

		// endregion

		// region Methods: Private

		/**
		 * Returns object from Raw text.
		 * @private
		 * @param {String} data.
		 * @returns {Object} buffet object.
		 */
		_createBuffer: function(data) {
			return new Buffer([data.trim(), "", ""].join("\r\n"));
		},

		/**
		 * @private
		 */
		_methodNameFromCode: function(code) {
			return RawConverter.methods[code];
		},

		/**
		 * @private
		 */
		_addHeaderParameter: function(jsonData, parameterName, parameterValue) {
			if (!jsonData[this.sectionRequest][this.sectionHeader]) {
				jsonData[this.sectionRequest][this.sectionHeader] = {};
			}
			jsonData[this.sectionRequest][this.sectionHeader][parameterName] = parameterValue;
		},

		/**
		 * @private
		 */
		_isJsonString: function(str) {
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			return true;
		},

		/**
		 * @private
		 */
		_addDataParameter: function(jsonData, parameter) {
			if (this._isJsonString(parameter)) {
				jsonData[this.sectionRequest][this.sectionData] = JSON.parse(parameter);
			}
			else {
				jsonData[this.sectionRequest][this.sectionData] = this.trimQuotes(parameter.trim());
			}
		},

		/**
		 * @private
		 */
		_trimLines: function(str) {
			const lines = str.split("\n");
			for (let line = 0; line < lines.length; line++) {
				lines[line] = lines[line].trim();
			}
			return lines.join("\n");
		},

		/**
		 * @private
		 */
		_addCookieParameter: function(jsonData, parameter) {
			if (!jsonData[this.sectionRequest][this.sectionCookie]) {
				jsonData[this.sectionRequest][this.sectionCookie] = {};
			}
			parameter = this.trimQuotes(parameter);
			const parts = parameter.split("=");
			jsonData[this.sectionRequest][this.sectionCookie][parts[0].trim()] = parts[1].trim();
		},

		/**
		 * @private
		 */
		_processCookie: function(cookie) {
			const json = this.json;
			if (cookie) {
				this._addCookieParameter(json, cookie.trim());
			}
		},

		/**
		 * @private
		 */
		_addHeaders: function(headers, json) {
			let url = "";
			for (let i = 0; i < headers.length; i += 2) {
				const headerName = headers[i];
				const headerValue = headers[i + 1];
				if (headerName === "Host") {
					url = headerValue;
				} else if (headerName === "Cookie") {
					const cookieList = headerValue.split(";");
					cookieList.forEach(this._processCookie.bind(this));
				}
				else {
					this._addHeaderParameter(json, headerName, headerValue);
				}
			}
			return url;
		},

		// endregion

		// region Methods: Protected

		/**
		 * Handles parsed headers info.
		 * @protected
		 */
		onHeadersParsed: function(parsedSection) {
			const json = this.json;
			json[this.sectionMethod] = this._methodNameFromCode(parsedSection.method);
			json[this.sectionAuth] = {authType: Terrasoft.services.enums.AuthType.None};
			let url = "";
			if (parsedSection.headers) {
				const host = this._addHeaders(parsedSection.headers, json);
				if (host) {
					url = host;
				}
			}
			if (parsedSection.url) {
				if (parsedSection.url.indexOf(url) === -1) {
					url = url + parsedSection.url;
				} else {
					url = parsedSection.url;
				}
			}
			if (url) {
				json[this.sectionUrl] = url;
			}
		},

		/**
		 * Handles parsed body.
		 * @protected
		 */
		onBodyParsed: function(chunk, offset, length) {
			const json = this.json;
			const bodyData = new Buffer(chunk);
			const bodyText = bodyData.slowToString("utf8", offset, offset + length);
			this._addDataParameter(json, bodyText);
		},

		// endregion

		// region Methods: Public

		/**
		 * Returns object from Raw text.
		 * @public
		 * @param {String} data Raw text.
		 * @returns {Object} parsed object.
		 */
		convert: function(data) {
			data = this._trimLines(data);
			const converter = new RawConverter(this.rawType);
			const json = {};
			json[this.sectionRequest] = {};
			this.json = json;
			converter[RawConverter.kOnHeadersComplete] = this.onHeadersParsed.bind(this);
			converter[RawConverter.kOnBody] = this.onBodyParsed.bind(this);
			converter.execute(this._createBuffer(data));
			this.doParseUriParameters(json);
			this.detectAuthType(json);
			return json;
		}

		// endregion

	});

	return Terrasoft.RawJsonConverter;

});


