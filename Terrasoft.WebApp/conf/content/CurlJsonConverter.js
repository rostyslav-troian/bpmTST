Terrasoft.configuration.Structures["CurlJsonConverter"] = {innerHierarchyStack: ["CurlJsonConverter"]};
define("CurlJsonConverter", ["UriJsonConverter"], function() {
	Ext.define("Terrasoft.services.CurlJsonConverter", {
		alternateClassName: "Terrasoft.CurlJsonConverter",
		extend: "Terrasoft.ServiceJsonConverter",

		// region Properties: Private

		/**
		 * Options aliases.
		 * @private
		 * @type {Object}
		 */
		_aliases: {},

		/**
		 * @private
		 */
		_simpleData: "simple",

		/**
		 * @private
		 */
		_rootParameterValue: "parameter",

		// endregion

		// region Properties: Protected

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_isLongOption: function(argument) {
			return ("-" !== argument[0]) || (("-" === argument[0]) && ("-" === argument[1]));
		},

		/**
		 * @private
		 */
		_getLongOption: function(argument) {
			return ("-" === argument[0]) ? argument.slice(2) : argument;
		},

		/**
		 * @private
		 */
		_getIsOptionArgument: function(value) {
			return "-" === value[0];
		},

		/**
		 * @private
		 */
		_findNextArgument: function(args, i) {
			return (i < (args.length - 1)) ? args[i + 1] : null;
		},

		/**
		 * @private
		 */
		_stripSlashes: function(options) {
			options.forEach(function(option, index, array) {
				option = option.trim();
				if (option.slice(-1) === "\\") {
					option = option.slice(0, -1);
				}
				array[index] = option;
			});
			return options;
		},

		/**
		 * Returns command line split into arguments as if arguments in executable.
		 * @private
		 */
		_consoleCommandToArgs: function(consoleArguments) {
			consoleArguments = consoleArguments.replace(/\\\"/g, "{QUOTES}");
			const tokenizrRegexp = new RegExp("[\\s]+[\"][^\"]+[\"][:][\"][^\"]+[\"]|[\\s]+'[^']*'|"+
					"[\\s]+\"[^\"]*\"|\\S+[\"](\\S+\\s\\S+)+[\"]|[\\s]+'[^']*'|\\S+['](\\S+\\s\\S+)+[']|\\S+", "g");
			let args = consoleArguments
				.match(tokenizrRegexp) || [];
			Terrasoft.each(args, function(item, key) {
				args[key] = item.replace(/{QUOTES}/g, "\"");
			});
			args = this._stripSlashes(args);
			return Terrasoft.deleteEmptyItems(args);
		},

		/**
		 * @private
		 */
		_isSimpleData: function(value) {
			return value.split("=").length === 2;
		},

		/**
		 * @private
		 */
		_parseSimpleData: function(value) {
			return value.split("=");
		},

		/**
		 * @private
		 */
		_addRawData: function(jsonData, parameter) {
			if (jsonData[this.sectionMethod] === "GET") {
				if (!Ext.isArray(jsonData[this.sectionRequest][this.sectionData])) {
					jsonData[this.sectionRequest][this.sectionData] = [];
				}
				jsonData[this.sectionRequest][this.sectionData].push(this.trimQuotes(parameter.value));
			} else {
				jsonData[this.sectionRequest][this.sectionData] = this.trimQuotes(parameter.value);
			}
		},

		/**
		 * @private
		 */
		_addSimpleData: function(jsonData, parameter) {
			if (!jsonData[this._simpleData]) {
				jsonData[this._simpleData] = [];
			}
			jsonData[this._simpleData].push(parameter.value);
		},

		/**
		 * @private
		 */
		_addDataParameter: function(jsonData, parameter) {
			if (!jsonData[this.sectionRequest][this.sectionData]) {
				jsonData[this.sectionRequest][this.sectionData] = {};
			}
			if (this._getIsJsonString(this.trimQuotes(parameter.value))) {
				jsonData[this.sectionRequest][this.sectionData] = JSON.parse(this.trimQuotes(parameter.value));
			}
			else {
				if (this._isSimpleData(parameter.value) && jsonData[this.sectionMethod] !== "GET") {
					this._addSimpleData(jsonData, parameter);
				} else {
					this._addRawData(jsonData, parameter);
				}
			}
		},

		/**
		 * @private
		 */
		_addCookieParameter: function(jsonData, parameter) {
			if (!jsonData[this.sectionRequest][this.sectionCookie]) {
				jsonData[this.sectionRequest][this.sectionCookie] = {};
			}
			parameter.value = this.trimQuotes(parameter.value);
			const parts = parameter.value.split("=");
			jsonData[this.sectionRequest][this.sectionCookie][parts[0].trim()] = parts[1].trim();
		},

		/**
		 * @private
		 */
		_addHeaderParameter: function(jsonData, parameter) {
			if (!jsonData[this.sectionRequest][this.sectionHeader]) {
				jsonData[this.sectionRequest][this.sectionHeader] = {};
			}
			parameter.value = this.trimQuotes(parameter.value);
			const parts = parameter.value.split(":");
			const headerKey = parts[0].trim();
			if (headerKey !== "Authorization" || this._canSetAuthHeader(jsonData)) {
				jsonData[this.sectionRequest][this.sectionHeader][headerKey] = parts[1].trim();
			}
		},

		/**
		 * @private
		 */
		_addInfoParameter: function(jsonData, parameter) {
			if (!jsonData[this.sectionInfo]) {
				jsonData[this.sectionInfo] = {
					ignoredArguments: []
				};
			}
			jsonData[this.sectionInfo].ignoredArguments.push(parameter);
		},

		/**
		 * @private
		 */
		_getIsJsonString: function(str) {
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
		_getAuthType: function(argument) {
			let type;
			switch (argument) {
				case "basic":
				case "user":
					type = "Basic";
					break;
				default:
					break;
			}
			return type;
		},

		/**
		 * @private
		 */
		_canSetAuthHeader: function(jsonData) {
			const headers = jsonData[this.sectionRequest] && jsonData[this.sectionRequest][this.sectionHeader];
			return headers && Ext.isEmpty(headers.Authorization);
		},

		/**
		 * @private
		 */
		_prepareJson: function(args) {
			const jsonData = this._parseArgs(args);
			if (!jsonData[this.sectionMethod]) {
				if (jsonData[this.sectionRequest][this.sectionData]) {
					jsonData[this.sectionMethod] = "POST";
				}
				else {
					jsonData[this.sectionMethod] = "GET";
				}
			}
			if (jsonData[this.sectionMethod] === "GET") {
				if (Ext.isArray(jsonData[this.sectionRequest][this.sectionData])) {
					jsonData[this.sectionUrl] += "?" + jsonData[this.sectionRequest][this.sectionData].join("&");
				}
				delete jsonData[this.sectionRequest][this.sectionData];
			}
			if (jsonData[this._simpleData]) {
				jsonData[this.sectionRequest][this.sectionData] = this._rootParameterValue;
				jsonData[this._simpleData].forEach(function(simpleDataVal) {
					this._addInfoParameter(jsonData, "-d");
					this._addInfoParameter(jsonData, simpleDataVal);
				}.bind(this));
				delete jsonData[this._simpleData];
			}
			return jsonData;
		},

		/**
		 * @private
		 */
		_processOption: function(option, jsonData) {
			if (option.section === this.sectionHeader) {
				this._addHeaderParameter(jsonData, option);
			}
			if (option.section === this.sectionData) {
				this._addDataParameter(jsonData, option);
			}
			if (option.section === this.sectionCookie) {
				this._addCookieParameter(jsonData, option);
			}
			if (option.section === this.sectionMethod) {
				jsonData[this.sectionMethod] = option.value;
			}
			if (option.section === this.sectionUrl) {
				jsonData[this.sectionUrl] = this.trimQuotes(option.value);
			}
			if (option.section === this.sectionAuth) {
				const authHeader = this._getAuthType(option.value);
				if (!jsonData[this.sectionRequest][this.sectionHeader]) {
					jsonData[this.sectionRequest][this.sectionHeader] = {};
				}
				if (authHeader) {
					jsonData[this.sectionRequest][this.sectionHeader].Authorization = authHeader;
				}
			}
		},

		/**
		 * @private
		 */
		_parseArgs: function(args) {
			const jsonData = {};
			jsonData[this.sectionRequest] = {};
			jsonData[this.sectionAuth] = {authType: Terrasoft.services.enums.AuthType.None};
			for (let argumentIndex = 1; argumentIndex < args.length; argumentIndex++) {
				const curArgument = args[argumentIndex];
				if (this._getIsOptionArgument(curArgument)) {
					const nextArgument = this._findNextArgument(args, argumentIndex);
					const option = this._getOption(curArgument, nextArgument);
					this._processOption(option, jsonData);
					if (!option.section) {
						this._addInfoParameter(jsonData, curArgument);
					}
					if (!option.section && nextArgument && option.skipNextArgument) {
						this._addInfoParameter(jsonData, nextArgument);
					}
					if (option.skipNextArgument) {
						argumentIndex++;
					}
				}
				else {
					const urlParameter = this._getOption("--url", curArgument);
					jsonData.url = this.trimQuotes(urlParameter.value);
				}
			}
			return jsonData;
		},

		/**
		 * @private
		 */
		_findAliasByLongOpt: function(longOption) {
			let shortName;
			Terrasoft.each(this._aliases, function(item, key) {
				if (key === longOption || item.fullName === longOption) {
					shortName = key;
					return false;
				}
			});
			return shortName;
		},

		/**
		 * @private
		 */
		_findAliasByShortOpt: function(shortOption) {
			return this._aliases[shortOption.slice(1)] && shortOption.slice(1);
		},

		/**
		 * @private
		 */
		_isSingleArgumentOption: function(section, nextArgument) {
			return !section && nextArgument && "-" === nextArgument[0];
		},

		/**
		 * @private
		 */
		_getOption: function(argument, nextArgument) {
			const option = {
				skipNextArgument: true
			};
			let shortName;
			if (this._isLongOption(argument)) {
				const longOption = this._getLongOption(argument);
				shortName = this._findAliasByLongOpt(longOption);
			}
			if (!shortName) {
				shortName = this._findAliasByShortOpt(argument);
			}
			option.section = this._aliases[shortName] && this._aliases[shortName].section;
			if (this._isSingleArgumentOption(option.section, nextArgument) ||
				this._aliases[shortName] && this._aliases[shortName].singleArg) {
				option.skipNextArgument = false;
			}
			option.value = this._aliases[shortName] && this._aliases[shortName].value || nextArgument;
			return option;
		},

		/**
		 * @private
		 */
		_initAliases: function() {
			this._aliases["*@"] = {
				fullName: "url",
				section: this.sectionUrl
			};
			this._aliases.H = {
				fullName: "header",
				section: this.sectionHeader
			};
			this._aliases.b = {
				fullName: "cookie",
				section: this.sectionCookie
			};
			this._aliases.d = {
				fullName: "data",
				section: this.sectionData
			};
			this._aliases.X = {
				fullName: "request",
				section: this.sectionMethod
			};
			this._aliases.G = {
				fullName: "get",
				section: this.sectionMethod,
				value: "GET",
				singleArg: "true"
			};
			this._aliases.u = {
				fullName: "user",
				value: "user",
				section: this.sectionAuth
			};
			this._aliases.basic = {
				fullName: "basic",
				value: "basic",
				section: this.sectionAuth,
				singleArg: "true"
			};
		},

		//endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.ServiceJsonConverter#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this._initAliases();
		},

		/**
		 * Returns object from curl command line string.
		 * @public
		 * @param {String} data CURL command line text.
		 * @returns {Object} parsed object.
		 */
		convert: function(data) {
			if (!data.trim().startsWith("curl")) {
				return null;
			}
			const args = this._consoleCommandToArgs(data);
			const json = this._prepareJson(args);
			this.doParseUriParameters(json);
			this.detectAuthType(json);
			return json;
		}

		//endregion

	});

	return Terrasoft.CurlJsonConverter;

});


