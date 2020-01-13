Terrasoft.configuration.Structures["SocialMessageHistoryCommentItemPageViewModel"] = {innerHierarchyStack: ["SocialMessageHistoryCommentItemPageViewModel"]};
define("SocialMessageHistoryCommentItemPageViewModel", ["NetworkUtilities", "MiniPageUtilities",
		"SocialMessageHistoryCommentItemPageViewModelResources"],
	function(NetworkUtilities) {
		/**
		 * @class Terrasoft.configuration.SocialMessageHistoryCommentItemPageViewModel
		 * Comment to social message in history view model class.
		 */
		Ext.define("Terrasoft.configuration.SocialMessageHistoryCommentItemPageViewModel", {
			alternateClassName: "Terrasoft.SocialMessageHistoryCommentItemPageViewModel",
			extend: "Terrasoft.BaseModel",

			Ext: null,
			Terrasoft: null,
			sandbox: null,

			getCreatedOn: this.Terrasoft.abstractFn,
			openCreatedByPage: this.Terrasoft.abstractFn,
			getCreatedByImage: this.Terrasoft.abstractFn,
			getImageUrlByEntity: this.Terrasoft.abstractFn,
			getImageUrlById: this.Terrasoft.abstractFn,

			displayValueConverter: function(value) {
				return (value && value.displayValue) || Ext.emptyString;
			},

			contactToUrlConverter: function(contact) {
				if (!contact || !contact.value) {
					return Ext.emptyString;
				}
				return "ViewModule.aspx#" + NetworkUtilities.getEntityUrl("Contact", contact.value);
			}
		});
	});


