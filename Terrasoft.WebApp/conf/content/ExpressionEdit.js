Terrasoft.configuration.Structures["ExpressionEdit"] = {innerHierarchyStack: ["ExpressionEdit"]};
define("ExpressionEdit", ["css!ExpressionEdit", "ExpressionEditViewGenerator", "ExpressionEnums"], function() {
	Ext.define("Terrasoft.control.ExpressionEdit", {
		extend: "Terrasoft.Container",
		alternateClassName: "Terrasoft.ExpressionEdit",

		//region Properties: Private

		/**
		 * Value.
		 * @private
		 * @type {Mixed}
		 */
		value: null,

		/**
		 * Reference schema config.
		 * @private
		 * @type {Object}
		 */
		referenceSchema: null,

		/**
		 * Data value type.
		 * @private
		 * @type {Terrasoft.DataValueType}
		 */
		dataValueType: null,

		/**
		 * Expression type.
		 * @private
		 * @type {String}
		 */
		expressionType: null,

		/**
		 * Value control placeholder.
		 * @private
		 * @type {String}
		 */
		placeholder: null,

		/**
		 * Required value flag.
		 * @private
		 * @type {String}
		 */
		isRequired: false,

		/**
		 * Validation control info.
		 * @private
		 * @type {Object}
		 */
		validationInfo: null,

		/**
		 * Type view items.
		 * @private
		 * @type {Array|Ext.util.MixedCollection}
		 */
		typeItems: null,

		/**
		 * Reference schema view items.
		 * @private
		 * @type {Array|Ext.util.MixedCollection}
		 */
		referenceSchemaItems: null,

		/**
		 * Value view items.
		 * @private
		 * @type {Array|Ext.util.MixedCollection}
		 */
		valueItems: null,

		/**
		 * Wrap css class.
		 * @private
		 * @type {String}
		 */
		wrapClass: null,

		/**
		 * Inner wrap css class.
		 * @private
		 * @type {String}
		 */
		innerWrapClass: null,

		/**
		 * Inner type container css class.
		 * @private
		 * @type {String}
		 */
		innerTypeClass: null,

		/**
		 * Inner value container css class.
		 * @private
		 * @type {String}
		 */
		innerValueClass: null,

		/**
		 * Inner reference container css class.
		 * @private
		 * @type {String}
		 */
		innerReferenceSchemaClass: null,

		/**
		 * Wrap dom element.
		 * @private
		 * @type {Ext.dom.Element}
		 */
		wrapEl: null,

		/**
		 * Value items container dom element.
		 * @private
		 * @type {Ext.dom.Element}
		 */
		valueItemsEl: null,

		/**
		 * Type items container dom element.
		 * @private
		 * @type {Ext.dom.Element}
		 */
		typeItemsEl: null,

		/**
		 * Reference schema container dom element.
		 * @private
		 * @type {Ext.dom.Element}
		 */
		referenceSchemaItemsEl: null,

		/**
		 * View generator.
		 * @private
		 * @type {Terrasoft.ExpressionEditViewGenerator}
		 */
		viewGenerator: null,

		/**
		 * Reference schema list.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		referenceSchemaList: null,

		/**
		 * Value list.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		valueList: null,

		/**
		 * Type control visible.
		 * @private
		 * @type {Boolean}
		 */
		typeVisible: true,

		/**
		 * Type control enabled.
		 * @private
		 * @type {Boolean}
		 */
		typeEnabled: true,

		/**
		 * Can change reference schema flag.
		 * @private
		 * @type {Boolean}
		 */
		canChangeReferenceSchema: true,

		/**
		 * Entity schema column list.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		entitySchemaColumnList: null,

		/**
		 * Page schema parameter list.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		pageSchemaParameterList: null,

		/**
		 * Data model name.
		 * @private
		 * @type {String}
		 */
		dataModelName: null,

		/**
		 * Array of expression type.
		 * @private
		 * @type {Array}
		 */
		expressionTypeList: null,

		/**
		 * Content type.
		 * @private
		 * @type {Terrasoft.ContentType}
		 */
		contentType: null,

		/**
		 * @inheritdoc Terrasoft.Component#tpl
		 * @override
		 */
		tpl: [
			/*jshint quotmark:false */
			//jscs: disable
			'<div id="{id}-wrap" class="{wrapClass}" style="{wrapStyle}">',
				'<div id="{id}-inner-wrap" class="{innerWrapClass}" style="{innerWrapStyle}">',
					'<div id="{id}-typeItems" class="{innerTypeClass}">',
						'{%this.renderViewItemsProperty(out, values, "typeItems")%}',
					'</div>',
					'<div id="{id}-referenceSchemaItems" class="{innerReferenceSchemaClass}">',
						'{%this.renderViewItemsProperty(out, values, "referenceSchemaItems")%}',
					'</div>',
					'<div id="{id}-valueItems" class="{innerValueClass}">',
						'{%this.renderViewItemsProperty(out, values, "valueItems")%}',
					'</div>',
				'</div>',
			'</div>'
			/*jshint quotmark:double */
			//jscs: enable
		],

		//endregion

		//region Method: Private

		/**
		 * @private
		 */
		_getExpressionMenuTypeList: function(typeList) {
			const menuList = [];
			Terrasoft.each(typeList, function(item) {
				if (!item) {
					return;
				}
				const tag = item.tag;
				const caption = item.caption;
				const expressionType = tag.expressionType;
				const itemConfig = {
					"caption": caption || this.getExpressionTypeCaption(expressionType),
					"tag": tag,
					"items": item.items,
					"markerValue": item.markerValue
				};
				menuList.push(this.generateTypeButtonMenuItemConfig(itemConfig));
			}, this);
			return menuList;
		},

		/**
		 * @private
		 */
		_isDataSourceExpressionType: function(expressionType) {
			return expressionType === Terrasoft.ExpressionEnums.ExpressionType.COLUMN && this.expressionTypeList &&
				Ext.Array.contains(this.expressionTypeList, Terrasoft.ExpressionEnums.ExpressionType.DATASOURCE);
		},

		/**
		 * @private
		 */
		_getDataSourcesExpressionTypeMenuItem: function() {
			return {
					tag: {
						expressionType: Terrasoft.ExpressionEnums.ExpressionType.DATASOURCE
					},
					items: this._getDataSourcesMenuConfig(),
					markerValue: Terrasoft.ExpressionEnums.ExpressionType.DATASOURCE
				};
		},

		/**
		 * @private
		 */
		_getColumnExpressionTypeMenuItem: function() {
			const config = this._getDataSourcesMenuConfig();
			const dataModelName = config.length > 0 ? config[0].tag.value : null;
			return {
				"tag": {
					"expressionType": Terrasoft.ExpressionEnums.ExpressionType.COLUMN,
					"dataModelName": dataModelName
				}
			};
		},

		/**
		 * @private
		 */
		_getDataSourcesMenuConfig: function() {
			const list = [];
			const scope = this;
			const dataSources = Ext.create("Terrasoft.Collection");
			this.fireEvent("loadDataSources", dataSources);
			dataSources.each(function(dataSource) {
				const itemConfig = {
					caption: dataSource.displayValue,
					tag: {
						expressionType: Terrasoft.ExpressionEnums.ExpressionType.COLUMN,
						displayValue: dataSource.displayValue,
						value: dataSource.value,
						dataValueType: Terrasoft.DataValueType.TEXT
					},
					handler: function(menu, menuItem) {
						scope.onDataSourceMenuItemClick(menuItem.tag);
					},
					markerValue: dataSource.value
				};
				list.push(itemConfig);
			}, this);
			return list;
		},

		/**
		 * @private
		 */
		_getDataSourceCaption: function() {
			const dataSources = Ext.create("Terrasoft.Collection");
			this.fireEvent("loadDataSources", dataSources);
			const dataSource = dataSources.find(this.dataModelName);
			return dataSource ? dataSource.displayValue : this.dataModelName;
		},

		/**
		 * @private
		 */
		_setDataModelName: function(dataModelName) {
			this.dataModelName = dataModelName;
			this.fireEvent("changeDataModel", dataModelName, this);
		},

		/**
		 * @private
		 */
		_updateControl: function() {
			this.removeRenderedControls();
			if (this.needClearValue()) {
				var defaultValue = this.getDefaultValueByDataValueType();
				this.setValue(defaultValue);
			}
			this.updateTypeButtonCaption();
			this.reRenderEditControls();
			this.updateTypeMenu();
		},

		_getExpressionTypeMenuMap: function() {
			const Type = Terrasoft.ExpressionEnums.ExpressionType;
			return {
				"ConstantBusinessRuleExpression": this.getConstantExpressionTypeMenuItem(),
				"AttributeBusinessRuleExpression": {"tag": {"expressionType": Type.ATTRIBUTE}},
				"SysSettingBusinessRuleExpression": {"tag": {"expressionType": Type.SYSSETTING}},
				"SysValueBusinessRuleExpression": this._getSysValueExpressionMenuItem(),
				"ColumnBusinessRuleExpression": this._getColumnExpressionTypeMenuItem(),
				"ParameterBusinessRuleExpression": {"tag": {"expressionType": Type.PARAMETER}},
				"DataSourceBusinessRuleExpression": this._getDataSourcesExpressionTypeMenuItem()
			};
		},

		/**
		 * @private
		 */
		_getDefaultExpressionTypeList: function() {
			const Type = Terrasoft.ExpressionEnums.ExpressionType;
			return [Type.COLUMN, Type.CONSTANT, Type.ATTRIBUTE, Type.SYSVALUE, Type.SYSSETTING];
		},

		//endregion

		//region Method: Protected

		/**
		 * @inheritdoc Terrasoft.Component#init
		 * @override
		 */
		init: function() {
			this.typeItems = [this.getTypeButtonConfig()];
			if (Ext.isEmpty(this.getValue())) {
				this.value = this.getDefaultValueByDataValueType();
			}
			if (!this.expressionTypeList) {
				this.expressionTypeList = this._getDefaultExpressionTypeList();
			}
			this.callParent(arguments);
			this.addEvents(
				"change",
				"changeExpressionType",
				"changeDataValueType",
				"changeReferenceSchema",
				"prepareValueList",
				"prepareReferenceSchemaList",
				"loadEntitySchemaColumnVocabulary",
				"prepareEntitySchemaColumnList",
				"loadPageSchemaParameterVocabulary",
				"preparePageSchemaParameterList",
				"prepareSysValuesList",
				"prepareConstantList",
				"prepareAttributesList",
				"loadDataSources",
				"changeDataModel"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var baseEditBindConfig = {
				"value": {
					"changeEvent": "change",
					"changeMethod": "setValue",
					"validationMethod": "setValidationInfo"
				},
				"referenceSchema": {
					"changeEvent": "changeReferenceSchema",
					"changeMethod": "setReferenceSchema"
				},
				"expressionType": {
					"changeEvent": "changeExpressionType",
					"changeMethod": "setExpressionType"
				},
				"dataValueType": {
					"changeEvent": "changeDataValueType",
					"changeMethod": "setDataValueType"
				},
				"dataModelName": {
					"changeEvent": "changeDataModel",
					"changeMethod": "setDataModel"
				},
				"typeVisible": {"changeMethod": "setTypeVisible"},
				"typeEnabled": {"changeMethod": "setTypeEnabled"},
				"canChangeReferenceSchema": {"changeMethod": "setCanChangeReferenceSchema"},
				"placeholder": {"changeMethod": "setPlaceholder"},
				"isRequired": {"changeMethod": "setRequired"}
			};
			Ext.apply(bindConfig, baseEditBindConfig);
			return bindConfig;
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#getViewItemsPropertyNames
		 * @override
		 */
		getViewItemsPropertyNames: function() {
			var viewItemsPropertyNames = this.callParent(arguments);
			viewItemsPropertyNames.push("typeItems", "valueItems", "referenceSchemaItems");
			return viewItemsPropertyNames;
		},

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @override
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			var wrapClasses = ["expression-edit-wrap"];
			var innerWrapClasses = ["expression-edit-inner-wrap"];
			var innerTypeClasses = ["expression-inner-type"];
			var innerValueClasses = ["expression-inner-value"];
			var innerReferenceSchemaClasses = ["expression-inner-reference-schema"];
			if (this.wrapClass) {
				wrapClasses.push(this.wrapClass);
			}
			if (this.innerWrapClass) {
				innerWrapClasses.push(this.innerWrapClass);
			}
			if (this.innerTypeClass) {
				innerTypeClasses.push(this.innerTypeClass);
			}
			if (this.innerValueClass) {
				innerValueClasses.push(this.innerValueClass);
			}
			if (this.innerReferenceSchemaClass) {
				innerReferenceSchemaClasses.push(this.innerReferenceSchemaClass);
			}
			tplData.wrapClass = wrapClasses;
			tplData.innerWrapClass = innerWrapClasses;
			tplData.innerTypeClass = innerTypeClasses;
			tplData.innerValueClass = innerValueClasses;
			tplData.innerReferenceSchemaClass = innerReferenceSchemaClasses;
			this.selectors = this.getSelectors();
			return tplData;
		},

		/**
		 * Returns control selectors config.
		 * @protected
		 * @return {Object} Control selectors config.
		 */
		getSelectors: function() {
			return {
				wrapEl: "#" + this.id + "-wrap"
			};
		},

		/**
		 * Returns control view generator.
		 * @protected
		 * @return {Terrasoft.ExpressionEditViewGenerator} Control view generator
		 */
		getViewGenerator: function() {
			if (!this.viewGenerator) {
				this.viewGenerator = Ext.create("Terrasoft.ExpressionEditViewGenerator", {
					"schemaName": this.id
				});
			}
			return this.viewGenerator;
		},

		/**
		 * Sets type control visible.
		 * @protected
		 * @param {Boolean} visible Type control visible flag.
		 */
		setTypeVisible: function(visible) {
			var isChanged = (visible !== this.typeVisible);
			if (isChanged) {
				this.typeVisible = visible;
				this.setTypeButtonControlVisible(visible);
			}
		},

		/**
		 * Sets type control enabled.
		 * @protected
		 * @param {Boolean} enabled Type control enabled flag.
		 */
		setTypeEnabled: function(enabled) {
			var isChanged = (enabled !== this.typeEnabled);
			if (isChanged) {
				this.typeEnabled = enabled;
				this.setTypeButtonControlEnabled(enabled);
			}
		},

		/**
		 * Sets can change reference schema flag.
		 * @protected
		 * @param {Boolean} canChange Can change reference schema flag.
		 */
		setCanChangeReferenceSchema: function(canChange) {
			var isChanged = (canChange !== this.canChangeReferenceSchema);
			if (isChanged) {
				this.canChangeReferenceSchema = canChange;
				this.updateReferenceSchemaControlEnabled();
			}
		},

		/**
		 * Returns value.
		 * @protected
		 * @return {Mixed} Value.
		 */
		getValue: function() {
			return this.value;
		},

		/**
		 * Sets value.
		 * @protected
		 * @param {Mixed} value Value.
		 */
		setValue: function(value) {
			var isChanged = (value !== this.getValue());
			if (isChanged) {
				this.value = value;
				this.setValueControlValue(value);
				this.fireEvent("change", value, this);
			}
		},

		/**
		 * Returns reference schema.
		 * @protected
		 * @return {Object} Reference schema.
		 */
		getReferenceSchema: function() {
			return this.referenceSchema;
		},

		/**
		 * Sets reference schema.
		 * @protected
		 * @param {Object} referenceSchema Reference schema.
		 */
		setReferenceSchema: function(referenceSchema) {
			var isChanged = (referenceSchema !== this.getReferenceSchema());
			if (isChanged) {
				this.referenceSchema = referenceSchema;
				if (this.getCanUseReferenceSchema()) {
					var defaultValue = this.getDefaultValueByDataValueType();
					this.setValue(defaultValue);
				}
				this.updateReferenceSchemaControlValue(referenceSchema);
				this.updateValueItemsVisible();
				this.fireEvent("changeReferenceSchema", referenceSchema, this);
			}
		},

		/**
		 * Returns data value type.
		 * @protected
		 * @return {Terrasoft.DataValueType} Data value type.
		 */
		getDataValueType: function() {
			return this.dataValueType;
		},

		/**
		 * Returns default value by data value type.
		 * @protected
		 * @return {Object} Default value.
		 */
		getDefaultValueByDataValueType: function() {
			var isBooleanType = this.dataValueType === Terrasoft.DataValueType.BOOLEAN;
			var isConstantExpression = this.isConstantExpressionType(this.expressionType);
			return isBooleanType && isConstantExpression ? false : null;
		},

		/**
		 * Sets data value type.
		 * @protected
		 * @param {Terrasoft.DataValueType} dataValueType Data value type.
		 */
		setDataValueType: function(dataValueType) {
			var isChanged = (dataValueType !== this.getDataValueType());
			if (isChanged) {
				this.dataValueType = dataValueType;
				this._updateControl();
				this.fireEvent("changeDataValueType", dataValueType, this);
			}
		},

		/**
		 * Returns true, if need clear value, false - otherwise.
		 * @return {Boolean} True, if need clear value, false - otherwise.
		 */
		needClearValue: function() {
			var expressionTypeEnum = Terrasoft.ExpressionEnums.ExpressionType;
			var expressionList = [
				expressionTypeEnum.COLUMN,
				expressionTypeEnum.CONSTANT
			];
			return Ext.Array.contains(expressionList, this.expressionType) || Ext.isEmpty(this.expressionType);
		},

		/**
		 * Returns expression type.
		 * @protected
		 * @return {String} Expression type.
		 */
		getExpressionType: function() {
			return this.expressionType;
		},

		/**
		 * Sets expression type.
		 * @protected
		 * @param {String} expressionType Expression type.
		 */
		setExpressionType: function(expressionType) {
			var isChanged = (expressionType !== this.getExpressionType());
			if (isChanged) {
				this.removeRenderedControls();
				this.expressionType = expressionType;
				var defaultValue = this.getDefaultValueByDataValueType();
				this.setValue(defaultValue);
				this.updateTypeButtonCaption();
				this.reRenderEditControls();
				this.updateTypeMenu();
				this.fireEvent("changeExpressionType", expressionType, this);
			}
		},

		/**
		 * Sets value control placeholder.
		 * @protected
		 * @param {String} value Placeholder.
		 */
		setPlaceholder: function(value) {
			var isChanged = (value !== this.placeholder);
			if (isChanged) {
				this.placeholder = value;
				this.updateValueControlPlaceholder();
			}
		},

		/**
		 * Updates value control placeholder.
		 * @protected
		 */
		updateValueControlPlaceholder: function() {
			var dataValueType = this.getValueControlDataValueType();
			if (Terrasoft.isBooleanDataValueType(dataValueType)) {
				return;
			}
			this.processValueControl(function(control) {
				var placeholderBindConfig = this.getControlPropertyBindConfig(control, "placeholder");
				if (placeholderBindConfig && Ext.isFunction(control[placeholderBindConfig.changeMethod])) {
					control[placeholderBindConfig.changeMethod](this.placeholder);
				}
			}, this);
		},

		/**
		 * Sets value control required flag.
		 * @protected
		 * @param {Boolean} value Required flag.
		 */
		setRequired: function(value) {
			var isChanged = (value !== this.isRequired);
			if (isChanged) {
				this.isRequired = value;
				this.updateValueControlRequired();
			}
		},

		/**
		 * Updates value control required flag.
		 * @protected
		 */
		updateValueControlRequired: function() {
			var dataValueType = this.getValueControlDataValueType();
			if (Terrasoft.isBooleanDataValueType(dataValueType)) {
				return;
			}
			this.processValueControl(function(control) {
				var requiredBindConfig = this.getControlPropertyBindConfig(control, "isRequired");
				if (requiredBindConfig && Ext.isFunction(control[requiredBindConfig.changeMethod])) {
					control[requiredBindConfig.changeMethod](this.isRequired);
				}
			}, this);
		},

		/**
		 * Sets validation info.
		 * @protected
		 * @param {Object} info Validation info.
		 */
		setValidationInfo: function(info) {
			if (this.validationInfo === info) {
				return;
			}
			var dataValueType = this.getValueControlDataValueType();
			if (Terrasoft.isBooleanDataValueType(dataValueType)) {
				return;
			}
			this.validationInfo = info;
			this.processValueControl(function(control) {
				var valueBindConfig = this.getControlPropertyBindConfig(control, "value");
				if (valueBindConfig && Ext.isFunction(control[valueBindConfig.validationMethod])) {
					control[valueBindConfig.validationMethod](this.validationInfo);
				}
			}, this);
		},

		/**
		 * Returns default placeholder by expression type.
		 * @protected
		 * @param {String} expressionType Expression type.
		 * @return {String} Default placeholder.
		 */
		getDefaultPlaceholder: function(expressionType) {
			var expressionTypeConfig = Terrasoft.BusinessRuleElementHelper.getElementByType(expressionType);
			return (!Ext.isEmpty(expressionTypeConfig) && !Ext.isEmpty(expressionTypeConfig.designConfig))
				? expressionTypeConfig.designConfig.placeholder
				: null;
		},

		/**
		 * Returns true, if expression type equal constant expression type, false - otherwise.
		 * @protected
		 * @param {String} expressionType Expression type.
		 * @return {Boolean} True, if expression type equal constant expression type, false - otherwise.
		 */
		isConstantExpressionType: function(expressionType) {
			return expressionType === Terrasoft.ExpressionEnums.ExpressionType.CONSTANT;
		},

		/**
		 * Updates reference schema control value.
		 * @protected
		 * @param {value} value Reference schema.
		 */
		updateReferenceSchemaControlValue: function(value) {
			var control = this.getReferenceSchemaControl();
			if (control) {
				control.setValue(value);
			}
		},

		/**
		 * Updates reference schema control enabled.
		 * @protected
		 */
		updateReferenceSchemaControlEnabled: function() {
			var control = this.getReferenceSchemaControl();
			if (control) {
				control.setEnabled(this.canChangeReferenceSchema);
			}
		},

		/**
		 * Updates value control visible.
		 * @protected
		 */
		updateValueItemsVisible: function() {
			var visible = this.getValueControlVisible();
			if (this.valueItemsEl) {
				this.valueItemsEl.setVisible(visible, "display");
			}
		},

		/**
		 * Returns value control visible.
		 * @protected
		 * @return {Boolean} True, if value control must be visible, false - otherwise.
		 */
		getValueControlVisible: function() {
			var expressionType = this.getExpressionType();
			if (this.isConstantExpressionType(expressionType) &&
				Terrasoft.isLookupDataValueType(this.getDataValueType()) &&
				Ext.isEmpty(this.getReferenceSchema())) {
				return false;
			}
			return true;
		},

		/**
		 * Gets expression type menu config.
		 * @protected
		 * @return {Array} Expression type menu config list.
		 */
		getExpressionTypeList: function() {
			const typeList = [];
			if (this.expressionTypeList) {
				const typeMenuMap = this._getExpressionTypeMenuMap();
				this.expressionTypeList.forEach(function(type) {
					typeList.push(typeMenuMap[type]);
				}, this);
			}
			return this._getExpressionMenuTypeList(typeList);
		},

		/**
		 * Returns constant expression type meny item config.
		 * @protected
		 * @return {Object} Constant expression type meny item config.
		 */
		getConstantExpressionTypeMenuItem: function() {
			const constantMenuConfig = this._getConstantMenuConfig();
			let constantItem;
			if (constantMenuConfig.length === 1) {
				constantItem = constantMenuConfig[0];
			} else {
				constantItem = {
					tag: {
						expressionType: Terrasoft.ExpressionEnums.ExpressionType.CONSTANT
					},
					items: constantMenuConfig
				};
			}
			return constantItem;
		},

		/**
		 * Returns configuration object for menu with constants.
		 * @return {Object[]} Configuration object with constant menu items.
		 * @private
		 */
		_getConstantMenuConfig: function() {
			var list = [];
			var scope = this;
			var constants = Ext.create("Terrasoft.Collection");
			this.fireEvent("prepareConstantList", {}, constants);
			constants.each(function(constant) {
				var itemConfig = {
					caption: constant.displayValue,
					tag: {
						expressionType: Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
						displayValue: constant.displayValue,
						dataValueType: constant.dataValueType
					},
					handler: function(menu, menuItem) {
						scope.onConstantMenuItemClick(menuItem.tag);
					},
					markerValue: constant.value
				};
				list.push(itemConfig);
			}, this);
			return list;
		},

		/**
		 * Constant menu item click handler.
		 * @param {Object} tag Menu item tag.
		 */
		onConstantMenuItemClick: function(tag) {
			if (!tag) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: "tag"});
			}
			this.setExpressionType(tag.expressionType);
			this.setDataValueType(tag.dataValueType);
		},

		/**
		 * Data source menu item click handler.
		 * @param {Object} tag Menu item tag.
		 */
		onDataSourceMenuItemClick: function(tag) {
			if (!tag) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: "tag"});
			}
			this.setDataModel(tag.value);
			this.setExpressionType(tag.expressionType);
		},

		/**
		 * Sets data model name
		 * @param {String} dataModelName Data model name.
		 */
		setDataModel: function(dataModelName) {
			const isChanged = (dataModelName !== this.dataModelName);
			if (isChanged) {
				this._setDataModelName(dataModelName);
				this._updateControl();
			}
		},

		/**
		 * Returns system value menu item with values sub menu.
		 * @return {Object} Menu item configuration object.
		 * @private
		 */
		_getSysValueExpressionMenuItem: function() {
			const sysValuesMenuConfig = this._getSysValuesMenuConfig();
			if (Ext.isEmpty(sysValuesMenuConfig)) {
				return null;
			}
			const sysValueItem = {
				tag: {
					expressionType: Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE
				},
				items: sysValuesMenuConfig,
				markerValue: Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE
			};
			return sysValueItem;
		},

		/**
		 * Returns configuration object for menu with system values.
		 * @return {Object[]} Configuration object with system values menu items.
		 * @private
		 */
		_getSysValuesMenuConfig: function() {
			var list = [];
			var scope = this;
			var sysValues = Ext.create("Terrasoft.Collection");
			this.fireEvent("prepareSysValuesList", {}, sysValues);
			sysValues.each(function(sysValue) {
				var itemConfig = {
					caption: sysValue.displayValue,
					tag: {
						expressionType: Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE,
						sysValueName: sysValue.value,
						displayValue: sysValue.displayValue,
						dataValueType: sysValue.dataValueType
					},
					handler: function(menu, menuItem) {
						scope.onSysValueMenuItemClick(menuItem.tag);
					},
					markerValue: sysValue.value
				};
				list.push(itemConfig);
			}, this);
			return list;
		},

		/**
		 * SysValue menu item click handler.
		 * @param {Object} tag Menu item tag.
		 */
		onSysValueMenuItemClick: function(tag) {
			if (!tag) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: "tag"});
			}
			this.setExpressionType(tag.expressionType);
			var sysValue = {
				value: tag.sysValueName,
				displayValue: tag.displayValue
			};
			this.setValue(sysValue);
			this.setDataValueType(tag.dataValueType);
		},

		/**
		 * Returns type button menu item config.
		 * @protected
		 * @param {Object} config Menu item config.
		 * @param {String} config.caption Menu item caption.
		 * @param {Array} config.items Menu item submenu list.
		 * @param {Object} config.tag Menu item tag.
		 * @return {Object} Type button menu item config.
		 */
		generateTypeButtonMenuItemConfig: function(config) {
			var itemConfig = {
				"caption": config.caption
			};
			if (config.markerValue) {
				itemConfig.markerValue = config.markerValue;
			}
			var items = config.items;
			var scope = this;
			if (items) {
				Ext.apply(itemConfig, {
					"menu": {"items": items}
				});
			} else {
				Ext.apply(itemConfig, {
					"tag": config.tag,
					handler: function(menu, menuItem) {
						scope.onTypeButtonItemClick.call(scope, menuItem.tag);
					}
				});
			}
			return itemConfig;
		},

		/**
		 * Updates type menu.
		 * @protected
		 */
		updateTypeMenu: function() {
			var control = this.getTypeButtonControl();
			if (control && control.menu) {
				var items = this.getExpressionTypeList();
				control.menu.destroy();
				control.menu = Ext.create("Terrasoft.Menu", {
					"markerValue": "ExpressionTypeButton",
					"items": items
				});
			}
		},

		/**
		 * Returns type button config.
		 * @protected
		 * @return {Object} Type button config.
		 */
		getTypeButtonConfig: function() {
			var items = this.getExpressionTypeList();
			var caption = this.getTypeButtonCaption();
			return {
				"id": this.id + "-type-control",
				"className": "Terrasoft.Button",
				"caption": caption,
				"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				"menu": {"items": items},
				"visible": this.typeVisible,
				"enabled": this.typeEnabled,
				"markerValue": "ExpressionTypeButton"
			};
		},

		/**
		 * Returns expression type caption by expression type.
		 * @protected
		 * @param {String} expressionType Expression type.
		 * @return {String} Expression type caption.
		 */
		getExpressionTypeCaption: function(expressionType) {
			var caption;
			if (!Ext.isEmpty(expressionType)) {
				var typeConfig = Terrasoft.BusinessRuleElementHelper.getElementByType(expressionType);
				caption = typeConfig && typeConfig.designConfig
					? typeConfig.designConfig.listCaption
					: "";
			} else {
				caption = "";
			}
			return caption;
		},

		/**
		 * Returns data value type caption.
		 * @protected
		 * @param {Terrasoft.DataValueType} dataValueType Data value type.
		 * @return {String} Data value type caption.
		 */
		getDataValueTypeCaption: function(dataValueType) {
			var response;
			if (Terrasoft.isLookupDataValueType(dataValueType)) {
				dataValueType = Terrasoft.DataValueType.LOOKUP;
			}
			Terrasoft.each(Terrasoft.DataValueType, function(value, key) {
				if (value === dataValueType) {
					response = Terrasoft.Resources.DataValueType[key];
				}
			}, this);
			return response;
		},

		/**
		 * Returns type button caption.
		 * @protected
		 * @return {String} Type button caption.
		 */
		getTypeButtonCaption: function() {
			var expressionType = this.getExpressionType();
			var dataValueType = this.getDataValueType();
			let typeCaption;
			if (this.isConstantExpressionType(expressionType)) {
				typeCaption = this.getDataValueTypeCaption(dataValueType);
			} else if (this._isDataSourceExpressionType(expressionType)) {
				typeCaption = this._getDataSourceCaption();
			} else {
				typeCaption = this.getExpressionTypeCaption(expressionType);
			}
			return typeCaption || "<?>";
		},

		/**
		 * Updates type button caption.
		 * @protected
		 */
		updateTypeButtonCaption: function() {
			var control = this.getTypeButtonControl();
			if (control) {
				var caption = this.getTypeButtonCaption();
				control.setCaption(caption);
			}
		},

		/**
		 * Type button menu item click handler.
		 * @protected
		 * @param {Object} tag Menu item tag.
		 */
		onTypeButtonItemClick: function(tag) {
			if (!tag) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: "tag"});
			}
			this._setDataModelName(tag.dataModelName);
			this.setExpressionType(tag.expressionType);
			var dataValueType = tag.dataValueType;
			if (!Ext.isEmpty(dataValueType)) {
				this.setDataValueType(dataValueType);
			}
		},

		/**
		 * Returns type button control.
		 * @protected
		 * @return {Terrasoft.Component} Type button control.
		 */
		getTypeButtonControl: function() {
			return (this.typeItems && this.typeItems.getAt) ? this.typeItems.getAt(0) : null;
		},

		/**
		 * Returns reference schema control.
		 * @protected
		 * @return {Terrasoft.Component} Reference schema control.
		 */
		getReferenceSchemaControl: function() {
			return (this.referenceSchemaItems && this.referenceSchemaItems.getAt)
				? this.referenceSchemaItems.getAt(0)
				: null;
		},

		/**
		 * Returns reference schema control config.
		 * @protected
		 * @return {Object} Reference schema control config.
		 */
		getReferenceSchemaControlConfig: function() {
			var list = this.getReferenceSchemaList();
			var visible = this.getCanUseReferenceSchema();
			var value = this.getReferenceSchema();
			var controlConfig = {
				"id": this.id + "-reference-schema",
				"className": "Terrasoft.ComboBoxEdit",
				"list": list,
				"visible": visible,
				"enabled": this.canChangeReferenceSchema,
				"value": value
			};
			return controlConfig;
		},

		/**
		 * Returns reference schema list.
		 * @protected
		 * @return {Terrasoft.Collection} Reference schema list.
		 */
		getReferenceSchemaList: function() {
			if (!this.referenceSchemaList) {
				this.referenceSchemaList = Ext.create("Terrasoft.Collection");
				this.referenceSchemaList.on("dataLoaded", this.onReferenceSchemaDataLoaded, this);
			}
			return this.referenceSchemaList;
		},

		/**
		 * Subscribes reference schema control events.
		 * @protected
		 */
		subscribeReferenceSchemaControlEvents: function() {
			var referenceSchemaControl = this.getReferenceSchemaControl();
			if (referenceSchemaControl) {
				referenceSchemaControl.on("change", this.setReferenceSchema, this);
				referenceSchemaControl.on("prepareList", this.onReferenceSchemaPrepareList, this);
				referenceSchemaControl.on("destroy", this.onReferenceSchemaControlDestroy, this);
			}
		},

		/**
		 * Handler for reference shcema control prepareList event.
		 * @protected
		 * @param {String} filter Control filter.
		 * @param {Terrasoft.Collection} list Reference schema list.
		 */
		onReferenceSchemaPrepareList: function(filter, list) {
			this.fireEvent("prepareReferenceSchemaList", filter, list);
		},

		/**
		 * Reference schema list dataLoaded event handler.
		 * @protected
		 * @param {Terrasoft.Collection} list Data list.
		 */
		onReferenceSchemaDataLoaded: function(list) {
			var control = this.getReferenceSchemaControl();
			control.loadList(list);
		},

		/**
		 * Handler for reference shcema control destroy event.
		 * @protected
		 */
		onReferenceSchemaControlDestroy: function() {
			if (this.referenceSchemaList) {
				this.referenceSchemaList.destroy();
				this.referenceSchemaList = null;
			}
		},

		/**
		 * Returns true, if can use reference schema, false - otherwise.
		 * @protected
		 * @return {Boolean} True, if can use reference schema, false - otherwise.
		 */
		getCanUseReferenceSchema: function() {
			var dataValueType = this.getDataValueType();
			var expressionType = this.getExpressionType();
			return this.isConstantExpressionType(expressionType) && Terrasoft.isLookupDataValueType(dataValueType);
		},

		/**
		 * Sets type button control visible.
		 * @protected
		 * @param {Boolean} visible Type button control visible.
		 */
		setTypeButtonControlVisible: function(visible) {
			var control = this.getTypeButtonControl();
			if (control && control.rendered) {
				control.setVisible(visible);
			}
		},

		/**
		 * Sets type button control enabled.
		 * @protected
		 * @param {Boolean} enabled Type button control enabled.
		 */
		setTypeButtonControlEnabled: function(enabled) {
			var control = this.getTypeButtonControl();
			if (control && control.rendered) {
				control.setEnabled(enabled);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @override
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.reRenderEditControls();
			this.updateTypeMenu();
		},

		/**
		 * Rerenders reference schema and value controls.
		 * @protected
		 */
		reRenderEditControls: function() {
			if (this.rendered) {
				this.removeRenderedControls();
				if (this.getAllowRenderControls()) {
					this.renderReferenceSchemaControl();
					this.renderValueControl();
				}
			}
		},

		/**
		 * Removes render controls.
		 */
		removeRenderedControls: function() {
			this.clearItemsCollection(this.referenceSchemaItems);
			this.clearItemsCollection(this.valueItems);
		},

		/**
		 * Returns true, when alow render value and reference schema controls, false - otherwise.
		 * @return {Boolean} True, when alow render value and reference schema controls, false - otherwise.
		 */
		getAllowRenderControls: function() {
			return !Ext.isEmpty(this.getValueControlDataValueType()) && !Ext.isEmpty(this.getExpressionType());
		},

		/**
		 * Renders reference schema control.
		 * @protected
		 */
		renderReferenceSchemaControl: function() {
			var controlConfig = this.getReferenceSchemaControlConfig();
			this.addViewItemsPropertyItem("referenceSchemaItems", controlConfig);
			this.subscribeReferenceSchemaControlEvents();
		},

		/**
		 * Renders value control.
		 * @protected
		 */
		renderValueControl: function() {
			var controlConfig = this.getValueControlConfig();
			this.addViewItemsPropertyItem("valueItems", controlConfig);
			this.subscribeValueControlEvents();
			this.updateValueItemsVisible();
		},

		/**
		 * Subscribes on value control events.
		 * @protected
		 */
		subscribeValueControlEvents: function() {
			var dataValueType = this.getValueControlDataValueType();
			var expressionType = this.getExpressionType();
			var propertyName = this.getValueControlValuePropertyName(dataValueType);
			var isLookup = Terrasoft.isLookupDataValueType(dataValueType) && this.isConstantExpressionType(expressionType);
			this.processValueControl(function(control) {
				var changeEventName = this.getValueControlChangeEventName(control, propertyName);
				if (changeEventName) {
					control.on(changeEventName, this.setValue, this);
				}
				control.on("destroy", this.onValueControlDestroy, this);
				if (isLookup) {
					control.on("prepareList", this.onPrepareValueList, this);
				}
				if (expressionType === Terrasoft.ExpressionEnums.ExpressionType.COLUMN ||
					(expressionType === Terrasoft.ExpressionEnums.ExpressionType.PARAMETER &&
						this.contentType === Terrasoft.ContentType.LOOKUP)) {
					control.on("loadVocabulary", this.onLoadEntitySchemaColumnVocabulary, this);
					control.on("prepareList", this.onPrepareEntitySchemaColumnList, this);
				}
				if (expressionType === Terrasoft.ExpressionEnums.ExpressionType.PARAMETER) {
					control.on("prepareList", this.onPreparePageSchemaParameterList, this);
				}
				if (expressionType === Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE) {
					control.on("prepareList", this.onPrepareSysValuesList, this);
				}
				if (expressionType === Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE) {
					control.on("prepareList", this.onPrepareAttributesList, this);
				}
			}, this);
		},

		/**
		 * Value control prepareList event handler.
		 * @protected
		 * @param {String} filter Control filter.
		 * @param {Terrasoft.Collection} list Value collection.
		 */
		onPrepareValueList: function(filter, list) {
			this.fireEvent("prepareValueList", filter, list);
		},

		/**
		 * Entity schema column vocabulary event handler.
		 * @protected
		 */
		onLoadEntitySchemaColumnVocabulary: function() {
			this.fireEvent("loadEntitySchemaColumnVocabulary");
		},

		/**
		 * Entity schema column control prepareList event handler.
		 * @protected
		 * @param {String} filter Control filter.
		 * @param {Terrasoft.Collection} list Entity schema column list.
		 */
		onPrepareEntitySchemaColumnList: function(filter, list) {
			this.fireEvent("prepareEntitySchemaColumnList", filter, list);
		},

		/**
		 * System values prepareList event handler.
		 * @protected
		 * @param {String} filter Control filter.
		 * @param {Terrasoft.Collection} list System values list.
		 */
		onPrepareSysValuesList: function(filter, list) {
			this.fireEvent("prepareSysValuesList", filter, list);
		},

		/**
		 * Attributes prepareList event handler.
		 * @protected
		 * @param {String} filter Control filter.
		 * @param {Terrasoft.Collection} list Attributes list.
		 */
		onPrepareAttributesList: function(filter, list) {
			this.fireEvent("prepareAttributesList", filter, list);
		},

		/**
		 * Page schema parameter control prepareList event handler.
		 * @protected
		 * @param {String} filter Control filter.
		 * @param {Terrasoft.Collection} list Entity schema column list.
		 */
		onPreparePageSchemaParameterList: function(filter, list) {
			this.fireEvent("preparePageSchemaParameterList", filter, list);
		},

		/**
		 * Handler for value control destroy event.
		 * @protected
		 */
		onValueControlDestroy: function() {
			if (this.valueList) {
				this.valueList.destroy();
				this.valueList = null;
			}
		},

		/**
		 * Returns control property name by data value type.
		 * @protected
		 * @param {Terrasoft.DataValueType} dataValueType Data value type.
		 * @return {String} Value control property name.
		 */
		getValueControlValuePropertyName: function(dataValueType) {
			return this.isConstantExpressionType(this.expressionType) && Terrasoft.isBooleanDataValueType(dataValueType)
				? "checked"
				: "value";
		},

		/**
		 * Returns control property change handler name.
		 * @protected
		 * @param {Terrasoft.Component} control Control.
		 * @param {String} propertyName Property name.
		 * @return {String} Handler name.
		 */
		getValueControlValueSetValueMethodName: function(control, propertyName) {
			var bindConfig = this.getControlPropertyBindConfig(control, propertyName);
			return !Ext.isEmpty(bindConfig) ? bindConfig.changeMethod : null;
		},

		/**
		 * Returns control property change event name.
		 * @protected
		 * @param {Terrasoft.Component} control Control.
		 * @param {String} propertyName Property name.
		 * @return {String} Event name.
		 */
		getValueControlChangeEventName: function(control, propertyName) {
			var bindConfig = this.getControlPropertyBindConfig(control, propertyName);
			return !Ext.isEmpty(bindConfig) ? bindConfig.changeEvent : null;
		},

		/**
		 * Returns control property binding config.
		 * @protected
		 * @param {Terrasoft.Component} control Control.
		 * @param {String} propertyName Property name.
		 * @return {Object} Control property binding config.
		 */
		getControlPropertyBindConfig: function(control, propertyName) {
			var bindConfig = control.getBindConfig() || {};
			return bindConfig[propertyName];
		},

		/**
		 * Gets value control config.
		 * @protected
		 * @return {Object} Value control config.
		 */
		getValueControlConfig: function() {
			var dataValueType = this.getValueControlDataValueType();
			var viewGenerator = this.getViewGenerator();
			var config = {
				dataValueType: dataValueType,
				expressionType: this.expressionType,
				name: "edit-control",
				contentType: this.contentType
			};
			var valuePropertyName = this.getValueControlValuePropertyName(dataValueType);
			config[valuePropertyName] = this.getValue();
			this.enrichValueControlConfigBeforeGenerate(config);
			var controlConfig = viewGenerator.generateEditItem(config);
			this.enrichValueControlConfigAfterGenerate(controlConfig, dataValueType);
			return controlConfig;
		},

		/**
		 * Enriches value control config before send to view generator.
		 * @protected
		 * @param {Object} config Value control config.
		 * @param {Terrasoft.DataValueType} config.dataValueType Data value type.
		 */
		enrichValueControlConfigBeforeGenerate: function(config) {
			var dataValueType = config.dataValueType;
			if (Terrasoft.isTextDataValueType(dataValueType)) {
				config.dataValueType = Terrasoft.DataValueType.TEXT;
				config.contentType = config.contentType || Terrasoft.ContentType.SHORT_TEXT;
			}
			if (Terrasoft.isMoneyCompatibleDataValueType(dataValueType)) {
				config.dataValueType = Terrasoft.DataValueType.FLOAT;
				config.decimalPrecision = 2;
			}
			if (Terrasoft.isLookupDataValueType(dataValueType)) {
				Ext.apply(config, {"dataValueType": Terrasoft.DataValueType.ENUM});
			}
			if (!Terrasoft.isBooleanDataValueType(dataValueType)) {
				var placeholder = this.placeholder || this.getDefaultPlaceholder(this.getExpressionType());
				Ext.apply(config, {
					"isRequired": this.isRequired,
					"validationInfo": this.validationInfo
				});
				if (!Ext.isEmpty(placeholder)) {
					Ext.apply(config, {"placeholder": placeholder});
				}
			}
		},

		/**
		 * Enriches value control config after generate with view generator.
		 * @protected
		 * @param {Object} config Value control config.
		 * @param {Terrasoft.DataValueType} dataValueType Data value type.
		 */
		enrichValueControlConfigAfterGenerate: function(config, dataValueType) {
			if (this.isConstantExpressionType(this.expressionType) && Terrasoft.isLookupDataValueType(dataValueType)) {
				config.list = this.getValueList();
			}
			if (this.expressionType === Terrasoft.ExpressionEnums.ExpressionType.COLUMN) {
				config.list = this.getEntitySchemaColumnList();
			}
			if (this.expressionType === Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE) {
				config.list = this._getSysValuesList();
			}
			if (this.expressionType === Terrasoft.ExpressionEnums.ExpressionType.PARAMETER) {
				config.list = this._getPageSchemaParametersList();
			}
			if (this.expressionType === Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE) {
				config.list = this._getAttributesList();
			}
		},

		/**
		 * Returns value list.
		 * @protected
		 * @return {Terrasoft.Collection} Value list.
		 */
		getValueList: function() {
			if (!this.valueList) {
				this.valueList = Ext.create("Terrasoft.Collection");
				this.valueList.on("dataLoaded", this.onValueDataLoaded, this);
			}
			return this.valueList;
		},

		/**
		 * Returns entity schema column list.
		 * @protected
		 * @return {Terrasoft.Collection} Entity schema column list.
		 */
		getEntitySchemaColumnList: function() {
			if (!this.entitySchemaColumnList) {
				this.entitySchemaColumnList = Ext.create("Terrasoft.Collection");
				this.entitySchemaColumnList.on("dataLoaded", this.onValueDataLoaded, this);
			}
			return this.entitySchemaColumnList;
		},

		/**
		 * Returns system values list.
		 * @private
		 * @return {Terrasoft.Collection} System values list.
		 */
		_getSysValuesList: function() {
			if (!this.sysValuesList) {
				this.sysValuesList = Ext.create("Terrasoft.Collection");
				this.sysValuesList.on("dataLoaded", this.onValueDataLoaded, this);
			}
			return this.sysValuesList;
		},

		/**
		 * @private
		 */
		_getAttributesList: function() {
			if (!this.attributesList) {
				this.attributesList = Ext.create("Terrasoft.Collection");
				this.attributesList.on("dataLoaded", this.onValueDataLoaded, this);
			}
			return this.attributesList;
		},

		/**
		 * @private
		 */
		_getPageSchemaParametersList: function() {
			if (!this.pageSchemaParameterList) {
				this.pageSchemaParameterList = Ext.create("Terrasoft.Collection");
				this.pageSchemaParameterList.on("dataLoaded", this.onValueDataLoaded, this);
			}
			return this.pageSchemaParameterList;
		},

		/**
		 * Handler for value list dataLoaded event.
		 * @protected
		 * @param {Terrasoft.Collection} list Data list
		 */
		onValueDataLoaded: function(list) {
			this.processValueControl(function(control) {
				control.loadList(list);
			}, this);
		},

		/**
		 * Returns value control data value type.
		 * @protected
		 * @return {Terrasoft.DataValueType} Value control data value type.
		 */
		getValueControlDataValueType: function() {
			var dataValueType;
			switch (this.expressionType) {
				case Terrasoft.ExpressionEnums.ExpressionType.SYSSETTING:
				case Terrasoft.ExpressionEnums.ExpressionType.PARAMETER:
					dataValueType = Terrasoft.DataValueType.TEXT;
					break;
				case Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE:
				case Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE:
				case Terrasoft.ExpressionEnums.ExpressionType.COLUMN:
				case Terrasoft.ExpressionEnums.ExpressionType.CONSTANT:
					dataValueType = this.dataValueType || Terrasoft.DataValueType.TEXT;
					break;
				default:
					dataValueType = null;
			}
			return dataValueType;
		},

		/**
		 * Sets value control value.
		 * @protected
		 * @param {Mixed} value Value.
		 */
		setValueControlValue: function(value) {
			var dataValueType = this.getValueControlDataValueType();
			var propertyName = this.getValueControlValuePropertyName(dataValueType);
			this.processValueControl(function(control) {
				var methodName = this.getValueControlValueSetValueMethodName(control, propertyName);
				if (methodName && Ext.isFunction(control[methodName])) {
					control[methodName](value);
				}
			}, this);
		},

		/**
		 * Process value control.
		 * @protected
		 * @param {Function} processFn Process control method.
		 * @param {Object} scope Process control method context.
		 */
		processValueControl: function(processFn, scope) {
			if (this.valueItems && this.valueItems.each) {
				this.valueItems.each(function(item) {
					var items = item.items;
					if (items && items.each) {
						items.each(processFn, scope);
					} else {
						processFn.call(scope, item);
					}
				}, this);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Bindable#subscribeForEvents
		 * @override
		 */
		subscribeForEvents: function(binding, property, model) {
			this.callParent(arguments);
			if (property !== "value") {
				return;
			}
			if (!model.canValidate) {
				return;
			}
			var validationMethodName = binding.config.validationMethod;
			if (validationMethodName) {
				var validationMethod = this[validationMethodName];
				model.validationInfo.on("change:" + binding.modelItem,
					function(collection, value) {
						validationMethod.call(this, value);
					},
					this
				);
				var startValidationInfo = model.validationInfo.get(binding.modelItem);
				if (startValidationInfo) {
					validationMethod.call(this, startValidationInfo);
				}
			}
		}
	});
});


