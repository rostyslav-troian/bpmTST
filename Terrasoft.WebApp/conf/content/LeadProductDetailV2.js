Terrasoft.configuration.Structures["LeadProductDetailV2"] = {innerHierarchyStack: ["LeadProductDetailV2"], structureParent: "BaseGridDetailV2"};
define('LeadProductDetailV2Structure', ['LeadProductDetailV2Resources'], function(resources) {return {schemaUId:'107f1435-9932-445f-bc41-568000592c90',schemaCaption: "Detail schema - \"Product in lead\"", parentSchemaName: "BaseGridDetailV2", schemaName:'LeadProductDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadProductDetailV2", ["ConfigurationEnums"],
	function(configurationEnums) {
		return {
			entitySchemaName: "LeadProduct",
			methods: {
				/**
				 * ########## #######, ####### ###### ########## ########
				 * @return {Object} ########## ###### ########-############ #######
				 */
				getGridDataColumns: function() {
					return {
						"Id": {path: "Id"},
						"Product": {path: "Product"},
						"Product.Name": {path: "Product.Name"}
					};
				},

				/**
				 * Returns lookup config for product entity.
				 * @protected
				 * @virtual
				 * @return {Object} Lookup config.
				 */
				getProductLookupConfig: function() {
					var config = {
						entitySchemaName: "Product",
						multiSelect: true,
						columns: ["Name", "Price", "Currency"],
						filters: this.Terrasoft.createFilterGroup()
					};
					return config;
				},

				/**
				 * ######### ########## #########
				 * @private
				 */
				openProductLookup: function() {
					var config = this.getProductLookupConfig();
					var leadId = this.get("MasterRecordId");
					if (this.Ext.isEmpty(leadId)) {
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					esq.addColumn("Id");
					esq.addColumn("Product.Id", "ProductId");
					esq.filters.add("filterLead", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Lead", leadId));
					esq.getEntityCollection(function(result) {
						var existsProductsCollection = [];
						if (result.success) {
							result.collection.each(function(item) {
								existsProductsCollection.push(item.get("ProductId"));
							});
						}
						if (existsProductsCollection.length > 0) {
							var existsFilter = this.Terrasoft.createColumnInFilterWithParameters("Id",
								existsProductsCollection);
							existsFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
							existsFilter.Name = "existsFilter";
							config.filters.add("existsFilter", existsFilter);
						}
						this.openLookup(config, this.addCallBack, this);
					}, this);
				},

				/**
				 * @overridden
				 */
				onCardSaved: function() {
					this.openProductLookup();
				},

				/*
				 * ######### ########## ######### # ###### #### ######## #### #### ##### #########
				 * @overridden
				 * */
				addRecord: function() {
					var masterCardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNewRecord = (masterCardState.state === configurationEnums.CardStateV2.ADD ||
					masterCardState.state === configurationEnums.CardStateV2.COPY);
					if (isNewRecord === true) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
						return;
					}
					this.openProductLookup();
				},

				/*
				 * ########## ######## #########
				 * @private
				 * */
				addCallBack: function(args) {
					var bq = this.Ext.create("Terrasoft.BatchQuery");
					var leadId = this.get("MasterRecordId");
					this.selectedRows = args.selectedRows.getItems();
					this.selectedItems = [];
					this.selectedRows.forEach(function(item) {
						item.LeadId = leadId;
						item.ProductId = item.value;
						bq.add(this.getProductInsertQuery(item));
						this.selectedItems.push(item.value);
					}, this);
					if (bq.queries.length) {
						this.showBodyMask.call(this);
						bq.execute(this.onProductInsert, this);
					}
				},

				/*
				 * ########## ###### ## ########## ########
				 * @param item {Object} ############# #### # ######### # ########### #######   {LeadId, value}
				 * @private
				 * */
				getProductInsertQuery: function(item) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: this.entitySchemaName
					});
					insert.setParameterValue("Lead", item.LeadId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Product", item.ProductId, this.Terrasoft.DataValueType.GUID);
					return insert;
				},

				/*
				 * ######## ########## ######### # ######
				 * @private
				 * */
				onProductInsert: function(response) {
					this.hideBodyMask.call(this);
					this.beforeLoadGridData();
					var filterCollection = [];
					response.queryResults.forEach(function(item) {
						filterCollection.push(item.id);
					});
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					this.initQueryColumns(esq);
					esq.filters.add("recordId", Terrasoft.createColumnInFilterWithParameters("Id", filterCollection));
					esq.getEntityCollection(function(response) {
						this.afterLoadGridData();
						if (response.success) {
							var responseCollection = response.collection;
							this.prepareResponseCollection(responseCollection);
							this.getGridData().loadAll(responseCollection);
						}
					}, this);
				},

				/*
				 * ######## ######### #######
				 * @overridden
				 * */
				deleteRecords: function() {
					var selectedRows = this.getSelectedItems();
					if (selectedRows.length > 0) {
						this.set("SelectedRows", selectedRows);
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Product";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"rowDataItemMarkerColumnName": "Product"
					}
				},
				{
					"operation": "merge",
					"name": "AddRecordButton",
					"values": {
						"visible": {"bindTo": "getToolsVisible"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


