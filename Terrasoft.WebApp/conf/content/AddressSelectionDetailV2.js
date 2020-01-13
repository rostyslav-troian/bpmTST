Terrasoft.configuration.Structures["AddressSelectionDetailV2"] = {innerHierarchyStack: ["AddressSelectionDetailV2"], structureParent: "BaseDetailV2"};
define('AddressSelectionDetailV2Structure', ['AddressSelectionDetailV2Resources'], function(resources) {return {schemaUId:'d467715d-e1a1-4922-9f85-0132ca90ebfb',schemaCaption: "Address selection detail", parentSchemaName: "BaseDetailV2", schemaName:'AddressSelectionDetailV2',parentSchemaUId:'3052ff9d-521d-4a6d-ba92-04a2261e1ea8',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AddressSelectionDetailV2", ["GridUtilitiesV2", "ConfigurationItemGenerator",
				"css!OrderPageV2Styles", "PopUpContainer", "ClientAddressAddPageV2"],
		function() {
			return {
				entitySchemaName: "VwClientAddress",
				messages: {

					/**
					 * @message DiscardChanges
					 * ######### ### ###### ######### ######## #######. ###### ### ########## ###### ######.
					 */
					"DiscardChanges": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetClientInfo
					 * ############ ### ######## ########## # #######.
					 */
					"GetClientInfo": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message CloseAddressPage
					 * ######### ######## ########## ######.
					 */
					"CloseAddressPage": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetIsDeliveryAddressDetailVisible
					 * ######### ######### ######### ######.
					 */
					"GetIsDeliveryAddressDetailVisible": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message SetActiveAddress
					 * ############# ######## ##### ######.
					 */
					"SetActiveAddress": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message UpdateOrderAddress
					 * ######### #####.
					 */
					"UpdateOrderAddress": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				mixins: {
					GridUtilities: "Terrasoft.GridUtilities"
				},
				attributes: {
					/**
					 * ######### ##### ######.
					 */
					Collection: {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION,
						value: this.Ext.create("Terrasoft.Collection")
					},

					/**
					 * ############## ########## ############ ######.
					 */
					LastAddedAddressIds: {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * ############# ###### "######## #####".
					 */
					NewAddressItemId: {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				properties: {
					/**
					 * Address popup container width.
					 */
					popupWidth: 570
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#getGridData
					 * @overridden
					 */
					getGridData: function() {
						return this.get("Collection");
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#init
					 * @overridden
					 */
					init: function() {
						this.mixins.GridUtilities.init.call(this);
						this.callParent(arguments);
						this.set("NewAddressItemId", this.Terrasoft.generateGUID());
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#initData
					 * @overridden
					 */
					initData: function(callback, scope) {
						this.callParent([
							function() {
								this.updateDetailInfo();
								this.loadGridData();
								callback.call(scope);
							}, this
						]);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#loadGridData
					 * @overridden
					 */
					loadGridData: function() {
						var isDetailVisible = this.sandbox.publish("GetIsDeliveryAddressDetailVisible",
								null, [this.sandbox.id]);
						if (!isDetailVisible) {
							this.clearData();
							return;
						}
						var isContainerListRendered = this.getIsContainerListRendered();
						if (!isContainerListRendered) {
							this.set("NeedLoadGridDataAfterRender", isDetailVisible);
							return;
						}
						this.mixins.GridUtilities.loadGridData.call(this);
					},

					/**
					 * Clears addresses.
					 * @private
					 */
					clearData: function() {
						var data = this.getGridData();
						data.clear();
					},

					/**
					 * ######### ###### #######, #### ## ######### ###### #### ####### ## ########.
					 * @protected
					 */
					onRender: function() {
						this.callParent(arguments);
						if (this.get("NeedLoadGridDataAfterRender")) {
							this.set("NeedLoadGridDataAfterRender", false);
							this.loadGridData();
						}
					},

					/**
					 * ########## ######### ContainerList'#.
					 * @return {Boolean} ####### ######### ######## ########## "ContainerList".
					 */
					getIsContainerListRendered: function() {
						var containerList = this.getContainerListEl();
						return containerList && containerList.dom;
					},

					/**
					 * ########## Ext.dom.Element ######## ########## Terrasoft.ContainerList.
					 * @return {Ext.dom.Element}, `undefined` #### ContainerList ## ######.
					 */
					getContainerListEl: function() {
						return this.Ext.get("AddressContainerContainerList");
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#subscribeSandboxEvents
					 * @overridden
					 */
					subscribeSandboxEvents: function() {
						this.callParent(arguments);
						this.sandbox.subscribe("DiscardChanges", this.onDiscardChanges, this, [this.sandbox.id]);
						this.sandbox.subscribe("CloseAddressPage", this.closeAddressPage,
							this, [this.getAddressCardModuleId()]);
						this.sandbox.subscribe("GetClientInfo", function() {
							return this.get("OrderInfo");
						}, this, [this.getAddressCardModuleId()]);
						this.sandbox.subscribe("SetActiveAddress", this.onUpdateActiveAddress, this, [this.sandbox.id]);
					},

					/**
					 * ######### ############ ###### ### ###### ######### # ########.
					 * @protected
					 */
					onDiscardChanges: function() {
						var currentOrderInfo = this.get("OrderInfo");
						this.updateDetailInfo();
						var newOrderInfo = this.get("OrderInfo");
						if (currentOrderInfo.ContactId === newOrderInfo.ContactId &&
								currentOrderInfo.AccountId === newOrderInfo.AccountId) {
							this.setCheckedItemByAddress(newOrderInfo.DeliveryAddress);
							return;
						}
						this.updateDetail();
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
					 * @overridden
					 */
					getGridDataColumns: function() {
						var config = {
							Id: {path: "Id"},
							ClientType: {path: "ClientType"},
							AddressType: {path: "AddressType"},
							Country: {path: "Country"},
							Region: {path: "Region"},
							City: {path: "City"},
							Address: {path: "Address"},
							Zip: {path: "Zip"}
						};
						return config;
					},

					/**
					 * ########## ####### ### ############ ####### ######.
					 * @protected
					 * @return {String[]} ####### ### ############ ####### ######.
					 */
					getFullAddressColumns: function() {
						return ["Zip", "Country", "Region", "City", "Address"];
					},

					/**
					 * ########## ###### #####.
					 * @protected
					 * @return {String} ###### #####.
					 */
					getFullAddress: function(row) {
						var fullAddress = [];
						var addressColumns = this.getFullAddressColumns();
						this.Terrasoft.each(addressColumns, function(column) {
							var value = row.get(column);
							if (value) {
								fullAddress.push(value.displayValue || value);
							}
						}, this);
						return fullAddress.join(", ");
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollection
					 * @overridden
					 */
					prepareResponseCollection: function(collection) {
						this.mixins.GridUtilities.prepareResponseCollection.apply(this, arguments);
						var orderInfo = this.get("OrderInfo");
						var orderAddressIsNotEmpty = !this.Ext.isEmpty(orderInfo.DeliveryAddress);
						var addressItemExists = false;
						collection.each(function(item) {
							var itemAddress = this.getFullAddress(item);
							item.set("FullAddress", itemAddress);
							if (orderAddressIsNotEmpty && this.getIsAddressEqual(orderInfo.DeliveryAddress, itemAddress)) {
								item.set("Checked", true);
								addressItemExists = true;
							}
							this.prepareCollectionItem(item);
						}, this);
						this.clearAddressDuplicates(collection);
						if (orderAddressIsNotEmpty && !addressItemExists) {
							this.addAddressRow(collection, {
								"FullAddress": orderInfo.DeliveryAddress,
								"Checked": true
							});
						}
						var newAddressItemId = this.get("NewAddressItemId");
						if (!collection.contains(newAddressItemId)) {
							var newAddressItem = this.getNewAddressItem(newAddressItemId);
							collection.add(newAddressItemId, newAddressItem);
						}
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#addItemsToGridData
					 * @overridden
					 */
					addItemsToGridData: function() {
						this.clearData();
						this.mixins.GridUtilities.addItemsToGridData.apply(this, arguments);
					},

					/**
					 * ######## # ######### ###### # ######### ########## #######.
					 * @protected
					 * @param {Terrasoft.Collection} collection ######### ### ##########.
					 * @param {Object} columnValues ######## #######.
					 */
					addAddressRow: function(collection, columnValues) {
						var itemId = this.Terrasoft.generateGUID();
						var itemConfig = {
							rawData: this.Ext.apply({
								"Id": itemId
							}, columnValues)
						};
						this.createViewModel(itemConfig);
						var item = itemConfig.viewModel;
						this.prepareCollectionItem(item);
						collection.add(itemId, item);
					},

					/**
					 * ########## ####### ######### ######### ######.
					 * ############# ## ###### ##### ######## #####.
					 * @param {String} address ##### ######## #####.
					 */
					onUpdateActiveAddress: function(address) {
						var data = this.getGridData();
						var isAddressFound = false;
						data.each(function(item) {
							if (this.getIsAddressEqual(address, item.get("FullAddress"))) {
								isAddressFound = true;
								item.set("Checked", true);
								return false;
							}
						}, this);
						if (!isAddressFound) {
							this.updateDetailInfo();
							this.reloadGridData();
						}
					},

					/**
					 * ####### ## ######### ####### #########.
					 * @protected
					 * @param {Terrasoft.Collection} collection ######### ######### #######.
					 */
					clearAddressDuplicates: function(collection) {
						if (collection.getCount() === 0) {
							return;
						}
						var fullAddressColumnName = "FullAddress";
						var tempCollection = this.Ext.create("Terrasoft.Collection");
						tempCollection.loadAll(collection);
						collection.clear();
						var me = this;
						tempCollection.sortByFn(function(firstItem, secondItem) {
							var firstValue = firstItem.get(fullAddressColumnName);
							var secondValue = secondItem.get(fullAddressColumnName);
							return me.localeCompare(firstValue, secondValue);
						});
						var previousItemAddress = null;
						tempCollection.each(function(item) {
							if (previousItemAddress) {
								if (this.getIsAddressEqual(previousItemAddress, item.get(fullAddressColumnName))) {
									return;
								}
							}
							previousItemAddress = item.get(fullAddressColumnName);
							collection.add(item.get("Id"), item);
						}, this);
						tempCollection.clear();
					},

					/**
					 * ############# ######## ###### ## ######## ######.
					 * @protected
					 * @param {String} currentAddress ######## ######.
					 */
					setCheckedItemByAddress: function(currentAddress) {
						var data = this.getGridData();
						if (this.Ext.isEmpty(currentAddress)) {
							data.each(function(item) {
								if (item.get("Checked")) {
									item.set("Checked", false);
								}
							});
						} else {
							var sameAddressItems = data.filterByFn(function(item) {
								return this.getIsAddressEqual(currentAddress, item.get("FullAddress"));
							}, this);
							if (sameAddressItems.getCount() > 0) {
								var activeItem = sameAddressItems.getByIndex(0);
								activeItem.set("Checked", true);
							}
						}
					},

					/**
					 * ############## ###### ###### ### ###### # ContainerList.
					 * @protected
					 * @param {Terrasoft.BaseModel} item ###### ######.
					 */
					prepareCollectionItem: function(item) {
						item.on("change:Checked", this.getCheckedChangedFn(item));
						item.sandbox = this.sandbox;
					},

					/**
					 * ########## ###### ##### ###### ## ###### #######.
					 * @protected
					 * @param {GUID} id ############# ##### ######.
					 * @return {Terrasoft.BaseModel} ##### ####### ###### #######.
					 */
					getNewAddressItem: function(id) {
						var item = this.Ext.create("Terrasoft.BaseModel");
						item.set("Id", id);
						item.set("FullAddress", this.get("Resources.Strings.AddAddress"));
						item.set("Hint", this.get("Resources.Strings.NewAddressHint"));
						item.set("HintEnabled", true);
						this.prepareCollectionItem(item);
						item.showCard = this.showCard.bind(this);
						item.hideCard = this.hideCard.bind(this);
						return item;
					},

					/**
					 * Shows new address addition page.
					 * @protected
					 * @param {Object} config Address addition page configuration.
					 * Contains parameters:
					 * @param {String} config.containerId
					 * Contained identifier into which page will be loaded.
					 */
					showCard: function(config) {
						this.sandbox.loadModule("ConfigurationModuleV2", {
							id: this.getAddressCardModuleId(),
							renderTo: config.containerId,
							instanceConfig: {
								schemaName: "ClientAddressAddPageV2",
								isSchemaConfigInitialized: true,
								useHistoryState: false
							}
						});
					},

					/**
					 * ########## ############# ###### #### ########## ###### ######.
					 * @protected
					 * @return {string} ############# ######.
					 */
					getAddressCardModuleId: function() {
						return this.sandbox.id + "_AddressAdd_PopUpPage";
					},

					/**
					 * ######### #### ########## ###### ######.
					 * @protected
					 */
					hideCard: function() {
						var moduleId = this.getAddressCardModuleId();
						this.sandbox.unloadModule(moduleId);
						var gridData = this.getGridData();
						var row = gridData.find(this.get("NewAddressItemId"));
						if (row && row.get("Checked")) {
							this.onDiscardChanges();
						}
					},

					/**
					 * ############ ######### ###### ######## ########## ###### # ######### ##.
					 * @protected
					 * @param {Object} config ######### ###### ######## ########## ######.
					 * ######## ######### #########:
					 * @param {String} config.addressIds
					 * ############## ########## ###### #######.
					 */
					closeAddressPage: function(config) {
						var newAddressButtonId = this.get("NewAddressItemId");
						var gridData = this.getGridData();
						var newAddressButtonItem = gridData.find(newAddressButtonId);
						if (newAddressButtonItem) {
							newAddressButtonItem.set("Checked", false);
							newAddressButtonItem.set("ShowNewAddressCard", false);
						}
						if (config && config.addressIds) {
							this.set("LastAddedAddressIds", config.addressIds);
							this.updateDetail();
						} else {
							this.onDiscardChanges();
						}
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#onGridDataLoaded
					 * @overridden
					 */
					onGridDataLoaded: function() {
						this.mixins.GridUtilities.onGridDataLoaded.apply(this, arguments);
						var newAddressIds = this.get("LastAddedAddressIds");
						this.set("LastAddedAddressIds", null);
						if (newAddressIds && newAddressIds.length) {
							this.Terrasoft.each(newAddressIds, function(newAddressId) {
								var gridData = this.getGridData();
								var newItem = gridData.find(newAddressId);
								if (newItem) {
									newItem.set("Checked", true);
									return false;
								}
							}, this);
						}
					},

					/**
					 * ########## ######### ######### #### #######.
					 * @protected
					 * @param {String} orderAddress ####### ##### ######## ######.
					 * @param {String} itemAddress ##### ### #########.
					 * @return {Boolean} ######### #########.
					 */
					getIsAddressEqual: function(orderAddress, itemAddress) {
						return (this.localeCompare(orderAddress, itemAddress) === 0);
					},

					/**
					 * ########## ######### ######## ### ##### ##### ####, ### ######### ### ######### localeCompare.
					 * @param {String} firstValue ###### ########.
					 * @param {String} secondValue ###### ########.
					 * @return {Number} #########.
					 */
					localeCompare: function(firstValue, secondValue) {
						if (!this.Ext.isEmpty(firstValue)) {
							if (String.prototype.localeCompare) {
								var locale = navigator.language || navigator.userLanguage || "standart";
								return firstValue.localeCompare(secondValue, locale, {sensitivity: "base"});
							} else {
								firstValue = firstValue.toLowerCase();
								secondValue = secondValue.toLowerCase();
								if (firstValue === secondValue) {
									return 0;
								} else {
									return (firstValue > secondValue) ? 1 : -1;
								}
							}
						} else {
							return this.Ext.isEmpty(secondValue) ? 0 : -1;
						}
					},

					/**
					 * ########## ##### ######### ######### ######### ######.
					 * @private
					 * @param {Terrasoft.BaseModel} item ###### ######.
					 * @return {Function} ##### ######### ######### ######### ######.
					 */
					getCheckedChangedFn: function(item) {
						return function(model, value) {
							if (item.doNotTrackCheckedChange) {
								return;
							}
							if (value) {
								if (this.getIsNewAddressItem(item) && !this.tryShowAddressCard(item)) {
									return;
								}
								this.setActiveAddress(item);
							}
							var gridData = this.getGridData();
							gridData.each(function(row) {
								if (item !== row && row.get("Checked")) {
									row.set("Checked", false);
								}
							}, this);
						}.bind(this);
					},

					/**
					 * ########## ######### ### ######## ###### ###### ### ####### ####### ##########
					 * ### ######## "######## #####".
					 * @private
					 * @param {Terrasoft.BaseModel} item ###### ######.
					 * @return {Boolean} ####### ####, ### ######### ### ######## #########.
					 */
					tryShowAddressCard: function(item) {
						var orderInfo = this.get("OrderInfo");
						if (this.Ext.isEmpty(orderInfo.ContactId) && this.Ext.isEmpty(orderInfo.AccountId)) {
							this.Terrasoft.showInformation(
								this.get("Resources.Strings.RequiredFieldsMessage"),
								function() {
									item.doNotTrackCheckedChange = true;
									item.set("Checked", false);
									item.doNotTrackCheckedChange = false;
								},
								this
							);
							return false;
						}
						item.set("ShowNewAddressCard", true);
						return true;
					},

					/**
					 * ########## ####### ####, ######## ## ###### ######### "######## #####".
					 * @protected
					 * @param {Terrasoft.BaseModel} item ###### # #######.
					 * @return {boolean} ####### ####, ######## ## ###### ######### "######## #####".
					 */
					getIsNewAddressItem: function(item) {
						return (item ? (item.get("Id") === this.get("NewAddressItemId")) : false);
					},

					/**
					 * ############# ######## ######.
					 * @protected
					 * @param {Terrasoft.BaseModel} item ###### # #######.
					 */
					setActiveAddress: function(item) {
						var activeRow = this.get("ActiveRow");
						if (activeRow === item) {
							return;
						}
						this.set("ActiveRow", item);
						if (!this.getIsNewAddressItem(item)) {
							this.sandbox.publish("UpdateOrderAddress", {
								senderId: this.sandbox.id,
								deliveryAddress: item.get("FullAddress")
							}, [this.sandbox.id]);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#addProcessEntryPointColumn
					 * @overridden
					 */
					addProcessEntryPointColumn: this.Ext.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#updateDetail
					 * @overridden
					 */
					updateDetail: function() {
						this.callParent(arguments);
						this.set("IsGridDataLoaded", false);
						this.set("IsClearGridData", true);
						this.set("ActiveRow", null);
						this.set("SelectedRows", []);
						this.updateDetailInfo();
						this.loadGridData();
					},

					/**
					 * ######### ########## # ######.
					 * @protected
					 */
					updateDetailInfo: function() {
						this.set("DefaultValues", null);
						var detailInfo = this.getDetailInfo();
						this.set("MasterRecordId", detailInfo.masterRecordId);
						this.set("DetailColumnName", detailInfo.detailColumnName);
						this.set("CardPageName", detailInfo.cardPageName);
						this.set("SchemaName", detailInfo.schemaName);
						this.set("DefaultValues", detailInfo.defaultValues);
						var clientIds = {};
						this.Terrasoft.each(detailInfo.defaultValues, function(defValue) {
							if (["ContactId", "AccountId", "DeliveryAddress"].indexOf(defValue.name) > -1) {
								clientIds[defValue.name] = defValue.value;
							}
						}, this);
						this.set("OrderInfo", clientIds);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilters
					 * @overridden
					 */
					getFilters: function() {
						var filters = this.Terrasoft.createFilterGroup();
						var orderInfo = this.get("OrderInfo");
						var clientIds = [];
						if (orderInfo.ContactId) {
							clientIds.push(orderInfo.ContactId);
						}
						if (orderInfo.AccountId) {
							clientIds.push(orderInfo.AccountId);
						}
						if (clientIds.length > 0) {
							filters.addItem(this.Terrasoft.createColumnInFilterWithParameters("ClientId", clientIds));
						} else {
							filters.addItem(this.Terrasoft.createColumnIsNullFilter("ClientId"));
						}
						return filters;
					},

					/**
					 * ########## #### #######.
					 * @protected
					 * @return {String} ####.
					 */
					getProfileKey: function() {
						return this.get("CardPageName") + this.get("SchemaName");
					},

					/**
					 * ############# ######## config ### ########### ######## ###### "######## #####".
					 * @param {Object} viewConfig ############### ######.
					 * @param {Object} item ####### ######.
					 */
					onGetItemConfig: function(viewConfig, item) {
						var isNewItem = (this.get("NewAddressItemId") === item.get("Id"));
						var buttonContainerConfig = null;
						if (isNewItem && this.newItemContainerConfig) {
							buttonContainerConfig = this.newItemContainerConfig;
						} else if (!isNewItem && this.itemContainerConfig) {
							buttonContainerConfig = this.itemContainerConfig;
						}
						if (!buttonContainerConfig) {
							var buttonsConfig = this.getRadioButtonViewConfig();
							buttonContainerConfig = this.getButtonContainerConfig(isNewItem, buttonsConfig);
						}
						viewConfig.config = {"className": "Terrasoft.Container", "items": [buttonContainerConfig]};
					},

					/**
					 * Returns popup window offset.
					 * @protected
					 * @virtual
					 * @return {Array} Offset.
					 */
					getPopupOffset: function() {
						return [-this.popupWidth, 3];
					},

					/**
					 * Return view config for radio buttons container.
					 * @protected
					 * @param {Boolean} isNewItem Is "New address" radio button.
					 * @param {Object} buttonsConfig Radio buttons config.
					 * @return {Object} Radio buttons container config.
					 */
					getButtonContainerConfig: function(isNewItem, buttonsConfig) {
						var config = {};
						if (isNewItem) {
							config = {
								"className": "Terrasoft.PopUpContainer",
								"expanded": {"bindTo": "ShowNewAddressCard"},
								"show": {"bindTo": "showCard"},
								"hide": {"bindTo": "hideCard"},
								"innerContainerId": "ClientAddressAddPageV2Container",
								"containerConfig": {
									"className": "Terrasoft.Container",
									"classes": {"wrapClassName": ["add-address-schema-container"]},
									"items": []
								}
							};
							if (this.Terrasoft.getIsRtlMode()) {
								config.alignType = "tr-br?";
								config.offset = this.getPopupOffset();
							}
						} else {
							config = {"className": "Terrasoft.Container"};
						}
						config = this.Ext.apply(config, {
							"classes": {"wrapClassName": ["address-item-container", "new-address"]},
							"items": buttonsConfig
						});
						if (isNewItem) {
							this.newItemContainerConfig = config;
						} else {
							this.itemContainerConfig = config;
						}
						return config;
					},

					/**
					 * ########## ############ ############# #############.
					 * @protected
					 * @returns {Object} ############ ############# #############.
					 */
					getRadioButtonViewConfig: function() {
						if (this.Ext.isEmpty(this.radioButtonViewConfig)) {
							this.radioButtonViewConfig = [
								{
									"id": "addressItemButton",
									"className": "Terrasoft.RadioButton",
									"tag": true,
									"checked": {"bindTo": "Checked"},
									"markerValue": {"bindTo": "FullAddress"}
								},
								{
									"className": "Terrasoft.Label",
									"inputId": "addressItemButton",
									"caption": {"bindTo": "FullAddress"},
									"tips": [
										{
											"tip": {
												"content": {"bindTo": "Hint"},
												"style": Terrasoft.controls.TipEnums.style.GREEN,
												"displayMode": Terrasoft.controls.TipEnums.displayMode.NARROW,
												"enabled": {"bindTo": "HintEnabled"}
											},
											"settings": {
												"displayEvent": Terrasoft.controls.TipEnums.displayEvent.HOVER
											}
										}
									],
									"width": "auto",
									"classes": {"labelClass": ["address-item-label"]},
									"markerValue": {"bindTo": "Id"}
								}
							];
						}
						return this.radioButtonViewConfig;
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "AddressContainer",
						"parentName": "Detail",
						"propertyName": "items",
						"values": {
							"generateId": false,
							"id": "AddressContainerContainerList",
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"idProperty": "Id",
							"collection": "Collection",
							"observableRowNumber": 10,
							"maskVisible": {bindTo: "IsGridLoading"},
							"onGetItemConfig": "onGetItemConfig",
							"dataItemIdPrefix": "address-selection-item"
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


