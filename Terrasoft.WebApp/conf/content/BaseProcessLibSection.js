Terrasoft.configuration.Structures["BaseProcessLibSection"] = {innerHierarchyStack: ["BaseProcessLibSection"], structureParent: "BaseSectionV2"};
define('BaseProcessLibSectionStructure', ['BaseProcessLibSectionResources'], function(resources) {return {schemaUId:'994e7d92-df2f-48ef-a38f-c66cac5c44c9',schemaCaption: "Base \"Process library\" section page schema", parentSchemaName: "BaseSectionV2", schemaName:'BaseProcessLibSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Base process library section.
 * Parent: BaseSectionV2
 */
define("BaseProcessLibSection", ["css!BaseProcessLibSectionCSS"], function() {
	return {
		attributes: {
			/**
			 * Section active process filter state.
			 */
			HasActiveProcessFilter: {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Section active process column name.
			 */
			ActiveProcessFilterColumnName: {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: "Enabled"
			}
		},
		methods: {

			/**
			 * @inheritdoc BaseSectionV2#getActiveViewGridSettingsProfile
			 * @overridden
			 */
			getActiveViewGridSettingsProfile: function(callback, scope) {
				this.callParent([function() {
					this.initHasActiveProcessFilter();
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * Initializes active process filter from user profile.
			 * @private
			 */
			initHasActiveProcessFilter: function() {
				var profile = this.getProfile();
				var profileValue = profile.HasActiveProcessFilter;
				if (Ext.isDefined(profileValue)) {
					this.set("HasActiveProcessFilter", profileValue);
				}
			},

			/**
			 * Adds active process filter.
			 * @private
			 * @param {Terrasoft.core.collections.Collection} filters Filters.
			 */
			addActiveProcessFilter: function(filters) {
				var hasActiveProcessFilter = this.get("HasActiveProcessFilter");
				if (hasActiveProcessFilter) {
					var columnName = this.get("ActiveProcessFilterColumnName");
					filters.addIfNotExists("ActiveProcess", this.Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, columnName, 1));
				} else {
					filters.removeByKey("ActiveProcess");
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getFilters.
			 * @overridden
			 */
			getFilters: function() {
				var filters = this.callParent(arguments);
				this.addActiveProcessFilter(filters);
				return filters;
			},

			/**
			 * Saves active process filter state in user profile.
			 * @private
			 * @param {Boolean} value Indicates if active process filter enabled.
			 */
			saveActiveProcessFilterInUserProfile: function(value) {
				var profile = this.get("Profile");
				profile.HasActiveProcessFilter = value;
				this.Terrasoft.utils.saveUserProfile(this.getProfileKey(), profile, false);
			},

			/**
			 * Handles active process filter checked changes.
			 * @param {Boolean} value Checked value.
			 */
			onActiveProcessFilterChecked: function(value) {
				this.saveActiveProcessFilterInUserProfile(value);
				if (this.get("IsSectionVisible")) {
					this.set("HasActiveProcessFilter", value);
					this.sandbox.publish("FiltersChanged", null, [this.sandbox.id]);
					this.reloadGridData();
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "HasActiveProcessFilterContainer",
				"parentName": "FiltersContainer",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["active-process-filter-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "HasActiveProcessFilterContainer",
				"propertyName": "items",
				"name": "HasActiveProcessFilter",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ActiveProcessFilterCaption"},
					"controlConfig": {
						"className": "Terrasoft.CheckBoxEdit",
						"checkedchanged": {
							"bindTo": "onActiveProcessFilterChecked"
						}
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


