Terrasoft.configuration.Structures["CtiPanelIdentificationUtilities"] = {innerHierarchyStack: ["CtiPanelIdentificationUtilities"]};
define("CtiPanelIdentificationUtilities", ["CtiConstants", "ConfigurationConstants"],
function(CtiConstants, ConfigurationConstants) {

	/**
	 * @class Terrasoft.configuration.mixins.CtiPanelIdentificationUtilities
	 * ###### ############# ######## CTI ######.
	 * @type {Terrasoft.BaseObject}
	 */
	Ext.define("Terrasoft.configuration.mixins.CtiPanelIdentificationUtilities", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.CtiPanelIdentificationUtilities",

		//region Methods: Private

		/**
		 * ######### ######### ################## ## ###### ######### #######, ########## ### ####### ## ####
		 * ######. #### ## ####### ### ########## ######## #######, ## ## ##### ########## ##################
		 * (#### ##### ############## # #######).
		 * @private
		 * @param {Object[]} queryResultSubscribers ###### ################## #########, ########## ### ####### ##
		 * #### ######.
		 * @param {String} [collectionName="IdentifiedSubscriberPanelCollection"] ######## ######### ################
		 * #########, ####### ####### #########.
		 * @param {String} [subscriberKeyName="IdentifiedSubscriberKey"] ######## ######## # ###### ###################
		 * ########.
		 */
		fillSubscribersCollection: function(queryResultSubscribers, collectionName, subscriberKeyName) {
			var number = this.get("CurrentCallNumber");
			if (Ext.isEmpty(number)) {
				return;
			}
			var tempCollection = this.Ext.create("Terrasoft.Collection");
			var panelCollection = this.get(collectionName || "IdentifiedSubscriberPanelCollection");
			panelCollection.clear();
			Terrasoft.each(queryResultSubscribers, function(queryResultSubscriber) {
				if (tempCollection.contains(queryResultSubscriber.SubscriberId)) {
					return;
				}
				var panelConfig = this.getIdentifiedSubscriberPanelConfig(queryResultSubscriber);
				var subscriberPanel = this.createPanelViewModel(panelConfig,
					this.identifiedSubscriberPanelViewModelClass);
				tempCollection.add(queryResultSubscriber.SubscriberId, subscriberPanel);
			}, this);
			panelCollection.loadAll(tempCollection);
			this.setIdentifiedSubscriberOnTheAdvise(panelCollection,
				subscriberKeyName || "IdentifiedSubscriberKey");
		},

		/**
		 * Collects subscribers search data and fills collection of the panels of search results.
		 * @private
		 * @param {Object[]} querySearchResults Array containing subscribers search results from the database selection.
		 * @param {Boolean} [isNextPageLoaded] Flag that indicates whether next subscribers page is loading.
		 */
		fillSearchResultCollection: function(querySearchResults, isNextPageLoaded) {
			var searchResultCollection = new Terrasoft.Collection();
			Terrasoft.each(querySearchResults, function(querySearchResultItem) {
				this.updateSearchResultCollection(searchResultCollection, querySearchResultItem);
			}, this);
			var tempCollection = this.Ext.create("Terrasoft.Collection");
			var viewClass = this.searchResultPanelViewModelClass;
			searchResultCollection.each(function(searchResultItemConfig) {
				var searchResultPanel = this.createPanelViewModel(searchResultItemConfig, viewClass);
				tempCollection.add(searchResultItemConfig.Id, searchResultPanel);
			}.bind(this));
			const panelCollection = this.get("SearchResultPanelCollection");
			if (isNextPageLoaded) {
				if (!tempCollection.isEmpty()) {
					panelCollection.loadAll(tempCollection)
				}
			} else {
				panelCollection.reloadAll(tempCollection);
			}
		},

		/**
		 * Updates the collection of data for found subscribers. The function is grouping the data obtained during
		 * selection from communications tables for customers in such a way that a single subscriber will have a
		 * collection of one or more communications.
		 * @private
		 * @param {Terrasoft.Collection} searchResultCollection Collection of data for found subscribers that should be
		 * updated.
		 * @param {Object} queryResultSubscriber Subscriber data from the database.
		 *
		 */
		updateSearchResultCollection: function(searchResultCollection, queryResultSubscriber) {
			var searchResultPanelConfig = searchResultCollection.find(queryResultSubscriber.SubscriberId);
			var communicationPanelKey = queryResultSubscriber.CommunicationId;
			var communicationPanelConfig = this.getCommunicationPanelConfig(queryResultSubscriber);
			var communicationPanel = this.createPanelViewModel(communicationPanelConfig,
				this.communicationPanelViewModelClass);
			if (!searchResultPanelConfig) {
				searchResultPanelConfig = this.getSearchResultPanelConfig(queryResultSubscriber);
				searchResultCollection.add(queryResultSubscriber.SubscriberId, searchResultPanelConfig);
			}
			if (!searchResultPanelConfig.SubscriberCommunications.contains(communicationPanelKey)) {
				searchResultPanelConfig.SubscriberCommunications.add(communicationPanelKey, communicationPanel);
			}
		},

		/**
		 * Sets the caller as identified if his identifier was saved as desired.
		 * @private
		 * @param {Terrasoft.Collection} subscribers Collection of the identified subscribers.
		 * @param {String} identifiedSubscriberKeyName The name of the property with a key of identified subscriber.
		 */
		setIdentifiedSubscriberOnTheAdvise: function(subscribers, identifiedSubscriberKeyName) {
			var adviseIdentifiedSubscriberInfo = this.get("AdvisedIdentifiedSubscriberInfo");
			if (Ext.isEmpty(adviseIdentifiedSubscriberInfo)) {
				return;
			}
			var adviseIdentifiedSubscriber = adviseIdentifiedSubscriberInfo.customerId;
			if (adviseIdentifiedSubscriber) {
				var identifiedSubscriber = subscribers.find(adviseIdentifiedSubscriber);
				if (identifiedSubscriber) {
					this.set(identifiedSubscriberKeyName, adviseIdentifiedSubscriber);
				}
			}
		},

		/**
		 * Returns the call, corresponding to name of the collection of identifiable subscribers.
		 * @private
		 * @param {String} subscribersCollectionName The name of the collection of identifiable subscribers.
		 * @return {Terrasoft.integration.telephony.Call} Call.
		 */
		getCallBySubscriberCollectionName: function(subscribersCollectionName) {
			var call;
			if (subscribersCollectionName === "IdentifiedSubscriberPanelCollection") {
				call = this.get("CurrentCall");
				if (call) {
					call = this.activeCalls.find(call.id);
				}
			}
			if (subscribersCollectionName === "IdentifiedConsultSubscriberPanelCollection") {
				call = this.findConsultCall();
			}
			return call;
		},

		/**
		 * Adds call relation fields from advised identified subscriber info.
		 * @private
		 * @param {Terrasoft.integration.telephony.Call} call Call.
		 * @param {String} subscriberId Subscriber record Id.
		 */
		addCallRelationFields: function(call, subscriberId) {
			var advisedIdentifiedSubscriberInfo = this.get("AdvisedIdentifiedSubscriberInfo");
 			var isNeedAddFields = !Ext.isEmpty(advisedIdentifiedSubscriberInfo) &&
 				(call.direction === Terrasoft.CallDirection.OUT) &&
 				!Ext.isEmpty(advisedIdentifiedSubscriberInfo.callRelationFields);
 			if (isNeedAddFields) {
				this.Terrasoft.each(advisedIdentifiedSubscriberInfo.callRelationFields, function(field) {
					var name = field.name;
					var value = field.value;
					if (name && value && !call.identificationFieldsData.contains(name)) {
						call.identificationFieldsData.add(name, {value: field.value, name: name, type: field.type});
					}
				}, this);
 				this.set("AdvisedIdentifiedSubscriberInfo", null);
 			}
 		},

		/**
		 * ######### ################# ########## ######## ######.
		 * @private
		 * @param {String} collectionName ######## ######### ################ #########.
		 * @param {String} subscriberId ############# ########.
		 * @param {Boolean} [isManualClear=false] ####### ####### ############## ######## #######.
		 */
		updateCallByIdentifiedSubscriber: function(collectionName, subscriberId, isManualClear) {
			if (!subscriberId && !isManualClear) {
				return;
			}
			var call = this.getCallBySubscriberCollectionName(collectionName);
			if (call) {
				call.identificationFieldsData = this.getCallFieldValuesBySubscriber(collectionName, subscriberId);
				this.addCallRelationFields(call, subscriberId);
				call.needSaveIdentificationData = true;
				this.updateCallByIdentificationData(call);
			}
		},

		/**
		 * ######### ################# ########## ######## ######.
		 * @private
		 * @param {Terrasoft.integration.telephony.Call} call ######.
		 */
		updateCallByIdentificationData: function(call) {
			var databaseId = call.databaseUId;
			var updateFields = call.identificationFieldsData;
			var isStopUpdating = !call.needSaveIdentificationData || !call.isSavedInDB || Ext.isEmpty(databaseId) ||
				Ext.isEmpty(updateFields) || updateFields.isEmpty();
			if (isStopUpdating) {
				return;
			}
			var logMessage = Ext.String.format(this.getResourceString("IdentificationSavingMessage"), call.id);
			var update = this.Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "Call"
			});
			var filters = update.filters;
			var idFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"Id", databaseId);
			filters.add("IdFilter", idFilter);
			var fieldSavingMessageTemplate = this.getResourceString("IdentificationFieldSavingMessage");
			updateFields.each(function(item) {
				var name = item.name;
				var value = item.value;
				update.setParameterValue(name, value, item.type);
				logMessage = logMessage + "\n\t" + Ext.String.format(fieldSavingMessageTemplate, name, value);
			});
			var updateCallback = function(result) {
				if (result.success) {
					logMessage += "\n" + this.getResourceString("IdentificationSavedSuccessfullyMessage");
					this.log(logMessage);
					call.needSaveIdentificationData = false;
				} else {
					logMessage += "\n" + this.getResourceString("IdentificationSavedFailedMessage");
					this.error(logMessage);
				}
				this.fireEvent("callIdentificationSaved", call.id, updateFields,
					!result.success ? logMessage : null);
			}.bind(this);
			update.execute(updateCallback);
		},

		//endregion

		//region Methods: Protected

		/**
		 * ########## ################ ###### # ######### ########## ### ######## ####### ############# #######
		 * ############# # ###### #########.
		 * @protected
		 * @param {Object} queryResultSubscriber ########## ## ################## ########, ########## ##
		 * #### ######.
		 * @return {Object} ################ ###### # ######### ########## ### ######## ####### #############
		 * ####### ############# # ###### #########.
		 */
		getSubscriberPanelCommonConfig: function(queryResultSubscriber) {
			var panelConfig = {
				Id: queryResultSubscriber.SubscriberId,
				Name: queryResultSubscriber.Name,
				Photo: queryResultSubscriber.Photo.value,
				Number: queryResultSubscriber.Number
			};
			switch (queryResultSubscriber.SubscriberType) {
				case CtiConstants.SubscriberTypes.Contact:
					this.fillContactIdentificationData(panelConfig, queryResultSubscriber);
					break;
				case CtiConstants.SubscriberTypes.Account:
					this.fillAccountIdentificationData(panelConfig, queryResultSubscriber);
					break;
				default:
					break;
			}
			return panelConfig;
		},

		/**
		 * ########## ################ ###### ### ######## ###### ############# ###### ################### ########.
		 * @protected
		 * @param {Object} queryResultSubscriber ########## ## ################## ########, ########## ##
		 * #### ######.
		 * @return {Object} ################ ###### ### ######## ###### ############# ###### ###################
		 * ########.
		 */
		getIdentifiedSubscriberPanelConfig: function(queryResultSubscriber) {
			var panelConfig = this.getSubscriberPanelCommonConfig(queryResultSubscriber);
			Ext.apply(panelConfig, {CommunicationType: queryResultSubscriber.CommunicationType.displayValue});
			return panelConfig;
		},

		/**
		 * ########## ################ ###### ### ######## ###### ############# ###### ###### ########.
		 * @protected
		 * @param {Object} queryResultSubscriber ########## ## ################## ########, ########## ##
		 * #### ######.
		 * @return {Object} ################ ###### ### ######## ###### ############# ###### ###### ########.
		 */
		getSearchResultPanelConfig: function(queryResultSubscriber) {
			var panelConfig = this.getSubscriberPanelCommonConfig(queryResultSubscriber);
			Ext.apply(panelConfig, {
				SubscriberCommunications: new Terrasoft.Collection(),
				CtiModel: this
			});
			return panelConfig;
		},

		/**
		 * ########## ################ ###### ### ######## ###### ############# ###### ######## ##### ########.
		 * @protected
		 * @param {Object} queryResultSubscriber ########## ## ################## ########, ########## ##
		 * #### ######.
		 * @return {Object} ################ ###### ### ######## ###### ############# ###### ######## #####
		 * ########.
		 */
		getCommunicationPanelConfig: function(queryResultSubscriber) {
			return {
				Id: queryResultSubscriber.Id,
				Type: queryResultSubscriber.CommunicationType.displayValue,
				Number: queryResultSubscriber.Number,
				SubscriberId: queryResultSubscriber.SubscriberId,
				CtiModel: this,
				IsTelephonyAvailable: this.get("IsTelephonyAvailable")
			};
		},

		/**
		 * ##########, ######## ## ##### ######## ##########.
		 * @param {String} number ##### ########.
		 * @return {Boolean} #### ##### ########## - true, ##### - false.
		 */
		getIsNumberInternal: function(number) {
			if (Ext.isEmpty(number)) {
				return true;
			}
			var ctiSettings = this.get("CtiSettings");
			var internalNumberLength = ctiSettings.internalNumberLength;
			return number.length <= internalNumberLength;
		},

		/**
		 * ########## ### ######## ######### ### ############# ######## ## ###### ########. #### ########## #### #
		 * ###### ## ############# ########### ###### - ## ### ######### "########## #", # ######### ###### ###
		 * ######### "#####".
		 * @protected
		 * @param {String} searchNumber ##### ########.
		 * @return {Terrasoft.ComparisonType} ### ######## #########.
		 */
		getSearchNumberComparisonType: function(searchNumber) {
			if (Ext.isEmpty(searchNumber)) {
				/*throw new Terrasoft.NullOrEmptyException(
					resources.localizableStrings.PhoneNumberCantBeEmptyMessage);*/
				throw new Terrasoft.NullOrEmptyException("PhoneNumberCantBeEmpty");
			}
			var isInternal = this.getIsNumberInternal(searchNumber);
			return (isInternal) ? Terrasoft.ComparisonType.EQUAL : Terrasoft.ComparisonType.START_WITH;
		},

		/**
		 * ############ ####### ####### ##### ######### ############.
		 * @param {Terrasoft.EntitySchemaQuery} query ####### ####### ##### #########.
		 */
		addEmployeeFilter: function(query) {
			var Terrasoft = this.Terrasoft;
			var filterGroup = Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			filterGroup.add("IsUser", Terrasoft.createExistsFilter("[SysAdminUnit:Contact:Contact].Id"));
			filterGroup.add("IsEmployeeType", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Contact.Type", ConfigurationConstants.ContactType.Employee));
			query.filters.add("IsEmployee", filterGroup);
		},

		/**
		 * ######### ###### ############# ######### ## ######.
		 * @protected
		 * @param {String} searchNumber ##### ######## ########.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getContactIdentificationQuery: function(searchNumber) {
			var comparisonType = this.getSearchNumberComparisonType(searchNumber);
			var query = this.getContactQuery("SearchNumber", searchNumber, comparisonType);
			var isInternalNumber = this.getIsNumberInternal(searchNumber);
			if (isInternalNumber) {
				this.addEmployeeFilter(query);
			}
			return query;
		},

		/**
		 * ######### ###### ###### ######### ## #####.
		 * @protected
		 * @param {String} searchName ### ########.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getContactSearchQuery: function(searchName) {
			return this.getContactQuery("Contact.Name", searchName);
		},

		/**
		 * ######### ###### ############# ############ ## ######.
		 * @protected
		 * @param {String} searchNumber ##### ######## ########.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getAccountIdentificationQuery: function(searchNumber) {
			var comparisonType = this.getSearchNumberComparisonType(searchNumber);
			return this.getAccountQuery("SearchNumber", searchNumber, comparisonType);
		},

		/**
		 * ######### ###### ############# ############ ## ######.
		 * @protected
		 * @param {String} searchName ######## ###########.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getAccountSearchQuery: function(searchName) {
			return this.getAccountQuery("Account.Name", searchName);
		},

		/**
		 * ########## ###### ### ####### #########.
		 * @protected
		 * @param {String} searchFieldName ### #### ### ##########.
		 * @param {String} searchValue #### ##########.
		 * @param {Terrasoft.ComparisonType} [comparisonType=Terrasoft.ComparisonType.START_WITH] ### #########.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getContactQuery: function(searchFieldName, searchValue, comparisonType) {
			comparisonType = comparisonType || this.getStringColumnComparisonType();
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "ContactCommunication"});
			esq.isPageable = true;
			esq.rowsOffset = this.$SearchSubscribersRowsOffset;
			esq.rowCount = CtiConstants.IdentificationMaxRowCount;
			esq.addColumn("Id");
			var contactNameColumn = esq.addColumn("Contact.Name", "Name");
			contactNameColumn.orderPosition = 0;
			contactNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			var contactIdColumn = esq.addColumn("Contact.Id", "SubscriberId");
			contactIdColumn.orderPosition = 1;
			contactIdColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			var communicationTypeNameColumn = esq.addColumn("CommunicationType", "CommunicationType");
			communicationTypeNameColumn.orderPosition = 2;
			communicationTypeNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			esq.addColumn("Contact.Type", "Type");
			esq.addColumn("Contact.Account", "Account");
			esq.addColumn("Contact.Job", "Job");
			esq.addColumn("Contact.Department", "Department");
			esq.addColumn("Contact.Photo", "Photo");
			esq.addColumn("Number");
			esq.addParameterColumn(CtiConstants.SubscriberTypes.Contact, Terrasoft.DataValueType.TEXT,
				"SubscriberType");
			esq.filters.addItem(Terrasoft.createIsNotNullFilter(
				Ext.create("Terrasoft.ColumnExpression", {columnPath: "Contact.Id"})));
			esq.filters.add("Search", Terrasoft.createColumnFilterWithParameter(
				comparisonType, searchFieldName, searchValue));
			esq.filters.add("CommunicationCode", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,
				"[ComTypebyCommunication:CommunicationType:CommunicationType].Communication.Code",
				CtiConstants.CommunicationCodes.Phone));
			return esq;
		},

		/**
		 * ########## ###### ### ####### ############.
		 * @protected
		 * @param {String} searchFieldName ### #### ### ##########.
		 * @param {String} searchValue #### ##########.
		 * @param {Terrasoft.ComparisonType} [comparisonType=Terrasoft.ComparisonType.START_WITH] ### #########.
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getAccountQuery: function(searchFieldName, searchValue, comparisonType) {
			comparisonType = comparisonType || this.getStringColumnComparisonType();
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "AccountCommunication"});
			esq.isPageable = true;
			esq.rowsOffset = this.$SearchSubscribersRowsOffset;
			esq.rowCount = CtiConstants.IdentificationMaxRowCount;
			esq.addColumn("Id");
			var accountNameColumn = esq.addColumn("Account.Name", "Name");
			accountNameColumn.orderPosition = 0;
			accountNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			var accountIdColumn = esq.addColumn("Account.Id", "SubscriberId");
			accountIdColumn.orderPosition = 1;
			accountIdColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			var communicationTypeNameColumn = esq.addColumn("CommunicationType", "CommunicationType");
			communicationTypeNameColumn.orderPosition = 2;
			communicationTypeNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
			esq.addColumn("Account.Type", "Type");
			esq.addColumn("Account.City", "City");
			esq.addColumn("Account.Logo", "Photo");
			esq.addColumn("Number");
			esq.addParameterColumn(CtiConstants.SubscriberTypes.Account, Terrasoft.DataValueType.TEXT,
				"SubscriberType");
			esq.filters.addItem(Terrasoft.createIsNotNullFilter(
				Ext.create("Terrasoft.ColumnExpression", {columnPath: "Account.Id"})));
			esq.filters.add("Search", Terrasoft.createColumnFilterWithParameter(
				comparisonType, searchFieldName, searchValue));
			esq.filters.add("CommunicationCode", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,
				"[ComTypebyCommunication:CommunicationType:CommunicationType].Communication.Code",
				CtiConstants.CommunicationCodes.Phone));
			return esq;
		},

		/**
		 * ######### ######## ################# ####### ################### ######## ## ###### ###### # ########,
		 * ########## ## #### ######.
		 * @protected
		 * @param {Object} panelConfig ############ ################### ######## ### ######## ########## ######.
		 * @param {Object} queryResultSubscriber ###### ########, ########## ## #### ######.
		 */
		fillContactIdentificationData: function(panelConfig, queryResultSubscriber) {
			var contactType = queryResultSubscriber.Type.value;
			var isEmployee = (contactType === ConfigurationConstants.ContactType.Employee);
			Ext.apply(panelConfig, {
				Type: (isEmployee)
					? CtiConstants.SubscriberTypes.Employee
					: CtiConstants.SubscriberTypes.Contact,
				AccountName: queryResultSubscriber.Account.displayValue,
				AccountId: queryResultSubscriber.Account.value
			});
			Ext.apply(panelConfig, {Job: queryResultSubscriber.Job.displayValue});
			if (isEmployee) {
				Ext.apply(panelConfig, {Department: queryResultSubscriber.Department.displayValue});
			}
		},

		/**
		 * ######### ######## ################# ####### ################### ######## ## ###### ###### # ###########,
		 * ########## ## #### ######.
		 * @protected
		 * @param {Object} panelConfig ############ ################### ######## ### ######## ########## ######.
		 * @param {Object} queryResultSubscriber ###### ###########, ########## ## #### ######.
		 */
		fillAccountIdentificationData: function(panelConfig, queryResultSubscriber) {
			Ext.apply(panelConfig, {
				Type: CtiConstants.SubscriberTypes.Account,
				AccountType: queryResultSubscriber.Type.displayValue,
				City: queryResultSubscriber.City.displayValue
			});
		},

		/**
		 * ############## ######## ## ######.
		 * @protected
		 * @param {String} number ##### ######## ######.
		 * @param {String} [collectionName] ######## ######### ################ #########.
		 * @param {String} [subscriberKeyName] ######## ######## # ###### ################### ########.
		 * @param {Function} [callback] ####### ######### ######.
		 * @param {Object[]} callback.subscribers ###### ################## #########.
		 * @param {String} [callback.collectionName] ######## ######### ################ #########.
		 * @param {String} [callback.subscriberKeyName] ######## ######## # ###### ###################
		 * ########.
		 */
		identifySubscriber: function(number, collectionName, subscriberKeyName, callback) {
			if (Ext.isEmpty(number)) {
				return;
			}
			var reverseNumber = Terrasoft.utils.common.reverseStr(number);
			var ctiSettings = this.get("CtiSettings");
			var searchNumberLength = ctiSettings.searchNumberLength;
			var internalNumberLength = ctiSettings.internalNumberLength;
			if (internalNumberLength > 0 && searchNumberLength > internalNumberLength) {
				reverseNumber = reverseNumber.substring(0, searchNumberLength);
			}
			this.querySubscribersByPhoneNumber(reverseNumber, function(phoneNumber, response) {
				if (!(response && response.success)) {
					return;
				}
				var queryResultSubscribers = [];
				Terrasoft.each(response.queryResults, function(queryResult) {
					queryResultSubscribers = queryResultSubscribers.concat(queryResult.rows);
				});
				if (callback) {
					callback(queryResultSubscribers, collectionName, subscriberKeyName);
				} else {
					this.fillSubscribersCollection(queryResultSubscribers, collectionName,
						subscriberKeyName);
				}
			}.bind(this, number));
		},

		/**
		 * Searches subscribers by primary field to display.
		 * @protected
		 * @param {String} searchString String for search.
		 * @param {Boolean} [isNextPageLoaded] Flag that indicates whether next subscribers page is loading.
		 */
		searchSubscriberByPrimaryColumnValue: function(searchString, isNextPageLoaded) {
			if (!isNextPageLoaded) {
				this.$SearchSubscribersRowsOffset = 0;
			}
			if (Ext.isEmpty(searchString)) {
				this.fillSearchResultCollection([], searchString);
				return;
			}
			var phoneNumberEdit = Ext.getCmp("PhoneNumber");
			var maskId = Terrasoft.Mask.show({
				selector: phoneNumberEdit.selectors.wrapEl,
				frameVisible: false,
				caption: ""
			});
			this.querySubscribersBySearchName(searchString, function(response) {
				Terrasoft.Mask.hide(maskId);
				var searchResultPanelCollection = this.get("SearchResultPanelCollection");
				if (!(response && response.success)) {
					this.set("IsSearchFinishedAndResultEmpty", searchResultPanelCollection.isEmpty());
					return;
				}
				var currentPhoneNumberValue = phoneNumberEdit.getTypedValue();
				if (currentPhoneNumberValue !== searchString) {
					this.set("IsSearchFinishedAndResultEmpty", false);
					return;
				}
				if (!this.isSearchValueValid(currentPhoneNumberValue)) {
					this.clearSearchSubscriber();
					this.set("IsSearchFinishedAndResultEmpty", false);
					return;
				}
				var querySearchResult = [];
				Terrasoft.each(response.queryResults, function(queryResult) {
					querySearchResult = querySearchResult.concat(queryResult.rows);
				});
				this.fillSearchResultCollection(querySearchResult, isNextPageLoaded);
				var isSearchResultPanelCollectionEmpty = searchResultPanelCollection.isEmpty();
				this.set("IsSearchFinishedAndResultEmpty", isSearchResultPanelCollectionEmpty);
			}.bind(this));
		},

		/**
		 * Clears collection of search result panels by primary field for display.
		 * @protected
		 */
		clearSearchSubscriber: function() {
			var searchResultPanelCollection = this.get("SearchResultPanelCollection");
			searchResultPanelCollection.clear();
		},

		/**
		 * Requests subscribers data by phone number.
		 * @protected
		 * @param {String} searchNumber Phone number.
		 * @param {Function} callback Callback function.
		 * @param {Object} callback.response Data selection result.
		 */
		querySubscribersByPhoneNumber: function(searchNumber, callback) {
			var bq = Ext.create("Terrasoft.BatchQuery");
			this.getIdentificationQueries(bq, searchNumber);
			bq.execute(callback);
		},

		/**
		 * ########### ## ## ###### ## ######### ## ##### ######.
		 * @protected
		 * @param {String} searchName ######## ##### ### ###### #########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} callback.response ######### ####### ######.
		 */
		querySubscribersBySearchName: function(searchName, callback) {
			var bq = Ext.create("Terrasoft.BatchQuery");
			this.getSearchQueries(bq, searchName);
			bq.execute(callback);
		},

		/**
		 * ######### ##### ######## ### ####### ###### ## ######### ### ###### ## ###### ########.
		 * @private
		 * @param {Terrasoft.BatchQuery} bq ##### ########.
		 * @param {String} searchNumber ##### ######## ########.
		 */
		getIdentificationQueries: function(bq, searchNumber) {
			bq.add(this.getContactIdentificationQuery(searchNumber));
			bq.add(this.getAccountIdentificationQuery(searchNumber));
		},

		/**
		 * ######### ##### ######## ### ####### ###### ## ######### ### ###### ## #####.
		 * @private
		 * @param {Terrasoft.BatchQuery} bq ##### ########.
		 * @param {String} searchName ######## ##### ### ###### #########.
		 */
		getSearchQueries: function(bq, searchName) {
			bq.add(this.getContactSearchQuery(searchName));
			bq.add(this.getAccountSearchQuery(searchName));
		},

		/**
		 * ############# ############# ########## ######## ##################.
		 * @param {String} subscriberId ############# ###### ########.
		 * @throws {Terrasoft.ItemNotFoundException} ####### ##########, #### # ######### ##################
		 * ######### ## #### ######## ###### ########.
		 */
		setIdentifiedSubscriber: function(subscriberId) {
			var isConsulting = this.get("IsConsulting");
			var identifiedSubscriberKeyPropertyName = isConsulting
				? "IdentifiedConsultSubscriberKey"
				: "IdentifiedSubscriberKey";
			var panelCollection = isConsulting
				? this.get("IdentifiedConsultSubscriberPanelCollection")
				: this.get("IdentifiedSubscriberPanelCollection");
			var subscriberExists = panelCollection.contains(subscriberId);
			if (!subscriberExists) {
				/*var errorMessage = Ext.String.format(
					resources.localizableStrings.SubscriberPanelNotFoundExceptionMessage, subscriberId);*/
				var errorMessage = "SubscriberPanelNotFoundException " + subscriberId;
				throw new Terrasoft.ItemNotFoundException({message: errorMessage});
			}
			this.set(identifiedSubscriberKeyPropertyName, subscriberId);
		},

		/**
		 * Drops the identified subscriber from current call and displays a list of previously identified callers to the
		 * user.
		 * @private
		 */
		clearSubscriber: function() {
			this.set("IdentifiedSubscriberKey", null);
			this.updateCallByIdentifiedSubscriber("IdentifiedSubscriberPanelCollection", null, true);
		},

		/**
		 * Drops the identified subscriber from consult call and displays a list of previously identified callers to the
		 * user.
		 * @private
		 */
		clearConsultSubscriber: function() {
			this.set("IdentifiedConsultSubscriberKey", null);
			this.updateCallByIdentifiedSubscriber("IdentifiedConsultSubscriberPanelCollection", null, true);
		},

		/**
		 * ##########, ############ ## ############ ######### # ############ ############# ########. ############
		 * ######### ######## ########## # ############ ############# ## ######### # ################# ######, #
		 * ###### #### #####, #### ##### #### ## #### ## ###.
		 * @protected
		 * @return {Boolean} ############ ######### # ############ ############# ######## ######.
		 */
		getIsIdentificationGroupContainerVisible: function() {
			var isConsult = this.get("IsConsulting");
			var keyPropertyName = isConsult ? "IdentifiedConsultSubscriberKey" : "IdentifiedSubscriberKey";
			var countPropertyName = isConsult ? "IdentifiedConsultSubscribersCount" : "IdentifiedSubscribersCount";
			return this.isIdentificationContainerVisible(countPropertyName, keyPropertyName);
		},

		/**
		 * Gets if current call customers identification results are visible.
		 * @protected
		 * @return {Boolean} Are the results of customers identification visible.
		 */
		getIsCurrentCallIdentificationContainerVisible: function() {
			var isConsult = this.get("IsConsulting");
			if (isConsult === true) {
				return false;
			}
			return this.isIdentificationContainerVisible("IdentifiedSubscribersCount", "IdentifiedSubscriberKey");
		},

		/**
		 * Gets if consult call customers identification results are visible.
		 * @protected
		 * @return {Boolean} Sign if results of customers identification are visible.
		 */
		getIsConsultCallIdentificationContainerVisible: function() {
			var isConsult = this.get("IsConsulting");
			if (isConsult !== true) {
				return false;
			}
			return this.isIdentificationContainerVisible("IdentifiedConsultSubscribersCount",
				"IdentifiedConsultSubscriberKey");
		},

		/**
		 * ##########, ############ ## ########## ############# ######## # ########### ## ########## ######### ##
		 * ###### ######### # #### ## ##### ### ################## #######.
		 * @protected
		 * @param {String} subscribersCountPropertyName ######## ########, ### ######## ##########
		 * ################## #########.
		 * @param {String} subscriberKeyPropertyName ######## ########, ### ######## #############
		 * ################### ########.
		 * @return {Boolean} ########## ############# ######## ######.
		 */
		isIdentificationContainerVisible: function(subscribersCountPropertyName, subscriberKeyPropertyName) {
			var identifiedSubscriberKey = this.get(subscriberKeyPropertyName);
			if (identifiedSubscriberKey) {
				return false;
			}
			var subscribersCount = this.get(subscribersCountPropertyName);
			var canNotMakeAnyCalls = !this.getCanMakeCallOrMakeConsultCallOrGetIsOffline();
			return (subscribersCount > 0) && canNotMakeAnyCalls;
		},

		/**
		 * Gets if string is valid for subscribers search process by the primary field to display.
		 * @param {String} searchString Search string.
		 * @return {Boolean} Is search string is valid.
		 * @protected
		 */
		isSearchValueValid: function(searchString) {
			if (searchString.replace(/_|%/g, "").length < CtiConstants.IdentificationMinSymbolCount) {
				return false;
			}
			var regExp = /[^&]+/;
			var match = searchString.match(regExp);
			var isValid = !Ext.isEmpty(match) && (match.length === 1) && (match[0] === searchString);
			return isValid;
		},

		/**
		 * ##########, ######## ## ######## ########## ####### ########.
		 * @param {String} value ######## ### ########.
		 * @return {Boolean} true, #### ######## ######## ########## ####### ########, ##### - false.
		 */
		isPhoneNumberValid: function(value) {
			if (!value) {
				return false;
			}
			var regExp = /[\d\s\(\)\+\-\*#]+/;
			var match = value.match(regExp);
			return match && (match.length === 1) && (match[0] === value);
		},

		/**
		 * ####### # ########## ###### ################### ######## ## ######### ################## #########.
		 * @param {String} [collectionName="IdentifiedSubscriberPanelCollection"] ######## ######### ##################
		 * #########.
		 * @param {String} [subscriberKeyName="IdentifiedSubscriberKey"] ######## ######## # ###### ###################
		 * ########.
		 * @return {Object} ###### ############# ###### ################### ########.
		 */
		getIdentifiedSubscriberPanel: function(collectionName, subscriberKeyName) {
			var identifiedSubscriberKey = this.get(subscriberKeyName || "IdentifiedSubscriberKey");
			if (!identifiedSubscriberKey) {
				return null;
			}
			var panelCollection = this.get(collectionName || "IdentifiedSubscriberPanelCollection");
			return panelCollection.find(identifiedSubscriberKey);
		},

		/**
		 * ########## ######### ##### ### ########## ###### ## ################### ########.
		 * @param {String} subscribersCollectionName ######## ######### ####### ################## #########.
		 * @param {String} subscriberId ############# ########.
		 * @return {Terrasoft.Collection} ######### ##### ### ##########.
		 */
		getCallFieldValuesBySubscriber: function(subscribersCollectionName, subscriberId) {
			var updateFields = new Terrasoft.Collection();
			var contactId, contactName, accountId, accountName;
			var subscriberPanelCollection = this.get(subscribersCollectionName);
			var subscriberPanel = subscriberPanelCollection.find(subscriberId);
			if (subscriberPanel) {
				var subscriberType = subscriberPanel.get("Type");
				switch (subscriberType) {
					case CtiConstants.SubscriberTypes.Account:
						accountId = subscriberId;
						accountName = subscriberPanel.get("Name");
						break;
					case CtiConstants.SubscriberTypes.Contact:
					case CtiConstants.SubscriberTypes.Employee:
						contactId = subscriberId;
						contactName = subscriberPanel.get("Name");
						accountId = subscriberPanel.get("AccountId");
						accountName = subscriberPanel.get("AccountName");
						break;
					default:
						return updateFields;
				}
			}
			updateFields.add("Account", {
				name: "Account",
				value: accountId,
				displayValue: accountName,
				type: Terrasoft.DataValueType.GUID
			});
			updateFields.add("Contact", {
				name: "Contact",
				value: contactId,
				displayValue: contactName,
				type: Terrasoft.DataValueType.GUID
			});
			return updateFields;
		}

		//endregion

	});
});


