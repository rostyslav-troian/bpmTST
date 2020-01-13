Terrasoft.configuration.Structures["BaseProcessSettingsManager"] = {innerHierarchyStack: ["BaseProcessSettingsManager"]};
define('BaseProcessSettingsManagerStructure', ['BaseProcessSettingsManagerResources'], function(resources) {return {schemaUId:'9c0a3264-fc6f-4503-bf8a-e49dc8a8df4d',schemaCaption: "BaseProcessSettingsManager", parentSchemaName: "", schemaName:'BaseProcessSettingsManager',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseProcessSettingsManager", ["BaseProcessSettingsManagerItem"], function() {
	Ext.define("Terrasoft.BaseProcessSettingsManager", {
		extend: "Terrasoft.ObjectManager",
		alternateClassName: "Terrasoft.BaseProcessSettingsManager",

		/**
		 * Prepares uId to valid caption string.
		 * @private
		 * @param {String} uId UId.
		 * @returns {String} Valid uId caption.
		 */
		_prepareUIdToCaption: function(uId) {
			return uId.replace(/-/g, "");
		},

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnNames
		 * @overridden
		 */
		propertyColumnNames: {
			processCaption: "ProcessName",
			position: "Position",
			processUId: "SysSchemaUId",
			parameterUId: "ParameterUId"
		},

		/**
		 * @inheritdoc Terrasoft.ObjectManager#propertyColumnConfig
		 * @overridden
		 */
		propertyColumnConfig: {
			processCaption: {
				columnDataValueType: Terrasoft.DataValueType.TEXT,
				columnPath: "[VwProcessLib:VersionParentUId:SysSchemaUId].Caption"
			}
		},

		/**
		 * Returns schema data name for autog generated data.
		 * @protected
		 * @abstract
		 */
		getSchemaDataName: Terrasoft.abstractFn,

		/**
		 * Additional column names.
		 * @protected
		 * @virtual
		 * @type {Object} additionalColumnNames
		 */
		additionalColumnNames: null,

		/**
		 * @inheritdoc Terrasoft.ObjectManager#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.propertyColumnNames = Ext.apply(this.propertyColumnNames, this.additionalColumnNames);
		},

		/**
		 * @inheritdoc Terrasoft.ObjectManager#createItem
		 * @overridden
		 */
		createItem: function(config, callback, scope) {
			this.callParent([config, function(item) {
				item.setPosition(config.position);
				item.setProcessUId(config.processUId);
				item.setParameterUId(config.parameterUId);
				callback.call(scope, item);
			}, this]);
		},

		/**
		 * Returns all existing items.
		 * @returns {Terrasoft.Collection} Not deleted manager items.
		 */
		getActiveItems: function() {
			var items = this.getItems();
			return items.filterByFn(function(item) {
				return !item.isDeleted;
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.ObjectManager#updatePackageSchemaData
		 * @overridden
		 */
		updatePackageSchemaData: function(packageUId, items, callback, scope) {
			var managerItems = this.getItems();
			var itemsIds = managerItems.getKeys();
			var baseDataName = this.getSchemaDataName();
			var dataName = Ext.String.format("{0}_{1}", baseDataName, this._prepareUIdToCaption(packageUId));
			var config = {
				entitySchemaName: this.entitySchemaName,
				recordList: itemsIds,
				packageUId: packageUId,
				packageSchemaDataName: dataName
			};
			var request = Ext.create("Terrasoft.UpdatePackageSchemaDataRequest", config);
			request.execute(function(response) {
				if (response && response.success) {
					callback.call(scope);
				} else {
					throw new Terrasoft.InvalidOperationException({
						message: response.errorInfo.toString()
					});
				}
			}, this);
		}
	});
	return Terrasoft.BaseProcessSettingsManager;
});


