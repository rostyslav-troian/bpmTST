Terrasoft.configuration.Structures["PartnershipMiniPage"] = {innerHierarchyStack: ["PartnershipMiniPage"], structureParent: "BaseMiniPage"};
define('PartnershipMiniPageStructure', ['PartnershipMiniPageResources'], function(resources) {return {schemaUId:'4bdbe0ec-eec0-4764-801b-bd67c5db94b9',schemaCaption: "Partnership mini page", parentSchemaName: "BaseMiniPage", schemaName:'PartnershipMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PartnershipMiniPage", ["ConfigurationConstants", "PartnershipNameBuilderMixin"],
		function(ConfigurationConstants) {
	return {
		entitySchemaName: "Partnership",
		attributes: {
			"MiniPageModes": {
				"value": [Terrasoft.ConfigurationEnums.CardOperation.ADD]
			},
			"PartnerLevel": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig": {
					"filter": function () {
						return this.getPartnerLevelFilter();
					}
				}
			},
			"Account": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"dependencies": [
					{
						"columns": ["Account"],
						"methodName": "getActivePartnerships"
					}
				],
				"lookupListConfig": {
					"filter": function () {
						return this.getAccountFilter();
					}
				}
			},
			"DueDate": {
				"dependencies": [
					{
						"columns": ["StartDate"],
						"methodName": "setPartnershipDueDate"
					}
				]
			},
			"PartnerType": {
				"dependencies": [
					{
						"columns": ["PartnerType"],
						"methodName": "onPartnerTypeChanged"
					}
				]
			},
			/**
			 * Partnership name.
			 */
			"Name": {
				"dependencies": [
					{
						"columns": ["Account", "StartDate"],
						"methodName": "setName"
					}
				]
			},

			/**
			 * Indicates that active partnerships by the account exists.
			 */
			"IsActivePartnershipExists": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": false
			}
		},
		mixins: {
			PartnershipNameBuilderMixin: "Terrasoft.PartnershipNameBuilderMixin"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseMiniPage#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function() {
				this.setName();
				this.getActivePartnerships();
				this.callParent(arguments);
			},

			/**
			 * Set name by template, defined in PartnershipNameBuilderMixin, if card is in new mode.
			 */
			setName: function() {
				if (this.isNewMode()) {
					this.$Name = this.buildPartnershipName(this.$Account, this.$StartDate);
				}
			},

			/**
			 * Sets IsActive column value.
			 */
			setIsActiveColumn: function() {
				this.$IsActive = true;
			},

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#setDefaultValues
			 * @overridden
			 */
			setDefaultValues: function(callback, scope) {
				this.callParent([function() {
					this.$StartDate = this.getCurrentDate();
					this.setPartnershipDueDate();
					this.setIsActiveColumn();
					callback.call(scope);
				}, this]);
			},

			/**
			 * Sets due date of the partnership.
			 * @protected
			 */
			setPartnershipDueDate: function() {
				if (this.isNotEmpty(this.$StartDate)) {
					this.$DueDate = this.Ext.Date.add(this.$StartDate, this.Ext.Date.YEAR, 1);
				}
			},

			/**
			 * Return current date.
			 * @protected
			 * @returns {Date} Current date.
			 */
			getCurrentDate: function() {
				return this.Terrasoft.clearTime(new Date());
			},

			/**
			 * Returns filter for PartnerLevel column.
			 * @protected
			 * @returns {Terrasoft.FilterGroup} Filter for PartnerLevel column.
			 */
			getPartnerLevelFilter: function () {
				const partnerType = this.$PartnerType && this.$PartnerType.value;
				const filters = this.Terrasoft.createFilterGroup();
				if (this.isEmpty(partnerType)) {
					filters.add("emptyFilter", this.Terrasoft.createColumnIsNullFilter("Id"));
					return filters;
				}
				const partnerTypeFilter =
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"PartnerType",
						partnerType);
				filters.add("partnerTypeFilter", partnerTypeFilter);
				return filters;
			},

			/**
			 * Returns filter for Account column.
			 * @protected
			 * @returns {Terrasoft.FilterGroup} Filter for Account column.
			 */
			getAccountFilter: function () {
				const filters = this.Terrasoft.createFilterGroup();
				const partnerTypeFilter =
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Type",
						ConfigurationConstants.AccountType.Partner);
				filters.add("accountPartnerType", partnerTypeFilter);
				return filters;
			},

			/**
			 * Partner type change action.
			 * @protected
			 */
			onPartnerTypeChanged: function () {
				this.$PartnerLevel = null;
			},

			/**
			 * Initialize sign of active partnership.
			 */
			getActivePartnerships: function () {
				const account = this.$Account && this.$Account.value;
				if (this.isEmpty(account)) {
					return;
				}
				this.$IsActivePartnershipExists = false;
				const esq = this.getActivePartnershipQuery(account);
				esq.getEntityCollection(function(response) {
					if (response.success && response.collection.getItems().length > 0) {
						this.$IsActivePartnershipExists = true;
					}
				}, this);
			},

			/**
			 * Returns query for selecting an active partnership by the account.
			 * @param accountId Identifier of account.
			 * @protected
			 * @returns {Terrasoft.EntitySchemaQuery} Active partnership query.
			 */
			getActivePartnershipQuery: function(accountId) {
				const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Partnership",
					rowCount: 1
				});
				esq.addColumn("Id");
				esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Account", accountId));
				esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "IsActive", true));
				return esq;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#validate
			 * @overridden
			 */
			validate: function () {
				if (!this.callParent(arguments)) {
					return false;
				}
				if (this.$IsActivePartnershipExists && this.$IsActive) {
					this.showInformationDialog(
						this.get("Resources.Strings.ExistingActivePartnershipMessage"));
					return false;
				}
				return true;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Account",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "PartnerType",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "PartnerLevel",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "StartDate",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "DueDate",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsActive",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 7,
						"colSpan": 24
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


