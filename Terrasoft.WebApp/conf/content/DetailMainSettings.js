Terrasoft.configuration.Structures["DetailMainSettings"] = {innerHierarchyStack: ["DetailMainSettings"]};
define('DetailMainSettingsStructure', ['DetailMainSettingsResources'], function(resources) {return {schemaUId:'4d6f6961-074b-47ca-9c08-01037f1ed4b9',schemaCaption: "Detail - Main settings", parentSchemaName: "", schemaName:'DetailMainSettings',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DetailMainSettings", ["terrasoft", "DetailMainSettingsResources", "DetailManager", "DesignTimeEnums",
	"ConfigurationEnums", "ConfigurationEnumsV2", "BaseWizardStepSchemaMixin"
], function(Terrasoft) {
	return {
		messages: {

			/**
			 * @message UpdateWizardConfig
			 * Publishing message for updating wizard steps configuration.
			 */
			"UpdateWizardConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetPackageUId
			 * Publishing message for package identifier request.
			 */
			"GetPackageUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}

		},
		mixins: {
			BaseWizardStepSchemaMixin: "Terrasoft.BaseWizardStepSchemaMixin"
		},
		attributes: {

			/**
			 * Caption.
			 */
			Caption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				size: 250,
				isRequired: true
			},

			/**
			 * Entity schema UId.
			 */
			EntitySchemaUId: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},

			/**
			 * Detail manager item.
			 */
			DetailManagerItem: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Package identifier.
			 */
			PackageUId: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Top control group header.
			 */
			TopControlGroupHeader: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			}
		},
		methods: {

			// region Methods: Private

			_isNewDetail: function() {
				var detailManagerItem = this.get("DetailManagerItem");
				return detailManagerItem && detailManagerItem.getIsNew();
			},

			// endregion

			// region Methods: Protected

			/**
			 * Initializes detail wizard main settings step.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Context.
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.showBodyMask();
					this.mixins.BaseWizardStepSchemaMixin.init.call(this, function() {
						Ext.callback(callback, scope);
					}, this);
				}, this]);
			},

			/**
			 * Sets top control group settings label to viewModel.
			 * @protected
			 */
			setTopControlGroupHeader: function() {
				var labelCaption = this._isNewDetail()
					? this.get("Resources.Strings.TopControlGroupSettingsNewDetailLabel")
					: this.get("Resources.Strings.TopControlGroupSettingsExistingDetaulLabel");
				this.set("TopControlGroupHeader", labelCaption);
			},

			/**
			 * Sets properties to viewModel.
			 * @protected
			 * @param {Object} config detail configuration.
			 */
			setPropertyValue: function(config) {
				var detailManagerItem = config.applicationStructureItem;
				this.setTopControlGroupHeader();
				Terrasoft.chain(
					function(next) {
						var detailCaption = detailManagerItem.getCaption() || null;
						this.set("DetailManagerItem", detailManagerItem);
						var caption = this.get("Caption");
						if (detailCaption && detailCaption !== caption) {
							this.set("Caption", detailCaption);
						}
						Terrasoft.EntitySchemaManager.initialize(next, this);
					},
					function() {
						var entitySchemaUId = detailManagerItem.getEntitySchemaUId();
						var entitySchemaItems = Terrasoft.EntitySchemaManager.getItems();
						var foundEntitySchemaItems = entitySchemaItems.filterByFn(function(item) {
							return item.uId === entitySchemaUId && !item.extendParent;
						});
						var entitySchemaLookupValue;
						var foundEntitySchemaItem = foundEntitySchemaItems.getByIndex(0);
						if (foundEntitySchemaItem) {
							var entitySchemaCaption = foundEntitySchemaItem.caption;
							entitySchemaLookupValue = this.getLookupValue(entitySchemaUId, entitySchemaCaption);
						} else {
							entitySchemaLookupValue = null;
						}
						this.set("EntitySchemaUId", entitySchemaLookupValue);
					}, this
				);
			},

			/**
			 * Returns EntitySchema field enabled flag.
			 * @protected
			 * @return {Boolean}
			 */
			getIsEntitySchemaFieldEnabled: function() {
				return this._isNewDetail();
			},

			/**
			 * Return lookup value by parameters.
			 * @protected
			 * @param  {String} value Value.
			 * @param {String} displayValue Display value.
			 * @return {Object}
			 */
			getLookupValue: function(value, displayValue) {
				return {
					value: value,
					displayValue: displayValue
				};
			},

			/**
			 * Fill EntitySchema list.
			 * @protected
			 * @param {String} filter Filter.
			 * @param {Terrasoft.Collection} list List.
			 */
			prepareEntitySchemaUIdList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getEntitySchemaUIdList());
			},

			/**
			 * Returns list of EntitySchemas.
			 * @protected
			 * @return {Object}
			 */
			getEntitySchemaUIdList: function() {
				var schemaItems = Terrasoft.EntitySchemaManager.getItems();
				schemaItems.sort("caption", Terrasoft.OrderDirection.ASC);
				var resultConfig = {};
				schemaItems.each(function(schemaItem) {
					if (schemaItem.getExtendParent()) {
						return;
					}
					var schemaUId = schemaItem.getUId();
					resultConfig[schemaUId] = {
						value: schemaUId,
						displayValue: schemaItem.getCaption()
					};
				}, this);
				return resultConfig;
			},

			/**
			 * GetModuleConfig message handler.
			 * @protected
			 */
			onGetModuleConfigResult: function(detailConfig, next, scope) {
				this.setPropertyValue(detailConfig);
				this.on("change:EntitySchemaUId", this.onEntitySchemaUIdChange, this);
				this.on("change:Caption", this.onCaptionChange, this);
				this.hideBodyMask();
				Ext.callback(next, scope);
			},

			/**
			 * EntitySchemaChange message handler.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} model ViewModel.
			 * @param {String} changedValue Changed value.
			 */
			onEntitySchemaUIdChange: function(model, changedValue) {
				var entitySchemaUId = changedValue && changedValue.value;
				var detailManagerItem = this.get("DetailManagerItem");
				detailManagerItem.setEntitySchemaUId(entitySchemaUId);
				this.sandbox.publish("UpdateWizardConfig", detailManagerItem, [this.sandbox.id]);
			},

			/**
			 * Handler for caption change event.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} model ViewModel.
			 * @param {String} changedValue Changed value.
			 */
			onCaptionChange: function(model, changedValue) {
				var detailManagerItem = this.get("DetailManagerItem");
				detailManagerItem.setCaption(changedValue);
			},

			/**
			 * Validate handler.
			 * @protected
			 */
			onValidate: function() {
				this.mixins.BaseWizardStepSchemaMixin.publishValidationResult.call(this, this.validate());
			},

			/**
			 * Save detail.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			onSave: function(callback, scope) {
				if (this.validate()) {
					this.showBodyMask();
					Terrasoft.chain(
						function(next) {
							this.detailSaveProcess(next, this);
						},
						function() {
							this.hideBodyMask();
							this.mixins.BaseWizardStepSchemaMixin
								.publishSavingResult.call(this, this.get("DetailManagerItem"));
							if (callback) {
								callback.call(scope);
							}
						},
						this
					);
				}
			},

			/**
			 * Method for process save detail.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			detailSaveProcess: function(callback, scope) {
				var detailManagerItem = this.get("DetailManagerItem");
				var entitySchemaUIdLookupValue = this.get("EntitySchemaUId");
				var entitySchemaUId = entitySchemaUIdLookupValue && entitySchemaUIdLookupValue.value;
				var entitySchema, sysModuleEntityId;
				Terrasoft.chain(
					function(next) {
						Terrasoft.EntitySchemaManager.getInstanceByUId(entitySchemaUId, next, this);
					},
					function(next, schema) {
						entitySchema = schema;
						if (detailManagerItem.getDetailSchemaUId()) {
							if (detailManagerItem.getIsNew()) {
								next();
							} else {
								var schemaConfig = {
									schemaUId: detailManagerItem.getDetailSchemaUId(),
									entitySchema: entitySchema
								};
								this.updateDetailSchema(schemaConfig, next, this);
							}
						} else {
							var createDetailSchemaConfig = {entitySchema: entitySchema};
							this.createDetailSchema(createDetailSchemaConfig, function(detailSchema) {
								detailManagerItem.setDetailSchemaUId(detailSchema.getPropertyValue("uId"));
								next();
							}, this);
						}
					},
					function(next) {
						detailManagerItem.getSysModuleEntityManagerItem(next, this);
					},
					function(next, sysModuleEntityManagerItem) {
						if (sysModuleEntityManagerItem) {
							next(sysModuleEntityManagerItem);
						} else {
							var registerSysModuleEntityConfig = {entitySchemaUId: entitySchemaUId};
							this.registerSysModuleEntity(registerSysModuleEntityConfig, next, this);
						}
					},
					function(next, sysModuleEntityManagerItem) {
						sysModuleEntityId = sysModuleEntityManagerItem.getId();
						sysModuleEntityManagerItem.getSysModuleEditManagerItems(next, this);
					},
					function(next, sysModuleEditManagerItems) {
						if (sysModuleEditManagerItems.getCount() > 0) {
							next();
						} else {
							var registerSysModuleEditConfig = {
								sysModuleEntityId: sysModuleEntityId,
								entitySchema: entitySchema
							};
							this.registerSysModuleEdit(registerSysModuleEditConfig, next, this);
						}
					},
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Update detail schema by config.
			 * @protected
			 * @param {Object} config Save detail method settings.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			updateDetailSchema: function(config, callback, scope) {
				var getPackageSchemaConfig = {
					packageUId: this.getPackageUId(),
					schemaUId: config.schemaUId
				};
				var caption = this.get("Caption");
				Terrasoft.ClientUnitSchemaManager.forceGetPackageSchema(getPackageSchemaConfig, function(schema) {
					schema.localizableStrings.removeByKey("Caption");
					schema.localizableStrings.add("Caption", this.getLocalizableString(caption));
					var schemaCaption = this.getDetailSchemaCaption(caption);
					schema.setLocalizableStringPropertyValue("caption", schemaCaption);
					var schemaBody = schema.getPropertyValue("body");
					if (!schemaBody) {
						var schemaName = schema.getPropertyValue("name");
						var entitySchema = config.entitySchema;
						var entitySchemaName = entitySchema.getPropertyValue("name");
						var schemaType = Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA;
						var bodyTemplate = Terrasoft.ClientUnitSchemaBodyTemplate[schemaType];
						var body = Ext.String.format(bodyTemplate, schemaName, entitySchemaName);
						schema.setPropertyValue("body", body);
					}
					var schemaUId = schema.getPropertyValue("uId");
					if (!Terrasoft.ClientUnitSchemaManager.findItem(schemaUId)) {
						Terrasoft.ClientUnitSchemaManager.addSchema(schema);
					}
					schema.define(function() {
						callback.call(scope);
					}, this);
				}, this);
			},

			/**
			 * Method create detail schema
			 * @protected
			 * @param {Object} config Create detail config.
			 * @param {Terrasoft.EntitySchema} config.entitySchema Entity schema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope  Callback function context.
			 * @return {Terrasoft.ClientUnitSchema} Detail schema.
			 */
			createDetailSchema: function(config, callback, scope) {
				var bodyTemplate =
					Terrasoft.ClientUnitSchemaBodyTemplate[Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA];
				var entitySchema = config.entitySchema;
				var entitySchemaName = entitySchema.getPropertyValue("name");
				var packageUId = this.getPackageUId();
				Terrasoft.ClientUnitSchemaManager.initialize(function() {
					var detailSchemaNameTemplate = "Schema{0}Detail";
					var detailSchemaName = this.getClientUnitSchemaName(detailSchemaNameTemplate);
					var detailCaption = this.get("Caption");
					var detailSchemaCaption = this.getDetailSchemaCaption(detailCaption);
					var schema = Terrasoft.ClientUnitSchemaManager.createSchema({
						uId: Terrasoft.generateGUID(),
						name: detailSchemaName,
						packageUId: packageUId,
						caption: {
							"ru-RU": detailSchemaCaption
						},
						extendParent: false,
						body: Ext.String.format(bodyTemplate, detailSchemaName, entitySchemaName),
						schemaType: Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,
						parentSchemaUId: Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_GRID_DETAIL
					});
					schema.localizableStrings.add("Caption", this.getLocalizableString(detailCaption));
					Terrasoft.ClientUnitSchemaManager.addSchema(schema);
					schema.define(function() {
						callback.call(scope, schema);
					}, this);
				}, this);
			},

			/**
			 * Returns caption for detail schema.
			 * @protected
			 * @param {String} detailCaption Detail caption.
			 * @return {String} Detail schema caption.
			 */
			getDetailSchemaCaption: function(detailCaption) {
				var detailSchemaCaptionTemplate =
					this.get("Resources.Strings.DetailSchemaCaptionTemplate");
				return Ext.String.format(detailSchemaCaptionTemplate, detailCaption);
			},

			/**
			 * Returns localizable string.
			 * @protected
			 * @param {String} value String.
			 * @return {Terrasoft.LocalizableString} Localizable string.
			 */
			getLocalizableString: function(value) {
				var localizableString = Ext.create("Terrasoft.LocalizableString");
				localizableString.setValue(value);
				return localizableString;
			},

			/**
			 * Returns ClientUnitSchema name by template.
			 * @protected
			 * @param {String} schemaNameTemplate Schema name template.
			 * @return {String} Schema name.
			 */
			getClientUnitSchemaName: function(schemaNameTemplate) {
				var schemaNamePrefix = Terrasoft.ClientUnitSchemaManager.schemaNamePrefix || "";
				var clientUnitSchemaManagerItems = Terrasoft.ClientUnitSchemaManager.getItems();
				var schemaName;
				for (var i = 1, iterations = clientUnitSchemaManagerItems.getCount(); i < iterations; i++) {
					schemaName = schemaNamePrefix + Ext.String.format(schemaNameTemplate, i);
					var foundItems = this.findClientUnitSchemaManagerItemsByName(schemaName);
					if (foundItems.isEmpty()) {
						break;
					}
				}
				return schemaName;
			},

			/**
			 * Returns list of elements from manager of client unit schema.
			 * @protected
			 * @param {String} name Schema item name.
			 * @return {Terrasoft.Collection} Found items.
			 */
			findClientUnitSchemaManagerItemsByName: function(name) {
				var clientUnitSchemaManagerItems = Terrasoft.ClientUnitSchemaManager.getItems();
				return clientUnitSchemaManagerItems.filterByFn(function(item) {
					return item.getName() === name;
				}, this);
			},

			/**
			 * Returns package identifier.
			 * @protected
			 * @return {String} Package identifier
			 */
			getPackageUId: function() {
				var packageUId = this.get("PackageUId");
				if (!packageUId) {
					packageUId = this.sandbox.publish("GetPackageUId", null, [this.sandbox.id]);
					this.set("PackageUId", packageUId);
				}
				return packageUId;
			},

			/**
			 * Registered EntitySchema of module.
			 * @protected
			 * @param {Object} config Config.
			 * @param {String} config.entitySchemaUId Entity schema identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @return {Terrasoft.SysModuleEntityManagerItem} EntitySchema module item.
			 */
			registerSysModuleEntity: function(config, callback, scope) {
				var entitySchemaUId = config.entitySchemaUId;
				Terrasoft.SysModuleEntityManager.createItem(null, function(item) {
					item.setEntitySchemaUId(entitySchemaUId);
					Terrasoft.SysModuleEntityManager.addItem(item);
					callback.call(scope, item);
				}, this);
			},

			/**
			 * Method for registration cluentUntiSchema for Entity as Page.
			 * @protected
			 * @param {Object} config Config.
			 * @param {String} config.sysModuleEntityId EntitySchema module identifier.
			 * @param {Terrasoft.EntitySchema} config.entitySchema EntitySchema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @return {Terrasoft.SysModuleEditManagerItem}
			 */
			registerSysModuleEdit: function(config, callback, scope) {
				var sysModuleEntityId = config.sysModuleEntityId;
				var entitySchema = config.entitySchema;
				Terrasoft.chain(
					function(next) {
						var createPageSchemaConfig = {
							entitySchema: entitySchema
						};
						this.createPageSchema(createPageSchemaConfig, next, this);
					},
					function(next, pageSchema) {
						Terrasoft.SysModuleEditManager.createItem(null, function(item) {
							item.setSysModuleEntityId(sysModuleEntityId);
							item.setCardSchemaUId(pageSchema.getPropertyValue("uId"));
							var entitySchemaCaption = this.getEntitySchemaCaption(entitySchema);
							this.setSysModuleEditManagerItemCaption(item, pageSchema, entitySchemaCaption);
							Terrasoft.SysModuleEditManager.addItem(item);
							callback.call(scope, item);
						}, this);
					},
					this
				);
			},

			/**
			 * Sets sysModuleEditManagerItem caption.
			 * @protected
			 * @param {Terrasoft.SysModuleEditManagerItem} item Manager item.
			 * @param {Terrasoft.ClientUnitSchemaManagerItem} pageSchema ClientUnitSchemaManagerItem.
			 * @param {String} entitySchemaCaption Entity schema caption.
			 */
			setSysModuleEditManagerItemCaption: function(item, pageSchema, entitySchemaCaption) {
				var dataManagerItem = item.getDataManagerItem();
				var column = dataManagerItem.getColumnByName("PageCaption");
				var size = column.size;
				var pageSchemaCaption = this.getPageSchemaCaption(pageSchema);
				if (pageSchemaCaption.length > size) {
					var extraSize = pageSchemaCaption.length - size;
					pageSchemaCaption = this.getShortCutPageCaption(entitySchemaCaption, extraSize);
					this.updateNewPageSchemaCaptionByUId(pageSchemaCaption, pageSchema.uId);
				}
				item.setPageCaption(pageSchemaCaption);
			},

			/**
			 * Update new page schema caption.
			 * @protected
			 * @param {String} newCaption New page schema caption.
			 * @param {String} pageSchemaUId New page schema uId.
			 */
			updateNewPageSchemaCaptionByUId: function(newCaption, pageSchemaUId) {
				var newPageSchema = Terrasoft.ClientUnitSchemaManager.getItem(pageSchemaUId);
				newPageSchema.setLocalizableStringPropertyValue("caption", newCaption);
				newPageSchema.caption = newCaption;
			},

			/**
			 * Returns page schema caption.
			 * @param {Terrasoft.ClientUnitSchemaManagerItem} pageSchema ClientUnitSchemaManagerItem.
			 * @return {String} ClientUnitSchemaManagerItem page caption.
			 */
			getPageSchemaCaption: function(pageSchema) {
				var pageCaptionLcz = pageSchema.getPropertyValue("caption");
				return pageCaptionLcz.getValue();
			},

			/**
			 * Returns shortcut caption.
			 * @protected
			 * @param {String} entitySchemaCaption Entity schema caption.
			 * @param {Number} extraSize Extra size.
			 * @return {String} Shortcut caption.
			 */
			getShortCutPageCaption: function(entitySchemaCaption, extraSize) {
				extraSize += 1;
				var slicedEntitySchemaCaption = entitySchemaCaption.slice(0, -extraSize);
				return Ext.String.format(this.get("Resources.Strings.DetailPageCaptionTemplate"),
					slicedEntitySchemaCaption + "\u2026");
			},

			/**
			 * Returns entity schema caption.
			 * @param {Object} entitySchema Entity schema.
			 * @return {String} Entity schema page caption
			 */
			getEntitySchemaCaption: function(entitySchema) {
				var entitySchemaCaptionLcz = entitySchema.getPropertyValue("caption");
				return entitySchemaCaptionLcz.getValue();
			},

			/**
			 * Create ClientUnitSchema of Page.
			 * @protected
			 * @param {Object} config Config.
			 * @param {Terrasoft.EntitySchema} config.entitySchema EntitySchema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @return {Terrasoft.ClientUnitSchema} ClientUnitSchema of Page.
			 */
			createPageSchema: function(config, callback, scope) {
				var bodyTemplate =
					Terrasoft.ClientUnitSchemaBodyTemplate[Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA];
				var entitySchema = config.entitySchema;
				var entitySchemaName = entitySchema.getPropertyValue("name");
				var packageUId = this.getPackageUId();
				Terrasoft.ClientUnitSchemaManager.initialize(function() {
					var pageSchemaNameTemplate = entitySchemaName + "{0}Page";
					var pageSchemaName = this.getClientUnitSchemaName(pageSchemaNameTemplate);
					var entitySchemaCaptionLcz = entitySchema.getPropertyValue("caption");
					var entitySchemaCaption = entitySchemaCaptionLcz.getValue();
					var detailPageCaptionTemplate =
						this.get("Resources.Strings.DetailPageCaptionTemplate");
					var detailPageCaption = Ext.String.format(detailPageCaptionTemplate, entitySchemaCaption);
					var schema = Terrasoft.ClientUnitSchemaManager.createSchema({
						uId: Terrasoft.generateGUID(),
						name: pageSchemaName,
						packageUId: packageUId,
						caption: {},
						body: Ext.String.format(bodyTemplate, pageSchemaName, entitySchemaName),
						schemaType: Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,
						parentSchemaUId: Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_PAGE
					});
					schema.setLocalizableStringPropertyValue("caption", detailPageCaption);
					Terrasoft.ClientUnitSchemaManager.addSchema(schema);
					schema.define(function() {
						callback.call(scope, schema);
					}, this);
				}, this);
			},

			/**
			 * @inheritDoc BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Caption", this.captionLengthValidator);
			},

			/**
			 * Method for validate detail caption length.
			 * @protected
			 * @param {String} value Caption value.
			 * @param {Object} column Column.
			 * @return {Object} Response of validate.
			 */
			captionLengthValidator: function(value, column) {
				var result = {
					invalidMessage: ""
				};
				if (Ext.isEmpty(value)) {
					return result;
				}
				var size = column.size;
				var valueSize = value.length;
				if (valueSize > size) {
					var message = Terrasoft.Resources.BaseViewModel.columnIncorrectTextRangeValidationMessage;
					message += " (" + valueSize + "/" + size + ")";
					result.invalidMessage = message;
				}
				return result;
			}

			// endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "DetailPropertiesControlGroup",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["detail-properties-control-group-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TopControlGroupText",
				"parentName": "DetailPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "TopControlGroupHeader"},
					"labelClass": ["top-control-group-label"]
				}
			},
			{
				"operation": "insert",
				"name": "Caption",
				"parentName": "DetailPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"bindTo": "Caption",
					"labelConfig": {
						"visible": true,
						"caption": {"bindTo": "Resources.Strings.CaptionLabel"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "EntitySchemaUId",
				"parentName": "DetailPropertiesControlGroup",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"enabled": {
						"bindTo": "IsEntitySchemaFieldEnabled",
						"bindConfig": {"converter": "getIsEntitySchemaFieldEnabled"}
					},
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.entitySchemaLabel"}
					},
					"controlConfig": {
						"prepareList": {"bindTo": "prepareEntitySchemaUIdList"}
					}
				}
			}
		]
	};
});


