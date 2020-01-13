Terrasoft.configuration.Structures["ProfileSchemaMixin"] = {innerHierarchyStack: ["ProfileSchemaMixin"]};
define("ProfileSchemaMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.ProfileSchemaMixin
	 * Profile mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.ProfileSchemaMixin", {

		alternateClassName: "Terrasoft.ProfileSchemaMixin",

		/**
		 * Returns profile icon url.
		 * @protected
		 * @return {String} Profile icon url.
		 */
		getProfileIcon: function() {
			var primaryImageColumnValue = this.get(this.primaryImageColumnName);
			if (primaryImageColumnValue) {
				return this.getSchemaImageUrl(primaryImageColumnValue);
			}
			return this.getDefaultProfileIcon();
		},

		/**
		 * Returns default photo image url.
		 * @protected
		 * @return {String} Photo image url.
		 */
		getDefaultProfileIcon: function() {
			return this.getImageUrlByResourceKey("Resources.Images.ProfileIcon");
		},

		/**
		 * Returns Image url.
		 * @param {String} key Image key of resources.
		 * @return {String} Image url.
		 */
		getImageUrlByResourceKey: function(key) {
			var resourceImage = this.get(key);
			return this.Terrasoft.ImageUrlBuilder.getUrl(resourceImage);
		}
	});

	return Terrasoft.ProfileSchemaMixin;
});


