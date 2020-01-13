Ext.define("Terrasoft.manager.GuidMetaItem", {
	extend: "Terrasoft.manager.MetaItem",
	alternateClassName: "Terrasoft.GuidMetaItem",

	/**
	 * @private
	 */
	parentSchema: null,

	/**
	 * Name of server class.
	 * @protected
	 */
	typeName: "Terrasoft.Core.GuidMetaItem",

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableProperties.
	 * @overridden
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		var serializableProperties = Ext.Array.push(baseSerializableProperties, ["typeName"]);
		return serializableProperties;
	}
});