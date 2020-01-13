Terrasoft.configuration.Structures["SectionWizardCasesSettings"] = {innerHierarchyStack: ["SectionWizardCasesSettings"]};
define('SectionWizardCasesSettingsStructure', ['SectionWizardCasesSettingsResources'], function(resources) {return {schemaUId:'a647886f-219b-441c-b379-78b60405c601',schemaCaption: "Page to edit cases settings in section wizard.", parentSchemaName: "", schemaName:'SectionWizardCasesSettings',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionWizardCasesSettings", ["ConfigurationConstants", "SectionWizardCasesSettingsResources",
		"css!SectionWizardCasesSettingsStyles", "EntityConnectionManager", "BaseWizardStepSchemaMixin"],
	function(ConfigurationConstants) {
		return {
			messages: {

				/**
				 * @message GetModuleConfigResult
				 * Subscribing on message for section dcm settings initialization.
				 */
				"SectionDcmSettingsInitialized": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetModuleConfigResult
				 * Subscribing on message for section dcm library initialization
				 */
				"SectionDcmLibraryInitialized": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ValidateSectionDcmSettings
				 * Publishing message for validation section dcm settings.
				 */
				"ValidateSectionDcmSettings": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SaveSectionDcmSettings
				 * Publishing message for saving section dcm settings.
				 */
				"SaveSectionDcmSettings": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message OnSectionDcmSettingsSaved
				 * Subscribing on message for saving section dcm settings.
				 */
				"OnSectionDcmSettingsSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SaveWizard
				 * Publishing message for save wizard.
				 */
				"SaveWizard": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message AddCase
				 * Subscribing on message for add case.
				 */
				"AddCase": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message EditCase
				 * Subscribing on message for edit case.
				 */
				"EditCase": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ReloadCaseSettings
				 * Publishing message for reload case settings.
				 */
				"ReloadCaseSettings": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ReloadDcmLibGridData
				 * Publishing message for reload dcm lib grid data.
				 */
				"ReloadDcmLibGridData": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message CurrentStepClick
				 * Subscribing on message for wizard current step click.
				 */
				"CurrentStepClick": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message HeaderCaptionClick
				 * Subscribing on message for wizard header caption click.
				 */
				"HeaderCaptionClick": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message HideBodyMask
				 * Subscribing on message for hide loading body mask.
				 */
				"HideBodyMask": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}

			},
			mixins: {
				baseWizardStepSchemaMixin: "Terrasoft.BaseWizardStepSchemaMixin"
			},
			attributes: {

				/**
				 * Initialized.
				 */
				"Initialized": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false,
					onChange: "onInitializedChange",
					dependencies: [
						{
							columns: ["SectionDcmSettingsInitialized", "SectionDcmLibraryInitialized"],
							methodName: "onInitialized"
						}
					]
				},

				"SectionDcmSettingsInitialized": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				"SectionDcmLibraryInitialized": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * SysModuleEntityId.
				 */
				"SysModuleEntityId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * SSP section SysModuleEntity unique identifier.
				 * @type {String}
				 */
				"SspSysModuleEntityId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * PackageUId.
				 */
				"PackageUId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			modules: /**SCHEMA_MODULES*/{
				"SectionDcmSettingsModule": {
					"config": {
						"schemaName": "SectionDcmSettings",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false
					}
				},

				"VwDcmLibSectionModule": {
					"config": {
						"schemaName": "VwDcmLibSection",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false
					},
					"moduleName": "SectionModuleV2"
				}
			}/**SCHEMA_MODULES*/,
			methods: {

				//region Methods: Private

				/**
				 * Check whether channel message is from DcmSchemaDesigner.
				 * @param {Object} message Message object.
				 * @return {Boolean}
				 */
				getIsReloadSectionWizardCaseSettingsEvent: function(message) {
					return message && message.event === "ReloadSectionWizardCaseSettings";
				},

				/**
				 * Handles the message server communications channel.
				 * @private
				 * @param {Terrasoft.ServerChannel} channel Channel messaging server BPMonline.
				 * @param {Object} broadcastMessage Broadcast message.
				 */
				onBroadcastServerMessage: function(channel, broadcastMessage) {
					if (this.getIsReloadSectionWizardCaseSettingsEvent(broadcastMessage)) {
						var settingsItem = this.getSysDcmSettingsManagerItem();
						if (settingsItem.id === broadcastMessage.dcmSettingsId) {
							this.reloadCaseSettings();
						}
					}
				},

				/**
				 * Reloads case settings and dcm grid section.
				 * @private
				 */
				reloadCaseSettings: function() {
					this.sandbox.publish("ReloadCaseSettings");
					this.sandbox.publish("ReloadDcmLibGridData");
				},

				/**
				 * Handler for dependency change Initialize property.
				 * @private
				 */
				onInitialized: function() {
					var sectionDcmSettingsInitialized = this.get("SectionDcmSettingsInitialized");
					var sectionDcmLibraryInitialized = this.get("SectionDcmLibraryInitialized");
					this.set("Initialized", sectionDcmSettingsInitialized && sectionDcmLibraryInitialized);
				},

				/**
				 * Handler for changing attribute Initialized.
				 * @private
				 */
				onInitializedChange: function() {
					this.onHideBodyMask();
				},

				/**
				 * Handler for message HideBodyMask. Hide mask only if module initialized.
				 * @private
				 */
				onHideBodyMask: function(config) {
					var initialized = this.get("Initialized");
					if (initialized === true) {
						this.hideBodyMask(config);
					}
				},

				/**
				 * Subscribes sandbox to messages.
				 * @private
				 */
				subscribeWizardStepMessages: function() {
					var sandbox = this.sandbox;
					sandbox.subscribe("OnSectionDcmSettingsSaved", this.onSectionDcmSettingsSaved, this,
						[this.getSectionDcmSettingsModuleId()]);
					sandbox.subscribe("SectionDcmSettingsInitialized", this.onSectionDcmSettingsInitialized, this,
						[this.getSectionDcmSettingsModuleId()]);
					sandbox.subscribe("SectionDcmLibraryInitialized", this.onSectionDcmLibraryInitialized, this,
						[this.getSectionDcmLibraryModuleId()]);
					sandbox.subscribe("AddCase", this.onAddCase, this, [this.getSectionDcmLibraryModuleId()]);
					sandbox.subscribe("EditCase", this.onEditCase, this, [this.getSectionDcmLibraryModuleId()]);
					sandbox.subscribe("CurrentStepClick", this.reloadCaseSettings, this);
					sandbox.subscribe("HeaderCaptionClick", this.reloadCaseSettings, this);
					sandbox.subscribe("HideBodyMask", this.onHideBodyMask, this);
					this.mixins.baseWizardStepSchemaMixin.subscribeWizardStepMessages.call(this);
				},

				/**
				 * SectionDcmSettingsInitialized message handler. Sets SectionDcmSettingsInitialized attribute value
				 * to true.
				 * @private
				 */
				onSectionDcmSettingsInitialized: function() {
					this.set("SectionDcmSettingsInitialized", true);
				},

				/**
				 * SectionDcmLibraryInitialized message handler. Sets SectionDcmLibraryInitialized attribute value
				 * to true
				 * @private
				 */
				onSectionDcmLibraryInitialized: function() {
					this.set("SectionDcmLibraryInitialized", true);
				},

				/**
				 * Internal validate.
				 * @private
				 * @param {Object} [config] Config object.
				 */
				internalValidate: function(config) {
					var result = this.validate();
					if (result) {
						var moduleId = this.getSectionDcmSettingsModuleId();
						result = this.sandbox.publish("ValidateSectionDcmSettings", config, [moduleId]);
					}
					return result;
				},

				/**
				 * Processes section dcm validation on save/left wizard action.
				 * @private
				 */
				onValidate: function() {
					var isValid = this.internalValidate({revertChanges: true});
					this.publishValidationResult(isValid);
				},

				/**
				 * Saves section dcm settings.
				 * @private
				 */
				saveSectionDcmSettings: function() {
					this.sandbox.publish("SaveSectionDcmSettings", null, [this.getSectionDcmSettingsModuleId()]);
				},

				/**
				 * Saves dcm schema in settings information.
				 * @private
				 * @param {String} dcmSchemaUId Dcm schema identifier.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The scope of callback function.
				 */
				saveDcmSchemaInSettings: function(dcmSchemaUId, callback, scope) {
					var manager = Terrasoft.SysDcmSchemaInSettingsManager;
					Terrasoft.chain(
						function(next) {
							var item = manager.findItemBySysDcmSchemaUId(dcmSchemaUId);
							if (!item) {
								var settingsItem = this.getSysDcmSettingsManagerItem();
								manager.createSysDcmSchemaInSettingsItem(dcmSchemaUId, settingsItem.id, next, this);
							} else {
								next();
							}
						},
						function() {
							var packageUId = this.get("PackageUId");
							manager.saveAndUpdateSchemaData(packageUId, callback, scope);
						}, this
					);
				},

				/**
				 * Processes section dcm saving on save/left wizard action.
				 * @private
				 */
				onSave: function() {
					this.saveSectionDcmSettings();
					this.publishSavingResult();
				},

				/**
				 * Handler of section dcm settings saved message publishing.
				 * @private
				 * @param {Object} result Section dcm settings saving result.
				 * @param {Boolean} result.success Indicates whether the settings saved success.
				 */
				onSectionDcmSettingsSaved: function(result) {
					if (result.success) {
						var sandbox = this.sandbox;
						this.hideBodyMask();
						sandbox.publish("SavingResult", null, [sandbox.id]);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onGetModuleConfigResult
				 * @override
				 */
				onGetModuleConfigResult: function(config, next, scope) {
					this.$SysModuleEntityId = config.applicationStructureItem.getSysModuleEntityId();
					const sspSectionItem = config.sspSectionItem;
					if (Terrasoft.Features.getIsEnabled("SspSectionWizard") && sspSectionItem) {
						this.$SspSysModuleEntityId = sspSectionItem.getSysModuleEntityId();
					}
					this.$PackageUId = config.packageUId;
					Ext.callback(next, scope);
				},

				/**
				 * Returns SectionDcmSettingsModule id.
				 * @private
				 * @return {String}
				 */
				getSectionDcmSettingsModuleId: function() {
					return Ext.String.format("{0}_module_SectionDcmSettingsModule", this.sandbox.id);
				},

				/**
				 * Returns SectionDcmLibraryModule id.
				 * @private
				 * @return {String}
				 */
				getSectionDcmLibraryModuleId: function() {
					return Ext.String.format("{0}_module_SectionModuleV2", this.sandbox.id);
				},

				/**
				 * Creates activity connection column with section entity schema.
				 * @private
				 * @param {Terrasoft.manager.EntitySchema} entitySchema Section entity schema instance.
				 */
				createActivityConnectionColumn: function(entitySchema) {
					var columnName = Terrasoft.EntitySchemaManager.getSchemaNamePrefix() + entitySchema.getName();
					var columnConfig = {
						uId: Terrasoft.generateGUID(),
						name: columnName,
						caption: entitySchema.caption.clone(),
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						referenceSchemaUId: this.getEntitySchemaUId(),
						status: Terrasoft.ModificationStatus.NEW
					};
					var column = Ext.create("Terrasoft.manager.EntitySchemaColumn", columnConfig);
					return column;
				},

				/**
				 * Adds connection column for activity entity schema.
				 * @private
				 * @param {Terrasoft.manager.EntitySchema} activitySchema Activity schema instance.
				 * @param {Terrasoft.manager.EntitySchema} entitySchema Section entity schema instance.
				 */
				addActivityConnectionColumn: function(activitySchema, entitySchema) {
					var column = this.createActivityConnectionColumn(entitySchema);
					activitySchema.addColumn(column);
					if (!Terrasoft.EntitySchemaManager.contains(activitySchema.uId)) {
						Terrasoft.EntitySchemaManager.addSchema(activitySchema);
					}
					return column;
				},

				/**
				 * Looking for activity connection column to current section entity.
				 * @private
				 * @param {Terrasoft.EntitySchema} activitySchema Activity schema.
				 * @param {Terrasoft.EntitySchema} sectionEntitySchema Section entity schema.
				 * @return {Terrasoft.manager.EntitySchemaColumn}
				 */
				findActivityConnectionColumn: function(activitySchema, sectionEntitySchema) {
					const activityColumns = activitySchema.columns;
					const referencedColumns = activityColumns.filter(function(column) {
						return column.referenceSchemaUId === sectionEntitySchema.uId &&
							column.name !== "CreatedBy" && column.name !== "ModifiedBy";
					});
					let connectionColumn = referencedColumns.findByPath("name", sectionEntitySchema.name);
					if (connectionColumn) {
						return connectionColumn;
					}
					connectionColumn = referencedColumns.findByFn(function(column) {
						return Terrasoft.includes(column.name, sectionEntitySchema.name);
					});
					return connectionColumn || referencedColumns.first();
				},

				/**
				 * Returns current SysDcmSettingsManagerItem by SysModuleEntityId.
				 * @private
				 * @return {Terrasoft.manager.SysDcmSettingsManagerItem|null}
				 */
				getSysDcmSettingsManagerItem: function() {
					var moduleEntityId = this.get("SysModuleEntityId");
					var sysDcmSettingsItem = Terrasoft.SysDcmSettingsManager.findBySysModuleEntityId(moduleEntityId);
					return sysDcmSettingsItem;
				},

				/**
				 * Returns if entity schema is new for current SysDcmSettingsManagerItem.
				 * @private
				 * @return {Boolean}
				 */
				getIsEntitySchemaNew: function() {
					var sysDcmSettingsItem = this.getSysDcmSettingsManagerItem();
					var entitySchemaUId = sysDcmSettingsItem.getEntitySchemaUId();
					var entitySchemaItem = Terrasoft.EntitySchemaManager.getItem(entitySchemaUId);
					return entitySchemaItem.status === Terrasoft.ModificationStatus.NEW;
				},

				/**
				 * Returns if entity stage column is new for current SysDcmSettingsManagerItem.
				 * @private
				 * @param {Terrasoft.EntitySchema} entitySchema Entity schema.
				 * @return {Boolean}
				 */
				getIsEntityColumnNew: function(entitySchema) {
					var sysDcmSettingsItem = this.getSysDcmSettingsManagerItem();
					var stageColumnUId = sysDcmSettingsItem.getStageColumnUId();
					var column = entitySchema.columns.get(stageColumnUId);
					return column.status === Terrasoft.ModificationStatus.NEW;
				},

				/**
				 * Saves changed items for SysDcmSettingsManager.
				 * @private
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The scope of callback function.
				 */
				saveSysDcmSettingsManager: function(callback, scope) {
					Terrasoft.SysDcmSettingsManager.saveAndUpdateSchemaData(this.get("PackageUId"), callback, scope);
				},

				/**
				 * Adds activity link to entity connection.
				 * @private
				 * @param {Terrasoft.manager.EntitySchemaColumn} column New activity schema column.
				 * @return {Object} activityConnection Activity link entity connection.
				 */
				findActivityConnection: function(column) {
					var activitySchemaUId = ConfigurationConstants.Activity.ActivitySchemaUId;
					var items = Terrasoft.EntityConnectionManager.getItems();
					var filteredData = items.filterByFn(function(item) {
						var isActivitySchema = item.getSysEntitySchemaUId() === activitySchemaUId;
						var isConnectionColumn = item.getColumnUId() === column.uId;
						return isActivitySchema && isConnectionColumn;
					}, this);
					return filteredData.first();
				},

				/**
				 * Adds activity link to entity connection.
				 * @private
				 * @param {Terrasoft.manager.EntitySchemaColumn} column New activity schema column.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The scope of callback function.
				 */
				addActivityConnection: function(column, callback, scope) {
					var config = {
						propertyValues: {
							sysEntitySchemaUId: ConfigurationConstants.Activity.ActivitySchemaUId,
							columnUId: column.uId
						}
					};
					Terrasoft.EntityConnectionManager.createItem(config, function(item) {
						Terrasoft.EntityConnectionManager.addItem(item);
						Terrasoft.ProcessUserTaskSchemaManager.reset(callback, scope);
					}, this);
				},

				/**
				 * Return activity entity schema instance.
				 * @private
				 * @param {Function} callback The callback function.
				 * @param {Terrasoft.EntitySchema} callback.instance Activity entity schema instance.
				 * @param {Object} scope The scope of callback function.
				 */
				getActivitySchemaInstance: function(callback, scope) {
					var config = {
						packageUId: this.get("PackageUId"),
						schemaUId: ConfigurationConstants.Activity.ActivitySchemaUId
					};
					Terrasoft.EntitySchemaManager.forceGetPackageSchema(config, callback, scope);
				},

				/**
				 * Return current section wizard entity schema instance.
				 * @private
				 * @param {Function} callback The callback function.
				 * @param {Terrasoft.EntitySchema} callback.instance Entity schema instance.
				 * @param {Object} scope The scope of callback function.
				 */
				getEntitySchemaInstance: function(callback, scope) {
					const schemaUId = this.getEntitySchemaUId();
					const packageUId = this.get("PackageUId");
					const config = {
						packageUId: packageUId,
						schemaUId: schemaUId
					};
					Terrasoft.chain(
						function(next) {
							Terrasoft.EntitySchemaManager.getPackageSchemaManagerItem(config, next, this);
						},
						function(next, item) {
							if (item && item.isModified()) {
								return item.getInstance(callback, scope);
							}
							next();
						},
						function() {
							Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, callback, scope);
						},
						this
					);
				},

				/**
				 * Adds new case by open case schema designer with specified config.
				 * @private
				 * @param {Boolean} needToSave Flag that indicates is wizard need to save or not.
				 */
				addCase: function(needToSave) {
					var dcmSettingsItem = this.getSysDcmSettingsManagerItem();
					var addCaseConfig = {
						dcmSettingsId: dcmSettingsItem.id,
						packageUId: this.get("PackageUId")
					};
					if (needToSave) {
						var saveWizardConfig = {
							silentMode: true,
							addCaseConfig: addCaseConfig
						};
						this.sandbox.publish("SaveWizard", saveWizardConfig, [this.sandbox.id]);
					} else {
						this.saveSysDcmSettingsManager(function() {
							Terrasoft.ProcessModuleUtilities.showCaseSchemaDesigner(addCaseConfig);
						}, this);
					}
				},

				/**
				 * Prepares activity entity schema to work with cases in current section.
				 * @private
				 * @param {Function} callback The callback function.
				 * @param {Boolean} callback.needToSave Flag that indicates whether wizard need to save or not.
				 * @param {Object} scope The scope of callback function.
				 */
				prepareActivity: function(callback, scope) {
					var needToSave = false;
					var activitySchema, activityLinkColumn, entitySchema;
					Terrasoft.chain(
						function(next) {
							Terrasoft.EntityConnectionManager.initialize(null, next, this);
						},
						function(next) {
							this.getActivitySchemaInstance(next, this);
						},
						function(next, instance) {
							activitySchema = instance;
							this.getEntitySchemaInstance(next, this);
						},
						function(next, instance) {
							entitySchema = instance;
							activityLinkColumn = this.findActivityConnectionColumn(activitySchema, entitySchema);
							if (Ext.isEmpty(activityLinkColumn)) {
								activityLinkColumn = this.addActivityConnectionColumn(activitySchema, entitySchema);
								needToSave = true;
							}
							var activityConnection = this.findActivityConnection(activityLinkColumn);
							if (Ext.isEmpty(activityConnection)) {
								this.addActivityConnection(activityLinkColumn, next, this);
								needToSave = true;
							} else {
								next();
							}
						},
						function() {
							this.saveSectionDcmSettings();
							if (this.getIsEntitySchemaNew() || this.getIsEntityColumnNew(entitySchema)) {
								needToSave = true;
							}
							callback.call(scope, needToSave);
						}, this
					);
				},

				/**
				 * Returns entity schema unique identifier by current SysModuleEntityId.
				 * @private
				 * @return {String}
				 */
				getEntitySchemaUId: function() {
					var sysModuleEntityId = this.get("SysModuleEntityId");
					var sysModuleEntity = Terrasoft.SysModuleEntityManager.getItem(sysModuleEntityId);
					return sysModuleEntity.getEntitySchemaUId();
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#getModuleInstanceConfig
				 * @protected
				 * @overridden
				 */
				getModuleInstanceConfig: function(moduleConfig) {
					var instanceConfig = this.callParent(arguments);
					var schemaName = moduleConfig.config.schemaName;
					var parameters = instanceConfig.parameters = instanceConfig.parameters || {};
					var viewModelConfig = parameters.viewModelConfig = parameters.viewModelConfig || {};
					var sysModuleEntityId = this.$SysModuleEntityId;
					if (schemaName === "SectionDcmSettings") {
						viewModelConfig.SysModuleEntityId = sysModuleEntityId;
						if (Terrasoft.Features.getIsEnabled("SspSectionWizard")) {
							viewModelConfig.SspSysModuleEntityId = this.$SspSysModuleEntityId;
						}
					}
					if (schemaName === "VwDcmLibSection") {
						viewModelConfig.SysModuleEntityId = sysModuleEntityId;
						viewModelConfig.EntitySchemaUId = this.getEntitySchemaUId();
						viewModelConfig.IsShowLookupColumnLinks = false;
					}
					viewModelConfig.PackageUId = this.$PackageUId;
					return instanceConfig;
				},

				//endregion

				//region Methods: Public

				/**
				 * Initializes section wizard cases settings step.
				 * @param {Function} callback Callback.
				 * @param {Object} scope Context.
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.mixins.baseWizardStepSchemaMixin.init.call(this, function() {
							this.subscribeWizardStepMessages();
							Terrasoft.ServerChannel.on(Terrasoft.ServerChannelSender.BROADCAST_MESSAGE,
								this.onBroadcastServerMessage, this);
							callback.call(scope);
						}, this);
					}, this]);
				},

				/**
				 * Handler for message AddCase.
				 */
				onAddCase: function() {
					var isValid = this.internalValidate();
					if (!isValid) {
						return;
					}
					this.showBodyMask();
					this.prepareActivity(function(needToSave) {
						this.hideBodyMask();
						this.addCase(needToSave);
					}, this);
				},

				/**
				 * Handler for message EditCase.
				 * @param {Object} config Configuration object.
				 */
				onEditCase: function(config) {
					var isValid = this.internalValidate();
					if (!isValid) {
						return;
					}
					this.saveSectionDcmSettings();
					this.saveDcmSchemaInSettings(config.schemaUId, function() {
						this.saveSysDcmSettingsManager(function() {
							Terrasoft.ProcessModuleUtilities.showCaseSchemaDesigner(config);
						}, this);
					}, this);
				}

				//endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "CasesSettings",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": [
								"cases-settings",
								"show-markup"
							]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SectionDcmSettingsModuleContainer",
					"parentName": "CasesSettings",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["section-dcm-settings"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SectionDcmSettingsModuleContainer",
					"propertyName": "items",
					"name": "SectionDcmSettingsModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				},
				{
					"operation": "insert",
					"name": "SectionDcmLibrary",
					"parentName": "CasesSettings",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["section-dcm-library"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SectionDcmLibrary",
					"propertyName": "items",
					"name": "VwDcmLibSectionModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				}
			]
		};
	}
);


