Terrasoft.configuration.Structures["BaseCommunicationDetail"] = {innerHierarchyStack: ["BaseCommunicationDetailNUI", "BaseCommunicationDetailSocialNetworkIntegration", "BaseCommunicationDetailTwitterIntegration", "BaseCommunicationDetailFacebookIntegration", "BaseCommunicationDetail"], structureParent: "BaseDetailV2"};
define('BaseCommunicationDetailNUIStructure', ['BaseCommunicationDetailNUIResources'], function(resources) {return {schemaUId:'ea5d6815-6645-4962-bde0-440932d31441',schemaCaption: "Base detail schema - Communication options", parentSchemaName: "BaseDetailV2", schemaName:'BaseCommunicationDetailNUI',parentSchemaUId:'3052ff9d-521d-4a6d-ba92-04a2261e1ea8',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseCommunicationDetailSocialNetworkIntegrationStructure', ['BaseCommunicationDetailSocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'920b02ba-dd4a-477f-8af0-8a45425ddc76',schemaCaption: "Base detail schema - Communication options", parentSchemaName: "BaseCommunicationDetailNUI", schemaName:'BaseCommunicationDetailSocialNetworkIntegration',parentSchemaUId:'ea5d6815-6645-4962-bde0-440932d31441',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseCommunicationDetailNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseCommunicationDetailTwitterIntegrationStructure', ['BaseCommunicationDetailTwitterIntegrationResources'], function(resources) {return {schemaUId:'62df62b0-0f4e-4a31-8f58-5570a52dc509',schemaCaption: "Base detail schema - Communication options", parentSchemaName: "BaseCommunicationDetailSocialNetworkIntegration", schemaName:'BaseCommunicationDetailTwitterIntegration',parentSchemaUId:'920b02ba-dd4a-477f-8af0-8a45425ddc76',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseCommunicationDetailSocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseCommunicationDetailFacebookIntegrationStructure', ['BaseCommunicationDetailFacebookIntegrationResources'], function(resources) {return {schemaUId:'ab42a082-040d-4935-a695-42b27866f281',schemaCaption: "Base detail schema - Communication options", parentSchemaName: "BaseCommunicationDetailTwitterIntegration", schemaName:'BaseCommunicationDetailFacebookIntegration',parentSchemaUId:'62df62b0-0f4e-4a31-8f58-5570a52dc509',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseCommunicationDetailTwitterIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseCommunicationDetailStructure', ['BaseCommunicationDetailResources'], function(resources) {return {schemaUId:'0f26788d-e718-4db6-9355-8f17a94725b2',schemaCaption: "Base detail schema - Communication options", parentSchemaName: "BaseCommunicationDetailFacebookIntegration", schemaName:'BaseCommunicationDetail',parentSchemaUId:'ab42a082-040d-4935-a695-42b27866f281',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseCommunicationDetailFacebookIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseCommunicationDetailNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseCommunicationDetailNUI", ["BaseCommunicationDetailResources", "terrasoft", "ViewUtilities",
	"ConfigurationConstants", "CommunicationUtils", "LookupUtilities", "BaseCommunicationViewModel",
	"ConfigurationItemGenerator", "BaseDetailV2", "EmailLinksMixin"],
	function(resources, Terrasoft, ViewUtilities, ConfigurationConstants, CommunicationUtils) {
		return {
			attributes: {
				/**
				 * ######### ######### #### ###### "########".
				 */
				ToolsMenuItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######### ######### #### ###### "########".
				 */
				PhonesMenuItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######### ###. ##### #### ###### "########".
				 */
				SocialNetworksMenuItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######### ######### ####, ####### ######## #### ######## #####.
				 */
				MenuItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ####### "###### #########".
				 */
				IsDataLoaded: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

				/**
				 * ######### ####### ##### ## ########.
				 */
				DeletedItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ######## ##### ####### #####.
				 */
				"CommunicationTypes": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * ######## ###### ###### #############.
				 */
				"BaseCommunicationViewModelClassName": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				},

				/**
				 * Whether to focus new item.
				 */
				"IsNewItemFocused": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Master detail column mapping.
				 * @type {Object[]}
				 * Example:
				 * MasterDetailColumnMapping: [
				 *		{
				 *			CommunicationType: ConfigurationConstants.CommunicationTypes.Email,
				 *			MasterEntityColumn: "Email"
				 *		}
				 *	]
				 */
				"MasterDetailColumnMapping": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					value: []
				},
				/**
				 * Primary tag column name.
				 */
				"PrimaryTagColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "Primary"
				}
			},
			messages: {
				/**
				 * @message ResultSelectedRows
				 * ########## ######### ###### # ###########.
				 */
				"ResultSelectedRows": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateCardProperty
				 * ############# ######## ######## ##############.
				 */
				"UpdateCardProperty": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SetInitialisationData
				 * ############# ########### ######### ###### # ########## #####.
				 */
				"SetInitialisationData": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ValidateDetail
				 * ########## ############# ############### ######## ######.
				 */
				"ValidateDetail": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DetailValidated
				 * ########## ######### ######### ######.
				 */
				"DetailValidated": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SaveDetail
				 * ########## ########## ######.
				 */
				"SaveDetail": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DetailValidated
				 * ########## ######### ##########.
				 */
				"DetailSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message DiscardChanges
				 * Occurs when changes in the target object were canceled. Is used to update data items.
				 */
				"DiscardChanges": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetCommunicationsList
				 * Returns communications list.
				 */
				"GetCommunicationsList": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SyncCommunication
				 * Synchronizes communications.
				 */
				"SyncCommunication": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetCommunicationsSynchronizedByDetail
				 * Returns communications synchronized by detail.
				 */
				"GetCommunicationsSynchronizedByDetail": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				emailLinksMixin: "Terrasoft.EmailLinksMixin"
			},
			methods: {

				/**
				 * Returns sub menu caption by communication value.
				 * @private
				 * @param {String} communicationValue Communication value.
				 * @return {String} Sub menu caption.
				 */
				_getSubMenuCaption: function(communicationValue) {
					if (this.isPhoneType(communicationValue)) {
						return this.get("Resources.Strings.PhoneMenuItem");
					}
					if (this.isSocialNetworkType(communicationValue)) {
						return this.get("Resources.Strings.SocialNetworksMenuItem");
					}
					var communicationTypes = this.get("CommunicationTypes");
					var communicationTypeByCommunication = communicationTypes &&
						communicationTypes.findByFn(function(type) {
							var communication = type && type.get("CommunicationId");
							return (communication && communication.value) === communicationValue;
						}, this);
					var foundCommunication = communicationTypeByCommunication &&
						communicationTypeByCommunication.get("CommunicationId");
					return foundCommunication && foundCommunication.displayValue || "";
				},

				/**
				 * Adds sub menu by communication to main menu.
				 * @private
				 * @param {Object} typeGroup Grouped communication types.
				 * @param {String} communicationValue Communication value.
				 * @param {Terrasoft.BaseViewModelCollection} mainMenuItems Main menu items.
				 */
				_addGroupedMenuItems: function(typeGroup, communicationValue, mainMenuItems) {
					var subMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var subMenuCaption = this._getSubMenuCaption(communicationValue);
					Terrasoft.each(typeGroup, function(type) {
						var menuItem = this.getButtonMenuItem(type);
						if (this.isPhoneType(communicationValue)) {
							this.addPhoneMenuItem(subMenuItems, menuItem);
							return;
						}
						if (this.isSocialNetworkType(communicationValue)) {
							this.addSocialNetworkMenuItem(subMenuItems, menuItem);
							return;
						}
						subMenuItems.addItem(menuItem);
					}, this);
					var subMenuItem = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Caption: subMenuCaption,
							Id: this.Terrasoft.generateGUID(),
							Items: subMenuItems,
							MarkerValue: subMenuCaption
						}
					});
					this.addSubMenuItem(mainMenuItems, subMenuItem);
				},

				/**
				 * Returns "Add" button menu items.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.BaseViewModelCollection} "Add" button menu items.
				 */
				getToolsMenuItems: function() {
					var mainMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var communicationTypes = this.get("CommunicationTypes");
					var groupedTypes = Terrasoft.groupBy(communicationTypes.getItems(), function(item) {
						var communication = item.get("CommunicationId");
						return communication && communication.value || this.Terrasoft.generateGUID();
					}, this);
					Terrasoft.each(groupedTypes, function(typeGroup, communicationValue) {
						if (typeGroup.length > 1) {
							this._addGroupedMenuItems(typeGroup, communicationValue, mainMenuItems);
						} else {
							mainMenuItems.add(this.Terrasoft.generateGUID(), this.getButtonMenuItem(typeGroup[0]), 0);
						}
					}, this);
					return mainMenuItems;
				},

				/**
				 * ######### # ######### ####### #### ##### # #######.
				 * @private
				 * @param {Object} menuItems ######### ####### ####.
				 * @param {Object} subMenuItem ##### # #######.
				 */
				addSubMenuItem: function(menuItems, subMenuItem) {
					if (!subMenuItem) {
						return;
					}
					var subMenuItems = subMenuItem.get("Items");
					if (subMenuItems.isEmpty()) {
						return;
					}
					menuItems.addItem(subMenuItem);
				},

				/**
				 * ######### # ######### ####### #### ##### # ####### ########## ##### #########.
				 * @protected
				 * @virtual
				 * @param {Object} menuItems ######### ####### ####.
				 * @param {Object} phonesMenuItem ##### # ####### ########## ##### #########.
				 */
				addPhonesMenuItem: function(menuItems, phonesMenuItem) {
					this.addSubMenuItem(menuItems, phonesMenuItem);
				},

				/**
				 * ######### # ######### ####### #### ##### # ####### ########## ##### ########## #####.
				 * @protected
				 * @virtual
				 * @param {Object} menuItems ######### ####### ####.
				 * @param {Object} socialNetworksMenuItem ##### # ####### ########## ##### ########## #####.
				 */
				addSocialNetworksMenuItem: function(menuItems, socialNetworksMenuItem) {
					this.addSubMenuItem(menuItems, socialNetworksMenuItem);
				},

				/**
				 * ######### ######## ## ### ######## ##### ##### ## ##### #######.
				 * @private
				 * @param {String} communicationType ######## #### ########.
				 * @return {Boolean} ########## ####### ########### #### ######## #####.
				 */
				isPhoneType: function(communicationType) {
					communicationType = communicationType.value || communicationType;
					return (communicationType === ConfigurationConstants.Communication.Phone);
				},

				/**
				 * ######### ######## ## ### ######## ##### ##### ## ##### ###. #####.
				 * @private
				 * @param {String} communicationType ######## #### ########.
				 * @return {Boolean} ########## ####### ########### #### ######## #####.
				 */
				isSocialNetworkType: function(communicationType) {
					communicationType = communicationType.value || communicationType;
					return (communicationType === ConfigurationConstants.Communication.SocialNetwork);
				},

				/**
				 * ######### ##### # ####### ########.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModelCollection} phonesMenuItems ######### ####### ### ####### ########.
				 * @param {Terrasoft.BaseViewModel} menuItem ##### #######.
				 */
				addPhoneMenuItem: function(phonesMenuItems, menuItem) {
					phonesMenuItems.addItem(menuItem);
				},

				/**
				 * ######### ##### # ####### ########## ####.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModelCollection} socialNetworksMenuItems ######### ####### ### ####### ########## ####.
				 * @param {Terrasoft.BaseViewModel} menuItem ##### #######.
				 */
				addSocialNetworkMenuItem: function(socialNetworksMenuItems, menuItem) {
					socialNetworksMenuItems.addItem(menuItem);
				},

				/**
				 * ########## ##### #### ### ###### ###### "########" ## ######### ########### #### ######## #####.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} item ####### ######### ##### ####### #####.
				 * @return {Terrasoft.BaseViewModel} ###### ############# ###### ####.
				 */
				getButtonMenuItem: function(item) {
					var name = item.get("Name");
					var value = item.get("Id");
					return Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: value,
							Caption: name,
							MarkerValue: name,
							Tag: value,
							Click: {bindTo: "addItem"}
						}
					});
				},

				/**
				 * Gets the view configuration of the communication element.
				 * @protected
				 * @virtual
				 * @param {Object} itemConfig Link to the configuration of the item in the Container List.
				 * @param {Terrasoft.BaseViewModel} viewModelItem View model of the item.
				 */
				getItemViewConfig: function(itemConfig, viewModelItem) {
					var communicationType = viewModelItem.get("CommunicationType");
					var itemConfigProperty = Ext.String.format("{0}-{1}",
							"itemViewConfig", communicationType && communicationType.value);
					var itemViewConfig = this.get(itemConfigProperty);
					if (itemViewConfig) {
						itemConfig.config = itemViewConfig;
						return;
					}
					var config = this.getCommunicationItemViewConfig(viewModelItem);
					itemConfig.config = config;
					this.set(itemConfigProperty, config);
				},

				/**
				 * Gets view configuration of the communication element.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModel} viewModelItem View model of the item.
				 * @return {Object} Configuration of the presentation of the element of the communication facility.
				 */
				getCommunicationItemViewConfig: function(viewModelItem) {
					var itemViewConfig = ViewUtilities.getContainerConfig("item-view",
							["detail-edit-container-user-class", "control-width-15"]);
					var typeMenuItems = this.getTypeMenuItems();
					var typeButtonConfig = this.getTypeButtonConfig(typeMenuItems);
					var iconTypeButtonConfig = this.getIconTypeButtonConfig();
					var editConfig = this._getCommunicationEditItemViewConfig(viewModelItem);
					itemViewConfig.items.push(typeButtonConfig, editConfig, iconTypeButtonConfig);
					itemViewConfig.markerValue = itemViewConfig.markerValue || {
						bindTo: "Number",
						bindConfig: {
							converter: function(value) {
								return Ext.isDefined(value) ? value : "Empty value";
							}
						}
					};
					return itemViewConfig;
				},

				/**
				 * Gets communication edit item view config.
				 * @private
				 * @param {Terrasoft.BaseViewModel} viewModelItem View model of the item.
				 * @return {Object} Communication edit item view config.
				 */
				_getCommunicationEditItemViewConfig: function(viewModelItem) {
					var communicationType = viewModelItem.get("CommunicationType");
					var communicationValue = communicationType && communicationType.communicationValue;
					var textEditConfig = this.getTextEditConfig();
					var phoneEditConfig = this.getPhoneEditConfig();
					return CommunicationUtils.isPhoneType(communicationType, null, communicationValue) ?
						phoneEditConfig : textEditConfig;
				},

				/**
				 * ########## ###### #### ### ###### ###### #### ######## #####.
				 * @protected
				 * @return {Array} ###### #### ### ###### ###### #### ######## #####.
				 */
				getTypeMenuItems: function() {
					var typeMenuItems = [];
					var communicationTypes = this.get("CommunicationTypes");
					communicationTypes.each(function(communicationType) {
						this.addMenuItem(typeMenuItems, communicationType);
					}, this);
					typeMenuItems.push({
						className: "Terrasoft.MenuSeparator"
					});
					this.addDeleteMenuItem(typeMenuItems);
					return typeMenuItems;
				},

				/**
				 * ######### ##### ### #### ######## ##### # #### ###### ###### #### ######## #####.
				 * @protected
				 * @param {Array} typeMenuItems ###### #### ### ###### ###### #### ######## #####.
				 * @param {Object} communicationType ### ######## #####.
				 */
				addMenuItem: function(typeMenuItems, communicationType) {
					var name = communicationType.get("Name");
					var value = communicationType.get("Id");
					typeMenuItems.push({
						caption: name,
						tag: value,
						click: {bindTo: "typeChanged"},
						visible: {
							bindTo: "getMenuItemVisibility"
						}
					});
				},

				/**
				 * ######### ##### "#######" # #### ### ###### ###### #### ######## #####.
				 * @protected
				 * @param {Array} typeMenuItems ###### #### ### ###### ###### #### ######## #####.
				 */
				addDeleteMenuItem: function(typeMenuItems) {
					typeMenuItems.push({
						caption: this.get("Resources.Strings.DeleteMenuItemCaption"),
						imageConfig: this.get("Resources.Images.DeleteIcon"),
						tag: "delete",
						click: {bindTo: "deleteItem"}
					});
				},

				/**
				 * ########## ############ ###### ###### #### ######## #####.
				 * @protected
				 * @param {Array} typeMenuItems ###### #### ### ###### ###### #### ######## #####.
				 * @return {Object} ############ ###### ###### #### ######## #####.
				 */
				getTypeButtonConfig: function(typeMenuItems) {
					var typeButtonConfig = {
						className: "Terrasoft.Button",
						classes: {
							wrapperClass: ["label-wrap", "detail-type-btn-user-class"],
							textClass: ["detail-type-btn-inner-user-class"]
						},
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						selectors: {wrapEl: "#type"},
						caption: {
							bindTo: "CommunicationType",
							bindConfig: {converter: "getTypeButtonCaption"}
						},
						menu: {items: typeMenuItems},
						markerValue: {
							bindTo: "getTypeButtonMarkerValue"
						}
					};
					return typeButtonConfig;
				},

				/**
				 * ########## ############ ###### ######## #####.
				 * @protected
				 * @return {Object} ############ ###### ######## #####.
				 */
				getIconTypeButtonConfig: function() {
					var iconTypeButtonConfig = {
						className: "Terrasoft.Button",
						classes: {
							wrapperClass: "detail-icon-type-btn-user-class"
						},
						imageConfig: {
							bindTo: "getTypeImageConfig"
						},
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						selectors: {wrapEl: "#iconType"},
						click: {
							bindTo: "onTypeIconButtonClick"
						},
						visible: {
							bindTo: "getTypeIconButtonVisibility"
						},
						hint: {
							bindTo: "getTypeIconButtonHintText"
						},
						markerValue: {
							bindTo: "getIconTypeButtonMarkerValue"
						}
					};
					return iconTypeButtonConfig;
				},

				/**
				 * ########## ############ #### ### ##### ######## #####.
				 * @protected
				 * @return {Object} ############ #### ### ##### ######## #####.
				 */
				getTextEditConfig: function() {
					var editConfig = {
						className: "Terrasoft.TextEdit",
						classes: {wrapClass: ["communication-lookup-img-user-class", "detail-edit-user-class"]},
						value: {
							bindTo: "Number",
							bindConfig: {converter: "updateLinkUrl"}
						},
						showValueAsLink: true,
						href: {bindTo: "Link"},
						linkclick: {bindTo: "onLinkClick"},
						hasClearIcon: true,
						enabled: {bindTo: "getCommunicationEnabled"},
						enableRightIcon: {bindTo: "getRightIconEnabled"},
						rightIconClick: {bindTo: "onLookUpClick"},
						markerValue: {
							bindTo: "CommunicationType",
							bindConfig: {converter: "getTypeButtonCaption"}
						},
						focused: {bindTo: "Focused"}
					};
					return editConfig;
				},

				/**
				 * Gets config of the phone edit view.
				 * @protected
				 * @return {Object} Config of the phone edit view.
				 */
				getPhoneEditConfig: function() {
					var config = this.getTextEditConfig();
					config.className = "Terrasoft.PhoneEdit";
					return config;
				},

				/**
				 * ############## ####### ####### ####### #####.
				 * @protected
				 * @virtual
				 * @param {Object} esq ###### ###### # ######### #####, # ####### ########### ######.
				 */
				initCommunicationTypesFilters: function(esq) {
					var detailColumnName = this.get("DetailColumnName");
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"Usefor" + detailColumnName + "s",
						true));
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.NOT_EQUAL,
						"[ComTypebyCommunication:CommunicationType:Id].Communication",
						ConfigurationConstants.Communication.SMS));
					esq.cacheLevel = this.getCommunicationTypesRequestCacheLevel();
					esq.cacheKey = this.getCommunicationTypesRequestCacheKey();
				},

				/**
				 * Returns cache level for communication type request.
				 * @protected
				 * @virtual
				 * @returns {String} Cache level for communication type request.
				 */
				getCommunicationTypesRequestCacheLevel: function() {
					return "ClientPageSessionCache";
				},

				/**
				 * Returns cache key for communication type request.
				 * @protected
				 * @virtual
				 * @returns {String} Cache key for communication type request.
				 */
				getCommunicationTypesRequestCacheKey: function() {
					var detailColumnName = this.get("DetailColumnName");
					return this.Ext.String.format("CommunicationType_Usefor{0}s"+
						"[ComTypebyCommunication:CommunicationType:Id].Communication", detailColumnName);
				},

				/**
				 * ######### ######## #####.
				 * @protected
				 * @virtual
				 * @param {Function} callback callback-#######.
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######.
				 */
				loadContainerListData: function(callback, scope) {
					if (this.get("IsDetailCollapsed")) {
						callback.call(scope);
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchema: this.entitySchema,
						rowViewModelClassName: this.get("BaseCommunicationViewModelClassName")
					});
					this.initQueryColumns(esq);
					this.initQueryFilters(esq);
					this.initQueryEvents(esq);
					esq.getEntityCollection(function(response) {
						this.destroyQueryEvents(esq);
						this.onContainerListDataLoaded(response);
						callback.call(scope);
					}, this);
				},

				/**
				 * ############## ####### ########## #######.
				 * @protected
				 * @param {Object} esq ######, # ####### ##### ################### #######.
				 */
				initQueryColumns: function(esq) {
					esq.addColumn(this.primaryDisplayColumnName);
					var detailColumnName = this.get("DetailColumnName");
					var createdOnColumn = esq.addColumn("CreatedOn");
					createdOnColumn.orderDirection = Terrasoft.OrderDirection.ASC;
					esq.addColumn("Id");
					esq.addColumn("CommunicationType");
					esq.addColumn("Position");
					esq.addColumn("SocialMediaId");
					esq.addColumn("SearchNumber");
					esq.addColumn(detailColumnName);
					var primaryTagColumnName = this.get("PrimaryTagColumnName");
					if (this.isNotEmpty(primaryTagColumnName)) {
						esq.addColumn(primaryTagColumnName);
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQueryFilters
				 * @overridden
				 */
				initQueryFilters: function(esq) {
					esq.filters.addItem(this.get("Filter"));
				},

				/**
				 * ############## ####### ####### ###### # ######### #####.
				 * @protected
				 * @param {Object} esq ###### ###### # ######### #####.
				 */
				initQueryEvents: function(esq) {
					esq.on("createviewmodel", this.createViewModel, this);
				},

				/**
				 * ########## ###### ###### # ######### ##### ## #######.
				 * @protected
				 * @param {Object} esq ###### ###### # ######### #####.
				 */
				destroyQueryEvents: function(esq) {
					esq.un("createviewmodel", this.createViewModel, this);
				},

				/**
				 * ############## ######## ###### ############# ## ########### #######.
				 *
				 * @param {Object} config ############ ### ######## ###### #############.
				 * @param {Object} config.rawData ######## #######.
				 * @param {Object} config.rowConfig #### #######.
				 * @param {Object} config.viewModel ###### #############.
				 */
				createViewModel: function(config) {
					var communicationTypeId = config.rawData.CommunicationType.value;
					var communicationViewModelClassName = this.getCommunicationViewModelClassName(communicationTypeId);
					var communicationViewModelConfig = this.getCommunicationViewModelConfig(config);
					var viewModel = this.Ext.create(communicationViewModelClassName, communicationViewModelConfig);
					config.viewModel = viewModel;
				},

				/**
				 * ########## ##### ### ######## ###### ############# ######## #####.
				 * @protected
				 * @virtual
				 * @return {String} ##### ### ######## ###### ############# ######## #####.
				 */
				getCommunicationViewModelClassName: function() {
					return this.get("BaseCommunicationViewModelClassName");
				},

				/**
				 * Applies communication value to view model config.
				 * @private
				 * @param {Object} config View model config.
				 */
				_applyCommunicationValue: function(config) {
					var values = config && config.rawData;
					var communicationType = values && values.CommunicationType;
					var communicationTypeValue = communicationType && communicationType.value;
					var preLoadedCommunicationTypes = this.get("CommunicationTypes");
					var preLoadedCommunicationType = preLoadedCommunicationTypes &&
						preLoadedCommunicationTypes.find(communicationTypeValue);
					var preLoadedCommunication = preLoadedCommunicationType &&
						preLoadedCommunicationType.get("CommunicationId");
					communicationType.communicationValue = preLoadedCommunication && preLoadedCommunication.value;
				},

				/**
				 * Returns view model config.
				 * @protected
				 * @param {Object} config View model config.
				 * @param {Object} config.rawData Row data.
				 * @param {Object} config.rowConfig Row config.
				 * @return {Object} View model config.
				 */
				getCommunicationViewModelConfig: function(config) {
					this._applyCommunicationValue(config);
					return {
						entitySchema: this.entitySchema,
						rowConfig: config.rowConfig,
						values: config.rawData,
						isNew: false,
						isDeleted: false
					};
				},

				/**
				 * ####### ######## ######. ###########, ##### ###### ########## ######.
				 * @protected
				 * @virtual
				 * @param {Object} response ##### ## #######.
				 * @param {Boolean} response.success ###### ###### ## #######.
				 * @param {Terrasoft.Collection} response.collection ######### #########.
				 */
				onContainerListDataLoaded: function(response) {
					if (response.success) {
						var collection = this.get("Collection");
						collection.clear();
						var detailColumnName = this.get("DetailColumnName");
						var entityCollection = response.collection;
						var communicationTypes = this.get("CommunicationTypes");
						var phoneCommunicationTypes = this.get("PhoneCommunicationTypes");
						this.initSyncMailboxCount(function(mailboxCount) {
							entityCollection.each(function(item) {
								item.columns = this.columns;
								item.sandbox = this.sandbox;// todo: ### ### ContainerList
								item.set("CommunicationTypes", communicationTypes);
								item.set("DetailColumnName", detailColumnName);
								item.set("PhoneCommunicationTypes", phoneCommunicationTypes);
								item.set("SyncMailboxCount", mailboxCount);
								item.updateLinkUrl(item.get("Number"));
								this.addColumnValidator("Number", item.validateField, item);
								this.addColumnValidator("Number", item.checkCommunicationDuplicates, item);
							}, this);
							collection.loadAll(entityCollection);
							this.set("IsDataLoaded", true);
						}, this);
					}
				},


				/**
				 * ######### ######### ### ######### #######.
				 * @protected
				 * @virtual
				 * @param {String} columnName ### ####### ### #########.
				 * @param {Function} validatorFn ####### #########.
				 * @param {Object} sender ####### #########.
				 */
				addColumnValidator: function(columnName, validatorFn, sender) {
					var columnValidationConfig = sender.validationConfig[columnName] ||
						(sender.validationConfig[columnName] = []);
					columnValidationConfig.push(validatorFn);
				},

				/**
				 * ############# ######### ###### "#########" # "######" ######## ## ####### ######### ######.
				 * @protected
				 * @param {Boolean} isVisible #### ###### ###### "#########" # "######" ######## ############.
				 */
				setSaveDiscardButtonsVisible: function(isVisible) {
					var options = ["ShowSaveButton", "ShowDiscardButton"];
					Terrasoft.each(options, function(option) {
						this.updateCardProperty(option, isVisible, null);
					}, this);
					this.updateCardProperty("IsChanged", isVisible, {silent: true});
					this.updateCardProperty("Restored", true, {silent: true});
				},

				/**
				 * Set property value to master page.
				 * @protected
				 * @param {String} key Property key.
				 * @param {String} value Property value.
				 * @param {Object} [options] Set options.
				 */
				updateCardProperty: function(key, value, options) {
					this.sandbox.publish("UpdateCardProperty", {
						key: key,
						value: value,
						options: options
					}, [this.sandbox.id]);
				},

				/**
				 * ########## ###### "#########" # "######" ######## ## ####### ######### ######.
				 * @protected
				 * @param {Boolean} isVisible #### ###### ###### "#########" # "######" ######## ############.
				 */
				changeCardPageButtonsVisibility: function(isVisible) {
					this.setSaveDiscardButtonsVisible(isVisible);
				},

				/**
				 * Handler change communication item.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} item Changed communication item.
				 * @param {Object} config Operation type config.
				 */
				onItemChanged: function(item, config) {
					if (config && config.OperationType === "Delete") {
						this.deleteItem(item);
					}
					this.changeCardPageButtonsVisibility(true);
					this.syncDetailWithMasterEntity(item, config);
				},

				/**
				 * Synchronizes communications detail with master entity.
				 * @param {Terrasoft.BaseViewModel} item Changed communication item.
				 * @param {Object} config Operation type config.
				 */
				syncDetailWithMasterEntity: function(item, config) {
					if (item.get("IsSynced")) {
						item.set("IsSynced", false, {silent: true});
						return;
					}
					var communicationType = item.get("CommunicationType");
					if (this.isEmpty(communicationType)) {
						return;
					}
					var oldCommunicationType = item.getPrevious("CommunicationType");
					var masterEntityColumnName = this.getMappingValue("MasterEntityColumn",
							"CommunicationType", communicationType);
					var primaryTagColumnName = this.get("PrimaryTagColumnName");
					var isPrimary = item.get(primaryTagColumnName);
					var value = item.get("Number") || "";
					var oldValue = item.getPrevious("Number") || "";
					var operationType = config && config.OperationType || "";
					var isNotNeedSync = (value === oldValue && communicationType === oldCommunicationType &&
							operationType !== "Delete");
					if (isNotNeedSync) {
						return;
					}
					if (this.isNotEmpty(oldCommunicationType) && oldCommunicationType !== communicationType) {
						var oldMasterEntityColumnName = this.getMappingValue("MasterEntityColumn",
								"CommunicationType", oldCommunicationType);
						if (this.isNotEmpty(oldMasterEntityColumnName) && isPrimary) {
							this._syncLastTypedItemWithMasterRecord(oldCommunicationType, oldMasterEntityColumnName);
						}
						this.updateMasterEntityColumn(item, masterEntityColumnName);
						return;
					}
					if (this.isNotEmpty(masterEntityColumnName) && (isPrimary || oldValue === "")) {
						if (operationType === "Delete" && !isPrimary) {
							return;
						}
						if (operationType === "Delete") {
							this._syncLastTypedItemWithMasterRecord(communicationType, masterEntityColumnName);
							return;
						}
						this.updateMasterEntityColumn(item, masterEntityColumnName);
					}
				},

				/**
				 * Synchronize last typed item with master record.
				 * @private
				 * @param {Object} communicationType Communication type value.
				 * @param {String} masterEntityColumnName Master entity column name.
				 */
				_syncLastTypedItemWithMasterRecord: function(communicationType, masterEntityColumnName) {
					var cardValue = null;
					var lastItem = this._getLastCommunicationByType(communicationType);
					if (lastItem) {
						cardValue = lastItem.get("Number");
						lastItem.set(this.get("PrimaryTagColumnName"), true);
					}
					this.updateCardProperty(masterEntityColumnName, cardValue);
				},

				/**
				 * Returns communication item by communication type.
				 * @private
				 * @param {Object} communicationType Communication type value.
				 * @returns {Terrasoft.BaseViewModel} Last communication view model.
				 */
				_getLastCommunicationByType: function(communicationType) {
					var commTypeValue = communicationType && communicationType.value;
					var communications = this.get("Collection");
					var items = communications && communications.filterByFn(function(item) {
						var type = item.get("CommunicationType");
						return type && type.value === commTypeValue;
					}, this);
					return items && items.last();
				},

				/**
				 * Updates synchronized master entity column.
				 * @private
				 * @param {Terrasoft.BaseViewModel} item Changed communication item.
				 * @param {String} masterEntityColumnName Master entity column name.
				 */
				updateMasterEntityColumn: function(item, masterEntityColumnName) {
					var communicationType = item.get("CommunicationType");
					var value = item.get("Number");
					this.updateIsPrimaryTag(communicationType, item);
					this.updateCardProperty(masterEntityColumnName, value);
				},

				/**
				 * Synchronizes master entity with communications detail.
				 * @protected
				 * @param {Object} config Master entity synchronizing config.
				 */
				syncMasterEntityWithDetail: function(config) {
					var typeId = config.communicationTypeId ||
							this.getMappingValue("CommunicationType", "MasterEntityColumn", config.syncColumnName);
					var isDeletedColumnValue = this.isEmpty(config.syncColumnValue);
					if (!typeId) {
						return;
					}
					if (!isDeletedColumnValue) {
						this.createOrUpdateCommunicationItem(typeId, config);
					}
					if (isDeletedColumnValue) {
						this.deleteCommunicationItem(typeId, config);
					}
				},

				/**
				 * Returns items collection for update.
				 * @private
				 * @param {String} typeId Communication type id.
				 * @param {Object} config Master entity synchronizing config.
				 * @return {Terrasoft.Collection} Items collection for update.
				 */
				getItemsForUpdate: function(typeId, config) {
					var communicationList = this.get("Collection");
					var items = communicationList.filterByFn(function(item) {
						return (item.get("CommunicationType").value === typeId &&
							(item.get("Number") === config.syncOldColumnValue ||
							item.get("Number") === config.syncColumnValue));
					}, this);
					items.sortByFn(this.sortByPrimary, this);
					return items;
				},

				/**
				 * Returns comparison result.
				 * @private
				 * @param {Object} firstItem Comparable first item.
				 * @param {Object} secondItem Comparable second item.
				 * @return {Number} Comparison result.
				 */
				sortByPrimary: function(firstItem, secondItem) {
					var primaryTagColumnName = this.get("PrimaryTagColumnName");
					return secondItem.get(primaryTagColumnName) < firstItem.get(primaryTagColumnName) ? -1 : 1;
				},

				/**
				 * Returns IsSynced item value.
				 * @private
				 * @param {Object} config Master entity synchronizing config.
				 * @return {Boolean} IsSynced item value.
				 */
				getIsSyncedItemValue: function(config) {
					return this.Ext.isDefined(config.isSynced) ? config.isSynced : true;
				},

				/**
				 * Creates or updates communication item.
				 * @private
				 * @param {String} typeId Communication type id.
				 * @param {Object} config Master entity synchronizing config.
				 */
				createOrUpdateCommunicationItem: function(typeId, config) {
					var primaryTagColumnName = this.get("PrimaryTagColumnName");
					var itemsForUpdate = this.getItemsForUpdate(typeId, config);
					var isSynced = this.getIsSyncedItemValue(config);
					if (itemsForUpdate.getCount() === 0) {
						var newItem = this.addItem(typeId);
						if (Ext.isEmpty(newItem)) {
							return;
						}
						newItem.set("IsSynced", isSynced, {silent: true});
						this.updateIsPrimaryTag(typeId, newItem);
						newItem.set("Number", config.syncColumnValue);
						return;
					}
					itemsForUpdate.each(function(item) {
						if (item.get(primaryTagColumnName) && item.get("Number") === config.syncColumnValue) {
							return false;
						}
						this.updateIsPrimaryTag(typeId, item);
						item.set("IsSynced", isSynced, {silent: true});
						item.set("Number", config.syncColumnValue);
						return false;
					}, this);
				},

				/**
				 * Deletes synchronized communication item.
				 * @private
				 * @param {String} typeId Communication type id.
				 * @param {Object} config Master entity synchronizing config.
				 */
				deleteCommunicationItem: function(typeId, config) {
					var communicationList = this.get("Collection");
					communicationList.each(function(item) {
						if (item.get("CommunicationType").value === typeId &&
								item.get("Number") === config.syncOldColumnValue) {
							item.set("IsSynced", this.getIsSyncedItemValue(config), {silent: true});
							this.deleteItem(item);
						}
					}, this);
				},

				/**
				 * Initializes master detail column mapping.
				 * Sets MasterDetailColumnMapping attribute.
				 * @protected
				 */
				initMasterDetailColumnMapping: Terrasoft.emptyFn,

				/**
				 * Returns mapping value.
				 * @private
				 * @param {String} getParamName Refundable mapping attribute name.
				 * @param {String} byParamName Filtered mapping attribute name.
				 * @param {String} byParamValue Filtered mapping attribute value.
				 * @return {String} Mapping value.
				 */
				getMappingValue: function(getParamName, byParamName, byParamValue) {
					byParamValue = byParamValue.value || byParamValue;
					var masterDetailColumnMapping = this.get("MasterDetailColumnMapping");
					var typeMapping = this.Ext.Array.findBy(masterDetailColumnMapping, function(item) {
						return item[byParamName] === byParamValue;
					});
					return typeMapping ? typeMapping[getParamName] : "";
				},

				/**
				 * Updates communications primary tag.
				 * @private
				 * @param {String} communicationType Communication type.
				 * @param {Terrasoft.BaseViewModel} currentItem Changed communication item.
				 */
				updateIsPrimaryTag: function(communicationType, currentItem) {
					var primaryTagColumnName = this.get("PrimaryTagColumnName");
					var communications = this.get("Collection");
					communications.each(function(item) {
						if (item.get("CommunicationType").value === communicationType.value) {
							item.set(primaryTagColumnName, false, {silent: true});
						}
					}, this);
					currentItem.set(primaryTagColumnName, true, {silent: true});
				},

				/**
				 * ####### ######## ##### ## ######## ######### ###### # ######## ### # ######### ######### ## ########.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} item ######### ####### ######## #####.
				 */
				deleteItem: function(item) {
					var deletedItems = this.get("DeletedItems");
					var collection = this.get("Collection");
					collection.removeByKey(item.get("Id"));
					deletedItems.addItem(item);
				},

				/**
				 * Adds communication to detail.
				 * @protected
				 * @param {String} communicationTypeId Communication identifier.
				 */
				addItem: function(communicationTypeId) {
					if (this.get("IsDetailCollapsed")) {
						return;
					}
					var communicationTypes = this.get("CommunicationTypes");
					var phoneCommunicationTypes = this.get("PhoneCommunicationTypes");
					if (communicationTypeId && !communicationTypes.contains(communicationTypeId)) {
						return null;
					}
					if (communicationTypeId) {
						var communicationType = communicationTypes.get(communicationTypeId);
					}
					var itemClassName = this.getCommunicationViewModelClassName(communicationTypeId);
					var newItem = this.Ext.create(itemClassName, {
						entitySchema: this.entitySchema,
						columns: this.columns
					});
					var detailColumnName = this.get("DetailColumnName");
					var isNewItemFocused = this.get("IsNewItemFocused");
					newItem.set("CommunicationTypes", communicationTypes);
					newItem.set("DetailColumnName", detailColumnName);
					newItem.set("PhoneCommunicationTypes", phoneCommunicationTypes);
					newItem.set("Focused", isNewItemFocused);
					this.addColumnValidator("Number", newItem.validateField, newItem);
					this.addColumnValidator("Number", newItem.checkCommunicationDuplicates, newItem);
					newItem.sandbox = this.sandbox;
					newItem.setDefaultValues(function() {
						var communicationTypeConfig = null;
						if (communicationType) {
							var communication = communicationType.get("CommunicationId");
							communicationTypeConfig = {
								value: communicationType.get("Id"),
								displayValue: communicationType.get("Name"),
								communicationValue: communication && communication.value
							};
						}
						newItem.set("CommunicationType", communicationTypeConfig);
						newItem.set(detailColumnName, {
							value: this.get("MasterRecordId")
						});
						var itemKey = newItem.get("Id");
						var collection = this.get("Collection");
						collection.add(itemKey, newItem);
						this.changeCardPageButtonsVisibility(true);
					}, this);
					return newItem;
				},

				/**
				 * ######### ######## ###### ######.
				 * @protected
				 * @virtual
				 * @param {Function} callback callback-#######.
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######.
				 */
				loadData: function(callback, scope) {
					this.initCommunicationTypes(function() {
						this.initPhoneCommunicationTypes();
						this.initToolsMenuItems();
						this.loadContainerListData(callback, scope);
					});
				},

				/**
				 * ############## ######### ####### #### ###### ########.
				 */
				initToolsMenuItems: function() {
					var toolsMenuItems = this.getToolsMenuItems();
					var menuItems = this.get("ToolsMenuItems");
					menuItems.clear();
					menuItems.loadAll(toolsMenuItems);
				},

				/**
				 * ############## ######### ######.
				 * @protected
				 * @virtual
				 */
				initCollections: function() {
					var collection = this.get("Collection");
					collection.on("itemChanged", this.onItemChanged, this);
					this.set("ToolsMenuItems", this.Ext.create("Terrasoft.BaseViewModelCollection"));
					this.set("DeletedItems",
						this.Ext.create("Terrasoft.BaseViewModelCollection", {entitySchema: this.entitySchema}));
				},

				/**
				 * ############## ######### ##### ####### ##### # ##### ############ "#######".
				 * @protected
				 */
				initPhoneCommunicationTypes: function() {
					var communicationTypes = this.get("CommunicationTypes");
					var phoneCommunicationTypes = communicationTypes.filter(function(item) {
						var communicationId = item.get("CommunicationId");
						return (communicationId.value === ConfigurationConstants.Communication.Phone);
					});
					var phoneCommunicationTypeIds = [];
					phoneCommunicationTypes.each(function(item) {
						var primaryColumnValue = item.get("Id");
						phoneCommunicationTypeIds.push(primaryColumnValue);
					});
					this.set("PhoneCommunicationTypes", phoneCommunicationTypeIds);
				},

				/**
				 * ############## ######### ##### ####### #####.
				 * @protected
				 * @param {Function} callback ####### ######### ######.
				 */
				initCommunicationTypes: function(callback) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "CommunicationType",
						isDistinct: true
					});
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
					esq.addColumn("[ComTypebyCommunication:CommunicationType:Id].Communication", "CommunicationId");
					this.initCommunicationTypesFilters(esq);
					esq.getEntityCollection(function(response) {
						if (response.success) {
							var entityCollection = response.collection;
							this.set("CommunicationTypes", entityCollection);
						}
						callback.call(this);
					}, this);
				},

				/**
				 * ########### ## #########.
				 * @protected
				 * @virtual
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var sandbox = this.sandbox;
					sandbox.subscribe("ResultSelectedRows", this.save, this, [sandbox.id]);
					sandbox.subscribe("ValidateDetail", this.validateDetail, this, [sandbox.id]);
					sandbox.subscribe("SaveDetail", this.save, this, [sandbox.id]);
					sandbox.subscribe("DiscardChanges", this.onDiscardChanges, this, [sandbox.id]);
					sandbox.subscribe("GetCommunicationsList", this.onGetCommunications, this, [sandbox.id]);
					sandbox.subscribe("SyncCommunication", this.syncMasterEntityWithDetail, this, [sandbox.id]);
					sandbox.subscribe("GetCommunicationsSynchronizedByDetail",
						this.onGetCommunicationsSynchronizedByDetail, this, [sandbox.id]);
				},

				/**
				 * ######### ############ ###### ### ###### ######### # ########.
				 * @protected
				 */
				onDiscardChanges: function() {
					this.updateDetail();
				},

				/**
				 * ######### ######### ######.
				 * @protected
				 * @virtual
				 * @return {Boolean} true #### ###### ###### #########.
				 */
				validateDetail: function() {
					var invalidItems = this.getInvalidItems();
					var resultObject = {
						success: (invalidItems.length <= 0)
					};
					if (!resultObject.success) {
						var invalidCommunicationInfo = invalidItems[0];
						var validationMessage = this.getValidationMessage(invalidCommunicationInfo);
						resultObject.message = validationMessage;
					}
					this.sandbox.publish("DetailValidated", resultObject, [this.sandbox.id]);
					return true;
				},

				/**
				 * ########## ######### # ########## ######## #####.
				 * @protected
				 * @param {Object} invalidCommunicationInfo ########## # ########## ######## #####.
				 */
				getValidationMessage: function(invalidCommunicationInfo) {
					var invalidColumnName = invalidCommunicationInfo.invalidColumn.name;
					var invalidCommunicationNumber = invalidCommunicationInfo.communication.get("Number");
					var invalidCommunicationType = invalidCommunicationInfo.communication.get("CommunicationType");
					var invalidCommunicationTypeName = "";
					if (invalidCommunicationType) {
						invalidCommunicationTypeName = invalidCommunicationType.displayValue;
					}
					var resourceName = "Resources.Strings." + invalidColumnName + "ValidationErrorTemplate";
					var messageTemplate = this.get(resourceName);
					return this.Ext.String.format(messageTemplate,
							invalidCommunicationNumber, invalidCommunicationTypeName);
				},

				/**
				 * ######### ######### # ######.
				 * @protected
				 * @param {String} message #########.
				 * @return {String} ###### ######### # ######.
				 */
				getErrorMessage: function(message) {
					var messageTemplate = this.get("Resources.Strings.ErrorTemplate");
					return this.Ext.String.format(messageTemplate,
						this.get("Resources.Strings.DetailCaption") + (message ? ":" + message : ""));
				},

				/**
				 * ############## ######.
				 * @protected
				 * @virtual
				 * @param {Function} callback callback-#######.
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######.
				 */
				init: function(callback, scope) {
					this.initMasterDetailColumnMapping();
					this.callParent([function() {
						this.initCollections();
						if (this.Ext.isEmpty(this.get("BaseCommunicationViewModelClassName"))) {
							this.set("BaseCommunicationViewModelClassName", "Terrasoft.BaseCommunicationViewModel");
						}
						this.loadData(callback, scope);
					}, this]);
				},

				/**
				 * ########## ############# # ########### ######.
				 * @protected
				 * @param {Boolean} isCollapsed ######## ## ######.
				 */
				onDetailCollapsedChanged: function(isCollapsed) {
					this.callParent(arguments);
					this.set("IsDetailCollapsed", isCollapsed);
					if (!isCollapsed && !this.get("IsDataLoaded")) {
						this.loadContainerListData(this.Terrasoft.emptyFn);
					}
				},

				/**
				 * ######### ###### ### ######## ## ##### ###### # ############ #######.
				 * @protected
				 */
				updateDetail: function() {
					var detailInfo = this.sandbox.publish("GetDetailInfo", null, [this.sandbox.id]) || {};
					this.set("MasterRecordId", detailInfo.masterRecordId);
					this.set("DetailColumnName", detailInfo.detailColumnName);
					this.set("Filter", detailInfo.filter);
					this.set("CardPageName", detailInfo.cardPageName);
					this.set("SchemaName", detailInfo.schemaName);
					this.set("DefaultValues", detailInfo.defaultValues);
					this.set("IsDataLoaded", false);
					this.loadContainerListData(function() {
						var deletedItems = this.get("DeletedItems");
						deletedItems.clear();
					}, this);
				},
				/**
				 * ######### ###### ######## ## ######## ####### #####.
				 * @protected
				 * @return {Array} ###### ######## ## ########.
				 */
				getDeleteItemsQueries: function() {
					var deletedItems = this.get("DeletedItems");
					var deleteQueries = [];
					deletedItems.each(function(item) {
						var primaryColumnValue = item.get(item.primaryColumnName);
						var deleteQuery = item.getDeleteQuery();
						deleteQuery.enablePrimaryColumnFilter(primaryColumnValue);
						deleteQueries.push(deleteQuery);
					}, this);
					return deleteQueries;
				},

				/**
				 * ######### ###### ######## ## #########/########## ######## #####.
				 * @protected
				 * @return {Array} ###### ######## ## #########/########## ######## #####.
				 */
				getSaveItemsQueries: function() {
					var collection = this.get("Collection");
					var saveQueries = [];
					collection.each(function(item) {
						if (item.isChanged() && item.validate()) {
							item.$SyncMailboxCount = this.$SyncMailboxCount;
							saveQueries.push(item.getSaveQuery());
						}
					}, this);
					return saveQueries;
				},

				/**
				 * ########## ###### ####### #####, ####### ## ###### #########.
				 * @protected
				 * @return {Array} ###### ####### #####, ####### ## ###### #########.
				 */
				getInvalidItems: function() {
					var communications = this.getItemsToValidate();
					var invalidCommunications = [];
					var validationResult;
					communications.each(function(communication) {
						validationResult = this.getCommunicationValidationResult(communication);
						if (!validationResult.success) {
							invalidCommunications.push(validationResult);
							return false;
						}
					}, this);
					return invalidCommunications;
				},

				/**
				 * ########## ######## ###### ########## #########.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.Collection} ######## ###### ########## #########.
				 */
				getItemsToValidate: function() {
					return this.get("Collection");
				},

				/**
				 * ########## ######### ######### ######## #####.
				 * @private
				 * @param {Terrasoft.BaseCommunicationViewModel} communication ######## #####.
				 * @return {Object} ######### ######### ######## #####.
				 */
				getCommunicationValidationResult: function(communication) {
					var validationResult = {
						success: true
					};
					if (communication.isChanged() && !communication.validate()) {
						var attributes = communication.validationInfo.attributes;
						Terrasoft.each(attributes, function(attribute, attributeName) {
							if (!attribute.isValid) {
								var invalidColumn = communication.columns[attributeName];
								validationResult = {
									success: false,
									invalidColumn: invalidColumn,
									communication: communication
								};
								return false;
							}
						}, this);
					}
					return validationResult;
				},

				/**
				 * ######### ######### ######. ########### ### ####### ## ###### ######### ########, ####### ########
				 * ######.
				 * @protected
				 * @return {Boolean} True #### ########## ###### #######, ### ### ######### ### ##########.
				 */
				save: function() {
					var queries = [];
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
				 * ########## ####### "##### ########## ######".
				 * #### ########## ###### #######, ############# ######### ###### ######### # ######## #########.
				 * #### ########## ###### ## #######, ######### ########## ##### # ######### # ############ #########.
				 * @protected
				 * @param {Object} response ######## ##### # ########### ##########.
				 */
				onSaved: function(response) {
					var message = response.ResponseStatus && response.ResponseStatus.Message;
					if (response.success && !message) {
						var deletedItems = this.get("DeletedItems");
						var collection = this.get("Collection");
						collection.each(function(item) {
							item.isNew = false;
							item.changedValues = null;
						}, this);
						deletedItems.clear();
						this.publishSaveResponse(response);
					} else {
						this.publishSaveResponse({
							success: false,
							message: this.getErrorMessage(message)
						});
					}
				},

				/**
				 * ######### ######### # ### ### ###### #########.
				 * @protected
				 * @param {Object} config ######### #########.
				 */
				publishSaveResponse: function(config) {
					this.sandbox.publish("DetailSaved", config, [this.sandbox.id]);
				},

				/**
				 * @inheritDoc Terrasoft.BaseDetailV2#getToolsVisible
				 */
				getToolsVisible: function() {
					return this.callParent(arguments) && this.get("CanEditMasterRecord");
				},

				/**
				 * @inheritDoc Terrasoft.BaseDetailV2#getProfileKey
				 */
				getProfileKey: function() {
					return this.get("CardPageName") + this.get("SchemaName");
				},

				/**
				 * ########## ###### ####### #####.
				 * @return {Array|*} ###### ####### #####.
				 */
				onGetCommunications: function() {
					var invalidItems = this.getInvalidItems();
					if (invalidItems.length > 0) {
						return null;
					}
					var result = [];
					var collection = this.get("Collection");
					collection.each(function(item) {
						result.push({
							"Id": item.get("Id"),
							"Number": item.get("Number"),
							"SearchNumber": item.get("SearchNumber"),
							"CommunicationType": item.get("CommunicationType")
						});
					}, this);
					return result;
				},

				/**
				 * Returs array of column names wich synchronized by detail.
				 * @returns {Array} Column names wich synchronized by detail.
				 */
				onGetCommunicationsSynchronizedByDetail: function() {
					var collection = this.get("Collection");
					var result = [];
					collection.each(function(item) {
						var communicationType = item.get("CommunicationType");
						var masterEntityColumnName = this.getMappingValue("MasterEntityColumn",
							"CommunicationType", communicationType);
						if (!Ext.isEmpty(masterEntityColumnName) && result.indexOf(masterEntityColumnName) < 0) {
							result.push(masterEntityColumnName);
						}
					}, this);
					return result;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "CommunicationsContainer",
					"parentName": "Detail",
					"propertyName": "items",
					"values":
					{
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "Collection",
						"observableRowNumber": 10,
						"onGetItemConfig": "getItemViewConfig"
					}
				},
				{
					"operation": "insert",
					"name": "AddButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"visible": {"bindTo": "getToolsVisible"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"controlConfig": {
							"menu": {
								"items": {"bindTo": "ToolsMenuItems"}
							}
						},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"markerValue": "AddTypedRecordButton"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('BaseCommunicationDetailSocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseCommunicationDetailSocialNetworkIntegration", ["CommunicationUtils", "SocialSearch"], function(CommunicationUtils) {
	return {
		attributes: {
			SocialSearchModuleId: {dataValueType: Terrasoft.DataValueType.TEXT}

		},
		messages: {
			/**
			 * @message
			 * ########## ######### ### ######### ########## # ######## ### ######.
			 */
			"GetDetailInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message
			 * ########## ######### ######### ######### ####### ########.
			 */
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message SearchResultBySocialNetworks
			 * ######## ######### ###### ## ########## #####.
			 */
			"SearchResultBySocialNetworks": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("SearchResultBySocialNetworks", this.onSearchResultBySocialNetworks, this);
			},

			/**
			 * ############ ######### ###### ####### ###### # ########## ####.
			 * @private
			 * @param {Object} searchResult ######### ###### ####### ###### # ########## ####.
			 * @param {Terrasoft.Collection} searchResult.selectedItems ######### ######### ####### ## ######## ######.
			 */
			onSearchResultBySocialNetworks: function(searchResult) {
				var collection = searchResult.selectedItems;
				collection.each(function(item) {
					var newItem = this.addItem(item.get("CommunicationType"));
					newItem.set("Number", item.get("Name"));
					newItem.set("SocialMediaId", item.get("Id"));
				}, this);
			},

			/**
			 * ########## ############### ## #### ######## ##### ######### ###### ######.
			 * @protected
			 * @param {String} communicationTypeFilter ### ######## #####.
			 * @return {Terrasoft.Collection} ############### ## #### ######## ##### ######### ###### ######.
			 */
			getCommunications: function(communicationTypeFilter) {
				var collection = this.get("Collection");
				var filteredCollection = collection.filterByFn(function(communication) {
					var communicationType = communication.get("CommunicationType");
					if (!communicationType) {
						return false;
					}
					return (communicationType.value === communicationTypeFilter);
				});
				return filteredCollection;
			},

			/**
			 * ######### ###### ###### # ########## #####.
			 * @protected
			 * @param {Object} config ######### ######## ######.
			 * @param {String} config.schemaName ######## #####, ####### ##### ############## #######.
			 */
			loadSocialSearchModule: function(config) {
				var moduleId = this.sandbox.id + "_SocialSearch";
				var detailInfo = this.getDetailInfo();
				var moduleConfig = {
					moduleId: moduleId,
					moduleName: "SocialSearch",
					stateObj: {},
					instanceConfig: {
						isSchemaConfigInitialized: true,
						schemaName: config.schemaName,
						searchQuery: detailInfo.masterRecordDisplayValue
					}
				};
				this.sandbox.publish("OpenCard", moduleConfig, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#addMenuItem
			 * @overridden
			 */
			addMenuItem: function(typeMenuItems, communicationType) {
				var value = communicationType.get("Id");
				if (CommunicationUtils.isSocialNetworkType(value)) {
					return;
				}
				this.callParent(arguments);
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "SocialNetworksContainer",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"visible": {"bindTo": "getToolsVisible"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["social-networks-container"],
					"items": []
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('BaseCommunicationDetailTwitterIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseCommunicationDetailTwitterIntegration", ["ConfigurationConstants"], function(ConfigurationConstants) {
	return {
		attributes: {
			TwitterConnectorInitialized: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * ####### ####, ### ######## ####### Twitter.
			 */
			TwitterProfileExists: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},

		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#changeCardPageButtonsVisibility
			 * @overridden
			 */
			changeCardPageButtonsVisibility: function() {
				this.callParent(arguments);
				this.updateTwitterProfileInfo();
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#onContainerListDataLoaded
			 * @overridden
			 */
			onContainerListDataLoaded: function() {
				this.callParent(arguments);
				this.updateTwitterProfileInfo();
			},

			/**
			 * ######### ####### ####### ######## ##### # ##### Twitter.
			 * @protected
			 * @virtual
			 */
			updateTwitterProfileInfo: function() {
				var twitterCommunications =
						this.getCommunications(ConfigurationConstants.CommunicationTypes.Twitter);
				var twitterProfileExists = !twitterCommunications.isEmpty();
				this.set("TwitterProfileExists", twitterProfileExists);
			},

			/**
			 * ########## ####### ###### Twitter.
			 */
			onTwitterButtonClick: function() {
				var communicationType = ConfigurationConstants.CommunicationTypes.Twitter;
				var twitterCommunication = this.addItem(communicationType);
				twitterCommunication.getSocialNetworkAccountsCount({value: communicationType},
						function(accountsCount) {
							if (accountsCount === 0) {
								twitterCommunication.handleMissingSocialNetworkAccount("Twitter");
								twitterCommunication.deleteItem();
								return;
							} else {
								twitterCommunication.onLookUpClick();
							}
						}, this);
			},

			/**
			 * ########## ####### ###### #### Twitter.
			 */
			onTwitterMenuItemClick: function() {
				this.onTwitterButtonClick();
			},

			/**
			 * ########## ###### ### ###### Twitter.
			 * @protected
			 * @return {String} ###### ### ###### Twitter.
			 */
			getTwitterButtonMarkerValue: function() {
				var twitterProfileExists = this.get("TwitterProfileExists");
				return twitterProfileExists ? "TwitterProfile" : "TwitterProfileSearch";
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#addSocialNetworkMenuItem
			 * @overridden
			 */
			addSocialNetworkMenuItem: function(socialNetworksMenuItems, menuItem) {
				this.callParent(arguments);
				if (menuItem.get("Id") === ConfigurationConstants.CommunicationTypes.Twitter) {
					this.modifyTwitterMenuItem(menuItem);
				}
			},

			/**
			 * ######## ######## ### ######## ########## ### ###### #### Twitter.
			 * @protected
			 * @param {Object} twitterMenuItem ####### ########## ### ###### #### Twitter.
			 */
			modifyTwitterMenuItem: function(twitterMenuItem) {
				twitterMenuItem.set("Click", {
					bindTo: "onTwitterMenuItemClick"
				});
				twitterMenuItem.set("Enabled", {
					bindTo: "getTwitterButtonEnabled"
				});
			},

			/**
			 * ########## ########### ###### #### Twitter.
			 * @protected
			 * @return {#oolean} ########### ###### #### Twitter.
			 */
			getTwitterButtonEnabled: function() {
				var twitterButtonEnabled = !this.get("TwitterProfileExists");
				return twitterButtonEnabled;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "TwitterButton",
				"parentName": "SocialNetworksContainer",
				"propertyName": "items",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "onTwitterButtonClick"},
					"enabled": {
						"bindTo": "getTwitterButtonEnabled"
					},
					"classes": {
						"wrapperClass": ["t-btn-full-image", "t-btn-twitter"]
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.TwitterLinkImage"},
					"markerValue": {"bindTo": "getTwitterButtonMarkerValue"},
					"visible": {"bindTo": "TwitterConnectorInitialized"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('BaseCommunicationDetailFacebookIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseCommunicationDetailFacebookIntegration", ["ConfigurationConstants", "FacebookClientUtilities",
		"FacebookCommunicationViewModel"], function(ConfigurationConstants) {
	return {
		attributes: {
			/**
			 * ####### ####, ### ######## ####### Facebook.
			 */
			FacebookProfileExists: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * ######## ##### ######## ###### # Facebook.
			 */
			FacebookSearchSchemaName: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "FacebookSearchSchema"
			}
		},
		mixins: {
			FacebookClientUtilities: "Terrasoft.FacebookClientUtilities"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#changeCardPageButtonsVisibility
			 * @overridden
			 */
			changeCardPageButtonsVisibility: function() {
				this.callParent(arguments);
				this.updateFacebookProfileInfo();
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#onContainerListDataLoaded
			 * @overridden
			 */
			onContainerListDataLoaded: function() {
				this.callParent(arguments);
				this.updateFacebookProfileInfo();
			},

			/**
			 * ######### ####### ####### ######## ##### # ##### Facebook.
			 * @protected
			 * @virtual
			 */
			updateFacebookProfileInfo: function() {
				var facebookCommunications =
					this.getCommunications(ConfigurationConstants.CommunicationTypes.Facebook);
				var facebookProfileExists = !facebookCommunications.isEmpty();
				this.set("FacebookProfileExists", facebookProfileExists);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#addSocialNetworkMenuItem
			 * @overridden
			 */
			addSocialNetworkMenuItem: function(socialNetworksMenuItems, menuItem) {
				this.callParent(arguments);
				if (menuItem.get("Id") === ConfigurationConstants.CommunicationTypes.Facebook) {
					this.modifyFacebookMenuItem(menuItem);
				}
			},

			/**
			 * ######## ######## ### ######## ########## ### ###### #### Facebook.
			 * @protected
			 * @param {Object} facebookMenuItem ####### ########## ### ###### #### Facebook.
			 */
			modifyFacebookMenuItem: function(facebookMenuItem) {
				facebookMenuItem.set("Click", {
					bindTo: "onFacebookMenuItemClick"
				});
			},

			/**
			 * ########## ####### ###### #### Facebook.
			 */
			onFacebookMenuItemClick: function() {
				var schemaName = this.get("FacebookSearchSchemaName");
				this.openSocialSearchPage(schemaName);
			},

			/**
			 * ########## ####### ###### Facebook.
			 */
			onFacebookButtonClick: function() {
				var facebookProfileExists = this.get("FacebookProfileExists");
				var schemaName = this.get("FacebookSearchSchemaName");
				if (!facebookProfileExists) {
					this.openSocialSearchPage(schemaName);
				} else {
					this.openProfilePage(ConfigurationConstants.CommunicationTypes.Facebook);
				}
			},

			/**
			 * ######### ######## ####### ############ # ########### ## #### ######## #####.
			 * @protected
			 * @param {String} communicationType ### ######## #####.
			 */
			openProfilePage: function(communicationType) {
				var communications = this.getCommunications(communicationType);
				var firstCommunication = communications.getByIndex(0);
				var facebookLink = firstCommunication.getFacebookUrl();
				window.open(facebookLink);
			},

			/**
			 * ########## ###### ### ###### Facebook.
			 * @protected
			 * @return {String} ###### ### ###### Facebook.
			 */
			getFacebookButtonMarkerValue: function() {
				var facebookProfileExists = this.get("FacebookProfileExists");
				return facebookProfileExists ? "FacebookProfile" : "FacebookProfileSearch";
			},

			/**
			 * ######### ###### ###### # ########## #####.
			 * @protected
			 * @param {String} schemaName ######## #####, ####### ##### ############## #######.
			 */
			openSocialSearchPage: function(schemaName) {
				this.getFacebookConnector(function(connector) {
					var config = {};
					connector.checkCanOperate(config, function(response) {
						var success = response.success;
						if (!success) {
							return this.handleConnectorError(response.errorInfo, function() {
								this.loadSocialSearchModule({
									schemaName: schemaName
								});
							}, this);
						}
						this.loadSocialSearchModule({
							schemaName: schemaName
						});
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getCommunicationViewModelClassName
			 * @overridden
			 */
			getCommunicationViewModelClassName: function(communicationTypeId) {
				if (communicationTypeId === ConfigurationConstants.CommunicationTypes.Facebook) {
					return "Terrasoft.FacebookCommunicationViewModel";
				} else {
					return this.callParent(arguments);
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "FacebookButton",
				"parentName": "SocialNetworksContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "onFacebookButtonClick"},
					"classes": {
						"wrapperClass": ["t-btn-full-image", "t-btn-facebook"]
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.FacebookLinkImage"},
					"markerValue": {"bindTo": "getFacebookButtonMarkerValue"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("BaseCommunicationDetail", ["CTIBaseCommunicationViewModel"],
	function() {
		return {
			messages: {
				"CallCustomer": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				"DoNotUseCommunication": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {

				/**
				 * ############## ######.
				 * @inheritdoc Terrasoft.BaseCommunicationDetail#init
				 * @overridden
				 */
				init: function() {
					this.set("BaseCommunicationViewModelClassName", "Terrasoft.CTIBaseCommunicationViewModel");
					this.callParent(arguments);
				}
			}
		};
	});


