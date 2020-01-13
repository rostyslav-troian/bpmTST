/**
 * Class of MJML content element with HTML.
 */
Ext.define("Terrasoft.controls.ContentMjRawElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentMjRawElement",

	/**
	 * Displayed content.
	 * @private
	 * @type {String}
	 */
	content: null,

	/**
	 * A collection of style classes for the control container.
	 * @protected
	 * @type {String[]}
	 */
	contentWrapClasses: ["content-mjraw-element-wrap"],

	/**
	 * The style class for placeholder.
	 * @protected
	 * @type {String}
	 */
	placeholderClass: "content-mjraw-placeholder",

	/**
	 * Text for placeholder.
	 * @protected
	 * @type {String}
	 */
	placeholder: "",

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-mjraw-element" class="{wrapClassName}">`,
			`<tpl if="hasContent">`,
				`{content}`,
			`<tpl else>`,
				`<div class="{placeholderClass}"><span>{placeholder}</span></div>`,
			`</tpl>`,
			`<tpl if="hasTools">`,
				`<div id="{id}-content-element-tools" class="{toolsWrapClasses}">
					<tpl for="tools">
						{%this.renderTool(out, values)%}
					</tpl>
				</div>`,
			`</tpl>`,
		`</div>`
	],

	//region Methods: Protected

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-content-mjraw-element"
		};
		return selectors;
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		var hasContent = !Ext.isEmpty(this.content);
		Ext.apply(tplData, {
			hasContent: hasContent,
			content: this.content,
			placeholder: Terrasoft.encodeHtml(this.placeholder),
			placeholderClass: this.placeholderClass
		});
		return tplData;
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var elementConfig = {
			content: {
				changeMethod: "setContent"
			},
			placeholder: {
				changeMethod: "setPlaceholder"
			}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	},

	/**
	 * Updates the text for the placeholder.
	 * @param {String} text Text for placeholder.
	 */
	setPlaceholder: function(text) {
		if (text !== this.placeholder) {
			this.placeholder = text;
			if (Ext.isEmpty(this.content) && this.allowRerender()) {
				this.reRender();
			}
		}
	},

	/**
	 * Updates the displayed content of the control.
	 * @param {Object} content Content.
	 */
	setContent: function(content) {
		if (content !== this.content) {
			this.content = content;
			this.safeRerender();
		}
	}

	//endregion

});
