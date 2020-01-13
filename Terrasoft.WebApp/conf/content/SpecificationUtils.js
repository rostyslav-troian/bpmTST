Terrasoft.configuration.Structures["SpecificationUtils"] = {innerHierarchyStack: ["SpecificationUtils"]};
define("SpecificationUtils", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		/**
		 * ########## ######-####### ### ####### #### ######## ############## # ########### ## #### ##############.
		 * @param attributeName ######## ####.
		 * @param typeId ########## ############# #### ##############.
		 * @returns {Object} ############### #######
		 */
		function generateVisibleRuleForSpecificationType(attributeName, typeId,
														 additionalRuleName, additionalRule) {
			var ruleName = "BindParameterVisible" + attributeName + "ToSpecificationType";
			var rule = {};
			rule[ruleName] = {
				"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
				"property": BusinessRuleModule.enums.Property.VISIBLE,
				"conditions": [
					{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "Specification",
							"attributePath": "Type"
						},
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": typeId
						}
					}
				]
			};
			if (additionalRule && additionalRuleName) {
				rule[additionalRuleName] = additionalRule;
			}
			return rule;
		}
		return {
			GenerateVisibleRuleForSpecificationType: generateVisibleRuleForSpecificationType
		};
	});


