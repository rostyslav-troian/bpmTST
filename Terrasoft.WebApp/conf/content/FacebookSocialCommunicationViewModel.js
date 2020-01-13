Terrasoft.configuration.Structures["FacebookSocialCommunicationViewModel"] = {innerHierarchyStack: ["FacebookSocialCommunicationViewModel"], structureParent: "SocialCommunicationViewModel"};
define("FacebookSocialCommunicationViewModel", ["FacebookSocialCommunicationViewModelResources",
			"ConfigurationConstants", "SocialCommunicationViewModel"],
		function(resources, ConfigurationConstants) {
			Ext.define("Terrasoft.configuration.FacebookSocialCommunicationViewModel", {
				alternateClassName: "Terrasoft.FacebookSocialCommunicationViewModel",
				extend: "Terrasoft.SocialCommunicationViewModel",

				/**
				 * @inheritdoc
				 * @overridden
				 */
				getTypeImageConfig: function() {
					var socialNetworkType = this.get("SocialNetworkType");
					if (socialNetworkType === ConfigurationConstants.CommunicationTypes.Facebook) {
						return resources.localizableImages.FacebookIcon;
					}
					return null;
				},

				/**
				 * @inheritdoc
				 * @overridden
				 */
				getTypeIconButtonVisibility: function() {
					var socialNetworkType = this.get("SocialNetworkType");
					return (socialNetworkType === ConfigurationConstants.CommunicationTypes.Facebook);
				},

				/**
				 * @inheritdoc
				 * @overridden
				 */
				getIconTypeButtonMarkerValue: function() {
					var markerValue = this.callParent(arguments);
					var socialNetwork = "Facebook";
					return Ext.String.format("{0} {1}", markerValue, socialNetwork);
				}
			});
		});


