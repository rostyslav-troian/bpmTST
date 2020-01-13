/**
 * Class of content builder hero block.
 */
Ext.define("Terrasoft.controls.ContentMjHero", {
	extend: "Terrasoft.controls.ContentColumn",
	alternateClassName: "Terrasoft.ContentMjHero",

	/**
	 * Content block name.
	 * @protected
	 * @type {String}
	 */
	itemName: "content-mjhero",

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		contentColumnWrap: ["content-mjhero-wrap"],
		contentColumnPlaceholder: ["content-mjhero-placeholder"],
		contentColumnPlaceholderWrap: ["content-mjhero-placeholder-wrap"]
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-mjhero" class="{contentColumnWrap}" style="{wrapStyle}">
			<div id="{id}-inner-container" class="{innerContainerClassName}" style="{columnStyle}">` +
				`{%this.renderItems(out, values)%}` +
			`</div>
			<div id="{id}-content-mjhero-placeholder-wrap" class="{contentColumnPlaceholderWrap}">
				<div id="{id}" class="{contentColumnPlaceholder}">
					<span class="placeholder-image"></span>
					<br>
					<span>{placeholder}</span>
				</div>
			</div>
		</div>`
	],

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.ContentColumn#applyColumnWidth
	 * @override
	 */
	applyColumnWidth: Terrasoft.emptyFn

	//endregion

});
