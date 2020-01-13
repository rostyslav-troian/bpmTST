Terrasoft.configuration.Structures["CallExtendedMenu"] = {innerHierarchyStack: ["CallExtendedMenu"]};
define("CallExtendedMenu", ["ConfigurationConstants", "CtiConstants", "BaseExtendedMenu", "HistoryStateUtilities", "Call"],
	function(ConfigurationConstants, CtiConstants) {

		Ext.define("Terrasoft.configuration.mixins.CallExtendedMenu", {
			extend: "Terrasoft.BaseExtendedMenu",
			alternateClassName: "Terrasoft.CallExtendedMenu",

			mixins: {
				historyStateUtilities: "Terrasoft.HistoryStateUtilities"
			},

			/**
			 * Initializes call extended menu collection.
			 * @protected
			 * @param {Array} recipientPropertyNames Extended menu name collection.
			 * @param {Function} afterCallMenuItemClick Calls after menu item click.
			 */
			initCallExtendedMenuButtonCollections: function(recipientPropertyNames, afterCallMenuItemClick) {
				this.initExtendedMenuButtonCollections("Call", recipientPropertyNames, afterCallMenuItemClick);
			},

			/**
			 * Fills call extended menu.
			 * @protected
			 * @param {Array} recipientPropertyNames Extended menu name collection.
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Execution context.
			 */
			fillCallExtendedMenuButtonCollections: function(recipientPropertyNames, callback, scope) {
				recipientPropertyNames.forEach(function(item) {
					this.prepareCallButtonMenu(item, callback, scope);
				}, this);
			},

			/**
			 * Prepares call extended menu item.
			 * @protected
			 * @param {String} item Extended menu name.
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Execution context.
			 */
			prepareCallButtonMenu: function(item, callback, scope) {
				var recipientInfo = this.fillExtendedMenuItems("Call", item);
				if (recipientInfo && !this.isAddMode()) {
					this.getPhonesData(recipientInfo, function(phonesData, recipientInfo) {
						this.fillCallExtendedMenuData.apply(this, arguments);
						if (callback) {
							callback.call(scope || this, recipientInfo.MenuName, recipientInfo.PropertyName);
						}
					}, this);
				}
			},

			/**
			 * Returns esq for getting phones communication.
			 * @protected
			 * @param  {String} schemaName Schema name.
			 * @return {Terrasoft.EntitySchemaQuery} Entity schema query for getting phones communication.
			 */
			getPhonesEntitySchemaQuery: function(schemaName) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: schemaName + "Communication"
				});
				esq.addColumn("Number");
				return esq;
			},

			/**
			 * Adds filters to entity schema query for getting phones communication.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 * @param {Object} recipientInfo Recipient information.
			 */
			addPhonesQueryFilters: function(esq, recipientInfo) {
				esq.filters.add(recipientInfo.SchemaName + "Filter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, recipientInfo.SchemaName, recipientInfo.Id));
				esq.filters.add("CommunicationCode", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"[ComTypebyCommunication:CommunicationType:CommunicationType].Communication.Code",
					CtiConstants.CommunicationCodes.Phone));
			},

			/**
			 * Gets recipient phones data.
			 * @protected
			 * @param {Object} recipientInfo Recepient information.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			getPhonesData: function(recipientInfo, callback, scope) {
				var esq = this.getPhonesEntitySchemaQuery(recipientInfo.SchemaName);
				this.addPhonesQueryFilters(esq, recipientInfo);
				esq.getEntityCollection(function(response) {
					if (response.success && callback) {
						callback.call(scope || this, response, recipientInfo);
					}
				}, this);
			},

			/**
			 * Fills the menu values.
			 * @protected
			 * @param {Object} phonesData Phones data.
			 * @param {Object} recipientInfo Recepient information.
			 */
			fillCallExtendedMenuData: function(phonesData, recipientInfo) {
				if (phonesData) {
					var phoneCollection = this.generatePhoneCollection(phonesData, recipientInfo);
					var phoneCollectionPrepared = this.get(recipientInfo.ExtendedMenuCollectionName);
					this.fillExtendedMenuData(phoneCollection, recipientInfo, this.extendedCallMenuItemClick);
					this._applyMenuDirection(phoneCollectionPrepared, "ltr");
				}
			},

			/**
			 * Sets direction to all models in menu collection.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} collection Collection in which the value is set.
			 * @param {String} direction Direction.
			 */
			_applyMenuDirection: function(collection, direction) {
				if (!collection) {
					return;
				}
				collection.each(function(item) {
					item.set("direction", direction);
				});
			},

			/**
			 * Returns array of phones.
			 * @protected
			 * @param {Object} data Phones data.
			 * @param {Object} recipientInfo Recepient information.
			 * @return {Array} Array of phones.
			 */
			generatePhoneCollection: function(data, recipientInfo) {
				var phoneCollection = [];
				if (data.collection && data.collection.getCount() > 0) {
					data.collection.each(function(item) {
						var phone = item.get("Number");
						phoneCollection.push({
							caption: phone,
							tag: this.getCallMenuItemTag(item, recipientInfo)
						});
					}, this);
				}
				return phoneCollection;
			},

			/**
			 * Returns data for MenuIten click handler.
			 * @protected
			 * @param {Object} dataItem Phone entity.
			 * @param {Object} recipientInfo Recepient information.
			 * @returns {Object} Data for MenuIten click handler.
			 */
			getCallMenuItemTag: function(dataItem, recipientInfo) {
				var relationFields = this.getCallRelationFields(dataItem);
				return {
					CustomerId: dataItem.Id || recipientInfo.Id,
					Number: dataItem.get("Number"),
					EntitySchemaName: dataItem.SchemaName || recipientInfo.SchemaName,
					callRelationFields: relationFields,
					IsSectionGrid: this.get("IsSectionGrid"),
					RowId: this.get("RowId"),
					MiniPageSourceSandboxId: this.get("MiniPageSourceSandboxId")
				};
			},

			/**
			 * Gets call relation fields.
			 * @protected
			 * @param {Object} dataItem Recipient info, which used for call button.
			 * @return {Terrasoft.Collection} Call relation fields.
			 */
			getCallRelationFields: function(dataItem) {
				var relationFields = this.Ext.create("Terrasoft.Collection");
				relationFields.add(dataItem.SchemaName, {
					name: dataItem.SchemaName,
					value: dataItem.Id,
					type: Terrasoft.DataValueType.GUID
				});
				return relationFields;
			},

			/**
			 * Makes a call.
			 * @protected
			 * @param {Object} callInfo Call info.
			 * @param {Function} callback Callback function.
			 */
			extendedCallMenuItemClick: function(callInfo, callback) {
				var entitySchemaName;
				var columnValue;
				if (this.get("IsSectionGrid") || callInfo.IsSectionGrid) {
					entitySchemaName = this.getSectionInfo().entitySchemaName;
					columnValue = this.get("RowId") || callInfo.RowId;
				} else {
					var miniPageSourceSandboxId = this.get("MiniPageSourceSandboxId") ||
						callInfo.MiniPageSourceSandboxId;
					var cardCode = miniPageSourceSandboxId.startsWith("SectionModuleV2") ? "CardModuleV2" : "PageV2";
					var pageSandboxId = miniPageSourceSandboxId.substring(0,
						miniPageSourceSandboxId.lastIndexOf(cardCode) + cardCode.length);
					var miniPageMasterEntityInfo = this.sandbox.publish("GetMiniPageMasterEntityInfo", null,
						[miniPageSourceSandboxId, pageSandboxId]);
					if (!this.Ext.isEmpty(miniPageMasterEntityInfo)) {
						entitySchemaName = miniPageMasterEntityInfo.entitySchemaName;
						columnValue = miniPageMasterEntityInfo.primaryColumnValue;
					}
				}
				var columnName;
				if (!this.Ext.isEmpty(entitySchemaName)) {
					var callEntityConnectionsColumns = {Contact: "Contact"};
					if (!this.Ext.isEmpty(callEntityConnectionsColumns[entitySchemaName])) {
						columnName = callEntityConnectionsColumns[entitySchemaName];
					} else {
						this.Terrasoft.each(this.Terrasoft.Call.columns, function (column) {
							if (column.referenceSchemaName === entitySchemaName) {
								columnName = column.name;
								return false;
							}
						});
					}
				}
				var collection = [];
				var schemaName = this.entitySchemaName;
				if (!this.Ext.isEmpty(columnName) && (schemaName !== "Account" || columnName !== "Contact")) {
					collection.push({
						name: columnName,
						value: columnValue,
						type: this.Terrasoft.DataValueType.GUID
					});
				}
				this.sandbox.publish("CallCustomer", {
					number: callInfo.Number,
					customerId: this.get("Id"),
					entitySchemaName: this.entitySchemaName,
					callRelationFields: collection
				});
				this.Ext.callback(callback, this);
			}
		});
	});


