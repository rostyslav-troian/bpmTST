Terrasoft.configuration.Structures["FacebookCommunicationViewModel"] = {innerHierarchyStack: ["FacebookCommunicationViewModel"]};
define("FacebookCommunicationViewModel", ["FacebookCommunicationViewModelResources", "ConfigurationConstants",
	"CommunicationUtils", "BaseCommunicationViewModel"],
		function(resources, ConfigurationConstants, CommunicationUtils) {
			Ext.define("Terrasoft.configuration.FacebookCommunicationViewModel", {
				alternateClassName: "Terrasoft.FacebookCommunicationViewModel",
				extend: "Terrasoft.BaseCommunicationViewModel",

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getRightIconEnabled
				 * @overridden
				 */
				getRightIconEnabled: function() {
					return true;
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getLinkUrl
				 * @overridden
				 */
				getLinkUrl: function(value) {
					var facebookUrl = this.getFacebookUrl();
					return {
						url: facebookUrl,
						caption: value
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getFacebookUrl
				 * @overridden
				 */
				getFacebookUrl: function() {
					var id = this.get("SocialMediaId");
					var facebookUrl;
					if (id) {
						facebookUrl = "https://www.facebook.com/" + id;
					} else {
						var link = this.get("Number");
						if (CommunicationUtils.isFacebookProfileLink(link)) {
							facebookUrl = CommunicationUtils.formatFacebookProfileLink(link);
						}
					}
					return facebookUrl;
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#onLinkClick
				 * @overridden
				 */
				onLinkClick: function(path) {
					window.open(path);
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getTypeImageConfig
				 * @overridden
				 */
				getTypeImageConfig: function() {
					return resources.localizableImages.FacebookIcon;
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getTypeIconButtonVisibility
				 * @overridden
				 */
				getTypeIconButtonVisibility: function() {
					return true;
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getMenuItemVisibility
				 * @overridden
				 */
				getMenuItemVisibility: function() {
					var communicationType = this.get("CommunicationType");
					if (!communicationType) {
						return true;
					}
					return (communicationType.value !== ConfigurationConstants.CommunicationTypes.Facebook);
				}
			});
		});


