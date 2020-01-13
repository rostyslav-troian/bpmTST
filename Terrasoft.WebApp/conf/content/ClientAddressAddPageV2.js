Terrasoft.configuration.Structures["ClientAddressAddPageV2"] = {innerHierarchyStack: ["ClientAddressAddPageV2"]};
define('ClientAddressAddPageV2Structure', ['ClientAddressAddPageV2Resources'], function(resources) {return {schemaUId:'fb0dd87d-ffe4-4fdc-aa02-13fadbd17aec',schemaCaption: "ClientAddressAddPageV2", parentSchemaName: "", schemaName:'ClientAddressAddPageV2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ClientAddressAddPageV2", ["ConfigurationConstants", "BusinessRuleModule", "css!OrderPageV2Styles",
		"LookupQuickAddMixin"], function(ConfigurationConstants, BusinessRuleModule) {
	return {
		entitySchemaName: "VwClientAddress",
		mixins: {
			LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin"
		},
		messages: {
			/**
			 * @message GetClientInfo
			 * Used for get information abount client.
			 * @param {Object} Information abount client.
			 */
			"GetClientInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CloseAddressPage
			 * Used for closing current page.
			 */
			"CloseAddressPage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			/**
			 * Closes current page.
			 */
			close: function() {
				this.sandbox.publish("CloseAddressPage", null, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#showBodyMask
			 * @overridden
			 */
			showBodyMask: function() {
				this.set("PageMaskVisible", true);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#hideBodyMask
			 * @overridden
			 */
			hideBodyMask: function() {
				this.set("PageMaskVisible", false);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				var orderInfo = this.sandbox.publish("GetClientInfo", null, [this.sandbox.id]);
				this.set("ClientInfo", orderInfo || {});
				this.set("Id", this.Terrasoft.generateGUID());
			},

			/**
			 * Returns true if save button need to be active otherwise false.
			 * @return {Boolean}
			 */
			getIsSaveButtonEnabled: function() {
				var isAnyValueSet = false;
				var columnsToCheck = ["Country", "Region", "City", "Zip", "Address"];
				this.Terrasoft.each(columnsToCheck, function(columnName) {
					var value = this.get(columnName);
					if (value) {
						if (value.value) {
							value = value.value;
						}
						value = String.prototype.trim.call(value);
					}
					isAnyValueSet = !this.Ext.isEmpty(value);
					if (isAnyValueSet) {
						return false;
					}
				}, this);
				return isAnyValueSet;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getSaveQuery
			 * @overridden
			 */
			getSaveQuery: function() {
				var orderInfo = this.get("ClientInfo");
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				var deliveryAddressType = ConfigurationConstants.AddressTypes.Delivery;
				var savedAddresses = [];
				if (orderInfo.ContactId) {
					savedAddresses.push(this.get("Id"));
					var contactInsert = this.callParent(arguments);
					contactInsert.rootSchema = null;
					contactInsert.rootSchemaName = "ContactAddress";
					contactInsert.columnValues.setParameterValue("Contact", {value: orderInfo.ContactId},
						this.Terrasoft.DataValueType.LOOKUP);
					contactInsert.columnValues.setParameterValue("AddressType",
						deliveryAddressType,
						this.Terrasoft.DataValueType.LOOKUP);
					batchQuery.add(contactInsert);
				}
				if (orderInfo.AccountId) {
					var accountAddressId = this.Terrasoft.generateGUID();
					this.set("Id", accountAddressId);
					savedAddresses.push(accountAddressId);
					this.insertQuery = null;//this.insertQuery was cashed in base class in getInsertQuery method.
					var accountInsert = this.callParent(arguments);
					accountInsert.rootSchema = null;
					accountInsert.rootSchemaName = "AccountAddress";
					accountInsert.columnValues.setParameterValue("Account", {value: orderInfo.AccountId},
						this.Terrasoft.DataValueType.LOOKUP);
					accountInsert.columnValues.setParameterValue("AddressType",
						deliveryAddressType,
						this.Terrasoft.DataValueType.LOOKUP);
					batchQuery.add(accountInsert);
				}
				this.set("SavedAddresses", savedAddresses);
				return batchQuery;
			},

			/**
			 * Saves address.
			 * @protected
			 * @param {Object} [config] Parameters.
			 * @param {Function} [config.callback] Callback function.
			 * @param {Object} [config.scope] Callback scope.
			 */
			save: function(config) {
				this.showBodyMask();
				this.saveEntity(function() {
					this.hideBodyMask();
					config = config || {};
					this.sandbox.publish("CloseAddressPage", {addressIds: this.get("SavedAddresses")}, [this.sandbox.id]);
					this.Ext.callback(config.callback, config.scope || this);
				}, this);
			},

			/**
			 * Used by businness rules applier.
			 * @deprecated
			 * @private
			 * @return {Boolean}
			 */
			isCopyMode: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getLookupQuery
			 * @overridden
			 */
			getLookupQuery: function(filterValue, columnName) {
				var esq = this.callParent(arguments);
				var filterGroup = this.getLookupQueryFilters(columnName);
				esq.filters.addItem(filterGroup);
				return esq;
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PopUpCardContentWrapper",
				"values": {
					"id": "PopUpCardContentWrapper",
					"selectors": {"wrapEl": "#PopUpCardContentWrapper"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["card-content-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PopUpCardContentContainer",
				"parentName": "PopUpCardContentWrapper",
				"propertyName": "items",
				"values": {
					"id": "PopUpCardContentContainer",
					"selectors": {"wrapEl": "#PopUpCardContentContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["center-main-container"],
					"items": [],
					"markerValue": "CenterMainContainer"
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "PopUpCardContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-container-margin-bottom"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Header",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Country",
				"values": {
					"bindTo": "Country",
					"layout": {"column": 0, "row": 0, "colSpan": 23},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"autocomplete": "no-address"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Region",
				"values": {
					"bindTo": "Region",
					"layout": {"column": 0, "row": 1, "colSpan": 23},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"autocomplete": "no-address"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "City",
				"values": {
					"bindTo": "City",
					"layout": {"column": 0, "row": 2, "colSpan": 23},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"autocomplete": "no-address"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Zip",
				"values": {
					"bindTo": "Zip",
					"layout": {"column": 0, "row": 3, "colSpan": 23},
					"controlConfig": {
						"autocomplete": "no-address"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Address",
				"values": {
					"bindTo": "Address",
					"layout": {"column": 0, "row": 4, "colSpan": 23},
					"controlConfig": {
						"autocomplete": "no-address"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ButtonsContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"wrapClass": ["buttons-container"],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PopupSaveButton",
				"parentName": "ButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "save"},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"enabled": {"bindTo": "getIsSaveButtonEnabled"},
					"tag": "save",
					"markerValue": "SaveButton"
				}
			},
			{
				"operation": "insert",
				"name": "PopupCloseButton",
				"parentName": "ButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "close"},
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"tag": "close",
					"markerValue": "CloseButton"
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {
			"Region": {
				"FiltrationRegionByCountry": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					autoClean: true,
					baseAttributePatch: "Country",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Country"
				}
			},
			"City": {
				"FiltrationCityByCountry": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					autoClean: true,
					baseAttributePatch: "Country",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Country"
				},
				"FiltrationCityByRegion": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					autoClean: true,
					baseAttributePatch: "Region",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					attribute: "Region"
				}
			}
		}
	};
});


