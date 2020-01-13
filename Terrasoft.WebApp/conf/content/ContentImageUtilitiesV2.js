Terrasoft.configuration.Structures["ContentImageUtilitiesV2"] = {innerHierarchyStack: ["ContentImageUtilitiesV2"]};
define("ContentImageUtilitiesV2", ["ContentImageUtilitiesV2Resources"],
	function() {
		this.Ext.define("Terrasoft.configuration.mixins.ContentImageUtilitiesV2", {

			alternateClassName: "Terrasoft.ContentImageUtilities",

			/**
			 * Image change handler.
			 * @private
			 * @param {File} image Image.
			 */
			onImageChange: function(image) {
				if (!image) {
					this.set(this.primaryImageColumnName, null);
					return;
				}
				this.Terrasoft.ImageApi.upload({
					file: image,
					onComplete: this.onImageUploaded,
					onError: this.Terrasoft.emptyFn,
					scope: this
				});
			},

			/**
			 * Image uploaded handler.
			 * @private
			 * @param {String} imageId Image identifier.
			 */
			onImageUploaded: function(imageId) {
				var imageData = {
					value: imageId,
					displayValue: this.primaryImageColumnName
				};
				this.updateImage(imageData);
			},

			/**
			 * Updates control image.
			 * @private
			 * @param {Object} imageData Image data.
			 */
			updateImage: function(imageData) {
				this.set(this.primaryImageColumnName, imageData);
			},

			/**
			 * Gets default image resource.
			 * @protected
			 * @virtual
			 * @return {Object} Resource.
			 */
			getDefaultImageResource: function() {
				return this.get("Resources.Images.DefaultImage");
			},

			/**
			 * Gets image source URL.
			 * @protected
			 * @virtual
			 * @return {String} Source URL.
			 */
			getImageUrl: function() {
				var primaryImageColumnValue = this.get(this.primaryImageColumnName);
				if (primaryImageColumnValue) {
					return this.getSchemaImageUrl(primaryImageColumnValue);
				} else {
					var defImageResource = this.getDefaultImageResource();
					return this.Terrasoft.ImageUrlBuilder.getUrl(defImageResource);
				}
			}
		});

		return this.Ext.create("Terrasoft.ContentImageUtilities");
	});


