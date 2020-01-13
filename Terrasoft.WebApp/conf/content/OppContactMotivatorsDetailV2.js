Terrasoft.configuration.Structures["OppContactMotivatorsDetailV2"] = {innerHierarchyStack: ["OppContactMotivatorsDetailV2"], structureParent: "BaseGridDetailV2"};
define('OppContactMotivatorsDetailV2Structure', ['OppContactMotivatorsDetailV2Resources'], function(resources) {return {schemaUId:'ccbec0fb-4b5d-4efd-967f-5f3424d49902',schemaCaption: "OppContactMotivatorsDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'OppContactMotivatorsDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OppContactMotivatorsDetailV2", [], function() {
		return {
			entitySchemaName: "OppContactMotivator",
			methods: {
				/**
				 * ########## ####### ## ###### ########.
				 * @inheritdoc BaseGridDetailV2#addRecord
				 * @overridden
				 */
				addRecord: function() {
					var args = {
						isSilent: true,
						messageTags: [this.sandbox.id]
					};
					this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
				},

				/**
				 * ########## ####### ######### ########## # ####### ######.
				 * @inheritdoc BaseGridDetailV2#onCardSaved
				 * @overridden
				 */
				onCardSaved: function() {
					var config = {
						entitySchemaName: "OppContactMotivators",
						multiSelect: true,
						columns: ["Name", "Type", "Description"]
					};
					var opportunityContactId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "OpportunityContact"
					});
					esq.addColumn("Contact");
					esq.filters.add("filterOpportunityContact", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", opportunityContactId));
					esq.getEntityCollection(function(result) {
						if (result.success) {
							this.openLookup(config, this.addCallBack, this);
						}
					}, this);
				},

				/*
				 * ########## ######## ######### ### ######### ##########
				 * @private
				 * */
				addCallBack: function(args) {
					var existingRecords = [];
					var opportunityContactId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					esq.addColumn("ContactMotivator");
					esq.filters.add("filterOpportunityContact", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "OpportunityContact", opportunityContactId));
					esq.getEntityCollection(function(result) {
						if (result.success) {
							Terrasoft.each(result.collection.getItems(), function(item) {
								existingRecords.push(item.values.ContactMotivator.value);
							}, this);
						}
						var bq = this.Ext.create("Terrasoft.BatchQuery");
						var opportunityContactId = this.get("MasterRecordId");
						this.selectedRows = args.selectedRows.getItems();
						this.selectedItems = [];
						this.selectedRows.forEach(function(item) {
							if (existingRecords.indexOf(item.value) === -1) {
								item.OpportunityContactId = opportunityContactId;
								bq.add(this.getOppContactMotivatorInsertQuery(item));
								this.selectedItems.push(item.value);
							}
						}, this);
						if (bq.queries.length) {
							this.showBodyMask.call(this);
							bq.execute(this.onOppContactMotivatorInsert, this);
						}
					}, this);
				},

				/*
				 * ########## ###### ## ########## ######## ##########
				 * @param args {Object} ############# ########## # ######### # ########### #######   {ActivityId, value}
				 * @private
				 * */
				getOppContactMotivatorInsertQuery: function(item) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: this.entitySchemaName
					});
					insert.setParameterValue("ContactMotivator", item.value, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("OpportunityContact", item.OpportunityContactId,
						this.Terrasoft.DataValueType.GUID);
					return insert;
				},

				/*
				 * ######## ########## ######### # ######
				 * @private
				 * */
				onOppContactMotivatorInsert: function(response) {
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
					this.updateContactMotivator();
				},

				/*
				 * ######## ######### #######, ##### ### # ####### #### - #############
				 * @overridden
				 * */
				onDeleted: function() {
					this.callParent(arguments);
					this.updateContactMotivator();
				},

				/**
				 * ######### ########## ######## ######## # #######
				 * @protected
				 * @virtual
				 */
				updateContactMotivator: function() {
					var update = Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "OpportunityContact"
					});
					var filters = update.filters;
					var opportunityContactId = this.get("MasterRecordId");
					var opportunityContactIdFilter = update.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Id", opportunityContactId);
					filters.add("opportunityContactIdFilterFilter", opportunityContactIdFilter);
					var existingRecords = [];
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					var displayColumn = esq.addColumn("ContactMotivator.Name", "ContactMotivatorName");
					displayColumn.orderDirection = Terrasoft.OrderDirection.ASC;
					esq.filters.add("filterOpportunityContact", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "OpportunityContact", opportunityContactId));
					esq.getEntityCollection(function(result) {
						if (result.success) {
							Terrasoft.each(result.collection.getItems(), function(item) {
								existingRecords.push(item.values.ContactMotivatorName);
							}, this);
						}
						var contactMotivator = "";
						var index = 0;
						Terrasoft.each(existingRecords, function(existingRecord) {
							contactMotivator += existingRecord;
							index++;
							if (existingRecords.length > index) {
								contactMotivator += ", ";
							}
						}, this);
						update.setParameterValue("ContactMotivator", contactMotivator, Terrasoft.DataValueType.TEXT);
						update.execute();
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * ########## ######### ###### ########## ######
				 * @returns {boolean}
				 */
				getAddRecordButtonVisible: function() {
					return this.getToolsVisible();
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"primaryDisplayColumnName": "ContactMotivator",
					"values": {
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "NameListedGridColumn",
									"bindTo": "ContactMotivator.Name",
									"position": {
										"column": 1,
										"colSpan": 6
									}
								},
								{
									"name": "TypeTitleListedGridColumn",
									"bindTo": "ContactMotivator.Type.Name",
									"position": {
										"column": 7,
										"colSpan": 6
									}
								},
								{
									"name": "DescriptionListedGridColumn",
									"bindTo": "ContactMotivator.Description",
									"position": {
										"column": 13,
										"colSpan": 12
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 2
							},
							"items": [
								{
									"name": "NameTiledGridColumn",
									"bindTo": "ContactMotivator.Name",
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 12
									}
								},
								{
									"name": "TypeTiledGridColumn",
									"bindTo": "ContactMotivator.Type.Name",
									"position": {
										"row": 1,
										"column": 13,
										"colSpan": 12
									}
								},
								{
									"name": "DescriptionTiledGridColumn",
									"bindTo": "ContactMotivator.Description",
									"position": {
										"row": 2,
										"column": 1,
										"colSpan": 24
									}
								}
							]
						}
					}
				},

				{
					"operation": "merge",
					"name": "EditRecordMenu",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "CopyRecordMenu",
					"values": {
						"visible": false
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


