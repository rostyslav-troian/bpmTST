Terrasoft.configuration.Structures["SectionMiniPageSettings"] = {innerHierarchyStack: ["SectionMiniPageSettings"]};
define('SectionMiniPageSettingsStructure', ['SectionMiniPageSettingsResources'], function(resources) {return {schemaUId:'334c7b86-4fc7-4656-98c6-048da54bfaef',schemaCaption: "SectionMiniPageSettings", parentSchemaName: "", schemaName:'SectionMiniPageSettings',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionMiniPageSettings", ["ViewModelSchemaDesignerUtils",
	"SectionMiniPageSettingsResources", "ApplicationStructureWizardUtils", "MiniPageDesignerViewGenerator",
	"SectionSettingsMixin", "SchemaBuilderV2", "SectionMiniPageWizard"
], function() {
	return {
		mixins: {
			"SectionSettingsMixin": "Terrasoft.SectionSettingsMixin"
		},
		messages: {
			"SaveSectionMiniPageSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"PageSettingsChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"SaveSectionVisaSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Flag that indicates whether mini page in section is available in add mode.
			 */
			"MiniPageAddMode": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Flag that indicates whether mini page in section is available in edit mode.
			 */
			"MiniPageEditMode": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Flag that indicates whether mini page in section is available in view mode.
			 */
			"MiniPageViewMode": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * MiniPage schema UId.
			 */
			"MiniPageSchemaUId": {
				dataValueType: Terrasoft.DataValueType.GUID,
				value: null
			},
			/**
			 * Old MiniPage schema UId. Stores schema UId when un-check MiniPageChecked.
			 */
			"OldMiniPageSchemaUId": {
				dataValueType: Terrasoft.DataValueType.GUID,
				value: null
			},
			/**
			 * Flag that indicates whether exists registered module edit or not.
			 */
			"HasModuleEdits": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				values: false
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_saveChanges: function(callback, scope) {
				let pageSettingsChanged = false;
				Terrasoft.chain(
					function(next) {
						const hasCheckedModes = this.get("MiniPageAddMode") ||
							this.get("MiniPageEditMode") ||
							this.get("MiniPageViewMode");
						if (hasCheckedModes && !this.get("MiniPageSchemaUId")) {
							pageSettingsChanged = true;
							this._createMiniPage(next, this);
						} else {
							next();
						}
					},
					function(next) {
						this._updatePages(next, this);
					},
					function() {
						if (Terrasoft.Features.getIsDisabled("SectionPageWizard")) {
							if (pageSettingsChanged) {
								this._pageSettingsChanged();
							}
						}
						callback.call(scope);
					}, this
				);
			},

			/**
			 * @private
			 */
			_getModuleEntitySchemaName: function() {
				const entitySchema = this.getModuleEntitySchema();
				return entitySchema.getPropertyValue("name");
			},

			/**
			 * @private
			 */
			_getMiniPageSchemaName: function() {
				const entitySchemaName = this._getModuleEntitySchemaName();
				const template = Terrasoft.ApplicationStructureWizardUtils.getEntityFullName(
					entitySchemaName, "{0}MiniPage");
				const schemaName = Terrasoft.ClientUnitSchemaManager.getUniqueNameByTemplate(template);
				return schemaName;
			},

			/**
			 * @private
			 */
			_createMiniPage: function(callback, scope) {
				const schemaName = this._getMiniPageSchemaName();
				const schemaType = Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA;
				const bodyTemplate = Terrasoft.ClientUnitSchemaBodyTemplate[schemaType];
				const entitySchemaName = this.getModuleEntitySchema().getPropertyValue("name");
				const body = Ext.String.format(bodyTemplate, schemaName, entitySchemaName);
				const config = {
					uId: Terrasoft.generateGUID(),
					name: schemaName,
					packageUId: this.get("PackageUId"),
					caption: new Terrasoft.LocalizableString(schemaName),
					body: body,
					schemaType: schemaType,
					parentSchemaUId: Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_MINI_PAGE,
					extendParent: false
				};
				const schema = Terrasoft.ClientUnitSchemaManager.createSchema(config);
				Terrasoft.ClientUnitSchemaManager.addSchema(schema);
				this.set("MiniPageSchemaUId", schema.uId);
				this._addHeaderPrimaryDisplayValue(schema);
				schema.define(callback, scope);
			},

			/**
			 * Appends header with label to display primary display column value.
			 * @private
			 * @param schema {Terrasoft.manager.ClientUnitSchema} Mini page client unit schema.
			 */
			_addHeaderPrimaryDisplayValue: function(schema) {
				const oldDiffStr = schema.getSchemaDiff();
				const oldDiff = JSON.parse(oldDiffStr);
				const headerColumnDiff = this._getHeaderColumnDiff();
				const diff = oldDiff.concat(headerColumnDiff);
				schema.setSchemaDiff(diff);
			},

			/**
			 * @private
			 */
			_getHeaderColumnDiff: function() {
				return [
					{
						"operation": "insert",
						"parentName": "HeaderContainer",
						"propertyName": "items",
						"index": 1,
						"name": "HeaderColumnContainer",
						"values": {
							"itemType": "#Terrasoft.ViewItemType.LABEL#",
							"caption": {"bindTo": "getPrimaryDisplayColumnValue"},
							"labelClass": ["label-in-header-container"],
							"visible": {"bindTo": "isNotAddMode"}
						}
					}
				];
			},

			/**
			 * @private
			 */
			_updatePages: function(callback, scope) {
				const miniPageSchemaUId = this.get("MiniPageSchemaUId");
				this.getActiveSysModuleEditManagerItemsChain(function(moduleEdits) {
					moduleEdits.each(function(moduleEdit) {
						moduleEdit.setMiniPageSchemaUId(miniPageSchemaUId);
						const modes = [
							this.get("MiniPageAddMode") ? Terrasoft.ConfigurationEnums.CardOperation.ADD : "",
							this.get("MiniPageEditMode") ? Terrasoft.ConfigurationEnums.CardOperation.EDIT : "",
							this.get("MiniPageViewMode") ? Terrasoft.ConfigurationEnums.CardOperation.VIEW : ""
						].join(";");
						moduleEdit.setMiniPageModes(modes);
						moduleEdit.setForceUpdateColumns(["MiniPageModes"]);
					}, this);
					callback.call(scope);
				}, this);
			},

			/**
			 * @private
			 */
			_subscribeSandboxEvents: function() {
				this.sandbox.subscribe("SaveSectionMiniPageSettings", this.onSaveMiniPageSettings, this,
					[this.sandbox.id]);
				this.mixins.SectionSettingsMixin.subscribeSandboxEvents.call(this);
			},

			/**
			 * @private
			 */
			_pageSettingsChanged: function() {
				this.sandbox.publish("PageSettingsChanged", null, [this.sandbox.id]);
			},

			/**
			 * @private
			 */
			_getSchemaViewModelClass: function(schemaUId, callback, scope) {
				Terrasoft.ClientUnitSchemaManager.getItemByUId(schemaUId, function(item) {
					var builder = new Terrasoft.SchemaBuilder({
						viewGeneratorClassName: "Terrasoft.MiniPageDesignerViewGenerator"
					});
					builder.build({schemaName: item.name}, function(viewModelClass) {
						callback.call(scope, viewModelClass);
					}, this);
				}, this);
			},

			/**
			 * @private
			 */
			_getMiniPageModes: function(miniPage, callback, scope) {
				let modes = miniPage.getMiniPageModes();
				modes = modes && modes.split(";");
				if (Terrasoft.isEmpty(modes)) {
					this._getOldMiniPageModes(miniPage, callback, scope);
				} else {
					Ext.callback(callback, scope, [modes]);
				}
			},

			/**
			 * @private
			 */
			_getOldMiniPageModes: function(miniPage, callback, scope) {
				let modes;
				Terrasoft.chain(
					function(next) {
						this._getSchemaViewModelClass(miniPage.miniPageSchemaUId, next, this);
					},
					function(next, viewModelClass) {
						const miniPageModes = viewModelClass.prototype.getColumnByName("MiniPageModes");
						modes = (miniPageModes && miniPageModes.value) || [];
						const entitySchemaName = this._getModuleEntitySchemaName();
						const sysSettingName = Terrasoft.getFormattedString("Has{0}MiniPageAddMode", entitySchemaName);
						Terrasoft.SysSettings.querySysSettingsItem(sysSettingName, next, this);
					},
					function(next, hasAddMode) {
						const addMode = Terrasoft.ConfigurationEnums.CardOperation.ADD;
						if (!_.contains(modes, addMode) && hasAddMode) {
							modes.push(addMode);
						} else if (_.contains(modes, addMode) && !hasAddMode) {
							modes = _.without(modes, addMode);
						}
						Ext.callback(callback, scope, [modes]);
					}, this
				);
			},

			/**
			 * @private
			 */
			_subscribeOnChangeMiniPageMode: function() {
				this.on("change:MiniPageAddMode", this.onChangeMiniPageMode, this);
				this.on("change:MiniPageEditMode", this.onChangeMiniPageMode, this);
				this.on("change:MiniPageViewMode", this.onChangeMiniPageMode, this);
			},

			/**
			 * @private
			 */
			_unSubscribeOnChangeMiniPageMode: function() {
				this.un("change:MiniPageAddMode", this.onChangeMiniPageMode, this);
				this.un("change:MiniPageEditMode", this.onChangeMiniPageMode, this);
				this.un("change:MiniPageViewMode", this.onChangeMiniPageMode, this);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc BaseSchemaViewModel#initLookupQuickAddMixin
			 * @override
			 */
			initLookupQuickAddMixin: function(next, scope) {
				Ext.callback(next, scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.set("IsInitialized", false);
				this._subscribeSandboxEvents();
				this.callParent([function() {
					this.mixins.SectionSettingsMixin.init.call(this);
					Terrasoft.ClientUnitSchemaManager.initialize(function() {
						Ext.callback(callback, scope);
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.SectionSettingsMixin#getInitializedMessageName
			 * @override
			 */
			getInitializedMessageName: function() {
				return "MiniPageModuleSettingsInitialized";
			},

			/**
			 * @inheritdoc Terrasoft.SectionSettingsMixin#initModuleSettings
			 * @override
			 */
			initModuleSettings: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.getActiveSysModuleEditManagerItemsChain(next, this);
					},
					function(next, moduleEdits) {
						this.set("HasModuleEdits", moduleEdits.getCount() > 0);
						const miniPages = moduleEdits.filterByFn(function(moduleEdit) {
							return moduleEdit.getMiniPageSchemaUId();
						}, this);
						const miniPage = miniPages.first();
						if (miniPage) {
							this.set("MiniPageSchemaUId", miniPage.miniPageSchemaUId);
							this._getMiniPageModes(miniPage, next, this);
						} else {
							next();
						}
					},
					function(next, modes) {
						this.set("MiniPageAddMode", _.contains(modes, Terrasoft.ConfigurationEnums.CardOperation.ADD));
						this.set("MiniPageEditMode", _.contains(modes, Terrasoft.ConfigurationEnums.CardOperation.EDIT));
						this.set("MiniPageViewMode", _.contains(modes, Terrasoft.ConfigurationEnums.CardOperation.VIEW));
						this._subscribeOnChangeMiniPageMode();
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * @inheritdoc Terrasoft.SectionSettingsMixin#canEdit
			 * @override
			 */
			canEdit: function() {
				const isCanEdit = this.mixins.SectionSettingsMixin.canEdit.call(this);
				return isCanEdit && this.get("HasModuleEdits");
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this._unSubscribeOnChangeMiniPageMode();
				this.callParent(arguments);
			},

			/**
			 * Handler for MiniPageChecked attribute change.
			 * @protected
			 */
			onChangeMiniPageMode: function() {
				this.showBodyMask({selector: "#" + this.renderTo});
				this.isSaving = true;
				this._saveChanges(function() {
					this.hideBodyMask();
					this.isSaving = false;
					Ext.callback(this.savingCallback);
				}, this);
			},

			/**
			 * Handler for onSaveMiniPageSettings message.
			 * @protected
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback function context.
			 */
			onSaveMiniPageSettings: function(callback) {
				if (this.isSaving) {
					this.savingCallback = callback;
				} else {
					this._saveChanges(function() {
						Ext.callback(callback);
					}, this);
				}
			},

			/**
			 * @protected
			 */
			isSinglePageContainerVisible: function() {
				if (Terrasoft.Features.getIsDisabled("SectionPageWizard")) {
					return false;
				}
				const miniPageSchemaUId = this.get("MiniPageSchemaUId");
				return Boolean(miniPageSchemaUId);
			},

			/**
			 * Opens page wizard for minipage.
			 * @protected
			 * @param {Function} [callback] The callback function.
			 * @param {Object} [scope] The scope of callback function.
			 */
			onSinglePageButtonClick: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.sandbox.publish("SaveSectionVisaSettings", next);
					},
					function() {
						const url = [
							Terrasoft.workspaceBaseUrl,
							Terrasoft.DesignTimeEnums.WizardUrl.SECTION_MINIPAGE_WIZARD_URL,
							[
								Terrasoft.SectionWizardEnums.PageName.PAGE_DESIGNER,
								this.get("SectionManagerItem").id,
								this.get("MiniPageSchemaUId")
							].join("/")
						].join("");
						this.sandbox.publish("PushHistoryState", {hash: url});
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * @protected
			 */
			getSinglePageButtonHint: function() {
				let result = null;
				if (!this.canEdit()) {
					result = this.get("Resources.Strings.RequiredSetupSectionPage");
				} else if (!this.get("MiniPageSchemaUId")) {
					result = this.get("Resources.Strings.RequiredSelectModes");
				}
				return result;
			}

			// endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "MiniPageSettingsContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [
						{
							"name": "TopControlGroupTextContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["section-settings-label-container"]},
							"visible": Terrasoft.Features.getIsEnabled("SectionPageWizard"),
							"items": [
								{
									"name": "MiniPageLabel",
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": {"bindTo": "Resources.Strings.MiniPageSettingsCaption"},
									"labelClass": ["section-settings-label"]
								}
							]
						},
						{
							"name": "MiniPageLabelOld",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "Resources.Strings.MiniPageSettingsCaption"},
							"labelClass": ["section-settings-label"],
							"visible": Terrasoft.Features.getIsDisabled("SectionPageWizard")
						},
						{
							"name": "MiniPageModesContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["modes-container"],
							"items": [
								{
									"name": "MiniPageModesLabel",
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": {"bindTo": "Resources.Strings.MiniPageModesCaption"},
									"labelClass": ["t-label modes-label"]
								},
								{
									"name": "MiniPageModesInnerContainer",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"wrapClass": ["modes-inner-container"],
									"items": [
										{
											"name": "MiniPageAddMode",
											"caption": {"bindTo": "Resources.Strings.AvailableMiniPageAddModeCaption"},
											"enabled": {"bindTo": "canEdit"},
											"wrapClass": ["t-checkbox-control"]
										},
										{
											"name": "MiniPageEditMode",
											"caption": {"bindTo": "Resources.Strings.AvailableMiniPageEditModeCaption"},
											"enabled": {"bindTo": "canEdit"},
											"wrapClass": ["t-checkbox-control"]
										},
										{
											"name": "MiniPageViewMode",
											"caption": {"bindTo": "Resources.Strings.AvailableMiniPageViewModeCaption"},
											"enabled": {"bindTo": "canEdit"},
											"wrapClass": ["t-checkbox-control"]
										}
									]
								},
								{
									"name": "SinglePageContainer",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"classes": {"wrapClassName": ["single-page-container"]},
									"visible": Terrasoft.Features.getIsEnabled("SectionPageWizard"),
									"items": [
										{
											"name": "SetupMiniPageButton",
											"itemType": Terrasoft.ViewItemType.BUTTON,
											"caption": {"bindTo": "Resources.Strings.SetupMiniPageButtonCaption"},
											"click": {"bindTo": "onSinglePageButtonClick"},
											"style": Terrasoft.controls.ButtonEnums.style.BLUE,
											"enabled": {
												"bindTo": "MiniPageSchemaUId",
												"bindConfig": {"converter": "toBoolean"}
											},
											"hint": {"bindTo": "getSinglePageButtonHint"}
										}
									]
								}
							]
						}
					]
				}
			}
		]
	};
});


