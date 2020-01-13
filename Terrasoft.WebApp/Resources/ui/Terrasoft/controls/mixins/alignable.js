Ext.ns("Terrasoft.mixins.enums");

/**
 * @enum [Terrasoft.mixins.enums.AlignType]
 * Align type enumerations.
 */
Terrasoft.AlignType = {
	/** Top. */
	TOP: "top",
	/** Left. */
	LEFT: "left",
	/** Bottom. */
	BOTTOM: "bottom",
	/** Right. */
	RIGHT: "right",
	/** Top left corner. */
	TOP_LEFT: "topLeft"
};

/**
 * Abbreviation for {@link Terrasoft.AlignType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.AlignType
 */
Terrasoft.mixins.enums.AlignType = Terrasoft.AlignType;

/**
 * Mixin is used for align control.
 */
Ext.define("Terrasoft.controls.mixins.Alignable", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.Alignable",

	//region Properties: Protected

	/**
	 * Last used align configuration.
	 * @type {Object} alignConfig
	 */
	alignConfig: null,

	//endregion

	//region Properties: Public

	/**
	 * If true the padding of the align element is not considered when aligning element.
	 * @type {Boolean} useAlignElContentBox
	 */
	useAlignElContentBox: true,

	/**
	 * Initial alignment type.
	 * @type {Terrasoft.mixins.enums.AlignType} initialAlignType
	 */
	initialAlignType: null,

	/**
	 * Reference to Ext.dom.Element relative to which the positioning will be applied.
	 * @type {Ext.dom.Element}
	 */
	alignToEl: null,

	/**
	 * Restricted alignment type.
	 * @type {Terrasoft.mixins.enums.AlignType} restrictAlignType
	 */
	restrictAlignType: null,

	//endregion

	//region Methods: Private

	/**
	 * Return sizes for calculation of align options, used by {@link #getAlignData getAlignData} method.
	 * @param {Ext.dom.Element} wrapEl Element which size used to determine best align position.
	 * @param {Ext.dom.Element} alignToEl Element which position used to determine best align position for wrapEl.
	 * @return {Object}
	 */
	getSizes: function(wrapEl, alignToEl) {
		var alignToElBox = alignToEl.getBox(this.useAlignElContentBox);
		var wrapElBox = wrapEl.getBox();
		var body = Ext.getBody();
		var bodyBox = body.getBox();
		var alignToElDom = alignToEl.dom;
		var alignToElViewportRect = alignToElDom.getBoundingClientRect();
		var bodyHeight = bodyBox.height;
		var bodyWidth = bodyBox.width;
		var sizes = {
			wrapElBox: wrapElBox,
			alignToElBox: alignToElBox,
			bodyBox: bodyBox
		};
		var availableSpace = {};
		availableSpace[Terrasoft.AlignType.TOP] = alignToElViewportRect.top;
		availableSpace[Terrasoft.AlignType.BOTTOM] = bodyHeight - alignToElViewportRect.top - alignToElBox.height;
		availableSpace[Terrasoft.AlignType.LEFT] = alignToElViewportRect.left;
		availableSpace[Terrasoft.AlignType.RIGHT] = bodyWidth - alignToElViewportRect.left - alignToElBox.width;
		var widthSemiDiff = (wrapElBox.width - alignToElBox.width) / 2;
		var heightSemiDiff = (wrapElBox.height - alignToElBox.height) / 2;
		sizes.availableSpaceBox = availableSpace;
		sizes.offsetData = {
			x: {
				left: availableSpace[Terrasoft.AlignType.LEFT] - widthSemiDiff,
				right: availableSpace[Terrasoft.AlignType.RIGHT] - widthSemiDiff
			},
			y: {
				right: availableSpace[Terrasoft.AlignType.BOTTOM] - heightSemiDiff,
				left: availableSpace[Terrasoft.AlignType.TOP] - heightSemiDiff
			}
		};
		return sizes;
	},

	/**
	 * Returns best position config for wrapEl relative to alignToEl, based on position
	 * options ({@link #getPositionOptions}) and align options calculated by {@link #getAlignData}.
	 * @private
	 * @param {Ext.dom.Element} alignToEl Element relative to positioning will be applied.
	 * @param {Ext.dom.Element} wrapEl Element which will be applied positioning.
	 * @return {Object} Position config.
	 */
	getAlignConfig: function(wrapEl, alignToEl) {
		var sizes = this.getSizes(wrapEl, alignToEl);
		var positionConfig = null;
		var positionOptions = this.getPositionOptions();
		var orderedAlignTypes = this.getAlignOrder();
		Terrasoft.each(orderedAlignTypes, function(positionTypeName) {
			var positionOption = positionOptions[positionTypeName];
			var alignData = this.getAlignData(positionOption.alignConfig, sizes);
			Ext.apply(positionOption, alignData);
			if (positionOption.solutionWeight === 1) {
				positionConfig = positionOption;
				return false;
			} else if (!positionConfig || (positionOption.solutionWeight > (positionConfig.solutionWeight || 0))) {
				positionConfig = positionOption;
			}
		}, this);
		return positionConfig;
	},

	/**
	 * Checks if there is enough space for element according to passed alignType.
	 * @private
	 * @param {Object} sizes Calculated sizes for current position of wrapEl and alignToEl.
	 * @param {Object} sizes.availableSpaceBox Object contains available space for all align types.
	 * @param {Object} sizes.wrapElBox Object which contains position and size, defines the area of the element
	 * which will be applied positioning.
	 * @param {Terrasoft.AlignType} alignType AlignType to check.
	 * @return {Boolean} True, if there is enough space, otherwise false.
	 */
	checkAvailableSpace: function(sizes, alignType) {
		var horizontalAlignTypes = [Terrasoft.AlignType.LEFT, Terrasoft.AlignType.RIGHT];
		var boxSizeToCheck = (horizontalAlignTypes.indexOf(alignType) > -1) ? "width" : "height";
		var availableSpace = sizes.availableSpaceBox[alignType];
		var wrapElSize = sizes.wrapElBox[boxSizeToCheck];
		return availableSpace > wrapElSize;
	},

	/**
	 * Calculates offset and relative weight of solution. Updates align data with found values.
	 * @private
	 * @param {Object} alignData Aligning data. Calculated values will be stored in this object.
	 * @param {Object} offsetConfig Options for offset calculation.
	 * @param {Number} offsetConfig.availableSpace Amount of available space for the wrapEl in a projection of axis passed
	 * in offsetAxis parameter.
	 * @param {String} offsetConfig.offsetAxis Axis relative to which offset will be applied.
	 * @param {Object} sizes Calculated sizes for current position of wrapEl.
	 * @param {Object} sizes.wrapElBox Object which contains position and size, defines the area of the element
	 * which will be applied positioning.
	 */
	updateSideOffset: function(alignData, offsetConfig, sizes) {
		var offsetAxis = offsetConfig.offsetAxis;
		var offset = offsetConfig.availableSpace;
		alignData.offset[offsetAxis] = offset;
		var wrapElSideSize = sizes.wrapElBox[offsetAxis === "x" ? "width" : "height"];
		alignData.solutionWeight = (wrapElSideSize - Math.abs(offset)) / wrapElSideSize * 100;
	},

	/**
	 * Calculates allowed positive or negative offset. Sets weight of solution to 0 if both options are necessary.
	 * This means that wrapEl can't be placed with current alignConfig even using offset.
	 * @private
	 * @param {Object} alignData. Object where computed aligning parameters will be stored.
	 * @param {Object} sizes Calculated sizes for current position of wrapEl and alignToEl.
	 * @param {Object} sizes.offsetData Available space in negative (offsetData.left property) or
	 * positive (offsetData.right property) offset direction.
	 * @param {Object} alignConfig Options for offset calculation.
	 * @param alignConfig.offsetAxis Axis along which the offset will be calculated.
	 */
	calculateOffset: function(alignData, sizes, alignConfig) {
		var offsetAxis = alignConfig.offsetAxis;
		var offsetOptions = sizes.offsetData[offsetAxis];
		var sideOffsetConfig = {
			offsetAxis: offsetAxis
		};
		if (offsetOptions.left < 0) {
			sideOffsetConfig.availableSpace = -1 * offsetOptions.left;
			this.updateSideOffset(alignData, sideOffsetConfig, sizes);
		}
		if (offsetOptions.right < 0) {
			if (offsetOptions.left < 0) {
				alignData.solutionWeight = 0;
			} else {
				sideOffsetConfig.availableSpace = offsetOptions.right;
				this.updateSideOffset(alignData, sideOffsetConfig, sizes);
			}
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns options for positioning.
	 * @protected
	 * Each option contains a set of properties: className, alignType, alignConfig.
	 * className is the name of css class which will be applied to wrapEl during positioning.
	 * alignConfig used by {@link #getAlignData getAlignData} method.
	 * alignType used as position argument for {@link Ext.Element.alignTo Ext.Element.alignTo}.
	 * See {@link #applyAlignConfig applyAlignConfig} for details.
	 */
	getPositionOptions: function() {
		var isRtlMode = Terrasoft.getIsRtlMode();
		return {
			top: {
				className: "align-top",
				alignType: "bc-tc",
				alignConfig: {
					alignType: Terrasoft.AlignType.TOP,
					offsetAxis: "x"
				}
			},
			bottom: {
				className: "align-bottom",
				alignType: "tc-bc",
				alignConfig: {
					alignType: Terrasoft.AlignType.BOTTOM,
					offsetAxis: "x"
				}
			},
			right: {
				className: "align-right",
				alignType: isRtlMode ? "r-l" : "l-r",
				alignConfig: {
					alignType: isRtlMode ? Terrasoft.AlignType.LEFT : Terrasoft.AlignType.RIGHT,
					offsetAxis: "y"
				}
			},
			left: {
				className: "align-left",
				alignType: isRtlMode ? "l-r" : "r-l",
				alignConfig: {
					alignType: isRtlMode ? Terrasoft.AlignType.RIGHT : Terrasoft.AlignType.LEFT,
					offsetAxis: "y"
				}
			},
			topLeft: {
				className: "align-top-left",
				alignType: "tl-tl",
				alignConfig: {
					alignType: Terrasoft.AlignType.TOP_LEFT,
					offsetAxis: "x"
				}
			}
		};
	},

	/**
	 * Returns available align type options and priority.
	 * @protected
	 * @return {String[]}
	 */
	getAlignOrder: function() {
		var orderedTypes = [
			Terrasoft.AlignType.TOP,
			Terrasoft.AlignType.RIGHT,
			Terrasoft.AlignType.BOTTOM,
			Terrasoft.AlignType.LEFT
		];
		if (this.restrictAlignType) {
			orderedTypes = [this.restrictAlignType];
		}
		if (this.initialAlignType) {
			var orederIndex = orderedTypes.indexOf(this.initialAlignType);
			Terrasoft.rotateArray(orderedTypes, orederIndex);
		}
		return orderedTypes;
	},

	/**
	 * Returns options for positioning element according to passed alignConfig.
	 * @protected
	 * @param {Object} alignConfig Options for aligning.
	 * @param {Terrasoft.AlignType} alignConfig.alignType Direction of element aligning.
	 * @param {String} alignConfig.offsetAxis Axis for applying offset if it's necessary. Allowed values are "x", "y",
	 * @param {Object} sizes Calculated sizes for current position of wrapEl and alignToEl.
	 * @param {Object} sizes.wrapElBox Object defining the area of this Element contains position and size.
	 * @param {Object} sizes.offsetData Available space in negative (offsetData.left property) or
	 * positive (offsetData.right property) offset direction.
	 * @param {Object} sizes.availableSpaceBox Object contains available space for all align types.
	 * @return {Object}
	 */
	getAlignData: function(alignConfig, sizes) {
		var result = {
			solutionWeight: 0,
			offset: {
				x: null,
				y: null
			}
		};
		var spaceAvailable = this.checkAvailableSpace(sizes, alignConfig.alignType);
		if (spaceAvailable) {
			result.solutionWeight = 1;
			this.calculateOffset(result, sizes, alignConfig);
		}
		return result;
	},

	/**
	 * Applies passed alignConfig to wrapEl.
	 * @protected
	 * @param {Ext.dom.Element} wrapEl Element which will be aligned.
	 * @param {Ext.dom.Element} alignToEl Element relative to which aligning will be applied.
	 * @param {Object} alignConfig Aligning options.
	 * @param {String} alignConfig.className Css class which will be added to wrapEl.
	 * @param {String} alignConfig.offset Value for offset along X and Y axis in px.
	 * @param {String} alignConfig.alignType Used as position argument for {@link Ext.Element.alignTo}.
	 * Supported positions are:
	 * <pre>
	 * Value  Description
	 * -----  -----------------------------
	 * tl     The top left corner
	 * t      The center of the top edge
	 * tr     The top right corner
	 * l      The center of the left edge
	 * c      In the center of the element
	 * r      The center of the right edge
	 * bl     The bottom left corner
	 * b      The center of the bottom edge
	 * br     The bottom right corner
	 * </pre>
	 */
	applyAlignConfig: function(wrapEl, alignToEl, alignConfig) {
		if (this.alignConfig && Ext.isDefined(this.alignConfig.className)) {
			wrapEl.removeCls(this.alignConfig.className);
		}
		wrapEl.addCls(alignConfig.className);
		this.alignConfig = alignConfig;
		wrapEl.alignTo(alignToEl, alignConfig.alignType, [alignConfig.offset.x, alignConfig.offset.y], false);
	},

	/**
	 * Returns element to align to.
	 * @protected
	 * @return {Ext.dom.Element}
	 */
	getAlignToEl: function() {
		return this.alignToEl;
	},

	//endregion

	//region Methods: Public

	/**
	 * Applies positioning and corresponding css classes found relative to the element returned by {@link #getAlignToEl}.
	 */
	adjustPosition: function() {
		var alignToEl = this.getAlignToEl();
		var wrapEl = this.getWrapEl();
		if (wrapEl && alignToEl) {
			var positionConfig = this.getAlignConfig(wrapEl, alignToEl);
			this.applyAlignConfig(wrapEl, alignToEl, positionConfig);
		}
	}

	//endregion
});
