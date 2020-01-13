Terrasoft.configuration.Structures["ContactCommunicationDetail"] = {innerHierarchyStack: ["ContactCommunicationDetailNUI", "ContactCommunicationDetailFacebookIntegration", "ContactCommunicationDetail"], structureParent: "BaseCommunicationDetail"};
define('ContactCommunicationDetailNUIStructure', ['ContactCommunicationDetailNUIResources'], function(resources) {return {schemaUId:'244c946e-cd0c-4452-9858-bba3c04858d1',schemaCaption: "Contact communication options (old version)", parentSchemaName: "BaseCommunicationDetail", schemaName:'ContactCommunicationDetailNUI',parentSchemaUId:'ea5d6815-6645-4962-bde0-440932d31441',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactCommunicationDetailFacebookIntegrationStructure', ['ContactCommunicationDetailFacebookIntegrationResources'], function(resources) {return {schemaUId:'53a491ef-e1fd-425f-910d-700dcb5483b0',schemaCaption: "Contact communication options (old version)", parentSchemaName: "ContactCommunicationDetailNUI", schemaName:'ContactCommunicationDetailFacebookIntegration',parentSchemaUId:'244c946e-cd0c-4452-9858-bba3c04858d1',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactCommunicationDetailNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactCommunicationDetailStructure', ['ContactCommunicationDetailResources'], function(resources) {return {schemaUId:'168e38a1-3120-4ebe-9704-9019f3e25a6f',schemaCaption: "Contact communication options (old version)", parentSchemaName: "ContactCommunicationDetailFacebookIntegration", schemaName:'ContactCommunicationDetail',parentSchemaUId:'53a491ef-e1fd-425f-910d-700dcb5483b0',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContactCommunicationDetailFacebookIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContactCommunicationDetailNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactCommunicationDetailNUI", ["ViewUtilities", "Contact",
		"ConfigurationEnums", "ConfigurationConstants"],
	function(ViewUtilities, Contact, ConfigurationEnums, ConfigurationConstants) {
		return {
			entitySchemaName: "ContactCommunication",
			messages: {
				/**
				 * @message ReloadCard
				 * Notify about the card is reload.
				 */
				"ReloadCard": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * ######### ######### #### "###### ## #############"
				 */
				RestrictionsMenuItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######### ######## ## #############
				 */
				RestrictionsCollection: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * Primary tag column name.
				 */
				"PrimaryTagColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "IsCreatedBySynchronization"
				}

			},
			methods: {
				/**
				 * ####### ######## ##### LinkedIn ## ####### ####.
				 * @param esq ###### ####### #####.
				 */
				initCommunicationTypesFilters: function(esq) {
					this.callParent(arguments);
					var columns = Contact.columns;
					if (columns !== null) {
						if (columns.LinkedIn.usageType === ConfigurationEnums.EntitySchemaColumnUsageType.None) {
							var linkedInFilter = Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.NOT_EQUAL, "Id", ConfigurationConstants.CommunicationTypes.LinkedIn);
							esq.filters.addItem(linkedInFilter);
						}
					}
				},

				/**
				 * ######### ######### #### ###### ###### "########" ########## #### "###### ## #############".
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} ######### ####### ####.
				 */
				getToolsMenuItems: function() {
					var menuItems = this.callParent(arguments);
					var restrictionsItem = this.getRestrictionsMenuItem();
					menuItems.addItem(restrictionsItem);
					return menuItems;
				},

				/**
				 * ########## ##### #### #### "###### ## #########".
				 * @protected
				 * @return {Terrasoft.BaseViewModel} ###### ############# ###### ####.
				 */
				getRestrictionsMenuItem: function() {
					var restrictionsMenuItems = Ext.create("Terrasoft.BaseViewModelCollection");
					var restrictionsItem = Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Caption: this.get("Resources.Strings.DoNotUseCommunicationCaption"),
							Id: Terrasoft.generateGUID(),
							Items: restrictionsMenuItems
						}
					});
					var restrictions = this.getRestrictions();
					Terrasoft.each(restrictions, function(restrictionConfig, restrictionName) {
						var restrictionMenuItem = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Id: Terrasoft.generateGUID(),
								Caption: restrictionConfig.Caption,
								Tag: restrictionName,
								Click: { bindTo: "doNotUseCommunication" }
							}
						});
						restrictionsMenuItems.addItem(restrictionMenuItem);
					}, this);
					return restrictionsItem;
				},

				/**
				 * ########## ####### ## #############.
				 * @protected
				 * @return {Object} ######, ####### ######## ######## ######## ## #############.
				 */
				getRestrictions: function() {
					return {
						"DoNotUseEmail": {
							"RestrictCaption": this.get("Resources.Strings.DoNotUseEmail"),
							"Caption": this.get("Resources.Strings.DoNotUseEmailCaption")
						},
						"DoNotUseCall": {
							"RestrictCaption": this.get("Resources.Strings.DoNotUseCall"),
							"Caption": this.get("Resources.Strings.DoNotUseCallCaption")
						},
						"DoNotUseSms": {
							"RestrictCaption": this.get("Resources.Strings.DoNotUseSms"),
							"Caption": this.get("Resources.Strings.DoNotUseSmsCaption")
						},
						"DoNotUseFax": {
							"RestrictCaption": this.get("Resources.Strings.DoNotUseFax"),
							"Caption": this.get("Resources.Strings.DoNotUseFaxCaption")
						},
						"DoNotUseMail": {
							"RestrictCaption": this.get("Resources.Strings.DoNotUseMail"),
							"Caption": this.get("Resources.Strings.DoNotUseMailCaption")
						}
					};
				},

				/**
				 * ########## ####### ####### #### ######## ## ############# ####### #####.
				 * @protected
				 * @param {String} tag ############# ####### ## #############.
				 */
				doNotUseCommunication: function(tag) {
					if (this.get("IsDetailCollapsed")) {
						return;
					}
					var restrictions = this.getRestrictions();
					var collection = this.get("RestrictionsCollection");
					if (!collection.contains(tag)) {
						collection.add(tag, this.getRestrictionsCollectionItem(tag, restrictions[tag].RestrictCaption));
						this.changeCardPageButtonsVisibility(true);
					}
				},

				/**
				 * ########## ############ ############# ######## "###### ## #############"
				 * @protected
				 * @param {Object} itemConfig ###### ## ############ ######## # ContainerList.
				 * @param {Terrasoft.BaseViewModel} item #######, ### ######## ###### ########## ########## view.
				 */
				getRestrictionsItemConfig: function(itemConfig, item) {
					//todo: lazy init
					var config = ViewUtilities.getContainerConfig(
						"restrictions-container", ["restrictions-container-class", "control-width-15"]);
					itemConfig.config = config;
					var checkBoxLabelConfig = {
						className: "Terrasoft.Label",
						caption: {bindTo: "Name"},
						classes: {labelClass: ["detail-label-user-class"]},
						inputId: item.get("Id") + "-el"
					};
					var checkBoxEditConfig = {
						className: "Terrasoft.CheckBoxEdit",
						id: item.get("Id"),
						checked: {bindTo: "Value"}
					};
					config.items.push(checkBoxLabelConfig, checkBoxEditConfig);
				},

				/**
				 * ########## ####### ######### "###### ## #############".
				 * @protected
				 * @param {String} id ############# ####### ## #############.
				 * @param {String} name ### ####### ## #############.
				 * @return {Terrasoft.BaseViewModel} ###### ############# ########## ########.
				 */
				getRestrictionsCollectionItem: function(id, name) {
					var collectionItem = Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Name: name,
							Id: id,
							Value: true
						}
					});
					collectionItem.sandbox = this.sandbox;
					collectionItem.setSaveDiscardButtonsVisible = this.setSaveDiscardButtonsVisible;
					return collectionItem;
				},

				/**
				 * Loads restrictions collection.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Terrasoft.BaseSchemaViewModel} scope Context.
				 */
				getEntityRestrictions: function(callback, scope) {
					if (this.get("IsDetailCollapsed") || this.isEmpty(this.get("MasterRecordId"))) {
						this.Ext.callback(callback, scope);
						return;
					}
					var restrictions = ["DoNotUseEmail", "DoNotUseCall", "DoNotUseSms", "DoNotUseFax", "DoNotUseMail"];
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Contact"});
					this.Terrasoft.each(restrictions, function(item) {
						select.addColumn(item);
					});
					select.getEntity(this.get("MasterRecordId"), function(response) {
						if (!response.success) {
							return;
						}
						if (response.entity) {
							var entity = response.entity;
							var collection = this.get("RestrictionsCollection");
							collection.clear();
							var newItemsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
							this.Terrasoft.each(restrictions, function(restrictionName) {
								if (entity.get(restrictionName)) {
									var restrictionCaption = this.get("Resources.Strings." + restrictionName);
									var restrictionsCollectionItem =
										this.getRestrictionsCollectionItem(restrictionName, restrictionCaption);
									newItemsCollection.add(restrictionName, restrictionsCollectionItem);
								}
							}, this);
							collection.loadAll(newItemsCollection);
						}
						this.set("IsDataLoaded", true);
						callback.call(scope);
					}, this);
				},

				/**
				 * ########## ######### ####### ## #############.
				 * @protected
				 */
				onRestrictionItemChanged: function() {
					if (this.get("IsDataLoaded")) {
						this.setSaveDiscardButtonsVisible(true);
					}
				},

				/**
				 * ########## ######## ######## ## #############.
				 * @overridden
				 * @param {Function} callback ####### ######### ######.
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## ####### ######### ######.
				 */
				loadContainerListData: function(callback, scope) {
					this.callParent([function() {
						this.set("IsDataLoaded", false);
						this.getEntityRestrictions(callback, scope);
					}, this]);
				},

				/**
				 * ############## ######### ######## ## #############.
				 * @overridden
				 */
				initCollections: function() {
					this.callParent(arguments);
					this.set("RestrictionsCollection", Ext.create("Terrasoft.BaseViewModelCollection"));
					var collection = this.get("RestrictionsCollection");
					collection.on("itemChanged", this.onRestrictionItemChanged, this);
				},

				/**
				 * ########## ###### ## ########## ######## ## #############.
				 * @protected
				 * @return {Terrasoft.UpdateQuery} ###### ## ########## ######## ## #############.
				 */
				getSaveRestrictionsQuery: function() {
					var collection = this.get("RestrictionsCollection");
					if (collection.isEmpty()) {
						return null;
					}
					var update = Ext.create("Terrasoft.UpdateQuery", { rootSchemaName: "Contact" });
					update.enablePrimaryColumnFilter(this.get("MasterRecordId"));
					collection.each(function(item) {
						update.setParameterValue(item.get("Id"), item.get("Value"), Terrasoft.DataValueType.BOOLEAN);
					}, this);
					return update;
				},

				/**
				 * ######### ######### ######. ########### ### ####### ## ###### ######### ########, ####### ########
				 * ######.
				 * @overridden
				 */
				save: function() {
					var restrictionsQuery = this.getSaveRestrictionsQuery();
					var queries = restrictionsQuery ? [restrictionsQuery] : [];
					var saveQueries = this.getSaveItemsQueries();
					queries = queries.concat(saveQueries);
					var deleteQueries = this.getDeleteItemsQueries();
					queries = queries.concat(deleteQueries);
					if (Ext.isEmpty(queries)) {
						this.publishSaveResponse({
							success: true
						});
						return true;
					}
					var batchQuery = Ext.create("Terrasoft.BatchQuery");
					Terrasoft.each(queries, function(query) {
						batchQuery.add(query);
					}, this);
					batchQuery.execute(this.onSaved, this);
					return true;
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationDetail#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					this.sandbox.publish("ReloadCard", null, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationDetail#initMasterDetailColumnMapping
				 * @overridden
				 */
				initMasterDetailColumnMapping: function() {
					this.set("MasterDetailColumnMapping", [
						{
							"CommunicationType": ConfigurationConstants.CommunicationTypes.Email,
							"MasterEntityColumn": "Email"
						},
						{
							"CommunicationType": ConfigurationConstants.CommunicationTypes.Phone,
							"MasterEntityColumn": "Phone"
						},
						{
							"CommunicationType": ConfigurationConstants.CommunicationTypes.MobilePhone,
							"MasterEntityColumn": "MobilePhone"
						},
						{
							"CommunicationType": ConfigurationConstants.CommunicationTypes.HomePhone,
							"MasterEntityColumn": "HomePhone"
						},
						{
							"CommunicationType": ConfigurationConstants.CommunicationTypes.Skype,
							"MasterEntityColumn": "Skype"
						}
					]);
				}
			},

			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "RestrictionsContainer",
					"parentName": "Detail",
					"propertyName": "items",
					"values":
					{
						generator: "ConfigurationItemGenerator.generateContainerList",
						idProperty: "Id",
						collection: "RestrictionsCollection",
						observableRowNumber: 10,
						onGetItemConfig: "getRestrictionsItemConfig"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('ContactCommunicationDetailFacebookIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContactCommunicationDetailFacebookIntegration", [], function() {
		return {
			attributes: {
				/**
				 * ####### ########### ######### #### Facebook # #### ########## ####.
				 */
				FacebookMenuItemEnabled: {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},

			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseCommunicationDetail#updateFacebookProfileInfo
				 * @overridden
				 */
				updateFacebookProfileInfo: function() {
					this.callParent(arguments);
					var facebookProfileExists = this.get("FacebookProfileExists");
					this.set("FacebookMenuItemEnabled", !facebookProfileExists);
				},

				/**
				 * @inheritdoc Terrasoft.BaseCommunicationDetail#modifyFacebookMenuItem
				 * @overridden
				 */
				modifyFacebookMenuItem: function(facebookMenuItem) {
					this.callParent(arguments);
					facebookMenuItem.set("Enabled", {
						bindTo: "FacebookMenuItemEnabled"
					});
				}
			}
		}
	});

define("ContactCommunicationDetail", ["ContactCommunicationDetailResources", "terrasoft", "ViewUtilities",
		"ConfigurationConstants", "ServiceHelper", "MarketingEnums", "CheckedCommunicationViewModel"
		],
		function(resources, Terrasoft, ViewUtilities, ConfigurationConstants, ServiceHelper, MarketingEnums) {
			return {
				methods: {

					/**
					 * ############## ######.
					 * @inheritdoc Terrasoft.BaseCommunicationDetail#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.set("BaseCommunicationViewModelClassName", "Terrasoft.CheckedCommunicationViewModel");
					},

					/**
					 * ######### ############ ############# ######## ######## #####.
					 * @protected
					 * @overridden
					 * @param {Object} itemConfig ###### ## ############ ######## # ContainerList.
					 * @param {Terrasoft.BaseViewModel} item ####### ### ######## ###### ########## ########## view
					 */
					getItemViewConfig: function(itemConfig, item) {
						this.callParent(arguments);
						if (this.Ext.isEmpty(item.nonActualChanged)) {
							item.nonActualChanged = function(checked) {
								this.set("NonActual", !checked);
							};
							var nonActualCaption = resources.localizableStrings.NonActualCaption;
							item.getCommunicationTypeCaption = function() {
								var communicationType = this.get("CommunicationType");
								return (this.get("NonActual") === true)
										? Ext.String.format("{0} {1}", communicationType.displayValue,
										nonActualCaption)
										: communicationType.displayValue;
							};
						}
						var itemViewConfig = this.get("itemViewConfig");
						var config = itemConfig.config;
						config.items.forEach(function(configItem) {
							if (configItem.selectors &&
									configItem.selectors.wrapEl === "#type") {
								var nonActualMenuItem = null;
								var menu = configItem.menu;
								menu.items.forEach(function(menuItem) {
									if (menuItem.tag === "NonActual") {
										nonActualMenuItem = menuItem;
										return false;
									}
								}, this);
								var nonActual = item.get("NonActual");
								if (!nonActualMenuItem) {
									var separatorMenuItem = {
										className: "Terrasoft.MenuSeparator",
										caption: ""
									};
									nonActualMenuItem = {
										id: item.get("Id"),
										caption: resources.localizableStrings.TopicalAddressCaptionMenu,
										className: Terrasoft.MenuItemType.CHECK,
										checked: !nonActual,
										checkedChanged: {bindTo: "nonActualChanged"},
										tag: "NonActual"
									};
									if (!this.Ext.isEmpty(item.nonActualChanged)) {
										menu.items.splice(0, 0, nonActualMenuItem);
										menu.items.splice(1, 0, separatorMenuItem);
										configItem.caption = {bindTo: "getCommunicationTypeCaption"};
									}
								} else {
									nonActualMenuItem.checked = !nonActual;
								}
							} else if (configItem.className === "Terrasoft.TextEdit" && !itemViewConfig) {
								configItem.markerValue = {bindTo: "getCommunicationTypeCaption"};
							}
						}, this);

					},

					/**
					 * ############## ####### ########## #######.
					 * @protected
					 * @param {Object} esq ######, # ####### ##### ################### #######.
					 */
					initQueryColumns: function(esq) {
						this.callParent(arguments);
						esq.addColumn("NonActual");
						esq.addColumn("NonActualReason");
					},
					/**
					 * ######### ######### ######. ########### ### ####### ## ###### ######### ########, #######
					 * ######## ######.
					 * @overridden
					 */
					save: function() {
						var collection = this.get("Collection");
						var now = new Date();
						collection.each(function(item) {
							if (this.isActualStatusChangetTo(item, true)) {
								item.set("NonActualReason", {value: MarketingEnums.NonActualReason.FILLED_MANUALLY});
								item.set("DateSetNonActual", now);
							}
						}, this);
						return this.callParent(arguments);
					},

					/**
					 * ######### ### ## ####### ####### "## ##########" ## ######## ############### value.
					 * @protected
					 * @param {Object} item Entity ######## #####.
					 * @param {Boolean} value ######## ### ######## ## ######## "## ##########".
					 * @return {Boolean} ###### true, #### ### email # ######### ########## ############ # ### ##
					 * ##### ######, ##### false.
					 */
					isActualStatusChangetTo: function(item, value) {
						return (!item.isNew &&
								item.validate() &&
								item.changedValues &&
								item.changedValues.hasOwnProperty("NonActual") &&
								item.changedValues.NonActual === value);
					}
				}
			};
		});


