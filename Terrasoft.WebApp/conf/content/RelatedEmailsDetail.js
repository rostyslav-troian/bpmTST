Terrasoft.configuration.Structures["RelatedEmailsDetail"] = {innerHierarchyStack: ["RelatedEmailsDetail"], structureParent: "BaseGridDetailV2"};
define('RelatedEmailsDetailStructure', ['RelatedEmailsDetailResources'], function(resources) {return {schemaUId:'073ae0b9-9717-44e7-8726-54653acdfee6',schemaCaption: "RelatedEmails", parentSchemaName: "BaseGridDetailV2", schemaName:'RelatedEmailsDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("RelatedEmailsDetail", ["RelatedEmailsMixin"],
	function() {
		return {
			entitySchemaName: "Activity",
			attributes: {
				/**
				 * Master record conversation identifier.
				 * @type {String}
				 */
				"ConversationId": {
					dataValueType: Terrasoft.DataValueType.GUID
				}
			},
			mixins: {
				/**
				 * Related emails search mixin.
				 */
				RelatedEmailsMixin: "Terrasoft.RelatedEmailsMixin",

			},
			methods: {

				//region Methods: Private

				/**
				 * Creates detail filters collection.
				 * @private
				 * @return {Terrasoft.FilterGroup} Detail filters collection.
				 */
				_getDetailFilters: function() {
					var detailFilters = this.$DetailFilters;
					var serializationDetailInfo = detailFilters.getDefSerializationInfo();
					serializationDetailInfo.serializeFilterManagerInfo = true;
					return Terrasoft.deserialize(detailFilters.serialize(serializationDetailInfo));
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						Terrasoft.chain(
							this.initConversationId,
							function() {
								this.Ext.callback(callback, scope || this);
							},
							this
						);
					}, this]);
				},

				/**
				 * Initializes email conversation identifier.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				initConversationId: function(callback, scope) {
					this.getConversationId(this.$MasterRecordId, function(conversationId) {
						this.$ConversationId = conversationId;
						this.reloadGridData();
						this.Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#loadGridData
				 * @overridden
				 */
				loadGridData: function() {
					if (this.isEmpty(this.$ConversationId)) {
						return;
					}
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filters = this._getDetailFilters();
					this.setEmailsByConversationFilters(filters, this.$ConversationId);
					return filters;
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


