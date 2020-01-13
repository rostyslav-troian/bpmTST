Terrasoft.configuration.Structures["ESNFeedConfig"] = {innerHierarchyStack: ["ESNFeedConfig"]};
define("ESNFeedConfig", ["ext-base", "terrasoft", "ESNFeedModuleResources", "LinkPreview"],
	function(Ext, Terrasoft, resources) {
		var createdByConfig = {
			className: "Terrasoft.Hyperlink",
			caption: {bindTo: "getCreatedByText"},
			href: {bindTo: "getCreatedUrlContact"},
			click: {bindTo: "onCreateByClick"},
			linkMouseOver: {bindTo: "linkMouseOver"},
			target: Terrasoft.controls.HyperlinkEnums.target.SELF,
			classes: {
				hyperlinkClass: ["createdBy", "label-url"]
			},
			tag: "CreatedBy",
			markerValue: "CreatedBy"
		};
		var createdByContainerConfig = {
			className: "Terrasoft.Container",
			classes: {wrapClassName: ["messageHeader"]},
			items: [
				{
					className: "Terrasoft.ImageView",
					imageSrc: {bindTo: "getCreatedByImage"},
					classes: {wrapClass: ["image32", "createdByImage", "label-link"]},
					click: {bindTo: "onCreateByClick"}
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["createdByTo-wraper"]
					},
					items: [
						createdByConfig, {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["createdByToEntity"]
						},
						items: [{
							className: "Terrasoft.Label",
							caption: {bindTo: "getCreatedToLabel"}
						}]
					}, {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["entity-container"]
						},
						markerValue: {bindTo: "getEntityText"},
						items: [
							{
								className: "Terrasoft.Hyperlink",
								caption: {bindTo: "getEntityText"},
								href: {bindTo: "getCreatedPublishUrl"},
								click: {bindTo: "onEntityClick"},
								target: Terrasoft.controls.HyperlinkEnums.target.SELF,
								linkMouseOver: {bindTo: "linkMouseOver"},
								classes: {hyperlinkClass: ["entity", "label-url"]},
								tag: {columnName: "Entity"},
								markerValue: "Entity"
							}
						]
					}]
				}
			]
		};

		var messageConfig = {
			className: "Terrasoft.MultilineLabel",
			caption: {
				bindTo: "Message",
				bindConfig: {
					converter: function (value){
						if (Terrasoft.isCurrentUserSsp() &&
								Terrasoft.Features.getIsEnabled("UseNavigationServiceRedirect")) {
							while (value.match(/<(a)\s[^>]*data-link=\"mention\"[^>]*>/i)) {
								value = value.replace(/<(a)\s[^>]*data-link=\"mention\"[^>]*>/i, "<a>");
							}
						}
						return value;
					}
				}
			},
			classes: {
				multilineLabelClass: ["message"]
			},
			visible: {
				bindTo: "CommentVisible"
			},
			markerValue: "MessageText",
			showLinks: true
		};

		var linkPreviewConfig = {
			className: "Terrasoft.LinkPreview",
			linkPreviewInfo: {
				bindTo: "LinkPreviewData"
			},
			url: {
				bindTo: "UrlMessage"
			},
			visible: {
				bindTo: "getLinkPreviewVisible"
			},
			markerValue: "UrlMessageText"
		};

		var likeImageConfig = {
			className: "Terrasoft.Button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			imageConfig: {bindTo: "getLikeImage"},
			click: {bindTo: "onLikeClick"},
			visible: {bindTo: "LikeImageVisible"},
			classes: {
				imageClass: ["actionsButtonImage"],
				wrapperClass: ["actionsButtonWrap", "actionsColor", "likeButtonImageConfig"]
			},
			markerValue: {bindTo: "getLikeButtonMarkerValue"}
		};

		var likeTextConfig = {
			className: "Terrasoft.Button",
			visible: {bindTo: "getLikeTextVisible"},
			caption: {bindTo: "getLikeText"},
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			click: {bindTo: "onShowLikedUsers"},
			markerValue: {bindTo: "getUsersWhoLikeItMarkerValue"},
			classes: {
				textClass: ["actionsColor", "showLikedUsers"],
				wrapperClass: ["actionsButtonWrap", "actionsColor"]
			}
		};

		var likeCaptionConfig = {
			className: "Terrasoft.Button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			caption: {bindTo: "getLikeCaption"},
			click: {bindTo: "onLikeClick"},
			visible: {bindTo: "getIsLikeCaptionConfigVisible"},
			classes: {
				textClass: ["actionsColor", "likeCaption"],
				wrapperClass: ["actionsButtonWrap", "actionsColor"]
			}
		};

		var postCommentEditConfig = {
			className: "Terrasoft.Button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			imageConfig: {bindTo: "getEditImage"},
			caption: resources.localizableStrings.EditPostComment,
			visible: {bindTo: "getPostCommentEditVisible"},
			click: {bindTo: "onPostCommentEditClick"},
			classes: {
				textClass: ["actionsColor", "editCaption", "postCommentEditDelete", "postCommentEditDeleteOpacity"],
				imageClass: ["postCommentEditDeleteOpacity"]
			},
			markerValue: "EditMessage"
		};

		var postCommentDeleteConfig = {
			className: "Terrasoft.Button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			imageConfig: {bindTo: "getDeleteImage"},
			caption: resources.localizableStrings.DeletePostComment,
			visible: {bindTo: "getPostCommentDeleteVisible"},
			click: {bindTo: "onPostCommentDeleteClick"},
			classes: {
				textClass: ["actionsColor", "deleteCaption", "postCommentEditDelete", "postCommentEditDeleteOpacity"],
				imageClass: ["postCommentEditDeleteOpacity"]
			},
			markerValue: "DeleteMessage"
		};

		var commentEditConfig = {
			className: "Terrasoft.Button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			imageConfig: {bindTo: "getEditImage"},
			caption: resources.localizableStrings.EditPostComment,
			visible: {bindTo: "getPostCommentEditVisible"},
			click: {bindTo: "onPostCommentEditClick"},
			classes: {
				textClass: ["actionsColor", "editCaption", "postCommentEditDelete"]
			},
			markerValue: "EditMessage"
		};

		var commentDeleteConfig = {
			className: "Terrasoft.Button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			imageConfig: {bindTo: "getDeleteImage"},
			caption: resources.localizableStrings.DeletePostComment,
			visible: {bindTo: "getPostCommentDeleteVisible"},
			click: {bindTo: "onPostCommentDeleteClick"},
			classes: {
				textClass: ["actionsColor", "editCaption", "postCommentEditDelete"]
			},
			markerValue: "DeleteMessage"
		};

		var remainsCommentsContainerConfig = {
			className: "Terrasoft.Container",
			visible: {bindTo: "RemainsCommentsContainerVisible"},
			classes: {
				wrapClassName: ["commentRemainsWrap"]
			},
			items: [
				{
					className: "Terrasoft.Button",
					caption: {bindTo: "getRemainsCommentsText"},
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					imageConfig: {
						source: Terrasoft.ImageSources.URL,
						url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.More)
					},
					click: {bindTo: "onShowCommentsClick"},
					classes: {
						imageClass: ["actionsButtonImage"],
						textClass: ["actionsButtonText"],
						wrapperClass: ["actionsButtonWrap", "actionsColor"]
					}
				}
			]
		};

		var newCommentContainerConfig = {
			className: "Terrasoft.Container",
			visible: {bindTo: "CommentPublishContainerVisible"},
			classes: {
				wrapClassName: ["comment-publish-wrap"]
			},
			items: [
				{
					className: "Terrasoft.ESNHtmlEdit",
					keydown: {bindTo: "onKeyDown"},
					value: {bindTo: "commentMessage"},
					placeholder: resources.localizableStrings.WriteComment,
					classes: {
						htmlEditClass: ["inlineTable", "wide", "editedCommentMessage", "placeholderOpacity"]
					},
					focus: {bindTo: "onNewCommentContainerFocus"},
					blur: {bindTo: "onNewCommentContainerBlur"},
					markerValue: "commentToEditESNHtmlEdit",
					height: "47px",
					prepareList: {bindTo: "prepareEntitiesExpandableList"},
					list: {bindTo: "entitiesList"},
					listViewItemRender: {bindTo: "onEntitiesListViewItemRender"},
					autoGrow: true,
					autoGrowMinHeight: 47
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["inlineBlock", "wide", "commentPublish"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.Send,
							style: Terrasoft.controls.ButtonEnums.style.BLUE,
							click: {bindTo: "onCommentPublishClick"},
							visible: {bindTo: "NewCommentButtonsVisible"},
							classes: {
								textClass: ["floatLeft"]
							}
						},
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.Cancel,
							click: {bindTo: "onCancelClick"},
							visible: {bindTo: "NewCommentButtonsVisible"},
							classes: {
								textClass: ["floatRight"]
							}
						}
					]
				}
			]
		};

		var commentToEditContainerConfig = {
			className: "Terrasoft.Container",
			visible: {bindTo: "CommentToEditContainerVisible"},
			items: [
				{
					className: "Terrasoft.ESNHtmlEdit",
					keydown: {bindTo: "onKeyDown"},
					value: {bindTo: "commentMessage"},
					placeholder: resources.localizableStrings.WriteComment,
					classes: {
						htmlEditClass: ["inlineTable", "wide", "editedCommentMessage", "placeholderOpacity"]
					},
					focus: {bindTo: "onCommentToEditContainerFocus"},
					blur: {bindTo: "onCommentToEditContainerBlur"},
					markerValue: "commentToEditESNHtmlEdit",
					height: "47px",
					prepareList: {bindTo: "prepareEntitiesExpandableList"},
					list: {bindTo: "entitiesList"},
					listViewItemRender: {bindTo: "onEntitiesListViewItemRender"},
					autoGrow: true,
					autoGrowMinHeight: 47
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["inlineBlock", "wide", "commentPublish"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.Send,
							style: Terrasoft.controls.ButtonEnums.style.BLUE,
							click: {bindTo: "onCommentPublishClick"},
							classes: {
								textClass: ["floatLeft"]
							},
							visible: {bindTo: "CommentToEditButtonsVisible"}
						},
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.Cancel,
							click: {bindTo: "onCancelClick"},
							classes: {
								textClass: ["floatRight"]
							},
							visible: {bindTo: "CommentToEditButtonsVisible"}
						}
					]
				}
			]
		};

		/**
		 * Comment configuration.
		 */
		var commentConfig = {
			className: "Terrasoft.Container",
			id: "commentItem-container",
			selectors: {wrapEl: "#commentItem-container"},
			classes: {wrapClassName: ["commentContainer"]},
			items: [
				{
					className: "Terrasoft.ImageView",
					imageSrc: {bindTo: "getCreatedByImage"},
					classes: {
						wrapClass: ["image32", "createdByImage", "label-link"]
					},
					click: {bindTo: "onCreateByClick"}
				},
				createdByConfig,
				commentToEditContainerConfig,
				messageConfig,
				linkPreviewConfig,
				{
					className: "Terrasoft.Container",
					classes: {wrapClassName: ["comment-actions"]},
					visible: {bindTo: "ActionsContainerVisible"},
					items: [
						{
							className: "Terrasoft.Label",
							caption: {bindTo: "getCreatedOnText"},
							classes: {
								labelClass: ["createdByDate", "unimportant"]
							}
						},
						likeTextConfig,
						likeImageConfig,
						likeCaptionConfig,
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["actions-right", "actionsEditDelete"]
							},
							items: [
								commentEditConfig,
								commentDeleteConfig
							]
						}
					]
				}
			]
		};

		var publishContainer = {
			className: "Terrasoft.Container",
			visible: {bindTo: "PublishContainerVisible"},
			items: [
				{
					className: "Terrasoft.ESNHtmlEdit",
					keydown: {bindTo: "onKeyDown"},
					value: {bindTo: "editedCommentMessage"},
					placeholder: resources.localizableStrings.WriteComment,
					classes: {
						htmlEditClass: ["inlineTable", "wide", "editedCommentMessage", "placeholderOpacity"]
					},
					focus: {bindTo: "onEditedCommentContainerFocus"},
					blur: {bindTo: "onEditedCommentContainerBlur"},
					markerValue: "postToEditESNHtmlEdit",
					height: "47px",
					prepareList: {bindTo: "prepareEntitiesExpandableList"},
					list: {bindTo: "entitiesList"},
					listViewItemRender: {bindTo: "onEntitiesListViewItemRender"},
					autoGrow: true,
					autoGrowMinHeight: 47
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["inlineBlock", "wide", "commentPublish"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.Publish,
							style: Terrasoft.controls.ButtonEnums.style.GREEN,
							click: {bindTo: "onCommentPublishClick"},
							visible: {bindTo: "EditedCommentContainerVisible"},
							classes: {
								textClass: ["floatLeft"]
							},
							markerValue: "PublishMessage"
						},
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.Cancel,
							click: {bindTo: "onCancelClick"},
							visible: {bindTo: "EditedCommentContainerVisible"},
							classes: {
								textClass: ["floatRight"]
							}
						}
					]
				}
			]
		};

		/**
		 * Message configuration.
		 */
		var postConfig = {
			className: "Terrasoft.Container",
			id: "postItem-container",
			selectors: {wrapEl: "#postItem-container"},
			markerValue: {bindTo: "getMessageContainerMarkerValue"},
			classes: {
				wrapClassName: ["postContainer"]
			},
			items: [
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["parentPostContainer"]
					},
					items: [
						createdByContainerConfig,
						messageConfig,
						linkPreviewConfig,
						publishContainer,
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["actions"]
							},
							visible: {bindTo: "ActionsContainerVisible"},
							items: [
								{
									className: "Terrasoft.Label",
									caption: {bindTo: "getCreatedOnText"},
									classes: {
										labelClass: ["createdByDate", "unimportant"]
									},
									markerValue: "CreatedOn"
								},
								{
									className: "Terrasoft.Container",
									classes: {
										wrapClassName: ["comment-like-actions-actions-right"]
									},
									items: [
										{
											className: "Terrasoft.Button",
											caption: {bindTo: "getToggleCommentsText"},
											visible: {bindTo: "getToggleCommentsVisible"},
											style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
											imageConfig: {
												source: Terrasoft.ImageSources.URL,
												url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Comment)
											},
											click: {bindTo: "onToggleCommentsClick"},
											classes: {
												imageClass: ["actionsButtonImage"],
												textClass: ["actionsButtonText"],
												wrapperClass: ["actionsButtonWrap", "actionsColor"]
											},
											markerValue: {bindTo: "getToggleCommentsButtonMarkerValue"}
										},
										{
											className: "Terrasoft.Button",
											caption: {bindTo: "getShowCommentsText"},
											visible: {bindTo: "getShowCommentsVisible"},
											style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
											imageConfig: {
												source: Terrasoft.ImageSources.URL,
												url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Comment)
											},
											click: {bindTo: "onShowCommentsClick"},
											classes: {
												imageClass: ["actionsButtonImage"],
												textClass: ["actionsButtonText"],
												wrapperClass: ["actionsButtonWrap", "actionsColor"]
											},
											markerValue: "Comments"
										},
										{
											className: "Terrasoft.Button",
											caption: {bindTo: "getHideCommentsText"},
											visible: {bindTo: "getHideCommentsVisible"},
											style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
											imageConfig: {
												source: Terrasoft.ImageSources.URL,
												url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Comment)
											},
											click: {bindTo: "onHideCommentsClick"},
											classes: {
												imageClass: ["actionsButtonImage"],
												textClass: ["actionsButtonText"],
												wrapperClass: ["actionsButtonWrap", "actionsColor"]
											},
											markerValue: "Hide comments"
										},
										likeTextConfig,
										likeImageConfig,
										likeCaptionConfig,
										{
											className: "Terrasoft.Container",
											classes: {
												wrapClassName: ["actions-right"]
											},
											items: [
												postCommentEditConfig,
												postCommentDeleteConfig
											]
										}
								]}
							]
						}
					]
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["commentsContainer"]
					},
					visible: {bindTo: "CommentsExpanded"},
					items: [
						remainsCommentsContainerConfig,
						{
							className: "Terrasoft.ContainerList",
							idProperty: "Id",
							collection: {bindTo: "LoadedComments"},
							defaultItemConfig: commentConfig,
							observableRowNumber: 5
						},
						newCommentContainerConfig
					]
				}
			]
		};

		return {
			postConfig: postConfig,
			commentConfig: commentConfig
		};
	});


