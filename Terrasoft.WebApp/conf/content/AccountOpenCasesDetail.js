Terrasoft.configuration.Structures["AccountOpenCasesDetail"] = {innerHierarchyStack: ["AccountOpenCasesDetail"], structureParent: "BaseGridDetailV2"};
define('AccountOpenCasesDetailStructure', ['AccountOpenCasesDetailResources'], function(resources) {return {schemaUId:'cb2aab73-e094-43f0-aee3-9eeebf786c53',schemaCaption: "Detail schema - Account open cases", parentSchemaName: "BaseGridDetailV2", schemaName:'AccountOpenCasesDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountOpenCasesDetail",
	function() {
		return {
			entitySchemaName: "Case",
			attributes: {
				/**
				 * Stores an identifier of case.
				 */
				"CaseId": {
					dataValueType: this.Terrasoft.DataValueType.GUID
				}
			},
			diff:/**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/,
			methods: {
				init: function(callback, scope) {
					this.callParent([function() {
						this.initData(function() {
							this.subscribeDetailSandboxEvents();
							callback.call(scope);
						}, this);
					}, this]);
				},

				/**
				 * Subscribes to messages necessary for detail.
				 * @protected
				 * @virtual
				 */
				subscribeDetailSandboxEvents: function() {
					this.sandbox.subscribe("UpdateOpenCaseDetail", function(config) {
						if (this.destroyed) {
							return;
						}
						this.updateDetail(config);
					}, this, [this.sandbox.id]);
				},

				/**
				 * Gets filter collection.
				 * @overridden
				 * @returns {Terrasoft.FilterGroup} detail filter group.
				 */
				getFilters: function() {
					var detailFilters = this.get("DetailFilters");
					var serializationDetailInfo = detailFilters.getDefSerializationInfo();
					serializationDetailInfo.serializeFilterManagerInfo = true;
					var deserializedDetailFilters = Terrasoft.deserialize(detailFilters.serialize(serializationDetailInfo));
					var accountCaseFilterGroup = this.getAccountCaseFilters();
					deserializedDetailFilters.add("masterRecordFilter", accountCaseFilterGroup);
					return deserializedDetailFilters;
				},

				/**
				 * Returns relationship filter.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Relationship filter.
				 */
				getAccountCaseFilters: function() {
					var accountCaseFilterGroup = this.Ext.create("Terrasoft.FilterGroup");
					var masterRecordId = this.get("MasterRecordId") ? this.get("MasterRecordId") : Terrasoft.GUID_EMPTY;
					var caseId = this.sandbox.publish("GetCaseIdOpenCaseDetail", null, [this.sandbox.id]);
					this.set("CaseId", caseId);
					accountCaseFilterGroup.add("AccountCaseFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Account", masterRecordId)
					);
					accountCaseFilterGroup.add("CaseIdFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", caseId)
					);
					accountCaseFilterGroup.add("IsFinaleStatusFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Status.IsFinal", false)
					);
					return accountCaseFilterGroup;
				}
			},
			messages: {
				/**
				 * @message UpdateDetail
				 * Page change message handler
				*/
				"UpdateOpenCaseDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetCaseIdOpenCaseDetail
				 * Gets the identifier of current case.
				 */
				"GetCaseIdOpenCaseDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			}
		};
	});


