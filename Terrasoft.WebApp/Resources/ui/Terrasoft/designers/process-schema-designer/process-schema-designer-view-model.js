/**
 */
Ext.define("Terrasoft.Designers.ProcessSchemaDesignerViewModel", {
	extend: "Terrasoft.Designers.BaseProcessSchemaDesignerViewModel",
	alternateClassName: "Terrasoft.ProcessSchemaDesignerViewModel",

	mixins: {
		ProcessSchemaDesignerCopyMixin: "Terrasoft.ProcessSchemaDesignerCopyMixin",
		ProcessSchemaDesignerSearchMixin: "Terrasoft.ProcessSchemaDesignerSearchMixin"
	},

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#contextHelpCode
	 * @override
	 */
	contextHelpCode: "ProcessSchemaDesigner",

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#storageLocationHref
	 * @override
	 */
	storageLocationHref: "ProcessSchemaLocationHref",

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#ProcessSchemaMetaData
	 * @override
	 */
	storageSchemaMetadata: "ProcessSchemaMetaData",

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#storageSchemaResources
	 * @override
	 */
	storageSchemaResources: "ProcessSchemaResources",

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#storageLoadedPropertiesItemName
	 * @override
	 */
	storageLoadedPropertiesItemName: "ProcessSchemaLoadedPropertiesItemName",

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#schemaManager
	 * @override
	 */
	schemaManager: Terrasoft.ProcessSchemaManager,

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#urlHashPrefix
	 * @override
	 */
	urlHashPrefix: "process",

	/**
	 * Instance of process element schema manager.
	 * @protected
	 * @type {Terrasoft.ProcessFlowElementSchemaManager}
	 */
	elementSchemaManager: Terrasoft.ProcessFlowElementSchemaManager,

	/**
	 * Id of active mask displayed on body.
	 * @private
	 * @type {String}
	 */
	activeBodyMaskId: null,

	// endregion

	// region Methods: Private

	/**
	 * Calls specified key down handler.
	 * @param {Ext.EventObject} event Event.
	 * @param {Function} handler Handler.
	 * @param {Object} [options] Optional config.
	 * @param {Boolean} options.ctrlKey if true checks ctrl key pressed code.
	 * @return {Boolean}
	 */
	handleKeyDown: function(event, handler, options) {
		if (options && options.ctrlKey && !event.ctrlKey) {
			return;
		}
		event.preventDefault();
		handler.call(this);
		return false;
	},

	/**
	 * Calls specified ctrl and alt key down handler.
	 * @private
	 * @param {Ext.EventObject} event Event.
	 * @param {Function} handler Handler.
	 * @return {Boolean}
	 */
	_handleCtrlAltKeyDown: function(event, handler) {
		if (event.ctrlKey && event.altKey) {
			event.preventDefault();
			handler.call(this);
			return false;
		}
	},

	/**
	 * Checks current flow element to be inserted on connector.
	 * @private
	 * @param {Terrasoft.ProcessFlowElementSchema} flowElement Flow element that is dropped on connector.
	 * @return {Boolean} Result of on-node-insert validation.
	 */
	_canInsertNodeInConnector: function(flowElement) {
		return flowElement.incomingConnectionsLimit !== 0 &&
			flowElement.outgoingConnectionsLimit !== 0;
	},

	// endregion

	// region Methods: Protected

	/**
	 * Shows mask on designer body.
	 * @protected
	 * @return {String} Id of displayed mask.
	 */
	showBodyMask: function() {
		var maskId = Terrasoft.Mask.show({
			showHidden: true,
			clearMasks: true
		});
		this.activeBodyMaskId = maskId;
		return maskId;
	},

	/**
	 * Hides body mask.
	 * @protected
	 */
	hideBodyMask: function() {
		var maskId = this.activeBodyMaskId;
		if (!Ext.isEmpty(maskId)) {
			this.activeBodyMaskId = null;
			Terrasoft.Mask.hide(maskId);
		}
	},

	//endregion

	/**
	 * @inheritdoc Terrasoft.model.BaseViewModel#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		var items = Ext.create("Terrasoft.Collection");
		this.set("Items", items);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onSchemaLoaded
	 * @override
	 * @param {Terrasoft.ProcessSchema} schema Process schema.
	 */
	onSchemaLoaded: function(schema) {
		this.callParent([schema]);
		this.on("change:SearchTextEditValue", this.onSearchTextEditValueChange, this);
		this.on("change:FoundItems", this.onFoundItemsChange, this);
		var items = this.get("Items");
		items.on("remove", this.onItemRemove, this);
		items.on("add", this.onItemAdd, this, {
			priority: 900
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#loadPropertiesPageMask
	 * @override
	 */
	loadPropertiesPageMask: function(element) {
		var maskId;
		if (Terrasoft.ProcessFlowElementSchemaManager.getIsEmailElement(element)) {
			var propertiesContainerSelector = "#" + this.propertiesContainerId;
			Terrasoft.Mask.clearMasks(propertiesContainerSelector);
			maskId = this.showBodyMask();
		} else {
			maskId = this.callParent(arguments);
		}
		return maskId;
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onHidePropertyPage
	 * @override
	 */
	onHidePropertyPage: function() {
		this.saveElementProperties();
		var elementName = this.get("LoadedPropertiesItemName");
		var moduleId = this.getPropertiesModuleId(elementName);
		this.set("LoadedPropertiesItemName", null);
		this.setVisiblePropertyPage(false);
		this.sandbox.unloadModule(moduleId);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#loadItems
	 * @override
	 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
	 */
	loadItems: function(schema) {
		this.callParent(arguments);
		var collection = Ext.create("Terrasoft.core.collections.Collection");
		this.loadLanes(schema, collection);
		this.loadContainers(schema, collection);
		this.loadElements(schema, collection);
		this.loadSequenceFlows(schema, collection);
		var items = this.get("Items");
		items.loadAll(collection);
	},

	/**
	 * Loads schema lanes.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
	 * @param {Terrasoft.core.collections.Collection} collection Collection for loading elements.
	 */
	loadLanes: function(schema, collection) {
		schema.lanes.each(function(lane) {
			collection.add(lane.name, lane);
		}, this);
	},

	/**
	 * Loads schema containers.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
	 * @param {Terrasoft.core.collections.Collection} collection Collection for loading elements.
	 */
	loadContainers: function(schema, collection) {
		schema.flowElements.each(function(flowElement) {
			if (flowElement.isContainer === true) {
				this.addContainer(schema, collection, flowElement);
			}
		}, this);
	},

	/**
	 * Adding container collection process schema and all its parents in order from parent to subordinate.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
	 * @param {Terrasoft.core.collections.Collection} collection Element collection.
	 * @param {Terrasoft.manager.ProcessBaseElementSchema} container Adding container.
	 */
	addContainer: function(schema, collection, container) {
		if (collection.find(container.name)) {
			return;
		}
		var parent = container.parent;
		if (parent) {
			var parentContainer = schema.flowElements.find(parent);
			if (parentContainer) {
				this.addContainer(schema, collection, parentContainer);
			}
		}
		collection.add(container.name, container);
		container.subscribeOnChangedEvent(this.onItemChanged, this);
	},

	/**
	 * Loads schema elements.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
	 * @param {Terrasoft.core.collections.Collection} collection Collection for loading elements.
	 */
	loadElements: function(schema, collection) {
		schema.flowElements.each(function(flowElement) {
			if (flowElement.isContainer === true) {
				return;
			}
			if (flowElement.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Connector) {
				var item = collection.add(flowElement.name, flowElement);
				item.subscribeOnChangedEvent(this.onItemChanged, this);
			}
		}, this);
	},

	/**
	 * Loads schema elements sequence flows.
	 * @private
	 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
	 * @param {Terrasoft.core.collections.Collection} collection Collection for loading elements.
	 */
	loadSequenceFlows: function(schema, collection) {
		var sequenceFlows = schema.flowElements.filter(function(flowElement) {
			return flowElement.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector;
		});
		sequenceFlows.each(function(sequenceFlow) {
			if (sequenceFlow.sourceRefUId && sequenceFlow.targetRefUId) {
				collection.add(sequenceFlow.name, sequenceFlow);
				sequenceFlow.subscribeOnChangedEvent(this.onItemChanged, this);
			}
		}, this);
	},

	/**
	 * The event handler to add a new element to the collection of Items. It adds an element to the scheme.
	 * @private
	 * @param {Terrasoft.manager.ProcessBaseElementSchema} item Adding item.
	 */
	onItemAdd: function(item) {
		var schema = this.get("Schema");
		schema.add(item);
		this.fireEvent("itemschanged", {
			action: "add",
			item: item
		});
		item.subscribeOnChangedEvent(this.onItemChanged, this);
		this.clearSearchResult();
	},

	/**
	 * Clear conditional flows links which depends on item.
	 * @private
	 * @param {Terrasoft.manager.ProcessBaseElementSchema} item Deleted item.
	 */
	clearDependedConditionalFlows: function(item) {
		var schema = this.get("Schema");
		var conditionalFlows = schema.flowElements.filterByFn(function(flowElement) {
			return flowElement instanceof Terrasoft.ProcessConditionalSequenceFlowSchema;
		}, this);
		var dependedFlows = conditionalFlows.filterByFn(function(flowElement) {
			var activitiesResults = flowElement.processActivitiesSelectedResults;
			return activitiesResults && activitiesResults[item.uId];
		}, this);
		dependedFlows.each(function(flowElement) {
			flowElement.processActivitiesSelectedResults = null;
			flowElement.isValidateExecuted = false;
			flowElement.isValid = false;
			flowElement.validationResults = [];
			this.fireEvent("itemIsValidChanged", flowElement);
		}, this);
	},

	/**
	 * The event handler remove an item from the Items collection. It removes an item from the schema.
	 * @private
	 * @param {Terrasoft.manager.ProcessBaseElementSchema} item Deleted item.
	 */
	onItemRemove: function(item) {
		var schema = this.get("Schema");
		schema.remove(item.name);
		var removedItems = this.get("RemovedItems") || [];
		removedItems.push(item.name);
		this.set("RemovedItems", removedItems);
		this.fireEvent("itemschanged", {
			action: "remove",
			item: item
		});
		this.clearDependedConditionalFlows(item);
		item.unsubscribeOnChangedEvent(this.onItemChanged, this);
		this.loadSchemaPropertiesPage();
		this.clearSearchResult();
	},

	/**
	 * Change SequenceFlow connections. If targetNode is empty (targetRefUId is empty guid), shows sequence flow element
	 * properties page, if panel is visible.
	 * @private
	 * @param {Object[]} connectors Sequence flow diagram config array.
	 */
	onConnectorsNodesChange: function(connectors) {
		Terrasoft.each(connectors, function(connector) {
			var sequenceFlow = this.getItemByName(connector.name);
			var targetItem = this.getItemByName(connector.targetNode);
			var sourceItem = this.getItemByName(connector.sourceNode);
			var isNewSequenceflow = Terrasoft.isEmptyGUID(sequenceFlow.targetRefUId);
			sequenceFlow.setSource({
				sourcePort: connector.sourcePort,
				sourceRefUId: sourceItem.uId
			});
			sequenceFlow.setTarget({
				targetPort: connector.targetPort,
				targetRefUId: targetItem.uId
			});
			if (isNewSequenceflow) {
				this.loadPropertiesPage(connector.name);
			}
		}, this);
		this.clearSearchResult();
	},

	/**
	 * Modifies the break point of the process elements.
	 * @private
	 * @param {Object[]} connectorsData Information about the change in flow.
	 * It contains the name of the stream and a new array of breakpoints.
	 */
	onPolylinePointPositionsChanged: function(connectorsData) {
		var schema = this.get("Schema");
		connectorsData.forEach(function(itemData) {
			var itemName = itemData.name;
			var polylinePointPositions = itemData.polylinePointPositions;
			schema.changeSequenceFlowPolylinePointPositions(itemName, polylinePointPositions);
		}, this);
		this.clearSearchResult();
	},

	/**
	 * The event handler changes the size of the diagram element. Make changes to the process diagram.
	 * @param {Object} args Event parameter.
	 * @param {String} args.itemName Diagram element name.
	 * @param {Object} args.size New element size.
	 * @param {Number} args.size.width Element width.
	 * @param {Number} args.size.height Element height.
	 */
	onElementSizeChanged: function(args) {
		var schema = this.get("Schema");
		schema.changeItemSize(args.itemName, args.size);
		this.clearSearchResult();
	},

	/**
	 * The event handler changes the position of the track diagram. Make changes to the process diagram.
	 * @param {Object} args Event parameter.
	 * @param {String} args.itemName Diagram element name.
	 * @param {Object} args.position New element position.
	 * @param {Number} args.position.x Horizontal coordinate.
	 * @param {Number} args.position.y Vertical coordinate.
	 */
	onLinePositionChanged: function(args) {
		var schema = this.get("Schema");
		schema.changeLinePosition(args.itemName, args.position);
		this.clearSearchResult();
	},

	/**
	 * Drop event handler of a new element in the process diagram.
	 * @private
	 * @param {Object} event Event parameter.
	 */
	onItemDrop: function(event) {
		var item = event.element.tag.element;
		var schema = this.get("Schema");
		var itemInstance = this.elementSchemaManager.createInstance(item.managerItemUId);
		if (!itemInstance.emptyDiagramCaption) {
			var caption = itemInstance.caption.getValue() || item.caption.getValue();
			itemInstance.caption = new Terrasoft.LocalizableString(caption);
		}
		itemInstance.uId = Terrasoft.generateGUID();
		var itemContainer = schema.findItemByName(event.containerName);
		itemInstance.containerUId = itemContainer.uId;
		itemInstance.parent = itemContainer.name;
		itemInstance.position = itemInstance.getCenterPosition(event.localX, event.localY);
		itemInstance.isValidateExecuted = false;
		this.onGenerateItemNameAndCaption(itemInstance);
		var items = this.get("Items");
		items.add(itemInstance.name, itemInstance);
		this.loadPropertiesPage(itemInstance.name);
		return false;
	},

	/**
	 * Handler for diagram nodes collection change.
	 * @private
	 * @param {Object} event Event parameter.
	 */
	onNodesCollectionChange: function(event) {
		var changeType = event.changeType;
		if (changeType === "paste") {
			var element = event.element;
			if (this.get("LoadedPropertiesItemName")) {
				this.saveElementProperties();
			}
			this.pasteElement(element);
			this.clearSearchResult();
		}
	},

	/**
	 * Diagram click event handler.
	 * @param {Object} event Event object.
	 */
	onDiagramClick: function(event) {
		var element = event.element;
		if (element && element.type !== "pseudoGroup" && element.name) {
			this.loadPropertiesPage(element.name);
		} else {
			this.loadSchemaPropertiesPage();
		}
	},

	/**
	 * Diagram double click event handler. Shows property page and loads edit properties module.
	 * @param {Object} event Event object.
	 */
	onDiagramDoubleClick: function(event) {
		if (event.evt.type !== "doubletap") {
			return;
		}
		this.setVisiblePropertyPage(true);
		var element = event.element;
		if (element && element.name) {
			this.loadPropertiesPage(element.name);
		} else {
			this.loadSchemaPropertiesPage();
		}
	},

	/**
	 * Shows search container.
	 */
	onSearchShowButtonClick: function() {
		var isSearchVisible = this.get("IsSearchVisible");
		if (isSearchVisible) {
			this.model.trigger("change:IsSearchVisible", this, true);
		} else {
			this.set("IsSearchVisible", true);
		}
	},

	/**
	 * Makes current schema as actual schema.
	 */
	onActualize: function() {
		var currentActualState = true;
		this.set("IsActiveVersionMenuItemEnabled", currentActualState);
		var schema = this.get("Schema");
		this.setIsActualVersionByUId(schema.uId, Ext.emptyFn, this);
	},

	/**
	 * Hides search container.
	 */
	onSearchHideButtonClick: function() {
		this.set("IsSearchVisible", false);
		this.clearSearchResult();
		this.set("LastSelectedItemName", "");
	},

	/**
	 * Shows Process Log section.
	 */
	onShowProcessLog: function() {
		window.open(Terrasoft.workspaceBaseUrl + "/Nui/ViewModule.aspx#SectionModuleV2/SysProcessLogSectionV2/");
	},

	/*
	 * Opens schema source code page.
	 */
	onOpenSourceCodeClick: function() {
		var message = Terrasoft.Resources.ProcessSchemaDesigner.Messages.SaveSourceCodeConfirmationMessage;
		this.showSaveConfirmationDialog(message, function() {
			var schema = this.get("Schema");
			Terrasoft.BaseSchemaDesignerUtilities.openSourceCode(schema);
		}, this);
	},

	/**
	 * Shows process confirmation dialog.
	 * @private
	 * @param {String} title Message title.
	 * @param {String} message Message.
	 * @param {Function} handler Button click handler.
	 * @param {Array} buttons Array of buttons.
	 */
	showProcessConfirmationDialog: function(title, message, handler, buttons) {
		Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
			caption: title,
			message: message,
			handler: handler,
			scope: this,
			buttons: buttons
		});
	},

	/**
	 * Shows publish confirmation dialog.
	 * @private
	 * @param {Object} publishInfo Publish information.
	 * @param {Function} [callback] (optional) The callback function.
	 * @param {Object} [scope] (optional) Execution context.
	 */
	showPublishConfirmationDialog: function(publishInfo, callback, scope) {
		scope = scope || this;
		var caption = Terrasoft.Resources.SchemaDesigner.SchemaSavedMessage + ". " +
			Terrasoft.Resources.SchemaDesigner.MustBePublishedMessage;
		var publishCode = "publish";
		var buttonCaption = Terrasoft.Resources.SchemaDesigner.PublishButtonCaption;
		var publishButton = Terrasoft.getButtonConfig(publishCode, buttonCaption, publishCode);
		this.showProcessConfirmationDialog(caption, publishInfo, function(resultCode) {
			if (resultCode === publishCode) {
				scope.publish(callback, scope);
			} else {
				var isCanceled = true;
				Ext.callback(callback, scope, [isCanceled]);
			}
		}, [publishButton, "cancel"]);
	},

	/**
	 * Shows back end errors.
	 * @private
	 */
	_showErrorsConfirmationDialog: function(message) {
		var caption = Terrasoft.Resources.SchemaDesigner.SchemaSavedErrorsMessage;
		this.showProcessConfirmationDialog(caption, message, null, ["close"]);
	},

	/**
	 * Save process handler. If server validation fail, shows message.
	 * @param {Object} validatorInfo Process interpreter validator detail info.
	 * @param {Boolean} validatorInfo.hasErrors Front end validation result.
	 * @param {String} validatorInfo.message Text message.
	 * @param {Boolean} isValid Front end validation result.
	 * @protected
	 */
	saveProcessSchemaResponse: function(validatorInfo, isValid) {
		if (validatorInfo.hasErrors) {
			this._showErrorsConfirmationDialog(validatorInfo.message);
		} else if (validatorInfo.message && isValid) {
			this.showPublishConfirmationDialog(validatorInfo.message);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * Executes process by name, if process is modified shows save dialog.
	 * @private
	 */
	onRunProcessClick: function() {
		this.hideMessagePanel();
		this.saveElementProperties();
		var message = Terrasoft.Resources.ProcessSchemaDesigner.Messages.RunProcessConfirmationMessage;
		this.showSaveConfirmationDialog(message, function(validatorInfo = {}, isSaveCanceled = false) {
			if (isSaveCanceled || (validatorInfo.hasErrors)) {
				return;
			}
			if (validatorInfo.message) {
				this.showPublishConfirmationDialog(validatorInfo.message, function(isPublishCanceled) {
					if (!isPublishCanceled) {
						this.run();
					}
				}, this);
			} else {
				this.run();
			}
		}, this);
	},

	/**
	 * Copies process diagram and opens it in new window, if process is modified shows save dialog.
	 */
	onCopyProcessClick: function() {
		var message = Terrasoft.Resources.ProcessSchemaDesigner.Messages.CopyProcessConfirmationMessage;
		this.showSaveConfirmationDialog(message, function() {
			this.getProcessModuleUtilities(function(utils) {
				var schema = this.get("Schema");
				var config = {
					sourceUId: schema.uId,
					sourceName: schema.name,
					sourceCaption: schema.caption.getValue()
				};
				utils.getCopyProcessConfig(config, function(copyProcessConfig) {
					utils.copyProcess(copyProcessConfig, function(schemaUId) {
						message = Terrasoft.Resources.SchemaDesigner.SchemaCopiedMessage;
						this.showMessagePanel(message);
						utils.showProcessSchemaDesigner(schemaUId);
					}, this);
				}, this);
			}, this);
		}, this);
	},

	/**
	 * Handler for process successfully started event.
	 * @private
	 */
	onRunProcessSuccess: function() {
		var messages = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
		var information = messages.SuccessfullyRunProcessInformationMessage;
		this.showMessagePanel(information);
	},

	/**
	 * Executes process.
	 * @private
	 * @param {Function} [callback] (optional) The callback function.
	 * @param {Object} [scope] (optional) Callback execution context.
	 */
	run: function(callback, scope) {
		this.clearSchemaStorageInfo();
		var schema = this.get("Schema");
		this.showBodyMask();
		Terrasoft.ProcessEngineUtilities.runSpecifiedProcessVersion(schema.uId, function(result) {
			this.hideBodyMask();
			if (result) {
				if (result.isSuccess()) {
					this.onRunProcessSuccess();
				} else {
					var message = Ext.String.trim(result.errorInfo.message) ||
						Ext.String.format(
							Terrasoft.Resources.ProcessSchemaDesigner.Messages.ErrorStartBusinessProcessMessage,
							result.errorInfo.errorCode);
					Terrasoft.showErrorMessage(message);
				}
			}
			Ext.callback(callback, scope);
		}, this);
	},

	/**
	 * Publish current workspace.
	 * @param {Function} [callback] (optional) The callback function.
	 * @param {Object} [scope] (optional) Execution context.
	 */
	publish: function(callback, scope) {
		this.getProcessModuleUtilities(function(utilities) {
			Terrasoft.BaseSchemaDesignerUtilities.publish(utilities, function() {
				var schema = this.get("Schema");
				schema.deleteSchemaChanges();
				Ext.callback(callback, scope || this);
			}, this);
		}, this);
	},

	/**
	 * The event handler changes the header chart element. Make changes to the process diagram.
	 * @param {Object} event Event parameter.
	 * @param {{ej.Diagram.Node}} event.element Diagram element.
	 * @param {String} event.element.name Diagram element name.
	 * @param {String} event.value New caption value.
	 */
	onTextChange: function(event) {
		var item = this.getItemByName(event.element.name);
		item.caption.setValue(event.value);
	},

	/**
	 * The event handler insert an element in the flow of control.
	 * @private
	 * @param {String} itemName The name of the element that is inserted.
	 * @param {ej.Diagram.Node} connector Selected flow.
	 */
	onInsertNodeInConnector: function(itemName, connector) {
		var items = this.get("Items");
		var flowElement = items.get(itemName);
		if (!this._canInsertNodeInConnector(flowElement)) {
			return;
		}
		var sequenceFlow = items.get(connector.name);
		var newSequenceFlow = sequenceFlow.insertFlowElement(flowElement);
		connector.targetPort = sequenceFlow.targetSequenceFlowPointLocalPosition;
		this.onGenerateItemNameAndCaption(newSequenceFlow);
		items.add(newSequenceFlow.name, newSequenceFlow);
		this.clearSearchResult();
		return false;
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onKeyDown
	 * @override
	 */
	onKeyDown: function(event) {
		this.callParent(arguments);
		switch (event.keyCode) {
			case Ext.EventObject.S:
				return this._handleCtrlAltKeyDown(event, this.forceSave);
			case Ext.EventObject.K:
				return this.handleKeyDown(event, this.onOpenSourceCodeClick, {ctrlKey: true});
			case Ext.EventObject.ENTER:
				return this.handleKeyDown(event, this.onRunProcessClick, {ctrlKey: true});
			case Ext.EventObject.L:
				return this.handleKeyDown(event, this.onShowProcessLog, {ctrlKey: true});
			case Ext.EventObject.ESC:
				if (event.target.id === "diagram-schema-designer") {
					return this.handleKeyDown(event, this.onHidePropertyPage);
				}
				break;
			case Ext.EventObject.F:
				return this.handleKeyDown(event, this.onSearchShowButtonClick, {ctrlKey: true});
		}
	},

	/**
	 * Event handler removed items of diagram.
	 * @private
	 * @param {Object} args Event object.
	 * @param {Array} args.itemNameList Array of items.
	 */
	onItemsRemoving: function(args) {
		var utils = Terrasoft.ProcessSchemaDesignerUtilities;
		var schema = this.get("Schema");
		utils.validateAllLazyPropertiesAreLoaded(schema, function(areLoaded) {
			if (areLoaded) {
				utils.validateElementRemoval(schema, args.itemNameList, function(canRemove) {
					if (canRemove) {
						var diagram = args.diagram;
						var diagramInstance = diagram.getInstance();
						diagramInstance._delete();
					}
				}, this);
			}
		}, this);
	},

	/**
	 * Sets a unique name and the title of the process element.
	 * @private
	 * @param {Terrasoft.ProcessBaseElementSchema} item Process schema item.
	 */
	onGenerateItemNameAndCaption: function(item) {
		var key;
		var index = 0;
		var defName = item.name;
		var items = this.get("Items");
		var removedItems = this.get("RemovedItems");
		var notUniq = true;
		do {
			index++;
			key = defName + index;
			notUniq = this.containsCaseInsensitive(items, key) || _.contains(removedItems, key);
		} while (notUniq);
		item.name = key;
		var cultureValues = item.caption.cultureValues;
		Terrasoft.each(cultureValues, function(value, culture) {
			if (value) {
				cultureValues[culture] = value + " " + index;
			}
		});
		return false;
	},

	/**
	 * Checks on a key element insensitive.
	 * @private
	 * @param {Terrasoft.Collection} collection Elements collection.
	 * @param {String} itemKey Element key.
	 * @return {Boolean}
	 */
	containsCaseInsensitive: function(collection, itemKey) {
		return collection.getKeys().some(function(key) {
			return key.toUpperCase() === itemKey.toUpperCase();
		});
	},

	/**
	 * Finds the item of the schema by name.
	 * @param {String} name Item name.
	 * @return {Terrasoft.BaseProcessSchemaElement}
	 */
	findItemByName: function(name) {
		var schema = this.get("Schema");
		if (schema.name === name) {
			return schema;
		}
		var items = this.get("Items");
		return items.find(name);
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#findItemByKey
	 * @override
	 */
	findItemByKey: function(key) {
		return this.findItemByName(key);
	},

	/**
	 * @inheritdoc Terrasoft.core.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		var items = this.get("Items");
		items.destroy();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#clearSchemaItems
	 * @override
	 */
	clearSchemaItems: function() {
		var items = this.get("Items");
		items.clear();
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#selectItem
	 * @override
	 */
	selectItem: function(key) {
		this.fireEvent("itemSelected", key);
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#clearSelection
	 * @override
	 */
	clearSelection: function() {
		this.fireEvent("clearSelection", this);
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#tryEditSchema
	 * @override
	 */
	tryEditSchema: function(schemaUId) {
		this.getSchemaInstance(schemaUId, this.onSchemaLoaded, this);
	},

	/**
	 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#getItemKey
	 * @override
	 */
	getItemKey: function(item) {
		return item.name;
	},

	/**
	 * The event handler changing position chart elements. Make changes to the process diagram.
	 * @param {Array} itemsConfig Elements config array.
	 * @param {String} itemsConfig.itemName Diagram element name.
	 * @param {Object} itemsConfig.position Element new position.
	 * @param {Number} itemsConfig.position.x Horizontal coordinate.
	 * @param {Number} itemsConfig.position.y Vertical coordinate.
	 */
	onItemsPositionChanged: function(itemsConfig) {
		var schema = this.get("Schema");
		itemsConfig.forEach(function(config) {
			var itemName = config.itemName;
			schema.changeItemPosition(itemName, config.position);
		}, this);
		this.clearSearchResult();
	},

	/**
	 * The event handler changes the container chart elements. Make changes to the process diagram.
	 * @param {Array} itemsConfig Elements config array.
	 * @param {String} itemsConfig.itemName Diagram element name.
	 * @param {String} itemsConfig.containerName Container name.
	 */
	onItemsContainerChanged: function(itemsConfig) {
		var schema = this.get("Schema");
		itemsConfig.forEach(function(config) {
			var itemName = config.itemName;
			var containerName = config.containerName;
			schema.changeItemContainer(itemName, containerName);
		}, this);
		this.clearSearchResult();
	},

	/**
	 * Returns the element of the process schema by its name.
	 * @private
	 * @param {String} name Element name.
	 * @return {Object} Found item.
	 */
	getItemByName: function(name) {
		var item = this.findItemByKey(name);
		if (!item) {
			var elementNotFoundMessage = Terrasoft.Resources.ProcessSchemaDesigner.Messages.ElementNotFoundMessage;
			throw new Terrasoft.ItemNotFoundException({
				message: Ext.String.format(elementNotFoundMessage, name)
			});
		}
		return item;
	}
});
