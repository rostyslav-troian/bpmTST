Terrasoft.configuration.Structures["TranslationPage"] = {innerHierarchyStack: ["TranslationPage"], structureParent: "BaseModalBoxPage"};
define('TranslationPageStructure', ['TranslationPageResources'], function(resources) {return {schemaUId:'aeff22ac-60e3-4488-950f-17a6a36d5267',schemaCaption: "TranslationPage", parentSchemaName: "BaseModalBoxPage", schemaName:'TranslationPage',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TranslationPage", ["BusinessRuleModule", "EntityResponseValidationMixin", "DynamicViewContainer",
		"TranslationListViewGenerator", "css!TranslationPageCss"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "SysTranslation",
			messages: {
				/**
				 * @message GridDataUpdated
				 * Fires after loading more data to the grid.
				 */
				"GridDataUpdated": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetOrderedGridColumns
				 * Used to get paths of visible in section grid columns in their display order.
				 */
				"GetOrderedGridColumns": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateRecordInfo
				 * Updates active translation row after changes had been made through translation modal window.
				 */
				"UpdateRecordInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetRowPositionDetails
				 * Receives previous and next record ids and canLoadMore flag to be used for back and next navigation.
				 */
				"GetRowPositionDetails": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				/**
				 * @class EntityResponseValidationMixin Validates server response. Returns true or false depending on
				 * the server response, generates error message and fires dialog in case of an error.
				 */
				EntityResponseValidationMixin: "Terrasoft.EntityResponseValidationMixin"

			},
			attributes: {
				/**
				 * Active translation editors view configuration.
				 * @type {Object}
				 */
				TranslationsViewConfig: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Contains information about previous and next rows ids and a canLoadMore rows flag.
				 * @type {Object}
				 */
				RowPositionDetails: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Contains caption for expand button.
				 * @type {Object}
				 */
				ExpandButtonCaption: {
					dataValueType: Terrasoft.DataValueType.TEXT
				},

				/**
				 * An indication that all the languages columns are visible in section.
				 * @type {Boolean}
				 */
				AllTranslationsVisible: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseModalBoxPage#getModalClosingMessageArgs
				 * @overridden
				 */
				getModalClosingMessageArgs: function() {
					var closingArgs = {
						recordId: this.getPrimaryColumnValue()
					};
					return closingArgs;
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#loadEntity
				 * @overridden
				 */
				loadEntity: function(masterColumnId) {
					if (this.isModalBox()) {
						this.updateRowPositionDetails(masterColumnId);
					}
					this.callParent(arguments);
				},

				/**
				 * Gets information that had been transferred to modal window on load.
				 * @protected
				 * @return {Object} Object passed from the module that initiated modal window opening.
				 */
				getModuleInfo: function() {
					var info = this.get("moduleInfo");
					return info || {};
				},

				/**
				 * Checks if page is opened in a modalbox context.
				 * @protected
				 * @return {Boolean}
				 */
				isModalBox: function() {
					return Boolean(this.get("moduleInfo"));
				},

				/**
				 * Sends message with the current row id to the grid and sets previous and next rows ids.
				 * @param {String} [masterColumnId] Id of a row we are getting siblings ids.
				 * If not defied PrimaryColumnValue is used.
				 * @protected
				 */
				updateRowPositionDetails: function(masterColumnId) {
					masterColumnId = masterColumnId || this.getPrimaryColumnValue();
					var rowPositionDetails = this.sandbox.publish(
						"GetRowPositionDetails", masterColumnId, [this.sandbox.id]);
					this.set("RowPositionDetails", rowPositionDetails);
				},

				/**
				 * Toggle view mode between displaying all active languages or only visible in section languages.
				 * @protected
				 */
				changeTranslationsViewMode: function() {
					var profile = this.getProfile();
					var key = this.getProfileKey();
					profile.displayAllTranslations = !this.isDisplayAllLanguagesActive();
					this.Terrasoft.utils.saveUserProfile(key, profile, false);
					this.initModalView();
				},

				/**
				 * Returns true if all languages columns need to be displayed.
				 * @protected
				 * @return {Boolean}
				 */
				isDisplayAllLanguagesActive: function() {
					var profile = this.getProfile();
					return Boolean(profile.displayAllTranslations);
				},

				/**
				 * Processes save button click event.
				 * @protected
				 */
				saveButtonClick: function() {
					this.saveIfChanged(this.close, this);
				},

				/**
				 * Filters column changes from all changed values.
				 * @protected
				 * @return {Object} Objects with column changes only.
				 */
				getChangedColumns: function() {
					var changedColumns = {};
					this.Terrasoft.each(this.changedValues, function(value, columnName) {
						if (this.findEntityColumn(columnName)) {
							changedColumns[columnName] = value;
						}
					}, this);
					return changedColumns;
				},

				/**
				 * Creates an object with row id and changed records and makes a publish of the UpdateRecordInfo
				 * message containing this object.
				 * @protected
				 * @param {Object} changedColumnValues A set of changed columns.
				 */
				updateRecordInfo: function(changedColumnValues) {
					var changesWithId = {
						recordId: this.getPrimaryColumnValue(),
						changedColumnValues: changedColumnValues
					};
					this.sandbox.publish("UpdateRecordInfo", changesWithId, [this.sandbox.id]);
				},

				/**
				 * Determines whether any changes were made and save method needs to be called
				 * before processing callback.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				saveIfChanged: function(callback, scope) {
					var changedColumns = this.getChangedColumns();
					if (!Ext.Object.isEmpty(changedColumns)) {
						this.save({
							callback: function() {
								this.updateRecordInfo(changedColumns);
								callback.call(scope);
							},
							scope: this
						});
					} else {
						callback.call(scope);
					}
				},

				/**
				 * Saves changes.
				 * @protected
				 * @param {Object} [config] Parameters.
				 * @param {Function} [config.callback] Callback function.
				 * @param {Object} [config.scope] Callback scope.
				 */
				save: function(config) {
					this.saveEntity(function(response) {
						if (this.validateResponse(response)) {
							config = config || {};
							var callback = config.callback;
							if (callback) {
								callback.call(config.scope || this);
							}
						}
					}, this);
				},

				/**
				 * Proceed to next record using passed direction.
				 * @protected
				 * @param {String} direction Direction: next or back.
				 */
				changeActiveRecord: function(direction) {
					var rowPositionDetails = this.get("RowPositionDetails");
					switch (direction) {
						case "next":
							this.loadEntity(rowPositionDetails.nextId);
							break;
						case "back":
							this.loadEntity(rowPositionDetails.previousId);
							break;
						default:
							throw Ext.create(this.Terrasoft.NotImplementedException);
					}
				},

				/**
				 * Handler for navigation buttons.
				 * @protected
				 */
				navigationButtonClick: function() {
					var direction = arguments[arguments.length - 1];
					this.saveIfChanged(function() {
						this.changeActiveRecord(direction);
					}, this);
				},

				/**
				 * Gets entity schema primary column value.
				 * @protected
				 * @return {String} Returns primary column value.
				 */
				getPrimaryColumnValue: function() {
					var primaryColumnName = this.entitySchema.primaryColumnName;
					return this.get(primaryColumnName);
				},

				/**
				 * Create instance of translation list view generator.
				 * @protected
				 * @return {Terrasoft.TranslationListViewGenerator} Returns view generator instance.
				 */
				getTranslationListViewGenerator: function() {
					return this.Ext.create(Terrasoft.TranslationListViewGenerator);
				},

				/**
				 * Initialize translations view basing on columns displayed in section and current profile.
				 * @protected
				 */
				initTranslationsViewConfig: function() {
					this.updateExpandButtonCaption();
					var viewGenerator = this.getTranslationListViewGenerator();
					var includeAllColumns = this.isDisplayAllLanguagesActive();
					var columnsInfo = this.getTranslationColumnsInfo(includeAllColumns);
					var typeInfo = this.getTypeInfo();
					var fullTypeName = typeInfo.fullTypeName;
					var viewConfig = viewGenerator.generateTranslationsView(columnsInfo.items, {
						viewModelClass: Ext.ClassManager.get(fullTypeName)
					});
					this.set("AllTranslationsVisible", columnsInfo.allColumnsVisible);
					this.set("TranslationsViewConfig", viewConfig);
				},

				/**
				 * Returns regular expression for parsing culture index from translation column path.
				 * @protected
				 * @return {RegExp}
				 */
				getCultureIndexRegEx: function() {
					return /language(\d*)/i;
				},

				/**
				 * Returns culture index parsed from column path.
				 * @protected
				 * @param {String} columnPath Column path.
				 * @return {Number}
				 */
				getCultureIndex: function(columnPath) {
					var regEx = this.getCultureIndexRegEx();
					var index = NaN;
					if (regEx.test(columnPath)) {
						var indexMatch = regEx.exec(columnPath)[1];
						if (!this.Ext.isEmpty(indexMatch)) {
							index = Number(indexMatch);
						}
					}
					return index;
				},

				/**
				 * Returns array of columns info contains language index and caption for columns that are visible in
				 * section.
				 * @protected
				 */
				getVisibleColumnsInfo: function() {
					var visibleColumns = this.sandbox.publish("GetOrderedGridColumns", null, [this.sandbox.id]);
					var info = [];
					this.Terrasoft.each(visibleColumns, function(columnPath) {
						var column = this.findEntityColumn(columnPath);
						var cultureIndex = this.getCultureIndex(columnPath);
						if (column && this.Ext.isNumber(cultureIndex)) {
							info.push({
								cultureIndex: cultureIndex,
								caption: column.caption
							});
						}
					}, this);
					return info;
				},

				/**
				 * Returns current translation columns information.
				 * @protected
				 * @param {Boolean} includeAllColumns If defined as true, info for all available columns will be
				 * returned.
				 * @return {Object} result Result.
				 * @return {Array} result.items Array of columns info contains language index and caption.
				 * @return {Boolean} result.allColumnsVisible True if all available translation columns are visible in
				 * section.
				 */
				getTranslationColumnsInfo: function(includeAllColumns) {
					var items = this.getVisibleColumnsInfo();
					var allColumnsVisible = true;
					this.Terrasoft.each(this.entitySchema.columns, function(column, columnPath) {
						var columnUsageType = column.usageType;
						if (columnUsageType !== this.Terrasoft.EntitySchemaColumnUsageType.General) {
							return;
						}
						var cultureIndex = this.getCultureIndex(columnPath);
						if (!this.Ext.isNumber(cultureIndex)) {
							return;
						}
						var existColumnInfo = this.Terrasoft.findItem(items, {cultureIndex: cultureIndex});
						if (!existColumnInfo) {
							allColumnsVisible = false;
							if (includeAllColumns) {
								items.push({
									cultureIndex: cultureIndex,
									caption: column.caption
								});
							}
						}
					}, this);
					return {
						items: items,
						allColumnsVisible: allColumnsVisible
					};
				},

				/**
				 * Handler for discard changes button. Reloads row from database.
				 * @protected
				 */
				onDiscardChangesClick: function() {
					this.loadEntity(this.getPrimaryColumnValue());
				},

				/**
				 * Returns true if there is ability to load previous record.
				 * @protected
				 */
				canNavigateBack: function() {
					var rowDetails = this.get("RowPositionDetails") || {};
					return Boolean(rowDetails.previousId);
				},

				/**
				 * Returns true if there is ability to load next record.
				 * @protected
				 */
				canNavigateForward: function() {
					var rowDetails = this.get("RowPositionDetails") || {};
					return Boolean(rowDetails.nextId);
				},

				/**
				 * Initializes caption for expand button basing on current languages display mode.
				 * @protected
				 * @return {String}
				 */
				updateExpandButtonCaption: function() {
					var expandKey = "Resources.Strings.ExpandButton_ExpandCaption";
					var collapseKey = "Resources.Strings.ExpandButton_CollapseCaption";
					var allDisplayed = this.isDisplayAllLanguagesActive();
					var resourceKey = allDisplayed ? collapseKey : expandKey;
					this.set("ExpandButtonCaption", this.get(resourceKey));
				},

				/**
				 * Initializes page view that depends on its state.
				 * @protected
				 */
				initModalView: function() {
					this.initTranslationsViewConfig();
					var newSize = this.getWindowSize();
					this.resize(newSize);
				},

				/**
				 * Returns modal window size for current state.
				 * @protected
				 * @return {Object}
				 * @return {Number} return.width Initial width.
				 * @return {Number} return.height Initial height.
				 */
				getWindowSize: function() {
					var allTranslationsVisible = this.get("AllTranslationsVisible");
					return (allTranslationsVisible || this.isDisplayAllLanguagesActive()) ?
						this.getExpandedWindowSize()
						: this.getCollapsedWindowSize();
				},

				/**
				 * Returns modal window size for expanded state.
				 * @protected
				 * @return {Object}
				 * @return {Number} return.width Initial width.
				 * @return {Number} return.height Initial height.
				 */
				getExpandedWindowSize: function() {
					return {
						width: "80%",
						height: "70%"
					};
				},

				/**
				 * Returns modal window size for collapsed state.
				 * @protected
				 * @return {Object}
				 * @return {Number} return.width Initial width.
				 * @return {Number} return.height Initial height.
				 */
				getCollapsedWindowSize: function() {
					return {
						width: "80%",
						height: 320
					};
				},

				/**
				 * Validates response.
				 * @protected
				 * @param response Response.
				 * @return {Boolean}
				 */
				validateResponse: function(response) {
					if (!response.success) {
						var errorCode = response.errorInfo.errorCode;
						if (errorCode === "WriteLocalizableValueException") {
							return this.handleWriteLocalizableValueException(response.errorInfo);
						}
						if (errorCode === "InvalidResourceKeyFormatException") {
							return this.handleInvalidResourceKeyFormatException(response.errorInfo);
						}
					}
					return this.mixins.EntityResponseValidationMixin.validateResponse.apply(this, arguments);
				},

				/**
				 * Handles WriteLocalizableValue exception.
				 * @protected
				 * @return {Boolean}
				 */
				handleWriteLocalizableValueException: function() {
					var message = this.get("TranslationSaveErrorMessage");
					this.showInformationDialog(message);
					return false;
				},

				/**
				 * Handles InvalidResourceKeyFormat exception.
				 * @protected
				 * @return {Boolean}
				 */
				handleInvalidResourceKeyFormatException: function() {
					var message = this.get("TranslationSaveErrorMessage");
					this.showInformationDialog(message);
					return false;
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					if (!this.isModalBox()) {
						this.callParent(arguments);
						return;
					}
					var moduleInfo = this.getModuleInfo();
					var primaryColumnValue = moduleInfo.recordId;
					this.sandbox.subscribe("GridDataUpdated", this.updateRowPositionDetails, this, [this.sandbox.id]);
					this.callParent([function() {
						this.initModalView();
						this.loadEntity(primaryColumnValue, callback, scope);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseModalBoxPage#getModalBoxInitialConfig
				 * @overridden
				 */
				getModalBoxInitialConfig: function() {
					var size = this.getWindowSize();
					return {initialSize: size};
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"name": "Key",
					"values": {
						"wrapClass": ["key-edit"]
					}
				},
				{
					"operation": "insert",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"name": "LanguagesContainerList",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.DynamicViewContainer",
						"wrapClass": ["tools-container"],
						"viewConfig": {"bindTo": "TranslationsViewConfig"}
					}
				},
				{
					"operation": "insert",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"name": "ButtonContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["tools-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ButtonContainer",
					"propertyName": "items",
					"name": "ExpandButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {bindTo: "changeTranslationsViewMode"},
						"caption": {bindTo: "ExpandButtonCaption"},
						"visible": {
							"bindTo": "AllTranslationsVisible",
							"bindConfig": {"converter": "invertBooleanValue"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CardContentWrapper",
					"propertyName": "items",
					"name": "FooterContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["footer-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "FooterContainer",
					"propertyName": "items",
					"name": "FooterBottomRightContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["footer-bottom-right-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "FooterBottomRightContainer",
					"propertyName": "items",
					"name": "SaveButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"click": {"bindTo": "saveButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"markerValue": "SaveButton"
					}
				},
				{
					"operation": "insert",
					"parentName": "FooterBottomRightContainer",
					"propertyName": "items",
					"name": "CloseButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
						"click": {"bindTo": "close"},
						"markerValue": "CloseButton"
					}
				},
				{
					"operation": "insert",
					"parentName": "FooterContainer",
					"propertyName": "items",
					"name": "FooterBottomLeftContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["footer-bottom-left-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "FooterBottomLeftContainer",
					"propertyName": "items",
					"name": "BackButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.BackButtonCaption"},
						"click": {"bindTo": "navigationButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"enabled": {"bindTo": "canNavigateBack"},
						"tag": "back",
						"markerValue": "BackRecordButton",
						"imageConfig": {"bindTo": "Resources.Images.NavigationButtonImage"},
						"classes": {
							"wrapperClass": ["navigation-button", "navigation-button-back"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "FooterBottomLeftContainer",
					"propertyName": "items",
					"name": "NextButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.NextButtonCaption"},
						"click": {"bindTo": "navigationButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"enabled": {"bindTo": "canNavigateForward"},
						"tag": "next",
						"markerValue": "NextRecordButton",
						"imageConfig": {"bindTo": "Resources.Images.NavigationButtonImage"},
						"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
						"classes": {
							"wrapperClass": ["navigation-button", "navigation-button-next"]
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Key": {
					"DisableKey": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							},
							comparisonType: this.Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				},
				"ModifiedOnDefault": {
					"DisableModifiedOnDefault": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							},
							comparisonType: this.Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				}
			}
		};
	}
);


