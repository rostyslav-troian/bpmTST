Terrasoft.configuration.Structures["SocialMentionUtilities"] = {innerHierarchyStack: ["SocialMentionUtilities"]};
define("SocialMentionUtilities", ["Contact", "NetworkUtilities", "ConfigurationConstants", "ServiceHelper"],
		function(Contact, NetworkUtilities, ConfigurationConstants, ServiceHelper) {

	/**
	 * @class Terrasoft.configuration.SocialMentionUtilities
	 */
	Ext.define("Terrasoft.configuration.mixins.SocialMentionUtilities", {
		alternateClassName: "Terrasoft.SocialMentionUtilities",

		/**
		 * Callback from the server when you add a message subscription
		 * @public
		 */
		onSocialMentionAdded: Terrasoft.emptyFn,
		/**
		 * @inheritdoc
		 * @overridden
		 */
		init: function() {
			var entitiesList = this.Ext.create("Terrasoft.Collection");
			this.set("entitiesList", entitiesList);
		},

		//region Methods: Protected

		/**
		 * Fills filtered entities drop down list during writing a message.
		 * @param {String} filterValue Filter value.
		 * @param {Terrasoft.Collection} list List to be filled.
		 */
		prepareEntitiesExpandableList: function(filterValue, list) {
			this.getContactItems(filterValue, function(entities) {
				const result = this.prepareContactItems(entities);
				list.clear();
				list.loadAll(result);
			}, this);
		},

		/**
		 * Check if the current connection is ssp connection.
		 * @protected
		 * @returns {boolean} True, if connection type is ssp.
		 */
		isSSPUser: function() {
			return (this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP);
		},

		/**
		 * Returns absolute path to contact page.
		 * @protected
		 * @param {String} contactId Contact identifier.
		 * @return {String} Absolute path to contact page.
		 */
		getSspContactEntityUrl: function(contactId) {
			const contactEntityUrl = "CardModuleV2/ContactPageV2/edit/";
			return contactEntityUrl.concat(contactId);
		},

		//endregion

		/**
		 * Prepares contact list for be filled into drop down list.
		 * @private
		 * @param {Array} entities Contact items array.
		 * @return {Object} Contact list for be filled into drop down list.
		 */
		prepareContactItems: function(entities) {
			const result = {};
			Terrasoft.each(entities, function(entity) {
				const primaryColumnValue = entity.value;
				result[primaryColumnValue] = this.prepareContactItem(entity);
			}, this);
			return result;
		},

		/**
		 * Prepare contact item for loading in drop down list.
		 * @private
		 * @param {Object} contactItem Entity.
		 * @return {Object} Prepared entity.
		 */
		prepareContactItem: function(contactItem) {
			const value = contactItem.value;
			const displayValue = contactItem.displayValue;
			const primaryImageColumnValue = contactItem.primaryImage;
			const secondaryInfo = contactItem.secondaryInfo;
			const link = this.getEntityLink(contactItem);
			let imageSrc;
			const imageUrlBuilder = this.Terrasoft.ImageUrlBuilder;
			let imageConfig;
			if (primaryImageColumnValue && !Terrasoft.isEmptyGUID(primaryImageColumnValue)) {
				imageConfig = {
					source: this.Terrasoft.ImageSources.SYS_IMAGE,
					params: {
						primaryColumnValue: primaryImageColumnValue
					}
				};
			} else {
				imageConfig = this.get("Resources.Images.DefaultCreatedBy");
			}
			imageSrc = imageUrlBuilder.getUrl(imageConfig);
			return {
				value: value,
				displayValue: displayValue,
				primaryInfo: displayValue,
				secondaryInfo: secondaryInfo,
				imageSrc: imageSrc,
				link: link,
				schemaName: "Contact"
			};
		},

		/**
		 * Handles an event of rendering of a list item in the dropdown list of entities.
		 * @param {Object} item A dropdown list item.
		 */
		onEntitiesListViewItemRender: function(item) {
			/*jshint quotmark: false */
			var itemValue = item.value;
			var primaryInfoHtml = [
				'<label class="listview-item-primaryInfo" data-value="' + itemValue + '">',
				'' + item.primaryInfo + '',
				'</label>'
			].join("");
			var secondaryInfoHtml = "";
			var secondaryInfo = item.secondaryInfo;
			if (secondaryInfo) {
				secondaryInfoHtml = [
					'<label class="listview-item-secondaryInfo" data-value="' + itemValue + '">',
					'' + secondaryInfo + '',
					'</label>'
				].join("");
			}
			var tpl = [
				'<div class="listview-item" data-value="' + itemValue + '">',
				'<div class="listview-item-image" data-value="' + itemValue + '">',
				'<img src="' + item.imageSrc + '" data-value="' + itemValue + '">',
				'</div>',
				'<div class="listview-item-info" data-value="' + itemValue + '">',
				primaryInfoHtml,
				secondaryInfoHtml,
				'</div>',
				'</div>'
			];
			item.customHtml = tpl.join("");
			/*jshint quotmark: true */
		},

		/**
		 * Returns filtered array of contacts that can be selected in drop down list.
		 * @private
		 * @throws {Terrasoft.ArgumentNullOrEmptyException} filterValue is not set.
		 * @param {String} filterValue Filter value.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getContactItems: function(filterValue, callback, scope) {
			if (this.Ext.isEmpty(filterValue)) {
				throw this.Ext.create("Terrasoft.ArgumentNullOrEmptyException");
			}
			const comparisonType = this.getLookupComparisonType();
			ServiceHelper.callService({
				serviceName: "ESNFeedModuleService",
				methodName: "GetContactsForMention",
				data: {
					entitySchemaUId: this.$entitySchemaUId || this.$EntitySchemaUId,
					entityId: this.$EntityId,
					searchName: filterValue,
					searchType: comparisonType
				},
				callback: function(response, success) {
					if (response && success) {
						callback.call(scope, response.result);
					}
				},
				scope: this
			});
		},

		/**
		 * Returns query for filling drop down list during writing a message.
		 * @protected
		 * @param {String} filterValue Filter value.
		 * @return {Terrasoft.EntitySchemaQuery}
		 * @deprecated Method is not in use any more. Service ESNFeedModuleService is used instead.
		 */
		getMessageLookupQuery: function(filterValue) {
			var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchema: Contact,
				rowCount: 5
			});
			var queryMacrosType = this.Terrasoft.QueryMacrosType;
			esq.addMacrosColumn(queryMacrosType.PRIMARY_COLUMN, "value");
			esq.addMacrosColumn(queryMacrosType.PRIMARY_IMAGE_COLUMN, "primaryImageColumn");
			var displayColumn = esq.addMacrosColumn(queryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
			displayColumn.orderPosition = 1;
			displayColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
			esq.addColumn("Email", "secondaryInfo");
			var comparisonType = this.getLookupComparisonType();
			var paramDataType = this.Terrasoft.DataValueType.TEXT;
			var lookupFilter = esq.createPrimaryDisplayColumnFilterWithParameter(comparisonType, filterValue,
				paramDataType);
			var ownerFilter = esq.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id");
			var allEmployees = ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees;
			var isOrdinaryUserFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
					"[SysAdminUnit:Contact].ConnectionType", allEmployees);
			esq.filters.addItem(lookupFilter);
			esq.filters.addItem(ownerFilter);
			esq.filters.addItem(isOrdinaryUserFilter);
			return esq;
		},

		/**
		 * Returns comparsion type for lookups.
		 * @virtual
		 * @return {Terrasoft.ComparisonType} Comparsion type for lookups.
		 */
		getLookupComparisonType: function() {
			return Terrasoft.ComparisonType.CONTAIN;
		},

		/**
		 * Returns absolute path to an entity card.
		 * @private
		 * @param {Terrasoft.BaseViewModel} entity Entity.
		 * @return {String} Aabsolute path to an entity card.
		 */
		getEntityLink: function(entity) {
			const primaryColumnValue = entity.value;
			let relativeUrl = "";
			if (Terrasoft.Features.getIsEnabled("UseNavigationServiceRedirect")) {
				relativeUrl = NetworkUtilities.getNavigationServicePageUrl("Contact", primaryColumnValue);
			} else {
				relativeUrl = this.isSSPUser()
					? this.getSspContactEntityUrl(primaryColumnValue)
					: NetworkUtilities.getEntityUrl("Contact", primaryColumnValue);
				relativeUrl = this.Terrasoft.combinePath("Nui", "ViewModule.aspx#" + relativeUrl);
			}
			return this.Terrasoft.combinePath(this.Terrasoft.workspaceBaseUrl, relativeUrl);
		},

		/**
		 * Adds user references in the message / comments.
		 * @param {Object} socialMessage Message / comment, in which users are searched for.
		 */
		addSocialMention: function(socialMessage) {
			this._getNotMentionContacts(socialMessage, function(socialMentionCollection) {
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				this.addSocialMentionContactsToBatchQuery(batchQuery, socialMentionCollection);
				if (batchQuery.queries.length) {
					batchQuery.execute(this.onSocialMentionAdded, this);
				}
			}, this);
		},
		/**
		 * Adds a request to mention contact in messages / comments.
		 * @param {Terrasoft.BatchQuery} batchQuery Request to add a mention for contacts.
		 * @param {Terrasoft.Collection} socialMentionCollection Collection of mentions of users in the message.
		 * @public
		 */
		addSocialMentionContactsToBatchQuery: function(batchQuery, socialMentionCollection) {
			socialMentionCollection.each(function(mention) {
				var insert = this.getSocialMentionInsertQuery(mention);
				batchQuery.add(insert);
			}, this);
			return batchQuery;
		},

		/**
		 * Returns contacts that did not receive a message.
		 * @private
		 * @param {Object} socialMessage Message for which contacts are searched.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		_getNotMentionContacts: function(socialMessage, callback, scope) {
			var contacts = [];
			var socialMentionCollection = this.getSocialMentionsFromMessage(socialMessage);
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SocialMention"
			});
			esq.addColumn("Contact");
			esq.filters.add(esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SocialMessage", socialMessage.id));
			esq.getEntityCollection(function(result) {
				if (result.success) {
					result.collection.each(function(item) {
						var contact = item.get("Contact");
						var contactId = contact && contact.value;
						if (contactId) {
							contacts.push(contactId);
						}
					});
					socialMentionCollection = socialMentionCollection.filter(function(item) {
						if (Terrasoft.contains(contacts, item.contactId)) {
							return false;
						}
						return true;
					});
				}
				Ext.callback(callback, scope, [socialMentionCollection]);
			}, this);
		},
		/**
		 * Returns a collection of user mentions in the message.
		 * @param {Object} socialMessage A message or a comment.
		 * @return {Terrasoft.Collection} A collection of user mentions in the message.
		 */
		getSocialMentionsFromMessage: function(socialMessage) {
			var messageText = socialMessage.message;
			var messageId = socialMessage.id;
			var guidRegExp = "([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})";
			var hrefRegExp = this.Ext.String.format("<a\\s.*?data-value=\"{0}\"\\s.*?>", guidRegExp);
			var regExp = new RegExp(hrefRegExp, "g");
			var socialMentionCollection = this.Ext.create("Terrasoft.Collection");
			var match = regExp.exec(messageText);
			while (match) {
				var contactId = match[1];
				var mention = {
					contactId: contactId,
					messageId: messageId
				};
				socialMentionCollection.add(mention);
				match = regExp.exec(messageText);
			}
			return socialMentionCollection;
		},

		/**
		 * Returns a query for inserting the user mention.
		 * @private
		 * @param {Object} mention An object containing identifiers of the contact and of the message.
		 * @param {String} mention.contactId An identifier of the mentioned user.
		 * @param {String} mention.messageId An identifier of the message where user is mentioned.
		 * @return {Terrasoft.InsertQuery} An inser query.
		 */
		getSocialMentionInsertQuery: function(mention) {
			var insert = this.Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: "SocialMention"
			});
			insert.setParameterValue("Contact", mention.contactId, this.Terrasoft.DataValueType.GUID);
			insert.setParameterValue("SocialMessage", mention.messageId, this.Terrasoft.DataValueType.GUID);
			return insert;
		}
	});

});


