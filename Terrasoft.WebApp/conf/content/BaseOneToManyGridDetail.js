Terrasoft.configuration.Structures["BaseOneToManyGridDetail"] = {innerHierarchyStack: ["BaseOneToManyGridDetail"], structureParent: "BaseGridDetailV2"};
define('BaseOneToManyGridDetailStructure', ['BaseOneToManyGridDetailResources'], function(resources) {return {schemaUId:'3adfc7da-b598-4c02-8af7-9be9fd542248',schemaCaption: "Detail base schema - List connection - One to many", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseOneToManyGridDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseOneToManyGridDetail", ["ConfigurationEnums"],
	function(enums) {
		return {
			methods: {
				/**
				 * ############## ###### ###### ## #########.
				 */
				initConfig: function() {
					this.baseDetailConfig = {
						lookupEntitySchema: "",
						sectionEntitySchema: "",
						lookupConfig: {
							multiSelect: true,
							filters: []
						}
					};
				},

				/**
				 * ########## ######### ######.
				 * @returns {Object} ######### ######.
				 */
				getConfig: function() {
					return this.baseDetailConfig ? this.baseDetailConfig : this.initConfig();
				},

				/**
				 * ######### ###### ####### ##### ########### ###### ## ######.
				 * @overridden
				 */
				addRecord: function() {
					var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNew = (cardState.state === enums.CardStateV2.ADD ||
						cardState.state === enums.CardStateV2.COPY);
					if (isNew) {
						this.set("CardState", enums.CardStateV2.ADD);
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
					} else {
						this.addDetailRecord();
					}
				},

				/**
				 * ######### ########## ####### ##### LookupEntitySchema ##### ##########
				 * ##### ###### ####### # ###### ########## ####### ## ######.
				 * @overridden
				 * @protected
				 * @virtual
				 */
				onCardSaved: function() {
					this.addDetailRecord();
				},

				/**
				 * ############## # ######### ########## ####### ##### LookupEntitySchema.
				 */
				addDetailRecord: function() {
					var config = this.getConfig();
					var masterRecordId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					esq.addColumn("Id");
					esq.addColumn(config.sectionEntitySchema);
					esq.filters.add("filterSectionEntity", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, config.sectionEntitySchema, masterRecordId));
					esq.getEntityCollection(function(result) {
						var existsRequestCollection = [];
						if (result.success) {
							result.collection.each(function(item) {
								existsRequestCollection.push(item.get("Id"));
							});
						}
						var lookupConfig = {
							entitySchemaName: config.lookupEntitySchema,
							sectionEntitySchema: config.sectionEntitySchema,
							multiSelect: config.lookupConfig.multiSelect,
							hideActions: config.lookupConfig.hideActions,
							valuePairs: this.get("DefaultValues")
						};
						var filtersCollection = this.Terrasoft.createFilterGroup();
						filtersCollection.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
						var mainFilters = this.getMainFilters(existsRequestCollection);
						if (mainFilters) {
							filtersCollection.addItem(mainFilters);
						}
						var additionalFilters = this.getAdditionalFilters();
						if (additionalFilters) {
							filtersCollection.addItem(additionalFilters);
						}
						lookupConfig.filters = filtersCollection;
						this.openLookup(lookupConfig, this.addCallBack, this);
					}, this);
				},

				/**
				 * ########## ######## #######.
				 * @param {Array} entityCollection ######### LookupEntity
				 * @protected
				 * @returns {Terrasoft.FilterGroup} #######.
				 */
				getMainFilters: function(entityCollection) {
					var config = this.getConfig();
					var filtersCollection = this.Terrasoft.createFilterGroup();
					filtersCollection.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
					if (entityCollection.length > 0) {
						var existsFilter = this.Terrasoft.createColumnInFilterWithParameters("Id",
							entityCollection);
						existsFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
						existsFilter.Name = "existsFilter";
						filtersCollection.add(existsFilter);
					}
					var emptyFilter = this.Terrasoft.createColumnIsNullFilter(config.sectionEntitySchema);
					emptyFilter.Name = "emptyFilter";
					filtersCollection.add(emptyFilter);
					return filtersCollection;
				},

				/**
				 * ########## ############## #######.
				 * @protected
				 * @virtual
				 * @returns {Terrasoft.FilterGroup} #######.
				 */
				getAdditionalFilters: function() {
					return null;
				},

				/**
				 * ######### ######## ###### ## ######.
				 * @param {Object} args
				 * @private
				 */
				addCallBack: function(args) {
					var config = this.getConfig();
					var masterRecordId = this.get("MasterRecordId");
					this.selectedRows = args.selectedRows.getItems();
					var selectedItems = [];
					this.selectedRows.forEach(function(item) {
						selectedItems.push(item.Id);
					}, this);
					if (selectedItems.length !== 0) {
						var update = this.getLookupEntityUpdateQuery(selectedItems);
						update.setParameterValue(config.sectionEntitySchema, masterRecordId,
							this.Terrasoft.DataValueType.GUID);
						update.execute(function() {
							this.onLookupEntityUpdate.call(this, selectedItems);
						}, this);
					} else {
						this.updateDetail({reloadAll: true});
					}
				},

				/**
				 * ########## ###### ## ############ ####### ##### #### ## ######.
				 * @param {Array} items  ######### LookupEntity
				 * @private
				 */
				getLookupEntityUpdateQuery: function(items) {
					var update = Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: this.entitySchemaName
					});
					var	idFilter = update.createColumnInFilterWithParameters("Id", items);
					update.filters.add("IdFilter", idFilter);
					return update;
				},

				/**
				 * ######### ###### # ##########.
				 * @param {Array} items ######### LookupEntity
				 * @private
				 */
				onLookupEntityUpdate: function(items) {
					this.hideBodyMask.call(this);
					this.beforeLoadGridData();
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchema: this.entitySchema
					});
					this.initQueryColumns(esq);
					esq.filters.add("Id", Terrasoft.createColumnInFilterWithParameters("Id", items));
					esq.getEntityCollection(function(response) {
						this.afterLoadGridData();
						if (response.success) {
							var responseCollection = response.collection;
							this.prepareResponseCollection(responseCollection);
							this.getGridData().loadAll(responseCollection);
						}
					}, this);
				},

				/**
				 * ####### ######### ######.
				 * @overridden
				 * */
				deleteRecords: function() {
					var config = this.getConfig();
					var selectedRows = this.getSelectedItems();
					var update = this.getLookupEntityUpdateQuery(selectedRows);
					update.setParameterValue(config.sectionEntitySchema, null, this.Terrasoft.DataValueType.GUID);
					update.execute(function() {
						selectedRows.forEach(function(item) {
							this.getGridData().removeByKey(item);
						}, this);
					}, this);
				}
			},
			diff: [
				{
					"operation": "remove",
					"name": "CopyRecordMenu"
				},
				{
					"operation": "remove",
					"name": "EditRecordMenu"
				}
			]
		};
	});


