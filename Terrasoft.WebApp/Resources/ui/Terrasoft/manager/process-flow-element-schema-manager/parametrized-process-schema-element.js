/**
 * Mixin parameterized process element.
 */
Ext.define("Terrasoft.manager.mixins.ParametrizedProcessSchemaElement", {
	alternateClassName: "Terrasoft.ParametrizedProcessSchemaElement",

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	//region Properties: Protected

	/**
	 * Parameters.
	 * @protected
	 * @type {Terrasoft.ProcessSchemaParameterCollection}
	 */
	parameters: null,

	/**
	 * Flag that indicates editing parameters.
	 * @protected
	 * @type {Boolean}
	 */
	enableEditCollection: true,

	//endregion

	//region Constructors: Public

	/**
	 * Mixin constructor initializes a collection of parameters and elements.
	 */
	constructor: function() {
		this.callParent(arguments);
		var parametersMetaData = this.parameters || [];
		var parameters;
		if (Terrasoft.Features.getIsEnabled("ProcessParameterCollections") || Terrasoft.isDebug) {
			parameters = this.parameters = Ext.create("Terrasoft.ProcessSchemaParameterCollection");
		} else {
			parameters = this.parameters = Ext.create("Terrasoft.Collection");
		}
		if (!this.enableEditCollection) {
			return;
		}
		Terrasoft.each(parametersMetaData, function(parameterMetaData) {
			if (parameters.find(parameterMetaData.uId)) {
				return;
			}
			var typeName = parameterMetaData.typeName || Terrasoft.ProcessSchemaParameter.prototype.typeName;
			var elementParameter = Ext.create(typeName, parameterMetaData);
			parameters.add(elementParameter.uId, elementParameter);
		}, this);
		parameters.each(function(parameter) {
			parameter.processFlowElementSchema = this;
		}, this);
		this.initHasLazyParameters();
	},

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_findParameterByCaption: function(parameterCollection, caption) {
		var filteredCollection = parameterCollection.filterByFn(function(parameter) {
			var parameterCaption = Terrasoft.ProcessSchemaDesignerUtilities.getElementCaption(parameter);
			return parameterCaption === caption;
		}, this);
		return filteredCollection.first();
	},

	/**
	 * Initializes hasLazyParameters attribute.
	 * @private
	 */
	initHasLazyParameters: function() {
		var lazyParameters = this.getLazyParameters();
		this.hasLazyParameters = !lazyParameters.isEmpty();
	},

	/**
	 * Checks when we could to synchronize parameters.
	 * @private
	 * @param {Terrasoft.manager.UserTaskSchema} [schema] User task schema.
	 * @returns {boolean}
	 */
	getCanSynchronizeParameters: function(schema) {
		schema = schema || this.schema;
		return !(!schema || (this.schemaUId === this.parentSchema.uId));

	},

	/**
	 * @private
	 */
	_recursivelyFindParameterByCaption: function(values) {
		let parameter = this._findParameterByCaption(this.parameters, values[0]);
		for (let i = 1; i < values.length; i++) {
			if (parameter) {
				parameter = this._findParameterByCaption(parameter.itemProperties, values[i]);
			}
		}
		return parameter;
	},

	/**
	 * Synchronizes schema parameter with element parameter.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchemaParameter} sourceParameter Schema parameter.
	 */
	synchronizeParameter: function(sourceParameter) {
		var parameter = sourceParameter.clone();
		this._prepareClonedParameter(parameter);
		this.clearSubProcessParametersSourceValue(parameter);
		this.parameters.add(parameter.uId, parameter);
		this._updateMapping(sourceParameter, parameter);
	},

	/**
	 * @private
	 */
	_updateMapping: function(sourceParameter, parameter) {
		var parentSchema = this.parentSchema;
		var mappings = parentSchema.mappings;
		var mappingInfo = this.createMappingInfo(sourceParameter.uId, parameter);
		mappings.add(mappingInfo.targetUId, mappingInfo);
		sourceParameter.itemProperties.each(function(sourceNestedParameter) {
			var nestedParameter = parameter.itemProperties.findByPath("name", sourceNestedParameter.name);
			this._updateMapping(sourceNestedParameter, nestedParameter);
		}, this);
	},

	/**
	 * @private
	 */
	_prepareClonedParameter: function(parameter) {
		parameter.uId = Terrasoft.generateGUID();
		parameter.containerUId = this.uId;
		parameter.processFlowElementSchema = this;
		parameter.itemProperties.each(function(nestedParameter) {
			this._prepareClonedParameter(nestedParameter);
		}, this);
	},

	/**
	 * Synchronizes schema parameter with element parameter.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchemaParameter} sourceParameter Schema parameter.
	 */
	synchronizeDynamicParameter: function(sourceParameter) {
		if (sourceParameter.getIsDynamic() && !this.findParameterByName(sourceParameter.name)) {
			this.synchronizeParameter(sourceParameter);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		var parameters = Terrasoft.isInstanceOfClass(this.parameters, "Terrasoft.ProcessSchemaParameterCollection")
				? this.parameters.getRoots()
				: this.parameters;
		if (!parameters || parameters.isEmpty()) {
			return;
		}
		serializableObject.parameters = [];
		parameters.each(function(parameter) {
			var parameterMetaData = this.getSerializableProperty(parameter);
			serializableObject.parameters.push(parameterMetaData);
		}, this);
	},

	/**
	 * Loads localized resources to the collection of parameters.
	 * @param {Object} localizableValues Localized resources.
	 * @protected
	 */
	loadParametersLocalizableValues: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		var parametersLocalizableValues = localizableValues.Parameters || {};
		this.parameters.each(function(parameter) {
			var parameterLocalizableValues = parametersLocalizableValues[parameter.name];
			parameter.loadLocalizableValues(parameterLocalizableValues);
			this.clearSubProcessParametersSourceValue(parameter);
		}, this);
	},

	/**
	 * Loads localized resources to the collection of parameters by UIds.
	 * @param {Object} localizableValues Localizable resources.
	 * @protected
	 */
	loadParametersLocalizableValuesByUIds: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		this.parameters.each(function(parameter) {
			parameter.loadLocalizableValuesByUIds(localizableValues);
			this.clearSubProcessParametersSourceValue(parameter);
		}, this);
	},

	/**
	 * Returns an object with localizable resources collection parameters.
	 * @param {Object} localizableValues The object where localized resources are recorded.
	 * @protected
	 */
	getParametersLocalizableValues: function(localizableValues) {
		this.parameters.each(function(parameter) {
			parameter.getLocalizableValues(localizableValues);
		}, this);
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns parameter by the specified name.
	 * @param {String} name Parameter name.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 */
	findParameterByName: function(name) {
		return this.parameters.findByFn(function(parameter) {
			return parameter.name === name;
		}, this);
	},

	/**
	 * Returns parameter by the specified name.
	 * @param {String} referenceSchemaUId Parameter reference schema unique identifier.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 */
	findParameterByReferenceSchemaUId: function(referenceSchemaUId) {
		var filteredParameters = this.parameters.filterByFn(function(parameter) {
			return parameter.referenceSchemaUId === referenceSchemaUId;
		}, this);
		return filteredParameters.first();
	},

	/**
	 * Returns parameter by the specified name.
	 * @param {String} name Parameter name.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 * @throws {Terrasoft.exceptions.ItemNotFoundException} If parameter was not found.
	 */
	getParameterByName: function(name) {
		var parameter = this.findParameterByName(name);
		if (!parameter) {
			var message =
				Ext.String.format(Terrasoft.Resources.ProcessSchemaDesigner.Messages.ParameterNotFoundMessage, name);
			throw Ext.create("Terrasoft.exceptions.ItemNotFoundException", {message: message});
		}
		return parameter;
	},

	/**
	 * Returns parameter by the specified caption.
	 * @param {String} caption Parameter caption.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 */
	findParameterByCaption: function(caption) {
		return this._recursivelyFindParameterByCaption([caption]) ||
			this._recursivelyFindParameterByCaption(caption.split(":"));
	},

	/**
	 * Returns parameter by the specified identifier.
	 * @param {String} uid Unique identifier.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 */
	findParameterByUId: function(uid) {
		return this.parameters.find(uid);
	},

	/**
	 * Returns parameter by the specified identifier.
	 * @param {String} uId Unique identifier.
	 * @return {Terrasoft.ProcessSchemaParameter|null}  parameter.
	 */
	findParameterBySourceUId: function(uId) {
		const resultParameters = this.parameters.filterByPath("sourceParameterUId", uId);
		return resultParameters.first() || null;
	},

	/**
	 * @deprecated
	 */
	getResultParamter: function() {
		return this.getResultParameter();
	},

	/**
	 * Returns result parameter of process schema element.
	 * @throws {Terrasoft.InvalidObjectState} Throws exception if parameters collection has more then one
	 * result parameter.
	 * @return {Terrasoft.ProcessSchemaParameter|null} Result parameter.
	 */
	getResultParameter: function() {
		var resultParameters = this.parameters.filterByFn(function(parameter) {
			return parameter.isResult === true;
		});
		if (resultParameters.getCount() > 1) {
			throw new Terrasoft.InvalidObjectState();
		}
		return resultParameters.first();
	},

	/**
	* Handles when parameter added.
	* @param {Terrasoft.ProcessSchemaParameter} item Parameter.
	*/
	onParameterAdded: function(item) {
		this.fireEvent("parameterAdded", item, this);
	},

	/**
	* Handles when parameter removed.
	* @param {Terrasoft.ProcessSchemaParameter} item Parameter.
	*/
	onParameterRemoved: function(item) {
		this.fireEvent("parameterRemoved", item, this);
	},

	/**
	 * Subscribes on changed event.
	 * @param {Function} handler Event handler.
	 * @param {Object} scope Execution context.
	 */
	subscribeOnChangedEvent: function(handler, scope) {
		this.on("changed", handler, scope);
		this.parameters.on("add", this.onParameterAdded, this);
		this.parameters.on("remove", this.onParameterRemoved, this);
		this.parameters.each(function(parameter) {
			parameter.on("changed", handler, scope);
		}, this);
	},

	/**
	 * Unsubscribes on changed event.
	 * @param {Function} handler Event handler.
	 * @param {Object} scope Execution context.
	 */
	unsubscribeOnChangedEvent: function(handler, scope) {
		this.un("changed", handler, scope);
		this.parameters.un("add", this.onParameterAdded, this);
		this.parameters.un("remove", this.onParameterRemoved, this);
		this.parameters.each(function(parameter) {
			parameter.un("changed", handler, scope);
		}, this);
	},

	/**
	 * Synchronizes schema parameters with element parameters.
	 * @param {Terrasoft.manager.mixins.ParametrizedProcessSchemaElement} schema Parametrized schema.
	 */
	synchronizeParameters: function(schema) {
		if (this.getCanSynchronizeParameters(schema)) {
			this.clearParamters();
			var parameters = schema.parameters;
			if (parameters) {
				parameters.each(this.synchronizeParameter, this);
			}
		}
		this.initHasLazyParameters();
	},

	/**
	 * Synchronizes dynamic schema parameters with element parameters.
	 */
	synchronizeDynamicParameters: function() {
		if (this.getCanSynchronizeParameters()) {
			var schemaParameters = this.schema.parameters;
			if (schemaParameters) {
				schemaParameters.each(this.synchronizeDynamicParameter, this);
			}
		}
	},

	/**
	* Clears parameters and removes mapping.
	* @deprecated Use clearParameters instead.
	*/
	clearParamters: function() {
		this.clearParameters();
	},

	/**
	 * Clears parameters and removes mapping.
	 */
	clearParameters: function() {
		var mappings = this.parentSchema.mappings;
		this.parameters.each(function(parameter) {
			var mappingInfo = mappings.find(parameter.uId);
			mappings.remove(mappingInfo);
		}, this);
		this.parameters.clear();
	},

	/**
	 * Clears dynamic parameters and removes mapping.
	 * @deprecated Use clearParameters instead.
	 */
	clearDynamicParamters: function() {
		this.clearDynamicParameters();
	},

	/**
	 * Clears dynamic parameters and removes mapping.
	 */
	clearDynamicParameters: function() {
		var dynamicParameters = this.getDynamicParameters();
		dynamicParameters.each(function(parameter) {
			this.clearDynamicParameter(parameter.uId);
		}, this);
	},

	/**
	 * Clears dynamic parameter and remove mapping.
	 */
	clearDynamicParameter: function(uId) {
		const mappings = this.parentSchema.mappings;
		const mappingInfo = mappings.find(uId);
		mappings.remove(mappingInfo);
		this.parameters.removeByKey(uId);
	},

	/**
	 * Returns dynamic parameters.
	 * @return {Terrasoft.Collection}
	 */
	getDynamicParameters: function() {
		return this.parameters.filterByFn(function(parameter) {
			return parameter.getIsDynamic();
		}, this);
	},

	/**
	 * Creates process schema mapping.
	 * @param {String} sourceParameterUId Schema parameter identifier.
	 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Parameter of element.
	 * @return {Object}
	 */
	createMappingInfo: function(sourceParameterUId, parameter) {
		var processSchemaUId = this.parentSchema.uId;
		var processElementParameterMacros = Terrasoft.FormulaMacros.prepareProcessElementParameterValue(this.uId,
			parameter.uId);
		var targetMetaPath = processElementParameterMacros.getMetaPath();
		return {
			createdInSchemaUId: processSchemaUId,
			modifiedInSchemaUId: processSchemaUId,
			name: this.name,
			source: parameter.cloneSourceValue(),
			sourceSchemaUId: this.schemaUId,
			dragGroupName: parameter.dragGroupName,
			ownerSchemaManagerName: parameter.ownerSchemaManagerName,
			sourceParameterUId: sourceParameterUId,
			targetUId: parameter.uId,
			typeName: "Terrasoft.Core.Process.ProcessSchemaMapping",
			targetMetaPath: targetMetaPath,
			uId: Terrasoft.generateGUID()
		};
	},

	/**
	 * Sets sub-process parameter source to None {@link Terrasoft.ProcessSchemaParameterValueSource}.
	 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Sub-process parameter.
	 */
	clearSubProcessParametersSourceValue: function(parameter) {
		if (this.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Subprocess) {
			return;
		}
		var sourceValue = parameter.sourceValue;
		if (parameter.createdInSchemaUId !== sourceValue.modifiedInSchemaUId) {
			return;
		}
		parameter.clearSourceValue();
	},

	/**
	 * Validates element parameters.
	 * @return {Object[]} Parameters validation results.
	 */
	validateParameters: function() {
		var validationResults = [];
		this.parameters.each(function(parameter) {
			var parameterValidationResults = parameter.validate();
			Ext.Array.push(validationResults, parameterValidationResults);
		}, this);
		return validationResults;
	},

	/**
	 * Returns parameters that support lazy load.
	 * @return {Terrasoft.Collection}
	 */
	getLazyParameters: function() {
		return this.parameters.filterByFn(function(item) {
			return item.isLazy;
		}, this);
	},

	/**
	 * Returns parameters that support lazy load and loaded.
	 * @return {Terrasoft.Collection}
	 */
	getLoadedLazyParameters: function() {
		return this.parameters.filterByFn(function(item) {
			return item.isLazy && item.isLoaded;
		}, this);
	},

	/**
	 * Returns parameters that support lazy load and not loaded.
	 * @return {Terrasoft.Collection}
	 */
	getNotLoadedLazyParameters: function() {
		return this.parameters.filterByFn(function(item) {
			return item.isLazy && !item.isLoaded;
		}, this);
	},

	/**
	 * Returns true if there are no loaded parameters in element.
	 * @returns {Boolean} True if there are not loaded parameters in element.
	 */
	getAllLazyParametersAreLoaded: function() {
		var parameters = this.getNotLoadedLazyParameters();
		return parameters.getCount() === 0;
	},

	/**
	 * Loaded lazy load parameter values.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Execution context.
	 */
	loadLazyParameters: function(callback, scope) {
		scope = scope || this;
		var lazyProperties = this.getNotLoadedLazyParameters();
		if (lazyProperties.isEmpty()) {
			callback.call(scope, this);
		} else {
			var loadConfig = {
				userTaskUId: this.uId,
				processSchemaUId: this.parentSchema.uId
			};
			Terrasoft.ProcessSchemaLazyPropertiesHelper.getLazyParameterValues(loadConfig, function(values) {
				lazyProperties.each(function(property) {
					var value = values[property.uId];
					if (!Ext.isEmpty(value)) {
						property.setPropertyValue("sourceValue", value);
					}
					property.setPropertyValue("isLoaded", true);
				}, this);
				callback.call(scope);
			}, this);
		}
	},

	/**
	 * Clear lazy load parameter values.
	 */
	clearLazyParameterValues: function() {
		var lazyParameters = this.getLazyParameters();
		lazyParameters.each(function(parameter) {
			parameter.clearSourceValue();
			parameter.setPropertyValue("isLoaded", false);
		}, this);
	},

	/**
	 * Updates display value for parameters with mapping.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The context of callback function.
	 */
	updateParametersDisplayValue: function(callback, scope) {
		var element = this;
		var parameters = this.parameters.filterByFn(function(parameter) {
			var source = parameter.sourceValue.source;
			var sourceEnum = Terrasoft.ProcessSchemaParameterValueSource;
			var isMappingSource = source && source !== sourceEnum.None && source !== sourceEnum.ConstValue;
			var hasValue = !Ext.isEmpty(parameter.sourceValue.value);
			return isMappingSource && hasValue;
		}, this);
		var chainSteps = parameters.getItems().map(function(parameter) {
			const sourceValue = parameter.sourceValue;
			var value = sourceValue.value;
			var displayValue = sourceValue.displayValue = sourceValue.displayValue || new Terrasoft.LocalizableString();
			var schema = element.parentSchema || this;
			return function(next) {
				Terrasoft.FormulaParserUtils.getFormulaDisplayValue(value, schema,
					function(formulaDisplayValue, params, unrecognizedMacroses) {
						var isValid = Ext.isEmpty(unrecognizedMacroses);
						if (isValid) {
							displayValue.setValue(formulaDisplayValue);
						} else {
							parameter.setPropertyValue("isValid", isValid);
							element.setPropertyValue("isValid", isValid);
						}
						next();
					}, this);
			};
		}, this);
		chainSteps.push(function() {
			callback.call(scope);
		});
		Terrasoft.chain.apply(this, chainSteps);
	}

	//endregion

});
