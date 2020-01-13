Terrasoft.configuration.Structures["DcmActivityUserTaskPropertiesPage"] = {innerHierarchyStack: ["DcmActivityUserTaskPropertiesPage"], structureParent: "ActivityUserTaskPropertiesPage"};
define('DcmActivityUserTaskPropertiesPageStructure', ['DcmActivityUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'89ebc3a4-2d81-431d-8342-d5c4d9cfc602',schemaCaption: "DcmActivityUserTaskPropertiesPage", parentSchemaName: "ActivityUserTaskPropertiesPage", schemaName:'DcmActivityUserTaskPropertiesPage',parentSchemaUId:'f771cce5-2ce8-4784-8c8d-dcf67ff3ac5d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDcmSchemaElementPropertiesPage => ActivityUserTaskPropertiesPage => BaseActivityUserTaskPropertiesPage
 * => BaseUserTaskPropertiesPage => ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("DcmActivityUserTaskPropertiesPage", [],
	function() {
		return {

			/**
			 * Use base DCM schema.
			 * @type {Boolean}
			 */
			useBaseDcmSchema: true,

			attributes: {
				/**
				 * Activity result list.
				 */
				"ActivityResultList": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * @inheritdoc Terrasoft.BaseDcmSchemaElementPropertiesPage#UseConditions
				 * @override
				 */
				"UseConditions": {
					"value": true
				}
			},

			methods: {

				// region Methods: Private

				_initActivityResultList: function(callback, scope) {
					var esq = new Terrasoft.EntitySchemaQuery({rootSchemaName: "ActivityCategoryResultEntry"});
					esq.addColumn("ActivityCategory");
					esq.addColumn("[ActivityResult:Id:ActivityResult].Id", "ResultId");
					esq.addColumn("[ActivityResult:Id:ActivityResult].Name", "ResultName", {
						orderDirection: Terrasoft.OrderDirection.ASC,
						orderPosition: 1
					});
					esq.execute(function(response) {
						this.set("ActivityResultList", response.collection);
						callback.call(scope);
					}, this);
				},

				_subscribeActivityCategoryChanged: function() {
					this.on("change:ActivityCategory", this._onActivityCategoryChanged, this);
				},

				_onActivityCategoryChanged: function() {
					var conditions = this.get("Conditions");
					conditions.clear();
				},

				// endregion

				// region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function(callback, scope) {
					var parentMethod = this.getParentMethod();
					this._initActivityResultList(function() {
						parentMethod.call(this, callback, scope);
					}, this);
				},

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @override
				 */
				onElementDataLoad: function(element, callback, scope) {
					this.callParent([element, function() {
						this._subscribeActivityCategoryChanged();
						callback.call(scope);
					}, this]);
				},

				/**
				 * @inheritdoc BaseDcmSchemaElementPropertiesPage#getConditionsResultList
				 * @override
				 */
				getConditionsResultList: function() {
					var activityCategory = this.get("ActivityCategory");
					if (Ext.isEmpty(activityCategory)) {
						return null;
					}
					var allResultList = this.get("ActivityResultList");
					var resultsByCategory = allResultList.filterByFn(function(item) {
						return item.get("ActivityCategory").value === activityCategory.value;
					}, this);
					var preparedResults = {};
					resultsByCategory.each(function(item) {
						var id = item.get("ResultId");
						var name = item.get("ResultName");
						preparedResults[id] = {
							value: id,
							displayValue: name
						};
					}, this);
					return preparedResults;
				}

				// endregion

			},

			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	}
);


