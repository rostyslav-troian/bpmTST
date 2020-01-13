Terrasoft.configuration.Structures["BusinessRuleConditionGroupDesignerContainer"] = {innerHierarchyStack: ["BusinessRuleConditionGroupDesignerContainer"]};
define("BusinessRuleConditionGroupDesignerContainer", ["css!BusinessRuleConditionGroupDesignerContainer"], function() {

	/**
	 * @class Terrasoft.controls.BusinessRuleConditionGroupDesignerContainer
	 */
	Ext.define("Terrasoft.controls.BusinessRuleConditionGroupDesignerContainer", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.BusinessRuleConditionGroupDesignerContainer",

		// region Properties: Private

		/**
		 * Operation type.
		 * @type {String}
		 */
		operationType: null,

		/**
		 * Condition item actions.
		 * @type {Object[]}
		 */
		itemActions: null,

		/**
		 * Operation type wrap css class name.
		 * @type {String}
		 */
		operationTypeWrapClassName: "case-condition-operation-type-wrap",

		/**
		 * Operation type css class name.
		 * @type {String}
		 */
		operationTypeClassName: "case-condition-operation-type",

		/**
		 * Condition item wrap css class name.
		 * @type {String}
		 */
		conditionItemWrapClassName: "case-condition-item-wrap",

		// endregion

		// region Methods: Private

		/**
		 * Returns operation type caption.
		 * @private
		 * @return {String} Operation type caption.
		 */
		getOperationTypeCaption: function() {
			return this.operationType === Terrasoft.LogicalOperatorType.OR
				? Terrasoft.Resources.LogicalOperatorType.OR
				: Terrasoft.Resources.LogicalOperatorType.AND;
		},

		/**
		 * Operation type dom element click event handler.
		 * @private
		 */
		onOperationTypeElClick: function() {
			var operationType = this.operationType === Terrasoft.LogicalOperatorType.AND
				? Terrasoft.LogicalOperatorType.OR
				: Terrasoft.LogicalOperatorType.AND;
			this.setOperationType(operationType);
		},

		/**
		 * Sets operation type.
		 * @private
		 * @param {Terrasoft.LogicalOperatorType} value Value.
		 */
		setOperationType: function(value) {
			if (this.operationType !== value) {
				this.operationType = value;
				if (this.operationTypeEl) {
					this.operationTypeEl.dom.innerHTML = this.getOperationTypeCaption();
				} else {
					this.safeRerender();
				}
				this.fireEvent("operationTypeChanged", value);
			}
		},

		/**
		 * Condition collection data loaded event handler.
		 * @private
		 * @param {Terrasoft.BaseViewModelCollection} collection Collection.
		 */
		onCollectionDataLoaded: function(collection) {
			this.onCollectionCleared();
			if (collection) {
				collection.each(function(itemModel) {
					this.addToCollection(itemModel, this.items);
				}, this);
			}
		},

		/**
		 * Condition collection item added event handler.
		 * @private
		 * @param {Terrasoft.BaseViewModel} modelItem Model item.
		 */
		onCollectionItemAdded: function(modelItem) {
			this.add(modelItem);
			var item = this.items.get(modelItem.get("Id"));
			item.bind(modelItem);
			this.safeRerender();
		},

		/**
		 * Condition collection item removed event handler.
		 * @private
		 * @param {Terrasoft.BaseViewModel} modelItem Model item.
		 */
		onCollectionItemRemoved: function(modelItem) {
			var id = modelItem.get("Id");
			var item = this.items.get(id);
			this.destroyItem(item);
			this.remove(item);
		},

		/**
		 * Condition collection cleared event handler.
		 * @private
		 */
		onCollectionCleared: function() {
			this.items.each(function(item) {
				this.destroyItem(item);
				this.remove(item);
			}, this);
		},

		/**
		 * Returns action button config for condition item.
		 * @private
		 * @param {String} itemId Item id.
		 * @return {Object} Action button config.
		 */
		getItemActions: function(itemId) {
			if (!Ext.isArray(this.itemActions)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var clonedItemActions = Terrasoft.deepClone(this.itemActions);
			var self = this;
			Terrasoft.each(clonedItemActions, function(itemAction) {
				itemAction.onClick = function() {
					self.fireEvent("itemActionClick", itemAction.tag, itemId);
				};
			}, this);
			return {
				"className": "Terrasoft.Container",
				"items": clonedItemActions
			};
		},

		/**
		 * Returns condition item view config.
		 * @private
		 * @param {Terrasoft.BaseViewModel} modelItem Model item.
		 * @return {Object} Condition item view config.
		 */
		getItemViewConfig: function(modelItem) {
			var itemId = modelItem.get("Id");
			var result = {
				"className": "Terrasoft.Container",
				"id": itemId,
				"items": [modelItem.getViewConfig()]
			};
			if (this.itemActions) {
				result.items.push(this.getItemActions(itemId));
			}
			return result;
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#getTpl
		 * @overriden
		 */
		getTpl: function() {
			return [
				"<div id=\"{id}-wrap\" class=\"{wrapClass}\" style=\"{wrapStyle}\">",
					"<div id=\"{id}-operation-type-wrap\" class=\"{operationTypeWrapClassName}\">",
						"<div id=\"{id}-operation-type\" class=\"{operationTypeClassName}\">",
							"{operationType}",
						"</div>",
					"</div>",
					"<div id=\"{id}-item-container-wrap\" class=\"{conditionItemWrapClassName}\">",
						"{%this.renderItems(out, values)%}",
					"</div>",
				"</div>"
			];
		},

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @overriden
		 */
		getTplData: function() {
			var tplData = this.callParent();
			var wrapClasses = ["case-condition-container-wrap"];
			if (tplData.wrapClass) {
				wrapClasses.push(tplData.wrapClass);
			}
			tplData.operationType = this.getOperationTypeCaption();
			tplData.wrapClass = wrapClasses;
			tplData.operationTypeWrapClassName = this.operationTypeWrapClassName;
			tplData.operationTypeClassName = this.operationTypeClassName;
			tplData.conditionItemWrapClassName = this.conditionItemWrapClassName;
			this.selectors = this.getSelectors();
			return tplData;
		},

		/**
		 * Returns dom element selectors.
		 * @protected
		 * @return {Object} Dom element selectors.
		 */
		getSelectors: function() {
			return {
				wrapEl: "#" + this.id + "-wrap",
				operationTypeEl: "#" + this.id + "-operation-type",
				itemContainerEl: "#" + this.id + "-item-container-wrap"
			};
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @overriden
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			if (this.operationTypeEl) {
				this.operationTypeEl.on("click", this.onOperationTypeElClick, this);
			}
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#prepareItem
		 * @overriden
		 */
		prepareItem: function(item) {
			if (Terrasoft.instanceOfClass(item, "Terrasoft.BaseModel") && Ext.isFunction(item.getViewConfig)) {
				return this.callParent([this.getItemViewConfig(item)]);
			} else {
				throw new Terrasoft.UnsupportedTypeException();
			}
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#bindItems
		 * @overriden
		 */
		bindItems: function(model) {
			var modelItemName = this.bindings.items.modelItem;
			var modelItems = model.get(modelItemName);
			this.items.each(function(item) {
				var modelItem = modelItems.get(item.id);
				item.bind(modelItem);
			});
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @overriden
		 */
		getBindConfig: function() {
			var result = this.callParent(arguments);
			return Ext.apply(result, {
				operationType: {
					changeMethod: "setOperationType",
					changeEvent: "operationTypeChanged"
				},
				itemActionClick: {
					changeEvent: "itemActionClick"
				},
				items: {
					changeMethod: "onCollectionDataLoaded"
				}
			});
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @overriden
		 */
		subscribeForCollectionEvents: function(binding, property, model) {
			var collection = model.get(binding.modelItem);
			collection.on("dataLoaded", this.onCollectionDataLoaded, this);
			collection.on("add", this.onCollectionItemAdded, this);
			collection.on("remove", this.onCollectionItemRemoved, this);
			collection.on("clear", this.onCollectionCleared, this);
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
		 * @overriden
		 */
		unSubscribeForCollectionEvents: function(binding, property, model) {
			if (model) {
				var collection = model.get(binding.modelItem);
				collection.un("dataLoaded", this.onCollectionDataLoaded, this);
				collection.un("add", this.onCollectionItemAdded, this);
				collection.un("remove", this.onCollectionItemRemoved, this);
				collection.un("clear", this.onCollectionCleared, this);
			}
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overriden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event operationTypeChanged
				 * Fires when operation type was changed.
				 */
				"operationTypeChanged",
				/**
				 * @event itemActionClick
				 * Fires when item action click.
				 */
				"itemActionClick"
			);
		}

		// endregion

	});
});


