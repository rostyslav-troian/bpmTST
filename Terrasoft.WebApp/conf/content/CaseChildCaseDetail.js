Terrasoft.configuration.Structures["CaseChildCaseDetail"] = {innerHierarchyStack: ["CaseChildCaseDetail"], structureParent: "BaseGridDetailV2"};
define('CaseChildCaseDetailStructure', ['CaseChildCaseDetailResources'], function(resources) {return {schemaUId:'68b5905b-b836-42e0-9dad-c0e56066ecec',schemaCaption: "Subordinate cases detail in Cases section", parentSchemaName: "BaseGridDetailV2", schemaName:'CaseChildCaseDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseChildCaseDetail", ["ConfigurationEnums", "CaseChildCaseDetailResources", "RelationshipsRecordsUtilities",
	"RelationshipsRecordsUtilities"],
	function(enums, resources) {
		return {
			entitySchemaName: "Case",
			mixins: {
				RelationshipsRecordsUtilities: "Terrasoft.RelationshipsRecordsUtilities"
			},
			methods: {
				/**
				 * @inheritdoc BaseGridDetailV2#addRecord
				 * @overriden
				 */
				addRecord: function() {
					if(this.isNewCase()){
						Terrasoft.utils.showInformation(resources.localizableStrings.UnSavedCaseMessage);
					} else {
						this.addDetailRecord();
					}
				},
				/**
				 * Check if case card is new or copy
				 * @private
				 * @returns {boolean}
				 */
				isNewCase: function() {
					var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNew = (cardState.state === enums.CardStateV2.ADD ||
					cardState.state === enums.CardStateV2.COPY);
					return isNew;
				},
				/**
				 * ######### ########## ####### ##### LookupEntitySchema ##### ##########
				 * ##### ###### ####### # ###### ########## ####### ## ######.
				 * @overridden
				 * @protected
				 * @virtual
				 */
				onCardSaved: function() {
					this.callParent(arguments);
					this.addDetailRecord();
				},
				/**
				 * ########## ####### "########### #########" ####### "#########"
				 * @private
				 * */
				addDetailRecord: function() {
					this.openComponentsLookup();
				},
				/**
				 * ######## ###### ######### ############ ####### ######## "#########"
				 * @obsolete
				 * @param {String} item
				 */
				getParentCollection: function(item) {
					var config = {
						serviceName: "HierarchicalRecordSelectService",
						methodName: "GetRecords",
						data: {
							request: {
								Id: item,
								SchemaTableName: "Case",
								ParentIdColumnName: "ParentCaseId",
								Type: "parent"
							}
						}
					};
					this.callService(config, this.onSelectRecords, this);
				},
				/**
				 * callBack ####### getParentCollection, ######## ######## ########### "#########"
				 * @private
				 * @param {Object} responseObject
				 */
				onSelectRecords: function(responseObject) {
					var result = responseObject.GetRecordsResult;
					if (result) {
						this.set("CaseParentCollection", result);
					}
					this.openComponentsLookup();
				},
				/**
				 * Open lookup of available "ConfItem" for filtering:
				 * not current Case, not parent Case, not child Case.
				 * @private
				 */
				openComponentsLookup: function() {
					var columnNames = ["ParentCase"];
					var parentRecord = this.sandbox.publish("GetColumnsValues", columnNames, [this.sandbox.id]);
					var masterRecordId = this.get("MasterRecordId");
					var filtersCollection = this.mixins.RelationshipsRecordsUtilities.getHierarchicalFilter.call(this,
						masterRecordId, parentRecord.ParentCase, "ParentCase");
					var config = {
						entitySchemaName: "Case",
						multiSelect: true
					};
					config.filters = filtersCollection;
					this.Terrasoft.LookupUtilities.Open({
						"lookupConfig": config,
						"sandbox": this.sandbox,
						"valuePairs": this.get("DefaultValues")
					}, this.addCallBack, this);
				},
				/**
				 * callBack ####### addRecord, ########### "############ #########" # "#########"
				 * @private
				 * @param {Object} args
				 */
				addCallBack: function(args) {
					var parentCaseId = this.get("MasterRecordId");
					this.selectedRows = args.selectedRows.getItems();
					var selectedItems = [];
					this.selectedRows.forEach(function(item) {
						selectedItems.push(item.Id);
					}, this);
					if (selectedItems.length !== 0) {
						var config = this.mixins.RelationshipsRecordsUtilities.getConfig(parentCaseId,
								selectedItems, "Case", "ParentCaseId");
						this.callService(config, function(response) {
							this.addElementInHierarchy(response, selectedItems);
						}, this);
					} else {
						this.updateDetail({reloadAll: true});
					}
				},
				/**
				 * Service callback, set child ConfItem into ConfItem.
				 * @private
				 * @param {Object} responseObject
				 * @param {Object} selectedItems
				 */
				addElementInHierarchy: function(responseObject, selectedItems) {
					if(responseObject) {
						var result = responseObject.UpdateRecordsResult;
						if (result.success) {
							this.onUpdate.call(this, selectedItems);
						} else {
							Terrasoft.utils.showInformation(result.errorInfo.message);
						}
					}
				},
				/**
				 * ########## ###### ## ############ "############# #########" # "#########"
				 * @param {Array} items (Case)
				 * @private
				 * */
				getUpdateQuery: function(items) {
					var update = Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: this.entitySchemaName
					});
					update.filters.add("IdFilter", update.createColumnInFilterWithParameters("Id", items));
					return update;
				},
				/**
				 * ######## #######
				 * @param {Array} selectedItems (Case)
				 * @private
				 * */
				onUpdate: function(selectedItems) {
					this.hideBodyMask.call(this);
					this.beforeLoadGridData();
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchema: this.entitySchema
					});
					this.initQueryColumns(esq);
					esq.filters.add("Id", Terrasoft.createColumnInFilterWithParameters("Id", selectedItems));
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
				 * ######## ######### #######
				 * @overridden
				 * */
				deleteRecords: function() {
					var selectedRows = this.getSelectedItems();
					var update = this.getUpdateQuery(selectedRows);
					update.setParameterValue("ParentCase", null, this.Terrasoft.DataValueType.GUID);
					update.execute(function() {
						this.getGridData().removeByKey(selectedRows[0]);
					}, this);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "CopyRecordMenu"
				},
				{
					"operation": "remove",
					"name": "EditRecordMenu"
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


