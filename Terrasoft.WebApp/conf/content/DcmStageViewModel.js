Terrasoft.configuration.Structures["DcmStageViewModel"] = {innerHierarchyStack: ["DcmStageViewModel"]};
define("DcmStageViewModel", ["ext-base", "terrasoft", "DcmStageViewModelResources", "ProcessSchemaUserTaskUtilities",
	"DcmStage", "DcmStageElementViewModel", "DcmReorderableContainer", "DcmStageViewConfigBuilder"
], function(Ext, Terrasoft, resources, UserTaskUtilities) {
	/**
	 * @class Terrasoft.Designers.DcmStageViewModel
	 */
	Ext.define("Terrasoft.Designers.DcmStageViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.DcmStageViewModel",

		mixins: {
			ReorderableContainerVMMixin: "Terrasoft.ReorderableContainerVMMixin",
			ReorderableItemVMMixin: "Terrasoft.ReorderableItemVMMixin",
			ObservableItem: "Terrasoft.ObservableItem"
		},

		columns: {
			/**
			 * Stage add button style.
			 * @type {String}
			 */
			AddButtonStyle: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				value: Terrasoft.enums.DcmStage.AddButtonStyle.INNER_ARROW
			},

			/**
			 * Stage wrap custom class name.
			 * @type {String}
			 */
			StageClassName: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Stage header color.
			 * @type {String}
			 */
			StageColor: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				value: null
			},

			/**
			 * UId of parent stage.
			 * @type {String}
			 */
			ParentStageUId: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.GUID
			},

			/**
			 * Dcm schema.
			 * @type {Terrasoft.DcmSchema}
			 */
			Schema: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Schema name.
			 * @type {String}
			 */
			Name: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Default dcm schema element name.
			 * @type {String}
			 */
			DefaultDcmElementName: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				value: "DcmElement"
			},

			/**
			 * Default dcm schema process element name.
			 * @type {String}
			 */
			DefaultDcmProcessElementName: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				value: "DcmProcessElement"
			},

			/**
			 * Schema caption.
			 * @type {String}
			 */
			Caption: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Schema validation state.
			 * @type {Boolean}
			 */
			IsValid: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
			},

			/**
			 * Flag that indicates whether element property page executes validation.
			 * @type {Boolean}
			 */
			IsValidateExecuted: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
			},

			/**
			 * New stage element type image config.
			 * @type {Object}
			 */
			AddDcmStageElementTypeButtonImageConfig: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Collection of all dcm elements.
			 * @type {Terrasoft.data.model.BaseViewModelCollection}
			 */
			DcmStageElementTypesCollection: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
			},

			/**
			 * Collection of available dcm elements that can be added via add button.
			 * @type {Terrasoft.data.model.BaseViewModelCollection}
			 */
			AvailableDcmStageElementTypesCollection: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
			},

			/**
			 * Caption for new dcm element.
			 * @type {String}
			 */
			NewDcmStageElementCaption: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			},

			/**
			 * Text edit placeholder for new dcm element.
			 * @type {String}
			 */
			NewDcmStageElementPlaceholder: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				value: resources.localizableStrings.NewDcmStageElementPlaceholder
			},

			/**
			 * Default dcm stage element type.
			 * @type {String}
			 */
			DefaultDcmStageElementTypeUId: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.GUID,
				value: "b5c726f2-af5b-4381-bac6-913074144308"
			},

			/**
			 * An indication that stage remove button is visible.
			 * @type {Boolean}
			 */
			IsVisibleStageRemoveButton: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
			},

			/**
			 * Flag that indicators the stage is selected.
			 * @type {Boolean}
			 */
			Selected: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
			},

			/**
			 * Flag that indicates whether the stage is visible.
			 * @type {Boolean}
			 */
			Visible: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Identifiers of alternative stages.
			 * @type {String[]}
			 */
			AlternativeStagesUIds: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT,
				value: []
			},

			/**
			 * Stage data item marker.
			 * @type {String}
			 */
			DataItemMarker: {
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT
			}
		},

		//region Properties: Public

		/**
		 * Parent view model.
		 * @type {Terrasoft.Designers.DcmSchemaDesignerViewModel}
		 */
		parentViewModel: null,

		/**
		 * Flag, that Indicates, whether view model is initialized.
		 * @type {Boolean}
		 */
		initialized: false,

		/**
		 * Add dcm element control class name.
		 * @type {String}
		 */
		addDcmStageElementClassName: "-add-dcm-stage-element",

		//endregion

		//region Constructors: Public

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.mixins.ReorderableItemVMMixin.preInit.call(this);
			this.mixins.ReorderableContainerVMMixin.preInit.call(this);
			this.initDcmStageElementTypesCollection(this.onDcmStageElementTypesCollectionInitialized, this);
			this.on("beforeItemMove", this.onBeforeDcmElementMove, this);
		},

		//endregion

		//region Methods: Private

		/**
		 * Initialize events.
		 * @private
		 */
		initEvents: function() {
			var doc = Ext.getDoc();
			this.mixins.ReorderableContainerVMMixin.initEvents.apply(this, arguments);
			this.addEvents(
				"initialized"
			);
			this.on("change:DefaultDcmStageElementTypeUId", this.onDefaultDcmStageElementTypeUIdChanged, this);
			this.on("change:ParentStageUId", this.onParentStageUIdChanged, this);
			this.on("change:Caption", this.onCaptionChanged, this);
			doc.on("click", this.onAddDcmStageElementBlur, this);
		},

		/**
		 * Simulates 'blur' event for add new dcm element button with menu and title text edit.
		 * If body click event target is not 'add new element control' than creates new element.
		 * @private
		 */
		onAddDcmStageElementBlur: function() {
			var stageUId = this.get("Id");
			var target = event.target;
			var utils = Terrasoft.utils.dom;
			var className = stageUId + this.addDcmStageElementClassName;
			if (!utils.hasClassName(target, className)) {
				var newElementCaption = this.get("NewDcmStageElementCaption");
				if (!Ext.isEmpty(newElementCaption)) {
					this.addDcmStageElement();
				}
			}
		},

		/**
		 * Caption change event handler. Updates stage data item marker.
		 * @private
		 */
		onCaptionChanged: function() {
			this.updateDataItemMarker();
		},

		/**
		 * Parent stage UId change handler.
		 * @private
		 */
		onParentStageUIdChanged: function() {
			this.parentViewModel.actualizeStages();
		},

		/**
		 * Returns stage add button style.
		 * @private
		 * @param {Boolean} isLast Indicates whether stage is last stage.
		 * @return {Terrasoft.enums.DcmStage.AddButtonStyle}
		 */
		getStageAddButtonStyle: function(isLast) {
			var addButtonStyle;
			var stage = this.getStage();
			var isAlternativeStage = stage.getIsAlternative();
			var isLastStageInGroup = stage.getIsLastStageInGroup();
			if (isLast) {
				addButtonStyle = Terrasoft.enums.DcmStage.AddButtonStyle.OUTER_ROUNDED;
			} else if (isAlternativeStage && !isLastStageInGroup) {
				addButtonStyle = Terrasoft.enums.DcmStage.AddButtonStyle.INNER_ROUNDED;
			} else {
				addButtonStyle = Terrasoft.enums.DcmStage.AddButtonStyle.INNER_ARROW;
			}
			return addButtonStyle;
		},

		/**
		 * DefaultDcmStageElementTypeUId change event handler. Sets image config for default element type.
		 * @private
		 */
		onDefaultDcmStageElementTypeUIdChanged: function() {
			this.setAddDcmStageElementTypeButtonImageConfig(Terrasoft.emptyFn);
		},

		/**
		 * Handler for dcm elements types collections initialization.
		 * @private
		 */
		onDcmStageElementTypesCollectionInitialized: function() {
			this.initAttributes();
			this.setAddDcmStageElementTypeButtonImageConfig(this.loadElements, this);
			this.subscribeOnItemChanged(this.getStage());
		},

		/**
		 * Creates and fills elements types collections.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} [scope] Callback function call context.
		 */
		initDcmStageElementTypesCollection: function(callback, scope) {
			this.set("DcmStageElementTypesCollection", Ext.create("Terrasoft.BaseViewModelCollection"));
			this.set("AvailableDcmStageElementTypesCollection", Ext.create("Terrasoft.BaseViewModelCollection"));
			this.fillDcmStageElementTypesCollection(callback, scope);
		},

		/**
		 * Fills elements type collections. If DcmStageElementTypesCollection has more than one item,
		 * fills AvailableDcmStageElementTypesCollection.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function call context.
		 */
		fillDcmStageElementTypesCollection: function(callback, scope) {
			var dcmStageElementTypesCollection = this.get("DcmStageElementTypesCollection");
			dcmStageElementTypesCollection.clear();
			var dcmElementSchemaManager = this.getDcmElementSchemaManager();
			dcmElementSchemaManager.getAllInstances(function(dcmElements) {
				this._sortDcmStageElements(dcmElements);
				dcmElements.forEach(function(dcmElement) {
					var taskMenuItem = this.getDcmStageElementTypeViewModel(dcmElement);
					var id = taskMenuItem.get("Id");
					dcmStageElementTypesCollection.add(id, taskMenuItem);
				}, this);
				if (dcmStageElementTypesCollection.getCount() > 1) {
					var availableDcmStageElementTypesCollection = this.get("AvailableDcmStageElementTypesCollection");
					availableDcmStageElementTypesCollection.loadAll(dcmStageElementTypesCollection);
				}
				callback.call(scope);
			}, this);
		},

		/**
		 * Sorts DCM stage elements.
		 * @private
		 * @param {Object[]} items DCM stage elements.
		 */
		_sortDcmStageElements: function(items) {
			items.sort(function(item1, item2) {
				var caption1 = item1.caption.getValue();
				var caption2 = item2.caption.getValue();
				return caption1.localeCompare(caption2);
			}.bind(this));
		},

		/**
		 * Returns image config for dcm schema element.
		 * @private
		 * @param {Terrasoft.configuration.DcmSchemaElement} dcmStageElement Dcm schema element.
		 * @return {Object} Image config.
		 */
		getDcmStageElementImageConfig: function(dcmStageElement) {
			return dcmStageElement.getImageConfig(dcmStageElement.dcmSmallImageName);
		},

		/**
		 * Creates and returns view model for dcm element type. Uses in dropDown menu in add button.
		 * @private
		 * @param {Terrasoft.configuration.DcmSchemaElement} dcmSchemaElement Dcm schema element.
		 * @return {Terrasoft.BaseViewModel}
		 */
		getDcmStageElementTypeViewModel: function(dcmSchemaElement) {
			var uId = dcmSchemaElement.managerItemUId;
			return Ext.create("Terrasoft.BaseViewModel", {
				values: {
					Id: uId,
					Tag: uId,
					Caption: dcmSchemaElement.caption.getValue(),
					ImageConfig: this.getDcmStageElementImageConfig(dcmSchemaElement),
					Click: {
						bindTo: "onDcmStageElementTypeMenuItemClick"
					}
				}
			});
		},

		/**
		 * Dcm element type click handler. Sets DefaultDcmStageElementTypeUId.
		 * @private
		 * @param {String} uId Selected dcm element type uId.
		 */
		onDcmStageElementTypeMenuItemClick: function(uId) {
			this.set("DefaultDcmStageElementTypeUId", uId);
			var caption = this.get("NewDcmStageElementCaption");
			if (!Ext.isEmpty(caption)) {
				this.onAddDcmStageElementByEnterPressed();
			}
		},

		/**
		 * Returns dcm element schema manager.
		 * @private
		 * @return {Terrasoft.manager.DcmElementSchemaManager}
		 */
		getDcmElementSchemaManager: function() {
			return Terrasoft.DcmElementSchemaManager;
		},

		/**
		 * Sets AddDcmStageElementTypeButtonImageConfig by DefaultDcmStageElementTypeUId.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} [scope] Callback function call context.
		 */
		setAddDcmStageElementTypeButtonImageConfig: function(callback, scope) {
			var defaultDcmStageElementTypeUId = this.get("DefaultDcmStageElementTypeUId");
			var dcmElementSchemaManager = this.getDcmElementSchemaManager();
			dcmElementSchemaManager.findInstanceByUId(defaultDcmStageElementTypeUId, function(dcmElement) {
				if (dcmElement != null) {
					var imageConfig = this.getDcmStageElementImageConfig(dcmElement);
					this.set("AddDcmStageElementTypeButtonImageConfig", imageConfig);
				}
				callback.call(scope || this);
			}, this);
		},

		/**
		 * Loads view model elements from dcm schema.
		 * @private
		 */
		loadElements: function() {
			var stageSchema = this.getStage();
			var elements = stageSchema.getItems();
			elements.each(function(element) {
				this.createDcmStageElementViewModel(element);
			}, this);
			this.initialized = true;
			this.fireEvent("initialized", this);
		},

		/**
		 * Creates dcm element view model and adds it to ViewModelItems collection.
		 * @private
		 * @param {Terrasoft.configuration.DcmSchemaElement} dcmStageElement Dcm element.
		 * @return {Terrasoft.DcmStageElementViewModel}
		 */
		createDcmStageElementViewModel: function(dcmStageElement) {
			var schema = this.get("Schema");
			var items = this.get("ViewModelItems");
			var dcmStageElementViewModel = Ext.create("Terrasoft.DcmStageElementViewModel", {
				values: {
					Id: dcmStageElement.uId,
					Schema: schema
				}
			});
			items.add(dcmStageElement.uId, dcmStageElementViewModel);
			return dcmStageElementViewModel;
		},

		/**
		 * Clears reorderable index.
		 * @private
		 */
		clearReorderableIndex: function() {
			this.mixins.ReorderableContainerVMMixin.clearReorderableIndex.call(this);
			var viewModelCollection = this.parentCollection;
			if (viewModelCollection) {
				viewModelCollection.each(function(viewModel) {
					viewModel.set("ReorderableIndex", null);
				}, this);
			}
		},

		/**
		 * Returns current stage.
		 * @private
		 * @return {Terrasoft.DcmSchemaStage}
		 */
		getStage: function() {
			var schema = this.get("Schema");
			var id = this.get("Id");
			var stage = schema.stages.get(id);
			return stage;
		},

		/**
		 * Converts HEX color to HSL.
		 * @private
		 * @param {String} hexColor HEX color.
		 * @return {Number[]} Get the equivalent HSL components of the color.
		 */
		convertHexToHsl: function(hexColor) {
			var color = Ext.draw.Color.fromString(hexColor);
			var hsl = color.getHSL();
			return hsl;
		},

		/**
		 * Sets visible remove stage button.
		 * @private
		 */
		setVisibleRemoveStageButton: function() {
			var schema = this.get("Schema");
			var stages = schema.stages;
			var isVisibleStageRemoveButton = stages.getCount() > 1;
			this.set("IsVisibleStageRemoveButton", isVisibleStageRemoveButton);
		},

		/**
		 * Shows remove stage dialog.
		 * @private
		 */
		showRemoveStageDialog: function() {
			this.showConfirmationDialog(resources.localizableStrings.RemoveStageDialogText,
				function(returnCode) {
					if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
						this.removeStage();
					}
				},
				[Terrasoft.MessageBoxButtons.NO.returnCode, Terrasoft.MessageBoxButtons.YES.returnCode],
				null);
		},

		/**
		 * Returns element unique name by specified prefix.
		 * @param {String} prefix Name prefix.
		 * @return {String}
		 */
		generateElementUniqueName: function(prefix) {
			var filterFn = function(stage, name) {
				var result = stage.elements.filterByFn(function(element) {
					return element.name === name || element.processFlowElement.name === name;
				});
				return result.first();
			};
			var schema = this.get("Schema");
			var itemName = UserTaskUtilities.generateItemUniqueName(prefix, schema.stages, filterFn);
			return itemName;
		},

		/**
		 * Loads empty properties page if add element input focused.
		 * @private
		 */
		onAddDcmStageElementFocused: function() {
			this.parentViewModel.loadEmptyPropertiesPage();
		},

		/**
		 * BeforeItemMove event handler. Processes the DcmSchema element movement
		 * and asks confirmation if it needed.
		 * @private
		 * @param {Object} sender Event sender.
		 * @param {Object} moveData Stage move data, see {@link #getMoveData}.
		 * @return {Boolean} True to continue move, False to cancel.
		 */
		onBeforeDcmElementMove: function(sender, moveData) {
			if (!moveData.needResetDcmSchemaElementTransition && !moveData.hasDependentElements) {
				return true;
			}
			var message = this.getMoveDcmElementConfirmationMessage(moveData);
			var messageBoxButtons = Terrasoft.MessageBoxButtons;
			this.showConfirmationDialog(message, function(returnCode) {
				if (returnCode === messageBoxButtons.YES.returnCode) {
					this.moveDcmSchemaElement(moveData);
				}
			}, [messageBoxButtons.YES, messageBoxButtons.NO], {defaultButton: 0});
			return false;
		},

		/**
		 * Returns DcmSchemaElement move confirmation message.
		 * @private
		 * @param {Object} moveData Stage move data, see {@link #getMoveData}.
		 * @return {String}
		 */
		getMoveDcmElementConfirmationMessage: function(moveData) {
			var dragDcmElementCaption = moveData.item.get("Caption");
			var messages = [];
			if (moveData.hasDependentElements) {
				var resetDependentElementsTransitionsMessage = this.getResetDependentElementsTransitionsMessage(
					dragDcmElementCaption,
					moveData.dependentElementsViewModels
				);
				messages.push(resetDependentElementsTransitionsMessage);
			}
			if (moveData.needResetDcmSchemaElementTransition) {
				var resetTransitionMessage = this.getResetElementTransitionMessage(
					dragDcmElementCaption,
					moveData.previousExecutedDcmElementViewModel
				);
				messages.push(resetTransitionMessage);
			}
			messages.push(resources.localizableStrings.MoveDcmSchemaElementQuestion);
			return messages.join("\n");
		},

		/**
		 * Returns message to reset transitions for dependent elements.
		 * @private
		 * @param {String} elementCaption Drag DcmSchemaElement caption.
		 * @param {Terrasoft.Designers.DcmStageElementViewModel[]} dependentElementsViewModels An array of
		 * dependent DcmSchemaElements view models.
		 * @return {String}
		 */
		getResetDependentElementsTransitionsMessage: function(elementCaption, dependentElementsViewModels) {
			var resetDependentElementsTransitionsMessageTemplate =
				resources.localizableStrings.MoveRootDcmSchemaElementConfirmationCaption;
			var dependentItemsCaptions = dependentElementsViewModels.map(function(viewModel) {
				return Terrasoft.getFormattedString("\"{0}\"", viewModel.get("Caption"));
			}, this);
			return Terrasoft.getFormattedString(
				resetDependentElementsTransitionsMessageTemplate,
				elementCaption,
				dependentItemsCaptions.join(", ")
			);
		},

		/**
		 * Returns message to reset DcmSchemaElement transition.
		 * @private
		 * @param {String} elementCaption Drag DcmSchemaElement caption.
		 * @param {Terrasoft.Designers.DcmStageElementViewModel} previousExecutedElementViewModel ViewModel of
		 * DcmSchemaElement after which drag element should be run.
		 * @return {String}
		 */
		getResetElementTransitionMessage: function(elementCaption, previousExecutedElementViewModel) {
			var messageTemplate = resources.localizableStrings.MoveDcmSchemaElementConfirmationCaption;
			return Terrasoft.getFormattedString(
				messageTemplate,
				elementCaption,
				previousExecutedElementViewModel.get("Caption")
			);
		},

		/**
		 * Moves DcmSchemaElement and actualizes its transition and dependent elements transitions.
		 * @private
		 * @param {Object} moveData Stage move data, see {@link #getMoveData}.
		 */
		moveDcmSchemaElement: function(moveData) {
			this.move(moveData);
			var dragDcmElementViewModel = moveData.item;
			var dragDcmElement = dragDcmElementViewModel.getSchemaElement();
			if (moveData.needResetDcmSchemaElementTransition) {
				dragDcmElement.setDefaultTransition();
			}
			if (moveData.hasDependentElements) {
				moveData.dependentElementsViewModels.forEach(function(viewModel) {
					var dependentDcmSchemaElement = viewModel.getSchemaElement();
					dependentDcmSchemaElement.setDefaultTransition();
				}, this);
			}
		},

		/**
		 * Complements moveData by such properties as dependentElementsViewModels and hasDependentElements.
		 * Fills dependentElementsViewModels property and sets hasDependentElements flag to true,
		 * if dependent elements exists.
		 * @private
		 * @param {Object} moveData Move data, see {@link #getMoveData}.
		 */
		applyMoveDataForDependentElements: function(moveData) {
			var sourceCollection = moveData.sourceCollection;
			var schema = this.get("Schema");
			var dependentElements = schema.findDependentElements(moveData.itemId);
			var dependentElementsViewModels = [];
			var targetIndex = moveData.targetIndex;
			if (sourceCollection === moveData.targetCollection) {
				dependentElements.forEach(function(dependentElement) {
					var dependentElementViewModel = sourceCollection.find(dependentElement.uId);
					var dependentElementIndex = sourceCollection.indexOf(dependentElementViewModel);
					if (targetIndex >= dependentElementIndex) {
						dependentElementsViewModels.push(dependentElementViewModel);
					}
				}, this);
			} else {
				dependentElementsViewModels = dependentElements.map(function(dependentElement) {
					return sourceCollection.find(dependentElement.uId);
				}, this);
			}
			Ext.apply(moveData, {
				hasDependentElements: dependentElementsViewModels.length !== 0,
				dependentElementsViewModels: dependentElementsViewModels
			});
		},

		/**
		 * Complements moveData by such properties as previousExecutedDcmElementViewModel and
		 * needResetDcmSchemaElementTransition. Sets previousExecutedDcmElementViewModel if drag element
		 * run after it, and sets needResetDcmSchemaElementTransition flag to true, if element movement
		 * broke execute chain.
		 * @private
		 * @param {Object} moveData Move data, see {@link #getMoveData}.
		 */
		applyMoveDataForChainElement: function(moveData) {
			var needResetDcmSchemaElementTransition = true;
			var dcmSchemaElement = moveData.item.getSchemaElement();
			var transition = dcmSchemaElement.getTransition();
			var transitionTypeUId = transition.getTransitionTypeUId();
			var isElementExecuteInChain =
				!Terrasoft.DcmSchemaElementTransitionFactory.getIsDefaultTransitionByTypeUId(transitionTypeUId);
			var transitionSourceElement = transition.findSourceElement();
			var sourceElementUId = transitionSourceElement ? transitionSourceElement.uId : null;
			var sourceCollection = moveData.sourceCollection;
			var previousExecutedDcmElementViewModel = sourceCollection.find(sourceElementUId);
			if (isElementExecuteInChain && sourceCollection === moveData.targetCollection) {
				var previousExecutedDcmElementIndex = sourceCollection.indexOf(previousExecutedDcmElementViewModel);
				needResetDcmSchemaElementTransition = moveData.targetIndex <= previousExecutedDcmElementIndex;
			}
			Ext.apply(moveData, {
				previousExecutedDcmElementViewModel: previousExecutedDcmElementViewModel,
				needResetDcmSchemaElementTransition: isElementExecuteInChain && needResetDcmSchemaElementTransition
			});
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#getMoveData
		 * Complements moveData by draggable dcmSchema element data and its dependent elements.
		 * @protected
		 * @overridden
		 */
		getMoveData: function() {
			var moveData = this.mixins.ReorderableContainerVMMixin.getMoveData.apply(this, arguments);
			if (moveData.cancel !== true) {
				this.applyMoveDataForDependentElements(moveData);
				this.applyMoveDataForChainElement(moveData);
			}
			return moveData;
		},

		/**
		 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#move
		 * @protected
		 * @overridden
		 */
		move: function(moveData) {
			var insertIndex = this.mixins.ReorderableContainerVMMixin.move.apply(this, arguments);
			var schema = this.get("Schema");
			var stageId = this.get("Id");
			schema.moveElement(moveData.itemId, stageId, insertIndex);
			return insertIndex;
		},

		/**
		 * Initialize attributes of view model.
		 * @protected
		 */
		initAttributes: function() {
			var stage = this.getStage();
			this.set("Name", stage.name);
			this.set("StageColor", stage.color);
			this.set("StageClassName", stage.name);
			this.set("Caption", stage.getDisplayValue());
			this.set("IsValidateExecuted", stage.isValidateExecuted);
			this.set("IsValid", stage.isValid);
			var parentStageUId = stage.getParentStageUId();
			this.set("ParentStageUId", parentStageUId);
			this.actualizeAlternativeStagesUIds();
			this.setVisibleRemoveStageButton();
		},

		/**
		 * Actualizes alternative stages uIds.
		 */
		actualizeAlternativeStagesUIds: function() {
			var stage = this.getStage();
			var alternativeStages = stage.getChildren();
			var alternativeStagesUIds = [];
			alternativeStages.each(function(alternativeStage) {
				alternativeStagesUIds.push(alternativeStage.uId);
			}, this);
			this.set("AlternativeStagesUIds", alternativeStagesUIds);
		},

		/**
		 * @inheritdoc Terrasoft.ObservableItem#getItemAttributeValue
		 * @protected
		 * @overridden
		 */
		getItemAttributeValue: function(item, key) {
			var value = this.mixins.ObservableItem.getItemAttributeValue.call(this, item, key);
			if (value instanceof Terrasoft.LocalizableString) {
				value = value.getValue();
			}
			return value;
		},

		/**
		 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
		 * @protected
		 * @overridden
		 */
		getAttributeMap: function() {
			var attributeMap = this.mixins.ObservableItem.getAttributeMap.call(this);
			var attributes = {
				color: "StageColor",
				caption: "Caption",
				parentStageUId: "ParentStageUId",
				isValid: "IsValid",
				isValidateExecuted: "IsValidateExecuted"
			};
			return Ext.apply(attributeMap, attributes);
		},

		/**
		 * Handler for remove button click.
		 * @protected
		 */
		onStageRemoveButtonClick: function() {
			var elementViewModels = this.get("ViewModelItems");
			if (elementViewModels.getCount() > 0) {
				this.showRemoveStageDialog();
			} else {
				this.removeStage();
			}
		},

		/**
		 * Removes stage.
		 * @protected
		 */
		removeStage: function() {
			var stageId = this.get("Id");
			var parentViewModel = this.parentViewModel;
			parentViewModel.removeStage(stageId);
		},

		/**
		 * Sets parent stage uId.
		 * @param {String} parentStageUId Parent stage uId.
		 */
		setParentStageUId: function(parentStageUId) {
			var stage = this.getStage();
			stage.setPropertyValue("parentStageUId", parentStageUId);
		},

		/**
		 * Returns True if stage is alternative.
		 * @return {Boolean} True if stage is alternative.
		 */
		getIsAlternative: function() {
			var stage = this.getStage();
			return stage.getIsAlternative();
		},

		/**
		 * Returns parent stage uId.
		 * @return {String|null} Parent stage uId.
		 */
		getParentStageUId: function() {
			var stage = this.getStage();
			return stage.getParentStageUId();
		},

		/**
		 * Returns parent stage. If stage is not alternative stage, returns null.
		 * @return {Terrasoft.Designers.DcmSchemaStage|null} Parent stage.
		 */
		getParentStage: function() {
			var stage = this.getStage();
			return stage.getParentStage();
		},

		/**
		 * Returns flag that indicates whether that stage instance is parent of alternative stages group.
		 * @return {Boolean} True if stage is parent of group, else False.
		 */
		getIsParent: function() {
			var stage = this.getStage();
			return stage.getIsParent();
		},

		/**
		 * Returns flag that indicates whether the stage is last stage in group.
		 * If stage is not alternative to another stage, returns false.
		 * @return {Boolean}
		 */
		getIsLastStageInGroup: function() {
			var stage = this.getStage();
			return stage.getIsLastStageInGroup();
		},

		/**
		 * Before stage drag start event handler. If stage is parent for group, hides children stages.
		 * @private
		 */
		onBeforeStartDrag: function() {
			if (this.getIsParent()) {
				this.parentViewModel.hideChildGroupItems(this);
			}
		},

		/**
		 * Returns unselected stage color
		 * @protected
		 * @param {String} stageColor Stage color.
		 * @return {String}
		 */
		getUnselectedStageColor: function(stageColor) {
			var saturation = 35;
			var alpha = 0.7;
			var hsl = this.convertHexToHsl(stageColor);
			var lightness = hsl[2] * 100;
			var hsla = Ext.String.format("hsla({0}, {1}%, {2}%, {3})", hsl[0], saturation, lightness, alpha);
			return hsla;
		},

		/**
		 * Updates stage data item marker.
		 */
		updateDataItemMarker: function() {
			var dataItemMarker = "caption:{caption} position:{position}";
			var stage = this.getStage();
			var stageIndex = stage.parentSchema.stages.indexOf(stage);
			var templateValues = {
				caption: this.get("Caption"),
				position: stageIndex + 1
			};
			if (stage.getIsAlternative() === true) {
				var parentStage = stage.getParentStage();
				templateValues.groupCaption = parentStage.getDisplayValue();
				dataItemMarker += " groupCaption:{groupCaption}";
				if (stage.getIsParent() === true) {
					dataItemMarker += " parent";
				} else {
					var alternativeStages = parentStage.getChildren();
					var indexInGroup = alternativeStages.indexOf(stage);
					templateValues.groupPosition = indexInGroup + 1;
					dataItemMarker += " groupPosition:{groupPosition}";
				}
				if (stage.getIsLastStageInGroup() === true) {
					dataItemMarker += " finalInGroup";
				}
			}
			Terrasoft.each(templateValues, function(value, placeholder) {
				var searchPattern = new RegExp("\\{" + placeholder + "\\}", "g");
				dataItemMarker = dataItemMarker.replace(searchPattern, value);
			}, this);
			this.set("DataItemMarker", dataItemMarker);
		},

		/**
		 * Returns module view configuration.
		 * @protected
		 * @return {Object} Module view configuration.
		 */
		getViewConfig: function() {
			var builder = Ext.create("Terrasoft.DcmStageViewConfigBuilder", {viewModel: this});
			return builder.build();
		},

		/**
		 * Finds items collection by key.
		 * @protected
		 * @param {String} key Item id.
		 * @return {Terrasoft.BaseViewModelCollection|null}
		 */
		findViewModeCollectionByKey: function(key) {
			var result = this.mixins.ReorderableContainerVMMixin.findViewModeCollectionByKey.call(this, key);
			if (!result) {
				var viewModelCollection = this.parentCollection;
				viewModelCollection.each(function(viewModel) {
					var collection = viewModel.get("ViewModelItems");
					if (collection.contains(key)) {
						result = collection;
						return false;
					}
				}, this);
			}
			return result;
		},

		//endregion

		//region Methods: Public

		/**
		 * Clears all event subscriptions, and destroys the object.
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			var doc = Ext.getDoc();
			this.unsubscribeAllItems();
			this.callParent(arguments);
			doc.un("click", this.onAddDcmStageElementBlur, this);
		},

		/**
		 * Creates new DcmStage and adds it after current.
		 */
		onAddDcmStageButtonClick: function() {
			var parentViewModel = this.parentViewModel;
			var stageId = this.get("Id");
			var index = parentViewModel.indexOf(stageId);
			var isLastStageInGroup = this.getIsLastStageInGroup();
			var parentStageUId = isLastStageInGroup ? null : this.getParentStageUId();
			parentViewModel.createStage({
				parentStageUId: parentStageUId
			}, index + 1);
		},

		/**
		 * Adds new dcm element and sets it caption with NewDcmStageElementCaption attribute value.
		 * If NewDcmStageElementCaption is empty, new element doesn't creates.
		 * After element adds, clears NewDcmStageElementCaption attribute value.
		 * @return {Terrasoft.manager.DcmSchemaElement}
		 */
		addDcmStageElement: function() {
			var elementCaption = this.get("NewDcmStageElementCaption");
			var stage = this.getStage();
			var managerItemUId = this.get("DefaultDcmStageElementTypeUId");
			var defaultDcmElementName = this.get("DefaultDcmElementName");
			var defaultDcmProcessElementName = this.get("DefaultDcmProcessElementName");
			// TODO #CRM-26574
			// http://tscore-task/browse/CRM-26574
			// DcmElementSchemaManager.js Implement createInstance method
			// that will create the desired DcmSchemaElement FlowElement by managerItemUId.
			var dcmElement = Ext.create("Terrasoft.DcmSchemaElement", {
				uId: Terrasoft.generateGUID(),
				name: this.generateElementUniqueName(defaultDcmElementName),
				caption: elementCaption,
				isValidateExecuted: false
			});
			var manager = Terrasoft.DcmElementSchemaManager;
			var processElement = dcmElement.processFlowElement = manager.createInstance(managerItemUId);
			processElement.uId = Terrasoft.generateGUID();
			processElement.name = this.generateElementUniqueName(defaultDcmProcessElementName);
			processElement.caption = Ext.create("Terrasoft.LocalizableString", elementCaption);
			processElement.isValidateExecuted = false;
			dcmElement.isValid = processElement.isValid;
			if (!elementCaption) {
				dcmElement.isValid = false;
				processElement.isValid = false;
			}
			stage.add(dcmElement);
			this.createDcmStageElementViewModel(dcmElement);
			this.set("NewDcmStageElementCaption", "");
			return dcmElement;
		},

		/**
		 * Adds new dcm element by ENTER key pressed, selects it and opens parameters page.
		 */
		onAddDcmStageElementByEnterPressed: function() {
			var element = this.addDcmStageElement();
			this.parentViewModel.onItemSelected(element.uId);
		},

		/**
		 * Actualize add button style. If stage is last, sets OUTER_ROUNDED style, else sets INNER_ARROW if stage
		 * was last and not change style if stage wasn't last.
		 * @param {Boolean} isLast Indicates whether stage is last stage.
		 */
		actualizeStage: function(isLast) {
			this.actualizeAlternativeStagesUIds();
			var addButtonStyle = this.getStageAddButtonStyle(isLast);
			this.set("AddButtonStyle", addButtonStyle);
			this.updateDataItemMarker();
		},

		/**
		 * Actualize color.
		 * @param {Boolean} isExistSelectedStage Indicates the existence of the selected stage.
		 */
		actualizeColor: function(isExistSelectedStage) {
			var stage = this.getStage();
			var stageColor = stage.color;
			var color = !isExistSelectedStage || this.get("Selected")
				? stageColor
				: this.getUnselectedStageColor(stageColor);
			this.set("StageColor", color);
		},

		/**
		 * Set selected item.
		 * @param {Boolean} isSelected A flag that indicates that the item is selected.
		 */
		setSelected: function(isSelected) {
			this.set("Selected", isSelected);
			if (isSelected) {
				this.setVisibleRemoveStageButton();
			}
		},

		/**
		 * Returns True if stage is child stage for stage with parentStageUId
		 * @param {String} parentStageUId Parent stage uId.
		 * @return {Boolean}
		 */
		getIsChildStage: function(parentStageUId) {
			var stageParentUId = this.get("ParentStageUId");
			var stageUId = this.get("Id");
			return stageParentUId === parentStageUId && stageUId !== parentStageUId;
		}

		//endregion

	});

	return Terrasoft.Designers.DcmStageViewModel;
});


