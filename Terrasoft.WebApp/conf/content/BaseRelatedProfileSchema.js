Terrasoft.configuration.Structures["BaseRelatedProfileSchema"] = {innerHierarchyStack: ["BaseRelatedProfileSchema"], structureParent: "BaseProfileSchema"};
define('BaseRelatedProfileSchemaStructure', ['BaseRelatedProfileSchemaResources'], function(resources) {return {schemaUId:'afa47510-d914-49f0-a9b1-549d70ad643d',schemaCaption: "BaseRelatedProfileSchema", parentSchemaName: "BaseProfileSchema", schemaName:'BaseRelatedProfileSchema',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseRelatedProfileSchema", [],
		function() {
			return {
				messages: {
					/**
					 * @message ProfileEntityColumnChanges
					 * Processes changes of profile entity column.
					 * @param {Object} changedColumn Master's changed column.
					 * @param {String} changedColumn.columnValue Column value.
					 * @param {String} changedColumn.columnName Column name.
					 */
					"ProfileEntityColumnChanges": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetProfileEntityColumnChanges
					 * Sends requested column values.
					 * @param {String[]} columnNames Array identifiers columns.
					 */
					"GetProfileEntityColumnChanges": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message ProfileOpenCard
					 * Sends open card request with config.
					 * @param {Object} config Config for open card.
					 * @param {String} config.moduleId Module identifier.
					 * @param {String} config.schemaName Entity schema name.
					 * @param {String} config.operation Record operation/
					 * @param {String} config.id Primary column value.
					 * @param {Array} config.defaultValues Array of default values.
					 */
					"ProfileOpenCard": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#subscribeSandboxEvents
					 * @overridden
					 */
					subscribeSandboxEvents: function() {
						this.sandbox.subscribe("ProfileEntityColumnChanges", this.onColumnChanged, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#initEntity
					 * @overridden
					 */
					initEntity: function() {
						var masterColumnName = this.get("masterColumnName");
						var columnValues = this.sandbox.publish("GetProfileEntityColumnChanges", [masterColumnName],
								[this.sandbox.id]);
						if (this.checkIsNeedLoadEntity(columnValues)) {
							this.loadEntity(columnValues);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#openCard
					 * @overridden
					 */
					openCard: function(operation, typeColumnValue, recordId) {
						var config = this.getOpenCardConfig(operation, typeColumnValue, recordId);
						this.sandbox.publish("ProfileOpenCard", config, [this.sandbox.id]);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "ProfileModuleActions"
					},
					{
						"operation": "remove",
						"name": "BlankSlateContainer"
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


