Terrasoft.configuration.Structures["BaseSectionMainSettings"] = {innerHierarchyStack: ["BaseSectionMainSettings"]};
define('BaseSectionMainSettingsStructure', ['BaseSectionMainSettingsResources'], function(resources) {return {schemaUId:'14f4b7e5-7687-41e9-b43c-e323c8d6d945',schemaCaption: "Section - Main settings (without minipages and visas)", parentSchemaName: "", schemaName:'BaseSectionMainSettings',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseSectionMainSettings", [
	"BaseSectionMainSettingsResources",
	"ApplicationStructureWizardUtils",
	"SectionInWorkplaceManager",
	"DesignTimeEnums",
	"BaseWizardStepSchemaMixin"
], function() {
	return {
		messages: {
			/**
			 * Publishing message for package identifier request.
			 */
			"GetPackageUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Publishing message for updating wizard steps configuration.
			 */
			"UpdateWizardConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Publishing message for HistoryState request.
			 */
			"GetHistoryState": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Publishing message for update HistoryState.
			 */
			"ReplaceHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Subscribing on message for return multi page settings.
			 */
			"GetSysModuleSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 */
			"GetEntitySchemaInstance": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Publishing when update multi page settings.
			 */
			"ChangeModuleSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Publishing message for check multi page settings validate.
			 */
			"ValidateMultiPageSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Subscribing on message for change multi page settings.
			 */
			"PageSettingsChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Subscribing on message who call when SysModuleSettings is initialized.
			 */
			"SysModuleSettingsInitialized": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Subscribing on message who call when SectionPageSettings module is initialized.
			 */
			"SectionPageSettingsInitialized": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Publishing message to actualize SysModuleEntity settings.
			 */
			"ActualizeSysModuleEntitySettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 */
			"SaveSectionPageSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Subscribing on message who call when Visa module settings is initialized.
			 */
			"VisaModuleSettingsInitialized": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Publishing message for saving section visa settings.
			 */
			"SaveSectionVisaSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {
			BaseWizardStepSchemaMixin: "Terrasoft.BaseWizardStepSchemaMixin"
		},
		attributes: {

			/**
			 * Initialized.
			 */
			"Initialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				onChange: "onCaptionChange",
				dependencies: [
					{
						columns: ["PropertyInitialized", "MultiPageInitialized", "SectionPageSettingsInitialized",
							"VisaSettingsInitialized"],
						methodName: "onInitialized"
					}
				]
			},

			/**
			 * Indicates if VisaSettings initialized.
			 */
			"VisaSettingsInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * PropertyInitialized.
			 */
			"PropertyInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * MultiPageInitialized.
			 */
			"MultiPageInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: Terrasoft.Features.getIsEnabled("SectionPageWizard")
			},

			/**
			 * Indicates if SectionPageSettings initialized.
			 */
			"SectionPageSettingsInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: Terrasoft.Features.getIsDisabled("SectionPageWizard")
			},

			/**
			 * Caption.
			 */
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onCaptionChange",
				isRequired: true,
				value: null
			},

			/**
			 * Code.
			 */
			"Code": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onCodeChange",
				isRequired: true,
				value: null
			},

			/**
			 * System section.
			 */
			"IsSystem": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onIsSystemChange",
				value: null
			},

			/**
			 * Code prefix.
			 */
			"CodePrefix": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Default icon URL.
			 */
			"DefaultIconSrc": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Entity schema UId.
			 */
			"EntitySchemaUId": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Icon.
			 */
			"Icon": {
				dataValueType: Terrasoft.DataValueType.IMAGE,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Indicates if section is new.
			 */
			"IsNewSection": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * Package identifier.
			 */
			"PackageUId": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Section manager item.
			 */
			"SectionManagerItem": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Top control group header.
			 */
			"TopControlGroupHeader": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Selected workplace.
			 */
			"Workplace": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onWorkplaceChange",
				value: null
			},

			/**
			 * List of all workplaces.
			 */
			"WorkplacesList": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Section in workplace manager item.
			 */
			"SectionInWorkplaceManagerItem": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Code enabled.
			 */
			"IsCodeEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * Global search available.
			 * @protected
			 */
			"GlobalSearchAvailable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false,
				onChange: "onGlobalSearchAvailableChange"
			},

			/**
			 * Global search enabled tag.
			 * @protected
			 */
			"IsGlobalSearchEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Duplication rule exists tag.
			 * @protected
			 */
			"IsDuplicationRuleExists": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}, 

			/**
			 * Section types enum.
			 * @protected
			 */
			"SectionTypes" : {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
			}
		},
		modules: {
			"MultiPageModule": {
				config: {
					schemaName: Terrasoft.Features.getIsEnabled("SectionPageWizard")
						? "BaseSectionPageSettings"
						: "SysModuleEntitySettings",
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			},
			"VisaSettingsModule": {
				config: {
					schemaName: "SectionVisaSettings",
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_applyModuleEntitySchema: function(sysModuleEntityManagerItem) {
				var entitySchemaUId = sysModuleEntityManagerItem.getEntitySchemaUId();
				var entitySchemaManagerItem = Terrasoft.EntitySchemaManager.getItem(entitySchemaUId);
				this.set("ModuleEntitySchema", entitySchemaManagerItem.instance);
			},

			/**
			 * Method return instance of EntitySchemaManagerItem.
			 * @private
			 * @param {Function} next Callback method.
			 * @param {Terrasoft.manager.EntitySchemaManagerItem} entitySchemaManagerItem Manager item.
			 */
			_getEntitySchemaInstanceChain: function(next, entitySchemaManagerItem) {
				var config = {
					packageUId: this.get("packageUId"),
					schemaUId: entitySchemaManagerItem.getEntitySchemaUId()
				};
				Terrasoft.EntitySchemaManager.forceGetPackageSchema(config, function(entitySchema) {
					this.set("ModuleEntitySchema", entitySchema);
					next();
				}, this);
			},

			/**
			 * Show EntitySchema validation message for user and clear the code field.
			 * @param {String} message Text message.
			 * @private
			 */
			showEntitySchemaValidationMessage: function(message) {
				Terrasoft.showMessage({
					caption: message,
					buttons: ["ok"],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.BLUE,
					handler: this.entitySchemaValidationHandler,
					scope: this
				});
			},

			/**
			 * Empty code.
			 * @private
			 */
			entitySchemaValidationHandler: function() {
				this.set(this.codeColumnName, "");
			},

			/**
			 * Returns flag indicating that the properties are initialized.
			 * @private
			 * @return {Boolean}
			 */
			_getIsInitialized: function() {
				var columns = this.getSubModulesIsInitedColumns();
				if (Terrasoft.Features.getIsEnabled("SectionPageWizard")) {
					columns.push("SectionPageSettingsInitialized");
				} else {
					columns.push("MultiPageInitialized");
				}
				var notInitializedProperty = _.find(columns, function(column) {
					return !this.get(column);
				}, this);
				var initialized = Ext.isEmpty(notInitializedProperty);
				return initialized;
			},

			/**
			 * @private
			 */
			_findExistingEntitySchemaItem: function() {
				var entitySchemaUId = this.get(this.entitySchemaUIdColumnName);
				if (entitySchemaUId) {
					return Terrasoft.EntitySchemaManager.findItem(entitySchemaUId);
				}
				return null;
			},

			/**
			 * @private
			 */
			_setEntitySchemaCaption: function(value) {
				if (this.getIsSspSection()) {
					return;
				}
				const entitySchemaItem = this._findExistingEntitySchemaItem();
				if (entitySchemaItem) {
					entitySchemaItem.setLocalizableStringPropertyValue("caption", value);
				}
			},

			/**
			 * @private
			 */
			_subscribeSectionPageSettingsMessages: function() {
				const tag = this.getSectionPageSettingsModuleId();
				this.sandbox.subscribe("GetSysModuleSettings", this.onGetSysModuleSettings, this, [tag]);
				this.sandbox.subscribe("SectionPageSettingsInitialized", this.onSectionPageSettingsInitialized, this, [tag]);
				this.sandbox.subscribe("GetEntitySchemaInstance", this._onGetEntitySchemaInstance, this, [tag]);
				this.sandbox.subscribe("PageSettingsChanged", this.onPageSettingsChanged, this, [tag]);
			},

			/**
			 * @private
			 */
			_subscribeMultiPageSettingsMessages: function() {
				const tag = this.getMultiPageSettingsModuleId();
				this.sandbox.subscribe("GetSysModuleSettings", this.onGetSysModuleSettings, this, [tag]);
				this.sandbox.subscribe("SysModuleSettingsInitialized", this.onSysModuleSettingsInitialized, this, [tag]);
				this.sandbox.subscribe("GetEntitySchemaInstance", this._onGetEntitySchemaInstance, this, [tag]);
				this.sandbox.subscribe("PageSettingsChanged", this.onPageSettingsChanged, this, [tag]);
			},

			/**
			 * @private
			 */
			_subscribeVisaSettingsMessages: function() {
				const tag = this.getVisaSettingsModuleId();
				this.sandbox.subscribe("GetSysModuleSettings", this.onGetSysModuleSettings, this, [tag]);
				this.sandbox.subscribe("VisaModuleSettingsInitialized", this.onVisaModuleSettingsInitialized, this, [tag]);
				this.sandbox.subscribe("GetEntitySchemaInstance", this._onGetEntitySchemaInstance, this, [tag]);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Returns column names array. This columns used as child modules initiated flags.
			 * @protected
			 * @return {Array[]} Column names array.
			 */
			getSubModulesIsInitedColumns: function() {
				return ["PropertyInitialized", "VisaSettingsInitialized"];
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#initLookupQuickAddMixin
			 * @override
			 */
			initLookupQuickAddMixin: function(next, scope) {
				Ext.callback(next, scope);
			},

			/**
			 * Sets properties to viewModel.
			 * @protected
			 * @param {Object} config Section configuration.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			setProperties: function(config, callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.setSectionTypes(config);
						this.setColumnNames();
						this.setSectionManagerItem(config);
						this.setIsNewSection();
						this.setTopControlGroupHeader();
						this.setCaption();
						this.setGlobalSearchAvailable();
						this.setCode();
						this.setIsSystem();
						this.setDefaultIconSrc();
						this.setIcon();
						this.setValidationConfig();
						this.initWorkplacesList(next, this);
					},
					this.setGlobalSearchEnabled,
					function(next) {
						this.setCodePrefix(next, this);
					},
					function(next) {
						this.setWorkplace(next, this);
					},
					function(next) {
						Terrasoft.EntitySchemaManager.initialize(next, this);
					},
					function(next) {
						this.getSysModuleEntityManagerItem(null, next, this);
					},
					function(next, sysModuleEntityManagerItem) {
						this.setEntitySchemaUId(sysModuleEntityManagerItem);
						const entitySchemaUId = sysModuleEntityManagerItem.getEntitySchemaUId();
						this.set("IsCodeEnabled", Ext.isEmpty(entitySchemaUId));
						next(entitySchemaUId);
					},
					function(next, entitySchemaUId) {
						this.setDuplicationRuleExists(entitySchemaUId, function() {
							next(entitySchemaUId);
						}, this);
					},
					function(next, entitySchemaUId) {
						var entitySchemaManager = Terrasoft.EntitySchemaManager;
						if (this.get(this.isNewSectionColumnName) && !this.getIsSspSection()) {
							this.renderSchemaNamePrefix();
						}
						if (Terrasoft.isEmpty(entitySchemaUId)) {
							return Ext.callback(callback, scope);
						}
						entitySchemaManager.forceGetPackageSchema({
							packageUId: this.get("packageUId"),
							schemaUId: entitySchemaUId
						}, function(entitySchema) {
							this.set("ModuleEntitySchema", entitySchema);
							if (this.getIsSspSection() && this.$IsNewSection &&
									!entitySchemaManager.findItem(entitySchema.uId)) {
								entitySchemaManager.addSchema(entitySchema);
							}
							Ext.callback(callback, scope);
						}, this);
					},
					this
				);
			},

			/**
			 * Sets section types attribute.
			 * @protected
			 * @param {Object} config Section item config.
			 * @param {Object} config.sectionTypes Section types enum.
			 */
			setSectionTypes: function(config) {
				this.$SectionTypes = Terrasoft.deepClone(config.sectionTypes);
			},

			/**
			 * Sets IsDuplicationRuleExists value.
			 * @protected
			 * @param {Guid} entitySchemaUid Manager entity schema uid.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			setDuplicationRuleExists: function(entitySchemaUid, callback, scope) {
				if (!this.get("IsGlobalSearchEnabled")) {
					this.set("IsDuplicationRuleExists", false);
					Ext.callback(callback, scope);
					return;
				}
				this.callService({
					data: entitySchemaUid,
					serviceName: "DuplicatesRuleService",
					methodName: "CheckIsDuplicationRuleExist"
				}, function(response) {
					this.set("IsDuplicationRuleExists", response && response.isExists);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Sets IsGlobalSearchEnabled value.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			setGlobalSearchEnabled: function(callback, scope) {
				Terrasoft.SysSettings.querySysSettings(["GlobalSearchConfigServiceUrl", "GlobalSearchUrl"],
					function(sysSettings) {
						var isFeaturesEnabled = this.getIsFeatureEnabled("GlobalSearch") &&
							this.getIsFeatureEnabled("GlobalSearch_V2");
						this.set("IsGlobalSearchEnabled", isFeaturesEnabled &&
							!Ext.isEmpty(sysSettings.GlobalSearchConfigServiceUrl) &&
							!Ext.isEmpty(sysSettings.GlobalSearchUrl));
						Ext.callback(callback, scope);
					}, this);
			},

			/**
			 * Sets viewModel column names.
			 * @protected
			 */
			setColumnNames: function() {
				this.captionColumnName = "Caption";
				this.codeColumnName = "Code";
				this.codePrefixColumnName = "CodePrefix";
				this.defaultIconSrcColumnName = "DefaultIconSrc";
				this.entitySchemaUIdColumnName = "EntitySchemaUId";
				this.iconColumnName = "Icon";
				this.isNewSectionColumnName = "IsNewSection";
				this.packageUIdColumnName = "PackageUId";
				this.sectionManagerItemColumnName = "SectionManagerItem";
				this.topControlGroupHeaderColumnName = "TopControlGroupHeader";
				this.workplaceColumnName = "Workplace";
				this.workplacesListColumnName = "WorkplacesList";
			},

			/**
			 * Sets section manager item to viewModel.
			 * @protected
			 * @param {Object} config Section configuration.
			 */
			setSectionManagerItem: function(config) {
				var appStructureItem = config && config.applicationStructureItem;
				this.set("packageUId", config && config.packageUId);
				if (Ext.isEmpty(appStructureItem)) {
					throw new Terrasoft.ItemNotFoundException({
						message: this.get("Resources.Strings.SectionManagerItemNotFoundExceptionMessage")
					});
				}
				this.set(this.sectionManagerItemColumnName, appStructureItem);
			},

			/**
			 * Sets isSectionNew indicator to viewModel.
			 * @protected
			 */
			setIsNewSection: function() {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				this.set(this.isNewSectionColumnName, sectionManagerItem.getIsNew());
			},

			/**
			 * Sets top control group settings label to viewModel.
			 * @protected
			 */
			setTopControlGroupHeader: function() {
				let labelCaption;
				if (Terrasoft.Features.getIsEnabled("SectionPageWizard")) {
					labelCaption = this.get("Resources.Strings.SectionSettingsLabel");
				} else {
					labelCaption = this.get(this.isNewSectionColumnName)
						? this.get("Resources.Strings.TopControlGroupSettingsNewSectionLabel")
						: this.get("Resources.Strings.TopControlGroupSettingsExistingSectionLabel");
				}
				this.set(this.topControlGroupHeaderColumnName, labelCaption);
			},

			/**
			 * Sets caption value to viewModel.
			 * @protected
			 */
			setCaption: function() {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				var caption = (sectionManagerItem && sectionManagerItem.getCaption()) || "";
				this.set(this.captionColumnName, caption, {silent: true});
			},

			/**
			 * Sets global search available to view model.
			 * @protected
			 */
			setGlobalSearchAvailable: function() {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				var globalSearchAvailable = sectionManagerItem && sectionManagerItem.getGlobalSearchAvailable();
				this.set("GlobalSearchAvailable", Boolean(globalSearchAvailable));
			},

			/**
			 * Sets code value to viewModel.
			 * @protected
			 */
			setCode: function() {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				var code = (sectionManagerItem && sectionManagerItem.getCode()) || "";
				if (this.get("IsNewSection") && !this.getIsSspSection()) {
					code = code.replace(Terrasoft.EntitySchemaManager.getSchemaNamePrefix(), "");
				}
				this.set(this.codeColumnName, code, {silent: true});
			},

			/**
			 * Sets code value to viewModel.
			 * @protected
			 */
			setIsSystem: function() {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				var isSystem = (sectionManagerItem && sectionManagerItem.getIsSystem()) || false;
				this.set("IsSystem", isSystem, {silent: true});
			},

			/**
			 * Sets code prefix to viewModel.
			 * @param {Object} next Callback.
			 * @param {Object} scope Context.
			 * @protected
			 */
			setCodePrefix: function(next, scope) {
				Terrasoft.SysSettings.querySysSettings(["SchemaNamePrefix"], function(settings) {
					this.set(this.codePrefixColumnName, settings.SchemaNamePrefix || "");
					Ext.callback(next, scope);
				}, this);
			},

			/**
			 * Initializes workplaces list.
			 * @protected
			 * @param {Function} callback Callback function
			 * @param {Object} scope Callback function context.
			 */
			initWorkplacesList: function(callback, scope) {
				if (!this.get(this.isNewSectionColumnName)) {
					Ext.callback(callback, scope);
					return;
				}
				this.set(this.workplacesListColumnName, Ext.create("Terrasoft.Collection"));
				this.getWorkplacesListQuery(callback, scope);
			},

			/**
			 * Gets tip message for Code control.
			 * @protected
			 * @return {String} Tip message for Code control.
			 */
			getCodeTipMessage: function() {
				return Ext.String.format(this.get("Resources.Strings.NewSectionCodeMessage"),
					this.get(this.codePrefixColumnName));
			},

			/**
			 * Gets workplaces list from database.
			 * @param {Object} callback Function.
			 * @param {Object} scope Context.
			 * @protected
			 */
			getWorkplacesListQuery: function(callback, scope) {
				var select = new Terrasoft.EntitySchemaQuery("SysWorkplace");
				select.addColumn("Id");
				select.addColumn("Name");
				select.getEntityCollection(function(response) {
					if (response.success) {
						var items = response.collection.getItems();
						this.initWorkplacesConfig(items);
						Ext.callback(callback, scope);
					}
				}, this);
			},

			/**
			 * Initializes workplace configuration for workplace combo-box.
			 * @protected
			 * @param {Object} items Workplaces items.
			 */
			initWorkplacesConfig: function(items) {
				this.workplacesConfig = {};
				Terrasoft.each(items, function(item) {
					var workplaceId = item.get("Id");
					this.workplacesConfig[workplaceId] = {
						value: workplaceId,
						displayValue: item.get("Name")
					};
				}, this);
			},

			/**
			 * Returns new section default workplace.
			 * @protected
			 * @return {Object} Workplace lookup value.
			 */
			getDefaultWorkplace: function() {
				var currentState = this.sandbox.publish("GetHistoryState");
				var workplaceId = currentState.hash.recordId;
				if (this.getIsSspSection() && this.get("IsNewSection")) {
					return this.workplacesConfig[workplaceId];
				}
				return null;
			},

			/**
			 * Sets workplace.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope callback scope.
			 */
			setWorkplace: function(callback, scope) {
				var sectionManagerItem = this.get("SectionManagerItem");
				Terrasoft.chain(
					function(next) {
						sectionManagerItem.getSectionInWorkplaceManagerItems(next, this);
					},
					function(next, sectionInWorkplaceManagerItems) {
						if (sectionInWorkplaceManagerItems.isEmpty()) {
							var config = {
								propertyValues: {
									id: Terrasoft.generateGUID(),
									section: {value: sectionManagerItem.getId()}
								}
							};
							Terrasoft.SectionInWorkplaceManager.createItem(config, next, this);
						} else {
							next(sectionInWorkplaceManagerItems.getByIndex(0));
						}
					},
					function(next, sectionInWorkplaceManagerItem) {
						this.set("SectionInWorkplaceManagerItem", sectionInWorkplaceManagerItem);
						var workplaceId = sectionInWorkplaceManagerItem.getWorkplaceId();
						var workplace = Ext.isEmpty(workplaceId)
							? this.getDefaultWorkplace()
							: {
								value: workplaceId,
								displayValue: sectionInWorkplaceManagerItem.getWorkplaceName()
							};
						this.set("Workplace", workplace);
						callback.call(scope);
					}, this
				);
			},

			/**
			 * Sets default icon URl to viewModel.
			 * @protected
			 */
			setDefaultIconSrc: function() {
				var defaultIcon = this.get("Resources.Images.DefaultIcon");
				this.set(this.defaultIconSrcColumnName, this.getIconSrc(defaultIcon));
			},

			/**
			 * Sets icon to viewModel.
			 * @protected
			 * @param {String} imageId Image identifier.
			 */
			setIcon: function(imageId) {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				var id = imageId ? imageId : sectionManagerItem.getLeftPanelLogo();
				if (!id || !Terrasoft.isGUID(id) || Terrasoft.isEmptyGUID(id)) {
					id = Terrasoft.DesignTimeEnums.DefaultIcon.SECTION_DEFAULT_ICON_ID;
				}
				sectionManagerItem.setLeftPanelLogo(id);
				var icon = {
					source: Terrasoft.ImageSources.ENTITY_COLUMN,
					params: {
						schemaName: "SysImage",
						columnName: "Data",
						primaryColumnValue: id
					}
				};
				this.set(this.iconColumnName, icon);
			},

			/**
			 * Gets icon URL.
			 * @protected
			 * @param {Object} icon Icon config.
			 * @return {String} Icon URL.
			 */
			getIconSrc: function(icon) {
				icon = icon || this.get(this.iconColumnName);
				if (!Ext.isEmpty(icon)) {
					return Terrasoft.ImageUrlBuilder.getUrl(icon);
				}
			},

			/**
			 * Sets entity schema UId value to viewModel.
			 * @protected
			 * @param {Object} sysModuleEntityManagerItem SysModuleEntityManagerItem.
			 */
			setEntitySchemaUId: function(sysModuleEntityManagerItem) {
				var entitySchemaUId = sysModuleEntityManagerItem && sysModuleEntityManagerItem.getEntitySchemaUId();
				this.set(this.entitySchemaUIdColumnName, entitySchemaUId);
			},

			/**
			 * Subscribes sandbox to messages.
			 * @protected
			 */
			subscribeMessages: function() {
				if (Terrasoft.Features.getIsEnabled("SectionPageWizard")) {
					this._subscribeSectionPageSettingsMessages();
				} else {
					this._subscribeMultiPageSettingsMessages();
				}
				this._subscribeVisaSettingsMessages();
			},

			/**
			 * Handler for dependency change Initialize property.
			 * @protected
			 */
			onInitialized: function() {
				if (this._getIsInitialized()) {
					this.hideBodyMask();
				}
			},

			/**
			 * Handler for message VisaModuleSettingsInitialized.
			 * @protected
			 */
			onVisaModuleSettingsInitialized: function() {
				this.set("VisaSettingsInitialized", true);
			},

			/**
			 * Handler for message SysModuleSettingsInitialized.
			 * @protected
			 */
			onSysModuleSettingsInitialized: function() {
				this.set("MultiPageInitialized", true);
			},

			/**
			 * Handler for message SectionPageSettingsInitialized.
			 * @protected
			 */
			onSectionPageSettingsInitialized: function() {
				this.set("SectionPageSettingsInitialized", true);
			},

			/**
			 * @private
			 */
			_onGetEntitySchemaInstance: function() {
				return this.get("ModuleEntitySchema");
			},

			/**
			 * Handler for GetSysModuleSettings message.
			 * @param {String} senderId Sender message ID.
			 * @protected
			 */
			onGetSysModuleSettings: function(senderId) {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				if (sectionManagerItem) {
					sectionManagerItem.getSysModuleEntityManagerItem(function(sysModuleEntityManagerItem) {
						if (sysModuleEntityManagerItem) {
							this.sandbox.publish("ChangeModuleSettings", {
								"sysModuleEntityUId": sysModuleEntityManagerItem.id,
								"packageUId": this.get("packageUId"),
								"sectionManagerItemId": sectionManagerItem.getId(),
								"sectionTypes": Terrasoft.deepClone(this.$SectionTypes)
							}, [senderId]);
						}
					}, this);
				}
			},

			/**
			 * Handler for PageSettingsChanged message.
			 * @protected
			 */
			onPageSettingsChanged: function() {
				var sectionManagerItem = this.get("SectionManagerItem");
				this.sandbox.publish("UpdateWizardConfig", sectionManagerItem, [this.sandbox.id]);
				Terrasoft.chain(
					function(next) {
						sectionManagerItem.getSysModuleEntityManagerItem(next, this);
					},
					function(next, moduleEntity) {
						this.afterPageSettingsChanged(moduleEntity);
					}, this
				);
			},

			/**
			 * After page settings changed event handler.
			 * @protected
			 * @virtual
			 * @param {Object} moduleEntity Changed manager item.
			 */
			afterPageSettingsChanged: Terrasoft.emptyFn,

			/**
			 * Processes section parameters validation on save/left wizard action.
			 * @protected
			 */
			onValidate: function() {
				var isValid = this.validate();
				if (isValid) {
					var tag = Terrasoft.Features.getIsEnabled("SectionPageWizard")
						? this.getSectionPageSettingsModuleId()
						: this.getMultiPageSettingsModuleId();
					isValid = this.sandbox.publish("ValidateMultiPageSettings", null, [tag]);
				}
				Terrasoft.chain(
					function(next) {
						if (this.createNewSectionEntitiesInProgress) {
							this.createNewSectionEntities(next, this);
						} else {
							next();
						}
					},
					function() {
						this.mixins.BaseWizardStepSchemaMixin.publishValidationResult.call(this, isValid);
					}, this
				);
			},

			/**
			 * Processes section parameters saving on save/left wizard action.
			 * @protected
			 */
			onSave: function() {
				Terrasoft.chain(
					function(next) {
						if (Terrasoft.Features.getIsEnabled("SectionPageWizard")) {
							var tag = this.getSectionPageSettingsModuleId();
							this.sandbox.publish("SaveSectionPageSettings", next, [tag]);
						} else {
							next();
						}
					},
					function(next) {
						if (Terrasoft.Features.getIsDisabled("SectionPageWizard")) {
							var tag = this.getMultiPageSettingsModuleId();
							this.sandbox.publish("ActualizeSysModuleEntitySettings", next, [tag]);
						} else {
							next();
						}
					},
					function(next) {
						this.saveAditionalInfo(next, this);
					},
					function(next) {
						if (this.validate()) {
							this.showBodyMask();
							this.saveSection(next, this);
						}
					},
					function() {
						this.hideBodyMask();
						var saveResult = this.get(this.sectionManagerItemColumnName);
						this.mixins.BaseWizardStepSchemaMixin.publishSavingResult.call(this, saveResult);
					}, this
				);
			},

			/**
			 * Any aditional save steps.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			saveAditionalInfo: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.sandbox.publish("SaveSectionVisaSettings", next);
					},
					function() {
						Ext.callback(callback, scope);
					},
					this
				);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onGetModuleConfigResult
			 * @override
			 */
			onGetModuleConfigResult: function(config, next, scope) {
				this.setProperties(config, function() {
					this.set("PropertyInitialized", true);
					Ext.callback(next, scope);
				}, this);
			},

			/**
			 * Processes caption control value changing.
			 * @protected
			 * @param {Object} model Model.
			 * @param {String} value Changed value.
			 */
			onCaptionChange: function(model, value) {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				sectionManagerItem.setCaption(value);
				this._setEntitySchemaCaption(value);
				if (this.validate()) {
					if (!this._findExistingEntitySchemaItem()) {
						this.createNewSectionEntities();
					}
				}
			},

			/**
			 * Processes IsSystem control value changing.
			 * @protected
			 * @param {Object} model Model.
			 * @param {String} value Changed value.
			 */
			onIsSystemChange: function(model, value) {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				sectionManagerItem.setIsSystem(value);
			},

			/**
			 * Processes code control value changing.
			 * @protected
			 * @param {Object} model Model.
			 * @param {String} value Changed value.
			 */
			onCodeChange: function() {
				const isNewSection = this.get(this.isNewSectionColumnName);
				if (isNewSection && this.validate() && this.validateEntitySchemaExist()) {
					this.createNewSectionEntities();
				}
			},

			/**
			 * Validates entity schema exists by Code attributes.
			 * @protected
			 * @return {Boolean}
			 */
			validateEntitySchemaExist: function() {
				const code = this.get(this.codeColumnName);
				const validateResult = Terrasoft.ApplicationStructureWizardUtils.validateEntitySchemaExist(code);
				const result = validateResult.isValid;
				if (!result) {
					this.showEntitySchemaValidationMessage(validateResult.message);
				}
				return result;
			},

			/**
			 * Create new section entities.
			 * @protected
			 */
			createNewSectionEntities: function(callback) {
				this.createNewSectionEntitiesCallback = callback;
				if (this.createNewSectionEntitiesInProgress) {
					return;
				}
				this.createNewSectionEntitiesInProgress = true;
				this.createNewSectionEntitySchemas(function(sysModuleEntityManagerItem) {
					this.set("IsCodeEnabled", false);
					this.hideBodyMask();
					var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
					var message = {
						"sysModuleEntityUId": sysModuleEntityManagerItem.id,
						"packageUId": this.get("packageUId"),
						"sectionManagerItemId": sectionManagerItem.getId(),
						"sectionTypes": Terrasoft.deepClone(this.$SectionTypes)
					};
					this._applyModuleEntitySchema(sysModuleEntityManagerItem);
					this.publishChangeModuleSettingsMessage(message);
					this.createNewSectionEntitiesInProgress = false;
					Ext.callback(this.createNewSectionEntitiesCallback);
				}, this);
			},

			/**
			 * Sends ChangeModuleSettings message to child modules.
			 * @protected
			 * @param {Object} message Changed properties config.
			 */
			publishChangeModuleSettingsMessage: function(message) {
				this.sandbox.publish("ChangeModuleSettings", message, [this.getMultiPageSettingsModuleId()]);
				this.sandbox.publish("ChangeModuleSettings", message, [this.getVisaSettingsModuleId()]);
			},

			/**
			 * Returns VisaSettingsModule id.
			 * @protected
			 * @return {String}
			 */
			getVisaSettingsModuleId: function() {
				return Ext.String.format("{0}_module_VisaSettingsModule", this.sandbox.id);
			},

			/**
			 * Executes validation code.
			 * @protected
			 * @param {String} value Column value.
			 * @param {Object} column Column to validate.
			 * @return {Object} Validation message.
			 */
			validateCode: function(value, column) {
				let code, validators;
				if (this.get("IsNewSection")) {
					code = this.get(this.codePrefixColumnName) + value;
					validators = [this.validateCodeValue, this.validateStringValueLength];
				} else {
					code = value;
				}
				return this.executeValidation(validators, code, column);
			},

			/**
			 * Processes workplace changing.
			 * @protected
			 */
			onWorkplaceChange: function() {
				var sectionInWorkplaceManager = Terrasoft.SectionInWorkplaceManager;
				var sectionInWorkplaceManagerItem = this.get("SectionInWorkplaceManagerItem");
				var workplace = this.get("Workplace");
				var workplaceId = workplace && workplace.value;
				var currentItemId = sectionInWorkplaceManagerItem.getId();
				var currentItem = sectionInWorkplaceManager.findItem(currentItemId);
				if (Terrasoft.isGUID(workplaceId)) {
					if (Ext.isEmpty(currentItem)) {
						sectionInWorkplaceManager.addItem(sectionInWorkplaceManagerItem);
					}
					sectionInWorkplaceManagerItem.setWorkplace(workplace);
				} else {
					sectionInWorkplaceManager.discardItem(sectionInWorkplaceManagerItem);
				}
			},

			/**
			 * Processes icon control value changing.
			 * @protected
			 * @param {Object} icon Changed icon.
			 */
			onIconChange: function(icon) {
				if (Ext.isEmpty(icon)) {
					var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
					sectionManagerItem.setLeftPanelLogo(null);
					this.set(this.iconColumnName, null);
					return;
				}
				var config = {
					file: icon,
					onComplete: this.setIcon,
					onError: Ext.emptyFn,
					scope: this
				};
				Terrasoft.ImageApi.upload(config);
			},

			/**
			 * Processes GlobalSearchAvailable control value changing.
			 * @param {model} model Model.
			 * @param {value} value Changed value.
			 */
			onGlobalSearchAvailableChange: function(model, value) {
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				sectionManagerItem.setGlobalSearchAvailable(value);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator(this.captionColumnName, this.validateCaption);
				this.addColumnValidator(this.codeColumnName, this.validateCode);
			},

			/**
			 * Executes validation caption.
			 * @protected
			 * @param {String} value Caption value.
			 * @param {Object} column Column to validate.
			 * @return {Object} Validation message.
			 */
			validateCaption: function(value, column) {
				var validators = [this.validateStringValueLength];
				return this.executeValidation(validators, value, column);
			},

			/**
			 * Executes full validation for control.
			 * @protected
			 * @param {Function[]} validators Validators array.
			 * @param {Object} value Value to validate.
			 * @param {Object} column Column to validate.
			 * @return {Object} Validation message.
			 */
			executeValidation: function(validators, value, column) {
				var message;
				if (!Ext.isEmpty(validators)) {
					for (var i = 0; i < validators.length; i++) {
						message = validators[i].call(this, value, column);
						if (!message.isValid) {
							break;
						}
					}
				}
				return message || this.getValidationMessageTemplate("", true);
			},

			/**
			 * Validates string value length.
			 * @protected
			 * @param {String} value String value.
			 * @param {Object} column Model column.
			 * @return {Object} Validation error message object.
			 */
			validateStringValueLength: function(value, column) {
				var message = "";
				var isValid = true;
				if (!Ext.isEmpty(value)) {
					var valueSize = value.length;
					var columnSize = column.size;
					isValid = valueSize <= columnSize;
					message = isValid
						? ""
						: Terrasoft.Resources.BaseViewModel.columnIncorrectTextRangeValidationMessage;
					if (message) {
						message += " (" + valueSize + "/" + columnSize + ")";
					}
				}
				return this.getValidationMessageTemplate(message, isValid);
			},

			/**
			 * Validates code value.
			 * @protected
			 * @param {String} value Code value.
			 * @return {Object} Validation error message object.
			 */
			validateCodeValue: function(value) {
				var message = "";
				var isValid = true;
				if (!Ext.isEmpty(value)) {
					var regExp = new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9]{0," + value.length + "}$");
					isValid = regExp.test(value);
					message = isValid ? "" : this.get("Resources.Strings.WrongCodeMessage");
				}
				return this.getValidationMessageTemplate(message, isValid);
			},

			/**
			 * Gets validation message.
			 * @protected
			 * @param {String} message Validation message.
			 * @param {Boolean} isValid Is valid flag.
			 * @return {Object} Validation message.
			 */
			getValidationMessageTemplate: function(message, isValid) {
				return {
					invalidMessage: message || "",
					isValid: isValid || false
				};
			},

			/**
			 * Prepares workplaces drop-down list.
			 * @protected
			 * @param {String} filter Filter.
			 * @param {Terrasoft.core.collections.Collection} list List.
			 */
			prepareWorkplacesList: function(filter, list) {
				if (Ext.isEmpty(list)) {
					return;
				}
				list.clear();
				list.loadAll(this.workplacesConfig);
			},

			/**
			 * Saves section.
			 * @protected
			 * @param {Function} callback Callback.
			 * @param {Object} scope Scope.
			 */
			saveSection: function(callback, scope) {
				var entitySchemaUId = this.get(this.entitySchemaUIdColumnName);
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				const entitySchema = this.get("ModuleEntitySchema");
				Terrasoft.chain(
					function(next) {
						var config = {
							entitySchema: entitySchema,
							sectionManagerItem: sectionManagerItem,
							callback: next,
							scope: this
						};
						if (sectionManagerItem.getSchemaUId()) {
							this.saveExistingSection(config);
						} else {
							this.saveNewSection(config);
						}
					},
					function(next) {
						this.getSysModuleEntityManagerItem({entitySchemaUId: entitySchemaUId}, next, this);
					},
					function(next, sysModuleEntityManagerItem) {
						const config = {
							entitySchema: entitySchema,
							managerItem: sysModuleEntityManagerItem,
							callback: next,
							scope: this
						};
						this.getSysModuleEditManagerItems(config);
					},
					function() {
						callback.call(scope);
					}, this
				);
			},

			/**
			 * Saves existing section.
			 * @protected
			 * @param {Object} config Updating schema configuration.
			 */
			saveExistingSection: function(config) {
				var callback = config.callback;
				var scope = config.scope;
				if (this.get(this.isNewSectionColumnName)) {
					callback.call(scope);
				} else {
					var schemaConfig = {
						schemaUId: config.sectionManagerItem.getSchemaUId(),
						entitySchema: config.entitySchema
					};
					this.updateSectionSchema(schemaConfig, callback, scope);
				}
			},

			/**
			 * Saves new section.
			 * @protected
			 * @param {Object} config Creating schema configuration.
			 */
			saveNewSection: function(config) {
				var schemaConfig = {
					entitySchema: config.entitySchema
				};
				this.createSectionSchema(schemaConfig, function(sectionSchema) {
					var schemaUId = sectionSchema.getPropertyValue("uId");
					config.sectionManagerItem.setSchemaUId(schemaUId);
					config.callback.call(config.scope);
				}, this);
			},

			/**
			 * Creates (if does not exist) and returns sysModuleEntityManagerItem.
			 * @protected
			 * @param {Object} [config] Configuration object.
			 * @param {Object} config.entitySchemaUId entity schema UId.
			 * @param {Object} [config.typeColumnUId] type column UId.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getSysModuleEntityManagerItem: function(config, callback, scope) {
				config = config || {};
				var sectionManagerItem = this.get(this.sectionManagerItemColumnName);
				sectionManagerItem.getSysModuleEntityManagerItem(function(sysModuleEntityManagerItem) {
					if (Ext.isEmpty(sysModuleEntityManagerItem)) {
						var sysModuleEntityId = Terrasoft.generateGUID();
						config.id = sysModuleEntityId;
						this.createSysModuleEntityManagerItem(config, function(newSysModuleEntityManagerItem) {
							sectionManagerItem.setSysModuleEntityId(sysModuleEntityId);
							if (this.getIsSspSection()) {
								var entity = Terrasoft.EntitySchemaManager.findItemByName(sectionManagerItem.getCode());
								newSysModuleEntityManagerItem.setEntitySchemaUId(entity.uId);
							}
							callback.call(scope, newSysModuleEntityManagerItem);
						}, this);
					} else {
						callback.call(scope, sysModuleEntityManagerItem);
					}
				}, this);
			},

			/**
			 * Creates sysModuleEntityManagerItem.
			 * @protected
			 * @param {Object} config Configuration object.
			 * @param {Object} config.entitySchemaUId entity schema UId.
			 * @param {Object} config.typeColumnUId type column UId.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			createSysModuleEntityManagerItem: function(config, callback, scope) {
				Terrasoft.SysModuleEntityManager.createItem({propertyValues: config}, function(item) {
					Terrasoft.SysModuleEntityManager.addItem(item);
					callback.call(scope, item);
				}, this);
			},

			/**
			 * Gets sysModuleEditManagerItems and completes section saving.
			 * @protected
			 * @param {Object} config Configuration.
			 */
			getSysModuleEditManagerItems: function(config) {
				var managerItem = config.managerItem;
				managerItem.getSysModuleEditManagerItems(function(sysModuleEditManagerItems) {
					var callback = config.callback;
					var scope = config.scope;
					if (sysModuleEditManagerItems.getCount() > 0) {
						callback.call(scope);
					} else {
						var registerSysModuleEditConfig = {
							sysModuleEntityId: managerItem.getId(),
							entitySchema: config.entitySchema
						};
						this.registerSysModuleEdit(registerSysModuleEditConfig, callback, scope);
					}
				}, this);
			},

			/**
			 * Registers sysModuleEntityEdit configuration.
			 * @protected
			 * @param {Object} config SysModuleEntityEdit configuration.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Context.
			 */
			registerSysModuleEdit: function(config, callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.createPageSchema({entitySchema: config.entitySchema}, next, this);
					},
					function(next, pageSchema) {
						Terrasoft.SysModuleEditManager.createItem(null, function(item) {
							this.initSysModuleEditManagerItem(item, config.sysModuleEntityId, pageSchema);
							callback.call(scope, item);
						}, this);
					}, this
				);
			},

			/**
			 * Initializes sysModuleEditManageItem.
			 * @protected
			 * @param {Object} item SysModuleEditManagerItem.
			 * @param {String} sysModuleEntityId sysModuleEntity identifier.
			 * @param {Object} pageSchema Page schema.
			 */
			initSysModuleEditManagerItem: function(item, sysModuleEntityId, pageSchema) {
				if (Ext.isEmpty(item)) {
					return;
				}
				var pageCaptionLcz = pageSchema.getPropertyValue(this.captionColumnName.toLowerCase());
				item.setSysModuleEntityId(sysModuleEntityId);
				item.setCardSchemaUId(pageSchema.getPropertyValue("uId"));
				item.setPageCaption(pageCaptionLcz.getValue());
				Terrasoft.SysModuleEditManager.addItem(item);
			},

			/**
			 * Updates section schema.
			 * @protected
			 * @param {Object} config Configuration.
			 * @param {Function} callback Callback.
			 * @param {Scope} scope Context.
			 */
			updateSectionSchema: function(config, callback, scope) {
				var getPackageSchemaConfig = {
					packageUId: this.getPackageUId(),
					schemaUId: config.schemaUId
				};
				Terrasoft.ClientUnitSchemaManager.forceGetPackageSchema(getPackageSchemaConfig, function(schema) {
					var caption = this.get(this.captionColumnName);
					this.setSchemaLocalizableStringValue(schema, caption);
					this.setSchemaBody(schema, config.entitySchema);
					this.addSchemaToClientUnitSchemaManger(schema, schema.getPropertyValue("uId"));
					schema.define(function() {
						callback.call(scope);
					}, this);
				}, this);
			},

			/**
			 * Creates client unit schema name for new section.
			 * @param {String} entitySchemaName Section entity schema name.
			 * @return {String} New section client unit schema name.
			 */
			getNewSectionSchemaName: function(entitySchemaName) {
				var sectionSchemaNameTemplate = entitySchemaName + "{0}Section";
				var prefix = this.get(this.codePrefixColumnName);
				if (!this.isEmpty(prefix) && !sectionSchemaNameTemplate.startsWith(prefix)) {
					sectionSchemaNameTemplate = prefix + sectionSchemaNameTemplate;
				}
				return this.getClientUnitSchemaName(sectionSchemaNameTemplate);
			},

			/**
			 * Creates client unit section schema.
			 * @protected
			 * @param {Object} schemaConfig Schema configuration.
			 * @param {Function} callback Callback.
			 * @param {Scope} scope Context.
			 */
			createSectionSchema: function(schemaConfig, callback, scope) {
				Terrasoft.ClientUnitSchemaManager.initialize(function() {
					var config = this.getClientUnitSchemaSectionConfig(schemaConfig);
					var primaryCaptionColumnName = this.captionColumnName;
					var sectionCaption = this.get(primaryCaptionColumnName);
					config.schemaName = this.getNewSectionSchemaName(config.entitySchemaName);
					config.schemaCaption = this.getSectionSchemaCaption(sectionCaption);
					var sectionSchema = this.createClientUnitSchema(config, true);
					sectionSchema.localizableStrings.add(primaryCaptionColumnName,
						this.setLocalizableString(sectionCaption));
					Terrasoft.ClientUnitSchemaManager.addSchema(sectionSchema);
					sectionSchema.define(function() {
						callback.call(scope, sectionSchema);
					}, this);
				}, this);
			},

			/**
			 * Creates client unit edit page schema.
			 * @protected
			 * @param {Object} schemaConfig Schema configuration.
			 * @param {Function} callback Callback.
			 * @param {Scope} scope Context.
			 */
			createPageSchema: function(schemaConfig, callback, scope) {
				Terrasoft.ClientUnitSchemaManager.initialize(function() {
					var config = this.getClientUnitSchemaPageConfig(schemaConfig);
					var pageSchemaNameTemplate = config.entitySchemaName + "{0}Page";
					config.schemaName = this.getClientUnitSchemaName(pageSchemaNameTemplate);
					config.schemaCaption = this.getEditPageSchemaCaption(config.entitySchema);
					var editPageSchema = this.createClientUnitSchema(config, false);
					Terrasoft.ClientUnitSchemaManager.addSchema(editPageSchema);
					editPageSchema.define(function() {
						callback.call(scope, editPageSchema);
					}, this);
				}, this);
			},

			/**
			 * Gets base configuration for creating client unit schema.
			 * @protected
			 * @param {Object} schemaConfig Schema configuration.
			 * @return {Object} Base configuration.
			 */
			getClientUnitSchemaBaseConfig: function(schemaConfig) {
				var entitySchema = schemaConfig.entitySchema;
				var schemaType = schemaConfig.schemaType;
				return {
					schemaType: schemaType,
					bodyTemplate: Terrasoft.ClientUnitSchemaBodyTemplate[schemaType],
					entitySchema: entitySchema,
					entitySchemaName: entitySchema.getPropertyValue("name"),
					packageUId: this.getPackageUId(),
					parentSchemaUId: schemaConfig.parentSchemaUId
				};
			},

			/**
			 * Returns client unit schema section configuration.
			 * @param {Object} schemaConfig Configuration object.
			 * @param {Object} schemaConfig.entitySchema Entity schema.
			 * @return {Object} Client unit schema section configuration.
			 */
			getClientUnitSchemaSectionConfig: function(schemaConfig) {
				var baseUIds = Terrasoft.DesignTimeEnums.BaseSchemaUId;
				var parentSchemaUId = this.getIsSspSection()
					? baseUIds.BASE_DATA_VIEW
					: baseUIds.BASE_SECTION;
				Ext.apply(schemaConfig, {
					schemaType: Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,
					parentSchemaUId: parentSchemaUId
				});
				return this.getClientUnitSchemaBaseConfig(schemaConfig);
			},

			/**
			 * Returns client unit schema page configuration.
			 * @param {Object} schemaConfig Configuration object.
			 * @param {Object} schemaConfig.entitySchema Entity schema.
			 * @return {Object} Client unit schema section configuration.
			 */
			getClientUnitSchemaPageConfig: function(schemaConfig) {
				var baseUIds = Terrasoft.DesignTimeEnums.BaseSchemaUId;
				var parentSchemaUId = this.getIsSspSection()
					? baseUIds.BASE_SECTION_PAGE
					: baseUIds.BASE_MODULE_PAGE;
				Ext.apply(schemaConfig, {
					schemaType: Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,
					parentSchemaUId: parentSchemaUId
				});
				return this.getClientUnitSchemaBaseConfig(schemaConfig);
			},

			/**
			 * Creates client unit schema.
			 * @protected
			 * @param {Object} config Client unit schema configuration.
			 * @param {Boolean} isExtendedParent IsExtendedParent indicator.
			 * @return {Object} Client unit schema.
			 */
			createClientUnitSchema: function(config, isExtendedParent) {
				var schemaName = config.schemaName;
				var clientUnitSchema = Terrasoft.ClientUnitSchemaManager.createSchema({
					uId: Terrasoft.generateGUID(),
					name: schemaName,
					packageUId: config.packageUId,
					caption: new Terrasoft.LocalizableString(config.schemaCaption),
					body: Ext.String.format(config.bodyTemplate, schemaName, config.entitySchemaName),
					schemaType: config.schemaType,
					parentSchemaUId: config.parentSchemaUId
				});
				if (!isExtendedParent) {
					clientUnitSchema.extendParent = false;
				}
				return clientUnitSchema;
			},

			/**
			 * Gets package UId.
			 * @protected
			 * @return {String} Package UId.
			 */
			getPackageUId: function() {
				var packageUId = this.get(this.packageUIdColumnName);
				if (!packageUId) {
					var sandbox = this.sandbox;
					packageUId = sandbox.publish("GetPackageUId", null, [sandbox.id]);
					this.set(this.packageUIdColumnName, packageUId);
				}
				return packageUId;
			},

			/**
			 * Sets schema localizable string value.
			 * @protected
			 * @param {Object} schema Schema.
			 * @param {String} value Value.
			 */
			setSchemaLocalizableStringValue: function(schema, value) {
				var primaryCaptionColumnName = this.captionColumnName;
				var caption = this.getSectionSchemaCaption(value);
				schema.localizableStrings.removeByKey(primaryCaptionColumnName);
				schema.localizableStrings.add(primaryCaptionColumnName, this.setLocalizableString(value));
				schema.setLocalizableStringPropertyValue(primaryCaptionColumnName.toLowerCase(), caption);
			},

			/**
			 * Sets localizable string value.
			 * @protected
			 * @param {String} value Value.
			 * @return {Object} Localizable string.
			 */
			setLocalizableString: function(value) {
				return new Terrasoft.LocalizableString(value);
			},

			/**
			 * Gets section schema caption.
			 * @protected
			 * @param {String} sectionCaption Caption.
			 * @return {String} Section caption in format "Section schema: "{0}"".
			 */
			getSectionSchemaCaption: function(sectionCaption) {
				var sectionSchemaCaptionTemplate = this.get("Resources.Strings.SectionSchemaCaptionTemplate");
				return Ext.String.format(sectionSchemaCaptionTemplate, sectionCaption);
			},

			/**
			 * Gets edit page schema caption.
			 * @protected
			 * @param {Object} entitySchema EntitySchema object.
			 * @return {String} Edit page caption in format "Card schema: "{0}"".
			 */
			getEditPageSchemaCaption: function(entitySchema) {
				var primaryCaptionColumnName = this.captionColumnName.toLowerCase();
				var entitySchemaCaptionLcz = entitySchema.getPropertyValue(primaryCaptionColumnName);
				var entitySchemaCaption = entitySchemaCaptionLcz.getValue();
				var editPageCaptionTemplate = this.get("Resources.Strings.EditPageCaptionTemplate");
				return Ext.String.format(editPageCaptionTemplate, entitySchemaCaption);
			},

			/**
			 * Sets schema body.
			 * @protected
			 * @param {Object} schema Schema.
			 * @param {Object} entitySchema entitySchema.
			 */
			setSchemaBody: function(schema, entitySchema) {
				var schemaBody = schema.getPropertyValue("body");
				if (!schemaBody) {
					var schemaName = schema.getPropertyValue("name");
					var entitySchemaName = entitySchema.getPropertyValue("name");
					var schemaType = Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA;
					var bodyTemplate = Terrasoft.ClientUnitSchemaBodyTemplate[schemaType];
					var body = Ext.String.format(bodyTemplate, schemaName, entitySchemaName);
					schema.setPropertyValue("body", body);
				}
			},

			/**
			 * Adds schema to client unit schema manager.
			 * @protected
			 * @param {Object} schema Schema.
			 * @param {String} schemaUId schemaUId.
			 */
			addSchemaToClientUnitSchemaManger: function(schema, schemaUId) {
				var manager = Terrasoft.ClientUnitSchemaManager;
				if (!manager.findItem(schemaUId)) {
					manager.addSchema(schema);
				}
			},

			/**
			 * Gets client unit schema name.
			 * @protected
			 * @param {String} schemaNameTemplate Schema name template.
			 * @return {String} Schema name.
			 */
			getClientUnitSchemaName: function(schemaNameTemplate) {
				var clientUnitSchemaManagerItems = Terrasoft.ClientUnitSchemaManager.getItems();
				var schemaName;
				for (var i = 1, iterations = clientUnitSchemaManagerItems.getCount(); i < iterations; i++) {
					schemaName = Ext.String.format(schemaNameTemplate, i);
					var foundItems = this.findClientUnitSchemaManagerItemsByName(schemaName);
					if (foundItems.isEmpty()) {
						break;
					}
				}
				return schemaName;
			},

			/**
			 * Finds client unit schema manager item by name.
			 * @protected
			 * @param {String} schemaName Schema name.
			 * @return {Object} ClientUnitSchemaManagerItems.
			 */
			findClientUnitSchemaManagerItemsByName: function(schemaName) {
				return Terrasoft.ClientUnitSchemaManager.getItems().filterByPath("name", schemaName);
			},

			/**
			 * Returns MultiPageSettingsModule id.
			 * @protected
			 * @return {String}
			 */
			getMultiPageSettingsModuleId: function() {
				return Ext.String.format("{0}_module_MultiPageModule", this.sandbox.id);
			},

			/**
			 * Returns SectionPageSettings module id.
			 * @protected
			 * @return {String}
			 */
			getSectionPageSettingsModuleId: function() {
				return Ext.String.format("{0}_module_MultiPageModule", this.sandbox.id);
			},

			/**
			 * Checks is current section type SSP.
			 * @protected
			 * @return {Boolean} True if current section type SSP, false otherwise.
			 */
			getIsSspSection: function() {
				if (Terrasoft.Features.getIsDisabled("SspSectionWizard")) {
					return false;
				}
				var sectionManagerItem = this.get("SectionManagerItem");
				var types = this.$SectionTypes || {};
				return sectionManagerItem.type === types.SSP;
			},

			/**
			 * Checks is current section type General.
			 * @protected
			 * @return {Boolean} True if current section type General, false otherwise.
			 */
			getIsGeneralSection: function() {
				return !this.getIsSspSection();
			},

			/**
			 * Creates new section entity schemas.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			createNewSectionEntitySchemas: function(callback, scope) {
				var sectionManagerItem = this.get("SectionManagerItem");
				Terrasoft.chain(
					function(next) {
						sectionManagerItem.getSysModuleEntityManagerItem(next, this);
					},
					function(next, sysModuleEntityManagerItem) {
						var entitySchemaUId = sysModuleEntityManagerItem.getEntitySchemaUId();
						if (Terrasoft.EntitySchemaManager.contains(entitySchemaUId)) {
							return Ext.callback(callback, scope, [sysModuleEntityManagerItem]);
						} else {
							return this.createNewSectionEntitiesSchemasInChain(callback, scope);
						}
					}, this
				);
			},

			/**
			 * Create new section entities schemas in chain.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			createNewSectionEntitiesSchemasInChain: function(callback, scope) {
				this.showBodyMask();
				let sectionManagerItem, config;
				Terrasoft.chain(
					function(next) {
						const code = this.get(this.codeColumnName);
						const codeWithPrefix = this.get(this.codePrefixColumnName) + code;
						sectionManagerItem = this.get(this.sectionManagerItemColumnName);
						sectionManagerItem.setCode(codeWithPrefix);
						config = {
							name: code,
							caption: this.get("Caption"),
							packageUId: this.get("packageUId")
						};
						Terrasoft.ApplicationStructureWizardUtils.createNewSectionEntitySchemas(config, next, this);
					},
					function(next) {
						sectionManagerItem = this.get(this.sectionManagerItemColumnName);
						sectionManagerItem.getSysModuleEntityManagerItem(next, this);
					},
					function(next, sysModuleEntityManagerItem) {
						sysModuleEntityManagerItem.setEntitySchemaUId(config.sectionEntityUId);
						this.setEntitySchemaUId(sysModuleEntityManagerItem);
						this.sandbox.publish("UpdateWizardConfig", sectionManagerItem, [this.sandbox.id]);
						Ext.callback(callback, scope, [sysModuleEntityManagerItem]);
					}, this
				);
			},

			/**
			 * Returns code enabled.
			 * @return {Boolean} Code enabled.
			 */
			getIsCodeEnabled: function() {
				return this.get("IsNewSection") && this.get("IsCodeEnabled");
			},

			/**
			 * Returns global search available enable tag.
			 * @returns {Boolean} GlobalSearchAvailable enable tag.
			 */
			getIsGlobalSearchAvailableEnabled: function() {
				var isNewSection = this.get("IsNewSection");
				if (isNewSection) {
					return true;
				}
				var isGlobalSearchEnabled = this.get("IsGlobalSearchEnabled");
				var isDuplicationRuleExists = this.get("IsDuplicationRuleExists");
				return Boolean(isGlobalSearchEnabled && !isDuplicationRuleExists);
			},

			/**
			 * Renders schema name prefix.
			 */
			renderSchemaNamePrefix: function() {
				var prefix = this.get(this.codePrefixColumnName);
				if (prefix) {
					var schemaNamePrefixClass = "schema-name-prefix";
					var schemaNamePrefixClassTpl = ".schema-name-prefix>div {white-space: nowrap;}";
					var schemaNamePrefixBeforeClassTpl = ".schema-name-prefix>div:before {content: \"{0}\"; " +
						"display: inline-block; font-size: 1.4em; " +
						"font-family: \"Bpmonline Open Sans\",serif;color: #676666;}";
					Ext.util.CSS.createStyleSheet(schemaNamePrefixClassTpl, schemaNamePrefixClass);
					Ext.util.CSS.createStyleSheet(
						Ext.String.format(schemaNamePrefixBeforeClassTpl, prefix), schemaNamePrefixClass
					);
				}
			},

			/**
			 * Initializes schema attributes.
			 * @protected
			 */
			initAttributes: function() {
				this.columns.Code.size = Terrasoft.EntitySchemaManager.getMaxEntitySchemaNameLength() -
					Terrasoft.DesignTimeEnums.SysModuleColumnSizes.MAX_ENTITY_SCHEMA_NAME_SUFFIX;
				this.columns.Caption.size = Terrasoft.DesignTimeEnums.SysModuleColumnSizes.MAX_CAPTION_SIZE;
			},

			/**
			 * Checks is workplace combobox visible.
			 * @protected
			 * @return {Boolean} Workplace combobox visibility.
			 */
			getIsWorkplaceVisible: function() {
				var isSsp = this.getIsSspSection();
				var workplaceSet = !Ext.isEmpty(this.get("Workplace"));
				var isNew = this.get("IsNewSection");
				if (!isSsp) {
					return isNew;
				}
				return isNew && workplaceSet;
			},

			//endregion

			//region Methods: Public

			/**
			 * Initializes section wizard main settings step.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Context.
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initAttributes();
					this.subscribeMessages();
					this.mixins.BaseWizardStepSchemaMixin.init.call(this, function() {
						Ext.callback(callback, scope);
					});
				}, this]);
			}

			//endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "MainSettingsWrapper",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["main-settings-wrapper"]},
					"items": [
						{
							"name": "TopControlGroup",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["top-control-group-container"]},
							"items": [
								{
									"name": "TopControlGroupTextContainer",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"classes": {"wrapClassName": ["section-settings-label-container"]},
									"visible": Terrasoft.Features.getIsEnabled("SectionPageWizard"),
									"items": [
										{
											"name": "TopControlGroupLabel",
											"itemType": Terrasoft.ViewItemType.LABEL,
											"caption": {"bindTo": "TopControlGroupHeader"},
											"labelClass": ["top-control-group-label section-settings-label"]
										}
									]
								},
								{
									"name": "TopControlGroupText",
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": {"bindTo": "TopControlGroupHeader"},
									"labelClass": ["top-control-group-label"],
									"visible": Terrasoft.Features.getIsDisabled("SectionPageWizard")
								},
								{
									"name": "TopControlGroupRightContainer",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"classes": {"wrapClassName": ["top-control-group-right-container"]},
									"items": [
										{
											"name": "Icon",
											"dataValueType": Terrasoft.DataValueType.IMAGE,
											"defaultImageSrc": {"bindTo": "DefaultIconSrc"},
											"generator": "ImageSectionWizardCustomGenerator.generateCustomImageControlWithLabel",
											"imageSrc": {"bindTo": "getIconSrc"},
											"labelConfig": {"visible": false},
											"onPhotoChange": "onIconChange",
											"hint": {"bindTo": "Resources.Strings.IconLabel"}
										},
										{
											"name": "TopControlGroupSettingsContainer1",
											"itemType": Terrasoft.ViewItemType.CONTAINER,
											"classes": {"wrapClassName": ["top-control-group-settings-container"]},
											"items": [
												{
													"name": "Caption",
													"bindTo": "Caption",
													"labelConfig": {"caption": {"bindTo": "Resources.Strings.CaptionLabel"}}
												},
												{
													"name": "Code",
													"controlConfig": {"value": {"bindTo": "Code"}},
													"controlWrapConfig": {"classes": {"wrapClassName": "schema-name-prefix"}},
													"enabled": {"bindTo": "getIsCodeEnabled"},
													"labelConfig": {
														"caption": {"bindTo": "Resources.Strings.CodeLabel"},
														"labelClass": ["t-label t-label-is-required"]
													},
													"tip": {
														"content": {"bindTo": "getCodeTipMessage"},
														"enabled": {"bindTo": "IsNewSection"}
													}
												},
												{
													"name": "Workplace",
													"dataValueType": Terrasoft.DataValueType.ENUM,
													"controlConfig": {
														"list": {"bindTo": "WorkplacesList"},
														"prepareList": {"bindTo": "prepareWorkplacesList"},
														"value": {"bindTo": "Workplace"}
													},
													"labelConfig": {"caption": {"bindTo": "Resources.Strings.WorkplaceLabel"}},
													"visible": {"bindTo": "getIsWorkplaceVisible"},
													"enabled": {"bindTo": "getIsGeneralSection"}
												}
											]
										},
										{
											"name": "TopControlGroupSettingsContainer2",
											"itemType": Terrasoft.ViewItemType.CONTAINER,
											"classes": {"wrapClassName": ["top-control-group-settings-container"]},
											"items": [
												{
													"name": "GlobalSearchAvailable",
													"bindTo": "GlobalSearchAvailable",
													"enabled": {"bindTo": "getIsGlobalSearchAvailableEnabled"},
													"visible": {"bindTo": "IsGlobalSearchEnabled"},
													"labelConfig": {
														"caption": {"bindTo": "Resources.Strings.GlobalSearchAvailableLabel"}
													}
												},
												{
													"name": "IsSystem",
													"dataValueType": Terrasoft.DataValueType.BOOLEAN,
													"visible": Terrasoft.isDebug,
													"caption": {"bindTo": "Resources.Strings.IsSystem"}
												}
											]
										}
									]
								}
							]
						},
						{
							"name": "MultiPageSettingsModuleContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["multi-page-settings-module-container"]},
							"items": [
								{
									"name": "MultiPageModule",
									"itemType": Terrasoft.ViewItemType.MODULE
								}
							]
						}
					]
				}
			},
			{
				"operation": "insert",
				"parentName": "MainSettingsWrapper",
				"propertyName": "items",
				"name": "SectionVisaSettingsModuleContainer",
				"index": 3,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["visa-settings-module-container"]},
					"items": [
						{
							"name": "VisaSettingsModule",
							"itemType": Terrasoft.ViewItemType.MODULE
						}
					]
				}
			}
		]
	};
});


