Terrasoft.configuration.Structures["CaseMessageHistoryUtility"] = {innerHierarchyStack: ["CaseMessageHistoryUtility"]};
define("CaseMessageHistoryUtility", ["EmailMessageConstants", "BaseMessageHistoryUtility"],
	function(EmailMessageConstants) {
		/**
		 * @class Terrasoft.configuration.mixins.CaseMessageHistoryUtility
		 * Mixin, that implements work case message history.
		 */
		Ext.define("Terrasoft.configuration.mixins.CaseMessageHistoryUtility", {
			extend: "Terrasoft.BaseMessageHistoryUtility",
			alternateClassName: "Terrasoft.CaseMessageHistoryUtility",

			/**
			 * @inheritdoc Terrasoft.BaseMessageHistoryUtility#addFiltersToMessageHistoryExistsEsq
			 * @overridden
			 */
			addFiltersToMessageHistoryExistsEsq: function(esq) {
				this.callParent(arguments);
				var filterGroup = esq.createFilterGroup();
				filterGroup.name = "EmailSystemMessages";
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				filterGroup.add("IsAutoSubmitted", esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "[Activity:Id:RecordId].IsAutoSubmitted",
					true));
				filterGroup.add("NotEmailNotifier", esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL, "MessageNotifier",
					EmailMessageConstants.MessageNotifier.Email));
				esq.filters.addItem(filterGroup);
			}
		});
	});


