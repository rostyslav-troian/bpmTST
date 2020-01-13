Terrasoft.configuration.Structures["CaseRatingFeedbackPage"] = {innerHierarchyStack: ["CaseRatingFeedbackPage"], structureParent: "BaseEntityPage"};
define('CaseRatingFeedbackPageStructure', ['CaseRatingFeedbackPageResources'], function(resources) {return {schemaUId:'47c5526d-bf30-4599-8622-9313f9cb3e5b',schemaCaption: "CaseRatingFeedbackPage", parentSchemaName: "BaseEntityPage", schemaName:'CaseRatingFeedbackPage',parentSchemaUId:'81c2ebad-7f20-4e71-b0c6-941b1422ba62',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseRatingFeedbackPage", ["ImageView", "ESNHtmlEditModule",
		"CaseRatingFeedbackPageResources", "css!CaseRatingFeedbackPage"],
	function() {
		return {
			profileKey: null,
			attributes: {
				"Comment": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				"Token": {
					"dataValueType": this.Terrasoft.DataValueType.GUID,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				"EnableQuestionToRequestor": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			diff:/**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "MainContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["main-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "LogoContainer",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["logo-container container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ContentContainer",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["content-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ThanksMessageContainer",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["thanks-message-container container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FeedbackContainer",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["feedback-container container"]
						},
						"visible": {
							"bindTo": "EnableQuestionToRequestor"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "LogoImageContainer",
					"parentName": "LogoContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["logo-image-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Logo",
					"parentName": "LogoImageContainer",
					"propertyName": "items",
					"values": {
						"id": "logoImage",
						"itemType": this.Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.ImageView",
						"imageSrc": {
							"bindTo": "getLogoUrl"
						},
						"classes": {
							"wrapClass": ["logo"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ThanksMessageContainer",
					"propertyName": "items",
					"name": "ThanksLabel",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.ThanksMessage"
						},
						"labelConfig": {
							"classes": ["thanks"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CommentTextEdit",
					"parentName": "FeedbackContainer",
					"propertyName": "items",
					"values": {
						"className": "Terrasoft.MemoEdit",
						"itemType": this.Terrasoft.ViewItemType.MODEL_ITEM,
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"contentType": this.Terrasoft.ContentType.LONG_TEXT,
						"labelConfig": {
							"visible": false
						},
						"value": {
							"bindTo": "Comment"
						},
						"placeholder": {
							"bindTo": "Resources.Strings.AddCommentHint"
						},
						"markerValue": "comment-text-edit",
						"height": "102px"
					}
				},
				{
					"operation": "insert",
					"parentName": "FeedbackContainer",
					"propertyName": "items",
					"name": "PostButton",
					"values": {
						"click": {
							"bindTo": "postComment"
						},
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"classes": {
							"textClass": "post-button"
						},
						"caption": {
							"bindTo": "Resources.Strings.PostButtonCaption"
						}
					}
				},
				{
					"operation": "insert",
					"name": "Background",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"values": {
						"id": "background",
						"itemType": this.Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.ImageView",
						"imageSrc": {
							"bindTo": "getBackgroundUrl"
						},
						"classes": {
							"wrapClass": ["background"]
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {

				/**
				 * @inheritDoc BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					var feedbackConfig = this.Terrasoft.feedbackConfig;
					if (feedbackConfig) {
						this.set("Token", feedbackConfig.token);
						this.Terrasoft.feedbackConfig = null;
					}
					this.Terrasoft.chain(this.setInitialValues, this);
				},

				initializeProfile: function(callback, scope) {
					this.Ext.callback(callback, scope);
				},

				/**
				 * Sets initial values.
				 * @protected
				 * @virtual
				 */
				setInitialValues: function() {
					this.Terrasoft.SysSettings.querySysSettingsItem("EnableQuestionToRequestor",
						function(value) {
							this.set("EnableQuestionToRequestor", value);
						}, this);
				},

				/**
				 * Returns logo image URL.
				 * @private
				 * @return {String} Logo URL.
				 */
				getLogoUrl: function() {
					var config = {
						source: this.Terrasoft.ImageSources.SYS_SETTING,
						params: {
							r: "LogoImage"
						}
					};
					var url = this.Terrasoft.ImageUrlBuilder.getUrl(config);
					return url;
				},

				/**
				 * Removes feedback container from DOM.
				 * @private
				 */
				removeFeedback: function() {
					this.Ext.getCmp("CaseRatingFeedbackPageFeedbackContainerContainer").destroy();
				},

				/**
				 * Returns background image URL from resources.
				 * @protected
				 * @return {String} Background image URL.
				 */
				getBackgroundUrl: function() {
					var imageResource = this.get("Resources.Images.Background");
					var url = this.Terrasoft.ImageUrlBuilder.getUrl(imageResource);
					return url;
				},

				/**
				 * Prepares config for service call.
				 * @protected
				 * @param {String} comment Comment text.
				 * @return {Object} Service call config.
				 */
				getServiceConfig: function(comment) {
					var sendData = {
						token: this.get("Token"),
						comment: comment
					};
					var config = {
						serviceName: "CaseRatingManagementService",
						methodName: "AddComment",
						data: sendData
					};
					return config;
				},

				/**
				 * Logs out.
				 * @protected
				 */
				logout: function() {
					if (Terrasoft.feedbackConfig.doLogout === "true") {
						var config = {
							serviceName: "UserManagementService",
							methodName: "Logout"
						};
						this.callService(config, function () {
							window.logout = true;
						}, this);
					}
				},

				/**
				 * Post a comment via service.
				 * @protected
				 */
				postComment: function() {
					var comment = this.get("Comment");
					if (!comment || !comment.length) {
						var message = this.get("Resources.Strings.CommentIsEmpty");
						this.showConfirmationDialog(message, this.Terrasoft.emptyFn,
							[this.Terrasoft.MessageBoxButtons.OK]);
						return;
					}
					this.showBodyMask();
					var config = this.getServiceConfig(comment);
					this.callService(config, this.onCommentPost);
				},

				/**
				 * Post a comment callback function.
				 * Hides body mask and shows fail message upon it happens.
				 * @protected
				 * @virtual
				 * @param {Object} response Service response object.
				 */
				onCommentPost: function(response) {
					this.hideBodyMask();
					var result = response.AddCommentResult;
					if (result.success) {
						this.removeFeedback();
						this.logout();
					} else {
						var message = this.get("Resources.Strings.PostCommentFailed");
						this.showInformationDialog(message, this.Terrasoft.emptyFn);
					}
				}
			}
		};
	});


