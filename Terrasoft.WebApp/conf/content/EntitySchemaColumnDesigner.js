Terrasoft.configuration.Structures["EntitySchemaColumnDesigner"] = {innerHierarchyStack: ["EntitySchemaColumnDesigner"], structureParent: "BaseDesigner"};
define('EntitySchemaColumnDesignerStructure', ['EntitySchemaColumnDesignerResources'], function(resources) {return {schemaUId:'efc4724d-a390-4899-af9d-849cb70b3f19',schemaCaption: "Object column designer", parentSchemaName: "BaseDesigner", schemaName:'EntitySchemaColumnDesigner',parentSchemaUId:'24eee2b0-3ed3-4b62-aa3b-62ca6886ef59',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDesigner
 */
define("EntitySchemaColumnDesigner", ["terrasoft", "BusinessRuleModule", "DesignTimeEnums",
	"ApplicationStructureWizardUtils"
], function(Terrasoft, BusinessRuleModule) {
	return {
		messages: {

			"ChangeHeaderCaption": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetColumnConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetSchemaColumnsNames": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetDesignerDisplayConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetNewLookupPackageUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		rules: {
			"ReferenceSchemaUId": {
				"RequiredReferenceSchemaUId": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.REQUIRED,
					logical: Terrasoft.LogicalOperatorType.AND,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "DataValueType"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: Terrasoft.DataValueType.LOOKUP
						}
					}, {
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "UseNewLookup"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: false
						}
					}]
				}
			},
			"NewSchemaCaption": {
				"RequiredNewSchemaCaption": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.REQUIRED,
					logical: Terrasoft.LogicalOperatorType.AND,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "DataValueType"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: Terrasoft.DataValueType.LOOKUP
						}
					}, {
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "UseNewLookup"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"NewSchemaName": {
				"RequiredNewSchemaName": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.REQUIRED,
					logical: Terrasoft.LogicalOperatorType.AND,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "DataValueType"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: Terrasoft.DataValueType.LOOKUP
						}
					}, {
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "UseNewLookup"
						},
						comparisonType: Terrasoft.ComparisonType.EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: true
						}
					}]
				}
			},
			"IsRequired": {
				"RequiredNewSchemaName": {
					ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					property: BusinessRuleModule.enums.Property.VISIBLE,
					logical: Terrasoft.LogicalOperatorType.AND,
					conditions: [{
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "DataValueType"
						},
						comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: Terrasoft.DataValueType.INTEGER
						}
					}, {
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "DataValueType"
						},
						comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: Terrasoft.DataValueType.FLOAT
						}
					}, {
						leftExpression: {
							type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							attribute: "DataValueType"
						},
						comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
						rightExpression: {
							type: BusinessRuleModule.enums.ValueType.CONSTANT,
							value: Terrasoft.DataValueType.BOOLEAN
						}
					}]
				}
			}
		},
		attributes: {

			UId: {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			Caption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			Name: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			Description: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			DataValueType: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			ReferenceSchemaUId: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			IsRequired: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			IsVirtual: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			IsValueCloneable: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			IsSimpleLookup: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			IsCascade: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			DataValueTypeConfig: {
				dataValueType: Terrasoft.DataValueType.ENUM,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			Column: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			UseNewLookup: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			NewSchemaCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			NewSchemaName: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: ""
			}

		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_onReferenceSchemaChanged: function() {
				const referenceSchemaUId = this.$ReferenceSchemaUId && this.$ReferenceSchemaUId.value;
				if (referenceSchemaUId) {
					Terrasoft.chain(
						function(next) {
							this.getCurrentPackageUId(next, this);
						},
						function(next, packageUId) {
							Terrasoft.EntitySchemaManager.findBundleSchemaInstance({
								schemaUId: referenceSchemaUId,
								packageUId: packageUId
							}, next, this);
						},
						function(next, schema) {
							if (!(schema && schema.primaryDisplayColumn)) {
								this.$ReferenceSchemaUId = null;
								Terrasoft.showMessage(this.get("Resources.Strings.LookupSchemaDoesNotHavePrimaryDisplayColumnMsg"));
							}
						},
						this
					);
				}
			},

			/**
			 * @private
			 */
			_subscribeOnAttributeChanges: function() {
				this.subscribeOnColumnChange("ReferenceSchemaUId", this._onReferenceSchemaChanged, this);
			},

			/**
			 * @private
			 */
			_unsubscribeOnAttributeChanges: function() {
				this.unsubscribeOnColumnChange("ReferenceSchemaUId", this._onReferenceSchemaChanged, this);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc BaseDesigner#initSectionCaption
			 * @override
			 */
			initSectionCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc BaseDesigner#changeDesignerCaption
			 * @override
			 */
			changeDesignerCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Caption", this.columnLengthValidator);
				this.addColumnValidator("Name", this.columnLengthValidator);
				this.addColumnValidator("Name", this.columnNameRegExpValidator);
				this.addColumnValidator("Name", this.columnPrefixValidator);
				this.addColumnValidator("Name", this.columnDuplicateNameValidator);
				this.addColumnValidator("NewSchemaName", this.schemaNameLengthValidator);
				this.addColumnValidator("NewSchemaName", this.schemaNameRegExpValidator);
				this.addColumnValidator("NewSchemaName", this.schemaNamePrefixValidator);
				this.addColumnValidator("NewSchemaName", this.schemaDuplicateNameValidator);
			},

			/**
			 * @inheritdoc BasePageV2#onRender
			 * @override
			 */
			onRender: function() {
				this.updateSize(550, 590);
				this.hideBodyMask();
			},

			/**
			 * Returned column config.
			 * @protected
			 * @return {Object} Column config.
			 */
			getColumnConfig: function() {
				return this.sandbox.publish("GetColumnConfig", null, [this.sandbox.id]);
			},

			/**
			 * Method create new lookup schema.
			 * @protected
			 * @param {Object} config New lookup config.
			 * @param {String} config.name New lookup name.
			 * @param {String} config.caption New lookup caption.
			 * @param {String} config.packageUId New lookup package UId.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			createReferenceEntitySchema: function(config, callback, scope) {
				const name = config.name;
				const caption = config.caption;
				const packageUId = config.packageUId;
				Terrasoft.EntitySchemaManager.initialize(function() {
					const newEntityUId = Terrasoft.generateGUID();
					const newSchema = Terrasoft.EntitySchemaManager.createSchema({
						uId: newEntityUId,
						name: name,
						packageUId: packageUId,
						caption: {}
					});
					newSchema.setLocalizableStringPropertyValue("caption", caption);
					const baseLookupUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_LOOKUP;
					newSchema.setParent(baseLookupUId, function() {
						const entitySchema = Terrasoft.EntitySchemaManager.addSchema(newSchema);
						Terrasoft.DataManager.initEntitySchemaDataCollection(name);
						newSchema.define();
						Terrasoft.ApplicationStructureWizardUtils.createLookupManagerItem(entitySchema, function() {
							callback.call(scope, entitySchema);
						}, this);
					}, this);
				}, this);
			},

			/**
			 * Initialize schema name prefix
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initSchemaNamePrefix: function(callback, scope) {
				const schemaNamePrefix = Terrasoft.ClientUnitSchemaManager.schemaNamePrefix;
				this.set("SchemaNamePrefix", schemaNamePrefix);
				callback.call(scope);
			},

			/**
			 * Initialize schema column name list.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initSchemaColumnsNames: function(callback, scope) {
				const sandbox = this.sandbox;
				const schemaColumnsNames = sandbox.publish("GetSchemaColumnsNames", null, [sandbox.id]);
				const designerDisplayConfig = this.get("DesignerDisplayConfig");
				if (!designerDisplayConfig.isNewColumn) {
					const column = this.get("Column");
					const currentColumnName = column.getPropertyValue("name");
					const indexOfCurrentColumn = schemaColumnsNames.indexOf(currentColumnName);
					if (indexOfCurrentColumn !== -1) {
						schemaColumnsNames.splice(indexOfCurrentColumn, 1);
					}
				}
				this.set("SchemaColumnsNames", schemaColumnsNames);
				callback.call(scope);
			},

			/**
			 * Initialize designer display config.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initDesignerDisplayConfig: function(callback, scope) {
				const sandbox = this.sandbox;
				const designerDisplayConfig = sandbox.publish("GetDesignerDisplayConfig", null, [sandbox.id]);
				this.set("DesignerDisplayConfig", designerDisplayConfig);
				callback.call(scope);
			},

			/**
			 * Returned caption for designer column.
			 * @protected
			 * @return {String} Designer column caption.
			 */
			getDesignerCaption: function() {
				const config = this.get("DesignerDisplayConfig");
				const parentViewModel = this.get("ModelItem").parentViewModel;
				let caption = config && config.isNewColumn
					? this.get("Resources.Strings.NewColumnCaption")
					: this.get("Resources.Strings.DesignerCaption");
				if (!parentViewModel.get("IsPrimary")) {
					caption += " (" + parentViewModel.get("Caption") + ")";
				}
				return caption;
			},

			/**
			 * Initialize model default values.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initColumnAttributes();
					const columnConfig = this.getColumnConfig();
					const column = columnConfig.column;
					this.set("Column", column);
					this.set("UseNewLookup", false);
					Terrasoft.chain(
						this.initSchemaNamePrefix,
						this.initDesignerDisplayConfig,
						this.initSchemaColumnsNames,
						function(next) {
							Terrasoft.SchemaDesignerUtilities.getDataValueTypeInfo(next, this);
						},
						function(next, dataValueTypeInfo) {
							this.set("DataValueTypeConfig", dataValueTypeInfo);
							this.setAttributes(column);
							this._subscribeOnAttributeChanges();
							callback.call(scope);
						}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this._unsubscribeOnAttributeChanges();
				this.callParent(arguments);
			},

			/**
			 * Initializes entity schema column attributes.
			 * @protected
			 */
			initColumnAttributes: function() {
				this.columns.Name.size = Terrasoft.EntitySchemaManager.getMaxEntitySchemaNameLength() -
					Terrasoft.DesignTimeEnums.EntitySchemaColumnSizes.ENTITY_SCHEMA_COLUMN_ID_SUFFIX_SIZE -
					Terrasoft.EntitySchemaManager.getSchemaNamePrefix().length;
				this.columns.Caption.size = Terrasoft.DesignTimeEnums.EntitySchemaColumnSizes.MAX_CAPTION_SIZE;
			},

			/**
			 * Method set model property by column.
			 * @protected
			 * @param {Terrasoft.manager.EntitySchemaColumn} entitySchemaColumn Column.
			 */
			setAttributes: function(entitySchemaColumn) {
				const attributeColumnPropertyNames = this.getPropertyTranslator();
				Terrasoft.each(attributeColumnPropertyNames, function(columnPropertyName, attributeName) {
					let value = entitySchemaColumn.getPropertyValue(columnPropertyName);
					if (value && value instanceof Terrasoft.LocalizableString) {
						value = value.getValue() || "";
					}
					if (columnPropertyName === "dataValueType" && value) {
						const dataValueTypeCaption = this.getDataValueTypeCaption(value);
						value = this.getLookupValue(value, dataValueTypeCaption);
					}
					if (columnPropertyName === "referenceSchemaUId" && !Terrasoft.isEmpty(value)) {
						Terrasoft.EntitySchemaManager.getItemByUId(value, function(item) {
							const schemaCaption = item.getCaption();
							value = this.getLookupValue(value, schemaCaption);
							this.setColumnValue(attributeName, value, {preventValidation: true});
						}, this);
						return;
					}
					this.setColumnValue(attributeName, value, {preventValidation: true});
				}, this);
			},

			/**
			 * Returns object for lookup column.
			 * @protected
			 * @param {String} value Value.
			 * @param {String} displayValue Display value.
			 * @return {Object} Object for lookup column.
			 */
			getLookupValue: function(value, displayValue) {
				return {
					value: value,
					displayValue: displayValue
				};
			},

			/**
			 * Returns data value type caption.
			 * @protected
			 * @param {String} value Value.
			 * @return {String} Data value type caption.
			 */
			getDataValueTypeCaption: function(value) {
				let dataValueTypeCaption = null;
				const dataValueTypesConfig = this.get("DataValueTypeConfig");
				Terrasoft.each(dataValueTypesConfig, function(dataValueType) {
					if (dataValueType.DataValueType === value) {
						dataValueTypeCaption = dataValueType.Caption;
						return false;
					}
				}, this);
				return dataValueTypeCaption;
			},

			/**
			 * Returns dictionary of conformity property between view model and column.
			 * @protected
			 * @return {Object} Dictionary of conformity property between view model and column.
			 */
			getPropertyTranslator: function() {
				return {
					"UId": "uId",
					"Caption": "caption",
					"Name": "name",
					"Description": "description",
					"DataValueType": "dataValueType",
					"ReferenceSchemaUId": "referenceSchemaUId",
					"IsRequired": "isRequired",
					"IsValueCloneable": "isValueCloneable",
					"IsSimpleLookup": "isSimpleLookup",
					"IsCascade": "isCascade",
					"IsInherited": "isInherited"
				};
			},

			/**
			 * Returns isSimpleLookup field visible flag.
			 * @protected
			 * @return {Boolean} isSimpleLookup field visible flag.
			 */
			isLookupDataValueType: function() {
				let dataValueType = this.get("DataValueType");
				dataValueType = dataValueType && dataValueType.value;
				return Terrasoft.isLookupDataValueType(dataValueType);
			},

			/**
			 * Returns property list for current column data type.
			 * @protected
			 * @param {Terrasoft.DataValueType} dataValueType Data type.
			 * @return {Array} Property list.
			 */
			getActualFieldsConfig: function(dataValueType) {
				const commonConfig = ["UId", "DataValueType", "Caption", "Name", "Description", "IsRequired",
					"IsValueCloneable"];
				const typedConfig = {
					LOOKUP: ["ReferenceSchemaUId", "IsSimpleLookup", "IsCascade"]
				};
				const dataValueTypeName = this.getDataValueTypeName(dataValueType);
				const resultConfig = commonConfig.concat(typedConfig[dataValueTypeName] || []);
				return resultConfig;
			},

			/**
			 * Returns data type name.
			 * @protected
			 * @param {Terrasoft.DataValueType} dataValueType Data type.
			 * @return {String} Data type name.
			 */
			getDataValueTypeName: function(dataValueType) {
				let dataValueTypeName = null;
				Terrasoft.each(Terrasoft.DataValueType, function(value, name) {
					if (value === dataValueType) {
						dataValueTypeName = name;
						return false;
					}
				}, this);
				return dataValueTypeName;
			},

			/**
			 * Method prepared data value type list.
			 * @protected
			 * @param {String} filter Filter.
			 * @param {Terrasoft.core.collections.Collection} list List.
			 */
			prepareDataValueTypeList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getDataValueTypeList());
			},

			/**
			 * Returns data value type list.
			 * @protected
			 * @return {Object} Data value type list.
			 */
			getDataValueTypeList: function() {
				const resultConfig = {};
				const dataValueTypeConfig = this.get("DataValueTypeConfig");
				Terrasoft.each(dataValueTypeConfig, function(dataValueType) {
					const dataValueTypeName = dataValueType.DataValueType;
					const dataValueTypeCaption = dataValueType.Caption;
					resultConfig[dataValueTypeName] = {
						value: dataValueTypeName,
						displayValue: dataValueTypeCaption
					};
				}, this);
				return resultConfig;
			},

			/**
			 * Method prepared reference schema list.
			 * @protected
			 * @param {String} filter Filter.
			 * @param {Terrasoft.core.collections.Collection} list List.
			 */
			prepareReferenceSchemaList: function(filter, list) {
				if (list === null) {
					return;
				}
				this.getReferenceSchemaList(function(referenceSchemaList) {
					list.reloadAll(referenceSchemaList);
				}, this);
			},

			/**
			 * Returns reference schema list.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getReferenceSchemaList: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.getCurrentPackageUId(next, this);
					},
					function(next, packageUId) {
						Terrasoft.EntitySchemaManager.findPackageItems(packageUId, next, this);
					},
					function(next, items) {
						const resultConfig = {};
						items.each(function(item) {
							resultConfig[item.getUId()] = {
								value: item.getUId(),
								displayValue: item.getCaption()
							};
						}, this);
						callback.call(scope, Terrasoft.sortObj(resultConfig, "displayValue"));
					},
					this
				);
			},

			/**
			 * Returns current package UId.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @return {String} Package UId.
			 */
			getCurrentPackageUId: function(callback, scope) {
				const sysPackageUId = this.sandbox.publish("GetNewLookupPackageUId", null, [this.sandbox.id]);
				callback.call(scope, sysPackageUId);
			},

			/**
			 * Method update column reference link before save.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initReferenceSchemaBeforeSave: function(callback, scope) {
				const useNewLookup = this.get("UseNewLookup");
				const isInherited = this.get("IsInherited");
				const chain = [];
				if (this.isLookupDataValueType() && useNewLookup && !isInherited) {
					chain.push(
						this.getCurrentPackageUId,
						function(next, packageUId) {
							const createSchemaConfig = {
								name: this.get("NewSchemaName"),
								caption: this.get("NewSchemaCaption"),
								packageUId: packageUId
							};
							this.createReferenceEntitySchema(createSchemaConfig, next, this);
						},
						function(next, instance) {
							this.set("ReferenceSchemaUId", {
								value: instance.getUId(),
								displayValue: instance.getCaption()
							});
							next();
						}
					);
				}
				chain.push(function() {
					callback.call(scope);
				}, this);
				Terrasoft.chain.apply(this, chain);
			},

			/**
			 * Validate column name by column list in entity.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			columnDuplicateNameValidator: function(value) {
				let message = "";
				const schemaColumnsNames = this.get("SchemaColumnsNames");
				if (!Ext.isEmpty(schemaColumnsNames)) {
					const lowerCaseNames = schemaColumnsNames.map(function(name) {
						return name.toLowerCase();
					}, this);
					const lowerCaseValue = value.toLowerCase();
					if (Ext.Array.contains(lowerCaseNames, lowerCaseValue)) {
						message = this.get("Resources.Strings.DuplicateColumnNameMessage");
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Validate column name by contain required prefix.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			columnPrefixValidator: function(value) {
				let message = "";
				const schemaNamePrefix = this.get("SchemaNamePrefix");
				if (!Ext.isEmpty(schemaNamePrefix) && !this.get("IsInherited")) {
					const validColumnPrefixRegExp = new RegExp("^" + schemaNamePrefix + ".*$");
					if (!validColumnPrefixRegExp.test(value)) {
						message = Ext.String.format(this.get("Resources.Strings.WrongPrefixMessage"),
							schemaNamePrefix);
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Validate column name by contain invalid char.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			columnNameRegExpValidator: function(value) {
				let message = "";
				const validColumnNameRegExp = /^[a-zA-Z]{1}[a-zA-Z0-9]*$/;
				if (!validColumnNameRegExp.test(value)) {
					message = this.get("Resources.Strings.WrongColumnNameMessage");
				}
				return {invalidMessage: message};
			},

			/**
			 * Validate new lookup name by manager list.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			schemaDuplicateNameValidator: function(value) {
				let message = "";
				if (this.get("UseNewLookup")) {
					const entitySchemaManagerItems = Terrasoft.EntitySchemaManager.getItems();
					const filteredEntitySchemaManagerItems = entitySchemaManagerItems.filterByFn(function(item) {
						return item.name.toLowerCase() === value.toLowerCase();
					}, this);
					if (!filteredEntitySchemaManagerItems.isEmpty()) {
						message = this.get("Resources.Strings.DuplicateSchemaNameMessage");
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Validate new lookup name by contain required prefix.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			schemaNamePrefixValidator: function(value) {
				let message = "";
				const schemaNamePrefix = this.get("SchemaNamePrefix");
				if (!Ext.isEmpty(schemaNamePrefix) && this.get("UseNewLookup")) {
					const validSchemaNamePrefixRegExp = new RegExp("^" + schemaNamePrefix + ".*$");
					if (!validSchemaNamePrefixRegExp.test(value)) {
						message = Ext.String.format(this.get("Resources.Strings.WrongPrefixMessage"),
							schemaNamePrefix);
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Validate new lookup name by contain invalid char.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			schemaNameRegExpValidator: function(value) {
				let message = "";
				if (this.get("UseNewLookup")) {
					const validSchemaNameRegExp = /^[a-zA-Z]{1}[a-zA-Z0-9]*$/;
					if (!validSchemaNameRegExp.test(value)) {
						message = this.get("Resources.Strings.WrongSchemaNameMessage");
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Validate new lookup name by length.
			 * @protected
			 * @param {String} value Value for validate.
			 * @return {Object} Validate response.
			 */
			schemaNameLengthValidator: function(value) {
				let message = "";
				if (this.get("UseNewLookup")) {
					const maxLength = Terrasoft.EntitySchemaManager.getMaxEntitySchemaNameLength();
					if (value.length >= maxLength) {
						message = Ext.String.format(this.get("Resources.Strings.WrongSchemaNameLengthMessage"),
							maxLength);
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Method update column by view model.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			updateColumn: function(callback, scope) {
				const dataValueTypeLookupValue = this.get("DataValueType");
				const dataValueType = dataValueTypeLookupValue.value;
				const actualFieldsConfig = this.getActualFieldsConfig(dataValueType);
				const column = this.get("Column");
				const attributeColumnPropertyNames = this.getPropertyTranslator();
				Terrasoft.each(actualFieldsConfig, function(fieldName) {
					const columnPropertyName = attributeColumnPropertyNames[fieldName];
					let attributeValue = this.get(fieldName);
					const columnValue = column.getPropertyValue(columnPropertyName);
					if (Terrasoft.instanceOfClass(columnValue, "Terrasoft.LocalizableString")) {
						column.setLocalizableStringPropertyValue(columnPropertyName, attributeValue);
						return;
					}
					attributeValue = (attributeValue && attributeValue.value) || attributeValue;
					column.setPropertyValue(columnPropertyName, attributeValue);
				}, this);
				column.fireEvent("changed", {}, this);
				callback.call(scope);
			},

			/**
			 * Validate view model on async mode.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			asyncValidate: function(callback, scope) {
				const validationResult = this.validate();
				callback.call(scope, validationResult);
			},

			/**
			 * Save column property.
			 * @protected
			 */
			save: function() {
				Terrasoft.chain(
					this.asyncValidate,
					function(next, validationResult) {
						if (validationResult) {
							next();
						}
					},
					this.initReferenceSchemaBeforeSave,
					this.updateColumn,
					function() {
						this.onSaved();
					}, this);
			},

			/**
			 * OnSaved column property handler.
			 * @protected
			 */
			onSaved: Terrasoft.emptyFn,

			/**
			 * Cancel save column property handler.
			 * @protected
			 */
			cancel: Terrasoft.emptyFn

			// endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "ColumnPropertiesControlGroup",
				"parentName": "BaseDesignerContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"items": []
				}
			},
			{
				"operation": "move",
				"name": "BaseDesignerFooterContainer",
				"parentName": "ColumnPropertiesControlGroup",
				"propertyName": "items"
			},
			{
				"operation": "merge",
				"name": "BaseDesignerFooterContainer",
				"values": {
					"layout": {"row": 0}
				}
			},
			{
				"operation": "insert",
				"name": "MainPropertiesContainer",
				"parentName": "BaseDesignerFooterContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "CaptionContainer",
				"parentName": "MainPropertiesContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["field-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Caption",
				"parentName": "CaptionContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.ColumnCaption"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "NameContainer",
				"parentName": "MainPropertiesContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["field-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Name",
				"parentName": "NameContainer",
				"propertyName": "items",
				"values": {
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.NameLabel"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsRequiredContainer",
				"parentName": "AdditionalPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["field-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "IsRequired",
				"parentName": "IsRequiredContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.isRequiredLabel"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "DataValueType",
				"parentName": "MainPropertiesContainer",
				"propertyName": "items",
				"values": {
					"visible": false,
					"contentType": Terrasoft.ContentType.ENUM,
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.DataValueTypeLabel"}
					},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {"bindTo": "prepareDataValueTypeList"},
						"list": {"bindTo": "dataValueTypeList"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "LookupPropertiesControlGroup",
				"parentName": "BaseDesignerFooterContainer",
				"propertyName": "items",
				"values": {
					"visible": {"bindTo": "isLookupDataValueType"},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					caption: {bindTo: "Resources.Strings.LookupCaption"},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "OrNewLookupContainer",
				"parentName": "LookupPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["field-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "UseNewLookup",
				"parentName": "OrNewLookupContainer",
				"propertyName": "items",
				"values": {
					"value": {"bindTo": "UseNewLookup"},
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"classes": {
						"wrapClassName": ["use-new-lookup"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "UseNewLookup",
				"propertyName": "items",
				"name": "UseNewLookupFalse",
				"values": {
					"caption": {"bindTo": "Resources.Strings.UseExistingLookupCaption"},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"markerValue": "UseNewLookupFalse",
					"value": false
				}
			},
			{
				"operation": "insert",
				"parentName": "UseNewLookup",
				"propertyName": "items",
				"name": "UseNewLookupTrue",
				"values": {
					"caption": {"bindTo": "Resources.Strings.CreateNewLookupCaption"},
					"visible": {"bindTo": "isLookupDataValueType"},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"markerValue": "UseNewLookupTrue",
					"value": true
				}
			},
			{
				"operation": "insert",
				"name": "ReferenceSchemaUIdContainer",
				"parentName": "LookupPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["field-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ReferenceSchemaUId",
				"parentName": "ReferenceSchemaUIdContainer",
				"propertyName": "items",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.referenceSchemaUIdLabel"}
					},
					"visible": {
						"bindTo": "UseNewLookup",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"controlConfig": {
						"prepareList": {"bindTo": "prepareReferenceSchemaList"},
						"list": {"bindTo": "ReferenceSchemaUIdList"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "NewSchemaCaption",
				"parentName": "ReferenceSchemaUIdContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.NewSchemaCaptionFieldCaption"}
					},
					"visible": {"bindTo": "UseNewLookup"},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "NewSchemaName",
				"parentName": "ReferenceSchemaUIdContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.NewSchemaNameFieldCaption"}
					},
					"visible": {"bindTo": "UseNewLookup"},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "LookupPropertiesGridLayout",
				"parentName": "LookupPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"visible": {"bindTo": "isLookupDataValueType"},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "IsSimpleLookupCaption",
				"parentName": "LookupPropertiesGridLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"caption": {"bindTo": "Resources.Strings.LookupTypeCaption"},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["lookup-view-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsSimpleLookup",
				"parentName": "LookupPropertiesGridLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"value": {"bindTo": "IsSimpleLookup"},
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "IsSimpleLookup",
				"propertyName": "items",
				"name": "IsSimpleLookupFalse",
				"values": {
					"caption": {"bindTo": "Resources.Strings.LookupTypeLabel"},
					"visible": {"bindTo": "isLookupDataValueType"},
					"markerValue": "IsSimpleLookupFalse",
					"value": false
				}
			},
			{
				"operation": "insert",
				"parentName": "IsSimpleLookup",
				"propertyName": "items",
				"name": "IsSimpleLookupTrue",
				"values": {
					"caption": {"bindTo": "Resources.Strings.DropDownTypeLabel"},
					"visible": {"bindTo": "isLookupDataValueType"},
					"markerValue": "IsSimpleLookupTrue",
					"value": true
				}
			},
			{
				"operation": "insert",
				"name": "AdditionalPropertiesControlGroup",
				"parentName": "BaseDesignerFooterContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {bindTo: "Resources.Strings.AdditionalPropertiesCaption"},
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "IsCascade",
				"parentName": "AdditionalPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"visible": {"bindTo": "isLookupDataValueType"},
					"enabled": {
						"bindTo": "IsInherited",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.isCascadeLabel"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsValueCloneable",
				"parentName": "AdditionalPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.isValueCloneableLabel"}
					},
					"classes": {
						"wrapClassName": ["is-value-cloneable"]
					},
					"tip": {
						"content": {"bindTo": "Resources.Strings.IsValueCloneableHint"}
					}
				}
			}
		]
	};
});


