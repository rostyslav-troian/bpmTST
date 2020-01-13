Terrasoft.configuration.Structures["ViewModelSchemaDesignerBuilder"] = {innerHierarchyStack: ["ViewModelSchemaDesignerBuilder"]};
define("ViewModelSchemaDesignerBuilder", [
	"ViewModelSchemaDesignerViewModelGenerator",
	"PackageSchemaBuilder",
	"ViewModelSchemaDesignerViewGenerator",
	"ViewModelSchemaValidationMixin",
	"ViewConfigBuilderMixin"
], function() {
	/**
	 * @class Terrasoft.configuration.ViewModelSchemaDesignerBuilder
	 * Class, which generates the view and view model for the designer module of client schema.
	 */
	const schemaGenerator = Ext.define("Terrasoft.configuration.ViewModelSchemaDesignerBuilder", {
		extend: "Terrasoft.PackageSchemaBuilder",
		alternateClassName: "Terrasoft.ViewModelSchemaDesignerBuilder",

		mixins: {
			ViewModelSchemaValidationMixin: "Terrasoft.ViewModelSchemaValidationMixin",
			ViewConfigBuilderMixin: "Terrasoft.ViewConfigBuilderMixin"
		},

		/**
		 * Designer schema name.
		 * @protected
		 * @type {String}
		 */
		designerSchemaName: "ViewModelSchemaDesignerSchema",

		/**
		 * @inheritdoc Terrasoft.SchemaBuilder#getLastChildInHierarchy
		 * @overridden
		 */
		getLastChildInHierarchy: function(hierarchy, hierarchyStack) {
			return hierarchy[hierarchyStack.length - 2];
		},

		/**
		 * @inheritdoc Terrasoft.SchemaBuilder#initSchemaProfile
		 * @override
		 */
		initSchemaProfile: function(callback, config) {
			config.schemaResponse.profile = {};
			callback(config);
		},

		/**
		 * @inheritdoc Terrasoft.SchemaBuilder#onSchemaHierarchyBuilt
		 * @override
		 */
		onSchemaHierarchyBuilt: function(initialHierarchy, initialConfig, callback, scope) {
			this.callParent([initialHierarchy, initialConfig, function(hierarchy, config) {
				this.requireDesignSchemaHierarchy(config, function(designHierarchy) {
					const hierarchyStack = config.hierarchyStack;
					Ext.callback(callback, scope, [hierarchyStack.concat(designHierarchy), config]);
				}, this);
			}, this]);
		},

		/**
		 * Gets design schema hierarchy.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {Array} config.hierarchyStack Hierarchy stack.
		 * @param {String} config.profileKey Profile key.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		requireDesignSchemaHierarchy: function(config, callback, scope) {
			const designSchemaConfig = {
				schemaName: this.designerSchemaName,
				profileKey: config.profileKey,
				hierarchyStack: [],
				isDesignSchema: true
			};
			this.requireAllSchemaHierarchy(designSchemaConfig, function(designHierarchy) {
				const firstSchema = config.hierarchyStack[config.hierarchyStack.length - 1];
				Terrasoft.each(designHierarchy, function(designSchema) {
					designSchema.isDesignSchema = true;
					designSchema.schemaName += firstSchema.schemaName;
				}, this);
				const lastDesignSchema = designHierarchy[0];
				const firstDesignSchema = designHierarchy[designHierarchy.length - 1];
				firstDesignSchema.type = Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA;
				firstDesignSchema.designedSchemaUId = firstSchema.schemaUId;
				lastDesignSchema.attributes = lastDesignSchema.attributes || {};
				Ext.apply(lastDesignSchema.attributes, {
					designerClientUnitSchemaUId: {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: firstSchema.schemaUId
					}
				});
				callback.call(scope, designHierarchy);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.SchemaBuilder#generateViewConfig
		 * @protected
		 */
		generateViewConfig: function(schema) {
			if (Ext.isEmpty(schema.viewConfig)) {
				this.callParent(arguments);
				const requiredContainerNames = ["DesignContainer", "CardWidgetDesigner"];
				schema.viewConfig = schema.viewConfig.filter(function(x) {
					return requiredContainerNames.indexOf(x.name) >= 0;
				});
			}
		},

		/**
		 * Generates view configuration of schema error information.
		 * @protected
		 * @param {Object} schema The schema, for which the view is generated.
		 * @param {Object[]} hierarchy Schema hierarchy.
		 */
		generateInfoViewConfig: function(schema, hierarchy) {
			let viewConfig = [];
			Terrasoft.each(hierarchy, function(schemaInHierarchy) {
				viewConfig = this.applyViewDiff(viewConfig, schemaInHierarchy.infoDiff);
			}, this);
			schema.viewConfig = viewConfig;
		},

		/**
		 * Generates base schema view configuration for validation schema.
		 * @protected
		 * @param {Object} schema The schema, for which the view is generated.
		 * @param {Object[]} hierarchy Schema hierarchy.
		 */
		generateBaseSchemaViewConfig: function(schema, hierarchy) {
			let viewConfig = [];
			Terrasoft.each(hierarchy, function(schemaInHierarchy) {
				if (!schemaInHierarchy.isDesignSchema) {
					viewConfig = this.applyViewDiff(viewConfig, schemaInHierarchy.diff);
				}
			}, this);
			const propertyNames = this.mixins.ViewConfigBuilderMixin.collectPropertyNames(hierarchy);
			this.mixins.ViewConfigBuilderMixin.removeDuplicates(viewConfig, propertyNames);
			schema.viewConfig = viewConfig;
		},

		/**
		 * Generates schema view. Validate client schema.
		 * @override
		 * @param {Object} config Configuration object.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		buildSchema: function(config, callback, scope) {
			let schema = config.schema;
			const hierarchy = config.hierarchy;
			if (!Ext.isEmpty(config.isValid)) {
				schema.attributes.GenerationValid = {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: config.isValid
				};
				if (!config.isValid) {
					this.generateInfoViewConfig(schema, hierarchy);
					schema.attributes.GenerationInfoMessage = {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: config.message
					};
				}
				this.callParent(arguments);
			} else {
				const lastHierarchyElement = hierarchy[hierarchy.length - 1];
				schema = {
					type: lastHierarchyElement.type,
					viewConfig: [],
					resources: schema.resources
				};
				this.generateBaseSchemaViewConfig(schema, hierarchy);
				this.validateSchema(schema, function(result) {
					config.isValid = result.success;
					config.message = result.message;
					const duplicationValidationWarning = this.checkDuplicates(schema);
					if (!Ext.Object.isEmpty(duplicationValidationWarning)) {
						config.schema.attributes.ValidationWarnings = {
							type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							value: [duplicationValidationWarning]
						};
					}
					this.buildSchema(config, callback, scope);
				}, this);
			}
		},

		/**
		 * Creates an instance of Terrasoft.ViewGenerator class.
		 * @return {Terrasoft.ViewGenerator} Returns an instance of Terrasoft.ViewGenerator class.
		 */
		createDesignViewGenerator: function() {
			return Ext.create("Terrasoft.ViewModelSchemaDesignerViewGenerator");
		},

		/**
		 * Creates an instance of Terrasoft.ViewModelGenerator class.
		 * @return {Terrasoft.ViewGenerator} Returns an instance of Terrasoft.ViewModelGenerator class.
		 */
		createViewModelGenerator: function() {
			return Ext.create("Terrasoft.ViewModelSchemaDesignerViewModelGenerator", {
				useCache: false
			});
		}

	});

	return Ext.create(schemaGenerator);
});


