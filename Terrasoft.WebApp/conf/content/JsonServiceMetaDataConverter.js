Terrasoft.configuration.Structures["JsonServiceMetaDataConverter"] = {innerHierarchyStack: ["JsonServiceMetaDataConverter"]};
define("JsonServiceMetaDataConverter", function() {
	Ext.define("Terrasoft.services.JsonServiceMetaDataConverter", {
		alternateClassName: "Terrasoft.JsonServiceMetaDataConverter",

		// region Properties: Private

		/**
		 * @private
		 */
		_parametersMap: {},

		// endregion

		// region Properties: Public

		/**
		 * Code prefix.
		 */
		codePrefix: "",

		/**
		 * Default parameter name.
		 */
		defaultParameterName: "Parameter",

		/**
		 * Name of authInfo node in JSON.
		 */
		authInfoNodeName: "authInfo",

		/**
		 * Name of request node in JSON.
		 */
		requestNodeName: "request",

		/**
		 * Name of response node in JSON.
		 */
		responseNodeName: "response",

		/**
		 * Name of url node in JSON.
		 */
		urlNodeName: "url",

		/**
		 * Name of method type node in JSON.
		 */
		methodNodeName: "method",

		/**
		 * Name of body parameters node in JSON.
		 */
		bodyParametersNodeName: "body",

		/**
		 * Name of header parameters node in JSON.
		 */
		headerParametersNodeName: "header",

		/**
		 * Name of cookie parameters node in JSON.
		 */
		cookieParametersNodeName: "cookie",

		/**
		 * Name of query parameters node in JSON.
		 */
		queryParametersNodeName: "query",

		/**
		 * Name of url parameters node in JSON.
		 */
		urlParametersNodeName: "uri",

		/**
		 * Try detect data value type of parameters.
		 */
		tryDetectDataType: true,

		/**
		 * Use parameter template.
		 */
		useParameterTemplate: true,

		/**
		 * Insert default values in parameters from JSON.
		 */
		useDefaultValue: true,

		/**
		 * Count of hierarchy level to build name.
		 */
		depthOfNameGeneration: 2,

		// endregion

		// region Method: Private

		/**
		 * @private
		 */
		_generateVirtualNode: function(jsonNode) {
			const virtualNode = {};
			for (let i = 0; i < jsonNode.length; i++) {
				const arrayItem = jsonNode[i];
				this._mergeObject(arrayItem, virtualNode);
			}
			return virtualNode;
		},

		/**
		 * @private
		 */
		_mergeObject: function(source, target) {
			Terrasoft.each(source, function(value, key) {
				if (Ext.isObject(value)) {
					if (!target[key]) {
						target[key] = {};
					}
					this._mergeObject(value, target[key]);
				} else {
					target[key] = value;
				}
			}, this);
		},

		/**
		 * @private
		 */
		_processParameter: function(target, key, jsonNode, parentUId) {
			const parameter = new Terrasoft.ServiceParameter();
			parameter.uId = Terrasoft.generateGUID();
			this._parametersMap[parameter.uId] = {
				parentUId: parentUId,
				key: key,
				instance: parameter
			};
			parameter.defValue = new Terrasoft.ServiceParameterValue();
			this._saveArrayIndex(key, parameter.uId, parentUId);
			if (Ext.isArray(jsonNode)) {
				this._processArrayNode(jsonNode, target, parameter.uId);
			} else if (Ext.isObject(jsonNode)) {
				if (!Ext.Object.isEmpty(jsonNode)) {
					this._processObjectNode(jsonNode, target, parameter.uId);
					this._parametersMap[parameter.uId].virtual = true;
				} else {
					parameter.dataValueTypeName = Terrasoft.services.enums.DataValueTypeName.Text;
					target.add(parameter.uId, parameter);
				}
			}
			else {
				this._processSimpleNode(jsonNode, target, parameter.uId);
			}
		},

		/**
		 * @private
		 */
		_processArrayNode: function(jsonNode, target, parameterUId) {
			const parameter = this._parametersMap[parameterUId].instance;
			target.add(parameter.uId, parameter);
			parameter.isArray = true;
			const isObject = Ext.isObject(jsonNode[0]);
			if (isObject) {
				parameter.dataValueTypeName = Terrasoft.services.enums.DataValueTypeName.Object;
				this._parametersMap[parameter.uId].isArray = true;
				var virtualNode = this._generateVirtualNode(jsonNode);
				this._processObjectNode(virtualNode, parameter.itemProperties, parameter.uId);
			} else {
				parameter.dataValueTypeName = this._detectDataType(jsonNode[0]);
			}
		},

		/**
		 * @private
		 */
		_saveArrayIndex: function(key, parameterUId, parentUId) {
			if (key.toString() && typeof key === "number" && this._parametersMap[parentUId] &&
				this._parametersMap[parentUId].isArray) {
				this._parametersMap[parameterUId].arrayIndex = key;
			}
		},

		/**
		 * @private
		 */
		_processSimpleNode: function(jsonNode, target, parameterUId) {
			const parameter = this._parametersMap[parameterUId].instance;
			parameter.dataValueTypeName = this._detectDataType(jsonNode);
			if (this.useDefaultValue) {
				parameter.defValue.value = jsonNode;
				parameter.defValue.source = Terrasoft.services.enums.ServiceParameterValueSource.CONST;
			}
			target.add(parameter.uId, parameter);
		},

		/**
		 * @private
		 */
		_processObjectNode: function(jsonNode, target, parameterUId) {
			Terrasoft.each(jsonNode, function(value, propertyKey) {
				this._processParameter(target, propertyKey, value, parameterUId);
			}, this);
		},

		/**
		 * @private
		 */
		_isParameterArray: function(parameterUId) {
			return this._parametersMap[parameterUId] && this._parametersMap[parameterUId].isArray;
		},

		/**
		 * @private
		 */
		_generateParameterName: function(parameterUId) {
			var parts = [];
			do {
				var parameter = this._parametersMap[parameterUId];
				if (typeof parameter.key === "string") {
					parts.unshift(Ext.String.capitalize(parameter.key));
				}
				parameterUId = parameter.parentUId;
			} while (this._parametersMap[parameterUId] && !this._isParameterArray(parameterUId));
			var name = parts.filter(_.negate(Ext.isEmpty)).join(" ");
			return Ext.isEmpty(name) ? Ext.String.capitalize(this.defaultParameterName) : name;
		},

		/**
		 * @private
		 */
		_generateParameterCode: function(parameterUId) {
			const parts = [];
			let count = 0;
			while (this._parametersMap[parameterUId] && (count < this.depthOfNameGeneration ||
				this.depthOfNameGeneration === 0)) {
				var parameter = this._parametersMap[parameterUId];
				if (typeof parameter.key === "string") {
					parts.unshift(Ext.String.capitalize(parameter.key));
					parameterUId = parameter.parentUId;
				}
				count++;
			}
			const name = parts.filter(_.negate(Ext.isEmpty)).join("");
			const normalizeParamaterCode = this._normalizeParameterCode(name);
			return this._normalizeParameterCode(this.codePrefix +
				(Ext.isEmpty(normalizeParamaterCode)
					? Ext.String.capitalize(this.defaultParameterName)
					: normalizeParamaterCode));
		},

		/**
		 * @private
		 */
		_normalizeParameterCode: function(value) {
			let normalizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
			normalizedValue = normalizedValue.replace(/^\d+/, "");
			return normalizedValue;
		},

		/**
		 * @private
		 */
		_generateParameterPath: function(parameterUId) {
			let parts = [];
			const initialKey = this._parametersMap[parameterUId].key;
			let addRootSymbol =
				this._parametersMap[parameterUId].instance.type === Terrasoft.services.enums.ServiceParameterType.BODY;
			let parameter = null;
			do {
				parameter = this._parametersMap[parameterUId];
				const parentIsArray = this._isParameterArray(parameter.parentUId);
				if (!(parentIsArray && typeof parameter.key === "string")) {
					parts.unshift(parameter.key);
				}
				if (parentIsArray) {
					parts.unshift(parameter.key);
					addRootSymbol = false;
					break;
				}
				parameterUId = parameter.parentUId;
			} while (this._parametersMap[parameterUId]);
			parts = parts.filter(_.negate(Ext.isEmpty));
			if (addRootSymbol) {
				if ((parameter.instance.isArray || Ext.isEmpty(initialKey))) {
					return "$";
				}
				return "$." + parts.join(".");
			}
			return parts.join(".");
		},

		/**
		 * @private
		 */
		_detectDataType: function(value) {
			if (this.tryDetectDataType) {
				switch (typeof value) {
					case "number":
						return Terrasoft.services.enums.DataValueTypeName.Integer;
					case "string":
						return Terrasoft.services.enums.DataValueTypeName.Text;
					case "boolean":
						return Terrasoft.services.enums.DataValueTypeName.Boolean;
					default:
						return Terrasoft.services.enums.DataValueTypeName.Text;
				}
			}
			return Terrasoft.services.enums.DataValueTypeName.Text;
		},

		/**
		 * @private
		 */
		_parseParameters: function(json, type, target) {
			this._processParameter(target, "", json);
			var cleanDefValue = !Terrasoft.Features.getIsEnabled("DefValuesServiceMethodBuilder");
			Terrasoft.each(this._parametersMap, function(parameter, uId) {
				if (parameter.virtual) {
					return;
				}
				if (parameter.instance.type === Terrasoft.services.enums.ServiceParameterType.UNDEFINED) {
					parameter.instance.type = type;
				}
				if (cleanDefValue) {
					this._cleanDefValueInComplexObject(uId);
				}
				this._fillParameterProperties(uId);
			}, this);
		},

		/**
		 * @private
		 */
		_fillParameterProperties: function(parameterUId) {
			var parameter = this._parametersMap[parameterUId];
			parameter.instance.name = this._generateParameterCode(parameterUId);
			parameter.instance.setLocalizableStringPropertyValue("caption", this._generateParameterName(parameterUId));
			parameter.instance.path = this._generateParameterPath(parameterUId);
			this._setParameterRequired(parameter.instance);
		},

		/**
		 * @private
		 */
		_setParameterRequired: function(parameter) {
			if (parameter.type !== Terrasoft.services.enums.ServiceParameterType.QUERY_STRING &&
					parameter.type !== Terrasoft.services.enums.ServiceParameterType.BODY) {
				parameter.setPropertyValue("isRequired", !parameter.hasDefaultValue());
			}
		},

		/**
		 * @private
		 */
		_cleanDefValueInComplexObject: function(parameterUId) {
			var parameter = this._parametersMap[parameterUId];
			if (this._cantHaveDefaultValue(parameterUId)) {
				parameter.instance.defValue = new Terrasoft.ServiceParameterValue();
			}
		},

		/**
		 * @private
		 */
		_cantHaveDefaultValue: function(parameterUId) {
			var parameter = this._parametersMap[parameterUId];
			return parameter.instance.type !== Terrasoft.services.enums.ServiceParameterType.COOKIE &&
				parameter.instance.type !== Terrasoft.services.enums.ServiceParameterType.HTTP_HEADER;
		},

		/**
		 * @private
		 */
		_convertParametersByTypes: function(json, target) {
			if (!Ext.Object.isEmpty(json[this.bodyParametersNodeName])) {
				this._parseParameters(json[this.bodyParametersNodeName],
					Terrasoft.services.enums.ServiceParameterType.BODY, target);
			}
			if (!Ext.Object.isEmpty(json[this.headerParametersNodeName])) {
				this._parseParameters(json[this.headerParametersNodeName],
					Terrasoft.services.enums.ServiceParameterType.HTTP_HEADER, target);
			}
			if (!Ext.Object.isEmpty(json[this.cookieParametersNodeName])) {
				this._parseParameters(json[this.cookieParametersNodeName],
					Terrasoft.services.enums.ServiceParameterType.COOKIE, target);
			}
			if (!Ext.Object.isEmpty(json[this.urlParametersNodeName])) {
				this._parseParameters(json[this.urlParametersNodeName],
					Terrasoft.services.enums.ServiceParameterType.URL_SEGMENT, target);
			}
			if (!Ext.Object.isEmpty(json[this.queryParametersNodeName])) {
				this._parseParameters(json[this.queryParametersNodeName],
					Terrasoft.services.enums.ServiceParameterType.QUERY_STRING, target);
			}
		},

		// endregion

		// region Methods: Public

		constructor: function(config) {
			Ext.merge(this, config);
		},

		/**
		 * Converts json object to Terrasoft.services.ServiceMethod.
		 * @param json {Object|String}
		 * @return {Terrasoft.services.ServiceMethod}
		 */
		convert: function(json) {
			var method = new Terrasoft.ServiceMethod({
				_serviceSchema: new Terrasoft.ServiceSchema(),
				useAuthInfo: false
			});
			const schema = method.getServiceSchema();
			if (this.requestNodeName && json[this.requestNodeName]) {
				this._convertParametersByTypes(json[this.requestNodeName], method.request.parameters);
			}
			if (this.responseNodeName && json[this.responseNodeName]) {
				this._convertParametersByTypes(json[this.responseNodeName], method.response.parameters);
			}
			method.request.uri = json[this.urlNodeName];
			if (!Ext.isEmpty(this.methodNodeName) && json[this.methodNodeName]) {
				method.request.httpMethodType =
					Terrasoft.services.enums.HttpMethodType[json[this.methodNodeName].toUpperCase()];
			} else {
				method.request.httpMethodType =	Terrasoft.services.enums.HttpMethodType.POST;
			}
			this._parametersMap = {};
			if (Ext.isDefined(json[this.authInfoNodeName])) {
				schema.authInfo = new Terrasoft.AuthInfo({
					authType: json[this.authInfoNodeName].authType
				});
				method.useAuthInfo = json[this.authInfoNodeName].authType !== Terrasoft.services.enums.AuthType.None;
			}
			return method;
		}

		// endregion

	});
	return Terrasoft.JsonServiceMetaDataConverter;
});


