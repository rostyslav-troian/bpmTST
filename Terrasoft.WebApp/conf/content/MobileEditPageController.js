Terrasoft.configuration.Structures["MobileEditPageController"] = {innerHierarchyStack: ["MobileEditPageController"]};
/**
 * @class Terrasoft.configuration.controller.EditPage
 * Provides custom edit page with specified columns and business rules.
 */
Ext.define("Terrasoft.configuration.controller.EditPage", {
	extend: "Terrasoft.controller.BaseEditPage",

	config: {

		/**
		 * @cfg {Object} columnConfigs Configurations of columns.
		 */
		columnConfigs: null,

		/**
		 * @cfg {Object} businessRuleConfigs Configurations of business rules.
		 */
		businessRuleConfigs: null,

		/**
		 * @cfg {Boolean} useModelBusinessRules If true, uses model's business rules.
		 */
		useModelBusinessRules: false

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeQueryConfig: function() {
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: this.self.Model.getName()
		});
		this.addColumnConfigsToQueryConfig(queryConfig);
		this.addBusinessRuleColumnsToQueryConfig(queryConfig);
		this.setQueryConfig(queryConfig);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	addBusinessRuleColumnsToQueryConfig: function(queryConfig) {
		if (this.getUseModelBusinessRules()) {
			this.callParent(arguments);
		}
		var businessRuleConfigs = this.getBusinessRuleConfigs();
		if (Ext.isArray(businessRuleConfigs)) {
			for (var i = 0, ln = businessRuleConfigs.length; i < ln; i++) {
				var businessRuleConfig = businessRuleConfigs[i];
				if (businessRuleConfig.requiredColumns) {
					queryConfig.addColumns(businessRuleConfig.requiredColumns);
				}
			}
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getCardViewGeneratorConfig: function() {
		var config = this.callParent(arguments);
		var columnConfigs = this.getColumnConfigs();
		if (Ext.isArray(columnConfigs)) {
			config.columnSetsConfigs = this.getColumnSetsConfigs(columnConfigs);
		}
		return config;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getBusinessRules: function() {
		var businessRules;
		if (this.getUseModelBusinessRules()) {
			businessRules = this.callParent(arguments);
		} else {
			businessRules = [];
		}
		var businessRuleConfigs = this.getBusinessRuleConfigs();
		if (Ext.isArray(businessRuleConfigs)) {
			for (var i = 0, ln = businessRuleConfigs.length; i < ln; i++) {
				var businessRuleConfig = businessRuleConfigs[i];
				var businessRule = Ext.create(businessRuleConfig.ruleType, businessRuleConfig);
				businessRules.push(businessRule);
			}
		}
		return businessRules;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getAssociations: function() {
		return null;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	createPageOperationConfig: function() {
		var config = this.callParent(arguments);
		config.useSourceRecord = false;
		return config;
	},

	/**
	 * Creates primary column set with columns.
	 * @param {Object} columnConfigs Configurations of columns.
	 * @protected
	 * @virtual
	 */
	getColumnSetsConfigs: function(columnConfigs) {
		var columnSetsConfig = Ext.create("Ext.util.MixedCollection");
		var columnSet = columnSetsConfig.add({
			isPrimary: true,
			columns:  Ext.create("Terrasoft.OrderedCollection")
		});
		for (var i = 0, ln = columnConfigs.length; i < ln; i++) {
			var columnConfig = Terrasoft.sdk.RecordPage.resolveColumnConfig(this.self.Model.getName(),
				columnConfigs[i]);
			columnSet.columns.add(columnConfig);
		}
		return columnSetsConfig;
	},

	/**
	 * Adds columns to query config.
	 * @param {Terrasoft.QueryConfig} queryConfig Query config.
	 * @protected
	 * @virtual
	 */
	addColumnConfigsToQueryConfig: function(queryConfig) {
		var columnConfigs = this.getColumnConfigs();
		if (Ext.isArray(columnConfigs)) {
			for (var i = 0, ln = columnConfigs.length; i < ln; i++) {
				queryConfig.addColumns(columnConfigs[i].name);
			}
		}
	}

});


