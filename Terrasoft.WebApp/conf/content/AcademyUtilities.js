Terrasoft.configuration.Structures["AcademyUtilities"] = {innerHierarchyStack: ["AcademyUtilities"]};
define("AcademyUtilities", ["terrasoft"], function(Terrasoft) {
	Ext.define("Terrasoft.configuration.AcademyUtilities", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.AcademyUtilities",

		singleton: true,

		/**
		 * Gets link to documentation asynchronously.
		 * If contextHelpCode value is defined, link will be formed based on values extracted from the
		 * context help table, and complemented from system settings values, if table will not contain any values.
		 * If contextHelpCode value is not defined, link will be formed based on system settings values.
		 * @param {Object} config Configuration object.
		 * @param {Function} config.callback Callback function.
		 * @param {Object} config.scope Context for execution.
		 * @param {String} [config.contextHelpCode] (optional) Context help code.
		 * @param {Number} [config.contextHelpId] (optional) Context help identifier.
		 */
		getUrl: function(config) {
			if (!config) {
				return;
			}
			var callback = config.callback || Terrasoft.emptyFn;
			var scope = config.scope || this;
			var contextHelpCode = config.contextHelpCode;
			var contextHelpId = config.contextHelpId;
			this.getHelpConfigFromSysSettings(contextHelpId, function(defaultHelpConfig) {
				if (contextHelpCode) {
					this.getHelpConfigFromDb(contextHelpCode, function(helpConfig) {
						if (helpConfig) {
							this._mergeHelpConfigs(helpConfig, defaultHelpConfig);
						} else {
							helpConfig = defaultHelpConfig;
							helpConfig.contextHelpCode = contextHelpCode;
						}
						this.buildUrl(helpConfig, callback, scope);
					}, this);
				} else {
					this.buildUrl(defaultHelpConfig, callback, scope);
				}
			}, this);
		},

		/**
		 * Fills in empty properties of a config with the default vales, taken from the default config.
		 * @private
		 * @param {Object} config A config to be completed with the default vales.
		 * @param {Object} defaultConfig A config containing default vales.
		 */
		_mergeHelpConfigs: function(config, defaultConfig) {
			Terrasoft.each(defaultConfig, function(propertyValue, propertyName) {
				if (Ext.isEmpty(config[propertyName])) {
					config[propertyName] = propertyValue;
				}
			}, this);
		},

		/**
		 * Asynchronously gets the configuration from system settings to build link to documentation.
		 * @private
		 * @param {Number} contextHelpId Context help identifier.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Context for execution.
		 */
		getHelpConfigFromSysSettings: function(contextHelpId, callback, scope) {
			var sysSettingsNameArray = ["UseLMSDocumentation", "ProductEdition", "ConfigurationVersion",
				"EnableContextHelp"];
			Terrasoft.SysSettings.querySysSettings(sysSettingsNameArray, function(values) {
				var config = {
					callback: function(academyRootUrl) {
						var helpConfig = {};
						if (values) {
							helpConfig = {
								useLmsDocumentation: values.UseLMSDocumentation,
								lmsUrl: academyRootUrl || values.LMSUrl,
								enableContextHelp: values.EnableContextHelp,
								contextHelpId: contextHelpId,
								productEdition: values.ProductEdition,
								configurationVersion: values.ConfigurationVersion
							};
						}
						callback.call(scope, helpConfig);
					}
				};
				this.getAcademyUrlFromLookup.call(this, config);
			}, this);
		},

		/**
		 * Asynchronously gets the configuration from the lookup to build link to documentation.
		 * @private
		 * @param {String} contextHelpCode Context help code.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Context for execution.
		 */
		getHelpConfigFromDb: function(contextHelpCode, callback, scope) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "ContextHelp",
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.WORKSPACE,
					cacheGroup: "AcademyUtilities",
					cacheItemName: contextHelpCode
				}
			});
			esq.clientESQCacheParameters = {cacheItemName: contextHelpCode + "_ContextHelp"};
			esq.addColumn("Code");
			esq.addColumn("ContextHelpId");
			esq.addColumn("ProductEdition");
			esq.addColumn("ConfigurationVersion");
			esq.filters.add("ContextHelpCode", esq.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Code", contextHelpCode));
			esq.getEntityCollection(function(result) {
				var config = {
					callback: function(lmsUrl) {
						var collection = result.collection;
						var helpConfig = null;
						if (result.success && collection.getCount()) {
							var entity = collection.getByIndex(collection.getCount() - 1);
							var contextHelpId = entity.get("ContextHelpId");
							helpConfig = {
								lmsUrl: lmsUrl,
								enableContextHelp: !Ext.isEmpty(contextHelpId),
								contextHelpId: contextHelpId,
								productEdition: entity.get("ProductEdition"),
								configurationVersion: entity.get("ConfigurationVersion")
							};
						}
						callback.call(scope, helpConfig);
					}
				};
				this.getAcademyUrlFromLookup.call(this, config);
			}, this);
		},

		/**
		 * Returns link to documentation based on configuration object.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {Boolean} config.useLmsDocumentation (optional) Accessibility of contextual help.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Context for execution.
		 */
		buildUrl: function(config, callback, scope) {
			var url = "#";
			if (config) {
				url = (config.useLmsDocumentation)
					? this.getLmsDocumentationUrl(config)
					: this.getLocalDocumentationUrl(config);
			}
			callback.call(scope, url);
		},

		/**
		 * Returns link to Academy based on configuration object.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {Number} config.lmsUrl LMS address.
		 * @param {String} config.productEdition (optional) Product edition.
		 * @param {String} config.configurationVersion (optional) Configuration version.
		 * @param {Number} config.enableContextHelp (optional) Accessibility of contextual help.
		 * @param {Number} config.contextHelpId (optional) Identifier of contextual help.
		 * @return {String} Link to Academy.
		 */
		getLmsDocumentationUrl: function(config) {
			var contextHelpCode = config.contextHelpCode;
			if (contextHelpCode === "SystemDesigner") {
				return Terrasoft.getUrlOrigin(config.lmsUrl);
			}
			var parameters = [];
			var productEdition = config.productEdition;
			if (productEdition) {
				parameters.push("product=" + encodeURIComponent(productEdition));
			}
			var configurationVersion = config.configurationVersion;
			if (configurationVersion) {
				parameters.push("ver=" + encodeURIComponent(configurationVersion));
			}
			var enableContextHelp = config.enableContextHelp;
			var contextHelpId = config.contextHelpId;
			if (enableContextHelp && contextHelpId) {
				parameters.push("id=" + encodeURIComponent(contextHelpId));
			}
			return Ext.String.format("{0}?{1}", config.lmsUrl, parameters.join("&"));
		},

		/**
		 * Returns a reference to the local help based on configuration object.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {Number} config.contextHelpId (optional) Identifier of contextual help.
		 * @return {String} Link to the local help.
		 */
		getLocalDocumentationUrl: function(config) {
			var url = Terrasoft.workspaceBaseUrl + "/WebHelpNui/";
			url += config.productEdition + "/";
			var userCulture = Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue;
			var userCultureParts = userCulture.split("-", 1);
			url += userCultureParts[0];
			url += "/BPMonline_Help.htm";
			var contextHelpId = config.contextHelpId;
			if (contextHelpId) {
				url += "#<id=" + contextHelpId;
			}
			return url;
		},

		/**
		 * Gets academy URL from lookup.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {Function} config.callback Callback function.
		 */
		getAcademyUrlFromLookup: function(config) {
			var cacheItemName = "AcademyURL_" + Terrasoft.currentUserCultureName;
			var getLmsUrlQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "AcademyURL",
				rowCount: 1,
				serverESQCacheParameters: {
					cacheLevel: Terrasoft.ESQServerCacheLevels.WORKSPACE,
					cacheGroup: "AcademyUtilities",
					cacheItemName: cacheItemName
				}
			});
			getLmsUrlQuery.clientESQCacheParameters = {cacheItemName: cacheItemName};
			getLmsUrlQuery.addColumn("Description", "Description");
			getLmsUrlQuery.getEntityCollection(function(response) {
				var collection = response.collection;
				var academyRootUrl = "";
				if (collection.getCount()) {
					academyRootUrl = collection.first().get("Description");
				}
				Ext.callback(config.callback, this, [academyRootUrl]);
			}, this);
		}
	});
	return Terrasoft.AcademyUtilities;
});


