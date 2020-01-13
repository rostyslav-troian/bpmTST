Terrasoft.configuration.Structures["EmailsSearchMixin"] = {innerHierarchyStack: ["EmailsSearchMixin"]};
define("EmailsSearchMixin", ["EmailHelper"],
		function(EmailHelper) {
			/**
			 * @class Terrasoft.configuration.mixins.EmailsSearchMixin
			 * Mixin using to Elasticsearch for seacrh emails.
			 */
			Ext.define("Terrasoft.configuration.mixins.EmailsSearchMixin", {
				alternateClassName: "Terrasoft.EmailsSearchMixin",

				//region Properties: private

				/**
				 * Lookup minimum search chars count.
				 * @protected
				 * @type {Integer}
				 */
				lookupMinSearchCharsCount: 3,

				/**
				 * Emails separate.
				 * @protected
				 * @type {String}
				 */
				emailSeparate: ";",

				//endregion

				//region Methods: private

				/**
				 * Remove not relevant values from all emails.
				 * @private
				 * @param {String} queryString Text value with all emails and search query.
				 * @param {String} lookupName lookup name.
				 */
				_correctOldValues: function(queryString, lookupName) {
					var searchStringArray = this._getSearchArray(queryString);
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					var oldValues = currentLookup.oldValues;
					var result = this._getSymmetricDifference(oldValues.getItems(), searchStringArray);
					if (!Ext.isEmpty(result)) {
						result.firstDiff.forEach(function(oldValue) {
							if (oldValues.indexOf(oldValue) >= 0) {
								oldValues.remove(oldValue);
								var lastValue = oldValues.last();
								currentLookup.lookupValue = oldValues.isEmpty()
										? null
										: this.createLookupValue(lastValue, lastValue);
							}
						}, this);
					}
				},

				/**
				 * Separate query string.
				 * @private
				 * @param {String} queryString Text value with all emails and search query.
				 * @return {Array} Emails array.
				 */
				_getSearchArray: function(queryString) {
					var searchStringArray = [];
					queryString.split(this.emailSeparate).forEach(function(item) {
						if (item) {
							searchStringArray.push(item.trim());
						}
					});
					return searchStringArray;
				},

				/**
				 * Search for differences in arrays.
				 * @private
				 * @param {Array} oldArr First array.
				 * @param {Array} newArr Second array.
				 * @return {Array} Result search for differences in arrays.
				 */
				_getArrayDifference: function(oldArr, newArr) {
					var resultArr = [];
					for (var i = 0; i < oldArr.length; i++) {
						if (newArr.indexOf(oldArr[i]) === -1) {
							resultArr.push(oldArr[i]);
						}
					}
					return resultArr;
				},

				/**
				 * Get the symmetric difference between two arrays.
				 * @private
				 * @param {Array} oldArr Firs array.
				 * @param {Array} newArr Second array.
				 * @return {Object} The symmetric difference between arrays.
				 */
				_getSymmetricDifference: function(oldArr, newArr) {
					return {
						firstDiff: this._getArrayDifference(oldArr, newArr),
						secondDiff: this._getArrayDifference(newArr, oldArr)
					};
				},

				/**
				 * Separate all emails values and search query.
				 * @private
				 * @param {String} queryString Text value with all emails and search query.
				 * @param {String} lookupName lookup name.
				 * @return {String} Search query.
				 */
				_getSearchQuery: function(queryString, lookupName) {
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					var searchStringArray = this._getSearchArray(queryString);
					var diffArray = this._getSymmetricDifference(currentLookup.oldValues.getItems(), searchStringArray);
					var newValue = Ext.isEmpty(diffArray.secondDiff) ? "" : diffArray.secondDiff.pop();
					var resultQuery = newValue.trim();
					this._correctOldValues(queryString, lookupName);
					return resultQuery || "";
				},

				/**
				 * Set value to expandable list.
				 * @private
				 * @param {Object} collection Object where key is object property name and value is object property
				 * value.
				 * @param {String} lookupName Lookup name.
				 */
				_setExpandableListValue: function(collection, lookupName) {
					var expandableList = this.get(lookupName + "List");
					if (!Ext.Object.isEmpty(collection) && expandableList) {
						expandableList.loadAll(collection);
					}
				},

				/**
				 * Execute query to global search.
				 * @private
				 * @param {Object} searchConfig Search information.
				 * @param {Function} callback Callback.
				 * @param {Object} scope Scope.
				 */
				_callService: function(searchConfig, callback, scope) {
					Terrasoft.ConfigurationServiceProvider.callService(searchConfig, callback, scope);
				},

				/**
				 * Set specific values for backward compatibility of sending email.
				 * @private
				 * @param {String} lookupName Lookup name.
				 * @param {String} backwardCompatibilityValue Textedit value.
				 */
				_setBackwardCompatibilityValues: function(lookupName, backwardCompatibilityValue) {
					switch (lookupName) {
						case "BlindCopyRecipient":
							this.set("BlindCopyRecepient", backwardCompatibilityValue);
							break;
						case "CopyRecipient":
							this.set("CopyRecepient", backwardCompatibilityValue);
							break;
						case "Recipient":
							this.set("Recepient", backwardCompatibilityValue);
							break;
						default:
							break;
					}
				},

				/**
				 * Processing the input value when response is empty.
				 * @private
				 * @param {String} searchString Full search query,
				 * @param {String} searchQuery Actual search query.
				 * @param {String} lookupName Lookup name.
				 */
				_setCustomLookupValue: function(searchString, searchQuery, lookupName) {
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					var searchStringArray = this._getSearchArray(searchString);
					var differenceArrays = this._getSymmetricDifference(searchStringArray,
							currentLookup.oldValues.getItems());
					differenceArrays.firstDiff.forEach(function(item) {
						item = item.trim();
						this.saveLookupValues(this.createLookupValue(item, item), lookupName);
					}, this);
					var lookupItem = this.createLookupValue(searchQuery, searchQuery);
					currentLookup.lookupValue = lookupItem;
					currentLookup.tempItem = lookupItem;
					this._collapseExpandableList(lookupName);
				},

				/**
				 * Collapse expandable list.
				 * @private
				 * @param {String} lookupName Lookup name
				 */
				_collapseExpandableList: function(lookupName) {
					var list = this.get(lookupName + "List");
					if (list) {
						list.loadAll();
					}
				},

				/**
				 * @private
				 */
				_getMarkerName: function(lookupName) {
					switch (lookupName) {
						case "BlindCopyRecipient":
							return "Bcc";
						case "CopyRecipient":
							return "Cc";
						case "Recipient":
							return "To";
						default:
							break;
					}
				},

				/**
				 * Remove temp value from old values.
				 * @param {Object} tempItem Temp item.
				 * @param {Terrasoft.Collection} oldValues Old values collection.
				 * @private
				 */
				_removeTempItemIfExist: function(tempItem, oldValues) {
					if (tempItem) {
						var tempValue = tempItem && tempItem.value;
						var deleteIndex = oldValues.getKeys().indexOf(tempValue);
						if (deleteIndex >= 0) {
							oldValues.removeByIndex(deleteIndex);
						}
					}
				},

				/**
				 * Returns email items array from string.
				 * @param {String} rawString Raw email items string.
				 * @return {Array} Email items array.
				 */
				_getValues: function(rawString) {
					if(Ext.isEmpty(rawString)) {
						return [];
					}
					var values = rawString.split(this.emailSeparate);
					return values.map(function(item) {
						return item.trim();
					});
				},

				//endregion

				//region Methods: protected

				/**
				 * Create lookup value.
				 * @protected
				 * @param {String} value Value.
				 * @param {String} displayValue Display value.
				 * @return (Object) New lookup value.
				 */
				createLookupValue: function(value, displayValue) {
					return {
						value: value,
						displayValue: displayValue
					};
				},

				/**
				 * Get actual display value.
				 * @protected
				 * @param {String} lookupName Lookup name.
				 * @return {string} Actual display value.
				 */
				getActualDisplayValue: function(lookupName) {
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					var displayValue = currentLookup.oldValues.getItems().join(this.emailSeparate + " ");
					if (!Ext.isEmpty(displayValue)) {
						displayValue = displayValue.concat(this.emailSeparate);
					}
					return displayValue;
				},

				/**
				 * Set lookup value.
				 * @protected
				 * @param {Object} lookupValue Lookup value.
				 * @param {String} lookupName Lookup name.
				 */
				setLookupValues: function(lookupValue, lookupName) {
					this.set(lookupName, lookupValue || null);
					this._setBackwardCompatibilityValues(lookupName, (lookupValue && lookupValue.displayValue) || null);
				},

				/**
				 * Clears lookup values.
				 * @protected
				 * @param {String} lookupName Lookup name.
				 */
				clearLookup: function(lookupName) {
					var currentLookup =  this.getCurrentLookupConfig(lookupName);
					currentLookup.oldValues.clear();
					currentLookup.lookupValue = null;
					this.setLookupValues(null, lookupName);
				},

				/**
				 * Get email from emailWithName value from old realization.
				 * @protected
				 * @param {string} recipient emailWithName of old realization.
				 * @return {string} Prepared emailWithName for new realization found emails.
				 */
				getEmailFromText: function(recipient) {
					var emails = EmailHelper.getEmailAddresses(recipient);
					return Ext.isEmpty(emails) ? "" : emails[0];
				},

				/**
				 * Get prepared emailWithName for new realization found emails (delete separate, if present).
				 * @protected
				 * @param {string} recipient emailWithName of old realization.
				 * @return {string} Prepared emailWithName for new realization found emails.
				 */
				getPreparedEmailWithName: function(recipient) {
					var emailsWitNames = recipient.split(this.emailSeparate);
					return Ext.isEmpty(emailsWitNames) ? "" : emailsWitNames[0];
				},

				/**
				 * Get current lookup config.
				 * @protected
				 * @param {String} lookupName Lookup name.
				 */
				getCurrentLookupConfig: function(lookupName) {
					this.$LookupConfigs = this.$LookupConfigs || {};
					var lookupConfig = this.$LookupConfigs[lookupName];
					if (!lookupConfig) {
						lookupConfig = {
							oldValues: this.Ext.create("Terrasoft.Collection"),
							lookupName: lookupName,
							lookupValue: null,
							tempItem: null
						};
						this.$LookupConfigs[lookupName] = lookupConfig;
					}
					return lookupConfig;
				},

				/**
				 * Handles response from service.
				 * @protected
				 * @param {Array} response Response present a result of find duplicates.
				 * @param {String} lookupName Lookup name.
				 * @param {String} searchQuery Search query.
				 */
				onResponseServiceReceived: function(response, lookupName) {
					var resList = {};
					if (!Ext.isEmpty(response)) {
						var currentLookup = this.getCurrentLookupConfig(lookupName);
						response.forEach(function(items) {
							for (var key in items) {
								if (!currentLookup.oldValues.contains(key)) {
									if (!Ext.isEmpty(this.getEmailFromText(key))) {
										resList[key] = this.createLookupValue(key, items[key]);
									}
								}
							}
						}, this);
					}
					this._setExpandableListValue(resList, lookupName);
				},

				/**
				 * Lookup value changed event handler.
				 * @protected
				 * @param {Object} item Changeable value for lookup.
				 * @param {String} lookupName Lookup name.
				 */
				saveLookupValues: function(item, lookupName) {
					if (!item) {
						return;
					}
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					var oldValues = currentLookup.oldValues;
					var itemValues = this._getValues(item.value);
					this.Terrasoft.each(itemValues, function(itemValue) {
						if (itemValue && !oldValues.contains(itemValue)) {
							oldValues.add(itemValue, itemValue);
							this._removeTempItemIfExist(currentLookup.tempItem, oldValues);
							if (currentLookup.lookupValue) {
								currentLookup.lookupValue.displayValue = this.getActualDisplayValue(lookupName);
							}
						}
					}, this);
					currentLookup.tempItem = null;
					this._setBackwardCompatibilityValues(lookupName, this.getActualDisplayValue(lookupName));
				},

				/**
				 * Converting item display value to actual.
				 * @protected
				 * @param {Object} item Current lookup item.
				 * @param {Integer} dataValueType Type of lookup value.
				 * @param {Object} config Lookup event information.
				 * @return {Object} Item to set lookup value.
				 */
				convertLookupValue: function(item, dataValueType, config) {
					if (!item) {
						return item;
					}
					if (Ext.isString(item)) {
						var value = item.replace(/(;\s{0,})|(\s{0,})$/,"");
						if (Ext.isEmpty(value)) {
							return null;
						}
						item = this.createLookupValue(item, item);
					}
					var lookupName = config.name;
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					item.displayValue = this.getActualDisplayValue(lookupName) || item.displayValue;
					currentLookup.lookupValue = item;
					return item;
				},

				/**
				 * Lookup blur event handler.
				 * @protected
				 * @param {Object} lookup Lookup control.
				 * @param {String} lookupName Lookup name.
				 */
				onLookupBlur: function(lookup, lookupName) {
					var currentLookup = this.getCurrentLookupConfig(lookupName);
					this.setLookupValues(currentLookup.lookupValue, lookupName);
				},

				/**
				 * Get service information.
				 * @protected
				 * @return {Object} Service information.
				 */
				getESServiceConfig: function(searchQuery) {
					return {
						data: searchQuery.split(" "),
						serviceName: "ESEmailService",
						methodName: "SearchEmails",
						encodeData: false
					};
				},

				/**
				 * Check features statuses.
				 * @protected
				 * @return {Boolean} Feature state.
				 */
				isFeatureEmailsSearchEnabled: function() {
					var features = Terrasoft.Features;
					return features.getIsEnabled("IsESEmailsSearch") &&
							features.getIsEnabled("GlobalSearch_V2");
				},

				/**
				 * Check feature status.
				 * @protected
				 * @return {Boolean} Invert feature state.
				 */
				isFeatureEmailsSearchDisabled: function() {
					return !this.isFeatureEmailsSearchEnabled();
				},



				/**
				 * Set lookup marker value by lookup name.
				 * @param {String} lookupName Lookup name.
				 * @param {Boolean} isLoading Emails search mark.
				 */
				setMarkerValue: function(lookupName, isLoading) {
					var markerName = this._getMarkerName(lookupName);
					var markerValue = markerName + (isLoading ? " Loading" : " Loaded");
					this.set(markerName, markerValue);
				},

				//endregion

				// region Methods: Public

				/**
				 * Calls global search service.
				 * @param {String} searchString Search parameters Search query.
				 * @param {Terrasoft.Collection} collection Collection.
				 * @param {String} lookupName Column name.
				 */
				callSearchService: function(searchString, collection, lookupName) {
					if (this.isFeatureEmailsSearchDisabled()) {
						return;
					}
					if (Ext.isEmpty(searchString)) {
						this.clearLookup(lookupName);
						this._collapseExpandableList(lookupName);
					}
					var searchQuery = this._getSearchQuery(searchString.trim(), lookupName);
					var searchQueryLength = searchQuery.length;
					if (searchQueryLength < this.lookupMinSearchCharsCount) {
						if (searchQueryLength >= 0) {
							this._collapseExpandableList(lookupName);
						}
						return;
					}
					var searchConfig = this.getESServiceConfig(searchQuery);
					this._setCustomLookupValue(searchString, searchQuery, lookupName);
					this.setMarkerValue(lookupName, true);
					this._callService(searchConfig, function(response) {
						var result = JSON.parse(response && response.SearchEmailsResult || "[]");
						if (!Ext.isEmpty(result)) {
							this.onResponseServiceReceived(result, lookupName);
						}
						this.setMarkerValue(lookupName, false);
					}, this);
				}

				// endregion

			});
		});


