Terrasoft.configuration.Structures["MaskHelper"] = {innerHierarchyStack: ["MaskHelper"]};
define("MaskHelper", [], function() {
	Ext.define("Terrasoft.configuration.MaskHelper", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.MaskHelper",
		singleton: true,

		/**
		 * Section loading mask identifier.
		 * @type {String}
		 */
		_bodyMaskId: null,

		/**
		 * The unique loading mask identifier.
		 * @type {String}
		 */
		_uniqueMaskId: null,

		/**
		 * Default body mask css selector.
		 * @private
		 * @type {String}
		 */
		_defaultMaskCssSelector: "body",

		// region Methods: Public

		/**
		 * Display the loading mask if it has not been recognized.
		 * @param {Object} [config] Parameters for the mask.
		 * @param {String} [config.uniqueMaskId] The unique identifier of the mask.
		 * @see {@link Terrasoft.mask#show}
		 */
		showBodyMask: function(config) {
			if (this._uniqueMaskId) {
				return;
			}
			if (config && (!Ext.isEmpty(config.uniqueMaskId))) {
				this._uniqueMaskId = config.uniqueMaskId;
			}
			const maskId = Terrasoft.Mask.show(config);
			this._bodyMaskId = maskId || this._bodyMaskId;
			return maskId;
		},

		/**
		 * Hides loading mask if it has been displayed.
		 * @param {Object} [config] Parameters for the mask.
		 * @param {String} [config.uniqueMaskId] The unique identifier of the mask.
		 * @param {String} [config.maskId] The identifier of the mask.
		 * @param {String} [config.selector] Mask selector.
		 */
		hideBodyMask: function(config) {
			if (this._uniqueMaskId && !(config && config.uniqueMaskId === this._uniqueMaskId)) {
				return;
			}
			this._uniqueMaskId = null;
			let maskSelector = this._defaultMaskCssSelector;
			if (config) {
				if (config.maskId) {
					Terrasoft.Mask.hide(config.maskId);
				}
				if (config.selector) {
					maskSelector = config.selector;
				}
			} else if (!Ext.isEmpty(this._bodyMaskId)) {
				Terrasoft.Mask.hide(this._bodyMaskId);
			}
			Terrasoft.Mask.clearMasks(maskSelector);
		},

		/**
		 * Updates body mask caption.
		 * @param {String} maskId Mask identifier.
		 * @param {String} caption New mask caption.
		 */
		updateBodyMaskCaption: function(maskId, caption) {
			Terrasoft.Mask.updateCaption(maskId, caption);
		},

		// endregion

		// region Methods: Deprecated

		/**
		 * @deprecated
		 */
		ShowBodyMask: function(config) {
			return this.showBodyMask(config);
		},

		/**
		 * @deprecated
		 */
		HideBodyMask: function(config) {
			this.hideBodyMask(config);
		},

		/**
		 * @deprecated
		 */
		UpdateBodyMaskCaption: function(maskId, caption) {
			this.updateBodyMaskCaption(maskId, caption);
		}


		// endregion

	});

	return Terrasoft.MaskHelper;
});


