Terrasoft.configuration.Structures["CampaignDiagramPropertyCreateLeadPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyCreateLeadPage"], structureParent: "CampaignDiagramPropertyEntityPage"};
define('CampaignDiagramPropertyCreateLeadPageStructure', ['CampaignDiagramPropertyCreateLeadPageResources'], function(resources) {return {schemaUId:'b56042b9-fd25-4f2f-b456-30d86a3b71ab',schemaCaption: "CampaignDiagramPropertyCreateLeadPage", parentSchemaName: "CampaignDiagramPropertyEntityPage", schemaName:'CampaignDiagramPropertyCreateLeadPage',parentSchemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyCreateLeadPage", ["CampaignDiagramPropertyCreateLeadPageResources", "terrasoft",
		"LeadConfigurationConst"],
	function(resources, Terrasoft, LeadConfigurationConst) {
		return {
			entitySchemaName: "Lead",
			attributes: {},
			methods: {
				/**
				* @inheritdoc Terrasoft.CampaignDiagramPropertyEntityPage#init
				* @overridden
				*/
				init: function(callback, scope) {
					this.callParent([function() {
						this.loadLeadColumnValues();
						var leadLookupColumns = this.getLeadLookupColumns();
						Terrasoft.each(leadLookupColumns, function(column) {
							this.on("change:" + column, this.onLeadColumnChanged, this);
						}, this);
						callback.call(scope);
					}, this]);
				},

				/**
				 * ########## ##### ########## ##### #### ## ######## #######.
				 * @protected
				 */
				getLeadLookupColumns: function() {
					return ["LeadType", "LeadTypeStatus", "QualifyStatus", "LeadMedium",
						"RegisterMethod", "Owner"];
				},

				/**
				 * ########## ##### ########## ##### #### ## ######## #######.
				 * @protected
				 */
				getInitialColumnValues: function() {
					return [
						{
							ColumnName: "QualifyStatus",
							ColumnValue: LeadConfigurationConst.LeadConst.QualifyStatus.Distribution
						},
						{
							ColumnName: "LeadTypeStatus",
							ColumnValue: LeadConfigurationConst.LeadConst.LeadTypeStatus.ThereIsInterest
						},
						{
							ColumnName: "RegisterMethod",
							ColumnValue: LeadConfigurationConst.LeadConst.LeadRegisterMethod.CreatedAutomatically
						},
						{
							ColumnName: "LeadMedium",
							ColumnValue: LeadConfigurationConst.LeadConst.LeadMedium.Email
						}
					];
				},

				/**
				 * ########## ####### change ### ##### # ########## ## #########.
				 * @protected
				 */
				onLeadColumnChanged: function() {
					var config = {
						elementId: this.get("DiagramElementId"),
						addInfo: {}
					};
					var devValues = [];
					var leadLookupColumns = this.getLeadLookupColumns();
					Terrasoft.each(leadLookupColumns, function(columnName) {
						var columnValue = this.get(columnName);
						var lookupValue = (columnValue && columnValue.value) ? columnValue.value : null;
						this.appendLeadDefaultValue(devValues, columnName, lookupValue);
					}, this);
					config.addInfo.CreateLeadDefaultValues = devValues;
					this.sandbox.publish("UpdateDiagramElement", config);
				},

				/**
				 * ######### # ######### ##### ## ######### ##### ########.
				 * @protected
				 * @param {Array} columnCollection ######### ##### ## #########.
				 * @param {String} columnName ### ####.
				 * @param {Object} columnValue ######## ####.
				 */
				appendLeadDefaultValue: function(columnCollection, columnName, columnValue) {
					var defColumn = {
						ColumnName: columnName,
						ColumnValue: columnValue
					};
					columnCollection.push(defColumn);
				},

				/**
				 * ######### ######## ##### # ######## ## ####### #########.
				 * @protected
				 */
				loadLeadColumnValues: function() {
					var addInfo = this.get("DiagramElementAddInfo");
					if (addInfo && addInfo.CreateLeadDefaultValues) {
						var savedValues = addInfo.CreateLeadDefaultValues;
						Terrasoft.each(savedValues, function(savedValue) {
							if (savedValue.ColumnValue) {
								this.loadLookupDisplayValue(savedValue.ColumnName, savedValue.ColumnValue);
							}
						}, this);
					} else {
						var initialValues = this.getInitialColumnValues();
						Terrasoft.each(initialValues, function(initialValue) {
							this.loadLookupDisplayValue(initialValue.ColumnName, initialValue.ColumnValue);
						}, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.CampaignDiagramPropertyEntityPage#clearEntityColumns
				 * @overridden
				 */
				clearEntityColumns: Terrasoft.emptyFn,

				/**
				 * ######### ######## ###### ## ########### ### ######## ######## ######.
				 * @protected
				 * @param {Object} args #########.
				 * @param {Object} columnName ### ####.
				 */
				loadVocabulary: function(args, columnName) {
					var config = this.getLookupPageConfig(args, columnName);
					this.openLookup(config, this.onLookupResult, this);
				},

				/**
				 * ########## ######### ######## ###### ## ###########.
				 * @protected
				 * @param {Object} args #########.
				 * @param {String} columnName ######## #######.
				 * @return {Object} ######### ######## ###### ## ###########.
				 */
				getLookupPageConfig: function(args, columnName) {
					var config = {
						entitySchemaName: this.getLookupEntitySchemaName(args, columnName),
						multiSelect: false,
						columnName: columnName,
						columnValue: this.get(columnName),
						searchValue: args.searchValue,
						filters: this.getLookupQueryFilters(columnName)
					};
					this.Ext.apply(config, this.getLookupListConfig(columnName));
					return config;
				},

				/**
				 * ########## ######## ##### ####### ########### ####.
				 * @protected
				 * @param {Object} args #########.
				 * @param {String} columnName ######## #######.
				 * @return {String} ######## ##### ########### ####.
				 */
				getLookupEntitySchemaName: function(args, columnName) {
					var entityColumn = this.entitySchema.getColumnByName(columnName);
					return args.schemaName || entityColumn.referenceSchemaName;
				},

				/**
				 * ########## ########## # ########## ########## #######.
				 * @private
				 * @param {String} columnName ######## #######.
				 * @return {Object|null} ########## # ########## ########## #######.
				 */
				getLookupListConfig: function(columnName) {
					var schemaColumn = this.getColumnByName(columnName);
					if (!schemaColumn) {
						return null;
					}
					var lookupListConfig = schemaColumn.lookupListConfig;
					if (!lookupListConfig) {
						return null;
					}
					var excludedProperty = ["filters", "filter"];
					var config = {};
					this.Terrasoft.each(lookupListConfig, function(property, propertyName) {
						if (excludedProperty.indexOf(propertyName) === -1) {
							config[propertyName] = property;
						}
					});
					return config;
				},

				/**
				 * ######### #######, ####### ############# ## ########## ####.
				 * @private
				 * @param {String} columnName ######## #######.
				 * @return {Terrasoft.FilterGroup} ########## ###### ########.
				 */
				getLookupQueryFilters: function(columnName) {
					var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					var column = this.columns[columnName];
					var lookupListConfig = column.lookupListConfig;
					if (lookupListConfig) {
						var filterArray = lookupListConfig.filters;
						this.Terrasoft.each(filterArray, function(item) {
							var filter;
							if (Ext.isObject(item) && Ext.isFunction(item.method)) {
								filter = item.method.call(this, item.argument);
							}
							if (Ext.isFunction(item)) {
								filter = item.call(this);
							}
							if (Ext.isEmpty(filter)) {
								throw new this.Terrasoft.InvalidFormatException({
									message: Ext.String.format(
										this.get("Resources.Strings.ColumnFilterInvalidFormatException"), columnName)
								});
							}
							filterGroup.addItem(filter);
						}, this);
						if (lookupListConfig.filter) {
							var filterItem = lookupListConfig.filter.call(this);
							if (filterItem) {
								filterGroup.addItem(filterItem);
							}
						}
					}
					return filterGroup;
				},

				/**
				 * ####### ###### ######## ###########.
				 * @protected
				 * @param {Object} args ######### ###### ###### ###### ## ###########.
				 * @param {Terrasoft.Collection} args.selectedRows ######### ######### #######.
				 * @param {String} args.columnName ### #######, ### ####### ############# #####.
				 */
				onLookupResult: function(args) {
					var columnName = args.columnName;
					var selectedRows = args.selectedRows;
					if (!selectedRows.isEmpty()) {
						this.set(columnName, selectedRows.getByIndex(0));
					}
				},

				/**
				 * ########## ##### ########## #### #### ##########.
				 * @param {String} name
				 * @param {String} value
				 * @param {Function} callback
				 */
				loadLookupDisplayValue: function(name, value) {
					this.loadLookupDisplayValueAsync(name, value);
				},

				/**
				 * ########### ##### ########## #### #### ##########.
				 * @param {String} name
				 * @param {Guid} value
				 * @param {Function} callback
				 */
				loadLookupDisplayValueAsync: function(name, value, callback) {
					var config = {
						name: name,
						value: value
					};
					var esq = this.getLookupDisplayValueQuery(config);
					esq.getEntityCollection(function(result) {
						if (result.success && result.collection.getCount()) {
							var entity = result.collection.getByIndex(0);
							this.set(name, entity.values);
						}
						if (callback) {
							callback.call(this);
						}
					}, this);
				},

				getLookupDisplayValueQuery: function(config) {
					var result = this.getLookupQuery(null, config.name, config.isLookup);
					result.enablePrimaryColumnFilter(config.value);
					return result;
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "CampaignDiagramPropertyDescriptionContainer"
				},
				{
					"operation": "remove",
					"name": "DiagramElementLookup"
				},
				{
					"operation": "merge",
					"name": "CampaignDiagramPropertyEntityMainContainer",
					"values": {
						"wrapClass": ["main", "fields-container"]
					}
				},
				{
					"operation": "insert",
					"name": "LeadType",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values":  {
						"controlConfig": {
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false,
						"enabled": {
							"bindTo": "IsStatusEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "LeadTypeStatus",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values":  {
						"controlConfig": {
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false,
						"enabled": {
							"bindTo": "IsStatusEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "QualifyStatus",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values":  {
						"controlConfig": {
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false,
						"enabled": {
							"bindTo": "IsStatusEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "LeadMedium",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values":  {
						"controlConfig": {
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false,
						"enabled": {
							"bindTo": "IsStatusEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "RegisterMethod",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values":  {
						"controlConfig": {
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false,
						"enabled": {
							"bindTo": "IsStatusEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "Owner",
					"parentName": "CampaignDiagramPropertyEntityMainContainer",
					"propertyName": "items",
					"values":  {
						"controlConfig": {
							"setValidationInfo": Terrasoft.emptyFn
						},
						"isRequired": false,
						"enabled": {
							"bindTo": "IsStatusEnabled"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


