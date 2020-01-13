Terrasoft.configuration.Structures["BusinessRuleConverter"] = {innerHierarchyStack: ["BusinessRuleConverter"]};
define("BusinessRuleConverter", ["BusinessRuleModule", "ToMetaItemBusinessRuleConverter",
	"FromMetaItemBusinessRuleConverter"], function(BusinessRuleModule) {

		/**
		 * @class Terrasoft.configuration.BusinessRuleConverter
		 * BusinessRuleConverter class.
		 */
		Ext.define("Terrasoft.configuration.BusinessRuleConverter", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.BusinessRuleConverter",

			// region Properties: Private

			/**
			 * Entity schema.
			 * @private
			 * @type {Terrasoft.BaseEntitySchema}
			 */
			entitySchema: null,

			/**
			 * Page schema UId.
			 * @private
			 * @type {String}
			 */
			pageSchemaUId: null,

			// endregion

			// region Methods: Private

			/**
			 * Prepares parameters for constructor.
			 * @return {Object} Parameters for constructor.
			 */
			prepareConstructorParameters: function() {
				return {
					actionTypeMap: {
						"VisibilityBusinessRuleAction": BusinessRuleModule.enums.Property.VISIBLE,
						"EnabledBusinessRuleAction": BusinessRuleModule.enums.Property.ENABLED,
						"RequiredBusinessRuleAction": BusinessRuleModule.enums.Property.REQUIRED,
						"ReadOnlyBusinessRuleAction": BusinessRuleModule.enums.Property.READONLY
					},
					expressionTypeMap: {
						"ConstantBusinessRuleExpression": BusinessRuleModule.enums.ValueType.CONSTANT,
						"ColumnBusinessRuleExpression": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"AttributeBusinessRuleExpression": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"SysSettingBusinessRuleExpression": BusinessRuleModule.enums.ValueType.SYSSETTING,
						"SysValueBusinessRuleExpression": BusinessRuleModule.enums.ValueType.SYSVALUE,
						"ParameterBusinessRuleExpression": BusinessRuleModule.enums.ValueType.PARAMETER
					},
					attributeActions: [
						"VisibilityBusinessRuleAction",
						"EnabledBusinessRuleAction",
						"RequiredBusinessRuleAction"
					],
					entitySchema: this.entitySchema,
					pageSchemaUId: this.pageSchemaUId
				};
			},

			// endregion

			// region Methods: Public

			/**
			 * Converts old business rule config to metaItem config.
			 * @param {Object} config Old business rule config.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			convertToMetaItemConfig: function(config, callback, scope) {
				var converter = Ext.create("Terrasoft.ToMetaItemBusinessRuleConverter",
					this.prepareConstructorParameters());
				converter.convertToMetaItemConfig(config, callback, scope);
			},

			/**
			 * Converts metaItems to old business rule config.
			 * @param {Terrasoft.BusinessRuleSchema[]} rules Rules.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			convertFromMetaItems: function(rules, callback, scope) {
				var converter = Ext.create("Terrasoft.FromMetaItemBusinessRuleConverter",
					this.prepareConstructorParameters());
				converter.convertFromMetaItems(rules, callback, scope);
			}

			// endregion

		});
		return Terrasoft.BusinessRuleConverter;
	});


