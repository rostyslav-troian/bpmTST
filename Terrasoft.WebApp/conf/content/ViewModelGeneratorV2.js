Terrasoft.configuration.Structures["ViewModelGeneratorV2"] = {innerHierarchyStack: ["ViewModelGeneratorV2"]};
define("ViewModelGeneratorV2", [
		"ext-base", "terrasoft", "ViewModelGeneratorV2Resources",
		"BaseSchemaViewModel", "BaseGeneratorV2", "ViewConfigBuilderMixin"
	],
	function(Ext, Terrasoft, resources) {
		/**
		 * @class Terrasoft.configuration.ViewModelGenerator
		 * #####, ############ ###### #############
		 */
		Ext.define("Terrasoft.configuration.ViewModelGenerator", {
			alternateClassName: "Terrasoft.ViewModelGenerator",
			extend: "Terrasoft.BaseGenerator",

			mixins: {
				ViewConfigBuilderMixin: "Terrasoft.ViewConfigBuilderMixin"
			},

			//region Properties: Private

			/**
			 * ######## ########### ############ ####
			 * @private
			 * @type {String}
			 */
			globalNamespace: "Terrasoft",

			/**
			 * ######## ############ #### #######
			 * @private
			 * @type {String}
			 */
			modelNamespace: "Terrasoft.model",

			/**
			 * ####### ##### ###### ####### #############
			 * @private
			 * @type {String}
			 */
			viewModelClassSuffix: "ViewModel",

			/**
			 * ####### ######## ####### ########
			 * @private
			 * @type {String}
			 */
			resourcesSuffix: "Resources",

			/**
			 * ####### ##### ###### ####### #############
			 * @private
			 * @type {String}
			 */
			lookupColumnListSuffix: "List",

			/**
			 * ###### ##### ########
			 * @private
			 * @type {Object}
			 */
			resourceType: {
				STRING: "Strings",
				IMAGE: "Images"
			},

			/**
			 * ######## ####### #######
			 * @private
			 * @type {String}
			 */
			profileColumnName: "Profile",

			/**
			 * ####### ######## #########
			 * @private
			 * @type {String}
			 */
			collectionSuffix: "Collection",

			//endregion

			//region Properties: Protected

			/**
			 * Base view model class.
			 * @protected
			 * @type {String}
			 */
			baseViewModelClassName: "Terrasoft.BaseSchemaViewModel",

			/**
			 * #######, ########## ## ########### ###### ### ########
			 * @protected
			 * @virtual
			 * @type {Boolean}
			 */
			useCache: true,

			/**
			 * Prepares business rules for applying
			 * @protected
			 * @param {Object} schema Class generation schema.
			 * @type {Function}
			 */
			preprocessBusinessRules: Terrasoft.emptyFn,

			//endregion

			//region Methods: Private

			/**
			 * Generates all viewModel classes for defined schemas hierarchy
			 * and returns the last class in the hierarchy.
			 * @private
			 * @param {Object[]} hierarchy Schemas hierarchy.
			 * @return {Object} Returns parent class.
			 */
			generateSchemaClass: function(hierarchy) {
				const parentClassName = this.baseViewModelClassName;
				let parentClass = Ext.ClassManager.get(parentClassName);
				this.mixins.ViewConfigBuilderMixin.addViewConfigs(hierarchy);
				Terrasoft.each(hierarchy, function(schema) {
					const hierarchyParentClassName = schema.parentClassName ||
						parentClass.prototype.$className || parentClassName;
					parentClass = this.generateClass(hierarchyParentClassName, schema, schema.viewConfig);
				}, this);
				this._setEntitySchema(parentClass);
				return parentClass;
			},

			/**
			 * Generates hierarchy class.
			 * @private
			 * @param {String} parentClassName Parent class name.
			 * @param {Object} schema Class generation schema.
			 * @param {Object} viewConfig Schema view configuration object.
			 * @return {Object} Returns created class.
			 */
			generateClass: function(parentClassName, schema, viewConfig) {
				const parentClass = Ext.ClassManager.get(parentClassName);
				const parentClassPrototype = parentClass.prototype;
				const entitySchemaName = schema.entitySchemaName || parentClassPrototype.entitySchemaName || "";
				const className = schema.schemaName + entitySchemaName + this.viewModelClassSuffix;
				const hideEmptyModelItems = schema.hideEmptyModelItems || parentClassPrototype.hideEmptyModelItems;
				const fullClassName = this.modelNamespace + "." + className;
				const definedClass = Ext.ClassManager.get(fullClassName);
				if (definedClass && this.useCache) {
					return definedClass;
				}
				const alternateClassName = this.globalNamespace + "." + className;
				const classConfig = {
					extend: parentClassName,
					alternateClassName: alternateClassName,
					mixins: schema.mixins,
					uId: schema.schemaUId,
					name: schema.schemaName,
					entitySchemaName: entitySchemaName,
					hideEmptyModelItems: hideEmptyModelItems,
					type: schema.type,
					Ext: null,
					Terrasoft: null,
					sandbox: null,
					columns: {},
					rules: {},
					businessRules: {},
					modules: {},
					details: {},
					messages: {},
					resources: {}
				};
				this.applyMethods(classConfig, schema.methods);
				this.applyProperties(classConfig, schema.properties);
				this.initDataModels(classConfig, schema, parentClassPrototype);
				this.applyParentColumns(classConfig.columns, parentClassPrototype.columns);
				this.applyDataModelsColumns(classConfig);
				this.applySchemaAttributes(classConfig.columns, schema.attributes);
				this.applyProfile(classConfig, schema.profile);
				this.applyParentMessages(classConfig.messages, parentClassPrototype.messages);
				this.applyMessages(classConfig.messages, schema.messages);
				this.applySchemaModules(classConfig.modules, parentClassPrototype.modules, schema.modules);
				if (schema.type === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
					this.preprocessBusinessRules(schema);
					this.applySchemaBusinessRules(classConfig.rules, parentClassPrototype.rules, schema.rules);
					this.applySchemaBusinessRules(classConfig.businessRules, parentClassPrototype.businessRules,
						schema.businessRules);
					this.applySchemaDetails(classConfig.details, parentClassPrototype.details, schema.details);
				}
				this.applyResources(classConfig.columns, schema.resources);
				this.addViewColumns(classConfig.columns, viewConfig);
				this.applyUserCode(classConfig, schema.userCode);
				return this.defineClass(fullClassName, classConfig);
			},

			/**
			 * ######### ########## ####### # ######## ############# ######
			 * @private
			 * @param {Object} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} columns #######
			 */
			applyColumns: function(columnsConfig, columns) {
				Terrasoft.each(columns, function(column, columnName) {
					this.applyColumn(columnsConfig, column, columnName);
				}, this);
			},

			/**
			 * ####### ################ ###### ####### ## ######### ##### ########## ########## ####### # ######### ###
			 * # ######## ##### ############# ######
			 * @private
			 * @param {Object} columnsConfig ################ ###### #######
			 * @param {String} name ######## ########## #######
			 */
			addLookupListColumn: function(columnsConfig, name) {
				const lookupColumnName = name + this.lookupColumnListSuffix;
				columnsConfig[lookupColumnName] = {
					name: lookupColumnName,
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: new Terrasoft.Collection()
				};
			},

			/**
			 * ######### ######## ####### ## #########
			 * @private
			 * @param {Object} column #######
			 */
			applyColumnDefaults: function(column) {
				if (Ext.isNumber(column.type)) {
					return;
				}
				column.type = Ext.isEmpty(column.columnPath)
					? Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					: Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
			},

			/**
			 * ######### ########## ######## # ######-######## ######### #######
			 * @private
			 * @param {Object} rulesConfig ########### ######-###### ######
			 * @param {Object} columnRules ######-####### #######
			 * @param {String} columnName ######## #######
			 */
			applyColumnBusinessRules: function(rulesConfig, columnRules, columnName) {
				const columnRulesConfig = rulesConfig[columnName];
				if (columnRulesConfig) {
					Terrasoft.each(columnRules, function(columnRule, columnRuleName) {
						this.applyColumnBusinessRule(columnRulesConfig, columnRule, columnRuleName);
					}, this);
				} else {
					rulesConfig[columnName] = Terrasoft.deepClone(columnRules);
				}
			},

			/**
			 * ######### ########## ####### # ######## ######-####### #######
			 * @private
			 * @param {Object} columnRulesConfig ############ ######-####### #######
			 * @param {Object} columnRule ####### ### ##########
			 * @param {String} columnRuleName ######## ######## ### ##########
			 */
			applyColumnBusinessRule: function(columnRulesConfig, columnRule, columnRuleName) {
				const columnRuleConfig = columnRulesConfig[columnRuleName];
				if (columnRuleConfig) {
					Ext.apply(columnRuleConfig, columnRule);
				} else {
					columnRulesConfig[columnRuleName] = Terrasoft.deepClone(columnRule);
				}
			},

			/**
			 * Applies modules config to generated class.
			 * @private
			 * @param {Object} modulesConfig Current modules config.
			 * @param {Object} parentModules Parent modules config.
			 * @param {Object} modules Modules.
			 */
			applySchemaModules: function(modulesConfig, parentModules, modules) {
				Terrasoft.each(parentModules, function(module, moduleName) {
					this.applyModule(modulesConfig, module, moduleName);
				}, this);
				Terrasoft.each(modules, function(module, moduleName) {
					this.applyModule(modulesConfig, module, moduleName);
				}, this);
			},

			/**
			 * Applies module config to generated class.
			 * @private
			 * @param {Object} modulesConfig Module config.
			 * @param {Object} module Module.
			 * @param {String} moduleName Module name.
			 */
			applyModule: function(modulesConfig, module, moduleName) {
				const parentModule = modulesConfig[moduleName];
				if (parentModule) {
					Ext.apply(parentModule, module);
					return;
				}
				modulesConfig[moduleName] = Terrasoft.deepClone(module);
			},

			/**
			 * Applies details config to generated class.
			 * @private
			 * @deprecated 7.8 Use {@link Terrasoft.ViewModelGenerator#applySchemaModules}
			 * @param {Object} detailsConfig Current details config.
			 * @param {Object} parentDetails Parent details config.
			 * @param {Object} details Details.
			 */
			applySchemaDetails: function(detailsConfig, parentDetails, details) {
				this.applySchemaModules(detailsConfig, parentDetails, details);
			},

			/**
			 * ####### ################ ###### ####### ## ######### ####### ########### ####### # ######### ###
			 * # ######## ##### ############# ######
			 * @private
			 * @param {Object} columnsConfig ################ ###### #######
			 * @param {String} name ######## #######
			 * @param {Object} value ######## #######
			 * @param {String} type ### #######
			 */
			applyResource: function(columnsConfig, name, value, type) {
				const resourceColumn = {
					name: this.resourcesSuffix + "." + type + "." + name,
					dataValueType: (type === this.resourceType.STRING)
						? Terrasoft.DataValueType.TEXT
						: Terrasoft.DataValueType.IMAGE,
					type: Terrasoft.ViewModelColumnType.RESOURCE_COLUMN,
					value: value
				};
				this.applyColumnDefaults(resourceColumn);
				columnsConfig[resourceColumn.name] = resourceColumn;
			},

			/**
			 * ######### ################ ####### ######## ## ######### ######## ######## #############
			 * @private
			 * @virtual
			 * @param {Object[]} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} config ############ ######## #############
			 */
			addViewItemColumns: function(columnsConfig, config) {
				if ((config.itemType === Terrasoft.ViewItemType.TAB_PANEL) ||
					(config.itemType === Terrasoft.ViewItemType.IMAGE_TAB_PANEL)) {
					this.applyTabPanelColumns(columnsConfig, config);
				}
			},

			/**
			 * @private
			 */
			_getEntitySchema: function(entitySchemaName) {
				const entitySchemaClassName = this.globalNamespace + "." + entitySchemaName;
				const entitySchema = Ext.ClassManager.get(entitySchemaClassName);
				if (!entitySchema) {
					throw new Terrasoft.ItemNotFoundException({
						message: Ext.String.format(resources.localizableStrings.EntitySchemaNotFountExceptionMessage,
							entitySchemaClassName)
					});
				}
				return entitySchema;
			},

			/**
			 * @private
			 */
			_setEntitySchema: function(parentClass) {
				const dataModels = parentClass.prototype.dataModelCollection;
				const dataModel = dataModels.findPrimary();
				const entitySchema = dataModel && dataModel.schema;
				if (entitySchema) {
					parentClass.prototype.entitySchema = entitySchema;
				}
			},

			/**
			 * @private
			 */
			_setEntityColumnsPath: function(dataModels) {
				dataModels.each(function(dataModel) {
					const entitySchema = dataModel.schema;
					if (entitySchema) {
						const schemaColumns = entitySchema.columns;
						Terrasoft.each(schemaColumns, function(column, name) {
							column.columnPath = name;
						}, this);
					}
				});
			},

			/**
			 * @param {Array} tabs
			 * @return {Array}
			 * @private
			 */
			_reorderTabs: function(tabs) {
				if (!Terrasoft.Features.getIsEnabled("UseTabOrderProperty")) {
					return tabs;
				}
				const hasOrderProperty = function(tab) {
					return Ext.isNumber(tab.order) && tab.order >= 0;
				};
				const result = tabs.filter(function(tab) {
					return !hasOrderProperty(tab);
				});
				const tabsWithOrderProperty = tabs
					.filter(function(tab) {
						return hasOrderProperty(tab);
					})
					.sort(function(tab1, tab2) {
						return tab1.order - tab2.order;
					});
				let lastOrderPropertyValue = null;
				let offset = 0;
				tabsWithOrderProperty.forEach(function(tab) {
					if (tab.order !== lastOrderPropertyValue) {
						lastOrderPropertyValue = tab.order;
					} else {
						offset++;
					}
					result.splice(tab.order + offset, 0, tab);
				});
				return result;
			},

			//endregion

			//region Methods: Protected

			/**
			 * ######### ##### ####### ## ############# ############ #####
			 * @protected
			 * @virtual
			 * @param {Object[]} parentView ############ ############# ############ #####
			 * @param {Object[]} diff ##### #######. ############ ##### ###### ######## ########### ############ #####
			 * @return {Object[]} ########## ######### ############# # ########### ####### #######
			 */
			applyViewDiff: function(parentView, diff) {
				return Terrasoft.JsonApplier.applyDiff(parentView, diff);
			},

			/**
			 * Initializes data models.
			 * @protected
			 * @param {Object} classConfig Class config object.
			 * @param {Object} schema Class generation schema.
			 * @param {Object} parentClassPrototype Parent class prototype.
			 */
			initDataModels: function(classConfig, schema, parentClassPrototype) {
				const parentCollection = parentClassPrototype.dataModelCollection;
				const parentConfig = parentCollection && parentCollection.dataModelsConfig;
				const dataModelsConfig = Ext.apply({}, schema.dataModels, parentConfig);
				let config = {};
				const entitySchemaName = schema.entitySchemaName;
				if (Terrasoft.isEmptyObject(dataModelsConfig) || !Ext.isEmpty(entitySchemaName)) {
					if (entitySchemaName) {
						config[entitySchemaName] = {
							entitySchemaName: entitySchemaName,
							isPrimary: true
						};
					}
				} else {
					config = dataModelsConfig;
				}
				const dataModelCollection = new Terrasoft.DataModelCollection();
				dataModelCollection.init(config);
				classConfig.dataModelCollection = dataModelCollection;
			},

			/**
			 * ######### ##### ##### # ####### Ext.define.
			 * @param {String} fullClassName ### ### ###### ######.
			 * @param {Object} classConfig ######, ## ###### ######## ##### ######## #####.
			 * @return {Function} ########## ########### ###### ######.
			 * @protected
			 */
			defineClass: function(fullClassName, classConfig) {
				return Ext.define(fullClassName, classConfig);
			},

			/**
			 * ######### ####### ####### # ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} config ################ ###### ######
			 * @param {Object} profile #######
			 */
			applyProfile: function(config, profile) {
				const profileColumnName = this.profileColumnName;
				config.columns[profileColumnName] = {
					name: profileColumnName,
					value: profile,
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				};
			},

			/**
			 * ######### ######### ############# ###### # ########## ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} messagesConfig ######### ##### ############# ######
			 * @param {Object} parentMessages ######### ############# ######
			 */
			applyParentMessages: function(messagesConfig, parentMessages) {
				this.applyMessages(messagesConfig, parentMessages);
			},

			/**
			 * ######### ######### ##### # ########## ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} messagesConfig ######### ##### ############# ######
			 * @param {Object} schemaMessages ######### #####
			 */
			applyMessages: function(messagesConfig, schemaMessages) {
				Terrasoft.each(schemaMessages, function(schemaMessage, messageName) {
					const message = messagesConfig[messageName];
					if (message) {
						Ext.apply(message, schemaMessage);
					} else {
						messagesConfig[messageName] = Terrasoft.deepClone(schemaMessage);
					}
				}, this);
			},

			/**
			 * Applies scheme's methods to generated classes.
			 * @protected
			 * @param {Object} config Class config object.
			 * @param {Object} methods Scheme's methods.
			 */
			applyMethods: function(config, methods) {
				Ext.apply(config, Terrasoft.deepClone(methods));
			},

			/**
			 * Applies scheme's properties to generated classes.
			 * @protected
			 * @param {Object} config Class config object.
			 * @param {Object} properties Scheme's properties.
			 */
			applyProperties: function(config, properties) {
				Ext.apply(config, Terrasoft.deepClone(properties));
			},

			/**
			 * Initializes entity scheme.
			 * @protected
			 * @virtual
			 * @throws {Terrasoft.ItemNotFoundException}
			 * If the object is not found, an exception is thrown.
			 * @param {Object} classConfig Class config object.
			 * @param {String} entitySchemaName Entity schema name.
			 */
			initEntitySchema: function(classConfig, entitySchemaName) {
				if (Ext.isEmpty(entitySchemaName)) {
					return;
				}
				classConfig.entitySchema = this._getEntitySchema(entitySchemaName);
			},

			/**
			 * ######### ################ ### ## ######### ##### # ### ##### ############ ######### #####
			 * @protected
			 * @virtual
			 * @param {Object} config ################ ###### ##### ###### #############
			 * @param {Function} userCode ####### ################# ####
			 */
			applyUserCode: function(config, userCode) {
				if (!userCode || !Ext.isFunction(userCode.viewModel)) {
					return;
				}
				userCode.viewModel(config);
			},

			/**
			 * ######### ####### ##### ######## # ######## ##### ############# ######
			 * @protected
			 * @virtual
			 * @deprecated
			 * @param {Object} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} entitySchema ##### ########
			 */
			applyEntitySchemaColumns: function(columnsConfig, entitySchema) {
				if (Ext.isEmpty(entitySchema)) {
					return;
				}
				Terrasoft.each(entitySchema.columns, function(column, columnName) {
					column.columnPath = columnName;
				}, this);
				this.applyColumns(columnsConfig, entitySchema.columns);
			},

			/**
			 * Applies data models columns
			 * @protected
			 * @param {Object} columnsConfig Configuration of columns.
			 */
			applyDataModelsColumns: function(columnsConfig) {
				const dataModels = columnsConfig.dataModelCollection;
				this._setEntityColumnsPath(dataModels);
				const columns = dataModels.getAttributesConfig();
				this.applyColumns(columnsConfig.columns, columns);
			},

			/**
			 * ######### ######## ##### # ######## ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} attributes ######## #####
			 */
			applySchemaAttributes: function(columnsConfig, attributes) {
				Terrasoft.each(attributes, function(attribute, attributeName) {
					this.applyColumn(columnsConfig, attribute, attributeName);
				}, this);
			},

			/**
			 * ######### ####### ############# ###### # ######## ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} parentColumns ################ ###### ####### ##### ############# ######
			 */
			applyParentColumns: function(columnsConfig, parentColumns) {
				this.applyColumns(columnsConfig, parentColumns);
			},

			/**
			 * ######### ######## ########## ####### # ####### ############# ######
			 * @param {Object} columnsConfig ################ ###### #######
			 * @param {Object} column #######
			 * @param {String} columnName ######## #######
			 */
			applyColumn: function(columnsConfig, column, columnName) {
				column.name = columnName;
				const parentColumn = columnsConfig[columnName];
				const columnValue = column.value;
				delete column.value;
				if (parentColumn) {
					const parentDependencies = parentColumn.dependencies;
					const columnDependencies = column.dependencies;
					Ext.apply(parentColumn, column);
					if (parentDependencies && columnDependencies) {
						parentColumn.dependencies = parentDependencies.concat(columnDependencies);
					}
					column.value = columnValue;
					if (columnValue !== undefined) {
						parentColumn.value = columnValue;
					}
				} else {
					const columnConfig = Terrasoft.deepClone(column);
					column.value = columnValue;
					if (columnValue !== undefined) {
						columnConfig.value = columnValue;
					}
					this.applyColumnDefaults(columnConfig);
					columnsConfig[columnName] = columnConfig;
					if (column.dataValueType === Terrasoft.DataValueType.LOOKUP) {
						this.addLookupListColumn(columnsConfig, columnName);
					}
				}
			},

			/**
			 * ######### ########## ######-####### # ######-######## ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} rulesConfig ########### ######-###### ######
			 * @param {Object} parentRules ############ ######-#######
			 * @param {Object} rules ######-#######
			 */
			applySchemaBusinessRules: function(rulesConfig, parentRules, rules) {
				Terrasoft.each(parentRules, function(columnRules, columnName) {
					this.applyColumnBusinessRules(rulesConfig, columnRules, columnName);
				}, this);
				Terrasoft.each(rules, function(columnRules, columnName) {
					this.applyColumnBusinessRules(rulesConfig, columnRules, columnName);
				}, this);
			},

			/**
			 * ######### ########## ####### # ######## ##### ############# ######
			 * @protected
			 * @virtual
			 * @param {Object} columns ################ ###### ####### ##### ################ ######
			 * @param {Object} resources #######
			 */
			applyResources: function(columns, resources) {
				Terrasoft.each(resources.localizableStrings, function(value, name) {
					this.applyResource(columns, name, value, this.resourceType.STRING);
				}, this);
				Terrasoft.each(resources.localizableImages, function(value, name) {
					this.applyResource(columns, name, value, this.resourceType.IMAGE);
				}, this);
			},

			/**
			 * ######### ################ ####### ######## ## ######### ####### ########## ############ #############
			 * @protected
			 * @virtual
			 * @param {Object[]} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} config ############ #############
			 */
			addViewColumns: function(columnsConfig, config) {
				Terrasoft.iterateChildItems(config, function(iterationConfig) {
					this.addViewItemColumns(columnsConfig, iterationConfig.item);
				}, this);
			},

			/**
			 * Extends schema columns through virtual columns required for tabs.
			 * @protected
			 * @virtual
			 * @param {Object[]} columnsConfig Schema column array.
			 * @param {Object} config Tab configuration.
			 */
			applyTabPanelColumns: function(columnsConfig, config) {
				const tabArray = config.tabs.map(function(item) {
					columnsConfig[item.name] = {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: false
					};
					return {
						item: this.getTabItem(columnsConfig, item),
						order: item.order
					};
				}, this);
				const orderedTabArray = this._reorderTabs(tabArray).map(function(tab) {
					return tab.item;
				});
				const collection = Ext.create("Terrasoft.BaseViewModelCollection", {
					entitySchema: Ext.create("Terrasoft.BaseEntitySchema", {
						columns: {},
						primaryColumnName: "Name"
					})
				});
				collection.loadFromColumnValues(orderedTabArray);
				const collectionName = this.getTabsCollectionName(config);
				columnsConfig[collectionName] = {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: collection
				};
			},

			/**
			 * Returns tab item.
			 * @protected
			 * @virtual
			 * @param {Object[]} columnsConfig Schema column array.
			 * @param {Object} tabItemConfig Tab configuration.
			 * @return {Object} Tab item.
			 */
			getTabItem: function(columnsConfig, tabItemConfig) {
				const caption = this.getTabCaption(columnsConfig, tabItemConfig);
				return {
					Name: tabItemConfig.name,
					Caption: caption
				};
			},

			/**
			 * ########## ######## ######### ### #######
			 * @protected
			 * @virtual
			 * @param {Object[]} columnsConfig ################ ###### ####### ##### ################ ######
			 * @param {Object} config ############ ######## ############# #####
			 * @return {String} ########## ######### ######## ######### ### #######
			 */
			getTabCaption: function(columnsConfig, config) {
				const caption = Terrasoft.Bindable.getBindingRuleBy$(config.caption, columnsConfig);
				if (caption && caption.bindTo) {
					if (columnsConfig[caption.bindTo]) {
						return columnsConfig[caption.bindTo].value;
					}
				} else {
					return caption;
				}
			},

			//endregion

			/**
			 * ######## ### ##### ## ######## # ########## ###### ViewModel
			 * @param {Object} config Config object.
			 * @param {Function} callback ####### ######### ######
			 * @param {Object} scope ######## ########## ####### ######### ######
			 */
			generate: function(config, callback, scope) {
				const hierarchy = config.hierarchy;
				this.useCache = Ext.isEmpty(config.useCache) ? this.useCache : config.useCache;
				this.callParent([
					config, function() {
						const viewModelClass = this.generateSchemaClass(hierarchy);
						callback.call(scope, viewModelClass);
					}
				], this);
			}
		});

		return Ext.create("Terrasoft.configuration.ViewModelGenerator");
	});


