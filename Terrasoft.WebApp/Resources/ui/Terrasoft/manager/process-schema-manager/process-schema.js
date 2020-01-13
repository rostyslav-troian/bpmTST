/**
 */
Ext.define("Terrasoft.manager.ProcessSchema", {
	extend: "Terrasoft.BaseProcessSchema",
	alternateClassName: "Terrasoft.ProcessSchema",

	//region Properties: Protected

	/**
	 * Name of the manager for accessing process elements.
	 * @protected
	 * @type {String}
	 */
	elementSchemaManagerName: "ProcessFlowElementSchemaManager",

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#contractName
	 * @override
	 */
	contractName: "ContractProcessSchema",

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#managerName
	 * @override
	 */
	managerName: "ProcessSchemaManager",

	/**
	 * Schema methods.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	methods: null,

	/**
	 * Default link color.
	 * @protected
	 * @type {String}
	 */
	sequenceFlowStrokeDefColor: "FFBBBBBB",

	/**
	 * The default fill color.
	 * @protected
	 * @type {String}
	 */
	taskFillDefColor: "FFFFFFFF",

	/**
	 * The usings collection is used for compatibility with the old designer.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	usings: null,

	/**
	 *Associations.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	associations: null,

	/**
	 * The metadata of the process created in the fast designer.
	 * @protected
	 * @type {String}
	 */
	quickModelData: null,

	/**
	 * The schema ID in which the element was created.
	 * @protected
	 * @type {String}
	 */
	createdInSchemaUId: null,

	/**
	 * The schema ID in which the element was changed.
	 * @protected
	 * @type {String}
	 */
	modifiedInSchemaUId: null,

	/**
	 * The identifier of the package in which the item was created.
	 * @protected
	 * @type {String}
	 */
	createdInPackageId: null,

	/**
	 * Group.
	 * @protected
	 * @type {Terrasoft.ObjectCollection}
	 */
	group: null,

	/**
	 * Object unique Id.
	 * @protected
	 * @type {String}
	 */
	entitySchemaUId: null,

	/**
	 * Flag of the state of the chart display.
	 * @protected
	 * @type {Boolean}
	 */
	isExpanded: false,

	/**
	 * A flag whether the scheme was created in the new designer.
	 * @protected
	 * @type {Boolean}
	 */
	isCreatedInSvg: false,

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchema",

	/**
	 * Mode of using the process.
	 * @protected
	 * @type {Terrasoft.ProcessSchemaUsageType}
	 */
	usageType: Terrasoft.ProcessSchemaUsageType.ADVANCED,

	/**
	 * Unique Id for the parameters page.
	 * @protected
	 * @type {String}
	 */
	parametersEditPageSchemaUId: null,

	/**
	 * Tag.
	 * @protected
	 * @type {String}
	 */
	tag: null,

	/**
	 * Localized strings.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	localizableStrings: null,

	/**
	 * Pools.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	laneSets: null,

	/**
	 * Tracks.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	lanes: null,

	/**
	 * Artifacts.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	artifacts: null,

	/**
	 * The execution context.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	executionContexts: null,

	/**
	 * Coordinates for broken threads.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	polylinePointPositions: null,

	/**
	 * Parameters of process elements.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	flowElementsParameters: null,

	/**
	 * A flag of the process created by the master.
	 * @protected
	 * @type {Terrasoft.Boolean}
	 */
	isQuickModel: false,

	/**
	 * A flag of the built-in object process.
	 * @protected
	 * @type {Boolean}
	 */
	isEmbedded: false,

	/**
	 * Culture name.
	 * @protected
	 * @type {String}
	 */
	cultureName: null,

	/**
	 * A flag of the interpreted process.
	 * @protected
	 * @type {Terrasoft.Boolean}
	 */
	isInterpretable: false,

	/**
	 * Elements of inherited processes.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	inheritedElements: null,

	/**
	 * A flag of compulsory compilation of a process schema.
	 * @protected
	 * @type {Boolean}
	 */
	useForceCompile: false,

	/**
	 * Source of process methods designed by user.
	 * @protected
	 * @type {String}
	 */
	methodsBody: "",

	/**
	 * Source of compiled process methods designed by user.
	 * @protected
	 * @type {String}
	 */
	compiledMethodsBody: "",

	/**
	 * List of process properties that require compilation.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	validatorInfo: null,

	/**
	 * Validator message.
	 * @protected
	 * @type {String}
	 */
	validatorMessage: "",

	/**
	 * The name of the image resource manager.
	 * @protected
	 * @type {String}
	 */
	resourceManagerName: "Terrasoft.Nui",

	/**
	 * The name of the image resource in the header of the property page.
	 * @protected
	 * @type {String}
	 */
	titleImageName: "process_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#typeCaption
	 * @override
	 */
	typeCaption: Terrasoft.Resources.ProcessSchemaDesigner.TypeCaption,

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#color
	 * @override
	 */
	color: "#00AEEF",

	/**
	 * Process schema changed items. Uses to check for compilation.
	 * @type {Object}
	 */
	changedItems: null,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.changedItems = {};
		this.inheritedElements = Ext.create("Terrasoft.Collection");
		this.initMappings();
		this.initLaneSets();
		this.initFlowElements();
		this.initUsings();
		this.synchronizeDynamicParameters();
	},

	//endregion

	//region Methods: Private

	/**
	 * Initialize process pools.
	 * @private
	 */
	initLaneSets: function() {
		var laneSetsMetaData = this.laneSets || [];
		var laneSets = this.laneSets = Ext.create("Terrasoft.Collection");
		var lanes = this.lanes = Ext.create("Terrasoft.Collection");
		laneSetsMetaData.forEach(function(laneSetMetaData) {
			if (laneSetMetaData.createdInSchemaUId !== this.uId) {
				this.inheritedElements.add(laneSetMetaData.name, laneSetMetaData);
				return;
			}
			var laneSet = this.createItemInstance(laneSetMetaData);
			laneSets.add(laneSet.name, laneSet);
			laneSet.lanes.each(function(lane) {
				lanes.add(lane.name, lane);
			}, this);
		}, this);
	},

	/**
	 * Initialize flow elements.
	 * @private
	 */
	initFlowElements: function() {
		var flowElementsMetaData = this.flowElements || [];
		var flowElements = this.flowElements = Ext.create("Terrasoft.Collection");
		flowElementsMetaData.forEach(function(flowElementMetaData) {
			if (flowElementMetaData.createdInSchemaUId !== this.uId) {
				this.addInheritedElements(flowElementMetaData);
				return;
			}
			flowElementMetaData = Terrasoft.deepClone(flowElementMetaData);
			flowElementMetaData.parentSchema = this;
			var flowElement = this.createItemInstance(flowElementMetaData);
			var lane = this.findItemLane(flowElement);
			flowElement.parent = lane ? lane.name : null;
			flowElements.add(flowElement.name, flowElement);
		}, this);
	},

	/**
	 * Initializes collection of using.
	 * @private
	 */
	initUsings: function() {
		var usingsMetaData = this.usings || [];
		var usings = this.usings = Ext.create("Terrasoft.Collection");
		usingsMetaData.forEach(function(usingMetaData) {
			if (usingMetaData.createdInSchemaUId === this.uId) {
				var using = Ext.create("Terrasoft.SchemaUsing", usingMetaData);
				usings.add(using.uId, using);
			}
		}, this);
	},

	/**
	 * Adds inherited elements to collections.
	 * @param {Object} flowElementMetaData Meta data of flow element.
	 */
	addInheritedElements: function(flowElementMetaData) {
		var key = flowElementMetaData.name;
		var inheritedElements = this.inheritedElements;
		if (inheritedElements.contains(key)) {
			return;
		}
		inheritedElements.add(key, flowElementMetaData);
		var flowElements = flowElementMetaData.flowElements;
		if (flowElements) {
			flowElements.forEach(function(item) {
				this.addInheritedElements(item);
			}, this);
		}
	},

	/**
	 * Fix items positions for process created in old designer in 5.x version.
	 * @param {Object} container Process schema container.
	 */
	fixPositionInContainer: function(container) {
		var flowElements = this.flowElements.filterByFn(function(flowElement) {
			return flowElement.containerUId === container.uId;
		});
		if (flowElements.getCount() === 0) {
			return;
		}
		flowElements.each(function(flowElement) {
			if (flowElement.isContainer && flowElement.isExpanded) {
				this.fixPositionInContainer(flowElement);
			}
		}, this);
		flowElements.sortByFn(function(item1, item2) {
			return item1.position.X - item2.position.X;
		});
		var lastRightElement = flowElements.getByIndex(flowElements.getCount() - 1);
		var diffX = lastRightElement.position.X + lastRightElement.width;
		flowElements.sortByFn(function(item1, item2) {
			return item1.position.Y - item2.position.Y;
		});
		var lastBottomElement = flowElements.getByIndex(flowElements.getCount() - 1);
		var diffY = lastBottomElement.position.Y + lastBottomElement.height + 18;
		container.width = container.width || 0;
		container.height = container.height || 0;
		if (container.width < diffX) {
			container.width = diffX;
		}
		if (container.height < diffY) {
			container.height = diffY;
		}
		if (container.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
			// Change the relative coordinates of the element to absolute
			flowElements.each(function(flowElement) {
				flowElement.position.Y += container.position.Y;
			}, this);
		}
	},

	/**
	 * Returns Lane of passed flow item.
	 * @param {Terrasoft.ProcessFlowElementSchema} flowElement Process item.
	 * @private
	 * @return {Terrasoft.ProcessLaneSchema|null} Process lane.
	 */
	findItemLane: function(flowElement) {
		if (flowElement.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
			return null;
		}
		var filteredCollection = this.lanes.filterByFn(function(lane) {
			return lane.uId === flowElement.containerUId;
		});
		if (filteredCollection.getCount() === 0) {
			return null;
		}
		return filteredCollection.getByIndex(0);
	},

	/**
	 * Process schema changed event handler. Checks changes of methodsBody and compiledMethodsBody properties.
	 * If this properties changed, register changes for compilation.
	 * @param {Object} changes Key-value pair of changes.
	 * @private
	 */
	onSchemaChanged: function(changes) {
		var itemUId = Terrasoft.generateGUID();
		var changeAction = Terrasoft.process.constants.ITEM_CHANGE_ACTION.MODIFY;
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
		if (changes.hasOwnProperty("methodsBody")) {
			this.addSchemaChangedItem(itemUId, resources.ProcessSchemaMethodsBodyCaption || "methodsBody", changeAction);
		}
		if (changes.hasOwnProperty("compiledMethodsBody")) {
			this.addSchemaChangedItem(itemUId,
				resources.CompiledProcessSchemaMethodsBodyCaption || "compiledMethodsBody", changeAction);
		}
	},

	/**
	 * Finds Formula Tasks that are linked with the parameter.
	 * @private
	 * @param {Terrasoft.ProcessSchemaParameter} sourceParameter Parameter.
	 * @param {Terrasoft.ProcessFlowElementSchema} formulaTask Flow element.
	 * @return {Object|null}.
	 */
	findLinkToFormulaTasks: function(sourceParameter, formulaTask) {
		if (!(formulaTask instanceof Terrasoft.ProcessFormulaTaskSchema)) {
			return null;
		}
		if (this._getIsDependentFormulaTaskFromParameter(formulaTask, sourceParameter)) {
			return {
				sourceParameter: sourceParameter,
				dependentElement: formulaTask
			};
		}
		return null;
	},

	/**
	 * @private
	 */
	_getIsDependentFormulaTaskFromParameter: function(formulaTask, parameter) {
		const body = formulaTask.body;
		let result = false;
		if (body) {
			const resultParameter = formulaTask.resultParameterMetaPath;
			const parameterUId = parameter.uId;
			if (this.getIsProcessSchemaParameter(parameter)) {
				result = Terrasoft.includes(body, parameterUId);
				if (!result && resultParameter) {
					result = Terrasoft.includes(resultParameter, parameterUId);
				}
			} else {
				const element = parameter.processFlowElementSchema;
				const elementUId = element.uId;
				const template = Terrasoft.process.constants.PARAMETER_METAPATH_TEMPLATE;
				const bodyMetaPath = Ext.String.format(template, elementUId, parameterUId);
				result = Terrasoft.includes(body, bodyMetaPath);
				if (!result && resultParameter) {
					const resultParameterMetaPath = Ext.String.format("{0}.{1}", elementUId, parameterUId);
					result = Terrasoft.includes(resultParameter, resultParameterMetaPath);
				}
			}
		}
		return result;
	},

	/**
	 * Finds Conditional Flows that are linked with the parameter.
	 * @private
	 * @param {Terrasoft.ProcessSchemaParameter} sourceParameter Parameter.
	 * @param {Terrasoft.ProcessFlowElementSchema} conditionalFlow Flow element.
	 * @param {Array} excludedElementsNames Array of element names are excluded from the search.
	 * @return {Object|null}.
	 */
	findLinkToConditionalFlow: function(sourceParameter, conditionalFlow, excludedElementsNames) {
		if (!(conditionalFlow instanceof Terrasoft.ProcessConditionalSequenceFlowSchema)) {
			return null;
		}
		var sourceElement = conditionalFlow.findSourceElement();
		var targetElement = conditionalFlow.findTargetElement();
		if (excludedElementsNames && (excludedElementsNames.indexOf(sourceElement.name) > -1 ||
				excludedElementsNames.indexOf(targetElement.name) > -1)) {
			return;
		}
		var conditionExpression = conditionalFlow.conditionExpression;
		if (conditionExpression && conditionExpression.indexOf(sourceParameter.uId) > -1) {
			return {
				sourceParameter: sourceParameter,
				dependentElement: conditionalFlow
			};
		}
		return null;
	},

	/**
	 * @private
	 */
	_isVersionSupported: function(version) {
		var trunkAppVersion = "0.0.0.0";
		var createdInAppVersion = "7.7.0.0";
		if (Ext.isEmpty(version)) {
			return true;
		}
		if (version === trunkAppVersion) {
			return true;
		}
		var schemaVersionParts = version.split(".");
		var createdInAppVersionParts = createdInAppVersion.split(".");
		for (var i = 0; i < schemaVersionParts.length; i++) {
			var schemaVersionPart = Number(schemaVersionParts[i]);
			var createdInAppVersionPart = Number(createdInAppVersionParts[i]);
			if (schemaVersionPart < createdInAppVersionPart) {
				return false;
			}
			if (schemaVersionPart > createdInAppVersionPart) {
				break;
			}
		}
		return true;
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchema#initEvents
	 * @protected
	 * @override
	 */
	initEvents: function() {
		this.on("changed", this.onSchemaChanged, this);
	},

	/**
	 * Checks item changes by uId.
	 * @param {String} itemUId Item identifier.
	 * @param {Terrasoft.process.constants.ITEM_CHANGE_ACTION} action Change action to check.
	 * @return {Boolean} True if changes for item registered, else false.
	 */
	isItemChangesRegistered: function(itemUId, action) {
		var changedItems = this.changedItems;
		var itemChanges = changedItems[itemUId];
		if (!itemChanges) {
			return false;
		}
		return itemChanges.action === action;
	},

	/**
	 * Deletes changes for item by uId
	 * @param {String} itemUId Item identifier.
	 */
	deleteItemChanges: function(itemUId) {
		delete this.changedItems[itemUId];
	},

	/**
	 * Deletes registration of all changes for process schema.
	 */
	deleteSchemaChanges: function() {
		this.changedItems = {};
	},

	/**
	 * Register changes for item by uId.
	 * @param {String} itemUId Item identifier.
	 * @param {String} caption Caption to display.
	 * @param {Terrasoft.process.constants.ITEM_CHANGE_ACTION} action Change action.
	 */
	addSchemaChangedItem: function(itemUId, caption, action) {
		var changedItems = this.changedItems;
		var changedItem = changedItems[itemUId];
		if (!changedItem) {
			changedItem = changedItems[itemUId] = {};
			changedItem.action = action;
			changedItem.caption = caption;
		}
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getEditPageSchemaName
	 * @override
	 * @param {Function} callback Callback function.
	 * @param {String} callback.editPageSchemaName Edit page schema name.
	 * @param {Object} scope Callback function scope.
	 */
	getEditPageSchemaName: function(callback, scope) {
		callback.call(scope, "ProcessSchemaPropertiesPage");
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.isCreatedInSvg = this.getSerializableProperty(true);
		this.setSerializableCollectionProperty(serializableObject, "usings");
		this.setSerializableCollectionProperty(serializableObject, "mappings");
		this.getSerializableLaneSets(serializableObject);
		serializableObject.flowElements = this.getSerializableFlowElements();
		this.mixins.parametrizedProcessSchemaElement.getSerializableObject.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		var serializableProperties = Ext.Array.push(baseSerializableProperties, ["createdInSchemaUId",
			"modifiedInSchemaUId", "createdInPackageId", "methods", "localizableStrings", "createdInVersion",
			"taskFillDefColor", "sequenceFlowStrokeDefColor", "artifacts", "associations", "isExpanded",
			"usageType", "parametersEditPageSchemaUId", "tag", "entitySchemaUId", "cultureName", "executionContexts",
			"isEmbedded", "isInterpretable", "useForceCompile", "methodsBody", "compiledMethodsBody"]);
		return serializableProperties;
	},

	/**
	 * Copies laneSets collection to serializableObject.
	 * @private
	 * @param {Object} serializableObject Serializable object.
	 */
	getSerializableLaneSets: function(serializableObject) {
		var laneSets = serializableObject.laneSets = [];
		this.laneSets.each(function(laneSet) {
			var laneSetMetaData = this.getSerializableProperty(laneSet);
			laneSets.push(laneSetMetaData);
		}, this);
	},

	/**
	 * Returns FlowElement collection serializable object sorted by element type.
	 * @protected
	 */
	getSerializableFlowElements: function() {
		var nodes = [];
		var connectors = [];
		this.flowElements.each(function(flowElement) {
			var container = this.findItemByUId(flowElement.containerUId) || {};
			if (!this.flowElements.contains(container.name)) {
				var flowElementMetaData = this.getSerializableProperty(flowElement);
				if (flowElement.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector) {
					connectors.push(flowElementMetaData);
				} else {
					nodes.push(flowElementMetaData);
				}
			}
		}, this);
		return nodes.concat(connectors);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#loadLocalizableValues
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		if (localizableValues.EventsProcessSchema) {
			localizableValues = localizableValues.EventsProcessSchema;
		}
		this.callParent(arguments);
		var laneSetsLocalizableValues = localizableValues.LaneSets || {};
		this.laneSets.each(function(laneSet) {
			var laneSetLocalizableValues = laneSetsLocalizableValues[laneSet.name];
			laneSet.loadLocalizableValues(laneSetLocalizableValues);
		}, this);
		var flowElementsLocalizableValues = localizableValues.BaseElements || {};
		this.flowElements.each(function(flowElement) {
			var flowElementLocalizableValues = flowElementsLocalizableValues[flowElement.name];
			flowElement.loadLocalizableValues(flowElementLocalizableValues);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#loadLocalizableValuesByUIds
	 * @override
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		this.callParent(arguments);
		if (!localizableValues) {
			return;
		}
		this.laneSets.each(function(laneSet) {
			laneSet.loadLocalizableValuesByUIds(localizableValues);
		}, this);
		this.flowElements.each(function(flowElement) {
			flowElement.loadLocalizableValuesByUIds(localizableValues);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getLocalizableValues
	 * @override
	 */
	getLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.laneSets.each(function(laneSet) {
			laneSet.getLocalizableValues(localizableValues);
		}, this);
		this.flowElements.each(function(flowElement) {
			flowElement.getLocalizableValues(localizableValues);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getTitleImage
	 * @override
	 */
	getTitleImage: function() {
		return {
			source: Terrasoft.ImageSources.RESOURCE_MANAGER,
			params: {
				resourceManagerName: this.resourceManagerName,
				resourceItemName: "ProcessSchemaDesigner." + this.titleImageName
			}
		};
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#collectItemsValidationResults
	 * @override
	 */
	collectItemsValidationResults: function(validationInfo) {
		this.collectValidationResults(this.laneSets, validationInfo);
		this.collectValidationResults(this.lanes, validationInfo);
		this.collectValidationResults(this.flowElements, validationInfo);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getFlowElements
	 * @override
	 */
	getFlowElements: function() {
		return this.flowElements;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#findLinksToFlowElement
	 * @override
	 */
	findLinksToFlowElement: function(sourceParameter, excludedElementsNames) {
		var links = this.callParent(arguments);
		this.flowElements.each(function(flowElement) {
			if (excludedElementsNames && excludedElementsNames.indexOf(flowElement.name) > -1) {
				return;
			}
			var linkFormula = this.findLinkToFormulaTasks(sourceParameter, flowElement);
			if (linkFormula) {
				links.push(linkFormula);
				return;
			}
			var linkConditionalFlow = this.findLinkToConditionalFlow(sourceParameter, flowElement, excludedElementsNames);
			if (linkConditionalFlow) {
				links.push(linkConditionalFlow);
			}
		}, this);
		return links;
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns instance by item configuration.
	 * @param {Object} item Item configuration.
	 * @return {Terrasoft.ProcessBaseElementSchema} Process schema item instance.
	 */
	createItemInstance: function(item) {
		var managerItemUId = item.managerItemUId ? item.managerItemUId : item.uId;
		return Terrasoft[this.elementSchemaManagerName].createInstance(managerItemUId, item);
	},

	/**
	 * Adds item to schema.
	 * @param {Terrasoft.manager.BaseProcessElementSchema} item Item to add.
	 * @throws Terrasoft.ItemAlreadyExistsException If schema contains item with same key, generates exception.
	 */
	add: function(item) {
		var itemName = item.name;
		if (this.contains(itemName)) {
			throw new Terrasoft.ItemAlreadyExistsException();
		}
		if (item instanceof Terrasoft.ProcessLaneSetSchema) {
			this.laneSets.add(item.name, item);
		} else if (item instanceof Terrasoft.ProcessLaneSchema) {
			var laneSet = this.findItemByUId(item.containerUId);
			item.laneSetUId = item.containerUId;
			item.parent = laneSet;
			laneSet.lanes.add(item.name, item);
			this.lanes.add(item.name, item);
		} else if (item instanceof Terrasoft.ProcessSequenceFlowSchema) {
			this.flowElements.add(item.name, item);
		} else {
			var lane = this.findItemLane(item);
			var parentName = lane ? lane.name : null;
			if (lane == null) {
				var itemContainer = this.findItemByUId(item.containerUId);
				parentName = itemContainer.name;
			}
			item.parent = parentName;
			this.flowElements.add(item.name, item);
		}
		item.createdInOwnerSchemaUId = this.uId;
		item.createdInSchemaUId = this.uId;
		item.modifiedInSchemaUId = this.uId;
		item.parentSchema = this;
		item.createdInPackageId = this.packageUId;
		this.synchronizeParameters(item);
		if (item.requireCompilation() === true) {
			var itemChangeAction = Terrasoft.process.constants.ITEM_CHANGE_ACTION;
			this.addSchemaChangedItem(item.uId, item.getDisplayValue(), itemChangeAction.ADD);
		}
		this.fireEvent("changed", {
			item: item
		});
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#remove
	 * @override
	 * @throws Terrasoft.ItemNotFoundException If schema doesn't contains item with passed key,
	 * generates exception.
	 */
	remove: function(itemKey) {
		if (!this.contains(itemKey)) {
			throw new Terrasoft.ItemNotFoundException();
		}
		var item = this.findItemByName(itemKey);
		var lanes = this.lanes;
		var flowElements = this.flowElements;
		if (lanes.contains(itemKey)) {
			lanes.removeByKey(itemKey);
		} else {
			if (flowElements.contains(itemKey)) {
				this.removeMapping(item);
				flowElements.removeByKey(itemKey);
			}
		}
		if (item.requireCompilation() === true) {
			var itemChangeAction = Terrasoft.process.constants.ITEM_CHANGE_ACTION;
			var isItemAddedInThisSession = this.isItemChangesRegistered(item.uId, itemChangeAction.ADD);
			if (isItemAddedInThisSession) {
				this.deleteItemChanges(item.uId);
			} else {
				this.addSchemaChangedItem(item.uId, item.getDisplayValue(), itemChangeAction.DELETE);
			}
		}
		this.fireEvent("changed", {
			itemName: itemKey
		});
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#contains
	 * @override
	 */
	contains: function(itemKey) {
		var result = this.flowElements.contains(itemKey);
		result = result || this.lanes.contains(itemKey);
		result = result || this.laneSets.contains(itemKey);
		return result;
	},

	/**
	 * Search process item by name. If item not found, returns null.
	 * @param {String} name Item name.
	 * @return {Terrasoft.ProcessBaseElementSchema|null} Process item.
	 */
	findItemByName: function(name) {
		var flowElements = this.flowElements;
		if (flowElements.contains(name)) {
			return flowElements.get(name);
		}
		var lanes = this.lanes;
		if (lanes.contains(name)) {
			return lanes.get(name);
		}
		var laneSets = this.laneSets;
		if (laneSets.contains(name)) {
			return laneSets.get(name);
		}
	},

	/**
	 * Returns process item by identifier.
	 * @param {String} uId Item identifier.
	 * @return {Terrasoft.ProcessBaseElementSchema} Process item.
	 */
	findItemByUId: function(uId) {
		var filterFunction = function(item) {
			return item.uId === uId;
		};
		var result = this.flowElements.filterByFn(filterFunction);
		if (result.getCount() === 0) {
			result = this.lanes.filterByFn(filterFunction);
		}
		if (result.getCount() === 0) {
			result = this.laneSets.filterByFn(filterFunction);
		}
		return result.first();
	},

	/**
	 * Returns process element by caption.
	 * @param {String} caption Process element caption.
	 * @return {Terrasoft.ProcessBaseElementSchema} Process item.
	 */
	findItemByCaption: function(caption) {
		var filterFunction = function(item) {
			var itemCaption = Terrasoft.ProcessSchemaDesignerUtilities.getElementCaption(item);
			return itemCaption === caption;
		};
		var result = this.flowElements.filterByFn(filterFunction);
		if (result.getCount() === 0) {
			result = this.lanes.filterByFn(filterFunction);
		}
		if (result.getCount() === 0) {
			result = this.laneSets.filterByFn(filterFunction);
		}
		return result.first();
	},

	/**
	 * Returns absolute item position.
	 * @private
	 * @param {Terrasoft.ProcessFlowElementSchema} item Process item.
	 * @return {Object} Item position.
	 * @return {Number} return.x X-axis value.
	 * @return {Number} return.y Y-axis value.
	 */
	getItemPosition: function(item) {
		var parent = this.findItemByName(item.parent);
		var parentPosition = {
			x: 0,
			y: 0
		};
		if (parent && (parent instanceof Terrasoft.ProcessEventSubprocessSchema)) {
			parentPosition = this.getItemPosition(parent);
		}
		var nodePosition = item.position;
		return {
			x: nodePosition.X + parentPosition.x,
			y: nodePosition.Y + parentPosition.y
		};
	},

	/**
	 * Changes the position of the process item.
	 * @param {String} itemName The name of the element.
	 * @param {Object} position The new position of the element.
	 * @param {Number} position.x The x-coordinate of the element.
	 * @param {Number} position.y The coordinate of the element along the Y axis.
	 */
	changeItemPosition: function(itemName, position) {
		var item = this.findItemByName(itemName);
		item.position.X = position.x;
		item.position.Y = position.y;
		this.fireEvent("changed", {
			item: item
		});
	},

	/**
	 * Changes the size of the process item.
	 * @param {String} itemName The name of the element.
	 * @param {Object} size New element sizes.
	 * @param {Number} size.x The width of the element.
	 * @param {Number} size.y The height of the element.
	 */
	changeItemSize: function(itemName, size) {
		var item = this.findItemByName(itemName);
		item.size.width = size.width;
		item.size.height = size.height;
		this.fireEvent("changed", {
			item: item
		});
	},

	/**
	 * Changes the position of the track.
	 * @param {String} itemName The name of the track.
	 * @param {Object} position The new position of the element.
	 * @param {Number} position.x The x-coordinate of the element.
	 * @param {Number} position.y The coordinate of the element along the Y axis.
	 */
	changeLinePosition: function(itemName, position) {
		var item = this.findItemByName(itemName);
		item.position.Y = position.y;
		this.fireEvent("changed", {
			item: item
		});
	},

	/**
	 * Moves the item to another container.
	 * @param {String} itemName The name of the element.
	 * @param {String} containerName The name of the new container in which you want to transfer the item.
	 */
	changeItemContainer: function(itemName, containerName) {
		var item = this.findItemByName(itemName);
		var container = this.findItemByName(containerName);
		item.containerUId = container.uId;
		item.parent = container.name;
		this.fireEvent("changed", {
			item: item
		});
	},

	/**
	 * Changes the coordinates of the break points for the stream.
	 * @param {String} sequenceFlowName The name of the stream.
	 * @param {Object []} polylinePointPositions An array of new breakpoints.
	 * @throws Terrasoft.ItemNotFoundException If an element is not found in the schema, an exception is thrown.
	 */
	changeSequenceFlowPolylinePointPositions: function(sequenceFlowName, polylinePointPositions) {
		if (!this.contains(sequenceFlowName)) {
			throw new Terrasoft.ItemNotFoundException();
		}
		var sequenceFlow = this.findItemByName(sequenceFlowName);
		sequenceFlow.polylinePointPositions = polylinePointPositions;
		this.fireEvent("changed", {
			item: sequenceFlow
		});
	},

	/**
	 * Loads the information on the execution amount of each process item.
	 * @param {Object []} statisticInfo The array of the number of element executions.
	 */
	loadStatisticInfo: function(statisticInfo) {
		if (!statisticInfo) {
			return;
		}
		Terrasoft.each(statisticInfo, function(executedCount, elementUId) {
			var filteredItems = this.flowElements.filter("uId", elementUId);
			var item = filteredItems.getByIndex(0);
			if (item) {
				item.executedCount = executedCount;
			}
		}, this);
	},

	/**
	 * Generates unique element name by prefix.
	 * @param {String} prefix Prefix name.
	 * @param {Function} filterFn Filter function.
	 * @param {Terrasoft.ProcessBaseElementSchema} filterFn.item Element.
	 * @param {String} filterFn.name Auto-generated name.
	 * @return {String} Unique element name.
	 * Example:
	 *
	 *      var filterFn = function(item, name) {
	 *         return item.name === name;
	 *      };
	 *      var name = parentSchema.generateItemUniqueName("Element", filterFn);
	 *
	 */
	generateItemUniqueName: function(prefix, filterFn) {
		var name = prefix + "1";
		var counter = 1;
		var internalFilterFn = function(item) {
			return filterFn(item, name);
		};
		do {
			var filteredItems = this.flowElements.filterByFn(internalFilterFn);
			if (filteredItems.getCount() === 0) {
				return name;
			}
			counter++;
			name = prefix + counter;
		} while (true);
	},

	/**
	 * Adds 'Using' to collection.
	 * @param {Object} config Config for create 'Using'.
	 * @param {String} config.uId Element identifier.
	 * @param {String} config.name Using name.
	 * @param {String} config.alias Alias name.
	 */
	addUsing: function(config) {
		Ext.apply(config, {
			createdInSchemaUId: this.uId,
			modifiedInSchemaUId: this.uId,
			createdInPackageId: this.createdInPackageId
		});
		var using = Ext.create("Terrasoft.SchemaUsing", config);
		this.usings.add(using.uId, using);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getValidateFormulaServerMethodName
	 * @override
	 */
	getValidateFormulaServerMethodName: function() {
		return "ValidateProcessFormula";
	},

	/**
	 * Gets is process schema required compilation.
	 * @return {Boolean}
	 * @public
	 */
	shouldBeCompiled: function() {
		this.isInterpretable = true;
		this.flowElements.filter(function(flowElement) {
			const typeInfo = flowElement.getTypeInfo();
			return typeInfo.typeName === "ProcessScriptTaskSchema";
		}).each(function(scriptTask) {
			if (!scriptTask.useFlowEngineScriptVersion) {
				this.isInterpretable = false;
			}
		}, this);
		if (!this._isVersionSupported(this.createdInVersion) || this.useForceCompile || !this.isInterpretable) {
			return true;
		}
		return false;
	}

	//endregion

});
