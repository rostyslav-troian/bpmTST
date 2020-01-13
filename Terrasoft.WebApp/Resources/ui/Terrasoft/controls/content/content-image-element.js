/**
 * Base class of the image element.
 */
Ext.define("Terrasoft.controls.ContentImageElement", {
	extend: "Terrasoft.controls.BaseContentElement",
	alternateClassName: "Terrasoft.ContentImageElement",

	/**
	 * The configuration of the button image.
	 * @private
	 * @type {Object}
	 */
	imageConfig: null,

	/**
	 * A collection of style classes for the control container.
	 * @protected
	 * @type {String[]}
	 */
	contentWrapClasses: ["content-image-element-wrap"],

	/**
	 * CSS class for the image.
	 * @protected
	 * @type {String}
	 */
	imageElClasses: "ts-content-image-element-full-size-element",

	/**
	 * A collection of toolbar items.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	imageTools: null,

	/**
	 * CSS class for the button container.
	 * @protected
	 * @type {String}
	 */
	imageToolsContainerClass: ["content-image-element-tools-container"],

	/**
	 * CSS class for placeholder.
	 * @protected
	 * @type {String}
	 */
	placeholderClass: "content-image-element-placeholder",

	/**
	 * Text for placeholder.
	 * @protected
	 * @type {String}
	 */
	placeholder: "",

	/**
	 * Image alternative text.
	 * @protected
	 * @type {String}
	 */
	alt: "",

	/**
	 * Image title text.
	 * @protected
	 * @type {String}
	 */
	title: "",

	/**
	 * Image width.
	 * @protected
	 * @type {String}
	 */
	width: null,

	/**
	 * Image height.
	 * @protected
	 * @type {String}
	 */
	height: null,

	/**
	 * Image align.
	 * @protected
	 * @type {Terrasoft.core.enums.Align}
	 */
	align: null,

	/**
	 * Default image align.
	 * @protected
	 * @type {Terrasoft.core.enums.Align}
	 */
	defaultAlign: Terrasoft.Align.LEFT,

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-image-element-wrap" class="{wrapClassName}">
			<div style="{wrapStyle}">
				<tpl if="hasImage">
					<img id="{id}-content-image-element" class="{imageElClasses}" style="{imageStyles}" src="{imageSrc}"
						<tpl if="hasTitle"> title="{title}"</tpl> alt="{alt}" width="{width}" height="{height}" />
				<tpl else>
					<div id="{id}-content-image-placeholder" class="{placeholderClass}">
						<span>{placeholder}</span>
					</div>
				</tpl>
				<tpl if="hasTools">
					<div id="{id}-content-element-tools" class="{toolsWrapClasses}">
						<tpl for="tools">
							{%this.renderTool(out, values)%}
						</tpl>
					</div>
				</tpl>
				<div id="{id}-content-image-element-tools" class="{imageToolsContainerClass}">
					<tpl for="imageTools">
						{%this.renderTool(out, values)%}
					</tpl>
				</div>
			</div>
		</div>`
	],

	/**
	 * @private
	 */
	_getMaxWidth: function(tplData) {
		if (tplData.self.styles && tplData.self.styles.wrapStyle) {
			const elementWrapperWidth = tplData.self.width ? Ext.String.format("{0}px", this.width) : "100%";
			const delta = Terrasoft.calculateStylesWidth(tplData.self.styles.wrapStyle);
			if (elementWrapperWidth === "100%") {
				return tplData.self.height > 0 ? null : "100%";
			} else {
				return Ext.String.format("calc({0} - {1}px)", elementWrapperWidth, delta);
			}
		}
	},

	/**
	 * @private
	 */
	_getWidth: function(tplData) {
		if (this.width) {
			const delta = Terrasoft.calculateStylesWidth(tplData.self.styles.wrapStyle);
			return delta > 0
					? Ext.String.format("calc({0} - {1}px)", this.width, delta)
					: Ext.String.format("{0}px", this.width);
		} else {
			return this.height > 0 ? "auto" : "100%";
		}
	},

	/**
	 * @private
	 */
	_createImageStyles: function(tplData) {
		return Ext.DomHelper.generateStyles({
			"width": this._getMaxWidth(tplData),
			"height": "100%"
		});
	},

	/**
	 * @private
	 */
	_createWrapperStyles: function(tplData) {
		const styles = Ext.apply({}, {
			width: this._getWidth(tplData),
			height: this.height ? Ext.String.format("{0}px", this.height) : "auto"
		}, tplData.self.styles.wrapStyle);
		return Ext.DomHelper.generateStyles(styles);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		renderData.imageTools = this.imageTools;
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#initTools
	 * @override
	 */
	initTools: function() {
		this.callParent();
		var imageTools = this.imageTools;
		var collection = this.imageTools = new Ext.util.MixedCollection(false, this.getComponentId);
		collection.on("add", this.onToolAdd, this);
		this.addToCollection(imageTools, this.imageTools);
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#destroyTools
	 * @override
	 */
	destroyTools: function() {
		this.callParent();
		this.destroyItemsCollection(this.imageTools);
		this.imageTools = null;
	},

	/**
	 * The method returns the selectors of the control.
	 * @protected
	 * @return {Object} The selector object.
	 */
	getSelectors: function() {
		var selectors = {
			toolsEl: "#" + this.id + "-content-image-element-tools",
			wrapEl: "#" + this.id + "-content-image-element-wrap",
			imageEl: "#" + this.id + "-content-image-element",
			placeholderEl: "#" + this.id + "-content-image-placeholder"
		};
		return selectors;
	},

	/**
	 * Applies content align styles class for current align value.
	 * @protected
	 * @param {Object} tplData Control template data.
	 */
	applyContentAlign: function(tplData) {
		tplData.wrapClassName.push("content-image-element-align-" + this.align);
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		const tplData = this.callParent(arguments);
		const hasImage = this.imageConfig &&
			(!Ext.isEmpty(this.imageConfig.url) || !Ext.isEmpty(this.imageConfig.imageSrc));
		const hasTitle = !Ext.isEmpty(this.title);
		const imageSrc = hasImage ? Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig) : "";
		Ext.apply(tplData, {
			imageElClasses: this.imageElClasses,
			imageSrc: imageSrc,
			imageToolsContainerClass: this.imageToolsContainerClass,
			placeholder: Terrasoft.encodeHtml(this.placeholder),
			placeholderClass: this.placeholderClass,
			hasImage: hasImage,
			imageStyles: this._createImageStyles(tplData),
			wrapStyle: this._createWrapperStyles(tplData),
			width: this.width || "auto",
			height: this.height || "auto",
			alt: this.alt,
			title: this.title,
			hasTitle: hasTitle
		});
		this.applyContentAlign(tplData);
		return tplData;
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var elementConfig = {
			imageConfig: {
				changeMethod: "setImage"
			},
			placeholder: {
				changeMethod: "setPlaceholder"
			},
			width: {
				changeMethod: "setWidth"
			},
			height: {
				changeMethod: "setHeight"
			},
			align: {
				changeMethod: "setAlign"
			},
			alt: {
				changeMethod: "setAlt"
			},
			title: {
				changeMethod: "setTitle"
			}
		};
		Ext.apply(elementConfig, bindConfig);
		return elementConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.callParent(arguments);
		this.imageTools.each(function(item) {
			item.bind(this.model);
		}, this);
	},

	/**
	 * Updates the text for the placeholder.
	 * @param {String} text Text for placeholder.
	 */
	setPlaceholder: function(text) {
		if (!Terrasoft.isEqual(this.placeholder, text)) {
			this.placeholder = text;
			if (Ext.isEmpty(this.imageConfig)) {
				this.safeRerender();
			}
		}
	},

	/**
	 * Changes the picture.
	 * @param {Object} imageConfig Configure a new picture.
	 */
	setImage: function(imageConfig) {
		if (!Ext.Object.equals(imageConfig, this.imageConfig)) {
			this.imageConfig = imageConfig;
			this.safeRerender();
		}
	},

	/**
	 * Updates the alternative text.
	 * @param {String} text Alternative text.
	 */
	setAlt: function(text) {
		if (!Terrasoft.isEqual(this.alt, text)) {
			this.alt = text;
			this.safeRerender();
		}
	},

	/**
	 * Updates the title.
	 * @param {String} text Title.
	 */
	setTitle: function(text) {
		if (!Terrasoft.isEqual(this.title, text)) {
			this.title = text;
			this.safeRerender();
		}
	},

	/**
	 * Sets image align.
	 * @param {Terrasoft.core.enums.Align} value New height value.
	 */
	setAlign: function(value) {
		const supportedValues = [Terrasoft.core.enums.Align.LEFT, Terrasoft.core.enums.Align.CENTER,
			Terrasoft.core.enums.Align.RIGHT];
		value = value || this.defaultAlign;
		if (!Terrasoft.contains(supportedValues, value)) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		if (!Terrasoft.isEqual(this.align, value)) {
			this.align = value;
			this.safeRerender();
		}
	},

	/**
	 * Sets image height.
	 * @param {String} value New height value.
	 */
	setHeight: function(value) {
		if (!Terrasoft.isEqual(this.height, value)) {
			this.height = value;
			this.safeRerender();
		}
	},

	/**
	 * Sets image width.
	 * @param {String} value New width value.
	 */
	setWidth: function(value) {
		if (!Terrasoft.isEqual(this.width, value)) {
			this.width = value;
			this.safeRerender();
		}
	}
});
