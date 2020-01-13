/**
 * Initialize default feature state for login page.
 */
(function() {
	const preLoadedFeatures = Terrasoft.preLoadedFeatures || {};
	if (!preLoadedFeatures.UseAnimationSpinner) {
		preLoadedFeatures.UseAnimationSpinner = {state: 1, code: "UseAnimationSpinner"};
		Terrasoft.preLoadedFeatures = preLoadedFeatures;
	}
})();

/**
 * Base animation spinner.
 */
Ext.define("Terrasoft.controls.BaseAnimationSpinner", {
	extend: "Terrasoft.BaseSpinner",
	alternateClassName: "Terrasoft.BaseAnimationSpinner",

	/**
	 * An animation instance.
	 * @type {Object}
	 * @private
	 */
	spinner: null,

	/**
	 * Spinner class.
	 * @type {String}
	 * @protected
	 */
	spinnerClass: "animation-spinner",

	/**
	 * @inheritDoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		const tplData = this.callParent(arguments);
		tplData.extraComponentClasses = [this.spinnerClass, tplData.extraComponentClasses];
		return tplData;
	},

	/**
	 * @inheritDoc Terrasoft.BaseSpinner#show
	 * @override
	 */
	show: function() {
		if (!Ext.isEmpty(this.spinner)) {
			this.spinner.destroy();
			this.spinner = null;
		}
		const elementId = this.getSpinnerId();
		const container = document.getElementById(elementId);
		const animationData = this.getAnimationData();
		if (Ext.isEmpty(container) || Ext.isEmpty(animationData)) {
			return;
		}
		const params = {
			container: container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animationData
		};
		this.spinner = lottie.loadAnimation(params);
	},

	/**
	 * @inheritDoc Terrasoft.Component#destroy
	 * @override
	 */
	onDestroy: function() {
		if (this.spinner) {
			this.spinner.destroy();
		}
		this.callParent(arguments);
	},

	/**
	 * Returns animation data.
	 * @abstract
	 * @protected
	 * @return {Object} Animation data in lottie format.
	 */
	getAnimationData: Terrasoft.emptyFn

});
