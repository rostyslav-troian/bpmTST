Terrasoft.configuration.Structures["EmailRelationsMixin"] = {innerHierarchyStack: ["EmailRelationsMixin"]};
define("EmailRelationsMixin", ["ConfigurationConstants", "EmailHelper"], function(ConfigurationConstants, EmailHelper) {
	/**
	 * @class Terrasoft.configuration.mixins.EmailRelationsMixin
	 * Email relations mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.EmailRelationsMixin", {
		alternateClassName: "Terrasoft.EmailRelationsMixin",

		// region Methods: Private

		/**
		 * Returns current item sender email.
		 * @private
		 * @return {String} #urrent item sender email.
		 */
		_getSenderEmail: function() {
			return this.$SenderEmail || this.$SenderName;
		},

		// endregion

		// region Methods: Protected

		/**
		 * Returns insert query for sender participant.
		 * @protected
		 * @param {GUID} contactId Contact Id.
		 * @return {Terrasoft.InsertQuery} Insert query.
		 */
		getInsertSenderParticipantQuery: function(contactId) {
			var roleId = ConfigurationConstants.Activity.ParticipantRole.From;
			var activityId = this.get("Id");
			var insertQuery = Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: "ActivityParticipant"
			});
			insertQuery.setParameterValue("Activity", activityId, this.Terrasoft.DataValueType.GUID);
			insertQuery.setParameterValue("Participant", contactId, this.Terrasoft.DataValueType.GUID);
			insertQuery.setParameterValue("Role", roleId, this.Terrasoft.DataValueType.GUID);
			return insertQuery;
		},

		/**
		 * Inserts sender participant.
		 * @protected
		 * @param {GUID} contactId Contact Id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		insertSenderParticipant: function(contactId, callback, scope) {
			this.set("SenderContact", {value: contactId});
			var insertQuery = this.getInsertSenderParticipantQuery(contactId);
			insertQuery.execute(callback, scope);
		},

		/**
		 * Returns update query for sender contact email.
		 * @protected
		 * @param {GUID} contactId Contact Id.
		 * @return {Terrasoft.UpdateQuery} Update query.
		 */
		getUpdateSenderContactEmailQuery: function(contactId) {
			var email = this._getSenderEmail();
			var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "Contact"
			});
			updateQuery.filters.add("IdFilter", updateQuery.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.EQUAL, "Id", contactId));
			updateQuery.setParameterValue("Email", email, this.Terrasoft.DataValueType.TEXT);
			return updateQuery;
		},

		/**
		 * Updates sender contact email.
		 * @protected
		 * @param {GUID} contactId Contact Id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		updateSenderContactEmail: function(contactId, callback, scope) {
			var updateQuery = this.getUpdateSenderContactEmailQuery(contactId);
			updateQuery.execute(callback, scope);
		},

		//endregion

		// region Methods: Public

		/**
		 * Adds sender info to value pairs array.
		 * @param {Array} valuePairs Value pairs array.
		 */
		addSenderInfo: function(valuePairs) {
			var email = this.get("SenderEmail");
			var name = this.get("SenderName");
			if (!email && EmailHelper.isEmailAddress(name)) {
				email = name;
				name = email.split("@")[0];
			}
			valuePairs.push({name: "Email", value: email});
			valuePairs.push({name: "Name", value: name});
		},

		/**
		 * Returns is auto binding contact email needed.
		 * @return {Boolean} Is auto binding contact email needed.
		 */
		isAutoBindingContactEmailNeeded: function() {
			var statuses = ConfigurationConstants.Activity.EmailSendStatus;
			var emailStatus = this.get("EmailSendStatus");
			var senderContact = this.get("SenderContact");
			var featureState = this.getIsFeatureEnabled("EmailRelationAddingEnabled");
			return Boolean(emailStatus && emailStatus.value === statuses.Sended && !senderContact && featureState);
		},

		/**
		 * Actualizes sender contact relation with email.
		 * @param {GUID} contactId Contact Id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		actualizeSenderRelation: function(contactId, callback, scope) {
			this.Terrasoft.chain(
				function(next) {
					this.updateSenderContactEmail(contactId, next, this);
				},
				function(next) {
					this.insertSenderParticipant(contactId, next, this);
				},
				function (next) {
					this.fireEvent("senderSet", {
						"ContactId": contactId,
						"Email" : this._getSenderEmail()
					});
					next();
				},
				function() {
					this.Ext.callback(callback, scope);
				}, this);
		}

		//endregion

	});

	return Terrasoft.EmailRelationsMixin;
});


