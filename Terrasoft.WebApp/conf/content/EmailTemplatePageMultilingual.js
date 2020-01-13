Terrasoft.configuration.Structures["EmailTemplatePageMultilingual"] = {innerHierarchyStack: ["EmailTemplatePageMultilingual"], structureParent: "BaseMultilingualEntityLookupPage"};
define('EmailTemplatePageMultilingualStructure', ['EmailTemplatePageMultilingualResources'], function(resources) {return {schemaUId:'afc0c17e-46ad-4e86-8945-443934c00af2',schemaCaption: "Email template edit page (multilingual)", parentSchemaName: "BaseMultilingualEntityLookupPage", schemaName:'EmailTemplatePageMultilingual',parentSchemaUId:'feb92bf3-d534-424c-9deb-f5c350d99115',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseMultilingualEntityLookupPage
 */
define("EmailTemplatePageMultilingual", [], function() {
	return {
		entitySchemaName: "EmailTemplate",
		mixins: {
			OutdatedSchemaNotificationMixin: "Terrasoft.OutdatedSchemaNotificationMixin"
		},
		properties: {
			/**
			 * Outdated event name.
			 * @protected
			 * @type {String}
			 */
			outdatedEventName: "EmailTemplatePageSaved",

			/**
			 * Use websocket notifications.
			 * @protected
			 * @type {Boolean}
			 */
			useNotification: true
		},
		attributes: {
			/**
			 * Subject email template column.
			 */
			"Subject": {
				"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},

			/**
			 * Template name.
			 */
			"TemplateName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"dependencies": [
					{
						"columns": ["TemplateName"],
						"methodName": "updateName"
					}
				]
			},

			/**
			 * Template name.
			 */
			"Name": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
				"dependencies": [
					{
						"columns": ["IsEntityInitialized"],
						"methodName": "initVirtualColumns"
					}
				]
			},

			/**
			 * Object email template column, represent template entity schema.
			 * @type {Terrasoft.DataValueType.ENTITY_COLUMN}
			 */
			"Object": {
				"lookupListConfig": {
					filter: function() {
						return this.getObjectEntitySchemaFilters();
					}
				}
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Converts a collection languages to a string short code names join by commas.
			 * @private
			 * @param {Terrasoft.Collection} languages List of languages.
			 * @returns {string} Returns short code names string.
			 */
			_toShortCodeString: function(languages) {
				return languages.getItems()
					.map(function(lang) {
						var codeArray = lang.get("Code").split("-");
						return codeArray[codeArray.length - 1];
					})
					.join(", ");
			},

			/**
			 * Converts a name column value to template name column value.
			 * @private
			 * @param {string} name Name column value
			 * @returns {string} Returns TemplateName column value.
			 */
			_nameToTemplateName: function(name) {
				var index = name.lastIndexOf("(");
				return index > 0 ? (name.substr(0, index)).trim() : name;
			},

			/**
			 * @private
			 */
			_fillObjectFromHistoryState: function(callback, scope) {
				const historyState = this.sandbox.publish("GetHistoryState");
				const objectSchemaUId = historyState.hash.recordId;
				if (!objectSchemaUId) {
					return Ext.callback(callback, scope);
				}
				Terrasoft.EntitySchemaManager.findItemByUId(objectSchemaUId, function(schema) {
					if (schema) {
						this.set("Object", {
							value: objectSchemaUId,
							displayValue: schema.caption
						});
					}
					Ext.callback(callback, scope);
				}, this);
			},

			// endregion

			// region Methids: Protected

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.subscribeOnServerChannelMessage();
					if (this.isAddMode()) {
						this._fillObjectFromHistoryState(callback, scope);
					} else {
						Ext.callback(callback, scope);
					}
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.updateName();
				this.subscribeAttributeEvents();
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @override
			 */
			onSaved: function() {
				this.notify(this.outdatedEventName, {
					id: this.get("Id"),
					name: this.get("TemplateName")
				});
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseMultilingualEntityLookupPage#getModuleSchemaName
			 * @override
			 */
			getModuleSchemaName: function() {
				return "EmailMLangContentEditSchema";
			},

			/**
			 * Update column name by getting and combining data from TemplateName and Languages columns.
			 * @protected
			 */
			updateName: function() {
				if (this.get("IsEntityInitialized")) {
					var tplName = this.get("TemplateName");
					var langString = this._toShortCodeString(this.get("Languages"));
					var name = (tplName || "") + " (" + langString + ")";
					this.set("Name", name);
					this.updateCardButtonsVisibility(true);
				}
			},

			/**
			 * Subscribe on view model attribute events.
			 * @protected
			 */
			subscribeAttributeEvents: function() {
				var languages = this.get("Languages");
				languages.on("changed", this.updateName, this);
			},

			/**
			 * Initialize view model virtual columns.
			 * @protected
			 */
			initVirtualColumns: function() {
				var name = this.get("Name");
				if (name) {
					this.set("TemplateName", this._nameToTemplateName(name));
				}
			},

			/**
			 * Returns filters for the entity objects.
			 * @protected
			 * @return {Terrasoft.FilterGroup} Filters for the entity objects.
			 */
			getObjectEntitySchemaFilters: function() {
				var filters = Ext.create("Terrasoft.FilterGroup");
				filters.addItem(Terrasoft.createColumnFilterWithParameter("ManagerName", "EntitySchemaManager"));
				filters.addItem(Terrasoft.createColumnIsNotNullFilter("Caption"));
				return filters;
			},

			/**
			 * @inheritdoc Terrasoft.BaseMultilingualEntityLookupPage#getMultilingualColumnList
			 * @override
			 */
			getMultilingualColumnList: function() {
				var config = this.callParent(arguments);
				config.push({
					name: "Subject",
					className: "Terrasoft.TextEdit"
				});
				config.push({name: "Body"});
				config.push({name: "TemplateConfig"});
				return config;
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "TemplateName",
				"values": {
					"layout": {
						"column": 1,
						"row": 0,
						"colSpan": 24,
						"rowSpan": 1
					},
					"caption": {
						"bindTo": "Resources.Strings.TplNameLabelCaption"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Object",
				"values": {
					"layout": {
						"column": 1,
						"row": 2,
						"colSpan": 24,
						"rowSpan": 1
					},
					"tip": {
						"content": {"bindTo": "Resources.Strings.ObjectTip"}
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_DIFF*/
	};
});


