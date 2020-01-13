Terrasoft.configuration.Structures["RelatedEmailsMixin"] = {innerHierarchyStack: ["RelatedEmailsMixin"]};
define("RelatedEmailsMixin", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		/**
		 * @class Terrasoft.configuration.mixins.RelatedEmailsMixin
		 * The mixin provides methods for related emails search.
		 */
		Ext.define("Terrasoft.configuration.mixins.RelatedEmailsMixin", {
			alternateClassName: "Terrasoft.RelatedEmailsMixin",

			//region Methods: Protected

			/**
			 * Returns email conversation identifier.
			 * @protected
			 * @param {String} emailId Email record unique identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getConversationId: function(emailId, callback, scope) {
				var conversationIdESQ = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "EmailMessageData"
				});
				conversationIdESQ.addColumn("ConversationId");
				var filters = this.Terrasoft.createFilterGroup();
				filters.add("masterRecordFilter", conversationIdESQ.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Activity", emailId));
				conversationIdESQ.filters = filters;
				conversationIdESQ.getEntityCollection(function(result) {
					var conversationId;
					if (result.success) {
						var emailEmd = result.collection.first();
						conversationId = emailEmd && emailEmd.$ConversationId;
					}
					this.Ext.callback(callback, scope || this, [conversationId]);
				}, this);
			},

			/**
			 * Adds emails from conversation filters to filters collection.
			 * @protected
			 * @param {Terrasoft.FilterGroup} filters Emails query filters collection. 
			 * @param {String} conversationId Emails conversation identifier.
			 */
			setEmailsByConversationFilters: function(filters, conversationId) {
				filters.add("EmailFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email
				));
				filters.add("ConversationFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "[EmailMessageData:Activity:Id].ConversationId", conversationId
				));
			}

			//endregion

		});
	});

