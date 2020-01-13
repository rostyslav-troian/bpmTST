Ext.define("Terrasoft.controls.DTStageElement", {
	alternateClassName: "Terrasoft.DTStageElement",
	extend: "Terrasoft.Container",

	mixins: {
		reorderableItemMixin: "Terrasoft.ReorderableItemMixin"
	},

	wrapClassName: "dcm-stage-element",

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @overridden
	 */
	init: function() {
		this.callParent(arguments);
		this.mixins.reorderableItemMixin.init.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @overridden
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.applyClasses(tplData);
		return tplData;
	},

	/**
	 * Apply wrap class.
	 * @protected
	 * @param {Object} tplData Template data.
	 */
	applyClasses: function(tplData) {
		var wrapClass = tplData.wrapClassName = tplData.wrapClassName || [];
		wrapClass.push(this.wrapClassName);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @overridden
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.reorderableItemMixin.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @overridden
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.reorderableItemMixin.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onDestroy
	 * @overridden
	 */
	onDestroy: function() {
		this.mixins.reorderableItemMixin.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	}
});
