Terrasoft.configuration.Structures["EmailTimelineItemViewModel"] = {innerHierarchyStack: ["EmailTimelineItemViewModel"]};
define("EmailTimelineItemViewModel", ["BaseTimelineItemViewModel", "EmailTimelineItemViewModelResources"],
	function() {
		/**
		 * @class Terrasoft.configuration.EmailTimelineItemViewModel
		 * Email timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.EmailTimelineItemViewModel", {
			alternateClassName: "Terrasoft.EmailTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Properties: Protected

			/**
			 * Sender name and address parse regexp.
			 * @type {String}
			 */
			emailContactInfoRegExp: "(.+) <(.+)>",

			/**
			 * Email new line parse regexp.
			 * @type {RegExp}
			 */
			emailNewLineRegExp: /\n/g,

			/**
			 * Email new line html tag.
			 * @type {String}
			 */
			emailNewLineHtml: "<br />",

			/**
			 * Email is html regexp.
			 * @type {RegExp}
			 */
			emailIsHtmlRegExp: /<[a-z/][\s\S]*>/i,

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.prepareEmailMessage();
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				this.callParent(arguments);
				this.set("ShowAuthorIcon", true);
				this.set("UseAuthorCaption", true);
				this.set("RecipientName", this.getRecipientName());
			},

			/**
			 * Checks if text is html.
			 * @protected
			 * @param {String} text Text.
			 * @return {Boolean}
			 */
			isHtmlText: function(text) {
				return this.emailIsHtmlRegExp.test(text);
			},

			/**
			 * Prepares email message.
			 * @protected
			 */
			prepareEmailMessage: function() {
				var message = this.$Message || "";
				if (!this.isHtmlText(message)) {
					this.$Message = message.replace(this.emailNewLineRegExp, this.emailNewLineHtml);
				}
			},

			/**
			 * Returns email author name.
			 * @protected
			 * @param {String} emailAuthor Sender.
			 * @return {String}
			 */
			getEmailAuthorName: function(emailAuthor) {
				var emailAuthorName = "";
				if (!Ext.isEmpty(emailAuthor)) {
					var regExp = new RegExp(this.emailContactInfoRegExp);
					var emailAuthorInfo = emailAuthor.match(regExp);
					emailAuthorName = emailAuthorInfo ? emailAuthorInfo[1] : emailAuthor;
				}
				return emailAuthorName;
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#getAuthorName
			 * @override
			 */
			getAuthorName: function() {
				var author = this.get("Author");
				return (author && author.displayValue) || this.getEmailAuthorName(this.get("AuthorEmail"));
			},

			// endregion

			// region Methods: Public

			/**
			 * Returns recipient name.
			 * @return {String}
			 */
			getRecipientName: function() {
				var recipient = this.get("Recipient");
				return (recipient && recipient.displayValue) || this.getEmailAuthorName(this.get("RecipientEmail"));
			},

			/**
			 * Handles click on record recipient caption.
			 */
			onRecipientCaptionClick: function() {
				var recipient = this.get("Recipient");
				if (Ext.isObject(recipient)) {
					this.openEntityCard(this.authorEntitySchemaName, recipient.value);
				}
				return false;
			},

			/**
			 * Generates hyperlink URL for record recipient entity.
			 * @return {String|null} URL address if recipient column is defined, otherwise null.
			 */
			getRecipientUrl: function() {
				var recipient = this.get("Recipient");
				if (Ext.isObject(recipient)) {
					return this.getEntityUrl(this.authorEntitySchemaName, recipient.value, null);
				}
				return null;
			},

			/**
			 * Handles on recipient link mouse over.
			 * @param {Object} target Target object.
			 */
			recipientLinkMouseOver: function(target) {
				var recipient = this.get("Recipient");
				if (!Ext.isEmpty(this.authorEntitySchemaName) && !Ext.isEmpty(recipient)) {
					this.showMiniPage({
						targetId: target.targetId,
						entitySchemaName: this.authorEntitySchemaName,
						recordId: recipient.value
					});
				}
			}

			// endregion

		});
	});


