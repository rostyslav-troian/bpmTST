Terrasoft.configuration.Structures["ImageCustomGeneratorV2"] = {innerHierarchyStack: ["ImageCustomGeneratorV2"]};
define("ImageCustomGeneratorV2", ["ext-base", "terrasoft", "ImageCustomGeneratorV2Resources", "ViewGeneratorV2"],
	function(Ext, Terrasoft, resources) {
		var ImageCustomGenerator = Ext.define("Terrasoft.configuration.ImageCustomgenerator", {
			extend: "Terrasoft.ViewGenerator",
			alternateClassName: "Terrasoft.ImageCustomGenerator",

			/**
			* Generates options for creating controls.
			* @param {Object} config Options for generator.
			* @return {Object} Options for creating controls.
			*/
			generateCustomImageControl: function(config) {
				var id = this.getControlId(config, "Terrasoft.ImageEdit");
				var uploadButtonHint = this.getHintConfig({
					content: resources.localizableStrings.ImageUploadButtonHint,
					alignEl: "uploadButtonEl"
				});
				var clearButtonHint = this.getHintConfig({
					content: resources.localizableStrings.ImageClearButtonHint,
					alignEl: "clearButtonEl"
				});
				var controlConfig = {
					className: "Terrasoft.ImageEdit",
					imageSrc: {bindTo: config.getSrcMethod},
					defaultImageSrc: config.defaultImage,
					tips: [uploadButtonHint, clearButtonHint]
				};
				var change = config.onPhotoChange;
				if (change) {
					controlConfig.change = {bindTo: change};
				}
				this.applyControlId(controlConfig, config, id);
				Ext.apply(controlConfig, this.getConfigWithoutServiceProperties(config,
					["generator", "getSrcMethod", "defaultImage", "onPhotoChange", "beforeFileSelected"]));
				return controlConfig;
			},

			/**
			* Gets control id.
			* @overriden
			* @param {Object} config Options for generator.
			* @param {String} className Class name.
			* @return {String} Control id.
			*/
			getControlId: function(config, className) {
				if (className === "Terrasoft.ImageEdit") {
					return config.name + Terrasoft.generateGUID() + "ImageEdit";
				}
				return this.callParent(arguments);
			},

			/**
			* Forms creation options to control the display of images.
			* @param {Object} config Options for generator.
			* @return {Object} Options to control the display of images.
			*/
			generateSimpleCustomImage: function(config) {
				var initialConfig = this.generateCustomImageControl(config);
				initialConfig.tpl = [
					/*jshint quotmark:false*/
					/* jscs:disable */
					'<div id="{id}-image-edit" class="{wrapClass}">',
					'<img id="{id}-image-edit-element" src="{imageSrc}" title="{imageTitle}">',
					'</div>'
					/*jshint quotmark:true*/
					/* jscs:enable */
				];
				return initialConfig;
			}
		});
		return Ext.create(ImageCustomGenerator);
	}
);


