/**
 * Class of the mjml image element.
 */
Ext.define("Terrasoft.controls.ContentMjImage", {
	extend: "Terrasoft.controls.ContentImageElement",
	alternateClassName: "Terrasoft.ContentMjImage",

	/**
	 * @inheritdoc Terrasoft.ContentImageElement#contentWrapClasses
	 * @override
	 */
	contentWrapClasses: ["content-mjimage-wrap"],

	/**
	 * @inheritdoc Terrasoft.ContentImageElement#imageElClasses
	 * @override
	 */
	imageElClasses: "content-mjimage-image",

	/**
	 * @inheritdoc Terrasoft.ContentImageElement#defaultAlign
	 * @override
	 */
	defaultAlign: Terrasoft.Align.CENTER,

	/**
	 * Style property names for image borders.
	 * @type {Array}
	 */
	imageBorderStyles: ["border-radius", "border-top", "border-right", "border-bottom", "border-left"],

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-mjimage-wrap" class="{wrapClassName}">
			<div style="{wrapStyle}" class="{wrapStylesClassName}">
				<tpl if="hasImage">
					<img id="{id}-content-mjimage" class="{imageElClasses}" style="{imageStyles}" src="{imageSrc}"
						<tpl if="hasTitle"> title="{title}"</tpl> alt="{alt}" width="{width}" height="{height}" />
				<tpl else>
					<div id="{id}-content-image-placeholder" class="{placeholderClass}">
						<span class="placeholder-image"></span>
						<br>
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
	 * Safely applies style to template data.
	 * @private
	 * @param {Object} tplData Control template data.
	 * @param {Object} styles Styles object.
	 * @param {String} styleName Style property name.
	 */
	_applyStyleIfIsDefined: function(tplData, styles, styleName) {
		if (tplData.self.styles
				&& tplData.self.styles.wrapStyle
				&& Ext.isDefined(tplData.self.styles.wrapStyle[styleName])) {
			styles[styleName] = tplData.self.styles.wrapStyle[styleName];
		}
	},

	/**
	 * Adds border-box styles to fix MJML borders bug (https://github.com/mjmlio/mjml/issues/1557).
	 * @private
	 * @param {Object} tplData Control template data.
	 * @param {Object} styles Styles object.
	 * @param {Object} borderStyles Border styles object.
	 */
	_applyBoxedStyles: function(tplData, styles, borderStyles) {
		var allBorders = true;
		Terrasoft.each(borderStyles, function(el) {
			if (el.style === "none") {
				allBorders = false;
			}
			return allBorders;
		}, this);
		if (allBorders) {
			styles["box-sizing"] = "border-box";
			styles["min-height"] = this._calculateMinHeight(tplData);
		}
	},

	/**
	 * Fix for MJML lib border overflow  inside column bug (https://github.com/mjmlio/mjml/issues/1557).
	 * @private
	 * @param {Object} tplData Control template data.
	 * @param {Object} styles Styles object.
	 */
	_applyMjmlBorderBug: function(tplData, styles) {
		var borderStyles = Terrasoft.calculateBorderStyles(styles);
		this._applyBoxedStyles(tplData, styles, borderStyles);
		if (this.align === Terrasoft.Align.LEFT) {
			return;
		}
		var right = borderStyles.right.style !== "none"
			? Terrasoft.parseNumber(borderStyles.right.width) || 0
			: 0;
		var left = borderStyles.left.style !== "none"
			? Terrasoft.parseNumber(borderStyles.left.width) || 0
			: 0;
		var offset = right + left;
		switch (this.align) {
			case Terrasoft.Align.CENTER:
				styles["margin-right"] = Ext.String.format("{0}px", -offset);
				break;
			case Terrasoft.Align.RIGHT:
				styles["margin-right"] = Ext.String.format("{0}px", -offset);
				break;
			default:
				return;
		}
	},

	/**
	 * Returns width styles based on current image settings.
	 * @private
	 * @param {Object} tplData Control template data.
	 * @returns {String} Width property style.
	 */
	_calculateWidth: function(tplData) {
		var borderStyles = Terrasoft.calculateBorderStyles(tplData.self.styles.wrapStyle);
		var right = Terrasoft.parseNumber(borderStyles.right.width) || 0;
		var left = Terrasoft.parseNumber(borderStyles.left.width) || 0;
		var offset = right + left;
		var width = Math.max(this.width, offset);
		return Ext.String.format("{0}px", offset + width);
	},

	/**
	 * Returns min-height styles based on current image settings.
	 * @private
	 * @param {Object} tplData Control template data.
	 * @returns {String} Min-height property style.
	 */
	_calculateMinHeight: function(tplData) {
		if (!this.height) {
			return "auto";
		}
		var borderStyles = Terrasoft.calculateBorderStyles(tplData.self.styles.wrapStyle);
		var top = Terrasoft.parseNumber(borderStyles.top.width) || 0;
		var bottom = Terrasoft.parseNumber(borderStyles.bottom.width) || 0;
		return Ext.String.format("{0}px", top + bottom + this.height);
	},

	/**
	 * @inheritdoc Terrasoft.ContentImageElement#applyContentAlign
	 * @override
	 */
	applyContentAlign: function(tplData) {
		tplData = Ext.apply(tplData, {
			wrapStylesClassName: ["content-mjimage-wrap-styles"]
		});
		tplData.wrapStylesClassName.push("content-image-element-align-" + this.align);
	},

	/**
	 * @inheritdoc Terrasoft.ContentImageElement#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var selectors = {
			toolsEl: "#" + this.id + "-content-image-element-tools",
			wrapEl: "#" + this.id + "-content-mjimage-wrap",
			imageEl: "#" + this.id + "-content-mjimage",
			placeholderEl: "#" + this.id + "-content-image-placeholder"
		};
		return selectors;
	},

	/**
	 * @inheritdoc Terrasoft.BaseContentElement#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		if (Ext.isEmpty(tplData.imageSrc)) {
			tplData.wrapStylesClassName.push("empty-image");
		}
		Ext.apply(tplData, {
			imageStyles: this.createImageStyles(tplData),
			wrapStyle: this.createWrapperStyles(tplData),
			width: this.width || "100%"
		});
		return tplData;
	},

	/**
	 * Returns styles of current image.
	 * @protected
	 * @param {Object} tplData Control template data.
	 * @returns {Object} Image styles object.
	 */
	createImageStyles: function(tplData) {
		var styles = {
			"width": this.width ? this._calculateWidth(tplData) : "100%",
			"height": this.height ? Ext.String.format("{0}px", this.height) : "auto"
		};
		Terrasoft.each(this.imageBorderStyles, function(style) {
			this._applyStyleIfIsDefined(tplData, styles, style);
		}, this);
		this._applyMjmlBorderBug(tplData, styles);
		return Ext.DomHelper.generateStyles(styles);
	},

	/**
	 * Returns styles of current image wrapper element.
	 * @protected
	 * @param {Object} tplData Control template data.
	 * @returns {Object} Image wrapper styles object.
	 */
	createWrapperStyles: function(tplData) {
		var styles = Ext.apply({}, {
			"width": "100%",
			"height": "auto",
			"border-radius": 0,
			"border": "none"
		}, tplData.self.styles.wrapStyle);
		return Ext.DomHelper.generateStyles(styles);
	}
});
