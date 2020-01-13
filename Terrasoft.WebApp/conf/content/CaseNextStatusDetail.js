Terrasoft.configuration.Structures["CaseNextStatusDetail"] = {innerHierarchyStack: ["CaseNextStatusDetail"], structureParent: "BaseGridDetailV2"};
define('CaseNextStatusDetailStructure', ['CaseNextStatusDetailResources'], function(resources) {return {schemaUId:'4072cac8-1075-4952-8fc0-e0597540b770',schemaCaption: "Detail schema - Next statuses in Case statuses lookup", parentSchemaName: "BaseGridDetailV2", schemaName:'CaseNextStatusDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseNextStatusDetail", ["ConfigurationEnums"],
	function(enums) {
		return {
			entitySchemaName: "CaseNextStatus",
			attributes: {},
			diff: /**SCHEMA_DIFF*/[],/**SCHEMA_DIFF*/
			methods: {
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
				 * ######### ###### ## ####### ### ############ ## ###### #######.
				 * @returns {Terrasoft.EntitySchemaQuery}
				 */
				getAlreadyExistsRecordsQuery: function() {
					var masterRecordId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "CaseNextStatus"
					});
					esq.addColumn("NextStatus");
					esq.filters.add("sectionSchemaFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Status", masterRecordId));
					return esq;
				},
				/**
				 * ########## ########### ###### ########## ######.
				 * @overridden
				 * @return {Boolean}
				 */
				getAddRecordButtonEnabled: function() {
					var isFinalStaus = this.sandbox.publish("UpdateIsFinalStatus", null, [this.sandbox.id]);
					return !isFinalStaus;
				},
				/**
				 * ########## #######
				 * @overridden
				 * */
				addRecord: function() {
					this.set("CardState", enums.CardStateV2.ADD);
					var args = {
						isSilent: true,
						messageTags: [this.sandbox.id]
					};
					this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
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
				 * ######### ########## ####### ##### LookupEntitySchema.
				 */
				addDetailRecord: function() {
					var lookupConfig = {
						entitySchemaName: "CaseStatus",
						multiSelect: true,
						valuePairs: this.get("DefaultValues")
					};
					var esq = this.getAlreadyExistsRecordsQuery();
					esq.getEntityCollection(function(result) {
						var existsCollection = [];
						if (result.success) {
							result.collection.each(function(item) {
								var record = item.get("NextStatus");
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
						}
						filterGroup.add("notSelfFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", this.get("MasterRecordId")));
						lookupConfig.filters = filterGroup;
						this.openLookup(lookupConfig, this.addRecordCallback, this);
					}, this);
				},
				/**
				 * ######### ###### # ####### ##### ########.
				 * @param {Object} args ######### ######.
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
				 * ######### # ########## ###### ## ########## ####### # ####### ##### ########.
				 * @param {Object} item ###### ### ##########.
				 * @returns {Terrasoft.InsertQuery} ###### ## ##########.
				 */
				getSchemaInsertQuery: function(item) {
					var masterRecordId = this.get("MasterRecordId");
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "CaseNextStatus"
					});
					insert.setParameterValue("Status", masterRecordId,
						this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("NextStatus", item.value, this.Terrasoft.DataValueType.GUID);
					return insert;
				},
				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @overridden
				 */
				getAddRecordButtonVisible: function() {
					return true;
				}
			},
			messages: {
				/**
				 * @message UpdateIsFinalStatus
				 * ######## ###### ## ######### ######## ######### #########.
				 */
				"UpdateIsFinalStatus": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			}
		};
	}
);


