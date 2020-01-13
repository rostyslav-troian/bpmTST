/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseProcessSchema", {
	extend: "Terrasoft.manager.BaseSchema",
	alternateClassName: "Terrasoft.BaseProcessSchema",

	mixins: {
		parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
	},

	//endregion

	//region Fields: Private

	/**
	 * Indicates whether this schema is actual version or not, not stored in metadata.
	 * @private
	 * @type {Boolean}
	 */
	_isActualVersion: null,

	//endregion

	//region Properties: Protected

	/**
	 * Process element class name.
	 * @abstract
	 * @protected
	 * @type {String}
	 */
	typeName: "Terrasoft.Core.Process.BaseProcessSchema",

	/**
	 * The name of server's contract object.
	 * @abstract
	 * @protected
	 * @type {String}
	 */
	contractName: null,

	/**
	 * Metadata of the schema.
	 * @protected
	 * @type {String}
	 */
	metaData: null,

	/**
	 * The name of manager.
	 * @protected
	 * @type {String}
	 */
	managerName: null,

	/**
	 * Element type caption.
	 * @abstract
	 * @protected
	 * @type {String}
	 */
	typeCaption: null,

	//endregion

	//region Properties: Public

	/**
	 * Created in the product version.
	 * @protected
	 * @type {String}
	 */
	createdInVersion: null,

	/**
	 * Parent schema unique identifier.
	 * @protected
	 * @type {String}
	 */
	parentSchemaUId: null,

	/**
	 * Gets whether the process is enabled.
	 * @protected
	 * @type {Boolean}
	 */
	enabled: true,

	/**
	 * Gets or sets flag that indicates whether the process needs to be serialized to DB.
	 * @protected
	 * @type {Boolean}
	 */
	serializeToDB: false,

	/**
	 * Gets or sets flag that indicates whether the process needs to be serialized to memory.
	 * @protected
	 * @type {Boolean}
	 */
	serializeToMemory: true,

	/**
	 * Gets or sets flag that indicates whether the process needs to be logged.
	 * @protected
	 * @type {Boolean}
	 */
	isLogging: true,

	/**
	 * Gets or sets maximum number of process item repetitions.
	 * @protected
	 * @type {Number}
	 */
	maxLoopCount: 100,

	/**
	 * Element color.
	 * @abstract
	 * @protected
	 * @type {String}
	 */
	color: null,

	/**
	 * Schema validation info.
	 * @protected
	 * @type {Object}
	 */
	validationInfo: null,

	/**
	 * Schema properties validation results.
	 * @protected
	 * @type {Object[]}
	 */
	validationResults: null,

	/**
	 * Process elements.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	flowElements: null,

	/**
	 * Flag that indicates whether schema is valid.
	 * @protected
	 * @type {Boolean}
	 */
	isValid: true,

	/**
	 * Parameter mappings.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	mappings: null,

	/**
	 * Base process schema active version property that is stored in metadata.
	 * @protected
	 * @type {Boolean}
	 */
	isActiveVersion: true,

	/**
	 * Base process schema delivered property.
	 * @protected
	 * @type {Boolean}
	 */
	isDelivered: false,

	/**
	 * Version number of the current schema.
	 * @protected
	 * @type {Integer}
	 */
	version: 0,

	/**
	 * Schema parameter that represents the caption of process notification.
	 * @protected
	 * @type {Terrasoft.ProcessSchemaParameter}
	 */
	notificationCaption: null,

	/**
	 * Gets or sets value that indicates whether is needed system security context.
	 * @protected
	 * @type {Boolean}
	 */
	useSystemSecurityContext: false,

	/**
	 * Indicates whether schema supports notification caption property.
	 * @protected
	 */
	useNotificationCaption: true,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.validationResults = [];
		this.mixins.parametrizedProcessSchemaElement.constructor.call(this);
		this.addEvents(
			"parameterAdded",
			"parameterRemoved"
		);
		this._initNotificationCaption();
	},

	//endregion

	//region Methods: Private

	/**
	 * Initialize notification caption property.
	 * @private
	 */
	_initNotificationCaption: function() {
		if (!this.useNotificationCaption) {
			return;
		}
		const notificationCaption = this._createNotificationCaption();
		const notificationCaptionMetaData = this.notificationCaption;
		if (notificationCaptionMetaData) {
			const targetSourceValue = notificationCaption.sourceValue;
			const currentSourceValue = notificationCaptionMetaData.sourceValue;
			targetSourceValue.source = currentSourceValue.source;
			targetSourceValue.value = currentSourceValue.value;
		}
		this.notificationCaption = notificationCaption;
	},

	/**
	 * Creates notification caption property.
	 * @private
	 * @return {Terrasoft.ProcessSchemaParameter} Instance of the process schema parameter.
	 */
	_createNotificationCaption: function() {
		const designerResources = Terrasoft.Resources.ProcessSchemaDesigner;
		const localizableStringCaption = Ext.create("Terrasoft.LocalizableString",
				designerResources.Parameters.NotificationCaption);
		const constants = Terrasoft.process.constants;
		const templateValue = constants.LEFT_MACROS_BRACKET + "{0}" + constants.RIGHT_MACROS_BRACKET;
		const localizableStringDisplayValue = Ext.create("Terrasoft.LocalizableString",
			Ext.String.format(templateValue, designerResources.PropertyNames.Caption));
		return Ext.create("Terrasoft.ProcessSchemaParameter", {
			"uId": "cdd58be7-2dba-4a5e-869b-1ad5d6d7513a",
			"name": "NotificationCaption",
			"caption": localizableStringCaption,
			"dataValueType": Terrasoft.DataValueType.TEXT,
			"createdInSchemaUId": this.uId,
			"modifiedInSchemaUId": this.uId,
			"sourceValue": {
				"source": Terrasoft.ProcessSchemaParameterValueSource.Script,
				"value": Ext.String.format(templateValue, constants.CAPTION_PROPERTY_VALUE_MACROS),
				"displayValue": localizableStringDisplayValue
			},
			processFlowElementSchema: this
		});
	},

	/**
	 * Internal validation of schema.
	 * @private
	 * @return {Object[]} Validation results.
	 */
	internalValidate: function() {
		return this.mixins.parametrizedProcessSchemaElement.validateParameters.apply(this, arguments);
	},

	/**
	 * Fills validation info object with validation results of items collection.
	 * @param {Terrasoft.Collection} itemsCollection Items collection.
	 * @param {Object} validationInfo Schema validation info.
	 * @param {String} validationInfo.uId Schema uId.
	 * @param {String} validationInfo.displayValue Schema display value.
	 * @param {Object[]} validationInfo.itemsValidationInfo Schema items validation info.
	 * @private
	 */
	collectValidationResults: function(itemsCollection, validationInfo) {
		itemsCollection.each(function(item) {
			let itemValidationResults = item.validationResults;
			if (item.isValid === false && Ext.isEmpty(itemValidationResults)) {
				const requirePropertyValidationMessage =
					Terrasoft.Resources.ProcessSchemaDesigner.Messages.ProcessSchemaElementRequirePropertyValidation;
				itemValidationResults = [{
					validationType: Terrasoft.ValidationType.ERROR,
					message: requirePropertyValidationMessage
				}];
			}
			this.addValidationResult(validationInfo, item, itemValidationResults);
			const internalItemValidationResults = item.internalValidate();
			this.addValidationResult(validationInfo, item, internalItemValidationResults);
		}, this);
	},

	/**
	 * Validates schema by validation info.
	 * @param {Object} validationInfo Schema validation info.
	 * @param {String} validationInfo.uId Schema uId.
	 * @param {String} validationInfo.displayValue Schema display value.
	 * @param {Object[]} validationInfo.itemsValidationInfo Schema items validation info.
	 * @param {Terrasoft.ValidationType} validationErrorLevel Validation error level.
	 * @private
	 * @return {Boolean} True if schema valid, else false.
	 */
	getIsSchemaValid: function(validationInfo, validationErrorLevel) {
		let isValid = true;
		isValid = validationInfo.itemsValidationInfo.reduce(function(previousValue, itemValidationInfo) {
			return previousValue && this.getIsItemValid(itemValidationInfo, validationErrorLevel);
		}.bind(this), isValid);
		return isValid;
	},

	/**
	 * Returns item validation by its validation info.
	 * @param {Object} itemValidationInfo Item validation info.
	 * @param {String} itemValidationInfo.uId Item uId.
	 * @param {String} itemValidationInfo.displayValue Item display value.
	 * @param {Object[]} itemValidationInfo.validationResults Item validation results.
	 * @param {Terrasoft.ValidationType} validationErrorLevel Validation error level.
	 * @private
	 * @return {Boolean} True if item valid, else false.
	 */
	getIsItemValid: function(itemValidationInfo, validationErrorLevel) {
		let isValid = true;
		isValid = itemValidationInfo.validationResults.reduce(function(previousValue, itemValidationResult) {
			return previousValue && this.isResultValid(itemValidationResult.validationType, validationErrorLevel);
		}.bind(this), isValid);
		return isValid;
	},

	/**
	 * Checks if validation type is valid with specified validation error level.
	 * @param {Terrasoft.ValidationType} validationType Validation type to check.
	 * @param {Terrasoft.ValidationType} validationErrorLevel Validation error level.
	 * @private
	 * @return {Boolean} True if valid, else false.
	 */
	isResultValid: function(validationType, validationErrorLevel) {
		const expectedValidationTypes = [Terrasoft.ValidationType.ERROR];
		switch (validationErrorLevel) {
			case Terrasoft.ValidationType.ERROR:
				break;
			case Terrasoft.ValidationType.WARNING:
				expectedValidationTypes.push(Terrasoft.ValidationType.WARNING);
				break;
			case Terrasoft.ValidationType.INFO:
				expectedValidationTypes.push(Terrasoft.ValidationType.WARNING);
				expectedValidationTypes.push(Terrasoft.ValidationType.INFO);
				break;
			default:
				break;
		}
		return !Ext.Array.contains(expectedValidationTypes, validationType);
	},

	/**
	 * Returns item validation info in validation info object. If item validation info not found, creates it.
	 * @param {Object} validationInfo Schema validation info.
	 * @param {String} validationInfo.uId Schema uId.
	 * @param {String} validationInfo.displayValue Schema display value.
	 * @param {Object[]} validationInfo.itemsValidationInfo Schema items validation info.
	 * @param {Terrasoft.ProcessBaseElementSchema} item Schema item.
	 * @private
	 * @return {Object} Item validation info.
	 */
	forceGetItemValidationInfo: function(validationInfo, item) {
		let itemValidationInfo = this.findItemValidationInfo(validationInfo, item);
		if (!itemValidationInfo) {
			const displayValue = item.validationInfoCaption || item.getDisplayValue();
			itemValidationInfo = {
				displayValue: displayValue,
				uId: item.uId,
				validationResults: []
			};
			validationInfo.itemsValidationInfo.push(itemValidationInfo);
		}
		return itemValidationInfo;
	},

	/**
	 * Adds item validation result to validation info.
	 * @param {Object} validationInfo Schema validation info.
	 * @param {String} validationInfo.uId Schema uId.
	 * @param {String} validationInfo.displayValue Schema display value.
	 * @param {Object[]} validationInfo.itemsValidationInfo Schema items validation info.
	 * @param {Terrasoft.BaseProcessSchema} item Schema item.
	 * @param {Object[]} itemValidationResults Item validation result.
	 * @private
	 */
	addValidationResult: function(validationInfo, item, itemValidationResults) {
		const itemValidationInfo = this.forceGetItemValidationInfo(validationInfo, item);
		Ext.Array.push(itemValidationInfo.validationResults, itemValidationResults);
	},

	/**
	 * Returns item validation info in validation info object.
	 * @param {Object} schemaValidationInfo Schema validation info.
	 * @param {String} schemaValidationInfo.uId Schema uId.
	 * @param {String} schemaValidationInfo.displayValue Schema display value.
	 * @param {Object[]} schemaValidationInfo.itemsValidationInfo Schema items validation info.
	 * @param {Terrasoft.ProcessBaseElementSchema} item Schema item.
	 * @private
	 * @return {Object/Null} Item validation info.
	 */
	findItemValidationInfo: function(schemaValidationInfo, item) {
		let itemValidationInfo = null;
		schemaValidationInfo.itemsValidationInfo.forEach(function(validationInfo) {
			const isValidationInfoFound = (validationInfo.uId === item.uId);
			if (isValidationInfoFound) {
				itemValidationInfo = validationInfo;
			}
			return !isValidationInfoFound;
		}, this);
		return itemValidationInfo;
	},

	/**
	 * Finds elements that are linked with the schema elements.
	 * @param {Array} itemNameList Array names of elements.
	 * @return {Array}
	 */
	findLinksToElements: function(itemNameList) {
		let links = [];
		let elementsName = [];
		itemNameList.forEach(function(itemName) {
			const elementChildrenName = this.findElementChildrenName(itemName);
			elementsName = elementsName.concat(elementChildrenName);
			elementsName.push(itemName);
		}, this);
		elementsName.every(function(name) {
			const element = this.findItemByName(name);
			const parameters = element.parameters;
			if (!parameters || parameters.getCount() === 0) {
				return true;
			}
			parameters.each(function(parameter) {
				const linksFlowElements = this.findLinksToFlowElement(parameter, elementsName);
				const linksSchemaParameters = this.findLinksToParameters(parameter, this.parameters);
				links = links.concat(linksFlowElements, linksSchemaParameters);
			}, this);
			return true;
		}, this);
		return links;
	},

	/**
	 * Finds elements that are linked with the schema parameter.
	 * @private
	 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
	 * @return {Array}.
	 */
	findLinksToSchemaParameter: function(parameter) {
		const linksFlowElements = this.findLinksToFlowElement(parameter);
		const linksSchemaParameters = this.findLinksToParameters(parameter, this.parameters);
		const links = linksFlowElements.concat(linksSchemaParameters);
		return links;
	},

	/**
	 * Finds elements that are linked with parameter.
	 * @private
	 * @param {Terrasoft.ProcessSchemaParameter} sourceParameter Parameter.
	 * @param {Terrasoft.ProcessSchemaParameterCollection} parameters Collection of parameters.
	 * @return {Array}.
	 */
	findLinksToParameters: function(sourceParameter, parameters) {
		const links = [];
		parameters.each(function(parameter) {
			if (parameter.uId === sourceParameter.uId || parameter.forceRemove) {
				return;
			}
			const mappingValue = parameter.getMappingValue();
			const value = mappingValue.value;
			if (this._getIsDependentParameterValueFromParameter(value, sourceParameter)) {
				const element = parameter.processFlowElementSchema;
				links.push({
					sourceParameter: sourceParameter,
					dependentElement: element,
					dependentParameter: parameter
				});
			}
		}, this);
		return links;
	},

	/**
	 * @private
	 */
	_getIsDependentParameterValueFromParameter: function(value, parameter) {
		let result = false;
		if (value && !Ext.isBoolean(value)) {
			if (this.getIsProcessSchemaParameter(parameter)) {
				result = Terrasoft.includes(value, parameter.uId);
			} else {
				const element = parameter.processFlowElementSchema;
				const template = Terrasoft.process.constants.PARAMETER_METAPATH_TEMPLATE;
				const metaPath = Ext.String.format(template, element.uId, parameter.uId);
				result = Terrasoft.includes(value, metaPath);
			}
		}
		return result;
	},

	/**
	 * Finds child element names for flows elements.
	 * @private
	 * @param {String} parentElementName Element name.
	 * @return {Array}.
	 */
	findElementChildrenName: function(parentElementName) {
		let children = [];
		const flowElements = this.flowElements.filterByFn(function(flowElement) {
			return flowElement.parent === parentElementName;
		}, this);
		flowElements.each(function(flowElement) {
			children.push(flowElement.name);
			const elementChildrenName = this.findElementChildrenName(flowElement.name);
			children = children.concat(elementChildrenName);
		}, this);
		return children;
	},

	/**
	 * Returns message.
	 * @private
	 * @param {Array} elementLinks Links of elements.
	 * @return {String}
	 */
	getInvalidRemoveElementMessage: function(elementLinks) {
		let message = "";
		elementLinks.every(function(link) {
			if (message !== "") {
				message += "\r\r";
			}
			message += this.getInvalidRemoveElementLinkMessage(link);
			return message;
		}, this);
		return message;
	},

	/**
	 * Returns link element remove message.
	 * @private
	 * @param {Object} link Element link.
	 * @return {String}
	 */
	getInvalidRemoveElementLinkMessage: function(link) {
		let message = "";
		const messages = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
		const sourceParameter = link.sourceParameter;
		const removeElement = sourceParameter.processFlowElementSchema;
		const removeElementCaption = removeElement.caption.getValue() || removeElement.name;
		const removeParameterCaption = sourceParameter.caption.getValue() || sourceParameter.name;
		const dependentElement = link.dependentElement;
		const dependentElementCaption = dependentElement.caption.getValue() || dependentElement.name;
		const isSourceSchemaParameter = this.parameters.contains(sourceParameter.uId);
		const dependentParameter = link.dependentParameter;
		if (!dependentParameter) {
			message += isSourceSchemaParameter
				? Ext.String.format(messages.InvalidRemoveSchemaParameterUsedinElement,
					removeParameterCaption, dependentElementCaption)
				: Ext.String.format(messages.InvalidRemoveParameterUsedinElement,
					removeParameterCaption, removeElementCaption, dependentElementCaption);
			return message;
		}
		const isDependentSchemaParameter = this.parameters.contains(dependentParameter.uId);
		const dependentParameterCaption = dependentParameter.caption.getValue() || dependentParameter.name;
		if (isSourceSchemaParameter) {
			message += isDependentSchemaParameter
				? Ext.String.format(messages.InvalidRemoveSchemaParameterUsedinSchemaParameter,
					removeParameterCaption, dependentParameterCaption)
				: Ext.String.format(messages.InvalidRemoveSchemaParameterUsedinParameter,
					removeParameterCaption, dependentParameterCaption, dependentElementCaption);
		} else {
			message += isDependentSchemaParameter
				? Ext.String.format(messages.InvalidRemoveElementUsedinSchemaParameter, removeParameterCaption,
					removeElementCaption, dependentParameterCaption)
				: Ext.String.format(messages.InvalidRemoveElementUsedinParameter,
					removeParameterCaption, removeElementCaption, dependentParameterCaption, dependentElementCaption);
		}
		return message;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns edit page schema name.
	 * @throws {Terrasoft.NotImplementedException}
	 * @param {Function} callback Callback function.
	 * @param {String} callback.editPageSchemaName Edit page schema name.
	 * @param {Object} scope Callback function scope.
	 * @abstract
	 * @protected
	 */
	getEditPageSchemaName: Terrasoft.abstractFn,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		const baseSerializableProperties = this.callParent(arguments);
		const serializableProperties = Ext.Array.push(baseSerializableProperties, ["typeName", "isLogging",
			"serializeToDB", "serializeToMemory", "maxLoopCount", "enabled", "isValid", "parentSchemaUId",
			"isActiveVersion", "isDelivered", "version", "notificationCaption", "useSystemSecurityContext"]);
		return serializableProperties;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#loadLocalizableValues
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.loadParametersLocalizableValues.call(this, localizableValues);
		if (!this.useNotificationCaption || !localizableValues) {
			return;
		}
		const notificationCaption = this.notificationCaption;
		const notificationCaptionLocalizableValues = localizableValues[notificationCaption.name];
		notificationCaption.loadLocalizableValues.call(notificationCaption, notificationCaptionLocalizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#loadLocalizableValuesByUIds
	 * @override
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement
			.loadParametersLocalizableValuesByUIds.call(this, localizableValues);
		if (!this.useNotificationCaption){
			return;
		}
		const notificationCaption = this.notificationCaption;
		notificationCaption.loadLocalizableValuesByUIds.call(notificationCaption, localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getLocalizableValues
	 * @override
	 */
	getLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.getParametersLocalizableValues.call(this, localizableValues);
		if (!this.useNotificationCaption) {
			return;
		}
		const notificationCaption = this.notificationCaption;
		notificationCaption.getLocalizableValues.call(notificationCaption, localizableValues);
	},

	/**
	 * Returns header image config of the property page.
	 * @throws {Terrasoft.NotImplementedException}
	 * @abstract
	 * @protected
	 * @return {Object} Image config.
	 */
	getTitleImage: Terrasoft.abstractFn,

	/**
	 * Collect schema items validation results in validation info object.
	 * @param {Object} validationInfo Schema validation info.
	 * @param {String} validationInfo.uId Schema uId.
	 * @param {String} validationInfo.displayValue Schema display value.
	 * @param {Object[]} validationInfo.itemsValidationInfo Schema items validation info.
	 * @abstract
	 * @protected
	 */
	collectItemsValidationResults: Terrasoft.abstractFn,

	/**
	 * Initialize mappings.
	 * @protected
	 */
	initMappings: function() {
		const mappingsMetaData = this.mappings || [];
		const mappings = this.mappings = Ext.create("Terrasoft.Collection");
		Terrasoft.each(mappingsMetaData, function(mappingMetaData) {
			if (mappingMetaData.createdInSchemaUId !== this.uId) {
				const key = mappingMetaData.name;
				if (this.inheritedElements.contains(key)) {
					return;
				}
				this.inheritedElements.add(key, mappingMetaData);
				return;
			}
			const targetUId = mappingMetaData.targetUId;
			if (mappings.find(targetUId)) {
				const error = Ext.String.format(
					"Process mapping for parameter with UId \"{0}\" already exists", targetUId);
				this.log(error, Terrasoft.LogMessageType.ERROR);
			} else {
				mappings.add(targetUId, mappingMetaData);
			}
		}, this);
	},

	/**
	 * Finds parameter mapping.
	 * @protected
	 * @param {String} uId Parameter identifier.
	 * @return {Object}
	 */
	findMappingByTargetUId: function(uId) {
		return this.mappings.find(uId);
	},

	/**
	 * Removes mapping information for item.
	 * @protected
	 * @param {Terrasoft.ProcessUserTaskSchema} item Parametrized process schema item.
	 */
	removeMapping: function(item) {
		if (!item.parameters) {
			return;
		}
		item.parameters.each(function(parameter) {
			this.mappings.removeByKey(parameter.uId);
		}, this);
	},

	/**
	 * Finds elements that are linked with flow Element.
	 * @protected
	 * @param {Terrasoft.ProcessSchemaParameter} sourceParameter Parameter.
	 * @param {Array} excludedElementsNames Array of element names are excluded from the search.
	 * @return {Array}.
	 */
	findLinksToFlowElement: function(sourceParameter, excludedElementsNames) {
		let links = [];
		this.flowElements.each(function(flowElement) {
			if (excludedElementsNames && excludedElementsNames.indexOf(flowElement.name) > -1) {
				return;
			}
			const parameters = flowElement.parameters;
			if (!parameters) {
				return;
			}
			const linksToParameters = this.findLinksToParameters(sourceParameter, parameters);
			links = links.concat(linksToParameters);
		}, this);
		return links;
	},

	//endregion

	//region Methods: Public

	/**
	 * Search process item by name.
	 * @param {String} name Item name.
	 * @abstract
	 */
	findItemByName: Terrasoft.abstractFn,

	/**
	 * Returns item by identifier.
	 * @param {String} uId Item identifier.
	 * @return {Terrasoft.ProcessBaseElementSchema} Process item.
	 */
	findItemByUId: Terrasoft.abstractFn,

	/**
	 * Removes item from schema.
	 * @param {String} itemKey Item identifier.
	 * @abstract
	 */
	remove: Terrasoft.abstractFn,

	/**
	 * Checks that schema contains item with passed name.
	 * @param {String} itemKey Item identifier.
	 * @return {Boolean} Check result.
	 * @abstract
	 */
	contains: Terrasoft.abstractFn,

	/**
	 * Validates the schema.
	 * @param {Terrasoft.ValidationType} [validationErrorLevel=Terrasoft.ValidationType.ERROR] Validation error level.
	 * @return {Boolean} Returns true if schema is valid, else false.
	 */
	validate: function(validationErrorLevel) {
		const validationType = validationErrorLevel || Terrasoft.ValidationType.ERROR;
		const validationInfo = {
			uId: this.uId,
			displayValue: this.getDisplayValue(),
			itemsValidationInfo: []
		};
		this.addValidationResult(validationInfo, this, this.validationResults);
		const internalSchemaValidationResults = this.internalValidate();
		this.addValidationResult(validationInfo, this, internalSchemaValidationResults);
		this.collectItemsValidationResults(validationInfo);
		this.validationInfo = validationInfo;
		return this.getIsSchemaValid(validationInfo, validationType);
	},

	/**
	 * Returns items validation info with filtered validation results by validation error level.
	 * @param {Terrasoft.ValidationType} [validationErrorLevel=Terrasoft.ValidationType.ERROR] Validation error level.
	 * @return {Object[]} Items validation results.
	 */
	getValidationResults: function(validationErrorLevel) {
		if (!this.validationInfo) {
			this.validate();
		}
		const validationInfo = this.validationInfo;
		const validationType = validationErrorLevel || Terrasoft.ValidationType.ERROR;
		const result = [];
		validationInfo.itemsValidationInfo.forEach(function(itemValidationInfo) {
			const itemValidationResults = [];
			itemValidationInfo.validationResults.forEach(function(itemValidationResult) {
				if (!this.isResultValid(itemValidationResult.validationType, validationType)) {
					itemValidationResults.push(Terrasoft.deepClone(itemValidationResult));
				}
			}, this);
			if (!Ext.isEmpty(itemValidationResults)) {
				result.push({
					uId: itemValidationInfo.uId,
					displayValue: itemValidationInfo.displayValue,
					validationResults: itemValidationResults
				});
			}
		}, this);
		return result;
	},

	/**
	 * Synchronizes element instance parameters with element schema parameters.
	 * @param {Terrasoft.ProcessUserTaskSchema} element Process element.
	 * @protected
	 */
	synchronizeParameters: function(element) {
		if (!element.parameters) {
			return;
		}
		element.synchronizeParameters(element.schema);
	},

	/**
	 * Synchronizes element instance parameters with element schema dynamic parameters.
	 * @protected
	 */
	synchronizeDynamicParameters: function() {
		this.flowElements.each(function(flowElement) {
			if (flowElement.isUserTask) {
				flowElement.synchronizeDynamicParameters();
			}
		}, this);
	},

	/**
	 * Returns flag indicating that parameter is schema parameter.
	 * @protected
	 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
	 * @returns {Boolean}
	 */
	getIsProcessSchemaParameter: function(parameter) {
		return parameter.processFlowElementSchema.uId === this.uId;
	},

	/**
	 * Changes parameter mapping.
	 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
	 */
	changeMapping: function(parameter) {
		const mappingInfo = this.findMappingByTargetUId(parameter.uId);
		if (mappingInfo) {
			mappingInfo.source = parameter.cloneSourceValue();
			mappingInfo.modifiedInSchemaUId = this.uId;
			this.fireEvent("changed", {
				item: mappingInfo
			});
		}
	},

	/**
	 * Determines the possibility of removing elements.
	 * @param {Array} removedItems Array of element names.
	 * @return {{canRemove: boolean, validationInfo: string}}
	 */
	canRemoveElements: function(removedItems) {
		const links = this.findLinksToElements(removedItems);
		const result = {
			canRemove: true
		};
		if (links.length > 0) {
			result.canRemove = false;
			result.validationInfo = this.getInvalidRemoveElementMessage(links);
		}
		return result;
	},

	/**
	 * Determines the possibility of removing parameter.
	 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
	 * @return {{canRemove: boolean, validationInfo: string}}
	 */
	canRemoveParameter: function(parameter) {
		const links = this.findLinksToSchemaParameter(parameter);
		const result = {
			canRemove: true
		};
		if (links.length > 0) {
			result.canRemove = false;
			result.validationInfo = this.getInvalidRemoveElementMessage(links);
		}
		return result;
	},

	/**
	 * Returns parameters that support lazy load in format {element.uId}.{parameter.uId}.
	 * param {Boolean} isLoaded Indicates whether lazy load is loaded.
	 * @return {Array}
	 */
	getLazyProperties: function(isLoaded) {
		const lazyProperties = [];
		this.flowElements.each(function(element) {
			if (!Ext.isEmpty(element.parameters)) {
				const elementLazyParameters = isLoaded ? element.getLoadedLazyParameters() : element.getLazyParameters();
				elementLazyParameters.each(function(parameter) {
					lazyProperties.push(Ext.String.format("{0}.{1}", element.uId, parameter.uId));
				});
			}
		});
		return lazyProperties;
	},

	/**
	 * Returns true if there are any unloaded property in process schema.
	 * @returns {Boolean} True if there are any unloaded property in process schema.
	 */
	getAllLazyPropertiesAreLoaded: function() {
		let result = this.getAllLazyParametersAreLoaded();
		if (result) {
			const notLoadedElements = this.flowElements.filterByFn(function(element) {
				if (element.hasLazyParameters) {
					return !element.getAllLazyParametersAreLoaded();
				}
				return false;
			}, this);
			result = notLoadedElements.getCount() === 0;
		}
		return result;
	},

	/**
	 * Returns parameters that support lazy load and loaded in format {element.uId}.{parameter.uId}.
	 * @return {Array}
	 */
	getLoadedLazyProperties: function() {
		return this.getLazyProperties(true);
	},

	/**
	 * Clear lazy load parameter values.
	 */
	clearLazyParametersValues: function() {
		this.flowElements.each(function(element) {
			if (element.hasLazyParameters) {
				element.clearLazyParameterValues();
			}
		});
	},

	/**
	 * Loads all lazy properties in process schema.
	 * @private
	 * @param {Function} callback Callback after load.
	 * @param {Object} scope Callback scope.
	 */
	loadAllLazyProperties: function(callback, scope) {
		this.loadLazyParameters(function() {
			Terrasoft.eachAsync(this.flowElements.getItems(), function(element, next) {
				if (element.hasLazyParameters) {
					element.loadLazyParameters(next, scope);
				} else {
					next();
				}
			}, callback, scope);
		}, this);
	},

	/**
	 * Returns server method name for validate formula.
	 * @abstract
	 * @return {String}
	 */
	getValidateFormulaServerMethodName: Terrasoft.abstractFn,

	/**
	 * Returns true if current schema is actual version, otherwise false.
	 * @returns {Boolean}
	 */
	getIsActualVersion: function(){
		return this._isActualVersion === null ? this.isActiveVersion : this._isActualVersion;
	},

	/**
	 * Marks this instance as actual version.
	 * @param {Boolean} value
	 */
	setIsActualVersion: function(value) {
		this._isActualVersion = value;
	}


	//endregion

});
