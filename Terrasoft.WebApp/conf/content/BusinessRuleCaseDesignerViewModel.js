Terrasoft.configuration.Structures["BusinessRuleCaseDesignerViewModel"] = {innerHierarchyStack: ["BusinessRuleCaseDesignerViewModel"]};
define("BusinessRuleCaseDesignerViewModel", ["BusinessRuleCaseDesignerViewModelResources",
	"BusinessRuleElementDesignerViewModel", "BusinessRuleConditionGroupDesignerViewModel",
	"BusinessRuleActionDesignerViewModel", "BusinessRuleBindParameterActionDesignerViewModel",
	"BusinessRuleBindParameterActionDesignerContainer", "BusinessRuleConditionDesignerViewModel",
	"BusinessRuleFilterActionDesignerViewModel"], function(resources) {

		/**
		 * @class Terrasoft.Designers.BusinessRuleCaseDesignerViewModel
		 */
		Ext.define("Terrasoft.Designers.BusinessRuleCaseDesignerViewModel", {
			extend: "Terrasoft.BusinessRuleElementDesignerViewModel",
			alternateClassName: "Terrasoft.BusinessRuleCaseDesignerViewModel",

			columns: {

				/**
				 * Case action collection.
				 * @type {Terrasoft.BusinessRuleActionViewModel}
				 */
				"ActionCollection": {
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * Case condition group.
				 * @type {Terrasoft.BusinessRuleConditionGroupViewModel}
				 */
				"ConditionGroup": {
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Action menu items.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				"ActionMenuItems": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				},

				/**
				 * Able to add action.
				 * @type {Boolean}
				 */
				"CanAddAction": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * Add icon enabled image.
				 * @type {Object}
				 */
				"AddIconEnabled": {
					"dataValueType": Terrasoft.DataValueType.IMAGE,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": resources.localizableImages.AddIconEnabled
				},

				/**
				 * Add icon disabled image.
				 * @type {Object}
				 */
				"AddIconDisabled": {
					"dataValueType": Terrasoft.DataValueType.IMAGE,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": resources.localizableImages.AddIconDisabled
				},

				/**
				 * Add condition button caption.
				 * @type {String}
				 */
				"AddConditionButtonCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": resources.localizableStrings.AddConditionButtonCaption
				},

				/**
				 * Add action button caption.
				 * @type {String}
				 */
				"AddActionButtonCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": resources.localizableStrings.AddActionButtonCaption
				},

				/**
				 * Able to add action.
				 * @type {Boolean}
				 */
				"CanAddCondition": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": true
				}
			},

			//region Methods: Private

			/**
			 * Action collection changed handler.
			 * @private
			 */
			onActionCollectionChange: function() {
				var actionCollection = this.get("ActionCollection");
				this.set("CanAddAction", actionCollection.getCount() < 1);
				if (!this.getCanAddConditionProperty()) {
					var conditionGroup = this.get("ConditionGroup");
					conditionGroup.clearConditions();
				}
			},

			/**
			 * @private
			 */
			_isActionDependsOnEntitySchema: function(action) {
				var actionClass = this.Ext.ClassManager.get(action.className);
				return actionClass.prototype instanceof Terrasoft.ColumnBusinessRuleAction;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Prepares action menu items.
			 * @protected
			 */
			prepareActionMenuItems: function() {
				var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var actionInfo = this.Terrasoft.BusinessRuleElementHelper.getElementsByGroupType("BusinessRuleActions");
				Terrasoft.each(actionInfo, function(action) {
					var designConfig = action.designConfig;
					if (!designConfig || designConfig.canDesign === false) {
						return true;
					}
					if (!this.entitySchemaUId && this._isActionDependsOnEntitySchema(action)) {
						return;
					}
					var methodName = "add" + action.type;
					this[methodName] = function() {
						this.addAction(action.type);
					};
					actionMenuItems.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Caption: action.designConfig.listCaption,
							Click: {bindTo: methodName}
						}
					}));
				}, this);
				this.set("ActionMenuItems", actionMenuItems);
			},

			/**
			 * Prepares condition collection from meta item.
			 * @protected
			 */
			prepareConditionGroup: function() {
				var metaItem = this.getMetaItem();
				var conditionGroup = this.createBusinessRuleConditionGroupViewModel({
					MetaItem: metaItem.getPropertyValue("condition"),
					MetaItemType: "BusinessRuleConditionGroup"
				});
				conditionGroup.on("itemCollectionChanged", this.updateCanAddConditionProperty, this);
				conditionGroup.on("pullChanges", this.onPullChanges, this);
				this.set("ConditionGroup", conditionGroup);
			},

			/**
			 * Prepares action collection from meta item.
			 * @protected
			 */
			prepareActionCollection: function() {
				var metaItem = this.getMetaItem();
				var actionGroupMetaItem = metaItem.getPropertyValue("action");
				var actionCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(actionGroupMetaItem.getPropertyValue("items"), function(actionMetaItem) {
					this.createActionViewModel(actionMetaItem, actionCollection);
				}, this);
				actionCollection.on("add", this.onActionCollectionChange, this);
				actionCollection.on("remove", this.onActionCollectionChange, this);
				actionCollection.on("clear", this.onActionCollectionChange, this);
				this.set("ActionCollection", actionCollection);
				this.onActionCollectionChange();
			},

			/**
			 * Creates action view model.
			 * @param {Object} actionMetaItem Action meta item.
			 * @param {Object} actionCollection Action view model collection.
			 */
			createActionViewModel: function(actionMetaItem, actionCollection) {
				var className = this.Ext.getClassName(actionMetaItem);
				var element = this.Terrasoft.BusinessRuleElementHelper.getElementByClassName(className);
				var viewModelClassName = element.designConfig.viewModelClassName;
				var actionViewModel = this.createBusinessRuleActionViewModel(viewModelClassName, {
					ActionType: element.type,
					MetaItem: actionMetaItem,
					ControlClassName: element.designConfig.controlClassName
				});
				actionViewModel.on("removeAction", this.onActionRemove, this);
				actionViewModel.on("pullChanges", this.onPullChanges, this);
				actionCollection.add(actionViewModel.get("Id"), actionViewModel);
			},

			/**
			 * Creates business rule condition designer view model.
			 * @protected
			 * @param {Object} columnValues Column values.
			 * @return {Terrasoft.BusinessRuleConditionGroupDesignerViewModel} Business rule condition designer view model.
			 */
			createBusinessRuleConditionGroupViewModel: function(columnValues) {
				return this.createItemViewModel("Terrasoft.BusinessRuleConditionGroupDesignerViewModel", columnValues);
			},

			/**
			 * Creates business rule action designer view model.
			 * @protected
			 * @param {String} className Action class name.
			 * @param {Object} columnValues Column values.
			 * @return {Terrasoft.BusinessRuleActionDesignerViewModel} Business rule action designer view model.
			 */
			createBusinessRuleActionViewModel: function(className, columnValues) {
				return this.createItemViewModel(className, columnValues);
			},

			/**
			 * Updates condition meta item.
			 * @protected
			 */
			updateConditionMetaItem: function(next, metaItem) {
				var conditionGroupViewModel = this.get("ConditionGroup");
				conditionGroupViewModel.updateMetaItem(function() {
					metaItem.setPropertyValue("condition", conditionGroupViewModel.getMetaItem());
					next();
				}, this);
			},

			/**
			 * Updates action meta items.
			 * @protected
			 */
			updateActionMetaItems: function(next, metaItem) {
				var actionGroup = metaItem.getPropertyValue("action");
				var items = this.get("ActionCollection");
				var actionMetaItems = [];
				this.updateMetaItems(items.getItems(), function() {
					items.each(function(actionViewModel) {
						actionMetaItems.push(actionViewModel.getMetaItem());
					}, this);
					actionGroup.setPropertyValue("items", actionMetaItems);
					next();
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getMetaItemUpdaters
			 * @overridden
			 */
			getMetaItemUpdaters: function() {
				var updaters = this.callParent(arguments);
				updaters.push(this.updateConditionMetaItem);
				updaters.push(this.updateActionMetaItems);
				return updaters;
			},

			/**
			 * Unsubscribe action collection events.
			 * @protected
			 */
			unsubscribeActionCollectionEvents: function() {
				var actionCollection = this.get("ActionCollection");
				actionCollection.un("add", this.onActionCollectionChange, this);
				actionCollection.un("remove", this.onActionCollectionChange, this);
				actionCollection.un("clear", this.onActionCollectionChange, this);
			},

			/**
			 * Unsubscribe action collection items events.
			 * @protected
			 */
			unsubscribeActionCollectionItemsEvents: function() {
				var actionCollection = this.get("ActionCollection");
				actionCollection.each(function(item) {
					item.un("removeAction", this.onActionRemove, this);
				}, this);
			},

			/**
			 * Unsubscribe condition group events.
			 * @protected
			 */
			unsubscribeConditionGroupEvents: function() {
				var conditionGroup = this.get("ConditionGroup");
				conditionGroup.un("itemCollectionChanged", this.updateCanAddConditionProperty, this);
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#unsubscribePullChangesEvent
			 * @overridden
			 */
			unsubscribePullChangesEvent: function() {
				this.$ConditionGroup.un("pullChanges", this.onPullChanges, this);
				this.$ActionCollection.each(function(actionItem) {
					actionItem.un("pullChanges", this.onPullChanges, this);
				}, this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onDestroy
			 * @protected
			 */
			onDestroy: function() {
				this.unsubscribeConditionGroupEvents();
				this.unsubscribeActionCollectionItemsEvents();
				this.unsubscribeActionCollectionEvents();
				this.callParent(arguments);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.prepareActionMenuItems();
				this.prepareConditionGroup();
				this.prepareActionCollection();
				this.updateCanAddConditionProperty();
			},

			/**
			 * Adds condition.
			 */
			addCondition: function() {
				var conditionGroup = this.get("ConditionGroup");
				conditionGroup.addEmptyCondition();
			},

			/**
			 * Adds action.
			 * @param {String} actionType Action type.
			 */
			addAction: function(actionType) {
				var actionCollection = this.get("ActionCollection");
				var element = this.Terrasoft.BusinessRuleElementHelper.getElementByType(actionType);
				var actionViewModel = this.createBusinessRuleActionViewModel(element.designConfig.viewModelClassName, {
					MetaItemType: actionType,
					ControlClassName: element.designConfig.controlClassName
				});
				actionViewModel.on("removeAction", this.onActionRemove, this);
				actionViewModel.on("pullChanges", this.onPullChanges, this);
				actionCollection.add(actionViewModel.get("Id"), actionViewModel);
				this.updateCanAddConditionProperty();
			},

			/**
			 * Action remove handler.
			 * @param {Terrasoft.BusinessRuleActionDesignerViewModel} action Action.
			 * @private
			 */
			onActionRemove: function(action) {
				var collection = this.get("ActionCollection");
				action.un("removeAction", this.onActionRemove, this);
				action.un("pullChanges", this.onPullChanges, this);
				collection.remove(action);
				this.updateCanAddConditionProperty();
			},

			/**
			 * Returns action button image.
			 * @return {Object} Action button image.
			 */
			getActionIcon: function() {
				return this.get("CanAddAction")
					? this.get("AddIconEnabled")
					: this.get("AddIconDisabled");
			},

			/**
			 * Returns action button image.
			 * @return {Object} Action button image.
			 */
			getConditionIcon: function() {
				return this.get("CanAddCondition")
					? this.get("AddIconEnabled")
					: this.get("AddIconDisabled");
			},

			/**
			 * Returns is can add condition.
			 * @protected
			 * @return {Boolean} Can add condition.
			 */
			updateCanAddConditionProperty: function() {
				var canAddCondition = this.getCanAddConditionProperty();
				var conditionGroup = this.get("ConditionGroup");
				this.set("CanAddCondition", canAddCondition);
				if (conditionGroup) {
					var conditions = conditionGroup.get("Items");
					var visible = canAddCondition && conditions && !conditions.isEmpty();
					conditionGroup.set("Visible", visible);
				}
			},

			/**
			 * Returns is can add condition.
			 * @protected
			 * @return {Boolean} Can add condition.
			 */
			getCanAddConditionProperty: function() {
				var actionCollection = this.get("ActionCollection");
				var action = actionCollection.getByIndex(0);
				return (!Ext.isEmpty(action))
					? action.get("MetaItemType") !== "FiltrationBusinessRuleAction"
					: true;
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getAsyncValidateList
			 * @overridden
			 */
			getAsyncValidators: function() {
				var validationMethods = this.callParent();
				validationMethods.push(this.validateCase, this.asyncValidateConditionGroup, this.asyncValidateActions);
				return validationMethods;
			},

			/**
			 * Async validate condition group.
			 * @param {Function} next Callback method.
			 * @param {Object} Validation info.
			 */
			asyncValidateConditionGroup: function(next, validationInfo) {
				var conditionGroup = this.get("ConditionGroup");
				if (!this.get("CanAddCondition") || Ext.isEmpty(conditionGroup)) {
					next(validationInfo);
					return;
				}
				conditionGroup.asyncValidate(function(groupValidationInfo) {
					this.applyValidationInfo(validationInfo, groupValidationInfo);
					next(validationInfo);
				}, this);
			},

			/**
			 * Async validate actions.
			 * @param {Function} next Callback function.
			 * @param {Object} validationInfo Validation information.
			 */
			asyncValidateActions: function(next, validationInfo) {
				var actionCollection = this.get("ActionCollection");
				var actions = actionCollection.getItems();
				this.asyncValidateItems(actions, validationInfo, next, this);
			},

			/**
			 * Validate case.
			 * @param {Function} callback Callback function.
			 * @param {Object} validationInfo Validation information.
			 */
			validateCase: function(callback, validationInfo) {
				var actionCollection = this.get("ActionCollection");
				var countAction = actionCollection.getCount();
				var conditionGroup = this.get("ConditionGroup");
				var conditions = conditionGroup.get("Items");
				var countCondition = conditions.getCount();
				var needCondition = this.get("CanAddCondition");
				if (countAction === 0 || (needCondition && countCondition === 0)) {
					validationInfo.isValid = false;
					validationInfo.messageList.push(resources.localizableStrings.InvalidConditonAndActionCountMessage);
				}
				if (!needCondition && countCondition !== 0) {
					validationInfo.isValid = false;
					validationInfo.messageList.push(resources.localizableStrings.InvalidConditionFiltrationActionMessage);
				}
				callback.call(this, validationInfo);
			},

			/**
			 * Returns instance of business rule case.
			 * @return {Terrasoft.BusinessRuleCase} Business rule case instance.
			 */
			createMetaItem: function() {
				return Ext.create("Terrasoft.BusinessRuleCase", {
					action: {
						type: "BusinessRuleActionGroup",
						items: []
					}
				});
			}

			//endregion

		});
	});


