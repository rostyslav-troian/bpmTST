Terrasoft.configuration.Structures["MailServerViewModel"] = {innerHierarchyStack: ["MailServerViewModel"]};
define("MailServerViewModel", ["terrasoft", "MailServerViewModelResources"], function(Terrasoft, resources) {

	/**
	 * @class Terrasoft.configuration.MailServerViewModel
	 */
	Ext.define("Terrasoft.configuration.MailServerViewModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.MailServerViewModel",

		/**
		 * Gets mail server image.
		 * @return {Object}
		 */
		getMailServerImage: function() {
			var imageConfig;
			var logo = this.get("Logo");
			if (logo) {
				imageConfig = {
					source: Terrasoft.ImageSources.SYS_IMAGE,
					params: {
						primaryColumnValue: logo.value
					}
				};
			} else {
				imageConfig = resources.localizableImages.DefaultLogo;
			}
			return {
				source: Terrasoft.ImageSources.URL,
				url: Terrasoft.ImageUrlBuilder.getUrl(imageConfig)
			};
		}
	});
	return Terrasoft.MailServerViewModel;
});


