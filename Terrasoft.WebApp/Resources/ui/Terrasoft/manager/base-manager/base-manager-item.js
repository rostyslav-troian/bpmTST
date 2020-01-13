/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseManagerItem", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseManagerItem",

	//region Properties: Private

	/**
	 * The object of the changes.
	 * @private
	 * @property {Object} changes
	 */
	changes: {},

	//endregion

	//region Properties: Private

	/**
	 * Element Id.
	 * @private
	 * @property {String} id
	 */
	id: null,

	/**
	 * Flag of deleting the element
	 * @private
	 * @property {Boolean} isDeleted
	 */
	isDeleted: false,

	//endregion

	//region Methods: Public

	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * Remove manager item event.
			 * @event
			 */
			"remove"
		);
	},

	/**
	 * Sets the value of the item.
	 * @private
	 * @param {String} propertyName Property name.
	 * @param {Mixed} propertyValue Value.
	 */
	setPropertyValue: function(propertyName, propertyValue) {
		this.changes[propertyName] = propertyValue;
	},

	/**
	 * Returns the value of the item ID.
	 * @return {String} The value of the item ID.
	 */
	getId: function() {
		return this.id;
	},

	/**
	 * Returns the value of the deleted element  flag.
	 * @return {Boolean} The value of the deleting of the element.
	 */
	getIsDeleted: function() {
		return this.isDeleted;
	},

	/**
	 * Sets the item deletion flag.
	 */
	remove: function() {
		this.isDeleted = true;
		this.fireEvent("remove", this);
	},

	/**
	 * Copies the configuration object.
	 * @return {Object} Returns the configuration object for creating a copy.
	 */
	getCopyConfig: function() {
		var config = {};
		var serializedPropertiesConfig = this.getSerializedPropertiesConfig();
		Terrasoft.each(serializedPropertiesConfig, function(propertyConfig, propertyName) {
			if (propertyConfig.isCopy !== false) {
				config[propertyName] = Terrasoft.deepClone(this[propertyName]);
			} else if (Ext.isDefined(propertyConfig.defCopyValue)) {
				config[propertyName] = propertyConfig.defCopyValue;
			}
		}, this);
		return config;
	},

	/**
	 * Copies the item.
	 * @return {Terrasoft.BaseManagerItem} Returns a copy of the element.
	 */
	copy: function() {
		var config = this.getCopyConfig();
		return Ext.create(this.alternateClassName, config);
	},

	/**
	 * Returns an object containing the list of fields that you want to serialize.
	 * @return {Object} An object containing a list of fields.
	 */
	getSerializedPropertiesConfig: function() {
		return {
			"id": {
				isCopy: false,
				defCopyValue: Terrasoft.generateGUID()
			},
			"changes": {},
			"isDeleted": {
				isCopy: false,
				defCopyValue: false
			}
		};
	}

	//endregion

});