Ext.ns("Terrasoft.enums.DTStage.AddButtonStyle");

/**
 * Add button styles.
 * @enum
 */
Terrasoft.enums.DTStage.AddButtonStyle = {
	/**
	 * Arrow style.
	 */
	INNER_ARROW: "InnerArrow",

	/**
	 * Button style.
	 */
	INNER_ROUNDED: "InnerRounded",

	/**
	 * Inner button style.
	 */
	OUTER_ROUNDED: "OuterRounded"
};

Ext.define("Terrasoft.controls.DTStage", {
	alternateClassName: "Terrasoft.DTStage",
	extend: "Terrasoft.Container",

	mixins: {
		reorderableItemMixin: "Terrasoft.ReorderableItemMixin",
		toolsMixin: "Terrasoft.ToolsMixin"
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @overridden
	 */
	defaultRenderTpl: [
		"<div id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
			"<div id=\"{id}-header\" style=\"{headerStyles}\" class=\"{headerClassName}\">",
				"<div id=\"{id}-tools\" class=\"{toolsClassName}\">",
					"{%this.renderTools(out, values)%}",
				"</div>",
				"<div id=\"{id}-add-btn-ct\" class=\"{addBtnCtClassName}\">",
					"<div id=\"{id}-left-add-btn-el\" class=\"{leftAddBtnElClassName}\">",
					"</div>",
					"<div id=\"{id}-add-btn-el\" class=\"{addBtnElClassName}\">",
						"+",
					"</div>",
					"<div id=\"{id}-right-add-btn-el\" class=\"{rightAddBtnElClassName}\">",
					"</div>",
				"</div>",
			"</div>",
			"<div id=\"{id}-inner-container\" style=\"{innerContainerStyles}\" class=\"{innerContainerClassName}\">",
				"{%this.renderItems(out, values)%}",
			"</div>",
		"</div>"
	],

	/**
	 * Css class name for wrap element.
	 * @protected
	 * @type {String}
	 */
	wrapClassName: "dcm-stage",

	/**
	 * Css class name for tools container element that contains tools items.
	 * @protected
	 * @type {String}
	 */
	toolsClassName: "stage-tools",

	/**
	 * Css class name for inner container element that contains items.
	 * @protected
	 * @type {String}
	 */
	innerContainerClassName: "stage-inner-container",

	/**
	 * Css class name for header element.
	 * @protected
	 * @type {String}
	 */
	headerClassName: "stage-header",

	/**
	 * Css class name for add button container element.
	 * @protected
	 * @type {String}
	 */
	addBtnCtClassName: "add-btn-ct",

	/**
	 * Css class name for add button boundary elements.
	 * @protected
	 * @type {String}
	 */
	boundaryElClassName: "boundary-el",

	/**
	 * Css class name for add button left boundary element.
	 * @protected
	 * @type {String}
	 */
	leftAddBtnElClassName: "left-add-btn-el",

	/**
	 * Css class name for add button element.
	 * @protected
	 * @type {String}
	 */
	addBtnElClassName: "add-btn-el",

	/**
	 * Css class name for add button right boundary element.
	 * @protected
	 * @type {String}
	 */
	rightAddBtnElClassName: "right-add-btn-el",

	/**
	 * Link for inner container.
	 * @protected
	 * @type {Ext.dom.Element}
	 */
	innerContainerEl: null,

	/**
	 * Link for header element.
	 * @protected
	 * @type {Ext.dom.Element}
	 */
	headerEl: null,

	/**
	 * Link for add button container element.
	 * @protected
	 * @type {Ext.dom.Element}
	 */
	addBtnCt: null,

	/**
	 * Style of add button element.
	 * @type {Terrasoft.enums.DTStage.AddButtonStyle}
	 */
	addButtonStyle: Terrasoft.enums.DTStage.AddButtonStyle.INNER_ARROW,

	/**
	 * Header color.
	 * @type {String}
	 */
	headerColor: null,

	/**
	 * Default header color.
	 * @type {String}
	 */
	defaultHeaderColor: "#8ecb60",

	/**
	 * Class name for wrap element to customize header color.
	 * @type {String}
	 */
	headerColorWarpClassName: "",

	/**
	 * @inheritdoc Terrasoft.controls.Container#init
	 * @overridden
	 */
	init: function() {
		this.callParent(arguments);
		this.mixins.reorderableItemMixin.init.apply(this, arguments);
		this.mixins.toolsMixin.init.apply(this, arguments);
		this.initCustomHeaderColorClasses();
		this.addEvents(
			"addButtonClick"
		);
	},

	/**
	 * Initialize custom css classes for header color customization.
	 * @protected
	 */
	initCustomHeaderColorClasses: function() {
		var headerColorClasses = this.getHeaderColorClasses(this.defaultHeaderColor);
		this.iterateCustomHeaderColorClasses(headerColorClasses, function(cssClassName, cssClassBody) {
			var cssClass = cssClassName + "{" + cssClassBody + "}";
			Terrasoft.createStyleSheet(cssClass);
		}, this);
	},

	/**
	 * Iterate custom css classes for header color customization. Calls iterator for each defined class.
	 * @param {Object} headerColorClasses Object of defined custom classes. Property name is className,
	 * propertyValue - is object describing the styles.
	 * @param {Function} iterator custom classes iterator.
	 * @param {String} iterator.cssClassName Custom css class name.
	 * @param {String} iterator.cssClassBody Custom css class body with defined styles.
	 * @param {Object} scope Iterator call scope.
	 */
	iterateCustomHeaderColorClasses: function(headerColorClasses, iterator, scope) {
		Terrasoft.each(headerColorClasses, function(properties, className) {
			var cssClassName = this.getCustomHeaderColorClassId(className);
			var cssClassProperties = this.getCustomHeaderColorClassBody(properties);
			var cssClassBody = Ext.DomHelper.generateStyles(cssClassProperties);
			iterator.call(scope || this, cssClassName, cssClassBody);
		}, this);
	},

	/**
	 * Returns object of custom classes for header color. Property name is className,
	 * propertyValue - is object describing the styles.
	 * @param {String} color Color for header.
	 * @return {Object} Object of custom classes.
	 */
	getHeaderColorClasses: function(color) {
		return {
			".dcm-stage .stage-header": {
				"background-color": color
			},
			".dcm-stage .stage-header.inner-arrow .boundary-el::before": {
				"border-left-color": color
			},
			".dcm-stage .stage-header.inner-rounded::after": {
				"border-color": color
			},
			".dcm-stage .stage-header.outer-rounded::after": {
				"border-color": color
			},
			".dcm-stage .stage-header.inner-rounded .boundary-el.right-add-btn-el::after": {
				"border-color": color
			},
			".dcm-stage .stage-header.show-add-button.inner-rounded .boundary-el.right-add-btn-el::after": {
				"border-color": "#c1c4bf"
			}
		};
	},

	/**
	 * Returns custom class id. Concat headerColorWarpClassName with class name. If headerColorWarpClassName is empty,
	 * takes component id.
	 * @param {String} className Class name.
	 * @return {String} Custom class id.
	 */
	getCustomHeaderColorClassId: function(className) {
		var headerColorWarpClassName = this.headerColorWarpClassName ? this.headerColorWarpClassName : this.id;
		return "." + headerColorWarpClassName + className;
	},

	/**
  * Returns css class body string.
  * @param {Object} properties Object describing the styles, where property name is style name and property value
  * is style value.
  * @return {String} #ss class body.
  */
	getCustomHeaderColorClassBody: function(properties) {
		var customHeaderColorClassProperties = {};
		Terrasoft.each(properties, function(propertyValue, propertyName) {
			customHeaderColorClassProperties[propertyName] = propertyValue;
		}, this);
		return customHeaderColorClassProperties;
	},

	/**
	 * Sets header custom color.
	 * @param {String} color Color.
	 */
	setHeaderColor: function(color) {
		if (this.headerColor === color) {
			return;
		}
		this.headerColor = color;
		var headerColorClasses = this.getHeaderColorClasses(color);
		this.iterateCustomHeaderColorClasses(headerColorClasses, function(cssClassName, cssClassBody) {
			Terrasoft.updateStyleSheet(cssClassName, cssClassBody);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#initDomEvents
	 * @overridden
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.addBtnCt.on("mouseenter", this.onAddBtnCtElMouseEnter, this);
		this.addBtnCt.on("mouseleave", this.onAddBtnCtEMouseLeave, this);
		this.addBtnCt.on("click", this.onAddBtnClick, this);
	},

	onAddBtnClick: function() {
		this.fireEvent("addButtonClick", this);
	},

	/**
	 * Handler for mouseEnter event on add button container element.
	 */
	onAddBtnCtElMouseEnter: function() {
		this.headerEl.dom.classList.add("show-add-button");
	},

	/**
	 * Handler for mouseLeave event on add button container element.
	 */
	onAddBtnCtEMouseLeave: function() {
		this.headerEl.dom.classList.remove("show-add-button");
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#getDefaultDraggableConfig
	 * @overridden
	 */
	getDefaultDraggableConfig: function() {
		var defaultDraggableConfig = this.mixins.reorderableItemMixin.getDefaultDraggableConfig.apply(this, arguments);
		var moveDragConfig = defaultDraggableConfig[Terrasoft.DragAction.MOVE];
		moveDragConfig.elementId = this.id + "-header";
		return defaultDraggableConfig;
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#generateDraggableElement
	 * @overridden
	 */
	generateDraggableElement: function(html) {
		var headerEl = this.headerEl;
		headerEl.insertHtml("beforeEnd", html);
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#indexOf
	 * @overridden
	 */
	indexOf: function(item) {
		var itemIndex = this.callParent(arguments);
		if (itemIndex === -1) {
			itemIndex = this.indexOfToolItem(item);
		}
		return itemIndex;
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#getRenderToEl
	 * @overridden
	 */
	getRenderToEl: function(component) {
		if (this.indexOfToolItem(component) !== -1) {
			return this.getToolsRenderToEl();
		}
		return this.innerContainerEl;
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#processTemplate
	 * @overridden
	 */
	processTemplate: function() {
		var template = this.callParent(arguments);
		return this.processToolItemTemplate(template);
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#processTemplate
	 * @overridden
	 */
	initRenderData: function() {
		this.callParent(arguments);
		this.mixins.toolsMixin.initRenderData.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#getTplData
	 * @overridden
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.applyClasses(tplData);
		var selectors = this.getSelectors();
		this.applyToolsElSelector(selectors);
		Ext.apply(this.selectors, selectors);
		return tplData;
	},

	/**
	 * Apply classes for render template.
	 * @protected
	 * @param {Object} tplData Template data.
	 */
	applyClasses: function(tplData) {
		var wrapClass = tplData.wrapClassName = tplData.wrapClassName || [];
		wrapClass.push(this.wrapClassName);
		wrapClass.push(this.headerColorWarpClassName);
		var innerContainerClasses = tplData.innerContainerClassName = [];
		innerContainerClasses.push(this.innerContainerClassName);
		var headerClasses = tplData.headerClassName = [];
		headerClasses.push(this.headerClassName);
		var addButtonStyleClassName = this.getAddButtonStyleClassName(this.addButtonStyle);
		headerClasses.push(addButtonStyleClassName);
		var toolsClassName = tplData.toolsClassName = [];
		toolsClassName.push(this.toolsClassName);
		var addBtnCtClassName = tplData.addBtnCtClassName = [];
		addBtnCtClassName.push(this.addBtnCtClassName);
		var leftAddBtnElClassName = tplData.leftAddBtnElClassName = [];
		leftAddBtnElClassName.push(this.boundaryElClassName);
		leftAddBtnElClassName.push(this.leftAddBtnElClassName);
		var addBtnElClassName = tplData.addBtnElClassName = [];
		addBtnElClassName.push(this.addBtnElClassName);
		var rightAddBtnElClassName = tplData.rightAddBtnElClassName = [];
		rightAddBtnElClassName.push(this.boundaryElClassName);
		rightAddBtnElClassName.push(this.rightAddBtnElClassName);
	},

	/**
	 * Returns class name for add button style.
	 * @param {Terrasoft.enums.DTStage.AddButtonStyle} addButtonStyle Add button style.
	 * @return {String} Class name.
	 */
	getAddButtonStyleClassName: function(addButtonStyle) {
		var className = "";
		switch (addButtonStyle) {
			case Terrasoft.enums.DTStage.AddButtonStyle.INNER_ARROW:
				className = "inner-arrow";
				break;
			case Terrasoft.enums.DTStage.AddButtonStyle.INNER_ROUNDED:
				className = "inner-rounded";
				break;
			case Terrasoft.enums.DTStage.AddButtonStyle.OUTER_ROUNDED:
				className = "outer-rounded";
				break;
			default:
				break;
		}
		return className;
	},

	/**
	 * Sets add button style.
	 * @param {Terrasoft.enums.DTStage.AddButtonStyle} addButtonStyle Add button style.
	 */
	setAddButtonStyle: function(addButtonStyle) {
		if (this.addButtonStyle === addButtonStyle) {
			return;
		}
		var classToRemove = this.getAddButtonStyleClassName(this.addButtonStyle);
		var classToAdd = this.getAddButtonStyleClassName(addButtonStyle);
		this.addButtonStyle = addButtonStyle;
		if (!this.rendered) {
			return;
		}
		var headerElClassList = this.headerEl.dom.classList;
		headerElClassList.remove(classToRemove);
		headerElClassList.add(classToAdd);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getSelectors
	 * @overridden
	 */
	getSelectors: function() {
		return {
			innerContainerEl: "#" + this.id + "-inner-container",
			headerEl: "#" + this.id + "-header",
			addBtnEl: "#" + this.id + "-add-btn-el",
			addBtnCt: "#" + this.id + "-add-btn-ct"
		};
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#bind
	 * @overridden
	 */
	bind: function() {
		this.callParent(arguments);
		this.mixins.toolsMixin.bind.call(this, this.model);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onAfterRender
	 * @overridden
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.reorderableItemMixin.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onAfterReRender
	 * @overridden
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.reorderableItemMixin.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getBindConfig
	 * Hides base implementation.
	 * @overridden
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var reorderableItemMixinBindConfig = this.mixins.reorderableItemMixin.getBindConfig.apply(this, arguments);
		Ext.apply(bindConfig, reorderableItemMixinBindConfig);
		Ext.apply(bindConfig, {
			addButtonStyle: {
				changeMethod: "setAddButtonStyle"
			},
			headerColor: {
				changeMethod: "setHeaderColor"
			}
		});
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onDestroy
	 * @overridden
	 */
	onDestroy: function() {
		this.mixins.reorderableItemMixin.onDestroy.apply(this, arguments);
		this.mixins.toolsMixin.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	}
});
