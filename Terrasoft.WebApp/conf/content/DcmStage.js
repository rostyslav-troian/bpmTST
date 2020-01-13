Terrasoft.configuration.Structures["DcmStage"] = {innerHierarchyStack: ["DcmStage"]};
define("DcmStage", ["css!DcmStage"], function() {
	Ext.ns("Terrasoft.enums.DcmStage.AddButtonStyle");

	/**
	 * Add button styles.
	 * @enum
	 */
	Terrasoft.enums.DcmStage.AddButtonStyle = {
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

	/**
	 * @class Terrasoft.controls.DcmStage
	 */
	Ext.define("Terrasoft.controls.DcmStage", {
		alternateClassName: "Terrasoft.DcmStage",
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
			"<div id=\"{id}-add-btn-el\" data-item-marker=\"add-new-stage\" class=\"{addBtnElClassName}\">",
			"+",
			"</div>",
			"<div id=\"{id}-right-add-btn-el\" class=\"{rightAddBtnElClassName}\">",
			"</div>",
			"</div>",
			"</div>",
			"<div id=\"{id}-valid-state\" class=\"{validStateClassName}\"></div>",
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
		 * Css class name for stage validation state.
		 * @protected
		 * @type {String}
		 */
		validStateClassName: "valid-state",

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
		 * @type {Ext.Element}
		 */
		innerContainerEl: null,

		/**
		 * Link for header element.
		 * @protected
		 * @type {Ext.Element}
		 */
		headerEl: null,

		/**
		 * Link for add button container element.
		 * @protected
		 * @type {Ext.Element}
		 */
		addBtnCt: null,

		/**
		 * Link for right add button boundary element.
		 * @protected
		 * @type {Ext.Element}
		 */
		rightBoundaryBtnCtEl: null,

		/**
		 * Style of add button element.
		 * @type {Terrasoft.enums.DcmStage.AddButtonStyle}
		 */
		addButtonStyle: Terrasoft.enums.DcmStage.AddButtonStyle.INNER_ARROW,

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
		 * Indicates that the item is selected.
		 * @private
		 * @type {Boolean}
		 */
		selected: false,

		/**
		 * Selected block style class.
		 * @protected
		 * @type {String}
		 */
		selectedClass: "stage-selected",

		/**
		 * Validation block style class.
		 * @protected
		 * @type {String}
		 */
		notValidClass: "not-valid",

		/**
		 * Validation state.
		 * @type {Boolean}
		 */
		isValid: true,

		/**
		 * Flag that indicates whether element property page has executed validation.
		 * @type {Boolean}
		 */
		isValidateExecuted: true,

		/**
		 * Additional offset to scroll stage when it is selected.
		 * @private
		 * @type {Number}
		 */
		additionalOffsetLeft: 10,

		/**
		 * Flag that indicates whether animate element scrolling.
		 * @type {Boolean}
		 */
		animateScroll: true,

		/**
		 * @inheritdoc Terrasoft.controls.AbstractContainer#itemsEventMap
		 * @protected
		 * @override
		 */
		itemsEventMap: {
			"selected": "elementSelected",
			"dblclick": "elementDblClick",
			"removeBtnClick": "elementRemoveBtnClick",
			"elementDragDrop": "elementDragDrop"
		},

		/**
		 * Identifiers of alternative stages.
		 * @type {String[]}
		 */
		alternativeStagesUIds: null,

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
				"addButtonClick",
				"stageSelected",
				"dblclick",
				"elementDblClick",
				"elementSelected",
				"elementRemoveBtnClick",
				"elementDragDrop"
			);
		},

		/**
		 * Handles header click.
		 * @param {Ext.EventObjectImpl} event Event
		 * @private
		 */
		onHeaderClick: function(event) {
			if (!event.within(this.addBtnCt.el)) {
				this.setSelected(true);
				this.fireEvent("stageSelected", this.tag);
			}
		},

		/**
		 * Handles header duble click.
		 * @private
		 */
		onHeaderDblClick: function() {
			this.fireEvent("dblclick", this.tag);
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
			var headerColorClass = {};
			var borderColorCSS = Terrasoft.getIsRtlMode() ? "border-right-color": "border-left-color";
			headerColorClass[borderColorCSS] = color;
			var headerColorClasses = {
				".dcm-stage .stage-header": {
					"background-color": color
				},
				".dcm-stage .stage-header.inner-arrow .boundary-el::before": headerColorClass,
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
			return headerColorClasses;
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
		 * @return {String} Css class body.
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
			this.headerEl.on("click", this.onHeaderClick, this);
			this.headerEl.on("dblclick", this.onHeaderDblClick, this);
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @overridden
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			this.addBtnCt.un("mouseenter", this.onAddBtnCtElMouseEnter, this);
			this.addBtnCt.un("mouseleave", this.onAddBtnCtEMouseLeave, this);
			this.addBtnCt.un("click", this.onAddBtnClick, this);
			this.headerEl.un("click", this.onHeaderClick, this);
			this.headerEl.un("dblclick", this.onHeaderDblClick, this);
		},

		/**
		 * Handler for click on add button node. Fires addButtonClick event.
		 */
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
			var handlers = moveDragConfig.handlers;
			handlers.alignElWithMouse = this.alignElWithMouse;
			return defaultDraggableConfig;
		},

		/**
		 * Creates draggable node with children stages nodes.
		 * @param {HTMLElement} clone Draggable element for current stage.
		 * @param {Number} x Draggable element x position.
		 * @param {Number} y Draggable element y position.
		 * @return {HTMLElement} New Draggable element.
		 */
		createGroupDragEl: function(clone, x, y) {
			clone.id = clone.id + "-inner";
			var cloneId = this.getCloneId();
			var groupDragEl = Ext.DomHelper.createDom({
				id: cloneId
			});
			Ext.apply(clone.style, {
				position: "relative",
				top: 0,
				left: 0
			});
			Ext.apply(groupDragEl.style, {
				position: "absolute",
				display: "inline-flex",
				top: y + "px",
				left: x + "px",
				"padding-top": 0
			});
			groupDragEl.appendChild(clone);
			groupDragEl.classList.add(this.grabbedClassName);
			groupDragEl.classList.add("dcm-stage");
			return groupDragEl;
		},

		/**
		 * @inheritdoc Terrasoft.core.mixins.Draggable#createDraggableClone
		 * If stage contains child stages, {@link #alternativeStagesUIds} is not empty, creates draggable element
		 * with cloned children stages nodes.
		 * @overridden
		 * @protected
		 */
		createDraggableClone: function(node, x, y) {
			Ext.dd.DragDropManager.useCache = false;
			var clone = this.mixins.reorderableItemMixin.createDraggableClone.apply(this, arguments);
			var alternativeStagesUIds = this.alternativeStagesUIds || [];
			if (alternativeStagesUIds.length === 0) {
				return clone;
			}
			var groupDragEl = this.createGroupDragEl(clone, x, y);
			alternativeStagesUIds.forEach(function(stageUId) {
				var stageControl = Ext.getCmp(stageUId);
				var stageControlWrapNode = stageControl.wrapEl.dom;
				var stageControlWrapNodeClone = stageControlWrapNode.cloneNode(true);
				groupDragEl.appendChild(stageControlWrapNodeClone);
			}, this);
			return groupDragEl;
		},

		/**
		 * Overrides base implementation of alignElWithMouse, see {@link Ext.dd.DD#alignElWithMouse}. This
		 * implementation allow drag item outside viewport.
		 * @param {Object} el Link to DOM node or Ext.Element to align.
		 * @param {Number} iPageX The X coordinate of the mousedown or drag event.
		 * @param {Number} iPageY The Y coordinate of the mousedown or drag event.
		 * @return {Object} An object that contains the coordinates (Object.x and Object.y)
		 * @return {Number} return.x
		 * @return {Number} return.y
		 */
		alignElWithMouse: function(el, iPageX, iPageY) {
			var draggableItem = Ext.dd.DragDropManager.dragCurrent;
			var oCoord = draggableItem.getTargetCoord(iPageX, iPageY);
			var fly = el.dom ? el : Ext.fly(el, "_dd");
			var elSize = fly.getSize();
			var EL = Ext.Element;
			var vpSize = draggableItem.cachedViewportSize = draggableItem.cachedViewportSize || {
					width: EL.getDocumentWidth(),
					height: EL.getDocumentHeight()
				};
			if (!draggableItem.deltaSetXY) {
				fly.setXY([
					Math.max(0, Math.min(oCoord.x, vpSize.width - elSize.width)),
					oCoord.y
				]);
				var newLeft = draggableItem.getLocalX(fly);
				var newTop = fly.getLocalY();
				draggableItem.deltaSetXY = [newLeft - oCoord.x, newTop - oCoord.y];
			} else {
				draggableItem.setLocalXY(
					fly,
					Math.max(0, Math.min(oCoord.x + draggableItem.deltaSetXY[0], vpSize.width - elSize.width)),
					oCoord.y + draggableItem.deltaSetXY[1]
				);
			}
			draggableItem.cachePosition(oCoord.x, oCoord.y);
			return oCoord;
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
			var validStateClassName = tplData.validStateClassName = [];
			validStateClassName.push(this.validStateClassName);
			if (this.selected) {
				wrapClass.push(this.selectedClass);
			}
			if (this.isValidateExecuted && !this.isValid) {
				validStateClassName.push(this.notValidClass);
			}
		},

		/**
		 * Returns class name for add button style.
		 * @param {Terrasoft.enums.DcmStage.AddButtonStyle} addButtonStyle Add button style.
		 * @return {String} Class name.
		 */
		getAddButtonStyleClassName: function(addButtonStyle) {
			var className = "";
			switch (addButtonStyle) {
				case Terrasoft.enums.DcmStage.AddButtonStyle.INNER_ARROW:
					className = "inner-arrow";
					break;
				case Terrasoft.enums.DcmStage.AddButtonStyle.INNER_ROUNDED:
					className = "inner-rounded";
					break;
				case Terrasoft.enums.DcmStage.AddButtonStyle.OUTER_ROUNDED:
					className = "outer-rounded";
					break;
				default:
					break;
			}
			return className;
		},

		/**
		 * Sets add button style.
		 * @param {Terrasoft.enums.DcmStage.AddButtonStyle} addButtonStyle Add button style.
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
				addBtnCt: "#" + this.id + "-add-btn-ct",
				rightBoundaryBtnCtEl: "#" + this.id + "-right-add-btn-el"
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
			this.setDragZonePadding();
			this.mixins.reorderableItemMixin.onAfterRender.apply(this, arguments);
		},

		/**
		 * @inheritdoc Terrasoft.controls.Component#onAfterReRender
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.setDragZonePadding();
			this.mixins.reorderableItemMixin.onAfterReRender.apply(this, arguments);
			if (this.selected) {
				this.scrollIntoView();
			}
		},

		/**
		 * Sets vertical padding for draggable item. Padding calculates as half view port height.
		 * @private
		 */
		setDragZonePadding: function() {
			var viewSize = Ext.Element.getViewSize();
			var verticalPadding = viewSize.height / 2;
			this.dragZonePadding = [verticalPadding, 0, verticalPadding, 0];
		},

		/**
		 * Sets array of identifiers of alternative stages.
		 * @param {String[]} alternativeStagesUIds Identifiers of alternative stages.
		 */
		setAlternativeStagesUIds: function(alternativeStagesUIds) {
			this.alternativeStagesUIds = alternativeStagesUIds;
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
				alternativeStagesUIds: {
					changeMethod: "setAlternativeStagesUIds"
				},
				addButtonStyle: {
					changeMethod: "setAddButtonStyle"
				},
				headerColor: {
					changeMethod: "setHeaderColor"
				},
				selected: {
					changeMethod: "setSelected"
				},
				isValidateExecuted: {
					changeMethod: "setIsValidateExecuted"
				},
				isValid: {
					changeMethod: "setIsValid"
				}
			});
			return bindConfig;
		},

		/**
		 * Sets the indicator that the stage is selected. Also scrolls the parent container, to be stage into view.
		 * @param {Boolean} selected The indicator that the stage is selected.
		 */
		setSelected: function(selected) {
			if (this.selected === selected) {
				return;
			}
			this.selected = selected;
			var selectedClass = this.selectedClass;
			if (this.rendered) {
				var wrapEl = this.getWrapEl();
				wrapEl.dom.classList.toggle(selectedClass);
				if (selected === true) {
					this.scrollIntoView();
				}
			}
		},

		/**
		 * Returns stage region.
		 * @private
		 * @return {Ext.util.Region}
		 */
		getRegion: function() {
			var wrapEl = this.getWrapEl();
			var wrapRegion = wrapEl.getRegion();
			var addBtnCtRegion = this.addBtnCt.getRegion();
			var region = wrapRegion.union(addBtnCtRegion);
			var rightBoundaryElRegion = this.rightBoundaryBtnCtEl.getRegion();
			return region.union(rightBoundaryElRegion);
		},

		/**
		 * Scrolls the parent container, to be stage into view.
		 * @private
		 */
		scrollIntoView: function() {
			var stageRegion = this.getRegion();
			var ownerCt = this.ownerCt;
			if (!ownerCt) {
				return;
			}
			var ownerCtEl = ownerCt.getWrapEl();
			var ownerCtRegion = ownerCtEl.getRegion();
			if (ownerCtRegion.contains(stageRegion) !== true) {
				var stageOffset = this.getScrollLeftOffset(ownerCtRegion, stageRegion);
				var scrollLeft = ownerCtEl.dom.scrollLeft - stageOffset;
				ownerCtEl.scrollTo("left", scrollLeft, this.animateScroll);
			}
		},

		/**
		 * Returns the left offset of the stage relative to its owner container.
		 * @param {Ext.util.Region} ownerCtRegion Owner container region.
		 * @param {Ext.util.Region} stageRegion Stage region.
		 * @return {Number} Left offset
		 */
		getScrollLeftOffset: function(ownerCtRegion, stageRegion) {
			var adjustStageRegion = stageRegion.adjust(0, this.additionalOffsetLeft, 0, -this.additionalOffsetLeft);
			var offsetLeft = ownerCtRegion.getOutOfBoundOffsetX(adjustStageRegion.left);
			if (offsetLeft <= 0) {
				offsetLeft = ownerCtRegion.getOutOfBoundOffsetX(adjustStageRegion.right);
			}
			return offsetLeft;
		},

		/**
		 * Sets the indicator that the stage is valid.
		 * @param {Boolean} isValid The indicator that the stage is valid.
		 */
		setIsValid: function(isValid) {
			if (this.isValid === isValid) {
				return;
			}
			this.isValid = isValid;
			this.safeRerender();
		},

		/**
		 * Sets the indicator that the stage is already validated.
		 * @param {Boolean} isValidExecuted.
		 */
		setIsValidateExecuted: function(isValidateExecuted) {
			if (this.isValidateExecuted === isValidateExecuted) {
				return;
			}
			this.isValidateExecuted = isValidateExecuted;
			this.safeRerender();
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
	return Terrasoft.controls.DcmStage;
});


