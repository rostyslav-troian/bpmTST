/**
 * Mixin is used by controls to display a tooltip when hovering.
 * Mixin can be mixed with any control inherited from {@link #Terrasoft.Component}.
 */
Ext.define("Terrasoft.controls.mixins.Tooltip", {
	alternateClassName: "Terrasoft.Tooltip",

	/**
  * Indicates if a tooltip is displayed when hovering. By default set to false.
  * @type {Boolean}
  */
	showTooltip: false,

	/**
  * Tooltip text.
  * @type {String}
  */
	tooltipText: "",

	/**
  * A class that is added to an external element, if tooltip is turned on when hovering
  * @protected
  * @type {String}
  */
	tooltipClassName: "ts-component-tooltip",

	/**
  * Returns the control's tool tip class if tooltips are enabled.
  * @protected
  * @return {String} Returns the name of the tooltip class or an empty string if prompts are turned off.
  */
	getTooltipClass: function() {
		return (this.isTooltipEnabled()) ? this.tooltipClassName : "";
	},

	/**
  * Returns the attribute that contains the tooltip text if tooltips are enabled.
  * @protected
  * @return {String} Returns the name of the tooltip class or an empty string if tooltips are turned off.
  */
	getTooltipTextAttribute: function() {
		return (this.isTooltipEnabled()) ? (" data-tooltip-text=\"" + this.getEncodedTooltipText() + "\" ") : "";
	},

	/**
  * Returns the Html-encoded value of the tooltip text.
  * @protected
  * @return {String} Coded tooltip text.
  */
	getEncodedTooltipText: function() {
		return Terrasoft.encodeHtml(this.tooltipText);
	},

	/**
  * Determines whether to show a tooltip.
  * @protected
  * @return {Boolean} Returns true, if the {@link #showTooltip} checkbox is selected and the
  * tooltip text {@link #tooltipText} is specified. Otherwise - false.
  */
	isTooltipEnabled: function() {
		return (this.showTooltip && !Ext.isEmpty(this.tooltipText));
	},

	/**
  * Adds the binding configuration for the tooltip binding.
  * @protected
  * @param {Object} bindConfig Parent control binding configuration.
  */
	addTooltipBindConfig: function(bindConfig) {
		bindConfig.showTooltip = {
			changeMethod: "setShowTooltip"
		};
		bindConfig.tooltipText = {
			changeMethod: "setTooltipText"
		};
	},

	/**
  * Sets the value of the {@link #showTooltip} property.
  * @protected
  * @param {Boolean} showTooltip Indicates if tooltips are enabled.
  */
	setShowTooltip: function(showTooltip) {
		if (this.showTooltip === showTooltip) {
			return;
		}
		this.showTooltip = showTooltip;
		this.updateTooltipTextAttr();
	},

	/**
  * Sets the value of the {@link #tooltipText} property.
  * @protected
  * @param {String} tooltipText The tooltip text.
  */
	setTooltipText: function(tooltipText) {
		if (this.tooltipText === tooltipText) {
			return;
		}
		this.tooltipText = tooltipText;
		this.updateTooltipTextAttr();
	},

	/**
  * Updates the status of the tooltip of an element.
  * Updating occurs dynamically without re-rendering.
  * To transfer the lines, use the service symbol sequence: &#xa;
  * @protected
  */
	updateTooltipTextAttr: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl || !wrapEl.dom) {
			return;
		}
		if (this.isTooltipEnabled()) {
			wrapEl.set({"data-tooltip-text": this.getEncodedTooltipText()});
			wrapEl.addCls(this.tooltipClassName);
		} else {
			wrapEl.dom.removeAttribute("data-tooltip-text");
			wrapEl.removeCls(this.tooltipClassName);
		}
	}

});