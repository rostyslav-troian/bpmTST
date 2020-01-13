Terrasoft.configuration.Structures["ScoringRulePageV2"] = {innerHierarchyStack: ["ScoringRulePageV2"], structureParent: "BasePageV2"};
define('ScoringRulePageV2Structure', ['ScoringRulePageV2Resources'], function(resources) {return {schemaUId:'836def6a-5352-4bcc-8771-839af8adbc70',schemaCaption: "Scoring rule page", parentSchemaName: "BasePageV2", schemaName:'ScoringRulePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ScoringRulePageV2", ["ScoringRulePageV2Resources", "ScoringRuleFilterProvider", "css!ScoringModuleCSS"],
		function(resources) {
	return {
		entitySchemaName: "ScoringRule",
		messages: {
			/**
			 * @message GetFilterModuleConfig
			 * Returns settings for the filter unit.
			 */
			"GetFilterModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message OnFiltersChanged
			 * Subscription for the filter unit modification event.
			 */
			"OnFiltersChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * Value of "Effective for, days" field of the rule.
			 */
			"Duration": {
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
				dataValueType: Terrasoft.DataValueType.INTEGER,
				dependencies: [{
					columns: ["IsDurationModeLimitTo"],
					methodName: "initDuration"
				}]
			},
			/**
			 * Value of "Number of times applied" field of the rule.
			 */
			"ScoringCount": {
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
				dataValueType: Terrasoft.DataValueType.INTEGER,
				dependencies: [{
					columns: ["IsScoringCountModeLimitTo"],
					methodName: "initScoringCount"
				}]
			},
			/**
			 * Object identifier of the scoring model rule.
			 */
			"ScoringModelObjectId": {
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
				dataValueType: Terrasoft.DataValueType.GUID,
				columnPath: "ScoringModel.ScoringObject.Id"
			},
			/**
			 * Indicates that "LimitTo" mode of the rule duration enabled.
			 */
			"IsDurationModeLimitTo": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Indicates that "LimitTo" mode of the rule "ScoringCount" enabled.
			 */
			"IsScoringCountModeLimitTo": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Indicates state of the Enabled parameter of the DurationInfinite control.
			 */
			"IsDurationInfiniteEnabled": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Indicates state of the Enabled parameter of the ScoringCountInfinite control.
			 */
			"IsScoringCountInfiniteEnabled": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Indicates state of the Enabled parameter of the ScoringCountLimitToValue control.
			 */
			"IsScoringCountEditable": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				dependencies: [{
					columns: ["IsScoringCountModeLimitTo", "IsScoringCountInfiniteEnabled"],
					methodName: "initIsScoringCountEditable"
				}]
			},
			/**
			 * Indicates state of the Enabled parameter of the DurationLimitToValue control.
			 */
			"IsDurationEditable": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				dependencies: [{
					columns: ["IsDurationModeLimitTo", "IsDurationInfiniteEnabled"],
					methodName: "initIsDurationEditable"
				}]
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initRunProcessButtonMenu
			 * @overridden
			 */
			initRunProcessButtonMenu: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initActionButtonMenu
			 * @overridden
			 */
			initActionButtonMenu: function() {
				this.set("ActionsButtonVisible", false);
			},

			/**
			 * Returns identifier of the FilterEditModule.
			 * @private
			 * @return {String} Identifier.
			 */
			getFilterEditModuleId: function() {
				return this.sandbox.id + "_FilterEditModule";
			},

			/**
			 * Loads the FilterEditModule.
			 * @private
			 */
			loadFilterModule: function() {
				var moduleId = this.getFilterEditModuleId();
				var sandbox = this.sandbox;
				sandbox.subscribe("OnFiltersChanged", this.onConditionFiltersChanged, this, [moduleId]);
				sandbox.subscribe("GetFilterModuleConfig", this.onConditionGetFilterModuleConfig, this, [moduleId]);
				sandbox.loadModule("FilterEditModule", {renderTo: "ExtendedFiltersContainer", id: moduleId});
			},

			/**
			 * Returns name of the entity schema by it's unique identifier.
			 * @param {Guid} entitySchemaUId Unique identifier of the entity schema.
			 * @return {String} Name of the entity schema.
			 */
			getEntitySchemaNameByUId: function(entitySchemaUId) {
				var schema = Terrasoft.EntitySchemaManager.getItem(entitySchemaUId);
				if (schema) {
					return schema.name;
				}
			},

			/**
			 * Returns config for the FilterEditModule.
			 * @private
			 * @return {Object} Config.
			 */
			onConditionGetFilterModuleConfig: function() {
				var scoringModelObjectId = this.get("ScoringModelObjectId");
				return {
					rootSchemaName: this.getEntitySchemaNameByUId(scoringModelObjectId),
					filters: this.get("FilterData"),
					filterProviderClassName: "Terrasoft.ScoringRuleFilterProvider"
				};
			},

			/**
			 * Handles "change" event of the FilterEditModule.
			 * @param {Terrasoft.FilterGroup} args.filter Filter.
			 * @param {String} args.serializedFilter Serialized filter.
			 * @param {Object} args Event arguments.
			 */
			onConditionFiltersChanged: function(args) {
				this.set("FilterData", args.serializedFilter);
				var filter = args.filter;
				var isAggregativeFilterExists = false;
				if (filter instanceof Terrasoft.Collection) {
					filter.each(function(filterItem) {
						isAggregativeFilterExists = (isAggregativeFilterExists || filterItem.isAggregative);
					});
				}
				if (!isAggregativeFilterExists) {
					this.set("Duration", 1);
					this.set("ScoringCount", 1);
					this.set("IsScoringCountModeLimitTo", true);
					this.set("IsDurationModeLimitTo", true);
				}
				this.set("IsDurationInfiniteEnabled", isAggregativeFilterExists);
				this.set("IsScoringCountInfiniteEnabled", isAggregativeFilterExists);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.initIsScoringCountModeLimitTo();
				this.initIsDurationModeLimitTo();
				this.loadFilterModule();
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig.
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Duration", this.durationValidator);
				this.addColumnValidator("ScoringCount", this.scoringCountValidator);
			},

			/**
			 * Validates value of the ScoringCount column.
			 * @protected
			 */
			scoringCountValidator: function() {
				var value = this.get("ScoringCount");
				var isEditable = this.get("IsScoringCountModeLimitTo");
				return this.baseIntegerEditValidator(value, isEditable, "ScoringCountValidationErrorMessage");
			},

			/**
			 * Validates value of the Duration column.
			 * @protected
			 */
			durationValidator: function() {
				var value = this.get("Duration");
				var isEditable = this.get("IsDurationModeLimitTo");
				return this.baseIntegerEditValidator(value, isEditable, "DurationValidationErrorMessage");
			},

			/**
			 * Validates integer on positive value, if validation is not successful returns message.
			 * @private
			 * @param {Number} value Value to validate.
			 * @param {Boolean} isValidationRequired Is validation required.
			 * @param {String} validationMessageName The validation message.
			 * @return {Object} Validation result.
			 */
			baseIntegerEditValidator: function(value, isValidationRequired, validationMessageName) {
				var invalidMessage = "";
				if (isValidationRequired && (value == null || value <= 0)) {
					invalidMessage = resources.localizableStrings[validationMessageName];
				}
				return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
				};
			},

			/**
			 * Initializes the Duration property.
			 * @protected
			 */
			initDuration: function() {
				if (!this.get("IsDurationModeLimitTo")) {
					this.set("Duration", 0);
				}
			},

			/**
			 * Initializes the ScoringCount property.
			 * @protected
			 */
			initScoringCount: function() {
				if (!this.get("IsScoringCountModeLimitTo")) {
					this.set("ScoringCount", 0);
				}
			},

			/**
			 * Initializes the IsScoringCountEditable property.
			 * @protected
			 */
			initIsScoringCountEditable: function() {
				var isEditable = this.get("IsScoringCountModeLimitTo") && this.get("IsScoringCountInfiniteEnabled");
				this.set("IsScoringCountEditable", isEditable);
			},

			/**
			 * Initializes the IsDurationEditable property.
			 * @protected
			 */
			initIsDurationEditable: function() {
				var isEditable = this.get("IsDurationModeLimitTo") && this.get("IsDurationInfiniteEnabled");
				this.set("IsDurationEditable", isEditable);
			},

			/**
			 * Initializes the IsScoringCountModeLimitTo property.
			 * @protected
			 */
			initIsScoringCountModeLimitTo: function() {
				var isEditable = (this.get("ScoringCount") !== 0);
				this.set("IsScoringCountModeLimitTo", isEditable);
			},

			/**
			 * Initializes the IsDurationModeLimitTo property.
			 * @protected
			 */
			initIsDurationModeLimitTo: function() {
				var isEditable = (this.get("Duration") !== 0);
				this.set("IsDurationModeLimitTo", isEditable);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"parentName": "HeaderContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "MainGroups",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ConditionsGroup",
				"parentName": "MainGroups",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": resources.localizableStrings.ConditionsGroupCaption,
					"layout": {"column": 0, "row": 0, "colSpan": 11, "rowSpan": 1},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "OptionsContainer",
				"parentName": "MainGroups",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {"column": 13, "row": 0, "colSpan": 11, "rowSpan": 1},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "OptionsLayout",
				"parentName": "OptionsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PointsGroup",
				"parentName": "OptionsLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": resources.localizableStrings.PointsGroupCaption,
					"layout": {"column": 0, "row": 0, "colSpan": 24, "rowSpan": 1},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountGroup",
				"parentName": "OptionsLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": resources.localizableStrings.ScoringCountGroupCaption,
					"wrapClass": "t-overflow-visible",
					"layout": {"column": 0, "row": 1, "colSpan": 24, "rowSpan": 1},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DurationGroup",
				"parentName": "OptionsLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": resources.localizableStrings.DurationGroupCaption,
					"wrapClass": "t-overflow-visible",
					"layout": {"column": 0, "row": 2, "colSpan": 24, "rowSpan": 1},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ExtendedFiltersContainer",
				"parentName": "ConditionsGroup",
				"propertyName": "items",
				"values": {
					"id": "ExtendedFiltersContainer",
					"selectors": {"wrapEl": "#ExtendedFiltersContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DurationGroupRow1",
				"parentName": "DurationGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "t-margin-left-1em",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DurationGroupRow2",
				"parentName": "DurationGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "t-margin-left-1em",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DurationInfinite",
				"parentName": "DurationGroupRow1",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"wrapClass": "t-display-inline-block t-width-auto t-margin-right-1em",
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "IsDurationModeLimitTo"},
					"enabled": {"bindTo": "IsDurationInfiniteEnabled"},
					"tag": false
				}
			},
			{
				"operation": "insert",
				"name": "DurationInfiniteText",
				"parentName": "DurationGroupRow1",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelConfig": {"classes": ["t-width-auto t-vertical-align-middle"]},
					"caption": resources.localizableStrings.DurationInfiniteCaption
				}
			},
			{
				"operation": "insert",
				"name": "DurationLimitTo",
				"parentName": "DurationGroupRow2",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"wrapClass": "t-display-inline-block t-width-auto t-margin-right-1em",
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "IsDurationModeLimitTo"},
					"tag": true
				}
			},
			{
				"operation": "insert",
				"name": "DurationLimitToValue",
				"parentName": "DurationGroupRow2",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"wrapClass": "t-display-inline-block t-max-width-5em " +
						"t-validation-message-min-width-15em t-disabled-validation-hidden",
					"labelConfig": {"visible": false},
					"value": {"bindTo": "Duration"},
					"enabled": {"bindTo": "IsDurationEditable"}

				}
			},
			{
				"operation": "insert",
				"name": "DurationLimitToText",
				"parentName": "DurationGroupRow2",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelConfig": {"classes": ["t-margin-left-1em t-width-auto t-vertical-align-middle"]},
					"caption": resources.localizableStrings.DurationLimitToCaption
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountGroupRow1",
				"parentName": "ScoringCountGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "t-margin-left-1em",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountGroupRow2",
				"parentName": "ScoringCountGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "t-margin-left-1em",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountGroupRow3",
				"parentName": "ScoringCountGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "t-margin-left-1em",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountInfinite",
				"parentName": "ScoringCountGroupRow1",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"wrapClass": "t-display-inline-block t-width-auto t-margin-right-1em",
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "IsScoringCountModeLimitTo"},
					"enabled": {"bindTo": "IsScoringCountInfiniteEnabled"},
					"tag": false
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountInfiniteText",
				"parentName": "ScoringCountGroupRow1",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelConfig": {"classes": ["t-width-auto t-vertical-align-middle"]},
					"caption": resources.localizableStrings.ScoringCountInfiniteCaption
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountLimitTo",
				"parentName": "ScoringCountGroupRow2",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"wrapClass": "t-display-inline-block t-width-auto t-margin-right-1em",
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "IsScoringCountModeLimitTo"},
					"tag": true
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountLimitToText",
				"parentName": "ScoringCountGroupRow2",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelConfig": {"classes": ["t-margin-right-1em t-width-auto t-vertical-align-middle"]},
					"caption": resources.localizableStrings.ScoringCountLimitToCaption
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountLimitToValue",
				"parentName": "ScoringCountGroupRow2",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"wrapClass": "t-display-inline-block t-max-width-5em " +
						"t-validation-message-min-width-15em t-disabled-validation-hidden",
					"labelConfig": {"visible": false},
					"value": {"bindTo": "ScoringCount"},
					"enabled": {"bindTo": "IsScoringCountEditable"}
				}
			},
			{
				"operation": "insert",
				"name": "ScoringCountLimitToText2",
				"parentName": "ScoringCountGroupRow2",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelConfig": {"classes": ["t-margin-left-1em t-width-auto t-vertical-align-middle"]},
					"caption": resources.localizableStrings.ScoringCountLimitToCaption2
				}
			},
			{
				"operation": "insert",
				"name": "PointsGroupRow1",
				"parentName": "PointsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": "t-margin-left-1em",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PointsText",
				"parentName": "PointsGroupRow1",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelConfig": {"classes": ["t-margin-right-1em t-width-auto t-vertical-align-middle"]},
					"caption": resources.localizableStrings.PointsCaption
				}
			},
			{
				"operation": "insert",
				"name": "PointsValue",
				"parentName": "PointsGroupRow1",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"wrapClass": "t-display-inline-block t-max-width-5em",
					"labelConfig": {"visible": false},
					"value": {"bindTo": "ScoringPoints"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


