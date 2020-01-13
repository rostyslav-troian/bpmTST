Terrasoft.configuration.Structures["MobileDynamicLinkReceiver"] = {innerHierarchyStack: ["MobileDynamicLinkReceiver"]};
/**
 * @class Terrasoft.configuration.MobileDynamicLinkReceiver
 */
Ext.define("Terrasoft.configuration.MobileDynamicLinkReceiver", {
	extend: "Terrasoft.nativeApi.BaseDynamicLinkReceiver",
	alternateClassName: "Terrasoft.MobileDynamicLinkReceiver",

	/**
	 * @private
	 */
	getModelNameByPageName: function(pageName) {
		return new Promise(function(resolve) {
			Terrasoft.DataUtils.loadRecords({
				modelName: "VwModuleEditInfo",
				proxyType: Terrasoft.ProxyType.Offline,
				columns: ["ModuleCode"],
				filters: Ext.create("Terrasoft.Filter", {
					property: "Name",
					value: pageName
				}),
				success: function(records) {
					if (!Ext.isEmpty(records)) {
						resolve(records[0].get("ModuleCode"));
					} else {
						resolve();
					}
				},
				failure: function() {
					resolve();
				}
			});
		});
	},

	/**
	 * @private
	 */
	openPage: function(modelName, recordId) {
		return new Promise(function(resolve, reject) {
			if (!modelName) {
				Terrasoft.Logger.warn("MobileDynamicLinkReceiver.openPage: Page not found");
				reject();
				return;
			}
			if (!recordId) {
				Terrasoft.Logger.warn("MobileDynamicLinkReceiver.openPage: Broken recordId");
				reject();
				return;
			}
			Terrasoft.util.openPreviewPage(modelName, {
				recordId: recordId
			});
			resolve();
		}.bind(this));
	},

	/**
	 * @private
	 */
	getSelectQuery: function(schemaName, columnName, filterColumn, filterValue) {
		var filter = Ext.create("Terrasoft.QueryCompareFilter", {
			comparisonType: Terrasoft.QueryComparisonType.StartWith,
			leftExpression: Ext.create("Terrasoft.ColumnExpression", {
				columnPath: filterColumn
			}),
			rightExpression: Ext.create("Terrasoft.ParameterExpression", {
				parameter: {
					value: filterValue
				}
			})
		});
		return Ext.create("Terrasoft.SelectQuery", {
			rootSchemaName: schemaName,
			columns: [columnName],
			rowCount: 1,
			filters: filter
		});
	},

	/**
	 * @private
	 */
	loadRecordId: function(schemaName, columnName, filterColumn, filterValue) {
		return new Promise(function(resolve) {
			var selectQuery = this.getSelectQuery(schemaName, columnName, filterColumn, filterValue);
			var recordId;
			var proxyType = Terrasoft.Connection.isOnline() ? Terrasoft.ProxyType.Online : Terrasoft.ProxyType.Offline;
			Terrasoft.QueryExecutor.executeSelect({
				dataSourceType: Terrasoft.DataUtils.getDataSourceByProxyType(proxyType),
				query: selectQuery,
				success: function(data) {
					if (data.rows.length > 0) {
						var row = data.rows[0];
						recordId = row[columnName];
					}
					resolve(recordId);
				},
				failure: function() {
					resolve(recordId);
				},
				scope: this
			});
		}.bind(this));
	},

	/**
	 * @private
	 */
	getReversedPhone: function(phoneNumber) {
		var numbers = phoneNumber.split("");
		var reversedNumbers = numbers.reverse();
		return reversedNumbers.join("");
	},

	/**
	 * @private
	 */
	normalizePhoneNumber: function(phoneNumber) {
		return Terrasoft.String.replaceAll(phoneNumber, /[^\d]/g, "");
	},

	/**
	 * @private
	 */
	shouldOpenPageByPhone: function(data) {
		return Boolean(data.path && Terrasoft.String.contains(data.path, "findByPhone") && data.params &&
			data.params.number);
	},
	
	/**
	 * @private
	 */
	getSubdomain: function(url) {
		var re = new RegExp(".+:\/\/(www[.])?([^.]*)[.].*", "i");
		var result = url.match(re);
		if (!Ext.isEmpty(result)) {
			return result[2];
		} else {
			return null;
		}
	},

	/**
	 * @private
	 */
	isUrlMatchCurrentServer: function(url) {
		return this.getSubdomain(url) === this.getSubdomain(Terrasoft.CurrentUserInfo.serverUrl);
	},

	/**
	 * @protected
	 * @virtual
	 */
	findAndOpenPage: function(modelName, filterModelName, columnName, filterColumn, filterValue) {
		return this.loadRecordId(filterModelName, columnName, filterColumn, filterValue).then(function(recordId) {
			if (recordId) {
				return this.openPage(modelName, recordId);
			}
		}.bind(this));
	},

	/**
	 * Opens page finding record by phone.
	 * @protected
	 * @virtual
	 * @param {String} phoneNumber Phone number.
	 * @return {Promise<void>} Promise.
	 */
	openPageByPhone: function(phoneNumber) {
		phoneNumber = this.normalizePhoneNumber(phoneNumber);
		var reversedPhoneNumber = this.getReversedPhone(phoneNumber);
		return this.findAndOpenPage("Contact", "ContactCommunication", "Contact.Id", "SearchNumber",
			reversedPhoneNumber);
	},


	/**
	 * Opens page by desktop url.
	 * @protected
	 * @virtual
	 * @param {Object} data Url data.
	 * @return {Promise<void>} Promise.
	 */
	openPageByDesktopLink: function(data) {
		if (!this.isUrlMatchCurrentServer(data.url)) {
			return Promise.reject();
		}
		if (Terrasoft.String.contains(data.url, "Navigation/Navigation.aspx", true) && data.params) {
			return this.openPage(data.params.schemaName, data.params.recordId);
		} else {
			var hash = data.hash || "";
			var guidRe = "[0-9a-f]{8}[-][0-9a-f]{4}[-][0-9a-f]{4}[-][0-9a-f]{4}[-][0-9A-F]{12}";
			var re = new RegExp("CardModule(V\\d)?\\/(.*)Page(V\\d)?\\/edit\\/(" + guidRe + ")", "i");
			var result = hash.match(re);
			if (!Ext.isEmpty(result)) {
				var moduleName = result[2];
				var recordId = result[4];
				if (!Terrasoft.ApplicationConfig.checkIfModuleAvailable(moduleName)) {
					var pageName = moduleName + "Page" + (result[3] || "");
					return this.getModelNameByPageName(pageName).then(function(modelName) {
						return this.openPage(modelName, recordId);
					}.bind(this));
				} else {
					return this.openPage(moduleName, recordId);
				}
			}
		}
	},

	/**
	 * @inheritdoc
	 */
	openLink: function(data) {
		if (this.shouldOpenPageByPhone(data)) {
			return this.openPageByPhone(data.params.number);
		} else {
			return this.openPageByDesktopLink(data).catch(function() {
				Terrasoft.DynamicLink.openInBrowser(data.url);
			});
		}
	}

});

Terrasoft.DynamicLink.setReceiver("Terrasoft.configuration.MobileDynamicLinkReceiver");


