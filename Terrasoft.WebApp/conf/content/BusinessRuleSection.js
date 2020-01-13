Terrasoft.configuration.Structures["BusinessRuleSection"] = {innerHierarchyStack: ["BusinessRuleSection"], structureParent: "ViewModelCollectionGridSchemaV2"};
define('BusinessRuleSectionStructure', ['BusinessRuleSectionResources'], function(resources) {return {schemaUId:'7c6ea2d4-c6a9-492d-ab9d-1fea8bf38606',schemaCaption: "Business rule Section", parentSchemaName: "ViewModelCollectionGridSchemaV2", schemaName:'BusinessRuleSection',parentSchemaUId:'c24bc36b-4d75-4039-b090-7f3f5f656fc6',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BusinessRuleSection", ["AcademyUtilities", "css!BusinessRuleSectionCSS", "BaseWizardStepSchemaMixin",
	"css!SectionModuleV2", "EmptyGridMessageConfigBuilder", "BusinessRuleSchemaManager"
], function(AcademyUtilities) {
	return {

		messages: {
			/**
			 * Subscribing on message for section parameters request.
			 */
			"GetModuleConfigResultDesigner": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Subscribing on message for section parameters request.
			 */
			"GetModuleConfigDesigner": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Publishing message for unload designer module.
			 */
			"CloseBusinessRuleDesigner": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		mixins: {
			BaseWizardStepSchemaMixin: "Terrasoft.BaseWizardStepSchemaMixin"
		},
		attributes: {
			/**
			 * Business rule designer visible.
			 */
			"BusinessRuleDesignerVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Is new business rule flag.
			 */
			"isNewBusinessRule": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Flag indicating that the module entity contains many edit pages.
			 */
			"IsMultiPage": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Academy url.
			 */
			"AcademyUrl": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			/**
			 * Academy help id.
			 */
			"HelpId": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 1680
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Subscribes sandbox to messages.
			 * @private
			 */
			subscribeMessages: function() {
				var schemaDesignerId = this.getSchemaDesignerSandboxId();
				this.sandbox.subscribe("GetModuleConfigDesigner", this.onGetModuleConfigDesigner, this, [schemaDesignerId]);
				this.sandbox.subscribe("CloseBusinessRuleDesigner", this.onCloseBusinessRuleSchemaDesigner,
					this, [schemaDesignerId]);
			},

			/**
			 * Returns business rule schema designer id.
			 * @private
			 * @return {String} Business rule schema designer id.
			 */
			getSchemaDesignerSandboxId: function() {
				return this.sandbox.id + "_BusinessRuleSchemaDesigner";
			},

			/**
			 * Loads business rule designer.
			 * @private
			 */
			loadDesigner: function() {
				this.sandbox.loadModule("BaseSchemaModuleV2", {
					"id": this.getSchemaDesignerSandboxId(),
					"renderTo": "BusinessRuleWrapDesignerContainer",
					"keepAlive": true,
					"instanceConfig": {
						"useHistoryState": false,
						"isSchemaConfigInitialized": true,
						"schemaName": "BusinessRuleSchemaDesigner"
					}
				});
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onValidate
			 * @override
			 */
			onValidate: function() {
				this.publishValidationResult(this.validate());
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.set("BusinessRuleDesignerVisible", false);
					this.subscribeMessages();
					Terrasoft.chain(
						this.mixins.BaseWizardStepSchemaMixin.init,
						this.initBusinessRuleSchemaManager,
						function(next) {
							this.setIsMultiPage();
							this.createBusinessRuleGridProfile();
							this.loadGridData();
							this.initHelpUrl(next, this);
						},
						function() {
							this.hideBodyMask();
							callback.call(scope);
						},
						this
					);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				var gridData = this.get("GridData");
				this.set("IsGridEmpty", gridData.isEmpty());
				this.reloadGridColumnsConfig(true);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onGetModuleConfigResult
			 * @override
			 */
			onGetModuleConfigResult: function(config, callback, scope) {
				this.set("PackageUId", config.packageUId);
				var structureItem = config.applicationStructureItem;
				var clientUnitSchemaUId = config.clientUnitSchemaUId;
				Terrasoft.chain(
					function(next) {
						if (structureItem && structureItem.getSysModuleEntityManagerItem) {
							structureItem.getSysModuleEntityManagerItem(next, this);
						} else {
							next();
						}
					},
					function(next, sysModuleEntity) {
						if (!sysModuleEntity && !clientUnitSchemaUId) {
							throw new Terrasoft.UnsupportedTypeException();
						}
						if (sysModuleEntity) {
							this.set("SysModuleEntityId", sysModuleEntity.getId());
						}
						if (clientUnitSchemaUId) {
							this.set("ClientUnitSchemaUId", clientUnitSchemaUId);
						}
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseViewModel#validate
			 * @override
			 */
			validate: function() {
				var result = this.callParent(arguments);
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.configuration.ViewModelCollectionGridSchemaV2#onAddButtonClick
			 * @override
			 */
			onAddButtonClick: function() {
				this.set("isNewBusinessRule", true);
				this.set("BusinessRuleDesignerVisible", true);
				this.loadDesigner();
			},

			/**
			 * @inheritdoc Terrasoft.configuration.ViewModelCollectionGridSchemaV2#editRecord
			 * @override
			 */
			editRecord: function() {
				this.set("BusinessRuleDesignerVisible", true);
				this.loadDesigner();
			},

			/**
			 * @inheritdoc Terrasoft.configuration.ViewModelCollectionGridSchemaV2#disableRecord
			 * @override
			 */
			disableRecord: function() {
				var rule = this.getManagerItemByActiveRow();
				rule.getInstance(function(instance) {
					var enabled = instance.getPropertyValue("enabled");
					instance.setPropertyValue("enabled", !enabled);
					this.updateActiveRowEnabledState(!enabled);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.ViewModelCollectionGridSchemaV2#removeRecord
			 * @override
			 */
			removeRecord: function() {
				this.confirmRemoveBusinessRule();
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onSave
			 * @override
			 */
			onSave: function() {
				this.showBodyMask();
				Terrasoft.BusinessRuleSchemaManager.saveToClientUnitSchemaManager(function(response) {
					this.hideBodyMask();
					if (response && response.success) {
						this.publishSavingResult();
					} else {
						const message = response.errorInfo.toString();
						Terrasoft.showErrorMessage(message, null, this);
					}
				}, this);
			},

			/**
			 * Sets IsMultiPage value.
			 * @protected
			 */
			setIsMultiPage: function() {
				const entitySchemaId = this.get("SysModuleEntityId");
				const clientUnitSchemaUId = this.get("ClientUnitSchemaUId");
				if (entitySchemaId && !clientUnitSchemaUId) {
					const moduleEntityManagerItem = Terrasoft.SysModuleEntityManager.getItem(entitySchemaId);
					const typeColumnUId = moduleEntityManagerItem.getTypeColumnUId();
					if (typeColumnUId && Terrasoft.isGUID(typeColumnUId)) {
						this.set("IsMultiPage", true);
					}
				}
			},

			/**
			 * Loads grid data.
			 * @protected
			 */
			loadGridData: function() {
				var gridData = this.get("GridData");
				var businessRules = Terrasoft.BusinessRuleSchemaManager.getItems();
				businessRules.each(function(businessRuleItem) {
					var removed = businessRuleItem.getRemoved();
					if (!removed) {
						var rowItem = this.createBusinessRuleItemRow(businessRuleItem);
						this.setDisableButtonCaption(rowItem);
						gridData.add(businessRuleItem.getUId(), rowItem);
					}
				}, this);
				this.set("IsGridEmpty", gridData.isEmpty());
			},

			/**
			 * Creates a configuration element that will be shown if there are no elements in the list.
			 * @protected
			 * @param {Object} config Preconfigured options.
			 */
			prepareEmptyGridMessageConfig: function(config) {
				var academyUrl = this.get("AcademyUrl");
				var newConfig = Terrasoft.EmptyGridMessageConfigBuilder.getDefaultWizardSectionConfig(academyUrl);
				Ext.apply(config, newConfig);
			},

			/**
			 * Initialize academy link url.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope
			 */
			initHelpUrl: function(callback, scope) {
				AcademyUtilities.getUrl({
					scope: this,
					contextHelpId: this.get("HelpId"),
					callback: function(url) {
						this.set("AcademyUrl", url);
						Ext.callback(callback, scope);
					}
				});
			},

			/**
			 * Returns listed config.
			 * @protected
			 * @return {Object} Listed config.
			 */
			getListedConfig: function() {
				var isMultiPage = this.get("IsMultiPage");
				var additionalCol = isMultiPage ? 0 : 3;
				var listedConfig = {
					"items": [{
						"bindTo": "Name",
						"caption": this.get("Resources.Strings.BusinessRuleGridNameCaption"),
						"position": {
							"column": 0,
							"colSpan": 11 + additionalCol,
							"row": 1
						},
						"captionConfig": {"visible": true},
						"dataValueType": Terrasoft.core.enums.DataValueType.TEXT,
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}, {
						"bindTo": "EnabledText",
						"caption": this.get("Resources.Strings.BusinessRuleGridEnabledCaption"),
						"position": {
							"column": 0,
							"colSpan": 7 + additionalCol,
							"row": 1
						},
						"captionConfig": {"visible": true},
						"dataValueType": Terrasoft.core.enums.DataValueType.TEXT,
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}]
				};
				if (isMultiPage) {
					listedConfig.items.push({
						"bindTo": "Page",
						"caption": this.get("Resources.Strings.BusinessRuleGridPageCaption"),
						"position": {
							"column": 0,
							"colSpan": 6,
							"row": 1
						},
						"captionConfig": {"visible": true},
						"dataValueType": Terrasoft.core.enums.DataValueType.TEXT,
						"contentType": Terrasoft.ContentType.LONG_TEXT
					});
				}
				return listedConfig;
			},

			/**
			 * Sets grid profile.
			 * @protected
			 */
			createBusinessRuleGridProfile: function() {
				var listedConfig = this.getListedConfig();
				var profileKey = "BusinessRuleDataGridProfileKey";
				var profile = {
					"key": profileKey,
					"DataGrid": {
						"tiledConfig": "{}",
						"listedConfig": Terrasoft.encode(listedConfig),
						"key": profileKey,
						"isTiled": false,
						"type": Terrasoft.GridType.LISTED
					}
				};
				var currentProfile = this.get("Profile");
				if (!currentProfile) {
					this.set("Profile", profile);
				} else {
					Ext.apply(currentProfile, profile);
				}
			},

			/**
			 * Updates active row view model.
			 * @protected
			 * @param {Terrasoft.BusinessRuleSchemaManagerItem} item Business rule schema manger item.
			 */
			updateActiveRowViewModel: function(item) {
				if (item.isModified()) {
					var activeRow = this.getActiveRow();
					var itemCaption = item.getCaption();
					var ruleName = itemCaption.getValue() || item.getName();
					activeRow.set("Name", ruleName);
					activeRow.set("Page", this.getFullPageCaption(item));
				}
			},

			/**
			 * Processes section business rule on close business rule manager.
			 * @protected
			 * @param {Object} businessRuleManagerItem Business rule schema manger item.
			 */
			onCloseBusinessRuleSchemaDesigner: function(businessRuleManagerItem) {
				this.sandbox.unloadModule(this.sandbox.id + "_BusinessRuleSchemaDesigner");
				this.set("BusinessRuleDesignerVisible", false);
				if (!businessRuleManagerItem) {
					this.set("isNewBusinessRule", false);
					return;
				}
				if (this.get("isNewBusinessRule")) {
					Terrasoft.BusinessRuleSchemaManager.addItem(businessRuleManagerItem);
					var gridData = this.get("GridData");
					var rowItem = this.createBusinessRuleItemRow(businessRuleManagerItem);
					this.setDisableButtonCaption(rowItem);
					var managerItemUId = businessRuleManagerItem.getUId();
					gridData.add(managerItemUId, rowItem, 0);
					this.set("IsGridEmpty", gridData.isEmpty());
					this.set("isNewBusinessRule", false);
					this.set("ActiveRow", managerItemUId);
					this.reloadGridColumnsConfig(true);
				} else {
					this.updateActiveRowViewModel(businessRuleManagerItem);
				}
			},

			/**
			 * Creates business rule row item.
			 * @protected
			 * @param {Terrasoft.BusinessRuleSchemaManagerItem} item Business rule schema manger item.
			 * @return {Terrasoft.model.BaseViewModel} Business rule item row.
			 */
			createBusinessRuleItemRow: function(item) {
				var itemCaption = item.getCaption();
				var ruleName = (itemCaption && itemCaption.getValue()) || item.getName();
				var enabled = item.getEnabled();
				var invalid = item.getInvalid();
				if (invalid) {
					ruleName += " " + this.get("Resources.Strings.InvalidRulePrefix");
				}
				var page = this.get("IsMultiPage") ? this.getFullPageCaption(item) : null;
				var config = {
					"id": item.getUId(),
					"name": ruleName,
					"enabledText": this.getEnableText(enabled),
					"valid": !invalid,
					"enabled": enabled,
					"page": page
				};
				return this.createRowViewModel(config);
			},

			/**
			 * Creates row view model.
			 * @protected
			 * @param {Object} config Configuration object.
			 * @param {String} config.id Business rule uId.
			 * @param {String} config.name Business rule caption.
			 * @param {String} config.enabledText Enabled text value.
			 * @param {String} config.page Page caption.
			 * @param {Boolean} config.valid Is business rule valid.
			 * @param {Boolean} config.enabled Is business rule enabled.
			 * @return {Terrasoft.model.BaseViewModel} Row view model.
			 */
			createRowViewModel: function(config) {
				return Ext.create("Terrasoft.model.BaseViewModel", {
					primaryColumnName: "Name",
					values: {
						Enabled: config.enabled,
						OpenButtonCaption: this.get("Resources.Strings.OpenButtonCaption"),
						DisableButtonCaption: this.get("Resources.Strings.DisableButtonCaption"),
						DeleteButtonCaption: this.get("Resources.Strings.DeleteButtonCaption")
					},
					methods: {
						onNameLinkClick: Terrasoft.emptyFn,
						onEnabledTextLinkClick: Terrasoft.emptyFn,
						onValidTextLinkClick: Terrasoft.emptyFn,
						onPageTextLinkClick: Terrasoft.emptyFn,
						onPageLinkClick: Terrasoft.emptyFn
					},
					columns: {
						Id: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: "Id",
							dataValueType: Terrasoft.core.enums.DataValueType.GUID,
							value: config.id
						},
						Name: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: "Name",
							dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
							value: config.name
						},
						EnabledText: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: "Enabled",
							dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
							value: config.enabledText
						},
						Valid: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: "Valid",
							dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN,
							value: config.valid
						},
						Page: {
							type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
							caption: "Page",
							dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
							value: config.page
						}
					}
				});
			},

			/**
			 * Returns full page caption.
			 * @protected
			 * @param {Terrasoft.BusinessRuleSchemaManagerItem} item Business rule schema manger item.
			 * @return {String} Full page caption.
			 */
			getFullPageCaption: function(item) {
				var schemaUId = item.getClientUnitSchemaUId();
				var items = Terrasoft.SysModuleEditManager.filterByFn(function(managerItem) {
					return managerItem.getCardSchemaUId() === schemaUId;
				}, this);
				var captionArray = items.mapArray(function(editManagerItem) {
					return editManagerItem.getPageCaption();
				}, this);
				return captionArray.join(", ");
			},

			/**
			 * Initializes business rule manager.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initBusinessRuleSchemaManager: function(callback, scope) {
				var config = {
					entitySchemaId: this.get("SysModuleEntityId"),
					pageSchemaUId: this.get("ClientUnitSchemaUId")
				};
				Terrasoft.BusinessRuleSchemaManager.clear();
				Terrasoft.BusinessRuleSchemaManager.initializeRules(config, callback, scope);
			},

			/**
			 * Processes getting module designer configuration.
			 * @protected
			 */
			onGetModuleConfigDesigner: function() {
				var config = this.getModuleDesignerConfig();
				var schemaDesignerId = this.getSchemaDesignerSandboxId();
				this.sandbox.publish("GetModuleConfigResultDesigner", config, [schemaDesignerId]);
			},

			/**
			 * Returns module designer configuration.
			 * @protected
			 * @returns {Object} Module designer configuration
			 */
			getModuleDesignerConfig: function() {
				return {
					businessRuleItem: this.get("isNewBusinessRule")
						? Terrasoft.BusinessRuleSchemaManager.createNewManagerItem()
						: Terrasoft.BusinessRuleSchemaManager.getItem(this.get("ActiveRow")),
					entitySchemaId: this.get("SysModuleEntityId"),
					isMultiPage: this.get("IsMultiPage"),
					isNew: this.get("isNewBusinessRule"),
					packageUId: this.get("PackageUId")
				};
			},

			/**
			 * Returns business rule item.
			 * @protected
			 * @return {Terrasoft.BusinessRuleSchemaManagerItem} Business rule item.
			 */
			getManagerItemByActiveRow: function() {
				var rowId = this.get("ActiveRow");
				return Terrasoft.BusinessRuleSchemaManager.getItem(rowId);
			},

			/**
			 * Shows confiramtion to remove business rule.
			 * @protected
			 */
			confirmRemoveBusinessRule: function() {
				var message = this.get("Resources.Strings.ConfirmRemoveBusinessRuleMessage");
				Terrasoft.showConfirmation(message, this.removeBusinessRuleConfirmationHandler,
					["yes", "no"], this, {defaultButton: 0});
			},

			/**
			 * Removes business rule.
			 * @protected
			 * @param {String} buttonCode Button code.
			 */
			removeBusinessRuleConfirmationHandler: function(buttonCode) {
				if (buttonCode === "yes") {
					var rule = this.getManagerItemByActiveRow();
					rule.getInstance(function(instance) {
						instance.setPropertyValue("removed", true);
						this.removeActiveRow();
						var gridData = this.get("GridData");
						this.set("IsGridEmpty", gridData.isEmpty());
					}, this);
				}
			},

			/**
			 * Sets disable button caption.
			 * @protected
			 * @param {Boolean} enabled Enabled sate.
			 */
			updateActiveRowEnabledState: function(enabled) {
				var row = this.getActiveRow();
				row.set("Enabled", enabled);
				this.setDisableButtonCaption(row);
				this.setRowEnabledText(row);
			},

			/**
			 * Sets disable button caption.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} row View model item.
			 */
			setDisableButtonCaption: function(row) {
				var caption = row.get("Enabled")
					? this.get("Resources.Strings.DisableButtonCaption")
					: this.get("Resources.Strings.EnableButtonCaption");
				row.set("DisableButtonCaption", caption);
			},

			/**
			 * Sets enabled item text.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} row View model item.
			 */
			setRowEnabledText: function(row) {
				var enabled = row.get("Enabled");
				var enabledText = this.getEnableText(enabled);
				row.set("EnabledText", enabledText);
			},

			/**
			 * Returns enabled item text.
			 * @protected
			 * @param {Boolean} enabled Is item enabled.
			 * @return {String} Enable text.
			 */
			getEnableText: function(enabled) {
				return enabled
					? this.get("Resources.Strings.BusinessRuleGridEnabledText")
					: this.get("Resources.Strings.BusinessRuleGridDisabledText");
			}

			// endregion

		},

		diff: /**SCHEMA_DIFF*/[{
			"operation": "merge",
			"name": "DataGridContainer",
			"values": {
				"visible": {
					"bindTo": "BusinessRuleDesignerVisible",
					"bindConfig": {"converter": "invertBooleanValue"}
				}
			}
		}, {
			"operation": "merge",
			"name": "DataGridAddNewRecordButton",
			"values": {
				"caption": {"bindTo": "Resources.Strings.AddNewRuleButtonCaption"},
				"classes": {
					"wrapperClass": ["add-new-business-rule"]
				}
			}
		}, {
			"operation": "merge",
			"name": "DataGrid",
			"values": {
				"getEmptyMessageConfig": {"bindTo": "prepareEmptyGridMessageConfig"}
			}
		}, {
			"operation": "insert",
			"name": "BusinessRuleDesigner",
			"propertyName": "items",
			"values": {
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"id": "BusinessRuleWrapDesignerContainer",
				"wrapClass": ["business-rule-designer-container-wrapClass"],
				"visible": {"bindTo": "BusinessRuleDesignerVisible"},
				"items": []
			}
		}, {
			"operation": "merge",
			"name": "DataGridActiveRowOpenAction",
			"values": {
				"visible": {
					"bindTo": "Valid"
				}
			}
		}, {
			"operation": "merge",
			"name": "DataGridActiveRowDisableAction",
			"values": {
				"visible": {
					"bindTo": "Valid"
				}
			}
		}]/**SCHEMA_DIFF*/
	};
});


