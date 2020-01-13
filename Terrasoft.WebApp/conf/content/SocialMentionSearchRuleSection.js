Terrasoft.configuration.Structures["SocialMentionSearchRuleSection"] = {innerHierarchyStack: ["SocialMentionSearchRuleSection"], structureParent: "BaseLookupConfigurationSection"};
define('SocialMentionSearchRuleSectionStructure', ['SocialMentionSearchRuleSectionResources'], function(resources) {return {schemaUId:'f1f03747-a51b-4acd-897d-da740ff3b987',schemaCaption: "User mention search rules section", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'SocialMentionSearchRuleSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("SocialMentionSearchRuleSection", [], function() {
		return {
			entitySchemaName: "SocialMentionSearchRule",
			methods: {

				//region Methods: Private

				/**
				 * Sets current row column lookup value.
				 * @private
				 * @param {Terrasoft.BaseViewModel} row Current grid row.
				 */
				_setColumnValues: function(row) {
					var schemaName = row.get("EntitySchema");
					if (this.isEmpty(schemaName)) {
						return;
					}
					Terrasoft.require([schemaName], function(entitySchema) {
						row.set("EntitySchemaLookup", {
							displayValue: entitySchema.caption,
							value: entitySchema.uId
						});
						var filterByColumnName = row.get("FilterByColumn");
						var filterByColumn = filterByColumnName && entitySchema.getColumnByName(filterByColumnName);
						var emptyString = Ext.emptyString;
						row.set("FilterByColumnLookup", {
							displayValue: filterByColumn && filterByColumn.caption || emptyString,
							value: filterByColumn && filterByColumn.uId || emptyString
						});
						var userColumnName = row.get("UserColumn");
						var userColumn = userColumnName && entitySchema.getColumnByName(userColumnName);
						row.set("UserColumnLookup", {
							displayValue: userColumn && userColumn.caption || emptyString,
							value: userColumn && userColumn.uId || emptyString
						});
					}, this);
				},

				/**
				 * Returns entity schema combobox control config.
				 * @private
				 * @return {Object} Entity schema column combobox control config.
				 */
				_getEntitySchemaLookupConfig: function() {
					return {
						"name": "EntitySchemaLookup",
						"dataValueType": Terrasoft.DataValueType.LOOKUP,
						"contentType": Terrasoft.ContentType.ENUM,
						"value": {
							"bindTo": "EntitySchemaLookup",
							"bindConfig": {
								"converter": "onEntitySchemaChanged"
							}
						},
						"prepareList": {"bindTo": "fillEntitySchemaList"}
					};
				},

				/**
				 * Returns filtration by column combobox control config.
				 * @private
				 * @return {Object} Filtration by column combobox control config.
				 */
				_getFilterByColumnLookupConfig: function() {
					return {
						"name": "FilterByColumnLookup",
						"dataValueType": Terrasoft.DataValueType.LOOKUP,
						"contentType": Terrasoft.ContentType.ENUM,
						"value": {
							"bindTo": "FilterByColumnLookup",
							"bindConfig": {
								"converter": "onFilterByColumnChanged"
							}
						},
						"prepareList": {"bindTo": "fillFilterByColumnsList"}
					};
				},

				/**
				 * Returns user column combobox control config.
				 * @private
				 * @return {Object} User field column combobox control config.
				 */
				_getUserColumnLookupConfig: function() {
					return {
						"name": "UserColumnLookup",
						"dataValueType": Terrasoft.DataValueType.LOOKUP,
						"contentType": Terrasoft.ContentType.ENUM,
						"value": {
							"bindTo": "UserColumnLookup",
							"bindConfig": {
								"converter": "onUserColumnChanged"
							}
						},
						"prepareList": {"bindTo": "fillUserColumnList"}
					};
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.configuration.mixins.GridUtilities#updateLoadedGridData
				 * @override
				 */
				updateLoadedGridData: function(response, callback, scope) {
					var collection = response.collection;
					if (response.success && collection) {
						collection.each(this._setColumnValues, this);
					}
					this.Ext.callback(callback, scope, [response]);
				},

				/**
				 * @inheritdoc Terrasoft.configuration.mixins.ConfigurationGridUtilities#getCellControlsConfig
				 * @override
				 */
				getCellControlsConfig: function(entitySchemaColumn) {
					var mixin = this.mixins.ConfigurationGridUtilities;
					var result = mixin.getCellControlsConfig.call(this, entitySchemaColumn);
					if (entitySchemaColumn && entitySchemaColumn.name === "EntitySchema") {
						this.Ext.apply(result, this._getEntitySchemaLookupConfig());
					}
					if (entitySchemaColumn && entitySchemaColumn.name === "FilterByColumn") {
						this.Ext.apply(result, this._getFilterByColumnLookupConfig());
					}
					if (entitySchemaColumn && entitySchemaColumn.name === "UserColumn") {
						this.Ext.apply(result, this._getUserColumnLookupConfig());
					}
					return result;
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[{
				"operation": "remove",
				"name": "activeRowActionCard"
			}]/**SCHEMA_DIFF*/
		};
	});
 

