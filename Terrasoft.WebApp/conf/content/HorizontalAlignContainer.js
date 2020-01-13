Terrasoft.configuration.Structures["HorizontalAlignContainer"] = {innerHierarchyStack: ["HorizontalAlignContainer"]};
define("HorizontalAlignContainer", [], function() {
	/**
	 * Class of horizontal alignment container.
	 */
	Ext.define("Terrasoft.controls.HorizontalAlignContainer", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.HorizontalAlignContainer",

		//region Properties: Protected

		/**
		 * Container width.
		 * @protected
		 * @type {Number}
		 */
		width: null,

		/**
		 * Container horizontal alignment.
		 * @protected
		 * @type {String}
		 */
		align: null,

		/**
		 * Container width units of measurement.
		 * @protected
		 * @type {String}
		 */
		widthUnit: "px",

		/**
		 * Template styles.
		 * @protected
		 * @type {Object}
		 */
		tplConfigStyles: null,

		/**
		 * Container alignment config object.
		 * @protected
		 * @type {Object}
		 */
		alignConfig: {
			left: {
				"margin-left": "0",
				"margin-right": "auto"
			},
			center: {
				"margin-left": "auto",
				"margin-right": "auto"
			},
			right: {
				"margin-left": "auto",
				"margin-right": "20px"
			}
		},

		/**
		 * @inheritdoc Terrasoft.component#tpl
		 * @override
		 */
		tpl: [
			"<div id=\"{id}-horizontal-align-container\" class=\"{wrapClassName}\" style=\"{containerStyle}\">",
			"{%this.renderItems(out, values)%}",
			"</div>"
		],


		//endregion

		//region Methods: Private

		/**
		 * Sets alignConfig by direction.
		 * @private
		 */
		_setAlignConfig: function() {
			if(Terrasoft.getIsRtlMode()) {
				this.alignConfig.right["margin-right"] = "0";
				this.alignConfig.left["margin-left"] = "20px";
			}
		},

		/**
		 * Returns sheet alignment by page direction.
		 * @private
		 * @param {String} align Sheet alignment.
		 * @return {String} Sheet alignment.
		 */
		_getAlignByPageDirection: function(align) {
			var alignByDirection = align;
			if(!Terrasoft.getIsRtlMode()) {
				return alignByDirection;
			}
			switch(align) {
				case "left":
					alignByDirection = "right";
					break;
				case "right":
					alignByDirection = "left";
					break;
				default:
					break;
			}
			return alignByDirection;
		},

		//endregion

		//region Methods: Protected

		/**
		 * Applies template config properties.
		 * @protected
		 * @param {Object} tplData Object of rendering template settings.
		 * @param {String} tplConfig template config object.
		 */
		applyTplConfigProperties: function(tplData, tplConfig) {
			Terrasoft.each(tplConfig, function(propertyValue, propertyName) {
				tplData[propertyName] = Terrasoft.deepClone(propertyValue);
			}, this);
		},

		/**
		 * Applies container template styles
		 * @protected
		 * @param {Object} tplData The object of render control template parameters.
		 */
		applyTplStyles: function(tplData) {
			var style = {};
			if(this.width) {
				style.width = this.width + this.widthUnit;
			}
			if(this.align) {
				Ext.apply(style, this.alignConfig[this.align]);
			}
			tplData.containerStyle = Ext.apply(this.tplConfigStyles, style);
			this.applyTplConfigProperties(tplData, this.tplConfigStyles);
		},

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @override
		 */
		getTplData: function() {
			var selectors = this.selectors;
			selectors.wrapEl = Ext.String.format("#{0}-horizontal-align-container", this.id);
			var tplData = this.callParent(arguments);
			this.applyTplStyles(tplData);
			return tplData;
		},

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @override
		 */
		init: function() {
			this.selectors = {wrapEl: ""};
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Component#constructor
		 * @override
		 */
		constructor: function() {
			this.tplConfigStyles = {};
			this._setAlignConfig();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var parentBindConfig = this.callParent(arguments);
			return Ext.apply(parentBindConfig, {
				width: {
					changeMethod: "setWidth"
				},
				sheetAlign: {
					changeMethod: "setAlign"
				}
			});
		},

		//endregion

		//region Methods: Public

		/**
		 * Sets the width value for the control.
		 * @param {Number} width Canvas width.
		 */
		setWidth: function(width) {
			if(this.width !== width) {
				this.width = width;
				if(this.rendered) {
					var wrapEl = this.getWrapEl();
					wrapEl.setWidth(width);
				}
			}
		},

		/**
		 * Sets align value for control element.
		 * @param {String} align Sheet alignment.
		 */
		setAlign: function(align) {
			align = this._getAlignByPageDirection(align);
			if(this.align !== align) {
				this.align = align;
				if(this.rendered) {
					var wrapEl = this.getWrapEl();
					wrapEl.setStyle(this.alignConfig[align]);
				}
			}
		}

		//endregion
	});

});


