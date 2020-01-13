Terrasoft.configuration.Structures["BaseMultipleProfileSchema"] = {innerHierarchyStack: ["BaseMultipleProfileSchema"], structureParent: "BaseProfileSchema"};
define('BaseMultipleProfileSchemaStructure', ['BaseMultipleProfileSchemaResources'], function(resources) {return {schemaUId:'9609ce0b-4904-45af-95b7-ce2be50af945',schemaCaption: "BaseMultipleProfileSchema", parentSchemaName: "BaseProfileSchema", schemaName:'BaseMultipleProfileSchema',parentSchemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMultipleProfileSchema", [],
	function() {
		return {
			attributes: {
				/**
				 * Column name of the card property.
				 * @type {String}
				 */
				"EditColumnName": {
					dataValueType: this.Terrasoft.DataValueType.STRING,
					value: ""
				},

				/**
				 * Array of modules master column names.
				 * @type {String[]}
				 */
				"MasterColumnNames": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					value: []
				}
			},
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
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetProfileEntityColumnChanges
				 * Returns requested column values.
				 * @param {String[]} columnNames Array identifiers columns.
				 */
				"GetProfileEntityColumnChanges": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
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
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initMasterColumnsValues();
						this.Ext.callback(callback, scope);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#getVisibleBlankSlate
				 * @overridden
				 */
				getVisibleBlankSlate: function() {
					var masterColumnNames = this.get("MasterColumnNames");
					var isVisible = masterColumnNames.filter(function(columnName) {
						var value = this.get(columnName);
						return !this.Ext.isEmpty(value);
					}, this);
					return this.Ext.isEmpty(isVisible);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#initMasterColumnInfo
				 * @overridden
				 */
				initMasterColumnInfo: function() {
					this.callParent(arguments);
					this.initMasterColumnNames();
				},

				/**
				 * Sets master column names from master column info.
				 * @protected
				 */
				initMasterColumnNames: function() {
					var masterColumnInfo = this.get("MasterColumnInfo");
					var multiLookupColumns = masterColumnInfo ? masterColumnInfo.multiLookupColumns : null;
					var masterColumnNames = masterColumnInfo && multiLookupColumns ? multiLookupColumns : [];
					this.set("MasterColumnNames", masterColumnNames);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.Terrasoft.each(this.modules, this.subscribeProfilesSandboxEvents, this);
				},

				/**
				 * Subscribes on events of profile sandbox.
				 * @protected
				 * @param {Object} moduleConfig Module config.
				 * @param {String} moduleName Module name.
				 */
				subscribeProfilesSandboxEvents: function(moduleConfig, moduleName) {
					var moduleId = this.getModuleId(moduleName);
					this.sandbox.subscribe("GetProfileEntityColumnChanges", this.onProfileColumnChanged,
						this, [moduleId]);
					this.sandbox.subscribe("ProfileOpenCard", this.onProfileOpenCard,
							this, [moduleId]);
				},

				/**
				 * Opens related profile card by config.
				 * @protected
				 * @param {Object} config Open card message config.
				 */
				onProfileOpenCard: function(config) {
					this.sandbox.publish("OpenCard", config, [this.sandbox.id]);
				},

				/**
				 * Returns columns values.
				 * @protected
				 * @param {String[]} columnNames Column names.
				 * @return {Object} Columns values.
				 */
				onProfileColumnChanged: function(columnNames) {
					return this.sandbox.publish("GetColumnsValues", columnNames, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#onColumnChanged
				 * @overridden
				 */
				onColumnChanged: function(changedColumn) {
					this.set(changedColumn.columnName, changedColumn.columnValue);
					this.sandbox.publish("ProfileEntityColumnChanges", changedColumn);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#initEntity
				 * @overridden
				 */
				initEntity: this.Ext.emptyFn,

				/**
				 * Initializes master columns values.
				 * @protected
				 */
				initMasterColumnsValues: function() {
					var masterColumnNames = this.get("MasterColumnNames");
					var columnsValues = this.sandbox.publish("GetColumnsValues", masterColumnNames,
						[this.sandbox.id]);
					this.setMasterColumnsValues(masterColumnNames, columnsValues);
				},

				/**
				 * Sets master columns values.
				 * @protected
				 * @param {String[]} masterColumnNames Column names.
				 * @param {Object} masterColumnValues Column values.
				 */
				setMasterColumnsValues: function(masterColumnNames, masterColumnValues) {
					this.Terrasoft.each(masterColumnNames, function(columnName) {
						var column = masterColumnValues[columnName];
						this.set(columnName, column ? column.value : null);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#initEditPages
				 * @overridden
				 */
				initEditPages: function() {
					this.initMasterColumnInfo();
					var masterColumnNames = this.get("MasterColumnNames");
					var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					this.Terrasoft.each(masterColumnNames, function(masterColumnName) {
						this.addEditPage(masterColumnName, collection);
					}, this);
					this.set("EditPages", collection);
				},

				/**
				 * Adds edit page to collection.
				 * @protected
				 * @param {String} masterColumnName Master column name.
				 * @param {Terrasoft.BaseViewModelCollection} collection Collection of edit pages.
				 */
				addEditPage: function(masterColumnName, collection) {
					var entityStructure = this.getEntityStructure(masterColumnName);
					if (entityStructure) {
						this.Terrasoft.each(entityStructure.pages, function(editPage) {
							var typeUId = editPage.UId || this.Terrasoft.generateGUID();
							collection.add(typeUId, Ext.create("Terrasoft.BaseViewModel", {
								values: {
									Id: typeUId,
									Caption: editPage.caption,
									Click: {bindTo: "addRecord"},
									Tag: typeUId,
									SchemaName: editPage.cardSchema,
									masterColumnName: masterColumnName,
									EntitySchemaName: entityStructure.entitySchemaName,
									MiniPage: {
										schemaName: editPage.miniPageSchema,
										hasAddMiniPage: editPage.hasAddMiniPage
									}
								}
							}));
						}, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#getUpdateCardPropertyConfig
				 * @overridden
				 */
				getUpdateCardPropertyConfig: function(response) {
					return {
						key: this.get("masterColumnName"),
						value: {
							value: response.primaryColumnValue,
							displayValue: response.primaryDisplayColumnValue,
							column: this.get("EditColumnName")
						}
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#setEditColumnName
				 * @overridden
				 */
				setEditColumnName: function(typeColumnValue) {
					var editPages = this.getEditPages();
					var editPage = editPages.get(typeColumnValue);
					var masterColumnName = editPage.get("masterColumnName");
					this.set("EditColumnName", masterColumnName);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#getLookupConfig
				 * @overridden
				 */
				getLookupConfig: function() {
					var masterColumnNames = this.get("MasterColumnNames");
					var lookupConfig = masterColumnNames.map(function(column) {
						return {
							columnName: this.get("masterColumnName"),
							entitySchemaName: column,
							multiLookupColumnName: column,
							multiSelect: false,
							hideActions: true
						};
					}, this);
					return {
						lookupPageName: "MultiLookupModule",
						multiLookupConfig: lookupConfig
					};
				}
			}
		};
	}
);


