Terrasoft.configuration.Structures["CommunicationUtils"] = {innerHierarchyStack: ["CommunicationUtils"]};
define("CommunicationUtils", ["CommunicationUtilsResources", "ConfigurationConstants"],
	function(resources, ConfigurationConstants) {
		Ext.define("Terrasoft.CommunicationUtils", {

			/**
			 * Checks communication type. Returns true if is social network type.
			 * @param {Object|String} communicationType Communication type or communication type id.
			 * @param {Object|String} [communication] Communication or communication id.
			 * @return {Boolean} True if is social network type.
			 */
			isSocialNetworkType: function(communicationType, communication) {
				if (!communicationType && !communication) {
					return false;
				}
				communicationType = communicationType.value || communicationType;
				communication = (communication && communication.value) || communication;
				return ConfigurationConstants.SocialNetworksCommunicationTypes.indexOf(communicationType) !== -1 ||
					communication === ConfigurationConstants.Communication.SocialNetwork;
			},

			/**
			 * Checks communication type. Returns true if is phone type.
			 * @param {Object|String} communicationType Communication type or communication type id.
			 * @param {Object} phoneTypes List of phone types.
			 * @param {Object|String} [communication] Communication or communication id.
			 * @return {Boolean} True if is phone type.
			 */
			isPhoneType: function(communicationType, phoneTypes, communication) {
				if (!communicationType && !communication) {
					return false;
				}
				communicationType = communicationType.value || communicationType;
				communication = (communication && communication.value) || communication;
				var phonesCommunicationTypes = phoneTypes || ConfigurationConstants.PhonesCommunicationTypes;
				return phonesCommunicationTypes.indexOf(communicationType) !== -1 ||
					communication === ConfigurationConstants.Communication.Phone ||
					communication === ConfigurationConstants.Communication.SMS;
			},

			/**
			 * Checks communication type. Returns true if is web type.
			 * @param {Object|String} communicationType Communication type or communication type id.
			 * @param {Object|String} [communication] Communication or communication id.
			 * @return {Boolean} True if is web type.
			 */
			isWebType: function(communicationType, communication) {
				if (!communicationType && !communication) {
					return false;
				}
				communicationType = communicationType.value || communicationType;
				communication = (communication && communication.value) || communication;
				return ConfigurationConstants.CommunicationTypes.Web.indexOf(communicationType) !== -1 ||
					communication === ConfigurationConstants.Communication.Web;
			},

			/**
			 * Checks communication type. Returns true if is email type.
			 * @param {Object|String} communicationType Communication type or communication type id.
			 * @param {Object|String} [communication] Communication or communication id.
			 * @return {Boolean} True if is email type.
			 */
			isEmailType: function(communicationType, communication) {
				if (!communicationType && !communication) {
					return false;
				}
				communicationType = communicationType.value || communicationType;
				communication = (communication && communication.value) || communication;
				return ConfigurationConstants.CommunicationTypes.Email.indexOf(communicationType) !== -1 ||
					communication === ConfigurationConstants.Communication.Email;
			},

			/**
			 * Checks communication type. Returns true if is skype type.
			 * @param {Object|String} communicationType Communication type or communication type id.
			 * @param {Object|String} [communication] Communication or communication id.
			 * @return {Boolean} True if is skype type.
			 */
			isSkypeType: function(communicationType, communication) {
				if (!communicationType && !communication) {
					return false;
				}
				communicationType = communicationType.value || communicationType;
				communication = (communication && communication.value) || communication;
				var skypeId = ConfigurationConstants.Communications.UseForContacts.Predefined.Skype.value;
				return skypeId.indexOf(communicationType) !== -1 ||
					communication === ConfigurationConstants.Communication.Skype;
			},

			/**
			 * Checks that string is facebook profile url.
			 * @param {String} url Facebook url string to check.
			 */
			isFacebookProfileLink: function(url) {
				if (!url) {
					return false;
				}
				var facebookProfile = "^(http[s]?:\\/\\/)?((www|[a-zA-Z]{2}-[a-zA-Z]{2})\\.)?(facebook\.com|fb\.me)\\/"
					+ "(pages\\/[a-zA-Z0-9\\.-]+\\/[0-9]+|[a-zA-Z0-9\\.-]+|profile\.php\\?id\\=[0-9]+)\\b[\\/]?"
					+ "(\\?[a-z]*ref\=[a-z]+)?$";
				return url.match(facebookProfile);
			},

			/**
			 * Returns fully formatted link for facebook profile.
			 * @param {String} url Facebook url string to check.
			 * @throws {Terrasoft.InvalidFormatException} when argument is not a facebook profile.
			 */
			formatFacebookProfileLink: function(url) {
				if (!this.isFacebookProfileLink(url)) {
					throw new Terrasoft.InvalidFormatException();
				}
				var formattedUrl = url;
				if (!formattedUrl.match(/^http[s]?\:\/\//)) {
					formattedUrl = "https://" + formattedUrl;
				}
				return formattedUrl;
			}
		});

		return Ext.create("Terrasoft.CommunicationUtils");
	});


