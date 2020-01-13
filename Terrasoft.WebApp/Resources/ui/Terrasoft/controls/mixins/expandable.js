/**
 * Mixin is used by controls that must support work with drop-down content.
 */
Ext.define("Terrasoft.controls.mixins.Expandable", {
	alternateClassName: "Terrasoft.Expandable",

	//region Fields: Private

	/**
  * Link to the drop-down container object {@link Terrasoft.Container}.
  * @private
  * @type {Terrasoft.Container}
  */
	container: null,

	//endregion

	//region Fields: Protected

	/**
  * The offset of the drop-down container relative to the parent control.
  * @protected
  * @type {Integer[]}
  */
	offset: null,

	/**
  * The identifier of the component to which the drop-down container will be drawn.
  * @protected
  * @type {String}
  */
	renderTo: null,

	/**
  * A flag that indicates the ability to use automatic width.
  * @protected
  * @type {Boolean}
  */
	useAutoWidth: false,

	/**
  * The configuration of the drop-down container.
  * @protected
  * @type {Object}
  */
	containerConfig: null,

	/**
  * A characteristic that indicates the display of the drop-down container.
  * @protected
  * @type {Boolean}
  */
	expanded: false,

	/**
	 * Menu align type position over element.
	 * @protected
	 * @type {String}
	 */
	alignType: null,

	/**
	 * Default menu align type position over element.
	 * @protected
	 * @type {String}
	 */
	defaultAlignType: "tl-bl?",

	//endregion

	//region Methods: Private

	/**
  * Returns a reference to the Ext.dom.Element element of the drop-down container.
  * @private
  * @returns {Ext.dom.Element} A reference to the Ext.dom.Element element of the drop-down container.
  */
	getContainerWrapEl: function() {
		if (!this.container) {
			return null;
		}
		return this.container.getWrapEl();
	},

	/**
  * Creates a dropdown container.
  * @private
  * @returns {Terrasoft.Container} Link to the Ext.Element element of the drop-down container.
  */
	createContainer: function() {
		var config = this.getContainerConfig() || {};
		config.classes = config.classes || {wrapClassName: []};
		config.classes.wrapClassName = Ext.Array.merge(config.classes.wrapClassName, ["expandable", "ts-box-sizing"]);
		var container = Ext.create("Terrasoft.Container", config);
		container.on("afterrender", this.adjustContainerPlacement, this);
		container.on("afterrerender", this.adjustContainerPlacement, this);
		return container;
	},

	/**
  * Adjusts the position and size of the drop-down container.
  * @private
  */
	adjustContainerPlacement: function() {
		this.adjustHeight();
		if (this.useAutoWidth) {
			this.adjustWidth();
		}
		this.adjustPosition();
	},

	//endregion

	//region Methods: Protected

	/**
  * Initializes the mixin.
  * @protected
  */
	init: function() {
		this.addEvents(
			/**
    * @event
    * Container display event.
    * @param {String} id COntainer Id.
    */
			"show",

			/**
    * @event
    * Container hiding event.
    */
			"hide",

			/**
    * @event
    * Container display change event.
    */
			"expandedchanged"
		);
	},

	/**
  * Deletes created objects.
  * @protected
  */
	destroy: function() {
		var container = this.container;
		if (container) {
			container.destroy();
		}
	},

	/**
  * Adjusts the height of the container.
  * @protected
  */
	adjustHeight: Terrasoft.emptyFn,

	/**
  * Adjusts the width of the container relative to the parent element.
  * @protected
  */
	adjustWidth: function() {
		if (!this.useAutoWidth) {
			return;
		}
		var alignEl = this.getAlignEl();
		var wrapEl = this.getContainerWrapEl();
		if (!alignEl || !wrapEl || !alignEl.dom || !wrapEl.dom) {
			return;
		}
		var wrapTopStyle = alignEl.getStyle("width");
		var boxSize = Ext.util.Format.parseBox(wrapTopStyle);
		var offset = this.getOffset();
		wrapEl.setStyle("width", (boxSize.right - offset[0] - 1) + "px");
	},

	/**
  * Positioning the container relative to the parent element.
  * @protected
  */
	adjustPosition: function() {
		var alignEl = this.getAlignEl();
		var wrapEl = this.getContainerWrapEl();
		if (!alignEl || !wrapEl || !alignEl.dom || !wrapEl.dom) {
			return;
		}
		var offset = this.getOffset();
		var alignType = this.alignType || this.defaultAlignType;
		wrapEl.anchorTo(alignEl, alignType, offset, false, false);
		wrapEl.removeAnchor();
	},

	/**
 t * Returns a reference to the Ext.dom.Element element relative to which visual positioning will occur.
 t * @returns {Ext.dom.Element} A reference to the Ext.dom.Element element relative to which visual positioning will occur.
 t */
	getAlignEl: function() {
		return this.getWrapEl();
	},

	/**
  * Returns the configuration of the container.
  * @protected
  * @returns {Object} Container configuration.
  */
	getContainerConfig: function() {
		return this.containerConfig;
	},

	/**
  * Returns a reference to the Ext.Element element of the container.
  * @protected
  * @returns {Terrasoft.Container | null} A reference to the Ext.Element element of the container.
  */
	getContainer: function() {
		return this.container;
	},

	/**
  * Returns the offset relative to the parent element.
  * @protected
  * @type {Integer []} Offset relative to the parent element.
  */
	getOffset: function() {
		return this.offset || [1, 1];
	},

	/**
  * Hides/displays the container.
  * @protected
  * @param {Boolean} value The sign of the container display.
  */
	setExpanded: function(value) {
		if (this.expanded === value) {
			return;
		}
		this.expanded = value;
		if (value) {
			this.show();
		} else {
			this.hide();
		}
		this.fireEvent("expandedchanged", value);
	},

	/**
  * Returns the binding configuration to the model for the mixin interface {@link Terrasoft.Bindable}.
  * @protected
  */
	getBindConfig: function() {
		var bindConfig = {
			expanded: {
				changeMethod: "setExpanded",
				changeEvent: "expandedchanged"
			}
		};
		return bindConfig;
	},

	//endregion

	//region Methods: Public

	/**
  * Displays the container.
  */
	show: function() {
		if (this.container === null) {
			this.container = this.createContainer();
		}
		var container = this.container;
		container.visible = true;
		if (!container.rendered) {
			container.render(this.renderTo || Ext.getBody());
		} else {
			container.reRender();
		}
		this.fireEvent("show", {
			containerId: container.id
		});
	},

	/**
  * Hides the container.
  */
	hide: function() {
		var container = this.container;
		if (container === null) {
			return;
		}
		this.container.setVisible(false);
		this.fireEvent("hide");
	}

	//endregion

});
