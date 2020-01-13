Terrasoft.configuration.Structures["BaseProfileSchema"] = {innerHierarchyStack: ["BaseProfileSchema"]};
define('BaseProfileSchemaStructure', ['BaseProfileSchemaResources'], function(resources) {return {schemaUId:'8b8587c7-3fb2-4104-917e-1da5cbea22b1',schemaCaption: "BaseProfileSchema", parentSchemaName: "", schemaName:'BaseProfileSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseProfileSchema", ["ConfigurationEnums", "NetworkUtilities", "css!BaseProfileSchemaCSS", "ProfileSchemaMixin",
			"MiniPageUtilities"],
	function(ConfigurationEnums, NetworkUtilities) {
		return {
			hideEmptyModelItems: true,
			mixins: {
				ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin",
				MiniPageUtilities: "Terrasoft.MiniPageUtilities"
			},
			attributes: {
				/**
				 * Value of master column.
				 */
				"MasterColumnValue": {
					dataValueType: Terrasoft.DataValueType.GUID,
					value: null
				},
				/**
				 * Master column info.
				 */
				"MasterColumnInfo": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				/**
				 * Data-item-marker template.
				 */
				"DataItemMarkerTpl": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "{0} {1}Container"
				}
			},
			messages: {
				/**
				 * @message EntityInitialized
				 * Master's entity initialized event.
				 */
				"EntityInitialized": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetEntityColumnChanges
				 * Processes changes of entity column.
				 */
				"GetEntityColumnChanges": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetColumnsValues
				 * Returns requested column values.
				 */
				"GetColumnsValues": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetLookupQueryFilters
				 * Gets lookup query filters.
				 */
				"GetLookupQueryFilters": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetColumnInfo
				 * Returns info by column.
				 * @param {String} columnName Column name.
				 */
				"GetColumnInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message UpdateCardProperty
				 * Changes the value card model.
				 * @param {Object} config Config action.
				 * @param {String} config.key Column name.
				 * @param {Mixed} config.value Column value.
				 * @param {Object} config.options Update column params.
				 */
				"UpdateCardProperty": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message OpenCard
				 * Opens card.
				 * @param {Object} config Config for open card.
				 * @param {String} config.moduleId Module identifier.
				 * @param {String} config.schemaName Entity schema name.
				 * @param {String} config.operation Record operation/
				 * @param {String} config.id Primary column value.
				 * @param {Array} config.defaultValues Array of default values.
				 */
				"OpenCard": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message CardModuleResponse
				 * On card module response message.
				 */
				"CardModuleResponse": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "ProfileModuleContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-module-container"],
						"markerValue": {"bindTo": "getProfileModuleContainerDataMarker"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ProfileModuleActions",
					"parentName": "ProfileModuleContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["profile-module-actions"],
						"visible": {"bindTo": "getVisibleContent"},
						"markerValue": {"bindTo": "getMasterColumnDataMarker"},
						"tag": "Actions",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ClearButton",
					"parentName": "ProfileModuleActions",
					"propertyName": "items",
					"index": 1,
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.ClearButton"},
						"click": {"bindTo": "onClearButtonClick"},
						"classes": {
							"wrapperClass": [
								"actions-button-clear",
								"actions-button-right"
							]
						},
						"hint": {"bindTo": "getClearButtonHint"}
					}
				},
				{
					"operation": "insert",
					"name": "ProfileContentContainer",
					"parentName": "ProfileModuleContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"classes": {
							"wrapClassName": ["profile-content-container"]
						},
						"visible": {"bindTo": "getVisibleContent"},
						"markerValue": {"bindTo": "getMasterColumnDataMarker"},
						"tag": "Content",
						"items": [],
						"collapseEmptyRow": true
					}
				},
				{
					"operation": "insert",
					"name": "ProfileIcon",
					"parentName": "ProfileContentContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getProfileIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["profile-icon"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 4
						}
					}
				},
				{
					"operation": "insert",
					"name": "ProfileHeaderContainer",
					"parentName": "ProfileContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["profile-header-container", "control-width-15"]
						},
						"items": [],
						"layout": {
							"column": 4,
							"row": 0,
							"colSpan": 20
						}
					}
				},
				{
					"operation": "insert",
					"name": "ProfileHeaderCaption",
					"parentName": "ProfileHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getProfileHeaderCaption"},
						"classes": {
							"labelClass": ["profile-header-caption"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ProfileHeaderValue",
					"parentName": "ProfileHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"classes": {"hyperlinkClass": ["profile-header-link"]},
						"caption": {"bindTo": "getProfileHeaderValue"},
						"markerValue": {"bindTo": "getProfileHeaderValue"},
						"click": {"bindTo": "onProfileHeaderClick"},
						"linkMouseOver": {"bindTo": "onProfileLinkMouseOver"},
						"href": {"bindTo": "getProfileHeaderURL"}
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateContainer",
					"parentName": "ProfileModuleContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"classes": {
							"wrapClassName": ["blank-slate-container"]
						},
						"visible": {"bindTo": "getVisibleBlankSlate"},
						"markerValue": {"bindTo": "getMasterColumnDataMarker"},
						"tag": "BlankSlate",
						"collapseEmptyRow": true,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateIcon",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getBlankSlateIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["blank-slate-icon"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 4,
							"rowSpan": 2
						}
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateHeader",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"labelClass": "blank-slate-header"
						},
						"selectors": {
							"wrapEl": "#BlankSlateHeader"
						},
						"caption": {"bindTo": "getBlankSlateHeaderCaption"},
						"layout": {
							"column": 4,
							"row": 0,
							"colSpan": 20
						}
					}
				},
				{
					"operation": "insert",
					"name": "AddButton",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {
							"textClass": "blank-slate-button"
						},
						"selectors": {
							"wrapEl": "#AddButton"
						},
						"click": {"bindTo": "addRecord"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "AddRecordButtonCaption"},
						"controlConfig": {
							"menu": {
								"items": {
									"bindTo": "hasEditPages"
								}
							}
						},
						"layout": {
							"column": 4,
							"row": 1,
							"colSpan": 20
						}
					}
				},
				{
					"operation": "insert",
					"name": "FindButton",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {
							"textClass": "blank-slate-button"
						},
						"selectors": {
							"wrapEl": "#FindButton"
						},
						"click": {"bindTo": "onSearchButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"caption": {"bindTo": "getSearchButtonCaption"},
						"layout": {
							"column": 4,
							"row": 2,
							"colSpan": 20
						}
					}
				}
			],
			methods: {

				/**
				 * Handler on profile link mouse over.
				 * @protected
				 */
				onProfileLinkMouseOver: function(options) {
					var config = this.getMiniPageConfig(options);
					this.openMiniPage(config);
				},

				/**
				 * Returns mini page config.
				 * @param {Object} options Mini page options.
				 * @param {String} options.targetId DOM element identifier.
				 * @return {Object} {{targetId: String, entitySchemaName: String, recordId: String}} Mini page config.
				 */
				getMiniPageConfig: function(options) {
					return {
						targetId: options.targetId,
						entitySchemaName: this.entitySchemaName,
						recordId: this.get("MasterColumnValue")
					};
				},

				/**
				 * Gets profile data-item-marker value.
				 * @protected
				 * @return {string} Returns profile data-item-marker value.
				 */
				getProfileModuleContainerDataMarker: function() {
					var entitySchemaName = this.entitySchemaName || "";
					return entitySchemaName.toLowerCase() + "-profile-module-container";
				},

				/**
				 * Gets master column data-item-marker value.
				 * @private
				 * @param {string} tag Container tag.
				 * @return {string} Returns master column data-item-marker value.
				 */
				getMasterColumnDataMarker: function(tag) {
					var masterColumnInfo = this.get("MasterColumnInfo");
					var masterColumnCaption = masterColumnInfo ? masterColumnInfo.name : "";
					return this.Ext.String.format(this.get("DataItemMarkerTpl"), masterColumnCaption, tag);
				},

				/**
				 * Returns profile blank slate header caption.
				 * @protected
				 * @return {String} Profile blank slate header caption.
				 */
				getBlankSlateHeaderCaption: function() {
					var masterColumnInfo = this.get("MasterColumnInfo");
					return masterColumnInfo ? masterColumnInfo.caption : "";
				},

				/**
				 * Gets search button caption for blank slate.
				 * @protected
				 * @return {String} Search button caption.
				 */
				getSearchButtonCaption: function() {
					return this.get("Resources.Strings.SearchButtonCaption");
				},

				/**
				 * Returns profile header value.
				 * @protected
				 * @return {String} Profile header value.
				 */
				getProfileHeaderValue: function() {
					if (this.primaryDisplayColumnName) {
						return this.get(this.primaryDisplayColumnName);
					}
					return "";
				},

				/**
				 * Returns profile header caption.
				 * @protected
				 * @return {String} Profile header caption.
				 */
				getProfileHeaderCaption: function() {
					var masterColumnInfo = this.get("MasterColumnInfo");
					return (masterColumnInfo && masterColumnInfo.caption) ? masterColumnInfo.caption : "";
				},

				/**
				 * Handler on profile header link click.
				 * @protected
				 * @return {Boolean} False.
				 */
				onProfileHeaderClick: function() {
					var type = this.get("Type");
					var typeId = type ? type.value : Terrasoft.GUID_EMPTY;
					this.openCard(ConfigurationEnums.CardStateV2.EDIT, typeId, this.get("MasterColumnValue"));
					return false;
				},

				/**
				 * Initializes add record button caption.
				 * @protected
				 */
				initAddRecordButtonCaption: function() {
					var caption = this.get("Resources.Strings.AddRecordButtonCaption");
					var editPages = this.getEditPages();
					if (editPages && editPages.getCount() === 1) {
						var editPage = editPages.getByIndex(0);
						caption = editPage.get("Caption");
					}
					this.set("AddRecordButtonCaption", caption);
				},

				/**
				 * On add record button handler.
				 * @protected
				 * @param {String} typeColumnValue Value of type column.
				 */
				addRecord: function(typeColumnValue) {
					if (this.Ext.isEmpty(typeColumnValue)) {
						if (this.hasEditPages()) {
							return false;
						}
						var editPages = this.getEditPages();
						if (editPages.getCount()) {
							typeColumnValue = editPages.getByIndex(0).get("Tag");
						}
					}
					this.setEditColumnName(typeColumnValue);
					if (this.hasAddMiniPage(typeColumnValue)) {
						var entitySchemaName = this.getEntitySchemaName(typeColumnValue);
						this.openAddMiniPage({
							entitySchemaName: entitySchemaName,
							moduleId: this.getMiniPageSandboxId(entitySchemaName),
							valuePairs: this.getOpenDefaultValues(typeColumnValue, ConfigurationEnums.CardStateV2.ADD)
						});
					} else {
						this.openCard(ConfigurationEnums.CardStateV2.ADD, typeColumnValue, null);
					}
				},

				/**
				 * Sets column name of the card property.
				 * @protected
				 * @param {String} [typeColumnValue] Value of type column.
				 */
				setEditColumnName: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.MiniPageUtilities#getMiniPageSandboxId
				 * @overridden
				 */
				getMiniPageSandboxId: function(entitySchemaName) {
					return this.Ext.String.format("{0}_{1}MiniPage", this.sandbox.id, entitySchemaName);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLookupResult
				 * @overridden
				 */
				onLookupResult: function(response) {
					var selectedRows = response.selectedRows;
					var columnName = response.columnName;
					if (!selectedRows.isEmpty()) {
						this.updateCardProperty({
							key: columnName,
							value: selectedRows.getByIndex(0)
						});
					}
				},

				/**
				 * Returns lookup config for open lookup.
				 * @param {Object} [config] Config for open lookup page.
				 * @return {Object} lookupConfig Resut config for open lookup.
				 */
				getLookupConfig: function(config) {
					var masterColumnInfo = this.get("MasterColumnInfo");
					var lookupListConfig = masterColumnInfo.lookupListConfig;
					var entitySchemaName = masterColumnInfo.referenceSchemaName || this.entitySchemaName;
					var masterColumnName = this.get("masterColumnName");
					var lookupConfig = {
						entitySchemaName: entitySchemaName,
						multiSelect: false,
						columnName: masterColumnName,
						hideActions: true,
						lookupListConfig: lookupListConfig,
						columns: lookupListConfig && lookupListConfig.columns,
						filters: this.getLookupQueryFilters(masterColumnName)
					};
					this.Ext.apply(lookupConfig, config);
					return lookupConfig;
				},

				/**
				 * Handles search button click event.
				 * Opens lookup.
				 * @protected
				 */
				onSearchButtonClick: function() {
					var config = this.getLookupConfig();
					this.openLookup(config, this.onLookupResult, this);
				},

				/**
				 * Opens card.
				 * @protected
				 * @param {String} operation Record operation.
				 * @param {String} typeColumnValue Type column value.
				 * @param {String} recordId Primary column value.
				 */
				openCard: function(operation, typeColumnValue, recordId) {
					var config = this.getOpenCardConfig(operation, typeColumnValue, recordId);
					this.sandbox.publish("OpenCard", config, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLinkClick
				 * @overridden
				 */
				onLinkClick: function(url, columnName) {
					var config = this.getLinkConfig(columnName);
					this.sandbox.publish("OpenCard", config, [this.sandbox.id]);
					return false;
				},

				/**
				 * Returns edit page sandbox identifier.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} editPage Edit page instance.
				 * @return {String} Sandbox identifier.
				 */
				getEditPageSandboxId: function(editPage) {
					var schemaName = editPage.get("SchemaName");
					var typeId = editPage.get("Tag");
					return this.sandbox.id + schemaName + typeId;
				},

				/**
				 * Returns config for open card in chain.
				 * @protected
				 * @param {String} operation Record operation.
				 * @param {String} typeColumnValue Value of type column.
				 * @param {String} recordId Primary column value.
				 * @return {Object} {moduleId: String, schemaName: String, operation: String, id: String,
				 *     defaultValues: Array}} Config for open card.
				 */
				getOpenCardConfig: function(operation, typeColumnValue, recordId) {
					var editPages = this.getEditPages();
					var editPage = editPages.find(typeColumnValue) || editPages.getByIndex(0);
					var schemaName = editPage.get("SchemaName");
					var cardModuleId = this.getEditPageSandboxId(editPage);
					var defaultValues = this.getOpenDefaultValues(typeColumnValue, operation);
					return {
						moduleId: cardModuleId,
						schemaName: schemaName,
						operation: operation,
						id: recordId,
						defaultValues: defaultValues
					};
				},

				/**
				 * Returns default profile column values for page opening.
				 * @protected
				 * @return {Object[]} Default profile column values.
				 */
				getDefaultProfileColumnValues: function() {
					var defaultProfileColumnValues = [];
					var profileColumnName = this.get("profileColumnName");
					if (profileColumnName) {
						var columnValue = this.getColumnsValues(["Id"]);
						defaultProfileColumnValues.push({
							"name": profileColumnName,
							"value": columnValue.Id
						});
					}
					return defaultProfileColumnValues;
				},

				/**
				 * Returns page columns values.
				 * @private
				 * @param {String[]} columnNames Array of column names.
				 * @return {Object} Columns values.
				 */
				getColumnsValues: function(columnNames) {
					return this.sandbox.publish("GetColumnsValues", columnNames, [this.sandbox.id]);
				},

				/**
				 * Gets lookup query filters.
				 * @protected
				 * @param {String} columnName Master column name.
				 * @return {Terrasoft.FilterGroup} Filter group.
				 */
				getLookupQueryFilters: function(columnName) {
					return this.sandbox.publish("GetLookupQueryFilters", columnName, [this.sandbox.id]);
				},

				/**
				 * Returns default values for page opening.
				 * @protected
				 * @param {String} typeColumnValue Value of the type column.
				 * @param {String} operation Record operation.
				 * @return {Object[]} Default values.
				 */
				getOpenDefaultValues: function(typeColumnValue, operation) {
					var defaultValues = [];
					var typeColumnName = this.get("TypeColumnName");
					if (typeColumnName && typeColumnValue) {
						defaultValues.push({
							name: typeColumnName,
							value: typeColumnValue
						});
					}
					if (operation === ConfigurationEnums.CardStateV2.ADD) {
						var defaultProfileColumnValues = this.getDefaultProfileColumnValues();
						defaultValues = this.Ext.Array.merge(defaultValues, defaultProfileColumnValues);
					}
					return defaultValues;
				},

				/**
				 * Returns name of the entity.
				 * @protected
				 * @param {String} typeColumnValue Value of the type column.
				 * @return {String} A name of the entity.
				 */
				getEntitySchemaName: function(typeColumnValue) {
					var entitySchemaName = this.entitySchemaName;
					if (this.Ext.isEmpty(entitySchemaName)) {
						var editPages = this.getEditPages();
						if (editPages.getCount()) {
							var editPage = editPages.collection.getByKey(typeColumnValue);
							entitySchemaName = editPage.get("EntitySchemaName");
						}
					}
					return entitySchemaName;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.setValidationConfig();
					this.callParent([
						function() {
							this.initEditPages();
							this.initAddRecordButtonCaption();
							this.subscribeSandboxEvents();
							this.initMasterColumnInfo();
							this.initEntity();
							this.Ext.callback(callback, scope, arguments);
						}, this
					]);
				},

				/**
				 * Returns blank slate icon url.
				 * @protected
				 * @virtual
				 * @return {String} Blank slate icon url.
				 */
				getBlankSlateIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.BlankSlateIcon"));
				},

				/**
				 * Returns visibility tag for 'BlankSlateContainer'.
				 * @return {Boolean} Visibility tag.
				 */
				getVisibleBlankSlate: function() {
					return this.Ext.isEmpty(this.get("MasterColumnValue"));
				},

				/**
				 * Returns visibility tag for 'ProfileContentContainer'.
				 * @return {Boolean} Visibility tag.
				 */
				getVisibleContent: function() {
					return !this.getVisibleBlankSlate();
				},

				/**
				 * Sets validation config.
				 * @protected
				 */
				setValidationConfig: function() {
					this.validationConfig = null;
				},

				/**
				 * Returns hint of clear button.
				 * @return {String} Button hint.
				 */
				getClearButtonHint: function() {
					var clearActionCaption = this.get("Resources.Strings.ClearButtonCaption");
					var masterColumnInfo = this.get("MasterColumnInfo");
					if (masterColumnInfo && masterColumnInfo.caption) {
						return Ext.String.format("{0} {1}", clearActionCaption, masterColumnInfo.caption);
					}
					return clearActionCaption;
				},

				/**
				 * Initializes profile entity.
				 * @protected
				 */
				initEntity: function() {
					var masterColumnName = this.get("masterColumnName");
					var columnsValues = this.getColumnsValues([masterColumnName]);
					if (this.checkIsNeedLoadEntity(columnsValues)) {
						this.loadEntity(columnsValues);
					}
				},

				/**
				 * Initializes master column info.
				 * @protected
				 */
				initMasterColumnInfo: function() {
					var masterColumnName = this.get("masterColumnName");
					var masterColumnInfo = this.sandbox.publish("GetColumnInfo", [masterColumnName],
						[this.sandbox.id]);
					this.set("MasterColumnInfo", masterColumnInfo);
				},

				/**
				 * Subscribes for sandbox events.
				 * @protected
				 */
				subscribeSandboxEvents: function() {
					var sandbox = this.sandbox;
					var sandboxId = sandbox.id;
					sandbox.subscribe("GetEntityColumnChanges", this.onColumnChanged, this, [sandboxId]);
					sandbox.subscribe("EntityInitialized", this.onCardEntityInitialized, this, [sandboxId]);
					this.subscribeCardModuleResponse();
				},

				/**
				 * Master's entity initialized event.
				 * @protected
				 */
				onCardEntityInitialized: Ext.emptyFn,

				/**
				 * Subscribes for card module response.
				 * @protected
				 */
				subscribeCardModuleResponse: function() {
					var editCardsSandboxIds = this.getCardModuleResponseIds();
					this.sandbox.subscribe("CardModuleResponse", this.onCardModuleResponse, this, editCardsSandboxIds);
				},

				/**
				 * Returns array of card module response subscribers ids.
				 * @private
				 * @return {Array} Card module response subscribers ids.
				 */
				getCardModuleResponseIds: function() {
					var editPages = this.getEditPages();
					var editCardsSandboxIds = [];
					if (editPages) {
						editPages.each(function(editPage) {
							editCardsSandboxIds.push(this.getEditPageSandboxId(editPage));
							var entitySchemaName = this.getEntitySchemaName(editPage.get("Tag"));
							editCardsSandboxIds.push(this.getMiniPageSandboxId(entitySchemaName));
						}, this);
					}
					return editCardsSandboxIds;
				},

				/**
				 * Card saved response handler.
				 * @protected
				 * @param {Object} response Response object.
				 * @param {String} response.action Record operation.
				 * @param {Boolean} response.success Is success saved response.
				 * @param {String} response.primaryColumnValue Value of primary column.
				 * @param {String} response.primaryDisplayColumnValue Value of primary display column.
				 * @param {String} response.primaryDisplayColumnName Name of primary display column.
				 * @param {Boolean} response.isInChain Is card opened in chain flag.
				 */
				onCardModuleResponse: function(response) {
					if (response.success) {
						this.set("masterColumnValue", response.primaryColumnValue);
						var config = this.getUpdateCardPropertyConfig(response);
						this.updateCardProperty(config);
					} else {
						this.showInformationDialog(this.get("Resources.Strings.ErrorOnSaveMessage"));
					}
				},

				/**
				 * Gets config for update card property on card saved.
				 * @param {Object} response Response from server.
				 * @param {String} response.primaryColumnValue Column value.
				 * @param {String} response.primaryDisplayColumnValue Display column value.
				 * @return {Object} {key: String, value: {value: String, displayValue: Mixed}}
				 *     Update card property config.
				 */
				getUpdateCardPropertyConfig: function(response) {
					return {
						key: this.get("masterColumnName"),
						value: {
							value: response.primaryColumnValue,
							displayValue: response.primaryDisplayColumnValue
						}
					};
				},

				/**
				 * Master's entity column change event.
				 * @protected
				 * @param {Object} changedColumn Master's changed column.
				 * @param {String} changedColumn.columnValue Column value.
				 * @param {String} changedColumn.columnName Column name.
				 */
				onColumnChanged: function(changedColumn) {
					var column = {};
					column[changedColumn.columnName] = changedColumn.columnValue;
					if (this.checkIsNeedClearEntity(column)) {
						this.clearEntity();
					} else if (this.checkIsNeedLoadEntity(column)) {
						this.loadEntity(column);
					}
				},

				/**
				 * Update card property.
				 * @protected
				 * @param {Object} config Config action.
				 * @param {String} config.key Column name.
				 * @param {Mixed} config.value Column value.
				 * @param {Object} [config.options] Update column params.
				 */
				updateCardProperty: function(config) {
					this.sandbox.publish("UpdateCardProperty", config, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#clearEntity
				 * @overridden
				 */
				clearEntity: function() {
					this.set("MasterColumnValue", null);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#loadEntity
				 * @overridden
				 */
				loadEntity: function(masterColumn) {
					var masterColumnValue = masterColumn[this.get("masterColumnName")].value;
					this.set("MasterColumnValue", masterColumnValue);
					this.callParent([masterColumnValue, this.onProfileLoaded, this]);
				},

				/**
				 * Checks is need clear entity.
				 * @protected
				 * @param {Object} masterColumn Master's entity column.
				 * @return {Boolean} Is need to clear entity.
				 */
				checkIsNeedClearEntity: function(masterColumn) {
					var masterColumnName = this.get("masterColumnName");
					return !this.Ext.isEmpty(masterColumn) &&
						masterColumn.hasOwnProperty(masterColumnName) &&
						this.Ext.isEmpty(masterColumn[masterColumnName]);
				},

				/**
				 * Checks is need load entity.
				 * @protected
				 * @param {Object} masterColumn Master's entity column.
				 * @return {Boolean} Is need to load entity.
				 */
				checkIsNeedLoadEntity: function(masterColumn) {
					var masterColumnName = this.get("masterColumnName");
					return !this.Ext.isEmpty(masterColumn) &&
						masterColumn.hasOwnProperty(masterColumnName) &&
						!this.Ext.isEmpty(masterColumn[masterColumnName]);
				},

				/**
				 * After load profile entity event.
				 * @protected
				 */
				onProfileLoaded: this.Terrasoft.emptyFn,

				/**
				 * Handler pressing the cleaning button.
				 * @protected
				 */
				onClearButtonClick: function() {
					var config = {
						key: this.get("masterColumnName"),
						value: null
					};
					this.clearEntity();
					this.updateCardProperty(config);
				},

				/**
				 * Returns profile header link url.
				 * @protected
				 * @return {String} Url for profile header.
				 */
				getProfileHeaderURL: function() {
					var defaultUrl = "ViewModule.aspx#";
					if (!this.entitySchemaName) {
						return defaultUrl;
					}
					var type = this.getTypeColumnValue(this);
					var primaryColumnValue = this.get("MasterColumnValue");
					return defaultUrl + NetworkUtilities.getEntityUrl(this.entitySchemaName,
									primaryColumnValue, type);
				}
			}
		};
	}
);


