Terrasoft.configuration.Structures["BaseSearchRowSchema"] = {innerHierarchyStack: ["BaseSearchRowSchemaGlobalSearch", "BaseSearchRowSchema"]};
define('BaseSearchRowSchemaGlobalSearchStructure', ['BaseSearchRowSchemaGlobalSearchResources'], function(resources) {return {schemaUId:'254c5d91-bad1-44be-a75e-1d511f816dc0',schemaCaption: "BaseSearchRowSchema", parentSchemaName: "", schemaName:'BaseSearchRowSchemaGlobalSearch',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSearchRowSchemaStructure', ['BaseSearchRowSchemaResources'], function(resources) {return {schemaUId:'57c58782-73e3-4519-a9bc-a28221641218',schemaCaption: "BaseSearchRowSchema", parentSchemaName: "BaseSearchRowSchemaGlobalSearch", schemaName:'BaseSearchRowSchema',parentSchemaUId:'254c5d91-bad1-44be-a75e-1d511f816dc0',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSearchRowSchemaGlobalSearch",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSearchRowSchemaGlobalSearchResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSearchRowSchemaGlobalSearch", ["NetworkUtilities", "ConfigurationEnums", "EmailHelper", "GlobalSearchViewGenerator",
	"MiniPageUtilities"], function(NetworkUtilities, ConfigurationEnums, EmailHelper) {
	return {
		hideEmptyModelItems: true,
		attributes: {
			/**
			 * Schema view config.
			 */
			"ViewConfig": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Array of found column names.
			 */
			"FoundColumnsCollection": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Entity schema caption.
			 */
			"EntitySchemaCaption": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Primary column url value.
			 */
			"PrimaryColumnURL": {
				"dataValueType": Terrasoft.DataValueType.TEXT
			}
		},
		mixins: {
			MiniPageUtilities: "Terrasoft.MiniPageUtilities"
		},
		methods: {

			/**
			 * Returns state object module id for edit page.
			 * @private
			 */
			_getStateObjModuleId: function() {
				return Ext.String.format("{0}_{1}_{2}", this.sandbox.id,
					this.entitySchemaName, this.get(this.primaryColumnName));
			},

			/**
			 * @private
			 */
			_initTypedColumnValue: function (callback, scope) {
				const typeColumnName = this.get("TypeColumnName");
				if (typeColumnName && !this.get(typeColumnName)) {
					NetworkUtilities.getAttributeValueByRecordId({
						entitySchemaName: this.entitySchemaName,
						entityId: this.get(this.primaryColumnName),
						attribute: typeColumnName
					}, function(typedValue) {
						this.set(typeColumnName, { value: typedValue });
						Ext.callback(callback, scope);
					}, this);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				const parentMethod = this.getParentMethod();
				Terrasoft.chain(
					function(next) {
						parentMethod.call(this, next, this);
					},
					this._initTypedColumnValue,
					function() {
						this.initEditPages();
						this.initMultiLookup();
						this.initAttributeValues();
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Fills lookup field.
			 * @param {String} name Entity schema name
			 * @param {String} value Entity value.
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			loadLookupDisplayValue: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#sendGoogleTagManagerData
			 * @overridden
			 */
			sendGoogleTagManagerData: Terrasoft.emptyFn,

			/**
			 * Initializes viewmodel attributes.
			 * @protected
			 */
			initAttributeValues: function() {
				this.initSchemaCaption();
				this.set("PrimaryColumnURL", this.getPrimaryColumnURL());
			},

			/**
			 * Initializes entity schema caption.
			 */
			initSchemaCaption: function() {
				this.set("EntitySchemaCaption", this.entitySchema && this.entitySchema.caption || "");
			},

			/**
			 * Returns eintity image url or section logo url or default image url.
			 * @protected
			 * @return {String} Image url.
			 */
			getImage: function() {
				var primaryImageColumnValue = this.get(this.primaryImageColumnName);
				if (primaryImageColumnValue && primaryImageColumnValue.value) {
					return this.getSchemaImageUrl(primaryImageColumnValue);
				}
				var moduleStructure = this.getModuleStructure(this.entitySchemaName);
				if (moduleStructure && moduleStructure.logoId) {
					return this.Terrasoft.ImageUrlBuilder.getUrl({
						source: Terrasoft.ImageSources.SYS_IMAGE,
						params: {
							primaryColumnValue: moduleStructure.logoId
						}
					});
				}
				return this.getDefaultImage();
			},

			/**
			 * Returns default image url.
			 * @protected
			 * @return {String} Default image url.
			 */
			getDefaultImage: function() {
				return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultSearchImage"));
			},

			/**
			 * Returns primary display column value.
			 * @protected
			 * @returns {String} Primary display column value.
			 */
			getPrimaryDisplayColumnValue: function() {
				var notFilledValue = this.get("Resources.Strings.NotFilled");
				if (this.primaryDisplayColumnName) {
					return this.get(this.primaryDisplayColumnName) || notFilledValue;
				}
				return notFilledValue;
			},

			/**
			 * Returns primary display column caption.
			 * @protected
			 * @returns {String} Primary display column caption.
			 */
			getPrimaryDisplayColumnCaption: function() {
				if (this.primaryDisplayColumnName) {
					var primaryColumn =  this.columns[this.primaryDisplayColumnName];
					return primaryColumn.caption;
				}
				return "";
			},

			/**
			 * Returns found column items view config.
			 * @private
			 * @return {Array} Found column items view config.
			 */
			getFoundColumnItemsConfig: function() {
				var columnNames = this.getAdditionalColumnNames();
				var items = [];
				Terrasoft.each(columnNames, function(columnName) {
					var columnContainer = {
						"id": columnName + "Container",
						"className": "Terrasoft.Container",
						"items": []
					};
					var column = this.getColumnByName(columnName) || this.get(columnName);
					var caption = column && column.caption || columnName;
					var value = this.get(columnName);
					if (this.isNotEmpty(value)) {
						columnContainer.items.push({
							"className": "Terrasoft.Label",
							"classes": {"labelClass": ["found-column-caption"]},
							"caption": caption
						});
						columnContainer.items.push({
							"className": "Terrasoft.Label",
							"classes": {"labelClass": ["found-column-value"]},
							"caption": value.displayValue || value,
							"highlightText": this.getHighlightText(columnName)
						});
						items.push(columnContainer);
					}
				}, this);
				return items;
			},

			/**
			 * Returns found columns.
			 * @private
			 * @return {Object} Found columns array.
			 */
			getFoundColumns: function() {
				var foundColumnsCollection = this.get("FoundColumnsCollection");
				return foundColumnsCollection.getByIndex(0).get("FoundColumns");
			},

			/**
			 * Returns additional column names for view searcg result.
			 * Gets not showed found column names.
			 * @private
			 * @return {String[]} Not showed found column names.
			 */
			getAdditionalColumnNames: function() {
				var bindMap = this.getBindMap();
				var bindMapKeys = bindMap ? bindMap.getKeys() : [];
				var foundColumns = this.getFoundColumns();
				var additionalColumnNames = [];
				Terrasoft.each(foundColumns, function(item, columnName) {
					if(!(Ext.Array.contains(bindMapKeys, columnName)
							|| this.primaryDisplayColumnName === columnName)) {
						additionalColumnNames.push(columnName);
					}
				}, this);
				return additionalColumnNames;
			},

			/**
			 * Generates configuration of the element view.
			 * @protected
			 * @param {Object} itemConfig Link to the configuration element of ContainerList.
			 */
			onGetItemConfig: function(itemConfig) {
				var viewConfig = {
					"id": "foundColumns",
					"className": "Terrasoft.Container",
					"classes": {"wrapClassName": ["found-columns-list"]},
					"items": []
				};
				viewConfig.items = this.getFoundColumnItemsConfig();
				itemConfig.config = viewConfig;
			},

			/**
			 * Returns not showed columns container visibility.
			 * @protected
			 * @return {Boolean} Not showed columns container visibility.
			 */
			isFoundColumnsVisible: function() {
				var notShowedFoundColumns = this.getAdditionalColumnNames();
				return notShowedFoundColumns.length > 0;
			},

			/**
			 * Returns primary column link url.
			 * @protected
			 * @return {String} Primary column link url.
			 */
			getPrimaryColumnURL: function() {
				return Ext.String.format("ViewModule.aspx#{0}", NetworkUtilities.getEntityUrl(this.entitySchemaName,
						this.get(this.primaryColumnName), this.getTypeColumnValue(this)));
			},

			/**
			 * Handler on primary column link mouse over.
			 * @protected
			 */
			onPrimaryColumnMouseOver: function(options) {
				this.openMiniPage({
					targetId: options.targetId,
					entitySchemaName: this.entitySchemaName,
					recordId: this.get(this.primaryColumnName)
				});
			},

			/**
			 * Handler on primary column link click.
			 * @protected
			 * @return {Boolean} False.
			 */
			onPrimaryColumnLinkClick: function() {
				var typedColumnValue = this.getTypeColumnValue(this);
				NetworkUtilities.openEntityPage({
					entityId: this.get(this.primaryColumnName),
					entitySchemaName: this.entitySchemaName,
					typeId: typedColumnValue,
					sandbox: this.sandbox,
					stateObj: {
						moduleId: this._getStateObjModuleId()
					}
				});
				return false;
			},

			/**
			 * @overridden
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLinkClick
			 */
			onLinkClick: function(url, columnName) {
				this.updateColumnReferenceSchemaByMultiLookupValue(columnName);
				var column = this.getColumnByName(columnName);
				var columnValue = this.get(columnName);
				var entityId = columnValue && columnValue.value;
				if (!column || !entityId) {
					return true;
				}
				NetworkUtilities.openEntityPage({
					entityId: entityId,
					entitySchemaName: column.referenceSchemaName,
					sandbox: this.sandbox,
					stateObj: {
						moduleId: this._getStateObjModuleId()
					}
				});
				return false;
			},

			/**
			 * Returns found column text for highlight.
			 * @private
			 * @param {String} columnName Column name.
			 * @return {String[]} Found column text array.
			 */
			getHighlightText: function(columnName) {
				var highlightTextArray = [];
				var foundColumns = this.getFoundColumns();
				if (columnName === "PrimaryColumn") {
					columnName = this.primaryDisplayColumnName;
				}
				Terrasoft.each(foundColumns, function(item, foundColumnName) {
					if (foundColumnName === columnName) {
						highlightTextArray = item;
					}
				}, this);
				return highlightTextArray;
			},

			/**
			 * Returns email url.
			 * @protected
			 * @param {String} columnName Column name.
			 * @return {String} Email url.
			 */
			getEmailUrl: function(columnName) {
				return EmailHelper.getEmailUrl(this.get(columnName));
			},

			/**
			 * Open browser mailto.
			 * @param {HTMLElement} target Target element.
			 * @param {String} columnName Email column name.
			 */
			onEmailUrlClick: function(target, columnName) {
				location.href = EmailHelper.getEmailUrl(this.get(columnName));
			},

			/**
			 * @overridden
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getLinkConfig
			 */
			getLinkConfig: function(columnName) {
				var config = this.callParent(arguments);
				var lookupLinkConfig = this.getLookupLinkConfig(columnName);
				this.Ext.apply(config, lookupLinkConfig);
				return config;
			},

			/**
			 * Gets lookup link config for open card.
			 * @private
			 * @param {String} columnName Column name.
			 * @return {Object} {schemaName: String} lookup link config for open card.
			 */
			getLookupLinkConfig: function(columnName) {
				var column = this.getColumnByName(columnName);
				var columnValue = this.get(columnName);
				if (column && this.isNotEmpty(column.multiLookupColumns)) {
					var multiLookupColumn = this.getColumnByName(columnValue.column);
					var referenceSchemaName = multiLookupColumn.referenceSchemaName;
					var schemaName = this.getCardSchemaName(referenceSchemaName, multiLookupColumn.name);
					return {schemaName: schemaName};
				}
				return {};
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PrimaryImage",
				"propertyName": "items",
				"values": {
					"getSrcMethod": "getImage",
					"readonly": true,
					"onImageClick": {bindTo: "onPrimaryColumnLinkClick"},
					"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage"
				}
			},
			{
				"operation": "insert",
				"name": "DataContainer",
				"propertyName": "items",
				"values": {
					"isViewMode": true,
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"collapseEmptyRow": true
				}
			},
			{
				"operation": "insert",
				"name": "PrimaryColumnContainer",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["primary-column-container", "control-width-15"]
					},
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "PrimaryColumnCaption",
				"parentName": "PrimaryColumnContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "getPrimaryDisplayColumnCaption"},
					"classes": {
						"labelClass": ["primary-column-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "PrimaryColumnValue",
				"parentName": "PrimaryColumnContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.HYPERLINK,
					"classes": {"hyperlinkClass": ["primary-column-link"]},
					"caption": {"bindTo": "getPrimaryDisplayColumnValue"},
					"click": {"bindTo": "onPrimaryColumnLinkClick"},
					"linkMouseOver": {"bindTo": "onPrimaryColumnMouseOver"},
					"href": {"bindTo": "PrimaryColumnURL"},
					"tag": "PrimaryColumn",
					"highlightText": { bindTo: "getHighlightText" }
				}
			},
			{
				"operation": "insert",
				"name": "EntitySchemaCaption",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.EntitySchemaLabelCaption"},
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "insert",
				"name": "FoundColumnsContainerList",
				"propertyName": "items",
				"parentName": "DataContainer",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "ContainerListGenerator.generateGrid",
					"collection": {"bindTo": "FoundColumnsCollection"},
					"onGetItemConfig": {"bindTo": "onGetItemConfig"},
					"visible": {"bindTo": "isFoundColumnsVisible"},
					"selectableRowCss": "",
					"items": []
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("BaseSearchRowSchema", ["LinkColumnHelper", "ContextCallUtilities"], function(LinkColumnHelper) {
	return {
		mixins: {
			ContextCallUtilities: "Terrasoft.ContextCallUtilities"
		},
		messages: {
			/**
			 * @message CallCustomer
			 * Make a call for customer.
			 */
			"CallCustomer": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel.BaseSectionV2#getLinkUrl
			 * @overridden
			 */
			getLinkUrl: function(columnName) {
				var phoneLinkUrl = LinkColumnHelper.createLink(this.entitySchemaName,
						columnName, this.get(columnName), this.get(this.primaryColumnName));
				return phoneLinkUrl || this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel.BaseSectionV2#onLinkClick
			 * @overridden
			 */
			onLinkClick: function(url, columnName) {
				var handled = this.callCustomer({
					entityColumnName: columnName,
					entitySchemaName: this.entitySchemaName,
					entityId: this.get(this.primaryColumnName),
					number: this.get(columnName)
				});
				return !(handled || !this.callParent(arguments));
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


