﻿Terrasoft.configuration.Structures["SchemaDesignerModule"] = {innerHierarchyStack: ["SchemaDesignerModule"]};
define("SchemaDesignerModule",
	['ext-base', 'terrasoft', 'sandbox', 'EditPageDesignerViewGenerator', 'SchemaDesignerModuleResources',
		'MaskHelper', 'ConfigurationEnums', 'SectionDesignDataModule'],
	function(Ext, Terrasoft, sandbox, designerViewGenerator, resources, maskHelper, configurationEnums, designData) {
		var loadedSchemaNames = [];
		var designViewModel;
		var el;
		var designerView;

		function init() {
			var state = sandbox.publish('GetHistoryState');
			var currentHash = state.hash;
			var currentState = state.state || {};
			if (currentState.moduleId === sandbox.id) {
				return;
			}
			var newState = Terrasoft.deepClone(currentState);
			newState.moduleId = sandbox.id;
			sandbox.publish('ReplaceHistoryState', {
				stateObj: newState,
				pageTitle: null,
				hash: currentHash.historyState,
				silent: true
			});
		}

		function render(renderTo) {
			el = renderTo;
			var schemaName = getSchemaName();
			var chainContext = {
				schemaName: schemaName
			};
			Terrasoft.chain({}, [
				function(context) {
					if (designViewModel) {
						context.next();
						return;
					}
					var schemaName = context.schemaName = getSchemaName();
					loadSchema(schemaName, function(schemaConfig) {
						context.schemaConfig = schemaConfig;
						context.next();
					}, this);
				},
				function(context) {
					if (designViewModel) {
						context.next();
						return;
					}
					getDesignSchema(context.schemaConfig, function(designSchema) {
						context.designSchema = designSchema;
						context.next();
					});
				},
				function(context) {
					if (designViewModel) {
						context.next();
						return;
					}
					var moduleName = designData.getMainModuleName();
					var moduleStructure = designData.getModuleStructure(moduleName);
					designData.getEntitySchemaByName({
						name: moduleStructure.entityName,
						scope: this,
						isOriginal: false,
						callback: function(entitySchema) {
							context.entitySchema = context.designSchema.entitySchema = entitySchema;
							context.next();
						}
					});
				},
				function(context) {
					if (designViewModel) {
						context.next();
						return;
					}
					var designSchema = context.designSchema;
					createDesignViewModelClass();
					designViewModel = Ext.create('Terrasoft.SchemaDesignerViewModel', {
						values: {												// TODO: create VM columns
							NewColumns: new Terrasoft.Collection(),				// TODO: ##### ## ###, #### ## ###### ####### ########
							schema: designSchema,
							blockElementVisible: false,
							activeItemActions: designerViewGenerator.getItemActionsConfig(),
							entitySchema: context.entitySchema
						}
					});
					setSchemaContainerIds(designSchema.schema);
					maskHelper.HideBodyMask();
					context.next();
				},
				function(context) {
					var designSchema = designViewModel.get('schema');
					var viewConfig = designerViewGenerator.generate();
					designerView = Ext.create(viewConfig.className, viewConfig);
					//viewRenderTo = renderTo;
					//view.bind(viewModel);
					//view.render(renderTo);
					//loadCommandLine();
					//var cardRenderTo = Ext.get('autoGeneratedContainer');
					/*
					var info = {
						details: [],
						rules: [],
						columns: [],
						dependencies: [],
						filters: [],
						sysSettings: []
					};
					var schemaViewConfig = designerViewGenerator.generateCard(designSchema, info);
					var schemaView = Ext.create(schemaViewConfig.className, schemaViewConfig);
					//schemaView.bind(viewModel);
					*/
					renderView(designSchema);
					//designerView.render(renderTo);
					//cardView.render(cardRenderTo);
					context.next();
				}
			]);
		}

		function renderView(schema) {
			if (designerView) {
				designerView.destroy();
			}
			var viewConfig = designerViewGenerator.generate();
			designerView = Ext.create(viewConfig.className, viewConfig);
			var info = {
				details: [],
				rules: [],
				columns: [],
				dependencies: [],
				filters: [],
				sysSettings: []
			};
			var schemaViewConfig = designerViewGenerator.generateCard(schema, info);
			var schemaView = Ext.create(schemaViewConfig.className, schemaViewConfig);
			//schemaView.bind(viewModel);
			designerView.add(schemaView);
			designerView.bind(designViewModel);
			designerView.render(el);
		}

		function getSchemaName() {
			return 'ContactPage';													// TODO: получать имя схемы из дизайнера
		}

		function loadSchema(schemaName, callback, scope) { // TODO: ######## ##### ## #########
			var map = {};
			map[schemaName] = {
				sandbox: 'sandbox_' + sandbox.id,
				'ext-base': 'ext_' + Ext.id
			};
			requirejs.config({
				map: map
			});
			require([schemaName], function(schema) {
				callback.call(scope, schema);
			});
		}

		function getDesignSchema(schemaConfig, callback, scope) {				// TODO: ######## ##### ######## ##### ## #########
			var parentSchemaName = schemaConfig.extend;
			if (parentSchemaName === 'Terrasoft.model.BaseViewModel') {
				var schema = createDesignSchema(schemaConfig);
				callback.call(scope, schema);
				return;
			}
			var map = {};
			map[parentSchemaName] = {
				sandbox: 'sandbox_' + sandbox.id,
				'ext-base': 'ext_' + Ext.id,
				terrasoft: 'terrasoft_' + Terrasoft.id
			};
			requirejs.config({
				map: map
			});
			require([parentSchemaName], function(parentSchemaConfig) {
				loadedSchemaNames.push(parentSchemaName);
				parentSchemaConfig.name = parentSchemaName;
				getDesignSchema(parentSchemaConfig, function(parentSchemaConfig) {
					var parentSchema = createDesignSchema(parentSchemaConfig);
					callback.call(scope, parentSchema);
				}, scope);
			});
		}

		function createDesignSchema(schemaConfig) {
			var schemaName = schemaConfig.name;
			var schema = Terrasoft.deepClone(schemaConfig);
			schema.schemaDifferences.call(schema);
			schema.name = schemaName;
			return schema;
		}

		function setSchemaContainerIds(itemsContainer) {
			Terrasoft.each(itemsContainer, function(schemaItem) {
				if (schemaItem instanceof Array) {
					setSchemaContainerIds(schemaItem);
				} else {
					if (Ext.isEmpty(schemaItem.EditStructureContainerId)) {
						schemaItem.EditStructureContainerIdNew = true;
						schemaItem.EditStructureContainerId = Terrasoft.generateGUID();
					}
					if (schemaItem.items) {
						setSchemaContainerIds(schemaItem.items);
					}
				}
			});
		}

		function createDesignViewModelClass() {
			var actionsRowPrefix =  '-ActiveItemAction-';			// TODO: make class property
			var hiddenCss = 'hidden-actions';
			var actionsRowTpl = new Ext.Template('<div id="{id}" class="edit-item-actions"></div>');
			Ext.define('Terrasoft.Configuration.SchemaDesignerViewModel', {
				extend: 'Terrasoft.BaseViewModel',
				alternateClassName: 'Terrasoft.SchemaDesignerViewModel',
				name: 'SchemaDesignerViewModel',
				columns: {},
				getVisible: function() {			// TODO: to see hidden items
					return true;
				},
				onSchemaViewRendered: function() {
					var activeItem = this.getCurrentElement();
					if (activeItem) {
						this.addItemActions(activeItem);
						this.highlightContainer(activeItem);
					}
				},
				getHeader: function() {
					return 'SomeCaption (getHeader method)';
				},
				highlightContainer: function(tag) {
					var labelControl = Ext.get(tag.containerId);
					if (!Ext.isEmpty(labelControl)) {
						labelControl.addCls('designerSelected');
						labelControl.focus();
					}
				},
				unhighlightContainer: function(tag) {
					var labelControl = Ext.get(tag.containerId);
					if (!Ext.isEmpty(labelControl)) {
						labelControl.removeCls('designerSelected');
					}
				},
				containerRendered: function(a, tag) {
					if (!a.scope || !tag) {
						return;
					}
					Ext.get(tag.containerId).on({
						'focus': {
							fn: function() {
								this.labelClick(tag);
							},
							scope: this
						}
					});
				},
				labelClick: function(tag) {
					this.setCurrentElement(tag);
				},
				getCurrentElement: function() {
					return this.get('clickedElement');
				},
				setCurrentElement: function(value) {
					var previousElement = this.getCurrentElement();
					if (!Ext.isEmpty(previousElement)) {
						this.removeItemActions(previousElement);
						this.unhighlightContainer(previousElement);
					}
					this.set('clickedElement', value);
					if (!Ext.isEmpty(value)) {
						this.addItemActions(value);
						this.highlightContainer(value);
					}
				},
				moveField: function(offset) {
					this.putPositionModification(offset);
				},
				upField: function() {
					this.moveField(-1);
				},
				downField: function() {
					this.moveField(1);
				},
				removeItemActions: function(tag) {
					var itemActions = this.get('activeItemActions');
					if (!itemActions.length) {
						return;
					}
					var actionsRow = Ext.get(tag.containerId + actionsRowPrefix);
					if (actionsRow) {
						actionsRow.addCls(hiddenCss);
					}
				},
				addItemActions: function(tag) {
					var itemActions = this.get('activeItemActions');
					if (!itemActions.length) {
						return;
					}
					var actionsRow = Ext.get(tag.containerId + actionsRowPrefix);
					if (!actionsRow) {
						var renderTo = this.createActionsRow(tag);
						if (renderTo) {
							this.renderRowActions(renderTo, tag);
						}
					} else {
						actionsRow.removeCls(hiddenCss);
					}
				},
				createActionsRow: function(tag) {
					var selector = tag.containerId + actionsRowPrefix;
					var item = Ext.get(tag.containerId);
					if (item) {
						var renderTo = actionsRowTpl.append(item, {
							id: selector
						}, true);
						return renderTo;
					}
				},
				skipAction: function(action, element) {
					return element.type === Terrasoft.ViewModelSchemaItem.DETAIL && action.tag === 'edit';
				},
				renderRowActions: function(renderTo, tag) {
					var itemActions = Ext.clone(this.get('activeItemActions'));
					var self = this;
					var result = this.findElementByNameModification(tag);
					if (Ext.isEmpty(result)) {
						return null;
					}
					var itemContainer = result.containerPath.pop();
					var element = itemContainer.items[result.index];
					for (var i = 0, length = itemActions.length; i < length; i++) {
						var action = itemActions[i];
						Ext.apply(action, {
							renderTo: renderTo,
							click: {
								bindTo: 'onActionItemClick'
							},
							enabled: {
								bindTo: 'isActionEnabled'
							},
							visible: {
								bindTo: 'isActionVisible'
							}
						});

						var actionItem = Ext.create(action.className, action);
						actionItem.bind(this);
					}
				},
				isActionVisible: function(tag) {
					var actionVisible = true;
					var schemaItem = this.getCurrentColumnInfo();
					if (schemaItem.type === Terrasoft.ViewModelSchemaItem.DETAIL && tag === 'edit') {
						actionVisible = false;
					}
					return actionVisible;
				},
				isActionEnabled: function(tag) {
					var actionEnabled = true;
					var schemaItem = this.getCurrentColumnInfo();
					var schema = this.get('schema');
					var schemaItemInfo = this.findSchemaItemIndexByName({
						items: schema.schema,
						name: schemaItem.name
					});
					var itemContainer = schemaItemInfo.containerPath.pop();
					if (itemContainer instanceof Array) {
						switch (tag) {															// TODO: moveRight, moveLeft
							case 'upField':
								actionEnabled = (schemaItemInfo.visibleIndex !== 0);
								break;
							case 'downField':
								var containerVisibleItemsCount = 0;
								for (var i = 0, length = itemContainer.length; i < length; i++) {
									if (itemContainer[i].visible !== false) {
										containerVisibleItemsCount++;
									}
								}
								actionEnabled = (schemaItemInfo.visibleIndex !== containerVisibleItemsCount - 1);
								break;
						}
					}
					return actionEnabled;
				},
				onActionItemClick: function(param1, param2, param3, tag) {
					switch (tag) {
						case 'upField':
							//this.upField();
							var schemaItem = Terrasoft.deepClone(this.getCurrentColumnInfo());
							this.moveSchemaItemUp(schemaItem);
							break;
						case 'downField':
							//this.downField();
							var schemaItem = Terrasoft.deepClone(this.getCurrentColumnInfo());
							this.moveSchemaItemDown(schemaItem);
							break;
						case 'moveLeft':
							//this.moveLeft();
							break;
						case 'moveRight':
							//this.moveRight();
							break;
						case 'edit':
							this.editColumn();
							break;
						case 'hide':
							this.removeColumn();
							break;
					}
				},
				// -------------------------------------------------------------------------------------------------------
				moveSchemaItemUp: function(schemaItem) {
					var schemaItemName = schemaItem.name;
					var schema = this.get('schema');
					var schemaItemInfo = this.findSchemaItemIndexByName({
						items: schema.schema,
						name: schemaItemName
					});
					this.removeSchemaItem(schemaItemName);
					var newItemVisibleIndex = schemaItemInfo.visibleIndex - 1;
					if (newItemVisibleIndex >= 0) {
						var itemsContainer = schemaItemInfo.container;
						var prevVisibleSchemaItemInfo =
							this.findSchemaItemInfoByVisibleIndex(newItemVisibleIndex, itemsContainer);
						var newItemIndex = prevVisibleSchemaItemInfo.index;
						var prevVisibleSchemaItem = prevVisibleSchemaItemInfo.item;
						if (prevVisibleSchemaItem.type === Terrasoft.ViewModelSchemaItem.GROUP) {
							itemsContainer = prevVisibleSchemaItem.items;
							newItemIndex = itemsContainer.length;
						}
						itemsContainer.splice(newItemIndex, 0, schemaItem);								// TODO: use this.addSchemaItem();
					} else {
						var itemContainer = schemaItemInfo.containerPath.pop();
						var itemContainerInfo = this.findSchemaItemIndexByName({
							items: schema.schema,
							name: itemContainer.name
						});
						newItemIndex = itemContainerInfo.index;
						itemContainerInfo.container.splice(newItemIndex, 0, schemaItem);				// TODO: use this.addSchemaItem();
					}
					renderView(schema);																	// TODO: ######### ##### ####### ####### ##########
				},
				moveSchemaItemDown: function(schemaItem) {
					var schemaItemName = schemaItem.name;
					var schema = this.get('schema');
					var schemaItemInfo = this.findSchemaItemIndexByName({
						items: schema.schema,
						name: schemaItemName
					});
					var newItemVisibleIndex = schemaItemInfo.visibleIndex + 1;
					var itemsContainer = schemaItemInfo.container;
					var nextVisibleSchemaItemInfo = this.findSchemaItemInfoByVisibleIndex(newItemVisibleIndex, itemsContainer);
					this.removeSchemaItem(schemaItemName);
					if (nextVisibleSchemaItemInfo) {
						var newItemIndex = nextVisibleSchemaItemInfo.index;
						var nextVisibleSchemaItem = nextVisibleSchemaItemInfo.item;
						if (nextVisibleSchemaItem.type === Terrasoft.ViewModelSchemaItem.GROUP) {
							itemsContainer = nextVisibleSchemaItem.items;
							newItemIndex = 0;
						}
						itemsContainer.splice(newItemIndex, 0, schemaItem);								// TODO: use this.addSchemaItem();
					} else {
						var itemContainer = schemaItemInfo.containerPath.pop();
						var itemContainerInfo = this.findSchemaItemIndexByName({
							items: schema.schema,
							name: itemContainer.name
						});
						newItemIndex = itemContainerInfo.index + 1;
						itemContainerInfo.container.splice(newItemIndex, 0, schemaItem);				// TODO: use this.addSchemaItem();
					}
					renderView(schema);																	// TODO: ######### ##### ####### ####### ##########
				},
				findSchemaItemInfoByVisibleIndex: function(visibleIndex, container) {
					var items = (container instanceof Array) ? container : container.items;
					var itemVisibleIndex = -1;
					for (var index = 0, length = items.length; index < length; index++) {
						var schemaItem = items[index];
						if (schemaItem.visible !== false) {
							itemVisibleIndex++;
						}
						if (itemVisibleIndex === visibleIndex) {
							return {
								item: schemaItem,
								index: index
							};
						}
					}
					return null;
				},
				// -------------------------------------------------------------------------------------------------------
				getNewColumnConfig: function(columnPath, dataType) {
					return {
						type: Terrasoft.ViewModelSchemaItem.ATTRIBUTE,
						name: columnPath,
						columnPath: columnPath,
						dataValueType: dataType,
						visible: true
					};
				},
				removeElementFromContainer: function(elementName, reRender) {
					var element = Ext.getCmp(elementName.containerId);
					var result = this.findElementByNameModification(elementName);
					var prevContainer = result.containerPath.pop();
					var prevContainerId = this.getContainerId(prevContainer);
					var extCmpPrevContainer = Ext.getCmp(prevContainerId);
					var config = this.GetConfigFromExt(element);
					extCmpPrevContainer.remove(element);
					element.destroy();
					if (reRender) {
						extCmpPrevContainer.reRender();
					}
					return {
						container: extCmpPrevContainer,
						config: prevContainer,
						index: result.visibleIndex
					};
				},
				addElementToContainer: function(container, elementConfig, index) {
					var elementCopy = Ext.create(elementConfig.className, elementConfig);
					elementCopy.bind(this);
					container.items.insert(typeof index === 'undefined' ? 0 : index, elementCopy);
					container.reRender();

				},
				moveToContainer: function(itemContainer, visibleIndex, index) {
					var currentElement = this.getCurrentElement();
					if (Ext.isEmpty(currentElement)) {
						return;
					}
					var element = Ext.getCmp(currentElement.containerId);
					var config = this.GetConfigFromExt(element);
					var extCmpContainer = this.removeElementFromContainer(currentElement, !Ext.isEmpty(itemContainer));
					if (!Ext.isEmpty(itemContainer)) {
						var containerId = this.getContainerId(itemContainer);
						extCmpContainer.container = Ext.getCmp(containerId);
					}
					this.addElementToContainer(extCmpContainer.container, config, visibleIndex);
					this.highlightContainer(currentElement);
					this.insertModification({
						type: 'move',
						name: currentElement.itemName,
						position: index,
						containerName: Ext.isEmpty(itemContainer) ? extCmpContainer.config.name : itemContainer.name
					}, {
						containerId: currentElement.containerId,
						contContainerId: itemContainer ? itemContainer.EditStructureContainerId : null
					});
				},
				isInMainContainer: function(containerName) {
					var currentElement = this.getCurrentElement();
					if (Ext.isEmpty(currentElement)) {
						return false;
					}
					var result = this.findElementByNameModification(currentElement);
					if (Ext.isEmpty(result)) {
						return false;
					}
					var mainContainer = result.containerPath.shift();
					if (mainContainer.name === containerName) {
						return true;
					}
				},
				moveRight: function() {
					var containerName = 'rightPanel';
					if (this.isInMainContainer(containerName)) {
						return;
					}
					this.moveToContainer({ name: containerName });
				},

				moveLeft: function() {
					var containerName = 'leftPanel';
					if (this.isInMainContainer(containerName)) {
						return;
					}
					this.moveToContainer({ name: containerName });
				},
				removeColumn: function() {
					var activeItem = this.getCurrentElement();
					if (Ext.isEmpty(activeItem)) {
						return;
					}
					var newColumns =  this.get('NewColumns');
					var entityColumnUId;
					newColumns.each(function(column) {
						if (column.name === activeItem.itemName) {
							entityColumnUId = column.uId;
						}
						return Ext.isEmpty(entityColumnUId);
					}, this);
					if (entityColumnUId) {
						newColumns.removeByKey(entityColumnUId);
					}
					var schemaItemViewContainer = Ext.getCmp(activeItem.containerId);
					schemaItemViewContainer.destroy();
					this.setCurrentElement(null);
					this.removeSchemaItem(activeItem.itemName);
				},
				isContainer: function(element) {
					return element.type === Terrasoft.ViewModelSchemaItem.GROUP;
				},
				isDetail: function(element) {
					return element.type === Terrasoft.ViewModelSchemaItem.DETAIL;
				},
				isColumn: function(element) {
					return !Ext.isEmpty(element.columnPath);
				},

				getContainerVisibleItemsCount: function(element) {
					var items = element.items;
					var visibleCount = 0;
					for (var i = 0; i < items.length; i++) {
						if (items[i].visible !== false) {
							visibleCount++;
						}
					}
					return visibleCount;
				},
				getContainerId: function(item) {
					if (this.isContainer(item)) {
						return 'fieldGroupContainer-' + item.name;
					}
					if (this.isDetail(item)) {
						return 'fieldDetailContainer-' + item.name;
					}
					switch (item.name) {
						case 'leftPanel':
							return 'autoGeneratedLeftContainer';
						case 'rightPanel':
							return 'autoGeneratedRightContainer';
						case 'customPanel':
							return 'autoGeneratedCustomContainer';
					}
				},
				putPositionModification: function(offset) {
					var currentElement = this.getCurrentElement();
					if (Ext.isEmpty(currentElement)) {
						return;
					}
					var result = this.findElementByNameModification(currentElement);
					if (Ext.isEmpty(result)) {
						return;
					}
					var useDifContainer = false;
					var itemContainer = result.containerPath.pop();
					var index = result.index;
					var visibleIndex = result.visibleIndex;
					var increment = offset > 0 ? -1 : 1;
					var containerItems = itemContainer.items;
					var element = null;
					while (offset !== 0 && (index - increment) < containerItems.length + 1 && (index - increment) >= -1) {
						index -= increment;
						if (index >= containerItems.length || index < 0 || visibleIndex - increment < 0) {
							useDifContainer = true;
							var previousContainerName = itemContainer.name;
							itemContainer = result.containerPath.pop();
							if (!itemContainer) {
								break;
							}
							element = itemContainer;
							containerItems = element.items;
							index = 0;
							visibleIndex = 0;
							for (var i = 0; i < containerItems.length; i++)
							{
								if (containerItems[i].name === previousContainerName) {
									index -= increment;
									visibleIndex++;
									break;
								}
								index++;
								if (containerItems[i].visible !== false) {
									visibleIndex++;
								}
							}
							element = containerItems[index];
							if (index === -1) {
								element = containerItems[0];
							}
							if (increment > 0) {
								index += increment;
							}
							if (!element || !itemContainer) {
								break;
							}
							var visibleElementsCount = this.getContainerVisibleItemsCount(itemContainer);
							if (element.visible !== false
								|| visibleIndex - increment === 0
								|| visibleIndex === visibleElementsCount) {
								if (increment > 0) {
									visibleIndex -= increment;
								}
								offset += increment;
							} else {
								if (increment < 0) {
									visibleIndex += increment;
								}
							}
							continue;
						} else {
							element = containerItems[index];
							while (element.visible === false && index < containerItems.length - 1 && index > 0) {
								element = containerItems[index -= increment];
							}
						}
						if (this.isContainer(element)) {
							useDifContainer = true;
							index = increment > 0 ? element.items.length : -1;
							visibleIndex = increment > 0 ? this.getContainerVisibleItemsCount(element) + 1 : -1;
							result.containerPath.unshift(itemContainer);
							itemContainer = element;
							containerItems = element.items;
							element = containerItems[index - increment];
							if (!element) {
								element = { visible: true };
							}
							if (increment < 0) {
								index -= increment;
							}
						}
						var visibleElementsCount = this.getContainerVisibleItemsCount(itemContainer);

						if (element.visible !== false
							|| visibleIndex - increment === 0
							|| visibleIndex === visibleElementsCount) {
							visibleIndex -= increment;
							offset += increment;
						}
					}
					if (!itemContainer) {
						return;
					}
					if (useDifContainer) {
						this.moveToContainer(itemContainer, visibleIndex, index);

					} else {
						this.moveToContainer(null, visibleIndex, index);

					}
				},
				GetConfigFromExt: function(extElement) {
					if (!extElement.hasOwnProperty('initialConfig')) {
						return {};
					}
					var config = extElement.initialConfig;
					if (extElement.hasOwnProperty('bindings')) {
						for (var binding in extElement.bindings) {
							config[binding] = {
								bindTo: extElement.bindings[binding].modelItem
							};
						}
					}
					var itemsConfigs = [];
					var scope = this;
					if (extElement.hasOwnProperty('items')) {
						Terrasoft.each(extElement.items.items, function(item) {
							itemsConfigs[itemsConfigs.length] = scope.GetConfigFromExt(item);
						});
					}
					if (itemsConfigs.length) {
						config.items = itemsConfigs;
					}
					return config;
				},
				openEditGroupPopup: function(callback, groupValue, inNew) {
					var caption = inNew ? resources.localizableStrings.NewGroupInputBoxCaption :
						resources.localizableStrings.ExistingGroupInputBoxCaption;
					Terrasoft.utils.inputBox(
						caption,
						callback,
						['ok', 'cancel'],
						this,
						{
							name: {
								dataValueType: Terrasoft.DataValueType.TEXT,
								caption: resources.localizableStrings.GroupNameInputTitle,
								value: groupValue
							}
						},
						{
							defaultButton: 0,
							classes: {
								coverClass: ['cover-calss1', 'cover-calss2'],
								captionClass: ['caption-calss1', 'caption-calss2']
							}
						}
					);
				},
				generateGroup: function(groupConfig, index, containerConfig) {
					var voidContainer = {
						items: []
					};
					designerViewGenerator.generateView(
						voidContainer,
						[groupConfig],
						{},
						configurationEnums.CardState.EditStructure,
						this.entitySchema
					);
					var containerId = this.getContainerId({
						name: this.getAddContainerName()
					});
					if (containerConfig) {
						containerId = this.getContainerId(containerConfig);
					}
					var container = Ext.getCmp(containerId);
					this.addElementToContainer(container, voidContainer.items[0], index);
				},
				updateGroup: function(groupConfig) {
					var currentItemValue = {
						itemName: groupConfig.name,
						containerId: groupConfig.EditStructureContainerId
					};
					var extCmpContainer = this.removeElementFromContainer(currentItemValue, false);
					this.generateGroup(groupConfig, extCmpContainer.index, extCmpContainer.config);
					this.setCurrentElement(currentItemValue);
				},
				getAddContainerName: function() {
					return 'leftPanel';
				},
				addGroup: function() {
					var callback = function(returnCode, controlData) {
						if (returnCode === 'ok' && controlData.name.value) {
							var groupCaption = controlData.name.value;
							var groupName = Terrasoft.generateGUID();
							var editStructureContainerId = Terrasoft.generateGUID();
							var schemaItemConfig = {
								type: Terrasoft.ViewModelSchemaItem.GROUP,
								name: groupName,
								visible: true,
								caption: groupCaption,
								collapsed: false,
								items: [],
								EditStructureContainerId: editStructureContainerId
							};
							this.addSchemaItem(schemaItemConfig, 0, this.getAddContainerName());
							/*
							var Id = Terrasoft.generateGUID();
							var idConfig = {
								EditStructureContainerId: Id
							};
							this.insertModification({
								type: 'add',
								value: Terrasoft.deepClone(columnConfig),
								containerName: this.getAddContainerName(),
								position: 0
							}, {
							}, idConfig);
							Ext.apply(columnConfig, idConfig);
							*/
							this.generateGroup(schemaItemConfig);
							this.setCurrentElement({
								itemName: schemaItemConfig.name,
								containerId: editStructureContainerId
							});
						}
					};
					this.openEditGroupPopup(callback, null, true);
				},
				addNewColumn: function(tag) {
					var entitySchema = this.get('entitySchema');
					var config = {
						type: tag,
						entitySchema: entitySchema,
						changeColumns: this.get('NewColumns').getItems()
					};
					var handler = function(args) {
						var newColumns = this.get('NewColumns');
						var entityColumn = args.entityColumn;
						newColumns.add(entityColumn.uId, entityColumn);
						var schemaItemConfig = Terrasoft.deepClone(args.itemConfig);
						schemaItemConfig.isDesigner = true;
						var Id = Terrasoft.generateGUID();
						Ext.apply(schemaItemConfig, {
							EditStructureContainerId: Id
						});
						this.addSchemaItem(schemaItemConfig, 0, this.getAddContainerName());
						this.setCurrentElement({
							itemName: schemaItemConfig.name,
							containerId: Id
						});
					};
					this.openColumnPage(config, handler);
				},
				getCurrentColumnInfo: function() {								// TODO: rename to getActiveSchemaItem
					var currentElement = this.getCurrentElement();
					if (Ext.isEmpty(currentElement)) {
						return null;
					}
					var result = this.findElementByNameModification(currentElement);
					if (Ext.isEmpty(result)) {
						return null;
					}
					var itemContainer = result.containerPath.pop();
					return itemContainer.items[result.index];
				},
				editColumn: function() {
					var item = Terrasoft.deepClone(this.getCurrentColumnInfo());
					if (this.isContainer(item)) {
						var callback = function(returnCode, controlData) {
							if (returnCode === 'ok' && controlData.name.value) {
								var columnConfig = Terrasoft.deepClone(item);
								columnConfig.caption = controlData.name.value;
								this.modifySchemaItem(item.name, Terrasoft.deepClone(columnConfig));
								/*
								this.insertModification({
									type: 'modify',
									value: Terrasoft.deepClone(columnConfig),
									name: item.name
								});
								Ext.apply(columnConfig, {EditStructureContainerId: this.getCurrentElement().containerId});
								*/
								this.updateGroup(columnConfig);
							}
						};
						this.openEditGroupPopup(callback, item.caption, false);
						return;
					}
					if (this.isColumn(item)) {
						var entitySchema = this.get('entitySchema');
						var config = {
							config: item,
							entitySchema: entitySchema,
							changeColumns: this.get('NewColumns').getItems()
						};
						var handler = function(args) {
							var prevName = args.itemConfig.name;
							var newColumns = this.get('NewColumns');
							if (newColumns.contains(args.entityColumn.uId)) {
								var columnConfig = newColumns.get(args.entityColumn.uId);
								prevName  = columnConfig.name;
								Ext.apply(columnConfig, args.entityColumn);
							} else {
								prevName  = args.entityColumn.name;
								newColumns.add(args.entityColumn.uId, args.entityColumn);
							}
							var Id = this.getCurrentElement().containerId;
							this.modifySchemaItem(prevName, Terrasoft.deepClone(args.itemConfig));
							/*this.insertModification({
								type: 'modify',
								value: Terrasoft.deepClone(args.itemConfig),
								name: prevName
							}, {EditStructureContainerId: Id});*/
							this.setCurrentElement({
								itemName: args.itemConfig.name,
								containerId: Id
							});

						};
						this.openColumnPage(config, handler);
					}
				},
				addColumn: function() {
					var config = {
						useBackwards: false,
						firstColumnsOnly: true,
						schemaName: this.entitySchema.name
					};
					var handler = function(args) {
						var columnConfig = this.getNewColumnConfig(args.leftExpressionColumnPath, args.dataValueType);
						var value = Terrasoft.deepClone(columnConfig);
						value.isDesigner = true;
						var findResult = this.findElementByNameModification({itemName: columnConfig.name});
						var Id = Terrasoft.generateGUID();
						if (Ext.isEmpty(findResult)) {
							this.insertModification({
								type: 'add',
								value: value,
								containerName: this.getAddContainerName(),
								position: 0
							}, {

							}, {
								EditStructureContainerId: Id
							});
						} else {
							var item = findResult.container[findResult.index];
							if (!item.visible) {
								this.insertModification({
									type: 'add',
									value: value
								});
							}
							Id = item .EditStructureContainerId
						}
						this.setCurrentElement({
							itemName: columnConfig.name,
							containerId: Id
						});

					};
					this.OpenStructureExplorer(config, handler);
				},
				findElementByNameModification: function(currentElement) {
					var mainContainersIds = ['customPanel', 'leftPanel', 'rightPanel'];
					var schema = this.get('schema');
					for (var i = 0; i < mainContainersIds.length; i++) {
						var containerName = mainContainersIds[i];
						if (!schema.schema.hasOwnProperty(containerName)) {
							continue;
						}
						var result = this.findSchemaItemIndexByName({
							items: schema.schema[containerName],
							name: currentElement.itemName,
							containerId: currentElement.containerId
						});
						if (result) {
							result.containerPath.unshift({
								name: containerName,
								items: schema.schema[containerName]
							});
							return result;
						}
					}
					return null;
				},
				findSchemaItemIndexByName: function(config) {
					var items = config.items;
					var skipVisibleValue = config.skipVisibleValue;
					var name = config.name;
					var containerId = config.containerId || null;
					var result = null;
					var itemIndex = 0;
					var visibleIndex = 0;
					Terrasoft.each(items, function(schemaItem) {
						if ((containerId === schemaItem.EditStructureContainerId) || (schemaItem.name === name)) {
							result = {
								container: items,
								index: itemIndex,
								visibleIndex: visibleIndex,
								containerPath: []
							};
						} else {
							var itemsContainer = (schemaItem instanceof Array) ? schemaItem : schemaItem.items;
							if (itemsContainer) {
								if (schemaItem.visible === false && !skipVisibleValue) {
									return true;
								}
								result = this.findSchemaItemIndexByName({
									items: itemsContainer,
									name: name,
									containerId: containerId,
									skipVisibleValue: skipVisibleValue
								});
								if (result) {
									result.containerPath.unshift(schemaItem);
								}
							}
						}
						itemIndex++;
						if (schemaItem.visible !== false) {
							visibleIndex++;
						}
						return Ext.isEmpty(result);
					}, this);
					/*
					for (var i = 0, length = items.length; i < length; i++) {
						var schemaItem = items[i];
						if ((containerId === schemaItem.EditStructureContainerId) || (schemaItem.name === name)) {
							return {
								container: items,
								index: i,
								visibleIndex: visibleIndex,
								containerPath: []
							};
						}
						if (schemaItem.visible !== false) {
							visibleIndex++;
						}
						if (schemaItem.items || schemaItem instanceof Array) {
							if (schemaItem.visible === false && !skipVisibleValue) {
								continue;
							}
							var result = this.findSchemaItemIndexByName({
								items: schemaItem.items,
								name: name,
								containerId: containerId,
								skipVisibleValue: skipVisibleValue
							});
							if (result) {
								result.containerPath.unshift(schemaItem);
								return result;
							}
						}
					}
					*/
					return result;
				},
				addSchemaItem: function(newSchemaItem, position, containerName) {
					var schema = this.get('schema');
					var container = schema.schema[containerName];
					var result = this.findSchemaItemIndexByName({
						items: schema.schema,
						name: newSchemaItem.name,
						containerId: null,
						skipVisibleValue: true
					});
					if (result) {
						var element = result.container[result.index];
						element.visible = true;
						element.viewVisible = true;
						var containerPath = result.containerPath;
						for (var i = 0, length = containerPath.length; i < length; i++) {
							containerPath[i].visible = true;
							containerPath[i].viewVisible = true;
						}
					} else {
						container.splice(position, 0, newSchemaItem);
					}
				},
				removeSchemaItem: function(schemaItemName) {
					var schema = this.get('schema');
					var result = this.findSchemaItemIndexByName({
						items: schema.schema,
						name: schemaItemName
					});
					if (result) {
						var itemIndex = result.index;
						var itemContainer = result.container;
						itemContainer.splice(itemIndex, 1);
					}
				},
				modifySchemaItem: function(schemaItemName, schemaItemModification) {
					var schema = this.get('schema');
					var result = this.findSchemaItemIndexByName({
						items: schema.schema,
						name: schemaItemName
					});
					if (result) {
						var schemaItem = result.container[result.index];
						Ext.apply(schemaItem, schemaItemModification);
					}
				},
				openColumnPage: function(config, callback) {
					if (!this.columnPAgePageParamsById) {
						this.columnPAgePageParamsById = [];
					}
					var scope = this;
					var handler = function(args) {
						callback.call(scope, args);
					};
					var columnPageId = sandbox.id + '_ColumnPage';
					sandbox.subscribe('GetColumnInfo', function() {
						scope.columnPAgePageParamsById[columnPageId] = config;
						return scope.columnPAgePageParamsById[columnPageId];
					}, [columnPageId]);
					var params = sandbox.publish('GetHistoryState');
					sandbox.publish('PushHistoryState', {
						hash: params.hash.historyState
					});
					sandbox.loadModule('ColumnPage', {
						renderTo: el,
						id: columnPageId,
						keepAlive: true
					});
					sandbox.subscribe('PushColumnInfo', handler, [columnPageId]);
				}
			});
		}

		return {
			init: init,

			render: render,

			destroy: function(config) {
				if (config.keepAlive !== true) {
					var schemaName;
					while (schemaName = loadedSchemaNames.pop()) {
						requirejs.undef(schemaName);
					}
				}
			}
		};
	}
);


