Terrasoft.configuration.Structures["BusinessRuleBindParameterActionDesignerViewModel"] = {innerHierarchyStack: ["BusinessRuleBindParameterActionDesignerViewModel"]};
define("BusinessRuleBindParameterActionDesignerViewModel", ["BusinessRuleBindParameterActionDesignerViewModelResources",
	"BusinessRuleElementDesignerViewModel", "BusinessRuleActionDesignerViewModel", "ExpressionEditVMMixin"
], function(resources) {

	Ext.define("Terrasoft.BusinessRuleBindParameterActionDesignerViewModel", {
		extend: "Terrasoft.BusinessRuleActionDesignerViewModel",
		alternateClassName: "Terrasoft.Designers.BusinessRuleBindParameterActionDesignerViewModel",

		mixins: {
			"ExpressionEditVMMixin": "Terrasoft.ExpressionEditVMMixin"
		},

		//region Methods: Private

		/**
		 * @private
		 */
		_getExpressionTypeList: function() {
			if (this.isEntitySchemaBased()) {
				return [
					Terrasoft.ExpressionEnums.ExpressionType.COLUMN,
					Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE
				];
			} else {
				const types = [Terrasoft.ExpressionEnums.ExpressionType.PARAMETER];
				const dataSource = Terrasoft.BusinessRuleSchemaManager.getDataSourcesConfig(this.pageSchemaUId);
				if (!Terrasoft.isEmptyObject(dataSource)) {
					types.push(Terrasoft.ExpressionEnums.ExpressionType.DATASOURCE);
				}
				types.push(Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE);
				return types;
			}
		},

		/**
		 * @private
		 */
		_convertExpressionTypeToActionSourceType: function(expressionType) {
			switch (expressionType) {
				case Terrasoft.ExpressionEnums.ExpressionType.COLUMN:
					return Terrasoft.BusinessRuleActionSourceType.COLUMN_SOURCE;
				case Terrasoft.ExpressionEnums.ExpressionType.PARAMETER:
					return Terrasoft.BusinessRuleActionSourceType.PARAMETER_SOURCE;
				case Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE:
					return Terrasoft.BusinessRuleActionSourceType.ATTRIBUTE_SOURCE;
				default:
					return null;
			}
		},

		/**
		 * @private
		 */
		_convertActionSourceTypeToExpressionType: function(sourceType) {
			switch (sourceType) {
				case Terrasoft.BusinessRuleActionSourceType.COLUMN_SOURCE:
					return Terrasoft.ExpressionEnums.ExpressionType.COLUMN;
				case Terrasoft.BusinessRuleActionSourceType.PARAMETER_SOURCE:
					return Terrasoft.ExpressionEnums.ExpressionType.PARAMETER;
				case Terrasoft.BusinessRuleActionSourceType.ATTRIBUTE_SOURCE:
					return Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE;
				default:
					return null;
			}
		},

		/**
		 * @private
		 */
		_prepareEntitySchemaColumnExpression: function(config, callback, scope) {
			const fnConfig = {
				entitySchemaUId: this.getEntitySchemaUId(config.dataModelName),
				packageUId: this.packageUId,
				columnName: config.columnName
			};
			this.getEntitySchemaColumnLookupValue(fnConfig, function(lookupValue) {
				callback.call(scope, lookupValue);
			}, this);
		},

		/**
		 * @private
		 */
		_preparePageSchemaParameterExpression: function(config, callback, scope) {
			const fnConfig = {
				pageSchemaUId: this.pageSchemaUId,
				packageUId: this.packageUId,
				parameterName: config.parameterName
			};
			this.getPageSchemaParameterLookupValue(fnConfig, function(lookupValue) {
				callback.call(scope, lookupValue);
			}, this);
		},

		/**
		 * @private
		 */
		_preparePageSchemaAttributeExpression: function(config, callback, scope) {
			const fnConfig = {
				pageSchemaUId: this.pageSchemaUId,
				attributeName: config.attributeName
			};
			this.getAttributeLookupValue(fnConfig, function(lookupValue) {
				callback.call(scope, lookupValue);
			}, this);
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseModel#getModelColumns
		 * @overridden
		 */
		getModelColumns: function() {
			const baseColumns = this.callParent(arguments);
			return this.Ext.apply(baseColumns, {
				"ExpressionItem": {
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.core.enums.DataValueType.LOOKUP,
					"value": null,
					"isRequired": true
				},
				"ExpressionItemHint": {
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.core.enums.DataValueType.TEXT,
					"value": null
				},
				"ExpressionType": {
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.core.enums.DataValueType.TEXT,
					"value": null
				},
				"ExpressionDataModelName": {
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.core.enums.DataValueType.TEXT,
					"value": null
				}
			});
		},

		/**
		 * Returns left expression items.
		 * @return {Array} Left expression items.
		 */
		getExpressionItem: function() {
			return [{
				"className": "Terrasoft.ExpressionEdit",
				"expressionType": {"bindTo": "ExpressionType"},
				"expressionTypeList": this._getExpressionTypeList(),
				"loadDataSources": {"bindTo": "loadDataSources"},
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"dataModelName": {"bindTo": "ExpressionDataModelName"},
				"placeholder": resources.localizableStrings.ExpressionPlaceholder,
				"wrapClass": "bind-action-expression",
				"contentType": Terrasoft.ContentType.ENUM,
				"prepareEntitySchemaColumnList": {"bindTo": "prepareExpressionEntitySchemaColumnList"},
				"prepareAttributesList": {"bindTo": "prepareExpressionAttributesList"},
				"preparePageSchemaParameterList": {"bindTo": "prepareExpressionPageSchemaParameterList"},
				"value": {"bindTo": "ExpressionItem"}
			}];
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleActionDesignerViewModel#getActionTitle
		 * @overridden
		 */
		getActionTitle: function() {
			var type = this.get("MetaItemType");
			if (this.Ext.isDefined(type)) {
				var element = Terrasoft.BusinessRuleElementHelper.getElementByType(type);
				return element.designConfig.listCaption;
			}
		},

		/**
		 * Sets expression hint.
		 * @protected
		 */
		setExpressionHint: function() {
			var type = this.get("MetaItemType");
			if (this.Ext.isDefined(type)) {
				var element = Terrasoft.BusinessRuleElementHelper.getElementByType(type);
				var value = element.designConfig.hint;
				this.set("ExpressionItemHint", value);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getAsyncValidateList
		 * @overridden
		 */
		getAsyncValidators: function() {
			var validationMethods = this.callParent();
			validationMethods.push(this.validateBindParameterAction);
			return validationMethods;
		},

		/**
		 * Validates bind parameter action.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} validationInfo Validation information.
		 * @param {Boolean} validationInfo.isValid Is view model valid.
		 * @param {Array} validationInfo.messageList Validation message array.
		 */
		validateBindParameterAction: function(callback, validationInfo) {
			var config = {
				expressionType: this.$ExpressionType,
				value: this.$ExpressionItem && this.$ExpressionItem.name,
				columnCaption: this.get("DefaultExpressionCaption"),
				validationInfo: validationInfo
			};
			this.asyncValidateExpression(config, function() {
				callback(validationInfo);
			}, this);
		},

		/**
		 * Sets expression value.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		setExpressionValue: function(callback, scope) {
			const metaItem = this.getMetaItem();
			if (metaItem) {
				const attributeName = metaItem.getPropertyValue("attributeName");
				const sourceType = metaItem.getPropertyValue("sourceType");
				const expressionDataModelName = metaItem.getPropertyValue("dataModelName");
				const expressionType = this._convertActionSourceTypeToExpressionType(sourceType);
				Terrasoft.chain(
					function(next) {
						if (attributeName) {
							switch (expressionType) {
								case Terrasoft.ExpressionEnums.ExpressionType.COLUMN:
									this._prepareEntitySchemaColumnExpression({
										dataModelName: expressionDataModelName,
										columnName: attributeName
									}, next, this);
									break;
								case Terrasoft.ExpressionEnums.ExpressionType.PARAMETER:
									this._preparePageSchemaParameterExpression({parameterName: attributeName}, next, this);
									break;
								case Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE:
									this._preparePageSchemaAttributeExpression({attributeName: attributeName}, next, this);
									break;
								default:
									next();
							}
						} else {
							next();
						}
					},
					function(next, expression) {
						this.$ExpressionType = expressionType;
						this.$ExpressionDataModelName = expressionDataModelName;
						this.$ExpressionItem = expression;
						callback.call(scope);
					},
					this
				);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getMetaItemUpdaters
		 * @overridden
		 */
		getMetaItemUpdaters: function() {
			const updaters = this.callParent(arguments);
			updaters.push(this.updateBindParameterMetaItem);
			return updaters;
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getConfigForEmptyMetaItem
		 * @overridden
		 */
		getConfigForEmptyMetaItem: function() {
			const result = this.callParent();
			if (this.isEntitySchemaBased()) {
				Ext.apply(result, {
					attributeName: null,
					sourceType: Terrasoft.BusinessRuleActionSourceType.COLUMN_SOURCE,
					dataModelName: this.getFirstEntitySchemaName()
				});
			} else {
				Ext.apply(result, {
					attributeName: null,
					sourceType: Terrasoft.BusinessRuleActionSourceType.PARAMETER_SOURCE,
					dataModelName: null
				});
			}
			return result;
		},

		/**
		 * Updates bind parameter meta item.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} metaItem Meta item.
		 */
		updateBindParameterMetaItem: function(callback, metaItem) {
			const attributeName =  this.$ExpressionItem.name;
			const sourceType = this._convertExpressionTypeToActionSourceType(this.$ExpressionType);
			const dataModelName = this.$ExpressionDataModelName;
			metaItem.setPropertyValue("attributeName", attributeName);
			metaItem.setPropertyValue("sourceType", sourceType);
			metaItem.setPropertyValue("dataModelName", dataModelName);
			callback.call(this);
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.setExpressionHint();
			this.setExpressionValue(Terrasoft.emptyFn, this);
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleActionDesignerViewModel#enrichViewConfig
		 * @overridden
		 */
		enrichViewConfig: function(config) {
			this.callParent(arguments);
			Ext.apply(config, {
				"expressionItem": this.getExpressionItem(),
				"expressionItemHint": {"bindTo": "ExpressionItemHint"}
			});
		},

		/**
		 * Prepares data source list.
		 * @param {Terrasoft.Collection} list Collection to fill with data source.
		 */
		loadDataSources: function(list) {
			if (list) {
				const dataSource = Terrasoft.BusinessRuleSchemaManager.getDataSourcesConfig(this.pageSchemaUId);
				list.reloadAll(dataSource);
			}
		},

		/**
		 * Prepares entity schema column list.
		 * @param {String} filter Column search value.
		 * @param {Terrasoft.Collection} list Entity schema column list.
		 */
		prepareExpressionEntitySchemaColumnList: function(filter, list) {
			const entitySchemaUId = this.getEntitySchemaUId(this.$ExpressionDataModelName);
			this.mixins.ExpressionEditVMMixin.prepareEntitySchemaColumnList.call(this, {
				entitySchemaUId: entitySchemaUId,
				packageUId: this.packageUId
			}, {
				filterValue: filter
			}, list);
		},

		/**
		 * Prepares page schema parameter list.
		 * @param {String} filter Parameter search value.
		 * @param {Terrasoft.Collection} list Parameter list.
		 */
		prepareExpressionPageSchemaParameterList: function(filter, list) {
			const builder = Ext.create("Terrasoft.BusinessRuleExpressionDataQueryBuilder");
			this.mixins.ExpressionEditVMMixin.preparePageSchemaParameterList.call(this, {
				pageSchemaUId: this.pageSchemaUId,
				packageUId: this.packageUId
			}, {
				filterValue: filter,
				filterFns: [builder.buildNonSystemPageSchemaParameterFilter()]
			}, list);
		},

		/**
		 * Prepares attributes list.
		 * @param {String} filter Attribute search value.
		 * @param {Terrasoft.Collection} list Attributes list.
		 */
		prepareExpressionAttributesList: function(filter, list) {
			const pageSchemaUId = this.forceGetPageSchemaUId();
			if (pageSchemaUId) {
				this.mixins.ExpressionEditVMMixin.prepareAttributesList.call(this, {
					pageSchemaUId: pageSchemaUId
				}, {
					filterValue: filter
				}, list);
			} else {
				Terrasoft.showInformation(resources.localizableStrings.FillPageSchemaWarning);
			}
		}

		//endregion
	});
});


