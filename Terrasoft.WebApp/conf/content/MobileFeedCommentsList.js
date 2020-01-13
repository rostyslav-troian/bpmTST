Terrasoft.configuration.Structures["MobileFeedCommentsList"] = {innerHierarchyStack: ["MobileFeedCommentsList"]};
/**
 * @class Terrasoft.configuration.FeedCommentsList
 */
Ext.define("Terrasoft.configuration.FeedCommentsList", {
	extend: "Terrasoft.configuration.FeedList",

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	getDefaultItemTpl: function() {
		var useImage = this.getUseIcons() || !!this.getImageColumn();
		var iconedCls = (useImage ? " x-iconed" + " x-iconed-" + this.getIconPosition() : "");
		return new Ext.XTemplate(
			"<div class=\"x-list-item-tpl" + iconedCls + " {[this.getIsCommentCls(values)]}" +
			"{[this.applyActionsClassName(values)]}\" {[this.applyRecordAttribute(values)]}>",
			"{[this.applyActionsButton(values)]}",
			"{[this.applyLikeButton(values)]}",
			"{[this.applyLinkImage(values, this.applyImage(values))]}",
			"<div class=\"cf-feed-list-item-header\">",
			"{[this.applyPrimaryColumn(values)]}",
			"<div class=\"cf-feed-list-item-header-info\">",
			"{[this.applyDate(values)]}{[this.applyEntityRecord(values)]}",
			"</div>",
			"</div>",
			"{[this.applyGroupColumns(values)]}",
			"{[this.applyIsDelivered(values)]}",
			"{[this.applyLikeInfo(values)]}",
			"</div>",
			this.getDefaultItemTplData()
		);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	initialize: function() {
		this.callParent(arguments);
		this.addCls("cf-feed-comments-list");
		var containerElement = this.container.element;
		containerElement.on({
			tap: "onLikesInfoTap",
			delegate: ".cf-likes-info",
			scope: this
		});
	},

	/**
	 * Handles tap on like's info element.
	 * @param {Ext.event.Event} event Fired event.
	 * @protected
	 * @virtual
	 */
	onLikesInfoTap: function(event, target) {
		event.stopEvent();
		var record = this.getRecordByTarget(target);
		this.fireEvent("likesinfotap", this, record);
	},

	/**
	 * Returns function for generating like's info template.
	 * @protected
	 * @overriden
	 * @returns {Function} Function for generating like's info template.
	 */
	getApplyItemTplLikesInfoFn: function() {
		return function(values) {
			var likeCount = parseInt(values.LikeCount, 10);
			if (isNaN(likeCount) || likeCount === 0) {
				return "";
			}
			var list = this.list;
			var store = list.getStore();
			var socialMessageLikedRecordIds = store.socialMessageLikedRecordIds;
			var recordId = values.Id;
			var isLiked = (socialMessageLikedRecordIds.indexOf(recordId) !== -1);
			var text;
			if (isLiked) {
				likeCount--;
				if (likeCount === 0) {
					text = Terrasoft.LocalizableStrings.MobileFeedCommentsListLikeYou;
				} else {
					text = Ext.String.format(Terrasoft.LocalizableStrings.MobileFeedCommentsListLikeYouAndOthers,
						likeCount);
				}
			} else if (likeCount === 1) {
				text = Ext.String.format(Terrasoft.LocalizableStrings.MobileFeedCommentsListLikeOther, likeCount);
			} else {
				text = Ext.String.format(Terrasoft.LocalizableStrings.MobileFeedCommentsListLikeOthers, likeCount);
			}
			var recordAttribute = Ext.String.format("recordId='{0}'", recordId);
			return Ext.String.format("<span class=\"cf-likes-info\" {0}>{1}</span>", recordAttribute, text);
		};
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	truncateMessage: function(message) {
		return message;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	getDefaultItemTplData: function() {
		var data = this.callParent(arguments);
		return Ext.apply(data, {
			applyLikeInfo: this.getApplyItemTplLikesInfoFn(),
			getIsCommentCls: function(values) {
				if (!Ext.isEmpty(values.Parent)) {
					return "cf-comment-item";
				}
			},
			showLikeButtonCaption: false
		});
	}

});


