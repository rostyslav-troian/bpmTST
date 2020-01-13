Ext.define("Terrasoft.ServiceMetaItem", {
	extend:  "Terrasoft.MetaItem",

	/**
	 * @private
	 */
	_serviceSchema: null,

	/**
	 * @param changes
	 * @private
	 */
	_onChanged: function(changes) {
		var eventArgs = {};
		Terrasoft.each(changes, function(propertyValue, propertyName) {
			var propertyPath = !Ext.isEmpty(this.getPropertyPath())
				? this.getPropertyPath() + "." + propertyName
				: propertyName;
			eventArgs[propertyPath] = propertyValue;
		}, this);
		if (this._serviceSchema) {
			this._serviceSchema.fireEvent("changed", eventArgs, this);
		}
	},

	/**
	 * Returns changed property path.
	 * @protected
	 * @returns {String} Changed property path.
	 */
	getPropertyPath: function() {
		return Ext.String.empty;
	},

	/**
	 * Returns service schema reference.
	 * @returns {Terrasoft.ServiceSchema} Service schema reference.
	 */
	getServiceSchema: function() {
		return this._serviceSchema;
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @overridden
	 */
	constructor: function() {
		this.callParent(arguments);
		this.on("changed", this._onChanged, this);
	}

});
