Terrasoft.configuration.Structures["CtiPanelCommunicationHistoryUtilities"] = {innerHierarchyStack: ["CtiPanelCommunicationHistoryUtilities"]};
define("CtiPanelCommunicationHistoryUtilities", ["CtiPanelCommunicationHistoryUtilitiesResources", "CtiConstants",
			"ConfigurationConstants"],
		function(resources, CtiConstants, ConfigurationConstants) {

			/**
			 * @class Terrasoft.configuration.mixins.CtiPanelCommunicationHistoryUtilities
			 * Call history mixin.
			 * @type {Terrasoft.BaseObject}
			 */
			Ext.define("Terrasoft.configuration.mixins.CtiPanelCommunicationHistoryUtilities", {
				extend: "Terrasoft.core.BaseObject",
				alternateClassName: "Terrasoft.CtiPanelCommunicationHistoryUtilities",

				//region Methods: Private

				/**
				 * Generates the displayed value call date.
				 * @private
				 * @param {Date} callDate #### ######.
				 * @returns {String} ############ ######## #### ######.
				 */
				getCallDateString: function(callDate) {
					if (Ext.isEmpty(callDate)) {
						return "";
					}
					var isTodayDate = (new Date().toDateString() === callDate.toDateString());
					var dateType = (isTodayDate) ? Terrasoft.DataValueType.TIME : Terrasoft.DataValueType.DATE_TIME;
					return Terrasoft.getTypedStringValue(callDate, dateType);
				},

				/**
				 * Generates a collection of stories panel calls.
				 * @private
				 * @param {Function} callback ####### ######### ######.
				 */
				queryCommunicationHistory: function(callback) {
					var esq = this.getCommunicationHistoryQuery();
					esq.execute(callback);
				},

				/**
				 * Returns the type of call element calls history.
				 * @param {Terrasoft.integration.telephony.Call} call ######.
				 * @return {CtiConstants.CallType} Call type.
				 */
				getHistoryCallType: function(call) {
					if (call.direction === Terrasoft.CallDirection.OUT) {
						return CtiConstants.CallType.OUTGOING;
					} else {
						var inactiveStates = [Terrasoft.GeneralizedCallState.NONE, Terrasoft.GeneralizedCallState.ALERTING,
							Terrasoft.GeneralizedCallState.UNKNOWN, Terrasoft.GeneralizedCallState.BUSY];
						var isInactiveCall = inactiveStates.indexOf(call.state) !== -1;
						return isInactiveCall ? CtiConstants.CallType.MISSED : CtiConstants.CallType.INCOMING;
					}
				},

				/**
				 * ######## # ######### ###### ### ########### css-########## ## ######-########## replaceString.
				 * @param {String} string ######### ######.
				 * @param {String} replaceString ######, ####### ####### ######## ###########.
				 * @return {String} ######### ###### ### ############.
				 */
				replaceCssSelectorSpecialSymbols: function(string, replaceString) {
					return string.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, replaceString);
				},

				/**
				 * Returns history panel config by call identification fields.
				 * @param {Terrasoft.Collection} identificationFieldsData Identification Fields.
				 * @return {Object} History panel config.
				 */
				getHistoryPanelConfigByIdentificationFields: function(identificationFieldsData) {
					var panelConfig = {};
					identificationFieldsData.each(function(item) {
						if (!item.value) {
							panelConfig[item.name] = null;
							return;
						}
						panelConfig[item.name] = {
							value: item.value,
							displayValue: item.displayValue
						};
					});
					return panelConfig;
				},

				/**
				 * Set suspend events state for all collection items.
				 * @param {Terrasoft.Collection} collection Collection.
				 * @param {Boolean} isSuspend Is suspend state.
				 */
				setSuspendEventsStateForCollectionItems: function(collection, isSuspend) {
					collection.each(function(item) {
						if (isSuspend) {
							item.suspendEvents();
						} else {
							item.resumeEvents();
						}
					});
				},

				//endregion

				//region Methods: Protected

				/**
				 * Adds communication relation columns.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Communication history query.
				 */
				addCommunicationHistoryRelationColumns: function(esq) {
					var entitySchema = this.get("EntityConnectionSchema");
					if (Ext.isEmpty(entitySchema)) {
						return;
					}
					var entitySchemaName = entitySchema.name;
					var entityConnectionColumns = this.get("EntityConnectionColumnList");
					this.Terrasoft.each(entityConnectionColumns, function(columnName) {
						if (!esq.columns.contains(columnName)) {
							var columnsPath = this.Ext.String.format("{0}.{1}", entitySchemaName, columnName);
							esq.addColumn(columnsPath, columnName);
						}
					}, this);
				},

				/**
				 * Adds contact type column to communication history query.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Communication history query.
				 */
				addContactTypeColumn: function(esq) {
					var typeColumnName = null;
					var entityStructure = this.getEntityStructure("Contact");
					if (entityStructure) {
						Terrasoft.each(entityStructure.pages, function(editPage) {
							if (editPage.typeColumnName) {
								typeColumnName = editPage.typeColumnName;
							}
							return false;
						}, this);
					}
					if (this.Ext.isEmpty(typeColumnName)) {
						return;
					}
					var columnName = Ext.String.format("Call.Contact.{0}", typeColumnName);
					if (!esq.columns.contains(columnName)) {
						esq.addColumn(columnName);
					}
					this.set("TypeColumnName", columnName);
				},

				/**
				 * Adds columns to communication history query.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Communication history query.
				 */
				addCommunicationHistoryQueryColumns: function(esq) {
					esq.addColumn("Id");
					var dateColumn = esq.addColumn("Call.CreatedOn", "CallDate");
					dateColumn.orderPosition = 0;
					dateColumn.orderDirection = Terrasoft.OrderDirection.DESC;
					esq.addColumn("Call.Contact", "Contact");
					esq.addColumn("Call.Contact.Photo", "ContactPhoto");
					esq.addColumn("Call.Contact.Department", "ContactDepartment");
					esq.addColumn("Call.Contact.Job", "ContactJob");
					esq.addColumn("Call.Contact.Type", "ContactType");
					this.addContactTypeColumn(esq);
					esq.addColumn("Call.Account", "Account");
					esq.addColumn("Call.Account.Type", "AccountType");
					esq.addColumn("Call.Account.City", "AccountCity");
					esq.addColumn("Call.Direction", "Direction");
					esq.addColumn("Call.CallerId", "CallerId");
					esq.addColumn("Call.CalledId", "CalledId");
					esq.addColumn("Call.TalkTime", "TalkTime");
					esq.addColumn("Call.EndDate", "EndDate");
					this.addCommunicationHistoryRelationColumns(esq);
				},

				/**
				 * Returns call history query.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} Call history query.
				 */
				getCommunicationHistoryQuery: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "VwRecentCall"});
					var ctiSettings = this.get("CtiSettings");
					esq.rowCount = ctiSettings.communicationHistoryRowCount;
					this.addCommunicationHistoryQueryColumns(esq);
					esq.filters.add("CurrentUserFilter", esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "CreatedById", Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
					return esq;
				},

				/**
				 * Fills call history collection.
				 * @protected
				 * @param {Object[]} queryResultHistorySubscribers Call history array.
				 */
				fillCommunicationHistoryPanelCollection: function(queryResultHistorySubscribers) {
					var tempCollection = this.Ext.create("Terrasoft.Collection");
					queryResultHistorySubscribers.each(function(queryResultHistorySubscriber) {
						var panelConfig = this.getHistoryPanelConfig(queryResultHistorySubscriber);
						var subscriberPanel = this.createPanelViewModel(panelConfig,
							this.communicationHistoryPanelViewModelClass);
						var typeColumnValue = null;
						var typeColumnName = this.get("TypeColumnName");
						if (!this.Ext.isEmpty(typeColumnName)) {
							typeColumnValue = queryResultHistorySubscriber.get(typeColumnName);
						}
						if (!this.Ext.isEmpty(typeColumnValue)) {
							subscriberPanel.set("TypeColumnValue", typeColumnValue.value);
						}
						tempCollection.add(queryResultHistorySubscriber.get("Id"), subscriberPanel);
					}, this);
					var panelCollection = this.get("CommunicationHistoryPanelCollection");
					panelCollection.clear();
					this.setSuspendEventsStateForCollectionItems(tempCollection, true);
					try {
						panelCollection.loadAll(tempCollection);
					} finally {
						this.setSuspendEventsStateForCollectionItems(panelCollection, false);
					}
				},

				/**
				 * ########## ################ ###### ### ######## ###### ############# ###### ####### #######.
				 * @protected
				 * @param {Object} historySubscriber ########## ## ########.
				 * @return {Object} ################ ###### ### ######## ###### ############# ###### ####### #######.
				 */
				getHistoryPanelConfig: function(historySubscriber) {
					var callDirection = historySubscriber.get("Direction").value;
					var isOutgoingCall = (callDirection === Terrasoft.CallDirection.OUT);
					var number = isOutgoingCall ? historySubscriber.get("CalledId") : historySubscriber.get("CallerId");
					var callType;
					if (isOutgoingCall) {
						callType = CtiConstants.CallType.OUTGOING;
					} else {
						callType = historySubscriber.get("EndDate") && (historySubscriber.get("TalkTime") === 0)
							? CtiConstants.CallType.MISSED
							: CtiConstants.CallType.INCOMING;
					}
					var queryResultContact = historySubscriber.get("Contact");
					var queryResultAccount = historySubscriber.get("Account");
					var databaseUId = historySubscriber.get("Id");
					var panelConfig = {
						Id: databaseUId,
						DatabaseUId: databaseUId,
						CallDate: this.getCallDateString(historySubscriber.get("CallDate")),
						Number: number,
						CallType: callType
					};
					this.applyCallRelationHistoryPanelConfig(panelConfig, historySubscriber);
					if (queryResultContact) {
						Ext.apply(panelConfig, {
							SubscriberId: queryResultContact.value,
							Name: queryResultContact.displayValue,
							Photo: historySubscriber.get("ContactPhoto").value
						});
						var contactType = historySubscriber.get("ContactType").value;
						var isEmployee = (contactType === ConfigurationConstants.ContactType.Employee);
						if (isEmployee) {
							this.applyEmployeeHistoryPanelConfig(panelConfig, historySubscriber);
						} else {
							this.applyContactHistoryPanelConfig(panelConfig, historySubscriber);
						}
					} else if (queryResultAccount) {
						panelConfig.SubscriberId = queryResultAccount.value;
						panelConfig.Name = queryResultAccount.displayValue;
						this.applyAccountHistoryPanelConfig(panelConfig, historySubscriber);
					}
					return panelConfig;
				},

				/**
				 * Applies call relation column values to history panel configuration object.
				 * @protected
				 * @param {Object} panelConfig History panel configuration object.
				 * @param {Object} [historySubscriber] Subscriber information object.
				 * */
				applyCallRelationHistoryPanelConfig: function(panelConfig, historySubscriber) {
					var relationColumns = this.Terrasoft.deepClone(this.get("EntityConnectionColumnList"));
					var relationColumnsConfig = {EntityConnectionColumnList: this.Terrasoft.deepClone(relationColumns)};
					if (!Ext.isEmpty(historySubscriber)) {
						this.Terrasoft.each(relationColumns, function(columnName) {
							relationColumnsConfig[columnName] = historySubscriber.get(columnName);
						});
					}
					Ext.apply(panelConfig, relationColumnsConfig);
				},

				/**
				 * ######### ################ ###### ######## # ##### "#######".
				 * @protected
				 * @param {Object} panelConfig ################ ###### ### ######## ###### ############# ###### #######
				 * #######.
				 * @param {Object} historySubscriber ########## ## ########.
				 * */
				applyContactHistoryPanelConfig: function(panelConfig, historySubscriber) {
					Ext.apply(panelConfig, {
						Type: CtiConstants.SubscriberTypes.Contact
					});
					var fields = {
						Job: "ContactJob"
					};
					this.applyHistoryPanelConfig(panelConfig, historySubscriber, fields);
				},

				/**
				 * ######### ################ ###### ######## # ##### "#########".
				 * @protected
				 * @param {Object} panelConfig ################ ###### ### ######## ###### ############# ###### #######
				 * #######.
				 * @param {Object} historySubscriber ########## ## ########.
				 * */
				applyEmployeeHistoryPanelConfig: function(panelConfig, historySubscriber) {
					Ext.apply(panelConfig, {
						Type: CtiConstants.SubscriberTypes.Employee
					});
					var fields = {
						Department: "ContactDepartment",
						Job: "ContactJob"
					};
					this.applyHistoryPanelConfig(panelConfig, historySubscriber, fields);
				},

				/**
				 * ######### ################ ###### ######## # ##### "##########".
				 * @protected
				 * @param {Object} panelConfig ################ ###### ### ######## ###### ############# ###### #######
				 * #######.
				 * @param {Object} historySubscriber ########## ## ########.
				 */
				applyAccountHistoryPanelConfig: function(panelConfig, historySubscriber) {
					Ext.apply(panelConfig, {
						Type: CtiConstants.SubscriberTypes.Account
					});
					var fields = {
						AccountType: "AccountType",
						City: "AccountCity"
					};
					this.applyHistoryPanelConfig(panelConfig, historySubscriber, fields);
				},

				/**
				 * ######### #### ######## # ################# ####### ### ######## ###### ############# ###### #######
				 * #######.
				 * @protected
				 * @param {Object} panelConfig ################ ###### ### ######## ###### ############# ###### #######
				 * #######.
				 * @param {Object} historySubscriber ########## ## ########.
				 * @param {Object} fields #### ########, ### #### - ### ######## ###### #######, ######## - ####
				 * ######## # ####### "########## ## #######".
				 */
				applyHistoryPanelConfig: function(panelConfig, historySubscriber, fields) {
					var historySubscriberKey, historySubscriberValue, value, attribute;
					for (var field in fields) {
						if (!fields.hasOwnProperty(field)) {
							continue;
						}
						historySubscriberKey = fields[field];
						if (Ext.isFunction(historySubscriber.get)) {
							historySubscriberValue = historySubscriber.get(historySubscriberKey);
							if (!historySubscriberValue) {
								continue;
							}
							value = historySubscriberValue.displayValue;
						} else {
							value = historySubscriber[historySubscriberKey];
						}
						if (!value) {
							continue;
						}
						attribute = {};
						attribute[field] = value;
						Ext.apply(panelConfig, attribute);
					}
				},

				/**
				 * ######### ######## ############### ######## # ###### #############.
				 * @protected
				 * @param {Object} panelConfig ################ ###### ### ######## ###### ############# ###### #######
				 * #######.
				 * @param {Object} historySubscriber ########## ## ########.
				 * @param {String} number ##### ########.
				 * @deprecated
				 */
				applyUndefinedSubscriberValues: function(panelConfig, historySubscriber, number) {
					Ext.apply(panelConfig, {
						Name: number
					});
				},

				/**
				 * ########## ############ ###### ####### ####### ## ###### ############# ########.
				 * @param {Object} subscriberData ########## ## ######## (##. @link CtiPanel#event-subscriberIdentified)
				 * @return {{
				 * SubscriberId: String,
				 * Name: String,
				 * Number: String,
				 * [Photo]: String,
				 * [ContactJob]: String,
				 * [ContactDepartment]: String,
				 * [AccountType]: String,
				 * [AccountCity]: String}} ############ ######.
				 */
				getHistoryPanelConfigBySubscriberIdentificationData: function(subscriberData) {
					var panelConfig = {
						SubscriberId: subscriberData.Id,
						Name: subscriberData.Name,
						Number: subscriberData.Number
					};
					switch (subscriberData.Type) {
						case CtiConstants.SubscriberTypes.Contact:
							panelConfig.Photo = subscriberData.Photo;
							this.applyContactHistoryPanelConfig(panelConfig, {
								ContactJob: subscriberData.Job
							});
							break;
						case CtiConstants.SubscriberTypes.Employee:
							panelConfig.Photo = subscriberData.Photo;
							this.applyEmployeeHistoryPanelConfig(panelConfig, {
								ContactDepartment: subscriberData.Department,
								ContactJob: subscriberData.Job
							});
							break;
						case CtiConstants.SubscriberTypes.Account:
							this.applyAccountHistoryPanelConfig(panelConfig, {
								AccountType: subscriberData.AccountType,
								AccountCity: subscriberData.City
							});
							break;
						default:
							break;
					}
					return panelConfig;
				},

				/**
				 * ####### ###### ############# ######## # ###### ####### #######.
				 * @protected
				 * @param {Object} subscriberPanel ###### ####### #######.
				 */
				clearHistoryPanelSubscriberIdentificationData: function(subscriberPanel) {
					subscriberPanel.set({
						SubscriberId: null,
						Name: subscriberPanel.get("Number"),
						Type: null,
						Photo: null,
						ContactDepartment: null,
						ContactJob: null,
						AccountType: null,
						AccountCity: null
					});
					subscriberPanel.set("Account", null);
					subscriberPanel.set("Contact", null);
				},

				/**
				 * ######### ####### ##### ########### ###### ######.
				 * @protected
				 * @param {Terrasoft.integration.telephony.Call} call ######.
				 */
				updateHistoryOnNewCall: function(call) {
					var callId = call.id;
					var panelCollection = this.get("CommunicationHistoryPanelCollection");
					if (panelCollection.contains(callId)) {
						return;
					}
					var subscriberNumber = call.getAbonentNumber();
					if (!subscriberNumber) {
						return;
					}
					var panelConfig = {
						Id: this.replaceCssSelectorSpecialSymbols(callId, "-"),
						DatabaseUId: call.databaseUId,
						SubscriberId: null,
						CallDate: this.getCallDateString(new Date()),
						Number: subscriberNumber,
						CallType: this.getHistoryCallType(call),
						Name: subscriberNumber
					};
					this.applyCallRelationHistoryPanelConfig(panelConfig);
					var subscriberPanel = this.createPanelViewModel(panelConfig,
						this.communicationHistoryPanelViewModelClass);
					panelCollection.insert(0, callId, subscriberPanel);
				},

				/**
				 * Updates the history item after call saved in a database.
				 * @protected
				 * @param {Terrasoft.integration.telephony.Call} call The call.
				 */
				updateHistoryOnCallSaved: function(call) {
					var panelCollection = this.get("CommunicationHistoryPanelCollection");
					var subscriberPanel = panelCollection.find(call.id);
					if (!subscriberPanel) {
						return;
					}
					subscriberPanel.set("DatabaseUId", call.databaseUId);
				},

				/**
				 * ######### ####### ##### ############# ######## ######.
				 * @protected
				 * @param {String} callId ############# ######.
				 * @param {Object} subscriberData ########## ## ######## (##. @link CtiPanel#event-subscriberIdentified)
				 */
				updateHistoryOnSubscriberIdentified: function(callId, subscriberData) {
					var panelCollection = this.get("CommunicationHistoryPanelCollection");
					var subscriberPanel = panelCollection.find(callId);
					if (!subscriberPanel) {
						return;
					}
					if (!subscriberData) {
						this.clearHistoryPanelSubscriberIdentificationData(subscriberPanel);
						return;
					}
					var panelConfig = this.getHistoryPanelConfigBySubscriberIdentificationData(subscriberData);
					var call = this.activeCalls.find(callId);
					if (!Ext.isEmpty(call)) {
						var panelConfigByIdentificationFields =
								this.getHistoryPanelConfigByIdentificationFields(call.identificationFieldsData);
						Ext.apply(panelConfig, panelConfigByIdentificationFields);
					}
					subscriberPanel.suspendEvents();
					try {
						for (var property in panelConfig) {
							if (!panelConfig.hasOwnProperty(property) || (property === "Id")) {
								continue;
							}
							subscriberPanel.set(property, panelConfig[property]);
						}
					} finally {
						subscriberPanel.resumeEvents();
					}
				},

				/**
				 * ######### ####### ##### ###### ######### ## ######.
				 * @protected
				 * @param {Terrasoft.integration.telephony.Call} call ######.
				 */
				updateHistoryOnCommutationStarted: function(call) {
					var callId = call.id;
					var panelCollection = this.get("CommunicationHistoryPanelCollection");
					var subscriberPanel = panelCollection.find(callId);
					if (!subscriberPanel) {
						return;
					}
					if (subscriberPanel.get("CallType") !== CtiConstants.CallType.MISSED) {
						return;
					}
					subscriberPanel.set("CallType", this.getHistoryCallType(call));
				},

				/**
				 * ######### ####### ##### ########## ######.
				 * @protected
				 * @param {Terrasoft.integration.telephony.Call} call ######.
				 */
				updateHistoryOnCallFinished: function(call) {
					var callId = call.id;
					var panelCollection = this.get("CommunicationHistoryPanelCollection");
					var subscriberPanel = panelCollection.find(callId);
					if (!subscriberPanel) {
						return;
					}
					var subscriberId = subscriberPanel.get("SubscriberId");
					var type = subscriberPanel.get("Type");
					var subscriberName = subscriberPanel.getPrimaryDisplayValue();
					var keysToRemove = [];
					panelCollection.eachKey(function(key, item) {
						if (key === callId) {
							return;
						}
						if (type && (item.get("Type") !== type || item.get("SubscriberId") !== subscriberId)) {
							return;
						}
						if (item.getPrimaryDisplayValue() !== subscriberName) {
							return;
						}
						keysToRemove.push(key);
					});
					keysToRemove.forEach(function(key) {
						panelCollection.removeByKey(key);
					});
				},

				//endregion

				//region Methods: Public

				/**
				 * ######### ######### ####### ####### #######.
				 */
				loadCommunicationHistory: function() {
					this.queryCommunicationHistory(function(response) {
						if (!(response && response.success)) {
							this.error(resources.localizableStrings.HistoryLoadError);
							var panelCollection = this.get("CommunicationHistoryPanelCollection");
							panelCollection.clear();
							return;
						}
						this.fillCommunicationHistoryPanelCollection(response.collection);
					}.bind(this));
				}

				//endregion

			});
		});


