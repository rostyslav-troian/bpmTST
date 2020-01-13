Terrasoft.configuration.Structures["LeadSectionV2"] = {innerHierarchyStack: ["LeadSectionV2Lead", "LeadSectionV2MLLeadScoring", "LeadSectionV2"], structureParent: "BaseSectionV2"};
define('LeadSectionV2LeadStructure', ['LeadSectionV2LeadResources'], function(resources) {return {schemaUId:'11939bd1-a5b4-4f3f-9f89-3bd0baad06e9',schemaCaption: "LeadSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'LeadSectionV2Lead',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadSectionV2MLLeadScoringStructure', ['LeadSectionV2MLLeadScoringResources'], function(resources) {return {schemaUId:'931ffc59-efd9-49b2-9c70-dba6d73af165',schemaCaption: "LeadSectionV2", parentSchemaName: "LeadSectionV2Lead", schemaName:'LeadSectionV2MLLeadScoring',parentSchemaUId:'11939bd1-a5b4-4f3f-9f89-3bd0baad06e9',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"LeadSectionV2Lead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadSectionV2Structure', ['LeadSectionV2Resources'], function(resources) {return {schemaUId:'c52c28a0-d019-42f7-b83a-610e836f274b',schemaCaption: "LeadSectionV2", parentSchemaName: "LeadSectionV2MLLeadScoring", schemaName:'LeadSectionV2',parentSchemaUId:'931ffc59-efd9-49b2-9c70-dba6d73af165',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"LeadSectionV2MLLeadScoring",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadSectionV2LeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("LeadSectionV2Lead", ["terrasoft", "BaseFiltersGenerateModule"],
	function(Terrasoft, BaseFiltersGenerateModule) {
		return {
			entitySchemaName: "Lead",
			columns: {},
			messages: {
				"GetMapsConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSection#initFixedFiltersConfig
				 * @overridden
				 */
				initFixedFiltersConfig: function() {
						var fixedFilterConfig = {
							entitySchema: this.entitySchema,
							filters: [
								{
									name: "Owner",
									caption: this.get("Resources.Strings.OwnerFilterCaption"),
									dataValueType: Terrasoft.DataValueType.LOOKUP,
									filter: BaseFiltersGenerateModule.OwnerFilter,
									columnName: "Owner"
								}
							]
						};
						this.set("FixedFilterConfig", fixedFilterConfig);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSection#getAddMiniPageDefaultValues
				 * @overridden
				 */
				getAddMiniPageDefaultValues: function() {
					var defaultValues = this.callParent(arguments);
					defaultValues.push({
						name: "IsFromSection",
						value: true
					});
					return defaultValues;
				},

				/**
				 * Initializing context help
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1009);
					this.callParent(arguments);
				},

				/**
				 * Action "Show on map"
				 */
				openShowOnMap: function() {
					this.showBodyMask();
					var items = this.getSelectedItems();
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Lead"
					});
					select.addColumn("Id");
					select.addColumn("LeadName");
					select.addColumn("Address");
					select.addColumn("City");
					select.addColumn("Region");
					select.addColumn("Country");
					select.filters.add("LeadIdFilter", Terrasoft.createColumnInFilterWithParameters("Id", items));
					select.getEntityCollection(function(result) {
						if (result.success) {
							var mapsConfig = {
								mapsData: []
							};
							result.collection.each(function(item) {
								var fullAddress = [];
								var country = item.get("Country");
								if (country) {
									fullAddress.push(country.displayValue);
								}
								var region = item.get("Region");
								if (region) {
									fullAddress.push(region.displayValue);
								}
								var city = item.get("City");
								if (city) {
									fullAddress.push(city.displayValue);
								}
								var address = item.get("Address");
								fullAddress.push(address);

								var leadName = item.get("LeadName");
								var dataItem = {
									caption: leadName,
									content: "<h2>" + leadName + "</h2><div>" + fullAddress.join(", ") + "</div>",
									address: address ? fullAddress.join(", ") : null
								};
								mapsConfig.mapsData.push(dataItem);
							});
							var uniqueMapsId = Terrasoft.generateGUID();
							var mapsModuleSandboxId = this.sandbox.id + "_MapsModule" + uniqueMapsId;
							this.sandbox.subscribe("GetMapsConfig", function() {
								return mapsConfig;
							}, [mapsModuleSandboxId]);
							this.sandbox.loadModule("MapsModule", {
								id: mapsModuleSandboxId,
								keepAlive: true
							});
						}
						this.hideBodyMask();
					}, this);
				},

				/**
				 * Returns a collection of action section in the register display mode
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} Returns a collection of action section in the
				 * register display mode
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Click: { bindTo: "openShowOnMap" },
						Caption: { "bindTo": "Resources.Strings.ShowOnMap" },
						Enabled: { "bindTo": "isAnySelected" },
						Tag: "ShowOnMap"
					}));
					return actionMenuItems;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				/*{
					"operation": "insert",
					"parentName": "DisqualifyGroupAction",
					"propertyName": "menu",
					"name": "DisqualifyLostLeadAction",
					"values": {
						"caption": { "bindTo": "Resources.Strings.DisqualifyLeadLost" },
						"click": { "bindTo": "onCardAction" },
						"tag": "disqualifyLost"
					}
				},
				{
					"operation": "insert",
					"parentName": "DisqualifyGroupAction",
					"propertyName": "menu",
					"name": "DisqualifyLeadNoConnectionAction",
					"values": {
						"caption": { "bindTo": "Resources.Strings.DisqualifyLeadNoConnection" },
						"click": { "bindTo": "onCardAction" },
						"tag": "disqualifyNoConnection"
					}
				},
				{
					"operation": "insert",
					"parentName": "DisqualifyGroupAction",
					"propertyName": "menu",
					"name": "DisqualifyLeadNotInterestedAction",
					"values": {
						"caption": { "bindTo": "Resources.Strings.DisqualifyLeadNotInterested" },
						"click": { "bindTo": "onCardAction" },
						"tag": "disqualifyNotInterested"
					}
				}*/
			]/**SCHEMA_DIFF*/
		};
	});

define('LeadSectionV2MLLeadScoringResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("LeadSectionV2MLLeadScoring", ["DesktopPopupNotification"],
	function(DesktopPopupNotification) {
		return {
			entitySchemaName: "Lead",

			methods: {

				/**
				 * Return name of lead by its id.
				 * @param {String} id Lead's id.
				 * @param {Function} callback Callback functions with lead name.
				 * @private
				 */
				_getLeadName: function(id, callback) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					esq.addColumn("LeadName");
					esq.getEntity(id, function(response) {
						var leadName = response.success ? response.entity.$LeadName : null;
						this.Ext.callback(callback, this, [leadName]);
					}, this);
				},

				/**
				 * Shows desktop notification after lead was successfully score.
				 * @param {String} leadId Lead's id.
				 * @param {Number} predictedScore The result of scoring.
				 * @private
				 */
				_showLeadScoredDesktopNotification: function(leadId, predictedScore) {
					this._getLeadName(leadId, function(leadName) {
						var config = DesktopPopupNotification.createConfig();
						var image = this.get("Resources.Images.MLIcon");
						var title = this.Ext.String.format(this.get("Resources.Strings.LeadScoredTitle"),
							leadName);
						var body = this.Ext.String.format(this.get("Resources.Strings.LeadScoredBody"),
							Math.round(predictedScore * 100));
						DesktopPopupNotification.show(Ext.apply(config, {
							title: title,
							body: body,
							icon: Terrasoft.ImageUrlBuilder.getUrl(image)
						}));
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getSectionActions
				 * @override
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Caption: "$Resources.Strings.ScoreLeadActionCaption",
						Enabled: {
							bindTo: "isSingleSelected"
						},
						ImageConfig: this.get("Resources.Images.MLIconSvg"),
						Click: {
							bindTo: "scoreLeadAction"
						}
					}));
					return actionMenuItems;
				},

				/**
				 * Evaluates predictive score for selected lead entity.
				 */
				scoreLeadAction: function() {
					var activeRow = this.getActiveRow();
					var activeRowId = activeRow.get("Id");
					this.callService({
						serviceName: "MLPredictorService",
						methodName: "ScoreEntity",
						data: {
							entitySchemaUId: this.entitySchema.uId,
							entitySchemaTargetColumnUId: this.entitySchema.getColumnByName("PredictiveScore").uId,
							entityId: activeRowId
						}
					}, function(response) {
						var scoreEntityResult = response.result || {};
						var exitCode = scoreEntityResult.exitCode;
						if (exitCode === 0) {
							if (activeRow.get("PredictiveScore") != null) {
								activeRow.loadEntity(activeRowId);
							}
							this._showLeadScoredDesktopNotification(activeRowId, scoreEntityResult.predictedScore);
						} else {
							var errorMessage = exitCode === 1
								? "Resources.Strings.ScoreLeadActionNoModelsErrorMessage"
								: "Resources.Strings.ScoreLeadActionGeneralErrorMessage";
							Terrasoft.showErrorMessage(this.get(errorMessage));
						}
					}.bind(this));
				}

			},
			diff: /**SCHEMA_DIFF*/ [
			]/**SCHEMA_DIFF*/
		};
	});

define("LeadSectionV2", ["LeadSectionV2Resources", "terrasoft", "ControlGridModule", "BaseProgressBarModule",
			"EntityHelper", "LeadManagementUtilities", "css!BaseProgressBarModule",
			"css!LeadQualificationModuleStyles"],
		function(resources, Terrasoft) {
			return {
				entitySchemaName: "Lead",
				attributes: {
					"UseProcessLeadManagement": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					},
					/**
					 * Caption of the Qualification button.
					 */
					"QualificationProcessButtonCaption": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.TEXT
					}
				},
				mixins: {
					EntityHelper: "Terrasoft.EntityHelper",
					LeadManagementUtilities: "Terrasoft.LeadManagementUtilities"
				},
				messages: {
					/**
					 * @message GetBackHistoryState
					 * Gets history point that will be reached when "Close" button in the "Needs" window will be clicked.
					 */
					"GetBackHistoryState": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				methods: {
					/**
					 * Initiates starter model values
					 * @overridden
					 * @param {Function} callback Call back function.
					 */
					init: function(callback) {
						this.callParent([function() {
							this.initLeadManagement(callback, this);
						}, this]);
						var initialHistoryState = this.sandbox.publish("GetHistoryState").hash.historyState;
						this.set("InitialHistoryState", initialHistoryState);
					},

					/**
					 * Subscribe on sandbox events
					 * @protected
					 * @overriden
					 */
					subscribeSandboxEvents: function() {
						this.callParent();
						this.sandbox.subscribe("GetBackHistoryState", function() {
							return this.get("InitialHistoryState");
						}, this, ["LeadTypeSectionV2"]);
						var cardModuleSandboxId = this.getCardModuleSandboxId();
						this.sandbox.subscribe("EntityInitialized", function(entityInfo) {
							var activeRow = this.getActiveRow();
							if (activeRow) {
								activeRow.set("QualifyStatus", entityInfo.QualifyStatus);
							}
							this.initLeadManagementControls();
						}, this, [cardModuleSandboxId]);
					},

					/**
					 * Returns section actions collection.
					 * Adds "Set up customer needs" action.
					 * @protected
					 * @overridden
					 * @return {Terrasoft.BaseViewModelCollection} Returns actions collection.
					 */
					getSectionActions: function() {
						var actionMenuItems = this.callParent(arguments);
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Type": "Terrasoft.MenuSeparator"
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Caption": {"bindTo": "Resources.Strings.ConfigureLeadTypes"},
							"Enabled": true,
							"Click": {"bindTo": "navigateToLeadTypeSection"}
						}));
						return actionMenuItems;
					},

					/**
					 * Navigates to Lead type section.
					 * @protected
					 */
					navigateToLeadTypeSection: function() {
						this.sandbox.publish("PushHistoryState", {
							hash: "SectionModuleV2/LeadTypeSectionV2"
						});
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
					 * @overridden
					 */
					getGridDataColumns: function() {
						var gridDataColumns = this.callParent(arguments);
						gridDataColumns.QualifyStatus = gridDataColumns.QualifyStatus || {path: "QualifyStatus"};
						gridDataColumns.QualificationProcessId =
								gridDataColumns.QualificationProcessId || {path: "QualificationProcessId"};
						gridDataColumns["QualifyStatus.StageNumber"] =
								gridDataColumns["QualifyStatus.StageNumber"] || {path: "QualifyStatus.StageNumber"};
						return gridDataColumns;
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#onActiveRowAction
					 * @overridden
					 */
					onActiveRowAction: function(buttonTag) {
						if (buttonTag === "onLeadManagementSectionButtonClick") {
							this.onLeadManagementSectionButtonClick();
						} else {
							this.callParent(arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.LeadManagementUtilities#leadManagementProcessCallback
					 * @overridden
					 */
					leadManagementProcessCallback: function() {
						this.mixins.LeadManagementUtilities.leadManagementProcessCallback.call(this, arguments);
						this.hideBodyMask();
						this.reloadActiveRow();
					},

					/**
					 * Refresh entity columns of active row.
					 * @protected
					 */
					reloadActiveRow: function() {
						var activeRow = this.getActiveRow();
						if (activeRow) {
							var entityColumns = this.getEntityColumns(activeRow);
							var gridColumns = _.keys(this.getGridDataColumns());
							var columns = entityColumns.concat(gridColumns);
							columns = _.uniq(columns);
							this.refreshColumns(columns, this.Ext.emptyFn, activeRow, {silent: false});
						}
					},

					/**
					 * Get the viewModel's columns that belongs to entity.
					 * @protected
					 * @param {Object} activeRow The active row of the section.
					 * @return {Array}
					 */
					getEntityColumns: function(activeRow) {
						var result = [];
						Terrasoft.each(activeRow.columns, function(item, key) {
							if (item.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
								result.push(key);
							}
						});
						return result;
					},

					/**
					 * @inheritdoc Terrasoft.LeadManagementUtilities#getQualifyStatus
					 * @overridden
					 */
					getQualifyStatus: function(id) {
						var activeRow;
						if (id) {
							var gridData = this.getGridData();
							activeRow = gridData.get(id);
						} else {
							activeRow = this.getActiveRow();
						}
						if (!activeRow) {
							return null;
						}
						var qualifyStatus = activeRow.get("QualifyStatus");
						return (qualifyStatus) ? qualifyStatus.value : null;
					},

					/**
					 * @inheritdoc Terrasoft.LeadManagementUtilities#initLeadManagementControls
					 * @overridden
					 */
					initLeadManagementControls: function(entity) {
						if (this.get("IsCardVisible")) {
							this.mixins.LeadManagementUtilities.initLeadManagementControls.call(this);
						} else {
							this.initLeadManagementButtonCaption(entity);
							this.initLeadManagementButtonVisibility(entity);
							this.initDisqalificationButtonVisibility();
						}
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#addColumnLink
					 * @overridden
					 */
					addColumnLink: function(item) {
						var self = this;
						item.getQualificationProcessButtonCaption = function() {
							self.initLeadManagementButtonCaption.call(self, item);
							return self.get("QualificationProcessButtonCaption");
						};
						item.getIsQualificationStageActive = function() {
							self.initLeadManagementButtonVisibility.call(self, item);
							return self.get("LeadManagementButtonVisible");
						};
						item.getQualifyStatusValue = function(qualifyStatus) {
							if (!qualifyStatus) {
								return null;
							} else {
								return {
									value: qualifyStatus && qualifyStatus.StageNumber || this.get("QualifyStatus.StageNumber"),
									displayValue: qualifyStatus.displayValue
								};
							}
						};
						return this.callParent(arguments);
					},

					/**
					 * @inheritDoc Terrasoft.GridUtilitiesV2#onActiveRowChange
					 * @overridden
					 */
					onActiveRowChange: function() {
						this.initLeadManagementControls();
						this.callParent(arguments);
					},

					/**
					 * Passes indicator config by reference.
					 * @param {Object} control Configuration object.
					 * @overridden
					 */
					applyControlConfig: function(control) {
						control.config = {
							className: "Terrasoft.BaseProgressBar",
							value: {
								"bindTo": "QualifyStatus",
								"bindConfig": {"converter": "getQualifyStatusValue"}
							},
							width: "158px"
						};
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"className": "Terrasoft.ControlGrid",
							"controlColumnName": "QualifyStatus",
							"applyControlConfig": {"bindTo": "applyControlConfig"}
						}
					},
					{
						"operation": "merge",
						"name": "DataGridActiveRowDeleteAction",
						"values": {
							"visible": true
						}
					},
					{
						"operation": "insert",
						"name": "QualificationProcessButton",
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"caption": {"bindTo": "QualificationProcessButtonCaption"},
							"markerValue": {"bindTo": "QualificationProcessButtonCaption"},
							"click": {"bindTo": "onLeadManagementSectionButtonClick"},
							"classes": {"wrapperClass": ["actions-button-margin-right"]},
							"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
							"imageConfig": resources.localizableImages.QualificationProcessButtonImage,
							"visible": {"bindTo": "LeadManagementButtonVisible"}
						}
					},
					{
						"operation": "insert",
						"name": "DataGridActiveRowQualificationProcessAction",
						"parentName": "DataGrid",
						"propertyName": "activeRowActions",
						"values": {
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"caption": {"bindTo": "getQualificationProcessButtonCaption"},
							"tag": "onLeadManagementSectionButtonClick",
							"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
							"imageConfig": resources.localizableImages.QualificationProcessActionImage,
							"visible": {"bindTo": "getIsQualificationStageActive"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


