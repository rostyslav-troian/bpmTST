Terrasoft.configuration.Structures["ImageSectionWizardCustomGenerator"] = {innerHierarchyStack: ["ImageSectionWizardCustomGenerator"]};
define("ImageSectionWizardCustomGenerator", ["ext-base", "terrasoft", "ImageCustomGeneratorV2"],
	function(Ext, Terrasoft) {
		Ext.define("Terrasoft.configuration.ImageSectionWizardCustomGenerator", {
			alternateClassName: "Terrasoft.ImageSectionWizardCustomGenerator",
			extend: "Terrasoft.ImageCustomGenerator",

			/**
			 * Prepares image control parameters.
			 * @private
			 * @param {Object} imageControl Image control parameters.
			 * @return {Object} Prepared image control parameters.
			 */
			prepareCustomImage: function(imageControl) {
				return this.removeExtraParameters(Terrasoft.deepClone(imageControl), ["labelConfig"]);
			},

			/**
			 * Prepares label parameters.
			 * @private
			 * @param {Object} label Label parameters.
			 * @return {Object} Prepared label parameters.
			 */
			prepareCustomLabel: function(label) {
				return this.removeExtraParameters(Terrasoft.deepClone(label), ["defaultImageSrc", "generator",
					"imageSrc", "onPhotoChange"]);
			},

			/**
			 * Removes item extra parameters.
			 * @private
			 * @param {Object} config Item parameters.
			 * @param {Array} parameters Extra parameters list.
			 * @return {Object} Handled item parameters.
			 */
			removeExtraParameters: function(config, parameters) {
				if (!Ext.isEmpty(parameters) && !Ext.isEmpty(config)) {
					parameters.forEach(function(parameter) {
						if (config[parameter]) {
							delete config[parameter];
						}
					});
				}
				return config;
			},

			/**
			 * Generates wrapper for image control and label.
			 * @protected
			 * @param {Object} config Generator parameters.
			 * @param {Object} imageControl Image control parameters.
			 * @param {Object} label Label parameters.
			 * @return {Object} Wrapper with image control and label.
			 */
			generateControlWrapper: function(config, imageControl, label) {
				var wrapperId = this.getControlId(config, "Terrasoft.Container");
				var wrapper = this.getDefaultContainerConfig(wrapperId, config);
				if (!Ext.isEmpty(config.visible)) {
					wrapper.visible = config.visible;
				}
				if (label) {
					var labelWrapper = this.generateControlLabelWrap(label);
					labelWrapper.items.push(label);
					wrapper.items.push(labelWrapper);
				}
				var imageControlWrapper = this.generateEditControlWrap(config);
				imageControlWrapper.classes = {
					wrapClassName: "control-wrap image-edit-container"
				};
				imageControlWrapper.items.push(imageControl);
				wrapper.items.push(imageControlWrapper);
				return wrapper;
			},

			/**
			 * Generates image control.
			 * @protected
			 * @param {Object} config Generator parameters.
			 * @return {Object} Image control parameters.
			 */
			generateCustomImageControl: function(config) {
				return this.callParent([this.prepareCustomImage(config)]);
			},

			/**
			 * Generates label.
			 * @protected
			 * @param {Object} config Generator parameters.
			 * @return {Object} Label parameters.
			 */
			generateCustomLabel: function(config) {
				if (this.isItemLabelVisible(config)) {
					var label = this.prepareCustomLabel(config);
					return this.generateLabel(label);
				}
			},

			/**
			 * Generates custom image control with label parameters.
			 * @param {Object} config Generator parameters.
			 * @return {Object} Generated image control with label parameters.
			 */
			generateCustomImageControlWithLabel: function(config) {
				var imageControl = this.generateCustomImageControl(config);
				var label = this.generateCustomLabel(config);
				return this.generateControlWrapper(config, imageControl, label);
			}

		});
		return Ext.create("Terrasoft.ImageSectionWizardCustomGenerator");
	});


