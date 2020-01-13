/**
 * Lazy adds internal components and render after cleared executable stack.
 */
Ext.define("Terrasoft.controls.LazyContainer", {
	extend: "Terrasoft.controls.Container",
	alternateClassName: "Terrasoft.LazyContainer",

	/**
	 * Default render time delay.
	 * @protected
	 * @type {Number}
	 */
	renderDelay: 0,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#addViewConfigItems
	 * @override
	 */
	addViewConfigItems: function() {
		setTimeout(this.lazyAddItems.bind(this), this.renderDelay);
	},

	/**
	 * Lazy loading child items and render to current container.
	 * @protected
	 */
	lazyAddItems: function() {
		var rendered = this.rendered;
		this.rendered = false;
		this.add(this.viewConfigItems);
		this.bindItems(this.model);
		if (rendered) {
			this.reRender();
		}
	}
});