Terrasoft.configuration.Structures["NetworkUtilities"] = {innerHierarchyStack: ["NetworkUtilities"]};
define("NetworkUtilities", ["MaskHelper", "ConfigurationConstants", "ConfigurationEnumsV2", "ModuleUtils"
], function(MaskHelper, ConfigurationConstants) {

	/**
	 * Class utility methods for working with the navigation entities.
	 */
	Ext.define("Terrasoft.utilities.NetworkUtilities", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.NetworkUtilities",

		/**
		 * Navigation service redirecting method calling string format.
		 */
		navigationServiceRedirectStringFormat: "rest/NavigationService/Redirect?schemaName={0}&recordId={1}",

		/**
		 * #########, ######## ## ###### ########## URL'##
		 * @param {String} value ######### ############# URL'#
		 * @return {Boolean} true - #### ###### ########### ### URL #######
		 */
		isUrl: function(value) {
			return Terrasoft.isUrl(value);
		},

		/**
		 * Opens URL in new window.
		 * @param {String} value URL string.
		 */
		onUrlClick: function(value) {
			if (this.isUrl(value)) {
				window.open(value);
			}
		},

		/**
		 * Returns entity schema name by entitySchemaUId.
		 * @param {String} entitySchemaUId Entity schema unique identifier.
		 * @return {String} Entity schema name.
		 */
		getEntitySchemaName: function(entitySchemaUId) {
			return Terrasoft.ModuleUtils.getEntitySchemaNameByUId(entitySchemaUId);
		},

		/**
		 * Creates a relative URL to open the card of the entity.
		 * @throws {Terrasoft.ArgumentNullOrEmptyException} Throws an exception if not specified the schema name or
		 * the entity ID.
		 * @inheritdoc NetworkUtilities#getEntityConfigUrl
		 */
		getEntityUrl: function(config) {
			if (arguments.length > 1) {
				config = {
					entitySchema: arguments[0],
					primaryColumnValue: arguments[1],
					typeColumnValue: arguments[2],
					operation: arguments[3]
				};
			}
			let url = "";
			var entityConfig = this.getEntityConfigUrl(config);
			if (entityConfig) {
				url = Terrasoft.combinePath(
					entityConfig.cardModule,
					entityConfig.cardSchema,
					entityConfig.operation,
					entityConfig.primaryColumnValue
				);
			}
			return url;
		},

		/**
		 * Returns navigation service page url.
		 * @param {String} schemaName Object schema name.
		 * @param {String} recordId Record identifier.
		 * @return {Object} Navigation service page url.
		 */
		getNavigationServicePageUrl: function(schemaName, recordId) {
			return Ext.String.format(this.navigationServiceRedirectStringFormat, schemaName, recordId);
		},

		/**
		 * Returns relative Url path by card schema name.
		 * @param {String} pageSchemaName Card schema name.
		 * @param {String} operation Card operation name.
		 * @param {String} primaryColumnValue Record identifier.
		 * @return {String}
		 */
		getPageUrl: function(pageSchemaName, operation, primaryColumnValue) {
			return Terrasoft.combinePath("CardModuleV2", pageSchemaName, operation, primaryColumnValue);
		},

		/**
		 * Creates a configuration object values for the U R L to a card entity.
		 * @throws {Terrasoft.ArgumentNullOrEmptyException} Throws an exception if not specified
		 * the schema name or the entity ID.
		 * @param {Object} config Config object.
		 * @param {String} config.entitySchema The name or ID of the schema entity.
		 * @param {String} [config.entitySchemaName] The name of the schema entity. Alias for @entitySchema.
		 * @param {String} config.primaryColumnValue The entity identifier.
		 * @param {String} [config.typeColumnValue] The value of the column type.
		 * @param {String} [config.typeId] The value of the column type. Alias for @typeColumnValue.
		 * @param {String} [config.operation] Operation.
		 * @return {Object} Returns the configuration object values for the U R L to a card entity.
		 */
		getEntityConfigUrl: function(config) {
			const configArg = arguments.length === 1;
			const entitySchema = configArg ? config.entitySchema || config.entitySchemaName : arguments[0];
			const primaryColumnValue = configArg ? config.primaryColumnValue : arguments[1];
			const typeColumnValue = configArg ? config.typeColumnValue || config.typeId : arguments[2];
			const operation = configArg ? config.operation : arguments[3];
			var entitySchemaName = Terrasoft.isGUID(entitySchema)
				? this.getEntitySchemaName(entitySchema)
				: entitySchema;
			if (!entitySchemaName) {
				throw Ext.create("Terrasoft.ArgumentNullOrEmptyException");
			}
			var moduleStructure = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchemaName);
			var entityStructure = Terrasoft.ModuleUtils.getEntityStructureByName(entitySchemaName);
			if (!entityStructure && !moduleStructure) {
				return null;
			}
			let pages = Terrasoft.ModuleUtils.getPages(entityStructure);
			if (typeColumnValue && moduleStructure && moduleStructure.attribute && !Ext.isEmpty(pages)) {
				var typePage = Terrasoft.where(pages, {"UId": typeColumnValue});
				pages = Ext.isEmpty(typePage) ? pages : typePage;
			}
			var cardModule = moduleStructure && moduleStructure.cardModule ? moduleStructure.cardModule : "CardModuleV2";
			var cardSchema = pages[0].cardSchema;
			var configUrl = {
				cardModule: cardModule,
				cardSchema: cardSchema,
				entitySchemaName: entitySchemaName,
				operation: operation || Terrasoft.ConfigurationEnums.CardOperation.EDIT,
				primaryColumnValue: primaryColumnValue
			};
			return configUrl;
		},

		getAttributeValueByRecordId: function(config, callback, scope) {
			var entitySchemaName = config.entitySchemaName;
			var entityId = config.entityId;
			var attribute = config.attribute;
			Terrasoft.chain(function(next) {
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: entitySchemaName
				});
				select.addColumn("Id");
				select.addColumn(attribute);
				select.getEntity(entityId, next, this);
			}, function(next, result) {
				var typeId = null;
				if (result && result.success) {
					var entity = result.entity;
					typeId = entity.get(attribute);
					typeId = typeId && typeId.value;
				}
				next(typeId);
			}, function(next, typeId) {
				if (callback) {
					callback.call(scope, typeId);
				}
			}, this);
		},

		/**
		 * Prepares config for card.
		 * @param {Object} config Card config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		prepareOpenConfig: function(config, callback, scope) {
			if (!Ext.isObject(config)) {
				throw Ext.create("Terrasoft.UnsupportedTypeException");
			}
			var entityId = config.entityId || (config.entityId = config.primaryColumnValue);
			var entitySchemaName = config.entitySchemaName ||
				(config.entitySchemaName = this.getEntitySchemaName(config.entitySchemaUId));
			if (Ext.isEmpty(config.sandbox) || Ext.isEmpty(entitySchemaName) ||
				(Ext.isEmpty(entityId) && config.operation !== Terrasoft.ConfigurationEnums.CardOperation.ADD)) {
				throw Ext.create("Terrasoft.ArgumentNullOrEmptyException", {
					message: "Arguments: \"sandbox\" and(or) \"entityId\" and(or) \"entitySchemaName\" was not set."
				});
			}
			var moduleStructure = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchemaName);
			var attribute = (moduleStructure && moduleStructure.attribute) || null;
			if (attribute && !config.typeId) {
				Terrasoft.chain(function(next) {
					this.getAttributeValueByRecordId({
						entitySchemaName: entitySchemaName,
						entityId: entityId,
						attribute: attribute
					}, next, this);
				}, function(next, typeId) {
					config.typeId = typeId || config.typeId;
					callback.call(scope, config);
				}, this);
			} else {
				callback.call(scope, config);
			}
		},

		/**
		 * ######### ######## ######## ########.
		 * @throws {Terrasoft.UnsupportedTypeException} ####### ##########,
		 * #### ######## ############ ## ######## ########.
		 * @param {Object} config
		 * @param {String} config.entityId ############# ########.
		 * @param {String} config.entitySchemaName ### ##### ########.
		 * #### ########### ##### ########## ## ############# ##### ########.
		 * @param {String} config.entitySchemaUId ############# ##### ########.
		 * ##### ############# #### ###### ### ##### ########.
		 * @param {Object} config.sandbox ######### ###### ########### ######## ######## ######## ########.
		 * @param {Object} config.stateObj ###### ######### ########### ######## ######## ########.
		 */
		openEntityPage: function(config) {
			if (!Ext.isObject(config)) {
				throw Ext.create("Terrasoft.UnsupportedTypeException");
			}
			MaskHelper.showBodyMask();
			this.prepareOpenConfig(config, function(preparedConfig) {
				var hash = this.getEntityUrl(preparedConfig.entitySchemaName,
					preparedConfig.entityId, preparedConfig.typeId);
				preparedConfig.sandbox.publish("PushHistoryState", {
					hash: hash,
					stateObj: preparedConfig.stateObj || {}
				});
			}, this);
		},

		/**
		 * Opens section of the entity.
		 * @throws {Terrasoft.ArgumentNullOrEmptyException} Throws exception,
		 * if entity schema name is null or empty.
		 * @param {Object} config
		 * @param {String} config.entitySchemaName Entity name.
		 * @param {Object} config.sandbox Sandbox module.
		 */
		openEntitySection: function(config) {
			var entitySchemaName = config.entitySchemaName;
			var sandbox = config.sandbox;
			if (Ext.isEmpty(entitySchemaName) || Ext.isEmpty(sandbox)) {
				throw new Terrasoft.ArgumentNullOrEmptyException();
			}
			var moduleStructure = Terrasoft.ModuleUtils.getModuleStructureByName(entitySchemaName);
			var sectionModule = moduleStructure.sectionModule ||
				ConfigurationConstants.ModuleStructure.DefaultSectionModule;
			var sectionSchemaName = moduleStructure.sectionSchema ||
				moduleStructure.entitySchemaName +
				ConfigurationConstants.ModuleStructure.DefaultSectionSchemaSuffix;
			var hash = Terrasoft.combinePath(sectionModule, sectionSchemaName);
			sandbox.publish("PushHistoryState", {hash: hash});
		},

		/**
		 * ######### ######## # #######.
		 * @param {Object} config ############ ######## ### ######## ########.
		 * @param {String} config.entityId ############# ########.
		 * @param {String} config.entitySchemaName ### ##### ########.
		 * #### ########### ##### ########## ## ############# ##### ########.
		 * @param {String} config.entitySchemaUId ############# ##### ########.
		 * ##### ############# #### ###### ### ##### ########.
		 * @param {Object} config.sandbox ######### ###### ########### ######## ######## ######## ########.
		 * @param {String} config.typeId #### ########### ##### ########## ## ############## ##### ########.
		 */
		openCardInChain: function(config) {
			if (!Ext.isObject(config)) {
				throw Ext.create("Terrasoft.UnsupportedTypeException");
			}
			MaskHelper.showBodyMask();
			this.prepareOpenConfig(config, this.openCard, this);
		},

		/**
		 * Opens card.
		 * @param {Object} config Configuration for opening card.
		 * @param {String} config.entityId Entity identifier.
		 * @param {String} config.entitySchemaName Entity schema name.
		 * Will be defined as entity schema identifier (if not exists).
		 * @param {String} config.entitySchemaUId Entity schema identifier.
		 * Can be empty if entity schema name exists.
		 * @param {Object} config.sandbox Sandbox from module, that opens card.
		 * @param {String} config.typeId Will be defined as entity schema identifier (if not exists).
		 * @param {Terrasoft.ConfigurationEnums.CardOperation} [config.operation =
		 * Terrasoft.ConfigurationEnums.CardOperation.EDIT] Operation, that will pass to card.
		 * @param {Array} config.valuePairs Default values for card fields.
		 */
		openCard: function(config) {
			var entitySchemaConfig = this.getEntityConfigUrl(config);
			var moduleName = config.moduleName || entitySchemaConfig.cardModule;
			var historyState = config.historyState;
			var sandbox = config.sandbox;
			var entitySchemaName = entitySchemaConfig.entitySchemaName;
			var state = {
				isSeparateMode: true,
				schemaName: entitySchemaConfig.cardSchema,
				entitySchemaName: entitySchemaName,
				operation: entitySchemaConfig.operation,
				primaryColumnValue: entitySchemaConfig.primaryColumnValue,
				isInChain: true,
				valuePairs: config.valuePairs
			};
			var typeColumnName = this.getTypeColumn(entitySchemaName);
			if (!Ext.isEmpty(typeColumnName) && config.typeId) {
				state.typeColumnName = typeColumnName.path;
				state.typeUId = config.typeId;
			}
			sandbox.publish("PushHistoryState", {
				hash: historyState.hash.historyState,
				silent: true,
				stateObj: state
			});
			var moduleParams = {
				renderTo: "centerPanel",
				keepAlive: true
			};
			if (config.moduleId) {
				moduleParams.id = config.moduleId;
			}
			sandbox.loadModule(moduleName, moduleParams);
		},

		/**
		 * Gets the Type column for the current schema.
		 * @protected
		 * @return {Object}
		 */
		getTypeColumn: function(schemaName) {
			var entityStructure = Terrasoft.ModuleUtils.getEntityStructureByName(schemaName);
			var typeColumnName = (entityStructure && entityStructure.attribute) || null;
			return typeColumnName ? {path: typeColumnName} : null;
		},

		/**
		 * Opens card in new window.
		 * @param {Object} config Configuration for opening card.
		 * @param {String} config.entitySchemaName Entity schema name.
		 * @param {String} config.typeId Will be defined as entity schema identifier (if not exists).
		 * @param {Terrasoft.ConfigurationEnums.CardOperation} [config.operation =
		 * Terrasoft.ConfigurationEnums.CardOperation.EDIT] Operation, that will pass to card.
		 */
		openEntityWindow: function(config) {
			var url = this.getEntityUrl(config);
			window.open("ViewModule.aspx#" + url);
		},

		/**
		 * Opens page in new window.
		 * @param {Object} config Configuration for opening card.
		 * @param {String} config.cardSchemaName Page schema name.
		 * @param {String} config.typeId Will be defined as entity schema identifier (if not exists).
		 * @param {Terrasoft.ConfigurationEnums.CardOperation} [config.operation =
		 * Terrasoft.ConfigurationEnums.CardOperation.EDIT] Operation, that will pass to card.
		 */
		openCardWindow: function(config) {
			var url = this.getPageUrl(
				config.cardSchemaName,
				config.operation,
				config.primaryColumnValue
			);
			window.open("ViewModule.aspx#" + url);
		}
	});

	return Ext.create("Terrasoft.NetworkUtilities");
});


