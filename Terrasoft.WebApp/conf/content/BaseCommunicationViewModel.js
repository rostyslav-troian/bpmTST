Terrasoft.configuration.Structures["BaseCommunicationViewModel"] = {innerHierarchyStack: ["BaseCommunicationViewModel"]};
define("BaseCommunicationViewModel", ["ConfigurationConstants", "BaseCommunicationViewModelResources",
		"CommunicationUtils", "EmailHelper", "EmailLinksMixin"],
	function(ConfigurationConstants, resources, CommunicationUtils, EmailHelper) {
		Ext.define("Terrasoft.configuration.BaseCommunicationViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.BaseCommunicationViewModel",
			mixins: {
				emailLinksMixin: "Terrasoft.EmailLinksMixin"
			},

			/**
			 * Returns caption of communication type select button.
			 * @private
			 * @return {String} Caption of communication type select button.
			 */
			getTypeButtonCaption: function() {
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return resources.localizableStrings.CommunicationTypePlaceholder;
				} else {
					return communicationType.displayValue;
				}
			},

			/**
			 * Removes element from the collection.
			 * @private
			 */
			deleteItem: function() {
				this.isDeleted = true;
				this.fireEvent("change", this, {
					OperationType: "Delete"
				});
			},

			/**
			 * Sets changed communication type.
			 * @param {String} tag Contains value of new type.
			 * @private
			 */
			typeChanged: function(tag) {
				var number = this.changedValues && this.changedValues.Number;
				if (Ext.isString(number) && Ext.isEmpty(number)) {
					return;
				}
				var communicationTypes = this.get("CommunicationTypes");
				var communicationType = communicationTypes.get(tag);
				var communication = communicationType && communicationType.get("CommunicationId");
				this.set("CommunicationType", {
					value: communicationType.get("Id"),
					displayValue: communicationType.get("Name"),
					communicationValue: communication && communication.value
				});
				this.validate();
				this.updateLinkUrl(this.get("Number"));
			},

			/**
			 * ######### ######## ## ### ######## ##### ##### ## ##### ###. #####.
			 * @private
			 * @param {String} communicationType ######## #### ########.
			 * @return {boolean}
			 */
			isSocialNetworkType: function(communicationType) {
				return CommunicationUtils.isSocialNetworkType(communicationType);
			},

			/**
			 * ########## ########### #### ############## ######## #####.
			 * @protected
			 * @return {Boolean} ########### #### ############## ######## #####.
			 */
			getCommunicationEnabled: function() {
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return true;
				}
				if (communicationType.value && communicationType.value ===
						ConfigurationConstants.CommunicationTypes.LinkedIn) {
					return true;
				}
				return !this.isSocialNetworkType(communicationType);
			},

			/**
			 * ########## ########### ########### ###### ###### ######## #####.
			 * @protected
			 * @return {boolean} ########### ########### ###### ###### ######## #####.
			 */
			getRightIconEnabled: function() {
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return false;
				}
				return !this.isSocialNetworkType(communicationType);
			},

			/**
			 * #########, ########## ## #### ####### ########.
			 * @protected
			 * @return {Boolean} ########## true #### #### ######### # ######### ####### ##### ########,
			 * false - # ######## ######.
			 */
			isChanged: function() {
				var result = false;
				Terrasoft.each(this.changedValues, function() {
					var changedColumnName = arguments[1];
					result = !Ext.isEmpty(this.findEntityColumn(changedColumnName));
					return !result;
				}, this);
				return result;
			},

			/**
			 * ######### ###### ### ########## ########.
			 * @private
			 * @return {Terrasoft.InsertQuery} ###### ## ##########.
			 */
			getSaveQuery: function() {
				var entitySchema = this.entitySchema;
				if (entitySchema == null) {
					throw new Terrasoft.exceptions.ArgumentNullOrEmptyException({argumentName: "entitySchema"});
				}
				if (this.isDeleted) {
					throw Terrasoft.InvalidOperationException();
				}
				var query = null;
				if (this.isNew) {
					query = this.getInsertQuery();
				} else {
					query = this.getUpdateQuery();
					query.enablePrimaryColumnFilter(this.get(this.primaryColumnName));
				}
				var columnValues = query.columnValues;
				columnValues.clear();
				for (var columnName in this.changedValues) {
					var column = this.columns[columnName];
					if (!column || column.type !== Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
						continue;
					}
					var columnPath = column.columnPath;
					if (!entitySchema.isColumnExist(columnPath)) {
						continue;
					}
					var columnValue = this.get(columnName);
					if (column.isLookup && columnValue) {
						columnValue = columnValue.value;
					}
					columnValues.setParameterValue(columnPath, columnValue, this.getColumnDataType(columnName));
				}
				return query;
			},

			/**
			 * Checks if communication is duplicated.
			 * @param {String} value Communication value.
			 * @return {Object} Validation info.
			 */
			checkCommunicationDuplicates: function(value) {
				var invalidMessage = "";
				var communicationType = this.get("CommunicationType");
				if (communicationType) {
					if (!Ext.isEmpty(value)) {
						var communicationItems = this.parentCollection;
						var currentId = this.get("Id");
						var filteredItems = communicationItems.filterByFn(function(item) {
							var itemId = item.get("Id");
							var itemValue = item.get("Number");
							var type = item.get("CommunicationType");
							return ((itemValue === value) && ((type && type.value) === communicationType.value) &&
							(itemId !== currentId));
						}, this);
						if (!filteredItems.isEmpty()) {
							invalidMessage = resources.localizableStrings.CommunicationAlreadyExist;
						}
					}
				}
				return {
					invalidMessage: invalidMessage
				};
			},

			/**
			 * ######### ###### ###### ######## # ###. #####.
			 * @private
			 * @param {Object} config ############ ###### ###### # #### #####.
			 */
			loadSocialNetworksModule: function(config) {
				var historyState = this.sandbox.publish("GetHistoryState");
				this.sandbox.publish("PushHistoryState", {
					hash: historyState.hash.historyState,
					silent: true
				}, [this.sandbox.id]);
				this.sandbox.loadModule("FindContactsInSocialNetworksModule", {
					renderTo: "centerPanel",
					id: this.sandbox.id + "_FindContactsInSocialNetworksModule",
					keepAlive: true
				});
				this.sandbox.subscribe("ResultSelectedRows", function(args) {
					this.set("Number", args.name);
					this.set("SocialMediaId", args.id);
				}, this, [this.sandbox.id + "_FindContactsInSocialNetworksModule"]);
				this.sandbox.subscribe("SetInitialisationData", function() {
					return config;
				}, [this.sandbox.id + "_FindContactsInSocialNetworksModule"]);
			},

			/**
			 * ######### ###### ### ####### ######.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} ######### EntitySchemaQuery.
			 */
			getSelectQuery: function() {
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.get("DetailColumnName")
				});
				entitySchemaQuery.addColumn("Id");
				entitySchemaQuery.addColumn("Name");
				return entitySchemaQuery;
			},

			/**
			 * ########## ########## ######### ### ############# # ########## ########## #####.
			 * @throws Terrasoft.QueryExecutionException #### ### ####### ######## ######, ############ ##############
			 * ########.
			 * @param {Object} socialNetworkType ### ########## ####, ########## ########.
			 * @param {Function} callback ####### ######### ######, ####### ########## ## ########## ########.
			 * @param {Function} callback.accountsCount ########## ######### #############.
			 * @param {Object} scope ######## ########## ########## ####### ######### ######.
			 */
			getSocialNetworkAccountsCount: function(socialNetworkType, callback, scope) {
				var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SocialAccount"
				});
				var resultColumnName = "accountsCount";
				entitySchemaQuery.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, resultColumnName);
				var filterGroup = Ext.create("Terrasoft.FilterGroup");
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				filterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Public", true));
				var publicAccountFilterGroup = Ext.create("Terrasoft.FilterGroup");
				publicAccountFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				publicAccountFilterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Public", false));
				publicAccountFilterGroup.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "User", Terrasoft.SysValue.CURRENT_USER.value));
				filterGroup.addItem(publicAccountFilterGroup);
				var filters = entitySchemaQuery.filters;
				filters.add("socialNetworkTypeFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Type", socialNetworkType.value));
				filters.add("availableAccounts", filterGroup);
				entitySchemaQuery.getEntityCollection(function(result) {
					if (result.success) {
						var resultViewModel = result.collection.getByIndex(0);
						var accountsCount = resultViewModel.get(resultColumnName);
						callback.call(scope, accountsCount);
					} else {
						throw new Terrasoft.QueryExecutionException();
					}
				}, this);
			},

			/**
			 * Validates value in field.
			 * @param {String} value Value.
			 * @return {Object} Validate result.
			 */
			validateField: function(value) {
				var invalidMessage = "";
				var communicationType = this.get("CommunicationType");
				if (communicationType) {
					var isEmail = CommunicationUtils.isEmailType(communicationType.value,
						communicationType.communicationValue);
					if (isEmail && !Ext.isEmpty(value) && !EmailHelper.isEmailAddress(value)) {
						invalidMessage = resources.localizableStrings.WrongEmailFormat;
					} else if (CommunicationUtils.isPhoneType(communicationType.value, null,
							communicationType.communicationValue) && !Ext.isEmpty(value) &&
						!this.isPhoneNumber(value)) {
						invalidMessage = resources.localizableStrings.WrongPhoneFormat;
					} else if (CommunicationUtils.isSkypeType(communicationType.value,
							communicationType.communicationValue) && !Ext.isEmpty(value) &&
						!this.isSkypeAddress(value)) {
						invalidMessage = resources.localizableStrings.WrongSkypeFormat;
					}
				}
				return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
				};
			},

			/**
			 * ######### ######### ###### ########.
			 * @param {String} value ########### ########.
			 * @return {Boolean} true #### ###### ######## ##### ########.
			 */
			isPhoneNumber: function(value) {
				var phonePattern = /^[^'|^`]*$/;
				return phonePattern.test(value);
			},

			/**
			 * ######### ######### ###### Skype.
			 * @param {String} value ########### ########.
			 * @return {Boolean} true #### ###### ######## ##### Skype.
			 */
			isSkypeAddress: function(value) {
				var skypePattern = /^[^'|^`]*$/;
				return skypePattern.test(value);
			},

			/**
			 * ######### ############ ########### ######## ##########.
			 * @param {String} value ######## ######### ###########.
			 * @return {String} ######## ######### ###########.
			 */
			updateLinkUrl: function(value) {
				this.set("Link", this.getLinkUrl(value));
				return value;
			},

			/**
			 * Checks is communication option is duplicated.
			 * @protected
			 * @param {String} [value] Column value.
			 * @return {Boolean} Is communication duplicated.
			 */
			getIsDuplicatedCommunication: function(value) {
				var validationInfo = this.checkCommunicationDuplicates(value || this.get("Number"));
				return (validationInfo && !Ext.isEmpty(validationInfo.invalidMessage));
			},

			/**
			 * Get's config for hyperlink.
			 * @protected
			 * @param {String} value Value for link.
			 * @return {Object} Link config.
			 **/
			getLinkUrl: function(value) {
				if (!value || Ext.isEmpty(value)) {
					return {};
				}
				var isDuplicated = this.getIsDuplicatedCommunication(value);
				if (isDuplicated) {
					return {};
				}
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return {};
				}
				if (CommunicationUtils.isWebType(communicationType.value, communicationType.communicationValue)) {
					var regHttp = /(https?|ftp):(\/\/|\\\\)/gim;
					var nMatch = value.search(regHttp);
					if (nMatch >= 0) {
						return {
							url: value,
							caption: value
						};
					}
					return {
						url: "http://" + value,
						caption: value
					};
				}
				if (CommunicationUtils.isEmailType(communicationType.value, communicationType.communicationValue) && value) {
					var emailUrl = EmailHelper.getEmailUrl(value);
					if (Ext.isEmpty(emailUrl)) {
						return {};
					}
					return {
						url: emailUrl,
						caption: value
					};
				}
				return {};
			},

			/**
			 * Get's config for type icon image.
			 * @protected
			 * @return {Object} Image config.
			 */
			getTypeImageConfig: function() {
				var isDuplicated = this.getIsDuplicatedCommunication();
				if (isDuplicated) {
					return null;
				}
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return null;
				}
				if (CommunicationUtils.isWebType(communicationType.value, communicationType.communicationValue)) {
					return resources.localizableImages.WebIcon;
				} else if (CommunicationUtils.isEmailType(communicationType.value, communicationType.communicationValue)) {
					return resources.localizableImages.EmailIcon;
				}
				return null;
			},

			/**
			 * Link click event handler.
			 * @protected
			 */
			onLinkClick: function(path) {
				if (!this.validate()) {
					return false;
				}
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return false;
				}
				if (CommunicationUtils.isWebType(communicationType.value, communicationType.communicationValue)) {
					window.open(path);
				}
				if (CommunicationUtils.isEmailType(communicationType.value, communicationType.communicationValue)) {
					var emailConf = this._getEmailConf();
					return !this.emailLinkClicked(emailConf);
				}
				return false;
			},

			/**
			 * Prepare object to open email page.
			 * @private
			 */
			_getEmailConf: function() {
				var entity = this.get(this.get("DetailColumnName")) || {
					value: "",
					displayValue: ""
				};
				var recordId = entity.value;
				var email = this.get("Number");
				var conf = {
					schemaName: this.entitySchemaName,
					recordId: recordId,
					email: email,
					emailWithName: EmailHelper.getEmailWithName(email, entity.displayValue)
				};
				return conf;
			},

			/**
			 * ############ ####### ## ###### ###### #### ######## ##########.
			 * @protected
			 */
			onTypeIconButtonClick: function() {
				var value = this.get("Number");
				if (value) {
					var path = this.getLinkUrl(value);
					if (path) {
						this.onLinkClick(path.url);
					}
				}
			},

			/**
			 * ############# ######## ####### ##### ####### # true.
			 */
			setIsChanged: function() {
				this.set("IsChanged", true);
			},

			/**
			 * ######### ##### ######### ### ######.
			 * @return {String} ##### ######### ### ######.
			 */
			getTypeIconButtonHintText: function() {
				return "";
			},

			/**
			 * Returns visibility tag for icon.
			 * @protected
			 * @return {Boolean} Visibility tag for icon.
			 */
			getTypeIconButtonVisibility: function() {
				var communicationType = this.get("CommunicationType");
				if (!communicationType) {
					return true;
				}
				var type = communicationType.value;
				var communicationValue = communicationType.communicationValue;
				return (CommunicationUtils.isWebType(type, communicationValue) ||
					CommunicationUtils.isEmailType(type, communicationValue));
			},

			/**
			 * Get's marker value for right icon button.
			 * @protected
			 * @return {String} Marker value.
			 */
			getIconTypeButtonMarkerValue: function() {
				var communicationTypeDisplayValue = "";
				var communicationNumber = this.get("Number");
				var communicationType = this.get("CommunicationType");
				if (communicationType) {
					communicationTypeDisplayValue = communicationType.displayValue;
				}
				var markerValue = Ext.String.format("{0} {1}", communicationNumber, communicationTypeDisplayValue);
				return markerValue;
			},

			/**
			 * @obsolete
			 */
			onLookUpClick: function() {
				var entityName = this.get("DetailColumnName");
				var primaryLookupValue = this.get(entityName);
				var socialNetworkType = this.get("CommunicationType");
				var socialNetworkName = socialNetworkType.displayValue;
				var socialNetworksModuleConfig = {
					entitySchemaName: entityName,
					mode: "choice",
					recordId: primaryLookupValue.value,
					recordName: this.get("Number"),
					socialNetwork: socialNetworkName
				};
				this.getSocialNetworkAccountsCount(socialNetworkType, function(accountsCount) {
					if (accountsCount === 0) {
						this.handleMissingSocialNetworkAccount(socialNetworkName);
						return;
					}
					if (socialNetworksModuleConfig.recordName) {
						this.loadSocialNetworksModule(socialNetworksModuleConfig);
					} else {
						var entitySchemaQuery = this.getSelectQuery();
						entitySchemaQuery.getEntity(primaryLookupValue.value, function(result) {
							if (result.success && result.entity) {
								socialNetworksModuleConfig.recordName = result.entity.get("Name");
							}
							this.loadSocialNetworksModule(socialNetworksModuleConfig);
						}, this);
					}
				}, this);
			},

			handleMissingSocialNetworkAccount: function(socialNetworkName) {
				var message = Terrasoft.getFormattedString(resources.localizableStrings.NoSynchronizationAccont,
					socialNetworkName);
				Terrasoft.showInformation(message);
			},

			/**
			 * Get's menu item visibility flag.
			 * @protected
			 * @return {Boolean} Menu item visibility.
			 */
			getMenuItemVisibility: function() {
				return true;
			},

			/**
			 * Returns type button marker value.
			 * @return {string}
			 */
			getTypeButtonMarkerValue: function() {
				return this.get("Number") + " TypeButton";
			}
		});
	});


