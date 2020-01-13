Terrasoft.configuration.Structures["QuestionUserTaskPropertiesPage"] = {innerHierarchyStack: ["QuestionUserTaskPropertiesPage"], structureParent: "BaseUserTaskPropertiesPage"};
define('QuestionUserTaskPropertiesPageStructure', ['QuestionUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'f0405edc-6d61-4d72-9880-c3e2dd6d4b29',schemaCaption: "QuestionUserTaskPropertiesPage", parentSchemaName: "BaseUserTaskPropertiesPage", schemaName:'QuestionUserTaskPropertiesPage',parentSchemaUId:'824a1fba-a081-4d8a-940c-6c258c298687',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseUserTaskPropertiesPage
 */
define("QuestionUserTaskPropertiesPage", ["Contact", "QuestionUserTaskPropertiesPageResources",
	"ConfigurationItemGenerator"
], function(Contact) {
	return {
		attributes: {
			/**
			 * Field settings of question for user.
			 */
			"Question": {
				"dataValueType": Terrasoft.DataValueType.MAPPING,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"doAutoSave": true,
				"initMethod": "initQuestionProperty"
			},
			/**
			 * Current decision mode, parameter of element.
			 */
			"DecisionMode": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"doAutoSave": true,
				"initMethod": "initDecisionMode"
			},
			/**
			 * Select decision mode, single or multi select.
			 */
			"DecisionModeLookup": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true
			},
			/**
			 * Collection viewModel's controls for list of answers.
			 */
			"RecordAnswerValues": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isCollection": true,
				"value": Ext.create("Terrasoft.Collection"),
				"initMethod": "initRecordAnswerValues"
			},
			/**
			 * Record answer view element config.
			 */
			"RecordAnswersViewConfig": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Who answers the question.
			 */
			"OwnerId": {
				"dataValueType": Terrasoft.DataValueType.MAPPING,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"doAutoSave": true
			},
			/**
			 * Indicates that Decision is required.
			 */
			"IsDecisionRequired": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"doAutoSave": true,
				"initMethod": "initIsDecisionRequired"
			},
			/**
			 * Count of default record.
			 */
			"DefaultRecordCount": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 3
			},
			"Recommendation": {
				"isRequired": false
			},
			"StartInPeriod": {
				"isRequired": false
			},
			"DurationPeriod": {
				"isRequired": false
			},
			"RemindBeforePeriod": {
				"isRequired": false
			},
			/**
			 * Flag that indicates whether visibility of answer options info button.
			 */
			"AnswerOptionsInfoButtonVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Sets visibility for answer options button.
			 * @private
			 */
			setAnswerOptionsInfoButtonVisible: function() {
				var answers = this.get("RecordAnswerValues");
				var visible = true;
				if (answers && answers.getCount() > 0) {
					visible = false;
				}
				this.set("AnswerOptionsInfoButtonVisible", visible);
			},

			/**
			 * Sets configuration view of the element.
			 * @private
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 */
			getRecordAnswerControlsViewConfig: function(itemConfig) {
				var defaultValuesViewConfig = this.get("RecordAnswersViewConfig");
				if (defaultValuesViewConfig) {
					itemConfig.config = defaultValuesViewConfig;
					return;
				}
				itemConfig.config = this.getRecordAnswerControlViewConfig();
				this.set("RecordAnswersViewConfig", itemConfig.config);
			},

			/**
			 * Generates configuration view of the element.
			 * @private
			 * @return {Object}
			 */
			getRecordAnswerControlViewConfig: function() {
				var toolButtonConfig = this.getParameterToolsButtonConfig("QuestionEditToolsButton");
				toolButtonConfig.markerValue = {
					"bindTo": "ToolButtonMarker"
				};
				var controlViewConfig = this.getContainerConfig("item", [], [
					this.getContainerConfig("ParameterValueContainer", ["parameter-value-ct",
						"placeholderOpacity"
					], [
						this.getContainerConfig("ToolsContainer", ["tools-container-wrapClass", "control-width-15"],
							[{
								"id": "Value",
								"className": "Terrasoft.TextEdit",
								"value": {
									bindTo: "Value"
								},
								"markerValue": {
									"bindTo": "MarkerValue"
								},
								"placeholder": {
									"bindTo": "ItemPlaceholder"
								}
							}, {
								"className": "Terrasoft.Button",
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"markerValue": "DefChecked",
								"enabled": false,
								"imageConfig": this.get("Resources.Images.DefCheckedIcon"),
								"visible": {"bindTo": "getDefCheckedIconVisible"},
								"hint": this.get("Resources.Strings.DefCheckedButtonHint")
							},
								this.getContainerConfig("ToolsButtonWrap", ["tools-button-container-wrapClass"],
									[toolButtonConfig])
							])
					])
				]);
				return controlViewConfig;
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#customValidator
			 * @overridden
			 */
			customValidator: function() {
				var collection = this.get("RecordAnswerValues");
				var isValid = !Ext.isEmpty(collection) && !collection.isEmpty();
				if (isValid) {
					collection.each(function(item) {
						var answer = item.get("Value");
						isValid = !Ext.isEmpty(answer);
						return !isValid;
					}, this);
				}
				var message = this.get("Resources.Strings.RecordAnswerValuesInvalidMessage");
				var validationInfo = {
					isValid: isValid,
					invalidMessage: isValid ? "" : message
				};
				this.addCustomValidationResult(validationInfo);
				return validationInfo;
			},

			/**
			 * Initializes IsDecisionRequired property.
			 * @protected
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
			 */
			initIsDecisionRequired: function(parameter) {
				if (parameter) {
					this.initProperty(parameter);
				}
				var isDecisionRequired = this.get("IsDecisionRequired");
				this.set("IsDecisionRequired", JSON.parse(isDecisionRequired));
			},

			/**
			 * Sets attribute "Question".
			 * @protected
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
			 */
			initQuestionProperty: function(parameter) {
				var parameterName = parameter.name;
				var mappingValue = parameter.getMappingValue();
				if (!mappingValue.value) {
					var element = this.get("ProcessElement");
					var elementCaptionValue = element.caption.getValue();
					mappingValue.value = elementCaptionValue;
					mappingValue.displayValue = elementCaptionValue;
					mappingValue.source = Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
					parameter.setMappingValue(mappingValue);
				}
				this.set(parameterName, mappingValue);
			},

			/**
			 * Sets attribute "DecisionMode".
			 * @protected
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
			 */
			initDecisionMode: function(parameter) {
				var parameterName = parameter.name;
				var parameterValue = this.getParameterValue(parameter);
				var decisionModeLIst = this.getDecisionModeList();
				var decisionModeItems = decisionModeLIst.getItems();
				this.set("DecisionModeLookup", decisionModeItems[parameterValue]);
				this.set(parameterName, parameterValue);
			},

			/**
			 * Init list of answers from process.
			 * @protected
			 */
			initRecordAnswerValues: function() {
				var controlList = this.get("RecordAnswerValues");
				controlList.clear();
				var element = this.get("ProcessElement");
				var parameter = element.findParameterByName("BranchingDecisions");
				if (!parameter) {
					throw new Terrasoft.exceptions.ItemNotFoundException({
						message: "Parameter [BranchingDecisions] not found"
					});
				}
				var metaDataCollectionValue = Terrasoft.decode(parameter.sourceValue.value);
				var answerItems = metaDataCollectionValue
					? this.getAnswers(metaDataCollectionValue.$values)
					: this.getDefaultAnswers();
				answerItems.forEach(function(answerItem) {
					controlList.add(answerItem.get("Id"), answerItem);
				});
				this.setAnswerOptionsInfoButtonVisible();
			},

			/**
			 * Adds record to answers block.
			 * @protected
			 */
			onAddRecordAnswerValues: function() {
				var controlList = this.get("RecordAnswerValues");
				var lastItemIndex = controlList.getCount();
				var config = this.getAnswerViewModelConfig();
				config.Name = {
					value: this.getItemName()
				};
				config.PlaceholderIndex = lastItemIndex + 1;
				var viewModel = this.getRecordAnswerViewModel(config, lastItemIndex);
				controlList.add(config.Id.value, viewModel);
				this.setAnswerOptionsInfoButtonVisible();
			},

			/**
			 * Gets default list of answers.
			 * @protected
			 * @return {Array}
			 */
			getDefaultAnswers: function() {
				var answers = [];
				var defaultRecordCount = this.get("DefaultRecordCount");
				for (var j = 0; j < defaultRecordCount; j++) {
					var config = this.getAnswerViewModelConfig();
					config.Name = {
						value: this.getItemName(j)
					};
					config.PlaceholderIndex = j + 1;
					var viewModel = this.getRecordAnswerViewModel(config, j);
					answers.push(viewModel);
				}
				return answers;
			},

			/**
			 * Gets default config of answer viewModel.
			 * @protected
			 * @param {Terrasoft.BaseModel} [control] Answer list item.
			 * @return {Object}
			 */
			getAnswerViewModelConfig: function(control) {
				var captionValue = control ? control.get("Value") : "";
				var caption = {
					isLczValue: true,
					value: captionValue
				};
				var config = {
					ItemUId: control ? control.get("ItemUId") : Terrasoft.generateGUID(),
					Id: {
						value: control ? control.get("Id") : Terrasoft.generateGUID()
					},
					Name: {
						value: control ? control.get("Name") : ""
					},
					Caption: caption,
					DefChecked: {
						value: control ? control.get("DefChecked") : "False"
					}
				};
				return config;
			},

			/**
			 * Gets name for item of answers list.
			 * @protected
			 * @param {Number} index number of item in answer list.
			 * @return {String}
			 */
			getItemName: function(index) {
				if (!Ext.isEmpty(index)) {
					return "Decision" + index;
				}
				var controlList = this.get("RecordAnswerValues");
				var namesIndexes = [];
				Terrasoft.each(controlList.getItems(), function(item) {
					var name = item.get("Name");
					var nameIndex = name.replace(/\D+/g, "");
					if (!Ext.isEmpty(nameIndex)) {
						namesIndexes.push(nameIndex);
					}
				}, this);
				var newItemNameIndex = 0;
				if (!Ext.isEmpty(namesIndexes)) {
					newItemNameIndex = Math.max.apply(null, namesIndexes) + 1;
				}
				return "Decision" + newItemNameIndex;
			},

			/**
			 * Gets menu list for selected answer item.
			 * @protected
			 * @return {Terrasoft.Collection}
			 */
			getAnswerMenuList: function() {
				var toolsButtonMenu = Ext.create("Terrasoft.Collection");
				toolsButtonMenu.add(
					this.getButtonMenuItem({
						"id": "DefChecked",
						"caption": this.get("Resources.Strings.SetDefCheckedCaption"),
						"click": {
							"bindTo": "setDefChecked"
						}
					})
				);
				toolsButtonMenu.add(
					this.getButtonMenuItem({
						"id": "MoveUp",
						"caption": this.get("Resources.Strings.MoveUpCaption"),
						"click": {
							"bindTo": "moveUpRecord"
						}
					})
				);
				toolsButtonMenu.add(
					this.getButtonMenuItem({
						"id": "MoveDown",
						"caption": this.get("Resources.Strings.MoveDownCaption"),
						"click": {
							"bindTo": "moveDownRecord"
						}
					})
				);
				toolsButtonMenu.add(
					this.getButtonMenuItem({
						"id": "Delete",
						"caption": this.get("Resources.Strings.DeleteCaption"),
						"click": {
							"bindTo": "deleteRecord"
						}
					})
				);
				return toolsButtonMenu;
			},

			/**
			 * Sets DefChecked for selected item.
			 * @protected
			 */
			setDefChecked: function() {
				var defChecked = this.getDefCheckedIconVisible();
				var controlList = this.get("RecordAnswerValues");
				var selectedRecordId = this.get("Id");
				this.set("DefChecked", defChecked ? "False" : "True");
				if (!defChecked) {
					Terrasoft.each(controlList.getItems(), function(item) {
						if (item.get("Id") !== selectedRecordId) {
							item.set("DefChecked", "False");
						}
					}, this);
				}
			},

			/**
			 * Changes position of selected item in answers list.
			 * @protected
			 */
			moveUpRecord: function() {
				var controlList = this.get("RecordAnswerValues");
				var currentIndex = controlList.indexOf(this);
				var replacebleIndex = currentIndex - 1;
				if (currentIndex > 0) {
					var replacebleItem = controlList.getByIndex(replacebleIndex);
					replacebleItem.set("MarkerValue", "Answer" + currentIndex);
					this.set("MarkerValue", "Answer" + replacebleIndex);
					controlList.removeByIndex(currentIndex);
					controlList.add(this.get("Id"), this, replacebleIndex);
				}
			},

			/**
			 * Changes position of selected item in answers list.
			 * @protected
			 */
			moveDownRecord: function() {
				var controlList = this.get("RecordAnswerValues");
				var currentIndex = controlList.indexOf(this);
				var replacebleIndex = currentIndex + 1;
				if (currentIndex < controlList.getCount() - 1) {
					var replacebleItem = controlList.getByIndex(replacebleIndex);
					replacebleItem.set("MarkerValue", "Answer" + currentIndex);
					this.set("MarkerValue", "Answer" + replacebleIndex);
					controlList.removeByIndex(currentIndex);
					controlList.add(this.get("Id"), this, replacebleIndex);
				}
			},

			/**
			 * Deletes selected item from answers list.
			 * @protected
			 */
			deleteRecord: function() {
				var controlList = this.get("RecordAnswerValues");
				controlList.removeByKey(this.get("Id"));
				this.$ParentModule.setAnswerOptionsInfoButtonVisible();
			},

			/**
			 * Init list of answers from parameter.
			 * @protected
			 * @param {Array} parameterValues for ContainerList of answers.
			 * @return {Terrasoft.BaseModel[]}
			 */
			getAnswers: function(parameterValues) {
				var answers = [];
				var scope = this;
				Terrasoft.each(parameterValues, function(answerItem, index) {
					var viewModel = scope.getRecordAnswerViewModel(answerItem, index);
					answers.push(viewModel);
				}, this);
				return answers;
			},

			/**
			 * Returns record answer value element ViewModel.
			 * @protected
			 * @param {Object} answerItem Element configuration.
			 * @param {Number} index Item index in list.
			 * @return {Terrasoft.BaseModel}
			 */
			getRecordAnswerViewModel: function(answerItem, index) {
				var config = this.getRecordAnswerViewModelConfig(answerItem, index);
				var viewModel = Ext.create("Terrasoft.BaseModel", config);
				return viewModel;
			},

			/**
			 * Returns config for ViewModel.
			 * @protected
			 * @param {Object} answerItem Element configuration.
			 * @param {Number} index Item index in list.
			 * @return {Object}
			 */
			getRecordAnswerViewModelConfig: function(answerItem, index) {
				var toolsButtonMenu = this.getAnswerMenuList();
				var caption = answerItem.Caption;
				var captionValue = caption.value;
				var itemId = answerItem.Id;
				var name = answerItem.Name;
				var placeholderIndex = answerItem.PlaceholderIndex ? answerItem.PlaceholderIndex : "";
				var config = {
					values: {
						Caption: caption,
						DefChecked: answerItem.DefChecked.value,
						Id: itemId.value,
						ItemUId: answerItem.ItemUId,
						Name: name.value,
						Value: captionValue,
						ParameterEditToolsButtonMenu: toolsButtonMenu,
						RecordAnswerValues: this.get("RecordAnswerValues"),
						MarkerValue: "Answer" + index,
						ToolButtonMarker: "ToolButton" + index,
						ItemPlaceholder: this.get("Resources.Strings.AnswerItemPlaceholder") + placeholderIndex,
						ParentModule: this
					},
					methods: {
						getDefCheckedIconVisible: this.getDefCheckedIconVisible,
						setDefChecked: this.setDefChecked,
						moveUpRecord: this.moveUpRecord,
						moveDownRecord: this.moveDownRecord,
						deleteRecord: this.deleteRecord
					}
				};
				return config;
			},

			/**
			 * Indicates that the item is checked by default.
			 * @protected
			 * @return {Boolean}
			 */
			getDefCheckedIconVisible: function() {
				var isVisible = this.get("DefChecked") === "True";
				return isVisible;
			},

			/**
			 * Loads values into decision mode combobox.
			 * @protected
			 * @param {Object} filter ComboboxEdit value.
			 * @param {Terrasoft.Collection} list List of comboboxEdit values.
			 */
			onPrepareDecisionModeList: function(filter, list) {
				var decisionMods = this.getDecisionModeList();
				list.clear();
				list.loadAll(decisionMods);
			},

			/**
			 * Returns list for decision mode combobox.
			 * @protected
			 * @return {Terrasoft.Collection}
			 */
			getDecisionModeList: function() {
				var decisionModeList = Ext.create("Terrasoft.Collection");
				decisionModeList.add({
					value: "0",
					displayValue: this.get("Resources.Strings.DecisionModeSingle")
				});
				decisionModeList.add({
					value: "1",
					displayValue: this.get("Resources.Strings.DecisionModeMulti")
				});
				return decisionModeList;
			},

			/**
			 * Saves decision mode.
			 * @protected
			 */
			saveDecisionMode: function() {
				var decisionMode = this.get("DecisionModeLookup");
				this.set("DecisionMode", Ext.isEmpty(decisionMode) ? "0" : decisionMode.value);
			},

			/**
			 * Saves BranchingDecisions parameter.
			 * @protected
			 * @param {Terrasoft.ProcessSchemaUserTask} element User task element.
			 */
			saveRecordAnswerValues: function(element) {
				var controlList = this.get("RecordAnswerValues");
				var values = [];
				controlList.each(function(control) {
					var value = this.getAnswerViewModelConfig(control);
					if (value.Caption.value !== "") {
						values.push(value);
					}
				}, this);
				var parameter = element.findParameterByName("BranchingDecisions");
				parameter.setLocalizableParameterValues(values);
			},

			/**
			 * Saves recommendation.
			 * @protected
			 */
			saveRecommendation: function() {
				var question = this.get("Question");
				this.set("Recommendation", question);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveParameters
			 * @overridden
			 */
			saveParameters: function(element) {
				this.saveDecisionMode();
				this.saveRecordAnswerValues(element);
				this.saveRecommendation();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#getResultParameterAllValues
			 * @overridden
			 */
			getResultParameterAllValues: function(callback, scope) {
				var resultParameterValues = {};
				var collection = this.get("RecordAnswerValues");
				collection.each(function(item) {
					var caption = item.get("Caption");
					var captionValue = caption.value;
					var id = item.get("Id");
					if (captionValue !== "") {
						resultParameterValues[id] = captionValue;
					}
				});
				callback.call(scope, resultParameterValues);
			},

			/**
			 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
			 * @override
			 */
			getParameterReferenceSchemaUId: function() {
				return Contact.uId;
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"name": "Question",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"labelConfig": {"visible": false},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "ResponseModeLabel",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.ResponseModeCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"name": "DecisionModeLookup",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"labelConfig": {"visible": false},
					"controlConfig": {
						"prepareList": {"bindTo": "onPrepareDecisionModeList"}
					},
					"isRequired": true,
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "AddNewRecordContainer",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["container-list-header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "QuestionsLabel",
				"parentName": "AddNewRecordContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"layout": {"column": 0, "row": 0, "colSpan": 23},
					"caption": {"bindTo": "Resources.Strings.QuestionsLabelCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"name": "AnswerOptionsInfoButtonContainer",
				"parentName": "AddNewRecordContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {"column": 23, "row": 0, "colSpan": 1},
					"visible": {"bindTo": "AnswerOptionsInfoButtonVisible"},
					"items": [],
					"markerValue": "AnswerOptionsInfoButtonContainer",
					"wrapClass": ["filter-info-button-container"]
				}
			},
			{
				"operation": "insert",
				"parentName": "AnswerOptionsInfoButtonContainer",
				"propertyName": "items",
				"name": "AnswerOptionsInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {"bindTo": "Resources.Strings.AnswerOptionsInformationText"}
				}
			},
			{
				"operation": "insert",
				"name": "RecordAnswersValuesContainer",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "RecordAnswerValues",
					"onGetItemConfig": "getRecordAnswerControlsViewConfig",
					"itemPrefix": "Id",
					"classes": {"wrapClassName": ["record-answer-values-container", "grid-layout"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"name": "AddRecordAnswerValuesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.AddRecordButtonCaption"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
					"classes": {"wrapperClass": ["add-record-answer-values-button"]},
					"click": {"bindTo": "onAddRecordAnswerValues"}
				}
			},
			{
				"operation": "insert",
				"parentName": "EditorsContainer",
				"propertyName": "items",
				"name": "WhoAnswerContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "WhoAnswerControlGroup",
				"parentName": "WhoAnswerContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "WhoAnswerControlGroup",
				"propertyName": "items",
				"name": "IsDecisionRequired",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.IsDecisionRequiredCaption"},
					"wrapClass": ["t-checkbox-control"],
					"markerValue": "IsDecisionRequired"
				}
			},
			{
				"operation": "insert",
				"name": "WhoAnswerLabel",
				"parentName": "WhoAnswerControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.WhoAnswerCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"name": "OwnerId",
				"parentName": "WhoAnswerControlGroup",
				"propertyName": "items",
				"values": {
					"contentType": Terrasoft.ContentType.LOOKUP,
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"isRequired": true,
					"labelConfig": {"visible": false},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "WhoAnswerControlGroup",
				"propertyName": "items",
				"name": "InformationOnStep",
				"values": {
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"caption": {"bindTo": "Resources.Strings.InformationOnStepCaption"},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "WhoAnswerControlGroup",
				"propertyName": "items",
				"name": "useBackgroundMode",
				"values": {
					"layout": {"column": 0, "row": 4, "colSpan": 24},
					"visible": {
						"bindTo": "canUseBackgroundProcessMode"
					},
					"wrapClass": ["t-checkbox-control"]
				}
			}
		] /**SCHEMA_DIFF*/
	};
});

