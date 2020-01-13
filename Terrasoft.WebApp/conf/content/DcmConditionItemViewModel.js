Terrasoft.configuration.Structures["DcmConditionItemViewModel"] = {innerHierarchyStack: ["DcmConditionItemViewModel"]};
define("DcmConditionItemViewModel", ["DcmConditionItemViewModelResources", "MappingEditMixin"], function(resources) {
	Ext.define("Terrasoft.configuration.DcmConditionItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.DcmConditionItemViewModel",

		mixins: {
			mappingEditMixin: "Terrasoft.MappingEditMixin"
		},

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseModel#columns
		 * @override
		 */
		columns: {
			Id: {dataValueType: Terrasoft.DataValueType.TEXT},
			Result: {dataValueType: Terrasoft.DataValueType.LOOKUP},
			ResultFormula: {dataValueType: Terrasoft.DataValueType.MAPPING},
			ResultList: {dataValueType: Terrasoft.DataValueType.COLLECTION},
			NextStage: {dataValueType: Terrasoft.DataValueType.LOOKUP},
			NextStageList: {dataValueType: Terrasoft.DataValueType.COLLECTION},
			UseFormulaConditions: {dataValueType: Terrasoft.DataValueType.BOOLEAN},
			packageUId: {dataValueType: Terrasoft.DataValueType.GUID},
			Name: {dataValueType: Terrasoft.DataValueType.TEXT}
		},

		/**
		 * Parent dcm element.
		 * @protected
		 * @type {Terrasoft.Collection}
		 */
		parentElement: null,

		/**
		 * Sandbox.
		 * @protected
		 * @type {Object}.
		 */
		sandbox: null,

		// endregion

		// region Methods: Private

		_getEmptyMappingValue: function() {
			return {
				value: null,
				displayValue: null,
				source: Terrasoft.ProcessSchemaParameterValueSource.None,
				dataValueType: null,
				referenceSchemaUId: null
			};
		},

		_initResult: function() {
			var useFormulaConditions = this.values.useFormulaConditions;
			this.set("UseFormulaConditions", useFormulaConditions);
			if (useFormulaConditions) {
				var resultFormula = this.values.resultFormula || this._getEmptyMappingValue();
				this.set("Name", this.values.parameterName);
				this.set("ResultFormula", resultFormula);
			} else {
				var resultId = this.values.resultId;
				if (resultId) {
					var result = Terrasoft.findWhere(this.values.resultList, {value: resultId});
					this.set("Result", result);
				} else {
					var filteredResultList = this._filterResultList();
					var listKeys = Terrasoft.keys(filteredResultList);
					if (listKeys.length === 0) {
						this._showEmptyResultListMessage(true);
					}
					if (listKeys.length === 1) {
						this.set("Result", filteredResultList[listKeys[0]]);
					}
				}
				this.set("ResultList", new Terrasoft.Collection());
			}
		},

		_getStages: function() {
			return this.parentElement.parentSchema.stages
				.filterByFn(function(stage) {
					return stage.uId !== this.parentElement.containerUId;
				}, this)
				.map(function(stage) {
					return {
						value: stage.stageRecordId,
						displayValue: stage.caption.getValue()
					};
				}, this);
		},

		_initNextStage: function() {
			var nextStageId = this.values.nextStageId;
			var collection = this._getStages();
			var nextStage = collection.findByFn(function(item) {
				return item.value === nextStageId;
			}, this);
			this.set("NextStage", nextStage);
			this.set("NextStageList", collection);
		},

		_filterResultList: function() {
			var resultList = this.values.resultList;
			var parentCollection = this.values.parentCollection;
			return Terrasoft.filterObjectList(resultList, function(item) {
				var currentResult = this.get("Result");
				if (currentResult && currentResult.value === item.value) {
					return true;
				}
				var used = parentCollection.findByFn(function(parentItem) {
					var parentItemResult = parentItem.get("Result");
					return parentItemResult && parentItemResult.value === item.value;
				}, this);
				return !used;
			}, this);
		},

		_showEmptyResultListMessage: function(isEmptyList) {
			var validationMessage = isEmptyList ? resources.localizableStrings.RecordsNotFoundMessage : "";
			var isValid = !isEmptyList;
			this.setValidationInfo("Result", isValid, validationMessage);
		},

		// endregion

		// region Methods: Protected

		/**
		 * Handler for RemoveConditionButton click. Removes current view model item condition.
		 * @protected
		 */
		onRemoveConditionButton: function() {
			var collection = this.parentCollection;
			var id = this.get("Id");
			var item = collection.get(id);
			collection.remove(item);
		},

		/**
		 * Returns remove condition button image config.
		 * @protected
		 * @return {Object}
		 */
		getRemoveConditionButtonImageConfig: function() {
			return resources.localizableImages.RemoveButtonImage;
		},

		/**
		 * The event handler for preparing of the data drop-down ResultList.
		 * @protected
		 * @param {Object} filter Filters for data preparation.
		 * @param {Terrasoft.core.collections.Collection} list The data for the drop-down list.
		 */
		onPrepareResultList: function(filter, list) {
			var filteredResultList = this._filterResultList();
			list.reloadAll(filteredResultList);
			this._showEmptyResultListMessage(list.isEmpty());
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.set("Id", Terrasoft.generateGUID());
			this._initResult();
			this._initNextStage();
		},

		/**
		 * @inheritdoc Terrasoft.MappingEditMixin#getParameterInfo
		 * @override
		 */
		getParameterInfo: function() {
			return {
				parameterName: "ResultFormula",
				parameterValue: this.get("ResultFormula")
			};
		}

		// endregion

	});

	return Terrasoft.DcmConditionItemViewModel;
});


