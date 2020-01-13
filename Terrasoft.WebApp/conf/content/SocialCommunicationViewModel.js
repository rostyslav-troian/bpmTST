Terrasoft.configuration.Structures["SocialCommunicationViewModel"] = {innerHierarchyStack: ["SocialCommunicationViewModel"], structureParent: "BaseCommunicationViewModel"};
define("SocialCommunicationViewModel", ["BaseCommunicationViewModel"], function() {
	Ext.define("Terrasoft.configuration.SocialCommunicationViewModel", {
		alternateClassName: "Terrasoft.SocialCommunicationViewModel",
		extend: "Terrasoft.BaseCommunicationViewModel",

		/**
		 * ########## ####### ######### ######### ######## ###-####.
		 * @protected
		 * @param {Boolean} value ######### ######## ###-####.
		 */
		onSelectItem: function(value) {
			this.isDeleted = !value;
		},

		/**
		 * @inheritdoc Terrasoft.BaseCommunicationViewModel#getTypeButtonStyle
		 * @overridden
		 */
		getTypeButtonStyle: function() {
			var communicationType = this.get("CommunicationType");
			if (!communicationType) {
				return "red-communication-type";
			} else {
				return Terrasoft.controls.ButtonEnums.style.TRANSPARENT;
			}
		},

		/**
		 * ########## ###### ### ###-#####.
		 */
		getCheckBoxEditMarkerValue: function() {
			return Ext.String.format("{0} {1}", this.getIconTypeButtonMarkerValue(), "checkbox");
		}
	});
});


