Terrasoft.configuration.Structures["CollapsibleContainer"] = {innerHierarchyStack: ["CollapsibleContainer"]};
define("CollapsibleContainer", ["CollapsibleContainerResources", "css!CollapsibleContainer"], function(resources) {
	Ext.define("Terrasoft.controls.CollapsibleContainer", {
		extend: "Terrasoft.controls.AbstractContainer",
		alternateClassName: "Terrasoft.CollapsibleContainer",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
		 * @override
		 */
		//jshint quotmark:true
		// jscs:disable
		defaultRenderTpl: [
			"<div id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
				"<div id=\"{id}_innerWrap\" class=\"{innerWrapClassName}\">",
					"{%this.renderItems(out, values)%}",
				"</div>",
				"<div id=\"{id}_collapsing_buttonWrap\" class=\"{collapsingButtonWrapClassName}\">",
					"<span id=\"{id}_collapsing_button_image\" style=\"{collapsingButtonImageStyles}\" class=\"{collapsingButtonImageClassName}\"></span>",
					"<span id=\"{id}_collapsing_button\" class=\"{collapsingButtonClassName}\">{collapsingButtonCaption}</span>",
				"</div>",
			"</div>"
		],
		// jscs:enable
		//jshint quotmark:false

		innerWrapClass: "ts-collapsible-container-inner-wrap",

		collapsingButtonWrapClass: "ts-collapsible-container-collapsing-button-wrap",

		collapsingButtonClass: "ts-collapsible-container-collapsing-button",

		collapsingButtonImageClass: "ts-collapsible-container-collapsing-button-image",

		collapsingButtonVisibleClass: "ts-collapsible-container-collapsing-button-visible",

		collapsedClass: "ts-collapsible-container-collapsed",

		collapseButtonCaption: resources.localizableStrings.ShowLessCaption,

		collapsingButtonImage: resources.localizableImages.ShowMoreLessImage,

		expandButtonCaption: resources.localizableStrings.ShowMoreCaption,

		// endregion

		// region Properties: Public

		/**
		 * A flag indicates the use of auto-folding.
		 * @type {Boolean}
		 */
		auto: false,

		/**
		 * Indicates the amount of visibility at the minimized state.
		 * @type {Number}
		 */
		visibilityHeight: 0,

		/**
		 * A flag that indicates in what state the container is initially collapsed/expanded.
		 * The value true corresponds to the collapsed initial state, false - to the expanded state.
		 * @type {Boolean}
		 */
		collapsed: false,

		// endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				"collapsedchanged"
			);
			var id = "#" + this.id;
			this.selectors = this.selectors || {};
			Ext.apply(this.selectors, {
				collapsingButtonEl: id + "_collapsing_button",
				collapsingButtonWrapEl: id + "_collapsing_buttonWrap",
				innerWrapEl: id + "_innerWrap"
			});
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#getTplData
		 * @override
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			tplData.wrapClassName = tplData.wrapClassName || [];
			var collapsingButtonCaption = this.collapsed ? this.expandButtonCaption : this.collapseButtonCaption;
			Ext.apply(tplData, {
				collapsingButtonWrapClassName: [this.collapsingButtonWrapClass],
				innerWrapClassName: [this.innerWrapClass],
				collapsingButtonImageClassName: [this.collapsingButtonImageClass],
				collapsingButtonClassName: [this.collapsingButtonClass],
				collapsingButtonCaption: Terrasoft.encodeHtml(collapsingButtonCaption)
			});
			if (this.collapsed) {
				tplData.wrapClassName.push(this.collapsedClass);
			}
			var imageUrl = Terrasoft.ImageUrlBuilder.getUrl(this.collapsingButtonImage);
			if (imageUrl) {
				tplData.collapsingButtonImageStyles = "background-image: url(" + imageUrl + ");";
			}
			return tplData;
		},

		/**
		 * @inheritdoc Terrasoft.controls.AbstractContainer#getRenderToEl
		 * @override
		 */
		getRenderToEl: function() {
			var renderToEl = this.callParent(arguments);
			var wrapEl = this.getWrapEl();
			if (renderToEl.id === wrapEl.id) {
				renderToEl = this.innerWrapEl;
			}
			return renderToEl;
		},

		/**
		 * @inheritdoc Terrasoft.Component#render
		 * @override
		 */
		render: function() {
			this.callParent(arguments);
			this.showCollapsingButton();
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			this.collapsingButtonWrapEl.on("click", this.onCollapsingButtonClick, this);
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @override
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			if (this.rendered) {
				this.collapsingButtonWrapEl.un("click", this.onCollapsingButtonClick, this);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#onOwnerCtAfterRenderOrAfterRerender
		 * @override
		 */
		onOwnerCtAfterRenderOrAfterRerender: function() {
			this.callParent(arguments);
			this.showCollapsingButton();
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var parentBindConfig = this.callParent(arguments);
			var bindConfig = {
				collapsed: {
					changeEvent: "collapsedchanged",
					changeMethod: "setCollapsed"
				}
			};
			Ext.apply(bindConfig, parentBindConfig);
			return bindConfig;
		},

		/**
		 * Checks if need show collapsing button.
		 * @protected
		 * @return {Boolean}
		 */
		isNeedShowCollapsingButton: function() {
			if (!this.auto) {
				return true;
			}
			var innerWrapEl = this.innerWrapEl;
			return innerWrapEl.getHeight() > this.visibilityHeight;
		},

		/**
		 * Shows collapsing button.
		 * @protected
		 */
		showCollapsingButton: function() {
			if (!this.rendered || !this.visible || !this.isNeedShowCollapsingButton()) {
				return;
			}
			var wrapEl = this.getWrapEl();
			wrapEl.addCls(this.collapsingButtonVisibleClass);
			if (this.auto) {
				this.setCollapsed(true);
			}
		},

		/**
		 * Toggles collapsed value.
		 * @protected
		 */
		toggleCollapsed: function() {
			var collapsed = !this.collapsed;
			this.setCollapsed(collapsed);
		},

		// endregion

		//region Methods: Public

		/**
		 * Collapsing button click handler.
		 */
		onCollapsingButtonClick: function() {
			this.toggleCollapsed();
		},

		/**
		 * Set collapsed value.
		 * @param {[type]} collapsed Collapsed value.
		 */
		setCollapsed: function(collapsed) {
			if (this.collapsed === collapsed) {
				return;
			}
			this.collapsed = collapsed;
			if (!this.rendered) {
				return;
			}
			var wrapEl = this.getWrapEl();
			var innerWrapEl = this.innerWrapEl;
			if (collapsed) {
				wrapEl.addCls(this.collapsedClass);
				innerWrapEl.setHeight(this.visibilityHeight);
				this.collapsingButtonEl.dom.innerText = this.expandButtonCaption;
			} else {
				wrapEl.removeCls(this.collapsedClass);
				innerWrapEl.setHeight(null);
				this.collapsingButtonEl.dom.innerText = this.collapseButtonCaption;
			}
			this.fireEvent("collapsedchanged", collapsed);
		}

		// endregion

	});
	return Terrasoft.CollapsibleContainer;
});


