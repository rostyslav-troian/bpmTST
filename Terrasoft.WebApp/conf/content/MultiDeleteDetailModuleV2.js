Terrasoft.configuration.Structures["MultiDeleteDetailModuleV2"] = {innerHierarchyStack: ["MultiDeleteDetailModuleV2"]};
define("MultiDeleteDetailModuleV2", ["SchemaBuilderV2", "ViewGeneratorV2", "DefaultProfileHelper", "BaseNestedModule",
	"MultiDeleteDetailViewConfigV2", "MultiDeleteDetailViewModelV2"],
	function(SchemaBuilder, ViewGenerator, LookupProfileHelper) {
		Ext.define("Terrasoft.configuration.MultiDeleteDetailModule", {
			extend: "Terrasoft.BaseNestedModule",
			alternateClassName: "Terrasoft.MultiDeleteDetailModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * Flag for the visibility of the body mask.
			 * @type {Boolean}
			 */
			showMask: true,

			/**
			 * Module configuration object.
			 * @type {Object}
			 */
			moduleConfig: null,

			/**
			 * The class name of the view model.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.MultiDeleteDetailViewModel",

			/**
			 * The class name of the generator of view configuration.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.MultiDeleteDetailViewConfig",

			/**
			 * The class name of the generator of view.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * Schema name.
			 * @type {String}
			 */
			entitySchemaName: "",

			/**
			 * Entity schema.
			 * @type {Object}
			 */
			entitySchema: null,

			/**
			 * Sets view config built using module config.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for the callback function.
			 * @private
			 */
			setViewConfig: function(callback, scope) {
				var preparedModuleConfig = this.getPreparedModuleConfig();
				this.buildView(preparedModuleConfig, function(view) {
					this.viewConfig = view[0];
					callback.call(scope);
				}, this);
			},

			/**
			 * Returns prepared module config.
			 * @return {Object} Prepared module config.
			 * @private
			 */
			getPreparedModuleConfig: function() {
				var moduleConfig = this.Terrasoft.deepClone(this.moduleConfig) || {};
				moduleConfig.viewModelClass = this.viewModelClass;
				return moduleConfig;
			},

			/**
			 * Initializes module configuration object.
			 * @private
			 */
			initModuleConfig: function() {
				var sandbox = this.sandbox;
				this.moduleConfig = sandbox.publish("GetConfig", sandbox.id, [sandbox.id]) || {};
			},

			/**
			 * Creates the view configuration object of the module.
			 * @param {Object} config Configuration object of the view config.
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.BaseModel} scope Execution context of callback.
			 * @protected
			 * @virtual
			 */
			buildView: function(config, callback, scope) {
				var viewGenerator = this.getViewGenerator();
				var viewConfig = this.getViewConfig(config);
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * Returns configuration object of the view.
			 * @param {Object} config Configuration object of the view config.
			 * @return {Object} Configuration object of the view.
			 * @private
			 */
			getViewConfig: function(config) {
				var viewClass = this.Ext.create(this.viewConfigClassName);
				var schema = {viewConfig: viewClass.generate(config)};
				var viewConfig = this.Ext.apply({schema: schema}, config);
				viewConfig.schemaName = "";
				return viewConfig;
			},

			/**
			 * Returns instance of the Terrasoft.ViewGenerator class.
			 * @return {Terrasoft.BaseGenerator} Instance of the Terrasoft.ViewGenerator.
			 * @private
			 */
			getViewGenerator: function() {
				return this.Ext.create(this.viewGeneratorClass);
			},

			/**
			 * Initializes columns list.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @private
			 */
			initProfile: function(callback, scope) {
				scope = scope || this;
				var profileKey = this.getProfileKey();
				SchemaBuilder.getProfile(profileKey, function(profile) {
					this.setProfile(profile, callback, scope);
				}, this);
			},

			/**
			 * Returns profile key.
			 * @return {String} Profile key.
			 * @private
			 */
			getProfileKey: function() {
				return this.moduleConfig.profileKey;
			},

			/**
			 * Sets default profile into the module config.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for the callback function.
			 * @private
			 */
			setDefaultProfile: function(callback, scope) {
				var profileKey = this.getProfileKey();
				var profile = LookupProfileHelper.getEntityProfile(profileKey, this.entitySchemaName);
				this.setModuleConfigProfile(profile);
				callback.call(scope);
			},

			/**
			 * Sets received profile into the module config.
			 * @param {Object} profile Received profile.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for the callback function.
			 * @private
			 */
			setReceivedProfile: function(profile, callback, scope) {
				this.setModuleConfigProfile(profile);
				callback.call(scope);
			},

			/**
			 * Sets into the module config prepared profile.
			 * @param {Object} profile Profile object.
			 * @private
			 */
			setModuleConfigProfile: function(profile) {
				profile = this.getPrepareProfile(profile);
				this.moduleConfig.profile = profile;
			},

			/**
			 * Returns prepared profile object.
			 * @param {Object} profile Profile object.
			 * @return {Object} Prepared profile object.
			 * @private
			 */
			getPrepareProfile: function(profile) {
				profile = profile.DataGrid || profile;
				var listedConfig = this.Terrasoft.decode(profile.listedConfig);
				profile.isTiled = false;
				listedConfig.columnsConfig = ViewGenerator.generateGridRowConfig(profile, listedConfig.items);
				listedConfig.captionsConfig = ViewGenerator.generateGridCaptionsConfig(listedConfig.items);
				ViewGenerator.addLinks(listedConfig, false, this.viewModelClass);
				profile.listedConfig = JSON.stringify(listedConfig);
				profile.DataGrid = this.Terrasoft.deepClone(profile);
				return profile;
			},

			/**
			 * Initializes entity schema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for the callback function.
			 * @private
			 */
			initializeEntitySchema: function(callback, scope) {
				var entitySchemaName = this.entitySchemaName;
				var entitySchema = this.getEntitySchema();
				if (entitySchema) {
					callback.call(scope);
				} else {
					this.sandbox.requireModuleDescriptors([entitySchemaName], function() {
						this.Terrasoft.require([entitySchemaName], callback, scope);
					}, scope);
				}
			},

			/**
			 * Returns entity schema.
			 * @return {Object} Entity schema.
			 */
			getEntitySchema: function() {
				var entitySchemaName = this.entitySchemaName;
				var entitySchemaClassName =  this.getEntitySchemaClassName(entitySchemaName);
				return this.Ext.ClassManager.get(entitySchemaClassName);
			},

			/**
			 * Returns entity schema class name.
			 * @param {String} entitySchemaName Entity schema name.
			 * @return {String} Entity schema class name.
			 * @private
			 */
			getEntitySchemaClassName: function(entitySchemaName) {
				return "Terrasoft." + entitySchemaName;
			},

			/**
			 * Sets module config profile.
			 * @param {Object} profile Received profile.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 * @protected
			 * @virtual
			 */
			setProfile: function(profile, callback, scope) {
				var isProfileCorrect = this.checkProfile(profile);
				if (!isProfileCorrect) {
					this.setDefaultProfile(callback, scope);
				} else {
					this.setReceivedProfile(profile, callback, scope);
				}
			},

			/**
			 * Returns result of the profile check.
			 * @param {Object} profile Received profile.
			 * @return {boolean} Result of the profile check.
			 * @private
			 */
			checkProfile: function(profile) {
				var isListedConfigExists = this.checkProfileListedConfigExists(profile);
				if (isListedConfigExists) {
					var columns = this.getColumnsFromListedConfig(profile);
					var isColumnsExists = this.checkEntityForColumnsExists(columns);
					return isColumnsExists;
				} else {
					return false;
				}
			},

			/**
			 * Returns array with columns name from the profile listed config.
			 * @param {Object} profile Received profile.
			 * @return {Array} Columns name from the profile listed config.
			 * @private
			 */
			getColumnsFromListedConfig: function(profile) {
				var listedConfig = this.Terrasoft.decode(profile.listedConfig || profile.DataGrid.listedConfig);
				var listedConfigColumns = listedConfig.items;
				var columns = [];
				this.Terrasoft.each(listedConfigColumns, function(item) {
					columns.push(item.bindTo);
				}, this);
				return columns;
			},

			/**
			 * Checks current entity for columns exists.
			 * @param {Array} columns Columns name.
			 * @return {Boolean} Result of the check.
			 * @private
			 */
			checkEntityForColumnsExists: function(columns) {
				var entityColumns = this.Terrasoft[this.entitySchemaName].columns;
				var isColumnsExists = true;
				this.Terrasoft.each(columns, function(columnName) {
					if (!entityColumns[columnName]) {
						isColumnsExists = false;
						return false;
					}
				}, this);
				return isColumnsExists;
			},

			/**
			 * Check profile for exists listed config.
			 * @param {Object} profile Profile object.
			 * @return {Boolean} Is listed config exists.
			 */
			checkProfileListedConfigExists: function(profile) {
				var isListedConfigExists = false;
				if (profile && ((profile.DataGrid && profile.DataGrid.listedConfig) || profile.listedConfig)) {
					isListedConfigExists = true;
				}
				return isListedConfigExists;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#init
			 * @overridden
			 */
			init: function() {
				if (!this.viewModel) {
					this.initModuleConfig();
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewConfig
			 * @overridden
			 */
			initViewConfig: function(callback, scope) {
				this.initProfile(function() {
					this.setViewConfig(callback, scope);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var config = this.callParent(arguments);
				config.values = this.Ext.apply({}, this.moduleConfig);
				config.entitySchema = this.entitySchema;
				return config;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
			 * @overridden
			 */
			initViewModelClass: function(callback, scope) {
				this.viewModelClass = this.Ext.ClassManager.get(this.viewModelClassName);
				this.initializeEntitySchema(function() {
					this.entitySchema = this.getEntitySchema();
					callback.call(scope);
				}, this);
			}
		});

		return Terrasoft.MultiDeleteDetailModule;
	});


