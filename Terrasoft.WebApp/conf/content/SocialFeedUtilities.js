Terrasoft.configuration.Structures["SocialFeedUtilities"] = {innerHierarchyStack: ["SocialFeedUtilities"]};
define("SocialFeedUtilities", [
	"ESNFeedModuleResources", "FormatUtils", "ESNConstants",
	"NetworkUtilities", "ModalBox", "ServiceHelper", "RightUtilities", "MaskHelper", "css!SocialFeedUtilities"
], function(resources, FormatUtils, ESNConstants, NetworkUtilities, ModalBox, ServiceHelper, RightUtilities) {
	/**
	 * The number of uploaded comments.
	 * @private
	 */
	const initCommentCount = 3;
	let renderContainer;
	const entityColorSchema = {
		// ##########
		"25d7c1ab-1de0-4501-b402-02e0e5a72d6e": "#91C95E",
		// ##########
		"c449d832-a4cc-4b01-b9d5-8a12c42a9f89": "#8E8EB7",
		// ####### #######
		"2f81fa05-11ae-400d-8e07-5ef6a620d1ad": "#F49D56",
		// #######
		"16be3651-8fe2-4159-8dd0-a803d4683dd3": "#91C95E",
		// ########
		"8b33b6b2-19f7-4222-9161-b4054b3fbb09": "#EEAF4B",
		// ####
		"bfb313dd-bb55-4e1b-8e42-3d346e0da7c5": "#EEAF4B",
		// ###### #### ######
		"0326868c-ce5e-4934-8f1f-178801bfe6c3": "#64B8DF",
		// ###
		"41af89e9-750b-4ebb-8cac-ff39b64841ec": "#91C95E",
		// #######
		"ae46fb87-c02c-4ae8-ad31-a923cdd994cf": "#8E8EB7",
		// #####
		"80294582-06b5-4faa-a85f-3323e5536b71": "#EEAF4B",
		// #######
		"4c7a6ead-4eb8-4fc0-863e-98a664569fed": "#8E8EB7",
		// ###### #########
		"ac2d8e0f-a926-4f76-a1fa-604d5eaaa1d2": "#8E8EB7",
		// ########## ######### (#############)
		"e6e68ac1-495d-4727-a7a7-9b531ab9f849": "#5BC8C4"
	};
	const entityDefaultColorSchema = "#64B8DF";

	const ESNSectionSandboxId = "SectionModuleV2_ESNFeedSectionV2_ESNFeed";
	const ESNSandboxId = "ViewModule_SectionModuleV2_ESNFeed";
	const ESNRightPanelSandboxId = "ViewModule_RightSideBarModule_ESNFeedModule";

	let currentEditingComment = null;
	const useEsnRightFeatureName = "UseEsnRights";

	/**
	 * @class Terrasoft.configuration.SocialFeedUtilities
	 */
	Ext.define("Terrasoft.configuration.mixins.SocialFeedUtilities", {
		alternateClassName: "Terrasoft.SocialFeedUtilities",

		isUseEsnRightEnabled: false,

		sortedByCreatedOn: 0,

		sortedByLastActionOn: 1,

		esnServiceName: "EsnService",

		/**
		 * ### ### ######## ### ######### entities.
		 * @type {Array}
		 */
		EntitiesCache: [],
		/**
		 * @inheritdoc
		 * @overridden
		 */
		init: function() {
			this.set("SchemasCollection", this.Ext.create("Terrasoft.Collection"));
			this.set("SocialMessageColumnNames", [
				"Id", "CreatedBy", "CreatedOn", "Message", "EntitySchemaUId",
				"EntityId", "Parent", "LikeCount", "CommentCount"
			]);
			this.isUseEsnRightEnabled = this.Terrasoft.Features.getIsEnabled(useEsnRightFeatureName);
			if (this.isUseEsnRightEnabled) {
				this._setLocalRightsAttributes({
					"CanDelete": true,
					"CanAdd": true,
					"CanEdit": true
				});
				return;
			}
			RightUtilities.getSchemaOperationRightLevel("SocialMessage", function(rightLevel) {
				this._setLocalRightsAttributes({
					"CanDelete": RightUtilities.canDeleteSchemaData(rightLevel),
					"CanAdd": RightUtilities.canAppendSchemaData(rightLevel),
					"CanEdit": RightUtilities.canEditSchemaData(rightLevel)
				});
			}, this);
		},

		/**
		 * Initializes SocialMessage viewModel instance.
		 * @param {Object} config SocialMessage viewModel config.
		 * @param {Object} config.rawData Columns values.
		 * @param {Object} config.rowConfig Columns types.
		 * @param {Object} config.viewModel View model.
		 */
		createSocialMessage: function(config) {
			const socialMessageConfig = {
				rowConfig: config.rowConfig,
				values: config.rawData,
				Ext: this.Ext,
				Terrasoft: this.Terrasoft,
				sandbox: this.sandbox
			};
			const viewModelName = this.getSocialMessageViewModelName();
			config.viewModel = this.Ext.create(viewModelName, socialMessageConfig);
		},

		/**
		 * Initializes SocialMessage viewModel instance.
		 * @private
		 * @param {Object} response EsnService.
		 * @param {Object} config.EsnMessages messages Dto.
		 */
		_createSocialMessageFromServiceResponse: function(response) {
			var messages = response.EsnMessages;
			const viewModelName = this.getSocialMessageViewModelName();
			const socialMessageConfig = {
				Ext: this.Ext,
				Terrasoft: this.Terrasoft,
				sandbox: this.sandbox
			};
			const viewModels = Ext.create("Terrasoft.BaseViewModelCollection");
			Terrasoft.each(messages, function (message) {
				const viewModel = Ext.create(viewModelName, socialMessageConfig);
				for (var propertyName in message) {
					if (message.hasOwnProperty(propertyName)) {
						const value = this._getValueFromDto(message, propertyName);
						if (!Ext.isEmpty(value)) {
							viewModel.set(propertyName, value);
						}
					}
				}
				viewModels.addIfNotExists(message.Id, viewModel);
			}, this);
			return viewModels;
		},

		/**
		 * @param config
		 * @private
		 */
		_setLocalRightsAttributes: function(config) {
			this.set("CanDelete", config.CanDelete);
			this.set("CanAdd", config.CanAdd);
			this.set("CanEdit", config.CanEdit);
		},

		/**
		 * Returns value from message Dto.
		 * @private
		 */
		_getValueFromDto: function(dto, propertyName) {
			return (propertyName === "CreatedOn" || propertyName === "LastActionOn")
				? new Date(dto[propertyName])
				: dto[propertyName];
		},

		/**
		 * Gets primary image value.
		 * @param {Terrasoft.BaseViewModel} entity Entity.
		 * @param {String} entitySchemaName Entity schema name.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution scope.
		 */
		getPrimaryImageValue: function(entity, entitySchemaName, callback, scope) {
			const moduleStructure = this.Terrasoft.configuration.ModuleStructure[entitySchemaName];
			if (moduleStructure && moduleStructure.logoId) {
				entity.primaryImageValue = {
					value: moduleStructure.logoId,
					displayValue: "",
					primaryImageValue: ""
				};
			}
			callback.call(scope, entity);
		},

		/**
		 * Loads entity by its name and identifier.
		 * @param {String} entitySchemaName Entity schema name.
		 * @param {String} entityId Entity identifier.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution scope.
		 */
		loadAnyEntity: function(entitySchemaName, entityId, callback, scope) {
			if (!entitySchemaName) {
				return;
			}
			const entitiesCache = this.EntitiesCache;
			if (entitiesCache[entityId]) {
				callback.call(scope, entitiesCache[entityId]);
				return;
			}
			const esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {
				rootSchemaName: entitySchemaName
			});
			const moduleStructure = this.Terrasoft.configuration.ModuleStructure[entitySchemaName];
			if (moduleStructure && moduleStructure.attribute) {
				esq.addColumn(moduleStructure.attribute, "type");
			}
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
			const entitySchemaUId = this.get("EntitySchemaUId");
			let hasPrimaryImageColumn = true;
			if (!ESNConstants.ESN.SchemasWithPrimaryImageColumnCollection.hasOwnProperty(entitySchemaUId)) {
				hasPrimaryImageColumn = false;
			} else {
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_IMAGE_COLUMN, "primaryImageValue");
			}
			esq.getEntity(entityId, function(result) {
				if (!result.success || this.Ext.isEmpty(result.entity)) {
					return;
				}
				const resultEntity = result.entity;
				const entity = {
					value: resultEntity.get("value"),
					displayValue: resultEntity.get("displayValue"),
					type: resultEntity.get("type")
				};
				if (!hasPrimaryImageColumn) {
					this.getPrimaryImageValue(entity, entitySchemaName, function(entityItem) {
						if (!entitiesCache[entityId]) {
							entitiesCache[entityId] = entityItem;
						}
						callback.call(scope, entityItem);
					}, this);
				} else {
					entity.primaryImageValue = resultEntity.get("primaryImageValue");
					if (!entitiesCache[entityId]) {
						entitiesCache[entityId] = entity;
					}
					callback.call(scope, entity);
				}
			}, this);
		},

		/**
		 * Returns localizable string from resources.
		 * @protected
		 * @param {String} key Key of resource string.
		 * @return {String} Localizable resource string or empty string.
		 */
		getLocalizableStringValue: function(key) {
			return resources.localizableStrings[key] || "";
		},

		/**
		 * Returns image url.
		 * @private
		 * @param {String} imageId Image unique identifier
		 * @return {String}
		 */
		getImageSrc: function(imageId) {
			if (!imageId) {
				return null;
			}
			return this.Terrasoft.ImageUrlBuilder.getUrl({
				source: Terrasoft.ImageSources.ENTITY_COLUMN,
				params: {
					schemaName: "SysImage",
					columnName: "Data",
					primaryColumnValue: imageId
				}
			});
		},

		/**
		 * Returns entity display value.
		 * @private
		 * @param {Object} entity Entity.
		 * @return {String}
		 */
		getDisplayValue: function(entity) {
			return entity ? entity.displayValue : null;
		},

		/**
		 * Returns entity image source.
		 * @private
		 * @return {String}
		 */
		getImageValue: function(entity) {
			let imageValue = null;
			if (entity) {
				const image = entity.primaryImageValue || entity.Image;
				if (this.Ext.isObject(image) || this.Terrasoft.isGUID(image)) {
					imageValue = image.value || image;
				} else {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultCreatedBy"));
				}
			}
			return this.getImageSrc(imageValue);
		},

		/**
		 * Returns author name.
		 * @private
		 * @return {String}
		 */
		getCreatedByText: function() {
			return this.getDisplayValue(this.get("CreatedBy"));
		},

		/**
		 * Returns author image.
		 * @private
		 * @return {String}
		 */
		getCreatedByImage: function() {
			return this.getImageValue(this.get("CreatedBy"));
		},

		/**
		 * Returns author image visibility.
		 * @private
		 * @return {Boolean}
		 */
		getCreatedByImageVisible: function() {
			return (this.getCreatedByImage() !== null);
		},

		/**
		 * @deprecated Moved to Terrasoft.SocialMessageViewModel#onCreateByClick
		 */
		onCreateByClick: function(e) {
			const mouseButton = Terrasoft.getMouseButton(e);
			if (mouseButton === Terrasoft.MouseButton.LEFT) {
				Terrasoft.MaskHelper.ShowBodyMask();
				this.onUrlClick("Contact", this.get("CreatedBy"));
				return false;
			}
		},

		/**
		 * @deprecated Moved to Terrasoft.SocialMessageViewModel#getCreatedUrlContact
		 */
		getCreatedUrlContact: function() {
			const hash = NetworkUtilities.getEntityUrl("Contact", this.get("CreatedBy").value);
			return this.getLocalizableStringValue("ViewModuleUrl") + hash;
		},

		/**
		 * @deprecated Moved to Terrasoft.SocialMessageViewModel#getCreatedPublishUrl
		 */
		getCreatedPublishUrl: function() {
			const entity = this.get("Entity");
			if (entity) {
				const typeId = entity.type ? entity.type.value : null;
				const hash = NetworkUtilities.getEntityUrl(entity.name, entity.value, typeId);
				return this.getLocalizableStringValue("ViewModuleUrl") + hash;
			}
		},

		/**
		 * Returns format created on date.
		 * @private
		 * @return {Date}
		 */
		getCreatedOnText: function() {
			return FormatUtils.smartFormatDate({
				dateValue: this.get("CreatedOn"),
				hasTimezoneOffset: true
			});
		},

		/**
		 * Returns entity display value, which connected with message(chanel, contract, ...).
		 * @private
		 * @return {String}
		 */
		getEntityText: function() {
			return this.getDisplayValue(this.get("Entity"));
		},

		getCreatedToLabel: function() {
			const resultTemplate = "{0} {1}";
			const createdByToEntity = this.getLocalizableStringValue("CreatedByToEntity");
			const createdBy = this.getLocalizableStringValue("CreatedBy");
			const entity = this.get("Entity");
			const entityCaption = entity ? entity.caption : "";
			return this.Ext.isEmpty(entityCaption)
				? createdBy
				: this.Ext.String.format(resultTemplate, createdByToEntity, entityCaption.toLowerCase());
		},

		/**
		 * Returns entity or default image.
		 * @private
		 * @return {String}
		 */
		getEntityImage: function() {
			const entity = this.get("Entity");
			let imageValue = null;
			const image = entity ? entity.primaryImageValue || entity.Image : null;
			if (this.Ext.isObject(image) || Terrasoft.isGUID(image)) {
				imageValue = image.value || image;
			}
			return imageValue ? this.getImageValue(entity)
				: this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.NoChannel);
		},

		/**
		 * @obsolete
		 */
		getEntityContainerVisible: function() {
			if (this.sandbox.id === ESNSectionSandboxId || this.sandbox.id === ESNRightPanelSandboxId ||
				this.sandbox.id === ESNSandboxId) {
				return true;
			}
			return false;
		},

		/**
		 * @obsolete
		 */
		getCreatedToLabelVisible: function() {
			if (this.sandbox.id === ESNSectionSandboxId || this.sandbox.id === ESNSandboxId) {
				return true;
			}
			return false;
		},

		/**
		 * @obsolete
		 */
		getCreatedToLabelHidden: function() {
			return !this.getCreatedToLabelVisible();
		},

		/**
		 * @obsolete
		 */
		getEntityImageVisible: function() {
			return (this.getEntityImage() !== null);
		},

		/**
		 * @obsolete
		 */
		getEntityTextVisible: function() {
			return !this.getIsRightPanel();
		},

		getRightPanelPublishButtonVisible: function() {
			return this.getIsRightPanel();
		},

		/**
		 * Returns if like caption is visible.
		 * @return {Boolean}
		 */
		getIsLikeCaptionConfigVisible: function() {
			return !this.getIsRightPanel();
		},

		/**
		 * Returns if module is loaded to right panel.
		 * @return {Boolean}
		 */
		getIsRightPanel: function() {
			return (this.sandbox.id === ESNRightPanelSandboxId);
		},

		/**
		 * @deprecated Moved to Terrasoft.SocialMessageViewModel#onEntityClick
		 */
		onEntityClick: function(e) {
			const mouseButton = Terrasoft.getMouseButton(e);
			if (mouseButton === Terrasoft.MouseButton.LEFT) {
				Terrasoft.MaskHelper.ShowBodyMask();
				const entity = this.get("Entity");
				if (entity) {
					const typeId = entity.type ? entity.type.value : null;
					this.onUrlClick(entity.name, this.get("Entity"), typeId);
				}
				return false;
			}
		},

		/**
		 * ############ ############# ##### # ################# ###### # ########## ## ### ######## ################.
		 * #### #### ##### ###### ### ## ####### ############# ##### - ############ #### ######### # customColor.
		 * #### customColor ## #######, ## ############ #### ## #########.
		 * @param {String} entitySchemaUId ############# #####
		 * @param {String} customColor ######## #### #####
		 * @returns {String}
		 */
		getEntityColor: function(entitySchemaUId, customColor) {
			const color = customColor || entityDefaultColorSchema;
			if (this.Ext.isEmpty(entitySchemaUId)) {
				return color;
			}
			if (entityColorSchema.hasOwnProperty(entitySchemaUId)) {
				return entityColorSchema[entitySchemaUId];
			} else {
				return color;
			}
		},

		getMessage: function() {
			return this.get("Message");
		},

		/**
		 * ########## ######## ########## DOM-######## data-item-marker ########## #########.
		 * @return {String}
		 */
		getMessageContainerMarkerValue: function() {
			const markerValue = [];
			const createdBy = this.get("CreatedBy");
			if (createdBy) {
				markerValue.push(createdBy.displayValue);
			}
			const entity = this.get("Entity");
			if (entity) {
				markerValue.push(entity.displayValue);
			}
			return markerValue.join(" ");
		},

		/**
		 * ########## ########## ############, ####### ######## ### ##########.
		 * @return {Number} ########## ############.
		 */
		getRemainsCommentCount: function() {
			const commentCount = this.get("CommentCount");
			const loadedCommentCount = this.get("LoadedCommentCount");
			return commentCount - loadedCommentCount;
		},

		/**
		 * ########## ####### ########### ########## ############.
		 * @return {Boolean} ########### ########## ############.
		 */
		hasRemainsComments: function() {
			return this.getRemainsCommentCount() > 0;
		},

		/**
		 * ####### ########## ##### ###### ####### ############.
		 * @private
		 */
		getHideCommentsText: function() {
			const isRightPanel = this.getIsRightPanel();
			return isRightPanel ? this.getLocalizableStringValue("HideCommentsShort")
				: this.getLocalizableStringValue("HideComments");
		},

		/**
		 * ####### ########## ##### ###### ######## ############.
		 * @private
		 */
		getShowCommentsText: function() {
			const isRightPanel = this.getIsRightPanel();
			const commentsExpanded = this.get("CommentsExpanded");
			const commentCount = this.get("CommentCount");
			let text = "";
			if (commentsExpanded) {
				const format = isRightPanel ? this.getLocalizableStringValue("ShowCommentsShort")
					: this.getLocalizableStringValue("ShowComments");
				text = Ext.String.format(format, this.getRemainsCommentCount());
			} else if (commentCount > 0) {
				text = Ext.String.format("{0} ({1})", this.getLocalizableStringValue("Comments"), commentCount);
			} else {
				text = this.getLocalizableStringValue("Comments");
			}
			return text;
		},

		/**
		 * ########## ##### ###### ######/####### ############.
		 * @private
		 * @return {string}
		 */
		getToggleCommentsText: function() {
			const commentCount = this.get("CommentCount");
			return (commentCount === 0) ? "" : commentCount;
		},

		/**
		 * ########## ##### ###### ########## ############.
		 * @private
		 * @return {String} ##### ###### ########## ############.
		 */
		getRemainsCommentsText: function() {
			return Ext.String.format(this.getLocalizableStringValue("ShowComments"), this.getRemainsCommentCount());
		},

		/**
		 * ####### ########## ######### ###### ######## ############.
		 * @private
		 * @return {Boolean}
		 */
		getShowCommentsVisible: function() {
			return !this.getIsRightPanel() &&
				(!this.get("CommentsExpanded") || this.hasRemainsComments());
		},

		/**
		 * ####### ########## ######### ###### ####### ############.
		 * @private
		 * @return {Boolean}
		 */
		getHideCommentsVisible: function() {
			return !this.getIsRightPanel() && this.get("CommentsExpanded");
		},

		/**
		 * ####### ########## ######### ###### ######/####### ############.
		 * @private
		 * @return {Boolean}
		 */
		getToggleCommentsVisible: function() {
			return this.getIsRightPanel();
		},

		/**
		 * ####### ########## ######### ###### ########## ############.
		 * @private
		 * @return {Boolean} ######### ###### ########## ############.
		 */
		getRemainsCommentsContainerVisible: function() {
			return this.getIsRightPanel() &&
				(!this.get("CommentsExpanded") || this.hasRemainsComments());
		},

		/**
		 * Handle response and create message viewModel.
		 * @param {Object} EsnService response.
		 * @param {Object} config Request configuration.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 * @private
		 */
		_onMessageLoad: function(response, config, callback, scope) {
			var messages = this._createSocialMessageFromServiceResponse(response);
			if (messages.getCount() === 1) {
				var message = messages.collection.items[0];
				message.init();
				message.doRemoveFn = config.onDeleteRecordCallback;
				message.set("canDeleteAllMessageComment", config.canDeleteAllMessageComment);
				callback.call(scope, message);
			}
		},

		/**
		 * Handle response and create message viewModels.
		 * @param {Object} EsnService response.
		 * @param {Object} config Request configuration.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 * @private
		 */
		_onMessagesLoad: function(response, config, callback, scope) {
			var messages = this._createSocialMessageFromServiceResponse(response);
			if (messages.getCount() > 0) {
				this._setSortColumnLastValue(messages, config.sortColumnName);
				this.loadMessageLikesForUser(messages, config);
				this._setCanDeleteAllMessageComment(messages, config);
			}
			Ext.callback(callback, scope, [messages]);
		},

		/**
		 * ########## ###### ############.
		 * @private
		 */
		processCommentsClick: function(config) {
			const oldCommentsExpanded = this.get("CommentsExpanded");
			const loadedComments = this.get("LoadedComments");
			const comments = this.get("Comments");
			let commentCount = comments.getCount();
			const loadCallback = function() {
				loadedComments.clear();
				let startIndex = oldCommentsExpanded ? 0 : commentCount - initCommentCount;
				if (startIndex < 0) {
					startIndex = 0;
				}
				for (let i = startIndex; i < commentCount; i++) {
					const item = comments.getByIndex(i);
					loadedComments.add(item.get("Id"), item);
					item.set("viewModel", this);
					if (i === commentCount - 1) {
						item.set("isLast", true);
					} else {
						item.set("isLast", false);
					}
				}
				this.set("LoadedCommentCount", loadedComments.getCount());
				this.set("CommentsExpanded", true);
				this.set("CommentPublishContainerVisible", true);
				this.set("RemainsCommentsContainerVisible", this.getRemainsCommentsContainerVisible());
			};
			const loadMessages = this.isUseEsnRightEnabled
				? this.loadComments
				: this.loadSocialMessages;
			if (commentCount === 0) {
				loadMessages.call(this, config, function(items) {
					comments.loadAll(items);
					commentCount = comments.getCount();
					this.set("CommentCount", commentCount);
					loadCallback.call(this);
				}, this);
			} else {
				loadCallback.call(this);
			}
		},

		/**
		 * ########## ####### ###### ###### ############.
		 * @public
		 */
		onShowCommentsClick: function() {
			const config = this.getCommentConfig();
			this.processCommentsClick(config);
		},

		/**
		 * ########## ####### ###### ###### ############ ## #######.
		 * @private
		 */
		onShowPortalCommentsClick: function() {
			const config = this.getCommentConfig();
			config.extendedColumns = [
				{
					columnName: "[Case:Id:EntityId].Status.IsFinal",
					columnAlias: "IsCaseFinalStatus"
				},
				{
					columnName: "Parent.[Case:Id:EntityId].Status.IsFinal",
					columnAlias: "IsParentMessageCaseFinalStatus"
				},
				{
					columnName: "Parent.EntitySchemaUId",
					columnAlias: "ParentEntitySchemaUId"
				}
			];
			this.processCommentsClick(config);
		},

		/**
		 * ########## ###### ### ######### ###### ############.
		 * @private
		 */
		getCommentConfig: function() {
			const viewModel = this;
			return {
				sortColumnName: "CreatedOn",
				parentId: this.get("Id"),
				schemaUId: this.get("EntitySchemaUId"),
				entityId: this.get("EntityId"),
				sortDirection: Terrasoft.OrderDirection.ASC,
				sandbox: this.sandbox,
				canDeleteAllMessageComment: this.get("canDeleteAllMessageComment"),
				onDeleteRecordCallback: function() {
					const comments = viewModel.get("Comments");
					const loadedComments = viewModel.get("LoadedComments");
					let loadedCommentsCount = loadedComments.getCount();
					const commentToDeleteId = this.get("Id");
					loadedComments.removeByKey(commentToDeleteId);
					comments.removeByKey(commentToDeleteId);
					loadedCommentsCount --;
					viewModel.set("CommentCount", loadedCommentsCount);
					viewModel.set("LoadedCommentCount", loadedCommentsCount);
					if (loadedCommentsCount - 1 >= 0) {
						loadedCommentsCount --;
						loadedComments.getItems()[loadedCommentsCount].set("isLast", true);
					}
				}
			};
		},

		/**
		 * ########## ####### ###### ####### ############.
		 * @private
		 */
		onHideCommentsClick: function() {
			this.set("CommentsExpanded", false);
			this.get("LoadedComments").clear();
			this.set("LoadedCommentCount", 0);
			this.set("NewCommentButtonsVisible", false);
		},

		/**
		 * ########## ####### ###### ######/####### ############.
		 * @private
		 */
		onToggleCommentsClick: function() {
			const commentsExpanded = this.get("CommentsExpanded");
			if (commentsExpanded) {
				this.onHideCommentsClick();
			} else {
				this.onShowCommentsClick();
			}
		},

		/**
		 * ########## ####### ###### ######/####### ############.
		 * @private
		 */
		onTogglePortalCommentsClick: function() {
			const commentsExpanded = this.get("CommentsExpanded");
			if (commentsExpanded) {
				this.onHideCommentsClick();
			} else {
				this.onShowPortalCommentsClick();
			}
		},

		/**
		 * ########## ######### ###### ############## #########/###########.
		 * @private
		 */
		getPostCommentEditVisible: function() {
			return this.getPostCommentEditDeleteVisible();
		},

		/**
		 * ########## ######### ###### ############## #########/########### ## #######.
		 * @private
		 */
		getPortalPostCommentEditVisible: function() {
			let result = true;
			let entitySchemaUId = this.values.EntitySchemaUId;
			let isCaseFinalStatus = this.values.IsCaseFinalStatus;
			if (this.Ext.isEmpty(entitySchemaUId)) {
				isCaseFinalStatus = this.values.IsParentMessageCaseFinalStatus;
				entitySchemaUId = this.values.ParentEntitySchemaUId;
			}
			if (entitySchemaUId === ESNConstants.SysSchema.CaseUId) {
				result = !isCaseFinalStatus && this.getPostCommentEditDeleteVisible() &&
					Terrasoft.isCurrentUserSsp();
			} else {
				result = this.getPostCommentEditDeleteVisible();
			}
			return result;
		},

		getPostCommentEditDeleteVisible: function() {
			let visible = false;
			if (this.get("EditCommentVisible")) {
				return visible;
			}
			if (this.get("CreatedBy").value === Terrasoft.SysValue.CURRENT_USER_CONTACT.value) {
				visible = true;
			}
			return visible;
		},

		/**
		 * ####### ########## ######### ###### ######## #########/########### ## #######.
		 * @private
		 */
		getPortalPostCommentDeleteVisible: function() {
			let result = this.getPortalPostCommentEditVisible();
			if (!result) {
				result = this.get("canDeleteAllMessageComment");
			}
			return result;
		},

		/**
		 * ####### ########## ######### ###### ######## #########/###########.
		 * @private
		 */
		getPostCommentDeleteVisible: function() {
			const result = this.getPostCommentEditDeleteVisible();
			if (!result) {
				return this.get("canDeleteAllMessageComment");
			}
			return result;
		},

		/**
		 * Prepares view model state for editing post or comment.
		 * @private
		 */
		_prepareEditComment: function() {
			const viewModel = this.get("viewModel") || this;
			currentEditingComment = this;
			const message = this.get("Message") || "";
			this.set("CommentVisible", false);
			this.set("ActionsContainerVisible", false);
			this.set("CommentToEditContainerVisible", true);
			if (this.get("Parent")) {
				this.set("commentMessage", message);
				this.set("isCommentInEditMode", true);
			} else {
				viewModel.set("isCommentInEditMode", true);
				viewModel.set("editedCommentMessage", message);
				viewModel.set("PublishContainerVisible", true);
			}
			viewModel.set("CommentPublishContainerVisible", false);
			viewModel.set("commentScope", this);
		},

		/**
		 * Handle for edit post or comment button click.
		 */
		onPostCommentEditClick: function() {
			this.checkSocialMessageRights("CanEdit")
				.then(this._prepareEditComment.bind(this))
				.catch(this._showErrorInfo.bind(this));
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#showConfirmationDialog
		 * @private
		 * @param {String} dialogText Message to show for confirmation.
		 * @return {Promise} Promised result.
		 */
		_showConfirmationDialog: function(dialogText) {
			return new Promise(function(resolve) {
				this.showConfirmationDialog(dialogText, function(dialogResult) {
						if (dialogResult === Terrasoft.MessageBoxButtons.YES.returnCode) {
							resolve();
						}
					},
					[
						Terrasoft.MessageBoxButtons.YES.returnCode,
						Terrasoft.MessageBoxButtons.NO.returnCode
					]);
			}.bind(this));
		},

		/**
		 * Handler of the delete message button.
		 */
		onPostCommentDeleteClick: function() {
			const dialogText = this.getLocalizableStringValue("DeleteConfirmationMessage");
			this._showConfirmationDialog(dialogText)
				.then(this.checkSocialMessageRights.bind(this, "CanDelete"))
				.then(this.callDeletePostService.bind(this))
				.catch(this._showErrorInfo.bind(this));
		},

		/**
		 * Shows information dialog with provided error info.
		 * @private
		 * @param {String} msg Error text.
		 */
		_showErrorInfo: function(msg) {
			return Promise.resolve(Terrasoft.showErrorMessage(msg));
		},

		/**
		 * @returns {boolean}
		 * @private
		 */
		_getIsComment: function() {
			return Boolean(this.get("Parent") && this.get("Parent").value);
		},

		/**
		 * Calls delete post or comment api method for current post/comment.
		 * @protected
		 */
		callDeletePostService: function() {
			if (this.isUseEsnRightEnabled) {
				const post = this.get("viewModel");
				const isComment = this._getIsComment();
				const deleteConfigService = {
					entitySchemaId: isComment ? post.$EntitySchemaUId : this.$EntitySchemaUId,
					entityId: isComment ? post.$EntityId : this.$EntityId,
					id: this.$Id
				};
				const deleteMethod = isComment ? this.deleteSocialComment: this.deleteSocialMessage;
				return Promise.resolve(deleteMethod.call(this, deleteConfigService, function () {
						this.doRemoveFn();
					}, this
				));
			}

			return Promise.resolve(ServiceHelper.callService("ESNFeedModuleService", "DeletePostComment", function () {
				this.doRemoveFn.call(this);
			}, {
				postCommentId: this.get("Id"),
				parentPostId: this.get("Parent") && this.get("Parent").value
			}, this));
		},

		/**
		 * Checks SocialMessage schema operation rights by attributeName.
		 * @param {String} atributeName Name of the attribute. Can be: CanAdd, CanEdit, CanDelete.
		 * @return {Promise} Promised result.
		 */
		checkSocialMessageRights: function(atributeName) {
			return new Promise(function(resolve, reject) {
				if (this.get(atributeName)) {
					resolve();
				} else {
					reject(this.getLocalizableStringValue("RightsErrorMessage"));
				}
			}.bind(this));
		},

		changeVisible: function(post) {
			this.set("isCommentInEditMode", false);
			this.set("PublishContainerVisible", false);
			this.set("EditCommentVisible", false);
			this.set("CommentVisible", true);
			this.set("ActionsContainerVisible", true);
			this.set("CommentPublishContainerVisible", true);
			this.set("commentMessage", "");
			this.set("CommentToEditContainerVisible", false);
			if (post) {
				post.set("CommentPublishContainerVisible", true);
			}
		},

		/**
		 * The handler of the message button.
		 * @private
		 */
		onEditCommentPublishClick: function() {
			const post = this.get("viewModel");
			const editedMessage = this.get("commentMessage") || this.get("editedCommentMessage");
			if (editedMessage === this.get("Message")) {
				this._finishEditing(post);
			} else if (this.isUseEsnRightEnabled) {
					const isComment = this._getIsComment();
					const editData = {
						entitySchemaId: isComment? post.$EntitySchemaUId : this.$EntitySchemaUId,
						entityId: isComment? post.$EntityId : this.$EntityId,
						id: this.$Id,
						message: editedMessage
					};
					const editMessageMethod = isComment? this.editSocialComment : this.editSocialMessage;
					editMessageMethod.call(this,
						editData,
						function() {
							this._updatePostCommentCallback(editedMessage, post);
						},
						this);
			} else {
				const postCommentParams = {
					editedMessage: editedMessage,
					postMessageId: this.get("Id")
				};
				ServiceHelper.callService("ESNFeedModuleService", "UpdatePostComment",
					this._updatePostCommentCallback.apply(this, [editedMessage, post]),
					postCommentParams,
					this);
			}
		},

		/**
		 * Updates comment of the post.
		 * @param {String} editedMessage Comment message.
		 * @param {Terrasoft.BaseViewModel} post ViewModel post element.
		 * @private
		 */
		_updatePostCommentCallback: function(editedMessage, post) {
			this.set("Message", editedMessage);
			this._finishEditing(post);
			const config = {
				id: this.get("Id"),
				message: editedMessage
			};
			this.addSocialMention(config);
		},
		/**
		 * Closes the editing panel.
		 * @private
		 * @param {ViewModel} post Post being edited.
		 */
		_finishEditing: function(post) {
			this.changeVisible(post);
			currentEditingComment = null;
		},

		/**
		 * Sends insert or delete request for like
		 * @param {String} methodName
		 * @param {Func} callback
		 * @param  {Object} scope
		 * @private
		 */
		_sendChangeLikeRequest: function(methodName, callback, scope) {
			var config = {
				"serviceName": this.esnServiceName,
				"methodName": methodName,
				"callback": function() {
					callback.call(scope);
				},
				"data": {
					"messageId": this.$Id
				},
				"scope": scope
			};
			ServiceHelper.callService(config);
		},

		/**
		 *
		 * @param {Object} e
		 */
		onKeyDown: function(e) {
			if (e && (e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
				this.onCommentPublishClick();
			}
		},

		onNewCommentContainerFocus: function() {
			this.set("NewCommentButtonsVisible", true);
		},

		onNewCommentContainerBlur: function() {
			const me = this;
			setTimeout(function() {
				if (me.get("commentMessage") === "") {
					me.set("NewCommentButtonsVisible", false);
				}
			}, 100);
		},
		/**
		 * ########## ######### ###### ############## # ############ ##### ## #######.
		 * @private
		 */
		getNewCommentButtonVisibility: function() {
			let result = true;
			let entitySchemaUId = this.values.EntitySchemaUId;
			let isCaseFinalStatus = this.values.IsCaseFinalStatus;
			if (this.Ext.isEmpty(entitySchemaUId)) {
				isCaseFinalStatus = this.values.IsParentMessageCaseFinalStatus;
				entitySchemaUId = this.values.ParentEntitySchemaUId;
			}
			if (entitySchemaUId === ESNConstants.SysSchema.CaseUId) {
				result = !isCaseFinalStatus && Terrasoft.isCurrentUserSsp();
			}
			return result && this.get("NewCommentButtonsVisible");
		},

		onCommentToEditContainerFocus: function() {
			this.set("CommentToEditButtonsVisible", true);
		},

		onCommentToEditContainerBlur: function() {
			const me = this;
			setTimeout(function() {
				if (me.get("commentMessage") === "") {
					me.set("CommentToEditButtonsVisible", false);
				}
			}, 100);
		},

		onEditedCommentContainerFocus: function() {
			this.set("EditedCommentContainerVisible", true);
		},

		onEditedCommentContainerBlur: function() {
			const me = this;
			setTimeout(function() {
				if (me.get("editedCommentMessage") === "") {
					me.set("EditedCommentContainerVisible", false);
				}
			}, 100);
		},

		/**
		 * ########## ###### ###### ############## #####.
		 */
		onCancelClick: function() {
			this.set("editedCommentMessage", "");
			this.set("commentMessage", "");
			const post = this.get("viewModel");
			this.changeVisible(post);
		},

		/**
		 * Publishes social message comment.
		 */
		onCommentPublishClick: function() {
			if (this.get("isCommentInEditMode")) {
				this.onEditCommentPublishClick();
				return;
			}
			const message = this.get("commentMessage");
			if (this.Ext.isEmpty(message) || message.length === 0) {
				return;
			}
			const post = {
				parentId: this.get("Id"),
				message: message,
				sandbox: this.sandbox
			};
			if (this.isUseEsnRightEnabled) {
				post.entitySchemaId = this.$EntitySchemaUId;
				post.entityId = this.$EntityId;
			}
			this.insertSocialMessage(post, function(item) {
				this.set("commentMessage", "");
				const loadedComments = this.get("LoadedComments");
				this.Terrasoft.each(loadedComments.getItems(), function(comment) {
					comment.set("isLast", false);
				}, this);
				item.set("isLast", true);
				item.set("viewModel", this);
				loadedComments.add(item.get("Id"), item);
				this.set("LoadedCommentCount", loadedComments.getCount());

				const comments = this.get("Comments");
				comments.add(item.get("Id"), item);
				this.set("CommentCount", comments.getCount());
				this.set("PublishContainerVisible", false);
			}, this);
		},

		/**
		 * ########## ##### ## label-###########.
		 */
		onUrlClick: function(entitySchemaName, entity, entityTypeUId) {
			if (this.Ext.isEmpty(entity)) {
				return;
			}
			const hash = NetworkUtilities.getEntityUrl(entitySchemaName, entity.value, entityTypeUId);
			this.sandbox.publish("PushHistoryState", {hash: hash});
		},

		/**
		 * ####### ########## ##### ###### #####.
		 * @private
		 */
		getLikeText: function() {
			const likeCount = this.get("LikeCount");
			return (likeCount === 0) ? "" : likeCount;
		},

		/**
		 * ####### ########## ####### ### ###### #####.
		 * @private
		 */
		getLikeCaption: function() {
			const isLikedMe = this.get("IsLikedMe");
			let caption = this.getLocalizableStringValue("LikeButtonCaption");
			if (isLikedMe) {
				caption = this.getLocalizableStringValue("UnLikeButtonCaption");
			}
			return caption;
		},

		/**
		 * ####### ########## ######### ######## # ###### ######.
		 * @return {boolean}
		 */
		getLikeTextVisible: function() {
			if (this.get("EditCommentVisible")) {
				return false;
			}
			return this.get("LikeCount") > 0;
		},

		/**
		 * ####### ########## ########### #####.
		 * @private
		 */
		getLikeImage: function() {
			const isLikedMe = this.get("IsLikedMe");
			return {
				source: this.Terrasoft.ImageSources.URL,
				url: this.Terrasoft.ImageUrlBuilder.getUrl(isLikedMe
					? resources.localizableImages.Liked
					: resources.localizableImages.Like)
			};
		},

		/**
		 * Updates count of likes.
		 */
		updateLikeCount: function() {
			const isLikedMe = this.$IsLikedMe;
			const likeCount = this.$LikeCount + (!isLikedMe ? 1 : -1);
			this.set("IsLikedMe", !isLikedMe);
			this.set("LikeCount", likeCount);
		},

		/**
		 * ####### ######### ##### ###### # ####### ######.
		 */
		insertLike: function(callback, scope) {
			if (this.isUseEsnRightEnabled) {
				this._sendChangeLikeRequest("LikeMessage", callback, scope);
			} else {
				const socialMessageId = this.$Id;
				const insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "SocialLike"
				});
				insert.setParameterValue("User", Terrasoft.SysValue.CURRENT_USER.value, Terrasoft.DataValueType.GUID);
				insert.setParameterValue("SocialMessage", socialMessageId, Terrasoft.DataValueType.GUID);
				insert.execute(function() {
					callback.call(scope);
				}, scope);
			}
		},

		/**
		 * ####### ####### ###### ## ####### ######.
		 */
		deleteLike: function(callback, scope) {
			var socialMessageId = scope.get("Id");
			if (this.isUseEsnRightEnabled) {
				this._sendChangeLikeRequest("UnLikeMessage", callback, scope);
			} else {
				const deleteQuery = this.Ext.create("Terrasoft.DeleteQuery", {
					rootSchemaName: "SocialLike"
				});
				const userIdFilter = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "User", this.Terrasoft.SysValue.CURRENT_USER.value);
				const entityIdFilter = Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "SocialMessage", socialMessageId);
				deleteQuery.filters.add("userIdFilter", userIdFilter);
				deleteQuery.filters.add("entityIdFilter", entityIdFilter);
				deleteQuery.execute(function() {
					callback.call(scope, false);
				}, this);
			}
		},

		/**
		 * ########## ####### ####### ## ####.
		 */
		onLikeClick: function() {
			const isLikedMe = this.get("IsLikedMe");
			if (!isLikedMe || Ext.isEmpty(isLikedMe)) {
				this.insertLike(this.updateLikeCount, this);
			} else {
				this.deleteLike(this.updateLikeCount, this);
			}
		},

		/**
		 * ########## ####### ####### ## ########## ######.
		 */
		onShowLikedUsers: function() {
			const likes = this.get("LikeCount");
			if (!likes) {
				return;
			}
			const selectedMessage = this.get("Id");
			renderContainer = ModalBox.show(ESNConstants.LikedUsersModalBoxConfig);
			const likedUsersView = this.getLikedUsersView();
			const likedUsersViewModel = this.getLikedUsersViewModel();
			likedUsersViewModel.sandbox = this.sandbox;
			likedUsersViewModel.loadLikedUsers(selectedMessage);
			likedUsersView.bind(likedUsersViewModel);
			likedUsersView.render(renderContainer);

			const fixedView = this.getModalBoxTopView();
			fixedView.bind(likedUsersViewModel);
			fixedView.render(ModalBox.getFixedBox());

			ModalBox.setSize(400, 400);
		},

		/**
		 * ####### ########## View ########## ####.
		 */
		getLikedUsersView: function() {
			const viewConfig = {
				className: "Terrasoft.Container",
				id: "likedUsersModalBoxContainer",
				selectors: {
					wrapEl: "#likedUsersModalBoxContainer"
				},
				classes: {
					wrapClassName: ["likedUsersModalBoxContainer"]
				},
				visible: {
					bindTo: "getLikedUsersContainerVisible"
				},
				items: [
					{
						className: "Terrasoft.Container",
						id: "likedUsersGridGroup",
						selectors: {
							wrapEl: "#likedUsersGridGroup"
						},
						classes: {
							wrapContainerClass: ["liked-users-wrap-container"]
						},
						items: []
					}
				]
			};
			return this.Ext.create("Terrasoft.Container", viewConfig);
		},

		/**
		 * ####### ########## ViewModel ########## ####.
		 */
		getLikedUsersViewModel: function() {
			const me = this;
			const config = {
				values: {
					getLikedUsersContainerVisible: true,
					EsnServiceName: this.esnServiceName,
					IsUseEsnRightEnabled: this.isUseEsnRightEnabled,
					UserLikedCollection: null
				},
				methods: {
					onLikedUserClick: function(tag) {
						ModalBox.close();
						me.onUrlClick("Contact", tag);
					},
					getLikedUserConfig: function(likeConfig) {
						return {
							id: "likedUserConfig" + likeConfig.likedUserId,
							selectors: {
								wrapEl: "#likedUserConfig" + likeConfig.likedUserId
							},
							classes: {
								wrapClassName: ["likedUserConfig"]
							},
							className: "Terrasoft.Container",
							items: [
								{
									className: "Terrasoft.ImageView",
									imageSrc: likeConfig.imageSrc,
									classes: {
										wrapClass: ["image32", "floatLeft"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: likeConfig.likedUserName,
									classes: {
										labelClass: ["likedUserNameLabel32"]
									},
									tag: {
										value: likeConfig.likedUserId,
										displayValue: likeConfig.likedUserName
									},
									click: {
										bindTo: "onLikedUserClick"
									}
								}
							]
						};
					},
					getLikedUserItems: function() {
						const likedUsersCollection = this.get("UserLikedCollection");
						var likedUserItems = [];
						if (this.get("IsUseEsnRightEnabled")) {
							Terrasoft.each(likedUsersCollection, function(item) {
								var entityForImage = {
									"primaryImageValue": null
								};
								if (item.contactPrimaryImageId && item.contactPrimaryImageId !== Terrasoft.GUID_EMPTY) {
									entityForImage.primaryImageValue = item.contactPrimaryImageId;
								}
								var likeConfig = {
									"likedUserId": item.contactId,
									"imageSrc": me.getImageValue(entityForImage),
									"likedUserName": item.contactName
								};
								const likedUserConfig = this.getLikedUserConfig(likeConfig);
								likedUserItems.push(likedUserConfig);
							}, this);
						} else {
							likedUsersCollection.each(function(item) {
								const likedUser = item.$CreatedBy;
								const likeConfig = {
									"likedUserId": likedUser.value,
									"imageSrc": me.getImageValue(likedUser),
									"likedUserName": likedUser.displayValue
								};
								const likedUserConfig = this.getLikedUserConfig(likeConfig);
								likedUserItems.push(likedUserConfig);
							}, this);
						}
						return likedUserItems;
					},
					showLikedUsers: function() {
						const likedUsersGridGroup = Ext.getCmp("likedUsersGridGroup");
						if (!likedUsersGridGroup) {
							return;
						}
						var likedUserItems = this.getLikedUserItems();
						const likedUsersConfig = Ext.create("Terrasoft.Container", {
							id: "likedUsersContainer",
							selectors: {
								wrapEl: "#likedUsersContainer"
							},
							classes: {
								wrapClassName: ["likedUsersContainer"]
							},
							items: likedUserItems
						});
						likedUsersConfig.bind(this);
						const likeUsersGridGroupWrapEl = likedUsersGridGroup.getWrapEl();
						if (likeUsersGridGroupWrapEl) {
							likedUsersConfig.render(Ext.get("likedUsersGridGroup"));
						}
					},
					loadLikedUsers: function(selectedMessage) {
						if (this.get("IsUseEsnRightEnabled")) {
							ServiceHelper.callService({
								"serviceName": this.get("EsnServiceName"),
								"methodName": "GetWhoLikedMessage",
								"callback": function(result) {
									if (result.success) {
										this.set("UserLikedCollection", result.likes);
										this.showLikedUsers();
									}
								},
								"data": {"messageId": selectedMessage},
								"scope": this
							});
						} else {
							const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "SocialLike"
							});
							esq.addColumn("Id");
							esq.addColumn("CreatedBy");
							esq.filters.add("currentMessageFilter",
								Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "SocialMessage",
									selectedMessage));
							esq.getEntityCollection(function(result) {
								if (result.success) {
									this.set("UserLikedCollection", result.collection);
									this.showLikedUsers();
								}
							}, this);
						}
					},
					closeLikedUsersModalBox: function() {
						ModalBox.close();
					}
				}
			};
			return this.Ext.create("Terrasoft.BaseViewModel", config);
		},

		/**
		 * Returns icon of "Edit" button.
		 * @private
		 * @return {Object}
		 */
		getEditImage: function() {
			return {
				source: this.Terrasoft.ImageSources.URL,
				url: this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Edit)
			};
		},

		/**
		 * Returns icon of "Delete" button.
		 * @private
		 * @return {Object}
		 */
		getDeleteImage: function() {
			return {
				source: this.Terrasoft.ImageSources.URL,
				url: this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Delete)
			};
		},

		getModalBoxTopView: function() {
			const viewConfig = {
				className: "Terrasoft.Container",
				id: "likedUsersModalBoxTopContainer",
				selectors: {
					wrapEl: "#likedUsersModalBoxTopContainer"
				},
				classes: {
					wrapClassName: ["likedUsersModalBoxTopContainer"]
				},
				items: [
					{
						className: "Terrasoft.Label",
						caption: this.getLocalizableStringValue("LikedUsersContainerCaption"),
						classes: {
							labelClass: ["likedUsersModalBoxTopContainerLabel"]
						}
					},
					{
						className: "Terrasoft.Container",
						id: "maskContainer",
						selectors: {
							wrapEl: "#maskContainer"
						},
						classes: {
							wrapClassName: ["maskContainer"]
						},
						items: [
							{
								className: "Terrasoft.Button",
								click: {
									bindTo: "closeLikedUsersModalBox"
								},
								classes: {
									textClass: "closeModalWindow"
								},
								caption: " ",
								style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT
							}
						]
					},
					{
						className: "Terrasoft.Button",
						imageConfig: resources.localizableImages.CloseIcon,
						classes: {wrapperClass: "closeModalWindowButton"},
						click: {
							bindTo: "closeLikedUsersModalBox"
						},
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				]
			};
			return this.Ext.create("Terrasoft.Container", viewConfig);
		},

		/**
		 * Post new message.
		 * @public
		 * @param {Object} data message.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		postSocialMessage: function(data, callback, scope) {
			Terrasoft.MaskHelper.ShowBodyMask();
			this._callEsnService("PostMessage", {
				message: {
					SchemaUId: data.entitySchemaId,
					EntityId: data.entityId,
					Message: data.message
				}
			}, function (response) {
				this._onMessagePost(response, data, callback, scope);
			}, this);
		},

		/**
		 * Post new comment.
		 * @public
		 * @param {Object} data comment.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		postSocialComment: function(data, callback, scope) {
			Terrasoft.MaskHelper.ShowBodyMask();
			this._callEsnService("PostComment", {
				messageId: data.parentId,
				comment: {
					SchemaUId: data.entitySchemaId,
					EntityId: data.entityId,
					Message: data.message
				}
			}, function (response) {
				this._onMessagePost(response, data, callback, scope);
			}, this);
		},

		/**
		 * Edit message.
		 * @public
		 * @param {Object} data message.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		editSocialMessage: function(data, callback, scope) {
			this._callEsnService("EditMessage", {
				messageId: data.id,
				message: {
					SchemaUId: data.entitySchemaId,
					EntityId: data.entityId,
					Message: data.message
				}
			}, callback, scope);
		},

		/**
		 * Edit comment.
		 * @public
		 * @param {Object} data message.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		editSocialComment: function(data, callback, scope) {
			this._callEsnService("EditComment", {
				commentId: data.id,
				comment: {
					SchemaUId: data.entitySchemaId,
					EntityId: data.entityId,
					Message: data.message
				}
			}, callback, scope);
		},

		/**
		 * Delete message.
		 * @public
		 * @param {Object} data message.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		deleteSocialMessage: function(data, callback, scope) {
			this._callEsnService("DeleteMessage", {
				messageId: data.id,
				entityId: data.entityId,
				schemaUId: data.entitySchemaId
			}, callback, scope);
		},

		/**
		 * Delete comment.
		 * @public
		 * @param {Object} data message.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		deleteSocialComment: function(data, callback, scope) {
			this._callEsnService("DeleteComment", {
				commentId: data.id,
				entityId: data.entityId,
				schemaUId: data.entitySchemaId
			}, callback, scope);
		},

		/**
		 * Call Esn service.
		 * @param methodName esn service.
		 * @param data which sent to the method.
		 * @param callback Function callback.
		 * @param scope.
		 * @private
		 */
		_callEsnService: function(methodName, data, callback, scope) {
			ServiceHelper.callService({
				"serviceName": this.esnServiceName,
				"methodName": methodName,
				"callback": function(response) {
					if (!response.success) {
						Terrasoft.MaskHelper.HideBodyMask();
						this._showErrorInfo(this.getLocalizableStringValue("InsertMessageError"));
						return;
					}
					Ext.callback(callback, scope, [response]);
				},
				"data": data,
				"scope": this
			});
		},

		/**
		 * Callback after success message post.
		 * @private
		 */
		_onMessagePost: function(response, data, callback, scope) {
			const messageConfig = this._getMessageConfig(response, data, scope);
			this.loadMessage(messageConfig, function(item) {
				Terrasoft.MaskHelper.HideBodyMask();
				callback.call(scope, item);
			}, this);
			this.addSocialMention({
				id: response.Id,
				message: data.message
			});
		},

		/**
		 * @private
		 */
		_getMessageConfig: function(response, data, scope) {
			return {
				schemaUId: data.entitySchemaId,
				entityId: data.entityId,
				id: response.Id,
				sandbox: data.sandbox,
				canDeleteAllMessageComment: scope.get("canDeleteAllMessageComment"),
				onDeleteRecordCallback: this._getOnDeleteRecordCallback(scope)
			};
		},

		/**
		 * @private
		 */
		_getOnDeleteRecordCallback: function(scope) {
			return function() {
				const postToDeleteId = this.get("Id");
				if (this.Ext.isEmpty(this.get("Parent"))) {
					const posts = scope.get("SocialMessages");
					posts.removeByKey(postToDeleteId);
				} else {
					const comments = scope.get("Comments");
					const loadedComments = scope.get("LoadedComments");
					let loadedCommentsCount = loadedComments.getCount();
					loadedComments.removeByKey(postToDeleteId);
					comments.removeByKey(postToDeleteId);
					loadedCommentsCount --;
					scope.set("CommentCount", loadedCommentsCount);
					scope.set("LoadedCommentCount", loadedCommentsCount);
					if (loadedCommentsCount - 1 >= 0) {
						loadedCommentsCount --;
						loadedComments.getItems()[loadedCommentsCount].set("isLast", true);
					}
				}
			};
		},

		/**
		 * Creates social message.
		 * @param {Object} data Social message data.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		insertSocialMessage: function(data, callback, scope) {
			if (this.isUseEsnRightEnabled) {
				return data.parentId
					? this.postSocialComment(data, callback, scope)
					: this.postSocialMessage(data, callback, scope);
			}

			Terrasoft.MaskHelper.ShowBodyMask();
			const insert = this.createSocialMessageInsert(data);
			insert.execute(function(result) {
				if (!result.success) {
					Terrasoft.MaskHelper.HideBodyMask();
					this._showErrorInfo(this.getLocalizableStringValue("InsertMessageError"));
					return;
				}
				this.loadSocialMessages({
					schemaUId: data.entitySchemaId,
					entityId: data.entityId,
					id: result.id,
					sandbox: data.sandbox,
					canDeleteAllMessageComment: scope.get("canDeleteAllMessageComment"),
					onDeleteRecordCallback: function() {
						const postToDeleteId = this.get("Id");
						if (this.Ext.isEmpty(this.get("Parent"))) {
							const posts = scope.get("SocialMessages");
							posts.removeByKey(postToDeleteId);
						} else {
							const comments = scope.get("Comments");
							const loadedComments = scope.get("LoadedComments");
							let loadedCommentsCount = loadedComments.getCount();
							loadedComments.removeByKey(postToDeleteId);
							comments.removeByKey(postToDeleteId);
							loadedCommentsCount--;
							scope.set("CommentCount", loadedCommentsCount);
							scope.set("LoadedCommentCount", loadedCommentsCount);
							if (loadedCommentsCount - 1 >= 0) {
								loadedCommentsCount--;
								loadedComments.getItems()[loadedCommentsCount].set("isLast", true);
							}
						}
					}
				}, function(item) {
					Terrasoft.MaskHelper.HideBodyMask();
					callback.call(scope, item);
				}, this);
				const config = {
					id: result.id,
					message: data.message
				};
				this.addSocialMention(config);
			}, scope);
		},

		/**
		 * Creates social message insert query.
		 * @private
		 * @param {Object} data Insert data.
		 * @return {Terrasoft.InsertQuery}
		 */
		createSocialMessageInsert: function(data) {
			const insert = this.Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: "SocialMessage"
			});
			insert.setParameterValue("Message", data.message, Terrasoft.DataValueType.TEXT);
			if (data.entityId) {
				insert.setParameterValue("EntitySchemaUId", data.entitySchemaId, Terrasoft.DataValueType.GUID);
				insert.setParameterValue("EntityId", data.entityId, Terrasoft.DataValueType.GUID);
			}
			if (data.parentId) {
				insert.setParameterValue("Parent", data.parentId, Terrasoft.DataValueType.GUID);
			}
			return insert;
		},

		/**
		 * @private
		 */
		_applySortColumnFilters: function(filters, config) {
			const sortColumnLastValue = this.get("sortColumnLastValue");
			if (sortColumnLastValue) {
				const sortDirection = config.sortDirection || Terrasoft.OrderDirection.DESC;
				const sortColumnName = config.sortColumnName;
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					sortDirection === Terrasoft.OrderDirection.DESC
						? Terrasoft.ComparisonType.LESS
						: Terrasoft.ComparisonType.GREATER,
					sortColumnName, sortColumnLastValue));
			}
		},

		/**
		 * @private
		 */
		_applyUserPostsFilters: function(filters, config) {
			const parentId = config.parentId;
			const esqConfig = config.esqConfig;
			const esqFilter = esqConfig && esqConfig.filter;
			if (!esqFilter && !parentId) {
				const filterGroup = this.Ext.create("Terrasoft.FilterGroup");
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				filterGroup.addItem(this.getCurrentUserPostsFilter());
				filters.addItem(filterGroup);
			}
		},

		/**
		 * @private
		 */
		_applyParentIdFilters: function(filters, config) {
			const parentId = config.parentId;
			if (parentId) {
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Parent", parentId));
			} else {
				filters.addItem(this.Terrasoft.createIsNullFilter(
					this.Ext.create("Terrasoft.ColumnExpression", {columnPath: "Parent"})
				));
			}
		},

		/**
		 * @private
		 */
		_applyCurrentChannelFilter: function(filters, config) {
			const esqConfig = config.esqConfig;
			if (esqConfig && esqConfig.filter) {
				this.set("channelFilter", esqConfig.filter);
				filters.add(esqConfig.filter);
			}
		},

		/**
		 * @private
		 */
		_applySocialMessageFilters: function(esq, config) {
			const filters = esq.filters;
			this._applyParentIdFilters(filters, config);
			this._applySortColumnFilters(filters, config);
			this._applyCurrentChannelFilter(filters, config);
			this._applyUserPostsFilters(filters, config);
		},

		/**
		 * Set's IsLikedMe for loaded messages
		 * @param {Array} likes
		 * @param {Array} loadedMessages
		 * @private
		 */
		_updateIsLikedMeForLoadedMessages: function(likes, loadedMessages) {
			this.Terrasoft.each(likes, function(like) {
				var messageId = like.socialMessageId;
				if (!loadedMessages.contains(messageId)) {
					return true;
				}
				var socialMessage = loadedMessages.get(messageId);
				socialMessage.set("IsLikedMe", true);
			});
		},

		/**
		 * Sets last loaded message by user's sotr settings
		 * @param {Terrasoft.Collection} loadedMessages
		 * @param {String} sortColumnName
		 * @private
		 */
		_setSortColumnLastValue: function(loadedMessages, sortColumnName) {
			const lastItemIndex = loadedMessages.getCount() - 1;
			const lastItem = loadedMessages.getByIndex(lastItemIndex);
			this.set("sortColumnLastValue", lastItem.get(sortColumnName));

		},

		/**
		 * Sets can user delete comments
		 * @param {Terrasoft.Collection} loadedMessages
		 * @param {Object} config
		 * @private
		 */
		_setCanDeleteAllMessageComment: function(loadedMessages, config) {
			if (loadedMessages.getCount() === 0) {
				return;
			}
			loadedMessages.each(function(item) {
				item.init();
				item.set("canDeleteAllMessageComment", config.canDeleteAllMessageComment);
				item.doRemoveFn = config.onDeleteRecordCallback;
			}, this);
		},

		/**
		 * Loads messages/comments.
		 * @param {Object} config Request configuration.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		loadSocialMessages: function(config, callback, scope) {
			const id = config.id;
			if (this.isUseEsnRightEnabled) {
				const loadMessagesMethod = Ext.isEmpty(id)
					? this.loadMessages
					: this.loadMessage;

				loadMessagesMethod.call(this, config, callback, scope);
				return;
			}

			const esq = this.getSocialMessageEsq(config);
			if (Ext.isEmpty(id)) {
				this._applySocialMessageFilters(esq, config);
				esq.getEntityCollection(function(response) {
					if (!response.success) {
						return;
					}
					const loadedMessages = response.collection;
					if (loadedMessages.getCount() > 0) {
						this._setSortColumnLastValue(loadedMessages, config.sortColumnName);
						this.loadMessageLikesForUser(loadedMessages, config);
						this._setCanDeleteAllMessageComment(loadedMessages, config);
					}
					callback.call(scope, loadedMessages);
				}, this);
			} else {
				esq.getEntity(id, function(result) {
					if (result.success) {
						const entity = result.entity;
						entity.init();
						entity.doRemoveFn = config.onDeleteRecordCallback;
						entity.set("canDeleteAllMessageComment", config.canDeleteAllMessageComment);
						callback.call(scope, entity);
					}
				}, this);
			}
		},

		/**
		 * Loads comments to message.
		 * @public
		 * @param {Object} config Request configuration.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		loadComments: function(config, callback, scope) {
			ServiceHelper.callService({
				"serviceName": this.esnServiceName,
				"methodName": "ReadComments",
				"callback": function(response) {
					if (response.success) {
						scope._onMessagesLoad(response, config, callback, scope);
					}
				},
				"data": {
					"entityId": config.entityId,
					"schemaUId": config.schemaUId,
					"messageId": config.parentId
				},
				"scope": this
			});
		},

		/**
		 * Loads message.
		 * @public
		 * @param {Object} config Request configuration.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		loadMessage: function(config, callback, scope) {
			ServiceHelper.callService({
				"serviceName": this.esnServiceName,
				"methodName": "ReadMessage",
				"callback": function (response) {
					if (response.success) {
						this._onMessageLoad(response, config, callback, scope);
					}
				},
				"data": {
					"entityId": config.entityId,
					"schemaUId": config.schemaUId,
					"messageId": config.id
				},
				"scope": this
			});
		},

		/**
		 * Loads messages for Entity or Feed.
		 * @public
		 * @param {Object} config Request configuration.
		 * @param {Function} callback Function callback.
		 * @param {Object} scope Current scope.
		 */
		loadMessages: function(config, callback, scope) {
			const data = this._createEsnServiceParameters(config);
			ServiceHelper.callService({
				"serviceName": this.esnServiceName,
				"methodName": config.entityId ? "ReadEntityMessage": "ReadFeed",
				"callback": function(response) {
					if (response.success) {
						this._onMessagesLoad(response, config, callback, scope);
						return;
					}
					callback.call(scope);
				},
				"data": data,
				"scope": this
			});
		},

		/**
		 *  @private
		 */
		_createEsnServiceParameters: function(config) {
			const sortColumnLastValue = this.get("sortColumnLastValue");
			const rowCount = config.esqConfig ? config.esqConfig.rowCount : null;
			var data = {
				"readOptions": {
					"ReadMessageCount": rowCount,
					"OffsetDate": sortColumnLastValue
						? Terrasoft.encodeDate(sortColumnLastValue)
						: undefined,
					"SortedBy": config.sortColumnName === "CreatedOn"
						? this.sortedByCreatedOn
						: this.sortedByLastActionOn
				}
			};
			if (config.entityId) {
				data.entityId = config.entityId;
				data.schemaUId = config.schemaUId;
			}
			return data;
		},

		/**
		 *  @private
		 */
		_applyNotLoadedMessagesFilter: function(esq) {
			const ids = Ext.isEmpty(this.$SocialMessages) ? [] : this.$SocialMessages.getKeys();
			const filter = Terrasoft.createColumnInFilterWithParameters("Id", ids);
			filter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
			esq.filters.add("existsMessagesFilter", filter);
		},

		//region Methods: Protected

		/**
		 * Returns view model class name of social message.
		 * @protected
		 * @return {String}
		 */
		getSocialMessageViewModelName: function() {
			return "Terrasoft.SocialMessageViewModel";
		},

		//endregion

		/**
		 * Load likes for mesages, which user liked
		 * @param {Array|Terrasoft.Collection}loadedMessages
		 * @protected
		 */
		loadMessageLikesForUser: function(loadedMessages) {
			let likesCollection = new this.Terrasoft.Collection();
			if (this.isUseEsnRightEnabled) {
				ServiceHelper.callService({
					"serviceName": this.esnServiceName,
					"methodName": "GetMessageLikesForUser",
					"callback": function(response) {
						if (response.success) {
							this._updateIsLikedMeForLoadedMessages(response.likes, loadedMessages);
						}
					},
					"data": {"messageIds": loadedMessages.getKeys()},
					"scope": this
				});
			} else {
				const socialLikeEsq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SocialLike"
				});
				socialLikeEsq.addColumn("SocialMessage");
				socialLikeEsq.filters.add("socialMessagesFilter",
					this.Terrasoft.createColumnInFilterWithParameters("SocialMessage", loadedMessages.getKeys()));
				socialLikeEsq.filters.add("currentUserFilter",
					this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "User",
						Terrasoft.SysValue.CURRENT_USER.value));
				socialLikeEsq.getEntityCollection(function(response) {
					if (response.collection.getCount() === 0) {
						return;
					}
					likesCollection = response.collection;
					loadedMessages.each(function(item) {
						const socialMessageId = item.get("Id");
						const existsItem = likesCollection.getItems().some(function(like) {
							return (like.get("SocialMessage").value === socialMessageId);
						});
						item.set("IsLikedMe", existsItem);
					});
				}, this);
			}
		},

		/**
		 * Builds {Terrasoft.EntitySchemaQuery} for message/comments from request configuration.
		 * @param {Object} config Request configuration.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getSocialMessageEsq: function(config) {
			const rowCount = config.esqConfig ? {rowCount: config.esqConfig.rowCount} : null;
			const options = this.Ext.apply({
				rootSchemaName: "SocialMessage",
				rowViewModelClassName: "Terrasoft.SocialMessageViewModel"
			}, rowCount);
			const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", options);
			esq.on("createviewmodel", this.createSocialMessage, this);
			const sortColumnName = config.sortColumnName;
			const socialMessageColumnNames = this.get("SocialMessageColumnNames");
			const columnNames = this.Terrasoft.deepClone(socialMessageColumnNames);
			if (!this.Ext.isEmpty(sortColumnName) && columnNames.indexOf(sortColumnName) === -1) {
				columnNames.push(sortColumnName);
			}
			const sortDirection = config.sortDirection || Terrasoft.OrderDirection.DESC;
			this.Terrasoft.each(columnNames, function(columnName) {
				const column = esq.addColumn(columnName);
				if (columnName === sortColumnName) {
					column.orderPosition = 1;
					column.orderDirection = sortDirection;
				}
			});
			esq.addColumn("[SocialChannel:Id:EntityId].Color", "Color");
			if (Terrasoft.Features.getIsEnabled("LinkPreview")) {
				esq.addColumn("[LinkPreviewData:EntityId:Id].Data", "LinkPreviewData");
			}
			if (config.extendedColumns) {
				this.Terrasoft.each(config.extendedColumns, function(item) {
					if (!Ext.isEmpty(item.columnName)) {
						const alias = Ext.isEmpty(item.columnAlias) ? item.columnName : item.columnAlias;
						esq.addColumn(item.columnName, alias);
					}
				});
			}
			if (Terrasoft.Features.getIsEnabled("UseLoadedMessagesFilterInESN")) {
				this._applyNotLoadedMessagesFilter(esq);
			}
			return esq;
		},

		/**
		 * Gets "Like" button marker.
		 */
		getLikeButtonMarkerValue: function() {
			return this.get("IsLikedMe") ? "Unlike" : "Like";
		},

		/**
		 * Gets "Toggle comments" button marker.
		 */
		getToggleCommentsButtonMarkerValue: function() {
			return this.get("CommentsExpanded") ? "Hide comments" : "Comments";
		}

	});
});


