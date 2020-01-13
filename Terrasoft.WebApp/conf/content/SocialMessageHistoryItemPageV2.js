Terrasoft.configuration.Structures["SocialMessageHistoryItemPageV2"] = {innerHierarchyStack: ["SocialMessageHistoryItemPageV2"], structureParent: "SocialMessageHistoryItemPage"};
define('SocialMessageHistoryItemPageV2Structure', ['SocialMessageHistoryItemPageV2Resources'], function(resources) {return {schemaUId:'b98f4f9c-4ff0-4de7-be65-bbfd08e282b2',schemaCaption: "SocialMessageHistoryItemPageV2", parentSchemaName: "SocialMessageHistoryItemPage", schemaName:'SocialMessageHistoryItemPageV2',parentSchemaUId:'28ade5ba-21a6-42b2-a77c-d0d10b4b199c',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SocialMessageHistoryItemPageV2", ["SocialMessageHistoryCommentItemPageViewConfig",
		"SocialMessageHistoryCommentItemPageViewModel", "css!SocialMessageHistoryItemPageV2CSS"],
	function() {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				/**
				 * Collection of loaded comment messages.
				 */
				"CommentMessages": {
					"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Count of loaded comment messages.
				 */
				"ShownCommentMessagesCount": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 0
				},
				/**
				 * Comments block visibility attribute.
				 */
				"CommentsVisible": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},
				/**
				 * Count of messages loaded at once.
				 */
				"LoadMessagesAtOnceCount": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 10
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#getChannelIcon
				 * @overridden
				 */
				getChannelIcon: function () {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.SocialChannelIcon"));
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.initAttributes();
				},

				/**
				 * Base initialization of attributes.
				 * @protected
				 */
				initAttributes: function() {
					this.set("CommentMessages", this.Ext.create("Terrasoft.Collection"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryItemPage#historyMessageEsqApply
				 * @override
				 */
				historyMessageEsqApply: function(esq) {
					this.callParent(arguments);
					esq.addColumn("[SocialMessage:Id:RecordId].CommentCount", "CommentCount");
				},

				/**
				 * Download next portion of messages.
				 * @protected
				 */
				onLoadNextComment: function() {
					var select = this.getCommentMessagesSelect();
					select.getEntityCollection(function(response) {
						if (response && response.success) {
							this._updateCommentsCollection(response.collection);
						}
					}, this);
				},

				/**
				 * @param entityCollection {Terrasoft.Collection} Collection of social message entities.
				 * @private
				 */
				_updateCommentsCollection: function(entityCollection) {
					var commentMessages = this.get("CommentMessages");
					this.set("ShownCommentMessagesCount", this.get("ShownCommentMessagesCount") +
						entityCollection.getCount());
					entityCollection.each(function(entity) {
						commentMessages.add(entity.get("Id"), this.createCommentItemViewModel(entity));
					}, this);
				},

				/**
				 * Create comment message item view model.
				 * @param entity {Terrasoft.Entity} Entity source for view model attributes filling.
				 * @protected
				 * @return {Terrasoft.SocialMessageHistoryCommentItemPageViewModel} Created entity.
				 */
				createCommentItemViewModel: function(entity) {
					var viewModel = Ext.create(this.getCommentViewModelClassName(), {
						Ext: this.Ext,
						Terrasoft: this.Terrasoft,
						sandbox: this.sandbox,
						getCreatedOn: this.getCreatedOn,
						openCreatedByPage: this.openCreatedByPage,
						getCreatedByImage: this.getCreatedByImage,
						getImageUrlByEntity: this.getImageUrlByEntity,
						getImageUrlById: this.getImageUrlById,
						values: {
							"Id": entity.get("Id"),
							"Message": entity.get("Message"),
							"CreatedBy": entity.get("CreatedBy"),
							"CreatedOn": entity.get("CreatedOn"),
							"Resources.Images.DefaultCreatedBy": this.get("Resources.Images.DefaultCreatedBy")
						}
					});
					return viewModel;
				},

				/**
				 * Get class name of comment view model.
				 * @return {string} Class name.
				 * @protected
				 * @virtual
				 */
				getCommentViewModelClassName: function() {
					return "Terrasoft.SocialMessageHistoryCommentItemPageViewModel";
				},

				/**
				 * Build select query to fetch comments.
				 * @return {Terrasoft.EntitySchemaQuery} Built query.
				 */
				getCommentMessagesSelect: function() {
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SocialMessage"
					});
					select.isPageable = true;
					select.rowCount = this.get("LoadMessagesAtOnceCount");
					select.rowsOffset = this.get("ShownCommentMessagesCount");
					select.addColumn("Id");
					select.addColumn("Message");
					select.addColumn("CreatedBy");
					select.addColumn("CreatedOn").orderDirection = this.Terrasoft.OrderDirection.ASC;
					var parentMessageFilter = select.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Parent", this.get("RecordId"));
					select.filters.add("ParentMessageFilter", parentMessageFilter);
					return select;
				},

				/**
				 * Build and set comment view config.
				 * @protected
				 * @param itemConfig
				 */
				getCommentViewConfig: function(itemConfig) {
					var itemViewConfig = this.Ext.create(this.getCommentViewConfigClassName()).getViewConfig();
					itemConfig.config = itemViewConfig;
				},

				/**
				 * @protected
				 * @virtual
				 * Get class name of comment view.
				 * @return {string} Class name.
				 */
				getCommentViewConfigClassName: function() {
					return "Terrasoft.SocialMessageHistoryCommentItemPageViewConfig";
				},

				/**
				 * Get url of "comment" icon.
				 * @return {String} Icon url.
				 * @protected
				 */
				getCommentsIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.CommentsIcon"));
				},

				/**
				 * Get url of "show more" icon.
				 * @return {String} Icon url.
				 */
				getShowMoreCommentsIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.ExpandArrow"));
				},

				/**
				 * Toggle comments block visibility and load first portion of comments if it is visible and empty.
				 * @protected
				 */
				toggleCommentsVisibility: function() {
					if (this.get("CommentCount") < 1) {
						return;
					}
					var newVisibilityState = !this.get("CommentsVisible");
					this.set("CommentsVisible", newVisibilityState);
					if (newVisibilityState && this.get("ShownCommentMessagesCount") === 0) {
						this.onLoadNextComment();
					}
				},

				/**
				 * Build and return caption of comments label.
				 * @return {String} Comments label caption.
				 * @protected
				 */
				getShowHideCommentsCaption: function() {
					var template = this.get("Resources.Strings.ShowHideCommentsCaptionTemplate");
					return this.Ext.String.format(template, this.get("CommentCount") || 0);
				},

				/**
				 * Return visibility state of "show more" comments block.
				 * @return {boolean}
				 * @protected
				 */
				getShowMoreCommentsVisible: function() {
					return this.get("CommentsVisible") &&
						((this.get("CommentCount") || 0) > this.get("ShownCommentMessagesCount"));
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HistoryV1Container"
				},
				{
					"operation": "merge",
					"name": "HistoryV2Container",
					"values": {
						"markerValue": {
							"bindTo": "getWrapContainerMarkerValue"
						},
						"wrapClass": ["historyV2-container-wrap", "historyV2-social-message-main-container"]
					}
				},
				{
					"operation": "insert",
					"name": "HistoryV2CreatedByLink",
					"parentName": "HistoryV2MessageHeaderCenterContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
						"classes": {
							"hyperlinkClass": ["createdByLink"]
						},
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"href": {
							"bindTo": "getCreatedByUrl"
						},
						"markerValue": "CreatedByLink",
						"target": this.Terrasoft.controls.HyperlinkEnums.target.SELF
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "ShowHideCommentsControlContainer",
					"parentName": "HistoryV2MessageFooterContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["show-hide-comments-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "ShowHideCommentsControlContainer",
					"propertyName": "items",
					"name": "CommentsIcon",
					"values": {
						"getSrcMethod": "getCommentsIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {"wrapClass": ["icon16"]}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ToggleCommentsVisibility",
					"parentName": "ShowHideCommentsControlContainer",
					"propertyName": "items",
					"values": {
						"id": "ToggleCommentsVisibility",
						"labelClass": ["icon16-label"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getShowHideCommentsCaption"},
						"click": {"bindTo": "toggleCommentsVisibility"}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "ESNCommentsContainer",
					"parentName": "HistoryV2MessageFooterContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["esn-comments-container"],
						"visible": {"bindTo": "CommentsVisible"},
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "ESNComments",
					"parentName": "ESNCommentsContainer",
					"propertyName": "items",
					"values": {
						"itemPrefix": "Id",
						"generateId": false,
						"visible": {"bindTo": "CommentsVisible"},
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "CommentMessages",
						"observableRowNumber": 10,
						"onGetItemConfig": "getCommentViewConfig",
						"isAsync": true
					}
				},
				{
					"operation": "insert",
					"name": "ShowMoreCommentsControlContainer",
					"parentName": "HistoryV2MessageFooterContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["show-more-comments-container"],
						"visible": {"bindTo": "getShowMoreCommentsVisible"},
						"items": []
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "ShowMoreCommentsControlContainer",
					"propertyName": "items",
					"name": "ShowMoreCommentsIcon",
					"values": {
						"getSrcMethod": "getShowMoreCommentsIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {"wrapClass": ["icon16"]}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ShowMoreCommentsLabel",
					"parentName": "ShowMoreCommentsControlContainer",
					"propertyName": "items",
					"values": {
						"id": "ShowMoreCommentsLabel",
						"labelClass": ["icon16-label"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ShowMoreCommentsLabelCaption"
						},
						"click": {"bindTo": "onLoadNextComment"}
					},
					"index": 1
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


