Terrasoft.configuration.Structures["ContactOpenCasesDetail"] = {innerHierarchyStack: ["ContactOpenCasesDetail"], structureParent: "BaseGridDetailV2"};
define('ContactOpenCasesDetailStructure', ['ContactOpenCasesDetailResources'], function(resources) {return {schemaUId:'15159bb1-2f48-41a7-afeb-8df56f3f0341',schemaCaption: "Detail schema - Contact open cases", parentSchemaName: "BaseGridDetailV2", schemaName:'ContactOpenCasesDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactOpenCasesDetail", [],
	function() {
		return {
			entitySchemaName: "Case",
			messages: {
				/**
				 * @message UpdateOpenCaseDetail
				 * Open case detail event message handler.
				 */
				"UpdateOpenCaseDetail": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetCaseIdOpenCaseDetail
				 * Gets the identifier of current case.
				 */
				"GetCaseIdOpenCaseDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Stores an identifier of current case.
				 */
				"CaseId": {
					dataValueType: this.Terrasoft.DataValueType.GUID
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"activeRowActions": []
					}
				},
				{
					"operation": "insert",
					"name": "OpenRecordButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						//TODO localizablestring
						"caption": "Open",//{ "bindTo": "Resources.Strings.OpenButtonCaption"},
						"tag": "open"
					}
				},
				{
					"operation": "insert",
					"name": "MergeRecordButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						//TODO localizablestring
						"caption": "Merge doubles",//{ "bindTo": "Resources.Strings.MergeCaption"},
						"tag": "merge"
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {

				/**
				 * Initializes initial data.
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initData(function() {
							this.subscribeDetailSandboxEvents();
							callback.call(scope);
						}, this);
					}, this]);
				},

				/**
				 * Subscribes to the messages  necessary for detail.
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
				 * Gets the collection of filters.
				 * @overridden
				 * @returns {Terrasoft.FilterGroup} Detail filter group.
				 */
				getFilters: function() {
					var detailFilters = this.get("DetailFilters");
					var serializationDetailInfo = detailFilters.getDefSerializationInfo();
					serializationDetailInfo.serializeFilterManagerInfo = true;
					var deserializedDetailFilters = Terrasoft.deserialize(detailFilters.serialize(serializationDetailInfo));
					var contactCaseFilterGroup = this.getContactCaseFilters();
					deserializedDetailFilters.add("masterRecordFilter", contactCaseFilterGroup);
					return deserializedDetailFilters;
				},

				/**
				 * Returns filter for cases over contacts.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Filter over contacts.
				 */
				getContactCaseFilters: function() {
					var contactCaseFilterGroup = this.Ext.create("Terrasoft.FilterGroup");
					var masterRecordId = this.get("MasterRecordId") ? this.get("MasterRecordId") : Terrasoft.GUID_EMPTY;
					var caseId = this.sandbox.publish("GetCaseIdOpenCaseDetail", null, [this.sandbox.id]);
					this.set("CaseId", caseId);
					contactCaseFilterGroup.add("ContactCaseFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Contact", masterRecordId)
					);
					contactCaseFilterGroup.add("CaseIdFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", caseId)
					);
					contactCaseFilterGroup.add("IsFinaleStatusFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Status.IsFinal", false)
					);
					return contactCaseFilterGroup;
				},

				/**
				 *
				 * @protected
				 * @param buttonTag
				 * @param primaryColumnValue
				 */
				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					switch (buttonTag) {
						case "open":
							this.editRecord();
							break;
						case "merge":
							this.mergeDuplicates();
							break;
						default:
							break;
					}
				},
				mergeDuplicates: function() {
					//TODO
				}
			}
		};
	});


