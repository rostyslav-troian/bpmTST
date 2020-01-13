Terrasoft.configuration.Structures["SAMLFieldNameConverterSection"] = {innerHierarchyStack: ["SAMLFieldNameConverterSection"], structureParent: "BaseLookupConfigurationSection"};
define('SAMLFieldNameConverterSectionStructure', ['SAMLFieldNameConverterSectionResources'], function(resources) {return {schemaUId:'0c12c43c-312b-4811-b232-ab426efff0cf',schemaCaption: "SAMLFieldNameConverterSection", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'SAMLFieldNameConverterSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SAMLFieldNameConverterSection", ["Contact"],
	function(contactEntity) {
		return {
			entitySchemaName: "SAMLFieldNameConverter",
			methods: {

				//region Methods: Private

				/**
				 * Sets current row contact field column lookup value.
				 * @private
				 * @param {Terrasoft.BaseViewModel} row Current grid row.
				 */
				_setColumnNameLookup: function(row) {
					var columnPath = row.get("ContactFieldName");
					var column = columnPath && contactEntity.getColumnByName(columnPath);
					if (this.isEmpty(column)) {
						return;
					}
					row.set("ContactFieldNameLookup", {
						displayValue: column.caption,
						value: column.uId
					});
				},

				/**
				 * Returns contact field column combobox control config.
				 * @private
				 * @return {Object} Contact field column combobox control config.
				 */
				_getContactFieldNameLookupConfig: function() {
					return {
						"name": "ContactFieldNameLookup",
						"dataValueType": Terrasoft.DataValueType.LOOKUP,
						"contentType": Terrasoft.ContentType.ENUM,
						"value": {
							"bindTo": "ContactFieldNameLookup",
							"bindConfig": {
								"converter": "onContactFieldNameChanged"
							}
						},
						"prepareList": {"bindTo": "fillContactColumnsList"}
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
						collection.each(this._setColumnNameLookup, this);
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
					if (entitySchemaColumn && entitySchemaColumn.name === "ContactFieldName") {
						var additionalControlConfig = this._getContactFieldNameLookupConfig()
						this.Ext.apply(result, additionalControlConfig);
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
 

