/**
 */
Ext.define("Terrasoft.mixins.ObservableItem", {
	alternateClassName: "Terrasoft.ObservableItem",

	//region Properties: Private

	/**
	 * @private
	 */
	itemEventHandlers: null,

	/**
	 * @private
	 */
	items: null,

	/**
	 * @private
	 */
	_attributeChangeHandlers: null,

	//endregion

	//region Properties: Protected

	/**
	 * Indicates if view model should be initialized by item properties values.
	 * @protected
	 * @type {Boolean}
	 */
	useItemInitialValues: false,

	/**
	 * Indicates if item should subscribe on connected attributes changing.
	 * @protected
	 * @type {Boolean}
	 */
	useViewModelToItemBinding: false,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_getItemPropertyValue: function(item, itemPropertyName) {
		var itemPropertyValue = item.getPropertyValue(itemPropertyName);
		if (Terrasoft.isInstanceOfClass(itemPropertyValue, "Terrasoft.LocalizableString")) {
			itemPropertyValue = itemPropertyValue.getValue();
		}
		return itemPropertyValue;
	},

	/**
	 * @private
	 */
	_setItemPropertyValue: function(item, itemPropertyName, itemPropertyValue) {
		var value = item.getPropertyValue(itemPropertyName);
		if (Terrasoft.isInstanceOfClass(value, "Terrasoft.LocalizableString")) {
			item.setLocalizableStringPropertyValue(itemPropertyName, itemPropertyValue);
		} else {
			item.setPropertyValue(itemPropertyName, itemPropertyValue);
		}
	},

	/**
	 * @private
	 */
	_applyItemInitialValues: function(item) {
		if (this.useItemInitialValues) {
			Terrasoft.each(this.getAttributeMap(), function(attributeName, itemPropertyName) {
				this.set(attributeName, this._getItemPropertyValue(item, itemPropertyName), {skipValidation: true});
			}, this);
		}
	},

	/**
	 * @private
	 */
	_initAttributeChangeHandlers: function() {
		if (!this._attributeChangeHandlers) {
			this._attributeChangeHandlers = {};
		}
	},

	/**
	 * @private
	 */
	_subscribeItemOnViewModelChange: function(item) {
		if (this.useViewModelToItemBinding) {
			this._initAttributeChangeHandlers();
			Terrasoft.each(this.getAttributeMap(), function(attributeName, itemPropertyName) {
				var attributeChangeEvent = Ext.String.format("change:{0}", attributeName);
				this._attributeChangeHandlers[attributeChangeEvent] = function(model, value) {
					this._setItemPropertyValue(item, itemPropertyName, value);
				};
				this.on(attributeChangeEvent, this._attributeChangeHandlers[attributeChangeEvent], this);
			}, this);
		}
	},

	/**
	 * @private
	 */
	_unsubscribeItemOnViewModelChange: function() {
		if (this.useViewModelToItemBinding) {
			Terrasoft.each(this.getAttributeMap(), function(attributeName) {
				var attributeChangeEvent = Ext.String.format("change:{0}", attributeName);
				this.un(attributeChangeEvent, this._attributeChangeHandlers[attributeChangeEvent], this);
			}, this);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns attribute map.
	 * @protected
	 * @return {Object} attribute map.
	 * Example:
	 *     {
	 *         itemPropertyName: ViewModelAttributeName
	 *     }
	 */
	getAttributeMap: function() {
		return {};
	},

	/**
	 * Returns attribute name by key (attribute other viewModel).
	 * @protected
	 * @param {String} key attribute key.
	 * @return {String} attribute name.
	 */
	getAttributeName: function(key) {
		var attributes = this.getAttributeMap();
		return attributes[key];
	},

	/**
	 * Subscribes on item change.
	 * @protected
	 * @param {object} item Observed object.
	 */
	subscribeOnItemChanged: function(item) {
		this.items = this.items || [];
		this.itemEventHandlers = this.itemEventHandlers || {};
		this.itemEventHandlers[item.instanceId] = function() {
			this.onItemEventFired(item, arguments);
		}.bind(this);
		this.items.push(item);
		item.on("changed", this.itemEventHandlers[item.instanceId], this);
		this._applyItemInitialValues(item);
		this._subscribeItemOnViewModelChange(item);
	},

	/**
	 * Unsubscribes event for all item.
	 * @protected
	 */
	unsubscribeAllItems: function() {
		if (this.itemEventHandlers) {
			Terrasoft.each(this.items, function(item) {
				item.un("changed", this.itemEventHandlers[item.instanceId], this);
			}, this);
		}
		if (this._attributeChangeHandlers) {
			this._unsubscribeItemOnViewModelChange();
		}
	},

	/**
	 * Returns item attribute value.
	 * @protected
	 * @param {String} item Observed object.
	 * @param {String} key item attribute name.
	 * @return {Object|Mixed} item attribute value.
	 */
	getItemAttributeValue: function(item, key) {
		return this._getItemPropertyValue(item, key);
	},

	/**
	 * Item event handler.
	 * @protected
	 * @param {Object} item Observed object.
	 * @param {Object} attributes changed attributes.
	 */
	onItemEventFired: function(item, attributes) {
		var keys = Object.keys(attributes[0]);
		Terrasoft.each(keys, function(key) {
			var attribute = this.getAttributeName(key);
			this.set(attribute, this.getItemAttributeValue(item, key));
		}, this);
	}

	//endregion

});
