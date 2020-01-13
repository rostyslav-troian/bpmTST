Terrasoft.configuration.Structures["BaseModule"] = {innerHierarchyStack: ["BaseModule"]};
define("BaseModule", ["ext-base"], function(Ext) {

	/**
	 * The base class of the module.
	 */
	Ext.define("Terrasoft.configuration.BaseModule", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.BaseModule",

		/**
		 * ############# ########## ######.
		 * type {String}
		 */
		renderToId: null,

		/**
		 * ####### ############# ##### ######## ### ######## ######.
		 * type {Boolean}
		 */
		showMask: false,

		/**
		 * ############# ##### ######## ######.
		 * @private
		 * type {String}
		 */
		maskId: null,

		/**
		 * ######### ######## ######.
		 * @type {Object}
		 * @protected
		 */
		parameters: null,

		/**
		 * ########## ##### ######## ######.
		 * @protected
		 */
		showLoadingMask: function() {
			if (this.showMask && this.renderToId) {
				this.maskId = Terrasoft.Mask.show({
					selector: Ext.String.format("#{0}", this.renderToId)
				});
			}
		},

		/**
		 * ######## ##### ######## ######.
		 * @protected
		 */
		hideLoadingMask: function() {
			if (this.maskId && this.showMask) {
				Terrasoft.Mask.hide(this.maskId);
				this.maskId = null;
			}
		},

		/**
		 * @inheritDoc Terrasoft.core.BaseObject#init
		 * @overridden
		 */
		init: function() {
			this.showLoadingMask();
		},

		/**
		 * ######### ####### ########## ######.
		 */
		render: function() {
			this.hideLoadingMask();
		},

		/**
		 * @inheritDoc Terrasoft.core.BaseObject#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			this.hideLoadingMask();
			this.callParent(arguments);
		}

	});

	return Terrasoft.BaseModule;
});


