Terrasoft.configuration.Structures["CustomerAccessLookupPage"] = {innerHierarchyStack: ["CustomerAccessLookupPage"]};
define('CustomerAccessLookupPageStructure', ['CustomerAccessLookupPageResources'], function(resources) {return {schemaUId:'d25a0995-22b3-4d99-bf1f-a382db5379b3',schemaCaption: "CustomerAccessLookupPage", parentSchemaName: "", schemaName:'CustomerAccessLookupPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CustomerAccessLookupPage", ["CustomerAccessLookupPageResources", "ControlGridModule",
		"css!CustomerAccessLookupPageCSS", "css!LookupPageCSS", "css!BaseFontsCSS"],
	function(resources) {
		return {
			messages: {
				/**
				 * Hides module container and returns selected value.
				 * @message HideCustomerAccessLookupPageModule
				 */
				"HideCustomerAccessLookupPageModule": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * Gets customer access list.
				 * @message GetCustomerAccessLookupPageConfig
				 */
				"GetCustomerAccessLookupPageConfig": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Current selected value.
				 * @type {String}
				 */
				"SelectedValue": {
					dataValueType: this.Terrasoft.DataValueType.GUID,
					value: null
				},
				/**
				 * Id of the loading mask.
				 * @type {String}
				 */
				"MaskId": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					value: 0
				},
				/**
				 * Collection of customer accesses.
				 * @type {Terrasoft.BaseViewModelCollection}
				 */
				"CustomerAccessCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					value: null
				},
				/**
				 * Flag indicates that collection of customer accesses is empty.
				 * @type {Boolean}
				 */
				"IsCustomerAccessCollectionEmpty": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			methods: {
				/**
				 * @param {Object} values View model column values.
				 * @private
				 */
				_createCustomerAccessItemViewModel: function(values) {
					return this.Ext.create("Terrasoft.BaseViewModel", {
						columns: {
							"Id": {
								dataValueType: Terrasoft.DataValueType.GUID,
								type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
							},
							"Url": {
								dataValueType: Terrasoft.DataValueType.TEXT,
								type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
							},
							"Description": {
								dataValueType: Terrasoft.DataValueType.TEXT,
								type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
							},
							"ExpirationDate": {
								dataValueType: Terrasoft.DataValueType.TEXT,
								type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
							},
							"CustomerId": {
								dataValueType: Terrasoft.DataValueType.TEXT,
								type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
							}
						},
						values: values
					});
				},

				/**
				 * @param {Object} itemConfig Service response with customer access items array.
				 * @return {Terrasoft.BaseViewModel} view model item for list data grid.
				 * @private
				 */
				_createCustomerAccessItem: function(itemConfig) {
					const cultureName = Terrasoft.Resources.CultureSettings.currentCultureName;
					return this._createCustomerAccessItemViewModel({
						Id: itemConfig.accessId,
						Url: itemConfig.url,
						Description: itemConfig.description,
						ExpirationDate: Terrasoft.toLocaleDate(new Date(itemConfig.expirationDate), cultureName),
						CustomerId: itemConfig.customerId
					});
				},

				/**
				 * @param {Array} customerAccesses Customer access list array.
				 * @private
				 */
				_fillCustomerAccessCollection: function(customerAccesses) {
					if (Terrasoft.isEmpty(customerAccesses)) {
						this.$IsCustomerAccessCollectionEmpty = true;
						return;
					}
					const collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					Terrasoft.each(customerAccesses, function(elem) {
						const item = this._createCustomerAccessItem(elem);
						collection.add(item.$Id, item);
					}, this);
					this.$CustomerAccessCollection.loadAll(collection);
					if (!this.$SelectedValue) {
						this.$SelectedValue = customerAccesses[0].accessId;
					}
				},

				/**
				 * @param {Object} responseObject Response of service that provides customer access list.
				 * @param {Object} response Http response provided by ajax provider.
				 * @private
				 */
				_loadListServiceResponse: function(responseObject, response) {
					if (Terrasoft.isEmpty(responseObject) || !responseObject.result) {
						this.error(Ext.String.format("[{0}] {1}",
							response.status, response.responseText || response.statusText));
						Terrasoft.showErrorMessage(this.get("Resources.Strings.ServiceErrorMessage"), function() {
							this.hideModule();
						}, this);
						return;
					}
					const responseResult = responseObject.result || {};
					if (this.$MaskId) {
						Terrasoft.Mask.hide(this.$MaskId);
					}
					this._fillCustomerAccessCollection(responseResult);
				},

				/**
				 * Initializes list collection.
				 * @private
				 */
				_initCollection: function() {
					const collection = this.get("CustomerAccessCollection");
					if (this.isEmpty(collection)) {
						this.set("CustomerAccessCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
					}
				},

				/**
				 * Requests actual config and refreshes customer access list.
				 * @private
				 */
				_refreshModuleInfo: function() {
					const config = this.sandbox.publish("GetCustomerAccessLookupPageConfig", null, [this.sandbox.id]);
					if (!config) {
						return;
					}
					if (config.operation === "refresh") {
						this._loadData(config);
					} else {
						throw new Terrasoft.NotImplementedException();
					}
				},

				/**
				 * @param {Object} config Config for querying customer access list.
				 * @private
				 */
				_loadData: function(config) {
					this.callService({
							serviceName: "TempAccessService",
							methodName: "GetTempAccessList",
							data: {
								customerIds: config.customerIds
							}
						},
						this._loadListServiceResponse, this);
				},

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#init
				 * @override
				 */
				init: function() {
					this._initCollection();
					this._refreshModuleInfo();
					this.callParent(arguments);
				},

				/**
				 * Hides module container.
				 * @protected
				 */
				hideModule: function(arg1, arg2, arg3, tag) {
					if (this.$MaskId) {
						Terrasoft.Mask.hide(this.$MaskId);
					}
					const selectedValue = (tag === "select") ? this.$SelectedValue : null;
					const selectedAccessConfig =
						(selectedValue) ? this.$CustomerAccessCollection.get(selectedValue).values : null;
					if (selectedAccessConfig && !selectedAccessConfig.Url) {
						Terrasoft.showErrorMessage(this.get("Resources.Strings.ClientUriEmptyErrorMessage"));
						return;
					}
					this.sandbox.publish("HideCustomerAccessLookupPageModule", selectedAccessConfig, [this.sandbox.id]);
				},

				/**
				 * Handles double click on the grid.
				 * @protected
				 */
				onGridDoubleClick: function() {
					this.hideModule(null, null, null, "select");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "CustomerAccessContainerWrapper",
					"values": {
						"id": "CustomerAccessContainerWrapper",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["customer-access-container-wrapper", "containerLookupPage",
							"container-lookup-page-fixed"],
						"markerValue": "customer-access-container",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CustomerAccessHeadContainer",
					"parentName": "CustomerAccessContainerWrapper",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CustomerAccessHeaderNameContainer",
					"parentName": "CustomerAccessHeadContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["header-name-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CustomerAccessCloseIconContainer",
					"parentName": "CustomerAccessHeadContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["close-icon-container", "header-name-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Title",
					"parentName": "CustomerAccessHeaderNameContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.Title"},
						"labelConfig": {
							"classes": ["customer-access-title"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "CustomerAccessCloseIconContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": resources.localizableImages.CloseIcon,
						"classes": {"wrapperClass": ["close-btn-user-class"]},
						"selectors": {"wrapEl": "#headContainer"},
						"click": "$hideModule"
					}
				},
				{
					"operation": "insert",
					"name": "CustomerAccessButtonsContainer",
					"parentName": "CustomerAccessContainerWrapper",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["controlsContainerLookupPage"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SelectButton",
					"parentName": "CustomerAccessButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": resources.localizableStrings.SelectButtonCaption,
						"click": "$hideModule",
						"tag": "select",
						"enabled": "$SelectedValue",
						"classes": {"textClass": ["main-buttons"]},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "CustomerAccessButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": resources.localizableStrings.CancelButtonCaption,
						"click": "$hideModule",
						"classes": {"textClass": ["main-buttons"]}
					}
				},
				{
					"operation": "insert",
					"name": "CustomerAccessGridContainer",
					"parentName": "CustomerAccessContainerWrapper",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["customer-access-container", "containerLookupPage"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DataGrid",
					"parentName": "CustomerAccessGridContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID,
						"className": "Terrasoft.ControlGrid",
						"type": "listed",
						"columnsConfig": [
							{
								"cols": 8,
								"key": [
									{"name": {"bindTo": "Url"}}
								],
								"classes": ["col-url"]
							},
							{
								"cols": 12,
								"key": [
									{"name": {"bindTo": "Description"}}
								],
								"classes": ["col-description"]
							},
							{
								"cols": 4,
								"key": [
									{"name": {"bindTo": "ExpirationDate"}}
								],
								"classes": ["col-expiration-date"]
							}
						],
						"captionsConfig": [
							{
								"cols": 8,
								"name": resources.localizableStrings.ColumnCaptionUrl
							},
							{
								"cols": 12,
								"name": resources.localizableStrings.ColumnCaptionDescription
							},
							{
								"cols": 4,
								"name": resources.localizableStrings.ColumnCaptionExpirationDate
							}
						],
						"listedZebra": true,
						"collection": "$CustomerAccessCollection",
						"primaryColumnName": "Id",
						"activeRow": "$SelectedValue",
						"multiSelect": false,
						"openRecord": {"bindTo": "onGridDoubleClick"},
						"isEmpty": {"bindTo": "IsCustomerAccessCollectionEmpty"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


