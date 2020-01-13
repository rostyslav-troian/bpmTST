Terrasoft.configuration.Structures["ContactSectionV2"] = {innerHierarchyStack: ["ContactSectionV2UIv2", "ContactSectionV2SocialNetworkIntegration", "ContactSectionV2OSM", "ContactSectionV2Exchange", "ContactSectionV2Deduplication", "ContactSectionV2"], structureParent: "BaseSectionV2"};
define('ContactSectionV2UIv2Structure', ['ContactSectionV2UIv2Resources'], function(resources) {return {schemaUId:'0557bf34-e34a-46fa-990a-36ec59df39fa',schemaCaption: "Contacts section", parentSchemaName: "BaseSectionV2", schemaName:'ContactSectionV2UIv2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactSectionV2SocialNetworkIntegrationStructure', ['ContactSectionV2SocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'d5032786-6253-4b0a-8fbb-a0adad9df496',schemaCaption: "Contacts section", parentSchemaName: "ContactSectionV2UIv2", schemaName:'ContactSectionV2SocialNetworkIntegration',parentSchemaUId:'0557bf34-e34a-46fa-990a-36ec59df39fa',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactSectionV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactSectionV2OSMStructure', ['ContactSectionV2OSMResources'], function(resources) {return {schemaUId:'1f366ff8-2924-467f-b912-ef93ac730f61',schemaCaption: "Contacts section", parentSchemaName: "ContactSectionV2SocialNetworkIntegration", schemaName:'ContactSectionV2OSM',parentSchemaUId:'d5032786-6253-4b0a-8fbb-a0adad9df496',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactSectionV2SocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactSectionV2ExchangeStructure', ['ContactSectionV2ExchangeResources'], function(resources) {return {schemaUId:'93697a27-594d-4c7d-b7e6-116c8cdbe350',schemaCaption: "Contacts section", parentSchemaName: "ContactSectionV2OSM", schemaName:'ContactSectionV2Exchange',parentSchemaUId:'1f366ff8-2924-467f-b912-ef93ac730f61',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactSectionV2OSM",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactSectionV2DeduplicationStructure', ['ContactSectionV2DeduplicationResources'], function(resources) {return {schemaUId:'870dbbfc-1397-47c0-a792-b737b87471ee',schemaCaption: "Contacts section", parentSchemaName: "ContactSectionV2Exchange", schemaName:'ContactSectionV2Deduplication',parentSchemaUId:'93697a27-594d-4c7d-b7e6-116c8cdbe350',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactSectionV2Exchange",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactSectionV2Structure', ['ContactSectionV2Resources'], function(resources) {return {schemaUId:'a54c47c1-1cfd-45f2-aea3-65803cf3be16',schemaCaption: "Contacts section", parentSchemaName: "ContactSectionV2Deduplication", schemaName:'ContactSectionV2',parentSchemaUId:'870dbbfc-1397-47c0-a792-b737b87471ee',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactSectionV2Deduplication",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactSectionV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactSectionV2UIv2", ["GridUtilitiesV2", "RightUtilities", "ConfigurationConstants",
		"GoogleIntegrationUtilitiesV2", "css!ContactSectionV2CSS"],
	function(gridUtilitiesV2, RightUtilities, ConfigurationConstants) {
		return {
			entitySchemaName: "Contact",
			attributes: {
				/**
				 * The visibility of the menu items for synchronization.
				 * @Type {Boolean}
				 */
				"canUseGoogleOrSocialFeaturesByBuildType": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			messages: {
				/**
				 * @message GetMapsConfig
				 * ########## #########, ########### ### ###### ###### ####### ## #####.
				 * @param {Object} #########, ############ ### ###### ###### ####### ## #####.
				 */
				"GetMapsConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				GoogleIntegrationUtils: "Terrasoft.GoogleIntegrationUtilities"
			},
			methods: {
				/**
				 * @overridden
				 */
				init: function() {
					this.set("GridType", "tiled");
					this.callParent(arguments);
					var sysSettings = ["BuildType"];
					this.mixins.GoogleIntegrationUtils.init.call(this);
					Terrasoft.SysSettings.querySysSettings(sysSettings, function() {
						var buildType = Terrasoft.SysSettings.cachedSettings.BuildType &&
							Terrasoft.SysSettings.cachedSettings.BuildType.value;
						this.set("canUseGoogleOrSocialFeaturesByBuildType", buildType !==
							ConfigurationConstants.BuildType.Public);
					}, this);
				},

				/**
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1002);
					this.callParent(arguments);
				},

				/**
				 * ######## "######## ## #####".
				 */
				openShowOnMap: function() {
					var items = this.getSelectedItems();
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Contact"
					});
					select.addColumn("Id");
					select.addColumn("Name");
					select.addColumn("Address");
					select.addColumn("City");
					select.addColumn("Region");
					select.addColumn("Country");
					select.addColumn("GPSN");
					select.addColumn("GPSE");
					select.filters.add("ContactIdFilter", this.Terrasoft.createColumnInFilterWithParameters("Id", items));
					select.getEntityCollection(function(result) {
						if (result.success) {
							var mapsConfig = {
								mapsData: []
							};
							result.collection.each(function(item) {
								var address = [];
								var country = item.get("Country");
								if (country && country.displayValue) {
									address.push(country.displayValue);
								}
								var region = item.get("Region");
								if (region && region.displayValue) {
									address.push(region.displayValue);
								}
								var city = item.get("City");
								if (city && city.displayValue) {
									address.push(city.displayValue);
								}
								address.push(item.get("Address"));
								var name = item.get("Name");
								var dataItem = {
									caption: name,
									content: "<h2>" + name + "</h2><div>" + address.join(", ") + "</div>",
									address: item.get("Address") ? address.join(", ") : null,
									gpsN: item.get("GPSN"),
									gpsE: item.get("GPSE"),
									updateCoordinatesConfig: {
										schemaName: "Contact",
										id: item.get("Id")
									}
								};
								mapsConfig.mapsData.push(dataItem);
							});
							var mapsModuleSandboxId = this.sandbox.id + "_MapsModule" + this.Terrasoft.generateGUID();
							this.sandbox.subscribe("GetMapsConfig", function() {
								return mapsConfig;
							}, [mapsModuleSandboxId]);
							this.sandbox.loadModule("MapsModule", {
								id: mapsModuleSandboxId,
								keepAlive: true
							});
						}
					}, this);
				},

				/**
				 * Synchronizes with Google contacts.
				 * @protected
				 */
				synchronizeNow: function() {
					if (this.get("canUseGoogleOrSocialFeaturesByBuildType")) {
						this.synchronizeWithGoogleContacts();
					} else {
						if (!this.get("IsExchangeContactSyncExist")) {
							this.showConfirmationDialog(this.get("Resources.Strings.FolderNotSet"), function(result) {
								if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.showSyncDialog();
								}
							}, ["yes", "no"]);
						}
					}
				},

				/**
				 * Action "Synchronize with Google Contacts".
				 * @protected
				 */
				synchronizeWithGoogleContacts: function() {
					this.checkCanUseGoogleContactsSync(function() {
						this.showBodyMask();
						if (!this.get("GoogleSyncExists") && !this.get("IsExchangeContactSyncExist")) {
							this.showConfirmationDialog(this.get("Resources.Strings.FolderNotSet"), function(result) {
								if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.showSyncDialog();
								}
							}, ["yes", "no"]);
							this.hideBodyMask();
							return;
						}
						if (!this.get("GoogleSyncExists") && this.get("IsExchangeContactSyncExist")) {
							this.hideBodyMask();
							return;
						}
						this.startGoogleSynchronization();
					}, this);
				},

				/**
				 * @obsolete
				 */
				fillContactWithSocialNetworksData: function() {
					var activeRowId = this.get("ActiveRow");
					var selectedRowIds = this.get("SelectedRows");
					if (!activeRowId) {
						if (selectedRowIds.length > 0) {
							activeRowId = selectedRowIds[0];
						}
					}
					var confirmationMessage = this.get("Resources.Strings.OpenContactCardQuestion");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Contact"
					});
					esq.addColumn("FacebookId");
					esq.addColumn("LinkedInId");
					esq.addColumn("TwitterId");
					var filters = this.Ext.create("Terrasoft.FilterGroup");
					filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Id", activeRowId));
					esq.filters = filters;
					esq.getEntity(activeRowId, function(result) {
						if (result.success && result.entity) {
							var entity = result.entity;
							var facebookId = entity.get("FacebookId");
							var linkedInId = entity.get("LinkedInId");
							var twitterId = entity.get("TwitterId");
							if (facebookId !== "" || linkedInId !== "" || twitterId !== "") {
								this.sandbox.publish("PushHistoryState", {
									hash: "FillContactWithSocialAccountDataModule",
									stateObj: {
										FacebookId: facebookId,
										LinkedInId: linkedInId,
										TwitterId: twitterId,
										ContactId: activeRowId
									}
								});
							} else {
								this.Terrasoft.utils.showConfirmation(confirmationMessage,
									function getSelectedButton(returnCode) {
										if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
											this.editRecord(activeRowId);
											if (!this.get("ActiveRow") && selectedRowIds.length > 0) {
												this.unSetMultiSelect();
											}
										}
									}, ["yes", "no"], this, null);
							}
						}
					}, this);
				},

				/**
				 * ########## ######### ######## ####### # ###### ########### #######.
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ####### # ######.
				 * ########### #######
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Click": {"bindTo": "openShowOnMap"},
						"Caption": {"bindTo": "Resources.Strings.ShowOnMapActionCaption"},
						"Enabled": {"bindTo": "isAnySelected"}
					}));
					return actionMenuItems;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGridContainer",
					"values": {
						"controlConfig": {
							"classes": ["contact-grid"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('ContactSectionV2SocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactSectionV2SocialNetworkIntegration", [],
		function() {
			return {
				entitySchemaName: "Contact",
				methods: {},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		}
)

define('ContactSectionV2OSMResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactSectionV2OSM", ["MapsUtilities", "MapsHelper"],
	function(MapsUtilities, MapsHelper) {
		return {
			entitySchemaName: "Contact",
			methods: {
				/**
				 * ######## "######## ## #####".
				 */
				openShowOnMap: function() {
					MapsHelper.openShowOnMap.call(this, this.entitySchemaName, function(mapsConfig) {
						MapsUtilities.open({
							scope: this,
							mapsConfig: mapsConfig
						});
					});
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});

define('ContactSectionV2ExchangeResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactSectionV2Exchange", ["SyncSettingsMixin"],
	function() {
		return {
			entitySchemaName: "Contact",
			messages: {
				/**
				 * @message ShowSyncSettingsSetTip
				 * Notify to show tip about completed set sync settings.
				 */
				"ShowSyncSettingsSetTip": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				/**
				 * Activity synchronization mixin.
				 */
				"SyncSettinsMixin": "Terrasoft.SyncSettingsMixin"
			},
			attributes: {
				/**
				 * Flag for visibility of the completed synchronization.
				 */
				"IsSyncSettingsSetTipVisible": {dataValueType: Terrasoft.DataValueType.BOOLEAN}
			},
			methods: {

				/**
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initContactSyncSettings();
					this.sandbox.subscribe("ShowSyncSettingsSetTip", this.updateSyncSettingsSetAndShowTip, this);
				},

				/**
				 * ######### ####### ######## ############# ######### # Exchange
				 * # ############# ############### ######## ######.
				 * @protected
				 */
				initContactSyncSettings: function() {
					this.set("IsExchangeContactSyncExist", false);
					var select = this.getBaseContactSyncSettingsSelect();
					select.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
					select.getEntityCollection(function(response) {
						if (response.success) {
							this.set("IsExchangeContactSyncExist", response.collection.getCount() > 0 &&
								response.collection.getItems()[0].get("Count") > 0);
						}
					}, this);
				},

				/**
				 * ############## ######## # Exchange.
				 * @protected
				 */
				synchronizeExchangeContacts: function() {
					var select = this.getBaseContactSyncSettingsSelect();
					select.addColumn("Id");
					select.addColumn("[MailboxSyncSettings:Id:MailboxSyncSettings].SenderEmailAddress",
						"SenderEmailAddress");
					select.getEntityCollection(function(response) {
						if (response.success) {
							if (response.collection.getCount() < 1) {
								return;
							}
							this.createSyncJobs(response.collection);
						} else {
							this.Terrasoft.utils.showInformation(
								this.get("Resources.Strings.ReadSyncSettingsBadResponse")
							);
						}
					}, this);
				},

				/**
				 * ####### # ########## ############ ###### ## ############# ######### # ####### Exchange.
				 * @private
				 * @param {Terrasoft.Collection} collection ######### ########### #########.
				 */
				createSyncJobs: function(collection) {
					var requestsCount = 0;
					var messageArray = [];
					var requestUrl = this.Terrasoft.workspaceBaseUrl +
						"/rest/MailboxSettingsService/CreateContactSyncJob";
					collection.each(function(item) {
						var data = {
							interval: 0,
							senderEmailAddress: item.get("SenderEmailAddress")
						};
						this.showBodyMask();
						requestsCount++;
						this.Terrasoft.AjaxProvider.request({
							url: requestUrl,
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json"
							},
							method: "POST",
							jsonData: data,
							scope: this,
							callback: function(request, success, response) {
								if (success) {
									var responseData = Ext.decode(response.responseText);
									if (!Ext.isEmpty(responseData.CreateContactSyncJobResult)) {
										messageArray = messageArray.concat(responseData.CreateContactSyncJobResult);
									}
								}
								if (--requestsCount <= 0) {
									var message = this.get("Resources.Strings.SynchronizeExchangeSuccessMessage");
									if (messageArray.length > 0) {
										message = "";
										this.Terrasoft.each(messageArray, function(element) {
											message = message.concat(element);
										}, this);
									}
									this.hideBodyMask();
									this.Terrasoft.utils.showInformation(message);
								}
							}
						});
					}, this);
				},

				/**
				 * ########## {Terrasoft.EntitySchemaQuery} # ######### ## ############
				 * # ####### #### ############# #########.
				 * @private
				 */
				getBaseContactSyncSettingsSelect: function() {
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ContactSyncSettings"
					});
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"[MailboxSyncSettings:Id:MailboxSyncSettings].SysAdminUnit",
						this.Terrasoft.SysValue.CURRENT_USER.value));
					var filterGroup = select.createFilterGroup();
					filterGroup.name = "SynContactsFilterGroup";
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filterGroup.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ImportContacts", true));
					filterGroup.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ExportContacts", true));
					select.filters.addItem(filterGroup);
					return select;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSection#getSectionActions
				 * @overridden
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					if (this.get("canUseGoogleOrSocialFeaturesByBuildType")) {
						this.setSyncSectionActions(actionMenuItems);
					}
					return actionMenuItems;
				},

				/**
				 * @inheritdoc Terrasoft.ContactSectionV2#synchronizeNow
				 * @overridden
				 */
				synchronizeNow: function() {
					this.callParent(arguments);
					if (this.get("IsExchangeContactSyncExist")) {
						this.synchronizeExchangeContacts();
					}
				},

				/**
				 * Returns set sync settings section action caption.
				 * @overridden
				 * @return {String} Caption.
				 */
				getSetSyncSettingsCaption: function() {
					return this.get("Resources.Strings.SetUpSynchronization");
				},

				/**
				 * Start synchronization with google account.
				 */
				synchronizeGoogle: function() {
					this.synchronizeWithGoogleContacts();
				},

				/**
				 * Start synchronization with exchange account.
				 */
				synchronizeExchange: function() {
					this.synchronizeExchangeContacts();
				},

				/**
				 * @inheritDoc Terrasoft.SyncSettinsMixin#updateSyncSettingsSetAndShowTip
				 * @overridden
				 */
				updateSyncSettingsSetAndShowTip: function(itemId) {
					if (itemId) {
						this.set("IsExchangeContactSyncExist", true);
					} else {
						this.set("GoogleSyncExists", true);
					}
					this.mixins.SyncSettinsMixin.updateSyncSettingsSetAndShowTip.call(this, itemId);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "SeparateModeActionsButton",
					"values": {
						"tips": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SeparateModeActionsButton",
					"propertyName": "tips",
					"name": "SyncSettingsSetTip",
					"values": {
						"content": {"bindTo": "Resources.Strings.SyncSettingsSetTipCaption"},
						"visible": {"bindTo": "IsSyncSettingsSetTipVisible"},
						"style": Terrasoft.TipStyle.GREEN,
						"linkClicked": {bindTo: "navigateToSyncSettingsWithSyncSettingsUpdate"},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.NONE
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('ContactSectionV2DeduplicationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactSectionV2Deduplication", [], function() {
		return {
			methods: {
				/**
				 * @inheritdoc BaseDataView#setCanSearchDuplicatesAttributes
				 * @override
				 */
				setCanSearchDuplicatesAttributes: function(canSearchDuplicatesOperation) {
					this.callParent(arguments);
					this.set("DeduplicationEnabled", this.getIsDeduplicationEnable());
					const isEnabled = canSearchDuplicatesOperation && this.$DeduplicationEnabled;
					this.set("canSearchDuplicates", this.$canSearchDuplicates || isEnabled);
				}
			}
		};
	}
);

define("ContactSectionV2", ["ContactSectionV2Resources"],
	function(resources) {
		return {
			entitySchemaName: "Contact",
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("UseStaticFolders", true);
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.ContactSectionV2#getSectionActions
				 * @overridden
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator"
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Click": {"bindTo": "setActualEmails"},
						"Caption": {"bindTo": "Resources.Strings.ActualizeActionCaption"},
						"Enabled": {
							"bindTo": "IsGridEmpty",
							"bindConfig": {"converter": function(value) {
								return !value;
							}}
						}
					}));
					return actionMenuItems;
				},

				/**
				 * ##### ######## "##### ####### ############## # Email".
				 */
				setActualEmails: function() {
					var cfg = {
						style: Terrasoft.MessageBoxStyles.BLUE
					};
					this.Terrasoft.showConfirmation(resources.localizableStrings.ActualizeActionMessageCaption,
							function getSelectedButton(returnCode) {
								if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
									var webServiceConfig = {
										serviceName: "ContactService",
										methodName: "SetActualEmails",
										data: {
											filters: this.getSerializedFilters(),
											entitySchemaUId: this.entitySchema.uId
										}
									};
									this.callService(webServiceConfig, Terrasoft.emptyFn);
								}
							}, ["yes", "no"], this, cfg);
				},

				/**
				 * ########## ################# #######, ########### # #######.
				 * @return {String} ################ #######.
				 */
				getSerializedFilters: function() {
					var sectionFilters = this.get("SectionFilters");
					var serializationInfo = sectionFilters.getDefSerializationInfo();
					serializationInfo.serializeFilterManagerInfo = true;
					return sectionFilters.serialize(serializationInfo);
				}
			}
		};
	});


