Terrasoft.configuration.Structures["BaseManyToManyGridDetail"] = {innerHierarchyStack: ["BaseManyToManyGridDetail"], structureParent: "BaseGridDetailV2"};
define('BaseManyToManyGridDetailStructure', ['BaseManyToManyGridDetailResources'], function(resources) {return {schemaUId:'2ff3b2fa-5b9d-4e9a-8831-ce498329d553',schemaCaption: "Detail base schema - List connection - Many to many", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseManyToManyGridDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
//TODO: ####### # ######### #####
define("BaseManyToManyGridDetail", ["ConfigurationEnums"],
	function(ConfigurationEnums) {
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
				 * ######### ###### ## ####### ### ############ ## ###### #######.
				 * @returns {Terrasoft.EntitySchemaQuery}
				 */
				getAlreadyExistsRecordsQuery: function() {
					var config = this.getConfig();
					var masterRecordId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					esq.addColumn(config.lookupEntitySchema);
					esq.addColumn(config.sectionEntitySchema);
					esq.filters.add("sectionSchemaFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, config.sectionEntitySchema, masterRecordId));
					return esq;
				},

				/**
				 * ########## ####### ###### ###### "########".
				 */
				addRecord: function() {
					var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNew = (cardState.state === ConfigurationEnums.CardStateV2.ADD ||
						cardState.state === ConfigurationEnums.CardStateV2.COPY);
					if (isNew) {
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
				 * ######### ########## ####### ##### LookupEntitySchema.
				 */
				addDetailRecord: function() {
					var lookupConfig = {};
					var config = this.getConfig();
					var esq = this.getAlreadyExistsRecordsQuery();
					esq.getEntityCollection(function(result) {
						var existsCollection = [];
						if (result.success) {
							result.collection.each(function(item) {
								var record = item.get(config.lookupEntitySchema);
								existsCollection.push(record.value);
							}, this);
						}
						var filterGroup = Terrasoft.createFilterGroup();
						if (existsCollection.length > 0) {
							var existsFilter = this.Terrasoft.createColumnInFilterWithParameters("Id",
								existsCollection);
							existsFilter.Name = "existsFilter";
							existsFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
							filterGroup.add("existsFilter", existsFilter);
							for (var filter in this.baseDetailConfig.lookupConfig.filters) {
								filterGroup.add(this.Terrasoft.utils.generateGUID(),
									config.lookupConfig.filters[filter]);
							}
						}
						this.Ext.apply(lookupConfig, config.lookupConfig);
						lookupConfig.filters = filterGroup;
						this.openLookup(lookupConfig, this.addRecordCallback, this);
					}, this);
				},

				/**
				 * ######### ########## ####### ##### LookupEntitySchema ##### ##########
				 * ##### ###### ####### # ###### ########## ####### ## ######.
				 * @overridden.
				 * @protected.
				 * @virtual.
				 */
				onCardSaved: function() {
					this.addDetailRecord();
				},

				/**
				 * ######### ###### # ####### ##### ########.
				 * @param args ######### ######.
				 */
				addRecordCallback: function(args) {
					var bq = Ext.create("Terrasoft.BatchQuery");
					this.selectedRows = args.selectedRows.getItems();
					this.selectedItems = [];
					this.selectedRows.forEach(function(item) {
						bq.add(this.getSchemaInsertQuery(item));
						this.selectedItems.push(item.value);
					}, this);
					if (bq.queries.length) {
						bq.execute(this.onRecordsInserted, this);
					}
				},

				/**
				 * #### ######### ########## ####### ## ######.
				 */
				onRecordsInserted: function() {
					this.updateDetail({reloadAll: true});
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return this.getToolsVisible();
				},

				/**
				 * ######### # ########## ###### ## ########## ####### # ####### ##### ########.
				 * @param item ###### ### ##########.
				 * @returns {Terrasoft.InsertQuery} ###### ## ##########.
				 */
				getSchemaInsertQuery: function(item) {
					var config = this.getConfig();
					var masterRecordId = this.get("MasterRecordId");
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: this.entitySchemaName
					});
					insert.setParameterValue(config.sectionEntitySchema, masterRecordId,
						this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue(config.lookupEntitySchema, item.value, this.Terrasoft.DataValueType.GUID);
					return insert;
				}
			},
			diff: [
				{
					"operation": "remove",
					"name": "AddTypedRecordButton"
				},
				{
					"operation": "remove",
					"name": "EditRecordMenu"
				},
				{
					"operation": "remove",
					"name": "CopyRecordMenu"
				}
			]
		};
	}
);


